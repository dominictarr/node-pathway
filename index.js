module.exports = function pathway (root, keys) {
    var length = keys.length;
    var matches = [];
    
    (function walk (node, index, key) {
        var last = index === length - 1;
        if (key === undefined) key = keys[index];
        var ktype = typeof key;
        var ntype = typeof node;
        
        function check (k, v) {
            if (ktype === 'boolean') {
                if (key) next();
            }
            else if (ktype === 'function') {
                if (key(k, v)) next();
            }
            else if (isRegExp(key)) {
                if (key.test(k)) next();
            }
            else {
                if (key === k) next();
            }
            
            function next () {
                if (last) matches.push(v)
                else walk(v, index + 1);
            }
        }
        
        if (Array.isArray(key)) {
            for (var i = 0, l = key.length; i < l; i++) {
                walk(node, index, key[i]);
            }
        }
        else if (ntype === 'object'
        && (ktype === 'string' || ktype === 'number')) {
            if (!(key in node)) {}
            else if (last) matches.push(node[key])
            else walk(node[key], index + 1)
        }
        else if (Array.isArray(node)) {
            for (var i = 0, l = node.length; i < l; i++) {
                var v = node[i];
                check(i, v);
            }
        }
        else if (node && ntype === 'object') {
            var keys_ = Object.keys(node);
            for (var i = 0, l = keys_.length; i < l; i++) {
                var k = keys_[i];
                var v = node[k];
                check(k, v);
            }
        }
        else if (last) {
            if (ktype === 'boolean') {
                if (key) matches.push(node);
            }
            else if (ktype === 'function') {
                if (key(node)) matches.push(node);
            }
            else if (isRegExp(key)) {
                if (key.test(node)) matches.push(node);
            }
            else if (key === node) {
                matches.push(node);
            }
        }
    })(root, 0);
    
    return matches;
}

function isRegExp (x) {
    return Object.prototype.toString.call(x) === '[object RegExp]';
}
