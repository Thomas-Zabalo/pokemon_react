# Projet React Pokémon

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Objectif du projet

Cette application React permet de consulter des Pokémon via la **PokéAPI**. Elle offre les fonctionnalités suivantes :

* Affichage des Pokémon avec nom, image et informations détaillées
* Gestion des favoris stockés dans le `localStorage`
* Activation du mode Shiny pour afficher les versions brillantes des Pokémon, également sauvegardé dans le `localStorage`
* Recherche de Pokémon
* Optimisation des performances grâce aux hooks : `useEffect`, `useCallback`, `useMemo`, `useRef`

---

## Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/Thomas-Zabalo/pokemon_react.git
cd pokemon_react
````

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le projet en développement

```bash
npm run dev
```

L’application sera accessible sur : `http://localhost:5173`

---

## Hooks utilisés

### `useEffect` – Gestion des effets

Permet de charger les Pokémon lors du montage du composant et de mettre à jour les données lorsque les dépendances changent.

```js
useEffect(() => {
  fetchPokemons();
}, []);
```

### `useCallback` – Mémoïsation de fonctions

Évite de recréer certaines fonctions à chaque rendu, notamment `fetchPokemons`.

```js
const fetchPokemons = useCallback(async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  setPokemons(data.results);
}, []);
```

### `useMemo` – Optimisation des calculs

Évite le recalcul des filtres ou tris à chaque rendu.

```js
const filteredPokemons = useMemo(() => {
  return pokemons.filter(p => p.name.includes(search));
}, [pokemons, search]);
```

### `useRef` – Référence au DOM

Permet de manipuler un élément du DOM ou de stocker une valeur persistante sans provoquer de re-render.

```js
const searchRef = useRef();

const focusSearch = () => {
  searchRef.current.focus();
};
```

---

## LocalStorage

### Favoris

Les Pokémon favoris sont sauvegardés localement pour être conservés après un rafraîchissement.

```js
localStorage.setItem("favorites", JSON.stringify(favList));
```

### Shiny

Le mode Shiny est également stocké pour chaque Pokémon ou globalement.

```js
localStorage.setItem("shiny", JSON.stringify(isShinyEnabled));
```

### Dark Mode

Le thème de l’application est stocké dans le localStorage pour conserver la préférence utilisateur.

```js
localStorage.setItem("theme", selectedTheme);
```

---

## API utilisée : PokéAPI

L’API fournit les informations suivantes pour chaque Pokémon :

* Nom
* Numéro
* Sprites (normal / shiny)
* Types
* Évolutions
* Statistiques
* Compétences

Exemple de requête utilisée :

```
https://pokeapi.co/api/v2/pokemon
```

[Lien vers l'application](pokemonreact-seven.vercel.app)

### Remarque sur le déploiement

Il est possible que l’application rencontre des problèmes avec Vercel
Si vous rencontrez des erreurs,lancer l’application en local
