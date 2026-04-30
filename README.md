# MoviesTest

A small Expo app that fetches and displays a list of recent movies from TMDB. Used as a pair-programming playground during the React Native tech-lead hiring process.

## Setup

```bash
npm install
```

## Run

```bash
npm run ios
```

or

```bash
npm run android
```

## Exercise

This repository is intentionally rough around the edges. The home screen lives in [`src/Home.tsx`](src/Home.tsx).

### Part 1 — Code review

Read through `src/Home.tsx` and identify everything you would flag in a pull-request review. Consider correctness, performance, type-safety, security, and React / React Native best practices. Be ready to discuss what you'd change and why.

### Part 2 — Sort feature

Extend the home screen so the user can sort the movie list **by title**:

- alphabetically (A → Z)
- reverse-alphabetically (Z → A)

Add a control of your choice (button, segmented control, switch, etc.) to toggle between the two orders. The original fetched order does not need to be preserved.
