#!/usr/bin/env sh

convert -background none src/palette.svg -define icon:auto-resize public/favicon.ico
convert -background none src/palette.svg -define icon:auto-resize -size 192x192 public/logo192.png
convert -background none src/palette.svg -define icon:auto-resize -size 512x512 public/logo512.png
