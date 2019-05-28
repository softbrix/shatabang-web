import { computed } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  imageWidth: 300,
  imagesPWidth: 4,
  zoomMultiplicator: 2,
  ratio: computed('imagesPWidth', function () {
    var imagesPWidth = Math.ceil(this.imagesPWidth);
    return 100 / imagesPWidth;
  }),

  init: function() {
    this._super(...arguments);

    this.reset();
  },
  reset() {
    const bodyWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var imageWidth = this.imageWidth;
    var imagesPWidth = Math.ceil(bodyWidth / imageWidth);
    imagesPWidth = Math.max(4, imagesPWidth); // At least 4 images in with

    this.set('imagesPWidth', imagesPWidth);
  },
  zoomIn() {
    var imagesPWidth = this.imagesPWidth;
    if(imagesPWidth > 0) {
      imagesPWidth /= this.zoomMultiplicator;
      this.set('imagesPWidth', imagesPWidth);
    }
  },
  zoomOut() {
    var imagesPWidth = this.imagesPWidth;
    if(imagesPWidth < 256) {
      imagesPWidth *= this.zoomMultiplicator;
      this.set('imagesPWidth', imagesPWidth);
    }
  }
});
