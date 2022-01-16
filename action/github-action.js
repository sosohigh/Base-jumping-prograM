
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