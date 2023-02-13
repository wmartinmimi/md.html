"use strict";

// namespace issue
let parser = (text) => {
  let converter = new globalThis.showdown.Converter();
  converter.setFlavor('github');
  return converter.makeHtml(text);
};
let $ = globalThis.jQuery;

// global variables
let renderable = false;
let setup_save_popup = false;
let keys = {
  ctrl: false,
  cmd: false,
  s: false
};

function getPwd() {
  let path = getQueryPath();
  let segs = path.split("/");
  let pwd = "";
  for (let i = 0; i < segs.length - 1; i++) {
    pwd += segs[i] + "/";
  }
  return pwd;
}

async function followup_addition() {
  // dynamic title
  document.title = $("#markdown>h1").first().text();

  // clear up bootstrap
  $("body>script").remove();

  $("#markdown").ready(() => {
    linkfix();
    customLinkOpen();
  })
}

async function linkfix() {
  for (let element of $("img[src]")) {
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

  for (let element of $("a[href]")) {
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
}

async function customLinkOpen() {
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
}

async function process(text) {
  // Get markdown element
  let html = parser(text);

  window.requestAnimationFrame(() => {
    $("#markdown").html(html);
    renderable = true;
    window.requestAnimationFrame(() => {
      followup_addition();

      // in save-popup.js
      setup_save_popup = true;
      if (typeof buildPopup !== "undefined") {
        buildPopup();
      }
      window.requestAnimationFrame(() => {
        // in renderer.js
        if (typeof render !== "undefined") {
          render();
        }
      })
    });
  })
}

async function entry() {
  let path = getQueryPath();
  let response = await fetch(path);
  if (response.ok) {
    process(await response.text());
    return;
  } else {
    // open without saving current url to history
    window.location.replace(path);
    return;
  }
}

if (typeof run_main !== "undefined" && run_main) {
  run_main = false;
  entry();
}