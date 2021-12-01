Nearest Neighbor Analysis (QGIS3)
=================================

GIS is very useful in analyzing spatial relationship between features. One such analysis is finding out which features are closest to a given feature. There are multiple ways to do this analysis in QGIS. In this tutorial, We will explore the **Distance to nearest hub**.

Overview of the task
--------------------

Given the locations of all known earthquakes between years 1900 - 2000, find out the nearest populated place for each location where the earthquake happened.
 

Get the data
------------

1. For this tutorial we will download a dataset of earthquakes between 1900-2000 from NOAA’s National Geophysical Data Center produces a great dataset of all significant earthquakes since 2150 BC. `Visit the NOAA NCEI portal <https://www.ngdc.noaa.gov/hazel/view/hazards/earthquake/search>`_ and enter :guilabel:`Min` as ``1900`` and :guilabel:`Max` as ``2000``.  This will return all earthquake incidents that occurred and were recorded by NOAA between those years. For other specific results, you can filter with different parameters. Click :guilabel:`Search`.

  .. image:: /static/3/importing_spreadsheets_csv/images/data01.png
     :align: center

2. As a result, we got *2585* earthquake incidents. Click on the :guilabel:`Download TSV` icon. 

  .. image:: /static/3/importing_spreadsheets_csv/images/data02.png
     :align: center

Natural Earth has a nice `Populated Places <http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_ dataset. Download the `simple (less columns) dataset <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_

For convenience, you may directly download a copy of both the datasets from the links
below:

`earthquakes_2021_11_25_14_31_59_+0530.tsv <https://www.qgistutorials.com/downloads/earthquakes-2021-11-25_14-31-59_+0530.tsv>`_ 


`ne_10m_populated_places_simple.zip <https://www.qgistutorials.com/downloads/ne_10m_populated_places_simple.zip>`_

Data Sources: [NCEI]_ [NATURALEARTH]_

Procedure
---------

1. Locate the downloaded ``ne_10m_populated_places_simple.zip`` file in the :guilabel:`Browser` panel and expand it. Drag the ``ne_10m_populated_places_simple.shp`` file to the canvas.

  .. image:: /static/3/nearest_neighbor_analysis/images/01.png
     :align: center

2. You will see a new layer ``ne_10m_populated_places_simple`` loaded in the :guilabel:`Layers` panel. This layer contains the points representing populated places. Now we will load the earthquakes layer. This layer comes as a *Tab Serepated Values (TSV)* text file. To load this file, click the :guilabel:`Open Data Source Manager` button on the :guilabel:`Data Source Toolbar`. You can also use :kbd:`Ctrl + L` keyboard shortcut.

  .. image:: /static/3/nearest_neighbor_analysis/images/02.png
     :align: center

3. In the :guilabel:`Data Source Manager` dialog box, select :guilabel:`Delimited Text`. 

  .. image:: /static/3/nearest_neighbor_analysis/images/03.png
     :align: center

4. Click the :guilabel:`...` button next to :guilabel:`File name` and browse to the downloaded ``earthquakes-2021-11-25_13-39-30_+0530.tsv`` file. Once loaded, the :guilabel:`File Format` and :guilabel:`Geometry Definition` fields should be auto-populated with correct values. Cross verify it with the markings below if required update field acordingly. Click :guilabel:`Add` followed by :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/04.png
     :align: center

5. Zoom around and explore both datasets. Each red point represents the location of an earthquake incidence, and each green point represents the location of a populated place. Our goal is to find out the nearest point from the populated places layer for each of the points in the earthquake layer. Let's inspect the Attribute table of the earthquakes layer. Select the layer and click on :guilabel:`Open Attribute Table` icon in :guilabel:`Toolbar`. 

  .. image:: /static/3/nearest_neighbor_analysis/images/05.png
     :align: center

6.  There are ``2586`` features, but the data contains few entries with invalid geometry. We have to remove that before proceeding further. Close the Attribute Table. 

  .. image:: /static/3/nearest_neighbor_analysis/images/06.png
     :align: center

7.  Go to :menuselection:`Processing --> Toolbox --> Vector geometry --> Remove null geometries` tool. Double-click to open it. 

  .. image:: /static/3/nearest_neighbor_analysis/images/07.png
     :align: center

8. In the :guilabel:`Remove Null Geometries` dialog box, Select ``earthquakes-2021-11-25_13-39-30_+0530`` as the :guilabel:`Input layer` and check the :guilabel:`Also remove empty geometries`. So both the invalid and empty geometry records will be removed. Click :guilabel:`Run`. Once the processing finishes, click :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/08.png
     :align: center

9. A new layer ``Non null geometries`` will be added to the :guilabel:`Layers` panel. Open the Attribute table by clicking the :guilabel:`Open Attribute Tabel` icon in :guilabel:`Toolbar`. For analysis we will use this layer instead of the original layer ``earthquakes-2021-11-25_13-39-30_+0530``. Un-check the ``earthquakes-2021-11-25_13-39-30_+0530`` layer in the :guilabel:`Layers` panel to hide it.

  .. image:: /static/3/nearest_neighbor_analysis/images/09.png
     :align: center

10. Now you can see only ``2578`` Features are there, as the invalid and null geometries were removed. Close the attribute table.   

  .. image:: /static/3/nearest_neighbor_analysis/images/10.png
     :align: center

11. Now it is time to perform the nearest neighbor analysis. Search and locate the :menuselection:`Processing --> Toolbox --> Vector analysis --> Distance to nearest hub (line to hub)` tool. Double-click to launch it.

  .. image:: /static/3/nearest_neighbor_analysis/images/11.png
     :align: center

.. note::

  We can also add a point layer as output, use the *Distance to nearest hub (points)* tool for that.
  
12. In the :guilabel:`Distance to Nearest Hub (Line to Hub)` dialog box, select ``Non null geometries``  as the :guilabel:`Source points layer`. Select ``ne_10m_populated_places_simple`` as the :guilabel:`Destination hubs layer`. Select ``name`` as the :guilabel:`Hub layer name attribute`. The tool will also compute the straight-line distance between the populated place and the nearest earthquake. Set ``Kilometers`` as the :guilabel:`Measurement unit`. Click on ``...``  in :guilabel:`Hub Distance` and click :guilabel:`Save to File...` to save the file as ``earthquakes_with_nearest_city.gpkg`` . Click :guilabel:`Run`.  Once the processing finishes, click :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/12.png
     :align: center

13. Back in the main QGIS window, you will see a new line layer called ``earthquakes_with_nearest_city`` loaded in the :guilabel:`Layers` panel. This layer has line features connecting each earthquake point to the nearest populated place. Select the ``earthquakes_with_nearest_city`` layer and click :guilabel:`Open Attribute Tabel` icon in :guilabel:`Toolbar`. 

  .. image:: /static/3/nearest_neighbor_analysis/images/13.png
     :align: center

14. Scroll right to the last columns, and you will see 2 new attributes called **HubName** and **HubDist** added to the original earthquake features. This is the name of the distance to the nearest neighbor from the populated places layer.

  .. image:: /static/3/nearest_neighbor_analysis/images/14.png
     :align: center