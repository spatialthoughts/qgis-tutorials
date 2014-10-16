Making a Map
============
.. only:: html

   [ Download PDF `A4 <../pdf/making_a_map_a4.pdf>`_ `Letter <../pdf/making_a_map_letter.pdf>`_ ]

Often one needs to create a map that can be printed or published. QGIS has a powerful tool called :guilabel:`Print Composer` that allows you to take your GIS layers and package them to create maps. 

Overview of the task
--------------------

The tutorial shows how to create a map of Japan with standard map elements like north arrow, scale bar, legend and label.

Get the data
------------

We will use the Natural Earth dataset - specifically the Natural Earth Quick Start Kit that comes with beautifully styled global layers that can be loaded directly to QGIS.

Download the `Natural Earth Quickstart Kit <http://kelso.it/x/nequickstart>`_.

Data Source [NATURALEARTH]_

Procedure
---------

1. Download and extract the Natural Earth Quick Start Kit data. Open QGIS. Click on :menuselection:`File --> Open Project`.

.. image:: /static/making_a_map/images/1.png
   :align: center

2. Browse to the directory when you had extracted the natural earth data. You should see a file named :file:`Natural_Earth_quick_start_for_QGIS.qgs`. This is the project file that contains styled layers in QGIS Document format. Click :guilabel:`Open`.

.. image:: /static/making_a_map/images/2.png
   :align: center

3. You would see a lot of layers in the table of content and a styled world map in the QGIS canvas. If you see errors displayed at the top of the canvas, click on the cross to close it.

.. image:: /static/making_a_map/images/3.png
   :align: center

4. In this tutorial, we will make a map of Japan. Click the :guilabel:`Zoom In` button and draw a rectangle around Japan to zoom to the area. 

.. image:: /static/making_a_map/images/4.png
   :align: center

5. Before we make a map suitable for printing, we need to choose an appropriate
   projection. This dataset comes in Geographic Coordinate System (GCS) where
   the units are degrees. This is not appropriate for a map where you want the
   distances to be in kilometers or miles. We need to use a Projected Coordinate
   System that minimizes distortions for our region of interest and has units
   in meters. Universal Transverse Mercator (UTM) is a decent choice for a
   projected coordinate system. It is also global, so it's a good default that
   you can rely on and  choose a UTM zone that contains your area of interest
   to minimize distortions for your region. In our case, we will use UTM Zone
   54N. Click the :guilabel:`CRS Status` button at the bottom-right of the QGIS
   window.

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

7. Zoom and Pan to keep Japan at the center of your map canvas. At this point,
   you can check the box next to ``10m_admin_0_map_units`` layer to turn off
   the labels from that layer.

.. image:: /static/making_a_map/images/7.png
   :align: center

8. Once you are centered around the area of interest, click on the
   :guilabel:`New Print Composer` button. It is also accessible by
   :menuselection:`Project --> New Print Composer`.

.. image:: /static/making_a_map/images/8.png
   :align: center

9. You will be prompted to enter a title for the composer. Enter 'Japan map'
   and click :guilabel:`Ok`.

.. image:: /static/making_a_map/images/9.png
   :align: center


10. In the Print Composer window, click on :guilabel:`Zoom full` to display the
    full extent of the Layout.

.. image:: /static/making_a_map/images/10.png
   :align: center

11. Now we would have to bring the map view that we see in the QGIS Canvas to
    this layer. Click on the :guilabel:`Add Map` button. This tool can also be
    access from :menuselection:`Layout --> Add Map`.

.. image:: /static/making_a_map/images/11.png
   :align: center

12. Once the :guilabel:`Add Map` button is active, hold the left mouse button
    and drag a rectangle where you want to insert the map.

.. image:: /static/making_a_map/images/12.png
   :align: center

13. You will see that the rectangle window will be rendered with the map from
    the main QGIS canvas. Since we want our map to be covering the full extent
    of the layout, drag the corners of the rectangle to the edges.

.. image:: /static/making_a_map/images/13.png
   :align: center

14. The rendered map may not be covering the full extent of our interest area.
    Click the :guilabel:`Move item content` button to pan the map in the window
    and center it in the composer.

.. image:: /static/making_a_map/images/14.png
   :align: center

15. Let us adjust the zoom level for the given map. Click on the
    :guilabel:`Item Properties` tab and enter `5000000` for :guilabel:`Scale`
    value.

.. image:: /static/making_a_map/images/15.png
   :align: center

16. Now we will add a North Arrow to the map. Print Composer comes with a nice
    collection of map-related images - including many types of North Arrows.
    Click :menuselection:`Layout --> Add Image`.

.. image:: /static/making_a_map/images/16.png
   :align: center

17. Holding your left mouse button, draw a rectangle on the top-right corner of
    the map canvas. On the right-hand panel, click on the
    :guilabel:`Item Properties` tab and expand the
    :guilabel:`Search directories` section and select the North Arrow image of
    your liking.

.. image:: /static/making_a_map/images/17.png
   :align: center

18. Next, scroll down below and un-check the :guilabel:`Background` option.
    This will make the image transparent.

.. image:: /static/making_a_map/images/18.png
   :align: center

19. You can drag the North Arrow and move it around in the composer window to a
    suitable position.

.. image:: /static/making_a_map/images/19.png
   :align: center

20. Now we will add a scale bar. Click on
    :menuselection:`Layout --> Add Scalebar`.

.. image:: /static/making_a_map/images/20.png
   :align: center

21. Click on the layout where you want the scalebar to appear.
    From the :guilabel:`Item Properties` tab, choose the Style that fit your
    requirement. You should also set the transparency by un-cecking the
    :guilabel:`Background` option.

.. image:: /static/making_a_map/images/21.png
   :align: center

22. Now we will add a legend to the map. Click on
    :menuselection:`Layout --> Add Legend`.

.. image:: /static/making_a_map/images/22.png
   :align: center

23. Click on the layout where you want the legend to appear. Since our layer
    list is huge, you will see a big box with all the layers appear. Click on
    the :guilabel:`Item Properties` tab and select the layers which we do not
    want in the legend. Click the :guilabel:`-` button to remove it from the
    legend.

.. image:: /static/making_a_map/images/23.png
   :align: center

24. For the purpose of this map, we will keep legend information only for the
    five layers as seen below.

.. image:: /static/making_a_map/images/24.png
   :align: center

25. Click on the :guilabel:`Edit` button and change the display text for the
    legend items to be more readable.

.. image:: /static/making_a_map/images/25.png
   :align: center

26. Now time to label our map. Click on :menuselection:`Layout --> Add Label`.

.. image:: /static/making_a_map/images/26.png
   :align: center

27. Click on the map and draw a box where the label should be. In the
    :guilabel:`Item Properties` tab, expand the :guilabel:`Label` section and
    enter the text as shown below. We can enter the text as HTML as well.
    Check the box :guilabel:`Render as Html` so the composer will interpret the
    HTML tags.

.. code-block:: none

   <div align=center>
   <h1>Map of Japan</h1>
   <p>Created using Natural Earth data in QGIS</p>
   </div>

.. image:: /static/making_a_map/images/27.png
   :align: center

28. Once you are satisfied with the map, you can export it as Image, PDF or
    SVG. For this tutorial, let’s export it as an image. Click
    :menuselection:`Composer --> Export as Image`.

.. image:: /static/making_a_map/images/28.png
   :align: center

29. Save the image in the format of your liking. Below is the exported PNG
    image.

.. image:: /static/making_a_map/images/29.png
   :align: center
