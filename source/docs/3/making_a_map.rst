Making a Map (QGIS3)
====================

Often one needs to create a map that can be printed or published. QGIS has a powerful tool called :guilabel:`Print Layout` that allows you to take your GIS layers and package them to create maps. 

Overview of the task
--------------------

The tutorial shows how to create a map of Japan with standard map elements like map inset, grids, north arrow, scale bar and labels. 
 
Other skills you will learn
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- How to view and change QGIS Project Variables
- How to use QGIS expressions

Get the data
------------

We will use the Natural Earth dataset - specifically the Natural Earth Quick Start Kit that comes with beautifully styled global layers that can be loaded directly to QGIS.
 
Download the `Natural Earth Quickstart Kit <http://naciscdn.org/naturalearth/packages/Natural_Earth_quick_start.zip>`_. 

Data Source [NATURALEARTH]_

Procedure
---------

1. Download and extract the Natural Earth Quick Start Kit data. Open QGIS.  Locate the ``Natural Earth quick start`` folder in the :guilabel:`Browser` panel. Expand the folder to locate the ``Natural_Earth_quick_start_for_QGIS_v3`` project. This is the project file that contains styled layers in QGIS Document format. Double-click the project to open it.

  .. image:: /static/3/making_a_map/images/1.png
     :align: center

2. You may notice that the map has labels in Greek. We can change the language easily in :menuselection:`Project --> Properties`.

  .. image:: /static/3/making_a_map/images/2.png
     :align: center

3. Switch to the :guilabel:`Variables` tab in the :guilabel:`Project Proerties` dialog. Locate the ``project_language`` variable and click on the :guilabel:`Value` column to edit it. Change the language to ``name_en`` and click :guilabel:`OK`.

  .. image:: /static/3/making_a_map/images/3.png
     :align: center

.. note::

  Project variables are a great way to store project-specific values for use anywhere you can use an expression in QGIS. The ``Natural_Earth_quick_start_for_QGIS_v3`` project comes with many preset variables that are used for styling within that project.

4. Back in the main QGIS window, click the :guilabel:`Refresh` button in the :guilabel:`Map Navigation Toolbar`. You will now see the map rendered with English labels.

  .. image:: /static/3/making_a_map/images/4.png
     :align: center
  
5. Use the pan and zoom controls in the :guilabel:`Map Navigation Toolbar` and to zoom to Japan.

  .. image:: /static/3/making_a_map/images/5.png
     :align: center
  
6. You can turn off some map layers for data that we do not need for this map. Expand the ``z5 - 1:18m`` folder and uncheck the box next to ``ne_10m_geography_marine_polys`` and    ``ne_10m_admin_0_disputed_areas`` layers. Before we make a map suitable for printing, we need to choose an appropriate projection. The default CRS for the project is set to ``EPSG:3857 Pseudo-Mercator``. This is a CRS popularly used for web mapping and is a decent choice for our purpose, so we can leave it to its defalt value. Go to :menuselection:`Project --> New Print Layout`.

  .. image:: /static/3/making_a_map/images/6.png
     :align: center
  
.. note::

   For Japan, Japan Plane Rectangular CS is a projected coordinate reference
   system (CRS) that is designed for minimum distortions. It is divided in 18
   zones and if you are working for a smaller region in Japan, using this CRS
   will be better.
   

7. You will be prompted to enter a title for the layout. You can leave it
   empty and click :guilabel:`Ok`.
   
  .. image:: /static/3/making_a_map/images/7.png
     :align: center

.. note::

   Leaving the layout name empty will assign a default name such as
   ``Layout 1``.

8. In the Print Layout window, click on :guilabel:`Zoom full` button to display the     full extent of the Layout. 

  .. image:: /static/3/making_a_map/images/8.png
     :align: center
   
9. Now we would have to bring the map view that we see in the QGIS Canvas to the layout. Go to :menuselection:`Add Item --> Add Map`.

  .. image:: /static/3/making_a_map/images/9.png
     :align: center

10. Once the :guilabel:`Add Map` mode is active, hold the left mouse button and drag a rectangle where you want to insert the map.

  .. image:: /static/3/making_a_map/images/10.png
     :align: center

11. You will see that the rectangle window will be rendered with the map from the main QGIS canvas. The rendered map may not be covering the full extent of our interest area.  Use :menuselection:`Edit --> Select/Move item` and :menuselection:`Edit --> Move Content` options to pan the map in the window and center it in the composer.

  .. image:: /static/3/making_a_map/images/11.png
     :align: center

12. Let us also adjust the zoom level for the map. Click on the :guilabel:`Item Properties` tab and enter ``10000000`` as the :guilabel:`Scale` value.

  .. image:: /static/3/making_a_map/images/12.png
     :align: center

13. Now we will add a map inset that shows a zoomed in view for the Tokyo area.     Before we make  any changes to the layers in the main QGIS window, check the :guilabel:`Lock layers` and :guilabel:`Lock styles for layers` boxes. This will ensure that if we turn off some layers or change their styles, this view will not change.

  .. image:: /static/3/making_a_map/images/13.png
     :align: center

14. Switch to the main QGIS window. Turn off the layer group ``z5 - 1:18m`` and activate the ``z7 - 1: 4m`` group. This layer group has styling that is more appropriate for a zoomed-in view. Use the pan and zoom controls in the :guilabel:`Map Navigation Toolbar` and to zoom around Tokyo.

  .. image:: /static/3/making_a_map/images/14.png
     :align: center

15. We are now ready to add the map inset. Switch the the :guilabel:`Print Layout` window. Go to :menuselection:`Add Item --> Add Map`.

  .. image:: /static/3/making_a_map/images/15.png
     :align: center

16. Drag a rectangle at the place where you want to add the map inset. You will now notice that we have 2 map objects in the Print Layout. When making changes, make sure you have the correct map selected.

  .. image:: /static/3/making_a_map/images/16.png
     :align: center

17. Select the ``Map 2`` object that we just added from the :guilabel:`Items` panel. Select the :guilabel:`Item properties` tab. Scroll down to the :guilabel:`Frame` panel and check the box next to it. You can change the color and thickness of the frame border so it is easy to distinguish against the map background. 

  .. image:: /static/3/making_a_map/images/17.png
     :align: center

18. One neat feature of the Print Layout is that it can automatically highlight the area from the main map which is represented in the inset. Select the ``Map 1`` object from the :guilabel:`Items` panel. In the :guilabel:`Item properties` tab, scroll down to the :guilabel:`Overviews` section. Click the :guilabel:`Add a new overview` button.

  .. image:: /static/3/making_a_map/images/18.png
     :align: center

19. Select ``Map 2`` as the :guilabel:`Map Frame`. This tells the Print Layout to highlight the current object ``Map 1`` with the extent of the map shown in the ``Map 2`` object. 

  .. image:: /static/3/making_a_map/images/19.png
     :align: center

20. Now that we have the map inset ready, we will add a grid to the main map. Select the ``Map 1`` object from the :guilabel:`Items` panel. In the :guilabel:`Item properties` tab, scroll down to the :guilabel:`Grids` section. Click the :guilabel:`Add a new grid` button, followed by :guilabel:`Modify grid...`.

  .. image:: /static/3/making_a_map/images/20.png
     :align: center

21. By default, the grid lines use the same units and projections as the currently selected map projections. However, it is more common and useful to display grid lines in degrees. We can select a different CRS for the grid. Click on the :guilabel:`Change...` button next to :guilabel:`CRS`.

  .. image:: /static/3/making_a_map/images/21.png
     :align: center

22. In the :guilabel:`Coordinate Reference System Selector` dialog, enter ``4326`` in the :guilabel:`Filter` box. From the results, select the ``WGS84 EPSG:4326`` as the CRS. Click :guilabel:`OK`.

  .. image:: /static/3/making_a_map/images/22.png
     :align: center

23. Select the :guilabel:`Interval` values as ``5`` degrees in both :guilabel:`X` and :guilabel:`Y` direction. You can adjust the :guilabel:`Offset` to change where the grid lines appear.

  .. image:: /static/3/making_a_map/images/23.png
     :align: center

24. Scroll down to the :guilabel:`Grid frame` section and check the :guilabel:`Draw coordinates` box. The default format is ``Degrees`` but it appears as a number. We can customize is to append a |degree| symbol. Choose ``Custom`` and click the :guilabel:`Expression` button next to it.
  
  .. |degree| unicode:: U+00B0
  
  .. image:: /static/3/making_a_map/images/24.png
     :align: center

25. Enter the following expression to create a string that takes the grid number and appends |degree| symbol to it.

  .. |degree| unicode:: U+00B0
  
  .. code-block:: none

    concat(to_string(@grid_number), '°    ')

  .. image:: /static/3/making_a_map/images/25.png
     :align: center

26. Notice that the grids now have a custom label from the expression. Adjust the position settings for :guilabel:`Left`, :guilabel:`Right`, :guilabel:`Top` and :guilabel:`Bottom` as per your liking.
 
  .. image:: /static/3/making_a_map/images/26.png
     :align: center

27. Now we will add a Rectangluar frame to hold other map elements like north arrow, scale and label. Go to :menuselection:`Add Item --> Add Shape --> Add Rectangle`.
 
  .. image:: /static/3/making_a_map/images/27.png
     :align: center

28. You can change the :guilabel:`Style` of the rectangle to match the map background.
 
  .. image:: /static/3/making_a_map/images/28.png
     :align: center

29. Now we will add a North Arrow to the map. QGIS comes with a nice collection of map-related images - including many types of North Arrows. Click :menuselection:`Add Item --> Add Picture`.
 
  .. image:: /static/3/making_a_map/images/29.png
     :align: center

30. Holding your left mouse button, draw a rectangle. On the right-hand panel, click on the :guilabel:`Item Properties` tab and expand the :guilabel:`Search directories` section and select the image of your liking.

  .. image:: /static/3/making_a_map/images/30.png
     :align: center
     
31. Now we will add a scale bar. Click on :menuselection:`Add Item --> Add Scalebar`.

  .. image:: /static/3/making_a_map/images/31.png
     :align: center
     
32. Click on the layout where you want the scalebar to appear. In the :guilabel:`Item Properties` tab, make sure you have chosen the correct map element ``Map 1`` for which to display the scalebar. Choose the Style that fit your requirement. In the :guilabel:`Segments` panel, change the :guilabel:`Fixed width` to ``200`` units and adjust the segments to your liking.
 
  .. image:: /static/3/making_a_map/images/32.png
     :align: center
     
33. It is time to label our map. Click on :menuselection:`Add Item --> Add Label`.

  .. image:: /static/3/making_a_map/images/33.png
     :align: center
     
34. Click on the map and draw a box where the label should be. In the :guilabel:`Item Properties` tab, expand the :guilabel:`Label` section and enter a label for the map. Similarly add another labels for data and software credits.

  .. image:: /static/3/making_a_map/images/34.png
     :align: center

35. Once you are satisfied with the map, you can export it as an Image, PDF or SVG. For this tutorial, let's export it as an image. Click :menuselection:`Layout --> Export as Image`.

  .. image:: /static/3/making_a_map/images/35.png
     :align: center

35. Save the image in the format of your liking. Below is the exported PNG image.

  .. image:: /static/3/making_a_map/images/output.png
     :align: center