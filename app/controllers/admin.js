import fetch from 'fetch';
import Controller from '@ember/controller';
import { debug } from '@ember/debug';

export default Controller.extend({
  init: function() {
    this._super();
    fetch( './api/version')
      .then(resp => resp.text())
      .then((version) => {
        this.set('server-version', 'v' + version);
      });
  },
  actions: {
    clearImageFinger: function() {
      let handleError = (resp) => {
        debug(resp);
        this.set('clearStatus', 'Error: ' + resp.statusText);
      }
      fetch( './api/kue/add/clear_index/high/', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': "application/json; charset=utf-8"
        },
        body: JSON.stringify({'index_name': 'idx_finger'})
      }).then((resp) => {
        if (resp.ok) {
          this.set('clearStatus', 'Executed');
        } else {
          handleError(resp)
        }
      }, handleError);
    },
    rebuildImageFinger: function() {
      let handleError = (resp) => {
        debug(resp);
        this.set('rebuildStatus', 'Error: ' + resp.statusText);
      };
      let update_year = (year) => {
        fetch( './api/kue/addFolder/' + year +'/create_image_finger/low/', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Content-Type': "application/json; charset=utf-8"
          },
          body: JSON.stringify({'index_name': 'idx_finger'})
        })
          .then((resp) => {
            if (resp.ok) {
              this.set('rebuildStatus', 'Executed');
            } else {
              handleError(resp)
            }
          }, handleError);
      };
      fetch('./api/dirs/list', {
        credentials: 'include'
      })
        .then(resp => resp.json())
        .then((folders) => {
          if(folders.length === 0) {
            this.set('rebuildStatus', 'No folder found');
            return;
          }
          folders.forEach(update_year);
      }, handleError);
    }
  }
});
