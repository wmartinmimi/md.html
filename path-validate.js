
function getQueryPath() {
  // Gets URL parameters
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  // Get URL path parameter
  if (urlParams.has("path")) {
    return urlParams.get("path");
  } else {
    // if empty: path -> null
    // never null if markdown displayed
    return null;
  }
}

// Make sure it points to a markdown file
function isPathMd(path) {
  if (path.endsWith(".md") || path.endsWith(".markdown")) {
    return path;
  }
  return null;
}

async function isPathValid() {
  let path = getQueryPath();
  if (path === null) {
    let response = await fetch("/index.md");
    if (response.ok) {
      window.location.replace(window.location.pathname + "?path=/index.md");
      return false;
    } else {
      window.location.replace(window.location.pathname + "?path=/README.md");
      return false;
    }
  }
  if (!isPathMd(path)) {
    // open without saving current url to history
    window.location.replace(path);
    return false;
  }
  return true;
}

// global variable
console.log("is valid: " + isPathValid());
let run_main = isPathValid();
if (typeof entry !== "undefined" && run_main) {
  entry();
}