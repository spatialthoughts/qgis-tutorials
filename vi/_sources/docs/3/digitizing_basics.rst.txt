Digitizing Map Data (QGIS3)
===========================
Digitizing is one of the most common tasks a GIS Specialist has to do.
Often a large amount of *GIS time* is spent digitizing raster data to create
vector layers that you use in your analysis. QGIS has powerful on-screen
digitizing and editing capabilities that we will explore in this tutorial.

Overview of the task
--------------------
We will use a raster topographic map and create several vector layers
representing features around a park.

Other skills you will learn.
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Building pyramids for large raster datasets to speed up zoom and pan
  operations.
- Create and edit GeoPackage. 


Get the data
------------

`Land Information New Zealand (LINZ) <http://www.linz.govt.nz/>`_ provides
raster topographic maps at 1:50,000 scale for the New Zealand mainland and
Chatham Islands.

Download the `GeoTIFF Image file
<http://topo.linz.govt.nz/Topo50_raster_images/GeoTIFFTopo50/BX24_GeoTifv1-02.tif>`_
from the `Christchurch Topo50 map download page
<http://www.linz.govt.nz/topography/topo-maps/map-chooser/christchurch/christchurch#digitalfile>`_.

For convenience, you may directly download a copy of the dataset from the
link below:

`BX24_GeoTifv1-02-clip.tif <https://www.qgistutorials.com/downloads/BX24_GeoTifv1-02-clip.tif>`_

Data Source [LINZ]_

Procedure
---------

01. In QGIS, let's load the image file. Go to :menuselection:`Layer --> Add Layer --> Add Raster Layer`.

 .. image:: /static/3/digitizing_basics/images/01.png
    :align: center
   
02. In the :guilabel:`Data Source Manager` dialog select :guilabel:`Raster.` Under :guilabel:`Source` click on the ``...`` and locate the downloaded ``BX24_GeoTifv1-02.tif`` and click :guilabel:`Open`. Then click :guilabel:`Add` followed by :guilabel:`Close.`

 .. image:: /static/3/digitizing_basics/images/02.png
    :align: center
   
03. This is a large raster file, and you may notice that when you zoom or pan around the map, the map takes a little time to render the image. QGIS offers a simple solution to make rasters load much faster by using **Image Pyramids**. QGIS creates pre-rendered tiles at different resolutions, and these are presented to you instead of the full raster. This makes map navigation snappy and responsive. Right-click the ``BX24_GeoTifv1-02`` layer and choose :guilabel:`Properties`.

 .. image:: /static/3/digitizing_basics/images/03.png
    :align: center
   
04. In the :guilabel:`Layer Properties` dialog, Choose the :guilabel:`Pyramids` tab. Hold the :kbd:`Ctrl` key and select all the resolutions offered in the :guilabel:`Resolutions` panel. Leave other options to defaults and click :guilabel:`Build pyramids`. 

 .. image:: /static/3/digitizing_basics/images/04.png
    :align: center   
 
05. Once the process finishes, the dialog box will show the pyramids without a cross. This indicates the Image Pyramids build is completed. Click :guilabel:`OK`.

 .. image:: /static/3/digitizing_basics/images/05.png
    :align: center
   
06. Before we start, we need to set default **Digitizing Options**. Go to :menuselection:`Settings --> Options...`.

 .. image:: /static/3/digitizing_basics/images/06.png
    :align: center
	
07. Select the :guilabel:`Digitizing` tab in the :guilabel:`Options` dialog. Check the :guilabel:`Enable snapping by default`  under :guilabel:`Snapping` section. In :guilabel:`Default snap mode` choose :guilabel:`Vertex`. This will allow you to snap to the nearest vertex. I also prefer to set the :guilabel:`Default snapping tolerance` and :guilabel:`Search radius for vertex edits` in pixels instead of map units. This will ensure that the snapping distance remains constant regardless of zoom level. Depending on your computer screen resolution, you may choose an appropriate value. Click :guilabel:`OK`.

 .. image:: /static/3/digitizing_basics/images/07.png
    :align: center
   
08. Now we are ready to start digitizing. We will first create a road layer and digitize the roads around the park area. Click :menuselection:`Layer --> Create Layer --> New GeoPackage Layer...` icon from Panels. A GeoPackage is an open, non-proprietary, platform-independent, and standards-based data format for a geographic information system implemented as an SQLite database container. This makes it much easier to move it around instead of a bunch of shapefiles. In this tutorial, we create a couple of polygon layers and a line layer so that a GeoPackage will be better suited. You can always load a GeoPackage and export layers as a shapefile or any other format you want.

 .. image:: /static/3/digitizing_basics/images/08.png
    :align: center 
	
09. In the :guilabel:`New GeoPackage Layer` dialog, click the :guilabel:`...` button and save a new GeoPackage database named ``digitizing.gpkg``. Choose the :guilabel:`Table name` as ``Roads`` and select ``LineString`` as the :guilabel:`Geometry type`. The base topographic map is the ``EPSG:2193 - NZGD 2000`` CRS. 

 .. image:: /static/3/digitizing_basics/images/09.png
    :align: center
   
10. When creating a GIS layer, you must decide on each feature's attributes. Since this is a road layer, we additionally will have two primary attributes - Name and Class. In :guilabel:`New Field` Enter ``Name`` of the type :guilabel:`Text data,` with ``50`` as :guilabel:`Maximum length` and click :guilabel:`Add to attribute list.` Now create a new attribute ``Class`` of the type :guilabel:`Text data`, with ``50`` as :guilabel:`Maximum length`. Click :guilabel:`OK`

 .. image:: /static/3/digitizing_basics/images/10.png
    :align: center       
	
11. Once the ``Roads`` layer is loaded, click the :guilabel:`Toggle Editing` button to put the layer in editing mode.

 .. image:: /static/3/digitizing_basics/images/11.png
   :align: center
   
12. Click the :guilabel:`Add Line Feature` button. Click on the map canvas to add a new vertex. Add new vertices along with the road feature. Once you have digitized a road segment, right-click to end the feature.

 .. image:: /static/3/digitizing_basics/images/12.png
    :align: center
	
.. note::

   You can use the scroll wheel of the mouse to zoom in or out while digitizing.
   You can also hold the scroll button and move the mouse to pan around.
   

   
13. After you right-click to end the feature, you will get a pop-up dialog called :guilabel:`Road - Feature Attributes`. Here you can enter attributes of the newly created feature. Skip entering any value for **fid** as it is a sequential id that will be autogenerated. Enter the road name as it appears on the topo map. Optionally, assign a Road Class value as well. Click :guilabel:`OK`.

 .. image:: /static/3/digitizing_basics/images/13.png
    :align: center
   
14. The default style of the new line layer is a thin line. Let's change it to better see the digitized features on the canvas. Select the ``Roads`` layer and click :guilabel:`Layer Styling Panel`.

 .. image:: /static/3/digitizing_basics/images/14.png
    :align: center   
 
15. In the :guilabel:`Layer Styling Panel`, search for different `road` layer styles. Select ``topo road``. Click :guilabel:`OK`.

 .. image:: /static/3/digitizing_basics/images/15.png
    :align: center
   
16. Now the road layer will be clearly visible. If you are satisfied with the work, click :guilabel:`Save Layer Edits` button to save the changes. 

 .. image:: /static/3/digitizing_basics/images/16.png
    :align: center
	
17. Before we digitize the remaining roads, it is essential to update some other important snap settings to create an error-free layer. Right-click on any space on the toolbar area and activate the :guilabel:`Snapping toolbar.` 

 .. image:: /static/3/digitizing_basics/images/17.png
    :align: center
   
18. Now an :guilabel:`Enable Snapping` (Magnet Icon) will appear on the panel. Click on it to enable it and select :guilabel:`All Layers` and choose ``Open Snapping Options..``. 

 .. image:: /static/3/digitizing_basics/images/18.png
    :align: center 
	
19. In the :guilabel:`Snapping options` dialog, click the :guilabel:`Snapping on Intersection`, which allows you to snap on an intersection of a background layer.

 .. image:: /static/3/digitizing_basics/images/19.png
    :align: center
   
20. Now you can click :guilabel:`Add feature` button and digitize other roads around the park. Make sure to click :guilabel:`Save Edits` after adding a new feature to save your work. A helpful tool to help you digitize is the **Vertex Tool**. Click the :guilabel:`Vertex Tool` button and select ``Vertex Tool (Current Layer)``.

 .. image:: /static/3/digitizing_basics/images/20.png
    :align: center       
	
21. Once the node tool is activated, click on any feature to show the vertices. Click on any vertex to select it. The vertex will change the color once it is selected. Now you can click and drag your mouse to move the vertex. This is useful when you want to make adjustments after the feature is created. You can also delete a selected vertex by clicking the :kbd:`Delete` key.    (:kbd:`Option+Delete` on a mac)

 .. image:: /static/3/digitizing_basics/images/21.gif
    :align: center
   
22. Once you have finished digitizing all the roads, click the :guilabel:`Toggle Editing` button. Click :guilabel:`Save`.

 .. image:: /static/3/digitizing_basics/images/22.png
    :align: center
   
23. Now we will create another layer to digitize the parks as polygons. Click :menuselection:`Layer --> Create Layer --> New GeoPackage Layer...` icon from Panels. In the :guilabel:`New GeoPackage Layer` dialog, click the :guilabel:`...` button and select the GeoPackage database named ``digitizing.gpkg``. Name the new layer as an attribute called ``Parks``. Select ``MultiPolygon`` as the :guilabel:`Type`. The base topographic map is the ``EPSG:2193 - NZGD 2000`` CRS. Click :guilabel:`OK`. In :guilabel:`New Field` Enter ``Name``, and the :guilabel:`type` as :guilabel:`Text data`, with ``50`` as :guilabel:`Maximum length` and click :guilabel:` Add to Fields List.`. Click :guilabel:`OK`. 

 .. image:: /static/3/digitizing_basics/images/23.png
    :align: center
	
.. note::
   **Polygon vs Multi-Polygon**
   
   **Polygon** - Planar Surface defined by 1 exterior boundary and 0 or more interior boundaries. Each interior boundary defines a hole in the Polygon.
   
   **Multi-Polygon** - It is used to represent areas with holes inside or consisting of multiple disjoint areas. For eg, 3 discontinuous polygons can be drawn and grouped as a single feature.


   
24. A pop-up dialog will appear. Select the :guilabel:`Add New Layer` button. 

 .. image:: /static/3/digitizing_basics/images/24.png
    :align: center   
 
25. Now select layer ``Parks`` then clickroad :guilabel:`Toggle Editing` and click the :guilabel:`Add feature` button and click on the map canvas to add a polygon vertex. Digitize the polygon representing the park. Make sure you snap to the road's vertices so there are no gaps between the park polygons and road lines. Right-click to finish the polygon.

 .. image:: /static/3/digitizing_basics/images/25.png
    :align: center
   
26. Enter the park name in the :guilabel:`Parks - Feature Attributes` pop-up.

 .. image:: /static/3/digitizing_basics/images/26.png
    :align: center

27. Now digitize the upper region of the park. Enter the park name and save the changes. 

 .. image:: /static/3/digitizing_basics/images/27.png
    :align: center

28. Now, before digitizing the inner polygon lets set settings that can ease this work. Multi-Polygon layers offer another useful setting called **Avoid intersections of new polygons**. Select :guilabel:`Enable Snapping` (Magnet Icon), click on it to enable it, and click :guilabel:`All Layers` and select ``Advanced Configuration``.

 .. image:: /static/3/digitizing_basics/images/28.png
    :align: center
   
29. Click the ``Avoid Overlap on Active layers`` button in the snapping toolbar.  

 .. image:: /static/3/digitizing_basics/images/29.png
    :align: center 
	
30. Now in :guilabel:`Edit Advanced Configuration`, select the :guilabel:`Units` as ``pixels``. 

 .. image:: /static/3/digitizing_basics/images/30.png
    :align: center
   
31. Check the box in the :guilabel:`Avoid Overlap` column in the row for the ``Parks`` layer. 

 .. image:: /static/3/digitizing_basics/images/31.png
    :align: center     
	
	
32. Click on :guilabel:`Add feature` to add a polygon. With the **Avoid Overlap**, you will be able to quickly digitize a new polygon without worrying about snapping exactly to the neighboring polygons.

 .. image:: /static/3/digitizing_basics/images/32.png
    :align: center
   
33. Right-click to finish the polygon and enter the attributes. Magically the new polygon is shrunk and snapped exactly to the boundary of the neighboring polygons! This is very useful when digitizing complex boundaries where you need not be precise and still have topologically correct polygon. Click :guilabel:`Toggle Editing` to finish editing the ``Parks`` layer.

 .. image:: /static/3/digitizing_basics/images/33.png
    :align: center
   
34.  Now it is time to digitize a buildings layer. Create a new polygon layer named ``Buildings`` by clicking :menuselection:`Layer --> Create Layer --> New GeoPackage Layer...` icon from Panels. Set the :guilabel:`Buildings` and :guilabel:`MuiltiPolygon`. Choose the CRS as ``EPSG:2193 - NZGD 2000``. Click :guilabel:`OK`. 

 .. image:: /static/3/digitizing_basics/images/34.png
    :align: center
   
35. Once the ``Buildings`` layer is added, turn off the ``Parks`` and ``Roads`` layers to make the base topo map visible. Select the ``Buildings`` layer and click :guilabel:`Toggle Editing`.

 .. image:: /static/3/digitizing_basics/images/35.png
    :align: center   
 

36. Digitizing buildings can be a cumbersome task, and also, it is challenging to add vertices manually so that the edges are perpendicular and form a rectangle. We will use a QGIS toolbar called **Shape Digitizing** to help with this task. Right-click on any empty space on the toolbar area and activate the ``Shape Digitizing Toolbar``. 

 .. image:: /static/3/digitizing_basics/images/36.png
    :align: center
   
37. Enable editing by pressing the pencil icon :guilabel:`Toggle Editing`.

 .. image:: /static/3/digitizing_basics/images/37.png
    :align: center
	
38. Now under :guilabel:`Add Rectangle dropdown` select :guilabel:`Add Rectangle from Extent` button. 

 .. image:: /static/3/digitizing_basics/images/38.png
    :align: center
   
39. Zoom to an area with the buildings. Click and drag the mouse to draw a perfect rectangle. Similarly, add the remaining buildings.

 .. image:: /static/3/digitizing_basics/images/39.png
    :align: center 
	
40. You will notice that some buildings are not vertical, and we will need to draw a rectangle at an angle to match the building footprint. Under :guilabel:`Add Rectangle dropdown` select :guilabel:`Add Rectangle from Center and a Point` button. 

 .. image:: /static/3/digitizing_basics/images/40.png
    :align: center

41. Zoom to an area of diamond-shaped buildings. Click on the center to drop a point and drag the mouse to draw a rectangle.

 .. image:: /static/3/digitizing_basics/images/41.png
    :align: center     
	
	
42. We need to rotate this rectangle to match the image on the topo map. The rotate tool is available in the **Advanced Digitizing** toolbar. Right-click on an empty area on the toolbar section and enable the :guilabel:`Advanced Digitizing` toolbar.

 .. image:: /static/3/digitizing_basics/images/42.png
    :align: center
   
43. Click the :guilabel:`Rotate Feature` button.

 .. image:: /static/3/digitizing_basics/images/43.png
    :align: center
   
44. Use the :guilabel:`Select Single feature` tool to select the polygon you want to rotate. Once the :guilabel:`Rotate Feature` tool is activated, you will see crosshairs at the center of the polygon. Click exactly on that crosshairs and drag the mouse while holding the left-click button. A preview of the rotated feature will appear. Let go of the mouse button when the polygon aligns with the building footprint.

 .. image:: /static/3/digitizing_basics/images/44.png
    :align: center   
   
45. Save the layer edits and click :guilabel:`Toggle Editing` once you finish digitizing all buildings. You can drag the layers to change their order of appearance. The digitizing task is now complete. You can play with the styling and labeling options in layer properties to create a nice-looking map from the data you created.

 .. image:: /static/3/digitizing_basics/images/45.png
    :align: center   