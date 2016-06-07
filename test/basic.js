/**
 * Copyright (c) Kristian Lyngbaek 2016
 */

// npm modules
var test = require('tape');

// data-tree modules
var DataTree = require('../index.js');

test('Basic Tests', function (t) {
    t.plan(21);

    // setData getData
    var dataTree1 = new DataTree();
    dataTree1.setData([
        'Data 1',
        'Data 2',
        'Data 3'
    ]);
    var test1 = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {}
    };
    var data1 = ["Data 1", "Data 2", "Data 3"];
    t.deepEquals(dataTree1.toJS(), test1, 'Test setData');
    t.deepEquals(dataTree1.getData(), data1, 'Test getData');
    t.deepEquals(dataTree1.hasData(), true, 'Test hasData');

    var test4 = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {
            "bar": {
                "data": ["four"],
                "children": {}
            }
        }
    };
    var test5 = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {
            "bar": {
                "data": ["four"],
                "children": {
                    "ninja": {
                        "data": ["five"],
                        "children": {}
                    }
                },
            }
        }
    };
    var test6 = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {
            "bar": {
                "data": ["four"],
                "children": {
                    "ninja": {
                        "data": ["five"],
                        "children": {}
                    }
                },
            },
            "ninja2": {
                "children": {}
            }
        }
    };
    var test7 = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {
            "bar": {
                "data": ["four"],
                "children": {
                    "ninja": {
                        "data": ["five"],
                        "children": {}
                    },
                    "ninja3": {
                        "children": {}
                    }
                },
            },
            "ninja2": {
                "children": {}
            }
        }
    };
    var test8 = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {
            "ninja2": {
                "children": {}
            }
        }
    };
    var dataTree4 = new DataTree();
    dataTree4.setData(['four']);
    dataTree1.setChild('bar', dataTree4);
    t.deepEquals(dataTree1.toJS(), test4, 'Test setChild');

    var dataTree5 = new DataTree();
    dataTree5.setData(['five']);
    dataTree1.setChildIn(['bar', 'ninja'], dataTree5);
    t.deepEquals(dataTree1.toJS(), test5, 'Test setChildIn');

    dataTree1.createChild('ninja2');
    t.deepEquals(dataTree1.toJS(), test6, 'Test createChild');

    dataTree1.createChildIn(['bar', 'ninja3'], dataTree5);
    t.deepEquals(dataTree1.toJS(), test7, 'Test createChildIn');

    dataTree1.deleteChildIn(['bar', 'ninja3']);
    t.deepEquals(dataTree1.toJS(), test6, 'Test deleteChild');

    dataTree1.deleteChildIn(['bar']);
    t.deepEquals(dataTree1.toJS(), test8, 'Test deleteChildIn');

    // var dataTree5 = new DataTree();
    // dataTree4.setData(['bar']);
    // dataTree1.setChld

    // create a data tree to work with
    // setDataIn getDataIn
    var dataTree = new DataTree();
    dataTree.setDataIn(['fee', 'fie', 'foe'], [
        'Data 1',
        'Data 2',
        'Data 3'
    ]);
    var test = {
        "children": {
            "fee": {
                "children": {
                    "fie": {
                        "children": {
                            "foe": {
                                "data": ["Data 1", "Data 2", "Data 3"],
                                "children": {}

                            }
                        }
                    }
                }
            }
        }
    };
    var child = {
        "children": {
            "fie": {
                "children": {
                    "foe": {
                        "data": ["Data 1", "Data 2", "Data 3"],
                        "children": {}

                    }
                }
            }
        }
    };
    var childIn = {
        "data": ["Data 1", "Data 2", "Data 3"],
        "children": {}
    };
    var data = ["Data 1", "Data 2", "Data 3"];
    t.deepEquals(dataTree.toJS(), test, 'Test setDataIn');
    t.deepEquals(dataTree.getDataIn(['fee', 'fie', 'foe']), data, 'Test getDataIn');
    t.deepEquals(dataTree.hasDataIn(['fee', 'fie', 'foe']), true, 'Test hasDataIn');
    t.deepEquals(dataTree.hasChild('fee'), true, 'Test hasChild');
    t.deepEquals(dataTree.getChild('fee').toJS(), child, 'Test getChild');
    t.deepEquals(dataTree.hasChildIn(['fee', 'fie', 'foe']), true, 'Test hasChildIn');
    t.deepEquals(dataTree.getChildIn(['fee', 'fie', 'foe']).toJS(), childIn, 'Test getChildIn');

    var blankTree = new DataTree(test);
    t.deepEquals(blankTree.toJS(), test, 'Test toJS');

    // create a second data tree
    var dataTree3 = new DataTree();
    dataTree3.setDataIn([], [
        'Data A',
        'Data B'
    ]);
    dataTree3.setDataIn(['one', 'two'], [
        'Data C',
        'Data D'
    ]);
    var test2 = {
        "data": ["Data A", "Data B"],
        "children": {
            "one": {
                "children": {
                    "two": {
                        "data": ["Data C", "Data D"],
                        "children": {}

                    }
                }
            }
        }
    };
    t.deepEquals(test2, dataTree3.toJS(), 'Test setDataIn');


    // merge the second data tree into the first
    dataTree.mergeIn(['fee', 'other-path'], dataTree3, DataTree.concat);
    var test3 = {
        "children": {
            "fee": {
                "children": {
                    "fie": {
                        "children": {
                            "foe": {
                                "data": [
                                    "Data 1",
                                    "Data 2",
                                    "Data 3"
                                ],
                                "children": {}
                            }
                        }
                    },
                    "other-path": {
                        "data": [
                            "Data A",
                            "Data B"
                        ],
                        "children": {
                            "one": {
                                "children": {
                                    "two": {
                                        "data": [
                                            "Data C",
                                            "Data D"
                                        ],
                                        children: {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    t.deepEquals(dataTree.toJS(), test3, 'Test mergeIn');


    // test the list functionality
    var test9 = {
        '/fee/fie/foe': [ 'Data 1', 'Data 2', 'Data 3' ],
        '/fee/other-path': [ 'Data A', 'Data B' ],
        '/fee/other-path/one/two': [ 'Data C', 'Data D' ]
    };
    t.deepEquals(dataTree.list(), test9, 'Test list');


    // read from a path within the first data tree
    var test10 = {
        "data": [
            "Data A",
            "Data B"
        ],
        "children": {
            "one": {
                "children": {
                    "two": {
                        "data": [
                            "Data C",
                            "Data D"
                        ],
                        children: {}
                    }
                }
            }
        }
    };
    t.deepEquals(dataTree.getChildIn(['fee', 'other-path']).toJS(), test10, 'Test getChildIn');

});
