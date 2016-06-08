# datatree

```javascript
// require datatree module
var DataTree = require('datatreee');

// static variables
DataTree.concat(thisData/*: Array<any>*/, thatData/*: Array<any>*/, keys/*: Array<string>*/)

// static methods
DataTree.fromJS(inputJS/*: {data: any, children:Object}*/)/*: DataTree*/
DataTree.fromList(list/*: {data: any, children:Object}*/)/*: DataTree*/

// create DataTree instance
dataTree.getDataIn(keys/*: Array<string>*/)
dataTree.setData(data)
dataTree.setDataIn(keys/*: Array<string>*/, data/*: any*/)
dataTree.deleteData()
dataTree.deleteDataIn(keys/*: Array<string>*/)
dataTree.hasData()/*: boolean*/
dataTree.hasDataIn(keys/*: Array<string>*/)/*: boolean*/
dataTree.getChildren()
dataTree.getChildrenIn(keys/*: Array<string>*/)
dataTree.hasChildren()/*: boolean*/
dataTree.hasChildrenIn(keys/*: Array<string>*/)/*: boolean*/
dataTree.merge(thatDataTree/*: DataTree*/, mergeFunc/*: function*/)
dataTree.mergeIn(keys/*: Array<string>*/, thatDataTree/*: DataTree*/, mergeFunc/*: function*/)
dataTree.hasChild(childName/*: string*/)/*: boolean*/
dataTree.hasChildIn(keys/*: Array<string>*/)/*: boolean*/
dataTree.getChild(childName/*: string*/)/*: ?DataTree*/
dataTree.getChildIn(keys/*: Array<string>*/)/*: ?DataTree*/
dataTree.setChild(childName/*: string*/, childDataTree/*: DataTree*/)
dataTree.setChildIn(keys/*: Array<string>*/, childDataTree/*: DataTree*/)
dataTree.createChild(childName/*: string*/)
dataTree.createChildIn(keys/*: Array<string>*/)
dataTree.deleteChild(childName/*: string*/)
dataTree.deleteChildIn(keys/*: Array<string>*/)
dataTree.toList()
dataTree.toJS()
```
