/**
 * Copyright (c) Kristian Lyngbaek 2016
 */

function DataTree(inputJS) {
    this._data = undefined; // _data is always defined
    this._children = {}; // _children is always defined

    // if optional argument is passed in, construct the data-tree from the JSON
    if (inputJS) {
        this._data = inputJS.data;
        for (var childName in inputJS.children) {
            var childJS = inputJS.children[childName];
            this.createChild(childName, childJS);
        }
    }

}

DataTree.concat = function getData(thisData, thatData, keys) {
    if (!thisData && !thatData) return undefined;
    else if (!thisData) return thatData.concat([]);
    else if (!thatData) return thisData.concat([]);
    else return thisData.concat(thatData);
};

DataTree.prototype.getData = function getData() {
    return this.getDataIn([]);
};

DataTree.prototype.getDataIn = function getDataIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length===0) {
        return this._data;
    } else {
        var key = keys[0];
        var child = this._children[key];
        if (child) {
            return child.getDataIn(keys.slice(1));
        } else {
            return undefined;
        }
    }
};

DataTree.prototype.setData = function setData(data) {
    return this.setDataIn([], data);
};

DataTree.prototype.setDataIn = function setDataIn(keys, data) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length===0) {
        this._data = data;
    } else {
        var key = keys[0];
        if (!this._children[key]) {
            this._children[key] = new DataTree();
        }
        var child = this._children[key];
        child.setDataIn(keys.slice(1), data);
    }
};

DataTree.prototype.deleteData = function deleteData() {
    return this.deleteDataIn([]);
};

DataTree.prototype.deleteDataIn = function deleteDataIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) delete this._data;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        this._children[nextKey].deleteDataIn(keys.slice(1));
    } else {
        return;
    }
};

DataTree.prototype.hasData = function hasData() {
    return this.hasDataIn([]);
};

DataTree.prototype.hasDataIn = function hasDataIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) return this._data!==undefined;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].hasDataIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.getChildren = function getChildren() {
    return this.getChildrenIn([]);
};

DataTree.prototype.getChildrenIn = function getChildrenIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length===0) {
        return this._children;
    } else {
        var key = keys[0];
        var child = this._children[key];
        if (child) {
            return child.getChildrenIn(keys.slice(1));
        } else {
            return undefined;
        }
    }
};

DataTree.prototype.hasChildren = function hasChildren() {
    return this.hasChildrenIn([]);
};

DataTree.prototype.hasChildrenIn = function hasChildrenIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) return Object.keys(this._children).length > 0;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].hasChildrenIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.merge = function merge(thatDataTree, mergeFunc) {
    this.mergeIn([], thatDataTree, mergeFunc);
};

DataTree.prototype.mergeIn = function mergeIn(keys, thatDataTree, mergeFunc) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if ( !(thatDataTree instanceof DataTree)) throw new Error('thatDataTree argument must be an instance of DataTree');
    if (!this.hasChildIn(keys)) {
        this.createChildIn(keys);
    }

    var thisDataTree = this.getChildIn(keys);
    merge(thisDataTree, thatDataTree, keys);

    function merge(self, that, keys) {
        var dataResult = mergeFunc(self.getData(), that.getData(), keys);
        self.setData(dataResult);

        var thatChildren = that.getChildren();
        for (var thatChildName in thatChildren) {
            var thatChild = thatChildren[thatChildName];

            if (!self.hasChild(thatChildName)) self.createChild(thatChildName);
            var selfChild = self.getChild(thatChildName);

            merge(selfChild, thatChild, keys.concat(thatChildName));
        }
    }
};

DataTree.prototype.hasChild = function hasChild(childName) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    return this.hasChildIn([childName]);
};

DataTree.prototype.hasChildIn = function hasChildIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    var nextKey = keys[0];
    if (keys.length === 1) return nextKey in this._children;
    if (nextKey in this._children) {
        return this._children[nextKey].hasChildIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.getChild = function getChild(childName) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    return this.getChildIn([childName]);
};

DataTree.prototype.getChildIn = function getChildIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) return this;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].getChildIn(keys.slice(1));
    } else {
        return;
    }
};

DataTree.prototype.setChild = function setChild(childName, childDataTree) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    if ( !(childDataTree instanceof DataTree)) throw new Error('childDataTree argument must be an instance of DataTree');
    this.setChildIn([childName], childDataTree);
};

DataTree.prototype.setChildIn = function setChildIn(keys, childDataTree) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if ( !(childDataTree instanceof DataTree)) throw new Error('childDataTree argument must be an instance of DataTree');

    var key = keys[0];
    if (keys.length===1) {
        this._children[key] = childDataTree;
    } else {
        if (!this.hasChild(key)) {
            this._children[key] = new DataTree();
        }
        var child = this.getChild(key);
        child.setChildIn(keys.slice(1, keys.length), childDataTree);
    }
};

DataTree.prototype.createChild = function createChild(childName, inputJS) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    this.createChildIn([childName], inputJS);
};

DataTree.prototype.createChildIn = function createChildIn(keys, inputJS) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    this.setChildIn(keys, new DataTree(inputJS));
};

DataTree.prototype.deleteChild = function deleteChild(childName) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    this.deleteChildIn([childName]);
};

DataTree.prototype.deleteChildIn = function deleteChildIn(keys) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 1) delete this._children[keys[0]];
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].deleteChildIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.list = function list() {
    var result = {};
    function go(node, pathSoFar) {
        var data = node.getData();
        if (data !== undefined) {
            result[pathSoFar] = data;
        }
        var children = node._children;
        for (var key in children) {
            var child = children[key];
            go(child, pathSoFar + ((pathSoFar==='/')?'':'/') + encodeURIComponent(key));
        }
    }
    go(this, '/');
    return result;
};

DataTree.prototype.toJS = function toJS() {
    function go(node) {
        var result = {
            children: {}
        };

        var data = node.getData();
        if (data !== undefined) {
            result.data = data;
        }

        for (var key in node._children) {
            var child = node._children[key];
            result.children[key] = go(child);
        }
        return result;
    }
    return go(this);
};

module.exports = DataTree;
