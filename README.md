# md.html

![Images](md.html_logo.png)

Convert markdown to html on the fly, client-based js pre-styled markdown viewer.

Simple and easy to deploy.

## Quick deploy

md.html pratically have a zero-config deploy!

In your server root:

```bash
curl https://raw.githubusercontent.com/wmartinmimi/md.html/main/md.html -o index.html
```

And you can now view .md files in your server!

More information on usage can be found [here](parent/howtouse.md)

## Style

Similar to Github, with slight differences here and there.

md.html also already do latex rendering and syntax highlighting for you.

---

## Supported Markdown features

### Headings

Inline styles such as **bold**, _italic_, **_both_**, ~~strikethrough~~, `monospace`.

> Block quotes, including
>
> > nested block quotes.

```
Fenced code blocks
```

    Indented code blocks

```python
# highlighted code block
def lineequ():
  y = kx + c

lineequ()
```

```html
<!--supports multiple languages-->
<p class="lovely">helloworld</p>
```

```d
/* A wide range of different languages */

import std.stdio;

void main() {
    writeln("Hello, D!");
}
```

Latex:

$$c = \\pm\\sqrt{a^2 + b^2}$$

1. Numbered lists
2. Another entry in my numbered list.

- Unordered lists
  - Nested entry
  
- [x] task
- [ ] more task

| Tables | Tables | Tables |
| ------ | ------ | ------ |
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |
| Cell 7 | Cell 8 | Cell 9 |

[Outside Links](https://example.com)

[absolute link](/parent/absolute.md)

[relative link](parent/howtouse.md)

bare url: <https://example.com>

Images:

![Images](md.html_logo.png)

Image in links:

[![Images](md.html_logo.png)](md.html_logo.png)

---

### Summary

These are the supported features:

- Block quotes
- Code blocks
- Styled code blocks
- Links
- Inlined links
- Images
- Images in links
- Headings
- Lists
- Bold
- Italic
- Strikethrough
- Monospace
- Horizontal rule
- Tables

Extra features on md.html:

- Dynamic title based on 1st `h1` heading
- Correct 404 error by displaying the 404.html
- No need for modified internal links, `relative/path.md` and `/absolute/path.md` works.
- Latex equations

## Issues

Issues and pull requests are always welcome!

You can submit issues the following ways:

- via [Github Issues](https://github.com/wmartinmimi/md.html/issues)

## Contributions

You are welcomed to create pull requests and add/fix features reasonably. :>

## Credits

- [markedjs/marked](https://github.com/markedjs/marked) (MIT License)
- [KaTeX/KaTeX](https://github.com/KaTeX/KaTeX) (MIT License)
- [jquery/jquery](https://github.com/jquery/jquery) (MIT License)
- [jsdelivr/jsdelivr](https://github.com/jsdelivr/jsdelivr) (MIT License)
- [highlightjs/highlight.js](https://github.com/highlightjs/highlight.js) (BSD 3-Clause Licensed)
- [Yukaii/github-highlightjs-themes](https://github.com/Yukaii/github-highlightjs-themes) (MIT License)
