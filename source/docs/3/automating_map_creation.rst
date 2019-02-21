Automating Map Creation with Print Composer Atlas (QGIS3)
=========================================================
If your organization publishes printed or online maps, you often would need to
create many maps with the same template - usually one for each administrative
unit or a region of interest. Creating these maps manually can take a long time
and if you want to update these on a regular basis, it can turn into a chore.
QGIS has a tool called ``Atlas`` that can help you create a map template and
easily publish a large number of maps for different geographic regions. If you
are not familiar with the basics of Print Composer, please go through the
:doc:`../making_a_map` tutorial.

Overview of the task
--------------------

This tutorial shows how to create wetlands map for each county in the state of
Hawaii.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to use the ``Inverted Polygons`` style renderer to fill areas outside of polygons.
- How to use an expression in the ``Rule Based`` style renderer to show only
  the current feature in Atlas.
- Apply expressions to create dynamic labels in Print Composer.
- How to use ``Shapeburst fill`` style renderer to create a dual-tone polygon fill.

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

`HI_Wetlands.shp.zip <http://www.qgistutorials.com/downloads/HI_Wetlands.shp.zip>`_

`county10.shp.zip <http://www.qgistutorials.com/downloads/county10.shp.zip>`_

Data Source [HAWAII]_

Procedure
---------

1. Locate the ``HI_Wetlands.shp.zip`` file in the QGIS Browser and expand it. Select the ``HI_Wetlands_Poly.shp`` file and drag it to the canvas. This layer contains polygons representing wetlands in the entire state of Hawaii.

.. image:: /static/3/automating_map_creation/images/1.png
   :align: center

2. Since we want to make separate wetlands map for each county in the state, we will need the county boundaries layer. Browse to the ``county10.shp.zip`` file and expand it. Select the ``county10.shp`` file and drag it to the canvas.

.. image:: /static/3/automating_map_creation/images/2.png
   :align: center

3. Turn off the visibility of the ``HI_Wetlands_Poly`` layer temporarily. You will see the polygons from the ``county10`` layer clearly now. There are 5 features contained in this layer, with each feature having 1 or more polygons associated with it. The features represent 5 counties. We will use this layer as the coverage layer and configure QGIS to create 5 separate maps - one for each feature - automatically.

.. image:: /static/3/automating_map_creation/images/3.png
   :align: center

4. Turn on the visibility of the ``HI_Wetlands_Poly`` layer. Go to :menuselection:`Project --> New Print Layout..`.

.. image:: /static/3/automating_map_creation/images/4.png
   :align: center


5. Leave the print layout title empty and click :guilabel:`OK`.

.. image:: /static/3/automating_map_creation/images/5.png
   :align: center

6. In the :guilabel:`Print Layout` window, go to :menuselection:`Layout --> Add Map`.

.. image:: /static/3/automating_map_creation/images/6.png
   :align: center

7. Drag a rectangle while holding the left mouse button where you would like to insert the map.

.. image:: /static/3/automating_map_creation/images/7.png
   :align: center

8. In QGIS3, the :guilabel:`Atlas` tab is not visible by default. Select :menuselection:`View --> Panels --> Atlas`.

.. image:: /static/3/automating_map_creation/images/8.png
   :align: center

9. Switch to the :guilabel:`Atlas` tab. Check the :guilabel:`Generate an atlas` box.

.. image:: /static/3/automating_map_creation/images/9.png
   :align: center

10. Select the ``county10`` as the :guilabel:`Coverage layer`. This will indicate that we want to create 1 map each for every polygon feature in the ``county10`` layer. You can also check the :guilabel:`Hidden coverage layer` so that the features themselves will not appear on the map.

.. image:: /static/3/automating_map_creation/images/10.png
   :align: center
		
11. Switch to the :guilabel:`Item Properties` tab. Scroll down and check the :guilabel:`Controlled by atlas` box. This will indicate the layout that the content of the map displayed in this item will be determined by the ``Atlas`` tool.

.. note:: 

  You must enable the :guilabel:`Generare an atlas` box in the :guilabel:`Atlas` tab, otherwise the :guilabel:`Controlled by atlas` checkbox will be diasbled.

.. image:: /static/3/automating_map_creation/images/11.png
   :align: center


12. Now that you have configuring the Atlas settings, go to :menuselection:`Atlas --> Preview Atlas`.

.. image:: /static/3/automating_map_creation/images/12.png
   :align: center

13. You will see the map refresh and show how individual map will look like. You can preview how the map will look for each of the county polygons. Go to :menuselection:`Atlas --> Next Feature`. Atlas will render the map to the extent of the next feature in the coverage layer.

.. image:: /static/3/automating_map_creation/images/13.png
   :align: center

14. Let's add a label to the map. Go to :menuselection:`Layout --> Add Label`.

.. image:: /static/3/automating_map_creation/images/14.png
   :align: center

15. Under the :guilabel:`Item properties` tab, locate the :guilabel:`Main properties` section and click :guilabel:`Insert an Expression...` button.

.. image:: /static/3/automating_map_creation/images/15.png
   :align: center

16. The label of the map can use the attributes from the coverage layer. The ``concat`` function is used to join multiple text items into a single text item. In this case we will join the value of the ``NAME10`` attribute of the ``county10`` layer with the text ``County of``. Add an expression like below and click :guilabel:`OK`.

.. code-block:: none

   concat('County of ', "NAME10")

.. image:: /static/3/automating_map_creation/images/16.png
   :align: center

17. Delete the leading *Lorem ipsum* placeholder text so that the textbox contains only the expression. Scroll down to the :guilabel:`Appearance` section and click on the :guilabel:`Font` dropdown. Choose the font and adjust the size to your liking.

.. image:: /static/3/automating_map_creation/images/17.png
   :align: center

18. Choose ``Center`` as the :guilabel:`Horizontal alignment` and ``Middle`` as the :guilabel:`Vertical alignment` option. 

.. image:: /static/3/automating_map_creation/images/18.png
   :align: center

19. Add another label and enter ``Wetlands Map`` under the :guilabel:`Main properties`. Since there is no expression here, this text will remain the same on all maps.

.. image:: /static/3/automating_map_creation/images/19.png
   :align: center

20. Go to :menuselection:`Atlas --> Last Feature` and verify that the map labels do work as intended. You will notice that the wetland map has polygons extending out in the ocean that looks ugly. We can change the style to that areas outside the county boundaries are hidden.

.. image:: /static/3/automating_map_creation/images/20.png
   :align: center

21. Switch to the main QGIS window. Right-click the ``county10`` layer and select :guilabel:`Properties`.

.. image:: /static/3/automating_map_creation/images/21.png
   :align: center

22. In the :guilabel:`Symbology` tab, select the :guilabel:`Inverted polygons` renderer. This renderer styles the *outside* of the polygon - not inside. Select white as the fill color and click :guilabel:`OK`.

.. image:: /static/3/automating_map_creation/images/22.png
   :align: center

23. You will notice that the polygons extending outside of the county boundaries are now disappeared. In reality, they are hidden by the white color fill extending out from the county polygons because of the *Inverted polygons* style. 

.. image:: /static/3/automating_map_creation/images/23.png
	:align: center

24. Switch to the :guilabel:`Layout` window. If we want the effect of the inverted polygons to show, we need to uncheck the :guilabel:`Hidden coverage layer` box under :guilabel:`Atlas` tab. Once unchecked, the rendered image will appear clean and areas outside the coverage polygon is not visible.

.. image:: /static/3/automating_map_creation/images/24.png
   :align: center

25. There is one more problem though. You will notice that in some cases, parts of the map that are outside the coverage layer boundary are still visible. This is because Atlas doesn't automatically hide other features. This can be useful in some cases, but for our purpose, we only want to show wetlands of the county whose map is being generated. To fix this, switch back to the main QGIS window and right-click the ``county10`` layer and select :guilabel:`Properties`.

.. image:: /static/3/automating_map_creation/images/25.png
   :align: center

26. In the :guilabel:`Symbology` tab, select ``Rule-based`` as the :guilabel:`Sub renderer`. Double-click the area under :guilabel:`Rule`.

.. image:: /static/3/automating_map_creation/images/26.png
   :align: center

27. In the :guilabel:`Edit rule` dialog, click the :guilabel:`Expression` button next to :guilabel:`Filter`.

.. image:: /static/3/automating_map_creation/images/27.png
   :align: center

28. In the :guilabel:`Expression string builder`, expand the :guilabel:`Variables` group of functions. The ``@atlas_featureid`` variable stores the id of the the currently selected feature. We will construct an expression that will select only the currently selected Atlas feature. Enter the expression as below and click :guilabel:`OK`.

.. code-block:: none

   $id = @atlas_featureid

.. image:: /static/3/automating_map_creation/images/28.png
   :align: center

29. Close all intermediate dialogs and switch back to the :guilabel:`Layout` window. Select :guilabel:`Map 1` item and click the :guilabel:`Update preview` button under :guilabel:`Item properties` tab to see the changes. Notice that now only the area covering the county boundary is shown.

.. note:: 
   If you do not see the :guilabel:`Update preview` button, it may help to select another :guilabel:`Item` element first and then select :guilabel:`Map 1` again.
	 
.. image:: /static/3/automating_map_creation/images/29.png
   :align: center

30. We will now add another dynamic label to show the current date. Go to :menuselection:`Layout --> Add Label` and select the area on the map. Click :guilabel:`Insert an expression` button.

.. image:: /static/3/automating_map_creation/images/30.png
   :align: center

31. Expand the :guilabel:`Date and Time` functions group and you will find the ``$now`` function. This holds the current system time. The function ``todate()`` will convert this to a date string. Enter the expression as below and click :guilabel:`OK`.

.. code-block:: none

   concat('Created on: ', todate($now))

.. image:: /static/3/automating_map_creation/images/31.png
   :align: center

32. Add another label citing the data source. You may also add other map elements such as a north arrow, scalebar etc. as described in :doc:`../making_a_map` tutorial.

.. image:: /static/3/automating_map_creation/images/32.png
   :align: center

33. We will make one last styling improvement. Switch back to the main QGIS window and right-click the ``HI_Wetlands_Poly`` layer and select :guilabel:`Properties`.

.. image:: /static/3/automating_map_creation/images/33.png
   :align: center

34. In the :guilabel:`Symbology` tab, click on :guilabel:`Sinple fill` and select ``Shapeburst fill`` as the :guilabel:`Symbol layer type`. Choose the :guilabel:`Two color` option and select shades of green and blue that you like. Click :guilabel:`OK`.

.. image:: /static/3/automating_map_creation/images/34.png
   :align: center

35. Select :guilabel:`Map 1` item and click the :guilabel:`Update preview` button under :guilabel:`Item properties` tab to see the changes.

.. image:: /static/3/automating_map_creation/images/35.png
   :align: center

36. Once you are satisfied with the map layout and styling, go to :menuselection:`Atlas --> Export Atlas as Images`.

.. image:: /static/3/automating_map_creation/images/36.png
   :align: center

37. Select a directory on your computer and click :guilabel:`Choose`.

.. image:: /static/3/automating_map_creation/images/37.png
   :align: center

38. Leave the default options in the :guilabel:`Image Export Options` and click :guilabel:`Save`.

.. image:: /static/3/automating_map_creation/images/38.png
   :align: center

39. The Atlas tool will now iterate through each feature in the coverage layer and create a separate map image based on the template we created. You can see the images in the directory once the process completes.

.. image:: /static/3/automating_map_creation/images/39.png
   :align: center

40. Here are the map images for refeence.

.. image:: /static/3/automating_map_creation/images/output_1.png
   :align: center

.. image:: /static/3/automating_map_creation/images/output_2.png
   :align: center

.. image:: /static/3/automating_map_creation/images/output_3.png
   :align: center

.. image:: /static/3/automating_map_creation/images/output_4.png
   :align: center

.. image:: /static/3/automating_map_creation/images/output_5.png
   :align: center
