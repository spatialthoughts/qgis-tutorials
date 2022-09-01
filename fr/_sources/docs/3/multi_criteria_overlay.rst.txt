Multi Criteria Overlay Analysis (QGIS3)
====================================================

Multi-criteria weighted-overlay analysis is the process of the allocating areas on the basis of a variety of attributes that the selected areas should possess. Although this is a common GIS operation, it is best performed in the raster space using a grid-based approach. 

.. note:: 

  Vector vs Raster Overlays
  
  You can do the overlay analysis on vector layers using geoprocessing tools such as buffer, dissolve, difference and intersection. This method is ideal if you wanted to find a binary **suitable/non-suitable** answer and you are working with a handful of layers. 
  
  Working in the raster space gives you a **ranking** of the suitability - not just the best suited site. It also allows you to combine any number of input layers easily and assign different weights to each criteria. In general, this is the preferred approach for site suitability.

This tutorial goes through the typical workflow for performing a site-suitability analysis - converting source vector data to appropriate rasters, re-classify them and perform mathematical operations.

Overview of the task
--------------------

In this tutorial, we will identify the suitable areas for development, that are

- Close to roads, and
- Away from water bodies, and
- Not in a protected region.


Get the data
------------
We will use vector data layers from `OpenStreetMap (OSM) <http://www.openstreetmap.org/>`_. OSM is a global database of freely available base map data. `Geofabrik <http://download.geofabrik.de/>`_ provides daily updated shapefiles of OpenStreetMap datasets.

We will be using the OSM data layers for the state of Assam in India. Geofabrik `India shapefiles <http://download.geofabrik.de/asia/india.html>`_ were downloaded, clipped to the state boundary and packaged in a single GeoPackage file. You can download a copy of the geopackage from the link below:

`assam.gpkg <https://www.qgistutorials.com/downloads/assam.gpkg>`_

Data Source: [GEOFABRIK]_

Procedure
---------

1. Browse to the downloaded ``assam.gpkg`` file in QGIS Browser. Expand it and drag each of the 5 individual data layers to the map canvas. You will see ``boundary``, ``roads``, ``protected_regions``, ``water_polygons`` and ``water_polylines`` layers loaded in the :guilabel:`Layers` panel.

  .. image:: /static/3/multi_criteria_overlay/images/1.png
    :align: center

2. First step in the overlay analysis, is to convert each data layer to raster. An important consideration is that all rasters must be of the same extent. We will use the ``boundary`` layer as the extent for all the rasters. Go to :menuselection:`Processing --> Toolbox`. Search for and locate the :menuselection:`GDAL --> Vector conversion --> Rasterize (vector to raster)`` algorithm. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/2.png
    :align: center

3. In the :guilabel:`Rasterize (vector to raster)` dialog, select ``roads`` as the :guilabel:`Input layer`. We want to create an output raster where pixel values are 1 where there is a road and 0 where there are no roads. Enter ``1`` as the :guilabel:`A fixed value to burn`. The input layers are in a projected CRS with meters are the unit. Select ``Geoferenced units`` as the :guilabel:`Output raster size units`. We will set the resolution of the output raster to be 15 meters. Select ``15`` as both :guilabel:`Width/Horizontal resolution` and :guilabel:`Height/Vertical resolution`. Next, click the :guilabel:`...` button next to :guilabel:`Output extent` and select ``boundary`` for :guilabel:`Use extent for`.

  .. image:: /static/3/multi_criteria_overlay/images/3.png
    :align: center

4. Scroll down further and click the arrow button in the :guilabel:`Assign a specific nodata value to output bands`. That field should now be set to ``Not set``. This is important because when raster calculator (which we will use later) encounters a pixel with nodata value in any layer, it sets the output to nodata as well, resulting is wrong output. Set the :guilabel:`Rasterized` output raster as ``raster_roads.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/multi_criteria_overlay/images/4.png
    :align: center

5. Once the processing finishes, you will see a new layer :guilabel:`raster_roads` loaded in the :guilabel:`Layers` panel. The default styling will show pixels with roads as white and others as black. We want to convert other 4 vector layers to rasters as well. Rather than running the rasterize algorithm one-by-one, we can use the built-in batch-processing functionality to convert them all at once. See :doc:`batch_processing` tutorial to learn more about batch processing. Right-click the ``Rasterize (vector to raster)`` algorithm and select :guilabel:`Execute as Batch Process`.

  .. image:: /static/3/multi_criteria_overlay/images/5.png
    :align: center

6. In the :guilabel:`Batch Processing` dialog, click the :guilabel:`...` button in the first row of the :guilabel:`Input layer` column. Select ``boundary``, ``protected_regions``, ``water_polygons`` and ``water_polylines`` layers and click :guilabel:`OK`.

  .. image:: /static/3/multi_criteria_overlay/images/6.png
    :align: center

7. Fill in the parameters with the same values we used in the roads layer. After filling the first-row of the parameter, use the :menuselection:`Autofill --> Fill Down` button to add the same value for all layers.

  .. image:: /static/3/multi_criteria_overlay/images/7.png
    :align: center

8. In the last column :guilabel:`Rasterized`, click the :guilabel:`...` button in the first row. Select ``Fill with parameter values`` as the :guilabel:`Autofill mode` and ``Input layer`` as the :guilabel:`Parameter to use`. Click :guilabel:`OK`.

  .. image:: /static/3/multi_criteria_overlay/images/8.png
    :align: center

9. Browse to a directory on your computer and name the layer as ``raster_``. The batch processing interface will autocomplete the name with the layer name and fill in all rows. Make sure the :guilabel:`Load layers on completion` box is checked and click :guilabel:`OK`.

  .. image:: /static/3/multi_criteria_overlay/images/9.png
    :align: center

10. Once the processing finishes, you will have 4 new raster layers loaded in the :guilabel:`Layers` panel. You will notice that we have 2 water related layers - both representing water. We can merge them to have a single layer representing water areas in the region. Search for and locate :menuselection:`Raster analysis --> Raster calculator` algorithm in the Processing Toolbox. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/10.png
    :align: center

11. Enter the following expression in the :guilabel:`Expression` box. You can click on the appropriate layer in the :guilabel:`Layers` box to auto insert the layer names. This expression means that we want to sum the pixel values in the first band of both the water rasters. Click the :guilabel:`...` button next to :guilabel:`Reference layer(s) and select ``raster_water_polygons`` as the reference layer. Name the output ``raster_water_merged.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    "raster_water_polygons@1" + "raster_water_polylines@1"

  .. image:: /static/3/multi_criteria_overlay/images/11.png
    :align: center
 
12. The resulting merged raster will have pixels with value 1 for all areas with water. But you will notice that there are some regions where there was both a water polygon and a water polyline. Those areas will have pixels with value 2 - which is not correct. We can fix it with a simple expression. Open :menuselection:`Raster analysis --> Raster calculator` algorithm again.

  .. image:: /static/3/multi_criteria_overlay/images/12.png
    :align: center

13. Enter the following expression which will assign the value 1 that match the expression and 0 where it doesn't. Click the :guilabel:`...` button next to :guilabel:`Reference layer(s) and select ``raster_water_merged`` layer. Name the output ``raster_water.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    "raster_water_merged@1" > 0

  .. image:: /static/3/multi_criteria_overlay/images/13.png
    :align: center

14. The resulting layer ``raster_water`` now has pixels with only 0 and 1 values.

  .. image:: /static/3/multi_criteria_overlay/images/14.png
    :align: center

15. Now that we have layers representing road and water pixels, we can generate proximity rasters. These are also known as Euclidean distances - where each pixel in the output raster represents the distance to the nearest pixel in the input raster. This resulting raster can be then used to determine suitable areas which are within certain distance from the input. Search for and locate the :menuselection:`GDAL --> Raster analysis --> Proximity (raster distance)` algorithm. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/15.png
    :align: center

16. In the :guilabel:`Proximity (Raster Distance)` dialog, select ``raster_roads`` as the :guilabel:`Input layer`. Choose ``Georeferenced coordinates`` as the :guilabel:`Distance units`. As the input layers are in a projected CRS with meters as the units, enter ``5000`` (5 kilometers) as the :guilabel:`Maximum distance to be generated`. Make sure the :guilabel:`Nodata value to use for the destination proximity raster` value is ``Not set``. Name the output file as ``roads_proximity.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/multi_criteria_overlay/images/16.png
    :align: center

.. note:: 

  It make take upto 15 minutes for this process to run. It is a computationaly intensive algorithm that needs to compute distance for each pixel of the input raster and our input contains over 1 billion pixels.
  
17. Once the processing is over, a new layer ``roads_proximity`` will be added to the :guilabel:`Layers` panel. To visualize it better, let's change the default styling. Click the :guilabel:`Open the Layer Styling panel` button in the :guilabel:`Layers` panel. Change the :guilabel:`Max` value to ``5000`` under :guilabel:`Color gradient`.

  .. image:: /static/3/multi_criteria_overlay/images/17.png
    :align: center

18. Repeat the :guilabel:`Proximity (Raster Distance)` algorithm for the ``raster_water`` layer with same parameters and name the output ``water_proximity.tif``.

  .. image:: /static/3/multi_criteria_overlay/images/18.png
    :align: center

19. Once the processing finishes, you can apply the similar styling as before to visualize the results better. If you click around the resulting raster, you will see that it is a continuum of values from 0 to 5000. To use this raster in overlay analysis ,we must first re-classify it to create discrete values. Open :menuselection:`Raster analysis --> Raster calculator` algorithm again.

  .. image:: /static/3/multi_criteria_overlay/images/19.png
    :align: center

20. We want to give higher score to pixels that are near to roads. So let's use the following scheme.

- 0-1000m –> 100
- 1000-5000m –> 50
- >5000m –> 10

  Enter the following expression that applies the above criteria on the input. Click the :guilabel:`...` button next to :guilabel:`Reference layer(s) and select ``roads_proximity`` layer. Name the output ``roads_reclass.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    100*("roads_proximity@1"<=1000) + 50*("roads_proximity@1">1000)*("roads_proximity@1"<=5000) + 10*("roads_proximity@1">5000)

  .. image:: /static/3/multi_criteria_overlay/images/20.png
    :align: center

21. Once the re-classification process finishes, a new layer ``roads_reclass`` will be added to the :guilabel:`Layers` panel. This layer has only 3 different values, 10, 50 and 100 indicating relative suitability of the pixels with regards to distance from roads. Open :menuselection:`Raster analysis --> Raster calculator` algorithm again.

  .. image:: /static/3/multi_criteria_overlay/images/21.png
    :align: center

22. Repeat the re-classification process for the ``water_proximity`` layer. Here the scheme will be reverse, where pixels that are further away from water shall have higher score.

- 0-1000m –> 10
- 1000 -5000m —> 50
- >5000m –> 100

  Enter the following expression that applies the above criteria on the input. Click the :guilabel:`...` button next to :guilabel:`Reference layer(s) and select ``water_proximity`` layer. Name the output ``water_reclass.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    100*("water_proximity@1">5000) + 50*("water_proximity@1">1000)*("water_proximity@1"<=5000) + 10*("water_proximity@1"<1000)

  .. image:: /static/3/multi_criteria_overlay/images/22.png
    :align: center
    
23. Now we are ready to do the final overlay analysis. Recall that our criteria for determining suitability is as follows - close to roads, away from water and not in a protected region. Open :menuselection:`Raster analysis --> Raster calculator`. Enter the following expression that applies these criteria. Note that we are multiplying the result with ``raster_boundary@1`` at the end to discard pixel values outside of the state boundary. Click the :guilabel:`...` button next to :guilabel:`Reference layer(s)` and select ``raster_boundary`` layer. Name the output ``overlay.tif`` and click :guilabel:`Run`.

  .. code-block:: none

    ("roads_reclass@1" + "water_reclass@1")*("raster_protected_regions@1"  !=  1 )*"raster_boundary@1"

  .. image:: /static/3/multi_criteria_overlay/images/23.png
    :align: center

.. note::

  In this example, we are giving equal *weight* to both road and water proximity. In real-life scenario, you may have multiple criteria with different importance. You can simulate that by multiplying the rasters with appropriate *weights* in the above expression. For example, if proximity to roads is twice as importance as proximity away from water, you can multiply the ``roads_reclass`` raster with ``2`` in the expression above.
  
24. Once the processing finishes, the resulting raster ``overlay`` will be added to the :guilabel:`Layers` panel. The pixel values in this raster range from 0 to 200 - where 0 is the least suitable and 200 is the most suitable area for development. Click the :guilabel:`Open the Layer Styling panel` button in the :guilabel:`Layers` panel. 

  .. image:: /static/3/multi_criteria_overlay/images/24.png
    :align: center

25. Select ``singleband_pseudocolor`` renderer and the ``Spectral`` color ramp. Click :guilabel:`Classify` to apply the color ramp to the raster.

  .. image:: /static/3/multi_criteria_overlay/images/25.png
    :align: center

26. Click on the default label values next to each color and enter appropriate labels. The labels will also appear as the legend under the ``overlay`` layer.

  .. image:: /static/3/multi_criteria_overlay/images/26.png
    :align: center

27. Raster layers are rectangular grids. We want to hide pixels outside the state boundary. An easy way to achieve this is applying an ``Inverted Polygons`` rendered to the vector boundary layer. Scroll down in the :guilabel:`Layers` panel and locate the ``boundary`` layer. Select ``Inverted Polygons`` as the renderer and leave other options to default.

  .. image:: /static/3/multi_criteria_overlay/images/27.png
    :align: center

28. For the effect of the renderer to show, it needs to be at the top of the Table of Contents. Right-click the ``boundary`` layer and select :guilabel:`Move to Top`.

  .. image:: /static/3/multi_criteria_overlay/images/28.png
    :align: center

29. Check the layer and the map canvas would update to show the ``overlay`` raster clipped to the ``boundary`` layer. This is the final output that shows areas within the state that are suitable for development.

  .. image:: /static/3/multi_criteria_overlay/images/29.png
    :align: center
