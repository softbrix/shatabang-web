/* global location, URL */

import DS from 'ember-data';
import config from '../config/environment';
import { debug } from '@ember/debug';

var rootPath = new URL(config.rootURL, location).pathname;
debug('User adapter rootPath', rootPath);

export default DS.JSONAPIAdapter.extend({
  namespace: rootPath + 'api'
});
