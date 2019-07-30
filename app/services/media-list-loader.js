/* global Promise */

import { debug } from '@ember/debug';
import fetch from 'fetch';
import Service from '@ember/service';
import { Promise as EmberPromise, defer } from 'rsvp';
import DibbaTree from 'dibba_tree';

const movieFileRegexp = /(.+)(mp4|m4v|avi|mov|mpe?g)$/gi;

// "2016/03/14/222624.jpg"
const fileNameRegexp = /^([\d]{4}).?(\d{2}).?(\d{2}).?(\d{2})(\d{2})(\d{2})/;
function fileName2Date(fileName) {
  var result = fileNameRegexp.exec(fileName);
  var date = new Date();
  if(result !== undefined && result !== null) {
    date = new Date(result[1], result[2]-1, result[3], result[4], result[5], result[6]);
  } else {
      debug('Unknown date or file type: ' + fileName);
  }
  return date;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default Service.extend({
  tree : undefined,
  loadedDeferred: defer(),
  fullyLoadedDeferred: defer(),
  isFullyLoaded: false,
  folders: undefined,

  init: function() {
    this._super(...arguments)
    this.tree = new DibbaTree();
    this.folders = [];
    var tree = this.tree;
    var loadedDeferred = this.loadedDeferred;
    var fullyLoadedDeferred = this.fullyLoadedDeferred;
    var that = this;

    fetch('./api/dirs/list').then(resp => resp.json()).then(async (folders) =>{
      if(folders.length === 0) {
        return;
      }

      // Sort folders descending, are delivered ascending DOH!...
      folders = folders.filter(isNumber).sort(function(a,b){return b-a;});

      var importImages = function(images) {
        images.forEach(function(fileName) {
          if (fileName.length <= 0) {
            return;
          }
          var date = fileName2Date(fileName);
          var newObj = {
            date: date,
            fileName: fileName,
            downloadUrl: "./media/" + fileName,
          };

          if(movieFileRegexp.test(fileName)) {
            newObj.bigMedia = "./video/" + fileName;
            newObj.img = fileName.replace(movieFileRegexp, '$1jpg');
            newObj.isVideo = true;
          } else {
            newObj.bigMedia = './images/1920/' + fileName;
            newObj.img = fileName;
            newObj.isVideo = false;
          }
          newObj.isImage = !newObj.isVideo;
          

          var y = date.getFullYear();
          var m = date.getMonth()+1; // Month is numbered from 0 - 11. Compensate with +1
          var d = date.getDate();
          var hh = date.getHours();
          var mm = date.getMinutes();
          var ss = date.getSeconds();
          var id = fileName.split('_')[1] || 0;

          tree.update(newObj, y, m, d, hh, mm, ss, id);
        });
      };

      var loadImageList = function(folder) {
        that.get('folders').pushObject(folder);
        return fetch('./images/info/'+folder+'/media.lst')
          .then(resp => resp.text())
          .then(function (response) {
            var images = response.split(',');

            debug(JSON.stringify(images));

            if(folder !== 'import') {
              importImages(images);
            }
            return images.length;
          });
      };

      try {
        // This loads the first years image list
        for (var i = 0; i < folders.length; ++i) {
          await loadImageList(folders[i])
          if (tree.getSize() > 0) {
            break;
          }
        }

        debug('resolving');
        loadedDeferred.resolve(tree);
        // Load the rest of the images
        var promises = folders.slice(i+1).map(loadImageList);
        try {
          let values = await Promise.all(promises);
          debug('Tree size: ' + tree.getSize());
          debug(JSON.stringify(values));
          that.set('isFullyLoaded', true);
          fullyLoadedDeferred.resolve(values);
        } catch (err) {
          fullyLoadedDeferred.reject(err);
        }
      } catch (response) {
        loadedDeferred.reject('Failed to resolve image tree' + response);
      }
    });
  },
  loadedPromise: function() {
    if(this.isFullyLoaded) {
      return EmberPromise.resolve(this.tree);
    } else {
      return this.loadedDeferred.promise;
    }
  },
  fullyLoadedPromise: function() {
      return this.fullyLoadedDeferred.promise;
  }
});
