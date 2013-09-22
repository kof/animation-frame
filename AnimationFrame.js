/**
 * An even better animation frame.
 *
 * @copyright Oleg Slobodskoi 2013
 * @website https://github.com/kof/animationFrame
 * @license MIT
 */

(function(window) {
'use strict';

var now = Date.now,
    setTimeout = window.setTimeout,
    shim = false,
    nativeRequestAnimationFrame,
    nativeCancelAnimationFrame,
    useNative = false;

(function() {
    var i,
        vendors = ['ms', 'moz', 'webkit', 'o'];

    // Grab the native implementation.
    for (i = 0; i < vendors.length && !nativeRequestAnimationFrame; i++) {
        nativeRequestAnimationFrame = top[vendors[i] + 'RequestAnimationFrame'];
        nativeCancelAnimationFrame = top[vendors[i] + 'CancelAnimationFrame'] ||
            top[vendors[i] + 'CancelRequestAnimationFrame'];
    }

    // Test if native implementation works.
    // There are some issues on ios6
    // http://shitwebkitdoes.tumblr.com/post/47186945856/native-requestanimationframe-broken-on-ios-6
    // https://gist.github.com/KrofDrakula/5318048
    nativeRequestAnimationFrame(function() {
        useNative = true;
    });
}());

function AnimationFrame(frameRate) {
    if (!(this instanceof AnimationFrame)) return new AnimationFrame(frameRate);
    this.frameRate = frameRate || AnimationFrame.FRAME_RATE;
    this._frameLength = 1000 / this.frameRate;
    this._isCustomFrameRate = this.frameRate !== AnimationFrame.FRAME_RATE;
    this._originalFrameLength = 1000 / AnimationFrame.FRAME_RATE;
    this._tickId = null;
    this._callbacks = {length: 0};
    this._lastTickTime = 0;
    this._tickCounter = 0;
}

/**
 * Default frame rate used for shim implementation. Native implementation
 * will use the screen frame rate, but js have no way to detect it.
 *
 * If you know your target device, define it manually.
 *
 * @type {Number}
 * @api public
 */
AnimationFrame.FRAME_RATE = 60;

/**
 * Replace the globally defined implementation or define it globally.
 *
 * @param {Number} [frameRate] optional frame rate
 * @api public
 */
AnimationFrame.shim = function(frameRate) {
    var animationFrame = new AnimationFrame(frameRate);
    window.requestAnimationFrame = animationFrame.request;
    window.cancelAnimationFrame = animationFrame.cancel;
    shim = true;
    return animationFrame;
};


/**
 * We upgrade to native raf as soon we know it does works.
 *
 * @param {Function} callback
 * @return {Number} timeout id or requested animation frame id
 * @api public
 */
AnimationFrame.prototype.request = function(callback) {
    var self = this,
        delay;

    if (useNative && !this._isCustomFrameRate) return nativeRequestAnimationFrame(callback);

    if (this._tickId == null) {
        // Much faster than Math.max
        // http://jsperf.com/math-max-vs-comparison/3
        // http://jsperf.com/date-now-vs-date-gettime/11
        delay = this._frameLength + this._lastTickTime - (now ? now() : (new Date).getTime());

        // We assume native implementation runs with same rate as our default.
        // Correct the frame rate considering native raf delay.
        if (useNative && this._isCustomFrameRate) {
            delay = delay - self._originalFrameLength;
        }

        if (delay < 0) delay = 0;

        this._tickId = setTimeout(function() {
            var i,
                callbacks = self._callbacks,
                len = self._callbacks.length;

            self._tickId = null;
            self._lastTickTime = now ? now() : (new Date).getTime();
            self._callbacks = {length: 0};
            ++self._tickCounter;
            for (i = 0; i < len; ++i) {
                if (callbacks[i]) {
                    if (useNative && self._isCustomFrameRate) {
                        nativeRequestAnimationFrame(callbacks[i]);
                    } else {
                        callbacks[i](self._lastTickTime);
                    }
                }
            }
        }, delay);
    }

    this._callbacks[this._callbacks.length] = callback;
    ++this._callbacks.length;
    return this._callbacks.length - 1 + this._tickCounter;
};

/**
 * Cancel animation frame.
 *
 * @param {Number} timeout id or requested animation frame id
 *
 * @api public
 */
AnimationFrame.prototype.cancel = function(id) {
    if (useNative && !this._isCustomFrameRate) return nativeCancelRequestAnimationFrame(id);
    delete this._callbacks[id - this._tickCounter];
};

// Support commonjs wrapper, amd define and plain window.
if (typeof exports == 'object' && typeof module == 'object') {
    module.exports = AnimationFrame;
} else {
    if (typeof define == 'function' && define.amd) {
        define(function() { return AnimationFrame; });
    } else {
        window.AnimationFrame = AnimationFrame;
    }
}

}(window));
