# Normalize SVG

It's been a thing for a while that I keep getting collections of SVG icons with different viewBox sizes that are
intended to work together and it's a pain in the ass to made them look the same size when used in UI (specially when
used as CSS background images). So, this pretends to be a fast way to normalize a bunch of SVG images to the same scale.

I've just put together some snippets from here and there (I kept credit, of course) to prototype this tool. I'm just
keeping the repo here because I think it'd be nice to spend some time here, building a nicer tool for this purpose.

## How to use it

Just put a set of SVG icons into `data` folder. Install dependencies if it's the first run and execute:

    yarn install
    yarn start
