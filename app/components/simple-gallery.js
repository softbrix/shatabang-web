import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { debug } from '@ember/debug';

export default Component.extend({
  classNames: ['gallery'],
  scrollAlmostDown: service('scroll-almost-down'),
  mediaLoader: service('media-list-loader'),
  fullscreenService: service('fullscreen'),
  imageWidthService: service('image-width'),
  mediaCount: 64,
  activeMedia: undefined,
  mediaIterator: undefined,
  mediaList: undefined,
  fromDate: undefined,

  init() {
    this._super(...arguments);
    this.set('mediaList', []);
    this.imageWidthService.reset();
  },
  didInsertElement() {
    this._super(...arguments);

    var that = this;
    this.mediaLoader.loadedPromise().then(function(tree) {
      that.set('mediaIterator', tree.leafIteratorReverse());
      // Initial load
      that._loadMedia();

      that.get('mediaLoader').fullyLoadedPromise().then(function() {
        // Reset loaded images and load more if possible
        that.set('mediaIterator', tree.leafIteratorReverse());
        that.get('mediaList').clear();
        that._loadMedia();

        var deregisterer = that.get('scrollAlmostDown').registerListener(function() {
          var loadAndCheckSize = function() {
            that._loadMedia();
            setTimeout(function() {
              if(that.get('scrollAlmostDown').scrollCheck()) {
                loadAndCheckSize();
              }
            }, 200);
          };
          loadAndCheckSize();
        });

        that.set('windowscrollCleanup', deregisterer);
      });
    });
  },
  didUpdateAttrs() {
    this._super(...arguments);

    var d = new Date(this.fromDate);
    this.mediaIterator.gotoPath([d.getFullYear(), d.getMonth() + 1, d.getDate()], true);
    this.mediaList.clear();
    this._loadMedia();
  },
  willDestroyElement() {
    this._super(...arguments);
    debug('deactivate index');
    var cleanup = this.windowscrollCleanup;
    if(cleanup !== undefined) {
      cleanup();
    }
  },
  _loadMedia() {
    const it = this.mediaIterator;
    // TODO: This should probably be a computation like:
    // images per row  * rows per screen height   ...
    const count = this.mediaCount;
    for(var i = 0; i < count && it.hasPrev(); ++i) {
      var obj = it.prev();
      obj.path = it.getPath();
      this.mediaList.pushObject(obj);
    }

    return i === count;
  },
  actions: {
    mediaClicked: function(a) {
      // Show a single media in overlay
      this.set('activeMedia', a);
    }
  }
});
