(function() {

var now = Date.now || function() {
    return (new Date).getTime()
}

function FpsMeter(opts) {
    opts || (opts = {})
    this.updateRate = opts.updateRate || 1000
    this._tickCounter = 0
    this._updateTimeoutId = null
}

FpsMeter.prototype.start = function(callback) {
    var self = this

    this._startTime = now()
    this._tickCounter = 0
    this._updateTimeoutId = setTimeout(function() {
        if (self._tickCounter) {
            callback(Math.round(1000 / ((now() - self._startTime) / self._tickCounter)))
        }
        self.start(callback)
    }, this.updateRate)

    return this
}

FpsMeter.prototype.stop = function() {
    clearTimeout(this._updateTimeoutId)

    return this
}

FpsMeter.prototype.tick = function() {
    ++this._tickCounter

    return this
}

window.FpsMeter = FpsMeter

}())
