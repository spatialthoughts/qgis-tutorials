Creating a Landuse Map (QGIS3)
=====================================

Zoning designations define and regulate what kinds of uses are allowed on specific parcels and outline design and development requirements and guidelines. In this tutorial you will learn how to access parcel datasets, style them according to zoning attributes and create a map.

Overview of the task
--------------------

You will work with a land parcels dataset with zoning information and create a map showing zoning pattern across the CBD region of Cape Town.

   .. image:: /static/3/creating_landuse_map/images/zoning_map.png
      :align: center

    
Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to access and download data from ArcGIS REST in QGIS.
- How to extract features from a layer that intersect a boundary layer.
- How to merge different sub-categories from Categorized renderer.

Get the data
------------

You can find the data for the tutorial from Cape Town Open Data Portal - https://odp-cctegis.opendata.arcgis.com. 
We will be importing data from the portal using ArcGIS REST server URL and will be preparing three layers mentioned below . 

1) Zoning layer: A polygon shapefile with zoning code and description for land parcels having a single zoning - clipped to the Cape Town CBD area. 
2) Split-zoning layer: A polygon shapefile with zoning code and description for land parcels having multiple zoning - with each polygon split into single zones polygons. 
3) Cape Town CDB Area: A polygon demarcating the Cape Town CBD area. 

Let's see the step wise to prepare the dataset for this tutorial.

1. Go to the Data Portal - https://odp-cctegis.opendata.arcgis.com/. We will search for the Cape Town CBD data in the search bar and click to browse further. 
	
   .. image:: /static/3/creating_landuse_map/images/db1.png
      :align: center

2. Click on :guilabel:`View Full Details` to explore services available to get the data.

    .. image:: /static/3/creating_landuse_map/images/db2.png
       :align: center
	 
3. Scroll down to find :guilabel:`View Data Source` and click on the it.

     .. image:: /static/3/creating_landuse_map/images/db3.png
        :align: center
	 
4. On the ArcGIS REST Services Directory , Go to :guilabel:`Home` and copy the URL of that page. The copied URL looks like - https://citymaps.capetown.gov.za/agsext1/rest/services.
	
    .. image:: /static/3/creating_landuse_map/images/db4.png
       :align: center
	   
5. Now, Open QGIS and go to :menuselection:`Open Data Source Manager`.

    .. image:: /static/3/creating_landuse_map/images/db5.png
       :align: center

6. The list of data sources is seen in the left panel. Scroll down to find :menuselection:`ArcGIS REST Server`. Click on :guilabel:`new` to create new server connection.

    .. image:: /static/3/creating_landuse_map/images/db6.png
       :align: center
	   
7. In the :guilabel:`Connection Details`, give the :guilabel:`Name` ``Cape Town Open Data Portal`` and paste the copied url as an input for :guilabel:`URL`.

    .. image:: /static/3/creating_landuse_map/images/db7.png 
       :align: center
	   
8. Click :guilabel:`Ok` and then :guilabel:`Connect` to see the data folders available in the server. 

    .. image:: /static/3/creating_landuse_map/images/db8.png 
       :align: center

9. Now we will search for all three layers required for the tutorial from the database. Firstly, we will open ``Cape Town CBD`` layer in the QGIS. Expand folders to browse to the layers. Full path to the layer is :menuselection:`Theme_Based --> Open_Data_Service --> Cape Town CBD`. Select the layer and click :guilabel:`Add`.
	
    .. image:: /static/3/creating_landuse_map/images/db9.png 
       :align: center
	   
10. Close the :menuselection:`Data Source Manager` to see the layer added to the QGIS. Click on :menuselection:`Zoom to Layer` to centre and display the layer on the canvas.

    .. image:: /static/3/creating_landuse_map/images/db10.png 
       :align: center
	   
11. Now, will add the ``Zoning`` layer using :guilabel:`Data Source Manager`.Connect to ``Cape Town Open Data Portal`` and browse to  ``Zoning`` layer. The full path is :menuselection:`Theme_Based --> Open_Data_Service_Zoning --> Zoning`. This is a very large layer, so make sure to check the box :guilabel:`Only request features overlapping the current view extent` to avoid loading all the features available in the layer. If you forget this, loading of the layer may take a long time. Click  :guilabel:`Add` to open in the QGIS.

    .. image:: /static/3/creating_landuse_map/images/db11.png 
       :align: center
	   
12. Similarly add ``Split_Zoning`` layer. The full path is - :menuselection:`Theme_Based --> Land_Parcel_Zoning --> Split Zoning`. 

    .. image:: /static/3/creating_landuse_map/images/db12.png 
       :align: center

13. We can see all three source layers are open in QGIS. We want to clip the ``Zoning`` and ``Split Zoning`` layers to the ``Cape Town CBD`` boundary layer. Firstly, let's save all three layers locally as shapefiles. Right click on the ``Cape Town CBD`` layer. Look for :guilabel:`Export` and click on :guilabel:`Save Features As`.

    .. image:: /static/3/creating_landuse_map/images/db13.png 
       :align: center

14. Set the format :guilabel:`ESRI Shapefile` and browse to the local folder where you want to save the shapefiles. We will save all the layers related to this tutorial in a single data folder. Save the layer as ``cbd``.  Keep all other options default and click :guilabel:`OK`. Similarly export other two layers as ``Zoning.shp`` and ``Split Zoning`` to the same folder.

    .. image:: /static/3/creating_landuse_map/images/db14.png 
       :align: center

15. Remove the layers loaded from server. Select all three layers, and click on :guilabel:`Remove Layer/Group` icon. We want to extract features from ``Zoning`` and ``Split Zoning`` layers intersecting with ``cbd`` boundary.

    .. image:: /static/3/creating_landuse_map/images/db15.png 
       :align: center

	   
16. Go to :menuselection:`Processing --> Toolbox` from the menubar.

    .. image:: /static/3/creating_landuse_map/images/db16.png 
       :align: center
	   
17. In the toolbax, search for :guilabel:`Intersection` algorithm and double-click to open.

    .. image:: /static/3/creating_landuse_map/images/db17.png 
       :align: center
	   
18. Select ``Zoning`` as :guilabel:`Input layer` and ``cbd`` as :guilabel:`Overlay layer`. Keep other options default and proceed to save output to file.

    .. image:: /static/3/creating_landuse_map/images/db18.png 
       :align: center
	   
19. Save the output layer as ``zoning_cbd`` in the data folder and click :guilabel:`Run`.

    .. image:: /static/3/creating_landuse_map/images/db19.png 
       :align: center
	   
20. Depending on your Processing settings, you will see some errors or warnings displayed in :guilabel:`Log` tab. The input layer has some invalid geometries and it is being skipped while running intersection. We will fix geometries of ``Zoning`` and ``Split Zoning`` layers before taking the intersection to extract all geometries.

    .. image:: /static/3/creating_landuse_map/images/db20.png 
       :align: center

21. Remove the intersection output from QGIS and data folder. Search for :menuselection:`Fix geometries` tool in the processing toolbox. Double-click to open. 

    .. image:: /static/3/creating_landuse_map/images/db21.png 
       :align: center
	   
22. Select ``Zoning`` as :guilabel:`Input layer`. Keep all the other inputs as default and save the output layer as ``zoning_fixed.shp`` in the data folder by clicking  :guilabel:`Save to File`. Click :guilabel:`Run`. Repeat the process for fixing geometries on ``Split Zoning`` layer and save the layer with fixed geometries as ``split_zoning_fixed.shp``. 

    .. image:: /static/3/creating_landuse_map/images/db22.png 
       :align: center
	   
23. Remove ``Zoning`` and ``Split Zoning`` layers. We will move ahead with extracting features from ``zoning_fixed`` and ``split_zoning_fixed`` layers which intersect ``cbd``. Search for :menuselection:`Intersection` from the processing toolbox and double-click to open.

    .. image:: /static/3/creating_landuse_map/images/db23.png 
       :align: center
	   
24.Select ``Zoning_fixed`` as :guilabel:`Input layer` and ``cbd`` as :guilabel:`Overlay layer` to perform intersection as described in steps 18 and 19. Save the output as ``zoning_cbd`` and repeat the same for ``split_zoning_fixed`` layer and save the output layer as ``split_zoning_cbd``.
    
    .. image:: /static/3/creating_landuse_map/images/db24.png 
       :align: center
	
	   
For convenience, you may directly download a copy of all three pre-processed layers from the links below:
 
`cbd.shp <https://www.qgistutorials.com/downloads/cbd.zip>`_

`zoning_cbd.shp <https://www.qgistutorials.com/downloads/zoning_cbd.zip>`_

`split_zoning_cbd.shp <https://www.qgistutorials.com/downloads/split_zoning_cbd.zip>`_



Procedure
---------

1. Open QGIS. Click :menuselection:`Open Data Source Manager` icon to add layers to work on for the tutorial.

  .. image:: /static/3/creating_landuse_map/images/1.png
     :align: center
	 
2. Switch to the :guilabel:`Vector` tab and use the browsing button to navigate to the folder where you have kept the processed shapefiles.

  .. image:: /static/3/creating_landuse_map/images/2.png
     :align: center
	 
3. Select ``cbd.shp``, ``zoning_cbd.shp`` and ``split_zoning_cbd.shp`` files and click :guilabel:`Open`.

  .. image:: /static/3/creating_landuse_map/images/3.png
     :align: center
	 
4. You will see all three file paths in the text box beside :guilabel:`Vector Dataset`. Click :guilabel:`Add` followed by :guilabel:`Close`.

  .. image:: /static/3/creating_landuse_map/images/4.png
     :align: center  
	 
5. As we work on the exercise, it is important to save our work. Go to :menuselection:`Project --> Save`. 

  .. image:: /static/3/creating_landuse_map/images/5.png
     :align: center
	 
6. Save the project to the data directory as landuse_map.qgz file. The QGIS Project file contains references to the data layers and saves styles, map templates etc.
 
  .. image:: /static/3/creating_landuse_map/images/6.png
     :align: center
	 
7. Select the ``zoning_cbd`` layer and click the :guilabel:`Open Attribute Table` button in the :menuselection:`Attributes` Toolbar. Note that the attribute ``INT_ZONE_C`` has the zoning codes and ``INT_ZONE_D`` has the zoning description. Close the attribute table.

  .. image:: /static/3/creating_landuse_map/images/7.png
     :align: center

8. Now let’s style the layer based on these attributes, so the parcels with the same zoning codes are styles in the same color. Click the :guilabel:`Open the Layer Styling panel` button in the Layers panel. Click the dropdown button next to :guilabel:`Single Symbol`.

  .. image:: /static/3/creating_landuse_map/images/8.png
     :align: center
	 
9. Select :guilabel:`Categorized` as the renderer. Select ``INT_ZONE_C`` as the Value. Click Classify.
	
    .. image:: /static/3/creating_landuse_map/images/9.png
       :align: center
	  
10. You will see a series of symbols appear. There is a different color symbol assigned for every unique code in the layer.
	
    .. image:: /static/3/creating_landuse_map/images/10.png
       :align: center
	   
11. Notice that each zoning category has sub-categories. The ``General Business (GB)`` category has further sub-divisions like ``GB1``, ``GB2``, and so on. For the purpose of this map, we can merge all the sub-categories to a single top-level category. Hold the Shift key and select all sub-categories. Right-click and select :guilabel:`Merge Categories`.

    .. image:: /static/3/creating_landuse_map/images/11.png
       :align: center
	   
12. Repeat the process for ``MU`` and ``TR`` categories. Once merged, we can now change the Legend label to be more descriptive. Click on the :guilabel:`Legend` label to rename a class.
	
    .. image:: /static/3/creating_landuse_map/images/12.png
       :align: center
	   
13. Enter descriptions of each zoning category based on the values given in the ``INR_ZONE_D`` column. As you enter those description, you will see the legend of the layer in the Layers panel also updates.

    .. image:: /static/3/creating_landuse_map/images/13.png
       :align: center

14. Now we can update the colors and symbology of each category. Click on the :guilabel:`Symbol` for a category.

    .. image:: /static/3/creating_landuse_map/images/14.png
       :align: center
	   
15. Change the :guilabel:`Fill color` and :guilabel:`Stroke color` of the symbol to a color of your choice.

    .. image:: /static/3/creating_landuse_map/images/15.png
       :align: center
	   
16. Repeat the process for each category. The last category is all other values. This category contains all parcels which have NULL values. This is because those parcels have multiple zoning categories attached to them and are represented in the split_zoning_cbd.shp layer. We do not need them in this layer. Select it and click the :guilabel:`-` icon to remove that category.

    .. image:: /static/3/creating_landuse_map/images/16.png
       :align: center
	   
17. Next, select the ``cbd`` layer. Change the symbol to :guilabel:`Simple Line` and increase the :guilabel:`Stroke width`.

    .. image:: /static/3/creating_landuse_map/images/17.png
       :align: center
	   
18. The ``split_zoning_cbd.shp`` layer contains all parcels that were missing zoning codes in the zoning_cbd layer. The attribute table and values for the zones in the ``split_zoning_cbd`` are the same as the ``zoning_cbd`` layer. Instead of configuring the symbology for this layer manually, we can copy/paste the styles. Select the zoning_cbd layer, right-click and select :menuselection:`Styles --> Copy Style --> Symbology`.

    .. image:: /static/3/creating_landuse_map/images/18.png
       :align: center
	   
19. Now select the newly added ``split_zoning_cbd`` layer, right-click and select :menuselection:`Styles --> Paste Style --> Symbology`.

    .. image:: /static/3/creating_landuse_map/images/19.png
       :align: center
	   
20. You will see the same symbology being applied to the polygons in the ``split_zoning_cbd`` layer. The styling and legend are complete now.

    .. image:: /static/3/creating_landuse_map/images/20.png
       :align: center
	   
21. We have our layers styled and legend labels created. Now let’s create a map using these styled layers along with map elements like, scale bar, north arrow, labels etc. QGIS comes with a :guilabel:`Print Layout` that allows composing maps. Go to :menuselection:`Project --> New Print Layout`. When prompted for a name, you can leave it blank and click :guilabel:`OK`.

    .. image:: /static/3/creating_landuse_map/images/21.png
       :align: center
	   
22. In the Print Layout window, you will see a canvas. Right-click and select :guilabel:`Page Properties`.

    .. image:: /static/3/creating_landuse_map/images/22.png
       :align: center
	   
23. Set the :guilabel:`Orientation` to ``Portrait``. Next, go to :menuselection:`Add Item --> Add Map`.

    .. image:: /static/3/creating_landuse_map/images/23.png
       :align: center
	  
24. Hold the left mouse button and draw a rectangle on the canvas. This is the map frame which will contain the map from the main QGIS window. In the :guilabel:`Item Properties` tab, use the :guilabel:`Interactively Edit Map Extent` icon to pan/zoom the content of the map frame.

    .. image:: /static/3/creating_landuse_map/images/24.png
       :align: center
	   
25. Scroll down in the Item Properties tab and check the :guilabel:`Frame` option. Expand it and select a :guilabel:`Color` for the frame border. You can also increase the :guilabel:`Thickness`.

    .. image:: /static/3/creating_landuse_map/images/25.png
       :align: center
	   
26. The map frame is now ready. Let’s add other elements. Go to :menuselection:`Add Item --> Add Legend`.

    .. image:: /static/3/creating_landuse_map/images/26.png
       :align: center
	   
27. Drag a rectangle where you want to place the legend. Once added, scroll down in the :guilabel:`Item Properties` tab and un-check the :guilabel:`Auto update` button so we can manually edit the legend items.

    .. image:: /static/3/creating_landuse_map/images/27.png
       :align: center
	   
28. We have 2 layers with identical legends, so we can remove one of them. Select the ``split_zoning_cbd`` layer and click the :guilabel:`Remove selected item(s) from legend` icon. Similarly remove ``cbd`` layer from the legend.

    .. image:: /static/3/creating_landuse_map/images/28.png
       :align: center
	   
29. Right-click the ``zoning_cbd`` layer and check the Hidden option.

    .. image:: /static/3/creating_landuse_map/images/29.png
       :align: center
	   
30. Scroll down and expand the :guilabel:`Columns` section. Check the :guilabel:`Split layers` option and increase the Count to 2.

    .. image:: /static/3/creating_landuse_map/images/30.png
       :align: center
	   
31. Scroll down further to the :guilabel:`Spacing` section. Adjust the spacing between different elements till the legend is clearly legible.

    .. image:: /static/3/creating_landuse_map/images/31.png
       :align: center
	   
32. You can change style and size of the fonts in legend from :guilabel:`Fonts and Text Formatting` properties. When done, go to :menuselection:`Add Item --> Add North Arrow`. Drag a rectangle where you want to place the element on the map.

    .. image:: /static/3/creating_landuse_map/images/32.png
       :align: center
	   
33. Pick a symbol of your choice. Scroll down and expand the :guilabel:`SVG Parameters`. Change the :guilabel:`Fill color` and :guilabel:`Stroke color` as per your choice.

    .. image:: /static/3/creating_landuse_map/images/33.png
       :align: center
	   
34. Now we will add a :guilabel:`Scale Bar`. Go to :menuselection:`Add Item --> Add Scale Bar`. Drag a rectangle where you want to place the element on the map. Adjust the :guilabel:`Style` and :guilabel:`Segments` parameters for the scale bar.

    .. image:: /static/3/creating_landuse_map/images/34.png
       :align: center
	   
35. Our map needs a title and other information labels. Go to :menuselection:`Add Item --> Add Label`.

    .. image:: /static/3/creating_landuse_map/images/35.png
       :align: center
	   
36. Enter a map title in the Main Properties section. Click the Font button under Appearance section to adjust the font size and style.

    .. image:: /static/3/creating_landuse_map/images/36.png
       :align: center
	   
37. Add other labels indicating the data source and your name. Lastly we will finish our map by adding a frame around the label block. Go to :menuselection:`Add Item --> Add Shape --> Add Rectangle`.

    .. image:: /static/3/creating_landuse_map/images/37.png
       :align: center
	   
38. Draw a rectangle. Click the symbol for :guilabel:`Style` and set the :guilabel:`Fill Color` to transparent and :guilabel:`Stroke color` to match other frames.

    .. image:: /static/3/creating_landuse_map/images/37.png
       :align: center
	   
39. Once you are satisfied with your composition, you can export the result. Go to :menuselection:`Layout --> Export as PDF`. Save the PDF in your data folder as ``capetown_zoning_map.pdf``.

    .. image:: /static/3/creating_landuse_map/images/39.png
       :align: center