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

## Bug 4 — shouldClear state 

`shouldClear` is unecessary and creates too many render calls. When setting to `true` it even immediatly set itself again to `false` inducing 2 renders when one is enough.

The solution is to use a `clearQuery` method which clears `query` and `searchResults` if `query.length` is `> 0`. That way we update all in a single state change

## Bug 5 — useDebounce is not working

the `useDebounce` hook is calling `setTimeout` on each `value` change without clearing the "current" timeout. This is not an anti pattern it is simply a wrong implementation of debounce

## Bug 6 — MovieTitle: formattedTitle

`formattedTitle` computation is expensive. `formattedTitle` was computed on each `MovieTitle` render.

We use `useMemo` to cache `formattedTitle` so that is only computed on `title` change

## Bug 7 — SafeAreaProvider

The `App` was using `SafeAreaProvider` without implementing `SafeAreaInsetsContext.Consumer` on root components
When using `SafeAreaProvider` we need wrap root component in `SafeAreaInsetsContext.Consumer`

---

## Anything else?

* `applyTypography` is wrong. It does not do what the comment says and does not even return the kerning. I suppose it was for the purpose of creating an expensive task

* `applyTypography` is effectively doing nothing so my mind is saying that heavy operation should be done after fetching through `fetchSearch` or `fetchNowPlaying`. But in the meantime as to comment says it is supposed to compute kerning for react-native, it does make sense to do it here and have it "depend" on title.


Anything that surprised you, anything you'd do differently with more time, anything you suspect is still buggy but couldn't pin down — drop it here. Optional.
