// namespace issue
parser = markdown;
renderLatex = renderMathInElement;
let filePath = null;
const exitPopup = document.querySelector("#exit-popup");
const popup = document.querySelector(".popup-container");
const popupOverlay = document.querySelector("#popup-overlay");

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
  if (urlParams.has("path")) {
    path = urlParams.get("path");
  }

  // if empty: path -> null
  return path;
}

function getPwd() {
  let path = getQueryPath();
  let segs = path.split("/");
  let pwd = "";
  for (let i = 0; i < segs.length - 1; i++) {
    pwd += segs[i] + "/";
  }
  return pwd;
}

async function renderMd(path) {
  // Get markdown element
  $("#markdown").html(parser(await getText(path)));

  // dynamic title
  document.title = $("#markdown>h1").first().text();

  for (element of $("img[src]")) {
    let src = $(element).attr("src");
    try {
      new URL(src);
    } catch {
      if (!src.startsWith("/")) {
        src = getPwd() + src;
        $(element).attr("src", src);
      }
    }
  }

  for (element of $("a[href]")) {
    console.log(element);
    let href = $(element).attr("href");
    try {
      new URL(href);
    } catch {
      if (!href.startsWith("/") && href.length > 0) {
        href = getPwd() + href;
        $(element).attr("href", href);
      }
    }
  }

  $("a[href]").click(function (e) {
    let href = $(this).attr("href");
    let link = null;
    try {
      link = new URL(href);
    } catch {
      href =
        window.location.protocol + "//" + window.location.hostname + href;
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
    e.preventDefault();
    link = new URL(
      window.location.href.replace(window.location.search, "") +
      "?path=" +
      link.pathname
    );
    window.open(link, "_self");
  });
  hljs.highlightAll();
  renderLatex(document.body);
}

async function main() {
  let path = getQueryPath();
  if (path === null) {
    let response = await fetch("/index.md");
    if (response.ok) {
      window.location.replace(window.location.pathname + "?path=/index.md");
      return;
    } else {
      window.location.replace(window.location.pathname + "?path=/README.md");
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
      filePath = path;
      renderMd(path);
      return;
    } else {
      // open without saving current url to history
      window.location.replace(path);
      return;
    }
  }
}

function getFileName() {
  if (filePath == null) { return false; }

  let fileName = filePath.replace('.md', '');
  while (fileName.includes("/")) {
    fileName = fileName.substring(fileName.indexOf("/") + 1);
  }

  return fileName
}

function downloadFile(fileType) {
  const downloadLink = document.createElement("a");
  if (fileType == "markdown") {
    downloadLink.href = filePath;
    // Name the file 
    if (getFileName() !== false) { downloadLink.download = `${getFileName()}.md`; }
    else { downloadLink.download = 'download.md'; }

  } else if (fileType == "html") {
    const html = document.querySelector("html").innerHTML;
    const dataURI = "data:text/html," + encodeURIComponent(html);
    downloadLink.href = dataURI;
    // Name the file 
    downloadLink.download = `${getFileName()}.html`

  } else if (fileType == "both") {
    downloadFile("markdown");
    downloadFile("html");

  } else { return; }

  popup.style.visibility = "hidden";
  popupOverlay.style.visibility = "hidden";
  document.querySelector('body').style.overflowY = 'visible';
  downloadLink.click();
}

let keys = {
  ctrl: false,
  cmd: false,
  s: false
};

function keyChar(event) {
  return String.fromCharCode(event.which).toLowerCase();
}

$(document).bind("keydown", (event) => {

  keys.ctrl = event.ctrlKey;
  keys.cmd = event.metaKey;
  keys.s = keyChar(event) === "s";
  
  if ((keys.ctrl || keys.cmd) && keys.s) {
    event.preventDefault();
  }

  if (event.key === "Control") {
    keys.ctrl = true;
  }
  if (event.key === "s") {
    keys.s = true;
  }
  if (keys.ctrl && keys.s) {
    popup.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
    popup.style.top = window.scrollY + 'px';
    popupOverlay.style.top = window.scrollY + 'px';
    document.querySelector('body').style.overflowY = 'hidden';
  }
});

$(document).bind("keyup", (event) => {
  if (event.ctrlKey) {
    keys.ctrl = false;
  }
  if (event.metaKey) {
    keys.cmd = false;
  }
  if (keyChar(event) === "s") {
    keys.s = false;
  }
});

$(exitPopup).click(() => {
  popup.style.visibility = "hidden";
  popupOverlay.style.visibility = "hidden";
  document.querySelector('body').style.overflowY = 'visible';
});

main();