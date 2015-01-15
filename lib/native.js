'use strict'

var top

// Test if we are within a foreign domain. Use raf from the top if possible.
try {
    // Accessing .name will throw SecurityError within a foreign domain.
    window.top.name
    top = window.top
} catch(e) {
    top = window
}

exports.request = top.requestAnimationFrame
exports.cancel = top.cancelAnimationFrame || top.cancelRequestAnimationFrame
exports.supported = false

var vendors = ['Webkit', 'Moz', 'ms', 'O']

// Grab the native implementation.
for (var i = 0; i < vendors.length && !exports.request; i++) {
    exports.request = top[vendors[i] + 'RequestAnimationFrame']
    exports.cancel = top[vendors[i] + 'CancelAnimationFrame'] ||
        top[vendors[i] + 'CancelRequestAnimationFrame']
}

// Test if native implementation works.
// There are some issues on ios6
// http://shitwebkitdoes.tumblr.com/post/47186945856/native-requestanimationframe-broken-on-ios-6
// https://gist.github.com/KrofDrakula/5318048

if (exports.request) {
    exports.request.call(null, function() {
        exports.supported = true
    });
}
