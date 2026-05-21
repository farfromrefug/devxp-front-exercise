# Writeup

**Time spent**: _e.g. 3h45_

---

For each bug you found and fixed, write 2–4 sentences covering:

- **What was wrong** — the symptom you observed, and the underlying cause.
- **How you found it** — what made you look there (visible symptom, code read, devtools, etc.).
- **Why React behaves this way** — the mental model behind it. This is the part we care about most.

Add or remove sections as needed — there's no fixed number of bugs to find.

## Bug 1 — displayedMovies state

We were using a state for `displayedMovies` where we can just use a const in the render loop
I saw it because the useEffect was simply setting `displayedMovies` when `searchResults` or `nowPlaying`.
But changing the state of those would couse the render loop for `Home` to be called. So we if we simply set `const displayedMovies = searchResults ?? nowPlaying` it remove the need for another state change (`displayedMovies`)

## Bug 2 — SearchBar component

SearchBar should not be defined inside `Home` but as a separated component
This prevents uncessary component function created on every `Home` render

Though SearchBar is using `query`, `setQuery`, `setShouldClear`. To do it right we need to expose `onClear`  and `onChangeText`

## Bug 3 — renderSearchBar is unnecessary

`SearchBar` was rendered on each `Home` render call through `renderSearchBar`. It was unnecessary as there were no `if` or other operation which would require `renderSearchBar`

The solution is to define `SearchBar` directly in the `Home` returned template

## Bug 3 — _short title_

_Your notes_

## Bug 4 — _short title_

_Your notes_

---

## Anything else?

Anything that surprised you, anything you'd do differently with more time, anything you suspect is still buggy but couldn't pin down — drop it here. Optional.
