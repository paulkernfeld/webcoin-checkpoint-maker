var pump = require('pump')
var SimpleBlockStream = require('simple-block-stream')
var toArray = require('stream-to-array')
var tape = require('tape')
var timers = require('timers')
var webcoinCheckpointMaker = require('.')

tape('simple test', function (t) {
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  var wcm = webcoinCheckpointMaker({heights: [2016, 4032]})

  var sbs = SimpleBlockStream.fromFixture({inputPath: 'fixture.json'})

  wcm.on('end', function () {
    console.log('ended!')
  })

  var expected = [
    {
      height: 2016,
      header: {
        version: 1,
        prevHash: Buffer.from('6397bb6abd4fc521c0d3f6071b5650389f0b4551bc40b4e6b067306900000000', 'hex'),
        merkleRoot: Buffer.from('ace470aecda9c8818c8fe57688cd2a772b5a57954a00df0420a7dd546b6d2c57', 'hex'),
        timestamp: 1233063531,
        bits: 486604799,
        nonce: 790229043
      }
    },
    {
      height: 4032,
      header: {
        version: 1,
        prevHash: Buffer.from('df3fcdd2c7c319f51b2b9d90afab3030a81d8c6be65eb0d009ad37f000000000', 'hex'),
        merkleRoot: Buffer.from('2c0449a34a86f460cfa5ae13b505745935c70cdf458fce21d20e3f35f9c9a01d', 'hex'),
        timestamp: 1234466190,
        bits: 486604799,
        nonce: 3118115846
      }
    }
  ]

  toArray(pump(sbs.stream, wcm), function (err, arr) {
    t.ifError(err)
    t.same(arr, expected)
    t.end()
  })

  sbs.stream.on('data', function (block) {
    if (block.height === 4032) {
      sbs.close()
    }
  })
})
