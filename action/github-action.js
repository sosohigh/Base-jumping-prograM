
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
      const lastLogger = this.lastLogger;
      let chindings = null;

      // protection against flushSync being called before logging
      // anything
      if (!lastLogger) {
        return null
      }

      if (lastLogger.hasOwnProperty(parsedChindingsSym$2)) {
        chindings = lastLogger[parsedChindingsSym$2];
      } else {
        chindings = JSON.parse('{' + lastLogger[chindingsSym$6].substr(1) + '}');
        lastLogger[parsedChindingsSym$2] = chindings;
      }

      return chindings
    },
    write (chunk) {
      const lastLogger = this.lastLogger;
      const chindings = this.chindings();

      let time = this.lastTime;

      if (time.match(/^\d+/)) {
        time = parseInt(time);
      } else {
        time = time.slice(1, -1);
      }

      const lastObj = this.lastObj;
      const lastMsg = this.lastMsg;
      const errorProps = null;

      const formatters = lastLogger[formattersSym$8];
      const formattedObj = formatters.log ? formatters.log(lastObj) : lastObj;

      const messageKey = lastLogger[messageKeySym$4];
      if (lastMsg && formattedObj && !formattedObj.hasOwnProperty(messageKey)) {
        formattedObj[messageKey] = lastMsg;
      }

      const obj = Object.assign({
        level: this.lastLevel,
        time
      }, formattedObj, errorProps);

      const serializers = lastLogger[serializersSym$6];
      const keys = Object.keys(serializers);

      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (obj[key] !== undefined) {
          obj[key] = serializers[key](obj[key]);
        }
      }

      for (const key in chindings) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = chindings[key];
        }
      }

      const stringifiers = lastLogger[stringifiersSym$6];
      const redact = stringifiers[redactFmtSym$6];

      const formatted = pretty(typeof redact === 'function' ? redact(obj) : obj);
      if (formatted === undefined) return

      setMetadataProps(dest, this);
      dest.write(formatted);
    }
  }
}

function hasBeenTampered$1 (stream) {
  return stream.write !== stream.constructor.prototype.write
}

function buildSafeSonicBoom$3 (opts) {
  const stream = new SonicBoom$3(opts);
  stream.on('error', filterBrokenPipe);
  return stream

  function filterBrokenPipe (err) {
    // TODO verify on Windows
    if (err.code === 'EPIPE') {
      // If we get EPIPE, we should stop logging here
      // however we have no control to the consumer of
      // SonicBoom, so we just overwrite the write method
      stream.write = noop$a;
      stream.end = noop$a;
      stream.flushSync = noop$a;
      stream.destroy = noop$a;
      return
    }
    stream.removeListener('error', filterBrokenPipe);
    stream.emit('error', err);
  }
}

function createArgsNormalizer$3 (defaultOptions) {
  return function normalizeArgs (instance, opts = {}, stream) {
    // support stream as a string
    if (typeof opts === 'string') {
      stream = buildSafeSonicBoom$3({ dest: opts, sync: true });
      opts = {};
    } else if (typeof stream === 'string') {
      stream = buildSafeSonicBoom$3({ dest: stream, sync: true });
    } else if (opts instanceof SonicBoom$3 || opts.writable || opts._writableState) {
      stream = opts;
      opts = null;
    }
    opts = Object.assign({}, defaultOptions, opts);
    if ('extreme' in opts) {
      throw Error('The extreme option has been removed, use pino.destination({ sync: false }) instead')
    }
    if ('onTerminated' in opts) {
      throw Error('The onTerminated option has been removed, use pino.final instead')
    }
    if ('changeLevelName' in opts) {
      process.emitWarning(
        'The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.',
        { code: 'changeLevelName_deprecation' }
      );
      opts.levelKey = opts.changeLevelName;
      delete opts.changeLevelName;
    }
    const { enabled, prettyPrint, prettifier, messageKey } = opts;
    if (enabled === false) opts.level = 'silent';
    stream = stream || process.stdout;
    if (stream === process.stdout && stream.fd >= 0 && !hasBeenTampered$1(stream)) {
      stream = buildSafeSonicBoom$3({ fd: stream.fd, sync: true });
    }
    if (prettyPrint) {
      const prettyOpts = Object.assign({ messageKey }, prettyPrint);
      stream = getPrettyStream(prettyOpts, prettifier, stream, instance);
    }
    return { opts, stream }
  }
}

function final$1 (logger, handler) {
  if (typeof logger === 'undefined' || typeof logger.child !== 'function') {
    throw Error('expected a pino logger instance')
  }
  const hasHandler = (typeof handler !== 'undefined');
  if (hasHandler && typeof handler !== 'function') {
    throw Error('if supplied, the handler parameter should be a function')
  }
  const stream = logger[streamSym$7];
  if (typeof stream.flushSync !== 'function') {
    throw Error('final requires a stream that has a flushSync method, such as pino.destination')
  }

  const finalLogger = new Proxy(logger, {
    get: (logger, key) => {
      if (key in logger.levels.values) {
        return (...args) => {
          logger[key](...args);
          stream.flushSync();
        }
      }
      return logger[key]
    }
  });

  if (!hasHandler) {
    return finalLogger
  }

  return (err = null, ...args) => {
    try {
      stream.flushSync();
    } catch (e) {
      // it's too late to wait for the stream to be ready
      // because this is a final tick scenario.
      // in practice there shouldn't be a situation where it isn't
      // however, swallow the error just in case (and for easier testing)
    }
    return handler(err, finalLogger, ...args)
  }
}

function stringify$a (obj) {
  try {
    return JSON.stringify(obj)
  } catch (_) {
    return stringifySafe(obj)
  }
}

function buildFormatters$5 (level, bindings, log) {
  return {
    level,
    bindings,
    log
  }
}

function setMetadataProps (dest, that) {
  if (dest[needsMetadataGsym$3] === true) {
    dest.lastLevel = that.lastLevel;
    dest.lastMsg = that.lastMsg;
    dest.lastObj = that.lastObj;
    dest.lastTime = that.lastTime;
    dest.lastLogger = that.lastLogger;
  }
}

var tools$1 = {
  noop: noop$a,
  buildSafeSonicBoom: buildSafeSonicBoom$3,
  getPrettyStream,
  asChindings: asChindings$5,
  asJson: asJson$3,
  genLog: genLog$3,
  createArgsNormalizer: createArgsNormalizer$3,
  final: final$1,
  stringify: stringify$a,
  buildFormatters: buildFormatters$5
};

/* eslint no-prototype-builtins: 0 */
const flatstr$1 = flatstr_1;
const {
  lsCacheSym: lsCacheSym$5,
  levelValSym: levelValSym$4,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$6,
  streamSym: streamSym$6,
  formattersSym: formattersSym$7,
  hooksSym: hooksSym$4
} = symbols$3;
const { noop: noop$9, genLog: genLog$2 } = tools$1;

const levels$2 = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
};
const levelMethods$1 = {
  fatal: (hook) => {
    const logFatal = genLog$2(levels$2.fatal, hook);
    return function (...args) {
      const stream = this[streamSym$6];
      logFatal.call(this, ...args);
      if (typeof stream.flushSync === 'function') {
        try {
          stream.flushSync();
        } catch (e) {
          // https://github.com/pinojs/pino/pull/740#discussion_r346788313
        }
      }
    }
  },
  error: (hook) => genLog$2(levels$2.error, hook),
  warn: (hook) => genLog$2(levels$2.warn, hook),
  info: (hook) => genLog$2(levels$2.info, hook),
  debug: (hook) => genLog$2(levels$2.debug, hook),
  trace: (hook) => genLog$2(levels$2.trace, hook)
};

const nums$1 = Object.keys(levels$2).reduce((o, k) => {
  o[levels$2[k]] = k;
  return o
}, {});

const initialLsCache$3 = Object.keys(nums$1).reduce((o, k) => {
  o[k] = flatstr$1('{"level":' + Number(k));
  return o
}, {});

function genLsCache$5 (instance) {
  const formatter = instance[formattersSym$7].level;
  const { labels } = instance.levels;
  const cache = {};
  for (const label in labels) {
    const level = formatter(labels[label], Number(label));
    cache[label] = JSON.stringify(level).slice(0, -1);
  }
  instance[lsCacheSym$5] = cache;
  return instance
}

function isStandardLevel$1 (level, useOnlyCustomLevels) {
  if (useOnlyCustomLevels) {
    return false
  }

  switch (level) {
    case 'fatal':
    case 'error':
    case 'warn':
    case 'info':
    case 'debug':
    case 'trace':
      return true
    default:
      return false
  }
}

function setLevel$3 (level) {
  const { labels, values } = this.levels;
  if (typeof level === 'number') {
    if (labels[level] === undefined) throw Error('unknown level value' + level)
    level = labels[level];
  }
  if (values[level] === undefined) throw Error('unknown level ' + level)
  const preLevelVal = this[levelValSym$4];
  const levelVal = this[levelValSym$4] = values[level];
  const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym$6];
  const hook = this[hooksSym$4].logMethod;

  for (const key in values) {
    if (levelVal > values[key]) {
      this[key] = noop$9;
      continue
    }
    this[key] = isStandardLevel$1(key, useOnlyCustomLevelsVal) ? levelMethods$1[key](hook) : genLog$2(values[key], hook);
  }

  this.emit(
    'level-change',
    level,
    levelVal,
    labels[preLevelVal],
    preLevelVal
  );
}

function getLevel$3 (level) {
  const { levels, levelVal } = this;
  // protection against potential loss of Pino scope from serializers (edge case with circular refs - https://github.com/pinojs/pino/issues/833)
  return (levels && levels.labels) ? levels.labels[levelVal] : ''
}

function isLevelEnabled$3 (logLevel) {
  const { values } = this.levels;
  const logLevelVal = values[logLevel];
  return logLevelVal !== undefined && (logLevelVal >= this[levelValSym$4])
}

function mappings$5 (customLevels = null, useOnlyCustomLevels = false) {
  const customNums = customLevels
    /* eslint-disable */
    ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o
      }, {})
    : null;
    /* eslint-enable */

  const labels = Object.assign(
    Object.create(Object.prototype, { Infinity: { value: 'silent' } }),
    useOnlyCustomLevels ? null : nums$1,
    customNums
  );
  const values = Object.assign(
    Object.create(Object.prototype, { silent: { value: Infinity } }),
    useOnlyCustomLevels ? null : levels$2,
    customLevels
  );
  return { labels, values }
}

function assertDefaultLevelFound$3 (defaultLevel, customLevels, useOnlyCustomLevels) {
  if (typeof defaultLevel === 'number') {
    const values = [].concat(
      Object.keys(customLevels || {}).map(key => customLevels[key]),
      useOnlyCustomLevels ? [] : Object.keys(nums$1).map(level => +level),
      Infinity
    );
    if (!values.includes(defaultLevel)) {
      throw Error(`default level:${defaultLevel} must be included in custom levels`)
    }
    return
  }

  const labels = Object.assign(
    Object.create(Object.prototype, { silent: { value: Infinity } }),
    useOnlyCustomLevels ? null : levels$2,
    customLevels
  );
  if (!(defaultLevel in labels)) {
    throw Error(`default level:${defaultLevel} must be included in custom levels`)
  }
}

function assertNoLevelCollisions$3 (levels, customLevels) {
  const { labels, values } = levels;
  for (const k in customLevels) {
    if (k in values) {
      throw Error('levels cannot be overridden')
    }
    if (customLevels[k] in labels) {
      throw Error('pre-existing level values cannot be used for new levels')
    }
  }
}

var levels_1$1 = {
  initialLsCache: initialLsCache$3,
  genLsCache: genLsCache$5,
  levelMethods: levelMethods$1,
  getLevel: getLevel$3,
  setLevel: setLevel$3,
  isLevelEnabled: isLevelEnabled$3,
  mappings: mappings$5,
  assertNoLevelCollisions: assertNoLevelCollisions$3,
  assertDefaultLevelFound: assertDefaultLevelFound$3
};

var name$2 = "pino";
var version$e = "6.14.0";
var description$2 = "super fast, all natural json logger";
var main$4 = "pino.js";
var browser$5 = "./browser.js";
var files = [
	"pino.js",
	"bin.js",
	"browser.js",
	"pretty.js",
	"usage.txt",
	"test",
	"docs",
	"example.js",
	"lib"
];
var scripts$2 = {
	docs: "docsify serve",
	"browser-test": "airtap --local 8080 test/browser*test.js",
	lint: "eslint .",
	test: "npm run lint && tap --100 test/*test.js test/*/*test.js",
	"test-ci": "npm run lint && tap test/*test.js test/*/*test.js --coverage-report=lcovonly",
	"cov-ui": "tap --coverage-report=html test/*test.js test/*/*test.js",
	bench: "node benchmarks/utils/runbench all",
	"bench-basic": "node benchmarks/utils/runbench basic",
	"bench-object": "node benchmarks/utils/runbench object",
	"bench-deep-object": "node benchmarks/utils/runbench deep-object",
	"bench-multi-arg": "node benchmarks/utils/runbench multi-arg",
	"bench-longs-tring": "node benchmarks/utils/runbench long-string",
	"bench-child": "node benchmarks/utils/runbench child",
	"bench-child-child": "node benchmarks/utils/runbench child-child",
	"bench-child-creation": "node benchmarks/utils/runbench child-creation",
	"bench-formatters": "node benchmarks/utils/runbench formatters",
	"update-bench-doc": "node benchmarks/utils/generate-benchmark-doc > docs/benchmarks.md"
};
var bin = {
	pino: "./bin.js"
};
var precommit = "test";
var repository$2 = {
	type: "git",
	url: "git+https://github.com/pinojs/pino.git"
};
var keywords$2 = [
	"fast",
	"logger",
	"stream",
	"json"
];
var author$1 = "Matteo Collina <hello@matteocollina.com>";
var contributors = [
	"David Mark Clements <huperekchuno@googlemail.com>",
	"James Sumners <james.sumners@gmail.com>",
	"Thomas Watson Steen <w@tson.dk> (https://twitter.com/wa7son)"
];
var license$2 = "MIT";
var bugs$1 = {
	url: "https://github.com/pinojs/pino/issues"
};
var homepage$1 = "http://getpino.io";
var devDependencies$2 = {
	airtap: "4.0.3",
	benchmark: "^2.1.4",
	bole: "^4.0.0",
	bunyan: "^1.8.14",
	"docsify-cli": "^4.4.1",
	eslint: "^7.17.0",
	"eslint-config-standard": "^16.0.2",
	"eslint-plugin-import": "^2.22.1",
	"eslint-plugin-node": "^11.1.0",
	"eslint-plugin-promise": "^5.1.0",
	execa: "^5.0.0",
	fastbench: "^1.0.1",
	"flush-write-stream": "^2.0.0",
	"import-fresh": "^3.2.1",
	log: "^6.0.0",
	loglevel: "^1.6.7",
	"pino-pretty": "^5.0.0",
	"pre-commit": "^1.2.2",
	proxyquire: "^2.1.3",
	pump: "^3.0.0",
	semver: "^7.0.0",
	split2: "^3.1.1",
	steed: "^1.1.3",
	"strip-ansi": "^6.0.0",
	tap: "^15.0.1",
	tape: "^5.0.0",
	through2: "^4.0.0",
	winston: "^3.3.3"
};
var dependencies$1 = {
	"fast-redact": "^3.0.0",
	"fast-safe-stringify": "^2.0.8",
	"process-warning": "^1.0.0",
	flatstr: "^1.0.12",
	"pino-std-serializers": "^3.1.0",
	"quick-format-unescaped": "^4.0.3",
	"sonic-boom": "^1.0.2"
};
var require$$0$b = {
	name: name$2,
	version: version$e,
	description: description$2,
	main: main$4,
	browser: browser$5,
	files: files,
	scripts: scripts$2,
	bin: bin,
	precommit: precommit,
	repository: repository$2,
	keywords: keywords$2,
	author: author$1,
	contributors: contributors,
	license: license$2,
	bugs: bugs$1,
	homepage: homepage$1,
	devDependencies: devDependencies$2,
	dependencies: dependencies$1
};

const { version: version$d } = require$$0$b;

var meta$1 = { version: version$d };

/* eslint no-prototype-builtins: 0 */

const { EventEmitter: EventEmitter$4 } = require$$0$f;
const SonicBoom$2 = sonicBoom$1;
const flatstr = flatstr_1;
const warning = deprecations;
const {
  lsCacheSym: lsCacheSym$4,
  levelValSym: levelValSym$3,
  setLevelSym: setLevelSym$4,
  getLevelSym: getLevelSym$2,
  chindingsSym: chindingsSym$5,
  parsedChindingsSym: parsedChindingsSym$1,
  mixinSym: mixinSym$4,
  asJsonSym: asJsonSym$2,
  writeSym: writeSym$3,
  mixinMergeStrategySym: mixinMergeStrategySym$4,
  timeSym: timeSym$4,
  timeSliceIndexSym: timeSliceIndexSym$4,
  streamSym: streamSym$5,
  serializersSym: serializersSym$5,
  formattersSym: formattersSym$6,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$5,
  needsMetadataGsym: needsMetadataGsym$2,
  redactFmtSym: redactFmtSym$5,
  stringifySym: stringifySym$5,
  formatOptsSym: formatOptsSym$5,
  stringifiersSym: stringifiersSym$5
} = symbols$3;
const {
  getLevel: getLevel$2,
  setLevel: setLevel$2,
  isLevelEnabled: isLevelEnabled$2,
  mappings: mappings$4,
  initialLsCache: initialLsCache$2,
  genLsCache: genLsCache$4,
  assertNoLevelCollisions: assertNoLevelCollisions$2
} = levels_1$1;
const {
  asChindings: asChindings$4,
  asJson: asJson$2,
  buildFormatters: buildFormatters$4,
  stringify: stringify$9
} = tools$1;
const {
  version: version$c
} = meta$1;
const redaction$4 = redaction_1$1;

// note: use of class is satirical
// https://github.com/pinojs/pino/pull/433#pullrequestreview-127703127
const constructor$1 = class Pino {};
const prototype$1 = {
  constructor: constructor$1,
  child: child$1,
  bindings: bindings$1,
  setBindings: setBindings$1,
  flush: flush$3,
  isLevelEnabled: isLevelEnabled$2,
  version: version$c,
  get level () { return this[getLevelSym$2]() },
  set level (lvl) { this[setLevelSym$4](lvl); },
  get levelVal () { return this[levelValSym$3] },
  set levelVal (n) { throw Error('levelVal is read-only') },
  [lsCacheSym$4]: initialLsCache$2,
  [writeSym$3]: write$2,
  [asJsonSym$2]: asJson$2,
  [getLevelSym$2]: getLevel$2,
  [setLevelSym$4]: setLevel$2
};

Object.setPrototypeOf(prototype$1, EventEmitter$4.prototype);

// exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing
var proto$4 = function () {
  return Object.create(prototype$1)
};

const resetChildingsFormatter$1 = bindings => bindings;
function child$1 (bindings, options) {
  if (!bindings) {
    throw Error('missing bindings for child Pino')
  }
  options = options || {}; // default options to empty object
  const serializers = this[serializersSym$5];
  const formatters = this[formattersSym$6];
  const instance = Object.create(this);

  if (bindings.hasOwnProperty('serializers') === true) {
    warning.emit('PINODEP004');
    options.serializers = bindings.serializers;
  }
  if (bindings.hasOwnProperty('formatters') === true) {
    warning.emit('PINODEP005');
    options.formatters = bindings.formatters;
  }
  if (bindings.hasOwnProperty('customLevels') === true) {
    warning.emit('PINODEP006');
    options.customLevels = bindings.customLevels;
  }
  if (bindings.hasOwnProperty('level') === true) {
    warning.emit('PINODEP007');
    options.level = bindings.level;
  }
  if (options.hasOwnProperty('serializers') === true) {
    instance[serializersSym$5] = Object.create(null);

    for (const k in serializers) {
      instance[serializersSym$5][k] = serializers[k];
    }
    const parentSymbols = Object.getOwnPropertySymbols(serializers);
    /* eslint no-var: off */
    for (var i = 0; i < parentSymbols.length; i++) {
      const ks = parentSymbols[i];
      instance[serializersSym$5][ks] = serializers[ks];
    }

    for (const bk in options.serializers) {
      instance[serializersSym$5][bk] = options.serializers[bk];
    }
    const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
    for (var bi = 0; bi < bindingsSymbols.length; bi++) {
      const bks = bindingsSymbols[bi];
      instance[serializersSym$5][bks] = options.serializers[bks];
    }
  } else instance[serializersSym$5] = serializers;
  if (options.hasOwnProperty('formatters')) {
    const { level, bindings: chindings, log } = options.formatters;
    instance[formattersSym$6] = buildFormatters$4(
      level || formatters.level,
      chindings || resetChildingsFormatter$1,
      log || formatters.log
    );
  } else {
    instance[formattersSym$6] = buildFormatters$4(
      formatters.level,
      resetChildingsFormatter$1,
      formatters.log
    );
  }
  if (options.hasOwnProperty('customLevels') === true) {
    assertNoLevelCollisions$2(this.levels, options.customLevels);
    instance.levels = mappings$4(options.customLevels, instance[useOnlyCustomLevelsSym$5]);
    genLsCache$4(instance);
  }

  // redact must place before asChindings and only replace if exist
  if ((typeof options.redact === 'object' && options.redact !== null) || Array.isArray(options.redact)) {
    instance.redact = options.redact; // replace redact directly
    const stringifiers = redaction$4(instance.redact, stringify$9);
    const formatOpts = { stringify: stringifiers[redactFmtSym$5] };
    instance[stringifySym$5] = stringify$9;
    instance[stringifiersSym$5] = stringifiers;
    instance[formatOptsSym$5] = formatOpts;
  }

  instance[chindingsSym$5] = asChindings$4(instance, bindings);
  const childLevel = options.level || this.level;
  instance[setLevelSym$4](childLevel);

  return instance
}

function bindings$1 () {
  const chindings = this[chindingsSym$5];
  const chindingsJson = `{${chindings.substr(1)}}`; // at least contains ,"pid":7068,"hostname":"myMac"
  const bindingsFromJson = JSON.parse(chindingsJson);
  delete bindingsFromJson.pid;
  delete bindingsFromJson.hostname;
  return bindingsFromJson
}

function setBindings$1 (newBindings) {
  const chindings = asChindings$4(this, newBindings);
  this[chindingsSym$5] = chindings;
  delete this[parsedChindingsSym$1];
}

/**
 * Default strategy for creating `mergeObject` from arguments and the result from `mixin()`.
 * Fields from `mergeObject` have higher priority in this strategy.
 *
 * @param {Object} mergeObject The object a user has supplied to the logging function.
 * @param {Object} mixinObject The result of the `mixin` method.
 * @return {Object}
 */
function defaultMixinMergeStrategy$1 (mergeObject, mixinObject) {
  return Object.assign(mixinObject, mergeObject)
}

function write$2 (_obj, msg, num) {
  const t = this[timeSym$4]();
  const mixin = this[mixinSym$4];
  const mixinMergeStrategy = this[mixinMergeStrategySym$4] || defaultMixinMergeStrategy$1;
  const objError = _obj instanceof Error;
  let obj;

  if (_obj === undefined || _obj === null) {
    obj = mixin ? mixin({}) : {};
  } else {
    obj = mixinMergeStrategy(_obj, mixin ? mixin(_obj) : {});
    if (!msg && objError) {
      msg = _obj.message;
    }

    if (objError) {
      obj.stack = _obj.stack;
      if (!obj.type) {
        obj.type = 'Error';
      }
    }
  }

  const s = this[asJsonSym$2](obj, msg, num, t);

  const stream = this[streamSym$5];
  if (stream[needsMetadataGsym$2] === true) {
    stream.lastLevel = num;
    stream.lastObj = obj;
    stream.lastMsg = msg;
    stream.lastTime = t.slice(this[timeSliceIndexSym$4]);
    stream.lastLogger = this; // for child loggers
  }
  if (stream instanceof SonicBoom$2) stream.write(s);
  else stream.write(flatstr(s));
}

function flush$3 () {
  const stream = this[streamSym$5];
  if ('flush' in stream) stream.flush();
}

/* eslint no-prototype-builtins: 0 */
const os$8 = require$$0$h;
const stdSerializers$1 = pinoStdSerializers$2;
const redaction$3 = redaction_1$1;
const time$3 = time$4;
const proto$3 = proto$4;
const symbols$2 = symbols$3;
const { assertDefaultLevelFound: assertDefaultLevelFound$2, mappings: mappings$3, genLsCache: genLsCache$3 } = levels_1$1;
const {
  createArgsNormalizer: createArgsNormalizer$2,
  asChindings: asChindings$3,
  final,
  stringify: stringify$8,
  buildSafeSonicBoom: buildSafeSonicBoom$2,
  buildFormatters: buildFormatters$3,
  noop: noop$8
} = tools$1;
const { version: version$b } = meta$1;
const { mixinMergeStrategySym: mixinMergeStrategySym$3 } = symbols$3;
const {
  chindingsSym: chindingsSym$4,
  redactFmtSym: redactFmtSym$4,
  serializersSym: serializersSym$4,
  timeSym: timeSym$3,
  timeSliceIndexSym: timeSliceIndexSym$3,
  streamSym: streamSym$4,
  stringifySym: stringifySym$4,
  stringifiersSym: stringifiersSym$4,
  setLevelSym: setLevelSym$3,
  endSym: endSym$3,
  formatOptsSym: formatOptsSym$4,
  messageKeySym: messageKeySym$3,
  nestedKeySym: nestedKeySym$3,
  mixinSym: mixinSym$3,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$4,
  formattersSym: formattersSym$5,
  hooksSym: hooksSym$3
} = symbols$2;
const { epochTime: epochTime$2, nullTime: nullTime$2 } = time$3;
const { pid: pid$1 } = process;
const hostname$1 = os$8.hostname();
const defaultErrorSerializer$1 = stdSerializers$1.err;
const defaultOptions$3 = {
  level: 'info',
  messageKey: 'msg',
  nestedKey: null,
  enabled: true,
  prettyPrint: false,
  base: { pid: pid$1, hostname: hostname$1 },
  serializers: Object.assign(Object.create(null), {
    err: defaultErrorSerializer$1
  }),
  formatters: Object.assign(Object.create(null), {
    bindings (bindings) {
      return bindings
    },
    level (label, number) {
      return { level: number }
    }
  }),
  hooks: {
    logMethod: undefined
  },
  timestamp: epochTime$2,
  name: undefined,
  redact: null,
  customLevels: null,
  levelKey: undefined,
  useOnlyCustomLevels: false
};

const normalize$5 = createArgsNormalizer$2(defaultOptions$3);

const serializers$2 = Object.assign(Object.create(null), stdSerializers$1);

function pino$6 (...args) {
  const instance = {};
  const { opts, stream } = normalize$5(instance, ...args);
  const {
    redact,
    crlf,
    serializers,
    timestamp,
    messageKey,
    nestedKey,
    base,
    name,
    level,
    customLevels,
    useLevelLabels,
    changeLevelName,
    levelKey,
    mixin,
    mixinMergeStrategy,
    useOnlyCustomLevels,
    formatters,
    hooks
  } = opts;

  const allFormatters = buildFormatters$3(
    formatters.level,
    formatters.bindings,
    formatters.log
  );

  if (useLevelLabels && !(changeLevelName || levelKey)) {
    process.emitWarning('useLevelLabels is deprecated, use the formatters.level option instead', 'Warning', 'PINODEP001');
    allFormatters.level = labelsFormatter;
  } else if ((changeLevelName || levelKey) && !useLevelLabels) {
    process.emitWarning('changeLevelName and levelKey are deprecated, use the formatters.level option instead', 'Warning', 'PINODEP002');
    allFormatters.level = levelNameFormatter(changeLevelName || levelKey);
  } else if ((changeLevelName || levelKey) && useLevelLabels) {
    process.emitWarning('useLevelLabels is deprecated, use the formatters.level option instead', 'Warning', 'PINODEP001');
    process.emitWarning('changeLevelName and levelKey are deprecated, use the formatters.level option instead', 'Warning', 'PINODEP002');
    allFormatters.level = levelNameLabelFormatter(changeLevelName || levelKey);
  }

  if (serializers[Symbol.for('pino.*')]) {
    process.emitWarning('The pino.* serializer is deprecated, use the formatters.log options instead', 'Warning', 'PINODEP003');
    allFormatters.log = serializers[Symbol.for('pino.*')];
  }

  if (!allFormatters.bindings) {
    allFormatters.bindings = defaultOptions$3.formatters.bindings;
  }
  if (!allFormatters.level) {
    allFormatters.level = defaultOptions$3.formatters.level;
  }

  const stringifiers = redact ? redaction$3(redact, stringify$8) : {};
  const formatOpts = redact
    ? { stringify: stringifiers[redactFmtSym$4] }
    : { stringify: stringify$8 };
  const end = '}' + (crlf ? '\r\n' : '\n');
  const coreChindings = asChindings$3.bind(null, {
    [chindingsSym$4]: '',
    [serializersSym$4]: serializers,
    [stringifiersSym$4]: stringifiers,
    [stringifySym$4]: stringify$8,
    [formattersSym$5]: allFormatters
  });

  let chindings = '';
  if (base !== null) {
    if (name === undefined) {
      chindings = coreChindings(base);
    } else {
      chindings = coreChindings(Object.assign({}, base, { name }));
    }
  }

  const time = (timestamp instanceof Function)
    ? timestamp
    : (timestamp ? epochTime$2 : nullTime$2);
  const timeSliceIndex = time().indexOf(':') + 1;

  if (useOnlyCustomLevels && !customLevels) throw Error('customLevels is required if useOnlyCustomLevels is set true')
  if (mixin && typeof mixin !== 'function') throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`)

  assertDefaultLevelFound$2(level, customLevels, useOnlyCustomLevels);
  const levels = mappings$3(customLevels, useOnlyCustomLevels);

  Object.assign(instance, {
    levels,
    [useOnlyCustomLevelsSym$4]: useOnlyCustomLevels,
    [streamSym$4]: stream,
    [timeSym$3]: time,
    [timeSliceIndexSym$3]: timeSliceIndex,
    [stringifySym$4]: stringify$8,
    [stringifiersSym$4]: stringifiers,
    [endSym$3]: end,
    [formatOptsSym$4]: formatOpts,
    [messageKeySym$3]: messageKey,
    [nestedKeySym$3]: nestedKey,
    [serializersSym$4]: serializers,
    [mixinSym$3]: mixin,
    [mixinMergeStrategySym$3]: mixinMergeStrategy,
    [chindingsSym$4]: chindings,
    [formattersSym$5]: allFormatters,
    [hooksSym$3]: hooks,
    silent: noop$8
  });

  Object.setPrototypeOf(instance, proto$3());

  genLsCache$3(instance);

  instance[setLevelSym$3](level);

  return instance
}

function labelsFormatter (label, number) {
  return { level: label }
}

function levelNameFormatter (name) {
  return function (label, number) {
    return { [name]: number }
  }
}

function levelNameLabelFormatter (name) {
  return function (label, number) {
    return { [name]: label }
  }
}

pino$7.exports = pino$6;

pinoExports$1.extreme = (dest = process.stdout.fd) => {
  process.emitWarning(
    'The pino.extreme() option is deprecated and will be removed in v7. Use pino.destination({ sync: false }) instead.',
    { code: 'extreme_deprecation' }
  );
  return buildSafeSonicBoom$2({ dest, minLength: 4096, sync: false })
};

pinoExports$1.destination = (dest = process.stdout.fd) => {
  if (typeof dest === 'object') {
    dest.dest = dest.dest || process.stdout.fd;
    return buildSafeSonicBoom$2(dest)
  } else {
    return buildSafeSonicBoom$2({ dest, minLength: 0, sync: true })
  }
};

pinoExports$1.final = final;
pinoExports$1.levels = mappings$3();
pinoExports$1.stdSerializers = serializers$2;
pinoExports$1.stdTimeFunctions = Object.assign({}, time$3);
pinoExports$1.symbols = symbols$2;
pinoExports$1.version = version$b;

// Enables default and name export with TypeScript and Babel
pinoExports$1.default = pino$6;
pinoExports$1.pino = pino$6;

var readableExports = {};
var readable = {
  get exports(){ return readableExports; },
  set exports(v){ readableExports = v; },
};

var streamExports = {};
var stream$2 = {
  get exports(){ return streamExports; },
  set exports(v){ streamExports = v; },
};

var hasRequiredStream;

function requireStream () {
	if (hasRequiredStream) return streamExports;
	hasRequiredStream = 1;
	(function (module) {
		module.exports = Stream$2;
} (stream$2));
	return streamExports;
}

var buffer_list;
var hasRequiredBuffer_list;

function requireBuffer_list () {
	if (hasRequiredBuffer_list) return buffer_list;
	hasRequiredBuffer_list = 1;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	var _require = require$$0$i,
	    Buffer = _require.Buffer;

	var _require2 = require$$1$7,
	    inspect = _require2.inspect;

	var custom = inspect && inspect.custom || 'inspect';

	function copyBuffer(src, target, offset) {
	  Buffer.prototype.copy.call(src, target, offset);
	}

	buffer_list =
	/*#__PURE__*/
	function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  _createClass(BufferList, [{
	    key: "push",
	    value: function push(v) {
	      var entry = {
	        data: v,
	        next: null
	      };
	      if (this.length > 0) this.tail.next = entry;else this.head = entry;
	      this.tail = entry;
	      ++this.length;
	    }
	  }, {
	    key: "unshift",
	    value: function unshift(v) {
	      var entry = {
	        data: v,
	        next: this.head
	      };
	      if (this.length === 0) this.tail = entry;
	      this.head = entry;
	      ++this.length;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      if (this.length === 0) return;
	      var ret = this.head.data;
	      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	      --this.length;
	      return ret;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.head = this.tail = null;
	      this.length = 0;
	    }
	  }, {
	    key: "join",
	    value: function join(s) {
	      if (this.length === 0) return '';
	      var p = this.head;
	      var ret = '' + p.data;

	      while (p = p.next) {
	        ret += s + p.data;
	      }

	      return ret;
	    }
	  }, {
	    key: "concat",
	    value: function concat(n) {
	      if (this.length === 0) return Buffer.alloc(0);
	      var ret = Buffer.allocUnsafe(n >>> 0);
	      var p = this.head;
	      var i = 0;

	      while (p) {
	        copyBuffer(p.data, ret, i);
	        i += p.data.length;
	        p = p.next;
	      }

	      return ret;
	    } // Consumes a specified amount of bytes or characters from the buffered data.

	  }, {
	    key: "consume",
	    value: function consume(n, hasStrings) {
	      var ret;

	      if (n < this.head.data.length) {
	        // `slice` is the same for buffers and strings.
	        ret = this.head.data.slice(0, n);
	        this.head.data = this.head.data.slice(n);
	      } else if (n === this.head.data.length) {
	        // First chunk is a perfect match.
	        ret = this.shift();
	      } else {
	        // Result spans more than one buffer.
	        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
	      }

	      return ret;
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.head.data;
	    } // Consumes a specified amount of characters from the buffered data.

	  }, {
	    key: "_getString",
	    value: function _getString(n) {
	      var p = this.head;
	      var c = 1;
	      var ret = p.data;
	      n -= ret.length;

	      while (p = p.next) {
	        var str = p.data;
	        var nb = n > str.length ? str.length : n;
	        if (nb === str.length) ret += str;else ret += str.slice(0, n);
	        n -= nb;

	        if (n === 0) {
	          if (nb === str.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = str.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Consumes a specified amount of bytes from the buffered data.

	  }, {
	    key: "_getBuffer",
	    value: function _getBuffer(n) {
	      var ret = Buffer.allocUnsafe(n);
	      var p = this.head;
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
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = buf.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Make sure the linked list only shows the minimal necessary information.

	  }, {
	    key: custom,
	    value: function value(_, options) {
	      return inspect(this, _objectSpread({}, options, {
	        // Only inspect one level.
	        depth: 0,
	        // It should not recurse.
	        customInspect: false
	      }));
	    }
	  }]);

	  return BufferList;
	}();
	return buffer_list;
}

var destroy_1$1;
var hasRequiredDestroy$1;

function requireDestroy$1 () {
	if (hasRequiredDestroy$1) return destroy_1$1;
	hasRequiredDestroy$1 = 1;

	function destroy(err, cb) {
	  var _this = this;

	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;

	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err) {
	      if (!this._writableState) {
	        process.nextTick(emitErrorNT, this, err);
	      } else if (!this._writableState.errorEmitted) {
	        this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorNT, this, err);
	      }
	    }

	    return this;
	  } // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks


	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  } // if this is a duplex stream mark the writable part as destroyed as well


	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }

	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      if (!_this._writableState) {
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else if (!_this._writableState.errorEmitted) {
	        _this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else {
	        process.nextTick(emitCloseNT, _this);
	      }
	    } else if (cb) {
	      process.nextTick(emitCloseNT, _this);
	      cb(err);
	    } else {
	      process.nextTick(emitCloseNT, _this);
	    }
	  });

	  return this;
	}

	function emitErrorAndCloseNT(self, err) {
	  emitErrorNT(self, err);
	  emitCloseNT(self);
	}

	function emitCloseNT(self) {
	  if (self._writableState && !self._writableState.emitClose) return;
	  if (self._readableState && !self._readableState.emitClose) return;
	  self.emit('close');
	}

	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }

	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finalCalled = false;
	    this._writableState.prefinished = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}

	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}

	function errorOrDestroy(stream, err) {
	  // We have tests that rely on errors being emitted
	  // in the same tick, so changing this is semver major.
	  // For now when you opt-in to autoDestroy we allow
	  // the error to be emitted nextTick. In a future
	  // semver major update we should change the default to this.
	  var rState = stream._readableState;
	  var wState = stream._writableState;
	  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
	}

	destroy_1$1 = {
	  destroy: destroy,
	  undestroy: undestroy,
	  errorOrDestroy: errorOrDestroy
	};
	return destroy_1$1;
}

var errors$2 = {};

var hasRequiredErrors;

function requireErrors () {
	if (hasRequiredErrors) return errors$2;
	hasRequiredErrors = 1;

	const codes = {};

	function createErrorType(code, message, Base) {
	  if (!Base) {
	    Base = Error;
	  }

	  function getMessage (arg1, arg2, arg3) {
	    if (typeof message === 'string') {
	      return message
	    } else {
	      return message(arg1, arg2, arg3)
	    }
	  }

	  class NodeError extends Base {
	    constructor (arg1, arg2, arg3) {
	      super(getMessage(arg1, arg2, arg3));
	    }
	  }

	  NodeError.prototype.name = Base.name;
	  NodeError.prototype.code = code;

	  codes[code] = NodeError;
	}

	// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
	function oneOf(expected, thing) {
	  if (Array.isArray(expected)) {
	    const len = expected.length;
	    expected = expected.map((i) => String(i));
	    if (len > 2) {
	      return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` +
	             expected[len - 1];
	    } else if (len === 2) {
	      return `one of ${thing} ${expected[0]} or ${expected[1]}`;
	    } else {
	      return `of ${thing} ${expected[0]}`;
	    }
	  } else {
	    return `of ${thing} ${String(expected)}`;
	  }
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	function startsWith(str, search, pos) {
		return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
	function endsWith(str, search, this_len) {
		if (this_len === undefined || this_len > str.length) {
			this_len = str.length;
		}
		return str.substring(this_len - search.length, this_len) === search;
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
	function includes(str, search, start) {
	  if (typeof start !== 'number') {
	    start = 0;
	  }

	  if (start + search.length > str.length) {
	    return false;
	  } else {
	    return str.indexOf(search, start) !== -1;
	  }
	}

	createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
	  return 'The value "' + value + '" is invalid for option "' + name + '"'
	}, TypeError);
	createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
	  // determiner: 'must be' or 'must not be'
	  let determiner;
	  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
	    determiner = 'must not be';
	    expected = expected.replace(/^not /, '');
	  } else {
	    determiner = 'must be';
	  }

	  let msg;
	  if (endsWith(name, ' argument')) {
	    // For cases like 'first argument'
	    msg = `The ${name} ${determiner} ${oneOf(expected, 'type')}`;
	  } else {
	    const type = includes(name, '.') ? 'property' : 'argument';
	    msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, 'type')}`;
	  }

	  msg += `. Received type ${typeof actual}`;
	  return msg;
	}, TypeError);
	createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
	createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
	  return 'The ' + name + ' method is not implemented'
	});
	createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
	createErrorType('ERR_STREAM_DESTROYED', function (name) {
	  return 'Cannot call ' + name + ' after a stream was destroyed';
	});
	createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
	createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
	createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
	createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
	createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
	  return 'Unknown encoding: ' + arg
	}, TypeError);
	createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');

	errors$2.codes = codes;
	return errors$2;
}

var state;
var hasRequiredState$1;

function requireState$1 () {
	if (hasRequiredState$1) return state;
	hasRequiredState$1 = 1;

	var ERR_INVALID_OPT_VALUE = requireErrors().codes.ERR_INVALID_OPT_VALUE;

	function highWaterMarkFrom(options, isDuplex, duplexKey) {
	  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
	}

	function getHighWaterMark(state, options, duplexKey, isDuplex) {
	  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

	  if (hwm != null) {
	    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
	      var name = isDuplex ? duplexKey : 'highWaterMark';
	      throw new ERR_INVALID_OPT_VALUE(name, hwm);
	    }

	    return Math.floor(hwm);
	  } // Default value


	  return state.objectMode ? 16 : 16 * 1024;
	}

	state = {
	  getHighWaterMark: getHighWaterMark
	};
	return state;
}

var inheritsExports = {};
var inherits$2 = {
  get exports(){ return inheritsExports; },
  set exports(v){ inheritsExports = v; },
};

var inherits_browserExports = {};
var inherits_browser = {
  get exports(){ return inherits_browserExports; },
  set exports(v){ inherits_browserExports = v; },
};

var hasRequiredInherits_browser;

function requireInherits_browser () {
	if (hasRequiredInherits_browser) return inherits_browserExports;
	hasRequiredInherits_browser = 1;
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	return inherits_browserExports;
}

var hasRequiredInherits;

function requireInherits () {
	if (hasRequiredInherits) return inheritsExports;
	hasRequiredInherits = 1;
	(function (module) {
		try {
		  var util = require('util');
		  /* istanbul ignore next */
		  if (typeof util.inherits !== 'function') throw '';
		  module.exports = util.inherits;
		} catch (e) {
		  /* istanbul ignore next */
		  module.exports = requireInherits_browser();
		}
} (inherits$2));
	return inheritsExports;
}

var node$7;
var hasRequiredNode$6;

function requireNode$6 () {
	if (hasRequiredNode$6) return node$7;
	hasRequiredNode$6 = 1;
	/**
	 * For Node.js, simply re-export the core `util.deprecate` function.
	 */

	node$7 = require$$1$7.deprecate;
	return node$7;
}

var _stream_writable$2;
var hasRequired_stream_writable;

function require_stream_writable () {
	if (hasRequired_stream_writable) return _stream_writable$2;
	hasRequired_stream_writable = 1;

	_stream_writable$2 = Writable;
	// there will be only 2 of these for each stream


	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/


	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;
	/*<replacement>*/

	var internalUtil = {
	  deprecate: requireNode$6()
	};
	/*</replacement>*/

	/*<replacement>*/

	var Stream = requireStream();
	/*</replacement>*/


	var Buffer = require$$0$i.Buffer;

	var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	var destroyImpl = requireDestroy$1();

	var _require = requireState$1(),
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes = requireErrors().codes,
	    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
	    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
	    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
	    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
	    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

	var errorOrDestroy = destroyImpl.errorOrDestroy;

	requireInherits()(Writable, Stream);

	function nop() {}

	function WritableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream,
	  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()

	  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

	  this.finalCalled = false; // drain event flag.

	  this.needDrain = false; // at the start of calling end()

	  this.ending = false; // when end() has been called, and returned

	  this.ended = false; // when 'finish' is emitted

	  this.finished = false; // has it been destroyed

	  this.destroyed = false; // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.

	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.

	  this.length = 0; // a flag to see when we're in the middle of a write.

	  this.writing = false; // when true all writes will be buffered until .uncork() call

	  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.

	  this.sync = true; // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.

	  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  }; // the callback that the user supplies to write(chunk,encoding,cb)


	  this.writecb = null; // the amount that is being written when _write is called.

	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted

	  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams

	  this.prefinished = false; // True if the error was already emitted and should not be thrown again

	  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

	  this.autoDestroy = !!options.autoDestroy; // count buffered requests

	  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two

	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];

	  while (current) {
	    out.push(current);
	    current = current.next;
	  }

	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function writableStateBufferGetter() {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})(); // Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.


	var realHasInstance;

	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function value(object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable) return false;
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function realHasInstance(object) {
	    return object instanceof this;
	  };
	}

	function Writable(options) {
	  Duplex = Duplex || require_stream_duplex(); // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the WritableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex;
	  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
	  this._writableState = new WritableState(options, this, isDuplex); // legacy.

	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	    if (typeof options.final === 'function') this._final = options.final;
	  }

	  Stream.call(this);
	} // Otherwise people can pipe Writable streams, which is just wrong.


	Writable.prototype.pipe = function () {
	  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};

	function writeAfterEnd(stream, cb) {
	  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

	  errorOrDestroy(stream, er);
	  process.nextTick(cb, er);
	} // Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.


	function validChunk(stream, state, chunk, cb) {
	  var er;

	  if (chunk === null) {
	    er = new ERR_STREAM_NULL_VALUES();
	  } else if (typeof chunk !== 'string' && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
	  }

	  if (er) {
	    errorOrDestroy(stream, er);
	    process.nextTick(cb, er);
	    return false;
	  }

	  return true;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  var isBuf = !state.objectMode && _isUint8Array(chunk);

	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	  return ret;
	};

	Writable.prototype.cork = function () {
	  this._writableState.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	Object.defineProperty(Writable.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }

	  return chunk;
	}

	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	}); // if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.

	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);

	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }

	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };

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

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;

	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    process.nextTick(cb, er); // this can emit finish, and it will always happen
	    // after error

	    process.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er); // this can emit finish, but finish must
	    // always follow error

	    finishMaybe(stream, state);
	  }
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state) || stream.destroyed;

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(afterWrite, stream, state, finished, cb);
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	} // Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.


	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	} // if there's something in the buffer waiting, then process it


	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    var allBuffers = true;

	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }

	    buffer.allBuffers = allBuffers;
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite

	    state.pendingcb++;
	    state.lastBufferedRequest = null;

	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }

	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.

	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  } // ignore unnecessary end() calls.


	  if (!state.ending) endWritable(this, state, cb);
	  return this;
	};

	Object.defineProperty(Writable.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;

	    if (err) {
	      errorOrDestroy(stream, err);
	    }

	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}

	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function' && !state.destroyed) {
	      state.pendingcb++;
	      state.finalCalled = true;
	      process.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);

	  if (need) {
	    prefinish(stream, state);

	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');

	      if (state.autoDestroy) {
	        // In case of duplex streams we need a way to detect
	        // if the readable side is ready for autoDestroy as well
	        var rState = stream._readableState;

	        if (!rState || rState.autoDestroy && rState.endEmitted) {
	          stream.destroy();
	        }
	      }
	    }
	  }

	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);

	  if (cb) {
	    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
	  }

	  state.ended = true;
	  stream.writable = false;
	}

	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;

	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  } // reuse the free corkReq.


	  state.corkedRequestsFree.next = corkReq;
	}

	Object.defineProperty(Writable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._writableState === undefined) {
	      return false;
	    }

	    return this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._writableState.destroyed = value;
	  }
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;

	Writable.prototype._destroy = function (err, cb) {
	  cb(err);
	};
	return _stream_writable$2;
}

var _stream_duplex$2;
var hasRequired_stream_duplex;

function require_stream_duplex () {
	if (hasRequired_stream_duplex) return _stream_duplex$2;
	hasRequired_stream_duplex = 1;
	/*<replacement>*/

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];

	  for (var key in obj) {
	    keys.push(key);
	  }

	  return keys;
	};
	/*</replacement>*/


	_stream_duplex$2 = Duplex;

	var Readable = require_stream_readable();

	var Writable = require_stream_writable();

	requireInherits()(Duplex, Readable);

	{
	  // Allow the keys array to be GC'ed.
	  var keys = objectKeys(Writable.prototype);

	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	  }
	}

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  this.allowHalfOpen = true;

	  if (options) {
	    if (options.readable === false) this.readable = false;
	    if (options.writable === false) this.writable = false;

	    if (options.allowHalfOpen === false) {
	      this.allowHalfOpen = false;
	      this.once('end', onend);
	    }
	  }
	}

	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	}); // the no-half-open enforcer

	function onend() {
	  // If the writable side ended, then we're ok.
	  if (this._writableState.ended) return; // no more data can be written.
	  // But allow more writes to happen in this tick.

	  process.nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	return _stream_duplex$2;
}

var string_decoder$2 = {};

var safeBufferExports = {};
var safeBuffer = {
  get exports(){ return safeBufferExports; },
  set exports(v){ safeBufferExports = v; },
};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

(function (module, exports) {
	/* eslint-disable node/no-deprecated-api */
	var buffer = require$$0$i;
	var Buffer = buffer.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.prototype = Object.create(Buffer.prototype);

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	};
} (safeBuffer, safeBufferExports));

var hasRequiredString_decoder;

function requireString_decoder () {
	if (hasRequiredString_decoder) return string_decoder$2;
	hasRequiredString_decoder = 1;

	/*<replacement>*/

	var Buffer = safeBufferExports.Buffer;
	/*</replacement>*/

	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	}
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	string_decoder$2.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}
	return string_decoder$2;
}

var endOfStream;
var hasRequiredEndOfStream;

function requireEndOfStream () {
	if (hasRequiredEndOfStream) return endOfStream;
	hasRequiredEndOfStream = 1;

	var ERR_STREAM_PREMATURE_CLOSE = requireErrors().codes.ERR_STREAM_PREMATURE_CLOSE;

	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    callback.apply(this, args);
	  };
	}

	function noop() {}

	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}

	function eos(stream, opts, callback) {
	  if (typeof opts === 'function') return eos(stream, null, opts);
	  if (!opts) opts = {};
	  callback = once(callback || noop);
	  var readable = opts.readable || opts.readable !== false && stream.readable;
	  var writable = opts.writable || opts.writable !== false && stream.writable;

	  var onlegacyfinish = function onlegacyfinish() {
	    if (!stream.writable) onfinish();
	  };

	  var writableEnded = stream._writableState && stream._writableState.finished;

	  var onfinish = function onfinish() {
	    writable = false;
	    writableEnded = true;
	    if (!readable) callback.call(stream);
	  };

	  var readableEnded = stream._readableState && stream._readableState.endEmitted;

	  var onend = function onend() {
	    readable = false;
	    readableEnded = true;
	    if (!writable) callback.call(stream);
	  };

	  var onerror = function onerror(err) {
	    callback.call(stream, err);
	  };

	  var onclose = function onclose() {
	    var err;

	    if (readable && !readableEnded) {
	      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }

	    if (writable && !writableEnded) {
	      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }
	  };

	  var onrequest = function onrequest() {
	    stream.req.on('finish', onfinish);
	  };

	  if (isRequest(stream)) {
	    stream.on('complete', onfinish);
	    stream.on('abort', onclose);
	    if (stream.req) onrequest();else stream.on('request', onrequest);
	  } else if (writable && !stream._writableState) {
	    // legacy streams
	    stream.on('end', onlegacyfinish);
	    stream.on('close', onlegacyfinish);
	  }

	  stream.on('end', onend);
	  stream.on('finish', onfinish);
	  if (opts.error !== false) stream.on('error', onerror);
	  stream.on('close', onclose);
	  return function () {
	    stream.removeListener('complete', onfinish);
	    stream.removeListener('abort', onclose);
	    stream.removeListener('request', onrequest);
	    if (stream.req) stream.req.removeListener('finish', onfinish);
	    stream.removeListener('end', onlegacyfinish);
	    stream.removeListener('close', onlegacyfinish);
	    stream.removeListener('finish', onfinish);
	    stream.removeListener('end', onend);
	    stream.removeListener('error', onerror);
	    stream.removeListener('close', onclose);
	  };
	}

	endOfStream = eos;
	return endOfStream;
}

var async_iterator;
var hasRequiredAsync_iterator;

function requireAsync_iterator () {
	if (hasRequiredAsync_iterator) return async_iterator;
	hasRequiredAsync_iterator = 1;

	var _Object$setPrototypeO;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var finished = requireEndOfStream();

	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');

	function createIterResult(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	}

	function readAndResolve(iter) {
	  var resolve = iter[kLastResolve];

	  if (resolve !== null) {
	    var data = iter[kStream].read(); // we defer if data is null
	    // we can be expecting either 'end' or
	    // 'error'

	    if (data !== null) {
	      iter[kLastPromise] = null;
	      iter[kLastResolve] = null;
	      iter[kLastReject] = null;
	      resolve(createIterResult(data, false));
	    }
	  }
	}

	function onReadable(iter) {
	  // we wait for the next tick, because it might
	  // emit an error with process.nextTick
	  process.nextTick(readAndResolve, iter);
	}

	function wrapForNext(lastPromise, iter) {
	  return function (resolve, reject) {
	    lastPromise.then(function () {
	      if (iter[kEnded]) {
	        resolve(createIterResult(undefined, true));
	        return;
	      }

	      iter[kHandlePromise](resolve, reject);
	    }, reject);
	  };
	}

	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
	  get stream() {
	    return this[kStream];
	  },

	  next: function next() {
	    var _this = this;

	    // if we have detected an error in the meanwhile
	    // reject straight away
	    var error = this[kError];

	    if (error !== null) {
	      return Promise.reject(error);
	    }

	    if (this[kEnded]) {
	      return Promise.resolve(createIterResult(undefined, true));
	    }

	    if (this[kStream].destroyed) {
	      // We need to defer via nextTick because if .destroy(err) is
	      // called, the error will be emitted via nextTick, and
	      // we cannot guarantee that there is no error lingering around
	      // waiting to be emitted.
	      return new Promise(function (resolve, reject) {
	        process.nextTick(function () {
	          if (_this[kError]) {
	            reject(_this[kError]);
	          } else {
	            resolve(createIterResult(undefined, true));
	          }
	        });
	      });
	    } // if we have multiple next() calls
	    // we will wait for the previous Promise to finish
	    // this logic is optimized to support for await loops,
	    // where next() is only called once at a time


	    var lastPromise = this[kLastPromise];
	    var promise;

	    if (lastPromise) {
	      promise = new Promise(wrapForNext(lastPromise, this));
	    } else {
	      // fast path needed to support multiple this.push()
	      // without triggering the next() queue
	      var data = this[kStream].read();

	      if (data !== null) {
	        return Promise.resolve(createIterResult(data, false));
	      }

	      promise = new Promise(this[kHandlePromise]);
	    }

	    this[kLastPromise] = promise;
	    return promise;
	  }
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
	  return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
	  var _this2 = this;

	  // destroy(err, cb) is a private API
	  // we can guarantee we have that here, because we control the
	  // Readable class this is attached to
	  return new Promise(function (resolve, reject) {
	    _this2[kStream].destroy(null, function (err) {
	      if (err) {
	        reject(err);
	        return;
	      }

	      resolve(createIterResult(undefined, true));
	    });
	  });
	}), _Object$setPrototypeO), AsyncIteratorPrototype);

	var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
	  var _Object$create;

	  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
	    value: stream,
	    writable: true
	  }), _defineProperty(_Object$create, kLastResolve, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kLastReject, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kError, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kEnded, {
	    value: stream._readableState.endEmitted,
	    writable: true
	  }), _defineProperty(_Object$create, kHandlePromise, {
	    value: function value(resolve, reject) {
	      var data = iterator[kStream].read();

	      if (data) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        resolve(createIterResult(data, false));
	      } else {
	        iterator[kLastResolve] = resolve;
	        iterator[kLastReject] = reject;
	      }
	    },
	    writable: true
	  }), _Object$create));
	  iterator[kLastPromise] = null;
	  finished(stream, function (err) {
	    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
	      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
	      // returned by next() and store the error

	      if (reject !== null) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        reject(err);
	      }

	      iterator[kError] = err;
	      return;
	    }

	    var resolve = iterator[kLastResolve];

	    if (resolve !== null) {
	      iterator[kLastPromise] = null;
	      iterator[kLastResolve] = null;
	      iterator[kLastReject] = null;
	      resolve(createIterResult(undefined, true));
	    }

	    iterator[kEnded] = true;
	  });
	  stream.on('readable', onReadable.bind(null, iterator));
	  return iterator;
	};

	async_iterator = createReadableStreamAsyncIterator;
	return async_iterator;
}

var from_1;
var hasRequiredFrom;

function requireFrom () {
	if (hasRequiredFrom) return from_1;
	hasRequiredFrom = 1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var ERR_INVALID_ARG_TYPE = requireErrors().codes.ERR_INVALID_ARG_TYPE;

	function from(Readable, iterable, opts) {
	  var iterator;

	  if (iterable && typeof iterable.next === 'function') {
	    iterator = iterable;
	  } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();else throw new ERR_INVALID_ARG_TYPE('iterable', ['Iterable'], iterable);

	  var readable = new Readable(_objectSpread({
	    objectMode: true
	  }, opts)); // Reading boolean to protect against _read
	  // being called before last iteration completion.

	  var reading = false;

	  readable._read = function () {
	    if (!reading) {
	      reading = true;
	      next();
	    }
	  };

	  function next() {
	    return _next2.apply(this, arguments);
	  }

	  function _next2() {
	    _next2 = _asyncToGenerator(function* () {
	      try {
	        var _ref = yield iterator.next(),
	            value = _ref.value,
	            done = _ref.done;

	        if (done) {
	          readable.push(null);
	        } else if (readable.push((yield value))) {
	          next();
	        } else {
	          reading = false;
	        }
	      } catch (err) {
	        readable.destroy(err);
	      }
	    });
	    return _next2.apply(this, arguments);
	  }

	  return readable;
	}

	from_1 = from;
	return from_1;
}

var _stream_readable$2;
var hasRequired_stream_readable;

function require_stream_readable () {
	if (hasRequired_stream_readable) return _stream_readable$2;
	hasRequired_stream_readable = 1;

	_stream_readable$2 = Readable;
	/*<replacement>*/

	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;
	/*<replacement>*/

	require$$0$f.EventEmitter;

	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/


	var Stream = requireStream();
	/*</replacement>*/


	var Buffer = require$$0$i.Buffer;

	var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*<replacement>*/


	var debugUtil = require$$1$7;

	var debug;

	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/


	var BufferList = requireBuffer_list();

	var destroyImpl = requireDestroy$1();

	var _require = requireState$1(),
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes = requireErrors().codes,
	    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;

	requireInherits()(Readable, Stream);

	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.

	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}

	function ReadableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"

	  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()

	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.

	  this.sync = true; // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.

	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	  this.paused = true; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

	  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

	  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

	  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;

	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex = Duplex || require_stream_duplex();
	  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the ReadableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex;
	  this._readableState = new ReadableState(options, this, isDuplex); // legacy

	  this.readable = true;

	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }

	  Stream.call(this);
	}

	Object.defineProperty(Readable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	  }
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;

	Readable.prototype._destroy = function (err, cb) {
	  cb(err);
	}; // Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.


	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;

	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;

	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }

	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }

	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	}; // Unshift should *always* be something directly out of read()


	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};

	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  debug('readableAddChunk', chunk);
	  var state = stream._readableState;

	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

	    if (er) {
	      errorOrDestroy(stream, er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }

	      if (addToFront) {
	        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
	      } else if (state.destroyed) {
	        return false;
	      } else {
	        state.reading = false;

	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	      maybeReadMore(stream, state);
	    }
	  } // We can push more data if we are below the highWaterMark.
	  // Also, if we have no data yet, we can stand some more bytes.
	  // This is to work around cases where hwm=0, such as the repl.


	  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}

	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    state.awaitDrain = 0;
	    stream.emit('data', chunk);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	    if (state.needReadable) emitReadable(stream);
	  }

	  maybeReadMore(stream, state);
	}

	function chunkInvalid(state, chunk) {
	  var er;

	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
	  }

	  return er;
	}

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	}; // backwards compatibility.


	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
	  var decoder = new StringDecoder(enc);
	  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

	  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

	  var p = this._readableState.buffer.head;
	  var content = '';

	  while (p !== null) {
	    content += decoder.write(p.data);
	    p = p.next;
	  }

	  this._readableState.buffer.clear();

	  if (content !== '') this._readableState.buffer.push(content);
	  this._readableState.length = content.length;
	  return this;
	}; // Don't raise the hwm > 1GB


	var MAX_HWM = 0x40000000;

	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }

	  return n;
	} // This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;

	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  } // If we're asking for more than the current hwm, then raise the hwm.


	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n; // Don't have enough

	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }

	  return state.length;
	} // you can override either this method, or the async _read(n) below.


	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.

	  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  } // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	  // if we need a readable event, then we need to do some reading.


	  var doRead = state.needReadable;
	  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  } // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.


	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true; // if the length is currently zero, then we *need* a readable event.

	    if (state.length === 0) state.needReadable = true; // call internal read method

	    this._read(state.highWaterMark);

	    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.

	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = state.length <= state.highWaterMark;
	    n = 0;
	  } else {
	    state.length -= n;
	    state.awaitDrain = 0;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};

	function onEofChunk(stream, state) {
	  debug('onEofChunk');
	  if (state.ended) return;

	  if (state.decoder) {
	    var chunk = state.decoder.end();

	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }

	  state.ended = true;

	  if (state.sync) {
	    // if we are sync, wait until next tick to emit the data.
	    // Otherwise we risk emitting data in the flow()
	    // the readable code triggers during a read() call
	    emitReadable(stream);
	  } else {
	    // emit 'readable' now to make sure it gets picked up.
	    state.needReadable = false;

	    if (!state.emittedReadable) {
	      state.emittedReadable = true;
	      emitReadable_(stream);
	    }
	  }
	} // Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.


	function emitReadable(stream) {
	  var state = stream._readableState;
	  debug('emitReadable', state.needReadable, state.emittedReadable);
	  state.needReadable = false;

	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    process.nextTick(emitReadable_, stream);
	  }
	}

	function emitReadable_(stream) {
	  var state = stream._readableState;
	  debug('emitReadable_', state.destroyed, state.length, state.ended);

	  if (!state.destroyed && (state.length || state.ended)) {
	    stream.emit('readable');
	    state.emittedReadable = false;
	  } // The stream needs another readable event if
	  // 1. It is not flowing, as the flow mechanism will take
	  //    care of it.
	  // 2. It is not ended.
	  // 3. It is below the highWaterMark, so we can schedule
	  //    another readable later.


	  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
	  flow(stream);
	} // at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.


	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  // Attempt to read more data if we should.
	  //
	  // The conditions for reading more data are (one of):
	  // - Not enough data buffered (state.length < state.highWaterMark). The loop
	  //   is responsible for filling the buffer with enough data if such data
	  //   is available. If highWaterMark is 0 and we are not in the flowing mode
	  //   we should _not_ attempt to buffer any extra data. We'll get more data
	  //   when the stream consumer calls read() instead.
	  // - No data in the buffer, and the stream is in flowing mode. In this mode
	  //   the loop below is responsible for ensuring read() is called. Failing to
	  //   call read here would abort the flow and there's no other mechanism for
	  //   continuing the flow if the stream consumer has just subscribed to the
	  //   'data' event.
	  //
	  // In addition to the above conditions to keep reading data, the following
	  // conditions prevent the data from being read:
	  // - The stream has ended (state.ended).
	  // - There is already a pending 'read' operation (state.reading). This is a
	  //   case where the the stream has called the implementation defined _read()
	  //   method, but they are processing the call asynchronously and have _not_
	  //   called push() with new data. In this case we skip performing more
	  //   read()s. The execution ends in this method again after the _read() ends
	  //   up calling push() with more data.
	  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
	    var len = state.length;
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length) // didn't get any data, stop spinning.
	      break;
	  }

	  state.readingMore = false;
	} // abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.


	Readable.prototype._read = function (n) {
	  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
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
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);

	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');

	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  } // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.


	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;

	  function cleanup() {
	    debug('cleanup'); // cleanup event handlers once the pipe is broken

	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	    cleanedUp = true; // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.

	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);

	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    debug('dest.write', ret);

	    if (ret === false) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', state.awaitDrain);
	        state.awaitDrain++;
	      }

	      src.pause();
	    }
	  } // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.


	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
	  } // Make sure our error handler is attached before userland ones.


	  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }

	  dest.once('close', onclose);

	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }

	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  } // tell the dest that it's being piped to


	  dest.emit('pipe', src); // start the flow if it hasn't been started already.

	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function pipeOnDrainFunctionResult() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;

	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = {
	    hasUnpiped: false
	  }; // if we're not piping anywhere, then do nothing.

	  if (state.pipesCount === 0) return this; // just one destination.  most common case.

	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes; // got a match.

	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  } // slow case. multiple pipe destinations.


	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, {
	        hasUnpiped: false
	      });
	    }

	    return this;
	  } // try to find the right one.


	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this, unpipeInfo);
	  return this;
	}; // set up data events if they are asked for
	// Ensure readable listeners eventually get something


	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	  var state = this._readableState;

	  if (ev === 'data') {
	    // update readableListening so that resume() may be a no-op
	    // a few lines down. This is needed to support once('readable').
	    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

	    if (state.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.flowing = false;
	      state.emittedReadable = false;
	      debug('on readable', state.length, state.reading);

	      if (state.length) {
	        emitReadable(this);
	      } else if (!state.reading) {
	        process.nextTick(nReadingNextTick, this);
	      }
	    }
	  }

	  return res;
	};

	Readable.prototype.addListener = Readable.prototype.on;

	Readable.prototype.removeListener = function (ev, fn) {
	  var res = Stream.prototype.removeListener.call(this, ev, fn);

	  if (ev === 'readable') {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	Readable.prototype.removeAllListeners = function (ev) {
	  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

	  if (ev === 'readable' || ev === undefined) {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	function updateReadableListening(self) {
	  var state = self._readableState;
	  state.readableListening = self.listenerCount('readable') > 0;

	  if (state.resumeScheduled && !state.paused) {
	    // flowing needs to be set to true now, otherwise
	    // the upcoming resume will not flow.
	    state.flowing = true; // crude way to check if we should resume
	  } else if (self.listenerCount('data') > 0) {
	    self.resume();
	  }
	}

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	} // pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.


	Readable.prototype.resume = function () {
	  var state = this._readableState;

	  if (!state.flowing) {
	    debug('resume'); // we flow only if there is no one listening
	    // for readable, but we still have to call
	    // resume()

	    state.flowing = !state.readableListening;
	    resume(this, state);
	  }

	  state.paused = false;
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  debug('resume', state.reading);

	  if (!state.reading) {
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);

	  if (this._readableState.flowing !== false) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }

	  this._readableState.paused = true;
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);

	  while (state.flowing && stream.read() !== null) {
	  }
	} // wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.


	Readable.prototype.wrap = function (stream) {
	  var _this = this;

	  var state = this._readableState;
	  var paused = false;
	  stream.on('end', function () {
	    debug('wrapped end');

	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }

	    _this.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = _this.push(chunk);

	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  }); // proxy all the other methods.
	  // important when wrapping filters and duplexes.

	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function methodWrap(method) {
	        return function methodWrapReturnFunction() {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  } // proxy certain important events.


	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  } // when we try to consume some more bytes, simply unpause the
	  // underlying stream.


	  this._read = function (n) {
	    debug('wrapped _read', n);

	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return this;
	};

	if (typeof Symbol === 'function') {
	  Readable.prototype[Symbol.asyncIterator] = function () {
	    if (createReadableStreamAsyncIterator === undefined) {
	      createReadableStreamAsyncIterator = requireAsync_iterator();
	    }

	    return createReadableStreamAsyncIterator(this);
	  };
	}

	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.highWaterMark;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState && this._readableState.buffer;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.flowing;
	  },
	  set: function set(state) {
	    if (this._readableState) {
	      this._readableState.flowing = state;
	    }
	  }
	}); // exposed for testing purposes only.

	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.length;
	  }
	}); // Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.

	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = state.buffer.consume(n, state.decoder);
	  }
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;
	  debug('endReadable', state.endEmitted);

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');

	    if (state.autoDestroy) {
	      // In case of duplex streams we need a way to detect
	      // if the writable side is ready for autoDestroy as well
	      var wState = stream._writableState;

	      if (!wState || wState.autoDestroy && wState.finished) {
	        stream.destroy();
	      }
	    }
	  }
	}

	if (typeof Symbol === 'function') {
	  Readable.from = function (iterable, opts) {
	    if (from === undefined) {
	      from = requireFrom();
	    }

	    return from(Readable, iterable, opts);
	  };
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }

	  return -1;
	}
	return _stream_readable$2;
}

var _stream_transform$2;
var hasRequired_stream_transform;

function require_stream_transform () {
	if (hasRequired_stream_transform) return _stream_transform$2;
	hasRequired_stream_transform = 1;

	_stream_transform$2 = Transform;

	var _require$codes = requireErrors().codes,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
	    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

	var Duplex = require_stream_duplex();

	requireInherits()(Transform, Duplex);

	function afterTransform(er, data) {
	  var ts = this._transformState;
	  ts.transforming = false;
	  var cb = ts.writecb;

	  if (cb === null) {
	    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
	  }

	  ts.writechunk = null;
	  ts.writecb = null;
	  if (data != null) // single equals check for both `null` and `undefined`
	    this.push(data);
	  cb(er);
	  var rs = this._readableState;
	  rs.reading = false;

	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    this._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	  Duplex.call(this, options);
	  this._transformState = {
	    afterTransform: afterTransform.bind(this),
	    needTransform: false,
	    transforming: false,
	    writecb: null,
	    writechunk: null,
	    writeencoding: null
	  }; // start out asking for a readable event once data is transformed.

	  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.

	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  } // When the writable side finishes, then flush out anything remaining.


	  this.on('prefinish', prefinish);
	}

	function prefinish() {
	  var _this = this;

	  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
	    this._flush(function (er, data) {
	      done(_this, er, data);
	    });
	  } else {
	    done(this, null, null);
	  }
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	}; // This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.


	Transform.prototype._transform = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;

	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	}; // Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.


	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && !ts.transforming) {
	    ts.transforming = true;

	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	Transform.prototype._destroy = function (err, cb) {
	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	  });
	};

	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	  if (data != null) // single equals check for both `null` and `undefined`
	    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided

	  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
	  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
	  return stream.push(null);
	}
	return _stream_transform$2;
}

var _stream_passthrough$2;
var hasRequired_stream_passthrough;

function require_stream_passthrough () {
	if (hasRequired_stream_passthrough) return _stream_passthrough$2;
	hasRequired_stream_passthrough = 1;

	_stream_passthrough$2 = PassThrough;

	var Transform = require_stream_transform();

	requireInherits()(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};
	return _stream_passthrough$2;
}

var pipeline_1$1;
var hasRequiredPipeline;

function requirePipeline () {
	if (hasRequiredPipeline) return pipeline_1$1;
	hasRequiredPipeline = 1;

	var eos;

	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;
	    callback.apply(void 0, arguments);
	  };
	}

	var _require$codes = requireErrors().codes,
	    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
	    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

	function noop(err) {
	  // Rethrow the error if it exists to avoid swallowing it
	  if (err) throw err;
	}

	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}

	function destroyer(stream, reading, writing, callback) {
	  callback = once(callback);
	  var closed = false;
	  stream.on('close', function () {
	    closed = true;
	  });
	  if (eos === undefined) eos = requireEndOfStream();
	  eos(stream, {
	    readable: reading,
	    writable: writing
	  }, function (err) {
	    if (err) return callback(err);
	    closed = true;
	    callback();
	  });
	  var destroyed = false;
	  return function (err) {
	    if (closed) return;
	    if (destroyed) return;
	    destroyed = true; // request.destroy just do .end - .abort is what we want

	    if (isRequest(stream)) return stream.abort();
	    if (typeof stream.destroy === 'function') return stream.destroy();
	    callback(err || new ERR_STREAM_DESTROYED('pipe'));
	  };
	}

	function call(fn) {
	  fn();
	}

	function pipe(from, to) {
	  return from.pipe(to);
	}

	function popCallback(streams) {
	  if (!streams.length) return noop;
	  if (typeof streams[streams.length - 1] !== 'function') return noop;
	  return streams.pop();
	}

	function pipeline() {
	  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
	    streams[_key] = arguments[_key];
	  }

	  var callback = popCallback(streams);
	  if (Array.isArray(streams[0])) streams = streams[0];

	  if (streams.length < 2) {
	    throw new ERR_MISSING_ARGS('streams');
	  }

	  var error;
	  var destroys = streams.map(function (stream, i) {
	    var reading = i < streams.length - 1;
	    var writing = i > 0;
	    return destroyer(stream, reading, writing, function (err) {
	      if (!error) error = err;
	      if (err) destroys.forEach(call);
	      if (reading) return;
	      destroys.forEach(call);
	      callback(error);
	    });
	  });
	  return streams.reduce(pipe);
	}

	pipeline_1$1 = pipeline;
	return pipeline_1$1;
}

(function (module, exports) {
	var Stream = Stream$2;
	if (process.env.READABLE_STREAM === 'disable' && Stream) {
	  module.exports = Stream.Readable;
	  Object.assign(module.exports, Stream);
	  module.exports.Stream = Stream;
	} else {
	  exports = module.exports = require_stream_readable();
	  exports.Stream = Stream || exports;
	  exports.Readable = exports;
	  exports.Writable = require_stream_writable();
	  exports.Duplex = require_stream_duplex();
	  exports.Transform = require_stream_transform();
	  exports.PassThrough = require_stream_passthrough();
	  exports.finished = requireEndOfStream();
	  exports.pipeline = requirePipeline();
	}
} (readable, readableExports));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign$5 = function() {
    __assign$5 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$5.apply(this, arguments);
};

function __awaiter$3(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator$1(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values$2(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read$4(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread$4() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read$4(arguments[i]));
    return ar;
}

/**
 * TODO(v7): Remove this enum and replace with SeverityLevel
 */
var Severity;
(function (Severity) {
    /** JSDoc */
    Severity["Fatal"] = "fatal";
    /** JSDoc */
    Severity["Error"] = "error";
    /** JSDoc */
    Severity["Warning"] = "warning";
    /** JSDoc */
    Severity["Log"] = "log";
    /** JSDoc */
    Severity["Info"] = "info";
    /** JSDoc */
    Severity["Debug"] = "debug";
    /** JSDoc */
    Severity["Critical"] = "critical";
})(Severity || (Severity = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$4 = function() {
    __assign$4 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$4.apply(this, arguments);
};

function __read$3(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread$3() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read$3(arguments[i]));
    return ar;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$3 = function() {
    __assign$3 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$3.apply(this, arguments);
};

function __read$2(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread$2() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read$2(arguments[i]));
    return ar;
}

/**
 * Consumes the promise and logs the error when it rejects.
 * @param promise A promise to forget.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function forget(promise) {
    void promise.then(null, function (e) {
        // TODO: Use a better logging mechanism
        // eslint-disable-next-line no-console
        console.error(e);
    });
}

/*
 * This module exists for optimizations in the build process through rollup and terser.  We define some global
 * constants, which can be overridden during build. By guarding certain pieces of code with functions that return these
 * constants, we can control whether or not they appear in the final bundle. (Any code guarded by a false condition will
 * never run, and will hence be dropped during treeshaking.) The two primary uses for this are stripping out calls to
 * `logger` and preventing node-related code from appearing in browser bundles.
 *
 * Attention:
 * This file should not be used to define constants/flags that are intended to be used for tree-shaking conducted by
 * users. These fags should live in their respective packages, as we identified user tooling (specifically webpack)
 * having issues tree-shaking these constants across package boundaries.
 * An example for this is the __SENTRY_DEBUG__ constant. It is declared in each package individually because we want
 * users to be able to shake away expressions that it guards.
 */
/**
 * Figures out if we're building a browser bundle.
 *
 * @returns true if this is a browser bundle build.
 */
function isBrowserBundle() {
    return typeof __SENTRY_BROWSER_BUNDLE__ !== 'undefined' && !!__SENTRY_BROWSER_BUNDLE__;
}

/**
 * NOTE: In order to avoid circular dependencies, if you add a function to this module and it needs to print something,
 * you must either a) use `console.log` rather than the logger, or b) put your function elsewhere.
 */
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
function isNodeEnv() {
    // explicitly check for browser bundles as those can be optimized statically
    // by terser/rollup.
    return (!isBrowserBundle() &&
        Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]');
}
/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
function dynamicRequire(mod, request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return mod.require(request);
}

/**
 * NOTE: In order to avoid circular dependencies, if you add a function to this module and it needs to print something,
 * you must either a) use `console.log` rather than the logger, or b) put your function elsewhere.
 */
var fallbackGlobalObject = {};
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
function getGlobalObject() {
    return (isNodeEnv()
        ? global
        : typeof window !== 'undefined' // eslint-disable-line no-restricted-globals
            ? window // eslint-disable-line no-restricted-globals
            : typeof self !== 'undefined'
                ? self
                : fallbackGlobalObject);
}
/**
 * Returns a global singleton contained in the global `__SENTRY__` object.
 *
 * If the singleton doesn't already exist in `__SENTRY__`, it will be created using the given factory
 * function and added to the `__SENTRY__` object.
 *
 * @param name name of the global singleton on __SENTRY__
 * @param creator creator Factory function to create the singleton if it doesn't already exist on `__SENTRY__`
 * @param obj (Optional) The global object on which to look for `__SENTRY__`, if not `getGlobalObject`'s return value
 * @returns the singleton
 */
function getGlobalSingleton(name, creator, obj) {
    var global = (obj || getGlobalObject());
    var __SENTRY__ = (global.__SENTRY__ = global.__SENTRY__ || {});
    var singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
    return singleton;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/unbound-method
var objectToString$4 = Object.prototype.toString;
/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isError$1(wat) {
    switch (objectToString$4.call(wat)) {
        case '[object Error]':
        case '[object Exception]':
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
function isBuiltin(wat, ty) {
    return objectToString$4.call(wat) === "[object " + ty + "]";
}
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isString$1(wat) {
    return isBuiltin(wat, 'String');
}
/**
 * Checks whether given value is a primitive (undefined, null, number, boolean, string, bigint, symbol)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPrimitive(wat) {
    return wat === null || (typeof wat !== 'object' && typeof wat !== 'function');
}
/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPlainObject$1(wat) {
    return isBuiltin(wat, 'Object');
}
/**
 * Checks whether given value's type is an Event instance
 * {@link isEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isEvent(wat) {
    return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
}
/**
 * Checks whether given value's type is an Element instance
 * {@link isElement}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isElement$1(wat) {
    return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
}
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isRegExp$3(wat) {
    return isBuiltin(wat, 'RegExp');
}
/**
 * Checks whether given value has a then function.
 * @param wat A value to be checked.
 */
function isThenable(wat) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return Boolean(wat && wat.then && typeof wat.then === 'function');
}
/**
 * Checks whether given value's type is a SyntheticEvent
 * {@link isSyntheticEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isSyntheticEvent(wat) {
    return isPlainObject$1(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
}
/**
 * Checks whether given value is NaN
 * {@link isNaN}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isNaN$1(wat) {
    return typeof wat === 'number' && wat !== wat;
}
/**
 * Checks whether given value's type is an instance of provided constructor.
 * {@link isInstanceOf}.
 *
 * @param wat A value to be checked.
 * @param base A constructor to be used in a check.
 * @returns A boolean representing the result.
 */
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlTreeAsString(elem, keyAttrs) {
    // try/catch both:
    // - accessing event.target (see getsentry/raven-js#838, #768)
    // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
    // - can throw an exception in some circumstances.
    try {
        var currentElem = elem;
        var MAX_TRAVERSE_HEIGHT = 5;
        var MAX_OUTPUT_LEN = 80;
        var out = [];
        var height = 0;
        var len = 0;
        var separator = ' > ';
        var sepLength = separator.length;
        var nextStr = void 0;
        // eslint-disable-next-line no-plusplus
        while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
            nextStr = _htmlElementAsString(currentElem, keyAttrs);
            // bail out if
            // - nextStr is the 'html' element
            // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
            //   (ignore this limit if we are on the first iteration)
            if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
                break;
            }
            out.push(nextStr);
            len += nextStr.length;
            currentElem = currentElem.parentNode;
        }
        return out.reverse().join(separator);
    }
    catch (_oO) {
        return '<unknown>';
    }
}
/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function _htmlElementAsString(el, keyAttrs) {
    var elem = el;
    var out = [];
    var className;
    var classes;
    var key;
    var attr;
    var i;
    if (!elem || !elem.tagName) {
        return '';
    }
    out.push(elem.tagName.toLowerCase());
    // Pairs of attribute keys defined in `serializeAttribute` and their values on element.
    var keyAttrPairs = keyAttrs && keyAttrs.length
        ? keyAttrs.filter(function (keyAttr) { return elem.getAttribute(keyAttr); }).map(function (keyAttr) { return [keyAttr, elem.getAttribute(keyAttr)]; })
        : null;
    if (keyAttrPairs && keyAttrPairs.length) {
        keyAttrPairs.forEach(function (keyAttrPair) {
            out.push("[" + keyAttrPair[0] + "=\"" + keyAttrPair[1] + "\"]");
        });
    }
    else {
        if (elem.id) {
            out.push("#" + elem.id);
        }
        // eslint-disable-next-line prefer-const
        className = elem.className;
        if (className && isString$1(className)) {
            classes = className.split(/\s+/);
            for (i = 0; i < classes.length; i++) {
                out.push("." + classes[i]);
            }
        }
    }
    var allowedAttrs = ['type', 'name', 'title', 'alt'];
    for (i = 0; i < allowedAttrs.length; i++) {
        key = allowedAttrs[i];
        attr = elem.getAttribute(key);
        if (attr) {
            out.push("[" + key + "=\"" + attr + "\"]");
        }
    }
    return out.join('');
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign$2 = function() {
    __assign$2 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};

function __values$1(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read$1(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread$1() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read$1(arguments[i]));
    return ar;
}

var setPrototypeOf$2 = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf$1 : mixinProperties$1);
/**
 * setPrototypeOf polyfill using __proto__
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function setProtoOf$1(obj, proto) {
    // @ts-ignore __proto__ does not exist on obj
    obj.__proto__ = proto;
    return obj;
}
/**
 * setPrototypeOf polyfill using mixin
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function mixinProperties$1(obj, proto) {
    for (var prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
            // @ts-ignore typescript complains about indexing so we remove
            obj[prop] = proto[prop];
        }
    }
    return obj;
}

/** An error emitted by Sentry SDKs and related utilities. */
var SentryError = /** @class */ (function (_super) {
    __extends(SentryError, _super);
    function SentryError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = _newTarget.prototype.constructor.name;
        setPrototypeOf$2(_this, _newTarget.prototype);
        return _this;
    }
    return SentryError;
}(Error));

/*
 * This file defines flags and constants that can be modified during compile time in order to facilitate tree shaking
 * for users.
 *
 * Debug flags need to be declared in each package individually and must not be imported across package boundaries,
 * because some build tools have trouble tree-shaking imported guards.
 *
 * As a convention, we define debug flags in a `flags.ts` file in the root of a package's `src` folder.
 *
 * Debug flag files will contain "magic strings" like `__SENTRY_DEBUG__` that may get replaced with actual values during
 * our, or the user's build process. Take care when introducing new flags - they must not throw if they are not
 * replaced.
 */
/** Flag that is true for debug builds, false otherwise. */
var IS_DEBUG_BUILD$3 = typeof __SENTRY_DEBUG__ === 'undefined' ? true : __SENTRY_DEBUG__;

/** Regular expression used to parse a Dsn. */
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
    return protocol === 'http' || protocol === 'https';
}
/**
 * Renders the string representation of this Dsn.
 *
 * By default, this will render the public representation without the password
 * component. To get the deprecated private representation, set `withPassword`
 * to true.
 *
 * @param withPassword When set to true, the password will be included.
 */
function dsnToString(dsn, withPassword) {
    if (withPassword === void 0) { withPassword = false; }
    var host = dsn.host, path = dsn.path, pass = dsn.pass, port = dsn.port, projectId = dsn.projectId, protocol = dsn.protocol, publicKey = dsn.publicKey;
    return (protocol + "://" + publicKey + (withPassword && pass ? ":" + pass : '') +
        ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId));
}
function dsnFromString(str) {
    var match = DSN_REGEX.exec(str);
    if (!match) {
        throw new SentryError("Invalid Sentry Dsn: " + str);
    }
    var _a = __read$1(match.slice(1), 6), protocol = _a[0], publicKey = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, lastPath = _a[5];
    var path = '';
    var projectId = lastPath;
    var split = projectId.split('/');
    if (split.length > 1) {
        path = split.slice(0, -1).join('/');
        projectId = split.pop();
    }
    if (projectId) {
        var projectMatch = projectId.match(/^\d+/);
        if (projectMatch) {
            projectId = projectMatch[0];
        }
    }
    return dsnFromComponents({ host: host, pass: pass, path: path, projectId: projectId, port: port, protocol: protocol, publicKey: publicKey });
}
function dsnFromComponents(components) {
    // TODO this is for backwards compatibility, and can be removed in a future version
    if ('user' in components && !('publicKey' in components)) {
        components.publicKey = components.user;
    }
    return {
        user: components.publicKey || '',
        protocol: components.protocol,
        publicKey: components.publicKey || '',
        pass: components.pass || '',
        host: components.host,
        port: components.port || '',
        path: components.path || '',
        projectId: components.projectId,
    };
}
function validateDsn(dsn) {
    if (!IS_DEBUG_BUILD$3) {
        return;
    }
    var port = dsn.port, projectId = dsn.projectId, protocol = dsn.protocol;
    var requiredComponents = ['protocol', 'publicKey', 'host', 'projectId'];
    requiredComponents.forEach(function (component) {
        if (!dsn[component]) {
            throw new SentryError("Invalid Sentry Dsn: " + component + " missing");
        }
    });
    if (!projectId.match(/^\d+$/)) {
        throw new SentryError("Invalid Sentry Dsn: Invalid projectId " + projectId);
    }
    if (!isValidProtocol(protocol)) {
        throw new SentryError("Invalid Sentry Dsn: Invalid protocol " + protocol);
    }
    if (port && isNaN(parseInt(port, 10))) {
        throw new SentryError("Invalid Sentry Dsn: Invalid port " + port);
    }
    return true;
}
/** The Sentry Dsn, identifying a Sentry instance and project. */
function makeDsn(from) {
    var components = typeof from === 'string' ? dsnFromString(from) : dsnFromComponents(from);
    validateDsn(components);
    return components;
}

var SeverityLevels = ['fatal', 'error', 'warning', 'log', 'info', 'debug', 'critical'];

// TODO: Implement different loggers for different environments
var global$1 = getGlobalObject();
/** Prefix for logging strings */
var PREFIX = 'Sentry Logger ';
var CONSOLE_LEVELS = ['debug', 'info', 'warn', 'error', 'log', 'assert'];
/**
 * Temporarily disable sentry console instrumentations.
 *
 * @param callback The function to run against the original `console` messages
 * @returns The results of the callback
 */
function consoleSandbox(callback) {
    var global = getGlobalObject();
    if (!('console' in global)) {
        return callback();
    }
    var originalConsole = global.console;
    var wrappedLevels = {};
    // Restore all wrapped console methods
    CONSOLE_LEVELS.forEach(function (level) {
        // TODO(v7): Remove this check as it's only needed for Node 6
        var originalWrappedFunc = originalConsole[level] && originalConsole[level].__sentry_original__;
        if (level in global.console && originalWrappedFunc) {
            wrappedLevels[level] = originalConsole[level];
            originalConsole[level] = originalWrappedFunc;
        }
    });
    try {
        return callback();
    }
    finally {
        // Revert restoration to wrapped state
        Object.keys(wrappedLevels).forEach(function (level) {
            originalConsole[level] = wrappedLevels[level];
        });
    }
}
function makeLogger() {
    var enabled = false;
    var logger = {
        enable: function () {
            enabled = true;
        },
        disable: function () {
            enabled = false;
        },
    };
    if (IS_DEBUG_BUILD$3) {
        CONSOLE_LEVELS.forEach(function (name) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            logger[name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (enabled) {
                    consoleSandbox(function () {
                        var _a;
                        (_a = global$1.console)[name].apply(_a, __spread$1([PREFIX + "[" + name + "]:"], args));
                    });
                }
            };
        });
    }
    else {
        CONSOLE_LEVELS.forEach(function (name) {
            logger[name] = function () { return undefined; };
        });
    }
    return logger;
}
// Ensure we only have a single logger instance, even if multiple versions of @sentry/utils are being used
var logger$3;
if (IS_DEBUG_BUILD$3) {
    logger$3 = getGlobalSingleton('logger', makeLogger);
}
else {
    logger$3 = makeLogger();
}

/**
 * Truncates given string to the maximum characters count
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string (0 = unlimited)
 * @returns string Encoded
 */
function truncate(str, max) {
    if (max === void 0) { max = 0; }
    if (typeof str !== 'string' || max === 0) {
        return str;
    }
    return str.length <= max ? str : str.substr(0, max) + "...";
}
/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function snipLine(line, colno) {
    var newLine = line;
    var lineLength = newLine.length;
    if (lineLength <= 150) {
        return newLine;
    }
    if (colno > lineLength) {
        // eslint-disable-next-line no-param-reassign
        colno = lineLength;
    }
    var start = Math.max(colno - 60, 0);
    if (start < 5) {
        start = 0;
    }
    var end = Math.min(start + 140, lineLength);
    if (end > lineLength - 5) {
        end = lineLength;
    }
    if (end === lineLength) {
        start = Math.max(end - 140, 0);
    }
    newLine = newLine.slice(start, end);
    if (start > 0) {
        newLine = "'{snip} " + newLine;
    }
    if (end < lineLength) {
        newLine += ' {snip}';
    }
    return newLine;
}
/**
 * Checks if the value matches a regex or includes the string
 * @param value The string value to be checked against
 * @param pattern Either a regex or a string that must be contained in value
 */
function isMatchingPattern(value, pattern) {
    if (!isString$1(value)) {
        return false;
    }
    if (isRegExp$3(pattern)) {
        return pattern.test(value);
    }
    if (typeof pattern === 'string') {
        return value.indexOf(pattern) !== -1;
    }
    return false;
}

/**
 * Replace a method in an object with a wrapped version of itself.
 *
 * @param source An object that contains a method to be wrapped.
 * @param name The name of the method to be wrapped.
 * @param replacementFactory A higher-order function that takes the original version of the given method and returns a
 * wrapped version. Note: The function returned by `replacementFactory` needs to be a non-arrow function, in order to
 * preserve the correct value of `this`, and the original method must be called using `origMethod.call(this, <other
 * args>)` or `origMethod.apply(this, [<other args>])` (rather than being called directly), again to preserve `this`.
 * @returns void
 */
function fill(source, name, replacementFactory) {
    if (!(name in source)) {
        return;
    }
    var original = source[name];
    var wrapped = replacementFactory(original);
    // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
    // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
    if (typeof wrapped === 'function') {
        try {
            markFunctionWrapped(wrapped, original);
        }
        catch (_Oo) {
            // This can throw if multiple fill happens on a global object like XMLHttpRequest
            // Fixes https://github.com/getsentry/sentry-javascript/issues/2043
        }
    }
    source[name] = wrapped;
}
/**
 * Defines a non-enumerable property on the given object.
 *
 * @param obj The object on which to set the property
 * @param name The name of the property to be set
 * @param value The value to which to set the property
 */
function addNonEnumerableProperty(obj, name, value) {
    Object.defineProperty(obj, name, {
        // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
        value: value,
        writable: true,
        configurable: true,
    });
}
/**
 * Remembers the original function on the wrapped function and
 * patches up the prototype.
 *
 * @param wrapped the wrapper function
 * @param original the original function that gets wrapped
 */
function markFunctionWrapped(wrapped, original) {
    var proto = original.prototype || {};
    wrapped.prototype = original.prototype = proto;
    addNonEnumerableProperty(wrapped, '__sentry_original__', original);
}
/**
 * This extracts the original function if available.  See
 * `markFunctionWrapped` for more information.
 *
 * @param func the function to unwrap
 * @returns the unwrapped version of the function if available.
 */
function getOriginalFunction(func) {
    return func.__sentry_original__;
}
/**
 * Encodes given object into url-friendly format
 *
 * @param object An object that contains serializable values
 * @returns string Encoded
 */
function urlEncode(object) {
    return Object.keys(object)
        .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
        .join('&');
}
/**
 * Transforms any object into an object literal with all its attributes
 * attached to it.
 *
 * @param value Initial source that we have to transform in order for it to be usable by the serializer
 */
function convertToPlainObject(value) {
    var newObj = value;
    if (isError$1(value)) {
        newObj = __assign$2({ message: value.message, name: value.name, stack: value.stack }, getOwnProperties(value));
    }
    else if (isEvent(value)) {
        var event_1 = value;
        newObj = __assign$2({ type: event_1.type, target: serializeEventTarget(event_1.target), currentTarget: serializeEventTarget(event_1.currentTarget) }, getOwnProperties(event_1));
        if (typeof CustomEvent !== 'undefined' && isInstanceOf(value, CustomEvent)) {
            newObj.detail = event_1.detail;
        }
    }
    return newObj;
}
/** Creates a string representation of the target of an `Event` object */
function serializeEventTarget(target) {
    try {
        return isElement$1(target) ? htmlTreeAsString(target) : Object.prototype.toString.call(target);
    }
    catch (_oO) {
        return '<unknown>';
    }
}
/** Filters out all but an object's own properties */
function getOwnProperties(obj) {
    var extractedProps = {};
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            extractedProps[property] = obj[property];
        }
    }
    return extractedProps;
}
/**
 * Given any captured exception, extract its keys and create a sorted
 * and truncated list that will be used inside the event message.
 * eg. `Non-error exception captured with keys: foo, bar, baz`
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function extractExceptionKeysForMessage(exception, maxLength) {
    if (maxLength === void 0) { maxLength = 40; }
    var keys = Object.keys(convertToPlainObject(exception));
    keys.sort();
    if (!keys.length) {
        return '[object has no keys]';
    }
    if (keys[0].length >= maxLength) {
        return truncate(keys[0], maxLength);
    }
    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        var serialized = keys.slice(0, includedKeys).join(', ');
        if (serialized.length > maxLength) {
            continue;
        }
        if (includedKeys === keys.length) {
            return serialized;
        }
        return truncate(serialized, maxLength);
    }
    return '';
}
/**
 * Given any object, return the new object with removed keys that value was `undefined`.
 * Works recursively on objects and arrays.
 */
function dropUndefinedKeys(val) {
    var e_1, _a;
    if (isPlainObject$1(val)) {
        var rv = {};
        try {
            for (var _b = __values$1(Object.keys(val)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (typeof val[key] !== 'undefined') {
                    rv[key] = dropUndefinedKeys(val[key]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return rv;
    }
    if (Array.isArray(val)) {
        return val.map(dropUndefinedKeys);
    }
    return val;
}

var STACKTRACE_LIMIT = 50;
/**
 * Creates a stack parser with the supplied line parsers
 *
 * StackFrames are returned in the correct order for Sentry Exception
 * frames and with Sentry SDK internal frames removed from the top and bottom
 *
 */
function createStackParser() {
    var parsers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parsers[_i] = arguments[_i];
    }
    var sortedParsers = parsers.sort(function (a, b) { return a[0] - b[0]; }).map(function (p) { return p[1]; });
    return function (stack, skipFirst) {
        var e_1, _a, e_2, _b;
        if (skipFirst === void 0) { skipFirst = 0; }
        var frames = [];
        try {
            for (var _c = __values$1(stack.split('\n').slice(skipFirst)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var line = _d.value;
                try {
                    for (var sortedParsers_1 = (e_2 = void 0, __values$1(sortedParsers)), sortedParsers_1_1 = sortedParsers_1.next(); !sortedParsers_1_1.done; sortedParsers_1_1 = sortedParsers_1.next()) {
                        var parser = sortedParsers_1_1.value;
                        var frame = parser(line);
                        if (frame) {
                            frames.push(frame);
                            break;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (sortedParsers_1_1 && !sortedParsers_1_1.done && (_b = sortedParsers_1.return)) _b.call(sortedParsers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return stripSentryFramesAndReverse(frames);
    };
}
/**
 * @hidden
 */
function stripSentryFramesAndReverse(stack) {
    if (!stack.length) {
        return [];
    }
    var localStack = stack;
    var firstFrameFunction = localStack[0].function || '';
    var lastFrameFunction = localStack[localStack.length - 1].function || '';
    // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
    if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
        localStack = localStack.slice(1);
    }
    // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
    if (lastFrameFunction.indexOf('sentryWrapped') !== -1) {
        localStack = localStack.slice(0, -1);
    }
    // The frame where the crash happened, should be the last entry in the array
    return localStack
        .slice(0, STACKTRACE_LIMIT)
        .map(function (frame) { return (__assign$2(__assign$2({}, frame), { filename: frame.filename || localStack[0].filename, function: frame.function || '?' })); })
        .reverse();
}
var defaultFunctionName = '<anonymous>';
/**
 * Safely extract function name from itself
 */
function getFunctionName(fn) {
    try {
        if (!fn || typeof fn !== 'function') {
            return defaultFunctionName;
        }
        return fn.name || defaultFunctionName;
    }
    catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        return defaultFunctionName;
    }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Helper to decycle json objects
 */
function memoBuilder() {
    var hasWeakSet = typeof WeakSet === 'function';
    var inner = hasWeakSet ? new WeakSet() : [];
    function memoize(obj) {
        if (hasWeakSet) {
            if (inner.has(obj)) {
                return true;
            }
            inner.add(obj);
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (var i = 0; i < inner.length; i++) {
            var value = inner[i];
            if (value === obj) {
                return true;
            }
        }
        inner.push(obj);
        return false;
    }
    function unmemoize(obj) {
        if (hasWeakSet) {
            inner.delete(obj);
        }
        else {
            for (var i = 0; i < inner.length; i++) {
                if (inner[i] === obj) {
                    inner.splice(i, 1);
                    break;
                }
            }
        }
    }
    return [memoize, unmemoize];
}

/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
function uuid4() {
    var global = getGlobalObject();
    var crypto = global.crypto || global.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr);
        // set 4 in byte 7
        // eslint-disable-next-line no-bitwise
        arr[3] = (arr[3] & 0xfff) | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        // eslint-disable-next-line no-bitwise
        arr[4] = (arr[4] & 0x3fff) | 0x8000;
        var pad = function (num) {
            var v = num.toString(16);
            while (v.length < 4) {
                v = "0" + v;
            }
            return v;
        };
        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
    }
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-bitwise
        var r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function getFirstException(event) {
    return event.exception && event.exception.values ? event.exception.values[0] : undefined;
}
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
function getEventDescription(event) {
    var message = event.message, eventId = event.event_id;
    if (message) {
        return message;
    }
    var firstException = getFirstException(event);
    if (firstException) {
        if (firstException.type && firstException.value) {
            return firstException.type + ": " + firstException.value;
        }
        return firstException.type || firstException.value || eventId || '<unknown>';
    }
    return eventId || '<unknown>';
}
/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @hidden
 */
function addExceptionTypeValue(event, value, type) {
    var exception = (event.exception = event.exception || {});
    var values = (exception.values = exception.values || []);
    var firstException = (values[0] = values[0] || {});
    if (!firstException.value) {
        firstException.value = value || '';
    }
    if (!firstException.type) {
        firstException.type = type || 'Error';
    }
}
/**
 * Adds exception mechanism data to a given event. Uses defaults if the second parameter is not passed.
 *
 * @param event The event to modify.
 * @param newMechanism Mechanism data to add to the event.
 * @hidden
 */
function addExceptionMechanism(event, newMechanism) {
    var firstException = getFirstException(event);
    if (!firstException) {
        return;
    }
    var defaultMechanism = { type: 'generic', handled: true };
    var currentMechanism = firstException.mechanism;
    firstException.mechanism = __assign$2(__assign$2(__assign$2({}, defaultMechanism), currentMechanism), newMechanism);
    if (newMechanism && 'data' in newMechanism) {
        var mergedData = __assign$2(__assign$2({}, (currentMechanism && currentMechanism.data)), newMechanism.data);
        firstException.mechanism.data = mergedData;
    }
}
// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
/**
 * Parses input into a SemVer interface
 * @param input string representation of a semver version
 */
function parseSemver(input) {
    var match = input.match(SEMVER_REGEXP) || [];
    var major = parseInt(match[1], 10);
    var minor = parseInt(match[2], 10);
    var patch = parseInt(match[3], 10);
    return {
        buildmetadata: match[5],
        major: isNaN(major) ? undefined : major,
        minor: isNaN(minor) ? undefined : minor,
        patch: isNaN(patch) ? undefined : patch,
        prerelease: match[4],
    };
}
/**
 * This function adds context (pre/post/line) lines to the provided frame
 *
 * @param lines string[] containing all lines
 * @param frame StackFrame that will be mutated
 * @param linesOfContext number of context lines we want to add pre/post
 */
function addContextToFrame(lines, frame, linesOfContext) {
    if (linesOfContext === void 0) { linesOfContext = 5; }
    var lineno = frame.lineno || 0;
    var maxLines = lines.length;
    var sourceLine = Math.max(Math.min(maxLines, lineno - 1), 0);
    frame.pre_context = lines
        .slice(Math.max(0, sourceLine - linesOfContext), sourceLine)
        .map(function (line) { return snipLine(line, 0); });
    frame.context_line = snipLine(lines[Math.min(maxLines - 1, sourceLine)], frame.colno || 0);
    frame.post_context = lines
        .slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext)
        .map(function (line) { return snipLine(line, 0); });
}
/**
 * Strip the query string and fragment off of a given URL or path (if present)
 *
 * @param urlPath Full URL or path, including possible query string and/or fragment
 * @returns URL or path without query string or fragment
 */
function stripUrlQueryAndFragment(urlPath) {
    // eslint-disable-next-line no-useless-escape
    return urlPath.split(/[\?#]/, 1)[0];
}
/**
 * Checks whether or not we've already captured the given exception (note: not an identical exception - the very object
 * in question), and marks it captured if not.
 *
 * This is useful because it's possible for an error to get captured by more than one mechanism. After we intercept and
 * record an error, we rethrow it (assuming we've intercepted it before it's reached the top-level global handlers), so
 * that we don't interfere with whatever effects the error might have had were the SDK not there. At that point, because
 * the error has been rethrown, it's possible for it to bubble up to some other code we've instrumented. If it's not
 * caught after that, it will bubble all the way up to the global handlers (which of course we also instrument). This
 * function helps us ensure that even if we encounter the same error more than once, we only record it the first time we
 * see it.
 *
 * Note: It will ignore primitives (always return `false` and not mark them as seen), as properties can't be set on
 * them. {@link: Object.objectify} can be used on exceptions to convert any that are primitives into their equivalent
 * object wrapper forms so that this check will always work. However, because we need to flag the exact object which
 * will get rethrown, and because that rethrowing happens outside of the event processing pipeline, the objectification
 * must be done before the exception captured.
 *
 * @param A thrown exception to check or flag as having been seen
 * @returns `true` if the exception has already been captured, `false` if not (with the side effect of marking it seen)
 */
function checkOrSetAlreadyCaught(exception) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (exception && exception.__sentry_captured__) {
        return true;
    }
    try {
        // set it this way rather than by assignment so that it's not ennumerable and therefore isn't recorded by the
        // `ExtraErrorData` integration
        addNonEnumerableProperty(exception, '__sentry_captured__', true);
    }
    catch (err) {
        // `exception` is a primitive, so we can't mark it seen
    }
    return false;
}

/**
 * Recursively normalizes the given object.
 *
 * - Creates a copy to prevent original input mutation
 * - Skips non-enumerable properties
 * - When stringifying, calls `toJSON` if implemented
 * - Removes circular references
 * - Translates non-serializable values (`undefined`/`NaN`/functions) to serializable format
 * - Translates known global objects/classes to a string representations
 * - Takes care of `Error` object serialization
 * - Optionally limits depth of final output
 * - Optionally limits number of properties/elements included in any single object/array
 *
 * @param input The object to be normalized.
 * @param depth The max depth to which to normalize the object. (Anything deeper stringified whole.)
 * @param maxProperties The max number of elements or properties to be included in any single array or
 * object in the normallized output..
 * @returns A normalized version of the object, or `"**non-serializable**"` if any errors are thrown during normalization.
 */
function normalize$4(input, depth, maxProperties) {
    if (depth === void 0) { depth = +Infinity; }
    if (maxProperties === void 0) { maxProperties = +Infinity; }
    try {
        // since we're at the outermost level, there is no key
        return visit('', input, depth, maxProperties);
    }
    catch (err) {
        return { ERROR: "**non-serializable** (" + err + ")" };
    }
}
/** JSDoc */
function normalizeToSize(object, 
// Default Node.js REPL depth
depth, 
// 100kB, as 200kB is max payload size, so half sounds reasonable
maxSize) {
    if (depth === void 0) { depth = 3; }
    if (maxSize === void 0) { maxSize = 100 * 1024; }
    var normalized = normalize$4(object, depth);
    if (jsonSize(normalized) > maxSize) {
        return normalizeToSize(object, depth - 1, maxSize);
    }
    return normalized;
}
/**
 * Visits a node to perform normalization on it
 *
 * @param key The key corresponding to the given node
 * @param value The node to be visited
 * @param depth Optional number indicating the maximum recursion depth
 * @param maxProperties Optional maximum number of properties/elements included in any single object/array
 * @param memo Optional Memo class handling decycling
 */
function visit(key, value, depth, maxProperties, memo) {
    if (depth === void 0) { depth = +Infinity; }
    if (maxProperties === void 0) { maxProperties = +Infinity; }
    if (memo === void 0) { memo = memoBuilder(); }
    var _a = __read$1(memo, 2), memoize = _a[0], unmemoize = _a[1];
    // If the value has a `toJSON` method, see if we can bail and let it do the work
    var valueWithToJSON = value;
    if (valueWithToJSON && typeof valueWithToJSON.toJSON === 'function') {
        try {
            return valueWithToJSON.toJSON();
        }
        catch (err) {
            // pass (The built-in `toJSON` failed, but we can still try to do it ourselves)
        }
    }
    // Get the simple cases out of the way first
    if (value === null || (['number', 'boolean', 'string'].includes(typeof value) && !isNaN$1(value))) {
        return value;
    }
    var stringified = stringifyValue(key, value);
    // Anything we could potentially dig into more (objects or arrays) will have come back as `"[object XXXX]"`.
    // Everything else will have already been serialized, so if we don't see that pattern, we're done.
    if (!stringified.startsWith('[object ')) {
        return stringified;
    }
    // We're also done if we've reached the max depth
    if (depth === 0) {
        // At this point we know `serialized` is a string of the form `"[object XXXX]"`. Clean it up so it's just `"[XXXX]"`.
        return stringified.replace('object ', '');
    }
    // If we've already visited this branch, bail out, as it's circular reference. If not, note that we're seeing it now.
    if (memoize(value)) {
        return '[Circular ~]';
    }
    // At this point we know we either have an object or an array, we haven't seen it before, and we're going to recurse
    // because we haven't yet reached the max depth. Create an accumulator to hold the results of visiting each
    // property/entry, and keep track of the number of items we add to it.
    var normalized = (Array.isArray(value) ? [] : {});
    var numAdded = 0;
    // Before we begin, convert`Error` and`Event` instances into plain objects, since some of each of their relevant
    // properties are non-enumerable and otherwise would get missed.
    var visitable = (isError$1(value) || isEvent(value) ? convertToPlainObject(value) : value);
    for (var visitKey in visitable) {
        // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
        if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
            continue;
        }
        if (numAdded >= maxProperties) {
            normalized[visitKey] = '[MaxProperties ~]';
            break;
        }
        // Recursively visit all the child nodes
        var visitValue = visitable[visitKey];
        normalized[visitKey] = visit(visitKey, visitValue, depth - 1, maxProperties, memo);
        numAdded += 1;
    }
    // Once we've visited all the branches, remove the parent from memo storage
    unmemoize(value);
    // Return accumulated values
    return normalized;
}
/**
 * Stringify the given value. Handles various known special values and types.
 *
 * Not meant to be used on simple primitives which already have a string representation, as it will, for example, turn
 * the number 1231 into "[Object Number]", nor on `null`, as it will throw.
 *
 * @param value The value to stringify
 * @returns A stringified representation of the given value
 */
function stringifyValue(key, 
// this type is a tiny bit of a cheat, since this function does handle NaN (which is technically a number), but for
// our internal use, it'll do
value) {
    try {
        if (key === 'domain' && value && typeof value === 'object' && value._events) {
            return '[Domain]';
        }
        if (key === 'domainEmitter') {
            return '[DomainEmitter]';
        }
        // It's safe to use `global`, `window`, and `document` here in this manner, as we are asserting using `typeof` first
        // which won't throw if they are not present.
        if (typeof global !== 'undefined' && value === global) {
            return '[Global]';
        }
        // eslint-disable-next-line no-restricted-globals
        if (typeof window !== 'undefined' && value === window) {
            return '[Window]';
        }
        // eslint-disable-next-line no-restricted-globals
        if (typeof document !== 'undefined' && value === document) {
            return '[Document]';
        }
        // React's SyntheticEvent thingy
        if (isSyntheticEvent(value)) {
            return '[SyntheticEvent]';
        }
        if (typeof value === 'number' && value !== value) {
            return '[NaN]';
        }
        // this catches `undefined` (but not `null`, which is a primitive and can be serialized on its own)
        if (value === void 0) {
            return '[undefined]';
        }
        if (typeof value === 'function') {
            return "[Function: " + getFunctionName(value) + "]";
        }
        if (typeof value === 'symbol') {
            return "[" + String(value) + "]";
        }
        // stringified BigInts are indistinguishable from regular numbers, so we need to label them to avoid confusion
        if (typeof value === 'bigint') {
            return "[BigInt: " + String(value) + "]";
        }
        // Now that we've knocked out all the special cases and the primitives, all we have left are objects. Simply casting
        // them to strings means that instances of classes which haven't defined their `toStringTag` will just come out as
        // `"[object Object]"`. If we instead look at the constructor's name (which is the same as the name of the class),
        // we can make sure that only plain objects come out that way.
        return "[object " + Object.getPrototypeOf(value).constructor.name + "]";
    }
    catch (err) {
        return "**non-serializable** (" + err + ")";
    }
}
/** Calculates bytes size of input string */
function utf8Length(value) {
    // eslint-disable-next-line no-bitwise
    return ~-encodeURI(value).split(/%..|./).length;
}
/** Calculates bytes size of input object */
function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
}

// Slightly modified (no IE8 support, ES6) and transcribed to TypeScript
// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
/** JSDoc */
function splitPath(filename) {
    var parts = splitPathRe.exec(filename);
    return parts ? parts.slice(1) : [];
}
/** JSDoc */
function dirname$1(path) {
    var result = splitPath(path);
    var root = result[0];
    var dir = result[1];
    if (!root && !dir) {
        // No dirname whatsoever
        return '.';
    }
    if (dir) {
        // It has a dirname, strip trailing slash
        dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
}
/** JSDoc */
function basename$2(path, ext) {
    var f = splitPath(path)[2];
    if (ext && f.substr(ext.length * -1) === ext) {
        f = f.substr(0, f.length - ext.length);
    }
    return f;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * Creates a resolved sync promise.
 *
 * @param value the value to resolve the promise with
 * @returns the resolved sync promise
 */
function resolvedSyncPromise(value) {
    return new SyncPromise(function (resolve) {
        resolve(value);
    });
}
/**
 * Creates a rejected sync promise.
 *
 * @param value the value to reject the promise with
 * @returns the rejected sync promise
 */
function rejectedSyncPromise(reason) {
    return new SyncPromise(function (_, reject) {
        reject(reason);
    });
}
/**
 * Thenable class that behaves like a Promise and follows it's interface
 * but is not async internally
 */
var SyncPromise = /** @class */ (function () {
    function SyncPromise(executor) {
        var _this = this;
        this._state = 0 /* PENDING */;
        this._handlers = [];
        /** JSDoc */
        this._resolve = function (value) {
            _this._setResult(1 /* RESOLVED */, value);
        };
        /** JSDoc */
        this._reject = function (reason) {
            _this._setResult(2 /* REJECTED */, reason);
        };
        /** JSDoc */
        this._setResult = function (state, value) {
            if (_this._state !== 0 /* PENDING */) {
                return;
            }
            if (isThenable(value)) {
                void value.then(_this._resolve, _this._reject);
                return;
            }
            _this._state = state;
            _this._value = value;
            _this._executeHandlers();
        };
        /** JSDoc */
        this._executeHandlers = function () {
            if (_this._state === 0 /* PENDING */) {
                return;
            }
            var cachedHandlers = _this._handlers.slice();
            _this._handlers = [];
            cachedHandlers.forEach(function (handler) {
                if (handler[0]) {
                    return;
                }
                if (_this._state === 1 /* RESOLVED */) {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    handler[1](_this._value);
                }
                if (_this._state === 2 /* REJECTED */) {
                    handler[2](_this._value);
                }
                handler[0] = true;
            });
        };
        try {
            executor(this._resolve, this._reject);
        }
        catch (e) {
            this._reject(e);
        }
    }
    /** JSDoc */
    SyncPromise.prototype.then = function (onfulfilled, onrejected) {
        var _this = this;
        return new SyncPromise(function (resolve, reject) {
            _this._handlers.push([
                false,
                function (result) {
                    if (!onfulfilled) {
                        // TODO: ¯\_(ツ)_/¯
                        // TODO: FIXME
                        resolve(result);
                    }
                    else {
                        try {
                            resolve(onfulfilled(result));
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                },
                function (reason) {
                    if (!onrejected) {
                        reject(reason);
                    }
                    else {
                        try {
                            resolve(onrejected(reason));
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                },
            ]);
            _this._executeHandlers();
        });
    };
    /** JSDoc */
    SyncPromise.prototype.catch = function (onrejected) {
        return this.then(function (val) { return val; }, onrejected);
    };
    /** JSDoc */
    SyncPromise.prototype.finally = function (onfinally) {
        var _this = this;
        return new SyncPromise(function (resolve, reject) {
            var val;
            var isRejected;
            return _this.then(function (value) {
                isRejected = false;
                val = value;
                if (onfinally) {
                    onfinally();
                }
            }, function (reason) {
                isRejected = true;
                val = reason;
                if (onfinally) {
                    onfinally();
                }
            }).then(function () {
                if (isRejected) {
                    reject(val);
                    return;
                }
                resolve(val);
            });
        });
    };
    return SyncPromise;
}());

/**
 * Creates an new PromiseBuffer object with the specified limit
 * @param limit max number of promises that can be stored in the buffer
 */
function makePromiseBuffer(limit) {
    var buffer = [];
    function isReady() {
        return limit === undefined || buffer.length < limit;
    }
    /**
     * Remove a promise from the queue.
     *
     * @param task Can be any PromiseLike<T>
     * @returns Removed promise.
     */
    function remove(task) {
        return buffer.splice(buffer.indexOf(task), 1)[0];
    }
    /**
     * Add a promise (representing an in-flight action) to the queue, and set it to remove itself on fulfillment.
     *
     * @param taskProducer A function producing any PromiseLike<T>; In previous versions this used to be `task:
     *        PromiseLike<T>`, but under that model, Promises were instantly created on the call-site and their executor
     *        functions therefore ran immediately. Thus, even if the buffer was full, the action still happened. By
     *        requiring the promise to be wrapped in a function, we can defer promise creation until after the buffer
     *        limit check.
     * @returns The original promise.
     */
    function add(taskProducer) {
        if (!isReady()) {
            return rejectedSyncPromise(new SentryError('Not adding Promise due to buffer limit reached.'));
        }
        // start the task and add its promise to the queue
        var task = taskProducer();
        if (buffer.indexOf(task) === -1) {
            buffer.push(task);
        }
        void task
            .then(function () { return remove(task); })
            // Use `then(null, rejectionHandler)` rather than `catch(rejectionHandler)` so that we can use `PromiseLike`
            // rather than `Promise`. `PromiseLike` doesn't have a `.catch` method, making its polyfill smaller. (ES5 didn't
            // have promises, so TS has to polyfill when down-compiling.)
            .then(null, function () {
            return remove(task).then(null, function () {
                // We have to add another catch here because `remove()` starts a new promise chain.
            });
        });
        return task;
    }
    /**
     * Wait for all promises in the queue to resolve or for timeout to expire, whichever comes first.
     *
     * @param timeout The time, in ms, after which to resolve to `false` if the queue is still non-empty. Passing `0` (or
     * not passing anything) will make the promise wait as long as it takes for the queue to drain before resolving to
     * `true`.
     * @returns A promise which will resolve to `true` if the queue is already empty or drains before the timeout, and
     * `false` otherwise
     */
    function drain(timeout) {
        return new SyncPromise(function (resolve, reject) {
            var counter = buffer.length;
            if (!counter) {
                return resolve(true);
            }
            // wait for `timeout` ms and then resolve to `false` (if not cancelled first)
            var capturedSetTimeout = setTimeout(function () {
                if (timeout && timeout > 0) {
                    resolve(false);
                }
            }, timeout);
            // if all promises resolve in time, cancel the timer and resolve to `true`
            buffer.forEach(function (item) {
                void resolvedSyncPromise(item).then(function () {
                    // eslint-disable-next-line no-plusplus
                    if (!--counter) {
                        clearTimeout(capturedSetTimeout);
                        resolve(true);
                    }
                }, reject);
            });
        });
    }
    return {
        $: buffer,
        add: add,
        drain: drain,
    };
}

function isSupportedSeverity(level) {
    return SeverityLevels.indexOf(level) !== -1;
}
/**
 * Converts a string-based level into a {@link Severity}.
 *
 * @param level string representation of Severity
 * @returns Severity
 */
function severityFromString(level) {
    if (level === 'warn')
        return Severity.Warning;
    if (isSupportedSeverity(level)) {
        return level;
    }
    return Severity.Log;
}

/**
 * Converts an HTTP status code to sentry status {@link EventStatus}.
 *
 * @param code number HTTP status code
 * @returns EventStatus
 */
function eventStatusFromHttpCode(code) {
    if (code >= 200 && code < 300) {
        return 'success';
    }
    if (code === 429) {
        return 'rate_limit';
    }
    if (code >= 400 && code < 500) {
        return 'invalid';
    }
    if (code >= 500) {
        return 'failed';
    }
    return 'unknown';
}

/**
 * A TimestampSource implementation for environments that do not support the Performance Web API natively.
 *
 * Note that this TimestampSource does not use a monotonic clock. A call to `nowSeconds` may return a timestamp earlier
 * than a previously returned value. We do not try to emulate a monotonic behavior in order to facilitate debugging. It
 * is more obvious to explain "why does my span have negative duration" than "why my spans have zero duration".
 */
var dateTimestampSource = {
    nowSeconds: function () { return Date.now() / 1000; },
};
/**
 * Returns a wrapper around the native Performance API browser implementation, or undefined for browsers that do not
 * support the API.
 *
 * Wrapping the native API works around differences in behavior from different browsers.
 */
function getBrowserPerformance() {
    var performance = getGlobalObject().performance;
    if (!performance || !performance.now) {
        return undefined;
    }
    // Replace performance.timeOrigin with our own timeOrigin based on Date.now().
    //
    // This is a partial workaround for browsers reporting performance.timeOrigin such that performance.timeOrigin +
    // performance.now() gives a date arbitrarily in the past.
    //
    // Additionally, computing timeOrigin in this way fills the gap for browsers where performance.timeOrigin is
    // undefined.
    //
    // The assumption that performance.timeOrigin + performance.now() ~= Date.now() is flawed, but we depend on it to
    // interact with data coming out of performance entries.
    //
    // Note that despite recommendations against it in the spec, browsers implement the Performance API with a clock that
    // might stop when the computer is asleep (and perhaps under other circumstances). Such behavior causes
    // performance.timeOrigin + performance.now() to have an arbitrary skew over Date.now(). In laptop computers, we have
    // observed skews that can be as long as days, weeks or months.
    //
    // See https://github.com/getsentry/sentry-javascript/issues/2590.
    //
    // BUG: despite our best intentions, this workaround has its limitations. It mostly addresses timings of pageload
    // transactions, but ignores the skew built up over time that can aversely affect timestamps of navigation
    // transactions of long-lived web pages.
    var timeOrigin = Date.now() - performance.now();
    return {
        now: function () { return performance.now(); },
        timeOrigin: timeOrigin,
    };
}
/**
 * Returns the native Performance API implementation from Node.js. Returns undefined in old Node.js versions that don't
 * implement the API.
 */
function getNodePerformance() {
    try {
        var perfHooks = dynamicRequire(module, 'perf_hooks');
        return perfHooks.performance;
    }
    catch (_) {
        return undefined;
    }
}
/**
 * The Performance API implementation for the current platform, if available.
 */
var platformPerformance = isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
var timestampSource = platformPerformance === undefined
    ? dateTimestampSource
    : {
        nowSeconds: function () { return (platformPerformance.timeOrigin + platformPerformance.now()) / 1000; },
    };
/**
 * Returns a timestamp in seconds since the UNIX epoch using the Date API.
 */
var dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
/**
 * Returns a timestamp in seconds since the UNIX epoch using either the Performance or Date APIs, depending on the
 * availability of the Performance API.
 *
 * See `usingPerformanceAPI` to test whether the Performance API is used.
 *
 * BUG: Note that because of how browsers implement the Performance API, the clock might stop when the computer is
 * asleep. This creates a skew between `dateTimestampInSeconds` and `timestampInSeconds`. The
 * skew can grow to arbitrary amounts like days, weeks or months.
 * See https://github.com/getsentry/sentry-javascript/issues/2590.
 */
var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
/**
 * The number of milliseconds since the UNIX epoch. This value is only usable in a browser, and only when the
 * performance API is available.
 */
((function () {
    // Unfortunately browsers may report an inaccurate time origin data, through either performance.timeOrigin or
    // performance.timing.navigationStart, which results in poor results in performance data. We only treat time origin
    // data as reliable if they are within a reasonable threshold of the current time.
    var performance = getGlobalObject().performance;
    if (!performance || !performance.now) {
        return undefined;
    }
    var threshold = 3600 * 1000;
    var performanceNow = performance.now();
    var dateNow = Date.now();
    // if timeOrigin isn't available set delta to threshold so it isn't used
    var timeOriginDelta = performance.timeOrigin
        ? Math.abs(performance.timeOrigin + performanceNow - dateNow)
        : threshold;
    var timeOriginIsReliable = timeOriginDelta < threshold;
    // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
    // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
    // Also as of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always
    // a valid fallback. In the absence of an initial time provided by the browser, fallback to the current time from the
    // Date API.
    // eslint-disable-next-line deprecation/deprecation
    var navigationStart = performance.timing && performance.timing.navigationStart;
    var hasNavigationStart = typeof navigationStart === 'number';
    // if navigationStart isn't available set delta to threshold so it isn't used
    var navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
    var navigationStartIsReliable = navigationStartDelta < threshold;
    if (timeOriginIsReliable || navigationStartIsReliable) {
        // Use the more reliable time origin
        if (timeOriginDelta <= navigationStartDelta) {
            return performance.timeOrigin;
        }
        else {
            return navigationStart;
        }
    }
    return dateNow;
}))();

var TRACEPARENT_REGEXP = new RegExp('^[ \\t]*' + // whitespace
    '([0-9a-f]{32})?' + // trace_id
    '-?([0-9a-f]{16})?' + // span_id
    '-?([01])?' + // sampled
    '[ \\t]*$');
/**
 * Extract transaction context data from a `sentry-trace` header.
 *
 * @param traceparent Traceparent string
 *
 * @returns Object containing data from the header, or undefined if traceparent string is malformed
 */
function extractTraceparentData(traceparent) {
    var matches = traceparent.match(TRACEPARENT_REGEXP);
    if (matches) {
        var parentSampled = void 0;
        if (matches[3] === '1') {
            parentSampled = true;
        }
        else if (matches[3] === '0') {
            parentSampled = false;
        }
        return {
            traceId: matches[1],
            parentSampled: parentSampled,
            parentSpanId: matches[2],
        };
    }
    return undefined;
}

/**
 * Creates an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */
function createEnvelope(headers, items) {
    if (items === void 0) { items = []; }
    return [headers, items];
}
/**
 * Get the type of the envelope. Grabs the type from the first envelope item.
 */
function getEnvelopeType(envelope) {
    var _a = __read$1(envelope, 2), _b = __read$1(_a[1], 1), _c = __read$1(_b[0], 1), firstItemHeader = _c[0];
    return firstItemHeader.type;
}
/**
 * Serializes an envelope into a string.
 */
function serializeEnvelope(envelope) {
    var _a = __read$1(envelope, 2), headers = _a[0], items = _a[1];
    var serializedHeaders = JSON.stringify(headers);
    // Have to cast items to any here since Envelope is a union type
    // Fixed in Typescript 4.2
    // TODO: Remove any[] cast when we upgrade to TS 4.2
    // https://github.com/microsoft/TypeScript/issues/36390
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.reduce(function (acc, item) {
        var _a = __read$1(item, 2), itemHeaders = _a[0], payload = _a[1];
        // We do not serialize payloads that are primitives
        var serializedPayload = isPrimitive(payload) ? String(payload) : JSON.stringify(payload);
        return acc + "\n" + JSON.stringify(itemHeaders) + "\n" + serializedPayload;
    }, serializedHeaders);
}

var DEFAULT_RETRY_AFTER = 60 * 1000; // 60 seconds
/**
 * Extracts Retry-After value from the request header or returns default value
 * @param header string representation of 'Retry-After' header
 * @param now current unix timestamp
 *
 */
function parseRetryAfterHeader(header, now) {
    if (now === void 0) { now = Date.now(); }
    var headerDelay = parseInt("" + header, 10);
    if (!isNaN(headerDelay)) {
        return headerDelay * 1000;
    }
    var headerDate = Date.parse("" + header);
    if (!isNaN(headerDate)) {
        return headerDate - now;
    }
    return DEFAULT_RETRY_AFTER;
}
/**
 * Gets the time that given category is disabled until for rate limiting
 */
function disabledUntil(limits, category) {
    return limits[category] || limits.all || 0;
}
/**
 * Checks if a category is rate limited
 */
function isRateLimited(limits, category, now) {
    if (now === void 0) { now = Date.now(); }
    return disabledUntil(limits, category) > now;
}
/**
 * Update ratelimits from incoming headers.
 * Returns true if headers contains a non-empty rate limiting header.
 */
function updateRateLimits(limits, headers, now) {
    var e_1, _a, e_2, _b;
    if (now === void 0) { now = Date.now(); }
    var updatedRateLimits = __assign$2({}, limits);
    // "The name is case-insensitive."
    // https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
    var rateLimitHeader = headers['x-sentry-rate-limits'];
    var retryAfterHeader = headers['retry-after'];
    if (rateLimitHeader) {
        try {
            /**
             * rate limit headers are of the form
             *     <header>,<header>,..
             * where each <header> is of the form
             *     <retry_after>: <categories>: <scope>: <reason_code>
             * where
             *     <retry_after> is a delay in seconds
             *     <categories> is the event type(s) (error, transaction, etc) being rate limited and is of the form
             *         <category>;<category>;...
             *     <scope> is what's being limited (org, project, or key) - ignored by SDK
             *     <reason_code> is an arbitrary string like "org_quota" - ignored by SDK
             */
            for (var _c = __values$1(rateLimitHeader.trim().split(',')), _d = _c.next(); !_d.done; _d = _c.next()) {
                var limit = _d.value;
                var parameters = limit.split(':', 2);
                var headerDelay = parseInt(parameters[0], 10);
                var delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1000; // 60sec default
                if (!parameters[1]) {
                    updatedRateLimits.all = now + delay;
                }
                else {
                    try {
                        for (var _e = (e_2 = void 0, __values$1(parameters[1].split(';'))), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var category = _f.value;
                            updatedRateLimits[category] = now + delay;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else if (retryAfterHeader) {
        updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
    }
    return updatedRateLimits;
}

/**
 * Absolute maximum number of breadcrumbs added to an event.
 * The `maxBreadcrumbs` option cannot be higher than this value.
 */
var MAX_BREADCRUMBS = 100;
/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */
var Scope = /** @class */ (function () {
    function Scope() {
        /** Flag if notifying is happening. */
        this._notifyingListeners = false;
        /** Callback for client to receive scope changes. */
        this._scopeListeners = [];
        /** Callback list that will be called after {@link applyToEvent}. */
        this._eventProcessors = [];
        /** Array of breadcrumbs. */
        this._breadcrumbs = [];
        /** User */
        this._user = {};
        /** Tags */
        this._tags = {};
        /** Extra */
        this._extra = {};
        /** Contexts */
        this._contexts = {};
        /**
         * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
         * sent to Sentry
         */
        this._sdkProcessingMetadata = {};
    }
    /**
     * Inherit values from the parent scope.
     * @param scope to clone.
     */
    Scope.clone = function (scope) {
        var newScope = new Scope();
        if (scope) {
            newScope._breadcrumbs = __spread$2(scope._breadcrumbs);
            newScope._tags = __assign$3({}, scope._tags);
            newScope._extra = __assign$3({}, scope._extra);
            newScope._contexts = __assign$3({}, scope._contexts);
            newScope._user = scope._user;
            newScope._level = scope._level;
            newScope._span = scope._span;
            newScope._session = scope._session;
            newScope._transactionName = scope._transactionName;
            newScope._fingerprint = scope._fingerprint;
            newScope._eventProcessors = __spread$2(scope._eventProcessors);
            newScope._requestSession = scope._requestSession;
        }
        return newScope;
    };
    /**
     * Add internal on change listener. Used for sub SDKs that need to store the scope.
     * @hidden
     */
    Scope.prototype.addScopeListener = function (callback) {
        this._scopeListeners.push(callback);
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.addEventProcessor = function (callback) {
        this._eventProcessors.push(callback);
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setUser = function (user) {
        this._user = user || {};
        if (this._session) {
            this._session.update({ user: user });
        }
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.getUser = function () {
        return this._user;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.getRequestSession = function () {
        return this._requestSession;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setRequestSession = function (requestSession) {
        this._requestSession = requestSession;
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setTags = function (tags) {
        this._tags = __assign$3(__assign$3({}, this._tags), tags);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setTag = function (key, value) {
        var _a;
        this._tags = __assign$3(__assign$3({}, this._tags), (_a = {}, _a[key] = value, _a));
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setExtras = function (extras) {
        this._extra = __assign$3(__assign$3({}, this._extra), extras);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setExtra = function (key, extra) {
        var _a;
        this._extra = __assign$3(__assign$3({}, this._extra), (_a = {}, _a[key] = extra, _a));
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setFingerprint = function (fingerprint) {
        this._fingerprint = fingerprint;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setLevel = function (level) {
        this._level = level;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setTransactionName = function (name) {
        this._transactionName = name;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * Can be removed in major version.
     * @deprecated in favor of {@link this.setTransactionName}
     */
    Scope.prototype.setTransaction = function (name) {
        return this.setTransactionName(name);
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setContext = function (key, context) {
        var _a;
        if (context === null) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this._contexts[key];
        }
        else {
            this._contexts = __assign$3(__assign$3({}, this._contexts), (_a = {}, _a[key] = context, _a));
        }
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setSpan = function (span) {
        this._span = span;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.getSpan = function () {
        return this._span;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.getTransaction = function () {
        // Often, this span (if it exists at all) will be a transaction, but it's not guaranteed to be. Regardless, it will
        // have a pointer to the currently-active transaction.
        var span = this.getSpan();
        return span && span.transaction;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setSession = function (session) {
        if (!session) {
            delete this._session;
        }
        else {
            this._session = session;
        }
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.getSession = function () {
        return this._session;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.update = function (captureContext) {
        if (!captureContext) {
            return this;
        }
        if (typeof captureContext === 'function') {
            var updatedScope = captureContext(this);
            return updatedScope instanceof Scope ? updatedScope : this;
        }
        if (captureContext instanceof Scope) {
            this._tags = __assign$3(__assign$3({}, this._tags), captureContext._tags);
            this._extra = __assign$3(__assign$3({}, this._extra), captureContext._extra);
            this._contexts = __assign$3(__assign$3({}, this._contexts), captureContext._contexts);
            if (captureContext._user && Object.keys(captureContext._user).length) {
                this._user = captureContext._user;
            }
            if (captureContext._level) {
                this._level = captureContext._level;
            }
            if (captureContext._fingerprint) {
                this._fingerprint = captureContext._fingerprint;
            }
            if (captureContext._requestSession) {
                this._requestSession = captureContext._requestSession;
            }
        }
        else if (isPlainObject$1(captureContext)) {
            // eslint-disable-next-line no-param-reassign
            captureContext = captureContext;
            this._tags = __assign$3(__assign$3({}, this._tags), captureContext.tags);
            this._extra = __assign$3(__assign$3({}, this._extra), captureContext.extra);
            this._contexts = __assign$3(__assign$3({}, this._contexts), captureContext.contexts);
            if (captureContext.user) {
                this._user = captureContext.user;
            }
            if (captureContext.level) {
                this._level = captureContext.level;
            }
            if (captureContext.fingerprint) {
                this._fingerprint = captureContext.fingerprint;
            }
            if (captureContext.requestSession) {
                this._requestSession = captureContext.requestSession;
            }
        }
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.clear = function () {
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = undefined;
        this._transactionName = undefined;
        this._fingerprint = undefined;
        this._requestSession = undefined;
        this._span = undefined;
        this._session = undefined;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
        var maxCrumbs = typeof maxBreadcrumbs === 'number' ? Math.min(maxBreadcrumbs, MAX_BREADCRUMBS) : MAX_BREADCRUMBS;
        // No data has been changed, so don't notify scope listeners
        if (maxCrumbs <= 0) {
            return this;
        }
        var mergedBreadcrumb = __assign$3({ timestamp: dateTimestampInSeconds() }, breadcrumb);
        this._breadcrumbs = __spread$2(this._breadcrumbs, [mergedBreadcrumb]).slice(-maxCrumbs);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.clearBreadcrumbs = function () {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
    };
    /**
     * Applies the current context and fingerprint to the event.
     * Note that breadcrumbs will be added by the client.
     * Also if the event has already breadcrumbs on it, we do not merge them.
     * @param event Event
     * @param hint May contain additional information about the original exception.
     * @hidden
     */
    Scope.prototype.applyToEvent = function (event, hint) {
        if (this._extra && Object.keys(this._extra).length) {
            event.extra = __assign$3(__assign$3({}, this._extra), event.extra);
        }
        if (this._tags && Object.keys(this._tags).length) {
            event.tags = __assign$3(__assign$3({}, this._tags), event.tags);
        }
        if (this._user && Object.keys(this._user).length) {
            event.user = __assign$3(__assign$3({}, this._user), event.user);
        }
        if (this._contexts && Object.keys(this._contexts).length) {
            event.contexts = __assign$3(__assign$3({}, this._contexts), event.contexts);
        }
        if (this._level) {
            event.level = this._level;
        }
        if (this._transactionName) {
            event.transaction = this._transactionName;
        }
        // We want to set the trace context for normal events only if there isn't already
        // a trace context on the event. There is a product feature in place where we link
        // errors with transaction and it relies on that.
        if (this._span) {
            event.contexts = __assign$3({ trace: this._span.getTraceContext() }, event.contexts);
            var transactionName = this._span.transaction && this._span.transaction.name;
            if (transactionName) {
                event.tags = __assign$3({ transaction: transactionName }, event.tags);
            }
        }
        this._applyFingerprint(event);
        event.breadcrumbs = __spread$2((event.breadcrumbs || []), this._breadcrumbs);
        event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;
        event.sdkProcessingMetadata = this._sdkProcessingMetadata;
        return this._notifyEventProcessors(__spread$2(getGlobalEventProcessors(), this._eventProcessors), event, hint);
    };
    /**
     * Add data which will be accessible during event processing but won't get sent to Sentry
     */
    Scope.prototype.setSDKProcessingMetadata = function (newData) {
        this._sdkProcessingMetadata = __assign$3(__assign$3({}, this._sdkProcessingMetadata), newData);
        return this;
    };
    /**
     * This will be called after {@link applyToEvent} is finished.
     */
    Scope.prototype._notifyEventProcessors = function (processors, event, hint, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        return new SyncPromise(function (resolve, reject) {
            var processor = processors[index];
            if (event === null || typeof processor !== 'function') {
                resolve(event);
            }
            else {
                var result = processor(__assign$3({}, event), hint);
                if (isThenable(result)) {
                    void result
                        .then(function (final) { return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve); })
                        .then(null, reject);
                }
                else {
                    void _this._notifyEventProcessors(processors, result, hint, index + 1)
                        .then(resolve)
                        .then(null, reject);
                }
            }
        });
    };
    /**
     * This will be called on every set call.
     */
    Scope.prototype._notifyScopeListeners = function () {
        var _this = this;
        // We need this check for this._notifyingListeners to be able to work on scope during updates
        // If this check is not here we'll produce endless recursion when something is done with the scope
        // during the callback.
        if (!this._notifyingListeners) {
            this._notifyingListeners = true;
            this._scopeListeners.forEach(function (callback) {
                callback(_this);
            });
            this._notifyingListeners = false;
        }
    };
    /**
     * Applies fingerprint from the scope to the event if there's one,
     * uses message if there's one instead or get rid of empty fingerprint
     */
    Scope.prototype._applyFingerprint = function (event) {
        // Make sure it's an array first and we actually have something in place
        event.fingerprint = event.fingerprint
            ? Array.isArray(event.fingerprint)
                ? event.fingerprint
                : [event.fingerprint]
            : [];
        // If we have something on the scope, then merge it with event
        if (this._fingerprint) {
            event.fingerprint = event.fingerprint.concat(this._fingerprint);
        }
        // If we have no data at all, remove empty array default
        if (event.fingerprint && !event.fingerprint.length) {
            delete event.fingerprint;
        }
    };
    return Scope;
}());
/**
 * Returns the global event processors.
 */
function getGlobalEventProcessors() {
    return getGlobalSingleton('globalEventProcessors', function () { return []; });
}
/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */
function addGlobalEventProcessor(callback) {
    getGlobalEventProcessors().push(callback);
}

/**
 * @inheritdoc
 */
var Session = /** @class */ (function () {
    function Session(context) {
        this.errors = 0;
        this.sid = uuid4();
        this.duration = 0;
        this.status = 'ok';
        this.init = true;
        this.ignoreDuration = false;
        // Both timestamp and started are in seconds since the UNIX epoch.
        var startingTime = timestampInSeconds();
        this.timestamp = startingTime;
        this.started = startingTime;
        if (context) {
            this.update(context);
        }
    }
    /** JSDoc */
    // eslint-disable-next-line complexity
    Session.prototype.update = function (context) {
        if (context === void 0) { context = {}; }
        if (context.user) {
            if (!this.ipAddress && context.user.ip_address) {
                this.ipAddress = context.user.ip_address;
            }
            if (!this.did && !context.did) {
                this.did = context.user.id || context.user.email || context.user.username;
            }
        }
        this.timestamp = context.timestamp || timestampInSeconds();
        if (context.ignoreDuration) {
            this.ignoreDuration = context.ignoreDuration;
        }
        if (context.sid) {
            // Good enough uuid validation. — Kamil
            this.sid = context.sid.length === 32 ? context.sid : uuid4();
        }
        if (context.init !== undefined) {
            this.init = context.init;
        }
        if (!this.did && context.did) {
            this.did = "" + context.did;
        }
        if (typeof context.started === 'number') {
            this.started = context.started;
        }
        if (this.ignoreDuration) {
            this.duration = undefined;
        }
        else if (typeof context.duration === 'number') {
            this.duration = context.duration;
        }
        else {
            var duration = this.timestamp - this.started;
            this.duration = duration >= 0 ? duration : 0;
        }
        if (context.release) {
            this.release = context.release;
        }
        if (context.environment) {
            this.environment = context.environment;
        }
        if (!this.ipAddress && context.ipAddress) {
            this.ipAddress = context.ipAddress;
        }
        if (!this.userAgent && context.userAgent) {
            this.userAgent = context.userAgent;
        }
        if (typeof context.errors === 'number') {
            this.errors = context.errors;
        }
        if (context.status) {
            this.status = context.status;
        }
    };
    /** JSDoc */
    Session.prototype.close = function (status) {
        if (status) {
            this.update({ status: status });
        }
        else if (this.status === 'ok') {
            this.update({ status: 'exited' });
        }
        else {
            this.update();
        }
    };
    /** JSDoc */
    Session.prototype.toJSON = function () {
        return dropUndefinedKeys({
            sid: "" + this.sid,
            init: this.init,
            // Make sure that sec is converted to ms for date constructor
            started: new Date(this.started * 1000).toISOString(),
            timestamp: new Date(this.timestamp * 1000).toISOString(),
            status: this.status,
            errors: this.errors,
            did: typeof this.did === 'number' || typeof this.did === 'string' ? "" + this.did : undefined,
            duration: this.duration,
            attrs: {
                release: this.release,
                environment: this.environment,
                ip_address: this.ipAddress,
                user_agent: this.userAgent,
            },
        });
    };
    return Session;
}());

/*
 * This file defines flags and constants that can be modified during compile time in order to facilitate tree shaking
 * for users.
 *
 * Debug flags need to be declared in each package individually and must not be imported across package boundaries,
 * because some build tools have trouble tree-shaking imported guards.
 *
 * As a convention, we define debug flags in a `flags.ts` file in the root of a package's `src` folder.
 *
 * Debug flag files will contain "magic strings" like `__SENTRY_DEBUG__` that may get replaced with actual values during
 * our, or the user's build process. Take care when introducing new flags - they must not throw if they are not
 * replaced.
 */
/** Flag that is true for debug builds, false otherwise. */
var IS_DEBUG_BUILD$2 = typeof __SENTRY_DEBUG__ === 'undefined' ? true : __SENTRY_DEBUG__;

/**
 * API compatibility version of this hub.
 *
 * WARNING: This number should only be increased when the global interface
 * changes and new methods are introduced.
 *
 * @hidden
 */
var API_VERSION = 4;
/**
 * Default maximum number of breadcrumbs added to an event. Can be overwritten
 * with {@link Options.maxBreadcrumbs}.
 */
var DEFAULT_BREADCRUMBS = 100;
/**
 * @inheritDoc
 */
var Hub = /** @class */ (function () {
    /**
     * Creates a new instance of the hub, will push one {@link Layer} into the
     * internal stack on creation.
     *
     * @param client bound to the hub.
     * @param scope bound to the hub.
     * @param version number, higher number means higher priority.
     */
    function Hub(client, scope, _version) {
        if (scope === void 0) { scope = new Scope(); }
        if (_version === void 0) { _version = API_VERSION; }
        this._version = _version;
        /** Is a {@link Layer}[] containing the client and scope */
        this._stack = [{}];
        this.getStackTop().scope = scope;
        if (client) {
            this.bindClient(client);
        }
    }
    /**
     * @inheritDoc
     */
    Hub.prototype.isOlderThan = function (version) {
        return this._version < version;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.bindClient = function (client) {
        var top = this.getStackTop();
        top.client = client;
        if (client && client.setupIntegrations) {
            client.setupIntegrations();
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.pushScope = function () {
        // We want to clone the content of prev scope
        var scope = Scope.clone(this.getScope());
        this.getStack().push({
            client: this.getClient(),
            scope: scope,
        });
        return scope;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.popScope = function () {
        if (this.getStack().length <= 1)
            return false;
        return !!this.getStack().pop();
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.withScope = function (callback) {
        var scope = this.pushScope();
        try {
            callback(scope);
        }
        finally {
            this.popScope();
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.getClient = function () {
        return this.getStackTop().client;
    };
    /** Returns the scope of the top stack. */
    Hub.prototype.getScope = function () {
        return this.getStackTop().scope;
    };
    /** Returns the scope stack for domains or the process. */
    Hub.prototype.getStack = function () {
        return this._stack;
    };
    /** Returns the topmost scope layer in the order domain > local > process. */
    Hub.prototype.getStackTop = function () {
        return this._stack[this._stack.length - 1];
    };
    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    Hub.prototype.captureException = function (exception, hint) {
        var eventId = (this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4());
        var finalHint = hint;
        // If there's no explicit hint provided, mimic the same thing that would happen
        // in the minimal itself to create a consistent behavior.
        // We don't do this in the client, as it's the lowest level API, and doing this,
        // would prevent user from having full control over direct calls.
        if (!hint) {
            var syntheticException = void 0;
            try {
                throw new Error('Sentry syntheticException');
            }
            catch (exception) {
                syntheticException = exception;
            }
            finalHint = {
                originalException: exception,
                syntheticException: syntheticException,
            };
        }
        this._invokeClient('captureException', exception, __assign$3(__assign$3({}, finalHint), { event_id: eventId }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.captureMessage = function (message, level, hint) {
        var eventId = (this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4());
        var finalHint = hint;
        // If there's no explicit hint provided, mimic the same thing that would happen
        // in the minimal itself to create a consistent behavior.
        // We don't do this in the client, as it's the lowest level API, and doing this,
        // would prevent user from having full control over direct calls.
        if (!hint) {
            var syntheticException = void 0;
            try {
                throw new Error(message);
            }
            catch (exception) {
                syntheticException = exception;
            }
            finalHint = {
                originalException: message,
                syntheticException: syntheticException,
            };
        }
        this._invokeClient('captureMessage', message, level, __assign$3(__assign$3({}, finalHint), { event_id: eventId }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.captureEvent = function (event, hint) {
        var eventId = hint && hint.event_id ? hint.event_id : uuid4();
        if (event.type !== 'transaction') {
            this._lastEventId = eventId;
        }
        this._invokeClient('captureEvent', event, __assign$3(__assign$3({}, hint), { event_id: eventId }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.lastEventId = function () {
        return this._lastEventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (!scope || !client)
            return;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var _b = (client.getOptions && client.getOptions()) || {}, _c = _b.beforeBreadcrumb, beforeBreadcrumb = _c === void 0 ? null : _c, _d = _b.maxBreadcrumbs, maxBreadcrumbs = _d === void 0 ? DEFAULT_BREADCRUMBS : _d;
        if (maxBreadcrumbs <= 0)
            return;
        var timestamp = dateTimestampInSeconds();
        var mergedBreadcrumb = __assign$3({ timestamp: timestamp }, breadcrumb);
        var finalBreadcrumb = beforeBreadcrumb
            ? consoleSandbox(function () { return beforeBreadcrumb(mergedBreadcrumb, hint); })
            : mergedBreadcrumb;
        if (finalBreadcrumb === null)
            return;
        scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setUser = function (user) {
        var scope = this.getScope();
        if (scope)
            scope.setUser(user);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setTags = function (tags) {
        var scope = this.getScope();
        if (scope)
            scope.setTags(tags);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setExtras = function (extras) {
        var scope = this.getScope();
        if (scope)
            scope.setExtras(extras);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setTag = function (key, value) {
        var scope = this.getScope();
        if (scope)
            scope.setTag(key, value);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setExtra = function (key, extra) {
        var scope = this.getScope();
        if (scope)
            scope.setExtra(key, extra);
    };
    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Hub.prototype.setContext = function (name, context) {
        var scope = this.getScope();
        if (scope)
            scope.setContext(name, context);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.configureScope = function (callback) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (scope && client) {
            callback(scope);
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.run = function (callback) {
        var oldHub = makeMain(this);
        try {
            callback(this);
        }
        finally {
            makeMain(oldHub);
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.getIntegration = function (integration) {
        var client = this.getClient();
        if (!client)
            return null;
        try {
            return client.getIntegration(integration);
        }
        catch (_oO) {
            IS_DEBUG_BUILD$2 && logger$3.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
            return null;
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.startSpan = function (context) {
        return this._callExtensionMethod('startSpan', context);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.startTransaction = function (context, customSamplingContext) {
        return this._callExtensionMethod('startTransaction', context, customSamplingContext);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.traceHeaders = function () {
        return this._callExtensionMethod('traceHeaders');
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.captureSession = function (endSession) {
        if (endSession === void 0) { endSession = false; }
        // both send the update and pull the session from the scope
        if (endSession) {
            return this.endSession();
        }
        // only send the update
        this._sendSessionUpdate();
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.endSession = function () {
        var layer = this.getStackTop();
        var scope = layer && layer.scope;
        var session = scope && scope.getSession();
        if (session) {
            session.close();
        }
        this._sendSessionUpdate();
        // the session is over; take it off of the scope
        if (scope) {
            scope.setSession();
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.startSession = function (context) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        var _b = (client && client.getOptions()) || {}, release = _b.release, environment = _b.environment;
        // Will fetch userAgent if called from browser sdk
        var global = getGlobalObject();
        var userAgent = (global.navigator || {}).userAgent;
        var session = new Session(__assign$3(__assign$3(__assign$3({ release: release,
            environment: environment }, (scope && { user: scope.getUser() })), (userAgent && { userAgent: userAgent })), context));
        if (scope) {
            // End existing session if there's one
            var currentSession = scope.getSession && scope.getSession();
            if (currentSession && currentSession.status === 'ok') {
                currentSession.update({ status: 'exited' });
            }
            this.endSession();
            // Afterwards we set the new session on the scope
            scope.setSession(session);
        }
        return session;
    };
    /**
     * Sends the current Session on the scope
     */
    Hub.prototype._sendSessionUpdate = function () {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (!scope)
            return;
        var session = scope.getSession && scope.getSession();
        if (session) {
            if (client && client.captureSession) {
                client.captureSession(session);
            }
        }
    };
    /**
     * Internal helper function to call a method on the top client if it exists.
     *
     * @param method The method to call on the client.
     * @param args Arguments to pass to the client function.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Hub.prototype._invokeClient = function (method) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _b = this.getStackTop(), scope = _b.scope, client = _b.client;
        if (client && client[method]) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            (_a = client)[method].apply(_a, __spread$2(args, [scope]));
        }
    };
    /**
     * Calls global extension method and binding current instance to the function call
     */
    // @ts-ignore Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Hub.prototype._callExtensionMethod = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var carrier = getMainCarrier();
        var sentry = carrier.__SENTRY__;
        if (sentry && sentry.extensions && typeof sentry.extensions[method] === 'function') {
            return sentry.extensions[method].apply(this, args);
        }
        IS_DEBUG_BUILD$2 && logger$3.warn("Extension method " + method + " couldn't be found, doing nothing.");
    };
    return Hub;
}());
/**
 * Returns the global shim registry.
 *
 * FIXME: This function is problematic, because despite always returning a valid Carrier,
 * it has an optional `__SENTRY__` property, which then in turn requires us to always perform an unnecessary check
 * at the call-site. We always access the carrier through this function, so we can guarantee that `__SENTRY__` is there.
 **/
function getMainCarrier() {
    var carrier = getGlobalObject();
    carrier.__SENTRY__ = carrier.__SENTRY__ || {
        extensions: {},
        hub: undefined,
    };
    return carrier;
}
/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 */
function makeMain(hub) {
    var registry = getMainCarrier();
    var oldHub = getHubFromCarrier(registry);
    setHubOnCarrier(registry, hub);
    return oldHub;
}
/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 */
function getCurrentHub() {
    // Get main carrier (global for every environment)
    var registry = getMainCarrier();
    // If there's no hub, or its an old API, assign a new one
    if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
        setHubOnCarrier(registry, new Hub());
    }
    // Prefer domains over global if they are there (applicable only to Node environment)
    if (isNodeEnv()) {
        return getHubFromActiveDomain(registry);
    }
    // Return hub that lives on a global object
    return getHubFromCarrier(registry);
}
/**
 * Try to read the hub from an active domain, and fallback to the registry if one doesn't exist
 * @returns discovered hub
 */
function getHubFromActiveDomain(registry) {
    try {
        var sentry = getMainCarrier().__SENTRY__;
        var activeDomain = sentry && sentry.extensions && sentry.extensions.domain && sentry.extensions.domain.active;
        // If there's no active domain, just return global hub
        if (!activeDomain) {
            return getHubFromCarrier(registry);
        }
        // If there's no hub on current domain, or it's an old API, assign a new one
        if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
            var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
            setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, Scope.clone(registryHubTopStack.scope)));
        }
        // Return hub that lives on a domain
        return getHubFromCarrier(activeDomain);
    }
    catch (_Oo) {
        // Return hub that lives on a global object
        return getHubFromCarrier(registry);
    }
}
/**
 * This will tell whether a carrier has a hub on it or not
 * @param carrier object
 */
function hasHubOnCarrier(carrier) {
    return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
}
/**
 * This will create a new {@link Hub} and add to the passed object on
 * __SENTRY__.hub.
 * @param carrier object
 * @hidden
 */
function getHubFromCarrier(carrier) {
    return getGlobalSingleton('hub', function () { return new Hub(); }, carrier);
}
/**
 * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
 * @param carrier object
 * @param hub Hub
 * @returns A boolean indicating success or failure
 */
function setHubOnCarrier(carrier, hub) {
    if (!carrier)
        return false;
    var __SENTRY__ = (carrier.__SENTRY__ = carrier.__SENTRY__ || {});
    __SENTRY__.hub = hub;
    return true;
}

/**
 * @inheritdoc
 */
var SessionFlusher = /** @class */ (function () {
    function SessionFlusher(transport, attrs) {
        var _this = this;
        this.flushTimeout = 60;
        this._pendingAggregates = {};
        this._isEnabled = true;
        this._transport = transport;
        // Call to setInterval, so that flush is called every 60 seconds
        this._intervalId = setInterval(function () { return _this.flush(); }, this.flushTimeout * 1000);
        this._sessionAttrs = attrs;
    }
    /** Sends session aggregates to Transport */
    SessionFlusher.prototype.sendSessionAggregates = function (sessionAggregates) {
        if (!this._transport.sendSession) {
            IS_DEBUG_BUILD$2 && logger$3.warn("Dropping session because custom transport doesn't implement sendSession");
            return;
        }
        void this._transport.sendSession(sessionAggregates).then(null, function (reason) {
            IS_DEBUG_BUILD$2 && logger$3.error('Error while sending session:', reason);
        });
    };
    /** Checks if `pendingAggregates` has entries, and if it does flushes them by calling `sendSessions` */
    SessionFlusher.prototype.flush = function () {
        var sessionAggregates = this.getSessionAggregates();
        if (sessionAggregates.aggregates.length === 0) {
            return;
        }
        this._pendingAggregates = {};
        this.sendSessionAggregates(sessionAggregates);
    };
    /** Massages the entries in `pendingAggregates` and returns aggregated sessions */
    SessionFlusher.prototype.getSessionAggregates = function () {
        var _this = this;
        var aggregates = Object.keys(this._pendingAggregates).map(function (key) {
            return _this._pendingAggregates[parseInt(key)];
        });
        var sessionAggregates = {
            attrs: this._sessionAttrs,
            aggregates: aggregates,
        };
        return dropUndefinedKeys(sessionAggregates);
    };
    /** JSDoc */
    SessionFlusher.prototype.close = function () {
        clearInterval(this._intervalId);
        this._isEnabled = false;
        this.flush();
    };
    /**
     * Wrapper function for _incrementSessionStatusCount that checks if the instance of SessionFlusher is enabled then
     * fetches the session status of the request from `Scope.getRequestSession().status` on the scope and passes them to
     * `_incrementSessionStatusCount` along with the start date
     */
    SessionFlusher.prototype.incrementSessionStatusCount = function () {
        if (!this._isEnabled) {
            return;
        }
        var scope = getCurrentHub().getScope();
        var requestSession = scope && scope.getRequestSession();
        if (requestSession && requestSession.status) {
            this._incrementSessionStatusCount(requestSession.status, new Date());
            // This is not entirely necessarily but is added as a safe guard to indicate the bounds of a request and so in
            // case captureRequestSession is called more than once to prevent double count
            if (scope) {
                scope.setRequestSession(undefined);
            }
            /* eslint-enable @typescript-eslint/no-unsafe-member-access */
        }
    };
    /**
     * Increments status bucket in pendingAggregates buffer (internal state) corresponding to status of
     * the session received
     */
    SessionFlusher.prototype._incrementSessionStatusCount = function (status, date) {
        // Truncate minutes and seconds on Session Started attribute to have one minute bucket keys
        var sessionStartedTrunc = new Date(date).setSeconds(0, 0);
        this._pendingAggregates[sessionStartedTrunc] = this._pendingAggregates[sessionStartedTrunc] || {};
        // corresponds to aggregated sessions in one specific minute bucket
        // for example, {"started":"2021-03-16T08:00:00.000Z","exited":4, "errored": 1}
        var aggregationCounts = this._pendingAggregates[sessionStartedTrunc];
        if (!aggregationCounts.started) {
            aggregationCounts.started = new Date(sessionStartedTrunc).toISOString();
        }
        switch (status) {
            case 'errored':
                aggregationCounts.errored = (aggregationCounts.errored || 0) + 1;
                return aggregationCounts.errored;
            case 'ok':
                aggregationCounts.exited = (aggregationCounts.exited || 0) + 1;
                return aggregationCounts.exited;
            default:
                aggregationCounts.crashed = (aggregationCounts.crashed || 0) + 1;
                return aggregationCounts.crashed;
        }
    };
    return SessionFlusher;
}());

/**
 * This calls a function on the current hub.
 * @param method function to call on hub.
 * @param args to pass to function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callOnHub(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var hub = getCurrentHub();
    if (hub && hub[method]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return hub[method].apply(hub, __spread$3(args));
    }
    throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
}
/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @returns The generated eventId.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function captureException(exception, captureContext) {
    var syntheticException = new Error('Sentry syntheticException');
    return callOnHub('captureException', exception, {
        captureContext: captureContext,
        originalException: exception,
        syntheticException: syntheticException,
    });
}
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param Severity Define the level of the message.
 * @returns The generated eventId.
 */
function captureMessage(message, captureContext) {
    var syntheticException = new Error(message);
    // This is necessary to provide explicit scopes upgrade, without changing the original
    // arity of the `captureMessage(message, level)` method.
    var level = typeof captureContext === 'string' ? captureContext : undefined;
    var context = typeof captureContext !== 'string' ? { captureContext: captureContext } : undefined;
    return callOnHub('captureMessage', message, level, __assign$4({ originalException: message, syntheticException: syntheticException }, context));
}
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @returns The generated eventId.
 */
function captureEvent(event) {
    return callOnHub('captureEvent', event);
}
/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 */
function configureScope(callback) {
    callOnHub('configureScope', callback);
}
/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
function addBreadcrumb(breadcrumb) {
    callOnHub('addBreadcrumb', breadcrumb);
}
/**
 * Sets context data with the given name.
 * @param name of the context
 * @param context Any kind of data. This data will be normalized.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setContext(name, context) {
    callOnHub('setContext', name, context);
}
/**
 * Set an object that will be merged sent as extra data with the event.
 * @param extras Extras object to merge into current context.
 */
function setExtras(extras) {
    callOnHub('setExtras', extras);
}
/**
 * Set an object that will be merged sent as tags data with the event.
 * @param tags Tags context object to merge into current context.
 */
function setTags(tags) {
    callOnHub('setTags', tags);
}
/**
 * Set key:value that will be sent as extra data with the event.
 * @param key String of extra
 * @param extra Any kind of data. This data will be normalized.
 */
function setExtra(key, extra) {
    callOnHub('setExtra', key, extra);
}
/**
 * Set key:value that will be sent as tags data with the event.
 *
 * Can also be used to unset a tag, by passing `undefined`.
 *
 * @param key String key of tag
 * @param value Value of tag
 */
function setTag(key, value) {
    callOnHub('setTag', key, value);
}
/**
 * Updates user context information for future events.
 *
 * @param user User context object to be set in the current context. Pass `null` to unset the user.
 */
function setUser(user) {
    callOnHub('setUser', user);
}
/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */
function withScope(callback) {
    callOnHub('withScope', callback);
}
/**
 * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
 *
 * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
 * new child span within the transaction or any span, call the respective `.startChild()` method.
 *
 * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
 *
 * The transaction must be finished with a call to its `.finish()` method, at which point the transaction with all its
 * finished child spans will be sent to Sentry.
 *
 * @param context Properties of the new `Transaction`.
 * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
 * default values). See {@link Options.tracesSampler}.
 *
 * @returns The transaction which was just started
 */
function startTransaction(context, customSamplingContext) {
    return callOnHub('startTransaction', __assign$4({}, context), customSamplingContext);
}

var SENTRY_API_VERSION = '7';
/** Initializes API Details */
function initAPIDetails(dsn, metadata, tunnel) {
    return {
        initDsn: dsn,
        metadata: metadata || {},
        dsn: makeDsn(dsn),
        tunnel: tunnel,
    };
}
/** Returns the prefix to construct Sentry ingestion API endpoints. */
function getBaseApiEndpoint(dsn) {
    var protocol = dsn.protocol ? dsn.protocol + ":" : '';
    var port = dsn.port ? ":" + dsn.port : '';
    return protocol + "//" + dsn.host + port + (dsn.path ? "/" + dsn.path : '') + "/api/";
}
/** Returns the ingest API endpoint for target. */
function _getIngestEndpoint(dsn, target) {
    return "" + getBaseApiEndpoint(dsn) + dsn.projectId + "/" + target + "/";
}
/** Returns a URL-encoded string with auth config suitable for a query string. */
function _encodedAuth(dsn) {
    return urlEncode({
        // We send only the minimum set of required information. See
        // https://github.com/getsentry/sentry-javascript/issues/2572.
        sentry_key: dsn.publicKey,
        sentry_version: SENTRY_API_VERSION,
    });
}
/** Returns the store endpoint URL. */
function getStoreEndpoint(dsn) {
    return _getIngestEndpoint(dsn, 'store');
}
/**
 * Returns the store endpoint URL with auth in the query string.
 *
 * Sending auth as part of the query string and not as custom HTTP headers avoids CORS preflight requests.
 */
function getStoreEndpointWithUrlEncodedAuth(dsn) {
    return getStoreEndpoint(dsn) + "?" + _encodedAuth(dsn);
}
/** Returns the envelope endpoint URL. */
function _getEnvelopeEndpoint(dsn) {
    return _getIngestEndpoint(dsn, 'envelope');
}
/**
 * Returns the envelope endpoint URL with auth in the query string.
 *
 * Sending auth as part of the query string and not as custom HTTP headers avoids CORS preflight requests.
 */
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel) {
    return tunnel ? tunnel : _getEnvelopeEndpoint(dsn) + "?" + _encodedAuth(dsn);
}
/**
 * Returns an object that can be used in request headers.
 * This is needed for node and the old /store endpoint in sentry
 */
function getRequestHeaders(dsn, clientName, clientVersion) {
    // CHANGE THIS to use metadata but keep clientName and clientVersion compatible
    var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
    header.push("sentry_client=" + clientName + "/" + clientVersion);
    header.push("sentry_key=" + dsn.publicKey);
    if (dsn.pass) {
        header.push("sentry_secret=" + dsn.pass);
    }
    return {
        'Content-Type': 'application/json',
        'X-Sentry-Auth': header.join(', '),
    };
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/*
 * This file defines flags and constants that can be modified during compile time in order to facilitate tree shaking
 * for users.
 *
 * Debug flags need to be declared in each package individually and must not be imported across package boundaries,
 * because some build tools have trouble tree-shaking imported guards.
 *
 * As a convention, we define debug flags in a `flags.ts` file in the root of a package's `src` folder.
 *
 * Debug flag files will contain "magic strings" like `__SENTRY_DEBUG__` that may get replaced with actual values during
 * our, or the user's build process. Take care when introducing new flags - they must not throw if they are not
 * replaced.
 */
/** Flag that is true for debug builds, false otherwise. */
var IS_DEBUG_BUILD$1 = typeof __SENTRY_DEBUG__ === 'undefined' ? true : __SENTRY_DEBUG__;

var installedIntegrations = [];
/**
 * @private
 */
function filterDuplicates(integrations) {
    return integrations.reduce(function (acc, integrations) {
        if (acc.every(function (accIntegration) { return integrations.name !== accIntegration.name; })) {
            acc.push(integrations);
        }
        return acc;
    }, []);
}
/** Gets integration to install */
function getIntegrationsToSetup(options) {
    var defaultIntegrations = (options.defaultIntegrations && __spread(options.defaultIntegrations)) || [];
    var userIntegrations = options.integrations;
    var integrations = __spread(filterDuplicates(defaultIntegrations));
    if (Array.isArray(userIntegrations)) {
        // Filter out integrations that are also included in user options
        integrations = __spread(integrations.filter(function (integrations) {
            return userIntegrations.every(function (userIntegration) { return userIntegration.name !== integrations.name; });
        }), filterDuplicates(userIntegrations));
    }
    else if (typeof userIntegrations === 'function') {
        integrations = userIntegrations(integrations);
        integrations = Array.isArray(integrations) ? integrations : [integrations];
    }
    // Make sure that if present, `Debug` integration will always run last
    var integrationsNames = integrations.map(function (i) { return i.name; });
    var alwaysLastToRun = 'Debug';
    if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
        integrations.push.apply(integrations, __spread(integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1)));
    }
    return integrations;
}
/** Setup given integration */
function setupIntegration(integration) {
    if (installedIntegrations.indexOf(integration.name) !== -1) {
        return;
    }
    integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
    installedIntegrations.push(integration.name);
    IS_DEBUG_BUILD$1 && logger$3.log("Integration installed: " + integration.name);
}
/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */
function setupIntegrations(options) {
    var integrations = {};
    getIntegrationsToSetup(options).forEach(function (integration) {
        integrations[integration.name] = integration;
        setupIntegration(integration);
    });
    // set the `initialized` flag so we don't run through the process again unecessarily; use `Object.defineProperty`
    // because by default it creates a property which is nonenumerable, which we want since `initialized` shouldn't be
    // considered a member of the index the way the actual integrations are
    addNonEnumerableProperty(integrations, 'initialized', true);
    return integrations;
}

var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}. Also, the Backend instance is available via
 * {@link Client.getBackend}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event via the backend, it is passed through
 * {@link BaseClient._prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */
var BaseClient = /** @class */ (function () {
    /**
     * Initializes this client instance.
     *
     * @param backendClass A constructor function to create the backend.
     * @param options Options for the client.
     */
    function BaseClient(backendClass, options) {
        /** Array of used integrations. */
        this._integrations = {};
        /** Number of calls being processed */
        this._numProcessing = 0;
        this._backend = new backendClass(options);
        this._options = options;
        if (options.dsn) {
            this._dsn = makeDsn(options.dsn);
        }
    }
    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    BaseClient.prototype.captureException = function (exception, hint, scope) {
        var _this = this;
        // ensure we haven't captured this very object before
        if (checkOrSetAlreadyCaught(exception)) {
            IS_DEBUG_BUILD$1 && logger$3.log(ALREADY_SEEN_ERROR);
            return;
        }
        var eventId = hint && hint.event_id;
        this._process(this._getBackend()
            .eventFromException(exception, hint)
            .then(function (event) { return _this._captureEvent(event, hint, scope); })
            .then(function (result) {
            eventId = result;
        }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
        var _this = this;
        var eventId = hint && hint.event_id;
        var promisedEvent = isPrimitive(message)
            ? this._getBackend().eventFromMessage(String(message), level, hint)
            : this._getBackend().eventFromException(message, hint);
        this._process(promisedEvent
            .then(function (event) { return _this._captureEvent(event, hint, scope); })
            .then(function (result) {
            eventId = result;
        }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureEvent = function (event, hint, scope) {
        // ensure we haven't captured this very object before
        if (hint && hint.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
            IS_DEBUG_BUILD$1 && logger$3.log(ALREADY_SEEN_ERROR);
            return;
        }
        var eventId = hint && hint.event_id;
        this._process(this._captureEvent(event, hint, scope).then(function (result) {
            eventId = result;
        }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureSession = function (session) {
        if (!this._isEnabled()) {
            IS_DEBUG_BUILD$1 && logger$3.warn('SDK not enabled, will not capture session.');
            return;
        }
        if (!(typeof session.release === 'string')) {
            IS_DEBUG_BUILD$1 && logger$3.warn('Discarded session because of missing or non-string release');
        }
        else {
            this._sendSession(session);
            // After sending, we set init false to indicate it's not the first occurrence
            session.update({ init: false });
        }
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getDsn = function () {
        return this._dsn;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getOptions = function () {
        return this._options;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getTransport = function () {
        return this._getBackend().getTransport();
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.flush = function (timeout) {
        var _this = this;
        return this._isClientDoneProcessing(timeout).then(function (clientFinished) {
            return _this.getTransport()
                .close(timeout)
                .then(function (transportFlushed) { return clientFinished && transportFlushed; });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.close = function (timeout) {
        var _this = this;
        return this.flush(timeout).then(function (result) {
            _this.getOptions().enabled = false;
            return result;
        });
    };
    /**
     * Sets up the integrations
     */
    BaseClient.prototype.setupIntegrations = function () {
        if (this._isEnabled() && !this._integrations.initialized) {
            this._integrations = setupIntegrations(this._options);
        }
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getIntegration = function (integration) {
        try {
            return this._integrations[integration.id] || null;
        }
        catch (_oO) {
            IS_DEBUG_BUILD$1 && logger$3.warn("Cannot retrieve integration " + integration.id + " from the current Client");
            return null;
        }
    };
    /** Updates existing session based on the provided event */
    BaseClient.prototype._updateSessionFromEvent = function (session, event) {
        var e_1, _a;
        var crashed = false;
        var errored = false;
        var exceptions = event.exception && event.exception.values;
        if (exceptions) {
            errored = true;
            try {
                for (var exceptions_1 = __values(exceptions), exceptions_1_1 = exceptions_1.next(); !exceptions_1_1.done; exceptions_1_1 = exceptions_1.next()) {
                    var ex = exceptions_1_1.value;
                    var mechanism = ex.mechanism;
                    if (mechanism && mechanism.handled === false) {
                        crashed = true;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (exceptions_1_1 && !exceptions_1_1.done && (_a = exceptions_1.return)) _a.call(exceptions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        // A session is updated and that session update is sent in only one of the two following scenarios:
        // 1. Session with non terminal status and 0 errors + an error occurred -> Will set error count to 1 and send update
        // 2. Session with non terminal status and 1 error + a crash occurred -> Will set status crashed and send update
        var sessionNonTerminal = session.status === 'ok';
        var shouldUpdateAndSend = (sessionNonTerminal && session.errors === 0) || (sessionNonTerminal && crashed);
        if (shouldUpdateAndSend) {
            session.update(__assign$1(__assign$1({}, (crashed && { status: 'crashed' })), { errors: session.errors || Number(errored || crashed) }));
            this.captureSession(session);
        }
    };
    /** Deliver captured session to Sentry */
    BaseClient.prototype._sendSession = function (session) {
        this._getBackend().sendSession(session);
    };
    /**
     * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
     * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
     *
     * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
     * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
     * `true`.
     * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
     * `false` otherwise
     */
    BaseClient.prototype._isClientDoneProcessing = function (timeout) {
        var _this = this;
        return new SyncPromise(function (resolve) {
            var ticked = 0;
            var tick = 1;
            var interval = setInterval(function () {
                if (_this._numProcessing == 0) {
                    clearInterval(interval);
                    resolve(true);
                }
                else {
                    ticked += tick;
                    if (timeout && ticked >= timeout) {
                        clearInterval(interval);
                        resolve(false);
                    }
                }
            }, tick);
        });
    };
    /** Returns the current backend. */
    BaseClient.prototype._getBackend = function () {
        return this._backend;
    };
    /** Determines whether this SDK is enabled and a valid Dsn is present. */
    BaseClient.prototype._isEnabled = function () {
        return this.getOptions().enabled !== false && this._dsn !== undefined;
    };
    /**
     * Adds common information to events.
     *
     * The information includes release and environment from `options`,
     * breadcrumbs and context (extra, tags and user) from the scope.
     *
     * Information that is already present in the event is never overwritten. For
     * nested objects, such as the context, keys are merged.
     *
     * @param event The original event.
     * @param hint May contain additional information about the original exception.
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     */
    BaseClient.prototype._prepareEvent = function (event, scope, hint) {
        var _this = this;
        var _a = this.getOptions(), _b = _a.normalizeDepth, normalizeDepth = _b === void 0 ? 3 : _b, _c = _a.normalizeMaxBreadth, normalizeMaxBreadth = _c === void 0 ? 1000 : _c;
        var prepared = __assign$1(__assign$1({}, event), { event_id: event.event_id || (hint && hint.event_id ? hint.event_id : uuid4()), timestamp: event.timestamp || dateTimestampInSeconds() });
        this._applyClientOptions(prepared);
        this._applyIntegrationsMetadata(prepared);
        // If we have scope given to us, use it as the base for further modifications.
        // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
        var finalScope = scope;
        if (hint && hint.captureContext) {
            finalScope = Scope.clone(finalScope).update(hint.captureContext);
        }
        // We prepare the result here with a resolved Event.
        var result = resolvedSyncPromise(prepared);
        // This should be the last thing called, since we want that
        // {@link Hub.addEventProcessor} gets the finished prepared event.
        if (finalScope) {
            // In case we have a hub we reassign it.
            result = finalScope.applyToEvent(prepared, hint);
        }
        return result.then(function (evt) {
            if (evt) {
                // TODO this is more of the hack trying to solve https://github.com/getsentry/sentry-javascript/issues/2809
                // it is only attached as extra data to the event if the event somehow skips being normalized
                evt.sdkProcessingMetadata = __assign$1(__assign$1({}, evt.sdkProcessingMetadata), { normalizeDepth: normalize$4(normalizeDepth) + " (" + typeof normalizeDepth + ")" });
            }
            if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
                return _this._normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
            }
            return evt;
        });
    };
    /**
     * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
     * Normalized keys:
     * - `breadcrumbs.data`
     * - `user`
     * - `contexts`
     * - `extra`
     * @param event Event
     * @returns Normalized event
     */
    BaseClient.prototype._normalizeEvent = function (event, depth, maxBreadth) {
        if (!event) {
            return null;
        }
        var normalized = __assign$1(__assign$1(__assign$1(__assign$1(__assign$1({}, event), (event.breadcrumbs && {
            breadcrumbs: event.breadcrumbs.map(function (b) { return (__assign$1(__assign$1({}, b), (b.data && {
                data: normalize$4(b.data, depth, maxBreadth),
            }))); }),
        })), (event.user && {
            user: normalize$4(event.user, depth, maxBreadth),
        })), (event.contexts && {
            contexts: normalize$4(event.contexts, depth, maxBreadth),
        })), (event.extra && {
            extra: normalize$4(event.extra, depth, maxBreadth),
        }));
        // event.contexts.trace stores information about a Transaction. Similarly,
        // event.spans[] stores information about child Spans. Given that a
        // Transaction is conceptually a Span, normalization should apply to both
        // Transactions and Spans consistently.
        // For now the decision is to skip normalization of Transactions and Spans,
        // so this block overwrites the normalized event to add back the original
        // Transaction information prior to normalization.
        if (event.contexts && event.contexts.trace) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            normalized.contexts.trace = event.contexts.trace;
        }
        normalized.sdkProcessingMetadata = __assign$1(__assign$1({}, normalized.sdkProcessingMetadata), { baseClientNormalized: true });
        return normalized;
    };
    /**
     *  Enhances event using the client configuration.
     *  It takes care of all "static" values like environment, release and `dist`,
     *  as well as truncating overly long values.
     * @param event event instance to be enhanced
     */
    BaseClient.prototype._applyClientOptions = function (event) {
        var options = this.getOptions();
        var environment = options.environment, release = options.release, dist = options.dist, _a = options.maxValueLength, maxValueLength = _a === void 0 ? 250 : _a;
        if (!('environment' in event)) {
            event.environment = 'environment' in options ? environment : 'production';
        }
        if (event.release === undefined && release !== undefined) {
            event.release = release;
        }
        if (event.dist === undefined && dist !== undefined) {
            event.dist = dist;
        }
        if (event.message) {
            event.message = truncate(event.message, maxValueLength);
        }
        var exception = event.exception && event.exception.values && event.exception.values[0];
        if (exception && exception.value) {
            exception.value = truncate(exception.value, maxValueLength);
        }
        var request = event.request;
        if (request && request.url) {
            request.url = truncate(request.url, maxValueLength);
        }
    };
    /**
     * This function adds all used integrations to the SDK info in the event.
     * @param event The event that will be filled with all integrations.
     */
    BaseClient.prototype._applyIntegrationsMetadata = function (event) {
        var integrationsArray = Object.keys(this._integrations);
        if (integrationsArray.length > 0) {
            event.sdk = event.sdk || {};
            event.sdk.integrations = __spread((event.sdk.integrations || []), integrationsArray);
        }
    };
    /**
     * Tells the backend to send this event
     * @param event The Sentry event to send
     */
    BaseClient.prototype._sendEvent = function (event) {
        this._getBackend().sendEvent(event);
    };
    /**
     * Processes the event and logs an error in case of rejection
     * @param event
     * @param hint
     * @param scope
     */
    BaseClient.prototype._captureEvent = function (event, hint, scope) {
        return this._processEvent(event, hint, scope).then(function (finalEvent) {
            return finalEvent.event_id;
        }, function (reason) {
            IS_DEBUG_BUILD$1 && logger$3.error(reason);
            return undefined;
        });
    };
    /**
     * Processes an event (either error or message) and sends it to Sentry.
     *
     * This also adds breadcrumbs and context information to the event. However,
     * platform specific meta data (such as the User's IP address) must be added
     * by the SDK implementor.
     *
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     * @param scope A scope containing event metadata.
     * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
     */
    BaseClient.prototype._processEvent = function (event, hint, scope) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
        var transport = this.getTransport();
        function recordLostEvent(outcome, category) {
            if (transport.recordLostEvent) {
                transport.recordLostEvent(outcome, category);
            }
        }
        if (!this._isEnabled()) {
            return rejectedSyncPromise(new SentryError('SDK not enabled, will not capture event.'));
        }
        var isTransaction = event.type === 'transaction';
        // 1.0 === 100% events are sent
        // 0.0 === 0% events are sent
        // Sampling for transaction happens somewhere else
        if (!isTransaction && typeof sampleRate === 'number' && Math.random() > sampleRate) {
            recordLostEvent('sample_rate', 'event');
            return rejectedSyncPromise(new SentryError("Discarding event because it's not included in the random sample (sampling rate = " + sampleRate + ")"));
        }
        return this._prepareEvent(event, scope, hint)
            .then(function (prepared) {
            if (prepared === null) {
                recordLostEvent('event_processor', event.type || 'event');
                throw new SentryError('An event processor returned null, will not send event.');
            }
            var isInternalException = hint && hint.data && hint.data.__sentry__ === true;
            if (isInternalException || isTransaction || !beforeSend) {
                return prepared;
            }
            var beforeSendResult = beforeSend(prepared, hint);
            return _ensureBeforeSendRv(beforeSendResult);
        })
            .then(function (processedEvent) {
            if (processedEvent === null) {
                recordLostEvent('before_send', event.type || 'event');
                throw new SentryError('`beforeSend` returned `null`, will not send event.');
            }
            var session = scope && scope.getSession && scope.getSession();
            if (!isTransaction && session) {
                _this._updateSessionFromEvent(session, processedEvent);
            }
            _this._sendEvent(processedEvent);
            return processedEvent;
        })
            .then(null, function (reason) {
            if (reason instanceof SentryError) {
                throw reason;
            }
            _this.captureException(reason, {
                data: {
                    __sentry__: true,
                },
                originalException: reason,
            });
            throw new SentryError("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + reason);
        });
    };
    /**
     * Occupies the client with processing and event
     */
    BaseClient.prototype._process = function (promise) {
        var _this = this;
        this._numProcessing += 1;
        void promise.then(function (value) {
            _this._numProcessing -= 1;
            return value;
        }, function (reason) {
            _this._numProcessing -= 1;
            return reason;
        });
    };
    return BaseClient;
}());
/**
 * Verifies that return value of configured `beforeSend` is of expected type.
 */
function _ensureBeforeSendRv(rv) {
    var nullErr = '`beforeSend` method has to return `null` or a valid event.';
    if (isThenable(rv)) {
        return rv.then(function (event) {
            if (!(isPlainObject$1(event) || event === null)) {
                throw new SentryError(nullErr);
            }
            return event;
        }, function (e) {
            throw new SentryError("beforeSend rejected with " + e);
        });
    }
    else if (!(isPlainObject$1(rv) || rv === null)) {
        throw new SentryError(nullErr);
    }
    return rv;
}

/** Extract sdk info from from the API metadata */
function getSdkMetadataForEnvelopeHeader(api) {
    if (!api.metadata || !api.metadata.sdk) {
        return;
    }
    var _a = api.metadata.sdk, name = _a.name, version = _a.version;
    return { name: name, version: version };
}
/**
 * Apply SdkInfo (name, version, packages, integrations) to the corresponding event key.
 * Merge with existing data if any.
 **/
function enhanceEventWithSdkInfo(event, sdkInfo) {
    if (!sdkInfo) {
        return event;
    }
    event.sdk = event.sdk || {};
    event.sdk.name = event.sdk.name || sdkInfo.name;
    event.sdk.version = event.sdk.version || sdkInfo.version;
    event.sdk.integrations = __spread((event.sdk.integrations || []), (sdkInfo.integrations || []));
    event.sdk.packages = __spread((event.sdk.packages || []), (sdkInfo.packages || []));
    return event;
}
/** Creates an envelope from a Session */
function createSessionEnvelope(session, api) {
    var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
    var envelopeHeaders = __assign$1(__assign$1({ sent_at: new Date().toISOString() }, (sdkInfo && { sdk: sdkInfo })), (!!api.tunnel && { dsn: dsnToString(api.dsn) }));
    // I know this is hacky but we don't want to add `sessions` to request type since it's never rate limited
    var type = 'aggregates' in session ? 'sessions' : 'session';
    // TODO (v7) Have to cast type because envelope items do not accept a `SentryRequestType`
    var envelopeItem = [{ type: type }, session];
    var envelope = createEnvelope(envelopeHeaders, [envelopeItem]);
    return [envelope, type];
}
/** Creates a SentryRequest from a Session. */
function sessionToSentryRequest(session, api) {
    var _a = __read(createSessionEnvelope(session, api), 2), envelope = _a[0], type = _a[1];
    return {
        body: serializeEnvelope(envelope),
        type: type,
        url: getEnvelopeEndpointWithUrlEncodedAuth(api.dsn, api.tunnel),
    };
}
/**
 * Create an Envelope from an event. Note that this is duplicated from below,
 * but on purpose as this will be refactored in v7.
 */
function createEventEnvelope(event, api) {
    var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
    var eventType = event.type || 'event';
    var transactionSampling = (event.sdkProcessingMetadata || {}).transactionSampling;
    var _a = transactionSampling || {}, samplingMethod = _a.method, sampleRate = _a.rate;
    // TODO: Below is a temporary hack in order to debug a serialization error - see
    // https://github.com/getsentry/sentry-javascript/issues/2809,
    // https://github.com/getsentry/sentry-javascript/pull/4425, and
    // https://github.com/getsentry/sentry-javascript/pull/4574.
    //
    // TL; DR: even though we normalize all events (which should prevent this), something is causing `JSON.stringify` to
    // throw a circular reference error.
    //
    // When it's time to remove it:
    // 1. Delete everything between here and where the request object `req` is created, EXCEPT the line deleting
    //    `sdkProcessingMetadata`
    // 2. Restore the original version of the request body, which is commented out
    // 3. Search for either of the PR URLs above and pull out the companion hacks in the browser playwright tests and the
    //    baseClient tests in this package
    enhanceEventWithSdkInfo(event, api.metadata.sdk);
    event.tags = event.tags || {};
    event.extra = event.extra || {};
    // In theory, all events should be marked as having gone through normalization and so
    // we should never set this tag/extra data
    if (!(event.sdkProcessingMetadata && event.sdkProcessingMetadata.baseClientNormalized)) {
        event.tags.skippedNormalization = true;
        event.extra.normalizeDepth = event.sdkProcessingMetadata ? event.sdkProcessingMetadata.normalizeDepth : 'unset';
    }
    // prevent this data from being sent to sentry
    // TODO: This is NOT part of the hack - DO NOT DELETE
    delete event.sdkProcessingMetadata;
    var envelopeHeaders = __assign$1(__assign$1({ event_id: event.event_id, sent_at: new Date().toISOString() }, (sdkInfo && { sdk: sdkInfo })), (!!api.tunnel && { dsn: dsnToString(api.dsn) }));
    var eventItem = [
        {
            type: eventType,
            sample_rates: [{ id: samplingMethod, rate: sampleRate }],
        },
        event,
    ];
    return createEnvelope(envelopeHeaders, [eventItem]);
}
/** Creates a SentryRequest from an event. */
function eventToSentryRequest(event, api) {
    var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
    var eventType = event.type || 'event';
    var useEnvelope = eventType === 'transaction' || !!api.tunnel;
    var transactionSampling = (event.sdkProcessingMetadata || {}).transactionSampling;
    var _a = transactionSampling || {}, samplingMethod = _a.method, sampleRate = _a.rate;
    // TODO: Below is a temporary hack in order to debug a serialization error - see
    // https://github.com/getsentry/sentry-javascript/issues/2809,
    // https://github.com/getsentry/sentry-javascript/pull/4425, and
    // https://github.com/getsentry/sentry-javascript/pull/4574.
    //
    // TL; DR: even though we normalize all events (which should prevent this), something is causing `JSON.stringify` to
    // throw a circular reference error.
    //
    // When it's time to remove it:
    // 1. Delete everything between here and where the request object `req` is created, EXCEPT the line deleting
    //    `sdkProcessingMetadata`
    // 2. Restore the original version of the request body, which is commented out
    // 3. Search for either of the PR URLs above and pull out the companion hacks in the browser playwright tests and the
    //    baseClient tests in this package
    enhanceEventWithSdkInfo(event, api.metadata.sdk);
    event.tags = event.tags || {};
    event.extra = event.extra || {};
    // In theory, all events should be marked as having gone through normalization and so
    // we should never set this tag/extra data
    if (!(event.sdkProcessingMetadata && event.sdkProcessingMetadata.baseClientNormalized)) {
        event.tags.skippedNormalization = true;
        event.extra.normalizeDepth = event.sdkProcessingMetadata ? event.sdkProcessingMetadata.normalizeDepth : 'unset';
    }
    // prevent this data from being sent to sentry
    // TODO: This is NOT part of the hack - DO NOT DELETE
    delete event.sdkProcessingMetadata;
    var body;
    try {
        // 99.9% of events should get through just fine - no change in behavior for them
        body = JSON.stringify(event);
    }
    catch (err) {
        // Record data about the error without replacing original event data, then force renormalization
        event.tags.JSONStringifyError = true;
        event.extra.JSONStringifyError = err;
        try {
            body = JSON.stringify(normalize$4(event));
        }
        catch (newErr) {
            // At this point even renormalization hasn't worked, meaning something about the event data has gone very wrong.
            // Time to cut our losses and record only the new error. With luck, even in the problematic cases we're trying to
            // debug with this hack, we won't ever land here.
            var innerErr = newErr;
            body = JSON.stringify({
                message: 'JSON.stringify error after renormalization',
                // setting `extra: { innerErr }` here for some reason results in an empty object, so unpack manually
                extra: { message: innerErr.message, stack: innerErr.stack },