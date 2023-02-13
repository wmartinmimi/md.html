"use strict";

let library_loaded = 0;
let library_needed = 0;

function addSyntaxHighlight() {
  let languages = []
  for (let code of $('pre>code')) {
    if (code.className === "") {
      code.className = "language-plaintext"
    } else {
      languages.push(code.className.split(" ")[0]);
    }
  }
  
  if (languages.length > 0) {
    library_needed = languages.length + 1;
    addscripts('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js', () => {
      for (let lang of languages) {
        if (globalThis.hljs.getLanguage(lang) === undefined) {
          addscripts(`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/languages/${lang}.min.js`, () => {
            library_loaded += 1;
            if (library_loaded === library_loaded) {
              globalThis.hljs.highlightAll();
            }
          })
        }
      }
    });
  }
}

function addscripts(url, callback) {
  let js = document.createElement("script");
  js.src = url;
  js.async = true;
  js.defer = false;
  js.onload = callback;
  document.head.appendChild(js);
}

async function render() {
  renderable = false;
  globalThis.renderMathInElement(document.body);
  addSyntaxHighlight();
}

if (typeof renderable !== "undefined" && renderable) {
  render();
}
