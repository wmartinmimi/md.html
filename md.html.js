
// namespace issue
parser = markdown
renderLatex = renderMathInElement

async function getText(path) {
  let response = await fetch(path);
  if (response.ok) {
    return await response.text();
  }
  return false;
}

// Make sure it points to a markdown file
function isPathMd(path) {
  if (path.endsWith(".md") || path.endsWith(".markdown")) {
    return path;
  }
  return null;
}

function getQueryPath() {
  // Gets URL parameters 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let path = null;

  // Get URL path parameter 
  if (urlParams.has('path')) {
    path = urlParams.get('path');
  }

  // if empty: path -> null
  return path;
}

async function renderMd(path) {
  // Get markdown element
  $('#markdown').html(parser(await getText(path)));

  // dynamic title
  document.title = $('#markdown>h1').first().text();

  $('a[href]').click(function (e) {
    let href = $(this).attr('href');
    let link = null;
    try {
      link = new URL(href);
    } catch {
      if (!href.startsWith("/")) {
        console.log(path);
        let segs = path.split("/");
        let pwd = "";
        for (let i = 0; i < segs.length - 1; i++) {
          pwd += segs[i] + "/";
        }
        href = pwd + href;
      }
      href = window.location.protocol + '//' + window.location.hostname + href;
      link = new URL(href);
    }

    // if same domain
    if (link.hostname !== window.location.hostname) {
      return;
    }
    // if markdown
    if (!isPathMd(link.pathname)) {
      return;
    }
    // open markdown
    e.preventDefault()
    link = new URL(window.location.href.replace(window.location.search, '') + '?path=' + link.pathname)
    window.open(link, '_self');
  })
  hljs.highlightAll();
  renderLatex(document.body);
}

async function main() {
  let path = getQueryPath();
  if (path === null) {
    let response = await fetch('/index.md');
    if (response.ok) {
      renderMd('/index.md');
      return;
    } else {
      renderMd('/README.md');
      return;
    }
  } else {
    if (!isPathMd(path)) {
      // open without saving current url to history
      window.location.replace(path);
      return;
    }
    let response = await fetch(path);
    if (response.ok) {
      renderMd(path);
      return;
    } else {
      // open without saving current url to history
      window.location.replace(path);
      return;
    }
  }
}
main();