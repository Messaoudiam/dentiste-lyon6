'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  magnetic?: boolean // Kept for backwards compatibility, but ignored
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  disabled = false,
  type = 'button',
}: MagneticButtonProps) {
  const variants = {
    primary: cn(
      'bg-[#0066FF] text-white',
      'hover:bg-[#0052CC]'
    ),
    secondary: cn(
      'bg-white text-[#0A0A0A]',
      'border border-[#E5E5E5]',
      'hover:border-[#0A0A0A] hover:bg-[#FAFAFA]'
    ),
    ghost: cn(
      'bg-transparent text-[#6B6B6B]',
      'hover:text-[#0A0A0A]'
    ),
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  }

  const buttonStyles = cn(
    // Base styles
    'relative inline-flex items-center justify-center',
    'font-medium',
    'rounded-full',
    'transition-colors duration-200',
    'cursor-pointer',
    // Focus styles
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2',
    // Variant & Size
    variants[variant],
    sizes[size],
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        <span className="flex items-center gap-2">
          {children}
        </span>
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      <span className="flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}

// Arrow icon component for buttons
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-4 h-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  )
}

// Chevron icon for subtle arrows
export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-4 h-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}
