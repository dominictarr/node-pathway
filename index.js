var concatMap = require('concat-map');

module.exports = function pathway (obj, path) {
    return path.reduce(function (nodes, p, ip) {
        if (typeof p === 'function') {
            return withFilter(nodes, p)
        }
        else if (isRegExp(p)) {
            return withFilter(nodes, function (key) { return p.test(key) })
        }
        else {
            return concatMap(nodes, function (node, ix) {
                if (ip === nodes.length - 1) return node[p];
                if (!node[p]) return [];
                if (typeof node[p] !== 'object') return [];
                return node[p];
            })
        }
    }, [ obj ]);
};

function withFilter (nodes, fn) {
    return concatMap(nodes, function (node) {
        if (typeof node !== 'object') return [];
        
        return Object.keys(node)
            .filter(fn)
            .map(function (key) { return node[key] })
        ;
    });
}

function isRegExp (x) {
    return Object.prototype.toString.call(x) === '[object RegExp]';
}
