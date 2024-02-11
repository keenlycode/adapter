var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/mocha/mocha.js
var require_mocha = __commonJS({
  "node_modules/mocha/mocha.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.mocha = factory());
    })(exports, function() {
      "use strict";
      var global$2 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      var global$1 = typeof global$2 !== "undefined" ? global$2 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      function defaultSetTimout$1() {
        throw new Error("setTimeout has not been defined");
      }
      __name(defaultSetTimout$1, "defaultSetTimout$1");
      function defaultClearTimeout$1() {
        throw new Error("clearTimeout has not been defined");
      }
      __name(defaultClearTimeout$1, "defaultClearTimeout$1");
      var cachedSetTimeout$1 = defaultSetTimout$1;
      var cachedClearTimeout$1 = defaultClearTimeout$1;
      if (typeof global$1.setTimeout === "function") {
        cachedSetTimeout$1 = setTimeout;
      }
      if (typeof global$1.clearTimeout === "function") {
        cachedClearTimeout$1 = clearTimeout;
      }
      function runTimeout$1(fun) {
        if (cachedSetTimeout$1 === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout$1 === defaultSetTimout$1 || !cachedSetTimeout$1) && setTimeout) {
          cachedSetTimeout$1 = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout$1(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout$1.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout$1.call(this, fun, 0);
          }
        }
      }
      __name(runTimeout$1, "runTimeout$1");
      function runClearTimeout$1(marker) {
        if (cachedClearTimeout$1 === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout$1 === defaultClearTimeout$1 || !cachedClearTimeout$1) && clearTimeout) {
          cachedClearTimeout$1 = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout$1(marker);
        } catch (e) {
          try {
            return cachedClearTimeout$1.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout$1.call(this, marker);
          }
        }
      }
      __name(runClearTimeout$1, "runClearTimeout$1");
      var queue$1 = [];
      var draining$1 = false;
      var currentQueue$1;
      var queueIndex$1 = -1;
      function cleanUpNextTick$1() {
        if (!draining$1 || !currentQueue$1) {
          return;
        }
        draining$1 = false;
        if (currentQueue$1.length) {
          queue$1 = currentQueue$1.concat(queue$1);
        } else {
          queueIndex$1 = -1;
        }
        if (queue$1.length) {
          drainQueue$1();
        }
      }
      __name(cleanUpNextTick$1, "cleanUpNextTick$1");
      function drainQueue$1() {
        if (draining$1) {
          return;
        }
        var timeout2 = runTimeout$1(cleanUpNextTick$1);
        draining$1 = true;
        var len = queue$1.length;
        while (len) {
          currentQueue$1 = queue$1;
          queue$1 = [];
          while (++queueIndex$1 < len) {
            if (currentQueue$1) {
              currentQueue$1[queueIndex$1].run();
            }
          }
          queueIndex$1 = -1;
          len = queue$1.length;
        }
        currentQueue$1 = null;
        draining$1 = false;
        runClearTimeout$1(timeout2);
      }
      __name(drainQueue$1, "drainQueue$1");
      function nextTick$1(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue$1.push(new Item$1(fun, args));
        if (queue$1.length === 1 && !draining$1) {
          runTimeout$1(drainQueue$1);
        }
      }
      __name(nextTick$1, "nextTick$1");
      function Item$1(fun, array2) {
        this.fun = fun;
        this.array = array2;
      }
      __name(Item$1, "Item$1");
      Item$1.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      var title$1 = "browser";
      var platform$1 = "browser";
      var browser$4 = true;
      var env$1 = {};
      var argv$1 = [];
      var version$2 = "";
      var versions$1 = {};
      var release$1 = {};
      var config$1 = {};
      function noop$1() {
      }
      __name(noop$1, "noop$1");
      var on$1 = noop$1;
      var addListener$1 = noop$1;
      var once$1 = noop$1;
      var off$1 = noop$1;
      var removeListener$1 = noop$1;
      var removeAllListeners$1 = noop$1;
      var emit$1 = noop$1;
      function binding$1(name2) {
        throw new Error("process.binding is not supported");
      }
      __name(binding$1, "binding$1");
      function cwd$1() {
        return "/";
      }
      __name(cwd$1, "cwd$1");
      function chdir$1(dir) {
        throw new Error("process.chdir is not supported");
      }
      __name(chdir$1, "chdir$1");
      function umask$1() {
        return 0;
      }
      __name(umask$1, "umask$1");
      var performance$1 = global$1.performance || {};
      var performanceNow$1 = performance$1.now || performance$1.mozNow || performance$1.msNow || performance$1.oNow || performance$1.webkitNow || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      function hrtime$1(previousTimestamp) {
        var clocktime = performanceNow$1.call(performance$1) * 1e-3;
        var seconds = Math.floor(clocktime);
        var nanoseconds = Math.floor(clocktime % 1 * 1e9);
        if (previousTimestamp) {
          seconds = seconds - previousTimestamp[0];
          nanoseconds = nanoseconds - previousTimestamp[1];
          if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
          }
        }
        return [seconds, nanoseconds];
      }
      __name(hrtime$1, "hrtime$1");
      var startTime$1 = /* @__PURE__ */ new Date();
      function uptime$1() {
        var currentTime = /* @__PURE__ */ new Date();
        var dif = currentTime - startTime$1;
        return dif / 1e3;
      }
      __name(uptime$1, "uptime$1");
      var process2 = {
        nextTick: nextTick$1,
        title: title$1,
        browser: browser$4,
        env: env$1,
        argv: argv$1,
        version: version$2,
        versions: versions$1,
        on: on$1,
        addListener: addListener$1,
        once: once$1,
        off: off$1,
        removeListener: removeListener$1,
        removeAllListeners: removeAllListeners$1,
        emit: emit$1,
        binding: binding$1,
        cwd: cwd$1,
        chdir: chdir$1,
        umask: umask$1,
        hrtime: hrtime$1,
        platform: platform$1,
        release: release$1,
        config: config$1,
        uptime: uptime$1
      };
      var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      function getAugmentedNamespace(n) {
        if (n.__esModule)
          return n;
        var a = Object.defineProperty({}, "__esModule", { value: true });
        Object.keys(n).forEach(function(k) {
          var d2 = Object.getOwnPropertyDescriptor(n, k);
          Object.defineProperty(a, k, d2.get ? d2 : {
            enumerable: true,
            get: function() {
              return n[k];
            }
          });
        });
        return a;
      }
      __name(getAugmentedNamespace, "getAugmentedNamespace");
      function commonjsRequire(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
      }
      __name(commonjsRequire, "commonjsRequire");
      var domain;
      function EventHandlers() {
      }
      __name(EventHandlers, "EventHandlers");
      EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
      function EventEmitter$2() {
        EventEmitter$2.init.call(this);
      }
      __name(EventEmitter$2, "EventEmitter$2");
      EventEmitter$2.EventEmitter = EventEmitter$2;
      EventEmitter$2.usingDomains = false;
      EventEmitter$2.prototype.domain = void 0;
      EventEmitter$2.prototype._events = void 0;
      EventEmitter$2.prototype._maxListeners = void 0;
      EventEmitter$2.defaultMaxListeners = 10;
      EventEmitter$2.init = function() {
        this.domain = null;
        if (EventEmitter$2.usingDomains) {
          if (domain.active)
            ;
        }
        if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter$2.prototype.setMaxListeners = /* @__PURE__ */ __name(function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || isNaN(n))
          throw new TypeError('"n" argument must be a positive number');
        this._maxListeners = n;
        return this;
      }, "setMaxListeners");
      function $getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter$2.defaultMaxListeners;
        return that._maxListeners;
      }
      __name($getMaxListeners, "$getMaxListeners");
      EventEmitter$2.prototype.getMaxListeners = /* @__PURE__ */ __name(function getMaxListeners() {
        return $getMaxListeners(this);
      }, "getMaxListeners");
      function emitNone(handler, isFn, self2) {
        if (isFn)
          handler.call(self2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2);
        }
      }
      __name(emitNone, "emitNone");
      function emitOne(handler, isFn, self2, arg1) {
        if (isFn)
          handler.call(self2, arg1);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1);
        }
      }
      __name(emitOne, "emitOne");
      function emitTwo(handler, isFn, self2, arg1, arg2) {
        if (isFn)
          handler.call(self2, arg1, arg2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1, arg2);
        }
      }
      __name(emitTwo, "emitTwo");
      function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
        if (isFn)
          handler.call(self2, arg1, arg2, arg3);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1, arg2, arg3);
        }
      }
      __name(emitThree, "emitThree");
      function emitMany(handler, isFn, self2, args) {
        if (isFn)
          handler.apply(self2, args);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].apply(self2, args);
        }
      }
      __name(emitMany, "emitMany");
      EventEmitter$2.prototype.emit = /* @__PURE__ */ __name(function emit2(type) {
        var er, handler, len, args, i, events, domain2;
        var doError = type === "error";
        events = this._events;
        if (events)
          doError = doError && events.error == null;
        else if (!doError)
          return false;
        domain2 = this.domain;
        if (doError) {
          er = arguments[1];
          if (domain2) {
            if (!er)
              er = new Error('Uncaught, unspecified "error" event');
            er.domainEmitter = this;
            er.domain = domain2;
            er.domainThrown = false;
            domain2.emit("error", er);
          } else if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
          return false;
        }
        handler = events[type];
        if (!handler)
          return false;
        var isFn = typeof handler === "function";
        len = arguments.length;
        switch (len) {
          case 1:
            emitNone(handler, isFn, this);
            break;
          case 2:
            emitOne(handler, isFn, this, arguments[1]);
            break;
          case 3:
            emitTwo(handler, isFn, this, arguments[1], arguments[2]);
            break;
          case 4:
            emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
            break;
          default:
            args = new Array(len - 1);
            for (i = 1; i < len; i++)
              args[i - 1] = arguments[i];
            emitMany(handler, isFn, this, args);
        }
        return true;
      }, "emit");
      function _addListener(target, type, listener, prepend) {
        var m2;
        var events;
        var existing;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = target._events;
        if (!events) {
          events = target._events = new EventHandlers();
          target._eventsCount = 0;
        } else {
          if (events.newListener) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (!existing) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else {
            if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }
          }
          if (!existing.warned) {
            m2 = $getMaxListeners(target);
            if (m2 && m2 > 0 && existing.length > m2) {
              existing.warned = true;
              var w2 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
              w2.name = "MaxListenersExceededWarning";
              w2.emitter = target;
              w2.type = type;
              w2.count = existing.length;
              emitWarning$1(w2);
            }
          }
        }
        return target;
      }
      __name(_addListener, "_addListener");
      function emitWarning$1(e) {
        typeof console.warn === "function" ? console.warn(e) : console.log(e);
      }
      __name(emitWarning$1, "emitWarning$1");
      EventEmitter$2.prototype.addListener = /* @__PURE__ */ __name(function addListener2(type, listener) {
        return _addListener(this, type, listener, false);
      }, "addListener");
      EventEmitter$2.prototype.on = EventEmitter$2.prototype.addListener;
      EventEmitter$2.prototype.prependListener = /* @__PURE__ */ __name(function prependListener2(type, listener) {
        return _addListener(this, type, listener, true);
      }, "prependListener");
      function _onceWrap(target, type, listener) {
        var fired = false;
        function g() {
          target.removeListener(type, g);
          if (!fired) {
            fired = true;
            listener.apply(target, arguments);
          }
        }
        __name(g, "g");
        g.listener = listener;
        return g;
      }
      __name(_onceWrap, "_onceWrap");
      EventEmitter$2.prototype.once = /* @__PURE__ */ __name(function once2(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.on(type, _onceWrap(this, type, listener));
        return this;
      }, "once");
      EventEmitter$2.prototype.prependOnceListener = /* @__PURE__ */ __name(function prependOnceListener(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      }, "prependOnceListener");
      EventEmitter$2.prototype.removeListener = /* @__PURE__ */ __name(function removeListener2(type, listener) {
        var list2, events, position2, i, originalListener;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = this._events;
        if (!events)
          return this;
        list2 = events[type];
        if (!list2)
          return this;
        if (list2 === listener || list2.listener && list2.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list2.listener || listener);
          }
        } else if (typeof list2 !== "function") {
          position2 = -1;
          for (i = list2.length; i-- > 0; ) {
            if (list2[i] === listener || list2[i].listener && list2[i].listener === listener) {
              originalListener = list2[i].listener;
              position2 = i;
              break;
            }
          }
          if (position2 < 0)
            return this;
          if (list2.length === 1) {
            list2[0] = void 0;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list2, position2);
          }
          if (events.removeListener)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      }, "removeListener");
      EventEmitter$2.prototype.off = function(type, listener) {
        return this.removeListener(type, listener);
      };
      EventEmitter$2.prototype.removeAllListeners = /* @__PURE__ */ __name(function removeAllListeners2(type) {
        var listeners, events;
        events = this._events;
        if (!events)
          return this;
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys2 = Object.keys(events);
          for (var i = 0, key; i < keys2.length; ++i) {
            key = keys2[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners) {
          do {
            this.removeListener(type, listeners[listeners.length - 1]);
          } while (listeners[0]);
        }
        return this;
      }, "removeAllListeners");
      EventEmitter$2.prototype.listeners = /* @__PURE__ */ __name(function listeners(type) {
        var evlistener;
        var ret;
        var events = this._events;
        if (!events)
          ret = [];
        else {
          evlistener = events[type];
          if (!evlistener)
            ret = [];
          else if (typeof evlistener === "function")
            ret = [evlistener.listener || evlistener];
          else
            ret = unwrapListeners(evlistener);
        }
        return ret;
      }, "listeners");
      EventEmitter$2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount$1.call(emitter, type);
        }
      };
      EventEmitter$2.prototype.listenerCount = listenerCount$1;
      function listenerCount$1(type) {
        var events = this._events;
        if (events) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener) {
            return evlistener.length;
          }
        }
        return 0;
      }
      __name(listenerCount$1, "listenerCount$1");
      EventEmitter$2.prototype.eventNames = /* @__PURE__ */ __name(function eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      }, "eventNames");
      function spliceOne(list2, index) {
        for (var i = index, k = i + 1, n = list2.length; k < n; i += 1, k += 1)
          list2[i] = list2[k];
        list2.pop();
      }
      __name(spliceOne, "spliceOne");
      function arrayClone(arr, i) {
        var copy = new Array(i);
        while (i--)
          copy[i] = arr[i];
        return copy;
      }
      __name(arrayClone, "arrayClone");
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      __name(unwrapListeners, "unwrapListeners");
      var _polyfillNode_events = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": EventEmitter$2,
        EventEmitter: EventEmitter$2
      });
      var lookup$1 = [];
      var revLookup$1 = [];
      var Arr$1 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var inited$1 = false;
      function init$1() {
        inited$1 = true;
        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup$1[i] = code[i];
          revLookup$1[code.charCodeAt(i)] = i;
        }
        revLookup$1["-".charCodeAt(0)] = 62;
        revLookup$1["_".charCodeAt(0)] = 63;
      }
      __name(init$1, "init$1");
      function toByteArray$1(b64) {
        if (!inited$1) {
          init$1();
        }
        var i, j, l, tmp, placeHolders, arr;
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
        arr = new Arr$1(len * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? len - 4 : len;
        var L = 0;
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = revLookup$1[b64.charCodeAt(i)] << 18 | revLookup$1[b64.charCodeAt(i + 1)] << 12 | revLookup$1[b64.charCodeAt(i + 2)] << 6 | revLookup$1[b64.charCodeAt(i + 3)];
          arr[L++] = tmp >> 16 & 255;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        if (placeHolders === 2) {
          tmp = revLookup$1[b64.charCodeAt(i)] << 2 | revLookup$1[b64.charCodeAt(i + 1)] >> 4;
          arr[L++] = tmp & 255;
        } else if (placeHolders === 1) {
          tmp = revLookup$1[b64.charCodeAt(i)] << 10 | revLookup$1[b64.charCodeAt(i + 1)] << 4 | revLookup$1[b64.charCodeAt(i + 2)] >> 2;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        return arr;
      }
      __name(toByteArray$1, "toByteArray$1");
      function tripletToBase64$1(num) {
        return lookup$1[num >> 18 & 63] + lookup$1[num >> 12 & 63] + lookup$1[num >> 6 & 63] + lookup$1[num & 63];
      }
      __name(tripletToBase64$1, "tripletToBase64$1");
      function encodeChunk$1(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
          output.push(tripletToBase64$1(tmp));
        }
        return output.join("");
      }
      __name(encodeChunk$1, "encodeChunk$1");
      function fromByteArray$1(uint8) {
        if (!inited$1) {
          init$1();
        }
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var output = "";
        var parts = [];
        var maxChunkLength = 16383;
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk$1(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          output += lookup$1[tmp >> 2];
          output += lookup$1[tmp << 4 & 63];
          output += "==";
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          output += lookup$1[tmp >> 10];
          output += lookup$1[tmp >> 4 & 63];
          output += lookup$1[tmp << 2 & 63];
          output += "=";
        }
        parts.push(output);
        return parts.join("");
      }
      __name(fromByteArray$1, "fromByteArray$1");
      function read$1(buffer, offset, isLE, mLen, nBytes) {
        var e, m2;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d2 = isLE ? -1 : 1;
        var s2 = buffer[offset + i];
        i += d2;
        e = s2 & (1 << -nBits) - 1;
        s2 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        m2 = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
        } else {
          m2 = m2 + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s2 ? -1 : 1) * m2 * Math.pow(2, e - mLen);
      }
      __name(read$1, "read$1");
      function write$1(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m2, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d2 = isLE ? 1 : -1;
        var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m2 = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m2 = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m2 = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d2, m2 /= 256, mLen -= 8) {
        }
        e = e << mLen | m2;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d2, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d2] |= s2 * 128;
      }
      __name(write$1, "write$1");
      var toString$2 = {}.toString;
      var isArray$2 = Array.isArray || function(arr) {
        return toString$2.call(arr) == "[object Array]";
      };
      var INSPECT_MAX_BYTES$1 = 50;
      Buffer$1.TYPED_ARRAY_SUPPORT = global$2.TYPED_ARRAY_SUPPORT !== void 0 ? global$2.TYPED_ARRAY_SUPPORT : true;
      function kMaxLength$1() {
        return Buffer$1.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      __name(kMaxLength$1, "kMaxLength$1");
      function createBuffer$1(that, length2) {
        if (kMaxLength$1() < length2) {
          throw new RangeError("Invalid typed array length");
        }
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length2);
          that.__proto__ = Buffer$1.prototype;
        } else {
          if (that === null) {
            that = new Buffer$1(length2);
          }
          that.length = length2;
        }
        return that;
      }
      __name(createBuffer$1, "createBuffer$1");
      function Buffer$1(arg, encodingOrOffset, length2) {
        if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
          return new Buffer$1(arg, encodingOrOffset, length2);
        }
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          }
          return allocUnsafe$1(this, arg);
        }
        return from$1(this, arg, encodingOrOffset, length2);
      }
      __name(Buffer$1, "Buffer$1");
      Buffer$1.poolSize = 8192;
      Buffer$1._augment = function(arr) {
        arr.__proto__ = Buffer$1.prototype;
        return arr;
      };
      function from$1(that, value, encodingOrOffset, length2) {
        if (typeof value === "number") {
          throw new TypeError('"value" argument must not be a number');
        }
        if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
          return fromArrayBuffer$1(that, value, encodingOrOffset, length2);
        }
        if (typeof value === "string") {
          return fromString$1(that, value, encodingOrOffset);
        }
        return fromObject$1(that, value);
      }
      __name(from$1, "from$1");
      Buffer$1.from = function(value, encodingOrOffset, length2) {
        return from$1(null, value, encodingOrOffset, length2);
      };
      if (Buffer$1.TYPED_ARRAY_SUPPORT) {
        Buffer$1.prototype.__proto__ = Uint8Array.prototype;
        Buffer$1.__proto__ = Uint8Array;
      }
      function assertSize$1(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be a number');
        } else if (size < 0) {
          throw new RangeError('"size" argument must not be negative');
        }
      }
      __name(assertSize$1, "assertSize$1");
      function alloc$1(that, size, fill, encoding) {
        assertSize$1(size);
        if (size <= 0) {
          return createBuffer$1(that, size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer$1(that, size).fill(fill, encoding) : createBuffer$1(that, size).fill(fill);
        }
        return createBuffer$1(that, size);
      }
      __name(alloc$1, "alloc$1");
      Buffer$1.alloc = function(size, fill, encoding) {
        return alloc$1(null, size, fill, encoding);
      };
      function allocUnsafe$1(that, size) {
        assertSize$1(size);
        that = createBuffer$1(that, size < 0 ? 0 : checked$1(size) | 0);
        if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < size; ++i) {
            that[i] = 0;
          }
        }
        return that;
      }
      __name(allocUnsafe$1, "allocUnsafe$1");
      Buffer$1.allocUnsafe = function(size) {
        return allocUnsafe$1(null, size);
      };
      Buffer$1.allocUnsafeSlow = function(size) {
        return allocUnsafe$1(null, size);
      };
      function fromString$1(that, string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer$1.isEncoding(encoding)) {
          throw new TypeError('"encoding" must be a valid string encoding');
        }
        var length2 = byteLength$1(string, encoding) | 0;
        that = createBuffer$1(that, length2);
        var actual = that.write(string, encoding);
        if (actual !== length2) {
          that = that.slice(0, actual);
        }
        return that;
      }
      __name(fromString$1, "fromString$1");
      function fromArrayLike$1(that, array2) {
        var length2 = array2.length < 0 ? 0 : checked$1(array2.length) | 0;
        that = createBuffer$1(that, length2);
        for (var i = 0; i < length2; i += 1) {
          that[i] = array2[i] & 255;
        }
        return that;
      }
      __name(fromArrayLike$1, "fromArrayLike$1");
      function fromArrayBuffer$1(that, array2, byteOffset, length2) {
        array2.byteLength;
        if (byteOffset < 0 || array2.byteLength < byteOffset) {
          throw new RangeError("'offset' is out of bounds");
        }
        if (array2.byteLength < byteOffset + (length2 || 0)) {
          throw new RangeError("'length' is out of bounds");
        }
        if (byteOffset === void 0 && length2 === void 0) {
          array2 = new Uint8Array(array2);
        } else if (length2 === void 0) {
          array2 = new Uint8Array(array2, byteOffset);
        } else {
          array2 = new Uint8Array(array2, byteOffset, length2);
        }
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          that = array2;
          that.__proto__ = Buffer$1.prototype;
        } else {
          that = fromArrayLike$1(that, array2);
        }
        return that;
      }
      __name(fromArrayBuffer$1, "fromArrayBuffer$1");
      function fromObject$1(that, obj) {
        if (internalIsBuffer$1(obj)) {
          var len = checked$1(obj.length) | 0;
          that = createBuffer$1(that, len);
          if (that.length === 0) {
            return that;
          }
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if (typeof obj.length !== "number" || isnan$1(obj.length)) {
              return createBuffer$1(that, 0);
            }
            return fromArrayLike$1(that, obj);
          }
          if (obj.type === "Buffer" && isArray$2(obj.data)) {
            return fromArrayLike$1(that, obj.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      __name(fromObject$1, "fromObject$1");
      function checked$1(length2) {
        if (length2 >= kMaxLength$1()) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength$1().toString(16) + " bytes");
        }
        return length2 | 0;
      }
      __name(checked$1, "checked$1");
      Buffer$1.isBuffer = isBuffer$2;
      function internalIsBuffer$1(b) {
        return !!(b != null && b._isBuffer);
      }
      __name(internalIsBuffer$1, "internalIsBuffer$1");
      Buffer$1.compare = /* @__PURE__ */ __name(function compare(a, b) {
        if (!internalIsBuffer$1(a) || !internalIsBuffer$1(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y2 = b.length;
        for (var i = 0, len = Math.min(x, y2); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y2 = b[i];
            break;
          }
        }
        if (x < y2)
          return -1;
        if (y2 < x)
          return 1;
        return 0;
      }, "compare");
      Buffer$1.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      }, "isEncoding");
      Buffer$1.concat = /* @__PURE__ */ __name(function concat(list2, length2) {
        if (!isArray$2(list2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list2.length === 0) {
          return Buffer$1.alloc(0);
        }
        var i;
        if (length2 === void 0) {
          length2 = 0;
          for (i = 0; i < list2.length; ++i) {
            length2 += list2[i].length;
          }
        }
        var buffer = Buffer$1.allocUnsafe(length2);
        var pos = 0;
        for (i = 0; i < list2.length; ++i) {
          var buf = list2[i];
          if (!internalIsBuffer$1(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      }, "concat");
      function byteLength$1(string, encoding) {
        if (internalIsBuffer$1(string)) {
          return string.length;
        }
        if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          string = "" + string;
        }
        var len = string.length;
        if (len === 0)
          return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
            case void 0:
              return utf8ToBytes$1(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes$1(string).length;
            default:
              if (loweredCase)
                return utf8ToBytes$1(string).length;
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      __name(byteLength$1, "byteLength$1");
      Buffer$1.byteLength = byteLength$1;
      function slowToString$1(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice$1(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice$1(this, start, end);
            case "ascii":
              return asciiSlice$1(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice$1(this, start, end);
            case "base64":
              return base64Slice$1(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice$1(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      __name(slowToString$1, "slowToString$1");
      Buffer$1.prototype._isBuffer = true;
      function swap$1(b, n, m2) {
        var i = b[n];
        b[n] = b[m2];
        b[m2] = i;
      }
      __name(swap$1, "swap$1");
      Buffer$1.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap$1(this, i, i + 1);
        }
        return this;
      }, "swap16");
      Buffer$1.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap$1(this, i, i + 3);
          swap$1(this, i + 1, i + 2);
        }
        return this;
      }, "swap32");
      Buffer$1.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap$1(this, i, i + 7);
          swap$1(this, i + 1, i + 6);
          swap$1(this, i + 2, i + 5);
          swap$1(this, i + 3, i + 4);
        }
        return this;
      }, "swap64");
      Buffer$1.prototype.toString = /* @__PURE__ */ __name(function toString2() {
        var length2 = this.length | 0;
        if (length2 === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice$1(this, 0, length2);
        return slowToString$1.apply(this, arguments);
      }, "toString");
      Buffer$1.prototype.equals = /* @__PURE__ */ __name(function equals(b) {
        if (!internalIsBuffer$1(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer$1.compare(this, b) === 0;
      }, "equals");
      Buffer$1.prototype.inspect = /* @__PURE__ */ __name(function inspect2() {
        var str = "";
        var max = INSPECT_MAX_BYTES$1;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          if (this.length > max)
            str += " ... ";
        }
        return "<Buffer " + str + ">";
      }, "inspect");
      Buffer$1.prototype.compare = /* @__PURE__ */ __name(function compare(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer$1(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y2 = end - start;
        var len = Math.min(x, y2);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y2 = targetCopy[i];
            break;
          }
        }
        if (x < y2)
          return -1;
        if (y2 < x)
          return 1;
        return 0;
      }, "compare");
      function bidirectionalIndexOf$1(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (isNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer$1.from(val, encoding);
        }
        if (internalIsBuffer$1(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf$1(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (Buffer$1.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf$1(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      __name(bidirectionalIndexOf$1, "bidirectionalIndexOf$1");
      function arrayIndexOf$1(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        __name(read2, "read");
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      __name(arrayIndexOf$1, "arrayIndexOf$1");
      Buffer$1.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      }, "includes");
      Buffer$1.prototype.indexOf = /* @__PURE__ */ __name(function indexOf2(val, byteOffset, encoding) {
        return bidirectionalIndexOf$1(this, val, byteOffset, encoding, true);
      }, "indexOf");
      Buffer$1.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf$1(this, val, byteOffset, encoding, false);
      }, "lastIndexOf");
      function hexWrite$1(buf, string, offset, length2) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length2) {
          length2 = remaining;
        } else {
          length2 = Number(length2);
          if (length2 > remaining) {
            length2 = remaining;
          }
        }
        var strLen = string.length;
        if (strLen % 2 !== 0)
          throw new TypeError("Invalid hex string");
        if (length2 > strLen / 2) {
          length2 = strLen / 2;
        }
        for (var i = 0; i < length2; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      __name(hexWrite$1, "hexWrite$1");
      function utf8Write$1(buf, string, offset, length2) {
        return blitBuffer$1(utf8ToBytes$1(string, buf.length - offset), buf, offset, length2);
      }
      __name(utf8Write$1, "utf8Write$1");
      function asciiWrite$1(buf, string, offset, length2) {
        return blitBuffer$1(asciiToBytes$1(string), buf, offset, length2);
      }
      __name(asciiWrite$1, "asciiWrite$1");
      function latin1Write$1(buf, string, offset, length2) {
        return asciiWrite$1(buf, string, offset, length2);
      }
      __name(latin1Write$1, "latin1Write$1");
      function base64Write$1(buf, string, offset, length2) {
        return blitBuffer$1(base64ToBytes$1(string), buf, offset, length2);
      }
      __name(base64Write$1, "base64Write$1");
      function ucs2Write$1(buf, string, offset, length2) {
        return blitBuffer$1(utf16leToBytes$1(string, buf.length - offset), buf, offset, length2);
      }
      __name(ucs2Write$1, "ucs2Write$1");
      Buffer$1.prototype.write = /* @__PURE__ */ __name(function write2(string, offset, length2, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length2 = this.length;
          offset = 0;
        } else if (length2 === void 0 && typeof offset === "string") {
          encoding = offset;
          length2 = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length2)) {
            length2 = length2 | 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length2;
            length2 = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length2 === void 0 || length2 > remaining)
          length2 = remaining;
        if (string.length > 0 && (length2 < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite$1(this, string, offset, length2);
            case "utf8":
            case "utf-8":
              return utf8Write$1(this, string, offset, length2);
            case "ascii":
              return asciiWrite$1(this, string, offset, length2);
            case "latin1":
            case "binary":
              return latin1Write$1(this, string, offset, length2);
            case "base64":
              return base64Write$1(this, string, offset, length2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write$1(this, string, offset, length2);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }, "write");
      Buffer$1.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      }, "toJSON");
      function base64Slice$1(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return fromByteArray$1(buf);
        } else {
          return fromByteArray$1(buf.slice(start, end));
        }
      }
      __name(base64Slice$1, "base64Slice$1");
      function utf8Slice$1(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray$1(res);
      }
      __name(utf8Slice$1, "utf8Slice$1");
      var MAX_ARGUMENTS_LENGTH$1 = 4096;
      function decodeCodePointsArray$1(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH$1) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH$1)
          );
        }
        return res;
      }
      __name(decodeCodePointsArray$1, "decodeCodePointsArray$1");
      function asciiSlice$1(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      __name(asciiSlice$1, "asciiSlice$1");
      function latin1Slice$1(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      __name(latin1Slice$1, "latin1Slice$1");
      function hexSlice$1(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += toHex$1(buf[i]);
        }
        return out;
      }
      __name(hexSlice$1, "hexSlice$1");
      function utf16leSlice$1(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      __name(utf16leSlice$1, "utf16leSlice$1");
      Buffer$1.prototype.slice = /* @__PURE__ */ __name(function slice2(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer$1.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer$1(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      }, "slice");
      function checkOffset$1(offset, ext, length2) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length2)
          throw new RangeError("Trying to access beyond buffer length");
      }
      __name(checkOffset$1, "checkOffset$1");
      Buffer$1.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset$1(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      }, "readUIntLE");
      Buffer$1.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          checkOffset$1(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      }, "readUIntBE");
      Buffer$1.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 1, this.length);
        return this[offset];
      }, "readUInt8");
      Buffer$1.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      }, "readUInt16LE");
      Buffer$1.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      }, "readUInt16BE");
      Buffer$1.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      }, "readUInt32LE");
      Buffer$1.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      }, "readUInt32BE");
      Buffer$1.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset$1(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      }, "readIntLE");
      Buffer$1.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset$1(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      }, "readIntBE");
      Buffer$1.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      }, "readInt8");
      Buffer$1.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      }, "readInt16LE");
      Buffer$1.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      }, "readInt16BE");
      Buffer$1.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      }, "readInt32LE");
      Buffer$1.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      }, "readInt32BE");
      Buffer$1.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 4, this.length);
        return read$1(this, offset, true, 23, 4);
      }, "readFloatLE");
      Buffer$1.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 4, this.length);
        return read$1(this, offset, false, 23, 4);
      }, "readFloatBE");
      Buffer$1.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 8, this.length);
        return read$1(this, offset, true, 52, 8);
      }, "readDoubleLE");
      Buffer$1.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
        if (!noAssert)
          checkOffset$1(offset, 8, this.length);
        return read$1(this, offset, false, 52, 8);
      }, "readDoubleBE");
      function checkInt$1(buf, value, offset, ext, max, min2) {
        if (!internalIsBuffer$1(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min2)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      __name(checkInt$1, "checkInt$1");
      Buffer$1.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt$1(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      }, "writeUIntLE");
      Buffer$1.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt$1(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      }, "writeUIntBE");
      Buffer$1.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 1, 255, 0);
        if (!Buffer$1.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      }, "writeUInt8");
      function objectWriteUInt16$1(buf, value, offset, littleEndian) {
        if (value < 0)
          value = 65535 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
          buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }
      __name(objectWriteUInt16$1, "objectWriteUInt16$1");
      Buffer$1.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 2, 65535, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16$1(this, value, offset, true);
        }
        return offset + 2;
      }, "writeUInt16LE");
      Buffer$1.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 2, 65535, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16$1(this, value, offset, false);
        }
        return offset + 2;
      }, "writeUInt16BE");
      function objectWriteUInt32$1(buf, value, offset, littleEndian) {
        if (value < 0)
          value = 4294967295 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
        }
      }
      __name(objectWriteUInt32$1, "objectWriteUInt32$1");
      Buffer$1.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 4, 4294967295, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt32$1(this, value, offset, true);
        }
        return offset + 4;
      }, "writeUInt32LE");
      Buffer$1.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 4, 4294967295, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32$1(this, value, offset, false);
        }
        return offset + 4;
      }, "writeUInt32BE");
      Buffer$1.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt$1(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      }, "writeIntLE");
      Buffer$1.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt$1(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      }, "writeIntBE");
      Buffer$1.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 1, 127, -128);
        if (!Buffer$1.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      }, "writeInt8");
      Buffer$1.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 2, 32767, -32768);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16$1(this, value, offset, true);
        }
        return offset + 2;
      }, "writeInt16LE");
      Buffer$1.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 2, 32767, -32768);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16$1(this, value, offset, false);
        }
        return offset + 2;
      }, "writeInt16BE");
      Buffer$1.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt32$1(this, value, offset, true);
        }
        return offset + 4;
      }, "writeInt32LE");
      Buffer$1.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt$1(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32$1(this, value, offset, false);
        }
        return offset + 4;
      }, "writeInt32BE");
      function checkIEEE754$1(buf, value, offset, ext, max, min2) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      __name(checkIEEE754$1, "checkIEEE754$1");
      function writeFloat$1(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754$1(buf, value, offset, 4);
        }
        write$1(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      __name(writeFloat$1, "writeFloat$1");
      Buffer$1.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
        return writeFloat$1(this, value, offset, true, noAssert);
      }, "writeFloatLE");
      Buffer$1.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
        return writeFloat$1(this, value, offset, false, noAssert);
      }, "writeFloatBE");
      function writeDouble$1(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754$1(buf, value, offset, 8);
        }
        write$1(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      __name(writeDouble$1, "writeDouble$1");
      Buffer$1.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
        return writeDouble$1(this, value, offset, true, noAssert);
      }, "writeDoubleLE");
      Buffer$1.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
        return writeDouble$1(this, value, offset, false, noAssert);
      }, "writeDoubleBE");
      Buffer$1.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      }, "copy");
      Buffer$1.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer$1.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer$1(val) ? val : utf8ToBytes$1(new Buffer$1(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      }, "fill");
      var INVALID_BASE64_RE$1 = /[^+\/0-9A-Za-z-_]/g;
      function base64clean$1(str) {
        str = stringtrim$1(str).replace(INVALID_BASE64_RE$1, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      __name(base64clean$1, "base64clean$1");
      function stringtrim$1(str) {
        if (str.trim)
          return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      __name(stringtrim$1, "stringtrim$1");
      function toHex$1(n) {
        if (n < 16)
          return "0" + n.toString(16);
        return n.toString(16);
      }
      __name(toHex$1, "toHex$1");
      function utf8ToBytes$1(string, units) {
        units = units || Infinity;
        var codePoint;
        var length2 = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length2; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length2) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      __name(utf8ToBytes$1, "utf8ToBytes$1");
      function asciiToBytes$1(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      __name(asciiToBytes$1, "asciiToBytes$1");
      function utf16leToBytes$1(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      __name(utf16leToBytes$1, "utf16leToBytes$1");
      function base64ToBytes$1(str) {
        return toByteArray$1(base64clean$1(str));
      }
      __name(base64ToBytes$1, "base64ToBytes$1");
      function blitBuffer$1(src, dst, offset, length2) {
        for (var i = 0; i < length2; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      __name(blitBuffer$1, "blitBuffer$1");
      function isnan$1(val) {
        return val !== val;
      }
      __name(isnan$1, "isnan$1");
      function isBuffer$2(obj) {
        return obj != null && (!!obj._isBuffer || isFastBuffer$1(obj) || isSlowBuffer$1(obj));
      }
      __name(isBuffer$2, "isBuffer$2");
      function isFastBuffer$1(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      __name(isFastBuffer$1, "isFastBuffer$1");
      function isSlowBuffer$1(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer$1(obj.slice(0, 0));
      }
      __name(isSlowBuffer$1, "isSlowBuffer$1");
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      __name(defaultSetTimout, "defaultSetTimout");
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      __name(defaultClearTimeout, "defaultClearTimeout");
      var cachedSetTimeout = defaultSetTimout;
      var cachedClearTimeout = defaultClearTimeout;
      if (typeof global$2.setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      }
      if (typeof global$2.clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      }
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      __name(runTimeout, "runTimeout");
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      __name(runClearTimeout, "runClearTimeout");
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      __name(cleanUpNextTick, "cleanUpNextTick");
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout2 = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout2);
      }
      __name(drainQueue, "drainQueue");
      function nextTick(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      }
      __name(nextTick, "nextTick");
      function Item(fun, array2) {
        this.fun = fun;
        this.array = array2;
      }
      __name(Item, "Item");
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      var title = "browser";
      var platform = "browser";
      var browser$3 = true;
      var env = {};
      var argv = [];
      var version$1 = "";
      var versions = {};
      var release = {};
      var config2 = {};
      function noop() {
      }
      __name(noop, "noop");
      var on = noop;
      var addListener = noop;
      var once = noop;
      var off = noop;
      var removeListener = noop;
      var removeAllListeners = noop;
      var emit = noop;
      function binding(name2) {
        throw new Error("process.binding is not supported");
      }
      __name(binding, "binding");
      function cwd() {
        return "/";
      }
      __name(cwd, "cwd");
      function chdir(dir) {
        throw new Error("process.chdir is not supported");
      }
      __name(chdir, "chdir");
      function umask() {
        return 0;
      }
      __name(umask, "umask");
      var performance = global$2.performance || {};
      var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      function hrtime(previousTimestamp) {
        var clocktime = performanceNow.call(performance) * 1e-3;
        var seconds = Math.floor(clocktime);
        var nanoseconds = Math.floor(clocktime % 1 * 1e9);
        if (previousTimestamp) {
          seconds = seconds - previousTimestamp[0];
          nanoseconds = nanoseconds - previousTimestamp[1];
          if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
          }
        }
        return [seconds, nanoseconds];
      }
      __name(hrtime, "hrtime");
      var startTime = /* @__PURE__ */ new Date();
      function uptime() {
        var currentTime = /* @__PURE__ */ new Date();
        var dif = currentTime - startTime;
        return dif / 1e3;
      }
      __name(uptime, "uptime");
      var browser$1$1 = {
        nextTick,
        title,
        browser: browser$3,
        env,
        argv,
        version: version$1,
        versions,
        on,
        addListener,
        once,
        off,
        removeListener,
        removeAllListeners,
        emit,
        binding,
        cwd,
        chdir,
        umask,
        hrtime,
        platform,
        release,
        config: config2,
        uptime
      };
      var inherits$2;
      if (typeof Object.create === "function") {
        inherits$2 = /* @__PURE__ */ __name(function inherits2(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }, "inherits");
      } else {
        inherits$2 = /* @__PURE__ */ __name(function inherits2(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = /* @__PURE__ */ __name(function() {
          }, "TempCtor");
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }, "inherits");
      }
      var inherits$3 = inherits$2;
      var formatRegExp = /%[sdj%]/g;
      function format$1(f) {
        if (!isString$1(f)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(" ");
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function(x2) {
          if (x2 === "%%")
            return "%";
          if (i >= len)
            return x2;
          switch (x2) {
            case "%s":
              return String(args[i++]);
            case "%d":
              return Number(args[i++]);
            case "%j":
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return "[Circular]";
              }
            default:
              return x2;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += " " + x;
          } else {
            str += " " + inspect(x);
          }
        }
        return str;
      }
      __name(format$1, "format$1");
      function deprecate$1(fn, msg) {
        if (isUndefined(global$2.process)) {
          return function() {
            return deprecate$1(fn, msg).apply(this, arguments);
          };
        }
        if (browser$1$1.noDeprecation === true) {
          return fn;
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (browser$1$1.throwDeprecation) {
              throw new Error(msg);
            } else if (browser$1$1.traceDeprecation) {
              console.trace(msg);
            } else {
              console.error(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        __name(deprecated, "deprecated");
        return deprecated;
      }
      __name(deprecate$1, "deprecate$1");
      var debugs = {};
      var debugEnviron;
      function debuglog(set) {
        if (isUndefined(debugEnviron))
          debugEnviron = browser$1$1.env.NODE_DEBUG || "";
        set = set.toUpperCase();
        if (!debugs[set]) {
          if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
            var pid = 0;
            debugs[set] = function() {
              var msg = format$1.apply(null, arguments);
              console.error("%s %d: %s", set, pid, msg);
            };
          } else {
            debugs[set] = function() {
            };
          }
        }
        return debugs[set];
      }
      __name(debuglog, "debuglog");
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3)
          ctx.depth = arguments[2];
        if (arguments.length >= 4)
          ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          _extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden))
          ctx.showHidden = false;
        if (isUndefined(ctx.depth))
          ctx.depth = 2;
        if (isUndefined(ctx.colors))
          ctx.colors = false;
        if (isUndefined(ctx.customInspect))
          ctx.customInspect = true;
        if (ctx.colors)
          ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      __name(inspect, "inspect");
      inspect.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      function stylizeWithColor(str, styleType) {
        var style2 = inspect.styles[styleType];
        if (style2) {
          return "\x1B[" + inspect.colors[style2][0] + "m" + str + "\x1B[" + inspect.colors[style2][1] + "m";
        } else {
          return str;
        }
      }
      __name(stylizeWithColor, "stylizeWithColor");
      function stylizeNoColor(str, styleType) {
        return str;
      }
      __name(stylizeNoColor, "stylizeNoColor");
      function arrayToHash(array2) {
        var hash = {};
        array2.forEach(function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      __name(arrayToHash, "arrayToHash");
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
        value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes, ctx);
          if (!isString$1(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys2 = Object.keys(value);
        var visibleKeys = arrayToHash(keys2);
        if (ctx.showHidden) {
          keys2 = Object.getOwnPropertyNames(value);
        }
        if (isError$1(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0)) {
          return formatError(value);
        }
        if (keys2.length === 0) {
          if (isFunction(value)) {
            var name2 = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name2 + "]", "special");
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
          }
          if (isError$1(value)) {
            return formatError(value);
          }
        }
        var base2 = "", array2 = false, braces = ["{", "}"];
        if (isArray$1(value)) {
          array2 = true;
          braces = ["[", "]"];
        }
        if (isFunction(value)) {
          var n = value.name ? ": " + value.name : "";
          base2 = " [Function" + n + "]";
        }
        if (isRegExp(value)) {
          base2 = " " + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base2 = " " + Date.prototype.toUTCString.call(value);
        }
        if (isError$1(value)) {
          base2 = " " + formatError(value);
        }
        if (keys2.length === 0 && (!array2 || value.length == 0)) {
          return braces[0] + base2 + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          } else {
            return ctx.stylize("[Object]", "special");
          }
        }
        ctx.seen.push(value);
        var output;
        if (array2) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
        } else {
          output = keys2.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base2, braces);
      }
      __name(formatValue, "formatValue");
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize("undefined", "undefined");
        if (isString$1(value)) {
          var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return ctx.stylize(simple, "string");
        }
        if (isNumber(value))
          return ctx.stylize("" + value, "number");
        if (isBoolean(value))
          return ctx.stylize("" + value, "boolean");
        if (isNull(value))
          return ctx.stylize("null", "null");
      }
      __name(formatPrimitive, "formatPrimitive");
      function formatError(value) {
        return "[" + Error.prototype.toString.call(value) + "]";
      }
      __name(formatError, "formatError");
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
        var output = [];
        for (var i = 0, l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              String(i),
              true
            ));
          } else {
            output.push("");
          }
        }
        keys2.forEach(function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              key,
              true
            ));
          }
        });
        return output;
      }
      __name(formatArray, "formatArray");
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2) {
        var name2, str, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize("[Getter/Setter]", "special");
          } else {
            str = ctx.stylize("[Getter]", "special");
          }
        } else {
          if (desc.set) {
            str = ctx.stylize("[Setter]", "special");
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name2 = "[" + key + "]";
        }
        if (!str) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf("\n") > -1) {
              if (array2) {
                str = str.split("\n").map(function(line3) {
                  return "  " + line3;
                }).join("\n").substr(2);
              } else {
                str = "\n" + str.split("\n").map(function(line3) {
                  return "   " + line3;
                }).join("\n");
              }
            }
          } else {
            str = ctx.stylize("[Circular]", "special");
          }
        }
        if (isUndefined(name2)) {
          if (array2 && key.match(/^\d+$/)) {
            return str;
          }
          name2 = JSON.stringify("" + key);
          if (name2.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name2 = name2.substr(1, name2.length - 2);
            name2 = ctx.stylize(name2, "name");
          } else {
            name2 = name2.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name2 = ctx.stylize(name2, "string");
          }
        }
        return name2 + ": " + str;
      }
      __name(formatProperty, "formatProperty");
      function reduceToSingleString(output, base2, braces) {
        var length2 = output.reduce(function(prev2, cur) {
          if (cur.indexOf("\n") >= 0)
            ;
          return prev2 + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (length2 > 60) {
          return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
        }
        return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
      }
      __name(reduceToSingleString, "reduceToSingleString");
      function isArray$1(ar) {
        return Array.isArray(ar);
      }
      __name(isArray$1, "isArray$1");
      function isBoolean(arg) {
        return typeof arg === "boolean";
      }
      __name(isBoolean, "isBoolean");
      function isNull(arg) {
        return arg === null;
      }
      __name(isNull, "isNull");
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      __name(isNullOrUndefined, "isNullOrUndefined");
      function isNumber(arg) {
        return typeof arg === "number";
      }
      __name(isNumber, "isNumber");
      function isString$1(arg) {
        return typeof arg === "string";
      }
      __name(isString$1, "isString$1");
      function isSymbol(arg) {
        return typeof arg === "symbol";
      }
      __name(isSymbol, "isSymbol");
      function isUndefined(arg) {
        return arg === void 0;
      }
      __name(isUndefined, "isUndefined");
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === "[object RegExp]";
      }
      __name(isRegExp, "isRegExp");
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      __name(isObject, "isObject");
      function isDate(d2) {
        return isObject(d2) && objectToString(d2) === "[object Date]";
      }
      __name(isDate, "isDate");
      function isError$1(e) {
        return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
      }
      __name(isError$1, "isError$1");
      function isFunction(arg) {
        return typeof arg === "function";
      }
      __name(isFunction, "isFunction");
      function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
        typeof arg === "undefined";
      }
      __name(isPrimitive, "isPrimitive");
      function isBuffer$1(maybeBuf) {
        return Buffer$1.isBuffer(maybeBuf);
      }
      __name(isBuffer$1, "isBuffer$1");
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      __name(objectToString, "objectToString");
      function pad(n) {
        return n < 10 ? "0" + n.toString(10) : n.toString(10);
      }
      __name(pad, "pad");
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      function timestamp() {
        var d2 = /* @__PURE__ */ new Date();
        var time = [
          pad(d2.getHours()),
          pad(d2.getMinutes()),
          pad(d2.getSeconds())
        ].join(":");
        return [d2.getDate(), months[d2.getMonth()], time].join(" ");
      }
      __name(timestamp, "timestamp");
      function log() {
        console.log("%s - %s", timestamp(), format$1.apply(null, arguments));
      }
      __name(log, "log");
      function _extend(origin, add) {
        if (!add || !isObject(add))
          return origin;
        var keys2 = Object.keys(add);
        var i = keys2.length;
        while (i--) {
          origin[keys2[i]] = add[keys2[i]];
        }
        return origin;
      }
      __name(_extend, "_extend");
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      __name(hasOwnProperty, "hasOwnProperty");
      var _polyfillNode_util = {
        inherits: inherits$3,
        _extend,
        log,
        isBuffer: isBuffer$1,
        isPrimitive,
        isFunction,
        isError: isError$1,
        isDate,
        isObject,
        isRegExp,
        isUndefined,
        isSymbol,
        isString: isString$1,
        isNumber,
        isNullOrUndefined,
        isNull,
        isBoolean,
        isArray: isArray$1,
        inspect,
        deprecate: deprecate$1,
        format: format$1,
        debuglog
      };
      var _polyfillNode_util$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        format: format$1,
        deprecate: deprecate$1,
        debuglog,
        inspect,
        isArray: isArray$1,
        isBoolean,
        isNull,
        isNullOrUndefined,
        isNumber,
        isString: isString$1,
        isSymbol,
        isUndefined,
        isRegExp,
        isObject,
        isDate,
        isError: isError$1,
        isFunction,
        isPrimitive,
        isBuffer: isBuffer$1,
        log,
        inherits: inherits$3,
        _extend,
        "default": _polyfillNode_util
      });
      function BufferList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      __name(BufferList, "BufferList");
      BufferList.prototype.push = function(v2) {
        var entry = { data: v2, next: null };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function(v2) {
        var entry = { data: v2, next: this.head };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function(s2) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s2 + p.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function(n) {
        if (this.length === 0)
          return Buffer$1.alloc(0);
        if (this.length === 1)
          return this.head.data;
        var ret = Buffer$1.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          p.data.copy(ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      var isBufferEncoding = Buffer$1.isEncoding || function(encoding) {
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function assertEncoding(encoding) {
        if (encoding && !isBufferEncoding(encoding)) {
          throw new Error("Unknown encoding: " + encoding);
        }
      }
      __name(assertEncoding, "assertEncoding");
      function StringDecoder(encoding) {
        this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
        assertEncoding(encoding);
        switch (this.encoding) {
          case "utf8":
            this.surrogateSize = 3;
            break;
          case "ucs2":
          case "utf16le":
            this.surrogateSize = 2;
            this.detectIncompleteChar = utf16DetectIncompleteChar;
            break;
          case "base64":
            this.surrogateSize = 3;
            this.detectIncompleteChar = base64DetectIncompleteChar;
            break;
          default:
            this.write = passThroughWrite;
            return;
        }
        this.charBuffer = new Buffer$1(6);
        this.charReceived = 0;
        this.charLength = 0;
      }
      __name(StringDecoder, "StringDecoder");
      StringDecoder.prototype.write = function(buffer) {
        var charStr = "";
        while (this.charLength) {
          var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
          buffer.copy(this.charBuffer, this.charReceived, 0, available);
          this.charReceived += available;
          if (this.charReceived < this.charLength) {
            return "";
          }
          buffer = buffer.slice(available, buffer.length);
          charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
          var charCode = charStr.charCodeAt(charStr.length - 1);
          if (charCode >= 55296 && charCode <= 56319) {
            this.charLength += this.surrogateSize;
            charStr = "";
            continue;
          }
          this.charReceived = this.charLength = 0;
          if (buffer.length === 0) {
            return charStr;
          }
          break;
        }
        this.detectIncompleteChar(buffer);
        var end = buffer.length;
        if (this.charLength) {
          buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
          end -= this.charReceived;
        }
        charStr += buffer.toString(this.encoding, 0, end);
        var end = charStr.length - 1;
        var charCode = charStr.charCodeAt(end);
        if (charCode >= 55296 && charCode <= 56319) {
          var size = this.surrogateSize;
          this.charLength += size;
          this.charReceived += size;
          this.charBuffer.copy(this.charBuffer, size, 0, size);
          buffer.copy(this.charBuffer, 0, 0, size);
          return charStr.substring(0, end);
        }
        return charStr;
      };
      StringDecoder.prototype.detectIncompleteChar = function(buffer) {
        var i = buffer.length >= 3 ? 3 : buffer.length;
        for (; i > 0; i--) {
          var c = buffer[buffer.length - i];
          if (i == 1 && c >> 5 == 6) {
            this.charLength = 2;
            break;
          }
          if (i <= 2 && c >> 4 == 14) {
            this.charLength = 3;
            break;
          }
          if (i <= 3 && c >> 3 == 30) {
            this.charLength = 4;
            break;
          }
        }
        this.charReceived = i;
      };
      StringDecoder.prototype.end = function(buffer) {
        var res = "";
        if (buffer && buffer.length)
          res = this.write(buffer);
        if (this.charReceived) {
          var cr = this.charReceived;
          var buf = this.charBuffer;
          var enc = this.encoding;
          res += buf.slice(0, cr).toString(enc);
        }
        return res;
      };
      function passThroughWrite(buffer) {
        return buffer.toString(this.encoding);
      }
      __name(passThroughWrite, "passThroughWrite");
      function utf16DetectIncompleteChar(buffer) {
        this.charReceived = buffer.length % 2;
        this.charLength = this.charReceived ? 2 : 0;
      }
      __name(utf16DetectIncompleteChar, "utf16DetectIncompleteChar");
      function base64DetectIncompleteChar(buffer) {
        this.charReceived = buffer.length % 3;
        this.charLength = this.charReceived ? 3 : 0;
      }
      __name(base64DetectIncompleteChar, "base64DetectIncompleteChar");
      Readable.ReadableState = ReadableState;
      var debug$2 = debuglog("stream");
      inherits$3(Readable, EventEmitter$2);
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function") {
          return emitter.prependListener(event, fn);
        } else {
          if (!emitter._events || !emitter._events[event])
            emitter.on(event, fn);
          else if (Array.isArray(emitter._events[event]))
            emitter._events[event].unshift(fn);
          else
            emitter._events[event] = [fn, emitter._events[event]];
        }
      }
      __name(prependListener, "prependListener");
      function listenerCount(emitter, type) {
        return emitter.listeners(type).length;
      }
      __name(listenerCount, "listenerCount");
      function ReadableState(options, stream) {
        options = options || {};
        this.objectMode = !!options.objectMode;
        if (stream instanceof Duplex)
          this.objectMode = this.objectMode || !!options.readableObjectMode;
        var hwm = options.highWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
        this.highWaterMark = ~~this.highWaterMark;
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.ranOut = false;
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      __name(ReadableState, "ReadableState");
      function Readable(options) {
        if (!(this instanceof Readable))
          return new Readable(options);
        this._readableState = new ReadableState(options, this);
        this.readable = true;
        if (options && typeof options.read === "function")
          this._read = options.read;
        EventEmitter$2.call(this);
      }
      __name(Readable, "Readable");
      Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        if (!state.objectMode && typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer$1.from(chunk, encoding);
            encoding = "";
          }
        }
        return readableAddChunk(this, state, chunk, encoding, false);
      };
      Readable.prototype.unshift = function(chunk) {
        var state = this._readableState;
        return readableAddChunk(this, state, chunk, "", true);
      };
      Readable.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      function readableAddChunk(stream, state, chunk, encoding, addToFront) {
        var er = chunkInvalid(state, chunk);
        if (er) {
          stream.emit("error", er);
        } else if (chunk === null) {
          state.reading = false;
          onEofChunk(stream, state);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (state.ended && !addToFront) {
            var e = new Error("stream.push() after EOF");
            stream.emit("error", e);
          } else if (state.endEmitted && addToFront) {
            var _e = new Error("stream.unshift() after end event");
            stream.emit("error", _e);
          } else {
            var skipAdd;
            if (state.decoder && !addToFront && !encoding) {
              chunk = state.decoder.write(chunk);
              skipAdd = !state.objectMode && chunk.length === 0;
            }
            if (!addToFront)
              state.reading = false;
            if (!skipAdd) {
              if (state.flowing && state.length === 0 && !state.sync) {
                stream.emit("data", chunk);
                stream.read(0);
              } else {
                state.length += state.objectMode ? 1 : chunk.length;
                if (addToFront)
                  state.buffer.unshift(chunk);
                else
                  state.buffer.push(chunk);
                if (state.needReadable)
                  emitReadable(stream);
              }
            }
            maybeReadMore(stream, state);
          }
        } else if (!addToFront) {
          state.reading = false;
        }
        return needMoreData(state);
      }
      __name(readableAddChunk, "readableAddChunk");
      function needMoreData(state) {
        return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
      }
      __name(needMoreData, "needMoreData");
      Readable.prototype.setEncoding = function(enc) {
        this._readableState.decoder = new StringDecoder(enc);
        this._readableState.encoding = enc;
        return this;
      };
      var MAX_HWM = 8388608;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
          n = MAX_HWM;
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      __name(computeNewHighWaterMark, "computeNewHighWaterMark");
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended)
          return 0;
        if (state.objectMode)
          return 1;
        if (n !== n) {
          if (state.flowing && state.length)
            return state.buffer.head.data.length;
          else
            return state.length;
        }
        if (n > state.highWaterMark)
          state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length)
          return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      __name(howMuchToRead, "howMuchToRead");
      Readable.prototype.read = function(n) {
        debug$2("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0)
          state.emittedReadable = false;
        if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
          debug$2("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended)
            endReadable(this);
          else
            emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0)
            endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug$2("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug$2("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug$2("reading or ended", doRead);
        } else if (doRead) {
          debug$2("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0)
            state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading)
            n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0)
          ret = fromList(n, state);
        else
          ret = null;
        if (ret === null) {
          state.needReadable = true;
          n = 0;
        } else {
          state.length -= n;
        }
        if (state.length === 0) {
          if (!state.ended)
            state.needReadable = true;
          if (nOrig !== n && state.ended)
            endReadable(this);
        }
        if (ret !== null)
          this.emit("data", ret);
        return ret;
      };
      function chunkInvalid(state, chunk) {
        var er = null;
        if (!Buffer$1.isBuffer(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state.objectMode) {
          er = new TypeError("Invalid non-string/buffer chunk");
        }
        return er;
      }
      __name(chunkInvalid, "chunkInvalid");
      function onEofChunk(stream, state) {
        if (state.ended)
          return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        emitReadable(stream);
      }
      __name(onEofChunk, "onEofChunk");
      function emitReadable(stream) {
        var state = stream._readableState;
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug$2("emitReadable", state.flowing);
          state.emittedReadable = true;
          if (state.sync)
            nextTick(emitReadable_, stream);
          else
            emitReadable_(stream);
        }
      }
      __name(emitReadable, "emitReadable");
      function emitReadable_(stream) {
        debug$2("emit readable");
        stream.emit("readable");
        flow(stream);
      }
      __name(emitReadable_, "emitReadable_");
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          nextTick(maybeReadMore_, stream, state);
        }
      }
      __name(maybeReadMore, "maybeReadMore");
      function maybeReadMore_(stream, state) {
        var len = state.length;
        while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
          debug$2("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
          else
            len = state.length;
        }
        state.readingMore = false;
      }
      __name(maybeReadMore_, "maybeReadMore_");
      Readable.prototype._read = function(n) {
        this.emit("error", new Error("not implemented"));
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug$2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = !pipeOpts || pipeOpts.end !== false;
        var endFn = doEnd ? onend2 : cleanup;
        if (state.endEmitted)
          nextTick(endFn);
        else
          src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable) {
          debug$2("onunpipe");
          if (readable === src) {
            cleanup();
          }
        }
        __name(onunpipe, "onunpipe");
        function onend2() {
          debug$2("onend");
          dest.end();
        }
        __name(onend2, "onend");
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug$2("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend2);
          src.removeListener("end", cleanup);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
            ondrain();
        }
        __name(cleanup, "cleanup");
        var increasedAwaitDrain = false;
        src.on("data", ondata);
        function ondata(chunk) {
          debug$2("ondata");
          increasedAwaitDrain = false;
          var ret = dest.write(chunk);
          if (false === ret && !increasedAwaitDrain) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
              debug$2("false write response, pause", src._readableState.awaitDrain);
              src._readableState.awaitDrain++;
              increasedAwaitDrain = true;
            }
            src.pause();
          }
        }
        __name(ondata, "ondata");
        function onerror(er) {
          debug$2("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (listenerCount(dest, "error") === 0)
            dest.emit("error", er);
        }
        __name(onerror, "onerror");
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        __name(onclose, "onclose");
        dest.once("close", onclose);
        function onfinish() {
          debug$2("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        __name(onfinish, "onfinish");
        dest.once("finish", onfinish);
        function unpipe() {
          debug$2("unpipe");
          src.unpipe(dest);
        }
        __name(unpipe, "unpipe");
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug$2("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function() {
          var state = src._readableState;
          debug$2("pipeOnDrain", state.awaitDrain);
          if (state.awaitDrain)
            state.awaitDrain--;
          if (state.awaitDrain === 0 && src.listeners("data").length) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      __name(pipeOnDrain, "pipeOnDrain");
      Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        if (state.pipesCount === 0)
          return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes)
            return this;
          if (!dest)
            dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest)
            dest.emit("unpipe", this);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var _i = 0; _i < len; _i++) {
            dests[_i].emit("unpipe", this);
          }
          return this;
        }
        var i = indexOf(state.pipes, dest);
        if (i === -1)
          return this;
        state.pipes.splice(i, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1)
          state.pipes = state.pipes[0];
        dest.emit("unpipe", this);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        var res = EventEmitter$2.prototype.on.call(this, ev, fn);
        if (ev === "data") {
          if (this._readableState.flowing !== false)
            this.resume();
        } else if (ev === "readable") {
          var state = this._readableState;
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.emittedReadable = false;
            if (!state.reading) {
              nextTick(nReadingNextTick, this);
            } else if (state.length) {
              emitReadable(this);
            }
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      function nReadingNextTick(self2) {
        debug$2("readable nexttick read 0");
        self2.read(0);
      }
      __name(nReadingNextTick, "nReadingNextTick");
      Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug$2("resume");
          state.flowing = true;
          resume(this, state);
        }
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          nextTick(resume_, stream, state);
        }
      }
      __name(resume, "resume");
      function resume_(stream, state) {
        if (!state.reading) {
          debug$2("resume read 0");
          stream.read(0);
        }
        state.resumeScheduled = false;
        state.awaitDrain = 0;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading)
          stream.read(0);
      }
      __name(resume_, "resume_");
      Readable.prototype.pause = function() {
        debug$2("call pause flowing=%j", this._readableState.flowing);
        if (false !== this._readableState.flowing) {
          debug$2("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug$2("flow", state.flowing);
        while (state.flowing && stream.read() !== null) {
        }
      }
      __name(flow, "flow");
      Readable.prototype.wrap = function(stream) {
        var state = this._readableState;
        var paused = false;
        var self2 = this;
        stream.on("end", function() {
          debug$2("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length)
              self2.push(chunk);
          }
          self2.push(null);
        });
        stream.on("data", function(chunk) {
          debug$2("wrapped data");
          if (state.decoder)
            chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0))
            return;
          else if (!state.objectMode && (!chunk || !chunk.length))
            return;
          var ret = self2.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = /* @__PURE__ */ function(method2) {
              return function() {
                return stream[method2].apply(stream, arguments);
              };
            }(i);
          }
        }
        var events = ["error", "close", "destroy", "pause", "resume"];
        forEach(events, function(ev) {
          stream.on(ev, self2.emit.bind(self2, ev));
        });
        self2._read = function(n) {
          debug$2("wrapped _read", n);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return self2;
      };
      Readable._fromList = fromList;
      function fromList(n, state) {
        if (state.length === 0)
          return null;
        var ret;
        if (state.objectMode)
          ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder)
            ret = state.buffer.join("");
          else if (state.buffer.length === 1)
            ret = state.buffer.head.data;
          else
            ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = fromListPartial(n, state.buffer, state.decoder);
        }
        return ret;
      }
      __name(fromList, "fromList");
      function fromListPartial(n, list2, hasStrings) {
        var ret;
        if (n < list2.head.data.length) {
          ret = list2.head.data.slice(0, n);
          list2.head.data = list2.head.data.slice(n);
        } else if (n === list2.head.data.length) {
          ret = list2.shift();
        } else {
          ret = hasStrings ? copyFromBufferString(n, list2) : copyFromBuffer(n, list2);
        }
        return ret;
      }
      __name(fromListPartial, "fromListPartial");
      function copyFromBufferString(n, list2) {
        var p = list2.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length)
            ret += str;
          else
            ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next)
                list2.head = p.next;
              else
                list2.head = list2.tail = null;
            } else {
              list2.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        list2.length -= c;
        return ret;
      }
      __name(copyFromBufferString, "copyFromBufferString");
      function copyFromBuffer(n, list2) {
        var ret = Buffer$1.allocUnsafe(n);
        var p = list2.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next)
                list2.head = p.next;
              else
                list2.head = list2.tail = null;
            } else {
              list2.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        list2.length -= c;
        return ret;
      }
      __name(copyFromBuffer, "copyFromBuffer");
      function endReadable(stream) {
        var state = stream._readableState;
        if (state.length > 0)
          throw new Error('"endReadable()" called on non-empty stream');
        if (!state.endEmitted) {
          state.ended = true;
          nextTick(endReadableNT, state, stream);
        }
      }
      __name(endReadable, "endReadable");
      function endReadableNT(state, stream) {
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
        }
      }
      __name(endReadableNT, "endReadableNT");
      function forEach(xs, f) {
        for (var i = 0, l = xs.length; i < l; i++) {
          f(xs[i], i);
        }
      }
      __name(forEach, "forEach");
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x)
            return i;
        }
        return -1;
      }
      __name(indexOf, "indexOf");
      Writable.WritableState = WritableState;
      inherits$3(Writable, EventEmitter$2);
      function nop() {
      }
      __name(nop, "nop");
      function WriteReq(chunk, encoding, cb) {
        this.chunk = chunk;
        this.encoding = encoding;
        this.callback = cb;
        this.next = null;
      }
      __name(WriteReq, "WriteReq");
      function WritableState(options, stream) {
        Object.defineProperty(this, "buffer", {
          get: deprecate$1(function() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
        });
        options = options || {};
        this.objectMode = !!options.objectMode;
        if (stream instanceof Duplex)
          this.objectMode = this.objectMode || !!options.writableObjectMode;
        var hwm = options.highWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
        this.highWaterMark = ~~this.highWaterMark;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      __name(WritableState, "WritableState");
      WritableState.prototype.getBuffer = /* @__PURE__ */ __name(function writableStateGetBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      }, "writableStateGetBuffer");
      function Writable(options) {
        if (!(this instanceof Writable) && !(this instanceof Duplex))
          return new Writable(options);
        this._writableState = new WritableState(options, this);
        this.writable = true;
        if (options) {
          if (typeof options.write === "function")
            this._write = options.write;
          if (typeof options.writev === "function")
            this._writev = options.writev;
        }
        EventEmitter$2.call(this);
      }
      __name(Writable, "Writable");
      Writable.prototype.pipe = function() {
        this.emit("error", new Error("Cannot pipe, not readable"));
      };
      function writeAfterEnd(stream, cb) {
        var er = new Error("write after end");
        stream.emit("error", er);
        nextTick(cb, er);
      }
      __name(writeAfterEnd, "writeAfterEnd");
      function validChunk(stream, state, chunk, cb) {
        var valid = true;
        var er = false;
        if (chunk === null) {
          er = new TypeError("May not write null values to stream");
        } else if (!Buffer$1.isBuffer(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
          er = new TypeError("Invalid non-string/buffer chunk");
        }
        if (er) {
          stream.emit("error", er);
          nextTick(cb, er);
          valid = false;
        }
        return valid;
      }
      __name(validChunk, "validChunk");
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (Buffer$1.isBuffer(chunk))
          encoding = "buffer";
        else if (!encoding)
          encoding = state.defaultEncoding;
        if (typeof cb !== "function")
          cb = nop;
        if (state.ended)
          writeAfterEnd(this, cb);
        else if (validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        var state = this._writableState;
        state.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
            clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = /* @__PURE__ */ __name(function setDefaultEncoding(encoding) {
        if (typeof encoding === "string")
          encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
          throw new TypeError("Unknown encoding: " + encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      }, "setDefaultEncoding");
      function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
          chunk = Buffer$1.from(chunk, encoding);
        }
        return chunk;
      }
      __name(decodeChunk, "decodeChunk");
      function writeOrBuffer(stream, state, chunk, encoding, cb) {
        chunk = decodeChunk(state, chunk, encoding);
        if (Buffer$1.isBuffer(chunk))
          encoding = "buffer";
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        if (!ret)
          state.needDrain = true;
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
          if (last) {
            last.next = state.lastBufferedRequest;
          } else {
            state.bufferedRequest = state.lastBufferedRequest;
          }
          state.bufferedRequestCount += 1;
        } else {
          doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
      }
      __name(writeOrBuffer, "writeOrBuffer");
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (writev)
          stream._writev(chunk, state.onwrite);
        else
          stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      __name(doWrite, "doWrite");
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync)
          nextTick(cb, er);
        else
          cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
      }
      __name(onwriteError, "onwriteError");
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      __name(onwriteStateUpdate, "onwriteStateUpdate");
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        onwriteStateUpdate(state);
        if (er)
          onwriteError(stream, state, sync, er, cb);
        else {
          var finished = needFinish(state);
          if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
          }
          if (sync) {
            nextTick(afterWrite, stream, state, finished, cb);
          } else {
            afterWrite(stream, state, finished, cb);
          }
        }
      }
      __name(onwrite, "onwrite");
      function afterWrite(stream, state, finished, cb) {
        if (!finished)
          onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      __name(afterWrite, "afterWrite");
      function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      __name(onwriteDrain, "onwriteDrain");
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          while (entry) {
            buffer[count] = entry;
            entry = entry.next;
            count += 1;
          }
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else {
            state.corkedRequestsFree = new CorkedRequest(state);
          }
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            if (state.writing) {
              break;
            }
          }
          if (entry === null)
            state.lastBufferedRequest = null;
        }
        state.bufferedRequestCount = 0;
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      __name(clearBuffer, "clearBuffer");
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new Error("not implemented"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0)
          this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending && !state.finished)
          endWritable(this, state, cb);
      };
      function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
      }
      __name(needFinish, "needFinish");
      function prefinish(stream, state) {
        if (!state.prefinished) {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
      __name(prefinish, "prefinish");
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          if (state.pendingcb === 0) {
            prefinish(stream, state);
            state.finished = true;
            stream.emit("finish");
          } else {
            prefinish(stream, state);
          }
        }
        return need;
      }
      __name(finishMaybe, "finishMaybe");
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
          if (state.finished)
            nextTick(cb);
          else
            stream.once("finish", cb);
        }
        state.ended = true;
        stream.writable = false;
      }
      __name(endWritable, "endWritable");
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function(err) {
          var entry = _this.entry;
          _this.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = _this;
          } else {
            state.corkedRequestsFree = _this;
          }
        };
      }
      __name(CorkedRequest, "CorkedRequest");
      inherits$3(Duplex, Readable);
      var keys = Object.keys(Writable.prototype);
      for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
      function Duplex(options) {
        if (!(this instanceof Duplex))
          return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        if (options && options.readable === false)
          this.readable = false;
        if (options && options.writable === false)
          this.writable = false;
        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false)
          this.allowHalfOpen = false;
        this.once("end", onend);
      }
      __name(Duplex, "Duplex");
      function onend() {
        if (this.allowHalfOpen || this._writableState.ended)
          return;
        nextTick(onEndNT, this);
      }
      __name(onend, "onend");
      function onEndNT(self2) {
        self2.end();
      }
      __name(onEndNT, "onEndNT");
      inherits$3(Transform, Duplex);
      function TransformState(stream) {
        this.afterTransform = function(er, data) {
          return afterTransform(stream, er, data);
        };
        this.needTransform = false;
        this.transforming = false;
        this.writecb = null;
        this.writechunk = null;
        this.writeencoding = null;
      }
      __name(TransformState, "TransformState");
      function afterTransform(stream, er, data) {
        var ts = stream._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb)
          return stream.emit("error", new Error("no writecb in Transform class"));
        ts.writechunk = null;
        ts.writecb = null;
        if (data !== null && data !== void 0)
          stream.push(data);
        cb(er);
        var rs = stream._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          stream._read(rs.highWaterMark);
        }
      }
      __name(afterTransform, "afterTransform");
      function Transform(options) {
        if (!(this instanceof Transform))
          return new Transform(options);
        Duplex.call(this, options);
        this._transformState = new TransformState(this);
        var stream = this;
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function")
            this._transform = options.transform;
          if (typeof options.flush === "function")
            this._flush = options.flush;
        }
        this.once("prefinish", function() {
          if (typeof this._flush === "function")
            this._flush(function(er) {
              done(stream, er);
            });
          else
            done(stream);
        });
      }
      __name(Transform, "Transform");
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error("Not implemented");
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      function done(stream, er) {
        if (er)
          return stream.emit("error", er);
        var ws = stream._writableState;
        var ts = stream._transformState;
        if (ws.length)
          throw new Error("Calling transform done when ws.length != 0");
        if (ts.transforming)
          throw new Error("Calling transform done when still transforming");
        return stream.push(null);
      }
      __name(done, "done");
      inherits$3(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough))
          return new PassThrough(options);
        Transform.call(this, options);
      }
      __name(PassThrough, "PassThrough");
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
      inherits$3(Stream, EventEmitter$2);
      Stream.Readable = Readable;
      Stream.Writable = Writable;
      Stream.Duplex = Duplex;
      Stream.Transform = Transform;
      Stream.PassThrough = PassThrough;
      Stream.Stream = Stream;
      function Stream() {
        EventEmitter$2.call(this);
      }
      __name(Stream, "Stream");
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        __name(ondata, "ondata");
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        __name(ondrain, "ondrain");
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend2);
          source.on("close", onclose);
        }
        var didOnEnd = false;
        function onend2() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          dest.end();
        }
        __name(onend2, "onend");
        function onclose() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          if (typeof dest.destroy === "function")
            dest.destroy();
        }
        __name(onclose, "onclose");
        function onerror(er) {
          cleanup();
          if (EventEmitter$2.listenerCount(this, "error") === 0) {
            throw er;
          }
        }
        __name(onerror, "onerror");
        source.on("error", onerror);
        dest.on("error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend2);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        __name(cleanup, "cleanup");
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
      var _polyfillNode_stream = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": Stream,
        Readable,
        Writable,
        Duplex,
        Transform,
        PassThrough,
        Stream
      });
      var require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_stream);
      var require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_util$1);
      var WritableStream = require$$0$2.Writable;
      var inherits$1 = require$$0$1.inherits;
      var browserStdout = BrowserStdout;
      inherits$1(BrowserStdout, WritableStream);
      function BrowserStdout(opts) {
        if (!(this instanceof BrowserStdout))
          return new BrowserStdout(opts);
        opts = opts || {};
        WritableStream.call(this, opts);
        this.label = opts.label !== void 0 ? opts.label : "stdout";
      }
      __name(BrowserStdout, "BrowserStdout");
      BrowserStdout.prototype._write = function(chunks, encoding, cb) {
        var output = chunks.toString ? chunks.toString() : chunks;
        if (this.label === false) {
          console.log(output);
        } else {
          console.log(this.label + ":", output);
        }
        nextTick$1(cb);
      };
      var parseQuery$1 = /* @__PURE__ */ __name(function parseQuery2(qs) {
        return qs.replace("?", "").split("&").reduce(function(obj, pair) {
          var i = pair.indexOf("=");
          var key = pair.slice(0, i);
          var val = pair.slice(++i);
          obj[key] = decodeURIComponent(val.replace(/\+/g, "%20"));
          return obj;
        }, {});
      }, "parseQuery");
      function highlight(js) {
        return js.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>').replace(/('.*?')/gm, '<span class="string">$1</span>').replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>').replace(/(\d+)/gm, '<span class="number">$1</span>').replace(
          /\bnew[ \t]+(\w+)/gm,
          '<span class="keyword">new</span> <span class="init">$1</span>'
        ).replace(
          /\b(function|new|throw|return|var|if|else)\b/gm,
          '<span class="keyword">$1</span>'
        );
      }
      __name(highlight, "highlight");
      var highlightTags$1 = /* @__PURE__ */ __name(function highlightTags2(name2) {
        var code = document.getElementById("mocha").getElementsByTagName(name2);
        for (var i = 0, len = code.length; i < len; ++i) {
          code[i].innerHTML = highlight(code[i].innerHTML);
        }
      }, "highlightTags");
      var mocha$1 = { exports: {} };
      var escapeStringRegexp = /* @__PURE__ */ __name((string) => {
        if (typeof string !== "string") {
          throw new TypeError("Expected a string");
        }
        return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
      }, "escapeStringRegexp");
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1);
          } else if (last === "..") {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift("..");
          }
        }
        return parts;
      }
      __name(normalizeArray, "normalizeArray");
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      var splitPath = /* @__PURE__ */ __name(function(filename) {
        return splitPathRe.exec(filename).slice(1);
      }, "splitPath");
      function resolve() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : "/";
          if (typeof path !== "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charAt(0) === "/";
        }
        resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      }
      __name(resolve, "resolve");
      function normalize(path) {
        var isPathAbsolute = isAbsolute(path), trailingSlash = substr2(path, -1) === "/";
        path = normalizeArray(filter(path.split("/"), function(p) {
          return !!p;
        }), !isPathAbsolute).join("/");
        if (!path && !isPathAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isPathAbsolute ? "/" : "") + path;
      }
      __name(normalize, "normalize");
      function isAbsolute(path) {
        return path.charAt(0) === "/";
      }
      __name(isAbsolute, "isAbsolute");
      function join() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return normalize(filter(paths, function(p, index) {
          if (typeof p !== "string") {
            throw new TypeError("Arguments to path.join must be strings");
          }
          return p;
        }).join("/"));
      }
      __name(join, "join");
      function relative(from3, to) {
        from3 = resolve(from3).substr(1);
        to = resolve(to).substr(1);
        function trim2(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== "")
              break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== "")
              break;
          }
          if (start > end)
            return [];
          return arr.slice(start, end - start + 1);
        }
        __name(trim2, "trim");
        var fromParts = trim2(from3.split("/"));
        var toParts = trim2(to.split("/"));
        var length2 = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length2;
        for (var i = 0; i < length2; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      }
      __name(relative, "relative");
      var sep = "/";
      var delimiter2 = ":";
      function dirname(path) {
        var result = splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      }
      __name(dirname, "dirname");
      function basename(path, ext) {
        var f = splitPath(path)[2];
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length);
        }
        return f;
      }
      __name(basename, "basename");
      function extname(path) {
        return splitPath(path)[3];
      }
      __name(extname, "extname");
      var _polyfillNode_path = {
        extname,
        basename,
        dirname,
        sep,
        delimiter: delimiter2,
        relative,
        join,
        isAbsolute,
        normalize,
        resolve
      };
      function filter(xs, f) {
        if (xs.filter)
          return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs))
            res.push(xs[i]);
        }
        return res;
      }
      __name(filter, "filter");
      var substr2 = "ab".substr(-1) === "b" ? function(str, start, len) {
        return str.substr(start, len);
      } : function(str, start, len) {
        if (start < 0)
          start = str.length + start;
        return str.substr(start, len);
      };
      var _polyfillNode_path$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        resolve,
        normalize,
        isAbsolute,
        join,
        relative,
        sep,
        delimiter: delimiter2,
        dirname,
        basename,
        extname,
        "default": _polyfillNode_path
      });
      var require$$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_path$1);
      var reporters = {};
      var base$1 = { exports: {} };
      var lib = {};
      var base = {};
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = Diff;
        function Diff() {
        }
        __name(Diff, "Diff");
        Diff.prototype = {
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          diff: /* @__PURE__ */ __name(function diff2(oldString, newString) {
            var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            var callback = options.callback;
            if (typeof options === "function") {
              callback = options;
              options = {};
            }
            this.options = options;
            var self2 = this;
            function done2(value) {
              if (callback) {
                setTimeout(function() {
                  callback(void 0, value);
                }, 0);
                return true;
              } else {
                return value;
              }
            }
            __name(done2, "done");
            oldString = this.castInput(oldString);
            newString = this.castInput(newString);
            oldString = this.removeEmpty(this.tokenize(oldString));
            newString = this.removeEmpty(this.tokenize(newString));
            var newLen = newString.length, oldLen = oldString.length;
            var editLength = 1;
            var maxEditLength = newLen + oldLen;
            var bestPath = [{
              newPos: -1,
              components: []
            }];
            var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
            if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
              return done2([{
                value: this.join(newString),
                count: newString.length
              }]);
            }
            function execEditLength() {
              for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
                var basePath = (
                  /*istanbul ignore start*/
                  void 0
                );
                var addPath = bestPath[diagonalPath - 1], removePath = bestPath[diagonalPath + 1], _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                if (addPath) {
                  bestPath[diagonalPath - 1] = void 0;
                }
                var canAdd = addPath && addPath.newPos + 1 < newLen, canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
                if (!canAdd && !canRemove) {
                  bestPath[diagonalPath] = void 0;
                  continue;
                }
                if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
                  basePath = clonePath(removePath);
                  self2.pushComponent(basePath.components, void 0, true);
                } else {
                  basePath = addPath;
                  basePath.newPos++;
                  self2.pushComponent(basePath.components, true, void 0);
                }
                _oldPos = self2.extractCommon(basePath, newString, oldString, diagonalPath);
                if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
                  return done2(buildValues(self2, basePath.components, newString, oldString, self2.useLongestToken));
                } else {
                  bestPath[diagonalPath] = basePath;
                }
              }
              editLength++;
            }
            __name(execEditLength, "execEditLength");
            if (callback) {
              (/* @__PURE__ */ __name(function exec() {
                setTimeout(function() {
                  if (editLength > maxEditLength) {
                    return callback();
                  }
                  if (!execEditLength()) {
                    exec();
                  }
                }, 0);
              }, "exec"))();
            } else {
              while (editLength <= maxEditLength) {
                var ret = execEditLength();
                if (ret) {
                  return ret;
                }
              }
            }
          }, "diff"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          pushComponent: /* @__PURE__ */ __name(function pushComponent(components, added, removed) {
            var last = components[components.length - 1];
            if (last && last.added === added && last.removed === removed) {
              components[components.length - 1] = {
                count: last.count + 1,
                added,
                removed
              };
            } else {
              components.push({
                count: 1,
                added,
                removed
              });
            }
          }, "pushComponent"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          extractCommon: /* @__PURE__ */ __name(function extractCommon(basePath, newString, oldString, diagonalPath) {
            var newLen = newString.length, oldLen = oldString.length, newPos = basePath.newPos, oldPos = newPos - diagonalPath, commonCount = 0;
            while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
              newPos++;
              oldPos++;
              commonCount++;
            }
            if (commonCount) {
              basePath.components.push({
                count: commonCount
              });
            }
            basePath.newPos = newPos;
            return oldPos;
          }, "extractCommon"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          equals: /* @__PURE__ */ __name(function equals(left, right) {
            if (this.options.comparator) {
              return this.options.comparator(left, right);
            } else {
              return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
            }
          }, "equals"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          removeEmpty: /* @__PURE__ */ __name(function removeEmpty(array2) {
            var ret = [];
            for (var i = 0; i < array2.length; i++) {
              if (array2[i]) {
                ret.push(array2[i]);
              }
            }
            return ret;
          }, "removeEmpty"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          castInput: /* @__PURE__ */ __name(function castInput(value) {
            return value;
          }, "castInput"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          tokenize: /* @__PURE__ */ __name(function tokenize(value) {
            return value.split("");
          }, "tokenize"),
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          join: /* @__PURE__ */ __name(function join2(chars) {
            return chars.join("");
          }, "join")
        };
        function buildValues(diff2, components, newString, oldString, useLongestToken) {
          var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
          for (; componentPos < componentLen; componentPos++) {
            var component = components[componentPos];
            if (!component.removed) {
              if (!component.added && useLongestToken) {
                var value = newString.slice(newPos, newPos + component.count);
                value = value.map(function(value2, i) {
                  var oldValue = oldString[oldPos + i];
                  return oldValue.length > value2.length ? oldValue : value2;
                });
                component.value = diff2.join(value);
              } else {
                component.value = diff2.join(newString.slice(newPos, newPos + component.count));
              }
              newPos += component.count;
              if (!component.added) {
                oldPos += component.count;
              }
            } else {
              component.value = diff2.join(oldString.slice(oldPos, oldPos + component.count));
              oldPos += component.count;
              if (componentPos && components[componentPos - 1].added) {
                var tmp = components[componentPos - 1];
                components[componentPos - 1] = components[componentPos];
                components[componentPos] = tmp;
              }
            }
          }
          var lastComponent = components[componentLen - 1];
          if (componentLen > 1 && typeof lastComponent.value === "string" && (lastComponent.added || lastComponent.removed) && diff2.equals("", lastComponent.value)) {
            components[componentLen - 2].value += lastComponent.value;
            components.pop();
          }
          return components;
        }
        __name(buildValues, "buildValues");
        function clonePath(path) {
          return {
            newPos: path.newPos,
            components: path.components.slice(0)
          };
        }
        __name(clonePath, "clonePath");
      })(base);
      var character2 = {};
      Object.defineProperty(character2, "__esModule", {
        value: true
      });
      character2.diffChars = diffChars;
      character2.characterDiff = void 0;
      var _base$6 = _interopRequireDefault$7(base);
      function _interopRequireDefault$7(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$7, "_interopRequireDefault$7");
      var characterDiff = new /*istanbul ignore start*/
      _base$6[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      character2.characterDiff = characterDiff;
      function diffChars(oldStr, newStr, options) {
        return characterDiff.diff(oldStr, newStr, options);
      }
      __name(diffChars, "diffChars");
      var word = {};
      var params = {};
      Object.defineProperty(params, "__esModule", {
        value: true
      });
      params.generateOptions = generateOptions;
      function generateOptions(options, defaults) {
        if (typeof options === "function") {
          defaults.callback = options;
        } else if (options) {
          for (var name2 in options) {
            if (options.hasOwnProperty(name2)) {
              defaults[name2] = options[name2];
            }
          }
        }
        return defaults;
      }
      __name(generateOptions, "generateOptions");
      Object.defineProperty(word, "__esModule", {
        value: true
      });
      word.diffWords = diffWords;
      word.diffWordsWithSpace = diffWordsWithSpace;
      word.wordDiff = void 0;
      var _base$5 = _interopRequireDefault$6(base);
      var _params$1 = params;
      function _interopRequireDefault$6(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$6, "_interopRequireDefault$6");
      var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
      var reWhitespace = /\S/;
      var wordDiff = new /*istanbul ignore start*/
      _base$5[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      word.wordDiff = wordDiff;
      wordDiff.equals = function(left, right) {
        if (this.options.ignoreCase) {
          left = left.toLowerCase();
          right = right.toLowerCase();
        }
        return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
      };
      wordDiff.tokenize = function(value) {
        var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
        for (var i = 0; i < tokens.length - 1; i++) {
          if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
            tokens[i] += tokens[i + 2];
            tokens.splice(i + 1, 2);
            i--;
          }
        }
        return tokens;
      };
      function diffWords(oldStr, newStr, options) {
        options = /*istanbul ignore start*/
        /*istanbul ignore end*/
        /*istanbul ignore start*/
        (0, _params$1.generateOptions)(options, {
          ignoreWhitespace: true
        });
        return wordDiff.diff(oldStr, newStr, options);
      }
      __name(diffWords, "diffWords");
      function diffWordsWithSpace(oldStr, newStr, options) {
        return wordDiff.diff(oldStr, newStr, options);
      }
      __name(diffWordsWithSpace, "diffWordsWithSpace");
      var line2 = {};
      Object.defineProperty(line2, "__esModule", {
        value: true
      });
      line2.diffLines = diffLines;
      line2.diffTrimmedLines = diffTrimmedLines;
      line2.lineDiff = void 0;
      var _base$4 = _interopRequireDefault$5(base);
      var _params = params;
      function _interopRequireDefault$5(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$5, "_interopRequireDefault$5");
      var lineDiff = new /*istanbul ignore start*/
      _base$4[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      line2.lineDiff = lineDiff;
      lineDiff.tokenize = function(value) {
        var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
        if (!linesAndNewlines[linesAndNewlines.length - 1]) {
          linesAndNewlines.pop();
        }
        for (var i = 0; i < linesAndNewlines.length; i++) {
          var line3 = linesAndNewlines[i];
          if (i % 2 && !this.options.newlineIsToken) {
            retLines[retLines.length - 1] += line3;
          } else {
            if (this.options.ignoreWhitespace) {
              line3 = line3.trim();
            }
            retLines.push(line3);
          }
        }
        return retLines;
      };
      function diffLines(oldStr, newStr, callback) {
        return lineDiff.diff(oldStr, newStr, callback);
      }
      __name(diffLines, "diffLines");
      function diffTrimmedLines(oldStr, newStr, callback) {
        var options = (
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _params.generateOptions)(callback, {
            ignoreWhitespace: true
          })
        );
        return lineDiff.diff(oldStr, newStr, options);
      }
      __name(diffTrimmedLines, "diffTrimmedLines");
      var sentence = {};
      Object.defineProperty(sentence, "__esModule", {
        value: true
      });
      sentence.diffSentences = diffSentences;
      sentence.sentenceDiff = void 0;
      var _base$3 = _interopRequireDefault$4(base);
      function _interopRequireDefault$4(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$4, "_interopRequireDefault$4");
      var sentenceDiff = new /*istanbul ignore start*/
      _base$3[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      sentence.sentenceDiff = sentenceDiff;
      sentenceDiff.tokenize = function(value) {
        return value.split(/(\S.+?[.!?])(?=\s+|$)/);
      };
      function diffSentences(oldStr, newStr, callback) {
        return sentenceDiff.diff(oldStr, newStr, callback);
      }
      __name(diffSentences, "diffSentences");
      var css = {};
      Object.defineProperty(css, "__esModule", {
        value: true
      });
      css.diffCss = diffCss;
      css.cssDiff = void 0;
      var _base$2 = _interopRequireDefault$3(base);
      function _interopRequireDefault$3(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$3, "_interopRequireDefault$3");
      var cssDiff = new /*istanbul ignore start*/
      _base$2[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      css.cssDiff = cssDiff;
      cssDiff.tokenize = function(value) {
        return value.split(/([{}:;,]|\s+)/);
      };
      function diffCss(oldStr, newStr, callback) {
        return cssDiff.diff(oldStr, newStr, callback);
      }
      __name(diffCss, "diffCss");
      var json$1 = {};
      Object.defineProperty(json$1, "__esModule", {
        value: true
      });
      json$1.diffJson = diffJson;
      json$1.canonicalize = canonicalize;
      json$1.jsonDiff = void 0;
      var _base$1 = _interopRequireDefault$2(base);
      var _line$1 = line2;
      function _interopRequireDefault$2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$2, "_interopRequireDefault$2");
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
            return typeof obj2;
          }, "_typeof");
        } else {
          _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          }, "_typeof");
        }
        return _typeof(obj);
      }
      __name(_typeof, "_typeof");
      var objectPrototypeToString = Object.prototype.toString;
      var jsonDiff = new /*istanbul ignore start*/
      _base$1[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      json$1.jsonDiff = jsonDiff;
      jsonDiff.useLongestToken = true;
      jsonDiff.tokenize = /*istanbul ignore start*/
      _line$1.lineDiff.tokenize;
      jsonDiff.castInput = function(value) {
        var _this$options = (
          /*istanbul ignore end*/
          this.options
        ), undefinedReplacement = _this$options.undefinedReplacement, _this$options$stringi = _this$options.stringifyReplacer, stringifyReplacer = _this$options$stringi === void 0 ? function(k, v2) {
          return (
            /*istanbul ignore end*/
            typeof v2 === "undefined" ? undefinedReplacement : v2
          );
        } : _this$options$stringi;
        return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
      };
      jsonDiff.equals = function(left, right) {
        return (
          /*istanbul ignore start*/
          _base$1[
            /*istanbul ignore start*/
            "default"
            /*istanbul ignore end*/
          ].prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"))
        );
      };
      function diffJson(oldObj, newObj, options) {
        return jsonDiff.diff(oldObj, newObj, options);
      }
      __name(diffJson, "diffJson");
      function canonicalize(obj, stack, replacementStack, replacer, key) {
        stack = stack || [];
        replacementStack = replacementStack || [];
        if (replacer) {
          obj = replacer(key, obj);
        }
        var i;
        for (i = 0; i < stack.length; i += 1) {
          if (stack[i] === obj) {
            return replacementStack[i];
          }
        }
        var canonicalizedObj;
        if ("[object Array]" === objectPrototypeToString.call(obj)) {
          stack.push(obj);
          canonicalizedObj = new Array(obj.length);
          replacementStack.push(canonicalizedObj);
          for (i = 0; i < obj.length; i += 1) {
            canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
          }
          stack.pop();
          replacementStack.pop();
          return canonicalizedObj;
        }
        if (obj && obj.toJSON) {
          obj = obj.toJSON();
        }
        if (
          /*istanbul ignore start*/
          _typeof(
            /*istanbul ignore end*/
            obj
          ) === "object" && obj !== null
        ) {
          stack.push(obj);
          canonicalizedObj = {};
          replacementStack.push(canonicalizedObj);
          var sortedKeys = [], _key;
          for (_key in obj) {
            if (obj.hasOwnProperty(_key)) {
              sortedKeys.push(_key);
            }
          }
          sortedKeys.sort();
          for (i = 0; i < sortedKeys.length; i += 1) {
            _key = sortedKeys[i];
            canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
          }
          stack.pop();
          replacementStack.pop();
        } else {
          canonicalizedObj = obj;
        }
        return canonicalizedObj;
      }
      __name(canonicalize, "canonicalize");
      var array$1 = {};
      Object.defineProperty(array$1, "__esModule", {
        value: true
      });
      array$1.diffArrays = diffArrays;
      array$1.arrayDiff = void 0;
      var _base = _interopRequireDefault$1(base);
      function _interopRequireDefault$1(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault$1, "_interopRequireDefault$1");
      var arrayDiff = new /*istanbul ignore start*/
      _base[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      array$1.arrayDiff = arrayDiff;
      arrayDiff.tokenize = function(value) {
        return value.slice();
      };
      arrayDiff.join = arrayDiff.removeEmpty = function(value) {
        return value;
      };
      function diffArrays(oldArr, newArr, callback) {
        return arrayDiff.diff(oldArr, newArr, callback);
      }
      __name(diffArrays, "diffArrays");
      var apply = {};
      var parse$2 = {};
      Object.defineProperty(parse$2, "__esModule", {
        value: true
      });
      parse$2.parsePatch = parsePatch;
      function parsePatch(uniDiff) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/), delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [], list2 = [], i = 0;
        function parseIndex() {
          var index = {};
          list2.push(index);
          while (i < diffstr.length) {
            var line3 = diffstr[i];
            if (/^(\-\-\-|\+\+\+|@@)\s/.test(line3)) {
              break;
            }
            var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line3);
            if (header) {
              index.index = header[1];
            }
            i++;
          }
          parseFileHeader(index);
          parseFileHeader(index);
          index.hunks = [];
          while (i < diffstr.length) {
            var _line2 = diffstr[i];
            if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line2)) {
              break;
            } else if (/^@@/.test(_line2)) {
              index.hunks.push(parseHunk());
            } else if (_line2 && options.strict) {
              throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(_line2));
            } else {
              i++;
            }
          }
        }
        __name(parseIndex, "parseIndex");
        function parseFileHeader(index) {
          var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
          if (fileHeader) {
            var keyPrefix = fileHeader[1] === "---" ? "old" : "new";
            var data = fileHeader[2].split("	", 2);
            var fileName = data[0].replace(/\\\\/g, "\\");
            if (/^".*"$/.test(fileName)) {
              fileName = fileName.substr(1, fileName.length - 2);
            }
            index[keyPrefix + "FileName"] = fileName;
            index[keyPrefix + "Header"] = (data[1] || "").trim();
            i++;
          }
        }
        __name(parseFileHeader, "parseFileHeader");
        function parseHunk() {
          var chunkHeaderIndex = i, chunkHeaderLine = diffstr[i++], chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
          var hunk = {
            oldStart: +chunkHeader[1],
            oldLines: typeof chunkHeader[2] === "undefined" ? 1 : +chunkHeader[2],
            newStart: +chunkHeader[3],
            newLines: typeof chunkHeader[4] === "undefined" ? 1 : +chunkHeader[4],
            lines: [],
            linedelimiters: []
          };
          if (hunk.oldLines === 0) {
            hunk.oldStart += 1;
          }
          if (hunk.newLines === 0) {
            hunk.newStart += 1;
          }
          var addCount = 0, removeCount = 0;
          for (; i < diffstr.length; i++) {
            if (diffstr[i].indexOf("--- ") === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf("+++ ") === 0 && diffstr[i + 2].indexOf("@@") === 0) {
              break;
            }
            var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
            if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
              hunk.lines.push(diffstr[i]);
              hunk.linedelimiters.push(delimiters[i] || "\n");
              if (operation === "+") {
                addCount++;
              } else if (operation === "-") {
                removeCount++;
              } else if (operation === " ") {
                addCount++;
                removeCount++;
              }
            } else {
              break;
            }
          }
          if (!addCount && hunk.newLines === 1) {
            hunk.newLines = 0;
          }
          if (!removeCount && hunk.oldLines === 1) {
            hunk.oldLines = 0;
          }
          if (options.strict) {
            if (addCount !== hunk.newLines) {
              throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
            if (removeCount !== hunk.oldLines) {
              throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
          }
          return hunk;
        }
        __name(parseHunk, "parseHunk");
        while (i < diffstr.length) {
          parseIndex();
        }
        return list2;
      }
      __name(parsePatch, "parsePatch");
      var distanceIterator = {};
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = _default;
        function _default(start, minLine, maxLine) {
          var wantForward = true, backwardExhausted = false, forwardExhausted = false, localOffset = 1;
          return /* @__PURE__ */ __name(function iterator() {
            if (wantForward && !forwardExhausted) {
              if (backwardExhausted) {
                localOffset++;
              } else {
                wantForward = false;
              }
              if (start + localOffset <= maxLine) {
                return localOffset;
              }
              forwardExhausted = true;
            }
            if (!backwardExhausted) {
              if (!forwardExhausted) {
                wantForward = true;
              }
              if (minLine <= start - localOffset) {
                return -localOffset++;
              }
              backwardExhausted = true;
              return iterator();
            }
          }, "iterator");
        }
        __name(_default, "_default");
      })(distanceIterator);
      Object.defineProperty(apply, "__esModule", {
        value: true
      });
      apply.applyPatch = applyPatch;
      apply.applyPatches = applyPatches;
      var _parse$1 = parse$2;
      var _distanceIterator = _interopRequireDefault(distanceIterator);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      __name(_interopRequireDefault, "_interopRequireDefault");
      function applyPatch(source, uniDiff) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (typeof uniDiff === "string") {
          uniDiff = /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _parse$1.parsePatch)(uniDiff);
        }
        if (Array.isArray(uniDiff)) {
          if (uniDiff.length > 1) {
            throw new Error("applyPatch only works with a single input.");
          }
          uniDiff = uniDiff[0];
        }
        var lines = source.split(/\r\n|[\n\v\f\r\x85]/), delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [], hunks = uniDiff.hunks, compareLine = options.compareLine || function(lineNumber, line4, operation2, patchContent) {
          return (
            /*istanbul ignore end*/
            line4 === patchContent
          );
        }, errorCount = 0, fuzzFactor = options.fuzzFactor || 0, minLine = 0, offset = 0, removeEOFNL, addEOFNL;
        function hunkFits(hunk2, toPos2) {
          for (var j2 = 0; j2 < hunk2.lines.length; j2++) {
            var line4 = hunk2.lines[j2], operation2 = line4.length > 0 ? line4[0] : " ", content2 = line4.length > 0 ? line4.substr(1) : line4;
            if (operation2 === " " || operation2 === "-") {
              if (!compareLine(toPos2 + 1, lines[toPos2], operation2, content2)) {
                errorCount++;
                if (errorCount > fuzzFactor) {
                  return false;
                }
              }
              toPos2++;
            }
          }
          return true;
        }
        __name(hunkFits, "hunkFits");
        for (var i = 0; i < hunks.length; i++) {
          var hunk = hunks[i], maxLine = lines.length - hunk.oldLines, localOffset = 0, toPos = offset + hunk.oldStart - 1;
          var iterator = (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _distanceIterator[
              /*istanbul ignore start*/
              "default"
              /*istanbul ignore end*/
            ])(toPos, minLine, maxLine)
          );
          for (; localOffset !== void 0; localOffset = iterator()) {
            if (hunkFits(hunk, toPos + localOffset)) {
              hunk.offset = offset += localOffset;
              break;
            }
          }
          if (localOffset === void 0) {
            return false;
          }
          minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
        }
        var diffOffset = 0;
        for (var _i = 0; _i < hunks.length; _i++) {
          var _hunk = hunks[_i], _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
          diffOffset += _hunk.newLines - _hunk.oldLines;
          for (var j = 0; j < _hunk.lines.length; j++) {
            var line3 = _hunk.lines[j], operation = line3.length > 0 ? line3[0] : " ", content = line3.length > 0 ? line3.substr(1) : line3, delimiter3 = _hunk.linedelimiters[j];
            if (operation === " ") {
              _toPos++;
            } else if (operation === "-") {
              lines.splice(_toPos, 1);
              delimiters.splice(_toPos, 1);
            } else if (operation === "+") {
              lines.splice(_toPos, 0, content);
              delimiters.splice(_toPos, 0, delimiter3);
              _toPos++;
            } else if (operation === "\\") {
              var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
              if (previousOperation === "+") {
                removeEOFNL = true;
              } else if (previousOperation === "-") {
                addEOFNL = true;
              }
            }
          }
        }
        if (removeEOFNL) {
          while (!lines[lines.length - 1]) {
            lines.pop();
            delimiters.pop();
          }
        } else if (addEOFNL) {
          lines.push("");
          delimiters.push("\n");
        }
        for (var _k = 0; _k < lines.length - 1; _k++) {
          lines[_k] = lines[_k] + delimiters[_k];
        }
        return lines.join("");
      }
      __name(applyPatch, "applyPatch");
      function applyPatches(uniDiff, options) {
        if (typeof uniDiff === "string") {
          uniDiff = /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _parse$1.parsePatch)(uniDiff);
        }
        var currentIndex = 0;
        function processIndex() {
          var index = uniDiff[currentIndex++];
          if (!index) {
            return options.complete();
          }
          options.loadFile(index, function(err, data) {
            if (err) {
              return options.complete(err);
            }
            var updatedContent = applyPatch(data, index, options);
            options.patched(index, updatedContent, function(err2) {
              if (err2) {
                return options.complete(err2);
              }
              processIndex();
            });
          });
        }
        __name(processIndex, "processIndex");
        processIndex();
      }
      __name(applyPatches, "applyPatches");
      var merge$1 = {};
      var create = {};
      Object.defineProperty(create, "__esModule", {
        value: true
      });
      create.structuredPatch = structuredPatch;
      create.formatPatch = formatPatch;
      create.createTwoFilesPatch = createTwoFilesPatch;
      create.createPatch = createPatch;
      var _line = line2;
      function _toConsumableArray$1(arr) {
        return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
      }
      __name(_toConsumableArray$1, "_toConsumableArray$1");
      function _nonIterableSpread$1() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      __name(_nonIterableSpread$1, "_nonIterableSpread$1");
      function _unsupportedIterableToArray$1(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray$1(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray$1(o, minLen);
      }
      __name(_unsupportedIterableToArray$1, "_unsupportedIterableToArray$1");
      function _iterableToArray$1(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
          return Array.from(iter);
      }
      __name(_iterableToArray$1, "_iterableToArray$1");
      function _arrayWithoutHoles$1(arr) {
        if (Array.isArray(arr))
          return _arrayLikeToArray$1(arr);
      }
      __name(_arrayWithoutHoles$1, "_arrayWithoutHoles$1");
      function _arrayLikeToArray$1(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      __name(_arrayLikeToArray$1, "_arrayLikeToArray$1");
      function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        if (!options) {
          options = {};
        }
        if (typeof options.context === "undefined") {
          options.context = 4;
        }
        var diff2 = (
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _line.diffLines)(oldStr, newStr, options)
        );
        diff2.push({
          value: "",
          lines: []
        });
        function contextLines(lines) {
          return lines.map(function(entry) {
            return " " + entry;
          });
        }
        __name(contextLines, "contextLines");
        var hunks = [];
        var oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
        var _loop = /* @__PURE__ */ __name(function _loop2(i2) {
          var current = diff2[i2], lines = current.lines || current.value.replace(/\n$/, "").split("\n");
          current.lines = lines;
          if (current.added || current.removed) {
            var _curRange;
            if (!oldRangeStart) {
              var prev2 = diff2[i2 - 1];
              oldRangeStart = oldLine;
              newRangeStart = newLine;
              if (prev2) {
                curRange = options.context > 0 ? contextLines(prev2.lines.slice(-options.context)) : [];
                oldRangeStart -= curRange.length;
                newRangeStart -= curRange.length;
              }
            }
            (_curRange = /*istanbul ignore end*/
            curRange).push.apply(
              /*istanbul ignore start*/
              _curRange,
              /*istanbul ignore start*/
              _toConsumableArray$1(
                /*istanbul ignore end*/
                lines.map(function(entry) {
                  return (current.added ? "+" : "-") + entry;
                })
              )
            );
            if (current.added) {
              newLine += lines.length;
            } else {
              oldLine += lines.length;
            }
          } else {
            if (oldRangeStart) {
              if (lines.length <= options.context * 2 && i2 < diff2.length - 2) {
                var _curRange2;
                (_curRange2 = /*istanbul ignore end*/
                curRange).push.apply(
                  /*istanbul ignore start*/
                  _curRange2,
                  /*istanbul ignore start*/
                  _toConsumableArray$1(
                    /*istanbul ignore end*/
                    contextLines(lines)
                  )
                );
              } else {
                var _curRange3;
                var contextSize = Math.min(lines.length, options.context);
                (_curRange3 = /*istanbul ignore end*/
                curRange).push.apply(
                  /*istanbul ignore start*/
                  _curRange3,
                  /*istanbul ignore start*/
                  _toConsumableArray$1(
                    /*istanbul ignore end*/
                    contextLines(lines.slice(0, contextSize))
                  )
                );
                var hunk = {
                  oldStart: oldRangeStart,
                  oldLines: oldLine - oldRangeStart + contextSize,
                  newStart: newRangeStart,
                  newLines: newLine - newRangeStart + contextSize,
                  lines: curRange
                };
                if (i2 >= diff2.length - 2 && lines.length <= options.context) {
                  var oldEOFNewline = /\n$/.test(oldStr);
                  var newEOFNewline = /\n$/.test(newStr);
                  var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;
                  if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
                    curRange.splice(hunk.oldLines, 0, "\\ No newline at end of file");
                  }
                  if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                    curRange.push("\\ No newline at end of file");
                  }
                }
                hunks.push(hunk);
                oldRangeStart = 0;
                newRangeStart = 0;
                curRange = [];
              }
            }
            oldLine += lines.length;
            newLine += lines.length;
          }
        }, "_loop");
        for (var i = 0; i < diff2.length; i++) {
          _loop(
            /*istanbul ignore end*/
            i
          );
        }
        return {
          oldFileName,
          newFileName,
          oldHeader,
          newHeader,
          hunks
        };
      }
      __name(structuredPatch, "structuredPatch");
      function formatPatch(diff2) {
        var ret = [];
        if (diff2.oldFileName == diff2.newFileName) {
          ret.push("Index: " + diff2.oldFileName);
        }
        ret.push("===================================================================");
        ret.push("--- " + diff2.oldFileName + (typeof diff2.oldHeader === "undefined" ? "" : "	" + diff2.oldHeader));
        ret.push("+++ " + diff2.newFileName + (typeof diff2.newHeader === "undefined" ? "" : "	" + diff2.newHeader));
        for (var i = 0; i < diff2.hunks.length; i++) {
          var hunk = diff2.hunks[i];
          if (hunk.oldLines === 0) {
            hunk.oldStart -= 1;
          }
          if (hunk.newLines === 0) {
            hunk.newStart -= 1;
          }
          ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
          ret.push.apply(ret, hunk.lines);
        }
        return ret.join("\n") + "\n";
      }
      __name(formatPatch, "formatPatch");
      function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
      }
      __name(createTwoFilesPatch, "createTwoFilesPatch");
      function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
        return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
      }
      __name(createPatch, "createPatch");
      var array = {};
      Object.defineProperty(array, "__esModule", {
        value: true
      });
      array.arrayEqual = arrayEqual;
      array.arrayStartsWith = arrayStartsWith;
      function arrayEqual(a, b) {
        if (a.length !== b.length) {
          return false;
        }
        return arrayStartsWith(a, b);
      }
      __name(arrayEqual, "arrayEqual");
      function arrayStartsWith(array2, start) {
        if (start.length > array2.length) {
          return false;
        }
        for (var i = 0; i < start.length; i++) {
          if (start[i] !== array2[i]) {
            return false;
          }
        }
        return true;
      }
      __name(arrayStartsWith, "arrayStartsWith");
      Object.defineProperty(merge$1, "__esModule", {
        value: true
      });
      merge$1.calcLineCount = calcLineCount;
      merge$1.merge = merge;
      var _create = create;
      var _parse = parse$2;
      var _array = array;
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      __name(_toConsumableArray, "_toConsumableArray");
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      __name(_nonIterableSpread, "_nonIterableSpread");
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      __name(_unsupportedIterableToArray, "_unsupportedIterableToArray");
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
          return Array.from(iter);
      }
      __name(_iterableToArray, "_iterableToArray");
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return _arrayLikeToArray(arr);
      }
      __name(_arrayWithoutHoles, "_arrayWithoutHoles");
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      __name(_arrayLikeToArray, "_arrayLikeToArray");
      function calcLineCount(hunk) {
        var _calcOldNewLineCount = (
          /*istanbul ignore end*/
          calcOldNewLineCount(hunk.lines)
        ), oldLines = _calcOldNewLineCount.oldLines, newLines = _calcOldNewLineCount.newLines;
        if (oldLines !== void 0) {
          hunk.oldLines = oldLines;
        } else {
          delete hunk.oldLines;
        }
        if (newLines !== void 0) {
          hunk.newLines = newLines;
        } else {
          delete hunk.newLines;
        }
      }
      __name(calcLineCount, "calcLineCount");
      function merge(mine, theirs, base2) {
        mine = loadPatch(mine, base2);
        theirs = loadPatch(theirs, base2);
        var ret = {};
        if (mine.index || theirs.index) {
          ret.index = mine.index || theirs.index;
        }
        if (mine.newFileName || theirs.newFileName) {
          if (!fileNameChanged(mine)) {
            ret.oldFileName = theirs.oldFileName || mine.oldFileName;
            ret.newFileName = theirs.newFileName || mine.newFileName;
            ret.oldHeader = theirs.oldHeader || mine.oldHeader;
            ret.newHeader = theirs.newHeader || mine.newHeader;
          } else if (!fileNameChanged(theirs)) {
            ret.oldFileName = mine.oldFileName;
            ret.newFileName = mine.newFileName;
            ret.oldHeader = mine.oldHeader;
            ret.newHeader = mine.newHeader;
          } else {
            ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
            ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
            ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
            ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
          }
        }
        ret.hunks = [];
        var mineIndex = 0, theirsIndex = 0, mineOffset = 0, theirsOffset = 0;
        while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
          var mineCurrent = mine.hunks[mineIndex] || {
            oldStart: Infinity
          }, theirsCurrent = theirs.hunks[theirsIndex] || {
            oldStart: Infinity
          };
          if (hunkBefore(mineCurrent, theirsCurrent)) {
            ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
            mineIndex++;
            theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
          } else if (hunkBefore(theirsCurrent, mineCurrent)) {
            ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
            theirsIndex++;
            mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
          } else {
            var mergedHunk = {
              oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
              oldLines: 0,
              newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
              newLines: 0,
              lines: []
            };
            mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
            theirsIndex++;
            mineIndex++;
            ret.hunks.push(mergedHunk);
          }
        }
        return ret;
      }
      __name(merge, "merge");
      function loadPatch(param, base2) {
        if (typeof param === "string") {
          if (/^@@/m.test(param) || /^Index:/m.test(param)) {
            return (
              /*istanbul ignore start*/
              /*istanbul ignore end*/
              /*istanbul ignore start*/
              (0, _parse.parsePatch)(param)[0]
            );
          }
          if (!base2) {
            throw new Error("Must provide a base reference or pass in a patch");
          }
          return (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _create.structuredPatch)(void 0, void 0, base2, param)
          );
        }
        return param;
      }
      __name(loadPatch, "loadPatch");
      function fileNameChanged(patch) {
        return patch.newFileName && patch.newFileName !== patch.oldFileName;
      }
      __name(fileNameChanged, "fileNameChanged");
      function selectField(index, mine, theirs) {
        if (mine === theirs) {
          return mine;
        } else {
          index.conflict = true;
          return {
            mine,
            theirs
          };
        }
      }
      __name(selectField, "selectField");
      function hunkBefore(test2, check) {
        return test2.oldStart < check.oldStart && test2.oldStart + test2.oldLines < check.oldStart;
      }
      __name(hunkBefore, "hunkBefore");
      function cloneHunk(hunk, offset) {
        return {
          oldStart: hunk.oldStart,
          oldLines: hunk.oldLines,
          newStart: hunk.newStart + offset,
          newLines: hunk.newLines,
          lines: hunk.lines
        };
      }
      __name(cloneHunk, "cloneHunk");
      function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
        var mine = {
          offset: mineOffset,
          lines: mineLines,
          index: 0
        }, their = {
          offset: theirOffset,
          lines: theirLines,
          index: 0
        };
        insertLeading(hunk, mine, their);
        insertLeading(hunk, their, mine);
        while (mine.index < mine.lines.length && their.index < their.lines.length) {
          var mineCurrent = mine.lines[mine.index], theirCurrent = their.lines[their.index];
          if ((mineCurrent[0] === "-" || mineCurrent[0] === "+") && (theirCurrent[0] === "-" || theirCurrent[0] === "+")) {
            mutualChange(hunk, mine, their);
          } else if (mineCurrent[0] === "+" && theirCurrent[0] === " ") {
            var _hunk$lines;
            (_hunk$lines = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                collectChange(mine)
              )
            );
          } else if (theirCurrent[0] === "+" && mineCurrent[0] === " ") {
            var _hunk$lines2;
            (_hunk$lines2 = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines2,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                collectChange(their)
              )
            );
          } else if (mineCurrent[0] === "-" && theirCurrent[0] === " ") {
            removal(hunk, mine, their);
          } else if (theirCurrent[0] === "-" && mineCurrent[0] === " ") {
            removal(hunk, their, mine, true);
          } else if (mineCurrent === theirCurrent) {
            hunk.lines.push(mineCurrent);
            mine.index++;
            their.index++;
          } else {
            conflict(hunk, collectChange(mine), collectChange(their));
          }
        }
        insertTrailing(hunk, mine);
        insertTrailing(hunk, their);
        calcLineCount(hunk);
      }
      __name(mergeLines, "mergeLines");
      function mutualChange(hunk, mine, their) {
        var myChanges = collectChange(mine), theirChanges = collectChange(their);
        if (allRemoves(myChanges) && allRemoves(theirChanges)) {
          if (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _array.arrayStartsWith)(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)
          ) {
            var _hunk$lines3;
            (_hunk$lines3 = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines3,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                myChanges
              )
            );
            return;
          } else if (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _array.arrayStartsWith)(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)
          ) {
            var _hunk$lines4;
            (_hunk$lines4 = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines4,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                theirChanges
              )
            );
            return;
          }
        } else if (
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _array.arrayEqual)(myChanges, theirChanges)
        ) {
          var _hunk$lines5;
          (_hunk$lines5 = /*istanbul ignore end*/
          hunk.lines).push.apply(
            /*istanbul ignore start*/
            _hunk$lines5,
            /*istanbul ignore start*/
            _toConsumableArray(
              /*istanbul ignore end*/
              myChanges
            )
          );
          return;
        }
        conflict(hunk, myChanges, theirChanges);
      }
      __name(mutualChange, "mutualChange");
      function removal(hunk, mine, their, swap2) {
        var myChanges = collectChange(mine), theirChanges = collectContext(their, myChanges);
        if (theirChanges.merged) {
          var _hunk$lines6;
          (_hunk$lines6 = /*istanbul ignore end*/
          hunk.lines).push.apply(
            /*istanbul ignore start*/
            _hunk$lines6,
            /*istanbul ignore start*/
            _toConsumableArray(
              /*istanbul ignore end*/
              theirChanges.merged
            )
          );
        } else {
          conflict(hunk, swap2 ? theirChanges : myChanges, swap2 ? myChanges : theirChanges);
        }
      }
      __name(removal, "removal");
      function conflict(hunk, mine, their) {
        hunk.conflict = true;
        hunk.lines.push({
          conflict: true,
          mine,
          theirs: their
        });
      }
      __name(conflict, "conflict");
      function insertLeading(hunk, insert, their) {
        while (insert.offset < their.offset && insert.index < insert.lines.length) {
          var line3 = insert.lines[insert.index++];
          hunk.lines.push(line3);
          insert.offset++;
        }
      }
      __name(insertLeading, "insertLeading");
      function insertTrailing(hunk, insert) {
        while (insert.index < insert.lines.length) {
          var line3 = insert.lines[insert.index++];
          hunk.lines.push(line3);
        }
      }
      __name(insertTrailing, "insertTrailing");
      function collectChange(state) {
        var ret = [], operation = state.lines[state.index][0];
        while (state.index < state.lines.length) {
          var line3 = state.lines[state.index];
          if (operation === "-" && line3[0] === "+") {
            operation = "+";
          }
          if (operation === line3[0]) {
            ret.push(line3);
            state.index++;
          } else {
            break;
          }
        }
        return ret;
      }
      __name(collectChange, "collectChange");
      function collectContext(state, matchChanges) {
        var changes = [], merged = [], matchIndex = 0, contextChanges = false, conflicted = false;
        while (matchIndex < matchChanges.length && state.index < state.lines.length) {
          var change = state.lines[state.index], match = matchChanges[matchIndex];
          if (match[0] === "+") {
            break;
          }
          contextChanges = contextChanges || change[0] !== " ";
          merged.push(match);
          matchIndex++;
          if (change[0] === "+") {
            conflicted = true;
            while (change[0] === "+") {
              changes.push(change);
              change = state.lines[++state.index];
            }
          }
          if (match.substr(1) === change.substr(1)) {
            changes.push(change);
            state.index++;
          } else {
            conflicted = true;
          }
        }
        if ((matchChanges[matchIndex] || "")[0] === "+" && contextChanges) {
          conflicted = true;
        }
        if (conflicted) {
          return changes;
        }
        while (matchIndex < matchChanges.length) {
          merged.push(matchChanges[matchIndex++]);
        }
        return {
          merged,
          changes
        };
      }
      __name(collectContext, "collectContext");
      function allRemoves(changes) {
        return changes.reduce(function(prev2, change) {
          return prev2 && change[0] === "-";
        }, true);
      }
      __name(allRemoves, "allRemoves");
      function skipRemoveSuperset(state, removeChanges, delta) {
        for (var i = 0; i < delta; i++) {
          var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
          if (state.lines[state.index + i] !== " " + changeContent) {
            return false;
          }
        }
        state.index += delta;
        return true;
      }
      __name(skipRemoveSuperset, "skipRemoveSuperset");
      function calcOldNewLineCount(lines) {
        var oldLines = 0;
        var newLines = 0;
        lines.forEach(function(line3) {
          if (typeof line3 !== "string") {
            var myCount = calcOldNewLineCount(line3.mine);
            var theirCount = calcOldNewLineCount(line3.theirs);
            if (oldLines !== void 0) {
              if (myCount.oldLines === theirCount.oldLines) {
                oldLines += myCount.oldLines;
              } else {
                oldLines = void 0;
              }
            }
            if (newLines !== void 0) {
              if (myCount.newLines === theirCount.newLines) {
                newLines += myCount.newLines;
              } else {
                newLines = void 0;
              }
            }
          } else {
            if (newLines !== void 0 && (line3[0] === "+" || line3[0] === " ")) {
              newLines++;
            }
            if (oldLines !== void 0 && (line3[0] === "-" || line3[0] === " ")) {
              oldLines++;
            }
          }
        });
        return {
          oldLines,
          newLines
        };
      }
      __name(calcOldNewLineCount, "calcOldNewLineCount");
      var dmp = {};
      Object.defineProperty(dmp, "__esModule", {
        value: true
      });
      dmp.convertChangesToDMP = convertChangesToDMP;
      function convertChangesToDMP(changes) {
        var ret = [], change, operation;
        for (var i = 0; i < changes.length; i++) {
          change = changes[i];
          if (change.added) {
            operation = 1;
          } else if (change.removed) {
            operation = -1;
          } else {
            operation = 0;
          }
          ret.push([operation, change.value]);
        }
        return ret;
      }
      __name(convertChangesToDMP, "convertChangesToDMP");
      var xml = {};
      Object.defineProperty(xml, "__esModule", {
        value: true
      });
      xml.convertChangesToXML = convertChangesToXML;
      function convertChangesToXML(changes) {
        var ret = [];
        for (var i = 0; i < changes.length; i++) {
          var change = changes[i];
          if (change.added) {
            ret.push("<ins>");
          } else if (change.removed) {
            ret.push("<del>");
          }
          ret.push(escapeHTML(change.value));
          if (change.added) {
            ret.push("</ins>");
          } else if (change.removed) {
            ret.push("</del>");
          }
        }
        return ret.join("");
      }
      __name(convertChangesToXML, "convertChangesToXML");
      function escapeHTML(s2) {
        var n = s2;
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
        return n;
      }
      __name(escapeHTML, "escapeHTML");
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        Object.defineProperty(exports2, "Diff", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _base2["default"];
          }, "get")
        });
        Object.defineProperty(exports2, "diffChars", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _character.diffChars;
          }, "get")
        });
        Object.defineProperty(exports2, "diffWords", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _word.diffWords;
          }, "get")
        });
        Object.defineProperty(exports2, "diffWordsWithSpace", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _word.diffWordsWithSpace;
          }, "get")
        });
        Object.defineProperty(exports2, "diffLines", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _line2.diffLines;
          }, "get")
        });
        Object.defineProperty(exports2, "diffTrimmedLines", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _line2.diffTrimmedLines;
          }, "get")
        });
        Object.defineProperty(exports2, "diffSentences", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _sentence.diffSentences;
          }, "get")
        });
        Object.defineProperty(exports2, "diffCss", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _css.diffCss;
          }, "get")
        });
        Object.defineProperty(exports2, "diffJson", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _json.diffJson;
          }, "get")
        });
        Object.defineProperty(exports2, "canonicalize", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _json.canonicalize;
          }, "get")
        });
        Object.defineProperty(exports2, "diffArrays", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _array2.diffArrays;
          }, "get")
        });
        Object.defineProperty(exports2, "applyPatch", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _apply.applyPatch;
          }, "get")
        });
        Object.defineProperty(exports2, "applyPatches", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _apply.applyPatches;
          }, "get")
        });
        Object.defineProperty(exports2, "parsePatch", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _parse2.parsePatch;
          }, "get")
        });
        Object.defineProperty(exports2, "merge", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _merge.merge;
          }, "get")
        });
        Object.defineProperty(exports2, "structuredPatch", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _create2.structuredPatch;
          }, "get")
        });
        Object.defineProperty(exports2, "createTwoFilesPatch", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _create2.createTwoFilesPatch;
          }, "get")
        });
        Object.defineProperty(exports2, "createPatch", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _create2.createPatch;
          }, "get")
        });
        Object.defineProperty(exports2, "convertChangesToDMP", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _dmp.convertChangesToDMP;
          }, "get")
        });
        Object.defineProperty(exports2, "convertChangesToXML", {
          enumerable: true,
          get: /* @__PURE__ */ __name(function get() {
            return _xml.convertChangesToXML;
          }, "get")
        });
        var _base2 = _interopRequireDefault2(base);
        var _character = character2;
        var _word = word;
        var _line2 = line2;
        var _sentence = sentence;
        var _css = css;
        var _json = json$1;
        var _array2 = array$1;
        var _apply = apply;
        var _parse2 = parse$2;
        var _merge = merge$1;
        var _create2 = create;
        var _dmp = dmp;
        var _xml = xml;
        function _interopRequireDefault2(obj) {
          return obj && obj.__esModule ? obj : { "default": obj };
        }
        __name(_interopRequireDefault2, "_interopRequireDefault");
      })(lib);
      var s$1 = 1e3;
      var m$1 = s$1 * 60;
      var h$1 = m$1 * 60;
      var d$1 = h$1 * 24;
      var w$1 = d$1 * 7;
      var y$1 = d$1 * 365.25;
      var ms$1 = /* @__PURE__ */ __name(function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse$1(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong$1(val) : fmtShort$1(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      }, "ms$1");
      function parse$1(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y$1;
          case "weeks":
          case "week":
          case "w":
            return n * w$1;
          case "days":
          case "day":
          case "d":
            return n * d$1;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h$1;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m$1;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s$1;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      __name(parse$1, "parse$1");
      function fmtShort$1(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d$1) {
          return Math.round(ms2 / d$1) + "d";
        }
        if (msAbs >= h$1) {
          return Math.round(ms2 / h$1) + "h";
        }
        if (msAbs >= m$1) {
          return Math.round(ms2 / m$1) + "m";
        }
        if (msAbs >= s$1) {
          return Math.round(ms2 / s$1) + "s";
        }
        return ms2 + "ms";
      }
      __name(fmtShort$1, "fmtShort$1");
      function fmtLong$1(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d$1) {
          return plural$1(ms2, msAbs, d$1, "day");
        }
        if (msAbs >= h$1) {
          return plural$1(ms2, msAbs, h$1, "hour");
        }
        if (msAbs >= m$1) {
          return plural$1(ms2, msAbs, m$1, "minute");
        }
        if (msAbs >= s$1) {
          return plural$1(ms2, msAbs, s$1, "second");
        }
        return ms2 + " ms";
      }
      __name(fmtLong$1, "fmtLong$1");
      function plural$1(ms2, msAbs, n, name2) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms2 / n) + " " + name2 + (isPlural ? "s" : "");
      }
      __name(plural$1, "plural$1");
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var inited = false;
      function init() {
        inited = true;
        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }
        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;
      }
      __name(init, "init");
      function toByteArray(b64) {
        if (!inited) {
          init();
        }
        var i, j, l, tmp, placeHolders, arr;
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
        arr = new Arr(len * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? len - 4 : len;
        var L = 0;
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
          arr[L++] = tmp >> 16 & 255;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        if (placeHolders === 2) {
          tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
          arr[L++] = tmp & 255;
        } else if (placeHolders === 1) {
          tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        return arr;
      }
      __name(toByteArray, "toByteArray");
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      __name(tripletToBase64, "tripletToBase64");
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      __name(encodeChunk, "encodeChunk");
      function fromByteArray(uint8) {
        if (!inited) {
          init();
        }
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var output = "";
        var parts = [];
        var maxChunkLength = 16383;
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          output += lookup[tmp >> 2];
          output += lookup[tmp << 4 & 63];
          output += "==";
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          output += lookup[tmp >> 10];
          output += lookup[tmp >> 4 & 63];
          output += lookup[tmp << 2 & 63];
          output += "=";
        }
        parts.push(output);
        return parts.join("");
      }
      __name(fromByteArray, "fromByteArray");
      function read(buffer, offset, isLE, mLen, nBytes) {
        var e, m2;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d2 = isLE ? -1 : 1;
        var s2 = buffer[offset + i];
        i += d2;
        e = s2 & (1 << -nBits) - 1;
        s2 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        m2 = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
        } else {
          m2 = m2 + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s2 ? -1 : 1) * m2 * Math.pow(2, e - mLen);
      }
      __name(read, "read");
      function write(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m2, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d2 = isLE ? 1 : -1;
        var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m2 = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m2 = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m2 = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d2, m2 /= 256, mLen -= 8) {
        }
        e = e << mLen | m2;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d2, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d2] |= s2 * 128;
      }
      __name(write, "write");
      var toString$1 = {}.toString;
      var isArray = Array.isArray || function(arr) {
        return toString$1.call(arr) == "[object Array]";
      };
      var INSPECT_MAX_BYTES = 50;
      Buffer2.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== void 0 ? global$1.TYPED_ARRAY_SUPPORT : true;
      function kMaxLength() {
        return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      __name(kMaxLength, "kMaxLength");
      function createBuffer(that, length2) {
        if (kMaxLength() < length2) {
          throw new RangeError("Invalid typed array length");
        }
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length2);
          that.__proto__ = Buffer2.prototype;
        } else {
          if (that === null) {
            that = new Buffer2(length2);
          }
          that.length = length2;
        }
        return that;
      }
      __name(createBuffer, "createBuffer");
      function Buffer2(arg, encodingOrOffset, length2) {
        if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
          return new Buffer2(arg, encodingOrOffset, length2);
        }
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          }
          return allocUnsafe(this, arg);
        }
        return from2(this, arg, encodingOrOffset, length2);
      }
      __name(Buffer2, "Buffer");
      Buffer2.poolSize = 8192;
      Buffer2._augment = function(arr) {
        arr.__proto__ = Buffer2.prototype;
        return arr;
      };
      function from2(that, value, encodingOrOffset, length2) {
        if (typeof value === "number") {
          throw new TypeError('"value" argument must not be a number');
        }
        if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
          return fromArrayBuffer(that, value, encodingOrOffset, length2);
        }
        if (typeof value === "string") {
          return fromString(that, value, encodingOrOffset);
        }
        return fromObject(that, value);
      }
      __name(from2, "from");
      Buffer2.from = function(value, encodingOrOffset, length2) {
        return from2(null, value, encodingOrOffset, length2);
      };
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        Buffer2.prototype.__proto__ = Uint8Array.prototype;
        Buffer2.__proto__ = Uint8Array;
      }
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be a number');
        } else if (size < 0) {
          throw new RangeError('"size" argument must not be negative');
        }
      }
      __name(assertSize, "assertSize");
      function alloc2(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(that, size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        }
        return createBuffer(that, size);
      }
      __name(alloc2, "alloc");
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc2(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
        if (!Buffer2.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < size; ++i) {
            that[i] = 0;
          }
        }
        return that;
      }
      __name(allocUnsafe, "allocUnsafe");
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError('"encoding" must be a valid string encoding');
        }
        var length2 = byteLength(string, encoding) | 0;
        that = createBuffer(that, length2);
        var actual = that.write(string, encoding);
        if (actual !== length2) {
          that = that.slice(0, actual);
        }
        return that;
      }
      __name(fromString, "fromString");
      function fromArrayLike(that, array2) {
        var length2 = array2.length < 0 ? 0 : checked(array2.length) | 0;
        that = createBuffer(that, length2);
        for (var i = 0; i < length2; i += 1) {
          that[i] = array2[i] & 255;
        }
        return that;
      }
      __name(fromArrayLike, "fromArrayLike");
      function fromArrayBuffer(that, array2, byteOffset, length2) {
        array2.byteLength;
        if (byteOffset < 0 || array2.byteLength < byteOffset) {
          throw new RangeError("'offset' is out of bounds");
        }
        if (array2.byteLength < byteOffset + (length2 || 0)) {
          throw new RangeError("'length' is out of bounds");
        }
        if (byteOffset === void 0 && length2 === void 0) {
          array2 = new Uint8Array(array2);
        } else if (length2 === void 0) {
          array2 = new Uint8Array(array2, byteOffset);
        } else {
          array2 = new Uint8Array(array2, byteOffset, length2);
        }
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          that = array2;
          that.__proto__ = Buffer2.prototype;
        } else {
          that = fromArrayLike(that, array2);
        }
        return that;
      }
      __name(fromArrayBuffer, "fromArrayBuffer");
      function fromObject(that, obj) {
        if (internalIsBuffer(obj)) {
          var len = checked(obj.length) | 0;
          that = createBuffer(that, len);
          if (that.length === 0) {
            return that;
          }
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if (typeof obj.length !== "number" || isnan(obj.length)) {
              return createBuffer(that, 0);
            }
            return fromArrayLike(that, obj);
          }
          if (obj.type === "Buffer" && isArray(obj.data)) {
            return fromArrayLike(that, obj.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      __name(fromObject, "fromObject");
      function checked(length2) {
        if (length2 >= kMaxLength()) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        }
        return length2 | 0;
      }
      __name(checked, "checked");
      Buffer2.isBuffer = isBuffer;
      function internalIsBuffer(b) {
        return !!(b != null && b._isBuffer);
      }
      __name(internalIsBuffer, "internalIsBuffer");
      Buffer2.compare = /* @__PURE__ */ __name(function compare(a, b) {
        if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y2 = b.length;
        for (var i = 0, len = Math.min(x, y2); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y2 = b[i];
            break;
          }
        }
        if (x < y2)
          return -1;
        if (y2 < x)
          return 1;
        return 0;
      }, "compare");
      Buffer2.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      }, "isEncoding");
      Buffer2.concat = /* @__PURE__ */ __name(function concat(list2, length2) {
        if (!isArray(list2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list2.length === 0) {
          return Buffer2.alloc(0);
        }
        var i;
        if (length2 === void 0) {
          length2 = 0;
          for (i = 0; i < list2.length; ++i) {
            length2 += list2[i].length;
          }
        }
        var buffer = Buffer2.allocUnsafe(length2);
        var pos = 0;
        for (i = 0; i < list2.length; ++i) {
          var buf = list2[i];
          if (!internalIsBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      }, "concat");
      function byteLength(string, encoding) {
        if (internalIsBuffer(string)) {
          return string.length;
        }
        if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          string = "" + string;
        }
        var len = string.length;
        if (len === 0)
          return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
            case void 0:
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase)
                return utf8ToBytes(string).length;
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      __name(byteLength, "byteLength");
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      __name(slowToString, "slowToString");
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m2) {
        var i = b[n];
        b[n] = b[m2];
        b[m2] = i;
      }
      __name(swap, "swap");
      Buffer2.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      }, "swap16");
      Buffer2.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      }, "swap32");
      Buffer2.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      }, "swap64");
      Buffer2.prototype.toString = /* @__PURE__ */ __name(function toString2() {
        var length2 = this.length | 0;
        if (length2 === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length2);
        return slowToString.apply(this, arguments);
      }, "toString");
      Buffer2.prototype.equals = /* @__PURE__ */ __name(function equals(b) {
        if (!internalIsBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer2.compare(this, b) === 0;
      }, "equals");
      Buffer2.prototype.inspect = /* @__PURE__ */ __name(function inspect2() {
        var str = "";
        var max = INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          if (this.length > max)
            str += " ... ";
        }
        return "<Buffer " + str + ">";
      }, "inspect");
      Buffer2.prototype.compare = /* @__PURE__ */ __name(function compare(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y2 = end - start;
        var len = Math.min(x, y2);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y2 = targetCopy[i];
            break;
          }
        }
        if (x < y2)
          return -1;
        if (y2 < x)
          return 1;
        return 0;
      }, "compare");
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (isNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (internalIsBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      __name(bidirectionalIndexOf, "bidirectionalIndexOf");
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        __name(read2, "read");
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      __name(arrayIndexOf, "arrayIndexOf");
      Buffer2.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      }, "includes");
      Buffer2.prototype.indexOf = /* @__PURE__ */ __name(function indexOf2(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      }, "indexOf");
      Buffer2.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      }, "lastIndexOf");
      function hexWrite(buf, string, offset, length2) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length2) {
          length2 = remaining;
        } else {
          length2 = Number(length2);
          if (length2 > remaining) {
            length2 = remaining;
          }
        }
        var strLen = string.length;
        if (strLen % 2 !== 0)
          throw new TypeError("Invalid hex string");
        if (length2 > strLen / 2) {
          length2 = strLen / 2;
        }
        for (var i = 0; i < length2; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      __name(hexWrite, "hexWrite");
      function utf8Write(buf, string, offset, length2) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length2);
      }
      __name(utf8Write, "utf8Write");
      function asciiWrite(buf, string, offset, length2) {
        return blitBuffer(asciiToBytes(string), buf, offset, length2);
      }
      __name(asciiWrite, "asciiWrite");
      function latin1Write(buf, string, offset, length2) {
        return asciiWrite(buf, string, offset, length2);
      }
      __name(latin1Write, "latin1Write");
      function base64Write(buf, string, offset, length2) {
        return blitBuffer(base64ToBytes(string), buf, offset, length2);
      }
      __name(base64Write, "base64Write");
      function ucs2Write(buf, string, offset, length2) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length2);
      }
      __name(ucs2Write, "ucs2Write");
      Buffer2.prototype.write = /* @__PURE__ */ __name(function write2(string, offset, length2, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length2 = this.length;
          offset = 0;
        } else if (length2 === void 0 && typeof offset === "string") {
          encoding = offset;
          length2 = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length2)) {
            length2 = length2 | 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length2;
            length2 = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length2 === void 0 || length2 > remaining)
          length2 = remaining;
        if (string.length > 0 && (length2 < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length2);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length2);
            case "ascii":
              return asciiWrite(this, string, offset, length2);
            case "latin1":
            case "binary":
              return latin1Write(this, string, offset, length2);
            case "base64":
              return base64Write(this, string, offset, length2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length2);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }, "write");
      Buffer2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      }, "toJSON");
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return fromByteArray(buf);
        } else {
          return fromByteArray(buf.slice(start, end));
        }
      }
      __name(base64Slice, "base64Slice");
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      __name(utf8Slice, "utf8Slice");
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      __name(decodeCodePointsArray, "decodeCodePointsArray");
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      __name(asciiSlice, "asciiSlice");
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      __name(latin1Slice, "latin1Slice");
      function hexSlice(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += toHex(buf[i]);
        }
        return out;
      }
      __name(hexSlice, "hexSlice");
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      __name(utf16leSlice, "utf16leSlice");
      Buffer2.prototype.slice = /* @__PURE__ */ __name(function slice2(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer2.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer2(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      }, "slice");
      function checkOffset(offset, ext, length2) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length2)
          throw new RangeError("Trying to access beyond buffer length");
      }
      __name(checkOffset, "checkOffset");
      Buffer2.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      }, "readUIntLE");
      Buffer2.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      }, "readUIntBE");
      Buffer2.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      }, "readUInt8");
      Buffer2.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      }, "readUInt16LE");
      Buffer2.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      }, "readUInt16BE");
      Buffer2.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      }, "readUInt32LE");
      Buffer2.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      }, "readUInt32BE");
      Buffer2.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      }, "readIntLE");
      Buffer2.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      }, "readIntBE");
      Buffer2.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      }, "readInt8");
      Buffer2.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      }, "readInt16LE");
      Buffer2.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      }, "readInt16BE");
      Buffer2.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      }, "readInt32LE");
      Buffer2.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      }, "readInt32BE");
      Buffer2.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return read(this, offset, true, 23, 4);
      }, "readFloatLE");
      Buffer2.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return read(this, offset, false, 23, 4);
      }, "readFloatBE");
      Buffer2.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return read(this, offset, true, 52, 8);
      }, "readDoubleLE");
      Buffer2.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return read(this, offset, false, 52, 8);
      }, "readDoubleBE");
      function checkInt(buf, value, offset, ext, max, min2) {
        if (!internalIsBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min2)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      __name(checkInt, "checkInt");
      Buffer2.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      }, "writeUIntLE");
      Buffer2.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      }, "writeUIntBE");
      Buffer2.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        if (!Buffer2.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      }, "writeUInt8");
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        if (value < 0)
          value = 65535 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
          buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }
      __name(objectWriteUInt16, "objectWriteUInt16");
      Buffer2.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      }, "writeUInt16LE");
      Buffer2.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      }, "writeUInt16BE");
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        if (value < 0)
          value = 4294967295 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
        }
      }
      __name(objectWriteUInt32, "objectWriteUInt32");
      Buffer2.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      }, "writeUInt32LE");
      Buffer2.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      }, "writeUInt32BE");
      Buffer2.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      }, "writeIntLE");
      Buffer2.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      }, "writeIntBE");
      Buffer2.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (!Buffer2.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      }, "writeInt8");
      Buffer2.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      }, "writeInt16LE");
      Buffer2.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      }, "writeInt16BE");
      Buffer2.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      }, "writeInt32LE");
      Buffer2.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      }, "writeInt32BE");
      function checkIEEE754(buf, value, offset, ext, max, min2) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      __name(checkIEEE754, "checkIEEE754");
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4);
        }
        write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      __name(writeFloat, "writeFloat");
      Buffer2.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      }, "writeFloatLE");
      Buffer2.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      }, "writeFloatBE");
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8);
        }
        write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      __name(writeDouble, "writeDouble");
      Buffer2.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      }, "writeDoubleLE");
      Buffer2.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      }, "writeDoubleBE");
      Buffer2.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      }, "copy");
      Buffer2.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      }, "fill");
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      __name(base64clean, "base64clean");
      function stringtrim(str) {
        if (str.trim)
          return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      __name(stringtrim, "stringtrim");
      function toHex(n) {
        if (n < 16)
          return "0" + n.toString(16);
        return n.toString(16);
      }
      __name(toHex, "toHex");
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length2 = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length2; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length2) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      __name(utf8ToBytes, "utf8ToBytes");
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      __name(asciiToBytes, "asciiToBytes");
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      __name(utf16leToBytes, "utf16leToBytes");
      function base64ToBytes(str) {
        return toByteArray(base64clean(str));
      }
      __name(base64ToBytes, "base64ToBytes");
      function blitBuffer(src, dst, offset, length2) {
        for (var i = 0; i < length2; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      __name(blitBuffer, "blitBuffer");
      function isnan(val) {
        return val !== val;
      }
      __name(isnan, "isnan");
      function isBuffer(obj) {
        return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
      }
      __name(isBuffer, "isBuffer");
      function isFastBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      __name(isFastBuffer, "isFastBuffer");
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
      }
      __name(isSlowBuffer, "isSlowBuffer");
      var browser$2 = true;
      var utils$3 = {};
      let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
      let customAlphabet = /* @__PURE__ */ __name((alphabet, defaultSize = 21) => {
        return (size = defaultSize) => {
          let id = "";
          let i = size;
          while (i--) {
            id += alphabet[Math.random() * alphabet.length | 0];
          }
          return id;
        };
      }, "customAlphabet");
      let nanoid = /* @__PURE__ */ __name((size = 21) => {
        let id = "";
        let i = size;
        while (i--) {
          id += urlAlphabet[Math.random() * 64 | 0];
        }
        return id;
      }, "nanoid");
      var nonSecure = { nanoid, customAlphabet };
      var he = { exports: {} };
      (function(module2, exports2) {
        (function(root) {
          var freeExports = exports2;
          var freeModule = module2 && module2.exports == freeExports && module2;
          var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
            root = freeGlobal;
          }
          var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
          var regexAsciiWhitelist = /[\x01-\x7F]/g;
          var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
          var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
          var encodeMap = { "\xAD": "shy", "\u200C": "zwnj", "\u200D": "zwj", "\u200E": "lrm", "\u2063": "ic", "\u2062": "it", "\u2061": "af", "\u200F": "rlm", "\u200B": "ZeroWidthSpace", "\u2060": "NoBreak", "\u0311": "DownBreve", "\u20DB": "tdot", "\u20DC": "DotDot", "	": "Tab", "\n": "NewLine", "\u2008": "puncsp", "\u205F": "MediumSpace", "\u2009": "thinsp", "\u200A": "hairsp", "\u2004": "emsp13", "\u2002": "ensp", "\u2005": "emsp14", "\u2003": "emsp", "\u2007": "numsp", "\xA0": "nbsp", "\u205F\u200A": "ThickSpace", "\u203E": "oline", "_": "lowbar", "\u2010": "dash", "\u2013": "ndash", "\u2014": "mdash", "\u2015": "horbar", ",": "comma", ";": "semi", "\u204F": "bsemi", ":": "colon", "\u2A74": "Colone", "!": "excl", "\xA1": "iexcl", "?": "quest", "\xBF": "iquest", ".": "period", "\u2025": "nldr", "\u2026": "mldr", "\xB7": "middot", "'": "apos", "\u2018": "lsquo", "\u2019": "rsquo", "\u201A": "sbquo", "\u2039": "lsaquo", "\u203A": "rsaquo", '"': "quot", "\u201C": "ldquo", "\u201D": "rdquo", "\u201E": "bdquo", "\xAB": "laquo", "\xBB": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "\u2308": "lceil", "\u2309": "rceil", "\u230A": "lfloor", "\u230B": "rfloor", "\u2985": "lopar", "\u2986": "ropar", "\u298B": "lbrke", "\u298C": "rbrke", "\u298D": "lbrkslu", "\u298E": "rbrksld", "\u298F": "lbrksld", "\u2990": "rbrkslu", "\u2991": "langd", "\u2992": "rangd", "\u2993": "lparlt", "\u2994": "rpargt", "\u2995": "gtlPar", "\u2996": "ltrPar", "\u27E6": "lobrk", "\u27E7": "robrk", "\u27E8": "lang", "\u27E9": "rang", "\u27EA": "Lang", "\u27EB": "Rang", "\u27EC": "loang", "\u27ED": "roang", "\u2772": "lbbrk", "\u2773": "rbbrk", "\u2016": "Vert", "\xA7": "sect", "\xB6": "para", "@": "commat", "*": "ast", "/": "sol", "undefined": null, "&": "amp", "#": "num", "%": "percnt", "\u2030": "permil", "\u2031": "pertenk", "\u2020": "dagger", "\u2021": "Dagger", "\u2022": "bull", "\u2043": "hybull", "\u2032": "prime", "\u2033": "Prime", "\u2034": "tprime", "\u2057": "qprime", "\u2035": "bprime", "\u2041": "caret", "`": "grave", "\xB4": "acute", "\u02DC": "tilde", "^": "Hat", "\xAF": "macr", "\u02D8": "breve", "\u02D9": "dot", "\xA8": "die", "\u02DA": "ring", "\u02DD": "dblac", "\xB8": "cedil", "\u02DB": "ogon", "\u02C6": "circ", "\u02C7": "caron", "\xB0": "deg", "\xA9": "copy", "\xAE": "reg", "\u2117": "copysr", "\u2118": "wp", "\u211E": "rx", "\u2127": "mho", "\u2129": "iiota", "\u2190": "larr", "\u219A": "nlarr", "\u2192": "rarr", "\u219B": "nrarr", "\u2191": "uarr", "\u2193": "darr", "\u2194": "harr", "\u21AE": "nharr", "\u2195": "varr", "\u2196": "nwarr", "\u2197": "nearr", "\u2198": "searr", "\u2199": "swarr", "\u219D": "rarrw", "\u219D\u0338": "nrarrw", "\u219E": "Larr", "\u219F": "Uarr", "\u21A0": "Rarr", "\u21A1": "Darr", "\u21A2": "larrtl", "\u21A3": "rarrtl", "\u21A4": "mapstoleft", "\u21A5": "mapstoup", "\u21A6": "map", "\u21A7": "mapstodown", "\u21A9": "larrhk", "\u21AA": "rarrhk", "\u21AB": "larrlp", "\u21AC": "rarrlp", "\u21AD": "harrw", "\u21B0": "lsh", "\u21B1": "rsh", "\u21B2": "ldsh", "\u21B3": "rdsh", "\u21B5": "crarr", "\u21B6": "cularr", "\u21B7": "curarr", "\u21BA": "olarr", "\u21BB": "orarr", "\u21BC": "lharu", "\u21BD": "lhard", "\u21BE": "uharr", "\u21BF": "uharl", "\u21C0": "rharu", "\u21C1": "rhard", "\u21C2": "dharr", "\u21C3": "dharl", "\u21C4": "rlarr", "\u21C5": "udarr", "\u21C6": "lrarr", "\u21C7": "llarr", "\u21C8": "uuarr", "\u21C9": "rrarr", "\u21CA": "ddarr", "\u21CB": "lrhar", "\u21CC": "rlhar", "\u21D0": "lArr", "\u21CD": "nlArr", "\u21D1": "uArr", "\u21D2": "rArr", "\u21CF": "nrArr", "\u21D3": "dArr", "\u21D4": "iff", "\u21CE": "nhArr", "\u21D5": "vArr", "\u21D6": "nwArr", "\u21D7": "neArr", "\u21D8": "seArr", "\u21D9": "swArr", "\u21DA": "lAarr", "\u21DB": "rAarr", "\u21DD": "zigrarr", "\u21E4": "larrb", "\u21E5": "rarrb", "\u21F5": "duarr", "\u21FD": "loarr", "\u21FE": "roarr", "\u21FF": "hoarr", "\u2200": "forall", "\u2201": "comp", "\u2202": "part", "\u2202\u0338": "npart", "\u2203": "exist", "\u2204": "nexist", "\u2205": "empty", "\u2207": "Del", "\u2208": "in", "\u2209": "notin", "\u220B": "ni", "\u220C": "notni", "\u03F6": "bepsi", "\u220F": "prod", "\u2210": "coprod", "\u2211": "sum", "+": "plus", "\xB1": "pm", "\xF7": "div", "\xD7": "times", "<": "lt", "\u226E": "nlt", "<\u20D2": "nvlt", "=": "equals", "\u2260": "ne", "=\u20E5": "bne", "\u2A75": "Equal", ">": "gt", "\u226F": "ngt", ">\u20D2": "nvgt", "\xAC": "not", "|": "vert", "\xA6": "brvbar", "\u2212": "minus", "\u2213": "mp", "\u2214": "plusdo", "\u2044": "frasl", "\u2216": "setmn", "\u2217": "lowast", "\u2218": "compfn", "\u221A": "Sqrt", "\u221D": "prop", "\u221E": "infin", "\u221F": "angrt", "\u2220": "ang", "\u2220\u20D2": "nang", "\u2221": "angmsd", "\u2222": "angsph", "\u2223": "mid", "\u2224": "nmid", "\u2225": "par", "\u2226": "npar", "\u2227": "and", "\u2228": "or", "\u2229": "cap", "\u2229\uFE00": "caps", "\u222A": "cup", "\u222A\uFE00": "cups", "\u222B": "int", "\u222C": "Int", "\u222D": "tint", "\u2A0C": "qint", "\u222E": "oint", "\u222F": "Conint", "\u2230": "Cconint", "\u2231": "cwint", "\u2232": "cwconint", "\u2233": "awconint", "\u2234": "there4", "\u2235": "becaus", "\u2236": "ratio", "\u2237": "Colon", "\u2238": "minusd", "\u223A": "mDDot", "\u223B": "homtht", "\u223C": "sim", "\u2241": "nsim", "\u223C\u20D2": "nvsim", "\u223D": "bsim", "\u223D\u0331": "race", "\u223E": "ac", "\u223E\u0333": "acE", "\u223F": "acd", "\u2240": "wr", "\u2242": "esim", "\u2242\u0338": "nesim", "\u2243": "sime", "\u2244": "nsime", "\u2245": "cong", "\u2247": "ncong", "\u2246": "simne", "\u2248": "ap", "\u2249": "nap", "\u224A": "ape", "\u224B": "apid", "\u224B\u0338": "napid", "\u224C": "bcong", "\u224D": "CupCap", "\u226D": "NotCupCap", "\u224D\u20D2": "nvap", "\u224E": "bump", "\u224E\u0338": "nbump", "\u224F": "bumpe", "\u224F\u0338": "nbumpe", "\u2250": "doteq", "\u2250\u0338": "nedot", "\u2251": "eDot", "\u2252": "efDot", "\u2253": "erDot", "\u2254": "colone", "\u2255": "ecolon", "\u2256": "ecir", "\u2257": "cire", "\u2259": "wedgeq", "\u225A": "veeeq", "\u225C": "trie", "\u225F": "equest", "\u2261": "equiv", "\u2262": "nequiv", "\u2261\u20E5": "bnequiv", "\u2264": "le", "\u2270": "nle", "\u2264\u20D2": "nvle", "\u2265": "ge", "\u2271": "nge", "\u2265\u20D2": "nvge", "\u2266": "lE", "\u2266\u0338": "nlE", "\u2267": "gE", "\u2267\u0338": "ngE", "\u2268\uFE00": "lvnE", "\u2268": "lnE", "\u2269": "gnE", "\u2269\uFE00": "gvnE", "\u226A": "ll", "\u226A\u0338": "nLtv", "\u226A\u20D2": "nLt", "\u226B": "gg", "\u226B\u0338": "nGtv", "\u226B\u20D2": "nGt", "\u226C": "twixt", "\u2272": "lsim", "\u2274": "nlsim", "\u2273": "gsim", "\u2275": "ngsim", "\u2276": "lg", "\u2278": "ntlg", "\u2277": "gl", "\u2279": "ntgl", "\u227A": "pr", "\u2280": "npr", "\u227B": "sc", "\u2281": "nsc", "\u227C": "prcue", "\u22E0": "nprcue", "\u227D": "sccue", "\u22E1": "nsccue", "\u227E": "prsim", "\u227F": "scsim", "\u227F\u0338": "NotSucceedsTilde", "\u2282": "sub", "\u2284": "nsub", "\u2282\u20D2": "vnsub", "\u2283": "sup", "\u2285": "nsup", "\u2283\u20D2": "vnsup", "\u2286": "sube", "\u2288": "nsube", "\u2287": "supe", "\u2289": "nsupe", "\u228A\uFE00": "vsubne", "\u228A": "subne", "\u228B\uFE00": "vsupne", "\u228B": "supne", "\u228D": "cupdot", "\u228E": "uplus", "\u228F": "sqsub", "\u228F\u0338": "NotSquareSubset", "\u2290": "sqsup", "\u2290\u0338": "NotSquareSuperset", "\u2291": "sqsube", "\u22E2": "nsqsube", "\u2292": "sqsupe", "\u22E3": "nsqsupe", "\u2293": "sqcap", "\u2293\uFE00": "sqcaps", "\u2294": "sqcup", "\u2294\uFE00": "sqcups", "\u2295": "oplus", "\u2296": "ominus", "\u2297": "otimes", "\u2298": "osol", "\u2299": "odot", "\u229A": "ocir", "\u229B": "oast", "\u229D": "odash", "\u229E": "plusb", "\u229F": "minusb", "\u22A0": "timesb", "\u22A1": "sdotb", "\u22A2": "vdash", "\u22AC": "nvdash", "\u22A3": "dashv", "\u22A4": "top", "\u22A5": "bot", "\u22A7": "models", "\u22A8": "vDash", "\u22AD": "nvDash", "\u22A9": "Vdash", "\u22AE": "nVdash", "\u22AA": "Vvdash", "\u22AB": "VDash", "\u22AF": "nVDash", "\u22B0": "prurel", "\u22B2": "vltri", "\u22EA": "nltri", "\u22B3": "vrtri", "\u22EB": "nrtri", "\u22B4": "ltrie", "\u22EC": "nltrie", "\u22B4\u20D2": "nvltrie", "\u22B5": "rtrie", "\u22ED": "nrtrie", "\u22B5\u20D2": "nvrtrie", "\u22B6": "origof", "\u22B7": "imof", "\u22B8": "mumap", "\u22B9": "hercon", "\u22BA": "intcal", "\u22BB": "veebar", "\u22BD": "barvee", "\u22BE": "angrtvb", "\u22BF": "lrtri", "\u22C0": "Wedge", "\u22C1": "Vee", "\u22C2": "xcap", "\u22C3": "xcup", "\u22C4": "diam", "\u22C5": "sdot", "\u22C6": "Star", "\u22C7": "divonx", "\u22C8": "bowtie", "\u22C9": "ltimes", "\u22CA": "rtimes", "\u22CB": "lthree", "\u22CC": "rthree", "\u22CD": "bsime", "\u22CE": "cuvee", "\u22CF": "cuwed", "\u22D0": "Sub", "\u22D1": "Sup", "\u22D2": "Cap", "\u22D3": "Cup", "\u22D4": "fork", "\u22D5": "epar", "\u22D6": "ltdot", "\u22D7": "gtdot", "\u22D8": "Ll", "\u22D8\u0338": "nLl", "\u22D9": "Gg", "\u22D9\u0338": "nGg", "\u22DA\uFE00": "lesg", "\u22DA": "leg", "\u22DB": "gel", "\u22DB\uFE00": "gesl", "\u22DE": "cuepr", "\u22DF": "cuesc", "\u22E6": "lnsim", "\u22E7": "gnsim", "\u22E8": "prnsim", "\u22E9": "scnsim", "\u22EE": "vellip", "\u22EF": "ctdot", "\u22F0": "utdot", "\u22F1": "dtdot", "\u22F2": "disin", "\u22F3": "isinsv", "\u22F4": "isins", "\u22F5": "isindot", "\u22F5\u0338": "notindot", "\u22F6": "notinvc", "\u22F7": "notinvb", "\u22F9": "isinE", "\u22F9\u0338": "notinE", "\u22FA": "nisd", "\u22FB": "xnis", "\u22FC": "nis", "\u22FD": "notnivc", "\u22FE": "notnivb", "\u2305": "barwed", "\u2306": "Barwed", "\u230C": "drcrop", "\u230D": "dlcrop", "\u230E": "urcrop", "\u230F": "ulcrop", "\u2310": "bnot", "\u2312": "profline", "\u2313": "profsurf", "\u2315": "telrec", "\u2316": "target", "\u231C": "ulcorn", "\u231D": "urcorn", "\u231E": "dlcorn", "\u231F": "drcorn", "\u2322": "frown", "\u2323": "smile", "\u232D": "cylcty", "\u232E": "profalar", "\u2336": "topbot", "\u233D": "ovbar", "\u233F": "solbar", "\u237C": "angzarr", "\u23B0": "lmoust", "\u23B1": "rmoust", "\u23B4": "tbrk", "\u23B5": "bbrk", "\u23B6": "bbrktbrk", "\u23DC": "OverParenthesis", "\u23DD": "UnderParenthesis", "\u23DE": "OverBrace", "\u23DF": "UnderBrace", "\u23E2": "trpezium", "\u23E7": "elinters", "\u2423": "blank", "\u2500": "boxh", "\u2502": "boxv", "\u250C": "boxdr", "\u2510": "boxdl", "\u2514": "boxur", "\u2518": "boxul", "\u251C": "boxvr", "\u2524": "boxvl", "\u252C": "boxhd", "\u2534": "boxhu", "\u253C": "boxvh", "\u2550": "boxH", "\u2551": "boxV", "\u2552": "boxdR", "\u2553": "boxDr", "\u2554": "boxDR", "\u2555": "boxdL", "\u2556": "boxDl", "\u2557": "boxDL", "\u2558": "boxuR", "\u2559": "boxUr", "\u255A": "boxUR", "\u255B": "boxuL", "\u255C": "boxUl", "\u255D": "boxUL", "\u255E": "boxvR", "\u255F": "boxVr", "\u2560": "boxVR", "\u2561": "boxvL", "\u2562": "boxVl", "\u2563": "boxVL", "\u2564": "boxHd", "\u2565": "boxhD", "\u2566": "boxHD", "\u2567": "boxHu", "\u2568": "boxhU", "\u2569": "boxHU", "\u256A": "boxvH", "\u256B": "boxVh", "\u256C": "boxVH", "\u2580": "uhblk", "\u2584": "lhblk", "\u2588": "block", "\u2591": "blk14", "\u2592": "blk12", "\u2593": "blk34", "\u25A1": "squ", "\u25AA": "squf", "\u25AB": "EmptyVerySmallSquare", "\u25AD": "rect", "\u25AE": "marker", "\u25B1": "fltns", "\u25B3": "xutri", "\u25B4": "utrif", "\u25B5": "utri", "\u25B8": "rtrif", "\u25B9": "rtri", "\u25BD": "xdtri", "\u25BE": "dtrif", "\u25BF": "dtri", "\u25C2": "ltrif", "\u25C3": "ltri", "\u25CA": "loz", "\u25CB": "cir", "\u25EC": "tridot", "\u25EF": "xcirc", "\u25F8": "ultri", "\u25F9": "urtri", "\u25FA": "lltri", "\u25FB": "EmptySmallSquare", "\u25FC": "FilledSmallSquare", "\u2605": "starf", "\u2606": "star", "\u260E": "phone", "\u2640": "female", "\u2642": "male", "\u2660": "spades", "\u2663": "clubs", "\u2665": "hearts", "\u2666": "diams", "\u266A": "sung", "\u2713": "check", "\u2717": "cross", "\u2720": "malt", "\u2736": "sext", "\u2758": "VerticalSeparator", "\u27C8": "bsolhsub", "\u27C9": "suphsol", "\u27F5": "xlarr", "\u27F6": "xrarr", "\u27F7": "xharr", "\u27F8": "xlArr", "\u27F9": "xrArr", "\u27FA": "xhArr", "\u27FC": "xmap", "\u27FF": "dzigrarr", "\u2902": "nvlArr", "\u2903": "nvrArr", "\u2904": "nvHarr", "\u2905": "Map", "\u290C": "lbarr", "\u290D": "rbarr", "\u290E": "lBarr", "\u290F": "rBarr", "\u2910": "RBarr", "\u2911": "DDotrahd", "\u2912": "UpArrowBar", "\u2913": "DownArrowBar", "\u2916": "Rarrtl", "\u2919": "latail", "\u291A": "ratail", "\u291B": "lAtail", "\u291C": "rAtail", "\u291D": "larrfs", "\u291E": "rarrfs", "\u291F": "larrbfs", "\u2920": "rarrbfs", "\u2923": "nwarhk", "\u2924": "nearhk", "\u2925": "searhk", "\u2926": "swarhk", "\u2927": "nwnear", "\u2928": "toea", "\u2929": "tosa", "\u292A": "swnwar", "\u2933": "rarrc", "\u2933\u0338": "nrarrc", "\u2935": "cudarrr", "\u2936": "ldca", "\u2937": "rdca", "\u2938": "cudarrl", "\u2939": "larrpl", "\u293C": "curarrm", "\u293D": "cularrp", "\u2945": "rarrpl", "\u2948": "harrcir", "\u2949": "Uarrocir", "\u294A": "lurdshar", "\u294B": "ldrushar", "\u294E": "LeftRightVector", "\u294F": "RightUpDownVector", "\u2950": "DownLeftRightVector", "\u2951": "LeftUpDownVector", "\u2952": "LeftVectorBar", "\u2953": "RightVectorBar", "\u2954": "RightUpVectorBar", "\u2955": "RightDownVectorBar", "\u2956": "DownLeftVectorBar", "\u2957": "DownRightVectorBar", "\u2958": "LeftUpVectorBar", "\u2959": "LeftDownVectorBar", "\u295A": "LeftTeeVector", "\u295B": "RightTeeVector", "\u295C": "RightUpTeeVector", "\u295D": "RightDownTeeVector", "\u295E": "DownLeftTeeVector", "\u295F": "DownRightTeeVector", "\u2960": "LeftUpTeeVector", "\u2961": "LeftDownTeeVector", "\u2962": "lHar", "\u2963": "uHar", "\u2964": "rHar", "\u2965": "dHar", "\u2966": "luruhar", "\u2967": "ldrdhar", "\u2968": "ruluhar", "\u2969": "rdldhar", "\u296A": "lharul", "\u296B": "llhard", "\u296C": "rharul", "\u296D": "lrhard", "\u296E": "udhar", "\u296F": "duhar", "\u2970": "RoundImplies", "\u2971": "erarr", "\u2972": "simrarr", "\u2973": "larrsim", "\u2974": "rarrsim", "\u2975": "rarrap", "\u2976": "ltlarr", "\u2978": "gtrarr", "\u2979": "subrarr", "\u297B": "suplarr", "\u297C": "lfisht", "\u297D": "rfisht", "\u297E": "ufisht", "\u297F": "dfisht", "\u299A": "vzigzag", "\u299C": "vangrt", "\u299D": "angrtvbd", "\u29A4": "ange", "\u29A5": "range", "\u29A6": "dwangle", "\u29A7": "uwangle", "\u29A8": "angmsdaa", "\u29A9": "angmsdab", "\u29AA": "angmsdac", "\u29AB": "angmsdad", "\u29AC": "angmsdae", "\u29AD": "angmsdaf", "\u29AE": "angmsdag", "\u29AF": "angmsdah", "\u29B0": "bemptyv", "\u29B1": "demptyv", "\u29B2": "cemptyv", "\u29B3": "raemptyv", "\u29B4": "laemptyv", "\u29B5": "ohbar", "\u29B6": "omid", "\u29B7": "opar", "\u29B9": "operp", "\u29BB": "olcross", "\u29BC": "odsold", "\u29BE": "olcir", "\u29BF": "ofcir", "\u29C0": "olt", "\u29C1": "ogt", "\u29C2": "cirscir", "\u29C3": "cirE", "\u29C4": "solb", "\u29C5": "bsolb", "\u29C9": "boxbox", "\u29CD": "trisb", "\u29CE": "rtriltri", "\u29CF": "LeftTriangleBar", "\u29CF\u0338": "NotLeftTriangleBar", "\u29D0": "RightTriangleBar", "\u29D0\u0338": "NotRightTriangleBar", "\u29DC": "iinfin", "\u29DD": "infintie", "\u29DE": "nvinfin", "\u29E3": "eparsl", "\u29E4": "smeparsl", "\u29E5": "eqvparsl", "\u29EB": "lozf", "\u29F4": "RuleDelayed", "\u29F6": "dsol", "\u2A00": "xodot", "\u2A01": "xoplus", "\u2A02": "xotime", "\u2A04": "xuplus", "\u2A06": "xsqcup", "\u2A0D": "fpartint", "\u2A10": "cirfnint", "\u2A11": "awint", "\u2A12": "rppolint", "\u2A13": "scpolint", "\u2A14": "npolint", "\u2A15": "pointint", "\u2A16": "quatint", "\u2A17": "intlarhk", "\u2A22": "pluscir", "\u2A23": "plusacir", "\u2A24": "simplus", "\u2A25": "plusdu", "\u2A26": "plussim", "\u2A27": "plustwo", "\u2A29": "mcomma", "\u2A2A": "minusdu", "\u2A2D": "loplus", "\u2A2E": "roplus", "\u2A2F": "Cross", "\u2A30": "timesd", "\u2A31": "timesbar", "\u2A33": "smashp", "\u2A34": "lotimes", "\u2A35": "rotimes", "\u2A36": "otimesas", "\u2A37": "Otimes", "\u2A38": "odiv", "\u2A39": "triplus", "\u2A3A": "triminus", "\u2A3B": "tritime", "\u2A3C": "iprod", "\u2A3F": "amalg", "\u2A40": "capdot", "\u2A42": "ncup", "\u2A43": "ncap", "\u2A44": "capand", "\u2A45": "cupor", "\u2A46": "cupcap", "\u2A47": "capcup", "\u2A48": "cupbrcap", "\u2A49": "capbrcup", "\u2A4A": "cupcup", "\u2A4B": "capcap", "\u2A4C": "ccups", "\u2A4D": "ccaps", "\u2A50": "ccupssm", "\u2A53": "And", "\u2A54": "Or", "\u2A55": "andand", "\u2A56": "oror", "\u2A57": "orslope", "\u2A58": "andslope", "\u2A5A": "andv", "\u2A5B": "orv", "\u2A5C": "andd", "\u2A5D": "ord", "\u2A5F": "wedbar", "\u2A66": "sdote", "\u2A6A": "simdot", "\u2A6D": "congdot", "\u2A6D\u0338": "ncongdot", "\u2A6E": "easter", "\u2A6F": "apacir", "\u2A70": "apE", "\u2A70\u0338": "napE", "\u2A71": "eplus", "\u2A72": "pluse", "\u2A73": "Esim", "\u2A77": "eDDot", "\u2A78": "equivDD", "\u2A79": "ltcir", "\u2A7A": "gtcir", "\u2A7B": "ltquest", "\u2A7C": "gtquest", "\u2A7D": "les", "\u2A7D\u0338": "nles", "\u2A7E": "ges", "\u2A7E\u0338": "nges", "\u2A7F": "lesdot", "\u2A80": "gesdot", "\u2A81": "lesdoto", "\u2A82": "gesdoto", "\u2A83": "lesdotor", "\u2A84": "gesdotol", "\u2A85": "lap", "\u2A86": "gap", "\u2A87": "lne", "\u2A88": "gne", "\u2A89": "lnap", "\u2A8A": "gnap", "\u2A8B": "lEg", "\u2A8C": "gEl", "\u2A8D": "lsime", "\u2A8E": "gsime", "\u2A8F": "lsimg", "\u2A90": "gsiml", "\u2A91": "lgE", "\u2A92": "glE", "\u2A93": "lesges", "\u2A94": "gesles", "\u2A95": "els", "\u2A96": "egs", "\u2A97": "elsdot", "\u2A98": "egsdot", "\u2A99": "el", "\u2A9A": "eg", "\u2A9D": "siml", "\u2A9E": "simg", "\u2A9F": "simlE", "\u2AA0": "simgE", "\u2AA1": "LessLess", "\u2AA1\u0338": "NotNestedLessLess", "\u2AA2": "GreaterGreater", "\u2AA2\u0338": "NotNestedGreaterGreater", "\u2AA4": "glj", "\u2AA5": "gla", "\u2AA6": "ltcc", "\u2AA7": "gtcc", "\u2AA8": "lescc", "\u2AA9": "gescc", "\u2AAA": "smt", "\u2AAB": "lat", "\u2AAC": "smte", "\u2AAC\uFE00": "smtes", "\u2AAD": "late", "\u2AAD\uFE00": "lates", "\u2AAE": "bumpE", "\u2AAF": "pre", "\u2AAF\u0338": "npre", "\u2AB0": "sce", "\u2AB0\u0338": "nsce", "\u2AB3": "prE", "\u2AB4": "scE", "\u2AB5": "prnE", "\u2AB6": "scnE", "\u2AB7": "prap", "\u2AB8": "scap", "\u2AB9": "prnap", "\u2ABA": "scnap", "\u2ABB": "Pr", "\u2ABC": "Sc", "\u2ABD": "subdot", "\u2ABE": "supdot", "\u2ABF": "subplus", "\u2AC0": "supplus", "\u2AC1": "submult", "\u2AC2": "supmult", "\u2AC3": "subedot", "\u2AC4": "supedot", "\u2AC5": "subE", "\u2AC5\u0338": "nsubE", "\u2AC6": "supE", "\u2AC6\u0338": "nsupE", "\u2AC7": "subsim", "\u2AC8": "supsim", "\u2ACB\uFE00": "vsubnE", "\u2ACB": "subnE", "\u2ACC\uFE00": "vsupnE", "\u2ACC": "supnE", "\u2ACF": "csub", "\u2AD0": "csup", "\u2AD1": "csube", "\u2AD2": "csupe", "\u2AD3": "subsup", "\u2AD4": "supsub", "\u2AD5": "subsub", "\u2AD6": "supsup", "\u2AD7": "suphsub", "\u2AD8": "supdsub", "\u2AD9": "forkv", "\u2ADA": "topfork", "\u2ADB": "mlcp", "\u2AE4": "Dashv", "\u2AE6": "Vdashl", "\u2AE7": "Barv", "\u2AE8": "vBar", "\u2AE9": "vBarv", "\u2AEB": "Vbar", "\u2AEC": "Not", "\u2AED": "bNot", "\u2AEE": "rnmid", "\u2AEF": "cirmid", "\u2AF0": "midcir", "\u2AF1": "topcir", "\u2AF2": "nhpar", "\u2AF3": "parsim", "\u2AFD": "parsl", "\u2AFD\u20E5": "nparsl", "\u266D": "flat", "\u266E": "natur", "\u266F": "sharp", "\xA4": "curren", "\xA2": "cent", "$": "dollar", "\xA3": "pound", "\xA5": "yen", "\u20AC": "euro", "\xB9": "sup1", "\xBD": "half", "\u2153": "frac13", "\xBC": "frac14", "\u2155": "frac15", "\u2159": "frac16", "\u215B": "frac18", "\xB2": "sup2", "\u2154": "frac23", "\u2156": "frac25", "\xB3": "sup3", "\xBE": "frac34", "\u2157": "frac35", "\u215C": "frac38", "\u2158": "frac45", "\u215A": "frac56", "\u215D": "frac58", "\u215E": "frac78", "\u{1D4B6}": "ascr", "\u{1D552}": "aopf", "\u{1D51E}": "afr", "\u{1D538}": "Aopf", "\u{1D504}": "Afr", "\u{1D49C}": "Ascr", "\xAA": "ordf", "\xE1": "aacute", "\xC1": "Aacute", "\xE0": "agrave", "\xC0": "Agrave", "\u0103": "abreve", "\u0102": "Abreve", "\xE2": "acirc", "\xC2": "Acirc", "\xE5": "aring", "\xC5": "angst", "\xE4": "auml", "\xC4": "Auml", "\xE3": "atilde", "\xC3": "Atilde", "\u0105": "aogon", "\u0104": "Aogon", "\u0101": "amacr", "\u0100": "Amacr", "\xE6": "aelig", "\xC6": "AElig", "\u{1D4B7}": "bscr", "\u{1D553}": "bopf", "\u{1D51F}": "bfr", "\u{1D539}": "Bopf", "\u212C": "Bscr", "\u{1D505}": "Bfr", "\u{1D520}": "cfr", "\u{1D4B8}": "cscr", "\u{1D554}": "copf", "\u212D": "Cfr", "\u{1D49E}": "Cscr", "\u2102": "Copf", "\u0107": "cacute", "\u0106": "Cacute", "\u0109": "ccirc", "\u0108": "Ccirc", "\u010D": "ccaron", "\u010C": "Ccaron", "\u010B": "cdot", "\u010A": "Cdot", "\xE7": "ccedil", "\xC7": "Ccedil", "\u2105": "incare", "\u{1D521}": "dfr", "\u2146": "dd", "\u{1D555}": "dopf", "\u{1D4B9}": "dscr", "\u{1D49F}": "Dscr", "\u{1D507}": "Dfr", "\u2145": "DD", "\u{1D53B}": "Dopf", "\u010F": "dcaron", "\u010E": "Dcaron", "\u0111": "dstrok", "\u0110": "Dstrok", "\xF0": "eth", "\xD0": "ETH", "\u2147": "ee", "\u212F": "escr", "\u{1D522}": "efr", "\u{1D556}": "eopf", "\u2130": "Escr", "\u{1D508}": "Efr", "\u{1D53C}": "Eopf", "\xE9": "eacute", "\xC9": "Eacute", "\xE8": "egrave", "\xC8": "Egrave", "\xEA": "ecirc", "\xCA": "Ecirc", "\u011B": "ecaron", "\u011A": "Ecaron", "\xEB": "euml", "\xCB": "Euml", "\u0117": "edot", "\u0116": "Edot", "\u0119": "eogon", "\u0118": "Eogon", "\u0113": "emacr", "\u0112": "Emacr", "\u{1D523}": "ffr", "\u{1D557}": "fopf", "\u{1D4BB}": "fscr", "\u{1D509}": "Ffr", "\u{1D53D}": "Fopf", "\u2131": "Fscr", "\uFB00": "fflig", "\uFB03": "ffilig", "\uFB04": "ffllig", "\uFB01": "filig", "fj": "fjlig", "\uFB02": "fllig", "\u0192": "fnof", "\u210A": "gscr", "\u{1D558}": "gopf", "\u{1D524}": "gfr", "\u{1D4A2}": "Gscr", "\u{1D53E}": "Gopf", "\u{1D50A}": "Gfr", "\u01F5": "gacute", "\u011F": "gbreve", "\u011E": "Gbreve", "\u011D": "gcirc", "\u011C": "Gcirc", "\u0121": "gdot", "\u0120": "Gdot", "\u0122": "Gcedil", "\u{1D525}": "hfr", "\u210E": "planckh", "\u{1D4BD}": "hscr", "\u{1D559}": "hopf", "\u210B": "Hscr", "\u210C": "Hfr", "\u210D": "Hopf", "\u0125": "hcirc", "\u0124": "Hcirc", "\u210F": "hbar", "\u0127": "hstrok", "\u0126": "Hstrok", "\u{1D55A}": "iopf", "\u{1D526}": "ifr", "\u{1D4BE}": "iscr", "\u2148": "ii", "\u{1D540}": "Iopf", "\u2110": "Iscr", "\u2111": "Im", "\xED": "iacute", "\xCD": "Iacute", "\xEC": "igrave", "\xCC": "Igrave", "\xEE": "icirc", "\xCE": "Icirc", "\xEF": "iuml", "\xCF": "Iuml", "\u0129": "itilde", "\u0128": "Itilde", "\u0130": "Idot", "\u012F": "iogon", "\u012E": "Iogon", "\u012B": "imacr", "\u012A": "Imacr", "\u0133": "ijlig", "\u0132": "IJlig", "\u0131": "imath", "\u{1D4BF}": "jscr", "\u{1D55B}": "jopf", "\u{1D527}": "jfr", "\u{1D4A5}": "Jscr", "\u{1D50D}": "Jfr", "\u{1D541}": "Jopf", "\u0135": "jcirc", "\u0134": "Jcirc", "\u0237": "jmath", "\u{1D55C}": "kopf", "\u{1D4C0}": "kscr", "\u{1D528}": "kfr", "\u{1D4A6}": "Kscr", "\u{1D542}": "Kopf", "\u{1D50E}": "Kfr", "\u0137": "kcedil", "\u0136": "Kcedil", "\u{1D529}": "lfr", "\u{1D4C1}": "lscr", "\u2113": "ell", "\u{1D55D}": "lopf", "\u2112": "Lscr", "\u{1D50F}": "Lfr", "\u{1D543}": "Lopf", "\u013A": "lacute", "\u0139": "Lacute", "\u013E": "lcaron", "\u013D": "Lcaron", "\u013C": "lcedil", "\u013B": "Lcedil", "\u0142": "lstrok", "\u0141": "Lstrok", "\u0140": "lmidot", "\u013F": "Lmidot", "\u{1D52A}": "mfr", "\u{1D55E}": "mopf", "\u{1D4C2}": "mscr", "\u{1D510}": "Mfr", "\u{1D544}": "Mopf", "\u2133": "Mscr", "\u{1D52B}": "nfr", "\u{1D55F}": "nopf", "\u{1D4C3}": "nscr", "\u2115": "Nopf", "\u{1D4A9}": "Nscr", "\u{1D511}": "Nfr", "\u0144": "nacute", "\u0143": "Nacute", "\u0148": "ncaron", "\u0147": "Ncaron", "\xF1": "ntilde", "\xD1": "Ntilde", "\u0146": "ncedil", "\u0145": "Ncedil", "\u2116": "numero", "\u014B": "eng", "\u014A": "ENG", "\u{1D560}": "oopf", "\u{1D52C}": "ofr", "\u2134": "oscr", "\u{1D4AA}": "Oscr", "\u{1D512}": "Ofr", "\u{1D546}": "Oopf", "\xBA": "ordm", "\xF3": "oacute", "\xD3": "Oacute", "\xF2": "ograve", "\xD2": "Ograve", "\xF4": "ocirc", "\xD4": "Ocirc", "\xF6": "ouml", "\xD6": "Ouml", "\u0151": "odblac", "\u0150": "Odblac", "\xF5": "otilde", "\xD5": "Otilde", "\xF8": "oslash", "\xD8": "Oslash", "\u014D": "omacr", "\u014C": "Omacr", "\u0153": "oelig", "\u0152": "OElig", "\u{1D52D}": "pfr", "\u{1D4C5}": "pscr", "\u{1D561}": "popf", "\u2119": "Popf", "\u{1D513}": "Pfr", "\u{1D4AB}": "Pscr", "\u{1D562}": "qopf", "\u{1D52E}": "qfr", "\u{1D4C6}": "qscr", "\u{1D4AC}": "Qscr", "\u{1D514}": "Qfr", "\u211A": "Qopf", "\u0138": "kgreen", "\u{1D52F}": "rfr", "\u{1D563}": "ropf", "\u{1D4C7}": "rscr", "\u211B": "Rscr", "\u211C": "Re", "\u211D": "Ropf", "\u0155": "racute", "\u0154": "Racute", "\u0159": "rcaron", "\u0158": "Rcaron", "\u0157": "rcedil", "\u0156": "Rcedil", "\u{1D564}": "sopf", "\u{1D4C8}": "sscr", "\u{1D530}": "sfr", "\u{1D54A}": "Sopf", "\u{1D516}": "Sfr", "\u{1D4AE}": "Sscr", "\u24C8": "oS", "\u015B": "sacute", "\u015A": "Sacute", "\u015D": "scirc", "\u015C": "Scirc", "\u0161": "scaron", "\u0160": "Scaron", "\u015F": "scedil", "\u015E": "Scedil", "\xDF": "szlig", "\u{1D531}": "tfr", "\u{1D4C9}": "tscr", "\u{1D565}": "topf", "\u{1D4AF}": "Tscr", "\u{1D517}": "Tfr", "\u{1D54B}": "Topf", "\u0165": "tcaron", "\u0164": "Tcaron", "\u0163": "tcedil", "\u0162": "Tcedil", "\u2122": "trade", "\u0167": "tstrok", "\u0166": "Tstrok", "\u{1D4CA}": "uscr", "\u{1D566}": "uopf", "\u{1D532}": "ufr", "\u{1D54C}": "Uopf", "\u{1D518}": "Ufr", "\u{1D4B0}": "Uscr", "\xFA": "uacute", "\xDA": "Uacute", "\xF9": "ugrave", "\xD9": "Ugrave", "\u016D": "ubreve", "\u016C": "Ubreve", "\xFB": "ucirc", "\xDB": "Ucirc", "\u016F": "uring", "\u016E": "Uring", "\xFC": "uuml", "\xDC": "Uuml", "\u0171": "udblac", "\u0170": "Udblac", "\u0169": "utilde", "\u0168": "Utilde", "\u0173": "uogon", "\u0172": "Uogon", "\u016B": "umacr", "\u016A": "Umacr", "\u{1D533}": "vfr", "\u{1D567}": "vopf", "\u{1D4CB}": "vscr", "\u{1D519}": "Vfr", "\u{1D54D}": "Vopf", "\u{1D4B1}": "Vscr", "\u{1D568}": "wopf", "\u{1D4CC}": "wscr", "\u{1D534}": "wfr", "\u{1D4B2}": "Wscr", "\u{1D54E}": "Wopf", "\u{1D51A}": "Wfr", "\u0175": "wcirc", "\u0174": "Wcirc", "\u{1D535}": "xfr", "\u{1D4CD}": "xscr", "\u{1D569}": "xopf", "\u{1D54F}": "Xopf", "\u{1D51B}": "Xfr", "\u{1D4B3}": "Xscr", "\u{1D536}": "yfr", "\u{1D4CE}": "yscr", "\u{1D56A}": "yopf", "\u{1D4B4}": "Yscr", "\u{1D51C}": "Yfr", "\u{1D550}": "Yopf", "\xFD": "yacute", "\xDD": "Yacute", "\u0177": "ycirc", "\u0176": "Ycirc", "\xFF": "yuml", "\u0178": "Yuml", "\u{1D4CF}": "zscr", "\u{1D537}": "zfr", "\u{1D56B}": "zopf", "\u2128": "Zfr", "\u2124": "Zopf", "\u{1D4B5}": "Zscr", "\u017A": "zacute", "\u0179": "Zacute", "\u017E": "zcaron", "\u017D": "Zcaron", "\u017C": "zdot", "\u017B": "Zdot", "\u01B5": "imped", "\xFE": "thorn", "\xDE": "THORN", "\u0149": "napos", "\u03B1": "alpha", "\u0391": "Alpha", "\u03B2": "beta", "\u0392": "Beta", "\u03B3": "gamma", "\u0393": "Gamma", "\u03B4": "delta", "\u0394": "Delta", "\u03B5": "epsi", "\u03F5": "epsiv", "\u0395": "Epsilon", "\u03DD": "gammad", "\u03DC": "Gammad", "\u03B6": "zeta", "\u0396": "Zeta", "\u03B7": "eta", "\u0397": "Eta", "\u03B8": "theta", "\u03D1": "thetav", "\u0398": "Theta", "\u03B9": "iota", "\u0399": "Iota", "\u03BA": "kappa", "\u03F0": "kappav", "\u039A": "Kappa", "\u03BB": "lambda", "\u039B": "Lambda", "\u03BC": "mu", "\xB5": "micro", "\u039C": "Mu", "\u03BD": "nu", "\u039D": "Nu", "\u03BE": "xi", "\u039E": "Xi", "\u03BF": "omicron", "\u039F": "Omicron", "\u03C0": "pi", "\u03D6": "piv", "\u03A0": "Pi", "\u03C1": "rho", "\u03F1": "rhov", "\u03A1": "Rho", "\u03C3": "sigma", "\u03A3": "Sigma", "\u03C2": "sigmaf", "\u03C4": "tau", "\u03A4": "Tau", "\u03C5": "upsi", "\u03A5": "Upsilon", "\u03D2": "Upsi", "\u03C6": "phi", "\u03D5": "phiv", "\u03A6": "Phi", "\u03C7": "chi", "\u03A7": "Chi", "\u03C8": "psi", "\u03A8": "Psi", "\u03C9": "omega", "\u03A9": "ohm", "\u0430": "acy", "\u0410": "Acy", "\u0431": "bcy", "\u0411": "Bcy", "\u0432": "vcy", "\u0412": "Vcy", "\u0433": "gcy", "\u0413": "Gcy", "\u0453": "gjcy", "\u0403": "GJcy", "\u0434": "dcy", "\u0414": "Dcy", "\u0452": "djcy", "\u0402": "DJcy", "\u0435": "iecy", "\u0415": "IEcy", "\u0451": "iocy", "\u0401": "IOcy", "\u0454": "jukcy", "\u0404": "Jukcy", "\u0436": "zhcy", "\u0416": "ZHcy", "\u0437": "zcy", "\u0417": "Zcy", "\u0455": "dscy", "\u0405": "DScy", "\u0438": "icy", "\u0418": "Icy", "\u0456": "iukcy", "\u0406": "Iukcy", "\u0457": "yicy", "\u0407": "YIcy", "\u0439": "jcy", "\u0419": "Jcy", "\u0458": "jsercy", "\u0408": "Jsercy", "\u043A": "kcy", "\u041A": "Kcy", "\u045C": "kjcy", "\u040C": "KJcy", "\u043B": "lcy", "\u041B": "Lcy", "\u0459": "ljcy", "\u0409": "LJcy", "\u043C": "mcy", "\u041C": "Mcy", "\u043D": "ncy", "\u041D": "Ncy", "\u045A": "njcy", "\u040A": "NJcy", "\u043E": "ocy", "\u041E": "Ocy", "\u043F": "pcy", "\u041F": "Pcy", "\u0440": "rcy", "\u0420": "Rcy", "\u0441": "scy", "\u0421": "Scy", "\u0442": "tcy", "\u0422": "Tcy", "\u045B": "tshcy", "\u040B": "TSHcy", "\u0443": "ucy", "\u0423": "Ucy", "\u045E": "ubrcy", "\u040E": "Ubrcy", "\u0444": "fcy", "\u0424": "Fcy", "\u0445": "khcy", "\u0425": "KHcy", "\u0446": "tscy", "\u0426": "TScy", "\u0447": "chcy", "\u0427": "CHcy", "\u045F": "dzcy", "\u040F": "DZcy", "\u0448": "shcy", "\u0428": "SHcy", "\u0449": "shchcy", "\u0429": "SHCHcy", "\u044A": "hardcy", "\u042A": "HARDcy", "\u044B": "ycy", "\u042B": "Ycy", "\u044C": "softcy", "\u042C": "SOFTcy", "\u044D": "ecy", "\u042D": "Ecy", "\u044E": "yucy", "\u042E": "YUcy", "\u044F": "yacy", "\u042F": "YAcy", "\u2135": "aleph", "\u2136": "beth", "\u2137": "gimel", "\u2138": "daleth" };
          var regexEscape = /["&'<>`]/g;
          var escapeMap = {
            '"': "&quot;",
            "&": "&amp;",
            "'": "&#x27;",
            "<": "&lt;",
            // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
            // following is not strictly necessary unless it’s part of a tag or an
            // unquoted attribute value. We’re only escaping it to support those
            // situations, and for XML support.
            ">": "&gt;",
            // In Internet Explorer ≤ 8, the backtick character can be used
            // to break out of (un)quoted attribute values or HTML comments.
            // See http://html5sec.org/#102, http://html5sec.org/#108, and
            // http://html5sec.org/#133.
            "`": "&#x60;"
          };
          var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
          var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
          var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
          var decodeMap = { "aacute": "\xE1", "Aacute": "\xC1", "abreve": "\u0103", "Abreve": "\u0102", "ac": "\u223E", "acd": "\u223F", "acE": "\u223E\u0333", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "acy": "\u0430", "Acy": "\u0410", "aelig": "\xE6", "AElig": "\xC6", "af": "\u2061", "afr": "\u{1D51E}", "Afr": "\u{1D504}", "agrave": "\xE0", "Agrave": "\xC0", "alefsym": "\u2135", "aleph": "\u2135", "alpha": "\u03B1", "Alpha": "\u0391", "amacr": "\u0101", "Amacr": "\u0100", "amalg": "\u2A3F", "amp": "&", "AMP": "&", "and": "\u2227", "And": "\u2A53", "andand": "\u2A55", "andd": "\u2A5C", "andslope": "\u2A58", "andv": "\u2A5A", "ang": "\u2220", "ange": "\u29A4", "angle": "\u2220", "angmsd": "\u2221", "angmsdaa": "\u29A8", "angmsdab": "\u29A9", "angmsdac": "\u29AA", "angmsdad": "\u29AB", "angmsdae": "\u29AC", "angmsdaf": "\u29AD", "angmsdag": "\u29AE", "angmsdah": "\u29AF", "angrt": "\u221F", "angrtvb": "\u22BE", "angrtvbd": "\u299D", "angsph": "\u2222", "angst": "\xC5", "angzarr": "\u237C", "aogon": "\u0105", "Aogon": "\u0104", "aopf": "\u{1D552}", "Aopf": "\u{1D538}", "ap": "\u2248", "apacir": "\u2A6F", "ape": "\u224A", "apE": "\u2A70", "apid": "\u224B", "apos": "'", "ApplyFunction": "\u2061", "approx": "\u2248", "approxeq": "\u224A", "aring": "\xE5", "Aring": "\xC5", "ascr": "\u{1D4B6}", "Ascr": "\u{1D49C}", "Assign": "\u2254", "ast": "*", "asymp": "\u2248", "asympeq": "\u224D", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "awconint": "\u2233", "awint": "\u2A11", "backcong": "\u224C", "backepsilon": "\u03F6", "backprime": "\u2035", "backsim": "\u223D", "backsimeq": "\u22CD", "Backslash": "\u2216", "Barv": "\u2AE7", "barvee": "\u22BD", "barwed": "\u2305", "Barwed": "\u2306", "barwedge": "\u2305", "bbrk": "\u23B5", "bbrktbrk": "\u23B6", "bcong": "\u224C", "bcy": "\u0431", "Bcy": "\u0411", "bdquo": "\u201E", "becaus": "\u2235", "because": "\u2235", "Because": "\u2235", "bemptyv": "\u29B0", "bepsi": "\u03F6", "bernou": "\u212C", "Bernoullis": "\u212C", "beta": "\u03B2", "Beta": "\u0392", "beth": "\u2136", "between": "\u226C", "bfr": "\u{1D51F}", "Bfr": "\u{1D505}", "bigcap": "\u22C2", "bigcirc": "\u25EF", "bigcup": "\u22C3", "bigodot": "\u2A00", "bigoplus": "\u2A01", "bigotimes": "\u2A02", "bigsqcup": "\u2A06", "bigstar": "\u2605", "bigtriangledown": "\u25BD", "bigtriangleup": "\u25B3", "biguplus": "\u2A04", "bigvee": "\u22C1", "bigwedge": "\u22C0", "bkarow": "\u290D", "blacklozenge": "\u29EB", "blacksquare": "\u25AA", "blacktriangle": "\u25B4", "blacktriangledown": "\u25BE", "blacktriangleleft": "\u25C2", "blacktriangleright": "\u25B8", "blank": "\u2423", "blk12": "\u2592", "blk14": "\u2591", "blk34": "\u2593", "block": "\u2588", "bne": "=\u20E5", "bnequiv": "\u2261\u20E5", "bnot": "\u2310", "bNot": "\u2AED", "bopf": "\u{1D553}", "Bopf": "\u{1D539}", "bot": "\u22A5", "bottom": "\u22A5", "bowtie": "\u22C8", "boxbox": "\u29C9", "boxdl": "\u2510", "boxdL": "\u2555", "boxDl": "\u2556", "boxDL": "\u2557", "boxdr": "\u250C", "boxdR": "\u2552", "boxDr": "\u2553", "boxDR": "\u2554", "boxh": "\u2500", "boxH": "\u2550", "boxhd": "\u252C", "boxhD": "\u2565", "boxHd": "\u2564", "boxHD": "\u2566", "boxhu": "\u2534", "boxhU": "\u2568", "boxHu": "\u2567", "boxHU": "\u2569", "boxminus": "\u229F", "boxplus": "\u229E", "boxtimes": "\u22A0", "boxul": "\u2518", "boxuL": "\u255B", "boxUl": "\u255C", "boxUL": "\u255D", "boxur": "\u2514", "boxuR": "\u2558", "boxUr": "\u2559", "boxUR": "\u255A", "boxv": "\u2502", "boxV": "\u2551", "boxvh": "\u253C", "boxvH": "\u256A", "boxVh": "\u256B", "boxVH": "\u256C", "boxvl": "\u2524", "boxvL": "\u2561", "boxVl": "\u2562", "boxVL": "\u2563", "boxvr": "\u251C", "boxvR": "\u255E", "boxVr": "\u255F", "boxVR": "\u2560", "bprime": "\u2035", "breve": "\u02D8", "Breve": "\u02D8", "brvbar": "\xA6", "bscr": "\u{1D4B7}", "Bscr": "\u212C", "bsemi": "\u204F", "bsim": "\u223D", "bsime": "\u22CD", "bsol": "\\", "bsolb": "\u29C5", "bsolhsub": "\u27C8", "bull": "\u2022", "bullet": "\u2022", "bump": "\u224E", "bumpe": "\u224F", "bumpE": "\u2AAE", "bumpeq": "\u224F", "Bumpeq": "\u224E", "cacute": "\u0107", "Cacute": "\u0106", "cap": "\u2229", "Cap": "\u22D2", "capand": "\u2A44", "capbrcup": "\u2A49", "capcap": "\u2A4B", "capcup": "\u2A47", "capdot": "\u2A40", "CapitalDifferentialD": "\u2145", "caps": "\u2229\uFE00", "caret": "\u2041", "caron": "\u02C7", "Cayleys": "\u212D", "ccaps": "\u2A4D", "ccaron": "\u010D", "Ccaron": "\u010C", "ccedil": "\xE7", "Ccedil": "\xC7", "ccirc": "\u0109", "Ccirc": "\u0108", "Cconint": "\u2230", "ccups": "\u2A4C", "ccupssm": "\u2A50", "cdot": "\u010B", "Cdot": "\u010A", "cedil": "\xB8", "Cedilla": "\xB8", "cemptyv": "\u29B2", "cent": "\xA2", "centerdot": "\xB7", "CenterDot": "\xB7", "cfr": "\u{1D520}", "Cfr": "\u212D", "chcy": "\u0447", "CHcy": "\u0427", "check": "\u2713", "checkmark": "\u2713", "chi": "\u03C7", "Chi": "\u03A7", "cir": "\u25CB", "circ": "\u02C6", "circeq": "\u2257", "circlearrowleft": "\u21BA", "circlearrowright": "\u21BB", "circledast": "\u229B", "circledcirc": "\u229A", "circleddash": "\u229D", "CircleDot": "\u2299", "circledR": "\xAE", "circledS": "\u24C8", "CircleMinus": "\u2296", "CirclePlus": "\u2295", "CircleTimes": "\u2297", "cire": "\u2257", "cirE": "\u29C3", "cirfnint": "\u2A10", "cirmid": "\u2AEF", "cirscir": "\u29C2", "ClockwiseContourIntegral": "\u2232", "CloseCurlyDoubleQuote": "\u201D", "CloseCurlyQuote": "\u2019", "clubs": "\u2663", "clubsuit": "\u2663", "colon": ":", "Colon": "\u2237", "colone": "\u2254", "Colone": "\u2A74", "coloneq": "\u2254", "comma": ",", "commat": "@", "comp": "\u2201", "compfn": "\u2218", "complement": "\u2201", "complexes": "\u2102", "cong": "\u2245", "congdot": "\u2A6D", "Congruent": "\u2261", "conint": "\u222E", "Conint": "\u222F", "ContourIntegral": "\u222E", "copf": "\u{1D554}", "Copf": "\u2102", "coprod": "\u2210", "Coproduct": "\u2210", "copy": "\xA9", "COPY": "\xA9", "copysr": "\u2117", "CounterClockwiseContourIntegral": "\u2233", "crarr": "\u21B5", "cross": "\u2717", "Cross": "\u2A2F", "cscr": "\u{1D4B8}", "Cscr": "\u{1D49E}", "csub": "\u2ACF", "csube": "\u2AD1", "csup": "\u2AD0", "csupe": "\u2AD2", "ctdot": "\u22EF", "cudarrl": "\u2938", "cudarrr": "\u2935", "cuepr": "\u22DE", "cuesc": "\u22DF", "cularr": "\u21B6", "cularrp": "\u293D", "cup": "\u222A", "Cup": "\u22D3", "cupbrcap": "\u2A48", "cupcap": "\u2A46", "CupCap": "\u224D", "cupcup": "\u2A4A", "cupdot": "\u228D", "cupor": "\u2A45", "cups": "\u222A\uFE00", "curarr": "\u21B7", "curarrm": "\u293C", "curlyeqprec": "\u22DE", "curlyeqsucc": "\u22DF", "curlyvee": "\u22CE", "curlywedge": "\u22CF", "curren": "\xA4", "curvearrowleft": "\u21B6", "curvearrowright": "\u21B7", "cuvee": "\u22CE", "cuwed": "\u22CF", "cwconint": "\u2232", "cwint": "\u2231", "cylcty": "\u232D", "dagger": "\u2020", "Dagger": "\u2021", "daleth": "\u2138", "darr": "\u2193", "dArr": "\u21D3", "Darr": "\u21A1", "dash": "\u2010", "dashv": "\u22A3", "Dashv": "\u2AE4", "dbkarow": "\u290F", "dblac": "\u02DD", "dcaron": "\u010F", "Dcaron": "\u010E", "dcy": "\u0434", "Dcy": "\u0414", "dd": "\u2146", "DD": "\u2145", "ddagger": "\u2021", "ddarr": "\u21CA", "DDotrahd": "\u2911", "ddotseq": "\u2A77", "deg": "\xB0", "Del": "\u2207", "delta": "\u03B4", "Delta": "\u0394", "demptyv": "\u29B1", "dfisht": "\u297F", "dfr": "\u{1D521}", "Dfr": "\u{1D507}", "dHar": "\u2965", "dharl": "\u21C3", "dharr": "\u21C2", "DiacriticalAcute": "\xB4", "DiacriticalDot": "\u02D9", "DiacriticalDoubleAcute": "\u02DD", "DiacriticalGrave": "`", "DiacriticalTilde": "\u02DC", "diam": "\u22C4", "diamond": "\u22C4", "Diamond": "\u22C4", "diamondsuit": "\u2666", "diams": "\u2666", "die": "\xA8", "DifferentialD": "\u2146", "digamma": "\u03DD", "disin": "\u22F2", "div": "\xF7", "divide": "\xF7", "divideontimes": "\u22C7", "divonx": "\u22C7", "djcy": "\u0452", "DJcy": "\u0402", "dlcorn": "\u231E", "dlcrop": "\u230D", "dollar": "$", "dopf": "\u{1D555}", "Dopf": "\u{1D53B}", "dot": "\u02D9", "Dot": "\xA8", "DotDot": "\u20DC", "doteq": "\u2250", "doteqdot": "\u2251", "DotEqual": "\u2250", "dotminus": "\u2238", "dotplus": "\u2214", "dotsquare": "\u22A1", "doublebarwedge": "\u2306", "DoubleContourIntegral": "\u222F", "DoubleDot": "\xA8", "DoubleDownArrow": "\u21D3", "DoubleLeftArrow": "\u21D0", "DoubleLeftRightArrow": "\u21D4", "DoubleLeftTee": "\u2AE4", "DoubleLongLeftArrow": "\u27F8", "DoubleLongLeftRightArrow": "\u27FA", "DoubleLongRightArrow": "\u27F9", "DoubleRightArrow": "\u21D2", "DoubleRightTee": "\u22A8", "DoubleUpArrow": "\u21D1", "DoubleUpDownArrow": "\u21D5", "DoubleVerticalBar": "\u2225", "downarrow": "\u2193", "Downarrow": "\u21D3", "DownArrow": "\u2193", "DownArrowBar": "\u2913", "DownArrowUpArrow": "\u21F5", "DownBreve": "\u0311", "downdownarrows": "\u21CA", "downharpoonleft": "\u21C3", "downharpoonright": "\u21C2", "DownLeftRightVector": "\u2950", "DownLeftTeeVector": "\u295E", "DownLeftVector": "\u21BD", "DownLeftVectorBar": "\u2956", "DownRightTeeVector": "\u295F", "DownRightVector": "\u21C1", "DownRightVectorBar": "\u2957", "DownTee": "\u22A4", "DownTeeArrow": "\u21A7", "drbkarow": "\u2910", "drcorn": "\u231F", "drcrop": "\u230C", "dscr": "\u{1D4B9}", "Dscr": "\u{1D49F}", "dscy": "\u0455", "DScy": "\u0405", "dsol": "\u29F6", "dstrok": "\u0111", "Dstrok": "\u0110", "dtdot": "\u22F1", "dtri": "\u25BF", "dtrif": "\u25BE", "duarr": "\u21F5", "duhar": "\u296F", "dwangle": "\u29A6", "dzcy": "\u045F", "DZcy": "\u040F", "dzigrarr": "\u27FF", "eacute": "\xE9", "Eacute": "\xC9", "easter": "\u2A6E", "ecaron": "\u011B", "Ecaron": "\u011A", "ecir": "\u2256", "ecirc": "\xEA", "Ecirc": "\xCA", "ecolon": "\u2255", "ecy": "\u044D", "Ecy": "\u042D", "eDDot": "\u2A77", "edot": "\u0117", "eDot": "\u2251", "Edot": "\u0116", "ee": "\u2147", "efDot": "\u2252", "efr": "\u{1D522}", "Efr": "\u{1D508}", "eg": "\u2A9A", "egrave": "\xE8", "Egrave": "\xC8", "egs": "\u2A96", "egsdot": "\u2A98", "el": "\u2A99", "Element": "\u2208", "elinters": "\u23E7", "ell": "\u2113", "els": "\u2A95", "elsdot": "\u2A97", "emacr": "\u0113", "Emacr": "\u0112", "empty": "\u2205", "emptyset": "\u2205", "EmptySmallSquare": "\u25FB", "emptyv": "\u2205", "EmptyVerySmallSquare": "\u25AB", "emsp": "\u2003", "emsp13": "\u2004", "emsp14": "\u2005", "eng": "\u014B", "ENG": "\u014A", "ensp": "\u2002", "eogon": "\u0119", "Eogon": "\u0118", "eopf": "\u{1D556}", "Eopf": "\u{1D53C}", "epar": "\u22D5", "eparsl": "\u29E3", "eplus": "\u2A71", "epsi": "\u03B5", "epsilon": "\u03B5", "Epsilon": "\u0395", "epsiv": "\u03F5", "eqcirc": "\u2256", "eqcolon": "\u2255", "eqsim": "\u2242", "eqslantgtr": "\u2A96", "eqslantless": "\u2A95", "Equal": "\u2A75", "equals": "=", "EqualTilde": "\u2242", "equest": "\u225F", "Equilibrium": "\u21CC", "equiv": "\u2261", "equivDD": "\u2A78", "eqvparsl": "\u29E5", "erarr": "\u2971", "erDot": "\u2253", "escr": "\u212F", "Escr": "\u2130", "esdot": "\u2250", "esim": "\u2242", "Esim": "\u2A73", "eta": "\u03B7", "Eta": "\u0397", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "euro": "\u20AC", "excl": "!", "exist": "\u2203", "Exists": "\u2203", "expectation": "\u2130", "exponentiale": "\u2147", "ExponentialE": "\u2147", "fallingdotseq": "\u2252", "fcy": "\u0444", "Fcy": "\u0424", "female": "\u2640", "ffilig": "\uFB03", "fflig": "\uFB00", "ffllig": "\uFB04", "ffr": "\u{1D523}", "Ffr": "\u{1D509}", "filig": "\uFB01", "FilledSmallSquare": "\u25FC", "FilledVerySmallSquare": "\u25AA", "fjlig": "fj", "flat": "\u266D", "fllig": "\uFB02", "fltns": "\u25B1", "fnof": "\u0192", "fopf": "\u{1D557}", "Fopf": "\u{1D53D}", "forall": "\u2200", "ForAll": "\u2200", "fork": "\u22D4", "forkv": "\u2AD9", "Fouriertrf": "\u2131", "fpartint": "\u2A0D", "frac12": "\xBD", "frac13": "\u2153", "frac14": "\xBC", "frac15": "\u2155", "frac16": "\u2159", "frac18": "\u215B", "frac23": "\u2154", "frac25": "\u2156", "frac34": "\xBE", "frac35": "\u2157", "frac38": "\u215C", "frac45": "\u2158", "frac56": "\u215A", "frac58": "\u215D", "frac78": "\u215E", "frasl": "\u2044", "frown": "\u2322", "fscr": "\u{1D4BB}", "Fscr": "\u2131", "gacute": "\u01F5", "gamma": "\u03B3", "Gamma": "\u0393", "gammad": "\u03DD", "Gammad": "\u03DC", "gap": "\u2A86", "gbreve": "\u011F", "Gbreve": "\u011E", "Gcedil": "\u0122", "gcirc": "\u011D", "Gcirc": "\u011C", "gcy": "\u0433", "Gcy": "\u0413", "gdot": "\u0121", "Gdot": "\u0120", "ge": "\u2265", "gE": "\u2267", "gel": "\u22DB", "gEl": "\u2A8C", "geq": "\u2265", "geqq": "\u2267", "geqslant": "\u2A7E", "ges": "\u2A7E", "gescc": "\u2AA9", "gesdot": "\u2A80", "gesdoto": "\u2A82", "gesdotol": "\u2A84", "gesl": "\u22DB\uFE00", "gesles": "\u2A94", "gfr": "\u{1D524}", "Gfr": "\u{1D50A}", "gg": "\u226B", "Gg": "\u22D9", "ggg": "\u22D9", "gimel": "\u2137", "gjcy": "\u0453", "GJcy": "\u0403", "gl": "\u2277", "gla": "\u2AA5", "glE": "\u2A92", "glj": "\u2AA4", "gnap": "\u2A8A", "gnapprox": "\u2A8A", "gne": "\u2A88", "gnE": "\u2269", "gneq": "\u2A88", "gneqq": "\u2269", "gnsim": "\u22E7", "gopf": "\u{1D558}", "Gopf": "\u{1D53E}", "grave": "`", "GreaterEqual": "\u2265", "GreaterEqualLess": "\u22DB", "GreaterFullEqual": "\u2267", "GreaterGreater": "\u2AA2", "GreaterLess": "\u2277", "GreaterSlantEqual": "\u2A7E", "GreaterTilde": "\u2273", "gscr": "\u210A", "Gscr": "\u{1D4A2}", "gsim": "\u2273", "gsime": "\u2A8E", "gsiml": "\u2A90", "gt": ">", "Gt": "\u226B", "GT": ">", "gtcc": "\u2AA7", "gtcir": "\u2A7A", "gtdot": "\u22D7", "gtlPar": "\u2995", "gtquest": "\u2A7C", "gtrapprox": "\u2A86", "gtrarr": "\u2978", "gtrdot": "\u22D7", "gtreqless": "\u22DB", "gtreqqless": "\u2A8C", "gtrless": "\u2277", "gtrsim": "\u2273", "gvertneqq": "\u2269\uFE00", "gvnE": "\u2269\uFE00", "Hacek": "\u02C7", "hairsp": "\u200A", "half": "\xBD", "hamilt": "\u210B", "hardcy": "\u044A", "HARDcy": "\u042A", "harr": "\u2194", "hArr": "\u21D4", "harrcir": "\u2948", "harrw": "\u21AD", "Hat": "^", "hbar": "\u210F", "hcirc": "\u0125", "Hcirc": "\u0124", "hearts": "\u2665", "heartsuit": "\u2665", "hellip": "\u2026", "hercon": "\u22B9", "hfr": "\u{1D525}", "Hfr": "\u210C", "HilbertSpace": "\u210B", "hksearow": "\u2925", "hkswarow": "\u2926", "hoarr": "\u21FF", "homtht": "\u223B", "hookleftarrow": "\u21A9", "hookrightarrow": "\u21AA", "hopf": "\u{1D559}", "Hopf": "\u210D", "horbar": "\u2015", "HorizontalLine": "\u2500", "hscr": "\u{1D4BD}", "Hscr": "\u210B", "hslash": "\u210F", "hstrok": "\u0127", "Hstrok": "\u0126", "HumpDownHump": "\u224E", "HumpEqual": "\u224F", "hybull": "\u2043", "hyphen": "\u2010", "iacute": "\xED", "Iacute": "\xCD", "ic": "\u2063", "icirc": "\xEE", "Icirc": "\xCE", "icy": "\u0438", "Icy": "\u0418", "Idot": "\u0130", "iecy": "\u0435", "IEcy": "\u0415", "iexcl": "\xA1", "iff": "\u21D4", "ifr": "\u{1D526}", "Ifr": "\u2111", "igrave": "\xEC", "Igrave": "\xCC", "ii": "\u2148", "iiiint": "\u2A0C", "iiint": "\u222D", "iinfin": "\u29DC", "iiota": "\u2129", "ijlig": "\u0133", "IJlig": "\u0132", "Im": "\u2111", "imacr": "\u012B", "Imacr": "\u012A", "image": "\u2111", "ImaginaryI": "\u2148", "imagline": "\u2110", "imagpart": "\u2111", "imath": "\u0131", "imof": "\u22B7", "imped": "\u01B5", "Implies": "\u21D2", "in": "\u2208", "incare": "\u2105", "infin": "\u221E", "infintie": "\u29DD", "inodot": "\u0131", "int": "\u222B", "Int": "\u222C", "intcal": "\u22BA", "integers": "\u2124", "Integral": "\u222B", "intercal": "\u22BA", "Intersection": "\u22C2", "intlarhk": "\u2A17", "intprod": "\u2A3C", "InvisibleComma": "\u2063", "InvisibleTimes": "\u2062", "iocy": "\u0451", "IOcy": "\u0401", "iogon": "\u012F", "Iogon": "\u012E", "iopf": "\u{1D55A}", "Iopf": "\u{1D540}", "iota": "\u03B9", "Iota": "\u0399", "iprod": "\u2A3C", "iquest": "\xBF", "iscr": "\u{1D4BE}", "Iscr": "\u2110", "isin": "\u2208", "isindot": "\u22F5", "isinE": "\u22F9", "isins": "\u22F4", "isinsv": "\u22F3", "isinv": "\u2208", "it": "\u2062", "itilde": "\u0129", "Itilde": "\u0128", "iukcy": "\u0456", "Iukcy": "\u0406", "iuml": "\xEF", "Iuml": "\xCF", "jcirc": "\u0135", "Jcirc": "\u0134", "jcy": "\u0439", "Jcy": "\u0419", "jfr": "\u{1D527}", "Jfr": "\u{1D50D}", "jmath": "\u0237", "jopf": "\u{1D55B}", "Jopf": "\u{1D541}", "jscr": "\u{1D4BF}", "Jscr": "\u{1D4A5}", "jsercy": "\u0458", "Jsercy": "\u0408", "jukcy": "\u0454", "Jukcy": "\u0404", "kappa": "\u03BA", "Kappa": "\u039A", "kappav": "\u03F0", "kcedil": "\u0137", "Kcedil": "\u0136", "kcy": "\u043A", "Kcy": "\u041A", "kfr": "\u{1D528}", "Kfr": "\u{1D50E}", "kgreen": "\u0138", "khcy": "\u0445", "KHcy": "\u0425", "kjcy": "\u045C", "KJcy": "\u040C", "kopf": "\u{1D55C}", "Kopf": "\u{1D542}", "kscr": "\u{1D4C0}", "Kscr": "\u{1D4A6}", "lAarr": "\u21DA", "lacute": "\u013A", "Lacute": "\u0139", "laemptyv": "\u29B4", "lagran": "\u2112", "lambda": "\u03BB", "Lambda": "\u039B", "lang": "\u27E8", "Lang": "\u27EA", "langd": "\u2991", "langle": "\u27E8", "lap": "\u2A85", "Laplacetrf": "\u2112", "laquo": "\xAB", "larr": "\u2190", "lArr": "\u21D0", "Larr": "\u219E", "larrb": "\u21E4", "larrbfs": "\u291F", "larrfs": "\u291D", "larrhk": "\u21A9", "larrlp": "\u21AB", "larrpl": "\u2939", "larrsim": "\u2973", "larrtl": "\u21A2", "lat": "\u2AAB", "latail": "\u2919", "lAtail": "\u291B", "late": "\u2AAD", "lates": "\u2AAD\uFE00", "lbarr": "\u290C", "lBarr": "\u290E", "lbbrk": "\u2772", "lbrace": "{", "lbrack": "[", "lbrke": "\u298B", "lbrksld": "\u298F", "lbrkslu": "\u298D", "lcaron": "\u013E", "Lcaron": "\u013D", "lcedil": "\u013C", "Lcedil": "\u013B", "lceil": "\u2308", "lcub": "{", "lcy": "\u043B", "Lcy": "\u041B", "ldca": "\u2936", "ldquo": "\u201C", "ldquor": "\u201E", "ldrdhar": "\u2967", "ldrushar": "\u294B", "ldsh": "\u21B2", "le": "\u2264", "lE": "\u2266", "LeftAngleBracket": "\u27E8", "leftarrow": "\u2190", "Leftarrow": "\u21D0", "LeftArrow": "\u2190", "LeftArrowBar": "\u21E4", "LeftArrowRightArrow": "\u21C6", "leftarrowtail": "\u21A2", "LeftCeiling": "\u2308", "LeftDoubleBracket": "\u27E6", "LeftDownTeeVector": "\u2961", "LeftDownVector": "\u21C3", "LeftDownVectorBar": "\u2959", "LeftFloor": "\u230A", "leftharpoondown": "\u21BD", "leftharpoonup": "\u21BC", "leftleftarrows": "\u21C7", "leftrightarrow": "\u2194", "Leftrightarrow": "\u21D4", "LeftRightArrow": "\u2194", "leftrightarrows": "\u21C6", "leftrightharpoons": "\u21CB", "leftrightsquigarrow": "\u21AD", "LeftRightVector": "\u294E", "LeftTee": "\u22A3", "LeftTeeArrow": "\u21A4", "LeftTeeVector": "\u295A", "leftthreetimes": "\u22CB", "LeftTriangle": "\u22B2", "LeftTriangleBar": "\u29CF", "LeftTriangleEqual": "\u22B4", "LeftUpDownVector": "\u2951", "LeftUpTeeVector": "\u2960", "LeftUpVector": "\u21BF", "LeftUpVectorBar": "\u2958", "LeftVector": "\u21BC", "LeftVectorBar": "\u2952", "leg": "\u22DA", "lEg": "\u2A8B", "leq": "\u2264", "leqq": "\u2266", "leqslant": "\u2A7D", "les": "\u2A7D", "lescc": "\u2AA8", "lesdot": "\u2A7F", "lesdoto": "\u2A81", "lesdotor": "\u2A83", "lesg": "\u22DA\uFE00", "lesges": "\u2A93", "lessapprox": "\u2A85", "lessdot": "\u22D6", "lesseqgtr": "\u22DA", "lesseqqgtr": "\u2A8B", "LessEqualGreater": "\u22DA", "LessFullEqual": "\u2266", "LessGreater": "\u2276", "lessgtr": "\u2276", "LessLess": "\u2AA1", "lesssim": "\u2272", "LessSlantEqual": "\u2A7D", "LessTilde": "\u2272", "lfisht": "\u297C", "lfloor": "\u230A", "lfr": "\u{1D529}", "Lfr": "\u{1D50F}", "lg": "\u2276", "lgE": "\u2A91", "lHar": "\u2962", "lhard": "\u21BD", "lharu": "\u21BC", "lharul": "\u296A", "lhblk": "\u2584", "ljcy": "\u0459", "LJcy": "\u0409", "ll": "\u226A", "Ll": "\u22D8", "llarr": "\u21C7", "llcorner": "\u231E", "Lleftarrow": "\u21DA", "llhard": "\u296B", "lltri": "\u25FA", "lmidot": "\u0140", "Lmidot": "\u013F", "lmoust": "\u23B0", "lmoustache": "\u23B0", "lnap": "\u2A89", "lnapprox": "\u2A89", "lne": "\u2A87", "lnE": "\u2268", "lneq": "\u2A87", "lneqq": "\u2268", "lnsim": "\u22E6", "loang": "\u27EC", "loarr": "\u21FD", "lobrk": "\u27E6", "longleftarrow": "\u27F5", "Longleftarrow": "\u27F8", "LongLeftArrow": "\u27F5", "longleftrightarrow": "\u27F7", "Longleftrightarrow": "\u27FA", "LongLeftRightArrow": "\u27F7", "longmapsto": "\u27FC", "longrightarrow": "\u27F6", "Longrightarrow": "\u27F9", "LongRightArrow": "\u27F6", "looparrowleft": "\u21AB", "looparrowright": "\u21AC", "lopar": "\u2985", "lopf": "\u{1D55D}", "Lopf": "\u{1D543}", "loplus": "\u2A2D", "lotimes": "\u2A34", "lowast": "\u2217", "lowbar": "_", "LowerLeftArrow": "\u2199", "LowerRightArrow": "\u2198", "loz": "\u25CA", "lozenge": "\u25CA", "lozf": "\u29EB", "lpar": "(", "lparlt": "\u2993", "lrarr": "\u21C6", "lrcorner": "\u231F", "lrhar": "\u21CB", "lrhard": "\u296D", "lrm": "\u200E", "lrtri": "\u22BF", "lsaquo": "\u2039", "lscr": "\u{1D4C1}", "Lscr": "\u2112", "lsh": "\u21B0", "Lsh": "\u21B0", "lsim": "\u2272", "lsime": "\u2A8D", "lsimg": "\u2A8F", "lsqb": "[", "lsquo": "\u2018", "lsquor": "\u201A", "lstrok": "\u0142", "Lstrok": "\u0141", "lt": "<", "Lt": "\u226A", "LT": "<", "ltcc": "\u2AA6", "ltcir": "\u2A79", "ltdot": "\u22D6", "lthree": "\u22CB", "ltimes": "\u22C9", "ltlarr": "\u2976", "ltquest": "\u2A7B", "ltri": "\u25C3", "ltrie": "\u22B4", "ltrif": "\u25C2", "ltrPar": "\u2996", "lurdshar": "\u294A", "luruhar": "\u2966", "lvertneqq": "\u2268\uFE00", "lvnE": "\u2268\uFE00", "macr": "\xAF", "male": "\u2642", "malt": "\u2720", "maltese": "\u2720", "map": "\u21A6", "Map": "\u2905", "mapsto": "\u21A6", "mapstodown": "\u21A7", "mapstoleft": "\u21A4", "mapstoup": "\u21A5", "marker": "\u25AE", "mcomma": "\u2A29", "mcy": "\u043C", "Mcy": "\u041C", "mdash": "\u2014", "mDDot": "\u223A", "measuredangle": "\u2221", "MediumSpace": "\u205F", "Mellintrf": "\u2133", "mfr": "\u{1D52A}", "Mfr": "\u{1D510}", "mho": "\u2127", "micro": "\xB5", "mid": "\u2223", "midast": "*", "midcir": "\u2AF0", "middot": "\xB7", "minus": "\u2212", "minusb": "\u229F", "minusd": "\u2238", "minusdu": "\u2A2A", "MinusPlus": "\u2213", "mlcp": "\u2ADB", "mldr": "\u2026", "mnplus": "\u2213", "models": "\u22A7", "mopf": "\u{1D55E}", "Mopf": "\u{1D544}", "mp": "\u2213", "mscr": "\u{1D4C2}", "Mscr": "\u2133", "mstpos": "\u223E", "mu": "\u03BC", "Mu": "\u039C", "multimap": "\u22B8", "mumap": "\u22B8", "nabla": "\u2207", "nacute": "\u0144", "Nacute": "\u0143", "nang": "\u2220\u20D2", "nap": "\u2249", "napE": "\u2A70\u0338", "napid": "\u224B\u0338", "napos": "\u0149", "napprox": "\u2249", "natur": "\u266E", "natural": "\u266E", "naturals": "\u2115", "nbsp": "\xA0", "nbump": "\u224E\u0338", "nbumpe": "\u224F\u0338", "ncap": "\u2A43", "ncaron": "\u0148", "Ncaron": "\u0147", "ncedil": "\u0146", "Ncedil": "\u0145", "ncong": "\u2247", "ncongdot": "\u2A6D\u0338", "ncup": "\u2A42", "ncy": "\u043D", "Ncy": "\u041D", "ndash": "\u2013", "ne": "\u2260", "nearhk": "\u2924", "nearr": "\u2197", "neArr": "\u21D7", "nearrow": "\u2197", "nedot": "\u2250\u0338", "NegativeMediumSpace": "\u200B", "NegativeThickSpace": "\u200B", "NegativeThinSpace": "\u200B", "NegativeVeryThinSpace": "\u200B", "nequiv": "\u2262", "nesear": "\u2928", "nesim": "\u2242\u0338", "NestedGreaterGreater": "\u226B", "NestedLessLess": "\u226A", "NewLine": "\n", "nexist": "\u2204", "nexists": "\u2204", "nfr": "\u{1D52B}", "Nfr": "\u{1D511}", "nge": "\u2271", "ngE": "\u2267\u0338", "ngeq": "\u2271", "ngeqq": "\u2267\u0338", "ngeqslant": "\u2A7E\u0338", "nges": "\u2A7E\u0338", "nGg": "\u22D9\u0338", "ngsim": "\u2275", "ngt": "\u226F", "nGt": "\u226B\u20D2", "ngtr": "\u226F", "nGtv": "\u226B\u0338", "nharr": "\u21AE", "nhArr": "\u21CE", "nhpar": "\u2AF2", "ni": "\u220B", "nis": "\u22FC", "nisd": "\u22FA", "niv": "\u220B", "njcy": "\u045A", "NJcy": "\u040A", "nlarr": "\u219A", "nlArr": "\u21CD", "nldr": "\u2025", "nle": "\u2270", "nlE": "\u2266\u0338", "nleftarrow": "\u219A", "nLeftarrow": "\u21CD", "nleftrightarrow": "\u21AE", "nLeftrightarrow": "\u21CE", "nleq": "\u2270", "nleqq": "\u2266\u0338", "nleqslant": "\u2A7D\u0338", "nles": "\u2A7D\u0338", "nless": "\u226E", "nLl": "\u22D8\u0338", "nlsim": "\u2274", "nlt": "\u226E", "nLt": "\u226A\u20D2", "nltri": "\u22EA", "nltrie": "\u22EC", "nLtv": "\u226A\u0338", "nmid": "\u2224", "NoBreak": "\u2060", "NonBreakingSpace": "\xA0", "nopf": "\u{1D55F}", "Nopf": "\u2115", "not": "\xAC", "Not": "\u2AEC", "NotCongruent": "\u2262", "NotCupCap": "\u226D", "NotDoubleVerticalBar": "\u2226", "NotElement": "\u2209", "NotEqual": "\u2260", "NotEqualTilde": "\u2242\u0338", "NotExists": "\u2204", "NotGreater": "\u226F", "NotGreaterEqual": "\u2271", "NotGreaterFullEqual": "\u2267\u0338", "NotGreaterGreater": "\u226B\u0338", "NotGreaterLess": "\u2279", "NotGreaterSlantEqual": "\u2A7E\u0338", "NotGreaterTilde": "\u2275", "NotHumpDownHump": "\u224E\u0338", "NotHumpEqual": "\u224F\u0338", "notin": "\u2209", "notindot": "\u22F5\u0338", "notinE": "\u22F9\u0338", "notinva": "\u2209", "notinvb": "\u22F7", "notinvc": "\u22F6", "NotLeftTriangle": "\u22EA", "NotLeftTriangleBar": "\u29CF\u0338", "NotLeftTriangleEqual": "\u22EC", "NotLess": "\u226E", "NotLessEqual": "\u2270", "NotLessGreater": "\u2278", "NotLessLess": "\u226A\u0338", "NotLessSlantEqual": "\u2A7D\u0338", "NotLessTilde": "\u2274", "NotNestedGreaterGreater": "\u2AA2\u0338", "NotNestedLessLess": "\u2AA1\u0338", "notni": "\u220C", "notniva": "\u220C", "notnivb": "\u22FE", "notnivc": "\u22FD", "NotPrecedes": "\u2280", "NotPrecedesEqual": "\u2AAF\u0338", "NotPrecedesSlantEqual": "\u22E0", "NotReverseElement": "\u220C", "NotRightTriangle": "\u22EB", "NotRightTriangleBar": "\u29D0\u0338", "NotRightTriangleEqual": "\u22ED", "NotSquareSubset": "\u228F\u0338", "NotSquareSubsetEqual": "\u22E2", "NotSquareSuperset": "\u2290\u0338", "NotSquareSupersetEqual": "\u22E3", "NotSubset": "\u2282\u20D2", "NotSubsetEqual": "\u2288", "NotSucceeds": "\u2281", "NotSucceedsEqual": "\u2AB0\u0338", "NotSucceedsSlantEqual": "\u22E1", "NotSucceedsTilde": "\u227F\u0338", "NotSuperset": "\u2283\u20D2", "NotSupersetEqual": "\u2289", "NotTilde": "\u2241", "NotTildeEqual": "\u2244", "NotTildeFullEqual": "\u2247", "NotTildeTilde": "\u2249", "NotVerticalBar": "\u2224", "npar": "\u2226", "nparallel": "\u2226", "nparsl": "\u2AFD\u20E5", "npart": "\u2202\u0338", "npolint": "\u2A14", "npr": "\u2280", "nprcue": "\u22E0", "npre": "\u2AAF\u0338", "nprec": "\u2280", "npreceq": "\u2AAF\u0338", "nrarr": "\u219B", "nrArr": "\u21CF", "nrarrc": "\u2933\u0338", "nrarrw": "\u219D\u0338", "nrightarrow": "\u219B", "nRightarrow": "\u21CF", "nrtri": "\u22EB", "nrtrie": "\u22ED", "nsc": "\u2281", "nsccue": "\u22E1", "nsce": "\u2AB0\u0338", "nscr": "\u{1D4C3}", "Nscr": "\u{1D4A9}", "nshortmid": "\u2224", "nshortparallel": "\u2226", "nsim": "\u2241", "nsime": "\u2244", "nsimeq": "\u2244", "nsmid": "\u2224", "nspar": "\u2226", "nsqsube": "\u22E2", "nsqsupe": "\u22E3", "nsub": "\u2284", "nsube": "\u2288", "nsubE": "\u2AC5\u0338", "nsubset": "\u2282\u20D2", "nsubseteq": "\u2288", "nsubseteqq": "\u2AC5\u0338", "nsucc": "\u2281", "nsucceq": "\u2AB0\u0338", "nsup": "\u2285", "nsupe": "\u2289", "nsupE": "\u2AC6\u0338", "nsupset": "\u2283\u20D2", "nsupseteq": "\u2289", "nsupseteqq": "\u2AC6\u0338", "ntgl": "\u2279", "ntilde": "\xF1", "Ntilde": "\xD1", "ntlg": "\u2278", "ntriangleleft": "\u22EA", "ntrianglelefteq": "\u22EC", "ntriangleright": "\u22EB", "ntrianglerighteq": "\u22ED", "nu": "\u03BD", "Nu": "\u039D", "num": "#", "numero": "\u2116", "numsp": "\u2007", "nvap": "\u224D\u20D2", "nvdash": "\u22AC", "nvDash": "\u22AD", "nVdash": "\u22AE", "nVDash": "\u22AF", "nvge": "\u2265\u20D2", "nvgt": ">\u20D2", "nvHarr": "\u2904", "nvinfin": "\u29DE", "nvlArr": "\u2902", "nvle": "\u2264\u20D2", "nvlt": "<\u20D2", "nvltrie": "\u22B4\u20D2", "nvrArr": "\u2903", "nvrtrie": "\u22B5\u20D2", "nvsim": "\u223C\u20D2", "nwarhk": "\u2923", "nwarr": "\u2196", "nwArr": "\u21D6", "nwarrow": "\u2196", "nwnear": "\u2927", "oacute": "\xF3", "Oacute": "\xD3", "oast": "\u229B", "ocir": "\u229A", "ocirc": "\xF4", "Ocirc": "\xD4", "ocy": "\u043E", "Ocy": "\u041E", "odash": "\u229D", "odblac": "\u0151", "Odblac": "\u0150", "odiv": "\u2A38", "odot": "\u2299", "odsold": "\u29BC", "oelig": "\u0153", "OElig": "\u0152", "ofcir": "\u29BF", "ofr": "\u{1D52C}", "Ofr": "\u{1D512}", "ogon": "\u02DB", "ograve": "\xF2", "Ograve": "\xD2", "ogt": "\u29C1", "ohbar": "\u29B5", "ohm": "\u03A9", "oint": "\u222E", "olarr": "\u21BA", "olcir": "\u29BE", "olcross": "\u29BB", "oline": "\u203E", "olt": "\u29C0", "omacr": "\u014D", "Omacr": "\u014C", "omega": "\u03C9", "Omega": "\u03A9", "omicron": "\u03BF", "Omicron": "\u039F", "omid": "\u29B6", "ominus": "\u2296", "oopf": "\u{1D560}", "Oopf": "\u{1D546}", "opar": "\u29B7", "OpenCurlyDoubleQuote": "\u201C", "OpenCurlyQuote": "\u2018", "operp": "\u29B9", "oplus": "\u2295", "or": "\u2228", "Or": "\u2A54", "orarr": "\u21BB", "ord": "\u2A5D", "order": "\u2134", "orderof": "\u2134", "ordf": "\xAA", "ordm": "\xBA", "origof": "\u22B6", "oror": "\u2A56", "orslope": "\u2A57", "orv": "\u2A5B", "oS": "\u24C8", "oscr": "\u2134", "Oscr": "\u{1D4AA}", "oslash": "\xF8", "Oslash": "\xD8", "osol": "\u2298", "otilde": "\xF5", "Otilde": "\xD5", "otimes": "\u2297", "Otimes": "\u2A37", "otimesas": "\u2A36", "ouml": "\xF6", "Ouml": "\xD6", "ovbar": "\u233D", "OverBar": "\u203E", "OverBrace": "\u23DE", "OverBracket": "\u23B4", "OverParenthesis": "\u23DC", "par": "\u2225", "para": "\xB6", "parallel": "\u2225", "parsim": "\u2AF3", "parsl": "\u2AFD", "part": "\u2202", "PartialD": "\u2202", "pcy": "\u043F", "Pcy": "\u041F", "percnt": "%", "period": ".", "permil": "\u2030", "perp": "\u22A5", "pertenk": "\u2031", "pfr": "\u{1D52D}", "Pfr": "\u{1D513}", "phi": "\u03C6", "Phi": "\u03A6", "phiv": "\u03D5", "phmmat": "\u2133", "phone": "\u260E", "pi": "\u03C0", "Pi": "\u03A0", "pitchfork": "\u22D4", "piv": "\u03D6", "planck": "\u210F", "planckh": "\u210E", "plankv": "\u210F", "plus": "+", "plusacir": "\u2A23", "plusb": "\u229E", "pluscir": "\u2A22", "plusdo": "\u2214", "plusdu": "\u2A25", "pluse": "\u2A72", "PlusMinus": "\xB1", "plusmn": "\xB1", "plussim": "\u2A26", "plustwo": "\u2A27", "pm": "\xB1", "Poincareplane": "\u210C", "pointint": "\u2A15", "popf": "\u{1D561}", "Popf": "\u2119", "pound": "\xA3", "pr": "\u227A", "Pr": "\u2ABB", "prap": "\u2AB7", "prcue": "\u227C", "pre": "\u2AAF", "prE": "\u2AB3", "prec": "\u227A", "precapprox": "\u2AB7", "preccurlyeq": "\u227C", "Precedes": "\u227A", "PrecedesEqual": "\u2AAF", "PrecedesSlantEqual": "\u227C", "PrecedesTilde": "\u227E", "preceq": "\u2AAF", "precnapprox": "\u2AB9", "precneqq": "\u2AB5", "precnsim": "\u22E8", "precsim": "\u227E", "prime": "\u2032", "Prime": "\u2033", "primes": "\u2119", "prnap": "\u2AB9", "prnE": "\u2AB5", "prnsim": "\u22E8", "prod": "\u220F", "Product": "\u220F", "profalar": "\u232E", "profline": "\u2312", "profsurf": "\u2313", "prop": "\u221D", "Proportion": "\u2237", "Proportional": "\u221D", "propto": "\u221D", "prsim": "\u227E", "prurel": "\u22B0", "pscr": "\u{1D4C5}", "Pscr": "\u{1D4AB}", "psi": "\u03C8", "Psi": "\u03A8", "puncsp": "\u2008", "qfr": "\u{1D52E}", "Qfr": "\u{1D514}", "qint": "\u2A0C", "qopf": "\u{1D562}", "Qopf": "\u211A", "qprime": "\u2057", "qscr": "\u{1D4C6}", "Qscr": "\u{1D4AC}", "quaternions": "\u210D", "quatint": "\u2A16", "quest": "?", "questeq": "\u225F", "quot": '"', "QUOT": '"', "rAarr": "\u21DB", "race": "\u223D\u0331", "racute": "\u0155", "Racute": "\u0154", "radic": "\u221A", "raemptyv": "\u29B3", "rang": "\u27E9", "Rang": "\u27EB", "rangd": "\u2992", "range": "\u29A5", "rangle": "\u27E9", "raquo": "\xBB", "rarr": "\u2192", "rArr": "\u21D2", "Rarr": "\u21A0", "rarrap": "\u2975", "rarrb": "\u21E5", "rarrbfs": "\u2920", "rarrc": "\u2933", "rarrfs": "\u291E", "rarrhk": "\u21AA", "rarrlp": "\u21AC", "rarrpl": "\u2945", "rarrsim": "\u2974", "rarrtl": "\u21A3", "Rarrtl": "\u2916", "rarrw": "\u219D", "ratail": "\u291A", "rAtail": "\u291C", "ratio": "\u2236", "rationals": "\u211A", "rbarr": "\u290D", "rBarr": "\u290F", "RBarr": "\u2910", "rbbrk": "\u2773", "rbrace": "}", "rbrack": "]", "rbrke": "\u298C", "rbrksld": "\u298E", "rbrkslu": "\u2990", "rcaron": "\u0159", "Rcaron": "\u0158", "rcedil": "\u0157", "Rcedil": "\u0156", "rceil": "\u2309", "rcub": "}", "rcy": "\u0440", "Rcy": "\u0420", "rdca": "\u2937", "rdldhar": "\u2969", "rdquo": "\u201D", "rdquor": "\u201D", "rdsh": "\u21B3", "Re": "\u211C", "real": "\u211C", "realine": "\u211B", "realpart": "\u211C", "reals": "\u211D", "rect": "\u25AD", "reg": "\xAE", "REG": "\xAE", "ReverseElement": "\u220B", "ReverseEquilibrium": "\u21CB", "ReverseUpEquilibrium": "\u296F", "rfisht": "\u297D", "rfloor": "\u230B", "rfr": "\u{1D52F}", "Rfr": "\u211C", "rHar": "\u2964", "rhard": "\u21C1", "rharu": "\u21C0", "rharul": "\u296C", "rho": "\u03C1", "Rho": "\u03A1", "rhov": "\u03F1", "RightAngleBracket": "\u27E9", "rightarrow": "\u2192", "Rightarrow": "\u21D2", "RightArrow": "\u2192", "RightArrowBar": "\u21E5", "RightArrowLeftArrow": "\u21C4", "rightarrowtail": "\u21A3", "RightCeiling": "\u2309", "RightDoubleBracket": "\u27E7", "RightDownTeeVector": "\u295D", "RightDownVector": "\u21C2", "RightDownVectorBar": "\u2955", "RightFloor": "\u230B", "rightharpoondown": "\u21C1", "rightharpoonup": "\u21C0", "rightleftarrows": "\u21C4", "rightleftharpoons": "\u21CC", "rightrightarrows": "\u21C9", "rightsquigarrow": "\u219D", "RightTee": "\u22A2", "RightTeeArrow": "\u21A6", "RightTeeVector": "\u295B", "rightthreetimes": "\u22CC", "RightTriangle": "\u22B3", "RightTriangleBar": "\u29D0", "RightTriangleEqual": "\u22B5", "RightUpDownVector": "\u294F", "RightUpTeeVector": "\u295C", "RightUpVector": "\u21BE", "RightUpVectorBar": "\u2954", "RightVector": "\u21C0", "RightVectorBar": "\u2953", "ring": "\u02DA", "risingdotseq": "\u2253", "rlarr": "\u21C4", "rlhar": "\u21CC", "rlm": "\u200F", "rmoust": "\u23B1", "rmoustache": "\u23B1", "rnmid": "\u2AEE", "roang": "\u27ED", "roarr": "\u21FE", "robrk": "\u27E7", "ropar": "\u2986", "ropf": "\u{1D563}", "Ropf": "\u211D", "roplus": "\u2A2E", "rotimes": "\u2A35", "RoundImplies": "\u2970", "rpar": ")", "rpargt": "\u2994", "rppolint": "\u2A12", "rrarr": "\u21C9", "Rrightarrow": "\u21DB", "rsaquo": "\u203A", "rscr": "\u{1D4C7}", "Rscr": "\u211B", "rsh": "\u21B1", "Rsh": "\u21B1", "rsqb": "]", "rsquo": "\u2019", "rsquor": "\u2019", "rthree": "\u22CC", "rtimes": "\u22CA", "rtri": "\u25B9", "rtrie": "\u22B5", "rtrif": "\u25B8", "rtriltri": "\u29CE", "RuleDelayed": "\u29F4", "ruluhar": "\u2968", "rx": "\u211E", "sacute": "\u015B", "Sacute": "\u015A", "sbquo": "\u201A", "sc": "\u227B", "Sc": "\u2ABC", "scap": "\u2AB8", "scaron": "\u0161", "Scaron": "\u0160", "sccue": "\u227D", "sce": "\u2AB0", "scE": "\u2AB4", "scedil": "\u015F", "Scedil": "\u015E", "scirc": "\u015D", "Scirc": "\u015C", "scnap": "\u2ABA", "scnE": "\u2AB6", "scnsim": "\u22E9", "scpolint": "\u2A13", "scsim": "\u227F", "scy": "\u0441", "Scy": "\u0421", "sdot": "\u22C5", "sdotb": "\u22A1", "sdote": "\u2A66", "searhk": "\u2925", "searr": "\u2198", "seArr": "\u21D8", "searrow": "\u2198", "sect": "\xA7", "semi": ";", "seswar": "\u2929", "setminus": "\u2216", "setmn": "\u2216", "sext": "\u2736", "sfr": "\u{1D530}", "Sfr": "\u{1D516}", "sfrown": "\u2322", "sharp": "\u266F", "shchcy": "\u0449", "SHCHcy": "\u0429", "shcy": "\u0448", "SHcy": "\u0428", "ShortDownArrow": "\u2193", "ShortLeftArrow": "\u2190", "shortmid": "\u2223", "shortparallel": "\u2225", "ShortRightArrow": "\u2192", "ShortUpArrow": "\u2191", "shy": "\xAD", "sigma": "\u03C3", "Sigma": "\u03A3", "sigmaf": "\u03C2", "sigmav": "\u03C2", "sim": "\u223C", "simdot": "\u2A6A", "sime": "\u2243", "simeq": "\u2243", "simg": "\u2A9E", "simgE": "\u2AA0", "siml": "\u2A9D", "simlE": "\u2A9F", "simne": "\u2246", "simplus": "\u2A24", "simrarr": "\u2972", "slarr": "\u2190", "SmallCircle": "\u2218", "smallsetminus": "\u2216", "smashp": "\u2A33", "smeparsl": "\u29E4", "smid": "\u2223", "smile": "\u2323", "smt": "\u2AAA", "smte": "\u2AAC", "smtes": "\u2AAC\uFE00", "softcy": "\u044C", "SOFTcy": "\u042C", "sol": "/", "solb": "\u29C4", "solbar": "\u233F", "sopf": "\u{1D564}", "Sopf": "\u{1D54A}", "spades": "\u2660", "spadesuit": "\u2660", "spar": "\u2225", "sqcap": "\u2293", "sqcaps": "\u2293\uFE00", "sqcup": "\u2294", "sqcups": "\u2294\uFE00", "Sqrt": "\u221A", "sqsub": "\u228F", "sqsube": "\u2291", "sqsubset": "\u228F", "sqsubseteq": "\u2291", "sqsup": "\u2290", "sqsupe": "\u2292", "sqsupset": "\u2290", "sqsupseteq": "\u2292", "squ": "\u25A1", "square": "\u25A1", "Square": "\u25A1", "SquareIntersection": "\u2293", "SquareSubset": "\u228F", "SquareSubsetEqual": "\u2291", "SquareSuperset": "\u2290", "SquareSupersetEqual": "\u2292", "SquareUnion": "\u2294", "squarf": "\u25AA", "squf": "\u25AA", "srarr": "\u2192", "sscr": "\u{1D4C8}", "Sscr": "\u{1D4AE}", "ssetmn": "\u2216", "ssmile": "\u2323", "sstarf": "\u22C6", "star": "\u2606", "Star": "\u22C6", "starf": "\u2605", "straightepsilon": "\u03F5", "straightphi": "\u03D5", "strns": "\xAF", "sub": "\u2282", "Sub": "\u22D0", "subdot": "\u2ABD", "sube": "\u2286", "subE": "\u2AC5", "subedot": "\u2AC3", "submult": "\u2AC1", "subne": "\u228A", "subnE": "\u2ACB", "subplus": "\u2ABF", "subrarr": "\u2979", "subset": "\u2282", "Subset": "\u22D0", "subseteq": "\u2286", "subseteqq": "\u2AC5", "SubsetEqual": "\u2286", "subsetneq": "\u228A", "subsetneqq": "\u2ACB", "subsim": "\u2AC7", "subsub": "\u2AD5", "subsup": "\u2AD3", "succ": "\u227B", "succapprox": "\u2AB8", "succcurlyeq": "\u227D", "Succeeds": "\u227B", "SucceedsEqual": "\u2AB0", "SucceedsSlantEqual": "\u227D", "SucceedsTilde": "\u227F", "succeq": "\u2AB0", "succnapprox": "\u2ABA", "succneqq": "\u2AB6", "succnsim": "\u22E9", "succsim": "\u227F", "SuchThat": "\u220B", "sum": "\u2211", "Sum": "\u2211", "sung": "\u266A", "sup": "\u2283", "Sup": "\u22D1", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "supdot": "\u2ABE", "supdsub": "\u2AD8", "supe": "\u2287", "supE": "\u2AC6", "supedot": "\u2AC4", "Superset": "\u2283", "SupersetEqual": "\u2287", "suphsol": "\u27C9", "suphsub": "\u2AD7", "suplarr": "\u297B", "supmult": "\u2AC2", "supne": "\u228B", "supnE": "\u2ACC", "supplus": "\u2AC0", "supset": "\u2283", "Supset": "\u22D1", "supseteq": "\u2287", "supseteqq": "\u2AC6", "supsetneq": "\u228B", "supsetneqq": "\u2ACC", "supsim": "\u2AC8", "supsub": "\u2AD4", "supsup": "\u2AD6", "swarhk": "\u2926", "swarr": "\u2199", "swArr": "\u21D9", "swarrow": "\u2199", "swnwar": "\u292A", "szlig": "\xDF", "Tab": "	", "target": "\u2316", "tau": "\u03C4", "Tau": "\u03A4", "tbrk": "\u23B4", "tcaron": "\u0165", "Tcaron": "\u0164", "tcedil": "\u0163", "Tcedil": "\u0162", "tcy": "\u0442", "Tcy": "\u0422", "tdot": "\u20DB", "telrec": "\u2315", "tfr": "\u{1D531}", "Tfr": "\u{1D517}", "there4": "\u2234", "therefore": "\u2234", "Therefore": "\u2234", "theta": "\u03B8", "Theta": "\u0398", "thetasym": "\u03D1", "thetav": "\u03D1", "thickapprox": "\u2248", "thicksim": "\u223C", "ThickSpace": "\u205F\u200A", "thinsp": "\u2009", "ThinSpace": "\u2009", "thkap": "\u2248", "thksim": "\u223C", "thorn": "\xFE", "THORN": "\xDE", "tilde": "\u02DC", "Tilde": "\u223C", "TildeEqual": "\u2243", "TildeFullEqual": "\u2245", "TildeTilde": "\u2248", "times": "\xD7", "timesb": "\u22A0", "timesbar": "\u2A31", "timesd": "\u2A30", "tint": "\u222D", "toea": "\u2928", "top": "\u22A4", "topbot": "\u2336", "topcir": "\u2AF1", "topf": "\u{1D565}", "Topf": "\u{1D54B}", "topfork": "\u2ADA", "tosa": "\u2929", "tprime": "\u2034", "trade": "\u2122", "TRADE": "\u2122", "triangle": "\u25B5", "triangledown": "\u25BF", "triangleleft": "\u25C3", "trianglelefteq": "\u22B4", "triangleq": "\u225C", "triangleright": "\u25B9", "trianglerighteq": "\u22B5", "tridot": "\u25EC", "trie": "\u225C", "triminus": "\u2A3A", "TripleDot": "\u20DB", "triplus": "\u2A39", "trisb": "\u29CD", "tritime": "\u2A3B", "trpezium": "\u23E2", "tscr": "\u{1D4C9}", "Tscr": "\u{1D4AF}", "tscy": "\u0446", "TScy": "\u0426", "tshcy": "\u045B", "TSHcy": "\u040B", "tstrok": "\u0167", "Tstrok": "\u0166", "twixt": "\u226C", "twoheadleftarrow": "\u219E", "twoheadrightarrow": "\u21A0", "uacute": "\xFA", "Uacute": "\xDA", "uarr": "\u2191", "uArr": "\u21D1", "Uarr": "\u219F", "Uarrocir": "\u2949", "ubrcy": "\u045E", "Ubrcy": "\u040E", "ubreve": "\u016D", "Ubreve": "\u016C", "ucirc": "\xFB", "Ucirc": "\xDB", "ucy": "\u0443", "Ucy": "\u0423", "udarr": "\u21C5", "udblac": "\u0171", "Udblac": "\u0170", "udhar": "\u296E", "ufisht": "\u297E", "ufr": "\u{1D532}", "Ufr": "\u{1D518}", "ugrave": "\xF9", "Ugrave": "\xD9", "uHar": "\u2963", "uharl": "\u21BF", "uharr": "\u21BE", "uhblk": "\u2580", "ulcorn": "\u231C", "ulcorner": "\u231C", "ulcrop": "\u230F", "ultri": "\u25F8", "umacr": "\u016B", "Umacr": "\u016A", "uml": "\xA8", "UnderBar": "_", "UnderBrace": "\u23DF", "UnderBracket": "\u23B5", "UnderParenthesis": "\u23DD", "Union": "\u22C3", "UnionPlus": "\u228E", "uogon": "\u0173", "Uogon": "\u0172", "uopf": "\u{1D566}", "Uopf": "\u{1D54C}", "uparrow": "\u2191", "Uparrow": "\u21D1", "UpArrow": "\u2191", "UpArrowBar": "\u2912", "UpArrowDownArrow": "\u21C5", "updownarrow": "\u2195", "Updownarrow": "\u21D5", "UpDownArrow": "\u2195", "UpEquilibrium": "\u296E", "upharpoonleft": "\u21BF", "upharpoonright": "\u21BE", "uplus": "\u228E", "UpperLeftArrow": "\u2196", "UpperRightArrow": "\u2197", "upsi": "\u03C5", "Upsi": "\u03D2", "upsih": "\u03D2", "upsilon": "\u03C5", "Upsilon": "\u03A5", "UpTee": "\u22A5", "UpTeeArrow": "\u21A5", "upuparrows": "\u21C8", "urcorn": "\u231D", "urcorner": "\u231D", "urcrop": "\u230E", "uring": "\u016F", "Uring": "\u016E", "urtri": "\u25F9", "uscr": "\u{1D4CA}", "Uscr": "\u{1D4B0}", "utdot": "\u22F0", "utilde": "\u0169", "Utilde": "\u0168", "utri": "\u25B5", "utrif": "\u25B4", "uuarr": "\u21C8", "uuml": "\xFC", "Uuml": "\xDC", "uwangle": "\u29A7", "vangrt": "\u299C", "varepsilon": "\u03F5", "varkappa": "\u03F0", "varnothing": "\u2205", "varphi": "\u03D5", "varpi": "\u03D6", "varpropto": "\u221D", "varr": "\u2195", "vArr": "\u21D5", "varrho": "\u03F1", "varsigma": "\u03C2", "varsubsetneq": "\u228A\uFE00", "varsubsetneqq": "\u2ACB\uFE00", "varsupsetneq": "\u228B\uFE00", "varsupsetneqq": "\u2ACC\uFE00", "vartheta": "\u03D1", "vartriangleleft": "\u22B2", "vartriangleright": "\u22B3", "vBar": "\u2AE8", "Vbar": "\u2AEB", "vBarv": "\u2AE9", "vcy": "\u0432", "Vcy": "\u0412", "vdash": "\u22A2", "vDash": "\u22A8", "Vdash": "\u22A9", "VDash": "\u22AB", "Vdashl": "\u2AE6", "vee": "\u2228", "Vee": "\u22C1", "veebar": "\u22BB", "veeeq": "\u225A", "vellip": "\u22EE", "verbar": "|", "Verbar": "\u2016", "vert": "|", "Vert": "\u2016", "VerticalBar": "\u2223", "VerticalLine": "|", "VerticalSeparator": "\u2758", "VerticalTilde": "\u2240", "VeryThinSpace": "\u200A", "vfr": "\u{1D533}", "Vfr": "\u{1D519}", "vltri": "\u22B2", "vnsub": "\u2282\u20D2", "vnsup": "\u2283\u20D2", "vopf": "\u{1D567}", "Vopf": "\u{1D54D}", "vprop": "\u221D", "vrtri": "\u22B3", "vscr": "\u{1D4CB}", "Vscr": "\u{1D4B1}", "vsubne": "\u228A\uFE00", "vsubnE": "\u2ACB\uFE00", "vsupne": "\u228B\uFE00", "vsupnE": "\u2ACC\uFE00", "Vvdash": "\u22AA", "vzigzag": "\u299A", "wcirc": "\u0175", "Wcirc": "\u0174", "wedbar": "\u2A5F", "wedge": "\u2227", "Wedge": "\u22C0", "wedgeq": "\u2259", "weierp": "\u2118", "wfr": "\u{1D534}", "Wfr": "\u{1D51A}", "wopf": "\u{1D568}", "Wopf": "\u{1D54E}", "wp": "\u2118", "wr": "\u2240", "wreath": "\u2240", "wscr": "\u{1D4CC}", "Wscr": "\u{1D4B2}", "xcap": "\u22C2", "xcirc": "\u25EF", "xcup": "\u22C3", "xdtri": "\u25BD", "xfr": "\u{1D535}", "Xfr": "\u{1D51B}", "xharr": "\u27F7", "xhArr": "\u27FA", "xi": "\u03BE", "Xi": "\u039E", "xlarr": "\u27F5", "xlArr": "\u27F8", "xmap": "\u27FC", "xnis": "\u22FB", "xodot": "\u2A00", "xopf": "\u{1D569}", "Xopf": "\u{1D54F}", "xoplus": "\u2A01", "xotime": "\u2A02", "xrarr": "\u27F6", "xrArr": "\u27F9", "xscr": "\u{1D4CD}", "Xscr": "\u{1D4B3}", "xsqcup": "\u2A06", "xuplus": "\u2A04", "xutri": "\u25B3", "xvee": "\u22C1", "xwedge": "\u22C0", "yacute": "\xFD", "Yacute": "\xDD", "yacy": "\u044F", "YAcy": "\u042F", "ycirc": "\u0177", "Ycirc": "\u0176", "ycy": "\u044B", "Ycy": "\u042B", "yen": "\xA5", "yfr": "\u{1D536}", "Yfr": "\u{1D51C}", "yicy": "\u0457", "YIcy": "\u0407", "yopf": "\u{1D56A}", "Yopf": "\u{1D550}", "yscr": "\u{1D4CE}", "Yscr": "\u{1D4B4}", "yucy": "\u044E", "YUcy": "\u042E", "yuml": "\xFF", "Yuml": "\u0178", "zacute": "\u017A", "Zacute": "\u0179", "zcaron": "\u017E", "Zcaron": "\u017D", "zcy": "\u0437", "Zcy": "\u0417", "zdot": "\u017C", "Zdot": "\u017B", "zeetrf": "\u2128", "ZeroWidthSpace": "\u200B", "zeta": "\u03B6", "Zeta": "\u0396", "zfr": "\u{1D537}", "Zfr": "\u2128", "zhcy": "\u0436", "ZHcy": "\u0416", "zigrarr": "\u21DD", "zopf": "\u{1D56B}", "Zopf": "\u2124", "zscr": "\u{1D4CF}", "Zscr": "\u{1D4B5}", "zwj": "\u200D", "zwnj": "\u200C" };
          var decodeMapLegacy = { "aacute": "\xE1", "Aacute": "\xC1", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "aelig": "\xE6", "AElig": "\xC6", "agrave": "\xE0", "Agrave": "\xC0", "amp": "&", "AMP": "&", "aring": "\xE5", "Aring": "\xC5", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "brvbar": "\xA6", "ccedil": "\xE7", "Ccedil": "\xC7", "cedil": "\xB8", "cent": "\xA2", "copy": "\xA9", "COPY": "\xA9", "curren": "\xA4", "deg": "\xB0", "divide": "\xF7", "eacute": "\xE9", "Eacute": "\xC9", "ecirc": "\xEA", "Ecirc": "\xCA", "egrave": "\xE8", "Egrave": "\xC8", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "frac12": "\xBD", "frac14": "\xBC", "frac34": "\xBE", "gt": ">", "GT": ">", "iacute": "\xED", "Iacute": "\xCD", "icirc": "\xEE", "Icirc": "\xCE", "iexcl": "\xA1", "igrave": "\xEC", "Igrave": "\xCC", "iquest": "\xBF", "iuml": "\xEF", "Iuml": "\xCF", "laquo": "\xAB", "lt": "<", "LT": "<", "macr": "\xAF", "micro": "\xB5", "middot": "\xB7", "nbsp": "\xA0", "not": "\xAC", "ntilde": "\xF1", "Ntilde": "\xD1", "oacute": "\xF3", "Oacute": "\xD3", "ocirc": "\xF4", "Ocirc": "\xD4", "ograve": "\xF2", "Ograve": "\xD2", "ordf": "\xAA", "ordm": "\xBA", "oslash": "\xF8", "Oslash": "\xD8", "otilde": "\xF5", "Otilde": "\xD5", "ouml": "\xF6", "Ouml": "\xD6", "para": "\xB6", "plusmn": "\xB1", "pound": "\xA3", "quot": '"', "QUOT": '"', "raquo": "\xBB", "reg": "\xAE", "REG": "\xAE", "sect": "\xA7", "shy": "\xAD", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "szlig": "\xDF", "thorn": "\xFE", "THORN": "\xDE", "times": "\xD7", "uacute": "\xFA", "Uacute": "\xDA", "ucirc": "\xFB", "Ucirc": "\xDB", "ugrave": "\xF9", "Ugrave": "\xD9", "uml": "\xA8", "uuml": "\xFC", "Uuml": "\xDC", "yacute": "\xFD", "Yacute": "\xDD", "yen": "\xA5", "yuml": "\xFF" };
          var decodeMapNumeric = { "0": "\uFFFD", "128": "\u20AC", "130": "\u201A", "131": "\u0192", "132": "\u201E", "133": "\u2026", "134": "\u2020", "135": "\u2021", "136": "\u02C6", "137": "\u2030", "138": "\u0160", "139": "\u2039", "140": "\u0152", "142": "\u017D", "145": "\u2018", "146": "\u2019", "147": "\u201C", "148": "\u201D", "149": "\u2022", "150": "\u2013", "151": "\u2014", "152": "\u02DC", "153": "\u2122", "154": "\u0161", "155": "\u203A", "156": "\u0153", "158": "\u017E", "159": "\u0178" };
          var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
          var stringFromCharCode = String.fromCharCode;
          var object = {};
          var hasOwnProperty2 = object.hasOwnProperty;
          var has = /* @__PURE__ */ __name(function(object2, propertyName) {
            return hasOwnProperty2.call(object2, propertyName);
          }, "has");
          var contains = /* @__PURE__ */ __name(function(array2, value) {
            var index = -1;
            var length2 = array2.length;
            while (++index < length2) {
              if (array2[index] == value) {
                return true;
              }
            }
            return false;
          }, "contains");
          var merge2 = /* @__PURE__ */ __name(function(options, defaults) {
            if (!options) {
              return defaults;
            }
            var result = {};
            var key2;
            for (key2 in defaults) {
              result[key2] = has(options, key2) ? options[key2] : defaults[key2];
            }
            return result;
          }, "merge");
          var codePointToSymbol = /* @__PURE__ */ __name(function(codePoint, strict) {
            var output = "";
            if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
              if (strict) {
                parseError("character reference outside the permissible Unicode range");
              }
              return "\uFFFD";
            }
            if (has(decodeMapNumeric, codePoint)) {
              if (strict) {
                parseError("disallowed character reference");
              }
              return decodeMapNumeric[codePoint];
            }
            if (strict && contains(invalidReferenceCodePoints, codePoint)) {
              parseError("disallowed character reference");
            }
            if (codePoint > 65535) {
              codePoint -= 65536;
              output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
              codePoint = 56320 | codePoint & 1023;
            }
            output += stringFromCharCode(codePoint);
            return output;
          }, "codePointToSymbol");
          var hexEscape = /* @__PURE__ */ __name(function(codePoint) {
            return "&#x" + codePoint.toString(16).toUpperCase() + ";";
          }, "hexEscape");
          var decEscape = /* @__PURE__ */ __name(function(codePoint) {
            return "&#" + codePoint + ";";
          }, "decEscape");
          var parseError = /* @__PURE__ */ __name(function(message) {
            throw Error("Parse error: " + message);
          }, "parseError");
          var encode = /* @__PURE__ */ __name(function(string, options) {
            options = merge2(options, encode.options);
            var strict = options.strict;
            if (strict && regexInvalidRawCodePoint.test(string)) {
              parseError("forbidden code point");
            }
            var encodeEverything = options.encodeEverything;
            var useNamedReferences = options.useNamedReferences;
            var allowUnsafeSymbols = options.allowUnsafeSymbols;
            var escapeCodePoint = options.decimal ? decEscape : hexEscape;
            var escapeBmpSymbol = /* @__PURE__ */ __name(function(symbol) {
              return escapeCodePoint(symbol.charCodeAt(0));
            }, "escapeBmpSymbol");
            if (encodeEverything) {
              string = string.replace(regexAsciiWhitelist, function(symbol) {
                if (useNamedReferences && has(encodeMap, symbol)) {
                  return "&" + encodeMap[symbol] + ";";
                }
                return escapeBmpSymbol(symbol);
              });
              if (useNamedReferences) {
                string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
              }
              if (useNamedReferences) {
                string = string.replace(regexEncodeNonAscii, function(string2) {
                  return "&" + encodeMap[string2] + ";";
                });
              }
            } else if (useNamedReferences) {
              if (!allowUnsafeSymbols) {
                string = string.replace(regexEscape, function(string2) {
                  return "&" + encodeMap[string2] + ";";
                });
              }
              string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
              string = string.replace(regexEncodeNonAscii, function(string2) {
                return "&" + encodeMap[string2] + ";";
              });
            } else if (!allowUnsafeSymbols) {
              string = string.replace(regexEscape, escapeBmpSymbol);
            }
            return string.replace(regexAstralSymbols, function($0) {
              var high = $0.charCodeAt(0);
              var low = $0.charCodeAt(1);
              var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
              return escapeCodePoint(codePoint);
            }).replace(regexBmpWhitelist, escapeBmpSymbol);
          }, "encode");
          encode.options = {
            "allowUnsafeSymbols": false,
            "encodeEverything": false,
            "strict": false,
            "useNamedReferences": false,
            "decimal": false
          };
          var decode = /* @__PURE__ */ __name(function(html2, options) {
            options = merge2(options, decode.options);
            var strict = options.strict;
            if (strict && regexInvalidEntity.test(html2)) {
              parseError("malformed character reference");
            }
            return html2.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
              var codePoint;
              var semicolon;
              var decDigits;
              var hexDigits;
              var reference;
              var next2;
              if ($1) {
                reference = $1;
                return decodeMap[reference];
              }
              if ($2) {
                reference = $2;
                next2 = $3;
                if (next2 && options.isAttributeValue) {
                  if (strict && next2 == "=") {
                    parseError("`&` did not start a character reference");
                  }
                  return $0;
                } else {
                  if (strict) {
                    parseError(
                      "named character reference was not terminated by a semicolon"
                    );
                  }
                  return decodeMapLegacy[reference] + (next2 || "");
                }
              }
              if ($4) {
                decDigits = $4;
                semicolon = $5;
                if (strict && !semicolon) {
                  parseError("character reference was not terminated by a semicolon");
                }
                codePoint = parseInt(decDigits, 10);
                return codePointToSymbol(codePoint, strict);
              }
              if ($6) {
                hexDigits = $6;
                semicolon = $7;
                if (strict && !semicolon) {
                  parseError("character reference was not terminated by a semicolon");
                }
                codePoint = parseInt(hexDigits, 16);
                return codePointToSymbol(codePoint, strict);
              }
              if (strict) {
                parseError(
                  "named character reference was not terminated by a semicolon"
                );
              }
              return $0;
            });
          }, "decode");
          decode.options = {
            "isAttributeValue": false,
            "strict": false
          };
          var escape = /* @__PURE__ */ __name(function(string) {
            return string.replace(regexEscape, function($0) {
              return escapeMap[$0];
            });
          }, "escape");
          var he2 = {
            "version": "1.2.0",
            "encode": encode,
            "decode": decode,
            "escape": escape,
            "unescape": decode
          };
          if (freeExports && !freeExports.nodeType) {
            if (freeModule) {
              freeModule.exports = he2;
            } else {
              for (var key in he2) {
                has(he2, key) && (freeExports[key] = he2[key]);
              }
            }
          } else {
            root.he = he2;
          }
        })(commonjsGlobal);
      })(he, he.exports);
      (function(exports2) {
        const { nanoid: nanoid2 } = nonSecure;
        var path = require$$1;
        var util2 = require$$0$1;
        var he$1 = he.exports;
        const MOCHA_ID_PROP_NAME2 = "__mocha_id__";
        exports2.inherits = util2.inherits;
        exports2.escape = function(html2) {
          return he$1.encode(String(html2), { useNamedReferences: false });
        };
        exports2.isString = function(obj) {
          return typeof obj === "string";
        };
        exports2.slug = function(str) {
          return str.toLowerCase().replace(/\s+/g, "-").replace(/[^-\w]/g, "").replace(/-{2,}/g, "-");
        };
        exports2.clean = function(str) {
          str = str.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, "").replace(
            /^function(?:\s*|\s[^(]*)\([^)]*\)\s*\{((?:.|\n)*?)\}$|^\([^)]*\)\s*=>\s*(?:\{((?:.|\n)*?)\}|((?:.|\n)*))$/,
            "$1$2$3"
          );
          var spaces = str.match(/^\n?( *)/)[1].length;
          var tabs = str.match(/^\n?(\t*)/)[1].length;
          var re = new RegExp(
            "^\n?" + (tabs ? "	" : " ") + "{" + (tabs || spaces) + "}",
            "gm"
          );
          str = str.replace(re, "");
          return str.trim();
        };
        function emptyRepresentation(value, typeHint) {
          switch (typeHint) {
            case "function":
              return "[Function]";
            case "object":
              return "{}";
            case "array":
              return "[]";
            default:
              return value.toString();
          }
        }
        __name(emptyRepresentation, "emptyRepresentation");
        var canonicalType = exports2.canonicalType = /* @__PURE__ */ __name(function canonicalType2(value) {
          if (value === void 0) {
            return "undefined";
          } else if (value === null) {
            return "null";
          } else if (isBuffer(value)) {
            return "buffer";
          }
          return Object.prototype.toString.call(value).replace(/^\[.+\s(.+?)]$/, "$1").toLowerCase();
        }, "canonicalType");
        exports2.type = /* @__PURE__ */ __name(function type(value) {
          if (value === null)
            return "null";
          const primitives = /* @__PURE__ */ new Set([
            "undefined",
            "boolean",
            "number",
            "string",
            "bigint",
            "symbol"
          ]);
          const _type = typeof value;
          if (_type === "function")
            return _type;
          if (primitives.has(_type))
            return _type;
          if (value instanceof String)
            return "string";
          if (value instanceof Error)
            return "error";
          if (Array.isArray(value))
            return "array";
          return _type;
        }, "type");
        exports2.stringify = function(value) {
          var typeHint = canonicalType(value);
          if (!~["object", "array", "function"].indexOf(typeHint)) {
            if (typeHint === "buffer") {
              var json2 = Buffer2.prototype.toJSON.call(value);
              return jsonStringify(
                json2.data && json2.type ? json2.data : json2,
                2
              ).replace(/,(\n|$)/g, "$1");
            }
            if (typeHint === "string" && typeof value === "object") {
              value = value.split("").reduce(function(acc, char2, idx) {
                acc[idx] = char2;
                return acc;
              }, {});
              typeHint = "object";
            } else {
              return jsonStringify(value);
            }
          }
          for (var prop in value) {
            if (Object.prototype.hasOwnProperty.call(value, prop)) {
              return jsonStringify(
                exports2.canonicalize(value, null, typeHint),
                2
              ).replace(/,(\n|$)/g, "$1");
            }
          }
          return emptyRepresentation(value, typeHint);
        };
        function jsonStringify(object, spaces, depth) {
          if (typeof spaces === "undefined") {
            return _stringify(object);
          }
          depth = depth || 1;
          var space = spaces * depth;
          var str = Array.isArray(object) ? "[" : "{";
          var end = Array.isArray(object) ? "]" : "}";
          var length2 = typeof object.length === "number" ? object.length : Object.keys(object).length;
          function repeat(s2, n) {
            return new Array(n).join(s2);
          }
          __name(repeat, "repeat");
          function _stringify(val) {
            switch (canonicalType(val)) {
              case "null":
              case "undefined":
                val = "[" + val + "]";
                break;
              case "array":
              case "object":
                val = jsonStringify(val, spaces, depth + 1);
                break;
              case "boolean":
              case "regexp":
              case "symbol":
              case "number":
                val = val === 0 && 1 / val === -Infinity ? "-0" : val.toString();
                break;
              case "bigint":
                val = val.toString() + "n";
                break;
              case "date":
                var sDate = isNaN(val.getTime()) ? val.toString() : val.toISOString();
                val = "[Date: " + sDate + "]";
                break;
              case "buffer":
                var json2 = val.toJSON();
                json2 = json2.data && json2.type ? json2.data : json2;
                val = "[Buffer: " + jsonStringify(json2, 2, depth + 1) + "]";
                break;
              default:
                val = val === "[Function]" || val === "[Circular]" ? val : JSON.stringify(val);
            }
            return val;
          }
          __name(_stringify, "_stringify");
          for (var i in object) {
            if (!Object.prototype.hasOwnProperty.call(object, i)) {
              continue;
            }
            --length2;
            str += "\n " + repeat(" ", space) + (Array.isArray(object) ? "" : '"' + i + '": ') + // key
            _stringify(object[i]) + // value
            (length2 ? "," : "");
          }
          return str + // [], {}
          (str.length !== 1 ? "\n" + repeat(" ", --space) + end : end);
        }
        __name(jsonStringify, "jsonStringify");
        exports2.canonicalize = /* @__PURE__ */ __name(function canonicalize2(value, stack, typeHint) {
          var canonicalizedObj;
          var prop;
          typeHint = typeHint || canonicalType(value);
          function withStack(value2, fn) {
            stack.push(value2);
            fn();
            stack.pop();
          }
          __name(withStack, "withStack");
          stack = stack || [];
          if (stack.indexOf(value) !== -1) {
            return "[Circular]";
          }
          switch (typeHint) {
            case "undefined":
            case "buffer":
            case "null":
              canonicalizedObj = value;
              break;
            case "array":
              withStack(value, function() {
                canonicalizedObj = value.map(function(item) {
                  return exports2.canonicalize(item, stack);
                });
              });
              break;
            case "function":
              for (prop in value) {
                canonicalizedObj = {};
                break;
              }
              if (!canonicalizedObj) {
                canonicalizedObj = emptyRepresentation(value, typeHint);
                break;
              }
            case "object":
              canonicalizedObj = canonicalizedObj || {};
              withStack(value, function() {
                Object.keys(value).sort().forEach(function(key) {
                  canonicalizedObj[key] = exports2.canonicalize(value[key], stack);
                });
              });
              break;
            case "date":
            case "number":
            case "regexp":
            case "boolean":
            case "symbol":
              canonicalizedObj = value;
              break;
            default:
              canonicalizedObj = value + "";
          }
          return canonicalizedObj;
        }, "canonicalize");
        exports2.stackTraceFilter = function() {
          var is = typeof document === "undefined" ? { node: true } : { browser: true };
          var slash = path.sep;
          var cwd2;
          if (is.node) {
            cwd2 = exports2.cwd() + slash;
          } else {
            cwd2 = (typeof location === "undefined" ? window.location : location).href.replace(/\/[^/]*$/, "/");
            slash = "/";
          }
          function isMochaInternal(line3) {
            return ~line3.indexOf("node_modules" + slash + "mocha" + slash) || ~line3.indexOf(slash + "mocha.js") || ~line3.indexOf(slash + "mocha.min.js");
          }
          __name(isMochaInternal, "isMochaInternal");
          function isNodeInternal(line3) {
            return ~line3.indexOf("(timers.js:") || ~line3.indexOf("(events.js:") || ~line3.indexOf("(node.js:") || ~line3.indexOf("(module.js:") || ~line3.indexOf("GeneratorFunctionPrototype.next (native)") || false;
          }
          __name(isNodeInternal, "isNodeInternal");
          return function(stack) {
            stack = stack.split("\n");
            stack = stack.reduce(function(list2, line3) {
              if (isMochaInternal(line3)) {
                return list2;
              }
              if (is.node && isNodeInternal(line3)) {
                return list2;
              }
              if (/:\d+:\d+\)?$/.test(line3)) {
                line3 = line3.replace("(" + cwd2, "(");
              }
              list2.push(line3);
              return list2;
            }, []);
            return stack.join("\n");
          };
        };
        exports2.isPromise = /* @__PURE__ */ __name(function isPromise(value) {
          return typeof value === "object" && value !== null && typeof value.then === "function";
        }, "isPromise");
        exports2.clamp = /* @__PURE__ */ __name(function clamp(value, range) {
          return Math.min(Math.max(value, range[0]), range[1]);
        }, "clamp");
        exports2.noop = function() {
        };
        exports2.createMap = function(obj) {
          return Object.assign.apply(
            null,
            [/* @__PURE__ */ Object.create(null)].concat(Array.prototype.slice.call(arguments))
          );
        };
        exports2.defineConstants = function(obj) {
          if (canonicalType(obj) !== "object" || !Object.keys(obj).length) {
            throw new TypeError("Invalid argument; expected a non-empty object");
          }
          return Object.freeze(exports2.createMap(obj));
        };
        exports2.cwd = /* @__PURE__ */ __name(function cwd2() {
          return process2.cwd();
        }, "cwd");
        exports2.isBrowser = /* @__PURE__ */ __name(function isBrowser() {
          return Boolean(browser$2);
        }, "isBrowser");
        exports2.castArray = /* @__PURE__ */ __name(function castArray(value) {
          if (value === void 0) {
            return [];
          }
          if (value === null) {
            return [null];
          }
          if (typeof value === "object" && (typeof value[Symbol.iterator] === "function" || value.length !== void 0)) {
            return Array.from(value);
          }
          return [value];
        }, "castArray");
        exports2.constants = exports2.defineConstants({
          MOCHA_ID_PROP_NAME: MOCHA_ID_PROP_NAME2
        });
        exports2.uniqueID = () => nanoid2();
        exports2.assignNewMochaID = (obj) => {
          const id = exports2.uniqueID();
          Object.defineProperty(obj, MOCHA_ID_PROP_NAME2, {
            get() {
              return id;
            }
          });
          return obj;
        };
        exports2.getMochaID = (obj) => obj && typeof obj === "object" ? obj[MOCHA_ID_PROP_NAME2] : void 0;
      })(utils$3);
      var _nodeResolve_empty = {};
      var _nodeResolve_empty$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": _nodeResolve_empty
      });
      var require$$18 = /* @__PURE__ */ getAugmentedNamespace(_nodeResolve_empty$1);
      var browser$1 = {
        info: "\u2139\uFE0F",
        success: "\u2705",
        warning: "\u26A0\uFE0F",
        error: "\u274C\uFE0F"
      };
      var require$$0 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_events);
      var pending = Pending$2;
      function Pending$2(message) {
        this.message = message;
      }
      __name(Pending$2, "Pending$2");
      var browser = { exports: {} };
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      var ms = /* @__PURE__ */ __name(function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      }, "ms");
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      __name(parse2, "parse");
      function fmtShort(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d) {
          return Math.round(ms2 / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms2 / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms2 / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms2 / s) + "s";
        }
        return ms2 + "ms";
      }
      __name(fmtShort, "fmtShort");
      function fmtLong(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d) {
          return plural(ms2, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms2, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms2, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms2, msAbs, s, "second");
        }
        return ms2 + " ms";
      }
      __name(fmtLong, "fmtLong");
      function plural(ms2, msAbs, n, name2) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms2 / n) + " " + name2 + (isPlural ? "s" : "");
      }
      __name(plural, "plural");
      function setup(env2) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = ms;
        createDebug.destroy = destroy;
        Object.keys(env2).forEach((key) => {
          createDebug[key] = env2[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        __name(selectColor, "selectColor");
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug2(...args) {
            if (!debug2.enabled) {
              return;
            }
            const self2 = debug2;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms2 = curr - (prevTime || curr);
            self2.diff = ms2;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format2];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          __name(debug2, "debug");
          debug2.namespace = namespace;
          debug2.useColors = createDebug.useColors();
          debug2.color = createDebug.selectColor(namespace);
          debug2.extend = extend;
          debug2.destroy = createDebug.destroy;
          Object.defineProperty(debug2, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v2) => {
              enableOverride = v2;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug2);
          }
          return debug2;
        }
        __name(createDebug, "createDebug");
        function extend(namespace, delimiter3) {
          const newDebug = createDebug(this.namespace + (typeof delimiter3 === "undefined" ? ":" : delimiter3) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        __name(extend, "extend");
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        __name(enable, "enable");
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        __name(disable, "disable");
        function enabled(name2) {
          if (name2[name2.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name2)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name2)) {
              return true;
            }
          }
          return false;
        }
        __name(enabled, "enabled");
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        __name(toNamespace, "toNamespace");
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        __name(coerce, "coerce");
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        __name(destroy, "destroy");
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      __name(setup, "setup");
      var common$1 = setup;
      (function(module2, exports2) {
        exports2.formatArgs = formatArgs;
        exports2.save = save;
        exports2.load = load;
        exports2.useColors = useColors;
        exports2.storage = localstorage();
        exports2.destroy = /* @__PURE__ */ (() => {
          let warned = false;
          return () => {
            if (!warned) {
              warned = true;
              console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
            }
          };
        })();
        exports2.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33"
        ];
        function useColors() {
          if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
            return true;
          }
          if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
            return false;
          }
          return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
          typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
          typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        __name(useColors, "useColors");
        function formatArgs(args) {
          args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
          if (!this.useColors) {
            return;
          }
          const c = "color: " + this.color;
          args.splice(1, 0, c, "color: inherit");
          let index = 0;
          let lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, (match) => {
            if (match === "%%") {
              return;
            }
            index++;
            if (match === "%c") {
              lastC = index;
            }
          });
          args.splice(lastC, 0, c);
        }
        __name(formatArgs, "formatArgs");
        exports2.log = console.debug || console.log || (() => {
        });
        function save(namespaces) {
          try {
            if (namespaces) {
              exports2.storage.setItem("debug", namespaces);
            } else {
              exports2.storage.removeItem("debug");
            }
          } catch (error) {
          }
        }
        __name(save, "save");
        function load() {
          let r;
          try {
            r = exports2.storage.getItem("debug");
          } catch (error) {
          }
          if (!r && typeof process2 !== "undefined" && "env" in process2) {
            r = process2.env.DEBUG;
          }
          return r;
        }
        __name(load, "load");
        function localstorage() {
          try {
            return localStorage;
          } catch (error) {
          }
        }
        __name(localstorage, "localstorage");
        module2.exports = common$1(exports2);
        const { formatters } = module2.exports;
        formatters.j = function(v2) {
          try {
            return JSON.stringify(v2);
          } catch (error) {
            return "[UnexpectedJSONParseError]: " + error.message;
          }
        };
      })(browser, browser.exports);
      const { format } = require$$0$1;
      const emitWarning = /* @__PURE__ */ __name((msg, type) => {
        if (process2.emitWarning) {
          process2.emitWarning(msg, type);
        } else {
          nextTick$1(function() {
            console.warn(type + ": " + msg);
          });
        }
      }, "emitWarning");
      const deprecate = /* @__PURE__ */ __name((msg) => {
        msg = String(msg);
        if (msg && !deprecate.cache[msg]) {
          deprecate.cache[msg] = true;
          emitWarning(msg, "DeprecationWarning");
        }
      }, "deprecate");
      deprecate.cache = {};
      const warn = /* @__PURE__ */ __name((msg) => {
        if (msg) {
          emitWarning(msg);
        }
      }, "warn");
      var constants$4 = {
        /**
         * An unrecoverable error.
         * @constant
         * @default
         */
        FATAL: "ERR_MOCHA_FATAL",
        /**
         * The type of an argument to a function call is invalid
         * @constant
         * @default
         */
        INVALID_ARG_TYPE: "ERR_MOCHA_INVALID_ARG_TYPE",
        /**
         * The value of an argument to a function call is invalid
         * @constant
         * @default
         */
        INVALID_ARG_VALUE: "ERR_MOCHA_INVALID_ARG_VALUE",
        /**
         * Something was thrown, but it wasn't an `Error`
         * @constant
         * @default
         */
        INVALID_EXCEPTION: "ERR_MOCHA_INVALID_EXCEPTION",
        /**
         * An interface (e.g., `Mocha.interfaces`) is unknown or invalid
         * @constant
         * @default
         */
        INVALID_INTERFACE: "ERR_MOCHA_INVALID_INTERFACE",
        /**
         * A reporter (.e.g, `Mocha.reporters`) is unknown or invalid
         * @constant
         * @default
         */
        INVALID_REPORTER: "ERR_MOCHA_INVALID_REPORTER",
        /**
         * `done()` was called twice in a `Test` or `Hook` callback
         * @constant
         * @default
         */
        MULTIPLE_DONE: "ERR_MOCHA_MULTIPLE_DONE",
        /**
         * No files matched the pattern provided by the user
         * @constant
         * @default
         */
        NO_FILES_MATCH_PATTERN: "ERR_MOCHA_NO_FILES_MATCH_PATTERN",
        /**
         * Known, but unsupported behavior of some kind
         * @constant
         * @default
         */
        UNSUPPORTED: "ERR_MOCHA_UNSUPPORTED",
        /**
         * Invalid state transition occurring in `Mocha` instance
         * @constant
         * @default
         */
        INSTANCE_ALREADY_RUNNING: "ERR_MOCHA_INSTANCE_ALREADY_RUNNING",
        /**
         * Invalid state transition occurring in `Mocha` instance
         * @constant
         * @default
         */
        INSTANCE_ALREADY_DISPOSED: "ERR_MOCHA_INSTANCE_ALREADY_DISPOSED",
        /**
         * Use of `only()` w/ `--forbid-only` results in this error.
         * @constant
         * @default
         */
        FORBIDDEN_EXCLUSIVITY: "ERR_MOCHA_FORBIDDEN_EXCLUSIVITY",
        /**
         * To be thrown when a user-defined plugin implementation (e.g., `mochaHooks`) is invalid
         * @constant
         * @default
         */
        INVALID_PLUGIN_IMPLEMENTATION: "ERR_MOCHA_INVALID_PLUGIN_IMPLEMENTATION",
        /**
         * To be thrown when a builtin or third-party plugin definition (the _definition_ of `mochaHooks`) is invalid
         * @constant
         * @default
         */
        INVALID_PLUGIN_DEFINITION: "ERR_MOCHA_INVALID_PLUGIN_DEFINITION",
        /**
         * When a runnable exceeds its allowed run time.
         * @constant
         * @default
         */
        TIMEOUT: "ERR_MOCHA_TIMEOUT",
        /**
         * Input file is not able to be parsed
         * @constant
         * @default
         */
        UNPARSABLE_FILE: "ERR_MOCHA_UNPARSABLE_FILE"
      };
      const MOCHA_ERRORS = new Set(Object.values(constants$4));
      function createNoFilesMatchPatternError(message, pattern) {
        var err = new Error(message);
        err.code = constants$4.NO_FILES_MATCH_PATTERN;
        err.pattern = pattern;
        return err;
      }
      __name(createNoFilesMatchPatternError, "createNoFilesMatchPatternError");
      function createInvalidReporterError(message, reporter2) {
        var err = new TypeError(message);
        err.code = constants$4.INVALID_REPORTER;
        err.reporter = reporter2;
        return err;
      }
      __name(createInvalidReporterError, "createInvalidReporterError");
      function createInvalidInterfaceError(message, ui2) {
        var err = new Error(message);
        err.code = constants$4.INVALID_INTERFACE;
        err.interface = ui2;
        return err;
      }
      __name(createInvalidInterfaceError, "createInvalidInterfaceError");
      function createUnsupportedError$2(message) {
        var err = new Error(message);
        err.code = constants$4.UNSUPPORTED;
        return err;
      }
      __name(createUnsupportedError$2, "createUnsupportedError$2");
      function createMissingArgumentError$1(message, argument, expected) {
        return createInvalidArgumentTypeError$1(message, argument, expected);
      }
      __name(createMissingArgumentError$1, "createMissingArgumentError$1");
      function createInvalidArgumentTypeError$1(message, argument, expected) {
        var err = new TypeError(message);
        err.code = constants$4.INVALID_ARG_TYPE;
        err.argument = argument;
        err.expected = expected;
        err.actual = typeof argument;
        return err;
      }
      __name(createInvalidArgumentTypeError$1, "createInvalidArgumentTypeError$1");
      function createInvalidArgumentValueError(message, argument, value, reason) {
        var err = new TypeError(message);
        err.code = constants$4.INVALID_ARG_VALUE;
        err.argument = argument;
        err.value = value;
        err.reason = typeof reason !== "undefined" ? reason : "is invalid";
        return err;
      }
      __name(createInvalidArgumentValueError, "createInvalidArgumentValueError");
      function createInvalidExceptionError$2(message, value) {
        var err = new Error(message);
        err.code = constants$4.INVALID_EXCEPTION;
        err.valueType = typeof value;
        err.value = value;
        return err;
      }
      __name(createInvalidExceptionError$2, "createInvalidExceptionError$2");
      function createFatalError$1(message, value) {
        var err = new Error(message);
        err.code = constants$4.FATAL;
        err.valueType = typeof value;
        err.value = value;
        return err;
      }
      __name(createFatalError$1, "createFatalError$1");
      function createInvalidLegacyPluginError(message, pluginType, pluginId) {
        switch (pluginType) {
          case "reporter":
            return createInvalidReporterError(message, pluginId);
          case "ui":
            return createInvalidInterfaceError(message, pluginId);
          default:
            throw new Error('unknown pluginType "' + pluginType + '"');
        }
      }
      __name(createInvalidLegacyPluginError, "createInvalidLegacyPluginError");
      function createInvalidPluginError(...args) {
        deprecate("Use createInvalidLegacyPluginError() instead");
        return createInvalidLegacyPluginError(...args);
      }
      __name(createInvalidPluginError, "createInvalidPluginError");
      function createMochaInstanceAlreadyDisposedError(message, cleanReferencesAfterRun, instance) {
        var err = new Error(message);
        err.code = constants$4.INSTANCE_ALREADY_DISPOSED;
        err.cleanReferencesAfterRun = cleanReferencesAfterRun;
        err.instance = instance;
        return err;
      }
      __name(createMochaInstanceAlreadyDisposedError, "createMochaInstanceAlreadyDisposedError");
      function createMochaInstanceAlreadyRunningError(message, instance) {
        var err = new Error(message);
        err.code = constants$4.INSTANCE_ALREADY_RUNNING;
        err.instance = instance;
        return err;
      }
      __name(createMochaInstanceAlreadyRunningError, "createMochaInstanceAlreadyRunningError");
      function createMultipleDoneError$1(runnable2, originalErr) {
        var title2;
        try {
          title2 = format("<%s>", runnable2.fullTitle());
          if (runnable2.parent.root) {
            title2 += " (of root suite)";
          }
        } catch (ignored) {
          title2 = format("<%s> (of unknown suite)", runnable2.title);
        }
        var message = format(
          "done() called multiple times in %s %s",
          runnable2.type ? runnable2.type : "unknown runnable",
          title2
        );
        if (runnable2.file) {
          message += format(" of file %s", runnable2.file);
        }
        if (originalErr) {
          message += format("; in addition, done() received error: %s", originalErr);
        }
        var err = new Error(message);
        err.code = constants$4.MULTIPLE_DONE;
        err.valueType = typeof originalErr;
        err.value = originalErr;
        return err;
      }
      __name(createMultipleDoneError$1, "createMultipleDoneError$1");
      function createForbiddenExclusivityError$1(mocha3) {
        var err = new Error(
          mocha3.isWorker ? "`.only` is not supported in parallel mode" : "`.only` forbidden by --forbid-only"
        );
        err.code = constants$4.FORBIDDEN_EXCLUSIVITY;
        return err;
      }
      __name(createForbiddenExclusivityError$1, "createForbiddenExclusivityError$1");
      function createInvalidPluginDefinitionError(msg, pluginDef) {
        const err = new Error(msg);
        err.code = constants$4.INVALID_PLUGIN_DEFINITION;
        err.pluginDef = pluginDef;
        return err;
      }
      __name(createInvalidPluginDefinitionError, "createInvalidPluginDefinitionError");
      function createInvalidPluginImplementationError(msg, { pluginDef, pluginImpl } = {}) {
        const err = new Error(msg);
        err.code = constants$4.INVALID_PLUGIN_IMPLEMENTATION;
        err.pluginDef = pluginDef;
        err.pluginImpl = pluginImpl;
        return err;
      }
      __name(createInvalidPluginImplementationError, "createInvalidPluginImplementationError");
      function createTimeoutError$1(msg, timeout2, file) {
        const err = new Error(msg);
        err.code = constants$4.TIMEOUT;
        err.timeout = timeout2;
        err.file = file;
        return err;
      }
      __name(createTimeoutError$1, "createTimeoutError$1");
      function createUnparsableFileError(message, filename) {
        var err = new Error(message);
        err.code = constants$4.UNPARSABLE_FILE;
        return err;
      }
      __name(createUnparsableFileError, "createUnparsableFileError");
      const isMochaError$1 = /* @__PURE__ */ __name((err) => Boolean(err && typeof err === "object" && MOCHA_ERRORS.has(err.code)), "isMochaError$1");
      var errors$2 = {
        constants: constants$4,
        createFatalError: createFatalError$1,
        createForbiddenExclusivityError: createForbiddenExclusivityError$1,
        createInvalidArgumentTypeError: createInvalidArgumentTypeError$1,
        createInvalidArgumentValueError,
        createInvalidExceptionError: createInvalidExceptionError$2,
        createInvalidInterfaceError,
        createInvalidLegacyPluginError,
        createInvalidPluginDefinitionError,
        createInvalidPluginError,
        createInvalidPluginImplementationError,
        createInvalidReporterError,
        createMissingArgumentError: createMissingArgumentError$1,
        createMochaInstanceAlreadyDisposedError,
        createMochaInstanceAlreadyRunningError,
        createMultipleDoneError: createMultipleDoneError$1,
        createNoFilesMatchPatternError,
        createTimeoutError: createTimeoutError$1,
        createUnparsableFileError,
        createUnsupportedError: createUnsupportedError$2,
        deprecate,
        isMochaError: isMochaError$1,
        warn
      };
      var EventEmitter$1 = require$$0.EventEmitter;
      var Pending$1 = pending;
      var debug$1 = browser.exports("mocha:runnable");
      var milliseconds = ms$1;
      var utils$2 = utils$3;
      const {
        createInvalidExceptionError: createInvalidExceptionError$1,
        createMultipleDoneError,
        createTimeoutError
      } = errors$2;
      var Date$3 = commonjsGlobal.Date;
      var setTimeout$2 = commonjsGlobal.setTimeout;
      var clearTimeout$1 = commonjsGlobal.clearTimeout;
      var toString = Object.prototype.toString;
      var runnable = Runnable$3;
      function Runnable$3(title2, fn) {
        this.title = title2;
        this.fn = fn;
        this.body = (fn || "").toString();
        this.async = fn && fn.length;
        this.sync = !this.async;
        this._timeout = 2e3;
        this._slow = 75;
        this._retries = -1;
        utils$2.assignNewMochaID(this);
        Object.defineProperty(this, "id", {
          get() {
            return utils$2.getMochaID(this);
          }
        });
        this.reset();
      }
      __name(Runnable$3, "Runnable$3");
      utils$2.inherits(Runnable$3, EventEmitter$1);
      Runnable$3.prototype.reset = function() {
        this.timedOut = false;
        this._currentRetry = 0;
        this.pending = false;
        delete this.state;
        delete this.err;
      };
      Runnable$3.prototype.timeout = function(ms2) {
        if (!arguments.length) {
          return this._timeout;
        }
        if (typeof ms2 === "string") {
          ms2 = milliseconds(ms2);
        }
        var INT_MAX = Math.pow(2, 31) - 1;
        var range = [0, INT_MAX];
        ms2 = utils$2.clamp(ms2, range);
        if (ms2 === range[0] || ms2 === range[1]) {
          this._timeout = 0;
        } else {
          this._timeout = ms2;
        }
        debug$1("timeout %d", this._timeout);
        if (this.timer) {
          this.resetTimeout();
        }
        return this;
      };
      Runnable$3.prototype.slow = function(ms2) {
        if (!arguments.length || typeof ms2 === "undefined") {
          return this._slow;
        }
        if (typeof ms2 === "string") {
          ms2 = milliseconds(ms2);
        }
        debug$1("slow %d", ms2);
        this._slow = ms2;
        return this;
      };
      Runnable$3.prototype.skip = function() {
        this.pending = true;
        throw new Pending$1("sync skip; aborting execution");
      };
      Runnable$3.prototype.isPending = function() {
        return this.pending || this.parent && this.parent.isPending();
      };
      Runnable$3.prototype.isFailed = function() {
        return !this.isPending() && this.state === constants$3.STATE_FAILED;
      };
      Runnable$3.prototype.isPassed = function() {
        return !this.isPending() && this.state === constants$3.STATE_PASSED;
      };
      Runnable$3.prototype.retries = function(n) {
        if (!arguments.length) {
          return this._retries;
        }
        this._retries = n;
      };
      Runnable$3.prototype.currentRetry = function(n) {
        if (!arguments.length) {
          return this._currentRetry;
        }
        this._currentRetry = n;
      };
      Runnable$3.prototype.fullTitle = function() {
        return this.titlePath().join(" ");
      };
      Runnable$3.prototype.titlePath = function() {
        return this.parent.titlePath().concat([this.title]);
      };
      Runnable$3.prototype.clearTimeout = function() {
        clearTimeout$1(this.timer);
      };
      Runnable$3.prototype.resetTimeout = function() {
        var self2 = this;
        var ms2 = this.timeout();
        if (ms2 === 0) {
          return;
        }
        this.clearTimeout();
        this.timer = setTimeout$2(function() {
          if (self2.timeout() === 0) {
            return;
          }
          self2.callback(self2._timeoutError(ms2));
          self2.timedOut = true;
        }, ms2);
      };
      Runnable$3.prototype.globals = function(globals2) {
        if (!arguments.length) {
          return this._allowedGlobals;
        }
        this._allowedGlobals = globals2;
      };
      Runnable$3.prototype.run = function(fn) {
        var self2 = this;
        var start = new Date$3();
        var ctx = this.ctx;
        var finished;
        var errorWasHandled = false;
        if (this.isPending())
          return fn();
        if (ctx && ctx.runnable) {
          ctx.runnable(this);
        }
        function multiple(err) {
          if (errorWasHandled) {
            return;
          }
          errorWasHandled = true;
          self2.emit("error", createMultipleDoneError(self2, err));
        }
        __name(multiple, "multiple");
        function done2(err) {
          var ms2 = self2.timeout();
          if (self2.timedOut) {
            return;
          }
          if (finished) {
            return multiple(err);
          }
          self2.clearTimeout();
          self2.duration = new Date$3() - start;
          finished = true;
          if (!err && self2.duration > ms2 && ms2 > 0) {
            err = self2._timeoutError(ms2);
          }
          fn(err);
        }
        __name(done2, "done");
        this.callback = done2;
        if (this.fn && typeof this.fn.call !== "function") {
          done2(
            new TypeError(
              "A runnable must be passed a function as its second argument."
            )
          );
          return;
        }
        if (this.async) {
          this.resetTimeout();
          this.skip = /* @__PURE__ */ __name(function asyncSkip() {
            this.pending = true;
            done2();
            throw new Pending$1("async skip; aborting execution");
          }, "asyncSkip");
          try {
            callFnAsync(this.fn);
          } catch (err) {
            errorWasHandled = true;
            if (err instanceof Pending$1) {
              return;
            } else if (this.allowUncaught) {
              throw err;
            }
            done2(Runnable$3.toValueOrError(err));
          }
          return;
        }
        try {
          callFn(this.fn);
        } catch (err) {
          errorWasHandled = true;
          if (err instanceof Pending$1) {
            return done2();
          } else if (this.allowUncaught) {
            throw err;
          }
          done2(Runnable$3.toValueOrError(err));
        }
        function callFn(fn2) {
          var result = fn2.call(ctx);
          if (result && typeof result.then === "function") {
            self2.resetTimeout();
            result.then(
              function() {
                done2();
                return null;
              },
              function(reason) {
                done2(reason || new Error("Promise rejected with no or falsy reason"));
              }
            );
          } else {
            if (self2.asyncOnly) {
              return done2(
                new Error(
                  "--async-only option in use without declaring `done()` or returning a promise"
                )
              );
            }
            done2();
          }
        }
        __name(callFn, "callFn");
        function callFnAsync(fn2) {
          var result = fn2.call(ctx, function(err) {
            if (err instanceof Error || toString.call(err) === "[object Error]") {
              return done2(err);
            }
            if (err) {
              if (Object.prototype.toString.call(err) === "[object Object]") {
                return done2(
                  new Error("done() invoked with non-Error: " + JSON.stringify(err))
                );
              }
              return done2(new Error("done() invoked with non-Error: " + err));
            }
            if (result && utils$2.isPromise(result)) {
              return done2(
                new Error(
                  "Resolution method is overspecified. Specify a callback *or* return a Promise; not both."
                )
              );
            }
            done2();
          });
        }
        __name(callFnAsync, "callFnAsync");
      };
      Runnable$3.prototype._timeoutError = function(ms2) {
        let msg = `Timeout of ${ms2}ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.`;
        if (this.file) {
          msg += " (" + this.file + ")";
        }
        return createTimeoutError(msg, ms2, this.file);
      };
      var constants$3 = utils$2.defineConstants(
        /**
         * {@link Runnable}-related constants.
         * @public
         * @memberof Runnable
         * @readonly
         * @static
         * @alias constants
         * @enum {string}
         */
        {
          /**
           * Value of `state` prop when a `Runnable` has failed
           */
          STATE_FAILED: "failed",
          /**
           * Value of `state` prop when a `Runnable` has passed
           */
          STATE_PASSED: "passed",
          /**
           * Value of `state` prop when a `Runnable` has been skipped by user
           */
          STATE_PENDING: "pending"
        }
      );
      Runnable$3.toValueOrError = function(value) {
        return value || createInvalidExceptionError$1(
          "Runnable failed with falsy or undefined exception. Please throw an Error instead.",
          value
        );
      };
      Runnable$3.constants = constants$3;
      var suite = { exports: {} };
      var Runnable$2 = runnable;
      const { inherits, constants: constants$2 } = utils$3;
      const { MOCHA_ID_PROP_NAME: MOCHA_ID_PROP_NAME$1 } = constants$2;
      var hook = Hook;
      function Hook(title2, fn) {
        Runnable$2.call(this, title2, fn);
        this.type = "hook";
      }
      __name(Hook, "Hook");
      inherits(Hook, Runnable$2);
      Hook.prototype.reset = function() {
        Runnable$2.prototype.reset.call(this);
        delete this._error;
      };
      Hook.prototype.error = function(err) {
        if (!arguments.length) {
          err = this._error;
          this._error = null;
          return err;
        }
        this._error = err;
      };
      Hook.prototype.serialize = /* @__PURE__ */ __name(function serialize2() {
        return {
          $$currentRetry: this.currentRetry(),
          $$fullTitle: this.fullTitle(),
          $$isPending: Boolean(this.isPending()),
          $$titlePath: this.titlePath(),
          ctx: this.ctx && this.ctx.currentTest ? {
            currentTest: {
              title: this.ctx.currentTest.title,
              [MOCHA_ID_PROP_NAME$1]: this.ctx.currentTest.id
            }
          } : {},
          duration: this.duration,
          file: this.file,
          parent: {
            $$fullTitle: this.parent.fullTitle(),
            [MOCHA_ID_PROP_NAME$1]: this.parent.id
          },
          state: this.state,
          title: this.title,
          type: this.type,
          [MOCHA_ID_PROP_NAME$1]: this.id
        };
      }, "serialize");
      (function(module2, exports2) {
        const { EventEmitter: EventEmitter2 } = require$$0;
        const Hook2 = hook;
        var {
          assignNewMochaID,
          clamp,
          constants: utilsConstants,
          defineConstants,
          getMochaID,
          inherits: inherits2,
          isString: isString2
        } = utils$3;
        const debug2 = browser.exports("mocha:suite");
        const milliseconds2 = ms$1;
        const errors2 = errors$2;
        const { MOCHA_ID_PROP_NAME: MOCHA_ID_PROP_NAME2 } = utilsConstants;
        module2.exports = Suite2;
        Suite2.create = function(parent, title2) {
          var suite2 = new Suite2(title2, parent.ctx);
          suite2.parent = parent;
          title2 = suite2.fullTitle();
          parent.addSuite(suite2);
          return suite2;
        };
        function Suite2(title2, parentContext, isRoot) {
          if (!isString2(title2)) {
            throw errors2.createInvalidArgumentTypeError(
              'Suite argument "title" must be a string. Received type "' + typeof title2 + '"',
              "title",
              "string"
            );
          }
          this.title = title2;
          function Context2() {
          }
          __name(Context2, "Context");
          Context2.prototype = parentContext;
          this.ctx = new Context2();
          this.suites = [];
          this.tests = [];
          this.root = isRoot === true;
          this.pending = false;
          this._retries = -1;
          this._beforeEach = [];
          this._beforeAll = [];
          this._afterEach = [];
          this._afterAll = [];
          this._timeout = 2e3;
          this._slow = 75;
          this._bail = false;
          this._onlyTests = [];
          this._onlySuites = [];
          assignNewMochaID(this);
          Object.defineProperty(this, "id", {
            get() {
              return getMochaID(this);
            }
          });
          this.reset();
        }
        __name(Suite2, "Suite");
        inherits2(Suite2, EventEmitter2);
        Suite2.prototype.reset = function() {
          this.delayed = false;
          function doReset(thingToReset) {
            thingToReset.reset();
          }
          __name(doReset, "doReset");
          this.suites.forEach(doReset);
          this.tests.forEach(doReset);
          this._beforeEach.forEach(doReset);
          this._afterEach.forEach(doReset);
          this._beforeAll.forEach(doReset);
          this._afterAll.forEach(doReset);
        };
        Suite2.prototype.clone = function() {
          var suite2 = new Suite2(this.title);
          debug2("clone");
          suite2.ctx = this.ctx;
          suite2.root = this.root;
          suite2.timeout(this.timeout());
          suite2.retries(this.retries());
          suite2.slow(this.slow());
          suite2.bail(this.bail());
          return suite2;
        };
        Suite2.prototype.timeout = function(ms2) {
          if (!arguments.length) {
            return this._timeout;
          }
          if (typeof ms2 === "string") {
            ms2 = milliseconds2(ms2);
          }
          var INT_MAX = Math.pow(2, 31) - 1;
          var range = [0, INT_MAX];
          ms2 = clamp(ms2, range);
          debug2("timeout %d", ms2);
          this._timeout = parseInt(ms2, 10);
          return this;
        };
        Suite2.prototype.retries = function(n) {
          if (!arguments.length) {
            return this._retries;
          }
          debug2("retries %d", n);
          this._retries = parseInt(n, 10) || 0;
          return this;
        };
        Suite2.prototype.slow = function(ms2) {
          if (!arguments.length) {
            return this._slow;
          }
          if (typeof ms2 === "string") {
            ms2 = milliseconds2(ms2);
          }
          debug2("slow %d", ms2);
          this._slow = ms2;
          return this;
        };
        Suite2.prototype.bail = function(bail) {
          if (!arguments.length) {
            return this._bail;
          }
          debug2("bail %s", bail);
          this._bail = bail;
          return this;
        };
        Suite2.prototype.isPending = function() {
          return this.pending || this.parent && this.parent.isPending();
        };
        Suite2.prototype._createHook = function(title2, fn) {
          var hook2 = new Hook2(title2, fn);
          hook2.parent = this;
          hook2.timeout(this.timeout());
          hook2.retries(this.retries());
          hook2.slow(this.slow());
          hook2.ctx = this.ctx;
          hook2.file = this.file;
          return hook2;
        };
        Suite2.prototype.beforeAll = function(title2, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title2 === "function") {
            fn = title2;
            title2 = fn.name;
          }
          title2 = '"before all" hook' + (title2 ? ": " + title2 : "");
          var hook2 = this._createHook(title2, fn);
          this._beforeAll.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_BEFORE_ALL, hook2);
          return this;
        };
        Suite2.prototype.afterAll = function(title2, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title2 === "function") {
            fn = title2;
            title2 = fn.name;
          }
          title2 = '"after all" hook' + (title2 ? ": " + title2 : "");
          var hook2 = this._createHook(title2, fn);
          this._afterAll.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_AFTER_ALL, hook2);
          return this;
        };
        Suite2.prototype.beforeEach = function(title2, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title2 === "function") {
            fn = title2;
            title2 = fn.name;
          }
          title2 = '"before each" hook' + (title2 ? ": " + title2 : "");
          var hook2 = this._createHook(title2, fn);
          this._beforeEach.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_BEFORE_EACH, hook2);
          return this;
        };
        Suite2.prototype.afterEach = function(title2, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title2 === "function") {
            fn = title2;
            title2 = fn.name;
          }
          title2 = '"after each" hook' + (title2 ? ": " + title2 : "");
          var hook2 = this._createHook(title2, fn);
          this._afterEach.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_AFTER_EACH, hook2);
          return this;
        };
        Suite2.prototype.addSuite = function(suite2) {
          suite2.parent = this;
          suite2.root = false;
          suite2.timeout(this.timeout());
          suite2.retries(this.retries());
          suite2.slow(this.slow());
          suite2.bail(this.bail());
          this.suites.push(suite2);
          this.emit(constants2.EVENT_SUITE_ADD_SUITE, suite2);
          return this;
        };
        Suite2.prototype.addTest = function(test2) {
          test2.parent = this;
          test2.timeout(this.timeout());
          test2.retries(this.retries());
          test2.slow(this.slow());
          test2.ctx = this.ctx;
          this.tests.push(test2);
          this.emit(constants2.EVENT_SUITE_ADD_TEST, test2);
          return this;
        };
        Suite2.prototype.fullTitle = function() {
          return this.titlePath().join(" ");
        };
        Suite2.prototype.titlePath = function() {
          var result = [];
          if (this.parent) {
            result = result.concat(this.parent.titlePath());
          }
          if (!this.root) {
            result.push(this.title);
          }
          return result;
        };
        Suite2.prototype.total = function() {
          return this.suites.reduce(function(sum, suite2) {
            return sum + suite2.total();
          }, 0) + this.tests.length;
        };
        Suite2.prototype.eachTest = function(fn) {
          this.tests.forEach(fn);
          this.suites.forEach(function(suite2) {
            suite2.eachTest(fn);
          });
          return this;
        };
        Suite2.prototype.run = /* @__PURE__ */ __name(function run() {
          if (this.root) {
            this.emit(constants2.EVENT_ROOT_SUITE_RUN);
          }
        }, "run");
        Suite2.prototype.hasOnly = /* @__PURE__ */ __name(function hasOnly() {
          return this._onlyTests.length > 0 || this._onlySuites.length > 0 || this.suites.some(function(suite2) {
            return suite2.hasOnly();
          });
        }, "hasOnly");
        Suite2.prototype.filterOnly = /* @__PURE__ */ __name(function filterOnly() {
          if (this._onlyTests.length) {
            this.tests = this._onlyTests;
            this.suites = [];
          } else {
            this.tests = [];
            this._onlySuites.forEach(function(onlySuite) {
              if (onlySuite.hasOnly()) {
                onlySuite.filterOnly();
              }
            });
            var onlySuites = this._onlySuites;
            this.suites = this.suites.filter(function(childSuite) {
              return onlySuites.indexOf(childSuite) !== -1 || childSuite.filterOnly();
            });
          }
          return this.tests.length > 0 || this.suites.length > 0;
        }, "filterOnly");
        Suite2.prototype.appendOnlySuite = function(suite2) {
          this._onlySuites.push(suite2);
        };
        Suite2.prototype.markOnly = function() {
          this.parent && this.parent.appendOnlySuite(this);
        };
        Suite2.prototype.appendOnlyTest = function(test2) {
          this._onlyTests.push(test2);
        };
        Suite2.prototype.getHooks = /* @__PURE__ */ __name(function getHooks(name2) {
          return this["_" + name2];
        }, "getHooks");
        Suite2.prototype.dispose = function() {
          this.suites.forEach(function(suite2) {
            suite2.dispose();
          });
          this.cleanReferences();
        };
        Suite2.prototype.cleanReferences = /* @__PURE__ */ __name(function cleanReferences() {
          function cleanArrReferences(arr) {
            for (var i2 = 0; i2 < arr.length; i2++) {
              delete arr[i2].fn;
            }
          }
          __name(cleanArrReferences, "cleanArrReferences");
          if (Array.isArray(this._beforeAll)) {
            cleanArrReferences(this._beforeAll);
          }
          if (Array.isArray(this._beforeEach)) {
            cleanArrReferences(this._beforeEach);
          }
          if (Array.isArray(this._afterAll)) {
            cleanArrReferences(this._afterAll);
          }
          if (Array.isArray(this._afterEach)) {
            cleanArrReferences(this._afterEach);
          }
          for (var i = 0; i < this.tests.length; i++) {
            delete this.tests[i].fn;
          }
        }, "cleanReferences");
        Suite2.prototype.serialize = /* @__PURE__ */ __name(function serialize2() {
          return {
            _bail: this._bail,
            $$fullTitle: this.fullTitle(),
            $$isPending: Boolean(this.isPending()),
            root: this.root,
            title: this.title,
            [MOCHA_ID_PROP_NAME2]: this.id,
            parent: this.parent ? { [MOCHA_ID_PROP_NAME2]: this.parent.id } : null
          };
        }, "serialize");
        var constants2 = defineConstants(
          /**
           * {@link Suite}-related constants.
           * @public
           * @memberof Suite
           * @alias constants
           * @readonly
           * @static
           * @enum {string}
           */
          {
            /**
             * Event emitted after a test file has been loaded. Not emitted in browser.
             */
            EVENT_FILE_POST_REQUIRE: "post-require",
            /**
             * Event emitted before a test file has been loaded. In browser, this is emitted once an interface has been selected.
             */
            EVENT_FILE_PRE_REQUIRE: "pre-require",
            /**
             * Event emitted immediately after a test file has been loaded. Not emitted in browser.
             */
            EVENT_FILE_REQUIRE: "require",
            /**
             * Event emitted when `global.run()` is called (use with `delay` option).
             */
            EVENT_ROOT_SUITE_RUN: "run",
            /**
             * Namespace for collection of a `Suite`'s "after all" hooks.
             */
            HOOK_TYPE_AFTER_ALL: "afterAll",
            /**
             * Namespace for collection of a `Suite`'s "after each" hooks.
             */
            HOOK_TYPE_AFTER_EACH: "afterEach",
            /**
             * Namespace for collection of a `Suite`'s "before all" hooks.
             */
            HOOK_TYPE_BEFORE_ALL: "beforeAll",
            /**
             * Namespace for collection of a `Suite`'s "before each" hooks.
             */
            HOOK_TYPE_BEFORE_EACH: "beforeEach",
            /**
             * Emitted after a child `Suite` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_SUITE: "suite",
            /**
             * Emitted after an "after all" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_AFTER_ALL: "afterAll",
            /**
             * Emitted after an "after each" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_AFTER_EACH: "afterEach",
            /**
             * Emitted after an "before all" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_BEFORE_ALL: "beforeAll",
            /**
             * Emitted after an "before each" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_BEFORE_EACH: "beforeEach",
            /**
             * Emitted after a `Test` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_TEST: "test"
          }
        );
        Suite2.constants = constants2;
      })(suite);
      var EventEmitter = require$$0.EventEmitter;
      var Pending = pending;
      var utils$1 = utils$3;
      var debug = browser.exports("mocha:runner");
      var Runnable$1 = runnable;
      var Suite$2 = suite.exports;
      var HOOK_TYPE_BEFORE_EACH = Suite$2.constants.HOOK_TYPE_BEFORE_EACH;
      var HOOK_TYPE_AFTER_EACH = Suite$2.constants.HOOK_TYPE_AFTER_EACH;
      var HOOK_TYPE_AFTER_ALL = Suite$2.constants.HOOK_TYPE_AFTER_ALL;
      var HOOK_TYPE_BEFORE_ALL = Suite$2.constants.HOOK_TYPE_BEFORE_ALL;
      var EVENT_ROOT_SUITE_RUN = Suite$2.constants.EVENT_ROOT_SUITE_RUN;
      var STATE_FAILED = Runnable$1.constants.STATE_FAILED;
      var STATE_PASSED = Runnable$1.constants.STATE_PASSED;
      var STATE_PENDING = Runnable$1.constants.STATE_PENDING;
      var stackFilter = utils$1.stackTraceFilter();
      var stringify2 = utils$1.stringify;
      const {
        createInvalidExceptionError,
        createUnsupportedError: createUnsupportedError$1,
        createFatalError,
        isMochaError,
        constants: errorConstants
      } = errors$2;
      var globals = [
        "setTimeout",
        "clearTimeout",
        "setInterval",
        "clearInterval",
        "XMLHttpRequest",
        "Date",
        "setImmediate",
        "clearImmediate"
      ];
      var constants$1 = utils$1.defineConstants(
        /**
         * {@link Runner}-related constants.
         * @public
         * @memberof Runner
         * @readonly
         * @alias constants
         * @static
         * @enum {string}
         */
        {
          /**
           * Emitted when {@link Hook} execution begins
           */
          EVENT_HOOK_BEGIN: "hook",
          /**
           * Emitted when {@link Hook} execution ends
           */
          EVENT_HOOK_END: "hook end",
          /**
           * Emitted when Root {@link Suite} execution begins (all files have been parsed and hooks/tests are ready for execution)
           */
          EVENT_RUN_BEGIN: "start",
          /**
           * Emitted when Root {@link Suite} execution has been delayed via `delay` option
           */
          EVENT_DELAY_BEGIN: "waiting",
          /**
           * Emitted when delayed Root {@link Suite} execution is triggered by user via `global.run()`
           */
          EVENT_DELAY_END: "ready",
          /**
           * Emitted when Root {@link Suite} execution ends
           */
          EVENT_RUN_END: "end",
          /**
           * Emitted when {@link Suite} execution begins
           */
          EVENT_SUITE_BEGIN: "suite",
          /**
           * Emitted when {@link Suite} execution ends
           */
          EVENT_SUITE_END: "suite end",
          /**
           * Emitted when {@link Test} execution begins
           */
          EVENT_TEST_BEGIN: "test",
          /**
           * Emitted when {@link Test} execution ends
           */
          EVENT_TEST_END: "test end",
          /**
           * Emitted when {@link Test} execution fails
           */
          EVENT_TEST_FAIL: "fail",
          /**
           * Emitted when {@link Test} execution succeeds
           */
          EVENT_TEST_PASS: "pass",
          /**
           * Emitted when {@link Test} becomes pending
           */
          EVENT_TEST_PENDING: "pending",
          /**
           * Emitted when {@link Test} execution has failed, but will retry
           */
          EVENT_TEST_RETRY: "retry",
          /**
           * Initial state of Runner
           */
          STATE_IDLE: "idle",
          /**
           * State set to this value when the Runner has started running
           */
          STATE_RUNNING: "running",
          /**
           * State set to this value when the Runner has stopped
           */
          STATE_STOPPED: "stopped"
        }
      );
      class Runner extends EventEmitter {
        static {
          __name(this, "Runner");
        }
        /**
         * Initialize a `Runner` at the Root {@link Suite}, which represents a hierarchy of {@link Suite|Suites} and {@link Test|Tests}.
         *
         * @extends external:EventEmitter
         * @public
         * @class
         * @param {Suite} suite - Root suite
         * @param {Object} [opts] - Settings object
         * @param {boolean} [opts.cleanReferencesAfterRun] - Whether to clean references to test fns and hooks when a suite is done.
         * @param {boolean} [opts.delay] - Whether to delay execution of root suite until ready.
         * @param {boolean} [opts.dryRun] - Whether to report tests without running them.
         * @param {boolean} [opts.failZero] - Whether to fail test run if zero tests encountered.
         */
        constructor(suite2, opts = {}) {
          super();
          var self2 = this;
          this._globals = [];
          this._abort = false;
          this.suite = suite2;
          this._opts = opts;
          this.state = constants$1.STATE_IDLE;
          this.total = suite2.total();
          this.failures = 0;
          this._eventListeners = /* @__PURE__ */ new Map();
          this.on(constants$1.EVENT_TEST_END, function(test2) {
            if (test2.type === "test" && test2.retriedTest() && test2.parent) {
              var idx = test2.parent.tests && test2.parent.tests.indexOf(test2.retriedTest());
              if (idx > -1)
                test2.parent.tests[idx] = test2;
            }
            self2.checkGlobals(test2);
          });
          this.on(constants$1.EVENT_HOOK_END, function(hook2) {
            self2.checkGlobals(hook2);
          });
          this._defaultGrep = /.*/;
          this.grep(this._defaultGrep);
          this.globals(this.globalProps());
          this.uncaught = this._uncaught.bind(this);
          this.unhandled = (reason, promise) => {
            if (isMochaError(reason)) {
              debug(
                "trapped unhandled rejection coming out of Mocha; forwarding to uncaught handler:",
                reason
              );
              this.uncaught(reason);
            } else {
              debug(
                "trapped unhandled rejection from (probably) user code; re-emitting on process"
              );
              this._removeEventListener(
                process2,
                "unhandledRejection",
                this.unhandled
              );
              try {
                process2.emit("unhandledRejection", reason, promise);
              } finally {
                this._addEventListener(process2, "unhandledRejection", this.unhandled);
              }
            }
          };
        }
      }
      Runner.immediately = commonjsGlobal.setImmediate || nextTick$1;
      Runner.prototype._addEventListener = function(target, eventName, listener) {
        debug(
          "_addEventListener(): adding for event %s; %d current listeners",
          eventName,
          target.listenerCount(eventName)
        );
        if (this._eventListeners.has(target) && this._eventListeners.get(target).has(eventName) && this._eventListeners.get(target).get(eventName).has(listener)) {
          debug(
            "warning: tried to attach duplicate event listener for %s",
            eventName
          );
          return;
        }
        target.on(eventName, listener);
        const targetListeners = this._eventListeners.has(target) ? this._eventListeners.get(target) : /* @__PURE__ */ new Map();
        const targetEventListeners = targetListeners.has(eventName) ? targetListeners.get(eventName) : /* @__PURE__ */ new Set();
        targetEventListeners.add(listener);
        targetListeners.set(eventName, targetEventListeners);
        this._eventListeners.set(target, targetListeners);
      };
      Runner.prototype._removeEventListener = function(target, eventName, listener) {
        target.removeListener(eventName, listener);
        if (this._eventListeners.has(target)) {
          const targetListeners = this._eventListeners.get(target);
          if (targetListeners.has(eventName)) {
            const targetEventListeners = targetListeners.get(eventName);
            targetEventListeners.delete(listener);
            if (!targetEventListeners.size) {
              targetListeners.delete(eventName);
            }
          }
          if (!targetListeners.size) {
            this._eventListeners.delete(target);
          }
        } else {
          debug("trying to remove listener for untracked object %s", target);
        }
      };
      Runner.prototype.dispose = function() {
        this.removeAllListeners();
        this._eventListeners.forEach((targetListeners, target) => {
          targetListeners.forEach((targetEventListeners, eventName) => {
            targetEventListeners.forEach((listener) => {
              target.removeListener(eventName, listener);
            });
          });
        });
        this._eventListeners.clear();
      };
      Runner.prototype.grep = function(re, invert) {
        debug("grep(): setting to %s", re);
        this._grep = re;
        this._invert = invert;
        this.total = this.grepTotal(this.suite);
        return this;
      };
      Runner.prototype.grepTotal = function(suite2) {
        var self2 = this;
        var total = 0;
        suite2.eachTest(function(test2) {
          var match = self2._grep.test(test2.fullTitle());
          if (self2._invert) {
            match = !match;
          }
          if (match) {
            total++;
          }
        });
        return total;
      };
      Runner.prototype.globalProps = function() {
        var props = Object.keys(commonjsGlobal);
        for (var i = 0; i < globals.length; ++i) {
          if (~props.indexOf(globals[i])) {
            continue;
          }
          props.push(globals[i]);
        }
        return props;
      };
      Runner.prototype.globals = function(arr) {
        if (!arguments.length) {
          return this._globals;
        }
        debug("globals(): setting to %O", arr);
        this._globals = this._globals.concat(arr);
        return this;
      };
      Runner.prototype.checkGlobals = function(test2) {
        if (!this.checkLeaks) {
          return;
        }
        var ok = this._globals;
        var globals2 = this.globalProps();
        var leaks;
        if (test2) {
          ok = ok.concat(test2._allowedGlobals || []);
        }
        if (this.prevGlobalsLength === globals2.length) {
          return;
        }
        this.prevGlobalsLength = globals2.length;
        leaks = filterLeaks(ok, globals2);
        this._globals = this._globals.concat(leaks);
        if (leaks.length) {
          var msg = `global leak(s) detected: ${leaks.map((e) => `'${e}'`).join(", ")}`;
          this.fail(test2, new Error(msg));
        }
      };
      Runner.prototype.fail = function(test2, err, force) {
        force = force === true;
        if (test2.isPending() && !force) {
          return;
        }
        if (this.state === constants$1.STATE_STOPPED) {
          if (err.code === errorConstants.MULTIPLE_DONE) {
            throw err;
          }
          throw createFatalError(
            "Test failed after root suite execution completed!",
            err
          );
        }
        ++this.failures;
        debug("total number of failures: %d", this.failures);
        test2.state = STATE_FAILED;
        if (!isError(err)) {
          err = thrown2Error(err);
        }
        try {
          err.stack = this.fullStackTrace || !err.stack ? err.stack : stackFilter(err.stack);
        } catch (ignore) {
        }
        this.emit(constants$1.EVENT_TEST_FAIL, test2, err);
      };
      Runner.prototype.hook = function(name2, fn) {
        if (this._opts.dryRun)
          return fn();
        var suite2 = this.suite;
        var hooks = suite2.getHooks(name2);
        var self2 = this;
        function next2(i) {
          var hook2 = hooks[i];
          if (!hook2) {
            return fn();
          }
          self2.currentRunnable = hook2;
          if (name2 === HOOK_TYPE_BEFORE_ALL) {
            hook2.ctx.currentTest = hook2.parent.tests[0];
          } else if (name2 === HOOK_TYPE_AFTER_ALL) {
            hook2.ctx.currentTest = hook2.parent.tests[hook2.parent.tests.length - 1];
          } else {
            hook2.ctx.currentTest = self2.test;
          }
          setHookTitle(hook2);
          hook2.allowUncaught = self2.allowUncaught;
          self2.emit(constants$1.EVENT_HOOK_BEGIN, hook2);
          if (!hook2.listeners("error").length) {
            self2._addEventListener(hook2, "error", function(err) {
              self2.fail(hook2, err);
            });
          }
          hook2.run(/* @__PURE__ */ __name(function cbHookRun(err) {
            var testError = hook2.error();
            if (testError) {
              self2.fail(self2.test, testError);
            }
            if (hook2.pending) {
              if (name2 === HOOK_TYPE_AFTER_EACH) {
                if (self2.test) {
                  self2.test.pending = true;
                }
              } else if (name2 === HOOK_TYPE_BEFORE_EACH) {
                if (self2.test) {
                  self2.test.pending = true;
                }
                self2.emit(constants$1.EVENT_HOOK_END, hook2);
                hook2.pending = false;
                return fn(new Error("abort hookDown"));
              } else if (name2 === HOOK_TYPE_BEFORE_ALL) {
                suite2.tests.forEach(function(test2) {
                  test2.pending = true;
                });
                suite2.suites.forEach(function(suite3) {
                  suite3.pending = true;
                });
                hooks = [];
              } else {
                hook2.pending = false;
                var errForbid = createUnsupportedError$1("`this.skip` forbidden");
                self2.fail(hook2, errForbid);
                return fn(errForbid);
              }
            } else if (err) {
              self2.fail(hook2, err);
              return fn(err);
            }
            self2.emit(constants$1.EVENT_HOOK_END, hook2);
            delete hook2.ctx.currentTest;
            setHookTitle(hook2);
            next2(++i);
          }, "cbHookRun"));
          function setHookTitle(hook3) {
            hook3.originalTitle = hook3.originalTitle || hook3.title;
            if (hook3.ctx && hook3.ctx.currentTest) {
              hook3.title = `${hook3.originalTitle} for "${hook3.ctx.currentTest.title}"`;
            } else {
              var parentTitle;
              if (hook3.parent.title) {
                parentTitle = hook3.parent.title;
              } else {
                parentTitle = hook3.parent.root ? "{root}" : "";
              }
              hook3.title = `${hook3.originalTitle} in "${parentTitle}"`;
            }
          }
          __name(setHookTitle, "setHookTitle");
        }
        __name(next2, "next");
        Runner.immediately(function() {
          next2(0);
        });
      };
      Runner.prototype.hooks = function(name2, suites, fn) {
        var self2 = this;
        var orig = this.suite;
        function next2(suite2) {
          self2.suite = suite2;
          if (!suite2) {
            self2.suite = orig;
            return fn();
          }
          self2.hook(name2, function(err) {
            if (err) {
              var errSuite = self2.suite;
              self2.suite = orig;
              return fn(err, errSuite);
            }
            next2(suites.pop());
          });
        }
        __name(next2, "next");
        next2(suites.pop());
      };
      Runner.prototype.hookUp = function(name2, fn) {
        var suites = [this.suite].concat(this.parents()).reverse();
        this.hooks(name2, suites, fn);
      };
      Runner.prototype.hookDown = function(name2, fn) {
        var suites = [this.suite].concat(this.parents());
        this.hooks(name2, suites, fn);
      };
      Runner.prototype.parents = function() {
        var suite2 = this.suite;
        var suites = [];
        while (suite2.parent) {
          suite2 = suite2.parent;
          suites.push(suite2);
        }
        return suites;
      };
      Runner.prototype.runTest = function(fn) {
        if (this._opts.dryRun)
          return Runner.immediately(fn);
        var self2 = this;
        var test2 = this.test;
        if (!test2) {
          return;
        }
        if (this.asyncOnly) {
          test2.asyncOnly = true;
        }
        this._addEventListener(test2, "error", function(err) {
          self2.fail(test2, err);
        });
        if (this.allowUncaught) {
          test2.allowUncaught = true;
          return test2.run(fn);
        }
        try {
          test2.run(fn);
        } catch (err) {
          fn(err);
        }
      };
      Runner.prototype.runTests = function(suite2, fn) {
        var self2 = this;
        var tests = suite2.tests.slice();
        var test2;
        function hookErr(_, errSuite, after) {
          var orig = self2.suite;
          self2.suite = after ? errSuite.parent : errSuite;
          if (self2.suite) {
            self2.hookUp(HOOK_TYPE_AFTER_EACH, function(err2, errSuite2) {
              self2.suite = orig;
              if (err2) {
                return hookErr(err2, errSuite2, true);
              }
              fn(errSuite);
            });
          } else {
            self2.suite = orig;
            fn(errSuite);
          }
        }
        __name(hookErr, "hookErr");
        function next2(err, errSuite) {
          if (self2.failures && suite2._bail) {
            tests = [];
          }
          if (self2._abort) {
            return fn();
          }
          if (err) {
            return hookErr(err, errSuite, true);
          }
          test2 = tests.shift();
          if (!test2) {
            return fn();
          }
          var match = self2._grep.test(test2.fullTitle());
          if (self2._invert) {
            match = !match;
          }
          if (!match) {
            if (self2._grep !== self2._defaultGrep) {
              Runner.immediately(next2);
            } else {
              next2();
            }
            return;
          }
          if (test2.isPending()) {
            if (self2.forbidPending) {
              self2.fail(test2, new Error("Pending test forbidden"), true);
            } else {
              test2.state = STATE_PENDING;
              self2.emit(constants$1.EVENT_TEST_PENDING, test2);
            }
            self2.emit(constants$1.EVENT_TEST_END, test2);
            return next2();
          }
          self2.emit(constants$1.EVENT_TEST_BEGIN, self2.test = test2);
          self2.hookDown(HOOK_TYPE_BEFORE_EACH, function(err2, errSuite2) {
            if (test2.isPending()) {
              if (self2.forbidPending) {
                self2.fail(test2, new Error("Pending test forbidden"), true);
              } else {
                test2.state = STATE_PENDING;
                self2.emit(constants$1.EVENT_TEST_PENDING, test2);
              }
              self2.emit(constants$1.EVENT_TEST_END, test2);
              var origSuite = self2.suite;
              self2.suite = errSuite2 || self2.suite;
              return self2.hookUp(HOOK_TYPE_AFTER_EACH, function(e, eSuite) {
                self2.suite = origSuite;
                next2(e, eSuite);
              });
            }
            if (err2) {
              return hookErr(err2, errSuite2, false);
            }
            self2.currentRunnable = self2.test;
            self2.runTest(function(err3) {
              test2 = self2.test;
              if (test2.pending) {
                if (self2.forbidPending) {
                  self2.fail(test2, new Error("Pending test forbidden"), true);
                } else {
                  test2.state = STATE_PENDING;
                  self2.emit(constants$1.EVENT_TEST_PENDING, test2);
                }
                self2.emit(constants$1.EVENT_TEST_END, test2);
                return self2.hookUp(HOOK_TYPE_AFTER_EACH, next2);
              } else if (err3) {
                var retry = test2.currentRetry();
                if (retry < test2.retries()) {
                  var clonedTest = test2.clone();
                  clonedTest.currentRetry(retry + 1);
                  tests.unshift(clonedTest);
                  self2.emit(constants$1.EVENT_TEST_RETRY, test2, err3);
                  return self2.hookUp(HOOK_TYPE_AFTER_EACH, next2);
                } else {
                  self2.fail(test2, err3);
                }
                self2.emit(constants$1.EVENT_TEST_END, test2);
                return self2.hookUp(HOOK_TYPE_AFTER_EACH, next2);
              }
              test2.state = STATE_PASSED;
              self2.emit(constants$1.EVENT_TEST_PASS, test2);
              self2.emit(constants$1.EVENT_TEST_END, test2);
              self2.hookUp(HOOK_TYPE_AFTER_EACH, next2);
            });
          });
        }
        __name(next2, "next");
        this.next = next2;
        this.hookErr = hookErr;
        next2();
      };
      Runner.prototype.runSuite = function(suite2, fn) {
        var i = 0;
        var self2 = this;
        var total = this.grepTotal(suite2);
        debug("runSuite(): running %s", suite2.fullTitle());
        if (!total || self2.failures && suite2._bail) {
          debug("runSuite(): bailing");
          return fn();
        }
        this.emit(constants$1.EVENT_SUITE_BEGIN, this.suite = suite2);
        function next2(errSuite) {
          if (errSuite) {
            if (errSuite === suite2) {
              return done2();
            }
            return done2(errSuite);
          }
          if (self2._abort) {
            return done2();
          }
          var curr = suite2.suites[i++];
          if (!curr) {
            return done2();
          }
          if (self2._grep !== self2._defaultGrep) {
            Runner.immediately(function() {
              self2.runSuite(curr, next2);
            });
          } else {
            self2.runSuite(curr, next2);
          }
        }
        __name(next2, "next");
        function done2(errSuite) {
          self2.suite = suite2;
          self2.nextSuite = next2;
          delete self2.test;
          self2.hook(HOOK_TYPE_AFTER_ALL, function() {
            self2.emit(constants$1.EVENT_SUITE_END, suite2);
            fn(errSuite);
          });
        }
        __name(done2, "done");
        this.nextSuite = next2;
        this.hook(HOOK_TYPE_BEFORE_ALL, function(err) {
          if (err) {
            return done2();
          }
          self2.runTests(suite2, next2);
        });
      };
      Runner.prototype._uncaught = function(err) {
        if (!(this instanceof Runner)) {
          throw createFatalError(
            "Runner#uncaught() called with invalid context",
            this
          );
        }
        if (err instanceof Pending) {
          debug("uncaught(): caught a Pending");
          return;
        }
        if (this.allowUncaught && !utils$1.isBrowser()) {
          debug("uncaught(): bubbling exception due to --allow-uncaught");
          throw err;
        }
        if (this.state === constants$1.STATE_STOPPED) {
          debug("uncaught(): throwing after run has completed!");
          throw err;
        }
        if (err) {
          debug("uncaught(): got truthy exception %O", err);
        } else {
          debug("uncaught(): undefined/falsy exception");
          err = createInvalidExceptionError(
            "Caught falsy/undefined exception which would otherwise be uncaught. No stack trace found; try a debugger",
            err
          );
        }
        if (!isError(err)) {
          err = thrown2Error(err);
          debug('uncaught(): converted "error" %o to Error', err);
        }
        err.uncaught = true;
        var runnable2 = this.currentRunnable;
        if (!runnable2) {
          runnable2 = new Runnable$1("Uncaught error outside test suite");
          debug("uncaught(): no current Runnable; created a phony one");
          runnable2.parent = this.suite;
          if (this.state === constants$1.STATE_RUNNING) {
            debug("uncaught(): failing gracefully");
            this.fail(runnable2, err);
          } else {
            debug("uncaught(): test run has not yet started; unrecoverable");
            this.emit(constants$1.EVENT_RUN_BEGIN);
            this.fail(runnable2, err);
            this.emit(constants$1.EVENT_RUN_END);
          }
          return;
        }
        runnable2.clearTimeout();
        if (runnable2.isFailed()) {
          debug("uncaught(): Runnable has already failed");
          return;
        } else if (runnable2.isPending()) {
          debug("uncaught(): pending Runnable wound up failing!");
          this.fail(runnable2, err, true);
          return;
        }
        if (runnable2.isPassed()) {
          debug("uncaught(): Runnable has already passed; bailing gracefully");
          this.fail(runnable2, err);
          this.abort();
        } else {
          debug("uncaught(): forcing Runnable to complete with Error");
          return runnable2.callback(err);
        }
      };
      Runner.prototype.run = function(fn, opts = {}) {
        var rootSuite = this.suite;
        var options = opts.options || {};
        debug("run(): got options: %O", options);
        fn = fn || function() {
        };
        const end = /* @__PURE__ */ __name(() => {
          if (!this.total && this._opts.failZero)
            this.failures = 1;
          debug("run(): root suite completed; emitting %s", constants$1.EVENT_RUN_END);
          this.emit(constants$1.EVENT_RUN_END);
        }, "end");
        const begin = /* @__PURE__ */ __name(() => {
          debug("run(): emitting %s", constants$1.EVENT_RUN_BEGIN);
          this.emit(constants$1.EVENT_RUN_BEGIN);
          debug("run(): emitted %s", constants$1.EVENT_RUN_BEGIN);
          this.runSuite(rootSuite, end);
        }, "begin");
        const prepare = /* @__PURE__ */ __name(() => {
          debug("run(): starting");
          if (rootSuite.hasOnly()) {
            rootSuite.filterOnly();
            debug("run(): filtered exclusive Runnables");
          }
          this.state = constants$1.STATE_RUNNING;
          if (this._opts.delay) {
            this.emit(constants$1.EVENT_DELAY_END);
            debug('run(): "delay" ended');
          }
          return begin();
        }, "prepare");
        if (this._opts.cleanReferencesAfterRun) {
          this.on(constants$1.EVENT_SUITE_END, (suite2) => {
            suite2.cleanReferences();
          });
        }
        this.on(constants$1.EVENT_RUN_END, function() {
          this.state = constants$1.STATE_STOPPED;
          debug("run(): emitted %s", constants$1.EVENT_RUN_END);
          fn(this.failures);
        });
        this._removeEventListener(process2, "uncaughtException", this.uncaught);
        this._removeEventListener(process2, "unhandledRejection", this.unhandled);
        this._addEventListener(process2, "uncaughtException", this.uncaught);
        this._addEventListener(process2, "unhandledRejection", this.unhandled);
        if (this._opts.delay) {
          this.emit(constants$1.EVENT_DELAY_BEGIN, rootSuite);
          rootSuite.once(EVENT_ROOT_SUITE_RUN, prepare);
          debug("run(): waiting for green light due to --delay");
        } else {
          Runner.immediately(prepare);
        }
        return this;
      };
      Runner.prototype.linkPartialObjects = function(value) {
        return this;
      };
      Runner.prototype.runAsync = /* @__PURE__ */ __name(async function runAsync(opts = {}) {
        return new Promise((resolve2) => {
          this.run(resolve2, opts);
        });
      }, "runAsync");
      Runner.prototype.abort = function() {
        debug("abort(): aborting");
        this._abort = true;
        return this;
      };
      Runner.prototype.isParallelMode = /* @__PURE__ */ __name(function isParallelMode() {
        return false;
      }, "isParallelMode");
      Runner.prototype.workerReporter = function() {
        throw createUnsupportedError$1("workerReporter() not supported in serial mode");
      };
      function filterLeaks(ok, globals2) {
        return globals2.filter(function(key) {
          if (/^\d+/.test(key)) {
            return false;
          }
          if (commonjsGlobal.navigator && /^getInterface/.test(key)) {
            return false;
          }
          if (commonjsGlobal.navigator && /^\d+/.test(key)) {
            return false;
          }
          if (/^mocha-/.test(key)) {
            return false;
          }
          var matched = ok.filter(function(ok2) {
            if (~ok2.indexOf("*")) {
              return key.indexOf(ok2.split("*")[0]) === 0;
            }
            return key === ok2;
          });
          return !matched.length && (!commonjsGlobal.navigator || key !== "onerror");
        });
      }
      __name(filterLeaks, "filterLeaks");
      function isError(err) {
        return err instanceof Error || err && typeof err.message === "string";
      }
      __name(isError, "isError");
      function thrown2Error(err) {
        return new Error(
          `the ${utils$1.canonicalType(err)} ${stringify2(
            err
          )} was thrown, throw an Error :)`
        );
      }
      __name(thrown2Error, "thrown2Error");
      Runner.constants = constants$1;
      var runner = Runner;
      (function(module2, exports2) {
        var diff2 = lib;
        var milliseconds2 = ms$1;
        var utils2 = utils$3;
        var supportsColor = require$$18;
        var symbols = browser$1;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        const isBrowser = utils2.isBrowser();
        function getBrowserWindowSize() {
          if ("innerHeight" in commonjsGlobal) {
            return [commonjsGlobal.innerHeight, commonjsGlobal.innerWidth];
          }
          return [640, 480];
        }
        __name(getBrowserWindowSize, "getBrowserWindowSize");
        exports2 = module2.exports = Base;
        var isatty = isBrowser || process2.stdout.isTTY && process2.stderr.isTTY;
        var consoleLog = console.log;
        exports2.useColors = !isBrowser && (supportsColor.stdout || process2.env.MOCHA_COLORS !== void 0);
        exports2.inlineDiffs = false;
        exports2.maxDiffSize = 8192;
        exports2.colors = {
          pass: 90,
          fail: 31,
          "bright pass": 92,
          "bright fail": 91,
          "bright yellow": 93,
          pending: 36,
          suite: 0,
          "error title": 0,
          "error message": 31,
          "error stack": 90,
          checkmark: 32,
          fast: 90,
          medium: 33,
          slow: 31,
          green: 32,
          light: 90,
          "diff gutter": 90,
          "diff added": 32,
          "diff removed": 31,
          "diff added inline": "30;42",
          "diff removed inline": "30;41"
        };
        exports2.symbols = {
          ok: symbols.success,
          err: symbols.error,
          dot: ".",
          comma: ",",
          bang: "!"
        };
        var color = exports2.color = function(type, str) {
          if (!exports2.useColors) {
            return String(str);
          }
          return "\x1B[" + exports2.colors[type] + "m" + str + "\x1B[0m";
        };
        exports2.window = {
          width: 75
        };
        if (isatty) {
          if (isBrowser) {
            exports2.window.width = getBrowserWindowSize()[1];
          } else {
            exports2.window.width = process2.stdout.getWindowSize(1)[0];
          }
        }
        exports2.cursor = {
          hide: function() {
            isatty && process2.stdout.write("\x1B[?25l");
          },
          show: function() {
            isatty && process2.stdout.write("\x1B[?25h");
          },
          deleteLine: function() {
            isatty && process2.stdout.write("\x1B[2K");
          },
          beginningOfLine: function() {
            isatty && process2.stdout.write("\x1B[0G");
          },
          CR: function() {
            if (isatty) {
              exports2.cursor.deleteLine();
              exports2.cursor.beginningOfLine();
            } else {
              process2.stdout.write("\r");
            }
          }
        };
        var showDiff = exports2.showDiff = function(err) {
          return err && err.showDiff !== false && sameType(err.actual, err.expected) && err.expected !== void 0;
        };
        function stringifyDiffObjs(err) {
          if (!utils2.isString(err.actual) || !utils2.isString(err.expected)) {
            err.actual = utils2.stringify(err.actual);
            err.expected = utils2.stringify(err.expected);
          }
        }
        __name(stringifyDiffObjs, "stringifyDiffObjs");
        var generateDiff = exports2.generateDiff = function(actual, expected) {
          try {
            var maxLen = exports2.maxDiffSize;
            var skipped = 0;
            if (maxLen > 0) {
              skipped = Math.max(actual.length - maxLen, expected.length - maxLen);
              actual = actual.slice(0, maxLen);
              expected = expected.slice(0, maxLen);
            }
            let result = exports2.inlineDiffs ? inlineDiff(actual, expected) : unifiedDiff(actual, expected);
            if (skipped > 0) {
              result = `${result}
      [mocha] output truncated to ${maxLen} characters, see "maxDiffSize" reporter-option
`;
            }
            return result;
          } catch (err) {
            var msg = "\n      " + color("diff added", "+ expected") + " " + color("diff removed", "- actual:  failed to generate Mocha diff") + "\n";
            return msg;
          }
        };
        exports2.list = function(failures) {
          var multipleErr, multipleTest;
          Base.consoleLog();
          failures.forEach(function(test2, i) {
            var fmt = color("error title", "  %s) %s:\n") + color("error message", "     %s") + color("error stack", "\n%s\n");
            var msg;
            var err;
            if (test2.err && test2.err.multiple) {
              if (multipleTest !== test2) {
                multipleTest = test2;
                multipleErr = [test2.err].concat(test2.err.multiple);
              }
              err = multipleErr.shift();
            } else {
              err = test2.err;
            }
            var message;
            if (typeof err.inspect === "function") {
              message = err.inspect() + "";
            } else if (err.message && typeof err.message.toString === "function") {
              message = err.message + "";
            } else {
              message = "";
            }
            var stack = err.stack || message;
            var index = message ? stack.indexOf(message) : -1;
            if (index === -1) {
              msg = message;
            } else {
              index += message.length;
              msg = stack.slice(0, index);
              stack = stack.slice(index + 1);
            }
            if (err.uncaught) {
              msg = "Uncaught " + msg;
            }
            if (!exports2.hideDiff && showDiff(err)) {
              stringifyDiffObjs(err);
              fmt = color("error title", "  %s) %s:\n%s") + color("error stack", "\n%s\n");
              var match = message.match(/^([^:]+): expected/);
              msg = "\n      " + color("error message", match ? match[1] : msg);
              msg += generateDiff(err.actual, err.expected);
            }
            stack = stack.replace(/^/gm, "  ");
            var testTitle = "";
            test2.titlePath().forEach(function(str, index2) {
              if (index2 !== 0) {
                testTitle += "\n     ";
              }
              for (var i2 = 0; i2 < index2; i2++) {
                testTitle += "  ";
              }
              testTitle += str;
            });
            Base.consoleLog(fmt, i + 1, testTitle, msg, stack);
          });
        };
        function Base(runner2, options) {
          var failures = this.failures = [];
          if (!runner2) {
            throw new TypeError("Missing runner argument");
          }
          this.options = options || {};
          this.runner = runner2;
          this.stats = runner2.stats;
          var maxDiffSizeOpt = this.options.reporterOption && this.options.reporterOption.maxDiffSize;
          if (maxDiffSizeOpt !== void 0 && !isNaN(Number(maxDiffSizeOpt))) {
            exports2.maxDiffSize = Number(maxDiffSizeOpt);
          }
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            if (test2.duration > test2.slow()) {
              test2.speed = "slow";
            } else if (test2.duration > test2.slow() / 2) {
              test2.speed = "medium";
            } else {
              test2.speed = "fast";
            }
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2, err) {
            if (showDiff(err)) {
              stringifyDiffObjs(err);
            }
            if (test2.err && err instanceof Error) {
              test2.err.multiple = (test2.err.multiple || []).concat(err);
            } else {
              test2.err = err;
            }
            failures.push(test2);
          });
        }
        __name(Base, "Base");
        Base.prototype.epilogue = function() {
          var stats = this.stats;
          var fmt;
          Base.consoleLog();
          fmt = color("bright pass", " ") + color("green", " %d passing") + color("light", " (%s)");
          Base.consoleLog(fmt, stats.passes || 0, milliseconds2(stats.duration));
          if (stats.pending) {
            fmt = color("pending", " ") + color("pending", " %d pending");
            Base.consoleLog(fmt, stats.pending);
          }
          if (stats.failures) {
            fmt = color("fail", "  %d failing");
            Base.consoleLog(fmt, stats.failures);
            Base.list(this.failures);
            Base.consoleLog();
          }
          Base.consoleLog();
        };
        function pad2(str, len) {
          str = String(str);
          return Array(len - str.length + 1).join(" ") + str;
        }
        __name(pad2, "pad");
        function inlineDiff(actual, expected) {
          var msg = errorDiff(actual, expected);
          var lines = msg.split("\n");
          if (lines.length > 4) {
            var width = String(lines.length).length;
            msg = lines.map(function(str, i) {
              return pad2(++i, width) + " | " + str;
            }).join("\n");
          }
          msg = "\n" + color("diff removed inline", "actual") + " " + color("diff added inline", "expected") + "\n\n" + msg + "\n";
          msg = msg.replace(/^/gm, "      ");
          return msg;
        }
        __name(inlineDiff, "inlineDiff");
        function unifiedDiff(actual, expected) {
          var indent = "      ";
          function cleanUp(line3) {
            if (line3[0] === "+") {
              return indent + colorLines("diff added", line3);
            }
            if (line3[0] === "-") {
              return indent + colorLines("diff removed", line3);
            }
            if (line3.match(/@@/)) {
              return "--";
            }
            if (line3.match(/\\ No newline/)) {
              return null;
            }
            return indent + line3;
          }
          __name(cleanUp, "cleanUp");
          function notBlank(line3) {
            return typeof line3 !== "undefined" && line3 !== null;
          }
          __name(notBlank, "notBlank");
          var msg = diff2.createPatch("string", actual, expected);
          var lines = msg.split("\n").splice(5);
          return "\n      " + colorLines("diff added", "+ expected") + " " + colorLines("diff removed", "- actual") + "\n\n" + lines.map(cleanUp).filter(notBlank).join("\n");
        }
        __name(unifiedDiff, "unifiedDiff");
        function errorDiff(actual, expected) {
          return diff2.diffWordsWithSpace(actual, expected).map(function(str) {
            if (str.added) {
              return colorLines("diff added inline", str.value);
            }
            if (str.removed) {
              return colorLines("diff removed inline", str.value);
            }
            return str.value;
          }).join("");
        }
        __name(errorDiff, "errorDiff");
        function colorLines(name2, str) {
          return str.split("\n").map(function(str2) {
            return color(name2, str2);
          }).join("\n");
        }
        __name(colorLines, "colorLines");
        var objToString = Object.prototype.toString;
        function sameType(a, b) {
          return objToString.call(a) === objToString.call(b);
        }
        __name(sameType, "sameType");
        Base.consoleLog = consoleLog;
        Base.abstract = true;
      })(base$1, base$1.exports);
      var dot = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        module2.exports = Dot;
        function Dot(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.75 | 0;
          var n = -1;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            process2.stdout.write("\n");
          });
          runner2.on(EVENT_TEST_PENDING2, function() {
            if (++n % width === 0) {
              process2.stdout.write("\n  ");
            }
            process2.stdout.write(Base.color("pending", Base.symbols.comma));
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            if (++n % width === 0) {
              process2.stdout.write("\n  ");
            }
            if (test2.speed === "slow") {
              process2.stdout.write(Base.color("bright yellow", Base.symbols.dot));
            } else {
              process2.stdout.write(Base.color(test2.speed, Base.symbols.dot));
            }
          });
          runner2.on(EVENT_TEST_FAIL2, function() {
            if (++n % width === 0) {
              process2.stdout.write("\n  ");
            }
            process2.stdout.write(Base.color("fail", Base.symbols.bang));
          });
          runner2.once(EVENT_RUN_END2, function() {
            process2.stdout.write("\n");
            self2.epilogue();
          });
        }
        __name(Dot, "Dot");
        inherits2(Dot, Base);
        Dot.description = "dot matrix representation";
      })(dot);
      var doc = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        module2.exports = Doc;
        function Doc(runner2, options) {
          Base.call(this, runner2, options);
          var indents = 2;
          function indent() {
            return Array(indents).join("  ");
          }
          __name(indent, "indent");
          runner2.on(EVENT_SUITE_BEGIN2, function(suite2) {
            if (suite2.root) {
              return;
            }
            ++indents;
            Base.consoleLog('%s<section class="suite">', indent());
            ++indents;
            Base.consoleLog("%s<h1>%s</h1>", indent(), utils2.escape(suite2.title));
            Base.consoleLog("%s<dl>", indent());
          });
          runner2.on(EVENT_SUITE_END, function(suite2) {
            if (suite2.root) {
              return;
            }
            Base.consoleLog("%s</dl>", indent());
            --indents;
            Base.consoleLog("%s</section>", indent());
            --indents;
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            Base.consoleLog("%s  <dt>%s</dt>", indent(), utils2.escape(test2.title));
            Base.consoleLog("%s  <dt>%s</dt>", indent(), utils2.escape(test2.file));
            var code = utils2.escape(utils2.clean(test2.body));
            Base.consoleLog("%s  <dd><pre><code>%s</code></pre></dd>", indent(), code);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2, err) {
            Base.consoleLog(
              '%s  <dt class="error">%s</dt>',
              indent(),
              utils2.escape(test2.title)
            );
            Base.consoleLog(
              '%s  <dt class="error">%s</dt>',
              indent(),
              utils2.escape(test2.file)
            );
            var code = utils2.escape(utils2.clean(test2.body));
            Base.consoleLog(
              '%s  <dd class="error"><pre><code>%s</code></pre></dd>',
              indent(),
              code
            );
            Base.consoleLog(
              '%s  <dd class="error">%s</dd>',
              indent(),
              utils2.escape(err)
            );
          });
        }
        __name(Doc, "Doc");
        Doc.description = "HTML documentation";
      })(doc);
      var tap = { exports: {} };
      (function(module2, exports2) {
        var util2 = require$$0$1;
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var inherits2 = utils$3.inherits;
        var sprintf = util2.format;
        module2.exports = TAP;
        function TAP(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var n = 1;
          var tapVersion = "12";
          if (options && options.reporterOptions) {
            if (options.reporterOptions.tapVersion) {
              tapVersion = options.reporterOptions.tapVersion.toString();
            }
          }
          this._producer = createProducer(tapVersion);
          runner2.once(EVENT_RUN_BEGIN2, function() {
            self2._producer.writeVersion();
          });
          runner2.on(EVENT_TEST_END2, function() {
            ++n;
          });
          runner2.on(EVENT_TEST_PENDING2, function(test2) {
            self2._producer.writePending(n, test2);
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            self2._producer.writePass(n, test2);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2, err) {
            self2._producer.writeFail(n, test2, err);
          });
          runner2.once(EVENT_RUN_END2, function() {
            self2._producer.writeEpilogue(runner2.stats);
          });
        }
        __name(TAP, "TAP");
        inherits2(TAP, Base);
        function title2(test2) {
          return test2.fullTitle().replace(/#/g, "");
        }
        __name(title2, "title");
        function println(format2, varArgs) {
          var vargs = Array.from(arguments);
          vargs[0] += "\n";
          process2.stdout.write(sprintf.apply(null, vargs));
        }
        __name(println, "println");
        function createProducer(tapVersion) {
          var producers = {
            12: new TAP12Producer(),
            13: new TAP13Producer()
          };
          var producer = producers[tapVersion];
          if (!producer) {
            throw new Error(
              "invalid or unsupported TAP version: " + JSON.stringify(tapVersion)
            );
          }
          return producer;
        }
        __name(createProducer, "createProducer");
        function TAPProducer() {
        }
        __name(TAPProducer, "TAPProducer");
        TAPProducer.prototype.writeVersion = function() {
        };
        TAPProducer.prototype.writePlan = function(ntests) {
          println("%d..%d", 1, ntests);
        };
        TAPProducer.prototype.writePass = function(n, test2) {
          println("ok %d %s", n, title2(test2));
        };
        TAPProducer.prototype.writePending = function(n, test2) {
          println("ok %d %s # SKIP -", n, title2(test2));
        };
        TAPProducer.prototype.writeFail = function(n, test2, err) {
          println("not ok %d %s", n, title2(test2));
        };
        TAPProducer.prototype.writeEpilogue = function(stats) {
          println("# tests " + (stats.passes + stats.failures));
          println("# pass " + stats.passes);
          println("# fail " + stats.failures);
          this.writePlan(stats.passes + stats.failures + stats.pending);
        };
        function TAP12Producer() {
          this.writeFail = function(n, test2, err) {
            TAPProducer.prototype.writeFail.call(this, n, test2, err);
            if (err.message) {
              println(err.message.replace(/^/gm, "  "));
            }
            if (err.stack) {
              println(err.stack.replace(/^/gm, "  "));
            }
          };
        }
        __name(TAP12Producer, "TAP12Producer");
        inherits2(TAP12Producer, TAPProducer);
        function TAP13Producer() {
          this.writeVersion = function() {
            println("TAP version 13");
          };
          this.writeFail = function(n, test2, err) {
            TAPProducer.prototype.writeFail.call(this, n, test2, err);
            var emitYamlBlock = err.message != null || err.stack != null;
            if (emitYamlBlock) {
              println(indent(1) + "---");
              if (err.message) {
                println(indent(2) + "message: |-");
                println(err.message.replace(/^/gm, indent(3)));
              }
              if (err.stack) {
                println(indent(2) + "stack: |-");
                println(err.stack.replace(/^/gm, indent(3)));
              }
              println(indent(1) + "...");
            }
          };
          function indent(level) {
            return Array(level + 1).join("  ");
          }
          __name(indent, "indent");
        }
        __name(TAP13Producer, "TAP13Producer");
        inherits2(TAP13Producer, TAPProducer);
        TAP.description = "TAP-compatible output";
      })(tap);
      var json = { exports: {} };
      var _polyfillNode_fs = {};
      var _polyfillNode_fs$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": _polyfillNode_fs
      });
      var require$$2 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_fs$1);
      (function(module2, exports2) {
        var Base = base$1.exports;
        var fs = require$$2;
        var path = require$$1;
        const createUnsupportedError2 = errors$2.createUnsupportedError;
        const utils2 = utils$3;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        module2.exports = JSONReporter;
        function JSONReporter(runner2, options = {}) {
          Base.call(this, runner2, options);
          var self2 = this;
          var tests = [];
          var pending2 = [];
          var failures = [];
          var passes = [];
          var output;
          if (options.reporterOption && options.reporterOption.output) {
            if (utils2.isBrowser()) {
              throw createUnsupportedError2("file output not supported in browser");
            }
            output = options.reporterOption.output;
          }
          runner2.on(EVENT_TEST_END2, function(test2) {
            tests.push(test2);
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            passes.push(test2);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2) {
            failures.push(test2);
          });
          runner2.on(EVENT_TEST_PENDING2, function(test2) {
            pending2.push(test2);
          });
          runner2.once(EVENT_RUN_END2, function() {
            var obj = {
              stats: self2.stats,
              tests: tests.map(clean),
              pending: pending2.map(clean),
              failures: failures.map(clean),
              passes: passes.map(clean)
            };
            runner2.testResults = obj;
            var json2 = JSON.stringify(obj, null, 2);
            if (output) {
              try {
                fs.mkdirSync(path.dirname(output), { recursive: true });
                fs.writeFileSync(output, json2);
              } catch (err) {
                console.error(
                  `${Base.symbols.err} [mocha] writing output to "${output}" failed: ${err.message}
`
                );
                process2.stdout.write(json2);
              }
            } else {
              process2.stdout.write(json2);
            }
          });
        }
        __name(JSONReporter, "JSONReporter");
        function clean(test2) {
          var err = test2.err || {};
          if (err instanceof Error) {
            err = errorJSON(err);
          }
          return {
            title: test2.title,
            fullTitle: test2.fullTitle(),
            file: test2.file,
            duration: test2.duration,
            currentRetry: test2.currentRetry(),
            speed: test2.speed,
            err: cleanCycles(err)
          };
        }
        __name(clean, "clean");
        function cleanCycles(obj) {
          var cache = [];
          return JSON.parse(
            JSON.stringify(obj, function(key, value) {
              if (typeof value === "object" && value !== null) {
                if (cache.indexOf(value) !== -1) {
                  return "" + value;
                }
                cache.push(value);
              }
              return value;
            })
          );
        }
        __name(cleanCycles, "cleanCycles");
        function errorJSON(err) {
          var res = {};
          Object.getOwnPropertyNames(err).forEach(function(key) {
            res[key] = err[key];
          }, err);
          return res;
        }
        __name(errorJSON, "errorJSON");
        JSONReporter.description = "single JSON object";
      })(json);
      var html = { exports: {} };
      var progress$1 = Progress;
      function Progress() {
        this.percent = 0;
        this.size(0);
        this.fontSize(11);
        this.font("helvetica, arial, sans-serif");
      }
      __name(Progress, "Progress");
      Progress.prototype.size = function(size) {
        this._size = size;
        return this;
      };
      Progress.prototype.text = function(text) {
        this._text = text;
        return this;
      };
      Progress.prototype.fontSize = function(size) {
        this._fontSize = size;
        return this;
      };
      Progress.prototype.font = function(family) {
        this._font = family;
        return this;
      };
      Progress.prototype.update = function(n) {
        this.percent = n;
        return this;
      };
      Progress.prototype.draw = function(ctx) {
        try {
          var darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
          var isDarkMode = !!darkMatcher.matches;
          var lightColors = {
            outerCircle: "#9f9f9f",
            innerCircle: "#eee",
            text: "#000"
          };
          var darkColors = {
            outerCircle: "#888",
            innerCircle: "#444",
            text: "#fff"
          };
          var colors = isDarkMode ? darkColors : lightColors;
          var percent = Math.min(this.percent, 100);
          var size = this._size;
          var half = size / 2;
          var x = half;
          var y2 = half;
          var rad = half - 1;
          var fontSize = this._fontSize;
          ctx.font = fontSize + "px " + this._font;
          var angle = Math.PI * 2 * (percent / 100);
          ctx.clearRect(0, 0, size, size);
          ctx.strokeStyle = colors.outerCircle;
          ctx.beginPath();
          ctx.arc(x, y2, rad, 0, angle, false);
          ctx.stroke();
          ctx.strokeStyle = colors.innerCircle;
          ctx.beginPath();
          ctx.arc(x, y2, rad - 1, 0, angle, true);
          ctx.stroke();
          var text = this._text || (percent | 0) + "%";
          var w2 = ctx.measureText(text).width;
          ctx.fillStyle = colors.text;
          ctx.fillText(text, x - w2 / 2 + 1, y2 + fontSize / 2 - 1);
        } catch (ignore) {
        }
        return this;
      };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var Progress2 = progress$1;
        var escapeRe = escapeStringRegexp;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var escape = utils2.escape;
        var Date2 = commonjsGlobal.Date;
        module2.exports = HTML;
        var statsTemplate = '<ul id="mocha-stats"><li class="progress"><canvas width="40" height="40"></canvas></li><li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li><li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li><li class="duration">duration: <em>0</em>s</li></ul>';
        var playIcon = "&#x2023;";
        function HTML(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var stats = this.stats;
          var stat = fragment(statsTemplate);
          var items = stat.getElementsByTagName("li");
          var passes = items[1].getElementsByTagName("em")[0];
          var passesLink = items[1].getElementsByTagName("a")[0];
          var failures = items[2].getElementsByTagName("em")[0];
          var failuresLink = items[2].getElementsByTagName("a")[0];
          var duration = items[3].getElementsByTagName("em")[0];
          var canvas = stat.getElementsByTagName("canvas")[0];
          var report = fragment('<ul id="mocha-report"></ul>');
          var stack = [report];
          var progress2;
          var ctx;
          var root = document.getElementById("mocha");
          if (canvas.getContext) {
            var ratio = window.devicePixelRatio || 1;
            canvas.style.width = canvas.width;
            canvas.style.height = canvas.height;
            canvas.width *= ratio;
            canvas.height *= ratio;
            ctx = canvas.getContext("2d");
            ctx.scale(ratio, ratio);
            progress2 = new Progress2();
          }
          if (!root) {
            return error("#mocha div missing, add it to your document");
          }
          on2(passesLink, "click", function(evt) {
            evt.preventDefault();
            unhide();
            var name2 = /pass/.test(report.className) ? "" : " pass";
            report.className = report.className.replace(/fail|pass/g, "") + name2;
            if (report.className.trim()) {
              hideSuitesWithout("test pass");
            }
          });
          on2(failuresLink, "click", function(evt) {
            evt.preventDefault();
            unhide();
            var name2 = /fail/.test(report.className) ? "" : " fail";
            report.className = report.className.replace(/fail|pass/g, "") + name2;
            if (report.className.trim()) {
              hideSuitesWithout("test fail");
            }
          });
          root.appendChild(stat);
          root.appendChild(report);
          if (progress2) {
            progress2.size(40);
          }
          runner2.on(EVENT_SUITE_BEGIN2, function(suite2) {
            if (suite2.root) {
              return;
            }
            var url = self2.suiteURL(suite2);
            var el = fragment(
              '<li class="suite"><h1><a href="%s">%s</a></h1></li>',
              url,
              escape(suite2.title)
            );
            stack[0].appendChild(el);
            stack.unshift(document.createElement("ul"));
            el.appendChild(stack[0]);
          });
          runner2.on(EVENT_SUITE_END, function(suite2) {
            if (suite2.root) {
              updateStats();
              return;
            }
            stack.shift();
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            var url = self2.testURL(test2);
            var markup = '<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">' + playIcon + "</a></h2></li>";
            var el = fragment(markup, test2.speed, test2.title, test2.duration, url);
            self2.addCodeToggle(el, test2.body);
            appendToStack(el);
            updateStats();
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2) {
            var el = fragment(
              '<li class="test fail"><h2>%e <a href="%e" class="replay">' + playIcon + "</a></h2></li>",
              test2.title,
              self2.testURL(test2)
            );
            var stackString;
            var message = test2.err.toString();
            if (message === "[object Error]") {
              message = test2.err.message;
            }
            if (test2.err.stack) {
              var indexOfMessage = test2.err.stack.indexOf(test2.err.message);
              if (indexOfMessage === -1) {
                stackString = test2.err.stack;
              } else {
                stackString = test2.err.stack.slice(
                  test2.err.message.length + indexOfMessage
                );
              }
            } else if (test2.err.sourceURL && test2.err.line !== void 0) {
              stackString = "\n(" + test2.err.sourceURL + ":" + test2.err.line + ")";
            }
            stackString = stackString || "";
            if (test2.err.htmlMessage && stackString) {
              el.appendChild(
                fragment(
                  '<div class="html-error">%s\n<pre class="error">%e</pre></div>',
                  test2.err.htmlMessage,
                  stackString
                )
              );
            } else if (test2.err.htmlMessage) {
              el.appendChild(
                fragment('<div class="html-error">%s</div>', test2.err.htmlMessage)
              );
            } else {
              el.appendChild(
                fragment('<pre class="error">%e%e</pre>', message, stackString)
              );
            }
            self2.addCodeToggle(el, test2.body);
            appendToStack(el);
            updateStats();
          });
          runner2.on(EVENT_TEST_PENDING2, function(test2) {
            var el = fragment(
              '<li class="test pass pending"><h2>%e</h2></li>',
              test2.title
            );
            appendToStack(el);
            updateStats();
          });
          function appendToStack(el) {
            if (stack[0]) {
              stack[0].appendChild(el);
            }
          }
          __name(appendToStack, "appendToStack");
          function updateStats() {
            var percent = stats.tests / runner2.total * 100 | 0;
            if (progress2) {
              progress2.update(percent).draw(ctx);
            }
            var ms2 = new Date2() - stats.start;
            text(passes, stats.passes);
            text(failures, stats.failures);
            text(duration, (ms2 / 1e3).toFixed(2));
          }
          __name(updateStats, "updateStats");
        }
        __name(HTML, "HTML");
        function makeUrl(s2) {
          var search = window.location.search;
          if (search) {
            search = search.replace(/[?&]grep=[^&\s]*/g, "").replace(/^&/, "?");
          }
          return window.location.pathname + (search ? search + "&" : "?") + "grep=" + encodeURIComponent(escapeRe(s2));
        }
        __name(makeUrl, "makeUrl");
        HTML.prototype.suiteURL = function(suite2) {
          return makeUrl(suite2.fullTitle());
        };
        HTML.prototype.testURL = function(test2) {
          return makeUrl(test2.fullTitle());
        };
        HTML.prototype.addCodeToggle = function(el, contents) {
          var h2 = el.getElementsByTagName("h2")[0];
          on2(h2, "click", function() {
            pre.style.display = pre.style.display === "none" ? "block" : "none";
          });
          var pre = fragment("<pre><code>%e</code></pre>", utils2.clean(contents));
          el.appendChild(pre);
          pre.style.display = "none";
        };
        function error(msg) {
          document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
        }
        __name(error, "error");
        function fragment(html2) {
          var args = arguments;
          var div = document.createElement("div");
          var i = 1;
          div.innerHTML = html2.replace(/%([se])/g, function(_, type) {
            switch (type) {
              case "s":
                return String(args[i++]);
              case "e":
                return escape(args[i++]);
            }
          });
          return div.firstChild;
        }
        __name(fragment, "fragment");
        function hideSuitesWithout(classname) {
          var suites = document.getElementsByClassName("suite");
          for (var i = 0; i < suites.length; i++) {
            var els = suites[i].getElementsByClassName(classname);
            if (!els.length) {
              suites[i].className += " hidden";
            }
          }
        }
        __name(hideSuitesWithout, "hideSuitesWithout");
        function unhide() {
          var els = document.getElementsByClassName("suite hidden");
          while (els.length > 0) {
            els[0].className = els[0].className.replace("suite hidden", "suite");
          }
        }
        __name(unhide, "unhide");
        function text(el, contents) {
          if (el.textContent) {
            el.textContent = contents;
          } else {
            el.innerText = contents;
          }
        }
        __name(text, "text");
        function on2(el, event, fn) {
          if (el.addEventListener) {
            el.addEventListener(event, fn, false);
          } else {
            el.attachEvent("on" + event, fn);
          }
        }
        __name(on2, "on");
        HTML.browserOnly = true;
      })(html);
      var list = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_BEGIN = constants2.EVENT_TEST_BEGIN;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var color = Base.color;
        var cursor = Base.cursor;
        module2.exports = List;
        function List(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var n = 0;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            Base.consoleLog();
          });
          runner2.on(EVENT_TEST_BEGIN, function(test2) {
            process2.stdout.write(color("pass", "    " + test2.fullTitle() + ": "));
          });
          runner2.on(EVENT_TEST_PENDING2, function(test2) {
            var fmt = color("checkmark", "  -") + color("pending", " %s");
            Base.consoleLog(fmt, test2.fullTitle());
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            var fmt = color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s: ") + color(test2.speed, "%dms");
            cursor.CR();
            Base.consoleLog(fmt, test2.fullTitle(), test2.duration);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2) {
            cursor.CR();
            Base.consoleLog(color("fail", "  %d) %s"), ++n, test2.fullTitle());
          });
          runner2.once(EVENT_RUN_END2, self2.epilogue.bind(self2));
        }
        __name(List, "List");
        inherits2(List, Base);
        List.description = 'like "spec" reporter but flat';
      })(list);
      var min = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        module2.exports = Min;
        function Min(runner2, options) {
          Base.call(this, runner2, options);
          runner2.on(EVENT_RUN_BEGIN2, function() {
            process2.stdout.write("\x1B[2J");
            process2.stdout.write("\x1B[1;3H");
          });
          runner2.once(EVENT_RUN_END2, this.epilogue.bind(this));
        }
        __name(Min, "Min");
        inherits2(Min, Base);
        Min.description = "essentially just a summary";
      })(min);
      var spec = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var inherits2 = utils$3.inherits;
        var color = Base.color;
        module2.exports = Spec;
        function Spec(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var indents = 0;
          var n = 0;
          function indent() {
            return Array(indents).join("  ");
          }
          __name(indent, "indent");
          runner2.on(EVENT_RUN_BEGIN2, function() {
            Base.consoleLog();
          });
          runner2.on(EVENT_SUITE_BEGIN2, function(suite2) {
            ++indents;
            Base.consoleLog(color("suite", "%s%s"), indent(), suite2.title);
          });
          runner2.on(EVENT_SUITE_END, function() {
            --indents;
            if (indents === 1) {
              Base.consoleLog();
            }
          });
          runner2.on(EVENT_TEST_PENDING2, function(test2) {
            var fmt = indent() + color("pending", "  - %s");
            Base.consoleLog(fmt, test2.title);
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            var fmt;
            if (test2.speed === "fast") {
              fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s");
              Base.consoleLog(fmt, test2.title);
            } else {
              fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s") + color(test2.speed, " (%dms)");
              Base.consoleLog(fmt, test2.title, test2.duration);
            }
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2) {
            Base.consoleLog(indent() + color("fail", "  %d) %s"), ++n, test2.title);
          });
          runner2.once(EVENT_RUN_END2, self2.epilogue.bind(self2));
        }
        __name(Spec, "Spec");
        inherits2(Spec, Base);
        Spec.description = "hierarchical & verbose [default]";
      })(spec);
      var nyan = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var inherits2 = utils$3.inherits;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        module2.exports = NyanCat;
        function NyanCat(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.75 | 0;
          var nyanCatWidth = this.nyanCatWidth = 11;
          this.colorIndex = 0;
          this.numberOfLines = 4;
          this.rainbowColors = self2.generateColors();
          this.scoreboardWidth = 5;
          this.tick = 0;
          this.trajectories = [[], [], [], []];
          this.trajectoryWidthMax = width - nyanCatWidth;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            Base.cursor.hide();
            self2.draw();
          });
          runner2.on(EVENT_TEST_PENDING2, function() {
            self2.draw();
          });
          runner2.on(EVENT_TEST_PASS2, function() {
            self2.draw();
          });
          runner2.on(EVENT_TEST_FAIL2, function() {
            self2.draw();
          });
          runner2.once(EVENT_RUN_END2, function() {
            Base.cursor.show();
            for (var i = 0; i < self2.numberOfLines; i++) {
              write2("\n");
            }
            self2.epilogue();
          });
        }
        __name(NyanCat, "NyanCat");
        inherits2(NyanCat, Base);
        NyanCat.prototype.draw = function() {
          this.appendRainbow();
          this.drawScoreboard();
          this.drawRainbow();
          this.drawNyanCat();
          this.tick = !this.tick;
        };
        NyanCat.prototype.drawScoreboard = function() {
          var stats = this.stats;
          function draw(type, n) {
            write2(" ");
            write2(Base.color(type, n));
            write2("\n");
          }
          __name(draw, "draw");
          draw("green", stats.passes);
          draw("fail", stats.failures);
          draw("pending", stats.pending);
          write2("\n");
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.appendRainbow = function() {
          var segment = this.tick ? "_" : "-";
          var rainbowified = this.rainbowify(segment);
          for (var index = 0; index < this.numberOfLines; index++) {
            var trajectory = this.trajectories[index];
            if (trajectory.length >= this.trajectoryWidthMax) {
              trajectory.shift();
            }
            trajectory.push(rainbowified);
          }
        };
        NyanCat.prototype.drawRainbow = function() {
          var self2 = this;
          this.trajectories.forEach(function(line3) {
            write2("\x1B[" + self2.scoreboardWidth + "C");
            write2(line3.join(""));
            write2("\n");
          });
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.drawNyanCat = function() {
          var self2 = this;
          var startWidth = this.scoreboardWidth + this.trajectories[0].length;
          var dist = "\x1B[" + startWidth + "C";
          var padding = "";
          write2(dist);
          write2("_,------,");
          write2("\n");
          write2(dist);
          padding = self2.tick ? "  " : "   ";
          write2("_|" + padding + "/\\_/\\ ");
          write2("\n");
          write2(dist);
          padding = self2.tick ? "_" : "__";
          var tail = self2.tick ? "~" : "^";
          write2(tail + "|" + padding + this.face() + " ");
          write2("\n");
          write2(dist);
          padding = self2.tick ? " " : "  ";
          write2(padding + '""  "" ');
          write2("\n");
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.face = function() {
          var stats = this.stats;
          if (stats.failures) {
            return "( x .x)";
          } else if (stats.pending) {
            return "( o .o)";
          } else if (stats.passes) {
            return "( ^ .^)";
          }
          return "( - .-)";
        };
        NyanCat.prototype.cursorUp = function(n) {
          write2("\x1B[" + n + "A");
        };
        NyanCat.prototype.cursorDown = function(n) {
          write2("\x1B[" + n + "B");
        };
        NyanCat.prototype.generateColors = function() {
          var colors = [];
          for (var i = 0; i < 6 * 7; i++) {
            var pi3 = Math.floor(Math.PI / 3);
            var n = i * (1 / 6);
            var r = Math.floor(3 * Math.sin(n) + 3);
            var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
            var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
            colors.push(36 * r + 6 * g + b + 16);
          }
          return colors;
        };
        NyanCat.prototype.rainbowify = function(str) {
          if (!Base.useColors) {
            return str;
          }
          var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];
          this.colorIndex += 1;
          return "\x1B[38;5;" + color + "m" + str + "\x1B[0m";
        };
        function write2(string) {
          process2.stdout.write(string);
        }
        __name(write2, "write");
        NyanCat.description = '"nyan cat"';
      })(nyan);
      var xunit = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var fs = require$$2;
        var path = require$$1;
        var errors2 = errors$2;
        var createUnsupportedError2 = errors2.createUnsupportedError;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var STATE_FAILED2 = runnable.constants.STATE_FAILED;
        var inherits2 = utils2.inherits;
        var escape = utils2.escape;
        var Date2 = commonjsGlobal.Date;
        module2.exports = XUnit;
        function XUnit(runner2, options) {
          Base.call(this, runner2, options);
          var stats = this.stats;
          var tests = [];
          var self2 = this;
          var suiteName;
          var DEFAULT_SUITE_NAME = "Mocha Tests";
          if (options && options.reporterOptions) {
            if (options.reporterOptions.output) {
              if (!fs.createWriteStream) {
                throw createUnsupportedError2("file output not supported in browser");
              }
              fs.mkdirSync(path.dirname(options.reporterOptions.output), {
                recursive: true
              });
              self2.fileStream = fs.createWriteStream(options.reporterOptions.output);
            }
            suiteName = options.reporterOptions.suiteName;
          }
          suiteName = suiteName || DEFAULT_SUITE_NAME;
          runner2.on(EVENT_TEST_PENDING2, function(test2) {
            tests.push(test2);
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            tests.push(test2);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2) {
            tests.push(test2);
          });
          runner2.once(EVENT_RUN_END2, function() {
            self2.write(
              tag(
                "testsuite",
                {
                  name: suiteName,
                  tests: stats.tests,
                  failures: 0,
                  errors: stats.failures,
                  skipped: stats.tests - stats.failures - stats.passes,
                  timestamp: new Date2().toUTCString(),
                  time: stats.duration / 1e3 || 0
                },
                false
              )
            );
            tests.forEach(function(t) {
              self2.test(t);
            });
            self2.write("</testsuite>");
          });
        }
        __name(XUnit, "XUnit");
        inherits2(XUnit, Base);
        XUnit.prototype.done = function(failures, fn) {
          if (this.fileStream) {
            this.fileStream.end(function() {
              fn(failures);
            });
          } else {
            fn(failures);
          }
        };
        XUnit.prototype.write = function(line3) {
          if (this.fileStream) {
            this.fileStream.write(line3 + "\n");
          } else if (typeof process2 === "object" && process2.stdout) {
            process2.stdout.write(line3 + "\n");
          } else {
            Base.consoleLog(line3);
          }
        };
        XUnit.prototype.test = function(test2) {
          Base.useColors = false;
          var attrs = {
            classname: test2.parent.fullTitle(),
            name: test2.title,
            time: test2.duration / 1e3 || 0
          };
          if (test2.state === STATE_FAILED2) {
            var err = test2.err;
            var diff2 = !Base.hideDiff && Base.showDiff(err) ? "\n" + Base.generateDiff(err.actual, err.expected) : "";
            this.write(
              tag(
                "testcase",
                attrs,
                false,
                tag(
                  "failure",
                  {},
                  false,
                  escape(err.message) + escape(diff2) + "\n" + escape(err.stack)
                )
              )
            );
          } else if (test2.isPending()) {
            this.write(tag("testcase", attrs, false, tag("skipped", {}, true)));
          } else {
            this.write(tag("testcase", attrs, true));
          }
        };
        function tag(name2, attrs, close, content) {
          var end = close ? "/>" : ">";
          var pairs = [];
          var tag2;
          for (var key in attrs) {
            if (Object.prototype.hasOwnProperty.call(attrs, key)) {
              pairs.push(key + '="' + escape(attrs[key]) + '"');
            }
          }
          tag2 = "<" + name2 + (pairs.length ? " " + pairs.join(" ") : "") + end;
          if (content) {
            tag2 += content + "</" + name2 + end;
          }
          return tag2;
        }
        __name(tag, "tag");
        XUnit.description = "XUnit-compatible XML output";
      })(xunit);
      var markdown = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var constants2 = runner.constants;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var SUITE_PREFIX = "$";
        module2.exports = Markdown;
        function Markdown(runner2, options) {
          Base.call(this, runner2, options);
          var level = 0;
          var buf = "";
          function title2(str) {
            return Array(level).join("#") + " " + str;
          }
          __name(title2, "title");
          function mapTOC(suite2, obj) {
            var ret = obj;
            var key = SUITE_PREFIX + suite2.title;
            obj = obj[key] = obj[key] || { suite: suite2 };
            suite2.suites.forEach(function(suite3) {
              mapTOC(suite3, obj);
            });
            return ret;
          }
          __name(mapTOC, "mapTOC");
          function stringifyTOC(obj, level2) {
            ++level2;
            var buf2 = "";
            var link;
            for (var key in obj) {
              if (key === "suite") {
                continue;
              }
              if (key !== SUITE_PREFIX) {
                link = " - [" + key.substring(1) + "]";
                link += "(#" + utils2.slug(obj[key].suite.fullTitle()) + ")\n";
                buf2 += Array(level2).join("  ") + link;
              }
              buf2 += stringifyTOC(obj[key], level2);
            }
            return buf2;
          }
          __name(stringifyTOC, "stringifyTOC");
          function generateTOC(suite2) {
            var obj = mapTOC(suite2, {});
            return stringifyTOC(obj, 0);
          }
          __name(generateTOC, "generateTOC");
          generateTOC(runner2.suite);
          runner2.on(EVENT_SUITE_BEGIN2, function(suite2) {
            ++level;
            var slug = utils2.slug(suite2.fullTitle());
            buf += '<a name="' + slug + '"></a>\n';
            buf += title2(suite2.title) + "\n";
          });
          runner2.on(EVENT_SUITE_END, function() {
            --level;
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            var code = utils2.clean(test2.body);
            buf += test2.title + ".\n";
            buf += "\n```js\n";
            buf += code + "\n";
            buf += "```\n\n";
          });
          runner2.once(EVENT_RUN_END2, function() {
            process2.stdout.write("# TOC\n");
            process2.stdout.write(generateTOC(runner2.suite));
            process2.stdout.write(buf);
          });
        }
        __name(Markdown, "Markdown");
        Markdown.description = "GitHub Flavored Markdown";
      })(markdown);
      var progress = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var inherits2 = utils$3.inherits;
        var color = Base.color;
        var cursor = Base.cursor;
        module2.exports = Progress2;
        Base.colors.progress = 90;
        function Progress2(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.5 | 0;
          var total = runner2.total;
          var complete = 0;
          var lastN = -1;
          options = options || {};
          var reporterOptions = options.reporterOptions || {};
          options.open = reporterOptions.open || "[";
          options.complete = reporterOptions.complete || "\u25AC";
          options.incomplete = reporterOptions.incomplete || Base.symbols.dot;
          options.close = reporterOptions.close || "]";
          options.verbose = reporterOptions.verbose || false;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            process2.stdout.write("\n");
            cursor.hide();
          });
          runner2.on(EVENT_TEST_END2, function() {
            complete++;
            var percent = complete / total;
            var n = width * percent | 0;
            var i = width - n;
            if (n === lastN && !options.verbose) {
              return;
            }
            lastN = n;
            cursor.CR();
            process2.stdout.write("\x1B[J");
            process2.stdout.write(color("progress", "  " + options.open));
            process2.stdout.write(Array(n).join(options.complete));
            process2.stdout.write(Array(i).join(options.incomplete));
            process2.stdout.write(color("progress", options.close));
            if (options.verbose) {
              process2.stdout.write(color("progress", " " + complete + " of " + total));
            }
          });
          runner2.once(EVENT_RUN_END2, function() {
            cursor.show();
            process2.stdout.write("\n");
            self2.epilogue();
          });
        }
        __name(Progress2, "Progress");
        inherits2(Progress2, Base);
        Progress2.description = "a progress bar";
      })(progress);
      var landing = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var STATE_FAILED2 = runnable.constants.STATE_FAILED;
        var cursor = Base.cursor;
        var color = Base.color;
        module2.exports = Landing;
        Base.colors.plane = 0;
        Base.colors["plane crash"] = 31;
        Base.colors.runway = 90;
        function Landing(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.75 | 0;
          var stream = process2.stdout;
          var plane = color("plane", "\u2708");
          var crashed = -1;
          var n = 0;
          var total = 0;
          function runway() {
            var buf = Array(width).join("-");
            return "  " + color("runway", buf);
          }
          __name(runway, "runway");
          runner2.on(EVENT_RUN_BEGIN2, function() {
            stream.write("\n\n\n  ");
            cursor.hide();
          });
          runner2.on(EVENT_TEST_END2, function(test2) {
            var col = crashed === -1 ? width * ++n / ++total | 0 : crashed;
            if (test2.state === STATE_FAILED2) {
              plane = color("plane crash", "\u2708");
              crashed = col;
            }
            stream.write("\x1B[" + (width + 1) + "D\x1B[2A");
            stream.write(runway());
            stream.write("\n  ");
            stream.write(color("runway", Array(col).join("\u22C5")));
            stream.write(plane);
            stream.write(color("runway", Array(width - col).join("\u22C5") + "\n"));
            stream.write(runway());
            stream.write("\x1B[0m");
          });
          runner2.once(EVENT_RUN_END2, function() {
            cursor.show();
            process2.stdout.write("\n");
            self2.epilogue();
          });
          process2.once("SIGINT", function() {
            cursor.show();
            nextTick$1(function() {
              process2.kill(process2.pid, "SIGINT");
            });
          });
        }
        __name(Landing, "Landing");
        inherits2(Landing, Base);
        Landing.description = "Unicode landing strip";
      })(landing);
      var jsonStream = { exports: {} };
      (function(module2, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        module2.exports = JSONStream;
        function JSONStream(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var total = runner2.total;
          runner2.once(EVENT_RUN_BEGIN2, function() {
            writeEvent(["start", { total }]);
          });
          runner2.on(EVENT_TEST_PASS2, function(test2) {
            writeEvent(["pass", clean(test2)]);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test2, err) {
            test2 = clean(test2);
            test2.err = err.message;
            test2.stack = err.stack || null;
            writeEvent(["fail", test2]);
          });
          runner2.once(EVENT_RUN_END2, function() {
            writeEvent(["end", self2.stats]);
          });
        }
        __name(JSONStream, "JSONStream");
        function writeEvent(event) {
          process2.stdout.write(JSON.stringify(event) + "\n");
        }
        __name(writeEvent, "writeEvent");
        function clean(test2) {
          return {
            title: test2.title,
            fullTitle: test2.fullTitle(),
            file: test2.file,
            duration: test2.duration,
            currentRetry: test2.currentRetry(),
            speed: test2.speed
          };
        }
        __name(clean, "clean");
        JSONStream.description = "newline delimited JSON events";
      })(jsonStream);
      (function(exports2) {
        exports2.Base = exports2.base = base$1.exports;
        exports2.Dot = exports2.dot = dot.exports;
        exports2.Doc = exports2.doc = doc.exports;
        exports2.TAP = exports2.tap = tap.exports;
        exports2.JSON = exports2.json = json.exports;
        exports2.HTML = exports2.html = html.exports;
        exports2.List = exports2.list = list.exports;
        exports2.Min = exports2.min = min.exports;
        exports2.Spec = exports2.spec = spec.exports;
        exports2.Nyan = exports2.nyan = nyan.exports;
        exports2.XUnit = exports2.xunit = xunit.exports;
        exports2.Markdown = exports2.markdown = markdown.exports;
        exports2.Progress = exports2.progress = progress.exports;
        exports2.Landing = exports2.landing = landing.exports;
        exports2.JSONStream = exports2["json-stream"] = jsonStream.exports;
      })(reporters);
      var diff = true;
      var extension = [
        "js",
        "cjs",
        "mjs"
      ];
      var reporter = "spec";
      var slow = 75;
      var timeout = 2e3;
      var ui = "bdd";
      var require$$4 = {
        diff,
        extension,
        "package": "./package.json",
        reporter,
        slow,
        timeout,
        ui,
        "watch-ignore": [
          "node_modules",
          ".git"
        ]
      };
      var constants = runner.constants;
      var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
      var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
      var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
      var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
      var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
      var EVENT_RUN_END = constants.EVENT_RUN_END;
      var EVENT_TEST_END = constants.EVENT_TEST_END;
      var Date$2 = commonjsGlobal.Date;
      function createStatsCollector(runner2) {
        var stats = {
          suites: 0,
          tests: 0,
          passes: 0,
          pending: 0,
          failures: 0
        };
        if (!runner2) {
          throw new TypeError("Missing runner argument");
        }
        runner2.stats = stats;
        runner2.once(EVENT_RUN_BEGIN, function() {
          stats.start = new Date$2();
        });
        runner2.on(EVENT_SUITE_BEGIN, function(suite2) {
          suite2.root || stats.suites++;
        });
        runner2.on(EVENT_TEST_PASS, function() {
          stats.passes++;
        });
        runner2.on(EVENT_TEST_FAIL, function() {
          stats.failures++;
        });
        runner2.on(EVENT_TEST_PENDING, function() {
          stats.pending++;
        });
        runner2.on(EVENT_TEST_END, function() {
          stats.tests++;
        });
        runner2.once(EVENT_RUN_END, function() {
          stats.end = new Date$2();
          stats.duration = stats.end - stats.start;
        });
      }
      __name(createStatsCollector, "createStatsCollector");
      var statsCollector = createStatsCollector;
      var interfaces = {};
      var bdd = { exports: {} };
      var Runnable = runnable;
      var utils = utils$3;
      var errors$1 = errors$2;
      var createInvalidArgumentTypeError = errors$1.createInvalidArgumentTypeError;
      var isString = utils.isString;
      const { MOCHA_ID_PROP_NAME } = utils.constants;
      var test = Test$4;
      function Test$4(title2, fn) {
        if (!isString(title2)) {
          throw createInvalidArgumentTypeError(
            'Test argument "title" should be a string. Received type "' + typeof title2 + '"',
            "title",
            "string"
          );
        }
        this.type = "test";
        Runnable.call(this, title2, fn);
        this.reset();
      }
      __name(Test$4, "Test$4");
      utils.inherits(Test$4, Runnable);
      Test$4.prototype.reset = function() {
        Runnable.prototype.reset.call(this);
        this.pending = !this.fn;
        delete this.state;
      };
      Test$4.prototype.retriedTest = function(n) {
        if (!arguments.length) {
          return this._retriedTest;
        }
        this._retriedTest = n;
      };
      Test$4.prototype.markOnly = function() {
        this.parent.appendOnlyTest(this);
      };
      Test$4.prototype.clone = function() {
        var test2 = new Test$4(this.title, this.fn);
        test2.timeout(this.timeout());
        test2.slow(this.slow());
        test2.retries(this.retries());
        test2.currentRetry(this.currentRetry());
        test2.retriedTest(this.retriedTest() || this);
        test2.globals(this.globals());
        test2.parent = this.parent;
        test2.file = this.file;
        test2.ctx = this.ctx;
        return test2;
      };
      Test$4.prototype.serialize = /* @__PURE__ */ __name(function serialize2() {
        return {
          $$currentRetry: this._currentRetry,
          $$fullTitle: this.fullTitle(),
          $$isPending: Boolean(this.pending),
          $$retriedTest: this._retriedTest || null,
          $$slow: this._slow,
          $$titlePath: this.titlePath(),
          body: this.body,
          duration: this.duration,
          err: this.err,
          parent: {
            $$fullTitle: this.parent.fullTitle(),
            [MOCHA_ID_PROP_NAME]: this.parent.id
          },
          speed: this.speed,
          state: this.state,
          title: this.title,
          type: this.type,
          file: this.file,
          [MOCHA_ID_PROP_NAME]: this.id
        };
      }, "serialize");
      var Suite$1 = suite.exports;
      var errors = errors$2;
      var createMissingArgumentError = errors.createMissingArgumentError;
      var createUnsupportedError = errors.createUnsupportedError;
      var createForbiddenExclusivityError = errors.createForbiddenExclusivityError;
      var common = /* @__PURE__ */ __name(function(suites, context2, mocha3) {
        function shouldBeTested(suite2) {
          return !mocha3.options.grep || mocha3.options.grep && mocha3.options.grep.test(suite2.fullTitle()) && !mocha3.options.invert;
        }
        __name(shouldBeTested, "shouldBeTested");
        return {
          /**
           * This is only present if flag --delay is passed into Mocha. It triggers
           * root suite execution.
           *
           * @param {Suite} suite The root suite.
           * @return {Function} A function which runs the root suite
           */
          runWithSuite: /* @__PURE__ */ __name(function runWithSuite(suite2) {
            return /* @__PURE__ */ __name(function run() {
              suite2.run();
            }, "run");
          }, "runWithSuite"),
          /**
           * Execute before running tests.
           *
           * @param {string} name
           * @param {Function} fn
           */
          before: function(name2, fn) {
            suites[0].beforeAll(name2, fn);
          },
          /**
           * Execute after running tests.
           *
           * @param {string} name
           * @param {Function} fn
           */
          after: function(name2, fn) {
            suites[0].afterAll(name2, fn);
          },
          /**
           * Execute before each test case.
           *
           * @param {string} name
           * @param {Function} fn
           */
          beforeEach: function(name2, fn) {
            suites[0].beforeEach(name2, fn);
          },
          /**
           * Execute after each test case.
           *
           * @param {string} name
           * @param {Function} fn
           */
          afterEach: function(name2, fn) {
            suites[0].afterEach(name2, fn);
          },
          suite: {
            /**
             * Create an exclusive Suite; convenience function
             * See docstring for create() below.
             *
             * @param {Object} opts
             * @returns {Suite}
             */
            only: /* @__PURE__ */ __name(function only(opts) {
              if (mocha3.options.forbidOnly) {
                throw createForbiddenExclusivityError(mocha3);
              }
              opts.isOnly = true;
              return this.create(opts);
            }, "only"),
            /**
             * Create a Suite, but skip it; convenience function
             * See docstring for create() below.
             *
             * @param {Object} opts
             * @returns {Suite}
             */
            skip: /* @__PURE__ */ __name(function skip(opts) {
              opts.pending = true;
              return this.create(opts);
            }, "skip"),
            /**
             * Creates a suite.
             *
             * @param {Object} opts Options
             * @param {string} opts.title Title of Suite
             * @param {Function} [opts.fn] Suite Function (not always applicable)
             * @param {boolean} [opts.pending] Is Suite pending?
             * @param {string} [opts.file] Filepath where this Suite resides
             * @param {boolean} [opts.isOnly] Is Suite exclusive?
             * @returns {Suite}
             */
            create: /* @__PURE__ */ __name(function create2(opts) {
              var suite2 = Suite$1.create(suites[0], opts.title);
              suite2.pending = Boolean(opts.pending);
              suite2.file = opts.file;
              suites.unshift(suite2);
              if (opts.isOnly) {
                suite2.markOnly();
              }
              if (suite2.pending && mocha3.options.forbidPending && shouldBeTested(suite2)) {
                throw createUnsupportedError("Pending test forbidden");
              }
              if (typeof opts.fn === "function") {
                opts.fn.call(suite2);
                suites.shift();
              } else if (typeof opts.fn === "undefined" && !suite2.pending) {
                throw createMissingArgumentError(
                  'Suite "' + suite2.fullTitle() + '" was defined but no callback was supplied. Supply a callback or explicitly skip the suite.',
                  "callback",
                  "function"
                );
              } else if (!opts.fn && suite2.pending) {
                suites.shift();
              }
              return suite2;
            }, "create")
          },
          test: {
            /**
             * Exclusive test-case.
             *
             * @param {Object} mocha
             * @param {Function} test
             * @returns {*}
             */
            only: function(mocha4, test2) {
              if (mocha4.options.forbidOnly) {
                throw createForbiddenExclusivityError(mocha4);
              }
              test2.markOnly();
              return test2;
            },
            /**
             * Pending test case.
             *
             * @param {string} title
             */
            skip: function(title2) {
              context2.test(title2);
            }
          }
        };
      }, "common");
      var Test$3 = test;
      var EVENT_FILE_PRE_REQUIRE$2 = suite.exports.constants.EVENT_FILE_PRE_REQUIRE;
      bdd.exports = /* @__PURE__ */ __name(function bddInterface(suite2) {
        var suites = [suite2];
        suite2.on(EVENT_FILE_PRE_REQUIRE$2, function(context2, file, mocha3) {
          var common$12 = common(suites, context2, mocha3);
          context2.before = common$12.before;
          context2.after = common$12.after;
          context2.beforeEach = common$12.beforeEach;
          context2.afterEach = common$12.afterEach;
          context2.run = mocha3.options.delay && common$12.runWithSuite(suite2);
          context2.describe = context2.context = function(title2, fn) {
            return common$12.suite.create({
              title: title2,
              file,
              fn
            });
          };
          context2.xdescribe = context2.xcontext = context2.describe.skip = function(title2, fn) {
            return common$12.suite.skip({
              title: title2,
              file,
              fn
            });
          };
          context2.describe.only = function(title2, fn) {
            return common$12.suite.only({
              title: title2,
              file,
              fn
            });
          };
          context2.it = context2.specify = function(title2, fn) {
            var suite3 = suites[0];
            if (suite3.isPending()) {
              fn = null;
            }
            var test2 = new Test$3(title2, fn);
            test2.file = file;
            suite3.addTest(test2);
            return test2;
          };
          context2.it.only = function(title2, fn) {
            return common$12.test.only(mocha3, context2.it(title2, fn));
          };
          context2.xit = context2.xspecify = context2.it.skip = function(title2) {
            return context2.it(title2);
          };
        });
      }, "bddInterface");
      bdd.exports.description = "BDD or RSpec style [default]";
      var tdd = { exports: {} };
      var Test$2 = test;
      var EVENT_FILE_PRE_REQUIRE$1 = suite.exports.constants.EVENT_FILE_PRE_REQUIRE;
      tdd.exports = function(suite2) {
        var suites = [suite2];
        suite2.on(EVENT_FILE_PRE_REQUIRE$1, function(context2, file, mocha3) {
          var common$12 = common(suites, context2, mocha3);
          context2.setup = common$12.beforeEach;
          context2.teardown = common$12.afterEach;
          context2.suiteSetup = common$12.before;
          context2.suiteTeardown = common$12.after;
          context2.run = mocha3.options.delay && common$12.runWithSuite(suite2);
          context2.suite = function(title2, fn) {
            return common$12.suite.create({
              title: title2,
              file,
              fn
            });
          };
          context2.suite.skip = function(title2, fn) {
            return common$12.suite.skip({
              title: title2,
              file,
              fn
            });
          };
          context2.suite.only = function(title2, fn) {
            return common$12.suite.only({
              title: title2,
              file,
              fn
            });
          };
          context2.test = function(title2, fn) {
            var suite3 = suites[0];
            if (suite3.isPending()) {
              fn = null;
            }
            var test2 = new Test$2(title2, fn);
            test2.file = file;
            suite3.addTest(test2);
            return test2;
          };
          context2.test.only = function(title2, fn) {
            return common$12.test.only(mocha3, context2.test(title2, fn));
          };
          context2.test.skip = common$12.test.skip;
        });
      };
      tdd.exports.description = `traditional "suite"/"test" instead of BDD's "describe"/"it"`;
      var qunit = { exports: {} };
      var Test$1 = test;
      var EVENT_FILE_PRE_REQUIRE = suite.exports.constants.EVENT_FILE_PRE_REQUIRE;
      qunit.exports = /* @__PURE__ */ __name(function qUnitInterface(suite2) {
        var suites = [suite2];
        suite2.on(EVENT_FILE_PRE_REQUIRE, function(context2, file, mocha3) {
          var common$12 = common(suites, context2, mocha3);
          context2.before = common$12.before;
          context2.after = common$12.after;
          context2.beforeEach = common$12.beforeEach;
          context2.afterEach = common$12.afterEach;
          context2.run = mocha3.options.delay && common$12.runWithSuite(suite2);
          context2.suite = function(title2) {
            if (suites.length > 1) {
              suites.shift();
            }
            return common$12.suite.create({
              title: title2,
              file,
              fn: false
            });
          };
          context2.suite.only = function(title2) {
            if (suites.length > 1) {
              suites.shift();
            }
            return common$12.suite.only({
              title: title2,
              file,
              fn: false
            });
          };
          context2.test = function(title2, fn) {
            var test2 = new Test$1(title2, fn);
            test2.file = file;
            suites[0].addTest(test2);
            return test2;
          };
          context2.test.only = function(title2, fn) {
            return common$12.test.only(mocha3, context2.test(title2, fn));
          };
          context2.test.skip = common$12.test.skip;
        });
      }, "qUnitInterface");
      qunit.exports.description = "QUnit style";
      var exports$1 = { exports: {} };
      var Suite = suite.exports;
      var Test = test;
      exports$1.exports = function(suite2) {
        var suites = [suite2];
        suite2.on(Suite.constants.EVENT_FILE_REQUIRE, visit);
        function visit(obj, file) {
          var suite3;
          for (var key in obj) {
            if (typeof obj[key] === "function") {
              var fn = obj[key];
              switch (key) {
                case "before":
                  suites[0].beforeAll(fn);
                  break;
                case "after":
                  suites[0].afterAll(fn);
                  break;
                case "beforeEach":
                  suites[0].beforeEach(fn);
                  break;
                case "afterEach":
                  suites[0].afterEach(fn);
                  break;
                default:
                  var test2 = new Test(key, fn);
                  test2.file = file;
                  suites[0].addTest(test2);
              }
            } else {
              suite3 = Suite.create(suites[0], key);
              suites.unshift(suite3);
              visit(obj[key], file);
              suites.shift();
            }
          }
        }
        __name(visit, "visit");
      };
      exports$1.exports.description = 'Node.js module ("exports") style';
      interfaces.bdd = bdd.exports;
      interfaces.tdd = tdd.exports;
      interfaces.qunit = qunit.exports;
      interfaces.exports = exports$1.exports;
      var context = Context;
      function Context() {
      }
      __name(Context, "Context");
      Context.prototype.runnable = function(runnable2) {
        if (!arguments.length) {
          return this._runnable;
        }
        this.test = this._runnable = runnable2;
        return this;
      };
      Context.prototype.timeout = function(ms2) {
        if (!arguments.length) {
          return this.runnable().timeout();
        }
        this.runnable().timeout(ms2);
        return this;
      };
      Context.prototype.slow = function(ms2) {
        if (!arguments.length) {
          return this.runnable().slow();
        }
        this.runnable().slow(ms2);
        return this;
      };
      Context.prototype.skip = function() {
        this.runnable().skip();
      };
      Context.prototype.retries = function(n) {
        if (!arguments.length) {
          return this.runnable().retries();
        }
        this.runnable().retries(n);
        return this;
      };
      var name = "mocha";
      var version2 = "10.2.0";
      var homepage = "https://mochajs.org/";
      var notifyLogo = "https://ibin.co/4QuRuGjXvl36.png";
      var require$$17 = {
        name,
        version: version2,
        homepage,
        notifyLogo
      };
      (function(module2, exports2) {
        var escapeRe = escapeStringRegexp;
        var path = require$$1;
        var builtinReporters = reporters;
        var utils2 = utils$3;
        var mocharc = require$$4;
        var Suite2 = suite.exports;
        var esmUtils = require$$18;
        var createStatsCollector2 = statsCollector;
        const {
          createInvalidReporterError: createInvalidReporterError2,
          createInvalidInterfaceError: createInvalidInterfaceError2,
          createMochaInstanceAlreadyDisposedError: createMochaInstanceAlreadyDisposedError2,
          createMochaInstanceAlreadyRunningError: createMochaInstanceAlreadyRunningError2,
          createUnsupportedError: createUnsupportedError2
        } = errors$2;
        const { EVENT_FILE_PRE_REQUIRE: EVENT_FILE_PRE_REQUIRE2, EVENT_FILE_POST_REQUIRE, EVENT_FILE_REQUIRE } = Suite2.constants;
        var debug2 = browser.exports("mocha:mocha");
        exports2 = module2.exports = Mocha2;
        var mochaStates = utils2.defineConstants({
          /**
           * Initial state of the mocha instance
           * @private
           */
          INIT: "init",
          /**
           * Mocha instance is running tests
           * @private
           */
          RUNNING: "running",
          /**
           * Mocha instance is done running tests and references to test functions and hooks are cleaned.
           * You can reset this state by unloading the test files.
           * @private
           */
          REFERENCES_CLEANED: "referencesCleaned",
          /**
           * Mocha instance is disposed and can no longer be used.
           * @private
           */
          DISPOSED: "disposed"
        });
        if (!utils2.isBrowser() && typeof module2.paths !== "undefined") {
          var cwd2 = utils2.cwd();
          module2.paths.push(cwd2, path.join(cwd2, "node_modules"));
        }
        exports2.utils = utils2;
        exports2.interfaces = interfaces;
        exports2.reporters = builtinReporters;
        exports2.Runnable = runnable;
        exports2.Context = context;
        exports2.Runner = runner;
        exports2.Suite = Suite2;
        exports2.Hook = hook;
        exports2.Test = test;
        let currentContext;
        exports2.afterEach = function(...args) {
          return (currentContext.afterEach || currentContext.teardown).apply(
            this,
            args
          );
        };
        exports2.after = function(...args) {
          return (currentContext.after || currentContext.suiteTeardown).apply(
            this,
            args
          );
        };
        exports2.beforeEach = function(...args) {
          return (currentContext.beforeEach || currentContext.setup).apply(this, args);
        };
        exports2.before = function(...args) {
          return (currentContext.before || currentContext.suiteSetup).apply(this, args);
        };
        exports2.describe = function(...args) {
          return (currentContext.describe || currentContext.suite).apply(this, args);
        };
        exports2.describe.only = function(...args) {
          return (currentContext.describe || currentContext.suite).only.apply(
            this,
            args
          );
        };
        exports2.describe.skip = function(...args) {
          return (currentContext.describe || currentContext.suite).skip.apply(
            this,
            args
          );
        };
        exports2.it = function(...args) {
          return (currentContext.it || currentContext.test).apply(this, args);
        };
        exports2.it.only = function(...args) {
          return (currentContext.it || currentContext.test).only.apply(this, args);
        };
        exports2.it.skip = function(...args) {
          return (currentContext.it || currentContext.test).skip.apply(this, args);
        };
        exports2.xdescribe = exports2.describe.skip;
        exports2.xit = exports2.it.skip;
        exports2.setup = exports2.beforeEach;
        exports2.suiteSetup = exports2.before;
        exports2.suiteTeardown = exports2.after;
        exports2.suite = exports2.describe;
        exports2.teardown = exports2.afterEach;
        exports2.test = exports2.it;
        exports2.run = function(...args) {
          return currentContext.run.apply(this, args);
        };
        function Mocha2(options = {}) {
          options = { ...mocharc, ...options };
          this.files = [];
          this.options = options;
          this.suite = new exports2.Suite("", new exports2.Context(), true);
          this._cleanReferencesAfterRun = true;
          this._state = mochaStates.INIT;
          this.grep(options.grep).fgrep(options.fgrep).ui(options.ui).reporter(
            options.reporter,
            options.reporterOption || options.reporterOptions
            // for backwards compatibility
          ).slow(options.slow).global(options.global);
          if (typeof options.timeout !== "undefined") {
            this.timeout(options.timeout === false ? 0 : options.timeout);
          }
          if ("retries" in options) {
            this.retries(options.retries);
          }
          [
            "allowUncaught",
            "asyncOnly",
            "bail",
            "checkLeaks",
            "color",
            "delay",
            "diff",
            "dryRun",
            "failZero",
            "forbidOnly",
            "forbidPending",
            "fullTrace",
            "inlineDiffs",
            "invert"
          ].forEach(function(opt) {
            if (options[opt]) {
              this[opt]();
            }
          }, this);
          if (options.rootHooks) {
            this.rootHooks(options.rootHooks);
          }
          this._runnerClass = exports2.Runner;
          this._lazyLoadFiles = false;
          this.isWorker = Boolean(options.isWorker);
          this.globalSetup(options.globalSetup).globalTeardown(options.globalTeardown).enableGlobalSetup(options.enableGlobalSetup).enableGlobalTeardown(options.enableGlobalTeardown);
          if (options.parallel && (typeof options.jobs === "undefined" || options.jobs > 1)) {
            debug2("attempting to enable parallel mode");
            this.parallelMode(true);
          }
        }
        __name(Mocha2, "Mocha");
        Mocha2.prototype.bail = function(bail) {
          this.suite.bail(bail !== false);
          return this;
        };
        Mocha2.prototype.addFile = function(file) {
          this.files.push(file);
          return this;
        };
        Mocha2.prototype.reporter = function(reporterName, reporterOptions) {
          if (typeof reporterName === "function") {
            this._reporter = reporterName;
          } else {
            reporterName = reporterName || "spec";
            var reporter2;
            if (builtinReporters[reporterName]) {
              reporter2 = builtinReporters[reporterName];
            }
            if (!reporter2) {
              let foundReporter;
              try {
                foundReporter = __require.resolve(reporterName);
                reporter2 = commonjsRequire(foundReporter);
              } catch (err) {
                if (foundReporter) {
                  throw createInvalidReporterError2(err.message, foundReporter);
                }
                try {
                  reporter2 = commonjsRequire(path.resolve(reporterName));
                } catch (e) {
                  throw createInvalidReporterError2(e.message, reporterName);
                }
              }
            }
            this._reporter = reporter2;
          }
          this.options.reporterOption = reporterOptions;
          this.options.reporterOptions = reporterOptions;
          return this;
        };
        Mocha2.prototype.ui = function(ui2) {
          var bindInterface;
          if (typeof ui2 === "function") {
            bindInterface = ui2;
          } else {
            ui2 = ui2 || "bdd";
            bindInterface = exports2.interfaces[ui2];
            if (!bindInterface) {
              try {
                bindInterface = commonjsRequire(ui2);
              } catch (err) {
                throw createInvalidInterfaceError2(`invalid interface '${ui2}'`, ui2);
              }
            }
          }
          bindInterface(this.suite);
          this.suite.on(EVENT_FILE_PRE_REQUIRE2, function(context2) {
            currentContext = context2;
          });
          return this;
        };
        Mocha2.prototype.loadFiles = function(fn) {
          var self2 = this;
          var suite2 = this.suite;
          this.files.forEach(function(file) {
            file = path.resolve(file);
            suite2.emit(EVENT_FILE_PRE_REQUIRE2, commonjsGlobal, file, self2);
            suite2.emit(EVENT_FILE_REQUIRE, commonjsRequire(file), file, self2);
            suite2.emit(EVENT_FILE_POST_REQUIRE, commonjsGlobal, file, self2);
          });
          fn && fn();
        };
        Mocha2.prototype.loadFilesAsync = function({ esmDecorator } = {}) {
          var self2 = this;
          var suite2 = this.suite;
          this.lazyLoadFiles(true);
          return esmUtils.loadFilesAsync(
            this.files,
            function(file) {
              suite2.emit(EVENT_FILE_PRE_REQUIRE2, commonjsGlobal, file, self2);
            },
            function(file, resultModule) {
              suite2.emit(EVENT_FILE_REQUIRE, resultModule, file, self2);
              suite2.emit(EVENT_FILE_POST_REQUIRE, commonjsGlobal, file, self2);
            },
            esmDecorator
          );
        };
        Mocha2.unloadFile = function(file) {
          if (utils2.isBrowser()) {
            throw createUnsupportedError2(
              "unloadFile() is only supported in a Node.js environment"
            );
          }
          return require$$18.unloadFile(file);
        };
        Mocha2.prototype.unloadFiles = function() {
          if (this._state === mochaStates.DISPOSED) {
            throw createMochaInstanceAlreadyDisposedError2(
              "Mocha instance is already disposed, it cannot be used again.",
              this._cleanReferencesAfterRun,
              this
            );
          }
          this.files.forEach(function(file) {
            Mocha2.unloadFile(file);
          });
          this._state = mochaStates.INIT;
          return this;
        };
        Mocha2.prototype.fgrep = function(str) {
          if (!str) {
            return this;
          }
          return this.grep(new RegExp(escapeRe(str)));
        };
        Mocha2.prototype.grep = function(re) {
          if (utils2.isString(re)) {
            var arg = re.match(/^\/(.*)\/([gimy]{0,4})$|.*/);
            this.options.grep = new RegExp(arg[1] || arg[0], arg[2]);
          } else {
            this.options.grep = re;
          }
          return this;
        };
        Mocha2.prototype.invert = function() {
          this.options.invert = true;
          return this;
        };
        Mocha2.prototype.checkLeaks = function(checkLeaks) {
          this.options.checkLeaks = checkLeaks !== false;
          return this;
        };
        Mocha2.prototype.cleanReferencesAfterRun = function(cleanReferencesAfterRun) {
          this._cleanReferencesAfterRun = cleanReferencesAfterRun !== false;
          return this;
        };
        Mocha2.prototype.dispose = function() {
          if (this._state === mochaStates.RUNNING) {
            throw createMochaInstanceAlreadyRunningError2(
              "Cannot dispose while the mocha instance is still running tests."
            );
          }
          this.unloadFiles();
          this._previousRunner && this._previousRunner.dispose();
          this.suite.dispose();
          this._state = mochaStates.DISPOSED;
        };
        Mocha2.prototype.fullTrace = function(fullTrace) {
          this.options.fullTrace = fullTrace !== false;
          return this;
        };
        Mocha2.prototype.global = function(global2) {
          this.options.global = (this.options.global || []).concat(global2).filter(Boolean).filter(function(elt, idx, arr) {
            return arr.indexOf(elt) === idx;
          });
          return this;
        };
        Mocha2.prototype.globals = Mocha2.prototype.global;
        Mocha2.prototype.color = function(color) {
          this.options.color = color !== false;
          return this;
        };
        Mocha2.prototype.inlineDiffs = function(inlineDiffs) {
          this.options.inlineDiffs = inlineDiffs !== false;
          return this;
        };
        Mocha2.prototype.diff = function(diff2) {
          this.options.diff = diff2 !== false;
          return this;
        };
        Mocha2.prototype.timeout = function(msecs) {
          this.suite.timeout(msecs);
          return this;
        };
        Mocha2.prototype.retries = function(retry) {
          this.suite.retries(retry);
          return this;
        };
        Mocha2.prototype.slow = function(msecs) {
          this.suite.slow(msecs);
          return this;
        };
        Mocha2.prototype.asyncOnly = function(asyncOnly) {
          this.options.asyncOnly = asyncOnly !== false;
          return this;
        };
        Mocha2.prototype.noHighlighting = function() {
          this.options.noHighlighting = true;
          return this;
        };
        Mocha2.prototype.allowUncaught = function(allowUncaught) {
          this.options.allowUncaught = allowUncaught !== false;
          return this;
        };
        Mocha2.prototype.delay = /* @__PURE__ */ __name(function delay() {
          this.options.delay = true;
          return this;
        }, "delay");
        Mocha2.prototype.dryRun = function(dryRun) {
          this.options.dryRun = dryRun !== false;
          return this;
        };
        Mocha2.prototype.failZero = function(failZero) {
          this.options.failZero = failZero !== false;
          return this;
        };
        Mocha2.prototype.forbidOnly = function(forbidOnly) {
          this.options.forbidOnly = forbidOnly !== false;
          return this;
        };
        Mocha2.prototype.forbidPending = function(forbidPending) {
          this.options.forbidPending = forbidPending !== false;
          return this;
        };
        Mocha2.prototype._guardRunningStateTransition = function() {
          if (this._state === mochaStates.RUNNING) {
            throw createMochaInstanceAlreadyRunningError2(
              "Mocha instance is currently running tests, cannot start a next test run until this one is done",
              this
            );
          }
          if (this._state === mochaStates.DISPOSED || this._state === mochaStates.REFERENCES_CLEANED) {
            throw createMochaInstanceAlreadyDisposedError2(
              "Mocha instance is already disposed, cannot start a new test run. Please create a new mocha instance. Be sure to set disable `cleanReferencesAfterRun` when you want to reuse the same mocha instance for multiple test runs.",
              this._cleanReferencesAfterRun,
              this
            );
          }
        };
        Object.defineProperty(Mocha2.prototype, "version", {
          value: require$$17.version,
          configurable: false,
          enumerable: true,
          writable: false
        });
        Mocha2.prototype.run = function(fn) {
          this._guardRunningStateTransition();
          this._state = mochaStates.RUNNING;
          if (this._previousRunner) {
            this._previousRunner.dispose();
            this.suite.reset();
          }
          if (this.files.length && !this._lazyLoadFiles) {
            this.loadFiles();
          }
          var suite2 = this.suite;
          var options = this.options;
          options.files = this.files;
          const runner2 = new this._runnerClass(suite2, {
            cleanReferencesAfterRun: this._cleanReferencesAfterRun,
            delay: options.delay,
            dryRun: options.dryRun,
            failZero: options.failZero
          });
          createStatsCollector2(runner2);
          var reporter2 = new this._reporter(runner2, options);
          runner2.checkLeaks = options.checkLeaks === true;
          runner2.fullStackTrace = options.fullTrace;
          runner2.asyncOnly = options.asyncOnly;
          runner2.allowUncaught = options.allowUncaught;
          runner2.forbidOnly = options.forbidOnly;
          runner2.forbidPending = options.forbidPending;
          if (options.grep) {
            runner2.grep(options.grep, options.invert);
          }
          if (options.global) {
            runner2.globals(options.global);
          }
          if (options.color !== void 0) {
            exports2.reporters.Base.useColors = options.color;
          }
          exports2.reporters.Base.inlineDiffs = options.inlineDiffs;
          exports2.reporters.Base.hideDiff = !options.diff;
          const done2 = /* @__PURE__ */ __name((failures) => {
            this._previousRunner = runner2;
            this._state = this._cleanReferencesAfterRun ? mochaStates.REFERENCES_CLEANED : mochaStates.INIT;
            fn = fn || utils2.noop;
            if (typeof reporter2.done === "function") {
              reporter2.done(failures, fn);
            } else {
              fn(failures);
            }
          }, "done");
          const runAsync = /* @__PURE__ */ __name(async (runner3) => {
            const context2 = this.options.enableGlobalSetup && this.hasGlobalSetupFixtures() ? await this.runGlobalSetup(runner3) : {};
            const failureCount = await runner3.runAsync({
              files: this.files,
              options
            });
            if (this.options.enableGlobalTeardown && this.hasGlobalTeardownFixtures()) {
              await this.runGlobalTeardown(runner3, { context: context2 });
            }
            return failureCount;
          }, "runAsync");
          runAsync(runner2).then(done2);
          return runner2;
        };
        Mocha2.prototype.rootHooks = /* @__PURE__ */ __name(function rootHooks({
          beforeAll = [],
          beforeEach = [],
          afterAll = [],
          afterEach = []
        } = {}) {
          beforeAll = utils2.castArray(beforeAll);
          beforeEach = utils2.castArray(beforeEach);
          afterAll = utils2.castArray(afterAll);
          afterEach = utils2.castArray(afterEach);
          beforeAll.forEach((hook2) => {
            this.suite.beforeAll(hook2);
          });
          beforeEach.forEach((hook2) => {
            this.suite.beforeEach(hook2);
          });
          afterAll.forEach((hook2) => {
            this.suite.afterAll(hook2);
          });
          afterEach.forEach((hook2) => {
            this.suite.afterEach(hook2);
          });
          return this;
        }, "rootHooks");
        Mocha2.prototype.parallelMode = /* @__PURE__ */ __name(function parallelMode(enable = true) {
          if (utils2.isBrowser()) {
            throw createUnsupportedError2("parallel mode is only supported in Node.js");
          }
          const parallel = Boolean(enable);
          if (parallel === this.options.parallel && this._lazyLoadFiles && this._runnerClass !== exports2.Runner) {
            return this;
          }
          if (this._state !== mochaStates.INIT) {
            throw createUnsupportedError2(
              "cannot change parallel mode after having called run()"
            );
          }
          this.options.parallel = parallel;
          this._runnerClass = parallel ? require$$18 : exports2.Runner;
          return this.lazyLoadFiles(this._lazyLoadFiles || parallel);
        }, "parallelMode");
        Mocha2.prototype.lazyLoadFiles = /* @__PURE__ */ __name(function lazyLoadFiles(enable) {
          this._lazyLoadFiles = enable === true;
          debug2("set lazy load to %s", enable);
          return this;
        }, "lazyLoadFiles");
        Mocha2.prototype.globalSetup = /* @__PURE__ */ __name(function globalSetup(setupFns = []) {
          setupFns = utils2.castArray(setupFns);
          this.options.globalSetup = setupFns;
          debug2("configured %d global setup functions", setupFns.length);
          return this;
        }, "globalSetup");
        Mocha2.prototype.globalTeardown = /* @__PURE__ */ __name(function globalTeardown(teardownFns = []) {
          teardownFns = utils2.castArray(teardownFns);
          this.options.globalTeardown = teardownFns;
          debug2("configured %d global teardown functions", teardownFns.length);
          return this;
        }, "globalTeardown");
        Mocha2.prototype.runGlobalSetup = /* @__PURE__ */ __name(async function runGlobalSetup(context2 = {}) {
          const { globalSetup } = this.options;
          if (globalSetup && globalSetup.length) {
            debug2("run(): global setup starting");
            await this._runGlobalFixtures(globalSetup, context2);
            debug2("run(): global setup complete");
          }
          return context2;
        }, "runGlobalSetup");
        Mocha2.prototype.runGlobalTeardown = /* @__PURE__ */ __name(async function runGlobalTeardown(context2 = {}) {
          const { globalTeardown } = this.options;
          if (globalTeardown && globalTeardown.length) {
            debug2("run(): global teardown starting");
            await this._runGlobalFixtures(globalTeardown, context2);
          }
          debug2("run(): global teardown complete");
          return context2;
        }, "runGlobalTeardown");
        Mocha2.prototype._runGlobalFixtures = /* @__PURE__ */ __name(async function _runGlobalFixtures(fixtureFns = [], context2 = {}) {
          for await (const fixtureFn of fixtureFns) {
            await fixtureFn.call(context2);
          }
          return context2;
        }, "_runGlobalFixtures");
        Mocha2.prototype.enableGlobalSetup = /* @__PURE__ */ __name(function enableGlobalSetup(enabled = true) {
          this.options.enableGlobalSetup = Boolean(enabled);
          return this;
        }, "enableGlobalSetup");
        Mocha2.prototype.enableGlobalTeardown = /* @__PURE__ */ __name(function enableGlobalTeardown(enabled = true) {
          this.options.enableGlobalTeardown = Boolean(enabled);
          return this;
        }, "enableGlobalTeardown");
        Mocha2.prototype.hasGlobalSetupFixtures = /* @__PURE__ */ __name(function hasGlobalSetupFixtures() {
          return Boolean(this.options.globalSetup.length);
        }, "hasGlobalSetupFixtures");
        Mocha2.prototype.hasGlobalTeardownFixtures = /* @__PURE__ */ __name(function hasGlobalTeardownFixtures() {
          return Boolean(this.options.globalTeardown.length);
        }, "hasGlobalTeardownFixtures");
      })(mocha$1, mocha$1.exports);
      process2.stdout = browserStdout({ label: false });
      var parseQuery = parseQuery$1;
      var highlightTags = highlightTags$1;
      var Mocha = mocha$1.exports;
      var mocha2 = new Mocha({ reporter: "html" });
      var Date$1 = commonjsGlobal.Date;
      var setTimeout$1 = commonjsGlobal.setTimeout;
      commonjsGlobal.setInterval;
      commonjsGlobal.clearTimeout;
      commonjsGlobal.clearInterval;
      var uncaughtExceptionHandlers = [];
      var originalOnerrorHandler = commonjsGlobal.onerror;
      process2.removeListener = function(e, fn) {
        if (e === "uncaughtException") {
          if (originalOnerrorHandler) {
            commonjsGlobal.onerror = originalOnerrorHandler;
          } else {
            commonjsGlobal.onerror = function() {
            };
          }
          var i = uncaughtExceptionHandlers.indexOf(fn);
          if (i !== -1) {
            uncaughtExceptionHandlers.splice(i, 1);
          }
        }
      };
      process2.listenerCount = function(name2) {
        if (name2 === "uncaughtException") {
          return uncaughtExceptionHandlers.length;
        }
        return 0;
      };
      process2.on = function(e, fn) {
        if (e === "uncaughtException") {
          commonjsGlobal.onerror = function(err, url, line3) {
            fn(new Error(err + " (" + url + ":" + line3 + ")"));
            return !mocha2.options.allowUncaught;
          };
          uncaughtExceptionHandlers.push(fn);
        }
      };
      process2.listeners = function(e) {
        if (e === "uncaughtException") {
          return uncaughtExceptionHandlers;
        }
        return [];
      };
      mocha2.suite.removeAllListeners("pre-require");
      var immediateQueue = [];
      var immediateTimeout;
      function timeslice() {
        var immediateStart = new Date$1().getTime();
        while (immediateQueue.length && new Date$1().getTime() - immediateStart < 100) {
          immediateQueue.shift()();
        }
        if (immediateQueue.length) {
          immediateTimeout = setTimeout$1(timeslice, 0);
        } else {
          immediateTimeout = null;
        }
      }
      __name(timeslice, "timeslice");
      Mocha.Runner.immediately = function(callback) {
        immediateQueue.push(callback);
        if (!immediateTimeout) {
          immediateTimeout = setTimeout$1(timeslice, 0);
        }
      };
      mocha2.throwError = function(err) {
        uncaughtExceptionHandlers.forEach(function(fn) {
          fn(err);
        });
        throw err;
      };
      mocha2.ui = function(ui2) {
        Mocha.prototype.ui.call(this, ui2);
        this.suite.emit("pre-require", commonjsGlobal, null, this);
        return this;
      };
      mocha2.setup = function(opts) {
        if (typeof opts === "string") {
          opts = { ui: opts };
        }
        if (opts.delay === true) {
          this.delay();
        }
        var self2 = this;
        Object.keys(opts).filter(function(opt) {
          return opt !== "delay";
        }).forEach(function(opt) {
          if (Object.prototype.hasOwnProperty.call(opts, opt)) {
            self2[opt](opts[opt]);
          }
        });
        return this;
      };
      mocha2.run = function(fn) {
        var options = mocha2.options;
        mocha2.globals("location");
        var query = parseQuery(commonjsGlobal.location.search || "");
        if (query.grep) {
          mocha2.grep(query.grep);
        }
        if (query.fgrep) {
          mocha2.fgrep(query.fgrep);
        }
        if (query.invert) {
          mocha2.invert();
        }
        return Mocha.prototype.run.call(mocha2, function(err) {
          var document2 = commonjsGlobal.document;
          if (document2 && document2.getElementById("mocha") && options.noHighlighting !== true) {
            highlightTags("code");
          }
          if (fn) {
            fn(err);
          }
        });
      };
      Mocha.process = process2;
      commonjsGlobal.Mocha = Mocha;
      commonjsGlobal.mocha = mocha2;
      [
        "describe",
        "context",
        "it",
        "specify",
        "xdescribe",
        "xcontext",
        "xit",
        "xspecify",
        "before",
        "beforeEach",
        "afterEach",
        "after"
      ].forEach(function(key) {
        mocha2[key] = commonjsGlobal[key];
      });
      var browserEntry = mocha2;
      return browserEntry;
    });
  }
});

// node_modules/assertion-error/index.js
var require_assertion_error = __commonJS({
  "node_modules/assertion-error/index.js"(exports, module) {
    function exclude() {
      var excludes = [].slice.call(arguments);
      function excludeProps(res, obj) {
        Object.keys(obj).forEach(function(key) {
          if (!~excludes.indexOf(key))
            res[key] = obj[key];
        });
      }
      __name(excludeProps, "excludeProps");
      return /* @__PURE__ */ __name(function extendExclude() {
        var args = [].slice.call(arguments), i = 0, res = {};
        for (; i < args.length; i++) {
          excludeProps(res, args[i]);
        }
        return res;
      }, "extendExclude");
    }
    __name(exclude, "exclude");
    module.exports = AssertionError2;
    function AssertionError2(message, _props, ssf) {
      var extend = exclude("name", "message", "stack", "constructor", "toJSON"), props = extend(_props || {});
      this.message = message || "Unspecified AssertionError";
      this.showDiff = false;
      for (var key in props) {
        this[key] = props[key];
      }
      ssf = ssf || AssertionError2;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ssf);
      } else {
        try {
          throw new Error();
        } catch (e) {
          this.stack = e.stack;
        }
      }
    }
    __name(AssertionError2, "AssertionError");
    AssertionError2.prototype = Object.create(Error.prototype);
    AssertionError2.prototype.name = "AssertionError";
    AssertionError2.prototype.constructor = AssertionError2;
    AssertionError2.prototype.toJSON = function(stack) {
      var extend = exclude("constructor", "toJSON", "stack"), props = extend({ name: this.name }, this);
      if (false !== stack && this.stack) {
        props.stack = this.stack;
      }
      return props;
    };
  }
});

// node_modules/pathval/index.js
var require_pathval = __commonJS({
  "node_modules/pathval/index.js"(exports, module) {
    "use strict";
    function hasProperty(obj, name) {
      if (typeof obj === "undefined" || obj === null) {
        return false;
      }
      return name in Object(obj);
    }
    __name(hasProperty, "hasProperty");
    function parsePath(path) {
      var str = path.replace(/([^\\])\[/g, "$1.[");
      var parts = str.match(/(\\\.|[^.]+?)+/g);
      return parts.map(/* @__PURE__ */ __name(function mapMatches(value) {
        if (value === "constructor" || value === "__proto__" || value === "prototype") {
          return {};
        }
        var regexp = /^\[(\d+)\]$/;
        var mArr = regexp.exec(value);
        var parsed = null;
        if (mArr) {
          parsed = { i: parseFloat(mArr[1]) };
        } else {
          parsed = { p: value.replace(/\\([.[\]])/g, "$1") };
        }
        return parsed;
      }, "mapMatches"));
    }
    __name(parsePath, "parsePath");
    function internalGetPathValue(obj, parsed, pathDepth) {
      var temporaryValue = obj;
      var res = null;
      pathDepth = typeof pathDepth === "undefined" ? parsed.length : pathDepth;
      for (var i = 0; i < pathDepth; i++) {
        var part = parsed[i];
        if (temporaryValue) {
          if (typeof part.p === "undefined") {
            temporaryValue = temporaryValue[part.i];
          } else {
            temporaryValue = temporaryValue[part.p];
          }
          if (i === pathDepth - 1) {
            res = temporaryValue;
          }
        }
      }
      return res;
    }
    __name(internalGetPathValue, "internalGetPathValue");
    function internalSetPathValue(obj, val, parsed) {
      var tempObj = obj;
      var pathDepth = parsed.length;
      var part = null;
      for (var i = 0; i < pathDepth; i++) {
        var propName = null;
        var propVal = null;
        part = parsed[i];
        if (i === pathDepth - 1) {
          propName = typeof part.p === "undefined" ? part.i : part.p;
          tempObj[propName] = val;
        } else if (typeof part.p !== "undefined" && tempObj[part.p]) {
          tempObj = tempObj[part.p];
        } else if (typeof part.i !== "undefined" && tempObj[part.i]) {
          tempObj = tempObj[part.i];
        } else {
          var next2 = parsed[i + 1];
          propName = typeof part.p === "undefined" ? part.i : part.p;
          propVal = typeof next2.p === "undefined" ? [] : {};
          tempObj[propName] = propVal;
          tempObj = tempObj[propName];
        }
      }
    }
    __name(internalSetPathValue, "internalSetPathValue");
    function getPathInfo(obj, path) {
      var parsed = parsePath(path);
      var last = parsed[parsed.length - 1];
      var info = {
        parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
        name: last.p || last.i,
        value: internalGetPathValue(obj, parsed)
      };
      info.exists = hasProperty(info.parent, info.name);
      return info;
    }
    __name(getPathInfo, "getPathInfo");
    function getPathValue(obj, path) {
      var info = getPathInfo(obj, path);
      return info.value;
    }
    __name(getPathValue, "getPathValue");
    function setPathValue(obj, path, val) {
      var parsed = parsePath(path);
      internalSetPathValue(obj, val, parsed);
      return obj;
    }
    __name(setPathValue, "setPathValue");
    module.exports = {
      hasProperty,
      getPathInfo,
      getPathValue,
      setPathValue
    };
  }
});

// node_modules/chai/lib/chai/utils/flag.js
var require_flag = __commonJS({
  "node_modules/chai/lib/chai/utils/flag.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function flag(obj, key, value) {
      var flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
      if (arguments.length === 3) {
        flags[key] = value;
      } else {
        return flags[key];
      }
    }, "flag");
  }
});

// node_modules/chai/lib/chai/utils/test.js
var require_test = __commonJS({
  "node_modules/chai/lib/chai/utils/test.js"(exports, module) {
    var flag = require_flag();
    module.exports = /* @__PURE__ */ __name(function test(obj, args) {
      var negate = flag(obj, "negate"), expr = args[0];
      return negate ? !expr : expr;
    }, "test");
  }
});

// node_modules/type-detect/type-detect.js
var require_type_detect = __commonJS({
  "node_modules/type-detect/type-detect.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.typeDetect = factory();
    })(exports, function() {
      "use strict";
      var promiseExists = typeof Promise === "function";
      var globalObject = typeof self === "object" ? self : global;
      var symbolExists = typeof Symbol !== "undefined";
      var mapExists = typeof Map !== "undefined";
      var setExists = typeof Set !== "undefined";
      var weakMapExists = typeof WeakMap !== "undefined";
      var weakSetExists = typeof WeakSet !== "undefined";
      var dataViewExists = typeof DataView !== "undefined";
      var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== "undefined";
      var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== "undefined";
      var setEntriesExists = setExists && typeof Set.prototype.entries === "function";
      var mapEntriesExists = mapExists && typeof Map.prototype.entries === "function";
      var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Set()).entries());
      var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Map()).entries());
      var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === "function";
      var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
      var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === "function";
      var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(""[Symbol.iterator]());
      var toStringLeftSliceLength = 8;
      var toStringRightSliceLength = -1;
      function typeDetect(obj) {
        var typeofObj = typeof obj;
        if (typeofObj !== "object") {
          return typeofObj;
        }
        if (obj === null) {
          return "null";
        }
        if (obj === globalObject) {
          return "global";
        }
        if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
          return "Array";
        }
        if (typeof window === "object" && window !== null) {
          if (typeof window.location === "object" && obj === window.location) {
            return "Location";
          }
          if (typeof window.document === "object" && obj === window.document) {
            return "Document";
          }
          if (typeof window.navigator === "object") {
            if (typeof window.navigator.mimeTypes === "object" && obj === window.navigator.mimeTypes) {
              return "MimeTypeArray";
            }
            if (typeof window.navigator.plugins === "object" && obj === window.navigator.plugins) {
              return "PluginArray";
            }
          }
          if ((typeof window.HTMLElement === "function" || typeof window.HTMLElement === "object") && obj instanceof window.HTMLElement) {
            if (obj.tagName === "BLOCKQUOTE") {
              return "HTMLQuoteElement";
            }
            if (obj.tagName === "TD") {
              return "HTMLTableDataCellElement";
            }
            if (obj.tagName === "TH") {
              return "HTMLTableHeaderCellElement";
            }
          }
        }
        var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
        if (typeof stringTag === "string") {
          return stringTag;
        }
        var objPrototype = Object.getPrototypeOf(obj);
        if (objPrototype === RegExp.prototype) {
          return "RegExp";
        }
        if (objPrototype === Date.prototype) {
          return "Date";
        }
        if (promiseExists && objPrototype === Promise.prototype) {
          return "Promise";
        }
        if (setExists && objPrototype === Set.prototype) {
          return "Set";
        }
        if (mapExists && objPrototype === Map.prototype) {
          return "Map";
        }
        if (weakSetExists && objPrototype === WeakSet.prototype) {
          return "WeakSet";
        }
        if (weakMapExists && objPrototype === WeakMap.prototype) {
          return "WeakMap";
        }
        if (dataViewExists && objPrototype === DataView.prototype) {
          return "DataView";
        }
        if (mapExists && objPrototype === mapIteratorPrototype) {
          return "Map Iterator";
        }
        if (setExists && objPrototype === setIteratorPrototype) {
          return "Set Iterator";
        }
        if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
          return "Array Iterator";
        }
        if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
          return "String Iterator";
        }
        if (objPrototype === null) {
          return "Object";
        }
        return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
      }
      __name(typeDetect, "typeDetect");
      return typeDetect;
    });
  }
});

// node_modules/chai/lib/chai/utils/expectTypes.js
var require_expectTypes = __commonJS({
  "node_modules/chai/lib/chai/utils/expectTypes.js"(exports, module) {
    var AssertionError2 = require_assertion_error();
    var flag = require_flag();
    var type = require_type_detect();
    module.exports = /* @__PURE__ */ __name(function expectTypes(obj, types) {
      var flagMsg = flag(obj, "message");
      var ssfi = flag(obj, "ssfi");
      flagMsg = flagMsg ? flagMsg + ": " : "";
      obj = flag(obj, "object");
      types = types.map(function(t) {
        return t.toLowerCase();
      });
      types.sort();
      var str = types.map(function(t, index) {
        var art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a";
        var or = types.length > 1 && index === types.length - 1 ? "or " : "";
        return or + art + " " + t;
      }).join(", ");
      var objType = type(obj).toLowerCase();
      if (!types.some(function(expected) {
        return objType === expected;
      })) {
        throw new AssertionError2(
          flagMsg + "object tested must be " + str + ", but " + objType + " given",
          void 0,
          ssfi
        );
      }
    }, "expectTypes");
  }
});

// node_modules/chai/lib/chai/utils/getActual.js
var require_getActual = __commonJS({
  "node_modules/chai/lib/chai/utils/getActual.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function getActual(obj, args) {
      return args.length > 4 ? args[4] : obj._obj;
    }, "getActual");
  }
});

// node_modules/get-func-name/index.js
var require_get_func_name = __commonJS({
  "node_modules/get-func-name/index.js"(exports, module) {
    "use strict";
    var toString = Function.prototype.toString;
    var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
    var maxFunctionSourceLength = 512;
    function getFuncName(aFunc) {
      if (typeof aFunc !== "function") {
        return null;
      }
      var name = "";
      if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
        var functionSource = toString.call(aFunc);
        if (functionSource.indexOf("(") > maxFunctionSourceLength) {
          return name;
        }
        var match = functionSource.match(functionNameMatch);
        if (match) {
          name = match[1];
        }
      } else {
        name = aFunc.name;
      }
      return name;
    }
    __name(getFuncName, "getFuncName");
    module.exports = getFuncName;
  }
});

// (disabled):util
var require_util = __commonJS({
  "(disabled):util"() {
  }
});

// node_modules/loupe/loupe.js
var require_loupe = __commonJS({
  "node_modules/loupe/loupe.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.loupe = {}));
    })(exports, function(exports2) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = /* @__PURE__ */ __name(function(obj2) {
            return typeof obj2;
          }, "_typeof");
        } else {
          _typeof = /* @__PURE__ */ __name(function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          }, "_typeof");
        }
        return _typeof(obj);
      }
      __name(_typeof, "_typeof");
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      __name(_slicedToArray, "_slicedToArray");
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      __name(_arrayWithHoles, "_arrayWithHoles");
      function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      __name(_iterableToArrayLimit, "_iterableToArrayLimit");
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      __name(_unsupportedIterableToArray, "_unsupportedIterableToArray");
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
          arr2[i] = arr[i];
        return arr2;
      }
      __name(_arrayLikeToArray, "_arrayLikeToArray");
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      __name(_nonIterableRest, "_nonIterableRest");
      var ansiColors = {
        bold: ["1", "22"],
        dim: ["2", "22"],
        italic: ["3", "23"],
        underline: ["4", "24"],
        // 5 & 6 are blinking
        inverse: ["7", "27"],
        hidden: ["8", "28"],
        strike: ["9", "29"],
        // 10-20 are fonts
        // 21-29 are resets for 1-9
        black: ["30", "39"],
        red: ["31", "39"],
        green: ["32", "39"],
        yellow: ["33", "39"],
        blue: ["34", "39"],
        magenta: ["35", "39"],
        cyan: ["36", "39"],
        white: ["37", "39"],
        brightblack: ["30;1", "39"],
        brightred: ["31;1", "39"],
        brightgreen: ["32;1", "39"],
        brightyellow: ["33;1", "39"],
        brightblue: ["34;1", "39"],
        brightmagenta: ["35;1", "39"],
        brightcyan: ["36;1", "39"],
        brightwhite: ["37;1", "39"],
        grey: ["90", "39"]
      };
      var styles = {
        special: "cyan",
        number: "yellow",
        bigint: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        symbol: "green",
        date: "magenta",
        regexp: "red"
      };
      var truncator = "\u2026";
      function colorise(value, styleType) {
        var color = ansiColors[styles[styleType]] || ansiColors[styleType];
        if (!color) {
          return String(value);
        }
        return "\x1B[".concat(color[0], "m").concat(String(value), "\x1B[").concat(color[1], "m");
      }
      __name(colorise, "colorise");
      function normaliseOptions() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$showHidden = _ref.showHidden, showHidden = _ref$showHidden === void 0 ? false : _ref$showHidden, _ref$depth = _ref.depth, depth = _ref$depth === void 0 ? 2 : _ref$depth, _ref$colors = _ref.colors, colors = _ref$colors === void 0 ? false : _ref$colors, _ref$customInspect = _ref.customInspect, customInspect = _ref$customInspect === void 0 ? true : _ref$customInspect, _ref$showProxy = _ref.showProxy, showProxy = _ref$showProxy === void 0 ? false : _ref$showProxy, _ref$maxArrayLength = _ref.maxArrayLength, maxArrayLength = _ref$maxArrayLength === void 0 ? Infinity : _ref$maxArrayLength, _ref$breakLength = _ref.breakLength, breakLength = _ref$breakLength === void 0 ? Infinity : _ref$breakLength, _ref$seen = _ref.seen, seen = _ref$seen === void 0 ? [] : _ref$seen, _ref$truncate = _ref.truncate, truncate2 = _ref$truncate === void 0 ? Infinity : _ref$truncate, _ref$stylize = _ref.stylize, stylize = _ref$stylize === void 0 ? String : _ref$stylize;
        var options = {
          showHidden: Boolean(showHidden),
          depth: Number(depth),
          colors: Boolean(colors),
          customInspect: Boolean(customInspect),
          showProxy: Boolean(showProxy),
          maxArrayLength: Number(maxArrayLength),
          breakLength: Number(breakLength),
          truncate: Number(truncate2),
          seen,
          stylize
        };
        if (options.colors) {
          options.stylize = colorise;
        }
        return options;
      }
      __name(normaliseOptions, "normaliseOptions");
      function truncate(string, length2) {
        var tail = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : truncator;
        string = String(string);
        var tailLength = tail.length;
        var stringLength = string.length;
        if (tailLength > length2 && stringLength > tailLength) {
          return tail;
        }
        if (stringLength > length2 && stringLength > tailLength) {
          return "".concat(string.slice(0, length2 - tailLength)).concat(tail);
        }
        return string;
      }
      __name(truncate, "truncate");
      function inspectList(list, options, inspectItem) {
        var separator = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ", ";
        inspectItem = inspectItem || options.inspect;
        var size = list.length;
        if (size === 0)
          return "";
        var originalLength = options.truncate;
        var output = "";
        var peek2 = "";
        var truncated = "";
        for (var i = 0; i < size; i += 1) {
          var last = i + 1 === list.length;
          var secondToLast = i + 2 === list.length;
          truncated = "".concat(truncator, "(").concat(list.length - i, ")");
          var value = list[i];
          options.truncate = originalLength - output.length - (last ? 0 : separator.length);
          var string = peek2 || inspectItem(value, options) + (last ? "" : separator);
          var nextLength = output.length + string.length;
          var truncatedLength = nextLength + truncated.length;
          if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) {
            break;
          }
          if (!last && !secondToLast && truncatedLength > originalLength) {
            break;
          }
          peek2 = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
          if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek2.length > originalLength) {
            break;
          }
          output += string;
          if (!last && !secondToLast && nextLength + peek2.length >= originalLength) {
            truncated = "".concat(truncator, "(").concat(list.length - i - 1, ")");
            break;
          }
          truncated = "";
        }
        return "".concat(output).concat(truncated);
      }
      __name(inspectList, "inspectList");
      function quoteComplexKey(key) {
        if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
          return key;
        }
        return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      }
      __name(quoteComplexKey, "quoteComplexKey");
      function inspectProperty(_ref2, options) {
        var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], value = _ref3[1];
        options.truncate -= 2;
        if (typeof key === "string") {
          key = quoteComplexKey(key);
        } else if (typeof key !== "number") {
          key = "[".concat(options.inspect(key, options), "]");
        }
        options.truncate -= key.length;
        value = options.inspect(value, options);
        return "".concat(key, ": ").concat(value);
      }
      __name(inspectProperty, "inspectProperty");
      function inspectArray(array, options) {
        var nonIndexProperties = Object.keys(array).slice(array.length);
        if (!array.length && !nonIndexProperties.length)
          return "[]";
        options.truncate -= 4;
        var listContents = inspectList(array, options);
        options.truncate -= listContents.length;
        var propertyContents = "";
        if (nonIndexProperties.length) {
          propertyContents = inspectList(nonIndexProperties.map(function(key) {
            return [key, array[key]];
          }), options, inspectProperty);
        }
        return "[ ".concat(listContents).concat(propertyContents ? ", ".concat(propertyContents) : "", " ]");
      }
      __name(inspectArray, "inspectArray");
      var toString = Function.prototype.toString;
      var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
      var maxFunctionSourceLength = 512;
      function getFuncName(aFunc) {
        if (typeof aFunc !== "function") {
          return null;
        }
        var name = "";
        if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
          var functionSource = toString.call(aFunc);
          if (functionSource.indexOf("(") > maxFunctionSourceLength) {
            return name;
          }
          var match = functionSource.match(functionNameMatch);
          if (match) {
            name = match[1];
          }
        } else {
          name = aFunc.name;
        }
        return name;
      }
      __name(getFuncName, "getFuncName");
      var getFuncName_1 = getFuncName;
      var getArrayName = /* @__PURE__ */ __name(function getArrayName2(array) {
        if (typeof Buffer === "function" && array instanceof Buffer) {
          return "Buffer";
        }
        if (array[Symbol.toStringTag]) {
          return array[Symbol.toStringTag];
        }
        return getFuncName_1(array.constructor);
      }, "getArrayName");
      function inspectTypedArray(array, options) {
        var name = getArrayName(array);
        options.truncate -= name.length + 4;
        var nonIndexProperties = Object.keys(array).slice(array.length);
        if (!array.length && !nonIndexProperties.length)
          return "".concat(name, "[]");
        var output = "";
        for (var i = 0; i < array.length; i++) {
          var string = "".concat(options.stylize(truncate(array[i], options.truncate), "number")).concat(i === array.length - 1 ? "" : ", ");
          options.truncate -= string.length;
          if (array[i] !== array.length && options.truncate <= 3) {
            output += "".concat(truncator, "(").concat(array.length - array[i] + 1, ")");
            break;
          }
          output += string;
        }
        var propertyContents = "";
        if (nonIndexProperties.length) {
          propertyContents = inspectList(nonIndexProperties.map(function(key) {
            return [key, array[key]];
          }), options, inspectProperty);
        }
        return "".concat(name, "[ ").concat(output).concat(propertyContents ? ", ".concat(propertyContents) : "", " ]");
      }
      __name(inspectTypedArray, "inspectTypedArray");
      function inspectDate(dateObject, options) {
        var stringRepresentation = dateObject.toJSON();
        if (stringRepresentation === null) {
          return "Invalid Date";
        }
        var split = stringRepresentation.split("T");
        var date = split[0];
        return options.stylize("".concat(date, "T").concat(truncate(split[1], options.truncate - date.length - 1)), "date");
      }
      __name(inspectDate, "inspectDate");
      function inspectFunction(func, options) {
        var name = getFuncName_1(func);
        if (!name) {
          return options.stylize("[Function]", "special");
        }
        return options.stylize("[Function ".concat(truncate(name, options.truncate - 11), "]"), "special");
      }
      __name(inspectFunction, "inspectFunction");
      function inspectMapEntry(_ref, options) {
        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
        options.truncate -= 4;
        key = options.inspect(key, options);
        options.truncate -= key.length;
        value = options.inspect(value, options);
        return "".concat(key, " => ").concat(value);
      }
      __name(inspectMapEntry, "inspectMapEntry");
      function mapToEntries(map) {
        var entries = [];
        map.forEach(function(value, key) {
          entries.push([key, value]);
        });
        return entries;
      }
      __name(mapToEntries, "mapToEntries");
      function inspectMap(map, options) {
        var size = map.size - 1;
        if (size <= 0) {
          return "Map{}";
        }
        options.truncate -= 7;
        return "Map{ ".concat(inspectList(mapToEntries(map), options, inspectMapEntry), " }");
      }
      __name(inspectMap, "inspectMap");
      var isNaN2 = Number.isNaN || function(i) {
        return i !== i;
      };
      function inspectNumber(number, options) {
        if (isNaN2(number)) {
          return options.stylize("NaN", "number");
        }
        if (number === Infinity) {
          return options.stylize("Infinity", "number");
        }
        if (number === -Infinity) {
          return options.stylize("-Infinity", "number");
        }
        if (number === 0) {
          return options.stylize(1 / number === Infinity ? "+0" : "-0", "number");
        }
        return options.stylize(truncate(number, options.truncate), "number");
      }
      __name(inspectNumber, "inspectNumber");
      function inspectBigInt(number, options) {
        var nums = truncate(number.toString(), options.truncate - 1);
        if (nums !== truncator)
          nums += "n";
        return options.stylize(nums, "bigint");
      }
      __name(inspectBigInt, "inspectBigInt");
      function inspectRegExp(value, options) {
        var flags = value.toString().split("/")[2];
        var sourceLength = options.truncate - (2 + flags.length);
        var source = value.source;
        return options.stylize("/".concat(truncate(source, sourceLength), "/").concat(flags), "regexp");
      }
      __name(inspectRegExp, "inspectRegExp");
      function arrayFromSet(set) {
        var values = [];
        set.forEach(function(value) {
          values.push(value);
        });
        return values;
      }
      __name(arrayFromSet, "arrayFromSet");
      function inspectSet(set, options) {
        if (set.size === 0)
          return "Set{}";
        options.truncate -= 7;
        return "Set{ ".concat(inspectList(arrayFromSet(set), options), " }");
      }
      __name(inspectSet, "inspectSet");
      var stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g");
      var escapeCharacters = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "'": "\\'",
        "\\": "\\\\"
      };
      var hex = 16;
      var unicodeLength = 4;
      function escape(char2) {
        return escapeCharacters[char2] || "\\u".concat("0000".concat(char2.charCodeAt(0).toString(hex)).slice(-unicodeLength));
      }
      __name(escape, "escape");
      function inspectString(string, options) {
        if (stringEscapeChars.test(string)) {
          string = string.replace(stringEscapeChars, escape);
        }
        return options.stylize("'".concat(truncate(string, options.truncate - 2), "'"), "string");
      }
      __name(inspectString, "inspectString");
      function inspectSymbol(value) {
        if ("description" in Symbol.prototype) {
          return value.description ? "Symbol(".concat(value.description, ")") : "Symbol()";
        }
        return value.toString();
      }
      __name(inspectSymbol, "inspectSymbol");
      var getPromiseValue = /* @__PURE__ */ __name(function getPromiseValue2() {
        return "Promise{\u2026}";
      }, "getPromiseValue");
      try {
        var _process$binding = process.binding("util"), getPromiseDetails = _process$binding.getPromiseDetails, kPending = _process$binding.kPending, kRejected = _process$binding.kRejected;
        if (Array.isArray(getPromiseDetails(Promise.resolve()))) {
          getPromiseValue = /* @__PURE__ */ __name(function getPromiseValue2(value, options) {
            var _getPromiseDetails = getPromiseDetails(value), _getPromiseDetails2 = _slicedToArray(_getPromiseDetails, 2), state = _getPromiseDetails2[0], innerValue = _getPromiseDetails2[1];
            if (state === kPending) {
              return "Promise{<pending>}";
            }
            return "Promise".concat(state === kRejected ? "!" : "", "{").concat(options.inspect(innerValue, options), "}");
          }, "getPromiseValue");
        }
      } catch (notNode) {
      }
      var inspectPromise = getPromiseValue;
      function inspectObject(object, options) {
        var properties = Object.getOwnPropertyNames(object);
        var symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
        if (properties.length === 0 && symbols.length === 0) {
          return "{}";
        }
        options.truncate -= 4;
        options.seen = options.seen || [];
        if (options.seen.indexOf(object) >= 0) {
          return "[Circular]";
        }
        options.seen.push(object);
        var propertyContents = inspectList(properties.map(function(key) {
          return [key, object[key]];
        }), options, inspectProperty);
        var symbolContents = inspectList(symbols.map(function(key) {
          return [key, object[key]];
        }), options, inspectProperty);
        options.seen.pop();
        var sep = "";
        if (propertyContents && symbolContents) {
          sep = ", ";
        }
        return "{ ".concat(propertyContents).concat(sep).concat(symbolContents, " }");
      }
      __name(inspectObject, "inspectObject");
      var toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag ? Symbol.toStringTag : false;
      function inspectClass(value, options) {
        var name = "";
        if (toStringTag && toStringTag in value) {
          name = value[toStringTag];
        }
        name = name || getFuncName_1(value.constructor);
        if (!name || name === "_class") {
          name = "<Anonymous Class>";
        }
        options.truncate -= name.length;
        return "".concat(name).concat(inspectObject(value, options));
      }
      __name(inspectClass, "inspectClass");
      function inspectArguments(args, options) {
        if (args.length === 0)
          return "Arguments[]";
        options.truncate -= 13;
        return "Arguments[ ".concat(inspectList(args, options), " ]");
      }
      __name(inspectArguments, "inspectArguments");
      var errorKeys = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description"];
      function inspectObject$1(error, options) {
        var properties = Object.getOwnPropertyNames(error).filter(function(key) {
          return errorKeys.indexOf(key) === -1;
        });
        var name = error.name;
        options.truncate -= name.length;
        var message = "";
        if (typeof error.message === "string") {
          message = truncate(error.message, options.truncate);
        } else {
          properties.unshift("message");
        }
        message = message ? ": ".concat(message) : "";
        options.truncate -= message.length + 5;
        var propertyContents = inspectList(properties.map(function(key) {
          return [key, error[key]];
        }), options, inspectProperty);
        return "".concat(name).concat(message).concat(propertyContents ? " { ".concat(propertyContents, " }") : "");
      }
      __name(inspectObject$1, "inspectObject$1");
      function inspectAttribute(_ref, options) {
        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
        options.truncate -= 3;
        if (!value) {
          return "".concat(options.stylize(key, "yellow"));
        }
        return "".concat(options.stylize(key, "yellow"), "=").concat(options.stylize('"'.concat(value, '"'), "string"));
      }
      __name(inspectAttribute, "inspectAttribute");
      function inspectHTMLCollection(collection, options) {
        return inspectList(collection, options, inspectHTML, "\n");
      }
      __name(inspectHTMLCollection, "inspectHTMLCollection");
      function inspectHTML(element, options) {
        var properties = element.getAttributeNames();
        var name = element.tagName.toLowerCase();
        var head = options.stylize("<".concat(name), "special");
        var headClose = options.stylize(">", "special");
        var tail = options.stylize("</".concat(name, ">"), "special");
        options.truncate -= name.length * 2 + 5;
        var propertyContents = "";
        if (properties.length > 0) {
          propertyContents += " ";
          propertyContents += inspectList(properties.map(function(key) {
            return [key, element.getAttribute(key)];
          }), options, inspectAttribute, " ");
        }
        options.truncate -= propertyContents.length;
        var truncate2 = options.truncate;
        var children = inspectHTMLCollection(element.children, options);
        if (children && children.length > truncate2) {
          children = "".concat(truncator, "(").concat(element.children.length, ")");
        }
        return "".concat(head).concat(propertyContents).concat(headClose).concat(children).concat(tail);
      }
      __name(inspectHTML, "inspectHTML");
      var symbolsSupported = typeof Symbol === "function" && typeof Symbol.for === "function";
      var chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
      var nodeInspect = false;
      try {
        var nodeUtil = require_util();
        nodeInspect = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
      } catch (noNodeInspect) {
        nodeInspect = false;
      }
      function FakeMap() {
        this.key = "chai/loupe__" + Math.random() + Date.now();
      }
      __name(FakeMap, "FakeMap");
      FakeMap.prototype = {
        // eslint-disable-next-line object-shorthand
        get: /* @__PURE__ */ __name(function get(key) {
          return key[this.key];
        }, "get"),
        // eslint-disable-next-line object-shorthand
        has: /* @__PURE__ */ __name(function has(key) {
          return this.key in key;
        }, "has"),
        // eslint-disable-next-line object-shorthand
        set: /* @__PURE__ */ __name(function set(key, value) {
          if (Object.isExtensible(key)) {
            Object.defineProperty(key, this.key, {
              // eslint-disable-next-line object-shorthand
              value,
              configurable: true
            });
          }
        }, "set")
      };
      var constructorMap = new (typeof WeakMap === "function" ? WeakMap : FakeMap)();
      var stringTagMap = {};
      var baseTypesMap = {
        undefined: /* @__PURE__ */ __name(function undefined$1(value, options) {
          return options.stylize("undefined", "undefined");
        }, "undefined$1"),
        null: /* @__PURE__ */ __name(function _null(value, options) {
          return options.stylize(null, "null");
        }, "_null"),
        boolean: /* @__PURE__ */ __name(function boolean(value, options) {
          return options.stylize(value, "boolean");
        }, "boolean"),
        Boolean: /* @__PURE__ */ __name(function Boolean2(value, options) {
          return options.stylize(value, "boolean");
        }, "Boolean"),
        number: inspectNumber,
        Number: inspectNumber,
        bigint: inspectBigInt,
        BigInt: inspectBigInt,
        string: inspectString,
        String: inspectString,
        function: inspectFunction,
        Function: inspectFunction,
        symbol: inspectSymbol,
        // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
        Symbol: inspectSymbol,
        Array: inspectArray,
        Date: inspectDate,
        Map: inspectMap,
        Set: inspectSet,
        RegExp: inspectRegExp,
        Promise: inspectPromise,
        // WeakSet, WeakMap are totally opaque to us
        WeakSet: /* @__PURE__ */ __name(function WeakSet2(value, options) {
          return options.stylize("WeakSet{\u2026}", "special");
        }, "WeakSet"),
        WeakMap: /* @__PURE__ */ __name(function WeakMap2(value, options) {
          return options.stylize("WeakMap{\u2026}", "special");
        }, "WeakMap"),
        Arguments: inspectArguments,
        Int8Array: inspectTypedArray,
        Uint8Array: inspectTypedArray,
        Uint8ClampedArray: inspectTypedArray,
        Int16Array: inspectTypedArray,
        Uint16Array: inspectTypedArray,
        Int32Array: inspectTypedArray,
        Uint32Array: inspectTypedArray,
        Float32Array: inspectTypedArray,
        Float64Array: inspectTypedArray,
        Generator: /* @__PURE__ */ __name(function Generator() {
          return "";
        }, "Generator"),
        DataView: /* @__PURE__ */ __name(function DataView2() {
          return "";
        }, "DataView"),
        ArrayBuffer: /* @__PURE__ */ __name(function ArrayBuffer2() {
          return "";
        }, "ArrayBuffer"),
        Error: inspectObject$1,
        HTMLCollection: inspectHTMLCollection,
        NodeList: inspectHTMLCollection
      };
      var inspectCustom = /* @__PURE__ */ __name(function inspectCustom2(value, options, type) {
        if (chaiInspect in value && typeof value[chaiInspect] === "function") {
          return value[chaiInspect](options);
        }
        if (nodeInspect && nodeInspect in value && typeof value[nodeInspect] === "function") {
          return value[nodeInspect](options.depth, options);
        }
        if ("inspect" in value && typeof value.inspect === "function") {
          return value.inspect(options.depth, options);
        }
        if ("constructor" in value && constructorMap.has(value.constructor)) {
          return constructorMap.get(value.constructor)(value, options);
        }
        if (stringTagMap[type]) {
          return stringTagMap[type](value, options);
        }
        return "";
      }, "inspectCustom");
      var toString$1 = Object.prototype.toString;
      function inspect(value, options) {
        options = normaliseOptions(options);
        options.inspect = inspect;
        var _options = options, customInspect = _options.customInspect;
        var type = value === null ? "null" : _typeof(value);
        if (type === "object") {
          type = toString$1.call(value).slice(8, -1);
        }
        if (baseTypesMap[type]) {
          return baseTypesMap[type](value, options);
        }
        if (customInspect && value) {
          var output = inspectCustom(value, options, type);
          if (output) {
            if (typeof output === "string")
              return output;
            return inspect(output, options);
          }
        }
        var proto = value ? Object.getPrototypeOf(value) : false;
        if (proto === Object.prototype || proto === null) {
          return inspectObject(value, options);
        }
        if (value && typeof HTMLElement === "function" && value instanceof HTMLElement) {
          return inspectHTML(value, options);
        }
        if ("constructor" in value) {
          if (value.constructor !== Object) {
            return inspectClass(value, options);
          }
          return inspectObject(value, options);
        }
        if (value === Object(value)) {
          return inspectObject(value, options);
        }
        return options.stylize(String(value), type);
      }
      __name(inspect, "inspect");
      function registerConstructor(constructor, inspector) {
        if (constructorMap.has(constructor)) {
          return false;
        }
        constructorMap.set(constructor, inspector);
        return true;
      }
      __name(registerConstructor, "registerConstructor");
      function registerStringTag(stringTag, inspector) {
        if (stringTag in stringTagMap) {
          return false;
        }
        stringTagMap[stringTag] = inspector;
        return true;
      }
      __name(registerStringTag, "registerStringTag");
      var custom = chaiInspect;
      exports2.custom = custom;
      exports2.default = inspect;
      exports2.inspect = inspect;
      exports2.registerConstructor = registerConstructor;
      exports2.registerStringTag = registerStringTag;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/chai/lib/chai/config.js
var require_config = __commonJS({
  "node_modules/chai/lib/chai/config.js"(exports, module) {
    module.exports = {
      /**
       * ### config.includeStack
       *
       * User configurable property, influences whether stack trace
       * is included in Assertion error message. Default of false
       * suppresses stack trace in the error message.
       *
       *     chai.config.includeStack = true;  // enable stack on error
       *
       * @param {Boolean}
       * @api public
       */
      includeStack: false,
      /**
       * ### config.showDiff
       *
       * User configurable property, influences whether or not
       * the `showDiff` flag should be included in the thrown
       * AssertionErrors. `false` will always be `false`; `true`
       * will be true when the assertion has requested a diff
       * be shown.
       *
       * @param {Boolean}
       * @api public
       */
      showDiff: true,
      /**
       * ### config.truncateThreshold
       *
       * User configurable property, sets length threshold for actual and
       * expected values in assertion errors. If this threshold is exceeded, for
       * example for large data structures, the value is replaced with something
       * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
       *
       * Set it to zero if you want to disable truncating altogether.
       *
       * This is especially userful when doing assertions on arrays: having this
       * set to a reasonable large value makes the failure messages readily
       * inspectable.
       *
       *     chai.config.truncateThreshold = 0;  // disable truncating
       *
       * @param {Number}
       * @api public
       */
      truncateThreshold: 40,
      /**
       * ### config.useProxy
       *
       * User configurable property, defines if chai will use a Proxy to throw
       * an error when a non-existent property is read, which protects users
       * from typos when using property-based assertions.
       *
       * Set it to false if you want to disable this feature.
       *
       *     chai.config.useProxy = false;  // disable use of Proxy
       *
       * This feature is automatically disabled regardless of this config value
       * in environments that don't support proxies.
       *
       * @param {Boolean}
       * @api public
       */
      useProxy: true,
      /**
       * ### config.proxyExcludedKeys
       *
       * User configurable property, defines which properties should be ignored
       * instead of throwing an error if they do not exist on the assertion.
       * This is only applied if the environment Chai is running in supports proxies and
       * if the `useProxy` configuration setting is enabled.
       * By default, `then` and `inspect` will not throw an error if they do not exist on the
       * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
       * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
       *
       *     // By default these keys will not throw an error if they do not exist on the assertion object
       *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
       *
       * @param {Array}
       * @api public
       */
      proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"],
      /**
       * ### config.deepEqual
       *
       * User configurable property, defines which a custom function to use for deepEqual
       * comparisons.
       * By default, the function used is the one from the `deep-eql` package without custom comparator.
       *
       *     // use a custom comparator
       *     chai.config.deepEqual = (expected, actual) => {
       *        return chai.util.eql(expected, actual, {
       *           comparator: (expected, actual) => {
       *              // for non number comparison, use the default behavior
       *              if(typeof expected !== 'number') return null;
       *              // allow a difference of 10 between compared numbers
       *              return typeof actual === 'number' && Math.abs(actual - expected) < 10
       *           }
       *        })
       *     };
       *
       * @param {Function}
       * @api public
       */
      deepEqual: null
    };
  }
});

// node_modules/chai/lib/chai/utils/inspect.js
var require_inspect = __commonJS({
  "node_modules/chai/lib/chai/utils/inspect.js"(exports, module) {
    var getName = require_get_func_name();
    var loupe = require_loupe();
    var config2 = require_config();
    module.exports = inspect;
    function inspect(obj, showHidden, depth, colors) {
      var options = {
        colors,
        depth: typeof depth === "undefined" ? 2 : depth,
        showHidden,
        truncate: config2.truncateThreshold ? config2.truncateThreshold : Infinity
      };
      return loupe.inspect(obj, options);
    }
    __name(inspect, "inspect");
  }
});

// node_modules/chai/lib/chai/utils/objDisplay.js
var require_objDisplay = __commonJS({
  "node_modules/chai/lib/chai/utils/objDisplay.js"(exports, module) {
    var inspect = require_inspect();
    var config2 = require_config();
    module.exports = /* @__PURE__ */ __name(function objDisplay(obj) {
      var str = inspect(obj), type = Object.prototype.toString.call(obj);
      if (config2.truncateThreshold && str.length >= config2.truncateThreshold) {
        if (type === "[object Function]") {
          return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
        } else if (type === "[object Array]") {
          return "[ Array(" + obj.length + ") ]";
        } else if (type === "[object Object]") {
          var keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(", ") + ", ..." : keys.join(", ");
          return "{ Object (" + kstr + ") }";
        } else {
          return str;
        }
      } else {
        return str;
      }
    }, "objDisplay");
  }
});

// node_modules/chai/lib/chai/utils/getMessage.js
var require_getMessage = __commonJS({
  "node_modules/chai/lib/chai/utils/getMessage.js"(exports, module) {
    var flag = require_flag();
    var getActual = require_getActual();
    var objDisplay = require_objDisplay();
    module.exports = /* @__PURE__ */ __name(function getMessage(obj, args) {
      var negate = flag(obj, "negate"), val = flag(obj, "object"), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, "message");
      if (typeof msg === "function")
        msg = msg();
      msg = msg || "";
      msg = msg.replace(/#\{this\}/g, function() {
        return objDisplay(val);
      }).replace(/#\{act\}/g, function() {
        return objDisplay(actual);
      }).replace(/#\{exp\}/g, function() {
        return objDisplay(expected);
      });
      return flagMsg ? flagMsg + ": " + msg : msg;
    }, "getMessage");
  }
});

// node_modules/chai/lib/chai/utils/transferFlags.js
var require_transferFlags = __commonJS({
  "node_modules/chai/lib/chai/utils/transferFlags.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function transferFlags(assertion, object, includeAll) {
      var flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
      if (!object.__flags) {
        object.__flags = /* @__PURE__ */ Object.create(null);
      }
      includeAll = arguments.length === 3 ? includeAll : true;
      for (var flag in flags) {
        if (includeAll || flag !== "object" && flag !== "ssfi" && flag !== "lockSsfi" && flag != "message") {
          object.__flags[flag] = flags[flag];
        }
      }
    }, "transferFlags");
  }
});

// node_modules/deep-eql/index.js
var require_deep_eql = __commonJS({
  "node_modules/deep-eql/index.js"(exports, module) {
    "use strict";
    var type = require_type_detect();
    function FakeMap() {
      this._key = "chai/deep-eql__" + Math.random() + Date.now();
    }
    __name(FakeMap, "FakeMap");
    FakeMap.prototype = {
      get: /* @__PURE__ */ __name(function get(key) {
        return key[this._key];
      }, "get"),
      set: /* @__PURE__ */ __name(function set(key, value) {
        if (Object.isExtensible(key)) {
          Object.defineProperty(key, this._key, {
            value,
            configurable: true
          });
        }
      }, "set")
    };
    var MemoizeMap = typeof WeakMap === "function" ? WeakMap : FakeMap;
    function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
      if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
        return null;
      }
      var leftHandMap = memoizeMap.get(leftHandOperand);
      if (leftHandMap) {
        var result = leftHandMap.get(rightHandOperand);
        if (typeof result === "boolean") {
          return result;
        }
      }
      return null;
    }
    __name(memoizeCompare, "memoizeCompare");
    function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
      if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
        return;
      }
      var leftHandMap = memoizeMap.get(leftHandOperand);
      if (leftHandMap) {
        leftHandMap.set(rightHandOperand, result);
      } else {
        leftHandMap = new MemoizeMap();
        leftHandMap.set(rightHandOperand, result);
        memoizeMap.set(leftHandOperand, leftHandMap);
      }
    }
    __name(memoizeSet, "memoizeSet");
    module.exports = deepEqual;
    module.exports.MemoizeMap = MemoizeMap;
    function deepEqual(leftHandOperand, rightHandOperand, options) {
      if (options && options.comparator) {
        return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
      }
      var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
      if (simpleResult !== null) {
        return simpleResult;
      }
      return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    }
    __name(deepEqual, "deepEqual");
    function simpleEqual(leftHandOperand, rightHandOperand) {
      if (leftHandOperand === rightHandOperand) {
        return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
      }
      if (leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
      rightHandOperand !== rightHandOperand) {
        return true;
      }
      if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
        return false;
      }
      return null;
    }
    __name(simpleEqual, "simpleEqual");
    function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
      options = options || {};
      options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
      var comparator = options && options.comparator;
      var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
      if (memoizeResultLeft !== null) {
        return memoizeResultLeft;
      }
      var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
      if (memoizeResultRight !== null) {
        return memoizeResultRight;
      }
      if (comparator) {
        var comparatorResult = comparator(leftHandOperand, rightHandOperand);
        if (comparatorResult === false || comparatorResult === true) {
          memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
          return comparatorResult;
        }
        var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
        if (simpleResult !== null) {
          return simpleResult;
        }
      }
      var leftHandType = type(leftHandOperand);
      if (leftHandType !== type(rightHandOperand)) {
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
        return false;
      }
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
      var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
      return result;
    }
    __name(extensiveDeepEqual, "extensiveDeepEqual");
    function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
      switch (leftHandType) {
        case "String":
        case "Number":
        case "Boolean":
        case "Date":
          return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
        case "Promise":
        case "Symbol":
        case "function":
        case "WeakMap":
        case "WeakSet":
          return leftHandOperand === rightHandOperand;
        case "Error":
          return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
        case "Arguments":
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "Array":
          return iterableEqual(leftHandOperand, rightHandOperand, options);
        case "RegExp":
          return regexpEqual(leftHandOperand, rightHandOperand);
        case "Generator":
          return generatorEqual(leftHandOperand, rightHandOperand, options);
        case "DataView":
          return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
        case "ArrayBuffer":
          return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
        case "Set":
          return entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Map":
          return entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.Instant":
        case "Temporal.ZonedDateTime":
        case "Temporal.PlainYearMonth":
        case "Temporal.PlainMonthDay":
          return leftHandOperand.equals(rightHandOperand);
        case "Temporal.Duration":
          return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
        case "Temporal.TimeZone":
        case "Temporal.Calendar":
          return leftHandOperand.toString() === rightHandOperand.toString();
        default:
          return objectEqual(leftHandOperand, rightHandOperand, options);
      }
    }
    __name(extensiveDeepEqualByType, "extensiveDeepEqualByType");
    function regexpEqual(leftHandOperand, rightHandOperand) {
      return leftHandOperand.toString() === rightHandOperand.toString();
    }
    __name(regexpEqual, "regexpEqual");
    function entriesEqual(leftHandOperand, rightHandOperand, options) {
      if (leftHandOperand.size !== rightHandOperand.size) {
        return false;
      }
      if (leftHandOperand.size === 0) {
        return true;
      }
      var leftHandItems = [];
      var rightHandItems = [];
      leftHandOperand.forEach(/* @__PURE__ */ __name(function gatherEntries(key, value) {
        leftHandItems.push([key, value]);
      }, "gatherEntries"));
      rightHandOperand.forEach(/* @__PURE__ */ __name(function gatherEntries(key, value) {
        rightHandItems.push([key, value]);
      }, "gatherEntries"));
      return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
    }
    __name(entriesEqual, "entriesEqual");
    function iterableEqual(leftHandOperand, rightHandOperand, options) {
      var length2 = leftHandOperand.length;
      if (length2 !== rightHandOperand.length) {
        return false;
      }
      if (length2 === 0) {
        return true;
      }
      var index = -1;
      while (++index < length2) {
        if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
          return false;
        }
      }
      return true;
    }
    __name(iterableEqual, "iterableEqual");
    function generatorEqual(leftHandOperand, rightHandOperand, options) {
      return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
    }
    __name(generatorEqual, "generatorEqual");
    function hasIteratorFunction(target) {
      return typeof Symbol !== "undefined" && typeof target === "object" && typeof Symbol.iterator !== "undefined" && typeof target[Symbol.iterator] === "function";
    }
    __name(hasIteratorFunction, "hasIteratorFunction");
    function getIteratorEntries(target) {
      if (hasIteratorFunction(target)) {
        try {
          return getGeneratorEntries(target[Symbol.iterator]());
        } catch (iteratorError) {
          return [];
        }
      }
      return [];
    }
    __name(getIteratorEntries, "getIteratorEntries");
    function getGeneratorEntries(generator) {
      var generatorResult = generator.next();
      var accumulator = [generatorResult.value];
      while (generatorResult.done === false) {
        generatorResult = generator.next();
        accumulator.push(generatorResult.value);
      }
      return accumulator;
    }
    __name(getGeneratorEntries, "getGeneratorEntries");
    function getEnumerableKeys(target) {
      var keys = [];
      for (var key in target) {
        keys.push(key);
      }
      return keys;
    }
    __name(getEnumerableKeys, "getEnumerableKeys");
    function getEnumerableSymbols(target) {
      var keys = [];
      var allKeys = Object.getOwnPropertySymbols(target);
      for (var i = 0; i < allKeys.length; i += 1) {
        var key = allKeys[i];
        if (Object.getOwnPropertyDescriptor(target, key).enumerable) {
          keys.push(key);
        }
      }
      return keys;
    }
    __name(getEnumerableSymbols, "getEnumerableSymbols");
    function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
      var length2 = keys.length;
      if (length2 === 0) {
        return true;
      }
      for (var i = 0; i < length2; i += 1) {
        if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
          return false;
        }
      }
      return true;
    }
    __name(keysEqual, "keysEqual");
    function objectEqual(leftHandOperand, rightHandOperand, options) {
      var leftHandKeys = getEnumerableKeys(leftHandOperand);
      var rightHandKeys = getEnumerableKeys(rightHandOperand);
      var leftHandSymbols = getEnumerableSymbols(leftHandOperand);
      var rightHandSymbols = getEnumerableSymbols(rightHandOperand);
      leftHandKeys = leftHandKeys.concat(leftHandSymbols);
      rightHandKeys = rightHandKeys.concat(rightHandSymbols);
      if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
        if (iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort()) === false) {
          return false;
        }
        return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
      }
      var leftHandEntries = getIteratorEntries(leftHandOperand);
      var rightHandEntries = getIteratorEntries(rightHandOperand);
      if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
        leftHandEntries.sort();
        rightHandEntries.sort();
        return iterableEqual(leftHandEntries, rightHandEntries, options);
      }
      if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
        return true;
      }
      return false;
    }
    __name(objectEqual, "objectEqual");
    function isPrimitive(value) {
      return value === null || typeof value !== "object";
    }
    __name(isPrimitive, "isPrimitive");
    function mapSymbols(arr) {
      return arr.map(/* @__PURE__ */ __name(function mapSymbol(entry) {
        if (typeof entry === "symbol") {
          return entry.toString();
        }
        return entry;
      }, "mapSymbol"));
    }
    __name(mapSymbols, "mapSymbols");
  }
});

// node_modules/chai/lib/chai/utils/isProxyEnabled.js
var require_isProxyEnabled = __commonJS({
  "node_modules/chai/lib/chai/utils/isProxyEnabled.js"(exports, module) {
    var config2 = require_config();
    module.exports = /* @__PURE__ */ __name(function isProxyEnabled() {
      return config2.useProxy && typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
    }, "isProxyEnabled");
  }
});

// node_modules/chai/lib/chai/utils/addProperty.js
var require_addProperty = __commonJS({
  "node_modules/chai/lib/chai/utils/addProperty.js"(exports, module) {
    var chai2 = require_chai();
    var flag = require_flag();
    var isProxyEnabled = require_isProxyEnabled();
    var transferFlags = require_transferFlags();
    module.exports = /* @__PURE__ */ __name(function addProperty(ctx, name, getter) {
      getter = getter === void 0 ? function() {
      } : getter;
      Object.defineProperty(
        ctx,
        name,
        {
          get: /* @__PURE__ */ __name(function propertyGetter() {
            if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
              flag(this, "ssfi", propertyGetter);
            }
            var result = getter.call(this);
            if (result !== void 0)
              return result;
            var newAssertion = new chai2.Assertion();
            transferFlags(this, newAssertion);
            return newAssertion;
          }, "propertyGetter"),
          configurable: true
        }
      );
    }, "addProperty");
  }
});

// node_modules/chai/lib/chai/utils/addLengthGuard.js
var require_addLengthGuard = __commonJS({
  "node_modules/chai/lib/chai/utils/addLengthGuard.js"(exports, module) {
    var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
    }, "length");
    module.exports = /* @__PURE__ */ __name(function addLengthGuard(fn, assertionName, isChainable) {
      if (!fnLengthDesc.configurable)
        return fn;
      Object.defineProperty(fn, "length", {
        get: function() {
          if (isChainable) {
            throw Error("Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
          }
          throw Error("Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
        }
      });
      return fn;
    }, "addLengthGuard");
  }
});

// node_modules/chai/lib/chai/utils/getProperties.js
var require_getProperties = __commonJS({
  "node_modules/chai/lib/chai/utils/getProperties.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function getProperties(object) {
      var result = Object.getOwnPropertyNames(object);
      function addProperty(property) {
        if (result.indexOf(property) === -1) {
          result.push(property);
        }
      }
      __name(addProperty, "addProperty");
      var proto = Object.getPrototypeOf(object);
      while (proto !== null) {
        Object.getOwnPropertyNames(proto).forEach(addProperty);
        proto = Object.getPrototypeOf(proto);
      }
      return result;
    }, "getProperties");
  }
});

// node_modules/chai/lib/chai/utils/proxify.js
var require_proxify = __commonJS({
  "node_modules/chai/lib/chai/utils/proxify.js"(exports, module) {
    var config2 = require_config();
    var flag = require_flag();
    var getProperties = require_getProperties();
    var isProxyEnabled = require_isProxyEnabled();
    var builtins = ["__flags", "__methods", "_obj", "assert"];
    module.exports = /* @__PURE__ */ __name(function proxify(obj, nonChainableMethodName) {
      if (!isProxyEnabled())
        return obj;
      return new Proxy(obj, {
        get: /* @__PURE__ */ __name(function proxyGetter(target, property) {
          if (typeof property === "string" && config2.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
            if (nonChainableMethodName) {
              throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
            }
            var suggestion = null;
            var suggestionDistance = 4;
            getProperties(target).forEach(function(prop) {
              if (!Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1) {
                var dist = stringDistanceCapped(
                  property,
                  prop,
                  suggestionDistance
                );
                if (dist < suggestionDistance) {
                  suggestion = prop;
                  suggestionDistance = dist;
                }
              }
            });
            if (suggestion !== null) {
              throw Error("Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?');
            } else {
              throw Error("Invalid Chai property: " + property);
            }
          }
          if (builtins.indexOf(property) === -1 && !flag(target, "lockSsfi")) {
            flag(target, "ssfi", proxyGetter);
          }
          return Reflect.get(target, property);
        }, "proxyGetter")
      });
    }, "proxify");
    function stringDistanceCapped(strA, strB, cap) {
      if (Math.abs(strA.length - strB.length) >= cap) {
        return cap;
      }
      var memo = [];
      for (var i = 0; i <= strA.length; i++) {
        memo[i] = Array(strB.length + 1).fill(0);
        memo[i][0] = i;
      }
      for (var j = 0; j < strB.length; j++) {
        memo[0][j] = j;
      }
      for (var i = 1; i <= strA.length; i++) {
        var ch = strA.charCodeAt(i - 1);
        for (var j = 1; j <= strB.length; j++) {
          if (Math.abs(i - j) >= cap) {
            memo[i][j] = cap;
            continue;
          }
          memo[i][j] = Math.min(
            memo[i - 1][j] + 1,
            memo[i][j - 1] + 1,
            memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1)
          );
        }
      }
      return memo[strA.length][strB.length];
    }
    __name(stringDistanceCapped, "stringDistanceCapped");
  }
});

// node_modules/chai/lib/chai/utils/addMethod.js
var require_addMethod = __commonJS({
  "node_modules/chai/lib/chai/utils/addMethod.js"(exports, module) {
    var addLengthGuard = require_addLengthGuard();
    var chai2 = require_chai();
    var flag = require_flag();
    var proxify = require_proxify();
    var transferFlags = require_transferFlags();
    module.exports = /* @__PURE__ */ __name(function addMethod(ctx, name, method) {
      var methodWrapper = /* @__PURE__ */ __name(function() {
        if (!flag(this, "lockSsfi")) {
          flag(this, "ssfi", methodWrapper);
        }
        var result = method.apply(this, arguments);
        if (result !== void 0)
          return result;
        var newAssertion = new chai2.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }, "methodWrapper");
      addLengthGuard(methodWrapper, name, false);
      ctx[name] = proxify(methodWrapper, name);
    }, "addMethod");
  }
});

// node_modules/chai/lib/chai/utils/overwriteProperty.js
var require_overwriteProperty = __commonJS({
  "node_modules/chai/lib/chai/utils/overwriteProperty.js"(exports, module) {
    var chai2 = require_chai();
    var flag = require_flag();
    var isProxyEnabled = require_isProxyEnabled();
    var transferFlags = require_transferFlags();
    module.exports = /* @__PURE__ */ __name(function overwriteProperty(ctx, name, getter) {
      var _get = Object.getOwnPropertyDescriptor(ctx, name), _super = /* @__PURE__ */ __name(function() {
      }, "_super");
      if (_get && "function" === typeof _get.get)
        _super = _get.get;
      Object.defineProperty(
        ctx,
        name,
        {
          get: /* @__PURE__ */ __name(function overwritingPropertyGetter() {
            if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
              flag(this, "ssfi", overwritingPropertyGetter);
            }
            var origLockSsfi = flag(this, "lockSsfi");
            flag(this, "lockSsfi", true);
            var result = getter(_super).call(this);
            flag(this, "lockSsfi", origLockSsfi);
            if (result !== void 0) {
              return result;
            }
            var newAssertion = new chai2.Assertion();
            transferFlags(this, newAssertion);
            return newAssertion;
          }, "overwritingPropertyGetter"),
          configurable: true
        }
      );
    }, "overwriteProperty");
  }
});

// node_modules/chai/lib/chai/utils/overwriteMethod.js
var require_overwriteMethod = __commonJS({
  "node_modules/chai/lib/chai/utils/overwriteMethod.js"(exports, module) {
    var addLengthGuard = require_addLengthGuard();
    var chai2 = require_chai();
    var flag = require_flag();
    var proxify = require_proxify();
    var transferFlags = require_transferFlags();
    module.exports = /* @__PURE__ */ __name(function overwriteMethod(ctx, name, method) {
      var _method = ctx[name], _super = /* @__PURE__ */ __name(function() {
        throw new Error(name + " is not a function");
      }, "_super");
      if (_method && "function" === typeof _method)
        _super = _method;
      var overwritingMethodWrapper = /* @__PURE__ */ __name(function() {
        if (!flag(this, "lockSsfi")) {
          flag(this, "ssfi", overwritingMethodWrapper);
        }
        var origLockSsfi = flag(this, "lockSsfi");
        flag(this, "lockSsfi", true);
        var result = method(_super).apply(this, arguments);
        flag(this, "lockSsfi", origLockSsfi);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai2.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }, "overwritingMethodWrapper");
      addLengthGuard(overwritingMethodWrapper, name, false);
      ctx[name] = proxify(overwritingMethodWrapper, name);
    }, "overwriteMethod");
  }
});

// node_modules/chai/lib/chai/utils/addChainableMethod.js
var require_addChainableMethod = __commonJS({
  "node_modules/chai/lib/chai/utils/addChainableMethod.js"(exports, module) {
    var addLengthGuard = require_addLengthGuard();
    var chai2 = require_chai();
    var flag = require_flag();
    var proxify = require_proxify();
    var transferFlags = require_transferFlags();
    var canSetPrototype = typeof Object.setPrototypeOf === "function";
    var testFn = /* @__PURE__ */ __name(function() {
    }, "testFn");
    var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
      var propDesc = Object.getOwnPropertyDescriptor(testFn, name);
      if (typeof propDesc !== "object")
        return true;
      return !propDesc.configurable;
    });
    var call = Function.prototype.call;
    var apply = Function.prototype.apply;
    module.exports = /* @__PURE__ */ __name(function addChainableMethod(ctx, name, method, chainingBehavior) {
      if (typeof chainingBehavior !== "function") {
        chainingBehavior = /* @__PURE__ */ __name(function() {
        }, "chainingBehavior");
      }
      var chainableBehavior = {
        method,
        chainingBehavior
      };
      if (!ctx.__methods) {
        ctx.__methods = {};
      }
      ctx.__methods[name] = chainableBehavior;
      Object.defineProperty(
        ctx,
        name,
        {
          get: /* @__PURE__ */ __name(function chainableMethodGetter() {
            chainableBehavior.chainingBehavior.call(this);
            var chainableMethodWrapper = /* @__PURE__ */ __name(function() {
              if (!flag(this, "lockSsfi")) {
                flag(this, "ssfi", chainableMethodWrapper);
              }
              var result = chainableBehavior.method.apply(this, arguments);
              if (result !== void 0) {
                return result;
              }
              var newAssertion = new chai2.Assertion();
              transferFlags(this, newAssertion);
              return newAssertion;
            }, "chainableMethodWrapper");
            addLengthGuard(chainableMethodWrapper, name, true);
            if (canSetPrototype) {
              var prototype = Object.create(this);
              prototype.call = call;
              prototype.apply = apply;
              Object.setPrototypeOf(chainableMethodWrapper, prototype);
            } else {
              var asserterNames = Object.getOwnPropertyNames(ctx);
              asserterNames.forEach(function(asserterName) {
                if (excludeNames.indexOf(asserterName) !== -1) {
                  return;
                }
                var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                Object.defineProperty(chainableMethodWrapper, asserterName, pd);
              });
            }
            transferFlags(this, chainableMethodWrapper);
            return proxify(chainableMethodWrapper);
          }, "chainableMethodGetter"),
          configurable: true
        }
      );
    }, "addChainableMethod");
  }
});

// node_modules/chai/lib/chai/utils/overwriteChainableMethod.js
var require_overwriteChainableMethod = __commonJS({
  "node_modules/chai/lib/chai/utils/overwriteChainableMethod.js"(exports, module) {
    var chai2 = require_chai();
    var transferFlags = require_transferFlags();
    module.exports = /* @__PURE__ */ __name(function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
      var chainableBehavior = ctx.__methods[name];
      var _chainingBehavior = chainableBehavior.chainingBehavior;
      chainableBehavior.chainingBehavior = /* @__PURE__ */ __name(function overwritingChainableMethodGetter() {
        var result = chainingBehavior(_chainingBehavior).call(this);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai2.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }, "overwritingChainableMethodGetter");
      var _method = chainableBehavior.method;
      chainableBehavior.method = /* @__PURE__ */ __name(function overwritingChainableMethodWrapper() {
        var result = method(_method).apply(this, arguments);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai2.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }, "overwritingChainableMethodWrapper");
    }, "overwriteChainableMethod");
  }
});

// node_modules/chai/lib/chai/utils/compareByInspect.js
var require_compareByInspect = __commonJS({
  "node_modules/chai/lib/chai/utils/compareByInspect.js"(exports, module) {
    var inspect = require_inspect();
    module.exports = /* @__PURE__ */ __name(function compareByInspect(a, b) {
      return inspect(a) < inspect(b) ? -1 : 1;
    }, "compareByInspect");
  }
});

// node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js
var require_getOwnEnumerablePropertySymbols = __commonJS({
  "node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function getOwnEnumerablePropertySymbols(obj) {
      if (typeof Object.getOwnPropertySymbols !== "function")
        return [];
      return Object.getOwnPropertySymbols(obj).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
      });
    }, "getOwnEnumerablePropertySymbols");
  }
});

// node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js
var require_getOwnEnumerableProperties = __commonJS({
  "node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js"(exports, module) {
    var getOwnEnumerablePropertySymbols = require_getOwnEnumerablePropertySymbols();
    module.exports = /* @__PURE__ */ __name(function getOwnEnumerableProperties(obj) {
      return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
    }, "getOwnEnumerableProperties");
  }
});

// node_modules/check-error/index.js
var require_check_error = __commonJS({
  "node_modules/check-error/index.js"(exports, module) {
    "use strict";
    var getFunctionName = require_get_func_name();
    function compatibleInstance(thrown, errorLike) {
      return errorLike instanceof Error && thrown === errorLike;
    }
    __name(compatibleInstance, "compatibleInstance");
    function compatibleConstructor(thrown, errorLike) {
      if (errorLike instanceof Error) {
        return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
      } else if (errorLike.prototype instanceof Error || errorLike === Error) {
        return thrown.constructor === errorLike || thrown instanceof errorLike;
      }
      return false;
    }
    __name(compatibleConstructor, "compatibleConstructor");
    function compatibleMessage(thrown, errMatcher) {
      var comparisonString = typeof thrown === "string" ? thrown : thrown.message;
      if (errMatcher instanceof RegExp) {
        return errMatcher.test(comparisonString);
      } else if (typeof errMatcher === "string") {
        return comparisonString.indexOf(errMatcher) !== -1;
      }
      return false;
    }
    __name(compatibleMessage, "compatibleMessage");
    function getConstructorName(errorLike) {
      var constructorName = errorLike;
      if (errorLike instanceof Error) {
        constructorName = getFunctionName(errorLike.constructor);
      } else if (typeof errorLike === "function") {
        constructorName = getFunctionName(errorLike);
        if (constructorName === "") {
          var newConstructorName = getFunctionName(new errorLike());
          constructorName = newConstructorName || constructorName;
        }
      }
      return constructorName;
    }
    __name(getConstructorName, "getConstructorName");
    function getMessage(errorLike) {
      var msg = "";
      if (errorLike && errorLike.message) {
        msg = errorLike.message;
      } else if (typeof errorLike === "string") {
        msg = errorLike;
      }
      return msg;
    }
    __name(getMessage, "getMessage");
    module.exports = {
      compatibleInstance,
      compatibleConstructor,
      compatibleMessage,
      getMessage,
      getConstructorName
    };
  }
});

// node_modules/chai/lib/chai/utils/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/chai/lib/chai/utils/isNaN.js"(exports, module) {
    function isNaN2(value) {
      return value !== value;
    }
    __name(isNaN2, "isNaN");
    module.exports = Number.isNaN || isNaN2;
  }
});

// node_modules/chai/lib/chai/utils/getOperator.js
var require_getOperator = __commonJS({
  "node_modules/chai/lib/chai/utils/getOperator.js"(exports, module) {
    var type = require_type_detect();
    var flag = require_flag();
    function isObjectType(obj) {
      var objectType = type(obj);
      var objectTypes = ["Array", "Object", "function"];
      return objectTypes.indexOf(objectType) !== -1;
    }
    __name(isObjectType, "isObjectType");
    module.exports = /* @__PURE__ */ __name(function getOperator(obj, args) {
      var operator = flag(obj, "operator");
      var negate = flag(obj, "negate");
      var expected = args[3];
      var msg = negate ? args[2] : args[1];
      if (operator) {
        return operator;
      }
      if (typeof msg === "function")
        msg = msg();
      msg = msg || "";
      if (!msg) {
        return void 0;
      }
      if (/\shave\s/.test(msg)) {
        return void 0;
      }
      var isObject = isObjectType(expected);
      if (/\snot\s/.test(msg)) {
        return isObject ? "notDeepStrictEqual" : "notStrictEqual";
      }
      return isObject ? "deepStrictEqual" : "strictEqual";
    }, "getOperator");
  }
});

// node_modules/chai/lib/chai/utils/index.js
var require_utils = __commonJS({
  "node_modules/chai/lib/chai/utils/index.js"(exports) {
    var pathval = require_pathval();
    exports.test = require_test();
    exports.type = require_type_detect();
    exports.expectTypes = require_expectTypes();
    exports.getMessage = require_getMessage();
    exports.getActual = require_getActual();
    exports.inspect = require_inspect();
    exports.objDisplay = require_objDisplay();
    exports.flag = require_flag();
    exports.transferFlags = require_transferFlags();
    exports.eql = require_deep_eql();
    exports.getPathInfo = pathval.getPathInfo;
    exports.hasProperty = pathval.hasProperty;
    exports.getName = require_get_func_name();
    exports.addProperty = require_addProperty();
    exports.addMethod = require_addMethod();
    exports.overwriteProperty = require_overwriteProperty();
    exports.overwriteMethod = require_overwriteMethod();
    exports.addChainableMethod = require_addChainableMethod();
    exports.overwriteChainableMethod = require_overwriteChainableMethod();
    exports.compareByInspect = require_compareByInspect();
    exports.getOwnEnumerablePropertySymbols = require_getOwnEnumerablePropertySymbols();
    exports.getOwnEnumerableProperties = require_getOwnEnumerableProperties();
    exports.checkError = require_check_error();
    exports.proxify = require_proxify();
    exports.addLengthGuard = require_addLengthGuard();
    exports.isProxyEnabled = require_isProxyEnabled();
    exports.isNaN = require_isNaN();
    exports.getOperator = require_getOperator();
  }
});

// node_modules/chai/lib/chai/assertion.js
var require_assertion = __commonJS({
  "node_modules/chai/lib/chai/assertion.js"(exports, module) {
    var config2 = require_config();
    module.exports = function(_chai, util2) {
      var AssertionError2 = _chai.AssertionError, flag = util2.flag;
      _chai.Assertion = Assertion2;
      function Assertion2(obj, msg, ssfi, lockSsfi) {
        flag(this, "ssfi", ssfi || Assertion2);
        flag(this, "lockSsfi", lockSsfi);
        flag(this, "object", obj);
        flag(this, "message", msg);
        flag(this, "eql", config2.deepEqual || util2.eql);
        return util2.proxify(this);
      }
      __name(Assertion2, "Assertion");
      Object.defineProperty(Assertion2, "includeStack", {
        get: function() {
          console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
          return config2.includeStack;
        },
        set: function(value) {
          console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
          config2.includeStack = value;
        }
      });
      Object.defineProperty(Assertion2, "showDiff", {
        get: function() {
          console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
          return config2.showDiff;
        },
        set: function(value) {
          console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
          config2.showDiff = value;
        }
      });
      Assertion2.addProperty = function(name, fn) {
        util2.addProperty(this.prototype, name, fn);
      };
      Assertion2.addMethod = function(name, fn) {
        util2.addMethod(this.prototype, name, fn);
      };
      Assertion2.addChainableMethod = function(name, fn, chainingBehavior) {
        util2.addChainableMethod(this.prototype, name, fn, chainingBehavior);
      };
      Assertion2.overwriteProperty = function(name, fn) {
        util2.overwriteProperty(this.prototype, name, fn);
      };
      Assertion2.overwriteMethod = function(name, fn) {
        util2.overwriteMethod(this.prototype, name, fn);
      };
      Assertion2.overwriteChainableMethod = function(name, fn, chainingBehavior) {
        util2.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
      };
      Assertion2.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
        var ok = util2.test(this, arguments);
        if (false !== showDiff)
          showDiff = true;
        if (void 0 === expected && void 0 === _actual)
          showDiff = false;
        if (true !== config2.showDiff)
          showDiff = false;
        if (!ok) {
          msg = util2.getMessage(this, arguments);
          var actual = util2.getActual(this, arguments);
          var assertionErrorObjectProperties = {
            actual,
            expected,
            showDiff
          };
          var operator = util2.getOperator(this, arguments);
          if (operator) {
            assertionErrorObjectProperties.operator = operator;
          }
          throw new AssertionError2(
            msg,
            assertionErrorObjectProperties,
            config2.includeStack ? this.assert : flag(this, "ssfi")
          );
        }
      };
      Object.defineProperty(
        Assertion2.prototype,
        "_obj",
        {
          get: function() {
            return flag(this, "object");
          },
          set: function(val) {
            flag(this, "object", val);
          }
        }
      );
    };
  }
});

// node_modules/chai/lib/chai/core/assertions.js
var require_assertions = __commonJS({
  "node_modules/chai/lib/chai/core/assertions.js"(exports, module) {
    module.exports = function(chai2, _) {
      var Assertion2 = chai2.Assertion, AssertionError2 = chai2.AssertionError, flag = _.flag;
      [
        "to",
        "be",
        "been",
        "is",
        "and",
        "has",
        "have",
        "with",
        "that",
        "which",
        "at",
        "of",
        "same",
        "but",
        "does",
        "still",
        "also"
      ].forEach(function(chain) {
        Assertion2.addProperty(chain);
      });
      Assertion2.addProperty("not", function() {
        flag(this, "negate", true);
      });
      Assertion2.addProperty("deep", function() {
        flag(this, "deep", true);
      });
      Assertion2.addProperty("nested", function() {
        flag(this, "nested", true);
      });
      Assertion2.addProperty("own", function() {
        flag(this, "own", true);
      });
      Assertion2.addProperty("ordered", function() {
        flag(this, "ordered", true);
      });
      Assertion2.addProperty("any", function() {
        flag(this, "any", true);
        flag(this, "all", false);
      });
      Assertion2.addProperty("all", function() {
        flag(this, "all", true);
        flag(this, "any", false);
      });
      function an(type, msg) {
        if (msg)
          flag(this, "message", msg);
        type = type.toLowerCase();
        var obj = flag(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type.charAt(0)) ? "an " : "a ";
        this.assert(
          type === _.type(obj).toLowerCase(),
          "expected #{this} to be " + article + type,
          "expected #{this} not to be " + article + type
        );
      }
      __name(an, "an");
      Assertion2.addChainableMethod("an", an);
      Assertion2.addChainableMethod("a", an);
      function SameValueZero(a, b) {
        return _.isNaN(a) && _.isNaN(b) || a === b;
      }
      __name(SameValueZero, "SameValueZero");
      function includeChainingBehavior() {
        flag(this, "contains", true);
      }
      __name(includeChainingBehavior, "includeChainingBehavior");
      function include(val, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, "message"), negate = flag(this, "negate"), ssfi = flag(this, "ssfi"), isDeep = flag(this, "deep"), descriptor = isDeep ? "deep " : "", isEql = isDeep ? flag(this, "eql") : SameValueZero;
        flagMsg = flagMsg ? flagMsg + ": " : "";
        var included = false;
        switch (objType) {
          case "string":
            included = obj.indexOf(val) !== -1;
            break;
          case "weakset":
            if (isDeep) {
              throw new AssertionError2(
                flagMsg + "unable to use .deep.include with WeakSet",
                void 0,
                ssfi
              );
            }
            included = obj.has(val);
            break;
          case "map":
            obj.forEach(function(item) {
              included = included || isEql(item, val);
            });
            break;
          case "set":
            if (isDeep) {
              obj.forEach(function(item) {
                included = included || isEql(item, val);
              });
            } else {
              included = obj.has(val);
            }
            break;
          case "array":
            if (isDeep) {
              included = obj.some(function(item) {
                return isEql(item, val);
              });
            } else {
              included = obj.indexOf(val) !== -1;
            }
            break;
          default:
            if (val !== Object(val)) {
              throw new AssertionError2(
                flagMsg + "the given combination of arguments (" + objType + " and " + _.type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + _.type(val).toLowerCase(),
                void 0,
                ssfi
              );
            }
            var props = Object.keys(val), firstErr = null, numErrs = 0;
            props.forEach(function(prop) {
              var propAssertion = new Assertion2(obj);
              _.transferFlags(this, propAssertion, true);
              flag(propAssertion, "lockSsfi", true);
              if (!negate || props.length === 1) {
                propAssertion.property(prop, val[prop]);
                return;
              }
              try {
                propAssertion.property(prop, val[prop]);
              } catch (err) {
                if (!_.checkError.compatibleConstructor(err, AssertionError2)) {
                  throw err;
                }
                if (firstErr === null)
                  firstErr = err;
                numErrs++;
              }
            }, this);
            if (negate && props.length > 1 && numErrs === props.length) {
              throw firstErr;
            }
            return;
        }
        this.assert(
          included,
          "expected #{this} to " + descriptor + "include " + _.inspect(val),
          "expected #{this} to not " + descriptor + "include " + _.inspect(val)
        );
      }
      __name(include, "include");
      Assertion2.addChainableMethod("include", include, includeChainingBehavior);
      Assertion2.addChainableMethod("contain", include, includeChainingBehavior);
      Assertion2.addChainableMethod("contains", include, includeChainingBehavior);
      Assertion2.addChainableMethod("includes", include, includeChainingBehavior);
      Assertion2.addProperty("ok", function() {
        this.assert(
          flag(this, "object"),
          "expected #{this} to be truthy",
          "expected #{this} to be falsy"
        );
      });
      Assertion2.addProperty("true", function() {
        this.assert(
          true === flag(this, "object"),
          "expected #{this} to be true",
          "expected #{this} to be false",
          flag(this, "negate") ? false : true
        );
      });
      Assertion2.addProperty("false", function() {
        this.assert(
          false === flag(this, "object"),
          "expected #{this} to be false",
          "expected #{this} to be true",
          flag(this, "negate") ? true : false
        );
      });
      Assertion2.addProperty("null", function() {
        this.assert(
          null === flag(this, "object"),
          "expected #{this} to be null",
          "expected #{this} not to be null"
        );
      });
      Assertion2.addProperty("undefined", function() {
        this.assert(
          void 0 === flag(this, "object"),
          "expected #{this} to be undefined",
          "expected #{this} not to be undefined"
        );
      });
      Assertion2.addProperty("NaN", function() {
        this.assert(
          _.isNaN(flag(this, "object")),
          "expected #{this} to be NaN",
          "expected #{this} not to be NaN"
        );
      });
      function assertExist() {
        var val = flag(this, "object");
        this.assert(
          val !== null && val !== void 0,
          "expected #{this} to exist",
          "expected #{this} to not exist"
        );
      }
      __name(assertExist, "assertExist");
      Assertion2.addProperty("exist", assertExist);
      Assertion2.addProperty("exists", assertExist);
      Assertion2.addProperty("empty", function() {
        var val = flag(this, "object"), ssfi = flag(this, "ssfi"), flagMsg = flag(this, "message"), itemsCount;
        flagMsg = flagMsg ? flagMsg + ": " : "";
        switch (_.type(val).toLowerCase()) {
          case "array":
          case "string":
            itemsCount = val.length;
            break;
          case "map":
          case "set":
            itemsCount = val.size;
            break;
          case "weakmap":
          case "weakset":
            throw new AssertionError2(
              flagMsg + ".empty was passed a weak collection",
              void 0,
              ssfi
            );
          case "function":
            var msg = flagMsg + ".empty was passed a function " + _.getName(val);
            throw new AssertionError2(msg.trim(), void 0, ssfi);
          default:
            if (val !== Object(val)) {
              throw new AssertionError2(
                flagMsg + ".empty was passed non-string primitive " + _.inspect(val),
                void 0,
                ssfi
              );
            }
            itemsCount = Object.keys(val).length;
        }
        this.assert(
          0 === itemsCount,
          "expected #{this} to be empty",
          "expected #{this} not to be empty"
        );
      });
      function checkArguments() {
        var obj = flag(this, "object"), type = _.type(obj);
        this.assert(
          "Arguments" === type,
          "expected #{this} to be arguments but got " + type,
          "expected #{this} to not be arguments"
        );
      }
      __name(checkArguments, "checkArguments");
      Assertion2.addProperty("arguments", checkArguments);
      Assertion2.addProperty("Arguments", checkArguments);
      function assertEqual(val, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        if (flag(this, "deep")) {
          var prevLockSsfi = flag(this, "lockSsfi");
          flag(this, "lockSsfi", true);
          this.eql(val);
          flag(this, "lockSsfi", prevLockSsfi);
        } else {
          this.assert(
            val === obj,
            "expected #{this} to equal #{exp}",
            "expected #{this} to not equal #{exp}",
            val,
            this._obj,
            true
          );
        }
      }
      __name(assertEqual, "assertEqual");
      Assertion2.addMethod("equal", assertEqual);
      Assertion2.addMethod("equals", assertEqual);
      Assertion2.addMethod("eq", assertEqual);
      function assertEql(obj, msg) {
        if (msg)
          flag(this, "message", msg);
        var eql = flag(this, "eql");
        this.assert(
          eql(obj, flag(this, "object")),
          "expected #{this} to deeply equal #{exp}",
          "expected #{this} to not deeply equal #{exp}",
          obj,
          this._obj,
          true
        );
      }
      __name(assertEql, "assertEql");
      Assertion2.addMethod("eql", assertEql);
      Assertion2.addMethod("eqls", assertEql);
      function assertAbove(n, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to above must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to above must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount > n,
            "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}",
            "expected #{this} to not have a " + descriptor + " above #{exp}",
            n,
            itemsCount
          );
        } else {
          this.assert(
            obj > n,
            "expected #{this} to be above #{exp}",
            "expected #{this} to be at most #{exp}",
            n
          );
        }
      }
      __name(assertAbove, "assertAbove");
      Assertion2.addMethod("above", assertAbove);
      Assertion2.addMethod("gt", assertAbove);
      Assertion2.addMethod("greaterThan", assertAbove);
      function assertLeast(n, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to least must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to least must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount >= n,
            "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}",
            "expected #{this} to have a " + descriptor + " below #{exp}",
            n,
            itemsCount
          );
        } else {
          this.assert(
            obj >= n,
            "expected #{this} to be at least #{exp}",
            "expected #{this} to be below #{exp}",
            n
          );
        }
      }
      __name(assertLeast, "assertLeast");
      Assertion2.addMethod("least", assertLeast);
      Assertion2.addMethod("gte", assertLeast);
      Assertion2.addMethod("greaterThanOrEqual", assertLeast);
      function assertBelow(n, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to below must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to below must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount < n,
            "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}",
            "expected #{this} to not have a " + descriptor + " below #{exp}",
            n,
            itemsCount
          );
        } else {
          this.assert(
            obj < n,
            "expected #{this} to be below #{exp}",
            "expected #{this} to be at least #{exp}",
            n
          );
        }
      }
      __name(assertBelow, "assertBelow");
      Assertion2.addMethod("below", assertBelow);
      Assertion2.addMethod("lt", assertBelow);
      Assertion2.addMethod("lessThan", assertBelow);
      function assertMost(n, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to most must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to most must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount <= n,
            "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}",
            "expected #{this} to have a " + descriptor + " above #{exp}",
            n,
            itemsCount
          );
        } else {
          this.assert(
            obj <= n,
            "expected #{this} to be at most #{exp}",
            "expected #{this} to be above #{exp}",
            n
          );
        }
      }
      __name(assertMost, "assertMost");
      Assertion2.addMethod("most", assertMost);
      Assertion2.addMethod("lte", assertMost);
      Assertion2.addMethod("lessThanOrEqual", assertMost);
      Assertion2.addMethod("within", function(start, finish, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), startType = _.type(start).toLowerCase(), finishType = _.type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = startType === "date" && finishType === "date" ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && (startType !== "date" || finishType !== "date"))) {
          errorMessage = msgPrefix + "the arguments to within must be dates";
        } else if ((startType !== "number" || finishType !== "number") && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the arguments to within must be numbers";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount >= start && itemsCount <= finish,
            "expected #{this} to have a " + descriptor + " within " + range,
            "expected #{this} to not have a " + descriptor + " within " + range
          );
        } else {
          this.assert(
            obj >= start && obj <= finish,
            "expected #{this} to be within " + range,
            "expected #{this} to not be within " + range
          );
        }
      });
      function assertInstanceOf(constructor, msg) {
        if (msg)
          flag(this, "message", msg);
        var target = flag(this, "object");
        var ssfi = flag(this, "ssfi");
        var flagMsg = flag(this, "message");
        try {
          var isInstanceOf = target instanceof constructor;
        } catch (err) {
          if (err instanceof TypeError) {
            flagMsg = flagMsg ? flagMsg + ": " : "";
            throw new AssertionError2(
              flagMsg + "The instanceof assertion needs a constructor but " + _.type(constructor) + " was given.",
              void 0,
              ssfi
            );
          }
          throw err;
        }
        var name = _.getName(constructor);
        if (name === null) {
          name = "an unnamed constructor";
        }
        this.assert(
          isInstanceOf,
          "expected #{this} to be an instance of " + name,
          "expected #{this} to not be an instance of " + name
        );
      }
      __name(assertInstanceOf, "assertInstanceOf");
      ;
      Assertion2.addMethod("instanceof", assertInstanceOf);
      Assertion2.addMethod("instanceOf", assertInstanceOf);
      function assertProperty(name, val, msg) {
        if (msg)
          flag(this, "message", msg);
        var isNested = flag(this, "nested"), isOwn = flag(this, "own"), flagMsg = flag(this, "message"), obj = flag(this, "object"), ssfi = flag(this, "ssfi"), nameType = typeof name;
        flagMsg = flagMsg ? flagMsg + ": " : "";
        if (isNested) {
          if (nameType !== "string") {
            throw new AssertionError2(
              flagMsg + "the argument to property must be a string when using nested syntax",
              void 0,
              ssfi
            );
          }
        } else {
          if (nameType !== "string" && nameType !== "number" && nameType !== "symbol") {
            throw new AssertionError2(
              flagMsg + "the argument to property must be a string, number, or symbol",
              void 0,
              ssfi
            );
          }
        }
        if (isNested && isOwn) {
          throw new AssertionError2(
            flagMsg + 'The "nested" and "own" flags cannot be combined.',
            void 0,
            ssfi
          );
        }
        if (obj === null || obj === void 0) {
          throw new AssertionError2(
            flagMsg + "Target cannot be null or undefined.",
            void 0,
            ssfi
          );
        }
        var isDeep = flag(this, "deep"), negate = flag(this, "negate"), pathInfo = isNested ? _.getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name], isEql = isDeep ? flag(this, "eql") : (val1, val2) => val1 === val2;
        ;
        var descriptor = "";
        if (isDeep)
          descriptor += "deep ";
        if (isOwn)
          descriptor += "own ";
        if (isNested)
          descriptor += "nested ";
        descriptor += "property ";
        var hasProperty;
        if (isOwn)
          hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
        else if (isNested)
          hasProperty = pathInfo.exists;
        else
          hasProperty = _.hasProperty(obj, name);
        if (!negate || arguments.length === 1) {
          this.assert(
            hasProperty,
            "expected #{this} to have " + descriptor + _.inspect(name),
            "expected #{this} to not have " + descriptor + _.inspect(name)
          );
        }
        if (arguments.length > 1) {
          this.assert(
            hasProperty && isEql(val, value),
            "expected #{this} to have " + descriptor + _.inspect(name) + " of #{exp}, but got #{act}",
            "expected #{this} to not have " + descriptor + _.inspect(name) + " of #{act}",
            val,
            value
          );
        }
        flag(this, "object", value);
      }
      __name(assertProperty, "assertProperty");
      Assertion2.addMethod("property", assertProperty);
      function assertOwnProperty(name, value, msg) {
        flag(this, "own", true);
        assertProperty.apply(this, arguments);
      }
      __name(assertOwnProperty, "assertOwnProperty");
      Assertion2.addMethod("ownProperty", assertOwnProperty);
      Assertion2.addMethod("haveOwnProperty", assertOwnProperty);
      function assertOwnPropertyDescriptor(name, descriptor, msg) {
        if (typeof descriptor === "string") {
          msg = descriptor;
          descriptor = null;
        }
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
        var eql = flag(this, "eql");
        if (actualDescriptor && descriptor) {
          this.assert(
            eql(descriptor, actualDescriptor),
            "expected the own property descriptor for " + _.inspect(name) + " on #{this} to match " + _.inspect(descriptor) + ", got " + _.inspect(actualDescriptor),
            "expected the own property descriptor for " + _.inspect(name) + " on #{this} to not match " + _.inspect(descriptor),
            descriptor,
            actualDescriptor,
            true
          );
        } else {
          this.assert(
            actualDescriptor,
            "expected #{this} to have an own property descriptor for " + _.inspect(name),
            "expected #{this} to not have an own property descriptor for " + _.inspect(name)
          );
        }
        flag(this, "object", actualDescriptor);
      }
      __name(assertOwnPropertyDescriptor, "assertOwnPropertyDescriptor");
      Assertion2.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
      Assertion2.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
      function assertLengthChain() {
        flag(this, "doLength", true);
      }
      __name(assertLengthChain, "assertLengthChain");
      function assertLength(n, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi"), descriptor = "length", itemsCount;
        switch (objType) {
          case "map":
          case "set":
            descriptor = "size";
            itemsCount = obj.size;
            break;
          default:
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
            itemsCount = obj.length;
        }
        this.assert(
          itemsCount == n,
          "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}",
          "expected #{this} to not have a " + descriptor + " of #{act}",
          n,
          itemsCount
        );
      }
      __name(assertLength, "assertLength");
      Assertion2.addChainableMethod("length", assertLength, assertLengthChain);
      Assertion2.addChainableMethod("lengthOf", assertLength, assertLengthChain);
      function assertMatch(re, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        this.assert(
          re.exec(obj),
          "expected #{this} to match " + re,
          "expected #{this} not to match " + re
        );
      }
      __name(assertMatch, "assertMatch");
      Assertion2.addMethod("match", assertMatch);
      Assertion2.addMethod("matches", assertMatch);
      Assertion2.addMethod("string", function(str, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(obj, flagMsg, ssfi, true).is.a("string");
        this.assert(
          ~obj.indexOf(str),
          "expected #{this} to contain " + _.inspect(str),
          "expected #{this} to not contain " + _.inspect(str)
        );
      });
      function assertKeys(keys) {
        var obj = flag(this, "object"), objType = _.type(obj), keysType = _.type(keys), ssfi = flag(this, "ssfi"), isDeep = flag(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag(this, "message");
        flagMsg = flagMsg ? flagMsg + ": " : "";
        var mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
        if (objType === "Map" || objType === "Set") {
          deepStr = isDeep ? "deeply " : "";
          actual = [];
          obj.forEach(function(val, key) {
            actual.push(key);
          });
          if (keysType !== "Array") {
            keys = Array.prototype.slice.call(arguments);
          }
        } else {
          actual = _.getOwnEnumerableProperties(obj);
          switch (keysType) {
            case "Array":
              if (arguments.length > 1) {
                throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
              }
              break;
            case "Object":
              if (arguments.length > 1) {
                throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
              }
              keys = Object.keys(keys);
              break;
            default:
              keys = Array.prototype.slice.call(arguments);
          }
          keys = keys.map(function(val) {
            return typeof val === "symbol" ? val : String(val);
          });
        }
        if (!keys.length) {
          throw new AssertionError2(flagMsg + "keys required", void 0, ssfi);
        }
        var len = keys.length, any = flag(this, "any"), all = flag(this, "all"), expected = keys, isEql = isDeep ? flag(this, "eql") : (val1, val2) => val1 === val2;
        if (!any && !all) {
          all = true;
        }
        if (any) {
          ok = expected.some(function(expectedKey) {
            return actual.some(function(actualKey) {
              return isEql(expectedKey, actualKey);
            });
          });
        }
        if (all) {
          ok = expected.every(function(expectedKey) {
            return actual.some(function(actualKey) {
              return isEql(expectedKey, actualKey);
            });
          });
          if (!flag(this, "contains")) {
            ok = ok && keys.length == actual.length;
          }
        }
        if (len > 1) {
          keys = keys.map(function(key) {
            return _.inspect(key);
          });
          var last = keys.pop();
          if (all) {
            str = keys.join(", ") + ", and " + last;
          }
          if (any) {
            str = keys.join(", ") + ", or " + last;
          }
        } else {
          str = _.inspect(keys[0]);
        }
        str = (len > 1 ? "keys " : "key ") + str;
        str = (flag(this, "contains") ? "contain " : "have ") + str;
        this.assert(
          ok,
          "expected #{this} to " + deepStr + str,
          "expected #{this} to not " + deepStr + str,
          expected.slice(0).sort(_.compareByInspect),
          actual.sort(_.compareByInspect),
          true
        );
      }
      __name(assertKeys, "assertKeys");
      Assertion2.addMethod("keys", assertKeys);
      Assertion2.addMethod("key", assertKeys);
      function assertThrows(errorLike, errMsgMatcher, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), ssfi = flag(this, "ssfi"), flagMsg = flag(this, "message"), negate = flag(this, "negate") || false;
        new Assertion2(obj, flagMsg, ssfi, true).is.a("function");
        if (errorLike instanceof RegExp || typeof errorLike === "string") {
          errMsgMatcher = errorLike;
          errorLike = null;
        }
        var caughtErr;
        try {
          obj();
        } catch (err) {
          caughtErr = err;
        }
        var everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0;
        var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
        var errorLikeFail = false;
        var errMsgMatcherFail = false;
        if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
          var errorLikeString = "an error";
          if (errorLike instanceof Error) {
            errorLikeString = "#{exp}";
          } else if (errorLike) {
            errorLikeString = _.checkError.getConstructorName(errorLike);
          }
          this.assert(
            caughtErr,
            "expected #{this} to throw " + errorLikeString,
            "expected #{this} to not throw an error but #{act} was thrown",
            errorLike && errorLike.toString(),
            caughtErr instanceof Error ? caughtErr.toString() : typeof caughtErr === "string" ? caughtErr : caughtErr && _.checkError.getConstructorName(caughtErr)
          );
        }
        if (errorLike && caughtErr) {
          if (errorLike instanceof Error) {
            var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);
            if (isCompatibleInstance === negate) {
              if (everyArgIsDefined && negate) {
                errorLikeFail = true;
              } else {
                this.assert(
                  negate,
                  "expected #{this} to throw #{exp} but #{act} was thrown",
                  "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""),
                  errorLike.toString(),
                  caughtErr.toString()
                );
              }
            }
          }
          var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
          if (isCompatibleConstructor === negate) {
            if (everyArgIsDefined && negate) {
              errorLikeFail = true;
            } else {
              this.assert(
                negate,
                "expected #{this} to throw #{exp} but #{act} was thrown",
                "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
                errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike),
                caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)
              );
            }
          }
        }
        if (caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
          var placeholder = "including";
          if (errMsgMatcher instanceof RegExp) {
            placeholder = "matching";
          }
          var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
          if (isCompatibleMessage === negate) {
            if (everyArgIsDefined && negate) {
              errMsgMatcherFail = true;
            } else {
              this.assert(
                negate,
                "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}",
                "expected #{this} to throw error not " + placeholder + " #{exp}",
                errMsgMatcher,
                _.checkError.getMessage(caughtErr)
              );
            }
          }
        }
        if (errorLikeFail && errMsgMatcherFail) {
          this.assert(
            negate,
            "expected #{this} to throw #{exp} but #{act} was thrown",
            "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
            errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike),
            caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)
          );
        }
        flag(this, "object", caughtErr);
      }
      __name(assertThrows, "assertThrows");
      ;
      Assertion2.addMethod("throw", assertThrows);
      Assertion2.addMethod("throws", assertThrows);
      Assertion2.addMethod("Throw", assertThrows);
      function respondTo(method, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), itself = flag(this, "itself"), context = "function" === typeof obj && !itself ? obj.prototype[method] : obj[method];
        this.assert(
          "function" === typeof context,
          "expected #{this} to respond to " + _.inspect(method),
          "expected #{this} to not respond to " + _.inspect(method)
        );
      }
      __name(respondTo, "respondTo");
      Assertion2.addMethod("respondTo", respondTo);
      Assertion2.addMethod("respondsTo", respondTo);
      Assertion2.addProperty("itself", function() {
        flag(this, "itself", true);
      });
      function satisfy(matcher, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        var result = matcher(obj);
        this.assert(
          result,
          "expected #{this} to satisfy " + _.objDisplay(matcher),
          "expected #{this} to not satisfy" + _.objDisplay(matcher),
          flag(this, "negate") ? false : true,
          result
        );
      }
      __name(satisfy, "satisfy");
      Assertion2.addMethod("satisfy", satisfy);
      Assertion2.addMethod("satisfies", satisfy);
      function closeTo(expected, delta, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(obj, flagMsg, ssfi, true).is.a("number");
        if (typeof expected !== "number" || typeof delta !== "number") {
          flagMsg = flagMsg ? flagMsg + ": " : "";
          var deltaMessage = delta === void 0 ? ", and a delta is required" : "";
          throw new AssertionError2(
            flagMsg + "the arguments to closeTo or approximately must be numbers" + deltaMessage,
            void 0,
            ssfi
          );
        }
        this.assert(
          Math.abs(obj - expected) <= delta,
          "expected #{this} to be close to " + expected + " +/- " + delta,
          "expected #{this} not to be close to " + expected + " +/- " + delta
        );
      }
      __name(closeTo, "closeTo");
      Assertion2.addMethod("closeTo", closeTo);
      Assertion2.addMethod("approximately", closeTo);
      function isSubsetOf(subset, superset, cmp, contains, ordered) {
        if (!contains) {
          if (subset.length !== superset.length)
            return false;
          superset = superset.slice();
        }
        return subset.every(function(elem, idx) {
          if (ordered)
            return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
          if (!cmp) {
            var matchIdx = superset.indexOf(elem);
            if (matchIdx === -1)
              return false;
            if (!contains)
              superset.splice(matchIdx, 1);
            return true;
          }
          return superset.some(function(elem2, matchIdx2) {
            if (!cmp(elem, elem2))
              return false;
            if (!contains)
              superset.splice(matchIdx2, 1);
            return true;
          });
        });
      }
      __name(isSubsetOf, "isSubsetOf");
      Assertion2.addMethod("members", function(subset, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(obj, flagMsg, ssfi, true).to.be.an("array");
        new Assertion2(subset, flagMsg, ssfi, true).to.be.an("array");
        var contains = flag(this, "contains");
        var ordered = flag(this, "ordered");
        var subject, failMsg, failNegateMsg;
        if (contains) {
          subject = ordered ? "an ordered superset" : "a superset";
          failMsg = "expected #{this} to be " + subject + " of #{exp}";
          failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
        } else {
          subject = ordered ? "ordered members" : "members";
          failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
          failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
        }
        var cmp = flag(this, "deep") ? flag(this, "eql") : void 0;
        this.assert(
          isSubsetOf(subset, obj, cmp, contains, ordered),
          failMsg,
          failNegateMsg,
          subset,
          obj,
          true
        );
      });
      function oneOf(list, msg) {
        if (msg)
          flag(this, "message", msg);
        var expected = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi"), contains = flag(this, "contains"), isDeep = flag(this, "deep"), eql = flag(this, "eql");
        new Assertion2(list, flagMsg, ssfi, true).to.be.an("array");
        if (contains) {
          this.assert(
            list.some(function(possibility) {
              return expected.indexOf(possibility) > -1;
            }),
            "expected #{this} to contain one of #{exp}",
            "expected #{this} to not contain one of #{exp}",
            list,
            expected
          );
        } else {
          if (isDeep) {
            this.assert(
              list.some(function(possibility) {
                return eql(expected, possibility);
              }),
              "expected #{this} to deeply equal one of #{exp}",
              "expected #{this} to deeply equal one of #{exp}",
              list,
              expected
            );
          } else {
            this.assert(
              list.indexOf(expected) > -1,
              "expected #{this} to be one of #{exp}",
              "expected #{this} to not be one of #{exp}",
              list,
              expected
            );
          }
        }
      }
      __name(oneOf, "oneOf");
      Assertion2.addMethod("oneOf", oneOf);
      function assertChanges(subject, prop, msg) {
        if (msg)
          flag(this, "message", msg);
        var fn = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
        var initial;
        if (!prop) {
          new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
          initial = subject();
        } else {
          new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
          initial = subject[prop];
        }
        fn();
        var final = prop === void 0 || prop === null ? subject() : subject[prop];
        var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
        flag(this, "deltaMsgObj", msgObj);
        flag(this, "initialDeltaValue", initial);
        flag(this, "finalDeltaValue", final);
        flag(this, "deltaBehavior", "change");
        flag(this, "realDelta", final !== initial);
        this.assert(
          initial !== final,
          "expected " + msgObj + " to change",
          "expected " + msgObj + " to not change"
        );
      }
      __name(assertChanges, "assertChanges");
      Assertion2.addMethod("change", assertChanges);
      Assertion2.addMethod("changes", assertChanges);
      function assertIncreases(subject, prop, msg) {
        if (msg)
          flag(this, "message", msg);
        var fn = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
        var initial;
        if (!prop) {
          new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
          initial = subject();
        } else {
          new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
          initial = subject[prop];
        }
        new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
        fn();
        var final = prop === void 0 || prop === null ? subject() : subject[prop];
        var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
        flag(this, "deltaMsgObj", msgObj);
        flag(this, "initialDeltaValue", initial);
        flag(this, "finalDeltaValue", final);
        flag(this, "deltaBehavior", "increase");
        flag(this, "realDelta", final - initial);
        this.assert(
          final - initial > 0,
          "expected " + msgObj + " to increase",
          "expected " + msgObj + " to not increase"
        );
      }
      __name(assertIncreases, "assertIncreases");
      Assertion2.addMethod("increase", assertIncreases);
      Assertion2.addMethod("increases", assertIncreases);
      function assertDecreases(subject, prop, msg) {
        if (msg)
          flag(this, "message", msg);
        var fn = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
        var initial;
        if (!prop) {
          new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
          initial = subject();
        } else {
          new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
          initial = subject[prop];
        }
        new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
        fn();
        var final = prop === void 0 || prop === null ? subject() : subject[prop];
        var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
        flag(this, "deltaMsgObj", msgObj);
        flag(this, "initialDeltaValue", initial);
        flag(this, "finalDeltaValue", final);
        flag(this, "deltaBehavior", "decrease");
        flag(this, "realDelta", initial - final);
        this.assert(
          final - initial < 0,
          "expected " + msgObj + " to decrease",
          "expected " + msgObj + " to not decrease"
        );
      }
      __name(assertDecreases, "assertDecreases");
      Assertion2.addMethod("decrease", assertDecreases);
      Assertion2.addMethod("decreases", assertDecreases);
      function assertDelta(delta, msg) {
        if (msg)
          flag(this, "message", msg);
        var msgObj = flag(this, "deltaMsgObj");
        var initial = flag(this, "initialDeltaValue");
        var final = flag(this, "finalDeltaValue");
        var behavior = flag(this, "deltaBehavior");
        var realDelta = flag(this, "realDelta");
        var expression;
        if (behavior === "change") {
          expression = Math.abs(final - initial) === Math.abs(delta);
        } else {
          expression = realDelta === Math.abs(delta);
        }
        this.assert(
          expression,
          "expected " + msgObj + " to " + behavior + " by " + delta,
          "expected " + msgObj + " to not " + behavior + " by " + delta
        );
      }
      __name(assertDelta, "assertDelta");
      Assertion2.addMethod("by", assertDelta);
      Assertion2.addProperty("extensible", function() {
        var obj = flag(this, "object");
        var isExtensible = obj === Object(obj) && Object.isExtensible(obj);
        this.assert(
          isExtensible,
          "expected #{this} to be extensible",
          "expected #{this} to not be extensible"
        );
      });
      Assertion2.addProperty("sealed", function() {
        var obj = flag(this, "object");
        var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
        this.assert(
          isSealed,
          "expected #{this} to be sealed",
          "expected #{this} to not be sealed"
        );
      });
      Assertion2.addProperty("frozen", function() {
        var obj = flag(this, "object");
        var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
        this.assert(
          isFrozen,
          "expected #{this} to be frozen",
          "expected #{this} to not be frozen"
        );
      });
      Assertion2.addProperty("finite", function(msg) {
        var obj = flag(this, "object");
        this.assert(
          typeof obj === "number" && isFinite(obj),
          "expected #{this} to be a finite number",
          "expected #{this} to not be a finite number"
        );
      });
    };
  }
});

// node_modules/chai/lib/chai/interface/expect.js
var require_expect = __commonJS({
  "node_modules/chai/lib/chai/interface/expect.js"(exports, module) {
    module.exports = function(chai2, util2) {
      chai2.expect = function(val, message) {
        return new chai2.Assertion(val, message);
      };
      chai2.expect.fail = function(actual, expected, message, operator) {
        if (arguments.length < 2) {
          message = actual;
          actual = void 0;
        }
        message = message || "expect.fail()";
        throw new chai2.AssertionError(message, {
          actual,
          expected,
          operator
        }, chai2.expect.fail);
      };
    };
  }
});

// node_modules/chai/lib/chai/interface/should.js
var require_should = __commonJS({
  "node_modules/chai/lib/chai/interface/should.js"(exports, module) {
    module.exports = function(chai2, util2) {
      var Assertion2 = chai2.Assertion;
      function loadShould() {
        function shouldGetter() {
          if (this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol === "function" && this instanceof Symbol || typeof BigInt === "function" && this instanceof BigInt) {
            return new Assertion2(this.valueOf(), null, shouldGetter);
          }
          return new Assertion2(this, null, shouldGetter);
        }
        __name(shouldGetter, "shouldGetter");
        function shouldSetter(value) {
          Object.defineProperty(this, "should", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
        __name(shouldSetter, "shouldSetter");
        Object.defineProperty(Object.prototype, "should", {
          set: shouldSetter,
          get: shouldGetter,
          configurable: true
        });
        var should2 = {};
        should2.fail = function(actual, expected, message, operator) {
          if (arguments.length < 2) {
            message = actual;
            actual = void 0;
          }
          message = message || "should.fail()";
          throw new chai2.AssertionError(message, {
            actual,
            expected,
            operator
          }, should2.fail);
        };
        should2.equal = function(val1, val2, msg) {
          new Assertion2(val1, msg).to.equal(val2);
        };
        should2.Throw = function(fn, errt, errs, msg) {
          new Assertion2(fn, msg).to.Throw(errt, errs);
        };
        should2.exist = function(val, msg) {
          new Assertion2(val, msg).to.exist;
        };
        should2.not = {};
        should2.not.equal = function(val1, val2, msg) {
          new Assertion2(val1, msg).to.not.equal(val2);
        };
        should2.not.Throw = function(fn, errt, errs, msg) {
          new Assertion2(fn, msg).to.not.Throw(errt, errs);
        };
        should2.not.exist = function(val, msg) {
          new Assertion2(val, msg).to.not.exist;
        };
        should2["throw"] = should2["Throw"];
        should2.not["throw"] = should2.not["Throw"];
        return should2;
      }
      __name(loadShould, "loadShould");
      ;
      chai2.should = loadShould;
      chai2.Should = loadShould;
    };
  }
});

// node_modules/chai/lib/chai/interface/assert.js
var require_assert = __commonJS({
  "node_modules/chai/lib/chai/interface/assert.js"(exports, module) {
    module.exports = function(chai2, util2) {
      var Assertion2 = chai2.Assertion, flag = util2.flag;
      var assert2 = chai2.assert = function(express, errmsg) {
        var test = new Assertion2(null, null, chai2.assert, true);
        test.assert(
          express,
          errmsg,
          "[ negation message unavailable ]"
        );
      };
      assert2.fail = function(actual, expected, message, operator) {
        if (arguments.length < 2) {
          message = actual;
          actual = void 0;
        }
        message = message || "assert.fail()";
        throw new chai2.AssertionError(message, {
          actual,
          expected,
          operator
        }, assert2.fail);
      };
      assert2.isOk = function(val, msg) {
        new Assertion2(val, msg, assert2.isOk, true).is.ok;
      };
      assert2.isNotOk = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotOk, true).is.not.ok;
      };
      assert2.equal = function(act, exp, msg) {
        var test = new Assertion2(act, msg, assert2.equal, true);
        test.assert(
          exp == flag(test, "object"),
          "expected #{this} to equal #{exp}",
          "expected #{this} to not equal #{act}",
          exp,
          act,
          true
        );
      };
      assert2.notEqual = function(act, exp, msg) {
        var test = new Assertion2(act, msg, assert2.notEqual, true);
        test.assert(
          exp != flag(test, "object"),
          "expected #{this} to not equal #{exp}",
          "expected #{this} to equal #{act}",
          exp,
          act,
          true
        );
      };
      assert2.strictEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.strictEqual, true).to.equal(exp);
      };
      assert2.notStrictEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.notStrictEqual, true).to.not.equal(exp);
      };
      assert2.deepEqual = assert2.deepStrictEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.deepEqual, true).to.eql(exp);
      };
      assert2.notDeepEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.notDeepEqual, true).to.not.eql(exp);
      };
      assert2.isAbove = function(val, abv, msg) {
        new Assertion2(val, msg, assert2.isAbove, true).to.be.above(abv);
      };
      assert2.isAtLeast = function(val, atlst, msg) {
        new Assertion2(val, msg, assert2.isAtLeast, true).to.be.least(atlst);
      };
      assert2.isBelow = function(val, blw, msg) {
        new Assertion2(val, msg, assert2.isBelow, true).to.be.below(blw);
      };
      assert2.isAtMost = function(val, atmst, msg) {
        new Assertion2(val, msg, assert2.isAtMost, true).to.be.most(atmst);
      };
      assert2.isTrue = function(val, msg) {
        new Assertion2(val, msg, assert2.isTrue, true).is["true"];
      };
      assert2.isNotTrue = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotTrue, true).to.not.equal(true);
      };
      assert2.isFalse = function(val, msg) {
        new Assertion2(val, msg, assert2.isFalse, true).is["false"];
      };
      assert2.isNotFalse = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotFalse, true).to.not.equal(false);
      };
      assert2.isNull = function(val, msg) {
        new Assertion2(val, msg, assert2.isNull, true).to.equal(null);
      };
      assert2.isNotNull = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotNull, true).to.not.equal(null);
      };
      assert2.isNaN = function(val, msg) {
        new Assertion2(val, msg, assert2.isNaN, true).to.be.NaN;
      };
      assert2.isNotNaN = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotNaN, true).not.to.be.NaN;
      };
      assert2.exists = function(val, msg) {
        new Assertion2(val, msg, assert2.exists, true).to.exist;
      };
      assert2.notExists = function(val, msg) {
        new Assertion2(val, msg, assert2.notExists, true).to.not.exist;
      };
      assert2.isUndefined = function(val, msg) {
        new Assertion2(val, msg, assert2.isUndefined, true).to.equal(void 0);
      };
      assert2.isDefined = function(val, msg) {
        new Assertion2(val, msg, assert2.isDefined, true).to.not.equal(void 0);
      };
      assert2.isFunction = function(val, msg) {
        new Assertion2(val, msg, assert2.isFunction, true).to.be.a("function");
      };
      assert2.isNotFunction = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotFunction, true).to.not.be.a("function");
      };
      assert2.isObject = function(val, msg) {
        new Assertion2(val, msg, assert2.isObject, true).to.be.a("object");
      };
      assert2.isNotObject = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotObject, true).to.not.be.a("object");
      };
      assert2.isArray = function(val, msg) {
        new Assertion2(val, msg, assert2.isArray, true).to.be.an("array");
      };
      assert2.isNotArray = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotArray, true).to.not.be.an("array");
      };
      assert2.isString = function(val, msg) {
        new Assertion2(val, msg, assert2.isString, true).to.be.a("string");
      };
      assert2.isNotString = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotString, true).to.not.be.a("string");
      };
      assert2.isNumber = function(val, msg) {
        new Assertion2(val, msg, assert2.isNumber, true).to.be.a("number");
      };
      assert2.isNotNumber = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotNumber, true).to.not.be.a("number");
      };
      assert2.isFinite = function(val, msg) {
        new Assertion2(val, msg, assert2.isFinite, true).to.be.finite;
      };
      assert2.isBoolean = function(val, msg) {
        new Assertion2(val, msg, assert2.isBoolean, true).to.be.a("boolean");
      };
      assert2.isNotBoolean = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotBoolean, true).to.not.be.a("boolean");
      };
      assert2.typeOf = function(val, type, msg) {
        new Assertion2(val, msg, assert2.typeOf, true).to.be.a(type);
      };
      assert2.notTypeOf = function(val, type, msg) {
        new Assertion2(val, msg, assert2.notTypeOf, true).to.not.be.a(type);
      };
      assert2.instanceOf = function(val, type, msg) {
        new Assertion2(val, msg, assert2.instanceOf, true).to.be.instanceOf(type);
      };
      assert2.notInstanceOf = function(val, type, msg) {
        new Assertion2(val, msg, assert2.notInstanceOf, true).to.not.be.instanceOf(type);
      };
      assert2.include = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.include, true).include(inc);
      };
      assert2.notInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notInclude, true).not.include(inc);
      };
      assert2.deepInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.deepInclude, true).deep.include(inc);
      };
      assert2.notDeepInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notDeepInclude, true).not.deep.include(inc);
      };
      assert2.nestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.nestedInclude, true).nested.include(inc);
      };
      assert2.notNestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notNestedInclude, true).not.nested.include(inc);
      };
      assert2.deepNestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.deepNestedInclude, true).deep.nested.include(inc);
      };
      assert2.notDeepNestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notDeepNestedInclude, true).not.deep.nested.include(inc);
      };
      assert2.ownInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.ownInclude, true).own.include(inc);
      };
      assert2.notOwnInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notOwnInclude, true).not.own.include(inc);
      };
      assert2.deepOwnInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.deepOwnInclude, true).deep.own.include(inc);
      };
      assert2.notDeepOwnInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notDeepOwnInclude, true).not.deep.own.include(inc);
      };
      assert2.match = function(exp, re, msg) {
        new Assertion2(exp, msg, assert2.match, true).to.match(re);
      };
      assert2.notMatch = function(exp, re, msg) {
        new Assertion2(exp, msg, assert2.notMatch, true).to.not.match(re);
      };
      assert2.property = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.property, true).to.have.property(prop);
      };
      assert2.notProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.notProperty, true).to.not.have.property(prop);
      };
      assert2.propertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.propertyVal, true).to.have.property(prop, val);
      };
      assert2.notPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notPropertyVal, true).to.not.have.property(prop, val);
      };
      assert2.deepPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.deepPropertyVal, true).to.have.deep.property(prop, val);
      };
      assert2.notDeepPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
      };
      assert2.ownProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.ownProperty, true).to.have.own.property(prop);
      };
      assert2.notOwnProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.notOwnProperty, true).to.not.have.own.property(prop);
      };
      assert2.ownPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.ownPropertyVal, true).to.have.own.property(prop, value);
      };
      assert2.notOwnPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
      };
      assert2.deepOwnPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
      };
      assert2.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
      };
      assert2.nestedProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.nestedProperty, true).to.have.nested.property(prop);
      };
      assert2.notNestedProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.notNestedProperty, true).to.not.have.nested.property(prop);
      };
      assert2.nestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.nestedPropertyVal, true).to.have.nested.property(prop, val);
      };
      assert2.notNestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
      };
      assert2.deepNestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
      };
      assert2.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
      };
      assert2.lengthOf = function(exp, len, msg) {
        new Assertion2(exp, msg, assert2.lengthOf, true).to.have.lengthOf(len);
      };
      assert2.hasAnyKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.hasAnyKeys, true).to.have.any.keys(keys);
      };
      assert2.hasAllKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.hasAllKeys, true).to.have.all.keys(keys);
      };
      assert2.containsAllKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.containsAllKeys, true).to.contain.all.keys(keys);
      };
      assert2.doesNotHaveAnyKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys);
      };
      assert2.doesNotHaveAllKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAllKeys, true).to.not.have.all.keys(keys);
      };
      assert2.hasAnyDeepKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.hasAnyDeepKeys, true).to.have.any.deep.keys(keys);
      };
      assert2.hasAllDeepKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.hasAllDeepKeys, true).to.have.all.deep.keys(keys);
      };
      assert2.containsAllDeepKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.containsAllDeepKeys, true).to.contain.all.deep.keys(keys);
      };
      assert2.doesNotHaveAnyDeepKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys);
      };
      assert2.doesNotHaveAllDeepKeys = function(obj, keys, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys);
      };
      assert2.throws = function(fn, errorLike, errMsgMatcher, msg) {
        if ("string" === typeof errorLike || errorLike instanceof RegExp) {
          errMsgMatcher = errorLike;
          errorLike = null;
        }
        var assertErr = new Assertion2(fn, msg, assert2.throws, true).to.throw(errorLike, errMsgMatcher);
        return flag(assertErr, "object");
      };
      assert2.doesNotThrow = function(fn, errorLike, errMsgMatcher, msg) {
        if ("string" === typeof errorLike || errorLike instanceof RegExp) {
          errMsgMatcher = errorLike;
          errorLike = null;
        }
        new Assertion2(fn, msg, assert2.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
      };
      assert2.operator = function(val, operator, val2, msg) {
        var ok;
        switch (operator) {
          case "==":
            ok = val == val2;
            break;
          case "===":
            ok = val === val2;
            break;
          case ">":
            ok = val > val2;
            break;
          case ">=":
            ok = val >= val2;
            break;
          case "<":
            ok = val < val2;
            break;
          case "<=":
            ok = val <= val2;
            break;
          case "!=":
            ok = val != val2;
            break;
          case "!==":
            ok = val !== val2;
            break;
          default:
            msg = msg ? msg + ": " : msg;
            throw new chai2.AssertionError(
              msg + 'Invalid operator "' + operator + '"',
              void 0,
              assert2.operator
            );
        }
        var test = new Assertion2(ok, msg, assert2.operator, true);
        test.assert(
          true === flag(test, "object"),
          "expected " + util2.inspect(val) + " to be " + operator + " " + util2.inspect(val2),
          "expected " + util2.inspect(val) + " to not be " + operator + " " + util2.inspect(val2)
        );
      };
      assert2.closeTo = function(act, exp, delta, msg) {
        new Assertion2(act, msg, assert2.closeTo, true).to.be.closeTo(exp, delta);
      };
      assert2.approximately = function(act, exp, delta, msg) {
        new Assertion2(act, msg, assert2.approximately, true).to.be.approximately(exp, delta);
      };
      assert2.sameMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.sameMembers, true).to.have.same.members(set2);
      };
      assert2.notSameMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.notSameMembers, true).to.not.have.same.members(set2);
      };
      assert2.sameDeepMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.sameDeepMembers, true).to.have.same.deep.members(set2);
      };
      assert2.notSameDeepMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
      };
      assert2.sameOrderedMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.sameOrderedMembers, true).to.have.same.ordered.members(set2);
      };
      assert2.notSameOrderedMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
      };
      assert2.sameDeepOrderedMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
      };
      assert2.notSameDeepOrderedMembers = function(set1, set2, msg) {
        new Assertion2(set1, msg, assert2.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
      };
      assert2.includeMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeMembers, true).to.include.members(subset);
      };
      assert2.notIncludeMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeMembers, true).to.not.include.members(subset);
      };
      assert2.includeDeepMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeDeepMembers, true).to.include.deep.members(subset);
      };
      assert2.notIncludeDeepMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
      };
      assert2.includeOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeOrderedMembers, true).to.include.ordered.members(subset);
      };
      assert2.notIncludeOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
      };
      assert2.includeDeepOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
      };
      assert2.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
      };
      assert2.oneOf = function(inList, list, msg) {
        new Assertion2(inList, msg, assert2.oneOf, true).to.be.oneOf(list);
      };
      assert2.changes = function(fn, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.changes, true).to.change(obj, prop);
      };
      assert2.changesBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.changesBy, true).to.change(obj, prop).by(delta);
      };
      assert2.doesNotChange = function(fn, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn, msg, assert2.doesNotChange, true).to.not.change(obj, prop);
      };
      assert2.changesButNotBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
      };
      assert2.increases = function(fn, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn, msg, assert2.increases, true).to.increase(obj, prop);
      };
      assert2.increasesBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.increasesBy, true).to.increase(obj, prop).by(delta);
      };
      assert2.doesNotIncrease = function(fn, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn, msg, assert2.doesNotIncrease, true).to.not.increase(obj, prop);
      };
      assert2.increasesButNotBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
      };
      assert2.decreases = function(fn, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn, msg, assert2.decreases, true).to.decrease(obj, prop);
      };
      assert2.decreasesBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.decreasesBy, true).to.decrease(obj, prop).by(delta);
      };
      assert2.doesNotDecrease = function(fn, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn, msg, assert2.doesNotDecrease, true).to.not.decrease(obj, prop);
      };
      assert2.doesNotDecreaseBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        return new Assertion2(fn, msg, assert2.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
      };
      assert2.decreasesButNotBy = function(fn, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn, msg, assert2.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
      };
      assert2.ifError = function(val) {
        if (val) {
          throw val;
        }
      };
      assert2.isExtensible = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isExtensible, true).to.be.extensible;
      };
      assert2.isNotExtensible = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isNotExtensible, true).to.not.be.extensible;
      };
      assert2.isSealed = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isSealed, true).to.be.sealed;
      };
      assert2.isNotSealed = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isNotSealed, true).to.not.be.sealed;
      };
      assert2.isFrozen = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isFrozen, true).to.be.frozen;
      };
      assert2.isNotFrozen = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isNotFrozen, true).to.not.be.frozen;
      };
      assert2.isEmpty = function(val, msg) {
        new Assertion2(val, msg, assert2.isEmpty, true).to.be.empty;
      };
      assert2.isNotEmpty = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotEmpty, true).to.not.be.empty;
      };
      (/* @__PURE__ */ __name(function alias(name, as) {
        assert2[as] = assert2[name];
        return alias;
      }, "alias"))("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty");
    };
  }
});

// node_modules/chai/lib/chai.js
var require_chai = __commonJS({
  "node_modules/chai/lib/chai.js"(exports) {
    var used = [];
    exports.version = "4.3.8";
    exports.AssertionError = require_assertion_error();
    var util2 = require_utils();
    exports.use = function(fn) {
      if (!~used.indexOf(fn)) {
        fn(exports, util2);
        used.push(fn);
      }
      return exports;
    };
    exports.util = util2;
    var config2 = require_config();
    exports.config = config2;
    var assertion = require_assertion();
    exports.use(assertion);
    var core2 = require_assertions();
    exports.use(core2);
    var expect2 = require_expect();
    exports.use(expect2);
    var should2 = require_should();
    exports.use(should2);
    var assert2 = require_assert();
    exports.use(assert2);
  }
});

// node_modules/chai/index.js
var require_chai2 = __commonJS({
  "node_modules/chai/index.js"(exports, module) {
    module.exports = require_chai();
  }
});

// node_modules/node-releases/data/processed/envs.json
var require_envs = __commonJS({
  "node_modules/node-releases/data/processed/envs.json"(exports, module) {
    module.exports = [{ name: "nodejs", version: "0.2.0", date: "2011-08-26", lts: false, security: false, v8: "2.3.8.0" }, { name: "nodejs", version: "0.3.0", date: "2011-08-26", lts: false, security: false, v8: "2.5.1.0" }, { name: "nodejs", version: "0.4.0", date: "2011-08-26", lts: false, security: false, v8: "3.1.2.0" }, { name: "nodejs", version: "0.5.0", date: "2011-08-26", lts: false, security: false, v8: "3.1.8.25" }, { name: "nodejs", version: "0.6.0", date: "2011-11-04", lts: false, security: false, v8: "3.6.6.6" }, { name: "nodejs", version: "0.7.0", date: "2012-01-17", lts: false, security: false, v8: "3.8.6.0" }, { name: "nodejs", version: "0.8.0", date: "2012-06-22", lts: false, security: false, v8: "3.11.10.10" }, { name: "nodejs", version: "0.9.0", date: "2012-07-20", lts: false, security: false, v8: "3.11.10.15" }, { name: "nodejs", version: "0.10.0", date: "2013-03-11", lts: false, security: false, v8: "3.14.5.8" }, { name: "nodejs", version: "0.11.0", date: "2013-03-28", lts: false, security: false, v8: "3.17.13.0" }, { name: "nodejs", version: "0.12.0", date: "2015-02-06", lts: false, security: false, v8: "3.28.73.0" }, { name: "nodejs", version: "4.0.0", date: "2015-09-08", lts: false, security: false, v8: "4.5.103.30" }, { name: "nodejs", version: "4.1.0", date: "2015-09-17", lts: false, security: false, v8: "4.5.103.33" }, { name: "nodejs", version: "4.2.0", date: "2015-10-12", lts: "Argon", security: false, v8: "4.5.103.35" }, { name: "nodejs", version: "4.3.0", date: "2016-02-09", lts: "Argon", security: false, v8: "4.5.103.35" }, { name: "nodejs", version: "4.4.0", date: "2016-03-08", lts: "Argon", security: false, v8: "4.5.103.35" }, { name: "nodejs", version: "4.5.0", date: "2016-08-16", lts: "Argon", security: false, v8: "4.5.103.37" }, { name: "nodejs", version: "4.6.0", date: "2016-09-27", lts: "Argon", security: true, v8: "4.5.103.37" }, { name: "nodejs", version: "4.7.0", date: "2016-12-06", lts: "Argon", security: false, v8: "4.5.103.43" }, { name: "nodejs", version: "4.8.0", date: "2017-02-21", lts: "Argon", security: false, v8: "4.5.103.45" }, { name: "nodejs", version: "4.9.0", date: "2018-03-28", lts: "Argon", security: true, v8: "4.5.103.53" }, { name: "nodejs", version: "5.0.0", date: "2015-10-29", lts: false, security: false, v8: "4.6.85.28" }, { name: "nodejs", version: "5.1.0", date: "2015-11-17", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.2.0", date: "2015-12-09", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.3.0", date: "2015-12-15", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.4.0", date: "2016-01-06", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.5.0", date: "2016-01-21", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.6.0", date: "2016-02-09", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.7.0", date: "2016-02-23", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.8.0", date: "2016-03-09", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.9.0", date: "2016-03-16", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.10.0", date: "2016-04-01", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.11.0", date: "2016-04-21", lts: false, security: false, v8: "4.6.85.31" }, { name: "nodejs", version: "5.12.0", date: "2016-06-23", lts: false, security: false, v8: "4.6.85.32" }, { name: "nodejs", version: "6.0.0", date: "2016-04-26", lts: false, security: false, v8: "5.0.71.35" }, { name: "nodejs", version: "6.1.0", date: "2016-05-05", lts: false, security: false, v8: "5.0.71.35" }, { name: "nodejs", version: "6.2.0", date: "2016-05-17", lts: false, security: false, v8: "5.0.71.47" }, { name: "nodejs", version: "6.3.0", date: "2016-07-06", lts: false, security: false, v8: "5.0.71.52" }, { name: "nodejs", version: "6.4.0", date: "2016-08-12", lts: false, security: false, v8: "5.0.71.60" }, { name: "nodejs", version: "6.5.0", date: "2016-08-26", lts: false, security: false, v8: "5.1.281.81" }, { name: "nodejs", version: "6.6.0", date: "2016-09-14", lts: false, security: false, v8: "5.1.281.83" }, { name: "nodejs", version: "6.7.0", date: "2016-09-27", lts: false, security: true, v8: "5.1.281.83" }, { name: "nodejs", version: "6.8.0", date: "2016-10-12", lts: false, security: false, v8: "5.1.281.84" }, { name: "nodejs", version: "6.9.0", date: "2016-10-18", lts: "Boron", security: false, v8: "5.1.281.84" }, { name: "nodejs", version: "6.10.0", date: "2017-02-21", lts: "Boron", security: false, v8: "5.1.281.93" }, { name: "nodejs", version: "6.11.0", date: "2017-06-06", lts: "Boron", security: false, v8: "5.1.281.102" }, { name: "nodejs", version: "6.12.0", date: "2017-11-06", lts: "Boron", security: false, v8: "5.1.281.108" }, { name: "nodejs", version: "6.13.0", date: "2018-02-10", lts: "Boron", security: false, v8: "5.1.281.111" }, { name: "nodejs", version: "6.14.0", date: "2018-03-28", lts: "Boron", security: true, v8: "5.1.281.111" }, { name: "nodejs", version: "6.15.0", date: "2018-11-27", lts: "Boron", security: true, v8: "5.1.281.111" }, { name: "nodejs", version: "6.16.0", date: "2018-12-26", lts: "Boron", security: false, v8: "5.1.281.111" }, { name: "nodejs", version: "6.17.0", date: "2019-02-28", lts: "Boron", security: true, v8: "5.1.281.111" }, { name: "nodejs", version: "7.0.0", date: "2016-10-25", lts: false, security: false, v8: "5.4.500.36" }, { name: "nodejs", version: "7.1.0", date: "2016-11-08", lts: false, security: false, v8: "5.4.500.36" }, { name: "nodejs", version: "7.2.0", date: "2016-11-22", lts: false, security: false, v8: "5.4.500.43" }, { name: "nodejs", version: "7.3.0", date: "2016-12-20", lts: false, security: false, v8: "5.4.500.45" }, { name: "nodejs", version: "7.4.0", date: "2017-01-04", lts: false, security: false, v8: "5.4.500.45" }, { name: "nodejs", version: "7.5.0", date: "2017-01-31", lts: false, security: false, v8: "5.4.500.48" }, { name: "nodejs", version: "7.6.0", date: "2017-02-21", lts: false, security: false, v8: "5.5.372.40" }, { name: "nodejs", version: "7.7.0", date: "2017-02-28", lts: false, security: false, v8: "5.5.372.41" }, { name: "nodejs", version: "7.8.0", date: "2017-03-29", lts: false, security: false, v8: "5.5.372.43" }, { name: "nodejs", version: "7.9.0", date: "2017-04-11", lts: false, security: false, v8: "5.5.372.43" }, { name: "nodejs", version: "7.10.0", date: "2017-05-02", lts: false, security: false, v8: "5.5.372.43" }, { name: "nodejs", version: "8.0.0", date: "2017-05-30", lts: false, security: false, v8: "5.8.283.41" }, { name: "nodejs", version: "8.1.0", date: "2017-06-08", lts: false, security: false, v8: "5.8.283.41" }, { name: "nodejs", version: "8.2.0", date: "2017-07-19", lts: false, security: false, v8: "5.8.283.41" }, { name: "nodejs", version: "8.3.0", date: "2017-08-08", lts: false, security: false, v8: "6.0.286.52" }, { name: "nodejs", version: "8.4.0", date: "2017-08-15", lts: false, security: false, v8: "6.0.286.52" }, { name: "nodejs", version: "8.5.0", date: "2017-09-12", lts: false, security: false, v8: "6.0.287.53" }, { name: "nodejs", version: "8.6.0", date: "2017-09-26", lts: false, security: false, v8: "6.0.287.53" }, { name: "nodejs", version: "8.7.0", date: "2017-10-11", lts: false, security: false, v8: "6.1.534.42" }, { name: "nodejs", version: "8.8.0", date: "2017-10-24", lts: false, security: false, v8: "6.1.534.42" }, { name: "nodejs", version: "8.9.0", date: "2017-10-31", lts: "Carbon", security: false, v8: "6.1.534.46" }, { name: "nodejs", version: "8.10.0", date: "2018-03-06", lts: "Carbon", security: false, v8: "6.2.414.50" }, { name: "nodejs", version: "8.11.0", date: "2018-03-28", lts: "Carbon", security: true, v8: "6.2.414.50" }, { name: "nodejs", version: "8.12.0", date: "2018-09-10", lts: "Carbon", security: false, v8: "6.2.414.66" }, { name: "nodejs", version: "8.13.0", date: "2018-11-20", lts: "Carbon", security: false, v8: "6.2.414.72" }, { name: "nodejs", version: "8.14.0", date: "2018-11-27", lts: "Carbon", security: true, v8: "6.2.414.72" }, { name: "nodejs", version: "8.15.0", date: "2018-12-26", lts: "Carbon", security: false, v8: "6.2.414.75" }, { name: "nodejs", version: "8.16.0", date: "2019-04-16", lts: "Carbon", security: false, v8: "6.2.414.77" }, { name: "nodejs", version: "8.17.0", date: "2019-12-17", lts: "Carbon", security: true, v8: "6.2.414.78" }, { name: "nodejs", version: "9.0.0", date: "2017-10-31", lts: false, security: false, v8: "6.2.414.32" }, { name: "nodejs", version: "9.1.0", date: "2017-11-07", lts: false, security: false, v8: "6.2.414.32" }, { name: "nodejs", version: "9.2.0", date: "2017-11-14", lts: false, security: false, v8: "6.2.414.44" }, { name: "nodejs", version: "9.3.0", date: "2017-12-12", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.4.0", date: "2018-01-10", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.5.0", date: "2018-01-31", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.6.0", date: "2018-02-21", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.7.0", date: "2018-03-01", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.8.0", date: "2018-03-07", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.9.0", date: "2018-03-21", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "9.10.0", date: "2018-03-28", lts: false, security: true, v8: "6.2.414.46" }, { name: "nodejs", version: "9.11.0", date: "2018-04-04", lts: false, security: false, v8: "6.2.414.46" }, { name: "nodejs", version: "10.0.0", date: "2018-04-24", lts: false, security: false, v8: "6.6.346.24" }, { name: "nodejs", version: "10.1.0", date: "2018-05-08", lts: false, security: false, v8: "6.6.346.27" }, { name: "nodejs", version: "10.2.0", date: "2018-05-23", lts: false, security: false, v8: "6.6.346.32" }, { name: "nodejs", version: "10.3.0", date: "2018-05-29", lts: false, security: false, v8: "6.6.346.32" }, { name: "nodejs", version: "10.4.0", date: "2018-06-06", lts: false, security: false, v8: "6.7.288.43" }, { name: "nodejs", version: "10.5.0", date: "2018-06-20", lts: false, security: false, v8: "6.7.288.46" }, { name: "nodejs", version: "10.6.0", date: "2018-07-04", lts: false, security: false, v8: "6.7.288.46" }, { name: "nodejs", version: "10.7.0", date: "2018-07-18", lts: false, security: false, v8: "6.7.288.49" }, { name: "nodejs", version: "10.8.0", date: "2018-08-01", lts: false, security: false, v8: "6.7.288.49" }, { name: "nodejs", version: "10.9.0", date: "2018-08-15", lts: false, security: false, v8: "6.8.275.24" }, { name: "nodejs", version: "10.10.0", date: "2018-09-06", lts: false, security: false, v8: "6.8.275.30" }, { name: "nodejs", version: "10.11.0", date: "2018-09-19", lts: false, security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.12.0", date: "2018-10-10", lts: false, security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.13.0", date: "2018-10-30", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.14.0", date: "2018-11-27", lts: "Dubnium", security: true, v8: "6.8.275.32" }, { name: "nodejs", version: "10.15.0", date: "2018-12-26", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.16.0", date: "2019-05-28", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.17.0", date: "2019-10-22", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.18.0", date: "2019-12-17", lts: "Dubnium", security: true, v8: "6.8.275.32" }, { name: "nodejs", version: "10.19.0", date: "2020-02-05", lts: "Dubnium", security: true, v8: "6.8.275.32" }, { name: "nodejs", version: "10.20.0", date: "2020-03-26", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.21.0", date: "2020-06-02", lts: "Dubnium", security: true, v8: "6.8.275.32" }, { name: "nodejs", version: "10.22.0", date: "2020-07-21", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.23.0", date: "2020-10-27", lts: "Dubnium", security: false, v8: "6.8.275.32" }, { name: "nodejs", version: "10.24.0", date: "2021-02-23", lts: "Dubnium", security: true, v8: "6.8.275.32" }, { name: "nodejs", version: "11.0.0", date: "2018-10-23", lts: false, security: false, v8: "7.0.276.28" }, { name: "nodejs", version: "11.1.0", date: "2018-10-30", lts: false, security: false, v8: "7.0.276.32" }, { name: "nodejs", version: "11.2.0", date: "2018-11-15", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.3.0", date: "2018-11-27", lts: false, security: true, v8: "7.0.276.38" }, { name: "nodejs", version: "11.4.0", date: "2018-12-07", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.5.0", date: "2018-12-18", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.6.0", date: "2018-12-26", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.7.0", date: "2019-01-17", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.8.0", date: "2019-01-24", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.9.0", date: "2019-01-30", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.10.0", date: "2019-02-14", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.11.0", date: "2019-03-05", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.12.0", date: "2019-03-14", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.13.0", date: "2019-03-28", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.14.0", date: "2019-04-10", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "11.15.0", date: "2019-04-30", lts: false, security: false, v8: "7.0.276.38" }, { name: "nodejs", version: "12.0.0", date: "2019-04-23", lts: false, security: false, v8: "7.4.288.21" }, { name: "nodejs", version: "12.1.0", date: "2019-04-29", lts: false, security: false, v8: "7.4.288.21" }, { name: "nodejs", version: "12.2.0", date: "2019-05-07", lts: false, security: false, v8: "7.4.288.21" }, { name: "nodejs", version: "12.3.0", date: "2019-05-21", lts: false, security: false, v8: "7.4.288.27" }, { name: "nodejs", version: "12.4.0", date: "2019-06-04", lts: false, security: false, v8: "7.4.288.27" }, { name: "nodejs", version: "12.5.0", date: "2019-06-26", lts: false, security: false, v8: "7.5.288.22" }, { name: "nodejs", version: "12.6.0", date: "2019-07-03", lts: false, security: false, v8: "7.5.288.22" }, { name: "nodejs", version: "12.7.0", date: "2019-07-23", lts: false, security: false, v8: "7.5.288.22" }, { name: "nodejs", version: "12.8.0", date: "2019-08-06", lts: false, security: false, v8: "7.5.288.22" }, { name: "nodejs", version: "12.9.0", date: "2019-08-20", lts: false, security: false, v8: "7.6.303.29" }, { name: "nodejs", version: "12.10.0", date: "2019-09-04", lts: false, security: false, v8: "7.6.303.29" }, { name: "nodejs", version: "12.11.0", date: "2019-09-25", lts: false, security: false, v8: "7.7.299.11" }, { name: "nodejs", version: "12.12.0", date: "2019-10-11", lts: false, security: false, v8: "7.7.299.13" }, { name: "nodejs", version: "12.13.0", date: "2019-10-21", lts: "Erbium", security: false, v8: "7.7.299.13" }, { name: "nodejs", version: "12.14.0", date: "2019-12-17", lts: "Erbium", security: true, v8: "7.7.299.13" }, { name: "nodejs", version: "12.15.0", date: "2020-02-05", lts: "Erbium", security: true, v8: "7.7.299.13" }, { name: "nodejs", version: "12.16.0", date: "2020-02-11", lts: "Erbium", security: false, v8: "7.8.279.23" }, { name: "nodejs", version: "12.17.0", date: "2020-05-26", lts: "Erbium", security: false, v8: "7.8.279.23" }, { name: "nodejs", version: "12.18.0", date: "2020-06-02", lts: "Erbium", security: true, v8: "7.8.279.23" }, { name: "nodejs", version: "12.19.0", date: "2020-10-06", lts: "Erbium", security: false, v8: "7.8.279.23" }, { name: "nodejs", version: "12.20.0", date: "2020-11-24", lts: "Erbium", security: false, v8: "7.8.279.23" }, { name: "nodejs", version: "12.21.0", date: "2021-02-23", lts: "Erbium", security: true, v8: "7.8.279.23" }, { name: "nodejs", version: "12.22.0", date: "2021-03-30", lts: "Erbium", security: false, v8: "7.8.279.23" }, { name: "nodejs", version: "13.0.0", date: "2019-10-22", lts: false, security: false, v8: "7.8.279.17" }, { name: "nodejs", version: "13.1.0", date: "2019-11-05", lts: false, security: false, v8: "7.8.279.17" }, { name: "nodejs", version: "13.2.0", date: "2019-11-21", lts: false, security: false, v8: "7.9.317.23" }, { name: "nodejs", version: "13.3.0", date: "2019-12-03", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.4.0", date: "2019-12-17", lts: false, security: true, v8: "7.9.317.25" }, { name: "nodejs", version: "13.5.0", date: "2019-12-18", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.6.0", date: "2020-01-07", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.7.0", date: "2020-01-21", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.8.0", date: "2020-02-05", lts: false, security: true, v8: "7.9.317.25" }, { name: "nodejs", version: "13.9.0", date: "2020-02-18", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.10.0", date: "2020-03-04", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.11.0", date: "2020-03-12", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.12.0", date: "2020-03-26", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.13.0", date: "2020-04-14", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "13.14.0", date: "2020-04-29", lts: false, security: false, v8: "7.9.317.25" }, { name: "nodejs", version: "14.0.0", date: "2020-04-21", lts: false, security: false, v8: "8.1.307.30" }, { name: "nodejs", version: "14.1.0", date: "2020-04-29", lts: false, security: false, v8: "8.1.307.31" }, { name: "nodejs", version: "14.2.0", date: "2020-05-05", lts: false, security: false, v8: "8.1.307.31" }, { name: "nodejs", version: "14.3.0", date: "2020-05-19", lts: false, security: false, v8: "8.1.307.31" }, { name: "nodejs", version: "14.4.0", date: "2020-06-02", lts: false, security: true, v8: "8.1.307.31" }, { name: "nodejs", version: "14.5.0", date: "2020-06-30", lts: false, security: false, v8: "8.3.110.9" }, { name: "nodejs", version: "14.6.0", date: "2020-07-20", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.7.0", date: "2020-07-29", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.8.0", date: "2020-08-11", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.9.0", date: "2020-08-27", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.10.0", date: "2020-09-08", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.11.0", date: "2020-09-15", lts: false, security: true, v8: "8.4.371.19" }, { name: "nodejs", version: "14.12.0", date: "2020-09-22", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.13.0", date: "2020-09-29", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.14.0", date: "2020-10-15", lts: false, security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.15.0", date: "2020-10-27", lts: "Fermium", security: false, v8: "8.4.371.19" }, { name: "nodejs", version: "14.16.0", date: "2021-02-23", lts: "Fermium", security: true, v8: "8.4.371.19" }, { name: "nodejs", version: "14.17.0", date: "2021-05-11", lts: "Fermium", security: false, v8: "8.4.371.23" }, { name: "nodejs", version: "14.18.0", date: "2021-09-28", lts: "Fermium", security: false, v8: "8.4.371.23" }, { name: "nodejs", version: "14.19.0", date: "2022-02-01", lts: "Fermium", security: false, v8: "8.4.371.23" }, { name: "nodejs", version: "14.20.0", date: "2022-07-07", lts: "Fermium", security: true, v8: "8.4.371.23" }, { name: "nodejs", version: "14.21.0", date: "2022-11-01", lts: "Fermium", security: false, v8: "8.4.371.23" }, { name: "nodejs", version: "15.0.0", date: "2020-10-20", lts: false, security: false, v8: "8.6.395.16" }, { name: "nodejs", version: "15.1.0", date: "2020-11-04", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.2.0", date: "2020-11-10", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.3.0", date: "2020-11-24", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.4.0", date: "2020-12-09", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.5.0", date: "2020-12-22", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.6.0", date: "2021-01-14", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.7.0", date: "2021-01-25", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.8.0", date: "2021-02-02", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.9.0", date: "2021-02-18", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.10.0", date: "2021-02-23", lts: false, security: true, v8: "8.6.395.17" }, { name: "nodejs", version: "15.11.0", date: "2021-03-03", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.12.0", date: "2021-03-17", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.13.0", date: "2021-03-31", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "15.14.0", date: "2021-04-06", lts: false, security: false, v8: "8.6.395.17" }, { name: "nodejs", version: "16.0.0", date: "2021-04-20", lts: false, security: false, v8: "9.0.257.17" }, { name: "nodejs", version: "16.1.0", date: "2021-05-04", lts: false, security: false, v8: "9.0.257.24" }, { name: "nodejs", version: "16.2.0", date: "2021-05-19", lts: false, security: false, v8: "9.0.257.25" }, { name: "nodejs", version: "16.3.0", date: "2021-06-03", lts: false, security: false, v8: "9.0.257.25" }, { name: "nodejs", version: "16.4.0", date: "2021-06-23", lts: false, security: false, v8: "9.1.269.36" }, { name: "nodejs", version: "16.5.0", date: "2021-07-14", lts: false, security: false, v8: "9.1.269.38" }, { name: "nodejs", version: "16.6.0", date: "2021-07-29", lts: false, security: true, v8: "9.2.230.21" }, { name: "nodejs", version: "16.7.0", date: "2021-08-18", lts: false, security: false, v8: "9.2.230.21" }, { name: "nodejs", version: "16.8.0", date: "2021-08-25", lts: false, security: false, v8: "9.2.230.21" }, { name: "nodejs", version: "16.9.0", date: "2021-09-07", lts: false, security: false, v8: "9.3.345.16" }, { name: "nodejs", version: "16.10.0", date: "2021-09-22", lts: false, security: false, v8: "9.3.345.19" }, { name: "nodejs", version: "16.11.0", date: "2021-10-08", lts: false, security: false, v8: "9.4.146.19" }, { name: "nodejs", version: "16.12.0", date: "2021-10-20", lts: false, security: false, v8: "9.4.146.19" }, { name: "nodejs", version: "16.13.0", date: "2021-10-26", lts: "Gallium", security: false, v8: "9.4.146.19" }, { name: "nodejs", version: "16.14.0", date: "2022-02-08", lts: "Gallium", security: false, v8: "9.4.146.24" }, { name: "nodejs", version: "16.15.0", date: "2022-04-26", lts: "Gallium", security: false, v8: "9.4.146.24" }, { name: "nodejs", version: "16.16.0", date: "2022-07-07", lts: "Gallium", security: true, v8: "9.4.146.24" }, { name: "nodejs", version: "16.17.0", date: "2022-08-16", lts: "Gallium", security: false, v8: "9.4.146.26" }, { name: "nodejs", version: "16.18.0", date: "2022-10-12", lts: "Gallium", security: false, v8: "9.4.146.26" }, { name: "nodejs", version: "16.19.0", date: "2022-12-13", lts: "Gallium", security: false, v8: "9.4.146.26" }, { name: "nodejs", version: "16.20.0", date: "2023-03-28", lts: "Gallium", security: false, v8: "9.4.146.26" }, { name: "nodejs", version: "17.0.0", date: "2021-10-19", lts: false, security: false, v8: "9.5.172.21" }, { name: "nodejs", version: "17.1.0", date: "2021-11-09", lts: false, security: false, v8: "9.5.172.25" }, { name: "nodejs", version: "17.2.0", date: "2021-11-30", lts: false, security: false, v8: "9.6.180.14" }, { name: "nodejs", version: "17.3.0", date: "2021-12-17", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "17.4.0", date: "2022-01-18", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "17.5.0", date: "2022-02-10", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "17.6.0", date: "2022-02-22", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "17.7.0", date: "2022-03-09", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "17.8.0", date: "2022-03-22", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "17.9.0", date: "2022-04-07", lts: false, security: false, v8: "9.6.180.15" }, { name: "nodejs", version: "18.0.0", date: "2022-04-18", lts: false, security: false, v8: "10.1.124.8" }, { name: "nodejs", version: "18.1.0", date: "2022-05-03", lts: false, security: false, v8: "10.1.124.8" }, { name: "nodejs", version: "18.2.0", date: "2022-05-17", lts: false, security: false, v8: "10.1.124.8" }, { name: "nodejs", version: "18.3.0", date: "2022-06-02", lts: false, security: false, v8: "10.2.154.4" }, { name: "nodejs", version: "18.4.0", date: "2022-06-16", lts: false, security: false, v8: "10.2.154.4" }, { name: "nodejs", version: "18.5.0", date: "2022-07-06", lts: false, security: true, v8: "10.2.154.4" }, { name: "nodejs", version: "18.6.0", date: "2022-07-13", lts: false, security: false, v8: "10.2.154.13" }, { name: "nodejs", version: "18.7.0", date: "2022-07-26", lts: false, security: false, v8: "10.2.154.13" }, { name: "nodejs", version: "18.8.0", date: "2022-08-24", lts: false, security: false, v8: "10.2.154.13" }, { name: "nodejs", version: "18.9.0", date: "2022-09-07", lts: false, security: false, v8: "10.2.154.15" }, { name: "nodejs", version: "18.10.0", date: "2022-09-28", lts: false, security: false, v8: "10.2.154.15" }, { name: "nodejs", version: "18.11.0", date: "2022-10-13", lts: false, security: false, v8: "10.2.154.15" }, { name: "nodejs", version: "18.12.0", date: "2022-10-25", lts: "Hydrogen", security: false, v8: "10.2.154.15" }, { name: "nodejs", version: "18.13.0", date: "2023-01-05", lts: "Hydrogen", security: false, v8: "10.2.154.23" }, { name: "nodejs", version: "18.14.0", date: "2023-02-01", lts: "Hydrogen", security: false, v8: "10.2.154.23" }, { name: "nodejs", version: "18.15.0", date: "2023-03-05", lts: "Hydrogen", security: false, v8: "10.2.154.26" }, { name: "nodejs", version: "18.16.0", date: "2023-04-12", lts: "Hydrogen", security: false, v8: "10.2.154.26" }, { name: "nodejs", version: "18.17.0", date: "2023-07-18", lts: "Hydrogen", security: false, v8: "10.2.154.26" }, { name: "nodejs", version: "18.18.0", date: "2023-09-18", lts: "Hydrogen", security: false, v8: "10.2.154.26" }, { name: "nodejs", version: "18.19.0", date: "2023-11-29", lts: "Hydrogen", security: false, v8: "10.2.154.26" }, { name: "nodejs", version: "19.0.0", date: "2022-10-17", lts: false, security: false, v8: "10.7.193.13" }, { name: "nodejs", version: "19.1.0", date: "2022-11-14", lts: false, security: false, v8: "10.7.193.20" }, { name: "nodejs", version: "19.2.0", date: "2022-11-29", lts: false, security: false, v8: "10.8.168.20" }, { name: "nodejs", version: "19.3.0", date: "2022-12-14", lts: false, security: false, v8: "10.8.168.21" }, { name: "nodejs", version: "19.4.0", date: "2023-01-05", lts: false, security: false, v8: "10.8.168.25" }, { name: "nodejs", version: "19.5.0", date: "2023-01-24", lts: false, security: false, v8: "10.8.168.25" }, { name: "nodejs", version: "19.6.0", date: "2023-02-01", lts: false, security: false, v8: "10.8.168.25" }, { name: "nodejs", version: "19.7.0", date: "2023-02-21", lts: false, security: false, v8: "10.8.168.25" }, { name: "nodejs", version: "19.8.0", date: "2023-03-14", lts: false, security: false, v8: "10.8.168.25" }, { name: "nodejs", version: "19.9.0", date: "2023-04-10", lts: false, security: false, v8: "10.8.168.25" }, { name: "nodejs", version: "20.0.0", date: "2023-04-17", lts: false, security: false, v8: "11.3.244.4" }, { name: "nodejs", version: "20.1.0", date: "2023-05-03", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.2.0", date: "2023-05-16", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.3.0", date: "2023-06-08", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.4.0", date: "2023-07-04", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.5.0", date: "2023-07-19", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.6.0", date: "2023-08-23", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.7.0", date: "2023-09-18", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.8.0", date: "2023-09-28", lts: false, security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.9.0", date: "2023-10-24", lts: "Iron", security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "20.10.0", date: "2023-11-22", lts: "Iron", security: false, v8: "11.3.244.8" }, { name: "nodejs", version: "21.0.0", date: "2023-10-17", lts: false, security: false, v8: "11.8.172.13" }, { name: "nodejs", version: "21.1.0", date: "2023-10-24", lts: false, security: false, v8: "11.8.172.15" }, { name: "nodejs", version: "21.2.0", date: "2023-11-14", lts: false, security: false, v8: "11.8.172.17" }, { name: "nodejs", version: "21.3.0", date: "2023-11-30", lts: false, security: false, v8: "11.8.172.17" }];
  }
});

// node_modules/caniuse-lite/data/browsers.js
var require_browsers = __commonJS({
  "node_modules/caniuse-lite/data/browsers.js"(exports, module) {
    module.exports = { A: "ie", B: "edge", C: "firefox", D: "chrome", E: "safari", F: "opera", G: "ios_saf", H: "op_mini", I: "android", J: "bb", K: "op_mob", L: "and_chr", M: "and_ff", N: "ie_mob", O: "and_uc", P: "samsung", Q: "and_qq", R: "baidu", S: "kaios" };
  }
});

// node_modules/caniuse-lite/dist/unpacker/browsers.js
var require_browsers2 = __commonJS({
  "node_modules/caniuse-lite/dist/unpacker/browsers.js"(exports, module) {
    module.exports.browsers = require_browsers();
  }
});

// node_modules/caniuse-lite/data/browserVersions.js
var require_browserVersions = __commonJS({
  "node_modules/caniuse-lite/data/browserVersions.js"(exports, module) {
    module.exports = { "0": "111", "1": "112", "2": "113", "3": "114", "4": "115", "5": "116", "6": "117", "7": "118", "8": "121", "9": "5", A: "10", B: "11", C: "12", D: "7", E: "8", F: "9", G: "15", H: "120", I: "4", J: "6", K: "13", L: "14", M: "16", N: "17", O: "18", P: "79", Q: "80", R: "81", S: "83", T: "84", U: "85", V: "86", W: "87", X: "88", Y: "89", Z: "90", a: "91", b: "92", c: "93", d: "94", e: "95", f: "96", g: "97", h: "98", i: "99", j: "100", k: "101", l: "102", m: "103", n: "104", o: "105", p: "106", q: "119", r: "20", s: "21", t: "22", u: "23", v: "73", w: "107", x: "108", y: "109", z: "110", AB: "19", BB: "24", CB: "25", DB: "26", EB: "27", FB: "28", GB: "29", HB: "30", IB: "31", JB: "32", KB: "33", LB: "34", MB: "35", NB: "36", OB: "37", PB: "38", QB: "39", RB: "40", SB: "41", TB: "42", UB: "43", VB: "44", WB: "45", XB: "46", YB: "47", ZB: "48", aB: "49", bB: "50", cB: "51", dB: "52", eB: "53", fB: "54", gB: "55", hB: "56", iB: "57", jB: "58", kB: "60", lB: "62", mB: "63", nB: "64", oB: "65", pB: "66", qB: "67", rB: "68", sB: "69", tB: "70", uB: "71", vB: "72", wB: "74", xB: "75", yB: "76", zB: "77", "0B": "78", "1B": "11.1", "2B": "12.1", "3B": "15.5", "4B": "16.0", "5B": "17.0", "6B": "3", "7B": "59", "8B": "61", "9B": "82", AC: "122", BC: "123", CC: "3.2", DC: "10.1", EC: "13.1", FC: "15.2-15.3", GC: "15.4", HC: "16.1", IC: "16.2", JC: "16.3", KC: "16.4", LC: "16.5", MC: "17.1", NC: "17.2", OC: "17.3", PC: "11.5", QC: "4.2-4.3", RC: "5.5", SC: "2", TC: "124", UC: "3.5", VC: "3.6", WC: "3.1", XC: "5.1", YC: "6.1", ZC: "7.1", aC: "9.1", bC: "14.1", cC: "15.1", dC: "15.6", eC: "16.6", fC: "TP", gC: "9.5-9.6", hC: "10.0-10.1", iC: "10.5", jC: "10.6", kC: "11.6", lC: "4.0-4.1", mC: "5.0-5.1", nC: "6.0-6.1", oC: "7.0-7.1", pC: "8.1-8.4", qC: "9.0-9.2", rC: "9.3", sC: "10.0-10.2", tC: "10.3", uC: "11.0-11.2", vC: "11.3-11.4", wC: "12.0-12.1", xC: "12.2-12.5", yC: "13.0-13.1", zC: "13.2", "0C": "13.3", "1C": "13.4-13.7", "2C": "14.0-14.4", "3C": "14.5-14.8", "4C": "15.0-15.1", "5C": "15.6-15.8", "6C": "16.6-16.7", "7C": "all", "8C": "2.1", "9C": "2.2", AD: "2.3", BD: "4.1", CD: "4.4", DD: "4.4.3-4.4.4", ED: "5.0-5.4", FD: "6.2-6.4", GD: "7.2-7.4", HD: "8.2", ID: "9.2", JD: "11.1-11.2", KD: "12.0", LD: "13.0", MD: "14.0", ND: "15.0", OD: "18.0", PD: "19.0", QD: "13.18", RD: "2.5", SD: "3.0-3.1" };
  }
});

// node_modules/caniuse-lite/dist/unpacker/browserVersions.js
var require_browserVersions2 = __commonJS({
  "node_modules/caniuse-lite/dist/unpacker/browserVersions.js"(exports, module) {
    module.exports.browserVersions = require_browserVersions();
  }
});

// node_modules/caniuse-lite/data/agents.js
var require_agents = __commonJS({
  "node_modules/caniuse-lite/data/agents.js"(exports, module) {
    module.exports = { A: { A: { J: 0, D: 0, E: 0.0223482, F: 0.0446964, A: 0, B: 0.424615, RC: 0 }, B: "ms", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "RC", "J", "D", "E", "F", "A", "B", "", "", ""], E: "IE", F: { RC: 962323200, J: 998870400, D: 1161129600, E: 1237420800, F: 1300060800, A: 1346716800, B: 1381968e3 } }, B: { A: { "0": 0.01209, "1": 806e-5, "2": 0.01209, "3": 0.02015, "4": 0.01209, "5": 0.02015, "6": 0.02821, "7": 0.05239, "8": 0, C: 403e-5, K: 403e-5, L: 403e-5, G: 403e-5, M: 0, N: 806e-5, O: 0.01209, P: 0, Q: 0, R: 0, S: 0, T: 0, U: 0, V: 0, W: 0.31434, X: 0, Y: 0, Z: 0, a: 0, b: 0.01209, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0.02015, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 806e-5, w: 0.01612, x: 0.01612, y: 0.07657, z: 0.01612, q: 1.56364, H: 2.5389 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "C", "K", "L", "G", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "q", "H", "8", "", ""], E: "Edge", F: { "0": 1678665600, "1": 1680825600, "2": 1683158400, "3": 1685664e3, "4": 1689897600, "5": 1692576e3, "6": 1694649600, "7": 1697155200, "8": null, C: 1438128e3, K: 1447286400, L: 1470096e3, G: 1491868800, M: 1508198400, N: 1525046400, O: 1542067200, P: 1579046400, Q: 1581033600, R: 1586736e3, S: 1590019200, T: 1594857600, U: 1598486400, V: 1602201600, W: 1605830400, X: 161136e4, Y: 1614816e3, Z: 1618358400, a: 1622073600, b: 1626912e3, c: 1630627200, d: 1632441600, e: 1634774400, f: 1637539200, g: 1641427200, h: 1643932800, i: 1646265600, j: 1649635200, k: 1651190400, l: 1653955200, m: 1655942400, n: 1659657600, o: 1661990400, p: 1664755200, w: 1666915200, x: 1670198400, y: 1673481600, z: 1675900800, q: 1698969600, H: 1701993600 }, D: { C: "ms", K: "ms", L: "ms", G: "ms", M: "ms", N: "ms", O: "ms" } }, C: { A: { "0": 806e-5, "1": 403e-5, "2": 0.01209, "3": 0.01612, "4": 0.43927, "5": 806e-5, "6": 0.01209, "7": 0.10881, "8": 0.41912, "9": 0, SC: 0, "6B": 0, I: 403e-5, J: 0, D: 0, E: 0, F: 0, A: 0, B: 0.0403, C: 0.0403, K: 0, L: 0, G: 0, M: 0, N: 0, O: 0, AB: 0, r: 0, s: 0, t: 0, u: 0, BB: 0, CB: 0, DB: 0, EB: 0, FB: 0, GB: 0, HB: 0, IB: 0, JB: 0, KB: 0, LB: 0, MB: 0, NB: 0, OB: 0, PB: 0, QB: 0, RB: 0, SB: 0, TB: 0, UB: 806e-5, VB: 806e-5, WB: 0, XB: 0, YB: 0, ZB: 806e-5, aB: 0, bB: 806e-5, cB: 0, dB: 0.06448, eB: 806e-5, fB: 806e-5, gB: 806e-5, hB: 0.01612, iB: 0, jB: 0, "7B": 403e-5, kB: 0, "8B": 0, lB: 0, mB: 0, nB: 0, oB: 0, pB: 0, qB: 0, rB: 0, sB: 0, tB: 0, uB: 0, vB: 403e-5, v: 0, wB: 0, xB: 0, yB: 0, zB: 0, "0B": 0.02015, P: 0, Q: 0, R: 0, "9B": 0, S: 0, T: 0, U: 0, V: 0, W: 0, X: 806e-5, Y: 0, Z: 0, a: 0.01612, b: 0, c: 0, d: 806e-5, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0.01209, l: 0.03224, m: 0.02418, n: 0.01209, o: 806e-5, p: 403e-5, w: 806e-5, x: 806e-5, y: 0.01209, z: 806e-5, q: 0.27807, H: 1.24124, AC: 0, BC: 0, TC: 0, UC: 0, VC: 0 }, B: "moz", C: ["SC", "6B", "UC", "VC", "I", "9", "J", "D", "E", "F", "A", "B", "C", "K", "L", "G", "M", "N", "O", "AB", "r", "s", "t", "u", "BB", "CB", "DB", "EB", "FB", "GB", "HB", "IB", "JB", "KB", "LB", "MB", "NB", "OB", "PB", "QB", "RB", "SB", "TB", "UB", "VB", "WB", "XB", "YB", "ZB", "aB", "bB", "cB", "dB", "eB", "fB", "gB", "hB", "iB", "jB", "7B", "kB", "8B", "lB", "mB", "nB", "oB", "pB", "qB", "rB", "sB", "tB", "uB", "vB", "v", "wB", "xB", "yB", "zB", "0B", "P", "Q", "R", "9B", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "q", "H", "8", "AC", "BC", "TC"], E: "Firefox", F: { "0": 1678752e3, "1": 1681171200, "2": 1683590400, "3": 1686009600, "4": 1688428800, "5": 1690848e3, "6": 1693267200, "7": 1695686400, "8": 1702944e3, "9": 1308614400, SC: 1161648e3, "6B": 1213660800, UC: 124632e4, VC: 1264032e3, I: 1300752e3, J: 1313452800, D: 1317081600, E: 1317081600, F: 1320710400, A: 1324339200, B: 1327968e3, C: 1331596800, K: 1335225600, L: 1338854400, G: 1342483200, M: 1346112e3, N: 1349740800, O: 1353628800, AB: 1357603200, r: 1361232e3, s: 1364860800, t: 1368489600, u: 1372118400, BB: 1375747200, CB: 1379376e3, DB: 1386633600, EB: 1391472e3, FB: 1395100800, GB: 1398729600, HB: 1402358400, IB: 1405987200, JB: 1409616e3, KB: 1413244800, LB: 1417392e3, MB: 1421107200, NB: 1424736e3, OB: 1428278400, PB: 1431475200, QB: 1435881600, RB: 1439251200, SB: 144288e4, TB: 1446508800, UB: 1450137600, VB: 1453852800, WB: 1457395200, XB: 1461628800, YB: 1465257600, ZB: 1470096e3, aB: 1474329600, bB: 1479168e3, cB: 1485216e3, dB: 1488844800, eB: 149256e4, fB: 1497312e3, gB: 1502150400, hB: 1506556800, iB: 1510617600, jB: 1516665600, "7B": 1520985600, kB: 1525824e3, "8B": 1529971200, lB: 1536105600, mB: 1540252800, nB: 1544486400, oB: 154872e4, pB: 1552953600, qB: 1558396800, rB: 1562630400, sB: 1567468800, tB: 1571788800, uB: 1575331200, vB: 1578355200, v: 1581379200, wB: 1583798400, xB: 1586304e3, yB: 1588636800, zB: 1591056e3, "0B": 1593475200, P: 1595894400, Q: 1598313600, R: 1600732800, "9B": 1603152e3, S: 1605571200, T: 1607990400, U: 1611619200, V: 1614038400, W: 1616457600, X: 1618790400, Y: 1622505600, Z: 1626134400, a: 1628553600, b: 1630972800, c: 1633392e3, d: 1635811200, e: 1638835200, f: 1641859200, g: 1644364800, h: 1646697600, i: 1649116800, j: 1651536e3, k: 1653955200, l: 1656374400, m: 1658793600, n: 1661212800, o: 1663632e3, p: 1666051200, w: 1668470400, x: 1670889600, y: 1673913600, z: 1676332800, q: 1698105600, H: 1700524800, AC: null, BC: null, TC: null } }, D: { A: { "0": 0.10478, "1": 0.12896, "2": 0.21359, "3": 0.14508, "4": 0.10075, "5": 0.2821, "6": 0.26598, "7": 0.82615, "8": 0.01612, "9": 0, I: 0, J: 0, D: 0, E: 0, F: 0, A: 0, B: 0, C: 0, K: 0, L: 0, G: 0, M: 0, N: 0, O: 0, AB: 0, r: 0, s: 0, t: 0, u: 0, BB: 0, CB: 0, DB: 0, EB: 0, FB: 0, GB: 0, HB: 0, IB: 0, JB: 0, KB: 0, LB: 806e-5, MB: 0, NB: 0, OB: 0, PB: 0.01612, QB: 0, RB: 0, SB: 403e-5, TB: 0, UB: 0, VB: 0, WB: 806e-5, XB: 0, YB: 806e-5, ZB: 0.03627, aB: 0.02821, bB: 0.01209, cB: 0, dB: 0, eB: 806e-5, fB: 806e-5, gB: 403e-5, hB: 0.01612, iB: 806e-5, jB: 403e-5, "7B": 0, kB: 0.03224, "8B": 403e-5, lB: 0, mB: 403e-5, nB: 0, oB: 403e-5, pB: 0.03224, qB: 403e-5, rB: 403e-5, sB: 0.04836, tB: 0.0806, uB: 806e-5, vB: 806e-5, v: 0.01209, wB: 0.01209, xB: 0.01209, yB: 0.02015, zB: 0.01209, "0B": 0.01612, P: 0.13299, Q: 0.02821, R: 0.02821, S: 0.04433, T: 0.01209, U: 0.03627, V: 0.04433, W: 0.06851, X: 0.01612, Y: 0.01612, Z: 0.01612, a: 0.06448, b: 0.03627, c: 0.09672, d: 0.04836, e: 0.02418, f: 0.01612, g: 0.02015, h: 0.07254, i: 0.0403, j: 0.03224, k: 0.04433, l: 0.03627, m: 0.26598, n: 0.06851, o: 0.08463, p: 0.0806, w: 0.0806, x: 0.12896, y: 1.7732, z: 0.10075, q: 8.53554, H: 10.1596, AC: 0.01209, BC: 0 }, B: "webkit", C: ["", "", "", "", "", "", "I", "9", "J", "D", "E", "F", "A", "B", "C", "K", "L", "G", "M", "N", "O", "AB", "r", "s", "t", "u", "BB", "CB", "DB", "EB", "FB", "GB", "HB", "IB", "JB", "KB", "LB", "MB", "NB", "OB", "PB", "QB", "RB", "SB", "TB", "UB", "VB", "WB", "XB", "YB", "ZB", "aB", "bB", "cB", "dB", "eB", "fB", "gB", "hB", "iB", "jB", "7B", "kB", "8B", "lB", "mB", "nB", "oB", "pB", "qB", "rB", "sB", "tB", "uB", "vB", "v", "wB", "xB", "yB", "zB", "0B", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "q", "H", "8", "AC", "BC"], E: "Chrome", F: { "0": 1678147200, "1": 1680566400, "2": 1682985600, "3": 1685404800, "4": 1689724800, "5": 1692057600, "6": 1694476800, "7": 1696896e3, "8": null, "9": 1274745600, I: 1264377600, J: 1283385600, D: 1287619200, E: 1291248e3, F: 1296777600, A: 1299542400, B: 1303862400, C: 1307404800, K: 1312243200, L: 1316131200, G: 1316131200, M: 1319500800, N: 1323734400, O: 1328659200, AB: 1332892800, r: 133704e4, s: 1340668800, t: 1343692800, u: 1348531200, BB: 1352246400, CB: 1357862400, DB: 1361404800, EB: 1364428800, FB: 1369094400, GB: 1374105600, HB: 1376956800, IB: 1384214400, JB: 1389657600, KB: 1392940800, LB: 1397001600, MB: 1400544e3, NB: 1405468800, OB: 1409011200, PB: 141264e4, QB: 1416268800, RB: 1421798400, SB: 1425513600, TB: 1429401600, UB: 143208e4, VB: 1437523200, WB: 1441152e3, XB: 1444780800, YB: 1449014400, ZB: 1453248e3, aB: 1456963200, bB: 1460592e3, cB: 1464134400, dB: 1469059200, eB: 1472601600, fB: 1476230400, gB: 1480550400, hB: 1485302400, iB: 1489017600, jB: 149256e4, "7B": 1496707200, kB: 1500940800, "8B": 1504569600, lB: 1508198400, mB: 1512518400, nB: 1516752e3, oB: 1520294400, pB: 1523923200, qB: 1527552e3, rB: 1532390400, sB: 1536019200, tB: 1539648e3, uB: 1543968e3, vB: 154872e4, v: 1552348800, wB: 1555977600, xB: 1559606400, yB: 1564444800, zB: 1568073600, "0B": 1571702400, P: 1575936e3, Q: 1580860800, R: 1586304e3, S: 1589846400, T: 1594684800, U: 1598313600, V: 1601942400, W: 1605571200, X: 1611014400, Y: 1614556800, Z: 1618272e3, a: 1621987200, b: 1626739200, c: 1630368e3, d: 1632268800, e: 1634601600, f: 1637020800, g: 1641340800, h: 1643673600, i: 1646092800, j: 1648512e3, k: 1650931200, l: 1653350400, m: 1655769600, n: 1659398400, o: 1661817600, p: 1664236800, w: 1666656e3, x: 166968e4, y: 1673308800, z: 1675728e3, q: 1698710400, H: 1701993600, AC: null, BC: null } }, E: { A: { "9": 0, I: 0, J: 0, D: 806e-5, E: 403e-5, F: 403e-5, A: 0, B: 0, C: 0, K: 806e-5, L: 0.05239, G: 806e-5, WC: 0, CC: 0, XC: 806e-5, YC: 0, ZC: 0, aC: 0.01209, DC: 0, "1B": 0.01612, "2B": 0.02015, EC: 0.0806, bC: 0.12493, cC: 0.02821, FC: 0.01612, GC: 0.03224, "3B": 0.04836, dC: 0.3224, "4B": 0.03224, HC: 0.0806, IC: 0.06448, JC: 0.1612, KC: 0.07254, LC: 0.12493, eC: 0.59241, "5B": 0.14911, MC: 1.26139, NC: 0.1612, OC: 403e-5, fC: 0 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "WC", "CC", "I", "9", "XC", "J", "YC", "D", "ZC", "E", "F", "aC", "A", "DC", "B", "1B", "C", "2B", "K", "EC", "L", "bC", "G", "cC", "FC", "GC", "3B", "dC", "4B", "HC", "IC", "JC", "KC", "LC", "eC", "5B", "MC", "NC", "OC", "fC", ""], E: "Safari", F: { "9": 1275868800, WC: 1205798400, CC: 1226534400, I: 1244419200, XC: 131112e4, J: 1343174400, YC: 13824e5, D: 13824e5, ZC: 1410998400, E: 1413417600, F: 1443657600, aC: 1458518400, A: 1474329600, DC: 1490572800, B: 1505779200, "1B": 1522281600, C: 1537142400, "2B": 1553472e3, K: 1568851200, EC: 1585008e3, L: 1600214400, bC: 1619395200, G: 1632096e3, cC: 1635292800, FC: 1639353600, GC: 1647216e3, "3B": 1652745600, dC: 1658275200, "4B": 1662940800, HC: 1666569600, IC: 1670889600, JC: 1674432e3, KC: 1679875200, LC: 1684368e3, eC: 1690156800, "5B": 1695686400, MC: 1698192e3, NC: 1702252800, OC: null, fC: null } }, F: { A: { F: 0, B: 0, C: 0, G: 0, M: 0, N: 0, O: 0, AB: 0, r: 0, s: 0, t: 0, u: 0, BB: 0, CB: 0, DB: 0, EB: 0, FB: 0, GB: 0, HB: 0, IB: 0, JB: 0, KB: 0, LB: 0, MB: 0, NB: 0, OB: 0, PB: 0, QB: 0, RB: 0, SB: 0, TB: 0, UB: 0, VB: 0, WB: 0, XB: 0.01612, YB: 0, ZB: 0, aB: 0, bB: 0, cB: 0, dB: 0, eB: 0, fB: 0, gB: 0, hB: 0, iB: 0, jB: 0, kB: 0, lB: 0, mB: 0, nB: 0, oB: 0, pB: 0, qB: 0, rB: 0, sB: 0, tB: 0, uB: 0, vB: 0, v: 0, wB: 0, xB: 0, yB: 0, zB: 0, "0B": 0, P: 0, Q: 0, R: 0, "9B": 0, S: 0, T: 0, U: 0, V: 0, W: 0, X: 0, Y: 0, Z: 0, a: 0, b: 0, c: 0, d: 403e-5, e: 0.05642, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0.02015, m: 0, n: 0.50778, o: 0.78585, p: 0.01612, gC: 0, hC: 0, iC: 0, jC: 0, "1B": 0, PC: 0, kC: 0, "2B": 0 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "F", "gC", "hC", "iC", "jC", "B", "1B", "PC", "kC", "C", "2B", "G", "M", "N", "O", "AB", "r", "s", "t", "u", "BB", "CB", "DB", "EB", "FB", "GB", "HB", "IB", "JB", "KB", "LB", "MB", "NB", "OB", "PB", "QB", "RB", "SB", "TB", "UB", "VB", "WB", "XB", "YB", "ZB", "aB", "bB", "cB", "dB", "eB", "fB", "gB", "hB", "iB", "jB", "kB", "lB", "mB", "nB", "oB", "pB", "qB", "rB", "sB", "tB", "uB", "vB", "v", "wB", "xB", "yB", "zB", "0B", "P", "Q", "R", "9B", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "", "", ""], E: "Opera", F: { F: 1150761600, gC: 1223424e3, hC: 1251763200, iC: 1267488e3, jC: 1277942400, B: 1292457600, "1B": 1302566400, PC: 1309219200, kC: 1323129600, C: 1323129600, "2B": 1352073600, G: 1372723200, M: 1377561600, N: 1381104e3, O: 1386288e3, AB: 1390867200, r: 1393891200, s: 1399334400, t: 1401753600, u: 1405987200, BB: 1409616e3, CB: 1413331200, DB: 1417132800, EB: 1422316800, FB: 1425945600, GB: 1430179200, HB: 1433808e3, IB: 1438646400, JB: 1442448e3, KB: 1445904e3, LB: 1449100800, MB: 1454371200, NB: 1457308800, OB: 146232e4, PB: 1465344e3, QB: 1470096e3, RB: 1474329600, SB: 1477267200, TB: 1481587200, UB: 1486425600, VB: 1490054400, WB: 1494374400, XB: 1498003200, YB: 1502236800, ZB: 1506470400, aB: 1510099200, bB: 1515024e3, cB: 1517961600, dB: 1521676800, eB: 1525910400, fB: 1530144e3, gB: 1534982400, hB: 1537833600, iB: 1543363200, jB: 1548201600, kB: 1554768e3, lB: 1561593600, mB: 1566259200, nB: 1570406400, oB: 1573689600, pB: 1578441600, qB: 1583971200, rB: 1587513600, sB: 1592956800, tB: 1595894400, uB: 1600128e3, vB: 1603238400, v: 161352e4, wB: 1612224e3, xB: 1616544e3, yB: 1619568e3, zB: 1623715200, "0B": 1627948800, P: 1631577600, Q: 1633392e3, R: 1635984e3, "9B": 1638403200, S: 1642550400, T: 1644969600, U: 1647993600, V: 1650412800, W: 1652745600, X: 1654646400, Y: 1657152e3, Z: 1660780800, a: 1663113600, b: 1668816e3, c: 1668643200, d: 1671062400, e: 1675209600, f: 1677024e3, g: 1679529600, h: 1681948800, i: 1684195200, j: 1687219200, k: 1690329600, l: 1692748800, m: 1696204800, n: 169992e4, o: 169992e4, p: 1702944e3 }, D: { F: "o", B: "o", C: "o", gC: "o", hC: "o", iC: "o", jC: "o", "1B": "o", PC: "o", kC: "o", "2B": "o" } }, G: { A: { E: 0, CC: 0, lC: 0, QC: 294848e-8, mC: 294848e-8, nC: 589696e-8, oC: 0.0103197, pC: 294848e-8, qC: 0.0103197, rC: 0.0353818, sC: 294848e-8, tC: 0.0545469, uC: 0.0221136, vC: 0.0250621, wC: 0.0132682, xC: 0.27126, yC: 589696e-8, zC: 0.042753, "0C": 0.0147424, "1C": 0.0530726, "2C": 0.106145, "3C": 0.165115, "4C": 0.0707635, FC: 0.0810832, GC: 0.0987741, "3B": 0.126785, "5C": 0.971524, "4B": 0.308116, HC: 0.661934, IC: 0.293374, JC: 0.551366, KC: 0.110568, LC: 0.263889, "6C": 2.32635, "5B": 0.412787, MC: 6.85816, NC: 0.717955, OC: 0.0353818 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CC", "lC", "QC", "mC", "nC", "oC", "E", "pC", "qC", "rC", "sC", "tC", "uC", "vC", "wC", "xC", "yC", "zC", "0C", "1C", "2C", "3C", "4C", "FC", "GC", "3B", "5C", "4B", "HC", "IC", "JC", "KC", "LC", "6C", "5B", "MC", "NC", "OC", "", ""], E: "Safari on iOS", F: { CC: 1270252800, lC: 1283904e3, QC: 1299628800, mC: 1331078400, nC: 1359331200, oC: 1394409600, E: 1410912e3, pC: 1413763200, qC: 1442361600, rC: 1458518400, sC: 1473724800, tC: 1490572800, uC: 1505779200, vC: 1522281600, wC: 1537142400, xC: 1553472e3, yC: 1568851200, zC: 1572220800, "0C": 1580169600, "1C": 1585008e3, "2C": 1600214400, "3C": 1619395200, "4C": 1632096e3, FC: 1639353600, GC: 1647216e3, "3B": 1652659200, "5C": 1658275200, "4B": 1662940800, HC: 1666569600, IC: 1670889600, JC: 1674432e3, KC: 1679875200, LC: 1684368e3, "6C": 1690156800, "5B": 1694995200, MC: 1698192e3, NC: 1702252800, OC: null } }, H: { A: { "7C": 0.07 }, B: "o", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "7C", "", "", ""], E: "Opera Mini", F: { "7C": 1426464e3 } }, I: { A: { "6B": 0, I: 489622e-10, H: 0.24366, "8C": 0, "9C": 244811e-10, AD: 0, BD: 489622e-10, QC: 171368e-9, CD: 0, DD: 709952e-9 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "8C", "9C", "AD", "6B", "I", "BD", "QC", "CD", "DD", "H", "", "", ""], E: "Android Browser", F: { "8C": 1256515200, "9C": 1274313600, AD: 1291593600, "6B": 1298332800, I: 1318896e3, BD: 1341792e3, QC: 1374624e3, CD: 1386547200, DD: 1401667200, H: 1701734400 } }, J: { A: { D: 0, A: 0 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "D", "A", "", "", ""], E: "Blackberry Browser", F: { D: 1325376e3, A: 1359504e3 } }, K: { A: { A: 0, B: 0, C: 0, v: 1.27348, "1B": 0, PC: 0, "2B": 0 }, B: "o", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "A", "B", "1B", "PC", "C", "2B", "v", "", "", ""], E: "Opera Mobile", F: { A: 1287100800, B: 1300752e3, "1B": 1314835200, PC: 1318291200, C: 1330300800, "2B": 1349740800, v: 1673827200 }, D: { v: "webkit" } }, L: { A: { H: 40.1948 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "H", "", "", ""], E: "Chrome for Android", F: { H: 1701734400 } }, M: { A: { q: 0.310492 }, B: "moz", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "q", "", "", ""], E: "Firefox for Android", F: { q: 1698105600 } }, N: { A: { A: 0, B: 0 }, B: "ms", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "A", "B", "", "", ""], E: "IE Mobile", F: { A: 1340150400, B: 1353456e3 } }, O: { A: { "3B": 0.883708 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "3B", "", "", ""], E: "UC Browser for Android", F: { "3B": 1687132800 }, D: { "3B": "webkit" } }, P: { A: { I: 0.1284, r: 0.0428001, s: 0.0856003, t: 0.1605, u: 2.04371, ED: 0.0107, FD: 0, GD: 0.0535002, HD: 0, ID: 0, DC: 0, JD: 0.0107, KD: 0, LD: 0.0214001, MD: 0, ND: 0, "4B": 0.0214001, "5B": 0.0321001, OD: 0.0214001, PD: 0.0428001 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "ED", "FD", "GD", "HD", "ID", "DC", "JD", "KD", "LD", "MD", "ND", "4B", "5B", "OD", "PD", "r", "s", "t", "u", "", "", ""], E: "Samsung Internet", F: { I: 1461024e3, ED: 1481846400, FD: 1509408e3, GD: 1528329600, HD: 1546128e3, ID: 1554163200, DC: 1567900800, JD: 1582588800, KD: 1593475200, LD: 1605657600, MD: 1618531200, ND: 1629072e3, "4B": 1640736e3, "5B": 1651708800, OD: 1659657600, PD: 1667260800, r: 1677369600, s: 1684454400, t: 1689292800, u: 1697587200 } }, Q: { A: { EC: 0.167188 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "EC", "", "", ""], E: "QQ Browser", F: { EC: 1663718400 } }, R: { A: { QD: 0 }, B: "webkit", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "QD", "", "", ""], E: "Baidu Browser", F: { QD: 1663027200 } }, S: { A: { RD: 0.083594, SD: 0 }, B: "moz", C: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "RD", "SD", "", "", ""], E: "KaiOS Browser", F: { RD: 1527811200, SD: 1631664e3 } } };
  }
});

// node_modules/caniuse-lite/dist/unpacker/agents.js
var require_agents2 = __commonJS({
  "node_modules/caniuse-lite/dist/unpacker/agents.js"(exports, module) {
    "use strict";
    var browsers = require_browsers2().browsers;
    var versions = require_browserVersions2().browserVersions;
    var agentsData = require_agents();
    function unpackBrowserVersions(versionsData) {
      return Object.keys(versionsData).reduce((usage, version2) => {
        usage[versions[version2]] = versionsData[version2];
        return usage;
      }, {});
    }
    __name(unpackBrowserVersions, "unpackBrowserVersions");
    module.exports.agents = Object.keys(agentsData).reduce((map, key) => {
      let versionsData = agentsData[key];
      map[browsers[key]] = Object.keys(versionsData).reduce((data, entry) => {
        if (entry === "A") {
          data.usage_global = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === "C") {
          data.versions = versionsData[entry].reduce((list, version2) => {
            if (version2 === "") {
              list.push(null);
            } else {
              list.push(versions[version2]);
            }
            return list;
          }, []);
        } else if (entry === "D") {
          data.prefix_exceptions = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === "E") {
          data.browser = versionsData[entry];
        } else if (entry === "F") {
          data.release_date = Object.keys(versionsData[entry]).reduce(
            (map2, key2) => {
              map2[versions[key2]] = versionsData[entry][key2];
              return map2;
            },
            {}
          );
        } else {
          data.prefix = versionsData[entry];
        }
        return data;
      }, {});
      return map;
    }, {});
  }
});

// node_modules/node-releases/data/release-schedule/release-schedule.json
var require_release_schedule = __commonJS({
  "node_modules/node-releases/data/release-schedule/release-schedule.json"(exports, module) {
    module.exports = { "v0.8": { start: "2012-06-25", end: "2014-07-31" }, "v0.10": { start: "2013-03-11", end: "2016-10-31" }, "v0.12": { start: "2015-02-06", end: "2016-12-31" }, v4: { start: "2015-09-08", lts: "2015-10-12", maintenance: "2017-04-01", end: "2018-04-30", codename: "Argon" }, v5: { start: "2015-10-29", maintenance: "2016-04-30", end: "2016-06-30" }, v6: { start: "2016-04-26", lts: "2016-10-18", maintenance: "2018-04-30", end: "2019-04-30", codename: "Boron" }, v7: { start: "2016-10-25", maintenance: "2017-04-30", end: "2017-06-30" }, v8: { start: "2017-05-30", lts: "2017-10-31", maintenance: "2019-01-01", end: "2019-12-31", codename: "Carbon" }, v9: { start: "2017-10-01", maintenance: "2018-04-01", end: "2018-06-30" }, v10: { start: "2018-04-24", lts: "2018-10-30", maintenance: "2020-05-19", end: "2021-04-30", codename: "Dubnium" }, v11: { start: "2018-10-23", maintenance: "2019-04-22", end: "2019-06-01" }, v12: { start: "2019-04-23", lts: "2019-10-21", maintenance: "2020-11-30", end: "2022-04-30", codename: "Erbium" }, v13: { start: "2019-10-22", maintenance: "2020-04-01", end: "2020-06-01" }, v14: { start: "2020-04-21", lts: "2020-10-27", maintenance: "2021-10-19", end: "2023-04-30", codename: "Fermium" }, v15: { start: "2020-10-20", maintenance: "2021-04-01", end: "2021-06-01" }, v16: { start: "2021-04-20", lts: "2021-10-26", maintenance: "2022-10-18", end: "2023-09-11", codename: "Gallium" }, v17: { start: "2021-10-19", maintenance: "2022-04-01", end: "2022-06-01" }, v18: { start: "2022-04-19", lts: "2022-10-25", maintenance: "2023-10-18", end: "2025-04-30", codename: "Hydrogen" }, v19: { start: "2022-10-18", maintenance: "2023-04-01", end: "2023-06-01" }, v20: { start: "2023-04-18", lts: "2023-10-24", maintenance: "2024-10-22", end: "2026-04-30", codename: "Iron" }, v21: { start: "2023-10-17", maintenance: "2024-04-01", end: "2024-06-01" }, v22: { start: "2024-04-23", lts: "2024-10-29", maintenance: "2025-10-21", end: "2027-04-30", codename: "" }, v23: { start: "2024-10-15", maintenance: "2025-04-01", end: "2025-06-01" }, v24: { start: "2025-04-22", lts: "2025-10-28", maintenance: "2026-10-20", end: "2028-04-30", codename: "" } };
  }
});

// (disabled):path
var require_path = __commonJS({
  "(disabled):path"() {
  }
});

// node_modules/electron-to-chromium/versions.js
var require_versions = __commonJS({
  "node_modules/electron-to-chromium/versions.js"(exports, module) {
    module.exports = {
      "0.20": "39",
      "0.21": "41",
      "0.22": "41",
      "0.23": "41",
      "0.24": "41",
      "0.25": "42",
      "0.26": "42",
      "0.27": "43",
      "0.28": "43",
      "0.29": "43",
      "0.30": "44",
      "0.31": "45",
      "0.32": "45",
      "0.33": "45",
      "0.34": "45",
      "0.35": "45",
      "0.36": "47",
      "0.37": "49",
      "1.0": "49",
      "1.1": "50",
      "1.2": "51",
      "1.3": "52",
      "1.4": "53",
      "1.5": "54",
      "1.6": "56",
      "1.7": "58",
      "1.8": "59",
      "2.0": "61",
      "2.1": "61",
      "3.0": "66",
      "3.1": "66",
      "4.0": "69",
      "4.1": "69",
      "4.2": "69",
      "5.0": "73",
      "6.0": "76",
      "6.1": "76",
      "7.0": "78",
      "7.1": "78",
      "7.2": "78",
      "7.3": "78",
      "8.0": "80",
      "8.1": "80",
      "8.2": "80",
      "8.3": "80",
      "8.4": "80",
      "8.5": "80",
      "9.0": "83",
      "9.1": "83",
      "9.2": "83",
      "9.3": "83",
      "9.4": "83",
      "10.0": "85",
      "10.1": "85",
      "10.2": "85",
      "10.3": "85",
      "10.4": "85",
      "11.0": "87",
      "11.1": "87",
      "11.2": "87",
      "11.3": "87",
      "11.4": "87",
      "11.5": "87",
      "12.0": "89",
      "12.1": "89",
      "12.2": "89",
      "13.0": "91",
      "13.1": "91",
      "13.2": "91",
      "13.3": "91",
      "13.4": "91",
      "13.5": "91",
      "13.6": "91",
      "14.0": "93",
      "14.1": "93",
      "14.2": "93",
      "15.0": "94",
      "15.1": "94",
      "15.2": "94",
      "15.3": "94",
      "15.4": "94",
      "15.5": "94",
      "16.0": "96",
      "16.1": "96",
      "16.2": "96",
      "17.0": "98",
      "17.1": "98",
      "17.2": "98",
      "17.3": "98",
      "17.4": "98",
      "18.0": "100",
      "18.1": "100",
      "18.2": "100",
      "18.3": "100",
      "19.0": "102",
      "19.1": "102",
      "20.0": "104",
      "20.1": "104",
      "20.2": "104",
      "20.3": "104",
      "21.0": "106",
      "21.1": "106",
      "21.2": "106",
      "21.3": "106",
      "21.4": "106",
      "22.0": "108",
      "22.1": "108",
      "22.2": "108",
      "22.3": "108",
      "23.0": "110",
      "23.1": "110",
      "23.2": "110",
      "23.3": "110",
      "24.0": "112",
      "24.1": "112",
      "24.2": "112",
      "24.3": "112",
      "24.4": "112",
      "24.5": "112",
      "24.6": "112",
      "24.7": "112",
      "24.8": "112",
      "25.0": "114",
      "25.1": "114",
      "25.2": "114",
      "25.3": "114",
      "25.4": "114",
      "25.5": "114",
      "25.6": "114",
      "25.7": "114",
      "25.8": "114",
      "25.9": "114",
      "26.0": "116",
      "26.1": "116",
      "26.2": "116",
      "26.3": "116",
      "26.4": "116",
      "26.5": "116",
      "26.6": "116",
      "27.0": "118",
      "27.1": "118",
      "27.2": "118",
      "28.0": "120",
      "28.1": "120",
      "29.0": "122"
    };
  }
});

// node_modules/browserslist/error.js
var require_error = __commonJS({
  "node_modules/browserslist/error.js"(exports, module) {
    function BrowserslistError(message) {
      this.name = "BrowserslistError";
      this.message = message;
      this.browserslist = true;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, BrowserslistError);
      }
    }
    __name(BrowserslistError, "BrowserslistError");
    BrowserslistError.prototype = Error.prototype;
    module.exports = BrowserslistError;
  }
});

// node_modules/browserslist/parse.js
var require_parse = __commonJS({
  "node_modules/browserslist/parse.js"(exports, module) {
    var AND_REGEXP = /^\s+and\s+(.*)/i;
    var OR_REGEXP = /^(?:,\s*|\s+or\s+)(.*)/i;
    function flatten(array) {
      if (!Array.isArray(array))
        return [array];
      return array.reduce(function(a, b) {
        return a.concat(flatten(b));
      }, []);
    }
    __name(flatten, "flatten");
    function find(string, predicate) {
      for (var n = 1, max = string.length; n <= max; n++) {
        var parsed = string.substr(-n, n);
        if (predicate(parsed, n, max)) {
          return string.slice(0, -n);
        }
      }
      return "";
    }
    __name(find, "find");
    function matchQuery(all, query) {
      var node2 = { query };
      if (query.indexOf("not ") === 0) {
        node2.not = true;
        query = query.slice(4);
      }
      for (var name in all) {
        var type = all[name];
        var match = query.match(type.regexp);
        if (match) {
          node2.type = name;
          for (var i = 0; i < type.matches.length; i++) {
            node2[type.matches[i]] = match[i + 1];
          }
          return node2;
        }
      }
      node2.type = "unknown";
      return node2;
    }
    __name(matchQuery, "matchQuery");
    function matchBlock(all, string, qs) {
      var node2;
      return find(string, function(parsed, n, max) {
        if (AND_REGEXP.test(parsed)) {
          node2 = matchQuery(all, parsed.match(AND_REGEXP)[1]);
          node2.compose = "and";
          qs.unshift(node2);
          return true;
        } else if (OR_REGEXP.test(parsed)) {
          node2 = matchQuery(all, parsed.match(OR_REGEXP)[1]);
          node2.compose = "or";
          qs.unshift(node2);
          return true;
        } else if (n === max) {
          node2 = matchQuery(all, parsed.trim());
          node2.compose = "or";
          qs.unshift(node2);
          return true;
        }
        return false;
      });
    }
    __name(matchBlock, "matchBlock");
    module.exports = /* @__PURE__ */ __name(function parse2(all, queries) {
      if (!Array.isArray(queries))
        queries = [queries];
      return flatten(
        queries.map(function(block) {
          var qs = [];
          do {
            block = matchBlock(all, block, qs);
          } while (block);
          return qs;
        })
      );
    }, "parse");
  }
});

// node_modules/browserslist/browser.js
var require_browser = __commonJS({
  "node_modules/browserslist/browser.js"(exports, module) {
    var BrowserslistError = require_error();
    function noop() {
    }
    __name(noop, "noop");
    module.exports = {
      loadQueries: /* @__PURE__ */ __name(function loadQueries() {
        throw new BrowserslistError(
          "Sharable configs are not supported in client-side build of Browserslist"
        );
      }, "loadQueries"),
      getStat: /* @__PURE__ */ __name(function getStat(opts) {
        return opts.stats;
      }, "getStat"),
      loadConfig: /* @__PURE__ */ __name(function loadConfig(opts) {
        if (opts.config) {
          throw new BrowserslistError(
            "Browserslist config are not supported in client-side build"
          );
        }
      }, "loadConfig"),
      loadCountry: /* @__PURE__ */ __name(function loadCountry() {
        throw new BrowserslistError(
          "Country statistics are not supported in client-side build of Browserslist"
        );
      }, "loadCountry"),
      loadFeature: /* @__PURE__ */ __name(function loadFeature() {
        throw new BrowserslistError(
          "Supports queries are not available in client-side build of Browserslist"
        );
      }, "loadFeature"),
      currentNode: /* @__PURE__ */ __name(function currentNode(resolve, context) {
        return resolve(["maintained node versions"], context)[0];
      }, "currentNode"),
      parseConfig: noop,
      readConfig: noop,
      findConfig: noop,
      clearCaches: noop,
      oldDataWarning: noop,
      env: {}
    };
  }
});

// node_modules/browserslist/index.js
var require_browserslist = __commonJS({
  "node_modules/browserslist/index.js"(exports, module) {
    var jsReleases = require_envs();
    var agents = require_agents2().agents;
    var jsEOL = require_release_schedule();
    var path = require_path();
    var e2c = require_versions();
    var BrowserslistError = require_error();
    var parse2 = require_parse();
    var env = require_browser();
    var YEAR = 365.259641 * 24 * 60 * 60 * 1e3;
    var ANDROID_EVERGREEN_FIRST = "37";
    var OP_MOB_BLINK_FIRST = 14;
    function isVersionsMatch(versionA, versionB) {
      return (versionA + ".").indexOf(versionB + ".") === 0;
    }
    __name(isVersionsMatch, "isVersionsMatch");
    function isEolReleased(name) {
      var version2 = name.slice(1);
      return browserslist2.nodeVersions.some(function(i) {
        return isVersionsMatch(i, version2);
      });
    }
    __name(isEolReleased, "isEolReleased");
    function normalize(versions) {
      return versions.filter(function(version2) {
        return typeof version2 === "string";
      });
    }
    __name(normalize, "normalize");
    function normalizeElectron(version2) {
      var versionToUse = version2;
      if (version2.split(".").length === 3) {
        versionToUse = version2.split(".").slice(0, -1).join(".");
      }
      return versionToUse;
    }
    __name(normalizeElectron, "normalizeElectron");
    function nameMapper(name) {
      return /* @__PURE__ */ __name(function mapName(version2) {
        return name + " " + version2;
      }, "mapName");
    }
    __name(nameMapper, "nameMapper");
    function getMajor(version2) {
      return parseInt(version2.split(".")[0]);
    }
    __name(getMajor, "getMajor");
    function getMajorVersions(released, number) {
      if (released.length === 0)
        return [];
      var majorVersions = uniq(released.map(getMajor));
      var minimum = majorVersions[majorVersions.length - number];
      if (!minimum) {
        return released;
      }
      var selected = [];
      for (var i = released.length - 1; i >= 0; i--) {
        if (minimum > getMajor(released[i]))
          break;
        selected.unshift(released[i]);
      }
      return selected;
    }
    __name(getMajorVersions, "getMajorVersions");
    function uniq(array) {
      var filtered = [];
      for (var i = 0; i < array.length; i++) {
        if (filtered.indexOf(array[i]) === -1)
          filtered.push(array[i]);
      }
      return filtered;
    }
    __name(uniq, "uniq");
    function fillUsage(result, name, data) {
      for (var i in data) {
        result[name + " " + i] = data[i];
      }
    }
    __name(fillUsage, "fillUsage");
    function generateFilter(sign, version2) {
      version2 = parseFloat(version2);
      if (sign === ">") {
        return function(v) {
          return parseFloat(v) > version2;
        };
      } else if (sign === ">=") {
        return function(v) {
          return parseFloat(v) >= version2;
        };
      } else if (sign === "<") {
        return function(v) {
          return parseFloat(v) < version2;
        };
      } else {
        return function(v) {
          return parseFloat(v) <= version2;
        };
      }
    }
    __name(generateFilter, "generateFilter");
    function generateSemverFilter(sign, version2) {
      version2 = version2.split(".").map(parseSimpleInt);
      version2[1] = version2[1] || 0;
      version2[2] = version2[2] || 0;
      if (sign === ">") {
        return function(v) {
          v = v.split(".").map(parseSimpleInt);
          return compareSemver(v, version2) > 0;
        };
      } else if (sign === ">=") {
        return function(v) {
          v = v.split(".").map(parseSimpleInt);
          return compareSemver(v, version2) >= 0;
        };
      } else if (sign === "<") {
        return function(v) {
          v = v.split(".").map(parseSimpleInt);
          return compareSemver(version2, v) > 0;
        };
      } else {
        return function(v) {
          v = v.split(".").map(parseSimpleInt);
          return compareSemver(version2, v) >= 0;
        };
      }
    }
    __name(generateSemverFilter, "generateSemverFilter");
    function parseSimpleInt(x) {
      return parseInt(x);
    }
    __name(parseSimpleInt, "parseSimpleInt");
    function compare(a, b) {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    }
    __name(compare, "compare");
    function compareSemver(a, b) {
      return compare(parseInt(a[0]), parseInt(b[0])) || compare(parseInt(a[1] || "0"), parseInt(b[1] || "0")) || compare(parseInt(a[2] || "0"), parseInt(b[2] || "0"));
    }
    __name(compareSemver, "compareSemver");
    function semverFilterLoose(operator, range) {
      range = range.split(".").map(parseSimpleInt);
      if (typeof range[1] === "undefined") {
        range[1] = "x";
      }
      switch (operator) {
        case "<=":
          return function(version2) {
            version2 = version2.split(".").map(parseSimpleInt);
            return compareSemverLoose(version2, range) <= 0;
          };
        case ">=":
        default:
          return function(version2) {
            version2 = version2.split(".").map(parseSimpleInt);
            return compareSemverLoose(version2, range) >= 0;
          };
      }
    }
    __name(semverFilterLoose, "semverFilterLoose");
    function compareSemverLoose(version2, range) {
      if (version2[0] !== range[0]) {
        return version2[0] < range[0] ? -1 : 1;
      }
      if (range[1] === "x") {
        return 0;
      }
      if (version2[1] !== range[1]) {
        return version2[1] < range[1] ? -1 : 1;
      }
      return 0;
    }
    __name(compareSemverLoose, "compareSemverLoose");
    function resolveVersion(data, version2) {
      if (data.versions.indexOf(version2) !== -1) {
        return version2;
      } else if (browserslist2.versionAliases[data.name][version2]) {
        return browserslist2.versionAliases[data.name][version2];
      } else {
        return false;
      }
    }
    __name(resolveVersion, "resolveVersion");
    function normalizeVersion(data, version2) {
      var resolved = resolveVersion(data, version2);
      if (resolved) {
        return resolved;
      } else if (data.versions.length === 1) {
        return data.versions[0];
      } else {
        return false;
      }
    }
    __name(normalizeVersion, "normalizeVersion");
    function filterByYear(since, context) {
      since = since / 1e3;
      return Object.keys(agents).reduce(function(selected, name) {
        var data = byName(name, context);
        if (!data)
          return selected;
        var versions = Object.keys(data.releaseDate).filter(function(v) {
          var date = data.releaseDate[v];
          return date !== null && date >= since;
        });
        return selected.concat(versions.map(nameMapper(data.name)));
      }, []);
    }
    __name(filterByYear, "filterByYear");
    function cloneData(data) {
      return {
        name: data.name,
        versions: data.versions,
        released: data.released,
        releaseDate: data.releaseDate
      };
    }
    __name(cloneData, "cloneData");
    function byName(name, context) {
      name = name.toLowerCase();
      name = browserslist2.aliases[name] || name;
      if (context.mobileToDesktop && browserslist2.desktopNames[name]) {
        var desktop = browserslist2.data[browserslist2.desktopNames[name]];
        if (name === "android") {
          return normalizeAndroidData(cloneData(browserslist2.data[name]), desktop);
        } else {
          var cloned = cloneData(desktop);
          cloned.name = name;
          return cloned;
        }
      }
      return browserslist2.data[name];
    }
    __name(byName, "byName");
    function normalizeAndroidVersions(androidVersions, chromeVersions) {
      var iFirstEvergreen = chromeVersions.indexOf(ANDROID_EVERGREEN_FIRST);
      return androidVersions.filter(function(version2) {
        return /^(?:[2-4]\.|[34]$)/.test(version2);
      }).concat(chromeVersions.slice(iFirstEvergreen));
    }
    __name(normalizeAndroidVersions, "normalizeAndroidVersions");
    function copyObject(obj) {
      var copy = {};
      for (var key in obj) {
        copy[key] = obj[key];
      }
      return copy;
    }
    __name(copyObject, "copyObject");
    function normalizeAndroidData(android, chrome) {
      android.released = normalizeAndroidVersions(android.released, chrome.released);
      android.versions = normalizeAndroidVersions(android.versions, chrome.versions);
      android.releaseDate = copyObject(android.releaseDate);
      android.released.forEach(function(v) {
        if (android.releaseDate[v] === void 0) {
          android.releaseDate[v] = chrome.releaseDate[v];
        }
      });
      return android;
    }
    __name(normalizeAndroidData, "normalizeAndroidData");
    function checkName(name, context) {
      var data = byName(name, context);
      if (!data)
        throw new BrowserslistError("Unknown browser " + name);
      return data;
    }
    __name(checkName, "checkName");
    function unknownQuery(query) {
      return new BrowserslistError(
        "Unknown browser query `" + query + "`. Maybe you are using old Browserslist or made typo in query."
      );
    }
    __name(unknownQuery, "unknownQuery");
    function filterJumps(list, name, nVersions, context) {
      var jump = 1;
      switch (name) {
        case "android":
          if (context.mobileToDesktop)
            return list;
          var released = browserslist2.data.chrome.released;
          jump = released.length - released.indexOf(ANDROID_EVERGREEN_FIRST);
          break;
        case "op_mob":
          var latest = browserslist2.data.op_mob.released.slice(-1)[0];
          jump = getMajor(latest) - OP_MOB_BLINK_FIRST + 1;
          break;
        default:
          return list;
      }
      if (nVersions <= jump) {
        return list.slice(-1);
      }
      return list.slice(jump - 1 - nVersions);
    }
    __name(filterJumps, "filterJumps");
    function isSupported(flags, withPartial) {
      return typeof flags === "string" && (flags.indexOf("y") >= 0 || withPartial && flags.indexOf("a") >= 0);
    }
    __name(isSupported, "isSupported");
    function resolve(queries, context) {
      return parse2(QUERIES, queries).reduce(function(result, node2, index) {
        if (node2.not && index === 0) {
          throw new BrowserslistError(
            "Write any browsers query (for instance, `defaults`) before `" + node2.query + "`"
          );
        }
        var type = QUERIES[node2.type];
        var array = type.select.call(browserslist2, context, node2).map(function(j) {
          var parts = j.split(" ");
          if (parts[1] === "0") {
            return parts[0] + " " + byName(parts[0], context).versions[0];
          } else {
            return j;
          }
        });
        if (node2.compose === "and") {
          if (node2.not) {
            return result.filter(function(j) {
              return array.indexOf(j) === -1;
            });
          } else {
            return result.filter(function(j) {
              return array.indexOf(j) !== -1;
            });
          }
        } else {
          if (node2.not) {
            var filter = {};
            array.forEach(function(j) {
              filter[j] = true;
            });
            return result.filter(function(j) {
              return !filter[j];
            });
          }
          return result.concat(array);
        }
      }, []);
    }
    __name(resolve, "resolve");
    function prepareOpts(opts) {
      if (typeof opts === "undefined")
        opts = {};
      if (typeof opts.path === "undefined") {
        opts.path = path.resolve ? path.resolve(".") : ".";
      }
      return opts;
    }
    __name(prepareOpts, "prepareOpts");
    function prepareQueries(queries, opts) {
      if (typeof queries === "undefined" || queries === null) {
        var config2 = browserslist2.loadConfig(opts);
        if (config2) {
          queries = config2;
        } else {
          queries = browserslist2.defaults;
        }
      }
      return queries;
    }
    __name(prepareQueries, "prepareQueries");
    function checkQueries(queries) {
      if (!(typeof queries === "string" || Array.isArray(queries))) {
        throw new BrowserslistError(
          "Browser queries must be an array or string. Got " + typeof queries + "."
        );
      }
    }
    __name(checkQueries, "checkQueries");
    var cache = {};
    function browserslist2(queries, opts) {
      opts = prepareOpts(opts);
      queries = prepareQueries(queries, opts);
      checkQueries(queries);
      var context = {
        ignoreUnknownVersions: opts.ignoreUnknownVersions,
        dangerousExtend: opts.dangerousExtend,
        mobileToDesktop: opts.mobileToDesktop,
        path: opts.path,
        env: opts.env
      };
      env.oldDataWarning(browserslist2.data);
      var stats = env.getStat(opts, browserslist2.data);
      if (stats) {
        context.customUsage = {};
        for (var browser in stats) {
          fillUsage(context.customUsage, browser, stats[browser]);
        }
      }
      var cacheKey = JSON.stringify([queries, context]);
      if (cache[cacheKey])
        return cache[cacheKey];
      var result = uniq(resolve(queries, context)).sort(function(name1, name2) {
        name1 = name1.split(" ");
        name2 = name2.split(" ");
        if (name1[0] === name2[0]) {
          var version1 = name1[1].split("-")[0];
          var version2 = name2[1].split("-")[0];
          return compareSemver(version2.split("."), version1.split("."));
        } else {
          return compare(name1[0], name2[0]);
        }
      });
      if (!env.env.BROWSERSLIST_DISABLE_CACHE) {
        cache[cacheKey] = result;
      }
      return result;
    }
    __name(browserslist2, "browserslist");
    browserslist2.parse = function(queries, opts) {
      opts = prepareOpts(opts);
      queries = prepareQueries(queries, opts);
      checkQueries(queries);
      return parse2(QUERIES, queries);
    };
    browserslist2.cache = {};
    browserslist2.data = {};
    browserslist2.usage = {
      global: {},
      custom: null
    };
    browserslist2.defaults = ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"];
    browserslist2.aliases = {
      fx: "firefox",
      ff: "firefox",
      ios: "ios_saf",
      explorer: "ie",
      blackberry: "bb",
      explorermobile: "ie_mob",
      operamini: "op_mini",
      operamobile: "op_mob",
      chromeandroid: "and_chr",
      firefoxandroid: "and_ff",
      ucandroid: "and_uc",
      qqandroid: "and_qq"
    };
    browserslist2.desktopNames = {
      and_chr: "chrome",
      and_ff: "firefox",
      ie_mob: "ie",
      android: "chrome"
      // has extra processing logic
    };
    browserslist2.versionAliases = {};
    browserslist2.clearCaches = env.clearCaches;
    browserslist2.parseConfig = env.parseConfig;
    browserslist2.readConfig = env.readConfig;
    browserslist2.findConfig = env.findConfig;
    browserslist2.loadConfig = env.loadConfig;
    browserslist2.coverage = function(browsers, stats) {
      var data;
      if (typeof stats === "undefined") {
        data = browserslist2.usage.global;
      } else if (stats === "my stats") {
        var opts = {};
        opts.path = path.resolve ? path.resolve(".") : ".";
        var customStats = env.getStat(opts);
        if (!customStats) {
          throw new BrowserslistError("Custom usage statistics was not provided");
        }
        data = {};
        for (var browser in customStats) {
          fillUsage(data, browser, customStats[browser]);
        }
      } else if (typeof stats === "string") {
        if (stats.length > 2) {
          stats = stats.toLowerCase();
        } else {
          stats = stats.toUpperCase();
        }
        env.loadCountry(browserslist2.usage, stats, browserslist2.data);
        data = browserslist2.usage[stats];
      } else {
        if ("dataByBrowser" in stats) {
          stats = stats.dataByBrowser;
        }
        data = {};
        for (var name in stats) {
          for (var version2 in stats[name]) {
            data[name + " " + version2] = stats[name][version2];
          }
        }
      }
      return browsers.reduce(function(all, i) {
        var usage = data[i];
        if (usage === void 0) {
          usage = data[i.replace(/ \S+$/, " 0")];
        }
        return all + (usage || 0);
      }, 0);
    };
    function nodeQuery(context, node2) {
      var matched = browserslist2.nodeVersions.filter(function(i) {
        return isVersionsMatch(i, node2.version);
      });
      if (matched.length === 0) {
        if (context.ignoreUnknownVersions) {
          return [];
        } else {
          throw new BrowserslistError(
            "Unknown version " + node2.version + " of Node.js"
          );
        }
      }
      return ["node " + matched[matched.length - 1]];
    }
    __name(nodeQuery, "nodeQuery");
    function sinceQuery(context, node2) {
      var year = parseInt(node2.year);
      var month = parseInt(node2.month || "01") - 1;
      var day = parseInt(node2.day || "01");
      return filterByYear(Date.UTC(year, month, day, 0, 0, 0), context);
    }
    __name(sinceQuery, "sinceQuery");
    function coverQuery(context, node2) {
      var coverage = parseFloat(node2.coverage);
      var usage = browserslist2.usage.global;
      if (node2.place) {
        if (node2.place.match(/^my\s+stats$/i)) {
          if (!context.customUsage) {
            throw new BrowserslistError("Custom usage statistics was not provided");
          }
          usage = context.customUsage;
        } else {
          var place;
          if (node2.place.length === 2) {
            place = node2.place.toUpperCase();
          } else {
            place = node2.place.toLowerCase();
          }
          env.loadCountry(browserslist2.usage, place, browserslist2.data);
          usage = browserslist2.usage[place];
        }
      }
      var versions = Object.keys(usage).sort(function(a, b) {
        return usage[b] - usage[a];
      });
      var coveraged = 0;
      var result = [];
      var version2;
      for (var i = 0; i < versions.length; i++) {
        version2 = versions[i];
        if (usage[version2] === 0)
          break;
        coveraged += usage[version2];
        result.push(version2);
        if (coveraged >= coverage)
          break;
      }
      return result;
    }
    __name(coverQuery, "coverQuery");
    var QUERIES = {
      last_major_versions: {
        matches: ["versions"],
        regexp: /^last\s+(\d+)\s+major\s+versions?$/i,
        select: function(context, node2) {
          return Object.keys(agents).reduce(function(selected, name) {
            var data = byName(name, context);
            if (!data)
              return selected;
            var list = getMajorVersions(data.released, node2.versions);
            list = list.map(nameMapper(data.name));
            list = filterJumps(list, data.name, node2.versions, context);
            return selected.concat(list);
          }, []);
        }
      },
      last_versions: {
        matches: ["versions"],
        regexp: /^last\s+(\d+)\s+versions?$/i,
        select: function(context, node2) {
          return Object.keys(agents).reduce(function(selected, name) {
            var data = byName(name, context);
            if (!data)
              return selected;
            var list = data.released.slice(-node2.versions);
            list = list.map(nameMapper(data.name));
            list = filterJumps(list, data.name, node2.versions, context);
            return selected.concat(list);
          }, []);
        }
      },
      last_electron_major_versions: {
        matches: ["versions"],
        regexp: /^last\s+(\d+)\s+electron\s+major\s+versions?$/i,
        select: function(context, node2) {
          var validVersions = getMajorVersions(Object.keys(e2c), node2.versions);
          return validVersions.map(function(i) {
            return "chrome " + e2c[i];
          });
        }
      },
      last_node_major_versions: {
        matches: ["versions"],
        regexp: /^last\s+(\d+)\s+node\s+major\s+versions?$/i,
        select: function(context, node2) {
          return getMajorVersions(browserslist2.nodeVersions, node2.versions).map(
            function(version2) {
              return "node " + version2;
            }
          );
        }
      },
      last_browser_major_versions: {
        matches: ["versions", "browser"],
        regexp: /^last\s+(\d+)\s+(\w+)\s+major\s+versions?$/i,
        select: function(context, node2) {
          var data = checkName(node2.browser, context);
          var validVersions = getMajorVersions(data.released, node2.versions);
          var list = validVersions.map(nameMapper(data.name));
          list = filterJumps(list, data.name, node2.versions, context);
          return list;
        }
      },
      last_electron_versions: {
        matches: ["versions"],
        regexp: /^last\s+(\d+)\s+electron\s+versions?$/i,
        select: function(context, node2) {
          return Object.keys(e2c).slice(-node2.versions).map(function(i) {
            return "chrome " + e2c[i];
          });
        }
      },
      last_node_versions: {
        matches: ["versions"],
        regexp: /^last\s+(\d+)\s+node\s+versions?$/i,
        select: function(context, node2) {
          return browserslist2.nodeVersions.slice(-node2.versions).map(function(version2) {
            return "node " + version2;
          });
        }
      },
      last_browser_versions: {
        matches: ["versions", "browser"],
        regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
        select: function(context, node2) {
          var data = checkName(node2.browser, context);
          var list = data.released.slice(-node2.versions).map(nameMapper(data.name));
          list = filterJumps(list, data.name, node2.versions, context);
          return list;
        }
      },
      unreleased_versions: {
        matches: [],
        regexp: /^unreleased\s+versions$/i,
        select: function(context) {
          return Object.keys(agents).reduce(function(selected, name) {
            var data = byName(name, context);
            if (!data)
              return selected;
            var list = data.versions.filter(function(v) {
              return data.released.indexOf(v) === -1;
            });
            list = list.map(nameMapper(data.name));
            return selected.concat(list);
          }, []);
        }
      },
      unreleased_electron_versions: {
        matches: [],
        regexp: /^unreleased\s+electron\s+versions?$/i,
        select: function() {
          return [];
        }
      },
      unreleased_browser_versions: {
        matches: ["browser"],
        regexp: /^unreleased\s+(\w+)\s+versions?$/i,
        select: function(context, node2) {
          var data = checkName(node2.browser, context);
          return data.versions.filter(function(v) {
            return data.released.indexOf(v) === -1;
          }).map(nameMapper(data.name));
        }
      },
      last_years: {
        matches: ["years"],
        regexp: /^last\s+(\d*.?\d+)\s+years?$/i,
        select: function(context, node2) {
          return filterByYear(Date.now() - YEAR * node2.years, context);
        }
      },
      since_y: {
        matches: ["year"],
        regexp: /^since (\d+)$/i,
        select: sinceQuery
      },
      since_y_m: {
        matches: ["year", "month"],
        regexp: /^since (\d+)-(\d+)$/i,
        select: sinceQuery
      },
      since_y_m_d: {
        matches: ["year", "month", "day"],
        regexp: /^since (\d+)-(\d+)-(\d+)$/i,
        select: sinceQuery
      },
      popularity: {
        matches: ["sign", "popularity"],
        regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%$/,
        select: function(context, node2) {
          var popularity = parseFloat(node2.popularity);
          var usage = browserslist2.usage.global;
          return Object.keys(usage).reduce(function(result, version2) {
            if (node2.sign === ">") {
              if (usage[version2] > popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<") {
              if (usage[version2] < popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<=") {
              if (usage[version2] <= popularity) {
                result.push(version2);
              }
            } else if (usage[version2] >= popularity) {
              result.push(version2);
            }
            return result;
          }, []);
        }
      },
      popularity_in_my_stats: {
        matches: ["sign", "popularity"],
        regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+my\s+stats$/,
        select: function(context, node2) {
          var popularity = parseFloat(node2.popularity);
          if (!context.customUsage) {
            throw new BrowserslistError("Custom usage statistics was not provided");
          }
          var usage = context.customUsage;
          return Object.keys(usage).reduce(function(result, version2) {
            var percentage = usage[version2];
            if (percentage == null) {
              return result;
            }
            if (node2.sign === ">") {
              if (percentage > popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<") {
              if (percentage < popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<=") {
              if (percentage <= popularity) {
                result.push(version2);
              }
            } else if (percentage >= popularity) {
              result.push(version2);
            }
            return result;
          }, []);
        }
      },
      popularity_in_config_stats: {
        matches: ["sign", "popularity", "config"],
        regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+(\S+)\s+stats$/,
        select: function(context, node2) {
          var popularity = parseFloat(node2.popularity);
          var stats = env.loadStat(context, node2.config, browserslist2.data);
          if (stats) {
            context.customUsage = {};
            for (var browser in stats) {
              fillUsage(context.customUsage, browser, stats[browser]);
            }
          }
          if (!context.customUsage) {
            throw new BrowserslistError("Custom usage statistics was not provided");
          }
          var usage = context.customUsage;
          return Object.keys(usage).reduce(function(result, version2) {
            var percentage = usage[version2];
            if (percentage == null) {
              return result;
            }
            if (node2.sign === ">") {
              if (percentage > popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<") {
              if (percentage < popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<=") {
              if (percentage <= popularity) {
                result.push(version2);
              }
            } else if (percentage >= popularity) {
              result.push(version2);
            }
            return result;
          }, []);
        }
      },
      popularity_in_place: {
        matches: ["sign", "popularity", "place"],
        regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+((alt-)?\w\w)$/,
        select: function(context, node2) {
          var popularity = parseFloat(node2.popularity);
          var place = node2.place;
          if (place.length === 2) {
            place = place.toUpperCase();
          } else {
            place = place.toLowerCase();
          }
          env.loadCountry(browserslist2.usage, place, browserslist2.data);
          var usage = browserslist2.usage[place];
          return Object.keys(usage).reduce(function(result, version2) {
            var percentage = usage[version2];
            if (percentage == null) {
              return result;
            }
            if (node2.sign === ">") {
              if (percentage > popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<") {
              if (percentage < popularity) {
                result.push(version2);
              }
            } else if (node2.sign === "<=") {
              if (percentage <= popularity) {
                result.push(version2);
              }
            } else if (percentage >= popularity) {
              result.push(version2);
            }
            return result;
          }, []);
        }
      },
      cover: {
        matches: ["coverage"],
        regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%$/i,
        select: coverQuery
      },
      cover_in: {
        matches: ["coverage", "place"],
        regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%\s+in\s+(my\s+stats|(alt-)?\w\w)$/i,
        select: coverQuery
      },
      supports: {
        matches: ["supportType", "feature"],
        regexp: /^(?:(fully|partially) )?supports\s+([\w-]+)$/,
        select: function(context, node2) {
          env.loadFeature(browserslist2.cache, node2.feature);
          var withPartial = node2.supportType !== "fully";
          var features = browserslist2.cache[node2.feature];
          var result = [];
          for (var name in features) {
            var data = byName(name, context);
            var checkDesktop = context.mobileToDesktop && name in browserslist2.desktopNames && isSupported(features[name][data.released.slice(-1)[0]], withPartial);
            data.versions.forEach(function(version2) {
              var flags = features[name][version2];
              if (flags === void 0 && checkDesktop) {
                flags = features[browserslist2.desktopNames[name]][version2];
              }
              if (isSupported(flags, withPartial)) {
                result.push(name + " " + version2);
              }
            });
          }
          return result;
        }
      },
      electron_range: {
        matches: ["from", "to"],
        regexp: /^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,
        select: function(context, node2) {
          var fromToUse = normalizeElectron(node2.from);
          var toToUse = normalizeElectron(node2.to);
          var from2 = parseFloat(node2.from);
          var to = parseFloat(node2.to);
          if (!e2c[fromToUse]) {
            throw new BrowserslistError("Unknown version " + from2 + " of electron");
          }
          if (!e2c[toToUse]) {
            throw new BrowserslistError("Unknown version " + to + " of electron");
          }
          return Object.keys(e2c).filter(function(i) {
            var parsed = parseFloat(i);
            return parsed >= from2 && parsed <= to;
          }).map(function(i) {
            return "chrome " + e2c[i];
          });
        }
      },
      node_range: {
        matches: ["from", "to"],
        regexp: /^node\s+([\d.]+)\s*-\s*([\d.]+)$/i,
        select: function(context, node2) {
          return browserslist2.nodeVersions.filter(semverFilterLoose(">=", node2.from)).filter(semverFilterLoose("<=", node2.to)).map(function(v) {
            return "node " + v;
          });
        }
      },
      browser_range: {
        matches: ["browser", "from", "to"],
        regexp: /^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,
        select: function(context, node2) {
          var data = checkName(node2.browser, context);
          var from2 = parseFloat(normalizeVersion(data, node2.from) || node2.from);
          var to = parseFloat(normalizeVersion(data, node2.to) || node2.to);
          function filter(v) {
            var parsed = parseFloat(v);
            return parsed >= from2 && parsed <= to;
          }
          __name(filter, "filter");
          return data.released.filter(filter).map(nameMapper(data.name));
        }
      },
      electron_ray: {
        matches: ["sign", "version"],
        regexp: /^electron\s*(>=?|<=?)\s*([\d.]+)$/i,
        select: function(context, node2) {
          var versionToUse = normalizeElectron(node2.version);
          return Object.keys(e2c).filter(generateFilter(node2.sign, versionToUse)).map(function(i) {
            return "chrome " + e2c[i];
          });
        }
      },
      node_ray: {
        matches: ["sign", "version"],
        regexp: /^node\s*(>=?|<=?)\s*([\d.]+)$/i,
        select: function(context, node2) {
          return browserslist2.nodeVersions.filter(generateSemverFilter(node2.sign, node2.version)).map(function(v) {
            return "node " + v;
          });
        }
      },
      browser_ray: {
        matches: ["browser", "sign", "version"],
        regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,
        select: function(context, node2) {
          var version2 = node2.version;
          var data = checkName(node2.browser, context);
          var alias = browserslist2.versionAliases[data.name][version2];
          if (alias)
            version2 = alias;
          return data.released.filter(generateFilter(node2.sign, version2)).map(function(v) {
            return data.name + " " + v;
          });
        }
      },
      firefox_esr: {
        matches: [],
        regexp: /^(firefox|ff|fx)\s+esr$/i,
        select: function() {
          return ["firefox 115"];
        }
      },
      opera_mini_all: {
        matches: [],
        regexp: /(operamini|op_mini)\s+all/i,
        select: function() {
          return ["op_mini all"];
        }
      },
      electron_version: {
        matches: ["version"],
        regexp: /^electron\s+([\d.]+)$/i,
        select: function(context, node2) {
          var versionToUse = normalizeElectron(node2.version);
          var chrome = e2c[versionToUse];
          if (!chrome) {
            throw new BrowserslistError(
              "Unknown version " + node2.version + " of electron"
            );
          }
          return ["chrome " + chrome];
        }
      },
      node_major_version: {
        matches: ["version"],
        regexp: /^node\s+(\d+)$/i,
        select: nodeQuery
      },
      node_minor_version: {
        matches: ["version"],
        regexp: /^node\s+(\d+\.\d+)$/i,
        select: nodeQuery
      },
      node_patch_version: {
        matches: ["version"],
        regexp: /^node\s+(\d+\.\d+\.\d+)$/i,
        select: nodeQuery
      },
      current_node: {
        matches: [],
        regexp: /^current\s+node$/i,
        select: function(context) {
          return [env.currentNode(resolve, context)];
        }
      },
      maintained_node: {
        matches: [],
        regexp: /^maintained\s+node\s+versions$/i,
        select: function(context) {
          var now = Date.now();
          var queries = Object.keys(jsEOL).filter(function(key) {
            return now < Date.parse(jsEOL[key].end) && now > Date.parse(jsEOL[key].start) && isEolReleased(key);
          }).map(function(key) {
            return "node " + key.slice(1);
          });
          return resolve(queries, context);
        }
      },
      phantomjs_1_9: {
        matches: [],
        regexp: /^phantomjs\s+1.9$/i,
        select: function() {
          return ["safari 5"];
        }
      },
      phantomjs_2_1: {
        matches: [],
        regexp: /^phantomjs\s+2.1$/i,
        select: function() {
          return ["safari 6"];
        }
      },
      browser_version: {
        matches: ["browser", "version"],
        regexp: /^(\w+)\s+(tp|[\d.]+)$/i,
        select: function(context, node2) {
          var version2 = node2.version;
          if (/^tp$/i.test(version2))
            version2 = "TP";
          var data = checkName(node2.browser, context);
          var alias = normalizeVersion(data, version2);
          if (alias) {
            version2 = alias;
          } else {
            if (version2.indexOf(".") === -1) {
              alias = version2 + ".0";
            } else {
              alias = version2.replace(/\.0$/, "");
            }
            alias = normalizeVersion(data, alias);
            if (alias) {
              version2 = alias;
            } else if (context.ignoreUnknownVersions) {
              return [];
            } else {
              throw new BrowserslistError(
                "Unknown version " + version2 + " of " + node2.browser
              );
            }
          }
          return [data.name + " " + version2];
        }
      },
      browserslist_config: {
        matches: [],
        regexp: /^browserslist config$/i,
        select: function(context) {
          return browserslist2(void 0, context);
        }
      },
      extends: {
        matches: ["config"],
        regexp: /^extends (.+)$/i,
        select: function(context, node2) {
          return resolve(env.loadQueries(context, node2.config), context);
        }
      },
      defaults: {
        matches: [],
        regexp: /^defaults$/i,
        select: function(context) {
          return resolve(browserslist2.defaults, context);
        }
      },
      dead: {
        matches: [],
        regexp: /^dead$/i,
        select: function(context) {
          var dead = [
            "Baidu >= 0",
            "ie <= 11",
            "ie_mob <= 11",
            "bb <= 10",
            "op_mob <= 12.1",
            "samsung 4"
          ];
          return resolve(dead, context);
        }
      },
      unknown: {
        matches: [],
        regexp: /^(\w+)$/i,
        select: function(context, node2) {
          if (byName(node2.query, context)) {
            throw new BrowserslistError(
              "Specify versions in Browserslist query for browser " + node2.query
            );
          } else {
            throw unknownQuery(node2.query);
          }
        }
      }
    };
    (function() {
      for (var name in agents) {
        var browser = agents[name];
        browserslist2.data[name] = {
          name,
          versions: normalize(agents[name].versions),
          released: normalize(agents[name].versions.slice(0, -3)),
          releaseDate: agents[name].release_date
        };
        fillUsage(browserslist2.usage.global, name, browser.usage_global);
        browserslist2.versionAliases[name] = {};
        for (var i = 0; i < browser.versions.length; i++) {
          var full = browser.versions[i];
          if (!full)
            continue;
          if (full.indexOf("-") !== -1) {
            var interval = full.split("-");
            for (var j = 0; j < interval.length; j++) {
              browserslist2.versionAliases[name][interval[j]] = full;
            }
          }
        }
      }
      browserslist2.nodeVersions = jsReleases.map(function(release) {
        return release.version;
      });
    })();
    module.exports = browserslist2;
  }
});

// test-src/index.ts
var import_mocha = __toESM(require_mocha(), 1);

// node_modules/chai/index.mjs
var import_index = __toESM(require_chai2(), 1);
var expect = import_index.default.expect;
var version = import_index.default.version;
var Assertion = import_index.default.Assertion;
var AssertionError = import_index.default.AssertionError;
var util = import_index.default.util;
var config = import_index.default.config;
var use = import_index.default.use;
var should = import_index.default.should;
var assert = import_index.default.assert;
var core = import_index.default.core;

// test-src/index.ts
var import_browserslist = __toESM(require_browserslist(), 1);
import lightningcssInit, {
  transform,
  browserslistToTargets
} from "https://esm.run/lightningcss-wasm";

// src/util.ts
function sleepSync(ms) {
  const end = (/* @__PURE__ */ new Date()).getTime() + ms;
  let time = (/* @__PURE__ */ new Date()).getTime();
  while (time < end) {
    time = (/* @__PURE__ */ new Date()).getTime();
  }
  return time;
}
__name(sleepSync, "sleepSync");
function uuid() {
  return sleepSync(1).toString(36);
}
__name(uuid, "uuid");

// node_modules/stylis/src/Enum.js
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";

// node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
function trim(value) {
  return value.trim();
}
__name(trim, "trim");
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
__name(replace, "replace");
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
__name(indexof, "indexof");
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
__name(charat, "charat");
function substr(value, begin, end) {
  return value.slice(begin, end);
}
__name(substr, "substr");
function strlen(value) {
  return value.length;
}
__name(strlen, "strlen");
function sizeof(value) {
  return value.length;
}
__name(sizeof, "sizeof");
function append(value, array) {
  return array.push(value), value;
}
__name(append, "append");

// node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
__name(node, "node");
function char() {
  return character;
}
__name(char, "char");
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
__name(prev, "prev");
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
__name(next, "next");
function peek() {
  return charat(characters, position);
}
__name(peek, "peek");
function caret() {
  return position;
}
__name(caret, "caret");
function slice(begin, end) {
  return substr(characters, begin, end);
}
__name(slice, "slice");
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
__name(token, "token");
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
__name(alloc, "alloc");
function dealloc(value) {
  return characters = "", value;
}
__name(dealloc, "dealloc");
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
__name(delimit, "delimit");
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
__name(whitespace, "whitespace");
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
__name(escaping, "escaping");
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
__name(delimiter, "delimiter");
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
__name(commenter, "commenter");
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
__name(identifier, "identifier");

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
__name(compile, "compile");
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1)
              characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
__name(parse, "parse");
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
__name(ruleset, "ruleset");
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
__name(comment, "comment");
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
__name(declaration, "declaration");

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
__name(serialize, "serialize");
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length)
        break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(",")))
        return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
__name(stringify, "stringify");

// src/cssProcessor/stylis.bundle.ts
function stylis(css) {
  return serialize(compile(css), stringify);
}
__name(stylis, "stylis");

// src/isolator.ts
var Isolator = class {
  static {
    __name(this, "Isolator");
  }
  constructor(element) {
    this.element = element;
    this.isolation ? this._isolate(this.isolation) : null;
  }
  get isolation() {
    let isolation = this.element.getAttribute("isolation");
    if (isolation === "") {
      isolation = "open";
    }
    return isolation;
  }
  isolate(mode) {
    this.element.setAttribute("isolation", mode);
    return this._isolate(mode);
  }
  _isolate(mode) {
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode });
    this.element.insertAdjacentElement("beforebegin", host);
    shadowRoot.append(this.element);
    this.host = host;
    this.hostShadowRoot = shadowRoot;
    return host;
  }
};
function IsolatorMixin(Base) {
  return class _Isolator extends Base {
    static {
      __name(this, "_Isolator");
    }
    constructor(...args) {
      super(...args);
      this._isolator = new Isolator(this);
    }
    isolate(mode = "open") {
      return this._isolator.isolate(mode);
    }
    connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;
      if (!this._isolator.host) {
        return;
      }
      ;
      if (this.getRootNode().host !== this._isolator.host) {
        const host = this._isolator.host;
        this._isolator.host = void 0;
        this.insertAdjacentElement("beforebegin", host);
        this._isolator.hostShadowRoot?.append(this);
        this._isolator.host = host;
      }
    }
    disconnectedCallback() {
      if (!this._isolator.host) {
        return super.disconnectedCallback ? super.disconnectedCallback() : null;
      }
      ;
      if (this.getRootNode() === this) {
        this._isolator.host.remove();
      }
      ;
      if (!(this.getRootNode().host === this._isolator.host)) {
        this._isolator.host.remove();
      }
      super.disconnectedCallback ? super.disconnectedCallback() : null;
    }
  };
}
__name(IsolatorMixin, "IsolatorMixin");

// src/adapter.ts
var AdapterClass = class {
  constructor() {
    this.cssStyleSheet = new CSSStyleSheet();
    /** Style portions for this component
     * They are kept in array based on the order of adding by `addStyle()`,
     * ready to be defined in `cssStyleSheet` with components query selector.
     */
    this.styles = [];
  }
  static {
    __name(this, "AdapterClass");
  }
  /** Retreive styles including styles from super class */
  get allStyles() {
    let superClass = Object.getPrototypeOf(this.adapterClass);
    const allStyles = [];
    while (superClass.adapter) {
      allStyles.push(...superClass.adapter.styles);
      superClass = Object.getPrototypeOf(superClass);
    }
    allStyles.push(...this.styles);
    return allStyles;
  }
  /** Retreive CSS including all CSS super classes. */
  get allCSS() {
    return this.allStyles.join("\n");
  }
  /** Set CSS for this component */
  set css(css) {
    this.styles = [css];
    if (this.tagName) {
      this.cssStyleSheet.replaceSync(
        this.adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`)
      );
    }
  }
  /** Get CSS defined by this component */
  get css() {
    return this.styles.join("\n");
  }
  /**
   * Define component to element tag and init component style.
   * To extends this function, sub-elements must be defined
   * before call this function as `super.define(tagName);`
   */
  define(tagName) {
    this.tagName = tagName;
    customElements.define(tagName, this.adapterClass);
    this.initStyle();
  }
  /** Init component style */
  initStyle() {
    document.adoptedStyleSheets.push(this.cssStyleSheet);
    this.cssStyleSheet.replaceSync(
      this.adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`)
    );
  }
  /** Add style to this component */
  addStyle(css) {
    this.styles.push(css);
    if (this.tagName) {
      const rule = `${this.tagName} { ${css} }`;
      const processedCss = this.adapterClass.cssProcess(rule);
      this.cssStyleSheet.replaceSync(`
        ${this.tagName} { ${this.allCSS} }
        ${processedCss}
      `);
    }
  }
};
var AdapterObject = class {
  constructor() {
    this.cssStyleSheet = new CSSStyleSheet();
  }
  static {
    __name(this, "AdapterObject");
  }
  /** get uuid or generate a new one */
  get uuid() {
    if (this._uuid) {
      return this._uuid;
    }
    ;
    this._uuid = `${this.adapterObject.tagName}-${uuid()}`;
    return this._uuid;
  }
  /** get cssObserver or generate a new one */
  get cssObserver() {
    if (this._cssObserver) {
      return this._cssObserver;
    }
    ;
    this._cssObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "css") {
          this.adapterObject.css = this.adapterObject.getAttribute("css") || "";
        }
        ;
      }
      ;
    });
    return this._cssObserver;
  }
  /** Return a selector for the this element as a class chain. */
  get objectClassSelector() {
    return this.adapterObject.classList.value.replace(/ /g, ".");
  }
  /** Init class and styles for this element */
  initClass() {
    this._class = this.adapterObject.constructor;
    if (this._class.adapter.tagName) {
      return;
    }
    this._class.adapter.tagName = this.adapterObject.tagName;
    this._class.adapter.initStyle();
  }
  /** Enable or disable CSS Observation */
  cssObserve(enable) {
    if (enable) {
      this.cssObserver.observe(this.adapterObject, { attributes: true });
    } else {
      this.cssObserver.disconnect();
    }
  }
};
function AdapterMixin(Base) {
  return class _Adapter extends Base {
    /**
     * In constructor, there any some if condition to check
     * if it has been inited or not to prevent recursive call in Mixin
     */
    constructor(...args) {
      super(...args);
      this._adapter = new AdapterObject();
      this._adapter.adapterObject = this;
      if (!this._adapter._class) {
        this._adapter.initClass();
      }
      ;
      this._adapter.cssObserve(true);
    }
    static {
      __name(this, "_Adapter");
    }
    static get adapter() {
      if (this._adapter === Object.getPrototypeOf(this)._adapter) {
        this._adapter = new AdapterClass();
        this._adapter.adapterClass = this;
      }
      return this._adapter;
    }
    /** CSS Process middleware, This function will be called
     * before applying CSS to CSSStyleSheet.
     */
    static cssProcess(css) {
      return css;
    }
    static set css(css) {
      this.adapter.css = css;
    }
    static get css() {
      return this.adapter.css;
    }
    static get tagName() {
      return this.adapter.tagName;
    }
    /** Add style to this component */
    static addStyle(css) {
      this.adapter.addStyle(css);
    }
    /**
     * Define component to element tag and init component style.
     * To extends this function, sub-elements must be defined
     * before call this function as `super.define(tagName);`
     */
    static define(tagName) {
      this.adapter.define(tagName);
    }
    /**
     * Set CSS for this element.
     * It works like `<el style="">` but with CSS processor.
     */
    set css(css) {
      this.classList.add(this._adapter.uuid);
      const processedCss = this._adapter._class.cssProcess(
        `${this.tagName}.${this._adapter.objectClassSelector} { ${css} }`
      );
      this._adapter.cssStyleSheet.replaceSync(processedCss);
    }
    /** Get CSS for this element */
    get css() {
      let css = this.getAttribute("css") || "";
      if (css) {
        return css;
      }
      ;
      for (const rule of this._adapter.cssStyleSheet.cssRules) {
        css += rule.cssText + "\n";
      }
      return css;
    }
    /** Add style for this element */
    addStyle(css) {
      this.classList.add(this._adapter.uuid);
      const processedCss = this._adapter._class.cssProcess(
        `${this.tagName}.${this._adapter.objectClassSelector} { ${css} }`
      );
      this._adapter.cssStyleSheet.replaceSync(`
        ${this.css}
        ${processedCss}
      `);
    }
    connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;
      const css = this.getAttribute("css");
      if (css) {
        this.css = css;
      }
      ;
      const rootNode = this.getRootNode();
      if (rootNode.adoptedStyleSheets.indexOf(
        this._adapter._class.adapter.cssStyleSheet
      ) === -1) {
        rootNode.adoptedStyleSheets.push(
          this._adapter._class.adapter.cssStyleSheet
        );
      }
      if (rootNode.adoptedStyleSheets.indexOf(
        this._adapter.cssStyleSheet
      ) === -1) {
        rootNode.adoptedStyleSheets.push(
          this._adapter.cssStyleSheet
        );
      }
    }
    /** Remove the element from DOM and remove adoptedStyleSheet */
    remove() {
      const rootNode = this.getRootNode();
      const i = rootNode.adoptedStyleSheets.indexOf(this._adapter.cssStyleSheet);
      rootNode.adoptedStyleSheets.splice(i, 1);
      super.remove();
    }
  };
}
__name(AdapterMixin, "AdapterMixin");
var Adapter = class extends IsolatorMixin(AdapterMixin(HTMLElement)) {
  static {
    __name(this, "Adapter");
  }
  static cssProcess(css) {
    return stylis(css);
  }
};

// test-src/index.ts
var __base_url = new URL(import.meta.url);
if (["0.0.0.0", "127.0.0.1", "localhost"].includes(__base_url.hostname)) {
  new EventSource("/esbuild").addEventListener(
    "change",
    () => location.reload()
  );
}
await lightningcssInit();
var style = new CSSStyleSheet();
document.adoptedStyleSheets.push(style);
style.replaceSync(`
  body {
      padding-bottom: 10rem;
  }
  #render {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
  }
`);
import_mocha.default.setup({
  ui: "bdd",
  checkLeaks: true
});
var render = document.querySelector("#render");
describe("Adapter Class: Use Case", () => {
  class Card1 extends Adapter {
    static {
      __name(this, "Card1");
    }
  }
  class Card2 extends Adapter {
    static {
      __name(this, "Card2");
    }
  }
  class RedCard extends Card1 {
    static {
      __name(this, "RedCard");
    }
  }
  it("Should be extendable", () => {
    assert(Object.getPrototypeOf(Card1) === Adapter);
  });
  it("Each sub-class or sibling-class should have different styles object", () => {
    assert(
      Card1.adapter.styles !== Card2.adapter.styles,
      `Card1.styles !== Card2.styles`
    );
    assert(
      Card1.adapter.styles !== RedCard.adapter.styles,
      `Card1.styles !== RedCard.styles`
    );
  });
  it("Should be able to define tagName", () => {
    Card1.define("el-card1");
    assert(Card1.adapter.tagName?.toLowerCase() === "el-card1");
    customElements.define("el-card2", Card2);
    const card2 = new Card2();
    assert(card2.tagName.toLowerCase() === "el-card2");
    assert(card2._adapter._class.adapter.tagName?.toLowerCase() === "el-card2");
  });
  it("Should be able to create instance", () => {
    const card1 = new Card1();
    assert(card1 instanceof Card1);
    assert(card1 instanceof Adapter);
  });
  it("Should be able to use API: addStyle()", () => {
    Card1.addStyle(`
      display: flex;
      button {
        color: red;
      }
    `);
    assert(Card1.adapter.allCSS.includes(`display: flex;`));
    Card2.addStyle(`display: block;`);
    assert(Card2.adapter.allCSS.includes(`display: block;`));
  });
  it("Should inherit style from super class", () => {
    RedCard.addStyle(`background-color: red;`);
    assert(RedCard.adapter.allCSS.includes(`display: flex;`));
    assert(RedCard.adapter.allCSS.includes("display: flex;"));
    assert(RedCard.adapter.allCSS.includes("background-color: red;"));
    RedCard.define("el-red-card");
    assert(
      RedCard.adapter.cssStyleSheet.cssRules[0].cssText.includes(
        "display: flex;"
      )
    );
  });
  it("Should be able to set css in class declaration", () => {
    class Card3 extends Adapter {
      static {
        __name(this, "Card3");
      }
      static {
        this.css = `display: grid;`;
      }
      constructor() {
        super();
        this.innerHTML = "Card3";
      }
    }
    Card3.define("el-card3");
    Card3.css = `${Card3.css} &.red {color: red}`;
    assert(Card3.css.includes("display: grid;"));
    assert(Card3.css.includes("&.red {color: red}"));
  });
  it("Should be able to set css for component", () => {
    const additionStyle = `background-color: red;`;
    RedCard.css = additionStyle;
    assert(RedCard.adapter.allCSS.includes(additionStyle));
    assert(RedCard.adapter.allCSS.includes(Card1.css));
  });
  it("Class' CSSStyleSheet() should be adopted by document", () => {
    assert(document.adoptedStyleSheets.includes(Card1.adapter.cssStyleSheet));
    assert(document.adoptedStyleSheets.includes(Card2.adapter.cssStyleSheet));
    assert(document.adoptedStyleSheets.includes(RedCard.adapter.cssStyleSheet));
  });
});
describe("Adapter Object: Use Case", () => {
  class Button1 extends Adapter {
    static {
      __name(this, "Button1");
    }
    static {
      this.css = `visibility: hidden;`;
    }
  }
  class Button2 extends Adapter {
    static {
      __name(this, "Button2");
    }
    static {
      this.css = `visibility: hidden;`;
    }
  }
  Button1.define("el-button1");
  customElements.define("el-button2", Button2);
  const button1 = new Button1();
  const button2 = new Button2();
  it("Should inherited from parent class properly", () => {
    assert(button1 instanceof Button1);
    assert(button1 instanceof Adapter);
  });
  it("constructor() should be called and setup the instance", () => {
    assert(button1._adapter._class === Button1);
    assert(button1._adapter._class.tagName === "el-button1");
    assert(
      document.adoptedStyleSheets.includes(button1._adapter._class.adapter.cssStyleSheet)
    );
    assert(button2._adapter._class === Button2);
    assert(button2._adapter._class.tagName?.toLowerCase() === "el-button2");
    assert(
      document.adoptedStyleSheets.includes(button2._adapter._class.adapter.cssStyleSheet)
    );
  });
  it("It's uuid should be unique", () => {
    assert(button1._adapter.uuid !== button2._adapter.uuid);
  });
  it(`Should have cssStyleSheet and is adopted by document`, () => {
    assert(button1._adapter.cssStyleSheet instanceof CSSStyleSheet);
    assert(button2._adapter.cssStyleSheet instanceof CSSStyleSheet);
    document.body.append(button1);
    document.body.append(button2);
    assert(document.adoptedStyleSheets.includes(button1._adapter.cssStyleSheet));
    assert(document.adoptedStyleSheets.includes(button2._adapter.cssStyleSheet));
  });
  it("Can set css for this instance", () => {
    button1.css = `display: flex;`;
    assert(
      button1._adapter.cssStyleSheet.cssRules[0].cssText.includes(
        "display: flex;"
      )
    );
  });
  it("Can get CSS for this instance", () => {
    assert(button1.css.includes("display: flex;"));
  });
  it("Can add style for this instance", () => {
    button1.addStyle(`background-color: red;`);
    assert(
      button1._adapter.cssStyleSheet.cssRules[1].cssText.includes(
        "background-color: red;"
      )
    );
  });
  it("Can be removed from document", () => {
    button1.remove();
    button2.remove();
    assert(!document.adoptedStyleSheets.includes(button1._adapter.cssStyleSheet));
    assert(!document.adoptedStyleSheets.includes(button2._adapter.cssStyleSheet));
  });
});
describe("Adapter Mixin: Use Case", () => {
  class Pin1 extends AdapterMixin(HTMLElement) {
    static {
      __name(this, "Pin1");
    }
  }
  class Pin2 extends AdapterMixin(Pin1) {
    static {
      __name(this, "Pin2");
    }
  }
  Pin1.define("el-pin1");
  Pin2.define("el-pin2");
  const pin1 = new Pin1();
  const pin2 = new Pin2();
  it("Should be able to mixin", () => {
    assert(pin1 instanceof Pin1);
    assert(pin1 instanceof HTMLElement);
    assert(pin2 instanceof Pin2);
    assert(pin2 instanceof Pin1);
    assert(pin2 instanceof HTMLElement);
  });
});
describe("CSS Processor", () => {
  it("Can use stylis processor", () => {
    class MyAdapter extends Adapter {
      static {
        __name(this, "MyAdapter");
      }
      static cssProcess(css) {
        return stylis(css);
      }
      static {
        this.css = `
        display: flex;
        min-height: 20vh;
        background-color: #eee;
        &.red {
            background-color: red;
        }
      `;
      }
    }
    MyAdapter.define("el-adapter-stylis");
    assert(
      MyAdapter.adapter.cssStyleSheet.cssRules[1].cssText.includes(
        "el-adapter-stylis.red"
      )
    );
  });
  it("Can use lightningcss-wasm processor (beta)", async () => {
    class MyAdapter extends Adapter {
      static {
        __name(this, "MyAdapter");
      }
      static cssProcess(css) {
        let { code } = transform({
          code: new TextEncoder().encode(css),
          sourceMap: false,
          targets: browserslistToTargets((0, import_browserslist.default)(">= 0.25%"))
        });
        code = new TextDecoder().decode(code);
        return code;
      }
      static {
        this.css = `
        display: flex;
        min-height: 20vh;
        background-color: #eee;
        &.red {
            background-color: red;
        }
      `;
      }
    }
    MyAdapter.define("el-adapter-lightningcss");
    assert(
      MyAdapter.adapter.cssStyleSheet.cssRules[1].cssText.includes(
        "el-adapter-lightningcss.red"
      )
    );
  });
});
describe("Shadow DOM Support", () => {
  class ShadowHost extends Adapter {
    static {
      __name(this, "ShadowHost");
    }
    static {
      this.css = `visibility: hidden;`;
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  }
  class Button extends Adapter {
    static {
      __name(this, "Button");
    }
    static {
      this.css = `
      display: flex;
      justify-content: center;
      color: white;
      background-color: red;
      width: 100px;
      height: 2rem;
    `;
    }
  }
  Button.define("el-button");
  ShadowHost.define("el-shadow-host");
  it(`Component is styled under Shadow DOM`, () => {
    const shadowHost = new ShadowHost();
    const button = new Button();
    shadowHost.shadowRoot?.append(button);
    document.body.append(shadowHost);
    assert(getComputedStyle(button).backgroundColor === "rgb(255, 0, 0)");
  });
});
describe("Isolator", () => {
  class Card extends Adapter {
    static {
      __name(this, "Card");
    }
    static {
      this.css = `
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      background-color: blue;
    `;
    }
  }
  Card.define("el-card");
  it("Can isolate elements and move elements", () => {
    const card = new Card();
    render.append(card);
    let host = card.isolate();
    assert(host instanceof HTMLElement);
    assert(host.shadowRoot !== null);
    assert(host.shadowRoot.mode === "open");
    card.remove();
    host = card.isolate("closed");
    render.append(card);
    assert(host instanceof HTMLElement);
    assert(host.shadowRoot === null);
    assert(card._isolator.hostShadowRoot.mode === "closed");
    card.remove();
  });
});
import_mocha.default.run();
/*! Bundled license information:

mocha/mocha.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
  (*! https://mths.be/he v1.2.0 by @mathias | MIT license *)
  (*!
   * mocha
   * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   *)

assertion-error/index.js:
  (*!
   * assertion-error
   * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
   * MIT Licensed
   *)
  (*!
   * Return a function that will copy properties from
   * one object to another excluding any originally
   * listed. Returned function will create a new `{}`.
   *
   * @param {String} excluded properties ...
   * @return {Function}
   *)
  (*!
   * Primary Exports
   *)
  (*!
   * Inherit from Error.prototype
   *)
  (*!
   * Statically set name
   *)
  (*!
   * Ensure correct constructor
   *)

chai/lib/chai/utils/flag.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/test.js:
  (*!
   * Chai - test utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/expectTypes.js:
  (*!
   * Chai - expectTypes utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getActual.js:
  (*!
   * Chai - getActual utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/objDisplay.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getMessage.js:
  (*!
   * Chai - message composition utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/transferFlags.js:
  (*!
   * Chai - transferFlags utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

deep-eql/index.js:
  (*!
   * deep-eql
   * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Check to see if the MemoizeMap has recorded a result of the two operands
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @returns {Boolean|null} result
  *)
  (*!
   * Set the result of the equality into the MemoizeMap
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @param {Boolean} result
  *)
  (*!
   * Primary Export
   *)
  (*!
   * The main logic of the `deepEqual` function.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (optional) Additional options
   * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
   * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
      complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
      references to blow the stack.
   * @return {Boolean} equal match
  *)
  (*!
   * Compare two Regular Expressions for equality.
   *
   * @param {RegExp} leftHandOperand
   * @param {RegExp} rightHandOperand
   * @return {Boolean} result
   *)
  (*!
   * Compare two Sets/Maps for equality. Faster than other equality functions.
   *
   * @param {Set} leftHandOperand
   * @param {Set} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for generator objects such as those returned by generator functions.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Determine if the given object has an @@iterator function.
   *
   * @param {Object} target
   * @return {Boolean} `true` if the object has an @@iterator function.
   *)
  (*!
   * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
   * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
   *
   * @param {Object} target
   * @returns {Array} an array of entries from the @@iterator function
   *)
  (*!
   * Gets all entries from a Generator. This will consume the generator - which could have side effects.
   *
   * @param {Generator} target
   * @returns {Array} an array of entries from the Generator.
   *)
  (*!
   * Gets all own and inherited enumerable keys from a target.
   *
   * @param {Object} target
   * @returns {Array} an array of own and inherited enumerable keys from the target.
   *)
  (*!
   * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
   * each key. If any value of the given key is not equal, the function will return false (early).
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
   * for each enumerable key in the object.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Returns true if the argument is a primitive.
   *
   * This intentionally returns true for all objects that can be compared by reference,
   * including functions and symbols.
   *
   * @param {Mixed} value
   * @return {Boolean} result
   *)

chai/lib/chai/utils/isProxyEnabled.js:
  (*!
   * Chai - isProxyEnabled helper
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addProperty.js:
  (*!
   * Chai - addProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addLengthGuard.js:
  (*!
   * Chai - addLengthGuard utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getProperties.js:
  (*!
   * Chai - getProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/proxify.js:
  (*!
   * Chai - proxify utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addMethod.js:
  (*!
   * Chai - addMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteProperty.js:
  (*!
   * Chai - overwriteProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteMethod.js:
  (*!
   * Chai - overwriteMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addChainableMethod.js:
  (*!
   * Chai - addChainingMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)
  (*!
   * Module variables
   *)

chai/lib/chai/utils/overwriteChainableMethod.js:
  (*!
   * Chai - overwriteChainableMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/compareByInspect.js:
  (*!
   * Chai - compareByInspect utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js:
  (*!
   * Chai - getOwnEnumerablePropertySymbols utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getOwnEnumerableProperties.js:
  (*!
   * Chai - getOwnEnumerableProperties utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/isNaN.js:
  (*!
   * Chai - isNaN utility
   * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/index.js:
  (*!
   * chai
   * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Dependencies that are used for multiple exports are required here only once
   *)
  (*!
   * test utility
   *)
  (*!
   * type utility
   *)
  (*!
   * expectTypes utility
   *)
  (*!
   * message utility
   *)
  (*!
   * actual utility
   *)
  (*!
   * Inspect util
   *)
  (*!
   * Object Display util
   *)
  (*!
   * Flag utility
   *)
  (*!
   * Flag transferring utility
   *)
  (*!
   * Deep equal utility
   *)
  (*!
   * Deep path info
   *)
  (*!
   * Check if a property exists
   *)
  (*!
   * Function name
   *)
  (*!
   * add Property
   *)
  (*!
   * add Method
   *)
  (*!
   * overwrite Property
   *)
  (*!
   * overwrite Method
   *)
  (*!
   * Add a chainable method
   *)
  (*!
   * Overwrite chainable method
   *)
  (*!
   * Compare by inspect method
   *)
  (*!
   * Get own enumerable property symbols method
   *)
  (*!
   * Get own enumerable properties method
   *)
  (*!
   * Checks error against a given set of criteria
   *)
  (*!
   * Proxify util
   *)
  (*!
   * addLengthGuard util
   *)
  (*!
   * isProxyEnabled helper
   *)
  (*!
   * isNaN method
   *)
  (*!
   * getOperator method
   *)

chai/lib/chai/assertion.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * - `eql`: This flag contains the deepEqual function to be used by the assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   *)
  (*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   *)

chai/lib/chai/core/assertions.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/expect.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/should.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/assert.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   *)
  (*!
   * Aliases.
   *)

chai/lib/chai.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai version
   *)
  (*!
   * Assertion Error
   *)
  (*!
   * Utils for plugins (not exported)
   *)
  (*!
   * Utility Functions
   *)
  (*!
   * Configuration
   *)
  (*!
   * Primary `Assertion` prototype
   *)
  (*!
   * Core Assertions
   *)
  (*!
   * Expect interface
   *)
  (*!
   * Should interface
   *)
  (*!
   * Assert interface
   *)
*/
//# sourceMappingURL=index.js.map
