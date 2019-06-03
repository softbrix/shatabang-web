import Service from '@ember/service';

export default Service.extend({
  toggleFullscreen: function() {
    if(this.isFullscreen) {
      return this.closeFullscreen();
    } else {
      return this.openFullscreen();
    }
  },
  closeFullscreen: function() {
    if(this.isFullscreen && cancelFullScreen()) {
      this.set('isFullscreen', false);
    }
    return this.isFullscreen == false;
  },
  openFullscreen: function() {
    if(this.isFullscreen == false && requestFullscreen()) {
      this.set('isFullscreen', true);
    }
    return this.isFullscreen == false;
  },
  isFullscreen: false
});

function cancelFullScreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.msCancelFullscreen) {
    document.msCancelFullScreen();
  } if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else {
    return false;
  }
  return true;
}

function requestFullscreen() {
  let elem = document.body;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else {
    return false;
  }
  return true;
}
