Creating an Animated Cartogram (QGIS3)
======================================

Cartogram is a type of map visualization where the shape of each feature is distorted in proportion to a variable. Cartograms make it easy to see large variations in the data. The simplest method to create a cartogram is by scaling the size of each region according to a variable. This method retains the original shape of the polygon and only changes the size. These are known as `Non-contiguous isomorphic cartograms <https://en.wikipedia.org/wiki/Cartogram#Non-contiguous_isomorphic_cartograms>`_. In this tutorial, we will learn how to use QGIS expressions to create a cartogram and use the Temporal Controller to create an animation that gradually transforms the features to the target size. 

This tutorial is builds on `Hans van der Kwast's excellent cartogram tutorial <https://www.youtube.com/watch?v=qxKD6wcFUcE>`_. The formula for scale factor used here is from the original paper `Noncontiguous Area Cartograms <https://doi.org/10.1111/j.0033-0124.1976.00371.x>`_ by Judy M Olson.

You can also watch my YouTube video `QGIS Expressions: Hidden Gems and Unexpected Possibilities <https://www.youtube.com/watch?v=4Rtwqv_z-F4>`_ which explains the concepts behind this tutorial.
 

Overview of the task
--------------------
We will take a layer of states in the US and create an animated cartogram by scaling each state by population. The resulting map will have each state's area proportional its population.

  .. image:: /static/3/cartogram_animation/images/output.gif
    :align: center
	
    

Get the data
------------

`United States Census Bureau <https://www.census.gov/>`_ provides cartographic boundary files along with demographic datasets. We will download the data and process them to create a data layer suitable for our task.

1. Visit the `Cartographic Boundary Files - Shapefile <https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html>`_ data page on the US Census Bureau website. Scroll down and download the States shapefile ``cb_2018_us_state_20m.zip``. This has the state polygons we need for the visualization.

  .. image:: /static/3/cartogram_animation/images/data1.png
    :align: center
    
2. The state polygons do not have any demographic data. This data needs to be downloaded separately and joined with the shapefile for use in a GIS. Visit the `State Population Totals and Components of Change: 2020-2023 <https://www.census.gov/data/tables/time-series/demo/popest/2020s-state-total.html>`_ page and download the *Annual Population Estimates, Estimated Components of Resident Population Change, and Rates of the Components of Resident Population Change for the United States, States, District of Columbia, and Puerto Rico: April 1, 2020 to July 1, 2023* dataset which will be downloaded as ``NST-EST2023-ALLDATA.csv``.

  .. image:: /static/3/cartogram_animation/images/data2.png
    :align: center

3. Open QGIS. Locate the ``cb_2018_us_state_20m.zip`` file in the QGIS :guilabel:`Browser` and expand it. Drag and drop the ``cb_2018_us_state_20m.shp`` layer to the canvas.

  .. image:: /static/3/cartogram_animation/images/data3.png
    :align: center
    
4. A new layer ``cb_2018_us_state_20m`` will be added to the :guilabel:`Layers` panel. Next, we will load the CSV file. Click the :guilabel:`Open Data Source Manager` button.

  .. image:: /static/3/cartogram_animation/images/data4.png
    :align: center

5. Switch to the :guilabel:`Delimited Text` tab. Click :guilabel:`...` next to :guilabel:`File name` and browse to the downloaded ``NST-EST2023-ALLDATA.csv`` file. Expand the :guilabel:`Geometry Definition` section and select ``No geometry (attribute only table)``. Click :guilabel:`Add`.

  .. image:: /static/3/cartogram_animation/images/data5.png
    :align: center

6. A new layer ``NST-EST2023-ALLDATA`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. This table has the population counts in the ``POPESTIMATE2023`` column. Each state has a unique id in the ``STATE`` column that we will use to join this table with the polygon layer.

  .. image:: /static/3/cartogram_animation/images/data6.png
    :align: center

7. Right-click the ``cb_2018_us_state_20m`` layer and select :guilabel:`Open Attribute Table`. The state ids are contained in the ``GEOID`` column. While the numbers are the same, they are formatted as a 2-digit 0-padded number. To match these with the ``STATE`` column from our population table, we need similarly formatted numbers. Select the ``NST-EST2023-ALLDATA``. Go to :menuselection:`Processing --> Toolbox`. Search and locate the :menuselection:`Vector table --> Field calculator` algorithm. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/data7.png
    :align: center

8. In the :guilabel:`Field calculator` dialog, select ``NST-EST2023-ALLDATA`` as the :guilabel:`Input layer`. Enter ``GEOID`` as the :guilabel:`Field name` and set the :guilabel:`Result field type` to ``Text (string)``. We will now take the numbers from the ``STATE`` field and use the ``lpad()`` function to create a 2-digit 0-padded string. Enter the following expression and click :guilabel:`Run`.

  .. code-block:: none

     lpad("STATE", 2, '0')

  .. image:: /static/3/cartogram_animation/images/data8.png
    :align: center

9. A new layer ``Calculated`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. Note that the newly created ``GEOID`` column has correctly formatted identifiers. We can now use this field to join this table with the states layer. Search and locate the :menuselection:`Vector general --> Join attributes by field value` algorithm. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/data9.png
    :align: center

10. In the :guilabel:`Join attributes by field value` dialog, select ``cb_2018_us_state_20m`` as the :guilabel:`Input layer`. Select ``GEOID`` as the :guilabel:`Table field`. For :guilabel:`Input layer 2`, select our table ``Calculated`` and :guilabel:`Table field 2` select ``GEOID``. The table has many columns but we only need the population for the latest year. Click the :guilabel:`...` button for :guilabel:`Layer 2 fields to copy` and select only the ``POPESTIMATE2023`` field. Leave other options to their default value and click :guilabel:`Run`.

  .. image:: /static/3/cartogram_animation/images/data10.png
    :align: center

11. A new layer ``Joined layer`` will be added to the :guilabel:`Layers` panel. Before using this layer for our cartogram, let's reproject it to a projected CRS. Search and locate the :menuselection:`Vector general --> Reproject layer` algorithm. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/data11.png
    :align: center

12. In the :guilabel:`Reproject layer` dialog, select ``Joined layer`` as the :guilabel:`Input layer`. For the :guilabel:`Target CRS`, click the :guilabel:`Select CRS` button. Search for the ``North_America_Albers_Equal_Area_Conic`` CRS and select it. This is our final layer so we will save it to disk. Click the :guilabel:`...` button next to :guilabel:`Reprojected` and select :guilabel:`Save to File...`.

  .. image:: /static/3/cartogram_animation/images/data12.png
    :align: center

13. Enter the name of the layer as ``us_states_with_population.gpkg`` and select :guilabel:`Save`. Click :guilabel:`Run` to create the GeoPackage file with the reprojected data.

  .. image:: /static/3/cartogram_animation/images/data13.png
    :align: center

We will use this layer in the next section. For convenience, you may directly download a copy of the above layer from below:

`us_states_with_population.gpkg <https://www.qgistutorials.com/downloads/us_states_with_population.gpkg>`_

Data Source [USCENSUS]_


Procedure
---------

1. Start a new QGIS project. Locate the ``us_states_with_population.gpkg`` file in the :guilabel:`Browser` and expand it. Drag and drop the ``us_states_with_population`` layer to the empty canvas.

  .. image:: /static/3/cartogram_animation/images/1.png
    :align: center

2. A new layer ``us_states_with_population`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. For our cartogram, we need to use the population density as the variable. We will use the population values in the ``POPESTIMATE2023`` field. Close the attribute table.

  .. image:: /static/3/cartogram_animation/images/2.png
    :align: center

3. Search and locate the :menuselection:`Vector table --> Field calculator` algorithm from the Processing Toolbox. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/3.png
    :align: center
    
4. In the :guilabel:`Field calculator` dialog, select ``us_states_with_population`` as the :guilabel:`Input layer`. Enter ``density`` as the :guilabel:`Field name`. Enter the following expression to compute the density. As the function ``area(@geometry)`` calculates the area in the unit of the CRS (which is in meters), we apply the conversion factor to convert it to square kilometers. Click :guilabel:`Run`.

  .. code-block:: none

     1000*1000* "POPESTIMATE2023" /
     area(@geometry)
     
  .. image:: /static/3/cartogram_animation/images/4.png
    :align: center
    
5. Click the :guilabel:`...` button next to :guilabel:`Calculated` and select :guilabel:`Save to File...`. Enter the name of the layer as ``us_states_population_density.gpkg`` and select :guilabel:`Save`. Click :guilabel:`Run`.

  .. image:: /static/3/cartogram_animation/images/5.png
    :align: center
    
6. A new layer ``us_states_population_density`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. We need to pick an **Anchor** feature against which all other features will be scaled. Ideally you would pick the feature with the highest value of the variable you want to use for the cartogram. This will ensure there are no overlapping areas. Double-click the :guilabel:`density` column header to sort the table by density. You will notice that the highest density value in our dataset is quite large compared to other values and it belongs to a fairly small state. This will result all the features being scaled to very small sizes. We can pick the feature the second highest density which has a relatively large area and its density is comparable to other features.

  .. image:: /static/3/cartogram_animation/images/6.png
    :align: center
    
7. In Area cartograms, the scale factor determines how much the feature's area is reduced. We must reduce each feature's area so that the population density of the feature is the same as the population density of the anchor feature. The formula for scale factor is the ratio of the square-root of the feature's value against the square-root of the value of the anchor feature. Open the :menuselection:`Vector table --> Field calculator` algorithm from the Processing Toolbox. In the :guilabel:`Field calculator` dialog, select ``us_states_population_density`` as the :guilabel:`Input layer`. Enter ``scale_factor`` as the :guilabel:`Field name`. Enter the following expression to compute the scale factor. The expression calculates the ratio of the square root of the feature's density against the square root of the density of the second largest density value. Click the :guilabel:`...` button next to :guilabel:`Calculated` and select :guilabel:`Save to File...`. Enter the name of the layer as ``us_states_scale_factor.gpkg`` and select :guilabel:`Save`. Click :guilabel:`Run`.

  .. code-block:: none
  
     sqrt("density")/array_get(array_agg(
     	expression:=sqrt("density"),
     	order_by:=sqrt("density")), -2)
  
  .. image:: /static/3/cartogram_animation/images/7.png
    :align: center
    
8. A new layer ``us_states_scale_factor`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. The ``scale_factor`` field now contains the ratio by which each feature must be scaled to have the same population density as the anchor feature.

  .. image:: /static/3/cartogram_animation/images/8.png
    :align: center
    
9. We only need the ``us_states_scale_factor`` layer for the final visualization. Select the remaining layers, right-click and select :guilabel:`Remove Layer`.

 .. image:: /static/3/cartogram_animation/images/9.png
   :align: center
 
10. Select the ``us_states_scale_factor`` layer and click the :guilabel:`Open the layer styling panel` button in the :guilabel:`Layers` panel. Select :guilabel:`Simple Fill` and open the drop-down selector for :guilabel:`Symbol layer type`. Set the :guilabel:`Symbol layer type` to ``Outline: Simple Line`` and select a :guilabel:`Color` of your choice. This symbol layer will be a reference for our map when we resize the polygons. 

  .. image:: /static/3/cartogram_animation/images/10.png
    :align: center
    
11. Click the :guilabel:`Add Symbol layer (+)` button. A new symbol layer :guilabel:`Simple Fill` will be added. Set the :guilabel:`Fill color` to the same color as the lines and the :guilabel:`Stroke color` to be a slightly darker color. 

  .. image:: /static/3/cartogram_animation/images/11.png
    :align: center
    
12. Next, open the drop-down selector for :guilabel:`Symbol layer type` and select ``Geometry Generator`` as the :guilabel:`Symbol layer type`. Geometry generator allows us to modify the geometry for rendering using expressions. Click the :guilabel:`Expression Builder` button.

  .. image:: /static/3/cartogram_animation/images/12.png
    :align: center

13. We will use the `scale()` function which resizes the given geometry by X- and Y-scaling factors. For our cartogram, we want to resize each polygon by the ratio of its population to the highest population. Enter the following expression to apply this scaling and click :guilabel:`OK`.

  .. code-block:: none

     scale(
     	@geometry,
     	"scale_factor",
     	"scale_factor",
     	centroid(@geometry)
     )
 
  .. image:: /static/3/cartogram_animation/images/13.png
    :align: center
    
14. You will see the state polygons are now sized by the proportion of each state's population to the highest population. Many large states with low population densities are now much smaller than their original size. You will notice that polygons with irregular shapes are off-center after being scaled. This is because the anchor point of the scaling is the centroid of the geometry which is often the representative point for the polygon. Let's update our expression to fix this. Click the :guilabel:`Expression Builder` button.

  .. image:: /static/3/cartogram_animation/images/14.png
    :align: center
    
15. The `scale()` function takes an optional parameter to specify the scaling center point. We will use the `pole_of_inaccessibility()` function to find a representative anchor point for each polygon. This is similar to a centroid, but it is guaranteed to be inside of the polygon whereas a centroid can fall outside for certain shapes. Update the expression as shown below which calculates the pole of inaccessibility of the geometry with a small tolerance value and click :guilabel:`OK`.

  .. code-block:: none
 
    scale(
    	@geometry,
    	"scale_factor",
    	"scale_factor",
    	pole_of_inaccessibility(@geometry, 100)
    )

  .. image:: /static/3/cartogram_animation/images/15.png
    :align: center

16. Now the scaled polygons will have much better placement. We see another problem. Many features in the layer are **Multipolygons**, i.e. they have more than one part. Such features have 2 or more polygons that are part of the same geometry. With our current expression, both are scaled with the same anchor point computed from the combined geometry. This is not ideal. For example, a large feature with multiple islands should be scaled such that each island is scaled with its own center point. To fix this, we update our expression to iterate over each part of the geometry and scale it with its own center. Click the :guilabel:`Expression Builder` button.

  .. image:: /static/3/cartogram_animation/images/16.png
    :align: center
    

17. Here we use the `array_foreach()` function to iterate over each part of the geometry and generate the scaled versions of them. Finally `collect_geometries()` function combines each scaled part into a single multi-polygon geometry. Update the expression as shown below and click :guilabel:`OK`.

  .. code-block:: none
 
    collect_geometries(
    	array_foreach(generate_series(1, @geometry_part_count),
    		scale(geometry_n(@geometry,@element),  
    			"scale_factor",
    			"scale_factor",
    pole_of_inaccessibility(geometry_n(@geometry,@element), 100)
    		)
    	)
    )

  .. image:: /static/3/cartogram_animation/images/17.png
    :align: center
    
18. The result is much better scaling for multi-part features.

  .. image:: /static/3/cartogram_animation/images/18.png
    :align: center
    
19. Our cartogram is ready. This map shows concentration of the population on the eastern half of the US and a striking absence of population in states west of the Mississippi river. 

  .. image:: /static/3/cartogram_animation/images/19.png
    :align: center
    
20. We can make an improved visualization by creating an animation that slowly transforms the original rendering to the final size. Click the :guilabel:`Temporal Control Panel` button with the Clock icon in the :guilabel:`Map Navigation Toolbar`.  Select the :guilabel:`Animated temporal navigation` button. 

  .. image:: /static/3/cartogram_animation/images/20.png
    :align: center

21. The default :guilabel:`Animation range` will be populated with a 24-hour window in the increment of 1-hour. This is fine for our use case as we will get 24-frames of animation. You can adjust this if you want a slower/faster animation. Right-click the ``us_states_with_population`` layer and select :guilabel:`Properties`.

  .. image:: /static/3/cartogram_animation/images/21.png
    :align: center

22. Select :guilabel:`Temporal` tab and enable the :guilabel:`Dynamic Temporal Control`. This layer will be updated using expression so we don't need to configure it here. Just select ``Redraw Layer Only`` so that the layer is refreshed after each time step and rendered with the updated values from the expression.

  .. image:: /static/3/cartogram_animation/images/22.png
    :align: center
    
23. Let's update our Geometry Generator expression to use the animation time steps and gradually scale the geometry. Click the :guilabel:`Open the layer styling panel` button in the :guilabel:`Layers` panel. Select :guilabel:`Geometry Generator` followed by the :guilabel:`Expression Builder` button.

  .. image:: /static/3/cartogram_animation/images/23.png
    :align: center
    
24. Here we want to start with a scale factor of 1 and end up with the final scale factor value for the feature in the field ``scale_factor``. We use the `scale_linear()` function which takes the time of the current time-step and calculates the scale factor using the start and end times. Update the expression as shown below and click :guilabel:`OK`.
 
  .. code-block:: none

    collect_geometries(
    	array_foreach(generate_series(1, @geometry_part_count),
    		scale(geometry_n(@geometry,@element),  
    			scale_linear(
    				epoch(@map_start_time),
    				epoch(@animation_start_time),
    				epoch(@animation_end_time),
    				1,
    				"scale_factor"),
    			scale_linear(
    				epoch(@map_start_time),
    				epoch(@animation_start_time),
    				epoch(@animation_end_time),
    				1,
    				"scale_factor"),
    pole_of_inaccessibility(geometry_n(@geometry,@element), 100)
    		)
    	)
    )

  .. image:: /static/3/cartogram_animation/images/24.png
    :align: center
    
25. Back in the :guilabel:`Temporal Controller` panel, click the :guilabel:`Play` button to see the animation. You should see the shape of each polygon gradually scaled after each frame. 

  .. image:: /static/3/cartogram_animation/images/25.png
    :align: center

26. Once you are happy with the configuration, we can export the animation. Click the :guilabel:`Export Animation` button.

  .. image:: /static/3/cartogram_animation/images/26.png
    :align: center

27. In the :guilabel:`Export Map Animation` dialog, click :guilabel:`...` next to :guilabel:`Output directory` and browse to any folder on your computer. Keep all the other options to their default value and click :guilabel:`Save`.

  .. image:: /static/3/cartogram_animation/images/27.png
    :align: center

28. The individual frames of the animation will be exported as images. We can create a video or animated GIF from these frames. I recommend using the website ezgif.com which allows you to create GIFs from individual images easily. Visit `Ezgif Animated GIF Maker <https://ezgif.com/maker>`_. Browse to the exported animation frames and click :guilabel:`Upload files!`.

  .. image:: /static/3/cartogram_animation/images/28.png
    :align: center

29. Configure the GIF options by setting the :guilabel:`Delay time` to ``5``. Check :guilabel:`crossfade frames` effect and set the :guilabel:`Fader delay` and :guilabel:`Fader count` to ``2``. Click :guilabel:`Make a GIF!`/

  .. image:: /static/3/cartogram_animation/images/29.png
    :align: center

30. Click the :guilabel:`save` button to download the animation as a GIF file.

  .. image:: /static/3/cartogram_animation/images/output.gif
    :align: center

  .. image:: /static/3/cartogram_animation/images/hawaii.gif
    :align: center

  .. image:: /static/3/cartogram_animation/images/alaska.gif
    :align: center
