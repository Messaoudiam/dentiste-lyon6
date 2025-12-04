import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Dentiste Lyon 6 | Dr. Sophie Martin',
  description:
    'Politique de confidentialité et protection des données RGPD du cabinet dentaire Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème (69006). Vos droits et la gestion de vos données personnelles.',
  keywords: [
    'RGPD dentiste Lyon',
    'protection données dentiste',
    'confidentialité cabinet dentaire Lyon 6',
    'données personnelles dentiste',
    'Dr Sophie Martin confidentialité',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.dr-martin-dentiste.fr/confidentialite',
  },
  openGraph: {
    title: 'Politique de Confidentialité - Cabinet Dentaire Lyon 6',
    description:
      'Protection de vos données personnelles au cabinet dentaire Dr. Sophie Martin à Lyon 6ème. Conformité RGPD.',
    url: 'https://www.dr-martin-dentiste.fr/confidentialite',
    siteName: 'Cabinet Dentaire Dr. Sophie Martin',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function ConfidentialitePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Politique de confidentialité', url: '/confidentialite' },
        ]}
      />
      {/* JSON-LD pour cette page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Politique de Confidentialité - Cabinet Dentaire Lyon 6',
            description:
              'Politique de confidentialité et protection des données personnelles du cabinet dentaire Dr. Sophie Martin à Lyon 6ème.',
            url: 'https://www.dr-martin-dentiste.fr/confidentialite',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Cabinet Dentaire Dr. Sophie Martin',
              url: 'https://www.dr-martin-dentiste.fr',
            },
            publisher: {
              '@type': 'Dentist',
              name: 'Dr. Sophie Martin - Chirurgien-Dentiste',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '45 Cours Franklin Roosevelt',
                addressLocality: 'Lyon',
                postalCode: '69006',
                addressRegion: 'Auvergne-Rhône-Alpes',
                addressCountry: 'FR',
              },
            },
          }),
        }}
      />
      <main className="min-h-screen bg-background pt-32 pb-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-8">
            Politique de confidentialité - Cabinet dentaire Lyon 6
          </h1>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* Encart Cabinet - SEO Local */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray mb-2">Cette page concerne le cabinet :</p>
              <p className="font-semibold text-foreground text-lg">
                Dr. Sophie Martin - Chirurgien-Dentiste
              </p>
              <p className="text-gray">
                45 Cours Franklin Roosevelt, 69006 Lyon 6ème
              </p>
              <p className="text-gray">
                Tél. : <a href="tel:0478123456" className="text-accent hover:underline">04 78 12 34 56</a>
              </p>
            </div>

            {/* Introduction */}
            <section>
              <p className="text-gray leading-relaxed">
                Le cabinet dentaire du <strong>Dr. Sophie Martin</strong>, situé à{' '}
                <strong>Lyon 6ème</strong> (69006), accorde une grande importance
                à la protection de vos données personnelles. En tant que{' '}
                <strong>chirurgien-dentiste inscrite à l&apos;Ordre</strong>, je
                m&apos;engage à respecter la confidentialité de vos informations
                conformément au Règlement Général sur la Protection des Données
                (RGPD) et au secret médical.
              </p>
            </section>

            {/* Responsable du traitement */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Responsable du traitement des données
              </h2>
              <div className="bg-gray-light/30 rounded-xl p-6 space-y-2 text-gray">
                <p>
                  <strong className="text-foreground">Dr. Sophie Martin</strong>
                  <br />
                  <span className="text-sm">Chirurgien-Dentiste - Docteur en chirurgie dentaire</span>
                </p>
                <p>N° RPPS : [Numéro RPPS]</p>
                <p>N° ADELI : [Numéro ADELI]</p>
                <p className="pt-2 border-t border-gray-light mt-2">
                  <strong>Adresse du cabinet :</strong>
                  <br />
                  45 Cours Franklin Roosevelt
                  <br />
                  69006 Lyon (Lyon 6ème)
                </p>
                <p>
                  <strong>Contact :</strong>
                  <br />
                  Tél. : 04 78 12 34 56
                  <br />
                  Email : contact@dr-martin-dentiste.fr
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Données collectées
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Dans le cadre de la prise de rendez-vous via ce site et de votre
                suivi au cabinet dentaire de Lyon 6ème, je suis susceptible de
                collecter les données suivantes :
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Via le formulaire de prise de rendez-vous
              </h3>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Motif de consultation (urgence, contrôle, etc.)</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Dans le cadre de votre suivi médical
              </h3>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>Données d&apos;identification (état civil, date de naissance)</li>
                <li>Coordonnées postales</li>
                <li>Numéro de sécurité sociale</li>
                <li>Informations de mutuelle</li>
                <li>Antécédents médicaux et dentaires</li>
                <li>Radiographies et photographies dentaires</li>
                <li>Plans de traitement et historique des soins</li>
              </ul>
              <p className="text-sm text-gray mt-4 italic">
                Les données de santé sont protégées par le secret médical et font
                l&apos;objet de mesures de sécurité renforcées.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Données techniques
              </h3>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>Données de navigation (cookies strictement nécessaires)</li>
                <li>Statistiques de fréquentation anonymisées</li>
              </ul>
            </section>

            {/* Finalités */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Finalités du traitement
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Vos données personnelles sont collectées et traitées pour les
                finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>
                  <strong>Prise de rendez-vous</strong> : gestion de votre demande
                  et confirmation de rendez-vous
                </li>
                <li>
                  <strong>Soins dentaires</strong> : constitution et tenue de votre
                  dossier médical, suivi des traitements
                </li>
                <li>
                  <strong>Facturation</strong> : établissement des devis, factures
                  et transmission aux organismes d&apos;assurance maladie
                </li>
                <li>
                  <strong>Rappels</strong> : envoi de rappels de rendez-vous (si vous
                  y avez consenti)
                </li>
                <li>
                  <strong>Obligations légales</strong> : conservation du dossier
                  médical, déclarations obligatoires
                </li>
              </ul>
            </section>

            {/* Base légale */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Base légale du traitement
              </h2>
              <p className="text-gray leading-relaxed">
                Le traitement de vos données personnelles est fondé sur les bases
                légales suivantes (article 6 du RGPD) :
              </p>
              <ul className="list-disc list-inside text-gray space-y-2 mt-4">
                <li>
                  <strong>Votre consentement</strong> (art. 6.1.a) : lors de
                  l&apos;envoi du formulaire de prise de rendez-vous
                </li>
                <li>
                  <strong>L&apos;exécution d&apos;un contrat de soins</strong>{' '}
                  (art. 6.1.b) : pour la gestion des rendez-vous et la réalisation
                  des actes de soins dentaires
                </li>
                <li>
                  <strong>Les obligations légales</strong> (art. 6.1.c) : tenue du
                  dossier médical, facturation, transmission à la sécurité sociale
                </li>
                <li>
                  <strong>L&apos;intérêt vital</strong> (art. 6.1.d) : en cas
                  d&apos;urgence médicale
                </li>
              </ul>
              <p className="text-gray leading-relaxed mt-4">
                <strong>Pour les données de santé</strong> (article 9 du RGPD) :
                le traitement est autorisé car nécessaire aux fins de la médecine
                préventive, des diagnostics médicaux et de l&apos;administration
                de soins de santé (art. 9.2.h).
              </p>
            </section>

            {/* Durée de conservation */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Durée de conservation
              </h2>
              <p className="text-gray leading-relaxed">
                Vos données personnelles sont conservées pendant la durée nécessaire
                aux finalités pour lesquelles elles ont été collectées, conformément
                aux obligations légales :
              </p>
              <div className="bg-gray-light/30 rounded-xl p-6 mt-4">
                <ul className="space-y-3 text-gray">
                  <li className="flex justify-between items-start border-b border-gray-light pb-3">
                    <span>Demandes de rendez-vous (non-patients)</span>
                    <span className="font-medium text-foreground">3 ans</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-gray-light pb-3">
                    <span>Dossier médical patient</span>
                    <span className="font-medium text-foreground">20 ans*</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-gray-light pb-3">
                    <span>Pièces comptables</span>
                    <span className="font-medium text-foreground">10 ans</span>
                  </li>
                  <li className="flex justify-between items-start">
                    <span>Cookies</span>
                    <span className="font-medium text-foreground">13 mois max.</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray mt-4 italic">
                * À compter du dernier acte de soin, conformément à l&apos;article
                R. 1112-7 du Code de la santé publique. Cette durée peut être prolongée
                en cas de réclamation ou de contentieux.
              </p>
            </section>

            {/* Destinataires */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Destinataires des données
              </h2>
              <p className="text-gray leading-relaxed">
                Vos données personnelles sont destinées au <strong>Dr. Sophie Martin</strong>,
                chirurgien-dentiste à Lyon 6ème, et ne sont <strong>jamais vendues
                ni cédées à des tiers à des fins commerciales</strong>.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Destinataires autorisés
              </h3>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>
                  <strong>Organismes de santé</strong> : Assurance Maladie (CPAM),
                  mutuelles (pour le remboursement des soins)
                </li>
                <li>
                  <strong>Laboratoires de prothèse dentaire</strong> : pour la
                  fabrication de prothèses (données anonymisées si possible)
                </li>
                <li>
                  <strong>Confrères</strong> : en cas d&apos;adressage ou de demande
                  d&apos;avis (avec votre accord)
                </li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Sous-traitants techniques
              </h3>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>Hébergeur du site web (serveurs situés en France/UE)</li>
                <li>Logiciel de gestion du cabinet (hébergeur de données de santé agréé)</li>
              </ul>
              <p className="text-sm text-gray mt-4 italic">
                Tous les sous-traitants sont soumis à des obligations contractuelles
                strictes en matière de protection des données (art. 28 RGPD).
              </p>
            </section>

            {/* Droits */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Vos droits
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Conformément au RGPD et au Code de la santé publique, vous disposez
                des droits suivants :
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Droits RGPD (articles 15 à 22)
              </h3>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>
                  <strong>Droit d&apos;accès</strong> (art. 15) : obtenir la
                  confirmation que vos données sont traitées et en obtenir une copie
                </li>
                <li>
                  <strong>Droit de rectification</strong> (art. 16) : faire corriger
                  vos données inexactes ou incomplètes
                </li>
                <li>
                  <strong>Droit à l&apos;effacement</strong> (art. 17) : demander la
                  suppression de vos données*
                </li>
                <li>
                  <strong>Droit à la limitation</strong> (art. 18) : demander la
                  suspension du traitement de vos données
                </li>
                <li>
                  <strong>Droit à la portabilité</strong> (art. 20) : récupérer vos
                  données dans un format structuré
                </li>
                <li>
                  <strong>Droit d&apos;opposition</strong> (art. 21) : vous opposer au
                  traitement de vos données
                </li>
              </ul>
              <p className="text-sm text-gray mt-3 italic">
                * Le droit à l&apos;effacement peut être limité par les obligations
                légales de conservation du dossier médical.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                Accès au dossier médical
              </h3>
              <p className="text-gray leading-relaxed">
                Conformément aux articles L. 1111-7 et R. 1111-1 du Code de la santé
                publique, vous pouvez accéder à l&apos;ensemble des informations
                concernant votre santé détenues par le cabinet (radiographies,
                comptes-rendus, historique des soins). Cette communication intervient
                au plus tard dans les 8 jours suivant votre demande.
              </p>

              <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mt-6">
                <h4 className="font-medium text-foreground mb-3">
                  Comment exercer vos droits ?
                </h4>
                <p className="text-gray mb-4">
                  Adressez votre demande accompagnée d&apos;une pièce d&apos;identité :
                </p>
                <ul className="text-gray space-y-2">
                  <li>
                    <strong>Par email :</strong>{' '}
                    <a
                      href="mailto:contact@dr-martin-dentiste.fr"
                      className="text-accent hover:underline"
                    >
                      contact@dr-martin-dentiste.fr
                    </a>
                  </li>
                  <li>
                    <strong>Par courrier :</strong>
                    <br />
                    Dr. Sophie Martin
                    <br />
                    45 Cours Franklin Roosevelt
                    <br />
                    69006 Lyon
                  </li>
                </ul>
                <p className="text-sm text-gray mt-4">
                  Réponse sous 1 mois maximum (art. 12.3 RGPD).
                </p>
              </div>
            </section>

            {/* Réclamation */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Réclamation
              </h2>
              <p className="text-gray leading-relaxed">
                Si vous estimez que le traitement de vos données personnelles
                constitue une violation du RGPD, vous avez le droit d&apos;introduire
                une réclamation auprès de la CNIL (Commission Nationale de
                l&apos;Informatique et des Libertés) :{' '}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  www.cnil.fr
                </a>
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Cookies
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Ce site utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>
                  <strong>Cookies essentiels</strong> : nécessaires au fonctionnement
                  du site
                </li>
                <li>
                  <strong>Cookies analytiques</strong> : pour comprendre comment vous
                  utilisez le site (statistiques anonymes)
                </li>
              </ul>
              <p className="text-gray leading-relaxed mt-4">
                Vous pouvez configurer votre navigateur pour refuser les cookies ou
                être alerté lors de leur dépôt.
              </p>
            </section>

            {/* Sécurité */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Sécurité des données
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                En tant que professionnel de santé, je mets en œuvre toutes les mesures
                techniques et organisationnelles appropriées pour protéger vos données
                personnelles et de santé :
              </p>
              <ul className="list-disc list-inside text-gray space-y-2">
                <li>
                  <strong>Site web sécurisé</strong> : certificat SSL/TLS (HTTPS)
                </li>
                <li>
                  <strong>Logiciel de gestion</strong> : hébergé chez un hébergeur de
                  données de santé agréé (HDS)
                </li>
                <li>
                  <strong>Accès restreint</strong> : authentification sécurisée,
                  mots de passe robustes
                </li>
                <li>
                  <strong>Sauvegardes</strong> : régulières et chiffrées
                </li>
                <li>
                  <strong>Secret médical</strong> : respect strict de la confidentialité
                  des informations de santé
                </li>
              </ul>
            </section>

            {/* Modification */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Modification de la politique
              </h2>
              <p className="text-gray leading-relaxed">
                Cette politique de confidentialité peut être mise à jour à tout
                moment. Je vous invite à la consulter régulièrement.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-accent/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Contact - Cabinet dentaire Lyon 6ème
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Pour toute question concernant cette politique de confidentialité
                ou le traitement de vos données personnelles :
              </p>
              <div className="space-y-2 text-gray mb-6">
                <p>
                  <strong className="text-foreground">Dr. Sophie Martin</strong>
                </p>
                <p>45 Cours Franklin Roosevelt, 69006 Lyon</p>
                <p>Tél. : 04 78 12 34 56</p>
                <p>Email : contact@dr-martin-dentiste.fr</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Prendre rendez-vous
                  <svg
                    className="w-4 h-4"
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
                </Link>
                <Link
                  href="/mentions-legales"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  Mentions légales
                </Link>
              </div>
            </section>

            {/* Date de mise à jour */}
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
