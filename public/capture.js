;(() => {
  var ui = Object.defineProperty,
    ku = Object.defineProperties
  var xu = Object.getOwnPropertyDescriptors
  var Wt = Object.getOwnPropertySymbols
  var ci = Object.prototype.hasOwnProperty,
    di = Object.prototype.propertyIsEnumerable
  var hr = (e, t, n) =>
      t in e
        ? ui(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n),
    k = (e, t) => {
      for (var n in t || (t = {})) ci.call(t, n) && hr(e, n, t[n])
      if (Wt) for (var n of Wt(t)) di.call(t, n) && hr(e, n, t[n])
      return e
    },
    L = (e, t) => ku(e, xu(t))
  var q = (e, t) => {
    var n = {}
    for (var r in e) ci.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r])
    if (e != null && Wt)
      for (var r of Wt(e)) t.indexOf(r) < 0 && di.call(e, r) && (n[r] = e[r])
    return n
  }
  var F = (e, t) => () => (e && (t = e((e = 0))), t)
  var gr = (e, t) => {
    for (var n in t) ui(e, n, { get: t[n], enumerable: !0 })
  }
  var I = (e, t, n) => (hr(e, typeof t != "symbol" ? t + "" : t, n), n)
  var x = (e, t, n) =>
    new Promise((r, o) => {
      var i = (l) => {
          try {
            u(n.next(l))
          } catch (s) {
            o(s)
          }
        },
        a = (l) => {
          try {
            u(n.throw(l))
          } catch (s) {
            o(s)
          }
        },
        u = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(i, a))
      u((n = n.apply(e, t)).next())
    })
  function ut(e) {
    if (e) {
      for (let t in e) if (t.startsWith("__reactFiber")) return e[t]
    }
  }
  function yr(e) {
    var t
    if (e) {
      let n = (t = e.pendingProps) != null ? t : e.memoizedProps
      if (n) return (n = k({}, n)), delete n.children, n
    }
  }
  var br = F(() => {})
  var ct,
    Vt = F(() => {
      ct = "data-fg-"
    })
  function Cr(e, t) {
    if (typeof t != "string" || !e) return
    let n = t.split(":"),
      r = n[0].replace(/\./g, ":"),
      o = n[1] ? "[" + n[1].replace(/\./g, ":") + "]" : "",
      i = n[2],
      a = Number(n[3]),
      u = Number(n[4]),
      l = Number(n[5]),
      s = Number(n[6])
    switch (n[7]) {
      case "e":
        return {
          type: "element",
          sourceId: e,
          fileGuid: r,
          filePath: i,
          fileVersion: o,
          line: a,
          column: u,
          pos: l,
          len: s,
          name: n[8],
          childTypes: n[9] ? (n[9] === "_" ? [] : n[9].split("")) : void 0,
          isComponentDefinition: n[10] === "1" ? !0 : void 0,
          assetKey: n[11] ? n[11] : void 0,
          makeLibraryId: n[12] ? n[12] : void 0,
          libraryId: n[13] ? n[13] : void 0,
          componentId: n[14] ? n[14] : void 0,
          isLibraryInstance: n[15] === "1" ? !0 : void 0,
        }
      case "t":
        return {
          type: "text",
          sourceId: e,
          fileGuid: r,
          filePath: i,
          fileVersion: o,
          line: a,
          column: u,
          pos: l,
          len: s,
        }
      case "x":
        return {
          type: "expression",
          sourceId: e,
          fileGuid: r,
          filePath: i,
          fileVersion: o,
          line: a,
          column: u,
          pos: l,
          len: s,
        }
    }
  }
  function pi(e) {
    let t = []
    if (!e) return t
    for (let [n, r] of Object.entries(e)) {
      if (!Fu(n) || typeof r != "string") continue
      let o = n.split("-")
      if (o.length === 3) {
        let i = o[2],
          a = Cr(i, r)
        a && t.push(a)
      }
    }
    return t
  }
  function dt(e) {
    let t = ut(e)
    if (t) {
      let n = yr(t)
      if (n) {
        let r = pi(n)
        if (r.length > 0) return r
      }
    } else if (e != null && e.attributes) {
      let n = []
      for (let r = 0; r < e.attributes.length; r++) {
        let o = e.attributes[r]
        if (o != null && o.name.startsWith(ct)) {
          let i = o.name.split("-")[2],
            a = Cr(i, o.value)
          a && n.push(a)
        }
      }
      if (n.length > 0) return n
    }
  }
  function Sr(e) {
    var t
    return (t =
      e == null ? void 0 : e.getAttribute("data-fginspector-selected")) != null
      ? t
      : void 0
  }
  function Fu(e) {
    return e.startsWith(ct)
  }
  var fi = F(() => {
    Vt()
    br()
  })
  var mi = F(() => {
    Vt()
  })
  var Kt = F(() => {
    br()
    fi()
    mi()
    Vt()
  })
  function Xt(e, t) {
    var n, r, o, i
    return e.getLineBoxHeight(
      (n = t.fontFamily) != null ? n : "Times",
      (r = t.fontStretch) != null ? r : "100%",
      t.fontStyle === "italic" ? "italic" : "normal",
      (o = t.fontWeight) != null ? o : "400",
      (i = t.fontSize) != null ? i : "16px",
    )
  }
  function qt(e, t) {
    var n, r, o, i
    e.addFontFamily(
      (n = t.fontFamily) != null ? n : "Times",
      (r = t.fontStretch) != null ? r : "100%",
      t.fontStyle === "italic" ? "italic" : "normal",
      (o = t.fontWeight) != null ? o : "400",
      (i = t.fontSize) != null ? i : "16px",
    )
  }
  function hi(e) {
    if (!e.endsWith("%")) return e.toLowerCase()
    let t = parseFloat(e)
    return isNaN(t)
      ? "normal"
      : t <= 50
        ? "ultra-condensed"
        : t <= 62.5
          ? "extra-condensed"
          : t <= 75
            ? "condensed"
            : t <= 87.5
              ? "semi-condensed"
              : t <= 100
                ? "normal"
                : t <= 112.5
                  ? "semi-expanded"
                  : t <= 125
                    ? "expanded"
                    : t <= 150
                      ? "extra-expanded"
                      : "ultra-expanded"
  }
  function Au(e) {
    var o, i, a
    let t = [],
      n = /(?:"([^"]+)"|'([^']+)'|([^,\s][^,]*))/g,
      r
    for (; (r = n.exec(e)) !== null; ) {
      let u =
        (a = (i = (o = r[1]) != null ? o : r[2]) != null ? i : r[3]) == null
          ? void 0
          : a.trim()
      u && t.push(u)
    }
    return t
  }
  var Gt,
    wr = F(() => {
      Gt = class {
        constructor() {
          I(this, "families", new Map())
          I(this, "processedUsages", new Set())
          I(this, "lineBoxHeightCache", new Map())
          I(this, "unavailable", new Set())
          I(this, "_canvas", null)
          I(this, "_ctx", null)
        }
        get ctx() {
          return (
            this._ctx ||
              ((this._canvas = document.createElement("canvas")),
              (this._ctx = this._canvas.getContext("2d"))),
            this._ctx
          )
        }
        checkFontAvailable(t, n, r, o) {
          if (!this.ctx) return !1
          let i = "mmmmmmmmmmlli",
            a = "72px",
            u = hi(n),
            l = ["monospace", "sans-serif", "serif"]
          for (let s of l) {
            this.ctx.font = `${u} ${r} ${o} ${a} ${s}`
            let c = this.ctx.measureText(i).width
            this.ctx.font = `${u} ${r} ${o} ${a} "${t}", ${s}`
            let d = this.ctx.measureText(i).width
            if (c !== d) return !0
          }
          return !1
        }
        collectWebFontFaces() {}
        addFontFamily(t, n, r, o, i) {
          let a = Au(t)
          for (let u of a) {
            let l = u.toLowerCase(),
              s = `${l}|${n}|${r}|${o}`
            if (this.unavailable.has(s)) continue
            if (this.families.has(l)) {
              this.addUsage(l, n, r, o, i, t)
              return
            }
            if (!this.checkFontAvailable(u, n, r, o)) {
              this.unavailable.add(s)
              continue
            }
            this.families.set(l, { familyName: u, faces: [], usages: [] }),
              this.addUsage(l, n, r, o, i, t)
            return
          }
        }
        measureMetrics(t, n, r, o, i) {
          if (!this.ctx) return
          let a = this.families.get(t.toLowerCase())
          if (!a) return
          let u = hi(n)
          this.ctx.font = `${u} ${r} ${o} ${i} "${a.familyName}"`
          let l = this.ctx.measureText("Hg")
          return {
            fontBoundingBoxAscent: l.fontBoundingBoxAscent,
            fontBoundingBoxDescent: l.fontBoundingBoxDescent,
          }
        }
        getLineBoxHeight(t, n, r, o, i) {
          var u
          let a = `${t}|${n}|${r}|${o}|${i}`
          return (u = this.lineBoxHeightCache.get(a)) != null ? u : null
        }
        addUsage(t, n, r, o, i, a) {
          let u = `${t}|${n}|${r}|${o}|${i}`
          if (this.processedUsages.has(u)) return
          this.processedUsages.add(u)
          let l = this.families.get(t)
          if (!l) return
          let s = this.measureMetrics(t, n, r, o, i)
          if (
            (l.usages.push({
              fontWeight: o,
              fontStyle: r,
              fontStretch: n,
              fontSize: i,
              metrics: s,
            }),
            s)
          ) {
            let c = s.fontBoundingBoxAscent + s.fontBoundingBoxDescent,
              d = `${a}|${n}|${r}|${o}|${i}`
            this.lineBoxHeightCache.set(d, c)
          }
        }
        getFonts() {
          return this.collectWebFontFaces(), Object.fromEntries(this.families)
        }
      }
    })
  function gi(e, t, n) {
    Ru(e, n), Pu(e, n), _u(n, t)
  }
  function _u(e, t) {
    var r
    let n =
      (r = t.backgroundImage) == null ? void 0 : r.matchAll(/url\("(.*?)"\)/g)
    if (n) for (let [o, i] of n) e.addImage(i)
  }
  function Ru(e, t) {
    e instanceof HTMLImageElement && t.addImage(e.currentSrc)
  }
  function Pu(e, t) {
    e instanceof HTMLVideoElement &&
      (e.poster && t.addImage(e.poster),
      e.currentSrc && !Nu(e) && t.addVideo(e))
  }
  function Nu(e) {
    return e.poster
      ? e.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
          e.videoWidth === 0 ||
          (e.currentTime === 0 && e.paused)
      : !1
  }
  function Lu(e) {
    return x(this, null, function* () {
      let t = new AbortController()
      setTimeout(() => t.abort(), yi)
      let n = yield fetch(e, { signal: t.signal })
      if (!n.ok) throw new Error(`Failed to fetch image: ${e} - ${n.status}`)
      let r = yield n.blob()
      return Iu.has(r.type) && (r = yield Mu(r)), { url: e, blob: r }
    })
  }
  function Mu(e) {
    return x(this, null, function* () {
      let t = URL.createObjectURL(e)
      try {
        let n = new Image()
        ;(n.src = t), yield n.decode()
        let r = document.createElement("canvas")
        ;(r.width = n.naturalWidth), (r.height = n.naturalHeight)
        let o = r.getContext("2d")
        if (!o)
          throw new Error("Failed to get canvas context for image conversion")
        return o.drawImage(n, 0, 0), yield vr(r)
      } finally {
        URL.revokeObjectURL(t)
      }
    })
  }
  function vr(e) {
    return new Promise((t, n) => {
      e.toBlob(
        (r) => {
          r ? t(r) : n(new Error("Failed to create blob from canvas"))
        },
        "image/webp",
        1,
      )
    })
  }
  function Ou(e) {
    try {
      return new URL(e, window.location.href).origin === window.location.origin
    } catch (t) {
      return !1
    }
  }
  function Du(e) {
    return x(this, null, function* () {
      var r
      let t = (r = e.currentSrc) != null ? r : e.src
      if (Ou(t) || e.crossOrigin !== null) return null
      let n = document.createElement("video")
      return (
        (n.crossOrigin = "anonymous"),
        (n.src = t),
        (n.muted = !0),
        (n.preload = "auto"),
        (n.style.position = "absolute"),
        (n.style.visibility = "hidden"),
        (n.style.pointerEvents = "none"),
        new Promise((o, i) => {
          let a = e.currentTime,
            u = !1,
            l = !1,
            s = null,
            c = setTimeout(g, yi)
          n.addEventListener("error", E),
            a === 0
              ? ((u = !0),
                (s = n.requestVideoFrameCallback(p)),
                n
                  .play()
                  .then(() => n.pause())
                  .catch(E))
              : n.readyState >= HTMLMediaElement.HAVE_METADATA
                ? d()
                : n.addEventListener("loadedmetadata", d, { once: !0 })
          function d() {
            ;(n.currentTime = a),
              n.addEventListener("seeked", f, { once: !0 }),
              (s = n.requestVideoFrameCallback(p))
          }
          function p() {
            ;(l = !0), h()
          }
          function f() {
            ;(u = !0), h()
          }
          function h() {
            u && l && (S(), o(n))
          }
          function S() {
            clearTimeout(c),
              n.removeEventListener("error", E),
              n.removeEventListener("loadedmetadata", d),
              n.removeEventListener("seeked", f),
              s !== null && n.cancelVideoFrameCallback(s)
          }
          function E() {
            var C, v
            let b = new Error(
              `Video error: code: ${
                (C = n.error) == null ? void 0 : C.code
              }, message: ${
                (v = n.error) == null ? void 0 : v.message
              } (readyState: ${n.readyState})`,
            )
            S(), Er(n), i(b)
          }
          function g() {
            S(), Er(n), i(new xe("Video loading timeout", "VIDEO_TIMEOUT"))
          }
        })
      )
    })
  }
  function Er(e) {
    e.src = ""
  }
  function Bu(e) {
    return x(this, null, function* () {
      let t = yield Du(e),
        n = t != null ? t : e
      try {
        if (n.videoWidth === 0 || n.videoHeight === 0)
          throw new Error("Video has invalid dimensions")
        let r = document.createElement("canvas")
        ;(r.width = n.videoWidth), (r.height = n.videoHeight)
        let o = r.getContext("2d")
        if (!o) throw new Error("Failed to get canvas context")
        return o.drawImage(n, 0, 0), vr(r)
      } finally {
        t && Er(t)
      }
    })
  }
  function bi(e) {
    if (e.startsWith("data:") || e.startsWith("blob:")) return !1
    if (
      !e.startsWith("http://") &&
      !e.startsWith("https://") &&
      !e.startsWith("//")
    )
      return bi(window.location.href)
    try {
      let n = new URL(e, window.location.href).hostname
      return !(
        n === "0.0.0.0" ||
        n === "localhost" ||
        n.startsWith("127.") ||
        n === "[::1]" ||
        n === "::1" ||
        n.endsWith(".local")
      )
    } catch (t) {
      return !1
    }
  }
  var Yt,
    Iu,
    yi,
    Ci = F(() => {
      me()
      ;(Yt = class {
        constructor(t) {
          I(this, "promises", new Map())
          I(this, "rasterizedId", 0)
          I(this, "options")
          this.options = t
        }
        addPromise(t, n) {
          this.promises.set(
            t,
            n.catch((r) => ({ url: t, blob: null, error: r.toString() })),
          )
        }
        addImage(t) {
          if (!t || this.promises.has(t)) return
          let n =
            this.options.skipRemoteAssetSerialization && bi(t)
              ? Promise.resolve({ url: t, blob: null })
              : Lu(t)
          this.addPromise(t, n)
        }
        addCanvas(t) {
          let n = this.getRasterizedImageUrl(),
            r = vr(t).then((o) => ({ url: n, blob: o }))
          return this.addPromise(n, r), n
        }
        addVideo(t) {
          let n = t.currentSrc
          if (!n || this.promises.has(n)) return
          let r = Bu(t).then((o) => ({ url: n, blob: o }))
          this.addPromise(n, r)
        }
        getRasterizedImageUrl() {
          return `rasterized:${this.rasterizedId++}`
        }
        getBlobMap() {
          return x(this, null, function* () {
            let t = yield Promise.all(
              Array.from(this.promises, (o) =>
                x(this, [o], function* ([n, r]) {
                  return [n, yield r]
                }),
              ),
            )
            return new Map(t)
          })
        }
      }),
        (Iu = new Set(["image/avif", "image/heif", "image/heic"])),
        (yi = 8e3)
    })
  function wi(e) {
    let t = e.tagName
    return typeof t == "string"
      ? t.toUpperCase()
      : e instanceof HTMLFormElement
        ? "FORM"
        : null
  }
  function Ei(e, t) {
    var r, o
    if (!e) return null
    if (e === "open-quote" || e === "close-quote") {
      let i =
        t && t !== "auto"
          ? Array.from(t.matchAll(/"((?:[^"\\]|\\.)*)"/g), (a) => Si(a[1]))
          : ["\u201C", "\u201D", "\u2018", "\u2019"]
      return e === "open-quote"
        ? (r = i[0]) != null
          ? r
          : "\u201C"
        : (o = i[1]) != null
          ? o
          : "\u201D"
    }
    let n = e.match(/^"((?:[^"\\]|\\.)*)"/)
    return n ? Si(n[1]) : null
  }
  function Si(e) {
    return e.replace(/\\([0-9a-fA-F]{1,6})\s?|\\(.)/g, (t, n, r) => {
      if (!n) return r != null ? r : ""
      let o = parseInt(n, 16)
      return o <= 1114111 ? String.fromCodePoint(o) : "\uFFFD"
    })
  }
  var kr = F(() => {})
  function pt(e, t) {
    var a, u, l
    let n = {},
      r = window.getComputedStyle(e, t)
    if (
      (t === "::before" || t === "::after") &&
      (r.content === "none" ||
        r.content === "normal" ||
        r.content === "no-open-quote" ||
        r.content === "no-close-quote")
    )
      return null
    for (let [s, c] of Uu) {
      let d = r[s]
      d !== c && (n[s] = d)
    }
    let o = {},
      i = "computedStyleMap" in e && !t ? e.computedStyleMap() : null
    if (i) {
      for (let s of ju) {
        let c =
          (a = i == null ? void 0 : i.get(Jt[s])) == null
            ? void 0
            : a.toString()
        c && (c === Zt[s] ? delete n[s] : c !== n[s] && (o[s] = c))
      }
      for (let s of $u) {
        let c = (u = i.get(Jt[s])) == null ? void 0 : u.toString()
        c && c !== Zt[s] && c !== n[s] && (o[s] = c)
      }
      for (let s of zu)
        ((l = i.get(Jt[s])) == null ? void 0 : l.toString()) === "auto" &&
          (n[s] = "auto")
    }
    for (let s of Hu)
      n[s.width] == null && (delete n[s.style], delete n[s.color])
    return (
      n.outlineWidth == null && (delete n.outlineStyle, delete n.outlineColor),
      n.webkitTextFillColor != null &&
        n.webkitTextFillColor === r.color &&
        delete n.webkitTextFillColor,
      { styles: n, computedStyles: o }
    )
  }
  var ju,
    zu,
    Hu,
    $u,
    Zt,
    Uu,
    Jt,
    Ue,
    Qt = F(() => {
      ;(ju = [
        "width",
        "height",
        "minWidth",
        "maxWidth",
        "minHeight",
        "maxHeight",
      ]),
        (zu = ["marginTop", "marginRight", "marginBottom", "marginLeft"]),
        (Hu = [
          {
            style: "borderTopStyle",
            width: "borderTopWidth",
            color: "borderTopColor",
          },
          {
            style: "borderRightStyle",
            width: "borderRightWidth",
            color: "borderRightColor",
          },
          {
            style: "borderBottomStyle",
            width: "borderBottomWidth",
            color: "borderBottomColor",
          },
          {
            style: "borderLeftStyle",
            width: "borderLeftWidth",
            color: "borderLeftColor",
          },
        ]),
        ($u = [
          "gridTemplateColumns",
          "gridTemplateRows",
          "gridColumnStart",
          "gridColumnEnd",
          "gridRowStart",
          "gridRowEnd",
          "columnGap",
          "rowGap",
          "gridAutoFlow",
          "gridTemplateAreas",
          "gridAutoColumns",
          "gridAutoRows",
        ]),
        (Zt = {
          alignContent: "normal",
          alignItems: "normal",
          alignSelf: "auto",
          aspectRatio: "auto",
          backdropFilter: "none",
          backgroundAttachment: "scroll",
          backgroundBlendMode: "normal",
          backgroundClip: "border-box",
          backgroundColor: "rgba(0, 0, 0, 0)",
          backgroundImage: "none",
          backgroundOrigin: "padding-box",
          backgroundPositionX: "0%",
          backgroundPositionY: "0%",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          borderBottomColor: "rgb(0, 0, 0)",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomStyle: "none",
          borderBottomWidth: "0px",
          borderCollapse: "separate",
          borderImageOutset: "0",
          borderImageRepeat: "stretch",
          borderImageSlice: "100%",
          borderImageSource: "none",
          borderImageWidth: "1",
          borderLeftColor: "rgb(0, 0, 0)",
          borderLeftStyle: "none",
          borderLeftWidth: "0px",
          borderRightColor: "rgb(0, 0, 0)",
          borderRightStyle: "none",
          borderRightWidth: "0px",
          borderSpacing: "0px",
          borderTopColor: "rgb(0, 0, 0)",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderTopStyle: "none",
          borderTopWidth: "0px",
          bottom: "auto",
          boxShadow: "none",
          boxSizing: "content-box",
          clear: "none",
          clip: "auto",
          clipPath: "none",
          clipRule: "nonzero",
          color: "rgb(0, 0, 0)",
          colorScheme: "normal",
          columnCount: "auto",
          columnFill: "balance",
          columnGap: "normal",
          columnRuleColor: "rgb(0, 0, 0)",
          columnRuleStyle: "none",
          columnRuleWidth: "0px",
          columnSpan: "none",
          columnWidth: "auto",
          contain: "none",
          containerType: "normal",
          content: "normal",
          contentVisibility: "visible",
          display: "",
          filter: "none",
          flexBasis: "auto",
          flexDirection: "row",
          flexGrow: "0",
          flexShrink: "1",
          flexWrap: "nowrap",
          float: "none",
          fontFamily: "Times",
          fontFeatureSettings: "normal",
          fontKerning: "auto",
          fontOpticalSizing: "auto",
          fontPalette: "normal",
          fontSize: "16px",
          fontSizeAdjust: "none",
          fontStretch: "100%",
          fontStyle: "normal",
          fontWeight: "400",
          gridAutoColumns: "auto",
          gridAutoFlow: "row",
          gridAutoRows: "auto",
          gridColumnEnd: "auto",
          gridColumnStart: "auto",
          gridRowEnd: "auto",
          gridRowStart: "auto",
          gridTemplateAreas: "none",
          gridTemplateColumns: "none",
          gridTemplateRows: "none",
          height: "auto",
          isolation: "auto",
          justifyItems: "normal",
          justifySelf: "auto",
          justifyContent: "normal",
          left: "auto",
          letterSpacing: "normal",
          lineBreak: "auto",
          lineHeight: "normal",
          listStyleImage: "none",
          listStylePosition: "outside",
          listStyleType: "disc",
          marginBottom: "0px",
          marginLeft: "0px",
          marginRight: "0px",
          marginTop: "0px",
          maxHeight: "none",
          maxWidth: "none",
          minHeight: "auto",
          minWidth: "auto",
          mixBlendMode: "normal",
          objectFit: "fill",
          opacity: "1",
          order: "0",
          outlineColor: "rgb(0, 0, 0)",
          outlineOffset: "0px",
          outlineStyle: "none",
          outlineWidth: "0px",
          overflow: "visible",
          overflowX: "visible",
          overflowY: "visible",
          position: "static",
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          paddingTop: "0px",
          quotes: "auto",
          right: "auto",
          rowGap: "normal",
          strokeDasharray: "none",
          strokeDashoffset: "0px",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: "4",
          strokeOpacity: "1",
          strokeWidth: "1px",
          textAlign: "start",
          textDecorationColor: "rgb(0, 0, 0)",
          textDecorationLine: "none",
          textDecorationStyle: "solid",
          textIndent: "0px",
          textShadow: "none",
          textTransform: "none",
          textWrapStyle: "auto",
          top: "auto",
          perspective: "none",
          transform: "none",
          transformOrigin: "auto",
          translate: "none",
          transitionProperty: "all",
          verticalAlign: "baseline",
          visibility: "visible",
          webkitTextFillColor: "",
          whiteSpace: "normal",
          width: "auto",
          willChange: "auto",
          writingMode: "horizontal-tb",
          zIndex: "auto",
          rotate: "none",
          scale: "none",
        }),
        (Uu = Object.freeze(Object.entries(Zt))),
        (Jt = {}),
        (Ue = new Map())
      for (let e of Object.keys(Zt)) {
        let t = e.replace(/([A-Z])/g, "-$1").toLowerCase(),
          n = e.startsWith("webkit") ? `-${t}` : t
        ;(Jt[e] = n), Ue.set(n, e)
      }
    })
  function en(e, t, n) {
    if (e instanceof HTMLElement && (xi(t) || n))
      return { width: e.offsetWidth, height: e.offsetHeight }
    if (e instanceof HTMLElement) {
      let r = e.getBoundingClientRect()
      return { width: r.width, height: r.height }
    } else if (e instanceof SVGSVGElement) {
      let r = getComputedStyle(e)
      return {
        width: parseFloat(r.width) || e.width.baseVal.value,
        height: parseFloat(r.height) || e.height.baseVal.value,
      }
    } else if (e instanceof SVGGraphicsElement) {
      let r = e.getBBox()
      return { width: r.width, height: r.height }
    } else if (e instanceof MathMLElement) {
      let r = e.getBoundingClientRect()
      return { width: r.width, height: r.height }
    } else {
      if (e instanceof Text)
        throw new Error(
          "Text nodes should be handled separately with their range contexts, not as regular elements with dimensions",
        )
      return { width: 0, height: 0 }
    }
  }
  function vi(e, t) {
    return e.endsWith("%") ? `${(parseFloat(e) / 100) * t}px` : e
  }
  function Wu(e, t) {
    var a, u, l
    if (!t) return new DOMMatrix()
    let n = t.trim().split(/\s+/)
    if (n.length === 0) return new DOMMatrix()
    if (n.length > 3) throw new Error(`Invalid translate value: ${t}`)
    let r = vi((a = n[0]) != null ? a : "0px", e.width),
      o = vi((u = n[1]) != null ? u : "0px", e.height),
      i = (l = n[2]) != null ? l : "0px"
    return new DOMMatrix(`translate3d(${r}, ${o}, ${i})`)
  }
  function Vu(e) {
    var n, r
    if (!e) return new DOMMatrix()
    let t = e.trim().split(/\s+/)
    if (t.length === 0) return new DOMMatrix()
    if (t.length > 3) throw new Error(`Invalid scale value: ${e}`)
    return new DOMMatrix(
      `scale3d(${t[0]}, ${(n = t[1]) != null ? n : t[0]}, ${
        (r = t[2]) != null ? r : 1
      })`,
    )
  }
  function Ku(e) {
    if (!e) return new DOMMatrix()
    let t = e.trim().split(/\s+/)
    if (t.length === 0) return new DOMMatrix()
    if (t.length === 1) return new DOMMatrix(`rotate(${t[0]})`)
    if (t.length === 2)
      switch (t[0]) {
        case "x":
          return new DOMMatrix(`rotateX(${t[1]})`)
        case "y":
          return new DOMMatrix(`rotateY(${t[1]})`)
        case "z":
          return new DOMMatrix(`rotateZ(${t[1]})`)
        default:
          return new DOMMatrix()
      }
    return t.length === 4
      ? new DOMMatrix(`rotate3d(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]})`)
      : new DOMMatrix()
  }
  function tn(e, t) {
    var n, r, o
    if (!xi(t)) return null
    try {
      let [i = "0px", a = "0px", u = "0px"] =
          (r =
            (n = t.transformOrigin) == null ? void 0 : n.trim().split(/\s+/)) !=
          null
            ? r
            : [],
        l = new DOMMatrix(`translate3d(${i}, ${a}, ${u})`)
      return l
        .multiply(Wu(e, t.translate))
        .multiply(Ku(t.rotate))
        .multiply(Vu(t.scale))
        .multiply(new DOMMatrix((o = t.transform) != null ? o : "none"))
        .multiply(l.inverse())
    } catch (i) {
      return null
    }
  }
  function nn(e, t, n) {
    if (!t) return e
    try {
      let r = t.inverse()
      if (n) {
        let { x: o, y: i } = n
        r = new DOMMatrix().translate(o, i).multiply(r).translate(-o, -i)
      }
      return e ? r.multiply(e) : r
    } catch (r) {
      return e
    }
  }
  function Gu(e, t, n, r, o) {
    let i = new DOMPoint(e.x + e.width / 2, e.y + e.height / 2),
      a = new DOMPoint(t / 2, n / 2),
      u = r ? i.matrixTransform(r) : i,
      l = o ? a.matrixTransform(o) : a
    return { x: u.x - l.x, y: u.y - l.y }
  }
  function Xu(e) {
    return (
      Math.abs(e.a - 1) > 1e-6 ||
      Math.abs(e.b) > 1e-6 ||
      Math.abs(e.c) > 1e-6 ||
      Math.abs(e.d - 1) > 1e-6 ||
      Math.abs(e.e) > 1e-6 ||
      Math.abs(e.f) > 1e-6
    )
  }
  function rn(e, t, n, r) {
    let o = e.getBoundingClientRect()
    if (!r && !n) return { x: o.x, y: o.y, width: t.width, height: t.height }
    let i = Math.max(t.width, 0.01),
      a = Math.max(t.height, 0.01)
    try {
      let u = Gu(o, i, a, r, n),
        l = { x: u.x, y: u.y, width: t.width, height: t.height }
      if (n && Xu(n))
        try {
          let s = Yu(n, i, a, u)
          l.quad = s
        } catch (s) {}
      return l
    } catch (u) {
      return { x: o.x, y: o.y, width: t.width, height: t.height }
    }
  }
  function Ti(e) {
    let t = e.a * e.d - e.b * e.c
    return Math.abs(t) < 1e-10
      ? null
      : { a: e.d / t, b: -e.b / t, c: -e.c / t, d: e.a / t }
  }
  function qu(e, t, n) {
    let r = Math.abs(n.a),
      o = Math.abs(n.b),
      i = Math.abs(n.c),
      a = Math.abs(n.d),
      u = r * a - o * i
    if (Math.abs(u) < 1e-10) return null
    let l = (e * a - t * i) / u,
      s = (t * r - e * o) / u
    return l <= 0 || s <= 0 ? null : { width: l, height: s }
  }
  function Fi(e, t, n) {
    if (e.length === 0) return null
    let r = []
    for (let o of e) {
      let i = n(o)
      if (!i) continue
      let a = new DOMPoint(
        o.x + o.width / 2,
        o.y + o.height / 2,
      ).matrixTransform(t)
      r.push(
        new DOMRect(a.x - i.width / 2, a.y - i.height / 2, i.width, i.height),
      )
    }
    return r.length > 0 ? r : null
  }
  function Ai(e, t, n, r) {
    let o = Math.abs(n.a),
      i = Math.abs(n.b),
      a = Math.abs(n.c),
      u = Math.abs(n.d),
      l = o >= i
    return (l ? o : i) < 1e-10
      ? null
      : Fi(e, t, (c) => {
          let d = l ? (c.width - a * r) / o : (c.height - u * r) / i
          return d <= 0 ? null : { width: d, height: r }
        })
  }
  function _i(e, t, n) {
    return Fi(e, t, (r) => qu(r.width, r.height, n))
  }
  function Ri(e) {
    return e.length === 0
      ? null
      : e.reduce((t, n) => {
          let r = Math.min(t.x, n.x),
            o = Math.min(t.y, n.y)
          return new DOMRect(
            r,
            o,
            Math.max(t.x + t.width, n.x + n.width) - r,
            Math.max(t.y + t.height, n.y + n.height) - o,
          )
        })
  }
  function ki(e, t) {
    return new DOMQuad(
      e.p1.matrixTransform(t),
      e.p2.matrixTransform(t),
      e.p3.matrixTransform(t),
      e.p4.matrixTransform(t),
    )
  }
  function Yu(e, t, n, r) {
    let o = DOMQuad.fromQuad({
        p1: { x: 0, y: 0 },
        p2: { x: t, y: 0 },
        p3: { x: t, y: n },
        p4: { x: 0, y: n },
      }),
      i = ki(o, e),
      a = ki(i, new DOMMatrix().translate(r.x, r.y))
    return {
      p1: { x: a.p1.x, y: a.p1.y },
      p2: { x: a.p2.x, y: a.p2.y },
      p3: { x: a.p3.x, y: a.p3.y },
      p4: { x: a.p4.x, y: a.p4.y },
    }
  }
  var xi,
    on = F(() => {
      xi = (e) =>
        Boolean(
          (e.rotate && e.rotate !== "none") ||
            (e.scale && e.scale !== "none") ||
            (e.transform && e.transform !== "none") ||
            (e.translate && e.translate !== "none"),
        )
    })
  function an(e, t, n) {
    var p
    let r = document.createRange()
    if (Array.isArray(e)) {
      let f = e[0],
        h = e[e.length - 1]
      r.setStart(f, 0), r.setEnd(h, h.length)
    } else r.selectNode(e)
    let o = r.getBoundingClientRect(),
      i = Array.from(r.getClientRects()).filter(
        (f) => f.width > 0 || f.height > 0,
      ),
      a =
        r.commonAncestorContainer instanceof HTMLElement
          ? window
              .getComputedStyle(r.commonAncestorContainer)
              .writingMode.startsWith("vertical")
          : !1
    if ((r.detach(), i.length > 0 && t)) {
      let f = Ti(t)
      if (f) {
        let h = n != null ? Ai(i, t, f, n) : _i(i, t, f)
        if (h) {
          let { x: S, y: E, width: g, height: b } = (p = Ri(h)) != null ? p : o,
            C = Pi(h, a)
          return { x: S, y: E, width: g, height: b, lineCount: C }
        } else
          console.warn(
            "Failed to solve text bounding box with AABB method, falling back to DOMRect",
          )
      }
    }
    let { x: u, y: l, width: s, height: c } = o,
      d = Pi(i, a)
    return { x: u, y: l, width: s, height: c, lineCount: d }
  }
  function Pi(e, t) {
    let n = e
        .map((a) =>
          t ? { start: a.left, end: a.right } : { start: a.top, end: a.bottom },
        )
        .filter(({ start: a, end: u }) => u > a)
        .sort((a, u) => a.start - u.start),
      r = 1,
      o = 0,
      i = -1 / 0
    for (let { start: a, end: u } of n) {
      let l = (a + u) / 2
      Math.abs(l - i) >= r && (o++, (i = l))
    }
    return o
  }
  var xr = F(() => {
    on()
  })
  function Ju(e) {
    if (sn.has(e)) return
    let t = new CSSStyleSheet()
    t.insertRule(`[${Ni}]::before { content: none !important; }`),
      t.insertRule(`[${Ii}]::after { content: none !important; }`),
      (e.adoptedStyleSheets = [...e.adoptedStyleSheets, t]),
      sn.set(e, t)
  }
  function Tr() {
    for (let [e, t] of sn)
      try {
        e.adoptedStyleSheets = e.adoptedStyleSheets.filter((n) => n !== t)
      } catch (n) {}
    sn.clear()
  }
  function Fr(e, t, n, r, o) {
    var d
    let i = pt(e, t)
    if (i === null) return
    let { styles: a } = i,
      u = (d = a.content) != null ? d : "normal"
    qt(o, a)
    let l = e.getRootNode()
    if (!(l instanceof Document || l instanceof ShadowRoot)) return
    Ju(l)
    let s = document.createElement("span")
    ;(s.style.all = "initial"),
      Object.assign(s.style, a),
      s.style.removeProperty("content")
    let c = t === "::before" ? Ni : Ii
    try {
      e.setAttribute(c, ""),
        (s.textContent = Ei(u, a.quotes)),
        t === "::before" ? e.prepend(s) : t === "::after" && e.append(s)
      let f = en(s, a, r != null),
        h = tn(f, a),
        S = rn(s, f, h, r),
        E = nn(r, h, { x: S.x, y: S.y }),
        g = []
      for (let b of s.childNodes)
        if (b.nodeType === Node.TEXT_NODE) {
          let p = an(b, E != null ? E : null, Xt(o, a)),
            { lineCount: C } = p,
            v = q(p, ["lineCount"])
          g.push({
            nodeType: ft.TEXT_NODE,
            id: n + "-text",
            text: b.textContent || "",
            rect: v,
            lineCount: C,
          })
          break
        }
      return {
        nodeType: ft.ELEMENT_NODE,
        id: n,
        tag: "SPAN",
        attributes: {},
        styles: a,
        rect: S,
        childNodes: g,
      }
    } finally {
      s.remove(), e.removeAttribute(c)
    }
  }
  var Ni,
    Ii,
    sn,
    Li = F(() => {
      wr()
      kr()
      me()
      Qt()
      xr()
      on()
      ;(Ni = "data-h2d-suppress-before"),
        (Ii = "data-h2d-suppress-after"),
        (sn = new Map())
    })
  function Mi(e, t) {
    var r, o
    let n = ut(e)
    if (n == null) return t
    if (n._debugOwner) {
      for (
        ;
        n._debugOwner &&
        ((r = n._debugOwner.memoizedProps) == null ? void 0 : r._fgT) != null;
      )
        n = n._debugOwner
      let i = n._debugOwner ? Di(n._debugOwner) : void 0
      return i && Oi(i) ? i : t
    }
    return (o = Qu(n)) != null ? o : t
  }
  function Oi(e) {
    return (
      /^[A-Z].{2,}$/.test(e) &&
      !/^Primitive\./i.test(e) &&
      !/^Styled\./i.test(e) &&
      !/Provider$/i.test(e) &&
      !/Context$/i.test(e) &&
      e !== "__next_metadata_boundary__" &&
      !/^[a-zA-Z]+\(.*\)$/.test(e)
    )
  }
  function Qu(e) {
    var n
    let t = e.return
    for (; t; ) {
      if (t.tag === 5) return null
      if (Zu.has((n = t.tag) != null ? n : -1)) {
        let r = Di(t)
        if (r && Oi(r)) return r
      }
      t = t.return
    }
    return null
  }
  function Di(e) {
    var t, n
    if (typeof e.type == "string") return e.type
    if (typeof e.type == "function")
      return (t = e.type.displayName) != null ? t : e.type.name
    if (typeof e.type == "object" && e.type !== null) {
      let r = e.type
      return (n = r.displayName) != null ? n : r.name
    }
  }
  var Zu,
    Bi = F(() => {
      Kt()
      Zu = new Set([0, 1, 11, 14, 15])
    })
  function J(e) {
    return e >= 48 && e <= 57
  }
  function ht(e) {
    return J(e) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
  }
  function Yr(e) {
    return e >= 65 && e <= 90
  }
  function fc(e) {
    return e >= 97 && e <= 122
  }
  function mc(e) {
    return Yr(e) || fc(e)
  }
  function hc(e) {
    return e >= 128
  }
  function hn(e) {
    return mc(e) || hc(e) || e === 95
  }
  function ra(e) {
    return hn(e) || J(e) || e === 45
  }
  function gc(e) {
    return (e >= 0 && e <= 8) || e === 11 || (e >= 14 && e <= 31) || e === 127
  }
  function gn(e) {
    return e === 10 || e === 13 || e === 12
  }
  function yt(e) {
    return gn(e) || e === 32 || e === 9
  }
  function he(e, t) {
    return !(e !== 92 || gn(t) || t === 0)
  }
  function Ar(e, t, n) {
    return e === 45
      ? hn(t) || t === 45 || he(t, n)
      : hn(e)
        ? !0
        : e === 92
          ? he(e, t)
          : !1
  }
  function _r(e, t, n) {
    return e === 43 || e === 45
      ? J(t)
        ? 2
        : t === 46 && J(n)
          ? 3
          : 0
      : e === 46
        ? J(t)
          ? 2
          : 0
        : J(e)
          ? 1
          : 0
  }
  function oa(e) {
    return e === 65279 || e === 65534 ? 1 : 0
  }
  function Rr(e) {
    return e < 128 ? Hr[e] : Jr
  }
  function Ke(e, t) {
    return t < e.length ? e.charCodeAt(t) : 0
  }
  function $r(e, t, n) {
    return n === 13 && Ke(e, t + 1) === 10 ? 2 : 1
  }
  function sa(e, t, n) {
    let r = e.charCodeAt(t)
    return Yr(r) && (r = r | 32), r === n
  }
  function yn(e, t, n, r) {
    if (n - t !== r.length || t < 0 || n > e.length) return !1
    for (let o = t; o < n; o++) {
      let i = r.charCodeAt(o - t),
        a = e.charCodeAt(o)
      if ((Yr(a) && (a = a | 32), a !== i)) return !1
    }
    return !0
  }
  function bc(e, t) {
    for (; t >= 0 && yt(e.charCodeAt(t)); t--);
    return t + 1
  }
  function ln(e, t) {
    for (; t < e.length && yt(e.charCodeAt(t)); t++);
    return t
  }
  function Pr(e, t) {
    for (; t < e.length && J(e.charCodeAt(t)); t++);
    return t
  }
  function gt(e, t) {
    if (((t += 2), ht(Ke(e, t - 1)))) {
      for (let r = Math.min(e.length, t + 5); t < r && ht(Ke(e, t)); t++);
      let n = Ke(e, t)
      yt(n) && (t += $r(e, t, n))
    }
    return t
  }
  function un(e, t) {
    for (; t < e.length; t++) {
      let n = e.charCodeAt(t)
      if (!ra(n)) {
        if (he(n, Ke(e, t + 1))) {
          t = gt(e, t) - 1
          continue
        }
        break
      }
    }
    return t
  }
  function la(e, t) {
    let n = e.charCodeAt(t)
    if (
      ((n === 43 || n === 45) && (n = e.charCodeAt((t += 1))),
      J(n) && ((t = Pr(e, t + 1)), (n = e.charCodeAt(t))),
      n === 46 && J(e.charCodeAt(t + 1)) && ((t += 2), (t = Pr(e, t))),
      sa(e, t, 101))
    ) {
      let r = 0
      ;(n = e.charCodeAt(t + 1)),
        (n === 45 || n === 43) && ((r = 1), (n = e.charCodeAt(t + 2))),
        J(n) && (t = Pr(e, t + 1 + r + 1))
    }
    return t
  }
  function Nr(e, t) {
    for (; t < e.length; t++) {
      let n = e.charCodeAt(t)
      if (n === 41) {
        t++
        break
      }
      he(n, Ke(e, t + 1)) && (t = gt(e, t))
    }
    return t
  }
  function Cc(e) {
    if (e.length === 1 && !ht(e.charCodeAt(0))) return e[0]
    let t = parseInt(e, 16)
    return (
      (t === 0 || (t >= 55296 && t <= 57343) || t > 1114111) && (t = 65533),
      String.fromCodePoint(t)
    )
  }
  function bn(e = null, t) {
    return e === null || e.length < t
      ? new Uint32Array(Math.max(t + 1024, 16384))
      : e
  }
  function Hi(e) {
    let t = e.source,
      n = t.length,
      r = t.length > 0 ? oa(t.charCodeAt(0)) : 0,
      o = bn(e.lines, n),
      i = bn(e.columns, n),
      a = e.startLine,
      u = e.startColumn
    for (let l = r; l < n; l++) {
      let s = t.charCodeAt(l)
      ;(o[l] = a),
        (i[l] = u++),
        (s === ji || s === zi || s === Sc) &&
          (s === zi &&
            l + 1 < n &&
            t.charCodeAt(l + 1) === ji &&
            (l++, (o[l] = a), (i[l] = u)),
          a++,
          (u = 1))
    }
    ;(o[n] = a), (i[n] = u), (e.lines = o), (e.columns = i), (e.computed = !0)
  }
  function ca(e, t) {
    function n(d) {
      return d < u ? e.charCodeAt(d) : 0
    }
    function r() {
      if (((s = la(e, s)), Ar(n(s), n(s + 1), n(s + 2)))) {
        ;(c = 12), (s = un(e, s))
        return
      }
      if (n(s) === 37) {
        ;(c = 11), s++
        return
      }
      c = 10
    }
    function o() {
      let d = s
      if (((s = un(e, s)), yn(e, d, s, "url") && n(s) === 40)) {
        if (((s = ln(e, s + 1)), n(s) === 34 || n(s) === 39)) {
          ;(c = 2), (s = d + 4)
          return
        }
        a()
        return
      }
      if (n(s) === 40) {
        ;(c = 2), s++
        return
      }
      c = 1
    }
    function i(d) {
      for (d || (d = n(s++)), c = 5; s < e.length; s++) {
        let p = e.charCodeAt(s)
        switch (Rr(p)) {
          case d:
            s++
            return
          case dn:
            if (gn(p)) {
              ;(s += $r(e, s, p)), (c = 6)
              return
            }
            break
          case 92:
            if (s === e.length - 1) break
            let f = n(s + 1)
            gn(f) ? (s += $r(e, s + 1, f)) : he(p, f) && (s = gt(e, s) - 1)
            break
        }
      }
    }
    function a() {
      for (c = 7, s = ln(e, s); s < e.length; s++) {
        let d = e.charCodeAt(s)
        switch (Rr(d)) {
          case 41:
            s++
            return
          case dn:
            if (((s = ln(e, s)), n(s) === 41 || s >= e.length)) {
              s < e.length && s++
              return
            }
            ;(s = Nr(e, s)), (c = 8)
            return
          case 34:
          case 39:
          case 40:
          case aa:
            ;(s = Nr(e, s)), (c = 8)
            return
          case 92:
            if (he(d, n(s + 1))) {
              s = gt(e, s) - 1
              break
            }
            ;(s = Nr(e, s)), (c = 8)
            return
        }
      }
    }
    e = String(e || "")
    let u = e.length,
      l = oa(n(0)),
      s = l,
      c
    for (; s < u; ) {
      let d = e.charCodeAt(s)
      switch (Rr(d)) {
        case dn:
          ;(c = 13), (s = ln(e, s + 1))
          break
        case 34:
          i()
          break
        case 35:
          ra(n(s + 1)) || he(n(s + 1), n(s + 2))
            ? ((c = 4), (s = un(e, s + 1)))
            : ((c = 9), s++)
          break
        case 39:
          i()
          break
        case 40:
          ;(c = 21), s++
          break
        case 41:
          ;(c = 22), s++
          break
        case 43:
          _r(d, n(s + 1), n(s + 2)) ? r() : ((c = 9), s++)
          break
        case 44:
          ;(c = 18), s++
          break
        case 45:
          _r(d, n(s + 1), n(s + 2))
            ? r()
            : n(s + 1) === 45 && n(s + 2) === 62
              ? ((c = 15), (s = s + 3))
              : Ar(d, n(s + 1), n(s + 2))
                ? o()
                : ((c = 9), s++)
          break
        case 46:
          _r(d, n(s + 1), n(s + 2)) ? r() : ((c = 9), s++)
          break
        case 47:
          n(s + 1) === 42
            ? ((c = 25),
              (s = e.indexOf("*/", s + 2)),
              (s = s === -1 ? e.length : s + 2))
            : ((c = 9), s++)
          break
        case 58:
          ;(c = 16), s++
          break
        case 59:
          ;(c = 17), s++
          break
        case 60:
          n(s + 1) === 33 && n(s + 2) === 45 && n(s + 3) === 45
            ? ((c = 14), (s = s + 4))
            : ((c = 9), s++)
          break
        case 64:
          Ar(n(s + 1), n(s + 2), n(s + 3))
            ? ((c = 3), (s = un(e, s + 1)))
            : ((c = 9), s++)
          break
        case 91:
          ;(c = 19), s++
          break
        case 92:
          he(d, n(s + 1)) ? o() : ((c = 9), s++)
          break
        case 93:
          ;(c = 20), s++
          break
        case 123:
          ;(c = 23), s++
          break
        case 125:
          ;(c = 24), s++
          break
        case ia:
          r()
          break
        case Jr:
          o()
          break
        default:
          ;(c = 9), s++
      }
      t(c, l, (l = s))
    }
  }
  function xc(e) {
    let t = new kc.SourceMapGenerator(),
      n = { line: 1, column: 0 },
      r = { line: 0, column: 0 },
      o = { line: 1, column: 0 },
      i = { generated: o },
      a = 1,
      u = 0,
      l = !1,
      s = e.node
    e.node = function (p) {
      if (p.loc && p.loc.start && $i.has(p.type)) {
        let f = p.loc.start.line,
          h = p.loc.start.column - 1
        ;(r.line !== f || r.column !== h) &&
          ((r.line = f),
          (r.column = h),
          (n.line = a),
          (n.column = u),
          l &&
            ((l = !1),
            (n.line !== o.line || n.column !== o.column) && t.addMapping(i)),
          (l = !0),
          t.addMapping({ source: p.loc.source, original: r, generated: n }))
      }
      s.call(this, p), l && $i.has(p.type) && ((o.line = a), (o.column = u))
    }
    let c = e.emit
    e.emit = function (p, f, h) {
      for (let S = 0; S < p.length; S++)
        p.charCodeAt(S) === 10 ? (a++, (u = 0)) : u++
      c(p, f, h)
    }
    let d = e.result
    return (
      (e.result = function () {
        return l && t.addMapping(i), { css: d(), map: t }
      }),
      e
    )
  }
  function pa(e) {
    let t = new Set(e.map(([n, r]) => (Ir(n) << 16) | Ir(r)))
    return function (n, r, o) {
      let i = Ir(r, o),
        a = o.charCodeAt(0)
      return (
        ((a === Fc && r !== 1 && r !== 2 && r !== 15) || a === Tc
          ? t.has((n << 16) | (a << 8))
          : t.has((n << 16) | i)) && this.emit(" ", 13, !0),
        i
      )
    }
  }
  function Pc(e, t) {
    if (typeof t == "function") {
      let n = null
      e.children.forEach((r) => {
        n !== null && t.call(this, n), this.node(r), (n = r)
      })
      return
    }
    e.children.forEach(this.node, this)
  }
  function Nc(e) {
    ca(e, (t, n, r) => {
      this.token(t, e.slice(n, r))
    })
  }
  function Ic(e) {
    let t = new Map()
    for (let [n, r] of Object.entries(e.node))
      typeof (r.generate || r) == "function" && t.set(n, r.generate || r)
    return function (n, r) {
      let o = "",
        i = 0,
        a = {
          node(l) {
            if (t.has(l.type)) t.get(l.type).call(u, l)
            else throw new Error("Unknown node type: " + l.type)
          },
          tokenBefore: fa,
          token(l, s) {
            ;(i = this.tokenBefore(i, l, s)),
              this.emit(s, l, !1),
              l === 9 &&
                s.charCodeAt(0) === Rc &&
                this.emit(
                  `
`,
                  13,
                  !0,
                )
          },
          emit(l) {
            o += l
          },
          result() {
            return o
          },
        }
      r &&
        (typeof r.decorator == "function" && (a = r.decorator(a)),
        r.sourceMap && (a = xc(a)),
        r.mode in Ur && (a.tokenBefore = Ur[r.mode]))
      let u = {
        node: (l) => a.node(l),
        children: Pc,
        token: (l, s) => a.token(l, s),
        tokenize: Nc,
      }
      return a.node(n), a.result()
    }
  }
  function fn(e, t) {
    let n = this.tokenStart + e,
      r = this.charCodeAt(n)
    for (
      (r === ie || r === Y) &&
      (t && this.error("Number sign is not allowed"), n++);
      n < this.tokenEnd;
      n++
    )
      J(this.charCodeAt(n)) || this.error("Integer is expected", n)
  }
  function Ve(e) {
    return fn.call(this, 0, e)
  }
  function Se(e, t) {
    if (!this.cmpChar(this.tokenStart + e, t)) {
      let n = ""
      switch (t) {
        case pn:
          n = "N is expected"
          break
        case Y:
          n = "HyphenMinus is expected"
          break
      }
      this.error(n, this.tokenStart + e)
    }
  }
  function Lr() {
    let e = 0,
      t = 0,
      n = this.tokenType
    for (; n === 13 || n === 25; ) n = this.lookupType(++e)
    if (n !== 10)
      if (this.isDelim(ie, e) || this.isDelim(Y, e)) {
        t = this.isDelim(ie, e) ? ie : Y
        do n = this.lookupType(++e)
        while (n === 13 || n === 25)
        n !== 10 && (this.skip(e), Ve.call(this, Fe))
      } else return null
    return (
      e > 0 && this.skip(e),
      t === 0 &&
        ((n = this.charCodeAt(this.tokenStart)),
        n !== ie && n !== Y && this.error("Number sign is expected")),
      Ve.call(this, t !== 0),
      t === Y ? "-" + this.consume(10) : this.consume(10)
    )
  }
  function Mc() {
    let e = this.tokenStart,
      t = null,
      n = null
    if (this.tokenType === 10) Ve.call(this, Lc), (n = this.consume(10))
    else if (this.tokenType === 1 && this.cmpChar(this.tokenStart, Y))
      switch (
        ((t = "-1"), Se.call(this, 1, pn), this.tokenEnd - this.tokenStart)
      ) {
        case 2:
          this.next(), (n = Lr.call(this))
          break
        case 3:
          Se.call(this, 2, Y),
            this.next(),
            this.skipSC(),
            Ve.call(this, Fe),
            (n = "-" + this.consume(10))
          break
        default:
          Se.call(this, 2, Y),
            fn.call(this, 3, Fe),
            this.next(),
            (n = this.substrToCursor(e + 2))
      }
    else if (
      this.tokenType === 1 ||
      (this.isDelim(ie) && this.lookupType(1) === 1)
    ) {
      let r = 0
      switch (
        ((t = "1"),
        this.isDelim(ie) && ((r = 1), this.next()),
        Se.call(this, 0, pn),
        this.tokenEnd - this.tokenStart)
      ) {
        case 1:
          this.next(), (n = Lr.call(this))
          break
        case 2:
          Se.call(this, 1, Y),
            this.next(),
            this.skipSC(),
            Ve.call(this, Fe),
            (n = "-" + this.consume(10))
          break
        default:
          Se.call(this, 1, Y),
            fn.call(this, 2, Fe),
            this.next(),
            (n = this.substrToCursor(e + r + 1))
      }
    } else if (this.tokenType === 12) {
      let r = this.charCodeAt(this.tokenStart),
        o = r === ie || r === Y,
        i = this.tokenStart + o
      for (; i < this.tokenEnd && J(this.charCodeAt(i)); i++);
      i === this.tokenStart + o &&
        this.error("Integer is expected", this.tokenStart + o),
        Se.call(this, i - this.tokenStart, pn),
        (t = this.substring(e, i)),
        i + 1 === this.tokenEnd
          ? (this.next(), (n = Lr.call(this)))
          : (Se.call(this, i - this.tokenStart + 1, Y),
            i + 2 === this.tokenEnd
              ? (this.next(),
                this.skipSC(),
                Ve.call(this, Fe),
                (n = "-" + this.consume(10)))
              : (fn.call(this, i - this.tokenStart + 2, Fe),
                this.next(),
                (n = this.substrToCursor(i + 1))))
    } else this.error()
    return (
      t !== null && t.charCodeAt(0) === ie && (t = t.substr(1)),
      n !== null && n.charCodeAt(0) === ie && (n = n.substr(1)),
      { type: "AnPlusB", loc: this.getLocation(e, this.tokenStart), a: t, b: n }
    )
  }
  function Oc(e) {
    if (e.a) {
      let t =
        (e.a === "+1" && "n") ||
        (e.a === "1" && "n") ||
        (e.a === "-1" && "-n") ||
        e.a + "n"
      if (e.b) {
        let n = e.b[0] === "-" || e.b[0] === "+" ? e.b : "+" + e.b
        this.tokenize(t + n)
      } else this.tokenize(t)
    } else this.tokenize(e.b)
  }
  function Dc(e) {
    this.token(3, "@" + e.name),
      e.prelude !== null && this.node(e.prelude),
      e.block
        ? (this.token(23, "{"), this.node(e.block), this.token(24, "}"))
        : this.token(17, ";")
  }
  function Bc(e) {
    this.children(e)
  }
  function $c() {
    this.eof && this.error("Unexpected end of input")
    let e = this.tokenStart,
      t = !1
    return (
      this.isDelim(ha)
        ? ((t = !0), this.next())
        : this.isDelim(Wr) || this.eat(1),
      this.isDelim(Wr)
        ? this.charCodeAt(this.tokenStart + 1) !== mn
          ? (this.next(), this.eat(1))
          : t && this.error("Identifier is expected", this.tokenEnd)
        : t && this.error("Vertical line is expected"),
      {
        type: "Identifier",
        loc: this.getLocation(e, this.tokenStart),
        name: this.substrToCursor(e),
      }
    )
  }
  function Uc() {
    let e = this.tokenStart,
      t = this.charCodeAt(e)
    return (
      t !== mn &&
        t !== Hc &&
        t !== zc &&
        t !== jc &&
        t !== ha &&
        t !== Wr &&
        this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),
      this.next(),
      t !== mn &&
        (this.isDelim(mn) || this.error("Equal sign is expected"), this.next()),
      this.substrToCursor(e)
    )
  }
  function Wc() {
    let e = this.tokenStart,
      t,
      n = null,
      r = null,
      o = null
    return (
      this.eat(19),
      this.skipSC(),
      (t = $c.call(this)),
      this.skipSC(),
      this.tokenType !== 20 &&
        (this.tokenType !== 1 &&
          ((n = Uc.call(this)),
          this.skipSC(),
          (r = this.tokenType === 5 ? this.String() : this.Identifier()),
          this.skipSC()),
        this.tokenType === 1 && ((o = this.consume(1)), this.skipSC())),
      this.eat(20),
      {
        type: "AttributeSelector",
        loc: this.getLocation(e, this.tokenStart),
        name: t,
        matcher: n,
        value: r,
        flags: o,
      }
    )
  }
  function Vc(e) {
    this.token(9, "["),
      this.node(e.name),
      e.matcher !== null && (this.tokenize(e.matcher), this.node(e.value)),
      e.flags !== null && this.token(1, e.flags),
      this.token(9, "]")
  }
  function Kc(e) {
    this.children(e, (t) => {
      t.type === "Declaration" && this.token(17, ";")
    })
  }
  function Gc(e) {
    this.token(9, "["), this.children(e), this.token(9, "]")
  }
  function Xc() {
    this.token(15, "-->")
  }
  function qc() {
    this.token(14, "<!--")
  }
  function Jc() {
    return (
      this.eatDelim(Yc),
      {
        type: "ClassSelector",
        loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
        name: this.consume(1),
      }
    )
  }
  function Zc(e) {
    this.token(9, "."), this.token(1, e.name)
  }
  function nd() {
    let e = this.tokenStart,
      t
    switch (this.tokenType) {
      case 13:
        t = " "
        break
      case 9:
        switch (this.charCodeAt(this.tokenStart)) {
          case ed:
          case Qc:
          case td:
            this.next()
            break
          case Ui:
            this.next(), this.eatIdent("deep"), this.eatDelim(Ui)
            break
          default:
            this.error("Combinator is expected")
        }
        t = this.substrToCursor(e)
        break
    }
    return {
      type: "Combinator",
      loc: this.getLocation(e, this.tokenStart),
      name: t,
    }
  }
  function rd(e) {
    this.tokenize(e.name)
  }
  function od(e) {
    this.token(25, "/*" + e.value + "*/")
  }
  function id(e) {
    e.children.forEach((t) => {
      t.type === "Condition"
        ? (this.token(21, "("), this.node(t), this.token(22, ")"))
        : this.node(t)
    })
  }
  function ad(e) {
    this.token(1, e.property),
      this.token(16, ":"),
      this.node(e.value),
      e.important &&
        (this.token(9, "!"),
        this.token(1, e.important === !0 ? "important" : e.important))
  }
  function sd(e) {
    this.children(e, (t) => {
      t.type === "Declaration" && this.token(17, ";")
    })
  }
  function ld(e) {
    this.token(12, e.value + e.unit)
  }
  function ud(e) {
    this.token(21, "("),
      this.token(1, e.name),
      e.value !== null && (this.token(16, ":"), this.node(e.value)),
      this.token(22, ")")
  }
  function cd(e) {
    this.token(2, e.feature + "("), this.node(e.value), this.token(22, ")")
  }
  function dd(e) {
    this.token(21, "("),
      this.node(e.left),
      this.tokenize(e.leftComparison),
      this.node(e.middle),
      e.right && (this.tokenize(e.rightComparison), this.node(e.right)),
      this.token(22, ")")
  }
  function pd(e) {
    this.token(2, e.name + "("), this.children(e), this.token(22, ")")
  }
  function fd(e) {
    e.function ? this.token(2, e.function + "(") : this.token(21, "("),
      this.children(e),
      this.token(22, ")")
  }
  function md(e) {
    this.token(4, "#" + e.value)
  }
  function hd() {
    return {
      type: "Identifier",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      name: this.consume(1),
    }
  }
  function gd(e) {
    this.token(1, e.name)
  }
  function yd() {
    let e = this.tokenStart
    return (
      this.eat(4),
      {
        type: "IdSelector",
        loc: this.getLocation(e, this.tokenStart),
        name: this.substrToCursor(e + 1),
      }
    )
  }
  function bd(e) {
    this.token(9, "#" + e.name)
  }
  function Cd(e) {
    this.tokenize(e.name)
  }
  function Sd(e) {
    this.children(e, () => this.token(18, ","))
  }
  function wd(e) {
    e.mediaType
      ? (e.modifier && this.token(1, e.modifier),
        this.token(1, e.mediaType),
        e.condition && (this.token(1, "and"), this.node(e.condition)))
      : e.condition && this.node(e.condition)
  }
  function Ed(e) {
    this.children(e, () => this.token(18, ","))
  }
  function kd() {
    let e = this.tokenStart
    return (
      this.eatDelim(vd),
      { type: "NestingSelector", loc: this.getLocation(e, this.tokenStart) }
    )
  }
  function xd() {
    this.token(9, "&")
  }
  function Td() {
    this.skipSC()
    let e = this.tokenStart,
      t = e,
      n = null,
      r
    return (
      this.lookupValue(0, "odd") || this.lookupValue(0, "even")
        ? (r = this.Identifier())
        : (r = this.AnPlusB()),
      (t = this.tokenStart),
      this.skipSC(),
      this.lookupValue(0, "of") &&
        (this.next(), (n = this.SelectorList()), (t = this.tokenStart)),
      { type: "Nth", loc: this.getLocation(e, t), nth: r, selector: n }
    )
  }
  function Fd(e) {
    this.node(e.nth),
      e.selector !== null && (this.token(1, "of"), this.node(e.selector))
  }
  function Ad(e) {
    this.token(10, e.value)
  }
  function _d() {
    let e = this.tokenStart
    return (
      this.next(),
      {
        type: "Operator",
        loc: this.getLocation(e, this.tokenStart),
        value: this.substrToCursor(e),
      }
    )
  }
  function Rd(e) {
    this.tokenize(e.value)
  }
  function Pd(e) {
    this.token(21, "("), this.children(e), this.token(22, ")")
  }
  function Nd() {
    return {
      type: "Percentage",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consumeNumber(11),
    }
  }
  function Id(e) {
    this.token(11, e.value + "%")
  }
  function Ld() {
    let e = this.tokenStart,
      t = null,
      n,
      r
    return (
      this.eat(16),
      this.tokenType === 2
        ? ((n = this.consumeFunctionName()),
          (r = n.toLowerCase()),
          this.lookupNonWSType(0) == 22
            ? (t = this.createList())
            : hasOwnProperty.call(this.pseudo, r)
              ? (this.skipSC(), (t = this.pseudo[r].call(this)), this.skipSC())
              : ((t = this.createList()), t.push(this.Raw(null, !1))),
          this.eat(22))
        : (n = this.consume(1)),
      {
        type: "PseudoClassSelector",
        loc: this.getLocation(e, this.tokenStart),
        name: n,
        children: t,
      }
    )
  }
  function Md(e) {
    this.token(16, ":"),
      e.children === null
        ? this.token(1, e.name)
        : (this.token(2, e.name + "("), this.children(e), this.token(22, ")"))
  }
  function Od() {
    let e = this.tokenStart,
      t = null,
      n,
      r
    return (
      this.eat(16),
      this.eat(16),
      this.tokenType === 2
        ? ((n = this.consumeFunctionName()),
          (r = n.toLowerCase()),
          this.lookupNonWSType(0) == 22
            ? (t = this.createList())
            : hasOwnProperty.call(this.pseudo, r)
              ? (this.skipSC(), (t = this.pseudo[r].call(this)), this.skipSC())
              : ((t = this.createList()), t.push(this.Raw(null, !1))),
          this.eat(22))
        : (n = this.consume(1)),
      {
        type: "PseudoElementSelector",
        loc: this.getLocation(e, this.tokenStart),
        name: n,
        children: t,
      }
    )
  }
  function Dd(e) {
    this.token(16, ":"),
      this.token(16, ":"),
      e.children === null
        ? this.token(1, e.name)
        : (this.token(2, e.name + "("), this.children(e), this.token(22, ")"))
  }
  function Bd(e) {
    this.node(e.left),
      this.token(9, "/"),
      e.right ? this.node(e.right) : this.node(10, 1)
  }
  function jd() {
    return this.tokenIndex > 0 && this.lookupType(-1) === 13
      ? this.tokenIndex > 1
        ? this.getTokenStart(this.tokenIndex - 1)
        : this.firstCharOffset
      : this.tokenStart
  }
  function zd(e, t) {
    let n = this.getTokenStart(this.tokenIndex),
      r
    return (
      this.skipUntilBalanced(this.tokenIndex, e || this.consumeUntilBalanceEnd),
      t && this.tokenStart > n ? (r = jd.call(this)) : (r = this.tokenStart),
      { type: "Raw", loc: this.getLocation(n, r), value: this.substring(n, r) }
    )
  }
  function Hd(e) {
    this.tokenize(e.value)
  }
  function $d(e) {
    this.node(e.prelude),
      this.token(23, "{"),
      this.node(e.block),
      this.token(24, "}")
  }
  function Ud(e) {
    e.root && (this.token(21, "("), this.node(e.root), this.token(22, ")")),
      e.limit &&
        (this.token(1, "to"),
        this.token(21, "("),
        this.node(e.limit),
        this.token(22, ")"))
  }
  function Wd() {
    let e = this.readSequence(this.scope.Selector)
    return (
      this.getFirstListNode(e) === null && this.error("Selector is expected"),
      { type: "Selector", loc: this.getLocationFromList(e), children: e }
    )
  }
  function Vd(e) {
    this.children(e)
  }
  function Kd() {
    let e = this.createList()
    for (; !this.eof; ) {
      if ((e.push(this.Selector()), this.tokenType === 18)) {
        this.next()
        continue
      }
      break
    }
    return {
      type: "SelectorList",
      loc: this.getLocationFromList(e),
      children: e,
    }
  }
  function Gd(e) {
    this.children(e, () => this.token(18, ","))
  }
  function Xd(e) {
    let t = e.length,
      n = e.charCodeAt(0),
      r = n === ga || n === ya ? 1 : 0,
      o = r === 1 && t > 1 && e.charCodeAt(t - 1) === n ? t - 2 : t - 1,
      i = ""
    for (let a = r; a <= o; a++) {
      let u = e.charCodeAt(a)
      if (u === Vr) {
        if (a === o) {
          a !== t - 1 && (i = e.substr(a + 1))
          break
        }
        if (((u = e.charCodeAt(++a)), he(Vr, u))) {
          let l = a - 1,
            s = gt(e, l)
          ;(a = s - 1), (i += Cc(e.substring(l + 1, s)))
        } else u === 13 && e.charCodeAt(a + 1) === 10 && a++
      } else i += e[a]
    }
    return i
  }
  function qd(e, t) {
    let n = t ? "'" : '"',
      r = t ? ya : ga,
      o = "",
      i = !1
    for (let a = 0; a < e.length; a++) {
      let u = e.charCodeAt(a)
      if (u === 0) {
        o += "\uFFFD"
        continue
      }
      if (u <= 31 || u === 127) {
        ;(o += "\\" + u.toString(16)), (i = !0)
        continue
      }
      u === r || u === Vr
        ? ((o += "\\" + e.charAt(a)), (i = !1))
        : (i && (ht(u) || yt(u)) && (o += " "), (o += e.charAt(a)), (i = !1))
    }
    return n + o + n
  }
  function Yd() {
    return {
      type: "String",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: Xd(this.consume(5)),
    }
  }
  function Jd(e) {
    this.token(5, qd(e.value))
  }
  function Zd(e) {
    this.children(e)
  }
  function Qd(e) {
    this.token(21, "("), this.node(e.declaration), this.token(22, ")")
  }
  function Mr() {
    this.tokenType !== 1 &&
      this.isDelim(ep) === !1 &&
      this.error("Identifier or asterisk is expected"),
      this.next()
  }
  function tp() {
    let e = this.tokenStart
    return (
      this.isDelim(Wi)
        ? (this.next(), Mr.call(this))
        : (Mr.call(this), this.isDelim(Wi) && (this.next(), Mr.call(this))),
      {
        type: "TypeSelector",
        loc: this.getLocation(e, this.tokenStart),
        name: this.substrToCursor(e),
      }
    )
  }
  function np(e) {
    this.tokenize(e.name)
  }
  function rp(e) {
    this.tokenize(e.value)
  }
  function cp(e) {
    let t = "",
      n = !1
    for (let r = 0; r < e.length; r++) {
      let o = e.charCodeAt(r)
      if (o === 0) {
        t += "\uFFFD"
        continue
      }
      if (o <= 31 || o === 127) {
        ;(t += "\\" + o.toString(16)), (n = !0)
        continue
      }
      o === op || o === ip || o === ap || o === sp || o === lp || o === up
        ? ((t += "\\" + e.charAt(r)), (n = !1))
        : (n && ht(o) && (t += " "), (t += e.charAt(r)), (n = !1))
    }
    return "url(" + t + ")"
  }
  function dp(e) {
    this.token(7, cp(e.value))
  }
  function pp(e) {
    this.children(e)
  }
  function fp(e) {
    this.token(13, e.value)
  }
  function gp(e, t) {
    let n = Object.create(SyntaxError.prototype),
      r = new Error()
    return Object.assign(n, {
      name: e,
      message: t,
      get stack() {
        return (r.stack || "").replace(
          /^(.+\n){1,3}/,
          `${e}: ${t}
`,
        )
      },
    })
  }
  function Gi(
    { source: e, line: t, column: n, baseLine: r, baseColumn: o },
    i,
  ) {
    function a(h, S) {
      return s
        .slice(h, S)
        .map((E, g) => String(h + g + 1).padStart(p) + " |" + E)
        .join(`
`)
    }
    let u = `
`.repeat(Math.max(r - 1, 0)),
      l = " ".repeat(Math.max(o - 1, 0)),
      s = (u + l + e).split(/\r\n?|\n|\f/),
      c = Math.max(1, t - i) - 1,
      d = Math.min(t + i, s.length + 1),
      p = Math.max(4, String(d).length) + 1,
      f = 0
    ;(n +=
      (Ki.length - 1) * (s[t - 1].substr(0, n - 1).match(/\t/g) || []).length),
      n > Or && ((f = n - Vi + 3), (n = Vi - 2))
    for (let h = c; h <= d; h++)
      h >= 0 &&
        h < s.length &&
        ((s[h] = s[h].replace(/\t/g, Ki)),
        (s[h] =
          (f > 0 && s[h].length > f ? "\u2026" : "") +
          s[h].substr(f, Or - 2) +
          (s[h].length > f + Or - 1 ? "\u2026" : "")))
    return [a(c, t), new Array(n + p + 2).join("-") + "^", a(t, d)]
      .filter(Boolean)
      .join(`
`)
      .replace(/^(\s+\d+\s+\|\n)+/, "")
      .replace(/\n(\s+\d+\s+\|)+$/, "")
  }
  function Xi(e, t, n, r, o, i = 1, a = 1) {
    return Object.assign(gp("SyntaxError", e), {
      source: t,
      offset: n,
      line: r,
      column: o,
      sourceFragment(u) {
        return Gi(
          { source: t, line: r, column: o, baseLine: i, baseColumn: a },
          isNaN(u) ? 0 : u,
        )
      },
      get formattedMessage() {
        return (
          `Parse error: ${e}
` + Gi({ source: t, line: r, column: o, baseLine: i, baseColumn: a }, 2)
        )
      },
    })
  }
  function yp(e) {
    let t = this.createList(),
      n = !1,
      r = { recognizer: e }
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case 25:
          this.next()
          continue
        case 13:
          ;(n = !0), this.next()
          continue
      }
      let o = e.getNode.call(this, r)
      if (o === void 0) break
      n && (e.onWhiteSpace && e.onWhiteSpace.call(this, o, t, r), (n = !1)),
        t.push(o)
    }
    return n && e.onWhiteSpace && e.onWhiteSpace.call(this, null, t, r), t
  }
  function Sp(e) {
    return function () {
      return this[e]()
    }
  }
  function Br(e) {
    let t = Object.create(null)
    for (let n of Object.keys(e)) {
      let r = e[n],
        o = r.parse || r
      o && (t[n] = o)
    }
    return t
  }
  function wp(e) {
    let t = {
      context: Object.create(null),
      features: Object.assign(Object.create(null), e.features),
      scope: Object.assign(Object.create(null), e.scope),
      atrule: Br(e.atrule),
      pseudo: Br(e.pseudo),
      node: Br(e.node),
    }
    for (let [n, r] of Object.entries(e.parseContext))
      switch (typeof r) {
        case "function":
          t.context[n] = r
          break
        case "string":
          t.context[n] = Sp(r)
          break
      }
    return k(k({ config: t }, t), t.node)
  }
  function Ep(e) {
    let t = "",
      n = "<unknown>",
      r = !1,
      o = qi,
      i = !1,
      a = new wc(),
      u = Object.assign(new vc(), wp(e || {}), {
        parseAtrulePrelude: !0,
        parseRulePrelude: !0,
        parseValue: !0,
        parseCustomProperty: !1,
        readSequence: yp,
        consumeUntilBalanceEnd: () => 0,
        consumeUntilLeftCurlyBracket(l) {
          return l === Yi ? 1 : 0
        },
        consumeUntilLeftCurlyBracketOrSemicolon(l) {
          return l === Yi || l === Dr ? 1 : 0
        },
        consumeUntilExclamationMarkOrSemicolon(l) {
          return l === bp || l === Dr ? 1 : 0
        },
        consumeUntilSemicolonIncluded(l) {
          return l === Dr ? 2 : 0
        },
        createList() {
          return new ee()
        },
        createSingleNodeList(l) {
          return new ee().appendData(l)
        },
        getFirstListNode(l) {
          return l && l.first
        },
        getLastListNode(l) {
          return l && l.last
        },
        parseWithFallback(l, s) {
          let c = this.tokenIndex
          try {
            return l.call(this)
          } catch (d) {
            if (i) throw d
            this.skip(c - this.tokenIndex)
            let p = s.call(this)
            return (i = !0), o(d, p), (i = !1), p
          }
        },
        lookupNonWSType(l) {
          let s
          do if (((s = this.lookupType(l++)), s !== 13 && s !== 25)) return s
          while (s !== Ji)
          return Ji
        },
        charCodeAt(l) {
          return l >= 0 && l < t.length ? t.charCodeAt(l) : 0
        },
        substring(l, s) {
          return t.substring(l, s)
        },
        substrToCursor(l) {
          return this.source.substring(l, this.tokenStart)
        },
        cmpChar(l, s) {
          return sa(t, l, s)
        },
        cmpStr(l, s, c) {
          return yn(t, l, s, c)
        },
        consume(l) {
          let s = this.tokenStart
          return this.eat(l), this.substrToCursor(s)
        },
        consumeFunctionName() {
          let l = t.substring(this.tokenStart, this.tokenEnd - 1)
          return this.eat(2), l
        },
        consumeNumber(l) {
          let s = t.substring(this.tokenStart, la(t, this.tokenStart))
          return this.eat(l), s
        },
        eat(l) {
          if (this.tokenType !== l) {
            let s = ua[l]
                .slice(0, -6)
                .replace(/-/g, " ")
                .replace(/^./, (p) => p.toUpperCase()),
              c = `${/[[\](){}]/.test(s) ? `"${s}"` : s} is expected`,
              d = this.tokenStart
            switch (l) {
              case 1:
                this.tokenType === 2 || this.tokenType === 7
                  ? ((d = this.tokenEnd - 1),
                    (c = "Identifier is expected but function found"))
                  : (c = "Identifier is expected")
                break
              case 4:
                this.isDelim(Cp) && (this.next(), d++, (c = "Name is expected"))
                break
              case 11:
                this.tokenType === 10 &&
                  ((d = this.tokenEnd), (c = "Percent sign is expected"))
                break
            }
            this.error(c, d)
          }
          this.next()
        },
        eatIdent(l) {
          ;(this.tokenType !== 1 || this.lookupValue(0, l) === !1) &&
            this.error(`Identifier "${l}" is expected`),
            this.next()
        },
        eatDelim(l) {
          this.isDelim(l) ||
            this.error(`Delim "${String.fromCharCode(l)}" is expected`),
            this.next()
        },
        getLocation(l, s) {
          return r ? a.getLocationRange(l, s, n) : null
        },
        getLocationFromList(l) {
          if (r) {
            let s = this.getFirstListNode(l),
              c = this.getLastListNode(l)
            return a.getLocationRange(
              s !== null ? s.loc.start.offset - a.startOffset : this.tokenStart,
              c !== null ? c.loc.end.offset - a.startOffset : this.tokenStart,
              n,
            )
          }
          return null
        },
        error(l, s) {
          let c =
            typeof s < "u" && s < t.length
              ? a.getLocation(s)
              : this.eof
                ? a.getLocation(bc(t, t.length - 1))
                : a.getLocation(this.tokenStart)
          throw new Xi(
            l || "Unexpected input",
            t,
            c.offset,
            c.line,
            c.column,
            a.startLine,
            a.startColumn,
          )
        },
      })
    return Object.assign(
      function (l, s) {
        ;(t = l),
          (s = s || {}),
          u.setSource(t, ca),
          a.setSource(t, s.offset, s.line, s.column),
          (n = s.filename || "<unknown>"),
          (r = Boolean(s.positions)),
          (o = typeof s.onParseError == "function" ? s.onParseError : qi),
          (i = !1),
          (u.parseAtrulePrelude =
            "parseAtrulePrelude" in s ? Boolean(s.parseAtrulePrelude) : !0),
          (u.parseRulePrelude =
            "parseRulePrelude" in s ? Boolean(s.parseRulePrelude) : !0),
          (u.parseValue = "parseValue" in s ? Boolean(s.parseValue) : !0),
          (u.parseCustomProperty =
            "parseCustomProperty" in s ? Boolean(s.parseCustomProperty) : !1)
        let { context: c = "default", onComment: d } = s
        if (!(c in u.context)) throw new Error("Unknown context `" + c + "`")
        typeof d == "function" &&
          u.forEachToken((f, h, S) => {
            if (f === 25) {
              let E = u.getLocation(h, S),
                g = yn(t, S - 2, S, "*/")
                  ? t.slice(h + 2, S - 2)
                  : t.slice(h + 2, S)
              d(g, E)
            }
          })
        let p = u.context[c].call(u, s)
        return u.eof || u.error(), p
      },
      { SyntaxError: Xi, config: u.config },
    )
  }
  function Pp(e, t) {
    t.last !== null &&
      t.last.type !== "Combinator" &&
      e !== null &&
      e.type !== "Combinator" &&
      t.push({ type: "Combinator", loc: null, name: " " })
  }
  function Np() {
    switch (this.tokenType) {
      case 19:
        return this.AttributeSelector()
      case 4:
        return this.IdSelector()
      case 16:
        return this.lookupType(1) === 16
          ? this.PseudoElementSelector()
          : this.PseudoClassSelector()
      case 1:
        return this.TypeSelector()
      case 10:
      case 11:
        return this.Percentage()
      case 12:
        this.charCodeAt(this.tokenStart) === Zi &&
          this.error("Identifier is expected", this.tokenStart + 1)
        break
      case 9: {
        switch (this.charCodeAt(this.tokenStart)) {
          case Tp:
          case Ap:
          case Rp:
          case Fp:
            return this.Combinator()
          case Zi:
            return this.ClassSelector()
          case xp:
          case _p:
            return this.TypeSelector()
          case vp:
            return this.IdSelector()
          case kp:
            return this.NestingSelector()
        }
        break
      }
    }
  }
  function Lp() {
    let e = this.createList()
    this.skipSC()
    e: for (; !this.eof; ) {
      switch (this.tokenType) {
        case 1:
          e.push(this.Identifier())
          break
        case 5:
          e.push(this.String())
          break
        case 18:
          e.push(this.Operator())
          break
        case 22:
          break e
        default:
          this.error("Identifier, string or comma is expected")
      }
      this.skipSC()
    }
    return e
  }
  var ec,
    Cn,
    tc,
    nc,
    rc,
    oc,
    ic,
    Ge,
    Xr,
    ac,
    sc,
    lc,
    uc,
    qr,
    cc,
    dc,
    pc,
    Hr,
    yc,
    dn,
    ia,
    Jr,
    aa,
    ua,
    ji,
    Sc,
    zi,
    wc,
    Q,
    oe,
    Ec,
    vc,
    kc,
    $i,
    Ur,
    Tc,
    Fc,
    Ir,
    da,
    Ac,
    _c,
    fa,
    Rc,
    ma,
    ie,
    Y,
    pn,
    Fe,
    Lc,
    jc,
    ha,
    mn,
    zc,
    Wr,
    Hc,
    Yc,
    Qc,
    Ui,
    ed,
    td,
    vd,
    Vr,
    ga,
    ya,
    ep,
    Wi,
    op,
    ip,
    ap,
    sp,
    lp,
    up,
    ty,
    mp,
    hp,
    We,
    ee,
    Or,
    Vi,
    Ki,
    qi,
    bp,
    Cp,
    Dr,
    Yi,
    Ji,
    vp,
    kp,
    xp,
    Tp,
    Fp,
    Zi,
    Ap,
    _p,
    Rp,
    Ip,
    Te,
    jr,
    Mp,
    Op,
    cn,
    Dp,
    ba,
    Bp,
    Qi,
    bt,
    ea,
    ta,
    na,
    Ca,
    Sa,
    wa,
    Kr,
    jp,
    Gr,
    zp,
    mt,
    zr,
    Hp,
    Sn,
    Ea = F(() => {
      ;(ec = Object.create),
        (Cn = Object.defineProperty),
        (tc = Object.getOwnPropertyDescriptor),
        (nc = Object.getOwnPropertyNames),
        (rc = Object.getPrototypeOf),
        (oc = Object.prototype.hasOwnProperty),
        (ic = (e) => Cn(e, "__esModule", { value: !0 })),
        (Ge = (e, t) => () => (
          t || e((t = { exports: {} }).exports, t), t.exports
        )),
        (Xr = (e, t) => {
          for (var n in t) Cn(e, n, { get: t[n], enumerable: !0 })
        }),
        (ac = (e, t, n, r) => {
          if ((t && typeof t == "object") || typeof t == "function")
            for (let o of nc(t))
              !oc.call(e, o) &&
                (n || o !== "default") &&
                Cn(e, o, {
                  get: () => t[o],
                  enumerable: !(r = tc(t, o)) || r.enumerable,
                })
          return e
        }),
        (sc = (e, t) =>
          ac(
            ic(
              Cn(
                e != null ? ec(rc(e)) : {},
                "default",
                !t && e && e.__esModule
                  ? { get: () => e.default, enumerable: !0 }
                  : { value: e, enumerable: !0 },
              ),
            ),
            e,
          )),
        (lc = Ge((e) => {
          var t =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
              "",
            )
          ;(e.encode = function (n) {
            if (0 <= n && n < t.length) return t[n]
            throw new TypeError("Must be between 0 and 63: " + n)
          }),
            (e.decode = function (n) {
              var r = 65,
                o = 90,
                i = 97,
                a = 122,
                u = 48,
                l = 57,
                s = 43,
                c = 47,
                d = 26,
                p = 52
              return r <= n && n <= o
                ? n - r
                : i <= n && n <= a
                  ? n - i + d
                  : u <= n && n <= l
                    ? n - u + p
                    : n == s
                      ? 62
                      : n == c
                        ? 63
                        : -1
            })
        })),
        (uc = Ge((e) => {
          var t = lc(),
            n = 5,
            r = 1 << n,
            o = r - 1,
            i = r
          function a(l) {
            return l < 0 ? (-l << 1) + 1 : (l << 1) + 0
          }
          function u(l) {
            var s = (l & 1) === 1,
              c = l >> 1
            return s ? -c : c
          }
          ;(e.encode = function (l) {
            var s = "",
              c,
              d = a(l)
            do (c = d & o), (d >>>= n), d > 0 && (c |= i), (s += t.encode(c))
            while (d > 0)
            return s
          }),
            (e.decode = function (l, s, c) {
              var d = l.length,
                p = 0,
                f = 0,
                h,
                S
              do {
                if (s >= d)
                  throw new Error("Expected more digits in base 64 VLQ value.")
                if (((S = t.decode(l.charCodeAt(s++))), S === -1))
                  throw new Error("Invalid base64 digit: " + l.charAt(s - 1))
                ;(h = !!(S & i)), (S &= o), (p = p + (S << f)), (f += n)
              } while (h)
              ;(c.value = u(p)), (c.rest = s)
            })
        })),
        (qr = Ge((e) => {
          function t(y, m, A) {
            if (m in y) return y[m]
            if (arguments.length === 3) return A
            throw new Error('"' + m + '" is a required argument.')
          }
          e.getArg = t
          var n =
              /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
            r = /^data:.+\,.+$/
          function o(y) {
            var m = y.match(n)
            return m
              ? { scheme: m[1], auth: m[2], host: m[3], port: m[4], path: m[5] }
              : null
          }
          e.urlParse = o
          function i(y) {
            var m = ""
            return (
              y.scheme && (m += y.scheme + ":"),
              (m += "//"),
              y.auth && (m += y.auth + "@"),
              y.host && (m += y.host),
              y.port && (m += ":" + y.port),
              y.path && (m += y.path),
              m
            )
          }
          e.urlGenerate = i
          var a = 32
          function u(y) {
            var m = []
            return function (A) {
              for (var w = 0; w < m.length; w++)
                if (m[w].input === A) {
                  var z = m[0]
                  return (m[0] = m[w]), (m[w] = z), m[0].result
                }
              var H = y(A)
              return (
                m.unshift({ input: A, result: H }), m.length > a && m.pop(), H
              )
            }
          }
          var l = u(function (y) {
            var m = y,
              A = o(y)
            if (A) {
              if (!A.path) return y
              m = A.path
            }
            for (var w = e.isAbsolute(m), z = [], H = 0, U = 0; ; )
              if (((H = U), (U = m.indexOf("/", H)), U === -1)) {
                z.push(m.slice(H))
                break
              } else
                for (z.push(m.slice(H, U)); U < m.length && m[U] === "/"; ) U++
            for (var te, j = 0, U = z.length - 1; U >= 0; U--)
              (te = z[U]),
                te === "."
                  ? z.splice(U, 1)
                  : te === ".."
                    ? j++
                    : j > 0 &&
                      (te === ""
                        ? (z.splice(U + 1, j), (j = 0))
                        : (z.splice(U, 2), j--))
            return (
              (m = z.join("/")),
              m === "" && (m = w ? "/" : "."),
              A ? ((A.path = m), i(A)) : m
            )
          })
          e.normalize = l
          function s(y, m) {
            y === "" && (y = "."), m === "" && (m = ".")
            var A = o(m),
              w = o(y)
            if ((w && (y = w.path || "/"), A && !A.scheme))
              return w && (A.scheme = w.scheme), i(A)
            if (A || m.match(r)) return m
            if (w && !w.host && !w.path) return (w.host = m), i(w)
            var z = m.charAt(0) === "/" ? m : l(y.replace(/\/+$/, "") + "/" + m)
            return w ? ((w.path = z), i(w)) : z
          }
          ;(e.join = s),
            (e.isAbsolute = function (y) {
              return y.charAt(0) === "/" || n.test(y)
            })
          function c(y, m) {
            y === "" && (y = "."), (y = y.replace(/\/$/, ""))
            for (var A = 0; m.indexOf(y + "/") !== 0; ) {
              var w = y.lastIndexOf("/")
              if (w < 0 || ((y = y.slice(0, w)), y.match(/^([^\/]+:\/)?\/*$/)))
                return m
              ++A
            }
            return Array(A + 1).join("../") + m.substr(y.length + 1)
          }
          e.relative = c
          var d = (function () {
            var y = Object.create(null)
            return !("__proto__" in y)
          })()
          function p(y) {
            return y
          }
          function f(y) {
            return S(y) ? "$" + y : y
          }
          e.toSetString = d ? p : f
          function h(y) {
            return S(y) ? y.slice(1) : y
          }
          e.fromSetString = d ? p : h
          function S(y) {
            if (!y) return !1
            var m = y.length
            if (
              m < 9 ||
              y.charCodeAt(m - 1) !== 95 ||
              y.charCodeAt(m - 2) !== 95 ||
              y.charCodeAt(m - 3) !== 111 ||
              y.charCodeAt(m - 4) !== 116 ||
              y.charCodeAt(m - 5) !== 111 ||
              y.charCodeAt(m - 6) !== 114 ||
              y.charCodeAt(m - 7) !== 112 ||
              y.charCodeAt(m - 8) !== 95 ||
              y.charCodeAt(m - 9) !== 95
            )
              return !1
            for (var A = m - 10; A >= 0; A--)
              if (y.charCodeAt(A) !== 36) return !1
            return !0
          }
          function E(y, m, A) {
            var w = v(y.source, m.source)
            return w !== 0 ||
              ((w = y.originalLine - m.originalLine), w !== 0) ||
              ((w = y.originalColumn - m.originalColumn), w !== 0 || A) ||
              ((w = y.generatedColumn - m.generatedColumn), w !== 0) ||
              ((w = y.generatedLine - m.generatedLine), w !== 0)
              ? w
              : v(y.name, m.name)
          }
          e.compareByOriginalPositions = E
          function g(y, m, A) {
            var w
            return (
              (w = y.originalLine - m.originalLine),
              w !== 0 ||
              ((w = y.originalColumn - m.originalColumn), w !== 0 || A) ||
              ((w = y.generatedColumn - m.generatedColumn), w !== 0) ||
              ((w = y.generatedLine - m.generatedLine), w !== 0)
                ? w
                : v(y.name, m.name)
            )
          }
          e.compareByOriginalPositionsNoSource = g
          function b(y, m, A) {
            var w = y.generatedLine - m.generatedLine
            return w !== 0 ||
              ((w = y.generatedColumn - m.generatedColumn), w !== 0 || A) ||
              ((w = v(y.source, m.source)), w !== 0) ||
              ((w = y.originalLine - m.originalLine), w !== 0) ||
              ((w = y.originalColumn - m.originalColumn), w !== 0)
              ? w
              : v(y.name, m.name)
          }
          e.compareByGeneratedPositionsDeflated = b
          function C(y, m, A) {
            var w = y.generatedColumn - m.generatedColumn
            return w !== 0 ||
              A ||
              ((w = v(y.source, m.source)), w !== 0) ||
              ((w = y.originalLine - m.originalLine), w !== 0) ||
              ((w = y.originalColumn - m.originalColumn), w !== 0)
              ? w
              : v(y.name, m.name)
          }
          e.compareByGeneratedPositionsDeflatedNoLine = C
          function v(y, m) {
            return y === m
              ? 0
              : y === null
                ? 1
                : m === null
                  ? -1
                  : y > m
                    ? 1
                    : -1
          }
          function T(y, m) {
            var A = y.generatedLine - m.generatedLine
            return A !== 0 ||
              ((A = y.generatedColumn - m.generatedColumn), A !== 0) ||
              ((A = v(y.source, m.source)), A !== 0) ||
              ((A = y.originalLine - m.originalLine), A !== 0) ||
              ((A = y.originalColumn - m.originalColumn), A !== 0)
              ? A
              : v(y.name, m.name)
          }
          e.compareByGeneratedPositionsInflated = T
          function R(y) {
            return JSON.parse(y.replace(/^\)]}'[^\n]*\n/, ""))
          }
          e.parseSourceMapInput = R
          function B(y, m, A) {
            if (
              ((m = m || ""),
              y &&
                (y[y.length - 1] !== "/" && m[0] !== "/" && (y += "/"),
                (m = y + m)),
              A)
            ) {
              var w = o(A)
              if (!w) throw new Error("sourceMapURL could not be parsed")
              if (w.path) {
                var z = w.path.lastIndexOf("/")
                z >= 0 && (w.path = w.path.substring(0, z + 1))
              }
              m = s(i(w), m)
            }
            return l(m)
          }
          e.computeSourceURL = B
        })),
        (cc = Ge((e) => {
          var t = qr(),
            n = Object.prototype.hasOwnProperty,
            r = typeof Map < "u"
          function o() {
            ;(this._array = []),
              (this._set = r ? new Map() : Object.create(null))
          }
          ;(o.fromArray = function (i, a) {
            for (var u = new o(), l = 0, s = i.length; l < s; l++)
              u.add(i[l], a)
            return u
          }),
            (o.prototype.size = function () {
              return r
                ? this._set.size
                : Object.getOwnPropertyNames(this._set).length
            }),
            (o.prototype.add = function (i, a) {
              var u = r ? i : t.toSetString(i),
                l = r ? this.has(i) : n.call(this._set, u),
                s = this._array.length
              ;(!l || a) && this._array.push(i),
                l || (r ? this._set.set(i, s) : (this._set[u] = s))
            }),
            (o.prototype.has = function (i) {
              if (r) return this._set.has(i)
              var a = t.toSetString(i)
              return n.call(this._set, a)
            }),
            (o.prototype.indexOf = function (i) {
              if (r) {
                var a = this._set.get(i)
                if (a >= 0) return a
              } else {
                var u = t.toSetString(i)
                if (n.call(this._set, u)) return this._set[u]
              }
              throw new Error('"' + i + '" is not in the set.')
            }),
            (o.prototype.at = function (i) {
              if (i >= 0 && i < this._array.length) return this._array[i]
              throw new Error("No element indexed by " + i)
            }),
            (o.prototype.toArray = function () {
              return this._array.slice()
            }),
            (e.ArraySet = o)
        })),
        (dc = Ge((e) => {
          var t = qr()
          function n(o, i) {
            var a = o.generatedLine,
              u = i.generatedLine,
              l = o.generatedColumn,
              s = i.generatedColumn
            return (
              u > a ||
              (u == a && s >= l) ||
              t.compareByGeneratedPositionsInflated(o, i) <= 0
            )
          }
          function r() {
            ;(this._array = []),
              (this._sorted = !0),
              (this._last = { generatedLine: -1, generatedColumn: 0 })
          }
          ;(r.prototype.unsortedForEach = function (o, i) {
            this._array.forEach(o, i)
          }),
            (r.prototype.add = function (o) {
              n(this._last, o)
                ? ((this._last = o), this._array.push(o))
                : ((this._sorted = !1), this._array.push(o))
            }),
            (r.prototype.toArray = function () {
              return (
                this._sorted ||
                  (this._array.sort(t.compareByGeneratedPositionsInflated),
                  (this._sorted = !0)),
                this._array
              )
            }),
            (e.MappingList = r)
        })),
        (pc = Ge((e) => {
          var t = uc(),
            n = qr(),
            r = cc().ArraySet,
            o = dc().MappingList
          function i(a) {
            a || (a = {}),
              (this._file = n.getArg(a, "file", null)),
              (this._sourceRoot = n.getArg(a, "sourceRoot", null)),
              (this._skipValidation = n.getArg(a, "skipValidation", !1)),
              (this._sources = new r()),
              (this._names = new r()),
              (this._mappings = new o()),
              (this._sourcesContents = null)
          }
          ;(i.prototype._version = 3),
            (i.fromSourceMap = function (a) {
              var u = a.sourceRoot,
                l = new i({ file: a.file, sourceRoot: u })
              return (
                a.eachMapping(function (s) {
                  var c = {
                    generated: {
                      line: s.generatedLine,
                      column: s.generatedColumn,
                    },
                  }
                  s.source != null &&
                    ((c.source = s.source),
                    u != null && (c.source = n.relative(u, c.source)),
                    (c.original = {
                      line: s.originalLine,
                      column: s.originalColumn,
                    }),
                    s.name != null && (c.name = s.name)),
                    l.addMapping(c)
                }),
                a.sources.forEach(function (s) {
                  var c = s
                  u !== null && (c = n.relative(u, s)),
                    l._sources.has(c) || l._sources.add(c)
                  var d = a.sourceContentFor(s)
                  d != null && l.setSourceContent(s, d)
                }),
                l
              )
            }),
            (i.prototype.addMapping = function (a) {
              var u = n.getArg(a, "generated"),
                l = n.getArg(a, "original", null),
                s = n.getArg(a, "source", null),
                c = n.getArg(a, "name", null)
              this._skipValidation || this._validateMapping(u, l, s, c),
                s != null &&
                  ((s = String(s)),
                  this._sources.has(s) || this._sources.add(s)),
                c != null &&
                  ((c = String(c)), this._names.has(c) || this._names.add(c)),
                this._mappings.add({
                  generatedLine: u.line,
                  generatedColumn: u.column,
                  originalLine: l != null && l.line,
                  originalColumn: l != null && l.column,
                  source: s,
                  name: c,
                })
            }),
            (i.prototype.setSourceContent = function (a, u) {
              var l = a
              this._sourceRoot != null && (l = n.relative(this._sourceRoot, l)),
                u != null
                  ? (this._sourcesContents ||
                      (this._sourcesContents = Object.create(null)),
                    (this._sourcesContents[n.toSetString(l)] = u))
                  : this._sourcesContents &&
                    (delete this._sourcesContents[n.toSetString(l)],
                    Object.keys(this._sourcesContents).length === 0 &&
                      (this._sourcesContents = null))
            }),
            (i.prototype.applySourceMap = function (a, u, l) {
              var s = u
              if (u == null) {
                if (a.file == null)
                  throw new Error(
                    `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`,
                  )
                s = a.file
              }
              var c = this._sourceRoot
              c != null && (s = n.relative(c, s))
              var d = new r(),
                p = new r()
              this._mappings.unsortedForEach(function (f) {
                if (f.source === s && f.originalLine != null) {
                  var h = a.originalPositionFor({
                    line: f.originalLine,
                    column: f.originalColumn,
                  })
                  h.source != null &&
                    ((f.source = h.source),
                    l != null && (f.source = n.join(l, f.source)),
                    c != null && (f.source = n.relative(c, f.source)),
                    (f.originalLine = h.line),
                    (f.originalColumn = h.column),
                    h.name != null && (f.name = h.name))
                }
                var S = f.source
                S != null && !d.has(S) && d.add(S)
                var E = f.name
                E != null && !p.has(E) && p.add(E)
              }, this),
                (this._sources = d),
                (this._names = p),
                a.sources.forEach(function (f) {
                  var h = a.sourceContentFor(f)
                  h != null &&
                    (l != null && (f = n.join(l, f)),
                    c != null && (f = n.relative(c, f)),
                    this.setSourceContent(f, h))
                }, this)
            }),
            (i.prototype._validateMapping = function (a, u, l, s) {
              if (u && typeof u.line != "number" && typeof u.column != "number")
                throw new Error(
                  "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.",
                )
              if (
                !(
                  a &&
                  "line" in a &&
                  "column" in a &&
                  a.line > 0 &&
                  a.column >= 0 &&
                  !u &&
                  !l &&
                  !s
                )
              ) {
                if (
                  a &&
                  "line" in a &&
                  "column" in a &&
                  u &&
                  "line" in u &&
                  "column" in u &&
                  a.line > 0 &&
                  a.column >= 0 &&
                  u.line > 0 &&
                  u.column >= 0 &&
                  l
                )
                  return
                throw new Error(
                  "Invalid mapping: " +
                    JSON.stringify({
                      generated: a,
                      source: l,
                      original: u,
                      name: s,
                    }),
                )
              }
            }),
            (i.prototype._serializeMappings = function () {
              for (
                var a = 0,
                  u = 1,
                  l = 0,
                  s = 0,
                  c = 0,
                  d = 0,
                  p = "",
                  f,
                  h,
                  S,
                  E,
                  g = this._mappings.toArray(),
                  b = 0,
                  C = g.length;
                b < C;
                b++
              ) {
                if (((h = g[b]), (f = ""), h.generatedLine !== u))
                  for (a = 0; h.generatedLine !== u; ) (f += ";"), u++
                else if (b > 0) {
                  if (!n.compareByGeneratedPositionsInflated(h, g[b - 1]))
                    continue
                  f += ","
                }
                ;(f += t.encode(h.generatedColumn - a)),
                  (a = h.generatedColumn),
                  h.source != null &&
                    ((E = this._sources.indexOf(h.source)),
                    (f += t.encode(E - d)),
                    (d = E),
                    (f += t.encode(h.originalLine - 1 - s)),
                    (s = h.originalLine - 1),
                    (f += t.encode(h.originalColumn - l)),
                    (l = h.originalColumn),
                    h.name != null &&
                      ((S = this._names.indexOf(h.name)),
                      (f += t.encode(S - c)),
                      (c = S))),
                  (p += f)
              }
              return p
            }),
            (i.prototype._generateSourcesContent = function (a, u) {
              return a.map(function (l) {
                if (!this._sourcesContents) return null
                u != null && (l = n.relative(u, l))
                var s = n.toSetString(l)
                return Object.prototype.hasOwnProperty.call(
                  this._sourcesContents,
                  s,
                )
                  ? this._sourcesContents[s]
                  : null
              }, this)
            }),
            (i.prototype.toJSON = function () {
              var a = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings(),
              }
              return (
                this._file != null && (a.file = this._file),
                this._sourceRoot != null && (a.sourceRoot = this._sourceRoot),
                this._sourcesContents &&
                  (a.sourcesContent = this._generateSourcesContent(
                    a.sources,
                    a.sourceRoot,
                  )),
                a
              )
            }),
            (i.prototype.toString = function () {
              return JSON.stringify(this.toJSON())
            }),
            (e.SourceMapGenerator = i)
        }))
      ;(Hr = new Array(128)),
        (yc = 128),
        (dn = 130),
        (ia = 131),
        (Jr = 132),
        (aa = 133)
      for (let e = 0; e < Hr.length; e++)
        Hr[e] =
          (yt(e) && dn) ||
          (J(e) && ia) ||
          (hn(e) && Jr) ||
          (gc(e) && aa) ||
          e ||
          yc
      ua = [
        "EOF-token",
        "ident-token",
        "function-token",
        "at-keyword-token",
        "hash-token",
        "string-token",
        "bad-string-token",
        "url-token",
        "bad-url-token",
        "delim-token",
        "number-token",
        "percentage-token",
        "dimension-token",
        "whitespace-token",
        "CDO-token",
        "CDC-token",
        "colon-token",
        "semicolon-token",
        "comma-token",
        "[-token",
        "]-token",
        "(-token",
        ")-token",
        "{-token",
        "}-token",
        "comment-token",
      ]
      ;(ji = 10), (Sc = 12), (zi = 13)
      ;(wc = class {
        constructor() {
          ;(this.lines = null), (this.columns = null), (this.computed = !1)
        }
        setSource(e, t = 0, n = 1, r = 1) {
          ;(this.source = e),
            (this.startOffset = t),
            (this.startLine = n),
            (this.startColumn = r),
            (this.computed = !1)
        }
        getLocation(e, t) {
          return (
            this.computed || Hi(this),
            {
              source: t,
              offset: this.startOffset + e,
              line: this.lines[e],
              column: this.columns[e],
            }
          )
        }
        getLocationRange(e, t, n) {
          return (
            this.computed || Hi(this),
            {
              source: n,
              start: {
                offset: this.startOffset + e,
                line: this.lines[e],
                column: this.columns[e],
              },
              end: {
                offset: this.startOffset + t,
                line: this.lines[t],
                column: this.columns[t],
              },
            }
          )
        }
      }),
        (Q = 16777215),
        (oe = 24),
        (Ec = new Map([
          [2, 22],
          [21, 22],
          [19, 20],
          [23, 24],
        ])),
        (vc = class {
          constructor(e, t) {
            this.setSource(e, t)
          }
          reset() {
            ;(this.eof = !1),
              (this.tokenIndex = -1),
              (this.tokenType = 0),
              (this.tokenStart = this.firstCharOffset),
              (this.tokenEnd = this.firstCharOffset)
          }
          setSource(e = "", t = () => {}) {
            e = String(e || "")
            let n = e.length,
              r = bn(this.offsetAndType, e.length + 1),
              o = bn(this.balance, e.length + 1),
              i = 0,
              a = 0,
              u = 0,
              l = -1
            for (
              this.offsetAndType = null,
                this.balance = null,
                t(e, (s, c, d) => {
                  switch (s) {
                    default:
                      o[i] = n
                      break
                    case a: {
                      let p = u & Q
                      for (
                        u = o[p], a = u >> oe, o[i] = p, o[p++] = i;
                        p < i;
                        p++
                      )
                        o[p] === n && (o[p] = i)
                      break
                    }
                    case 21:
                    case 2:
                    case 19:
                    case 23:
                      ;(o[i] = u), (a = Ec.get(s)), (u = (a << oe) | i)
                      break
                  }
                  ;(r[i++] = (s << oe) | d), l === -1 && (l = c)
                }),
                r[i] = (0 << oe) | n,
                o[i] = n,
                o[n] = n;
              u !== 0;
            ) {
              let s = u & Q
              ;(u = o[s]), (o[s] = n)
            }
            ;(this.source = e),
              (this.firstCharOffset = l === -1 ? 0 : l),
              (this.tokenCount = i),
              (this.offsetAndType = r),
              (this.balance = o),
              this.reset(),
              this.next()
          }
          lookupType(e) {
            return (
              (e += this.tokenIndex),
              e < this.tokenCount ? this.offsetAndType[e] >> oe : 0
            )
          }
          lookupTypeNonSC(e) {
            for (let t = this.tokenIndex; t < this.tokenCount; t++) {
              let n = this.offsetAndType[t] >> oe
              if (n !== 13 && n !== 25 && e-- === 0) return n
            }
            return 0
          }
          lookupOffset(e) {
            return (
              (e += this.tokenIndex),
              e < this.tokenCount
                ? this.offsetAndType[e - 1] & Q
                : this.source.length
            )
          }
          lookupOffsetNonSC(e) {
            for (let t = this.tokenIndex; t < this.tokenCount; t++) {
              let n = this.offsetAndType[t] >> oe
              if (n !== 13 && n !== 25 && e-- === 0) return t - this.tokenIndex
            }
            return 0
          }
          lookupValue(e, t) {
            return (
              (e += this.tokenIndex),
              e < this.tokenCount
                ? yn(
                    this.source,
                    this.offsetAndType[e - 1] & Q,
                    this.offsetAndType[e] & Q,
                    t,
                  )
                : !1
            )
          }
          getTokenStart(e) {
            return e === this.tokenIndex
              ? this.tokenStart
              : e > 0
                ? e < this.tokenCount
                  ? this.offsetAndType[e - 1] & Q
                  : this.offsetAndType[this.tokenCount] & Q
                : this.firstCharOffset
          }
          substrToCursor(e) {
            return this.source.substring(e, this.tokenStart)
          }
          isBalanceEdge(e) {
            return this.balance[this.tokenIndex] < e
          }
          isDelim(e, t) {
            return t
              ? this.lookupType(t) === 9 &&
                  this.source.charCodeAt(this.lookupOffset(t)) === e
              : this.tokenType === 9 &&
                  this.source.charCodeAt(this.tokenStart) === e
          }
          skip(e) {
            let t = this.tokenIndex + e
            t < this.tokenCount
              ? ((this.tokenIndex = t),
                (this.tokenStart = this.offsetAndType[t - 1] & Q),
                (t = this.offsetAndType[t]),
                (this.tokenType = t >> oe),
                (this.tokenEnd = t & Q))
              : ((this.tokenIndex = this.tokenCount), this.next())
          }
          next() {
            let e = this.tokenIndex + 1
            e < this.tokenCount
              ? ((this.tokenIndex = e),
                (this.tokenStart = this.tokenEnd),
                (e = this.offsetAndType[e]),
                (this.tokenType = e >> oe),
                (this.tokenEnd = e & Q))
              : ((this.eof = !0),
                (this.tokenIndex = this.tokenCount),
                (this.tokenType = 0),
                (this.tokenStart = this.tokenEnd = this.source.length))
          }
          skipSC() {
            for (; this.tokenType === 13 || this.tokenType === 25; ) this.next()
          }
          skipUntilBalanced(e, t) {
            let n = e,
              r,
              o
            e: for (; n < this.tokenCount; n++) {
              if (((r = this.balance[n]), r < e)) break e
              switch (
                ((o =
                  n > 0 ? this.offsetAndType[n - 1] & Q : this.firstCharOffset),
                t(this.source.charCodeAt(o)))
              ) {
                case 1:
                  break e
                case 2:
                  n++
                  break e
                default:
                  this.balance[r] === n && (n = r)
              }
            }
            this.skip(n - this.tokenIndex)
          }
          forEachToken(e) {
            for (
              let t = 0, n = this.firstCharOffset;
              t < this.tokenCount;
              t++
            ) {
              let r = n,
                o = this.offsetAndType[t],
                i = o & Q,
                a = o >> oe
              ;(n = i), e(a, r, i, t)
            }
          }
          dump() {
            let e = new Array(this.tokenCount)
            return (
              this.forEachToken((t, n, r, o) => {
                e[o] = {
                  idx: o,
                  type: ua[t],
                  chunk: this.source.substring(n, r),
                  balance: this.balance[o],
                }
              }),
              e
            )
          }
        })
      ;(kc = sc(pc(), 1)), ($i = new Set(["Atrule", "Selector", "Declaration"]))
      Ur = {}
      Xr(Ur, { safe: () => fa, spec: () => _c })
      ;(Tc = 43),
        (Fc = 45),
        (Ir = (e, t) => {
          if ((e === 9 && (e = t), typeof e == "string")) {
            let n = e.charCodeAt(0)
            return n > 127 ? 32768 : n << 8
          }
          return e
        }),
        (da = [
          [1, 1],
          [1, 2],
          [1, 7],
          [1, 8],
          [1, "-"],
          [1, 10],
          [1, 11],
          [1, 12],
          [1, 15],
          [1, 21],
          [3, 1],
          [3, 2],
          [3, 7],
          [3, 8],
          [3, "-"],
          [3, 10],
          [3, 11],
          [3, 12],
          [3, 15],
          [4, 1],
          [4, 2],
          [4, 7],
          [4, 8],
          [4, "-"],
          [4, 10],
          [4, 11],
          [4, 12],
          [4, 15],
          [12, 1],
          [12, 2],
          [12, 7],
          [12, 8],
          [12, "-"],
          [12, 10],
          [12, 11],
          [12, 12],
          [12, 15],
          ["#", 1],
          ["#", 2],
          ["#", 7],
          ["#", 8],
          ["#", "-"],
          ["#", 10],
          ["#", 11],
          ["#", 12],
          ["#", 15],
          ["-", 1],
          ["-", 2],
          ["-", 7],
          ["-", 8],
          ["-", "-"],
          ["-", 10],
          ["-", 11],
          ["-", 12],
          ["-", 15],
          [10, 1],
          [10, 2],
          [10, 7],
          [10, 8],
          [10, 10],
          [10, 11],
          [10, 12],
          [10, "%"],
          [10, 15],
          ["@", 1],
          ["@", 2],
          ["@", 7],
          ["@", 8],
          ["@", "-"],
          ["@", 15],
          [".", 10],
          [".", 11],
          [".", 12],
          ["+", 10],
          ["+", 11],
          ["+", 12],
          ["/", "*"],
        ]),
        (Ac = da.concat([
          [1, 4],
          [12, 4],
          [4, 4],
          [3, 21],
          [3, 5],
          [3, 16],
          [11, 11],
          [11, 12],
          [11, 2],
          [11, "-"],
          [22, 1],
          [22, 2],
          [22, 11],
          [22, 12],
          [22, 4],
          [22, "-"],
        ]))
      ;(_c = pa(da)), (fa = pa(Ac)), (Rc = 92)
      ma = {}
      Xr(ma, {
        AnPlusB: () => Oc,
        Atrule: () => Dc,
        AtrulePrelude: () => Bc,
        AttributeSelector: () => Vc,
        Block: () => Kc,
        Brackets: () => Gc,
        CDC: () => Xc,
        CDO: () => qc,
        ClassSelector: () => Zc,
        Combinator: () => rd,
        Comment: () => od,
        Condition: () => id,
        Declaration: () => ad,
        DeclarationList: () => sd,
        Dimension: () => ld,
        Feature: () => ud,
        FeatureFunction: () => cd,
        FeatureRange: () => dd,
        Function: () => pd,
        GeneralEnclosed: () => fd,
        Hash: () => md,
        IdSelector: () => bd,
        Identifier: () => gd,
        Layer: () => Cd,
        LayerList: () => Sd,
        MediaQuery: () => wd,
        MediaQueryList: () => Ed,
        NestingSelector: () => xd,
        Nth: () => Fd,
        Number: () => Ad,
        Operator: () => Rd,
        Parentheses: () => Pd,
        Percentage: () => Id,
        PseudoClassSelector: () => Md,
        PseudoElementSelector: () => Dd,
        Ratio: () => Bd,
        Raw: () => Hd,
        Rule: () => $d,
        Scope: () => Ud,
        Selector: () => Vd,
        SelectorList: () => Gd,
        String: () => Jd,
        StyleSheet: () => Zd,
        SupportsDeclaration: () => Qd,
        TypeSelector: () => np,
        UnicodeRange: () => rp,
        Url: () => dp,
        Value: () => pp,
        WhiteSpace: () => fp,
      })
      ;(ie = 43), (Y = 45), (pn = 110), (Fe = !0), (Lc = !1)
      ;(jc = 36), (ha = 42), (mn = 61), (zc = 94), (Wr = 124), (Hc = 126)
      Yc = 46
      ;(Qc = 43), (Ui = 47), (ed = 62), (td = 126)
      vd = 38
      ;(Vr = 92), (ga = 34), (ya = 39)
      ;(ep = 42), (Wi = 124)
      ;(op = 32), (ip = 92), (ap = 34), (sp = 39), (lp = 40), (up = 41)
      ty = Object.freeze({ type: "WhiteSpace", loc: null, value: " " })
      ;(mp = { node: ma }),
        (hp = Ic(mp)),
        (We = null),
        (ee = class {
          static createItem(e) {
            return { prev: null, next: null, data: e }
          }
          constructor() {
            ;(this.head = null), (this.tail = null), (this.cursor = null)
          }
          createItem(e) {
            return ee.createItem(e)
          }
          allocateCursor(e, t) {
            let n
            return (
              We !== null
                ? ((n = We),
                  (We = We.cursor),
                  (n.prev = e),
                  (n.next = t),
                  (n.cursor = this.cursor))
                : (n = { prev: e, next: t, cursor: this.cursor }),
              (this.cursor = n),
              n
            )
          }
          releaseCursor() {
            let { cursor: e } = this
            ;(this.cursor = e.cursor),
              (e.prev = null),
              (e.next = null),
              (e.cursor = We),
              (We = e)
          }
          updateCursors(e, t, n, r) {
            let { cursor: o } = this
            for (; o !== null; )
              o.prev === e && (o.prev = t),
                o.next === n && (o.next = r),
                (o = o.cursor)
          }
          *[Symbol.iterator]() {
            for (let e = this.head; e !== null; e = e.next) yield e.data
          }
          get size() {
            let e = 0
            for (let t = this.head; t !== null; t = t.next) e++
            return e
          }
          get isEmpty() {
            return this.head === null
          }
          get first() {
            return this.head && this.head.data
          }
          get last() {
            return this.tail && this.tail.data
          }
          fromArray(e) {
            let t = null
            this.head = null
            for (let n of e) {
              let r = ee.createItem(n)
              t !== null ? (t.next = r) : (this.head = r), (r.prev = t), (t = r)
            }
            return (this.tail = t), this
          }
          toArray() {
            return [...this]
          }
          toJSON() {
            return [...this]
          }
          forEach(e, t = this) {
            let n = this.allocateCursor(null, this.head)
            for (; n.next !== null; ) {
              let r = n.next
              ;(n.next = r.next), e.call(t, r.data, r, this)
            }
            this.releaseCursor()
          }
          forEachRight(e, t = this) {
            let n = this.allocateCursor(this.tail, null)
            for (; n.prev !== null; ) {
              let r = n.prev
              ;(n.prev = r.prev), e.call(t, r.data, r, this)
            }
            this.releaseCursor()
          }
          reduce(e, t, n = this) {
            let r = this.allocateCursor(null, this.head),
              o = t,
              i
            for (; r.next !== null; )
              (i = r.next),
                (r.next = i.next),
                (o = e.call(n, o, i.data, i, this))
            return this.releaseCursor(), o
          }
          reduceRight(e, t, n = this) {
            let r = this.allocateCursor(this.tail, null),
              o = t,
              i
            for (; r.prev !== null; )
              (i = r.prev),
                (r.prev = i.prev),
                (o = e.call(n, o, i.data, i, this))
            return this.releaseCursor(), o
          }
          some(e, t = this) {
            for (let n = this.head; n !== null; n = n.next)
              if (e.call(t, n.data, n, this)) return !0
            return !1
          }
          map(e, t = this) {
            let n = new ee()
            for (let r = this.head; r !== null; r = r.next)
              n.appendData(e.call(t, r.data, r, this))
            return n
          }
          filter(e, t = this) {
            let n = new ee()
            for (let r = this.head; r !== null; r = r.next)
              e.call(t, r.data, r, this) && n.appendData(r.data)
            return n
          }
          nextUntil(e, t, n = this) {
            if (e === null) return
            let r = this.allocateCursor(null, e)
            for (; r.next !== null; ) {
              let o = r.next
              if (((r.next = o.next), t.call(n, o.data, o, this))) break
            }
            this.releaseCursor()
          }
          prevUntil(e, t, n = this) {
            if (e === null) return
            let r = this.allocateCursor(e, null)
            for (; r.prev !== null; ) {
              let o = r.prev
              if (((r.prev = o.prev), t.call(n, o.data, o, this))) break
            }
            this.releaseCursor()
          }
          clear() {
            ;(this.head = null), (this.tail = null)
          }
          copy() {
            let e = new ee()
            for (let t of this) e.appendData(t)
            return e
          }
          prepend(e) {
            return (
              this.updateCursors(null, e, this.head, e),
              this.head !== null
                ? ((this.head.prev = e), (e.next = this.head))
                : (this.tail = e),
              (this.head = e),
              this
            )
          }
          prependData(e) {
            return this.prepend(ee.createItem(e))
          }
          append(e) {
            return this.insert(e)
          }
          appendData(e) {
            return this.insert(ee.createItem(e))
          }
          insert(e, t = null) {
            if (t !== null)
              if ((this.updateCursors(t.prev, e, t, e), t.prev === null)) {
                if (this.head !== t)
                  throw new Error("before doesn't belong to list")
                ;(this.head = e),
                  (t.prev = e),
                  (e.next = t),
                  this.updateCursors(null, e)
              } else
                (t.prev.next = e), (e.prev = t.prev), (t.prev = e), (e.next = t)
            else
              this.updateCursors(this.tail, e, null, e),
                this.tail !== null
                  ? ((this.tail.next = e), (e.prev = this.tail))
                  : (this.head = e),
                (this.tail = e)
            return this
          }
          insertData(e, t) {
            return this.insert(ee.createItem(e), t)
          }
          remove(e) {
            if ((this.updateCursors(e, e.prev, e, e.next), e.prev !== null))
              e.prev.next = e.next
            else {
              if (this.head !== e)
                throw new Error("item doesn't belong to list")
              this.head = e.next
            }
            if (e.next !== null) e.next.prev = e.prev
            else {
              if (this.tail !== e)
                throw new Error("item doesn't belong to list")
              this.tail = e.prev
            }
            return (e.prev = null), (e.next = null), e
          }
          push(e) {
            this.insert(ee.createItem(e))
          }
          pop() {
            return this.tail !== null ? this.remove(this.tail) : null
          }
          unshift(e) {
            this.prepend(ee.createItem(e))
          }
          shift() {
            return this.head !== null ? this.remove(this.head) : null
          }
          prependList(e) {
            return this.insertList(e, this.head)
          }
          appendList(e) {
            return this.insertList(e)
          }
          insertList(e, t) {
            return e.head === null
              ? this
              : (t != null
                  ? (this.updateCursors(t.prev, e.tail, t, e.head),
                    t.prev !== null
                      ? ((t.prev.next = e.head), (e.head.prev = t.prev))
                      : (this.head = e.head),
                    (t.prev = e.tail),
                    (e.tail.next = t))
                  : (this.updateCursors(this.tail, e.tail, null, e.head),
                    this.tail !== null
                      ? ((this.tail.next = e.head), (e.head.prev = this.tail))
                      : (this.head = e.head),
                    (this.tail = e.tail)),
                (e.head = null),
                (e.tail = null),
                this)
          }
          replace(e, t) {
            "head" in t ? this.insertList(t, e) : this.insert(t, e),
              this.remove(e)
          }
        })
      ;(Or = 100), (Vi = 60), (Ki = "    ")
      ;(qi = () => {}), (bp = 33), (Cp = 35), (Dr = 59), (Yi = 123), (Ji = 0)
      ;(vp = 35),
        (kp = 38),
        (xp = 42),
        (Tp = 43),
        (Fp = 47),
        (Zi = 46),
        (Ap = 62),
        (_p = 124),
        (Rp = 126)
      Ip = { onWhiteSpace: Pp, getNode: Np }
      ;(Te = {
        parse() {
          return this.createSingleNodeList(this.SelectorList())
        },
      }),
        (jr = {
          parse() {
            return this.createSingleNodeList(this.Selector())
          },
        }),
        (Mp = {
          parse() {
            return this.createSingleNodeList(this.Identifier())
          },
        }),
        (Op = { parse: Lp }),
        (cn = {
          parse() {
            return this.createSingleNodeList(this.Nth())
          },
        }),
        (Dp = {
          dir: Mp,
          has: Te,
          lang: Op,
          matches: Te,
          is: Te,
          "-moz-any": Te,
          "-webkit-any": Te,
          where: Te,
          not: Te,
          "nth-child": cn,
          "nth-last-child": cn,
          "nth-last-of-type": cn,
          "nth-of-type": cn,
          slotted: jr,
          host: jr,
          "host-context": jr,
        }),
        (ba = {})
      Xr(ba, {
        AnPlusB: () => Mc,
        AttributeSelector: () => Wc,
        ClassSelector: () => Jc,
        Combinator: () => nd,
        IdSelector: () => yd,
        Identifier: () => hd,
        NestingSelector: () => kd,
        Nth: () => Td,
        Operator: () => _d,
        Percentage: () => Nd,
        PseudoClassSelector: () => Ld,
        PseudoElementSelector: () => Od,
        Raw: () => zd,
        Selector: () => Wd,
        SelectorList: () => Kd,
        String: () => Yd,
        TypeSelector: () => tp,
      })
      ;(Bp = {
        parseContext: {
          default: "SelectorList",
          selectorList: "SelectorList",
          selector: "Selector",
        },
        scope: { Selector: Ip },
        atrule: {},
        pseudo: Dp,
        node: ba,
      }),
        (Qi = Ep(Bp)),
        (bt = (e, t) =>
          e.a === t.a ? (e.b === t.b ? e.c - t.c : e.b - t.b) : e.a - t.a),
        (ea = (e, t) => bt(e, t) === 0),
        (ta = (e, t) => bt(e, t) > 0),
        (na = (e, t) => bt(e, t) < 0),
        (Ca = (e, t = "ASC") => {
          let n = e.sort(bt)
          return t === "DESC" ? n.reverse() : n
        }),
        (Sa = (...e) => Ca(e, "ASC")),
        (wa = (...e) => Ca(e, "DESC")),
        (Kr = (...e) => wa(...e)[0]),
        (jp = (...e) => Sa(...e)[0]),
        (Gr = (e) => {
          if (!e || e.type !== "Selector")
            throw new TypeError("Passed in source is not a Selector AST")
          let t = 0,
            n = 0,
            r = 0
          return (
            e.children.forEach((o) => {
              var i, a, u, l, s, c, d, p, f, h
              switch (o.type) {
                case "IdSelector":
                  t += 1
                  break
                case "AttributeSelector":
                case "ClassSelector":
                  n += 1
                  break
                case "PseudoClassSelector":
                  switch (o.name.toLowerCase()) {
                    case "where":
                      break
                    case "-webkit-any":
                    case "any":
                      ;(i = o.children) != null && i.first && (n += 1)
                      break
                    case "-moz-any":
                    case "is":
                    case "matches":
                    case "not":
                    case "has":
                      if ((a = o.children) != null && a.first) {
                        let E = Kr(...mt(o.children.first))
                        ;(t += E.a), (n += E.b), (r += E.c)
                      }
                      break
                    case "nth-child":
                    case "nth-last-child":
                      if (
                        ((n += 1),
                        (l = (u = o.children) == null ? void 0 : u.first) ==
                        null
                          ? void 0
                          : l.selector)
                      ) {
                        let E = Kr(...mt(o.children.first.selector))
                        ;(t += E.a), (n += E.b), (r += E.c)
                      }
                      break
                    case "host-context":
                    case "host":
                      if (
                        ((n += 1),
                        (c = (s = o.children) == null ? void 0 : s.first) ==
                        null
                          ? void 0
                          : c.children)
                      ) {
                        let E = { type: "Selector", children: [] },
                          g = !1
                        o.children.first.children.forEach((C) => {
                          if (g) return !1
                          if (C.type === "Combinator") return (g = !0), !1
                          E.children.push(C)
                        })
                        let b = mt(E)[0]
                        ;(t += b.a), (n += b.b), (r += b.c)
                      }
                      break
                    case "after":
                    case "before":
                    case "first-letter":
                    case "first-line":
                      r += 1
                      break
                    default:
                      n += 1
                      break
                  }
                  break
                case "PseudoElementSelector":
                  switch (o.name) {
                    case "slotted":
                      if (
                        ((r += 1),
                        (p = (d = o.children) == null ? void 0 : d.first) ==
                        null
                          ? void 0
                          : p.children)
                      ) {
                        let E = { type: "Selector", children: [] },
                          g = !1
                        o.children.first.children.forEach((C) => {
                          if (g) return !1
                          if (C.type === "Combinator") return (g = !0), !1
                          E.children.push(C)
                        })
                        let b = mt(E)[0]
                        ;(t += b.a), (n += b.b), (r += b.c)
                      }
                      break
                    case "view-transition-group":
                    case "view-transition-image-pair":
                    case "view-transition-old":
                    case "view-transition-new":
                      if (
                        ((h = (f = o.children) == null ? void 0 : f.first) ==
                        null
                          ? void 0
                          : h.value) === "*"
                      )
                        break
                      r += 1
                      break
                    default:
                      r += 1
                      break
                  }
                  break
                case "TypeSelector":
                  let S = o.name
                  S.includes("|") && (S = S.split("|")[1]),
                    S !== "*" && (r += 1)
                  break
                default:
                  break
              }
            }),
            new Sn({ a: t, b: n, c: r }, e)
          )
        }),
        (zp = (e) => {
          if (typeof e == "string" || e instanceof String)
            try {
              return Qi(e, { context: "selectorList" })
            } catch (t) {
              throw new TypeError(
                `Could not convert passed in source '${e}' to SelectorList: ${t.message}`,
              )
            }
          if (e instanceof Object) {
            if (e.type && ["Selector", "SelectorList"].includes(e.type))
              return e
            if (e.type && e.type === "Raw")
              try {
                return Qi(e.value, { context: "selectorList" })
              } catch (t) {
                throw new TypeError(
                  `Could not convert passed in source to SelectorList: ${t.message}`,
                )
              }
            throw new TypeError(
              "Passed in source is an Object but no AST / AST of the type Selector or SelectorList",
            )
          }
          throw new TypeError(
            "Passed in source is not a String nor an Object. I don't know what to do with it.",
          )
        }),
        (mt = (e) => {
          if (!e) return []
          let t = zp(e)
          if (t.type === "Selector") return [Gr(e)]
          if (t.type === "SelectorList") {
            let n = []
            return (
              t.children.forEach((r) => {
                let o = Gr(r)
                n.push(o)
              }),
              n
            )
          }
        }),
        (zr = class extends Error {
          constructor() {
            super(
              "Manipulating a Specificity instance is not allowed. Instead, create a new Specificity()",
            )
          }
        }),
        (Hp = class {
          constructor(e, t = null) {
            ;(this.value = e), (this.selector = t)
          }
          get a() {
            return this.value.a
          }
          set a(e) {
            throw new zr()
          }
          get b() {
            return this.value.b
          }
          set b(e) {
            throw new zr()
          }
          get c() {
            return this.value.c
          }
          set c(e) {
            throw new zr()
          }
          selectorString() {
            return typeof this.selector == "string" ||
              this.selector instanceof String
              ? this.selector
              : this.selector instanceof Object &&
                  this.selector.type === "Selector"
                ? hp(this.selector)
                : ""
          }
          toObject() {
            return this.value
          }
          toArray() {
            return [this.value.a, this.value.b, this.value.c]
          }
          toString() {
            return `(${this.value.a},${this.value.b},${this.value.c})`
          }
          toJSON() {
            return {
              selector: this.selectorString(),
              asObject: this.toObject(),
              asArray: this.toArray(),
              asString: this.toString(),
            }
          }
          isEqualTo(e) {
            return ea(this, e)
          }
          isGreaterThan(e) {
            return ta(this, e)
          }
          isLessThan(e) {
            return na(this, e)
          }
          static calculate(e) {
            return mt(e)
          }
          static calculateForAST(e) {
            return Gr(e)
          }
          static compare(e, t) {
            return bt(e, t)
          }
          static equals(e, t) {
            return ea(e, t)
          }
          static lessThan(e, t) {
            return na(e, t)
          }
          static greaterThan(e, t) {
            return ta(e, t)
          }
          static min(...e) {
            return jp(...e)
          }
          static max(...e) {
            return Kr(...e)
          }
          static sortAsc(...e) {
            return Sa(...e)
          }
          static sortDesc(...e) {
            return wa(...e)
          }
        }),
        (Sn = Hp)
    })
  function Wp(e, t) {
    if (e.decl.important !== t.decl.important) return e.decl.important ? 1 : -1
    if (e.rule.layered !== t.rule.layered)
      return e.rule.layered === e.decl.important ? 1 : -1
    if (e.rule.isInline !== t.rule.isInline) return e.rule.isInline ? 1 : -1
    let n = Sn.compare(e.rule.specificity, t.rule.specificity)
    return n !== 0 ? n : e.rule.order - t.rule.order
  }
  function Aa(e) {
    return e.includes("var(")
  }
  function Vp(e) {
    let t = [],
      n = 0,
      r = ""
    for (let o of e)
      o === "(" ? n++ : o === ")" && n--,
        n === 0 && o === " " ? (r && t.push(r.trim()), (r = "")) : (r += o)
    return r && t.push(r.trim()), t
  }
  function Kp(e, t) {
    let n = Vp(t)
    if (e.length === 4) {
      if (n.length === 1) return [n[0], n[0], n[0], n[0]]
      if (n.length === 2) return [n[0], n[1], n[0], n[1]]
      if (n.length === 3) return [n[0], n[1], n[2], n[1]]
      if (n.length >= 4) return [n[0], n[1], n[2], n[3]]
    }
    if (e.length === 2) {
      if (n.length === 1) return [n[0], n[0]]
      if (n.length >= 2) return [n[0], n[1]]
    }
    return e.map(() => t)
  }
  function Gp(e) {
    var r
    let t = e.trim()
    if (!t.startsWith("var(")) return null
    let n = t.match($p)
    return (r = n == null ? void 0 : n[1]) != null ? r : null
  }
  function Xp(e, t) {
    return t && e.includes("&") ? e.split("&").join(`:is(${t})`) : e
  }
  function qp(e, t) {
    if (!(e instanceof CSSMediaRule)) return !1
    try {
      let n = t.defaultView,
        r = e.media.mediaText
      if (n && r && !n.matchMedia(r).matches) return !0
    } catch (n) {}
    return !1
  }
  function _a(e, t, n, r, o) {
    for (let i of e) {
      let a
      if (
        (i instanceof CSSStyleRule &&
          ((a = Xp(i.selectorText, r)), t(i, a, o != null ? o : !1)),
        i instanceof CSSGroupingRule)
      ) {
        if (qp(i, n)) continue
        let u =
          typeof CSSLayerBlockRule != "undefined" &&
          i instanceof CSSLayerBlockRule
        try {
          _a(i.cssRules, t, n, a != null ? a : r, o || u)
        } catch (l) {}
      }
    }
  }
  function Yp(e) {
    return [...e.styleSheets, ...e.adoptedStyleSheets]
  }
  function Jp(e) {
    let t = e instanceof Document ? e : e.ownerDocument,
      n = new Set(),
      r = [],
      o = 0
    for (let i of Yp(e)) {
      let a
      try {
        a = i.cssRules
      } catch (u) {
        continue
      }
      _a(
        a,
        (u, l, s) => {
          r.push({ rule: u, resolvedSelector: l, order: o++, layered: s })
          let c = u.style
          for (let d = 0; d < c.length; d++) {
            let p = c[d]
            if (!Aa(c.getPropertyValue(p))) continue
            Ue.has(p) && n.add(p)
            let f = Up.get(p)
            if (f) for (let h of f.longhands) Ue.has(h) && n.add(h)
          }
        },
        t,
      )
    }
    return { stylesheetRules: r, cssVariableProperties: n }
  }
  function Ra(e, t) {
    let n = new Map()
    for (let r of t) {
      let o = e.getPropertyValue(r)
      o &&
        n.set(r, {
          value: o,
          important: e.getPropertyPriority(r) === "important",
        })
    }
    for (let { css: r, longhands: o } of Zr) {
      let i = e.getPropertyValue(r)
      if (!i || !Aa(i)) continue
      let a = e.getPropertyPriority(r) === "important",
        u = Kp(o, i)
      for (let l = 0; l < o.length; l++) {
        let s = o[l]
        if (t.has(s) && !n.has(s)) {
          let c = u[l]
          n.set(s, { value: c, important: a })
        }
      }
    }
    return n
  }
  function Zp({ rule: e, resolvedSelector: t, order: n, layered: r }, o) {
    let i = Ra(e.style, o)
    if (i.size === 0) return []
    let a = []
    try {
      for (let u of Sn.calculate(t))
        a.push({
          selectorText: u.selectorString(),
          specificity: u.value,
          order: n,
          layered: r,
          isInline: !1,
          declarations: i,
        })
    } catch (u) {
      a.push({
        selectorText: t,
        specificity: { a: 0, b: 0, c: 0 },
        order: n,
        layered: r,
        isInline: !1,
        declarations: i,
      })
    }
    return a
  }
  function Qp(e, t) {
    var r
    let n = null
    for (let o of t) {
      let i = o.declarations.get(e)
      i && (!n || Wp({ rule: o, decl: i }, n) > 0) && (n = { rule: o, decl: i })
    }
    return (r = n == null ? void 0 : n.decl.value) != null ? r : null
  }
  function ef(e, t) {
    if (!(e instanceof HTMLElement) || e.style.length === 0) return null
    let n = Ra(e.style, t)
    return n.size === 0
      ? null
      : {
          selectorText: "",
          specificity: { a: 0, b: 0, c: 0 },
          order: -1,
          layered: !1,
          isInline: !0,
          declarations: n,
        }
  }
  function va(e, t) {
    let { stylesheetRules: n, cssVariableProperties: r } = Jp(e)
    if (r.size === 0) return Fa
    let o = []
    for (let i of n) o.push(...Zp(i, r))
    return {
      selectorRules: o,
      cssVariableProperties: r,
      selectorRulesByElement: tf(o, t),
    }
  }
  function ka(e, t) {
    try {
      return e.matches(t)
    } catch (n) {
      return !1
    }
  }
  function tf(e, t) {
    if (e.length === 0) return Ta
    let n = t instanceof ShadowRoot ? t.host : null,
      r = new Map()
    for (let o of e) {
      let i = o.selectorText,
        a
      try {
        a = [...t.querySelectorAll(i)]
      } catch (u) {
        continue
      }
      t instanceof Element && ka(t, i) && a.push(t),
        n && i.startsWith(":host") && (i === ":host" || ka(n, i)) && a.push(n)
      for (let u of a) {
        let l = r.get(u)
        l ? l.push(o) : r.set(u, [o])
      }
    }
    return r
  }
  function xa(e, t) {
    var a
    if (t.cssVariableProperties.size === 0) return null
    let n = (a = t.selectorRulesByElement.get(e)) != null ? a : [],
      r = ef(e, t.cssVariableProperties),
      o = r ? [r, ...n] : n,
      i = {}
    for (let u of t.cssVariableProperties) {
      let l = Ue.get(u)
      if (!l) continue
      let s = Qp(u, o),
        c = s ? Gp(s) : null
      c && (i[l] = c)
    }
    for (let { js: u, longhands: l } of Zr) {
      if (i[u]) continue
      let s = l.map((d) => {
          let p = Ue.get(d)
          return p ? i[p] : void 0
        }),
        c = s[0]
      c && s.every((d) => d === c) && (i[u] = c)
    }
    return Object.keys(i).length > 0 ? i : null
  }
  var Ta,
    Fa,
    $p,
    Zr,
    Up,
    wn,
    Pa = F(() => {
      Ea()
      Qt()
      ;(Ta = new Map()),
        (Fa = {
          selectorRules: [],
          cssVariableProperties: new Set(),
          selectorRulesByElement: Ta,
        }),
        ($p = /var\(\s*(--[^,)\s]+)/),
        (Zr = [
          {
            css: "padding",
            js: "padding",
            longhands: [
              "padding-top",
              "padding-right",
              "padding-bottom",
              "padding-left",
            ],
          },
          {
            css: "margin",
            js: "margin",
            longhands: [
              "margin-top",
              "margin-right",
              "margin-bottom",
              "margin-left",
            ],
          },
          {
            css: "border-color",
            js: "borderColor",
            longhands: [
              "border-top-color",
              "border-right-color",
              "border-bottom-color",
              "border-left-color",
            ],
          },
          {
            css: "border-width",
            js: "borderWidth",
            longhands: [
              "border-top-width",
              "border-right-width",
              "border-bottom-width",
              "border-left-width",
            ],
          },
          {
            css: "border-radius",
            js: "borderRadius",
            longhands: [
              "border-top-left-radius",
              "border-top-right-radius",
              "border-bottom-right-radius",
              "border-bottom-left-radius",
            ],
          },
          { css: "gap", js: "gap", longhands: ["row-gap", "column-gap"] },
        ]),
        (Up = new Map(Zr.map((e) => [e.css, e])))
      wn = class {
        constructor(t) {
          I(this, "enabled")
          I(this, "byRoot")
          ;(this.enabled = t), (this.byRoot = new Map())
        }
        seed(t) {
          if (!this.enabled) return
          let n = t.getRootNode()
          this.byRoot.set(n, va(n, t))
        }
        forRoot(t) {
          let n = this.byRoot.get(t)
          return (
            n ||
              ((n =
                t.styleSheets.length > 0 || t.adoptedStyleSheets.length > 0
                  ? va(t, t instanceof Document ? t.documentElement : t)
                  : Fa),
              this.byRoot.set(t, n)),
            n
          )
        }
        forElement(t) {
          if (!this.enabled) return null
          let n = xa(t, this.forRoot(t.getRootNode())),
            r = t.shadowRoot ? xa(t, this.forRoot(t.shadowRoot)) : null
          return n && r ? k(k({}, r), n) : n != null ? n : r
        }
      }
    })
  function Na(e) {
    let t = e.cloneNode(!0)
    Ia(e, t)
    let { width: n, height: r } = window.getComputedStyle(e)
    return (
      n.endsWith("px") &&
        r.endsWith("px") &&
        (t.setAttribute("width", n), t.setAttribute("height", r)),
      t.outerHTML
    )
  }
  function Ia(e, t) {
    if (!(e instanceof Element) || !(t instanceof Element)) return
    let n = window.getComputedStyle(e)
    for (let [r, o] of Object.entries(La)) {
      let i = n.getPropertyValue(r)
      i && i.toLowerCase() !== o.toLowerCase() && t.setAttribute(rf[r], i)
    }
    for (let r = 0; r < e.childNodes.length; r++)
      Ia(e.childNodes[r], t.childNodes[r])
  }
  function nf(e) {
    return Object.fromEntries(
      e.map((t) => [t, t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()]),
    )
  }
  var La,
    rf,
    Ma = F(() => {
      La = {
        alignmentBaseline: "baseline",
        clip: "auto",
        clipPath: "none",
        clipRule: "nonzero",
        color: "rgb(0, 0, 0)",
        colorInterpolation: "sRGB",
        colorRendering: "auto",
        cursor: "auto",
        direction: "ltr",
        display: "inline",
        dominantBaseline: "auto",
        fill: "rgb(0, 0, 0)",
        fillOpacity: "1",
        fillRule: "nonzero",
        filter: "none",
        floodColor: "rgb(0, 0, 0)",
        floodOpacity: "1",
        imageRendering: "auto",
        letterSpacing: "normal",
        lightingColor: "rgb(255, 255, 255)",
        lineHeight: "normal",
        markerEnd: "none",
        markerMid: "none",
        markerStart: "none",
        mask: "none",
        opacity: "1",
        overflow: "visible",
        paintOrder: "normal",
        shapeRendering: "auto",
        stopColor: "rgb(0, 0, 0)",
        stopOpacity: "1",
        stroke: "none",
        strokeDasharray: "none",
        strokeDashoffset: "0px",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: "4",
        strokeOpacity: "1",
        strokeWidth: "1px",
        textAnchor: "start",
        textDecoration: "none solid rgb(0, 0, 0)",
        textRendering: "auto",
        unicodeBidi: "normal",
        vectorEffect: "none",
        visibility: "visible",
        whiteSpace: "normal",
        writingMode: "horizontal-tb",
      }
      rf = nf(Object.keys(La))
    })
  var Z,
    Oa = F(() => {
      ;(function (e) {
        ;(e[e.RUNTIME = 0] = "RUNTIME"),
          (e[e.SOURCE_MAP = 1] = "SOURCE_MAP"),
          (e[e.DATA_ATTRIBUTES = 2] = "DATA_ATTRIBUTES")
      })(Z || (Z = {}))
    })
  function Qr(e) {
    return x(this, null, function* () {
      let t = {}
      for (let [n, r] of e.assets.entries())
        t[n] = L(k({}, r), { blob: yield Da(r.blob) })
      return JSON.stringify(L(k({}, e), { assets: t, fonts: e.fonts }))
    })
  }
  function Da(e) {
    return x(this, null, function* () {
      if (e == null) return null
      let t = yield e.arrayBuffer(),
        n = yield eo(new Uint8Array(t))
      return { type: e.type, base64Blob: n }
    })
  }
  function eo(e) {
    return x(this, null, function* () {
      return yield new Promise((t, n) => {
        let r = Object.assign(new FileReader(), {
          onload: () => t(r.result),
          onerror: () => n(r.error),
        })
        r.readAsDataURL(new File([e], "", { type: "application/octet-stream" }))
      })
    })
  }
  var to = F(() => {})
  function Ba(e) {
    return x(this, null, function* () {
      let t = yield eo(new TextEncoder().encode(e))
      return t.slice(t.indexOf(",") + 1)
    })
  }
  function no(e, t) {
    return x(this, null, function* () {
      let n = t ? df + (yield Ba(JSON.stringify(t))) + pf : "",
        r = sf + (yield Ba(e)) + lf
      return new Blob([n + r], { type: "text/html" })
    })
  }
  var of,
    af,
    sf,
    lf,
    uf,
    cf,
    df,
    pf,
    ja = F(() => {
      to()
      ;(of = "<!--(figh2d)"),
        (af = "(/figh2d)-->"),
        (sf = '<span data-h2d="' + of),
        (lf = af + '"></span>'),
        (uf = "<!--(figmeta)"),
        (cf = "(/figmeta)-->"),
        (df = '<span data-metadata="' + uf),
        (pf = cf + '"></span>')
    })
  function Ae(e) {
    let t =
        e instanceof HTMLElement && typeof e.innerText == "string"
          ? e.innerText
          : e.textContent,
      n = t == null ? void 0 : t.replace(/\s+/g, " ").trim()
    if (!n) return
    let r = 80
    return n.length > r ? `${n.slice(0, r - 1)}...` : n
  }
  var za = F(() => {})
  function En(e) {
    if (e !== null) {
      let n = Ha.get(e)
      if (n) return n
    }
    let t = `h2d-node-${++Wa}`
    return e !== null && Ha.set(e, t), t
  }
  function $a(e) {
    return (
      e.forEach((t) => {
        t.decoding !== "sync" && (t.decoding = "sync"),
          t.loading !== "eager" && (t.loading = "eager")
      }),
      Promise.allSettled(e.map((t) => t.decode())).then((t) =>
        Promise.resolve(
          t.map((n, r) => {
            var o
            n.status === "rejected" &&
              console.debug(
                "Error decoding image",
                n.reason,
                (o = e[r]) == null ? void 0 : o.src,
              )
          }),
        ),
      )
    )
  }
  function Va(e, t) {
    return x(this, null, function* () {
      var u
      if (!(e instanceof Document) && !(e instanceof Element))
        throw new Error("Container node must be an Element or Document")
      let n = k(k({}, mf), t)
      Ga(n), (Wa = 0)
      let r = new wn((u = n.extractCssVariables) != null ? u : !1)
      r.seed(e instanceof Document ? e.documentElement : e)
      let o = new Yt(n),
        i = new Gt(),
        a
      if (e instanceof Element) {
        yield $a(Array.from(e.querySelectorAll("img")))
        let l = yield Ua(e, o, i, r, n),
          s = yield o.getBlobMap(),
          c = i.getFonts(),
          { width: d, height: p } = e.getBoundingClientRect()
        if (!l || l.nodeType !== ft.ELEMENT_NODE)
          throw new Error("Container node could not be serialized")
        return (
          n.devtools && (a = yield n.devtools.assignCollectedElementSources(l)),
          {
            root: l,
            documentTitle: document.title || void 0,
            documentRect: {
              x: 0,
              y: 0,
              width: e.scrollWidth,
              height: e.scrollHeight,
            },
            viewportRect: {
              x: e.scrollLeft,
              y: e.scrollTop,
              width: d,
              height: p,
            },
            devicePixelRatio: window.devicePixelRatio,
            version: 2,
            assets: s,
            fonts: c,
            sourceDataMap: a,
          }
        )
      } else if (e instanceof Document) {
        yield $a(Array.from(e.images))
        let l = yield Ua(e.documentElement, o, i, r, n),
          s = yield o.getBlobMap(),
          c = i.getFonts()
        if (!l || l.nodeType !== ft.ELEMENT_NODE)
          throw new Error("Container node must have a body element")
        return (
          n.devtools && (a = yield n.devtools.assignCollectedElementSources(l)),
          {
            documentTitle: e.title || void 0,
            root: l,
            documentRect: {
              x: 0,
              y: 0,
              width: document.documentElement.scrollWidth,
              height: document.documentElement.scrollHeight,
            },
            viewportRect: {
              x: 0,
              y: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            },
            devicePixelRatio: window.devicePixelRatio,
            version: 2,
            assets: s,
            fonts: c,
            sourceDataMap: a,
          }
        )
      }
      throw new Error("Container node must be an Element or Document")
    })
  }
  function Ua(e, t, n, r, o) {
    var a
    Ga(o)
    let i = (a = o.timeoutSignal) != null ? a : AbortSignal.timeout(ff)
    return new Promise((u, l) => {
      hf(() => {
        try {
          u(Ka(e, t, n, r, void 0, o.devtools))
        } catch (s) {
          l(s)
        } finally {
          Tr()
        }
      }, i),
        i.addEventListener(
          "abort",
          () => {
            Tr(),
              l(
                new xe(
                  "H2D requestAnimationFrame timed out",
                  "PAGE_NOT_RESPONDING",
                ),
              )
          },
          { once: !0 },
        )
    })
  }
  function hf(e, t) {
    if (t.aborted) return
    let n = requestAnimationFrame((r) => {
      t.aborted || e(r)
    })
    t.addEventListener("abort", () => cancelAnimationFrame(n), { once: !0 })
  }
  function Ka(e, t, n, r, o, i, a) {
    return Array.isArray(e) || e.nodeType === Node.TEXT_NODE
      ? oo(e, n, o)
      : e.nodeType === Node.ELEMENT_NODE
        ? yf(e, t, n, r, o, i, a)
        : (e.nodeType === Node.COMMENT_NODE ||
            console.warn(`Unsupported node type: ${e.nodeType}`),
          null)
  }
  function ro(e, t, n, r, o, i, a) {
    let u = []
    for (let l of wf(e)) {
      let s = Ka(l, t, n, r, o, i, a)
      s != null && u.push(s)
    }
    return u
  }
  function yf(e, t, n, r, o, i, a) {
    var w, z
    let u = o == null ? void 0 : o.inverseTransform,
      l = [],
      s,
      c
    if (!bf(e)) return null
    let d = wi(e)
    if (
      d === null ||
      d === "HEAD" ||
      d === "SCRIPT" ||
      d === "STYLE" ||
      d === "NOSCRIPT"
    )
      return null
    let p = Sr(e),
      f = dt(e)
    if (
      f &&
      f.length > 0 &&
      ((w = f[0]) == null ? void 0 : w.type) === "text" &&
      e.childNodes.length === 1
    ) {
      let H = oo(e.childNodes[0], n, o)
      return (H.sources = f), H
    }
    let { styles: h, computedStyles: S } = pt(e)
    qt(n, h)
    let E = en(e, h, u != null),
      g = tn(E, h),
      b = rn(e, E, g, u),
      C = nn(u, g, { x: b.x, y: b.y }),
      v = Mi(e, a)
    if (e instanceof SVGElement) s = Na(e)
    else if (e instanceof HTMLCanvasElement) c = t.addCanvas(e)
    else if (
      e instanceof HTMLSlotElement &&
      e.getRootNode() instanceof ShadowRoot
    ) {
      let H = { inverseTransform: C, styles: h }
      l = ro(e.assignedNodes({ flatten: !0 }), t, n, r, H, i, v)
    } else if (e.shadowRoot) {
      let H = { inverseTransform: C, styles: h }
      l = ro(e.shadowRoot.childNodes, t, n, r, H, i, v)
    } else {
      let H = { inverseTransform: C, styles: h }
      l = ro(e.childNodes, t, n, r, H, i, v)
    }
    let T
    ;((e instanceof HTMLInputElement && gf.has(e.type)) ||
      e instanceof HTMLTextAreaElement) &&
      e.placeholder &&
      (T = { placeholder: pt(e, "::placeholder").styles })
    let R,
      B = Fr(e, "::before", En(e) + "::before", C, n),
      y = Fr(e, "::after", En(e) + "::after", C, n)
    ;(B || y) && (R = { before: B, after: y }), gi(e, h, t)
    let m = {
      nodeType: Node.ELEMENT_NODE,
      id: En(e),
      tag: d,
      attributes: Sf(e),
      styles: h,
      rect: b,
      childNodes: l,
      content: s,
      placeholderUrl: c,
      pseudoElementNodes: R,
      pseudoElementStyles: T,
      owningReactComponent: v,
      sources: f,
      selectionSourceId: p,
      figmaComponentMetadata: e.getAttribute("data-figma-asset-key")
        ? {
            assetKey: e.getAttribute("data-figma-asset-key"),
            variantProps: Cf(
              (z = e.getAttribute("data-figma-variant-props")) != null
                ? z
                : void 0,
            ),
          }
        : void 0,
    }
    Object.keys(S).length > 0 && (m.computedStyles = S)
    let A = r.forElement(e)
    return (
      A && (m.variableStyles = A),
      i == null ||
        i.collectElementSource(m.id, e, {
          componentName: !0,
          sourceFile: !0,
          timeout: 5e3,
        }),
      m
    )
  }
  function bf(e) {
    return !(
      e instanceof HTMLScriptElement ||
      (e.nodeType === Node.ELEMENT_NODE &&
        e.getAttribute("data-h2d-ignore") === "true")
    )
  }
  function Cf(e) {
    if (e)
      try {
        return JSON.parse(e)
      } catch (t) {
        return
      }
  }
  function Sf(e) {
    let t = {}
    for (let { name: n, value: r } of e.attributes) {
      let o = n.toLowerCase()
      ;(Ef.has(o) || o.startsWith("aria-")) && (t[n] = r)
    }
    return (
      e instanceof HTMLVideoElement && e.poster && (t.poster = e.poster),
      (e instanceof HTMLImageElement || e instanceof HTMLVideoElement) &&
        e.currentSrc &&
        (t.currentSrc = e.currentSrc),
      e instanceof HTMLInputElement && t.type == null && (t.type = e.type),
      t
    )
  }
  function oo(e, t, n) {
    var l
    let r = n ? Xt(t, n.styles) : null,
      s = an(
        e,
        (l = n == null ? void 0 : n.inverseTransform) != null ? l : null,
        r,
      ),
      { lineCount: o } = s,
      i = q(s, ["lineCount"]),
      a = Array.isArray(e)
        ? e.map((c) => c.textContent || "").join("")
        : e.textContent || "",
      u = Array.isArray(e) ? (e.length === 1 ? e[0] : null) : e
    return {
      nodeType: Node.TEXT_NODE,
      id: En(u),
      text: a,
      rect: i,
      lineCount: o,
    }
  }
  function* wf(e) {
    let t = e[Symbol.iterator](),
      n = t.next()
    for (; !n.done; )
      if (n.value.nodeType === Node.TEXT_NODE) {
        let r = [n.value]
        for (n = t.next(); !n.done && n.value.nodeType === Node.TEXT_NODE; )
          r.push(n.value), (n = t.next())
        yield r
      } else yield n.value, (n = t.next())
  }
  function Ga(e) {
    if (!e.assertLayoutValid) return
    let t = document.body.getBoundingClientRect()
    if (
      t.x === 0 &&
      t.y === 0 &&
      t.width === 0 &&
      t.height === 0 &&
      t.top === 0 &&
      t.right === 0 &&
      t.bottom === 0 &&
      t.left === 0
    )
      throw new Error("Document does not have valid layout")
  }
  var xe,
    ft,
    ff,
    Wa,
    Ha,
    mf,
    gf,
    Ef,
    me = F(() => {
      Kt()
      wr()
      Ci()
      kr()
      Li()
      Bi()
      Pa()
      Qt()
      Ma()
      xr()
      Oa()
      on()
      ja()
      za()
      to()
      ;(xe = class extends Error {
        constructor(n, r) {
          super(n)
          I(this, "code")
          ;(this.code = r), (this.name = "H2DError")
        }
      }),
        (ft = { ELEMENT_NODE: 1, TEXT_NODE: 3 }),
        (ff = 1e4),
        (Wa = 0),
        (Ha = new WeakMap())
      mf = {
        assertLayoutValid: !0,
        skipRemoteAssetSerialization: !1,
        devtools: void 0,
      }
      gf = new Set([
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "number",
      ])
      Ef = new Set([
        "alt",
        "checked",
        "currentSrc",
        "disabled",
        "for",
        "href",
        "id",
        "multiple",
        "placeholder",
        "poster",
        "readonly",
        "rel",
        "required",
        "role",
        "selected",
        "target",
        "title",
        "type",
        "value",
      ])
    })
  function Ee(e) {
    if (typeof e == "string") {
      let t = e.replace(/\\/g, "/").toLowerCase()
      for (let n of Qf) if (t.includes(n)) return !0
    }
    return !1
  }
  var Qf,
    At = F(() => {
      Qf = [
        "/node_modules/",
        "/components/ui/",
        "/components/figma/",
        "/shared/",
      ]
    })
  function ve(e) {
    let t = typeof e == "string" ? e.trim() : ""
    return !(!t || t !== t.toLowerCase() || !/^[a-z][\w-]*$/.test(t))
  }
  function Co(e) {
    let t = e.filePath
    return typeof t == "string" && t.trim() !== "" ? !1 : ve(e.componentName)
  }
  function De(e, t) {
    var i
    let n = (i = t == null ? void 0 : t.forCompositeFiber) != null ? i : !0
    if (e === void 0 || e === "") return !1
    let r = e.trim()
    if (r.length === 0) return !1
    if (tm.has(r) || nm.has(r) || r === "Slot" || r === "SlotClone") return !0
    for (let a of em) if (r.startsWith(a)) return !0
    if (/\.(Provider|Consumer)$/.test(r) || r.endsWith("Provider")) return !0
    if (!n) return !1
    let o = r.codePointAt(0)
    return o === void 0 || o < 65 || o > 90
  }
  function On(e, t, n = []) {
    if (t < 1) return []
    let r = new Set(n.filter(Boolean)),
      o = []
    for (let i of e) {
      if (!i.fileName || i.fileName === "(native)") continue
      let a =
        i.functionName && i.functionName !== "(anonymous)"
          ? i.functionName
          : void 0
      if (
        !(
          !Boolean(
            (i.functionName && r.has(i.functionName)) || (a && r.has(a)),
          ) && De(a, { forCompositeFiber: !0 })
        ) &&
        (o.push(i), o.length >= t)
      )
        break
    }
    return o
  }
  var em,
    tm,
    nm,
    _t = F(() => {
      ;(em = [
        "_",
        "$",
        "motion.",
        "styled.",
        "chakra.",
        "ark.",
        "Primitive.",
        "Slot.",
      ]),
        (tm = new Set([
          "InnerLayoutRouter",
          "OuterLayoutRouter",
          "RedirectErrorBoundary",
          "RedirectBoundary",
          "HTTPAccessFallbackErrorBoundary",
          "HTTPAccessFallbackBoundary",
          "LoadingBoundary",
          "ErrorBoundary",
          "InnerScrollAndFocusHandler",
          "ScrollAndFocusHandler",
          "RenderFromTemplateContext",
          "body",
          "html",
          "DevRootHTTPAccessFallbackBoundary",
          "AppDevOverlayErrorBoundary",
          "AppDevOverlay",
          "HotReload",
          "Router",
          "ErrorBoundaryHandler",
          "AppRouter",
          "ServerRoot",
          "SegmentStateProvider",
          "RootErrorBoundary",
          "LoadableComponent",
          "MotionDOMComponent",
        ])),
        (nm = new Set([
          "Suspense",
          "Fragment",
          "StrictMode",
          "Profiler",
          "SuspenseList",
        ]))
    })
  function wo(e) {
    if (!(e == null || typeof e != "string" || e.trim() === "")) {
      try {
        ;(e = e.trim()), e.includes("://") && (e = new URL(e).pathname)
      } catch (t) {
        return console.error("Error normalizing source file path", t), e
      }
      return (
        e.startsWith(`${ys}/`) && (e = e.slice(ys.length)),
        (e = e.replace(/^\/([A-Za-z]:\/)/, "$1")),
        e
      )
    }
  }
  var So,
    ys,
    bs = F(() => {
      ;(So = 500), (ys = "/@fs")
    })
  function rm() {
    return typeof Element != "undefined" ? Element : globalThis.Element
  }
  function om() {
    return typeof Node != "undefined" ? Node : globalThis.Node
  }
  function le(e) {
    if (e == null || typeof e != "object") return !1
    let t = rm()
    return typeof t == "function"
      ? e instanceof t
      : "nodeType" in e && e.nodeType === 1 && "tagName" in e
  }
  function Cs(e) {
    if (e == null || typeof e != "object") return !1
    let t = om()
    return typeof t == "function" ? e instanceof t : "nodeType" in e
  }
  function Rt(e) {
    var t, n
    if (
      !e ||
      !e.tagName ||
      im.has((t = e.tagName) == null ? void 0 : t.toLowerCase()) ||
      am.has(e.id) ||
      ((n = e.id) != null && n.startsWith("__figma-picker-"))
    )
      return !0
    for (let r of sm) if (e.hasAttribute(r)) return !0
    return !1
  }
  function lm(e, t, n, r) {
    let o = `${e}:${t != null ? t : ""}:${n != null ? n : -1}:${
        r != null ? r : -1
      }`,
      i = 2166136261
    for (let a = 0; a < o.length; a++)
      (i ^= o.charCodeAt(a)), (i = Math.imul(i, 16777619))
    return (i >>> 0).toString(16).padStart(8, "0")
  }
  function vo(e) {
    var c, d
    if (!e) return
    let { frames: t } = e
    if (!t || t.length === 0) return
    let n, r, o, i, a
    for (let p = 0; p < t.length; p++) {
      let f = t[p]
      f.sourceLocationKey = lm(f.componentName, f.filePath, f.line, f.column)
      let h = typeof f.filePath == "string" && f.filePath.trim() !== "",
        S = typeof f.componentName == "string" && f.componentName.trim() !== "",
        E = ve(f.componentName)
      h && typeof f.line == "number" && typeof f.column == "number" && (n = f),
        h && (r = f),
        E || (o = f),
        S && (i = f),
        !E && S && p !== t.length - 1 && (a = f)
    }
    let u = t[t.length - 1],
      l = (d = (c = n != null ? n : r) != null ? c : o) != null ? d : u
    if (
      ((e.sourceLocationKey = l.sourceLocationKey),
      (typeof u.componentName == "string" ? u.componentName.trim() : "") === "")
    ) {
      e.displayName = i == null ? void 0 : i.componentName
      return
    }
    if (ve(u.componentName) && t.length > 1 && a && Ee(a.filePath)) {
      e.displayName = a.componentName
      return
    }
    e.displayName = u.componentName
  }
  function Pt(e, t) {
    var n
    if (e) {
      if (e.id === t) return e
      for (let r of (n = e.children) != null ? n : []) {
        let o = Pt(r, t)
        if (o) return o
      }
    }
  }
  var Ze,
    Eo,
    im,
    am,
    sm,
    ne = F(() => {
      At()
      _t()
      bs()
      ;(Ze = "data-fge-id"), (Eo = "data-fge-deleted")
      ;(im = new Set([
        "script",
        "style",
        "noscript",
        "head",
        "meta",
        "link",
        "title",
        "template",
        "base",
        "fg-inspector-overlay-element",
      ])),
        (am = new Set(["__next-route-announcer__"])),
        (sm = [Eo, "data-html-editor-overlay", "data-h2d-ignore"])
    })
  function ue(e) {
    let t = e.tagName.toLowerCase()
    if (
      ko.has(t) ||
      e.hasAttribute("role") ||
      e.hasAttribute("aria-label") ||
      e.hasAttribute("aria-labelledby") ||
      e.hasAttribute("alt") ||
      e.hasAttribute("title")
    )
      return "retained"
    for (let n = 0; n < e.childNodes.length; n++) {
      let r = e.childNodes[n]
      if (r && r.nodeType === 3) {
        let o = r.nodeValue
        if (o != null && o.trim() !== "") return "retained"
      }
    }
    return "wrapper"
  }
  function xo(e, t) {
    if (!(!e || e.length === 0))
      for (let n = e.length - 1; n >= 0; n--) {
        let r = e[n]
        if (!r) continue
        let o = r.componentName
        if (
          !(typeof o != "string" || o === "") &&
          !ve(o) &&
          !De(o, { forCompositeFiber: !1 })
        )
          return r
      }
  }
  function Dn(e, t) {
    let n = xo(e == null ? void 0 : e.frames, t)
    if (!n) return {}
    let r = {}
    return (
      n.componentName != null && (r.ownerComponentName = n.componentName),
      n.filePath != null && (r.ownerFilePath = n.filePath),
      n.sourceLocationKey != null &&
        (r.ownerSourceLocationKey = n.sourceLocationKey),
      r
    )
  }
  function Bn(e) {
    let { parentOwnerKey: t, frames: n } = e
    if (typeof t != "string" || t === "" || !n || n.length === 0) return !1
    for (let r of n) if (r.sourceLocationKey === t) return !1
    return !0
  }
  function jn(e) {
    let { ownerKey: t, ancestorOwnerKeys: n } = e
    return typeof t != "string" || t === "" ? !1 : n.has(t)
  }
  var ko,
    Qe = F(() => {
      _t()
      ko = new Set([
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "a",
        "button",
        "input",
        "select",
        "textarea",
        "label",
        "details",
        "summary",
        "img",
        "picture",
        "video",
        "audio",
        "svg",
        "canvas",
        "iframe",
        "p",
        "blockquote",
        "code",
        "pre",
        "em",
        "strong",
        "li",
        "td",
        "th",
      ])
    })
  function et(e, t) {
    if (!e || e.length === 0) return { children: void 0, changed: !1 }
    let n = [],
      r = !1
    for (let o of e) {
      let i = t(o)
      i !== o && (r = !0), n.push(i)
    }
    return { children: n, changed: r }
  }
  function tt(e, t) {
    let n = k({}, e)
    return t && t.length > 0 ? (n.children = t) : delete n.children, n
  }
  var Nt = F(() => {})
  function Ss(e, t) {
    return ws(e, t)
  }
  function ws(e, t) {
    let { children: n, changed: r } = et(e.children, (a) => ws(a, t)),
      o =
        e.kind === "composite" &&
        e.isLibraryComposite !== !0 &&
        um(e, n != null ? n : [], t)
    if (!o && !r) return e
    let i = tt(e, n)
    return o && (i.isLibraryComposite = !0), i
  }
  function um(e, t, n) {
    if (typeof e.definitionFilePath == "string" && e.definitionFilePath !== "")
      return !!n(e.definitionFilePath)
    let r = e.componentName
    if (r == null || r === "") return !1
    for (let o of t) {
      let i = Es(o, r, n)
      if (i === "library") return !0
      if (i === "user") return !1
    }
    return !1
  }
  function Es(e, t, n) {
    if (
      (e.kind === "host" || e.kind === "wrapper") &&
      e.ownerComponentName === t
    )
      return n(e.ownerFilePath) ? "library" : "user"
    if (e.hasExternalOwner === !0) return "unknown"
    let r = e.children
    if (!r || r.length === 0) return "unknown"
    for (let o of r) {
      let i = Es(o, t, n)
      if (i !== "unknown") return i
    }
    return "unknown"
  }
  var vs = F(() => {
    Nt()
  })
  var nt,
    cm,
    To = F(() => {
      ;(nt = Object.freeze({
        showWrapperHosts: !0,
        showHostElements: !0,
        showFragments: !0,
        showInfrastructureComposites: !1,
        showPassthroughComposites: !1,
        showTextLeaves: !1,
        treatSvgAsLeaf: !0,
      })),
        (cm = Object.freeze({
          showWrapperHosts: !0,
          showHostElements: !0,
          showFragments: !0,
          showInfrastructureComposites: !0,
          showPassthroughComposites: !0,
          showTextLeaves: !0,
          treatSvgAsLeaf: !1,
        }))
    })
  function ks(e) {
    let t = new Set()
    return xs(e, [], t), t.size === 0 ? e : Ts(e, t)
  }
  function xs(e, t, n) {
    let r = e.kind === "composite"
    if (
      (r && t.push(e),
      (e.kind === "host" || e.kind === "wrapper") &&
        e.isLibraryComposite === !0 &&
        e.hasExternalOwner === !0 &&
        typeof e.ownerComponentName == "string" &&
        e.ownerComponentName !== "")
    ) {
      let o = e.ownerComponentName
      for (let i = t.length - 1; i >= 0; i--) {
        let a = t[i]
        if (a.componentName === o && a.hasExternalOwner !== !0) {
          n.add(a)
          break
        }
      }
    }
    if (e.children && e.children.length > 0)
      for (let o of e.children) xs(o, t, n)
    r && t.pop()
  }
  function Ts(e, t) {
    let { children: n, changed: r } = et(e.children, (a) => Ts(a, t)),
      o = t.has(e)
    if (!o && !r) return e
    let i = tt(e, n)
    return o && (i.hasExternalOwner = !0), i
  }
  var Fs = F(() => {
    Nt()
  })
  function As(e, t) {
    if (!e) return
    let n = t.showPassthroughComposites === !0,
      r = t.showWrapperHosts === !0
    return !r || !n
      ? _s(e, { showWrapperHosts: r, showPassthroughComposites: n }, !0)[0]
      : e
  }
  function _s(e, t, n = !1) {
    let r = e.children,
      o,
      i = !1
    if (r && r.length > 0) {
      o = []
      for (let u of r) {
        let l = _s(u, t)
        ;(l.length !== 1 || l[0] !== u) && (i = !0)
        for (let s of l) o.push(s)
      }
    }
    if (
      !n &&
      !t.showPassthroughComposites &&
      e.kind === "composite" &&
      e.isLibraryComposite !== !0 &&
      Rs(o)
    )
      return o != null ? o : []
    let a =
      e.kind === "wrapper" &&
      e.hasExternalOwner === !0 &&
      e.ownerComponentName != null &&
      e.ownerComponentName !== ""
    return !n && !t.showWrapperHosts && e.kind === "wrapper" && !a
      ? o != null
        ? o
        : []
      : i
        ? [tt(e, o)]
        : [e]
  }
  function Rs(e) {
    if (!e || e.length === 0) return !1
    for (let t of e)
      if (
        t.hasExternalOwner !== !0 &&
        (t.kind === "host" ||
          t.kind === "wrapper" ||
          t.kind === "text" ||
          !Rs(t.children))
      )
        return !1
    return !0
  }
  var Ps = F(() => {
    Nt()
  })
  function zn(e) {
    var n
    let t = e.shadowRoot
    if (t)
      return ((n = t.constructor) == null ? void 0 : n.name) === "ShadowRoot"
        ? "native"
        : "opaque"
    if (
      e.tagName.includes("-") &&
      e.children.length === 0 &&
      e.getClientRects().length > 0
    )
      return "opaque"
  }
  var Fo = F(() => {})
  function It(e) {
    return x(this, null, function* () {
      var s, c
      let t = (s = e.assignInstanceId) != null ? s : rt(),
        n = dm(e.options),
        r = yield e.buildRawTree(e.rootEl, t, n)
      if (!r) return
      let o = yield pm(r, e.devtools),
        i = fm(r, o, n),
        a = Ss(i, (c = n.isLibrary) != null ? c : Ee),
        u = ks(a),
        l = As(u, n)
      return {
        componentTree: l != null ? l : u,
        sourceDataByElementId: Object.fromEntries(o),
      }
    })
  }
  function dm(e) {
    return e ? k(k({}, nt), e) : nt
  }
  function rt() {
    let e = 0,
      t = new WeakMap()
    return (n) => {
      let r = t.get(n)
      if (r != null) return r
      let o = `cmp-tree-${e++}`
      return t.set(n, o), o
    }
  }
  function pm(e, t) {
    return x(this, null, function* () {
      let n = new Map()
      Is(e, t, e.hostElement)
      try {
        let r = yield t.assignCollectedElementSources(Ls(e))
        for (let [o, i] of Object.entries(r)) n.set(o, i)
      } catch (r) {
        console.error(r)
      }
      return n
    })
  }
  function Is(e, t, n) {
    e.hostElement
      ? t.collectElementSource(e.id, e.hostElement, Ns)
      : e.compositeFiber != null &&
        n &&
        t.collectCompositeSource &&
        t.collectCompositeSource(e.id, e.compositeFiber, n, Ns)
    for (let r of e.children) Is(r, t, n)
  }
  function Ls(e) {
    return { id: e.id, childNodes: e.children.map(Ls) }
  }
  function fm(e, t, n) {
    var l, s, c
    let r = { totalNodes: 0 },
      o = n.showTextLeaves === !0,
      i = Ms(e.children, t, r, 0, o),
      a =
        (c =
          (s =
            (l = e.hostElement) == null ? void 0 : l.tagName.toLowerCase()) !=
          null
            ? s
            : e.displayName) != null
          ? c
          : "",
      u = { id: e.id, displayName: a, kind: "host", tagName: a }
    return i.length > 0 && (u.children = i), u
  }
  function Ms(e, t, n, r, o) {
    if (r >= Em) return []
    let i = []
    for (let a of e) {
      if (n.totalNodes >= Ao) break
      let u = t.get(a.id),
        l = mm(a, u),
        s = Ms(a.children, t, n, r + 1, o),
        c = o && a.hostElement ? Sm(a.hostElement, a.id) : [],
        d = wm(c, s, n)
      d.length > 0 && (l.children = d), i.push(l), (n.totalNodes += 1)
    }
    return i
  }
  function mm(e, t) {
    var l, s
    let n = hm(e),
      r = gm(e, t),
      o = (l = e.displayName) != null ? l : r,
      i = { id: e.id, kind: n, displayName: o, tagName: r }
    if (
      (e.key != null && (i.key = e.key),
      e.hocDisplayNames &&
        e.hocDisplayNames.length > 0 &&
        (i.hocDisplayNames = e.hocDisplayNames),
      n === "composite")
    ) {
      let c = ym(e, t)
      c != null && (i.componentName = c)
    }
    let a = e.hostElement
    if (a) {
      a.id && (i.htmlId = a.id)
      let c = Cm(a)
      c.length > 0 && (i.htmlClass = c.join("."))
      let d = zn(a)
      d && (i.shadowHost = d)
    }
    ;(t == null ? void 0 : t.ownerComponentName) != null &&
      (i.ownerComponentName = t.ownerComponentName),
      (t == null ? void 0 : t.ownerFilePath) != null &&
        (i.ownerFilePath = t.ownerFilePath),
      (t == null ? void 0 : t.ownerSourceLocationKey) != null &&
        (i.ownerSourceLocationKey = t.ownerSourceLocationKey),
      (t == null ? void 0 : t.sourceLocationKey) != null &&
        (i.sourceLocationKey = t.sourceLocationKey)
    let u = bm(t)
    if (
      (u != null && (i.definitionFilePath = u),
      t != null && t.hasExternalOwner && (i.hasExternalOwner = !0),
      t != null && t.isLibraryComposite && (i.isLibraryComposite = !0),
      n === "host" && a)
    ) {
      let c = ((s = a.textContent) != null ? s : "").trim()
      c !== "" &&
        (i.textPreview = c.length > Hn ? c.slice(0, Hn) + "\u2026" : c)
    }
    return i
  }
  function hm(e) {
    if (e.kind === "composite") return "composite"
    let t = e.hostElement
    return t
      ? ue(t) === "retained"
        ? "host"
        : "wrapper"
      : e.kind === "host"
        ? "host"
        : "wrapper"
  }
  function gm(e, t) {
    var n
    return t != null && t.tagName
      ? t.tagName
      : e.hostElement
        ? e.hostElement.tagName.toLowerCase()
        : (n = e.displayName) != null
          ? n
          : ""
  }
  function ym(e, t) {
    var n
    return e.displayName != null && e.displayName !== ""
      ? e.displayName
      : (n = t == null ? void 0 : t.ownerComponentName) != null
        ? n
        : void 0
  }
  function bm(e) {
    let t = e == null ? void 0 : e.frames
    if (!t || t.length === 0) return
    let n = e == null ? void 0 : e.sourceLocationKey
    if (n != null)
      for (let o = 0; o < t.length; o++) {
        let i = t[o]
        if ((i == null ? void 0 : i.sourceLocationKey) === n)
          return typeof i.filePath == "string" && i.filePath !== ""
            ? i.filePath
            : void 0
      }
    let r = t[t.length - 1]
    return typeof (r == null ? void 0 : r.filePath) == "string" &&
      r.filePath !== ""
      ? r.filePath
      : void 0
  }
  function Cm(e) {
    return Array.from(e.classList).filter((t) => t && !t.startsWith("__"))
  }
  function Sm(e, t) {
    let n = [],
      r = 0
    for (let o = 0; o < e.childNodes.length; o++) {
      let i = e.childNodes[o]
      if (!i || i.nodeType !== 3) continue
      let a = i.nodeValue
      if (a == null) continue
      let u = a.trim()
      if (u === "") continue
      let l = u.length > Hn ? u.slice(0, Hn) + "\u2026" : u
      n.push({
        id: `${t}::text:${r}`,
        kind: "text",
        displayName: l,
        textPreview: l,
      }),
        (r += 1)
    }
    return n
  }
  function wm(e, t, n) {
    if (e.length === 0) return t
    let r = []
    for (let o of e) {
      if (n.totalNodes >= Ao) break
      r.push(o), (n.totalNodes += 1)
    }
    for (let o of t) {
      if (n.totalNodes >= Ao) break
      r.push(o)
    }
    return r
  }
  var Ao,
    Em,
    Hn,
    Ns,
    Os = F(() => {
      vs()
      To()
      Fs()
      Ps()
      At()
      Fo()
      Qe()
      ;(Ao = 1500),
        (Em = 40),
        (Hn = 40),
        (Ns = { sourceFile: !0, componentName: !0, includeAncestorContext: !0 })
    })
  function Lt(e, t) {
    var r
    if (!e) return
    let n = {
      hideLibraryInternals: t.showLibraryComponentInternals !== !0,
      showHostElements: t.showHostElements !== !1,
      showWrapperHosts: t.showWrapperHosts !== !1,
      showTextNodes: t.showTextNodes !== !1,
      showLibraryComposites: t.showLibraryComposites !== !1,
      showShadowHosts: t.showShadowHosts !== !1,
      slotContentOnly: t.slotContentOnly === !0,
      hideHocs: t.hideHocs === !0,
      componentNameRe: Bs(t.hideComponentNamePattern),
      filePathRe: Bs(t.hideFilePathPattern),
      query: ((r = t.query) != null ? r : "").trim().toLowerCase(),
    }
    return js(e, !0, !1, n)
  }
  function _o(e) {
    return {
      query: (e != null ? e : "").trim().toLowerCase(),
      composedContentOnly: !1,
      libraryOnly: !1,
    }
  }
  function js(e, t, n, r) {
    let o = n || (!t && e.kind === "composite" && e.isLibraryComposite === !0),
      { children: i, changed: a } = et(e.children, (c) => js(c, !1, o, r)),
      u = !t && vm(e, n, r)
    if (!u && !a && e.hidden === void 0) return e
    let l = k({}, e)
    u ? (l.hidden = !0) : delete l.hidden
    let s = a ? i : e.children
    return s && s.length > 0 ? (l.children = s) : delete l.children, l
  }
  function vm(e, t, n) {
    return !!(
      (!n.showHostElements && e.kind === "host") ||
      (!n.showWrapperHosts && e.kind === "wrapper") ||
      (!n.showTextNodes && e.kind === "text") ||
      (!n.showLibraryComposites &&
        e.kind === "composite" &&
        e.isLibraryComposite === !0) ||
      (!n.showShadowHosts && e.shadowHost !== void 0) ||
      (n.slotContentOnly && e.hasExternalOwner !== !0) ||
      (n.hideLibraryInternals &&
        t &&
        (e.kind === "host" || e.kind === "wrapper") &&
        e.isLibraryComposite === !0) ||
      (n.componentNameRe &&
        Ds(n.componentNameRe, [e.componentName, e.displayName])) ||
      (n.filePathRe &&
        Ds(n.filePathRe, [e.definitionFilePath, e.ownerFilePath])) ||
      (n.hideHocs &&
        e.hocDisplayNames !== void 0 &&
        e.hocDisplayNames.length > 0) ||
      (n.query !== "" && !km(e, n.query))
    )
  }
  function Ds(e, t) {
    for (let n of t) if (n !== void 0 && e.test(n)) return !0
    return !1
  }
  function Bs(e) {
    let t = e == null ? void 0 : e.trim()
    if (t)
      try {
        return new RegExp(t, "i")
      } catch (n) {
        return
      }
  }
  function km(e, t) {
    let n = [
      e.componentName,
      e.tagName,
      e.htmlId,
      e.htmlClass,
      e.ownerComponentName,
      e.textPreview,
    ]
    for (let r of n) if (r && r.toLowerCase().includes(t)) return !0
    return !1
  }
  var Ro = F(() => {
    Nt()
  })
  function No(e, t) {
    if (!e) return
    let n = Lo(e, t)
    if (!n) return
    let r = n[n.length - 1]
    if (r.kind === "host" || r.kind === "wrapper") return r.id
    let o = Po(r)
    if (o) return o
    for (let i = n.length - 2; i >= 0; i--) {
      let a = n[i]
      if (a.kind === "host" || a.kind === "wrapper") return a.id
      let u = Po(a)
      if (u) return u
    }
  }
  function Io(e, t) {
    if (!e) return
    let n = Lo(e, t)
    if (n) return n.map((r) => r.id)
  }
  function Ot(e, t, n) {
    if (!t) return
    let r,
      o,
      i,
      a = !1,
      u = e
    for (; u; ) {
      let l = n(u),
        s = t[l]
      if (s) {
        if (r === void 0)
          (r = l),
            (o = l),
            s.isLibraryComposite && ((i = s.ownerSourceLocationKey), (a = !0))
        else if (a)
          if (s.isLibraryComposite && s.ownerSourceLocationKey === i) o = l
          else break
      }
      u = u.parentElement
    }
    if (r !== void 0)
      return { targetElementId: r, promotedElementId: o != null ? o : r }
  }
  function Po(e) {
    var t
    if (e.kind === "host" || e.kind === "wrapper") return e.id
    for (let n of (t = e.children) != null ? t : []) {
      let r = Po(n)
      if (r) return r
    }
  }
  function Lo(e, t, n = []) {
    var o
    let r = [...n, e]
    if (e.id === t) return r
    for (let i of (o = e.children) != null ? o : []) {
      let a = Lo(i, t, r)
      if (a) return a
    }
  }
  function Dt(e, t, n) {
    if (e.id === t) return n
    if (e.children)
      for (let r of e.children) {
        let o = Dt(r, t, [...n, e.id])
        if (o) return o
      }
  }
  function Bt(e, t) {
    if (!e) return t
    if ((e.hidden || t.add(e.id), e.children))
      for (let n of e.children) Bt(n, t)
    return t
  }
  function $n(e, t, n) {
    if (n.length === 0) return new Set()
    if (!e || !t) return new Set(n)
    let r = Bt(t, new Set())
    r.delete(t.id)
    let o = new Set()
    for (let i of n) {
      if (r.has(i)) {
        o.add(i)
        continue
      }
      let a = Dt(e, i, [])
      if (a)
        for (let u = a.length - 1; u >= 0; u--) {
          let l = a[u]
          if (r.has(l)) {
            o.add(l)
            break
          }
        }
    }
    return o
  }
  function Mo(e, t, n) {
    let r = n != null ? n : []
    if (!e || r.length === 0) return Mt(e, void 0)
    let o = Lt(e, t),
      a = $n(e, o, r).values().next().value
    return Mt(e, a)
  }
  function Mt(e, t) {
    let n = e !== void 0 && t !== void 0 ? Pt(e, t) : void 0,
      r =
        (n == null ? void 0 : n.kind) === "composite" ||
        (((n == null ? void 0 : n.kind) === "host" ||
          (n == null ? void 0 : n.kind) === "wrapper") &&
          n.isLibraryComposite === !0),
      o = n != null && !r
    return {
      effectiveId: t,
      node: n,
      displayName: n == null ? void 0 : n.displayName,
      isComponentSelection: r,
      isElementSelection: o,
    }
  }
  var Oo = F(() => {
    ne()
    Ro()
  })
  function Do(e) {
    let t = e.filter((r) => r.type !== "listener"),
      n = t.filter((r) => r.descriptor != null)
    return n.length === 0 ? t : n
  }
  function Un(e) {
    return e.some((t) => t.type !== "listener" && t.descriptor != null)
  }
  function Bo({
    isElementSelection: e,
    isComponentSelection: t,
    componentProps: n,
  }) {
    var a
    let r =
        !e &&
        ((a = n == null ? void 0 : n.length) != null ? a : 0) > 0 &&
        Un(n != null ? n : []),
      o = t && n === void 0
    return {
      showComponentProps: r,
      showComponentPropsEmptyState: t && !r && !o,
      isComponentPropsPending: o,
    }
  }
  var zs = F(() => {})
  function jt(e) {
    return e == null || e === ""
      ? !1
      : !!(
          Wn.has(e) ||
          Hs.has(e) ||
          Us.has(e) ||
          e.endsWith("Provider") ||
          e.endsWith("Consumer") ||
          xm(e, $s)
        )
  }
  function xm(e, t) {
    for (let n of t) if (((n.lastIndex = 0), n.test(e))) return !0
    return !1
  }
  var Wn,
    Hs,
    $s,
    Us,
    jo = F(() => {
      ;(Wn = new Set([
        "Context.Provider",
        "Context.Consumer",
        "Suspense",
        "SuspenseList",
        "Fragment",
        "Profiler",
        "StrictMode",
        "Activity",
        "Cache",
        "Scope",
        "TracingMarker",
        "ViewTransition",
        "HostRoot",
        "Mode",
      ])),
        (Hs = new Set([
          "Root",
          "AppContainer",
          "Container",
          "ReactDevOverlay",
          "Head",
          "Script",
          "NextHead",
          "NextScript",
          "GlobalHead",
          "RouteAnnouncer",
          "DefaultErrorPage",
          "ServerRoot",
          "AppRouter",
          "OuterLayoutRouter",
          "InnerLayoutRouter",
          "RenderFromTemplateContext",
          "ScrollAndFocusHandler",
          "InnerScrollAndFocusHandler",
          "RedirectBoundary",
          "RedirectErrorBoundary",
          "HTTPAccessFallbackBoundary",
          "HTTPAccessFallbackErrorBoundary",
          "DevRootHTTPAccessFallbackBoundary",
          "LoadingBoundary",
          "ErrorBoundary",
          "ErrorBoundaryHandler",
          "RootErrorBoundary",
          "AppDevOverlay",
          "AppDevOverlayErrorBoundary",
          "HotReload",
          "RemixServer",
          "RemixBrowser",
          "RemixRoute",
          "RemixRouteError",
          "RouteErrorBoundary",
          "QueryErrorResetBoundary",
          "Hydrate",
          "HydrationBoundary",
          "ReactQueryDevtools",
          "ReactQueryDevtoolsPanel",
        ])),
        ($s = [/^_class\d*$/, /^_default\d*$/]),
        (Us = new Set(["ForwardRef", "Memo"]))
    })
  var Vn = F(() => {
    Os()
    To()
    Ro()
    Oo()
    zs()
    jo()
  })
  function Kn(e, t) {
    let { element: n, matchingSelector: r } = e
    if (!r) return [n]
    if (!n.classList.length) return [n]
    try {
      let o = Array.from(t.querySelectorAll(r))
      return o.length > 0 ? o : [n]
    } catch (o) {
      return [n]
    }
  }
  var zo = F(() => {})
  function Ks(e) {
    return e.startsWith(Tm) || e.startsWith(Fm)
  }
  function ye(e) {
    if (!e || typeof e != "object") return
    let t = le(e) ? e : null
    for (!t && Cs(e) && e.parentElement && (t = e.parentElement); t; ) {
      for (let n of Object.getOwnPropertyNames(t)) if (Ks(n)) return t[n]
      t = t.parentElement
    }
  }
  function ce(e) {
    var t
    if (e) return (t = e.pendingProps) != null ? t : e.memoizedProps
  }
  function Am(e) {
    let t = ce(e)
    if (!je(t)) return
    let n = k({}, t)
    return delete n.children, n
  }
  function Gs(e) {
    let t = Am(e)
    if (t) return t
    if (
      e != null &&
      e.memoizedProps &&
      typeof e.memoizedProps == "object" &&
      !Array.isArray(e.memoizedProps)
    ) {
      let n = e.memoizedProps,
        { children: r } = n
      return q(n, ["children"])
    }
    return {}
  }
  function je(e) {
    return (
      e !== null &&
      typeof e == "object" &&
      !Array.isArray(e) &&
      Object.getPrototypeOf(e) === Object.prototype
    )
  }
  function it(e) {
    var t
    if (typeof e.type == "string") return e.type
    if (
      typeof e.type == "function" ||
      (typeof e.type == "object" && e.type !== null)
    ) {
      let n = e.type
      return (t = n.displayName) != null ? t : n.name
    }
  }
  function Xs(e, t) {
    var n, r, o
    return (o =
      (r = (n = it(e)) != null ? n : t == null ? void 0 : t.name) != null
        ? r
        : t == null
          ? void 0
          : t.displayName) != null
      ? o
      : void 0
  }
  function Rm(e) {
    let t = e._init,
      n = e._payload
    if (typeof t != "function" || n == null || typeof n != "object") return
    let r = n
    if (r._status !== 1) return
    let o = r._result
    if (o != null && typeof o == "object" && "default" in o) return o.default
    if (typeof o == "function") return o
  }
  function Wo(e) {
    let t = e,
      n = 0
    for (; t != null && typeof t == "object" && n < _m; ) {
      n++
      let r = t
      if (typeof r.type == "function") {
        t = r.type
        continue
      }
      if (typeof r.render == "function") {
        t = r.render
        continue
      }
      let o = Rm(t)
      if (o !== void 0) {
        t = o
        continue
      }
      if (typeof r.type == "object" && r.type !== null) {
        t = r.type
        continue
      }
      break
    }
    return t
  }
  function Vo(e) {
    if (e != null && e.type) return Wo(e.type)
  }
  function at(e) {
    var n
    let t = e._debugOwner
    if (t) return st(ce(t)) ? ((n = t.child) != null ? n : t.return) : t
  }
  function st(e) {
    return je(e) && "_fgT" in e
  }
  function qs(e) {
    let t = e.return
    return t ? st(ce(t)) : !1
  }
  function Ko(e) {
    let t = e.return
    for (; t; ) {
      if (typeof t.type != "string") return t
      t = t.return
    }
  }
  function Pm(e) {
    var t
    return typeof e.type != "string" ? e : (t = Ko(e)) != null ? t : e
  }
  function Be(e) {
    let t = e.alternate
    if (!t) return e
    let n = e
    for (; n.return; ) n = n.return
    let r = n.stateNode
    if (r == null || typeof r != "object") return e
    let o = r.current
    return o ? (o === n ? e : t) : e
  }
  function Nm(e) {
    var o, i
    let t = e,
      n = e
    if (e.alternate) {
      for (; t.return; ) t = t.return
      return t.tag === $o ? n : null
    }
    let r = t
    do
      (t = r),
        ((o = t.flags) != null ? o : 0) & 4098 &&
          (n = (i = t.return) != null ? i : t),
        (r = t.return)
    while (r)
    return t.tag === $o ? n : null
  }
  function Im(e) {
    let t = e.alternate
    if (!t) {
      let a = Nm(e)
      return a === null ? e : a !== e ? Be(e) : e
    }
    let n = e,
      r = t
    for (;;) {
      let a = n.return
      if (a == null) break
      let u = a.alternate
      if (u == null) {
        let l = a.return
        if (l != null) {
          n = r = l
          continue
        }
        break
      }
      if (a.child === u.child) {
        let l = a.child
        for (; l; ) {
          if (l === n) return e
          if (l === r) return t
          l = l.sibling
        }
        return Be(e)
      }
      if (n.return !== r.return) (n = a), (r = u)
      else {
        let l = !1,
          s = a.child
        for (; s; ) {
          if (s === n) {
            ;(l = !0), (n = a), (r = u)
            break
          }
          if (s === r) {
            ;(l = !0), (r = a), (n = u)
            break
          }
          s = s.sibling
        }
        if (!l)
          for (s = u.child; s; ) {
            if (s === n) {
              ;(l = !0), (n = u), (r = a)
              break
            }
            if (s === r) {
              ;(l = !0), (r = u), (n = a)
              break
            }
            s = s.sibling
          }
        if (!l) return Be(e)
      }
      if (n.alternate !== r) return Be(e)
    }
    if (n.tag !== $o) return Be(e)
    let o = n.stateNode
    if (o == null || typeof o != "object") return Be(e)
    let i = o.current
    return i ? (i === n ? e : t) : Be(e)
  }
  function ot(e) {
    return Im(e)
  }
  function Gn(e) {
    var i, a
    let t = ye(e)
    if (!t) return { hostFiber: void 0, compositeFiber: void 0 }
    let n = (i = ot(t)) != null ? i : t,
      r = Pm(n),
      o = (a = ot(r)) != null ? a : r
    return { hostFiber: n, compositeFiber: o }
  }
  function Ys() {
    return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__
  }
  function Js(e) {
    let t
    for (let n of e.renderers.values())
      if (
        n.rendererPackageName === "react-dom" &&
        (t === void 0 && (t = n), typeof n.overrideProps == "function")
      )
        return n
    return t
  }
  function Go() {
    let e = Ys()
    if (e) return Js(e)
  }
  function Uo() {
    let e = globalThis
    return Array.isArray(e[Ho]) || (e[Ho] = []), e[Ho]
  }
  function Mm() {
    let e = Uo().splice(0)
    for (let t of e) clearTimeout(t.timer), t.resolve()
  }
  function Om(e) {
    var r
    let t = globalThis
    if (t[Ws]) return
    t[Ws] = !0
    let n = (r = e.onCommitFiberRoot) == null ? void 0 : r.bind(e)
    e.onCommitFiberRoot = (o, i, a) => {
      n == null || n(o, i, a), t[Lm] || Mm()
    }
  }
  function Xo(e = 5e3) {
    let t = Ys()
    return t
      ? (Om(t),
        new Promise((n, r) => {
          let o = {
            resolve: n,
            reject: r,
            timer: setTimeout(() => {
              let i = Uo(),
                a = i.indexOf(o)
              a !== -1 && i.splice(a, 1),
                r(new Error("Timed out waiting for React renderer commit"))
            }, e),
          }
          Uo().push(o)
        }))
      : Promise.resolve()
  }
  function Xn(e) {
    for (let t of Object.getOwnPropertyNames(e)) if (Ks(t)) return !0
    return !1
  }
  function Dm(e) {
    let t = e.defaultView
    if (!t) return
    let n = t.__REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!n) return
    let r = Js(n),
      o = r == null ? void 0 : r.findFiberByHostInstance
    return typeof o == "function" ? o : void 0
  }
  function Bm(e, t) {
    return e ? !!(Xn(e) || (t != null && t(e))) : !1
  }
  function jm(e, t = 32) {
    let n = [{ el: e, depth: 0 }]
    for (let r = 0; r < n.length; r++) {
      let { el: o, depth: i } = n[r]
      if (Xn(o)) return o
      if (!(i >= t))
        for (let a = 0; a < o.children.length; a++) {
          let u = o.children[a]
          u instanceof Element && n.push({ el: u, depth: i + 1 })
        }
    }
  }
  function Vs(e, t) {
    return Bm(e, t) ? e : jm(e)
  }
  function Zs(e = document) {
    let t = Dm(e)
    for (let r of ["root", "__next"]) {
      let o = e.getElementById(r)
      if (!o) continue
      let i = Vs(o, t)
      if (i) return i
    }
    let n = e.body
    if (n)
      for (let r = 0; r < n.children.length; r++) {
        let o = n.children[r]
        if (!(o instanceof Element)) continue
        let i = Vs(o, t)
        if (i) return i
      }
  }
  var Tm,
    Fm,
    _m,
    $o,
    Ho,
    Ws,
    Lm,
    ze = F(() => {
      ne()
      ;(Tm = "__reactFiber$"), (Fm = "__reactInternalInstance$")
      _m = 32
      $o = 3
      ;(Ho = "__figmaHtmlDevtoolsCommitWaiters__"),
        (Ws = "__figmaHtmlDevtoolsCommitHookPatched__"),
        (Lm = "__figmaHtmlDevtoolsCommitHookFlushesWaiters__")
    })
  function lt(e) {
    if (!e) return
    let t = el.get(e)
    return t || (ye(e) ? (el.set(e, Qs), Qs) : zm)
  }
  var Qs,
    zm,
    el,
    qn = F(() => {
      ze()
      ;(Qs = { name: "react" }), (zm = { name: "dom" }), (el = new WeakMap())
    })
  function Hm(e) {
    var n, r
    if (Xn(e) || ye(e)) return e
    let t = (n = e.ownerDocument) != null ? n : document
    return (r = Zs(t)) != null ? r : e
  }
  function $m(e) {
    var r
    let t = e == null ? void 0 : e.componentTree
    if (!t) return !1
    let n = [t]
    for (; n.length > 0; ) {
      let o = n.pop()
      if (o.kind === "composite") return !0
      for (let i of (r = o.children) != null ? r : []) n.push(i)
    }
    return !1
  }
  function qo(e, t, n = 0) {
    return x(this, null, function* () {
      var i
      let r = Hm(e),
        o = yield t(r)
      if (o)
        return $m(o) ||
          ((i = lt(r)) == null ? void 0 : i.name) !== "react" ||
          n >= tl.length
          ? o
          : (yield new Promise((a) => {
              setTimeout(a, tl[n])
            }),
            qo(e, t, n + 1))
    })
  }
  var tl,
    nl = F(() => {
      qn()
      ze()
      tl = [50, 200, 500, 1e3, 2e3]
    })
  function zt(e, t) {
    return t <= 0 ? [] : e.length <= t ? e : e.slice(-t)
  }
  function Um(e, t) {
    let n = e.functionName
    return !!(
      n === t ||
      n === `new ${t}` ||
      (t.length > 0 && (n.endsWith(`.${t}`) || n.endsWith(` ${t}`)))
    )
  }
  function Yo(e, t, n = 3) {
    if (!e || n < 1) return []
    let r = [...new Set(t.filter((i) => typeof i == "string" && i !== ""))]
    if (r.length === 0) return []
    let o = He(e)
    for (let i of r)
      for (let a = 0; a < o.length; a++)
        if (Um(o[a], i)) return o.slice(a, Math.min(a + n, o.length))
    return []
  }
  function rl(e, t) {
    var r
    return (r = Yo(e, [t], 1)[0]) != null ? r : null
  }
  function He(e) {
    if (!e) return []
    let t = e.split(`
`),
      n = []
    for (let r of t) {
      let o = Wm(r)
      o && n.push(o)
    }
    return n
  }
  function Wm(e) {
    var t
    return (t = Vm(e)) != null ? t : Gm(e)
  }
  function Vm(e) {
    var a, u, l, s, c, d
    let t = e.trim()
    if (!t.startsWith("at ")) return null
    let n = t.slice(3),
      r = n.match(/^(.+?)\s+\((native)\)\s*$/)
    if (r)
      return {
        functionName: ((a = r[1]) != null ? a : "").trim(),
        fileName: "(native)",
        lineNumber: 0,
        columnNumber: 0,
        raw: e,
      }
    if (n.trim() === "(native)")
      return {
        functionName: "(anonymous)",
        fileName: "(native)",
        lineNumber: 0,
        columnNumber: 0,
        raw: e,
      }
    let o = n.match(/^(.+?)\s+\((.+)\)\s*$/)
    if (o) {
      let p = (u = o[2]) != null ? u : "",
        f = Km(p)
      if (f)
        return {
          functionName: ((l = o[1]) != null ? l : "").trim(),
          fileName: f[0],
          lineNumber: f[1],
          columnNumber: f[2],
          raw: e,
        }
    }
    let i = n.match(/^(.+):(\d+):(\d+)\s*$/)
    return i
      ? {
          functionName: "(anonymous)",
          fileName: (s = i[1]) != null ? s : "",
          lineNumber: parseInt((c = i[2]) != null ? c : "0", 10),
          columnNumber: parseInt((d = i[3]) != null ? d : "0", 10),
          raw: e,
        }
      : null
  }
  function Km(e) {
    var o, i, a, u, l
    let t = e.replace(/^\(|\)$/g, "").trim()
    if (t === "native") return ["(native)", 0, 0]
    let n = t.match(/^(.+):(\d+):(\d+)$/)
    if (n)
      return [
        (o = n[1]) != null ? o : "",
        parseInt((i = n[2]) != null ? i : "0", 10),
        parseInt((a = n[3]) != null ? a : "0", 10),
      ]
    let r = t.match(/^(.+):(\d+)$/)
    return r
      ? [
          (u = r[1]) != null ? u : "",
          parseInt((l = r[2]) != null ? l : "0", 10),
          0,
        ]
      : null
  }
  function Gm(e) {
    var s, c, d
    let n = e.trim().match(/^(.+):(\d+):(\d+)\s*$/)
    if (!n) return null
    let r = (s = n[1]) != null ? s : "",
      o = parseInt((c = n[2]) != null ? c : "0", 10),
      i = parseInt((d = n[3]) != null ? d : "0", 10),
      a = Xm(r)
    if (a === -1) return null
    let u = r.slice(0, a).trim() || "(anonymous)",
      l = r.slice(a + 1)
    return {
      functionName: u,
      fileName: l,
      lineNumber: o,
      columnNumber: i,
      raw: e,
    }
  }
  function Xm(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t] === "@") {
        let n = e.slice(t + 1)
        if (
          n.startsWith("http://") ||
          n.startsWith("https://") ||
          n.startsWith("/") ||
          /^[\w.-]+(\/|$)/.test(n)
        )
          return t
      }
    return e.indexOf("@")
  }
  var Ht = F(() => {})
  function Yn(e) {
    if (!e || typeof e != "object") return !1
    let t = e._debugStack
    return t instanceof Error && typeof t.stack == "string"
  }
  function qm(e) {
    if (e == null || typeof e != "string") return ""
    let t = e,
      n = `Error: react-stack-top-frame
`
    t.startsWith(n) && (t = t.slice(n.length))
    let r = t.indexOf(`
`)
    if (
      (r !== -1 && (t = t.slice(r + 1)),
      (r = t.indexOf("react_stack_bottom_frame")),
      r === -1 && (r = t.indexOf("react-stack-bottom-frame")),
      r !== -1 &&
        (r = t.lastIndexOf(
          `
`,
          r,
        )),
      r !== -1)
    )
      t = t.slice(0, r)
    else return ""
    return t
  }
  function ol(e, t) {
    if (!t.sourceFile && !t.componentName) return []
    let n = qm(e.stack)
    return n.trim()
      ? On(He(n), 3).map((o) => {
          let i =
            o.functionName && o.functionName !== "(anonymous)"
              ? o.functionName
              : void 0
          return {
            filePath: t.sourceFile ? wo(o.fileName) : void 0,
            line: t.sourceFile ? o.lineNumber : void 0,
            column: t.sourceFile ? o.columnNumber : void 0,
            componentName: t.componentName ? i : void 0,
            type: Z.RUNTIME,
          }
        })
      : []
  }
  var il = F(() => {
    me()
    ne()
    Ht()
    _t()
  })
  function Zm(e, t) {
    if (
      typeof t != "function" ||
      e.length < 3 ||
      e.charCodeAt(0) !== 111 ||
      e.charCodeAt(1) !== 110
    )
      return !1
    let n = e.charCodeAt(2)
    return n >= Ym && n <= Jm
  }
  function al(e, t, n) {
    return e.length > 0 && e[0] === Jn ? t : n
  }
  function Qm(e, t) {
    if (e.length !== t.length) return !1
    for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1
    return !0
  }
  function ul(e, t) {
    for (let n of e) if (Qm(n.path, t)) return n
  }
  function sl(e, t) {
    if (e.length === 1 && typeof e[0] == "string") {
      let n = e[0]
      for (let r of t) if (r.path[0] === n) return !1
      return !0
    }
    return e.length === 2 && e[0] === Jn && typeof e[1] == "number"
      ? ul(t, e) === void 0
      : !1
  }
  function ll(e) {
    if (e === "true") return !0
    if (e === "false") return !1
    if (e === "null") return null
    if (e.trim() !== "") {
      let t = Number(e)
      if (Number.isFinite(t) && e.trim() === String(t)) return t
    }
    return e
  }
  function eh(e) {
    let t = e.pendingProps
    je(t) && (e.memoizedProps = k({}, t))
  }
  function X(e, t, n) {
    return k(k({ status: e }, t ? { reason: t } : {}), n ? { target: n } : {})
  }
  function th(e, t) {
    switch (t) {
      case "string":
        return { kind: "ok", value: e }
      case "number": {
        if (e.trim() === "") return { kind: "dropped" }
        let n = Number(e)
        return Number.isFinite(n)
          ? { kind: "ok", value: n }
          : { kind: "dropped" }
      }
      case "boolean":
        return e === "true"
          ? { kind: "ok", value: !0 }
          : e === "false"
            ? { kind: "ok", value: !1 }
            : { kind: "dropped" }
      case "null":
        return { kind: "ok", value: null }
      case "undefined":
        return { kind: "ok", value: void 0 }
      case "array":
      case "object":
      case "function":
      case "listener":
      case "symbol":
      case "reference":
        return { kind: "dropped" }
    }
  }
  function cl(e, t) {
    return x(this, null, function* () {
      if (!(e instanceof Element)) return nh(e, t)
      if (t.length === 0) return X("noop", "no_props_supplied")
      let n = Go()
      if (!n) return X("target_unavailable", "no_react_dom_renderer")
      let r = n.overrideProps
      if (typeof r != "function")
        return X("target_unavailable", "override_props_unavailable")
      let o = Gn(e)
      if (!o.hostFiber && !o.compositeFiber)
        return X("target_unavailable", "no_fiber_for_element")
      let i = Zn(o.hostFiber, o.compositeFiber),
        a = dl(t, i, (l) => {
          let s = al(l, o.hostFiber, o.compositeFiber)
          return s
            ? {
                fiber: s,
                ownerKind:
                  l.length > 0 && l[0] === Jn ? "dom-element" : "component",
              }
            : void 0
        })
      if (a.length === 0) return X("noop", "no_overrideable_prop_items")
      let u = pl(r, a, (l) => {
        let { hostFiber: s, compositeFiber: c } = Gn(e)
        if (!s && !c) return
        let d = al(l, s, c)
        return d
          ? {
              fiber: d,
              ownerKind:
                l.length > 0 && l[0] === Jn ? "dom-element" : "component",
            }
          : void 0
      })
      return u
        ? (yield Xo().catch(() => {}), X("applied", void 0, u))
        : X("target_unavailable", "no_current_target_fiber")
    })
  }
  function nh(e, t) {
    return x(this, null, function* () {
      var l
      if (t.length === 0) return X("noop", "no_props_supplied")
      let n = Go()
      if (!n) return X("target_unavailable", "no_react_dom_renderer")
      let r = n.overrideProps
      if (typeof r != "function")
        return X("target_unavailable", "override_props_unavailable")
      let o = (l = ot(e.handle)) != null ? l : e.handle
      if (!o) return X("target_unavailable", "owner_unavailable")
      let i = e.ownerKind === "dom-element" ? Zn(o, void 0) : Zn(void 0, o),
        a = dl(t, i, () => ({ fiber: o, ownerKind: e.ownerKind }))
      if (a.length === 0) return X("noop", "no_overrideable_prop_items")
      let u = pl(r, a, () => ({ fiber: o, ownerKind: e.ownerKind }))
      return u
        ? (yield Xo().catch(() => {}),
          X(
            "applied",
            void 0,
            k(
              k({}, u),
              e.fallbackDomId ? { fallbackDomId: e.fallbackDomId } : {},
            ),
          ))
        : X("target_unavailable", "owner_unavailable")
    })
  }
  function dl(e, t, n) {
    let r = []
    for (let o of e) {
      let i = n(o.path)
      if (!i) continue
      let a = ul(t, o.path),
        u
      if (o.omit)
        if (a || sl(o.path, t)) u = { kind: "ok", value: void 0 }
        else continue
      else if (a)
        a.type === "undefined"
          ? (u = { kind: "ok", value: ll(o.textValue) })
          : (u = th(o.textValue, a.type))
      else if (sl(o.path, t)) u = { kind: "ok", value: ll(o.textValue) }
      else continue
      u.kind !== "dropped" &&
        r.push({
          path: o.path,
          value: u.value,
          fiber: i.fiber,
          ownerKind: i.ownerKind,
        })
    }
    return r
  }
  function pl(e, t, n) {
    let r
    for (let o = 0; o < t.length; o++) {
      let { path: i, value: a } = t[o],
        u = n(i)
      u &&
        (e(u.fiber, i, a),
        r != null ||
          (r = {
            kind: "component-owner",
            handle: u.fiber,
            ownerKind: u.ownerKind,
          }),
        o < t.length - 1 && eh(u.fiber))
    }
    return r
  }
  function fl(e) {
    let { hostFiber: t, compositeFiber: n } = Gn(e)
    return Zn(t, n)
  }
  function Zn(e, t) {
    let n = []
    if (t) {
      let o = ce(t)
      if (je(o)) {
        let r = o,
          { children: i } = r,
          a = q(r, ["children"])
        for (let u of Object.keys(a)) {
          let l = a[u]
          if (Zm(u, l)) {
            n.push({
              path: [u],
              value: void 0,
              type: "listener",
              textValue: "(listener)",
            })
            continue
          }
          Jo(l, [u], n)
        }
      }
    }
    if (e) {
      let o = ce(e)
      je(o) && rh(o.children, n)
    }
    return n
  }
  function Jo(e, t, n) {
    if (je(e)) {
      for (let r of Object.keys(e)) Jo(e[r], [...t, r], n)
      return
    }
    if (Array.isArray(e)) {
      for (let r = 0; r < e.length; r++) Jo(e[r], [...t, r], n)
      return
    }
    Zo(n, t, e)
  }
  function rh(e, t) {
    if (e !== void 0) {
      if (Array.isArray(e)) {
        for (let n = 0; n < e.length; n++) Zo(t, ["children", n], e[n])
        return
      }
      Zo(t, ["children"], e)
    }
  }
  function Zo(e, t, n) {
    let r = oh(n)
    e.push({
      path: t,
      value: r.serializableValue,
      type: r.type,
      textValue: r.textValue,
    })
  }
  function oh(e) {
    return e === null
      ? { serializableValue: null, type: "null", textValue: "null" }
      : e === void 0
        ? { serializableValue: void 0, type: "undefined", textValue: "" }
        : typeof e == "string"
          ? { serializableValue: e, type: "string", textValue: e }
          : typeof e == "number"
            ? { serializableValue: e, type: "number", textValue: String(e) }
            : typeof e == "boolean"
              ? { serializableValue: e, type: "boolean", textValue: String(e) }
              : typeof e == "function"
                ? {
                    serializableValue: void 0,
                    type: "function",
                    textValue: "(function)",
                  }
                : typeof e == "symbol"
                  ? {
                      serializableValue: void 0,
                      type: "symbol",
                      textValue: e.toString(),
                    }
                  : sh(e)
                    ? {
                        serializableValue: void 0,
                        type: "reference",
                        textValue: lh(e),
                      }
                    : Array.isArray(e)
                      ? {
                          serializableValue: void 0,
                          type: "array",
                          textValue: `[\u2026${e.length}]`,
                        }
                      : {
                          serializableValue: void 0,
                          type: "object",
                          textValue: "{\u2026}",
                        }
  }
  function sh(e) {
    if (e === null || typeof e != "object") return !1
    let t = e.$$typeof
    return typeof t != "symbol" ? !1 : t === ih || t === ah
  }
  function lh(e) {
    var n, r
    let t = e.type
    if (typeof t == "string") return `<${t}>`
    if (typeof t == "function") {
      let o = t
      return `<${
        (r = (n = o.displayName) != null ? n : o.name) != null ? r : "Component"
      }>`
    }
    if (typeof t == "object" && t !== null) {
      let o = t
      if (o.displayName) return `<${o.displayName}>`
      if (o.name) return `<${o.name}>`
    }
    return "<Component>"
  }
  var Jn,
    Ym,
    Jm,
    ih,
    ah,
    ml = F(() => {
      ze()
      ;(Jn = "children"), (Ym = 65), (Jm = 90)
      ;(ih = Symbol.for("react.element")),
        (ah = Symbol.for("react.transitional.element"))
    })
  function uh(e) {
    var t
    return typeof e != "function"
      ? !1
      : typeof ((t = e.prototype) == null ? void 0 : t.isReactComponent) !=
          "undefined"
        ? !0
        : e.toString().trim().startsWith("class ")
  }
  var er,
    Qn,
    hl,
    gl = F(() => {
      Ht()
      ze()
      ;(er = class {
        constructor() {
          I(this, "cache", new Map())
        }
        capture(t, n = {}) {
          let r = Wo(t),
            o = this.cache.get(r)
          if (o) return o
          let i = n != null ? n : {}
          return (
            uh(r)
              ? (o = this.captureFromClassComponent(r, i))
              : typeof r == "function" &&
                (o = this.captureFromFunctionComponent(r, i)),
            o &&
              (this.cache.size > 1e3 && this.cache.clear(),
              this.cache.set(r, o)),
            o
          )
        }
        captureFromFunctionComponent(t, n) {
          let r = this.suppressWarnings(),
            o
          try {
            let i = function () {
                let l = new Error(Qn)
                throw (
                  (typeof Error.captureStackTrace == "function" &&
                    Error.captureStackTrace(l, i),
                  l)
                )
              },
              a = new Proxy(n, {
                get: i,
                has: i,
                ownKeys: i,
                getOwnPropertyDescriptor: i,
              })
            try {
              t.call(null, a)
            } catch (u) {
              u instanceof Error ? (o = u.stack) : (o = String(u))
            }
            o || (o = this.captureFromFunctionComponentFallback(t, a))
          } finally {
            r()
          }
          return o
        }
        captureFromFunctionComponentFallback(t, n) {
          let r = t.name
          if (!r) return
          let o = Function.prototype.call,
            i
          try {
            ;(Function.prototype.call = function (a, ...u) {
              var l
              if (!i) {
                let c = (l = new Error(Qn).stack) != null ? l : ""
                rl(c, r) && (i = c)
              }
              return o.apply(this, [a, ...u])
            }),
              t.call(null, n)
          } catch (a) {
          } finally {
            Function.prototype.call = o
          }
          return i
        }
        captureFromClassComponent(t, n) {
          let r = this.suppressWarnings(),
            o
          try {
            try {
              new t(n)
            } catch (a) {
              return (o = a instanceof Error ? a.stack : String(a)), o
            }
            let i = new Error(Qn)
            typeof Error.captureStackTrace == "function" &&
              Error.captureStackTrace(i, t),
              (o = i.stack)
          } finally {
            r()
          }
          return o
        }
        suppressWarnings() {
          let t = console.error,
            n = console.warn
          return (
            (console.error = (...r) => {
              let o = typeof r[0] == "string" ? r[0] : ""
              o.includes("Warning:") ||
                o.includes("React") ||
                o.includes(Qn) ||
                t.apply(console, r)
            }),
            (console.warn = () => {}),
            () => {
              ;(console.error = t), (console.warn = n)
            }
          )
        }
      }),
        (Qn = "REACT_STACK_CAPTURE"),
        (hl = ["__reactStackCaptureProxyThrow"])
    })
  var N,
    de,
    yl = F(() => {
      ;(N = {
        FunctionComponent: 0,
        ClassComponent: 1,
        IndeterminateComponent: 2,
        HostRoot: 3,
        HostPortal: 4,
        HostComponent: 5,
        HostText: 6,
        Fragment: 7,
        Mode: 8,
        ContextConsumer: 9,
        ContextProvider: 10,
        ForwardRef: 11,
        Profiler: 12,
        SuspenseComponent: 13,
        MemoComponent: 14,
        SimpleMemoComponent: 15,
        LazyComponent: 16,
        IncompleteClassComponent: 17,
        DehydratedFragment: 18,
        SuspenseListComponent: 19,
        ScopeComponent: 21,
        OffscreenComponent: 22,
        LegacyHiddenComponent: 23,
        CacheComponent: 24,
        TracingMarkerComponent: 25,
        HostHoistable: 26,
        HostSingleton: 27,
        IncompleteFunctionComponent: 28,
        Throw: 29,
        ViewTransitionComponent: 30,
        ActivityComponent: 31,
      }),
        (de = {
          Element: Symbol.for("react.element"),
          TransitionalElement: Symbol.for("react.transitional.element"),
          Portal: Symbol.for("react.portal"),
          Fragment: Symbol.for("react.fragment"),
          StrictMode: Symbol.for("react.strict_mode"),
          Profiler: Symbol.for("react.profiler"),
          Provider: Symbol.for("react.provider"),
          Consumer: Symbol.for("react.consumer"),
          Context: Symbol.for("react.context"),
          ConcurrentMode: Symbol.for("react.concurrent_mode"),
          ForwardRef: Symbol.for("react.forward_ref"),
          Suspense: Symbol.for("react.suspense"),
          SuspenseList: Symbol.for("react.suspense_list"),
          Memo: Symbol.for("react.memo"),
          Lazy: Symbol.for("react.lazy"),
          Scope: Symbol.for("react.scope"),
          Offscreen: Symbol.for("react.offscreen"),
          LegacyHidden: Symbol.for("react.legacy_hidden"),
          Activity: Symbol.for("react.activity"),
          ViewTransition: Symbol.for("react.view_transition"),
        })
    })
  function Cl(e, t, n) {
    var l
    let r = ye(e)
    if (!r) return
    let o = (l = ot(r)) != null ? l : r,
      i = { assignInstanceId: t, syntheticIdCounter: 0, treeOptions: ch(n) },
      a = t(e),
      u = []
    return (
      o.child && tr(o.child, u, i),
      {
        id: a,
        kind: "root",
        hostElement: e,
        key: null,
        displayName: void 0,
        children: u,
      }
    )
  }
  function ch(e) {
    return {
      showHostElements: e.showHostElements !== !1,
      showFragments: e.showFragments !== !1,
      showInfrastructureComposites: e.showInfrastructureComposites === !0,
      treatSvgAsLeaf: e.treatSvgAsLeaf === !0,
    }
  }
  function tr(e, t, n) {
    let r = e
    for (; r; ) {
      if (hh(r)) r.child && tr(r.child, t, n)
      else {
        let o = ph(r, n),
          i = dh(o, n.treeOptions)
        fh(o, n.treeOptions)
          ? r.child && !i && tr(r.child, t, n)
          : (t.push(o), r.child && !i && tr(r.child, o.children, n))
      }
      r = r.sibling
    }
  }
  function dh(e, t) {
    return !t.treatSvgAsLeaf || !e.hostElement
      ? !1
      : e.hostElement.tagName.toLowerCase() === "svg"
  }
  function ph(e, t) {
    var c
    let n = e.tag,
      r = Sl(n) && le(e.stateNode) ? e.stateNode : void 0,
      o = mh(n, r),
      i =
        r != null
          ? t.assignInstanceId(r)
          : `cmp-tree-synth:${t.syntheticIdCounter++}`,
      a = gh(e, o),
      u = bh(a),
      l = e.key != null ? Ch(e.key) : null,
      s = {
        id: i,
        kind: o,
        hostElement: r,
        key: l,
        displayName: (c = u.componentName) != null ? c : a,
        children: [],
      }
    return (
      u.hocDisplayNames.length > 0 && (s.hocDisplayNames = u.hocDisplayNames),
      o === "composite" && !r && (s.compositeFiber = e),
      s
    )
  }
  function fh(e, t) {
    var r
    if (!t.showHostElements && (e.kind === "host" || e.kind === "wrapper"))
      return !0
    if (e.kind !== "composite") return !1
    let n = (r = e.displayName) != null ? r : ""
    return n === ""
      ? !1
      : !!(
          (!t.showFragments && n === "Fragment") ||
          (!t.showInfrastructureComposites && jt(n))
        )
  }
  function mh(e, t) {
    return e === N.HostComponent ||
      e === N.HostHoistable ||
      e === N.HostSingleton
      ? t && ue(t) === "retained"
        ? "host"
        : "wrapper"
      : "composite"
  }
  function Sl(e) {
    return (
      e === N.HostComponent || e === N.HostHoistable || e === N.HostSingleton
    )
  }
  function hh(e) {
    let t = e.tag
    if (
      t === N.HostText ||
      t === N.HostPortal ||
      t === N.OffscreenComponent ||
      t === N.LegacyHiddenComponent ||
      t === N.Throw ||
      t === N.DehydratedFragment ||
      (t === N.Fragment && (e.key == null || e.key === ""))
    )
      return !0
    if (t === N.Mode) {
      let n = wl(e.type)
      if (n === de.StrictMode || n === de.ConcurrentMode) return !0
    }
    if (Sl(t)) {
      let n = e.stateNode
      if (le(n) && Rt(n)) return !0
    }
    return !!st(ce(e))
  }
  function wl(e) {
    if (e == null || typeof e != "object") return
    let t = e
    return typeof t.$$typeof == "symbol" ? t.$$typeof : void 0
  }
  function gh(e, t) {
    if (t !== "composite") {
      let i = e.stateNode
      return le(i)
        ? i.tagName.toLowerCase()
        : typeof e.type == "string"
          ? e.type
          : ""
    }
    if (e.tag === N.ContextProvider) return bl(e, "Provider")
    if (e.tag === N.ContextConsumer) return bl(e, "Consumer")
    let n = yh(e)
    if (n != null && n !== "") return n
    let r = it(e)
    if (r != null && r !== "") return r
    let o = wl(e.type)
    if (o === de.Fragment) return "Fragment"
    if (o === de.Suspense) return "Suspense"
    if (o === de.SuspenseList) return "SuspenseList"
    if (o === de.Profiler) return "Profiler"
    if (o === de.StrictMode) return "StrictMode"
    switch (e.tag) {
      case N.Fragment:
        return "Fragment"
      case N.Mode:
        return "Mode"
      case N.SuspenseComponent:
        return "Suspense"
      case N.SuspenseListComponent:
        return "SuspenseList"
      case N.Profiler:
        return "Profiler"
      case N.ActivityComponent:
        return "Activity"
      case N.CacheComponent:
        return "Cache"
      case N.ScopeComponent:
        return "Scope"
      case N.TracingMarkerComponent:
        return "TracingMarker"
      case N.ViewTransitionComponent:
        return "ViewTransition"
      case N.HostRoot:
        return "HostRoot"
      case N.ForwardRef:
        return "ForwardRef"
      case N.MemoComponent:
      case N.SimpleMemoComponent:
        return "Memo"
      default:
        return ""
    }
  }
  function bl(e, t) {
    var o
    let n = e.type,
      r
    if (n != null && typeof n == "object") {
      let i = (o = n._context) == null ? void 0 : o.displayName,
        a = n.displayName
      typeof i == "string" && i !== ""
        ? (r = i)
        : typeof a == "string" && a !== "" && (r = a)
    }
    return `${r != null ? r : "Context"}.${t}`
  }
  function yh(e) {
    let t = e.type
    for (let n = 0; n < 4; n++) {
      if (t == null || typeof t != "object") return
      let r = t.$$typeof
      if (r === de.Memo) {
        t = t.type
        continue
      }
      if (r === de.ForwardRef) {
        let o = t.displayName
        if (typeof o == "string" && o !== "") return o
        let i = t.render
        if (typeof i == "function") {
          let a = i
          if (typeof a.displayName == "string" && a.displayName !== "")
            return a.displayName
          if (typeof a.name == "string" && a.name !== "") return a.name
        }
        return
      }
      return
    }
  }
  function bh(e) {
    if (e == null || e === "") return { componentName: e, hocDisplayNames: [] }
    let t = e,
      n = []
    for (let r = 0; r < 16; r++) {
      let o = t.indexOf("(")
      if (o <= 0 || !t.endsWith(")")) break
      let i = t.slice(0, o),
        a = t.slice(o + 1, t.length - 1)
      if (!i || !a || i.includes("(") || i.includes(")")) break
      n.push(i), (t = a)
    }
    return { componentName: t, hocDisplayNames: n }
  }
  function Ch(e) {
    var t
    return typeof e == "string"
      ? e
      : typeof e == "symbol"
        ? e === Symbol.for("react.optimistic_key")
          ? "React.optimisticKey"
          : (t = e.description) != null
            ? t
            : e.toString()
        : String(e)
  }
  var El = F(() => {
    ne()
    Qe()
    jo()
    ze()
    yl()
  })
  function rr(e, t, n) {
    return n ? e.map((r) => nr(r, t, n)) : e
  }
  function nr(e, t, n) {
    return n ? (e._debugStrategy ? e : L(k({}, e), { _debugStrategy: t })) : e
  }
  function wh(e) {
    let t = e.functionName
    if (t) {
      for (let r of hl) if (t === r) return !0
      if (t.startsWith("ReactStackCapture.")) return !0
    }
    let n = e.fileName
    return !!(n && /(^|[/\\])react_stack_capture(\.[a-z]+)?\b/.test(n))
  }
  function Eh(e, t) {
    let n = e.child,
      r = e.return
    return n != null && t.has(n) ? r : n != null ? n : r
  }
  function vh(e) {
    return Ko(e) !== void 0
  }
  function ir(e) {
    let t = [],
      n = [],
      r = !1,
      o = e
    for (; o; ) {
      if (typeof o.type == "string") {
        let a = { componentName: String(o.type), type: Z.RUNTIME }
        t.push(a), r || n.push(a)
      } else if (((r = !0), Yn(o)))
        return { mergeAnchor: o, hostsInnerFirst: t }
      o = o.return
    }
    if (typeof e.type == "string") {
      let i = e._debugOwner,
        a = new Set()
      for (; i && !a.has(i); ) {
        if ((a.add(i), typeof i.type != "string" && Yn(i)))
          return { mergeAnchor: i, hostsInnerFirst: n }
        let u = at(i)
        i = u != null ? u : i.return
      }
    }
    return { mergeAnchor: void 0, hostsInnerFirst: n }
  }
  function kh(e, t, n, r, o, i) {
    var c
    if (
      (!n && !r) ||
      t.length === 0 ||
      typeof e.type != "string" ||
      t.some((d) => Co(d)) ||
      t.length !== 1 ||
      e.return == null
    )
      return t
    let a =
      (c = i == null ? void 0 : i.hostsInnerFirst) != null
        ? c
        : ir(e).hostsInnerFirst
    if (a.length === 0) return t
    let u = a.length,
      l = new Array(u)
    for (let d = 0, p = u - 1; d < u; d++, p--) l[d] = a[p]
    let s = rr(l, $e.HOST_SUFFIX_MERGE, o)
    return [...t, ...s]
  }
  function xh(e, t, n, r, o, i) {
    var d
    if (
      (!n && !r) ||
      t.length === 0 ||
      typeof e.type != "string" ||
      t.some((p) => ve(p.componentName)) ||
      e.return == null
    )
      return t
    let a =
      (d = i == null ? void 0 : i.hostsInnerFirst) != null
        ? d
        : ir(e).hostsInnerFirst
    if (a.length === 0) return t
    let u
    if (n)
      for (let p = t.length - 1; p >= 0; p--) {
        let f = t[p].filePath
        if (typeof f == "string" && f.trim() !== "") {
          u = f
          break
        }
      }
    let l = a.length,
      s = new Array(l)
    for (let p = 0, f = l - 1; p < l; p++, f--) {
      let h = a[f]
      s[p] = u ? L(k({}, h), { filePath: u }) : h
    }
    let c = rr(s, $e.HOST_BREADCRUMB_WALK, o)
    return [...t, ...c]
  }
  function Th(e, t, n, r, o) {
    if (!n && !r) return
    let i = o != null ? o : ir(e),
      a = i.mergeAnchor
    if (a == null || !Yn(a)) return
    let u = (t == null ? void 0 : t.debug) === !0,
      l = rr(i.hostsInnerFirst, $e.HOST_PREFIX_MERGE, u),
      s = rr(ol(a._debugStack, t != null ? t : {}), $e.OWNER_STACK_MERGE, u),
      c = s.length > 0 ? [...l, ...s] : [...l]
    if (c.length !== 0) return c.reverse(), zt(c, 3)
  }
  var $e,
    or,
    vl = F(() => {
      Ht()
      me()
      ze()
      il()
      ml()
      gl()
      El()
      _t()
      ne()
      Oo()
      $e = {
        OWNER_STACK_MERGE: "owner-stack-merge",
        HOST_PREFIX_MERGE: "host-prefix-merge",
        HOST_SUFFIX_MERGE: "host-suffix-merge",
        STACK_CAPTURE_WALK: "stack-capture-walk",
        COMPONENT_NAME_WALK: "component-name-walk",
        FALLBACK_NAME_WALK: "fallback-name-walk",
        HOST_BREADCRUMB_WALK: "host-breadcrumb-walk",
      }
      or = class {
        constructor(t) {
          I(this, "stackCapture")
          I(this, "sourceMapEngine")
          var n
          ;(this.stackCapture = (n = t.stackCapture) != null ? n : new er()),
            (this.sourceMapEngine = t.sourceMapEngine)
        }
        resolveElementSource(t, n) {
          return x(this, null, function* () {
            if (!t) return
            let r = ye(t)
            if (!r) return
            let o = {
              tagName: t.tagName.toLowerCase(),
              frames: yield this.resolveReactSourceFrames(r, n),
            }
            return vo(o), o
          })
        }
        resolveCompositeSource(t, n) {
          return x(this, null, function* () {
            if (t == null) return
            let r = t,
              o = yield this.resolveReactSourceFrames(r, n)
            if (!o || o.length === 0) return
            let i = { tagName: "", frames: o }
            return vo(i), i
          })
        }
        resolveElementTarget(t, n, r) {
          return Promise.resolve(
            Ot(t, n == null ? void 0 : n.sourceDataByElementId, r),
          )
        }
        resolveReactSourceFrames(t, n) {
          return x(this, null, function* () {
            let r = (n == null ? void 0 : n.sourceFile) === !0,
              o = (n == null ? void 0 : n.componentName) === !0,
              i = (n == null ? void 0 : n.debug) === !0,
              a = ir(t),
              u = vh(t) ? void 0 : Th(t, n, r, o, a)
            if (u) return zt(kh(t, u, r, o, i, a), 3)
            let l = yield this.collectSourceFramesByReturnWalk(t, n, r, o, i)
            if (l.length === 0) return
            l.reverse()
            let s = zt(l, 3)
            return (r || o) &&
              typeof t.type == "string" &&
              !s.some((c) => Co(c)) &&
              a.hostsInnerFirst.length >= 2
              ? zt(xh(t, s, r, o, i, a), 3)
              : s
          })
        }
        collectSourceFramesByReturnWalk(t, n, r, o, i) {
          return x(this, null, function* () {
            var p, f, h, S
            let a = new Set(),
              u = 256,
              l = 0,
              s = t,
              c = [],
              d = !1
            for (; s && c.length < 64 && l < u && (l++, !a.has(s)); ) {
              a.add(s)
              let E = typeof s.type == "string",
                g = E && (p = s._debugOwner) != null ? p : s,
                b = ce(g)
              if (qs(g)) {
                ;(s = g.return), (d = !1)
                continue
              }
              if (st(b)) {
                ;(s = Eh(g, a)), (d = !1)
                continue
              }
              if (o && !r) {
                let R = it(g)
                if (R && !De(R, { forCompositeFiber: !0 })) {
                  c.push(
                    nr(
                      { componentName: R, type: Z.RUNTIME },
                      $e.COMPONENT_NAME_WALK,
                      i,
                    ),
                  ),
                    (s = (f = at(g)) != null ? f : g.return),
                    (d = !1)
                  continue
                }
              }
              if (r) {
                let R = yield this.getReactSourceFrameFromSourceMap(s, n)
                if (R) {
                  let B = o ? R : L(k({}, R), { componentName: void 0 })
                  c.push(nr(B, $e.STACK_CAPTURE_WALK, i)),
                    (s = (h = at(s)) != null ? h : s.return),
                    (d = !1)
                  continue
                }
                if (E) {
                  ;(s = (S = at(s)) != null ? S : s.return), (d = !1)
                  continue
                }
              }
              let C = at(s)
              if (C !== void 0) {
                ;(s = C), (d = !0)
                continue
              }
              if (typeof Vo(s) != "function") {
                ;(s = s.return), (d = !1)
                continue
              }
              let T = it(s)
              if (De(T, { forCompositeFiber: !0 })) {
                ;(s = s.return), (d = !1)
                continue
              }
              if (s.return === void 0 && c.length === 0 && d) break
              o &&
                typeof T == "string" &&
                T.trim() !== "" &&
                c.push(
                  nr(
                    { componentName: T, type: Z.RUNTIME },
                    $e.FALLBACK_NAME_WALK,
                    i,
                  ),
                ),
                (s = s.return),
                (d = !1)
            }
            return c
          })
        }
        getReactSourceFrameFromSourceMap(t, n) {
          return x(this, null, function* () {
            let r = Vo(t),
              o = Xs(t, r),
              i = r == null ? void 0 : r.name,
              a = Gs(t),
              u = this.stackCapture.capture(r, a)
            if (!u) return
            let l = [o, i].filter((f) => typeof f == "string" && f !== ""),
              s = [...new Set(l)],
              c = Yo(u, s, 3),
              d = On(c, 3, s)
            if (d.length === 0) {
              let f = He(u)
              d = []
              for (let h of f) {
                if (!h.fileName || h.fileName === "(native)" || wh(h)) continue
                let S = h.functionName
                if (
                  !(
                    !(
                      !S ||
                      S === "(anonymous)" ||
                      S === "<anonymous>" ||
                      S.trim() === ""
                    ) && De(S, { forCompositeFiber: !0 })
                  ) &&
                  (d.push(h), d.length >= 3)
                )
                  break
              }
            }
            if (d.length === 0) return
            let p = yield this.sourceMapEngine.mapFrame(
              d[0],
              n == null ? void 0 : n.timeout,
            )
            return L(k({}, p), { componentName: o })
          })
        }
        setProps(t, n) {
          return x(this, null, function* () {
            return cl(t, n)
          })
        }
        getProps(t) {
          return Promise.resolve(fl(t))
        }
        buildComponentRawTree(t, n, r) {
          return Cl(t, n, r)
        }
        destroy() {}
      }
    })
  var kl = {}
  gr(kl, { ReactDevtools: () => or })
  var xl = F(() => {
    vl()
  })
  function Tl(e, t, n) {
    if (!le(e) || Rt(e) || n.showHostElements === !1) return
    let r = n.treatSvgAsLeaf === !0,
      o = t(e),
      i = r && Al(e) ? [] : Fl(e, 1, t, r)
    return {
      id: o,
      kind: "root",
      hostElement: e,
      key: null,
      displayName: void 0,
      children: i,
    }
  }
  function Fl(e, t, n, r) {
    if (t > Fh) return []
    let o = []
    for (let i = 0; i < e.children.length; i++) {
      let a = e.children[i]
      if (!a) continue
      let u = Ah(a, t, n, r)
      u && o.push(u)
    }
    return o
  }
  function Ah(e, t, n, r) {
    if (Rt(e)) return
    let o = n(e),
      i = ue(e) === "retained" ? "host" : "wrapper",
      a = r && Al(e) ? [] : Fl(e, t + 1, n, r)
    return {
      id: o,
      kind: i,
      hostElement: e,
      key: null,
      displayName: void 0,
      children: a,
    }
  }
  function Al(e) {
    return e.tagName.toLowerCase() === "svg"
  }
  var Fh,
    _l = F(() => {
      ne()
      Qe()
      Fh = 100
    })
  var ar,
    Rl = F(() => {
      _l()
      ar = class {
        resolveElementSource() {
          return Promise.resolve(void 0)
        }
        resolveElementTarget(t, n, r) {
          return Promise.resolve(void 0)
        }
        setProps(t, n) {
          return Promise.resolve({
            status: "target_unavailable",
            reason: "runtime_props_unavailable",
          })
        }
        getProps(t) {
          return Promise.resolve([])
        }
        buildComponentRawTree(t, n, r) {
          return Tl(t, n, r)
        }
        destroy() {}
      }
    })
  var Pl = {}
  gr(Pl, { DomSourceExtractor: () => ar })
  var Nl = F(() => {
    Rl()
  })
  function Il(e) {
    let t = new Map(),
      n = new Map(),
      r = (o) =>
        x(this, null, function* () {
          let i = o,
            a = n.get(i)
          if (a) return a
          let u = t.get(i)
          if (u) return u
          if (o === "react") {
            let l = Promise.resolve()
              .then(() => (xl(), kl))
              .then(({ ReactDevtools: s }) => {
                let c = new s(e)
                return n.set(i, c), c
              })
              .catch((s) => {
                console.error("Error loading React devtools", s), t.delete(i)
              })
            return t.set(i, l), l
          }
          if (o === "dom") {
            let l = Promise.resolve()
              .then(() => (Nl(), Pl))
              .then(({ DomSourceExtractor: s }) => {
                let c = new s()
                return n.set(i, c), c
              })
              .catch((s) => {
                console.error("Error loading DOM source extractor", s),
                  t.delete(i)
              })
            return t.set(i, l), l
          }
        })
    return {
      load: (o) =>
        x(this, null, function* () {
          let i = lt(o)
          if (i) return r(i.name)
        }),
      loadByName: r,
      destroy: () => {
        for (let o of n.values()) o.destroy()
        n.clear(), t.clear()
      },
    }
  }
  var Ll = F(() => {
    qn()
  })
  function Rh(e) {
    return typeof e == "string" && _h.has(e)
  }
  function re(e, t) {
    try {
      return e[t]
    } catch (n) {
      return
    }
  }
  function Ph(e) {
    try {
      return Object.keys(e)
    } catch (t) {
      return []
    }
  }
  function sr(e, t, n) {
    n !== void 0 && (e[t] = n)
  }
  function Ml(e) {
    let t = []
    if (e === null || typeof e != "object") return t
    for (let n of Ph(e)) {
      let r = re(e, n)
      if (r === null || typeof r != "object") continue
      let o = re(r, "type")
      Rh(o) && t.push(Nh(n, o, r))
    }
    return t
  }
  function Nh(e, t, n) {
    let r = { name: e, type: t }
    if (
      (sr(r, "label", $t(re(n, "label"))),
      sr(r, "description", $t(re(n, "description"))),
      t === "boolean")
    ) {
      let o = re(n, "defaultValue")
      typeof o == "boolean" && (r.defaultValue = o)
    } else (t === "string" || t === "number") && Ih(r, t, n)
    return r
  }
  function Ih(e, t, n) {
    let r = re(n, "defaultValue")
    sr(e, "defaultValue", t === "string" ? $t(r) : Qo(r))
    let o = re(n, "control")
    if (
      (typeof o == "string" &&
        (t === "string" ? ["select"] : ["slider", "select"]).includes(o) &&
        (e.control = o),
      t === "number")
    )
      for (let u of ["min", "max", "step"]) sr(e, u, Qo(re(n, u)))
    let a = Lh(re(n, "options"), t)
    a.length > 0 && (e.options = a)
  }
  function Lh(e, t) {
    var r
    if (!Array.isArray(e)) return []
    let n = []
    for (let o of e) {
      if (o === null || typeof o != "object") continue
      let i = re(o, "value"),
        a = t === "string" ? $t(i) : Qo(i)
      if (a === void 0) continue
      let u = (r = $t(re(o, "label"))) != null ? r : String(a)
      n.push({ value: a, label: u })
    }
    return n
  }
  function $t(e) {
    switch (typeof e) {
      case "string":
        return e
      case "number":
      case "boolean":
      case "bigint":
        return String(e)
      default:
        return
    }
  }
  function Qo(e) {
    if (typeof e == "number") return Number.isFinite(e) ? e : void 0
    if (typeof e == "string" && e.trim() !== "") {
      let t = Number(e)
      return Number.isFinite(t) ? t : void 0
    }
    if (typeof e == "bigint") return Number(e)
  }
  var _h,
    Ol = F(() => {
      _h = new Set(["string", "number", "boolean", "reference"])
    })
  function Dl(e) {
    return [
      '"use strict";',
      "var module = { exports: {} };",
      "var exports = module.exports;",
      "function __noop() {",
      "  return new Proxy(function () {}, {",
      "    get: function (_t, prop) {",
      '      if (prop === Symbol.toPrimitive) return function () { return ""; };',
      '      if (prop === "toString") return function () { return ""; };',
      '      if (prop === "then") return undefined;',
      '      if (prop === "constructor") return undefined;',
      "      return __noop();",
      "    },",
      "    apply: function () { return __noop(); },",
      "    construct: function () { return __noop(); },",
      "    has: function () { return true; },",
      "  });",
      "}",
      "var require = function () { return __noop(); };",
      "var console = { log: function () {}, warn: function () {}, error: function () {}, info: function () {}, debug: function () {} };",
      "/* --- template CommonJS body --- */",
      e,
      "/* --- end template body --- */",
      "function __readField(value) {",
      "  try {",
      '    return value && typeof value === "object" ? value.codeProperties : undefined;',
      "  } catch (e) {",
      "    return undefined;",
      "  }",
      "}",
      "function __readCodeProperties(exp) {",
      "  var d = exp.default;",
      "  if (d === undefined) {",
      '    var keys = Object.keys(exp).filter(function (k) { return k !== "__esModule"; });',
      "    if (keys.length === 1) d = exp[keys[0]];",
      "    else if (keys.length > 1) d = exp;",
      "  }",
      "  var fromDefault = __readField(d);",
      "  return fromDefault !== undefined ? fromDefault : __readField(exp);",
      "}",
      "var __cp = __readCodeProperties(module.exports);",
      "var __json = JSON.stringify(__cp === undefined ? null : __cp);",
      'return typeof __json === "string" ? __json : "null";',
    ].join(`
`)
  }
  function ei(e, t) {
    return x(this, null, function* () {
      if (!e.componentName) return
      let n
      try {
        if (((n = yield t(Dl(e.cjs))), typeof n != "string")) return
      } catch (o) {
        return
      }
      let r
      try {
        r = JSON.parse(n)
      } catch (o) {
        return
      }
      if (!(r == null || typeof r != "object"))
        return {
          componentName: e.componentName,
          filePath: e.filePath,
          props: Ml(r),
        }
    })
  }
  var Bl = F(() => {
    Ol()
  })
  function lr() {
    return typeof globalThis == "undefined"
      ? void 0
      : globalThis.__figmaCodeConnect
  }
  function zl(e) {
    return x(this, null, function* () {
      if (!e.componentName) return
      let t = lr()
      if (t != null && t.loadComponentDescriptor)
        try {
          return yield t.loadComponentDescriptor(e)
        } catch (n) {
          return
        }
    })
  }
  function ti(e, t, n) {
    return x(this, null, function* () {
      let r = yield zl({ componentName: t, filePath: n }),
        o = r && Mh(r.props)
      if (!o) return e
      let i = new Map()
      for (let u of e) {
        let l = jl(u)
        l !== void 0 && !i.has(l) && i.set(l, u)
      }
      let a = []
      for (let [u, l] of o) {
        let s = i.get(u)
        a.push(s ? L(k({}, s), { descriptor: l }) : Oh(u, l))
      }
      for (let u of e) {
        let l = jl(u)
        ;(l !== void 0 && o.has(l)) || a.push(k({}, u))
      }
      return a
    })
  }
  function Mh(e) {
    if (!Array.isArray(e)) return
    let t = new Map()
    for (let n of e) {
      if (n === null || typeof n != "object") continue
      let { name: r } = n
      typeof r == "string" && (t.has(r) || t.set(r, n))
    }
    return t.size === 0 ? void 0 : t
  }
  function jl(e) {
    return e.path.length === 1 && typeof e.path[0] == "string"
      ? e.path[0]
      : void 0
  }
  function Oh(e, t) {
    var r, o, i, a, u, l
    let n = {
      path: [e],
      type: "string",
      value: "",
      textValue: "",
      descriptor: t,
    }
    switch (t.type) {
      case "boolean": {
        let s = t.defaultValue === !0
        return L(k({}, n), {
          type: "boolean",
          value: s,
          textValue: s ? "true" : "false",
        })
      }
      case "number": {
        let s =
            (o = (r = t.options) == null ? void 0 : r[0]) == null
              ? void 0
              : o.value,
          c =
            (i = t.defaultValue) != null
              ? i
              : typeof s == "number"
                ? s
                : Number(s != null ? s : 0)
        return L(k({}, n), { type: "number", value: c, textValue: String(c) })
      }
      case "string": {
        let s =
          (l = t.defaultValue) != null
            ? l
            : (u = (a = t.options) == null ? void 0 : a[0]) == null
              ? void 0
              : u.value
        if (s === void 0) return n
        let c = String(s)
        return L(k({}, n), { type: "string", value: c, textValue: c })
      }
      case "reference":
      default:
        return n
    }
  }
  var Hl = F(() => {})
  var ur = F(() => {
    Bl()
    Hl()
  })
  function Dh(e) {
    let t = e.getAttribute(Ze)
    if (t) return t
    let n = `fge-baseline-${Vl++}`
    return e.setAttribute(Ze, n), n
  }
  function Bh(e, t, n) {
    let r = n ? n(e) : Dh(e)
    if (!r || t.has(r)) {
      do r = `fge-baseline-${Vl++}`
      while (t.has(r))
      e.setAttribute(Ze, r)
    }
    return t.add(r), r
  }
  function Kl(e) {
    let t = e.tagName.toLowerCase(),
      n = e.parentElement
    if (!n) return { index: 1, count: 1 }
    let r = Array.from(n.children).filter((i) => i.tagName.toLowerCase() === t)
    return { index: Math.max(r.indexOf(e) + 1, 1), count: r.length || 1 }
  }
  function Ql(e) {
    return Array.from(e.classList)
      .filter((t) => !t.startsWith("data-fg"))
      .sort()
  }
  function $l(e) {
    let t = Ql(e)
    return `${e.tagName.toLowerCase()}.${t.join(".")}`
  }
  function jh(e) {
    return e.parentElement ? Array.from(e.parentElement.children) : [e]
  }
  function cr(e) {
    return Number.isFinite(e) ? Math.round(e * 10) / 10 : 0
  }
  function ke(e) {
    if (typeof e.getBoundingClientRect != "function") return
    let t = e.getBoundingClientRect()
    return { x: cr(t.x), y: cr(t.y), width: cr(t.width), height: cr(t.height) }
  }
  function pe(e) {
    return Boolean(e && (e.width > 0 || e.height > 0))
  }
  function pr(e, t) {
    return Math.abs(e - t) <= Math.max(4, Math.max(e, t) * 0.15)
  }
  function zh(e, t) {
    let n = ke(e),
      r = ke(t)
    return !pe(n) || !pe(r)
      ? !1
      : pr(n.width, r.width) && pr(n.height, r.height)
  }
  function Ul(e) {
    let t = Ae(e),
      n = ke(e)
    return k(
      k(
        {
          tagName: e.tagName.toLowerCase(),
          id: e.id || null,
          classes: Array.from(e.classList),
        },
        t ? { textPreview: t } : {},
      ),
      n ? { rect: n } : {},
    )
  }
  function oi(e) {
    return e.parentElement
      ? Math.max(Array.from(e.parentElement.children).indexOf(e) + 1, 1)
      : 1
  }
  function Hh(e) {
    return Kl(e).index
  }
  function eu(e) {
    let t = Ae(e)
    return k(
      {
        tagName: e.tagName.toLowerCase(),
        id: e.id || null,
        classes: Array.from(e.classList),
        childIndex: oi(e),
        sameTagIndex: Hh(e),
      },
      t ? { textPreview: t } : {},
    )
  }
  function tu(e, t) {
    let n = [],
      r = t
    for (; r && (n.push(r), r !== e); ) r = r.parentElement
    return n.reverse().map(eu)
  }
  function $h(e, t) {
    let n = [],
      r = t
    for (; r && r !== e; ) n.push(oi(r)), (r = r.parentElement)
    return n.reverse()
  }
  function nu(e, t) {
    let n = e
    for (let r of t) if (((n = n.children[r - 1]), !n)) return !1
    return !0
  }
  function ni(e, t = 0) {
    let n = Ql(e).slice(0, 6)
    if (t >= Yl) return `${e.tagName.toLowerCase()}.${n.join(".")}`
    let r = Array.from(e.children)
        .slice(0, dr)
        .map((i) => ni(i, t + 1)),
      o = e.children.length > dr ? ",\u2026" : ""
    return `${e.tagName.toLowerCase()}.${n.join(".")}[${r.join(",")}${o}]`
  }
  function ii(e) {
    let t = Array.from(e.classList).join(" ")
    if (/\bgrid\b|grid-cols-|grid-rows-/.test(t)) return "grid"
    if (/\bflex\b/.test(t))
      return /flex-col/.test(t) ? "flex-column" : "flex-row"
    let n = e.tagName.toLowerCase()
    if (n === "ul" || n === "ol") return "list"
    if (n === "tbody" || n === "thead" || n === "table") return "table"
    if (
      typeof window != "undefined" &&
      typeof window.getComputedStyle == "function"
    ) {
      let r = window.getComputedStyle(e).display
      if (r.includes("grid")) return "grid"
      if (r.includes("flex"))
        return window.getComputedStyle(e).flexDirection.includes("column")
          ? "flex-column"
          : "flex-row"
      if (r.includes("table")) return "table"
    }
    return "unknown"
  }
  function Uh(e) {
    let t = e.tagName.toLowerCase()
    return !!(Jl.has(t) || (e.id && Zl.has(e.id)))
  }
  function Wh(e) {
    if (typeof window == "undefined") return !1
    let t = ke(e)
    return pe(t)
      ? t.width >= window.innerWidth * 0.9 &&
          t.height >= window.innerHeight * 0.9
      : !1
  }
  function Vh(e, t) {
    let n = t.map(ke)
    if (!n.every(pe)) return
    let r = t
        .map((s, c) => ({ sibling: s, index: c, rect: n[c] }))
        .sort(
          (s, c) =>
            s.rect.y - c.rect.y || s.rect.x - c.rect.x || s.index - c.index,
        ),
      o = r.findIndex(({ sibling: s }) => s === e) + 1
    if (o <= 0) return
    let i = []
    for (let s of r)
      i.findIndex((d) => Math.abs(d - s.rect.y) <= 4) === -1 && i.push(s.rect.y)
    let a = ke(e)
    if (!a) return { index: o, count: r.length }
    let u = i.findIndex((s) => Math.abs(s - a.y) <= 4) + 1,
      l =
        r.filter((s) => Math.abs(s.rect.y - a.y) <= 4 && s.rect.x < a.x)
          .length + 1
    return L(k({ index: o, count: r.length }, u > 0 ? { row: u } : {}), {
      column: l,
    })
  }
  function Kh(e) {
    let t = jh(e),
      n = $l(e),
      r = ni(e),
      o = t.filter((l) => $l(l) === n),
      i = t.filter((l) => ni(l) === r),
      a = []
    o.length > 1 && a.push("tag+classes"),
      i.length > 1 && a.push("subtree-shape")
    let u = i.length > 1 ? i : o.length > 1 ? o : []
    return (
      u.length > 1 && u.every((l) => zh(e, l)) && a.push("rect-size"),
      { siblings: u, basis: a }
    )
  }
  function Gh({
    element: e,
    siblings: t,
    basis: n,
    depthFromSelected: r,
    childPathIndexes: o,
  }) {
    if (!e.parentElement || t.length <= 1) return 0
    let i = 0
    return (
      t.length >= 2 && t.length <= 12 && (i += 3),
      n.includes("tag+classes") && (i += 3),
      n.includes("subtree-shape") && (i += 3),
      n.includes("rect-size") && (i += 2),
      ii(e.parentElement) !== "unknown" && (i += 2),
      t.every((u) => nu(u, o)) && (i += 1),
      Ae(e) && (i += 1),
      Uh(e) && (i -= 4),
      Wh(e) && (i -= 4),
      t.length > 20 && (i -= 3),
      r > 8 && (i -= 1),
      i
    )
  }
  function Xh(e) {
    let t = [],
      n = e,
      r = 0
    for (; n && n !== document.body && r <= Gl; ) {
      let o = n.parentElement
      if (o) {
        let { siblings: i, basis: a } = Kh(n)
        if (i.length > 1) {
          let u = ii(o),
            l = $h(n, e),
            s = Gh({
              element: n,
              siblings: i,
              basis: a,
              depthFromSelected: r,
              childPathIndexes: l,
            }),
            c = [...a]
          if (
            (u !== "unknown" && c.push("parent-layout"),
            i.every((d) => nu(d, l)) && c.push("same-child-path"),
            s >= ql)
          ) {
            let d = Math.max(i.indexOf(n) + 1, 1),
              p = ke(n)
            t.push({
              element: Ul(n),
              container: L(k({}, Ul(o)), { childCount: o.children.length }),
              depthFromSelected: r,
              position: { index: d, count: i.length },
              similarityBasis: c,
              pathToSelected: tu(n, e),
              visualPosition: Vh(n, i),
              score: s,
              area: p ? p.width * p.height : 0,
              domIndex: oi(n),
            })
          }
        }
      }
      ;(n = n.parentElement), r++
    }
    return t
      .sort(
        (o, i) =>
          i.score - o.score ||
          o.depthFromSelected - i.depthFromSelected ||
          o.area - i.area ||
          o.domIndex - i.domIndex,
      )
      .slice(0, Xl)
      .map((u) => {
        var l = u,
          { area: o, domIndex: i } = l,
          a = q(l, ["area", "domIndex"])
        return a
      })
  }
  function qh(e, t) {
    if (t[0]) return t[0].pathToSelected
    let n = e.parentElement
    return n ? tu(n, e) : [eu(e)]
  }
  function Wl(e) {
    return k(
      k(
        { tagName: e.tagName, id: e.id, classes: [...e.classes] },
        e.textPreview ? { textPreview: e.textPreview } : {},
      ),
      e.rect ? { rect: k({}, e.rect) } : {},
    )
  }
  function Yh(e, t, n) {
    let r = [],
      o = n.elementsByRuntimeId.get(t)
    for (; o && o.runtimeElementId !== e; )
      r.push(o.childIndex),
        (o = o.parentRuntimeElementId
          ? n.elementsByRuntimeId.get(o.parentRuntimeElementId)
          : void 0)
    return r.reverse()
  }
  function ru(e, t, n) {
    let r = e
    for (let o of t) {
      let i = r.childRuntimeElementIds[o - 1]
      if (((r = i ? n.elementsByRuntimeId.get(i) : void 0), !r)) return !1
    }
    return !0
  }
  function ri(e, t, n = 0) {
    let r = e.classes
      .filter((a) => !a.startsWith("data-fg"))
      .sort()
      .slice(0, 6)
    if (n >= Yl) return `${e.tagName}.${r.join(".")}`
    let o = e.childRuntimeElementIds
        .slice(0, dr)
        .map((a) => t.elementsByRuntimeId.get(a))
        .filter((a) => a != null)
        .map((a) => ri(a, t, n + 1)),
      i = e.childRuntimeElementIds.length > dr ? ",\u2026" : ""
    return `${e.tagName}.${r.join(".")}[${o.join(",")}${i}]`
  }
  function Jh(e, t) {
    let n = e.parentRuntimeElementId
      ? t.elementsByRuntimeId.get(e.parentRuntimeElementId)
      : void 0
    return n
      ? n.childRuntimeElementIds
          .map((r) => t.elementsByRuntimeId.get(r))
          .filter((r) => r != null)
      : [e]
  }
  function Zh(e, t) {
    return !pe(e.rect) || !pe(t.rect)
      ? !1
      : pr(e.rect.width, t.rect.width) && pr(e.rect.height, t.rect.height)
  }
  function Qh(e, t) {
    let n = Jh(e, t),
      r = `${e.tagName}.${e.classes
        .filter((s) => !s.startsWith("data-fg"))
        .sort()
        .join(".")}`,
      o = ri(e, t),
      i = n.filter(
        (s) =>
          `${s.tagName}.${s.classes
            .filter((c) => !c.startsWith("data-fg"))
            .sort()
            .join(".")}` === r,
      ),
      a = n.filter((s) => ri(s, t) === o),
      u = []
    i.length > 1 && u.push("tag+classes"),
      a.length > 1 && u.push("subtree-shape")
    let l = a.length > 1 ? a : i.length > 1 ? i : []
    return (
      l.length > 1 && l.every((s) => Zh(e, s)) && u.push("rect-size"),
      { siblings: l, basis: u }
    )
  }
  function eg(e) {
    return !!(Jl.has(e.tagName) || (e.id && Zl.has(e.id)))
  }
  function tg(e) {
    return typeof window == "undefined" || !pe(e.rect)
      ? !1
      : e.rect.width >= window.innerWidth * 0.9 &&
          e.rect.height >= window.innerHeight * 0.9
  }
  function ng(e, t) {
    if (!t.every((u) => pe(u.rect))) return
    let n = t
        .map((u, l) => ({ sibling: u, index: l, rect: u.rect }))
        .sort(
          (u, l) =>
            u.rect.y - l.rect.y || u.rect.x - l.rect.x || u.index - l.index,
        ),
      r = n.findIndex(({ sibling: u }) => u === e) + 1
    if (r <= 0) return
    let o = []
    for (let u of n)
      o.findIndex((s) => Math.abs(s - u.rect.y) <= 4) === -1 && o.push(u.rect.y)
    let i = pe(e.rect)
        ? o.findIndex((u) => Math.abs(u - e.rect.y) <= 4) + 1
        : 0,
      a = pe(e.rect)
        ? n.filter(
            (u) => Math.abs(u.rect.y - e.rect.y) <= 4 && u.rect.x < e.rect.x,
          ).length + 1
        : void 0
    return k(
      k({ index: r, count: n.length }, i > 0 ? { row: i } : {}),
      a ? { column: a } : {},
    )
  }
  function ou(e, t, n) {
    let r = [],
      o = n.elementsByRuntimeId.get(t)
    for (; o && (r.push(o), o.runtimeElementId !== e); )
      o = o.parentRuntimeElementId
        ? n.elementsByRuntimeId.get(o.parentRuntimeElementId)
        : void 0
    return r.reverse().map((i) =>
      k(
        {
          tagName: i.tagName,
          id: i.id,
          classes: [...i.classes],
          childIndex: i.childIndex,
          sameTagIndex: i.sameTagIndex,
        },
        i.textPreview ? { textPreview: i.textPreview } : {},
      ),
    )
  }
  function rg({
    context: e,
    siblings: t,
    basis: n,
    depthFromSelected: r,
    childPathIndexes: o,
    baseline: i,
  }) {
    var s
    if (!e.parentRuntimeElementId || t.length <= 1) return 0
    let a = 0
    t.length >= 2 && t.length <= 12 && (a += 3),
      n.includes("tag+classes") && (a += 3),
      n.includes("subtree-shape") && (a += 3),
      n.includes("rect-size") && (a += 2)
    let u = i.elementsByRuntimeId.get(e.parentRuntimeElementId)
    return (
      ((s = u == null ? void 0 : u.layout) != null ? s : "unknown") !==
        "unknown" && (a += 2),
      t.every((c) => ru(c, o, i)) && (a += 1),
      e.textPreview && (a += 1),
      eg(e) && (a -= 4),
      tg(e) && (a -= 4),
      t.length > 20 && (a -= 3),
      r > 8 && (a -= 1),
      a
    )
  }
  function og(e, t) {
    let n = [],
      r = e,
      o = 0
    for (; r && o <= Gl; ) {
      let i = r.parentRuntimeElementId
        ? t.elementsByRuntimeId.get(r.parentRuntimeElementId)
        : void 0
      if (i) {
        let { siblings: a, basis: u } = Qh(r, t)
        if (a.length > 1) {
          let l = Yh(r.runtimeElementId, e.runtimeElementId, t),
            s = rg({
              context: r,
              siblings: a,
              basis: u,
              depthFromSelected: o,
              childPathIndexes: l,
              baseline: t,
            }),
            c = [...u]
          if (
            (i.layout !== "unknown" && c.push("parent-layout"),
            a.every((d) => ru(d, l, t)) && c.push("same-child-path"),
            s >= ql)
          ) {
            let d = Math.max(a.indexOf(r) + 1, 1)
            n.push({
              element: Wl(r),
              container: L(k({}, Wl(i)), {
                childCount: i.childRuntimeElementIds.length,
              }),
              depthFromSelected: o,
              position: { index: d, count: a.length },
              similarityBasis: c,
              pathToSelected: ou(r.runtimeElementId, e.runtimeElementId, t),
              visualPosition: ng(r, a),
              score: s,
              area: r.rect ? r.rect.width * r.rect.height : 0,
              domIndex: r.childIndex,
            })
          }
        }
      }
      ;(r = r.parentRuntimeElementId
        ? t.elementsByRuntimeId.get(r.parentRuntimeElementId)
        : void 0),
        o++
    }
    return n
      .sort(
        (i, a) =>
          a.score - i.score ||
          i.depthFromSelected - a.depthFromSelected ||
          i.area - a.area ||
          i.domIndex - a.domIndex,
      )
      .slice(0, Xl)
      .map((l) => {
        var s = l,
          { area: i, domIndex: a } = s,
          u = q(s, ["area", "domIndex"])
        return u
      })
  }
  function ig(e, t, n) {
    return n[0]
      ? n[0].pathToSelected
      : e.parentRuntimeElementId
        ? ou(e.parentRuntimeElementId, e.runtimeElementId, t)
        : [
            k(
              {
                tagName: e.tagName,
                id: e.id,
                classes: [...e.classes],
                childIndex: e.childIndex,
                sameTagIndex: e.sameTagIndex,
              },
              e.textPreview ? { textPreview: e.textPreview } : {},
            ),
          ]
  }
  function iu(e = document.body, t = {}) {
    var s, c
    let n = new Map(),
      r = new Map(),
      o = new Set(),
      i = (s = t.includeElement) != null ? s : () => !0,
      a = le(e) ? e : document.body,
      u = (d) => {
        if (!i(d)) return
        let p = Bh(d, o, t.assignRuntimeElementId)
        r.set(d, p), Array.from(d.children).forEach(u)
      }
    u(a)
    let l = new Map()
    for (let d of r.keys())
      d.id && l.set(d.id, ((c = l.get(d.id)) != null ? c : 0) + 1)
    for (let [d, p] of r.entries()) {
      let f = Array.from(d.children).filter((T) => r.has(T)),
        h = d.parentElement,
        S = h ? Array.from(h.children).filter((T) => r.has(T)) : [d],
        E = S.filter(
          (T) => T.tagName.toLowerCase() === d.tagName.toLowerCase(),
        ),
        g = Math.max(S.indexOf(d) + 1, 1),
        b = Math.max(E.indexOf(d) + 1, 1),
        C = Ae(d),
        v = ke(d)
      n.set(
        p,
        L(
          k(
            k(
              k(
                L(
                  k(
                    { runtimeElementId: p },
                    h && r.has(h) ? { parentRuntimeElementId: r.get(h) } : {},
                  ),
                  {
                    childRuntimeElementIds: f.map((T) => r.get(T)),
                    tagName: d.tagName.toLowerCase(),
                    id: d.id || null,
                    classes: Array.from(d.classList),
                  },
                ),
                C ? { textPreview: C } : {},
              ),
              C ? { contentPreview: C } : {},
            ),
            v ? { rect: v } : {},
          ),
          {
            childIndex: g,
            sameTagIndex: b,
            siblingPosition: { index: b, count: E.length || 1 },
            layout: ii(d),
          },
        ),
      )
    }
    return L(
      k(
        { url: typeof window != "undefined" ? window.location.href : "" },
        r.get(a) ? { rootRuntimeElementId: r.get(a) } : {},
      ),
      { elementsByRuntimeId: n, idCounts: l },
    )
  }
  function au(e, t, n = {}) {
    var d
    let r = t.elementsByRuntimeId.get(e)
    if (!r) return null
    let o = n.includeInstanceHints === !0,
      i = n.includeRepeatedDomContexts === !0,
      a = i ? og(r, t) : [],
      u = i ? ig(r, t, a) : void 0,
      l = [],
      s = r.parentRuntimeElementId
        ? t.elementsByRuntimeId.get(r.parentRuntimeElementId)
        : void 0
    for (; s && s.tagName !== "body"; )
      l.push({
        tagName: s.tagName,
        id: s.id,
        classes: [...s.classes],
        hasUniqueId: Boolean(s.id && t.idCounts.get(s.id) === 1),
      }),
        (s = s.parentRuntimeElementId
          ? t.elementsByRuntimeId.get(s.parentRuntimeElementId)
          : void 0)
    let c = null
    for (let p = 0; p < l.length; p++) {
      let f = l[p]
      if (f != null && f.hasUniqueId) {
        c = { tagName: f.tagName, distanceFromTarget: p + 1 }
        break
      }
    }
    return L(
      k({ url: t.url }, i && { elementPath: u, repeatedDomContexts: a }),
      {
        element: k(
          { tagName: r.tagName, id: r.id, classes: [...r.classes] },
          o &&
            k(
              { siblingPosition: k({}, r.siblingPosition) },
              r.textPreview
                ? {
                    textPreview: r.textPreview,
                    contentPreview:
                      (d = r.contentPreview) != null ? d : r.textPreview,
                  }
                : {},
            ),
        ),
        ancestors: l,
        nearestIdentifiableAncestor: c,
      },
    )
  }
  function su(e, t = {}) {
    let n = t.includeInstanceHints === !0,
      r = t.includeRepeatedDomContexts === !0,
      o = n ? Kl(e) : void 0,
      i = n ? Ae(e) : void 0,
      a = r ? Xh(e) : [],
      u = r ? qh(e, a) : void 0,
      l = [],
      s = e.parentElement
    for (; s && s !== document.body; ) {
      let d = Boolean(
        s.id && document.querySelectorAll("#" + CSS.escape(s.id)).length === 1,
      )
      l.push({
        tagName: s.tagName.toLowerCase(),
        id: s.id || null,
        classes: Array.from(s.classList),
        hasUniqueId: d,
      }),
        (s = s.parentElement)
    }
    let c = null
    for (let d = 0; d < l.length; d++) {
      let p = l[d]
      if (p != null && p.hasUniqueId) {
        c = { tagName: p.tagName, distanceFromTarget: d + 1 }
        break
      }
    }
    return L(
      k(
        { url: typeof window != "undefined" ? window.location.href : "" },
        r && { elementPath: u, repeatedDomContexts: a },
      ),
      {
        element: k(
          {
            tagName: e.tagName.toLowerCase(),
            id: e.id || null,
            classes: Array.from(e.classList),
          },
          n && { siblingPosition: o, textPreview: i, contentPreview: i },
        ),
        ancestors: l,
        nearestIdentifiableAncestor: c,
      },
    )
  }
  var Vl,
    Gl,
    Xl,
    ql,
    Yl,
    dr,
    Jl,
    Zl,
    lu = F(() => {
      me()
      ne()
      Vl = 1
      ;(Gl = 12),
        (Xl = 3),
        (ql = 4),
        (Yl = 3),
        (dr = 6),
        (Jl = new Set(["body", "html", "main"])),
        (Zl = new Set(["root", "__next", "app"]))
    })
  function fr(e) {
    var a
    let t = []
    t.push(uu), t.push(`URL: ${e.url}`), t.push("")
    let { element: n, ancestors: r, nearestIdentifiableAncestor: o } = e
    t.push(
      `Element: <${n.tagName}${n.id ? ` id="${n.id}"` : ""}${
        n.classes.length ? ` class="${n.classes.join(" ")}"` : ""
      }>`,
    ),
      n.siblingPosition &&
        t.push(
          `Instance: sibling ${n.siblingPosition.index} of ${n.siblingPosition.count} among <${n.tagName}> siblings in this parent`,
        )
    let i = (a = n.contentPreview) != null ? a : n.textPreview
    return (
      i && t.push(`Content preview: ${JSON.stringify(i)}`),
      t.push(""),
      r &&
        r.length > 0 &&
        (t.push(`Ancestors (${r.length} levels):`),
        r.forEach((u, l) => {
          let s = "  ".repeat(l + 1),
            c = u.id ? ` id="${u.id}"` : "",
            d = u.classes.length ? ` class="${u.classes.join(" ")}"` : ""
          t.push(
            `${s}<${u.tagName}${c}${d}>${u.hasUniqueId ? " [uniqueId]" : ""}`,
          )
        }),
        t.push("")),
      o
        ? t.push(
            `Nearest identifiable ancestor: <${o.tagName}> (${o.distanceFromTarget} level(s) up)`,
          )
        : t.push("Note: No ancestor with unique ID found"),
      t.join(`
`)
    )
  }
  function cu(e) {
    return e.length === 0
      ? ""
      : e.length === 1
        ? fr(e[0])
        : e
            .map((t, n) => fr(t).replace(uu, `[Edited Element ${n + 1}]`))
            .join(`

`)
  }
  var uu,
    du = F(() => {
      uu = "[Selected Element]"
    })
  function ai(e) {
    let t = Il(e),
      n = [],
      r = new WeakMap(),
      o = (g, b) =>
        new Promise((C) => {
          var R, B, y
          if (!e.skipBuildDataAttributes) {
            let m = dt(g)
            if (m) {
              let A = m.filter((w) => w.type === "element")
              if (A.length > 0) {
                let w = A.filter((j) => j.isComponentDefinition),
                  z = A.filter((j) => !j.isComponentDefinition),
                  H = [...w, ...z],
                  U = (j) => ({
                    filePath: j.filePath,
                    line: j.line,
                    column: j.column,
                    componentName: j.name,
                    sourceLocationKey: j.sourceId,
                    type: Z.DATA_ATTRIBUTES,
                  }),
                  te = { tagName: g.tagName.toLowerCase(), frames: H.map(U) }
                if ((R = te.frames) != null && R.length) {
                  let j = te.frames[te.frames.length - 1]
                  ;(te.displayName = j == null ? void 0 : j.componentName),
                    (te.sourceLocationKey =
                      j == null ? void 0 : j.sourceLocationKey)
                }
                return C(te)
              }
            }
          }
          let v =
              (y =
                (B = b == null ? void 0 : b.timeout) != null
                  ? B
                  : e.defaultResolutionTimeoutMs) != null
                ? y
                : So,
            T
          t.load(g)
            .then((m) => {
              if (!m) {
                C(void 0)
                return
              }
              T = setTimeout(() => {
                console.warn(
                  "Source data resolution timed out for element",
                  g.tagName,
                ),
                  C(void 0)
              }, v)
              let A = L(k({}, b != null ? b : {}), { timeout: v })
              return m.resolveElementSource(g, A).then((w) => {
                T != null && clearTimeout(T), C(w)
              })
            })
            .catch((m) => {
              T != null && clearTimeout(T),
                console.error(
                  "Error resolving source data for element",
                  g.tagName,
                  m,
                ),
                C(void 0)
            })
        }),
      i = (g, b, C) => {
        var R, B
        let v = (R = g.tagName) != null ? R : b.tagName.toLowerCase()
        g.tagName == null && (g.tagName = v),
          Object.assign(g, Dn(g, v)),
          (g.hostKind = ue(b)),
          ((B = C == null ? void 0 : C.isLibrary) != null ? B : Ee)(
            g.ownerFilePath,
          ) && (g.isLibraryComposite = !0)
      },
      a = (g, b) => {
        let C = r.get(g)
        if (C) return C
        let v = u(g, b)
        return r.set(g, v), v
      },
      u = (g, b) =>
        x(this, null, function* () {
          var y
          let C = g.parentElement,
            v = new Set(),
            T
          if (C) {
            let m = yield a(C, b)
            ;(v = new Set(m.ancestorOwnerKeys)),
              ((y = m.sourceData) == null
                ? void 0
                : y.ownerSourceLocationKey) != null &&
                v.add(m.sourceData.ownerSourceLocationKey),
              (T = m.sourceData)
          }
          let R = yield o(g, b)
          if (!R) return { sourceData: void 0, ancestorOwnerKeys: v }
          i(R, g, b)
          let B = T == null ? void 0 : T.ownerSourceLocationKey
          return (
            B != null && (R.parentOwnerSourceLocationKey = B),
            (R.hasExternalOwner = Bn({ parentOwnerKey: B, frames: R.frames })),
            (R.isOwnerSeenInDomAncestors = jn({
              ownerKey: R.ownerSourceLocationKey,
              ancestorOwnerKeys: v,
            })),
            { sourceData: R, ancestorOwnerKeys: v }
          )
        }),
      l = (g, b) =>
        g
          ? b != null && b.includeAncestorContext
            ? a(g, b).then((C) => C.sourceData)
            : o(g, b).then((C) => (C && i(C, g, b), C))
          : Promise.resolve(void 0),
      E = {
        resolveElementTarget: (g, b, C) =>
          x(this, null, function* () {
            var R
            if (!g) return
            let v =
                (R = C == null ? void 0 : C.assignInstanceId) != null
                  ? R
                  : rt(),
              T = yield t.load(g)
            if (T) return T.resolveElementTarget(g, b, v)
          }),
        resolveElementSource: l,
        findMatchingElements: Kn,
        collectElementSource: (g, b, C) => {
          b && n.push({ id: g, sourcePromise: l(b, C) })
        },
        collectCompositeSource: (g, b, C, v) => {
          b == null ||
            !C ||
            n.push({ id: g, sourcePromise: t.load(C).then((T) => {
                if (T != null && T.resolveCompositeSource)
                  return T.resolveCompositeSource(b, v)
              }) })
        },
        assignCollectedElementSources: (g) =>
          x(this, null, function* () {
            let b = {}
            if (g == null) return (n.length = 0), b
            let C = new Map(),
              v = (T) => {
                if (T && (T.id && C.set(T.id, T), T.childNodes))
                  for (let R of T.childNodes) v(R)
              }
            return (
              v(g),
              yield Promise.all(
                n.map((B) =>
                  x(this, [B], function* ({ id: T, sourcePromise: R }) {
                    let y = C.get(T)
                    if (y) {
                      let m = yield R
                      m && ((y.sourceData = m), (b[T] = m))
                    }
                  }),
                ),
              ),
              (n.length = 0),
              b
            )
          }),
        destroy: () => {
          var g
          t.destroy(),
            (g = e == null ? void 0 : e.sourceMapEngine) == null || g.destroy(),
            (n.length = 0)
        },
        generateComponentTree(g, b) {
          let T = b != null ? b : {},
            { assignInstanceId: C } = T,
            v = q(T, ["assignInstanceId"])
          return qo(g, (R) =>
            It({
              rootEl: R,
              devtools: E,
              assignInstanceId: C,
              buildRawTree: (B, y, m) =>
                x(this, null, function* () {
                  let A = yield t.load(B)
                  if (A) return A.buildComponentRawTree(B, y, m)
                }),
              options: v,
            }),
          )
        },
        setProps: (g, b) =>
          x(this, null, function* () {
            var v
            let C =
              g instanceof Element
                ? yield t.load(g)
                : yield t.loadByName("react")
            return C
              ? (v = yield C.setProps(g, b)) != null
                ? v
                : {
                    status: "target_unavailable",
                    reason: "runtime_props_unavailable",
                  }
              : { status: "target_unavailable", reason: "no_framework" }
          }),
        getProps: (g, b) =>
          x(this, null, function* () {
            let C = yield t.load(g)
            if (!C) return []
            let v = yield C.getProps(g, b)
            return yield ti(
              v,
              b == null ? void 0 : b.componentName,
              b == null ? void 0 : b.filePath,
            )
          }),
      }
    return E
  }
  var si = F(() => {
    me()
    Kt()
    ne()
    At()
    Qe()
    Vn()
    zo()
    nl()
    Ll()
    ur()
    qn()
    zo()
    Ht()
    lu()
    du()
    Vn()
    me()
    At()
    Qe()
    ne()
    Fo()
    Vn()
  })
  var pu,
    fu = F(() => {
      pu = `(()=>{var qe=Object.create;var K=Object.defineProperty;var $e=Object.getOwnPropertyDescriptor;var Xe=Object.getOwnPropertyNames;var Qe=Object.getPrototypeOf,He=Object.prototype.hasOwnProperty;var Ze=(t,e,r)=>e in t?K(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var w=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Ke=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Xe(e))!He.call(t,o)&&o!==r&&K(t,o,{get:()=>e[o],enumerable:!(n=$e(e,o))||n.enumerable});return t};var Ye=(t,e,r)=>(r=t!=null?qe(Qe(t)):{},Ke(e||!t||!t.__esModule?K(r,"default",{value:t,enumerable:!0}):r,t));var A=(t,e,r)=>(Ze(t,typeof e!="symbol"?e+"":e,r),r);var L=(t,e,r)=>new Promise((n,o)=>{var i=u=>{try{l(r.next(u))}catch(a){o(a)}},s=u=>{try{l(r.throw(u))}catch(a){o(a)}},l=u=>u.done?n(u.value):Promise.resolve(u.value).then(i,s);l((r=r.apply(t,e)).next())});var Ce=w(ee=>{var ye="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");ee.encode=function(t){if(0<=t&&t<ye.length)return ye[t];throw new TypeError("Must be between 0 and 63: "+t)};ee.decode=function(t){var e=65,r=90,n=97,o=122,i=48,s=57,l=43,u=47,a=26,c=52;return e<=t&&t<=r?t-e:n<=t&&t<=o?t-n+a:i<=t&&t<=s?t-i+c:t==l?62:t==u?63:-1}});var te=w(ne=>{var Ee=Ce(),re=5,Me=1<<re,we=Me-1,be=Me;function sr(t){return t<0?(-t<<1)+1:(t<<1)+0}function ur(t){var e=(t&1)===1,r=t>>1;return e?-r:r}ne.encode=function(e){var r="",n,o=sr(e);do n=o&we,o>>>=re,o>0&&(n|=be),r+=Ee.encode(n);while(o>0);return r};ne.decode=function(e,r,n){var o=e.length,i=0,s=0,l,u;do{if(r>=o)throw new Error("Expected more digits in base 64 VLQ value.");if(u=Ee.decode(e.charCodeAt(r++)),u===-1)throw new Error("Invalid base64 digit: "+e.charAt(r-1));l=!!(u&be),u&=we,i=i+(u<<s),s+=re}while(l);n.value=ur(i),n.rest=r}});var P=w(y=>{function lr(t,e,r){if(e in t)return t[e];if(arguments.length===3)return r;throw new Error('"'+e+'" is a required argument.')}y.getArg=lr;var Ae=/^(?:([\\w+\\-.]+):)?\\/\\/(?:(\\w+:\\w+)@)?([\\w.-]*)(?::(\\d+))?(.*)$/,ar=/^data:.+\\,.+$/;function z(t){var e=t.match(Ae);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}y.urlParse=z;function D(t){var e="";return t.scheme&&(e+=t.scheme+":"),e+="//",t.auth&&(e+=t.auth+"@"),t.host&&(e+=t.host),t.port&&(e+=":"+t.port),t.path&&(e+=t.path),e}y.urlGenerate=D;var cr=32;function fr(t){var e=[];return function(r){for(var n=0;n<e.length;n++)if(e[n].input===r){var o=e[0];return e[0]=e[n],e[n]=o,e[0].result}var i=t(r);return e.unshift({input:r,result:i}),e.length>cr&&e.pop(),i}}var oe=fr(function(e){var r=e,n=z(e);if(n){if(!n.path)return e;r=n.path}for(var o=y.isAbsolute(r),i=[],s=0,l=0;;)if(s=l,l=r.indexOf("/",s),l===-1){i.push(r.slice(s));break}else for(i.push(r.slice(s,l));l<r.length&&r[l]==="/";)l++;for(var u,a=0,l=i.length-1;l>=0;l--)u=i[l],u==="."?i.splice(l,1):u===".."?a++:a>0&&(u===""?(i.splice(l+1,a),a=0):(i.splice(l,2),a--));return r=i.join("/"),r===""&&(r=o?"/":"."),n?(n.path=r,D(n)):r});y.normalize=oe;function Le(t,e){t===""&&(t="."),e===""&&(e=".");var r=z(e),n=z(t);if(n&&(t=n.path||"/"),r&&!r.scheme)return n&&(r.scheme=n.scheme),D(r);if(r||e.match(ar))return e;if(n&&!n.host&&!n.path)return n.host=e,D(n);var o=e.charAt(0)==="/"?e:oe(t.replace(/\\/+$/,"")+"/"+e);return n?(n.path=o,D(n)):o}y.join=Le;y.isAbsolute=function(t){return t.charAt(0)==="/"||Ae.test(t)};function dr(t,e){t===""&&(t="."),t=t.replace(/\\/$/,"");for(var r=0;e.indexOf(t+"/")!==0;){var n=t.lastIndexOf("/");if(n<0||(t=t.slice(0,n),t.match(/^([^\\/]+:\\/)?\\/*$/)))return e;++r}return Array(r+1).join("../")+e.substr(t.length+1)}y.relative=dr;var Te=function(){var t=Object.create(null);return!("__proto__"in t)}();function Oe(t){return t}function hr(t){return xe(t)?"$"+t:t}y.toSetString=Te?Oe:hr;function mr(t){return xe(t)?t.slice(1):t}y.fromSetString=Te?Oe:mr;function xe(t){if(!t)return!1;var e=t.length;if(e<9||t.charCodeAt(e-1)!==95||t.charCodeAt(e-2)!==95||t.charCodeAt(e-3)!==111||t.charCodeAt(e-4)!==116||t.charCodeAt(e-5)!==111||t.charCodeAt(e-6)!==114||t.charCodeAt(e-7)!==112||t.charCodeAt(e-8)!==95||t.charCodeAt(e-9)!==95)return!1;for(var r=e-10;r>=0;r--)if(t.charCodeAt(r)!==36)return!1;return!0}function gr(t,e,r){var n=T(t.source,e.source);return n!==0||(n=t.originalLine-e.originalLine,n!==0)||(n=t.originalColumn-e.originalColumn,n!==0||r)||(n=t.generatedColumn-e.generatedColumn,n!==0)||(n=t.generatedLine-e.generatedLine,n!==0)?n:T(t.name,e.name)}y.compareByOriginalPositions=gr;function pr(t,e,r){var n;return n=t.originalLine-e.originalLine,n!==0||(n=t.originalColumn-e.originalColumn,n!==0||r)||(n=t.generatedColumn-e.generatedColumn,n!==0)||(n=t.generatedLine-e.generatedLine,n!==0)?n:T(t.name,e.name)}y.compareByOriginalPositionsNoSource=pr;function vr(t,e,r){var n=t.generatedLine-e.generatedLine;return n!==0||(n=t.generatedColumn-e.generatedColumn,n!==0||r)||(n=T(t.source,e.source),n!==0)||(n=t.originalLine-e.originalLine,n!==0)||(n=t.originalColumn-e.originalColumn,n!==0)?n:T(t.name,e.name)}y.compareByGeneratedPositionsDeflated=vr;function _r(t,e,r){var n=t.generatedColumn-e.generatedColumn;return n!==0||r||(n=T(t.source,e.source),n!==0)||(n=t.originalLine-e.originalLine,n!==0)||(n=t.originalColumn-e.originalColumn,n!==0)?n:T(t.name,e.name)}y.compareByGeneratedPositionsDeflatedNoLine=_r;function T(t,e){return t===e?0:t===null?1:e===null?-1:t>e?1:-1}function Sr(t,e){var r=t.generatedLine-e.generatedLine;return r!==0||(r=t.generatedColumn-e.generatedColumn,r!==0)||(r=T(t.source,e.source),r!==0)||(r=t.originalLine-e.originalLine,r!==0)||(r=t.originalColumn-e.originalColumn,r!==0)?r:T(t.name,e.name)}y.compareByGeneratedPositionsInflated=Sr;function yr(t){return JSON.parse(t.replace(/^\\)]}'[^\\n]*\\n/,""))}y.parseSourceMapInput=yr;function Cr(t,e,r){if(e=e||"",t&&(t[t.length-1]!=="/"&&e[0]!=="/"&&(t+="/"),e=t+e),r){var n=z(r);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var o=n.path.lastIndexOf("/");o>=0&&(n.path=n.path.substring(0,o+1))}e=Le(D(n),e)}return oe(e)}y.computeSourceURL=Cr});var ue=w(Ne=>{var ie=P(),se=Object.prototype.hasOwnProperty,x=typeof Map!="undefined";function O(){this._array=[],this._set=x?new Map:Object.create(null)}O.fromArray=function(e,r){for(var n=new O,o=0,i=e.length;o<i;o++)n.add(e[o],r);return n};O.prototype.size=function(){return x?this._set.size:Object.getOwnPropertyNames(this._set).length};O.prototype.add=function(e,r){var n=x?e:ie.toSetString(e),o=x?this.has(e):se.call(this._set,n),i=this._array.length;(!o||r)&&this._array.push(e),o||(x?this._set.set(e,i):this._set[n]=i)};O.prototype.has=function(e){if(x)return this._set.has(e);var r=ie.toSetString(e);return se.call(this._set,r)};O.prototype.indexOf=function(e){if(x){var r=this._set.get(e);if(r>=0)return r}else{var n=ie.toSetString(e);if(se.call(this._set,n))return this._set[n]}throw new Error('"'+e+'" is not in the set.')};O.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)};O.prototype.toArray=function(){return this._array.slice()};Ne.ArraySet=O});var De=w(Ie=>{var Re=P();function Er(t,e){var r=t.generatedLine,n=e.generatedLine,o=t.generatedColumn,i=e.generatedColumn;return n>r||n==r&&i>=o||Re.compareByGeneratedPositionsInflated(t,e)<=0}function V(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}V.prototype.unsortedForEach=function(e,r){this._array.forEach(e,r)};V.prototype.add=function(e){Er(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))};V.prototype.toArray=function(){return this._sorted||(this._array.sort(Re.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Ie.MappingList=V});var le=w(Pe=>{var j=te(),_=P(),q=ue().ArraySet,Mr=De().MappingList;function M(t){t||(t={}),this._file=_.getArg(t,"file",null),this._sourceRoot=_.getArg(t,"sourceRoot",null),this._skipValidation=_.getArg(t,"skipValidation",!1),this._ignoreInvalidMapping=_.getArg(t,"ignoreInvalidMapping",!1),this._sources=new q,this._names=new q,this._mappings=new Mr,this._sourcesContents=null}M.prototype._version=3;M.fromSourceMap=function(e,r){var n=e.sourceRoot,o=new M(Object.assign(r||{},{file:e.file,sourceRoot:n}));return e.eachMapping(function(i){var s={generated:{line:i.generatedLine,column:i.generatedColumn}};i.source!=null&&(s.source=i.source,n!=null&&(s.source=_.relative(n,s.source)),s.original={line:i.originalLine,column:i.originalColumn},i.name!=null&&(s.name=i.name)),o.addMapping(s)}),e.sources.forEach(function(i){var s=i;n!==null&&(s=_.relative(n,i)),o._sources.has(s)||o._sources.add(s);var l=e.sourceContentFor(i);l!=null&&o.setSourceContent(i,l)}),o};M.prototype.addMapping=function(e){var r=_.getArg(e,"generated"),n=_.getArg(e,"original",null),o=_.getArg(e,"source",null),i=_.getArg(e,"name",null);!this._skipValidation&&this._validateMapping(r,n,o,i)===!1||(o!=null&&(o=String(o),this._sources.has(o)||this._sources.add(o)),i!=null&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:r.line,generatedColumn:r.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:o,name:i}))};M.prototype.setSourceContent=function(e,r){var n=e;this._sourceRoot!=null&&(n=_.relative(this._sourceRoot,n)),r!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[_.toSetString(n)]=r):this._sourcesContents&&(delete this._sourcesContents[_.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};M.prototype.applySourceMap=function(e,r,n){var o=r;if(r==null){if(e.file==null)throw new Error(\`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.\`);o=e.file}var i=this._sourceRoot;i!=null&&(o=_.relative(i,o));var s=new q,l=new q;this._mappings.unsortedForEach(function(u){if(u.source===o&&u.originalLine!=null){var a=e.originalPositionFor({line:u.originalLine,column:u.originalColumn});a.source!=null&&(u.source=a.source,n!=null&&(u.source=_.join(n,u.source)),i!=null&&(u.source=_.relative(i,u.source)),u.originalLine=a.line,u.originalColumn=a.column,a.name!=null&&(u.name=a.name))}var c=u.source;c!=null&&!s.has(c)&&s.add(c);var h=u.name;h!=null&&!l.has(h)&&l.add(h)},this),this._sources=s,this._names=l,e.sources.forEach(function(u){var a=e.sourceContentFor(u);a!=null&&(n!=null&&(u=_.join(n,u)),i!=null&&(u=_.relative(i,u)),this.setSourceContent(u,a))},this)};M.prototype._validateMapping=function(e,r,n,o){if(r&&typeof r.line!="number"&&typeof r.column!="number"){var i="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console!="undefined"&&console.warn&&console.warn(i),!1;throw new Error(i)}if(!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!r&&!n&&!o)){if(e&&"line"in e&&"column"in e&&r&&"line"in r&&"column"in r&&e.line>0&&e.column>=0&&r.line>0&&r.column>=0&&n)return;var i="Invalid mapping: "+JSON.stringify({generated:e,source:n,original:r,name:o});if(this._ignoreInvalidMapping)return typeof console!="undefined"&&console.warn&&console.warn(i),!1;throw new Error(i)}};M.prototype._serializeMappings=function(){for(var e=0,r=1,n=0,o=0,i=0,s=0,l="",u,a,c,h,d=this._mappings.toArray(),m=0,g=d.length;m<g;m++){if(a=d[m],u="",a.generatedLine!==r)for(e=0;a.generatedLine!==r;)u+=";",r++;else if(m>0){if(!_.compareByGeneratedPositionsInflated(a,d[m-1]))continue;u+=","}u+=j.encode(a.generatedColumn-e),e=a.generatedColumn,a.source!=null&&(h=this._sources.indexOf(a.source),u+=j.encode(h-s),s=h,u+=j.encode(a.originalLine-1-o),o=a.originalLine-1,u+=j.encode(a.originalColumn-n),n=a.originalColumn,a.name!=null&&(c=this._names.indexOf(a.name),u+=j.encode(c-i),i=c)),l+=u}return l};M.prototype._generateSourcesContent=function(e,r){return e.map(function(n){if(!this._sourcesContents)return null;r!=null&&(n=_.relative(r,n));var o=_.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,o)?this._sourcesContents[o]:null},this)};M.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e};M.prototype.toString=function(){return JSON.stringify(this.toJSON())};Pe.SourceMapGenerator=M});var Fe=w(N=>{N.GREATEST_LOWER_BOUND=1;N.LEAST_UPPER_BOUND=2;function ae(t,e,r,n,o,i){var s=Math.floor((e-t)/2)+t,l=o(r,n[s],!0);return l===0?s:l>0?e-s>1?ae(s,e,r,n,o,i):i==N.LEAST_UPPER_BOUND?e<n.length?e:-1:s:s-t>1?ae(t,s,r,n,o,i):i==N.LEAST_UPPER_BOUND?s:t<0?-1:t}N.search=function(e,r,n,o){if(r.length===0)return-1;var i=ae(-1,r.length,e,r,n,o||N.GREATEST_LOWER_BOUND);if(i<0)return-1;for(;i-1>=0&&n(r[i],r[i-1],!0)===0;)--i;return i}});var ze=w(Ue=>{function wr(t){function e(o,i,s){var l=o[i];o[i]=o[s],o[s]=l}function r(o,i){return Math.round(o+Math.random()*(i-o))}function n(o,i,s,l){if(s<l){var u=r(s,l),a=s-1;e(o,u,l);for(var c=o[l],h=s;h<l;h++)i(o[h],c,!1)<=0&&(a+=1,e(o,a,h));e(o,a+1,h);var d=a+1;n(o,i,s,d-1),n(o,i,d+1,l)}}return n}function br(t){let e=wr.toString();return new Function(\`return \${e}\`)()(t)}var Ge=new WeakMap;Ue.quickSort=function(t,e,r=0){let n=Ge.get(e);n===void 0&&(n=br(e),Ge.set(e,n)),n(t,e,r,t.length-1)}});var We=w($=>{var f=P(),fe=Fe(),F=ue().ArraySet,Ar=te(),k=ze().quickSort;function v(t,e){var r=t;return typeof t=="string"&&(r=f.parseSourceMapInput(t)),r.sections!=null?new b(r,e):new C(r,e)}v.fromSourceMap=function(t,e){return C.fromSourceMap(t,e)};v.prototype._version=3;v.prototype.__generatedMappings=null;Object.defineProperty(v.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});v.prototype.__originalMappings=null;Object.defineProperty(v.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});v.prototype._charIsMappingSeparator=function(e,r){var n=e.charAt(r);return n===";"||n===","};v.prototype._parseMappings=function(e,r){throw new Error("Subclasses must implement _parseMappings")};v.GENERATED_ORDER=1;v.ORIGINAL_ORDER=2;v.GREATEST_LOWER_BOUND=1;v.LEAST_UPPER_BOUND=2;v.prototype.eachMapping=function(e,r,n){var o=r||null,i=n||v.GENERATED_ORDER,s;switch(i){case v.GENERATED_ORDER:s=this._generatedMappings;break;case v.ORIGINAL_ORDER:s=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}for(var l=this.sourceRoot,u=e.bind(o),a=this._names,c=this._sources,h=this._sourceMapURL,d=0,m=s.length;d<m;d++){var g=s[d],p=g.source===null?null:c.at(g.source);p!==null&&(p=f.computeSourceURL(l,p,h)),u({source:p,generatedLine:g.generatedLine,generatedColumn:g.generatedColumn,originalLine:g.originalLine,originalColumn:g.originalColumn,name:g.name===null?null:a.at(g.name)})}};v.prototype.allGeneratedPositionsFor=function(e){var r=f.getArg(e,"line"),n={source:f.getArg(e,"source"),originalLine:r,originalColumn:f.getArg(e,"column",0)};if(n.source=this._findSourceIndex(n.source),n.source<0)return[];var o=[],i=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",f.compareByOriginalPositions,fe.LEAST_UPPER_BOUND);if(i>=0){var s=this._originalMappings[i];if(e.column===void 0)for(var l=s.originalLine;s&&s.originalLine===l;)o.push({line:f.getArg(s,"generatedLine",null),column:f.getArg(s,"generatedColumn",null),lastColumn:f.getArg(s,"lastGeneratedColumn",null)}),s=this._originalMappings[++i];else for(var u=s.originalColumn;s&&s.originalLine===r&&s.originalColumn==u;)o.push({line:f.getArg(s,"generatedLine",null),column:f.getArg(s,"generatedColumn",null),lastColumn:f.getArg(s,"lastGeneratedColumn",null)}),s=this._originalMappings[++i]}return o};$.SourceMapConsumer=v;function C(t,e){var r=t;typeof t=="string"&&(r=f.parseSourceMapInput(t));var n=f.getArg(r,"version"),o=f.getArg(r,"sources"),i=f.getArg(r,"names",[]),s=f.getArg(r,"sourceRoot",null),l=f.getArg(r,"sourcesContent",null),u=f.getArg(r,"mappings"),a=f.getArg(r,"file",null);if(n!=this._version)throw new Error("Unsupported version: "+n);s&&(s=f.normalize(s)),o=o.map(String).map(f.normalize).map(function(c){return s&&f.isAbsolute(s)&&f.isAbsolute(c)?f.relative(s,c):c}),this._names=F.fromArray(i.map(String),!0),this._sources=F.fromArray(o,!0),this._absoluteSources=this._sources.toArray().map(function(c){return f.computeSourceURL(s,c,e)}),this.sourceRoot=s,this.sourcesContent=l,this._mappings=u,this._sourceMapURL=e,this.file=a}C.prototype=Object.create(v.prototype);C.prototype.consumer=v;C.prototype._findSourceIndex=function(t){var e=t;if(this.sourceRoot!=null&&(e=f.relative(this.sourceRoot,e)),this._sources.has(e))return this._sources.indexOf(e);var r;for(r=0;r<this._absoluteSources.length;++r)if(this._absoluteSources[r]==t)return r;return-1};C.fromSourceMap=function(e,r){var n=Object.create(C.prototype),o=n._names=F.fromArray(e._names.toArray(),!0),i=n._sources=F.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file,n._sourceMapURL=r,n._absoluteSources=n._sources.toArray().map(function(m){return f.computeSourceURL(n.sourceRoot,m,r)});for(var s=e._mappings.toArray().slice(),l=n.__generatedMappings=[],u=n.__originalMappings=[],a=0,c=s.length;a<c;a++){var h=s[a],d=new ke;d.generatedLine=h.generatedLine,d.generatedColumn=h.generatedColumn,h.source&&(d.source=i.indexOf(h.source),d.originalLine=h.originalLine,d.originalColumn=h.originalColumn,h.name&&(d.name=o.indexOf(h.name)),u.push(d)),l.push(d)}return k(n.__originalMappings,f.compareByOriginalPositions),n};C.prototype._version=3;Object.defineProperty(C.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function ke(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}var ce=f.compareByGeneratedPositionsDeflatedNoLine;function je(t,e){let r=t.length,n=t.length-e;if(!(n<=1))if(n==2){let o=t[e],i=t[e+1];ce(o,i)>0&&(t[e]=i,t[e+1]=o)}else if(n<20)for(let o=e;o<r;o++)for(let i=o;i>e;i--){let s=t[i-1],l=t[i];if(ce(s,l)<=0)break;t[i-1]=l,t[i]=s}else k(t,ce,e)}C.prototype._parseMappings=function(e,r){var n=1,o=0,i=0,s=0,l=0,u=0,a=e.length,c=0,h={},d={},m=[],g=[],p,W,S,R,de;let Z=0;for(;c<a;)if(e.charAt(c)===";")n++,c++,o=0,je(g,Z),Z=g.length;else if(e.charAt(c)===",")c++;else{for(p=new ke,p.generatedLine=n,R=c;R<a&&!this._charIsMappingSeparator(e,R);R++);for(W=e.slice(c,R),S=[];c<R;)Ar.decode(e,c,d),de=d.value,c=d.rest,S.push(de);if(S.length===2)throw new Error("Found a source, but no line and column");if(S.length===3)throw new Error("Found a source and line, but no column");if(p.generatedColumn=o+S[0],o=p.generatedColumn,S.length>1&&(p.source=l+S[1],l+=S[1],p.originalLine=i+S[2],i=p.originalLine,p.originalLine+=1,p.originalColumn=s+S[3],s=p.originalColumn,S.length>4&&(p.name=u+S[4],u+=S[4])),g.push(p),typeof p.originalLine=="number"){let B=p.source;for(;m.length<=B;)m.push(null);m[B]===null&&(m[B]=[]),m[B].push(p)}}je(g,Z),this.__generatedMappings=g;for(var J=0;J<m.length;J++)m[J]!=null&&k(m[J],f.compareByOriginalPositionsNoSource);this.__originalMappings=[].concat(...m)};C.prototype._findMapping=function(e,r,n,o,i,s){if(e[n]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[n]);if(e[o]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[o]);return fe.search(e,r,i,s)};C.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var r=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var n=this._generatedMappings[e+1];if(r.generatedLine===n.generatedLine){r.lastGeneratedColumn=n.generatedColumn-1;continue}}r.lastGeneratedColumn=1/0}};C.prototype.originalPositionFor=function(e){var r={generatedLine:f.getArg(e,"line"),generatedColumn:f.getArg(e,"column")},n=this._findMapping(r,this._generatedMappings,"generatedLine","generatedColumn",f.compareByGeneratedPositionsDeflated,f.getArg(e,"bias",v.GREATEST_LOWER_BOUND));if(n>=0){var o=this._generatedMappings[n];if(o.generatedLine===r.generatedLine){var i=f.getArg(o,"source",null);i!==null&&(i=this._sources.at(i),i=f.computeSourceURL(this.sourceRoot,i,this._sourceMapURL));var s=f.getArg(o,"name",null);return s!==null&&(s=this._names.at(s)),{source:i,line:f.getArg(o,"originalLine",null),column:f.getArg(o,"originalColumn",null),name:s}}}return{source:null,line:null,column:null,name:null}};C.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1};C.prototype.sourceContentFor=function(e,r){if(!this.sourcesContent)return null;var n=this._findSourceIndex(e);if(n>=0)return this.sourcesContent[n];var o=e;this.sourceRoot!=null&&(o=f.relative(this.sourceRoot,o));var i;if(this.sourceRoot!=null&&(i=f.urlParse(this.sourceRoot))){var s=o.replace(/^file:\\/\\//,"");if(i.scheme=="file"&&this._sources.has(s))return this.sourcesContent[this._sources.indexOf(s)];if((!i.path||i.path=="/")&&this._sources.has("/"+o))return this.sourcesContent[this._sources.indexOf("/"+o)]}if(r)return null;throw new Error('"'+o+'" is not in the SourceMap.')};C.prototype.generatedPositionFor=function(e){var r=f.getArg(e,"source");if(r=this._findSourceIndex(r),r<0)return{line:null,column:null,lastColumn:null};var n={source:r,originalLine:f.getArg(e,"line"),originalColumn:f.getArg(e,"column")},o=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",f.compareByOriginalPositions,f.getArg(e,"bias",v.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===n.source)return{line:f.getArg(i,"generatedLine",null),column:f.getArg(i,"generatedColumn",null),lastColumn:f.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};$.BasicSourceMapConsumer=C;function b(t,e){var r=t;typeof t=="string"&&(r=f.parseSourceMapInput(t));var n=f.getArg(r,"version"),o=f.getArg(r,"sections");if(n!=this._version)throw new Error("Unsupported version: "+n);this._sources=new F,this._names=new F;var i={line:-1,column:0};this._sections=o.map(function(s){if(s.url)throw new Error("Support for url field in sections not implemented.");var l=f.getArg(s,"offset"),u=f.getArg(l,"line"),a=f.getArg(l,"column");if(u<i.line||u===i.line&&a<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=l,{generatedOffset:{generatedLine:u+1,generatedColumn:a+1},consumer:new v(f.getArg(s,"map"),e)}})}b.prototype=Object.create(v.prototype);b.prototype.constructor=v;b.prototype._version=3;Object.defineProperty(b.prototype,"sources",{get:function(){for(var t=[],e=0;e<this._sections.length;e++)for(var r=0;r<this._sections[e].consumer.sources.length;r++)t.push(this._sections[e].consumer.sources[r]);return t}});b.prototype.originalPositionFor=function(e){var r={generatedLine:f.getArg(e,"line"),generatedColumn:f.getArg(e,"column")},n=fe.search(r,this._sections,function(i,s){var l=i.generatedLine-s.generatedOffset.generatedLine;return l||i.generatedColumn-s.generatedOffset.generatedColumn}),o=this._sections[n];return o?o.consumer.originalPositionFor({line:r.generatedLine-(o.generatedOffset.generatedLine-1),column:r.generatedColumn-(o.generatedOffset.generatedLine===r.generatedLine?o.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}};b.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})};b.prototype.sourceContentFor=function(e,r){for(var n=0;n<this._sections.length;n++){var o=this._sections[n],i=o.consumer.sourceContentFor(e,!0);if(i||i==="")return i}if(r)return null;throw new Error('"'+e+'" is not in the SourceMap.')};b.prototype.generatedPositionFor=function(e){for(var r=0;r<this._sections.length;r++){var n=this._sections[r];if(n.consumer._findSourceIndex(f.getArg(e,"source"))!==-1){var o=n.consumer.generatedPositionFor(e);if(o){var i={line:o.line+(n.generatedOffset.generatedLine-1),column:o.column+(n.generatedOffset.generatedLine===o.line?n.generatedOffset.generatedColumn-1:0)};return i}}}return{line:null,column:null}};b.prototype._parseMappings=function(e,r){this.__generatedMappings=[],this.__originalMappings=[];for(var n=0;n<this._sections.length;n++)for(var o=this._sections[n],i=o.consumer._generatedMappings,s=0;s<i.length;s++){var l=i[s],u=o.consumer._sources.at(l.source);u!==null&&(u=f.computeSourceURL(o.consumer.sourceRoot,u,this._sourceMapURL)),this._sources.add(u),u=this._sources.indexOf(u);var a=null;l.name&&(a=o.consumer._names.at(l.name),this._names.add(a),a=this._names.indexOf(a));var c={source:u,generatedLine:l.generatedLine+(o.generatedOffset.generatedLine-1),generatedColumn:l.generatedColumn+(o.generatedOffset.generatedLine===l.generatedLine?o.generatedOffset.generatedColumn-1:0),originalLine:l.originalLine,originalColumn:l.originalColumn,name:a};this.__generatedMappings.push(c),typeof c.originalLine=="number"&&this.__originalMappings.push(c)}k(this.__generatedMappings,f.compareByGeneratedPositionsDeflated),k(this.__originalMappings,f.compareByOriginalPositions)};$.IndexedSourceMapConsumer=b});var Be=w(Je=>{var Lr=le().SourceMapGenerator,X=P(),Tr=/(\\r?\\n)/,Or=10,G="$$$isSourceNode$$$";function E(t,e,r,n,o){this.children=[],this.sourceContents={},this.line=t==null?null:t,this.column=e==null?null:e,this.source=r==null?null:r,this.name=o==null?null:o,this[G]=!0,n!=null&&this.add(n)}E.fromStringWithSourceMap=function(e,r,n){var o=new E,i=e.split(Tr),s=0,l=function(){var d=g(),m=g()||"";return d+m;function g(){return s<i.length?i[s++]:void 0}},u=1,a=0,c=null;return r.eachMapping(function(d){if(c!==null)if(u<d.generatedLine)h(c,l()),u++,a=0;else{var m=i[s]||"",g=m.substr(0,d.generatedColumn-a);i[s]=m.substr(d.generatedColumn-a),a=d.generatedColumn,h(c,g),c=d;return}for(;u<d.generatedLine;)o.add(l()),u++;if(a<d.generatedColumn){var m=i[s]||"";o.add(m.substr(0,d.generatedColumn)),i[s]=m.substr(d.generatedColumn),a=d.generatedColumn}c=d},this),s<i.length&&(c&&h(c,l()),o.add(i.splice(s).join(""))),r.sources.forEach(function(d){var m=r.sourceContentFor(d);m!=null&&(n!=null&&(d=X.join(n,d)),o.setSourceContent(d,m))}),o;function h(d,m){if(d===null||d.source===void 0)o.add(m);else{var g=n?X.join(n,d.source):d.source;o.add(new E(d.originalLine,d.originalColumn,g,m,d.name))}}};E.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(r){this.add(r)},this);else if(e[G]||typeof e=="string")e&&this.children.push(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};E.prototype.prepend=function(e){if(Array.isArray(e))for(var r=e.length-1;r>=0;r--)this.prepend(e[r]);else if(e[G]||typeof e=="string")this.children.unshift(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};E.prototype.walk=function(e){for(var r,n=0,o=this.children.length;n<o;n++)r=this.children[n],r[G]?r.walk(e):r!==""&&e(r,{source:this.source,line:this.line,column:this.column,name:this.name})};E.prototype.join=function(e){var r,n,o=this.children.length;if(o>0){for(r=[],n=0;n<o-1;n++)r.push(this.children[n]),r.push(e);r.push(this.children[n]),this.children=r}return this};E.prototype.replaceRight=function(e,r){var n=this.children[this.children.length-1];return n[G]?n.replaceRight(e,r):typeof n=="string"?this.children[this.children.length-1]=n.replace(e,r):this.children.push("".replace(e,r)),this};E.prototype.setSourceContent=function(e,r){this.sourceContents[X.toSetString(e)]=r};E.prototype.walkSourceContents=function(e){for(var r=0,n=this.children.length;r<n;r++)this.children[r][G]&&this.children[r].walkSourceContents(e);for(var o=Object.keys(this.sourceContents),r=0,n=o.length;r<n;r++)e(X.fromSetString(o[r]),this.sourceContents[o[r]])};E.prototype.toString=function(){var e="";return this.walk(function(r){e+=r}),e};E.prototype.toStringWithSourceMap=function(e){var r={code:"",line:1,column:0},n=new Lr(e),o=!1,i=null,s=null,l=null,u=null;return this.walk(function(a,c){r.code+=a,c.source!==null&&c.line!==null&&c.column!==null?((i!==c.source||s!==c.line||l!==c.column||u!==c.name)&&n.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:r.line,column:r.column},name:c.name}),i=c.source,s=c.line,l=c.column,u=c.name,o=!0):o&&(n.addMapping({generated:{line:r.line,column:r.column}}),i=null,o=!1);for(var h=0,d=a.length;h<d;h++)a.charCodeAt(h)===Or?(r.line++,r.column=0,h+1===d?(i=null,o=!1):o&&n.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:r.line,column:r.column},name:c.name})):r.column++}),this.walkSourceContents(function(a,c){n.setSourceContent(a,c)}),{code:r.code,map:n}};Je.SourceNode=E});var Ve=w(Q=>{Q.SourceMapGenerator=le().SourceMapGenerator;Q.SourceMapConsumer=We().SourceMapConsumer;Q.SourceNode=Be().SourceNode});var I;(function(t){t[t.RUNTIME=0]="RUNTIME",t[t.SOURCE_MAP=1]="SOURCE_MAP",t[t.DATA_ATTRIBUTES=2]="DATA_ATTRIBUTES"})(I||(I={}));function ge(t){var o,i;let e=/(?:\\/\\/[@#]\\s*sourceMappingURL=)([^\\s'"]+)/gi,r=null,n;for(;(n=e.exec(t))!==null;)r=n;return(i=(o=r==null?void 0:r[1])==null?void 0:o.trim())!=null?i:null}function pe(t){try{let e=t.match(/data:application\\/json;(?:charset=[^;]+;)?base64,(.+)/i),r=e==null?void 0:e[1];if(r===void 0)return null;let n=atob(r);return JSON.parse(n)}catch(e){return null}}function ve(t){return typeof DOMException=="undefined"||!(t instanceof DOMException)?!1:t.name==="TimeoutError"||t.name==="AbortError"}var _e=500,me="/@fs";function U(t){if(!(t==null||typeof t!="string"||t.trim()==="")){try{t=t.trim(),t.includes("://")&&(t=new URL(t).pathname)}catch(e){return console.error("Error normalizing source file path",e),t}return t.startsWith(\`\${me}/\`)&&(t=t.slice(me.length)),t=t.replace(/^\\/([A-Za-z]:\\/)/,"$1"),t}}function Se(t,e){if(t==null||typeof t!="string"||t.trim()==="")return;let r=t.trim();if(r.includes("://")||r.startsWith("/"))return U(r);if(e)try{let n=new URL(r,e).toString();return U(n)}catch(n){}return U(r)}function Y(t,e,r){if(!r||r==="null")return null;let n;try{n=new URL(t,e)}catch(o){return null}return n.origin===r?n:null}function xr(t){return L(this,null,function*(){let{SourceMapConsumer:e}=yield Promise.resolve().then(()=>Ye(Ve())),r=new e(t);return Promise.resolve({originalPositionFor(n){var i;let o=r.originalPositionFor(n);return{source:o.source,line:o.line,column:o.column,name:(i=o.name)!=null?i:null}}})})}var Nr=1e3,H=class{constructor(e={}){A(this,"consumerCache",new Map);A(this,"frameCache",new Map);A(this,"loading",new Map);A(this,"fetchImpl");A(this,"createConsumer");A(this,"pageOrigin",null);A(this,"frameCacheMax");var r,n;this.fetchImpl=(r=e.fetch)!=null?r:globalThis.fetch.bind(globalThis),this.createConsumer=(n=e.createConsumer)!=null?n:xr,this.frameCacheMax=typeof e.frameCacheMax=="number"&&e.frameCacheMax>0?e.frameCacheMax:Nr,this.pageOrigin=globalThis.origin&&globalThis.origin!=="null"?globalThis.origin:null}mapFrame(e,r){return L(this,null,function*(){var h,d,m,g;let n=\`\${e.fileName}:\${e.lineNumber}:\${e.columnNumber}\`,o=this.getCachedFrame(n);if(o)return o;let i=typeof r=="number"&&r>0?r:_e,{hasMap:s,timedOut:l}=yield this.loadUrl(e.fileName,i),u=p=>({filePath:p,line:e.lineNumber,column:e.columnNumber,componentName:e.functionName,type:I.RUNTIME}),a;if(!s)a=u(U(e.fileName));else{let p=this.consumerCache.get(e.fileName),W=(h=p==null?void 0:p.consumer)!=null?h:null,S=W?W.originalPositionFor({line:e.lineNumber,column:e.columnNumber}):null;!S||!S.source?a=u(e.fileName):a={filePath:Se(S.source,e.fileName),line:(d=S.line)!=null?d:e.lineNumber,column:(m=S.column)!=null?m:e.columnNumber,componentName:(g=S.name)!=null?g:e.functionName,type:I.SOURCE_MAP}}return l===!0&&!s||this.setCachedFrame(n,a),a})}getCachedFrame(e){let r=this.frameCache.get(e);if(r!==void 0)return this.frameCache.delete(e),this.frameCache.set(e,r),r}setCachedFrame(e,r){if(this.frameCache.delete(e),this.frameCache.size>=this.frameCacheMax){let n=this.frameCache.keys().next().value;n!==void 0&&this.frameCache.delete(n)}this.frameCache.set(e,r)}destroy(){this.consumerCache.clear(),this.frameCache.clear(),this.loading.clear()}setPageOrigin(e){this.pageOrigin=e}loadUrl(e,r){return L(this,null,function*(){let n=this.consumerCache.get(e);if(n!==void 0)return{hasMap:n.consumer!==null};let o=this.loading.get(e);if(o!==void 0)return o;let i=this.loadInternal(e,r);this.loading.set(e,i);try{return yield i}finally{this.loading.delete(e)}})}loadInternal(e,r){return L(this,null,function*(){let n;try{n=yield this.fetchAndBuildConsumer(e,r)}catch(o){if(ve(o))return{hasMap:!1,timedOut:!0};console.error("Error loading source map",o),n=null}return this.consumerCache.set(e,{consumer:n}),{hasMap:n!==null}})}fetchAndBuildConsumer(e,r){return L(this,null,function*(){var a;let n=Y(e,(a=this.pageOrigin)!=null?a:"",this.pageOrigin);if(!n)return null;let o=AbortSignal.timeout(r),i=yield this.fetchImpl(n,{signal:o});if(!i.ok)return null;let s=yield i.text(),l=ge(s);if(!l)return null;let u;if(l.startsWith("data:")){let c=pe(l);if(!c)return null;u=c}else{let c=Y(l,n,this.pageOrigin);if(!c)return null;let h=yield this.fetchImpl(c,{signal:o});if(!h.ok)return null;u=yield h.json()}try{return yield this.createConsumer(u)}catch(c){return console.error("Error creating consumer",c),null}})}};function Rr(t,e={}){let r=new H(e);t.onmessage=i=>{o(i.data)};function n(i){t.postMessage(i)}function o(i){return L(this,null,function*(){try{if(i.kind==="mapFrame"){let s=yield r.mapFrame(i.stackFrame,i.timeout);n({id:i.id,kind:"mapFrameResult",sourceFrame:s});return}if(i.kind==="init"){r.setPageOrigin(i.pageOrigin);return}}catch(s){n({id:i.id,kind:"error",message:s instanceof Error?s.message:String(s)})}})}return t}typeof self!="undefined"&&typeof document=="undefined"&&Rr(self);})();
//# sourceMappingURL=worker_thread_entry.iife.js.map
`
    })
  function ag() {
    let e = new Blob([pu], { type: "application/javascript" }),
      t = URL.createObjectURL(e)
    try {
      return new Worker(t, { name: "SourceMapWorker" })
    } finally {
      URL.revokeObjectURL(t)
    }
  }
  var mr,
    mu = F(() => {
      fu()
      mr = class {
        constructor(t = ag) {
          I(this, "worker")
          I(this, "nextId", 0)
          I(this, "pendingMapFrame", new Map())
          I(this, "destroyed", !1)
          ;(this.worker = t()),
            (this.worker.onmessage = (n) => {
              this.handleResponse(n.data)
            }),
            (this.worker.onerror = (n) => {
              let r = new Error(n.message || "Source map worker errored")
              for (let o of this.pendingMapFrame.values()) o.reject(r)
              this.pendingMapFrame.clear()
            }),
            this.send({
              id: this.nextId++,
              kind: "init",
              pageOrigin:
                typeof globalThis.origin == "string" ? globalThis.origin : null,
            })
        }
        mapFrame(t, n) {
          return this.destroyed
            ? Promise.reject(new Error("Source map worker destroyed"))
            : new Promise((r, o) => {
                let i = this.nextId++
                this.pendingMapFrame.set(i, { resolve: r, reject: o }),
                  this.send({
                    id: i,
                    kind: "mapFrame",
                    stackFrame: {
                      functionName: t.functionName,
                      fileName: t.fileName,
                      lineNumber: t.lineNumber,
                      columnNumber: t.columnNumber,
                    },
                    timeout: n,
                  })
              })
        }
        destroy() {
          this.destroyed = !0
          let t = new Error("Source map worker destroyed")
          for (let n of this.pendingMapFrame.values()) n.reject(t)
          this.pendingMapFrame.clear(), this.worker.terminate()
        }
        handleResponse(t) {
          if (t.kind === "mapFrameResult") {
            let n = this.pendingMapFrame.get(t.id)
            if (!n) return
            this.pendingMapFrame.delete(t.id), n.resolve(t.sourceFrame)
            return
          }
          if (t.kind === "error") {
            let n = this.pendingMapFrame.get(t.id)
            if (!n) return
            this.pendingMapFrame.delete(t.id), n.reject(new Error(t.message))
          }
        }
        send(t) {
          this.worker.postMessage(t)
        }
      }
    })
  var hu = {}
  gr(hu, {
    DEFAULT_COMPONENT_TREE_OPTIONS: () => nt,
    EDITOR_DELETED_ATTRIBUTE: () => Eo,
    ELEMENT_ID_ATTR: () => Ze,
    INFRASTRUCTURE_COMPOSITE_NAMES: () => Wn,
    RETAINED_HOST_TAGS: () => ko,
    SourceType: () => Z,
    captureElementSelectionBaseline: () => iu,
    classifyHostKind: () => ue,
    classifyShadowHost: () => zn,
    collectAllNodeIds: () => Bt,
    collectAncestorsById: () => Dt,
    componentDescriptorFromTemplateFile: () => ei,
    componentPropsHaveDescriptors: () => Un,
    computeHasExternalOwner: () => Bn,
    computeIsOwnerSeenInDomAncestors: () => jn,
    createDefaultInstanceIdAssigner: () => rt,
    createDevtools: () => sg,
    createDevtoolsCore: () => ai,
    deriveComponentPropsVisibility: () => Bo,
    deriveEffectiveSelectedIds: () => $n,
    deriveOwnerFields: () => Dn,
    deriveSelectedComponentTreeNode: () => Mo,
    deriveSelectedComponentTreeNodeFromEffectiveId: () => Mt,
    detectFramework: () => lt,
    extractElementSelectionData: () => su,
    extractElementSelectionDataFromBaseline: () => au,
    figmaCodeConnect: () => lr,
    filterComponentPropsForPanel: () => Do,
    filterComponentTree: () => Lt,
    findComponentTreeNodeById: () => Pt,
    findComponentTreeNodePathByDomTargetId: () => Io,
    findMatchingElements: () => Kn,
    formatElementSelection: () => fr,
    formatElementSelections: () => cu,
    generateComponentTree: () => It,
    isInfrastructureCompositeName: () => jt,
    isLibrary: () => Ee,
    parseComponentTreeFilter: () => _o,
    parseStack: () => He,
    pickInnermostCompositeFrame: () => xo,
    resolveComponentTreeNodeToDomTargetId: () => No,
    resolveElementTargetFromSourceMap: () => Ot,
  })
  function sg(e = {}) {
    var t
    return ai(
      L(k({}, e), {
        sourceMapEngine: (t = e.sourceMapEngine) != null ? t : new mr(),
      }),
    )
  }
  var gu = F(() => {
    si()
    mu()
    si()
    ur()
    ne()
    ur()
  })
  me()
  var vf = [
    "figma.com",
    "www.figma.com",
    "api.figma.com",
    "mcp.figma.com",
    "local.figma.engineering",
    "mcp.local.figma.engineering",
    "figdev.systems",
    "localhost",
  ]
  function kf(e) {
    try {
      let n = new URL(e).hostname
      return vf.some((r) => n === r || n.endsWith(`.${r}`))
    } catch (t) {
      return !1
    }
  }
  function xf() {
    let e = window.location.hash
    if (!e.startsWith("#figmacapture")) return { shouldCapture: !1 }
    let n = e.slice(1).split("&"),
      r,
      o,
      i,
      a,
      u,
      l,
      s
    for (let c of n) {
      let [d, p] = c.split("=")
      if (d === "figmacapture" && p) r = decodeURIComponent(p)
      else if (d === "figmaendpoint" && p) o = decodeURIComponent(p)
      else if (d === "figmadelay" && p) {
        let f = parseInt(decodeURIComponent(p), 10)
        !isNaN(f) && f >= 0 && (i = f)
      } else
        d === "figmaselector" && p
          ? (a = decodeURIComponent(p))
          : d === "figmalogpayload"
            ? (u = p !== "false")
            : d === "figmalogverbose"
              ? (l = p !== "false")
              : d === "figmasource" && (s = p !== "false")
    }
    return {
      shouldCapture: !0,
      captureId: r,
      endpoint: o,
      delay: i,
      selector: a,
      logPayload: u,
      logVerbose: l,
      extractSourceData: s,
    }
  }
  var Tf = 3e4,
    Ff = 100
  function Af(e, t = Tf) {
    return new Promise((n) => {
      if (document.querySelector(e)) {
        n(!0)
        return
      }
      let r = Date.now(),
        o = setInterval(() => {
          document.querySelector(e)
            ? (clearInterval(o), n(!0))
            : Date.now() - r >= t && (clearInterval(o), n(!1))
        }, Ff)
    })
  }
  function Xa({
    startMultiCaptureAutomaticFlow: e,
    startClipboardFlow: t,
    startMultiCaptureSelectionFlow: n,
  }) {
    let r = xf()
    if (!r.shouldCapture) return
    if (r.endpoint && !kf(r.endpoint)) {
      console.error(
        "[Figma Capture] Invalid endpoint: must be a Figma domain (figma.com, api.figma.com, etc.)",
      )
      return
    }
    if (r.endpoint && !r.captureId) {
      console.error(
        "[Figma Capture] captureId is required when endpoint is provided",
      )
      return
    }
    let { captureId: o, endpoint: i } = r
    if (r.selector === "*") {
      if (o && i) {
        let u = () => {
          n(o, i, r.logVerbose, r.extractSourceData)
        }
        document.readyState === "loading"
          ? document.addEventListener("DOMContentLoaded", u)
          : u()
      }
      return
    }
    ;(() =>
      x(this, null, function* () {
        var l
        if (r.selector && !(yield Af(r.selector))) {
          console.error(
            `[Figma Capture] Timeout waiting for selector: ${r.selector}`,
          )
          return
        }
        let u = (l = r.delay) != null ? l : 0
        i
          ? o && i && e(o, i, r.selector, u, r.logVerbose, r.extractSourceData)
          : t(r.selector, u, r.logVerbose, r.extractSourceData)
      }))()
  }
  var ae = class extends Error {
    constructor(n, r) {
      super(n)
      I(this, "translationKey")
      ;(this.translationKey = r), (this.name = "CaptureError")
    }
  }
  var vn = {
    en: {
      capturing: "Sending to Figma...",
      capturingForClipboard: "Capturing page for clipboard",
      clipboardSuccess: "Copied to clipboard",
      openInFigma: "Open file",
      error: "Capture failed",
      selectElement: "Select element",
      selectElementToCapture: "Select an element to capture",
      cancel: "Cancel",
      captureSubmitted: "Sent to Figma",
      sendToFigma: "Send to Figma",
      capturePage: "Entire screen",
      openFile: "Open file",
      errorCaptureExpired: "Capture expired. Please start a new capture.",
      errorCaptureNotFound: "Capture not found. Please start a new capture.",
      errorAccessDenied: "Access denied. Please try again.",
      errorCaptureAlreadySubmitted:
        "Capture already submitted. Please start a new capture.",
      errorTimeout: "Request timed out. Please try again.",
      errorPageNotResponding:
        "Capture timed out. Try keeping this tab in the foreground.",
      copyToClipboard: "Copy to clipboard",
      copyInstead: "Copy instead",
      sendToFigmaFailed: "Couldn't send to Figma",
    },
    ja: {
      capturing: "Figma\u306B\u9001\u4FE1\u4E2D...",
      capturingForClipboard:
        "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u7528\u306B\u30DA\u30FC\u30B8\u3092\u30AD\u30E3\u30D7\u30C1\u30E3\u4E2D",
      clipboardSuccess:
        "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
      openInFigma: "\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u304F",
      error:
        "\u30AD\u30E3\u30D7\u30C1\u30E3\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      selectElement: "\u8981\u7D20\u3092\u9078\u629E",
      selectElementToCapture:
        "\u30AD\u30E3\u30D7\u30C1\u30E3\u3059\u308B\u8981\u7D20\u3092\u9078\u629E",
      cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
      captureSubmitted: "Figma\u306B\u9001\u4FE1\u3057\u307E\u3057\u305F",
      sendToFigma: "Figma\u306B\u9001\u4FE1",
      capturePage: "\u753B\u9762\u5168\u4F53",
      openFile: "\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u304F",
      errorCaptureExpired:
        "\u30AD\u30E3\u30D7\u30C1\u30E3\u306E\u6709\u52B9\u671F\u9650\u304C\u5207\u308C\u307E\u3057\u305F\u3002\u65B0\u3057\u3044\u30AD\u30E3\u30D7\u30C1\u30E3\u3092\u958B\u59CB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      errorCaptureNotFound:
        "\u30AD\u30E3\u30D7\u30C1\u30E3\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u65B0\u3057\u3044\u30AD\u30E3\u30D7\u30C1\u30E3\u3092\u958B\u59CB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      errorAccessDenied:
        "\u30A2\u30AF\u30BB\u30B9\u304C\u62D2\u5426\u3055\u308C\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
      errorCaptureAlreadySubmitted:
        "\u30AD\u30E3\u30D7\u30C1\u30E3\u306F\u65E2\u306B\u9001\u4FE1\u6E08\u307F\u3067\u3059\u3002\u65B0\u3057\u3044\u30AD\u30E3\u30D7\u30C1\u30E3\u3092\u958B\u59CB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      errorTimeout:
        "\u30EA\u30AF\u30A8\u30B9\u30C8\u304C\u30BF\u30A4\u30E0\u30A2\u30A6\u30C8\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
      errorPageNotResponding:
        "\u30AD\u30E3\u30D7\u30C1\u30E3\u304C\u30BF\u30A4\u30E0\u30A2\u30A6\u30C8\u3057\u307E\u3057\u305F\u3002\u3053\u306E\u30BF\u30D6\u3092\u524D\u9762\u306B\u8868\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      copyToClipboard:
        "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC",
      copyInstead: "\u4EE3\u308F\u308A\u306B\u30B3\u30D4\u30FC",
      sendToFigmaFailed:
        "Figma\u306B\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
    },
    ko: {
      capturing: "Figma\uB85C \uC804\uC1A1 \uC911...",
      capturingForClipboard:
        "\uD074\uB9BD\uBCF4\uB4DC\uC6A9 \uD398\uC774\uC9C0 \uCEA1\uCC98 \uC911",
      clipboardSuccess: "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB428",
      openInFigma: "\uD30C\uC77C \uC5F4\uAE30",
      error: "\uCEA1\uCC98 \uC2E4\uD328",
      selectElement: "\uC694\uC18C \uC120\uD0DD",
      selectElementToCapture: "\uCEA1\uCC98\uD560 \uC694\uC18C \uC120\uD0DD",
      cancel: "\uCDE8\uC18C",
      captureSubmitted: "Figma\uB85C \uC804\uC1A1\uB428",
      sendToFigma: "Figma\uB85C \uC804\uC1A1",
      capturePage: "\uC804\uCCB4 \uD654\uBA74",
      openFile: "\uD30C\uC77C \uC5F4\uAE30",
      errorCaptureExpired:
        "\uCEA1\uCC98\uAC00 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC0C8 \uCEA1\uCC98\uB97C \uC2DC\uC791\uD558\uC138\uC694.",
      errorCaptureNotFound:
        "\uCEA1\uCC98\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC0C8 \uCEA1\uCC98\uB97C \uC2DC\uC791\uD558\uC138\uC694.",
      errorAccessDenied:
        "\uC811\uADFC\uC774 \uAC70\uBD80\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
      errorCaptureAlreadySubmitted:
        "\uCEA1\uCC98\uAC00 \uC774\uBBF8 \uC81C\uCD9C\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC0C8 \uCEA1\uCC98\uB97C \uC2DC\uC791\uD558\uC138\uC694.",
      errorTimeout:
        "\uC694\uCCAD \uC2DC\uAC04\uC774 \uCD08\uACFC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
      errorPageNotResponding:
        "\uCEA1\uCC98 \uC2DC\uAC04\uC774 \uCD08\uACFC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC774 \uD0ED\uC744 \uC804\uBA74\uC5D0 \uC720\uC9C0\uD558\uC138\uC694.",
      copyToClipboard: "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC",
      copyInstead: "\uB300\uC2E0 \uBCF5\uC0AC",
      sendToFigmaFailed:
        "Figma\uB85C \uC804\uC1A1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
    },
    es: {
      capturing: "Enviando a Figma...",
      capturingForClipboard: "Capturando p\xE1gina para portapapeles",
      clipboardSuccess: "Copiado al portapapeles",
      openInFigma: "Abrir archivo",
      error: "Error en la captura",
      selectElement: "Seleccionar elemento",
      selectElementToCapture: "Seleccionar un elemento para capturar",
      cancel: "Cancelar",
      captureSubmitted: "Enviado a Figma",
      sendToFigma: "Enviar a Figma",
      capturePage: "Pantalla completa",
      openFile: "Abrir archivo",
      errorCaptureExpired:
        "La captura ha caducado. Por favor, inicie una nueva captura.",
      errorCaptureNotFound:
        "Captura no encontrada. Por favor, inicie una nueva captura.",
      errorAccessDenied: "Acceso denegado. Por favor, int\xE9ntelo de nuevo.",
      errorCaptureAlreadySubmitted:
        "La captura ya ha sido enviada. Por favor, inicie una nueva captura.",
      errorTimeout:
        "La solicitud ha caducado. Por favor, int\xE9ntelo de nuevo.",
      errorPageNotResponding:
        "La captura ha caducado. Intente mantener esta pesta\xF1a en primer plano.",
      copyToClipboard: "Copiar al portapapeles",
      copyInstead: "Copiar en su lugar",
      sendToFigmaFailed: "No se pudo enviar a Figma",
    },
    pt: {
      capturing: "Enviando para o Figma...",
      capturingForClipboard:
        "Capturando p\xE1gina para \xE1rea de transfer\xEAncia",
      clipboardSuccess: "Copiado para a \xE1rea de transfer\xEAncia",
      openInFigma: "Abrir arquivo",
      error: "Falha na captura",
      selectElement: "Selecionar elemento",
      selectElementToCapture: "Selecione um elemento para capturar",
      cancel: "Cancelar",
      captureSubmitted: "Enviado para o Figma",
      sendToFigma: "Enviar para o Figma",
      capturePage: "Tela inteira",
      openFile: "Abrir arquivo",
      errorCaptureExpired:
        "Captura expirada. Por favor, inicie uma nova captura.",
      errorCaptureNotFound:
        "Captura n\xE3o encontrada. Por favor, inicie uma nova captura.",
      errorAccessDenied: "Acesso negado. Por favor, tente novamente.",
      errorCaptureAlreadySubmitted:
        "Captura j\xE1 enviada. Por favor, inicie uma nova captura.",
      errorTimeout: "A solicita\xE7\xE3o expirou. Por favor, tente novamente.",
      errorPageNotResponding:
        "A captura expirou. Tente manter esta aba em primeiro plano.",
      copyToClipboard: "Copiar para a \xE1rea de transfer\xEAncia",
      copyInstead: "Copiar em vez disso",
      sendToFigmaFailed: "N\xE3o foi poss\xEDvel enviar para o Figma",
    },
    fr: {
      capturing: "Envoi vers Figma...",
      capturingForClipboard: "Capture de la page pour le presse-papiers",
      clipboardSuccess: "Copi\xE9 dans le presse-papiers",
      openInFigma: "Ouvrir le fichier",
      error: "\xC9chec de la capture",
      selectElement: "S\xE9lectionner \xE9l\xE9ment",
      selectElementToCapture: "S\xE9lectionnez un \xE9l\xE9ment \xE0 capturer",
      cancel: "Annuler",
      captureSubmitted: "Envoy\xE9 vers Figma",
      sendToFigma: "Envoyer \xE0 Figma",
      capturePage: "\xC9cran entier",
      openFile: "Ouvrir le fichier",
      errorCaptureExpired:
        "Capture expir\xE9e. Veuillez d\xE9marrer une nouvelle capture.",
      errorCaptureNotFound:
        "Capture introuvable. Veuillez d\xE9marrer une nouvelle capture.",
      errorAccessDenied: "Acc\xE8s refus\xE9. Veuillez r\xE9essayer.",
      errorCaptureAlreadySubmitted:
        "Capture d\xE9j\xE0 soumise. Veuillez d\xE9marrer une nouvelle capture.",
      errorTimeout: "La requ\xEAte a expir\xE9. Veuillez r\xE9essayer.",
      errorPageNotResponding:
        "La capture a expir\xE9. Essayez de garder cet onglet au premier plan.",
      copyToClipboard: "Copier dans le presse-papiers",
      copyInstead: "Copier \xE0 la place",
      sendToFigmaFailed: "Impossible d'envoyer vers Figma",
    },
    de: {
      capturing: "Wird an Figma gesendet...",
      capturingForClipboard: "Seite wird f\xFCr Zwischenablage erfasst",
      clipboardSuccess: "In Zwischenablage kopiert",
      openInFigma: "Datei \xF6ffnen",
      error: "Erfassung fehlgeschlagen",
      selectElement: "Element ausw\xE4hlen",
      selectElementToCapture: "Element zum Erfassen ausw\xE4hlen",
      cancel: "Abbrechen",
      captureSubmitted: "An Figma gesendet",
      sendToFigma: "An Figma senden",
      capturePage: "Gesamter Bildschirm",
      openFile: "Datei \xF6ffnen",
      errorCaptureExpired:
        "Erfassung abgelaufen. Bitte starten Sie eine neue Erfassung.",
      errorCaptureNotFound:
        "Erfassung nicht gefunden. Bitte starten Sie eine neue Erfassung.",
      errorAccessDenied: "Zugriff verweigert. Bitte versuchen Sie es erneut.",
      errorCaptureAlreadySubmitted:
        "Erfassung bereits gesendet. Bitte starten Sie eine neue Erfassung.",
      errorTimeout: "Anfrage abgelaufen. Bitte versuchen Sie es erneut.",
      errorPageNotResponding:
        "Erfassung abgelaufen. Versuchen Sie, diesen Tab im Vordergrund zu halten.",
      copyToClipboard: "In Zwischenablage kopieren",
      copyInstead: "Stattdessen kopieren",
      sendToFigmaFailed: "Konnte nicht an Figma gesendet werden",
    },
    nl: {
      capturing: "Verzenden naar Figma...",
      capturingForClipboard: "Pagina vastleggen voor klembord",
      clipboardSuccess: "Gekopieerd naar klembord",
      openInFigma: "Bestand openen",
      error: "Vastleggen mislukt",
      selectElement: "Element selecteren",
      selectElementToCapture: "Selecteer een element om vast te leggen",
      cancel: "Annuleren",
      captureSubmitted: "Verzonden naar Figma",
      sendToFigma: "Verzenden naar Figma",
      capturePage: "Volledig scherm",
      openFile: "Bestand openen",
      errorCaptureExpired:
        "Vastlegging verlopen. Start een nieuwe vastlegging.",
      errorCaptureNotFound:
        "Vastlegging niet gevonden. Start een nieuwe vastlegging.",
      errorAccessDenied: "Toegang geweigerd. Probeer het opnieuw.",
      errorCaptureAlreadySubmitted:
        "Vastlegging al ingediend. Start een nieuwe vastlegging.",
      errorTimeout: "Verzoek verlopen. Probeer het opnieuw.",
      errorPageNotResponding:
        "Vastlegging verlopen. Probeer dit tabblad op de voorgrond te houden.",
      copyToClipboard: "Kopi\xEBren naar klembord",
      copyInstead: "In plaats hiervan kopi\xEBren",
      sendToFigmaFailed: "Kan niet naar Figma verzenden",
    },
    pl: {
      capturing: "Wysy\u0142anie do Figma...",
      capturingForClipboard: "Przechwytywanie strony do schowka",
      clipboardSuccess: "Skopiowano do schowka",
      openInFigma: "Otw\xF3rz plik",
      error: "Przechwytywanie nie powiod\u0142o si\u0119",
      selectElement: "Wybierz element",
      selectElementToCapture: "Wybierz element do przechwycenia",
      cancel: "Anuluj",
      captureSubmitted: "Wys\u0142ano do Figma",
      sendToFigma: "Wy\u015Blij do Figma",
      capturePage: "Ca\u0142y ekran",
      openFile: "Otw\xF3rz plik",
      errorCaptureExpired:
        "Przechwytywanie wygas\u0142o. Rozpocznij nowe przechwytywanie.",
      errorCaptureNotFound:
        "Nie znaleziono przechwytywania. Rozpocznij nowe przechwytywanie.",
      errorAccessDenied: "Odmowa dost\u0119pu. Spr\xF3buj ponownie.",
      errorCaptureAlreadySubmitted:
        "Przechwytywanie ju\u017C przes\u0142ane. Rozpocznij nowe przechwytywanie.",
      errorTimeout: "\u017B\u0105danie wygas\u0142o. Spr\xF3buj ponownie.",
      errorPageNotResponding:
        "Przechwytywanie wygas\u0142o. Spr\xF3buj utrzyma\u0107 t\u0119 kart\u0119 na pierwszym planie.",
      copyToClipboard: "Kopiuj do schowka",
      copyInstead: "Skopiuj zamiast tego",
      sendToFigmaFailed: "Nie uda\u0142o si\u0119 wys\u0142a\u0107 do Figma",
    },
    it: {
      capturing: "Invio a Figma...",
      capturingForClipboard: "Acquisizione della pagina per appunti",
      clipboardSuccess: "Copiato negli appunti",
      openInFigma: "Apri file",
      error: "Acquisizione non riuscita",
      selectElement: "Seleziona elemento",
      selectElementToCapture: "Seleziona un elemento da acquisire",
      cancel: "Annulla",
      captureSubmitted: "Inviato a Figma",
      sendToFigma: "Invia a Figma",
      capturePage: "Schermo intero",
      openFile: "Apri file",
      errorCaptureExpired:
        "Acquisizione scaduta. Avviare una nuova acquisizione.",
      errorCaptureNotFound:
        "Acquisizione non trovata. Avviare una nuova acquisizione.",
      errorAccessDenied: "Accesso negato. Riprovare.",
      errorCaptureAlreadySubmitted:
        "Acquisizione gi\xE0 inviata. Avviare una nuova acquisizione.",
      errorTimeout: "Richiesta scaduta. Riprovare.",
      errorPageNotResponding:
        "Acquisizione scaduta. Provare a mantenere questa scheda in primo piano.",
      copyToClipboard: "Copia negli appunti",
      copyInstead: "Copia invece",
      sendToFigmaFailed: "Impossibile inviare a Figma",
    },
    zh: {
      capturing: "\u6B63\u5728\u53D1\u9001\u5230 Figma...",
      capturingForClipboard:
        "\u6B63\u5728\u5C06\u9875\u9762\u6355\u83B7\u5230\u526A\u8D34\u677F",
      clipboardSuccess: "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
      openInFigma: "\u6253\u5F00\u6587\u4EF6",
      error: "\u6355\u83B7\u5931\u8D25",
      selectElement: "\u9009\u62E9\u5143\u7D20",
      selectElementToCapture:
        "\u9009\u62E9\u8981\u6355\u83B7\u7684\u5143\u7D20",
      cancel: "\u53D6\u6D88",
      captureSubmitted: "\u5DF2\u53D1\u9001\u5230 Figma",
      sendToFigma: "\u53D1\u9001\u5230 Figma",
      capturePage: "\u6574\u4E2A\u5C4F\u5E55",
      openFile: "\u6253\u5F00\u6587\u4EF6",
      errorCaptureExpired:
        "\u6355\u83B7\u5DF2\u8FC7\u671F\u3002\u8BF7\u5F00\u59CB\u65B0\u7684\u6355\u83B7\u3002",
      errorCaptureNotFound:
        "\u672A\u627E\u5230\u6355\u83B7\u3002\u8BF7\u5F00\u59CB\u65B0\u7684\u6355\u83B7\u3002",
      errorAccessDenied:
        "\u8BBF\u95EE\u88AB\u62D2\u7EDD\u3002\u8BF7\u91CD\u8BD5\u3002",
      errorCaptureAlreadySubmitted:
        "\u6355\u83B7\u5DF2\u63D0\u4EA4\u3002\u8BF7\u5F00\u59CB\u65B0\u7684\u6355\u83B7\u3002",
      errorTimeout: "\u8BF7\u6C42\u8D85\u65F6\u3002\u8BF7\u91CD\u8BD5\u3002",
      errorPageNotResponding:
        "\u6355\u83B7\u8D85\u65F6\u3002\u8BF7\u4FDD\u6301\u6B64\u6807\u7B7E\u9875\u5728\u524D\u53F0\u3002",
      copyToClipboard: "\u590D\u5236\u5230\u526A\u8D34\u677F",
      copyInstead: "\u6539\u4E3A\u590D\u5236",
      sendToFigmaFailed: "\u65E0\u6CD5\u53D1\u9001\u5230 Figma",
    },
    "zh-tw": {
      capturing: "\u6B63\u5728\u50B3\u9001\u5230 Figma...",
      capturingForClipboard:
        "\u6B63\u5728\u5C07\u9801\u9762\u64F7\u53D6\u5230\u526A\u8CBC\u7C3F",
      clipboardSuccess: "\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F",
      openInFigma: "\u958B\u555F\u6A94\u6848",
      error: "\u64F7\u53D6\u5931\u6557",
      selectElement: "\u9078\u64C7\u5143\u7D20",
      selectElementToCapture:
        "\u9078\u64C7\u8981\u64F7\u53D6\u7684\u5143\u7D20",
      cancel: "\u53D6\u6D88",
      captureSubmitted: "\u5DF2\u50B3\u9001\u5230 Figma",
      sendToFigma: "\u50B3\u9001\u5230 Figma",
      capturePage: "\u6574\u500B\u87A2\u5E55",
      openFile: "\u958B\u555F\u6A94\u6848",
      errorCaptureExpired:
        "\u64F7\u53D6\u5DF2\u904E\u671F\u3002\u8ACB\u958B\u59CB\u65B0\u7684\u64F7\u53D6\u3002",
      errorCaptureNotFound:
        "\u627E\u4E0D\u5230\u64F7\u53D6\u3002\u8ACB\u958B\u59CB\u65B0\u7684\u64F7\u53D6\u3002",
      errorAccessDenied:
        "\u5B58\u53D6\u88AB\u62D2\u7D55\u3002\u8ACB\u91CD\u8A66\u3002",
      errorCaptureAlreadySubmitted:
        "\u64F7\u53D6\u5DF2\u63D0\u4EA4\u3002\u8ACB\u958B\u59CB\u65B0\u7684\u64F7\u53D6\u3002",
      errorTimeout: "\u8ACB\u6C42\u903E\u6642\u3002\u8ACB\u91CD\u8A66\u3002",
      errorPageNotResponding:
        "\u64F7\u53D6\u903E\u6642\u3002\u8ACB\u4FDD\u6301\u6B64\u5206\u9801\u5728\u524D\u666F\u3002",
      copyToClipboard: "\u8907\u88FD\u5230\u526A\u8CBC\u7C3F",
      copyInstead: "\u6539\u70BA\u8907\u88FD",
      sendToFigmaFailed: "\u7121\u6CD5\u50B3\u9001\u5230 Figma",
    },
    ru: {
      capturing:
        "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0432 Figma...",
      capturingForClipboard:
        "\u0417\u0430\u0445\u0432\u0430\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430",
      clipboardSuccess:
        "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430",
      openInFigma:
        "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u0430\u0439\u043B",
      error:
        "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430",
      selectElement:
        "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442",
      selectElementToCapture:
        "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430",
      cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
      captureSubmitted:
        "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u0432 Figma",
      sendToFigma:
        "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 Figma",
      capturePage: "\u0412\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D",
      openFile:
        "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u0430\u0439\u043B",
      errorCaptureExpired:
        "\u0421\u0440\u043E\u043A \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u0438\u0441\u0442\u0435\u043A. \u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0437\u0430\u0445\u0432\u0430\u0442.",
      errorCaptureNotFound:
        "\u0417\u0430\u0445\u0432\u0430\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0437\u0430\u0445\u0432\u0430\u0442.",
      errorAccessDenied:
        "\u0414\u043E\u0441\u0442\u0443\u043F \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.",
      errorCaptureAlreadySubmitted:
        "\u0417\u0430\u0445\u0432\u0430\u0442 \u0443\u0436\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D. \u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0437\u0430\u0445\u0432\u0430\u0442.",
      errorTimeout:
        "\u0412\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0438\u0441\u0442\u0435\u043A\u043B\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.",
      errorPageNotResponding:
        "\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u0438\u0441\u0442\u0435\u043A\u043B\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0434\u0435\u0440\u0436\u0430\u0442\u044C \u044D\u0442\u0443 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u043D\u0430 \u043F\u0435\u0440\u0435\u0434\u043D\u0435\u043C \u043F\u043B\u0430\u043D\u0435.",
      copyToClipboard:
        "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430",
      copyInstead:
        "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
      sendToFigmaFailed:
        "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 Figma",
    },
    tr: {
      capturing: "Figma'ya g\xF6nderiliyor...",
      capturingForClipboard: "Sayfa panoya yakalan\u0131yor",
      clipboardSuccess: "Panoya kopyaland\u0131",
      openInFigma: "Dosyay\u0131 a\xE7",
      error: "Yakalama ba\u015Far\u0131s\u0131z",
      selectElement: "\xD6\u011Feyi se\xE7",
      selectElementToCapture: "Yakalanacak bir \xF6\u011Fe se\xE7in",
      cancel: "\u0130ptal",
      captureSubmitted: "Figma'ya g\xF6nderildi",
      sendToFigma: "Figma'ya g\xF6nder",
      capturePage: "T\xFCm ekran",
      openFile: "Dosyay\u0131 a\xE7",
      errorCaptureExpired:
        "Yakalama s\xFCresi doldu. L\xFCtfen yeni bir yakalama ba\u015Flat\u0131n.",
      errorCaptureNotFound:
        "Yakalama bulunamad\u0131. L\xFCtfen yeni bir yakalama ba\u015Flat\u0131n.",
      errorAccessDenied: "Eri\u015Fim reddedildi. L\xFCtfen tekrar deneyin.",
      errorCaptureAlreadySubmitted:
        "Yakalama zaten g\xF6nderildi. L\xFCtfen yeni bir yakalama ba\u015Flat\u0131n.",
      errorTimeout:
        "\u0130stek zaman a\u015F\u0131m\u0131na u\u011Frad\u0131. L\xFCtfen tekrar deneyin.",
      errorPageNotResponding:
        "Yakalama zaman a\u015F\u0131m\u0131na u\u011Frad\u0131. Bu sekmeyi \xF6n planda tutmay\u0131 deneyin.",
      copyToClipboard: "Panoya kopyala",
      copyInstead: "Bunun yerine kopyala",
      sendToFigmaFailed: "Figma'ya g\xF6nderilemedi",
    },
    ar: {
      capturing:
        "\u062C\u0627\u0631\u064D \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0625\u0644\u0649 Figma...",
      capturingForClipboard:
        "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u062D\u0627\u0641\u0638\u0629",
      clipboardSuccess:
        "\u062A\u0645 \u0627\u0644\u0646\u0633\u062E \u0625\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0638\u0629",
      openInFigma: "\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0641",
      error:
        "\u0641\u0634\u0644 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637",
      selectElement:
        "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0639\u0646\u0635\u0631",
      selectElementToCapture:
        "\u062D\u062F\u062F \u0639\u0646\u0635\u0631\u064B\u0627 \u0644\u0644\u0627\u0644\u062A\u0642\u0627\u0637",
      cancel: "\u0625\u0644\u063A\u0627\u0621",
      captureSubmitted:
        "\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0625\u0644\u0649 Figma",
      sendToFigma: "\u0625\u0631\u0633\u0627\u0644 \u0625\u0644\u0649 Figma",
      capturePage:
        "\u0627\u0644\u0634\u0627\u0634\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644",
      openFile: "\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0641",
      errorCaptureExpired:
        "\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637. \u064A\u0631\u062C\u0649 \u0628\u062F\u0621 \u0627\u0644\u062A\u0642\u0627\u0637 \u062C\u062F\u064A\u062F.",
      errorCaptureNotFound:
        "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637. \u064A\u0631\u062C\u0649 \u0628\u062F\u0621 \u0627\u0644\u062A\u0642\u0627\u0637 \u062C\u062F\u064A\u062F.",
      errorAccessDenied:
        "\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0648\u0635\u0648\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
      errorCaptureAlreadySubmitted:
        "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637 \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0628\u062F\u0621 \u0627\u0644\u062A\u0642\u0627\u0637 \u062C\u062F\u064A\u062F.",
      errorTimeout:
        "\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0637\u0644\u0628. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
      errorPageNotResponding:
        "\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637. \u062D\u0627\u0648\u0644 \u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0647\u0630\u0647 \u0641\u064A \u0627\u0644\u0645\u0642\u062F\u0645\u0629.",
      copyToClipboard:
        "\u0646\u0633\u062E \u0625\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0638\u0629",
      copyInstead:
        "\u0646\u0633\u062E \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643",
      sendToFigmaFailed:
        "\u062A\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0625\u0644\u0649 Figma",
    },
    he: {
      capturing: "\u05E9\u05D5\u05DC\u05D7 \u05DC-Figma...",
      capturingForClipboard:
        "\u05DC\u05D5\u05DB\u05D3 \u05D0\u05EA \u05D4\u05D3\u05E3 \u05DC\u05DC\u05D5\u05D7",
      clipboardSuccess:
        "\u05D4\u05D5\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7",
      openInFigma: "\u05E4\u05EA\u05D7 \u05E7\u05D5\u05D1\u05E5",
      error:
        "\u05D4\u05DC\u05DB\u05D9\u05D3\u05D4 \u05E0\u05DB\u05E9\u05DC\u05D4",
      selectElement: "\u05D1\u05D7\u05E8 \u05D0\u05DC\u05DE\u05E0\u05D8",
      selectElementToCapture:
        "\u05D1\u05D7\u05E8 \u05D0\u05DC\u05DE\u05E0\u05D8 \u05DC\u05DC\u05DB\u05D9\u05D3\u05D4",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      captureSubmitted: "\u05E0\u05E9\u05DC\u05D7 \u05DC-Figma",
      sendToFigma: "\u05E9\u05DC\u05D7 \u05DC-Figma",
      capturePage: "\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0",
      openFile: "\u05E4\u05EA\u05D7 \u05E7\u05D5\u05D1\u05E5",
      errorCaptureExpired:
        "\u05D4\u05DC\u05DB\u05D9\u05D3\u05D4 \u05E4\u05D2\u05D4. \u05D0\u05E0\u05D0 \u05D4\u05EA\u05D7\u05DC \u05DC\u05DB\u05D9\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4.",
      errorCaptureNotFound:
        "\u05D4\u05DC\u05DB\u05D9\u05D3\u05D4 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4. \u05D0\u05E0\u05D0 \u05D4\u05EA\u05D7\u05DC \u05DC\u05DB\u05D9\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4.",
      errorAccessDenied:
        "\u05D4\u05D2\u05D9\u05E9\u05D4 \u05E0\u05D3\u05D7\u05EA\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.",
      errorCaptureAlreadySubmitted:
        "\u05D4\u05DC\u05DB\u05D9\u05D3\u05D4 \u05DB\u05D1\u05E8 \u05E0\u05E9\u05DC\u05D7\u05D4. \u05D0\u05E0\u05D0 \u05D4\u05EA\u05D7\u05DC \u05DC\u05DB\u05D9\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4.",
      errorTimeout:
        "\u05D4\u05D1\u05E7\u05E9\u05D4 \u05E4\u05D2\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.",
      errorPageNotResponding:
        "\u05D4\u05DC\u05DB\u05D9\u05D3\u05D4 \u05E4\u05D2\u05D4. \u05E0\u05E1\u05D4 \u05DC\u05E9\u05DE\u05D5\u05E8 \u05E2\u05DC \u05DC\u05E9\u05D5\u05E0\u05D9\u05EA \u05D6\u05D5 \u05D1\u05D7\u05D6\u05D9\u05EA.",
      copyToClipboard: "\u05D4\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7",
      copyInstead:
        "\u05D4\u05E2\u05EA\u05E7 \u05D1\u05DE\u05E7\u05D5\u05DD \u05D6\u05D0\u05EA",
      sendToFigmaFailed:
        "\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05E9\u05DC\u05D5\u05D7 \u05DC-Figma",
    },
    th: {
      capturing:
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E44\u0E1B\u0E22\u0E31\u0E07 Figma...",
      capturingForClipboard:
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E2B\u0E19\u0E49\u0E32\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E04\u0E25\u0E34\u0E1B\u0E1A\u0E2D\u0E23\u0E4C\u0E14",
      clipboardSuccess:
        "\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E04\u0E25\u0E34\u0E1B\u0E1A\u0E2D\u0E23\u0E4C\u0E14\u0E41\u0E25\u0E49\u0E27",
      openInFigma: "\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E1F\u0E25\u0E4C",
      error:
        "\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
      selectElement:
        "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2D\u0E07\u0E04\u0E4C\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A",
      selectElementToCapture:
        "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2D\u0E07\u0E04\u0E4C\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E17\u0E35\u0E48\u0E08\u0E30\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E",
      cancel: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
      captureSubmitted:
        "\u0E2A\u0E48\u0E07\u0E44\u0E1B\u0E22\u0E31\u0E07 Figma \u0E41\u0E25\u0E49\u0E27",
      sendToFigma: "\u0E2A\u0E48\u0E07\u0E44\u0E1B\u0E22\u0E31\u0E07 Figma",
      capturePage:
        "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E2D",
      openFile: "\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E1F\u0E25\u0E4C",
      errorCaptureExpired:
        "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E43\u0E2B\u0E21\u0E48",
      errorCaptureNotFound:
        "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E43\u0E2B\u0E21\u0E48",
      errorAccessDenied:
        "\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",
      errorCaptureAlreadySubmitted:
        "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E16\u0E39\u0E01\u0E2A\u0E48\u0E07\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E43\u0E2B\u0E21\u0E48",
      errorTimeout:
        "\u0E04\u0E33\u0E02\u0E2D\u0E2B\u0E21\u0E14\u0E40\u0E27\u0E25\u0E32 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",
      errorPageNotResponding:
        "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E20\u0E32\u0E1E\u0E2B\u0E21\u0E14\u0E40\u0E27\u0E25\u0E32 \u0E25\u0E2D\u0E07\u0E40\u0E1B\u0E34\u0E14\u0E41\u0E17\u0E47\u0E1A\u0E19\u0E35\u0E49\u0E44\u0E27\u0E49\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E19\u0E49\u0E32",
      copyToClipboard:
        "\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E04\u0E25\u0E34\u0E1B\u0E1A\u0E2D\u0E23\u0E4C\u0E14",
      copyInstead: "\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E17\u0E19",
      sendToFigmaFailed:
        "\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E2A\u0E48\u0E07\u0E44\u0E1B\u0E22\u0E31\u0E07 Figma \u0E44\u0E14\u0E49",
    },
    vi: {
      capturing: "\u0110ang g\u1EEDi \u0111\u1EBFn Figma...",
      capturingForClipboard:
        "\u0110ang ch\u1EE5p trang v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m",
      clipboardSuccess:
        "\u0110\xE3 sao ch\xE9p v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m",
      openInFigma: "M\u1EDF t\u1EC7p",
      error: "Ch\u1EE5p th\u1EA5t b\u1EA1i",
      selectElement: "Ch\u1ECDn ph\u1EA7n t\u1EED",
      selectElementToCapture:
        "Ch\u1ECDn m\u1ED9t ph\u1EA7n t\u1EED \u0111\u1EC3 ch\u1EE5p",
      cancel: "H\u1EE7y",
      captureSubmitted: "\u0110\xE3 g\u1EEDi \u0111\u1EBFn Figma",
      sendToFigma: "G\u1EEDi \u0111\u1EBFn Figma",
      capturePage: "To\xE0n m\xE0n h\xECnh",
      openFile: "M\u1EDF t\u1EC7p",
      errorCaptureExpired:
        "\u1EA2nh ch\u1EE5p \u0111\xE3 h\u1EBFt h\u1EA1n. Vui l\xF2ng b\u1EAFt \u0111\u1EA7u \u1EA3nh ch\u1EE5p m\u1EDBi.",
      errorCaptureNotFound:
        "Kh\xF4ng t\xECm th\u1EA5y \u1EA3nh ch\u1EE5p. Vui l\xF2ng b\u1EAFt \u0111\u1EA7u \u1EA3nh ch\u1EE5p m\u1EDBi.",
      errorAccessDenied:
        "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i. Vui l\xF2ng th\u1EED l\u1EA1i.",
      errorCaptureAlreadySubmitted:
        "\u1EA2nh ch\u1EE5p \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi. Vui l\xF2ng b\u1EAFt \u0111\u1EA7u \u1EA3nh ch\u1EE5p m\u1EDBi.",
      errorTimeout:
        "Y\xEAu c\u1EA7u \u0111\xE3 h\u1EBFt th\u1EDDi gian. Vui l\xF2ng th\u1EED l\u1EA1i.",
      errorPageNotResponding:
        "Ch\u1EE5p \u0111\xE3 h\u1EBFt th\u1EDDi gian. H\xE3y gi\u1EEF tab n\xE0y \u1EDF ph\xEDa tr\u01B0\u1EDBc.",
      copyToClipboard: "Sao ch\xE9p v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m",
      copyInstead: "Sao ch\xE9p thay th\u1EBF",
      sendToFigmaFailed: "Kh\xF4ng th\u1EC3 g\u1EEDi \u0111\u1EBFn Figma",
    },
    id: {
      capturing: "Mengirim ke Figma...",
      capturingForClipboard: "Mengambil halaman ke papan klip",
      clipboardSuccess: "Disalin ke papan klip",
      openInFigma: "Buka file",
      error: "Pengambilan gagal",
      selectElement: "Pilih elemen",
      selectElementToCapture: "Pilih elemen untuk ditangkap",
      cancel: "Batal",
      captureSubmitted: "Terkirim ke Figma",
      sendToFigma: "Kirim ke Figma",
      capturePage: "Seluruh layar",
      openFile: "Buka file",
      errorCaptureExpired:
        "Tangkapan kedaluwarsa. Silakan mulai tangkapan baru.",
      errorCaptureNotFound:
        "Tangkapan tidak ditemukan. Silakan mulai tangkapan baru.",
      errorAccessDenied: "Akses ditolak. Silakan coba lagi.",
      errorCaptureAlreadySubmitted:
        "Tangkapan sudah dikirim. Silakan mulai tangkapan baru.",
      errorTimeout: "Permintaan kedaluwarsa. Silakan coba lagi.",
      errorPageNotResponding:
        "Tangkapan kedaluwarsa. Coba biarkan tab ini di depan.",
      copyToClipboard: "Salin ke papan klip",
      copyInstead: "Salin saja",
      sendToFigmaFailed: "Tidak dapat mengirim ke Figma",
    },
    hi: {
      capturing:
        "Figma \u092A\u0930 \u092D\u0947\u091C\u093E \u091C\u093E \u0930\u0939\u093E \u0939\u0948...",
      capturingForClipboard:
        "\u092A\u0947\u091C \u0915\u094B \u0915\u094D\u0932\u093F\u092A\u092C\u094B\u0930\u094D\u0921 \u092A\u0930 \u0915\u0948\u092A\u094D\u091A\u0930 \u0915\u093F\u092F\u093E \u091C\u093E \u0930\u0939\u093E \u0939\u0948",
      clipboardSuccess:
        "\u0915\u094D\u0932\u093F\u092A\u092C\u094B\u0930\u094D\u0921 \u092A\u0930 \u0915\u0949\u092A\u0940 \u0915\u093F\u092F\u093E \u0917\u092F\u093E",
      openInFigma:
        "\u092B\u093C\u093E\u0907\u0932 \u0916\u094B\u0932\u0947\u0902",
      error: "\u0915\u0948\u092A\u094D\u091A\u0930 \u0935\u093F\u092B\u0932",
      selectElement:
        "\u090F\u0932\u093F\u092E\u0947\u0902\u091F \u091A\u0941\u0928\u0947\u0902",
      selectElementToCapture:
        "\u0915\u0948\u092A\u094D\u091A\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u090F\u0932\u093F\u092E\u0947\u0902\u091F \u091A\u0941\u0928\u0947\u0902",
      cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
      captureSubmitted:
        "Figma \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E",
      sendToFigma: "Figma \u092A\u0930 \u092D\u0947\u091C\u0947\u0902",
      capturePage:
        "\u092A\u0942\u0930\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      openFile: "\u092B\u093C\u093E\u0907\u0932 \u0916\u094B\u0932\u0947\u0902",
      errorCaptureExpired:
        "\u0915\u0948\u092A\u094D\u091A\u0930 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B \u0917\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u0928\u092F\u093E \u0915\u0948\u092A\u094D\u091A\u0930 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902\u0964",
      errorCaptureNotFound:
        "\u0915\u0948\u092A\u094D\u091A\u0930 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u0928\u092F\u093E \u0915\u0948\u092A\u094D\u091A\u0930 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902\u0964",
      errorAccessDenied:
        "\u092A\u0939\u0941\u0902\u091A \u0905\u0938\u094D\u0935\u0940\u0915\u0943\u0924\u0964 \u0915\u0943\u092A\u092F\u093E \u092A\u0941\u0928\u0903 \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902\u0964",
      errorCaptureAlreadySubmitted:
        "\u0915\u0948\u092A\u094D\u091A\u0930 \u092A\u0939\u0932\u0947 \u0939\u0940 \u0938\u092C\u092E\u093F\u091F \u0939\u094B \u091A\u0941\u0915\u093E \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0928\u092F\u093E \u0915\u0948\u092A\u094D\u091A\u0930 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902\u0964",
      errorTimeout:
        "\u0905\u0928\u0941\u0930\u094B\u0927 \u0915\u093E \u0938\u092E\u092F \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B \u0917\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092A\u0941\u0928\u0903 \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902\u0964",
      errorPageNotResponding:
        "\u0915\u0948\u092A\u094D\u091A\u0930 \u0915\u093E \u0938\u092E\u092F \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B \u0917\u092F\u093E\u0964 \u0907\u0938 \u091F\u0948\u092C \u0915\u094B \u0905\u0917\u094D\u0930\u092D\u0942\u092E\u093F \u092E\u0947\u0902 \u0930\u0916\u0928\u0947 \u0915\u093E \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902\u0964",
      copyToClipboard:
        "\u0915\u094D\u0932\u093F\u092A\u092C\u094B\u0930\u094D\u0921 \u092A\u0930 \u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902",
      copyInstead:
        "\u0907\u0938\u0915\u0947 \u092C\u091C\u093E\u092F \u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902",
      sendToFigmaFailed:
        "Figma \u092A\u0930 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u093E \u091C\u093E \u0938\u0915\u093E",
    },
    sv: {
      capturing: "Skickar till Figma...",
      capturingForClipboard: "F\xE5ngar sidan till urklipp",
      clipboardSuccess: "Kopierat till urklipp",
      openInFigma: "\xD6ppna fil",
      error: "F\xE5ngst misslyckades",
      selectElement: "V\xE4lj element",
      selectElementToCapture: "V\xE4lj ett element att f\xE5nga",
      cancel: "Avbryt",
      captureSubmitted: "Skickat till Figma",
      sendToFigma: "Skicka till Figma",
      capturePage: "Hela sk\xE4rmen",
      openFile: "\xD6ppna fil",
      errorCaptureExpired:
        "F\xE5ngsten har g\xE5tt ut. Starta en ny f\xE5ngst.",
      errorCaptureNotFound:
        "F\xE5ngsten hittades inte. Starta en ny f\xE5ngst.",
      errorAccessDenied: "\xC5tkomst nekad. F\xF6rs\xF6k igen.",
      errorCaptureAlreadySubmitted:
        "F\xE5ngsten har redan skickats. Starta en ny f\xE5ngst.",
      errorTimeout: "Beg\xE4ran tog f\xF6r l\xE5ng tid. F\xF6rs\xF6k igen.",
      errorPageNotResponding:
        "F\xE5ngsten tog f\xF6r l\xE5ng tid. F\xF6rs\xF6k att h\xE5lla denna flik i f\xF6rgrunden.",
      copyToClipboard: "Kopiera till urklipp",
      copyInstead: "Kopiera ist\xE4llet",
      sendToFigmaFailed: "Kunde inte skicka till Figma",
    },
    da: {
      capturing: "Sender til Figma...",
      capturingForClipboard: "Indfanger side til udklipsholder",
      clipboardSuccess: "Kopieret til udklipsholder",
      openInFigma: "\xC5bn fil",
      error: "Indfangning mislykkedes",
      selectElement: "V\xE6lg element",
      selectElementToCapture: "V\xE6lg et element at indfange",
      cancel: "Annuller",
      captureSubmitted: "Sendt til Figma",
      sendToFigma: "Send til Figma",
      capturePage: "Hele sk\xE6rmen",
      openFile: "\xC5bn fil",
      errorCaptureExpired: "Indfangning udl\xF8bet. Start en ny indfangning.",
      errorCaptureNotFound: "Indfangning ikke fundet. Start en ny indfangning.",
      errorAccessDenied: "Adgang n\xE6gtet. Pr\xF8v igen.",
      errorCaptureAlreadySubmitted:
        "Indfangning allerede indsendt. Start en ny indfangning.",
      errorTimeout: "Anmodningen udl\xF8b. Pr\xF8v igen.",
      errorPageNotResponding:
        "Indfangningen udl\xF8b. Pr\xF8v at holde denne fane i forgrunden.",
      copyToClipboard: "Kopier til udklipsholder",
      copyInstead: "Kopi\xE9r i stedet",
      sendToFigmaFailed: "Kunne ikke sende til Figma",
    },
    no: {
      capturing: "Sender til Figma...",
      capturingForClipboard: "Fanger side til utklippstavle",
      clipboardSuccess: "Kopiert til utklippstavle",
      openInFigma: "\xC5pne fil",
      error: "Fangst mislyktes",
      selectElement: "Velg element",
      selectElementToCapture: "Velg et element \xE5 fange",
      cancel: "Avbryt",
      captureSubmitted: "Sendt til Figma",
      sendToFigma: "Send til Figma",
      capturePage: "Hele skjermen",
      openFile: "\xC5pne fil",
      errorCaptureExpired: "Fangsten har utl\xF8pt. Start en ny fangst.",
      errorCaptureNotFound: "Fangsten ble ikke funnet. Start en ny fangst.",
      errorAccessDenied: "Tilgang nektet. Pr\xF8v igjen.",
      errorCaptureAlreadySubmitted:
        "Fangsten er allerede sendt. Start en ny fangst.",
      errorTimeout: "Foresp\xF8rselen utl\xF8p. Pr\xF8v igjen.",
      errorPageNotResponding:
        "Fangsten utl\xF8p. Pr\xF8v \xE5 holde denne fanen i forgrunnen.",
      copyToClipboard: "Kopier til utklippstavle",
      copyInstead: "Kopier i stedet",
      sendToFigmaFailed: "Kunne ikke sende til Figma",
    },
    fi: {
      capturing: "L\xE4hetet\xE4\xE4n Figmaan...",
      capturingForClipboard: "Kaapataan sivua leikep\xF6yd\xE4lle",
      clipboardSuccess: "Kopioitu leikep\xF6yd\xE4lle",
      openInFigma: "Avaa tiedosto",
      error: "Kaappaus ep\xE4onnistui",
      selectElement: "Valitse elementti",
      selectElementToCapture: "Valitse elementti kaapattavaksi",
      cancel: "Peruuta",
      captureSubmitted: "L\xE4hetetty Figmaan",
      sendToFigma: "L\xE4het\xE4 Figmaan",
      capturePage: "Koko n\xE4ytt\xF6",
      openFile: "Avaa tiedosto",
      errorCaptureExpired: "Kaappaus vanhentunut. Aloita uusi kaappaus.",
      errorCaptureNotFound: "Kaappausta ei l\xF6ytynyt. Aloita uusi kaappaus.",
      errorAccessDenied: "P\xE4\xE4sy ev\xE4tty. Yrit\xE4 uudelleen.",
      errorCaptureAlreadySubmitted:
        "Kaappaus on jo l\xE4hetetty. Aloita uusi kaappaus.",
      errorTimeout: "Pyynt\xF6 aikakatkaistiin. Yrit\xE4 uudelleen.",
      errorPageNotResponding:
        "Kaappaus aikakatkaistiin. Yrit\xE4 pit\xE4\xE4 t\xE4m\xE4 v\xE4lilehti etualalla.",
      copyToClipboard: "Kopioi leikep\xF6yd\xE4lle",
      copyInstead: "Kopioi sen sijaan",
      sendToFigmaFailed: "Ei voitu l\xE4hett\xE4\xE4 Figmaan",
    },
    cs: {
      capturing: "Odes\xEDl\xE1n\xED do Figma...",
      capturingForClipboard: "Zachycen\xED str\xE1nky do schr\xE1nky",
      clipboardSuccess: "Zkop\xEDrov\xE1no do schr\xE1nky",
      openInFigma: "Otev\u0159\xEDt soubor",
      error: "Zachycen\xED selhalo",
      selectElement: "Vybrat prvek",
      selectElementToCapture: "Vyberte prvek k zachycen\xED",
      cancel: "Zru\u0161it",
      captureSubmitted: "Odesl\xE1no do Figma",
      sendToFigma: "Odeslat do Figma",
      capturePage: "Cel\xE1 obrazovka",
      openFile: "Otev\u0159\xEDt soubor",
      errorCaptureExpired:
        "Zachycen\xED vypr\u0161elo. Za\u010Dn\u011Bte nov\xE9 zachycen\xED.",
      errorCaptureNotFound:
        "Zachycen\xED nenalezeno. Za\u010Dn\u011Bte nov\xE9 zachycen\xED.",
      errorAccessDenied: "P\u0159\xEDstup odep\u0159en. Zkuste to znovu.",
      errorCaptureAlreadySubmitted:
        "Zachycen\xED ji\u017E odesl\xE1no. Za\u010Dn\u011Bte nov\xE9 zachycen\xED.",
      errorTimeout: "Po\u017Eadavek vypr\u0161el. Zkuste to znovu.",
      errorPageNotResponding:
        "Zachycen\xED vypr\u0161elo. Zkuste ponechat tuto kartu v pop\u0159ed\xED.",
      copyToClipboard: "Kop\xEDrovat do schr\xE1nky",
      copyInstead: "Kop\xEDrovat m\xEDsto toho",
      sendToFigmaFailed: "Nepoda\u0159ilo se odeslat do Figma",
    },
    el: {
      capturing:
        "\u0391\u03C0\u03BF\u03C3\u03C4\u03BF\u03BB\u03AE \u03C3\u03C4\u03BF Figma...",
      capturingForClipboard:
        "\u039A\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03C3\u03B5\u03BB\u03AF\u03B4\u03B1\u03C2 \u03C3\u03C4\u03BF \u03C0\u03C1\u03CC\u03C7\u03B5\u03B9\u03C1\u03BF",
      clipboardSuccess:
        "\u0391\u03BD\u03C4\u03B9\u03B3\u03C1\u03AC\u03C6\u03B7\u03BA\u03B5 \u03C3\u03C4\u03BF \u03C0\u03C1\u03CC\u03C7\u03B5\u03B9\u03C1\u03BF",
      openInFigma:
        "\u0386\u03BD\u03BF\u03B9\u03B3\u03BC\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5",
      error:
        "\u0397 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03B1\u03C0\u03AD\u03C4\u03C5\u03C7\u03B5",
      selectElement:
        "\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03BF\u03C5",
      selectElementToCapture:
        "\u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE",
      cancel: "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7",
      captureSubmitted:
        "\u0391\u03C0\u03B5\u03C3\u03C4\u03AC\u03BB\u03B7 \u03C3\u03C4\u03BF Figma",
      sendToFigma:
        "\u0391\u03C0\u03BF\u03C3\u03C4\u03BF\u03BB\u03AE \u03C3\u03C4\u03BF Figma",
      capturePage:
        "\u039F\u03BB\u03CC\u03BA\u03BB\u03B7\u03C1\u03B7 \u03B7 \u03BF\u03B8\u03CC\u03BD\u03B7",
      openFile:
        "\u0386\u03BD\u03BF\u03B9\u03B3\u03BC\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5",
      errorCaptureExpired:
        "\u0397 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03AD\u03BB\u03B7\u03BE\u03B5. \u039E\u03B5\u03BA\u03B9\u03BD\u03AE\u03C3\u03C4\u03B5 \u03BD\u03AD\u03B1 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE.",
      errorCaptureNotFound:
        "\u0397 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5. \u039E\u03B5\u03BA\u03B9\u03BD\u03AE\u03C3\u03C4\u03B5 \u03BD\u03AD\u03B1 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE.",
      errorAccessDenied:
        "\u0394\u03B5\u03BD \u03B5\u03C0\u03B9\u03C4\u03C1\u03AD\u03C0\u03B5\u03C4\u03B1\u03B9 \u03B7 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7. \u0394\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC.",
      errorCaptureAlreadySubmitted:
        "\u0397 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03AD\u03C7\u03B5\u03B9 \u03AE\u03B4\u03B7 \u03C5\u03C0\u03BF\u03B2\u03BB\u03B7\u03B8\u03B5\u03AF. \u039E\u03B5\u03BA\u03B9\u03BD\u03AE\u03C3\u03C4\u03B5 \u03BD\u03AD\u03B1 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE.",
      errorTimeout:
        "\u0397 \u03B1\u03AF\u03C4\u03B7\u03C3\u03B7 \u03AD\u03BB\u03B7\u03BE\u03B5. \u0394\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC.",
      errorPageNotResponding:
        "\u0397 \u03BA\u03B1\u03C4\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03AD\u03BB\u03B7\u03BE\u03B5. \u0394\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BD\u03B1 \u03BA\u03C1\u03B1\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03AE \u03C4\u03B7\u03BD \u03BA\u03B1\u03C1\u03C4\u03AD\u03BB\u03B1 \u03C3\u03C4\u03BF \u03C0\u03C1\u03BF\u03C3\u03BA\u03AE\u03BD\u03B9\u03BF.",
      copyToClipboard:
        "\u0391\u03BD\u03C4\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE \u03C3\u03C4\u03BF \u03C0\u03C1\u03CC\u03C7\u03B5\u03B9\u03C1\u03BF",
      copyInstead:
        "\u0391\u03BD\u03C4\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE \u03B1\u03BD\u03C4' \u03B1\u03C5\u03C4\u03BF\u03CD",
      sendToFigmaFailed:
        "\u0394\u03B5\u03BD \u03AE\u03C4\u03B1\u03BD \u03B4\u03C5\u03BD\u03B1\u03C4\u03AE \u03B7 \u03B1\u03C0\u03BF\u03C3\u03C4\u03BF\u03BB\u03AE \u03C3\u03C4\u03BF Figma",
    },
    ro: {
      capturing: "Se trimite c\u0103tre Figma...",
      capturingForClipboard: "Se captureaz\u0103 pagina \xEEn clipboard",
      clipboardSuccess: "Copiat \xEEn clipboard",
      openInFigma: "Deschide fi\u0219ier",
      error: "Capturarea a e\u0219uat",
      selectElement: "Selecta\u021Bi element",
      selectElementToCapture: "Selecta\u021Bi un element pentru captur\u0103",
      cancel: "Anuleaz\u0103",
      captureSubmitted: "Trimis c\u0103tre Figma",
      sendToFigma: "Trimite c\u0103tre Figma",
      capturePage: "Ecran complet",
      openFile: "Deschide fi\u0219ier",
      errorCaptureExpired:
        "Captura a expirat. \xCEncepe\u021Bi o nou\u0103 captur\u0103.",
      errorCaptureNotFound:
        "Captura nu a fost g\u0103sit\u0103. \xCEncepe\u021Bi o nou\u0103 captur\u0103.",
      errorAccessDenied: "Acces refuzat. \xCEncerca\u021Bi din nou.",
      errorCaptureAlreadySubmitted:
        "Captura a fost deja trimis\u0103. \xCEncepe\u021Bi o nou\u0103 captur\u0103.",
      errorTimeout: "Cererea a expirat. \xCEncerca\u021Bi din nou.",
      errorPageNotResponding:
        "Captura a expirat. \xCEncerca\u021Bi s\u0103 p\u0103stra\u021Bi aceast\u0103 fil\u0103 \xEEn prim-plan.",
      copyToClipboard: "Copiaz\u0103 \xEEn clipboard",
      copyInstead: "Copia\u021Bi \xEEn schimb",
      sendToFigmaFailed: "Nu s-a putut trimite c\u0103tre Figma",
    },
    hu: {
      capturing: "K\xFCld\xE9s a Figm\xE1ba...",
      capturingForClipboard: "Oldal r\xF6gz\xEDt\xE9se v\xE1g\xF3lapra",
      clipboardSuccess: "V\xE1g\xF3lapra m\xE1solva",
      openInFigma: "F\xE1jl megnyit\xE1sa",
      error: "R\xF6gz\xEDt\xE9s sikertelen",
      selectElement: "Elem kiv\xE1laszt\xE1sa",
      selectElementToCapture: "V\xE1lasszon egy elemet a r\xF6gz\xEDt\xE9shez",
      cancel: "M\xE9gse",
      captureSubmitted: "Elk\xFCldve a Figm\xE1ba",
      sendToFigma: "K\xFCld\xE9s a Figm\xE1ba",
      capturePage: "Teljes k\xE9perny\u0151",
      openFile: "F\xE1jl megnyit\xE1sa",
      errorCaptureExpired:
        "A r\xF6gz\xEDt\xE9s lej\xE1rt. Ind\xEDtson \xFAj r\xF6gz\xEDt\xE9st.",
      errorCaptureNotFound:
        "A r\xF6gz\xEDt\xE9s nem tal\xE1lhat\xF3. Ind\xEDtson \xFAj r\xF6gz\xEDt\xE9st.",
      errorAccessDenied:
        "Hozz\xE1f\xE9r\xE9s megtagadva. Pr\xF3b\xE1lja \xFAjra.",
      errorCaptureAlreadySubmitted:
        "A r\xF6gz\xEDt\xE9s m\xE1r elk\xFCldve. Ind\xEDtson \xFAj r\xF6gz\xEDt\xE9st.",
      errorTimeout:
        "A k\xE9r\xE9s id\u0151t\xFAll\xE9p\xE9se. Pr\xF3b\xE1lja \xFAjra.",
      errorPageNotResponding:
        "A r\xF6gz\xEDt\xE9s id\u0151t\xFAll\xE9p\xE9se. Pr\xF3b\xE1lja az el\u0151t\xE9rben tartani ezt a f\xFClet.",
      copyToClipboard: "M\xE1sol\xE1s v\xE1g\xF3lapra",
      copyInstead: "M\xE1sol\xE1s helyette",
      sendToFigmaFailed: "Nem siker\xFClt elk\xFCldeni a Figm\xE1ba",
    },
    uk: {
      capturing:
        "\u041D\u0430\u0434\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u0434\u043E Figma...",
      capturingForClipboard:
        "\u0417\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0438 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0456\u043D\u0443",
      clipboardSuccess:
        "\u0421\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0456\u043D\u0443",
      openInFigma:
        "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0444\u0430\u0439\u043B",
      error:
        "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F",
      selectElement:
        "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442",
      selectElementToCapture:
        "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0437\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F",
      cancel: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
      captureSubmitted:
        "\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u043D\u043E \u0434\u043E Figma",
      sendToFigma:
        "\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u0434\u043E Figma",
      capturePage: "\u0412\u0435\u0441\u044C \u0435\u043A\u0440\u0430\u043D",
      openFile:
        "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0444\u0430\u0439\u043B",
      errorCaptureExpired:
        "\u0417\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043A\u0456\u043D\u0447\u0438\u043B\u043E\u0441\u044C. \u041F\u043E\u0447\u043D\u0456\u0442\u044C \u043D\u043E\u0432\u0435 \u0437\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F.",
      errorCaptureNotFound:
        "\u0417\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u041F\u043E\u0447\u043D\u0456\u0442\u044C \u043D\u043E\u0432\u0435 \u0437\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F.",
      errorAccessDenied:
        "\u0414\u043E\u0441\u0442\u0443\u043F \u0437\u0430\u0431\u043E\u0440\u043E\u043D\u0435\u043D\u043E. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.",
      errorCaptureAlreadySubmitted:
        "\u0417\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u0432\u0436\u0435 \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u043D\u043E. \u041F\u043E\u0447\u043D\u0456\u0442\u044C \u043D\u043E\u0432\u0435 \u0437\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F.",
      errorTimeout:
        "\u0427\u0430\u0441 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0442\u0443 \u0432\u0438\u0447\u0435\u0440\u043F\u0430\u043D\u043E. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.",
      errorPageNotResponding:
        "\u0427\u0430\u0441 \u0437\u0430\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u0432\u0438\u0447\u0435\u0440\u043F\u0430\u043D\u043E. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0446\u044E \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u043D\u0430 \u043F\u0435\u0440\u0435\u0434\u043D\u044C\u043E\u043C\u0443 \u043F\u043B\u0430\u043D\u0456.",
      copyToClipboard:
        "\u041A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0456\u043D\u0443",
      copyInstead:
        "\u0421\u043A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u043D\u0430\u0442\u043E\u043C\u0456\u0441\u0442\u044C",
      sendToFigmaFailed:
        "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u0434\u043E Figma",
    },
    ca: {
      capturing: "Enviant a Figma...",
      capturingForClipboard: "Capturant la p\xE0gina al porta-retalls",
      clipboardSuccess: "Copiat al porta-retalls",
      openInFigma: "Obre el fitxer",
      error: "Error en la captura",
      selectElement: "Selecciona l'element",
      selectElementToCapture: "Seleccioneu un element per capturar",
      cancel: "Cancel\xB7la",
      captureSubmitted: "Enviat a Figma",
      sendToFigma: "Envia a Figma",
      capturePage: "Pantalla sencera",
      openFile: "Obre el fitxer",
      errorCaptureExpired: "La captura ha caducat. Inicieu una nova captura.",
      errorCaptureNotFound:
        "No s'ha trobat la captura. Inicieu una nova captura.",
      errorAccessDenied: "Acc\xE9s denegat. Torneu-ho a provar.",
      errorCaptureAlreadySubmitted:
        "La captura ja s'ha enviat. Inicieu una nova captura.",
      errorTimeout: "La sol\xB7licitud ha caducat. Torneu-ho a provar.",
      errorPageNotResponding:
        "La captura ha caducat. Intenteu mantenir aquesta pestanya en primer pla.",
      copyToClipboard: "Copia al porta-retalls",
      copyInstead: "Copia en lloc d'aix\xF2",
      sendToFigmaFailed: "No s'ha pogut enviar a Figma",
    },
    sk: {
      capturing: "Odosielanie do Figma...",
      capturingForClipboard: "Zachyt\xE1vanie str\xE1nky do schr\xE1nky",
      clipboardSuccess: "Skop\xEDrovan\xE9 do schr\xE1nky",
      openInFigma: "Otvori\u0165 s\xFAbor",
      error: "Zachyt\xE1vanie zlyhalo",
      selectElement: "Vybra\u0165 prvok",
      selectElementToCapture: "Vyberte prvok na zachytenie",
      cancel: "Zru\u0161i\u0165",
      captureSubmitted: "Odoslan\xE9 do Figma",
      sendToFigma: "Odosla\u0165 do Figma",
      capturePage: "Cel\xE1 obrazovka",
      openFile: "Otvori\u0165 s\xFAbor",
      errorCaptureExpired:
        "Zachytenie vypr\u0161alo. Za\u010Dnite nov\xE9 zachytenie.",
      errorCaptureNotFound:
        "Zachytenie sa nena\u0161lo. Za\u010Dnite nov\xE9 zachytenie.",
      errorAccessDenied: "Pr\xEDstup zamietnut\xFD. Sk\xFAste to znova.",
      errorCaptureAlreadySubmitted:
        "Zachytenie u\u017E bolo odoslan\xE9. Za\u010Dnite nov\xE9 zachytenie.",
      errorTimeout: "Po\u017Eiadavka vypr\u0161ala. Sk\xFAste to znova.",
      errorPageNotResponding:
        "Zachytenie vypr\u0161alo. Sk\xFAste ponecha\u0165 t\xFAto kartu v popred\xED.",
      copyToClipboard: "Kop\xEDrova\u0165 do schr\xE1nky",
      copyInstead: "Kop\xEDrova\u0165 namiesto toho",
      sendToFigmaFailed: "Nepodarilo sa odosla\u0165 do Figma",
    },
    bg: {
      capturing:
        "\u0418\u0437\u043F\u0440\u0430\u0449\u0430\u043D\u0435 \u043A\u044A\u043C Figma...",
      capturingForClipboard:
        "\u0417\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0442\u0430 \u0432 \u043A\u043B\u0438\u043F\u0431\u043E\u0440\u0434\u0430",
      clipboardSuccess:
        "\u041A\u043E\u043F\u0438\u0440\u0430\u043D\u043E \u0432 \u043A\u043B\u0438\u043F\u0431\u043E\u0440\u0434\u0430",
      openInFigma:
        "\u041E\u0442\u0432\u043E\u0440\u0438 \u0444\u0430\u0439\u043B",
      error:
        "\u0417\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435\u0442\u043E \u043D\u0435\u0443\u0441\u043F\u0435\u0448\u043D\u043E",
      selectElement:
        "\u0418\u0437\u0431\u0435\u0440\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442",
      selectElementToCapture:
        "\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0437\u0430 \u0437\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435",
      cancel: "\u041E\u0442\u043A\u0430\u0437",
      captureSubmitted:
        "\u0418\u0437\u043F\u0440\u0430\u0442\u0435\u043D\u043E \u043A\u044A\u043C Figma",
      sendToFigma:
        "\u0418\u0437\u043F\u0440\u0430\u0442\u0438 \u043A\u044A\u043C Figma",
      capturePage: "\u0426\u044F\u043B \u0435\u043A\u0440\u0430\u043D",
      openFile: "\u041E\u0442\u0432\u043E\u0440\u0438 \u0444\u0430\u0439\u043B",
      errorCaptureExpired:
        "\u0417\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435\u0442\u043E \u0438\u0437\u0442\u0435\u0447\u0435. \u0417\u0430\u043F\u043E\u0447\u043D\u0435\u0442\u0435 \u043D\u043E\u0432\u043E \u0437\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435.",
      errorCaptureNotFound:
        "\u0417\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435\u0442\u043E \u043D\u0435 \u0435 \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043E. \u0417\u0430\u043F\u043E\u0447\u043D\u0435\u0442\u0435 \u043D\u043E\u0432\u043E \u0437\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435.",
      errorAccessDenied:
        "\u0414\u043E\u0441\u0442\u044A\u043F\u044A\u0442 \u0435 \u043E\u0442\u043A\u0430\u0437\u0430\u043D. \u041E\u043F\u0438\u0442\u0430\u0439\u0442\u0435 \u043E\u0442\u043D\u043E\u0432\u043E.",
      errorCaptureAlreadySubmitted:
        "\u0417\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435\u0442\u043E \u0432\u0435\u0447\u0435 \u0435 \u0438\u0437\u043F\u0440\u0430\u0442\u0435\u043D\u043E. \u0417\u0430\u043F\u043E\u0447\u043D\u0435\u0442\u0435 \u043D\u043E\u0432\u043E \u0437\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435.",
      errorTimeout:
        "\u0417\u0430\u044F\u0432\u043A\u0430\u0442\u0430 \u0438\u0437\u0442\u0435\u0447\u0435. \u041E\u043F\u0438\u0442\u0430\u0439\u0442\u0435 \u043E\u0442\u043D\u043E\u0432\u043E.",
      errorPageNotResponding:
        "\u0417\u0430\u0441\u043D\u0435\u043C\u0430\u043D\u0435\u0442\u043E \u0438\u0437\u0442\u0435\u0447\u0435. \u041E\u043F\u0438\u0442\u0430\u0439\u0442\u0435 \u0434\u0430 \u0437\u0430\u0434\u044A\u0440\u0436\u0438\u0442\u0435 \u0442\u043E\u0437\u0438 \u0440\u0430\u0437\u0434\u0435\u043B \u043D\u0430 \u043F\u0440\u0435\u0434\u0435\u043D \u043F\u043B\u0430\u043D.",
      copyToClipboard:
        "\u041A\u043E\u043F\u0438\u0440\u0430\u043D\u0435 \u0432 \u043A\u043B\u0438\u043F\u0431\u043E\u0440\u0434\u0430",
      copyInstead:
        "\u041A\u043E\u043F\u0438\u0440\u0430\u0439 \u0432\u043C\u0435\u0441\u0442\u043E",
      sendToFigmaFailed:
        "\u041D\u0435\u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u043F\u0440\u0430\u0449\u0430\u043D\u0435 \u043A\u044A\u043C Figma",
    },
    hr: {
      capturing: "Slanje u Figma...",
      capturingForClipboard: "Snimanje stranice u me\u0111uspremnik",
      clipboardSuccess: "Kopirano u me\u0111uspremnik",
      openInFigma: "Otvori datoteku",
      error: "Snimanje neuspje\u0161no",
      selectElement: "Odaberi element",
      selectElementToCapture: "Odaberite element za snimanje",
      cancel: "Odustani",
      captureSubmitted: "Poslano u Figma",
      sendToFigma: "Po\u0161alji u Figma",
      capturePage: "Cijeli zaslon",
      openFile: "Otvori datoteku",
      errorCaptureExpired: "Snimanje je isteklo. Pokrenite novo snimanje.",
      errorCaptureNotFound:
        "Snimanje nije prona\u0111eno. Pokrenite novo snimanje.",
      errorAccessDenied: "Pristup odbijen. Poku\u0161ajte ponovo.",
      errorCaptureAlreadySubmitted:
        "Snimanje je ve\u0107 poslano. Pokrenite novo snimanje.",
      errorTimeout: "Zahtjev je istekao. Poku\u0161ajte ponovo.",
      errorPageNotResponding:
        "Snimanje je isteklo. Poku\u0161ajte zadr\u017Eati ovu karticu u prvom planu.",
      copyToClipboard: "Kopiraj u me\u0111uspremnik",
      copyInstead: "Kopiraj umjesto",
      sendToFigmaFailed: "Nije mogu\u0107e poslati u Figma",
    },
    sr: {
      capturing: "\u0421\u043B\u0430\u045A\u0435 \u0443 Figma...",
      capturingForClipboard:
        "\u0421\u043D\u0438\u043C\u0430\u045A\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0443 clipboard",
      clipboardSuccess:
        "\u041A\u043E\u043F\u0438\u0440\u0430\u043D\u043E \u0443 clipboard",
      openInFigma:
        "\u041E\u0442\u0432\u043E\u0440\u0438 \u0444\u0430\u0458\u043B",
      error:
        "\u0421\u043D\u0438\u043C\u0430\u045A\u0435 \u043D\u0435\u0443\u0441\u043F\u0435\u0448\u043D\u043E",
      selectElement:
        "\u0418\u0437\u0430\u0431\u0435\u0440\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442",
      selectElementToCapture:
        "\u0418\u0437\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0437\u0430 \u0441\u043D\u0438\u043C\u0430\u045A\u0435",
      cancel: "\u041E\u0442\u043A\u0430\u0436\u0438",
      captureSubmitted:
        "\u041F\u043E\u0441\u043B\u0430\u0442\u043E \u0443 Figma",
      sendToFigma: "\u041F\u043E\u0448\u0430\u0459\u0438 \u0443 Figma",
      capturePage: "\u0426\u0435\u043E \u0435\u043A\u0440\u0430\u043D",
      openFile: "\u041E\u0442\u0432\u043E\u0440\u0438 \u0444\u0430\u0458\u043B",
      errorCaptureExpired:
        "\u0421\u043D\u0438\u043C\u0430\u045A\u0435 \u0458\u0435 \u0438\u0441\u0442\u0435\u043A\u043B\u043E. \u041F\u043E\u043A\u0440\u0435\u043D\u0438\u0442\u0435 \u043D\u043E\u0432\u043E \u0441\u043D\u0438\u043C\u0430\u045A\u0435.",
      errorCaptureNotFound:
        "\u0421\u043D\u0438\u043C\u0430\u045A\u0435 \u043D\u0438\u0458\u0435 \u043F\u0440\u043E\u043D\u0430\u0452\u0435\u043D\u043E. \u041F\u043E\u043A\u0440\u0435\u043D\u0438\u0442\u0435 \u043D\u043E\u0432\u043E \u0441\u043D\u0438\u043C\u0430\u045A\u0435.",
      errorAccessDenied:
        "\u041F\u0440\u0438\u0441\u0442\u0443\u043F \u043E\u0434\u0431\u0438\u0458\u0435\u043D. \u041F\u043E\u043A\u0443\u0448\u0430\u0458\u0442\u0435 \u043F\u043E\u043D\u043E\u0432\u043E.",
      errorCaptureAlreadySubmitted:
        "\u0421\u043D\u0438\u043C\u0430\u045A\u0435 \u0458\u0435 \u0432\u0435\u045B \u043F\u043E\u0441\u043B\u0430\u0442\u043E. \u041F\u043E\u043A\u0440\u0435\u043D\u0438\u0442\u0435 \u043D\u043E\u0432\u043E \u0441\u043D\u0438\u043C\u0430\u045A\u0435.",
      errorTimeout:
        "\u0417\u0430\u0445\u0442\u0435\u0432 \u0458\u0435 \u0438\u0441\u0442\u0435\u043A\u0430\u043E. \u041F\u043E\u043A\u0443\u0448\u0430\u0458\u0442\u0435 \u043F\u043E\u043D\u043E\u0432\u043E.",
      errorPageNotResponding:
        "\u0421\u043D\u0438\u043C\u0430\u045A\u0435 \u0458\u0435 \u0438\u0441\u0442\u0435\u043A\u043B\u043E. \u041F\u043E\u043A\u0443\u0448\u0430\u0458\u0442\u0435 \u0434\u0430 \u0437\u0430\u0434\u0440\u0436\u0438\u0442\u0435 \u043E\u0432\u0443 \u043A\u0430\u0440\u0442\u0438\u0446\u0443 \u0443 \u043F\u0440\u0432\u043E\u043C \u043F\u043B\u0430\u043D\u0443.",
      copyToClipboard:
        "\u041A\u043E\u043F\u0438\u0440\u0430\u0458 \u0443 clipboard",
      copyInstead:
        "\u041A\u043E\u043F\u0438\u0440\u0430\u0458 \u0443\u043C\u0435\u0441\u0442\u043E",
      sendToFigmaFailed:
        "\u041D\u0438\u0458\u0435 \u043C\u043E\u0433\u0443\u045B\u0435 \u043F\u043E\u0441\u043B\u0430\u0442\u0438 \u0443 Figma",
    },
    sl: {
      capturing: "Po\u0161iljanje v Figma...",
      capturingForClipboard: "Zajemanje strani v odlo\u017Ei\u0161\u010De",
      clipboardSuccess: "Kopirano v odlo\u017Ei\u0161\u010De",
      openInFigma: "Odpri datoteko",
      error: "Zajemanje ni uspelo",
      selectElement: "Izberi element",
      selectElementToCapture: "Izberite element za zajem",
      cancel: "Prekli\u010Di",
      captureSubmitted: "Poslano v Figma",
      sendToFigma: "Po\u0161lji v Figma",
      capturePage: "Celoten zaslon",
      openFile: "Odpri datoteko",
      errorCaptureExpired: "Zajem je potekel. Za\u010Dnite nov zajem.",
      errorCaptureNotFound:
        "Zajema ni mogo\u010De najti. Za\u010Dnite nov zajem.",
      errorAccessDenied: "Dostop zavrnjen. Poskusite znova.",
      errorCaptureAlreadySubmitted:
        "Zajem je \u017Ee poslan. Za\u010Dnite nov zajem.",
      errorTimeout: "Zahteva je potekla. Poskusite znova.",
      errorPageNotResponding:
        "Zajem je potekel. Poskusite obdr\u017Eati ta zavihek v ospredju.",
      copyToClipboard: "Kopiraj v odlo\u017Ei\u0161\u010De",
      copyInstead: "Kopiraj namesto",
      sendToFigmaFailed: "Ni bilo mogo\u010De poslati v Figma",
    },
    lt: {
      capturing: "Siun\u010Diama \u012F Figma...",
      capturingForClipboard: "Puslapio fiksavimas \u012F i\u0161karpin\u0119",
      clipboardSuccess: "Nukopijuota \u012F i\u0161karpin\u0119",
      openInFigma: "Atidaryti fail\u0105",
      error: "Fiksavimas nepavyko",
      selectElement: "Pasirinkti element\u0105",
      selectElementToCapture: "Pasirinkite element\u0105 fiksuoti",
      cancel: "At\u0161aukti",
      captureSubmitted: "I\u0161si\u0173sta \u012F Figma",
      sendToFigma: "Si\u0173sti \u012F Figma",
      capturePage: "Visas ekranas",
      openFile: "Atidaryti fail\u0105",
      errorCaptureExpired:
        "Fiksavimas baig\u0117si. Prad\u0117kite nauj\u0105 fiksavim\u0105.",
      errorCaptureNotFound:
        "Fiksavimas nerastas. Prad\u0117kite nauj\u0105 fiksavim\u0105.",
      errorAccessDenied: "Prieiga u\u017Edrausta. Bandykite dar kart\u0105.",
      errorCaptureAlreadySubmitted:
        "Fiksavimas jau pateiktas. Prad\u0117kite nauj\u0105 fiksavim\u0105.",
      errorTimeout: "U\u017Eklausa baig\u0117si. Bandykite dar kart\u0105.",
      errorPageNotResponding:
        "Fiksavimas baig\u0117si. Bandykite laikyti \u0161i\u0105 kortel\u0119 priekyje.",
      copyToClipboard: "Kopijuoti \u012F i\u0161karpin\u0119",
      copyInstead: "Kopijuoti vietoj",
      sendToFigmaFailed: "Nepavyko i\u0161si\u0173sti \u012F Figma",
    },
    lv: {
      capturing: "S\u016Bta uz Figma...",
      capturingForClipboard: "Lapas tver\u0161ana starpliktuv\u0113",
      clipboardSuccess: "Nokop\u0113ts starpliktuv\u0113",
      openInFigma: "Atv\u0113rt failu",
      error: "Tver\u0161ana neizdev\u0101s",
      selectElement: "Izv\u0113l\u0113ties elementu",
      selectElementToCapture: "Izv\u0113lieties elementu tver\u0161anai",
      cancel: "Atcelt",
      captureSubmitted: "Nos\u016Bt\u012Bts uz Figma",
      sendToFigma: "S\u016Bt\u012Bt uz Figma",
      capturePage: "Viss ekr\u0101ns",
      openFile: "Atv\u0113rt failu",
      errorCaptureExpired:
        "Tver\u0161ana beidz\u0101s. S\u0101ciet jaunu tver\u0161anu.",
      errorCaptureNotFound:
        "Tver\u0161ana nav atrasta. S\u0101ciet jaunu tver\u0161anu.",
      errorAccessDenied:
        "Piek\u013Cuve liegta. M\u0113\u0123iniet v\u0113lreiz.",
      errorCaptureAlreadySubmitted:
        "Tver\u0161ana jau iesniegta. S\u0101ciet jaunu tver\u0161anu.",
      errorTimeout:
        "Piepras\u012Bjuma laiks beidz\u0101s. M\u0113\u0123iniet v\u0113lreiz.",
      errorPageNotResponding:
        "Tver\u0161anas laiks beidz\u0101s. M\u0113\u0123iniet tur\u0113t \u0161o cilni priek\u0161pl\u0101n\u0101.",
      copyToClipboard: "Kop\u0113t starpliktuv\u0113",
      copyInstead: "Kop\u0113t t\u0101 viet\u0101",
      sendToFigmaFailed: "Neizdev\u0101s nos\u016Bt\u012Bt uz Figma",
    },
    et: {
      capturing: "Saatmine Figmasse...",
      capturingForClipboard: "Lehe j\xE4\xE4dvustamine l\xF5ikelauale",
      clipboardSuccess: "Kopeeritud l\xF5ikelauale",
      openInFigma: "Ava fail",
      error: "J\xE4\xE4dvustamine eba\xF5nnestus",
      selectElement: "Vali element",
      selectElementToCapture: "Valige j\xE4\xE4dvustatav element",
      cancel: "T\xFChista",
      captureSubmitted: "Saadetud Figmasse",
      sendToFigma: "Saada Figmasse",
      capturePage: "Terve ekraan",
      openFile: "Ava fail",
      errorCaptureExpired:
        "J\xE4\xE4dvustus aegus. Alustage uut j\xE4\xE4dvustust.",
      errorCaptureNotFound:
        "J\xE4\xE4dvustust ei leitud. Alustage uut j\xE4\xE4dvustust.",
      errorAccessDenied: "Juurdep\xE4\xE4s keelatud. Proovige uuesti.",
      errorCaptureAlreadySubmitted:
        "J\xE4\xE4dvustus on juba esitatud. Alustage uut j\xE4\xE4dvustust.",
      errorTimeout: "P\xE4ringu aeg l\xF5ppes. Proovige uuesti.",
      errorPageNotResponding:
        "J\xE4\xE4dvustamise aeg l\xF5ppes. Proovige hoida see vahekaart esiplaanil.",
      copyToClipboard: "Kopeeri l\xF5ikelauale",
      copyInstead: "Kopeeri selle asemel",
      sendToFigmaFailed: "Ei saanud Figmasse saata",
    },
    ms: {
      capturing: "Menghantar ke Figma...",
      capturingForClipboard: "Menangkap halaman ke papan klip",
      clipboardSuccess: "Disalin ke papan klip",
      openInFigma: "Buka fail",
      error: "Penangkapan gagal",
      selectElement: "Pilih elemen",
      selectElementToCapture: "Pilih elemen untuk ditangkap",
      cancel: "Batal",
      captureSubmitted: "Dihantar ke Figma",
      sendToFigma: "Hantar ke Figma",
      capturePage: "Seluruh skrin",
      openFile: "Buka fail",
      errorCaptureExpired:
        "Tangkapan tamat tempoh. Sila mulakan tangkapan baru.",
      errorCaptureNotFound:
        "Tangkapan tidak ditemui. Sila mulakan tangkapan baru.",
      errorAccessDenied: "Akses ditolak. Sila cuba lagi.",
      errorCaptureAlreadySubmitted:
        "Tangkapan sudah dihantar. Sila mulakan tangkapan baru.",
      errorTimeout: "Permintaan tamat masa. Sila cuba lagi.",
      errorPageNotResponding:
        "Tangkapan tamat masa. Cuba kekalkan tab ini di latar depan.",
      copyToClipboard: "Salin ke papan klip",
      copyInstead: "Salin sebaliknya",
      sendToFigmaFailed: "Tidak dapat menghantar ke Figma",
    },
    tl: {
      capturing: "Ipinapadala sa Figma...",
      capturingForClipboard: "Kinukuha ang pahina sa clipboard",
      clipboardSuccess: "Nakopya sa clipboard",
      openInFigma: "Buksan ang file",
      error: "Nabigo ang pagkuha",
      selectElement: "Pumili ng elemento",
      selectElementToCapture: "Pumili ng elemento na kukunin",
      cancel: "Ikansela",
      captureSubmitted: "Naipadala sa Figma",
      sendToFigma: "Ipadala sa Figma",
      capturePage: "Buong screen",
      openFile: "Buksan ang file",
      errorCaptureExpired:
        "Nag-expire na ang pagkuha. Magsimula ng bagong pagkuha.",
      errorCaptureNotFound:
        "Hindi natagpuan ang pagkuha. Magsimula ng bagong pagkuha.",
      errorAccessDenied: "Tinanggihan ang access. Pakisubukang muli.",
      errorCaptureAlreadySubmitted:
        "Naisumite na ang pagkuha. Magsimula ng bagong pagkuha.",
      errorTimeout: "Nag-expire ang kahilingan. Pakisubukang muli.",
      errorPageNotResponding:
        "Nag-expire ang pagkuha. Subukang panatilihin ang tab na ito sa harapan.",
      copyToClipboard: "Kopyahin sa clipboard",
      copyInstead: "Kopyahin na lang",
      sendToFigmaFailed: "Hindi maipadala sa Figma",
    },
  }
  function _f() {
    let e = document.documentElement.lang
    if (e) return kn(e)
    let t = document.querySelector('meta[http-equiv="content-language"]')
    if (t) {
      let r = t.getAttribute("content")
      if (r) return kn(r)
    }
    let n = document.querySelector('meta[name="language"]')
    if (n) {
      let r = n.getAttribute("content")
      if (r) return kn(r)
    }
    return typeof navigator != "undefined" && navigator.language
      ? kn(navigator.language)
      : "en"
  }
  function kn(e) {
    let t = e.toLowerCase().trim()
    if (!t) return "en"
    if (t.startsWith("zh-tw") || t.startsWith("zh-hant")) return "zh-tw"
    if (t.startsWith("zh")) return "zh"
    if (t.startsWith("ko")) return "ko"
    if (t.startsWith("es")) return "es"
    if (t.startsWith("pt")) return "pt"
    if (t === "nb" || t === "nn" || t.startsWith("nb-") || t.startsWith("nn-"))
      return "no"
    let n = t.split("-")[0]
    return n != null ? n : "en"
  }
  function D(e) {
    let t = _f()
    return vn[t] && vn[t][e] ? vn[t][e] : vn.en[e] || e
  }
  var _ = {
    bg: "#2c2c2c",
    text: "rgba(255, 255, 255, 0.9)",
    textSecondary: "rgba(255, 255, 255, 0.5)",
    textOnBrand: "#fff",
    brand: "#0d99ff",
    brandBg: "rgba(13, 153, 255, 0.15)",
    brandHover: "#3db8ff",
    brandPressed: "#0d99ff",
    success: "rgba(255, 255, 255, 0.9)",
    error: "#f24822",
    border: "rgba(255, 255, 255, 0.1)",
    secondaryHover: "rgba(255, 255, 255, 0.1)",
    secondaryPressed: "rgba(255, 255, 255, 0.15)",
    shadow: "0 1px 3px 0 rgba(0,0,0,.15),0 0 .5px 0 rgba(0,0,0,.3)",
    tooltipShadow: "0 2px 8px rgba(0,0,0,0.3)",
    fontFamily:
      '"Inter",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif',
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "16px",
    letterSpacing: "0.005em",
    toolbarHeight: "40px",
    toolbarBorderRadius: "13px",
    toolbarTop: "16px",
    buttonHeight: "24px",
    buttonBorderRadius: "5px",
    tooltipBorderRadius: "4px",
    highlightBorderRadius: "4px",
  }
  function xn(e) {
    return e.key === "Enter" && (e.metaKey || e.ctrlKey)
  }
  function M(e, t) {
    Object.assign(e.style, t)
  }
  function qa(e) {
    if (document.body) document.body.appendChild(e)
    else {
      let t = new MutationObserver(() => {
        document.body && (t.disconnect(), document.body.appendChild(e))
      })
      t.observe(document.documentElement, { childList: !0 })
    }
  }
  var Rf = {
      "icon.24.spinner": {
        path: "M15.333 7.011a6 6 0 0 0-2.834-.99A.534.534 0 0 1 12 5.5c0-.276.224-.502.5-.482A7 7 0 1 1 5.017 12.5.473.473 0 0 1 5.5 12c.276 0 .498.224.52.5a6 6 0 1 0 9.313-5.489",
        fillRule: "evenodd",
      },
      "icon.24.check": {
        path: "M15.584 7.722a.5.5 0 0 1 .832.555l-5 7.5a.502.502 0 0 1-.77.076l-3-3a.5.5 0 0 1 .708-.707l2.568 2.569z",
      },
      "icon.24.warning": {
        path: "m10.257 6.059-5.04 8.96C4.467 16.352 5.43 18 6.96 18h10.08c1.53 0 2.493-1.646 1.743-2.98l-5.04-8.96c-.764-1.36-2.722-1.36-3.486 0m.871.49-5.04 8.96A1 1 0 0 0 6.96 17h10.08a1 1 0 0 0 .872-1.49l-5.04-8.96a1 1 0 0 0-1.744 0M12 8.5a.5.5 0 0 1 .5.5v3.5a.5.5 0 1 1-1 0V9a.5.5 0 0 1 .5-.5m.75 6.254a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0",
        fillRule: "evenodd",
      },
      "icon.24.close.large": {
        path: "M17.354 6.646a.5.5 0 0 1 0 .708L12.707 12l4.647 4.646a.5.5 0 0 1-.708.708L12 12.707l-4.646 4.647a.5.5 0 0 1-.708-.708L11.293 12 6.646 7.354a.5.5 0 0 1 .708-.707L12 11.293l4.646-4.647a.5.5 0 0 1 .708 0",
        fillRule: "evenodd",
      },
      "icon.24.browser": {
        path: "M17 6a2 2 0 0 1 2 2v8l-.01.204a2 2 0 0 1-1.786 1.785L17 18H7l-.204-.01a2 2 0 0 1-1.785-1.786L5 16V8a2 2 0 0 1 2-2zM6 16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5H6zm1-9a1 1 0 0 0-.995.897L6 8v2h12V8a1 1 0 0 0-1-1zm.5 1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1",
      },
      "icon.24.interaction.click": {
        path: "M9.321 5.532a.5.5 0 0 1 .653.27l.777 1.876c.102.245-.039.524-.285.626s-.537.002-.639-.244L9.05 6.186a.5.5 0 0 1 .271-.654m-1.26 4.295L6.186 9.05a.5.5 0 0 0-.383.924l1.875.777c.246.101.524-.04.626-.285.102-.246.003-.537-.243-.64m-.383 3.422-1.875.776a.5.5 0 1 0 .383.924l1.875-.777c.246-.102.345-.393.243-.639s-.38-.386-.626-.284m2.149 2.69-.777 1.874a.5.5 0 0 0 .924.383l.777-1.875c.102-.245-.04-.524-.285-.626s-.537-.002-.639.244m6.495-5.188 1.874-.777a.5.5 0 1 0-.382-.924l-1.875.777c-.246.101-.346.393-.244.639s.381.386.627.285m-2.15-2.69.777-1.875a.5.5 0 1 0-.924-.383l-.776 1.875c-.102.245.039.524.284.626.246.102.538.002.64-.244m-1.82 3.002a1 1 0 0 0-1.288 1.288l2.25 6a1 1 0 0 0 1.906-.109l.605-2.418 2.418-.604a1 1 0 0 0 .108-1.907zm3.94 3.614L15 15l-.323 1.29L14.25 18l-.618-1.65-1.166-3.108L12 12l1.243.466 3.108 1.165L18 14.25z",
        fillRule: "evenodd",
      },
      "icon.24.new.tab": {
        path: "M9.5 6a.5.5 0 0 1 0 1h-2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 16.5v-9A1.5 1.5 0 0 1 7.5 6zm8 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V7.707l-4.146 4.147a.5.5 0 1 1-.707-.707L16.293 7H12.5a.5.5 0 0 1 0-1z",
      },
    },
    Ya = "http://www.w3.org/2000/svg"
  function Ct(e, t, n = !1) {
    let r = Rf[e]
    if (!r) throw new Error(`Unknown icon: ${e}`)
    let o = document.createElementNS(Ya, "svg")
    o.setAttribute("viewBox", "0 0 24 24"),
      o.setAttribute("fill", "none"),
      M(o, {
        width: "24px",
        height: "24px",
        flexShrink: "0",
        animation: n ? "spin 1s linear infinite" : "",
      })
    let i = document.createElementNS(Ya, "path")
    return (
      i.setAttribute("d", r.path),
      i.setAttribute("fill", t),
      r.fillRule &&
        (i.setAttribute("fill-rule", r.fillRule),
        i.setAttribute("clip-rule", r.fillRule)),
      o.appendChild(i),
      o
    )
  }
  function io(e, t, n = "primary", r = !1, o = !1) {
    let i = document.createElement("div")
    M(i, {
      display: "flex",
      alignItems: "center",
      alignSelf: "stretch",
      marginLeft: "8px",
    })
    let a = document.createElement("button")
    a.textContent = e
    let u = n === "primary",
      l = u ? _.brandHover : _.secondaryHover,
      s = u ? _.brandPressed : _.secondaryPressed,
      c = u ? _.brand : "transparent"
    return (
      M(a, {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: _.buttonHeight,
        padding: "0 8px",
        border: u ? "none" : `1px solid ${_.border}`,
        borderRadius: _.buttonBorderRadius,
        background: c,
        color: u ? _.textOnBrand : _.text,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit",
        cursor: r || o ? "default" : "pointer",
        whiteSpace: "nowrap",
        transition: "background .1s",
        opacity: r ? "0.5" : "1",
      }),
      r || o
        ? (a.disabled = !0)
        : ((a.onmouseenter = () => (a.style.background = l)),
          (a.onmouseleave = () => (a.style.background = c)),
          (a.onmousedown = () => (a.style.background = s)),
          (a.onmouseup = () => (a.style.background = l)),
          (a.onclick = t)),
      i.appendChild(a),
      i
    )
  }
  var Ja = "figma.capturePreferences"
  function ao() {
    try {
      let e = localStorage.getItem(Ja)
      if (e) return JSON.parse(e)
    } catch (e) {}
    return {}
  }
  function Za(e) {
    try {
      let t = ao(),
        n = k(k({}, t), e)
      localStorage.setItem(Ja, JSON.stringify(n))
    } catch (t) {}
  }
  var Fn = null
  function lo() {
    if (!Fn) return
    let { cleanup: e, timeoutId: t } = Fn
    clearTimeout(t), e()
  }
  var Tn = 300,
    so = "cubic-bezier(0.15, 1, 0.4, 1)"
  function Pf(e) {
    return e === "icon" ? "translateY(-12px)" : ""
  }
  function Nf(e) {
    return e === "icon" ? "translateY(12px)" : ""
  }
  function St(e, t, n, r) {
    var E
    if ((lo(), e.childNodes.length === 0)) {
      r != null && r.minWidth && (e.style.minWidth = r.minWidth),
        e.replaceChildren(...n)
      return
    }
    let o = e.getBoundingClientRect().width,
      i = e.getBoundingClientRect(),
      a = []
    for (let g of Array.from(e.children))
      a.push({
        el: g,
        rect: g.getBoundingClientRect(),
        role: g.getAttribute("data-toolbar-role"),
      })
    let u = (E = r == null ? void 0 : r.minWidth) != null ? E : ""
    ;(e.style.minWidth = u),
      (e.style.width = "max-content"),
      e.replaceChildren(...n)
    let l = e.getBoundingClientRect().width
    ;(e.style.transition = "none"),
      (e.style.minWidth = "0"),
      (e.style.width = `${o}px`)
    let s = []
    for (let { el: g, rect: b, role: C } of a) {
      let v = document.createElement("div")
      M(v, {
        position: "absolute",
        top: `${b.top - i.top}px`,
        left: `${b.left - i.left}px`,
        width: `${b.width}px`,
        height: `${b.height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
      }),
        v.appendChild(g),
        C && v.setAttribute("data-exit-role", C),
        e.appendChild(v),
        s.push(v)
    }
    let c = new Set(s),
      d = []
    for (let g of Array.from(e.children)) c.has(g) || d.push(g)
    for (let g of d) {
      let b = g.getAttribute("data-toolbar-role"),
        C = Nf(b)
      ;(g.style.transition = "none"),
        (g.style.opacity = "0"),
        C && (g.style.transform = C)
    }
    e.offsetWidth
    let p = `opacity ${Tn}ms ${so}, transform ${Tn}ms ${so}`
    ;(e.style.transition = `width ${Tn}ms ${so}`), (e.style.width = `${l}px`)
    for (let g of s) {
      let b = g.getAttribute("data-exit-role"),
        C = Pf(b)
      ;(g.style.transition = p),
        (g.style.opacity = "0"),
        C && (g.style.transform = C)
    }
    for (let g of d)
      (g.style.transition = p),
        (g.style.opacity = "1"),
        (g.style.transform = "")
    let f = !1,
      h = () => {
        if (!f) {
          f = !0
          for (let g of s) g.remove()
          for (let g of d)
            (g.style.transition = ""),
              (g.style.opacity = ""),
              (g.style.transform = "")
          ;(e.style.width = "max-content"),
            (e.style.transition = ""),
            (e.style.minWidth = u),
            (Fn = null)
        }
      },
      S = setTimeout(h, Tn + 50)
    e.addEventListener("transitionend", function g(b) {
      b.propertyName === "width" &&
        b.target === e &&
        (e.removeEventListener("transitionend", g), clearTimeout(S), h())
    }),
      (Fn = { overlays: s, newChildren: d, cleanup: h, timeoutId: S })
  }
  var If = "__figma_capture_toolbar_host__",
    Qa = 200,
    Lf = "16px",
    Mf = "16px",
    V = null,
    _e = null,
    W = null,
    O = null,
    we = null,
    vt = "top",
    kt = !1,
    ns = 0,
    rs = 0,
    os = 0,
    is = 0,
    po = 0,
    An = 0,
    wt = 0,
    uo = 0,
    co = 0,
    K = null,
    Re = null,
    Ie = !1,
    Pe = null,
    Ne = null,
    es = 0,
    Of = 500
  function as() {
    kt ||
      !O ||
      (Re !== null && cancelAnimationFrame(Re),
      (Re = requestAnimationFrame(() => {
        ;(Re = null),
          O &&
            (K && (cancelAnimationFrame(K), (K = null)),
            (O.style.left = "50%"),
            (O.style.transform = "translateX(-50%)"),
            ho(O, vt),
            Bf())
      })))
  }
  var Df = 540
  function fo() {
    return window.innerWidth < Df
  }
  function mo(e, t) {
    let n = e.querySelectorAll("[data-toolbar-label]")
    for (let o of n) o.style.display = t ? "none" : ""
    let r = e.querySelectorAll("[data-icon-button]")
    for (let o of r) o.style.padding = t ? "0 4px" : "0 8px 0 4px"
  }
  function Bf() {
    if (!Ie || !W) return
    let e = fo()
    mo(W, e), (W.style.minWidth = e ? "265px" : "490px")
  }
  function ss(e) {
    if (e.key === "Escape" && Pe) {
      let t = Date.now()
      t - es < Of ? (e.preventDefault(), e.stopPropagation(), Pe()) : (es = t)
    } else xn(e) && Ie && Ne && (e.preventDefault(), e.stopPropagation(), Ne())
  }
  function jf() {
    let e = ao()
    return e.dockPosition === "top" || e.dockPosition === "bottom"
      ? e.dockPosition
      : "top"
  }
  function zf(e) {
    Za({ dockPosition: e })
  }
  function Hf(e) {
    return e === "top" ? 16 : window.innerHeight - 40 - 16
  }
  function ho(e, t) {
    t === "top"
      ? ((e.style.top = Lf), (e.style.bottom = ""))
      : ((e.style.top = ""), (e.style.bottom = Mf))
  }
  function $f(e, t, n, r, o, i) {
    K && cancelAnimationFrame(K)
    let a = 400,
      u = 28,
      l = 1,
      s = r,
      c = o,
      d = 0,
      p = i,
      f = performance.now(),
      h = (S) => {
        let E = Math.min((S - f) / 1e3, 0.05)
        f = S
        let g = c - n,
          b = -a * g,
          C = -u * p,
          v = (b + C) / l
        ;(p += v * E), (c += p * E)
        let T = s - t,
          R = -a * T,
          B = -u * d,
          y = (R + B) / l
        ;(d += y * E),
          (s += d * E),
          (e.style.top = `${c}px`),
          (e.style.left = `${s}px`),
          (e.style.transform = "translateX(-50%)"),
          (e.style.bottom = "")
        let m = Math.abs(g) < 0.5 && Math.abs(p) < 10,
          A = Math.abs(T) < 0.5 && Math.abs(d) < 10
        m && A
          ? (ho(e, vt),
            (e.style.left = "50%"),
            (e.style.transform = "translateX(-50%)"),
            (K = null))
          : (K = requestAnimationFrame(h))
      }
    K = requestAnimationFrame(h)
  }
  function ts(e) {
    var a, u, l, s
    if (!O) return
    let t = e.target
    if (t.tagName === "BUTTON" || t.closest("button")) return
    kt = !0
    let n =
        "touches" in e
          ? (u = (a = e.touches[0]) == null ? void 0 : a.clientX) != null
            ? u
            : 0
          : e.clientX,
      r =
        "touches" in e
          ? (s = (l = e.touches[0]) == null ? void 0 : l.clientY) != null
            ? s
            : 0
          : e.clientY,
      o = O.getBoundingClientRect(),
      i = o.left + o.width / 2
    ;(ns = n),
      (rs = r),
      (os = i),
      (is = o.top),
      (po = i),
      (An = o.top),
      (uo = r),
      (co = performance.now()),
      (wt = 0),
      K && (cancelAnimationFrame(K), (K = null)),
      (O.style.left = `${i}px`),
      (O.style.top = `${o.top}px`),
      (O.style.bottom = ""),
      (O.style.transform = "translateX(-50%)"),
      (O.style.cursor = "grabbing"),
      (O.style.transition = "none"),
      e.preventDefault()
  }
  function _n(e) {
    var p, f, h, S
    if (!kt || !O) return
    let t =
        "touches" in e
          ? (f = (p = e.touches[0]) == null ? void 0 : p.clientX) != null
            ? f
            : 0
          : e.clientX,
      n =
        "touches" in e
          ? (S = (h = e.touches[0]) == null ? void 0 : h.clientY) != null
            ? S
            : 0
          : e.clientY,
      r = t - ns,
      o = n - rs,
      i = os + r,
      a = is + o,
      u = -20,
      l = window.innerHeight - 20,
      s = a
    if (a < 0) s = a * 0.3
    else if (a > window.innerHeight - 40) {
      let E = a - (window.innerHeight - 40)
      s = window.innerHeight - 40 + E * 0.3
    } else s = Math.max(u, Math.min(l, a))
    ;(po = i), (An = s), (O.style.left = `${i}px`), (O.style.top = `${s}px`)
    let c = performance.now(),
      d = c - co
    d > 0 && (wt = ((n - uo) / d) * 1e3), (uo = n), (co = c), e.preventDefault()
  }
  function Rn() {
    if (!kt || !O) return
    ;(kt = !1), (O.style.cursor = "")
    let e = window.innerHeight / 2,
      t = 500,
      n
    wt < -t
      ? (n = "top")
      : wt > t
        ? (n = "bottom")
        : (n = An < e ? "top" : "bottom"),
      (vt = n),
      zf(n)
    let r = window.innerWidth / 2,
      o = Hf(n)
    $f(O, r, o, po, An, wt)
  }
  function Uf(e) {
    e.addEventListener("mousedown", ts),
      document.addEventListener("mousemove", _n),
      document.addEventListener("mouseup", Rn),
      e.addEventListener("touchstart", ts, { passive: !1 }),
      document.addEventListener("touchmove", _n, { passive: !1 }),
      document.addEventListener("touchend", Rn),
      window.addEventListener("resize", as),
      document.addEventListener("keydown", ss, !0)
  }
  function Wf() {
    document.removeEventListener("mousemove", _n),
      document.removeEventListener("mouseup", Rn),
      document.removeEventListener("touchmove", _n),
      document.removeEventListener("touchend", Rn),
      window.removeEventListener("resize", as),
      document.removeEventListener("keydown", ss, !0),
      Re !== null && (cancelAnimationFrame(Re), (Re = null))
  }
  function Xe() {
    if ((we && (clearTimeout(we), (we = null)), V && _e && W))
      return (
        (W.style.animation = "none"), { host: V, shadowRoot: _e, toolbar: W }
      )
    ;(vt = jf()),
      (V = document.createElement("div")),
      (V.id = If),
      (_e = V.attachShadow({ mode: "closed" }))
    let e = document.createElement("style")
    return (
      (e.textContent =
        "@keyframes spin{to{transform:rotate(360deg)}}@keyframes pop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes fade{to{opacity:0;transform:scale(.8)}}"),
      _e.appendChild(e),
      (O = document.createElement("div")),
      M(O, {
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "2147483647",
        cursor: "grab",
        userSelect: "none",
      }),
      ho(O, vt),
      (W = document.createElement("div")),
      M(W, {
        display: "flex",
        alignItems: "center",
        width: "max-content",
        minWidth: "265px",
        height: _.toolbarHeight,
        padding: "0 8px",
        borderRadius: _.toolbarBorderRadius,
        background: _.bg,
        boxShadow: _.shadow,
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        animation: "pop .3s ease-out",
        fontFamily: _.fontFamily,
        fontSize: _.fontSize,
        fontWeight: _.fontWeight,
        lineHeight: _.lineHeight,
        letterSpacing: _.letterSpacing,
      }),
      W.addEventListener("mousedown", (t) => {
        let n = t.target
        ;(n.tagName === "BUTTON" || n.closest("button")) && t.preventDefault()
      }),
      O.appendChild(W),
      _e.appendChild(O),
      Uf(O),
      qa(V),
      { host: V, shadowRoot: _e, toolbar: W }
    )
  }
  function go(e) {
    return !e || !V ? !1 : V.contains(e) || e === V
  }
  function se() {
    ;(Ie = !1),
      (Pe = null),
      (Ne = null),
      lo(),
      we && (clearTimeout(we), (we = null)),
      K && (cancelAnimationFrame(K), (K = null)),
      W &&
        V &&
        (M(W, { animation: `fade ${Qa}ms ease-out forwards` }),
        (we = setTimeout(() => {
          V &&
            (Wf(), V.remove(), (V = null), (_e = null), (W = null), (O = null)),
            (we = null)
        }, Qa)))
  }
  function Vf(e, t = !1, n = !1) {
    let r = document.createElement("span")
    return (
      (r.textContent = e),
      M(r, {
        flexGrow: "1",
        textAlign: "left",
        paddingLeft: t ? "8px" : "4px",
        paddingRight: n ? "8px" : "4px",
        color: _.text,
        whiteSpace: "nowrap",
      }),
      r
    )
  }
  function Le(e) {
    var c, d
    ;(Ie = !1),
      (Pe = (d = (c = e.onEscape) != null ? c : e.onClose) != null ? d : null),
      (Ne = null)
    let t = !W,
      { toolbar: n, shadowRoot: r } = Xe(),
      o = !!e.icon,
      i = e.buttons || (e.button ? [e.button] : []),
      a = i.length > 0,
      u = !!e.onClose,
      l = []
    if (e.icon) {
      let p = {
          spinner: { name: "icon.24.spinner", color: _.text, isSpinner: !0 },
          check: { name: "icon.24.check", color: _.success, isSpinner: !1 },
          error: { name: "icon.24.warning", color: _.error, isSpinner: !1 },
        },
        { name: f, color: h, isSpinner: S } = p[e.icon],
        E = Ct(f, h, S)
      E.setAttribute("data-toolbar-role", "icon"), l.push(E)
    }
    let s = Vf(e.message, !o, !a && !u)
    s.setAttribute("data-toolbar-role", "message"), l.push(s)
    for (let p of i) {
      let f = io(p.text, p.onClick, p.variant, p.disabled, p.isLoading)
      f.setAttribute("data-toolbar-role", "button"), l.push(f)
    }
    if (e.onClose) {
      let p = yo(e.onClose)
      p.setAttribute("data-toolbar-role", "button"), l.push(p)
    }
    return t ? n.replaceChildren(...l) : St(n, r, l), n
  }
  function xt(e) {
    Le({
      icon: "spinner",
      message: D("capturing"),
      button: e
        ? { text: D("cancel"), onClick: e, variant: "secondary" }
        : void 0,
      onEscape: e,
    })
  }
  function qe(e) {
    Le({
      icon: "check",
      message: D("captureSubmitted"),
      button: {
        text: D("openInFigma"),
        onClick: () => {
          window.open(e != null ? e : "https://www.figma.com", "_blank"), se()
        },
        variant: "secondary",
      },
    })
  }
  function Nn() {
    Le({ icon: "spinner", message: D("capturingForClipboard") })
  }
  function Tt(e) {
    let t
    e instanceof ae
      ? (t = D(e.translationKey))
      : e instanceof Error
        ? (t = e.message)
        : (t = e || D("error")),
      Le({ icon: "error", message: t, onClose: () => se() })
  }
  function Et(e, t, n) {
    let r = document.createElement("button")
    ;(r.type = "button"), r.setAttribute("data-icon-button", "")
    let o = Ct(e, _.text),
      i = document.createElement("span")
    return (
      (i.textContent = t),
      i.setAttribute("data-toolbar-label", ""),
      M(i, { marginLeft: "4px" }),
      r.appendChild(o),
      r.appendChild(i),
      M(r, {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: _.buttonHeight,
        padding: "0 8px 0 4px",
        border: "none",
        borderRadius: _.buttonBorderRadius,
        background: "transparent",
        color: _.text,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background .1s",
      }),
      (r.onmouseenter = () => (r.style.background = _.secondaryHover)),
      (r.onmouseleave = () => (r.style.background = "transparent")),
      (r.onmousedown = () => (r.style.background = _.secondaryPressed)),
      (r.onmouseup = () => (r.style.background = _.secondaryHover)),
      (r.onclick = n),
      r
    )
  }
  function Pn() {
    let e = document.createElement("div")
    return (
      M(e, {
        width: "1px",
        alignSelf: "stretch",
        background: _.border,
        flexShrink: "0",
      }),
      e
    )
  }
  function yo(e) {
    let t = document.createElement("button")
    ;(t.type = "button"), t.setAttribute("aria-label", D("cancel"))
    let n = Ct("icon.24.close.large", _.text)
    return (
      t.appendChild(n),
      M(t, {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: _.buttonHeight,
        height: _.buttonHeight,
        padding: "0",
        border: "none",
        borderRadius: _.buttonBorderRadius,
        background: "transparent",
        color: _.text,
        cursor: "pointer",
        transition: "background .1s",
        marginLeft: "8px",
      }),
      (t.onmouseenter = () => (t.style.background = _.secondaryHover)),
      (t.onmouseleave = () => (t.style.background = "transparent")),
      (t.onmousedown = () => (t.style.background = _.secondaryPressed)),
      (t.onmouseup = () => (t.style.background = _.secondaryHover)),
      (t.onclick = e),
      t
    )
  }
  function Ye(e) {
    ;(Ie = !0), (Pe = e.onClose), (Ne = e.onCapturePage)
    let { toolbar: t, shadowRoot: n } = Xe(),
      r = [],
      o = document.createElement("span")
    ;(o.textContent = D("sendToFigma")),
      o.setAttribute("data-toolbar-role", "message"),
      M(o, {
        flexGrow: "1",
        textAlign: "left",
        padding: "0 12px 0 4px",
        color: _.text,
        whiteSpace: "nowrap",
      }),
      r.push(o),
      r.push(Pn())
    let i = document.createElement("div")
    i.setAttribute("data-toolbar-role", "button"),
      M(i, {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginLeft: "8px",
        marginRight: "8px",
      }),
      i.appendChild(Et("icon.24.browser", D("capturePage"), e.onCapturePage)),
      i.appendChild(
        Et("icon.24.interaction.click", D("selectElement"), e.onSelectElement),
      ),
      i.appendChild(Et("icon.24.new.tab", D("openFile"), e.onOpenFile)),
      r.push(i),
      r.push(Pn())
    let a = yo(e.onClose)
    a.setAttribute("data-toolbar-role", "button"), r.push(a)
    let u = fo()
    mo(i, u), St(t, n, r, { minWidth: u ? "265px" : "490px" })
  }
  function ls(e) {
    ;(Ie = !0), (Pe = e.onClose), (Ne = e.onCapturePage)
    let { toolbar: t, shadowRoot: n } = Xe(),
      r = [],
      o = document.createElement("span")
    ;(o.textContent = D("copyToClipboard")),
      o.setAttribute("data-toolbar-role", "message"),
      M(o, {
        textAlign: "left",
        padding: "0 12px 0 4px",
        color: _.text,
        whiteSpace: "nowrap",
      }),
      r.push(o),
      r.push(Pn())
    let i = document.createElement("div")
    i.setAttribute("data-toolbar-role", "button"),
      M(i, {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginLeft: "8px",
        marginRight: "8px",
      }),
      i.appendChild(Et("icon.24.browser", D("capturePage"), e.onCapturePage)),
      i.appendChild(
        Et("icon.24.interaction.click", D("selectElement"), e.onSelectElement),
      ),
      r.push(i),
      r.push(Pn())
    let a = yo(e.onClose)
    a.setAttribute("data-toolbar-role", "button"), r.push(a)
    let u = fo()
    mo(i, u), St(t, n, r)
  }
  function us(e) {
    ;(Ie = !1), (Pe = null), (Ne = null)
    let { toolbar: t, shadowRoot: n } = Xe(),
      r = [],
      o = Ct("icon.24.interaction.click", _.text)
    o.setAttribute("data-toolbar-role", "icon"), r.push(o)
    let i = document.createElement("span")
    ;(i.textContent = D("selectElementToCapture")),
      i.setAttribute("data-toolbar-role", "message"),
      M(i, {
        flexGrow: "1",
        textAlign: "left",
        padding: "0 8px",
        color: _.text,
        whiteSpace: "nowrap",
      }),
      r.push(i)
    let a = io(D("cancel"), e, "secondary")
    a.setAttribute("data-toolbar-role", "button"),
      r.push(a),
      St(t, n, r, { minWidth: "265px" })
  }
  var G = null,
    $ = null,
    Oe = null,
    Ft = null,
    Ln = null,
    Me = null
  function Kf(e) {
    if (e === document.body) return "body"
    if (e === document.documentElement) return "html"
    if (e.id) return `#${CSS.escape(e.id)}`
    if (e.classList.length > 0)
      for (let r of e.classList) {
        let o = `.${CSS.escape(r)}`
        if (document.querySelectorAll(o).length === 1) return o
      }
    let t = [],
      n = e
    for (; n && n !== document.body && n !== document.documentElement; ) {
      let r = n.tagName.toLowerCase()
      if (n.id) {
        ;(r = `#${CSS.escape(n.id)}`), t.unshift(r)
        break
      }
      let o = n.parentElement
      if (o) {
        let i = Array.from(o.children).filter((a) => a.tagName === n.tagName)
        if (i.length > 1) {
          let a = i.indexOf(n) + 1
          r += `:nth-of-type(${a})`
        }
      }
      t.unshift(r), (n = n.parentElement)
    }
    return t.join(" > ")
  }
  function Gf(e) {
    let t = e.tagName.toLowerCase()
    return (
      e.id
        ? (t += `#${e.id}`)
        : e.classList.length > 0 &&
          ((t += `.${Array.from(e.classList).slice(0, 2).join(".")}`),
          e.classList.length > 2 && (t += "...")),
      t.length > 40 && (t = t.slice(0, 37) + "..."),
      t
    )
  }
  function cs() {
    if (Oe && Ft) {
      let e = Kf(Oe),
        t = Ft
      hs(),
        (Ft = null),
        (Ln = null),
        (Oe = null),
        G && Zf(G),
        $ && ($.style.display = "none"),
        t(e)
    }
  }
  function ds() {
    let e = Ln
    gs(), e && e()
  }
  function Xf() {
    us(() => ds())
    let { shadowRoot: e } = Xe()
    ;(Me = document.createElement("style")),
      (Me.id = "__figma_capture_cursor_style__"),
      (Me.textContent = "* { cursor: crosshair !important; }"),
      document.head.appendChild(Me),
      (G = document.createElement("div")),
      M(G, {
        position: "fixed",
        pointerEvents: "none",
        border: `2px dashed ${_.brand}`,
        background: _.brandBg,
        borderRadius: _.highlightBorderRadius,
        zIndex: "2147483645",
        display: "none",
        boxSizing: "border-box",
      }),
      e.appendChild(G),
      ($ = document.createElement("div")),
      M($, {
        position: "fixed",
        pointerEvents: "none",
        background: _.text,
        color: _.bg,
        padding: "4px 8px",
        borderRadius: _.tooltipBorderRadius,
        fontSize: _.fontSize,
        fontFamily: _.fontFamily,
        fontWeight: "500",
        zIndex: "2147483646",
        display: "none",
        whiteSpace: "nowrap",
        boxShadow: _.tooltipShadow,
      }),
      e.appendChild($)
  }
  function qf(e, t) {
    let o,
      i = window.innerHeight - e.bottom - 8,
      a = e.top - 56 - 8
    i >= t.height
      ? (o = e.bottom + 8)
      : a >= t.height
        ? (o = e.top - t.height - 8)
        : e.height > t.height + 8 * 2
          ? (o = e.bottom - t.height - 8)
          : (o = Math.max(
              56 + 8,
              Math.min(e.bottom + 8, window.innerHeight - t.height - 8),
            ))
    let u = e.left
    return (
      u + t.width > window.innerWidth - 8 &&
        (u = window.innerWidth - t.width - 8),
      u < 8 && (u = 8),
      { top: o, left: u }
    )
  }
  function Yf(e) {
    if (!G || !$) return
    if (!e) {
      ;(G.style.display = "none"), ($.style.display = "none"), (Oe = null)
      return
    }
    let t = e.getBoundingClientRect()
    M(G, {
      display: "block",
      top: `${t.top}px`,
      left: `${t.left}px`,
      width: `${t.width}px`,
      height: `${t.height}px`,
    }),
      ($.textContent = Gf(e)),
      ($.style.display = "block")
    let n = $.getBoundingClientRect(),
      { top: r, left: o } = qf(t, n)
    M($, { top: `${r}px`, left: `${o}px` }), (Oe = e)
  }
  function ps(e) {
    var r
    let n =
      (r = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((o) => !go(o))) != null
        ? r
        : null
    n && n !== Oe && Yf(n)
  }
  function fs(e) {
    go(e.target) || (e.preventDefault(), e.stopPropagation(), cs())
  }
  function ms(e) {
    e.key === "Escape"
      ? (e.preventDefault(), ds())
      : xn(e) && (e.preventDefault(), cs())
  }
  var Je = "cubic-bezier(0.15, 1, 0.4, 1)",
    bo = 300,
    Jf = 600,
    In = 300
  function Zf(e) {
    ;(e.style.transition = `border ${bo}ms ${Je}, box-shadow ${bo}ms ${Je}`),
      (e.style.border = `2px solid ${_.brand}`),
      (e.style.boxShadow = `0 0 0 4px ${_.brandBg}`),
      setTimeout(() => {
        ;(e.style.transition = `box-shadow ${Jf}ms ${Je}`),
          (e.style.boxShadow = `0 0 0 0px ${_.brandBg}`)
      }, bo)
  }
  function hs() {
    document.removeEventListener("mousemove", ps, !0),
      document.removeEventListener("click", fs, !0),
      document.removeEventListener("keydown", ms, !0),
      Me && (Me.remove(), (Me = null))
  }
  function gs() {
    hs(),
      G && (G.remove(), (G = null)),
      $ && ($.remove(), ($ = null)),
      (Oe = null),
      (Ft = null),
      (Ln = null)
  }
  function Mn(e, t) {
    gs(),
      (Ft = e),
      (Ln = t),
      Xf(),
      document.addEventListener("mousemove", ps, !0),
      document.addEventListener("click", fs, !0),
      document.addEventListener("keydown", ms, !0)
  }
  function ge() {
    if (G) {
      let e = G
      ;(G = null),
        (e.style.transition = `opacity ${In}ms ${Je}, border-color ${In}ms ${Je}, box-shadow ${In}ms ${Je}`),
        (e.style.opacity = "0"),
        e.addEventListener("transitionend", () => e.remove(), { once: !0 }),
        setTimeout(() => e.remove(), In + 50)
    }
    $ && ($.remove(), ($ = null))
  }
  var lg = {
    PAGE_NOT_RESPONDING: "errorPageNotResponding",
    VIDEO_TIMEOUT: "errorTimeout",
  }
  function ug(e) {
    let t = lg[e.code]
    return new ae(e.message, t)
  }
  var yu = "[Figma Capture]",
    bu = 6e4,
    P = {
      verbose: !1,
      log: (...e) => {
        P.verbose && console.log(yu, ...e)
      },
      error: (...e) => {
        P.verbose && console.error(yu, ...e)
      },
    }
  function Ce(e) {
    return e instanceof Error ? e.message : String(e)
  }
  function cg() {
    return x(this, null, function* () {
      document.readyState === "loading" &&
        (P.log("Waiting for DOM to be ready..."),
        yield new Promise((e) =>
          document.addEventListener("DOMContentLoaded", e),
        ))
    })
  }
  function dg(e) {
    let t = new AbortController(),
      n = e,
      r = document.hidden ? null : Date.now(),
      o = r ? a() : null
    function i() {
      document.removeEventListener("visibilitychange", u),
        o !== null && (clearTimeout(o), (o = null))
    }
    function a() {
      return setTimeout(() => {
        i(), t.abort()
      }, n)
    }
    function u() {
      document.hidden
        ? o !== null &&
          (clearTimeout(o),
          (o = null),
          (n -= Date.now() - (r != null ? r : Date.now())),
          (r = null))
        : o === null && n > 0 && ((r = Date.now()), (o = a()))
    }
    return (
      document.addEventListener("visibilitychange", u),
      t.signal.addEventListener("abort", i, { once: !0 }),
      t.signal
    )
  }
  function Ut(e = "body", t = !1) {
    return x(this, null, function* () {
      yield cg()
      let n =
        e === "body" || e === "html" ? document : document.querySelector(e)
      if (!n) throw new Error(`Element not found: ${e}`)
      P.log("Serializing DOM...")
      let r
      if (t)
        try {
          r = (yield Promise.resolve().then(() => (gu(), hu))).createDevtools()
        } catch (u) {
          P.error(
            "Failed to load source-data extractor, continuing without it:",
            u,
          )
        }
      let o
      try {
        let u = dg(1e4)
        o = yield Va(n, { timeoutSignal: u, devtools: r })
      } catch (u) {
        throw u instanceof xe ? ug(u) : u
      } finally {
        r == null || r.destroy()
      }
      P.log("Converting to JSON...")
      let i = yield Qr(o),
        a = Math.round(i.length / 1024)
      return P.log(`Payload size: ${a} KB`), i
    })
  }
  function wu(e, t, n, r = 0) {
    return x(this, null, function* () {
      P.log("Sending captures to Figma...")
      let o = Math.round(e.length / 1024)
      P.log(`Sending capture, total size: ${o} KB`)
      let i = n.replace(/\/capture\/[^/]+\/submit/, `/capture/${t}/submit`),
        a = new AbortController(),
        u = setTimeout(() => a.abort(), bu)
      try {
        let l = yield fetch(i, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captureId: t, payload: e, captureIndex: r }),
          signal: a.signal,
        })
        if ((clearTimeout(u), !l.ok)) {
          let d, p
          try {
            let f = yield l.json()
            f.errorCode
              ? ((p = {
                  CAPTURE_EXPIRED: "errorCaptureExpired",
                  CAPTURE_NOT_FOUND: "errorCaptureNotFound",
                  ACCESS_DENIED: "errorAccessDenied",
                  CAPTURE_ID_ALREADY_SUBMITTED: "errorCaptureAlreadySubmitted",
                }[f.errorCode]),
                (d = p ? D(p) : f.errorCode))
              : (d = f.error || l.statusText)
          } catch (f) {
            d = yield l.text().catch(() => l.statusText)
          }
          throw (
            (P.error(`Server error (${l.status}): ${d}`),
            p ? new ae(d, p) : new Error(d))
          )
        }
        let s = yield l.json()
        if (s.error)
          throw (P.error("Capture failed:", s.error), new Error(s.error))
        P.log("Success! Page has been captured and sent to Figma.")
        let c = s.claimUrl || s.fileUrl
        return (
          c && P.log(`Open your file: ${c}`),
          { claimUrl: c, nextCaptureId: s.nextCaptureId }
        )
      } catch (l) {
        throw (
          (clearTimeout(u),
          l instanceof Error && l.name === "AbortError"
            ? new ae(
                `Request timed out after ${bu / 1e3} seconds`,
                "errorTimeout",
              )
            : l)
        )
      }
    })
  }
  function Cu() {
    return x(this, null, function* () {
      document.hasFocus() ||
        (P.log("Document not focused, waiting for focus..."),
        yield new Promise((e) => {
          window.addEventListener("focus", () => e(), { once: !0 })
        }),
        P.log("Document focused, proceeding with clipboard copy"))
    })
  }
  function li(e) {
    return x(this, null, function* () {
      var t
      if (
        ((t = window.figma) == null ? void 0 : t.useHtmlClipboardEncoding) !==
        !1
      ) {
        let n = "mcp",
          r = new Date().toISOString(),
          i = yield no(e, {
            dataType: "h2d",
            source: n,
            capturedAtIso: r,
            h2d: { v: 1, origin: { source: n, capturedAtIso: r } },
          })
        yield Cu()
        let a = new ClipboardItem({ "text/html": i })
        yield navigator.clipboard.write([a])
      } else yield Cu(), yield navigator.clipboard.writeText(e)
    })
  }
  function Eu(e, t = !1) {
    let n,
      r = new Promise((c) => {
        n = c
      }),
      o = null,
      i = () => {
        o && (clearTimeout(o), (o = null)), se(), n({ success: !0 })
      },
      a = () => {
        o && (clearTimeout(o), (o = null)),
          ls({ onCapturePage: () => void l(), onSelectElement: s, onClose: i })
      },
      u = () => {
        o && (clearTimeout(o), (o = null)),
          Le({ icon: "check", message: D("clipboardSuccess"), onClose: a }),
          (o = setTimeout(a, 3e3))
      },
      l = () =>
        x(this, null, function* () {
          Nn()
          try {
            let c = yield Ut(e, t)
            yield li(c), u()
          } catch (c) {
            let d = Ce(c)
            P.error("Clipboard capture error:", d),
              Tt(d),
              n({ success: !1, error: d })
          }
        }),
      s = () => {
        Mn(
          (c) =>
            x(this, null, function* () {
              Nn()
              try {
                let d = yield Ut(c, t)
                yield li(d), ge(), u()
              } catch (d) {
                let p = Ce(d)
                P.error("Clipboard capture error:", p),
                  ge(),
                  Tt(p),
                  n({ success: !1, error: p })
              }
            }),
          () => a(),
        )
      }
    return { promise: r, showSuccess: u, showClipboardBar: a, done: i }
  }
  function fe(e, t = !1) {
    let n = D("sendToFigmaFailed")
    e instanceof ae && (n = D(e.translationKey))
    let { promise: r, showClipboardBar: o, done: i } = Eu("body", t)
    return (
      Le({
        icon: "error",
        message: n,
        button: { text: D("copyInstead"), onClick: o, variant: "secondary" },
        onClose: i,
      }),
      r
    )
  }
  function vu(e, t, n = "body", r, o, i = !1) {
    return x(this, null, function* () {
      ;(P.verbose = o != null ? o : !1),
        P.log("Starting streaming multi-capture flow...", {
          captureId: e,
          selector: n,
          delayMs: r,
        })
      let a = e,
        u = 0,
        l = !1,
        s = !1,
        c,
        d = () => {
          ;(s = !0), P.log("Capture cancelled by user"), se()
        },
        p = (f) =>
          x(this, null, function* () {
            let h = yield Ut(f, i),
              S = u
            if ((u++, s)) return { success: !1, error: "cancelled" }
            let E = yield wu(h, a, t, S)
            return s
              ? { success: !1, error: "cancelled" }
              : (E.nextCaptureId &&
                  ((a = E.nextCaptureId),
                  P.log("Updated captureId for next submission:", a)),
                {
                  success: !0,
                  claimUrl: E.claimUrl,
                  nextCaptureId: E.nextCaptureId,
                })
          })
      try {
        if (
          (xt(d),
          r &&
            r > 0 &&
            (P.log(`Waiting ${r}ms before capture...`),
            yield new Promise((h) => setTimeout(h, r))),
          s)
        )
          return { success: !1, cancelled: !0 }
        let f = yield p(n)
        return f.success
          ? ((c = f.claimUrl),
            P.log("First capture submitted", { captureCount: u, claimUrl: c }),
            yield new Promise((h) => {
              let S = null,
                E = () => {
                  S && (clearTimeout(S), (S = null)), se(), h({ success: !0 })
                },
                g = () =>
                  x(this, null, function* () {
                    var v
                    if (!l) {
                      l = !0
                      try {
                        xt(d)
                        let T = yield p("body")
                        if (!T.success) {
                          if (s) {
                            h({ success: !1, cancelled: !0 })
                            return
                          }
                          ;(l = !1), fe(T.error, i).then(h)
                          return
                        }
                        ;(c = (v = T.claimUrl) != null ? v : c),
                          (l = !1),
                          P.log("Additional capture submitted", {
                            captureCount: u,
                          }),
                          qe(c),
                          (S = setTimeout(() => {
                            Ye({
                              onCapturePage: () => void g(),
                              onSelectElement: b,
                              onOpenFile: C,
                              onClose: E,
                            })
                          }, 3e3))
                      } catch (T) {
                        if (s) {
                          h({ success: !1, cancelled: !0 })
                          return
                        }
                        let R = Ce(T)
                        P.error("Capture error:", R), (l = !1), fe(T, i).then(h)
                      }
                    }
                  }),
                b = () => {
                  l ||
                    Mn(
                      (v) =>
                        x(this, null, function* () {
                          var T
                          if (!l) {
                            l = !0
                            try {
                              xt(d)
                              let R = yield p(v)
                              if (!R.success) {
                                if (s) {
                                  h({ success: !1, cancelled: !0 })
                                  return
                                }
                                ;(l = !1), ge(), fe(R.error, i).then(h)
                                return
                              }
                              ;(c = (T = R.claimUrl) != null ? T : c),
                                (l = !1),
                                P.log("Element capture submitted", {
                                  captureCount: u,
                                  selector: v,
                                }),
                                qe(c),
                                (S = setTimeout(() => {
                                  ge(),
                                    Ye({
                                      onCapturePage: () => void g(),
                                      onSelectElement: b,
                                      onOpenFile: C,
                                      onClose: E,
                                    })
                                }, 3e3))
                            } catch (R) {
                              if (s) {
                                h({ success: !1, cancelled: !0 })
                                return
                              }
                              let B = Ce(R)
                              P.error("Capture error:", B),
                                (l = !1),
                                ge(),
                                fe(R, i).then(h)
                            }
                          }
                        }),
                      () => {
                        Ye({
                          onCapturePage: () => void g(),
                          onSelectElement: b,
                          onOpenFile: C,
                          onClose: E,
                        })
                      },
                    )
                },
                C = () => {
                  c && window.open(c, "_blank")
                }
              qe(c),
                (S = setTimeout(() => {
                  Ye({
                    onCapturePage: () => void g(),
                    onSelectElement: b,
                    onOpenFile: C,
                    onClose: E,
                  })
                }, 3e3))
            }))
          : s
            ? { success: !1, cancelled: !0 }
            : yield fe(f.error, i)
      } catch (f) {
        if (s) return { success: !1, cancelled: !0 }
        let h = Ce(f)
        return P.error("Error:", h), yield fe(f, i)
      }
    })
  }
  function pg(e, t, n, r = !1) {
    return x(this, null, function* () {
      ;(P.verbose = n != null ? n : !1),
        P.log("Starting multi-capture selection flow...", { captureId: e })
      let o = e,
        i = 0,
        a = !1,
        u = !1,
        l,
        s = () => {
          ;(u = !0), P.log("Capture cancelled by user"), se()
        },
        c = (d) =>
          x(this, null, function* () {
            let p = yield Ut(d, r),
              f = i
            if ((i++, u)) return { success: !1, error: "cancelled" }
            let h = yield wu(p, o, t, f)
            return u
              ? { success: !1, error: "cancelled" }
              : (h.nextCaptureId &&
                  ((o = h.nextCaptureId),
                  P.log("Updated captureId for next submission:", o)),
                {
                  success: !0,
                  claimUrl: h.claimUrl,
                  nextCaptureId: h.nextCaptureId,
                })
          })
      return new Promise((d) => {
        let p = null,
          f = () => {
            p && (clearTimeout(p), (p = null)), se(), d({ success: !0 })
          },
          h = () => {
            l && window.open(l, "_blank")
          },
          S = () => {
            Ye({
              onCapturePage: () => void E(),
              onSelectElement: () => void g(),
              onOpenFile: h,
              onClose: f,
            })
          },
          E = () =>
            x(this, null, function* () {
              var b
              if (!a) {
                a = !0
                try {
                  let C = yield c("body")
                  if (!C.success) {
                    if (u) {
                      d({ success: !1, cancelled: !0 })
                      return
                    }
                    ;(a = !1), fe(C.error, r).then(d)
                    return
                  }
                  ;(l = (b = C.claimUrl) != null ? b : l),
                    (a = !1),
                    P.log("Additional capture submitted", { captureCount: i }),
                    qe(l),
                    (p = setTimeout(S, 3e3))
                } catch (C) {
                  if (u) {
                    d({ success: !1, cancelled: !0 })
                    return
                  }
                  let v = Ce(C)
                  P.error("Capture error:", v), (a = !1), fe(C, r).then(d)
                }
              }
            }),
          g = () => {
            a ||
              Mn(
                (b) =>
                  x(this, null, function* () {
                    var C
                    if (!a) {
                      a = !0
                      try {
                        xt(s)
                        let v = yield c(b)
                        if (!v.success) {
                          if (u) {
                            d({ success: !1, cancelled: !0 })
                            return
                          }
                          ;(a = !1), ge(), fe(v.error, r).then(d)
                          return
                        }
                        ;(l = (C = v.claimUrl) != null ? C : l),
                          (a = !1),
                          P.log("Element capture submitted", {
                            captureCount: i,
                            selector: b,
                          }),
                          qe(l),
                          (p = setTimeout(() => {
                            ge(), S()
                          }, 3e3))
                      } catch (v) {
                        if (u) {
                          d({ success: !1, cancelled: !0 })
                          return
                        }
                        let T = Ce(v)
                        P.error("Capture error:", T),
                          (a = !1),
                          ge(),
                          fe(v, r).then(d)
                      }
                    }
                  }),
                () => {
                  i > 0 ? S() : f()
                },
              )
          }
        g()
      })
    })
  }
  function Su(e) {
    return x(this, null, function* () {
      let {
        captureId: t,
        endpoint: n,
        selector: r = "body",
        verbose: o = !1,
        delayMs: i,
        extractSourceData: a = !1,
      } = e
      if (((P.verbose = o), n && !t))
        return (
          P.error("captureId is required for file mode"),
          { success: !1, error: "captureId is required for file mode" }
        )
      if (n) return vu(t, n, r, i, o, a)
      P.log("Starting clipboard capture...", { selector: r }),
        Nn(),
        i &&
          i > 0 &&
          (P.log(`Waiting ${i}ms before capture...`),
          yield new Promise((s) => setTimeout(s, i)))
      try {
        let s = yield Ut(r, a)
        P.log("Copying to clipboard...")
        try {
          yield li(s), P.log("Success! Capture copied to clipboard.")
        } catch (c) {
          let d = Ce(c)
          return (
            P.error("Clipboard error:", d),
            Tt(`Clipboard error: ${d}`),
            { success: !1, error: `Clipboard error: ${d}` }
          )
        }
      } catch (s) {
        let c = Ce(s)
        return (
          P.error("Error:", c),
          c.includes("Element not found")
            ? se()
            : Tt(s instanceof Error ? s : c),
          { success: !1, error: c }
        )
      }
      let { promise: u, showSuccess: l } = Eu(r, a)
      return l(), u
    })
  }
  typeof window != "undefined" &&
    (window.figma || (window.figma = {}),
    (window.figma.captureForDesign = Su),
    Xa({
      startMultiCaptureAutomaticFlow: vu,
      startClipboardFlow: (e, t, n) =>
        Su({ selector: e, delayMs: t, verbose: n }),
      startMultiCaptureSelectionFlow: pg,
    }))
})()
//# sourceMappingURL=capture.min.js.map
