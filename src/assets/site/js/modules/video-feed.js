(function ($) {

  var apiKey = '<your key>';

  $('.video-feed').each(buildFeed);

  function buildFeed() {
    var self = $(this);
    var numVideos = self.data('numVideos') || 3;
    var numCols = 12 / numVideos;
    var url = `https://www.googleapis.com/youtube/v3/search?part=id&forMine=true&order=date&type=video&key=${apiKey}&maxResults=${numVideos}`;
    $.getJSON(url, function (data) {
      var html = [];
      for (var i = 0; i < data.items.length; i++) {
        html.push(`<div class="col-md-${numCols}><div class="video-container"><iframe src="http://www.youtube.com/embed/' + data.items[i].id + '" frameborder="0" allowfullscreen></iframe></div></div>`);
      }
      self.html(html);
    });
  }

}(window.jQuery));