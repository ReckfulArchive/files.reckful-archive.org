// noinspection HtmlRequiredAltAttribute

const websiteName = 'Reckful Archive';

jQuery(function () {

    // Working on nginx HTML and applying settings.
    let $h1 = $("h1");
    const text = $h1.text();
    const array = text.split('/');
    const last = array[array.length - 2];
    let dirStructure = document.getElementsByTagName('a')[0].href;
    const dir = text.substring(10);
    let currentDir = last.charAt(0).toUpperCase() + last.slice(1);
    let dirTrun;

    // Truncate long folder names.
    if (currentDir.length > 19) {
        currentDir = currentDir.substring(0, 18) + '...';
    }

    // Updating page title.
    document.title = currentDir + ' – ' + websiteName;

    // Add back button.
    $h1.html(currentDir);

    if (dir.length > 60) {
        dirTrun = dir.replace(/(.{60})/g, "$1\n")
    } else {
        dirTrun = dir.substring(0, dir.length - 1);
    }

    // Add subtitle and back arrow.
    $h1.append('<h4><a href="' + dirStructure + '">&#8672;</a>  ' + dirTrun + '</h4>');

    // Add search box.
    $h1.prepend('<form id="custom-search-form" class="form-inline pull-right"><div class="btn-group"><input id="searchBox" placeholder="Directory file search" type="search" class="form-control"> <span id="searchclear"></span></div></form>');

    // Add parent directory bit.
    $("a").eq(1).html('Parent Directory');

    // Add titles.
    $("pre").prepend('<div class="header">Name                                                                        Size</div>');

    // Establish supported formats.
    const formats = [
        "jpg", "jpeg", "gif", "png", "html", "css", "csv", "zip", "7z",
        "doc", "docx", "xls", "xlsx", "txt", "js", "torrent", "sql", "avi",
        "mp4", "gzip", "json", "webm", "webp", "description", "mkv"
    ];

    // Run when text is entered in the search box.
    $('#custom-search-form').on('input', function (e) {
        e.preventDefault();
        const target = $('#searchBox').val();
        filter(target);
    });

    // Instant search.
    let preLink = $('pre a');

    function filter(target) {
        const parent_directory = 'parent directory';
        preLink.each(function () {
            let $this = $(this);
            const arraySearch = decodeURI($this.attr('href'));

            // Check the href data for searched term. Using href because the link label truncates if the file or folder name is too long.
            // Special handling for 'Parent Directory' as the href data doesn't contain that word.
            let $nextSibling = $($this[0].nextSibling);
            if (arraySearch.toLowerCase().indexOf(target.toLowerCase()) > -1 || (($this.text() === 'Parent Directory') && (parent_directory.indexOf(target.toLowerCase()) > -1))) {
                $this.show();
                $nextSibling.css('display', 'inline');
            } else {
                $this.hide();
                if ($nextSibling.hasClass('hideMe')) {
                    $nextSibling.css('display', 'none');
                } else {
                    $nextSibling.wrap('<span class="hideMe" style="display:none"></style>');
                }
            }
        });
    }

    // Runs when clear button is hit.
    $("#searchclear").on("click", function () {
        $("#searchBox").val('');
        filter('');
    });


    // Scan all files in the directory, check the extensions and show the right MIME-type image.
    preLink.each(function () {
        let oldText;
        let found = 0;
        let $this = $(this);
        let $href = $this.attr('href');
        const arraySplit = $href.split(".");
        const fileExt = arraySplit[arraySplit.length - 1];

        const tooltipText = decodeURI($href)

        let $thisText = $this.text();
        for (let i = 0; i < formats.length; i++) {
            if (fileExt.toLowerCase() === formats[i].toLowerCase()) {
                found = 1;
                oldText = $thisText;
                $this
                    .attr("data-toggle", "tooltip")
                    .attr("id", "top")
                    .attr("title", tooltipText)
                    .html('<img class="icons" src="https://reckfularchive.github.io/files.reckful-archive.org/assets/images/icons/' + formats[i] + '.png"></a>' + oldText);
                return;
            }
        }

        // Add an icon for the go-back link.
        if ($thisText.indexOf("Parent Directory") >= 0) {
            found = 1;
            $this.html('<img class="icons" src="https://reckfularchive.github.io/files.reckful-archive.org/assets/images/icons/home.png">' + $thisText);
            return;
        }


        // Check for folders as they don't have extensions.
        if ($href.substring($href.length - 1) === '/') {
            found = 1;
            $this.html('<img class="icons" src="https://reckfularchive.github.io/files.reckful-archive.org/assets/images/icons/folder.png">' + $thisText.substring(0, $thisText.length - 1));

            // Fix for annoying jQuery behaviour where inserted spaces are treated as new elements -- which breaks my search.
            let $nextSibling = $($this[0].nextSibling);

            const string = ' ' + $nextSibling.text();

            // Copy the original meta-data string, append a space char and save it over the old string.
            $nextSibling.remove();
            $this.after(string);
            return;
        }

        // File format is not supported by Better Listings, so let's load a generic icon.
        if (found === 0) {
            $this
                .attr("data-toggle", "tooltip")
                .attr("id", "top")
                .attr("title", tooltipText)
                .html('<img class="icons" src="https://reckfularchive.github.io/files.reckful-archive.org/assets/images/icons/file.png">' + $thisText);
        }
    });

    $('[data-toggle="tooltip"]').tooltip()
});
