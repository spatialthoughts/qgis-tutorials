Batch Processing using Processing Framework (QGIS3)
===================================================
The *Processing Framework* in QGIS provides an environment within
QGIS to run native and third-party algorithms for processing data. It contains
a nice batch processing interface that allows one to execute an algorithm on
several layers easily. Batch processing is a useful tool that can save manual
effort and help you automate repetitive tasks.

Overview of the task
--------------------

We will take several global vector layers and clip them to the extent of Africa
in a single batch command.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Create a **Filter** to remove unwanted features from a layer without creating a new layer.
- Merge multiple layers into a single Geopackage file.

Get the data
------------

`Natural Earth <http://naturalearthdata.com>`_ has several global vector
layers. Download the following layers

- `Admin 0 - Countries
  <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_
- `Railroads
  <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_railroads.zip>`_
- `Ports
  <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_ports.zip>`_
- `Urban Areas
  <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_urban_areas.zip>`_


For convenience, you may directly download a geopackage containing the above layers from below:

`ne_global.gpkg <https://www.qgistutorials.com/downloads/ne_global.gpkg>`_

Data Source: [NATURALEARTH]_

Procedure
---------

1. In the QGIS Browser Panel, locate the directory where you saved your downloaded data. Expand the ``zip`` or the ``gpkg``  entry and select the ``ne_10m_admin_0_countries`` layer. Drag the layer to the canvas.
	
.. image:: /static/3/batch_processing/images/1.png
   :align: center

2. You will see the layer loaded in the Layers panel. As our task is to clip the global layers to the boundary of Africa, we need to first prepare a layer containg features only from that continent. Let's look at the attribute table to see what column can be used to query features belonging to a particular continent. Right-click the ``ne_10m_admin_0_countries`` layer and select :guilabel:`Open Attribute Table`.

.. note::
	
	Tip: You can also use the keyboard shortcut :kbd:`F6` to open the attribute table of the selected layer.
	
.. image:: /static/3/batch_processing/images/2.png
   :align: center

3. In the :guilabel:`Attribute Table` window, as you scroll horizontally, you will see that the data contains an attribute called **CONTINENT**. We can use this attribute to filter features.
	
.. image:: /static/3/batch_processing/images/3.png
   :align: center
	 
4. Close the attribute table and return to the main QGIS window. Right-click the ``ne_10m_admin_0_countries`` layer and select :guilabel:`Filter`.

.. image:: /static/3/batch_processing/images/4.png
   :align: center

5. In the :guilabel:`Query Builder` window, select the **CONTINENT** field and click :guilabel:`Sample`. This will populate the :guilabel:`Values` panel with the a subset of values of that attribute from features. This step is useful to get an understanding of what type of values are present in your dataset. We can see that our dataset contains a value called **Africa** among others.

.. image:: /static/3/batch_processing/images/5.png
   :align: center

6. Now enter the expression in the :guilabel:`Provider specific filter expression` textbox. You can click the **CONTINENT** label, followed by :guilabel:`=` button and **Africa** label. Or you can type the following expression in the textbox. Click :guilabel:`OK` after entering the expression.

.. code-block:: none

   "CONTINENT" = 'Africa'

.. image:: /static/3/batch_processing/images/6.png
   :align: center

7. You will see that the map canvas now contains only the countries from Africa. Note the filter icon next to the layer name indicating that that layer a filter applied to it. If you wanted to see and use all the features from the layer, you can click the filter icon and clear the expression. For now, we will keep the filter so we can clip other layers to Africa. 

.. image:: /static/3/batch_processing/images/7.png
   :align: center

8. We are now ready to run the batch process to clip the layers. Locate the natural earth global layers ``ne_10m_railroads``, ``ne_10m_ports`` and ``ne_10m_urban_areas`` in the :guilabel:`QGIS Browser` panel. Hold the :kbd:`Ctrl` key and click each layer to select them. Once selected, drag them to the canvas.

.. image:: /static/3/batch_processing/images/8.png
   :align: center

9. Once the layers are loaded, you will notice that they are global layers and have features spanning all the countries.  Now, it's time to start our batch clip process to clip these layers to Africa. Open :menuselection:`Processing --> Toolbox`.

.. image:: /static/3/batch_processing/images/9.png
   :align: center

10. Browse all available algorithms and find the :guilabel:`Clip` tool from :menuselection:`Vector overlay --> Clip`. You may also use the :guilabel:`Search` box to easily find the algorithm as well.

.. image:: /static/3/batch_processing/images/10.png
   :align: center

11. Right-click the :guilabel:`Clip` algorithm and select :guilabel:`Execute as Batch Process`.

.. image:: /static/3/batch_processing/images/11.png
   :align: center


12. In the :guilabel:`Batch Processing` dialog, the first tab is :guilabel:`Parameters` where we define our inputs. Each row in the table represents 1 processing task. Click :guilabel:`Add row` button to add a new row. As our task involves 3 layers, add 3 rows. 

.. image:: /static/3/batch_processing/images/12.png
   :align: center

13. Click the :guilabel:`...` next to the first row in the :guilabel:`Input layers` column. Select :guilabel:`Select from Open Layers`.

.. image:: /static/3/batch_processing/images/13.png
   :align: center

14. In the :guilabel:`Multiple selection` dialog, check the 3 layers that we want to clip and click :guilabel:`OK`.

.. image:: /static/3/batch_processing/images/14.png
   :align: center

15. You will notice that the :guilabel:`Input layer` columns will be auto-populated with all layers you had selected. Next, we need to select the layer containing the boundary to clip our input layers. Click the :guilabel:`...` button for the first row under :guilabel:`Overlay layer` column and select :guilabel:`Select form Open Layers`.

.. image:: /static/3/batch_processing/images/15.png
   :align: center

16. In the :guilabel:`Multiple selection` dialog, check ``ne_10m_admin_0_countries`` and click :guilabel:`OK`.

.. image:: /static/3/batch_processing/images/16.png
   :align: center

17. Since the clip layer is the same for all our inputs, a handy shortcut is to double-click the column header :guilabel:`Overlay layer` and the same layer will be auto-filled for all the rows. 

.. image:: /static/3/batch_processing/images/17.png
   :align: center

18. Next, we need to define our outputs.  Click the :guilabel:`...` buton next to the first row in the :guilabel:`Clipped` column.

.. image:: /static/3/batch_processing/images/18.png
   :align: center

19. Browse the the directory where you want your output layers. Type the filename as ``clipped_`` and click :guilabel:`Save`.

.. image:: /static/3/batch_processing/images/19.png
   :align: center

20. You will see a new :guilabel:`Autofill settings` dialog pop up. Select ``Fill with parameter values`` as the :guilabel:`Autofill mode`. Select ``Input layer`` as the :guilabel:`Parameter to use`. This setting will add the input file name to the output along with the specified ``clipped_`` filename. This is important to ensure all the output files have unique names and they do not overwrite each other.

.. image:: /static/3/batch_processing/images/20.png
   :align: center
	 
21. Now we are ready to start the batch procesing. Make sure to check :guilabel:`Load layers on completion` and click :guilabel:`Run`.

.. image:: /static/3/batch_processing/images/21.png
   :align: center

22. The clip algorithm will run for each of the inputs and create output files as we have specified. Once the batch process finishes, click :guilabel:`Close` to return to QGIS.

.. note::

	Tip: QGIS can now run Processing tasks in the background without blocking the user interface. So if your batch process is taking long, you can close the dialog and continue to work on other tasks in QGIS while the process keeps running in the background.

.. image:: /static/3/batch_processing/images/22.png
   :align: center

23. Back in the main QGIS window, you will see the layers added to QGIS canvas. As you will notice, all the global layers are properly clipped to the continent boundary that we had specified.

.. image:: /static/3/batch_processing/images/23.png
   :align: center

24. We have accomplished the task of clipping multiple layers in a batch. But QGIS3 has another handy feature that will help you save and deliver the result in a more efficient way. If you wanted to deliver the clipped layers to someone, you would zip the individual files outside of QGIS. A better option is to package the output layers in a single Geopackage. In the :guilabel:`QGIS Browser`, locate the clipped output layers. You may have to click the :guilabel:`Refresh` button to see the newly added files. 

.. image:: /static/3/batch_processing/images/24.png
   :align: center

25. Hold :kbd:`Ctrl` key and select the layers. Drag them to the canvas to load them in QGIS.

.. image:: /static/3/batch_processing/images/25.png
   :align: center

25. In :guilabel:`Processing Toolbox`, locate the :menuselection:`Database --> Package layers` tool. 

.. image:: /static/3/batch_processing/images/26.png
   :align: center

27. In the :guilabel:`Package layers` dialog, click the :guilabel:`...` button next to :guilabel:`Input layers`.

.. image:: /static/3/batch_processing/images/27.png
   :align: center

28. In the :guilabel:`Multiple selection` dialog, check the ``clipped_ne_10m_ports``, ``clipped_ne_10m_railroads`` and ``clipped_ne_10m_urban_areas`` layers. Click :guilabel:`OK`.

.. image:: /static/3/batch_processing/images/28.png
   :align: center

29. Once the input layers are selected, click the :guilabel:`...` next to :guilabel:`Destination Geopackage` and choose :guilabel:`Save To File`.

.. image:: /static/3/batch_processing/images/29.png
   :align: center

30. Enter the output file name as ``clipped_layers``.

.. image:: /static/3/batch_processing/images/30.png
   :align: center

31. Click :guilabel:`Run` to start the packaging process.

.. image:: /static/3/batch_processing/images/31.png
   :align: center

32. Once the process finishes, you will see a new geopackage file in your :guilabel:`QGIS Browser` containing all the clipped output layers. This is a single file on your computer that contains all the output layers. 

.. image:: /static/3/batch_processing/images/32.png
   :align: center