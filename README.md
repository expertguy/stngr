# stngr

A small demo project showing an Apple-style scroll-driven video effect built with vanilla JavaScript, HTML and CSS.

## Features

- Scroll-driven video playback synchronized with page scroll
- Lightweight, dependency-free implementation
- Example components: header, hero, video scroller, footer

## Demo

Open `index.html` in a browser to see the demo.

## Local setup

Install dependencies (if any) and run a local static server. For a quick preview you can use Python's simple HTTP server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project structure

- public/ — static assets
- src/ — main source files
	- main.js
	- style.css
	- components/ — UI components (Header, Hero, VideoScroll, Footer)
- js/ — helper scripts (headerScroll.js, scrollVideo.js)
- index.html

## Development notes

- The scroll-video logic is implemented in `js/scrollVideo.js` and `src/components/VideoScroll.js`.
- Modify `style.css` and component files to tweak presentation and behavior.

## License

MIT
