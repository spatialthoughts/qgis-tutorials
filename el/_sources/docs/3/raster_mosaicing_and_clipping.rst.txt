Raster Mosaicing and Clipping (QGIS3)
=====================================

This tutorial explores basic techniques for working with rasters in QGIS such as mosaicing and subsetting.

Overview of the task
--------------------

We will download elevation data for Sri Lanka in form of SRTM tiles, merge them and clip the resulting mosaic to the country boundary. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Using the Hillshade renderer to visualize elevation data.

Get the data
------------

Land Processes Distributed Active Archive Center (LP DAAC) provides `NASA Shuttle Radar Topography Mission (SRTM) Global 1 arc second <https://lpdaac.usgs.gov/products/srtmgl1v003/>`_ dataset as elevation tiles.

An easy interface to download tiles for a given area is the `30-Meter SRTM Tile Downloader <https://dwtkns.com/srtm30m/>`_ by By Derek Watkins. Download the individual SRTM tiles covering Sri Lanka. Note that you will need a free `Earth Data account <https://urs.earthdata.nasa.gov/home>`_ to download the data.

.. image:: /static/3/raster_mosaicing_and_clipping/images/data1.png
   :align: center


We will also need the `Admin 0 - Countries <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_ shapefile from  Natural Earth.


For convenience, you may directly download a copy of the datasets from the links below:

`N05E080.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N05E080.SRTMGL1.hgt.zip>`_

`N06E079.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N06E079.SRTMGL1.hgt.zip>`_

`N06E080.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N06E080.SRTMGL1.hgt.zip>`_

`N06E081.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N06E081.SRTMGL1.hgt.zip>`_

`N07E079.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N07E079.SRTMGL1.hgt.zip>`_

`N07E080.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N07E080.SRTMGL1.hgt.zip>`_

`N07E081.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N07E081.SRTMGL1.hgt.zip>`_

`N08E079.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N08E079.SRTMGL1.hgt.zip>`_

`N08E080.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N08E080.SRTMGL1.hgt.zip>`_

`N08E081.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N08E081.SRTMGL1.hgt.zip>`_

`N09E080.SRTMGL1.hgt.zip <https://www.qgistutorials.com/downloads/N09E080.SRTMGL1.hgt.zip>`_

`ne_10m_admin_0_countries.zip <https://www.qgistutorials.com/downloads/ne_10m_admin_0_countries.zip>`_

Data Source [SRTM]_ , [NATURALEARTH]_


Procedure
---------

1. Open QGIS and locate the downloaded files in the :guilabel:`Browser` panel. Expand individual zip files to show the ``.hgt`` files. Hold the :kbd:`Ctrl` key and select all individual files. Once selected, drag them to the canvas.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/1.png
     :align: center
   
2. You will see 11 individual layers loaded in the :guilabel:`Layers` panel and displayed in the canvas. We will merge these individual tiles into a single mosaic. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/2.png
     :align: center
   
3. Search and locate the :menuselection:`GDAL --> Raster miscellaneous --> Merge` tool. Double-click to launch it.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/3.png
     :align: center
   
4. In the :guilabel:`Merge` dialog, click the :guilabel:`...` button next to :guilabel:`Input layers`. Click :guilabel:`Select All` to select all individual layers.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/4.png
     :align: center
   
5. As mentioned in the `dataset layer details <https://lpdaac.usgs.gov/products/srtmgl1v003/>`_, the input data type is *16-bit signed integer*. To maintain data integrity, we should keep the same data type for the merged layer. Select ``Int16`` as the :guilabel:`Output data type`. Also the default output data format is GeoTiff. GeoTiff files can get very large if not compressed. Choose ``High Compression`` as the :guilabel:`Profile`. Click :guilabel:`Run`.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/5.png
     :align: center
   
6. Once the processing finishes, the a new layer ``OUTPUT`` will be added to the :guilabel:`Layers` panel. In case the layer is not at the top of the stack, select it and drag it to the top of the :guilabel:`Layers` panel.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/6.png
     :align: center
   
7. You will see that the ``OUTPUT`` layer contains the merged elevation data from the individual input tiles. The default visualization only shows the pixel values in the range from 0-255. But our data contains pixels with values -14 to 2371, resulting in a low contrast rendering. Let's change it a better visualization. Click the :guilabel:`Open the layer Styling panel` button in the :guilabel:`Layers` panel.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/7.png
     :align: center
   
8. In the :guilabel:`Layer Styling` panel, click the :guilabel:`Render type` dropdown and select ``Hillshade`` renderer. This rendering option is particularly well-suited for elevation data.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/8.png
     :align: center
   
9. Another common operation when working with rasters is to clip a raster to your area of interest. For this tutorial, we will clip the merged layer to the country boundary for Sri Lanka. Locate the downloaded ``ne_10m_admin_0_countries.zip`` file and expand it. Drag the ``ne_10m_admin_0_countries.shp`` file to the canvas.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/9.png
     :align: center
   
10. Select the newly added ``ne_10m_admin_0_countries`` layers in the :guilabel:`Layers` panel. Click the :guilabel:`Select Features by area or single click` button on the :guilabel:`Attributes Toolbar`. Once selected, click the polygon for Sri Lanka to select it.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/10.png
     :align: center
   
11. Keep the selection as it is and open :menuselection:`Processing --> Toolbox`. Search and locate the :menuselection:`GDAL --> Raster extraction --> Clip raster by mask layer` tool. Double-click to launch it.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/11.png
     :align: center
   
12. In the :guilabel:`Clip Raster by Mask Layer` dialog, set ``OUTPUT`` as the :guilabel:`Input Layer`. Select ``ne_10m_admin_0_countries`` as the :guilabel:`Mask layer`, and check the :guilabel:`Selected features only` checkbox. Enter ``0.0000`` as the :guilabel:`Assign a specified nodata value to output bands`. As before, choose ``High compression`` as the :guilabel:`Profile`. Click :guilabel:`Run`.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/12.png
     :align: center
   
13. A new layer ``OUTPUT`` will be added to the :guilabel:`Layers` panel. At this point, it may be hard to see the output because we have too many overlapping layers visible. Click the :guilabel:`Manage Map Themes` button in the :guilabel:`Layers` panel and choose ``Hide All Layers``. 

  .. image:: /static/3/raster_mosaicing_and_clipping/images/13.png
     :align: center
   
14. Turn on only the latest ``OUTPUT`` layer and style it with the ``Hilshade`` renderer as done before.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/14.png
     :align: center
   
15. The merged and subsetted output elevation layer for Sri Lanka is ready.

  .. image:: /static/3/raster_mosaicing_and_clipping/images/15.png
     :align: center