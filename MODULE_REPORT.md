## Module Report
### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/adapters/user.js` at line 6

```js
import Ember from 'ember';
import config from '../config/environment';
const {Logger} = Ember;

var rootPath = new URL(config.rootURL, location).pathname;
```

### Runtime Error

**Path**: `app/controllers/faces.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
import Controller from '@ember/controller';

import Ember from 'ember';

const Logger = Ember;

export default Controller.extend({
  addingPerson: false,
  selectedElement: undefined,
  selectedFace: undefined,
  actions: {
    addPerson() {
      var isAddingPerson = this.addingPerson;
      if(isAddingPerson) {
        if(!this.selectedFace) {
          this.set('highlightSelectFace', true);
          return;
        }
        var person = this.store.createRecord('person', {
          name: this.newPersonName,
          thumbnail: this.get('selectedFace.b')
        });
        return person.save().then(() => {
          this.resetSelectedFace();
          this.set('addingPerson', false);
          this.set('newPersonName', '');
        }, (error) => {
          this.set('addPersonError', error);
        });
      }
      this.set('addingPerson', !isAddingPerson);
    },
    cancelAddPerson() {
      this.resetSelectedFace();
      this.set('addingPerson', false);
    },
    imageClicked(face, event) {
      if(this.addingPerson) {
        this.resetSelectedFace();
        this.set('selectedFace', face);
      } else {
        // TODO: Lookup media
        Logger.debug(face, event);
        this.set('activeMedia', face);
      }
    },
    personClicked(person) {
      Logger.debug(person);
    }
  },
  resetSelectedFace() {
    this.set('highlightSelectFace', false);
    this.set('selectedFace', undefined);
  }
});

```

### Runtime Error

**Path**: `app/components/fullsize-media.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
import $ from 'jquery';

import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const Logger = Ember;

export default Component.extend({
  activeMedia: undefined,
  reverseMove: false,
  mediaLoader: service('media-list-loader'),
  mediaModel: service('media-model'),
  fullscreenService: service('fullscreen'),
  init() {
    this._super(...arguments);
    var popStateMethd = this._onpopstate.bind(this); 
    window.addEventListener('popstate', popStateMethd);
    this._resetPopStateEvent = function() {
      window.removeEventListener("keydown", popStateMethd);
    };
  },
  didDestroyElement() {
    this._super(...arguments);
    this._resetPopStateEvent();
  },
  didUpdateAttrs() {
    var a = this.activeMedia;
    if(a) {
      if(this.iterator === undefined) {
        var it = this.get('mediaLoader.tree').leafIterator();
        it.gotoPath(a.path);
        this.set('iterator', it);
        this._preloadImages(it);

        var handleKeyMethd = this._handleKey.bind(this);
        window.addEventListener("keydown", handleKeyMethd);
        this._resetHandleKeyEventMthd = function() {
          window.removeEventListener("keydown", handleKeyMethd);
        };
        history.pushState(a, '', '#view='+a.bigMedia);
      } else {
        history.replaceState(a, '', '#view='+a.bigMedia);
      }
    }
  },
  actions: {
    close() {
      window.history.back();
    },
    moveRight: function(event) {
      if(event) {
        event.preventDefault();
      }
      if(this.reverseMove) {
        this._iterateNext()
      } else {
        this._iteratePrev();
      }
    },
    moveLeft: function(event) {
      if(event) {
        event.preventDefault();
      }
      if(this.reverseMove) {
        this._iteratePrev()
      } else {
        this._iterateNext();
      }
    },
    toggleInteractive: function(event) {
      if(!event.defaultPrevented) {
        $("#interactiveOverlay").toggle();
      }
    },
    confirmDelete: function(event) {
      if(event) {
        event.preventDefault();
      }
      let confirmed = window.confirm('Do you really want to delete this media file?');
      if(confirmed) {
        let moveNext = this._iteratePrev.bind(this);
        this.mediaModel.deleteMedia(this.get('activeMedia.img')).then(function() {
          moveNext();
        }, Logger.error);
      }
    }
  },
  _preloadImages: function(path) {
    var it = this.get('mediaLoader.tree').leafIterator();
    it.gotoPath(path);
    if(it.hasNext()) {
      this._loadBigImage(it.next());
      it.prev();
    }
    if(it.hasPrev()) {
      this._loadBigImage(it.prev());
      it.next();
    }
  },
  _loadBigImage: function(media) {
    if(media === undefined) {
      return;
    }
    var curImg = new Image();
    curImg.src = media.bigMedia;
  },
  _handleKey: function(event) {
    if(event.key === "ArrowLeft" || event.keyCode === 37) {
      this.actions.moveLeft.apply(this);
    } else if(event.key === "ArrowRight" || event.keyCode === 39) {
      this.actions.moveRight.apply(this);
    } else if(event.key === "Escape" || event.keyCode === 27) {
      this.actions.close.apply(this);
    } else {
      Logger.debug('unknown key', event.key,event.keyCode);
    }
  },
  _iterateNext() {
    var it = this.iterator;
    if(it.hasNext()) {
      var next = it.next();
      if(next === this.activeMedia) {
        next = it.next();
      }
      this._preloadImages(it.getPath());
      this.set('activeMedia', next);
    }
  },
  _iteratePrev() {
    var it = this.iterator;
    if(it.hasPrev()) {
      var prev = it.prev();
      if(prev === this.activeMedia) {
        prev = it.prev();
      }
      this._preloadImages(it.getPath());
      this.set('activeMedia', prev);
    }
  },
  _resetActiveMedia: function() {
    // Go back to gallery
    this.set('activeMedia', undefined);
    this.set('iterator', undefined);
    this._resetHandleKeyEventMthd();
    if(this.get('fullscreenService.isFullscreen')) {
      this.fullscreenService.closeFullscreen();
    }
  },
  _onpopstate() {
    this._resetActiveMedia.bind(this)();
  }
});

```

### Runtime Error

**Path**: `app/components/simple-gallery.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
/* global window */

import { inject as service } from '@ember/service';
import Component from '@ember/component';
import Ember from 'ember';

const Logger = Ember;

export default Component.extend({
  classNames: ['gallery'],
  scrollAlmostDown: service('scroll-almost-down'),
  mediaLoader: service('media-list-loader'),
  fullscreenService: service('fullscreen'),
  imageWidthService: service('image-width'),
  mediaCount: 64,
  activeMedia: undefined,
  mediaIterator: undefined,
  mediaList: [],
  fromDate: undefined,

  init() {
    this._super(...arguments);
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
    Logger.debug('deactivate index');
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

```

### Runtime Error

**Path**: `app/components/user-info.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import Ember from 'ember';

const Logger = Ember;

export default Component.extend({
  session: service('session'),
  currentUser: service('current-user'),
  init: function() {
    Logger.debug('init user info');
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
      Logger.info('invalidate session action');
      this.session.invalidate();
    }
  },

  _loadCurrentUser() {
    return this.currentUser.load().catch((err) => { Logger.error(err); this.session.invalidate()});

  },
  userName : '',
  showUserInfo: false
});

```

### Runtime Error

**Path**: `app/routes/faces.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
import $ from 'jquery';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
import RSVP from 'rsvp';

const Logger = Ember;

// TODO: Remove code dupplication
// This could be handled on the server
const MAX_SHORT = 65535;

function fromHex(v) {
  return parseInt(v, 16);
}

function expandFaceInfo(info) {
  if(info.length < 14 /* todo: regexp match input*/) {
    return { x: NaN, y: NaN, w: NaN, h: NaN };
  }
  var t = function t(val) {
    return fromHex(val) / MAX_SHORT;
  };
  const BLK_WIDTH = 4;
  return {
    x: t(info.substr(0, BLK_WIDTH)),
    y: t(info.substr(4, BLK_WIDTH)),
    w: t(info.substr(8, BLK_WIDTH)),
    h: t(info.substr(12, BLK_WIDTH))
  };
}
// END TODO

export default Route.extend(AuthenticatedRouteMixin).extend({
  model() {
    return RSVP.hash({
      faces: $.getJSON('./api/faces/list')
        .then(list =>  {
          list.forEach((a) => {
            if(a.s * 1 !== a.s) {
              Logger.log('No stat', a.k);
              a.s = 0;
            }
          });
          return list;
        })
        .then(list => list.map(itm => { var o = expandFaceInfo(itm.i); o.s = itm.s; o.k = itm.k; o.b = itm.b; return o}))
        .then(list => list.map(itm => { itm.a = itm.h * itm.w; return itm; }))
        .then(list => list.sort((a,b) => b.a - a.a))  // Sort desc based on focus
        .then(l => l.slice(0, 1024)),
      people: this.store.findAll('person')
    });
  }
});

```

### Runtime Error

**Path**: `app/routes/login.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
import $ from 'jquery';
import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import Ember from 'ember';

const Logger = Ember;

export default Route.extend(UnauthenticatedRouteMixin).extend({
  setupController: function(controller, model) {
    $.getJSON('./api/auth/list', function(auth_list) {
      Logger.log('Auth list: ', auth_list, model);
      controller.set('useForm', auth_list.indexOf('admin') > -1);
      controller.set('useGoogle', auth_list.indexOf('google') > -1);
    });
  }
});

```

### Runtime Error

**Path**: `app/services/media-list-loader.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
/* global Promise */

import $ from 'jquery';
import Ember from 'ember';
import Service from '@ember/service';
import { Promise as EmberPromise, defer } from 'rsvp';
import DibbaTree from 'npm:dibba_tree';

const Logger = Ember;
const movieFileRegexp = /(.+)(mp4|m4v|avi|mov|mpe?g)$/gi;

// "2016/03/14/222624.jpg"
const fileNameRegexp = /^([\d]{4}).?(\d{2}).?(\d{2}).?(\d{2})(\d{2})(\d{2})/;
function fileName2Date(fileName) {
  var result = fileNameRegexp.exec(fileName);
  var date = new Date();
  if(result !== undefined && result !== null) {
    date = new Date(result[1], result[2]-1, result[3], result[4], result[5], result[6]);
  } else {
      Logger.error('Unknown date or file type' ,fileName);
  }
  return date;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default Service.extend({
  tree : new DibbaTree(),
  loadedDeferred: defer(),
  fullyLoadedDeferred: defer(),
  isFullyLoaded: false,
  folders: [],

  init: function() {
    var tree = this.tree;
    var loadedDeferred = this.loadedDeferred;
    var fullyLoadedDeferred = this.fullyLoadedDeferred;
    var that = this;

    $.get('./api/dirs/list').then(function(folders) {
      if(folders.length === 0) {
        return;
      }

      // Sort folders descending, are delivered ascending DOH!...
      folders = folders.filter(isNumber).sort(function(a,b){return b-a;});

      //that.set('folders', folders);

      var importImages = function(images) {
        images.forEach(function(fileName) {
          var date = fileName2Date(fileName);

          var isVideo, bigMediaFileName;
          if(movieFileRegexp.test(fileName)) {
            bigMediaFileName = "./video/" + fileName;
            fileName = fileName.replace(movieFileRegexp, '$1jpg');
            isVideo = true;
          } else {
            bigMediaFileName = './images/1920/' + fileName;
            isVideo = false;
          }

          var newObj = {
            date: date,
            img: fileName,
            bigMedia: bigMediaFileName,
            downloadUrl: "./media/" + fileName,
            isVideo: isVideo,
            isImage: !isVideo
          };

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
        return $.get('./images/info/'+folder+'/media.lst')
          .then(function (response) {
            var images = response.split(',');

            Logger.info(images);

            if(folder !== 'import') {
              importImages(images);
            }
            return images.length;
          });
      };

      // This loads the first years image list
      loadImageList(folders[0])
        .then(function() {
          Logger.debug('resolving');
          loadedDeferred.resolve(tree);
          // Load the rest of the images
          var promises = folders.slice(1).map(loadImageList);
          Promise.all(promises).then(values => {
            Logger.info(tree.getSize(), values);
            that.set('isFullyLoaded', true);
            fullyLoadedDeferred.resolve(values);
          }).catch(fullyLoadedDeferred.reject);
        })
        .catch(function (response) {
          loadedDeferred.reject('Failed to resolve image tree' + response);
        });
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

```

### Runtime Error

**Path**: `app/services/media-update-loader.js`

**Error**:

```
TypeError: Cannot read property 'forEach' of undefined
    at getIdentifierProperties (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:232:24)
    at root.find (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/transform.js:206:40)
    at matchNode (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/matchNode.js:25:12)
    at Context.visit (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:41:22)
    at Context.visitor.(anonymous function) [as visitVariableDeclarator] (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/jscodeshift/src/collections/Node.js:52:24)
    at Context.invokeVisitorMethod (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:344:49)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:196:32)
    at NodePath.each (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path.js:101:26)
    at visitChildren (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:219:18)
    at Visitor.PVp.visitWithoutReset (/Users/andreas/.npm/_npx/65320/lib/node_modules/ember-modules-codemod/node_modules/recast/node_modules/ast-types/lib/path-visitor.js:204:20)
```

**Source**:

```js
import $ from 'jquery';
import Service from '@ember/service';
import Ember from 'ember';

const Logger = Ember;

export default Service.extend({

  initialize: function() {
    setInterval(function() {
      $.get('./api/upload/imported')
        .then(function (response) {
          var images = response.data;
          if(images !== undefined && images.length > 0) {
            Logger.debug('imported', images);
            /*importImages(images);
            imageList = undefined;
            clearImageList();
            ptr.end = ptr.start;
            // TODO: Should only update current position
            loadMoreImages();
            */
          }
        });
    }, 10 * 1000);
  }
});

```
