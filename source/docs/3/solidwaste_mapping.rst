Mapping Waste Disposal Volumes (QGIS3)
=====================================

This tutorial is designed to help you discover new mapping techniques and cartographic tools available in QGIS. 

Overview of the task
--------------------

You will learn how to take point data of landfills and create a proportional-symbol map showing amount of waste processed at each landfill.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Importing ArcGIS server data in QGIS using REST URL.
- Importing tabular data from spreadsheets in QGIS.

Get the data
------------

You can find the data for the tutorial from Cape Town Open Data Portal - https://odp-cctegis.opendata.arcgis.com. 
We will be importing data from the portal using ArcGIS Online REST service and will be preparing three layers mentioned below . 

1) Wards: A polygon shapefile with ward boundaries of Cape Town. 
2) Landfill Sites: A point shapefile with current, closed and proposed waste processing facilities in Cape Town. 
3) Waste Disposal Data: A spreadsheet with amount of waste entering City disposal facilities. 

Let's see the step wise to prepare the dataset for this tutorial.

1. Go to the Data Portal - https://odp-cctegis.opendata.arcgis.com/search?tags=. We will search for the ``Wards`` data in the search bar and click to browse further. 
	
   .. image:: /static/3/solidwaste_mapping/images/db1.png
      :align: center

2. Click on :guilabel:`View Full Details` to explore services available to get the data.

    .. image:: /static/3/solidwaste_mapping/images/db2.png
       :align: center
	 
3. Scroll down to find :guilabel:`View Data Source` open and click on the it.

     .. image:: /static/3/solidwaste_mapping/images/db3.png
        :align: center
	 
4. On the ArcGIS REST Services Directory , Go to :guilabel:`Home` and copy the URL of that page. The copied looks like - https://citymaps.capetown.gov.za/agsext1/rest/services.
	
    .. image:: /static/3/solidwaste_mapping/images/db4.png
       :align: center
	   
5. Now, Open QGIS and go to :menuselection:`Open Data Source Manager`.

    .. image:: /static/3/solidwaste_mapping/images/db5.png
       :align: center

6. The list of data sources is seen in the left panel. Scroll down to find :menuselection:`ArcGIS REST Server`. Click on :guilabel:`new` to create new server connection.

    .. image:: /static/3/solidwaste_mapping/images/db6.png
       :align: center
	   
7. In the :guilabel:`Connection Details`, give the :guilabel:`Name` ``Cape Town Open Data Portal`` and paste the copied url as an input for  for :guilabel:`URL`.

    .. image:: /static/3/solidwaste_mapping/images/db7.png 
       :align: center
	   
8. Click :guilabel:`Ok` and then :guilabel:`Connect` to see the data folders available in the server. 

    .. image:: /static/3/solidwaste_mapping/images/db8.png 
       :align: center

9. Now we will search for all three layers required for the tutorial from the database. Firstly, we will open ``Wards`` layer in the QGIS. Expand folders to browse to the layers. Full path to the layer is - :menuselection:`Theme_Based --> Open_Data_Service --> Ward`. Select the layer and click :guilabel:`Add`.
	
    .. image:: /static/3/solidwaste_mapping/images/db9.png 
       :align: center
	   
10. Let's open ``Landfill sites`` in qgis. Full path to the layer is :menuselection:`Theme_Based --> Open_Data_Service --> Landfill Sites And Refuse Transfer Stations`. Select the layer and click :guilabel:`Add`.

    .. image:: /static/3/solidwaste_mapping/images/db10.png 
       :align: center
	   
11. Now we will search for the ``Waste Disposal`` spreadsheet on the data portal. Click on the ``Waste Disposal`` data link to download the file.

    .. image:: /static/3/solidwaste_mapping/images/db11.png 
       :align: center
	   
12. The file named ``Waste Disposal September 2023.ods`` will be downloaded after clicking on the link. Open the file. The file contains 4 sheets out of which we will be using ``Disposal_per_Site`` data for the tutorial.

    .. image:: /static/3/solidwaste_mapping/images/db12.png 
       :align: center
	   
13. We will keep only the total disposal per site. Add a new sheet named ``Disposal_per_Site_edited`` and copy the data from ``Disposal_per_Site`` sheet. Edit the site names by removing the brackets to match the attributes of  ``Landfill sites`` data. The values are formatted numbers, change it to simple decimals. Save it as ``waste_disposal_september2023.ods`` in a data folder for this tutorial.

    .. image:: /static/3/solidwaste_mapping/images/db13.png 
       :align: center
	   
14. Observe that there are 3 different sites for ``Bellville`` and disposal value is zero for two of them. Let's combine it to keep the only ``Bellville`` site with the ``non-zero`` value.

    .. image:: /static/3/solidwaste_mapping/images/db14.png 
       :align: center

15. Switch to QGIS. We have already imported the shapefiles from ArcGIS server. Let's save it in the local data folder for this tutorial. Right-click on the ``Landfill Sites And Refuse Transfer Stations`` layer. Go to :menuselection:`Export --> Save Features As`. 

    .. image:: /static/3/solidwaste_mapping/images/db15.png 
       :align: center
	   
16. In the :guilabel:`Save Vector Layer as` dialog, navigate to the data folder and save the shapefile as ``landfill_sites.shp``. Click :guilabel:`OK`.

    .. image:: /static/3/solidwaste_mapping/images/db16.png 
       :align: center
	   
17. Similarly, save the ``ward`` layer as ``wards.shp`` in the data folder. Now we have prepared the data folder with all three layer and ready to start with the procedure.

    .. image:: /static/3/solidwaste_mapping/images/db17.png 
       :align: center
	   
	   
For convenience, you may directly download a copy of these files below:
 
`Wards.shp <https://www.qgistutorials.com/downloads/Wards.zip>`_

`landfill_sites.shp <https://www.qgistutorials.com/downloads/landfill_sites.zip>`_

`waste_disposal_september2023.ods <https://www.qgistutorials.com/downloads/waste_disposal_september2023.ods>`_


Procedure
---------
	   
1. Open QGIS. Click :menuselection:`Open Data Source Manager` icon to add  the layer.

   .. image:: /static/3/solidwaste_mapping/images/1.png
      :align: center
	  
2. Switch to :guilabel:`Vector` tab and navigate to the data folder and select ``wards.shp`` and ``landfill_sites.shp`` files. Click :guilabel:`Add`.

   .. image:: /static/3/solidwaste_mapping/images/2.png
      :align: center
	  
3. Open the Attribute Table of the ``landfill_sites`` layer. This layer contains all solid waste collection sites in Cape Town. You can see that the ``STATUS`` attribute contains whether the facilities are operational or not. We can use the values in this column to select only the Current facilities.

   .. image:: /static/3/solidwaste_mapping/images/3.png
      :align: center
	  
4. Right-click the ``landfill_sites`` layer and select :guilabel:`Filter`.

   .. image:: /static/3/solidwaste_mapping/images/4.png
      :align: center
	  
5. In the :guilabel:`Query Builder`, enter the following expression and click :guilabel:`OK`.
``"STATUS" = 'Current'``

   .. image:: /static/3/solidwaste_mapping/images/5.png
      :align: center

6. Once the filter is applied, only a subset of point will be visible on the map. Next we will add the ``waste_disposal_september2023.ods`` file. Click on the   :menuselection:`Open Data Source Manager` icon and switch to  :guilabel:`Vector` tab. Navigate the file by clicking on ... button given beside :guilabel:`File name`.  Click :guilabel:`Add`.

   .. image:: /static/3/solidwaste_mapping/images/6.png
      :align: center

7. In the :guilabel:`Select Items to Add` dialog, select ``Disposal_per_Site_edited`` item and click :guilabel:`Add Layers``.

   .. image:: /static/3/solidwaste_mapping/images/7.png
      :align: center

8. Open the attribute table of ``waste_disposal_september2023`` layer. This table has the name of the facility and total waste collected at the site for the month of September 2023.

   .. image:: /static/3/solidwaste_mapping/images/8.png
      :align: center

9. Let’s join this table with the ``landfill_sites`` points layer. Go to :menuselection:`Processing --> Toolbox` from the menubar.

   .. image:: /static/3/solidwaste_mapping/images/9.png
      :align: center
	  
10. Search and locate the :guilabel:`Join attributes by Field Value` tool from the toolbox. Double-click to open it.

   .. image:: /static/3/solidwaste_mapping/images/10.png
      :align: center
	  
11. In the :guilabel:`Join Attributes by Field Value` dialog, select ``landfill_sites`` as the :guilabel:`Input layer` and ``NAME`` as the :guilabel:`Table field`. Select ``waste_disposal_september2023`` as the :guilabel:`Input layer 2` and ``Disposal Site`` as the :guilabel:`Table field 2`.
Check the :guilabel:`Discard records which could not be joined` box. Save the :guilabel:`Joined layer` by clicking on ... button and select :guilabel:`Save to File`.

   .. image:: /static/3/solidwaste_mapping/images/11.png
      :align: center
	  
12. Name the output layer as ``waste_by_station_september_2023.shp`` and click :guilabel:`Run`.

   .. image:: /static/3/solidwaste_mapping/images/12.png
      :align: center
	  
13. Once the processing finishes, a new layer ``waste_by_station_september_2023`` will be added which will have the amount of waste in the ``Sept2023`` column.

   .. image:: /static/3/solidwaste_mapping/images/13.png
      :align: center
	  
14. Now let’s visualize this data. First select the ``Wards`` layer and click on :menuselection:`Open the Layer Styling panel` icon. 

   .. image:: /static/3/solidwaste_mapping/images/14.png
      :align: center

15. Set the symbology of this layer to :guilabel:`Single Symbol` with a light :guilabel:`Fill color` and :guilabel:`Stroke color`.

   .. image:: /static/3/solidwaste_mapping/images/15.png
      :align: center

16. Next select the ``waste_by_station_september_2023`` layer and select :guilabel:`Simple Marker` symbol. Click the drop-down for :guilabel:`Symbol layer type`.

   .. image:: /static/3/solidwaste_mapping/images/16.png
      :align: center
	  
17. Select ``Filled Marker`` as the :guilabel:`Symbol layer type`. We will now change the size of the symbol proportional to the amount of waste collected at the site. To do this, we must apply a Data-defined Override - which can apply a field value or expression to calculate the size for each feature. Click the :guilabel:`Date-defined Override` button next to :guilabel:`Size` and select :guilabel:`Assistant`.

   .. image:: /static/3/solidwaste_mapping/images/17.png
      :align: center

18. We want to size the filled symbols based on values of collected waste. Select ``Sept2023`` field as :guilabel:`Source`. Set values from ``5000`` to ``50000``. Now set the size of circle from ``1`` to ``25``. Click on the :guilabel:`Back` icon.   

   .. image:: /static/3/solidwaste_mapping/images/18.png
      :align: center
	  
19. You will see the circles of different size for each point. The sizes are in Milimeters unit. The data-defined override button will turn yellow indicating that an override is applied for that value. 

   .. image:: /static/3/solidwaste_mapping/images/19.png
      :align: center
	  
20. Let’s explore more advanced styling options. Change the Symbol layer type to :guilabel:`Shapeburst Fill`. Select 2 colors of your choice to render the circles with a gradient fill.

   .. image:: /static/3/solidwaste_mapping/images/20.png
      :align: center
	  
21.Next we will apply a :guilabel:`Drop-shadow effect` to the circles to make them pop-out on the map. These are known as ``Live Layer Effects``. Scroll down and expand the :guilabel:`Layer Rendering` section. Check the :guilabel:`Draw effects` button and click the star button.

   .. image:: /static/3/solidwaste_mapping/images/21.png
      :align: center
	  
22. Enable the :guilabel:`Drop Shadow` option.

   .. image:: /static/3/solidwaste_mapping/images/22.png
      :align: center
	  
23. The map looks pretty good now, but the reader needs to know what values these symbols represent. It will be good to have an interpretable legend. Click :guilabel:`Back` button till you are back in the main Layer Styling dialog. Select :guilabel:`Marker` and click on the :guilabel:`Advanced` button at the bottom. Select :guilabel:`Date-defined Size Legend`.

   .. image:: /static/3/solidwaste_mapping/images/23.png
      :align: center
	  
24. Enter ``Waste Collected (Tonnes)`` as the :guilabel:`Title` and click the :guilabel:`+` button to add legend entries. Since our symbols are scaled by a factor of 3, enter the appropriate value and Label. You will see a nice legend now appear in the Layers panel. The same legend will be available in the ``Print Layout`` if you wished to create a map from this data.

   .. image:: /static/3/solidwaste_mapping/images/24.png
      :align: center
	  
25. Close the :guilabel:`Layer styling` panel. The visualization is ready. You learnt how to turn a data in a table to a visually informative and attractive map.

   .. image:: /static/3/solidwaste_mapping/images/24.png
      :align: center