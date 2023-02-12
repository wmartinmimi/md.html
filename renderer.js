library_loaded = 0;
library_needed = 0;

function addSyntaxHighlight() {
  if (languages.length > 0) {
    library_needed = languages.length + 1;
    addscripts('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js', () => {
      for (lang of languages) {
        if (hljs.getLanguage(lang) === undefined) {
          console.log(lang + " | " + `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/languages/${lang}.min.js`);
          addscripts(`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/languages/${lang}.min.js`, () => {
            library_loaded += 1;
            if (library_loaded === library_loaded) {
              console.log("library : " + library_loaded);
              hljs.highlightAll();
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
  renderMathInElement(document.body);
  addSyntaxHighlight();
}

if (typeof renderable !== "undefined" && renderable) {
  render();
}
