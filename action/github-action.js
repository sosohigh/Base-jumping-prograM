
'use strict';

var require$$0$c = require('path');
var require$$0$h = require('os');
var require$$0$d = require('vm');
var require$$0$f = require('events');
var require$$0$e = require('fs');
var require$$1$7 = require('util');
var require$$0$g = require('tty');
var Stream$2 = require('stream');
var require$$0$i = require('buffer');
var Url$2 = require('url');
var http$6 = require('http');
var https$3 = require('https');
var domain$2 = require('domain');
var require$$0$j = require('crypto');
var require$$5$2 = require('assert');
var require$$1$8 = require('string_decoder');
var require$$4$2 = require('net');
var require$$1$9 = require('tls');
var require$$0$k = require('dns');
var require$$0$l = require('punycode');
var zlib$2 = require('zlib');
var require$$8$1 = require('querystring');
var require$$5$3 = require('process');
var require$$7$1 = require('http2');
var require$$0$m = require('constants');
var require$$1$a = require('child_process');
var require$$2$8 = require('worker_threads');
var require$$0$n = require('module');
var http$7 = require('node:http');
var https$4 = require('node:https');
var zlib$3 = require('node:zlib');
var Stream$3 = require('node:stream');
var node_buffer = require('node:buffer');
var node_util = require('node:util');
var node_url = require('node:url');
var node_net = require('node:net');
require('node:fs');
require('node:path');

function _interopNamespaceDefault(e) {
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var require$$0__namespace$1 = /*#__PURE__*/_interopNamespaceDefault(require$$0$c);
var require$$0__namespace$2 = /*#__PURE__*/_interopNamespaceDefault(require$$0$h);
var require$$0__namespace = /*#__PURE__*/_interopNamespaceDefault(require$$0$e);
var require$$1__namespace = /*#__PURE__*/_interopNamespaceDefault(require$$1$7);
var Url__namespace = /*#__PURE__*/_interopNamespaceDefault(Url$2);
var http__namespace = /*#__PURE__*/_interopNamespaceDefault(http$6);
var https__namespace = /*#__PURE__*/_interopNamespaceDefault(https$3);
var domain__namespace = /*#__PURE__*/_interopNamespaceDefault(domain$2);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var lib$8 = {};

var context = {};

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return Object.propertyIsEnumerable.call(target, symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1$1 = deepmerge;

var cjs = deepmerge_1$1;

var aliasLog$1 = {};

Object.defineProperty(aliasLog$1, "__esModule", { value: true });
aliasLog$1.aliasLog = void 0;
/**
 * `probot.log()`, `app.log()` and `context.log()` are aliasing `.log.info()`.
 * We will probably remove the aliasing in future.
 */
function aliasLog(log) {
    function logInfo() {
        // @ts-ignore
        log.info(...arguments);
    }
    for (const key in log) {
        // @ts-ignore
        logInfo[key] =
            typeof log[key] === "function" ? log[key].bind(log) : log[key];
    }
    // @ts-ignore
    return logInfo;
}
aliasLog$1.aliasLog = aliasLog;

var __importDefault$8 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(context, "__esModule", { value: true });
context.Context = void 0;
const path_1$3 = __importDefault$8(require$$0$c);
const deepmerge_1 = __importDefault$8(cjs);
const alias_log_1$2 = aliasLog$1;
/**
 * The context of the event that was triggered, including the payload and
 * helpers for extracting information can be passed to GitHub API calls.
 *
 *  ```js
 *  module.exports = app => {
 *    app.on('push', context => {
 *      context.log.info('Code was pushed to the repo, what should we do with it?');
 *    });
 *  };
 *  ```
 *
 * @property {octokit} octokit - An Octokit instance
 * @property {payload} payload - The webhook event payload
 * @property {log} log - A pino instance
 */
class Context {
    constructor(event, octokit, log) {
        this.name = event.name;
        this.id = event.id;
        this.payload = event.payload;
        this.octokit = octokit;
        this.log = (0, alias_log_1$2.aliasLog)(log);
    }
    /**
     * Return the `owner` and `repo` params for making API requests against a
     * repository.
     *
     * ```js
     * const params = context.repo({path: '.github/config.yml'})
     * // Returns: {owner: 'username', repo: 'reponame', path: '.github/config.yml'}
     * ```
     *
     * @param object - Params to be merged with the repo params.
     *
     */
    repo(object) {
        // @ts-ignore `repository` is not always present in this.payload
        const repo = this.payload.repository;
        if (!repo) {
            throw new Error("context.repo() is not supported for this webhook event.");
        }
        return Object.assign({
            owner: repo.owner.login,
            repo: repo.name,
        }, object);
    }
    /**
     * Return the `owner`, `repo`, and `issue_number` params for making API requests
     * against an issue. The object passed in will be merged with the repo params.
     *
     *
     * ```js
     * const params = context.issue({body: 'Hello World!'})
     * // Returns: {owner: 'username', repo: 'reponame', issue_number: 123, body: 'Hello World!'}
     * ```
     *
     * @param object - Params to be merged with the issue params.
     */
    issue(object) {
        return Object.assign({
            issue_number: 
            // @ts-ignore - this.payload may not have `issue` or `pull_request` keys
            (this.payload.issue || this.payload.pull_request || this.payload)
                .number,
        }, this.repo(object));
    }
    /**
     * Return the `owner`, `repo`, and `pull_number` params for making API requests
     * against a pull request. The object passed in will be merged with the repo params.
     *
     *
     * ```js
     * const params = context.pullRequest({body: 'Hello World!'})
     * // Returns: {owner: 'username', repo: 'reponame', pull_number: 123, body: 'Hello World!'}
     * ```
     *
     * @param object - Params to be merged with the pull request params.
     */
    pullRequest(object) {
        const payload = this.payload;
        return Object.assign({
            // @ts-ignore - this.payload may not have `issue` or `pull_request` keys
            pull_number: (payload.issue || payload.pull_request || payload).number,
        }, this.repo(object));
    }
    /**
     * Returns a boolean if the actor on the event was a bot.
     * @type {boolean}
     */
    get isBot() {
        // @ts-expect-error - `sender` key is currently not present in all events
        // see https://github.com/octokit/webhooks/issues/510
        return this.payload.sender.type === "Bot";
    }
    /**
     * Reads the app configuration from the given YAML file in the `.github`
     * directory of the repository.
     *
     * For example, given a file named `.github/config.yml`:
     *
     * ```yml
     * close: true
     * comment: Check the specs on the rotary girder.
     * ```
     *
     * Your app can read that file from the target repository:
     *
     * ```js
     * // Load config from .github/config.yml in the repository
     * const config = await context.config('config.yml')
     *
     * if (config.close) {
     *   context.octokit.issues.comment(context.issue({body: config.comment}))
     *   context.octokit.issues.edit(context.issue({state: 'closed'}))
     * }
     * ```
     *
     * You can also use a `defaultConfig` object:
     *
     * ```js
     * // Load config from .github/config.yml in the repository and combine with default config
     * const config = await context.config('config.yml', {comment: 'Make sure to check all the specs.'})
     *
     * if (config.close) {
     *   context.octokit.issues.comment(context.issue({body: config.comment}));
     *   context.octokit.issues.edit(context.issue({state: 'closed'}))
     * }
     * ```
     *
     * Config files can also specify a base that they extend. `deepMergeOptions` can be used
     * to configure how the target config, extended base, and default configs are merged.
     *
     * For security reasons, configuration is only loaded from the repository's default branch,
     * changes made in pull requests from different branches or forks are ignored.
     *
     * If you need more lower-level control over reading and merging configuration files,
     * you can `context.octokit.config.get(options)`, see https://github.com/probot/octokit-plugin-config.
     *
     * @param fileName - Name of the YAML file in the `.github` directory
     * @param defaultConfig - An object of default config options
     * @param deepMergeOptions - Controls merging configs (from the [deepmerge](https://github.com/TehShrike/deepmerge) module)
     * @return Configuration object read from the file
     */
    async config(fileName, defaultConfig, deepMergeOptions) {
        const params = this.repo({
            path: path_1$3.default.posix.join(".github", fileName),
            defaults(configs) {
                const result = deepmerge_1.default.all([defaultConfig || {}, ...configs], deepMergeOptions);
                return result;
            },
        });
        // @ts-ignore
        const { config, files } = await this.octokit.config.get(params);
        // if no default config is set, and no config files are found, return null
        if (!defaultConfig && !files.find((file) => file.config !== null)) {
            return null;
        }
        return config;
    }
}
context.Context = Context;

var probot = {};

var iterator$3;
var hasRequiredIterator$2;

function requireIterator$2 () {
	if (hasRequiredIterator$2) return iterator$3;
	hasRequiredIterator$2 = 1;
	iterator$3 = function (Yallist) {
	  Yallist.prototype[Symbol.iterator] = function* () {
	    for (let walker = this.head; walker; walker = walker.next) {
	      yield walker.value;
	    }
	  };
	};
	return iterator$3;
}

var yallist$2 = Yallist$3;

Yallist$3.Node = Node$1;
Yallist$3.create = Yallist$3;

function Yallist$3 (list) {
  var self = this;
  if (!(self instanceof Yallist$3)) {
    self = new Yallist$3();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self
}

Yallist$3.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;

  return next
};

Yallist$3.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }

  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};

Yallist$3.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }

  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};

Yallist$3.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push$2(this, arguments[i]);
  }
  return this.length
};

Yallist$3.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift$1(this, arguments[i]);
  }
  return this.length
};

Yallist$3.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res
};

Yallist$3.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res
};

Yallist$3.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist$3.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist$3.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist$3.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist$3.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$3();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res
};

Yallist$3.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$3();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res
};

Yallist$3.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc
};

Yallist$3.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc
};

Yallist$3.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr
};

Yallist$3.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr
};

Yallist$3.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$3();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret
};

Yallist$3.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$3();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret
};

Yallist$3.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert$1(this, walker, nodes[i]);
  }
  return ret;
};

Yallist$3.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this
};

function insert$1 (self, node, value) {
  var inserted = node === self.head ?
    new Node$1(value, null, node, self) :
    new Node$1(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;

  return inserted
}

function push$2 (self, item) {
  self.tail = new Node$1(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}

function unshift$1 (self, item) {
  self.head = new Node$1(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}

function Node$1 (value, prev, next, list) {
  if (!(this instanceof Node$1)) {
    return new Node$1(value, prev, next, list)
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  requireIterator$2()(Yallist$3);
} catch (er) {}

// A linked list to keep track of recently-used-ness
const Yallist$2 = yallist$2;

const MAX$1 = Symbol('max');
const LENGTH$1 = Symbol('length');
const LENGTH_CALCULATOR$1 = Symbol('lengthCalculator');
const ALLOW_STALE$1 = Symbol('allowStale');
const MAX_AGE$1 = Symbol('maxAge');
const DISPOSE$1 = Symbol('dispose');
const NO_DISPOSE_ON_SET$1 = Symbol('noDisposeOnSet');
const LRU_LIST$1 = Symbol('lruList');
const CACHE$1 = Symbol('cache');
const UPDATE_AGE_ON_GET$1 = Symbol('updateAgeOnGet');

const naiveLength$1 = () => 1;

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
let LRUCache$1 = class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options };

    if (!options)
      options = {};

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    this[MAX$1] = options.max || Infinity;

    const lc = options.length || naiveLength$1;
    this[LENGTH_CALCULATOR$1] = (typeof lc !== 'function') ? naiveLength$1 : lc;
    this[ALLOW_STALE$1] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE$1] = options.maxAge || 0;
    this[DISPOSE$1] = options.dispose;
    this[NO_DISPOSE_ON_SET$1] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET$1] = options.updateAgeOnGet || false;
    this.reset();
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX$1] = mL || Infinity;
    trim$2(this);
  }
  get max () {
    return this[MAX$1]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE$1] = !!allowStale;
  }
  get allowStale () {
    return this[ALLOW_STALE$1]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE$1] = mA;
    trim$2(this);
  }
  get maxAge () {
    return this[MAX_AGE$1]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength$1;

    if (lC !== this[LENGTH_CALCULATOR$1]) {
      this[LENGTH_CALCULATOR$1] = lC;
      this[LENGTH$1] = 0;
      this[LRU_LIST$1].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR$1](hit.value, hit.key);
        this[LENGTH$1] += hit.length;
      });
    }
    trim$2(this);
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR$1] }

  get length () { return this[LENGTH$1] }
  get itemCount () { return this[LRU_LIST$1].length }

  rforEach (fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST$1].tail; walker !== null;) {
      const prev = walker.prev;
      forEachStep$1(this, fn, walker, thisp);
      walker = prev;
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST$1].head; walker !== null;) {
      const next = walker.next;
      forEachStep$1(this, fn, walker, thisp);
      walker = next;
    }
  }

  keys () {
    return this[LRU_LIST$1].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST$1].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE$1] &&
        this[LRU_LIST$1] &&
        this[LRU_LIST$1].length) {
      this[LRU_LIST$1].forEach(hit => this[DISPOSE$1](hit.key, hit.value));
    }

    this[CACHE$1] = new Map(); // hash of items by key
    this[LRU_LIST$1] = new Yallist$2(); // list of items in order of use recency
    this[LENGTH$1] = 0; // length of items in the list
  }

  dump () {
    return this[LRU_LIST$1].map(hit =>
      isStale$1(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST$1]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE$1];

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR$1](value, key);

    if (this[CACHE$1].has(key)) {
      if (len > this[MAX$1]) {
        del$2(this, this[CACHE$1].get(key));
        return false
      }

      const node = this[CACHE$1].get(key);
      const item = node.value;

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE$1]) {
        if (!this[NO_DISPOSE_ON_SET$1])
          this[DISPOSE$1](key, item.value);
      }

      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH$1] += len - item.length;
      item.length = len;
      this.get(key);
      trim$2(this);
      return true
    }

    const hit = new Entry$1(key, value, len, now, maxAge);

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX$1]) {
      if (this[DISPOSE$1])
        this[DISPOSE$1](key, value);

      return false
    }

    this[LENGTH$1] += hit.length;
    this[LRU_LIST$1].unshift(hit);
    this[CACHE$1].set(key, this[LRU_LIST$1].head);
    trim$2(this);
    return true
  }

  has (key) {
    if (!this[CACHE$1].has(key)) return false
    const hit = this[CACHE$1].get(key).value;
    return !isStale$1(this, hit)
  }

  get (key) {
    return get$5(this, key, true)
  }

  peek (key) {
    return get$5(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST$1].tail;
    if (!node)
      return null

    del$2(this, node);
    return node.value
  }

  del (key) {
    del$2(this, this[CACHE$1].get(key));
  }

  load (arr) {
    // reset the cache
    this.reset();

    const now = Date.now();
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  prune () {
    this[CACHE$1].forEach((value, key) => get$5(this, key, false));
  }
};

const get$5 = (self, key, doUse) => {
  const node = self[CACHE$1].get(key);
  if (node) {
    const hit = node.value;
    if (isStale$1(self, hit)) {
      del$2(self, node);
      if (!self[ALLOW_STALE$1])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET$1])
          node.value.now = Date.now();
        self[LRU_LIST$1].unshiftNode(node);
      }
    }
    return hit.value
  }
};

const isStale$1 = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE$1]))
    return false

  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE$1] && (diff > self[MAX_AGE$1])
};

const trim$2 = self => {
  if (self[LENGTH$1] > self[MAX$1]) {
    for (let walker = self[LRU_LIST$1].tail;
      self[LENGTH$1] > self[MAX$1] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del$2(self, walker);
      walker = prev;
    }
  }
};

const del$2 = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE$1])
      self[DISPOSE$1](hit.key, hit.value);

    self[LENGTH$1] -= hit.length;
    self[CACHE$1].delete(hit.key);
    self[LRU_LIST$1].removeNode(node);
  }
};

let Entry$1 = class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
};

const forEachStep$1 = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale$1(self, hit)) {
    del$2(self, node);
    if (!self[ALLOW_STALE$1])
      hit = undefined;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self);
};

var lruCache$2 = LRUCache$1;

var auth$b = {};

var getAuthenticatedOctokit$1 = {};

Object.defineProperty(getAuthenticatedOctokit$1, "__esModule", { value: true });
getAuthenticatedOctokit$1.getAuthenticatedOctokit = void 0;
async function getAuthenticatedOctokit(state, installationId) {
    const { log, octokit } = state;
    if (!installationId)
        return octokit;
    return octokit.auth({
        type: "installation",
        installationId,
        factory: ({ octokit, octokitOptions, ...otherOptions }) => {
            const pinoLog = log.child({ name: "github" });
            const options = {
                ...octokitOptions,
                log: {
                    fatal: pinoLog.fatal.bind(pinoLog),
                    error: pinoLog.error.bind(pinoLog),
                    warn: pinoLog.warn.bind(pinoLog),
                    info: pinoLog.info.bind(pinoLog),
                    debug: pinoLog.debug.bind(pinoLog),
                    trace: pinoLog.trace.bind(pinoLog),
                },
                throttle: {
                    ...octokitOptions.throttle,
                    id: installationId,
                },
                auth: {
                    ...octokitOptions.auth,
                    otherOptions,
                    installationId,
                },
            };
            const Octokit = octokit.constructor;
            return new Octokit(options);
        },
    });
}
getAuthenticatedOctokit$1.getAuthenticatedOctokit = getAuthenticatedOctokit;

Object.defineProperty(auth$b, "__esModule", { value: true });
auth$b.auth = void 0;
const get_authenticated_octokit_1 = getAuthenticatedOctokit$1;
/**
 * Authenticate and get a GitHub client that can be used to make API calls.
 *
 * You'll probably want to use `context.octokit` instead.
 *
 * **Note**: `app.auth` is asynchronous, so it needs to be prefixed with a
 * [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
 * to wait for the magic to happen.
 *
 * ```js
 *  module.exports = (app) => {
 *    app.on('issues.opened', async context => {
 *      const octokit = await app.auth();
 *    });
 *  };
 * ```
 *
 * @param id - ID of the installation, which can be extracted from
 * `context.payload.installation.id`. If called without this parameter, the
 * client wil authenticate [as the app](https://docs.github.com/en/developers/apps/authenticating-with-github-apps#authenticating-as-a-github-app)
 * instead of as a specific installation, which means it can only be used for
 * [app APIs](https://docs.github.com/apps/).
 *
 * @returns An authenticated GitHub API client
 */
async function auth$a(state, installationId, log) {
    return (0, get_authenticated_octokit_1.getAuthenticatedOctokit)(Object.assign({}, state, log ? { log } : null), installationId);
}
auth$b.auth = auth$a;

var getLog$1 = {};

var pinoExports$1 = {};
var pino$7 = {
  get exports(){ return pinoExports$1; },
  set exports(v){ pinoExports$1 = v; },
};

var err$2 = errSerializer$5;

const { toString: toString$8 } = Object.prototype;
const seen$2 = Symbol('circular-ref-tag');
const rawSymbol$8 = Symbol('pino-raw-err-ref');
const pinoErrProto$2 = Object.create({}, {
  type: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  message: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  stack: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$8]
    },
    set: function (val) {
      this[rawSymbol$8] = val;
    }
  }
});
Object.defineProperty(pinoErrProto$2, rawSymbol$8, {
  writable: true,
  value: {}
});

function errSerializer$5 (err) {
  if (!(err instanceof Error)) {
    return err
  }

  err[seen$2] = undefined; // tag to prevent re-looking at this
  const _err = Object.create(pinoErrProto$2);
  _err.type = toString$8.call(err.constructor) === '[object Function]'
    ? err.constructor.name
    : err.name;
  _err.message = err.message;
  _err.stack = err.stack;
  for (const key in err) {
    if (_err[key] === undefined) {
      const val = err[key];
      if (val instanceof Error) {
        /* eslint-disable no-prototype-builtins */
        if (!val.hasOwnProperty(seen$2)) {
          _err[key] = errSerializer$5(val);
        }
      } else {
        _err[key] = val;
      }
    }
  }

  delete err[seen$2]; // clean up tag in case err is serialized again later
  _err.raw = err;
  return _err
}

var req$3 = {
  mapHttpRequest: mapHttpRequest$4,
  reqSerializer: reqSerializer$2
};

const rawSymbol$7 = Symbol('pino-raw-req-ref');
const pinoReqProto$2 = Object.create({}, {
  id: {
    enumerable: true,
    writable: true,
    value: ''
  },
  method: {
    enumerable: true,
    writable: true,
    value: ''
  },
  url: {
    enumerable: true,
    writable: true,
    value: ''
  },
  query: {
    enumerable: true,
    writable: true,
    value: ''
  },
  params: {
    enumerable: true,
    writable: true,
    value: ''
  },
  headers: {
    enumerable: true,
    writable: true,
    value: {}
  },
  remoteAddress: {
    enumerable: true,
    writable: true,
    value: ''
  },
  remotePort: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$7]
    },
    set: function (val) {
      this[rawSymbol$7] = val;
    }
  }
});
Object.defineProperty(pinoReqProto$2, rawSymbol$7, {
  writable: true,
  value: {}
});

function reqSerializer$2 (req) {
  // req.info is for hapi compat.
  const connection = req.info || req.socket;
  const _req = Object.create(pinoReqProto$2);
  _req.id = (typeof req.id === 'function' ? req.id() : (req.id || (req.info ? req.info.id : undefined)));
  _req.method = req.method;
  // req.originalUrl is for expressjs compat.
  if (req.originalUrl) {
    _req.url = req.originalUrl;
    _req.query = req.query;
    _req.params = req.params;
  } else {
    // req.url.path is  for hapi compat.
    _req.url = req.path || (req.url ? (req.url.path || req.url) : undefined);
  }
  _req.headers = req.headers;
  _req.remoteAddress = connection && connection.remoteAddress;
  _req.remotePort = connection && connection.remotePort;
  // req.raw is  for hapi compat/equivalence
  _req.raw = req.raw || req;
  return _req
}

function mapHttpRequest$4 (req) {
  return {
    req: reqSerializer$2(req)
  }
}

var res$3 = {
  mapHttpResponse: mapHttpResponse$4,
  resSerializer: resSerializer$2
};

const rawSymbol$6 = Symbol('pino-raw-res-ref');
const pinoResProto$2 = Object.create({}, {
  statusCode: {
    enumerable: true,
    writable: true,
    value: 0
  },
  headers: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$6]
    },
    set: function (val) {
      this[rawSymbol$6] = val;
    }
  }
});
Object.defineProperty(pinoResProto$2, rawSymbol$6, {
  writable: true,
  value: {}
});

function resSerializer$2 (res) {
  const _res = Object.create(pinoResProto$2);
  _res.statusCode = res.statusCode;
  _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
  _res.raw = res;
  return _res
}

function mapHttpResponse$4 (res) {
  return {
    res: resSerializer$2(res)
  }
}

const errSerializer$4 = err$2;
const reqSerializers$2 = req$3;
const resSerializers$2 = res$3;

var pinoStdSerializers$2 = {
  err: errSerializer$4,
  mapHttpRequest: reqSerializers$2.mapHttpRequest,
  mapHttpResponse: resSerializers$2.mapHttpResponse,
  req: reqSerializers$2.reqSerializer,
  res: resSerializers$2.resSerializer,

  wrapErrorSerializer: function wrapErrorSerializer (customSerializer) {
    if (customSerializer === errSerializer$4) return customSerializer
    return function wrapErrSerializer (err) {
      return customSerializer(errSerializer$4(err))
    }
  },

  wrapRequestSerializer: function wrapRequestSerializer (customSerializer) {
    if (customSerializer === reqSerializers$2.reqSerializer) return customSerializer
    return function wrappedReqSerializer (req) {
      return customSerializer(reqSerializers$2.reqSerializer(req))
    }
  },

  wrapResponseSerializer: function wrapResponseSerializer (customSerializer) {
    if (customSerializer === resSerializers$2.resSerializer) return customSerializer
    return function wrappedResSerializer (res) {
      return customSerializer(resSerializers$2.resSerializer(res))
    }
  }
};

const { createContext, runInContext } = require$$0$d;

var validator_1 = validator$4;

function validator$4 (opts = {}) {
  const {
    ERR_PATHS_MUST_BE_STRINGS = () => 'fast-redact - Paths must be (non-empty) strings',
    ERR_INVALID_PATH = (s) => `fast-redact – Invalid path (${s})`
  } = opts;

  return function validate ({ paths }) {
    paths.forEach((s) => {
      if (typeof s !== 'string') {
        throw Error(ERR_PATHS_MUST_BE_STRINGS())
      }
      try {
        if (/〇/.test(s)) throw Error()
        const proxy = new Proxy({}, { get: () => proxy, set: () => { throw Error() } });
        const expr = (s[0] === '[' ? '' : '.') + s.replace(/^\*/, '〇').replace(/\.\*/g, '.〇').replace(/\[\*\]/g, '[〇]');
        if (/\n|\r|;/.test(expr)) throw Error()
        if (/\/\*/.test(expr)) throw Error()
        runInContext(`
          (function () {
            'use strict'
            o${expr}
            if ([o${expr}].length !== 1) throw Error()
          })()
        `, createContext({ o: proxy, 〇: null }), {
          codeGeneration: { strings: false, wasm: false }
        });
      } catch (e) {
        throw Error(ERR_INVALID_PATH(s))
      }
    });
  }
}

var rx$5 = /[^.[\]]+|\[((?:.)*?)\]/g;

const rx$4 = rx$5;

var parse_1$2 = parse$p;

function parse$p ({ paths }) {
  const wildcards = [];
  var wcLen = 0;
  const secret = paths.reduce(function (o, strPath, ix) {
    var path = strPath.match(rx$4).map((p) => p.replace(/'|"|`/g, ''));
    const leadingBracket = strPath[0] === '[';
    path = path.map((p) => {
      if (p[0] === '[') return p.substr(1, p.length - 2)
      else return p
    });
    const star = path.indexOf('*');
    if (star > -1) {
      const before = path.slice(0, star);
      const beforeStr = before.join('.');
      const after = path.slice(star + 1, path.length);
      const nested = after.length > 0;
      wcLen++;
      wildcards.push({
        before,
        beforeStr,
        after,
        nested
      });
    } else {
      o[strPath] = {
        path: path,
        val: undefined,
        precensored: false,
        circle: '',
        escPath: JSON.stringify(strPath),
        leadingBracket: leadingBracket
      };
    }
    return o
  }, {});

  return { wildcards, wcLen, secret }
}

const rx$3 = rx$5;

var redactor_1 = redactor$1;

function redactor$1 ({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
  /* eslint-disable-next-line */
  const redact = Function('o', `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    ${resultTmpl(serialize)}
  `).bind(state);

  if (serialize === false) {
    redact.restore = (o) => state.restore(o);
  }

  return redact
}

function redactTmpl (secret, isCensorFct, censorFctTakesPath) {
  return Object.keys(secret).map((path) => {
    const { escPath, leadingBracket, path: arrPath } = secret[path];
    const skip = leadingBracket ? 1 : 0;
    const delim = leadingBracket ? '' : '.';
    const hops = [];
    var match;
    while ((match = rx$3.exec(path)) !== null) {
      const [ , ix ] = match;
      const { index, input } = match;
      if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)));
    }
    var existence = hops.map((p) => `o${delim}${p}`).join(' && ');
    if (existence.length === 0) existence += `o${delim}${path} != null`;
    else existence += ` && o${delim}${path} != null`;

    const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join('\n')}
      }
    `;

    const censorArgs = censorFctTakesPath
      ? `val, ${JSON.stringify(arrPath)}`
      : `val`;

    return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : 'censor'}
          ${circularDetection}
        }
      }
    `
  }).join('\n')
}

function dynamicRedactTmpl (hasWildcards, isCensorFct, censorFctTakesPath) {
  return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : ''
}

function resultTmpl (serialize) {
  return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `
}

function strictImpl (strict, serialize) {
  return strict === true
    ? `throw Error('fast-redact: primitives cannot be redacted')`
    : serialize === false ? `return o` : `return this.serialize(o)`
}

var modifiers = {
  groupRedact: groupRedact$1,
  groupRestore: groupRestore$1,
  nestedRedact: nestedRedact$1,
  nestedRestore: nestedRestore$1
};

function groupRestore$1 ({ keys, values, target }) {
  if (target == null) return
  const length = keys.length;
  for (var i = 0; i < length; i++) {
    const k = keys[i];
    target[k] = values[i];
  }
}

function groupRedact$1 (o, path, censor, isCensorFct, censorFctTakesPath) {
  const target = get$4(o, path);
  if (target == null) return { keys: null, values: null, target: null, flat: true }
  const keys = Object.keys(target);
  const keysLength = keys.length;
  const pathLength = path.length;
  const pathWithKey = censorFctTakesPath ? [...path] : undefined;
  const values = new Array(keysLength);

  for (var i = 0; i < keysLength; i++) {
    const key = keys[i];
    values[i] = target[key];

    if (censorFctTakesPath) {
      pathWithKey[pathLength] = key;
      target[key] = censor(target[key], pathWithKey);
    } else if (isCensorFct) {
      target[key] = censor(target[key]);
    } else {
      target[key] = censor;
    }
  }
  return { keys, values, target, flat: true }
}

function nestedRestore$1 (arr) {
  const length = arr.length;
  for (var i = 0; i < length; i++) {
    const { key, target, value } = arr[i];
    if (has$5(target, key)) {
      target[key] = value;
    }
    /* istanbul ignore else */
    if (typeof target === 'object') {
      const targetKeys = Object.keys(target);
      for (var j = 0; j < targetKeys.length; j++) {
        const tKey = targetKeys[j];
        const subTarget = target[tKey];
        if (has$5(subTarget, key)) {
          subTarget[key] = value;
        }
      }
    }
  }
}

function nestedRedact$1 (store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
  const target = get$4(o, path);
  if (target == null) return
  const keys = Object.keys(target);
  const keysLength = keys.length;
  for (var i = 0; i < keysLength; i++) {
    const key = keys[i];
    const { value, parent, exists } =
      specialSet(target, key, path, ns, censor, isCensorFct, censorFctTakesPath);

    if (exists === true && parent !== null) {
      store.push({ key: ns[ns.length - 1], target: parent, value });
    }
  }
  return store
}

function has$5 (obj, prop) {
  return obj !== undefined && obj !== null
    ? ('hasOwn' in Object ? Object.hasOwn(obj, prop) : Object.prototype.hasOwnProperty.call(obj, prop))
    : false
}

function specialSet (o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
  const afterPathLen = afterPath.length;
  const lastPathIndex = afterPathLen - 1;
  const originalKey = k;
  var i = -1;
  var n;
  var nv;
  var ov;
  var oov = null;
  var exists = true;
  var wc = null;
  ov = n = o[k];
  if (typeof n !== 'object') return { value: null, parent: null, exists }
  while (n != null && ++i < afterPathLen) {
    k = afterPath[i];
    oov = ov;
    if (k !== '*' && !wc && !(typeof n === 'object' && k in n)) {
      exists = false;
      break
    }
    if (k === '*') {
      wc = k;
      if (i !== lastPathIndex) {
        continue
      }
    }
    if (wc) {
      const wcKeys = Object.keys(n);
      for (var j = 0; j < wcKeys.length; j++) {
        const wck = wcKeys[j];
        const wcov = n[wck];
        const kIsWc = k === '*';
        if (kIsWc || (typeof wcov === 'object' && wcov !== null && k in wcov)) {
          if (kIsWc) {
            ov = wcov;
          } else {
            ov = wcov[k];
          }
          nv = (i !== lastPathIndex)
            ? ov
            : (isCensorFct
              ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
              : censor);
          if (kIsWc) {
            n[wck] = nv;
          } else {
            if (wcov[k] === nv) {
              exists = false;
            } else {
              wcov[k] = (nv === undefined && censor !== undefined) || (has$5(wcov, k) && nv === ov) ? wcov[k] : nv;
            }
          }
        }
      }
      wc = null;
    } else {
      ov = n[k];
      nv = (i !== lastPathIndex)
        ? ov
        : (isCensorFct
          ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
          : censor);
      n[k] = (has$5(n, k) && nv === ov) || (nv === undefined && censor !== undefined) ? n[k] : nv;
      n = n[k];
    }
    if (typeof n !== 'object') break
    // prevent circular structure, see https://github.com/pinojs/pino/issues/1513
    if (ov === oov) {
      exists = false;
    }
  }
  return { value: ov, parent: oov, exists }
}

function get$4 (o, p) {
  var i = -1;
  var l = p.length;
  var n = o;
  while (n != null && ++i < l) {
    n = n[p[i]];
  }
  return n
}

const { groupRestore, nestedRestore } = modifiers;

var restorer_1 = restorer$1;

function restorer$1 ({ secret, wcLen }) {
  return function compileRestore () {
    if (this.restore) return
    const paths = Object.keys(secret);
    const resetters = resetTmpl(secret, paths);
    const hasWildcards = wcLen > 0;
    const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
    /* eslint-disable-next-line */
    this.restore = Function(
      'o',
      restoreTmpl(resetters, paths, hasWildcards)
    ).bind(state);
  }
}

/**
 * Mutates the original object to be censored by restoring its original values
 * prior to censoring.
 *
 * @param {object} secret Compiled object describing which target fields should
 * be censored and the field states.
 * @param {string[]} paths The list of paths to censor as provided at
 * initialization time.
 *
 * @returns {string} String of JavaScript to be used by `Function()`. The
 * string compiles to the function that does the work in the description.
 */
function resetTmpl (secret, paths) {
  return paths.map((path) => {
    const { circle, escPath, leadingBracket } = secret[path];
    const delim = leadingBracket ? '' : '.';
    const reset = circle
      ? `o.${circle} = secret[${escPath}].val`
      : `o${delim}${path} = secret[${escPath}].val`;
    const clear = `secret[${escPath}].val = undefined`;
    return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `
  }).join('')
}

/**
 * Creates the body of the restore function
 *
 * Restoration of the redacted object happens
 * backwards, in reverse order of redactions,
 * so that repeated redactions on the same object
 * property can be eventually rolled back to the
 * original value.
 *
 * This way dynamic redactions are restored first,
 * starting from the last one working backwards and
 * followed by the static ones.
 *
 * @returns {string} the body of the restore function
 */
function restoreTmpl (resetters, paths, hasWildcards) {
  const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o.flat === true) this.groupRestore(o)
      else this.nestedRestore(o)
      secret[k] = null
    }
  ` : '';

  return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `
}

var state_1$1 = state$2;

function state$2 (o) {
  const {
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  } = o;
  const builder = [{ secret, censor, compileRestore }];
  if (serialize !== false) builder.push({ serialize });
  if (wcLen > 0) builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
  return Object.assign(...builder)
}

const validator$3 = validator_1;
const parse$o = parse_1$2;
const redactor = redactor_1;
const restorer = restorer_1;
const { groupRedact, nestedRedact } = modifiers;
const state$1 = state_1$1;
const rx$2 = rx$5;
const validate$4 = validator$3();
const noop$b = (o) => o;
noop$b.restore = noop$b;

const DEFAULT_CENSOR = '[REDACTED]';
fastRedact$2.rx = rx$2;
fastRedact$2.validator = validator$3;

var fastRedact_1 = fastRedact$2;

function fastRedact$2 (opts = {}) {
  const paths = Array.from(new Set(opts.paths || []));
  const serialize = 'serialize' in opts ? (
    opts.serialize === false ? opts.serialize
      : (typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify)
  ) : JSON.stringify;
  const remove = opts.remove;
  if (remove === true && serialize !== JSON.stringify) {
    throw Error('fast-redact – remove option may only be set when serializer is JSON.stringify')
  }
  const censor = remove === true
    ? undefined
    : 'censor' in opts ? opts.censor : DEFAULT_CENSOR;

  const isCensorFct = typeof censor === 'function';
  const censorFctTakesPath = isCensorFct && censor.length > 1;

  if (paths.length === 0) return serialize || noop$b

  validate$4({ paths, serialize, censor });

  const { wildcards, wcLen, secret } = parse$o({ paths, censor });

  const compileRestore = restorer({ secret, wcLen });
  const strict = 'strict' in opts ? opts.strict : true;

  return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state$1({
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  }))
}

const setLevelSym$5 = Symbol('pino.setLevel');
const getLevelSym$3 = Symbol('pino.getLevel');
const levelValSym$5 = Symbol('pino.levelVal');
const useLevelLabelsSym$1 = Symbol('pino.useLevelLabels');
const useOnlyCustomLevelsSym$7 = Symbol('pino.useOnlyCustomLevels');
const mixinSym$5 = Symbol('pino.mixin');

const lsCacheSym$7 = Symbol('pino.lsCache');
const chindingsSym$7 = Symbol('pino.chindings');
const parsedChindingsSym$3 = Symbol('pino.parsedChindings');

const asJsonSym$3 = Symbol('pino.asJson');
const writeSym$5 = Symbol('pino.write');
const redactFmtSym$8 = Symbol('pino.redactFmt');

const timeSym$5 = Symbol('pino.time');
const timeSliceIndexSym$5 = Symbol('pino.timeSliceIndex');
const streamSym$8 = Symbol('pino.stream');
const stringifySym$7 = Symbol('pino.stringify');
const stringifiersSym$7 = Symbol('pino.stringifiers');
const endSym$5 = Symbol('pino.end');
const formatOptsSym$7 = Symbol('pino.formatOpts');
const messageKeySym$5 = Symbol('pino.messageKey');
const nestedKeySym$5 = Symbol('pino.nestedKey');
const mixinMergeStrategySym$5 = Symbol('pino.mixinMergeStrategy');

const wildcardFirstSym$5 = Symbol('pino.wildcardFirst');

// public symbols, no need to use the same pino
// version for these
const serializersSym$7 = Symbol.for('pino.serializers');
const formattersSym$9 = Symbol.for('pino.formatters');
const hooksSym$5 = Symbol.for('pino.hooks');
const needsMetadataGsym$4 = Symbol.for('pino.metadata');

var symbols$3 = {
  setLevelSym: setLevelSym$5,
  getLevelSym: getLevelSym$3,
  levelValSym: levelValSym$5,
  useLevelLabelsSym: useLevelLabelsSym$1,
  mixinSym: mixinSym$5,
  lsCacheSym: lsCacheSym$7,
  chindingsSym: chindingsSym$7,
  parsedChindingsSym: parsedChindingsSym$3,
  asJsonSym: asJsonSym$3,
  writeSym: writeSym$5,
  serializersSym: serializersSym$7,
  redactFmtSym: redactFmtSym$8,
  timeSym: timeSym$5,
  timeSliceIndexSym: timeSliceIndexSym$5,
  streamSym: streamSym$8,
  stringifySym: stringifySym$7,
  stringifiersSym: stringifiersSym$7,
  endSym: endSym$5,
  formatOptsSym: formatOptsSym$7,
  messageKeySym: messageKeySym$5,
  nestedKeySym: nestedKeySym$5,
  wildcardFirstSym: wildcardFirstSym$5,
  needsMetadataGsym: needsMetadataGsym$4,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$7,
  formattersSym: formattersSym$9,
  hooksSym: hooksSym$5,
  mixinMergeStrategySym: mixinMergeStrategySym$5
};

const fastRedact$1 = fastRedact_1;
const { redactFmtSym: redactFmtSym$7, wildcardFirstSym: wildcardFirstSym$4 } = symbols$3;
const { rx: rx$1, validator: validator$2 } = fastRedact$1;

const validate$3 = validator$2({
  ERR_PATHS_MUST_BE_STRINGS: () => 'pino – redacted paths must be strings',
  ERR_INVALID_PATH: (s) => `pino – redact paths array contains an invalid path (${s})`
});

const CENSOR$1 = '[Redacted]';
const strict$1 = false; // TODO should this be configurable?

function redaction$5 (opts, serialize) {
  const { paths, censor } = handle$1(opts);

  const shape = paths.reduce((o, str) => {
    rx$1.lastIndex = 0;
    const first = rx$1.exec(str);
    const next = rx$1.exec(str);

    // ns is the top-level path segment, brackets + quoting removed.
    let ns = first[1] !== undefined
      ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1')
      : first[0];

    if (ns === '*') {
      ns = wildcardFirstSym$4;
    }

    // top level key:
    if (next === null) {
      o[ns] = null;
      return o
    }

    // path with at least two segments:
    // if ns is already redacted at the top level, ignore lower level redactions
    if (o[ns] === null) {
      return o
    }

    const { index } = next;
    const nextPath = `${str.substr(index, str.length - 1)}`;

    o[ns] = o[ns] || [];

    // shape is a mix of paths beginning with literal values and wildcard
    // paths [ "a.b.c", "*.b.z" ] should reduce to a shape of
    // { "a": [ "b.c", "b.z" ], *: [ "b.z" ] }
    // note: "b.z" is in both "a" and * arrays because "a" matches the wildcard.
    // (* entry has wildcardFirstSym as key)
    if (ns !== wildcardFirstSym$4 && o[ns].length === 0) {
      // first time ns's get all '*' redactions so far
      o[ns].push(...(o[wildcardFirstSym$4] || []));
    }

    if (ns === wildcardFirstSym$4) {
      // new * path gets added to all previously registered literal ns's.
      Object.keys(o).forEach(function (k) {
        if (o[k]) {
          o[k].push(nextPath);
        }
      });
    }

    o[ns].push(nextPath);
    return o
  }, {});

  // the redactor assigned to the format symbol key
  // provides top level redaction for instances where
  // an object is interpolated into the msg string
  const result = {
    [redactFmtSym$7]: fastRedact$1({ paths, censor, serialize, strict: strict$1 })
  };

  const topCensor = (...args) => {
    return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor)
  };

  return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
    // top level key:
    if (shape[k] === null) {
      o[k] = (value) => topCensor(value, [k]);
    } else {
      const wrappedCensor = typeof censor === 'function'
        ? (value, path) => {
            return censor(value, [k, ...path])
          }
        : censor;
      o[k] = fastRedact$1({
        paths: shape[k],
        censor: wrappedCensor,
        serialize,
        strict: strict$1
      });
    }
    return o
  }, result)
}

function handle$1 (opts) {
  if (Array.isArray(opts)) {
    opts = { paths: opts, censor: CENSOR$1 };
    validate$3(opts);
    return opts
  }
  let { paths, censor = CENSOR$1, remove } = opts;
  if (Array.isArray(paths) === false) { throw Error('pino – redact must contain an array of strings') }
  if (remove === true) censor = undefined;
  validate$3({ paths, censor });

  return { paths, censor }
}

var redaction_1$1 = redaction$5;

const nullTime$3 = () => '';

const epochTime$3 = () => `,"time":${Date.now()}`;

const unixTime$1 = () => `,"time":${Math.round(Date.now() / 1000.0)}`;

const isoTime$1 = () => `,"time":"${new Date(Date.now()).toISOString()}"`; // using Date.now() for testability

var time$4 = { nullTime: nullTime$3, epochTime: epochTime$3, unixTime: unixTime$1, isoTime: isoTime$1 };

// You may be tempted to copy and paste this, 
// but take a look at the commit history first,
// this is a moving target so relying on the module
// is the best way to make sure the optimization
// method is kept up to date and compatible with
// every Node version.

function flatstr$2 (s) {
  return s
}

var flatstr_1 = flatstr$2;

var atomicSleepExports = {};
var atomicSleep = {
  get exports(){ return atomicSleepExports; },
  set exports(v){ atomicSleepExports = v; },
};

/* global SharedArrayBuffer, Atomics */

if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
  const nil = new Int32Array(new SharedArrayBuffer(4));

  function sleep (ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity; 
    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number')
      }
      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
    }

    Atomics.wait(nil, 0, 0, Number(ms));
  }
  atomicSleep.exports = sleep;
} else {

  function sleep (ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity; 
    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number')
      }
      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
    }
  }

  atomicSleep.exports = sleep;

}

const fs$k = require$$0$e;
const EventEmitter$5 = require$$0$f;
const inherits$3 = require$$1$7.inherits;

const BUSY_WRITE_TIMEOUT$1 = 100;

const sleep$2 = atomicSleepExports;

// 16 MB - magic number
// This constant ensures that SonicBoom only needs
// 32 MB of free memory to run. In case of having 1GB+
// of data to write, this prevents an out of memory
// condition.
const MAX_WRITE$1 = 16 * 1024 * 1024;

function openFile$1 (file, sonic) {
  sonic._opening = true;
  sonic._writing = true;
  sonic._asyncDrainScheduled = false;

  // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
  // for sync mode, there is no way to add a listener that will receive these

  function fileOpened (err, fd) {
    if (err) {
      sonic._reopening = false;
      sonic._writing = false;
      sonic._opening = false;

      if (sonic.sync) {
        process.nextTick(() => {
          if (sonic.listenerCount('error') > 0) {
            sonic.emit('error', err);
          }
        });
      } else {
        sonic.emit('error', err);
      }
      return
    }

    sonic.fd = fd;
    sonic.file = file;
    sonic._reopening = false;
    sonic._opening = false;
    sonic._writing = false;

    if (sonic.sync) {
      process.nextTick(() => sonic.emit('ready'));
    } else {
      sonic.emit('ready');
    }

    if (sonic._reopening) {
      return
    }

    // start
    const len = sonic._buf.length;
    if (len > 0 && len > sonic.minLength && !sonic.destroyed) {
      actualWrite$1(sonic);
    }
  }

  if (sonic.sync) {
    try {
      const fd = fs$k.openSync(file, 'a');
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err
    }
  } else {
    fs$k.open(file, 'a', fileOpened);
  }
}

function SonicBoom$4 (opts) {
  if (!(this instanceof SonicBoom$4)) {
    return new SonicBoom$4(opts)
  }

  let { fd, dest, minLength, sync } = opts || {};

  fd = fd || dest;

  this._buf = '';
  this.fd = -1;
  this._writing = false;
  this._writingBuf = '';
  this._ending = false;
  this._reopening = false;
  this._asyncDrainScheduled = false;
  this.file = null;
  this.destroyed = false;
  this.sync = sync || false;

  this.minLength = minLength || 0;

  if (typeof fd === 'number') {
    this.fd = fd;
    process.nextTick(() => this.emit('ready'));
  } else if (typeof fd === 'string') {
    openFile$1(fd, this);
  } else {
    throw new Error('SonicBoom supports only file descriptors and files')
  }

  this.release = (err, n) => {
    if (err) {
      if (err.code === 'EAGAIN') {
        if (this.sync) {
          // This error code should not happen in sync mode, because it is
          // not using the underlining operating system asynchronous functions.
          // However it happens, and so we handle it.
          // Ref: https://github.com/pinojs/pino/issues/783
          try {
            sleep$2(BUSY_WRITE_TIMEOUT$1);
            this.release(undefined, 0);
          } catch (err) {
            this.release(err);
          }
        } else {
          // Let's give the destination some time to process the chunk.
          setTimeout(() => {
            fs$k.write(this.fd, this._writingBuf, 'utf8', this.release);
          }, BUSY_WRITE_TIMEOUT$1);
        }
      } else {
        // The error maybe recoverable later, so just put data back to this._buf
        this._buf = this._writingBuf + this._buf;
        this._writingBuf = '';
        this._writing = false;

        this.emit('error', err);
      }
      return
    }

    if (this._writingBuf.length !== n) {
      this._writingBuf = this._writingBuf.slice(n);
      if (this.sync) {
        try {
          do {
            n = fs$k.writeSync(this.fd, this._writingBuf, 'utf8');
            this._writingBuf = this._writingBuf.slice(n);
          } while (this._writingBuf.length !== 0)
        } catch (err) {
          this.release(err);
          return
        }
      } else {
        fs$k.write(this.fd, this._writingBuf, 'utf8', this.release);
        return
      }
    }

    this._writingBuf = '';

    if (this.destroyed) {
      return
    }

    const len = this._buf.length;
    if (this._reopening) {
      this._writing = false;
      this._reopening = false;
      this.reopen();
    } else if (len > 0 && len > this.minLength) {
      actualWrite$1(this);
    } else if (this._ending) {
      if (len > 0) {
        actualWrite$1(this);
      } else {
        this._writing = false;
        actualClose$1(this);
      }
    } else {
      this._writing = false;
      if (this.sync) {
        if (!this._asyncDrainScheduled) {
          this._asyncDrainScheduled = true;
          process.nextTick(emitDrain$1, this);
        }
      } else {
        this.emit('drain');
      }
    }
  };

  this.on('newListener', function (name) {
    if (name === 'drain') {
      this._asyncDrainScheduled = false;
    }
  });
}

function emitDrain$1 (sonic) {
  const hasListeners = sonic.listenerCount('drain') > 0;
  if (!hasListeners) return
  sonic._asyncDrainScheduled = false;
  sonic.emit('drain');
}

inherits$3(SonicBoom$4, EventEmitter$5);

SonicBoom$4.prototype.write = function (data) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  this._buf += data;
  const len = this._buf.length;
  if (!this._writing && len > this.minLength) {
    actualWrite$1(this);
  }
  return len < 16384
};

SonicBoom$4.prototype.flush = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._writing || this.minLength <= 0) {
    return
  }

  actualWrite$1(this);
};

SonicBoom$4.prototype.reopen = function (file) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._opening) {
    this.once('ready', () => {
      this.reopen(file);
    });
    return
  }

  if (this._ending) {
    return
  }

  if (!this.file) {
    throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom')
  }

  this._reopening = true;

  if (this._writing) {
    return
  }

  const fd = this.fd;
  this.once('ready', () => {
    if (fd !== this.fd) {
      fs$k.close(fd, (err) => {
        if (err) {
          return this.emit('error', err)
        }
      });
    }
  });

  openFile$1(file || this.file, this);
};

SonicBoom$4.prototype.end = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._opening) {
    this.once('ready', () => {
      this.end();
    });
    return
  }

  if (this._ending) {
    return
  }

  this._ending = true;

  if (!this._writing && this._buf.length > 0 && this.fd >= 0) {
    actualWrite$1(this);
    return
  }

  if (this._writing) {
    return
  }

  actualClose$1(this);
};

SonicBoom$4.prototype.flushSync = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet')
  }

  while (this._buf.length > 0) {
    try {
      fs$k.writeSync(this.fd, this._buf, 'utf8');
      this._buf = '';
    } catch (err) {
      if (err.code !== 'EAGAIN') {
        throw err
      }

      sleep$2(BUSY_WRITE_TIMEOUT$1);
    }
  }
};

SonicBoom$4.prototype.destroy = function () {
  if (this.destroyed) {
    return
  }
  actualClose$1(this);
};

function actualWrite$1 (sonic) {
  sonic._writing = true;
  let buf = sonic._buf;
  const release = sonic.release;
  if (buf.length > MAX_WRITE$1) {
    buf = buf.slice(0, MAX_WRITE$1);
    sonic._buf = sonic._buf.slice(MAX_WRITE$1);
  } else {
    sonic._buf = '';
  }
  sonic._writingBuf = buf;
  if (sonic.sync) {
    try {
      const written = fs$k.writeSync(sonic.fd, buf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs$k.write(sonic.fd, buf, 'utf8', release);
  }
}

function actualClose$1 (sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose$1.bind(null, sonic));
    return
  }
  // TODO write a test to check if we are not leaking fds
  fs$k.close(sonic.fd, (err) => {
    if (err) {
      sonic.emit('error', err);
      return
    }

    if (sonic._ending && !sonic._writing) {
      sonic.emit('finish');
    }
    sonic.emit('close');
  });
  sonic.destroyed = true;
  sonic._buf = '';
}

var sonicBoom$1 = SonicBoom$4;

const { format: format$7 } = require$$1$7;

function build () {
  const codes = {};
  const emitted = new Map();

  function create (name, code, message) {
    if (!name) throw new Error('Warning name must not be empty')
    if (!code) throw new Error('Warning code must not be empty')
    if (!message) throw new Error('Warning message must not be empty')

    code = code.toUpperCase();

    if (codes[code] !== undefined) {
      throw new Error(`The code '${code}' already exist`)
    }

    function buildWarnOpts (a, b, c) {
      // more performant than spread (...) operator
      let formatted;
      if (a && b && c) {
        formatted = format$7(message, a, b, c);
      } else if (a && b) {
        formatted = format$7(message, a, b);
      } else if (a) {
        formatted = format$7(message, a);
      } else {
        formatted = message;
      }

      return {
        code,
        name,
        message: formatted
      }
    }

    emitted.set(code, false);
    codes[code] = buildWarnOpts;

    return codes[code]
  }

  function emit (code, a, b, c) {
    if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`)
    if (emitted.get(code) === true) return
    emitted.set(code, true);

    const warning = codes[code](a, b, c);
    process.emitWarning(warning.message, warning.name, warning.code);
  }

  return {
    create,
    emit,
    emitted
  }
}

var processWarning = build;

const warning$1 = processWarning();
var deprecations = warning$1;

const warnName = 'PinoWarning';

warning$1.create(warnName, 'PINODEP004', 'bindings.serializers is deprecated, use options.serializers option instead');

warning$1.create(warnName, 'PINODEP005', 'bindings.formatters is deprecated, use options.formatters option instead');

warning$1.create(warnName, 'PINODEP006', 'bindings.customLevels is deprecated, use options.customLevels option instead');

warning$1.create(warnName, 'PINODEP007', 'bindings.level is deprecated, use options.level option instead');

function tryStringify (o) {
  try { return JSON.stringify(o) } catch(e) { return '"[Circular]"' }
}

var quickFormatUnescaped = format$6;

function format$6(f, args, opts) {
  var ss = (opts && opts.stringify) || tryStringify;
  var offset = 1;
  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset;
    if (len === 1) return f
    var objects = new Array(len);
    objects[0] = ss(f);
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index]);
    }
    return objects.join(' ')
  }
  if (typeof f !== 'string') {
    return f
  }
  var argLen = args.length;
  if (argLen === 0) return f
  var str = '';
  var a = 1 - offset;
  var lastPos = -1;
  var flen = (f && f.length) || 0;
  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0;
      switch (f.charCodeAt(i + 1)) {
        case 100: // 'd'
        case 102: // 'f'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += Number(args[a]);
          lastPos = i + 2;
          i++;
          break
        case 105: // 'i'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += Math.floor(Number(args[a]));
          lastPos = i + 2;
          i++;
          break
        case 79: // 'O'
        case 111: // 'o'
        case 106: // 'j'
          if (a >= argLen)
            break
          if (args[a] === undefined) break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          var type = typeof args[a];
          if (type === 'string') {
            str += '\'' + args[a] + '\'';
            lastPos = i + 2;
            i++;
            break
          }
          if (type === 'function') {
            str += args[a].name || '<anonymous>';
            lastPos = i + 2;
            i++;
            break
          }
          str += ss(args[a]);
          lastPos = i + 2;
          i++;
          break
        case 115: // 's'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += String(args[a]);
          lastPos = i + 2;
          i++;
          break
        case 37: // '%'
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += '%';
          lastPos = i + 2;
          i++;
          a--;
          break
      }
      ++a;
    }
    ++i;
  }
  if (lastPos === -1)
    return f
  else if (lastPos < flen) {
    str += f.slice(lastPos);
  }

  return str
}

var fastSafeStringify = stringify$b;
stringify$b.default = stringify$b;
stringify$b.stable = deterministicStringify;
stringify$b.stableStringify = deterministicStringify;

var LIMIT_REPLACE_NODE = '[...]';
var CIRCULAR_REPLACE_NODE = '[Circular]';

var arr = [];
var replacerStack = [];

function defaultOptions$5 () {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  }
}

// Regular stringify
function stringify$b (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions$5();
  }

  decirc(obj, '', 0, [], undefined, 0, options);
  var res;
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer);
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop();
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else {
        part[0][part[1]] = part[2];
      }
    }
  }
  return res
}

function setReplace (replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace });
      arr.push([parent, k, val, propertyDescriptor]);
    } else {
      replacerStack.push([val, k, replace]);
    }
  } else {
    parent[k] = replace;
    arr.push([parent, k, val]);
  }
}

function decirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return
      }
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return
    }

    stack.push(val);
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      var keys = Object.keys(val);
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, i, stack, val, depth, options);
      }
    }
    stack.pop();
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions$5();
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj;
  var res;
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer);
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop();
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else {
        part[0][part[1]] = part[2];
      }
    }
  }
  return res
}

function deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return
      }
    }
    try {
      if (typeof val.toJSON === 'function') {
        return
      }
    } catch (_) {
      return
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return
    }

    stack.push(val);
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {};
      var keys = Object.keys(val).sort(compareFunction);
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        deterministicDecirc(val[key], key, i, stack, val, depth, options);
        tmp[key] = val[key];
      }
      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val]);
        parent[k] = tmp;
      } else {
        return tmp
      }
    }
    stack.pop();
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues (replacer) {
  replacer =
    typeof replacer !== 'undefined'
      ? replacer
      : function (k, v) {
        return v
      };
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i];
        if (part[1] === key && part[0] === val) {
          val = part[2];
          replacerStack.splice(i, 1);
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}

var colorette$1 = {};

const tty$2 = require$$0$g;

const env = process.env;

const isDisabled = "NO_COLOR" in env;
const isForced = "FORCE_COLOR" in env;
const isWindows$2 = process.platform === "win32";

const isCompatibleTerminal =
  tty$2 && tty$2.isatty(1) && env.TERM && env.TERM !== "dumb";

const isCI =
  "CI" in env &&
  ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);

let enabled =
  !isDisabled && (isForced || isWindows$2 || isCompatibleTerminal || isCI);

const raw$1 = (open, close, searchRegex, replaceValue) => (s) =>
  enabled
    ? open +
      (~(s += "").indexOf(close, 4) // skip opening \x1b[
        ? s.replace(searchRegex, replaceValue)
        : s) +
      close
    : s;

const init$2 = (open, close) => {
  return raw$1(
    `\x1b[${open}m`,
    `\x1b[${close}m`,
    new RegExp(`\\x1b\\[${close}m`, "g"),
    `\x1b[${open}m`
  )
};

colorette$1.options = Object.defineProperty({}, "enabled", {
  get: () => enabled,
  set: (value) => (enabled = value),
});

colorette$1.reset = init$2(0, 0);
colorette$1.bold = raw$1("\x1b[1m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[1m");
colorette$1.dim = raw$1("\x1b[2m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[2m");
colorette$1.italic = init$2(3, 23);
colorette$1.underline = init$2(4, 24);
colorette$1.inverse = init$2(7, 27);
colorette$1.hidden = init$2(8, 28);
colorette$1.strikethrough = init$2(9, 29);
colorette$1.black = init$2(30, 39);
colorette$1.red = init$2(31, 39);
colorette$1.green = init$2(32, 39);
colorette$1.yellow = init$2(33, 39);
colorette$1.blue = init$2(34, 39);
colorette$1.magenta = init$2(35, 39);
colorette$1.cyan = init$2(36, 39);
colorette$1.white = init$2(37, 39);
colorette$1.gray = init$2(90, 39);
colorette$1.bgBlack = init$2(40, 49);
colorette$1.bgRed = init$2(41, 49);
colorette$1.bgGreen = init$2(42, 49);
colorette$1.bgYellow = init$2(43, 49);
colorette$1.bgBlue = init$2(44, 49);
colorette$1.bgMagenta = init$2(45, 49);
colorette$1.bgCyan = init$2(46, 49);
colorette$1.bgWhite = init$2(47, 49);
colorette$1.blackBright = init$2(90, 39);
colorette$1.redBright = init$2(91, 39);
colorette$1.greenBright = init$2(92, 39);
colorette$1.yellowBright = init$2(93, 39);
colorette$1.blueBright = init$2(94, 39);
colorette$1.magentaBright = init$2(95, 39);
colorette$1.cyanBright = init$2(96, 39);
colorette$1.whiteBright = init$2(97, 39);
colorette$1.bgBlackBright = init$2(100, 49);
colorette$1.bgRedBright = init$2(101, 49);
colorette$1.bgGreenBright = init$2(102, 49);
colorette$1.bgYellowBright = init$2(103, 49);
colorette$1.bgBlueBright = init$2(104, 49);
colorette$1.bgMagentaBright = init$2(105, 49);
colorette$1.bgCyanBright = init$2(106, 49);
colorette$1.bgWhiteBright = init$2(107, 49);

var jmespath$1 = {};

(function (exports) {
	(function(exports) {

	  function isArray(obj) {
	    if (obj !== null) {
	      return Object.prototype.toString.call(obj) === "[object Array]";
	    } else {
	      return false;
	    }
	  }

	  function isObject(obj) {
	    if (obj !== null) {
	      return Object.prototype.toString.call(obj) === "[object Object]";
	    } else {
	      return false;
	    }
	  }

	  function strictDeepEqual(first, second) {
	    // Check the scalar case first.
	    if (first === second) {
	      return true;
	    }

	    // Check if they are the same type.
	    var firstType = Object.prototype.toString.call(first);
	    if (firstType !== Object.prototype.toString.call(second)) {
	      return false;
	    }
	    // We know that first and second have the same type so we can just check the
	    // first type from now on.
	    if (isArray(first) === true) {
	      // Short circuit if they're not the same length;
	      if (first.length !== second.length) {
	        return false;
	      }
	      for (var i = 0; i < first.length; i++) {
	        if (strictDeepEqual(first[i], second[i]) === false) {
	          return false;
	        }
	      }
	      return true;
	    }
	    if (isObject(first) === true) {
	      // An object is equal if it has the same key/value pairs.
	      var keysSeen = {};
	      for (var key in first) {
	        if (hasOwnProperty.call(first, key)) {
	          if (strictDeepEqual(first[key], second[key]) === false) {
	            return false;
	          }
	          keysSeen[key] = true;
	        }
	      }
	      // Now check that there aren't any keys in second that weren't
	      // in first.
	      for (var key2 in second) {
	        if (hasOwnProperty.call(second, key2)) {
	          if (keysSeen[key2] !== true) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	    return false;
	  }

	  function isFalse(obj) {
	    // From the spec:
	    // A false value corresponds to the following values:
	    // Empty list
	    // Empty object
	    // Empty string
	    // False boolean
	    // null value

	    // First check the scalar values.
	    if (obj === "" || obj === false || obj === null) {
	        return true;
	    } else if (isArray(obj) && obj.length === 0) {
	        // Check for an empty array.
	        return true;
	    } else if (isObject(obj)) {
	        // Check for an empty object.
	        for (var key in obj) {
	            // If there are any keys, then
	            // the object is not empty so the object
	            // is not false.
	            if (obj.hasOwnProperty(key)) {
	              return false;
	            }
	        }
	        return true;
	    } else {
	        return false;
	    }
	  }

	  function objValues(obj) {
	    var keys = Object.keys(obj);
	    var values = [];
	    for (var i = 0; i < keys.length; i++) {
	      values.push(obj[keys[i]]);
	    }
	    return values;
	  }

	  var trimLeft;
	  if (typeof String.prototype.trimLeft === "function") {
	    trimLeft = function(str) {
	      return str.trimLeft();
	    };
	  } else {
	    trimLeft = function(str) {
	      return str.match(/^\s*(.*)/)[1];
	    };
	  }

	  // Type constants used to define functions.
	  var TYPE_NUMBER = 0;
	  var TYPE_ANY = 1;
	  var TYPE_STRING = 2;
	  var TYPE_ARRAY = 3;
	  var TYPE_OBJECT = 4;
	  var TYPE_BOOLEAN = 5;
	  var TYPE_EXPREF = 6;
	  var TYPE_NULL = 7;
	  var TYPE_ARRAY_NUMBER = 8;
	  var TYPE_ARRAY_STRING = 9;

	  var TOK_EOF = "EOF";
	  var TOK_UNQUOTEDIDENTIFIER = "UnquotedIdentifier";
	  var TOK_QUOTEDIDENTIFIER = "QuotedIdentifier";
	  var TOK_RBRACKET = "Rbracket";
	  var TOK_RPAREN = "Rparen";
	  var TOK_COMMA = "Comma";
	  var TOK_COLON = "Colon";
	  var TOK_RBRACE = "Rbrace";
	  var TOK_NUMBER = "Number";
	  var TOK_CURRENT = "Current";
	  var TOK_EXPREF = "Expref";
	  var TOK_PIPE = "Pipe";
	  var TOK_OR = "Or";
	  var TOK_AND = "And";
	  var TOK_EQ = "EQ";
	  var TOK_GT = "GT";
	  var TOK_LT = "LT";
	  var TOK_GTE = "GTE";
	  var TOK_LTE = "LTE";
	  var TOK_NE = "NE";
	  var TOK_FLATTEN = "Flatten";
	  var TOK_STAR = "Star";
	  var TOK_FILTER = "Filter";
	  var TOK_DOT = "Dot";
	  var TOK_NOT = "Not";
	  var TOK_LBRACE = "Lbrace";
	  var TOK_LBRACKET = "Lbracket";
	  var TOK_LPAREN= "Lparen";
	  var TOK_LITERAL= "Literal";

	  // The "&", "[", "<", ">" tokens
	  // are not in basicToken because
	  // there are two token variants
	  // ("&&", "[?", "<=", ">=").  This is specially handled
	  // below.

	  var basicTokens = {
	    ".": TOK_DOT,
	    "*": TOK_STAR,
	    ",": TOK_COMMA,
	    ":": TOK_COLON,
	    "{": TOK_LBRACE,
	    "}": TOK_RBRACE,
	    "]": TOK_RBRACKET,
	    "(": TOK_LPAREN,
	    ")": TOK_RPAREN,
	    "@": TOK_CURRENT
	  };

	  var operatorStartToken = {
	      "<": true,
	      ">": true,
	      "=": true,
	      "!": true
	  };

	  var skipChars = {
	      " ": true,
	      "\t": true,
	      "\n": true
	  };


	  function isAlpha(ch) {
	      return (ch >= "a" && ch <= "z") ||
	             (ch >= "A" && ch <= "Z") ||
	             ch === "_";
	  }

	  function isNum(ch) {
	      return (ch >= "0" && ch <= "9") ||
	             ch === "-";
	  }
	  function isAlphaNum(ch) {
	      return (ch >= "a" && ch <= "z") ||
	             (ch >= "A" && ch <= "Z") ||
	             (ch >= "0" && ch <= "9") ||
	             ch === "_";
	  }

	  function Lexer() {
	  }
	  Lexer.prototype = {
	      tokenize: function(stream) {
	          var tokens = [];
	          this._current = 0;
	          var start;
	          var identifier;
	          var token;
	          while (this._current < stream.length) {
	              if (isAlpha(stream[this._current])) {
	                  start = this._current;
	                  identifier = this._consumeUnquotedIdentifier(stream);
	                  tokens.push({type: TOK_UNQUOTEDIDENTIFIER,
	                               value: identifier,
	                               start: start});
	              } else if (basicTokens[stream[this._current]] !== undefined) {
	                  tokens.push({type: basicTokens[stream[this._current]],
	                              value: stream[this._current],
	                              start: this._current});
	                  this._current++;
	              } else if (isNum(stream[this._current])) {
	                  token = this._consumeNumber(stream);
	                  tokens.push(token);
	              } else if (stream[this._current] === "[") {
	                  // No need to increment this._current.  This happens
	                  // in _consumeLBracket
	                  token = this._consumeLBracket(stream);
	                  tokens.push(token);
	              } else if (stream[this._current] === "\"") {
	                  start = this._current;
	                  identifier = this._consumeQuotedIdentifier(stream);
	                  tokens.push({type: TOK_QUOTEDIDENTIFIER,
	                               value: identifier,
	                               start: start});
	              } else if (stream[this._current] === "'") {
	                  start = this._current;
	                  identifier = this._consumeRawStringLiteral(stream);
	                  tokens.push({type: TOK_LITERAL,
	                               value: identifier,
	                               start: start});
	              } else if (stream[this._current] === "`") {
	                  start = this._current;
	                  var literal = this._consumeLiteral(stream);
	                  tokens.push({type: TOK_LITERAL,
	                               value: literal,
	                               start: start});
	              } else if (operatorStartToken[stream[this._current]] !== undefined) {
	                  tokens.push(this._consumeOperator(stream));
	              } else if (skipChars[stream[this._current]] !== undefined) {
	                  // Ignore whitespace.
	                  this._current++;
	              } else if (stream[this._current] === "&") {
	                  start = this._current;
	                  this._current++;
	                  if (stream[this._current] === "&") {
	                      this._current++;
	                      tokens.push({type: TOK_AND, value: "&&", start: start});
	                  } else {
	                      tokens.push({type: TOK_EXPREF, value: "&", start: start});
	                  }
	              } else if (stream[this._current] === "|") {
	                  start = this._current;
	                  this._current++;
	                  if (stream[this._current] === "|") {
	                      this._current++;
	                      tokens.push({type: TOK_OR, value: "||", start: start});
	                  } else {
	                      tokens.push({type: TOK_PIPE, value: "|", start: start});
	                  }
	              } else {
	                  var error = new Error("Unknown character:" + stream[this._current]);
	                  error.name = "LexerError";
	                  throw error;
	              }
	          }
	          return tokens;
	      },

	      _consumeUnquotedIdentifier: function(stream) {
	          var start = this._current;
	          this._current++;
	          while (this._current < stream.length && isAlphaNum(stream[this._current])) {
	              this._current++;
	          }
	          return stream.slice(start, this._current);
	      },

	      _consumeQuotedIdentifier: function(stream) {
	          var start = this._current;
	          this._current++;
	          var maxLength = stream.length;
	          while (stream[this._current] !== "\"" && this._current < maxLength) {
	              // You can escape a double quote and you can escape an escape.
	              var current = this._current;
	              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
	                                               stream[current + 1] === "\"")) {
	                  current += 2;
	              } else {
	                  current++;
	              }
	              this._current = current;
	          }
	          this._current++;
	          return JSON.parse(stream.slice(start, this._current));
	      },

	      _consumeRawStringLiteral: function(stream) {
	          var start = this._current;
	          this._current++;
	          var maxLength = stream.length;
	          while (stream[this._current] !== "'" && this._current < maxLength) {
	              // You can escape a single quote and you can escape an escape.
	              var current = this._current;
	              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
	                                               stream[current + 1] === "'")) {
	                  current += 2;
	              } else {
	                  current++;
	              }
	              this._current = current;
	          }
	          this._current++;
	          var literal = stream.slice(start + 1, this._current - 1);
	          return literal.replace("\\'", "'");
	      },

	      _consumeNumber: function(stream) {
	          var start = this._current;
	          this._current++;
	          var maxLength = stream.length;
	          while (isNum(stream[this._current]) && this._current < maxLength) {
	              this._current++;
	          }
	          var value = parseInt(stream.slice(start, this._current));
	          return {type: TOK_NUMBER, value: value, start: start};
	      },

	      _consumeLBracket: function(stream) {
	          var start = this._current;
	          this._current++;
	          if (stream[this._current] === "?") {
	              this._current++;
	              return {type: TOK_FILTER, value: "[?", start: start};
	          } else if (stream[this._current] === "]") {
	              this._current++;
	              return {type: TOK_FLATTEN, value: "[]", start: start};
	          } else {
	              return {type: TOK_LBRACKET, value: "[", start: start};
	          }
	      },

	      _consumeOperator: function(stream) {
	          var start = this._current;
	          var startingChar = stream[start];
	          this._current++;
	          if (startingChar === "!") {
	              if (stream[this._current] === "=") {
	                  this._current++;
	                  return {type: TOK_NE, value: "!=", start: start};
	              } else {
	                return {type: TOK_NOT, value: "!", start: start};
	              }
	          } else if (startingChar === "<") {
	              if (stream[this._current] === "=") {
	                  this._current++;
	                  return {type: TOK_LTE, value: "<=", start: start};
	              } else {
	                  return {type: TOK_LT, value: "<", start: start};
	              }
	          } else if (startingChar === ">") {
	              if (stream[this._current] === "=") {
	                  this._current++;
	                  return {type: TOK_GTE, value: ">=", start: start};
	              } else {
	                  return {type: TOK_GT, value: ">", start: start};
	              }
	          } else if (startingChar === "=") {
	              if (stream[this._current] === "=") {
	                  this._current++;
	                  return {type: TOK_EQ, value: "==", start: start};
	              }
	          }
	      },

	      _consumeLiteral: function(stream) {
	          this._current++;
	          var start = this._current;
	          var maxLength = stream.length;
	          var literal;
	          while(stream[this._current] !== "`" && this._current < maxLength) {
	              // You can escape a literal char or you can escape the escape.
	              var current = this._current;
	              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
	                                               stream[current + 1] === "`")) {
	                  current += 2;
	              } else {
	                  current++;
	              }
	              this._current = current;
	          }
	          var literalString = trimLeft(stream.slice(start, this._current));
	          literalString = literalString.replace("\\`", "`");
	          if (this._looksLikeJSON(literalString)) {
	              literal = JSON.parse(literalString);
	          } else {
	              // Try to JSON parse it as "<literal>"
	              literal = JSON.parse("\"" + literalString + "\"");
	          }
	          // +1 gets us to the ending "`", +1 to move on to the next char.
	          this._current++;
	          return literal;
	      },

	      _looksLikeJSON: function(literalString) {
	          var startingChars = "[{\"";
	          var jsonLiterals = ["true", "false", "null"];
	          var numberLooking = "-0123456789";

	          if (literalString === "") {
	              return false;
	          } else if (startingChars.indexOf(literalString[0]) >= 0) {
	              return true;
	          } else if (jsonLiterals.indexOf(literalString) >= 0) {
	              return true;
	          } else if (numberLooking.indexOf(literalString[0]) >= 0) {
	              try {
	                  JSON.parse(literalString);
	                  return true;
	              } catch (ex) {
	                  return false;
	              }
	          } else {
	              return false;
	          }
	      }
	  };

	      var bindingPower = {};
	      bindingPower[TOK_EOF] = 0;
	      bindingPower[TOK_UNQUOTEDIDENTIFIER] = 0;
	      bindingPower[TOK_QUOTEDIDENTIFIER] = 0;
	      bindingPower[TOK_RBRACKET] = 0;
	      bindingPower[TOK_RPAREN] = 0;
	      bindingPower[TOK_COMMA] = 0;
	      bindingPower[TOK_RBRACE] = 0;
	      bindingPower[TOK_NUMBER] = 0;
	      bindingPower[TOK_CURRENT] = 0;
	      bindingPower[TOK_EXPREF] = 0;
	      bindingPower[TOK_PIPE] = 1;
	      bindingPower[TOK_OR] = 2;
	      bindingPower[TOK_AND] = 3;
	      bindingPower[TOK_EQ] = 5;
	      bindingPower[TOK_GT] = 5;
	      bindingPower[TOK_LT] = 5;
	      bindingPower[TOK_GTE] = 5;
	      bindingPower[TOK_LTE] = 5;
	      bindingPower[TOK_NE] = 5;
	      bindingPower[TOK_FLATTEN] = 9;
	      bindingPower[TOK_STAR] = 20;
	      bindingPower[TOK_FILTER] = 21;
	      bindingPower[TOK_DOT] = 40;
	      bindingPower[TOK_NOT] = 45;
	      bindingPower[TOK_LBRACE] = 50;
	      bindingPower[TOK_LBRACKET] = 55;
	      bindingPower[TOK_LPAREN] = 60;

	  function Parser() {
	  }

	  Parser.prototype = {
	      parse: function(expression) {
	          this._loadTokens(expression);
	          this.index = 0;
	          var ast = this.expression(0);
	          if (this._lookahead(0) !== TOK_EOF) {
	              var t = this._lookaheadToken(0);
	              var error = new Error(
	                  "Unexpected token type: " + t.type + ", value: " + t.value);
	              error.name = "ParserError";
	              throw error;
	          }
	          return ast;
	      },

	      _loadTokens: function(expression) {
	          var lexer = new Lexer();
	          var tokens = lexer.tokenize(expression);
	          tokens.push({type: TOK_EOF, value: "", start: expression.length});
	          this.tokens = tokens;
	      },

	      expression: function(rbp) {
	          var leftToken = this._lookaheadToken(0);
	          this._advance();
	          var left = this.nud(leftToken);
	          var currentToken = this._lookahead(0);
	          while (rbp < bindingPower[currentToken]) {
	              this._advance();
	              left = this.led(currentToken, left);
	              currentToken = this._lookahead(0);
	          }
	          return left;
	      },

	      _lookahead: function(number) {
	          return this.tokens[this.index + number].type;
	      },

	      _lookaheadToken: function(number) {
	          return this.tokens[this.index + number];
	      },

	      _advance: function() {
	          this.index++;
	      },

	      nud: function(token) {
	        var left;
	        var right;
	        var expression;
	        switch (token.type) {
	          case TOK_LITERAL:
	            return {type: "Literal", value: token.value};
	          case TOK_UNQUOTEDIDENTIFIER:
	            return {type: "Field", name: token.value};
	          case TOK_QUOTEDIDENTIFIER:
	            var node = {type: "Field", name: token.value};
	            if (this._lookahead(0) === TOK_LPAREN) {
	                throw new Error("Quoted identifier not allowed for function names.");
	            } else {
	                return node;
	            }
	          case TOK_NOT:
	            right = this.expression(bindingPower.Not);
	            return {type: "NotExpression", children: [right]};
	          case TOK_STAR:
	            left = {type: "Identity"};
	            right = null;
	            if (this._lookahead(0) === TOK_RBRACKET) {
	                // This can happen in a multiselect,
	                // [a, b, *]
	                right = {type: "Identity"};
	            } else {
	                right = this._parseProjectionRHS(bindingPower.Star);
	            }
	            return {type: "ValueProjection", children: [left, right]};
	          case TOK_FILTER:
	            return this.led(token.type, {type: "Identity"});
	          case TOK_LBRACE:
	            return this._parseMultiselectHash();
	          case TOK_FLATTEN:
	            left = {type: TOK_FLATTEN, children: [{type: "Identity"}]};
	            right = this._parseProjectionRHS(bindingPower.Flatten);
	            return {type: "Projection", children: [left, right]};
	          case TOK_LBRACKET:
	            if (this._lookahead(0) === TOK_NUMBER || this._lookahead(0) === TOK_COLON) {
	                right = this._parseIndexExpression();
	                return this._projectIfSlice({type: "Identity"}, right);
	            } else if (this._lookahead(0) === TOK_STAR &&
	                       this._lookahead(1) === TOK_RBRACKET) {
	                this._advance();
	                this._advance();
	                right = this._parseProjectionRHS(bindingPower.Star);
	                return {type: "Projection",
	                        children: [{type: "Identity"}, right]};
	            } else {
	                return this._parseMultiselectList();
	            }
	          case TOK_CURRENT:
	            return {type: TOK_CURRENT};
	          case TOK_EXPREF:
	            expression = this.expression(bindingPower.Expref);
	            return {type: "ExpressionReference", children: [expression]};
	          case TOK_LPAREN:
	            var args = [];
	            while (this._lookahead(0) !== TOK_RPAREN) {
	              if (this._lookahead(0) === TOK_CURRENT) {
	                expression = {type: TOK_CURRENT};
	                this._advance();
	              } else {
	                expression = this.expression(0);
	              }
	              args.push(expression);
	            }
	            this._match(TOK_RPAREN);
	            return args[0];
	          default:
	            this._errorToken(token);
	        }
	      },

	      led: function(tokenName, left) {
	        var right;
	        switch(tokenName) {
	          case TOK_DOT:
	            var rbp = bindingPower.Dot;
	            if (this._lookahead(0) !== TOK_STAR) {
	                right = this._parseDotRHS(rbp);
	                return {type: "Subexpression", children: [left, right]};
	            } else {
	                // Creating a projection.
	                this._advance();
	                right = this._parseProjectionRHS(rbp);
	                return {type: "ValueProjection", children: [left, right]};
	            }
	          case TOK_PIPE:
	            right = this.expression(bindingPower.Pipe);
	            return {type: TOK_PIPE, children: [left, right]};
	          case TOK_OR:
	            right = this.expression(bindingPower.Or);
	            return {type: "OrExpression", children: [left, right]};
	          case TOK_AND:
	            right = this.expression(bindingPower.And);
	            return {type: "AndExpression", children: [left, right]};
	          case TOK_LPAREN:
	            var name = left.name;
	            var args = [];
	            var expression, node;
	            while (this._lookahead(0) !== TOK_RPAREN) {
	              if (this._lookahead(0) === TOK_CURRENT) {
	                expression = {type: TOK_CURRENT};
	                this._advance();
	              } else {
	                expression = this.expression(0);
	              }
	              if (this._lookahead(0) === TOK_COMMA) {
	                this._match(TOK_COMMA);
	              }
	              args.push(expression);
	            }
	            this._match(TOK_RPAREN);
	            node = {type: "Function", name: name, children: args};
	            return node;
	          case TOK_FILTER:
	            var condition = this.expression(0);
	            this._match(TOK_RBRACKET);
	            if (this._lookahead(0) === TOK_FLATTEN) {
	              right = {type: "Identity"};
	            } else {
	              right = this._parseProjectionRHS(bindingPower.Filter);
	            }
	            return {type: "FilterProjection", children: [left, right, condition]};
	          case TOK_FLATTEN:
	            var leftNode = {type: TOK_FLATTEN, children: [left]};
	            var rightNode = this._parseProjectionRHS(bindingPower.Flatten);
	            return {type: "Projection", children: [leftNode, rightNode]};
	          case TOK_EQ:
	          case TOK_NE:
	          case TOK_GT:
	          case TOK_GTE:
	          case TOK_LT:
	          case TOK_LTE:
	            return this._parseComparator(left, tokenName);
	          case TOK_LBRACKET:
	            var token = this._lookaheadToken(0);
	            if (token.type === TOK_NUMBER || token.type === TOK_COLON) {
	                right = this._parseIndexExpression();
	                return this._projectIfSlice(left, right);
	            } else {
	                this._match(TOK_STAR);
	                this._match(TOK_RBRACKET);
	                right = this._parseProjectionRHS(bindingPower.Star);
	                return {type: "Projection", children: [left, right]};
	            }
	          default:
	            this._errorToken(this._lookaheadToken(0));
	        }
	      },

	      _match: function(tokenType) {
	          if (this._lookahead(0) === tokenType) {
	              this._advance();
	          } else {
	              var t = this._lookaheadToken(0);
	              var error = new Error("Expected " + tokenType + ", got: " + t.type);
	              error.name = "ParserError";
	              throw error;
	          }
	      },

	      _errorToken: function(token) {
	          var error = new Error("Invalid token (" +
	                                token.type + "): \"" +
	                                token.value + "\"");
	          error.name = "ParserError";
	          throw error;
	      },


	      _parseIndexExpression: function() {
	          if (this._lookahead(0) === TOK_COLON || this._lookahead(1) === TOK_COLON) {
	              return this._parseSliceExpression();
	          } else {
	              var node = {
	                  type: "Index",
	                  value: this._lookaheadToken(0).value};
	              this._advance();
	              this._match(TOK_RBRACKET);
	              return node;
	          }
	      },

	      _projectIfSlice: function(left, right) {
	          var indexExpr = {type: "IndexExpression", children: [left, right]};
	          if (right.type === "Slice") {
	              return {
	                  type: "Projection",
	                  children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)]
	              };
	          } else {
	              return indexExpr;
	          }
	      },

	      _parseSliceExpression: function() {
	          // [start:end:step] where each part is optional, as well as the last
	          // colon.
	          var parts = [null, null, null];
	          var index = 0;
	          var currentToken = this._lookahead(0);
	          while (currentToken !== TOK_RBRACKET && index < 3) {
	              if (currentToken === TOK_COLON) {
	                  index++;
	                  this._advance();
	              } else if (currentToken === TOK_NUMBER) {
	                  parts[index] = this._lookaheadToken(0).value;
	                  this._advance();
	              } else {
	                  var t = this._lookahead(0);
	                  var error = new Error("Syntax error, unexpected token: " +
	                                        t.value + "(" + t.type + ")");
	                  error.name = "Parsererror";
	                  throw error;
	              }
	              currentToken = this._lookahead(0);
	          }
	          this._match(TOK_RBRACKET);
	          return {
	              type: "Slice",
	              children: parts
	          };
	      },

	      _parseComparator: function(left, comparator) {
	        var right = this.expression(bindingPower[comparator]);
	        return {type: "Comparator", name: comparator, children: [left, right]};
	      },

	      _parseDotRHS: function(rbp) {
	          var lookahead = this._lookahead(0);
	          var exprTokens = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
	          if (exprTokens.indexOf(lookahead) >= 0) {
	              return this.expression(rbp);
	          } else if (lookahead === TOK_LBRACKET) {
	              this._match(TOK_LBRACKET);
	              return this._parseMultiselectList();
	          } else if (lookahead === TOK_LBRACE) {
	              this._match(TOK_LBRACE);
	              return this._parseMultiselectHash();
	          }
	      },

	      _parseProjectionRHS: function(rbp) {
	          var right;
	          if (bindingPower[this._lookahead(0)] < 10) {
	              right = {type: "Identity"};
	          } else if (this._lookahead(0) === TOK_LBRACKET) {
	              right = this.expression(rbp);
	          } else if (this._lookahead(0) === TOK_FILTER) {
	              right = this.expression(rbp);
	          } else if (this._lookahead(0) === TOK_DOT) {
	              this._match(TOK_DOT);
	              right = this._parseDotRHS(rbp);
	          } else {
	              var t = this._lookaheadToken(0);
	              var error = new Error("Sytanx error, unexpected token: " +
	                                    t.value + "(" + t.type + ")");
	              error.name = "ParserError";
	              throw error;
	          }
	          return right;
	      },

	      _parseMultiselectList: function() {
	          var expressions = [];
	          while (this._lookahead(0) !== TOK_RBRACKET) {
	              var expression = this.expression(0);
	              expressions.push(expression);
	              if (this._lookahead(0) === TOK_COMMA) {
	                  this._match(TOK_COMMA);
	                  if (this._lookahead(0) === TOK_RBRACKET) {
	                    throw new Error("Unexpected token Rbracket");
	                  }
	              }
	          }
	          this._match(TOK_RBRACKET);
	          return {type: "MultiSelectList", children: expressions};
	      },

	      _parseMultiselectHash: function() {
	        var pairs = [];
	        var identifierTypes = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER];
	        var keyToken, keyName, value, node;
	        for (;;) {
	          keyToken = this._lookaheadToken(0);
	          if (identifierTypes.indexOf(keyToken.type) < 0) {
	            throw new Error("Expecting an identifier token, got: " +
	                            keyToken.type);
	          }
	          keyName = keyToken.value;
	          this._advance();
	          this._match(TOK_COLON);
	          value = this.expression(0);
	          node = {type: "KeyValuePair", name: keyName, value: value};
	          pairs.push(node);
	          if (this._lookahead(0) === TOK_COMMA) {
	            this._match(TOK_COMMA);
	          } else if (this._lookahead(0) === TOK_RBRACE) {
	            this._match(TOK_RBRACE);
	            break;
	          }
	        }
	        return {type: "MultiSelectHash", children: pairs};
	      }
	  };


	  function TreeInterpreter(runtime) {
	    this.runtime = runtime;
	  }

	  TreeInterpreter.prototype = {
	      search: function(node, value) {
	          return this.visit(node, value);
	      },

	      visit: function(node, value) {
	          var matched, current, result, first, second, field, left, right, collected, i;
	          switch (node.type) {
	            case "Field":
	              if (value === null ) {
	                  return null;
	              } else if (isObject(value)) {
	                  field = value[node.name];
	                  if (field === undefined) {
	                      return null;
	                  } else {
	                      return field;
	                  }
	              } else {
	                return null;
	              }
	            case "Subexpression":
	              result = this.visit(node.children[0], value);
	              for (i = 1; i < node.children.length; i++) {
	                  result = this.visit(node.children[1], result);
	                  if (result === null) {
	                      return null;
	                  }
	              }
	              return result;
	            case "IndexExpression":
	              left = this.visit(node.children[0], value);
	              right = this.visit(node.children[1], left);
	              return right;
	            case "Index":
	              if (!isArray(value)) {
	                return null;
	              }
	              var index = node.value;
	              if (index < 0) {
	                index = value.length + index;
	              }
	              result = value[index];
	              if (result === undefined) {
	                result = null;
	              }
	              return result;
	            case "Slice":
	              if (!isArray(value)) {
	                return null;
	              }
	              var sliceParams = node.children.slice(0);
	              var computed = this.computeSliceParams(value.length, sliceParams);
	              var start = computed[0];
	              var stop = computed[1];
	              var step = computed[2];
	              result = [];
	              if (step > 0) {
	                  for (i = start; i < stop; i += step) {
	                      result.push(value[i]);
	                  }
	              } else {
	                  for (i = start; i > stop; i += step) {
	                      result.push(value[i]);
	                  }
	              }
	              return result;
	            case "Projection":
	              // Evaluate left child.
	              var base = this.visit(node.children[0], value);
	              if (!isArray(base)) {
	                return null;
	              }
	              collected = [];
	              for (i = 0; i < base.length; i++) {
	                current = this.visit(node.children[1], base[i]);
	                if (current !== null) {
	                  collected.push(current);
	                }
	              }
	              return collected;
	            case "ValueProjection":
	              // Evaluate left child.
	              base = this.visit(node.children[0], value);
	              if (!isObject(base)) {
	                return null;
	              }
	              collected = [];
	              var values = objValues(base);
	              for (i = 0; i < values.length; i++) {
	                current = this.visit(node.children[1], values[i]);
	                if (current !== null) {
	                  collected.push(current);
	                }
	              }
	              return collected;
	            case "FilterProjection":
	              base = this.visit(node.children[0], value);
	              if (!isArray(base)) {
	                return null;
	              }
	              var filtered = [];
	              var finalResults = [];
	              for (i = 0; i < base.length; i++) {
	                matched = this.visit(node.children[2], base[i]);
	                if (!isFalse(matched)) {
	                  filtered.push(base[i]);
	                }
	              }
	              for (var j = 0; j < filtered.length; j++) {
	                current = this.visit(node.children[1], filtered[j]);
	                if (current !== null) {
	                  finalResults.push(current);
	                }
	              }
	              return finalResults;
	            case "Comparator":
	              first = this.visit(node.children[0], value);
	              second = this.visit(node.children[1], value);
	              switch(node.name) {
	                case TOK_EQ:
	                  result = strictDeepEqual(first, second);
	                  break;
	                case TOK_NE:
	                  result = !strictDeepEqual(first, second);
	                  break;
	                case TOK_GT:
	                  result = first > second;
	                  break;
	                case TOK_GTE:
	                  result = first >= second;
	                  break;
	                case TOK_LT:
	                  result = first < second;
	                  break;
	                case TOK_LTE:
	                  result = first <= second;
	                  break;
	                default:
	                  throw new Error("Unknown comparator: " + node.name);
	              }
	              return result;
	            case TOK_FLATTEN:
	              var original = this.visit(node.children[0], value);
	              if (!isArray(original)) {
	                return null;
	              }
	              var merged = [];
	              for (i = 0; i < original.length; i++) {
	                current = original[i];
	                if (isArray(current)) {
	                  merged.push.apply(merged, current);
	                } else {
	                  merged.push(current);
	                }
	              }
	              return merged;
	            case "Identity":
	              return value;
	            case "MultiSelectList":
	              if (value === null) {
	                return null;
	              }
	              collected = [];
	              for (i = 0; i < node.children.length; i++) {
	                  collected.push(this.visit(node.children[i], value));
	              }
	              return collected;
	            case "MultiSelectHash":
	              if (value === null) {
	                return null;
	              }
	              collected = {};
	              var child;
	              for (i = 0; i < node.children.length; i++) {
	                child = node.children[i];
	                collected[child.name] = this.visit(child.value, value);
	              }
	              return collected;
	            case "OrExpression":
	              matched = this.visit(node.children[0], value);
	              if (isFalse(matched)) {
	                  matched = this.visit(node.children[1], value);
	              }
	              return matched;
	            case "AndExpression":
	              first = this.visit(node.children[0], value);

	              if (isFalse(first) === true) {
	                return first;
	              }
	              return this.visit(node.children[1], value);
	            case "NotExpression":
	              first = this.visit(node.children[0], value);
	              return isFalse(first);
	            case "Literal":
	              return node.value;
	            case TOK_PIPE:
	              left = this.visit(node.children[0], value);
	              return this.visit(node.children[1], left);
	            case TOK_CURRENT:
	              return value;
	            case "Function":
	              var resolvedArgs = [];
	              for (i = 0; i < node.children.length; i++) {
	                  resolvedArgs.push(this.visit(node.children[i], value));
	              }
	              return this.runtime.callFunction(node.name, resolvedArgs);
	            case "ExpressionReference":
	              var refNode = node.children[0];
	              // Tag the node with a specific attribute so the type
	              // checker verify the type.
	              refNode.jmespathType = TOK_EXPREF;
	              return refNode;
	            default:
	              throw new Error("Unknown node type: " + node.type);
	          }
	      },

	      computeSliceParams: function(arrayLength, sliceParams) {
	        var start = sliceParams[0];
	        var stop = sliceParams[1];
	        var step = sliceParams[2];
	        var computed = [null, null, null];
	        if (step === null) {
	          step = 1;
	        } else if (step === 0) {
	          var error = new Error("Invalid slice, step cannot be 0");
	          error.name = "RuntimeError";
	          throw error;
	        }
	        var stepValueNegative = step < 0 ? true : false;

	        if (start === null) {
	            start = stepValueNegative ? arrayLength - 1 : 0;
	        } else {
	            start = this.capSliceRange(arrayLength, start, step);
	        }

	        if (stop === null) {
	            stop = stepValueNegative ? -1 : arrayLength;
	        } else {
	            stop = this.capSliceRange(arrayLength, stop, step);
	        }
	        computed[0] = start;
	        computed[1] = stop;
	        computed[2] = step;
	        return computed;
	      },

	      capSliceRange: function(arrayLength, actualValue, step) {
	          if (actualValue < 0) {
	              actualValue += arrayLength;
	              if (actualValue < 0) {
	                  actualValue = step < 0 ? -1 : 0;
	              }
	          } else if (actualValue >= arrayLength) {
	              actualValue = step < 0 ? arrayLength - 1 : arrayLength;
	          }
	          return actualValue;
	      }

	  };

	  function Runtime(interpreter) {
	    this._interpreter = interpreter;
	    this.functionTable = {
	        // name: [function, <signature>]
	        // The <signature> can be:
	        //
	        // {
	        //   args: [[type1, type2], [type1, type2]],
	        //   variadic: true|false
	        // }
	        //
	        // Each arg in the arg list is a list of valid types
	        // (if the function is overloaded and supports multiple
	        // types.  If the type is "any" then no type checking
	        // occurs on the argument.  Variadic is optional
	        // and if not provided is assumed to be false.
	        abs: {_func: this._functionAbs, _signature: [{types: [TYPE_NUMBER]}]},
	        avg: {_func: this._functionAvg, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
	        ceil: {_func: this._functionCeil, _signature: [{types: [TYPE_NUMBER]}]},
	        contains: {
	            _func: this._functionContains,
	            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]},
	                        {types: [TYPE_ANY]}]},
	        "ends_with": {
	            _func: this._functionEndsWith,
	            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
	        floor: {_func: this._functionFloor, _signature: [{types: [TYPE_NUMBER]}]},
	        length: {
	            _func: this._functionLength,
	            _signature: [{types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT]}]},
	        map: {
	            _func: this._functionMap,
	            _signature: [{types: [TYPE_EXPREF]}, {types: [TYPE_ARRAY]}]},
	        max: {
	            _func: this._functionMax,
	            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
	        "merge": {
	            _func: this._functionMerge,
	            _signature: [{types: [TYPE_OBJECT], variadic: true}]
	        },
	        "max_by": {
	          _func: this._functionMaxBy,
	          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
	        },
	        sum: {_func: this._functionSum, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
	        "starts_with": {
	            _func: this._functionStartsWith,
	            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
	        min: {
	            _func: this._functionMin,
	            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
	        "min_by": {
	          _func: this._functionMinBy,
	          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
	        },
	        type: {_func: this._functionType, _signature: [{types: [TYPE_ANY]}]},
	        keys: {_func: this._functionKeys, _signature: [{types: [TYPE_OBJECT]}]},
	        values: {_func: this._functionValues, _signature: [{types: [TYPE_OBJECT]}]},
	        sort: {_func: this._functionSort, _signature: [{types: [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER]}]},
	        "sort_by": {
	          _func: this._functionSortBy,
	          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
	        },
	        join: {
	            _func: this._functionJoin,
	            _signature: [
	                {types: [TYPE_STRING]},
	                {types: [TYPE_ARRAY_STRING]}
	            ]
	        },
	        reverse: {
	            _func: this._functionReverse,
	            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]}]},
	        "to_array": {_func: this._functionToArray, _signature: [{types: [TYPE_ANY]}]},
	        "to_string": {_func: this._functionToString, _signature: [{types: [TYPE_ANY]}]},
	        "to_number": {_func: this._functionToNumber, _signature: [{types: [TYPE_ANY]}]},
	        "not_null": {
	            _func: this._functionNotNull,
	            _signature: [{types: [TYPE_ANY], variadic: true}]
	        }
	    };
	  }

	  Runtime.prototype = {
	    callFunction: function(name, resolvedArgs) {
	      var functionEntry = this.functionTable[name];
	      if (functionEntry === undefined) {
	          throw new Error("Unknown function: " + name + "()");
	      }
	      this._validateArgs(name, resolvedArgs, functionEntry._signature);
	      return functionEntry._func.call(this, resolvedArgs);
	    },

	    _validateArgs: function(name, args, signature) {
	        // Validating the args requires validating
	        // the correct arity and the correct type of each arg.
	        // If the last argument is declared as variadic, then we need
	        // a minimum number of args to be required.  Otherwise it has to
	        // be an exact amount.
	        var pluralized;
	        if (signature[signature.length - 1].variadic) {
	            if (args.length < signature.length) {
	                pluralized = signature.length === 1 ? " argument" : " arguments";
	                throw new Error("ArgumentError: " + name + "() " +
	                                "takes at least" + signature.length + pluralized +
	                                " but received " + args.length);
	            }
	        } else if (args.length !== signature.length) {
	            pluralized = signature.length === 1 ? " argument" : " arguments";
	            throw new Error("ArgumentError: " + name + "() " +
	                            "takes " + signature.length + pluralized +
	                            " but received " + args.length);
	        }
	        var currentSpec;
	        var actualType;
	        var typeMatched;
	        for (var i = 0; i < signature.length; i++) {
	            typeMatched = false;
	            currentSpec = signature[i].types;
	            actualType = this._getTypeName(args[i]);
	            for (var j = 0; j < currentSpec.length; j++) {
	                if (this._typeMatches(actualType, currentSpec[j], args[i])) {
	                    typeMatched = true;
	                    break;
	                }
	            }
	            if (!typeMatched) {
	                throw new Error("TypeError: " + name + "() " +
	                                "expected argument " + (i + 1) +
	                                " to be type " + currentSpec +
	                                " but received type " + actualType +
	                                " instead.");
	            }
	        }
	    },

	    _typeMatches: function(actual, expected, argValue) {
	        if (expected === TYPE_ANY) {
	            return true;
	        }
	        if (expected === TYPE_ARRAY_STRING ||
	            expected === TYPE_ARRAY_NUMBER ||
	            expected === TYPE_ARRAY) {
	            // The expected type can either just be array,
	            // or it can require a specific subtype (array of numbers).
	            //
	            // The simplest case is if "array" with no subtype is specified.
	            if (expected === TYPE_ARRAY) {
	                return actual === TYPE_ARRAY;
	            } else if (actual === TYPE_ARRAY) {
	                // Otherwise we need to check subtypes.
	                // I think this has potential to be improved.
	                var subtype;
	                if (expected === TYPE_ARRAY_NUMBER) {
	                  subtype = TYPE_NUMBER;
	                } else if (expected === TYPE_ARRAY_STRING) {
	                  subtype = TYPE_STRING;
	                }
	                for (var i = 0; i < argValue.length; i++) {
	                    if (!this._typeMatches(
	                            this._getTypeName(argValue[i]), subtype,
	                                             argValue[i])) {
	                        return false;
	                    }
	                }
	                return true;
	            }
	        } else {
	            return actual === expected;
	        }
	    },
	    _getTypeName: function(obj) {
	        switch (Object.prototype.toString.call(obj)) {
	            case "[object String]":
	              return TYPE_STRING;
	            case "[object Number]":
	              return TYPE_NUMBER;
	            case "[object Array]":
	              return TYPE_ARRAY;
	            case "[object Boolean]":
	              return TYPE_BOOLEAN;
	            case "[object Null]":
	              return TYPE_NULL;
	            case "[object Object]":
	              // Check if it's an expref.  If it has, it's been
	              // tagged with a jmespathType attr of 'Expref';
	              if (obj.jmespathType === TOK_EXPREF) {
	                return TYPE_EXPREF;
	              } else {
	                return TYPE_OBJECT;
	              }
	        }
	    },

	    _functionStartsWith: function(resolvedArgs) {
	        return resolvedArgs[0].lastIndexOf(resolvedArgs[1]) === 0;
	    },

	    _functionEndsWith: function(resolvedArgs) {
	        var searchStr = resolvedArgs[0];
	        var suffix = resolvedArgs[1];
	        return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
	    },

	    _functionReverse: function(resolvedArgs) {
	        var typeName = this._getTypeName(resolvedArgs[0]);
	        if (typeName === TYPE_STRING) {
	          var originalStr = resolvedArgs[0];
	          var reversedStr = "";
	          for (var i = originalStr.length - 1; i >= 0; i--) {
	              reversedStr += originalStr[i];
	          }
	          return reversedStr;
	        } else {
	          var reversedArray = resolvedArgs[0].slice(0);
	          reversedArray.reverse();
	          return reversedArray;
	        }
	    },

	    _functionAbs: function(resolvedArgs) {
	      return Math.abs(resolvedArgs[0]);
	    },

	    _functionCeil: function(resolvedArgs) {
	        return Math.ceil(resolvedArgs[0]);
	    },

	    _functionAvg: function(resolvedArgs) {
	        var sum = 0;
	        var inputArray = resolvedArgs[0];
	        for (var i = 0; i < inputArray.length; i++) {
	            sum += inputArray[i];
	        }
	        return sum / inputArray.length;
	    },

	    _functionContains: function(resolvedArgs) {
	        return resolvedArgs[0].indexOf(resolvedArgs[1]) >= 0;
	    },

	    _functionFloor: function(resolvedArgs) {
	        return Math.floor(resolvedArgs[0]);
	    },

	    _functionLength: function(resolvedArgs) {
	       if (!isObject(resolvedArgs[0])) {
	         return resolvedArgs[0].length;
	       } else {
	         // As far as I can tell, there's no way to get the length
	         // of an object without O(n) iteration through the object.
	         return Object.keys(resolvedArgs[0]).length;
	       }
	    },

	    _functionMap: function(resolvedArgs) {
	      var mapped = [];
	      var interpreter = this._interpreter;
	      var exprefNode = resolvedArgs[0];
	      var elements = resolvedArgs[1];
	      for (var i = 0; i < elements.length; i++) {
	          mapped.push(interpreter.visit(exprefNode, elements[i]));
	      }
	      return mapped;
	    },

	    _functionMerge: function(resolvedArgs) {
	      var merged = {};
	      for (var i = 0; i < resolvedArgs.length; i++) {
	        var current = resolvedArgs[i];
	        for (var key in current) {
	          merged[key] = current[key];
	        }
	      }
	      return merged;
	    },

	    _functionMax: function(resolvedArgs) {
	      if (resolvedArgs[0].length > 0) {
	        var typeName = this._getTypeName(resolvedArgs[0][0]);
	        if (typeName === TYPE_NUMBER) {
	          return Math.max.apply(Math, resolvedArgs[0]);
	        } else {
	          var elements = resolvedArgs[0];
	          var maxElement = elements[0];
	          for (var i = 1; i < elements.length; i++) {
	              if (maxElement.localeCompare(elements[i]) < 0) {
	                  maxElement = elements[i];
	              }
	          }
	          return maxElement;
	        }
	      } else {
	          return null;
	      }
	    },

	    _functionMin: function(resolvedArgs) {
	      if (resolvedArgs[0].length > 0) {
	        var typeName = this._getTypeName(resolvedArgs[0][0]);
	        if (typeName === TYPE_NUMBER) {
	          return Math.min.apply(Math, resolvedArgs[0]);
	        } else {
	          var elements = resolvedArgs[0];
	          var minElement = elements[0];
	          for (var i = 1; i < elements.length; i++) {
	              if (elements[i].localeCompare(minElement) < 0) {
	                  minElement = elements[i];
	              }
	          }
	          return minElement;
	        }
	      } else {
	        return null;
	      }
	    },

	    _functionSum: function(resolvedArgs) {
	      var sum = 0;
	      var listToSum = resolvedArgs[0];
	      for (var i = 0; i < listToSum.length; i++) {
	        sum += listToSum[i];
	      }
	      return sum;
	    },

	    _functionType: function(resolvedArgs) {
	        switch (this._getTypeName(resolvedArgs[0])) {
	          case TYPE_NUMBER:
	            return "number";
	          case TYPE_STRING:
	            return "string";
	          case TYPE_ARRAY:
	            return "array";
	          case TYPE_OBJECT:
	            return "object";
	          case TYPE_BOOLEAN:
	            return "boolean";
	          case TYPE_EXPREF:
	            return "expref";
	          case TYPE_NULL:
	            return "null";
	        }
	    },

	    _functionKeys: function(resolvedArgs) {
	        return Object.keys(resolvedArgs[0]);
	    },

	    _functionValues: function(resolvedArgs) {
	        var obj = resolvedArgs[0];
	        var keys = Object.keys(obj);
	        var values = [];
	        for (var i = 0; i < keys.length; i++) {
	            values.push(obj[keys[i]]);
	        }
	        return values;
	    },

	    _functionJoin: function(resolvedArgs) {
	        var joinChar = resolvedArgs[0];
	        var listJoin = resolvedArgs[1];
	        return listJoin.join(joinChar);
	    },

	    _functionToArray: function(resolvedArgs) {
	        if (this._getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
	            return resolvedArgs[0];
	        } else {
	            return [resolvedArgs[0]];
	        }
	    },

	    _functionToString: function(resolvedArgs) {
	        if (this._getTypeName(resolvedArgs[0]) === TYPE_STRING) {
	            return resolvedArgs[0];
	        } else {
	            return JSON.stringify(resolvedArgs[0]);
	        }
	    },

	    _functionToNumber: function(resolvedArgs) {
	        var typeName = this._getTypeName(resolvedArgs[0]);
	        var convertedValue;
	        if (typeName === TYPE_NUMBER) {
	            return resolvedArgs[0];
	        } else if (typeName === TYPE_STRING) {
	            convertedValue = +resolvedArgs[0];
	            if (!isNaN(convertedValue)) {
	                return convertedValue;
	            }
	        }
	        return null;
	    },

	    _functionNotNull: function(resolvedArgs) {
	        for (var i = 0; i < resolvedArgs.length; i++) {
	            if (this._getTypeName(resolvedArgs[i]) !== TYPE_NULL) {
	                return resolvedArgs[i];
	            }
	        }
	        return null;
	    },

	    _functionSort: function(resolvedArgs) {
	        var sortedArray = resolvedArgs[0].slice(0);
	        sortedArray.sort();
	        return sortedArray;
	    },

	    _functionSortBy: function(resolvedArgs) {
	        var sortedArray = resolvedArgs[0].slice(0);
	        if (sortedArray.length === 0) {
	            return sortedArray;
	        }
	        var interpreter = this._interpreter;
	        var exprefNode = resolvedArgs[1];
	        var requiredType = this._getTypeName(
	            interpreter.visit(exprefNode, sortedArray[0]));
	        if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
	            throw new Error("TypeError");
	        }
	        var that = this;
	        // In order to get a stable sort out of an unstable
	        // sort algorithm, we decorate/sort/undecorate (DSU)
	        // by creating a new list of [index, element] pairs.
	        // In the cmp function, if the evaluated elements are
	        // equal, then the index will be used as the tiebreaker.
	        // After the decorated list has been sorted, it will be
	        // undecorated to extract the original elements.
	        var decorated = [];
	        for (var i = 0; i < sortedArray.length; i++) {
	          decorated.push([i, sortedArray[i]]);
	        }
	        decorated.sort(function(a, b) {
	          var exprA = interpreter.visit(exprefNode, a[1]);
	          var exprB = interpreter.visit(exprefNode, b[1]);
	          if (that._getTypeName(exprA) !== requiredType) {
	              throw new Error(
	                  "TypeError: expected " + requiredType + ", received " +
	                  that._getTypeName(exprA));
	          } else if (that._getTypeName(exprB) !== requiredType) {
	              throw new Error(
	                  "TypeError: expected " + requiredType + ", received " +
	                  that._getTypeName(exprB));
	          }
	          if (exprA > exprB) {
	            return 1;
	          } else if (exprA < exprB) {
	            return -1;
	          } else {
	            // If they're equal compare the items by their
	            // order to maintain relative order of equal keys
	            // (i.e. to get a stable sort).
	            return a[0] - b[0];
	          }
	        });
	        // Undecorate: extract out the original list elements.
	        for (var j = 0; j < decorated.length; j++) {
	          sortedArray[j] = decorated[j][1];
	        }
	        return sortedArray;
	    },

	    _functionMaxBy: function(resolvedArgs) {
	      var exprefNode = resolvedArgs[1];
	      var resolvedArray = resolvedArgs[0];
	      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
	      var maxNumber = -Infinity;
	      var maxRecord;
	      var current;
	      for (var i = 0; i < resolvedArray.length; i++) {
	        current = keyFunction(resolvedArray[i]);
	        if (current > maxNumber) {
	          maxNumber = current;
	          maxRecord = resolvedArray[i];
	        }
	      }
	      return maxRecord;
	    },

	    _functionMinBy: function(resolvedArgs) {
	      var exprefNode = resolvedArgs[1];
	      var resolvedArray = resolvedArgs[0];
	      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
	      var minNumber = Infinity;
	      var minRecord;
	      var current;
	      for (var i = 0; i < resolvedArray.length; i++) {
	        current = keyFunction(resolvedArray[i]);
	        if (current < minNumber) {
	          minNumber = current;
	          minRecord = resolvedArray[i];
	        }
	      }
	      return minRecord;
	    },

	    createKeyFunction: function(exprefNode, allowedTypes) {
	      var that = this;
	      var interpreter = this._interpreter;
	      var keyFunc = function(x) {
	        var current = interpreter.visit(exprefNode, x);
	        if (allowedTypes.indexOf(that._getTypeName(current)) < 0) {
	          var msg = "TypeError: expected one of " + allowedTypes +
	                    ", received " + that._getTypeName(current);
	          throw new Error(msg);
	        }
	        return current;
	      };
	      return keyFunc;
	    }

	  };

	  function compile(stream) {
	    var parser = new Parser();
	    var ast = parser.parse(stream);
	    return ast;
	  }

	  function tokenize(stream) {
	      var lexer = new Lexer();
	      return lexer.tokenize(stream);
	  }

	  function search(data, expression) {
	      var parser = new Parser();
	      // This needs to be improved.  Both the interpreter and runtime depend on
	      // each other.  The runtime needs the interpreter to support exprefs.
	      // There's likely a clean way to avoid the cyclic dependency.
	      var runtime = new Runtime();
	      var interpreter = new TreeInterpreter(runtime);
	      runtime._interpreter = interpreter;
	      var node = parser.parse(expression);
	      return interpreter.search(node, data);
	  }

	  exports.tokenize = tokenize;
	  exports.compile = compile;
	  exports.search = search;
	  exports.strictDeepEqual = strictDeepEqual;
	})(exports);
} (jmespath$1));

var constants$4 = {
  DATE_FORMAT: 'yyyy-mm-dd HH:MM:ss.l o',

  ERROR_LIKE_KEYS: ['err', 'error'],

  MESSAGE_KEY: 'msg',

  LEVEL_KEY: 'level',

  LEVEL_LABEL: 'levelLabel',

  TIMESTAMP_KEY: 'time',

  LEVELS: {
    default: 'USERLVL',
    60: 'FATAL',
    50: 'ERROR',
    40: 'WARN',
    30: 'INFO',
    20: 'DEBUG',
    10: 'TRACE'
  },

  LEVEL_NAMES: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },

  // Object keys that probably came from a logger like Pino or Bunyan.
  LOGGER_KEYS: [
    'pid',
    'hostname',
    'name',
    'level',
    'time',
    'timestamp',
    'caller'
  ]
};

const { LEVELS: LEVELS$1, LEVEL_NAMES } = constants$4;

const nocolor = input => input;
const plain = {
  default: nocolor,
  60: nocolor,
  50: nocolor,
  40: nocolor,
  30: nocolor,
  20: nocolor,
  10: nocolor,
  message: nocolor,
  greyMessage: nocolor
};

const colorette = colorette$1;
const colored = {
  default: colorette.white,
  60: colorette.bgRed,
  50: colorette.red,
  40: colorette.yellow,
  30: colorette.green,
  20: colorette.blue,
  10: colorette.gray,
  message: colorette.cyan,
  greyMessage: colorette.gray
};

function colorizeLevel (level, colorizer) {
  if (Number.isInteger(+level)) {
    return Object.prototype.hasOwnProperty.call(LEVELS$1, level)
      ? colorizer[level](LEVELS$1[level])
      : colorizer.default(LEVELS$1.default)
  }
  const levelNum = LEVEL_NAMES[level.toLowerCase()] || 'default';
  return colorizer[levelNum](LEVELS$1[levelNum])
}

function plainColorizer (level) {
  return colorizeLevel(level, plain)
}
plainColorizer.message = plain.message;
plainColorizer.greyMessage = plain.greyMessage;

function coloredColorizer (level) {
  return colorizeLevel(level, colored)
}
coloredColorizer.message = colored.message;
coloredColorizer.greyMessage = colored.greyMessage;

/**
 * Factory function get a function to colorized levels. The returned function
 * also includes a `.message(str)` method to colorize strings.
 *
 * @param {boolean} [useColors=false] When `true` a function that applies standard
 * terminal colors is returned.
 *
 * @returns {function} `function (level) {}` has a `.message(str)` method to
 * apply colorization to a string. The core function accepts either an integer
 * `level` or a `string` level. The integer level will map to a known level
 * string or to `USERLVL` if not known.  The string `level` will map to the same
 * colors as the integer `level` and will also default to `USERLVL` if the given
 * string is not a recognized level name.
 */
var colors$1 = function getColorizer (useColors = false) {
  return useColors ? coloredColorizer : plainColorizer
};

var utilsExports$1 = {};
var utils$a = {
  get exports(){ return utilsExports$1; },
  set exports(v){ utilsExports$1 = v; },
};

var rfdc_1 = rfdc;

function copyBuffer (cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

function rfdc (opts) {
  opts = opts || {};

  if (opts.circles) return rfdcCircles(opts)
  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        a2[k] = fn(cur);
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
    var o2 = {};
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = clone(cur);
      }
    }
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
    var o2 = {};
    for (var k in o) {
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = cloneProto(cur);
      }
    }
    return o2
  }
}

function rfdcCircles (opts) {
  var refs = [];
  var refsNew = [];

  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        var index = refs.indexOf(cur);
        if (index !== -1) {
          a2[k] = refsNew[index];
        } else {
          a2[k] = fn(cur);
        }
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);
        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = clone(cur);
        }
      }
    }
    refs.pop();
    refsNew.pop();
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);
    for (var k in o) {
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);
        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = cloneProto(cur);
        }
      }
    }
    refs.pop();
    refsNew.pop();
    return o2
  }
}

var dateformatExports = {};
var dateformat$1 = {
  get exports(){ return dateformatExports; },
  set exports(v){ dateformatExports = v; },
};

(function (module, exports) {
function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj};}else {_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};}return _typeof(obj)}(function(global){var _arguments=arguments;var dateFormat=function(){var token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;var timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;var timezoneClip=/[^-+\dA-Z]/g;return function(date,mask,utc,gmt){if(_arguments.length===1&&kindOf(date)==="string"&&!/\d/.test(date)){mask=date;date=undefined;}date=date||date===0?date:new Date;if(!(date instanceof Date)){date=new Date(date);}if(isNaN(date)){throw TypeError("Invalid date")}mask=String(dateFormat.masks[mask]||mask||dateFormat.masks["default"]);var maskSlice=mask.slice(0,4);if(maskSlice==="UTC:"||maskSlice==="GMT:"){mask=mask.slice(4);utc=true;if(maskSlice==="GMT:"){gmt=true;}}var _=function _(){return utc?"getUTC":"get"};var _d=function d(){return date[_()+"Date"]()};var D=function D(){return date[_()+"Day"]()};var _m=function m(){return date[_()+"Month"]()};var y=function y(){return date[_()+"FullYear"]()};var _H=function H(){return date[_()+"Hours"]()};var _M=function M(){return date[_()+"Minutes"]()};var _s=function s(){return date[_()+"Seconds"]()};var _L=function L(){return date[_()+"Milliseconds"]()};var _o=function o(){return utc?0:date.getTimezoneOffset()};var _W=function W(){return getWeek(date)};var _N=function N(){return getDayOfWeek(date)};var flags={d:function d(){return _d()},dd:function dd(){return pad(_d())},ddd:function ddd(){return dateFormat.i18n.dayNames[D()]},DDD:function DDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:dateFormat.i18n.dayNames[D()],short:true})},dddd:function dddd(){return dateFormat.i18n.dayNames[D()+7]},DDDD:function DDDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:dateFormat.i18n.dayNames[D()+7]})},m:function m(){return _m()+1},mm:function mm(){return pad(_m()+1)},mmm:function mmm(){return dateFormat.i18n.monthNames[_m()]},mmmm:function mmmm(){return dateFormat.i18n.monthNames[_m()+12]},yy:function yy(){return String(y()).slice(2)},yyyy:function yyyy(){return pad(y(),4)},h:function h(){return _H()%12||12},hh:function hh(){return pad(_H()%12||12)},H:function H(){return _H()},HH:function HH(){return pad(_H())},M:function M(){return _M()},MM:function MM(){return pad(_M())},s:function s(){return _s()},ss:function ss(){return pad(_s())},l:function l(){return pad(_L(),3)},L:function L(){return pad(Math.floor(_L()/10))},t:function t(){return _H()<12?dateFormat.i18n.timeNames[0]:dateFormat.i18n.timeNames[1]},tt:function tt(){return _H()<12?dateFormat.i18n.timeNames[2]:dateFormat.i18n.timeNames[3]},T:function T(){return _H()<12?dateFormat.i18n.timeNames[4]:dateFormat.i18n.timeNames[5]},TT:function TT(){return _H()<12?dateFormat.i18n.timeNames[6]:dateFormat.i18n.timeNames[7]},Z:function Z(){return gmt?"GMT":utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")},o:function o(){return (_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60)*100+Math.abs(_o())%60,4)},p:function p(){return (_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function S(){return ["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function W(){return _W()},WW:function WW(){return pad(_W())},N:function N(){return _N()}};return mask.replace(token,function(match){if(match in flags){return flags[match]()}return match.slice(1,match.length-1)})}}();dateFormat.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var pad=function pad(val,len){val=String(val);len=len||2;while(val.length<len){val="0"+val;}return val};var getDayName=function getDayName(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref["short"],_short=_ref$short===void 0?false:_ref$short;var today=new Date;var yesterday=new Date;yesterday.setDate(yesterday[_+"Date"]()-1);var tomorrow=new Date;tomorrow.setDate(tomorrow[_+"Date"]()+1);var today_d=function today_d(){return today[_+"Date"]()};var today_m=function today_m(){return today[_+"Month"]()};var today_y=function today_y(){return today[_+"FullYear"]()};var yesterday_d=function yesterday_d(){return yesterday[_+"Date"]()};var yesterday_m=function yesterday_m(){return yesterday[_+"Month"]()};var yesterday_y=function yesterday_y(){return yesterday[_+"FullYear"]()};var tomorrow_d=function tomorrow_d(){return tomorrow[_+"Date"]()};var tomorrow_m=function tomorrow_m(){return tomorrow[_+"Month"]()};var tomorrow_y=function tomorrow_y(){return tomorrow[_+"FullYear"]()};if(today_y()===y&&today_m()===m&&today_d()===d){return _short?"Tdy":"Today"}else if(yesterday_y()===y&&yesterday_m()===m&&yesterday_d()===d){return _short?"Ysd":"Yesterday"}else if(tomorrow_y()===y&&tomorrow_m()===m&&tomorrow_d()===d){return _short?"Tmw":"Tomorrow"}return dayName};var getWeek=function getWeek(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate());targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3);var firstThursday=new Date(targetThursday.getFullYear(),0,4);firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3);var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset();targetThursday.setHours(targetThursday.getHours()-ds);var weekDiff=(targetThursday-firstThursday)/(864e5*7);return 1+Math.floor(weekDiff)};var getDayOfWeek=function getDayOfWeek(date){var dow=date.getDay();if(dow===0){dow=7;}return dow};var kindOf=function kindOf(val){if(val===null){return "null"}if(val===undefined){return "undefined"}if(_typeof(val)!=="object"){return _typeof(val)}if(Array.isArray(val)){return "array"}return {}.toString.call(val).slice(8,-1).toLowerCase()};if((_typeof(exports))==="object"){module.exports=dateFormat;}else {global.dateFormat=dateFormat;}})(void 0);
} (dateformat$1, dateformatExports));

const clone$9 = rfdc_1({ circles: true });
const dateformat = dateformatExports;
const stringifySafe$1 = fastSafeStringify;
const defaultColorizer = colors$1();
const {
  DATE_FORMAT,
  ERROR_LIKE_KEYS: ERROR_LIKE_KEYS$1,
  MESSAGE_KEY: MESSAGE_KEY$1,
  LEVEL_KEY,
  LEVEL_LABEL,
  TIMESTAMP_KEY: TIMESTAMP_KEY$1,
  LOGGER_KEYS,
  LEVELS
} = constants$4;

utils$a.exports = {
  isObject: isObject$7,
  prettifyErrorLog: prettifyErrorLog$1,
  prettifyLevel: prettifyLevel$1,
  prettifyMessage: prettifyMessage$1,
  prettifyMetadata: prettifyMetadata$1,
  prettifyObject: prettifyObject$1,
  prettifyTime: prettifyTime$1,
  filterLog: filterLog$1
};

utilsExports$1.internals = {
  formatTime,
  joinLinesWithIndentation,
  prettifyError,
  deleteLogProperty,
  splitIgnoreKey,
  createDate,
  isValidDate
};

/**
 * Converts a given `epoch` to a desired display format.
 *
 * @param {number|string} epoch The time to convert. May be any value that is
 * valid for `new Date()`.
 * @param {boolean|string} [translateTime=false] When `false`, the given `epoch`
 * will simply be returned. When `true`, the given `epoch` will be converted
 * to a string at UTC using the `DATE_FORMAT` constant. If `translateTime` is
 * a string, the following rules are available:
 *
 * - `<format string>`: The string is a literal format string. This format
 * string will be used to interpret the `epoch` and return a display string
 * at UTC.
 * - `SYS:STANDARD`: The returned display string will follow the `DATE_FORMAT`
 * constant at the system's local timezone.
 * - `SYS:<format string>`: The returned display string will follow the given
 * `<format string>` at the system's local timezone.
 * - `UTC:<format string>`: The returned display string will follow the given
 * `<format string>` at UTC.
 *
 * @returns {number|string} The formatted time.
 */
function formatTime (epoch, translateTime = false) {
  if (translateTime === false) {
    return epoch
  }

  const instant = createDate(epoch);

  // If the Date is invalid, do not attempt to format
  if (!isValidDate(instant)) {
    return epoch
  }

  if (translateTime === true) {
    return dateformat(instant, 'UTC:' + DATE_FORMAT)
  }

  const upperFormat = translateTime.toUpperCase();
  if (upperFormat === 'SYS:STANDARD') {
    return dateformat(instant, DATE_FORMAT)
  }

  const prefix = upperFormat.substr(0, 4);
  if (prefix === 'SYS:' || prefix === 'UTC:') {
    if (prefix === 'UTC:') {
      return dateformat(instant, translateTime)
    }
    return dateformat(instant, translateTime.slice(4))
  }

  return dateformat(instant, `UTC:${translateTime}`)
}

/**
 * Constructs a JS Date from a number or string. Accepts any single number
 * or single string argument that is valid for the Date() constructor,
 * or an epoch as a string.
 *
 * @param {string|number} epoch The representation of the Date.
 *
 * @returns {Date} The constructed Date.
 */
function createDate (epoch) {
  // If epoch is already a valid argument, return the valid Date
  let date = new Date(epoch);
  if (isValidDate(date)) {
    return date
  }

  // Convert to a number to permit epoch as a string
  date = new Date(+epoch);
  return date
}

/**
 * Checks if the argument is a JS Date and not 'Invalid Date'.
 *
 * @param {Date} date The date to check.
 *
 * @returns {boolean} true if the argument is a JS Date and not 'Invalid Date'.
 */
function isValidDate (date) {
  return date instanceof Date && !Number.isNaN(date.getTime())
}

function isObject$7 (input) {
  return Object.prototype.toString.apply(input) === '[object Object]'
}

/**
 * Given a string with line separators, either `\r\n` or `\n`, add indentation
 * to all lines subsequent to the first line and rejoin the lines using an
 * end of line sequence.
 *
 * @param {object} input
 * @param {string} input.input The string to split and reformat.
 * @param {string} [input.ident] The indentation string. Default: `    ` (4 spaces).
 * @param {string} [input.eol] The end of line sequence to use when rejoining
 * the lines. Default: `'\n'`.
 *
 * @returns {string} A string with lines subsequent to the first indented
 * with the given indentation sequence.
 */
function joinLinesWithIndentation ({ input, ident = '    ', eol = '\n' }) {
  const lines = input.split(/\r?\n/);
  for (let i = 1; i < lines.length; i += 1) {
    lines[i] = ident + lines[i];
  }
  return lines.join(eol)
}

/**
 * Given a log object that has a `type: 'Error'` key, prettify the object and
 * return the result. In other
 *
 * @param {object} input
 * @param {object} input.log The error log to prettify.
 * @param {string} [input.messageKey] The name of the key that contains a
 * general log message. This is not the error's message property but the logger
 * messsage property. Default: `MESSAGE_KEY` constant.
 * @param {string} [input.ident] The sequence to use for indentation. Default: `'    '`.
 * @param {string} [input.eol] The sequence to use for EOL. Default: `'\n'`.
 * @param {string[]} [input.errorLikeKeys] A set of keys that should be considered
 * to have error objects as values. Default: `ERROR_LIKE_KEYS` constant.
 * @param {string[]} [input.errorProperties] A set of specific error object
 * properties, that are not the value of `messageKey`, `type`, or `stack`, to
 * include in the prettified result. The first entry in the list may be `'*'`
 * to indicate that all sibiling properties should be prettified. Default: `[]`.
 *
 * @returns {string} A sring that represents the prettified error log.
 */
function prettifyErrorLog$1 ({
  log,
  messageKey = MESSAGE_KEY$1,
  ident = '    ',
  eol = '\n',
  errorLikeKeys = ERROR_LIKE_KEYS$1,
  errorProperties = []
}) {
  const stack = log.stack;
  const joinedLines = joinLinesWithIndentation({ input: stack, ident, eol });
  let result = `${ident}${joinedLines}${eol}`;

  if (errorProperties.length > 0) {
    const excludeProperties = LOGGER_KEYS.concat(messageKey, 'type', 'stack');
    let propertiesToPrint;
    if (errorProperties[0] === '*') {
      // Print all sibling properties except for the standard exclusions.
      propertiesToPrint = Object.keys(log).filter(k => excludeProperties.includes(k) === false);
    } else {
      // Print only specified properties unless the property is a standard exclusion.
      propertiesToPrint = errorProperties.filter(k => excludeProperties.includes(k) === false);
    }

    for (let i = 0; i < propertiesToPrint.length; i += 1) {
      const key = propertiesToPrint[i];
      if (key in log === false) continue
      if (isObject$7(log[key])) {
        // The nested object may have "logger" type keys but since they are not
        // at the root level of the object being processed, we want to print them.
        // Thus, we invoke with `excludeLoggerKeys: false`.
        const prettifiedObject = prettifyObject$1({ input: log[key], errorLikeKeys, excludeLoggerKeys: false, eol, ident });
        result = `${result}${key}: {${eol}${prettifiedObject}}${eol}`;
        continue
      }
      result = `${result}${key}: ${log[key]}${eol}`;
    }
  }

  return result
}

/**
 * Checks if the passed in log has a `level` value and returns a prettified
 * string for that level if so.
 *
 * @param {object} input
 * @param {object} input.log The log object.
 * @param {function} [input.colorizer] A colorizer function that accepts a level
 * value and returns a colorized string. Default: a no-op colorizer.
 * @param {string} [levelKey='level'] The key to find the level under.
 *
 * @returns {undefined|string} If `log` does not have a `level` property then
 * `undefined` will be returned. Otherwise, a string from the specified
 * `colorizer` is returned.
 */
function prettifyLevel$1 ({ log, colorizer = defaultColorizer, levelKey = LEVEL_KEY }) {
  if (levelKey in log === false) return undefined
  return colorizer(log[levelKey])
}

/**
 * Prettifies a message string if the given `log` has a message property.
 *
 * @param {object} input
 * @param {object} input.log The log object with the message to colorize.
 * @param {string} [input.messageKey='msg'] The property of the `log` that is the
 * message to be prettified.
 * @param {string|function} [input.messageFormat=undefined] A format string or function that defines how the
 *  logged message should be formatted, e.g. `'{level} - {pid}'`.
 * @param {function} [input.colorizer] A colorizer function that has a
 * `.message(str)` method attached to it. This function should return a colorized
 * string which will be the "prettified" message. Default: a no-op colorizer.
 *
 * @returns {undefined|string} If the message key is not found, or the message
 * key is not a string, then `undefined` will be returned. Otherwise, a string
 * that is the prettified message.
 */
function prettifyMessage$1 ({ log, messageFormat, messageKey = MESSAGE_KEY$1, colorizer = defaultColorizer, levelLabel = LEVEL_LABEL }) {
  if (messageFormat && typeof messageFormat === 'string') {
    const message = String(messageFormat).replace(/{([^{}]+)}/g, function (match, p1) {
      // return log level as string instead of int
      if (p1 === levelLabel && log[LEVEL_KEY]) {
        return LEVELS[log[LEVEL_KEY]]
      }
      // Parse nested key access, e.g. `{keyA.subKeyB}`.
      return p1.split('.').reduce(function (prev, curr) {
        if (prev && prev[curr]) {
          return prev[curr]
        }
        return ''
      }, log)
    });
    return colorizer.message(message)
  }
  if (messageFormat && typeof messageFormat === 'function') {
    const msg = messageFormat(log, messageKey, levelLabel);
    return colorizer.message(msg)
  }
  if (messageKey in log === false) return undefined
  if (typeof log[messageKey] !== 'string') return undefined
  return colorizer.message(log[messageKey])
}

/**
 * Prettifies metadata that is usually present in a Pino log line. It looks for
 * fields `name`, `pid`, `hostname`, and `caller` and returns a formatted string using
 * the fields it finds.
 *
 * @param {object} input
 * @param {object} input.log The log that may or may not contain metadata to
 * be prettified.
 *
 * @returns {undefined|string} If no metadata is found then `undefined` is
 * returned. Otherwise, a string of prettified metadata is returned.
 */
function prettifyMetadata$1 ({ log }) {
  let line = '';

  if (log.name || log.pid || log.hostname) {
    line += '(';

    if (log.name) {
      line += log.name;
    }

    if (log.name && log.pid) {
      line += '/' + log.pid;
    } else if (log.pid) {
      line += log.pid;
    }

    if (log.hostname) {
      // If `pid` and `name` were in the ignore keys list then we don't need
      // the leading space.
      line += `${line === '(' ? 'on' : ' on'} ${log.hostname}`;
    }

    line += ')';
  }

  if (log.caller) {
    line += `${line === '' ? '' : ' '}<${log.caller}>`;
  }

  if (line === '') {
    return undefined
  } else {
    return line
  }
}

/**
 * Prettifies a standard object. Special care is taken when processing the object
 * to handle child objects that are attached to keys known to contain error
 * objects.
 *
 * @param {object} input
 * @param {object} input.input The object to prettify.
 * @param {string} [input.ident] The identation sequence to use. Default: `'    '`.
 * @param {string} [input.eol] The EOL sequence to use. Default: `'\n'`.
 * @param {string[]} [input.skipKeys] A set of object keys to exclude from the
 * prettified result. Default: `[]`.
 * @param {Object<string, function>} [input.customPrettifiers] Dictionary of
 * custom prettifiers. Default: `{}`.
 * @param {string[]} [input.errorLikeKeys] A set of object keys that contain
 * error objects. Default: `ERROR_LIKE_KEYS` constant.
 * @param {boolean} [input.excludeLoggerKeys] Indicates if known logger specific
 * keys should be excluded from prettification. Default: `true`.
 * @param {boolean} [input.singleLine] Should non-error keys all be formatted
 * on a single line? This does NOT apply to errors, which will still be
 * multi-line. Default: `false`
 *
 * @returns {string} The prettified string. This can be as little as `''` if
 * there was nothing to prettify.
 */
function prettifyObject$1 ({
  input,
  ident = '    ',
  eol = '\n',
  skipKeys = [],
  customPrettifiers = {},
  errorLikeKeys = ERROR_LIKE_KEYS$1,
  excludeLoggerKeys = true,
  singleLine = false,
  colorizer = defaultColorizer
}) {
  const keysToIgnore = [].concat(skipKeys);

  if (excludeLoggerKeys === true) Array.prototype.push.apply(keysToIgnore, LOGGER_KEYS);

  let result = '';

  // Split object keys into two categories: error and non-error
  const { plain, errors } = Object.entries(input).reduce(({ plain, errors }, [k, v]) => {
    if (keysToIgnore.includes(k) === false) {
      // Pre-apply custom prettifiers, because all 3 cases below will need this
      const pretty = typeof customPrettifiers[k] === 'function'
        ? customPrettifiers[k](v, k, input)
        : v;
      if (errorLikeKeys.includes(k)) {
        errors[k] = pretty;
      } else {
        plain[k] = pretty;
      }
    }
    return { plain, errors }
  }, { plain: {}, errors: {} });

  if (singleLine) {
    // Stringify the entire object as a single JSON line
    if (Object.keys(plain).length > 0) {
      result += colorizer.greyMessage(stringifySafe$1(plain));
    }
    result += eol;
  } else {
    // Put each object entry on its own line
    Object.entries(plain).forEach(([keyName, keyValue]) => {
      // custom prettifiers are already applied above, so we can skip it now
      const lines = typeof customPrettifiers[keyName] === 'function'
        ? keyValue
        : stringifySafe$1(keyValue, null, 2);

      if (lines === undefined) return

      const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol });
      result += `${ident}${keyName}: ${joinedLines}${eol}`;
    });
  }

  // Errors
  Object.entries(errors).forEach(([keyName, keyValue]) => {
    // custom prettifiers are already applied above, so we can skip it now
    const lines = typeof customPrettifiers[keyName] === 'function'
      ? keyValue
      : stringifySafe$1(keyValue, null, 2);

    if (lines === undefined) return

    result += prettifyError({ keyName, lines, eol, ident });
  });

  return result
}

/**
 * Prettifies a timestamp if the given `log` has either `time`, `timestamp` or custom specified timestamp
 * property.
 *
 * @param {object} input
 * @param {object} input.log The log object with the timestamp to be prettified.
 * @param {string} [input.timestampKey='time'] The log property that should be used to resolve timestamp value
 * @param {boolean|string} [input.translateFormat=undefined] When `true` the
 * timestamp will be prettified into a string at UTC using the default
 * `DATE_FORMAT`. If a string, then `translateFormat` will be used as the format
 * string to determine the output; see the `formatTime` function for details.
 *
 * @returns {undefined|string} If a timestamp property cannot be found then
 * `undefined` is returned. Otherwise, the prettified time is returned as a
 * string.
 */
function prettifyTime$1 ({ log, timestampKey = TIMESTAMP_KEY$1, translateFormat = undefined }) {
  let time = null;

  if (timestampKey in log) {
    time = log[timestampKey];
  } else if ('timestamp' in log) {
    time = log.timestamp;
  }

  if (time === null) return undefined
  if (translateFormat) {
    return '[' + formatTime(time, translateFormat) + ']'
  }

  return `[${time}]`
}

/**
 * Prettifies an error string into a multi-line format.
 * @param {object} input
 * @param {string} input.keyName The key assigned to this error in the log object
 * @param {string} input.lines The STRINGIFIED error. If the error field has a
 *  custom prettifier, that should be pre-applied as well
 * @param {string} input.ident The indentation sequence to use
 * @param {string} input.eol The EOL sequence to use
 */
function prettifyError ({ keyName, lines, eol, ident }) {
  let result = '';
  const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol });
  const splitLines = `${ident}${keyName}: ${joinedLines}${eol}`.split(eol);

  for (let j = 0; j < splitLines.length; j += 1) {
    if (j !== 0) result += eol;

    const line = splitLines[j];
    if (/^\s*"stack"/.test(line)) {
      const matches = /^(\s*"stack":)\s*(".*"),?$/.exec(line);
      /* istanbul ignore else */
      if (matches && matches.length === 3) {
        const indentSize = /^\s*/.exec(line)[0].length + 4;
        const indentation = ' '.repeat(indentSize);
        const stackMessage = matches[2];
        result += matches[1] + eol + indentation + JSON.parse(stackMessage).replace(/\n/g, eol + indentation);
      }
    } else {
      result += line;
    }
  }

  return result
}

/**
 * Splits the input key delimited by a dot character but not when it is preceded
 * by a backslash.
 *
 * @param {string} key A string identifying the property.
 *
 * @returns {string[]} Returns a list of string containing each delimited property.
 * e.g. `'prop2\.domain\.corp.prop2'` should return [ 'prop2.domain.com', 'prop2' ]
 */
function splitIgnoreKey (key) {
  const result = [];
  let backslash = false;
  let segment = '';

  for (let i = 0; i < key.length; i++) {
    const c = key.charAt(i);

    if (c === '\\') {
      backslash = true;
      continue
    }

    if (backslash) {
      backslash = false;
      segment += c;
      continue
    }

    /* Non-escaped dot, push to result */
    if (c === '.') {
      result.push(segment);
      segment = '';
      continue
    }

    segment += c;
  }

  /* Push last entry to result */
  if (segment.length) {
    result.push(segment);
  }

  return result
}

/**
 * Deletes a specified property from a log object if it exists.
 * This function mutates the passed in `log` object.
 *
 * @param {object} log The log object to be modified.
 * @param {string} property A string identifying the property to be deleted from
 * the log object. Accepts nested properties delimited by a `.`
 * Delimiter can be escaped to preserve property names that contain the delimiter.
 * e.g. `'prop1.prop2'` or `'prop2\.domain\.corp.prop2'`
 */
function deleteLogProperty (log, property) {
  const props = splitIgnoreKey(property);
  const propToDelete = props.pop();

  props.forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(log, prop)) {
      return
    }
    log = log[prop];
  });

  delete log[propToDelete];
}

/**
 * Filter a log object by removing any ignored keys.
 *
 * @param {object} log The log object to be modified.
 * @param {string} ignoreKeys An array of strings identifying the properties to be removed.
 *
 * @returns {object} A new `log` object instance that does not include the ignored keys.
 */
function filterLog$1 (log, ignoreKeys) {
  const logCopy = clone$9(log);
  ignoreKeys.forEach((ignoreKey) => {
    deleteLogProperty(logCopy, ignoreKey);
  });
  return logCopy
}

var lib$7 = {};

(function (exports) {


	const internals = {
	    suspectRx: /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*\:/
	};


	exports.parse = function (text, ...args) {

	    // Normalize arguments

	    const firstOptions = typeof args[0] === 'object' && args[0];
	    const reviver = args.length > 1 || !firstOptions ? args[0] : undefined;
	    const options = (args.length > 1 && args[1]) || firstOptions || {};

	    // Parse normally, allowing exceptions

	    const obj = JSON.parse(text, reviver);

	    // options.protoAction: 'error' (default) / 'remove' / 'ignore'

	    if (options.protoAction === 'ignore') {
	        return obj;
	    }

	    // Ignore null and non-objects

	    if (!obj ||
	        typeof obj !== 'object') {

	        return obj;
	    }

	    // Check original string for potential exploit

	    if (!text.match(internals.suspectRx)) {
	        return obj;
	    }

	    // Scan result for proto keys

	    exports.scan(obj, options);

	    return obj;
	};


	exports.scan = function (obj, options = {}) {

	    let next = [obj];

	    while (next.length) {
	        const nodes = next;
	        next = [];

	        for (const node of nodes) {
	            if (Object.prototype.hasOwnProperty.call(node, '__proto__')) {      // Avoid calling node.hasOwnProperty directly
	                if (options.protoAction !== 'remove') {
	                    throw new SyntaxError('Object contains forbidden prototype property');
	                }

	                delete node.__proto__;
	            }

	            for (const key in node) {
	                const value = node[key];
	                if (value &&
	                    typeof value === 'object') {

	                    next.push(node[key]);
	                }
	            }
	        }
	    }
	};


	exports.safeParse = function (text, reviver) {

	    try {
	        return exports.parse(text, reviver);
	    }
	    catch (ignoreError) {
	        return null;
	    }
	};
} (lib$7));

const { options: coloretteOptions } = colorette$1;
const jmespath = jmespath$1;
const colors = colors$1;
const { ERROR_LIKE_KEYS, MESSAGE_KEY, TIMESTAMP_KEY } = constants$4;
const {
  isObject: isObject$6,
  prettifyErrorLog,
  prettifyLevel,
  prettifyMessage,
  prettifyMetadata,
  prettifyObject,
  prettifyTime,
  filterLog
} = utilsExports$1;

const bourne = lib$7;
const jsonParser = input => {
  try {
    return { value: bourne.parse(input, { protoAction: 'remove' }) }
  } catch (err) {
    return { err }
  }
};

const defaultOptions$4 = {
  colorize: coloretteOptions.enabled,
  crlf: false,
  errorLikeObjectKeys: ERROR_LIKE_KEYS,
  errorProps: '',
  levelFirst: false,
  messageKey: MESSAGE_KEY,
  messageFormat: false,
  timestampKey: TIMESTAMP_KEY,
  translateTime: false,
  useMetadata: false,
  outputStream: process.stdout,
  customPrettifiers: {},
  hideObject: false,
  singleLine: false
};

function prettyFactory$1 (options) {
  const opts = Object.assign({}, defaultOptions$4, options);
  const EOL = opts.crlf ? '\r\n' : '\n';
  const IDENT = '    ';
  const messageKey = opts.messageKey;
  const levelKey = opts.levelKey;
  const levelLabel = opts.levelLabel;
  const messageFormat = opts.messageFormat;
  const timestampKey = opts.timestampKey;
  const errorLikeObjectKeys = opts.errorLikeObjectKeys;
  const errorProps = opts.errorProps.split(',');
  const customPrettifiers = opts.customPrettifiers;
  const ignoreKeys = opts.ignore ? new Set(opts.ignore.split(',')) : undefined;
  const hideObject = opts.hideObject;
  const singleLine = opts.singleLine;

  const colorizer = colors(opts.colorize);
  const search = opts.search;

  return pretty

  function pretty (inputData) {
    let log;
    if (!isObject$6(inputData)) {
      const parsed = jsonParser(inputData);
      if (parsed.err || !isObject$6(parsed.value)) {
        // pass through
        return inputData + EOL
      }
      log = parsed.value;
    } else {
      log = inputData;
    }

    if (search && !jmespath.search(log, search)) {
      return
    }

    const prettifiedMessage = prettifyMessage({ log, messageKey, colorizer, messageFormat, levelLabel });

    if (ignoreKeys) {
      log = filterLog(log, ignoreKeys);
    }

    const prettifiedLevel = prettifyLevel({ log, colorizer, levelKey });
    const prettifiedMetadata = prettifyMetadata({ log });
    const prettifiedTime = prettifyTime({ log, translateFormat: opts.translateTime, timestampKey });

    let line = '';
    if (opts.levelFirst && prettifiedLevel) {
      line = `${prettifiedLevel}`;
    }

    if (prettifiedTime && line === '') {
      line = `${prettifiedTime}`;
    } else if (prettifiedTime) {
      line = `${line} ${prettifiedTime}`;
    }

    if (!opts.levelFirst && prettifiedLevel) {
      if (line.length > 0) {
        line = `${line} ${prettifiedLevel}`;
      } else {
        line = prettifiedLevel;
      }
    }

    if (prettifiedMetadata) {
      if (line.length > 0) {
        line = `${line} ${prettifiedMetadata}:`;
      } else {
        line = prettifiedMetadata;
      }
    }

    if (line.endsWith(':') === false && line !== '') {
      line += ':';
    }

    if (prettifiedMessage) {
      if (line.length > 0) {
        line = `${line} ${prettifiedMessage}`;
      } else {
        line = prettifiedMessage;
      }
    }

    if (line.length > 0 && !singleLine) {
      line += EOL;
    }

    if (log.type === 'Error' && log.stack) {
      const prettifiedErrorLog = prettifyErrorLog({
        log,
        errorLikeKeys: errorLikeObjectKeys,
        errorProperties: errorProps,
        ident: IDENT,
        eol: EOL
      });
      line += prettifiedErrorLog;
    } else if (!hideObject) {
      const skipKeys = [messageKey, levelKey, timestampKey].filter(key => typeof log[key] === 'string' || typeof log[key] === 'number');
      const prettifiedObject = prettifyObject({
        input: log,
        skipKeys,
        customPrettifiers,
        errorLikeKeys: errorLikeObjectKeys,
        eol: EOL,
        ident: IDENT,
        singleLine,
        colorizer
      });

      // In single line mode, include a space only if prettified version isn't empty
      if (singleLine && !/^\s$/.test(prettifiedObject)) {
        line += ' ';
      }
      line += prettifiedObject;
    }

    return line
  }
}

prettyFactory$1.prettyFactory = prettyFactory$1;
prettyFactory$1.default = prettyFactory$1;
var pinoPretty = prettyFactory$1;

/* eslint no-prototype-builtins: 0 */

const format$5 = quickFormatUnescaped;
const { mapHttpRequest: mapHttpRequest$3, mapHttpResponse: mapHttpResponse$3 } = pinoStdSerializers$2;
const SonicBoom$3 = sonicBoom$1;
const stringifySafe = fastSafeStringify;
const {
  lsCacheSym: lsCacheSym$6,
  chindingsSym: chindingsSym$6,
  parsedChindingsSym: parsedChindingsSym$2,
  writeSym: writeSym$4,
  serializersSym: serializersSym$6,
  formatOptsSym: formatOptsSym$6,
  endSym: endSym$4,
  stringifiersSym: stringifiersSym$6,
  stringifySym: stringifySym$6,
  wildcardFirstSym: wildcardFirstSym$3,
  needsMetadataGsym: needsMetadataGsym$3,
  redactFmtSym: redactFmtSym$6,
  streamSym: streamSym$7,
  nestedKeySym: nestedKeySym$4,
  formattersSym: formattersSym$8,
  messageKeySym: messageKeySym$4
} = symbols$3;

function noop$a () {}

function genLog$3 (level, hook) {
  if (!hook) return LOG

  return function hookWrappedLog (...args) {
    hook.call(this, args, LOG, level);
  }

  function LOG (o, ...n) {
    if (typeof o === 'object') {
      let msg = o;
      if (o !== null) {
        if (o.method && o.headers && o.socket) {
          o = mapHttpRequest$3(o);
        } else if (typeof o.setHeader === 'function') {
          o = mapHttpResponse$3(o);
        }
      }
      if (this[nestedKeySym$4]) o = { [this[nestedKeySym$4]]: o };
      let formatParams;
      if (msg === null && n.length === 0) {
        formatParams = [null];
      } else {
        msg = n.shift();
        formatParams = n;
      }
      this[writeSym$4](o, format$5(msg, formatParams, this[formatOptsSym$6]), level);
    } else {
      this[writeSym$4](null, format$5(o, n, this[formatOptsSym$6]), level);
    }
  }
}

// magically escape strings for json
// relying on their charCodeAt
// everything below 32 needs JSON.stringify()
// 34 and 92 happens all the time, so we
// have a fast case for them
function asString$1 (str) {
  let result = '';
  let last = 0;
  let found = false;
  let point = 255;
  const l = str.length;
  if (l > 100) {
    return JSON.stringify(str)
  }
  for (var i = 0; i < l && point >= 32; i++) {
    point = str.charCodeAt(i);
    if (point === 34 || point === 92) {
      result += str.slice(last, i) + '\\';
      last = i;
      found = true;
    }
  }
  if (!found) {
    result = str;
  } else {
    result += str.slice(last);
  }
  return point < 32 ? JSON.stringify(str) : '"' + result + '"'
}

function asJson$3 (obj, msg, num, time) {
  const stringify = this[stringifySym$6];
  const stringifiers = this[stringifiersSym$6];
  const end = this[endSym$4];
  const chindings = this[chindingsSym$6];
  const serializers = this[serializersSym$6];
  const formatters = this[formattersSym$8];
  const messageKey = this[messageKeySym$4];
  let data = this[lsCacheSym$6][num] + time;

  // we need the child bindings added to the output first so instance logged
  // objects can take precedence when JSON.parse-ing the resulting log line
  data = data + chindings;

  let value;
  const notHasOwnProperty = obj.hasOwnProperty === undefined;
  if (formatters.log) {
    obj = formatters.log(obj);
  }
  if (msg !== undefined) {
    obj[messageKey] = msg;
  }
  const wildcardStringifier = stringifiers[wildcardFirstSym$3];
  for (const key in obj) {
    value = obj[key];
    if ((notHasOwnProperty || obj.hasOwnProperty(key)) && value !== undefined) {
      value = serializers[key] ? serializers[key](value) : value;

      const stringifier = stringifiers[key] || wildcardStringifier;

      switch (typeof value) {
        case 'undefined':
        case 'function':
          continue
        case 'number':
          /* eslint no-fallthrough: "off" */
          if (Number.isFinite(value) === false) {
            value = null;
          }
        // this case explicitly falls through to the next one
        case 'boolean':
          if (stringifier) value = stringifier(value);
          break
        case 'string':
          value = (stringifier || asString$1)(value);
          break
        default:
          value = (stringifier || stringify)(value);
      }
      if (value === undefined) continue
      data += ',"' + key + '":' + value;
    }
  }

  return data + end
}

function asChindings$5 (instance, bindings) {
  let value;
  let data = instance[chindingsSym$6];
  const stringify = instance[stringifySym$6];
  const stringifiers = instance[stringifiersSym$6];
  const wildcardStringifier = stringifiers[wildcardFirstSym$3];
  const serializers = instance[serializersSym$6];
  const formatter = instance[formattersSym$8].bindings;
  bindings = formatter(bindings);

  for (const key in bindings) {
    value = bindings[key];
    const valid = key !== 'level' &&
      key !== 'serializers' &&
      key !== 'formatters' &&
      key !== 'customLevels' &&
      bindings.hasOwnProperty(key) &&
      value !== undefined;
    if (valid === true) {
      value = serializers[key] ? serializers[key](value) : value;
      value = (stringifiers[key] || wildcardStringifier || stringify)(value);
      if (value === undefined) continue
      data += ',"' + key + '":' + value;
    }
  }
  return data
}

function getPrettyStream (opts, prettifier, dest, instance) {
  if (prettifier && typeof prettifier === 'function') {
    prettifier = prettifier.bind(instance);
    return prettifierMetaWrapper(prettifier(opts), dest, opts)
  }
  try {
    const prettyFactory = pinoPretty.prettyFactory || pinoPretty;
    prettyFactory.asMetaWrapper = prettifierMetaWrapper;
    return prettifierMetaWrapper(prettyFactory(opts), dest, opts)
  } catch (e) {
    if (e.message.startsWith("Cannot find module 'pino-pretty'")) {
      throw Error('Missing `pino-pretty` module: `pino-pretty` must be installed separately')
    }    throw e
  }
}

function prettifierMetaWrapper (pretty, dest, opts) {
  opts = Object.assign({ suppressFlushSyncWarning: false }, opts);
  let warned = false;
  return {
    [needsMetadataGsym$3]: true,
    lastLevel: 0,
    lastMsg: null,
    lastObj: null,
    lastLogger: null,
    flushSync () {
      if (opts.suppressFlushSyncWarning || warned) {
        return
      }
      warned = true;
      setMetadataProps(dest, this);
      dest.write(pretty(Object.assign({
        level: 40, // warn
        msg: 'pino.final with prettyPrint does not support flushing',
        time: Date.now()
      }, this.chindings())));
    },
    chindings () {