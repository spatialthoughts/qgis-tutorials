Sampling Raster Data using Points or Polygons
=============================================
.. raw:: html

   <p>[ Download PDF
   <a class="reference external" href="../pdf/sampling_raster_data_a4.pdf"
   onClick="ga('send', 'event', 'PDF Download', 'sampling_raster_data_a4');"
   target="_blank">A4</a>

   <a class="reference external"
   href="../pdf/sampling_raster_data_letter.pdf" onClick="ga('send',
   'event', 'PDF Download', 'sampling_raster_data_letter');"
   target="_blank">Letter</a> ]</p>

Many scientific and environmental datasets come as gridded rasters. Elevation
data (DEM) is also distributed as raster files. In these raster files, the
parameter that is being represented is encoded as the pixel values of the
raster. Often, one needs to extract the pixel values at certain locations or
aggregate them over some area. This functionality is available in QGIS via two
plugins - ``Point Sampling Tool`` and ``Zonal Statistics plugin``.

Overview of the task
--------------------

Given a raster grid of maximum temperature in the US, we need to extract the
temperature at all urban areas and also calculate the average temperature for
each county in the US.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Re-project a vector layer.
- Select and remove multiple layers from QGIS Table of Contents.

Get the data
------------

NOAA’s `Climate Prediction Center <http://www.cpc.ncep.noaa.gov/>`_ provides
`GIS data <http://www.cpc.ncep.noaa.gov/products/GIS/GIS_DATA/>`_ related to
temperature and precipitation in the US. Download the `latest grid filei for
maximum temperatures <ftp://ftp.cpc.ncep.noaa.gov/GIS/GRADS_GIS/GeoTIFF/TEMP/us_tmax/>`_. The file
will be named ``us.tmax_nohads_ll_{YYYYMMDD}_float.tif``

We will use a CSV file from `2013 US Gazetteer
<https://www.census.gov/geo/maps-data/data/gazetteer2013.html>`_ representing
urban areas in the US.  Download the `Urban Areas Gazetteer File
<http://www2.census.gov/geo/gazetteer/2013_Gazetteer/2013_Gaz_ua_national.zip>`_.

As we want to aggregate temperature over counties, we will use `2013 TIGER/Line
Shapefiles <https://www.census.gov/cgi-bin/geo/shapefiles2013/main>`_. Download
the `Counties (and equivalents) shapefile
<http://www2.census.gov/geo/tiger/TIGER2013/COUNTY/tl_2013_us_county.zip>`_.

For convenience, you may directly download a copy of the datasets from the
links below:

`us.tmax_nohads_ll_20140525_float.tif <../../downloads/us.tmax_nohads_ll_20140525_float.tif>`_

`2013_Gaz_ua_national.zip <../../downloads/2013_Gaz_ua_national.zip>`_

`tl_2013_us_county.zip <../../downloads/tl_2013_us_county.zip>`_

Data Sources: [NOAACPC]_, [USGAZETTEER]_ [TIGER]_

Procedure
---------

1. Go to :menuselection:`Layer --> Add Raster Layer` and browse to the
   downloaded ``us.tmax_nohads_ll_{YYYYMMDD}_float.tif`` file and click
   :guilabel:`Open`.

.. image:: /static/sampling_raster_data/images/1.png
   :align: center

2. Once the layer is loaded, select the :guilabel:`Identify` tool and click
   anywhere on the layer. You will see the temperature value in celsius as the
   value or Band 1 at that location.

.. image:: /static/sampling_raster_data/images/2.png
   :align: center

3. Now unzip the downloaded ``2013_Gaz_ua_national.zip`` file and extract the
   ``2013_Gaz_ua_national.txt`` file on your disk. Go to :menuselection:`Layer
   --> Add Delimited Text Layer`.

.. image:: /static/sampling_raster_data/images/3.png
   :align: center

4. In the :guilabel:`Create a Layer from Delimited Text File` dialog, click
   :guilabel:`Browse` and open ``2013_Gaz_ua_national.txt``. Choose
   :guilabel:`Tab` under :guilabel:`Custom delimiters`. The point coordinates
   are in Latitude and Longitude, so select :guilabel:`INTPTLONG` as
   :guilabel:`X field` and :guilabel:`INTPTLAT` as :guilabel:`Y field`. Check
   the :guilabel:`Use spatial index` box and click :guilabel:`OK`.

.. image:: /static/sampling_raster_data/images/4.png
   :align: center

5. Now we are ready to extract the temperature values from the raster layer.
   Install the ``Point Sampling Tool`` plugin. See :doc:`using_plugins` for
   details on how to install plugins.

.. image:: /static/sampling_raster_data/images/5.png
   :align: center

6. Open the plugin dialog from :menuselection:`Plugins --> Analyses --> Point
   sampling tool`.

.. image:: /static/sampling_raster_data/images/6.png
   :align: center

7. In the :guilabel:`Point Sampling Tool` dialog, select
   ``2013_Gaz_ua_national`` as the :guilabel:`Layer containing sampling
   points`. We must explicitely pick the fields from the input layer that we
   want in the output layer.  Choose ``GEOID`` and ``NAME`` fields from the
   ``2013_Gaz_ua_national`` layer. We can sample values from multiple raster
   band at once, but since our raster has only 1 band, choose the
   ``us.tmax_nohads_ll_{YYYYMMDD}_float: Band 1``. Name the output vector layer
   as ``max_temparature_at_urban_locations.shp``. Click the :guilabel:`OK` to
   start the sampling process. Click :guilabel:`Close` once the process
   finishes.

.. image:: /static/sampling_raster_data/images/7.png
   :align: center

8. You will see a new layer ``max_temparature_at_urban_locations`` loaded in
   QGIS. Use the :guilabel:`Identify` tool to click on any point to see the
   attributes. You will see the ``us.tmax_no`` field - which contains the
   raster pixel value at the location of the point.

.. image:: /static/sampling_raster_data/images/8.png
   :align: center

9. First part of our analysis is over. Let's remove the unnecessary layers. Hold
   the :kbd:`Shift` key and select ``max_temparature_at_urban_locations`` and
   ``2013_Gaz_ua_national`` layers. Right-click and select :guilabel:`Remove`
   to remove them from QGIS TOC.

.. image:: /static/sampling_raster_data/images/9.png
   :align: center

10. Go to :menuselection:`Layer --> Add Vector Layer`. Browse to the downloaded
    ``tl_2013_us_county.zip`` file and click :guilabel:`Open`. Select the
    ``tl_2013_us_county.shp`` as the layer and click :guilabel:`OK`.

.. image:: /static/sampling_raster_data/images/10.png
   :align: center

11. The ``tl_2013_us_county`` will be added to QGIS. This layer is in
    ``EPSG:4269 NAD83`` projection. This doesn't match the projection of the
    raster layer. We will re-project this layer to ``EPSG:4326 WGS84``
    projection.

.. image:: /static/sampling_raster_data/images/11.png
   :align: center

12. Right-click the ``tl_2013_us_county`` layer and select :guilabel:`Save
    As..`.

.. image:: /static/sampling_raster_data/images/12.png
   :align: center

13. In the :guilabel:`Save Vector layer as..` dialog, click :guilabel:`Browse`
    and name the output file as ``counties.shp``. Choose :guilabel:`Selected
    CRS` from the :guilabel:`CRS` dropdown menu. Click :guilabel:`Browse` and
    select ``WGS 84`` as the CRS. Check the :guilabel:`Add saved file to map`
    and click :guilabel:`OK`.

.. image:: /static/sampling_raster_data/images/13.png
   :align: center

14. A new layer named ``counties`` will be add to QGIS.

.. image:: /static/sampling_raster_data/images/14.png
   :align: center

15. Enable the ``Zonal Statistics Plugins``. This is a core plugin so it is
    already installed. See :doc:`using_plugins` to know to how enable core
    plugins.

.. image:: /static/sampling_raster_data/images/15.png
   :align: center

16. Go to :menuselection:`Raster --> Zonal statistics --> Zonal statistics`.

.. image:: /static/sampling_raster_data/images/16.png
   :align: center

17. Select ``us.tmax_nohads_ll_{YYYYMMDD}_float`` as the :guilabel:`Raster
    layer` and ``counties`` as the :guilabel:`Polygon layer containing the
    zones`. Enter ``ZS_`` as the :guilabel:`Output column prefix`. Click
    :guilabel:`OK`.

.. image:: /static/sampling_raster_data/images/17.png
   :align: center

18. The analysis may take some time depending on the size of the dataset.

.. image:: /static/sampling_raster_data/images/18.png
   :align: center

19. Once the processing finishes, select the ``counties`` layer. Use the
    :guilabel:`Identify` tool and click on any county polygon. You will see
    three new attributes added to the layer: ``ZS_count``, ``ZS_mean`` and
    ``ZS_sum``. These attributes contain the count of raster pixels, mean of
    raster pixel values and sum of raster pixel values respectively. Since we
    are interested in average temperature, the ``ZS_mean`` field will be the
    one to use.

.. image:: /static/sampling_raster_data/images/19.png
   :align: center

20. Let's style this layer to create a temperature map. Right-click the
    ``counties`` layer and select :guilabel:`Properties`.

.. image:: /static/sampling_raster_data/images/20.png
   :align: center

21. Switch to the :guilabel:`Style` tab. Choose :guilabel:`Graduated` style and
    select ``ZS_mean`` as the :guilabel:`Column`. Choose a :guilabel:`Color
    Ramp` and :guilabel:`Mode` of your chose. Click :guilabel:`Classify` to
    create the classes. Click :guilabel:`OK`. (See :doc:`basic_vector_styling`
    for more details on styling.)

.. image:: /static/sampling_raster_data/images/21.png
   :align: center

22. You will see the county polygons styled using average maximum temperature
    extracted from the raster grid.

.. image:: /static/sampling_raster_data/images/22.png
   :align: center
