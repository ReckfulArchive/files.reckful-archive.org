#!/bin/bash

pageFile=$1
assetDir=$2
remotePath="$3"

pageContent="$(<"$pageFile")"

pageContent="${pageContent//\"$assetDir\//"\"$remotePath/assets/"}"

listingStartTag="<!-- NGINX_LISTING_START -->"
listingEndTag="<!-- NGINX_LISTING_END -->"

topContent="${pageContent%$listingStartTag*}"
bottomContent="${pageContent#*$listingEndTag}"

mkdir -p ./build/assets

echo "$topContent" > ./build/top.html
echo "$bottomContent" > ./build/bottom.html
cp -a "$assetDir/." ./build/assets/
