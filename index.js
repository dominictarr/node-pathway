var concatMap = require('concat-map');

module.exports = function pathway (obj, path) {
    return path.reduce(function (nodes, p, ip) {
        if (isRegExp(p)) {
            return concatMap(nodes, function (node, ix) {
                if (typeof node !== 'object') return [];
                
                return Object.keys(node)
                    .filter(function (key) { return p.test(key) })
                    .map(function (key) { return node[key] })
                ;
            });
        }
        else {
            return concatMap(nodes, function (node, ix) {
                if (ip === nodes.length - 1) return node[p];
                if (!node[p]) return [];
                if (typeof node[p] !== 'object') return [];
                return node[p];
            });
        }
    }, [ obj ]);
};

function isRegExp (x) {
    return Object.prototype.toString.call(x) === '[object RegExp]';
}
