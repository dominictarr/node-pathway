var concatMap = require('concat-map');

module.exports = function pathway (obj, path) {
    return path.reduce(function (nodes, p, ip) {
        if (typeof p === 'function') {
            return withFilter(nodes, p)
        }
        else if (typeof p === 'boolean') {
            return withFilter(nodes, function () { return p });
        }
        else if (isRegExp(p)) {
            return withFilter(nodes, function (key) { return p.test(key) })
        }
        else if (Array.isArray(p)) {
            return withFilter(nodes, function (key) {
                for (var i = 0; i < p.length; i++) {
                    if (isRegExp(p[i]) && p[i].test(key)) {
                        return true;
                    }
                    else if (p[i] === key) return true
                }
                return false;
            });
        }
        else {
            return concatMap(nodes, function (node, ix) {
                if (!node[p]) return [];
                return [ node[p] ];
            })
        }
    }, [ obj ]);
};

function withFilter (nodes, fn) {
    return concatMap(nodes, function (node) {
        if (typeof node !== 'object') return [];
        
        return Object.keys(node)
            .filter(function (key, ix) { return fn(key, node[key]) })
            .map(function (key) { return node[key] })
        ;
    });
}

function isRegExp (x) {
    return Object.prototype.toString.call(x) === '[object RegExp]';
}
