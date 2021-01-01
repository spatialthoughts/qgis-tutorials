QGIS Tutorials
==============

This repository contains the source files for QGIS Tutorials and Tips at http://www.qgistutorials.com

The website and PDFs are generated using [Sphinx](http://sphinx-doc.org) based on [restructured text sources](http://docutils.sourceforge.net/rst.html)


Building the QGIS Tutorials
---------------------------

The following instructions work for linux based systems. I prefer conda for environment management so the instructions use conda, but if you prefer virtualenv, you can use it instead

    git clone --depth 1 git@github.com:spatialthoughts/qgis-tutorials.git --no-single-branch 
    cd qgis-tutorials

Create a new environment named 'sphinx' and install dependencies. Most dependencies for sphinx based system are not yet available in conda, so we install `pip` and use it instead. Do not rely on your system `pip` as it will do a global install and may break your other python environments. We also need `make` to build the source files.

```
conda create --name sphinx
conda install pip
conda install make
pip install -r requirements.txt
```

[optional] Activate `transifex-client` with your API token. You need this only to pull new translations from transifex.

```
tx init
```

Then build:

    make html

This will generate HTML pages in build/html/ directory. Start a local HTTP server and preview them. Python comes with a built-in server that we can use

    python -m http.server

A server will start on port 8000. Visit http://localhost:8000/build/html/en/ and preview the files.

License
-------

All the tutorials are available under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/deed.en_US)

Copyright 2021 Ujaval Gandhi

