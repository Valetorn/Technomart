'use strict';

var utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var isKeyboardEvent = function (evt) {
    return typeof evt.keyCode !== 'undefined';
  };
  return {
    isActivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE;
    },
    isDeactivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE;
    }
  };
})();
