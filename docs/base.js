var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});var __commonJS=(cb,mod)=>function(){return mod||(0,cb[__getOwnPropNames(cb)[0]])(
(mod={exports:{}}).exports,mod),mod.exports};var __copyProps=(to,from2,except,desc)=>{if(from2&&typeof from2=="object"||typeof from2==
"function")for(let key of __getOwnPropNames(from2))!__hasOwnProp.call(to,key)&&key!==
except&&__defProp(to,key,{get:()=>from2[key],enumerable:!(desc=__getOwnPropDesc(
from2,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):
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
node2=>!!node2.scope,"emitsWrappingTags"),scopeToCSSClass=__name((name,{prefix})=>{
if(name.startsWith("language:"))return name.replace("language:","language-");if(name.
includes(".")){let pieces=name.split(".");return[`${prefix}${pieces.shift()}`,...pieces.
map((x,i)=>`${x}${"_".repeat(i+1)}`)].join(" ")}return`${prefix}${name}`},"scope\
ToCSSClass"),HTMLRenderer=class{static{__name(this,"HTMLRenderer")}constructor(parseTree,options){
this.buffer="",this.classPrefix=options.classPrefix,parseTree.walk(this)}addText(text){
this.buffer+=escapeHTML(text)}openNode(node2){if(!emitsWrappingTags(node2))return;
let className=scopeToCSSClass(node2.scope,{prefix:this.classPrefix});this.span(className)}closeNode(node2){
emitsWrappingTags(node2)&&(this.buffer+=SPAN_CLOSE)}value(){return this.buffer}span(className){
this.buffer+=`<span class="${className}">`}},newNode=__name((opts={})=>{let result={
children:[]};return Object.assign(result,opts),result},"newNode"),TokenTree=class _TokenTree{static{
__name(this,"TokenTree")}constructor(){this.rootNode=newNode(),this.stack=[this.
rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.
rootNode}add(node2){this.top.children.push(node2)}openNode(scope){let node2=newNode(
{scope});this.add(node2),this.stack.push(node2)}closeNode(){if(this.stack.length>
1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.
stringify(this.rootNode,null,4)}walk(builder){return this.constructor._walk(builder,
this.rootNode)}static _walk(builder,node2){return typeof node2=="string"?builder.
addText(node2):node2.children&&(builder.openNode(node2),node2.children.forEach(child=>this.
_walk(builder,child)),builder.closeNode(node2)),builder}static _collapse(node2){
typeof node2!="string"&&node2.children&&(node2.children.every(el=>typeof el=="st\
ring")?node2.children=[node2.children.join("")]:node2.children.forEach(child=>{_TokenTree.
_collapse(child)}))}},TokenTreeEmitter=class extends TokenTree{static{__name(this,
"TokenTreeEmitter")}constructor(options){super(),this.options=options}addText(text){
text!==""&&this.add(text)}startScope(scope){this.openNode(scope)}endScope(){this.
closeNode()}__addSublanguage(emitter,name){let node2=emitter.root;name&&(node2.scope=
`language:${name}`),this.add(node2)}toHTML(){return new HTMLRenderer(this,this.options).
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
countMatchGroups");function startsWith(re,lexeme){let match=re&&re.exec(lexeme);
return match&&match.index===0}__name(startsWith,"startsWith");var BACKREF_RE=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function _rewriteBackreferences(regexps,{joinWith}){let numCaptures=0;return regexps.
map(regex=>{numCaptures+=1;let offset=numCaptures,re=source(regex),out="";for(;re.
length>0;){let match=BACKREF_RE.exec(re);if(!match){out+=re;break}out+=re.substring(
0,match.index),re=re.substring(match.index+match[0].length),match[0][0]==="\\"&&
match[1]?out+="\\"+String(Number(match[1])+offset):(out+=match[0],match[0]==="("&&
numCaptures++)}return out}).map(re=>`(${re})`).join(joinWith)}__name(_rewriteBackreferences,
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
COMMENT2=__name(function(begin,end,modeOptions={}){let mode=inherit$1({scope:"co\
mment",begin,end,contains:[]},modeOptions);mode.contains.push({scope:"doctag",begin:"\
[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
excludeBegin:!0,relevance:0});let ENGLISH_WORD=either("I","a","is","so","us","to",
"at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);
return mode.contains.push({begin:concat(/[ ]+/,"(",ENGLISH_WORD,/[.]?[:]?([.][ ]|[ ])/,
"){3}")}),mode},"COMMENT"),C_LINE_COMMENT_MODE=COMMENT2("//","$"),C_BLOCK_COMMENT_MODE=COMMENT2(
"/\\*","\\*/"),HASH_COMMENT_MODE=COMMENT2("#","$"),NUMBER_MODE={scope:"number",begin:NUMBER_RE,
relevance:0},C_NUMBER_MODE={scope:"number",begin:C_NUMBER_RE,relevance:0},BINARY_NUMBER_MODE={
scope:"number",begin:BINARY_NUMBER_RE,relevance:0},REGEXP_MODE={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,
end:/\/[gimuy]*/,contains:[BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[
BACKSLASH_ESCAPE]}]},TITLE_MODE={scope:"title",begin:IDENT_RE3,relevance:0},UNDERSCORE_TITLE_MODE={
scope:"title",begin:UNDERSCORE_IDENT_RE,relevance:0},METHOD_GUARD={begin:"\\.\\s*"+
UNDERSCORE_IDENT_RE,relevance:0},END_SAME_AS_BEGIN=__name(function(mode){return Object.
assign(mode,{"on:begin":(m,resp)=>{resp.data._beginMatch=m[1]},"on:end":(m,resp)=>{
resp.data._beginMatch!==m[1]&&resp.ignoreMatch()}})},"END_SAME_AS_BEGIN"),MODES2=Object.
freeze({__proto__:null,APOS_STRING_MODE,BACKSLASH_ESCAPE,BINARY_NUMBER_MODE,BINARY_NUMBER_RE,
COMMENT:COMMENT2,C_BLOCK_COMMENT_MODE,C_LINE_COMMENT_MODE,C_NUMBER_MODE,C_NUMBER_RE,
END_SAME_AS_BEGIN,HASH_COMMENT_MODE,IDENT_RE:IDENT_RE3,MATCH_NOTHING_RE,METHOD_GUARD,
NUMBER_MODE,NUMBER_RE,PHRASAL_WORDS_MODE,QUOTE_STRING_MODE,REGEXP_MODE,RE_STARTERS_RE,
SHEBANG,TITLE_MODE,UNDERSCORE_IDENT_RE,UNDERSCORE_TITLE_MODE});function skipIfHasPrecedingDot(match,response){
match.input[match.index-1]==="."&&response.ignoreMatch()}__name(skipIfHasPrecedingDot,
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
this.lastIndex;let match=this.matcherRe.exec(s);if(!match)return null;let i=match.
findIndex((el,i2)=>i2>0&&el!==void 0),matchData=this.matchIndexes[i];return match.
splice(0,i),Object.assign(match,matchData)}}class ResumableMultiRegex{static{__name(
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
__name(this,"HTMLInjectionError")}constructor(reason,html){super(reason),this.name=
"HTMLInjectionError",this.html=html}},escape=escapeHTML,inherit=inherit$1,NO_MATCH=Symbol(
"nomatch"),MAX_KEYWORD_HITS=7,HLJS=__name(function(hljs){let languages=Object.create(
null),aliases=Object.create(null),plugins=[],SAFE_MODE=!0,LANGUAGE_NOT_FOUND="Co\
uld not find the language '{}', did you forget to load/include a language module\
?",PLAINTEXT_LANGUAGE={disableAutodetect:!0,name:"Plain text",contains:[]},options={
ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"\
pre code",languages:null,__emitter:TokenTreeEmitter};function shouldNotHighlight(languageName){
return options.noHighlightRe.test(languageName)}__name(shouldNotHighlight,"shoul\
dNotHighlight");function blockLanguage(block){let classes=block.className+" ";classes+=
block.parentNode?block.parentNode.className:"";let match=options.languageDetectRe.
exec(classes);if(match){let language=getLanguage(match[1]);return language||(warn(
LANGUAGE_NOT_FOUND.replace("{}",match[1])),warn("Falling back to no-highlight mo\
de for this block.",block)),language?match[1]:"no-highlight"}return classes.split(
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
lastIndex=0;let match=top.keywordPatternRe.exec(modeBuffer),buf="";for(;match;){
buf+=modeBuffer.substring(lastIndex,match.index);let word=language.case_insensitive?
match[0].toLowerCase():match[0],data=keywordData(top,word);if(data){let[kind,keywordRelevance]=data;
if(emitter.addText(buf),buf="",keywordHits[word]=(keywordHits[word]||0)+1,keywordHits[word]<=
MAX_KEYWORD_HITS&&(relevance+=keywordRelevance),kind.startsWith("_"))buf+=match[0];else{
let cssClass=language.classNameAliases[kind]||kind;emitKeyword(match[0],cssClass)}}else
buf+=match[0];lastIndex=top.keywordPatternRe.lastIndex,match=top.keywordPatternRe.
exec(modeBuffer)}buf+=modeBuffer.substring(lastIndex),emitter.addText(buf)}__name(
processKeywords,"processKeywords");function processSubLanguage(){if(modeBuffer===
"")return;let result2=null;if(typeof top.subLanguage=="string"){if(!languages[top.
subLanguage]){emitter.addText(modeBuffer);return}result2=_highlight(top.subLanguage,
modeBuffer,!0,continuations[top.subLanguage]),continuations[top.subLanguage]=result2.
_top}else result2=highlightAuto(modeBuffer,top.subLanguage.length?top.subLanguage:
null);top.relevance>0&&(relevance+=result2.relevance),emitter.__addSublanguage(result2.
_emitter,result2.language)}__name(processSubLanguage,"processSubLanguage");function processBuffer(){
top.subLanguage!=null?processSubLanguage():processKeywords(),modeBuffer=""}__name(
processBuffer,"processBuffer");function emitKeyword(keyword,scope){keyword!==""&&
(emitter.startScope(scope),emitter.addText(keyword),emitter.endScope())}__name(emitKeyword,
"emitKeyword");function emitMultiClass(scope,match){let i=1,max=match.length-1;for(;i<=
max;){if(!scope._emit[i]){i++;continue}let klass=language.classNameAliases[scope[i]]||
scope[i],text=match[i];klass?emitKeyword(text,klass):(modeBuffer=text,processKeywords(),
modeBuffer=""),i++}}__name(emitMultiClass,"emitMultiClass");function startNewMode(mode,match){
return mode.scope&&typeof mode.scope=="string"&&emitter.openNode(language.classNameAliases[mode.
scope]||mode.scope),mode.beginScope&&(mode.beginScope._wrap?(emitKeyword(modeBuffer,
language.classNameAliases[mode.beginScope._wrap]||mode.beginScope._wrap),modeBuffer=
""):mode.beginScope._multi&&(emitMultiClass(mode.beginScope,match),modeBuffer="")),
top=Object.create(mode,{parent:{value:top}}),top}__name(startNewMode,"startNewMo\
de");function endOfMode(mode,match,matchPlusRemainder){let matched=startsWith(mode.
endRe,matchPlusRemainder);if(matched){if(mode["on:end"]){let resp=new Response(mode);
mode["on:end"](match,resp),resp.isMatchIgnored&&(matched=!1)}if(matched){for(;mode.
endsParent&&mode.parent;)mode=mode.parent;return mode}}if(mode.endsWithParent)return endOfMode(
mode.parent,match,matchPlusRemainder)}__name(endOfMode,"endOfMode");function doIgnore(lexeme){
return top.matcher.regexIndex===0?(modeBuffer+=lexeme[0],1):(resumeScanAtSamePosition=
!0,0)}__name(doIgnore,"doIgnore");function doBeginMatch(match){let lexeme=match[0],
newMode=match.rule,resp=new Response(newMode),beforeCallbacks=[newMode.__beforeBegin,
newMode["on:begin"]];for(let cb of beforeCallbacks)if(cb&&(cb(match,resp),resp.isMatchIgnored))
return doIgnore(lexeme);return newMode.skip?modeBuffer+=lexeme:(newMode.excludeBegin&&
(modeBuffer+=lexeme),processBuffer(),!newMode.returnBegin&&!newMode.excludeBegin&&
(modeBuffer=lexeme)),startNewMode(newMode,match),newMode.returnBegin?0:lexeme.length}
__name(doBeginMatch,"doBeginMatch");function doEndMatch(match){let lexeme=match[0],
matchPlusRemainder=codeToHighlight.substring(match.index),endMode=endOfMode(top,
match,matchPlusRemainder);if(!endMode)return NO_MATCH;let origin=top;top.endScope&&
top.endScope._wrap?(processBuffer(),emitKeyword(lexeme,top.endScope._wrap)):top.
endScope&&top.endScope._multi?(processBuffer(),emitMultiClass(top.endScope,match)):
origin.skip?modeBuffer+=lexeme:(origin.returnEnd||origin.excludeEnd||(modeBuffer+=
lexeme),processBuffer(),origin.excludeEnd&&(modeBuffer=lexeme));do top.scope&&emitter.
closeNode(),!top.skip&&!top.subLanguage&&(relevance+=top.relevance),top=top.parent;while(top!==
endMode.parent);return endMode.starts&&startNewMode(endMode.starts,match),origin.
returnEnd?0:lexeme.length}__name(doEndMatch,"doEndMatch");function processContinuations(){
let list=[];for(let current=top;current!==language;current=current.parent)current.
scope&&list.unshift(current.scope);list.forEach(item=>emitter.openNode(item))}__name(
processContinuations,"processContinuations");let lastMatch={};function processLexeme(textBeforeMatch,match){
let lexeme=match&&match[0];if(modeBuffer+=textBeforeMatch,lexeme==null)return processBuffer(),
0;if(lastMatch.type==="begin"&&match.type==="end"&&lastMatch.index===match.index&&
lexeme===""){if(modeBuffer+=codeToHighlight.slice(match.index,match.index+1),!SAFE_MODE){
let err=new Error(`0 width match regex (${languageName})`);throw err.languageName=
languageName,err.badRule=lastMatch.rule,err}return 1}if(lastMatch=match,match.type===
"begin")return doBeginMatch(match);if(match.type==="illegal"&&!ignoreIllegals){let err=new Error(
'Illegal lexeme "'+lexeme+'" for mode "'+(top.scope||"<unnamed>")+'"');throw err.
mode=top,err}else if(match.type==="end"){let processed=doEndMatch(match);if(processed!==
NO_MATCH)return processed}if(match.type==="illegal"&&lexeme==="")return 1;if(iterations>
1e5&&iterations>match.index*3)throw new Error("potential infinite loop, way more\
 iterations than matches");return modeBuffer+=lexeme,lexeme.length}__name(processLexeme,
"processLexeme");let language=getLanguage(languageName);if(!language)throw error(
LANGUAGE_NOT_FOUND.replace("{}",languageName)),new Error('Unknown language: "'+languageName+
'"');let md=compileLanguage(language),result="",top=continuation||md,continuations={},
emitter=new options.__emitter(options);processContinuations();let modeBuffer="",
relevance=0,index=0,iterations=0,resumeScanAtSamePosition=!1;try{if(language.__emitTokens)
language.__emitTokens(codeToHighlight,emitter);else{for(top.matcher.considerAll();;){
iterations++,resumeScanAtSamePosition?resumeScanAtSamePosition=!1:top.matcher.considerAll(),
top.matcher.lastIndex=index;let match=top.matcher.exec(codeToHighlight);if(!match)
break;let beforeMatch=codeToHighlight.substring(index,match.index),processedCount=processLexeme(
beforeMatch,match);index=match.index+processedCount}processLexeme(codeToHighlight.
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
dateClassName");function highlightElement(element){let node2=null,language=blockLanguage(
element);if(shouldNotHighlight(language))return;if(fire("before:highlightElement",
{el:element,language}),element.dataset.highlighted){console.log("Element previou\
sly highlighted. To highlight again, first unset `dataset.highlighted`.",element);
return}if(element.children.length>0&&(options.ignoreUnescapedHTML||(console.warn(
"One of your code blocks includes unescaped HTML. This is a potentially serious \
security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/\
security"),console.warn("The element with unescaped HTML:"),console.warn(element)),
options.throwUnescapedHTML))throw new HTMLInjectionError("One of your code block\
s includes unescaped HTML.",element.innerHTML);node2=element;let text=node2.textContent,
result=language?highlight2(text,{language,ignoreIllegals:!0}):highlightAuto(text);
element.innerHTML=result.value,element.dataset.highlighted="yes",updateClassName(
element,language,result.language),element.result={language:result.language,re:result.
relevance,relevance:result.relevance},result.secondBest&&(element.secondBest={language:result.
secondBest.language,relevance:result.secondBest.relevance}),fire("after:highligh\
tElement",{el:element,result,text})}__name(highlightElement,"highlightElement");
function configure(userOptions){options=inherit(options,userOptions)}__name(configure,
"configure");let initHighlighting=__name(()=>{highlightAll(),deprecated("10.6.0",
"initHighlighting() deprecated.  Use highlightAll() now.")},"initHighlighting");
function initHighlightingOnLoad(){highlightAll(),deprecated("10.6.0","initHighli\
ghtingOnLoad() deprecated.  Use highlightAll() now.")}__name(initHighlightingOnLoad,
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
!plugin["before:highlightElement"]&&(plugin["before:highlightElement"]=data=>{plugin["\
before:highlightBlock"](Object.assign({block:data.el},data))}),plugin["after:hig\
hlightBlock"]&&!plugin["after:highlightElement"]&&(plugin["after:highlightElemen\
t"]=data=>{plugin["after:highlightBlock"](Object.assign({block:data.el},data))})}
__name(upgradePluginAPI,"upgradePluginAPI");function addPlugin(plugin){upgradePluginAPI(
plugin),plugins.push(plugin)}__name(addPlugin,"addPlugin");function removePlugin(plugin){
let index=plugins.indexOf(plugin);index!==-1&&plugins.splice(index,1)}__name(removePlugin,
"removePlugin");function fire(event,args){let cb=event;plugins.forEach(function(plugin){
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
slice2=Array.prototype.slice,swizzle=module.exports=__name(function(args){for(var results=[],
i=0,len=args.length;i<len;i++){var arg=args[i];isArrayish(arg)?results=concat.call(
results,slice2.call(arg)):results.push(arg)}return results},"swizzle");swizzle.wrap=
function(fn){return function(){return fn(swizzle(arguments))}}}});var require_color_string=__commonJS({"node_modules/color-string/index.js"(exports,module){
var colorNames=require_color_name(),swizzle=require_simple_swizzle(),hasOwnProperty=Object.
hasOwnProperty,reverseNames=Object.create(null);for(name in colorNames)hasOwnProperty.
call(colorNames,name)&&(reverseNames[colorNames[name]]=name);var name,cs=module.
exports={to:{},get:{}};cs.get=function(string){var prefix=string.substring(0,3).
toLowerCase(),val,model;switch(prefix){case"hsl":val=cs.get.hsl(string),model="h\
sl";break;case"hwb":val=cs.get.hwb(string),model="hwb";break;default:val=cs.get.
rgb(string),model="rgb";break}return val?{model,value:val}:null};cs.get.rgb=function(string){
if(!string)return null;var abbr=/^#([a-f0-9]{3,4})$/i,hex=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
rgba=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
per=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
keyword=/^(\w+)$/,rgb=[0,0,0,1],match,i,hexAlpha;if(match=string.match(hex)){for(hexAlpha=
match[2],match=match[1],i=0;i<3;i++){var i2=i*2;rgb[i]=parseInt(match.slice(i2,i2+
2),16)}hexAlpha&&(rgb[3]=parseInt(hexAlpha,16)/255)}else if(match=string.match(abbr)){
for(match=match[1],hexAlpha=match[3],i=0;i<3;i++)rgb[i]=parseInt(match[i]+match[i],
16);hexAlpha&&(rgb[3]=parseInt(hexAlpha+hexAlpha,16)/255)}else if(match=string.match(
rgba)){for(i=0;i<3;i++)rgb[i]=parseInt(match[i+1],0);match[4]&&(match[5]?rgb[3]=
parseFloat(match[4])*.01:rgb[3]=parseFloat(match[4]))}else if(match=string.match(
per)){for(i=0;i<3;i++)rgb[i]=Math.round(parseFloat(match[i+1])*2.55);match[4]&&(match[5]?
rgb[3]=parseFloat(match[4])*.01:rgb[3]=parseFloat(match[4]))}else return(match=string.
match(keyword))?match[1]==="transparent"?[0,0,0,0]:hasOwnProperty.call(colorNames,
match[1])?(rgb=colorNames[match[1]],rgb[3]=1,rgb):null:null;for(i=0;i<3;i++)rgb[i]=
clamp(rgb[i],0,255);return rgb[3]=clamp(rgb[3],0,1),rgb};cs.get.hsl=function(string){
if(!string)return null;var hsl=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
match=string.match(hsl);if(match){var alpha=parseFloat(match[4]),h=(parseFloat(match[1])%
360+360)%360,s=clamp(parseFloat(match[2]),0,100),l=clamp(parseFloat(match[3]),0,
100),a=clamp(isNaN(alpha)?1:alpha,0,1);return[h,s,l,a]}return null};cs.get.hwb=function(string){
if(!string)return null;var hwb=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
match=string.match(hwb);if(match){var alpha=parseFloat(match[4]),h=(parseFloat(match[1])%
360+360)%360,w=clamp(parseFloat(match[2]),0,100),b=clamp(parseFloat(match[3]),0,
100),a=clamp(isNaN(alpha)?1:alpha,0,1);return[h,w,b,a]}return null};cs.to.hex=function(){
var rgba=swizzle(arguments);return"#"+hexDouble(rgba[0])+hexDouble(rgba[1])+hexDouble(
rgba[2])+(rgba[3]<1?hexDouble(Math.round(rgba[3]*255)):"")};cs.to.rgb=function(){
var rgba=swizzle(arguments);return rgba.length<4||rgba[3]===1?"rgb("+Math.round(
rgba[0])+", "+Math.round(rgba[1])+", "+Math.round(rgba[2])+")":"rgba("+Math.round(
rgba[0])+", "+Math.round(rgba[1])+", "+Math.round(rgba[2])+", "+rgba[3]+")"};cs.
to.rgb.percent=function(){var rgba=swizzle(arguments),r=Math.round(rgba[0]/255*100),
g=Math.round(rgba[1]/255*100),b=Math.round(rgba[2]/255*100);return rgba.length<4||
rgba[3]===1?"rgb("+r+"%, "+g+"%, "+b+"%)":"rgba("+r+"%, "+g+"%, "+b+"%, "+rgba[3]+
")"};cs.to.hsl=function(){var hsla=swizzle(arguments);return hsla.length<4||hsla[3]===
1?"hsl("+hsla[0]+", "+hsla[1]+"%, "+hsla[2]+"%)":"hsla("+hsla[0]+", "+hsla[1]+"%\
, "+hsla[2]+"%, "+hsla[3]+")"};cs.to.hwb=function(){var hwba=swizzle(arguments),
a="";return hwba.length>=4&&hwba[3]!==1&&(a=", "+hwba[3]),"hwb("+hwba[0]+", "+hwba[1]+
"%, "+hwba[2]+"%"+a+")"};cs.to.keyword=function(rgb){return reverseNames[rgb.slice(
0,3)]};function clamp(num,min,max){return Math.min(Math.max(min,num),max)}__name(
clamp,"clamp");function hexDouble(num){var str=Math.round(num).toString(16).toUpperCase();
return str.length<2?"0"+str:str}__name(hexDouble,"hexDouble")}});var require_conversions=__commonJS({"node_modules/color-convert/conversions.js"(exports,module){
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
255,v=Math.max(r,g,b),diff=v-Math.min(r,g,b),diffc=__name(function(c){return(v-c)/
6/diff+1/2},"diffc");return diff===0?(h=0,s=0):(s=diff/v,rdif=diffc(r),gdif=diffc(
g),bdif=diffc(b),r===v?h=bdif-gdif:g===v?h=1/3+rdif-bdif:b===v&&(h=2/3+gdif-rdif),
h<0?h+=1:h>1&&(h-=1)),[h*360,s*100,v*100]};convert.rgb.hwb=function(rgb){let r=rgb[0],
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
000000".substring(string.length)+string};convert.hex.rgb=function(args){let match=args.
toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!match)return[0,0,0];let colorString=match[0];
match[0].length===3&&(colorString=colorString.split("").map(char2=>char2+char2).
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
length,i=0;i<len;i++){let adjacent=adjacents[i],node2=graph[adjacent];node2.distance===
-1&&(node2.distance=graph[current].distance+1,node2.parent=current,queue.unshift(
adjacent))}}return graph}__name(deriveBFS,"deriveBFS");function link(from2,to){return function(args){
return to(from2(args))}}__name(link,"link");function wrapConversion(toModel,graph){
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
sort().join("")]=model;var limiters={};function Color4(object,model){if(!(this instanceof
Color4))return new Color4(object,model);if(model&&model in skippedModels&&(model=
null),model&&!(model in convert))throw new Error("Unknown model: "+model);let i,
channels;if(object==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(object instanceof
Color4)this.model=object.model,this.color=[...object.color],this.valpha=object.valpha;else if(typeof object==
"string"){let result=colorString.get(object);if(result===null)throw new Error("U\
nable to parse color from string: "+object);this.model=result.model,channels=convert[this.
model].channels,this.color=result.value.slice(0,channels),this.valpha=typeof result.
value[channels]=="number"?result.value[channels]:1}else if(object.length>0){this.
model=model||"rgb",channels=convert[this.model].channels;let newArray=Array.prototype.
slice.call(object,0,channels);this.color=zeroArray(newArray,channels),this.valpha=
typeof object[channels]=="number"?object[channels]:1}else if(typeof object=="num\
ber")this.model="rgb",this.color=[object>>16&255,object>>8&255,object&255],this.
valpha=1;else{this.valpha=1;let keys=Object.keys(object);"alpha"in object&&(keys.
splice(keys.indexOf("alpha"),1),this.valpha=typeof object.alpha=="number"?object.
alpha:0);let hashedKeys=keys.sort().join("");if(!(hashedKeys in hashedModelKeys))
throw new Error("Unable to parse color from object: "+JSON.stringify(object));this.
model=hashedModelKeys[hashedKeys];let{labels}=convert[this.model],color2=[];for(i=
0;i<labels.length;i++)color2.push(object[labels[i]]);this.color=zeroArray(color2)}
if(limiters[this.model])for(channels=convert[this.model].channels,i=0;i<channels;i++){
let limit=limiters[this.model][i];limit&&(this.color[i]=limit(this.color[i]))}this.
valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}__name(
Color4,"Color");Color4.prototype={toString(){return this.string()},toJSON(){return this[this.
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
this.valpha),rgb},round(places){return places=Math.max(places||0,0),new Color4([
...this.color.map(roundToPlace(places)),this.valpha],this.model)},alpha(value){return value!==
void 0?new Color4([...this.color,Math.max(0,Math.min(1,value))],this.model):this.
valpha},red:getset("rgb",0,maxfn(255)),green:getset("rgb",1,maxfn(255)),blue:getset(
"rgb",2,maxfn(255)),hue:getset(["hsl","hsv","hsl","hwb","hcg"],0,value=>(value%360+
360)%360),saturationl:getset("hsl",1,maxfn(100)),lightness:getset("hsl",2,maxfn(
100)),saturationv:getset("hsv",1,maxfn(100)),value:getset("hsv",2,maxfn(100)),chroma:getset(
"hcg",1,maxfn(100)),gray:getset("hcg",2,maxfn(100)),white:getset("hwb",1,maxfn(100)),
wblack:getset("hwb",2,maxfn(100)),cyan:getset("cmyk",0,maxfn(100)),magenta:getset(
"cmyk",1,maxfn(100)),yellow:getset("cmyk",2,maxfn(100)),black:getset("cmyk",3,maxfn(
100)),x:getset("xyz",0,maxfn(95.047)),y:getset("xyz",1,maxfn(100)),z:getset("xyz",
2,maxfn(108.833)),l:getset("lab",0,maxfn(100)),a:getset("lab",1),b:getset("lab",
2),keyword(value){return value!==void 0?new Color4(value):convert[this.model].keyword(
this.color)},hex(value){return value!==void 0?new Color4(value):colorString.to.hex(
this.rgb().round().color)},hexa(value){if(value!==void 0)return new Color4(value);
let rgbArray=this.rgb().round().color,alphaHex=Math.round(this.valpha*255).toString(
16).toUpperCase();return alphaHex.length===1&&(alphaHex="0"+alphaHex),colorString.
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
let rgb=this.rgb().color,value=rgb[0]*.3+rgb[1]*.59+rgb[2]*.11;return Color4.rgb(
value,value,value)},fade(ratio){return this.alpha(this.valpha-this.valpha*ratio)},
opaquer(ratio){return this.alpha(this.valpha+this.valpha*ratio)},rotate(degrees){
let hsl=this.hsl(),hue=hsl.color[0];return hue=(hue+degrees)%360,hue=hue<0?360+hue:
hue,hsl.color[0]=hue,hsl},mix(mixinColor,weight){if(!mixinColor||!mixinColor.rgb)
throw new Error('Argument to "mix" was not a Color instance, but rather an insta\
nce of '+typeof mixinColor);let color1=mixinColor.rgb(),color2=this.rgb(),p=weight===
void 0?.5:weight,w=2*p-1,a=color1.alpha()-color2.alpha(),w1=((w*a===-1?w:(w+a)/(1+
w*a))+1)/2,w2=1-w1;return Color4.rgb(w1*color1.red()+w2*color2.red(),w1*color1.green()+
w2*color2.green(),w1*color1.blue()+w2*color2.blue(),color1.alpha()*p+color2.alpha()*
(1-p))}};for(let model of Object.keys(convert)){if(skippedModels.includes(model))
continue;let{channels}=convert[model];Color4.prototype[model]=function(...args){
return this.model===model?new Color4(this):args.length>0?new Color4(args,model):
new Color4([...assertArray(convert[this.model][model].raw(this.color)),this.valpha],
model)},Color4[model]=function(...args){let color2=args[0];return typeof color2==
"number"&&(color2=zeroArray(args,channels)),new Color4(color2,model)}}function roundTo(number,places){
return Number(number.toFixed(places))}__name(roundTo,"roundTo");function roundToPlace(places){
return function(number){return roundTo(number,places)}}__name(roundToPlace,"roun\
dToPlace");function getset(model,channel,modifier){model=Array.isArray(model)?model:
[model];for(let m of model)(limiters[m]||(limiters[m]=[]))[channel]=modifier;return model=
model[0],function(value){let result;return value!==void 0?(modifier&&(value=modifier(
value)),result=this[model](),result.color[channel]=value,result):(result=this[model]().
color[channel],modifier&&(result=modifier(result)),result)}}__name(getset,"getse\
t");function maxfn(max){return function(v){return Math.max(0,Math.min(max,v))}}__name(
maxfn,"maxfn");function assertArray(value){return Array.isArray(value)?value:[value]}
__name(assertArray,"assertArray");function zeroArray(array,length2){for(let i=0;i<
length2;i++)typeof array[i]!="number"&&(array[i]=0);return array}__name(zeroArray,
"zeroArray");module.exports=Color4}});var import_core=__toESM(require_core(),1);var core_default=import_core.default;var IDENT_RE="[A-Za-z$_][0-9A-Za-z$_]*",KEYWORDS=["as","in","of","if","for","whi\
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
hasClosingTag=__name((match,{after})=>{let tag="</"+match[0].slice(1);return match.
input.indexOf(tag,after)!==-1},"hasClosingTag"),IDENT_RE$1=IDENT_RE,FRAGMENT={begin:"\
<>",end:"</>"},XML_SELF_CLOSING=/<[A-Za-z0-9\\._:-]+\s*\/>/,XML_TAG={begin:/<[A-Za-z0-9\\._:-]+/,
end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(match,response)=>{let afterMatchIndex=match[0].
length+match.index,nextChar=match.input[afterMatchIndex];if(nextChar==="<"||nextChar===
","){response.ignoreMatch();return}nextChar===">"&&(hasClosingTag(match,{after:afterMatchIndex})||
response.ignoreMatch());let m,afterMatch=match.input.substring(afterMatchIndex);
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
string",begin:"`",end:"`",contains:[hljs.BACKSLASH_ESCAPE,SUBST]},COMMENT2={className:"\
comment",variants:[hljs.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"\
(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"\
type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"\
variable",begin:IDENT_RE$1+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,
relevance:0}]}]}),hljs.C_BLOCK_COMMENT_MODE,hljs.C_LINE_COMMENT_MODE]},SUBST_INTERNALS=[
hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,HTML_TEMPLATE,CSS_TEMPLATE,GRAPHQL_TEMPLATE,
TEMPLATE_STRING,{match:/\$\d+/},NUMBER];SUBST.contains=SUBST_INTERNALS.concat({begin:/\{/,
end:/\}/,keywords:KEYWORDS$1,contains:["self"].concat(SUBST_INTERNALS)});let SUBST_AND_COMMENTS=[].
concat(COMMENT2,SUBST.contains),PARAMS_CONTAINS=SUBST_AND_COMMENTS.concat([{begin:/\(/,
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
GRAPHQL_TEMPLATE,TEMPLATE_STRING,COMMENT2,{match:/\$\d+/},NUMBER,CLASS_REFERENCE,
{className:"attr",begin:IDENT_RE$1+regex.lookahead(":"),relevance:0},FUNCTION_VARIABLE,
{begin:"("+hljs.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"retur\
n throw case",relevance:0,contains:[COMMENT2,hljs.REGEXP_MODE,{className:"functi\
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
regex,hasClosingTag=__name((match,{after})=>{let tag="</"+match[0].slice(1);return match.
input.indexOf(tag,after)!==-1},"hasClosingTag"),IDENT_RE$1=IDENT_RE2,FRAGMENT={begin:"\
<>",end:"</>"},XML_SELF_CLOSING=/<[A-Za-z0-9\\._:-]+\s*\/>/,XML_TAG={begin:/<[A-Za-z0-9\\._:-]+/,
end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(match,response)=>{let afterMatchIndex=match[0].
length+match.index,nextChar=match.input[afterMatchIndex];if(nextChar==="<"||nextChar===
","){response.ignoreMatch();return}nextChar===">"&&(hasClosingTag(match,{after:afterMatchIndex})||
response.ignoreMatch());let m,afterMatch=match.input.substring(afterMatchIndex);
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
string",begin:"`",end:"`",contains:[hljs.BACKSLASH_ESCAPE,SUBST]},COMMENT2={className:"\
comment",variants:[hljs.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"\
(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"\
type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"\
variable",begin:IDENT_RE$1+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,
relevance:0}]}]}),hljs.C_BLOCK_COMMENT_MODE,hljs.C_LINE_COMMENT_MODE]},SUBST_INTERNALS=[
hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,HTML_TEMPLATE,CSS_TEMPLATE,GRAPHQL_TEMPLATE,
TEMPLATE_STRING,{match:/\$\d+/},NUMBER];SUBST.contains=SUBST_INTERNALS.concat({begin:/\{/,
end:/\}/,keywords:KEYWORDS$1,contains:["self"].concat(SUBST_INTERNALS)});let SUBST_AND_COMMENTS=[].
concat(COMMENT2,SUBST.contains),PARAMS_CONTAINS=SUBST_AND_COMMENTS.concat([{begin:/\(/,
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
HTML_TEMPLATE,CSS_TEMPLATE,GRAPHQL_TEMPLATE,TEMPLATE_STRING,COMMENT2,{match:/\$\d+/},
NUMBER,CLASS_REFERENCE,{className:"attr",begin:IDENT_RE$1+regex.lookahead(":"),relevance:0},
FUNCTION_VARIABLE,{begin:"("+hljs.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",
keywords:"return throw case",relevance:0,contains:[COMMENT2,hljs.REGEXP_MODE,{className:"\
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
css),core_default.highlightAll()}__name(baseLib,"baseLib");baseLib();function sleepSync(ms){let end=new Date().getTime()+ms,time=new Date().getTime();
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
stringify,"stringify");function stylis(css6){return serialize(compile(css6),stringify)}__name(stylis,"s\
tylis");var Isolator=class{static{__name(this,"Isolator")}constructor(element){this.element=
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
`)}set css(css6){this.styles=[css6],this.tagName&&this.cssStyleSheet.replaceSync(
this.adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`))}get css(){return this.
styles.join(`
`)}define(tagName){this.tagName=tagName,customElements.define(tagName,this.adapterClass),
this.initStyle()}initStyle(){this.cssStyleSheet.replaceSync(this.adapterClass.cssProcess(
`${this.tagName} { ${this.allCSS} }`)),document.adoptedStyleSheets.push(this.cssStyleSheet)}addStyle(css6){
if(this.styles.push(css6),this.tagName){let rule=`${this.tagName} { ${css6} }`,processedCss=this.
adapterClass.cssProcess(rule);this.cssStyleSheet.replaceSync(`
        ${this.tagName} { ${this.allCSS} }
        ${processedCss}
      `)}}},AdapterObject=class{constructor(){this.cssStyleSheet=new CSSStyleSheet;
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
this._adapter}static cssProcess(css6){return css6}static set css(css6){this.adapter.
css=css6}static get css(){return this.adapter.css}static get tagName(){return this.
adapter.tagName}static addStyle(css6){this.adapter.addStyle(css6)}static define(tagName){
this.adapter.define(tagName)}set css(css6){this._adapter.styles=[css6],this.classList.
add(this._adapter.uuid);let processedCss=this._adapter._class.cssProcess(`${this.
tagName}.${this._adapter.objectClassSelector} { ${css6} }`);this._adapter.cssStyleSheet.
replaceSync(processedCss)}get css(){let css6=this.getAttribute("css")||"";if(css6)
return css6;for(let rule of this._adapter.cssStyleSheet.cssRules)css6+=rule.cssText+
`
`;return css6}addStyle(css6){this._adapter.styles.push(css6),this.classList.add(
this._adapter.uuid);let processedCss=this._adapter._class.cssProcess(`${this.tagName}\
.${this._adapter.objectClassSelector} { ${css6} }`);this._adapter.cssStyleSheet.
insertRule(processedCss,this._adapter.cssStyleSheet.cssRules.length)}connectedCallback(){
super.connectedCallback&&super.connectedCallback();let css6=this.getAttribute("c\
ss");css6&&(this.css=css6);let rootNode=this.getRootNode();rootNode.adoptedStyleSheets.
indexOf(this._adapter._class.adapter.cssStyleSheet)===-1&&rootNode.adoptedStyleSheets.
push(this._adapter._class.adapter.cssStyleSheet),rootNode.adoptedStyleSheets.indexOf(
this._adapter.cssStyleSheet)===-1&&rootNode.adoptedStyleSheets.push(this._adapter.
cssStyleSheet)}remove(){let rootNode=this.getRootNode(),i=rootNode.adoptedStyleSheets.
indexOf(this._adapter.cssStyleSheet);rootNode.adoptedStyleSheets.splice(i,1),super.
remove()}}}__name(AdapterMixin,"AdapterMixin");var Adapter=class extends IsolatorMixin(
AdapterMixin(HTMLElement)){static{__name(this,"Adapter")}static cssProcess(css6){
return stylis(css6)}};var import_color=__toESM(require_color(),1);var css2=String.raw;function bgColor(color2){return css2`
        background-color: ${color2};
        color: ${(0,import_color.default)(color2).isDark()?"white":"black"};
    `.trim()}__name(bgColor,"bgColor");function lift(level,color2="black"){return`\
filter: drop-shadow(0 0 ${level*2}px ${color2});`}__name(lift,"lift");var aspectRatio=__name((ratio="1/1")=>css2`
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
    `.trim(),"aspectRatio");function fontFluid({vwMin=300,vwMax=1200,fontSizeMin=16,
fontSizeMax=18}={}){let viewportRatio=`(100vw - ${vwMin}px) / (${vwMax} - ${vwMin}\
)`,fontScaleRatio=`(${fontSizeMax} - ${fontSizeMin}) * ${viewportRatio}`;return css2`
        font-size: ${fontSizeMin}px;
        @media screen and (min-width: ${vwMin}px) {
            font-size: calc(
                ${fontSizeMin}px + ${fontScaleRatio}
            );
        }
        @media screen and (min-width: ${vwMax}px) {
            font-size: ${fontSizeMax}px;
        }
    `.trim()}__name(fontFluid,"fontFluid");var color={blue:"#3584e4",green:"#33d17a",yellow:"#f6d32d",orange:"#ff7800",red:"\
#e01b24",purple:"#9141ac",violet:"#9141ac",brown:"#986a44",light:"#deddda",dark:"\
#3d3846"};function baseStyle(){let __base_url=new URL(import.meta.url),__fira_sans_url=new URL(
"asset/font/FiraSans-Regular.ttf",__base_url.href),__fira_code_url=new URL("asse\
t/font/FiraCode-Variable.ttf",__base_url.href),style=new CSSStyleSheet;document.
adoptedStyleSheets.push(style),style.replaceSync(stylis(`
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
  `))}__name(baseStyle,"baseStyle");baseStyle();var _Icon=class{static{__name(this,"_Icon")}set name(name){this.element.setAttribute(
"name",name),this.render()}get name(){return this.element.getAttribute("name")}constructor(element){
this._class=this.constructor,this.element=element,this.render(),new MutationObserver(
(mutationRecords,observer2)=>{this.observerCallback(mutationRecords,observer2)}).
observe(this.element,{attributes:!0})}observerCallback(mutationRecords,observer){
for(let mutation of mutationRecords)mutation.type==="attributes"&&mutation.attributeName===
"name"&&this.render()}render(){if(!this._class.url)return;let svg=document.createElementNS(
"http://www.w3.org/2000/svg","svg"),use=document.createElementNS("http://www.w3.\
org/2000/svg","use");this.element.innerHTML="",svg.style.width="1em",svg.style.height=
"1em",this.element.appendChild(svg),use.setAttributeNS("http://www.w3.org/1999/x\
link","xlink:href",`${this._class.url}#${this.name}`),svg.appendChild(use)}};function DefIconMixin({
url,objectField="deficon"},Base){class __Icon extends _Icon{static{__name(this,"\
__Icon")}}return __Icon.url=url,class extends Base{constructor(...args){super(...args),
this[objectField]=new __Icon(this)}}}__name(DefIconMixin,"DefIconMixin");function DefIcon(param){
return class extends DefIconMixin(param,HTMLElement){}}__name(DefIcon,"DefIcon");var CodeBlock=class extends Adapter{static{__name(this,"CodeBlock")}static{this.
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
        ${bgColor(color.yellow)}
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
    `}};var import_color2=__toESM(require_color(),1);var css3=String.raw,BlockQuote=class extends Adapter{static{__name(this,"BlockQu\
ote")}static{this.css=css3`
    display: flex;
    flex-wrap: wrap;

    blockquote {
      margin: 0;
      margin-top: 1rem;
      padding: 0rem 1rem;
      background-color: ${(0,import_color2.default)(color.yellow).alpha(.2)};
      border-left: 0.25em solid ${color.yellow};
      border-bottom-left-radius: 0.5rem;
    }
  `}};var import_color3=__toESM(require_color(),1);var css4=String.raw,buttonStyle=__name(color2=>css4`
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
      min-height: 2em;
      ${lift(1,"#555")}
      ${bgColor(color2)}
      &:hover {
        background-color: ${(0,import_color3.default)(color2).lighten(.1).saturate(
.1)};
        ${lift(1.5,"#555")}
      }
      &:active {
        background-color: ${(0,import_color3.default)(color2).darken(.1).saturate(
-.1)};
        ${lift(0,"#555")}
      }
    }
  `,"buttonStyle"),Button=class extends Adapter{constructor(){super();this.initialHTML=
this.innerHTML;this.render()}static{__name(this,"Button")}static{this.css=buttonStyle(
color.blue)}render(){this.innerHTML=`<button>${this.initialHTML}</button>`}};var css5=String.raw;function baseComponents(){let __base_url=new URL(import.meta.
url),icomoon_url=new URL("asset/icon/icomoon/symbol-defs.svg",__base_url).toString();
class Icon extends AdapterMixin(DefIcon({url:icomoon_url})){static{__name(this,"\
Icon")}static cssProcess(css6){return stylis(css6)}static{this.css=css5`
      & {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    `}}Icon.define("el-icon"),CodeBlock.define("el-code-block"),Button.define("e\
l-button"),Button.addStyle(`
    el-icon {
      margin-top: -0.17rem;
    }
  `),BlockQuote.define("el-blockquote")}__name(baseComponents,"baseComponents");
baseComponents();function styleClass(){let cssStyleSheet=new CSSStyleSheet;document.adoptedStyleSheets.
push(cssStyleSheet),cssStyleSheet.replaceSync(`
    .aspect-ratio-21-9 {
        display: flex;
        ${aspectRatio("21/9")}
        img {
            width: 100%;
            object-fit: cover;
        }
    }
    `)}__name(styleClass,"styleClass");styleClass();function pageReload(to_base_url){let __file_url=new URL(import.meta.url),__event_source=new URL(
`${to_base_url}esbuild`,__file_url.href);["0.0.0.0","127.0.0.1","localhost"].includes(
__file_url.hostname)&&new EventSource(__event_source).addEventListener("change",
()=>location.reload())}__name(pageReload,"pageReload");pageReload("./");window.addEventListener("load",()=>{document.body.style.visibility=
"visible"});
//# sourceMappingURL=base.js.map
