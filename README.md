QGIS Tutorials
==============

This repository contains the source files for QGIS Tutorials and Tips at http://www.qgistutorials.com

The website and PDFs are generated using [Sphinx](http://sphinx-doc.org) based on [restructured text sources](http://docutils.sourceforge.net/rst.html)


Building the QGIS Tutorials
---------------------------

The following instructions work for linux based systems. If you are on Windows, you can use [Cygwin](http://cygwin.com/).

    git clone --depth 1 git@github.com:spatialthoughts/qgis-tutorials.git --no-single-branch 
    cd qgis-tutorials
    pip install -r requirements.txt

Then build:

    make html
    
This will generate HTML pages in build/html/ directory

    make pdf

This will generate PDF documents in build/pdf/ directory

License
-------

All the tutorials are available under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/deed.en_US)

Copyright 2014 Ujaval Gandhi

