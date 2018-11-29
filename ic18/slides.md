% Rapid creation of GPU accelerated mathematical content
% Aaron Montag \
  Technical University of Munich, Germany
% Montevideo, December 6 <br /> <img src="TUM.png" width="30%" style="margin:30px; box-shadow: none; !important"></img><img src="m10-logo.png" width="30%" style="margin:30px; box-shadow: none; !important"></img>

# Ingredients of modern mathematics communication 

<!--{data-background-image="ipadfluid.jpg" style="color:white; background: rgba(0,0,0,.3); text-align: center !important;"}-->

::::::::::::: {.columns}
::: {.column width="50%"}
real-time visualizations
: GPU, "edutainment"
<!--edutainment, GPU accelerated-->
 
 ![](ipadfluid.jpg)
 
interactivity
:  more than a movie

:::
::: {.column width="50%"}
adaption to the audience
: modern devices, web
<!--no installation of software. Available in the web and on modern devices.-->
 
![](phones.jpg)

versatility in content
: *easy* creation
<!--: The process to contribute should be *easy*.-->
<!--involve the public in creation of content.-->

:::
::::::::::::::

--------------

# Technical background
Tasks that initially were done on the CPU can now be *accelerated on the GPU*.

. . .

**However**: The *programming concepts* in conventional programming are quite difficult:

. . .

- Shaders/kernels are in separate language (GLSL, CUDA C...).

. . .

- The number of *lines of code* drastically increases.

. . .

- GPU specific code often causes platform dependency.

. . .

$\Rightarrow$ **additional development effort** is enormous and contents are hard to distribute.

--------------

# Our answer: CindyGL

- a plug-in for `CindyJS`, a `Cinderella` compatible framework for the web.

. . .

- Brings easy *shader programming* via `WebGL` into dynamic geometry software.

- `WebGL`: a JavaScript API for interactive 3D and 2D graphics without the use of plug-ins.

. . .

- CindyGL translates a subset of CindyScript to GLSL $\rightarrow$ One programming language for *both the CPU and GPU*.

. . .

- Aim: Making `WebGL` **easy** for *mathematics communicators*.

--------------

# A small example

<iframe data-src="applets/cindyeditor.html?draw=colorplot(%0A%20%20x%5E2%2By%5E2-1%0A)%3B%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0Astr%20%3D%20%22(%22%20%2B%20mouse().x%2B%22)%5E2%2B(%22%2Bmouse().y%2B%22)%5E2-1%22%3B%20%20%0Aval%20%3D%20parse(str)%3B%0A%0Adraw(mouse()%2C%20color-%3Egrey(val)%2C%20size-%3E20)%3B%0Adrawtext(mouse()%2B(-1.5%2C0)%2C%20%0A%20%20%20%20%20%20%20%20%20%22x%20%3D%20%22%20%2B%20%20mouse().x%20%2B%20%22%2C%0Ay%20%3D%20%22%20%2B%20mouse().y%2B%22%0A%22%2Bstr%2B%22%20%3D%20%22%20%2B%20val%2C%20color-%3E%5B1%2C0%2C0%5D%2C%20size-%3E25)%3B%0A%0A%20%20%20%20%20%20%20%20%20&init=resetclock()%3B&gslp=%5B%5D" class="cindyweb"></iframe>

. . .

For each pixel with coordinates $x$ and $y$ a grayscale-value is computed.

--------------

<!---
# Interactivity

<iframe
data-src="applets/cindyeditor.html?draw=%2F%2F%20a%20single%20circular%20sinusoidal%20wave%20with%20point%20source%20A%0A%0Acolorplot(%0A%20%20%20sin(10*%7C(x%2Cy)-A%7C)%2F2%2B1%2F2%0A)%3B&init=resetclock()%3B%0A&gslp=%5B%7B%22alpha%22%3A1%2C%22color%22%3A%5B1%2C0%2C0%5D%2C%22labeled%22%3Atrue%2C%22name%22%3A%22A%22%2C%22size%22%3A5%2C%22type%22%3A%22Free%22%2C%22pos%22%3A%5B-0.42842590571441796%2C0.15715145622077145%2C1%5D%7D%5D" class="cindyweb"></iframe>

--------------

-->
# Interactivity + Animation + Colors

<iframe data-src="applets/cindyeditor.html?draw=colorplot(%0A%20%20%20sin(10*%7C(x%2Cy)-A%7C-seconds())%0A%20%2B%20sin(10*%7C(x%2Cy)-B%7C-seconds())%0A)%3B&init=resetclock()%3B%0A&gslp=%5B%7B%22alpha%22%3A1%2C%22color%22%3A%5B1%2C0%2C0%5D%2C%22labeled%22%3Atrue%2C%22name%22%3A%22A%22%2C%22size%22%3A5%2C%22type%22%3A%22Free%22%2C%22pos%22%3A%5B1%2C0.2616039195461578%2C-0.8474729241877257%5D%7D%2C%7B%22alpha%22%3A1%2C%22color%22%3A%5B1%2C0%2C0%5D%2C%22labeled%22%3Atrue%2C%22name%22%3A%22B%22%2C%22size%22%3A5%2C%22type%22%3A%22Free%22%2C%22pos%22%3A%5B0.40468583599574026%2C0.1618743343982961%2C1%5D%7D%5D" class="cindyweb"></iframe>

. . .

*seconds()* returns the exact time $\rightarrow$ enables animations.

. . .

If *colorplot* outputs a three component-vector, the color is obtained by additive mixing of *red*, *green* and *blue*.

--------------

# Deformation of images

<iframe data-src="applets/cindyeditor.html?draw=colorplot(%0A%20%20%20%20imagergb(%22image%22%2C%0A%20%20%20%20%09(x%2Cy)%20%20%20%20%20%20%20%20%0A%20%20%20%20)%0A)%3B&init=resetclock()%3B&gslp=%5B%5D" class="cindyweb"></iframe>

For each pixel we look up a color in a texture at the given coordinates.

--------------

# Deformation of images (complex)

<iframe data-src="applets/cindyeditor.html?draw=colorplot(%0A%20%20%20%20imagergb(%22image%22%2C%0A%20%20%20%20%09z%0A%20%20%20%20)%0A)%3B&init=resetclock()%3B%0A%0Acamera%20%3D%20cameravideo()%3B&gslp=%5B%7B%22alpha%22%3A1%2C%22color%22%3A%5B1%2C0%2C0%5D%2C%22labeled%22%3Atrue%2C%22name%22%3A%22A%22%2C%22size%22%3A5%2C%22type%22%3A%22Free%22%2C%22pos%22%3A%5B1%2C0.7514970059880242%2C0.7193113772455091%5D%7D%5D" class="cindyweb"></iframe>

. . .

Also access to the webcam is possible


--------------

# Raycasting

Aim: render the surface $x^2+y^2+z^2 - 1 = 0$

<iframe data-src="applets/cindyeditor.html?draw=lightnormal%20%3D%20%5BA.x%2CA.y%2C-1%5D%3B%0Alightnormal%20%3D%20%20lightnormal%2F%7Clightnormal%7C%3B%0Alightcolor%20%3D%20%5B1.2%2C1%2C.8%5D%3B%0Abackground%20%3D%20%5B.4%2C.4%2C.4%5D%3B%0A%0Acolorplot(%0A%20if(%7Cx%5E2%2By%5E2%7C%3C1%2C%20%20%20%20%0A%20%20s%3D(x%2Cy%2C-%7Csqrt(1-x%5E2-y%5E2)%7C)%3B%20%0A%20%20(s*lightnormal)*lightcolor%2C%0A%20%20background%0A%20)%0A)%3B&init=resetclock()%3B&gslp=%5B%7B%22alpha%22%3A1%2C%22color%22%3A%5B1%2C0%2C0%5D%2C%22labeled%22%3Atrue%2C%22name%22%3A%22A%22%2C%22size%22%3A5%2C%22type%22%3A%22Free%22%2C%22pos%22%3A%5B-0.7053627237916317%2C0.522846461941697%2C1%5D%7D%5D" class="cindyweb"></iframe>

The intersection of the ray behind each pixel with the surface is computed.


---------------

# The stereographic projection

<iframe data-src="applets/stereographic/index.html" style="width:900px; height:600px;"></iframe>

---------------

# Editing spherical images

<iframe data-src="applets/spherical/index.html" style="width:900px; height:600px;"></iframe>

--------------

# The (spherical) Droste effect

<iframe data-src="applets/droste/index.html" style="width:900px; height:650px;"></iframe>

<!--Is being used by *Matt Parker* in *Festival of the Spoken Nerd*.-->

--------------

# Raycasting (advanced)

<iframe data-src="applets/raycasting.html" style="width:900px; height:600px;"></iframe>

--------------

# How does it work?

Observation
:   $F: \mathbb{R}^3\to \mathbb{R}$ evaluated along ray is a *univariate* polynomial $p$.

::::::::::::: {.columns}
::: {.column width="55%"}
For each **pixel**:

- Evaluate $p$ at *Chebyshev nodes*.
- Obtain *Bernstein form* of $p$ through linear transformation.
- $p$ has a root $\Rightarrow$ "Bézier path" has a root.
- Use recursion to isolate roots of $p$.

:::
::: {.column width="45%"}

<iframe data-src="applets/raycastingexpl.html" style="width:500px; height:500px; float: right;"></iframe>

:::
::::::::::::::

--------------



::::::::::::: {.columns}
::: {.column width="50%" style="text-align: center;"}

![](2.png){width="100%"}
<iframe data-src="applets/glass.html" style="width:100%; height: 400px;"></iframe>
   
:::
::: {.column width="50%" style="text-align: center;"}

![](4.png){width="100%"}
![](3.png){width="100%"}

:::
::::::::::::::

--------------

# Morphing algebraic surfaces

<iframe data-src="applets/morpher/morpher.html" style="width:1000px; height:600px;"></iframe>

--------------


# Further applications of `CindyGL`
<div class="showcase">
<div><a href="applets/cindyeditor.html?draw=N%20%3D%20251%3B%20%2F%2F%20maximal%20number%20of%20iterations%0Acolorplot(%0A%20%20c%20%3D%20((x%2Bi*y)*exp(-mod(seconds()%2C10))%2B(-0.7436439%20%2B%200.1318259*i))%3B%0A%20%20z%20%3D%200%3B%20n%20%3D%200%3B%0A%20%20repeat(N%2C%20k%2C%0A%20%20%20%20if(%7Cz%7C%20%3C%3D%204%2C%0A%20%20%20%20%20%20%20z%3Dz*z%2Bc%3B%0A%20%20%20%20%20%20%20n%20%3D%20k%3B%0A%20%20%20%20)%3B%0A%20%20)%3B%0A%20%20grey(n%2FN)%0A)%3B&init=resetclock()%3B&gslp=%5B%5D"><img src="outlook/limit.png">Fractals \& Limit sets</a></div>
<div><a href="https://montaga.github.io/tdot/index.html"><img src="outlook/tdot.png">Feedbackloops</a></div>
<div><a href="http://localhost:8123/web/09_ME/2"><img src="outlook/volumetric.png">Volumetric Rendering</a></div>
<div><a href="https://cindyjs.org/examples/cindygl/31_fft.html"><img src="outlook/fft.png">FFT</a></div>
<div><a href="https://cindyjs.org/gallery/cindygl/ComplexExplorer/index.html"><img src="outlook/zeta.png">Complex Analysis</a></div>
<div><a href="http://localhost/cindyjs/examples/cindygl/47_analyticlandscape.html"><img src="outlook/landscape.png">Analytic Landscapes</a></div>
<div><a href="https://cindyjs.org/gallery/main/ReactionDiffusion/"><img src="outlook/react.png">Partial Differential Equations</a></div>
<div><a href="http://localhost:8123/web/07_MW/2"><img src="outlook/fluid.png">Fluid Simulation</a></div>
<div><a href="https://cindyjs.org/gallery/main/Jugglers/"><img src="outlook/spiral.png">Video-Deformations with Henry Segerman</a></div>
<div><a href="http://localhost:8123/web/04_EI/2"><img src="outlook/lic.png">Vectorfields (LIC)</a></div>
<div><a href="https://cindyjs.org/gallery/main/CoxeterTilings/"><img src="outlook/tiling.png">Hyperbolic Geometry</a></div>
<div><a href="https://cindyjs.org/examples/cindygl/48_molecules.html"><img src="outlook/nbody.png">N-body Simulation</a></div>
<div><a href="https://cindyjs.org/examples/cindygl/40_waveintersection.html"><img src="outlook/quasi.png">Quasicrystals</a></div>
<!--<div><a href="http://cindyjs.org/examples/cindygl/17_images_blur.html"><img src="outlook/blur.png">Image Filters</a></div>-->
<div><a href="http://localhost:8123/web/01_AR/2"><img src="outlook/montecarlo.png">Monte Carlo Raytracing</a></div>
<div><a href="http://localhost:8123/web/14_WZW/2"><img src="outlook/gol.png">Celluar Automata</a></div>
</div>
  
--------------

# Thank you!
More information on [cindyjs.org](https://cindyjs.org/).

Tutorial for CindyGL: [cindyjs.org/docs/cindygltutorial/](https://cindyjs.org/docs/cindygltutorial/).

Applications in app: [interactive.app.tum.de](https://interactive.app.tum.de/).

--------------

### References
<span style="font-size:55%">Images: Andreas Heddergott and pexel.</span>
<span style="color:#ffffff; font-size: 0%; position: absolute;">
[@stussak2009realsurf]
<!--[@jobard2002lagrangian]-->
<!--[@epstein]-->
<!--[@montag]-->
[@montag2018bringing]
[@Sagraloff2016ComputingRR]
[@cindyjs]
[@cindygl]
<!--[@olsen2010geometry]-->
<!--[@herlihy2011art]-->
[@schleimer2016squares]
<!--[@pycuda]-->
</span>
