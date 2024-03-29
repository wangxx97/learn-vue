/*!
 * vue-resource v1.5.1
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */

!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.VueResource = e()
}(this, function () {
    "use strict";

    function u(t) {
        this.state = 2, this.value = void 0, this.deferred = [];
        var e = this;
        try {
            t(function (t) {
                e.resolve(t)
            }, function (t) {
                e.reject(t)
            })
        } catch (t) {
            e.reject(t)
        }
    }

    u.reject = function (n) {
        return new u(function (t, e) {
            e(n)
        })
    }, u.resolve = function (n) {
        return new u(function (t, e) {
            t(n)
        })
    }, u.all = function (s) {
        return new u(function (n, t) {
            var o = 0, r = [];

            function e(e) {
                return function (t) {
                    r[e] = t, (o += 1) === s.length && n(r)
                }
            }

            0 === s.length && n(r);
            for (var i = 0; i < s.length; i += 1) u.resolve(s[i]).then(e(i), t)
        })
    }, u.race = function (o) {
        return new u(function (t, e) {
            for (var n = 0; n < o.length; n += 1) u.resolve(o[n]).then(t, e)
        })
    };
    var t = u.prototype;

    function c(t, e) {
        t instanceof Promise ? this.promise = t : this.promise = new Promise(t.bind(e)), this.context = e
    }

    t.resolve = function (t) {
        var e = this;
        if (2 === e.state) {
            if (t === e) throw new TypeError("Promise settled with itself.");
            var n = !1;
            try {
                var o = t && t.then;
                if (null !== t && "object" == typeof t && "function" == typeof o) return void o.call(t, function (t) {
                    n || e.resolve(t), n = !0
                }, function (t) {
                    n || e.reject(t), n = !0
                })
            } catch (t) {
                return void (n || e.reject(t))
            }
            e.state = 0, e.value = t, e.notify()
        }
    }, t.reject = function (t) {
        var e = this;
        if (2 === e.state) {
            if (t === e) throw new TypeError("Promise settled with itself.");
            e.state = 1, e.value = t, e.notify()
        }
    }, t.notify = function () {
        var t, i = this;
        r(function () {
            if (2 !== i.state) for (; i.deferred.length;) {
                var t = i.deferred.shift(), e = t[0], n = t[1], o = t[2], r = t[3];
                try {
                    0 === i.state ? o("function" == typeof e ? e.call(void 0, i.value) : i.value) : 1 === i.state && ("function" == typeof n ? o(n.call(void 0, i.value)) : r(i.value))
                } catch (t) {
                    r(t)
                }
            }
        }, t)
    }, t.then = function (n, o) {
        var r = this;
        return new u(function (t, e) {
            r.deferred.push([n, o, t, e]), r.notify()
        })
    }, t.catch = function (t) {
        return this.then(void 0, t)
    }, "undefined" == typeof Promise && (window.Promise = u), c.all = function (t, e) {
        return new c(Promise.all(t), e)
    }, c.resolve = function (t, e) {
        return new c(Promise.resolve(t), e)
    }, c.reject = function (t, e) {
        return new c(Promise.reject(t), e)
    }, c.race = function (t, e) {
        return new c(Promise.race(t), e)
    };
    var e = c.prototype;
    e.bind = function (t) {
        return this.context = t, this
    }, e.then = function (t, e) {
        return t && t.bind && this.context && (t = t.bind(this.context)), e && e.bind && this.context && (e = e.bind(this.context)), new c(this.promise.then(t, e), this.context)
    }, e.catch = function (t) {
        return t && t.bind && this.context && (t = t.bind(this.context)), new c(this.promise.catch(t), this.context)
    }, e.finally = function (e) {
        return this.then(function (t) {
            return e.call(this), t
        }, function (t) {
            return e.call(this), Promise.reject(t)
        })
    };
    var r, i = {}.hasOwnProperty, o = [].slice, a = !1, s = "undefined" != typeof window;

    function f(t) {
        return t ? t.replace(/^\s*|\s*$/g, "") : ""
    }

    function p(t) {
        return t ? t.toLowerCase() : ""
    }

    var h = Array.isArray;

    function d(t) {
        return "string" == typeof t
    }

    function l(t) {
        return "function" == typeof t
    }

    function m(t) {
        return null !== t && "object" == typeof t
    }

    function y(t) {
        return m(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function v(t, e, n) {
        var o = c.resolve(t);
        return arguments.length < 2 ? o : o.then(e, n)
    }

    function b(t, e, n) {
        return l(n = n || {}) && (n = n.call(e)), T(t.bind({$vm: e, $options: n}), t, {$options: n})
    }

    function g(t, e) {
        var n, o;
        if (h(t)) for (n = 0; n < t.length; n++) e.call(t[n], t[n], n); else if (m(t)) for (o in t) i.call(t, o) && e.call(t[o], t[o], o);
        return t
    }

    var w = Object.assign || function (e) {
        return o.call(arguments, 1).forEach(function (t) {
            x(e, t)
        }), e
    };

    function T(e) {
        return o.call(arguments, 1).forEach(function (t) {
            x(e, t, !0)
        }), e
    }

    function x(t, e, n) {
        for (var o in e) n && (y(e[o]) || h(e[o])) ? (y(e[o]) && !y(t[o]) && (t[o] = {}), h(e[o]) && !h(t[o]) && (t[o] = []), x(t[o], e[o], n)) : void 0 !== e[o] && (t[o] = e[o])
    }

    function j(t, e, n) {
        var o, u, a, r = (o = t, u = ["+", "#", ".", "/", ";", "?", "&"], {
            vars: a = [], expand: function (s) {
                return o.replace(/\{([^{}]+)\}|([^{}]+)/g, function (t, e, n) {
                    if (e) {
                        var o = null, r = [];
                        if (-1 !== u.indexOf(e.charAt(0)) && (o = e.charAt(0), e = e.substr(1)), e.split(/,/g).forEach(function (t) {
                            var e = /([^:*]*)(?::(\d+)|(\*))?/.exec(t);
                            r.push.apply(r, function (t, e, n, o) {
                                var r = t[n], i = [];
                                if (E(r) && "" !== r) if ("string" == typeof r || "number" == typeof r || "boolean" == typeof r) r = r.toString(), o && "*" !== o && (r = r.substring(0, parseInt(o, 10))), i.push(O(e, r, P(e) ? n : null)); else if ("*" === o) Array.isArray(r) ? r.filter(E).forEach(function (t) {
                                    i.push(O(e, t, P(e) ? n : null))
                                }) : Object.keys(r).forEach(function (t) {
                                    E(r[t]) && i.push(O(e, r[t], t))
                                }); else {
                                    var s = [];
                                    Array.isArray(r) ? r.filter(E).forEach(function (t) {
                                        s.push(O(e, t))
                                    }) : Object.keys(r).forEach(function (t) {
                                        E(r[t]) && (s.push(encodeURIComponent(t)), s.push(O(e, r[t].toString())))
                                    }), P(e) ? i.push(encodeURIComponent(n) + "=" + s.join(",")) : 0 !== s.length && i.push(s.join(","))
                                } else ";" === e ? i.push(encodeURIComponent(n)) : "" !== r || "&" !== e && "?" !== e ? "" === r && i.push("") : i.push(encodeURIComponent(n) + "=");
                                return i
                            }(s, o, e[1], e[2] || e[3])), a.push(e[1])
                        }), o && "+" !== o) {
                            var i = ",";
                            return "?" === o ? i = "&" : "#" !== o && (i = o), (0 !== r.length ? o : "") + r.join(i)
                        }
                        return r.join(",")
                    }
                    return C(n)
                })
            }
        }), i = r.expand(e);
        return n && n.push.apply(n, r.vars), i
    }

    function E(t) {
        return null != t
    }

    function P(t) {
        return ";" === t || "&" === t || "?" === t
    }

    function O(t, e, n) {
        return e = "+" === t || "#" === t ? C(e) : encodeURIComponent(e), n ? encodeURIComponent(n) + "=" + e : e
    }

    function C(t) {
        return t.split(/(%[0-9A-Fa-f]{2})/g).map(function (t) {
            return /%[0-9A-Fa-f]/.test(t) || (t = encodeURI(t)), t
        }).join("")
    }

    function $(t, e) {
        var r, i = this || {}, n = t;
        return d(t) && (n = {
            url: t,
            params: e
        }), n = T({}, $.options, i.$options, n), $.transforms.forEach(function (t) {
            var e, n, o;
            d(t) && (t = $.transform[t]), l(t) && (e = t, n = r, o = i.$vm, r = function (t) {
                return e.call(o, t, n)
            })
        }), r(n)
    }

    function U(i) {
        return new c(function (o) {
            var r = new XDomainRequest, t = function (t) {
                var e = t.type, n = 0;
                "load" === e ? n = 200 : "error" === e && (n = 500), o(i.respondWith(r.responseText, {status: n}))
            };
            i.abort = function () {
                return r.abort()
            }, r.open(i.method, i.getUrl()), i.timeout && (r.timeout = i.timeout), r.onload = t, r.onabort = t, r.onerror = t, r.ontimeout = t, r.onprogress = function () {
            }, r.send(i.getBody())
        })
    }

    $.options = {url: "", root: null, params: {}}, $.transform = {
        template: function (e) {
            var t = [], n = j(e.url, e.params, t);
            return t.forEach(function (t) {
                delete e.params[t]
            }), n
        }, query: function (t, e) {
            var n = Object.keys($.options.params), o = {}, r = e(t);
            return g(t.params, function (t, e) {
                -1 === n.indexOf(e) && (o[e] = t)
            }), (o = $.params(o)) && (r += (-1 == r.indexOf("?") ? "?" : "&") + o), r
        }, root: function (t, e) {
            var n, o, r = e(t);
            return d(t.root) && !/^(https?:)?\//.test(r) && (n = t.root, o = "/", r = (n && void 0 === o ? n.replace(/\s+$/, "") : n && o ? n.replace(new RegExp("[" + o + "]+$"), "") : n) + "/" + r), r
        }
    }, $.transforms = ["template", "query", "root"], $.params = function (t) {
        var e = [], n = encodeURIComponent;
        return e.add = function (t, e) {
            l(e) && (e = e()), null === e && (e = ""), this.push(n(t) + "=" + n(e))
        }, function n(o, t, r) {
            var i, s = h(t), u = y(t);
            g(t, function (t, e) {
                i = m(t) || h(t), r && (e = r + "[" + (u || i ? e : "") + "]"), !r && s ? o.add(t.name, t.value) : i ? n(o, t, e) : o.add(e, t)
            })
        }(e, t), e.join("&").replace(/%20/g, "+")
    }, $.parse = function (t) {
        var e = document.createElement("a");
        return document.documentMode && (e.href = t, t = e.href), e.href = t, {
            href: e.href,
            protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
            port: e.port,
            host: e.host,
            hostname: e.hostname,
            pathname: "/" === e.pathname.charAt(0) ? e.pathname : "/" + e.pathname,
            search: e.search ? e.search.replace(/^\?/, "") : "",
            hash: e.hash ? e.hash.replace(/^#/, "") : ""
        }
    };
    var R = s && "withCredentials" in new XMLHttpRequest;

    function n(u) {
        return new c(function (o) {
            var t, r, e = u.jsonp || "callback", i = u.jsonpCallback || "_jsonp" + Math.random().toString(36).substr(2),
                s = null;
            t = function (t) {
                var e = t.type, n = 0;
                "load" === e && null !== s ? n = 200 : "error" === e && (n = 500), n && window[i] && (delete window[i], document.body.removeChild(r)), o(u.respondWith(s, {status: n}))
            }, window[i] = function (t) {
                s = JSON.stringify(t)
            }, u.abort = function () {
                t({type: "abort"})
            }, u.params[e] = i, u.timeout && setTimeout(u.abort, u.timeout), (r = document.createElement("script")).src = u.getUrl(), r.type = "text/javascript", r.async = !0, r.onload = t, r.onerror = t, document.body.appendChild(r)
        })
    }

    function A(r) {
        return new c(function (n) {
            var o = new XMLHttpRequest, t = function (t) {
                var e = r.respondWith("response" in o ? o.response : o.responseText, {
                    status: 1223 === o.status ? 204 : o.status,
                    statusText: 1223 === o.status ? "No Content" : f(o.statusText)
                });
                g(f(o.getAllResponseHeaders()).split("\n"), function (t) {
                    e.headers.append(t.slice(0, t.indexOf(":")), t.slice(t.indexOf(":") + 1))
                }), n(e)
            };
            r.abort = function () {
                return o.abort()
            }, o.open(r.method, r.getUrl(), !0), r.timeout && (o.timeout = r.timeout), r.responseType && "responseType" in o && (o.responseType = r.responseType), (r.withCredentials || r.credentials) && (o.withCredentials = !0), r.crossOrigin || r.headers.set("X-Requested-With", "XMLHttpRequest"), l(r.progress) && "GET" === r.method && o.addEventListener("progress", r.progress), l(r.downloadProgress) && o.addEventListener("progress", r.downloadProgress), l(r.progress) && /^(POST|PUT)$/i.test(r.method) && o.upload.addEventListener("progress", r.progress), l(r.uploadProgress) && o.upload && o.upload.addEventListener("progress", r.uploadProgress), r.headers.forEach(function (t, e) {
                o.setRequestHeader(e, t)
            }), o.onload = t, o.onabort = t, o.onerror = t, o.ontimeout = t, o.send(r.getBody())
        })
    }

    function S(s) {
        var u = require("got");
        return new c(function (e) {
            var n, t = s.getUrl(), o = s.getBody(), r = s.method, i = {};
            s.headers.forEach(function (t, e) {
                i[e] = t
            }), u(t, {body: o, method: r, headers: i}).then(n = function (t) {
                var n = s.respondWith(t.body, {status: t.statusCode, statusText: f(t.statusMessage)});
                g(t.headers, function (t, e) {
                    n.headers.set(e, t)
                }), e(n)
            }, function (t) {
                return n(t.response)
            })
        })
    }

    function k(t) {
        return (t.client || (s ? A : S))(t)
    }

    var I = function (t) {
        var n = this;
        this.map = {}, g(t, function (t, e) {
            return n.append(e, t)
        })
    };

    function L(t, n) {
        return Object.keys(t).reduce(function (t, e) {
            return p(n) === p(e) ? e : t
        }, null)
    }

    I.prototype.has = function (t) {
        return null !== L(this.map, t)
    }, I.prototype.get = function (t) {
        var e = this.map[L(this.map, t)];
        return e ? e.join() : null
    }, I.prototype.getAll = function (t) {
        return this.map[L(this.map, t)] || []
    }, I.prototype.set = function (t, e) {
        this.map[function (t) {
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return f(t)
        }(L(this.map, t) || t)] = [f(e)]
    }, I.prototype.append = function (t, e) {
        var n = this.map[L(this.map, t)];
        n ? n.push(f(e)) : this.set(t, e)
    }, I.prototype.delete = function (t) {
        delete this.map[L(this.map, t)]
    }, I.prototype.deleteAll = function () {
        this.map = {}
    }, I.prototype.forEach = function (n, o) {
        var r = this;
        g(this.map, function (t, e) {
            g(t, function (t) {
                return n.call(o, t, e, r)
            })
        })
    };
    var q = function (t, e) {
        var n, o, r, i = e.url, s = e.headers, u = e.status, a = e.statusText;
        this.url = i, this.ok = 200 <= u && u < 300, this.status = u || 0, this.statusText = a || "", this.headers = new I(s), d(this.body = t) ? this.bodyText = t : (r = t, "undefined" != typeof Blob && r instanceof Blob && (this.bodyBlob = t, (0 === (o = t).type.indexOf("text") || -1 !== o.type.indexOf("json")) && (this.bodyText = (n = t, new c(function (t) {
            var e = new FileReader;
            e.readAsText(n), e.onload = function () {
                t(e.result)
            }
        })))))
    };
    q.prototype.blob = function () {
        return v(this.bodyBlob)
    }, q.prototype.text = function () {
        return v(this.bodyText)
    }, q.prototype.json = function () {
        return v(this.text(), function (t) {
            return JSON.parse(t)
        })
    }, Object.defineProperty(q.prototype, "data", {
        get: function () {
            return this.body
        }, set: function (t) {
            this.body = t
        }
    });
    var H = function (t) {
        var e;
        this.body = null, this.params = {}, w(this, t, {method: (e = t.method || "GET", e ? e.toUpperCase() : "")}), this.headers instanceof I || (this.headers = new I(this.headers))
    };
    H.prototype.getUrl = function () {
        return $(this)
    }, H.prototype.getBody = function () {
        return this.body
    }, H.prototype.respondWith = function (t, e) {
        return new q(t, w(e || {}, {url: this.getUrl()}))
    };
    var B = {"Content-Type": "application/json;charset=utf-8"};

    function M(t) {
        var e = this || {}, n = function (i) {
            var s = [k], u = [];

            function t(t) {
                for (; s.length;) {
                    var e = s.pop();
                    if (l(e)) {
                        var o = void 0, n = void 0;
                        if (m(o = e.call(i, t, function (t) {
                            return n = t
                        }) || n)) return new c(function (t, n) {
                            u.forEach(function (e) {
                                o = v(o, function (t) {
                                    return e.call(i, t) || t
                                }, n)
                            }), v(o, t, n)
                        }, i);
                        l(o) && u.unshift(o)
                    } else r = "Invalid interceptor of type " + typeof e + ", must be a function", "undefined" != typeof console && a && console.warn("[VueResource warn]: " + r)
                }
                var r
            }

            return m(i) || (i = null), t.use = function (t) {
                s.push(t)
            }, t
        }(e.$vm);
        return function (n) {
            o.call(arguments, 1).forEach(function (t) {
                for (var e in t) void 0 === n[e] && (n[e] = t[e])
            })
        }(t || {}, e.$options, M.options), M.interceptors.forEach(function (t) {
            d(t) && (t = M.interceptor[t]), l(t) && n.use(t)
        }), n(new H(t)).then(function (t) {
            return t.ok ? t : c.reject(t)
        }, function (t) {
            var e;
            return t instanceof Error && (e = t, "undefined" != typeof console && console.error(e)), c.reject(t)
        })
    }

    function N(n, o, t, r) {
        var i = this || {}, s = {};
        return g(t = w({}, N.actions, t), function (t, e) {
            t = T({url: n, params: w({}, o)}, r, t), s[e] = function () {
                return (i.$http || M)(function (t, e) {
                    var n, o = w({}, t), r = {};
                    switch (e.length) {
                        case 2:
                            r = e[0], n = e[1];
                            break;
                        case 1:
                            /^(POST|PUT|PATCH)$/i.test(o.method) ? n = e[0] : r = e[0];
                            break;
                        case 0:
                            break;
                        default:
                            throw"Expected up to 2 arguments [params, body], got " + e.length + " arguments"
                    }
                    return o.body = n, o.params = w({}, o.params, r), o
                }(t, arguments))
            }
        }), s
    }

    function D(n) {
        var t, e, o;
        D.installed || (e = (t = n).config, o = t.nextTick, r = o, a = e.debug || !e.silent, n.url = $, n.http = M, n.resource = N, n.Promise = c, Object.defineProperties(n.prototype, {
            $url: {
                get: function () {
                    return b(n.url, this, this.$options.url)
                }
            }, $http: {
                get: function () {
                    return b(n.http, this, this.$options.http)
                }
            }, $resource: {
                get: function () {
                    return n.resource.bind(this)
                }
            }, $promise: {
                get: function () {
                    var e = this;
                    return function (t) {
                        return new n.Promise(t, e)
                    }
                }
            }
        }))
    }

    return M.options = {}, M.headers = {
        put: B,
        post: B,
        patch: B,
        delete: B,
        common: {Accept: "application/json, text/plain, */*"},
        custom: {}
    }, M.interceptor = {
        before: function (t) {
            l(t.before) && t.before.call(this, t)
        }, method: function (t) {
            t.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(t.method) && (t.headers.set("X-HTTP-Method-Override", t.method), t.method = "POST")
        }, jsonp: function (t) {
            "JSONP" == t.method && (t.client = n)
        }, json: function (t) {
            var e = t.headers.get("Content-Type") || "";
            return m(t.body) && 0 === e.indexOf("application/json") && (t.body = JSON.stringify(t.body)), function (o) {
                return o.bodyText ? v(o.text(), function (t) {
                    var e, n;
                    if (0 === (o.headers.get("Content-Type") || "").indexOf("application/json") || (n = (e = t).match(/^\s*(\[|\{)/)) && {
                        "[": /]\s*$/,
                        "{": /}\s*$/
                    }[n[1]].test(e)) try {
                        o.body = JSON.parse(t)
                    } catch (t) {
                        o.body = null
                    } else o.body = t;
                    return o
                }) : o
            }
        }, form: function (t) {
            var e;
            e = t.body, "undefined" != typeof FormData && e instanceof FormData ? t.headers.delete("Content-Type") : m(t.body) && t.emulateJSON && (t.body = $.params(t.body), t.headers.set("Content-Type", "application/x-www-form-urlencoded"))
        }, header: function (n) {
            g(w({}, M.headers.common, n.crossOrigin ? {} : M.headers.custom, M.headers[p(n.method)]), function (t, e) {
                n.headers.has(e) || n.headers.set(e, t)
            })
        }, cors: function (t) {
            if (s) {
                var e = $.parse(location.href), n = $.parse(t.getUrl());
                n.protocol === e.protocol && n.host === e.host || (t.crossOrigin = !0, t.emulateHTTP = !1, R || (t.client = U))
            }
        }
    }, M.interceptors = ["before", "method", "jsonp", "json", "form", "header", "cors"], ["get", "delete", "head", "jsonp"].forEach(function (n) {
        M[n] = function (t, e) {
            return this(w(e || {}, {url: t, method: n}))
        }
    }), ["post", "put", "patch"].forEach(function (o) {
        M[o] = function (t, e, n) {
            return this(w(n || {}, {url: t, method: o, body: e}))
        }
    }), N.actions = {
        get: {method: "GET"},
        save: {method: "POST"},
        query: {method: "GET"},
        update: {method: "PUT"},
        remove: {method: "DELETE"},
        delete: {method: "DELETE"}
    }, "undefined" != typeof window && window.Vue && window.Vue.use(D), D
});

