import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service('session'),

  actions: {
    authenticate() {
      let { username, password } = this;
      this.session.authenticate('authenticator:passport_local', username, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
