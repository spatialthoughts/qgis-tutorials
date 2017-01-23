Creating Basemaps with QTiles
=============================

Tiles have revolutionized the idea of web mapping and has given us fast and
easy access to large datasets. Tiling schemes divide the world into small tiles
(typically 256 x 256 pixels) for each zoom level and pre-render datasets to
these tiles. This way only a small fraction of a large dataset is served to the
user at any given time - resulting in a map that can be zoomed or panned with
ease over the internet. There are many methods to create tiles from GIS
datasets. One easy way to create tiles from your QGIS project is a plugin
called **QTiles**. In this tutorial, you will learn how to create PNG tiles
from any set of layers loaded in QGIS and create a basemap to be used in a web
mapping project.

Overview of the task
--------------------

We will create tiles from the Natural Earth raster covering the entire planet.

Get the data
------------

We will use the `Natural Earth 2
<http://www.naturalearthdata.com/downloads/10m-raster-data/10m-natural-earth-2/>`_
dataset from Natural Earth.

Download the medium-size `Natural Earth II with Shaded Relief, Water, and
Drainages
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/raster/NE2_LR_LC_SR_W_DR.zip>`_
zip file.

Data Source [NATURALEARTH]_

Procedure
---------

1. Unzip the downloaded ``NE2_LR_LC_SR_W.zip`` file to a folder on your
   computer. Open QGIS and go to
   :menuselection:`Layer --> Add Raster Layer`. Browse to the location of the
   extracted files and select ``NE2_LR_LC_SR_W.tif``. Click :guilabel:`OK`.

.. image:: /static/creating_basemaps_with_qtiles/images/1.png
   :align: center

2. Install the ``QTiles`` plugin by going to :menuselection:`Plugins --> Manage and
    Install Plugin`. Note that the plugin is currently marked **experimental**,
    so you will need to check :guilabel:`Show also experimental plugins` in
    Plugin Settings. (See :doc:`using_plugins` for more details on installing
    plugins in QGIS). Once the plugin is installed, go to
    :menuselection:`Plugins --> QTiles --> QTiles`.

.. image:: /static/creating_basemaps_with_qtiles/images/2.png
   :align: center

3. In the :guilabel:`QTiles` dialog, select :guilabel:`Directory` as the
   :guilabel:`Output` and browse to a folder of your choice where the output
   tiles will be created. Choose :guilabel:`Layer extent` of the
   ``NE2_LR_LC_SR_W`` layer as the extent of the tiles. Set the
   :guilabel:`Maximum Zoom` to ``6``. Expand the :guilabel:`Parameters` section
   and check the :guilabel:`Write Leaflet-based viewer`. Click :guilabel:`Run`
   to start the process of rendering the tiles.

.. note:: The number of tiles increase 4 times for every additional zoom level
   and since our layer has an extend of the entire world - there will be millions
   of tiles at higher zoom levels.

.. image:: /static/creating_basemaps_with_qtiles/images/3.png
   :align: center

4. Once the process finishes, close the :guilabel:`QTiles` dialog and browse to
   the output folder you had selected. You will notice folders for each zoom
   level upto the maximum zoom level. Each folder further contains subfolder
   for X coordinates and then the actual tiles named for Y coordinates.

.. image:: /static/creating_basemaps_with_qtiles/images/4.png
   :align: center

5. In the parent directory of top-levle tiles directory, you will find a
   ``QTiles.html`` file. This is a simple viewer to explore the tiles using the
   Leaflet web mapping library.

.. image:: /static/creating_basemaps_with_qtiles/images/5.png
   :align: center

6. Double-click the ``QTiles.html`` to open it in a web browser. You can zoom
   and pan around to see the tiles seamlessly form the original raster layer.

.. image:: /static/creating_basemaps_with_qtiles/images/6.png
   :align: center
