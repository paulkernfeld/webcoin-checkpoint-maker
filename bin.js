#!/usr/bin/env node
var generate = require('escodegen').generate
var lave = require('lave')
var memdb = require('memdb')
var argv = require('minimist')(process.argv.slice(2))
var pump = require('pump')
var SimpleBlockStream = require('simple-block-stream')

var webcoinCheckpointMaker = require('.')

var sbs = SimpleBlockStream({db: memdb()})

var wcm = webcoinCheckpointMaker({
  heights: (JSON.parse(argv.heights)),
  cb: function () {
    sbs.close()
  }
})

pump(sbs.stream, wcm).on('data', function (block) {
  console.log(lave(block, {generate: generate}))
})
