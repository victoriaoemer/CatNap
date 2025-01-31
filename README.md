# CatNap

## Team Members

- Ladan Ghezel (2410629006)
- Victoria Oemer (2410629019)
- Helene Reiter (2410629023)

## What is CatNap?

CatNap is an interactive dashboard application designed to help users reflect on their dreams and moods
while incorporating playful, soothing elements inspired by cats.

Our motivation for creating CatNap stems from the belief that dreams hold valuable insights into our emotions,
thoughts, and well-being. In a fast-paced world, self-reflection is often overlooked, yet understanding our
dreams and moods can foster greater self-awareness and mental balance. We wanted to design a space where users
can easily record their dreams, track emotional patterns, and find moments of inspiration through visuals.

With CatNap, users can log their dreams and track their moods, categorizing dreams as positive, neutral, or
negative. To enhance the experience, the dashboard integrates the Pixabay API, providing daily inspirational
visuals that foster creativity and introspection. Users can also personalize their experience by selecting
themes for the visuals.

By blending self-reflection, creativity, and mindfulness, CatNap provides an intuitive and visually captivating
interface that promotes personal well-being in a fun and engaging way.

## User Guide

### Sign Up & Login

To get started with CatNap, create an account by signing up with your first name, last name, username, and password.
Once registered, log in using your username and password.

### Navigation & Sidebar

Use the sidebar to switch between tabs:

- Home – Main dashboard
- Entries – Add and read dream entries
- Settings – Manage account details, profile picture, image theme or delete data/account
- Logout of account

### Adding & Viewing Entries

Log your dreams daily via the dashboard or Entries tab by providing a title, description, and selecting an emotion.
You can also view past entries.

### Emotion Tracking

Selected emotions from dream entries appear in the monthly overview and contribute to the monthly average calculation on the dashboard.

### Settings

- Change your username, password or profile picture.
- Choose a different image theme displayed on the dashboard.
- Delete all entries or permanently remove your account.

## Test Catnap

!! IMPORTANT !!
Catnap is live on https://victoriaoemer.github.io/CatNap/ --> but it is only testable when you have the .env file
from the project submission in moodle in the root directory and run _npm i_ and _npm run dev_ locally!! (database
is not deployed elsewhere)

To test Catnap you should:

- add .env file from the project submission in moodle
- npm i (in root and server folder)
- npm run dev
- https://victoriaoemer.github.io/CatNap/

- take user "test" and password "1234" for the login page to see existing dashboard

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
