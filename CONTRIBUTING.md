# Contributing

Thanks for helping out! Most contributions here are new algorithms, so most of this guide covers that. Bug fixes and other improvements are welcome too.

## Getting set up

There's no build step and nothing to install. The scripts are ES modules, so serve the folder over HTTP instead of opening `index.html` from disk:

```sh
git clone https://github.com/<you>/algo-visualizer.git
cd algo-visualizer
git switch -c add-insertion-sort
python3 -m http.server 5500
```

Then open http://localhost:5500. Any static file server works.

## How a run works

1. `script.js` parses and validates the array (and the search value, for searches).
2. `AlgoViz.renderStage(stage, values)` draws one **slot** per value and returns the slots in order. Each slot holds an arrow (above), a **tile** (the coloured bar) and a pointer (below).
3. `script.js` calls your algorithm with the slots and `await`s it. The Run button stays disabled until your function's promise resolves.

Slots stay in place; **tiles move**. When two values swap, their tiles trade slots and take their colours with them, so viewers can follow one value through the run. Always read values by slot (`getNumber(slots[i])`) at the moment you need them.

## The helpers (`assets/scripts/common.js`)

Import only these. Don't reach into the DOM from an algorithm.

| Helper | What it does |
|---|---|
| `showHead(slot)` / `hideHead(slot)` | Pointer bar under the tile: "looking at this one". |
| `showHead(slot, true, direction)` / `hideHead(slot, true)` | Pointer plus the arrow above. `direction` is `""`, `"left"` or `"right"`. |
| `hideAll(slots)` | Clears every pointer and arrow, plus the `active` and `dimmed` states. Keeps `found` and `sorted`. |
| `getNumber(slot)` | The value of the tile currently in that slot. |
| `swap(slotA, slotB)` | Swaps the two tiles. Never swap `innerHTML`: that breaks the colour-follows-value rule. |
| `setState(slot, state)` / `setState(slot)` | Sets or clears the tile's state (see below). |
| `setStatus(text, variant)` | Updates the status pill. `variant` is `"running"`, `"found"`, `"miss"` or omitted. |
| `sleep(ms)` | Waits between steps. Returns immediately when the viewer prefers reduced motion, so always use it instead of `setTimeout`. |

### Tile states

States are shapes and opacity, never new colours (the tiles already own the colour):

| State | Looks like | Use it when |
|---|---|---|
| `active` | Tile lifts 8px | Two tiles are about to swap. Clear it right after `swap`. |
| `sorted` | Check mark at the foot | A tile has reached its **final** position. |
| `found` | Green ring | A search found its value. Leave it on at the end. |
| `dimmed` | 28% opacity | A search has ruled the tile out. |

## Adding an algorithm, step by step

The example below adds **Insertion Sort**. It has been run against the app as written.

### 1. Write the algorithm

Create `assets/scripts/insertion_sort.js`:

```js
import { sleep, showHead, hideHead, getNumber, setState, swap, setStatus } from "./common.js";

/**
 * Implementation of Insertion Sort
 */

async function insertion_sort(verticalBars){
    for(let i=1; i<verticalBars.length; i++){
        setStatus(`Step ${i} of ${verticalBars.length-1}`, "running");
        // Walk the new value left until its neighbour is no bigger
        for(let j=i; j>0; j--){
            const left = verticalBars[j-1];
            const right = verticalBars[j];
            showHead(left);
            showHead(right);
            await sleep(400);

            const shouldSwap = getNumber(left) > getNumber(right);
            if(shouldSwap){
                setState(left, "active");
                setState(right, "active");
                await sleep(200);
                swap(left, right);
                setState(left);
                setState(right);
            }
            hideHead(left);
            hideHead(right);
            if(!shouldSwap) break;
        }
    }
    verticalBars.forEach(bar => setState(bar, "sorted"));
    setStatus("Sorted");
}

export {insertion_sort};
```

Insertion sort only knows the final positions at the very end, so it marks every tile `sorted` once it finishes. Bubble and selection sort mark one tile per pass instead.

### 2. Add it to the algorithm list

In `index.html`, add an `<option>` with the next free value:

```html
<option value="4">Insertion Sort</option>
```

The option text becomes the stage title.

### 3. Wire it up in `assets/scripts/script.js`

Import it next to the others:

```js
import { insertion_sort } from "./insertion_sort.js";
```

Add a legend entry listing only the marks your algorithm uses. The available marks are `pointer`, `arrow`, `lift`, `found`, `dimmed` and `sorted`:

```js
'4': [['pointer', 'Comparing'], ['lift', 'About to swap'], ['sorted', 'Sorted']],
```

Then add a branch to the run dispatch, after Selection Sort:

```js
else if(selectedAlgorithm == 4){
    await insertion_sort(verticalBars);
}
```

Pass whatever your algorithm needs: `verticalBars` (the slots), `new_array` (the numbers in their original order) and/or `searchValue`.

### 4. If it's a search

- Add its value to `SEARCH_ALGORITHMS` (for example `['0', '2', '4']`). That shows the **Search for** field and validates it. Your function then receives `searchValue` as a whole number.
- End with exactly one of these:
  - `setState(slot, "found")` and `` setStatus(`Found at index ${i}`, "found") ``.
  - `setStatus("Not found", "miss")`.
- Call `hideAll(slots)` before you finish, so no pointers are left behind. It keeps the `found` ring.
- Indexes in messages are 0-based, matching the existing searches.

## Rules

- **Never use `alert()`.** Progress and results go in the status pill (`setStatus`).
- **Make the function `async` and `await` every step.** The Run button re-enables when your promise resolves.
- **Clean up.** Hide each pointer when you're done with that comparison. At the end, only `sorted` checks or a `found` ring should remain.
- **Don't change the visuals' rules.** Colours come only from the design tokens: no hex values in `style.css`, no new colours, no gradients. The action colour (green or blurple) is for the Run button only. Never use it on tiles, pointers or statuses.
- **Keep status text short and specific**, for example "Pass 2 of 10", "Checking index 3", "Found at index 5" or "Sorted".
- **Match the surrounding code:** `snake_case` algorithm names, four-space indents, one algorithm per file.

## Before you open a pull request

Check these in the browser, in **both themes** (toggle in the header):

- [ ] It produces the right result for a normal array, duplicates (`5, 5, 1, 5`), a single value (`42`) and already-sorted input.
- [ ] For searches: a value that exists, one that doesn't, and an empty search box (it should show a field error).
- [ ] Every tile keeps its colour through swaps.
- [ ] No pointers or arrows are left when the run ends.
- [ ] The Run button is disabled during the run and re-enabled after.
- [ ] The legend lists exactly the marks your algorithm uses.
- [ ] The browser console shows no errors.

Then open a pull request against `main` that says what you added and how you checked it.
