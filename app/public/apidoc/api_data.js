define({ "api": [
  {
    "type": "post",
    "url": "/alarm/getAlarmByEqpLabel",
    "title": "getAlarmByEqpLabel",
    "description": "<p>根据设备名称查询告警</p>",
    "name": "getAlarmByEqpLabel",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "ne=梅州五华华阳大拔基站-OLT001-HW-MA5680T&group=NE_NOT_LOGIN&event_time=1531209836000&clear=true&timewin=300",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ne",
            "description": "<p>设备名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>告警组别</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeStamp",
            "optional": false,
            "field": "event_time",
            "description": "<p>告警发生时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "clear",
            "description": "<p>【非必要字段】是否需要查询清除字段</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "before",
            "description": "<p>【非必要字段】是否查询告警发生后的相关告警</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "timewin",
            "description": "<p>时间窗（单位：秒）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Alarm",
            "description": "<p>告警列表</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/getAlarmByEqpLabel"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/getAlarmByNeLabel",
    "title": "getAlarmByNeLabel",
    "description": "<p>根据网元查询告警</p>",
    "name": "getAlarmByNeLabel",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "ne=惠州惠城冰塘-OLT001-HW-MA5608T&group=NE_NOT_LOGIN&event_time=1531270492000&clear=true&timewin=300",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ne",
            "description": "<p>网元名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>告警组别</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeStamp",
            "optional": false,
            "field": "event_time",
            "description": "<p>告警发生时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "clear",
            "description": "<p>【非必要字段】是否需要查询清除字段</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "before",
            "description": "<p>【非必要字段】是否查询告警发生后的相关告警</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "timewin",
            "description": "<p>时间窗（单位：秒）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Alarm",
            "description": "<p>告警列表</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/getAlarmByNeLabel"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/getAlarmByRoom",
    "title": "getAlarmByRoom",
    "description": "<p>根据机房查询告警</p>",
    "name": "getAlarmByRoom",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "room=惠州惠城区冰塘七楼机房无线1&group=NE_NOT_LOGIN&event_time=1531270492000&clear=true&timewin=300",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "room",
            "description": "<p>机房名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>告警组别</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeStamp",
            "optional": false,
            "field": "event_time",
            "description": "<p>告警发生时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "clear",
            "description": "<p>【非必要字段】是否需要查询清除字段</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "before",
            "description": "<p>【非必要字段】是否查询告警发生后的相关告警</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "timewin",
            "description": "<p>时间窗（单位：秒）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Alarm",
            "description": "<p>告警列表</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/getAlarmByRoom"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/getAlarmBySite",
    "title": "getAlarmBySite",
    "description": "<p>根据地址查询告警</p>",
    "name": "getAlarmBySite",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "site=江门台山天桥&group=olt_electronic&event_time=1531270492000&clear=true&timewin=300",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "site",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>告警组别</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeStamp",
            "optional": false,
            "field": "event_time",
            "description": "<p>告警发生时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "clear",
            "description": "<p>【非必要字段】是否需要查询清除字段</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "before",
            "description": "<p>【非必要字段】是否查询告警发生后的相关告警</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "timewin",
            "description": "<p>时间窗（单位：秒）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Alarm",
            "description": "<p>告警列表</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/getAlarmBySite"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/getAlarmRelateByChildFp",
    "title": "getAlarmRelateByChildFp",
    "description": "<p>根据childFp查询Alarm_Relate，rule优先级最高的一条</p>",
    "name": "getAlarmRelateByChildFp",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "childFp=1659477446|1981125397|3181921358|2239725127",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "childFp",
            "description": "<p>子告警fp</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Alarm_Relate",
            "description": "<p>子告警</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/getAlarmRelateByChildFp"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/getChildAlarmByRootFp",
    "title": "getChildAlarmByRootFp",
    "description": "<p>根据rootfp查询子告警</p>",
    "name": "getChildAlarmByRootFp",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "rootFp=3461386958|679362499|2724666624|3483108274",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rootFp",
            "description": "<p>根告警fp</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "childAlarm",
            "description": "<p>子告警</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/getChildAlarmByRootFp"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/relateAlarm",
    "title": "relateAlarm",
    "description": "<p>根据rootFp、childFp、rule生成新的Alarm_Relate</p>",
    "name": "relateAlarm",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "childFp=1659477446|1981125397|3181921358|2239725127&rootFp=3461386958|679362499|2724666624|3483108274&rule=61",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "childFp",
            "description": "<p>子告警fp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rootFp",
            "description": "<p>根告警fp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rule",
            "description": "<p>关联规则编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Null",
            "optional": false,
            "field": "null",
            "description": "<p>插入成功无返回</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/relateAlarm"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "post",
    "url": "/alarm/relateNewAlarm",
    "title": "relateNewAlarm",
    "description": "<p>根据childFp、rule生成新的Alarm_Relate</p>",
    "name": "relateNewAlarm",
    "group": "alarm",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "childFp=1659477446|1981125397|3181921358|2239725127&rule=66",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "childFp",
            "description": "<p>子告警fp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rule",
            "description": "<p>关联规则编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Null",
            "optional": false,
            "field": "null",
            "description": "<p>插入成功无返回</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/alarm/relateNewAlarm"
      }
    ],
    "version": "0.0.0",
    "filename": "router/alarm.js",
    "groupTitle": "alarm"
  },
  {
    "type": "get",
    "url": "/getComplainByCitysGet",
    "title": "getComplainByCitysGet",
    "description": "<p>通过城市名查投诉</p>",
    "name": "getComplainByCitysGet",
    "group": "complain",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?cityList=123&factBeginTime=123",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "cityList",
            "description": "<p>城市名</p>"
          },
          {
            "group": "Parameter",
            "type": "Timestamp",
            "optional": false,
            "field": "factBeginTime",
            "description": "<p>投诉开始时间</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Arrary",
            "optional": false,
            "field": "complain",
            "description": "<p>投诉信息</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/getComplainByCitysGet?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/robotComplain.js",
    "groupTitle": "complain"
  },
  {
    "type": "get",
    "url": "/complain/getRelateEvent",
    "title": "getRelateEvent",
    "description": "<p>设置OMC翻译结果的相关事件ID</p>",
    "name": "getRelateEvent",
    "group": "complain",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?eventId=123",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "eventId",
            "description": "<p>关联的事件ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "code",
            "description": "<p>&amp;msg 是否成功</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/complain/getRelateEvent?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/robotComplain.js",
    "groupTitle": "complain"
  },
  {
    "type": "get",
    "url": "/complain/setRelateEvent",
    "title": "setRelateEvent",
    "description": "<p>设置投诉公告的相关事件ID</p>",
    "name": "setRelateEvent",
    "group": "complain",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?eventId=123&issueId=123",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "eventId",
            "description": "<p>关联的事件ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "issueId",
            "description": "<p>投诉公告的ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "code",
            "description": "<p>&amp;msg 是否成功</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/complain/setRelateEvent?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/robotComplain.js",
    "groupTitle": "complain"
  },
  {
    "type": "get",
    "url": "/omc/getOmcRecordByStarttime",
    "title": "getOmcRecordByStarttime",
    "description": "<p>通过开始时间查找OMC翻译结果</p>",
    "name": "getOmcRecordByStarttime",
    "group": "omc",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?startTime=",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>网元名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>redis中存的设备类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Timestamp",
            "optional": false,
            "field": "event_time",
            "description": "<p>告警发生时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "timewin",
            "description": "<p>时间窗</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "alarm",
            "description": "<p>告警列表</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/omc/getOmcRecordByStarttime?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/omc.js",
    "groupTitle": "omc"
  },
  {
    "type": "get",
    "url": "/omc/getRelateEvent",
    "title": "getRelateEvent",
    "description": "<p>设置OMC翻译结果的相关事件ID</p>",
    "name": "getRelateEvent",
    "group": "omc",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?eventId=123&omcId=123",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "eventId",
            "description": "<p>关联的事件ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "omcId",
            "description": "<p>OMC翻译结果的ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "code",
            "description": "<p>,msg 是否成功</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/omc/getRelateEvent?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/omc.js",
    "groupTitle": "omc"
  },
  {
    "type": "post",
    "url": "/omc/omcReceiver",
    "title": "omcReceiver",
    "description": "<p>接受OMC翻译结果</p>",
    "name": "omcReceiver",
    "group": "omc",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?ne=&group=&event_time=&timewim=",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ne",
            "description": "<p>网元名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>redis中存的设备类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Timestamp",
            "optional": false,
            "field": "event_time",
            "description": "<p>告警发生时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "timewin",
            "description": "<p>时间窗</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "alarm",
            "description": "<p>告警列表</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/omc/omcReceiver?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/omc.js",
    "groupTitle": "omc"
  },
  {
    "type": "get",
    "url": "/omc/setRelateEvent",
    "title": "setRelateEvent",
    "description": "<p>设置OMC翻译结果的相关事件ID</p>",
    "name": "setRelateEvent",
    "group": "omc",
    "parameter": {
      "examples": [
        {
          "title": "请求参数示例",
          "content": "?eventId=123&omcId=123",
          "type": "String"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "eventId",
            "description": "<p>关联的事件ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "omcId",
            "description": "<p>OMC翻译结果的ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "code",
            "description": "<p>,msg 是否成功</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://188.0.59.193:7001/omc/setRelateEvent?"
      }
    ],
    "version": "0.0.0",
    "filename": "router/omc.js",
    "groupTitle": "omc"
  }
] });
