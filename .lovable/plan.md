

# Propositions d'amelioration pour le site Casa Hills

Apres analyse complete du code, voici les ameliorations que je propose, classees par priorite :

---

## 1. Ajouter les sections manquantes sur la page d'accueil

La page d'accueil n'utilise pas les composants `ParentTestimonials` et `SchoolResults` qui existent deja dans le projet. Les ajouter donnerait plus de credibilite et de contenu a la page principale.

- Integrer `ParentTestimonials` entre la section cycles scolaires et le CTA final
- Integrer `SchoolResults` apres les features "Pourquoi choisir Casa Hills"
- Corriger la couleur `casa-beige` dans `ParentTestimonials` (non definie dans le tailwind config) en `bg-gray-50`

---

## 2. Ajouter une section Google Maps sur la page Contact

Integrer une iframe Google Maps dans la page Contact pour localiser l'ecole (Complexe Residentiel Albadr, Sidi Bernoussi, Casablanca). Cela aide les parents a trouver l'ecole facilement.

---

## 3. Ameliorer le SEO et la performance

- Ajouter des balises `<meta>` (description, Open Graph, Twitter Card) dans `index.html` pour le partage sur les reseaux sociaux
- Ajouter un `title` dynamique par page avec `document.title` ou un composant `Helmet`
- Ajouter le chargement lazy des images (`loading="lazy"`) sur les images du carousel et des sections

---

## 4. Ameliorer l'experience mobile du header

Le menu mobile actuel est basique. Ameliorations possibles :
- Ajouter une animation de slide-down pour l'ouverture du menu
- Afficher les informations de contact (telephone, email) dans le menu mobile (actuellement cachees avec `hidden md:flex`)

---

## 5. Ajouter une section "Actualites / Evenements recents" sur la page d'accueil

La page d'accueil ne montre pas les dernieres actualites ou evenements. Ajouter un composant `NewsSection` (qui existe deja) pour afficher les 3 derniers articles/evenements dynamiquement depuis Supabase.

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---|---|
| `src/pages/Index.tsx` | Ajouter ParentTestimonials, SchoolResults, NewsSection |
| `src/components/ParentTestimonials.tsx` | Corriger la classe `bg-casa-beige` |
| `src/pages/Contact.tsx` | Ajouter section Google Maps |
| `index.html` | Ajouter meta tags SEO et Open Graph |
| `src/components/Header.tsx` | Ameliorer le menu mobile avec animations et infos contact |

Toutes ces modifications sont independantes et peuvent etre implementees progressivement.

