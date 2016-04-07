$(document).ready(function() {
    var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=fab8e8f200b71e58f52419b0d512df8d&user_id=14670946%40N04&per_page=12&page=1&format=json&nojsoncallback=1',
        blogUrl = 'http://tech.nickserra.com/api/get_recent_posts/?callback=?',
        githubUrl = 'https://api.github.com/users/nicholasserra/repos?callback=ns&sort=pushed';

    $.getJSON(flickrUrl, function(data) {
        var items = [];
        $.each(data.photos.photo, function(item, val) {
            items.push('<li><a href="https://www.flickr.com/photos/' + val.owner + '/' + val.id + '" title="' + val.title + '" rel="gallery"><img src="https://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '_s.jpg" / alt="' + val.title + '"></a></li>');
        });

        $('<ul/>', {
            'class': 'thumbs',
            html: items.join('')
        }).appendTo('#gallery');
    });

    $.ajax({
        url: githubUrl,
        dataType: "jsonp",
        success: function(data) {
            var items = [];
            $.each(data.data, function(item, val) {
                if (!val.fork) {
                    items.push('<li><a href="' + val.html_url + '">' + val.name + '</a></li>');
                }
            });
            $('<ul/>', {
                'class': 'nav nav-list',
                html: items.join('')
            }).appendTo('#repos');
        }
    });

    $.getJSON(blogUrl, function(data) {
        var items = [];
        $.each(data.posts, function(item, val) {
            items.push('<li><a href="' + val.url + '">' + val.title + '</a></li>');
        });

        $('<ul/>', {
            'class': 'nav nav-list',
            html: items.join('')
        }).appendTo('#blogposts');
    });
});
