# Real Interview Questions

## CSS

Q: What are the positioning methods for 'position'? What elements are they relative to?

A: 1. static (static positioning): This is the default value. No positioning is applied, and the element appears in the normal flow (ignoring top, bottom, left, right, or z-index declarations).

2. relative (relative positioning): Generates a relatively positioned element. It is positioned relative to its normal (original) position through the settings of top, bottom, left, and right. Layering can be controlled using z-index.

3. absolute (absolute positioning): Generates an absolutely positioned element. It is positioned relative to the first parent element that has a position value other than static. The element's position is specified using the "left", "top", "right", and "bottom" properties. Layering can be controlled using z-index.

4. fixed (fixed positioning): Generates an absolutely positioned element that is positioned relative to the browser window. The element's position is specified using the "left", "top", "right", and "bottom" properties. Layering can be controlled using z-index.

The correct understanding is: As long as the parent element has a position set and it's not static (static is the default), the child element set to absolute will use this as its containing block (the nearest one).
For absolutely positioned elements, the reference for positioning is its containing block, which means it's positioned relative to its containing block, not necessarily its parent element.
