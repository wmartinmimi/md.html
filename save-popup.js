"use strict";

function buildPopup() {
  let popup = $("<div class=\"popup\"></div>");

  let exit = $("<span>X</span>");
  exit.click(() => {
    $("#popup-overlay").css("display", "none");
    $('body').css("overflowY", 'visible');
  })

  let title = $("<h3>Save File As:</h3>");

  let container = $("<div class=\"container\"></div>");

  popup.append(exit, title, container);

  let save_markdown = $("<button>Markdown</button>");
  save_markdown.click(() => {
    downloadFile("markdown");
  })

  let save_html = $("<button>HTML</button>");
  save_html.click(() => {
    downloadFile("html");
  })

  let save_both = $("<button>Both</button>");
  save_both.click(() => {
    downloadFile("markdown");
    downloadFile("html");
  })

  container.append(save_markdown, save_html, save_both);

  $("#popup-overlay").append(popup);

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
      $("#popup-overlay").css("display", "flex");
      $("#popup-overlay").css("top", window.scrollY + 'px');
      $('body').css("overflowY", 'hidden');
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
}

function downloadFile(fileType) {
  $("#popup-overlay").css("display", "none");
  $('body').css("overflowY", 'visible');

  const downloadLink = document.createElement("a");
  if (fileType === "markdown") {
    downloadLink.href = getQueryPath();

  } else if (fileType === "html") {
    let vhtml = $('html').clone();
    vhtml.find('script').remove();
    for (let runnable of globalThis.onSaveClean ?? []) {
      runnable(vhtml[0]);
    }
    let html = "<!DOCTYPE html>" + vhtml[0].outerHTML;

    const dataURI = "data:text/html," + encodeURIComponent(html);
    downloadLink.href = dataURI;
    // Name the file 
    let fileNameSegs = (getQueryPath()).replace('.md', '').split("/");
    let fileName = fileNameSegs[fileNameSegs.length - 1];
    downloadLink.download = `${fileName}.html`

  } else if (fileType === "both") {
    downloadFile("markdown");
    downloadFile("html");
    return;
  }

  downloadLink.click();
}

function keyChar(event) {
  return String.fromCharCode(event.which).toLowerCase();
}

globalThis.onSaveClean ??= [];
globalThis.onSaveClean.push((vhtml) => {
  $(vhtml).find("#popup-overlay").remove();
})

if (typeof setup_save_popup !== "undefined" && setup_save_popup) {
  setup_save_popup = false;
  buildPopup();
}