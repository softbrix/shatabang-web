import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { debug } from '@ember/debug';

export default Component.extend({
  session: service('session'),
  currentUser: service('current-user'),
  init: function() {
    debug('init user info');
    this._super(...arguments);
    let that = this;
    this._loadCurrentUser().then(function() {
      let user = that.get('currentUser').get('user');
      if(user) {
        that.set('userName', user.get('username'));
      }
    });
  },
  actions: {
    toggleShowUserInfo: function() {
      this.set('showUserInfo', !this.showUserInfo);
    },
    invalidateSession() {
      debug('invalidate session action');
      this.session.invalidate();
    }
  },

  _loadCurrentUser() {
    return this.currentUser.load().catch((err) => { debug(JSON.stringify(err)); this.session.invalidate()});

  },
  userName : '',
  showUserInfo: false
});
