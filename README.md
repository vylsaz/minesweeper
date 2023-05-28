# minesweeper

![Language](https://img.shields.io/badge/language-APL-24a148)

```apl
mine.front←html
mine.Sweep 0
```

## mine.aplc

Minesweeper logic.

Use a frontend (a class with a constructor which takes a `mine` object, and a `loop` method):
```apl
mine.front←some_class
```

Default frontend: `mine.dummy`.

Decide if there can be mines on the four sides:
```apl
mine.sides←0 ⍝ default
mine.sides←1
```

Play the game:
```apl
mine.Sweep 0 ⍝ small
mine.Sweep 1 ⍝ medium
mine.Sweep 2 ⍝ big
(height,width) mine.Sweep num_of_mines
```

## html.aplc

Frontend using HTMLRenderer (recommended).

Part of the styling was taken from [here](http://birrell.org/andrew/minesweeper/).

## winforms.aplc

Frontend using winforms.

