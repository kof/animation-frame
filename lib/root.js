var root
// Browser window
if (typeof window !== 'undefined') {
  root = window
// Web Worker
} else if (typeof self !== 'undefined') {
  root = self
// Other environments
} else {
  root = this
}

module.exports = root
