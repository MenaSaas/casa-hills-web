
export const categories = [
  { 
    value: 'carousel', 
    label: 'Carousel principal (Page d\'accueil)', 
    description: 'Images principales du carousel de la page d\'accueil (max 5 recommandées)',
    maxFiles: 5 
  },
  { 
    value: 'school-levels', 
    label: 'Cycles scolaires (Page d\'accueil)', 
    description: 'Images représentant chaque cycle scolaire sur la page d\'accueil'
  },
  { 
    value: 'news', 
    label: 'Actualités et événements', 
    description: 'Photos pour la section actualités et événements de l\'école'
  },
  { 
    value: 'philosophy', 
    label: 'Philosophie - Activités pédagogiques', 
    description: 'Images d\'activités pédagogiques pour la page Philosophie'
  },
  { 
    value: 'campus', 
    label: 'Espaces du campus', 
    description: 'Photos des différents espaces extérieurs et intérieurs du campus'
  },
  { 
    value: 'facilities', 
    label: 'Installations et équipements', 
    description: 'Photos des installations spécialisées et équipements de l\'école'
  }
];

export const subcategories = {
  'school-levels': [
    'Maternelle',
    'Primaire', 
    'Collège',
    'Lycée'
  ],
  'news': [
    'Événements scolaires',
    'Concours et prix',
    'Sorties pédagogiques',
    'Fêtes et célébrations',
    'Projets étudiants'
  ],
  'philosophy': [
    'Sciences expérimentales',
    'Arts et créativité',
    'Sport et activités physiques',
    'Langues et cultures',
    'Projets collaboratifs'
  ],
  'campus': [
    'Cours de récréation',
    'Jardins et espaces verts',
    'Terrains de sport',
    'Entrée principale',
    'Espaces de détente'
  ],
  'facilities': [
    'Bibliothèque',
    'Laboratoires de sciences',
    'Salles informatique',
    'Cantine et restauration',
    'Gymnase et sport',
    'Salles de classe',
    'Auditorium'
  ]
};
