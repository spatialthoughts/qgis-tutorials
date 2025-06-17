Multi Criteria Overlay Analysis (QGIS3)
====================================================

Multi-criteria weighted-overlay analysis is the process of the allocating areas on the basis of a variety of attributes that the selected areas should possess. Although this is a common GIS operation, it is best performed in the raster space using a grid-based approach. 

.. note:: 

  Vector vs Raster Overlays
  
  You can do the overlay analysis on vector layers using geoprocessing tools such as buffer, dissolve, difference and intersection. This method is ideal if you wanted to find a binary **suitable/non-suitable** answer and you are working with a handful of layers. You can review our video tutorial on `Locating A New Bicycle Parking Station using Multicriteria Overlay Analysis <https://www.youtube.com/watch?v=nTz2khWi2-s&list=PLppGmFLhQ1HIqNiNWxVqs5wBLiA_UrKTQ&index=26>`_ for a step-by-step guide on this approach.
  
  Working in the raster space gives you a **ranking** of the suitability - not just the best suited site. It also allows you to combine any number of input layers easily and assign different weights to each criteria. In general, this is the preferred approach for site suitability.

This tutorial goes through the typical workflow for performing a site-suitability analysis - converting source vector data to appropriate rasters, re-classify them and perform mathematical operations.

Overview of the task
--------------------

In this tutorial, we will identify the suitable areas for development, that are

- Close to roads, and
- Away from water bodies, and
- Not in a protected region.

.. image:: /static/3/multi_criteria_overlay/images/output.png
  :align: center

Get the data
------------
We will use vector data layers from `OpenStreetMap (OSM) <http://www.openstreetmap.org/>`_. OSM is a global database of freely available base map data. `Geofabrik <http://download.geofabrik.de/>`_ provides daily updated shapefiles of OpenStreetMap datasets.

We will be using the OSM data layers for the state of Assam in India. Geofabrik `India shapefiles <http://download.geofabrik.de/asia/india.html>`_ were downloaded, reprojected to a UTM projection, clipped to the state boundary and packaged in a single GeoPackage file. You can download a copy of the geopackage from the link below:

`assam.gpkg <https://www.qgistutorials.com/downloads/assam.gpkg>`_

Data Source: [GEOFABRIK]_

Procedure
---------

1. Browse to the downloaded ``assam.gpkg`` file in QGIS Browser. Expand it and drag each of the 5 individual data layers to the map canvas. You will see ``boundary``, ``roads``, ``protected_regions``, ``water_polygons`` and ``water_polylines`` layers loaded in the :guilabel:`Layers` panel.

  .. image:: /static/3/multi_criteria_overlay/images/1.png
    :align: center

2. First step in the overlay analysis, is to convert each data layer to raster. An important consideration is that all rasters must be of the same extent. We will use the ``boundary`` layer as the extent for all the rasters. Go to :menuselection:`Processing --> Toolbox`. Search for and locate the :menuselection:`GDAL --> Vector conversion --> Rasterize (vector to raster)` algorithm. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/2.png
    :align: center

3. In the :guilabel:`Vector Conversion - Rasterize (vector to raster)` dialog, select ``roads`` as the :guilabel:`Input layer`. We want to create an output raster where pixel values are 1 where there is a road and 0 where there are no roads. Enter ``1`` as the :guilabel:`A fixed value to burn`. The input layers are in a projected CRS with meters are the unit. Select ``Geoferenced units`` as the :guilabel:`Output raster size units`. We will set the resolution of the output raster to be 15 meters. Select ``15`` as both :guilabel:`Width/Horizontal resolution` and :guilabel:`Height/Vertical resolution`. Next, click the arrow next to :guilabel:`Output extent` and select :menuselection:`Calculate from Layer --> boundary`.

  .. image:: /static/3/multi_criteria_overlay/images/3.png
    :align: center

4. Scroll down to find the :guilabel:`Advanced Parameters` and select the profile ``High Compression`` to apply the compression. This will generate the compressed raster file of smaller size after running the tool. Applying lossless compression is highly recommended while working with raster data.

  .. image:: /static/3/multi_criteria_overlay/images/4.png
    :align: center

	
5. Set the :guilabel:`Rasterized` output raster as ``raster_roads.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/multi_criteria_overlay/images/5.png
    :align: center


6. Once the processing finishes, you will see a new layer :guilabel:`raster_roads` loaded in the :guilabel:`Layers` panel. The raster has pixel values 1 for pixels which intersected with the roads. All other pixels are set as **NoData** values. These nodata values are problematic because when raster calculator (which we will use later) encounters a pixel with nodata value in any layer, it sets the output value of that pixel to nodata as well, resulting is unexpected output. We will fill these nodata values with the value 0. Search for and locate the :menuselection:`Raster Tools --> Fill NoData cells` algorithm. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/6.png
    :align: center
    
7. Select ``raster_roads`` as the :guilabel:`Raster input` and choose ``0`` as the :guilabel:`Fill value`. Scroll down to find the :guilabel:`Advanced Parameters` and select the profile ``High Compression`` to apply the compression. Set the :guilabel:`Output raster` as ``raster_roads_filled.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/multi_criteria_overlay/images/7.png
    :align: center
    
8. Once the processing finishes, you will see the new layer ``raster_roads_filled`` loaded in the :guilabel:`Layers` panel. This raster has values 1 for roads and 0 for no roads. If the layer is not visualized correctly, you can click the :guilabel:`Open the Layer Styling Panel` and set the :guilabel:`Min` to ``0`` and :guilabel:`Max` to ``1``.
  
  .. image:: /static/3/multi_criteria_overlay/images/8.png
    :align: center

9. Repeat steps 3-8 for the other 3 vector layers ``protected_regions``, ``water_polylines`` and ``water_polygons`` layers. You need to rasterize and fill the nodata cells for these layers. If you want to run these steps manually, you can configure the processing algorithm dialog, run the algorithm and once the algorithm finishes, switch to the :guilabel:`Parameters` tab and just change the input and output layer names. You can also run each algorithm on all 4 layers in a single step using Batch Processing. See the :doc:`batch_processing` tutorial to learn more. Once you are done, you should have 4 raster layers  and generate the corresponding raster layers ``raster_roads_filled``, ``raster_protected_regions_filled``, ``raster_water_polylines_filled`` and ``raster_water_polygons_filled``. You will notice that we have 2 water related layers - both representing water. We can merge them to have a single layer representing water areas in the region. Search for and locate :menuselection:`Raster analysis --> Raster calculator` algorithm in the Processing Toolbox. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/9.png
    :align: center

10. Select ``raster_water_polygons`` and ``raster_water_polylines`` layers using :guilabel:`...` button as Input Layers. Enter the following expression using :guilabel:`ε` button. Keep all the other options as default and save the output layer with the name ``raster_water_merged.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    "raster_water_polygons_filled@1" + "raster_water_polylines_filled@1"

  .. image:: /static/3/multi_criteria_overlay/images/10.png
    :align: center
 
11. The resulting merged raster will have pixels with value 1 for all areas with water. But you will notice that there are some regions where there was both a water polygon and a water polyline. Those areas will have pixels with value 2 - which is not correct. We can fix it with a simple expression. Open :menuselection:`Raster analysis --> Raster calculator` algorithm again.

  .. image:: /static/3/multi_criteria_overlay/images/11.png
    :align: center

12. Select ``raster_water_merged`` layer using :guilabel:`...` button as an Input Layer. Enter the following expression using :guilabel:`ε` button. Keep all the other options as default and save the output layer with the name ``raster_water_filled.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    "raster_water_merged@1" > 0

  .. image:: /static/3/multi_criteria_overlay/images/12.png
    :align: center

13. The resulting layer ``raster_water_filled`` now has pixels with only 0 and 1 values.

  .. image:: /static/3/multi_criteria_overlay/images/13.png
    :align: center

14. Now that we have layers representing road and water pixels, we can generate proximity rasters. These are also known as Euclidean distances - where each pixel in the output raster represents the distance to the nearest pixel in the input raster. This resulting raster can be then used to determine suitable areas which are within certain distance from the input. Search for and locate the :menuselection:`GDAL --> Raster analysis --> Proximity (raster distance)` algorithm. Double-click to launch it.

  .. image:: /static/3/multi_criteria_overlay/images/14.png
    :align: center

15. In the :guilabel:`Raster Analysis - Proximity (Raster Distance)` dialog, select ``raster_roads_filled`` as the :guilabel:`Input layer`. Choose ``Georeferenced coordinates`` as the :guilabel:`Distance units`. As the input layers are in a projected CRS with meters as the units, enter ``5000`` (5 kilometers) as the :guilabel:`Maximum distance to be generated`. For all pixels that are more than the maximum distance away - we will set their values to be 5000 as well. So set the :guilabel:`Nodata value to use for the destination proximity raster` value to ``5000``. 

  .. image:: /static/3/multi_criteria_overlay/images/15.png
    :align: center

16. You can expand the :guilabel:`Advanced Parameters` and select the profile ``High Compression`` to apply the compression. Name the output file as ``roads_proximity.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/multi_criteria_overlay/images/20.png
    :align: center

.. note:: 

  It may take upto 15 minutes for this process to run. It is a computationally intensive algorithm that needs to compute distance for each pixel of the input raster.
  
17. Once the processing is over, a new layer ``roads_proximity`` will be added to the :guilabel:`Layers` panel. To visualize it better, let's change the default styling. Click the :guilabel:`Open the Layer Styling panel` button in the :guilabel:`Layers` panel. Change the :guilabel:`Max` value to ``5000`` under :guilabel:`Color gradient`.

  .. image:: /static/3/multi_criteria_overlay/images/17.png
    :align: center

18. Repeat the :guilabel:`Proximity (Raster Distance)` algorithm for the ``raster_water_filled`` layer with same parameters and name the output ``water_proximity.tif``. If you click around the resulting raster, you will see that it is a continuum of values from 0 to 5000. To use this raster in overlay analysis ,we must first re-classify it to create discrete values. Open :menuselection:`Raster analysis --> Raster calculator` algorithm again.

  .. image:: /static/3/multi_criteria_overlay/images/18.png
    :align: center

19. We want to give higher score to pixels that are near to roads. So let's use the following scheme.

- 0-1000m –> 100
- 1000-2000m –> 50
- >2000m –> 10

  Select ``roads_proximity`` layer using :guilabel:`...` button as an Input Layer. Enter the following expression that applies the above criteria on the input. Keep all the other options as default and save the output layer with the name ``roads_reclass.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    100*("roads_proximity@1"<=1000) 
	+ 50*("roads_proximity@1">1000)*("roads_proximity@1"<=2000) 
	+ 10*("roads_proximity@1">2000)
	
  .. image:: /static/3/multi_criteria_overlay/images/19.png
    :align: center

20. Once the re-classification process finishes, a new layer ``roads_reclass`` will be added to the :guilabel:`Layers` panel. This layer has only 3 different values, 10, 50 and 100 indicating relative suitability of the pixels with regards to distance from roads. Open :menuselection:`Raster analysis --> Raster calculator` algorithm again.

  .. image:: /static/3/multi_criteria_overlay/images/20.png
    :align: center

21. Repeat the re-classification process for the ``water_proximity`` layer. Here the scheme will be reverse, where pixels that are further away from water shall have higher score.

- 0-1000m –> 10
- 1000 -2000m —> 50
- >2000m –> 100

  Select ``water_proximity`` layer using :guilabel:`...` button as an Input Layer. Enter the following expression hat applies the above criteria on the      input. Keep all the other options as default and save the output layer with the name ``water_reclass.tif`` and click :guilabel:`Run`.

  .. code-block:: none
  
    100*("water_proximity@1">2000) 
    + 50*("water_proximity@1">1000)*("water_proximity@1"<=2000)
    + 10*("water_proximity@1"<1000)

  .. image:: /static/3/multi_criteria_overlay/images/21.png
    :align: center

22. Now we are ready to do the final overlay analysis. Recall that our criteria for determining suitability is as follows - close to roads, away from water and not in a protected region. Open :menuselection:`Raster analysis --> Raster calculator`. Select ``roads_reclass``, ``water_reclass``, ``raster_protected_regions_filled`` layers using :guilabel:`...` button as Input Layers. Use :guilabel:`ε` button to enter the following expression that applies these criteria. Keep other parameters as default. Name the output ``overlay.tif`` and click :guilabel:`Run`.

  .. code-block:: none

    (("roads_reclass@1" + "water_reclass@1")/2)
    *("raster_protected_regions_filled@1"  !=  1 )

  .. image:: /static/3/multi_criteria_overlay/images/22.png
    :align: center

.. note::

  In this example, we are giving equal *weight* to both road and water proximity. In real-life scenario, you may have multiple criteria with different importance. You can simulate that by multiplying the rasters with appropriate *weights* in the above expression. For example, if proximity to roads is twice as importance as proximity away from water, instead of ``(("roads_reclass@1" + "water_reclass@1")/2)``, you can use the expression ``((2*"roads_reclass@1" + "water_reclass@1")/3)``.
  
23. Once the processing finishes, the resulting raster ``overlay`` will be added to the :guilabel:`Layers` panel. The pixel values in this raster range from 0 to 100 - where 0 is the least suitable and 100 is the most suitable area for development. Let's clip the results to the boundary layer. Open :menuselection:`Raster extraction --> Clip raster by mask layer` algorithm.

  .. image:: /static/3/multi_criteria_overlay/images/23.png
    :align: center

24. In the :guilabel:`Raster Extraction - Clip Raster by Mask Layer` dialog, select ``overlay`` as the :guilabel:`Input layer` and ``boundary`` as the :guilabel:`Mask layer`.

  .. image:: /static/3/multi_criteria_overlay/images/24.png
    :align: center

25. Scroll down to find the :guilabel:`Advanced Parameters` and select the profile ``High Compression`` to apply the compression. Save the :guilabel:`Clipped (mask)` layer as ``overlay_clipped.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/multi_criteria_overlay/images/25.png
    :align: center

26. Once the processing finishes, the final output layer ``overlay_clipped`` will be added to the :guilabel:`Layers` panel. Click the :guilabel:`Open the Layer Styling panel` button in the Layers panel and select the ``Singleband pseudocolor`` renderer.

  .. image:: /static/3/multi_criteria_overlay/images/26.png
    :align: center

27. Set the :guilabel:`Interpolation` to ``Discrete`` and choose the ``Spectral`` color ramp. 

  .. image:: /static/3/multi_criteria_overlay/images/27.png
    :align: center

28. Click on the default label values next to each color and enter appropriate labels.

  .. image:: /static/3/multi_criteria_overlay/images/28.png
    :align: center

29. The labels will also appear as the legend under the ``overlay_clipped`` layer. This is our final map showing the site suitability according to the chosen criteria.

  .. image:: /static/3/multi_criteria_overlay/images/29.png
    :align: center
