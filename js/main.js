$(document).ready(function(){
    var flickr_json_url = 'http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=fab8e8f200b71e58f52419b0d512df8d&user_id=14670946%40N04&per_page=12&page=1&format=json&nojsoncallback=1',
        wordpress_json_url = 'http://tech.nickserra.com/api/get_recent_posts/?callback=?',
        github_json_url = 'https://api.github.com/users/nicholasserra/repos?callback=ns';

    $.getJSON(flickr_json_url, function(data) {
      var items = [];
      $.each(data.photos.photo, function(item, val) {
        items.push('<li><a href="http://farm'+val.farm+'.staticflickr.com/'+val.server+'/'+val.id+'_'+val.secret+'.jpg" title="'+val.title+'" rel="gallery"><img src="http://farm'+val.farm+'.staticflickr.com/'+val.server+'/'+val.id+'_'+val.secret+'_s.jpg" / alt="'+val.title+'"></a></li>');
      });

      $('<ul/>', {
        'class': 'thumbs',
        html: items.join('')
      }).appendTo('#gallery');
    });

    $.ajax({
        url: github_json_url,
        dataType:"jsonp",
        success: function(data) {
            var items = [];
            $.each(data.data, function(item, val) {
                items.push('<li><a href="'+val.url+'">'+val.name+'</a></li>');
            });
            $('<ul/>', {
              'class': 'nav nav-list',
              html: '<li class="nav-header">Repositories</li>'+items.join('')
            }).appendTo('#repos');
        }
    });

    $.getJSON(wordpress_json_url, function(data) {
      var items = [];
      $.each(data.posts, function(item, val) {
        items.push('<li><a href="'+val.url+'">'+val.title+'</a></li>');
      });

      $('<ul/>', {
        'class': 'nav nav-list',
        html: '<li class="nav-header">Blog Posts</li>'+items.join('')
      }).appendTo('#blogposts');
    });
})