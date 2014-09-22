
var test = require('tap').test
var pkg = require('../package.json')

var pathway = require('../')

test('path to a key', function (t) {

  var x =
    pathway(pkg, ['author', {key: true}])

  t.deepEqual(x, ['name', 'email', 'url'])

  var x =
    pathway(pkg, [true, {key: /[^\d]/}])

  t.deepEqual(x, [ 'type', 'url', 'test', 'tap', 'name', 'email', 'url' ])

  console.log(x)
  t.end()
})
