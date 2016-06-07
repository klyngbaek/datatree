# datatree

```
# require datatree module
var DataTree = require('datatreee');

# static methods
DataTree.concat()

# create DataTree instance
var dataTree = function DataTree(inputJS)

# instance methods
dataTree.getData()
dataTree.getDataIn(keys)
dataTree.setData(data)
dataTree.setDataIn(keys, data)
dataTree.deleteData()
dataTree.deleteDataIn(keys)
dataTree.hasData()
dataTree.hasDataIn(keys)
dataTree.getChildren()
dataTree.getChildrenIn(keys)
dataTree.hasChildren()
dataTree.hasChildrenIn(keys)
dataTree.merge(thatDataTree, mergeFunc)
dataTree.mergeIn(keys, thatDataTree, mergeFunc)
dataTree.hasChild(childName)
dataTree.hasChildIn(keys)
dataTree.getChild(childName)
dataTree.getChildIn(keys)
dataTree.setChild(childName, childDataTree)
dataTree.setChildIn(keys, childDataTree)
dataTree.createChild(childName, inputJS)
dataTree.createChildIn(keys, inputJS)
dataTree.deleteChild(childName)
dataTree.deleteChildIn(keys)
dataTree.list()
dataTree.toJS()
```
