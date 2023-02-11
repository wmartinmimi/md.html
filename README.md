# md.html

![Images](md.html_logo.png)

A markdown viewer written as html to view markdown files in a browser.

Simple and easy to deploy.

## Quick deploy

In your server root:

```bash
curl -o https://raw.githubusercontent.com/wmartinmimi/md.html/main/md.html
```

More information on usage can be found [here](/parent/howtouse.md)

---

Supported Markdown features:

## Headings

Inline styles such as **bold**, *italic*, ***both***, ~~strikethrough~~, `monospace`, --subscript--, and ^^superscript^^.

> Block quotes, including
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
<!--multiple languages-->
<p class='lovely'>hellowrold</p>
```

$$c = \\pm\\sqrt{a^2 + b^2}$$

1. Numbered lists
  - Unordered lists
  - Nested in other lists
    a. Lettered lists are an extension to the spec.
    b. They may be useful for legal documents.
2. Another entry in my numbered list.

| Tables | Tables | Tables |
| ------ | ------ | ------ |
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |
| Cell 7 | Cell 8 | Cell 9 |

[Outside Links](https://github.com/adamvleggett/drawdown)

[absolute link](/parent/howtouse.md)

[relative link](parent/relative.md)

bare url: https://example.com

[empty links]()

Images:

![Images](md.html_logo.png)

---

### Summary...

These are the supported features:

- Block quotes
- Code blocks
- Styled code blocks
- Links
- Inlined links
- Images
- Headings
- Lists (including lettered lists)
- Bold
- Italic
- Strikethrough
- Monospace
- Horizontal rule
- Tables

Extra features on md.html:

- Dynamic title based on 1st ```h1``` heading
- Correct 404 error by displaying the 404.html
- No need for modified internal links, ```relative/path.md``` and ```/absolute/path.md``` works.
- Latex equations
- Subscript
- SuperScript

Unsupported Markdown features at this time:

- Line blocks
- Definition lists
- Footnotes
- Twitter/Facebook/YouTube embed
- Inline Latex equations

## Credits

- [adamvleggett/drawdown](https://github.com/adamvleggett/drawdown) (MIT License)
- [KaTeX/KaTeX](https://github.com/KaTeX/KaTeX) (MIT License)
- [jquery/jquery](https://github.com/jquery/jquery) (MIT License)
- [jsdelivr/jsdelivr](https://github.com/jsdelivr/jsdelivr) (MIT License)
- [Yukaii/github-highlightjs-themes](https://github.com/Yukaii/github-highlightjs-themes) (MIT License)
