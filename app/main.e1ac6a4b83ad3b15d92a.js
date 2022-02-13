(() => {
  "use strict";
  function e(e, t) {
    var o = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        o.push.apply(o, n);
    }
    return o;
  }
  function t(t) {
    for (var n = 1; n < arguments.length; n++) {
      var r = null != arguments[n] ? arguments[n] : {};
      n % 2
        ? e(Object(r), !0).forEach(function (e) {
            o(t, e, r[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : e(Object(r)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
          });
    }
    return t;
  }
  function o(e, t, o) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: o,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = o),
      e
    );
  }
  var n = "todos";
  function r() {
    var e = sessionStorage.getItem(n);
    return e ? JSON.parse(e) : [];
  }
  function s(e, o) {
    var s = r(),
      i = Array.from(e.childNodes).find(function (e) {
        return e.classList.contains("todo-text");
      }),
      d = s.map(function (e) {
        return e.name === i.innerText ? t(t({}, e), {}, { status: o }) : e;
      });
    sessionStorage.setItem(n, JSON.stringify(d));
  }
  var i = function (e) {
      var t,
        o = document.createElement("li");
      o.classList.add("todo-item");
      var i = document.createElement("span");
      (i.innerText = null !== (t = e.name) && void 0 !== t ? t : e),
        i.classList.add("todo-text"),
        o.appendChild(i);
      var d = document.createElement("button");
      (d.innerHTML = '<i class="fas fa-check"></i>'),
        d.classList.add("todo-check-button"),
        d.addEventListener(
          "click",
          (function (e) {
            return function (t) {
              t.preventDefault(),
                e.classList.contains("todo-item_completed")
                  ? (s(e, "uncompleted"),
                    e.classList.remove("todo-item_completed"))
                  : (s(e, "completed"), e.classList.add("todo-item_completed"));
            };
          })(o)
        ),
        o.appendChild(d);
      var a = document.createElement("button");
      return (
        (a.innerHTML = '<i class="fas fa-trash"></i>'),
        a.classList.add("todo-remove-button"),
        a.addEventListener(
          "click",
          (function (e) {
            return function (t) {
              t.preventDefault(),
                e.classList.add("todo-item_fall"),
                e.addEventListener("transitionend", function () {
                  !(function (e) {
                    var t = r(),
                      o = document.querySelector(".todo-select-wrapper"),
                      s = Array.from(e.childNodes).find(function (e) {
                        return e.classList.contains("todo-text");
                      });
                    if (s) {
                      var i = t.filter(function (e) {
                        return e.name !== s.innerText;
                      });
                      console.log("filtredTodos", i),
                        0 === i.length &&
                          o.classList.add("todo-select-wrapper_disabled"),
                        sessionStorage.setItem(n, JSON.stringify(i));
                    }
                  })(e),
                    e.remove();
                });
            };
          })(o)
        ),
        o.appendChild(a),
        o
      );
    },
    d = "uncompleted";
  function a(e) {
    return {
      todoInput: e.querySelector(".todo-input"),
      todoHelper: e.querySelector(".todo-helper"),
      todoButton: e.querySelector(".todo-button"),
    };
  }
  function c(e) {
    var t = a(e),
      o = t.todoInput,
      n = t.todoHelper,
      r = t.todoButton;
    o.value.length >= 3
      ? (r.classList.remove("todo-button_disabled"),
        n.classList.remove("todo-helper_visible"))
      : r.classList.add("todo-button_disabled");
  }
  var l = document.querySelector(".todo-input-wrapper"),
    u = a(l),
    p = u.todoInput,
    f = u.todoButton,
    v = u.todoHelper,
    m = document.querySelector(".todo-list"),
    b = document.querySelector(".todo-select"),
    y = document.querySelector(".todo-select-wrapper");
  document.addEventListener("DOMContentLoaded", function () {
    var e;
    0 === (e = r()).length && y.classList.add("todo-select-wrapper_disabled"),
      e.forEach(function (e) {
        var t = i(e);
        m.appendChild(t);
      }),
      c(l);
  }),
    p.addEventListener("input", function () {
      return c(l);
    }),
    f.addEventListener("click", function (e) {
      if ((e.preventDefault(), p.value.length >= 3)) {
        (o = { name: p.value, status: d }),
          (s = r()).push(o),
          sessionStorage.setItem(n, JSON.stringify(s));
        var t = i(p.value);
        m.appendChild(t),
          m.childNodes.length &&
            y.classList.remove("todo-select-wrapper_disabled"),
          (function (e) {
            var t = a(e),
              o = t.todoInput,
              n = t.todoHelper,
              r = t.todoButton;
            (o.value = ""),
              r.classList.add("todo-button_disabled"),
              n.classList.add("todo-helper_visible");
          })(l);
      }
      var o, s;
    }),
    b.addEventListener("change", function (e) {
      var t, o;
      (t = m.childNodes),
        (o = e.target.value),
        t.length &&
          t.forEach(function (e) {
            switch (o) {
              case "completed":
                e.classList.contains("todo-item_completed")
                  ? (e.style.display = "flex")
                  : (e.style.display = "none");
                break;
              case d:
                e.classList.contains("todo-item_completed")
                  ? (e.style.display = "none")
                  : (e.style.display = "flex");
                break;
              default:
                return void (e.style.display = "flex");
            }
          });
    }),
    p.addEventListener("focus", function () {
      return (function (e) {
        a(e).todoHelper.classList.add("todo-helper_visible");
      })(l);
    }),
    p.addEventListener("blur", function () {
      v.classList.remove("todo-helper_visible");
    });
})();
