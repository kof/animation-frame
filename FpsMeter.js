(function() {

var now;

now = Date.now || function() { 
    return (new Date).getTime();
};

function FpsMeter(opts) {
    opts || (opts = {});
    this.updateRate = opts.updateRate || 1000;
    this._tickCounter = 0;
    this._updateIntervalId = null;
    this._resetIntervalId = null;
}

FpsMeter.prototype.start = function(callback) {
    var self = this;

    this._startTime = now();
    this._tickCounter = 0;
    this._updateIntervalId = setInterval(function() {
        if (!self._tickCounter) return;

        callback(1000 / ((now() - self._startTime) / self._tickCounter));
        self._startTime = now();
        self._tickCounter = 0;
    }, this.updateRate);

    return this;
};

FpsMeter.prototype.stop = function() {
    clearInterval(this._updateIntervalId);

    return this;
};

FpsMeter.prototype.tick = function() {
    ++this._tickCounter;

    return this;
};

window.FpsMeter = FpsMeter;

}());
