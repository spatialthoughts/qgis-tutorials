Calculating Raster Area (QGIS3)
===============================

Many applications require quantifying the landuse patterns in a region. Land Use Land Cover (LULC) datasets come as raster files where each pixel is assigned a class value. GIS analysts often needs to generate reports based on this data by computing the area per class in a given region. QGIS comes with many built-in tools to calculate and summarize raster area.

.. note::

	Historically the suggested approach for calculating areas for rasters was to convert the raster to a vector layer and use vector area calculation techniques. This approach is quite computationally intensive and error-prone. The recommended approach is to use the processing tool **Raster layer unique values report** which can directly compute the pixel areas. If you have a layer with many polygons and need areas for each of them, you can use the **Zonal histogram** tool to get pixel counts for each class and then multiply it with the area of each pixel.

Overview of the task
--------------------

We will be using a raster layer with 11 land cover classes and calculate the area of each class within a national park. We will also post-process the results to create a spreadsheet with class names and areas.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- How to apply symbology to a layer from a style file in the `.qml` format.
- How to write expressions with multiple if/else conditions using the `CASE` statement.
- How to export a QGIS table as an Excel spreadsheet. 

Get the data
------------

We will be downloading the following datasets

1. World Database on Protected Areas (WDPA): We will download the shapefile for the boundary of the *Kaziranga National Park* in India.
2. ESA WorldCover 2020: The European Space Agency (ESA) WorldCover 10 m 2020 product provides a global land cover map for 2020 at 10 m resolution. We will download the tile covering our region of interest.

Park Boundary
^^^^^^^^^^^^^

1. Go to the `Protected Planet <https://www.protectedplanet.net/>`_ website, and click on the search toolbox. Search for ``Kaziranga National Park``. 

  .. image:: /static/3/calculating_raster_area/images/data01.png
     :align: center

2. The protected vector boundary will be shown as a search result. Click on it to view the page for the `Kaziranga National Park <https://www.protectedplanet.net/10744>`_. 

  .. image:: /static/3/calculating_raster_area/images/data02.png
     :align: center

3. This page will contain additional information like total area, created year, etc. Click on the :guilabel:`Download` and click the :guilabel:`SHP` to download the data in *Shapefile* format. 

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

2. Scroll down to the :guilabel:`DATA DOWNLOAD` section and click on the link to open the `WorldCover viewer <https://viewer.esa-worldcover.org/worldcover/>`_

  .. image:: /static/3/calculating_raster_area/images/data12.png
     :align: center

3. You need to create a free account to download the data. Click on the :guilabel:`Register` link on the top-right corner. Follow the instruction given to create a new account. 

  .. image:: /static/3/calculating_raster_area/images/data13.png
     :align: center


4. After creating the account, log in using the credentials. Our area of interest for this tutorial is the Kaziranga National Park. Zoom to the North-East India region. Once you are zoomed in enough, the landcover image tiles bounding box will start to appear.

  .. image:: /static/3/calculating_raster_area/images/data14.png
     :align: center
	 
5. Search and locate the ``N24E093`` tile region. 

  .. image:: /static/3/calculating_raster_area/images/data15.png
     :align: center
	 
6. Select the tile and click :guilabel:`NEXT`. 

  .. image:: /static/3/calculating_raster_area/images/data16.png
     :align: center


7. Click on the :guilabel:`DOWNLOAD` to download a zip file containing the landcover information in raster format. 

  .. image:: /static/3/calculating_raster_area/images/data17.png
     :align: center
	 
8. We will also download a symbology file provided by ESA. Visit the `ESA WorldCover Data Access <https://esa-worldcover.org/en/data-access>`_ page., Scroll-down to the :guilabel:`Symbology` section. Click on the :guilabel:`QGIS` to download the `ESAWorldCover_ColorLegend.qml <https://esa-worldcover.s3.amazonaws.com/v100/2020/docs/ESAWorldCover_ColorLegend.qml>`_ file which can be used to style the raster layer with approproate colors and class labels.

  .. image:: /static/3/calculating_raster_area/images/data18.png
     :align: center
	 
For convenience, you may directly download a copy of the datasets from the links below: 

* Kaziranga National Park Boundary `WDPA_WDOECM_Apr2022_Public_10744_shp_0.zip <https://www.qgistutorials.com/downloads/WDPA_WDOECM_Apr2022_Public_10744_shp_0.zip>`_
* ESA WorldCover Tile N24E093 subset `terrascope_download_20220422_114733.zip <https://www.qgistutorials.com/downloads/terrascope_download_20220422_114733.zip>`_
* ESA WorldCover QML Style file `ESAWorldCover_ColorLegend.qml <https://www.qgistutorials.com/downloads/ESAWorldCover_ColorLegend.qml>`_

Data Source [WDPA]_ [WorldCover]_

Procedure
---------

1. Unzip all the downloaded files. In the :guilabel:`Browser`, locate the folder containing the boundary file  ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons.shp`` and drag-and-drop it into the QGIS canvas. 

  .. image:: /static/3/calculating_raster_area/images/01.png
     :align: center

2. Now locate the worldcover raster tile  ``ESA_WorldCover_10m_2020_v100_N24_E093_Map.tif`` and drop it into the QGIS canvas. 

  .. image:: /static/3/calculating_raster_area/images/02.png
     :align: center

3. You will now have both the vector boundary and landcover raster layer loaded in the :guilabel:`Layers` panel. Let's clip the landcover raster to the national park boundary. Go to :menuselection:`Processing --> Toolbox` to open Processing toolbox. Search for and locate the :menuselection:`GDAL --> Raster extraction --> Clip raster by mask layer` algorithm. Double-click to launch it.

  .. image:: /static/3/calculating_raster_area/images/03.png
     :align: center


4. In the :guilabel:`Clip Raster by Mask Layer` dialog, choose the ``ESA_WorldCover_10m_2020_v100_N24_E093_Map`` layer as the :guilabel:`Input layer` and ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` layer as :guilabel:`Mask Layer`. Enter ``-9999`` in :guilabel:`Assign a specified nodata value to output bands` section. 

  .. image:: /static/3/calculating_raster_area/images/04.png
     :align: center


5. Now open the :guilabel:`Advanced Parameters` section and choose ``High Compression`` in :guilabel:`Profile`. Now under  :guilabel:`Clipped (mask)`, click on the ``...`` and select :guilabel:`Save To File...`. Enter the file name as ``worldcover_clipped.tif``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/05.png
     :align: center
	 
6. Now the ``worldcover_clipped`` layer will be loaded in the QGIS canvas. Right-click the ``ESA_WorldCover_10m_2020_v100_N24_E093_Map`` layer and select :guilabel:`Remove Layer...`

  .. image:: /static/3/calculating_raster_area/images/06.png
     :align: center

7. Both our layers come in the Geographic CRS ``EPSG:4326``. This CRS has units of degrees and is not suitable for calculating area. We must first reproject the layers to a Projected CRS. for regional analysis like these, UTM is a good choice for a projected CRS. We will reproject the layers to the CRS for the local UTM zone. Open the Processing toolbox and search for :menuselection:`Vector general --> Reproject layer` algorithm. Double-click to launch it.

  .. image:: /static/3/calculating_raster_area/images/07.png
     :align: center

8. In the :guilabel:`Reproject Layer` dialog, choose the ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` layer as the :guilabel:`Input layer`, click on the :guilabel:`Select CRS` button under :guilabel:`Target CRS`. 


  .. image:: /static/3/calculating_raster_area/images/08.png
     :align: center


9. Our area of interest falls in the UTM Zone 46N. Search for *46 N* and select the ``WGS 84 / UTM zone 46N`` CRS. 

  .. image:: /static/3/calculating_raster_area/images/09.png
     :align: center

.. note::

  To find out which UTM zone for your region,  refer to the `What UTM Zone am I in <https://mangomap.com/robertyoung/maps/69585/what-utm-zone-am-i-in-#>`_ website. 

10. In the :guilabel:`Reprojected` section,  click ``...`` and select :guilabel:`Save To File...`. Enter the name as ``nationalpark_reprojected.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/10.png
     :align: center


11. Now the ``nationalpark_reprojected`` layer will be loaded in canvas. Right-click the ``WDPA_WDOECM_Apr2022_Publicc_10744_shp-polygons`` layer and select :guilabel:`Remove Layer...` to remove it. Now we will reproject the raster layer. In the :guilabel:`Processing Toolbox`, search and locate :menuselection:`GDAL --> Raster projections --> Warp (reproject)` 

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


15. Now the project CRS will be updated. Let's set the symbology of the raster layer as per the class names and colors of the ESA WorldCover dataset. Right-click on the ``worldcover_reprojected`` layer and click :guilabel:`Properties...`

  .. image:: /static/3/calculating_raster_area/images/15.png
     :align: center
	 
16. In the :guilabel:`Layer Properties` dialog, choose :guilabel:`Symbology`. You can notice the Layer colors are visualized in a  white-black tone. To fix this, click on the :menuselection:`Style --> Load Style...`. Browse and select the ``ESAWorldCover_ColorLegend.qml`` file.  

  .. image:: /static/3/calculating_raster_area/images/16.png
     :align: center

17. Now you can see the updated symbol colors and class descriptions. Click :guilabel:`OK`. 

  .. image:: /static/3/calculating_raster_area/images/17.png
     :align: center

18. Expand the ``worldcover_reprojected`` layer in the :guilabel:`Layers` panel to see the legend with correct class descriptions.

  .. image:: /static/3/calculating_raster_area/images/18.png
     :align: center

19. Now let's calculate the area for each class. In the processing toolbox, search and locate the :guilabel:`Raster layer unique values report` tool. Double-click to open it.

  .. image:: /static/3/calculating_raster_area/images/19.png
     :align: center


20. In the :guilabel:`Raster Layer Unique Values Report` dialog, choose the :guilabel:`Input layer` as ``worldcover_reprojected``. Under the :guilabel:`Unique values table` click on ``...`` and choose :guilabel:`Save to File...`. Enter the name as ``class_areas.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/20.png
     :align: center

21. Now the ``class_areas`` layer will be added to the :guilabel:`Layers` panel. Right-click on the layer and click :guilabel:`Open Attribute Table`. The column ``m2`` contains the area for each class in square meters. 

  .. image:: /static/3/calculating_raster_area/images/21.png
     :align: center

22. Let's convert the area to square kilometers. In the :guilabel:`Processing Toolbox`, search and select :menuselection:`Vector table --> Field Calculator`.  

  .. image:: /static/3/calculating_raster_area/images/22.png
     :align: center

23. In the :guilabel:`Field Calculator` dialog, select the ``class_areas`` layer in the :guilabel:`Input Layer`. Enter the :guilabel:`Field name` as ``area_sqkm``. In the :guilabel:`Result field type` choose ``Float``. In the :guilabel:`Expression` window,  enter the below expression. This will convert the sqmt to sqkm and round the result to 2 decimal places. Under the :guilabel:`Calculated` click on ``...`` and choose :guilabel:`Save To File...` . Enter the name as ``class_area_sqkm.gpkg``. Click :guilabel:`Run`. 

  .. code-block:: none

	round("m2"/ 1e6, 2)
	
  .. image:: /static/3/calculating_raster_area/images/23.png
     :align: center


24. Now the ``class_area_sqkm`` layer will be loaded in canvas. Open the Attribute table and examine the newly added :guilabel:`area_sqkm` column. You will notice that the :guilabel:`Value` column contains numbers for each class. To make the results easier to interpret, Let's also add the description for each class number. The class descriptions are available in the `ESA Product User Manual <https://esa-worldcover.s3.amazonaws.com/v100/2020/docs/WorldCover_PUM_V1.0.pdf>`_.

  .. image:: /static/3/calculating_raster_area/images/24.png
     :align: center


25. Open Field Calculator, and select the ``class_areas_sqkm`` layer in :guilabel:`Input Layer`. Enter the :guilabel:`Field name` as ``landcover``, in the :guilabel:`Result field type`, choose ``String``. In the :guilabel:`Expression` window enter the below expression. This expression uses the **CASE** statement to assign a value based on multiple conditions. Under the :guilabel:`Calculated` click on ``...`` and choose :guilabel:`Save To File...` . Enter the name as ``class_area_with_landcover.gpkg``. Click :guilabel:`Run`. 


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

27. Let's export this result as an excel file. Before export we will also organize the table and remove unwanted fields. In the :guilabel:`Processing Toolbox`, search and select :menuselection:`Vector table --> Refactor fields`.  

  .. image:: /static/3/calculating_raster_area/images/27.png
     :align: center

28. In the :guilabel:`Refactor Fields` dialog, select the ``class_area_with_landcover`` layer in the :guilabel:`Input Layer`. Select all columns except *area_sqkm* and *landcover*, then click :guilabel:`Delete selected field`. 

  .. image:: /static/3/calculating_raster_area/images/28.png
     :align: center

29. Under the :guilabel:`Refactored`, click on ``...`` and choose :guilabel:`Save To File...`. Enter the name as ``park_ara_by_landcover.xlxs``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_raster_area/images/29.png
     :align: center


30. The result will be a spreadheet with *landcover* and *area_sqkm* columns. 

  .. image:: /static/3/calculating_raster_area/images/30.png
     :align: center