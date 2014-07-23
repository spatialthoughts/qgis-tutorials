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

5. Once you are centered around the area of interest, click on the :guilabel:`New Print Composer` button. It is also accessible by :menuselection:`Project --> New Print Composer`. 

.. image:: /static/making_a_map/images/5.png
   :align: center

6. You will be prompted to enter a title for the composer. Enter 'Japan map' and click :guilabel:`Ok`.

.. image:: /static/making_a_map/images/6.png
   :align: center


7. In the Print Composer window, click on :guilabel:`Zoom full` to display the full extent of the Layout. 

.. image:: /static/making_a_map/images/7.png
   :align: center

8. Now we would have to bring the map view that we see in the QGIS Canvas to this layer. Click on the :guilabel:`Add Map` button. This tool can also be access from :menuselection:`Layout --> Add Map`.

.. image:: /static/making_a_map/images/8.png
   :align: center


9. Once the :guilabel:`Add Map` button is active, hold the left mouse button and drag a rectangle where you want to insert the map. 

.. image:: /static/making_a_map/images/9.png
   :align: center

10. You will see that the rectangle window will be rendered with the map from the main QGIS canvas. Since we want our map to be covering the full extent of the layout, drag the corners of the rectangle to the edges.

.. image:: /static/making_a_map/images/10.png
   :align: center

11. Let us adjust the zoom level for the given map. Click on the :guilabel:`Item Properties` tab and enter `3500000` for :guilabel:`Scale` value.

.. image:: /static/making_a_map/images/11.png
   :align: center


12. Now we will add a North Arrow to the map. Print Composer comes with a nice collection of map-related images - including many types of North Arrows. Click :menuselection:`Layout --> Add Image`.

.. image:: /static/making_a_map/images/12.png
   :align: center

13. Holding your left mouse button, draw a rectangle on the top-right corner of the map canvas. 

.. image:: /static/making_a_map/images/13.png
   :align: center

14. On the right-hand panel, click on the :guilabel:`Item Properties` tab and expand the :guilabel:`Search directories` section and select the North Arrow image of your liking. 

.. image:: /static/making_a_map/images/14.png
   :align: center

15. Next, scroll down below and un-check the :guilabel:`Background` option. This will make the image transparent.


.. image:: /static/making_a_map/images/15.png
   :align: center

16. Now we will add a scale bar. Click on :menuselection:`Layout --> Add Scalebar`.  

.. image:: /static/making_a_map/images/16.png
   :align: center

17. Click on the layout where you want the scalebar to appear. From the :guilabel:`Item Properties` tab, choose the Style that fit your requirement.  Also change the units to be :guilabel:`Map units` and label it 'Degree' since the map units are degrees. You should also set the transparency by un-cecking the :guilabel:`Background` option.

.. image:: /static/making_a_map/images/17.png
   :align: center


18. Now we will add a legend to the map. Click on :menuselection:`Layout --> Add Legend`.

.. image:: /static/making_a_map/images/18.png
   :align: center

19. Click on the layout where you want the legend to appear. Since our layer list is huge, you will see a big box with all the layers appear.

.. image:: /static/making_a_map/images/19.png
   :align: center

20. Click on the :guilabel:`Item Properties` tab and select the layers which we do not want in the legend. Click the :guilabel:`-` button to remove it from the legend.

.. image:: /static/making_a_map/images/20.png
   :align: center

21. For the purpose of this map, we will keep legend information only for the five layers as seen below. Click on the :guilabel:`Edit` button and change the display text for the legend items to be more readable. 

.. image:: /static/making_a_map/images/21.png
   :align: center

22. Now time to label our map. Click on :menuselection:`Layout --> Add Label`.

.. image:: /static/making_a_map/images/22.png
   :align: center

23. Click on the map and draw a box where the label should be. In the :guilabel:`Item Properties` tab, expand the :guilabel:`Label` section and enter the text. We can enter the text as HTML as well. Check the box :guilabel:`Render as Html` so the composer will interpret the HTML tags.

.. image:: /static/making_a_map/images/23.png
   :align: center

24. Once you are satisfied with the map, you can export it as Image, PDF or SVG. For this tutorial, let’s export it as an image.

.. image:: /static/making_a_map/images/24.png
   :align: center

25. Save the image in the format of your liking. Below is the exported PNG image.

.. image:: /static/making_a_map/images/25.png
   :align: center
