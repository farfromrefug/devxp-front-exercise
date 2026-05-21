# MoviesTest

A small Expo app that fetches and displays a list of recent movies from TMDB. Used as a pair-programming playground during the React Native tech-lead hiring process.

## Setup

```bash
npm install
```

## Run

The simplest way is to use **Expo Go** on your phone — no Xcode or Android Studio required.

1. Install [Expo Go](https://expo.dev/go) from the App Store (iOS) or Play Store (Android).
2. Start the dev server:
   ```bash
   npm start
   ```
3. Scan the QR code shown in the terminal:
   - **iOS** — with the built-in Camera app.
   - **Android** — from inside the Expo Go app.

Make sure your phone and computer are on the same Wi-Fi network.

### Alternative — simulator

If you have Xcode or Android Studio installed:

```bash
npm run ios       # iOS simulator
npm run android   # Android emulator
```

## Exercise — Broken Movies App

The app has two screens: a **Home** screen with a movie search, and a **Filters** screen with a genre selector (`react-hook-form`-backed). Both seem to work, but they're full of React anti-patterns and the codebase is missing modern tooling. Your job is to clean them up, extend them, and debug what's actually wrong under the hood.

> ⚠️ **Please don't look at git history** (`git log`, `git blame`, the branch diff against `main`, etc.). The commit messages and prior state give away most of the bugs and would short-circuit the exercise. Treat the current working tree as the only source of truth.

There are five tasks. They can be done in any order, but expect them to overlap (some refactors will touch the same code as some bug fixes).

### 1. Refactor data fetching to TanStack React Query, with Suspense

Right now both API calls (now-playing list + search) use raw `useState` + `useEffect`. That's the React equivalent of fetching with `XMLHttpRequest` — fine for a demo, not what we ship.

- Install [`@tanstack/react-query`](https://tanstack.com/query/latest/docs/framework/react/installation) and set up a `QueryClientProvider` at the app root.
- Use **`useSuspenseQuery`** (not `useQuery`) for both calls, and wrap your tree in `<Suspense>` with a sensible fallback. We want the modern Suspense-driven data-fetching story, not hand-rolled loading flags.
- Pick a sensible `queryKey` design.
- Loading and error UI should fall out of Suspense + error boundaries, not from a hand-rolled `isLoading` boolean.

### 2. Implement Recent Searches

Below the search bar, show the last 5 non-empty queries the user actually ran as tappable chips. Tapping a chip refills the input and re-runs the search. Dedup; cap at 5.

Persist them to device storage so they survive app restarts. Pick a library that fits this setup — we'll discuss the tradeoffs of your choice in the debrief.

### 3. Add posters

Each TMDB movie has a `poster_path` field. Show the poster next to the title in each row.

- The full URL is `https://image.tmdb.org/t/p/w200${poster_path}`.
- Some movies have a `null` poster — handle that gracefully.

### 4. Fix the bottom tab bar spacing

The `Home / Filters` tab bar at the bottom of the screen does not display properly on android with big system navigation bar

### 5. Find and fix the bugs

There are **at least six** React-specific issues across the codebase — most on the **Home** screen and the files it imports, plus one on the **Filters** screen, plus one or two more that will emerge from your refactor in Task 1. They range from clearly-wrong-on-read, to performance problems you'll have to profile, to UX bugs that only show up once Suspense is wired in.

> **Hint on the Filters screen**: tapping any chip causes every other chip on screen to re-render too, even chips whose selected state didn't change. figure out why

For each bug, write a short note in [`WRITEUP.md`](WRITEUP.md):

- **What was wrong** (symptom + underlying cause).
- **How you found it** (devtools, code read, network panel, etc.).
- **Why React behaves this way** — the mental model. This is the part we care about most.

---

### Helpers you can use as-is

The TMDB helpers (`fetchNowPlaying`, `fetchSearch`) live in [`src/tmdb.ts`](src/tmdb.ts). They're clean — no need to touch them, but you'll want to call them from `useQuery`.

### Time

Aim for around **4 hours**. Note your actual time at the top of `WRITEUP.md` — honest estimates help us calibrate.

### Allowed

Any docs (React docs, RN docs, TanStack Query docs, blog posts, AI assistants). If a fix came straight from a doc or AI suggestion, mention it briefly in your writeup — we care about understanding, not memorization.

### Not required

Tests, design polish, accessibility, internationalization, error UI beyond what falls out naturally from React Query.

### Submitting

Push your branch (or zip + email). Make sure `WRITEUP.md` is committed.
