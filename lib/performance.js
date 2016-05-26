'use strict'

var now = require('./now')
var PerformanceTiming = require('./performance-timing')
var root = require('./root')

/**
 * Crossplatform performance.now()
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
 *
 * @return {Number} relative time in ms
 * @api public
 */
exports.now = function () {
  if (root.performance && root.performance.now) return root.performance.now()
  return now() - PerformanceTiming.navigationStart
}
