'use strict'

var now = require('./now')
var global = require('./global')
var PerformanceTiming = require('./performance-timing')

/**
 * Crossplatform performance.now()
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
 *
 * @return {Number} relative time in ms
 * @api public
 */
exports.now = function () {
    if (global.performance && global.performance.now) return global.performance.now()
    return now() - PerformanceTiming.navigationStart
}

