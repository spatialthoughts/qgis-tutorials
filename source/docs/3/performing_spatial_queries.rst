Performing Spatial Queries (QGIS3)
==================================
Spatial queries are core to many types of GIS analysis. Spatial queries allows you to select features in a layer by their spatial relationships (intersect, contain, touch etc.) with features from another layer. In QGIS, this functionality is available via the **Select by Location** and **Extract by Location** Processing tools.

Overview of the task
--------------------

We will be working with 2 data layers for the city of Melbourne, Australia. Given the data layers for the pubs and bars in the city and locations of all metro stations, we want to find out all bars and pubs within 500 meters of a metro station. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Choosing an appropriate projection and re-projecting vector data.
- Creating buffers.
- Working with the geopackage (.gpkg) data format.

Get the data
------------

City of Melbourne's `Open Data Platform <https://data.melbourne.vic.gov.au/>`_ provides many GIS-ready datasets for the city.

Download the `Metro Train Stations with Accessibility Information <https://data.melbourne.vic.gov.au/Transport-Movement/Metro-Train-Stations-with-Accessibility-Informatio/mgkp-67ad>`_ dataset by Metro Trains Melbourne. Export the data in the *Original* format.

.. image:: /static/3/performing_spatial_queries/images/data1.png
   :align: center
     
Download the `Bars and pubs, with patron capacity <https://data.melbourne.vic.gov.au/Economy/Bars-and-pubs-with-patron-capacity/mffi-m9yn>`_ dataset by City of Melbourne's Census of Land Use and Employment (CLUE). Export the data as a *CSV*.

.. image:: /static/3/performing_spatial_queries/images/data2.png
   :align: center
   
For convenience, you may directly download a copy of datasets from the link below:

`metro_stations_accessbility.zip <https://www.qgistutorials.com/downloads/metro_stations_accessbility.zip>`_

`Bars_and_pubs__with_patron_capacity <https://www.qgistutorials.com/downloads/Bars_and_pubs__with_patron_capacity.csv>`_

Data Source: [CITYOFMELBOURNE]_

Procedure
---------

1. Locate the ``metro_stations_accessbility.zip`` file in the QGIS Browser and expand it. Select the ``metro_stations_accessbility.shp`` file and drag it to the canvas. A new layer ``metro_stations_accessbility`` will be loaded in the :guilabel:`Layers` panel. 

  .. image:: /static/3/performing_spatial_queries/images/1.png
     :align: center

2. The data layer for bars and pubs is in the CSV format. To load it in QGIS, go to :menuselection:`Layer --> Add Layer --> Add Delimited Text Layer...`. ( See :doc:`importing_spreadsheets_csv` for more details on importing CSV files)

  .. image:: /static/3/performing_spatial_queries/images/2.png
     :align: center

3. In the :guilabel:`Data Source Manager | Delimited Text` dialog, browse and select the downloaded ``Bars_and_pubs__with_patron_capacity.csv`` file as :guilabel:`File name`. The :guilabel:`X field` and :guilabel:`Y field` columns should be auto selected to ``x coordinate`` and ``y coordinate`` respectively. Click :guilabel:`Add`.

  .. image:: /static/3/performing_spatial_queries/images/3.png
     :align: center

4. You will see a new ``Bars_and_pubs__with_patron_capacity`` layer added to the :guilabel:`Layers` panel. Both of the input layers are in the Geograhpic Coordinate Reference System (CRS) ``EPSG:4326 WGS84``. For performing spatial analysis, it is recommended to use a Projected Coordinate Reference System (CRS). So we will now re-project both the layers to an appropriate regional CRS that minimizes distortions and allows us to work in units of distance such as meters instead of degrees. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/performing_spatial_queries/images/4.png
     :align: center

5. Search and locate the :menuselection:`Vector general --> Reproject layer` tool. Double-click to launch it.

  .. image:: /static/3/performing_spatial_queries/images/5.png
     :align: center

6. Select ``Bars_and_pubs__with_patron_capacity`` as the :guilabel:`Input layer`. Click the :guilabel:`Select CRS` button next to :guilabel:`Target CRS`. 

  .. image:: /static/3/performing_spatial_queries/images/6.png
     :align: center

7. When selecting a projected coordinate system for your analysis, the first place to look is for a regional CRS for the area of interest. For Australia, the `Map Grid of Australia (MGA) 2020 <https://www.ga.gov.au/scientific-topics/positioning-navigation/geodesy/datums-projections/grid2020>`_ is a UTM-based grid system that is used for local and regional mapping. Melbourne falls in the UTM Zone 55, so we can select the `GDA 2020 / MGA zone 55 EPSG:7855`` CRS.

  .. image:: /static/3/performing_spatial_queries/images/7.png
     :align: center

.. note::

  If you are not sure of the a local CRS for the region that you are working in, selecting a CRS for the UTM zone based on the WGS84 datum is a safe choice. You can find out the UTM zone number of your region using `UTM Grid Zones of the World <http://www.dmap.co.uk/utmworld.htm>`_.
  
8. Next, click the :guilabel:`...` button next to :guilabel:`Reprojected` and select ``Save to GeoPackage``. `Geopackage <https://www.geopackage.org/>`_ is the recommended open data format spatial data and is the default data exchange format for QGIS3. A single GeoPackage ``.gpkg`` file can contain multiple vector and raster layers.

  .. image:: /static/3/performing_spatial_queries/images/8.png
     :align: center

9. Name the geopackage as ``spatialquery`` and click :guilabel:`Save`.

  .. image:: /static/3/performing_spatial_queries/images/9.png
     :align: center

10. When prompted for a layer name, enter ``bars_and_pubs`` and click :guilabel:`OK`. Click :guilabel:`Run` to reproject the layer. 

  .. image:: /static/3/performing_spatial_queries/images/10.png
     :align: center

11. The window will switch to the :guilabel:`Log` tab and you will see the algorithm run and create the new output layer ``bars_and_pubs``.

  .. image:: /static/3/performing_spatial_queries/images/11.png
     :align: center

12. Now we will reproject the ``metro_stations_accessbility`` layer. Switch back to the :guilabel:`Paramters` tab in the :guilabel:`Reproject layer` window. Select ``metro_stations_accessbility`` as the :guilabel:`Input layer`. Keep the same :guilabel:`Target CRS`.  Next, click the :guilabel:`...` button next to :guilabel:`Reprojected` and select ``Save to GeoPackage``. Select the same output file ``spatialquery`` (Remember that a single geopackage file can contain multiple layers, so we will save the new layer to the same geopackage file). Enter ``metro_stations`` as the :guilabel:`Layer name`. Click :guilabel:`Run`.

  .. image:: /static/3/performing_spatial_queries/images/12.png
     :align: center

13. Back in the main QGIS window, you will see 2 new layers loaded in the :guilabel:`Layers` panel: ``bars_and_pubs`` and ``metro_stations``. You may turn off the visibility for original layers. Now, we are ready to do the spatial query. As we are interested in selecting bars and pubs within 500m of the metro stations, the first step is to create a buffer around the metro stations that represents our search area. Search and locate the :menuselection:`Vector geometry --> Buffer` tool in the :guilabel:`Processing Toolbox` and double-click to launch it.

  .. image:: /static/3/performing_spatial_queries/images/13.png
     :align: center

14. In the :guilabel:`Buffer` dialog, select ``metro_stations`` as the :guilabel:`Input layer`. Set ``500`` meters as the :guilabel:`Distance`. Save the output to the same ``spatialquery`` geopackage and enter ``metro_stations_buffers`` as the :guilabel:`Layer name`. Click :guilabel:`Run`.

  .. image:: /static/3/performing_spatial_queries/images/14.png
     :align: center

15. You will see a new ``metro_stations_buffers`` layers loaded in the :guilabel:`Layers` panel. Now we can find out which points from the ``bars_and_pubs`` layer falls within the polygons from the ``metro_stations_buffers`` layer. Locate the :menuselection:`Vector selection --> Extract by Location` tool from the :guilabel:`Processing Toolbox` and double-click to launch it. 

  .. image:: /static/3/performing_spatial_queries/images/15.png
     :align: center

.. note::

  *Extract by location* will create a new layer with the matching features from the spatial query. If you just want to select features, use the *Select by location* tool.
  
16. In the :guilabel:`Extract by location` dialog, select ``bars_and_pubs`` as the :guilabel:`Extract features from`. Check ``Intersect`` as the :guilabel:`geometry predicate`. Set ``metro_stations_buffers`` as :guilabel:`By comparing to the features from`. Save the output to the ``spatialquery`` geopackage as the layer ``selected``. Click :guilabel:`Run`.

  .. image:: /static/3/performing_spatial_queries/images/16.png
     :align: center

17. Once the processing finishes, you will see the ``selected`` layers added to the :guilabel:`Layers` panel. Note that this layer only contains points from the ``bars_and_pubs`` that fall within the buffer polygons.

  .. image:: /static/3/performing_spatial_queries/images/17.png
     :align: center

18. Our analysis is complete. You may notice that the buffer polygons look oval-shaped. This is because our Project CRS is still set to **EPSG:4326 WGS84**. To better visualize the results, you can go to :menuselection:`Project --> Properties --> CRS` and select ``GDA 2020 / MGA zone 55 EPSG:7855`` which we used for the analysis. Once set to this CRS, the buffer will appear in the correct shape.

  .. image:: /static/3/performing_spatial_queries/images/18.png
     :align: center
