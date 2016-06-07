# data-tree

function DataTree(inputJS)

DataTree.prototype.getData = function getData()
DataTree.prototype.getDataIn = function getDataIn(keys)
DataTree.prototype.setData = function setData(data)
DataTree.prototype.setDataIn = function setDataIn(keys, data)
DataTree.prototype.deleteData = function deleteData()
DataTree.prototype.deleteDataIn = function deleteDataIn(keys)
DataTree.prototype.hasData = function hasData()
DataTree.prototype.hasDataIn = function hasDataIn(keys)
DataTree.prototype.getChildren = function getChildren()
DataTree.prototype.getChildrenIn = function getChildrenIn(keys)
DataTree.prototype.hasChildren = function hasChildren()
DataTree.prototype.hasChildrenIn = function hasChildrenIn(keys)
DataTree.prototype.merge = function merge(thatDataTree, mergeFunc)
DataTree.prototype.mergeIn = function mergeIn(keys, thatDataTree, mergeFunc)
DataTree.prototype.hasChild = function hasChild(childName)
DataTree.prototype.hasChildIn = function hasChildIn(keys)
DataTree.prototype.getChild = function getChild(childName)
DataTree.prototype.getChildIn = function getChildIn(keys)
DataTree.prototype.setChild = function setChild(childName, childDataTree)
DataTree.prototype.setChildIn = function setChildIn(keys, childDataTree)
DataTree.prototype.createChild = function createChild(childName, inputJS)
DataTree.prototype.createChildIn = function createChildIn(keys, inputJS)
DataTree.prototype.deleteChild = function deleteChild(childName)
DataTree.prototype.deleteChildIn = function deleteChildIn(keys)
DataTree.prototype.list = function list()
DataTree.prototype.toJS = function toJS()
