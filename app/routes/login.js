import fetch from 'fetch';
import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { debug } from '@ember/debug';

export default Route.extend(UnauthenticatedRouteMixin).extend({
  setupController: function(controller, model) {
    return fetch('./api/auth/list')
      .then((resp) => resp.json())
      .then(auth_list => {
        debug('Auth list: ' +  JSON.stringify(auth_list) + ' , model: ' +  JSON.stringify(model));
        controller.set('useForm', auth_list.indexOf('admin') > -1);
        controller.set('useGoogle', auth_list.indexOf('google') > -1);
      });
  }
});
