var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});var __commonJS=(cb,mod)=>function(){return mod||(0,cb[__getOwnPropNames(cb)[0]])(
(mod={exports:{}}).exports,mod),mod.exports};var __copyProps=(to,from3,except,desc)=>{if(from3&&typeof from3=="object"||typeof from3==
"function")for(let key of __getOwnPropNames(from3))!__hasOwnProp.call(to,key)&&key!==
except&&__defProp(to,key,{get:()=>from3[key],enumerable:!(desc=__getOwnPropDesc(
from3,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):
{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,
enumerable:!0}):target,mod));var require_core=__commonJS({"node_modules/highlight.js/lib/core.js"(exports,module){
function deepFreeze(obj){return obj instanceof Map?obj.clear=obj.delete=obj.set=
function(){throw new Error("map is read-only")}:obj instanceof Set&&(obj.add=obj.
clear=obj.delete=function(){throw new Error("set is read-only")}),Object.freeze(
obj),Object.getOwnPropertyNames(obj).forEach(name=>{let prop=obj[name],type=typeof prop;
(type==="object"||type==="function")&&!Object.isFrozen(prop)&&deepFreeze(prop)}),
obj}__name(deepFreeze,"deepFreeze");var Response=class{static{__name(this,"Respo\
nse")}constructor(mode){mode.data===void 0&&(mode.data={}),this.data=mode.data,this.
isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function escapeHTML(value){
return value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(
/"/g,"&quot;").replace(/'/g,"&#x27;")}__name(escapeHTML,"escapeHTML");function inherit$1(original,...objects){
let result=Object.create(null);for(let key in original)result[key]=original[key];
return objects.forEach(function(obj){for(let key in obj)result[key]=obj[key]}),result}
__name(inherit$1,"inherit$1");var SPAN_CLOSE="</span>",emitsWrappingTags=__name(
node4=>!!node4.scope,"emitsWrappingTags"),scopeToCSSClass=__name((name,{prefix:prefix3})=>{
if(name.startsWith("language:"))return name.replace("language:","language-");if(name.
includes(".")){let pieces=name.split(".");return[`${prefix3}${pieces.shift()}`,...pieces.
map((x,i)=>`${x}${"_".repeat(i+1)}`)].join(" ")}return`${prefix3}${name}`},"scop\
eToCSSClass"),HTMLRenderer=class{static{__name(this,"HTMLRenderer")}constructor(parseTree,options){
this.buffer="",this.classPrefix=options.classPrefix,parseTree.walk(this)}addText(text2){
this.buffer+=escapeHTML(text2)}openNode(node4){if(!emitsWrappingTags(node4))return;
let className=scopeToCSSClass(node4.scope,{prefix:this.classPrefix});this.span(className)}closeNode(node4){
emitsWrappingTags(node4)&&(this.buffer+=SPAN_CLOSE)}value(){return this.buffer}span(className){
this.buffer+=`<span class="${className}">`}},newNode=__name((opts={})=>{let result={
children:[]};return Object.assign(result,opts),result},"newNode"),TokenTree=class _TokenTree{static{
__name(this,"TokenTree")}constructor(){this.rootNode=newNode(),this.stack=[this.
rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.
rootNode}add(node4){this.top.children.push(node4)}openNode(scope){let node4=newNode(
{scope});this.add(node4),this.stack.push(node4)}closeNode(){if(this.stack.length>
1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.
stringify(this.rootNode,null,4)}walk(builder){return this.constructor._walk(builder,
this.rootNode)}static _walk(builder,node4){return typeof node4=="string"?builder.
addText(node4):node4.children&&(builder.openNode(node4),node4.children.forEach(child=>this.
_walk(builder,child)),builder.closeNode(node4)),builder}static _collapse(node4){
typeof node4!="string"&&node4.children&&(node4.children.every(el=>typeof el=="st\
ring")?node4.children=[node4.children.join("")]:node4.children.forEach(child=>{_TokenTree.
_collapse(child)}))}},TokenTreeEmitter=class extends TokenTree{static{__name(this,
"TokenTreeEmitter")}constructor(options){super(),this.options=options}addText(text2){
text2!==""&&this.add(text2)}startScope(scope){this.openNode(scope)}endScope(){this.
closeNode()}__addSublanguage(emitter,name){let node4=emitter.root;name&&(node4.scope=
`language:${name}`),this.add(node4)}toHTML(){return new HTMLRenderer(this,this.options).
value()}finalize(){return this.closeAllNodes(),!0}};function source(re){return re?
typeof re=="string"?re:re.source:null}__name(source,"source");function lookahead(re){
return concat("(?=",re,")")}__name(lookahead,"lookahead");function anyNumberOfTimes(re){
return concat("(?:",re,")*")}__name(anyNumberOfTimes,"anyNumberOfTimes");function optional(re){
return concat("(?:",re,")?")}__name(optional,"optional");function concat(...args){
return args.map(x=>source(x)).join("")}__name(concat,"concat");function stripOptionsFromArgs(args){
let opts=args[args.length-1];return typeof opts=="object"&&opts.constructor===Object?
(args.splice(args.length-1,1),opts):{}}__name(stripOptionsFromArgs,"stripOptions\
FromArgs");function either(...args){return"("+(stripOptionsFromArgs(args).capture?
"":"?:")+args.map(x=>source(x)).join("|")+")"}__name(either,"either");function countMatchGroups(re){
return new RegExp(re.toString()+"|").exec("").length-1}__name(countMatchGroups,"\
countMatchGroups");function startsWith(re,lexeme){let match2=re&&re.exec(lexeme);
return match2&&match2.index===0}__name(startsWith,"startsWith");var BACKREF_RE=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function _rewriteBackreferences(regexps,{joinWith}){let numCaptures=0;return regexps.
map(regex=>{numCaptures+=1;let offset=numCaptures,re=source(regex),out="";for(;re.
length>0;){let match2=BACKREF_RE.exec(re);if(!match2){out+=re;break}out+=re.substring(
0,match2.index),re=re.substring(match2.index+match2[0].length),match2[0][0]==="\\"&&
match2[1]?out+="\\"+String(Number(match2[1])+offset):(out+=match2[0],match2[0]===
"("&&numCaptures++)}return out}).map(re=>`(${re})`).join(joinWith)}__name(_rewriteBackreferences,
"_rewriteBackreferences");var MATCH_NOTHING_RE=/\b\B/,IDENT_RE3="[a-zA-Z]\\w*",UNDERSCORE_IDENT_RE="\
[a-zA-Z_]\\w*",NUMBER_RE="\\b\\d+(\\.\\d+)?",C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9\
]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",BINARY_NUMBER_RE="\\b(0b[01]+)",
RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|\
===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG=__name(
(opts={})=>{let beginShebang=/^#![ ]*\//;return opts.binary&&(opts.begin=concat(
beginShebang,/.*\b/,opts.binary,/\b.*/)),inherit$1({scope:"meta",begin:beginShebang,
end:/$/,relevance:0,"on:begin":(m,resp)=>{m.index!==0&&resp.ignoreMatch()}},opts)},
"SHEBANG"),BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},APOS_STRING_MODE={
scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[BACKSLASH_ESCAPE]},QUOTE_STRING_MODE={
scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[BACKSLASH_ESCAPE]},PHRASAL_WORDS_MODE={
begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},
COMMENT3=__name(function(begin,end,modeOptions={}){let mode=inherit$1({scope:"co\
mment",begin,end,contains:[]},modeOptions);mode.contains.push({scope:"doctag",begin:"\
[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
excludeBegin:!0,relevance:0});let ENGLISH_WORD=either("I","a","is","so","us","to",
"at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);
return mode.contains.push({begin:concat(/[ ]+/,"(",ENGLISH_WORD,/[.]?[:]?([.][ ]|[ ])/,
"){3}")}),mode},"COMMENT"),C_LINE_COMMENT_MODE=COMMENT3("//","$"),C_BLOCK_COMMENT_MODE=COMMENT3(
"/\\*","\\*/"),HASH_COMMENT_MODE=COMMENT3("#","$"),NUMBER_MODE={scope:"number",begin:NUMBER_RE,
relevance:0},C_NUMBER_MODE={scope:"number",begin:C_NUMBER_RE,relevance:0},BINARY_NUMBER_MODE={
scope:"number",begin:BINARY_NUMBER_RE,relevance:0},REGEXP_MODE={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,
end:/\/[gimuy]*/,contains:[BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[
BACKSLASH_ESCAPE]}]},TITLE_MODE={scope:"title",begin:IDENT_RE3,relevance:0},UNDERSCORE_TITLE_MODE={
scope:"title",begin:UNDERSCORE_IDENT_RE,relevance:0},METHOD_GUARD={begin:"\\.\\s*"+
UNDERSCORE_IDENT_RE,relevance:0},END_SAME_AS_BEGIN=__name(function(mode){return Object.
assign(mode,{"on:begin":(m,resp)=>{resp.data._beginMatch=m[1]},"on:end":(m,resp)=>{
resp.data._beginMatch!==m[1]&&resp.ignoreMatch()}})},"END_SAME_AS_BEGIN"),MODES2=Object.
freeze({__proto__:null,APOS_STRING_MODE,BACKSLASH_ESCAPE,BINARY_NUMBER_MODE,BINARY_NUMBER_RE,
COMMENT:COMMENT3,C_BLOCK_COMMENT_MODE,C_LINE_COMMENT_MODE,C_NUMBER_MODE,C_NUMBER_RE,
END_SAME_AS_BEGIN,HASH_COMMENT_MODE,IDENT_RE:IDENT_RE3,MATCH_NOTHING_RE,METHOD_GUARD,
NUMBER_MODE,NUMBER_RE,PHRASAL_WORDS_MODE,QUOTE_STRING_MODE,REGEXP_MODE,RE_STARTERS_RE,
SHEBANG,TITLE_MODE,UNDERSCORE_IDENT_RE,UNDERSCORE_TITLE_MODE});function skipIfHasPrecedingDot(match2,response){
match2.input[match2.index-1]==="."&&response.ignoreMatch()}__name(skipIfHasPrecedingDot,
"skipIfHasPrecedingDot");function scopeClassName(mode,_parent){mode.className!==
void 0&&(mode.scope=mode.className,delete mode.className)}__name(scopeClassName,
"scopeClassName");function beginKeywords(mode,parent){parent&&mode.beginKeywords&&
(mode.begin="\\b("+mode.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
mode.__beforeBegin=skipIfHasPrecedingDot,mode.keywords=mode.keywords||mode.beginKeywords,
delete mode.beginKeywords,mode.relevance===void 0&&(mode.relevance=0))}__name(beginKeywords,
"beginKeywords");function compileIllegal(mode,_parent){Array.isArray(mode.illegal)&&
(mode.illegal=either(...mode.illegal))}__name(compileIllegal,"compileIllegal");function compileMatch(mode,_parent){
if(mode.match){if(mode.begin||mode.end)throw new Error("begin & end are not supp\
orted with match");mode.begin=mode.match,delete mode.match}}__name(compileMatch,
"compileMatch");function compileRelevance(mode,_parent){mode.relevance===void 0&&
(mode.relevance=1)}__name(compileRelevance,"compileRelevance");var beforeMatchExt=__name(
(mode,parent)=>{if(!mode.beforeMatch)return;if(mode.starts)throw new Error("befo\
reMatch cannot be used with starts");let originalMode=Object.assign({},mode);Object.
keys(mode).forEach(key=>{delete mode[key]}),mode.keywords=originalMode.keywords,
mode.begin=concat(originalMode.beforeMatch,lookahead(originalMode.begin)),mode.starts=
{relevance:0,contains:[Object.assign(originalMode,{endsParent:!0})]},mode.relevance=
0,delete originalMode.beforeMatch},"beforeMatchExt"),COMMON_KEYWORDS=["of","and",
"for","in","not","or","if","then","parent","list","value"],DEFAULT_KEYWORD_SCOPE="\
keyword";function compileKeywords(rawKeywords,caseInsensitive,scopeName=DEFAULT_KEYWORD_SCOPE){
let compiledKeywords=Object.create(null);return typeof rawKeywords=="string"?compileList(
scopeName,rawKeywords.split(" ")):Array.isArray(rawKeywords)?compileList(scopeName,
rawKeywords):Object.keys(rawKeywords).forEach(function(scopeName2){Object.assign(
compiledKeywords,compileKeywords(rawKeywords[scopeName2],caseInsensitive,scopeName2))}),
compiledKeywords;function compileList(scopeName2,keywordList){caseInsensitive&&(keywordList=
keywordList.map(x=>x.toLowerCase())),keywordList.forEach(function(keyword){let pair=keyword.
split("|");compiledKeywords[pair[0]]=[scopeName2,scoreForKeyword(pair[0],pair[1])]})}
__name(compileList,"compileList")}__name(compileKeywords,"compileKeywords");function scoreForKeyword(keyword,providedScore){
return providedScore?Number(providedScore):commonKeyword(keyword)?0:1}__name(scoreForKeyword,
"scoreForKeyword");function commonKeyword(keyword){return COMMON_KEYWORDS.includes(
keyword.toLowerCase())}__name(commonKeyword,"commonKeyword");var seenDeprecations={},
error=__name(message=>{console.error(message)},"error"),warn=__name((message,...args)=>{
console.log(`WARN: ${message}`,...args)},"warn"),deprecated=__name((version2,message)=>{
seenDeprecations[`${version2}/${message}`]||(console.log(`Deprecated as of ${version2}\
. ${message}`),seenDeprecations[`${version2}/${message}`]=!0)},"deprecated"),MultiClassError=new Error;
function remapScopeNames(mode,regexes,{key}){let offset=0,scopeNames=mode[key],emit={},
positions={};for(let i=1;i<=regexes.length;i++)positions[i+offset]=scopeNames[i],
emit[i+offset]=!0,offset+=countMatchGroups(regexes[i-1]);mode[key]=positions,mode[key].
_emit=emit,mode[key]._multi=!0}__name(remapScopeNames,"remapScopeNames");function beginMultiClass(mode){
if(Array.isArray(mode.begin)){if(mode.skip||mode.excludeBegin||mode.returnBegin)
throw error("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
MultiClassError;if(typeof mode.beginScope!="object"||mode.beginScope===null)throw error(
"beginScope must be object"),MultiClassError;remapScopeNames(mode,mode.begin,{key:"\
beginScope"}),mode.begin=_rewriteBackreferences(mode.begin,{joinWith:""})}}__name(
beginMultiClass,"beginMultiClass");function endMultiClass(mode){if(Array.isArray(
mode.end)){if(mode.skip||mode.excludeEnd||mode.returnEnd)throw error("skip, excl\
udeEnd, returnEnd not compatible with endScope: {}"),MultiClassError;if(typeof mode.
endScope!="object"||mode.endScope===null)throw error("endScope must be object"),
MultiClassError;remapScopeNames(mode,mode.end,{key:"endScope"}),mode.end=_rewriteBackreferences(
mode.end,{joinWith:""})}}__name(endMultiClass,"endMultiClass");function scopeSugar(mode){
mode.scope&&typeof mode.scope=="object"&&mode.scope!==null&&(mode.beginScope=mode.
scope,delete mode.scope)}__name(scopeSugar,"scopeSugar");function MultiClass(mode){
scopeSugar(mode),typeof mode.beginScope=="string"&&(mode.beginScope={_wrap:mode.
beginScope}),typeof mode.endScope=="string"&&(mode.endScope={_wrap:mode.endScope}),
beginMultiClass(mode),endMultiClass(mode)}__name(MultiClass,"MultiClass");function compileLanguage(language){
function langRe(value,global){return new RegExp(source(value),"m"+(language.case_insensitive?
"i":"")+(language.unicodeRegex?"u":"")+(global?"g":""))}__name(langRe,"langRe");
class MultiRegex{static{__name(this,"MultiRegex")}constructor(){this.matchIndexes=
{},this.regexes=[],this.matchAt=1,this.position=0}addRule(re,opts){opts.position=
this.position++,this.matchIndexes[this.matchAt]=opts,this.regexes.push([opts,re]),
this.matchAt+=countMatchGroups(re)+1}compile(){this.regexes.length===0&&(this.exec=
()=>null);let terminators=this.regexes.map(el=>el[1]);this.matcherRe=langRe(_rewriteBackreferences(
terminators,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=
this.lastIndex;let match2=this.matcherRe.exec(s);if(!match2)return null;let i=match2.
findIndex((el,i2)=>i2>0&&el!==void 0),matchData=this.matchIndexes[i];return match2.
splice(0,i),Object.assign(match2,matchData)}}class ResumableMultiRegex{static{__name(
this,"ResumableMultiRegex")}constructor(){this.rules=[],this.multiRegexes=[],this.
count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(index){if(this.multiRegexes[index])
return this.multiRegexes[index];let matcher=new MultiRegex;return this.rules.slice(
index).forEach(([re,opts])=>matcher.addRule(re,opts)),matcher.compile(),this.multiRegexes[index]=
matcher,matcher}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){
this.regexIndex=0}addRule(re,opts){this.rules.push([re,opts]),opts.type==="begin"&&
this.count++}exec(s){let m=this.getMatcher(this.regexIndex);m.lastIndex=this.lastIndex;
let result=m.exec(s);if(this.resumingScanAtSamePosition()&&!(result&&result.index===
this.lastIndex)){let m2=this.getMatcher(0);m2.lastIndex=this.lastIndex+1,result=
m2.exec(s)}return result&&(this.regexIndex+=result.position+1,this.regexIndex===
this.count&&this.considerAll()),result}}function buildModeRegex(mode){let mm=new ResumableMultiRegex;
return mode.contains.forEach(term=>mm.addRule(term.begin,{rule:term,type:"begin"})),
mode.terminatorEnd&&mm.addRule(mode.terminatorEnd,{type:"end"}),mode.illegal&&mm.
addRule(mode.illegal,{type:"illegal"}),mm}__name(buildModeRegex,"buildModeRegex");
function compileMode(mode,parent){let cmode=mode;if(mode.isCompiled)return cmode;
[scopeClassName,compileMatch,MultiClass,beforeMatchExt].forEach(ext=>ext(mode,parent)),
language.compilerExtensions.forEach(ext=>ext(mode,parent)),mode.__beforeBegin=null,
[beginKeywords,compileIllegal,compileRelevance].forEach(ext=>ext(mode,parent)),mode.
isCompiled=!0;let keywordPattern=null;return typeof mode.keywords=="object"&&mode.
keywords.$pattern&&(mode.keywords=Object.assign({},mode.keywords),keywordPattern=
mode.keywords.$pattern,delete mode.keywords.$pattern),keywordPattern=keywordPattern||
/\w+/,mode.keywords&&(mode.keywords=compileKeywords(mode.keywords,language.case_insensitive)),
cmode.keywordPatternRe=langRe(keywordPattern,!0),parent&&(mode.begin||(mode.begin=
/\B|\b/),cmode.beginRe=langRe(cmode.begin),!mode.end&&!mode.endsWithParent&&(mode.
end=/\B|\b/),mode.end&&(cmode.endRe=langRe(cmode.end)),cmode.terminatorEnd=source(
cmode.end)||"",mode.endsWithParent&&parent.terminatorEnd&&(cmode.terminatorEnd+=
(mode.end?"|":"")+parent.terminatorEnd)),mode.illegal&&(cmode.illegalRe=langRe(mode.
illegal)),mode.contains||(mode.contains=[]),mode.contains=[].concat(...mode.contains.
map(function(c){return expandOrCloneMode(c==="self"?mode:c)})),mode.contains.forEach(
function(c){compileMode(c,cmode)}),mode.starts&&compileMode(mode.starts,parent),
cmode.matcher=buildModeRegex(cmode),cmode}if(__name(compileMode,"compileMode"),language.
compilerExtensions||(language.compilerExtensions=[]),language.contains&&language.
contains.includes("self"))throw new Error("ERR: contains `self` is not supported\
 at the top-level of a language.  See documentation.");return language.classNameAliases=
inherit$1(language.classNameAliases||{}),compileMode(language)}__name(compileLanguage,
"compileLanguage");function dependencyOnParent(mode){return mode?mode.endsWithParent||
dependencyOnParent(mode.starts):!1}__name(dependencyOnParent,"dependencyOnParent");
function expandOrCloneMode(mode){return mode.variants&&!mode.cachedVariants&&(mode.
cachedVariants=mode.variants.map(function(variant){return inherit$1(mode,{variants:null},
variant)})),mode.cachedVariants?mode.cachedVariants:dependencyOnParent(mode)?inherit$1(
mode,{starts:mode.starts?inherit$1(mode.starts):null}):Object.isFrozen(mode)?inherit$1(
mode):mode}__name(expandOrCloneMode,"expandOrCloneMode");var version="11.9.0",HTMLInjectionError=class extends Error{static{
__name(this,"HTMLInjectionError")}constructor(reason,html2){super(reason),this.name=
"HTMLInjectionError",this.html=html2}},escape=escapeHTML,inherit=inherit$1,NO_MATCH=Symbol(
"nomatch"),MAX_KEYWORD_HITS=7,HLJS=__name(function(hljs){let languages=Object.create(
null),aliases=Object.create(null),plugins=[],SAFE_MODE=!0,LANGUAGE_NOT_FOUND="Co\
uld not find the language '{}', did you forget to load/include a language module\
?",PLAINTEXT_LANGUAGE={disableAutodetect:!0,name:"Plain text",contains:[]},options={
ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"\
pre code",languages:null,__emitter:TokenTreeEmitter};function shouldNotHighlight(languageName){
return options.noHighlightRe.test(languageName)}__name(shouldNotHighlight,"shoul\
dNotHighlight");function blockLanguage(block){let classes=block.className+" ";classes+=
block.parentNode?block.parentNode.className:"";let match2=options.languageDetectRe.
exec(classes);if(match2){let language=getLanguage(match2[1]);return language||(warn(
LANGUAGE_NOT_FOUND.replace("{}",match2[1])),warn("Falling back to no-highlight m\
ode for this block.",block)),language?match2[1]:"no-highlight"}return classes.split(
/\s+/).find(_class=>shouldNotHighlight(_class)||getLanguage(_class))}__name(blockLanguage,
"blockLanguage");function highlight2(codeOrLanguageName,optionsOrCode,ignoreIllegals){
let code="",languageName="";typeof optionsOrCode=="object"?(code=codeOrLanguageName,
ignoreIllegals=optionsOrCode.ignoreIllegals,languageName=optionsOrCode.language):
(deprecated("10.7.0","highlight(lang, code, ...args) has been deprecated."),deprecated(
"10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),languageName=codeOrLanguageName,
code=optionsOrCode),ignoreIllegals===void 0&&(ignoreIllegals=!0);let context={code,
language:languageName};fire("before:highlight",context);let result=context.result?
context.result:_highlight(context.language,context.code,ignoreIllegals);return result.
code=context.code,fire("after:highlight",result),result}__name(highlight2,"highl\
ight");function _highlight(languageName,codeToHighlight,ignoreIllegals,continuation){
let keywordHits=Object.create(null);function keywordData(mode,matchText){return mode.
keywords[matchText]}__name(keywordData,"keywordData");function processKeywords(){
if(!top.keywords){emitter.addText(modeBuffer);return}let lastIndex=0;top.keywordPatternRe.
lastIndex=0;let match2=top.keywordPatternRe.exec(modeBuffer),buf="";for(;match2;){
buf+=modeBuffer.substring(lastIndex,match2.index);let word=language.case_insensitive?
match2[0].toLowerCase():match2[0],data2=keywordData(top,word);if(data2){let[kind,
keywordRelevance]=data2;if(emitter.addText(buf),buf="",keywordHits[word]=(keywordHits[word]||
0)+1,keywordHits[word]<=MAX_KEYWORD_HITS&&(relevance+=keywordRelevance),kind.startsWith(
"_"))buf+=match2[0];else{let cssClass=language.classNameAliases[kind]||kind;emitKeyword(
match2[0],cssClass)}}else buf+=match2[0];lastIndex=top.keywordPatternRe.lastIndex,
match2=top.keywordPatternRe.exec(modeBuffer)}buf+=modeBuffer.substring(lastIndex),
emitter.addText(buf)}__name(processKeywords,"processKeywords");function processSubLanguage(){
if(modeBuffer==="")return;let result2=null;if(typeof top.subLanguage=="string"){
if(!languages[top.subLanguage]){emitter.addText(modeBuffer);return}result2=_highlight(
top.subLanguage,modeBuffer,!0,continuations[top.subLanguage]),continuations[top.
subLanguage]=result2._top}else result2=highlightAuto(modeBuffer,top.subLanguage.
length?top.subLanguage:null);top.relevance>0&&(relevance+=result2.relevance),emitter.
__addSublanguage(result2._emitter,result2.language)}__name(processSubLanguage,"p\
rocessSubLanguage");function processBuffer(){top.subLanguage!=null?processSubLanguage():
processKeywords(),modeBuffer=""}__name(processBuffer,"processBuffer");function emitKeyword(keyword,scope){
keyword!==""&&(emitter.startScope(scope),emitter.addText(keyword),emitter.endScope())}
__name(emitKeyword,"emitKeyword");function emitMultiClass(scope,match2){let i=1,
max=match2.length-1;for(;i<=max;){if(!scope._emit[i]){i++;continue}let klass=language.
classNameAliases[scope[i]]||scope[i],text2=match2[i];klass?emitKeyword(text2,klass):
(modeBuffer=text2,processKeywords(),modeBuffer=""),i++}}__name(emitMultiClass,"e\
mitMultiClass");function startNewMode(mode,match2){return mode.scope&&typeof mode.
scope=="string"&&emitter.openNode(language.classNameAliases[mode.scope]||mode.scope),
mode.beginScope&&(mode.beginScope._wrap?(emitKeyword(modeBuffer,language.classNameAliases[mode.
beginScope._wrap]||mode.beginScope._wrap),modeBuffer=""):mode.beginScope._multi&&
(emitMultiClass(mode.beginScope,match2),modeBuffer="")),top=Object.create(mode,{
parent:{value:top}}),top}__name(startNewMode,"startNewMode");function endOfMode(mode,match2,matchPlusRemainder){
let matched=startsWith(mode.endRe,matchPlusRemainder);if(matched){if(mode["on:en\
d"]){let resp=new Response(mode);mode["on:end"](match2,resp),resp.isMatchIgnored&&
(matched=!1)}if(matched){for(;mode.endsParent&&mode.parent;)mode=mode.parent;return mode}}
if(mode.endsWithParent)return endOfMode(mode.parent,match2,matchPlusRemainder)}__name(
endOfMode,"endOfMode");function doIgnore(lexeme){return top.matcher.regexIndex===
0?(modeBuffer+=lexeme[0],1):(resumeScanAtSamePosition=!0,0)}__name(doIgnore,"doI\
gnore");function doBeginMatch(match2){let lexeme=match2[0],newMode=match2.rule,resp=new Response(
newMode),beforeCallbacks=[newMode.__beforeBegin,newMode["on:begin"]];for(let cb of beforeCallbacks)
if(cb&&(cb(match2,resp),resp.isMatchIgnored))return doIgnore(lexeme);return newMode.
skip?modeBuffer+=lexeme:(newMode.excludeBegin&&(modeBuffer+=lexeme),processBuffer(),
!newMode.returnBegin&&!newMode.excludeBegin&&(modeBuffer=lexeme)),startNewMode(newMode,
match2),newMode.returnBegin?0:lexeme.length}__name(doBeginMatch,"doBeginMatch");
function doEndMatch(match2){let lexeme=match2[0],matchPlusRemainder=codeToHighlight.
substring(match2.index),endMode=endOfMode(top,match2,matchPlusRemainder);if(!endMode)
return NO_MATCH;let origin=top;top.endScope&&top.endScope._wrap?(processBuffer(),
emitKeyword(lexeme,top.endScope._wrap)):top.endScope&&top.endScope._multi?(processBuffer(),
emitMultiClass(top.endScope,match2)):origin.skip?modeBuffer+=lexeme:(origin.returnEnd||
origin.excludeEnd||(modeBuffer+=lexeme),processBuffer(),origin.excludeEnd&&(modeBuffer=
lexeme));do top.scope&&emitter.closeNode(),!top.skip&&!top.subLanguage&&(relevance+=
top.relevance),top=top.parent;while(top!==endMode.parent);return endMode.starts&&
startNewMode(endMode.starts,match2),origin.returnEnd?0:lexeme.length}__name(doEndMatch,
"doEndMatch");function processContinuations(){let list=[];for(let current=top;current!==
language;current=current.parent)current.scope&&list.unshift(current.scope);list.
forEach(item=>emitter.openNode(item))}__name(processContinuations,"processContin\
uations");let lastMatch={};function processLexeme(textBeforeMatch,match2){let lexeme=match2&&
match2[0];if(modeBuffer+=textBeforeMatch,lexeme==null)return processBuffer(),0;if(lastMatch.
type==="begin"&&match2.type==="end"&&lastMatch.index===match2.index&&lexeme===""){
if(modeBuffer+=codeToHighlight.slice(match2.index,match2.index+1),!SAFE_MODE){let err=new Error(
`0 width match regex (${languageName})`);throw err.languageName=languageName,err.
badRule=lastMatch.rule,err}return 1}if(lastMatch=match2,match2.type==="begin")return doBeginMatch(
match2);if(match2.type==="illegal"&&!ignoreIllegals){let err=new Error('Illegal \
lexeme "'+lexeme+'" for mode "'+(top.scope||"<unnamed>")+'"');throw err.mode=top,
err}else if(match2.type==="end"){let processed=doEndMatch(match2);if(processed!==
NO_MATCH)return processed}if(match2.type==="illegal"&&lexeme==="")return 1;if(iterations>
1e5&&iterations>match2.index*3)throw new Error("potential infinite loop, way mor\
e iterations than matches");return modeBuffer+=lexeme,lexeme.length}__name(processLexeme,
"processLexeme");let language=getLanguage(languageName);if(!language)throw error(
LANGUAGE_NOT_FOUND.replace("{}",languageName)),new Error('Unknown language: "'+languageName+
'"');let md=compileLanguage(language),result="",top=continuation||md,continuations={},
emitter=new options.__emitter(options);processContinuations();let modeBuffer="",
relevance=0,index=0,iterations=0,resumeScanAtSamePosition=!1;try{if(language.__emitTokens)
language.__emitTokens(codeToHighlight,emitter);else{for(top.matcher.considerAll();;){
iterations++,resumeScanAtSamePosition?resumeScanAtSamePosition=!1:top.matcher.considerAll(),
top.matcher.lastIndex=index;let match2=top.matcher.exec(codeToHighlight);if(!match2)
break;let beforeMatch=codeToHighlight.substring(index,match2.index),processedCount=processLexeme(
beforeMatch,match2);index=match2.index+processedCount}processLexeme(codeToHighlight.
substring(index))}return emitter.finalize(),result=emitter.toHTML(),{language:languageName,
value:result,relevance,illegal:!1,_emitter:emitter,_top:top}}catch(err){if(err.message&&
err.message.includes("Illegal"))return{language:languageName,value:escape(codeToHighlight),
illegal:!0,relevance:0,_illegalBy:{message:err.message,index,context:codeToHighlight.
slice(index-100,index+100),mode:err.mode,resultSoFar:result},_emitter:emitter};if(SAFE_MODE)
return{language:languageName,value:escape(codeToHighlight),illegal:!1,relevance:0,
errorRaised:err,_emitter:emitter,_top:top};throw err}}__name(_highlight,"_highli\
ght");function justTextHighlightResult(code){let result={value:escape(code),illegal:!1,
relevance:0,_top:PLAINTEXT_LANGUAGE,_emitter:new options.__emitter(options)};return result.
_emitter.addText(code),result}__name(justTextHighlightResult,"justTextHighlightR\
esult");function highlightAuto(code,languageSubset){languageSubset=languageSubset||
options.languages||Object.keys(languages);let plaintext=justTextHighlightResult(
code),results=languageSubset.filter(getLanguage).filter(autoDetection).map(name=>_highlight(
name,code,!1));results.unshift(plaintext);let sorted=results.sort((a,b)=>{if(a.relevance!==
b.relevance)return b.relevance-a.relevance;if(a.language&&b.language){if(getLanguage(
a.language).supersetOf===b.language)return 1;if(getLanguage(b.language).supersetOf===
a.language)return-1}return 0}),[best,secondBest]=sorted,result=best;return result.
secondBest=secondBest,result}__name(highlightAuto,"highlightAuto");function updateClassName(element,currentLang,resultLang){
let language=currentLang&&aliases[currentLang]||resultLang;element.classList.add(
"hljs"),element.classList.add(`language-${language}`)}__name(updateClassName,"up\
dateClassName");function highlightElement(element){let node4=null,language=blockLanguage(
element);if(shouldNotHighlight(language))return;if(fire("before:highlightElement",
{el:element,language}),element.dataset.highlighted){console.log("Element previou\
sly highlighted. To highlight again, first unset `dataset.highlighted`.",element);
return}if(element.children.length>0&&(options.ignoreUnescapedHTML||(console.warn(
"One of your code blocks includes unescaped HTML. This is a potentially serious \
security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/\
security"),console.warn("The element with unescaped HTML:"),console.warn(element)),
options.throwUnescapedHTML))throw new HTMLInjectionError("One of your code block\
s includes unescaped HTML.",element.innerHTML);node4=element;let text2=node4.textContent,
result=language?highlight2(text2,{language,ignoreIllegals:!0}):highlightAuto(text2);
element.innerHTML=result.value,element.dataset.highlighted="yes",updateClassName(
element,language,result.language),element.result={language:result.language,re:result.
relevance,relevance:result.relevance},result.secondBest&&(element.secondBest={language:result.
secondBest.language,relevance:result.secondBest.relevance}),fire("after:highligh\
tElement",{el:element,result,text:text2})}__name(highlightElement,"highlightElem\
ent");function configure(userOptions){options=inherit(options,userOptions)}__name(
configure,"configure");let initHighlighting=__name(()=>{highlightAll(),deprecated(
"10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},"initHighli\
ghting");function initHighlightingOnLoad(){highlightAll(),deprecated("10.6.0","i\
nitHighlightingOnLoad() deprecated.  Use highlightAll() now.")}__name(initHighlightingOnLoad,
"initHighlightingOnLoad");let wantsHighlight=!1;function highlightAll(){if(document.
readyState==="loading"){wantsHighlight=!0;return}document.querySelectorAll(options.
cssSelector).forEach(highlightElement)}__name(highlightAll,"highlightAll");function boot(){
wantsHighlight&&highlightAll()}__name(boot,"boot"),typeof window<"u"&&window.addEventListener&&
window.addEventListener("DOMContentLoaded",boot,!1);function registerLanguage(languageName,languageDefinition){
let lang=null;try{lang=languageDefinition(hljs)}catch(error$1){if(error("Languag\
e definition for '{}' could not be registered.".replace("{}",languageName)),SAFE_MODE)
error(error$1);else throw error$1;lang=PLAINTEXT_LANGUAGE}lang.name||(lang.name=
languageName),languages[languageName]=lang,lang.rawDefinition=languageDefinition.
bind(null,hljs),lang.aliases&&registerAliases(lang.aliases,{languageName})}__name(
registerLanguage,"registerLanguage");function unregisterLanguage(languageName){delete languages[languageName];
for(let alias of Object.keys(aliases))aliases[alias]===languageName&&delete aliases[alias]}
__name(unregisterLanguage,"unregisterLanguage");function listLanguages(){return Object.
keys(languages)}__name(listLanguages,"listLanguages");function getLanguage(name){
return name=(name||"").toLowerCase(),languages[name]||languages[aliases[name]]}__name(
getLanguage,"getLanguage");function registerAliases(aliasList,{languageName}){typeof aliasList==
"string"&&(aliasList=[aliasList]),aliasList.forEach(alias=>{aliases[alias.toLowerCase()]=
languageName})}__name(registerAliases,"registerAliases");function autoDetection(name){
let lang=getLanguage(name);return lang&&!lang.disableAutodetect}__name(autoDetection,
"autoDetection");function upgradePluginAPI(plugin){plugin["before:highlightBlock"]&&
!plugin["before:highlightElement"]&&(plugin["before:highlightElement"]=data2=>{plugin["\
before:highlightBlock"](Object.assign({block:data2.el},data2))}),plugin["after:h\
ighlightBlock"]&&!plugin["after:highlightElement"]&&(plugin["after:highlightElem\
ent"]=data2=>{plugin["after:highlightBlock"](Object.assign({block:data2.el},data2))})}
__name(upgradePluginAPI,"upgradePluginAPI");function addPlugin(plugin){upgradePluginAPI(
plugin),plugins.push(plugin)}__name(addPlugin,"addPlugin");function removePlugin(plugin){
let index=plugins.indexOf(plugin);index!==-1&&plugins.splice(index,1)}__name(removePlugin,
"removePlugin");function fire(event2,args){let cb=event2;plugins.forEach(function(plugin){
plugin[cb]&&plugin[cb](args)})}__name(fire,"fire");function deprecateHighlightBlock(el){
return deprecated("10.7.0","highlightBlock will be removed entirely in v12.0"),deprecated(
"10.7.0","Please use highlightElement now."),highlightElement(el)}__name(deprecateHighlightBlock,
"deprecateHighlightBlock"),Object.assign(hljs,{highlight:highlight2,highlightAuto,
highlightAll,highlightElement,highlightBlock:deprecateHighlightBlock,configure,initHighlighting,
initHighlightingOnLoad,registerLanguage,unregisterLanguage,listLanguages,getLanguage,
registerAliases,autoDetection,inherit,addPlugin,removePlugin}),hljs.debugMode=function(){
SAFE_MODE=!1},hljs.safeMode=function(){SAFE_MODE=!0},hljs.versionString=version,
hljs.regex={concat,lookahead,either,optional,anyNumberOfTimes};for(let key in MODES2)
typeof MODES2[key]=="object"&&deepFreeze(MODES2[key]);return Object.assign(hljs,
MODES2),hljs},"HLJS"),highlight=HLJS({});highlight.newInstance=()=>HLJS({});module.
exports=highlight;highlight.HighlightJS=highlight;highlight.default=highlight}});var require_color_name=__commonJS({"node_modules/color-name/index.js"(exports,module){
"use strict";module.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],
aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],
bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[
138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[
127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],
cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[
0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],
darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[
85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[
233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[
47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],
deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,
105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],
forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[
248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,
128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[
255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[
240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,
0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[
224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[
144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,
122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,
153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,
255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,
255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[
186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[
123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[
199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,
225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,
245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[
255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],
paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],
peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],
powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,
0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[
250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],
sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,
205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[
0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,
191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,
222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[
154,205,50]}}});var require_is_arrayish=__commonJS({"node_modules/simple-swizzle/node_modules/is\
-arrayish/index.js"(exports,module){module.exports=__name(function(obj){return!obj||
typeof obj=="string"?!1:obj instanceof Array||Array.isArray(obj)||obj.length>=0&&
(obj.splice instanceof Function||Object.getOwnPropertyDescriptor(obj,obj.length-
1)&&obj.constructor.name!=="String")},"isArrayish")}});var require_simple_swizzle=__commonJS({"node_modules/simple-swizzle/index.js"(exports,module){
"use strict";var isArrayish=require_is_arrayish(),concat=Array.prototype.concat,
slice4=Array.prototype.slice,swizzle=module.exports=__name(function(args){for(var results=[],
i=0,len=args.length;i<len;i++){var arg=args[i];isArrayish(arg)?results=concat.call(
results,slice4.call(arg)):results.push(arg)}return results},"swizzle");swizzle.wrap=
function(fn){return function(){return fn(swizzle(arguments))}}}});var require_color_string=__commonJS({"node_modules/color-string/index.js"(exports,module){
var colorNames=require_color_name(),swizzle=require_simple_swizzle(),hasOwnProperty=Object.
hasOwnProperty,reverseNames=Object.create(null);for(name in colorNames)hasOwnProperty.
call(colorNames,name)&&(reverseNames[colorNames[name]]=name);var name,cs=module.
exports={to:{},get:{}};cs.get=function(string){var prefix3=string.substring(0,3).
toLowerCase(),val,model;switch(prefix3){case"hsl":val=cs.get.hsl(string),model="\
hsl";break;case"hwb":val=cs.get.hwb(string),model="hwb";break;default:val=cs.get.
rgb(string),model="rgb";break}return val?{model,value:val}:null};cs.get.rgb=function(string){
if(!string)return null;var abbr=/^#([a-f0-9]{3,4})$/i,hex=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
rgba=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
per=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
keyword=/^(\w+)$/,rgb=[0,0,0,1],match2,i,hexAlpha;if(match2=string.match(hex)){for(hexAlpha=
match2[2],match2=match2[1],i=0;i<3;i++){var i2=i*2;rgb[i]=parseInt(match2.slice(
i2,i2+2),16)}hexAlpha&&(rgb[3]=parseInt(hexAlpha,16)/255)}else if(match2=string.
match(abbr)){for(match2=match2[1],hexAlpha=match2[3],i=0;i<3;i++)rgb[i]=parseInt(
match2[i]+match2[i],16);hexAlpha&&(rgb[3]=parseInt(hexAlpha+hexAlpha,16)/255)}else if(match2=
string.match(rgba)){for(i=0;i<3;i++)rgb[i]=parseInt(match2[i+1],0);match2[4]&&(match2[5]?
rgb[3]=parseFloat(match2[4])*.01:rgb[3]=parseFloat(match2[4]))}else if(match2=string.
match(per)){for(i=0;i<3;i++)rgb[i]=Math.round(parseFloat(match2[i+1])*2.55);match2[4]&&
(match2[5]?rgb[3]=parseFloat(match2[4])*.01:rgb[3]=parseFloat(match2[4]))}else return(match2=
string.match(keyword))?match2[1]==="transparent"?[0,0,0,0]:hasOwnProperty.call(colorNames,
match2[1])?(rgb=colorNames[match2[1]],rgb[3]=1,rgb):null:null;for(i=0;i<3;i++)rgb[i]=
clamp(rgb[i],0,255);return rgb[3]=clamp(rgb[3],0,1),rgb};cs.get.hsl=function(string){
if(!string)return null;var hsl=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
match2=string.match(hsl);if(match2){var alpha=parseFloat(match2[4]),h=(parseFloat(
match2[1])%360+360)%360,s=clamp(parseFloat(match2[2]),0,100),l=clamp(parseFloat(
match2[3]),0,100),a=clamp(isNaN(alpha)?1:alpha,0,1);return[h,s,l,a]}return null};
cs.get.hwb=function(string){if(!string)return null;var hwb=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
match2=string.match(hwb);if(match2){var alpha=parseFloat(match2[4]),h=(parseFloat(
match2[1])%360+360)%360,w=clamp(parseFloat(match2[2]),0,100),b=clamp(parseFloat(
match2[3]),0,100),a=clamp(isNaN(alpha)?1:alpha,0,1);return[h,w,b,a]}return null};
cs.to.hex=function(){var rgba=swizzle(arguments);return"#"+hexDouble(rgba[0])+hexDouble(
rgba[1])+hexDouble(rgba[2])+(rgba[3]<1?hexDouble(Math.round(rgba[3]*255)):"")};cs.
to.rgb=function(){var rgba=swizzle(arguments);return rgba.length<4||rgba[3]===1?
"rgb("+Math.round(rgba[0])+", "+Math.round(rgba[1])+", "+Math.round(rgba[2])+")":
"rgba("+Math.round(rgba[0])+", "+Math.round(rgba[1])+", "+Math.round(rgba[2])+",\
 "+rgba[3]+")"};cs.to.rgb.percent=function(){var rgba=swizzle(arguments),r=Math.
round(rgba[0]/255*100),g=Math.round(rgba[1]/255*100),b=Math.round(rgba[2]/255*100);
return rgba.length<4||rgba[3]===1?"rgb("+r+"%, "+g+"%, "+b+"%)":"rgba("+r+"%, "+
g+"%, "+b+"%, "+rgba[3]+")"};cs.to.hsl=function(){var hsla=swizzle(arguments);return hsla.
length<4||hsla[3]===1?"hsl("+hsla[0]+", "+hsla[1]+"%, "+hsla[2]+"%)":"hsla("+hsla[0]+
", "+hsla[1]+"%, "+hsla[2]+"%, "+hsla[3]+")"};cs.to.hwb=function(){var hwba=swizzle(
arguments),a="";return hwba.length>=4&&hwba[3]!==1&&(a=", "+hwba[3]),"hwb("+hwba[0]+
", "+hwba[1]+"%, "+hwba[2]+"%"+a+")"};cs.to.keyword=function(rgb){return reverseNames[rgb.
slice(0,3)]};function clamp(num,min,max){return Math.min(Math.max(min,num),max)}
__name(clamp,"clamp");function hexDouble(num){var str=Math.round(num).toString(16).
toUpperCase();return str.length<2?"0"+str:str}__name(hexDouble,"hexDouble")}});var require_conversions=__commonJS({"node_modules/color-convert/conversions.js"(exports,module){
var cssKeywords=require_color_name(),reverseKeywords={};for(let key of Object.keys(
cssKeywords))reverseKeywords[cssKeywords[key]]=key;var convert={rgb:{channels:3,
labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,
labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{
channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["\
hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi1\
6"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},
apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};
module.exports=convert;for(let model of Object.keys(convert)){if(!("channels"in convert[model]))
throw new Error("missing channels property: "+model);if(!("labels"in convert[model]))
throw new Error("missing channel labels property: "+model);if(convert[model].labels.
length!==convert[model].channels)throw new Error("channel and label counts misma\
tch: "+model);let{channels,labels}=convert[model];delete convert[model].channels,
delete convert[model].labels,Object.defineProperty(convert[model],"channels",{value:channels}),
Object.defineProperty(convert[model],"labels",{value:labels})}convert.rgb.hsl=function(rgb){
let r=rgb[0]/255,g=rgb[1]/255,b=rgb[2]/255,min=Math.min(r,g,b),max=Math.max(r,g,
b),delta=max-min,h,s;max===min?h=0:r===max?h=(g-b)/delta:g===max?h=2+(b-r)/delta:
b===max&&(h=4+(r-g)/delta),h=Math.min(h*60,360),h<0&&(h+=360);let l=(min+max)/2;
return max===min?s=0:l<=.5?s=delta/(max+min):s=delta/(2-max-min),[h,s*100,l*100]};
convert.rgb.hsv=function(rgb){let rdif,gdif,bdif,h,s,r=rgb[0]/255,g=rgb[1]/255,b=rgb[2]/
255,v=Math.max(r,g,b),diff2=v-Math.min(r,g,b),diffc=__name(function(c){return(v-
c)/6/diff2+1/2},"diffc");return diff2===0?(h=0,s=0):(s=diff2/v,rdif=diffc(r),gdif=
diffc(g),bdif=diffc(b),r===v?h=bdif-gdif:g===v?h=1/3+rdif-bdif:b===v&&(h=2/3+gdif-
rdif),h<0?h+=1:h>1&&(h-=1)),[h*360,s*100,v*100]};convert.rgb.hwb=function(rgb){let r=rgb[0],
g=rgb[1],b=rgb[2],h=convert.rgb.hsl(rgb)[0],w=1/255*Math.min(r,Math.min(g,b));return b=
1-1/255*Math.max(r,Math.max(g,b)),[h,w*100,b*100]};convert.rgb.cmyk=function(rgb){
let r=rgb[0]/255,g=rgb[1]/255,b=rgb[2]/255,k=Math.min(1-r,1-g,1-b),c=(1-r-k)/(1-
k)||0,m=(1-g-k)/(1-k)||0,y=(1-b-k)/(1-k)||0;return[c*100,m*100,y*100,k*100]};function comparativeDistance(x,y){
return(x[0]-y[0])**2+(x[1]-y[1])**2+(x[2]-y[2])**2}__name(comparativeDistance,"c\
omparativeDistance");convert.rgb.keyword=function(rgb){let reversed=reverseKeywords[rgb];
if(reversed)return reversed;let currentClosestDistance=1/0,currentClosestKeyword;
for(let keyword of Object.keys(cssKeywords)){let value=cssKeywords[keyword],distance=comparativeDistance(
rgb,value);distance<currentClosestDistance&&(currentClosestDistance=distance,currentClosestKeyword=
keyword)}return currentClosestKeyword};convert.keyword.rgb=function(keyword){return cssKeywords[keyword]};
convert.rgb.xyz=function(rgb){let r=rgb[0]/255,g=rgb[1]/255,b=rgb[2]/255;r=r>.04045?
((r+.055)/1.055)**2.4:r/12.92,g=g>.04045?((g+.055)/1.055)**2.4:g/12.92,b=b>.04045?
((b+.055)/1.055)**2.4:b/12.92;let x=r*.4124+g*.3576+b*.1805,y=r*.2126+g*.7152+b*
.0722,z=r*.0193+g*.1192+b*.9505;return[x*100,y*100,z*100]};convert.rgb.lab=function(rgb){
let xyz=convert.rgb.xyz(rgb),x=xyz[0],y=xyz[1],z=xyz[2];x/=95.047,y/=100,z/=108.883,
x=x>.008856?x**(1/3):7.787*x+16/116,y=y>.008856?y**(1/3):7.787*y+16/116,z=z>.008856?
z**(1/3):7.787*z+16/116;let l=116*y-16,a=500*(x-y),b=200*(y-z);return[l,a,b]};convert.
hsl.rgb=function(hsl){let h=hsl[0]/360,s=hsl[1]/100,l=hsl[2]/100,t2,t3,val;if(s===
0)return val=l*255,[val,val,val];l<.5?t2=l*(1+s):t2=l+s-l*s;let t1=2*l-t2,rgb=[0,
0,0];for(let i=0;i<3;i++)t3=h+1/3*-(i-1),t3<0&&t3++,t3>1&&t3--,6*t3<1?val=t1+(t2-
t1)*6*t3:2*t3<1?val=t2:3*t3<2?val=t1+(t2-t1)*(2/3-t3)*6:val=t1,rgb[i]=val*255;return rgb};
convert.hsl.hsv=function(hsl){let h=hsl[0],s=hsl[1]/100,l=hsl[2]/100,smin=s,lmin=Math.
max(l,.01);l*=2,s*=l<=1?l:2-l,smin*=lmin<=1?lmin:2-lmin;let v=(l+s)/2,sv=l===0?2*
smin/(lmin+smin):2*s/(l+s);return[h,sv*100,v*100]};convert.hsv.rgb=function(hsv){
let h=hsv[0]/60,s=hsv[1]/100,v=hsv[2]/100,hi=Math.floor(h)%6,f=h-Math.floor(h),p=255*
v*(1-s),q=255*v*(1-s*f),t=255*v*(1-s*(1-f));switch(v*=255,hi){case 0:return[v,t,
p];case 1:return[q,v,p];case 2:return[p,v,t];case 3:return[p,q,v];case 4:return[
t,p,v];case 5:return[v,p,q]}};convert.hsv.hsl=function(hsv){let h=hsv[0],s=hsv[1]/
100,v=hsv[2]/100,vmin=Math.max(v,.01),sl,l;l=(2-s)*v;let lmin=(2-s)*vmin;return sl=
s*vmin,sl/=lmin<=1?lmin:2-lmin,sl=sl||0,l/=2,[h,sl*100,l*100]};convert.hwb.rgb=function(hwb){
let h=hwb[0]/360,wh=hwb[1]/100,bl=hwb[2]/100,ratio=wh+bl,f;ratio>1&&(wh/=ratio,bl/=
ratio);let i=Math.floor(6*h),v=1-bl;f=6*h-i,i&1&&(f=1-f);let n=wh+f*(v-wh),r,g,b;
switch(i){default:case 6:case 0:r=v,g=n,b=wh;break;case 1:r=n,g=v,b=wh;break;case 2:
r=wh,g=v,b=n;break;case 3:r=wh,g=n,b=v;break;case 4:r=n,g=wh,b=v;break;case 5:r=
v,g=wh,b=n;break}return[r*255,g*255,b*255]};convert.cmyk.rgb=function(cmyk){let c=cmyk[0]/
100,m=cmyk[1]/100,y=cmyk[2]/100,k=cmyk[3]/100,r=1-Math.min(1,c*(1-k)+k),g=1-Math.
min(1,m*(1-k)+k),b=1-Math.min(1,y*(1-k)+k);return[r*255,g*255,b*255]};convert.xyz.
rgb=function(xyz){let x=xyz[0]/100,y=xyz[1]/100,z=xyz[2]/100,r,g,b;return r=x*3.2406+
y*-1.5372+z*-.4986,g=x*-.9689+y*1.8758+z*.0415,b=x*.0557+y*-.204+z*1.057,r=r>.0031308?
1.055*r**(1/2.4)-.055:r*12.92,g=g>.0031308?1.055*g**(1/2.4)-.055:g*12.92,b=b>.0031308?
1.055*b**(1/2.4)-.055:b*12.92,r=Math.min(Math.max(0,r),1),g=Math.min(Math.max(0,
g),1),b=Math.min(Math.max(0,b),1),[r*255,g*255,b*255]};convert.xyz.lab=function(xyz){
let x=xyz[0],y=xyz[1],z=xyz[2];x/=95.047,y/=100,z/=108.883,x=x>.008856?x**(1/3):
7.787*x+16/116,y=y>.008856?y**(1/3):7.787*y+16/116,z=z>.008856?z**(1/3):7.787*z+
16/116;let l=116*y-16,a=500*(x-y),b=200*(y-z);return[l,a,b]};convert.lab.xyz=function(lab){
let l=lab[0],a=lab[1],b=lab[2],x,y,z;y=(l+16)/116,x=a/500+y,z=y-b/200;let y2=y**
3,x2=x**3,z2=z**3;return y=y2>.008856?y2:(y-16/116)/7.787,x=x2>.008856?x2:(x-16/
116)/7.787,z=z2>.008856?z2:(z-16/116)/7.787,x*=95.047,y*=100,z*=108.883,[x,y,z]};
convert.lab.lch=function(lab){let l=lab[0],a=lab[1],b=lab[2],h;h=Math.atan2(b,a)*
360/2/Math.PI,h<0&&(h+=360);let c=Math.sqrt(a*a+b*b);return[l,c,h]};convert.lch.
lab=function(lch){let l=lch[0],c=lch[1],hr=lch[2]/360*2*Math.PI,a=c*Math.cos(hr),
b=c*Math.sin(hr);return[l,a,b]};convert.rgb.ansi16=function(args,saturation=null){
let[r,g,b]=args,value=saturation===null?convert.rgb.hsv(args)[2]:saturation;if(value=
Math.round(value/50),value===0)return 30;let ansi=30+(Math.round(b/255)<<2|Math.
round(g/255)<<1|Math.round(r/255));return value===2&&(ansi+=60),ansi};convert.hsv.
ansi16=function(args){return convert.rgb.ansi16(convert.hsv.rgb(args),args[2])};
convert.rgb.ansi256=function(args){let r=args[0],g=args[1],b=args[2];return r===
g&&g===b?r<8?16:r>248?231:Math.round((r-8)/247*24)+232:16+36*Math.round(r/255*5)+
6*Math.round(g/255*5)+Math.round(b/255*5)};convert.ansi16.rgb=function(args){let color2=args%
10;if(color2===0||color2===7)return args>50&&(color2+=3.5),color2=color2/10.5*255,
[color2,color2,color2];let mult=(~~(args>50)+1)*.5,r=(color2&1)*mult*255,g=(color2>>
1&1)*mult*255,b=(color2>>2&1)*mult*255;return[r,g,b]};convert.ansi256.rgb=function(args){
if(args>=232){let c=(args-232)*10+8;return[c,c,c]}args-=16;let rem,r=Math.floor(
args/36)/5*255,g=Math.floor((rem=args%36)/6)/5*255,b=rem%6/5*255;return[r,g,b]};
convert.rgb.hex=function(args){let string=(((Math.round(args[0])&255)<<16)+((Math.
round(args[1])&255)<<8)+(Math.round(args[2])&255)).toString(16).toUpperCase();return"\
000000".substring(string.length)+string};convert.hex.rgb=function(args){let match2=args.
toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!match2)return[0,0,0];let colorString=match2[0];
match2[0].length===3&&(colorString=colorString.split("").map(char3=>char3+char3).
join(""));let integer=parseInt(colorString,16),r=integer>>16&255,g=integer>>8&255,
b=integer&255;return[r,g,b]};convert.rgb.hcg=function(rgb){let r=rgb[0]/255,g=rgb[1]/
255,b=rgb[2]/255,max=Math.max(Math.max(r,g),b),min=Math.min(Math.min(r,g),b),chroma=max-
min,grayscale,hue;return chroma<1?grayscale=min/(1-chroma):grayscale=0,chroma<=0?
hue=0:max===r?hue=(g-b)/chroma%6:max===g?hue=2+(b-r)/chroma:hue=4+(r-g)/chroma,hue/=
6,hue%=1,[hue*360,chroma*100,grayscale*100]};convert.hsl.hcg=function(hsl){let s=hsl[1]/
100,l=hsl[2]/100,c=l<.5?2*s*l:2*s*(1-l),f=0;return c<1&&(f=(l-.5*c)/(1-c)),[hsl[0],
c*100,f*100]};convert.hsv.hcg=function(hsv){let s=hsv[1]/100,v=hsv[2]/100,c=s*v,
f=0;return c<1&&(f=(v-c)/(1-c)),[hsv[0],c*100,f*100]};convert.hcg.rgb=function(hcg){
let h=hcg[0]/360,c=hcg[1]/100,g=hcg[2]/100;if(c===0)return[g*255,g*255,g*255];let pure=[
0,0,0],hi=h%1*6,v=hi%1,w=1-v,mg=0;switch(Math.floor(hi)){case 0:pure[0]=1,pure[1]=
v,pure[2]=0;break;case 1:pure[0]=w,pure[1]=1,pure[2]=0;break;case 2:pure[0]=0,pure[1]=
1,pure[2]=v;break;case 3:pure[0]=0,pure[1]=w,pure[2]=1;break;case 4:pure[0]=v,pure[1]=
0,pure[2]=1;break;default:pure[0]=1,pure[1]=0,pure[2]=w}return mg=(1-c)*g,[(c*pure[0]+
mg)*255,(c*pure[1]+mg)*255,(c*pure[2]+mg)*255]};convert.hcg.hsv=function(hcg){let c=hcg[1]/
100,g=hcg[2]/100,v=c+g*(1-c),f=0;return v>0&&(f=c/v),[hcg[0],f*100,v*100]};convert.
hcg.hsl=function(hcg){let c=hcg[1]/100,l=hcg[2]/100*(1-c)+.5*c,s=0;return l>0&&l<
.5?s=c/(2*l):l>=.5&&l<1&&(s=c/(2*(1-l))),[hcg[0],s*100,l*100]};convert.hcg.hwb=function(hcg){
let c=hcg[1]/100,g=hcg[2]/100,v=c+g*(1-c);return[hcg[0],(v-c)*100,(1-v)*100]};convert.
hwb.hcg=function(hwb){let w=hwb[1]/100,v=1-hwb[2]/100,c=v-w,g=0;return c<1&&(g=(v-
c)/(1-c)),[hwb[0],c*100,g*100]};convert.apple.rgb=function(apple){return[apple[0]/
65535*255,apple[1]/65535*255,apple[2]/65535*255]};convert.rgb.apple=function(rgb){
return[rgb[0]/255*65535,rgb[1]/255*65535,rgb[2]/255*65535]};convert.gray.rgb=function(args){
return[args[0]/100*255,args[0]/100*255,args[0]/100*255]};convert.gray.hsl=function(args){
return[0,0,args[0]]};convert.gray.hsv=convert.gray.hsl;convert.gray.hwb=function(gray){
return[0,100,gray[0]]};convert.gray.cmyk=function(gray){return[0,0,0,gray[0]]};convert.
gray.lab=function(gray){return[gray[0],0,0]};convert.gray.hex=function(gray){let val=Math.
round(gray[0]/100*255)&255,string=((val<<16)+(val<<8)+val).toString(16).toUpperCase();
return"000000".substring(string.length)+string};convert.rgb.gray=function(rgb){return[
(rgb[0]+rgb[1]+rgb[2])/3/255*100]}}});var require_route=__commonJS({"node_modules/color-convert/route.js"(exports,module){
var conversions=require_conversions();function buildGraph(){let graph={},models=Object.
keys(conversions);for(let len=models.length,i=0;i<len;i++)graph[models[i]]={distance:-1,
parent:null};return graph}__name(buildGraph,"buildGraph");function deriveBFS(fromModel){
let graph=buildGraph(),queue=[fromModel];for(graph[fromModel].distance=0;queue.length;){
let current=queue.pop(),adjacents=Object.keys(conversions[current]);for(let len=adjacents.
length,i=0;i<len;i++){let adjacent=adjacents[i],node4=graph[adjacent];node4.distance===
-1&&(node4.distance=graph[current].distance+1,node4.parent=current,queue.unshift(
adjacent))}}return graph}__name(deriveBFS,"deriveBFS");function link(from3,to){return function(args){
return to(from3(args))}}__name(link,"link");function wrapConversion(toModel,graph){
let path=[graph[toModel].parent,toModel],fn=conversions[graph[toModel].parent][toModel],
cur=graph[toModel].parent;for(;graph[cur].parent;)path.unshift(graph[cur].parent),
fn=link(conversions[graph[cur].parent][cur],fn),cur=graph[cur].parent;return fn.
conversion=path,fn}__name(wrapConversion,"wrapConversion");module.exports=function(fromModel){
let graph=deriveBFS(fromModel),conversion={},models=Object.keys(graph);for(let len=models.
length,i=0;i<len;i++){let toModel=models[i];graph[toModel].parent!==null&&(conversion[toModel]=
wrapConversion(toModel,graph))}return conversion}}});var require_color_convert=__commonJS({"node_modules/color-convert/index.js"(exports,module){
var conversions=require_conversions(),route=require_route(),convert={},models=Object.
keys(conversions);function wrapRaw(fn){let wrappedFn=__name(function(...args){let arg0=args[0];
return arg0==null?arg0:(arg0.length>1&&(args=arg0),fn(args))},"wrappedFn");return"\
conversion"in fn&&(wrappedFn.conversion=fn.conversion),wrappedFn}__name(wrapRaw,
"wrapRaw");function wrapRounded(fn){let wrappedFn=__name(function(...args){let arg0=args[0];
if(arg0==null)return arg0;arg0.length>1&&(args=arg0);let result=fn(args);if(typeof result==
"object")for(let len=result.length,i=0;i<len;i++)result[i]=Math.round(result[i]);
return result},"wrappedFn");return"conversion"in fn&&(wrappedFn.conversion=fn.conversion),
wrappedFn}__name(wrapRounded,"wrapRounded");models.forEach(fromModel=>{convert[fromModel]=
{},Object.defineProperty(convert[fromModel],"channels",{value:conversions[fromModel].
channels}),Object.defineProperty(convert[fromModel],"labels",{value:conversions[fromModel].
labels});let routes=route(fromModel);Object.keys(routes).forEach(toModel=>{let fn=routes[toModel];
convert[fromModel][toModel]=wrapRounded(fn),convert[fromModel][toModel].raw=wrapRaw(
fn)})});module.exports=convert}});var require_color=__commonJS({"node_modules/color/index.js"(exports,module){var colorString=require_color_string(),
convert=require_color_convert(),skippedModels=["keyword","gray","hex"],hashedModelKeys={};
for(let model of Object.keys(convert))hashedModelKeys[[...convert[model].labels].
sort().join("")]=model;var limiters={};function Color12(object,model){if(!(this instanceof
Color12))return new Color12(object,model);if(model&&model in skippedModels&&(model=
null),model&&!(model in convert))throw new Error("Unknown model: "+model);let i,
channels;if(object==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(object instanceof
Color12)this.model=object.model,this.color=[...object.color],this.valpha=object.
valpha;else if(typeof object=="string"){let result=colorString.get(object);if(result===
null)throw new Error("Unable to parse color from string: "+object);this.model=result.
model,channels=convert[this.model].channels,this.color=result.value.slice(0,channels),
this.valpha=typeof result.value[channels]=="number"?result.value[channels]:1}else if(object.
length>0){this.model=model||"rgb",channels=convert[this.model].channels;let newArray=Array.
prototype.slice.call(object,0,channels);this.color=zeroArray(newArray,channels),
this.valpha=typeof object[channels]=="number"?object[channels]:1}else if(typeof object==
"number")this.model="rgb",this.color=[object>>16&255,object>>8&255,object&255],this.
valpha=1;else{this.valpha=1;let keys=Object.keys(object);"alpha"in object&&(keys.
splice(keys.indexOf("alpha"),1),this.valpha=typeof object.alpha=="number"?object.
alpha:0);let hashedKeys=keys.sort().join("");if(!(hashedKeys in hashedModelKeys))
throw new Error("Unable to parse color from object: "+JSON.stringify(object));this.
model=hashedModelKeys[hashedKeys];let{labels}=convert[this.model],color2=[];for(i=
0;i<labels.length;i++)color2.push(object[labels[i]]);this.color=zeroArray(color2)}
if(limiters[this.model])for(channels=convert[this.model].channels,i=0;i<channels;i++){
let limit=limiters[this.model][i];limit&&(this.color[i]=limit(this.color[i]))}this.
valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}__name(
Color12,"Color");Color12.prototype={toString(){return this.string()},toJSON(){return this[this.
model]()},string(places){let self=this.model in colorString.to?this:this.rgb();self=
self.round(typeof places=="number"?places:1);let args=self.valpha===1?self.color:
[...self.color,this.valpha];return colorString.to[self.model](args)},percentString(places){
let self=this.rgb().round(typeof places=="number"?places:1),args=self.valpha===1?
self.color:[...self.color,this.valpha];return colorString.to.rgb.percent(args)},
array(){return this.valpha===1?[...this.color]:[...this.color,this.valpha]},object(){
let result={},{channels}=convert[this.model],{labels}=convert[this.model];for(let i=0;i<
channels;i++)result[labels[i]]=this.color[i];return this.valpha!==1&&(result.alpha=
this.valpha),result},unitArray(){let rgb=this.rgb().color;return rgb[0]/=255,rgb[1]/=
255,rgb[2]/=255,this.valpha!==1&&rgb.push(this.valpha),rgb},unitObject(){let rgb=this.
rgb().object();return rgb.r/=255,rgb.g/=255,rgb.b/=255,this.valpha!==1&&(rgb.alpha=
this.valpha),rgb},round(places){return places=Math.max(places||0,0),new Color12(
[...this.color.map(roundToPlace(places)),this.valpha],this.model)},alpha(value){
return value!==void 0?new Color12([...this.color,Math.max(0,Math.min(1,value))],
this.model):this.valpha},red:getset("rgb",0,maxfn(255)),green:getset("rgb",1,maxfn(
255)),blue:getset("rgb",2,maxfn(255)),hue:getset(["hsl","hsv","hsl","hwb","hcg"],
0,value=>(value%360+360)%360),saturationl:getset("hsl",1,maxfn(100)),lightness:getset(
"hsl",2,maxfn(100)),saturationv:getset("hsv",1,maxfn(100)),value:getset("hsv",2,
maxfn(100)),chroma:getset("hcg",1,maxfn(100)),gray:getset("hcg",2,maxfn(100)),white:getset(
"hwb",1,maxfn(100)),wblack:getset("hwb",2,maxfn(100)),cyan:getset("cmyk",0,maxfn(
100)),magenta:getset("cmyk",1,maxfn(100)),yellow:getset("cmyk",2,maxfn(100)),black:getset(
"cmyk",3,maxfn(100)),x:getset("xyz",0,maxfn(95.047)),y:getset("xyz",1,maxfn(100)),
z:getset("xyz",2,maxfn(108.833)),l:getset("lab",0,maxfn(100)),a:getset("lab",1),
b:getset("lab",2),keyword(value){return value!==void 0?new Color12(value):convert[this.
model].keyword(this.color)},hex(value){return value!==void 0?new Color12(value):
colorString.to.hex(this.rgb().round().color)},hexa(value){if(value!==void 0)return new Color12(
value);let rgbArray=this.rgb().round().color,alphaHex=Math.round(this.valpha*255).
toString(16).toUpperCase();return alphaHex.length===1&&(alphaHex="0"+alphaHex),colorString.
to.hex(rgbArray)+alphaHex},rgbNumber(){let rgb=this.rgb().color;return(rgb[0]&255)<<
16|(rgb[1]&255)<<8|rgb[2]&255},luminosity(){let rgb=this.rgb().color,lum=[];for(let[
i,element]of rgb.entries()){let chan=element/255;lum[i]=chan<=.04045?chan/12.92:
((chan+.055)/1.055)**2.4}return .2126*lum[0]+.7152*lum[1]+.0722*lum[2]},contrast(color2){
let lum1=this.luminosity(),lum2=color2.luminosity();return lum1>lum2?(lum1+.05)/
(lum2+.05):(lum2+.05)/(lum1+.05)},level(color2){let contrastRatio=this.contrast(
color2);return contrastRatio>=7?"AAA":contrastRatio>=4.5?"AA":""},isDark(){let rgb=this.
rgb().color;return(rgb[0]*2126+rgb[1]*7152+rgb[2]*722)/1e4<128},isLight(){return!this.
isDark()},negate(){let rgb=this.rgb();for(let i=0;i<3;i++)rgb.color[i]=255-rgb.color[i];
return rgb},lighten(ratio){let hsl=this.hsl();return hsl.color[2]+=hsl.color[2]*
ratio,hsl},darken(ratio){let hsl=this.hsl();return hsl.color[2]-=hsl.color[2]*ratio,
hsl},saturate(ratio){let hsl=this.hsl();return hsl.color[1]+=hsl.color[1]*ratio,
hsl},desaturate(ratio){let hsl=this.hsl();return hsl.color[1]-=hsl.color[1]*ratio,
hsl},whiten(ratio){let hwb=this.hwb();return hwb.color[1]+=hwb.color[1]*ratio,hwb},
blacken(ratio){let hwb=this.hwb();return hwb.color[2]+=hwb.color[2]*ratio,hwb},grayscale(){
let rgb=this.rgb().color,value=rgb[0]*.3+rgb[1]*.59+rgb[2]*.11;return Color12.rgb(
value,value,value)},fade(ratio){return this.alpha(this.valpha-this.valpha*ratio)},
opaquer(ratio){return this.alpha(this.valpha+this.valpha*ratio)},rotate(degrees){
let hsl=this.hsl(),hue=hsl.color[0];return hue=(hue+degrees)%360,hue=hue<0?360+hue:
hue,hsl.color[0]=hue,hsl},mix(mixinColor,weight){if(!mixinColor||!mixinColor.rgb)
throw new Error('Argument to "mix" was not a Color instance, but rather an insta\
nce of '+typeof mixinColor);let color1=mixinColor.rgb(),color2=this.rgb(),p=weight===
void 0?.5:weight,w=2*p-1,a=color1.alpha()-color2.alpha(),w1=((w*a===-1?w:(w+a)/(1+
w*a))+1)/2,w2=1-w1;return Color12.rgb(w1*color1.red()+w2*color2.red(),w1*color1.
green()+w2*color2.green(),w1*color1.blue()+w2*color2.blue(),color1.alpha()*p+color2.
alpha()*(1-p))}};for(let model of Object.keys(convert)){if(skippedModels.includes(
model))continue;let{channels}=convert[model];Color12.prototype[model]=function(...args){
return this.model===model?new Color12(this):args.length>0?new Color12(args,model):
new Color12([...assertArray(convert[this.model][model].raw(this.color)),this.valpha],
model)},Color12[model]=function(...args){let color2=args[0];return typeof color2==
"number"&&(color2=zeroArray(args,channels)),new Color12(color2,model)}}function roundTo(number,places){
return Number(number.toFixed(places))}__name(roundTo,"roundTo");function roundToPlace(places){
return function(number){return roundTo(number,places)}}__name(roundToPlace,"roun\
dToPlace");function getset(model,channel,modifier){model=Array.isArray(model)?model:
[model];for(let m of model)(limiters[m]||(limiters[m]=[]))[channel]=modifier;return model=
model[0],function(value){let result;return value!==void 0?(modifier&&(value=modifier(
value)),result=this[model](),result.color[channel]=value,result):(result=this[model]().
color[channel],modifier&&(result=modifier(result)),result)}}__name(getset,"getse\
t");function maxfn(max){return function(v){return Math.max(0,Math.min(max,v))}}__name(
maxfn,"maxfn");function assertArray(value){return Array.isArray(value)?value:[value]}
__name(assertArray,"assertArray");function zeroArray(array,length3){for(let i=0;i<
length3;i++)typeof array[i]!="number"&&(array[i]=0);return array}__name(zeroArray,
"zeroArray");module.exports=Color12}});var import_core=__toESM(require_core(),1);var core_default=import_core.default;var IDENT_RE="[A-Za-z$_][0-9A-Za-z$_]*",KEYWORDS=["as","in","of","if","for","whi\
le","finally","var","new","function","do","return","void","else","break","catch",
"instanceof","with","throw","case","default","try","switch","continue","typeof",
"delete","let","yield","const","class","debugger","async","await","static","impo\
rt","from","export","extends"],LITERALS=["true","false","null","undefined","NaN",
"Infinity"],TYPES=["Object","Function","Boolean","Symbol","Math","Date","Number",
"BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Ui\
nt8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Arr\
ay","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffe\
r","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","Genera\
torFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],ERROR_TYPES=[
"Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError",
"TypeError","URIError"],BUILT_IN_GLOBALS=["setInterval","setTimeout","clearInter\
val","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","\
parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","esc\
ape","unescape"],BUILT_IN_VARIABLES=["arguments","this","super","console","windo\
w","document","localStorage","sessionStorage","module","global"],BUILT_INS=[].concat(
BUILT_IN_GLOBALS,TYPES,ERROR_TYPES);function javascript(hljs){let regex=hljs.regex,
hasClosingTag=__name((match2,{after})=>{let tag2="</"+match2[0].slice(1);return match2.
input.indexOf(tag2,after)!==-1},"hasClosingTag"),IDENT_RE$1=IDENT_RE,FRAGMENT={begin:"\
<>",end:"</>"},XML_SELF_CLOSING=/<[A-Za-z0-9\\._:-]+\s*\/>/,XML_TAG={begin:/<[A-Za-z0-9\\._:-]+/,
end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(match2,response)=>{let afterMatchIndex=match2[0].
length+match2.index,nextChar=match2.input[afterMatchIndex];if(nextChar==="<"||nextChar===
","){response.ignoreMatch();return}nextChar===">"&&(hasClosingTag(match2,{after:afterMatchIndex})||
response.ignoreMatch());let m,afterMatch=match2.input.substring(afterMatchIndex);
if(m=afterMatch.match(/^\s*=/)){response.ignoreMatch();return}if((m=afterMatch.match(
/^\s+extends\s+/))&&m.index===0){response.ignoreMatch();return}}},KEYWORDS$1={$pattern:IDENT_RE,
keyword:KEYWORDS,literal:LITERALS,built_in:BUILT_INS,"variable.language":BUILT_IN_VARIABLES},
decimalDigits="[0-9](_?[0-9])*",frac=`\\.(${decimalDigits})`,decimalInteger="0|[\
1-9](_?[0-9])*|0[0-7]*[89][0-9]*",NUMBER={className:"number",variants:[{begin:`(\
\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b`},
{begin:`\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b`},{begin:"\\b(0\
|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\
\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b\
0[0-7]+n?\\b"}],relevance:0},SUBST={className:"subst",begin:"\\$\\{",end:"\\}",keywords:KEYWORDS$1,
contains:[]},HTML_TEMPLATE={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[
hljs.BACKSLASH_ESCAPE,SUBST],subLanguage:"xml"}},CSS_TEMPLATE={begin:"css`",end:"",
starts:{end:"`",returnEnd:!1,contains:[hljs.BACKSLASH_ESCAPE,SUBST],subLanguage:"\
css"}},GRAPHQL_TEMPLATE={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[
hljs.BACKSLASH_ESCAPE,SUBST],subLanguage:"graphql"}},TEMPLATE_STRING={className:"\
string",begin:"`",end:"`",contains:[hljs.BACKSLASH_ESCAPE,SUBST]},COMMENT3={className:"\
comment",variants:[hljs.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"\
(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"\
type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"\
variable",begin:IDENT_RE$1+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,
relevance:0}]}]}),hljs.C_BLOCK_COMMENT_MODE,hljs.C_LINE_COMMENT_MODE]},SUBST_INTERNALS=[
hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,HTML_TEMPLATE,CSS_TEMPLATE,GRAPHQL_TEMPLATE,
TEMPLATE_STRING,{match:/\$\d+/},NUMBER];SUBST.contains=SUBST_INTERNALS.concat({begin:/\{/,
end:/\}/,keywords:KEYWORDS$1,contains:["self"].concat(SUBST_INTERNALS)});let SUBST_AND_COMMENTS=[].
concat(COMMENT3,SUBST.contains),PARAMS_CONTAINS=SUBST_AND_COMMENTS.concat([{begin:/\(/,
end:/\)/,keywords:KEYWORDS$1,contains:["self"].concat(SUBST_AND_COMMENTS)}]),PARAMS={
className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:KEYWORDS$1,
contains:PARAMS_CONTAINS},CLASS_OR_EXTENDS={variants:[{match:[/class/,/\s+/,IDENT_RE$1,
/\s+/,/extends/,/\s+/,regex.concat(IDENT_RE$1,"(",regex.concat(/\./,IDENT_RE$1),
")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},
{match:[/class/,/\s+/,IDENT_RE$1],scope:{1:"keyword",3:"title.class"}}]},CLASS_REFERENCE={
relevance:0,match:regex.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{
_:[...TYPES,...ERROR_TYPES]}},USE_STRICT={label:"use_strict",className:"meta",relevance:10,
begin:/^\s*['"]use (strict|asm)['"]/},FUNCTION_DEFINITION={variants:[{match:[/function/,
/\s+/,IDENT_RE$1,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"k\
eyword",3:"title.function"},label:"func.def",contains:[PARAMS],illegal:/%/},UPPER_CASE_CONSTANT={
relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function noneOf(list){
return regex.concat("(?!",list.join("|"),")")}__name(noneOf,"noneOf");let FUNCTION_CALL={
match:regex.concat(/\b/,noneOf([...BUILT_IN_GLOBALS,"super","import"]),IDENT_RE$1,
regex.lookahead(/\(/)),className:"title.function",relevance:0},PROPERTY_ACCESS={
begin:regex.concat(/\./,regex.lookahead(regex.concat(IDENT_RE$1,/(?![0-9A-Za-z$_(])/))),
end:IDENT_RE$1,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},
GETTER_OR_SETTER={match:[/get|set/,/\s+/,IDENT_RE$1,/(?=\()/],className:{1:"keyw\
ord",3:"title.function"},contains:[{begin:/\(\)/},PARAMS]},FUNC_LEAD_IN_RE="(\\([\
^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+hljs.UNDERSCORE_IDENT_RE+")\
\\s*=>",FUNCTION_VARIABLE={match:[/const|var|let/,/\s+/,IDENT_RE$1,/\s*/,/=\s*/,
/(async\s*)?/,regex.lookahead(FUNC_LEAD_IN_RE)],keywords:"async",className:{1:"k\
eyword",3:"title.function"},contains:[PARAMS]};return{name:"JavaScript",aliases:[
"js","jsx","mjs","cjs"],keywords:KEYWORDS$1,exports:{PARAMS_CONTAINS,CLASS_REFERENCE},
illegal:/#(?![$_A-z])/,contains:[hljs.SHEBANG({label:"shebang",binary:"node",relevance:5}),
USE_STRICT,hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,HTML_TEMPLATE,CSS_TEMPLATE,
GRAPHQL_TEMPLATE,TEMPLATE_STRING,COMMENT3,{match:/\$\d+/},NUMBER,CLASS_REFERENCE,
{className:"attr",begin:IDENT_RE$1+regex.lookahead(":"),relevance:0},FUNCTION_VARIABLE,
{begin:"("+hljs.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"retur\
n throw case",relevance:0,contains:[COMMENT3,hljs.REGEXP_MODE,{className:"functi\
on",begin:FUNC_LEAD_IN_RE,returnBegin:!0,end:"\\s*=>",contains:[{className:"para\
ms",variants:[{begin:hljs.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,
skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:KEYWORDS$1,
contains:PARAMS_CONTAINS}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},
{variants:[{begin:FRAGMENT.begin,end:FRAGMENT.end},{match:XML_SELF_CLOSING},{begin:XML_TAG.
begin,"on:begin":XML_TAG.isTrulyOpeningTag,end:XML_TAG.end}],subLanguage:"xml",contains:[
{begin:XML_TAG.begin,end:XML_TAG.end,skip:!0,contains:["self"]}]}]},FUNCTION_DEFINITION,
{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+hljs.UNDERSCORE_IDENT_RE+
"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"\
func.def",contains:[PARAMS,hljs.inherit(hljs.TITLE_MODE,{begin:IDENT_RE$1,className:"\
title.function"})]},{match:/\.\.\./,relevance:0},PROPERTY_ACCESS,{match:"\\$"+IDENT_RE$1,
relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[
PARAMS]},FUNCTION_CALL,UPPER_CASE_CONSTANT,CLASS_OR_EXTENDS,GETTER_OR_SETTER,{match:/\$[(.]/}]}}
__name(javascript,"javascript");var IDENT_RE2="[A-Za-z$_][0-9A-Za-z$_]*",KEYWORDS2=["as","in","of","if","for","w\
hile","finally","var","new","function","do","return","void","else","break","catc\
h","instanceof","with","throw","case","default","try","switch","continue","typeo\
f","delete","let","yield","const","class","debugger","async","await","static","i\
mport","from","export","extends"],LITERALS2=["true","false","null","undefined","\
NaN","Infinity"],TYPES2=["Object","Function","Boolean","Symbol","Math","Date","N\
umber","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Arr\
ay","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Ui\
nt32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","Arr\
ayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator",
"GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],ERROR_TYPES2=[
"Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError",
"TypeError","URIError"],BUILT_IN_GLOBALS2=["setInterval","setTimeout","clearInte\
rval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat",
"parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","es\
cape","unescape"],BUILT_IN_VARIABLES2=["arguments","this","super","console","win\
dow","document","localStorage","sessionStorage","module","global"],BUILT_INS2=[].
concat(BUILT_IN_GLOBALS2,TYPES2,ERROR_TYPES2);function javascript2(hljs){let regex=hljs.
regex,hasClosingTag=__name((match2,{after})=>{let tag2="</"+match2[0].slice(1);return match2.
input.indexOf(tag2,after)!==-1},"hasClosingTag"),IDENT_RE$1=IDENT_RE2,FRAGMENT={
begin:"<>",end:"</>"},XML_SELF_CLOSING=/<[A-Za-z0-9\\._:-]+\s*\/>/,XML_TAG={begin:/<[A-Za-z0-9\\._:-]+/,
end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(match2,response)=>{let afterMatchIndex=match2[0].
length+match2.index,nextChar=match2.input[afterMatchIndex];if(nextChar==="<"||nextChar===
","){response.ignoreMatch();return}nextChar===">"&&(hasClosingTag(match2,{after:afterMatchIndex})||
response.ignoreMatch());let m,afterMatch=match2.input.substring(afterMatchIndex);
if(m=afterMatch.match(/^\s*=/)){response.ignoreMatch();return}if((m=afterMatch.match(
/^\s+extends\s+/))&&m.index===0){response.ignoreMatch();return}}},KEYWORDS$1={$pattern:IDENT_RE2,
keyword:KEYWORDS2,literal:LITERALS2,built_in:BUILT_INS2,"variable.language":BUILT_IN_VARIABLES2},
decimalDigits="[0-9](_?[0-9])*",frac=`\\.(${decimalDigits})`,decimalInteger="0|[\
1-9](_?[0-9])*|0[0-7]*[89][0-9]*",NUMBER={className:"number",variants:[{begin:`(\
\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b`},
{begin:`\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b`},{begin:"\\b(0\
|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\
\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b\
0[0-7]+n?\\b"}],relevance:0},SUBST={className:"subst",begin:"\\$\\{",end:"\\}",keywords:KEYWORDS$1,
contains:[]},HTML_TEMPLATE={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[
hljs.BACKSLASH_ESCAPE,SUBST],subLanguage:"xml"}},CSS_TEMPLATE={begin:"css`",end:"",
starts:{end:"`",returnEnd:!1,contains:[hljs.BACKSLASH_ESCAPE,SUBST],subLanguage:"\
css"}},GRAPHQL_TEMPLATE={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[
hljs.BACKSLASH_ESCAPE,SUBST],subLanguage:"graphql"}},TEMPLATE_STRING={className:"\
string",begin:"`",end:"`",contains:[hljs.BACKSLASH_ESCAPE,SUBST]},COMMENT3={className:"\
comment",variants:[hljs.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"\
(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"\
type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"\
variable",begin:IDENT_RE$1+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,
relevance:0}]}]}),hljs.C_BLOCK_COMMENT_MODE,hljs.C_LINE_COMMENT_MODE]},SUBST_INTERNALS=[
hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,HTML_TEMPLATE,CSS_TEMPLATE,GRAPHQL_TEMPLATE,
TEMPLATE_STRING,{match:/\$\d+/},NUMBER];SUBST.contains=SUBST_INTERNALS.concat({begin:/\{/,
end:/\}/,keywords:KEYWORDS$1,contains:["self"].concat(SUBST_INTERNALS)});let SUBST_AND_COMMENTS=[].
concat(COMMENT3,SUBST.contains),PARAMS_CONTAINS=SUBST_AND_COMMENTS.concat([{begin:/\(/,
end:/\)/,keywords:KEYWORDS$1,contains:["self"].concat(SUBST_AND_COMMENTS)}]),PARAMS={
className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:KEYWORDS$1,
contains:PARAMS_CONTAINS},CLASS_OR_EXTENDS={variants:[{match:[/class/,/\s+/,IDENT_RE$1,
/\s+/,/extends/,/\s+/,regex.concat(IDENT_RE$1,"(",regex.concat(/\./,IDENT_RE$1),
")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},
{match:[/class/,/\s+/,IDENT_RE$1],scope:{1:"keyword",3:"title.class"}}]},CLASS_REFERENCE={
relevance:0,match:regex.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{
_:[...TYPES2,...ERROR_TYPES2]}},USE_STRICT={label:"use_strict",className:"meta",
relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},FUNCTION_DEFINITION={variants:[
{match:[/function/,/\s+/,IDENT_RE$1,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],
className:{1:"keyword",3:"title.function"},label:"func.def",contains:[PARAMS],illegal:/%/},
UPPER_CASE_CONSTANT={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable\
.constant"};function noneOf(list){return regex.concat("(?!",list.join("|"),")")}
__name(noneOf,"noneOf");let FUNCTION_CALL={match:regex.concat(/\b/,noneOf([...BUILT_IN_GLOBALS2,
"super","import"]),IDENT_RE$1,regex.lookahead(/\(/)),className:"title.function",
relevance:0},PROPERTY_ACCESS={begin:regex.concat(/\./,regex.lookahead(regex.concat(
IDENT_RE$1,/(?![0-9A-Za-z$_(])/))),end:IDENT_RE$1,excludeBegin:!0,keywords:"prot\
otype",className:"property",relevance:0},GETTER_OR_SETTER={match:[/get|set/,/\s+/,
IDENT_RE$1,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},
PARAMS]},FUNC_LEAD_IN_RE="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+
hljs.UNDERSCORE_IDENT_RE+")\\s*=>",FUNCTION_VARIABLE={match:[/const|var|let/,/\s+/,
IDENT_RE$1,/\s*/,/=\s*/,/(async\s*)?/,regex.lookahead(FUNC_LEAD_IN_RE)],keywords:"\
async",className:{1:"keyword",3:"title.function"},contains:[PARAMS]};return{name:"\
JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:KEYWORDS$1,exports:{PARAMS_CONTAINS,
CLASS_REFERENCE},illegal:/#(?![$_A-z])/,contains:[hljs.SHEBANG({label:"shebang",
binary:"node",relevance:5}),USE_STRICT,hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,
HTML_TEMPLATE,CSS_TEMPLATE,GRAPHQL_TEMPLATE,TEMPLATE_STRING,COMMENT3,{match:/\$\d+/},
NUMBER,CLASS_REFERENCE,{className:"attr",begin:IDENT_RE$1+regex.lookahead(":"),relevance:0},
FUNCTION_VARIABLE,{begin:"("+hljs.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",
keywords:"return throw case",relevance:0,contains:[COMMENT3,hljs.REGEXP_MODE,{className:"\
function",begin:FUNC_LEAD_IN_RE,returnBegin:!0,end:"\\s*=>",contains:[{className:"\
params",variants:[{begin:hljs.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,
skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:KEYWORDS$1,
contains:PARAMS_CONTAINS}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},
{variants:[{begin:FRAGMENT.begin,end:FRAGMENT.end},{match:XML_SELF_CLOSING},{begin:XML_TAG.
begin,"on:begin":XML_TAG.isTrulyOpeningTag,end:XML_TAG.end}],subLanguage:"xml",contains:[
{begin:XML_TAG.begin,end:XML_TAG.end,skip:!0,contains:["self"]}]}]},FUNCTION_DEFINITION,
{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+hljs.UNDERSCORE_IDENT_RE+
"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"\
func.def",contains:[PARAMS,hljs.inherit(hljs.TITLE_MODE,{begin:IDENT_RE$1,className:"\
title.function"})]},{match:/\.\.\./,relevance:0},PROPERTY_ACCESS,{match:"\\$"+IDENT_RE$1,
relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[
PARAMS]},FUNCTION_CALL,UPPER_CASE_CONSTANT,CLASS_OR_EXTENDS,GETTER_OR_SETTER,{match:/\$[(.]/}]}}
__name(javascript2,"javascript");function typescript(hljs){let tsLanguage=javascript2(
hljs),IDENT_RE$1=IDENT_RE2,TYPES3=["any","void","number","boolean","string","obj\
ect","never","symbol","bigint","unknown"],NAMESPACE={beginKeywords:"namespace",end:/\{/,
excludeEnd:!0,contains:[tsLanguage.exports.CLASS_REFERENCE]},INTERFACE={beginKeywords:"\
interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:TYPES3},
contains:[tsLanguage.exports.CLASS_REFERENCE]},USE_STRICT={className:"meta",relevance:10,
begin:/^\s*['"]use strict['"]/},TS_SPECIFIC_KEYWORDS=["type","namespace","interf\
ace","public","private","protected","implements","declare","abstract","readonly",
"enum","override"],KEYWORDS$1={$pattern:IDENT_RE2,keyword:KEYWORDS2.concat(TS_SPECIFIC_KEYWORDS),
literal:LITERALS2,built_in:BUILT_INS2.concat(TYPES3),"variable.language":BUILT_IN_VARIABLES2},
DECORATOR={className:"meta",begin:"@"+IDENT_RE$1},swapMode=__name((mode,label,replacement)=>{
let indx=mode.contains.findIndex(m=>m.label===label);if(indx===-1)throw new Error(
"can not find mode to replace");mode.contains.splice(indx,1,replacement)},"swapM\
ode");Object.assign(tsLanguage.keywords,KEYWORDS$1),tsLanguage.exports.PARAMS_CONTAINS.
push(DECORATOR),tsLanguage.contains=tsLanguage.contains.concat([DECORATOR,NAMESPACE,
INTERFACE]),swapMode(tsLanguage,"shebang",hljs.SHEBANG()),swapMode(tsLanguage,"u\
se_strict",USE_STRICT);let functionDeclaration=tsLanguage.contains.find(m=>m.label===
"func.def");return functionDeclaration.relevance=0,Object.assign(tsLanguage,{name:"\
TypeScript",aliases:["ts","tsx","mts","cts"]}),tsLanguage}__name(typescript,"typ\
escript");function xml(hljs){let regex=hljs.regex,TAG_NAME_RE=regex.concat(/[\p{L}_]/u,regex.
optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),XML_IDENT_RE=/[\p{L}0-9._:-]+/u,
XML_ENTITIES={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},XML_META_KEYWORDS={
begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},
XML_META_PAR_KEYWORDS=hljs.inherit(XML_META_KEYWORDS,{begin:/\(/,end:/\)/}),APOS_META_STRING_MODE=hljs.
inherit(hljs.APOS_STRING_MODE,{className:"string"}),QUOTE_META_STRING_MODE=hljs.
inherit(hljs.QUOTE_STRING_MODE,{className:"string"}),TAG_INTERNALS={endsWithParent:!0,
illegal:/</,relevance:0,contains:[{className:"attr",begin:XML_IDENT_RE,relevance:0},
{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[
{begin:/"/,end:/"/,contains:[XML_ENTITIES]},{begin:/'/,end:/'/,contains:[XML_ENTITIES]},
{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rs\
s","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,
contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[XML_META_KEYWORDS,
QUOTE_META_STRING_MODE,APOS_META_STRING_MODE,XML_META_PAR_KEYWORDS,{begin:/\[/,end:/\]/,
contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[XML_META_KEYWORDS,
XML_META_PAR_KEYWORDS,QUOTE_META_STRING_MODE,APOS_META_STRING_MODE]}]}]},hljs.COMMENT(
/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},XML_ENTITIES,
{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[QUOTE_META_STRING_MODE]},
{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{
name:"style"},contains:[TAG_INTERNALS],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:[
"css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"\
script"},contains:[TAG_INTERNALS],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:[
"javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"\
tag",begin:regex.concat(/</,regex.lookahead(regex.concat(TAG_NAME_RE,regex.either(
/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:TAG_NAME_RE,relevance:0,
starts:TAG_INTERNALS}]},{className:"tag",begin:regex.concat(/<\//,regex.lookahead(
regex.concat(TAG_NAME_RE,/>/))),contains:[{className:"name",begin:TAG_NAME_RE,relevance:0},
{begin:/>/,relevance:0,endsParent:!0}]}]}}__name(xml,"xml");function shell(hljs){return{name:"Shell Session",aliases:["console","shellsessio\
n"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}__name(shell,"shell");var MODES=__name(hljs=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:hljs.
C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},
FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{
scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[hljs.APOS_STRING_MODE,
hljs.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:hljs.NUMBER_RE+"(\
%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|d\
pi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),
"MODES"),TAGS=["a","abbr","address","article","aside","audio","b","blockquote","\
body","button","canvas","caption","cite","code","dd","del","details","dfn","div",
"dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","\
h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","l\
abel","legend","li","main","mark","menu","nav","object","ol","p","q","quote","sa\
mp","section","span","strong","summary","sup","table","tbody","td","textarea","t\
foot","th","thead","time","tr","ul","var","video"],MEDIA_FEATURES=["any-hover","\
any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-r\
atio","device-height","device-width","display-mode","forced-colors","grid","heig\
ht","hover","inverted-colors","monochrome","orientation","overflow-block","overf\
low-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced\
-motion","prefers-reduced-transparency","resolution","scan","scripting","update",
"width","min-width","max-width","min-height","max-height"],PSEUDO_CLASSES=["acti\
ve","any-link","blank","checked","current","default","defined","dir","disabled",
"drop","empty","enabled","first","first-child","first-of-type","fullscreen","fut\
ure","focus","focus-visible","focus-within","has","host","host-context","hover",
"indeterminate","in-range","invalid","is","lang","last-child","last-of-type","le\
ft","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-c\
ol","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out\
-of-range","past","placeholder-shown","read-only","read-write","required","right",
"root","scope","target","target-within","user-invalid","valid","visited","where"],
PSEUDO_ELEMENTS=["after","backdrop","before","cue","cue-region","first-letter","\
first-line","grammar-error","marker","part","placeholder","selection","slotted",
"spelling-error"],ATTRIBUTES=["align-content","align-items","align-self","all","\
animation","animation-delay","animation-direction","animation-duration","animati\
on-fill-mode","animation-iteration-count","animation-name","animation-play-state",
"animation-timing-function","backface-visibility","background","background-attac\
hment","background-blend-mode","background-clip","background-color","background-\
image","background-origin","background-position","background-repeat","background\
-size","block-size","border","border-block","border-block-color","border-block-e\
nd","border-block-end-color","border-block-end-style","border-block-end-width","\
border-block-start","border-block-start-color","border-block-start-style","borde\
r-block-start-width","border-block-style","border-block-width","border-bottom","\
border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","b\
order-bottom-style","border-bottom-width","border-collapse","border-color","bord\
er-image","border-image-outset","border-image-repeat","border-image-slice","bord\
er-image-source","border-image-width","border-inline","border-inline-color","bor\
der-inline-end","border-inline-end-color","border-inline-end-style","border-inli\
ne-end-width","border-inline-start","border-inline-start-color","border-inline-s\
tart-style","border-inline-start-width","border-inline-style","border-inline-wid\
th","border-left","border-left-color","border-left-style","border-left-width","b\
order-radius","border-right","border-right-color","border-right-style","border-r\
ight-width","border-spacing","border-style","border-top","border-top-color","bor\
der-top-left-radius","border-top-right-radius","border-top-style","border-top-wi\
dth","border-width","bottom","box-decoration-break","box-shadow","box-sizing","b\
reak-after","break-before","break-inside","caption-side","caret-color","clear","\
clip","clip-path","clip-rule","color","column-count","column-fill","column-gap",
"column-rule","column-rule-color","column-rule-style","column-rule-width","colum\
n-span","column-width","columns","contain","content","content-visibility","count\
er-increment","counter-reset","cue","cue-after","cue-before","cursor","direction",
"display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow",
"flex-grow","flex-shrink","flex-wrap","float","flow","font","font-display","font\
-family","font-feature-settings","font-kerning","font-language-override","font-s\
ize","font-size-adjust","font-smoothing","font-stretch","font-style","font-synth\
esis","font-variant","font-variant-caps","font-variant-east-asian","font-variant\
-ligatures","font-variant-numeric","font-variant-position","font-variation-setti\
ngs","font-weight","gap","glyph-orientation-vertical","grid","grid-area","grid-a\
uto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","\
grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-t\
emplate","grid-template-areas","grid-template-columns","grid-template-rows","han\
ging-punctuation","height","hyphens","icon","image-orientation","image-rendering",
"image-resolution","ime-mode","inline-size","isolation","justify-content","left",
"letter-spacing","line-break","line-height","list-style","list-style-image","lis\
t-style-position","list-style-type","margin","margin-block","margin-block-end","\
margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-\
inline-start","margin-left","margin-right","margin-top","marks","mask","mask-bor\
der","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-s\
lice","mask-border-source","mask-border-width","mask-clip","mask-composite","mas\
k-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","ma\
sk-type","max-block-size","max-height","max-inline-size","max-width","min-block-\
size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","na\
v-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-po\
sition","opacity","order","orphans","outline","outline-color","outline-offset","\
outline-style","outline-width","overflow","overflow-wrap","overflow-x","overflow\
-y","padding","padding-block","padding-block-end","padding-block-start","padding\
-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-l\
eft","padding-right","padding-top","page-break-after","page-break-before","page-\
break-inside","pause","pause-after","pause-before","perspective","perspective-or\
igin","pointer-events","position","quotes","resize","rest","rest-after","rest-be\
fore","right","row-gap","scroll-margin","scroll-margin-block","scroll-margin-blo\
ck-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline",
"scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","sc\
roll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","\
scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","\
scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start",
"scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-a\
lign","scroll-snap-stop","scroll-snap-type","scrollbar-color","scrollbar-gutter",
"scrollbar-width","shape-image-threshold","shape-margin","shape-outside","speak",
"speak-as","src","tab-size","table-layout","text-align","text-align-all","text-a\
lign-last","text-combine-upright","text-decoration","text-decoration-color","tex\
t-decoration-line","text-decoration-style","text-emphasis","text-emphasis-color",
"text-emphasis-position","text-emphasis-style","text-indent","text-justify","tex\
t-orientation","text-overflow","text-rendering","text-shadow","text-transform","\
text-underline-position","top","transform","transform-box","transform-origin","t\
ransform-style","transition","transition-delay","transition-duration","transitio\
n-property","transition-timing-function","unicode-bidi","vertical-align","visibi\
lity","voice-balance","voice-duration","voice-family","voice-pitch","voice-range",
"voice-rate","voice-stress","voice-volume","white-space","widows","width","will-\
change","word-break","word-spacing","word-wrap","writing-mode","z-index"].reverse();
function css(hljs){let regex=hljs.regex,modes=MODES(hljs),VENDOR_PREFIX={begin:/-(webkit|moz|ms|o)-(?=[a-z])/},
AT_MODIFIERS="and or not only",AT_PROPERTY_RE=/@-?\w[\w]*(-\w+)*/,IDENT_RE3="[a-\
zA-Z-][a-zA-Z0-9_-]*",STRINGS=[hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE];return{
name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"fro\
m to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[modes.BLOCK_COMMENT,
VENDOR_PREFIX,modes.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,
relevance:0},{className:"selector-class",begin:"\\."+IDENT_RE3,relevance:0},modes.
ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+PSEUDO_CLASSES.
join("|")+")"},{begin:":(:)?("+PSEUDO_ELEMENTS.join("|")+")"}]},modes.CSS_VARIABLE,
{className:"attribute",begin:"\\b("+ATTRIBUTES.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,
contains:[modes.BLOCK_COMMENT,modes.HEXCOLOR,modes.IMPORTANT,modes.CSS_NUMBER_MODE,
...STRINGS,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"ur\
l data-uri"},contains:[...STRINGS,{className:"string",begin:/[^)]/,endsWithParent:!0,
excludeEnd:!0}]},modes.FUNCTION_DISPATCH]},{begin:regex.lookahead(/@/),end:"[{;]",
relevance:0,illegal:/:/,contains:[{className:"keyword",begin:AT_PROPERTY_RE},{begin:/\s/,
endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:AT_MODIFIERS,
attribute:MEDIA_FEATURES.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"a\
ttribute"},...STRINGS,modes.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\
\\b("+TAGS.join("|")+")\\b"}]}}__name(css,"css");function baseLib(){core_default.registerLanguage("javascript",javascript),core_default.
registerLanguage("typescript",typescript),core_default.registerLanguage("html",xml),
core_default.registerLanguage("shell",shell),core_default.registerLanguage("css",
css),core_default.highlightAll()}__name(baseLib,"baseLib");function sheetForTag(tag2){if(tag2.sheet)return tag2.sheet;for(var i=0;i<document.
styleSheets.length;i++)if(document.styleSheets[i].ownerNode===tag2)return document.
styleSheets[i]}__name(sheetForTag,"sheetForTag");function createStyleElement(options){
var tag2=document.createElement("style");return tag2.setAttribute("data-emotion",
options.key),options.nonce!==void 0&&tag2.setAttribute("nonce",options.nonce),tag2.
appendChild(document.createTextNode("")),tag2.setAttribute("data-s",""),tag2}__name(
createStyleElement,"createStyleElement");var StyleSheet=function(){function StyleSheet2(options){
var _this=this;this._insertTag=function(tag2){var before;_this.tags.length===0?_this.
insertionPoint?before=_this.insertionPoint.nextSibling:_this.prepend?before=_this.
container.firstChild:before=_this.before:before=_this.tags[_this.tags.length-1].
nextSibling,_this.container.insertBefore(tag2,before),_this.tags.push(tag2)},this.
isSpeedy=options.speedy===void 0?!1:options.speedy,this.tags=[],this.ctr=0,this.
nonce=options.nonce,this.key=options.key,this.container=options.container,this.prepend=
options.prepend,this.insertionPoint=options.insertionPoint,this.before=null}__name(
StyleSheet2,"StyleSheet");var _proto=StyleSheet2.prototype;return _proto.hydrate=
__name(function(nodes){nodes.forEach(this._insertTag)},"hydrate"),_proto.insert=
__name(function(rule){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(createStyleElement(
this));var tag2=this.tags[this.tags.length-1],isImportRule3=rule.charCodeAt(0)===
64&&rule.charCodeAt(1)===105;if(isImportRule3&&this._alreadyInsertedOrderInsensitiveRule&&
console.error(`You're attempting to insert the following rule:
`+rule+"\n\n`@import` rules must be before all other types of rules in a styleshee\
t but other rules have already been inserted. Please ensure that `@import` rules\
 are before all other rules."),this._alreadyInsertedOrderInsensitiveRule=this._alreadyInsertedOrderInsensitiveRule||
!isImportRule3,this.isSpeedy){var sheet2=sheetForTag(tag2);try{sheet2.insertRule(
rule,sheet2.cssRules.length)}catch(e){/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.
test(rule)||console.error('There was a problem inserting the following rule: "'+
rule+'"',e)}}else tag2.appendChild(document.createTextNode(rule));this.ctr++},"i\
nsert"),_proto.flush=__name(function(){this.tags.forEach(function(tag2){return tag2.
parentNode&&tag2.parentNode.removeChild(tag2)}),this.tags=[],this.ctr=0,this._alreadyInsertedOrderInsensitiveRule=
!1},"flush"),StyleSheet2}();var MS="-ms-",MOZ="-moz-",WEBKIT="-webkit-",COMMENT="comm",RULESET="rule",DECLARATION="\
decl";var IMPORT="@import";var KEYFRAMES="@keyframes";var LAYER="@layer";var abs=Math.abs,from=String.fromCharCode,assign=Object.assign;function hash(value,length3){
return charat(value,0)^45?(((length3<<2^charat(value,0))<<2^charat(value,1))<<2^
charat(value,2))<<2^charat(value,3):0}__name(hash,"hash");function trim(value){return value.
trim()}__name(trim,"trim");function match(value,pattern){return(value=pattern.exec(
value))?value[0]:value}__name(match,"match");function replace(value,pattern,replacement){
return value.replace(pattern,replacement)}__name(replace,"replace");function indexof(value,search){
return value.indexOf(search)}__name(indexof,"indexof");function charat(value,index){
return value.charCodeAt(index)|0}__name(charat,"charat");function substr(value,begin,end){
return value.slice(begin,end)}__name(substr,"substr");function strlen(value){return value.
length}__name(strlen,"strlen");function sizeof(value){return value.length}__name(
sizeof,"sizeof");function append(value,array){return array.push(value),value}__name(
append,"append");function combine(array,callback){return array.map(callback).join(
"")}__name(combine,"combine");var line=1,column=1,length=0,position=0,character=0,characters="";function node(value,root,parent,type,props,children,length3){
return{value,root,parent,type,props,children,line,column,length:length3,return:""}}
__name(node,"node");function copy(root,props){return assign(node("",null,null,"",
null,null,0),root,{length:-root.length},props)}__name(copy,"copy");function char(){
return character}__name(char,"char");function prev(){return character=position>0?
charat(characters,--position):0,column--,character===10&&(column=1,line--),character}
__name(prev,"prev");function next(){return character=position<length?charat(characters,
position++):0,column++,character===10&&(column=1,line++),character}__name(next,"\
next");function peek(){return charat(characters,position)}__name(peek,"peek");function caret(){
return position}__name(caret,"caret");function slice(begin,end){return substr(characters,
begin,end)}__name(slice,"slice");function token(type){switch(type){case 0:case 9:case 10:case 13:case 32:
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
for(var index=0,offset=0,length3=pseudo,atrule=0,property=0,previous=0,variable=1,
scanning=1,ampersand=1,character3=0,type="",props=rules,children=rulesets,reference=rule,
characters3=type;scanning;)switch(previous=character3,character3=next()){case 40:
if(previous!=108&&charat(characters3,length3-1)==58){indexof(characters3+=replace(
delimit(character3),"&","&\f"),"&\f")!=-1&&(ampersand=-1);break}case 34:case 39:case 91:
characters3+=delimit(character3);break;case 9:case 10:case 13:case 32:characters3+=
whitespace(previous);break;case 92:characters3+=escaping(caret()-1,7);continue;case 47:
switch(peek()){case 42:case 47:append(comment(commenter(next(),caret()),root,parent),
declarations);break;default:characters3+="/"}break;case 123*variable:points[index++]=
strlen(characters3)*ampersand;case 125*variable:case 59:case 0:switch(character3){case 0:case 125:
scanning=0;case 59+offset:ampersand==-1&&(characters3=replace(characters3,/\f/g,
"")),property>0&&strlen(characters3)-length3&&append(property>32?declaration(characters3+
";",rule,parent,length3-1):declaration(replace(characters3," ","")+";",rule,parent,
length3-2),declarations);break;case 59:characters3+=";";default:if(append(reference=
ruleset(characters3,root,parent,index,offset,rules,points,type,props=[],children=
[],length3),rulesets),character3===123)if(offset===0)parse(characters3,root,reference,
reference,props,rulesets,length3,points,children);else switch(atrule===99&&charat(
characters3,3)===110?100:atrule){case 100:case 108:case 109:case 115:parse(value,
reference,reference,rule&&append(ruleset(value,reference,reference,0,0,rules,points,
type,rules,props=[],length3),children),rules,children,length3,points,rule?props:
children);break;default:parse(characters3,reference,reference,reference,[""],children,
0,points,children)}}index=offset=property=0,variable=ampersand=1,type=characters3=
"",length3=pseudo;break;case 58:length3=1+strlen(characters3),property=previous;default:
if(variable<1){if(character3==123)--variable;else if(character3==125&&variable++==
0&&prev()==125)continue}switch(characters3+=from(character3),character3*variable){case 38:
ampersand=offset>0?1:(characters3+="\f",-1);break;case 44:points[index++]=(strlen(
characters3)-1)*ampersand,ampersand=1;break;case 64:peek()===45&&(characters3+=delimit(
next())),atrule=peek(),offset=length3=strlen(type=characters3+=identifier(caret())),
character3++;break;case 45:previous===45&&strlen(characters3)==2&&(variable=0)}}
return rulesets}__name(parse,"parse");function ruleset(value,root,parent,index,offset,rules,points,type,props,children,length3){
for(var post=offset-1,rule=offset===0?rules:[""],size=sizeof(rule),i=0,j=0,k=0;i<
index;++i)for(var x=0,y=substr(value,post+1,post=abs(j=points[i])),z=value;x<size;++x)
(z=trim(j>0?rule[x]+" "+y:replace(y,/&\f/g,rule[x])))&&(props[k++]=z);return node(
value,root,parent,offset===0?RULESET:type,props,children,length3)}__name(ruleset,
"ruleset");function comment(value,root,parent){return node(value,root,parent,COMMENT,
from(char()),substr(value,2,-2),0)}__name(comment,"comment");function declaration(value,root,parent,length3){
return node(value,root,parent,DECLARATION,substr(value,0,length3),substr(value,length3+
1,-1),length3)}__name(declaration,"declaration");function serialize(children,callback){for(var output="",length3=sizeof(children),
i=0;i<length3;i++)output+=callback(children[i],i,children,callback)||"";return output}
__name(serialize,"serialize");function stringify(element,index,children,callback){
switch(element.type){case LAYER:if(element.children.length)break;case IMPORT:case DECLARATION:
return element.return=element.return||element.value;case COMMENT:return"";case KEYFRAMES:
return element.return=element.value+"{"+serialize(element.children,callback)+"}";case RULESET:
element.value=element.props.join(",")}return strlen(children=serialize(element.children,
callback))?element.return=element.value+"{"+children+"}":""}__name(stringify,"st\
ringify");function middleware(collection){var length3=sizeof(collection);return function(element,index,children,callback){
for(var output="",i=0;i<length3;i++)output+=collection[i](element,index,children,
callback)||"";return output}}__name(middleware,"middleware");function memoize(fn){var cache4=Object.create(null);return function(arg){return cache4[arg]===
void 0&&(cache4[arg]=fn(arg)),cache4[arg]}}__name(memoize,"memoize");var identifierWithPointTracking=__name(function(begin,points,index){for(var previous=0,
character3=0;previous=character3,character3=peek(),previous===38&&character3===12&&
(points[index]=1),!token(character3);)next();return slice(begin,position)},"iden\
tifierWithPointTracking"),toRules=__name(function(parsed,points){var index=-1,character3=44;
do switch(token(character3)){case 0:character3===38&&peek()===12&&(points[index]=
1),parsed[index]+=identifierWithPointTracking(position-1,points,index);break;case 2:
parsed[index]+=delimit(character3);break;case 4:if(character3===44){parsed[++index]=
peek()===58?"&\f":"",points[index]=parsed[index].length;break}default:parsed[index]+=
from(character3)}while(character3=next());return parsed},"toRules"),getRules=__name(
function(value,points){return dealloc(toRules(alloc(value),points))},"getRules"),
fixedElements=new WeakMap,compat=__name(function(element){if(!(element.type!=="r\
ule"||!element.parent||element.length<1)){for(var value=element.value,parent=element.
parent,isImplicitRule=element.column===parent.column&&element.line===parent.line;parent.
type!=="rule";)if(parent=parent.parent,!parent)return;if(!(element.props.length===
1&&value.charCodeAt(0)!==58&&!fixedElements.get(parent))&&!isImplicitRule){fixedElements.
set(element,!0);for(var points=[],rules=getRules(value,points),parentRules=parent.
props,i=0,k=0;i<rules.length;i++)for(var j=0;j<parentRules.length;j++,k++)element.
props[k]=points[i]?rules[i].replace(/&\f/g,parentRules[j]):parentRules[j]+" "+rules[i]}}},
"compat"),removeLabel=__name(function(element){if(element.type==="decl"){var value=element.
value;value.charCodeAt(0)===108&&value.charCodeAt(2)===98&&(element.return="",element.
value="")}},"removeLabel"),ignoreFlag="emotion-disable-server-rendering-unsafe-s\
elector-warning-please-do-not-use-this-the-warning-exists-for-a-reason",isIgnoringComment=__name(
function(element){return element.type==="comm"&&element.children.indexOf(ignoreFlag)>
-1},"isIgnoringComment"),createUnsafeSelectorsAlarm=__name(function(cache4){return function(element,index,children){
if(!(element.type!=="rule"||cache4.compat)){var unsafePseudoClasses=element.value.
match(/(:first|:nth|:nth-last)-child/g);if(unsafePseudoClasses){for(var isNested=!!element.
parent,commentContainer=isNested?element.parent.children:children,i=commentContainer.
length-1;i>=0;i--){var node4=commentContainer[i];if(node4.line<element.line)break;
if(node4.column<element.column){if(isIgnoringComment(node4))return;break}}unsafePseudoClasses.
forEach(function(unsafePseudoClass){console.error('The pseudo class "'+unsafePseudoClass+
'" is potentially unsafe when doing server-side rendering. Try changing it to "'+
unsafePseudoClass.split("-child")[0]+'-of-type".')})}}}},"createUnsafeSelectorsA\
larm"),isImportRule=__name(function(element){return element.type.charCodeAt(1)===
105&&element.type.charCodeAt(0)===64},"isImportRule"),isPrependedWithRegularRules=__name(
function(index,children){for(var i=index-1;i>=0;i--)if(!isImportRule(children[i]))
return!0;return!1},"isPrependedWithRegularRules"),nullifyElement=__name(function(element){
element.type="",element.value="",element.return="",element.children="",element.props=
""},"nullifyElement"),incorrectImportAlarm=__name(function(element,index,children){
isImportRule(element)&&(element.parent?(console.error("`@import` rules can't be \
nested inside other rules. Please move it to the top level and put it before reg\
ular rules. Keep in mind that they can only be used within global styles."),nullifyElement(
element)):isPrependedWithRegularRules(index,children)&&(console.error("`@import`\
 rules can't be after other rules. Please put your `@import` rules before your o\
ther rules."),nullifyElement(element)))},"incorrectImportAlarm");function prefix(value,length3){
switch(hash(value,length3)){case 5103:return WEBKIT+"print-"+value+value;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:
return WEBKIT+value+value;case 5349:case 4246:case 4810:case 6968:case 2756:return WEBKIT+
value+MOZ+value+MS+value+value;case 6828:case 4268:return WEBKIT+value+MS+value+
value;case 6165:return WEBKIT+value+MS+"flex-"+value+value;case 5187:return WEBKIT+
value+replace(value,/(\w+).+(:[^]+)/,WEBKIT+"box-$1$2"+MS+"flex-$1$2")+value;case 5443:
return WEBKIT+value+MS+"flex-item-"+replace(value,/flex-|-self/,"")+value;case 4675:
return WEBKIT+value+MS+"flex-line-pack"+replace(value,/align-content|flex-|-self/,
"")+value;case 5548:return WEBKIT+value+MS+replace(value,"shrink","negative")+value;case 5292:
return WEBKIT+value+MS+replace(value,"basis","preferred-size")+value;case 6060:return WEBKIT+
"box-"+replace(value,"-grow","")+WEBKIT+value+MS+replace(value,"grow","positive")+
value;case 4554:return WEBKIT+replace(value,/([^-])(transform)/g,"$1"+WEBKIT+"$2")+
value;case 6187:return replace(replace(replace(value,/(zoom-|grab)/,WEBKIT+"$1"),
/(image-set)/,WEBKIT+"$1"),value,"")+value;case 5495:case 3959:return replace(value,
/(image-set\([^]*)/,WEBKIT+"$1$`$1");case 4968:return replace(replace(value,/(.+:)(flex-)?(.*)/,
WEBKIT+"box-pack:$3"+MS+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+WEBKIT+value+value;case 4095:case 3583:case 4068:case 2532:
return replace(value,/(.+)-inline(.+)/,WEBKIT+"$1$2")+value;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:
if(strlen(value)-1-length3>6)switch(charat(value,length3+1)){case 109:if(charat(
value,length3+4)!==45)break;case 102:return replace(value,/(.+:)(.+)-([^]+)/,"$1"+
WEBKIT+"$2-$3$1"+MOZ+(charat(value,length3+3)==108?"$3":"$2-$3"))+value;case 115:
return~indexof(value,"stretch")?prefix(replace(value,"stretch","fill-available"),
length3)+value:value}break;case 4949:if(charat(value,length3+1)!==115)break;case 6444:
switch(charat(value,strlen(value)-3-(~indexof(value,"!important")&&10))){case 107:
return replace(value,":",":"+WEBKIT)+value;case 101:return replace(value,/(.+:)([^;!]+)(;|!.+)?/,
"$1"+WEBKIT+(charat(value,14)===45?"inline-":"")+"box$3$1"+WEBKIT+"$2$3$1"+MS+"$\
2box$3")+value}break;case 5936:switch(charat(value,length3+11)){case 114:return WEBKIT+
value+MS+replace(value,/[svh]\w+-[tblr]{2}/,"tb")+value;case 108:return WEBKIT+value+
MS+replace(value,/[svh]\w+-[tblr]{2}/,"tb-rl")+value;case 45:return WEBKIT+value+
MS+replace(value,/[svh]\w+-[tblr]{2}/,"lr")+value}return WEBKIT+value+MS+value+value}
return value}__name(prefix,"prefix");var prefixer=__name(function(element,index,children,callback){
if(element.length>-1&&!element.return)switch(element.type){case DECLARATION:element.
return=prefix(element.value,element.length);break;case KEYFRAMES:return serialize(
[copy(element,{value:replace(element.value,"@","@"+WEBKIT)})],callback);case RULESET:
if(element.length)return combine(element.props,function(value){switch(match(value,
/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return serialize([copy(
element,{props:[replace(value,/:(read-\w+)/,":"+MOZ+"$1")]})],callback);case"::p\
laceholder":return serialize([copy(element,{props:[replace(value,/:(plac\w+)/,":"+
WEBKIT+"input-$1")]}),copy(element,{props:[replace(value,/:(plac\w+)/,":"+MOZ+"$\
1")]}),copy(element,{props:[replace(value,/:(plac\w+)/,MS+"input-$1")]})],callback)}
return""})}},"prefixer"),defaultStylisPlugins=[prefixer],createCache=__name(function(options){
var key=options.key;if(!key)throw new Error(`You have to configure \`key\` for you\
r cache. Please make sure it's unique (and not equal to 'css') as it's used for \
linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style \
elements.`);if(key==="css"){var ssrStyles=document.querySelectorAll("style[data-\
emotion]:not([data-s])");Array.prototype.forEach.call(ssrStyles,function(node4){
var dataEmotionAttribute=node4.getAttribute("data-emotion");dataEmotionAttribute.
indexOf(" ")!==-1&&(document.head.appendChild(node4),node4.setAttribute("data-s",
""))})}var stylisPlugins=options.stylisPlugins||defaultStylisPlugins;if(/[^a-z-]/.
test(key))throw new Error('Emotion key must only contain lower case alphabetical\
 characters and - but "'+key+'" was passed');var inserted={},container,nodesToHydrate=[];
container=options.container||document.head,Array.prototype.forEach.call(document.
querySelectorAll('style[data-emotion^="'+key+' "]'),function(node4){for(var attrib=node4.
getAttribute("data-emotion").split(" "),i=1;i<attrib.length;i++)inserted[attrib[i]]=
!0;nodesToHydrate.push(node4)});var _insert,omnipresentPlugins=[compat,removeLabel];
omnipresentPlugins.push(createUnsafeSelectorsAlarm({get compat(){return cache4.compat}}),
incorrectImportAlarm);{var currentSheet,finalizingPlugins=[stringify,function(element){
element.root||(element.return?currentSheet.insert(element.return):element.value&&
element.type!==COMMENT&&currentSheet.insert(element.value+"{}"))}],serializer=middleware(
omnipresentPlugins.concat(stylisPlugins,finalizingPlugins)),stylis2=__name(function(styles){
return serialize(compile(styles),serializer)},"stylis");_insert=__name(function(selector,serialized,sheet2,shouldCache){
currentSheet=sheet2,serialized.map!==void 0&&(currentSheet={insert:__name(function(rule){
sheet2.insert(rule+serialized.map)},"insert")}),stylis2(selector?selector+"{"+serialized.
styles+"}":serialized.styles),shouldCache&&(cache4.inserted[serialized.name]=!0)},
"insert")}var cache4={key,sheet:new StyleSheet({key,container,nonce:options.nonce,
speedy:options.speedy,prepend:options.prepend,insertionPoint:options.insertionPoint}),
nonce:options.nonce,inserted,registered:{},insert:_insert};return cache4.sheet.hydrate(
nodesToHydrate),cache4},"createCache");function murmur2(str){for(var h=0,k,i=0,len=str.length;len>=4;++i,len-=4)k=str.charCodeAt(
i)&255|(str.charCodeAt(++i)&255)<<8|(str.charCodeAt(++i)&255)<<16|(str.charCodeAt(
++i)&255)<<24,k=(k&65535)*1540483477+((k>>>16)*59797<<16),k^=k>>>24,h=(k&65535)*
1540483477+((k>>>16)*59797<<16)^(h&65535)*1540483477+((h>>>16)*59797<<16);switch(len){case 3:
h^=(str.charCodeAt(i+2)&255)<<16;case 2:h^=(str.charCodeAt(i+1)&255)<<8;case 1:h^=
str.charCodeAt(i)&255,h=(h&65535)*1540483477+((h>>>16)*59797<<16)}return h^=h>>>
13,h=(h&65535)*1540483477+((h>>>16)*59797<<16),((h^h>>>15)>>>0).toString(36)}__name(
murmur2,"murmur2");var unitlessKeys={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,
borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,
flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,
gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,
gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,
fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,
zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,
strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var ILLEGAL_ESCAPE_SEQUENCE_ERROR=`You have illegal escape sequence in your temp\
late literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do do\
uble escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d\
7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_liter\
als#ES2018_revision_of_illegal_escape_sequences`,UNDEFINED_AS_OBJECT_KEY_ERROR="\
You have passed in falsy value as style object's key (can happen when in example\
 you pass unexported component as computed key).",hyphenateRegex=/[A-Z]|^ms/g,animationRegex=/_EMO_([^_]+?)_([^]*?)_EMO_/g,
isCustomProperty=__name(function(property){return property.charCodeAt(1)===45},"\
isCustomProperty"),isProcessableValue=__name(function(value){return value!=null&&
typeof value!="boolean"},"isProcessableValue"),processStyleName=memoize(function(styleName){
return isCustomProperty(styleName)?styleName:styleName.replace(hyphenateRegex,"-\
$&").toLowerCase()}),processStyleValue=__name(function(key,value){switch(key){case"\
animation":case"animationName":if(typeof value=="string")return value.replace(animationRegex,
function(match2,p1,p2){return cursor={name:p1,styles:p2,next:cursor},p1})}return unitlessKeys[key]!==
1&&!isCustomProperty(key)&&typeof value=="number"&&value!==0?value+"px":value},"\
processStyleValue");contentValuePattern=/(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
contentValues=["normal","none","initial","inherit","unset"],oldProcessStyleValue=
processStyleValue,msPattern=/^-ms-/,hyphenPattern=/-(.)/g,hyphenatedCache={},processStyleValue=
__name(function(key,value){if(key==="content"&&(typeof value!="string"||contentValues.
indexOf(value)===-1&&!contentValuePattern.test(value)&&(value.charAt(0)!==value.
charAt(value.length-1)||value.charAt(0)!=='"'&&value.charAt(0)!=="'")))throw new Error(
"You seem to be using a value for 'content' without quotes, try replacing it wit\
h `content: '\""+value+"\"'`");var processed=oldProcessStyleValue(key,value);return processed!==
""&&!isCustomProperty(key)&&key.indexOf("-")!==-1&&hyphenatedCache[key]===void 0&&
(hyphenatedCache[key]=!0,console.error("Using kebab-case for css properties in o\
bjects is not supported. Did you mean "+key.replace(msPattern,"ms-").replace(hyphenPattern,
function(str,_char){return _char.toUpperCase()})+"?")),processed},"processStyleV\
alue");var contentValuePattern,contentValues,oldProcessStyleValue,msPattern,hyphenPattern,
hyphenatedCache,noComponentSelectorMessage="Component selectors can only be used\
 in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another E\
motion-aware compiler transform.";function handleInterpolation(mergedProps,registered,interpolation){
if(interpolation==null)return"";if(interpolation.__emotion_styles!==void 0){if(interpolation.
toString()==="NO_COMPONENT_SELECTOR")throw new Error(noComponentSelectorMessage);
return interpolation}switch(typeof interpolation){case"boolean":return"";case"ob\
ject":{if(interpolation.anim===1)return cursor={name:interpolation.name,styles:interpolation.
styles,next:cursor},interpolation.name;if(interpolation.styles!==void 0){var next3=interpolation.
next;if(next3!==void 0)for(;next3!==void 0;)cursor={name:next3.name,styles:next3.
styles,next:cursor},next3=next3.next;var styles=interpolation.styles+";";return interpolation.
map!==void 0&&(styles+=interpolation.map),styles}return createStringFromObject(mergedProps,
registered,interpolation)}case"function":{if(mergedProps!==void 0){var previousCursor=cursor,
result=interpolation(mergedProps);return cursor=previousCursor,handleInterpolation(
mergedProps,registered,result)}else console.error("Functions that are interpolat\
ed in css calls will be stringified.\nIf you want to have a css call based on pro\
ps, create a function that returns a css call like this\nlet dynamicStyle = (prop\
s) => css`color: ${props.color}`\nIt can be called directly with props or interpo\
lated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyl\
e}`");break}case"string":var matched=[],replaced=interpolation.replace(animationRegex,
function(match2,p1,p2){var fakeVarName="animation"+matched.length;return matched.
push("const "+fakeVarName+" = keyframes`"+p2.replace(/^@keyframes animation-\w+/,
"")+"`"),"${"+fakeVarName+"}"});matched.length&&console.error("`keyframes` outpu\
t got interpolated into plain string, please wrap it with `css`.\n\nInstead of doi\
ng this:\n\n"+[].concat(matched,["`"+replaced+"`"]).join(`
`)+`

You should wrap it with \`css\` like this:

`+("css`"+replaced+"`"));break}if(registered==null)return interpolation;var cached=registered[interpolation];
return cached!==void 0?cached:interpolation}__name(handleInterpolation,"handleIn\
terpolation");function createStringFromObject(mergedProps,registered,obj){var string="";
if(Array.isArray(obj))for(var i=0;i<obj.length;i++)string+=handleInterpolation(mergedProps,
registered,obj[i])+";";else for(var _key in obj){var value=obj[_key];if(typeof value!=
"object")registered!=null&&registered[value]!==void 0?string+=_key+"{"+registered[value]+
"}":isProcessableValue(value)&&(string+=processStyleName(_key)+":"+processStyleValue(
_key,value)+";");else{if(_key==="NO_COMPONENT_SELECTOR")throw new Error(noComponentSelectorMessage);
if(Array.isArray(value)&&typeof value[0]=="string"&&(registered==null||registered[value[0]]===
void 0))for(var _i=0;_i<value.length;_i++)isProcessableValue(value[_i])&&(string+=
processStyleName(_key)+":"+processStyleValue(_key,value[_i])+";");else{var interpolated=handleInterpolation(
mergedProps,registered,value);switch(_key){case"animation":case"animationName":{
string+=processStyleName(_key)+":"+interpolated+";";break}default:_key==="undefi\
ned"&&console.error(UNDEFINED_AS_OBJECT_KEY_ERROR),string+=_key+"{"+interpolated+
"}"}}}}return string}__name(createStringFromObject,"createStringFromObject");var labelPattern=/label:\s*([^\s;\n{]+)\s*(;|$)/g,
sourceMapPattern;sourceMapPattern=/\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
var cursor,serializeStyles=__name(function(args,registered,mergedProps){if(args.
length===1&&typeof args[0]=="object"&&args[0]!==null&&args[0].styles!==void 0)return args[0];
var stringMode=!0,styles="";cursor=void 0;var strings=args[0];strings==null||strings.
raw===void 0?(stringMode=!1,styles+=handleInterpolation(mergedProps,registered,strings)):
(strings[0]===void 0&&console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR),styles+=strings[0]);
for(var i=1;i<args.length;i++)styles+=handleInterpolation(mergedProps,registered,
args[i]),stringMode&&(strings[i]===void 0&&console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR),
styles+=strings[i]);var sourceMap;styles=styles.replace(sourceMapPattern,function(match3){
return sourceMap=match3,""}),labelPattern.lastIndex=0;for(var identifierName="",
match2;(match2=labelPattern.exec(styles))!==null;)identifierName+="-"+match2[1];
var name=murmur2(styles)+identifierName;return{name,styles,map:sourceMap,next:cursor,
toString:__name(function(){return"You have tried to stringify object returned fr\
om `css` function. It isn't supposed to be used directly (e.g. as value of the `\
className` prop), but rather handed to emotion so it can handle it (e.g. as valu\
e of `css` prop)."},"toString")}},"serializeStyles");var isBrowser=!0;function getRegisteredStyles(registered,registeredStyles,classNames){
var rawClassName="";return classNames.split(" ").forEach(function(className){registered[className]!==
void 0?registeredStyles.push(registered[className]+";"):rawClassName+=className+
" "}),rawClassName}__name(getRegisteredStyles,"getRegisteredStyles");var registerStyles=__name(
function(cache4,serialized,isStringTag){var className=cache4.key+"-"+serialized.
name;(isStringTag===!1||isBrowser===!1)&&cache4.registered[className]===void 0&&
(cache4.registered[className]=serialized.styles)},"registerStyles"),insertStyles=__name(
function(cache4,serialized,isStringTag){registerStyles(cache4,serialized,isStringTag);
var className=cache4.key+"-"+serialized.name;if(cache4.inserted[serialized.name]===
void 0){var current=serialized;do cache4.insert(serialized===current?"."+className:
"",current,cache4.sheet,!0),current=current.next;while(current!==void 0)}},"inse\
rtStyles");function insertWithoutScoping(cache4,serialized){if(cache4.inserted[serialized.name]===
void 0)return cache4.insert("",serialized,cache4.sheet,!0)}__name(insertWithoutScoping,
"insertWithoutScoping");function merge(registered,css5,className){var registeredStyles=[],
rawClassName=getRegisteredStyles(registered,registeredStyles,className);return registeredStyles.
length<2?className:rawClassName+css5(registeredStyles)}__name(merge,"merge");var createEmotion=__name(
function(options){var cache4=createCache(options);cache4.sheet.speedy=function(value){
if(this.ctr!==0)throw new Error("speedy must be changed before any rules are ins\
erted");this.isSpeedy=value},cache4.compat=!0;var css5=__name(function(){for(var _len=arguments.
length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];var serialized=serializeStyles(
args,cache4.registered,void 0);return insertStyles(cache4,serialized,!1),cache4.
key+"-"+serialized.name},"css"),keyframes2=__name(function(){for(var _len2=arguments.
length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];
var serialized=serializeStyles(args,cache4.registered),animation="animation-"+serialized.
name;return insertWithoutScoping(cache4,{name:serialized.name,styles:"@keyframes\
 "+animation+"{"+serialized.styles+"}"}),animation},"keyframes"),injectGlobal2=__name(
function(){for(var _len3=arguments.length,args=new Array(_len3),_key3=0;_key3<_len3;_key3++)
args[_key3]=arguments[_key3];var serialized=serializeStyles(args,cache4.registered);
insertWithoutScoping(cache4,serialized)},"injectGlobal"),cx2=__name(function(){for(var _len4=arguments.
length,args=new Array(_len4),_key4=0;_key4<_len4;_key4++)args[_key4]=arguments[_key4];
return merge(cache4.registered,css5,classnames(args))},"cx");return{css:css5,cx:cx2,
injectGlobal:injectGlobal2,keyframes:keyframes2,hydrate:__name(function(ids){ids.
forEach(function(key){cache4.inserted[key]=!0})},"hydrate"),flush:__name(function(){
cache4.registered={},cache4.inserted={},cache4.sheet.flush()},"flush"),sheet:cache4.
sheet,cache:cache4,getRegisteredStyles:getRegisteredStyles.bind(null,cache4.registered),
merge:merge.bind(null,cache4.registered,css5)}},"createEmotion"),classnames=__name(
function classnames2(args){for(var cls="",i=0;i<args.length;i++){var arg=args[i];
if(arg!=null){var toAdd=void 0;switch(typeof arg){case"boolean":break;case"objec\
t":{if(Array.isArray(arg))toAdd=classnames2(arg);else{toAdd="";for(var k in arg)
arg[k]&&k&&(toAdd&&(toAdd+=" "),toAdd+=k)}break}default:toAdd=arg}toAdd&&(cls&&(cls+=
" "),cls+=toAdd)}}return cls},"classnames");var _createEmotion=createEmotion({key:"css"}),flush=_createEmotion.flush,hydrate=_createEmotion.
hydrate,cx=_createEmotion.cx,merge2=_createEmotion.merge,getRegisteredStyles2=_createEmotion.
getRegisteredStyles,injectGlobal=_createEmotion.injectGlobal,keyframes=_createEmotion.
keyframes,css2=_createEmotion.css,sheet=_createEmotion.sheet,cache=_createEmotion.
cache;var StyleClass=class{static{__name(this,"StyleClass")}static default;static css(style={}){
return""}static style(style={}){return""}},Adapter=class extends HTMLElement{static{
__name(this,"Adapter")}static Style=StyleClass;static _tagName;static get tagName(){
if(!this._tagName)throw`${this.name} hasn't been defined a tag name`;return this.
_tagName}static set tagName(tagName){this._tagName=tagName}static define(tagName){
try{customElements.define(tagName,this)}catch(error){if(error instanceof DOMException){
console.error(`DOMException: '${this.name}' has already been defined to tag '${this.
tagName}'
${error.stack}`);return}}this.tagName=tagName,this.initStyle()}static initStyle(){
injectGlobal`
        ${this.tagName} {
            all: unset;
        }`,this.Style&&injectGlobal`
        ${this.tagName} {
            ${this.Style.css()}
        }`}static tagStyle(style){if(typeof style=="string"){injectGlobal`
            ${this.tagName} {
                ${style}
            }`;return}injectGlobal`
        ${this.tagName} {
            ${this.Style.style(style)}
        }`}static classStyle(class_,style){typeof style=="string"?injectGlobal`
            ${this.tagName}.${class_} {
                ${style}
            }`:typeof style=="object"&&injectGlobal`
            ${this.tagName}.${class_} {
                ${this.Style.style(style)}
            }`}static max_id=Math.pow(16,4)-1;static instance={};static _generate_id(){
return`adt-${Math.floor(Math.random()*this.max_id).toString(16)}`}_class;_id;constructor(){
super(),this._class=this.constructor;let id=this._class._generate_id();for(;id in
this._class.instance;)id=this._class._generate_id();this._class.instance[id]=!0,
this._id=id}addStyle(style){this.classList.add(this._id);let selector=this.classList.
value.replace(/ /g,".");typeof style=="string"?injectGlobal`
            ${this.tagName}.${selector} {
                ${style}
            }`:typeof style=="object"&&injectGlobal`
            ${this.tagName}.${selector} {
                ${this._class.Style.style(style)}
            }`}notify(name,options){let event2=new CustomEvent(name,options);this.
dispatchEvent(event2)}};var Color=require_color(),bgColor=__name((color2="blue")=>{let fontColor=Color(color2).
isDark()?"white":"black";return`
    background-color: ${color2};
    color: ${fontColor};
    `.trim()},"bgColor");var import_color=__toESM(require_color());var bgColorInt=__name(({color:color2="blue",lighten=.2,saturate=.2})=>{let color_=new import_color.default(
color2),hoverColor=color_.lighten(lighten).saturate(saturate);return`
    ${bgColor(color_.toString())}
    &:hover {
        background-color: ${color_.lighten(lighten).saturate(saturate).toString()}\
;
    }
    &:active {
        background-color: ${color_.lighten(-lighten).saturate(saturate).toString()}\
;
    }`.trim()},"bgColorInt");var fontFluid=__name(({vwMin=300,vwMax=1200,fontSizeMin=16,fontSizeMax=18}={})=>{
let viewportRatio=`(100vw - ${vwMin}px) / (${vwMax} - ${vwMin})`,fontScaleRatio=`\
(${fontSizeMax} - ${fontSizeMin}) * ${viewportRatio}`;return`
    font-size: ${fontSizeMin}px;
    @media screen and (min-width: ${vwMin}px) {
        font-size: calc(
            ${fontSizeMin}px + ${fontScaleRatio}
        );
    }
    @media screen and (min-width: ${vwMax}px) {
        font-size: ${fontSizeMax}px;
    }
    `.trim()},"fontFluid");var lift=__name(({level=3,shadowColor="rgb(0, 0, 0, 50%)"})=>((level<0||level>5)&&
(level=0),`box-shadow: ${[`0 0 0 0 ${shadowColor}`,`0 1px 3px 0 ${shadowColor}`,
`0 2px 5px 0 ${shadowColor}`,`0 4px 9px 0 ${shadowColor}`,`0 8px 17px 0 ${shadowColor}`,
`0 16px 33px 0 ${shadowColor}`][level]};`.trim()),"lift");var esm_default=__name(_=>({get:key=>_.get(key),set:(key,value)=>(_.set(key,value),
value)}),"default");var attr=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,empty=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,
node2=/<[a-z][^>]+$/i,notNode=/>[^<>]*$/,selfClosing=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig,
trimEnd=/\s+$/,isNode=__name((template,i)=>0<i--&&(node2.test(template[i])||!notNode.
test(template[i])&&isNode(template,i)),"isNode"),regular=__name((original,name,extra)=>empty.
test(name)?original:`<${name}${extra.replace(trimEnd,"")}></${name}>`,"regular"),
esm_default2=__name((template,prefix3,svg2)=>{let text2=[],{length:length3}=template;
for(let i=1;i<length3;i++){let chunk=template[i-1];text2.push(attr.test(chunk)&&
isNode(template,i)?chunk.replace(attr,(_,$1,$2)=>`${prefix3}${i-1}=${$2||'"'}${$1}${$2?
"":'"'}`):`${chunk}<!--${prefix3}${i-1}-->`)}text2.push(template[length3-1]);let output=text2.
join("").trim();return svg2?output:output.replace(selfClosing,regular)},"default");var{isArray}=Array,{indexOf,slice:slice2}=[];var ELEMENT_NODE=1,nodeType=111,remove=__name(({firstChild,lastChild})=>{let range=document.
createRange();return range.setStartAfter(firstChild),range.setEndAfter(lastChild),
range.deleteContents(),firstChild},"remove"),diffable=__name((node4,operation)=>node4.
nodeType===nodeType?1/operation<0?operation?remove(node4):node4.lastChild:operation?
node4.valueOf():node4.firstChild:node4,"diffable"),persistent=__name(fragment=>{
let{childNodes}=fragment,{length:length3}=childNodes;if(length3<2)return length3?
childNodes[0]:fragment;let nodes=slice2.call(childNodes,0),firstChild=nodes[0],lastChild=nodes[length3-
1];return{ELEMENT_NODE,nodeType,firstChild,lastChild,valueOf(){if(childNodes.length!==
length3){let i=0;for(;i<length3;)fragment.appendChild(nodes[i++])}return fragment}}},
"persistent");var esm_default3=__name((parentNode,a,b,get,before)=>{let bLength=b.length,aEnd=a.
length,bEnd=bLength,aStart=0,bStart=0,map=null;for(;aStart<aEnd||bStart<bEnd;)if(aEnd===
aStart){let node4=bEnd<bLength?bStart?get(b[bStart-1],-0).nextSibling:get(b[bEnd-
bStart],0):before;for(;bStart<bEnd;)parentNode.insertBefore(get(b[bStart++],1),node4)}else if(bEnd===
bStart)for(;aStart<aEnd;)(!map||!map.has(a[aStart]))&&parentNode.removeChild(get(
a[aStart],-1)),aStart++;else if(a[aStart]===b[bStart])aStart++,bStart++;else if(a[aEnd-
1]===b[bEnd-1])aEnd--,bEnd--;else if(a[aStart]===b[bEnd-1]&&b[bStart]===a[aEnd-1]){
let node4=get(a[--aEnd],-1).nextSibling;parentNode.insertBefore(get(b[bStart++],
1),get(a[aStart++],-1).nextSibling),parentNode.insertBefore(get(b[--bEnd],1),node4),
a[aEnd]=b[bEnd]}else{if(!map){map=new Map;let i=bStart;for(;i<bEnd;)map.set(b[i],
i++)}if(map.has(a[aStart])){let index=map.get(a[aStart]);if(bStart<index&&index<
bEnd){let i=aStart,sequence=1;for(;++i<aEnd&&i<bEnd&&map.get(a[i])===index+sequence;)
sequence++;if(sequence>index-bStart){let node4=get(a[aStart],0);for(;bStart<index;)
parentNode.insertBefore(get(b[bStart++],1),node4)}else parentNode.replaceChild(get(
b[bStart++],1),get(a[aStart++],-1))}else aStart++}else parentNode.removeChild(get(
a[aStart++],-1))}return b},"default");var useForeign=!1,Foreign=class{static{__name(this,"Foreign")}constructor(handler,value){
useForeign=!0,this._=(...args)=>handler(...args,value)}};var aria=__name(node4=>values=>{for(let key in values){let name=key==="role"?key:
`aria-${key}`,value=values[key];value==null?node4.removeAttribute(name):node4.setAttribute(
name,value)}},"aria"),attribute=__name((node4,name)=>{let oldValue,orphan=!0,attributeNode=document.
createAttributeNS(null,name);return newValue=>{if(oldValue!==newValue)if(oldValue=
newValue,oldValue==null)orphan||(node4.removeAttributeNode(attributeNode),orphan=
!0);else{let value=useForeign&&newValue instanceof Foreign?newValue._(node4,name):
newValue;value==null?(orphan||node4.removeAttributeNode(attributeNode),orphan=!0):
(attributeNode.value=value,orphan&&(node4.setAttributeNodeNS(attributeNode),orphan=
!1))}}},"attribute"),boolean=__name((node4,key,oldValue)=>newValue=>{oldValue!==
!!newValue&&((oldValue=!!newValue)?node4.setAttribute(key,""):node4.removeAttribute(
key))},"boolean"),data=__name(({dataset})=>values=>{for(let key in values){let value=values[key];
value==null?delete dataset[key]:dataset[key]=value}},"data"),event=__name((node4,name)=>{
let oldValue,lower,type=name.slice(2);return!(name in node4)&&(lower=name.toLowerCase())in
node4&&(type=lower.slice(2)),newValue=>{let info=isArray(newValue)?newValue:[newValue,
!1];oldValue!==info[0]&&(oldValue&&node4.removeEventListener(type,oldValue,info[1]),
(oldValue=info[0])&&node4.addEventListener(type,oldValue,info[1]))}},"event"),ref=__name(
node4=>{let oldValue;return value=>{oldValue!==value&&(oldValue=value,typeof value==
"function"?value(node4):value.current=node4)}},"ref"),setter=__name((node4,key)=>key===
"dataset"?data(node4):value=>{node4[key]=value},"setter"),text=__name(node4=>{let oldValue;
return newValue=>{oldValue!=newValue&&(oldValue=newValue,node4.textContent=newValue??
"")}},"text");var reducePath=__name(({childNodes},i)=>childNodes[i],"reducePath"),diff=__name(
(comment3,oldNodes,newNodes)=>esm_default3(comment3.parentNode,oldNodes,newNodes,
diffable,comment3),"diff"),handleAnything=__name(comment3=>{let oldValue,text2,nodes=[],
anyContent=__name(newValue=>{switch(typeof newValue){case"string":case"number":case"\
boolean":oldValue!==newValue&&(oldValue=newValue,text2||(text2=document.createTextNode(
"")),text2.data=newValue,nodes=diff(comment3,nodes,[text2]));break;case"object":case"\
undefined":if(newValue==null){oldValue!=newValue&&(oldValue=newValue,nodes=diff(
comment3,nodes,[]));break}if(isArray(newValue)){oldValue=newValue,newValue.length===
0?nodes=diff(comment3,nodes,[]):typeof newValue[0]=="object"?nodes=diff(comment3,
nodes,newValue):anyContent(String(newValue));break}oldValue!==newValue&&"ELEMENT\
_NODE"in newValue&&(oldValue=newValue,nodes=diff(comment3,nodes,newValue.nodeType===
11?slice2.call(newValue.childNodes):[newValue]));break;case"function":anyContent(
newValue(comment3));break}},"anyContent");return anyContent},"handleAnything"),handleAttribute=__name(
(node4,name)=>{switch(name[0]){case"?":return boolean(node4,name.slice(1),!1);case"\
.":return setter(node4,name.slice(1));case"@":return event(node4,"on"+name.slice(
1));case"o":if(name[1]==="n")return event(node4,name)}switch(name){case"ref":return ref(
node4);case"aria":return aria(node4)}return attribute(node4,name)},"handleAttrib\
ute");function handlers(options){let{type,path}=options,node4=path.reduceRight(reducePath,
this);return type==="node"?handleAnything(node4):type==="attr"?handleAttribute(node4,
options.name):text(node4)}__name(handlers,"handlers");var createContent=function(document2){"use strict";var FRAGMENT="fragment",TEMPLATE="\
template",HAS_CONTENT="content"in create2(TEMPLATE),createHTML=HAS_CONTENT?function(html2){
var template=create2(TEMPLATE);return template.innerHTML=html2,template.content}:
function(html2){var content=create2(FRAGMENT),template=create2(TEMPLATE),childNodes=null;
if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html2)){var selector=RegExp.
$1;template.innerHTML="<table>"+html2+"</table>",childNodes=template.querySelectorAll(
selector)}else template.innerHTML=html2,childNodes=template.childNodes;return append3(
content,childNodes),content};return __name(function(markup,type){return(type==="\
svg"?createSVG:createHTML)(markup)},"createContent");function append3(root,childNodes){
for(var length3=childNodes.length;length3--;)root.appendChild(childNodes[0])}function create2(element){
return element===FRAGMENT?document2.createDocumentFragment():document2.createElementNS(
"http://www.w3.org/1999/xhtml",element)}function createSVG(svg2){var content=create2(
FRAGMENT),template=create2("div");return template.innerHTML='<svg xmlns="http://\
www.w3.org/2000/svg">'+svg2+"</svg>",append3(content,template.firstChild.childNodes),
content}}(document),esm_default4=createContent;var isImportNodeLengthWrong=document.importNode.length!=1,createFragment=isImportNodeLengthWrong?
(text2,type,normalize)=>document.importNode(esm_default4(text2,type,normalize),!0):
esm_default4,createWalker=isImportNodeLengthWrong?fragment=>document.createTreeWalker(
fragment,129,null,!1):fragment=>document.createTreeWalker(fragment,129);var createPath=__name(node4=>{let path=[],{parentNode}=node4;for(;parentNode;)path.
push(indexOf.call(parentNode.childNodes,node4)),node4=parentNode,parentNode=node4.
parentNode;return path},"createPath"),prefix2="is\xB5",cache2=esm_default(new WeakMap),
textOnly=/^(?:plaintext|script|style|textarea|title|xmp)$/i,createCache3=__name(
()=>({stack:[],entry:null,wire:null}),"createCache"),createEntry=__name((type,template)=>{
let{content,updates}=mapUpdates(type,template);return{type,template,content,updates,
wire:null}},"createEntry"),mapTemplate=__name((type,template)=>{let text2=esm_default2(
template,prefix2,type==="svg"),content=createFragment(text2,type),tw=createWalker(
content),nodes=[],length3=template.length-1,i=0,search=`${prefix2}${i}`;for(;i<length3;){
let node4=tw.nextNode();if(!node4)throw`bad template: ${text2}`;if(node4.nodeType===
8)node4.data===search&&(nodes.push({type:"node",path:createPath(node4)}),search=
`${prefix2}${++i}`);else{for(;node4.hasAttribute(search);)nodes.push({type:"attr",
path:createPath(node4),name:node4.getAttribute(search)}),node4.removeAttribute(search),
search=`${prefix2}${++i}`;textOnly.test(node4.tagName)&&node4.textContent.trim()===
`<!--${search}-->`&&(node4.textContent="",nodes.push({type:"text",path:createPath(
node4)}),search=`${prefix2}${++i}`)}}return{content,nodes}},"mapTemplate"),mapUpdates=__name(
(type,template)=>{let{content,nodes}=cache2.get(template)||cache2.set(template,mapTemplate(
type,template)),fragment=document.importNode(content,!0),updates=nodes.map(handlers,
fragment);return{content:fragment,updates}},"mapUpdates"),unroll=__name((info,{type,
template,values})=>{let{length:length3}=values;unrollValues(info,values,length3);
let{entry}=info;(!entry||entry.template!==template||entry.type!==type)&&(info.entry=
entry=createEntry(type,template));let{content,updates,wire}=entry;for(let i=0;i<
length3;i++)updates[i](values[i]);return wire||(entry.wire=persistent(content))},
"unroll"),unrollValues=__name(({stack},values,length3)=>{for(let i=0;i<length3;i++){
let hole=values[i];hole instanceof Hole?values[i]=unroll(stack[i]||(stack[i]=createCache3()),
hole):isArray(hole)?unrollValues(stack[i]||(stack[i]=createCache3()),hole,hole.length):
stack[i]=null}length3<stack.length&&stack.splice(length3)},"unrollValues");function Hole(type,template,values){
this.type=type,this.template=template,this.values=values}__name(Hole,"Hole");var{create,defineProperties}=Object,tag=__name(type=>{let keyed=esm_default(new WeakMap),
fixed=__name(cache4=>(template,...values)=>unroll(cache4,{type,template,values}),
"fixed");return defineProperties((template,...values)=>new Hole(type,template,values),
{for:{value(ref2,id){let memo=keyed.get(ref2)||keyed.set(ref2,create(null));return memo[id]||
(memo[id]=fixed(createCache3()))}},node:{value:(template,...values)=>unroll(createCache3(),
{type,template,values}).valueOf()}})},"tag"),cache3=esm_default(new WeakMap);var html=tag("html"),svg=tag("svg");var ButtonStyle=class extends StyleClass{static{__name(this,"ButtonStyle")}static default={
color:"blue",borderRadius:"4px"};static css(style={}){return style={...this.default,
...style},`
        border: 0;
        font-size: 1em;
        line-height: 1;
        font-weight: bold;
        text-decoration: none;
        outline: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 2em;
        padding-left: 0.4em;
        padding-right: 0.4em;
        cursor: pointer;
        transition: 0.2s;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        &[disabled]:hover {
            cursor: not-allowed;
        }
        a {
            text-decoration: none;
        }
        ${lift({level:1})}
        &:hover {
            ${lift({level:2})};
        }
        &:active {
            ${lift({level:1})};
        }
        ${this.style(style)}
        `.trim()}static style(style={}){return`
        ${this._color(style)}
        ${this._borderRadius(style)}
        `.trim()}static _color(style={}){return style.color==null?"":`
        ${bgColorInt({color:style.color})}
        `.trim()}static _borderRadius(style={}){return style.borderRadius==null?
"":`
        border-radius: ${style.borderRadius};
        `.trim()}};var Button=class extends Adapter{static{__name(this,"Button")}static Style=ButtonStyle;static tagName="\
button";static define(tagName){if(tagName.toLocaleLowerCase()==="button"){this.tagName=
"button",this.initStyle();return}super.define(tagName)}static tagStyle(style){super.
tagStyle(style)}static classStyle(class_,style){super.classStyle(class_,style)}addStyle(style){
super.addStyle(style)}};var Color3=require_color();var InputStyle=class extends StyleClass{static{__name(this,"InputStyle")}static css(style={}){
return`
        font-size: 1em;
        border: 1px solid grey;
        border-radius: 0.2em;
        padding: 0.4em;
        `.trim()}};injectGlobal`
input {
    ${InputStyle.css()}
}`;var Color4=require_color();var Color5=require_color();var Color6=require_color();var Color7=require_color();var Color8=require_color();var color={blue:"#3584e4",green:"#33d17a",yellow:"#f6d32d",orange:"#ff7800",red:"\
#e01b24",purple:"#9141ac",violet:"#9141ac",brown:"#986a44",light:"#deddda",dark:"\
#3d3846"};function sleepSync(ms){let end=new Date().getTime()+ms,time=new Date().getTime();
for(;time<end;)time=new Date().getTime();return time}__name(sleepSync,"sleepSync");
function uuid(){return sleepSync(1).toString(36)}__name(uuid,"uuid");var COMMENT2="comm",RULESET2="rule",DECLARATION2="decl";var IMPORT2="@import";var KEYFRAMES2="@keyframes";var LAYER2="@layer";var abs2=Math.abs,from2=String.fromCharCode;function trim2(value){return value.trim()}__name(trim2,"trim");function replace2(value,pattern,replacement){return value.replace(pattern,replacement)}
__name(replace2,"replace");function indexof2(value,search,position3){return value.
indexOf(search,position3)}__name(indexof2,"indexof");function charat2(value,index){
return value.charCodeAt(index)|0}__name(charat2,"charat");function substr2(value,begin,end){
return value.slice(begin,end)}__name(substr2,"substr");function strlen2(value){return value.
length}__name(strlen2,"strlen");function sizeof2(value){return value.length}__name(
sizeof2,"sizeof");function append2(value,array){return array.push(value),value}__name(
append2,"append");var line2=1,column2=1,length2=0,position2=0,character2=0,characters2="";function node3(value,root,parent,type,props,children,length3,siblings){
return{value,root,parent,type,props,children,line:line2,column:column2,length:length3,
return:"",siblings}}__name(node3,"node");function char2(){return character2}__name(char2,"char");function prev2(){return character2=
position2>0?charat2(characters2,--position2):0,column2--,character2===10&&(column2=
1,line2--),character2}__name(prev2,"prev");function next2(){return character2=position2<
length2?charat2(characters2,position2++):0,column2++,character2===10&&(column2=1,
line2++),character2}__name(next2,"next");function peek2(){return charat2(characters2,
position2)}__name(peek2,"peek");function caret2(){return position2}__name(caret2,
"caret");function slice3(begin,end){return substr2(characters2,begin,end)}__name(
slice3,"slice");function token2(type){switch(type){case 0:case 9:case 10:case 13:case 32:
return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:
return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:
return 1}return 0}__name(token2,"token");function alloc2(value){return line2=column2=
1,length2=strlen2(characters2=value),position2=0,[]}__name(alloc2,"alloc");function dealloc2(value){
return characters2="",value}__name(dealloc2,"dealloc");function delimit2(type){return trim2(
slice3(position2-1,delimiter2(type===91?type+2:type===40?type+1:type)))}__name(delimit2,
"delimit");function whitespace2(type){for(;(character2=peek2())&&character2<33;)next2();return token2(
type)>2||token2(character2)>3?"":" "}__name(whitespace2,"whitespace");function escaping2(index,count){for(;--count&&next2()&&!(character2<48||character2>
102||character2>57&&character2<65||character2>70&&character2<97););return slice3(
index,caret2()+(count<6&&peek2()==32&&next2()==32))}__name(escaping2,"escaping");
function delimiter2(type){for(;next2();)switch(character2){case type:return position2;case 34:case 39:
type!==34&&type!==39&&delimiter2(character2);break;case 40:type===41&&delimiter2(
type);break;case 92:next2();break}return position2}__name(delimiter2,"delimiter");
function commenter2(type,index){for(;next2()&&type+character2!==57;)if(type+character2===
84&&peek2()===47)break;return"/*"+slice3(index,position2-1)+"*"+from2(type===47?
type:next2())}__name(commenter2,"commenter");function identifier2(index){for(;!token2(
peek2());)next2();return slice3(index,position2)}__name(identifier2,"identifier");function compile2(value){return dealloc2(parse2("",null,null,null,[""],value=alloc2(
value),0,[0],value))}__name(compile2,"compile");function parse2(value,root,parent,rule,rules,rulesets,pseudo,points,declarations){
for(var index=0,offset=0,length3=pseudo,atrule=0,property=0,previous=0,variable=1,
scanning=1,ampersand=1,character3=0,type="",props=rules,children=rulesets,reference=rule,
characters3=type;scanning;)switch(previous=character3,character3=next2()){case 40:
if(previous!=108&&charat2(characters3,length3-1)==58){indexof2(characters3+=replace2(
delimit2(character3),"&","&\f"),"&\f",abs2(index?points[index-1]:0))!=-1&&(ampersand=
-1);break}case 34:case 39:case 91:characters3+=delimit2(character3);break;case 9:case 10:case 13:case 32:
characters3+=whitespace2(previous);break;case 92:characters3+=escaping2(caret2()-
1,7);continue;case 47:switch(peek2()){case 42:case 47:append2(comment2(commenter2(
next2(),caret2()),root,parent,declarations),declarations);break;default:characters3+=
"/"}break;case 123*variable:points[index++]=strlen2(characters3)*ampersand;case 125*
variable:case 59:case 0:switch(character3){case 0:case 125:scanning=0;case 59+offset:
ampersand==-1&&(characters3=replace2(characters3,/\f/g,"")),property>0&&strlen2(
characters3)-length3&&append2(property>32?declaration2(characters3+";",rule,parent,
length3-1,declarations):declaration2(replace2(characters3," ","")+";",rule,parent,
length3-2,declarations),declarations);break;case 59:characters3+=";";default:if(append2(
reference=ruleset2(characters3,root,parent,index,offset,rules,points,type,props=
[],children=[],length3,rulesets),rulesets),character3===123)if(offset===0)parse2(
characters3,root,reference,reference,props,rulesets,length3,points,children);else
switch(atrule===99&&charat2(characters3,3)===110?100:atrule){case 100:case 108:case 109:case 115:
parse2(value,reference,reference,rule&&append2(ruleset2(value,reference,reference,
0,0,rules,points,type,rules,props=[],length3,children),children),rules,children,
length3,points,rule?props:children);break;default:parse2(characters3,reference,reference,
reference,[""],children,0,points,children)}}index=offset=property=0,variable=ampersand=
1,type=characters3="",length3=pseudo;break;case 58:length3=1+strlen2(characters3),
property=previous;default:if(variable<1){if(character3==123)--variable;else if(character3==
125&&variable++==0&&prev2()==125)continue}switch(characters3+=from2(character3),
character3*variable){case 38:ampersand=offset>0?1:(characters3+="\f",-1);break;case 44:
points[index++]=(strlen2(characters3)-1)*ampersand,ampersand=1;break;case 64:peek2()===
45&&(characters3+=delimit2(next2())),atrule=peek2(),offset=length3=strlen2(type=
characters3+=identifier2(caret2())),character3++;break;case 45:previous===45&&strlen2(
characters3)==2&&(variable=0)}}return rulesets}__name(parse2,"parse");function ruleset2(value,root,parent,index,offset,rules,points,type,props,children,length3,siblings){
for(var post=offset-1,rule=offset===0?rules:[""],size=sizeof2(rule),i=0,j=0,k=0;i<
index;++i)for(var x=0,y=substr2(value,post+1,post=abs2(j=points[i])),z=value;x<size;++x)
(z=trim2(j>0?rule[x]+" "+y:replace2(y,/&\f/g,rule[x])))&&(props[k++]=z);return node3(
value,root,parent,offset===0?RULESET2:type,props,children,length3,siblings)}__name(
ruleset2,"ruleset");function comment2(value,root,parent,siblings){return node3(value,
root,parent,COMMENT2,from2(char2()),substr2(value,2,-2),0,siblings)}__name(comment2,
"comment");function declaration2(value,root,parent,length3,siblings){return node3(
value,root,parent,DECLARATION2,substr2(value,0,length3),substr2(value,length3+1,
-1),length3,siblings)}__name(declaration2,"declaration");function serialize2(children,callback){for(var output="",i=0;i<children.length;i++)
output+=callback(children[i],i,children,callback)||"";return output}__name(serialize2,
"serialize");function stringify2(element,index,children,callback){switch(element.
type){case LAYER2:if(element.children.length)break;case IMPORT2:case DECLARATION2:
return element.return=element.return||element.value;case COMMENT2:return"";case KEYFRAMES2:
return element.return=element.value+"{"+serialize2(element.children,callback)+"}";case RULESET2:
if(!strlen2(element.value=element.props.join(",")))return""}return strlen2(children=
serialize2(element.children,callback))?element.return=element.value+"{"+children+
"}":""}__name(stringify2,"stringify");function stylis(css5){return serialize2(compile2(css5),stringify2)}__name(stylis,
"stylis");var Isolator=class{static{__name(this,"Isolator")}constructor(element){this.element=
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
`)}set css(css5){this.styles=[css5],this.tagName&&this.cssStyleSheet.replaceSync(
this.adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`))}get css(){return this.
styles.join(`
`)}define(tagName){this.tagName=tagName,customElements.define(tagName,this.adapterClass),
this.initStyle()}initStyle(){this.cssStyleSheet.replaceSync(this.adapterClass.cssProcess(
`${this.tagName} { ${this.allCSS} }`)),document.adoptedStyleSheets.push(this.cssStyleSheet)}addStyle(css5){
if(this.styles.push(css5),this.tagName){let rule=`${this.tagName} { ${css5} }`,processedCss=this.
adapterClass.cssProcess(rule);this.cssStyleSheet.insertRule(processedCss,this.cssStyleSheet.
cssRules.length)}}},AdapterObject=class{constructor(){this.cssStyleSheet=new CSSStyleSheet;
this.styles=[]}static{__name(this,"AdapterObject")}get uuid(){return this._uuid?
this._uuid:(this._uuid=`${this.adapterObject.tagName}-${uuid()}`,this._uuid)}get cssObserver(){
return this._cssObserver?this._cssObserver:(this._cssObserver=new MutationObserver(
mutations=>{for(let mutation of mutations)mutation.attributeName==="css"&&(this.
adapterObject.css=this.adapterObject.getAttribute("css")||"")}),this._cssObserver)}get objectClassSelector(){
return this.adapterObject.classList.value.replace(/ /g,".")}initClass(){this._class=
this.adapterObject.constructor,!this._class.adapter.tagName&&(this._class.adapter.
tagName=this.adapterObject.tagName,this._class.adapter.initStyle())}cssObserve(enable){
enable?this.cssObserver.observe(this.adapterObject,{attributes:!0}):this.cssObserver.
disconnect()}};function AdapterMixin(Base){return class extends Base{constructor(...args){
super(...args);this._adapter=new AdapterObject;this._adapter.adapterObject=this,
this._adapter._class||this._adapter.initClass(),this._adapter.cssObserve(!0)}static{
__name(this,"_Adapter")}static get adapter(){return this._adapter===Object.getPrototypeOf(
this)._adapter&&(this._adapter=new AdapterClass,this._adapter.adapterClass=this),
this._adapter}static cssProcess(css5){return css5}static set css(css5){this.adapter.
css=css5}static get css(){return this.adapter.css}static get tagName(){return this.
adapter.tagName}static addStyle(css5){this.adapter.addStyle(css5)}static define(tagName){
this.adapter.define(tagName)}set css(css5){this._adapter.styles=[css5],this.classList.
add(this._adapter.uuid);let processedCss=this._adapter._class.cssProcess(`${this.
tagName}.${this._adapter.objectClassSelector} { ${css5} }`);this._adapter.cssStyleSheet.
replaceSync(processedCss)}get css(){let css5=this.getAttribute("css")||"";if(css5)
return css5;for(let rule of this._adapter.cssStyleSheet.cssRules)css5+=rule.cssText+
`
`;return css5}addStyle(css5){this._adapter.styles.push(css5),this.classList.add(
this._adapter.uuid);let processedCss=this._adapter._class.cssProcess(`${this.tagName}\
.${this._adapter.objectClassSelector} { ${css5} }`);this._adapter.cssStyleSheet.
insertRule(processedCss,this._adapter.cssStyleSheet.cssRules.length)}connectedCallback(){
super.connectedCallback&&super.connectedCallback();let css5=this.getAttribute("c\
ss");css5&&(this.css=css5);let rootNode=this.getRootNode();rootNode.adoptedStyleSheets.
indexOf(this._adapter._class.adapter.cssStyleSheet)===-1&&rootNode.adoptedStyleSheets.
push(this._adapter._class.adapter.cssStyleSheet),rootNode.adoptedStyleSheets.indexOf(
this._adapter.cssStyleSheet)===-1&&rootNode.adoptedStyleSheets.push(this._adapter.
cssStyleSheet)}remove(){let rootNode=this.getRootNode(),i=rootNode.adoptedStyleSheets.
indexOf(this._adapter.cssStyleSheet);rootNode.adoptedStyleSheets.splice(i,1),super.
remove()}}}__name(AdapterMixin,"AdapterMixin");var Adapter2=class extends IsolatorMixin(
AdapterMixin(HTMLElement)){static{__name(this,"Adapter")}static cssProcess(css5){
return stylis(css5)}};function baseStyle(to_base_url){let __base_url=new URL(import.meta.url),__fira_sans_url=new URL(
`${to_base_url}asset/font/FiraSans-Regular.ttf`,__base_url.href),__fira_code_url=new URL(
`${to_base_url}asset/font/FiraCode-Variable.ttf`,__base_url.href),style=new CSSStyleSheet;
document.adoptedStyleSheets.push(style),style.replaceSync(stylis(`
    @font-face {
        font-family: sans;
        src: url(${__fira_sans_url});
    }

    @font-face {
        font-family: monospace;
        src: url(${__fira_code_url});
    }

    html {
        line-height: 1.75;
        font-family: sans;
        ${fontFluid({fontSizeMin:16,fontSizeMax:18,vwMin:400,vwMax:1200})}
    }

    body {
        margin: 0;
        padding: 0;
        padding-bottom: 50dvh;
    }

    code {
        padding: 0.1rem 0.5rem;
        ${bgColor(color.light)}
        border-radius: 0.25em;
        font-family: monospace;
        font-size: 0.85em;
    }

    p, h1, h2, h3, h4, ul, li {
        max-width: 80ch;
        margin: auto;
    }

    p ~ ol {
        margin-top: -0.7rem;
    }

    p ~ ol ~ p {
        margin-top: -0.7rem;
    }

    button {
        ${Button.Style.css()}
    }

    img {
        max-width: 100%;
    }

    .width-100 {
        width: 100%;
    }

    .text-width {
        width: 100%;
        max-width: 80ch;
    }

    .container {
        display: block;
        max-width: 1000px;
        min-width: 300px;
        width: 90%;
        margin: auto;

        h1, h2, h3 {
            max-width: 45rem;
        }

        & h2 {
            line-height: 2;
            text-align: center;
            margin: auto;
            margin-top: 3rem;
            margin-bottom: 2rem;
            font-size: 1.5rem;
        }
        & h3 {
            text-decoration: underline;
            margin: auto;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }
        & h4 {
            font-size: 1rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
    }
    `))}__name(baseStyle,"baseStyle");var _Icon=class{static{__name(this,"_Icon")}set name(name){this.element.setAttribute(
"name",name),this.render()}get name(){return this.element.getAttribute("name")}constructor(element){
this._class=this.constructor,this.element=element,this.render(),new MutationObserver(
(mutationRecords,observer2)=>{this.observerCallback(mutationRecords,observer2)}).
observe(this.element,{attributes:!0})}observerCallback(mutationRecords,observer){
for(let mutation of mutationRecords)mutation.type==="attributes"&&mutation.attributeName===
"name"&&this.render()}render(){if(!this._class.url)return;let svg2=document.createElementNS(
"http://www.w3.org/2000/svg","svg"),use=document.createElementNS("http://www.w3.\
org/2000/svg","use");this.element.innerHTML="",svg2.style.width="1em",svg2.style.
height="1em",this.element.appendChild(svg2),use.setAttributeNS("http://www.w3.or\
g/1999/xlink","xlink:href",`${this._class.url}#${this.name}`),svg2.appendChild(use)}};
function DefIconMixin({url,objectField="deficon"},Base){class __Icon extends _Icon{static{
__name(this,"__Icon")}}return __Icon.url=url,class extends Base{constructor(...args){
super(...args),this[objectField]=new __Icon(this)}}}__name(DefIconMixin,"DefIcon\
Mixin");function DefIcon(param){return class extends DefIconMixin(param,HTMLElement){}}
__name(DefIcon,"DefIcon");var import_color2=__toESM(require_color(),1);var css3=String.raw;function bgColor2(color2){return css3`
        background-color: ${color2};
        color: ${(0,import_color2.default)(color2).isDark()?"white":"black"};
    `.trim()}__name(bgColor2,"bgColor");function lift2(level,color2="black"){return`\
filter: drop-shadow(0 0 ${level*2}px ${color2});`}__name(lift2,"lift");var aspectRatio2=__name((ratio="1/1")=>css3`
    height: auto;
    aspect-ratio: ${ratio};
    @supports not (aspect-ratio: ${ratio}) {
        &::before {
            float: left;
            padding-top: 100% / ${ratio};
            content: "";
        }

        &::after {
            display: block;
            content: "";
            clear: both;
        }
    }
    `.trim(),"aspectRatio");var CodeBlock=class extends Adapter2{static{__name(this,"CodeBlock")}static{this.
css=`
    & {
        display: block;
        margin: auto;
        margin-top: 1.5rem;
        max-width: 80ch;
        line-height: 1.5;
    }
    [el="bar-top-left"] {
        display: inline-flex;
        ${bgColor2(color.yellow)}
        border-top-left-radius: 0.4em;
        border-top-right-radius: 0.4em;
        line-height: 2;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.8rem;
    }
    & pre {
        margin-top: 0;
        font-size: 0.8rem;
        & code {
            all: unset;
            border-bottom-left-radius: 0.4em;
            border-bottom-right-radius: 0.4em;
            border-top-right-radius: 0.4em;
        }
    }
    `}};var import_color3=__toESM(require_color(),1);var css4=String.raw,BlockQuote=class extends Adapter2{static{__name(this,"BlockQ\
uote")}static{this.css=css4`
    display: flex;
    flex-wrap: wrap;

    blockquote {
      margin: 0;
      margin-top: 1rem;
      padding: 0rem 1rem;
      background-color: ${(0,import_color3.default)(color.yellow).alpha(.2)};
      border-left: 0.25em solid ${color.yellow};
      border-bottom-left-radius: 0.5rem;
    }
  `}};var import_color4=__toESM(require_color(),1);var buttonStyle=__name(color2=>`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    button {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 0;
        border-radius: 0.25rem;
        padding: 0.5rem 0.7rem;
        font-weight: bold;
        line-height: 1;
        cursor: pointer;
        ${lift2(.2,"#555")}
        ${bgColor2(color2)}
        &:hover {
            background-color: ${(0,import_color4.default)(color2).lighten(.1).saturate(
.1)};
            ${lift2(1.2,"#555")}
        }
        &:active {
            background-color: ${(0,import_color4.default)(color2).darken(.1).saturate(
-.1)};
            ${lift2(0,"#555")}
        }
    }
    `,"buttonStyle"),Button2=class extends Adapter2{constructor(){super();this.initialHTML=
this.innerHTML;this.render()}static{__name(this,"Button")}render(){this.innerHTML=
`<button>${this.initialHTML}</button>`}};function baseComponents(to_base_url){let __base_url=new URL(import.meta.url),icomoon_url=new URL(
"asset/icon/icomoon/symbol-defs.svg",__base_url).toString();class Icon extends AdapterMixin(
DefIcon({url:icomoon_url})){static{__name(this,"Icon")}static{this.css=`
      & {
          display: inline-flex;
          justify-content: center;
          align-items: center;
      }
    `}}Icon.define("el-icon"),CodeBlock.define("el-code-block"),Button2.define("\
el-button"),Button2.css=`
    & {
        ${buttonStyle(color.blue)}
    }
    button {
        min-height: 2em;
    }
    el-icon {
        margin-top: -0.17rem;
    }
  `,BlockQuote.define("el-blockquote")}__name(baseComponents,"baseComponents");function pageReload(to_base_url){let __file_url=new URL(import.meta.url),__event_source=new URL(
`${to_base_url}esbuild`,__file_url.href);["0.0.0.0","127.0.0.1","localhost"].includes(
__file_url.hostname)&&new EventSource(__event_source).addEventListener("change",
()=>location.reload())}__name(pageReload,"pageReload");function styleClass(){let cssStyleSheet=new CSSStyleSheet;document.adoptedStyleSheets.
push(cssStyleSheet),cssStyleSheet.replaceSync(`
    .aspect-ratio-21-9 {
        display: flex;
        ${aspectRatio2("21/9")}
        img {
            width: 100%;
            object-fit: cover;
        }
    }
    `)}__name(styleClass,"styleClass");baseLib();baseStyle("./");baseComponents("./");pageReload("./");styleClass();window.
addEventListener("load",()=>{document.body.style.visibility="visible"});
/*! Bundled license information:

@ungap/create-content/esm/index.js:
  (*! (c) Andrea Giammarchi - ISC *)
*/
//# sourceMappingURL=base.js.map
