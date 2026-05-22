# Writeup

**Time spent bug fixes**: around 1h30
**Time spent phase 2**: around 30min with writeup

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

## Bug 8 — Filters "double" watch on selectedTags

in `Filters`, in `toggle` we do another call to `watch` which is unecessary because `selectedTags` already contains the current value of form `selectedTags` for the current state
The cleaner solution is to use `selectedTags` directly in `toggle`

## Bug 9 — Filters TagChip created on every render pass

On every render pass we loop `ALL_FILTERS` and return a `TagChip`. So as we watch `selectedTags`, on every toggle of a chip we trigger a `Filters` render and thus the `ALL_FILTERS` and thus a `TagChip` render for every chip.
We use memo to skip rendering `TagChip` when it has not changed

EDIT: after logging my `TagChip` render i realized my fix was not enough because i misunderstood 2 things: my `memo` inside the render method was not good, it has to be "outside", but also the toggle method was changing on every render because of `selectedTags` change, effectively rendering my `memo` useless. Using form `getValues` and `useCallback` was the final fix.

---

## Anything else?

* `applyTypography` is wrong. It does not do what the comment says and does not even return the kerning. I suppose it was for the purpose of creating an expensive task

* `applyTypography` is effectively doing nothing so my mind is saying that heavy operation should be done after fetching through `fetchSearch` or `fetchNowPlaying`. But in the meantime as to comment says it is supposed to compute kerning for react-native, it does make sense to do it here and have it "depend" on title.

* with more time i would rewrite the fetch from movies to handle errors, loading... Especially as we have the expensive task on each movie item it would be nice to show a loading so that the user understands better what s happening. 

* i went fast on design for phase 2. I "copied" TagChip design to go fast but it could be a nicer design

Anything that surprised you, anything you'd do differently with more time, anything you suspect is still buggy but couldn't pin down — drop it here. Optional.


## Phase 2

I implemented the persistent storage using `"@react-native-async-storage/async-storage"` and creating a `useAsyncStorage` hook.
I also modified `useDebounce` to return the setter directly. The reason is that on "history select" i did not want to go through the debounce. It was not needed and was a better experience for the user.
I "copied" the `TagChip/Filters` design to implement `RecentSearch` quickly.
I also made sure that not all `RecentChip` re-render on "change".
Finally i used `Set` to easily handle dedup/queuing of search history.

If i had more time i would rewrite the `debouncedQuery/query` to use only one state variable. Right now i need to do `setDebouncedQuery` and `setQuery` in `setQueryFromRecent`. It does not feel good.