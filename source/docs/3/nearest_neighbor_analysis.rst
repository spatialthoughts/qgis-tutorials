Nearest Neighbor Analysis (QGIS3)
=================================

GIS is very useful in analyzing spatial relationship between features. One such analysis is finding out which features are closest to a given feature. There are multiple ways to do this analysis in QGIS. In this tutorial,wWe will explore the **Distance to nearest hub** and **Distance matrix** tools to carry out the nearest neighbor analysis.

Overview of the task
--------------------

Given the locations of all known significant earthquakes, find out the nearest populated place for each location where the earthquake happened.
 
Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Use the *Geometry Generator* renderer to dynamically create lines from a multipoint layer.

Get the data
------------

We will use NOAA’s National Geophysical Data Center’s `Significant Earthquake Database <https://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1>`_ as our layer representing all major earthquakes. Download the `tab-delimited earthquake data <https://www.ngdc.noaa.gov/nndc/struts/results?type_0=Exact&query_0=$ID&t=101650&s=13&d=189&dfn=signif.txt>`_.  

Natural Earth has a nice `Populated Places <https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_ dataset. Download the `simple (less columns) dataset <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_


For convenience, you may directly download a copy of both the datasets from the links
below:

`signif.txt <https://www.qgistutorials.com/downloads/signif.txt>`_

`ne_10m_populated_places_simple.zip <https://www.qgistutorials.com/downloads/ne_10m_populated_places_simple.zip>`_

Data Sources: [NGDC]_ [NATURALEARTH]_

Procedure
---------

1. Locate the downloaded ``ne_10m_populated_places_simple.zip`` file in the :guilabel:`Browser` panel and expand it. Drag the ``ne_10m_populated_places_simple.shp`` file to the canvas.

  .. image:: /static/3/nearest_neighbor_analysis/images/1.png
     :align: center

2. You will see a new layer ``ne_10m_populated_places_simple`` loaded in the :guilabel:`Layers` panel. This layer contains the points representing populated places. Now we will load the earthquakes layer. This layer comes as a *Tab Serepated Values (TSV)* text file. To load this file, click the :guilabel:`Open Data Source Manager` button on the :guilabel:`Data Source Toolbar`. You can also use :kbd:`Ctrl + L` keyboard shortcut.

  .. image:: /static/3/nearest_neighbor_analysis/images/2.png
     :align: center

3. Click the :guilabel:`...` button next to :guilabel:`File name` and browse to the downloaded ``signif.txt`` file. Once loaded, the :guilabel:`File Format` and :guilabel:`Geometry Definition` fields should be auto-populated with correct values. Click :guilabel:`Add` followed by :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/3.png
     :align: center

4. Zoom around and explore both the datasets. Each yellow point represents the location of a significant earthquake and each red point represents the location of a populated place. Our goal is to find out the nearest point from the populated places layer for each of the points in the earthquake layer.

  .. image:: /static/3/nearest_neighbor_analysis/images/4.png
     :align: center

5. Before we do the analysis, we need to clean up our inputs. The ``signif`` layer contains many records without a valid geometry. These records were imported with a **NULL** geometry. So let's remove these records first. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/nearest_neighbor_analysis/images/5.png
     :align: center

6. Search for and locate the :menuselection:`Vector geometry --> Remove null geometries` tool. Double-click to launch it.

  .. image:: /static/3/nearest_neighbor_analysis/images/6.png
     :align: center

7. Select ``signif`` as the :guilabel:`Input layer` and click :guilabel:`Run`. Once the processing finishes, click :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/7.png
     :align: center

8. You will see a new layer caled ``Non null geometries`` loaded into the :guilabel:`Layers` panel. We will use this layer instead of the original ``signif`` layer in further analysis. Un-check the ``signif`` layer in the :guilabel:`Layers` panel to hide it. Now it is time to perform the nearest neighbor analysis. Search and locate the :menuselection:`Vector analysis --> Distance to nearest hub (line to hub)` tool. Double-click to launch it.

  .. image:: /static/3/nearest_neighbor_analysis/images/8.png
     :align: center

.. note::

  If you need point layer as output, use the *Distance to nearest hub (points)* tool instead.
  
9. In the :guilabel:`Distance to Nearest Hub (Line to Hub)` dialog, select ``Non null geometries`` as the :guilabel:`Source points layer`. Select ``ne_10m_populated_places_simple`` as the :guilabel:`Distination hubs layer`. Select ``name`` as the :guilabel:`Hub layer name attribute`. The tool will also compute straight-line distance between the populated place and the nearest earthquake. Set ``Kilometers`` as the :guilabel:`Measurement unit`. Click :guilabel:`Run`. Once the processing finishes, click :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/9.png
     :align: center

10. Back in the main QGIS window, you will see a new line layer called ``Hub distance`` loaded in the :guilabel:`Layers` panel. This layer has line features connecting each earthquake point to the nearest populated place. Right-click the ``Hub distance`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/nearest_neighbor_analysis/images/10.png
     :align: center

11. Scroll right to the last columns and you will see 2 new attributes called **HubName** and **HubDist** added to the original earthquake features. This is the name the distance to the nearest neighbor from the populated places layer.

  .. image:: /static/3/nearest_neighbor_analysis/images/11.png
     :align: center

12. Our analysis is complete. We can now explore another tool that can also do a similar analysis. **Distance Matrix** is a powerful tool that allows you to not only compute distance to the nearest point, but to all the points from another layer. We can use this method as an alternative to the *Distance to nearest hub* tool. Un-check the ``Hub distance`` layer to hide it. Search and locate the :menuselection:`Vector analysis --> Distance matrix` tool. 

  .. image:: /static/3/nearest_neighbor_analysis/images/12.png
     :align: center

13. In the :guilabel:`Distance matrix` dialog, set ``Non null geometries`` as the :guilabel:`Input point laeyer` and ``I_D`` as the :guilabel:`Input unique ID field`. Set ``ne_10m_populated_places_simple`` as the :guilabel:`Target point layer` and ``name`` as the :guilabel:`Target unique ID field`. Select ``Linear (N*k x 3) distance matrix`` as the :guilabel:`Output matrix type`. The key here is to set the :guilabel:`Use only the nearest (k) target points` parameter to ``1`` - which will give you only the nearest neighbor in the output. Click :guilabel:`Run` to start the matrix calculation. Once the processing finishes, click :guilabel:`Close`.

  .. image:: /static/3/nearest_neighbor_analysis/images/13.png
     :align: center

14. Once the processing finishes, a new layer called ``Distance matrix`` will be loaded. Note that the output of this tool is a layer containin *MultiPoint* geometries. Each feature contains 2 points - source and target. Open the :guilabel:`Attribute Table` for the layer. You will see that each feature has attributes mapping the earthquake to its nearest populated place. Note that the distance here is in the layer's CRS units (degrees). 

  .. image:: /static/3/nearest_neighbor_analysis/images/14.png
     :align: center

15. At this point, you can save your results in the format of your choice by right-clicking the layer and selecting :menuselection:`Export --> Save Features As`. If you want to visualize the results better, we can easily create a hub-spoke rendering from the feature's geometry. Right-click the ``Distance matrix`` layer and select :guilabel:`Properties`.

  .. image:: /static/3/nearest_neighbor_analysis/images/15.png
     :align: center

16. In the :guilabel:`Properties` dialog, switch to the :guilabel:`Symbology` tab. Click on the ``Simple marker`` sub-renderer and select ``Geometry generator`` as the :guilabel:`Symbol layer type`. Set ``LineString / MultiLineString`` as the :guilabel:`Geometry type`. Click the :guilabel:`Expression` button.

  .. image:: /static/3/nearest_neighbor_analysis/images/16.png
     :align: center

17. Here we can enter an expression to create a line geometry from the 2 points within each multi-point source geometry. Enter the following expression.

  .. code-block:: none

    make_line(point_n( $geometry, 1), point_n( $geometry, 2))

  .. image:: /static/3/nearest_neighbor_analysis/images/17.png
     :align: center

18. Back in the :guilabel:`Symbology` tab, set the style of the line as per your liking and click :guilabel:`OK`.

  .. image:: /static/3/nearest_neighbor_analysis/images/18.png
     :align: center

19. You will see the ``Distance matrix`` layer now rendered with lines instead of points. Note that we did not have to create a new layer for this visualization. The layer still contains MultiPoint geometries, but it is dynamically rendered as lines based on the expression.

  .. image:: /static/3/nearest_neighbor_analysis/images/19.png
     :align: center