(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{hf6V:function(t,e,a){"use strict";a.r(e);var n=a("p0pE"),r=a.n(n),s=a("d6i3"),c=a.n(s),i=a("AztY");e["default"]={namespace:"receipt",state:{receiptList:[],total:""},effects:{fetchList:c.a.mark(function t(e,a){var n,r,s,p,o,u,l;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,s=a.put,t.next=4,r(i["b"],n);case 4:if(p=t.sent,!p.success){t.next=9;break}return o=p.data,u=o.receiptInfos,l=o.totalNum,t.next=9,s({type:"saveReceiptList",payload:{total:l,receiptList:u}});case 9:case"end":return t.stop()}},t)})},reducers:{saveReceiptList:function(t,e){var a=e.payload;return r()({},t,a)},saveDownloadList:function(t,e){var a=e.payload;return r()({},t,a)},clear:function(){return{receiptList:[],total:""}}}}}}]);