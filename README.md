# QGIS Tutorials

This repository contains the source files for QGIS Tutorials and Tips at http://www.qgistutorials.com

The website is generated using [Sphinx](http://sphinx-doc.org) and source files are written using [restructured text](http://docutils.sourceforge.net/rst.html)

To contribute or update the tutorials, you must install Sphinx locally, make changes to the `.rst` files, build the HTML pages and send a pull request.


## Clone the Repository

The respository is very large and contains over 10 years of history. You don't need all the history locally, so just clone it with `--depth 1` option to get only the latest files.

    git clone --depth 1 git@github.com:spatialthoughts/qgis-tutorials.git --no-single-branch 
    cd qgis-tutorials
    
    
## Install Dependencies

### Linux/Mac


The following instructions work for Linux/Mac systems. I prefer conda for environment management so the instructions use conda, but if you prefer virtualenv, you can use it instead as well.

Create a new environment named 'sphinx' and install dependencies. Most dependencies for sphinx based system are not yet available in conda, so we install `pip` and use it instead. Do not rely on your system `pip` as it will do a global install and may break your other python environments. We also need `make` to build the source files.

```
conda create --name sphinx
conda activate sphinx
conda install pip
conda install make
pip install -r requirements.txt
```

### Windows

The preferred way to install sphinx and its dependencies on Windows is using [Cygwin](https://cygwin.com/). Run the Cygwin installer and install the following packages from the installer

```
gcc-core
git
libjpeg-devel
make
python3-devel
python3.8-pip
zlib
zlib-devel
```

Once the packages are installed, open a Cygwin Terminal. Install the dependencies using following commands. `Pillow` install via `pip` somehow fails. So use `easy_install` instead.

```
easy_install-3.8 pillow
pip3 install -r requirements.txt
```

## Make Changes and Preview the Results

From the root `qgis-tutorials` directory, run the following command

    make html

This will generate HTML pages in build/html/ directory. Start a local HTTP server and preview them. Python comes with a built-in server that we can use

    python -m http.server

A server will start on port 8000. Visit http://localhost:8000/build/html/en/ and preview the files.

## Updating translations

Activate `transifex-client` with your API token. You need this only to pull new translations from transifex.
The config file is stored in .tx/config. 

    tx config

Once configure, you can run the following command to pull new translations from Transifex

    make transifex-pull
    
## Push the Changes and Build the Website

Once the changes are pushed to the main branch, run the following to update the `gh_pages` branch which serves the live website. You will need commit access to the repository to run this command.

    make gh-pages

## Formatting guide 

All the tutorials written follow the same format and styling pattern, for those who translate in other languages this section would be helpful. 

1. Title  
```
==========
```

2. Heading 1  
```
----------
```

3. Heading 2  
```
^^^^^^^^^^
```

4. Heading 3 
```
""""""""
```

5. Making selection in GUI window dropdown  
```
:menuselection:`menu --> submenu1 -->submenu2` 
```

6. Dialog box/layer names and making a single selection  
```
:guilabel:`label` 
```

7. The information displayed in the GUI window  
```
*information* 
```

8. Keyboard buttons 
``` 
kbd:`Ctrl` 
```

9. User entering information and specifying a layer name 
``` 
``type text / layer name``
``` 

10. Images are intended in each step and center aligned. 

```
     .. image:: /static/3/ex_name/images/2.png
         :align: center
```

11. Note is always below image. 

```
    .. note::
    
      Exter your note here... 
```

    
License
-------

All the tutorials are available under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/deed.en_US)

Copyright 2021 Ujaval Gandhi

