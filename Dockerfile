# ============================================
# Dockerfile optimisé pour Next.js + Dokploy
# Multi-stage build pour image légère (~100MB)
# ============================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances (production + dev pour le build)
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copie des dépendances depuis le stage précédent
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de l'application
RUN npm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copie des fichiers publics
COPY --from=builder /app/public ./public

# Copie du build standalone
# Note: Next.js peut créer un sous-dossier avec le nom du projet
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Si le standalone est dans un sous-dossier, on l'aplatit
RUN if [ -d "/app/dentiste-lyon" ]; then \
      mv /app/dentiste-lyon/* /app/ && \
      rm -rf /app/dentiste-lyon; \
    fi

# Copier les fichiers static dans le bon dossier
RUN mkdir -p /app/.next/static && \
    if [ -d "/app/dentiste-lyon/.next/static" ]; then \
      cp -r /app/dentiste-lyon/.next/static/* /app/.next/static/; \
    fi

# Permissions
RUN chown -R nextjs:nodejs /app

# Utiliser l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
