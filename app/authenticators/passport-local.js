"use strict";
/* global Ember, $ */

import { Promise as EmberPromise, reject } from 'rsvp';

import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({

  /**
    @method restore
    @param {Object} data The data to restore the session from
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
    @public
  */
  restore(data) {
    console.log('restore user',data);
    return new EmberPromise(function(resolve, reject){
      $.get( './api/users/me')
        .done(resolve)
        .fail(function(resp) {
          if(resp.status === 401) {
            reject('Unknown username and/or password');
          } else {
            reject('Unknown authorization error');
          }
        });
    });
  },

  /*

    @method authenticate
    @param {String} provider The torii provider to authenticate the session with
    @param {Object} options The options to pass to the torii provider
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
    @public
  */
  authenticate(username, password) {
    if(username === undefined || username.trim().length === 0) {
      return reject('Username must not be empty');
    }
    if(password === undefined || password.trim().length === 0) {
      return reject('Password must not be empty');
    }
    return new EmberPromise(function(resolve, reject){
      $.post( './api/users/authenticate', { username: username, password: password })
        .done(resolve)
        .fail(function(resp) {
          if(resp.status === 401) {
            reject('Unknown username and/or password');
          } else {
            reject('Unknown authorization error');
          }
        });
    });
  },

  /**
    Closes the torii provider. If the provider is successfully closed, this
    method returns a resolving promise, otherwise it will return a rejecting
    promise, thus intercepting session invalidation.

    @method invalidate
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
    @public
  */
  invalidate(data) {
    return new EmberPromise(function(resolve, reject){
      $.post( './api/users/invalidate')
        .done(resolve)
        .fail(function(resp) {
          console.log(resp);
          reject('Unknown authorization error');
        });
    });
  }
});
