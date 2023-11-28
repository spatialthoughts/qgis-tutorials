Determining Landuse Buffer Zones (QGIS3)
========================================

In this tutorial you will work with landuse data for a city and determine buffer zones around a particular land parcel. Such analysis is required to establish a corridor of restrictions around noise pollution or heavy traffic.

Overview of the task
--------------------

We will start with a shapefile of land parcels for the City of San Francisco and use geoprocessing and spatial analysis techniques to determine a buffer of restricted area around all properties with institutional land use.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Creating rectangular buffers in QGIS
- Using a Spatial Index to speed up analysis

Get the data
------------

The data comes from City of San Francisco in form of parcels polygons with attribute indicating the Land use categories.
You can find the data for the tutorial from DataSF Open Data Portal.

Let's see the steps to download a polygon shapefile with land use categories for every parcel in San Francisco.

1. Go to the data portal - https://datasf.org/opendata/. Search for the keyword ``Land use`` in the search bar. 

   .. image:: /static/3/landuse_buffer/images/db1.png
      :align: center
	  
	  
2. Click on the first search result to visualise and export the data. 

   .. image:: /static/3/landuse_buffer/images/db2.png
      :align: center
	  
3. You will see the data and attributes. Click :guilabel:`Export` to download the ``Land Use 2020`` data.

   .. image:: /static/3/landuse_buffer/images/db3.png
      :align: center
	  
4. In the export options, click on :guilabel:`Shapefile` to download the polygon shapefile of the data.

   .. image:: /static/3/landuse_buffer/images/db4.png
      :align: center
	  
5. A zip-file of the landuse will be downloaded. Switch to the :guilabel:`About` tab to read information about landuse categories and units which will be useful further in this tutorial.

   .. image:: /static/3/landuse_buffer/images/db5.png
      :align: center
	  
For convenience, you may directly download a copy of the shapefile below:
 
`land_use.shp <https://www.qgistutorials.com/downloads/land_use.zip>`_



Procedure
---------

1. Open QGIS. Click :menuselection:`Open Data Source Manager` icon to add  the layer.

   .. image:: /static/3/landuse_buffer/images/1.png
      :align: center
	  
2. Switch to :guilabel:`Vector` tab and navigate to the landuse shapefile. Click :guilabel:`Add`.

   .. image:: /static/3/landuse_buffer/images/2.png
      :align: center
	  
3. Notice the CRS name at the bottom-right corner of QGIS. It indicates that the data is in geographic coordinate system ``OGC:CRS84``. Click on it.

   .. image:: /static/3/landuse_buffer/images/3.png
      :align: center

4. The Project Coordinate Reference System (CRS) dialog will show the selected CRS is ``WGS 84 (CRS 84)``. Unit of measurement for this CRS is ``Degree``. All geoprocessing on this layer will be done in the native units of the CRS. The unit degree is inappropriate for this analysis.   

   .. image:: /static/3/landuse_buffer/images/4.png
      :align: center
	  
5. We will reproject the layer to the projected CRS suitable for the region - ``NAD83 / California zone 3 (ftUS)``. This is ``EPSG:2227`` which uses NAD83 datum with measurement units in feet.Go to :menuselection:`Vector --> Data Management Tools --> Reproject Layer`. 

   .. image:: /static/3/landuse_buffer/images/5.png
      :align: center
	  
6. In the Reproject Layer dialog, select the loaded layer as :guilabel:`Input Layer`. Click on the icon beside the selector to choose the :guilabel:`Target CRS`.

   .. image:: /static/3/landuse_buffer/images/6.png
      :align: center
	  
7. Search for ``EPSG:2227`` in the bar and select the ``NAD83 / California zone 3 (ftUS)`` CRS. click :guilabel:`Go back` to continue. 

    .. image:: /static/3/landuse_buffer/images/7.png
       :align: center
	   
8. Save the :guilabel:`Reprojected` output. Expand the browsing options and select :guilabel:`Save to File`.

    .. image:: /static/3/landuse_buffer/images/8.png
       :align: center
	   
9. Save the output shapefile in your chosen folder as ``LandUse2020.shp``. Check the :guilabel:`Open output file after running algorithm` option to add the reprojected layer to QGIS.

    .. image:: /static/3/landuse_buffer/images/9.png
       :align: center
	   
10. Remove the original layer with CRS WGS 84 from the QGIS. Select the layer and click on :guilabel:`Remove Layer` symbol.

    .. image:: /static/3/landuse_buffer/images/10.png
       :align: center

11. We will continue the process with the reprojected layer. As we saw in the :guilabel:`About` section of the downloaded shapefile in the data portal, The classification is as follows.

	•	**CIE** = Cultural, Institutional, Educational
	•	**MED** = Medical
	•	**MIPS** = Office (Management, Information, Professional Services)
	•	**MIXED** = Mixed Uses (Without Residential)
	•	**MIXRES** = Mixed Uses (With Residential)
	•	**PDR** = Industrial (Production, Distribution, Repair)
	•	**RETAIL/ENT** = Retail, Entertainment
	•	**RESIDENT** = Residential
	•	**VISITOR** = Hotels, Visitor Services
	•	**VACANT** = Vacant
	•	**ROW** = Right-of-Way
	•	**OPENSPACE** = Open Space
	
For this tutorial, we are interested only in the Institutional land use. So we can query for the value **CIE** in the attribute table. Go to :menuselection:`Processing --> Toolbox`.
	
   .. image:: /static/3/landuse_buffer/images/11.png
      :align: center	
	
12. Search the :guilabel:`Select by Attribute` tool from the processing toolbox. Double-click to open it.

   .. image:: /static/3/landuse_buffer/images/12.png
      :align: center

13. In the Select by Attribute dialog, set ``LandUse2020`` as the :guilabel:`Input layer`. Select ``landuse`` as the :guilabel:`Selection attribute` and enter ``CIE`` as the :guilabel:`Value`. Click Run.

   .. image:: /static/3/landuse_buffer/images/13.png
      :align: center
	  
14. You will see the parcels matching our query will be highlighted in yellow. These are all parcels belonging to the institutional land use in the city.

   .. image:: /static/3/landuse_buffer/images/14.png
      :align: center

15. Now we can create a buffer around the selected parcels. Back in the main QGIS window, open Processing Toolbox. Search and locate the :guilabel:`Buffer` tool. Double-click to open it.

   .. image:: /static/3/landuse_buffer/images/15.png
      :align: center
	  
16. In the Buffer dialog, select LandUse2020 as the :guilabel:`Input layer`. Check the :guilabel:`Selected features only` box so the buffer will apply only to the selected institutional land use parcels. We will create a buffer zone of 100ft around each parcel. Enter 100 feet as the :guilabel:`Distance`. The default buffers are of circular shape. Since we are dealing with parcel data, a rectangular buffer area is more appropriate where each edge of the parcel will be offset by the buffer distance. Select ``Square`` as the :guilabel:`End cap style` and ``Miter`` as the :guilabel:`Join style`. Click the browse button next to Buffered and select :guilabel:`Save to File`.

   .. image:: /static/3/landuse_buffer/images/16.png
      :align: center
	  
17. Enter the output file name as ``buffer.shp`` and click OK. Click :guilabel:`Run`.
	  
   .. image:: /static/3/landuse_buffer/images/17.png
      :align: center
	  
18. Once the processing finishes, a new layer buffer will be added to QGIS. These polygons represent the buffer zone of restrictions around the institutional land use.

   .. image:: /static/3/landuse_buffer/images/18.png
      :align: center
	  

19. We now know which areas of the city fall under the restricted zone. It would be useful to identify all parcels which fall in this zone and add an attribute indicating that a restriction applies to that parcel. Let’s first add a column to the buffer polygons. Search for :menuselection:`Field Calculator` in the processing toolbox. Double-click to open.

   .. image:: /static/3/landuse_buffer/images/19.png
      :align: center
	  
20. In the Field Calculator dialog, ensure buffer is selected as the :guilabel:`Input layer`. We don’t need to save this layer, so leave the Output file field empty. Enter ``RESTRICTED`` as the result :guilabel:`Field Name`. Set the :guilabel:`Result field type` to ``String``. Type ``Yes`` as the :guilabel:`Expression`. Click OK.

   .. image:: /static/3/landuse_buffer/images/20.png
      :align: center

21. A new layer called Calculated will be added to QGIS. Open the Attribute Table and verify that a new column called RESTRICTED with value Yes exists in this layer.

   .. image:: /static/3/landuse_buffer/images/21.png
      :align: center
	  
22. Next step is to do a Spatial Join to add this attribute to the original parcels layer based on which parcels intersect with the buffer zone. The ``LandUse2020`` layer has more than 100,000 elements. We will add spatial indexing to the features to improve the performance and speedup the spatial join operation. 
Check out the course `Spatial Indexing <https://courses.spatialthoughts.com/advanced-qgis.html#concept-spatial-indexing>`_ section to understand more about this. 
Now, search and locate the :menuselection:`Create Spatial Index` tool from the Processing Toolbox and double-click to open. 

    .. image:: /static/3/landuse_buffer/images/22.png
       :align: center
	   
23.Select ``LandUse2020`` as :guilabel:`Input layer` and click :guilabel:`Run`.
	
    .. image:: /static/3/landuse_buffer/images/23.png
       :align: center

24. The spatial index is created for the layer. You can verify this by checking the property of the layer. Tight-click on the layer and click :guilabel:`Properties`.

    .. image:: /static/3/landuse_buffer/images/24.png
       :align: center
	   
25. Switch to the :guilabel:`Source` tab and and look under the :guilabel:`Geometry` section. It indicates that the spatial index exists.

    .. image:: /static/3/landuse_buffer/images/25.png
       :align: center

26. Now we can do the spatial join. Look for :menuselection:`Join attributes by location` tool in the processing toolbox. Double-click to open it.

   .. image:: /static/3/landuse_buffer/images/26.png
      :align: center
	  
27. We want to :guilabel:`Join to features in` the ``LandUse2020`` layer :guilabel:`By comparing to` the ``Calculated`` layer. We want to join attributes features that intersect. Check the box for ``intersect``.  Click the browse button next to :guilabel:`Fields to add`.

   .. image:: /static/3/landuse_buffer/images/27.png
      :align: center
	  
28. Select only the ``RESTRICTED`` field and click :guilabel:`OK`.

   .. image:: /static/3/landuse_buffer/images/28.png
      :align: center
	  

29. For Join Type, select ``Take attribute of the first matching feature only``. Next, click . . . next to Joined layer and select Save to File.
	
   .. image:: /static/3/landuse_buffer/images/29.png
      :align: center
	
30. Enter the :guilabel:`Joined layer` name as ``LandUseWithRestrictions.shp`` and click :guilabel:`OK`. Click :guilabel:`Run`.

   .. image:: /static/3/landuse_buffer/images/30.png
      :align: center
	  
31. Once the processing finishes, you will get a new layer ``LandUseWithRestrictions``. Open the attribute table and examine the ``RESTRICTED`` column. The parcels that fall within 100ft of an institutional parcel now have the value ``Yes`` indicating a restriction applies to that parcel. Other parcels have a ``NULL`` value indicating no restriction.

    .. image:: /static/3/landuse_buffer/images/31.png
       :align: center



	  