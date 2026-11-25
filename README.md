# jorgeand.com.br

Personal site of Jorge Andrade Rodrigues, AI Engineer in São Paulo. Static HTML, CSS and JavaScript, served by GitHub Pages. No framework, no build step.

| Path | What it is |
| --- | --- |
| [`/`](https://jorgeand.com.br/) | *Frontier to City*: an interactive career page with **Signal City**, an open-city driving game in plain JavaScript |
| [`/cv/`](https://jorgeand.com.br/cv/) | Web résumé in PT/EN, light and dark themes, with a print stylesheet that produces a public PDF |
| [`/portfolio/`](https://jorgeand.com.br/portfolio/) | Case studies: MCP servers, AI agents and automation |

## Files

- `index.html`, `i18n.js`, `signal-city.js`: the home page, its translations and the game
- `cv/index.html`: the résumé, one self-contained file
- `portfolio/index.html`: the portfolio, one self-contained file
- `CNAME`: custom domain for GitHub Pages

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to `main`. GitHub Pages publishes the repository root.
