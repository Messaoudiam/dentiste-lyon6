// Types pour les articles de blog
export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

// Articles du blog
export const blogArticles: BlogArticle[] = [
  {
    slug: 'brossage-dents-guide-complet',
    title: 'Le brossage des dents : guide complet pour une hygiène parfaite',
    excerpt:
      'Découvrez les techniques de brossage recommandées par votre dentiste à Lyon 6ème pour préserver la santé de vos dents et gencives au quotidien.',
    author: 'Dr. Sophie Martin',
    date: '2024-12-01',
    readTime: '8 min',
    category: 'Hygiène dentaire',
    tags: ['brossage', 'hygiène', 'prévention', 'conseils'],
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80',
    metaTitle: 'Brossage des dents : Guide complet | Dentiste Lyon 6',
    metaDescription:
      'Guide complet du brossage des dents par le Dr. Sophie Martin, dentiste à Lyon 6ème. Techniques, fréquence, choix de la brosse à dents et erreurs à éviter.',
    keywords: [
      'brossage dents',
      'hygiène dentaire lyon',
      'dentiste lyon 6',
      'technique brossage',
      'santé bucco-dentaire',
    ],
    content: `
## Pourquoi le brossage des dents est-il si important ?

Le brossage des dents est la pierre angulaire de votre hygiène bucco-dentaire. En tant que **dentiste à Lyon 6ème**, je constate quotidiennement les conséquences d'un brossage inadapté : caries, gingivites, mauvaise haleine... Pourtant, quelques gestes simples suffisent à préserver durablement la santé de votre sourire.

## La technique de brossage recommandée

### La méthode Bass modifiée

C'est la technique que je recommande à mes patients du **cabinet dentaire de Lyon 6ème** :

1. **Positionnez votre brosse** à 45° par rapport à la gencive
2. **Effectuez de petits mouvements** circulaires ou vibratoires
3. **Brossez de la gencive vers la dent** (du rose vers le blanc)
4. **N'oubliez aucune surface** : face externe, face interne et surface de mastication

### Les erreurs fréquentes à éviter

- **Brosser trop fort** : cela abîme l'émail et les gencives
- **Utiliser une brosse usée** : changez-la tous les 3 mois
- **Brosser uniquement le matin** : 2 brossages minimum par jour
- **Négliger la langue** : elle abrite des bactéries responsables de la mauvaise haleine

## Quelle brosse à dents choisir ?

### Brosse manuelle ou électrique ?

Les deux peuvent être efficaces si elles sont bien utilisées. Cependant, les études montrent que les **brosses électriques à mouvement oscillo-rotatif** éliminent davantage de plaque dentaire.

**Mes recommandations** :
- **Poils souples** : préservent l'émail et les gencives
- **Petite tête** : accède facilement aux zones difficiles
- **Manche ergonomique** : assure une bonne prise en main

## Le dentifrice : lequel choisir ?

Pour la plupart de mes patients à **Lyon**, je recommande un dentifrice fluoré (1000 à 1500 ppm de fluor). Le fluor renforce l'émail et prévient les caries.

**Cas particuliers** :
- Sensibilité dentaire : dentifrice désensibilisant
- Gencives fragiles : dentifrice spécial gencives
- Taches : dentifrice anti-taches (usage ponctuel)

## Combien de temps doit durer le brossage ?

**2 minutes minimum**, soit 30 secondes par quadrant. Pour vous aider :
- Utilisez un minuteur ou le timer de votre brosse électrique
- Divisez votre bouche en 4 zones
- Suivez toujours le même ordre pour n'oublier aucune dent

## Les compléments indispensables

### Le fil dentaire

**Une fois par jour**, le fil dentaire élimine la plaque entre les dents, là où la brosse ne passe pas. C'est essentiel pour prévenir les caries interdentaires.

### Le bain de bouche

En complément (jamais en remplacement) du brossage. Privilégiez les bains de bouche sans alcool. Usage quotidien ou ponctuel selon vos besoins.

### Les brossettes interdentaires

Si vous avez des espaces entre les dents ou des prothèses, les brossettes sont plus efficaces que le fil dentaire.

## Quand consulter votre dentiste à Lyon 6ème ?

Un brossage régulier ne remplace pas les visites chez votre chirurgien-dentiste. Je recommande :

- **Un contrôle tous les 6 mois à 1 an**
- **Un détartrage annuel** pour éliminer le tartre
- **Une consultation rapide** en cas de saignement des gencives, douleur ou sensibilité

## Prenez rendez-vous au cabinet

Pour un bilan complet de votre hygiène bucco-dentaire ou pour tout conseil personnalisé, je vous accueille dans mon **cabinet dentaire situé au 45 Cours Franklin Roosevelt, 69006 Lyon**.

N'hésitez pas à me contacter au **04 78 12 34 56** ou via le formulaire de contact pour prendre rendez-vous.

---

*Article rédigé par le Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème, diplômée de la Faculté d'Odontologie de Lyon.*
`,
  },
  {
    slug: 'urgence-dentaire-lyon-que-faire',
    title: 'Urgence dentaire à Lyon : que faire et qui consulter ?',
    excerpt:
      'Douleur dentaire intense, dent cassée, abcès ? Découvrez comment réagir face à une urgence dentaire à Lyon et où trouver un dentiste rapidement.',
    author: 'Dr. Sophie Martin',
    date: '2024-11-15',
    readTime: '6 min',
    category: 'Urgences',
    tags: ['urgence', 'douleur', 'lyon', 'conseils'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
    metaTitle: 'Urgence dentaire Lyon : que faire ? | Dr. Sophie Martin',
    metaDescription:
      'Urgence dentaire à Lyon ? Le Dr. Sophie Martin, dentiste Lyon 6ème, vous explique comment réagir : douleur, dent cassée, abcès. Conseils et numéros utiles.',
    keywords: [
      'urgence dentaire lyon',
      'dentiste urgence lyon 6',
      'douleur dentaire',
      'dent cassée',
      'abcès dentaire',
    ],
    content: `
## Qu'est-ce qu'une urgence dentaire ?

Une **urgence dentaire** nécessite une prise en charge rapide pour soulager la douleur, stopper une infection ou sauver une dent. En tant que **dentiste à Lyon 6ème**, je réserve chaque jour des créneaux pour accueillir les urgences.

## Les principales urgences dentaires

### 1. La douleur dentaire intense

Une douleur qui vous empêche de dormir ou de manger nécessite une consultation rapide. Les causes possibles :
- **Carie profonde** atteignant le nerf
- **Pulpite** (inflammation de la pulpe dentaire)
- **Abcès dentaire**

**En attendant votre rendez-vous** : prenez un antalgique (paracétamol) et évitez les aliments très chauds ou froids.

### 2. La dent cassée ou fracturée

Suite à un choc ou en croquant un aliment dur :
- **Récupérez le morceau** si possible
- **Conservez-le dans du lait** ou sous la langue
- **Consultez dans les heures qui suivent**

### 3. La dent expulsée (avulsion)

C'est une urgence absolue. La dent peut être réimplantée si vous agissez vite :
1. **Récupérez la dent** par la couronne (pas la racine)
2. **Rincez-la délicatement** sans frotter
3. **Replacez-la si possible** dans son alvéole
4. **Sinon, conservez-la dans du lait**
5. **Consultez dans l'heure**

### 4. L'abcès dentaire

Gonflement, douleur pulsatile, fièvre... L'abcès est une infection qu'il faut traiter rapidement pour éviter sa propagation.

**Ne jamais** : percer l'abcès soi-même ou arrêter les antibiotiques prématurément.

## Où trouver un dentiste en urgence à Lyon ?

### Pendant les heures d'ouverture

**Cabinet du Dr. Sophie Martin**
- Adresse : 45 Cours Franklin Roosevelt, 69006 Lyon
- Téléphone : **04 78 12 34 56**
- Horaires : Lun-Ven 9h-19h, Sam 9h-12h

J'accueille les urgences tous les jours. Appelez dès l'ouverture pour obtenir un rendez-vous dans la journée.

### Week-end et jours fériés

- **Service de garde** : composez le **04 72 33 00 33** (Conseil de l'Ordre du Rhône)
- **Urgences hospitalières** : Hôpital Édouard Herriot (service odontologie)

## Comment prévenir les urgences dentaires ?

La meilleure urgence est celle qui n'arrive pas ! Mes conseils :

- **Consultez régulièrement** (1 à 2 fois par an)
- **Ne négligez pas une petite douleur**
- **Portez un protège-dents** si vous pratiquez un sport à risque
- **Évitez de croquer** des aliments trop durs

## Prenez rendez-vous rapidement

Si vous ressentez une douleur dentaire ou avez subi un traumatisme, ne tardez pas. Contactez le cabinet au **04 78 12 34 56** ou prenez rendez-vous en ligne.

---

*Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème (69006)*
`,
  },
  {
    slug: 'blanchiment-dentaire-lyon-methodes',
    title: 'Blanchiment dentaire à Lyon : méthodes, prix et résultats',
    excerpt:
      'Envie d\'un sourire plus blanc ? Le Dr. Sophie Martin vous présente les différentes méthodes de blanchiment dentaire disponibles à Lyon 6ème.',
    author: 'Dr. Sophie Martin',
    date: '2024-10-20',
    readTime: '7 min',
    category: 'Esthétique dentaire',
    tags: ['blanchiment', 'esthétique', 'sourire', 'lyon'],
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
    metaTitle: 'Blanchiment dentaire Lyon : méthodes et prix | Dr. Martin',
    metaDescription:
      'Blanchiment dentaire à Lyon 6ème : découvrez les méthodes professionnelles, les tarifs et les résultats attendus. Cabinet Dr. Sophie Martin.',
    keywords: [
      'blanchiment dentaire lyon',
      'blanchiment dents prix',
      'dentiste esthétique lyon 6',
      'sourire blanc',
      'éclaircissement dentaire',
    ],
    content: `
## Pourquoi les dents jaunissent-elles ?

Avant de parler de **blanchiment dentaire**, il est important de comprendre pourquoi les dents perdent leur éclat. En tant que **dentiste esthétique à Lyon 6ème**, j'analyse toujours les causes de la coloration avant de proposer un traitement.

### Les causes externes
- **Café, thé, vin rouge** : les tanins colorent l'émail
- **Tabac** : le goudron et la nicotine jaunissent les dents
- **Certains aliments** : curry, fruits rouges, sauces tomate

### Les causes internes
- **Vieillissement naturel** : l'émail s'affine avec le temps
- **Traitements médicaux** : certains antibiotiques
- **Traumatismes dentaires**

## Les méthodes de blanchiment dentaire

### 1. Le blanchiment au cabinet (in-office)

C'est la méthode la plus rapide et la plus efficace. En une à deux séances d'environ 1 heure, vous gagnez plusieurs teintes.

**Le protocole à mon cabinet de Lyon 6ème** :
1. Protection des gencives avec une digue
2. Application du gel de peroxyde d'hydrogène concentré
3. Activation par lampe LED
4. Résultat immédiat et durable

**Avantages** : résultat rapide, sécurisé, encadré par un professionnel
**Prix indicatif** : à partir de 400€

### 2. Le blanchiment ambulatoire (gouttières)

Je réalise des gouttières sur mesure que vous portez chez vous avec un gel moins concentré.

**Durée du traitement** : 2 à 3 semaines, quelques heures par jour
**Avantages** : progressif, moins de sensibilités, retouches possibles
**Prix indicatif** : à partir de 300€

### 3. La technique combinée

Pour un résultat optimal, je propose souvent une séance au cabinet suivie d'un entretien à domicile avec les gouttières.

## Le blanchiment est-il sans risque ?

Réalisé par un professionnel, le blanchiment dentaire est **sûr et efficace**. Les risques sont :
- **Sensibilités temporaires** (quelques jours)
- **Irritation des gencives** si le gel déborde (évité au cabinet)

**Contre-indications** :
- Grossesse et allaitement
- Moins de 18 ans
- Caries non traitées
- Restaurations importantes sur les dents antérieures

## Combien de temps dure le résultat ?

Le résultat dure **1 à 3 ans** selon votre hygiène de vie. Pour le prolonger :
- Limitez café, thé et vin rouge
- Arrêtez le tabac
- Brossez-vous les dents après chaque repas
- Faites des retouches avec les gouttières

## Les alternatives naturelles fonctionnent-elles ?

**Charbon actif, bicarbonate, citron...** Ces méthodes "naturelles" sont souvent inefficaces voire dangereuses :
- Le charbon et le bicarbonate sont **abrasifs** et usent l'émail
- Le citron est **acide** et attaque les dents

Je déconseille fortement ces pratiques.

## Blanchiment dentaire à Lyon 6ème : prenez rendez-vous

Vous souhaitez retrouver un sourire éclatant ? Je vous propose une **consultation préalable** pour évaluer votre situation et vous recommander le traitement le plus adapté.

**Cabinet Dr. Sophie Martin**
45 Cours Franklin Roosevelt, 69006 Lyon
Tél : **04 78 12 34 56**

---

*Article rédigé par le Dr. Sophie Martin, chirurgien-dentiste spécialisée en esthétique dentaire à Lyon.*
`,
  },
]

// Fonction pour récupérer tous les articles
export function getAllArticles(): BlogArticle[] {
  return blogArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Fonction pour récupérer un article par son slug
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug)
}

// Fonction pour récupérer tous les slugs (pour generateStaticParams)
export function getAllSlugs(): string[] {
  return blogArticles.map((article) => article.slug)
}

// Fonction pour récupérer les articles par catégorie
export function getArticlesByCategory(category: string): BlogArticle[] {
  return blogArticles.filter((article) => article.category === category)
}
