var pathway = require('../');
var test = require('tap').test;

test('use a function to determine keys', function (t) {
    var xs = [
        [ 'a', 1, 'b' ],
        [ 'c', 2 ],
        [ 'd', 3, 'e', 4, 'f' ],
        [],
        [ 'g', 5, 'h' ],
    ];
    function True () { return true }
    function even (n) { return n % 2 === 0 }
    function odd (n) { return n % 2 === 1 }
    
    var odds = pathway(xs, [ True, odd ]);
    t.same(odds, [ 1, 2, 3, 4, 5 ]);
    
    var evens = pathway(xs, [ True, even ]);
    t.same(evens, [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]);
    
    t.end();
});
