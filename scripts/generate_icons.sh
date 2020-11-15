#!/usr/bin/env sh

convert -background none src/palette.svg -resize 64x64 public/favicon.ico
convert -background none src/palette.svg -resize 192x192 public/logo192.png
convert -background none src/palette.svg -resize 512x512 public/logo512.png
