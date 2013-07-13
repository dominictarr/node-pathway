var pathway = require('../');
var test = require('tap').test;

test('last element string', function (t) {
    var rows = [ { location: 'Oakland, CA' }, { location: 'Portland, OR' } ];
    var xs = pathway(rows, [ true, 'location', 'Oakland, CA' ]);
    t.deepEqual(xs, [ { location: 'Oakland, CA' } ]);
    t.end();
});

test('last element regexp', function (t) {
    var rows = [ { location: 'Oakland, CA' }, { location: 'Portland, OR' } ];
    var xs = pathway(rows, [ true, 'location', /\boakland\b/i ]);
    t.deepEqual(xs, [ { location: 'Oakland, CA' } ]);
    t.end();
});
