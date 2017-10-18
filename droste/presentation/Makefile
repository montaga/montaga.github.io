all:
	pandoc -s -S -t revealjs slides.md -o index.html -V theme=siam -V transition=fade --mathjax=https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML -V controls=false -V progress=false --bibliography mybib.bib --filter pandoc-citeproc
