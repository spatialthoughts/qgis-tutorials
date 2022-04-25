Calculating Raster Area (QGIS3)
===============================

The classified maps are more commonly found as raster data. A GIS analyst often needs to generate reports based on this data by computing the area per class from these raster data. The QGIS has convenient algorithms to calculate rater area and techniques to create tabular data. 

Overview of the task
--------------------

The tutorial shows how to compute the area of each land cover over a reserve national park in India using raster data and add additional metadata to the attribute table using conditional statements. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- How to style raster layer using preconfigured QML document. 
- How to create and store tabular data as GeoPackage. 
- How to export final results as Excel files. 

Get the data
------------

To calculate the area, we need two data files. First, we will get the vector file containing the boundary layer of the national park. Then the raster file containing the land cover information. Follow the procedure to download the data. 

Boundary Data
^^^^^^^^^^^^^

1. Go to the `Protected Planet <https://www.protectedplanet.net/>`_ website, and click on the search toolbox. Search for ``Kaziranga national park``. 

  .. image:: /static/3/calculating_raster_area/images/data01.png
     :align: center

2. The protected vector boundary will be shown as a search result. Click on it to view the boundary of the national park. 

  .. image:: /static/3/calculating_raster_area/images/data02.png
     :align: center

3. This page will contain additional information like total area, created year, etc. Click on the :guilabel:`Download` and click the :guilabel:`SHP` to download the data in *ShapeFile* format. 

  .. image:: /static/3/calculating_raster_area/images/data03.png
     :align: center


4. Two options for download will be prompted. Click :guilabel:`continue` under :guilabel:`Non Commercial Use`. Now a zip file containing the national park boundary will be downloaded.

  .. image:: /static/3/calculating_raster_area/images/data04.png
     :align: center


Landcover Data
^^^^^^^^^^^^^^

1. Go to the `ESA WorldCover <https://esa-worldcover.org/en>`_ website and click on the :guilabel:`DATA ACCESS` menu. 

  .. image:: /static/3/calculating_raster_area/images/data11.png
     :align: center

2. Scroll down to the :guilabel:`DATA DOWNLOAD` section and click on the link :guilabel:`WorldCover viewer`

  .. image:: /static/3/calculating_raster_area/images/data12.png
     :align: center

3. Now the data viewer will be opened, you need to create a free account to download any data. So, click on the :guilabel:`Register`. Follow the instruction given to create a new account. 

  .. image:: /static/3/calculating_raster_area/images/data13.png
     :align: center


4. After creating the account, log in using the credentials. This national park is situated in North-East India hence zoom to that region. Refer to the screenshot below to locate the region. 

  .. image:: /static/3/calculating_raster_area/images/data14.png
     :align: center
	 
5. Once you are zoomed in enough, the landcover image tiles bounding box will start to appear. Search and locate the ``N24E093`` tile region. 

  .. image:: /static/3/calculating_raster_area/images/data15.png
     :align: center
	 
6. Select the tile and click :guilabel:`NEXT`. 

  .. image:: /static/3/calculating_raster_area/images/data16.png
     :align: center


7. Click on the :guilabel:`DOWNLOAD` to download a zip file containing the landcover information in raster format. 

  .. image:: /static/3/calculating_raster_area/images/data17.png
     :align: center
	 
8. Now, in the esa-worldcover website, scroll-down to the :guilabel:`Symbology` section. Click on the :guilabel:`QGIS` to download the *qml* file which can be used to style the raster layer as you viewed in the data viewer.  

  .. image:: /static/3/calculating_raster_area/images/data18.png
     :align: center
	 
For convenience, you may directly download a copy of the datasets from the links below: 

1. Boundary file 
2. Landcover file
3. Style QML 

Data Source [WDPA]_ [WorldCover]_

Procedure
---------

1. In the :guilabel:`Browser`, locate the unzipped vector data folder. Drag and drop the ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` shapefile into the QGIS canvas. 

  .. image:: /static/3/calculating_raster_area/images/01.png
     :align: center

2. Now locate the unzipped raster file. Drag and drop the ``ESA_WorldCover_10m_2020_v100_N24_E093_Map.tif`` file into the QGIS canvas. 

  .. image:: /static/3/calculating_raster_area/images/02.png
     :align: center

3. Both boundary and landcover data are loaded. Let's clip the large landcover data to the national park boundary. Go to :menuselection:`Processing --> Toolbox` to open Processing toolbox. Search for and locate the :menuselection:`GDAL --> Raster extraction --> Clip raster by mask layer` algorithm. Double-click to launch it.

  .. image:: /static/3/calculating_raster_area/images/03.png
     :align: center


4. In the :guilabel:`Clip Raster by Mask Layer` dialog, choose the ``ESA_WorldCover_10m_2020_v100_N24_E093_Map`` layer as the :guilabel:`Input layer` and ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` layer as :guilabel:`Mask Layer`. Enter ``-9999`` in :guilabel:`Assign a specified nodata value to output bands` section. 

  .. image:: /static/3/calculating_raster_area/images/04.png
     :align: center


5. Now open the :guilabel:`Advanced Parameters` section and choose ``High Compression`` in :guilabel:`Profile`. Now under  :guilabel:`Clipped (mask)`, click on the ``...`` and select :guilabel:`Save To File...`. Enter the file name as ``worldcover_clipped.tif``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/05.png
     :align: center
	 
6. Now the ``worldcover_clipped`` layer will be loaded in the QGIS canvas. Remove the ``ESA_WorldCover_10m_2020_v100_N24_E093_Map`` layer. 

  .. image:: /static/3/calculating_raster_area/images/06.png
     :align: center

7. To compute the area in the metric units, we have to reproject the layers to the local UTM coordinate zone. Open the Processing toolbox and search for :menuselection:`Vector general --> Reproject layer` algorithm. Double-click to launch it.

  .. image:: /static/3/calculating_raster_area/images/07.png
     :align: center

8. In the :guilabel:`Reproject Layer` dialog, choose the ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` layer as the :guilabel:`Input layer`, click on the :guilabel:`Select CRS` button under :guilabel:`Target CRS`. 


  .. image:: /static/3/calculating_raster_area/images/08.png
     :align: center

.. note::

  To find out which UTM zone for your region,  refer to the `What UTM Zone am I in <https://mangomap.com/robertyoung/maps/69585/what-utm-zone-am-i-in-#>`_ website. 


9. Search for *46 N*. Choose the ``WGS 84 / UTM zone 46N`` CRS. 

  .. image:: /static/3/calculating_raster_area/images/09.png
     :align: center


10. In the :guilabel:`Reprojected` section,  click ``...`` and select :guilabel:`Save To File...`. Enter the name as ``nationalpark_reprojected.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/10.png
     :align: center


11. Now the ``nationalpark_reprojected`` layer will be loaded in canvas. Remove the ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` layer. In the :guilabel:`Processing Toolbox`, search and locate :menuselection:`GDAL --> Raster projections --> Warp (reproject)` to reproject the raster layer. 

  .. image:: /static/3/calculating_raster_area/images/11.png
     :align: center

12. In the :guilabel:`Warp (Reproject)` dialog choose ``worldcover_clipped`` as the :guilabel:`Input layer`, select ``WGS 84 / UTM zone 46N`` CRS in :guilabel:`Target CRS`. Open the :guilabel:`Advanced Parameters` and choose ``High Compression`` in :guilabel:`Profile`. 

  .. image:: /static/3/calculating_raster_area/images/12.png
     :align: center

13. Now under :guilabel:`Reprojected`, click on ``...`` and select :guilabel:`Save To File...`. Enter the name as ``worldcover_reprojected.tif``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/13.png
     :align: center


14. Now the ``worldcover_reprojected`` layer will be loaded in the canvas, remove the ``worldcover_clipped`` layer. Let's set the project layer to the UTM zone. Click on any layer and choose :menuselection:`Layer CRS --> Set Project CRS from Layer`. 

  .. image:: /static/3/calculating_raster_area/images/14.png
     :align: center


15. Now the project CRS will be updated, let's set the styling of the worldcover data as we saw in the data viewer. Right-click on the ``worldcover_reprojected`` layer and click :guilabel:`Properties...`

  .. image:: /static/3/calculating_raster_area/images/15.png
     :align: center
	 
16. In the :guilabel:`Layer Properties` dialog, choose :guilabel:`Symbology`. You can notice the Layer colors are visualized in a  white-black tone. To fix this, click on the :menuselection:`Style --> Load Style...`. Browse and select the ``ESAWorldCover_ColorLegend.qml`` file.  

  .. image:: /static/3/calculating_raster_area/images/16.png
     :align: center

17. Now you can see the style properties are updated as per the ESA description. Click :guilabel:`OK`. 

  .. image:: /static/3/calculating_raster_area/images/17.png
     :align: center

18. A zippy arrow will appear next to the ``worldcover_reprojected`` layer. Expand it to see the class description. 

  .. image:: /static/3/calculating_raster_area/images/18.png
     :align: center

19. Now let's calculate the area for each class. In the processing toolbox, select :guilabel:`Raster layer unique values report`. 

  .. image:: /static/3/calculating_raster_area/images/19.png
     :align: center


20. In the :guilabel:`Raster Layer Unique Values Report`, choose the :guilabel:`Input layer` as ``worldcover_reprojected``. Under the :guilabel:`Unique values table` click on ``...`` and choose :guilabel:`Save to File...`. Enter the name as ``class_areas.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/20.png
     :align: center

21. Now the ``class_areas`` layer will be added to the :guilabel:`Layers` panel. Right-click on the layer and click :guilabel:`Open Attribute Table`. The column ``m2`` contains the area for each class in the national park boundary in sqmt. 

  .. image:: /static/3/calculating_raster_area/images/21.png
     :align: center

22. In the :guilabel:`Processing Toolbox`, search and select :menuselection:`Vector table --> Field Calculator`.  

  .. image:: /static/3/calculating_raster_area/images/22.png
     :align: center

23. In the :guilabel:`Field Calculator` dialog, select the ``class_areas`` layer in the :guilabel:`Input Layer`. Enter the :guilabel:`Field name` as ``area_sqkm``. In the :guilabel:`Result field type` choose ``Float``. In the :guilabel:`Expression` window,  enter the below expression. This will convert the sqmt to sqkm and limit the trailing decimals to 2 decimal places. Under the :guilabel:`Calculated` click on ``...`` and choose :guilabel:`Save To File...` . Enter the name as ``class_area_sqkm.gpkg``. Click :guilabel:`Run`. 

  .. code-block:: none

	round("m2"/ 1e6, 2)
	
  .. image:: /static/3/calculating_raster_area/images//23.png
     :align: center


24. Now the ``class_area_sqkm`` layer will be loaded in canvas. Open the Attribute table, :guilabel:`area_sqkm` column will contain the area of each landcover class in sqkm with decimal places trailing not more than 2 places. Let's add the class name from the `ESA Product User Manual <https://esa-worldcover.s3.amazonaws.com/v100/2020/docs/WorldCover_PUM_V1.0.pdf>`_ in the attribute table. 

  .. image:: /static/3/calculating_raster_area/images/24.png
     :align: center


25. Open Field Calculator, and select the ``class_areas_sqkm`` layer in :guilabel:`Input Layer`. Enter the :guilabel:`Field name` as ``landcover``, in the :guilabel:`Result field type`, choose ``String``. In the :guilabel:`Expression` window enter the below expression. Under the :guilabel:`Calculated` click on ``...`` and choose :guilabel:`Save To File...` . Enter the name as ``class_area_with_landcover.gpkg``. Click :guilabel:`Run`. 


  .. code-block:: none

	CASE 
	WHEN "value" = 10 THEN 'Tree cover' 
	WHEN "value" = 20 THEN 'Shrubland'
	WHEN "value" = 30 THEN 'Grassland'
	WHEN "value" = 40 THEN 'Cropland'
	WHEN "value" = 50 THEN 'Built-up'
	WHEN "value" = 60 THEN 'Bare / sparse vegetation'
	WHEN "value" = 70 THEN 'Snow and Ice'
	WHEN "value" = 80 THEN 'Permanent water bodies'
	WHEN "value" = 90 THEN 'Herbaceous wetland'
	WHEN "value" = 95 THEN 'Moss and lichen'
	WHEN "value" = 100 THEN 'Mangroves'
	END

  .. image:: /static/3/calculating_raster_area/images/25.png
     :align: center
	 
26. Now the ``class_area_with_landcover`` layer will be loaded in canvas. Open the Attribute table. The :guilabel:`landcover` column will contain the landcover name against each landcover value. 


  .. image:: /static/3/calculating_raster_area/images/26.png
     :align: center

27. Let's export this result as an excel file. In the :guilabel:`Processing Toolbox`, search and select :menuselection:`Vector table --> Refactor fields`.  

  .. image:: /static/3/calculating_raster_area/images/27.png
     :align: center

28. In the :guilabel:`Refactor Fields` dialog, select the ``class_area_with_landcover`` layer in the :guilabel:`Input Layer`. Select all columns except *area_sqkm* and *landcover*, then click :guilabel:`Delete selected field`. 

  .. image:: /static/3/calculating_raster_area/images/28.png
     :align: center

29. Under the :guilabel:`Refactored`, click on ``...`` and choose :guilabel:`Save To File...`. Enter the name as ``park_ara_by_landcover.xlxs``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/29.png
     :align: center


30. Now the resultant tabular data will be generated with *landcover* and *area_sqkm* columns. 

  .. image:: /static/3/calculating_raster_area/images/30.png
     :align: center