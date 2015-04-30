Automating Map Creation with Print Composer Atlas
=================================================
.. only:: html

   [ Download PDF `A4 <../pdf/automating_map_creation_a4.pdf>`_ `Letter
   <../pdf/automating_map_creation_letter.pdf>`_ ]

If your organization publishes printed or online maps, you often would need to
create many maps with the same template - usually one for each adminitrative
unit or a region of interest. Creating these maps manually can take a long time
and if you want to update these on a regular basis, it can turn into a chore.
QGIS has a tool called ``Atlas`` that can help you create a map template and
easily publish a large number of maps for different geographic regions. If you
are not familiar with the basics of Print Composer, please go through the
:doc:`making_a_map` tutorial.


Overview of the task
--------------------

This tutorial shows how to create wetlands map for each county in the state of
Hawaii.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to use the ``Inverted Polygons`` style renderer to fill areas outside of
  polygons.
- How to use an expression in the ``Rule Based`` style renderer to show only
  the current feature in Atlas.
- Apply expressions to create dynamic labels in Print Composer.

Get the data
------------

We will use the `GIS Data Layers
<http://planning.hawaii.gov/gis/download-gis-data/>`_ from `State of Hawaii -
Office of Planning <http://planning.hawaii.gov/>`_

Download the `Wetlands
<http://files.hawaii.gov/dbedt/op/gis/data/HI_Wetlands.shp.zip>`_ layer from
Biologic and Ecologic category.

Download the `Census County Boundaries 2010
<http://files.hawaii.gov/dbedt/op/gis/data/county10.shp.zip>`_ layer from the
Cultural and Demographic category.

For convenience, you may directly download a copy of both the datasets from the links
below:

`HI_Wetlands.shp.zip <../../downloads/HI_Wetlands.shp.zip>`_

`county10.shp.zip <../../downloads/county10.shp.zip>`_

Data Source [HAWAII]_

Procedure
---------

1. Launch QGIS and go to :menuselection:`Layer --> Add Layer --> Add Vector
   Layer`.

.. image:: /static/automating_map_creation/images/1.png
   :align: center

2. Browse to the ``HI_Wetlands.shp.zip`` file and click :guilabel:`Open`.

.. image:: /static/automating_map_creation/images/2.png
   :align: center

3. Select the ``HI_Wetlands_Poly`` layer and click :guilabel:`OK`.

.. image:: /static/automating_map_creation/images/3.png
   :align: center

4. You will see the polygons representing the wetlands in the entire state of
   Hawaii. Since we want to make separate wetlands map for each county in the
   state, we will need the county boundaries layer. Go to :menuselection:`Layer
   --> Add Layer --> Add Vector Layer` and browse to the ``county10.shp.zip``
   file. Click :guilabel:`Open`.

.. image:: /static/automating_map_creation/images/4.png
   :align: center

5. Go to :menuselection:`Project --> New Print Composer`.

.. image:: /static/automating_map_creation/images/5.png
   :align: center

6. Leave the composer title field empty and click :guilabel:`OK`.

.. image:: /static/automating_map_creation/images/6.png
   :align: center

7. Go to :menuselection:`Layout --> Add Map`.

.. image:: /static/automating_map_creation/images/7.png
   :align: center

8. Drag a rectangle while holding the left mouse button where you would like to
   insert the map.

.. image:: /static/automating_map_creation/images/8.png
   :align: center

9. Scroll down in the :guilabel:`Item Properties` tab and check the
   :guilabel:`Controlled by atlas` box. This will indicate the composer that
   the extent of the map displayed in this item will be determined by the
   ``Atlas`` tool.

.. image:: /static/automating_map_creation/images/9.png
   :align: center

10. Swich to the :guilabel:`Atlas generation` tab. Check the
    :guilabel:`Generate an atlas` box. Select the ``county10`` as the
    :guilabel:`Coverage layer`. This will indicate that we want to create 1 map
    each for every polygon feature in the ``county10`` layer. You can also
    check the :guilabel:`Hidden coverage layer` so that the features themselves
    will not appear on the map.

.. image:: /static/automating_map_creation/images/10.png
   :align: center

11. You will notice that the map image does not change after configuring the
    Atlas settings. Go to :menuselection:`Atlas --> Preview Atlas`.

.. image:: /static/automating_map_creation/images/11.png
   :align: center

12. Now you will see the map refresh and show how individual map will look
    like. Notice that it shows the current feature number from the coverage
    layer at the bottom right.

.. image:: /static/automating_map_creation/images/12.png
   :align: center

13. You can preview how the map will look for each of the county polygons. Go
    to :menuselection:`Atlas --> Next Feature`.

.. image:: /static/automating_map_creation/images/13.png
   :align: center

14. Atlas will render the map to the extent of the next feature in the coverage
    layer.

.. image:: /static/automating_map_creation/images/14.png
   :align: center

15. Let's add a label to the map. Go to :menuselection:`Layout --> Add Label`.

.. image:: /static/automating_map_creation/images/15.png
   :align: center

16. Under the :guilabel:`Item properties` tab, click :guilabel:`Insert an
    expression...` button.

.. image:: /static/automating_map_creation/images/16.png
   :align: center

17. The label of the map can use the attributes from the coverage layer.he
    ``concat`` function is used to join multiple text items into a single text
    item. In this case we will join the value of the ``NAME10`` attribute of
    the ``county10`` layer with the text ``County of``. Add an expression like
    below and click :guilabel:`OK`.

.. code-block:: none

   concat('County of ', "NAME10")


18. Adjust the font size to your liking.

.. image:: /static/automating_map_creation/images/18.png
   :align: center

19. Add another label and enter ``Wetlands Map`` under the :guilabel:`Main
    properties`. Since there is no expression here, this text will remain hte
    same on all maps.

.. image:: /static/automating_map_creation/images/19.png
   :align: center

20. Go to :menuselection:`Atlas --> Last Feature` and verify that the map
    labels do work as intended. You will notice that the wetland map has
    polygons extending out in the ocean that looks ugly. We can change the
    style to that areas outside the county boundaries are hidden.

.. image:: /static/automating_map_creation/images/20.png
   :align: center


21. Switch to the main QGIS window. Right-click the ``county10`` layer and
    select :guilabel:`Properties`.

.. image:: /static/automating_map_creation/images/21.png
   :align: center

22. In the :guilabel:`Style` tab, select the :guilabel:`Inverted polygons`
    renderer. This renderer styles the `outside` of the polygon - not inside.
    Select white as the fill color and click :guilabel:`OK`.

.. image:: /static/automating_map_creation/images/22.png
   :align: center

23. Switch to the Print Composer window. If we want the effect of the inverted
    polygons to show, we need to uncheck the :guilabel:`Hidden coverage layer`
    box under :guilabel:`Atlas generation`. You will now see that the rendered
    image is clean and areas outside the coverage polygon is not visible.

.. image:: /static/automating_map_creation/images/23.png
   :align: center

24. There is one problem though. You can see areas of the map that are outside
    the coverage layer boundary but still visible. This is because Atlas
    doesn't automatically hide other features. This can be useful in some
    cases, but for our purpose, we only want to show wetlands of the county
    whose map is being generated. To fix this, switch back to the main QGIS
    window and right-click the ``county10`` layer and select
    :guilabel:`Properties`.

.. image:: /static/automating_map_creation/images/24.png
   :align: center

25. In the :guilabel:`Style` tab, select :guilabel:`Rule-based` renderer as the
    :guilabel:`Sub renderer`. Double-click the area under :guilabel:`Rule`.

.. image:: /static/automating_map_creation/images/25.png
   :align: center

26. Click the :guilabel:`...` button next to :guilabel:`Filter`.

.. image:: /static/automating_map_creation/images/26.png
   :align: center

27. In the :guilabel:`Expression string builder`, expand the :guilabel:`Atlas`
    group of functions. The ``$atlasfeatureid`` function will return the
    currently selected feature. We will construct an expression that will
    select only the currently selected Atlas feature. Enter the expression as
    below:

.. code-block:: none

   $id = $atlasfeatureid

.. image:: /static/automating_map_creation/images/27.png
   :align: center

28. Back in the Print Composer window, click the :guilabel:`Update preview`
    button under :guilabel:`Item properties` tab to see the changes. Notice
    that now only the area covering the county boundary is shown.

.. image:: /static/automating_map_creation/images/28.png
   :align: center

29. We will now add another dynamic label to show the current date. Go to
    :menuselection:`Layout --> Add Label` and select the area on the map. Click
    :guilabel:`Insert an expression` button.

.. image:: /static/automating_map_creation/images/29.png
   :align: center

30. Expand the :guilabel:`Date and Time` functions group and you will find the
    ``$now`` function. This holds the current system time. The function
    ``todate()`` will convert this to a date string. Enter the expression as
    below:

.. code-block:: none

   concat('Created on: ', todate($now))

.. image:: /static/automating_map_creation/images/30.png
   :align: center

31. Add another label citing the data source. You may also add other map
    elements such as a north arrow, scalebar etc. as described in
    :doc:`making_a_map` tutorial.

.. image:: /static/automating_map_creation/images/31.png
   :align: center

32. Once you are satisfied with the map layout, go to :menuselection:`Atlas -->
    Export Atlas as Images`.

.. image:: /static/automating_map_creation/images/32.png
   :align: center

33. Select a directory on your computer and click :guilabel:`Choose`.

.. image:: /static/automating_map_creation/images/33.png
   :align: center

34. The Atlas tool will now iterate through each feature in the coverage layer
    and create a separate map image based on the template we created. You can
    see the images in the directory once the process completes.

.. image:: /static/automating_map_creation/images/34.png
   :align: center

35. Here are the map images for refeence.

.. image:: /static/automating_map_creation/images/35_1.jpg
   :align: center

.. image:: /static/automating_map_creation/images/35_2.jpg
   :align: center

.. image:: /static/automating_map_creation/images/35_3.jpg
   :align: center

.. image:: /static/automating_map_creation/images/35_4.jpg
   :align: center

.. image:: /static/automating_map_creation/images/35_5.jpg
   :align: center
