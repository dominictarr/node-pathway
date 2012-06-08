var concatMap = require('concat-map');

module.exports = function pathway (obj, path) {
    return path.reduce(function (nodes, p, ip) {
        if (isRegExp(p)) {
            return concatMap(nodes, function (node, ix) {
                var xs = Object.keys(node).filter(function (key) {
                    return p.test(key);
                });
                if (xs[0]) nodes[ix] = xs[0];
                else return [];
                
                xs.slice(1).forEach(function (x) {
                    
                });
                return true;
            });
        }
        else {
            return concatMap(nodes, function (node, ix) {
                if (pi === nodes.length - 1) return node[p];
                if (!node[p]) return [];
                if (typeof node[p] !== 'object') return [];
                return node[p];
            });
        }
    }, [ obj ]);
};

function isRegExp (x) {
    return Object.prototype.toString.call(x);
}
