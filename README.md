# datatree
An easy way to store/retrieve/manipulate data associated with a path.

```javascript

/* flow-include type DataTreeList = {[key: string]: any} */
/* flow-include type DataTreeJS = {data?: any, children: {[key: string]: DataTreeJS}} */

// require datatree module
var DataTree = require('datatree');

// static variables
DataTree.concat(thisData/*: Array?<any>*/, thatData/*: Array?<any>*/, keys/*: Array<string>*/)/*: Array<any>*/

// static methods
DataTree.fromJS(inputJS/*: JS*/)/*: DataTree*/
DataTree.fromList(list/*: List*/)/*: DataTree*/

// create DataTree instance
var dataTree = new DataTree();

// prototype methods
dataTree.getDataIn(keys/*: Array<string>*/)
dataTree.setData(data)/*: void*/
dataTree.setDataIn(keys/*: Array<string>*/, data/*: any*/)/*: void*/
dataTree.deleteData()/*: void*/
dataTree.deleteDataIn(keys/*: Array<string>*/)/*: void*/
dataTree.hasData()/*: boolean*/
dataTree.hasDataIn(keys/*: Array<string>*/)/*: boolean*/
dataTree.getChildren()/*: void*/
dataTree.getChildrenIn(keys/*: Array<string>*/)/*: void*/
dataTree.hasChildren()/*: boolean*/
dataTree.hasChildrenIn(keys/*: Array<string>*/)/*: boolean*/
dataTree.merge(thatDataTree/*: DataTree*/, mergeFunc/*: function*/)/*: void*/
dataTree.mergeIn(keys/*: Array<string>*/, thatDataTree/*: DataTree*/, mergeFunc/*: function*/)/*: void*/
dataTree.hasChild(childName/*: string*/)/*: boolean*/
dataTree.hasChildIn(keys/*: Array<string>*/)/*: boolean*/
dataTree.getChild(childName/*: string*/)/*: ?DataTree*/
dataTree.getChildIn(keys/*: Array<string>*/)/*: ?DataTree*/
dataTree.setChild(childName/*: string*/, childDataTree/*: DataTree*/)/*: void*/
dataTree.setChildIn(keys/*: Array<string>*/, childDataTree/*: DataTree*/)/*: void*/
dataTree.createChild(childName/*: string*/)/*: void*/
dataTree.createChildIn(keys/*: Array<string>*/)/*: void*/
dataTree.deleteChild(childName/*: string*/)/*: void*/
dataTree.deleteChildIn(keys/*: Array<string>*/)/*: void*/
dataTree.toList()/*: List*/
dataTree.toJS()/*: JS>*/
```
