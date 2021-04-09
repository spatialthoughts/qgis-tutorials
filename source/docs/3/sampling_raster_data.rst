Sampling Raster Data using Points or Polygons (QGIS3)
=====================================================
Many scientific and environmental datasets come as gridded rasters. Elevation data (DEM) is also distributed as raster files. In these raster files, the parameter that is being represented is encoded as the pixel values of the raster. Often, one needs to extract the pixel values at certain locations or aggregate them over some area. This functionality is available in QGIS via processing algorithms. ``Sample raster values`` for point layers and ``Zonal Statistics`` for polygon layers.

Overview of the task
--------------------

Given a raster grid of daily maximum temperature in the continental US, we need to extract the temperature at a point layer of all urban areas and calculate the average temperature for a polygon layer of each county in the US.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Select and remove multiple layers from QGIS Table of Contents.

Get the data
------------

NOAA’s `Climate Prediction Center <https://www.cpc.ncep.noaa.gov/>`_ provides `GIS data <https://www.cpc.ncep.noaa.gov/products/GIS/GIS_DATA/>`_ related to temperature and precipitation in the US. Download the `latest grid file for maximum temperatures <ftp://ftp.cpc.ncep.noaa.gov/GIS/GRADS_GIS/GeoTIFF/TEMP/us_tmax/>`_. The file will be named ``us.tmax_nohads_ll_{YYYYMMDD}_float.tif``

We will use a CSV file from `2018 US Gazetteer
<https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2018.html>`_ representing
urban areas in the US.  Download the `Urban Areas Gazetteer File
<https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2018_Gazetteer/2018_Gaz_ua_national.zip>`_.

`US Census Bureau <https://www.census.gov/en.html>`_ provides `TIGER/Line Shapefiles <https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html>`_. You can visit the `FTP site <https://www2.census.gov/geo/tiger/TIGER2018/>`_ and download census tracts shapefile for California. Download `Census Tracts for California <https://www2.census.gov/geo/tiger/TIGER2018/COUNTY/tl_2018_us_county.zip>`_ file. 


For convenience, you may directly download a copy of the datasets from the
links below:

`us.tmax_nohads_ll_20190501_float.tif <https://www.qgistutorials.com/downloads/us.tmax_nohads_ll_20190501_float.tif>`_

`2018_Gaz_ua_national.zip <https://www.qgistutorials.com/downloads/2018_Gaz_ua_national.zip>`_

`tl_2018_us_county.zip <https://www.qgistutorials.com/downloads/tl_2018_us_county.zip>`_

Data Sources: [NOAACPC]_, [USGAZETTEER]_ [TIGER]_

Procedure
---------

1. Unzip and extract both ``2018_Gaz_ua_national.zip`` and ``tl_2018_us_county.zip`` to a folder on your computer. Open QGIS and locate the ``us.tmax_nohads_ll_20190501_float.tif`` file in the QGIS Browser drag it to the canvas. 

  .. image:: /static/3/sampling_raster_data/images/1.png
     :align: center

2. You will see a new raster layer ``us.tmax_nohads_ll_20190501_float`` loaded in the :guilabel:`Layers` panel. This raster layer contains the maximum temperature recorded at each pixel in degrees Celsius. Next we will load the urban areas point file. This file comes as a text file in the Tab Separated Values (TSV) format. Click the :guilabel:`Open Data Source Manager` button on the :guilabel:`Data Source Toolbar`.

  .. image:: /static/3/sampling_raster_data/images/2.png
     :align: center

3. Switch to the :guilabel:`Delimited Text` tab. Click the :guilabel:`...` button next to :guilabel:`File name` and specify the path to the text file you downloaded. In the :guilabel:`File format` section, select :guilabel:`Custom delimiters` and check :guilabel:`Tab`. Select ``INTPTLONG`` as the :guilabel:`X field` and ``INTPTLAT`` as the :guilabel:`Y field`. Click :guilabel:`Add` and then :guilabel:`Close`.

  .. image:: /static/3/sampling_raster_data/images/3.png
     :align: center

4. A new point layer ``2018_Gaz_ua_national`` will be loaded in the :guilabel:`Layers` panel. Now we are ready to extract the values from the raster layer at these points. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/sampling_raster_data/images/4.png
     :align: center

5. Search and locate the :menuselection:`Raster analysis --> Sample raster values` algorithm. Double-click to launch it.

  .. image:: /static/3/sampling_raster_data/images/5.png
     :align: center

6. Select ``2018_Gaz_ua_national`` as the :guilabel:`Input Point Layer`. Select ``us.tmax_nohads_ll_20190501_float`` as the :guilabel:`Raster Layer to sample`. Expand the :guilabel:`Advanced parameters` and enter ``tmax`` as the :guilabel:`Output column prefix`. Click :guilabel:`Run`. Once the processing finishes, click :guilabel:`Close`.

  .. image:: /static/3/sampling_raster_data/images/6.png
     :align: center

7. A new layer ``Sampled Points`` will be loaded in the :guilabel:`Layers` panel. Select the :guilabel:`Identify` tool in the :guilabel:`Attributes Toolbar` and click on any point. You will see the attributes displayed in the :guilabel:`Identify Results` panel. You will see a new attribute called **tmax_1** added to each feature. This is the pixel value of the raster layer extracted at the point's location. The *1* represents the band number of the raster. If the raster layer had multiple bands, you would see multiple new columns in the output layer.

  .. image:: /static/3/sampling_raster_data/images/7.png
     :align: center

8. First part of our analysis is over. Let's remove the unnecessary layers. Hold the :kbd:`Shift` key and select ``Sampled Points`` and ``2018_Gaz_ua_national`` layers. Right-click and select :guilabel:`Remove` to remove them from QGIS. When prompted for :guilabel:`Remove 2 legend entries?`, select :guilabel:`OK`.

  .. image:: /static/3/sampling_raster_data/images/8.png
     :align: center

9. Now we will use the counties layer to sample the raster and calculate average temperature for each county. Locate the ``tl_2018_us_county.shp`` file in the QGIS Browser drag it to the canvas. 

  .. image:: /static/3/sampling_raster_data/images/9.png
     :align: center

.. note::

  Most processing algorithms will read the input layer and create a new layer. But the **Zonal Statistics** algorithm is different. It modifies the input layer and adds new attributes to it. That's why it is important to unzip the input files first. QGIS can load a layer from a zip archive directly, but it cannot modify a zipped layer. The processing algorithm will fail if it cannot update the input layer.
  
10. A new layer ``tl_2018_us_county`` will be loaded to the :guilabel:`Layers` panel. Go to :menuselection:`Processing --> Toolbox`. 

  .. image:: /static/3/sampling_raster_data/images/10.png
     :align: center

11. Search and locate the :menuselection:`Raster analysis --> Zonal statistics` algorithm and double-click to launch it.

  .. image:: /static/3/sampling_raster_data/images/11.png
     :align: center

12. Select ``us.tmax_nohads_ll_20190501_float`` as the :guilabel:`Raster layer` and ``tl_2018_us_county`` as the :guilabel:`Vector layer containing zones`. Enter ``tmax_`` as the :guilabel:`Output column prefix`. Click the :guilabel:`...` next to :guilabel:`Statistics to calculate`.

  .. image:: /static/3/sampling_raster_data/images/12.png
     :align: center

13. Select only the ``Mean`` value and click :guilabel:`OK`.

  .. image:: /static/3/sampling_raster_data/images/13.png
     :align: center

14. Click :guilabel:`Run` to start the processing. The algorithm may take a few minutes to complete. Click :guilabel:`Close`.

  .. image:: /static/3/sampling_raster_data/images/14.png
     :align: center

15. As noted earlier, the **Zonal Statistics** algorithm doesn't create a new layer, but modifies the zone layer. Right-click the ``tl_2018_us_county`` layer, and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/sampling_raster_data/images/15.png
     :align: center

16. You will see a new column called ``tmax_mean`` added to the attribute table. This contains the average temperature value extracted over the polygon for each feature. There are some null values because those counties (belonging to Alaska, Hawaii and Puerto Rico) are outside of the raster layer's extent.

  .. image:: /static/3/sampling_raster_data/images/16.png
     :align: center