"use strict";
// @flow

/**
 * Copyright (c) Kristian Lyngbaek 2016
 */

function DataTree() {
    this._data = undefined; // _data is always defined
    this._children = {}; // _children is always defined
}

DataTree.fromJS = function fromJS(inputJS/*: {data: any, children:Object}*/)/*: DataTree*/ {
    var result = new DataTree();
    result.setData(inputJS.data);
    for (var childName in inputJS.children) {
        var childJS = inputJS.children[childName];
        var child = DataTree.fromJS(childJS);
        result.setChild(childName, child);
    }
    return result;
};

DataTree.fromList = function fromList(list/*: {data: any, children:Object}*/)/*: DataTree*/ {
    var result = new DataTree();

    for (var path in list) {
        var data = list[path];
        var keys = path.split('/').slice(1).map(decode);
        result.setDataIn(keys, data);
    }
    return result;

    function decode(key/*: string*/) {
        return decodeURIComponent(key);
    }
};

DataTree.concat = function concat(thisData/*: ?Array<any>*/, thatData/*: ?Array<any>*/, keys/*: Array<string>*/)/*: ?Array<any>*/ {
    if (thatData && thisData) thisData.concat(thatData);
    else if (!thisData && thatData) return thatData.concat([]);
    else if (!thatData && thisData) return thisData.concat([]);
    else return undefined;
};

DataTree.prototype.getData = function getData() {
    return this.getDataIn([]);
};

DataTree.prototype.getDataIn = function getDataIn(keys/*: Array<string>*/) {
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

DataTree.prototype.setDataIn = function setDataIn(keys/*: Array<string>*/, data/*: any*/) {
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

DataTree.prototype.deleteDataIn = function deleteDataIn(keys/*: Array<string>*/) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) delete this._data;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        this._children[nextKey].deleteDataIn(keys.slice(1));
    } else {
        return;
    }
};

DataTree.prototype.hasData = function hasData()/*: boolean*/ {
    return this.hasDataIn([]);
};

DataTree.prototype.hasDataIn = function hasDataIn(keys/*: Array<string>*/)/*: boolean*/ {
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

DataTree.prototype.getChildrenIn = function getChildrenIn(keys/*: Array<string>*/) {
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

DataTree.prototype.hasChildren = function hasChildren()/*: boolean*/ {
    return this.hasChildrenIn([]);
};

DataTree.prototype.hasChildrenIn = function hasChildrenIn(keys/*: Array<string>*/)/*: boolean*/ {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) return Object.keys(this._children).length > 0;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].hasChildrenIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.merge = function merge(thatDataTree/*: DataTree*/, mergeFunc/*: function*/) {
    this.mergeIn([], thatDataTree, mergeFunc);
};

DataTree.prototype.mergeIn = function mergeIn(keys/*: Array<string>*/, thatDataTree/*: DataTree*/, mergeFunc/*: function*/) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if ( !(thatDataTree instanceof DataTree)) throw new Error('thatDataTree argument must be an instance of DataTree');
    if (!this.hasChildIn(keys)) {
        this.createChildIn(keys);
    }

    var thisDataTree = this.getChildIn(keys);
    merge(thisDataTree, thatDataTree, keys);

    function merge(self, that, keys/*: Array<string>*/) {
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

DataTree.prototype.hasChild = function hasChild(childName/*: string*/)/*: boolean*/ {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    return this.hasChildIn([childName]);
};

DataTree.prototype.hasChildIn = function hasChildIn(keys/*: Array<string>*/)/*: boolean*/ {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    var nextKey = keys[0];
    if (keys.length === 1) return nextKey in this._children;
    if (nextKey in this._children) {
        return this._children[nextKey].hasChildIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.getChild = function getChild(childName/*: string*/)/*: ?DataTree*/ {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    return this.getChildIn([childName]);
};

DataTree.prototype.getChildIn = function getChildIn(keys/*: Array<string>*/)/*: ?DataTree*/ {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length === 0) return this;
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].getChildIn(keys.slice(1));
    } else {
        return undefined;
    }
};

DataTree.prototype.setChild = function setChild(childName/*: string*/, childDataTree/*: DataTree*/) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    if ( !(childDataTree instanceof DataTree)) throw new Error('childDataTree argument must be an instance of DataTree');
    this.setChildIn([childName], childDataTree);
};

DataTree.prototype.setChildIn = function setChildIn(keys/*: Array<string>*/, childDataTree/*: DataTree*/) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length<1) throw new Error('keys array must length of at least 1');
    if ( !(childDataTree instanceof DataTree)) throw new Error('childDataTree argument must be an instance of DataTree');

    var key = keys[0];
    if (keys.length===1) {
        this._children[key] = childDataTree;
    } else {
        if (!this.hasChild(key)) {
            this._children[key] = new DataTree();
        }
        var child = this.getChild(key);
        if (child) {
            child.setChildIn(keys.slice(1, keys.length), childDataTree);
        } else {
            throw new Error('Something went really wrong');
        }
    }
};

DataTree.prototype.createChild = function createChild(childName/*: string*/) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    this.createChildIn([childName]);
};

DataTree.prototype.createChildIn = function createChildIn(keys/*: Array<string>*/) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length<1) throw new Error('keys array must length of at least 1');
    this.setChildIn(keys, new DataTree());
};

DataTree.prototype.deleteChild = function deleteChild(childName/*: string*/) {
    if ( typeof childName !== 'string' ) throw new Error('childName argument must be a string');
    this.deleteChildIn([childName]);
};

DataTree.prototype.deleteChildIn = function deleteChildIn(keys/*: Array<string>*/) {
    if (!Array.isArray(keys)) throw new Error('keys argument must be an array');
    if (keys.length<1) throw new Error('keys array must length of at least 1');
    if (keys.length === 1) delete this._children[keys[0]];
    var nextKey = keys[0];
    if (nextKey in this._children) {
        return this._children[nextKey].deleteChildIn(keys.slice(1));
    } else {
        return false;
    }
};

DataTree.prototype.toList = function toList()/*: Object*/ {
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

DataTree.prototype.toJS = function toJS()/*: Object*/ {
    function go(node) {
        var result/*: {data?:any, children: Object}*/ = {
            // data: undefined,
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
