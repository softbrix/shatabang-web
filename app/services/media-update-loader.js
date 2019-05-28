import Service from '@ember/service';
import { debug } from '@ember/debug';

export default Service.extend({

  initialize: function() {
    setInterval(function() {
      fetch('./api/upload/imported')
        .then(function (response) {
          var images = response.text();
          if(images !== undefined && images.length > 0) {
            debug('imported: '+  JSON.stringify(images));
            /*importImages(images);
            imageList = undefined;
            clearImageList();
            ptr.end = ptr.start;
            // TODO: Should only update current position
            loadMoreImages();
            */
          }
        });
    }, 10 * 1000);
  }
});
