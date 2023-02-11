# md.html


![Images](md.html_logo.png)

A markdown viewer written as html to view markdown files in a browser.

Simple and easy to deploy.

## Usage

```
clone md.html into your markdown server
open md.html with a modern browser
the md.html should now display /index.md or /README.md
```

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

[absolute link](/parent/lol.md)

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
- Links
- Images
- Headings
- Lists (including lettered lists)
- Bold
- Italic
- Strikethrough
- Monospace
- Subscript
- Horizontal rule
- Tables
- Latex equations

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
