(function() {
    var t = this;
    (function() {
        (function() {
            this.Rails = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: {
                    selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                    exclude: "form button"
                },
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form",
                formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            }
        }).call(this)
    }).call(t);
    var e = t.Rails;
    (function() {
        (function() {
            var t;
            t = null, e.loadCSPNonce = function() {
                var e;
                return t = null != (e = document.querySelector("meta[name=csp-nonce]")) ? e.content : void 0
            }, e.cspNonce = function() {
                return null != t ? t : e.loadCSPNonce()
            }
        }).call(this),
            function() {
                var t, n;
                n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector, e.matches = function(t, e) {
                    return null != e.exclude ? n.call(t, e.selector) && !n.call(t, e.exclude) : n.call(t, e)
                }, t = "_ujsData", e.getData = function(e, n) {
                    var r;
                    return null != (r = e[t]) ? r[n] : void 0
                }, e.setData = function(e, n, r) {
                    return null == e[t] && (e[t] = {}), e[t][n] = r
                }, e.$ = function(t) {
                    return Array.prototype.slice.call(document.querySelectorAll(t))
                }
            }.call(this),
            function() {
                var t, n, r;
                t = e.$, r = e.csrfToken = function() {
                    var t;
                    return (t = document.querySelector("meta[name=csrf-token]")) && t.content
                }, n = e.csrfParam = function() {
                    var t;
                    return (t = document.querySelector("meta[name=csrf-param]")) && t.content
                }, e.CSRFProtection = function(t) {
                    var e;
                    if (null != (e = r())) return t.setRequestHeader("X-CSRF-Token", e)
                }, e.refreshCSRFTokens = function() {
                    var e, i;
                    if (i = r(), e = n(), null != i && null != e) return t('form input[name="' + e + '"]').forEach(function(t) {
                        return t.value = i
                    })
                }
            }.call(this),
            function() {
                var t, n, r, i;
                r = e.matches, "function" != typeof(t = window.CustomEvent) && ((t = function(t, e) {
                    var n;
                    return (n = document.createEvent("CustomEvent")).initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
                }).prototype = window.Event.prototype, i = t.prototype.preventDefault, t.prototype.preventDefault = function() {
                    var t;
                    return t = i.call(this), this.cancelable && !this.defaultPrevented && Object.defineProperty(this, "defaultPrevented", {
                        get: function() {
                            return !0
                        }
                    }), t
                }), n = e.fire = function(e, n, r) {
                    var i;
                    return i = new t(n, {
                        bubbles: !0,
                        cancelable: !0,
                        detail: r
                    }), e.dispatchEvent(i), !i.defaultPrevented
                }, e.stopEverything = function(t) {
                    return n(t.target, "ujs:everythingStopped"), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation()
                }, e.delegate = function(t, e, n, i) {
                    return t.addEventListener(n, function(t) {
                        var n;
                        for (n = t.target; n instanceof Element && !r(n, e);) n = n.parentNode;
                        if (n instanceof Element && !1 === i.call(n, t)) return t.preventDefault(), t.stopPropagation()
                    })
                }
            }.call(this),
            function() {
                var t, n, r, i, o, a;
                i = e.cspNonce, n = e.CSRFProtection, e.fire, t = {
                    "*": "*/*",
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript",
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                }, e.ajax = function(t) {
                    var e;
                    return t = o(t), e = r(t, function() {
                        var n, r;
                        return r = a(null != (n = e.response) ? n : e.responseText, e.getResponseHeader("Content-Type")), 2 === Math.floor(e.status / 100) ? "function" == typeof t.success && t.success(r, e.statusText, e) : "function" == typeof t.error && t.error(r, e.statusText, e), "function" == typeof t.complete ? t.complete(e, e.statusText) : void 0
                    }), !(null != t.beforeSend && !t.beforeSend(e, t)) && (e.readyState === XMLHttpRequest.OPENED ? e.send(t.data) : void 0)
                }, o = function(e) {
                    return e.url = e.url || location.href, e.type = e.type.toUpperCase(), "GET" === e.type && e.data && (e.url.indexOf("?") < 0 ? e.url += "?" + e.data : e.url += "&" + e.data), null == t[e.dataType] && (e.dataType = "*"), e.accept = t[e.dataType], "*" !== e.dataType && (e.accept += ", */*; q=0.01"), e
                }, r = function(t, e) {
                    var r;
                    return (r = new XMLHttpRequest).open(t.type, t.url, !0), r.setRequestHeader("Accept", t.accept), "string" == typeof t.data && r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.crossDomain || r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n(r), r.withCredentials = !!t.withCredentials, r.onreadystatechange = function() {
                        if (r.readyState === XMLHttpRequest.DONE) return e(r)
                    }, r
                }, a = function(t, e) {
                    var n, r;
                    if ("string" == typeof t && "string" == typeof e)
                        if (e.match(/\bjson\b/)) try {
                                t = JSON.parse(t)
                            } catch (o) {} else if (e.match(/\b(?:java|ecma)script\b/))(r = document.createElement("script")).setAttribute("nonce", i()), r.text = t, document.head.appendChild(r).parentNode.removeChild(r);
                            else if (e.match(/\b(xml|html|svg)\b/)) {
                        n = new DOMParser, e = e.replace(/;.+/, "");
                        try {
                            t = n.parseFromString(t, e)
                        } catch (o) {}
                    }
                    return t
                }, e.href = function(t) {
                    return t.href
                }, e.isCrossDomain = function(t) {
                    var e, n;
                    (e = document.createElement("a")).href = location.href, n = document.createElement("a");
                    try {
                        return n.href = t, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
                    } catch (r) {
                        return r, !0
                    }
                }
            }.call(this),
            function() {
                var t, n;
                t = e.matches, n = function(t) {
                    return Array.prototype.slice.call(t)
                }, e.serializeElement = function(e, r) {
                    var i, o;
                    return i = [e], t(e, "form") && (i = n(e.elements)), o = [], i.forEach(function(e) {
                        if (e.name && !e.disabled) return t(e, "select") ? n(e.options).forEach(function(t) {
                            if (t.selected) return o.push({
                                name: e.name,
                                value: t.value
                            })
                        }) : e.checked || -1 === ["radio", "checkbox", "submit"].indexOf(e.type) ? o.push({
                            name: e.name,
                            value: e.value
                        }) : void 0
                    }), r && o.push(r), o.map(function(t) {
                        return null != t.name ? encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value) : t
                    }).join("&")
                }, e.formElements = function(e, r) {
                    return t(e, "form") ? n(e.elements).filter(function(e) {
                        return t(e, r)
                    }) : n(e.querySelectorAll(r))
                }
            }.call(this),
            function() {
                var t, n, r;
                n = e.fire, r = e.stopEverything, e.handleConfirm = function(e) {
                    if (!t(this)) return r(e)
                }, t = function(t) {
                    var e, r, i;
                    if (!(i = t.getAttribute("data-confirm"))) return !0;
                    if (e = !1, n(t, "confirm")) {
                        try {
                            e = confirm(i)
                        } catch (o) {}
                        r = n(t, "confirm:complete", [e])
                    }
                    return e && r
                }
            }.call(this),
            function() {
                var t, n, r, i, o, a, s, u, l, c, d;
                l = e.matches, u = e.getData, c = e.setData, d = e.stopEverything, s = e.formElements, e.handleDisabledElement = function(t) {
                    if (this.disabled) return d(t)
                }, e.enableElement = function(t) {
                    var n;
                    return n = t instanceof Event ? t.target : t, l(n, e.linkDisableSelector) ? a(n) : l(n, e.buttonDisableSelector) || l(n, e.formEnableSelector) ? i(n) : l(n, e.formSubmitSelector) ? o(n) : void 0
                }, e.disableElement = function(i) {
                    var o;
                    return o = i instanceof Event ? i.target : i, l(o, e.linkDisableSelector) ? r(o) : l(o, e.buttonDisableSelector) || l(o, e.formDisableSelector) ? t(o) : l(o, e.formSubmitSelector) ? n(o) : void 0
                }, r = function(t) {
                    var e;
                    return null != (e = t.getAttribute("data-disable-with")) && (c(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e), t.addEventListener("click", d), c(t, "ujs:disabled", !0)
                }, a = function(t) {
                    var e;
                    return null != (e = u(t, "ujs:enable-with")) && (t.innerHTML = e, c(t, "ujs:enable-with", null)), t.removeEventListener("click", d), c(t, "ujs:disabled", null)
                }, n = function(n) {
                    return s(n, e.formDisableSelector).forEach(t)
                }, t = function(t) {
                    var e;
                    return null != (e = t.getAttribute("data-disable-with")) && (l(t, "button") ? (c(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e) : (c(t, "ujs:enable-with", t.value), t.value = e)), t.disabled = !0, c(t, "ujs:disabled", !0)
                }, o = function(t) {
                    return s(t, e.formEnableSelector).forEach(i)
                }, i = function(t) {
                    var e;
                    return null != (e = u(t, "ujs:enable-with")) && (l(t, "button") ? t.innerHTML = e : t.value = e, c(t, "ujs:enable-with", null)), t.disabled = !1, c(t, "ujs:disabled", null)
                }
            }.call(this),
            function() {
                var t;
                t = e.stopEverything, e.handleMethod = function(n) {
                    var r, i, o, a, s, u, l;
                    if (l = (u = this).getAttribute("data-method")) return s = e.href(u), i = e.csrfToken(), r = e.csrfParam(), o = document.createElement("form"), a = "<input name='_method' value='" + l + "' type='hidden' />", null == r || null == i || e.isCrossDomain(s) || (a += "<input name='" + r + "' value='" + i + "' type='hidden' />"), a += '<input type="submit" />', o.method = "post", o.action = s, o.target = u.target, o.innerHTML = a, o.style.display = "none", document.body.appendChild(o), o.querySelector('[type="submit"]').click(), t(n)
                }
            }.call(this),
            function() {
                var t, n, r, i, o, a, s, u, l, c = [].slice;
                a = e.matches, r = e.getData, u = e.setData, n = e.fire, l = e.stopEverything, t = e.ajax, i = e.isCrossDomain, s = e.serializeElement, o = function(t) {
                    var e;
                    return null != (e = t.getAttribute("data-remote")) && "false" !== e
                }, e.handleRemote = function(d) {
                    var p, f, h, m, y, g, v;
                    return !o(m = this) || (n(m, "ajax:before") ? (v = m.getAttribute("data-with-credentials"), h = m.getAttribute("data-type") || "script", a(m, e.formSubmitSelector) ? (p = r(m, "ujs:submit-button"), y = r(m, "ujs:submit-button-formmethod") || m.method, g = r(m, "ujs:submit-button-formaction") || m.getAttribute("action") || location.href, "GET" === y.toUpperCase() && (g = g.replace(/\?.*$/, "")), "multipart/form-data" === m.enctype ? (f = new FormData(m), null != p && f.append(p.name, p.value)) : f = s(m, p), u(m, "ujs:submit-button", null), u(m, "ujs:submit-button-formmethod", null), u(m, "ujs:submit-button-formaction", null)) : a(m, e.buttonClickSelector) || a(m, e.inputChangeSelector) ? (y = m.getAttribute("data-method"), g = m.getAttribute("data-url"), f = s(m, m.getAttribute("data-params"))) : (y = m.getAttribute("data-method"), g = e.href(m), f = m.getAttribute("data-params")), t({
                        type: y || "GET",
                        url: g,
                        data: f,
                        dataType: h,
                        beforeSend: function(t, e) {
                            return n(m, "ajax:beforeSend", [t, e]) ? n(m, "ajax:send", [t]) : (n(m, "ajax:stopped"), !1)
                        },
                        success: function() {
                            var t;
                            return t = 1 <= arguments.length ? c.call(arguments, 0) : [], n(m, "ajax:success", t)
                        },
                        error: function() {
                            var t;
                            return t = 1 <= arguments.length ? c.call(arguments, 0) : [], n(m, "ajax:error", t)
                        },
                        complete: function() {
                            var t;
                            return t = 1 <= arguments.length ? c.call(arguments, 0) : [], n(m, "ajax:complete", t)
                        },
                        crossDomain: i(g),
                        withCredentials: null != v && "false" !== v
                    }), l(d)) : (n(m, "ajax:stopped"), !1))
                }, e.formSubmitButtonClick = function() {
                    var t, e;
                    if (e = (t = this).form) return t.name && u(e, "ujs:submit-button", {
                        name: t.name,
                        value: t.value
                    }), u(e, "ujs:formnovalidate-button", t.formNoValidate), u(e, "ujs:submit-button-formaction", t.getAttribute("formaction")), u(e, "ujs:submit-button-formmethod", t.getAttribute("formmethod"))
                }, e.preventInsignificantClick = function(t) {
                    var e, n, r, i;
                    if (i = ((r = this).getAttribute("data-method") || "GET").toUpperCase(), e = r.getAttribute("data-params"), n = (t.metaKey || t.ctrlKey) && "GET" === i && !e, !(0 === t.button) || n) return t.stopImmediatePropagation()
                }
            }.call(this),
            function() {
                var t, n, r, i, o, a, s, u, l, c, d, p, f, h, m;
                if (a = e.fire, r = e.delegate, u = e.getData, t = e.$, m = e.refreshCSRFTokens, n = e.CSRFProtection, f = e.loadCSPNonce, o = e.enableElement, i = e.disableElement, c = e.handleDisabledElement, l = e.handleConfirm, h = e.preventInsignificantClick, p = e.handleRemote, s = e.formSubmitButtonClick, d = e.handleMethod, "undefined" != typeof jQuery && null !== jQuery && null != jQuery.ajax) {
                    if (jQuery.rails) throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
                    jQuery.rails = e, jQuery.ajaxPrefilter(function(t, e, r) {
                        if (!t.crossDomain) return n(r)
                    })
                }
                e.start = function() {
                    if (window._rails_loaded) throw new Error("rails-ujs has already been loaded!");
                    return window.addEventListener("pageshow", function() {
                        return t(e.formEnableSelector).forEach(function(t) {
                            if (u(t, "ujs:disabled")) return o(t)
                        }), t(e.linkDisableSelector).forEach(function(t) {
                            if (u(t, "ujs:disabled")) return o(t)
                        })
                    }), r(document, e.linkDisableSelector, "ajax:complete", o), r(document, e.linkDisableSelector, "ajax:stopped", o), r(document, e.buttonDisableSelector, "ajax:complete", o), r(document, e.buttonDisableSelector, "ajax:stopped", o), r(document, e.linkClickSelector, "click", h), r(document, e.linkClickSelector, "click", c), r(document, e.linkClickSelector, "click", l), r(document, e.linkClickSelector, "click", i), r(document, e.linkClickSelector, "click", p), r(document, e.linkClickSelector, "click", d), r(document, e.buttonClickSelector, "click", h), r(document, e.buttonClickSelector, "click", c), r(document, e.buttonClickSelector, "click", l), r(document, e.buttonClickSelector, "click", i), r(document, e.buttonClickSelector, "click", p), r(document, e.inputChangeSelector, "change", c), r(document, e.inputChangeSelector, "change", l), r(document, e.inputChangeSelector, "change", p), r(document, e.formSubmitSelector, "submit", c), r(document, e.formSubmitSelector, "submit", l), r(document, e.formSubmitSelector, "submit", p), r(document, e.formSubmitSelector, "submit", function(t) {
                        return setTimeout(function() {
                            return i(t)
                        }, 13)
                    }), r(document, e.formSubmitSelector, "ajax:send", i), r(document, e.formSubmitSelector, "ajax:complete", o), r(document, e.formInputClickSelector, "click", h), r(document, e.formInputClickSelector, "click", c), r(document, e.formInputClickSelector, "click", l), r(document, e.formInputClickSelector, "click", s), document.addEventListener("DOMContentLoaded", m), document.addEventListener("DOMContentLoaded", f), window._rails_loaded = !0
                }, window.Rails === e && a(document, "rails:attachBindings") && e.start()
            }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e)
}).call(this),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.ActiveStorage = {})
    }(this, function(t) {
        "use strict";

        function e(t, e) {
            return t(e = {
                exports: {}
            }, e.exports), e.exports
        }

        function n(t) {
            var e = i(document.head, 'meta[name="' + t + '"]');
            if (e) return e.getAttribute("content")
        }

        function r(t, e) {
            return "string" == typeof t && (e = t, t = document), a(t.querySelectorAll(e))
        }

        function i(t, e) {
            return "string" == typeof t && (e = t, t = document), t.querySelector(e)
        }

        function o(t, e) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                r = t.disabled,
                i = n.bubbles,
                o = n.cancelable,
                a = n.detail,
                s = document.createEvent("Event");
            s.initEvent(e, i || !0, o || !0), s.detail = a || {};
            try {
                t.disabled = !1, t.dispatchEvent(s)
            } finally {
                t.disabled = r
            }
            return s
        }

        function a(t) {
            return Array.isArray(t) ? t : Array.from ? Array.from(t) : [].slice.call(t)
        }

        function s(t, e) {
            if (t && "function" == typeof t[e]) {
                for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
                return t[e].apply(t, r)
            }
        }

        function u() {
            N || (N = !0, document.addEventListener("click", l, !0), document.addEventListener("submit", c), document.addEventListener("ajax:before", d))
        }

        function l(t) {
            var e = t.target;
            "INPUT" != e.tagName && "BUTTON" != e.tagName || "submit" != e.type || !e.form || R.set(e.form, e)
        }

        function c(t) {
            p(t)
        }

        function d(t) {
            "FORM" == t.target.tagName && p(t)
        }

        function p(t) {
            var e = t.target;
            if (e.hasAttribute(D)) t.preventDefault();
            else {
                var n = new L(e),
                    r = n.inputs;
                r.length && (t.preventDefault(), e.setAttribute(D, ""), r.forEach(h), n.start(function(t) {
                    e.removeAttribute(D), t ? r.forEach(m) : f(e)
                }))
            }
        }

        function f(t) {
            var e = R.get(t) || i(t, "input[type=submit], button[type=submit]");
            if (e) {
                var n = e.disabled;
                e.disabled = !1, e.focus(), e.click(), e.disabled = n
            } else(e = document.createElement("input")).type = "submit", e.style.display = "none", t.appendChild(e), e.click(), t.removeChild(e);
            R["delete"](t)
        }

        function h(t) {
            t.disabled = !0
        }

        function m(t) {
            t.disabled = !1
        }

        function y() {
            window.ActiveStorage && u()
        }
        var g = e(function(t) {
                var e;
                e = function(t) {
                    function e(t, e) {
                        var n = t[0],
                            r = t[1],
                            i = t[2],
                            o = t[3];
                        r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[1] - 389564586 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[2] + 606105819 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[3] - 1044525330 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[5] + 1200080426 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[6] - 1473231341 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[7] - 45705983 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[9] - 1958414417 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[10] - 42063 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[11] - 1990404162 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[13] - 40341101 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[14] - 1502002290 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[15] + 1236535329 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[6] - 1069501632 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[11] + 643717713 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[0] - 373897302 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[10] + 38016083 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[15] - 660478335 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[4] - 405537848 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[14] - 1019803690 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[3] - 187363961 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[8] + 1163531501 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[2] - 51403784 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[7] + 1735328473 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[12] - 1926607734 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[8] - 2022574463 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[11] + 1839030562 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[14] - 35309556 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[4] + 1272893353 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[7] - 155497632 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[10] - 1094730640 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[0] - 358537222 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[3] - 722521979 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[6] + 76029189 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[12] - 421815835 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[15] + 530742520 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[2] - 995338651 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[7] + 1126891415 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[14] - 1416354905 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[5] - 57434055 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[3] - 1894986606 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[10] - 1051523 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[1] - 2054922799 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[15] - 30611744 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[6] - 1560198380 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[13] + 1309151649 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[11] - 1120210379 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[2] + 718787259 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[9] - 343485551 | 0) << 21 | r >>> 11) + i | 0, t[0] = n + t[0] | 0, t[1] = r + t[1] | 0, t[2] = i + t[2] | 0, t[3] = o + t[3] | 0
                    }

                    function n(t) {
                        var e, n = [];
                        for (e = 0; e < 64; e += 4) n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
                        return n
                    }

                    function r(t) {
                        var e, n = [];
                        for (e = 0; e < 64; e += 4) n[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
                        return n
                    }

                    function i(t) {
                        var r, i, o, a, s, u, l = t.length,
                            c = [1732584193, -271733879, -1732584194, 271733878];
                        for (r = 64; r <= l; r += 64) e(c, n(t.substring(r - 64, r)));
                        for (i = (t = t.substring(r - 64)).length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], r = 0; r < i; r += 1) o[r >> 2] |= t.charCodeAt(r) << (r % 4 << 3);
                        if (o[r >> 2] |= 128 << (r % 4 << 3), r > 55)
                            for (e(c, o), r = 0; r < 16; r += 1) o[r] = 0;
                        return a = (a = 8 * l).toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(a[2], 16), u = parseInt(a[1], 16) || 0, o[14] = s, o[15] = u, e(c, o), c
                    }

                    function o(t) {
                        var n, i, o, a, s, u, l = t.length,
                            c = [1732584193, -271733879, -1732584194, 271733878];
                        for (n = 64; n <= l; n += 64) e(c, r(t.subarray(n - 64, n)));
                        for (i = (t = n - 64 < l ? t.subarray(n - 64) : new Uint8Array(0)).length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n = 0; n < i; n += 1) o[n >> 2] |= t[n] << (n % 4 << 3);
                        if (o[n >> 2] |= 128 << (n % 4 << 3), n > 55)
                            for (e(c, o), n = 0; n < 16; n += 1) o[n] = 0;
                        return a = (a = 8 * l).toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(a[2], 16), u = parseInt(a[1], 16) || 0, o[14] = s, o[15] = u, e(c, o), c
                    }

                    function a(t) {
                        var e, n = "";
                        for (e = 0; e < 4; e += 1) n += h[t >> 8 * e + 4 & 15] + h[t >> 8 * e & 15];
                        return n
                    }

                    function s(t) {
                        var e;
                        for (e = 0; e < t.length; e += 1) t[e] = a(t[e]);
                        return t.join("")
                    }

                    function u(t) {
                        return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))), t
                    }

                    function l(t, e) {
                        var n, r = t.length,
                            i = new ArrayBuffer(r),
                            o = new Uint8Array(i);
                        for (n = 0; n < r; n += 1) o[n] = t.charCodeAt(n);
                        return e ? o : i
                    }

                    function c(t) {
                        return String.fromCharCode.apply(null, new Uint8Array(t))
                    }

                    function d(t, e, n) {
                        var r = new Uint8Array(t.byteLength + e.byteLength);
                        return r.set(new Uint8Array(t)), r.set(new Uint8Array(e), t.byteLength), n ? r : r.buffer
                    }

                    function p(t) {
                        var e, n = [],
                            r = t.length;
                        for (e = 0; e < r - 1; e += 2) n.push(parseInt(t.substr(e, 2), 16));
                        return String.fromCharCode.apply(String, n)
                    }

                    function f() {
                        this.reset()
                    }
                    var h = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
                    return s(i("hello")), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
                        function e(t, e) {
                            return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
                        }
                        ArrayBuffer.prototype.slice = function(n, r) {
                            var i, o, a, s, u = this.byteLength,
                                l = e(n, u),
                                c = u;
                            return r !== t && (c = e(r, u)), l > c ? new ArrayBuffer(0) : (i = c - l, o = new ArrayBuffer(i), a = new Uint8Array(o), s = new Uint8Array(this, l, i), a.set(s), o)
                        }
                    }(), f.prototype.append = function(t) {
                        return this.appendBinary(u(t)), this
                    }, f.prototype.appendBinary = function(t) {
                        this._buff += t, this._length += t.length;
                        var r, i = this._buff.length;
                        for (r = 64; r <= i; r += 64) e(this._hash, n(this._buff.substring(r - 64, r)));
                        return this._buff = this._buff.substring(r - 64), this
                    }, f.prototype.end = function(t) {
                        var e, n, r = this._buff,
                            i = r.length,
                            o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for (e = 0; e < i; e += 1) o[e >> 2] |= r.charCodeAt(e) << (e % 4 << 3);
                        return this._finish(o, i), n = s(this._hash), t && (n = p(n)), this.reset(), n
                    }, f.prototype.reset = function() {
                        return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
                    }, f.prototype.getState = function() {
                        return {
                            buff: this._buff,
                            length: this._length,
                            hash: this._hash
                        }
                    }, f.prototype.setState = function(t) {
                        return this._buff = t.buff, this._length = t.length, this._hash = t.hash, this
                    }, f.prototype.destroy = function() {
                        delete this._hash, delete this._buff, delete this._length
                    }, f.prototype._finish = function(t, n) {
                        var r, i, o, a = n;
                        if (t[a >> 2] |= 128 << (a % 4 << 3), a > 55)
                            for (e(this._hash, t), a = 0; a < 16; a += 1) t[a] = 0;
                        r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), i = parseInt(r[2], 16), o = parseInt(r[1], 16) || 0, t[14] = i, t[15] = o, e(this._hash, t)
                    }, f.hash = function(t, e) {
                        return f.hashBinary(u(t), e)
                    }, f.hashBinary = function(t, e) {
                        var n = s(i(t));
                        return e ? p(n) : n
                    }, f.ArrayBuffer = function() {
                        this.reset()
                    }, f.ArrayBuffer.prototype.append = function(t) {
                        var n, i = d(this._buff.buffer, t, !0),
                            o = i.length;
                        for (this._length += t.byteLength, n = 64; n <= o; n += 64) e(this._hash, r(i.subarray(n - 64, n)));
                        return this._buff = n - 64 < o ? new Uint8Array(i.buffer.slice(n - 64)) : new Uint8Array(0), this
                    }, f.ArrayBuffer.prototype.end = function(t) {
                        var e, n, r = this._buff,
                            i = r.length,
                            o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for (e = 0; e < i; e += 1) o[e >> 2] |= r[e] << (e % 4 << 3);
                        return this._finish(o, i), n = s(this._hash), t && (n = p(n)), this.reset(), n
                    }, f.ArrayBuffer.prototype.reset = function() {
                        return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
                    }, f.ArrayBuffer.prototype.getState = function() {
                        var t = f.prototype.getState.call(this);
                        return t.buff = c(t.buff), t
                    }, f.ArrayBuffer.prototype.setState = function(t) {
                        return t.buff = l(t.buff, !0), f.prototype.setState.call(this, t)
                    }, f.ArrayBuffer.prototype.destroy = f.prototype.destroy, f.ArrayBuffer.prototype._finish = f.prototype._finish, f.ArrayBuffer.hash = function(t, e) {
                        var n = s(o(new Uint8Array(t)));
                        return e ? p(n) : n
                    }, f
                }, t.exports = e()
            }),
            v = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            b = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
            w = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            x = function() {
                function t(e) {
                    v(this, t), this.file = e, this.chunkSize = 2097152, this.chunkCount = Math.ceil(this.file.size / this.chunkSize), this.chunkIndex = 0
                }
                return b(t, null, [{
                    key: "create",
                    value: function(e, n) {
                        new t(e).create(n)
                    }
                }]), b(t, [{
                    key: "create",
                    value: function(t) {
                        var e = this;
                        this.callback = t, this.md5Buffer = new g.ArrayBuffer, this.fileReader = new FileReader, this.fileReader.addEventListener("load", function(t) {
                            return e.fileReaderDidLoad(t)
                        }), this.fileReader.addEventListener("error", function(t) {
                            return e.fileReaderDidError(t)
                        }), this.readNextChunk()
                    }
                }, {
                    key: "fileReaderDidLoad",
                    value: function(t) {
                        if (this.md5Buffer.append(t.target.result), !this.readNextChunk()) {
                            var e = this.md5Buffer.end(!0),
                                n = btoa(e);
                            this.callback(null, n)
                        }
                    }
                }, {
                    key: "fileReaderDidError",
                    value: function() {
                        this.callback("Error reading " + this.file.name)
                    }
                }, {
                    key: "readNextChunk",
                    value: function() {
                        if (this.chunkIndex < this.chunkCount || 0 == this.chunkIndex && 0 == this.chunkCount) {
                            var t = this.chunkIndex * this.chunkSize,
                                e = Math.min(t + this.chunkSize, this.file.size),
                                n = w.call(this.file, t, e);
                            return this.fileReader.readAsArrayBuffer(n), this.chunkIndex++, !0
                        }
                        return !1
                    }
                }]), t
            }(),
            S = function() {
                function t(e, r, i) {
                    var o = this;
                    v(this, t), this.file = e, this.attributes = {
                        filename: e.name,
                        content_type: e.type,
                        byte_size: e.size,
                        checksum: r
                    }, this.xhr = new XMLHttpRequest, this.xhr.open("POST", i, !0), this.xhr.responseType = "json", this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.setRequestHeader("Accept", "application/json"), this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xhr.setRequestHeader("X-CSRF-Token", n("csrf-token")), this.xhr.addEventListener("load", function(t) {
                        return o.requestDidLoad(t)
                    }), this.xhr.addEventListener("error", function(t) {
                        return o.requestDidError(t)
                    })
                }
                return b(t, [{
                    key: "create",
                    value: function(t) {
                        this.callback = t, this.xhr.send(JSON.stringify({
                            blob: this.attributes
                        }))
                    }
                }, {
                    key: "requestDidLoad",
                    value: function(t) {
                        if (this.status >= 200 && this.status < 300) {
                            var e = this.response,
                                n = e.direct_upload;
                            delete e.direct_upload, this.attributes = e, this.directUploadData = n, this.callback(null, this.toJSON())
                        } else this.requestDidError(t)
                    }
                }, {
                    key: "requestDidError",
                    value: function() {
                        this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status)
                    }
                }, {
                    key: "toJSON",
                    value: function() {
                        var t = {};
                        for (var e in this.attributes) t[e] = this.attributes[e];
                        return t
                    }
                }, {
                    key: "status",
                    get: function() {
                        return this.xhr.status
                    }
                }, {
                    key: "response",
                    get: function() {
                        var t = this.xhr,
                            e = t.responseType,
                            n = t.response;
                        return "json" == e ? n : JSON.parse(n)
                    }
                }]), t
            }(),
            E = function() {
                function t(e) {
                    var n = this;
                    v(this, t), this.blob = e, this.file = e.file;
                    var r = e.directUploadData,
                        i = r.url,
                        o = r.headers;
                    for (var a in this.xhr = new XMLHttpRequest, this.xhr.open("PUT", i, !0), this.xhr.responseType = "text", o) this.xhr.setRequestHeader(a, o[a]);
                    this.xhr.addEventListener("load", function(t) {
                        return n.requestDidLoad(t)
                    }), this.xhr.addEventListener("error", function(t) {
                        return n.requestDidError(t)
                    })
                }
                return b(t, [{
                    key: "create",
                    value: function(t) {
                        this.callback = t, this.xhr.send(this.file.slice())
                    }
                }, {
                    key: "requestDidLoad",
                    value: function(t) {
                        var e = this.xhr,
                            n = e.status,
                            r = e.response;
                        n >= 200 && n < 300 ? this.callback(null, r) : this.requestDidError(t)
                    }
                }, {
                    key: "requestDidError",
                    value: function() {
                        this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status)
                    }
                }]), t
            }(),
            C = 0,
            k = function() {
                function t(e, n, r) {
                    v(this, t), this.id = ++C, this.file = e, this.url = n, this.delegate = r
                }
                return b(t, [{
                    key: "create",
                    value: function(t) {
                        var e = this;
                        x.create(this.file, function(n, r) {
                            if (n) t(n);
                            else {
                                var i = new S(e.file, r, e.url);
                                s(e.delegate, "directUploadWillCreateBlobWithXHR", i.xhr), i.create(function(n) {
                                    if (n) t(n);
                                    else {
                                        var r = new E(i);
                                        s(e.delegate, "directUploadWillStoreFileWithXHR", r.xhr), r.create(function(e) {
                                            e ? t(e) : t(null, i.toJSON())
                                        })
                                    }
                                })
                            }
                        })
                    }
                }]), t
            }(),
            T = function() {
                function t(e, n) {
                    v(this, t), this.input = e, this.file = n, this.directUpload = new k(this.file, this.url, this), this.dispatch("initialize")
                }
                return b(t, [{
                    key: "start",
                    value: function(t) {
                        var e = this,
                            n = document.createElement("input");
                        n.type = "hidden", n.name = this.input.name, this.input.insertAdjacentElement("beforebegin", n), this.dispatch("start"), this.directUpload.create(function(r, i) {
                            r ? (n.parentNode.removeChild(n), e.dispatchError(r)) : n.value = i.signed_id, e.dispatch("end"), t(r)
                        })
                    }
                }, {
                    key: "uploadRequestDidProgress",
                    value: function(t) {
                        var e = t.loaded / t.total * 100;
                        e && this.dispatch("progress", {
                            progress: e
                        })
                    }
                }, {
                    key: "dispatch",
                    value: function(t) {
                        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                        return e.file = this.file, e.id = this.directUpload.id, o(this.input, "direct-upload:" + t, {
                            detail: e
                        })
                    }
                }, {
                    key: "dispatchError",
                    value: function(t) {
                        this.dispatch("error", {
                            error: t
                        }).defaultPrevented || alert(t)
                    }
                }, {
                    key: "directUploadWillCreateBlobWithXHR",
                    value: function(t) {
                        this.dispatch("before-blob-request", {
                            xhr: t
                        })
                    }
                }, {
                    key: "directUploadWillStoreFileWithXHR",
                    value: function(t) {
                        var e = this;
                        this.dispatch("before-storage-request", {
                            xhr: t
                        }), t.upload.addEventListener("progress", function(t) {
                            return e.uploadRequestDidProgress(t)
                        })
                    }
                }, {
                    key: "url",
                    get: function() {
                        return this.input.getAttribute("data-direct-upload-url")
                    }
                }]), t
            }(),
            A = "input[type=file][data-direct-upload-url]:not([disabled])",
            L = function() {
                function t(e) {
                    v(this, t), this.form = e, this.inputs = r(e, A).filter(function(t) {
                        return t.files.length
                    })
                }
                return b(t, [{
                    key: "start",
                    value: function(t) {
                        var e = this,
                            n = this.createDirectUploadControllers(),
                            r = function i() {
                                var r = n.shift();
                                r ? r.start(function(n) {
                                    n ? (t(n), e.dispatch("end")) : i()
                                }) : (t(), e.dispatch("end"))
                            };
                        this.dispatch("start"), r()
                    }
                }, {
                    key: "createDirectUploadControllers",
                    value: function() {
                        var t = [];
                        return this.inputs.forEach(function(e) {
                            a(e.files).forEach(function(n) {
                                var r = new T(e, n);
                                t.push(r)
                            })
                        }), t
                    }
                }, {
                    key: "dispatch",
                    value: function(t) {
                        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                        return o(this.form, "direct-uploads:" + t, {
                            detail: e
                        })
                    }
                }]), t
            }(),
            D = "data-direct-uploads-processing",
            R = new WeakMap,
            N = !1;
        setTimeout(y, 1), t.start = u, t.DirectUpload = k, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }),
    /*!
     * jQuery JavaScript Library v1.12.4
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2016-05-20T17:17Z
     */
    function(t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function n(t) {
            var e = !!t && "length" in t && t.length,
                n = ft.type(t);
            return "function" !== n && !ft.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function r(t, e, n) {
            if (ft.isFunction(e)) return ft.grep(t, function(t, r) {
                return !!e.call(t, r, t) !== n
            });
            if (e.nodeType) return ft.grep(t, function(t) {
                return t === e !== n
            });
            if ("string" == typeof e) {
                if (Et.test(e)) return ft.filter(e, t, n);
                e = ft.filter(e, t)
            }
            return ft.grep(t, function(t) {
                return ft.inArray(t, e) > -1 !== n
            })
        }

        function i(t, e) {
            do {
                t = t[e]
            } while (t && 1 !== t.nodeType);
            return t
        }

        function o(t) {
            var e = {};
            return ft.each(t.match(Rt) || [], function(t, n) {
                e[n] = !0
            }), e
        }

        function a() {
            rt.addEventListener ? (rt.removeEventListener("DOMContentLoaded", s), t.removeEventListener("load", s)) : (rt.detachEvent("onreadystatechange", s), t.detachEvent("onload", s))
        }

        function s() {
            (rt.addEventListener || "load" === t.event.type || "complete" === rt.readyState) && (a(), ft.ready())
        }

        function u(t, e, n) {
            if (n === undefined && 1 === t.nodeType) {
                var r = "data-" + e.replace(Pt, "-$1").toLowerCase();
                if ("string" == typeof(n = t.getAttribute(r))) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : qt.test(n) ? ft.parseJSON(n) : n)
                    } catch (i) {}
                    ft.data(t, e, n)
                } else n = undefined
            }
            return n
        }

        function l(t) {
            var e;
            for (e in t)
                if (("data" !== e || !ft.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function c(t, e, n, r) {
            if (jt(t)) {
                var i, o, a = ft.expando,
                    s = t.nodeType,
                    u = s ? ft.cache : t,
                    l = s ? t[a] : t[a] && a;
                if (l && u[l] && (r || u[l].data) || n !== undefined || "string" != typeof e) return l || (l = s ? t[a] = nt.pop() || ft.guid++ : a), u[l] || (u[l] = s ? {} : {
                    toJSON: ft.noop
                }), "object" != typeof e && "function" != typeof e || (r ? u[l] = ft.extend(u[l], e) : u[l].data = ft.extend(u[l].data, e)), o = u[l], r || (o.data || (o.data = {}), o = o.data), n !== undefined && (o[ft.camelCase(e)] = n), "string" == typeof e ? null == (i = o[e]) && (i = o[ft.camelCase(e)]) : i = o, i
            }
        }

        function d(t, e, n) {
            if (jt(t)) {
                var r, i, o = t.nodeType,
                    a = o ? ft.cache : t,
                    s = o ? t[ft.expando] : ft.expando;
                if (a[s]) {
                    if (e && (r = n ? a[s] : a[s].data)) {
                        i = (e = ft.isArray(e) ? e.concat(ft.map(e, ft.camelCase)) : e in r ? [e] : (e = ft.camelCase(e)) in r ? [e] : e.split(" ")).length;
                        for (; i--;) delete r[e[i]];
                        if (n ? !l(r) : !ft.isEmptyObject(r)) return
                    }(n || (delete a[s].data, l(a[s]))) && (o ? ft.cleanData([t], !0) : dt.deleteExpando || a != a.window ? delete a[s] : a[s] = undefined)
                }
            }
        }

        function p(t, e, n, r) {
            var i, o = 1,
                a = 20,
                s = r ? function() {
                    return r.cur()
                } : function() {
                    return ft.css(t, e, "")
                },
                u = s(),
                l = n && n[3] || (ft.cssNumber[e] ? "" : "px"),
                c = (ft.cssNumber[e] || "px" !== l && +u) && Ft.exec(ft.css(t, e));
            if (c && c[3] !== l) {
                l = l || c[3], n = n || [], c = +u || 1;
                do {
                    c /= o = o || ".5", ft.style(t, e, c + l)
                } while (o !== (o = s() / u) && 1 !== o && --a)
            }
            return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
        }

        function f(t) {
            var e = Xt.split("|"),
                n = t.createDocumentFragment();
            if (n.createElement)
                for (; e.length;) n.createElement(e.pop());
            return n
        }

        function h(t, e) {
            var n, r, i = 0,
                o = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : undefined;
            if (!o)
                for (o = [], n = t.childNodes || t; null != (r = n[i]); i++) !e || ft.nodeName(r, e) ? o.push(r) : ft.merge(o, h(r, e));
            return e === undefined || e && ft.nodeName(t, e) ? ft.merge([t], o) : o
        }

        function m(t, e) {
            for (var n, r = 0; null != (n = t[r]); r++) ft._data(n, "globalEval", !e || ft._data(e[r], "globalEval"))
        }

        function y(t) {
            $t.test(t.type) && (t.defaultChecked = t.checked)
        }

        function g(t, e, n, r, i) {
            for (var o, a, s, u, l, c, d, p = t.length, g = f(e), v = [], b = 0; b < p; b++)
                if ((a = t[b]) || 0 === a)
                    if ("object" === ft.type(a)) ft.merge(v, a.nodeType ? [a] : a);
                    else if (Gt.test(a)) {
                for (u = u || g.appendChild(e.createElement("div")), l = (Ut.exec(a) || ["", ""])[1].toLowerCase(), d = Jt[l] || Jt._default, u.innerHTML = d[1] + ft.htmlPrefilter(a) + d[2], o = d[0]; o--;) u = u.lastChild;
                if (!dt.leadingWhitespace && Vt.test(a) && v.push(e.createTextNode(Vt.exec(a)[0])), !dt.tbody)
                    for (o = (a = "table" !== l || Kt.test(a) ? "<table>" !== d[1] || Kt.test(a) ? 0 : u : u.firstChild) && a.childNodes.length; o--;) ft.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
                for (ft.merge(v, u.childNodes), u.textContent = ""; u.firstChild;) u.removeChild(u.firstChild);
                u = g.lastChild
            } else v.push(e.createTextNode(a));
            for (u && g.removeChild(u), dt.appendChecked || ft.grep(h(v, "input"), y), b = 0; a = v[b++];)
                if (r && ft.inArray(a, r) > -1) i && i.push(a);
                else if (s = ft.contains(a.ownerDocument, a), u = h(g.appendChild(a), "script"), s && m(u), n)
                for (o = 0; a = u[o++];) zt.test(a.type || "") && n.push(a);
            return u = null, g
        }

        function v() {
            return !0
        }

        function b() {
            return !1
        }

        function w() {
            try {
                return rt.activeElement
            } catch (t) {}
        }

        function x(t, e, n, r, i, o) {
            var a, s;
            if ("object" == typeof e) {
                for (s in "string" != typeof n && (r = r || n, n = undefined), e) x(t, s, n, r, e[s], o);
                return t
            }
            if (null == r && null == i ? (i = n, r = n = undefined) : null == i && ("string" == typeof n ? (i = r, r = undefined) : (i = r, r = n, n = undefined)), !1 === i) i = b;
            else if (!i) return t;
            return 1 === o && (a = i, (i = function(t) {
                return ft().off(t), a.apply(this, arguments)
            }).guid = a.guid || (a.guid = ft.guid++)), t.each(function() {
                ft.event.add(this, e, i, r, n)
            })
        }

        function S(t, e) {
            return ft.nodeName(t, "table") && ft.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function E(t) {
            return t.type = (null !== ft.find.attr(t, "type")) + "/" + t.type, t
        }

        function C(t) {
            var e = se.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function k(t, e) {
            if (1 === e.nodeType && ft.hasData(t)) {
                var n, r, i, o = ft._data(t),
                    a = ft._data(e, o),
                    s = o.events;
                if (s)
                    for (n in delete a.handle, a.events = {}, s)
                        for (r = 0, i = s[n].length; r < i; r++) ft.event.add(e, n, s[n][r]);
                a.data && (a.data = ft.extend({}, a.data))
            }
        }

        function T(t, e) {
            var n, r, i;
            if (1 === e.nodeType) {
                if (n = e.nodeName.toLowerCase(), !dt.noCloneEvent && e[ft.expando]) {
                    for (r in (i = ft._data(e)).events) ft.removeEvent(e, r, i.handle);
                    e.removeAttribute(ft.expando)
                }
                "script" === n && e.text !== t.text ? (E(e).text = t.text, C(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), dt.html5Clone && t.innerHTML && !ft.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && $t.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
            }
        }

        function A(t, e, n, r) {
            e = ot.apply([], e);
            var i, o, a, s, u, l, c = 0,
                d = t.length,
                p = d - 1,
                f = e[0],
                m = ft.isFunction(f);
            if (m || d > 1 && "string" == typeof f && !dt.checkClone && ae.test(f)) return t.each(function(i) {
                var o = t.eq(i);
                m && (e[0] = f.call(this, i, o.html())), A(o, e, n, r)
            });
            if (d && (i = (l = g(e, t[0].ownerDocument, !1, t, r)).firstChild, 1 === l.childNodes.length && (l = i), i || r)) {
                for (a = (s = ft.map(h(l, "script"), E)).length; c < d; c++) o = l, c !== p && (o = ft.clone(o, !0, !0), a && ft.merge(s, h(o, "script"))), n.call(t[c], o, c);
                if (a)
                    for (u = s[s.length - 1].ownerDocument, ft.map(s, C), c = 0; c < a; c++) o = s[c], zt.test(o.type || "") && !ft._data(o, "globalEval") && ft.contains(u, o) && (o.src ? ft._evalUrl && ft._evalUrl(o.src) : ft.globalEval((o.text || o.textContent || o.innerHTML || "").replace(ue, "")));
                l = i = null
            }
            return t
        }

        function L(t, e, n) {
            for (var r, i = e ? ft.filter(e, t) : t, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || ft.cleanData(h(r)), r.parentNode && (n && ft.contains(r.ownerDocument, r) && m(h(r, "script")), r.parentNode.removeChild(r));
            return t
        }

        function D(t, e) {
            var n = ft(e.createElement(t)).appendTo(e.body),
                r = ft.css(n[0], "display");
            return n.detach(), r
        }

        function R(t) {
            var e = rt,
                n = de[t];
            return n || ("none" !== (n = D(t, e)) && n || ((e = ((ce = (ce || ft("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement))[0].contentWindow || ce[0].contentDocument).document).write(), e.close(), n = D(t, e), ce.detach()), de[t] = n), n
        }

        function N(t, e) {
            return {
                get: function() {
                    if (!t()) return (this.get = e).apply(this, arguments);
                    delete this.get
                }
            }
        }

        function j(t) {
            if (t in Te) return t;
            for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = ke.length; n--;)
                if ((t = ke[n] + e) in Te) return t
        }

        function q(t, e) {
            for (var n, r, i, o = [], a = 0, s = t.length; a < s; a++)(r = t[a]).style && (o[a] = ft._data(r, "olddisplay"), n = r.style.display, e ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ot(r) && (o[a] = ft._data(r, "olddisplay", R(r.nodeName)))) : (i = Ot(r), (n && "none" !== n || !i) && ft._data(r, "olddisplay", i ? n : ft.css(r, "display"))));
            for (a = 0; a < s; a++)(r = t[a]).style && (e && "none" !== r.style.display && "" !== r.style.display || (r.style.display = e ? o[a] || "" : "none"));
            return t
        }

        function P(t, e, n) {
            var r = Se.exec(e);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : e
        }

        function H(t, e, n, r, i) {
            for (var o = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += ft.css(t, n + Bt[o], !0, i)), r ? ("content" === n && (a -= ft.css(t, "padding" + Bt[o], !0, i)), "margin" !== n && (a -= ft.css(t, "border" + Bt[o] + "Width", !0, i))) : (a += ft.css(t, "padding" + Bt[o], !0, i), "padding" !== n && (a += ft.css(t, "border" + Bt[o] + "Width", !0, i)));
            return a
        }

        function I(t, e, n) {
            var r = !0,
                i = "width" === e ? t.offsetWidth : t.offsetHeight,
                o = ye(t),
                a = dt.boxSizing && "border-box" === ft.css(t, "boxSizing", !1, o);
            if (i <= 0 || null == i) {
                if (((i = ge(t, e, o)) < 0 || null == i) && (i = t.style[e]), fe.test(i)) return i;
                r = a && (dt.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0
            }
            return i + H(t, e, n || (a ? "border" : "content"), r, o) + "px"
        }

        function M(t, e, n, r, i) {
            return new M.prototype.init(t, e, n, r, i)
        }

        function _() {
            return t.setTimeout(function() {
                Ae = undefined
            }), Ae = ft.now()
        }

        function F(t, e) {
            var n, r = {
                    height: t
                },
                i = 0;
            for (e = e ? 1 : 0; i < 4; i += 2 - e) r["margin" + (n = Bt[i])] = r["padding" + n] = t;
            return e && (r.opacity = r.width = t), r
        }

        function B(t, e, n) {
            for (var r, i = ($.tweeners[e] || []).concat($.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                if (r = i[o].call(n, e, t)) return r
        }

        function O(t, e, n) {
            var r, i, o, a, s, u, l, c = this,
                d = {},
                p = t.style,
                f = t.nodeType && Ot(t),
                h = ft._data(t, "fxshow");
            for (r in n.queue || (null == (s = ft._queueHooks(t, "fx")).unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || u()
                }), s.unqueued++, c.always(function() {
                    c.always(function() {
                        s.unqueued--, ft.queue(t, "fx").length || s.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (l = ft.css(t, "display")) ? ft._data(t, "olddisplay") || R(t.nodeName) : l) && "none" === ft.css(t, "float") && (dt.inlineBlockNeedsLayout && "inline" !== R(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", dt.shrinkWrapBlocks() || c.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                })), e)
                if (i = e[r], De.exec(i)) {
                    if (delete e[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
                        if ("show" !== i || !h || h[r] === undefined) continue;
                        f = !0
                    }
                    d[r] = h && h[r] || ft.style(t, r)
                } else l = undefined;
            if (ft.isEmptyObject(d)) "inline" === ("none" === l ? R(t.nodeName) : l) && (p.display = l);
            else
                for (r in h ? "hidden" in h && (f = h.hidden) : h = ft._data(t, "fxshow", {}), o && (h.hidden = !f), f ? ft(t).show() : c.done(function() {
                        ft(t).hide()
                    }), c.done(function() {
                        var e;
                        for (e in ft._removeData(t, "fxshow"), d) ft.style(t, e, d[e])
                    }), d) a = B(f ? h[r] : 0, r, c), r in h || (h[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }

        function W(t, e) {
            var n, r, i, o, a;
            for (n in t)
                if (i = e[r = ft.camelCase(n)], o = t[n], ft.isArray(o) && (i = o[1], o = t[n] = o[0]), n !== r && (t[r] = o, delete t[n]), (a = ft.cssHooks[r]) && "expand" in a)
                    for (n in o = a.expand(o), delete t[r], o) n in t || (t[n] = o[n], e[n] = i);
                else e[r] = i
        }

        function $(t, e, n) {
            var r, i, o = 0,
                a = $.prefilters.length,
                s = ft.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    if (i) return !1;
                    for (var e = Ae || _(), n = Math.max(0, l.startTime + l.duration - e), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(r);
                    return s.notifyWith(t, [l, r, n]), r < 1 && a ? n : (s.resolveWith(t, [l]), !1)
                },
                l = s.promise({
                    elem: t,
                    props: ft.extend({}, e),
                    opts: ft.extend(!0, {
                        specialEasing: {},
                        easing: ft.easing._default
                    }, n),
                    originalProperties: e,
                    originalOptions: n,
                    startTime: Ae || _(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(e, n) {
                        var r = ft.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                        return l.tweens.push(r), r
                    },
                    stop: function(e) {
                        var n = 0,
                            r = e ? l.tweens.length : 0;
                        if (i) return this;
                        for (i = !0; n < r; n++) l.tweens[n].run(1);
                        return e ? (s.notifyWith(t, [l, 1, 0]), s.resolveWith(t, [l, e])) : s.rejectWith(t, [l, e]), this
                    }
                }),
                c = l.props;
            for (W(c, l.opts.specialEasing); o < a; o++)
                if (r = $.prefilters[o].call(l, t, c, l.opts)) return ft.isFunction(r.stop) && (ft._queueHooks(l.elem, l.opts.queue).stop = ft.proxy(r.stop, r)), r;
            return ft.map(c, B, l), ft.isFunction(l.opts.start) && l.opts.start.call(t, l), ft.fx.timer(ft.extend(u, {
                elem: t,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function U(t) {
            return ft.attr(t, "class") || ""
        }

        function z(t) {
            return function(e, n) {
                "string" != typeof e && (n = e, e = "*");
                var r, i = 0,
                    o = e.toLowerCase().match(Rt) || [];
                if (ft.isFunction(n))
                    for (; r = o[i++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
            }
        }

        function V(t, e, n, r) {
            function i(s) {
                var u;
                return o[s] = !0, ft.each(t[s] || [], function(t, s) {
                    var l = s(e, n, r);
                    return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (e.dataTypes.unshift(l), i(l), !1)
                }), u
            }
            var o = {},
                a = t === tn;
            return i(e.dataTypes[0]) || !o["*"] && i("*")
        }

        function X(t, e) {
            var n, r, i = ft.ajaxSettings.flatOptions || {};
            for (r in e) e[r] !== undefined && ((i[r] ? t : n || (n = {}))[r] = e[r]);
            return n && ft.extend(!0, t, n), t
        }

        function J(t, e, n) {
            for (var r, i, o, a, s = t.contents, u = t.dataTypes;
                "*" === u[0];) u.shift(), i === undefined && (i = t.mimeType || e.getResponseHeader("Content-Type"));
            if (i)
                for (a in s)
                    if (s[a] && s[a].test(i)) {
                        u.unshift(a);
                        break
                    } if (u[0] in n) o = u[0];
            else {
                for (a in n) {
                    if (!u[0] || t.converters[a + " " + u[0]]) {
                        o = a;
                        break
                    }
                    r || (r = a)
                }
                o = o || r
            }
            if (o) return o !== u[0] && u.unshift(o), n[o]
        }

        function G(t, e, n, r) {
            var i, o, a, s, u, l = {},
                c = t.dataTypes.slice();
            if (c[1])
                for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
            for (o = c.shift(); o;)
                if (t.responseFields[o] && (n[t.responseFields[o]] = e), !u && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = o, o = c.shift())
                    if ("*" === o) o = u;
                    else if ("*" !== u && u !== o) {
                if (!(a = l[u + " " + o] || l["* " + o]))
                    for (i in l)
                        if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                            break
                        } if (!0 !== a)
                    if (a && t.throws) e = a(e);
                    else try {
                        e = a(e)
                    } catch (d) {
                        return {
                            state: "parsererror",
                            error: a ? d : "No conversion from " + u + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }

        function K(t) {
            return t.style && t.style.display || ft.css(t, "display")
        }

        function Q(t) {
            if (!ft.contains(t.ownerDocument || rt, t)) return !0;
            for (; t && 1 === t.nodeType;) {
                if ("none" === K(t) || "hidden" === t.type) return !0;
                t = t.parentNode
            }
            return !1
        }

        function Y(t, e, n, r) {
            var i;
            if (ft.isArray(e)) ft.each(e, function(e, i) {
                n || an.test(t) ? r(t, i) : Y(t + "[" + ("object" == typeof i && null != i ? e : "") + "]", i, n, r)
            });
            else if (n || "object" !== ft.type(e)) r(t, e);
            else
                for (i in e) Y(t + "[" + i + "]", e[i], n, r)
        }

        function Z() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        }

        function tt() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function et(t) {
            return ft.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
        }
        var nt = [],
            rt = t.document,
            it = nt.slice,
            ot = nt.concat,
            at = nt.push,
            st = nt.indexOf,
            ut = {},
            lt = ut.toString,
            ct = ut.hasOwnProperty,
            dt = {},
            pt = "1.12.4",
            ft = function(t, e) {
                return new ft.fn.init(t, e)
            },
            ht = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            mt = /^-ms-/,
            yt = /-([\da-z])/gi,
            gt = function(t, e) {
                return e.toUpperCase()
            };
        ft.fn = ft.prototype = {
            jquery: pt,
            constructor: ft,
            selector: "",
            length: 0,
            toArray: function() {
                return it.call(this)
            },
            get: function(t) {
                return null != t ? t < 0 ? this[t + this.length] : this[t] : it.call(this)
            },
            pushStack: function(t) {
                var e = ft.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function(t) {
                return ft.each(this, t)
            },
            map: function(t) {
                return this.pushStack(ft.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function() {
                return this.pushStack(it.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    n = +t + (t < 0 ? e : 0);
                return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: at,
            sort: nt.sort,
            splice: nt.splice
        }, ft.extend = ft.fn.extend = function() {
            var t, e, n, r, i, o, a = arguments[0] || {},
                s = 1,
                u = arguments.length,
                l = !1;
            for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || ft.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
                if (null != (i = arguments[s]))
                    for (r in i) t = a[r], a !== (n = i[r]) && (l && n && (ft.isPlainObject(n) || (e = ft.isArray(n))) ? (e ? (e = !1, o = t && ft.isArray(t) ? t : []) : o = t && ft.isPlainObject(t) ? t : {}, a[r] = ft.extend(l, o, n)) : n !== undefined && (a[r] = n));
            return a
        }, ft.extend({
            expando: "jQuery" + (pt + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === ft.type(t)
            },
            isArray: Array.isArray || function(t) {
                return "array" === ft.type(t)
            },
            isWindow: function(t) {
                return null != t && t == t.window
            },
            isNumeric: function(t) {
                var e = t && t.toString();
                return !ft.isArray(t) && e - parseFloat(e) + 1 >= 0
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            isPlainObject: function(t) {
                var e;
                if (!t || "object" !== ft.type(t) || t.nodeType || ft.isWindow(t)) return !1;
                try {
                    if (t.constructor && !ct.call(t, "constructor") && !ct.call(t.constructor.prototype, "isPrototypeOf")) return !1
                } catch (n) {
                    return !1
                }
                if (!dt.ownFirst)
                    for (e in t) return ct.call(t, e);
                for (e in t);
                return e === undefined || ct.call(t, e)
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? ut[lt.call(t)] || "object" : typeof t
            },
            globalEval: function(e) {
                e && ft.trim(e) && (t.execScript || function(e) {
                    t.eval.call(t, e)
                })(e)
            },
            camelCase: function(t) {
                return t.replace(mt, "ms-").replace(yt, gt)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e) {
                var r, i = 0;
                if (n(t))
                    for (r = t.length; i < r && !1 !== e.call(t[i], i, t[i]); i++);
                else
                    for (i in t)
                        if (!1 === e.call(t[i], i, t[i])) break;
                return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(ht, "")
            },
            makeArray: function(t, e) {
                var r = e || [];
                return null != t && (n(Object(t)) ? ft.merge(r, "string" == typeof t ? [t] : t) : at.call(r, t)), r
            },
            inArray: function(t, e, n) {
                var r;
                if (e) {
                    if (st) return st.call(e, t, n);
                    for (r = e.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                        if (n in e && e[n] === t) return n
                }
                return -1
            },
            merge: function(t, e) {
                for (var n = +e.length, r = 0, i = t.length; r < n;) t[i++] = e[r++];
                if (n != n)
                    for (; e[r] !== undefined;) t[i++] = e[r++];
                return t.length = i, t
            },
            grep: function(t, e, n) {
                for (var r = [], i = 0, o = t.length, a = !n; i < o; i++) !e(t[i], i) !== a && r.push(t[i]);
                return r
            },
            map: function(t, e, r) {
                var i, o, a = 0,
                    s = [];
                if (n(t))
                    for (i = t.length; a < i; a++) null != (o = e(t[a], a, r)) && s.push(o);
                else
                    for (a in t) null != (o = e(t[a], a, r)) && s.push(o);
                return ot.apply([], s)
            },
            guid: 1,
            proxy: function(t, e) {
                var n, r, i;
                return "string" == typeof e && (i = t[e], e = t, t = i), ft.isFunction(t) ? (n = it.call(arguments, 2), (r = function() {
                    return t.apply(e || this, n.concat(it.call(arguments)))
                }).guid = t.guid = t.guid || ft.guid++, r) : undefined
            },
            now: function() {
                return +new Date
            },
            support: dt
        }), "function" == typeof Symbol && (ft.fn[Symbol.iterator] = nt[Symbol.iterator]), ft.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            ut["[object " + e + "]"] = e.toLowerCase()
        });
        var vt =
            /*!
             * Sizzle CSS Selector Engine v2.2.1
             * http://sizzlejs.com/
             *
             * Copyright jQuery Foundation and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2015-10-17
             */
            function(t) {
                function e(t, e, n, r) {
                    var i, o, a, s, u, l, d, f, h = e && e.ownerDocument,
                        m = e ? e.nodeType : 9;
                    if (n = n || [], "string" != typeof t || !t || 1 !== m && 9 !== m && 11 !== m) return n;
                    if (!r && ((e ? e.ownerDocument || e : B) !== j && N(e), e = e || j, P)) {
                        if (11 !== m && (l = gt.exec(t)))
                            if (i = l[1]) {
                                if (9 === m) {
                                    if (!(a = e.getElementById(i))) return n;
                                    if (a.id === i) return n.push(a), n
                                } else if (h && (a = h.getElementById(i)) && _(e, a) && a.id === i) return n.push(a), n
                            } else {
                                if (l[2]) return Y.apply(n, e.getElementsByTagName(t)), n;
                                if ((i = l[3]) && x.getElementsByClassName && e.getElementsByClassName) return Y.apply(n, e.getElementsByClassName(i)), n
                            } if (x.qsa && !z[t + " "] && (!H || !H.test(t))) {
                            if (1 !== m) h = e, f = t;
                            else if ("object" !== e.nodeName.toLowerCase()) {
                                for ((s = e.getAttribute("id")) ? s = s.replace(bt, "\\$&") : e.setAttribute("id", s = F), o = (d = k(t)).length, u = pt.test(s) ? "#" + s : "[id='" + s + "']"; o--;) d[o] = u + " " + p(d[o]);
                                f = d.join(","), h = vt.test(t) && c(e.parentNode) || e
                            }
                            if (f) try {
                                return Y.apply(n, h.querySelectorAll(f)), n
                            } catch (y) {} finally {
                                s === F && e.removeAttribute("id")
                            }
                        }
                    }
                    return A(t.replace(st, "$1"), e, n, r)
                }

                function n() {
                    function t(n, r) {
                        return e.push(n + " ") > S.cacheLength && delete t[e.shift()], t[n + " "] = r
                    }
                    var e = [];
                    return t
                }

                function r(t) {
                    return t[F] = !0, t
                }

                function i(t) {
                    var e = j.createElement("div");
                    try {
                        return !!t(e)
                    } catch (n) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function o(t, e) {
                    for (var n = t.split("|"), r = n.length; r--;) S.attrHandle[n[r]] = e
                }

                function a(t, e) {
                    var n = e && t,
                        r = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === e) return -1;
                    return t ? 1 : -1
                }

                function s(t) {
                    return function(e) {
                        return "input" === e.nodeName.toLowerCase() && e.type === t
                    }
                }

                function u(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && e.type === t
                    }
                }

                function l(t) {
                    return r(function(e) {
                        return e = +e, r(function(n, r) {
                            for (var i, o = t([], n.length, e), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function c(t) {
                    return t && "undefined" != typeof t.getElementsByTagName && t
                }

                function d() {}

                function p(t) {
                    for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
                    return r
                }

                function f(t, e, n) {
                    var r = e.dir,
                        i = n && "parentNode" === r,
                        o = W++;
                    return e.first ? function(e, n, o) {
                        for (; e = e[r];)
                            if (1 === e.nodeType || i) return t(e, n, o)
                    } : function(e, n, a) {
                        var s, u, l, c = [O, o];
                        if (a) {
                            for (; e = e[r];)
                                if ((1 === e.nodeType || i) && t(e, n, a)) return !0
                        } else
                            for (; e = e[r];)
                                if (1 === e.nodeType || i) {
                                    if ((s = (u = (l = e[F] || (e[F] = {}))[e.uniqueID] || (l[e.uniqueID] = {}))[r]) && s[0] === O && s[1] === o) return c[2] = s[2];
                                    if (u[r] = c, c[2] = t(e, n, a)) return !0
                                }
                    }
                }

                function h(t) {
                    return t.length > 1 ? function(e, n, r) {
                        for (var i = t.length; i--;)
                            if (!t[i](e, n, r)) return !1;
                        return !0
                    } : t[0]
                }

                function m(t, n, r) {
                    for (var i = 0, o = n.length; i < o; i++) e(t, n[i], r);
                    return r
                }

                function y(t, e, n, r, i) {
                    for (var o, a = [], s = 0, u = t.length, l = null != e; s < u; s++)(o = t[s]) && (n && !n(o, r, i) || (a.push(o), l && e.push(s)));
                    return a
                }

                function g(t, e, n, i, o, a) {
                    return i && !i[F] && (i = g(i)), o && !o[F] && (o = g(o, a)), r(function(r, a, s, u) {
                        var l, c, d, p = [],
                            f = [],
                            h = a.length,
                            g = r || m(e || "*", s.nodeType ? [s] : s, []),
                            v = !t || !r && e ? g : y(g, p, t, s, u),
                            b = n ? o || (r ? t : h || i) ? [] : a : v;
                        if (n && n(v, b, s, u), i)
                            for (l = y(b, f), i(l, [], s, u), c = l.length; c--;)(d = l[c]) && (b[f[c]] = !(v[f[c]] = d));
                        if (r) {
                            if (o || t) {
                                if (o) {
                                    for (l = [], c = b.length; c--;)(d = b[c]) && l.push(v[c] = d);
                                    o(null, b = [], l, u)
                                }
                                for (c = b.length; c--;)(d = b[c]) && (l = o ? tt(r, d) : p[c]) > -1 && (r[l] = !(a[l] = d))
                            }
                        } else b = y(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, u) : Y.apply(a, b)
                    })
                }

                function v(t) {
                    for (var e, n, r, i = t.length, o = S.relative[t[0].type], a = o || S.relative[" "], s = o ? 1 : 0, u = f(function(t) {
                            return t === e
                        }, a, !0), l = f(function(t) {
                            return tt(e, t) > -1
                        }, a, !0), c = [function(t, n, r) {
                            var i = !o && (r || n !== L) || ((e = n).nodeType ? u(t, n, r) : l(t, n, r));
                            return e = null, i
                        }]; s < i; s++)
                        if (n = S.relative[t[s].type]) c = [f(h(c), n)];
                        else {
                            if ((n = S.filter[t[s].type].apply(null, t[s].matches))[F]) {
                                for (r = ++s; r < i && !S.relative[t[r].type]; r++);
                                return g(s > 1 && h(c), s > 1 && p(t.slice(0, s - 1).concat({
                                    value: " " === t[s - 2].type ? "*" : ""
                                })).replace(st, "$1"), n, s < r && v(t.slice(s, r)), r < i && v(t = t.slice(r)), r < i && p(t))
                            }
                            c.push(n)
                        } return h(c)
                }

                function b(t, n) {
                    var i = n.length > 0,
                        o = t.length > 0,
                        a = function(r, a, s, u, l) {
                            var c, d, p, f = 0,
                                h = "0",
                                m = r && [],
                                g = [],
                                v = L,
                                b = r || o && S.find.TAG("*", l),
                                w = O += null == v ? 1 : Math.random() || .1,
                                x = b.length;
                            for (l && (L = a === j || a || l); h !== x && null != (c = b[h]); h++) {
                                if (o && c) {
                                    for (d = 0, a || c.ownerDocument === j || (N(c), s = !P); p = t[d++];)
                                        if (p(c, a || j, s)) {
                                            u.push(c);
                                            break
                                        } l && (O = w)
                                }
                                i && ((c = !p && c) && f--, r && m.push(c))
                            }
                            if (f += h, i && h !== f) {
                                for (d = 0; p = n[d++];) p(m, g, a, s);
                                if (r) {
                                    if (f > 0)
                                        for (; h--;) m[h] || g[h] || (g[h] = K.call(u));
                                    g = y(g)
                                }
                                Y.apply(u, g), l && !r && g.length > 0 && f + n.length > 1 && e.uniqueSort(u)
                            }
                            return l && (O = w, L = v), m
                        };
                    return i ? r(a) : a
                }
                var w, x, S, E, C, k, T, A, L, D, R, N, j, q, P, H, I, M, _, F = "sizzle" + 1 * new Date,
                    B = t.document,
                    O = 0,
                    W = 0,
                    $ = n(),
                    U = n(),
                    z = n(),
                    V = function(t, e) {
                        return t === e && (R = !0), 0
                    },
                    X = 1 << 31,
                    J = {}.hasOwnProperty,
                    G = [],
                    K = G.pop,
                    Q = G.push,
                    Y = G.push,
                    Z = G.slice,
                    tt = function(t, e) {
                        for (var n = 0, r = t.length; n < r; n++)
                            if (t[n] === e) return n;
                        return -1
                    },
                    et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    nt = "[\\x20\\t\\r\\n\\f]",
                    rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    it = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + rt + "))|)" + nt + "*\\]",
                    ot = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)",
                    at = new RegExp(nt + "+", "g"),
                    st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                    ut = new RegExp("^" + nt + "*," + nt + "*"),
                    lt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                    ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
                    dt = new RegExp(ot),
                    pt = new RegExp("^" + rt + "$"),
                    ft = {
                        ID: new RegExp("^#(" + rt + ")"),
                        CLASS: new RegExp("^\\.(" + rt + ")"),
                        TAG: new RegExp("^(" + rt + "|[*])"),
                        ATTR: new RegExp("^" + it),
                        PSEUDO: new RegExp("^" + ot),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + et + ")$", "i"),
                        needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                    },
                    ht = /^(?:input|select|textarea|button)$/i,
                    mt = /^h\d$/i,
                    yt = /^[^{]+\{\s*\[native \w/,
                    gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    vt = /[+~]/,
                    bt = /'|\\/g,
                    wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
                    xt = function(t, e, n) {
                        var r = "0x" + e - 65536;
                        return r != r || n ? e : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    },
                    St = function() {
                        N()
                    };
                try {
                    Y.apply(G = Z.call(B.childNodes), B.childNodes), G[B.childNodes.length].nodeType
                } catch (Et) {
                    Y = {
                        apply: G.length ? function(t, e) {
                            Q.apply(t, Z.call(e))
                        } : function(t, e) {
                            for (var n = t.length, r = 0; t[n++] = e[r++];);
                            t.length = n - 1
                        }
                    }
                }
                for (w in x = e.support = {}, C = e.isXML = function(t) {
                        var e = t && (t.ownerDocument || t).documentElement;
                        return !!e && "HTML" !== e.nodeName
                    }, N = e.setDocument = function(t) {
                        var e, n, r = t ? t.ownerDocument || t : B;
                        return r !== j && 9 === r.nodeType && r.documentElement ? (q = (j = r).documentElement, P = !C(j), (n = j.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", St, !1) : n.attachEvent && n.attachEvent("onunload", St)), x.attributes = i(function(t) {
                            return t.className = "i", !t.getAttribute("className")
                        }), x.getElementsByTagName = i(function(t) {
                            return t.appendChild(j.createComment("")), !t.getElementsByTagName("*").length
                        }), x.getElementsByClassName = yt.test(j.getElementsByClassName), x.getById = i(function(t) {
                            return q.appendChild(t).id = F, !j.getElementsByName || !j.getElementsByName(F).length
                        }), x.getById ? (S.find.ID = function(t, e) {
                            if ("undefined" != typeof e.getElementById && P) {
                                var n = e.getElementById(t);
                                return n ? [n] : []
                            }
                        }, S.filter.ID = function(t) {
                            var e = t.replace(wt, xt);
                            return function(t) {
                                return t.getAttribute("id") === e
                            }
                        }) : (delete S.find.ID, S.filter.ID = function(t) {
                            var e = t.replace(wt, xt);
                            return function(t) {
                                var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                                return n && n.value === e
                            }
                        }), S.find.TAG = x.getElementsByTagName ? function(t, e) {
                            return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0
                        } : function(t, e) {
                            var n, r = [],
                                i = 0,
                                o = e.getElementsByTagName(t);
                            if ("*" === t) {
                                for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                                return r
                            }
                            return o
                        }, S.find.CLASS = x.getElementsByClassName && function(t, e) {
                            if ("undefined" != typeof e.getElementsByClassName && P) return e.getElementsByClassName(t)
                        }, I = [], H = [], (x.qsa = yt.test(j.querySelectorAll)) && (i(function(t) {
                            q.appendChild(t).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || H.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + F + "-]").length || H.push("~="), t.querySelectorAll(":checked").length || H.push(":checked"), t.querySelectorAll("a#" + F + "+*").length || H.push(".#.+[+~]")
                        }), i(function(t) {
                            var e = j.createElement("input");
                            e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && H.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), H.push(",.*:")
                        })), (x.matchesSelector = yt.test(M = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && i(function(t) {
                            x.disconnectedMatch = M.call(t, "div"), M.call(t, "[s!='']:x"), I.push("!=", ot)
                        }), H = H.length && new RegExp(H.join("|")), I = I.length && new RegExp(I.join("|")), e = yt.test(q.compareDocumentPosition), _ = e || yt.test(q.contains) ? function(t, e) {
                            var n = 9 === t.nodeType ? t.documentElement : t,
                                r = e && e.parentNode;
                            return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                        } : function(t, e) {
                            if (e)
                                for (; e = e.parentNode;)
                                    if (e === t) return !0;
                            return !1
                        }, V = e ? function(t, e) {
                            if (t === e) return R = !0, 0;
                            var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                            return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === j || t.ownerDocument === B && _(B, t) ? -1 : e === j || e.ownerDocument === B && _(B, e) ? 1 : D ? tt(D, t) - tt(D, e) : 0 : 4 & n ? -1 : 1)
                        } : function(t, e) {
                            if (t === e) return R = !0, 0;
                            var n, r = 0,
                                i = t.parentNode,
                                o = e.parentNode,
                                s = [t],
                                u = [e];
                            if (!i || !o) return t === j ? -1 : e === j ? 1 : i ? -1 : o ? 1 : D ? tt(D, t) - tt(D, e) : 0;
                            if (i === o) return a(t, e);
                            for (n = t; n = n.parentNode;) s.unshift(n);
                            for (n = e; n = n.parentNode;) u.unshift(n);
                            for (; s[r] === u[r];) r++;
                            return r ? a(s[r], u[r]) : s[r] === B ? -1 : u[r] === B ? 1 : 0
                        }, j) : j
                    }, e.matches = function(t, n) {
                        return e(t, null, null, n)
                    }, e.matchesSelector = function(t, n) {
                        if ((t.ownerDocument || t) !== j && N(t), n = n.replace(ct, "='$1']"), x.matchesSelector && P && !z[n + " "] && (!I || !I.test(n)) && (!H || !H.test(n))) try {
                            var r = M.call(t, n);
                            if (r || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                        } catch (Et) {}
                        return e(n, j, null, [t]).length > 0
                    }, e.contains = function(t, e) {
                        return (t.ownerDocument || t) !== j && N(t), _(t, e)
                    }, e.attr = function(t, e) {
                        (t.ownerDocument || t) !== j && N(t);
                        var n = S.attrHandle[e.toLowerCase()],
                            r = n && J.call(S.attrHandle, e.toLowerCase()) ? n(t, e, !P) : undefined;
                        return r !== undefined ? r : x.attributes || !P ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                    }, e.error = function(t) {
                        throw new Error("Syntax error, unrecognized expression: " + t)
                    }, e.uniqueSort = function(t) {
                        var e, n = [],
                            r = 0,
                            i = 0;
                        if (R = !x.detectDuplicates, D = !x.sortStable && t.slice(0), t.sort(V), R) {
                            for (; e = t[i++];) e === t[i] && (r = n.push(i));
                            for (; r--;) t.splice(n[r], 1)
                        }
                        return D = null, t
                    }, E = e.getText = function(t) {
                        var e, n = "",
                            r = 0,
                            i = t.nodeType;
                        if (i) {
                            if (1 === i || 9 === i || 11 === i) {
                                if ("string" == typeof t.textContent) return t.textContent;
                                for (t = t.firstChild; t; t = t.nextSibling) n += E(t)
                            } else if (3 === i || 4 === i) return t.nodeValue
                        } else
                            for (; e = t[r++];) n += E(e);
                        return n
                    }, (S = e.selectors = {
                        cacheLength: 50,
                        createPseudo: r,
                        match: ft,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(t) {
                                return t[1] = t[1].replace(wt, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(wt, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                            },
                            CHILD: function(t) {
                                return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                            },
                            PSEUDO: function(t) {
                                var e, n = !t[6] && t[2];
                                return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && dt.test(n) && (e = k(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(t) {
                                var e = t.replace(wt, xt).toLowerCase();
                                return "*" === t ? function() {
                                    return !0
                                } : function(t) {
                                    return t.nodeName && t.nodeName.toLowerCase() === e
                                }
                            },
                            CLASS: function(t) {
                                var e = $[t + " "];
                                return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && $(t, function(t) {
                                    return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(t, n, r) {
                                return function(i) {
                                    var o = e.attr(i, t);
                                    return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(at, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                                }
                            },
                            CHILD: function(t, e, n, r, i) {
                                var o = "nth" !== t.slice(0, 3),
                                    a = "last" !== t.slice(-4),
                                    s = "of-type" === e;
                                return 1 === r && 0 === i ? function(t) {
                                    return !!t.parentNode
                                } : function(e, n, u) {
                                    var l, c, d, p, f, h, m = o !== a ? "nextSibling" : "previousSibling",
                                        y = e.parentNode,
                                        g = s && e.nodeName.toLowerCase(),
                                        v = !u && !s,
                                        b = !1;
                                    if (y) {
                                        if (o) {
                                            for (; m;) {
                                                for (p = e; p = p[m];)
                                                    if (s ? p.nodeName.toLowerCase() === g : 1 === p.nodeType) return !1;
                                                h = m = "only" === t && !h && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (h = [a ? y.firstChild : y.lastChild], a && v) {
                                            for (b = (f = (l = (c = (d = (p = y)[F] || (p[F] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] || [])[0] === O && l[1]) && l[2], p = f && y.childNodes[f]; p = ++f && p && p[m] || (b = f = 0) || h.pop();)
                                                if (1 === p.nodeType && ++b && p === e) {
                                                    c[t] = [O, f, b];
                                                    break
                                                }
                                        } else if (v && (b = f = (l = (c = (d = (p = e)[F] || (p[F] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] || [])[0] === O && l[1]), !1 === b)
                                            for (;
                                                (p = ++f && p && p[m] || (b = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== g : 1 !== p.nodeType) || !++b || (v && ((c = (d = p[F] || (p[F] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] = [O, b]), p !== e)););
                                        return (b -= i) === r || b % r == 0 && b / r >= 0
                                    }
                                }
                            },
                            PSEUDO: function(t, n) {
                                var i, o = S.pseudos[t] || S.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                                return o[F] ? o(n) : o.length > 1 ? (i = [t, t, "", n], S.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, e) {
                                    for (var r, i = o(t, n), a = i.length; a--;) t[r = tt(t, i[a])] = !(e[r] = i[a])
                                }) : function(t) {
                                    return o(t, 0, i)
                                }) : o
                            }
                        },
                        pseudos: {
                            not: r(function(t) {
                                var e = [],
                                    n = [],
                                    i = T(t.replace(st, "$1"));
                                return i[F] ? r(function(t, e, n, r) {
                                    for (var o, a = i(t, null, r, []), s = t.length; s--;)(o = a[s]) && (t[s] = !(e[s] = o))
                                }) : function(t, r, o) {
                                    return e[0] = t, i(e, null, o, n), e[0] = null, !n.pop()
                                }
                            }),
                            has: r(function(t) {
                                return function(n) {
                                    return e(t, n).length > 0
                                }
                            }),
                            contains: r(function(t) {
                                return t = t.replace(wt, xt),
                                    function(e) {
                                        return (e.textContent || e.innerText || E(e)).indexOf(t) > -1
                                    }
                            }),
                            lang: r(function(t) {
                                return pt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(wt, xt).toLowerCase(),
                                    function(e) {
                                        var n;
                                        do {
                                            if (n = P ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                        } while ((e = e.parentNode) && 1 === e.nodeType);
                                        return !1
                                    }
                            }),
                            target: function(e) {
                                var n = t.location && t.location.hash;
                                return n && n.slice(1) === e.id
                            },
                            root: function(t) {
                                return t === q
                            },
                            focus: function(t) {
                                return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                            },
                            enabled: function(t) {
                                return !1 === t.disabled
                            },
                            disabled: function(t) {
                                return !0 === t.disabled
                            },
                            checked: function(t) {
                                var e = t.nodeName.toLowerCase();
                                return "input" === e && !!t.checked || "option" === e && !!t.selected
                            },
                            selected: function(t) {
                                return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                            },
                            empty: function(t) {
                                for (t = t.firstChild; t; t = t.nextSibling)
                                    if (t.nodeType < 6) return !1;
                                return !0
                            },
                            parent: function(t) {
                                return !S.pseudos.empty(t)
                            },
                            header: function(t) {
                                return mt.test(t.nodeName)
                            },
                            input: function(t) {
                                return ht.test(t.nodeName)
                            },
                            button: function(t) {
                                var e = t.nodeName.toLowerCase();
                                return "input" === e && "button" === t.type || "button" === e
                            },
                            text: function(t) {
                                var e;
                                return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                            },
                            first: l(function() {
                                return [0]
                            }),
                            last: l(function(t, e) {
                                return [e - 1]
                            }),
                            eq: l(function(t, e, n) {
                                return [n < 0 ? n + e : n]
                            }),
                            even: l(function(t, e) {
                                for (var n = 0; n < e; n += 2) t.push(n);
                                return t
                            }),
                            odd: l(function(t, e) {
                                for (var n = 1; n < e; n += 2) t.push(n);
                                return t
                            }),
                            lt: l(function(t, e, n) {
                                for (var r = n < 0 ? n + e : n; --r >= 0;) t.push(r);
                                return t
                            }),
                            gt: l(function(t, e, n) {
                                for (var r = n < 0 ? n + e : n; ++r < e;) t.push(r);
                                return t
                            })
                        }
                    }).pseudos.nth = S.pseudos.eq, {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) S.pseudos[w] = s(w);
                for (w in {
                        submit: !0,
                        reset: !0
                    }) S.pseudos[w] = u(w);
                return d.prototype = S.filters = S.pseudos, S.setFilters = new d, k = e.tokenize = function(t, n) {
                    var r, i, o, a, s, u, l, c = U[t + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (s = t, u = [], l = S.preFilter; s;) {
                        for (a in r && !(i = ut.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = lt.exec(s)) && (r = i.shift(), o.push({
                                value: r,
                                type: i[0].replace(st, " ")
                            }), s = s.slice(r.length)), S.filter) !(i = ft[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                            value: r,
                            type: a,
                            matches: i
                        }), s = s.slice(r.length));
                        if (!r) break
                    }
                    return n ? s.length : s ? e.error(t) : U(t, u).slice(0)
                }, T = e.compile = function(t, e) {
                    var n, r = [],
                        i = [],
                        o = z[t + " "];
                    if (!o) {
                        for (e || (e = k(t)), n = e.length; n--;)(o = v(e[n]))[F] ? r.push(o) : i.push(o);
                        (o = z(t, b(i, r))).selector = t
                    }
                    return o
                }, A = e.select = function(t, e, n, r) {
                    var i, o, a, s, u, l = "function" == typeof t && t,
                        d = !r && k(t = l.selector || t);
                    if (n = n || [], 1 === d.length) {
                        if ((o = d[0] = d[0].slice(0)).length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === e.nodeType && P && S.relative[o[1].type]) {
                            if (!(e = (S.find.ID(a.matches[0].replace(wt, xt), e) || [])[0])) return n;
                            l && (e = e.parentNode), t = t.slice(o.shift().value.length)
                        }
                        for (i = ft.needsContext.test(t) ? 0 : o.length; i-- && (a = o[i], !S.relative[s = a.type]);)
                            if ((u = S.find[s]) && (r = u(a.matches[0].replace(wt, xt), vt.test(o[0].type) && c(e.parentNode) || e))) {
                                if (o.splice(i, 1), !(t = r.length && p(o))) return Y.apply(n, r), n;
                                break
                            }
                    }
                    return (l || T(t, d))(r, e, !P, n, !e || vt.test(t) && c(e.parentNode) || e), n
                }, x.sortStable = F.split("").sort(V).join("") === F, x.detectDuplicates = !!R, N(), x.sortDetached = i(function(t) {
                    return 1 & t.compareDocumentPosition(j.createElement("div"))
                }), i(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function(t, e, n) {
                    if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), x.attributes && i(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || o("value", function(t, e, n) {
                    if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
                }), i(function(t) {
                    return null == t.getAttribute("disabled")
                }) || o(et, function(t, e, n) {
                    var r;
                    if (!n) return !0 === t[e] ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }), e
            }(t);
        ft.find = vt, ft.expr = vt.selectors, ft.expr[":"] = ft.expr.pseudos, ft.uniqueSort = ft.unique = vt.uniqueSort, ft.text = vt.getText, ft.isXMLDoc = vt.isXML, ft.contains = vt.contains;
        var bt = function(t, e, n) {
                for (var r = [], i = n !== undefined;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (i && ft(t).is(n)) break;
                        r.push(t)
                    } return r
            },
            wt = function(t, e) {
                for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                return n
            },
            xt = ft.expr.match.needsContext,
            St = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            Et = /^.[^:#\[\.,]*$/;
        ft.filter = function(t, e, n) {
            var r = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? ft.find.matchesSelector(r, t) ? [r] : [] : ft.find.matches(t, ft.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, ft.fn.extend({
            find: function(t) {
                var e, n = [],
                    r = this,
                    i = r.length;
                if ("string" != typeof t) return this.pushStack(ft(t).filter(function() {
                    for (e = 0; e < i; e++)
                        if (ft.contains(r[e], this)) return !0
                }));
                for (e = 0; e < i; e++) ft.find(t, r[e], n);
                return (n = this.pushStack(i > 1 ? ft.unique(n) : n)).selector = this.selector ? this.selector + " " + t : t, n
            },
            filter: function(t) {
                return this.pushStack(r(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(r(this, t || [], !0))
            },
            is: function(t) {
                return !!r(this, "string" == typeof t && xt.test(t) ? ft(t) : t || [], !1).length
            }
        });
        var Ct, kt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        (ft.fn.init = function(t, e, n) {
            var r, i;
            if (!t) return this;
            if (n = n || Ct, "string" == typeof t) {
                if (!(r = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : kt.exec(t)) || !r[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                if (r[1]) {
                    if (e = e instanceof ft ? e[0] : e, ft.merge(this, ft.parseHTML(r[1], e && e.nodeType ? e.ownerDocument || e : rt, !0)), St.test(r[1]) && ft.isPlainObject(e))
                        for (r in e) ft.isFunction(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
                    return this
                }
                if ((i = rt.getElementById(r[2])) && i.parentNode) {
                    if (i.id !== r[2]) return Ct.find(t);
                    this.length = 1, this[0] = i
                }
                return this.context = rt, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ft.isFunction(t) ? "undefined" != typeof n.ready ? n.ready(t) : t(ft) : (t.selector !== undefined && (this.selector = t.selector, this.context = t.context), ft.makeArray(t, this))
        }).prototype = ft.fn, Ct = ft(rt);
        var Tt = /^(?:parents|prev(?:Until|All))/,
            At = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ft.fn.extend({
            has: function(t) {
                var e, n = ft(t, this),
                    r = n.length;
                return this.filter(function() {
                    for (e = 0; e < r; e++)
                        if (ft.contains(this, n[e])) return !0
                })
            },
            closest: function(t, e) {
                for (var n, r = 0, i = this.length, o = [], a = xt.test(t) || "string" != typeof t ? ft(t, e || this.context) : 0; r < i; r++)
                    for (n = this[r]; n && n !== e; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ft.find.matchesSelector(n, t))) {
                            o.push(n);
                            break
                        } return this.pushStack(o.length > 1 ? ft.uniqueSort(o) : o)
            },
            index: function(t) {
                return t ? "string" == typeof t ? ft.inArray(this[0], ft(t)) : ft.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(ft.uniqueSort(ft.merge(this.get(), ft(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), ft.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return bt(t, "parentNode")
            },
            parentsUntil: function(t, e, n) {
                return bt(t, "parentNode", n)
            },
            next: function(t) {
                return i(t, "nextSibling")
            },
            prev: function(t) {
                return i(t, "previousSibling")
            },
            nextAll: function(t) {
                return bt(t, "nextSibling")
            },
            prevAll: function(t) {
                return bt(t, "previousSibling")
            },
            nextUntil: function(t, e, n) {
                return bt(t, "nextSibling", n)
            },
            prevUntil: function(t, e, n) {
                return bt(t, "previousSibling", n)
            },
            siblings: function(t) {
                return wt((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return wt(t.firstChild)
            },
            contents: function(t) {
                return ft.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ft.merge([], t.childNodes)
            }
        }, function(t, e) {
            ft.fn[t] = function(n, r) {
                var i = ft.map(this, e, n);
                return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (i = ft.filter(r, i)), this.length > 1 && (At[t] || (i = ft.uniqueSort(i)), Tt.test(t) && (i = i.reverse())), this.pushStack(i)
            }
        });
        var Lt, Dt, Rt = /\S+/g;
        for (Dt in ft.Callbacks = function(t) {
                t = "string" == typeof t ? o(t) : ft.extend({}, t);
                var e, n, r, i, a = [],
                    s = [],
                    u = -1,
                    l = function() {
                        for (i = t.once, r = e = !0; s.length; u = -1)
                            for (n = s.shift(); ++u < a.length;) !1 === a[u].apply(n[0], n[1]) && t.stopOnFalse && (u = a.length, n = !1);
                        t.memory || (n = !1), e = !1, i && (a = n ? [] : "")
                    },
                    c = {
                        add: function() {
                            return a && (n && !e && (u = a.length - 1, s.push(n)), function r(e) {
                                ft.each(e, function(e, n) {
                                    ft.isFunction(n) ? t.unique && c.has(n) || a.push(n) : n && n.length && "string" !== ft.type(n) && r(n)
                                })
                            }(arguments), n && !e && l()), this
                        },
                        remove: function() {
                            return ft.each(arguments, function(t, e) {
                                for (var n;
                                    (n = ft.inArray(e, a, n)) > -1;) a.splice(n, 1), n <= u && u--
                            }), this
                        },
                        has: function(t) {
                            return t ? ft.inArray(t, a) > -1 : a.length > 0
                        },
                        empty: function() {
                            return a && (a = []), this
                        },
                        disable: function() {
                            return i = s = [], a = n = "", this
                        },
                        disabled: function() {
                            return !a
                        },
                        lock: function() {
                            return i = !0, n || c.disable(), this
                        },
                        locked: function() {
                            return !!i
                        },
                        fireWith: function(t, n) {
                            return i || (n = [t, (n = n || []).slice ? n.slice() : n], s.push(n), e || l()), this
                        },
                        fire: function() {
                            return c.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!r
                        }
                    };
                return c
            }, ft.extend({
                Deferred: function(t) {
                    var e = [
                            ["resolve", "done", ft.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", ft.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", ft.Callbacks("memory")]
                        ],
                        n = "pending",
                        r = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var t = arguments;
                                return ft.Deferred(function(n) {
                                    ft.each(e, function(e, o) {
                                        var a = ft.isFunction(t[e]) && t[e];
                                        i[o[1]](function() {
                                            var t = a && a.apply(this, arguments);
                                            t && ft.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [t] : arguments)
                                        })
                                    }), t = null
                                }).promise()
                            },
                            promise: function(t) {
                                return null != t ? ft.extend(t, r) : r
                            }
                        },
                        i = {};
                    return r.pipe = r.then, ft.each(e, function(t, o) {
                        var a = o[2],
                            s = o[3];
                        r[o[1]] = a.add, s && a.add(function() {
                            n = s
                        }, e[1 ^ t][2].disable, e[2][2].lock), i[o[0]] = function() {
                            return i[o[0] + "With"](this === i ? r : this, arguments), this
                        }, i[o[0] + "With"] = a.fireWith
                    }), r.promise(i), t && t.call(i, i), i
                },
                when: function(t) {
                    var e, n, r, i = 0,
                        o = it.call(arguments),
                        a = o.length,
                        s = 1 !== a || t && ft.isFunction(t.promise) ? a : 0,
                        u = 1 === s ? t : ft.Deferred(),
                        l = function(t, n, r) {
                            return function(i) {
                                n[t] = this, r[t] = arguments.length > 1 ? it.call(arguments) : i, r === e ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                            }
                        };
                    if (a > 1)
                        for (e = new Array(a), n = new Array(a), r = new Array(a); i < a; i++) o[i] && ft.isFunction(o[i].promise) ? o[i].promise().progress(l(i, n, e)).done(l(i, r, o)).fail(u.reject) : --s;
                    return s || u.resolveWith(r, o), u.promise()
                }
            }), ft.fn.ready = function(t) {
                return ft.ready.promise().done(t), this
            }, ft.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? ft.readyWait++ : ft.ready(!0)
                },
                ready: function(t) {
                    (!0 === t ? --ft.readyWait : ft.isReady) || (ft.isReady = !0, !0 !== t && --ft.readyWait > 0 || (Lt.resolveWith(rt, [ft]), ft.fn.triggerHandler && (ft(rt).triggerHandler("ready"), ft(rt).off("ready"))))
                }
            }), ft.ready.promise = function(e) {
                if (!Lt)
                    if (Lt = ft.Deferred(), "complete" === rt.readyState || "loading" !== rt.readyState && !rt.documentElement.doScroll) t.setTimeout(ft.ready);
                    else if (rt.addEventListener) rt.addEventListener("DOMContentLoaded", s), t.addEventListener("load", s);
                else {
                    rt.attachEvent("onreadystatechange", s), t.attachEvent("onload", s);
                    var n = !1;
                    try {
                        n = null == t.frameElement && rt.documentElement
                    } catch (r) {}
                    n && n.doScroll && function e() {
                        if (!ft.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (r) {
                                return t.setTimeout(e, 50)
                            }
                            a(), ft.ready()
                        }
                    }()
                }
                return Lt.promise(e)
            }, ft.ready.promise(), ft(dt)) break;
        dt.ownFirst = "0" === Dt, dt.inlineBlockNeedsLayout = !1, ft(function() {
                var t, e, n, r;
                (n = rt.getElementsByTagName("body")[0]) && n.style && (e = rt.createElement("div"), (r = rt.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", dt.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(r))
            }),
            function() {
                var t = rt.createElement("div");
                dt.deleteExpando = !0;
                try {
                    delete t.test
                } catch (e) {
                    dt.deleteExpando = !1
                }
                t = null
            }();
        var Nt, jt = function(t) {
                var e = ft.noData[(t.nodeName + " ").toLowerCase()],
                    n = +t.nodeType || 1;
                return (1 === n || 9 === n) && (!e || !0 !== e && t.getAttribute("classid") === e)
            },
            qt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Pt = /([A-Z])/g;
        ft.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(t) {
                return !!(t = t.nodeType ? ft.cache[t[ft.expando]] : t[ft.expando]) && !l(t)
            },
            data: function(t, e, n) {
                return c(t, e, n)
            },
            removeData: function(t, e) {
                return d(t, e)
            },
            _data: function(t, e, n) {
                return c(t, e, n, !0)
            },
            _removeData: function(t, e) {
                return d(t, e, !0)
            }
        }), ft.fn.extend({
            data: function(t, e) {
                var n, r, i, o = this[0],
                    a = o && o.attributes;
                if (t === undefined) {
                    if (this.length && (i = ft.data(o), 1 === o.nodeType && !ft._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && u(o, r = ft.camelCase(r.slice(5)), i[r]);
                        ft._data(o, "parsedAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof t ? this.each(function() {
                    ft.data(this, t)
                }) : arguments.length > 1 ? this.each(function() {
                    ft.data(this, t, e)
                }) : o ? u(o, t, ft.data(o, t)) : undefined
            },
            removeData: function(t) {
                return this.each(function() {
                    ft.removeData(this, t)
                })
            }
        }), ft.extend({
            queue: function(t, e, n) {
                var r;
                if (t) return e = (e || "fx") + "queue", r = ft._data(t, e), n && (!r || ft.isArray(n) ? r = ft._data(t, e, ft.makeArray(n)) : r.push(n)), r || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var n = ft.queue(t, e),
                    r = n.length,
                    i = n.shift(),
                    o = ft._queueHooks(t, e),
                    a = function() {
                        ft.dequeue(t, e)
                    };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete o.stop, i.call(t, a, o)), !r && o && o.empty.fire()
            },
            _queueHooks: function(t, e) {
                var n = e + "queueHooks";
                return ft._data(t, n) || ft._data(t, n, {
                    empty: ft.Callbacks("once memory").add(function() {
                        ft._removeData(t, e + "queue"), ft._removeData(t, n)
                    })
                })
            }
        }), ft.fn.extend({
            queue: function(t, e) {
                var n = 2;
                return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? ft.queue(this[0], t) : e === undefined ? this : this.each(function() {
                    var n = ft.queue(this, t, e);
                    ft._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && ft.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    ft.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var n, r = 1,
                    i = ft.Deferred(),
                    o = this,
                    a = this.length,
                    s = function() {
                        --r || i.resolveWith(o, [o])
                    };
                for ("string" != typeof t && (e = t, t = undefined), t = t || "fx"; a--;)(n = ft._data(o[a], t + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(e)
            }
        }), dt.shrinkWrapBlocks = function() {
            return null != Nt ? Nt : (Nt = !1, (e = rt.getElementsByTagName("body")[0]) && e.style ? (t = rt.createElement("div"), (n = rt.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", e.appendChild(n).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(rt.createElement("div")).style.width = "5px", Nt = 3 !== t.offsetWidth), e.removeChild(n), Nt) : void 0);
            var t, e, n
        };
        var Ht, It, Mt, _t = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ft = new RegExp("^(?:([+-])=|)(" + _t + ")([a-z%]*)$", "i"),
            Bt = ["Top", "Right", "Bottom", "Left"],
            Ot = function(t, e) {
                return t = e || t, "none" === ft.css(t, "display") || !ft.contains(t.ownerDocument, t)
            },
            Wt = function(t, e, n, r, i, o, a) {
                var s = 0,
                    u = t.length,
                    l = null == n;
                if ("object" === ft.type(n))
                    for (s in i = !0, n) Wt(t, e, s, n[s], !0, o, a);
                else if (r !== undefined && (i = !0, ft.isFunction(r) || (a = !0), l && (a ? (e.call(t, r), e = null) : (l = e, e = function(t, e, n) {
                        return l.call(ft(t), n)
                    })), e))
                    for (; s < u; s++) e(t[s], n, a ? r : r.call(t[s], s, e(t[s], n)));
                return i ? t : l ? e.call(t) : u ? e(t[0], n) : o
            },
            $t = /^(?:checkbox|radio)$/i,
            Ut = /<([\w:-]+)/,
            zt = /^$|\/(?:java|ecma)script/i,
            Vt = /^\s+/,
            Xt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        Ht = rt.createElement("div"), It = rt.createDocumentFragment(), Mt = rt.createElement("input"), Ht.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", dt.leadingWhitespace = 3 === Ht.firstChild.nodeType, dt.tbody = !Ht.getElementsByTagName("tbody").length, dt.htmlSerialize = !!Ht.getElementsByTagName("link").length, dt.html5Clone = "<:nav></:nav>" !== rt.createElement("nav").cloneNode(!0).outerHTML, Mt.type = "checkbox", Mt.checked = !0, It.appendChild(Mt), dt.appendChecked = Mt.checked, Ht.innerHTML = "<textarea>x</textarea>", dt.noCloneChecked = !!Ht.cloneNode(!0).lastChild.defaultValue, It.appendChild(Ht), (Mt = rt.createElement("input")).setAttribute("type", "radio"), Mt.setAttribute("checked", "checked"), Mt.setAttribute("name", "t"), Ht.appendChild(Mt), dt.checkClone = Ht.cloneNode(!0).cloneNode(!0).lastChild.checked, dt.noCloneEvent = !!Ht.addEventListener, Ht[ft.expando] = 1, dt.attributes = !Ht.getAttribute(ft.expando);
        var Jt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: dt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        };
        Jt.optgroup = Jt.option, Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead, Jt.th = Jt.td;
        var Gt = /<|&#?\w+;/,
            Kt = /<tbody/i;
        ! function() {
            var e, n, r = rt.createElement("div");
            for (e in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) n = "on" + e, (dt[e] = n in t) || (r.setAttribute(n, "t"), dt[e] = !1 === r.attributes[n].expando);
            r = null
        }();
        var Qt = /^(?:input|select|textarea)$/i,
            Yt = /^key/,
            Zt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            te = /^(?:focusinfocus|focusoutblur)$/,
            ee = /^([^.]*)(?:\.(.+)|)/;
        ft.event = {
            global: {},
            add: function(t, e, n, r, i) {
                var o, a, s, u, l, c, d, p, f, h, m, y = ft._data(t);
                if (y) {
                    for (n.handler && (n = (u = n).handler, i = u.selector), n.guid || (n.guid = ft.guid++), (a = y.events) || (a = y.events = {}), (c = y.handle) || ((c = y.handle = function(t) {
                            return void 0 === ft || t && ft.event.triggered === t.type ? undefined : ft.event.dispatch.apply(c.elem, arguments)
                        }).elem = t), s = (e = (e || "").match(Rt) || [""]).length; s--;) f = m = (o = ee.exec(e[s]) || [])[1], h = (o[2] || "").split(".").sort(), f && (l = ft.event.special[f] || {}, f = (i ? l.delegateType : l.bindType) || f, l = ft.event.special[f] || {}, d = ft.extend({
                        type: f,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && ft.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, u), (p = a[f]) || ((p = a[f] = []).delegateCount = 0, l.setup && !1 !== l.setup.call(t, r, h, c) || (t.addEventListener ? t.addEventListener(f, c, !1) : t.attachEvent && t.attachEvent("on" + f, c))), l.add && (l.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, d) : p.push(d), ft.event.global[f] = !0);
                    t = null
                }
            },
            remove: function(t, e, n, r, i) {
                var o, a, s, u, l, c, d, p, f, h, m, y = ft.hasData(t) && ft._data(t);
                if (y && (c = y.events)) {
                    for (l = (e = (e || "").match(Rt) || [""]).length; l--;)
                        if (f = m = (s = ee.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), f) {
                            for (d = ft.event.special[f] || {}, p = c[f = (r ? d.delegateType : d.bindType) || f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) a = p[o], !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, d.remove && d.remove.call(t, a));
                            u && !p.length && (d.teardown && !1 !== d.teardown.call(t, h, y.handle) || ft.removeEvent(t, f, y.handle), delete c[f])
                        } else
                            for (f in c) ft.event.remove(t, f + e[l], n, r, !0);
                    ft.isEmptyObject(c) && (delete y.handle, ft._removeData(t, "events"))
                }
            },
            trigger: function(e, n, r, i) {
                var o, a, s, u, l, c, d, p = [r || rt],
                    f = ct.call(e, "type") ? e.type : e,
                    h = ct.call(e, "namespace") ? e.namespace.split(".") : [];
                if (s = c = r = r || rt, 3 !== r.nodeType && 8 !== r.nodeType && !te.test(f + ft.event.triggered) && (f.indexOf(".") > -1 && (f = (h = f.split(".")).shift(), h.sort()), a = f.indexOf(":") < 0 && "on" + f, (e = e[ft.expando] ? e : new ft.Event(f, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = r), n = null == n ? [e] : ft.makeArray(n, [e]), l = ft.event.special[f] || {}, i || !l.trigger || !1 !== l.trigger.apply(r, n))) {
                    if (!i && !l.noBubble && !ft.isWindow(r)) {
                        for (u = l.delegateType || f, te.test(u + f) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                        c === (r.ownerDocument || rt) && p.push(c.defaultView || c.parentWindow || t)
                    }
                    for (d = 0;
                        (s = p[d++]) && !e.isPropagationStopped();) e.type = d > 1 ? u : l.bindType || f, (o = (ft._data(s, "events") || {})[e.type] && ft._data(s, "handle")) && o.apply(s, n), (o = a && s[a]) && o.apply && jt(s) && (e.result = o.apply(s, n), !1 === e.result && e.preventDefault());
                    if (e.type = f, !i && !e.isDefaultPrevented() && (!l._default || !1 === l._default.apply(p.pop(), n)) && jt(r) && a && r[f] && !ft.isWindow(r)) {
                        (c = r[a]) && (r[a] = null), ft.event.triggered = f;
                        try {
                            r[f]()
                        } catch (m) {}
                        ft.event.triggered = undefined, c && (r[a] = c)
                    }
                    return e.result
                }
            },
            dispatch: function(t) {
                t = ft.event.fix(t);
                var e, n, r, i, o, a = [],
                    s = it.call(arguments),
                    u = (ft._data(this, "events") || {})[t.type] || [],
                    l = ft.event.special[t.type] || {};
                if (s[0] = t, t.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, t)) {
                    for (a = ft.event.handlers.call(this, t, u), e = 0;
                        (i = a[e++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = i.elem, n = 0;
                            (o = i.handlers[n++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(o.namespace) || (t.handleObj = o, t.data = o.data, (r = ((ft.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) !== undefined && !1 === (t.result = r) && (t.preventDefault(), t.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, t), t.result
                }
            },
            handlers: function(t, e) {
                var n, r, i, o, a = [],
                    s = e.delegateCount,
                    u = t.target;
                if (s && u.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
                    for (; u != this; u = u.parentNode || this)
                        if (1 === u.nodeType && (!0 !== u.disabled || "click" !== t.type)) {
                            for (r = [], n = 0; n < s; n++) r[i = (o = e[n]).selector + " "] === undefined && (r[i] = o.needsContext ? ft(i, this).index(u) > -1 : ft.find(i, this, null, [u]).length), r[i] && r.push(o);
                            r.length && a.push({
                                elem: u,
                                handlers: r
                            })
                        } return s < e.length && a.push({
                    elem: this,
                    handlers: e.slice(s)
                }), a
            },
            fix: function(t) {
                if (t[ft.expando]) return t;
                var e, n, r, i = t.type,
                    o = t,
                    a = this.fixHooks[i];
                for (a || (this.fixHooks[i] = a = Zt.test(i) ? this.mouseHooks : Yt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, t = new ft.Event(o), e = r.length; e--;) t[n = r[e]] = o[n];
                return t.target || (t.target = o.srcElement || rt), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, o) : t
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, e) {
                    var n, r, i, o = e.button,
                        a = e.fromElement;
                    return null == t.pageX && null != e.clientX && (i = (r = t.target.ownerDocument || rt).documentElement, n = r.body, t.pageX = e.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || o === undefined || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== w() && this.focus) try {
                            return this.focus(), !1
                        } catch (t) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === w() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (ft.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                    },
                    _default: function(t) {
                        return ft.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        t.result !== undefined && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function(t, e, n) {
                var r = ft.extend(new ft.Event, n, {
                    type: t,
                    isSimulated: !0
                });
                ft.event.trigger(r, null, e), r.isDefaultPrevented() && n.preventDefault()
            }
        }, ft.removeEvent = rt.removeEventListener ? function(t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n)
        } : function(t, e, n) {
            var r = "on" + e;
            t.detachEvent && ("undefined" == typeof t[r] && (t[r] = null), t.detachEvent(r, n))
        }, ft.Event = function(t, e) {
            if (!(this instanceof ft.Event)) return new ft.Event(t, e);
            t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.defaultPrevented === undefined && !1 === t.returnValue ? v : b) : this.type = t, e && ft.extend(this, e), this.timeStamp = t && t.timeStamp || ft.now(), this[ft.expando] = !0
        }, ft.Event.prototype = {
            constructor: ft.Event,
            isDefaultPrevented: b,
            isPropagationStopped: b,
            isImmediatePropagationStopped: b,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = v, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = v, t && !this.isSimulated && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = v, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ft.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            ft.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var n, r = this,
                        i = t.relatedTarget,
                        o = t.handleObj;
                    return i && (i === r || ft.contains(r, i)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), dt.submit || (ft.event.special.submit = {
            setup: function() {
                if (ft.nodeName(this, "form")) return !1;
                ft.event.add(this, "click._submit keypress._submit", function(t) {
                    var e = t.target,
                        n = ft.nodeName(e, "input") || ft.nodeName(e, "button") ? ft.prop(e, "form") : undefined;
                    n && !ft._data(n, "submit") && (ft.event.add(n, "submit._submit", function(t) {
                        t._submitBubble = !0
                    }), ft._data(n, "submit", !0))
                })
            },
            postDispatch: function(t) {
                t._submitBubble && (delete t._submitBubble, this.parentNode && !t.isTrigger && ft.event.simulate("submit", this.parentNode, t))
            },
            teardown: function() {
                if (ft.nodeName(this, "form")) return !1;
                ft.event.remove(this, "._submit")
            }
        }), dt.change || (ft.event.special.change = {
            setup: function() {
                if (Qt.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (ft.event.add(this, "propertychange._change", function(t) {
                    "checked" === t.originalEvent.propertyName && (this._justChanged = !0)
                }), ft.event.add(this, "click._change", function(t) {
                    this._justChanged && !t.isTrigger && (this._justChanged = !1), ft.event.simulate("change", this, t)
                })), !1;
                ft.event.add(this, "beforeactivate._change", function(t) {
                    var e = t.target;
                    Qt.test(e.nodeName) && !ft._data(e, "change") && (ft.event.add(e, "change._change", function(t) {
                        !this.parentNode || t.isSimulated || t.isTrigger || ft.event.simulate("change", this.parentNode, t)
                    }), ft._data(e, "change", !0))
                })
            },
            handle: function(t) {
                var e = t.target;
                if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type) return t.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return ft.event.remove(this, "._change"), !Qt.test(this.nodeName)
            }
        }), dt.focusin || ft.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var n = function(t) {
                ft.event.simulate(e, t.target, ft.event.fix(t))
            };
            ft.event.special[e] = {
                setup: function() {
                    var r = this.ownerDocument || this,
                        i = ft._data(r, e);
                    i || r.addEventListener(t, n, !0), ft._data(r, e, (i || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this,
                        i = ft._data(r, e) - 1;
                    i ? ft._data(r, e, i) : (r.removeEventListener(t, n, !0), ft._removeData(r, e))
                }
            }
        }), ft.fn.extend({
            on: function(t, e, n, r) {
                return x(this, t, e, n, r)
            },
            one: function(t, e, n, r) {
                return x(this, t, e, n, r, 1)
            },
            off: function(t, e, n) {
                var r, i;
                if (t && t.preventDefault && t.handleObj) return r = t.handleObj, ft(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof t) {
                    for (i in t) this.off(i, e, t[i]);
                    return this
                }
                return !1 !== e && "function" != typeof e || (n = e, e = undefined), !1 === n && (n = b), this.each(function() {
                    ft.event.remove(this, t, n, e)
                })
            },
            trigger: function(t, e) {
                return this.each(function() {
                    ft.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var n = this[0];
                if (n) return ft.event.trigger(t, e, n, !0)
            }
        });
        var ne = / jQuery\d+="(?:null|\d+)"/g,
            re = new RegExp("<(?:" + Xt + ")[\\s/>]", "i"),
            ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            oe = /<script|<style|<link/i,
            ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
            se = /^true\/(.*)/,
            ue = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            le = f(rt).appendChild(rt.createElement("div"));
        ft.extend({
            htmlPrefilter: function(t) {
                return t.replace(ie, "<$1></$2>")
            },
            clone: function(t, e, n) {
                var r, i, o, a, s, u = ft.contains(t.ownerDocument, t);
                if (dt.html5Clone || ft.isXMLDoc(t) || !re.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (le.innerHTML = t.outerHTML, le.removeChild(o = le.firstChild)), !(dt.noCloneEvent && dt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ft.isXMLDoc(t)))
                    for (r = h(o), s = h(t), a = 0; null != (i = s[a]); ++a) r[a] && T(i, r[a]);
                if (e)
                    if (n)
                        for (s = s || h(t), r = r || h(o), a = 0; null != (i = s[a]); a++) k(i, r[a]);
                    else k(t, o);
                return (r = h(o, "script")).length > 0 && m(r, !u && h(t, "script")), r = s = i = null, o
            },
            cleanData: function(t, e) {
                for (var n, r, i, o, a = 0, s = ft.expando, u = ft.cache, l = dt.attributes, c = ft.event.special; null != (n = t[a]); a++)
                    if ((e || jt(n)) && (o = (i = n[s]) && u[i])) {
                        if (o.events)
                            for (r in o.events) c[r] ? ft.event.remove(n, r) : ft.removeEvent(n, r, o.handle);
                        u[i] && (delete u[i], l || "undefined" == typeof n.removeAttribute ? n[s] = undefined : n.removeAttribute(s), nt.push(i))
                    }
            }
        }), ft.fn.extend({
            domManip: A,
            detach: function(t) {
                return L(this, t, !0)
            },
            remove: function(t) {
                return L(this, t)
            },
            text: function(t) {
                return Wt(this, function(t) {
                    return t === undefined ? ft.text(this) : this.empty().append((this[0] && this[0].ownerDocument || rt).createTextNode(t))
                }, null, t, arguments.length)
            },
            append: function() {
                return A(this, arguments, function(t) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || S(this, t).appendChild(t)
                })
            },
            prepend: function() {
                return A(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = S(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return A(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return A(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) {
                    for (1 === t.nodeType && ft.cleanData(h(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                    t.options && ft.nodeName(t, "select") && (t.options.length = 0)
                }
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return ft.clone(this, t, e)
                })
            },
            html: function(t) {
                return Wt(this, function(t) {
                    var e = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (t === undefined) return 1 === e.nodeType ? e.innerHTML.replace(ne, "") : undefined;
                    if ("string" == typeof t && !oe.test(t) && (dt.htmlSerialize || !re.test(t)) && (dt.leadingWhitespace || !Vt.test(t)) && !Jt[(Ut.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = ft.htmlPrefilter(t);
                        try {
                            for (; n < r; n++) 1 === (e = this[n] || {}).nodeType && (ft.cleanData(h(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (i) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return A(this, arguments, function(e) {
                    var n = this.parentNode;
                    ft.inArray(this, t) < 0 && (ft.cleanData(h(this)), n && n.replaceChild(e, this))
                }, t)
            }
        }), ft.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            ft.fn[t] = function(t) {
                for (var n, r = 0, i = [], o = ft(t), a = o.length - 1; r <= a; r++) n = r === a ? this : this.clone(!0), ft(o[r])[e](n), at.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var ce, de = {
                HTML: "block",
                BODY: "block"
            },
            pe = /^margin/,
            fe = new RegExp("^(" + _t + ")(?!px)[a-z%]+$", "i"),
            he = function(t, e, n, r) {
                var i, o, a = {};
                for (o in e) a[o] = t.style[o], t.style[o] = e[o];
                for (o in i = n.apply(t, r || []), e) t.style[o] = a[o];
                return i
            },
            me = rt.documentElement;
        ! function() {
            function e() {
                var e, c, d = rt.documentElement;
                d.appendChild(u), l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = i = s = !1, r = a = !0, t.getComputedStyle && (c = t.getComputedStyle(l), n = "1%" !== (c || {}).top, s = "2px" === (c || {}).marginLeft, i = "4px" === (c || {
                    width: "4px"
                }).width, l.style.marginRight = "50%", r = "4px" === (c || {
                    marginRight: "4px"
                }).marginRight, (e = l.appendChild(rt.createElement("div"))).style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", l.style.width = "1px", a = !parseFloat((t.getComputedStyle(e) || {}).marginRight), l.removeChild(e)), l.style.display = "none", (o = 0 === l.getClientRects().length) && (l.style.display = "", l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", l.childNodes[0].style.borderCollapse = "separate", (e = l.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (o = 0 === e[0].offsetHeight) && (e[0].style.display = "", e[1].style.display = "none", o = 0 === e[0].offsetHeight)), d.removeChild(u)
            }
            var n, r, i, o, a, s, u = rt.createElement("div"),
                l = rt.createElement("div");
            l.style && (l.style.cssText = "float:left;opacity:.5", dt.opacity = "0.5" === l.style.opacity, dt.cssFloat = !!l.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", dt.clearCloneStyle = "content-box" === l.style.backgroundClip, (u = rt.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.innerHTML = "", u.appendChild(l), dt.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing, ft.extend(dt, {
                reliableHiddenOffsets: function() {
                    return null == n && e(), o
                },
                boxSizingReliable: function() {
                    return null == n && e(), i
                },
                pixelMarginRight: function() {
                    return null == n && e(), r
                },
                pixelPosition: function() {
                    return null == n && e(), n
                },
                reliableMarginRight: function() {
                    return null == n && e(), a
                },
                reliableMarginLeft: function() {
                    return null == n && e(), s
                }
            }))
        }();
        var ye, ge, ve = /^(top|right|bottom|left)$/;
        t.getComputedStyle ? (ye = function(e) {
            var n = e.ownerDocument.defaultView;
            return n && n.opener || (n = t), n.getComputedStyle(e)
        }, ge = function(t, e, n) {
            var r, i, o, a, s = t.style;
            return "" !== (a = (n = n || ye(t)) ? n.getPropertyValue(e) || n[e] : undefined) && a !== undefined || ft.contains(t.ownerDocument, t) || (a = ft.style(t, e)), n && !dt.pixelMarginRight() && fe.test(a) && pe.test(e) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o), a === undefined ? a : a + ""
        }) : me.currentStyle && (ye = function(t) {
            return t.currentStyle
        }, ge = function(t, e, n) {
            var r, i, o, a, s = t.style;
            return null == (a = (n = n || ye(t)) ? n[e] : undefined) && s && s[e] && (a = s[e]), fe.test(a) && !ve.test(e) && (r = s.left, (o = (i = t.runtimeStyle) && i.left) && (i.left = t.currentStyle.left), s.left = "fontSize" === e ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), a === undefined ? a : a + "" || "auto"
        });
        var be = /alpha\([^)]*\)/i,
            we = /opacity\s*=\s*([^)]*)/i,
            xe = /^(none|table(?!-c[ea]).+)/,
            Se = new RegExp("^(" + _t + ")(.*)$", "i"),
            Ee = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Ce = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            ke = ["Webkit", "O", "Moz", "ms"],
            Te = rt.createElement("div").style;
        ft.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var n = ge(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: dt.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(t, e, n, r) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var i, o, a, s = ft.camelCase(e),
                        u = t.style;
                    if (e = ft.cssProps[s] || (ft.cssProps[s] = j(s) || s), a = ft.cssHooks[e] || ft.cssHooks[s], n === undefined) return a && "get" in a && (i = a.get(t, !1, r)) !== undefined ? i : u[e];
                    if ("string" === (o = typeof n) && (i = Ft.exec(n)) && i[1] && (n = p(t, e, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (ft.cssNumber[s] ? "" : "px")), dt.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), !(a && "set" in a && (n = a.set(t, n, r)) === undefined))) try {
                        u[e] = n
                    } catch (l) {}
                }
            },
            css: function(t, e, n, r) {
                var i, o, a, s = ft.camelCase(e);
                return e = ft.cssProps[s] || (ft.cssProps[s] = j(s) || s), (a = ft.cssHooks[e] || ft.cssHooks[s]) && "get" in a && (o = a.get(t, !0, n)), o === undefined && (o = ge(t, e, r)), "normal" === o && e in Ce && (o = Ce[e]), "" === n || n ? (i = parseFloat(o), !0 === n || isFinite(i) ? i || 0 : o) : o
            }
        }), ft.each(["height", "width"], function(t, e) {
            ft.cssHooks[e] = {
                get: function(t, n, r) {
                    if (n) return xe.test(ft.css(t, "display")) && 0 === t.offsetWidth ? he(t, Ee, function() {
                        return I(t, e, r)
                    }) : I(t, e, r)
                },
                set: function(t, n, r) {
                    var i = r && ye(t);
                    return P(t, n, r ? H(t, e, r, dt.boxSizing && "border-box" === ft.css(t, "boxSizing", !1, i), i) : 0)
                }
            }
        }), dt.opacity || (ft.cssHooks.opacity = {
            get: function(t, e) {
                return we.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            },
            set: function(t, e) {
                var n = t.style,
                    r = t.currentStyle,
                    i = ft.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    o = r && r.filter || n.filter || "";
                n.zoom = 1, (e >= 1 || "" === e) && "" === ft.trim(o.replace(be, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || r && !r.filter) || (n.filter = be.test(o) ? o.replace(be, i) : o + " " + i)
            }
        }), ft.cssHooks.marginRight = N(dt.reliableMarginRight, function(t, e) {
            if (e) return he(t, {
                display: "inline-block"
            }, ge, [t, "marginRight"])
        }), ft.cssHooks.marginLeft = N(dt.reliableMarginLeft, function(t, e) {
            if (e) return (parseFloat(ge(t, "marginLeft")) || (ft.contains(t.ownerDocument, t) ? t.getBoundingClientRect().left - he(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            }) : 0)) + "px"
        }), ft.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            ft.cssHooks[t + e] = {
                expand: function(n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[t + Bt[r] + e] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, pe.test(t) || (ft.cssHooks[t + e].set = P)
        }), ft.fn.extend({
            css: function(t, e) {
                return Wt(this, function(t, e, n) {
                    var r, i, o = {},
                        a = 0;
                    if (ft.isArray(e)) {
                        for (r = ye(t), i = e.length; a < i; a++) o[e[a]] = ft.css(t, e[a], !1, r);
                        return o
                    }
                    return n !== undefined ? ft.style(t, e, n) : ft.css(t, e)
                }, t, e, arguments.length > 1)
            },
            show: function() {
                return q(this, !0)
            },
            hide: function() {
                return q(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    Ot(this) ? ft(this).show() : ft(this).hide()
                })
            }
        }), ft.Tween = M, M.prototype = {
            constructor: M,
            init: function(t, e, n, r, i, o) {
                this.elem = t, this.prop = n, this.easing = i || ft.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ft.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var t = M.propHooks[this.prop];
                return t && t.get ? t.get(this) : M.propHooks._default.get(this)
            },
            run: function(t) {
                var e, n = M.propHooks[this.prop];
                return this.options.duration ? this.pos = e = ft.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
            }
        }, M.prototype.init.prototype = M.prototype, M.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = ft.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
                },
                set: function(t) {
                    ft.fx.step[t.prop] ? ft.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[ft.cssProps[t.prop]] && !ft.cssHooks[t.prop] ? t.elem[t.prop] = t.now : ft.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, ft.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        }, ft.fx = M.prototype.init, ft.fx.step = {};
        var Ae, Le, De = /^(?:toggle|show|hide)$/,
            Re = /queueHooks$/;
        ft.Animation = ft.extend($, {
                tweeners: {
                    "*": [function(t, e) {
                        var n = this.createTween(t, e);
                        return p(n.elem, t, Ft.exec(e), n), n
                    }]
                },
                tweener: function(t, e) {
                    ft.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(Rt);
                    for (var n, r = 0, i = t.length; r < i; r++) n = t[r], $.tweeners[n] = $.tweeners[n] || [], $.tweeners[n].unshift(e)
                },
                prefilters: [O],
                prefilter: function(t, e) {
                    e ? $.prefilters.unshift(t) : $.prefilters.push(t)
                }
            }), ft.speed = function(t, e, n) {
                var r = t && "object" == typeof t ? ft.extend({}, t) : {
                    complete: n || !n && e || ft.isFunction(t) && t,
                    duration: t,
                    easing: n && e || e && !ft.isFunction(e) && e
                };
                return r.duration = ft.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ft.fx.speeds ? ft.fx.speeds[r.duration] : ft.fx.speeds._default, null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    ft.isFunction(r.old) && r.old.call(this), r.queue && ft.dequeue(this, r.queue)
                }, r
            }, ft.fn.extend({
                fadeTo: function(t, e, n, r) {
                    return this.filter(Ot).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, n, r)
                },
                animate: function(t, e, n, r) {
                    var i = ft.isEmptyObject(t),
                        o = ft.speed(e, n, r),
                        a = function() {
                            var e = $(this, ft.extend({}, t), o);
                            (i || ft._data(this, "finish")) && e.stop(!0)
                        };
                    return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(t, e, n) {
                    var r = function(t) {
                        var e = t.stop;
                        delete t.stop, e(n)
                    };
                    return "string" != typeof t && (n = e, e = t, t = undefined), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            i = null != t && t + "queueHooks",
                            o = ft.timers,
                            a = ft._data(this);
                        if (i) a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a) a[i] && a[i].stop && Re.test(i) && r(a[i]);
                        for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(n), e = !1, o.splice(i, 1));
                        !e && n || ft.dequeue(this, t)
                    })
                },
                finish: function(t) {
                    return !1 !== t && (t = t || "fx"), this.each(function() {
                        var e, n = ft._data(this),
                            r = n[t + "queue"],
                            i = n[t + "queueHooks"],
                            o = ft.timers,
                            a = r ? r.length : 0;
                        for (n.finish = !0, ft.queue(this, t, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                        for (e = 0; e < a; e++) r[e] && r[e].finish && r[e].finish.call(this);
                        delete n.finish
                    })
                }
            }), ft.each(["toggle", "show", "hide"], function(t, e) {
                var n = ft.fn[e];
                ft.fn[e] = function(t, r, i) {
                    return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(F(e, !0), t, r, i)
                }
            }), ft.each({
                slideDown: F("show"),
                slideUp: F("hide"),
                slideToggle: F("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                ft.fn[t] = function(t, n, r) {
                    return this.animate(e, t, n, r)
                }
            }), ft.timers = [], ft.fx.tick = function() {
                var t, e = ft.timers,
                    n = 0;
                for (Ae = ft.now(); n < e.length; n++)(t = e[n])() || e[n] !== t || e.splice(n--, 1);
                e.length || ft.fx.stop(), Ae = undefined
            }, ft.fx.timer = function(t) {
                ft.timers.push(t), t() ? ft.fx.start() : ft.timers.pop()
            }, ft.fx.interval = 13, ft.fx.start = function() {
                Le || (Le = t.setInterval(ft.fx.tick, ft.fx.interval))
            }, ft.fx.stop = function() {
                t.clearInterval(Le), Le = null
            }, ft.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, ft.fn.delay = function(e, n) {
                return e = ft.fx && ft.fx.speeds[e] || e, n = n || "fx", this.queue(n, function(n, r) {
                    var i = t.setTimeout(n, e);
                    r.stop = function() {
                        t.clearTimeout(i)
                    }
                })
            },
            function() {
                var t, e = rt.createElement("input"),
                    n = rt.createElement("div"),
                    r = rt.createElement("select"),
                    i = r.appendChild(rt.createElement("option"));
                (n = rt.createElement("div")).setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", t = n.getElementsByTagName("a")[0], e.setAttribute("type", "checkbox"), n.appendChild(e), (t = n.getElementsByTagName("a")[0]).style.cssText = "top:1px", dt.getSetAttribute = "t" !== n.className, dt.style = /top/.test(t.getAttribute("style")), dt.hrefNormalized = "/a" === t.getAttribute("href"), dt.checkOn = !!e.value, dt.optSelected = i.selected, dt.enctype = !!rt.createElement("form").enctype, r.disabled = !0, dt.optDisabled = !i.disabled, (e = rt.createElement("input")).setAttribute("value", ""), dt.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), dt.radioValue = "t" === e.value
            }();
        var Ne = /\r/g,
            je = /[\x20\t\r\n\f]+/g;
        ft.fn.extend({
            val: function(t) {
                var e, n, r, i = this[0];
                return arguments.length ? (r = ft.isFunction(t), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (null == (i = r ? t.call(this, n, ft(this).val()) : t) ? i = "" : "number" == typeof i ? i += "" : ft.isArray(i) && (i = ft.map(i, function(t) {
                        return null == t ? "" : t + ""
                    })), (e = ft.valHooks[this.type] || ft.valHooks[this.nodeName.toLowerCase()]) && "set" in e && e.set(this, i, "value") !== undefined || (this.value = i))
                })) : i ? (e = ft.valHooks[i.type] || ft.valHooks[i.nodeName.toLowerCase()]) && "get" in e && (n = e.get(i, "value")) !== undefined ? n : "string" == typeof(n = i.value) ? n.replace(Ne, "") : null == n ? "" : n : void 0
            }
        }), ft.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = ft.find.attr(t, "value");
                        return null != e ? e : ft.trim(ft.text(t)).replace(je, " ")
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, n, r = t.options, i = t.selectedIndex, o = "select-one" === t.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, u = i < 0 ? s : o ? i : 0; u < s; u++)
                            if (((n = r[u]).selected || u === i) && (dt.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ft.nodeName(n.parentNode, "optgroup"))) {
                                if (e = ft(n).val(), o) return e;
                                a.push(e)
                            } return a
                    },
                    set: function(t, e) {
                        for (var n, r, i = t.options, o = ft.makeArray(e), a = i.length; a--;)
                            if (r = i[a], ft.inArray(ft.valHooks.option.get(r), o) > -1) try {
                                r.selected = n = !0
                            } catch (s) {
                                r.scrollHeight
                            } else r.selected = !1;
                        return n || (t.selectedIndex = -1), i
                    }
                }
            }
        }), ft.each(["radio", "checkbox"], function() {
            ft.valHooks[this] = {
                set: function(t, e) {
                    if (ft.isArray(e)) return t.checked = ft.inArray(ft(t).val(), e) > -1
                }
            }, dt.checkOn || (ft.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var qe, Pe, He = ft.expr.attrHandle,
            Ie = /^(?:checked|selected)$/i,
            Me = dt.getSetAttribute,
            _e = dt.input;
        ft.fn.extend({
            attr: function(t, e) {
                return Wt(this, ft.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    ft.removeAttr(this, t)
                })
            }
        }), ft.extend({
            attr: function(t, e, n) {
                var r, i, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof t.getAttribute ? ft.prop(t, e, n) : (1 === o && ft.isXMLDoc(t) || (e = e.toLowerCase(), i = ft.attrHooks[e] || (ft.expr.match.bool.test(e) ? Pe : qe)), n !== undefined ? null === n ? void ft.removeAttr(t, e) : i && "set" in i && (r = i.set(t, n, e)) !== undefined ? r : (t.setAttribute(e, n + ""), n) : i && "get" in i && null !== (r = i.get(t, e)) ? r : null == (r = ft.find.attr(t, e)) ? undefined : r)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!dt.radioValue && "radio" === e && ft.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var n, r, i = 0,
                    o = e && e.match(Rt);
                if (o && 1 === t.nodeType)
                    for (; n = o[i++];) r = ft.propFix[n] || n, ft.expr.match.bool.test(n) ? _e && Me || !Ie.test(n) ? t[r] = !1 : t[ft.camelCase("default-" + n)] = t[r] = !1 : ft.attr(t, n, ""), t.removeAttribute(Me ? n : r)
            }
        }), Pe = {
            set: function(t, e, n) {
                return !1 === e ? ft.removeAttr(t, n) : _e && Me || !Ie.test(n) ? t.setAttribute(!Me && ft.propFix[n] || n, n) : t[ft.camelCase("default-" + n)] = t[n] = !0, n
            }
        }, ft.each(ft.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var n = He[e] || ft.find.attr;
            _e && Me || !Ie.test(e) ? He[e] = function(t, e, r) {
                var i, o;
                return r || (o = He[e], He[e] = i, i = null != n(t, e, r) ? e.toLowerCase() : null, He[e] = o), i
            } : He[e] = function(t, e, n) {
                if (!n) return t[ft.camelCase("default-" + e)] ? e.toLowerCase() : null
            }
        }), _e && Me || (ft.attrHooks.value = {
            set: function(t, e, n) {
                if (!ft.nodeName(t, "input")) return qe && qe.set(t, e, n);
                t.defaultValue = e
            }
        }), Me || (qe = {
            set: function(t, e, n) {
                var r = t.getAttributeNode(n);
                if (r || t.setAttributeNode(r = t.ownerDocument.createAttribute(n)), r.value = e += "", "value" === n || e === t.getAttribute(n)) return e
            }
        }, He.id = He.name = He.coords = function(t, e, n) {
            var r;
            if (!n) return (r = t.getAttributeNode(e)) && "" !== r.value ? r.value : null
        }, ft.valHooks.button = {
            get: function(t, e) {
                var n = t.getAttributeNode(e);
                if (n && n.specified) return n.value
            },
            set: qe.set
        }, ft.attrHooks.contenteditable = {
            set: function(t, e, n) {
                qe.set(t, "" !== e && e, n)
            }
        }, ft.each(["width", "height"], function(t, e) {
            ft.attrHooks[e] = {
                set: function(t, n) {
                    if ("" === n) return t.setAttribute(e, "auto"), n
                }
            }
        })), dt.style || (ft.attrHooks.style = {
            get: function(t) {
                return t.style.cssText || undefined
            },
            set: function(t, e) {
                return t.style.cssText = e + ""
            }
        });
        var Fe = /^(?:input|select|textarea|button|object)$/i,
            Be = /^(?:a|area)$/i;
        ft.fn.extend({
            prop: function(t, e) {
                return Wt(this, ft.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return t = ft.propFix[t] || t, this.each(function() {
                    try {
                        this[t] = undefined, delete this[t]
                    } catch (e) {}
                })
            }
        }), ft.extend({
            prop: function(t, e, n) {
                var r, i, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ft.isXMLDoc(t) || (e = ft.propFix[e] || e, i = ft.propHooks[e]), n !== undefined ? i && "set" in i && (r = i.set(t, n, e)) !== undefined ? r : t[e] = n : i && "get" in i && null !== (r = i.get(t, e)) ? r : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = ft.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : Fe.test(t.nodeName) || Be.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), dt.hrefNormalized || ft.each(["href", "src"], function(t, e) {
            ft.propHooks[e] = {
                get: function(t) {
                    return t.getAttribute(e, 4)
                }
            }
        }), dt.optSelected || (ft.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            },
            set: function(t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), ft.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ft.propFix[this.toLowerCase()] = this
        }), dt.enctype || (ft.propFix.enctype = "encoding");
        var Oe = /[\t\r\n\f]/g;
        ft.fn.extend({
            addClass: function(t) {
                var e, n, r, i, o, a, s, u = 0;
                if (ft.isFunction(t)) return this.each(function(e) {
                    ft(this).addClass(t.call(this, e, U(this)))
                });
                if ("string" == typeof t && t)
                    for (e = t.match(Rt) || []; n = this[u++];)
                        if (i = U(n), r = 1 === n.nodeType && (" " + i + " ").replace(Oe, " ")) {
                            for (a = 0; o = e[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                            i !== (s = ft.trim(r)) && ft.attr(n, "class", s)
                        } return this
            },
            removeClass: function(t) {
                var e, n, r, i, o, a, s, u = 0;
                if (ft.isFunction(t)) return this.each(function(e) {
                    ft(this).removeClass(t.call(this, e, U(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t)
                    for (e = t.match(Rt) || []; n = this[u++];)
                        if (i = U(n), r = 1 === n.nodeType && (" " + i + " ").replace(Oe, " ")) {
                            for (a = 0; o = e[a++];)
                                for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                            i !== (s = ft.trim(r)) && ft.attr(n, "class", s)
                        } return this
            },
            toggleClass: function(t, e) {
                var n = typeof t;
                return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : ft.isFunction(t) ? this.each(function(n) {
                    ft(this).toggleClass(t.call(this, n, U(this), e), e)
                }) : this.each(function() {
                    var e, r, i, o;
                    if ("string" === n)
                        for (r = 0, i = ft(this), o = t.match(Rt) || []; e = o[r++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                    else t !== undefined && "boolean" !== n || ((e = U(this)) && ft._data(this, "__className__", e), ft.attr(this, "class", e || !1 === t ? "" : ft._data(this, "__className__") || ""))
                })
            },
            hasClass: function(t) {
                var e, n, r = 0;
                for (e = " " + t + " "; n = this[r++];)
                    if (1 === n.nodeType && (" " + U(n) + " ").replace(Oe, " ").indexOf(e) > -1) return !0;
                return !1
            }
        }), ft.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            ft.fn[e] = function(t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), ft.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        });
        var We = t.location,
            $e = ft.now(),
            Ue = /\?/,
            ze = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        ft.parseJSON = function(e) {
            if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
            var n, r = null,
                i = ft.trim(e + "");
            return i && !ft.trim(i.replace(ze, function(t, e, i, o) {
                return n && e && (r = 0), 0 === r ? t : (n = i || e, r += !o - !i, "")
            })) ? Function("return " + i)() : ft.error("Invalid JSON: " + e)
        }, ft.parseXML = function(e) {
            var n;
            if (!e || "string" != typeof e) return null;
            try {
                t.DOMParser ? n = (new t.DOMParser).parseFromString(e, "text/xml") : ((n = new t.ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(e))
            } catch (r) {
                n = undefined
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ft.error("Invalid XML: " + e), n
        };
        var Ve = /#.*$/,
            Xe = /([?&])_=[^&]*/,
            Je = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Ge = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Ke = /^(?:GET|HEAD)$/,
            Qe = /^\/\//,
            Ye = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Ze = {},
            tn = {},
            en = "*/".concat("*"),
            nn = We.href,
            rn = Ye.exec(nn.toLowerCase()) || [];
        ft.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: nn,
                type: "GET",
                isLocal: Ge.test(rn[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": en,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ft.parseJSON,
                    "text xml": ft.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? X(X(t, ft.ajaxSettings), e) : X(ft.ajaxSettings, t)
            },
            ajaxPrefilter: z(Ze),
            ajaxTransport: z(tn),
            ajax: function(e, n) {
                function r(e, n, r, i) {
                    var o, d, v, b, x, E = n;
                    2 !== w && (w = 2, u && t.clearTimeout(u), c = undefined, s = i || "", S.readyState = e > 0 ? 4 : 0, o = e >= 200 && e < 300 || 304 === e, r && (b = J(p, S, r)), b = G(p, b, S, o), o ? (p.ifModified && ((x = S.getResponseHeader("Last-Modified")) && (ft.lastModified[a] = x), (x = S.getResponseHeader("etag")) && (ft.etag[a] = x)), 204 === e || "HEAD" === p.type ? E = "nocontent" : 304 === e ? E = "notmodified" : (E = b.state, d = b.data, o = !(v = b.error))) : (v = E, !e && E || (E = "error", e < 0 && (e = 0))), S.status = e, S.statusText = (n || E) + "", o ? m.resolveWith(f, [d, E, S]) : m.rejectWith(f, [S, E, v]), S.statusCode(g), g = undefined, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [S, p, o ? d : v]), y.fireWith(f, [S, E]), l && (h.trigger("ajaxComplete", [S, p]), --ft.active || ft.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (n = e, e = undefined), n = n || {};
                var i, o, a, s, u, l, c, d, p = ft.ajaxSetup({}, n),
                    f = p.context || p,
                    h = p.context && (f.nodeType || f.jquery) ? ft(f) : ft.event,
                    m = ft.Deferred(),
                    y = ft.Callbacks("once memory"),
                    g = p.statusCode || {},
                    v = {},
                    b = {},
                    w = 0,
                    x = "canceled",
                    S = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === w) {
                                if (!d)
                                    for (d = {}; e = Je.exec(s);) d[e[1].toLowerCase()] = e[2];
                                e = d[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === w ? s : null
                        },
                        setRequestHeader: function(t, e) {
                            var n = t.toLowerCase();
                            return w || (t = b[n] = b[n] || t, v[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return w || (p.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (w < 2)
                                    for (e in t) g[e] = [g[e], t[e]];
                                else S.always(t[S.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || x;
                            return c && c.abort(e), r(0, e), this
                        }
                    };
                if (m.promise(S).complete = y.add, S.success = S.done, S.error = S.fail, p.url = ((e || p.url || nn) + "").replace(Ve, "").replace(Qe, rn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ft.trim(p.dataType || "*").toLowerCase().match(Rt) || [""], null == p.crossDomain && (i = Ye.exec(p.url.toLowerCase()), p.crossDomain = !(!i || i[1] === rn[1] && i[2] === rn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (rn[3] || ("http:" === rn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ft.param(p.data, p.traditional)), V(Ze, p, n, S), 2 === w) return S;
                for (o in (l = ft.event && p.global) && 0 == ft.active++ && ft.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Ke.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (Ue.test(a) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = Xe.test(a) ? a.replace(Xe, "$1_=" + $e++) : a + (Ue.test(a) ? "&" : "?") + "_=" + $e++)), p.ifModified && (ft.lastModified[a] && S.setRequestHeader("If-Modified-Since", ft.lastModified[a]), ft.etag[a] && S.setRequestHeader("If-None-Match", ft.etag[a])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && S.setRequestHeader("Content-Type", p.contentType), S.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + en + "; q=0.01" : "") : p.accepts["*"]), p.headers) S.setRequestHeader(o, p.headers[o]);
                if (p.beforeSend && (!1 === p.beforeSend.call(f, S, p) || 2 === w)) return S.abort();
                for (o in x = "abort", {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) S[o](p[o]);
                if (c = V(tn, p, n, S)) {
                    if (S.readyState = 1, l && h.trigger("ajaxSend", [S, p]), 2 === w) return S;
                    p.async && p.timeout > 0 && (u = t.setTimeout(function() {
                        S.abort("timeout")
                    }, p.timeout));
                    try {
                        w = 1, c.send(v, r)
                    } catch (E) {
                        if (!(w < 2)) throw E;
                        r(-1, E)
                    }
                } else r(-1, "No Transport");
                return S
            },
            getJSON: function(t, e, n) {
                return ft.get(t, e, n, "json")
            },
            getScript: function(t, e) {
                return ft.get(t, undefined, e, "script")
            }
        }), ft.each(["get", "post"], function(t, e) {
            ft[e] = function(t, n, r, i) {
                return ft.isFunction(n) && (i = i || r, r = n, n = undefined), ft.ajax(ft.extend({
                    url: t,
                    type: e,
                    dataType: i,
                    data: n,
                    success: r
                }, ft.isPlainObject(t) && t))
            }
        }), ft._evalUrl = function(t) {
            return ft.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }, ft.fn.extend({
            wrapAll: function(t) {
                if (ft.isFunction(t)) return this.each(function(e) {
                    ft(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = ft(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                return ft.isFunction(t) ? this.each(function(e) {
                    ft(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = ft(this),
                        n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = ft.isFunction(t);
                return this.each(function(n) {
                    ft(this).wrapAll(e ? t.call(this, n) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ft.nodeName(this, "body") || ft(this).replaceWith(this.childNodes)
                }).end()
            }
        }), ft.expr.filters.hidden = function(t) {
            return dt.reliableHiddenOffsets() ? t.offsetWidth <= 0 && t.offsetHeight <= 0 && !t.getClientRects().length : Q(t)
        }, ft.expr.filters.visible = function(t) {
            return !ft.expr.filters.hidden(t)
        };
        var on = /%20/g,
            an = /\[\]$/,
            sn = /\r?\n/g,
            un = /^(?:submit|button|image|reset|file)$/i,
            ln = /^(?:input|select|textarea|keygen)/i;
        ft.param = function(t, e) {
            var n, r = [],
                i = function(t, e) {
                    e = ft.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (e === undefined && (e = ft.ajaxSettings && ft.ajaxSettings.traditional), ft.isArray(t) || t.jquery && !ft.isPlainObject(t)) ft.each(t, function() {
                i(this.name, this.value)
            });
            else
                for (n in t) Y(n, t[n], e, i);
            return r.join("&").replace(on, "+")
        }, ft.fn.extend({
            serialize: function() {
                return ft.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = ft.prop(this, "elements");
                    return t ? ft.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !ft(this).is(":disabled") && ln.test(this.nodeName) && !un.test(t) && (this.checked || !$t.test(t))
                }).map(function(t, e) {
                    var n = ft(this).val();
                    return null == n ? null : ft.isArray(n) ? ft.map(n, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(sn, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: n.replace(sn, "\r\n")
                    }
                }).get()
            }
        }), ft.ajaxSettings.xhr = t.ActiveXObject !== undefined ? function() {
            return this.isLocal ? tt() : rt.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || tt()
        } : Z;
        var cn = 0,
            dn = {},
            pn = ft.ajaxSettings.xhr();
        t.attachEvent && t.attachEvent("onunload", function() {
            for (var t in dn) dn[t](undefined, !0)
        }), dt.cors = !!pn && "withCredentials" in pn, (pn = dt.ajax = !!pn) && ft.ajaxTransport(function(e) {
            var n;
            if (!e.crossDomain || dt.cors) return {
                send: function(r, i) {
                    var o, a = e.xhr(),
                        s = ++cn;
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (o in e.xhrFields) a[o] = e.xhrFields[o];
                    for (o in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r) r[o] !== undefined && a.setRequestHeader(o, r[o] + "");
                    a.send(e.hasContent && e.data || null), n = function(t, r) {
                        var o, u, l;
                        if (n && (r || 4 === a.readyState))
                            if (delete dn[s], n = undefined, a.onreadystatechange = ft.noop, r) 4 !== a.readyState && a.abort();
                            else {
                                l = {}, o = a.status, "string" == typeof a.responseText && (l.text = a.responseText);
                                try {
                                    u = a.statusText
                                } catch (c) {
                                    u = ""
                                }
                                o || !e.isLocal || e.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404
                            } l && i(o, u, l, a.getAllResponseHeaders())
                    }, e.async ? 4 === a.readyState ? t.setTimeout(n) : a.onreadystatechange = dn[s] = n : n()
                },
                abort: function() {
                    n && n(undefined, !0)
                }
            }
        }), ft.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return ft.globalEval(t), t
                }
            }
        }), ft.ajaxPrefilter("script", function(t) {
            t.cache === undefined && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), ft.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, n = rt.head || ft("head")[0] || rt.documentElement;
                return {
                    send: function(r, i) {
                        (e = rt.createElement("script")).async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, n) {
                            (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || i(200, "success"))
                        }, n.insertBefore(e, n.firstChild)
                    },
                    abort: function() {
                        e && e.onload(undefined, !0)
                    }
                }
            }
        });
        var fn = [],
            hn = /(=)\?(?=&|$)|\?\?/;
        ft.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = fn.pop() || ft.expando + "_" + $e++;
                return this[t] = !0, t
            }
        }), ft.ajaxPrefilter("json jsonp", function(e, n, r) {
            var i, o, a, s = !1 !== e.jsonp && (hn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = ft.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(hn, "$1" + i) : !1 !== e.jsonp && (e.url += (Ue.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                return a || ft.error(i + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = t[i], t[i] = function() {
                a = arguments
            }, r.always(function() {
                o === undefined ? ft(t).removeProp(i) : t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, fn.push(i)), a && ft.isFunction(o) && o(a[0]), a = o = undefined
            }), "script"
        }), ft.parseHTML = function(t, e, n) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (n = e, e = !1), e = e || rt;
            var r = St.exec(t),
                i = !n && [];
            return r ? [e.createElement(r[1])] : (r = g([t], e, i), i && i.length && ft(i).remove(), ft.merge([], r.childNodes))
        };
        var mn = ft.fn.load;
        ft.fn.load = function(t, e, n) {
            if ("string" != typeof t && mn) return mn.apply(this, arguments);
            var r, i, o, a = this,
                s = t.indexOf(" ");
            return s > -1 && (r = ft.trim(t.slice(s, t.length)), t = t.slice(0, s)), ft.isFunction(e) ? (n = e, e = undefined) : e && "object" == typeof e && (i = "POST"), a.length > 0 && ft.ajax({
                url: t,
                type: i || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                o = arguments, a.html(r ? ft("<div>").append(ft.parseHTML(t)).find(r) : t)
            }).always(n && function(t, e) {
                a.each(function() {
                    n.apply(this, o || [t.responseText, e, t])
                })
            }), this
        }, ft.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            ft.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), ft.expr.filters.animated = function(t) {
            return ft.grep(ft.timers, function(e) {
                return t === e.elem
            }).length
        }, ft.offset = {
            setOffset: function(t, e, n) {
                var r, i, o, a, s, u, l = ft.css(t, "position"),
                    c = ft(t),
                    d = {};
                "static" === l && (t.style.position = "relative"), s = c.offset(), o = ft.css(t, "top"), u = ft.css(t, "left"), ("absolute" === l || "fixed" === l) && ft.inArray("auto", [o, u]) > -1 ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), ft.isFunction(e) && (e = e.call(t, n, ft.extend({}, s))), null != e.top && (d.top = e.top - s.top + a), null != e.left && (d.left = e.left - s.left + i), "using" in e ? e.using.call(t, d) : c.css(d)
            }
        }, ft.fn.extend({
            offset: function(t) {
                if (arguments.length) return t === undefined ? this : this.each(function(e) {
                    ft.offset.setOffset(this, t, e)
                });
                var e, n, r = {
                        top: 0,
                        left: 0
                    },
                    i = this[0],
                    o = i && i.ownerDocument;
                return o ? (e = o.documentElement, ft.contains(e, i) ? ("undefined" != typeof i.getBoundingClientRect && (r = i.getBoundingClientRect()), n = et(o), {
                    top: r.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: r.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }) : r) : void 0
            },
            position: function() {
                if (this[0]) {
                    var t, e, n = {
                            top: 0,
                            left: 0
                        },
                        r = this[0];
                    return "fixed" === ft.css(r, "position") ? e = r.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ft.nodeName(t[0], "html") || (n = t.offset()), n.top += ft.css(t[0], "borderTopWidth", !0), n.left += ft.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - n.top - ft.css(r, "marginTop", !0),
                        left: e.left - n.left - ft.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && !ft.nodeName(t, "html") && "static" === ft.css(t, "position");) t = t.offsetParent;
                    return t || me
                })
            }
        }), ft.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var n = /Y/.test(e);
            ft.fn[t] = function(r) {
                return Wt(this, function(t, r, i) {
                    var o = et(t);
                    if (i === undefined) return o ? e in o ? o[e] : o.document.documentElement[r] : t[r];
                    o ? o.scrollTo(n ? ft(o).scrollLeft() : i, n ? i : ft(o).scrollTop()) : t[r] = i
                }, t, r, arguments.length, null)
            }
        }), ft.each(["top", "left"], function(t, e) {
            ft.cssHooks[e] = N(dt.pixelPosition, function(t, n) {
                if (n) return n = ge(t, e), fe.test(n) ? ft(t).position()[e] + "px" : n
            })
        }), ft.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            ft.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(n, r) {
                ft.fn[r] = function(r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r),
                        a = n || (!0 === r || !0 === i ? "margin" : "border");
                    return Wt(this, function(e, n, r) {
                        var i;
                        return ft.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : r === undefined ? ft.css(e, n, a) : ft.style(e, n, r, a)
                    }, e, o ? r : undefined, o, null)
                }
            })
        }), ft.fn.extend({
            bind: function(t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, n, r) {
                return this.on(e, t, n, r)
            },
            undelegate: function(t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            }
        }), ft.fn.size = function() {
            return this.length
        }, ft.fn.andSelf = ft.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ft
        });
        var yn = t.jQuery,
            gn = t.$;
        return ft.noConflict = function(e) {
            return t.$ === ft && (t.$ = gn), e && t.jQuery === ft && (t.jQuery = yn), ft
        }, e || (t.jQuery = t.$ = ft), ft
    }),
    function(t, e) {
        "use strict";
        var n;
        t.rails !== e && t.error("jquery-ujs has already been loaded!");
        var r = t(document);
        t.rails = n = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
            fileInputSelector: "input[name][type=file]:not([disabled])",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            csrfToken: function() {
                return t("meta[name=csrf-token]").attr("content")
            },
            csrfParam: function() {
                return t("meta[name=csrf-param]").attr("content")
            },
            CSRFProtection: function(t) {
                var e = n.csrfToken();
                e && t.setRequestHeader("X-CSRF-Token", e)
            },
            refreshCSRFTokens: function() {
                t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
            },
            fire: function(e, n, r) {
                var i = t.Event(n);
                return e.trigger(i, r), !1 !== i.result
            },
            confirm: function(t) {
                return confirm(t)
            },
            ajax: function(e) {
                return t.ajax(e)
            },
            href: function(t) {
                return t[0].href
            },
            isRemote: function(t) {
                return t.data("remote") !== e && !1 !== t.data("remote")
            },
            handleRemote: function(r) {
                var i, o, a, s, u, l;
                if (n.fire(r, "ajax:before")) {
                    if (s = r.data("with-credentials") || null, u = r.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, r.is("form")) {
                        i = r.data("ujs:submit-button-formmethod") || r.attr("method"), o = r.data("ujs:submit-button-formaction") || r.attr("action"), a = t(r[0]).serializeArray();
                        var c = r.data("ujs:submit-button");
                        c && (a.push(c), r.data("ujs:submit-button", null)), r.data("ujs:submit-button-formmethod", null), r.data("ujs:submit-button-formaction", null)
                    } else r.is(n.inputChangeSelector) ? (i = r.data("method"), o = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (i = r.data("method") || "get", o = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : (i = r.data("method"), o = n.href(r), a = r.data("params") || null);
                    return l = {
                        type: i || "GET",
                        data: a,
                        dataType: u,
                        beforeSend: function(t, i) {
                            if (i.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), !n.fire(r, "ajax:beforeSend", [t, i])) return !1;
                            r.trigger("ajax:send", t)
                        },
                        success: function(t, e, n) {
                            r.trigger("ajax:success", [t, e, n])
                        },
                        complete: function(t, e) {
                            r.trigger("ajax:complete", [t, e])
                        },
                        error: function(t, e, n) {
                            r.trigger("ajax:error", [t, e, n])
                        },
                        crossDomain: n.isCrossDomain(o)
                    }, s && (l.xhrFields = {
                        withCredentials: s
                    }), o && (l.url = o), n.ajax(l)
                }
                return !1
            },
            isCrossDomain: function(t) {
                var e = document.createElement("a");
                e.href = location.href;
                var n = document.createElement("a");
                try {
                    return n.href = t, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
                } catch (r) {
                    return !0
                }
            },
            handleMethod: function(r) {
                var i = n.href(r),
                    o = r.data("method"),
                    a = r.attr("target"),
                    s = n.csrfToken(),
                    u = n.csrfParam(),
                    l = t('<form method="post" action="' + i + '"></form>'),
                    c = '<input name="_method" value="' + o + '" type="hidden" />';
                u === e || s === e || n.isCrossDomain(i) || (c += '<input name="' + u + '" value="' + s + '" type="hidden" />'), a && l.attr("target", a), l.hide().append(c).appendTo("body"), l.submit()
            },
            formElements: function(e, n) {
                return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
            },
            disableFormElements: function(e) {
                n.formElements(e, n.disableSelector).each(function() {
                    n.disableFormElement(t(this))
                })
            },
            disableFormElement: function(t) {
                var n, r;
                n = t.is("button") ? "html" : "val", (r = t.data("disable-with")) !== e && (t.data("ujs:enable-with", t[n]()), t[n](r)), t.prop("disabled", !0), t.data("ujs:disabled", !0)
            },
            enableFormElements: function(e) {
                n.formElements(e, n.enableSelector).each(function() {
                    n.enableFormElement(t(this))
                })
            },
            enableFormElement: function(t) {
                var n = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") !== e && (t[n](t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.prop("disabled", !1), t.removeData("ujs:disabled")
            },
            allowAction: function(t) {
                var e, r = t.data("confirm"),
                    i = !1;
                if (!r) return !0;
                if (n.fire(t, "confirm")) {
                    try {
                        i = n.confirm(r)
                    } catch (o) {
                        (console.error || console.log).call(console, o.stack || o)
                    }
                    e = n.fire(t, "confirm:complete", [i])
                }
                return i && e
            },
            blankInputs: function(e, n, r) {
                var i, o, a, s = t(),
                    u = n || "input,textarea",
                    l = e.find(u),
                    c = {};
                return l.each(function() {
                    (i = t(this)).is("input[type=radio]") ? (a = i.attr("name"), c[a] || (0 === e.find('input[type=radio]:checked[name="' + a + '"]').length && (o = e.find('input[type=radio][name="' + a + '"]'), s = s.add(o)), c[a] = a)) : (i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : !!i.val()) === r && (s = s.add(i))
                }), !!s.length && s
            },
            nonBlankInputs: function(t, e) {
                return n.blankInputs(t, e, !0)
            },
            stopEverything: function(e) {
                return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function(t) {
                var r = t.data("disable-with");
                r !== e && (t.data("ujs:enable-with", t.html()), t.html(r)), t.bind("click.railsDisable", function(t) {
                    return n.stopEverything(t)
                }), t.data("ujs:disabled", !0)
            },
            enableElement: function(t) {
                t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable"), t.removeData("ujs:disabled")
            }
        }, n.fire(r, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, r) {
            t.crossDomain || n.CSRFProtection(r)
        }), t(window).on("pageshow.rails", function() {
            t(t.rails.enableSelector).each(function() {
                var e = t(this);
                e.data("ujs:disabled") && t.rails.enableFormElement(e)
            }), t(t.rails.linkDisableSelector).each(function() {
                var e = t(this);
                e.data("ujs:disabled") && t.rails.enableElement(e)
            })
        }), r.on("ajax:complete", n.linkDisableSelector, function() {
            n.enableElement(t(this))
        }), r.on("ajax:complete", n.buttonDisableSelector, function() {
            n.enableFormElement(t(this))
        }), r.on("click.rails", n.linkClickSelector, function(e) {
            var r = t(this),
                i = r.data("method"),
                o = r.data("params"),
                a = e.metaKey || e.ctrlKey;
            if (!n.allowAction(r)) return n.stopEverything(e);
            if (!a && r.is(n.linkDisableSelector) && n.disableElement(r), n.isRemote(r)) {
                if (a && (!i || "GET" === i) && !o) return !0;
                var s = n.handleRemote(r);
                return !1 === s ? n.enableElement(r) : s.fail(function() {
                    n.enableElement(r)
                }), !1
            }
            return i ? (n.handleMethod(r), !1) : void 0
        }), r.on("click.rails", n.buttonClickSelector, function(e) {
            var r = t(this);
            if (!n.allowAction(r) || !n.isRemote(r)) return n.stopEverything(e);
            r.is(n.buttonDisableSelector) && n.disableFormElement(r);
            var i = n.handleRemote(r);
            return !1 === i ? n.enableFormElement(r) : i.fail(function() {
                n.enableFormElement(r)
            }), !1
        }), r.on("change.rails", n.inputChangeSelector, function(e) {
            var r = t(this);
            return n.allowAction(r) && n.isRemote(r) ? (n.handleRemote(r), !1) : n.stopEverything(e)
        }), r.on("submit.rails", n.formSubmitSelector, function(r) {
            var i, o, a = t(this),
                s = n.isRemote(a);
            if (!n.allowAction(a)) return n.stopEverything(r);
            if (a.attr("novalidate") === e)
                if (a.data("ujs:formnovalidate-button") === e) {
                    if ((i = n.blankInputs(a, n.requiredInputSelector, !1)) && n.fire(a, "ajax:aborted:required", [i])) return n.stopEverything(r)
                } else a.data("ujs:formnovalidate-button", e);
            if (s) {
                if (o = n.nonBlankInputs(a, n.fileInputSelector)) {
                    setTimeout(function() {
                        n.disableFormElements(a)
                    }, 13);
                    var u = n.fire(a, "ajax:aborted:file", [o]);
                    return u || setTimeout(function() {
                        n.enableFormElements(a)
                    }, 13), u
                }
                return n.handleRemote(a), !1
            }
            setTimeout(function() {
                n.disableFormElements(a)
            }, 13)
        }), r.on("click.rails", n.formInputClickSelector, function(e) {
            var r = t(this);
            if (!n.allowAction(r)) return n.stopEverything(e);
            var i = r.attr("name"),
                o = i ? {
                    name: i,
                    value: r.val()
                } : null,
                a = r.closest("form");
            0 === a.length && (a = t("#" + r.attr("form"))), a.data("ujs:submit-button", o), a.data("ujs:formnovalidate-button", r.attr("formnovalidate")), a.data("ujs:submit-button-formaction", r.attr("formaction")), a.data("ujs:submit-button-formmethod", r.attr("formmethod"))
        }), r.on("ajax:send.rails", n.formSubmitSelector, function(e) {
            this === e.target && n.disableFormElements(t(this))
        }), r.on("ajax:complete.rails", n.formSubmitSelector, function(e) {
            this === e.target && n.enableFormElements(t(this))
        }), t(function() {
            n.refreshCSRFTokens()
        }))
    }(jQuery),
    /*
    Turbolinks 5.2.0
    Copyright © 2018 Basecamp, LLC
     */
    function() {
        var t = this;
        (function() {
            (function() {
                this.Turbolinks = {
                    supported: null != window.history.pushState && null != window.requestAnimationFrame && null != window.addEventListener,
                    visit: function(t, n) {
                        return e.controller.visit(t, n)
                    },
                    clearCache: function() {
                        return e.controller.clearCache()
                    },
                    setProgressBarDelay: function(t) {
                        return e.controller.setProgressBarDelay(t)
                    }
                }
            }).call(this)
        }).call(t);
        var e = t.Turbolinks;
        (function() {
            (function() {
                var t, n, r, i = [].slice;
                e.copyObject = function(t) {
                    var e, n, r;
                    for (e in n = {}, t) r = t[e], n[e] = r;
                    return n
                }, e.closest = function(e, n) {
                    return t.call(e, n)
                }, t = function() {
                    var t;
                    return null != (t = document.documentElement.closest) ? t : function(t) {
                        var e;
                        for (e = this; e;) {
                            if (e.nodeType === Node.ELEMENT_NODE && n.call(e, t)) return e;
                            e = e.parentNode
                        }
                    }
                }(), e.defer = function(t) {
                    return setTimeout(t, 1)
                }, e.throttle = function(t) {
                    var e;
                    return e = null,
                        function() {
                            var n, r;
                            return n = 1 <= arguments.length ? i.call(arguments, 0) : [], null != e ? e : e = requestAnimationFrame((r = this, function() {
                                return e = null, t.apply(r, n)
                            }))
                        }
                }, e.dispatch = function(t, e) {
                    var n, i, o, a, s, u;
                    return u = (s = null != e ? e : {}).target, n = s.cancelable, i = s.data, (o = document.createEvent("Events")).initEvent(t, !0, !0 === n), o.data = null != i ? i : {}, o.cancelable && !r && (a = o.preventDefault, o.preventDefault = function() {
                        return this.defaultPrevented || Object.defineProperty(this, "defaultPrevented", {
                            get: function() {
                                return !0
                            }
                        }), a.call(this)
                    }), (null != u ? u : document).dispatchEvent(o), o
                }, r = function() {
                    var t;
                    return (t = document.createEvent("Events")).initEvent("test", !0, !0), t.preventDefault(), t.defaultPrevented
                }(), e.match = function(t, e) {
                    return n.call(t, e)
                }, n = function() {
                    var t, e, n, r;
                    return null != (e = null != (n = null != (r = (t = document.documentElement).matchesSelector) ? r : t.webkitMatchesSelector) ? n : t.msMatchesSelector) ? e : t.mozMatchesSelector
                }(), e.uuid = function() {
                    var t, e, n;
                    for (n = "", t = e = 1; 36 >= e; t = ++e) n += 9 === t || 14 === t || 19 === t || 24 === t ? "-" : 15 === t ? "4" : 20 === t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
                    return n
                }
            }).call(this),
                function() {
                    e.Location = function() {
                        function t(t) {
                            var e, n;
                            null == t && (t = ""), (n = document.createElement("a")).href = t.toString(), this.absoluteURL = n.href, 2 > (e = n.hash.length) ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e), this.anchor = n.hash.slice(1))
                        }
                        var e, n, r, i;
                        return t.wrap = function(t) {
                            return t instanceof this ? t : new this(t)
                        }, t.prototype.getOrigin = function() {
                            return this.absoluteURL.split("/", 3).join("/")
                        }, t.prototype.getPath = function() {
                            var t, e;
                            return null != (t = null != (e = this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e[1] : void 0) ? t : "/"
                        }, t.prototype.getPathComponents = function() {
                            return this.getPath().split("/").slice(1)
                        }, t.prototype.getLastPathComponent = function() {
                            return this.getPathComponents().slice(-1)[0]
                        }, t.prototype.getExtension = function() {
                            var t, e;
                            return null != (t = null != (e = this.getLastPathComponent().match(/\.[^.]*$/)) ? e[0] : void 0) ? t : ""
                        }, t.prototype.isHTML = function() {
                            return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)
                        }, t.prototype.isPrefixedBy = function(t) {
                            var e;
                            return e = n(t), this.isEqualTo(t) || i(this.absoluteURL, e)
                        }, t.prototype.isEqualTo = function(t) {
                            return this.absoluteURL === (null != t ? t.absoluteURL : void 0)
                        }, t.prototype.toCacheKey = function() {
                            return this.requestURL
                        }, t.prototype.toJSON = function() {
                            return this.absoluteURL
                        }, t.prototype.toString = function() {
                            return this.absoluteURL
                        }, t.prototype.valueOf = function() {
                            return this.absoluteURL
                        }, n = function(t) {
                            return e(t.getOrigin() + t.getPath())
                        }, e = function(t) {
                            return r(t, "/") ? t : t + "/"
                        }, i = function(t, e) {
                            return t.slice(0, e.length) === e
                        }, r = function(t, e) {
                            return t.slice(-e.length) === e
                        }, t
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.HttpRequest = function() {
                        function n(n, r, i) {
                            this.delegate = n, this.requestCanceled = t(this.requestCanceled, this), this.requestTimedOut = t(this.requestTimedOut, this), this.requestFailed = t(this.requestFailed, this), this.requestLoaded = t(this.requestLoaded, this), this.requestProgressed = t(this.requestProgressed, this), this.url = e.Location.wrap(r).requestURL, this.referrer = e.Location.wrap(i).absoluteURL, this.createXHR()
                        }
                        return n.NETWORK_FAILURE = 0, n.TIMEOUT_FAILURE = -1, n.timeout = 60, n.prototype.send = function() {
                            var t;
                            return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = !0, "function" == typeof(t = this.delegate).requestStarted ? t.requestStarted() : void 0) : void 0
                        }, n.prototype.cancel = function() {
                            return this.xhr && this.sent ? this.xhr.abort() : void 0
                        }, n.prototype.requestProgressed = function(t) {
                            return t.lengthComputable ? this.setProgress(t.loaded / t.total) : void 0
                        }, n.prototype.requestLoaded = function() {
                            return this.endRequest((t = this, function() {
                                var e;
                                return 200 <= (e = t.xhr.status) && 300 > e ? t.delegate.requestCompletedWithResponse(t.xhr.responseText, t.xhr.getResponseHeader("Turbolinks-Location")) : (t.failed = !0, t.delegate.requestFailedWithStatusCode(t.xhr.status, t.xhr.responseText))
                            }));
                            var t
                        }, n.prototype.requestFailed = function() {
                            return this.endRequest((t = this, function() {
                                return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)
                            }));
                            var t
                        }, n.prototype.requestTimedOut = function() {
                            return this.endRequest((t = this, function() {
                                return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)
                            }));
                            var t
                        }, n.prototype.requestCanceled = function() {
                            return this.endRequest()
                        }, n.prototype.notifyApplicationBeforeRequestStart = function() {
                            return e.dispatch("turbolinks:request-start", {
                                data: {
                                    url: this.url,
                                    xhr: this.xhr
                                }
                            })
                        }, n.prototype.notifyApplicationAfterRequestEnd = function() {
                            return e.dispatch("turbolinks:request-end", {
                                data: {
                                    url: this.url,
                                    xhr: this.xhr
                                }
                            })
                        }, n.prototype.createXHR = function() {
                            return this.xhr = new XMLHttpRequest, this.xhr.open("GET", this.url, !0), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled
                        }, n.prototype.endRequest = function(t) {
                            return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t && t.call(this), this.destroy()) : void 0
                        }, n.prototype.setProgress = function(t) {
                            var e;
                            return this.progress = t, "function" == typeof(e = this.delegate).requestProgressed ? e.requestProgressed(this.progress) : void 0
                        }, n.prototype.destroy = function() {
                            var t;
                            return this.setProgress(1), "function" == typeof(t = this.delegate).requestFinished && t.requestFinished(), this.delegate = null, this.xhr = null
                        }, n
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.ProgressBar = function() {
                        function e() {
                            this.trickle = t(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement()
                        }
                        var n;
                        return n = 300, e.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + n + "ms ease-out, opacity " + n / 2 + "ms " + n / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", e.prototype.show = function() {
                            return this.visible ? void 0 : (this.visible = !0, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling())
                        }, e.prototype.hide = function() {
                            return this.visible && !this.hiding ? (this.hiding = !0, this.fadeProgressElement((t = this, function() {
                                return t.uninstallProgressElement(), t.stopTrickling(), t.visible = !1, t.hiding = !1
                            }))) : void 0;
                            var t
                        }, e.prototype.setValue = function(t) {
                            return this.value = t, this.refresh()
                        }, e.prototype.installStylesheetElement = function() {
                            return document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
                        }, e.prototype.installProgressElement = function() {
                            return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
                        }, e.prototype.fadeProgressElement = function(t) {
                            return this.progressElement.style.opacity = 0, setTimeout(t, 1.5 * n)
                        }, e.prototype.uninstallProgressElement = function() {
                            return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0
                        }, e.prototype.startTrickling = function() {
                            return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, n)
                        }, e.prototype.stopTrickling = function() {
                            return clearInterval(this.trickleInterval), this.trickleInterval = null
                        }, e.prototype.trickle = function() {
                            return this.setValue(this.value + Math.random() / 100)
                        }, e.prototype.refresh = function() {
                            return requestAnimationFrame((t = this, function() {
                                return t.progressElement.style.width = 10 + 90 * t.value + "%"
                            }));
                            var t
                        }, e.prototype.createStylesheetElement = function() {
                            var t;
                            return (t = document.createElement("style")).type = "text/css", t.textContent = this.constructor.defaultCSS, t
                        }, e.prototype.createProgressElement = function() {
                            var t;
                            return (t = document.createElement("div")).className = "turbolinks-progress-bar", t
                        }, e
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.BrowserAdapter = function() {
                        function n(n) {
                            this.controller = n, this.showProgressBar = t(this.showProgressBar, this), this.progressBar = new e.ProgressBar
                        }
                        var r, i, o;
                        return o = e.HttpRequest, r = o.NETWORK_FAILURE, i = o.TIMEOUT_FAILURE, n.prototype.visitProposedToLocationWithAction = function(t, e) {
                            return this.controller.startVisitToLocationWithAction(t, e)
                        }, n.prototype.visitStarted = function(t) {
                            return t.issueRequest(), t.changeHistory(), t.loadCachedSnapshot()
                        }, n.prototype.visitRequestStarted = function(t) {
                            return this.progressBar.setValue(0), t.hasCachedSnapshot() || "restore" !== t.action ? this.showProgressBarAfterDelay() : this.showProgressBar()
                        }, n.prototype.visitRequestProgressed = function(t) {
                            return this.progressBar.setValue(t.progress)
                        }, n.prototype.visitRequestCompleted = function(t) {
                            return t.loadResponse()
                        }, n.prototype.visitRequestFailedWithStatusCode = function(t, e) {
                            switch (e) {
                                case r:
                                case i:
                                    return this.reload();
                                default:
                                    return t.loadResponse()
                            }
                        }, n.prototype.visitRequestFinished = function() {
                            return this.hideProgressBar()
                        }, n.prototype.visitCompleted = function(t) {
                            return t.followRedirect()
                        }, n.prototype.pageInvalidated = function() {
                            return this.reload()
                        }, n.prototype.showProgressBarAfterDelay = function() {
                            return this.progressBarTimeout = setTimeout(this.showProgressBar, this.controller.progressBarDelay)
                        }, n.prototype.showProgressBar = function() {
                            return this.progressBar.show()
                        }, n.prototype.hideProgressBar = function() {
                            return this.progressBar.hide(), clearTimeout(this.progressBarTimeout)
                        }, n.prototype.reload = function() {
                            return window.location.reload()
                        }, n
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.History = function() {
                        function n(e) {
                            this.delegate = e, this.onPageLoad = t(this.onPageLoad, this), this.onPopState = t(this.onPopState, this)
                        }
                        return n.prototype.start = function() {
                            return this.started ? void 0 : (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.started = !0)
                        }, n.prototype.stop = function() {
                            return this.started ? (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1) : void 0
                        }, n.prototype.push = function(t, n) {
                            return t = e.Location.wrap(t), this.update("push", t, n)
                        }, n.prototype.replace = function(t, n) {
                            return t = e.Location.wrap(t), this.update("replace", t, n)
                        }, n.prototype.onPopState = function(t) {
                            var n, r, i, o;
                            return this.shouldHandlePopState() && (o = null != (r = t.state) ? r.turbolinks : void 0) ? (n = e.Location.wrap(window.location), i = o.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(n, i)) : void 0
                        }, n.prototype.onPageLoad = function() {
                            return e.defer(function(t) {
                                return function() {
                                    return t.pageLoaded = !0
                                }
                            }(this))
                        }, n.prototype.shouldHandlePopState = function() {
                            return this.pageIsLoaded()
                        }, n.prototype.pageIsLoaded = function() {
                            return this.pageLoaded || "complete" === document.readyState
                        }, n.prototype.update = function(t, e, n) {
                            var r;
                            return r = {
                                turbolinks: {
                                    restorationIdentifier: n
                                }
                            }, history[t + "State"](r, null, e)
                        }, n
                    }()
                }.call(this),
                function() {
                    e.HeadDetails = function() {
                        function t(t) {
                            var e, n, r, a, s;
                            for (this.elements = {}, n = 0, a = t.length; a > n; n++)(s = t[n]).nodeType === Node.ELEMENT_NODE && (r = s.outerHTML, (null != (e = this.elements)[r] ? e[r] : e[r] = {
                                type: o(s),
                                tracked: i(s),
                                elements: []
                            }).elements.push(s))
                        }
                        var e, n, r, i, o;
                        return t.fromHeadElement = function(t) {
                            var e;
                            return new this(null != (e = null != t ? t.childNodes : void 0) ? e : [])
                        }, t.prototype.hasElementWithKey = function(t) {
                            return t in this.elements
                        }, t.prototype.getTrackedElementSignature = function() {
                            var t;
                            return function() {
                                var e, n;
                                for (t in n = [], e = this.elements) e[t].tracked && n.push(t);
                                return n
                            }.call(this).join("")
                        }, t.prototype.getScriptElementsNotInDetails = function(t) {
                            return this.getElementsMatchingTypeNotInDetails("script", t)
                        }, t.prototype.getStylesheetElementsNotInDetails = function(t) {
                            return this.getElementsMatchingTypeNotInDetails("stylesheet", t)
                        }, t.prototype.getElementsMatchingTypeNotInDetails = function(t, e) {
                            var n, r, i, o, a, s;
                            for (r in a = [], i = this.elements) s = (o = i[r]).type, n = o.elements, s !== t || e.hasElementWithKey(r) || a.push(n[0]);
                            return a
                        }, t.prototype.getProvisionalElements = function() {
                            var t, e, n, r, i, o, a;
                            for (e in n = [], r = this.elements) a = (i = r[e]).type, o = i.tracked, t = i.elements, null != a || o ? t.length > 1 && n.push.apply(n, t.slice(1)) : n.push.apply(n, t);
                            return n
                        }, t.prototype.getMetaValue = function(t) {
                            var e;
                            return null != (e = this.findMetaElementByName(t)) ? e.getAttribute("content") : void 0
                        }, t.prototype.findMetaElementByName = function(t) {
                            var n, r, i, o;
                            for (i in n = void 0, o = this.elements) r = o[i].elements, e(r[0], t) && (n = r[0]);
                            return n
                        }, o = function(t) {
                            return n(t) ? "script" : r(t) ? "stylesheet" : void 0
                        }, i = function(t) {
                            return "reload" === t.getAttribute("data-turbolinks-track")
                        }, n = function(t) {
                            return "script" === t.tagName.toLowerCase()
                        }, r = function(t) {
                            var e;
                            return "style" === (e = t.tagName.toLowerCase()) || "link" === e && "stylesheet" === t.getAttribute("rel")
                        }, e = function(t, e) {
                            return "meta" === t.tagName.toLowerCase() && t.getAttribute("name") === e
                        }, t
                    }()
                }.call(this),
                function() {
                    e.Snapshot = function() {
                        function t(t, e) {
                            this.headDetails = t, this.bodyElement = e
                        }
                        return t.wrap = function(t) {
                            return t instanceof this ? t : "string" == typeof t ? this.fromHTMLString(t) : this.fromHTMLElement(t)
                        }, t.fromHTMLString = function(t) {
                            var e;
                            return (e = document.createElement("html")).innerHTML = t, this.fromHTMLElement(e)
                        }, t.fromHTMLElement = function(t) {
                            var n, r, i;
                            return r = t.querySelector("head"), n = null != (i = t.querySelector("body")) ? i : document.createElement("body"), new this(e.HeadDetails.fromHeadElement(r), n)
                        }, t.prototype.clone = function() {
                            return new this.constructor(this.headDetails, this.bodyElement.cloneNode(!0))
                        }, t.prototype.getRootLocation = function() {
                            var t, n;
                            return n = null != (t = this.getSetting("root")) ? t : "/", new e.Location(n)
                        }, t.prototype.getCacheControlValue = function() {
                            return this.getSetting("cache-control")
                        }, t.prototype.getElementForAnchor = function(t) {
                            try {
                                return this.bodyElement.querySelector("[id='" + t + "'], a[name='" + t + "']")
                            } catch (e) {}
                        }, t.prototype.getPermanentElements = function() {
                            return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")
                        }, t.prototype.getPermanentElementById = function(t) {
                            return this.bodyElement.querySelector("#" + t + "[data-turbolinks-permanent]")
                        }, t.prototype.getPermanentElementsPresentInSnapshot = function(t) {
                            var e, n, r, i, o;
                            for (o = [], n = 0, r = (i = this.getPermanentElements()).length; r > n; n++) e = i[n], t.getPermanentElementById(e.id) && o.push(e);
                            return o
                        }, t.prototype.findFirstAutofocusableElement = function() {
                            return this.bodyElement.querySelector("[autofocus]")
                        }, t.prototype.hasAnchor = function(t) {
                            return null != this.getElementForAnchor(t)
                        }, t.prototype.isPreviewable = function() {
                            return "no-preview" !== this.getCacheControlValue()
                        }, t.prototype.isCacheable = function() {
                            return "no-cache" !== this.getCacheControlValue()
                        }, t.prototype.isVisitable = function() {
                            return "reload" !== this.getSetting("visit-control")
                        }, t.prototype.getSetting = function(t) {
                            return this.headDetails.getMetaValue("turbolinks-" + t)
                        }, t
                    }()
                }.call(this),
                function() {
                    var t = [].slice;
                    e.Renderer = function() {
                        function e() {}
                        var n;
                        return e.render = function() {
                            var e, n, r;
                            return n = arguments[0], e = arguments[1], (r = function(t, e, n) {
                                n.prototype = t.prototype;
                                var r = new n,
                                    i = t.apply(r, e);
                                return Object(i) === i ? i : r
                            }(this, 3 <= arguments.length ? t.call(arguments, 2) : [], function() {})).delegate = n, r.render(e), r
                        }, e.prototype.renderView = function(t) {
                            return this.delegate.viewWillRender(this.newBody), t(), this.delegate.viewRendered(this.newBody)
                        }, e.prototype.invalidateView = function() {
                            return this.delegate.viewInvalidated()
                        }, e.prototype.createScriptElement = function(t) {
                            var e;
                            return "false" === t.getAttribute("data-turbolinks-eval") ? t : ((e = document.createElement("script")).textContent = t.textContent, e.async = !1, n(e, t), e)
                        }, n = function(t, e) {
                            var n, r, i, o, a, s, u;
                            for (s = [], n = 0, r = (o = e.attributes).length; r > n; n++) i = (a = o[n]).name, u = a.value, s.push(t.setAttribute(i, u));
                            return s
                        }, e
                    }()
                }.call(this),
                function() {
                    var t, n, r = function(t, e) {
                            function n() {
                                this.constructor = t
                            }
                            for (var r in e) i.call(e, r) && (t[r] = e[r]);
                            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
                        },
                        i = {}.hasOwnProperty;
                    e.SnapshotRenderer = function(e) {
                        function i(t, e, n) {
                            this.currentSnapshot = t, this.newSnapshot = e, this.isPreview = n, this.currentHeadDetails = this.currentSnapshot.headDetails, this.newHeadDetails = this.newSnapshot.headDetails, this.currentBody = this.currentSnapshot.bodyElement, this.newBody = this.newSnapshot.bodyElement
                        }
                        return r(i, e), i.prototype.render = function(t) {
                            return this.shouldRender() ? (this.mergeHead(), this.renderView((e = this, function() {
                                return e.replaceBody(), e.isPreview || e.focusFirstAutofocusableElement(), t()
                            }))) : this.invalidateView();
                            var e
                        }, i.prototype.mergeHead = function() {
                            return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements()
                        }, i.prototype.replaceBody = function() {
                            var t;
                            return t = this.relocateCurrentBodyPermanentElements(), this.activateNewBodyScriptElements(), this.assignNewBody(), this.replacePlaceholderElementsWithClonedPermanentElements(t)
                        }, i.prototype.shouldRender = function() {
                            return this.newSnapshot.isVisitable() && this.trackedElementsAreIdentical()
                        }, i.prototype.trackedElementsAreIdentical = function() {
                            return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature()
                        }, i.prototype.copyNewHeadStylesheetElements = function() {
                            var t, e, n, r, i;
                            for (i = [], e = 0, n = (r = this.getNewHeadStylesheetElements()).length; n > e; e++) t = r[e], i.push(document.head.appendChild(t));
                            return i
                        }, i.prototype.copyNewHeadScriptElements = function() {
                            var t, e, n, r, i;
                            for (i = [], e = 0, n = (r = this.getNewHeadScriptElements()).length; n > e; e++) t = r[e], i.push(document.head.appendChild(this.createScriptElement(t)));
                            return i
                        }, i.prototype.removeCurrentHeadProvisionalElements = function() {
                            var t, e, n, r, i;
                            for (i = [], e = 0, n = (r = this.getCurrentHeadProvisionalElements()).length; n > e; e++) t = r[e], i.push(document.head.removeChild(t));
                            return i
                        }, i.prototype.copyNewHeadProvisionalElements = function() {
                            var t, e, n, r, i;
                            for (i = [], e = 0, n = (r = this.getNewHeadProvisionalElements()).length; n > e; e++) t = r[e], i.push(document.head.appendChild(t));
                            return i
                        }, i.prototype.relocateCurrentBodyPermanentElements = function() {
                            var e, r, i, o, a, s, u;
                            for (u = [], e = 0, r = (s = this.getCurrentBodyPermanentElements()).length; r > e; e++) o = s[e], a = t(o), i = this.newSnapshot.getPermanentElementById(o.id), n(o, a.element), n(i, o), u.push(a);
                            return u
                        }, i.prototype.replacePlaceholderElementsWithClonedPermanentElements = function(t) {
                            var e, r, i, o, a, s;
                            for (s = [], i = 0, o = t.length; o > i; i++) r = (a = t[i]).element, e = a.permanentElement.cloneNode(!0), s.push(n(r, e));
                            return s
                        }, i.prototype.activateNewBodyScriptElements = function() {
                            var t, e, r, i, o, a;
                            for (a = [], e = 0, i = (o = this.getNewBodyScriptElements()).length; i > e; e++) r = o[e], t = this.createScriptElement(r), a.push(n(r, t));
                            return a
                        }, i.prototype.assignNewBody = function() {
                            return document.body = this.newBody
                        }, i.prototype.focusFirstAutofocusableElement = function() {
                            var t;
                            return null != (t = this.newSnapshot.findFirstAutofocusableElement()) ? t.focus() : void 0
                        }, i.prototype.getNewHeadStylesheetElements = function() {
                            return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)
                        }, i.prototype.getNewHeadScriptElements = function() {
                            return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)
                        }, i.prototype.getCurrentHeadProvisionalElements = function() {
                            return this.currentHeadDetails.getProvisionalElements()
                        }, i.prototype.getNewHeadProvisionalElements = function() {
                            return this.newHeadDetails.getProvisionalElements()
                        }, i.prototype.getCurrentBodyPermanentElements = function() {
                            return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)
                        }, i.prototype.getNewBodyScriptElements = function() {
                            return this.newBody.querySelectorAll("script")
                        }, i
                    }(e.Renderer), t = function(t) {
                        var e;
                        return (e = document.createElement("meta")).setAttribute("name", "turbolinks-permanent-placeholder"), e.setAttribute("content", t.id), {
                            element: e,
                            permanentElement: t
                        }
                    }, n = function(t, e) {
                        var n;
                        return (n = t.parentNode) ? n.replaceChild(e, t) : void 0
                    }
                }.call(this),
                function() {
                    var t = function(t, e) {
                            function r() {
                                this.constructor = t
                            }
                            for (var i in e) n.call(e, i) && (t[i] = e[i]);
                            return r.prototype = e.prototype, t.prototype = new r, t.__super__ = e.prototype, t
                        },
                        n = {}.hasOwnProperty;
                    e.ErrorRenderer = function(e) {
                        function n(t) {
                            var e;
                            (e = document.createElement("html")).innerHTML = t, this.newHead = e.querySelector("head"), this.newBody = e.querySelector("body")
                        }
                        return t(n, e), n.prototype.render = function(t) {
                            return this.renderView((e = this, function() {
                                return e.replaceHeadAndBody(), e.activateBodyScriptElements(), t()
                            }));
                            var e
                        }, n.prototype.replaceHeadAndBody = function() {
                            var t, e;
                            return e = document.head, t = document.body, e.parentNode.replaceChild(this.newHead, e), t.parentNode.replaceChild(this.newBody, t)
                        }, n.prototype.activateBodyScriptElements = function() {
                            var t, e, n, r, i, o;
                            for (o = [], e = 0, n = (r = this.getScriptElements()).length; n > e; e++) i = r[e], t = this.createScriptElement(i), o.push(i.parentNode.replaceChild(t, i));
                            return o
                        }, n.prototype.getScriptElements = function() {
                            return document.documentElement.querySelectorAll("script")
                        }, n
                    }(e.Renderer)
                }.call(this),
                function() {
                    e.View = function() {
                        function t(t) {
                            this.delegate = t, this.htmlElement = document.documentElement
                        }
                        return t.prototype.getRootLocation = function() {
                            return this.getSnapshot().getRootLocation()
                        }, t.prototype.getElementForAnchor = function(t) {
                            return this.getSnapshot().getElementForAnchor(t)
                        }, t.prototype.getSnapshot = function() {
                            return e.Snapshot.fromHTMLElement(this.htmlElement)
                        }, t.prototype.render = function(t, e) {
                            var n, r, i;
                            return i = t.snapshot, n = t.error, r = t.isPreview, this.markAsPreview(r), null != i ? this.renderSnapshot(i, r, e) : this.renderError(n, e)
                        }, t.prototype.markAsPreview = function(t) {
                            return t ? this.htmlElement.setAttribute("data-turbolinks-preview", "") : this.htmlElement.removeAttribute("data-turbolinks-preview")
                        }, t.prototype.renderSnapshot = function(t, n, r) {
                            return e.SnapshotRenderer.render(this.delegate, r, this.getSnapshot(), e.Snapshot.wrap(t), n)
                        }, t.prototype.renderError = function(t, n) {
                            return e.ErrorRenderer.render(this.delegate, n, t)
                        }, t
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.ScrollManager = function() {
                        function n(n) {
                            this.delegate = n, this.onScroll = t(this.onScroll, this), this.onScroll = e.throttle(this.onScroll)
                        }
                        return n.prototype.start = function() {
                            return this.started ? void 0 : (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
                        }, n.prototype.stop = function() {
                            return this.started ? (removeEventListener("scroll", this.onScroll, !1), this.started = !1) : void 0
                        }, n.prototype.scrollToElement = function(t) {
                            return t.scrollIntoView()
                        }, n.prototype.scrollToPosition = function(t) {
                            var e, n;
                            return e = t.x, n = t.y, window.scrollTo(e, n)
                        }, n.prototype.onScroll = function() {
                            return this.updatePosition({
                                x: window.pageXOffset,
                                y: window.pageYOffset
                            })
                        }, n.prototype.updatePosition = function(t) {
                            var e;
                            return this.position = t, null != (e = this.delegate) ? e.scrollPositionChanged(this.position) : void 0
                        }, n
                    }()
                }.call(this),
                function() {
                    e.SnapshotCache = function() {
                        function t(t) {
                            this.size = t, this.keys = [], this.snapshots = {}
                        }
                        var n;
                        return t.prototype.has = function(t) {
                            return n(t) in this.snapshots
                        }, t.prototype.get = function(t) {
                            var e;
                            if (this.has(t)) return e = this.read(t), this.touch(t), e
                        }, t.prototype.put = function(t, e) {
                            return this.write(t, e), this.touch(t), e
                        }, t.prototype.read = function(t) {
                            var e;
                            return e = n(t), this.snapshots[e]
                        }, t.prototype.write = function(t, e) {
                            var r;
                            return r = n(t), this.snapshots[r] = e
                        }, t.prototype.touch = function(t) {
                            var e, r;
                            return r = n(t), (e = this.keys.indexOf(r)) > -1 && this.keys.splice(e, 1), this.keys.unshift(r), this.trim()
                        }, t.prototype.trim = function() {
                            var t, e, n, r, i;
                            for (i = [], t = 0, n = (r = this.keys.splice(this.size)).length; n > t; t++) e = r[t], i.push(delete this.snapshots[e]);
                            return i
                        }, n = function(t) {
                            return e.Location.wrap(t).toCacheKey()
                        }, t
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.Visit = function() {
                        function n(n, r, i) {
                            this.controller = n, this.action = i, this.performScroll = t(this.performScroll, this), this.identifier = e.uuid(), this.location = e.Location.wrap(r), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {}
                        }
                        var r;
                        return n.prototype.start = function() {
                            return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0
                        }, n.prototype.cancel = function() {
                            var t;
                            return "started" === this.state ? (null != (t = this.request) && t.cancel(), this.cancelRender(), this.state = "canceled") : void 0
                        }, n.prototype.complete = function() {
                            var t;
                            return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof(t = this.adapter).visitCompleted && t.visitCompleted(this), this.controller.visitCompleted(this)) : void 0
                        }, n.prototype.fail = function() {
                            var t;
                            return "started" === this.state ? (this.state = "failed", "function" == typeof(t = this.adapter).visitFailed ? t.visitFailed(this) : void 0) : void 0
                        }, n.prototype.changeHistory = function() {
                            var t, e;
                            return this.historyChanged ? void 0 : (t = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e = r(t), this.controller[e](this.location, this.restorationIdentifier), this.historyChanged = !0)
                        }, n.prototype.issueRequest = function() {
                            return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new e.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0
                        }, n.prototype.getCachedSnapshot = function() {
                            var t;
                            return !(t = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t.hasAnchor(this.location.anchor) || "restore" !== this.action && !t.isPreviewable() ? void 0 : t
                        }, n.prototype.hasCachedSnapshot = function() {
                            return null != this.getCachedSnapshot()
                        }, n.prototype.loadCachedSnapshot = function() {
                            var t, e;
                            return (e = this.getCachedSnapshot()) ? (t = this.shouldIssueRequest(), this.render(function() {
                                var n;
                                return this.cacheSnapshot(), this.controller.render({
                                    snapshot: e,
                                    isPreview: t
                                }, this.performScroll), "function" == typeof(n = this.adapter).visitRendered && n.visitRendered(this), t ? void 0 : this.complete()
                            })) : void 0
                        }, n.prototype.loadResponse = function() {
                            return null != this.response ? this.render(function() {
                                var t, e;
                                return this.cacheSnapshot(), this.request.failed ? (this.controller.render({
                                    error: this.response
                                }, this.performScroll), "function" == typeof(t = this.adapter).visitRendered && t.visitRendered(this), this.fail()) : (this.controller.render({
                                    snapshot: this.response
                                }, this.performScroll), "function" == typeof(e = this.adapter).visitRendered && e.visitRendered(this), this.complete())
                            }) : void 0
                        }, n.prototype.followRedirect = function() {
                            return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = !0) : void 0
                        }, n.prototype.requestStarted = function() {
                            var t;
                            return this.recordTimingMetric("requestStart"), "function" == typeof(t = this.adapter).visitRequestStarted ? t.visitRequestStarted(this) : void 0
                        }, n.prototype.requestProgressed = function(t) {
                            var e;
                            return this.progress = t, "function" == typeof(e = this.adapter).visitRequestProgressed ? e.visitRequestProgressed(this) : void 0
                        }, n.prototype.requestCompletedWithResponse = function(t, n) {
                            return this.response = t, null != n && (this.redirectedToLocation = e.Location.wrap(n)), this.adapter.visitRequestCompleted(this)
                        }, n.prototype.requestFailedWithStatusCode = function(t, e) {
                            return this.response = e, this.adapter.visitRequestFailedWithStatusCode(this, t)
                        }, n.prototype.requestFinished = function() {
                            var t;
                            return this.recordTimingMetric("requestEnd"), "function" == typeof(t = this.adapter).visitRequestFinished ? t.visitRequestFinished(this) : void 0
                        }, n.prototype.performScroll = function() {
                            return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = !0)
                        }, n.prototype.scrollToRestoredPosition = function() {
                            var t, e;
                            return null != (t = null != (e = this.restorationData) ? e.scrollPosition : void 0) ? (this.controller.scrollToPosition(t), !0) : void 0
                        }, n.prototype.scrollToAnchor = function() {
                            return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), !0) : void 0
                        }, n.prototype.scrollToTop = function() {
                            return this.controller.scrollToPosition({
                                x: 0,
                                y: 0
                            })
                        }, n.prototype.recordTimingMetric = function(t) {
                            var e;
                            return null != (e = this.timingMetrics)[t] ? e[t] : e[t] = (new Date).getTime()
                        }, n.prototype.getTimingMetrics = function() {
                            return e.copyObject(this.timingMetrics)
                        }, r = function(t) {
                            switch (t) {
                                case "replace":
                                    return "replaceHistoryWithLocationAndRestorationIdentifier";
                                case "advance":
                                case "restore":
                                    return "pushHistoryWithLocationAndRestorationIdentifier"
                            }
                        }, n.prototype.shouldIssueRequest = function() {
                            return "restore" !== this.action || !this.hasCachedSnapshot()
                        }, n.prototype.cacheSnapshot = function() {
                            return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = !0)
                        }, n.prototype.render = function(t) {
                            return this.cancelRender(), this.frame = requestAnimationFrame((e = this, function() {
                                return e.frame = null, t.call(e)
                            }));
                            var e
                        }, n.prototype.cancelRender = function() {
                            return this.frame ? cancelAnimationFrame(this.frame) : void 0
                        }, n
                    }()
                }.call(this),
                function() {
                    var t = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e.Controller = function() {
                        function n() {
                            this.clickBubbled = t(this.clickBubbled, this), this.clickCaptured = t(this.clickCaptured, this), this.pageLoaded = t(this.pageLoaded, this), this.history = new e.History(this), this.view = new e.View(this), this.scrollManager = new e.ScrollManager(this), this.restorationData = {}, this.clearCache(), this.setProgressBarDelay(500)
                        }
                        return n.prototype.start = function() {
                            return e.supported && !this.started ? (addEventListener("click", this.clickCaptured, !0), addEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.start(), this.startHistory(), this.started = !0, this.enabled = !0) : void 0
                        }, n.prototype.disable = function() {
                            return this.enabled = !1
                        }, n.prototype.stop = function() {
                            return this.started ? (removeEventListener("click", this.clickCaptured, !0), removeEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.stop(), this.stopHistory(), this.started = !1) : void 0
                        }, n.prototype.clearCache = function() {
                            return this.cache = new e.SnapshotCache(10)
                        }, n.prototype.visit = function(t, n) {
                            var r, i;
                            return null == n && (n = {}), t = e.Location.wrap(t), this.applicationAllowsVisitingLocation(t) ? this.locationIsVisitable(t) ? (r = null != (i = n.action) ? i : "advance", this.adapter.visitProposedToLocationWithAction(t, r)) : window.location = t : void 0
                        }, n.prototype.startVisitToLocationWithAction = function(t, n, r) {
                            var i;
                            return e.supported ? (i = this.getRestorationDataForIdentifier(r), this.startVisit(t, n, {
                                restorationData: i
                            })) : window.location = t
                        }, n.prototype.setProgressBarDelay = function(t) {
                            return this.progressBarDelay = t
                        }, n.prototype.startHistory = function() {
                            return this.location = e.Location.wrap(window.location), this.restorationIdentifier = e.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier)
                        }, n.prototype.stopHistory = function() {
                            return this.history.stop()
                        }, n.prototype.pushHistoryWithLocationAndRestorationIdentifier = function(t, n) {
                            return this.restorationIdentifier = n, this.location = e.Location.wrap(t), this.history.push(this.location, this.restorationIdentifier)
                        }, n.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function(t, n) {
                            return this.restorationIdentifier = n, this.location = e.Location.wrap(t), this.history.replace(this.location, this.restorationIdentifier)
                        }, n.prototype.historyPoppedToLocationWithRestorationIdentifier = function(t, n) {
                            var r;
                            return this.restorationIdentifier = n, this.enabled ? (r = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(t, "restore", {
                                restorationIdentifier: this.restorationIdentifier,
                                restorationData: r,
                                historyChanged: !0
                            }), this.location = e.Location.wrap(t)) : this.adapter.pageInvalidated()
                        }, n.prototype.getCachedSnapshotForLocation = function(t) {
                            var e;
                            return null != (e = this.cache.get(t)) ? e.clone() : void 0
                        }, n.prototype.shouldCacheSnapshot = function() {
                            return this.view.getSnapshot().isCacheable()
                        }, n.prototype.cacheSnapshot = function() {
                            var t, n;
                            return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), n = this.view.getSnapshot(), t = this.lastRenderedLocation, e.defer(function(e) {
                                return function() {
                                    return e.cache.put(t, n.clone())
                                }
                            }(this))) : void 0
                        }, n.prototype.scrollToAnchor = function(t) {
                            var e;
                            return (e = this.view.getElementForAnchor(t)) ? this.scrollToElement(e) : this.scrollToPosition({
                                x: 0,
                                y: 0
                            })
                        }, n.prototype.scrollToElement = function(t) {
                            return this.scrollManager.scrollToElement(t)
                        }, n.prototype.scrollToPosition = function(t) {
                            return this.scrollManager.scrollToPosition(t)
                        }, n.prototype.scrollPositionChanged = function(t) {
                            return this.getCurrentRestorationData().scrollPosition = t
                        }, n.prototype.render = function(t, e) {
                            return this.view.render(t, e)
                        }, n.prototype.viewInvalidated = function() {
                            return this.adapter.pageInvalidated()
                        }, n.prototype.viewWillRender = function(t) {
                            return this.notifyApplicationBeforeRender(t)
                        }, n.prototype.viewRendered = function() {
                            return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender()
                        }, n.prototype.pageLoaded = function() {
                            return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
                        }, n.prototype.clickCaptured = function() {
                            return removeEventListener("click", this.clickBubbled, !1), addEventListener("click", this.clickBubbled, !1)
                        }, n.prototype.clickBubbled = function(t) {
                            var e, n, r;
                            return this.enabled && this.clickEventIsSignificant(t) && (n = this.getVisitableLinkForNode(t.target)) && (r = this.getVisitableLocationForLink(n)) && this.applicationAllowsFollowingLinkToLocation(n, r) ? (t.preventDefault(), e = this.getActionForLink(n), this.visit(r, {
                                action: e
                            })) : void 0
                        }, n.prototype.applicationAllowsFollowingLinkToLocation = function(t, e) {
                            return !this.notifyApplicationAfterClickingLinkToLocation(t, e).defaultPrevented
                        }, n.prototype.applicationAllowsVisitingLocation = function(t) {
                            return !this.notifyApplicationBeforeVisitingLocation(t).defaultPrevented
                        }, n.prototype.notifyApplicationAfterClickingLinkToLocation = function(t, n) {
                            return e.dispatch("turbolinks:click", {
                                target: t,
                                data: {
                                    url: n.absoluteURL
                                },
                                cancelable: !0
                            })
                        }, n.prototype.notifyApplicationBeforeVisitingLocation = function(t) {
                            return e.dispatch("turbolinks:before-visit", {
                                data: {
                                    url: t.absoluteURL
                                },
                                cancelable: !0
                            })
                        }, n.prototype.notifyApplicationAfterVisitingLocation = function(t) {
                            return e.dispatch("turbolinks:visit", {
                                data: {
                                    url: t.absoluteURL
                                }
                            })
                        }, n.prototype.notifyApplicationBeforeCachingSnapshot = function() {
                            return e.dispatch("turbolinks:before-cache")
                        }, n.prototype.notifyApplicationBeforeRender = function(t) {
                            return e.dispatch("turbolinks:before-render", {
                                data: {
                                    newBody: t
                                }
                            })
                        }, n.prototype.notifyApplicationAfterRender = function() {
                            return e.dispatch("turbolinks:render")
                        }, n.prototype.notifyApplicationAfterPageLoad = function(t) {
                            return null == t && (t = {}), e.dispatch("turbolinks:load", {
                                data: {
                                    url: this.location.absoluteURL,
                                    timing: t
                                }
                            })
                        }, n.prototype.startVisit = function(t, e, n) {
                            var r;
                            return null != (r = this.currentVisit) && r.cancel(), this.currentVisit = this.createVisit(t, e, n), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t)
                        }, n.prototype.createVisit = function(t, n, r) {
                            var i, o, a, s, u;
                            return s = (o = null != r ? r : {}).restorationIdentifier, a = o.restorationData, i = o.historyChanged, (u = new e.Visit(this, t, n)).restorationIdentifier = null != s ? s : e.uuid(), u.restorationData = e.copyObject(a), u.historyChanged = i, u.referrer = this.location, u
                        }, n.prototype.visitCompleted = function(t) {
                            return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())
                        }, n.prototype.clickEventIsSignificant = function(t) {
                            return !(t.defaultPrevented || t.target.isContentEditable || t.which > 1 || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey)
                        }, n.prototype.getVisitableLinkForNode = function(t) {
                            return this.nodeIsVisitable(t) ? e.closest(t, "a[href]:not([target]):not([download])") : void 0
                        }, n.prototype.getVisitableLocationForLink = function(t) {
                            var n;
                            return n = new e.Location(t.getAttribute("href")), this.locationIsVisitable(n) ? n : void 0
                        }, n.prototype.getActionForLink = function(t) {
                            var e;
                            return null != (e = t.getAttribute("data-turbolinks-action")) ? e : "advance"
                        }, n.prototype.nodeIsVisitable = function(t) {
                            var n;
                            return !(n = e.closest(t, "[data-turbolinks]")) || "false" !== n.getAttribute("data-turbolinks")
                        }, n.prototype.locationIsVisitable = function(t) {
                            return t.isPrefixedBy(this.view.getRootLocation()) && t.isHTML()
                        }, n.prototype.getCurrentRestorationData = function() {
                            return this.getRestorationDataForIdentifier(this.restorationIdentifier)
                        }, n.prototype.getRestorationDataForIdentifier = function(t) {
                            var e;
                            return null != (e = this.restorationData)[t] ? e[t] : e[t] = {}
                        }, n
                    }()
                }.call(this),
                function() {
                    ! function() {
                        var t, e;
                        if ((t = e = document.currentScript) && !e.hasAttribute("data-turbolinks-suppress-warning"))
                            for (; t = t.parentNode;)
                                if (t === document.body) return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s", e.outerHTML)
                    }()
                }.call(this),
                function() {
                    var t, n, r;
                    e.start = function() {
                        return n() ? (null == e.controller && (e.controller = t()), e.controller.start()) : void 0
                    }, n = function() {
                        return null == window.Turbolinks && (window.Turbolinks = e), r()
                    }, t = function() {
                        var t;
                        return (t = new e.Controller).adapter = new e.BrowserAdapter(t), t
                    }, (r = function() {
                        return window.Turbolinks === e
                    })() && e.start()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e)
    }.call(this),
    function() {
        var t = this;
        (function() {
            (function() {
                var t = [].slice;
                this.ActionCable = {
                    INTERNAL: {
                        message_types: {
                            welcome: "welcome",
                            ping: "ping",
                            confirmation: "confirm_subscription",
                            rejection: "reject_subscription"
                        },
                        default_mount_path: "/cable",
                        protocols: ["actioncable-v1-json", "actioncable-unsupported"]
                    },
                    WebSocket: window.WebSocket,
                    logger: window.console,
                    createConsumer: function(t) {
                        var n;
                        return null == t && (t = null != (n = this.getConfig("url")) ? n : this.INTERNAL.default_mount_path), new e.Consumer(this.createWebSocketURL(t))
                    },
                    getConfig: function(t) {
                        var e;
                        return null != (e = document.head.querySelector("meta[name='action-cable-" + t + "']")) ? e.getAttribute("content") : void 0
                    },
                    createWebSocketURL: function(t) {
                        var e;
                        return t && !/^wss?:/i.test(t) ? ((e = document.createElement("a")).href = t, e.href = e.href, e.protocol = e.protocol.replace("http", "ws"), e.href) : t
                    },
                    startDebugging: function() {
                        return this.debugging = !0
                    },
                    stopDebugging: function() {
                        return this.debugging = null
                    },
                    log: function() {
                        var e, n;
                        if (e = 1 <= arguments.length ? t.call(arguments, 0) : [], this.debugging) return e.push(Date.now()), (n = this.logger).log.apply(n, ["[ActionCable]"].concat(t.call(e)))
                    }
                }
            }).call(this)
        }).call(t);
        var e = t.ActionCable;
        (function() {
            (function() {
                var t = function(t, e) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                };
                e.ConnectionMonitor = function() {
                    function n(e) {
                        this.connection = e, this.visibilityDidChange = t(this.visibilityDidChange, this), this.reconnectAttempts = 0
                    }
                    var r, i, o;
                    return n.pollInterval = {
                        min: 3,
                        max: 30
                    }, n.staleThreshold = 6, n.prototype.start = function() {
                        if (!this.isRunning()) return this.startedAt = i(), delete this.stoppedAt, this.startPolling(), document.addEventListener("visibilitychange", this.visibilityDidChange), e.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
                    }, n.prototype.stop = function() {
                        if (this.isRunning()) return this.stoppedAt = i(), this.stopPolling(), document.removeEventListener("visibilitychange", this.visibilityDidChange), e.log("ConnectionMonitor stopped")
                    }, n.prototype.isRunning = function() {
                        return null != this.startedAt && null == this.stoppedAt
                    }, n.prototype.recordPing = function() {
                        return this.pingedAt = i()
                    }, n.prototype.recordConnect = function() {
                        return this.reconnectAttempts = 0, this.recordPing(), delete this.disconnectedAt, e.log("ConnectionMonitor recorded connect")
                    }, n.prototype.recordDisconnect = function() {
                        return this.disconnectedAt = i(), e.log("ConnectionMonitor recorded disconnect")
                    }, n.prototype.startPolling = function() {
                        return this.stopPolling(), this.poll()
                    }, n.prototype.stopPolling = function() {
                        return clearTimeout(this.pollTimeout)
                    }, n.prototype.poll = function() {
                        return this.pollTimeout = setTimeout((t = this, function() {
                            return t.reconnectIfStale(), t.poll()
                        }), this.getPollInterval());
                        var t
                    }, n.prototype.getPollInterval = function() {
                        var t, e, n, i;
                        return n = (i = this.constructor.pollInterval).min, e = i.max, t = 5 * Math.log(this.reconnectAttempts + 1), Math.round(1e3 * r(t, n, e))
                    }, n.prototype.reconnectIfStale = function() {
                        if (this.connectionIsStale()) return e.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + o(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"), this.reconnectAttempts++, this.disconnectedRecently() ? e.log("ConnectionMonitor skipping reopening recent disconnect") : (e.log("ConnectionMonitor reopening"), this.connection.reopen())
                    }, n.prototype.connectionIsStale = function() {
                        var t;
                        return o(null != (t = this.pingedAt) ? t : this.startedAt) > this.constructor.staleThreshold
                    }, n.prototype.disconnectedRecently = function() {
                        return this.disconnectedAt && o(this.disconnectedAt) < this.constructor.staleThreshold
                    }, n.prototype.visibilityDidChange = function() {
                        if ("visible" === document.visibilityState) return setTimeout((t = this, function() {
                            if (t.connectionIsStale() || !t.connection.isOpen()) return e.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState), t.connection.reopen()
                        }), 200);
                        var t
                    }, i = function() {
                        return (new Date).getTime()
                    }, o = function(t) {
                        return (i() - t) / 1e3
                    }, r = function(t, e, n) {
                        return Math.max(e, Math.min(n, t))
                    }, n
                }()
            }).call(this),
                function() {
                    var t, n, r, i, o, a = [].slice,
                        s = function(t, e) {
                            return function() {
                                return t.apply(e, arguments)
                            }
                        },
                        u = [].indexOf || function(t) {
                            for (var e = 0, n = this.length; e < n; e++)
                                if (e in this && this[e] === t) return e;
                            return -1
                        };
                    i = e.INTERNAL, n = i.message_types, r = i.protocols, o = 2 <= r.length ? a.call(r, 0, t = r.length - 1) : (t = 0, []), r[t++], e.Connection = function() {
                        function t(t) {
                            this.consumer = t, this.open = s(this.open, this), this.subscriptions = this.consumer.subscriptions, this.monitor = new e.ConnectionMonitor(this), this.disconnected = !0
                        }
                        return t.reopenDelay = 500, t.prototype.send = function(t) {
                            return !!this.isOpen() && (this.webSocket.send(JSON.stringify(t)), !0)
                        }, t.prototype.open = function() {
                            return this.isActive() ? (e.log("Attempted to open WebSocket, but existing socket is " + this.getState()), !1) : (e.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + r), null != this.webSocket && this.uninstallEventHandlers(), this.webSocket = new e.WebSocket(this.consumer.url, r), this.installEventHandlers(), this.monitor.start(), !0)
                        }, t.prototype.close = function(t) {
                            var e;
                            if ((null != t ? t : {
                                    allowReconnect: !0
                                }).allowReconnect || this.monitor.stop(), this.isActive()) return null != (e = this.webSocket) ? e.close() : void 0
                        }, t.prototype.reopen = function() {
                            var t;
                            if (e.log("Reopening WebSocket, current state is " + this.getState()), !this.isActive()) return this.open();
                            try {
                                return this.close()
                            } catch (n) {
                                return t = n, e.log("Failed to reopen WebSocket", t)
                            } finally {
                                e.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"), setTimeout(this.open, this.constructor.reopenDelay)
                            }
                        }, t.prototype.getProtocol = function() {
                            var t;
                            return null != (t = this.webSocket) ? t.protocol : void 0
                        }, t.prototype.isOpen = function() {
                            return this.isState("open")
                        }, t.prototype.isActive = function() {
                            return this.isState("open", "connecting")
                        }, t.prototype.isProtocolSupported = function() {
                            var t;
                            return t = this.getProtocol(), u.call(o, t) >= 0
                        }, t.prototype.isState = function() {
                            var t, e;
                            return e = 1 <= arguments.length ? a.call(arguments, 0) : [], t = this.getState(), u.call(e, t) >= 0
                        }, t.prototype.getState = function() {
                            var t, e;
                            for (e in WebSocket)
                                if (WebSocket[e] === (null != (t = this.webSocket) ? t.readyState : void 0)) return e.toLowerCase();
                            return null
                        }, t.prototype.installEventHandlers = function() {
                            var t, e;
                            for (t in this.events) e = this.events[t].bind(this), this.webSocket["on" + t] = e
                        }, t.prototype.uninstallEventHandlers = function() {
                            var t;
                            for (t in this.events) this.webSocket["on" + t] = function() {}
                        }, t.prototype.events = {
                            message: function(t) {
                                var e, r, i;
                                if (this.isProtocolSupported()) switch (e = (i = JSON.parse(t.data)).identifier, r = i.message, i.type) {
                                    case n.welcome:
                                        return this.monitor.recordConnect(), this.subscriptions.reload();
                                    case n.ping:
                                        return this.monitor.recordPing();
                                    case n.confirmation:
                                        return this.subscriptions.notify(e, "connected");
                                    case n.rejection:
                                        return this.subscriptions.reject(e);
                                    default:
                                        return this.subscriptions.notify(e, "received", r)
                                }
                            },
                            open: function() {
                                if (e.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"), this.disconnected = !1, !this.isProtocolSupported()) return e.log("Protocol is unsupported. Stopping monitor and disconnecting."), this.close({
                                    allowReconnect: !1
                                })
                            },
                            close: function() {
                                if (e.log("WebSocket onclose event"), !this.disconnected) return this.disconnected = !0, this.monitor.recordDisconnect(), this.subscriptions.notifyAll("disconnected", {
                                    willAttemptReconnect: this.monitor.isRunning()
                                })
                            },
                            error: function() {
                                return e.log("WebSocket onerror event")
                            }
                        }, t
                    }()
                }.call(this),
                function() {
                    var t = [].slice;
                    e.Subscriptions = function() {
                        function n(t) {
                            this.consumer = t, this.subscriptions = []
                        }
                        return n.prototype.create = function(t, n) {
                            var r, i, o;
                            return i = "object" == typeof(r = t) ? r : {
                                channel: r
                            }, o = new e.Subscription(this.consumer, i, n), this.add(o)
                        }, n.prototype.add = function(t) {
                            return this.subscriptions.push(t), this.consumer.ensureActiveConnection(), this.notify(t, "initialized"), this.sendCommand(t, "subscribe"), t
                        }, n.prototype.remove = function(t) {
                            return this.forget(t), this.findAll(t.identifier).length || this.sendCommand(t, "unsubscribe"), t
                        }, n.prototype.reject = function(t) {
                            var e, n, r, i, o;
                            for (i = [], e = 0, n = (r = this.findAll(t)).length; e < n; e++) o = r[e], this.forget(o), this.notify(o, "rejected"), i.push(o);
                            return i
                        }, n.prototype.forget = function(t) {
                            var e;
                            return this.subscriptions = function() {
                                var n, r, i, o;
                                for (o = [], n = 0, r = (i = this.subscriptions).length; n < r; n++)(e = i[n]) !== t && o.push(e);
                                return o
                            }.call(this), t
                        }, n.prototype.findAll = function(t) {
                            var e, n, r, i, o;
                            for (i = [], e = 0, n = (r = this.subscriptions).length; e < n; e++)(o = r[e]).identifier === t && i.push(o);
                            return i
                        }, n.prototype.reload = function() {
                            var t, e, n, r, i;
                            for (r = [], t = 0, e = (n = this.subscriptions).length; t < e; t++) i = n[t], r.push(this.sendCommand(i, "subscribe"));
                            return r
                        }, n.prototype.notifyAll = function() {
                            var e, n, r, i, o, a, s;
                            for (n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], a = [], r = 0, i = (o = this.subscriptions).length; r < i; r++) s = o[r], a.push(this.notify.apply(this, [s, n].concat(t.call(e))));
                            return a
                        }, n.prototype.notify = function() {
                            var e, n, r, i, o, a, s;
                            for (a = arguments[0], n = arguments[1], e = 3 <= arguments.length ? t.call(arguments, 2) : [], o = [], r = 0, i = (s = "string" == typeof a ? this.findAll(a) : [a]).length; r < i; r++) a = s[r], o.push("function" == typeof a[n] ? a[n].apply(a, e) : void 0);
                            return o
                        }, n.prototype.sendCommand = function(t, e) {
                            var n;
                            return n = t.identifier, this.consumer.send({
                                command: e,
                                identifier: n
                            })
                        }, n
                    }()
                }.call(this),
                function() {
                    e.Subscription = function() {
                        function t(t, n, r) {
                            this.consumer = t, null == n && (n = {}), this.identifier = JSON.stringify(n), e(this, r)
                        }
                        var e;
                        return t.prototype.perform = function(t, e) {
                            return null == e && (e = {}), e.action = t, this.send(e)
                        }, t.prototype.send = function(t) {
                            return this.consumer.send({
                                command: "message",
                                identifier: this.identifier,
                                data: JSON.stringify(t)
                            })
                        }, t.prototype.unsubscribe = function() {
                            return this.consumer.subscriptions.remove(this)
                        }, e = function(t, e) {
                            var n, r;
                            if (null != e)
                                for (n in e) r = e[n], t[n] = r;
                            return t
                        }, t
                    }()
                }.call(this),
                function() {
                    e.Consumer = function() {
                        function t(t) {
                            this.url = t, this.subscriptions = new e.Subscriptions(this), this.connection = new e.Connection(this)
                        }
                        return t.prototype.send = function(t) {
                            return this.connection.send(t)
                        }, t.prototype.connect = function() {
                            return this.connection.open()
                        }, t.prototype.disconnect = function() {
                            return this.connection.close({
                                allowReconnect: !1
                            })
                        }, t.prototype.ensureActiveConnection = function() {
                            if (!this.connection.isActive()) return this.connection.open()
                        }, t
                    }()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e)
    }.call(this),
    function() {
        this.App || (this.App = {}), App.cable = ActionCable.createConsumer("wss://www.downlink.online/cable")
    }.call(this),
    function() {
        App.chatroom = App.cable.subscriptions.create("ChatroomChannel", {
            connected: function() {},
            disconnected: function() {},
            received: function(t) {
                return $(function() {
                    return $(".experimental-messages").append(t.mod_message), parseInt($(".experimental-messages .message-outer").attr("data-attr")) !== parseInt($(".experimental-messages").attr("data-attr")) ? ($(".experimental-messages .message-outer").addClass("messages-of-others"), $(".messages-display").append($(".experimental-messages").html), $(".experimental-messages").html(""), scroll_bottom(), document.getElementById("hollow-copy").play(), document.getElementById("hollow-copy-1").play()) : t.hasOwnProperty("mod_message") ? ($(".messages-display").append(t.mod_message), scroll_bottom(), document.getElementById("hollow-copy").play(), document.getElementById("hollow-copy-1").play(), $(".experimental-messages").html("")) : void 0
                })
            }
        })
    }.call(this),
    function() {
        App.online = App.cable.subscriptions.create("OnlineChannel", {
            connected: function() {},
            disconnected: function() {},
            received: function(t) {
                return $(function() {
                    var e, n, r, i;
                    if (t.hasOwnProperty("arrayez")) {
                        for (e = 0, n = []; e < t.arrayez.length;) i = t.arrayez[e].user_id, "appear" === t.arrayez[e].event ? ($("#user_" + i).addClass("background-green-online"), $("#user_" + i + " .online-logo").css("display", "flex"), $("#user_" + i + " .online-span").css("display", "inline-block"), $(".online-notification-bar-wrapper").css("display", "flex"), $(".online-notification-bar").css("display", "flex"), r = '<img src="https://vectr.com/wintersoil/a1gzED9FjB.svg?width=640&height=640&select=a1gzED9FjBpage0" height="70px" width="70px"/><div class="inner-text">' + (0, $("user_" + i + "_online-users-home-page").html)(NaN), $(".online-notification-bar").html(r), $(".online-notification-bar").animate({
                            width: "300px"
                        }, 1e3, function() {
                            return $(".online-notification-bar").animate({
                                width: "60px"
                            }, 1e3, function() {
                                return $(".online-notification-bar").css("display", "none"), $(".online-notification-bar-wrapper").css("display", "none")
                            })
                        })) : ($("#user_" + i).removeClass("background-green-online"), $("#user_" + i + " .online-logo").css("display", "none"), $("#user_" + i + " .online-span").css("display", "none")), n.push(e += 1);
                        return n
                    }
                    if (i = t.user_id, "disappear" === t.event) return $("#user_" + i).removeClass("background-green-online"), $("#user_" + i + " .online-logo").css("display", "none"), $("#user_" + i + " .online-span").css("display", "none")
                })
            }
        })
    }.call(this),
    function() {
        App.video = App.cable.subscriptions.create("VideoChannel", {
            connected: function() {},
            disconnected: function() {},
            received: function(t) {
                return document.getElementById("returned-photo").src = t.image
            }
        })
    }.call(this), scroll_bottom = function() {
        $(".messages-display").length > 0 && $(".messages-display").scrollTop($(".messages-display")[0].scrollHeight)
    }, $(document).on("turbolinks:load", function() {
        function t(t) {
            window.rec = new MediaRecorder(t), window.rec.ondataavailable = (t => {
                let e;
                if (audioChunks.push(t.data), "inactive" == rec.state) {
                    let t = new Blob(audioChunks, {
                        type: "audio/mpeg"
                    });
                    try {
                        e = webkitURL.createObjectURL(t)
                    } catch (r) {
                        e = URL.createObjectURL(t)
                    }
                    var n = new FileReader;
                    n.onload = function(t) {
                        var e = {
                            fname: "test.mp3"
                        };
                        e.data = t.target.result, $.ajax({
                            type: "POST",
                            url: "/uploadMP3",
                            data: e,
                            dataType: "text"
                        }).done(function(t) {
                            console.log(t)
                        })
                    }, n.readAsDataURL(t)
                }
            })
        }

        function e(t) {
            window.recVideo = new MediaRecorder(t), window.recVideo.ondataavailable = (t => {
                let e;
                if (audioChunks.push(t.data), "inactive" == recVideo.state) {
                    let t = new Blob(audioChunks, {
                        type: "video/mp4"
                    });
                    try {
                        e = webkitURL.createObjectURL(t)
                    } catch (r) {
                        e = URL.createObjectURL(t)
                    }
                    var n = new FileReader;
                    n.onload = function(t) {
                        var e = {
                            fname: "test.mp4"
                        };
                        e.data = t.target.result, $.ajax({
                            type: "POST",
                            url: "/uploadMP4",
                            data: e,
                            dataType: "text"
                        }).done(function(t) {
                            console.log(t)
                        })
                    }, n.readAsDataURL(t)
                }
            })
        }
        scroll_bottom(), $("#new_message").bind("ajax:complete", function() {
            $("#message_body").val("")
        }), $(".flash-exit").click(function() {
            $(".flash-outer").css("display", "none")
        });
        try {
            navigator.mediaDevices.getUserMedia({
                audio: !0
            }).then(e => {
                t(e)
            })
        } catch (i) {
            try {
                navigator.mediaDevices.webkitGetUserMedia({
                    audio: !0
                }).then(e => {
                    t(e)
                })
            } catch (i) {
                try {
                    navigator.mediaDevices.mozGetUserMedia({
                        audio: !0
                    }).then(e => {
                        t(e)
                    })
                } catch (i) {
                    console.log("If all media requests fails,   Error:   " + i)
                }
            }
        }
        let n = !1;
        $("#record").click(function() {
            if (0 == n) {
                audioChunks = [], window.rec.start(), n = !0;
                var t = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/microphone_off.svg";
                $("#record").attr("src", t), $("#record").attr("height", "90px"), $("#record").attr("width", "90px")
            } else {
                n = !1;
                t = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/microphone.svg";
                $("#record").attr("src", t), $("#record").attr("height", "90px"), $("#record").attr("width", "90px"), window.rec.stop()
            }
        });
        try {
            navigator.mediaDevices.getUserMedia({
                video: !0,
                audio: !0
            }).then(t => {
                e(t)
            })
        } catch (i) {
            try {
                navigator.mediaDevices.webkitGetUserMedia({
                    video: !0,
                    audio: !0
                }).then(t => {
                    e(t)
                })
            } catch (i) {
                try {
                    navigator.mediaDevices.mozGetUserMedia({
                        video: !0,
                        audio: !0
                    }).then(t => {
                        e(t)
                    })
                } catch (i) {
                    console.log("If all media requests fails,    Error:   " + i)
                }
            }
        }
        let r = !1;
        $("#recordVideo").click(function() {
            if (0 == r) {
                audioChunks = [], window.recVideo.start(), r = !0;
                var t = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/videoOff.svg";
                $("#recordVideo").attr("src", t), $("#recordVideo").attr("height", "90px"), $("#recordVideo").attr("width", "90px")
            } else {
                r = !1;
                t = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/video.svg";
                $("#recordVideo").attr("src", t), $("#recordVideo").attr("height", "90px"), $("#recordVideo").attr("width", "90px"), window.recVideo.stop()
            }
        })
    });
