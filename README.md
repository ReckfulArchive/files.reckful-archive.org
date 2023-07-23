# files.reckful-archive.org

Beautified nginx static file directory.

Based on [BetterListing](https://gitlab.com/devCoster/BetterListing).

----

All of the files archived by the ReckfulArchive project are available at 
[files.reckful-archive.org](https://files.reckful-archive.org/) - it is a simple Nginx static file listing,
serving files directory from the hard drives of the streaming/backup servers.

Nginx's default file listing page leaves much to be desired, so in this repository you can find a collection
of styles and scripts that beautify that page. Whatever gets committed to this repository is then immediately used by
the file listing website.

## Use in your own project

If you wish to use this in your own project, copy the [nginx.conf](nginx.conf) to your website's configuration - the rest
should work out of the box.

Nginx will automatically load the styles and the scripts from this repository, so whenever this project gets updated,
your listing will also get updated.

If you don't want to rely on this repository and instead have local copies of the improvements, either [build them locally](#build-locally)
or download them from the [gh-pages](https://github.com/ReckfulArchive/files.reckful-archive.org/tree/gh-pages) branch.

## Contribute

See the guidelines below if you wish to contribute to the project.

### About page.html

This is the listing page that everyone will see. It contains some example files for testing purposes, 
they will be excluded when used in production. 

It is one file, but [during deployment][3] it will actually be divided in two: the [header][1] and the [footer][2]. 
The header is everything **before** the `<!-- NGINX_LISTING_START -->` tag. The footer is everything **after** 
the `<!-- NGINX_LISTING_END -->` tag. Everything between these two tags will be ignored.

If you wish to commit any changes, make sure the `page.html` file is rendered locally exactly as you expect it to.

### Build locally

If you wish to build the pages locally, use the [build script](build.sh) with the following arguments:

```bash
./build.sh page.html assets "https://reckfularchive.github.io/files.reckful-archive.org"
```

1. The page to be processed (see [About page.html](#about-pagehtml)).
2. The [assets](assets) directory to be copied into the build output.
3. The prefix to be added to all of the file paths in `page.html` beginning with `/assets`. This can be a remote URL 
   if you wish to load styles, images and scripts from an external resource like this one.

Once done, you can use the contents of the `build` directory in the desired project.

## Copyright

### BetterListing

The styles and scripts are based on [BetterListing](https://gitlab.com/devCoster/BetterListing), so this repository's
license is also GPL3.

Changes made:
1. The header/footer files are loaded by Nginx dynamically
2. Different file/directory icons
3. More supported formats
4. Code cleanups

### Icons

Royalty-free icons from the following authors are used:

* [smashicons](https://www.flaticon.com/authors/smashicons)
* [dimitry-miroliubov](https://www.flaticon.com/authors/dimitry-miroliubov)
* [pixel-perfect](https://www.flaticon.com/authors/pixel-perfect)
* [iconixar](https://www.flaticon.com/authors/iconixar)
* [roman-kacerek](https://www.flaticon.com/authors/roman-kacerek)

[1]: https://github.com/ReckfulArchive/files.reckful-archive.org/blob/gh-pages/top.html
[2]: https://github.com/ReckfulArchive/files.reckful-archive.org/blob/gh-pages/bottom.html
[3]: https://github.com/ReckfulArchive/files.reckful-archive.org/blob/master/.github/workflows/gh-pages.yml
