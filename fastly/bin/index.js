/*! For license information please see index.js.LICENSE.txt */
(()=>{var __webpack_modules__={"./node_modules/base-64/base64.js":function(module,exports,__webpack_require__){eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */\n;(function(root) {\n\n\t// Detect free variables `exports`.\n\tvar freeExports =  true && exports;\n\n\t// Detect free variable `module`.\n\tvar freeModule =  true && module &&\n\t\tmodule.exports == freeExports && module;\n\n\t// Detect free variable `global`, from Node.js or Browserified code, and use\n\t// it as `root`.\n\tvar freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;\n\tif (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {\n\t\troot = freeGlobal;\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\tvar InvalidCharacterError = function(message) {\n\t\tthis.message = message;\n\t};\n\tInvalidCharacterError.prototype = new Error;\n\tInvalidCharacterError.prototype.name = 'InvalidCharacterError';\n\n\tvar error = function(message) {\n\t\t// Note: the error messages used throughout this file match those used by\n\t\t// the native `atob`/`btoa` implementation in Chromium.\n\t\tthrow new InvalidCharacterError(message);\n\t};\n\n\tvar TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';\n\t// http://whatwg.org/html/common-microsyntaxes.html#space-character\n\tvar REGEX_SPACE_CHARACTERS = /[\\t\\n\\f\\r ]/g;\n\n\t// `decode` is designed to be fully compatible with `atob` as described in the\n\t// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob\n\t// The optimized base64-decoding algorithm used is based on @atk’s excellent\n\t// implementation. https://gist.github.com/atk/1020396\n\tvar decode = function(input) {\n\t\tinput = String(input)\n\t\t\t.replace(REGEX_SPACE_CHARACTERS, '');\n\t\tvar length = input.length;\n\t\tif (length % 4 == 0) {\n\t\t\tinput = input.replace(/==?$/, '');\n\t\t\tlength = input.length;\n\t\t}\n\t\tif (\n\t\t\tlength % 4 == 1 ||\n\t\t\t// http://whatwg.org/C#alphanumeric-ascii-characters\n\t\t\t/[^+a-zA-Z0-9/]/.test(input)\n\t\t) {\n\t\t\terror(\n\t\t\t\t'Invalid character: the string to be decoded is not correctly encoded.'\n\t\t\t);\n\t\t}\n\t\tvar bitCounter = 0;\n\t\tvar bitStorage;\n\t\tvar buffer;\n\t\tvar output = '';\n\t\tvar position = -1;\n\t\twhile (++position < length) {\n\t\t\tbuffer = TABLE.indexOf(input.charAt(position));\n\t\t\tbitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;\n\t\t\t// Unless this is the first of a group of 4 characters…\n\t\t\tif (bitCounter++ % 4) {\n\t\t\t\t// …convert the first 8 bits to a single ASCII character.\n\t\t\t\toutput += String.fromCharCode(\n\t\t\t\t\t0xFF & bitStorage >> (-2 * bitCounter & 6)\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t};\n\n\t// `encode` is designed to be fully compatible with `btoa` as described in the\n\t// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa\n\tvar encode = function(input) {\n\t\tinput = String(input);\n\t\tif (/[^\\0-\\xFF]/.test(input)) {\n\t\t\t// Note: no need to special-case astral symbols here, as surrogates are\n\t\t\t// matched, and the input is supposed to only contain ASCII anyway.\n\t\t\terror(\n\t\t\t\t'The string to be encoded contains characters outside of the ' +\n\t\t\t\t'Latin1 range.'\n\t\t\t);\n\t\t}\n\t\tvar padding = input.length % 3;\n\t\tvar output = '';\n\t\tvar position = -1;\n\t\tvar a;\n\t\tvar b;\n\t\tvar c;\n\t\tvar buffer;\n\t\t// Make sure any padding is handled outside of the loop.\n\t\tvar length = input.length - padding;\n\n\t\twhile (++position < length) {\n\t\t\t// Read three bytes, i.e. 24 bits.\n\t\t\ta = input.charCodeAt(position) << 16;\n\t\t\tb = input.charCodeAt(++position) << 8;\n\t\t\tc = input.charCodeAt(++position);\n\t\t\tbuffer = a + b + c;\n\t\t\t// Turn the 24 bits into four chunks of 6 bits each, and append the\n\t\t\t// matching character for each of them to the output.\n\t\t\toutput += (\n\t\t\t\tTABLE.charAt(buffer >> 18 & 0x3F) +\n\t\t\t\tTABLE.charAt(buffer >> 12 & 0x3F) +\n\t\t\t\tTABLE.charAt(buffer >> 6 & 0x3F) +\n\t\t\t\tTABLE.charAt(buffer & 0x3F)\n\t\t\t);\n\t\t}\n\n\t\tif (padding == 2) {\n\t\t\ta = input.charCodeAt(position) << 8;\n\t\t\tb = input.charCodeAt(++position);\n\t\t\tbuffer = a + b;\n\t\t\toutput += (\n\t\t\t\tTABLE.charAt(buffer >> 10) +\n\t\t\t\tTABLE.charAt((buffer >> 4) & 0x3F) +\n\t\t\t\tTABLE.charAt((buffer << 2) & 0x3F) +\n\t\t\t\t'='\n\t\t\t);\n\t\t} else if (padding == 1) {\n\t\t\tbuffer = input.charCodeAt(position);\n\t\t\toutput += (\n\t\t\t\tTABLE.charAt(buffer >> 2) +\n\t\t\t\tTABLE.charAt((buffer << 4) & 0x3F) +\n\t\t\t\t'=='\n\t\t\t);\n\t\t}\n\n\t\treturn output;\n\t};\n\n\tvar base64 = {\n\t\t'encode': encode,\n\t\t'decode': decode,\n\t\t'version': '1.0.0'\n\t};\n\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\ttrue\n\t) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n\t\t\treturn base64;\n\t\t}).call(exports, __webpack_require__, exports, module),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t}\telse { var key; }\n\n}(this));\n\n\n//# sourceURL=webpack://otto-edge/./node_modules/base-64/base64.js?")},"./src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var base_64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");\n/* harmony import */ var base_64__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base_64__WEBPACK_IMPORTED_MODULE_0__);\n/// <reference types="@fastly/js-compute" />\n\n\nconst handler = async (event) => {\n  // ENTER OTTO API KEY\n  const dict = new Dictionary("otto")\n  const ottoKey=dict.get("key") \n  const ottoHost=dict.get("apihost") \n  const siteHost=dict.get("host") \n\n\n\n  // Get the request from the client.\n  const req = event.request\n  const ottoCSPUrl=getCSPUrl(req.url, ottoHost, ottoKey)\n  console.log(ottoCSPUrl)\n  req.headers.set("Host", siteHost)\n  const apiReq = new Request(ottoCSPUrl);\n  \n\n  const apiRes = await fetch(apiReq, { backend: "origin_1"} );\n\n\n  const beresp = await fetch(req, {\n    backend: "origin_0"\n  })\n\n  if(apiRes.status == "200"){\n    const csp = await apiRes.json()\n    beresp.headers.set("content-security-policy", csp.policy);\n  }\n\n\n  // Send our response back to the client.\n  //return beresp;\n  return beresp;\n};\n\naddEventListener("fetch", event => event.respondWith(handler(event)));\n\nfunction getCSPUrl(url, ottoHost, ottoKey){\n  const revUrl = getRevsionIdURL(url, ottoHost, ottoKey)\n  if(revUrl == null){\n    return `https://${ottoHost}/csp/${ottoKey}.json`\n  }else{\n    return revUrl\n  }\n}\n\nfunction getRevsionIdURL(url, ottoHost, ottoKey){\n  const revId = getRevisionId(url)\n  if(revId){\n    return `https://${ottoHost}/csp/${ottoKey}-${revId}.json`\n  }else{\n    return null\n  }\n}\n\nfunction getRevisionId(url){\n  try{\n    if(url.indexOf("?") != -1 && url.indexOf("otto_revision_id") != -1){\n      console.log(url)\n      const qs = url.split("?")\n      if(qs.length > 1){\n        const params = qs[1].split("&")\n        console.log(params)\n        const revision = params.filter( p => p.indexOf("otto_revision_id=") != -1)\n        console.log(revision)\n        if(revision){\n          const keyValue = revision[0].split("=")\n          console.log(keyValue)\n          return keyValue[1]\n        }\n      }\n    }\n  }catch(e){\n    console.log(e)\n  }\n  return null\n}\n\n\n\n//# sourceURL=webpack://otto-edge/./src/index.js?')}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={id:t,loaded:!1,exports:{}};return __webpack_modules__[t].call(n.exports,n,n.exports,__webpack_require__),n.loaded=!0,n.exports}__webpack_require__.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return __webpack_require__.d(e,{a:e}),e},__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),__webpack_require__.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},__webpack_require__.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var __webpack_exports__=__webpack_require__("./src/index.js"),__webpack_export_target__=this;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0})})();