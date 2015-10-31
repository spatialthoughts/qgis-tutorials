Making a Map
============

.. raw:: html

   <p>[ Download PDF
   <a class="reference external" href="../pdf/making_a_map_a4.pdf" onClick="_gaq.push(['_trackEvent', 'PDF Download', 'making_a_map_a4']);" target="_blank">A4</a>

   <a class="reference external" href="../pdf/making_a_map_letter.pdf" onClick="_gaq.push(['_trackEvent', 'PDF Download', 'making_a_map_letter']);" target="_blank">Letter</a>
   ]</p>

Often one needs to create a map that can be printed or published. QGIS has a
powerful tool called :guilabel:`Print Composer` that allows you to take your
GIS layers and package them to create maps.

Overview of the task
--------------------

The tutorial shows how to create a map of Japan with standard map elements like
map inset, grids, north arrow, scale bar and labels.

Other skills you will learn
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Using 'on-the-fly' CRS transformation to visualize your data in a different
  projection.

Get the data
------------

We will use the Natural Earth dataset - specifically the Natural Earth Quick
Start Kit that comes with beautifully styled global layers that can be loaded
directly to QGIS.

Download the `Natural Earth Quickstart Kit <http://kelso.it/x/nequickstart>`_.

Data Source [NATURALEARTH]_

Procedure
---------

1. Download and extract the Natural Earth Quick Start Kit data. Open QGIS.
   Click on :menuselection:`File --> Open Project`.

.. image:: /static/making_a_map/images/1.png
   :align: center

2. Browse to the directory when you had extracted the natural earth data. You
   should see a file named :file:`Natural_Earth_quick_start_for_QGIS.qgs`. This
   is the project file that contains styled layers in QGIS Document format.
   Click :guilabel:`Open`.

.. image:: /static/making_a_map/images/2.png
   :align: center

3. You would see a lot of layers in the table of content and a styled world map
   in the QGIS canvas. If you see errors displayed at the top of the canvas,
   click on the cross to close it.

.. image:: /static/making_a_map/images/3.png
   :align: center

4. In this tutorial, we will make a map of Japan. Click the :guilabel:`Zoom In`
   button and draw a rectangle around Japan to zoom to the area.

.. image:: /static/making_a_map/images/4.png
   :align: center


5. You can turn off some map layers for data that we do not need for this map.
   Un-check the box next to ``10m_geography_marine_polys`` and
   ``10m_admin_0_map_units`` layers. Before we make a map suitable for printing, we need to choose an appropriate
   projection. This dataset comes in Geographic Coordinate System (GCS) where
   the units are degrees. This is not appropriate for a map where you want the
   distances to be in kilometers or miles. We need to use a Projected
   Coordinate System that minimizes distortions for our region of interest and
   has units in meters. Universal Transverse Mercator (UTM) is a decent choice
   for a projected coordinate system. It is also global, so it's a good default
   that you can rely on and  choose a UTM zone that contains your area of
   interest to minimize distortions for your region. In our case, we will use
   UTM Zone 54N. Click the :guilabel:`CRS Status` button at the bottom-right of
   the QGIS window.

.. note::

   For Japan, Japan Plane Rectangular CS is a projected coordinate reference
   system (CRS) that is designed for minimum distortions. It is divided in 18
   zones and if you are working for a smaller region in Japan, using this CRS
   will be better.

.. image:: /static/making_a_map/images/5.png
   :align: center

6. Check the :guilabel:`Enable on-the-fly CRS Transformation` box. Type ``Tokyo
   utm zone54n`` in the :guilabel:`Filter` search box. Once you see the
   results, select :guilabel:`Tokyo / UTM Zone 54N - EPSG:3095`. Click
   :guilabel:`Apply`.

.. image:: /static/making_a_map/images/6.png
   :align: center

7. Now we can start to assemble our map. Go to
   :menuselection:`Project --> New Print Composer`.

.. image:: /static/making_a_map/images/7.png
   :align: center

8. You will be prompted to enter a title for the composer. You can leave it
   empty and click :guilabel:`Ok`.

.. note::

   Leaving the composer name empty will assign a default name such as
   ``Composer 1``.

.. image:: /static/making_a_map/images/8.png
   :align: center


10. In the Print Composer window, click on :guilabel:`Zoom full` to display the
    full extent of the Layout. Now we would have to bring the map view that we
    see in the QGIS Canvas to the composer. Go to :menuselection:`Layout -->
    Add Map`.

.. image:: /static/making_a_map/images/10.png
   :align: center


11. Once the :guilabel:`Add Map` button is active, hold the left mouse button
    and drag a rectangle where you want to insert the map.

.. image:: /static/making_a_map/images/11.png
   :align: center

12. You will see that the rectangle window will be rendered with the map from
    the main QGIS canvas. The rendered map may not be covering the full extent
    of our interest area.  Select :menuselection:`Layout --> Move item content`
    to pan the map in the window and center it in the composer.

.. image:: /static/making_a_map/images/12.png
   :align: center

13. Let us adjust the zoom level for the given map. Click on the
    :guilabel:`Item Properties` tab and enter `7000000` for :guilabel:`Scale`
    value.

.. image:: /static/making_a_map/images/13.png
   :align: center

14. Now we will add a map inset that shows a zoomed in view for the Tokyo area.
    Before we make  any changes to the layers in the main QGIS window, check
    the :guilabel:`Lock layers for map item` and :guilabel:`Lock layer styles
    for map item` boxes. This will ensure that if we turn off some layers or
    change their styles, this view will not change.

.. image:: /static/making_a_map/images/14.png
   :align: center

15. Switch to the main QGIS window. Use the :guilabel:`Zoom In` button to zoom
    to the area around Tokyo.

.. image:: /static/making_a_map/images/15.png
   :align: center

16. There are some duplicate labels coming from the ``ne_10m_populated_places``
    layer. You can turn it off for this view.

.. image:: /static/making_a_map/images/16.png
   :align: center

17. We are now ready to add the map inset. Switch the the :guilabel:`Print
    Composer` window. Go to :menuselection:`Layout --> Add Map`.

.. image:: /static/making_a_map/images/17.png
   :align: center

18. Drag a rectangle at the place where you want to add the map inset. You will
    now notice that we have 2 map objects in the Print Composer. When making
    changes, make sure you have the correct map selected. Select the ``Map 1``
    object that we just added from the :guilabel:`Items` panel. Select the
    :guilabel:`Item properties` tab. Scroll down to the :guilabel:`Frame` panel
    and check the box next to it. You can change the color and thickness of the
    frame border so it is easy to distinguish against the map background.

.. image:: /static/making_a_map/images/18.png
   :align: center

19. One neat feature of the Print Composer is that it can automatically
    highlight the area from the main map which is represented in our inset.
    Select the ``Map 0`` object from the :guilabel:`Items` panel. In the
    :guilabel:`Item properties` tab, scroll down to the :guilabel:`Overviews`
    section. Click the :guilabel:`Add a new overview` button.

.. image:: /static/making_a_map/images/19.png
   :align: center

20. Select ``Map 1`` as the :guilabel:`Map Frame`. What this is telling the
    Print Composer is that it must highlight our current object ``Map 0`` with
    the extent of the map shown in the ``Map 1`` object.

.. image:: /static/making_a_map/images/20.png
   :align: center

21. Now that we have the map inset ready, we will add a grid and zebra border
    to the main map. Select the ``Map 0`` object from the :guilabel:`Items`
    panel. In the :guilabel:`Item properties` tab, scroll down to the
    :guilabel:`Grids` section. Click the :guilabel:`Add a new grid` button.

.. image:: /static/making_a_map/images/21.png
   :align: center

22. By default, the grid lines use the same units and projections as the
    currently selected map projections. However, it is more common and useful
    to display grid lines in degrees. We can select a different CRS for the
    grid. Click on the :guilabel:`change...` button next to :guilabel:`CRS`.

.. image:: /static/making_a_map/images/22.png
   :align: center

23. In the :guilabel:`Coordinate Reference System Selector` dialog, enter
    ``4326`` in the :guilabel:`Filter` box. From the results, select the
    ``WGS84 EPSG:4326`` as the CRS. Click :guilabel:`OK`.

.. image:: /static/making_a_map/images/23.png
   :align: center

24. Select the :guilabel:`Interval` values as ``5`` degrees in both
    :guilabel:`X` and :guilabel:`Y` direction. You can adjust the
    :guilabel:`Offset` to change where the grid lines appear.

.. image:: /static/making_a_map/images/24.png
   :align: center

25. Scroll down to the :guilabel:`Grid frame` section and select a frame style
    that suits your taste. Also check the :guilabel:`Draw coordinates` box.

.. image:: /static/making_a_map/images/25.png
   :align: center

26. Adjust the :guilabel:`Distance to map frame` till the coordinates are
    legible. Change the :guilabel:`Coordinate precision` to ``1`` so the
    coordinates are displayed only upto the first decimal.

.. image:: /static/making_a_map/images/26.png
   :align: center

27. Now we will add a North Arrow to the map. The Print Composer comes with a
    nice collection of map-related images - including many types of North
    Arrows.  Click :menuselection:`Layout --> Add Image`.

.. image:: /static/making_a_map/images/27.png
   :align: center

28. Holding your left mouse button, draw a rectangle on the top-right corner of
    the map canvas. On the right-hand panel, click on the :guilabel:`Item
    Properties` tab and expand the :guilabel:`Search directories` section and
    select the North Arrow image of your liking.

.. image:: /static/making_a_map/images/28.png
   :align: center

29. Now we will add a scale bar. Click on :menuselection:`Layout --> Add
    Scalebar`.

.. image:: /static/making_a_map/images/29.png
   :align: center

30. Click on the layout where you want the scalebar to appear.  In the
    :guilabel:`Item Properties` tab, make sure you have chosen the correct map
    element for which to display the scalebar. Choose the Style that fit your
    requirement. In the :guilabel:`Segments` panel, you can adjust the number
    of segments and their size.

.. image:: /static/making_a_map/images/30.png
   :align: center

31. It is time to label our map. Click on :menuselection:`Layout --> Add Label`.

.. image:: /static/making_a_map/images/31.png
   :align: center

32. Click on the map and draw a box where the label should be. In the
    :guilabel:`Item Properties` tab, expand the :guilabel:`Label` section and
    enter the text as shown below. We can enter the text as HTML as well.
    Check the box :guilabel:`Render as Html` so the composer will interpret the
    HTML tags.

.. code-block:: none

   <div align=center>
   <h1>Map of Japan</h1>
   </div>

.. image:: /static/making_a_map/images/32.png
   :align: center

33. Similarly add another label to add the data and software credits.

.. image:: /static/making_a_map/images/33.png
   :align: center

34. Once you are satisfied with the map, you can export it as Image, PDF or
    SVG. For this tutorial, let’s export it as an image. Click
    :menuselection:`Composer --> Export as Image`.

.. image:: /static/making_a_map/images/34.png
   :align: center

35. Save the image in the format of your liking. Below is the exported PNG
    image.

.. image:: /static/making_a_map/images/35.png
   :align: center
