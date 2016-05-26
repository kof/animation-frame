'use strict'

var root = require('./root')

// Test if we are within a foreign domain. Use raf from the top if possible.
try {
  // Accessing .name will throw SecurityError within a foreign domain.
  root.top.name
  root = root.top
} catch(e) {}

exports.request = root.requestAnimationFrame
exports.cancel = root.cancelAnimationFrame || root.cancelRequestAnimationFrame
exports.supported = false

var vendors = ['Webkit', 'Moz', 'ms', 'O']

// Grab the native implementation.
for (var i = 0; i < vendors.length && !exports.request; i++) {
  exports.request = root[vendors[i] + 'RequestAnimationFrame']
  exports.cancel = root[vendors[i] + 'CancelAnimationFrame'] ||
    root[vendors[i] + 'CancelRequestAnimationFrame']
}

// Test if native implementation works.
// There are some issues on ios6
// http://shitwebkitdoes.tumblr.com/post/47186945856/native-requestanimationframe-broken-on-ios-6
// https://gist.github.com/KrofDrakula/5318048

if (exports.request) {
  exports.request.call(null, function() {
    exports.supported = true
  })
}
