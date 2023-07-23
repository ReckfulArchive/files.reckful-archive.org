#!/bin/bash

pageFile=$1
assetDir=$2
remotePath="$3"

# load page.html and add `remotePath` prefix to everything beginning with `/assets/`
pageContent="$(<"$pageFile")"
pageContent="${pageContent//\"$assetDir\//"\"$remotePath/assets/"}"

# divide the contents of page.html into two parts, as defined by the tags
listingStartTag="<!-- NGINX_LISTING_START -->"
topContent="${pageContent%$listingStartTag*}"

listingEndTag="<!-- NGINX_LISTING_END -->"
bottomContent="${pageContent#*$listingEndTag}"

# create the build output directory and copy asset files to it
mkdir -p ./build/assets

echo "$topContent" > ./build/top.html
echo "$bottomContent" > ./build/bottom.html

cp -a "$assetDir/." ./build/assets/

mainJsScript="./build/assets/scripts/main.js"
mainJsScriptContent="$(<"$mainJsScript")"

# prefix js assets paths
echo "${mainJsScriptContent//\"$assetDir\//"\"$remotePath/assets/"}" > "$mainJsScript"
