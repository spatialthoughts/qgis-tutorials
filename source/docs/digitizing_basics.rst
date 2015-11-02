Digitizing Map Data
===================
.. raw:: html

   <p>[ Download PDF
   <a class="reference external" href="../pdf/digitizing_basics_a4.pdf"
   onClick="ga('send', 'event', 'PDF Download', 'digitizing_basics_a4');"
   target="_blank">A4</a>

   <a class="reference external"
   href="../pdf/digitizing_basics_letter.pdf" onClick="ga('send',
   'event', 'PDF Download', 'digitizing_basics_letter');"
   target="_blank">Letter</a> ]</p>

Digitizing is one of the most common tasks that a GIS Specialist has to do.
Often a large amount of *GIS time* is spent in digitizing raster data to create
vector layers that you use in your analysis. QGIS has powerful on-screen
digitizing and editing capabilities that we will explore in this tutorial.

Overview of the task
--------------------
We will use a raster topographic map and create several vector layers
representing features around a park.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Building pyramids for large raster datasets to speed up zoom and pan
  operations.
- Working with a Spatialite database.


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

`BX24_GeoTifv1-02-clip.tif <../../downloads/BX24_GeoTifv1-02-clip.tif>`_

Data Source [LINZ]_

Procedure
---------

1. Go to :menuselection:`Layer --> Add Raster Layer`. Locate the downloaded
   ``BX24_GeoTifv1-02.tif`` and click :guilabel:`Open`.

.. image:: /static/digitizing_basics/images/1.png
   :align: center

2. This is a large raster file and you may notice that when you zoom or pan
   around the map, the map takes a little time to render the image. QGIS offers
   a simple solution to make rasters load much faster by using **Image
   Pyramids**. QGIS creates pre-rendered tiles at different resolutions and
   these are presented to you instead of the full raster. This makes map
   navigation snappy and responsive. Right-click the ``BX24_GeoTifv1-02`` layer
   and choose :guilabel:`Properties`.

.. image:: /static/digitizing_basics/images/2.png
   :align: center

3. Choose the :guilabel:`Pyramids` tab. Hold the :kbd:`Ctrl` key and select all
   the resolutios offered in the :guilabel:`Resolutions` panel. Leave other
   options to defaults and click :guilabel:`Build pyramids`. Once the process
   finishes, click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/3.png
   :align: center

4. Back in the main QGIS window, use the :guilabel:`Zoom` tool to locate
   *Hagley Park* area in Christchurch. This is the park that we will be
   digitizing.

.. image:: /static/digitizing_basics/images/4.png
   :align: center

5. Before we start, we need to set default **Digitizing Options**. Go to
   :menuselection:`Settings --> Options...`.

.. image:: /static/digitizing_basics/images/5.png
   :align: center

6. Select the :guilabel:`Digitizing` tab in the :guilabel:`Options` dialog.
   Set the :guilabel:`Default snap mode` to :guilabel:`To vertex and segment`.
   This will allow you to snap to the nearest vertex or line segment. I also
   prefer to set the :guilabel:`Default snapping tolerance` and
   :guilabel:`Search radius for vertex edits` in pixels instead of map units.
   This will ensure that the snapping distance remains constant regardless of
   zoom level. Depending on your computer screen resolution, you
   may choose an appropriate value. Click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/6.png
   :align: center

7. Now we are ready to start digitizing. We will first create a roads layer and
   digitize the roads around the park area. Select :menuselection:`Layer --> New
   --> New Spatialite Layer...`. You may also choose to create a :guilabel:`New
   Shapefile Layer...` instead if you prefer. Spatialite is an open database
   format similar to ESRI's geodatabase format. Spatialite database is
   contained within a single file on your hard drive and can contain diferent
   types of spatial (point, line, polygon) as well as non-spatial layers. This
   makes is much easier to move it around instead of a bunch of shapefiles. In
   this tutorial, we are creating a couple of polygon layers and a line layer,
   so a Spatialite database will be better suited. You can always load a
   spatialite layer and save it as a shapefile or any other format you want.

.. image:: /static/digitizing_basics/images/7.png
   :align: center

8. In the :guilabel:`New Spatialite Layer` dialog, click the :guilabel:`...`
   button and save a new spatialite database named ``nztopo.sqlite``. Choose
   the :guilabel:`Layer name` as ``Roads`` and select ``Line`` as the
   :guilabel:`Type`. The base topographic map is in the
   ``EPSG:2193 - NZGD 2000`` CRS, so we can select
   the same for our roads layer. Check the :guilabel:`Create an
   autoincrementing primary key` box. This will create a field called **pkuid**
   in the attribute table and assign a unique numeric id automatically to each
   feature. When creating a GIS layer, you must decide on the attributes that
   each feature will have. Since this is a roads layer, we will have 2 basic
   attributes - Name and Class. Enter ``Name`` as the :guilabel:`Name`
   of the attribute in the :guilabel:`New attribute` section and click
   :guilabel:`Add to attribute list.`

.. image:: /static/digitizing_basics/images/8.png
   :align: center

9. Similarly create a new attribute ``Class`` of the type :guilabel:`Text data`.
   Click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/9.png
   :align: center

10. Once the layer is loaded, click the :guilabel:`Toggle Editing` button to
    put the layer in editing mode.

.. image:: /static/digitizing_basics/images/10.png
   :align: center

11. Click the :guilabel:`Add feature` button. Click on the map canvas to add a
    new vertex. Add new vertices along the road feature. Once you have digitized
    a road segment, right-click to end the feature.

.. note::

   You can use the scroll wheel of the mouse to zoom in or out while digitizing.
   You can also hold the scroll button and move the mouse to pan around.

.. image:: /static/digitizing_basics/images/11.png
   :align: center

12. After you right-click to end the feature, you will get a pop-up dialog
    called :guilabel:`Attributes`. Here you can enter attributes of the newly
    created feature. Since the **pkuid** is an auto-incrementing field, you
    will not be able to enter a value manually. Leave it blank and enter the
    road name as it appears on the topo map. Optionally, assign a Road Class
    value as well. Click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/12.png
   :align: center

13. The default style of the new line layer is a thin line. Let's change it so
    we can better see the digitized features on the canvas. Right click the
    ``Roads`` layer and select :guilabel:`Properties`.

.. image:: /static/digitizing_basics/images/13.png
   :align: center

14. Select the :guilabel:`Style` tab in the :guilabel:`Layer Properties`
    dialog. Choose a thicker line style such as :guilabel:`Primary` from the
    predefined styles. Click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/14.png
   :align: center

15. Now you will see the digitized road feature clearly. Click :guilabel:`Save
    Layer Edits` to commit the new feature to disk.

.. image:: /static/digitizing_basics/images/15.png
   :align: center

16. Before we digitize remaining roads, it is important to update some other
    settings that are important to create an error free layer. Go to
    :menuselection:`Settings --> Snapping Options...`.

.. image:: /static/digitizing_basics/images/16.png
   :align: center

17. In the :guilabel:`Snapping Options` dialog, check the :guilabel:`Enable
    topological editing`. This option will ensure that the common boundaries
    are maintained correctly in polygon layers. Also check the
    :guilabel:`Enable snapping on intersection` which allows you to snap on an
    intersection of a background layer.

.. image:: /static/digitizing_basics/images/17.png
   :align: center

18. Now you can click :guilabel:`Add feature` button and digitize other roads
    around the park. Make sure to click :guilabel:`Save Edits` after you add a
    new feaure to save your work. A useful tool to help you with digitizing is
    the **Node Tool**. Click the :guilabel:`Node Tool` button.

.. image:: /static/digitizing_basics/images/18.png
   :align: center

19. Once the node tool is activated, click on any feature to show the vertices.
    Click on any vertex to select it. The vertex will change the color once it
    is selected. Now you can click and drag your mouse to move the vertex. This
    is useful when you want to make adjustments after the feature is created.
    You can also delete a selected vertex by clicking the :kbd:`Delete` key.
    (:kbd:`Option+Delete` on a mac)

.. image:: /static/digitizing_basics/images/19.png
   :align: center

20. Once you have finished digitizing all the roads, click the
    :guilabel:`Toggle Editing` button.

.. image:: /static/digitizing_basics/images/20.png
   :align: center

21. Now we will create a polygon layer representing the park boundaries. Go to
    :menuselection:`Layer --> New --> New Spatialite Layer...`. Select the
    ``nztopo.sqlite`` database from the dropdown list. Name the new layer as
    ``Parks``. Select ``Polygon`` as the :guilabel:`Type`. Create a new
    attribute called ``Name``. Click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/21.png
   :align: center

22. Click the :guilabel:`Add feature` button and click on the map canvas to add
    a polygon vertex. Digitize the polygon representing the park. Make sure you
    snap to the roads vertices so there are no gaps between the park polygons
    and road lines. Right-click to finish the polygon.

.. image:: /static/digitizing_basics/images/22.png
   :align: center

23. Enter the park name in the :guilabel:`Attributes` pop-up.

.. image:: /static/digitizing_basics/images/23.png
   :align: center

24. Polygon layers offer another very useful setting called **Avoid
    intersections of new polygons**. Go to :menuselection:`Settings -->
    Snapping Options...`. Check the box in the :guilabel:`Avoid Int` column in
    the row for the ``Parks`` layer. Click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/24.png
   :align: center

25. Now click on :guilabel:`Add feature` to add a polygon. With the **Avoid
    intersections of new polygons**, you will be able quickly digitize a new
    polygon without worrying about snapping exactly to the neighboring polygons.

.. image:: /static/digitizing_basics/images/25.png
   :align: center

26. Right-click to finish the polygon and enter the attributes. Magically the
    new polygon is shrunk and snapped exactly to the boundary of the neighboring
    polygons! This is very useful when digitizing complex boundaries where you
    need not be very precise and still have topologically correct polygon.
    Click :guilabel:`Toggle Editing` to finish editing the ``Parks`` layer.

.. image:: /static/digitizing_basics/images/26.png
   :align: center

27. Now it is time to digitize a buildings layer. Create a new polygon layer named
    ``Buildings`` by going to :menuselection:`Layer --> New --> New Spatialite
    Layer`.

.. image:: /static/digitizing_basics/images/27.png
   :align: center

28. Once the ``Buildings`` layer is added, turn off the ``Parks`` and ``Roads``
    layer so the base topo map is visible. Select the ``Buildings`` layer and
    click :guilabel:`Toggle Editing`.

.. image:: /static/digitizing_basics/images/26.png
   :align: center

29. Digitizing buildings can be a cumbersome task. Also it is difficult to add
    vertices manually so that the edges are perpendicular and form a rectangle.
    We will use a plugin called **Rectangles Ovals Digitizing** to help with
    this task. See :doc:`using_plugins` to see how to search and install
    plugins. Once the **Rectangles Ovals Digitizing** plugin is installed, you
    will see a new toolbar appear above the canvas.

.. image:: /static/digitizing_basics/images/29.png
   :align: center

30. Zoom to an area with the buildings and click :guilabel:`Rectangle by
    Extent` button. Click and drag the mouse to draw a perfect rectangle.
    Similarly, add remaining buildings.

.. image:: /static/digitizing_basics/images/30.png
   :align: center

31. You will notice that some buildings are not vertical. We will need to draw
    a rectangle at an angle to match the building footprint. Click the
    :guilabel:`Rectangle from center`.

.. image:: /static/digitizing_basics/images/31.png
   :align: center

32. Click at the center of the building and drag the mouse to draw a vertical
    rectangle.

.. image:: /static/digitizing_basics/images/32.png
   :align: center

33. We need to rotate this rectangle to match the image on the topo map. The
    rotate tool is available in the **Advanced Digitizing** toolbar.
    Right-click on an empty area on the toolbar section and enable the
    :guilabel:`Advanced Digitizing` toolbar.

.. image:: /static/digitizing_basics/images/33.png
   :align: center

34. Click the :guilabel:`Rotate Feature(s)` button.

.. image:: /static/digitizing_basics/images/34.png
   :align: center

35. Use the :guilabel:`Select Single feature` tool to select the polygon that
    you want to rotate. Once the :guilabel:`Rotate Feature(s)` tool is
    activated, you will see crosshairs at the center of the polygon. Click
    exactly on that crosshairs and drag the mouse while holding the left-click
    button. A preview of the rotated feature will appear. Let go of the mouse
    button when the polygon aligns with the building footprint.

.. image:: /static/digitizing_basics/images/35.png
   :align: center

36. Save the layer edits and click :guilabel:`Toggle Editing` once you finish
    digitizing all buildings. You can drag the layers to change their order of
    appearance.

.. image:: /static/digitizing_basics/images/36.png
   :align: center

37. The digitizing task is now complete. You can play with the styling and
    labelling options in layer properties to create a nice looking map from the
    data you created.

.. image:: /static/digitizing_basics/images/37.png
   :align: center

