var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});function sleepSync(ms){let end=new Date().getTime()+ms,time=new Date().getTime();
for(;time<end;)time=new Date().getTime();return time}__name(sleepSync,"sleepSync");
function uuid(){return sleepSync(1).toString(36)}__name(uuid,"uuid");var COMMENT="comm",RULESET="rule",DECLARATION="decl";var IMPORT="@import";var KEYFRAMES="@keyframes";var LAYER="@layer";var abs=Math.abs,from=String.fromCharCode;function trim(value){return value.trim()}__name(trim,"trim");function replace(value,pattern,replacement){return value.replace(pattern,replacement)}
__name(replace,"replace");function indexof(value,search,position2){return value.
indexOf(search,position2)}__name(indexof,"indexof");function charat(value,index){
return value.charCodeAt(index)|0}__name(charat,"charat");function substr(value,begin,end){
return value.slice(begin,end)}__name(substr,"substr");function strlen(value){return value.
length}__name(strlen,"strlen");function sizeof(value){return value.length}__name(
sizeof,"sizeof");function append(value,array){return array.push(value),value}__name(
append,"append");var line=1,column=1,length=0,position=0,character=0,characters="";function node(value,root,parent,type,props,children,length2,siblings){
return{value,root,parent,type,props,children,line,column,length:length2,return:"",
siblings}}__name(node,"node");function char(){return character}__name(char,"char");function prev(){return character=
position>0?charat(characters,--position):0,column--,character===10&&(column=1,line--),
character}__name(prev,"prev");function next(){return character=position<length?charat(
characters,position++):0,column++,character===10&&(column=1,line++),character}__name(
next,"next");function peek(){return charat(characters,position)}__name(peek,"pee\
k");function caret(){return position}__name(caret,"caret");function slice(begin,end){
return substr(characters,begin,end)}__name(slice,"slice");function token(type){switch(type){case 0:case 9:case 10:case 13:case 32:
return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:
return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:
return 1}return 0}__name(token,"token");function alloc(value){return line=column=
1,length=strlen(characters=value),position=0,[]}__name(alloc,"alloc");function dealloc(value){
return characters="",value}__name(dealloc,"dealloc");function delimit(type){return trim(
slice(position-1,delimiter(type===91?type+2:type===40?type+1:type)))}__name(delimit,
"delimit");function whitespace(type){for(;(character=peek())&&character<33;)next();return token(
type)>2||token(character)>3?"":" "}__name(whitespace,"whitespace");function escaping(index,count){for(;--count&&next()&&!(character<48||character>102||
character>57&&character<65||character>70&&character<97););return slice(index,caret()+
(count<6&&peek()==32&&next()==32))}__name(escaping,"escaping");function delimiter(type){
for(;next();)switch(character){case type:return position;case 34:case 39:type!==
34&&type!==39&&delimiter(character);break;case 40:type===41&&delimiter(type);break;case 92:
next();break}return position}__name(delimiter,"delimiter");function commenter(type,index){
for(;next()&&type+character!==57;)if(type+character===84&&peek()===47)break;return"\
/*"+slice(index,position-1)+"*"+from(type===47?type:next())}__name(commenter,"co\
mmenter");function identifier(index){for(;!token(peek());)next();return slice(index,
position)}__name(identifier,"identifier");function compile(value){return dealloc(parse("",null,null,null,[""],value=alloc(
value),0,[0],value))}__name(compile,"compile");function parse(value,root,parent,rule,rules,rulesets,pseudo,points,declarations){
for(var index=0,offset=0,length2=pseudo,atrule=0,property=0,previous=0,variable=1,
scanning=1,ampersand=1,character2=0,type="",props=rules,children=rulesets,reference=rule,
characters2=type;scanning;)switch(previous=character2,character2=next()){case 40:
if(previous!=108&&charat(characters2,length2-1)==58){indexof(characters2+=replace(
delimit(character2),"&","&\f"),"&\f",abs(index?points[index-1]:0))!=-1&&(ampersand=
-1);break}case 34:case 39:case 91:characters2+=delimit(character2);break;case 9:case 10:case 13:case 32:
characters2+=whitespace(previous);break;case 92:characters2+=escaping(caret()-1,
7);continue;case 47:switch(peek()){case 42:case 47:append(comment(commenter(next(),
caret()),root,parent,declarations),declarations);break;default:characters2+="/"}
break;case 123*variable:points[index++]=strlen(characters2)*ampersand;case 125*variable:case 59:case 0:
switch(character2){case 0:case 125:scanning=0;case 59+offset:ampersand==-1&&(characters2=
replace(characters2,/\f/g,"")),property>0&&strlen(characters2)-length2&&append(property>
32?declaration(characters2+";",rule,parent,length2-1,declarations):declaration(replace(
characters2," ","")+";",rule,parent,length2-2,declarations),declarations);break;case 59:
characters2+=";";default:if(append(reference=ruleset(characters2,root,parent,index,
offset,rules,points,type,props=[],children=[],length2,rulesets),rulesets),character2===
123)if(offset===0)parse(characters2,root,reference,reference,props,rulesets,length2,
points,children);else switch(atrule===99&&charat(characters2,3)===110?100:atrule){case 100:case 108:case 109:case 115:
parse(value,reference,reference,rule&&append(ruleset(value,reference,reference,0,
0,rules,points,type,rules,props=[],length2,children),children),rules,children,length2,
points,rule?props:children);break;default:parse(characters2,reference,reference,
reference,[""],children,0,points,children)}}index=offset=property=0,variable=ampersand=
1,type=characters2="",length2=pseudo;break;case 58:length2=1+strlen(characters2),
property=previous;default:if(variable<1){if(character2==123)--variable;else if(character2==
125&&variable++==0&&prev()==125)continue}switch(characters2+=from(character2),character2*
variable){case 38:ampersand=offset>0?1:(characters2+="\f",-1);break;case 44:points[index++]=
(strlen(characters2)-1)*ampersand,ampersand=1;break;case 64:peek()===45&&(characters2+=
delimit(next())),atrule=peek(),offset=length2=strlen(type=characters2+=identifier(
caret())),character2++;break;case 45:previous===45&&strlen(characters2)==2&&(variable=
0)}}return rulesets}__name(parse,"parse");function ruleset(value,root,parent,index,offset,rules,points,type,props,children,length2,siblings){
for(var post=offset-1,rule=offset===0?rules:[""],size=sizeof(rule),i=0,j=0,k=0;i<
index;++i)for(var x=0,y=substr(value,post+1,post=abs(j=points[i])),z=value;x<size;++x)
(z=trim(j>0?rule[x]+" "+y:replace(y,/&\f/g,rule[x])))&&(props[k++]=z);return node(
value,root,parent,offset===0?RULESET:type,props,children,length2,siblings)}__name(
ruleset,"ruleset");function comment(value,root,parent,siblings){return node(value,
root,parent,COMMENT,from(char()),substr(value,2,-2),0,siblings)}__name(comment,"\
comment");function declaration(value,root,parent,length2,siblings){return node(value,
root,parent,DECLARATION,substr(value,0,length2),substr(value,length2+1,-1),length2,
siblings)}__name(declaration,"declaration");function serialize(children,callback){for(var output="",i=0;i<children.length;i++)
output+=callback(children[i],i,children,callback)||"";return output}__name(serialize,
"serialize");function stringify(element,index,children,callback){switch(element.
type){case LAYER:if(element.children.length)break;case IMPORT:case DECLARATION:return element.
return=element.return||element.value;case COMMENT:return"";case KEYFRAMES:return element.
return=element.value+"{"+serialize(element.children,callback)+"}";case RULESET:if(!strlen(
element.value=element.props.join(",")))return""}return strlen(children=serialize(
element.children,callback))?element.return=element.value+"{"+children+"}":""}__name(
stringify,"stringify");function stylis(css){return serialize(compile(css),stringify)}__name(stylis,"sty\
lis");var Isolator=class{static{__name(this,"Isolator")}constructor(element){this.element=
element,this.isolation&&this._isolate(this.isolation)}get isolation(){let isolation=this.
element.getAttribute("isolation");return isolation===""&&(isolation="open"),isolation}isolate(mode){
return this.element.setAttribute("isolation",mode),this._isolate(mode)}_isolate(mode){
let host=document.createElement("div"),shadowRoot=host.attachShadow({mode});return this.
element.insertAdjacentElement("beforebegin",host),shadowRoot.append(this.element),
this.host=host,this.hostShadowRoot=shadowRoot,host}};function IsolatorMixin(Base){
return class extends Base{static{__name(this,"_Isolator")}constructor(...args){super(
...args),this._isolator=new Isolator(this)}isolate(mode="open"){return this._isolator.
isolate(mode)}connectedCallback(){if(super.connectedCallback&&super.connectedCallback(),
!!this._isolator.host&&this.getRootNode().host!==this._isolator.host){let host=this.
_isolator.host;this._isolator.host=void 0,this.insertAdjacentElement("beforebegi\
n",host),this._isolator.hostShadowRoot?.append(this),this._isolator.host=host}}disconnectedCallback(){
if(!this._isolator.host)return super.disconnectedCallback?super.disconnectedCallback():
null;this.getRootNode()===this&&this._isolator.host.remove(),this.getRootNode().
host!==this._isolator.host&&this._isolator.host.remove(),super.disconnectedCallback&&
super.disconnectedCallback()}}}__name(IsolatorMixin,"IsolatorMixin");var AdapterClass=class{constructor(){this.cssStyleSheet=new CSSStyleSheet;this.styles=
[]}static{__name(this,"AdapterClass")}get allStyles(){let superClass=Object.getPrototypeOf(
this.adapterClass),allStyles=[];for(;superClass.adapter;)allStyles.push(...superClass.
adapter.styles),superClass=Object.getPrototypeOf(superClass);return allStyles.push(
...this.styles),allStyles}get allCSS(){return this.allStyles.join(`
`)}set css(css){this.styles=[css],this.tagName&&this.cssStyleSheet.replaceSync(this.
adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`))}get css(){return this.
styles.join(`
`)}define(tagName){this.tagName=tagName,customElements.define(tagName,this.adapterClass),
this.initStyle()}initStyle(){this.cssStyleSheet.replaceSync(this.adapterClass.cssProcess(
`${this.tagName} { ${this.allCSS} }`)),document.adoptedStyleSheets.push(this.cssStyleSheet)}addStyle(css){
if(this.styles.push(css),this.tagName){let rule=`${this.tagName} { ${css} }`,processedCss=this.
adapterClass.cssProcess(rule);this.cssStyleSheet.replaceSync(`
        ${this.tagName} { ${this.allCSS} }
        ${processedCss}
      `)}}},AdapterObject=class{constructor(){this.cssStyleSheet=new CSSStyleSheet}static{
__name(this,"AdapterObject")}get uuid(){return this._uuid?this._uuid:(this._uuid=
`${this.adapterObject.tagName}-${uuid()}`,this._uuid)}get cssObserver(){return this.
_cssObserver?this._cssObserver:(this._cssObserver=new MutationObserver(mutations=>{
for(let mutation of mutations)mutation.attributeName==="css"&&(this.adapterObject.
css=this.adapterObject.getAttribute("css")||"")}),this._cssObserver)}get objectClassSelector(){
return this.adapterObject.classList.value.replace(/ /g,".")}initClass(){this._class=
this.adapterObject.constructor,!this._class.adapter.tagName&&(this._class.adapter.
tagName=this.adapterObject.tagName,this._class.adapter.initStyle())}cssObserve(enable){
enable?this.cssObserver.observe(this.adapterObject,{attributes:!0}):this.cssObserver.
disconnect()}};function AdapterMixin(Base){return class extends Base{constructor(...args){
super(...args);this._adapter=new AdapterObject;this._adapter.adapterObject=this,
this._adapter._class||this._adapter.initClass(),this._adapter.cssObserve(!0)}static{
__name(this,"_Adapter")}static get adapter(){return this._adapter===Object.getPrototypeOf(
this)._adapter&&(this._adapter=new AdapterClass,this._adapter.adapterClass=this),
this._adapter}static cssProcess(css){return css}static set css(css){this.adapter.
css=css}static get css(){return this.adapter.css}static get tagName(){return this.
adapter.tagName}static addStyle(css){this.adapter.addStyle(css)}static define(tagName){
this.adapter.define(tagName)}set css(css){this.classList.add(this._adapter.uuid);
let processedCss=this._adapter._class.cssProcess(`${this.tagName}.${this._adapter.
objectClassSelector} { ${css} }`);this._adapter.cssStyleSheet.replaceSync(processedCss)}get css(){
let css=this.getAttribute("css")||"";if(css)return css;for(let rule of this._adapter.
cssStyleSheet.cssRules)css+=rule.cssText+`
`;return css}addStyle(css){this.classList.add(this._adapter.uuid);let processedCss=this.
_adapter._class.cssProcess(`${this.tagName}.${this._adapter.objectClassSelector}\
 { ${css} }`);this._adapter.cssStyleSheet.replaceSync(`
        ${this.css}
        ${processedCss}
      `)}connectedCallback(){super.connectedCallback&&super.connectedCallback();
let css=this.getAttribute("css");css&&(this.css=css);let rootNode=this.getRootNode();
rootNode.adoptedStyleSheets.indexOf(this._adapter._class.adapter.cssStyleSheet)===
-1&&rootNode.adoptedStyleSheets.push(this._adapter._class.adapter.cssStyleSheet),
rootNode.adoptedStyleSheets.indexOf(this._adapter.cssStyleSheet)===-1&&rootNode.
adoptedStyleSheets.push(this._adapter.cssStyleSheet)}remove(){let rootNode=this.
getRootNode(),i=rootNode.adoptedStyleSheets.indexOf(this._adapter.cssStyleSheet);
rootNode.adoptedStyleSheets.splice(i,1),super.remove()}}}__name(AdapterMixin,"Ad\
apterMixin");var Adapter=class extends IsolatorMixin(AdapterMixin(HTMLElement)){static{
__name(this,"Adapter")}static cssProcess(css){return stylis(css)}};var Style=class extends IsolatorMixin(Adapter){static{__name(this,"Style")}};Style.
define("el-div");
//# sourceMappingURL=index.js.map
