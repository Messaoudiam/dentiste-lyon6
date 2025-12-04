import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Mentions Légales | Dentiste Lyon 6 - Dr. Sophie Martin Chirurgien-Dentiste',
  description:
    'Mentions légales du cabinet dentaire Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème (69006). Honoraires, tarifs conventionnés, moyens de paiement, informations légales.',
  keywords: [
    'mentions légales dentiste lyon 6',
    'tarifs dentiste lyon 6ème',
    'honoraires chirurgien-dentiste lyon',
    'cabinet dentaire lyon 6 tarifs',
  ],
  openGraph: {
    title: 'Mentions Légales | Dentiste Lyon 6 - Dr. Sophie Martin',
    description:
      'Mentions légales, honoraires et tarifs du cabinet dentaire Dr. Sophie Martin à Lyon 6ème.',
    url: 'https://www.dr-martin-dentiste.fr/mentions-legales',
  },
  alternates: {
    canonical: 'https://www.dr-martin-dentiste.fr/mentions-legales',
  },
}

export default function MentionsLegalesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Mentions légales', url: '/mentions-legales' },
        ]}
      />

      {/* LocalBusiness Schema for legal page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dentist',
            name: 'Cabinet Dentaire Dr. Sophie Martin',
            description: 'Chirurgien-dentiste à Lyon 6ème - Soins dentaires, implants, esthétique, orthodontie',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '45 Cours Franklin Roosevelt',
              addressLocality: 'Lyon',
              postalCode: '69006',
              addressRegion: 'Auvergne-Rhône-Alpes',
              addressCountry: 'FR',
            },
            telephone: '+33478XXXXXX',
            email: 'contact@dr-martin-dentiste.fr',
            url: 'https://www.dr-martin-dentiste.fr',
            priceRange: '€€',
            paymentAccepted: ['Cash', 'Credit Card', 'Carte Vitale', 'Chèque'],
            currenciesAccepted: 'EUR',
          }),
        }}
      />

      <main className="min-h-screen bg-background pt-32 pb-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          {/* H1 optimisé SEO local */}
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Mentions légales - Cabinet dentaire Lyon 6
          </h1>
          <p className="text-gray mb-8">
            Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème (69006)
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* Éditeur avec NAP optimisé */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Chirurgien-dentiste à Lyon 6ème - Éditeur du site
              </h2>
              <div className="bg-gray-light/30 rounded-xl p-6 space-y-2 text-gray">
                <p className="text-lg font-semibold text-foreground">
                  Dr. Sophie Martin
                </p>
                <p className="text-accent font-medium">Chirurgien-dentiste</p>
                <div className="pt-3 space-y-1">
                  <p>45 Cours Franklin Roosevelt</p>
                  <p>69006 Lyon, France</p>
                  <p>Téléphone : <a href="tel:+33478XXXXXX" className="text-accent hover:underline">04 78 XX XX XX</a></p>
                  <p>Email : <a href="mailto:contact@dr-martin-dentiste.fr" className="text-accent hover:underline">contact@dr-martin-dentiste.fr</a></p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-light space-y-2">
                  <p>
                    <strong className="text-foreground">N° RPPS :</strong> [À compléter]
                  </p>
                  <p>
                    <strong className="text-foreground">N° ADELI :</strong> [À compléter]
                  </p>
                  <p>
                    <strong className="text-foreground">N° Ordre :</strong> [À compléter]
                  </p>
                  <p className="pt-2">
                    Inscrite au Tableau du Conseil Départemental de l&apos;Ordre des
                    Chirurgiens-Dentistes du Rhône
                  </p>
                  <p>
                    <strong className="text-foreground">Diplôme :</strong> Doctorat en Chirurgie
                    Dentaire - Faculté d&apos;Odontologie de Lyon 1 (2008)
                  </p>
                </div>
              </div>
            </section>

            {/* Liens obligatoires Ordre */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Ordre National des Chirurgiens-Dentistes
              </h2>
              <div className="bg-accent/5 rounded-xl p-6 space-y-4">
                <p className="text-gray">
                  Ce site respecte les dispositions de la charte ordinale relative
                  à la communication du chirurgien-dentiste.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.ordre-chirurgiens-dentistes.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                  >
                    <ExternalLinkIcon />
                    Ordre National des Chirurgiens-Dentistes
                  </a>
                  <a
                    href="https://www.ordre-chirurgiens-dentistes.fr/annuaire/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                  >
                    <ExternalLinkIcon />
                    Annuaire officiel des Chirurgiens-Dentistes
                  </a>
                  <a
                    href="https://www.ordre-chirurgiens-dentistes.fr/patient/vos-droits/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                  >
                    <ExternalLinkIcon />
                    Vos droits en tant que patient
                  </a>
                </div>
              </div>
            </section>

            {/* Honoraires et tarifs - Section importante SEO */}
            <section id="tarifs">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Honoraires et tarifs - Dentiste Lyon 6
              </h2>
              <div className="bg-gray-light/30 rounded-xl p-6 space-y-4 text-gray">
                <p>
                  Conformément à l&apos;article R.4127-240 du Code de la Santé Publique,
                  le Dr. Sophie Martin pratique des honoraires conformes aux tarifs
                  conventionnels de l&apos;Assurance Maladie pour les actes remboursables.
                </p>
                <p>
                  Pour les actes hors nomenclature (prothèses, implants, orthodontie,
                  esthétique dentaire), un devis écrit et détaillé vous est
                  systématiquement remis avant tout traitement.
                </p>

                <div className="pt-4 mt-4 border-t border-gray-light">
                  <h3 className="font-semibold text-foreground mb-3">
                    Tarifs indicatifs - Cabinet dentaire Lyon 6ème
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Soins conservateurs (tarifs conventionnés)
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Consultation</span>
                          <span className="font-medium">23€ - 30€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Détartrage</span>
                          <span className="font-medium">28,92€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Traitement carie (1 face)</span>
                          <span className="font-medium">26,97€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Dévitalisation (incisive)</span>
                          <span className="font-medium">33,74€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Extraction simple</span>
                          <span className="font-medium">33,44€</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Prothèses et implants (honoraires libres)
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Couronne céramo-métallique</span>
                          <span className="font-medium">à partir de 500€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Couronne céramique</span>
                          <span className="font-medium">à partir de 700€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Implant dentaire (pose)</span>
                          <span className="font-medium">à partir de 1 200€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Prothèse amovible complète</span>
                          <span className="font-medium">à partir de 1 500€</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Esthétique et orthodontie
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Blanchiment dentaire</span>
                          <span className="font-medium">à partir de 350€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Facette céramique (par dent)</span>
                          <span className="font-medium">à partir de 800€</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Traitement Invisalign</span>
                          <span className="font-medium">sur devis</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs mt-4 italic">
                    Tarifs indicatifs au {new Date().toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                    })}. Un devis personnalisé vous sera remis après examen clinique.
                  </p>
                </div>
              </div>
            </section>

            {/* Moyens de paiement */}
            <section id="paiement">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Moyens de paiement acceptés
              </h2>
              <div className="bg-gray-light/30 rounded-xl p-6 text-gray">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Carte bancaire (Visa, Mastercard, CB)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Espèces
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Chèques
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Tiers payant Sécurité Sociale
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Facilités de paiement (traitement &gt; 500€)
                  </li>
                </ul>
              </div>
            </section>

            {/* Accessibilité */}
            <section id="accessibilite">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Accessibilité du cabinet dentaire Lyon 6
              </h2>
              <div className="bg-gray-light/30 rounded-xl p-6 text-gray space-y-3">
                <p>
                  Le cabinet dentaire du Dr. Sophie Martin est accessible aux
                  personnes à mobilité réduite (PMR) :
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Accès de plain-pied</li>
                  <li>• Ascenseur disponible</li>
                  <li>• Places de stationnement PMR à proximité</li>
                </ul>
                <p className="text-sm">
                  Merci de signaler tout besoin spécifique lors de la prise de rendez-vous.
                </p>
              </div>
            </section>

            {/* Hébergeur */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Hébergement du site
              </h2>
              <div className="bg-gray-light/30 rounded-xl p-6 space-y-2 text-gray">
                <p>
                  <strong className="text-foreground">[Nom de l&apos;hébergeur]</strong>
                </p>
                <p>[Adresse]</p>
                <p>[Téléphone]</p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Propriété intellectuelle
              </h2>
              <p className="text-gray leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, graphismes)
                est protégé par le droit d&apos;auteur. Toute reproduction, même
                partielle, est interdite sans autorisation préalable du Dr. Sophie Martin.
              </p>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Responsabilité et informations médicales
              </h2>
              <p className="text-gray leading-relaxed">
                Les informations présentes sur ce site sont données à titre informatif
                et ne remplacent en aucun cas une consultation avec un chirurgien-dentiste.
                En cas de douleur ou d&apos;urgence dentaire, contactez directement le cabinet.
              </p>
            </section>

            {/* RGPD */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Protection des données personnelles (RGPD)
              </h2>
              <p className="text-gray leading-relaxed">
                Conformément au RGPD et à la loi Informatique et Libertés, vous
                disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement
                et de portabilité de vos données.
              </p>
              <p className="text-gray leading-relaxed mt-3">
                Consultez notre{' '}
                <Link href="/confidentialite" className="text-accent hover:underline font-medium">
                  politique de confidentialité
                </Link>{' '}
                pour plus d&apos;informations.
              </p>
            </section>

            {/* Conformité ordinale */}
            <section className="bg-accent/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Conformité et déclaration
              </h2>
              <ul className="text-gray space-y-2 text-sm">
                <li>
                  ✓ Site déclaré au Conseil Départemental de l&apos;Ordre des
                  Chirurgiens-Dentistes du Rhône
                </li>
                <li>
                  ✓ Conforme à la charte ordinale de communication
                </li>
                <li>
                  ✓ Aucun lien commercial
                </li>
                <li>
                  ✓ Aucun référencement payant prioritaire
                </li>
              </ul>
            </section>

            {/* Crédits */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Crédits
              </h2>
              <p className="text-gray">
                Conception et développement : [À compléter]
              </p>
              <p className="text-gray mt-1">
                Photos d&apos;illustration : Unsplash
              </p>
            </section>

            {/* Date mise à jour */}
            <section className="pt-8 border-t border-gray-light">
              <p className="text-sm text-gray">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}
