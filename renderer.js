async function render() {
  renderable = false;
  renderMathInElement(document.body);
  hljs.highlightAll();
}

if (renderable) {
  render();
}