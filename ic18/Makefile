index.html: slides.md Makefile
		pandoc -s -t revealjs -f markdown+tex_math_dollars slides.md -o index.html -V theme=siam -V transition=fade -V history=true --katex=applets/katex/ -c applets/katex/katex.min.css -V controls=false -V progress=true --bibliography mybib.bib --filter pandoc-citeproc

all: index.html
