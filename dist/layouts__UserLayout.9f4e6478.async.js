(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{BOD2:function(e,t,n){e.exports={singleTextOverflow:"antd-pro-layouts-user-layout-singleTextOverflow",container:"antd-pro-layouts-user-layout-container",lang:"antd-pro-layouts-user-layout-lang",content:"antd-pro-layouts-user-layout-content",top:"antd-pro-layouts-user-layout-top",header:"antd-pro-layouts-user-layout-header",logo:"antd-pro-layouts-user-layout-logo",title:"antd-pro-layouts-user-layout-title",desc:"antd-pro-layouts-user-layout-desc"}},Kkfi:function(e,t,n){e.exports={menu:"antd-pro-components-select-lang-index-menu",dropDown:"antd-pro-components-select-lang-index-dropDown"}},QyDn:function(e,t,n){e.exports={container:"antd-pro-components-header-dropdown-index-container"}},jH8a:function(e,t,n){"use strict";n.r(t);var a=n("2Taf"),o=n.n(a),r=n("vZ4D"),u=n.n(r),s=n("l4Ni"),l=n.n(s),c=n("ujKo"),p=n.n(c),i=n("MhPg"),d=n.n(i),y=(n("Pwec"),n("CtXQ")),m=n("q1tI"),h=n.n(m),f=n("MuoO"),v=n("ggcP"),g=n("ZFw/"),w=n.n(g),D=(n("lUTK"),n("BvKs")),b=n("LLXN"),N=n("TSYQ"),x=n.n(N),C=(n("qVdP"),n("jsC+")),k=n("jehZ"),E=n.n(k),M=n("Y/ft"),O=n.n(M),j=n("QyDn"),P=n.n(j),Q=function(e){function t(){return o()(this,t),l()(this,p()(t).apply(this,arguments))}return d()(t,e),u()(t,[{key:"render",value:function(){var e=this.props,t=e.overlayClassName,n=O()(e,["overlayClassName"]);return h.a.createElement(C["a"],E()({overlayClassName:x()(P.a.container,t)},n))}}]),t}(m["PureComponent"]),K=n("Kkfi"),T=n.n(K),B=(m["PureComponent"],n("BOD2")),Z=n.n(B),q=(n("mxmt"),n("tGQQ")),F=h.a.createElement(m["Fragment"],null,"Copyright ",h.a.createElement(y["a"],{type:"copyright"})," 2018 \u8682\u8681\u91d1\u670d\u4f53\u9a8c\u6280\u672f\u90e8\u51fa\u54c1"),J=function(e){function t(){return o()(this,t),l()(this,p()(t).apply(this,arguments))}return d()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,n=e.route,a=n.routes,o=n.authority;t({type:"menu/getMenuData",payload:{routes:a,authority:o}})}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.location.pathname,a=e.breadcrumbNameMap;return h.a.createElement(w.a,{title:Object(q["a"])(n,a)},h.a.createElement("div",{className:Z.a.container},h.a.createElement("div",{className:Z.a.content},t),h.a.createElement(v["a"],{copyright:F})))}}]),t}(m["Component"]);t["default"]=Object(f["connect"])(function(e){var t=e.menu;return{menuData:t.menuData,breadcrumbNameMap:t.breadcrumbNameMap}})(J)}}]);