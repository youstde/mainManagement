(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{MvJZ:function(e,a,t){e.exports={ruleParam:"antd-pro-pages-risk-rule-add-rule-rule-add-ruleParam",ruleParamSpan:"antd-pro-pages-risk-rule-add-rule-rule-add-ruleParamSpan"}},rEzC:function(e,a,t){"use strict";t.r(a);t("+L6B");var l,r,n,s=t("2/Rp"),i=(t("g9YV"),t("wCAj")),c=(t("14J3"),t("BMrR")),u=(t("jCWc"),t("kPKH")),m=t("jehZ"),o=t.n(m),d=(t("2qtc"),t("kLXV")),p=t("p0pE"),E=t.n(p),h=t("2Taf"),g=t.n(h),y=t("vZ4D"),f=t.n(y),v=t("l4Ni"),b=t.n(v),k=t("ujKo"),L=t.n(k),I=t("MhPg"),O=t.n(I),P=(t("OaEy"),t("2fM7")),C=(t("5NDa"),t("5rEg")),R=(t("y8nQ"),t("Vl3Y")),S=t("q1tI"),D=t.n(S),w=t("MuoO"),T=t("7DNP"),q=t("8Wp6"),V=t("+n12"),N=t("zHco"),F=t("MvJZ"),j=t.n(F),x=R["a"].Item,M=C["a"].TextArea,B=P["a"].Option,J=(l=Object(w["connect"])(function(e){var a=e.addRule;return{addRule:a}}),l((n=function(e){function a(){var e,t;g()(this,a);for(var l=arguments.length,r=new Array(l),n=0;n<l;n++)r[n]=arguments[n];return t=b()(this,(e=L()(a)).call.apply(e,[this].concat(r))),t.state={riskParamDtoList:[{}],listLength:0,ruleDetail:{},btnDisabled:!1},t.editForm=function(e,a){var l=t.state,r=l.riskParamDtoList,n=l.listLength,s=r.concat({});"add"===a?t.setState({riskParamDtoList:s,listLength:n+1}):t.setState({riskParamDtoList:r.splice(-1,1),listLength:n-1})},t.handleSubmit=function(e){e.preventDefault();var a=t.props.form.validateFields,l=t.state.listLength,r=Object(V["d"])(),n=r.id;a(function(e,a){if(!e){var r;t.setState({btnDisabled:!0}),Object.keys(a).forEach(function(){0===l?r=[{firstParamId:a.firstParamId0,secondParamId:a.secondParamId0,id:a.id0,sort:0}]:1===l&&(r=[{firstParamId:a.firstParamId0,secondParamId:a.secondParamId0,id:a.id0,sort:0},{firstParamId:a.firstParamId1,secondParamId:a.secondParamId1,id:a.id1,sort:1}])});var s=E()({},a,{riskParamDtoList:r,ruleId:n||null});n?Object(q["i"])(s).then(function(e){e&&e.success&&(t.setState({btnDisabled:!1}),d["a"].success({title:"\u98ce\u63a7\u53c2\u6570\u914d\u7f6e\u6210\u529f!",onOk:function(){var e=t.props.dispatch;e(T["routerRedux"].push("/risk-manage/rule"))}}))}):Object(q["h"])(s).then(function(e){e&&e.success&&(t.setState({btnDisabled:!1}),d["a"].success({title:"\u98ce\u63a7\u53c2\u6570\u914d\u7f6e\u6210\u529f!",onOk:function(){var e=t.props.dispatch;e(T["routerRedux"].push("/risk-manage/rule"))}}))})}})},t.changeOneType=function(e){var a=t.props,l=a.dispatch,r=a.form.setFields;l({type:"addRule/fetchTypeTwoList",payload:{id:e}}),r({ruleTypeId:""})},t.changeOneNode=function(e){var a=t.props,l=a.dispatch,r=a.form.setFields;l({type:"addRule/fetchNodeTwoList",payload:{id:e}}),r({ruleBusinessTypeId:""})},t.changeOneRisk=function(e){var a=t.props.dispatch;a({type:"addRule/fetchRiskTwoList",payload:{id:e}})},t.changeTwoRisk=function(e){var a=t.props.dispatch;a({type:"addRule/fetchParamList",payload:{id:e}})},t}return O()(a,e),f()(a,[{key:"componentDidMount",value:function(){var e=this,a=this.props.dispatch,t=Object(V["d"])(),l=t.id;l&&Object(q["d"])({id:l}).then(function(a){if(a&&a.success){var t=a.data;e.setState({ruleDetail:t,riskParamDtoList:t.riskParamDtoList}),e.changeOneType(t.ruleFistId),e.changeOneNode(t.businessFirstId)}}),l&&a({type:"addRule/fetchRuleDetail",payload:{id:l}}),a({type:"addRule/fetchTypeOneList",payload:{id:0}}),a({type:"addRule/fetchNodeOneList",payload:{id:0}}),a({type:"addRule/fetchStrategyList"}),a({type:"addRule/fetchRuleGroupList"}),a({type:"addRule/fetchRiskOneList",payload:{id:0}})}},{key:"render",value:function(){var e=this,a=this.state,t=a.riskParamDtoList,l=a.ruleDetail,r=a.btnDisabled,n=Object(V["d"])(),m=n.id,d=this.props,p=d.form.getFieldDecorator,E=d.addRule,h=E.strategyList,g=E.ruleGroupList,y=E.typeOneList,f=E.typeTwoList,v=E.nodeOneList,b=E.nodeTwoList,k=E.riskOneList,L=E.riskTwoList,I=E.paramList,O={colon:!1,labelCol:{span:6},wrapperCol:{span:12}},S={colon:!1,labelCol:{span:2},wrapperCol:{span:12}},w=[{title:"\u4e00\u7ea7\u7b56\u7565",dataIndex:"firstParamName"},{title:"\u4e8c\u7ea7\u7b56\u7565",dataIndex:"secondParmaName"},{title:"\u89c4\u5219\u53c2\u6570",dataIndex:"paramName"}];return D.a.createElement(N["a"],null,D.a.createElement(R["a"],{onSubmit:this.handleSubmit},D.a.createElement(c["a"],{gutter:24},!m&&D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u89c4\u5219\u7ec4"},O),p("groupId",{rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u89c4\u5219\u7ec4"},g.map(function(e){return D.a.createElement(B,{key:e.key},e.value)}))))),D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u89c4\u5219\u540d\u79f0"},O),p("ruleName",{initialValue:m&&l.ruleName?l.ruleName:"",rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(C["a"],{placeholder:"\u8bf7\u8f93\u5165\u89c4\u5219\u540d\u79f0"}))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u4e00\u7ea7\u5206\u7c7b"},O),p("ruleTypeOneId",{initialValue:m&&l.ruleFistId?"".concat(l.ruleFistId):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u4e00\u7ea7\u5206\u7c7b",onChange:this.changeOneType},y.map(function(e){return D.a.createElement(B,{key:e.key},e.value)}))))),D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u4e8c\u7ea7\u5206\u7c7b"},O),p("ruleTypeId",{initialValue:m&&l.ruleSecondId?"".concat(l.ruleSecondId):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u4e8c\u7ea7\u5206\u7c7b"},f.map(function(e){return D.a.createElement(B,{key:e.key},e.value)})))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u4e00\u7ea7\u4e1a\u52a1\u8282\u70b9"},O),p("ruleBusinessTypeOneId",{initialValue:m&&l.businessFirstId?"".concat(l.businessFirstId):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u4e00\u7ea7\u4e1a\u52a1\u8282\u70b9",onChange:this.changeOneNode},v.map(function(e){return D.a.createElement(B,{key:e.key},e.value)}))))),D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u4e8c\u7ea7\u4e1a\u52a1\u8282\u70b9"},O),p("ruleBusinessTypeId",{initialValue:m&&l.businessSecondId?"".concat(l.businessSecondId):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u4e8c\u7ea7\u4e1a\u52a1\u8282\u70b9"},b.map(function(e){return D.a.createElement(B,{key:e.key},e.value)})))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u4e25\u91cd\u7b49\u7ea7"},O),p("ruleLevel",{initialValue:m&&l.ruleLevel?l.ruleLevel:null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u4e25\u91cd\u7b49\u7ea7",onChange:this.handleSelectChange},D.a.createElement(B,{value:2},"\u8f7b\u5ea6"),D.a.createElement(B,{value:5},"\u4e2d\u5ea6"),D.a.createElement(B,{value:8},"\u91cd\u5ea6"))))),D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u5904\u7f6e\u7b56\u7565"},O),p("strategicCode",{initialValue:m&&l.strategyCode?"".concat(l.strategyCode):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u5904\u7f6e\u7b56\u7565"},h.map(function(e){return D.a.createElement(B,{key:e.key},e.value)})))))),m&&D.a.createElement(c["a"],null,D.a.createElement(x,o()({label:"\u5df2\u9009\u89c4\u5219\u53c2\u6570"},S),p("codeTable")(D.a.createElement(i["a"],{columns:w,dataSource:t,pagination:!1,rowKey:function(e){return e.sort}})))),D.a.createElement(c["a"],null,D.a.createElement(u["a"],null,D.a.createElement(x,o()({label:"\u89c4\u5219\u53c2\u6570"},S),D.a.createElement("div",{className:j.a.ruleParam},t.map(function(a,t){return D.a.createElement("span",{className:j.a.ruleParamSpan,key:t},D.a.createElement(x,null,p("firstParamId".concat(t),{rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{style:{width:"200px"},placeholder:"\u8bf7\u9009\u62e9\u6240\u5c5e\u4e00\u7ea7\u7b56\u7565",onChange:e.changeOneRisk},k.map(function(e){return D.a.createElement(B,{key:e.key},e.value)})))),D.a.createElement(x,null,p("secondParamId".concat(t),{rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b!"}]})(D.a.createElement(P["a"],{style:{width:"200px"},placeholder:"\u8bf7\u9009\u62e9\u6240\u5c5e\u4e8c\u7ea7\u7b56\u7565",onChange:e.changeTwoRisk},L.map(function(e){return D.a.createElement(B,{key:e.key},e.value)})))),D.a.createElement(x,null,p("id".concat(t),{rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b!"}]})(D.a.createElement(P["a"],{style:{width:"300px"},placeholder:"\u8bf7\u9009\u62e9\u53c2\u6570\u540d",showSearch:!0,filterOption:function(e,a){return a.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},I.map(function(e){return D.a.createElement(B,{key:e.key},e.value)})))),t<1&&D.a.createElement(s["a"],{shape:"circle",size:"small",icon:"plus",type:"primary",onClick:function(){return e.editForm(t,"add")}}),t>0&&D.a.createElement(s["a"],{shape:"circle",size:"small",icon:"minus",type:"default",onClick:function(){return e.editForm(t,"minus")}}))}))))),t.length>1&&D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u8fd0\u7b97\u7b26"},O),p("commonSignOperation",{initialValue:m&&l.commonSignOperation?"".concat(l.commonSignOperation):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u8fd0\u7b97\u7b26",onChange:this.handleSelectChange},D.a.createElement(B,{value:"+"},"\u52a0"),D.a.createElement(B,{value:"-"},"\u51cf"),D.a.createElement(B,{value:"*"},"\u4e58"),D.a.createElement(B,{value:"/"},"\u9664"),D.a.createElement(B,{value:">"},"\u5927\u4e8e"),D.a.createElement(B,{value:"<"},"\u5c0f\u4e8e"),D.a.createElement(B,{value:"="},"\u7b49\u4e8e"),D.a.createElement(B,{value:"!="},"\u4e0d\u7b49\u4e8e"),D.a.createElement(B,{value:">="},"\u5927\u4e8e\u7b49\u4e8e"),D.a.createElement(B,{value:"<="},"\u5c0f\u4e8e\u7b49\u4e8e")))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u6bd4\u8f83\u7b26"},O),p("compareSignOperation",{initialValue:m&&l.compareSignOperation?"".concat(l.compareSignOperation):null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u6bd4\u8f83\u7b26",onChange:this.handleSelectChange},D.a.createElement(B,{value:">"},"\u5927\u4e8e"),D.a.createElement(B,{value:"<"},"\u5c0f\u4e8e"),D.a.createElement(B,{value:"="},"\u7b49\u4e8e"),D.a.createElement(B,{value:"!="},"\u4e0d\u7b49\u4e8e"),D.a.createElement(B,{value:">="},"\u5927\u4e8e\u7b49\u4e8e"),D.a.createElement(B,{value:"<="},"\u5c0f\u4e8e\u7b49\u4e8e"),D.a.createElement(B,{value:"INCLUDE"},"\u5305\u542b"),D.a.createElement(B,{value:"EXCLUDE"},"\u4e0d\u5305\u542b"))))),D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u6bd4\u8f83\u503c"},O),p("compareValue",{initialValue:m&&l.compareValue?l.compareValue:"",rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(C["a"],{placeholder:"\u8bf7\u8f93\u5165\u6bd4\u8f83\u503c"}))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u89c4\u5219\u8bf4\u660e"},O),p("ruleDetails",{initialValue:m&&l.ruleDetails?l.ruleDetails:"",rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(M,{rows:4}))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u98ce\u63a7\u89e3\u9664\u89c4\u5219"},O),p("removeRule",{initialValue:m&&l.removeRule?l.removeRule:null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u98ce\u63a7\u89e3\u9664\u89c4\u5219",onChange:this.handleSelectChange},D.a.createElement(B,{value:1},"\u4eba\u5de5\u89e3\u9664"))))),D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u89e6\u53d1\u7c7b\u578b"},O),p("triggerType",{initialValue:m&&l.triggerType?l.triggerType:null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u89e6\u53d1\u7c7b\u578b",onChange:this.handleSelectChange},D.a.createElement(B,{value:1},"\u4e3b\u52a8\u901a\u77e5")))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:8},D.a.createElement(x,o()({label:"\u7b56\u7565\u54cd\u5e94\u5468\u671f"},O),p("strategyResponse",{initialValue:m&&l.strategyResponse?l.strategyResponse:null,rules:[{required:!0,message:"\u8be5\u9879\u5fc5\u586b\uff01"}]})(D.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u7b56\u7565\u54cd\u5e94\u5468\u671f",onChange:this.handleSelectChange},D.a.createElement(B,{value:1},"\u5b9e\u65f6")))))),D.a.createElement(c["a"],{gutter:24},D.a.createElement(u["a"],{span:26,style:{textAlign:"right"}},D.a.createElement(R["a"].Item,O,D.a.createElement(s["a"],{type:"primary",htmlType:"submit",disabled:r},"\u63d0\u4ea4"))))))}}]),a}(S["Component"]),r=n))||r);a["default"]=R["a"].create()(J)}}]);