pathway
=======

Trace key-paths through nested objects.

[![build status](https://secure.travis-ci.org/substack/node-pathway.png)](http://travis-ci.org/substack/node-pathway)

example
=======

``` js
var pathway = require('pathway');
var xs = [
    { x : { y : { z : 555 } } },
    { beep : 'boop' },
    { x : { y : { z : 444 } }, w : 4 },
    { x : { y : 'zzz' } },
    { x : { y : { z : 333 } } },
    { X : { y : { z : 222 } } }
];
var ys = pathway(xs, [ /./, /x/i, 'y', 'z' ]);
console.dir(ys);
```

***

```
[ 555, 444, 333, 222 ]
```

methods
=======

``` js
var pathway = require('pathway')
```

pathway(obj, path)
------------------

Return an array of all the matching paths through the nested object `obj` that
match the key path route `path`.

Key path routes may contain string or regexp elements. Keys along the element
path go deeper into `obj`. If there are multiple matching results from a
regexp key element, both will be traced forward to the result unless a
subsequent value doesn't match.

This behavior is heavily inspired by how
[JSONStream](https://github.com/dominictarr/JSONStream)'s `.parse()` function
works.

install
=======

With [npm](http://npmjs.org) do:

```
npm install pathway
```

notes
=====

This module was written high up in a tree at Mosswood Park.
