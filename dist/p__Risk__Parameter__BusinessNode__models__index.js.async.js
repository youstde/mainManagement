(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{bm03:function(e,t,a){"use strict";a.r(t);var n=a("p0pE"),s=a.n(n),r=a("d6i3"),c=a.n(r),i=a("q5x9");t["default"]={namespace:"businessNode",state:{list:[],total:"",nodeList:[]},effects:{fetchList:c.a.mark(function e(t,a){var n,s,r,o,u,p,d;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,r=a.put,e.next=4,s(i["a"],n);case 4:if(o=e.sent,!o.success){e.next=9;break}return u=o.data,p=u.list,d=u.count,e.next=9,r({type:"saveList",payload:{total:d,list:p}});case 9:case"end":return e.stop()}},e)}),fetchNodeList:c.a.mark(function e(t,a){var n,s,r,o,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,r=a.put,e.next=4,s(i["b"],n);case 4:if(o=e.sent,!o.success){e.next=9;break}return u=o.data,e.next=9,r({type:"saveNodeList",payload:{nodeList:u}});case 9:case"end":return e.stop()}},e)})},reducers:{saveList:function(e,t){var a=t.payload;return s()({},e,a)},saveNodeList:function(e,t){var a=t.payload;return s()({},e,a)}}}}}]);