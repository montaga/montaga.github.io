index.html: slides.md Makefile
		pandoc -s -S -t revealjs slides.md -o index.html -V theme=siam -V transition=fade -V history=true --katex=applets/katex/katex.min.js -c applets/katex/katex.min.css -V controls=false -V progress=true --bibliography mybib.bib --filter pandoc-citeproc

all: index.html
