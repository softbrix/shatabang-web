import { run } from '@ember/runloop';
import Service from '@ember/service';

export default Service.extend({
  registerListener: function(callback) {
    // Creates a listener for the window scoll event
    var scrollChecker = newScrollCheck(callback);
    window.addEventListener('scroll', scrollChecker);
    // Return a cleanup method
    return function() {
      window.removeEventListener('scroll', scrollChecker);
    };
  },

  scrollCheck: internalScrollCheck
});

function internalScrollCheck(lastS) {
  if(lastS === undefined) {
    lastS = 0;
  }
  var s = scrollTop(),
  d = Math.max(document.body.clientHeight, document.documentElement.scrollHeight),
  c = window.innerHeight;

  var scrollPercent = (s / (d-c)) * 100;
  return d === c || (scrollPercent > 90 && s >= lastS);
}

/*
Create a new method for the given callback
*/
function newScrollCheck(callback) {
  var lastS = 0, lastCallback = 0;
  return function() {
    var now = new Date().getTime();
    if(now - lastCallback < 500) {
      return;
    }
    if(internalScrollCheck(lastS)) {
      lastCallback = now;
      run(callback);
    }
    lastS = scrollTop();
  };
}

function scrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}