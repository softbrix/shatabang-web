"use strict";
import { debug } from '@ember/debug';
import fetch from 'fetch';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({

  /**
    @method restore
    @param {Object} data The data to restore the session from
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
    @public
  */
  restore() {
    return fetch( './api/users/me')
      .then(resp => {
        if (resp.ok) {
          return resp.text()
        }
        debug(resp);
        if(resp.status === 401) {
          return Promise.reject('Unknown username and/or password');
        } else {
          return Promise.reject('Unknown authorization error');
        }
      });
  },

  /*

    @method authenticate
    @param {String} provider The torii provider to authenticate the session with
    @param {Object} options The options to pass to the torii provider
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
    @public
  */
  authenticate() {
    return this.restore();
  },

  /**
    Closes the torii provider. If the provider is successfully closed, this
    method returns a resolving promise, otherwise it will return a rejecting
    promise, thus intercepting session invalidation.

    @method invalidate
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
    @public
  */
  invalidate() {
    return fetch( './api/users/invalidate', {
        method: 'post'
      })
      .catch(function() {
        Promise.reject('Unknown authorization error');
      });
  }
});
