webpackJsonp([5],{319:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=l(4),u=n(a),o=l(2),r=n(o),c=l(3),d=n(c),i=l(6),f=n(i),s=l(5),m=n(s),p=l(1),b=n(p),E=l(40),v=l(62),T=(n(v),l(165)),h=l(70),y=l(61),_=l(717),g=(n(_),function(e){function t(e){(0,r.default)(this,t);var l=(0,f.default)(this,(t.__proto__||(0,u.default)(t)).call(this,e));return l.state={loading:!0},l.componentWillMount=l.componentWillMount.bind(l),l}return(0,m.default)(t,e),(0,d.default)(t,[{key:"componentWillMount",value:function(){var e=this,t=arguments,l=new y.Request;l.setUrl("/v1/contacts").do().then(function(t){e.setState({contacts:t,loading:!1})}).catch(function(e){console.error(e),alert(t)})}},{key:"renderLoading",value:function(){return b.default.createElement("div",{style:{width:500}},b.default.createElement("h1",null,"Loading..."))}},{key:"renderTable",value:function(){var e=this,t=function(){return e.state.contacts?e.state.contacts.map(function(e){return b.default.createElement(T.TableRow,null,b.default.createElement(T.TableRowColumn,null,e.id),b.default.createElement(T.TableRowColumn,null,e.name),b.default.createElement(T.TableRowColumn,null,e.email),b.default.createElement(T.TableRowColumn,null,e.email))}):null};return b.default.createElement(h.Paper,{zDepth:3,style:{padding:"25px",margin:"25px"}},b.default.createElement("div",{style:{marginBottom:"25px"}},b.default.createElement(E.Link,{to:"/contacts/new"},b.default.createElement(h.RaisedButton,{primary:!0,label:"Criar novo contato"}))),b.default.createElement(T.Table,null,b.default.createElement(T.TableHeader,null,b.default.createElement(T.TableRow,null,b.default.createElement(T.TableHeaderColumn,null,"ID"),b.default.createElement(T.TableHeaderColumn,null,"Nome"),b.default.createElement(T.TableHeaderColumn,null,"Email"),b.default.createElement(T.TableHeaderColumn,null))),b.default.createElement(T.TableBody,null,t())))}},{key:"render",value:function(){return this.props.loading?this.renderLoading():this.renderTable()}}]),t}(y.Component));g.propTypes={},t.default=g},320:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=l(39),u=l(319),o=n(u),r={},c=function(e){return{}};t.default=(0,a.connect)(c,r)(o.default)},395:function(e,t,l){t=e.exports=l(53)(),t.push([e.id,"","",{version:3,sources:[],names:[],mappings:"",file:"Contact.scss",sourceRoot:"webpack://"}])},717:function(e,t,l){var n=l(395);"string"==typeof n&&(n=[[e.id,n,""]]);l(60)(n,{});n.locals&&(e.exports=n.locals)}});