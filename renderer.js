async function render() {
  renderable = false;
  renderMathInElement(document.body);
  hljs.highlightAll();
}

if (typeof renderable !== "undefined" && renderable) {
  render();
}
