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

You also need to add the following line in your `.bashrc` or `.zshrc` to overcome a locate error

```
export LC_ALL=C
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

Once the packages are installed, open a Cygwin Terminal. Install the dependencies using the following commands. `Pillow` install via `pip` somehow fails. So use `easy_install` instead.

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

1. Install the latest [`transifex-client`](https://developers.transifex.com/docs/cli). Update the `PATH` variable to include path to the `tx` command.

2. Get a new API token from https://app.transifex.com/user/settings/api/.

3. Create a `.transifexrc` file in your home directory with the following content and replace `your API token` with your actual token.

```
[https://www.transifex.com]
rest_hostname = https://rest.api.transifex.com
token         = <your API token>
```

4. Once configure, you can run the following command to pull new translations from Transifex

```
make transifex-pull
```
    
## Push the Changes and Build the Website

Once the changes are pushed to the main branch, run the following to update the `gh_pages` branch which serves the live website. You will need commit access to the repository to run this command.

    make gh-pages

## Formatting Guide

We prefer the following style while writing the tutorials.

| Type                                       |  rst Formatting  |
| ------------------------------------------ | ---------------  |
| Title                                      | ```==========``` |
| Heading 1                                  | ```----------``` |
| Heading 2                                  | ```^^^^^^^^^^``` |
| Heading 3                                  | ```""""""""""``` |
| Menu items                                 | ``` :menuselection:`menu --> submenu1 --> submenu2` ``` |
| Processing algorithms                      | ``` :menuselection:`Processing Toolbox --> Vector Overlay --> Clip` ``` |
| Window titles, Tabs, Dialogs and buttons   | ``` :guilabel:`label` ``` |
| Error and info messages                    | ``` *information* ``` |
| Keyboard shortcuts                         | ``` kbd:`Ctrl+L` ``` |
| Layer and file names                       | ``` ``layer_name`` ``` |
| Text input by the user                     | ``` ``value`` ```| 
| External web links                         | ``` `name <url>`_ ```


License
-------

All the tutorials are available under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/deed.en_US)

Copyright 2021 Spatial Thoughts

