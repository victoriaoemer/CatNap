# CatNap

CatNap is an interactive dashboard application designed to help users reflect on their dreams and moods while incorporating playful, soothing elements inspired by cats.

Our motivation for creating CatNap stems from the belief that dreams hold valuable insights into our emotions, thoughts, and well-being. In a fast-paced world, self-reflection is often overlooked, yet understanding our dreams and moods can foster greater self-awareness and mental balance. We wanted to design a space where users can easily record their dreams, track emotional patterns, and find moments of inspiration through visuals.

With CatNap, users can log their dreams and track their moods, categorizing dreams as positive, neutral, or negative. To enhance the experience, the dashboard integrates the Pixabay API, providing daily inspirational visuals that foster creativity and introspection. Users can also personalize their experience by selecting themes for the visuals.

By blending self-reflection, creativity, and mindfulness, CatNap provides an intuitive and visually captivating interface that promotes personal well-being in a fun and engaging way.

## Test Catnap

!! IMPORTANT !!
Catnap is live on https://victoriaoemer.github.io/CatNap/ --> but it is only testable when you have the .env file from the project submission in moodle in the root directory and run _npm i_ and _npm run dev_ locally!! (database is not deployed elsewhere)

To test Catnap you should:

- add .env file from the project submission in moodle
- npm i
- npm run dev
- https://victoriaoemer.github.io/CatNap/

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Deploy project changes on https://victoriaoemer.github.io/CatNap/

```sh
npm run build
npm run deploy
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
