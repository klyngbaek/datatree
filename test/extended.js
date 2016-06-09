"use strict";
// @flow

/**
 * Copyright (c) Kristian Lyngbaek 2016
 */

var test = require('tape');

// data-tree modules
var DataTree = require('../index.js');

test('Extended tests', function (t) {
    t.plan(12);

    // test setting/getting/deleting a whole bunch of paths into a complex obj
    var dcpTree = new DataTree();
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg'], {
        "id" : "hhh",
        "path" : "/aaa.bbb/ccc.ddd/eee/fff.ggg"
    });
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg', 'iii'], 'jjj');
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg', 'nnn'], true);
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg', 'kkk'], 'ooo');
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.mmm'], {
        "id" : "hhh",
        "path" : "/aaa.bbb/ccc.ddd/eee/lll.mmm"
    });
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.mmm', 'iii'], 'mmm');
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.mmm', 'nnn'], false);
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.mmm', 'kkk'], 'ooo');

    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'ppp'], {
        "id" : "000",
        "path" : "/aaa.bbb/ccc.ddd/eee/ppp"
    });
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'ppp', 'iii'], 'qqq');
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'ppp', 'uuu'], {
        "fee" : "sss",
        "fie" : {
            "foe" : "",
            "fum" : ""
        }
    });
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'rrr'], {
        "id" : "000",
        "path" : "/aaa.bbb/ccc.ddd/eee/rrr"
    });
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'rrr', 'iii'], 'qqq');
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'rrr', 'uuu'], {
        "fee" : "sss",
        "fie" : {
            "foe" : "",
            "fum" : ""
        }
    });
    var dcpTreeTest = {
        "children": {
            "aaa.bbb": {
                "children": {
                    "ccc.ddd": {
                        "children": {
                            "eee": {
                                "children": {
                                    "fff.ggg": {
                                        "data": {
                                            "id" : "hhh",
                                            "path" : "/aaa.bbb/ccc.ddd/eee/fff.ggg"
                                        },
                                        "children": {
                                            "iii": {
                                                "data": "jjj",
                                                "children": {}
                                            },
                                            "nnn": {
                                                "data": true,
                                                "children": {}
                                            },
                                            "kkk": {
                                                "data": "ooo",
                                                "children": {}
                                            }
                                        }
                                    },
                                    "lll.mmm": {
                                        "data": {
                                            "id" : "hhh",
                                            "path" : "/aaa.bbb/ccc.ddd/eee/lll.mmm"
                                        },
                                        "children": {
                                            "iii": {
                                                "data": "mmm",
                                                "children": {}
                                            },
                                            "nnn": {
                                                "data": false,
                                                "children": {}
                                            },
                                            "kkk": {
                                                "data": "ooo",
                                                "children": {}
                                            }
                                        }
                                    },
                                    "ppp": {
                                        "data": {
                                            "id" : "000",
                                            "path" : "/aaa.bbb/ccc.ddd/eee/ppp"
                                        },
                                        "children": {
                                            "iii": {
                                                "data": "qqq",
                                                "children": {}
                                            },
                                            "uuu": {
                                                "data": {
                                                    "fee" : "sss",
                                                    "fie" : {
                                                        "foe" : "",
                                                        "fum" : ""
                                                    }
                                                },
                                                "children": {}
                                            }
                                        }
                                    },
                                    "rrr": {
                                        "data": {
                                            "id" : "000",
                                            "path" : "/aaa.bbb/ccc.ddd/eee/rrr"
                                        },
                                        "children": {
                                            "iii": {
                                                "data": "qqq",
                                                "children": {}
                                            },
                                            "uuu": {
                                                "data": {
                                                    "fee" : "sss",
                                                    "fie" : {
                                                        "foe" : "",
                                                        "fum" : ""
                                                    }
                                                },
                                                "children": {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    t.deepEquals(dcpTreeTest, dcpTree.toJS(), 'Test 6');
    t.equal(dcpTree.hasDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg', 'kkk']), true, 'Test 7');
    t.equal(dcpTree.hasDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.ttt', 'kkk']), false, 'Test 8');
    t.equal(dcpTree.hasChildrenIn(['aaa.bbb', 'ccc.ddd', 'eee']), true, 'Test 9');
    t.equal(dcpTree.hasChildrenIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg']), true, 'Test 10');
    t.equal(dcpTree.hasChildrenIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.ttt']), false, 'Test 11');

    dcpTree.deleteChildIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg']);
    t.equal(dcpTree.hasDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'fff.ggg', 'kkk']), false, 'Test 12');

    dcpTree.deleteChildIn(['aaa.bbb', 'ccc.ddd', 'eee', 'ppp']);
    t.equal(dcpTree.hasDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'ppp', 'uuu']), false, 'Test 13');

    var childrenTest = {
        children: {
            "lll.mmm": {
                "data": {
                    "id" : "hhh",
                    "path" : "/aaa.bbb/ccc.ddd/eee/lll.mmm"
                },
                "children": {
                    "iii": {
                        "data": "mmm",
                        "children": {}
                    },
                    "nnn": {
                        "data": false,
                        "children": {}
                    },
                    "kkk": {
                        "data": "ooo",
                        "children": {}
                    }
                }
            },

            "rrr": {
                "data": {
                    "id" : "000",
                    "path" : "/aaa.bbb/ccc.ddd/eee/rrr"
                },
                "children": {
                    "iii": {
                        "data": "qqq",
                        "children": {}
                    },
                    "uuu": {
                        "data": {
                            "fee" : "sss",
                            "fie" : {
                                "foe" : "",
                                "fum" : ""
                            }
                        },
                        "children": {}
                    }
                }
            }
        }
    };
    t.deepEquals(dcpTree.getChildIn(['aaa.bbb', 'ccc.ddd', 'eee']).toJS(), childrenTest, 'Test 14');

    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'lll.mmm', 'nnn'], true);
    dcpTree.setDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'rrr', 'uuu'], {
        "fee" : "foo",
        "fie" : {
            "foe" : "",
            "fum" : "fum"
        }
    });
    dcpTreeTest = {
        "children": {
            "aaa.bbb": {
                "children": {
                    "ccc.ddd": {
                        "children": {
                            "eee": {
                                "children": {
                                    "lll.mmm": {
                                        "data": {
                                            "id" : "hhh",
                                            "path" : "/aaa.bbb/ccc.ddd/eee/lll.mmm"
                                        },
                                        "children": {
                                            "iii": {
                                                "data": "mmm",
                                                "children": {}
                                            },
                                            "nnn": {
                                                "data": true,
                                                "children": {}
                                            },
                                            "kkk": {
                                                "data": "ooo",
                                                "children": {}
                                            }
                                        }
                                    },
                                    "rrr": {
                                        "data": {
                                            "id" : "000",
                                            "path" : "/aaa.bbb/ccc.ddd/eee/rrr"
                                        },
                                        "children": {
                                            "iii": {
                                                "data": "qqq",
                                                "children": {}
                                            },
                                            "uuu": {
                                                "data": {
                                                    "fee" : "foo",
                                                    "fie" : {
                                                        "foe" : "",
                                                        "fum" : "fum"
                                                    }
                                                },
                                                "children": {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    t.deepEquals(dcpTreeTest, dcpTree.toJS(), 'Test 15');


    // make sure data can be an object type
    var objTest = {
        "fee" : "foo",
        "fie" : {
            "foe" : "",
            "fum" : "fum"
        }
    };
    t.deepEquals(objTest, dcpTree.getDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'rrr', 'uuu']), 'Test 16');
    t.equal(dcpTree.getDataIn(['aaa.bbb', 'ccc.ddd', 'eee', 'rrr', 'iii']), "qqq", 'Test 17');
});
