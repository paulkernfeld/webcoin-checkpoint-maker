var assert = require('assert')

var mapStream = require('map-stream')

function webcoinCheckpointMaker (opts) {
  var toFind = []
  assert(Array.isArray(opts.heights))
  opts.heights.forEach(function (height) {
    assert(height % 2016 === 0, 'heights should be a multiple of 2016 for efficiency')
    assert(toFind.length === 0 || height > toFind[toFind.length - 1], 'put heights in order')
    toFind.push(height)
  })

  var haveCalledOptsCb = false

  return mapStream(function (block, cb) {
    if (toFind.length === 0) {
      if (!haveCalledOptsCb) {
        haveCalledOptsCb = true
        return opts.cb()
      }
      return cb(null, null)
    }

    if (block.height !== toFind[0]) {
      return cb()
    }

    var blockOut = {
      height: block.height,
      header: {
        version: block.header.version,
        prevHash: block.header.prevHash,
        merkleRoot: block.header.merkleRoot,
        timestamp: block.header.timestamp,
        bits: block.header.bits,
        nonce: block.header.nonce
      }
    }

    toFind.shift()
    cb(null, blockOut)
  })
}

module.exports = webcoinCheckpointMaker
