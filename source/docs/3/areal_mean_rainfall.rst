Areal Mean Rainfall (QGIS3)
============================

Often studies related to water balance, climate studies, flood modeling, and runoff forecasting need to compute the mean rainfall which is known as Areal Mean rainfall (AMR). QGIS  can be used for the computation of this with the power of the Processing toolbox. 

AMR calculation can be done using rain gauge data. By using the rain gauge location and observed precipitation, one can estimate the average precipitation at a given location by using the following techniques

1. **Arithmetic Average**: One can simply take an average of all the observed values. This method assumes that the rainfall field is homogeneous and that the rain gauge observations are independent and give equal weight to all rain gauges.

2. **Thiessen Polygon**: This method divides the area using Thiessen polygons with the assumption that rainfall is homogeneous within the coverage area of each station. This method is also called an area-weighted average. These assumptions are fine for low-lying or flat terrain, but not suitable for mountainous terrain.

3. **Iso-hyetal Method**: This interpolation technique calculates Isohyets - lines joining equal precipitation. It assumes that rainfall between 2 isohyets is homogeneous. This method is suitable when the rain-gauge network is dense.

4. **Distance Weighting/Gridded** - This is an interpolation technique where a raster grid is created and a value for each pixel is estimated based on the distance to stations. Once the grid points have all been estimated they are summed and the sum is divided by the number of grid cells to obtain the areal mean precipitation.

5. **Geostatistical Methods**: Rainfall is strongly influenced by local factors - such as elevation. Using multivariate regression or Kriging techniques, one can account for spatial autocorrelation and can achieve better accuracy. These methods are suited when the distribution of the rain gauge station is uniform and dense.

Overview of the task
--------------------

In this tutorial, we will take the source shapefiles and rainfall data to compute Areal Mean Rainfall using the Thiessen Polygon (Voronoi polygons) method. 

Other skills you will learn
----------------------------

- How to remove data with Null values
- How to fix invalid geometries in a layer.
- How to check your Processing History and re-run a tool with the same parameters.
- How to Dissolve polygons while computing statistics
- How to use only selected features in Processing algorithms

Get the data
------------

We will use `NOAA Climate data <https://www.ncdc.noaa.gov/cdo-web/>`_ , `HydroSHEDS <https://www.hydrosheds.org/>`_ and `US State boundaries <https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html>`_ data. Boundary file can be easily downloaded by visiting the portal can selecting *cb_2018_us_state_500k.zip* under *States*. A step-by-step instruction for accessing and downloading Climate data and hydrological basin data is as follows. 

Station-wise Precipitation
^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Go to `NOAA Climate data <https://www.ncdc.noaa.gov/cdo-web/>`_ website. Click on the Search tool. 

  .. image:: /static/3/areal_mean_rainfall/images/cd01.png
    :align: center
    

2. Select ``Global Summary of the Month`` in :guilabel:`Select weather Observation Type/Dataset`, then in :guilabel:`Select Date Range` choose July 2020, in :guilabel:`Search For` select ``States``, in :guilabel:`Enter a Search Term`  type ``Florida``. Click :guilabel:`Search`. 

  .. image:: /static/3/areal_mean_rainfall/images/cd02.png
    :align: center
    

3. Click :guilabel:`Add To Cart`, in items click :guilabel:`View Items`.  

  .. image:: /static/3/areal_mean_rainfall/images/cd03.png
    :align: center
    

4. Switch to :guilabel:`Custom Global Summary of the Month CSV`, click :guilabel:`Continue`.

  .. image:: /static/3/areal_mean_rainfall/images/cd04.png
    :align: center
    
    
5. Check the :guilabel:`Geographic Locations` and in :guilabel:`Select data types for custom output` expand ``Precipitation`` select ``Precipitation (PRCP)``. Click :guilabel:`Continue`.

  .. image:: /static/3/areal_mean_rainfall/images/cd05.png
    :align: center
    

6. Enter the mail address and click :guilabel:`SUBMIT ORDER` to Download the data.

  .. image:: /static/3/areal_mean_rainfall/images/cd06.png
    :align: center
    


Hydrological Basins
^^^^^^^^^^^^^^^^^^^

1. Go-to `HydroSHEDS website <https://www.hydrosheds.org/>`_ and click :guilabel:`Download`. 

  .. image:: /static/3/areal_mean_rainfall/images/hydrosheds1.png
    :align: center
    

2. Select :menuselection:`HydroBASINS --> North America and Caribbean --> hybas_na_lev06_v1c.zip` 

  .. image:: /static/3/areal_mean_rainfall/images/hydrosheds2.png
    :align: center
    


3. Enter the mail address and click :guilabel:`Submit Request` to Download the data.

  .. image:: /static/3/areal_mean_rainfall/images/hydrosheds3.png
    :align: center
    

It is good to download the data by yourself for the exercise but you can also download a copy of the data from the link below

`florida_2020_07_prcp <https://www.qgistutorials.com/downloads/florida_2020_07_prcp.csv>`_

`hybas_na_lev06_v1c <https://www.qgistutorials.com/downloads/hybas_na_lev06_v1c.zip>`_ 

`cb_2018_us_state_500k <https://www.qgistutorials.com/downloads/cb_2018_us_state_500k.zip>`_ 

Procedure
---------

1. Open QGIS and click on the :guilabel:`Open Data Source Manager`. 

  .. image:: /static/3/areal_mean_rainfall/images/01.png
    

2. In the :guilabel:`Data Source Manager` dialog box, switch to :guilabel:`Delimited Text`. Click on the ``…``  in :guilabel:`File name` then browse and select the ``florida_2020_07_prcp.csv`` 

  .. image:: /static/3/areal_mean_rainfall/images/02.png
    


3. Now, under :guilabel:`Geometry Definition` choose :guilabel:`Point coordinates`, :guilabel:`X field` and :guilabel:`Y field` should be :guilabel:`Longitude` and :guilabel:`Latitude` respectively. Choose the :guilabel:`Geometry CRS` as :guilabel:`EPSG 4326 - WGS 84`. Click :guilabel:`Add`. 

  .. image:: /static/3/areal_mean_rainfall/images/03.png
    

4. Now a new point layer will be added, click on the :guilabel:`Open Attribute Table` icon. 

  .. image:: /static/3/areal_mean_rainfall/images/04.png
    

5. In the Attribute table the field :guilabel:`PRCP` represents the amount of precipitation in the station during the July 2020. Also, this data is recorded in *inches*.  Note there are few ``Null`` values which can cause problems during calculation. Sort the PRCP column, and you would see there is only a small fraction of the dataset is Null. We will now remove the stations with Null values.

  .. image:: /static/3/areal_mean_rainfall/images/05.png
    

6. Open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector selection --> Extract by attribute`. 

  .. image:: /static/3/areal_mean_rainfall/images/06.png
    

7. In the :guilabel:`Extract by Attribute` dialog box, Select the :guilabel:`Input layer` as ``florida_2020_07_prcp``, then choose ``PRCP`` in :guilabel:`Selection attribute`, then ``is not null`` in :guilabel:`Operator`. Click on the ``…`` next to :guilabel:`Extracted(attribute)`, choose :guilabel:`Save to File...`, enter the layer name as ``precipitation_filtered.gpkg`` and click :guilabel:`Run`.

  .. image:: /static/3/areal_mean_rainfall/images/07.png
    

8. Now a new layer is added to canvas, turn off the older layer, and you can see the station with Null value has been removed. 

  .. image:: /static/3/areal_mean_rainfall/images/08.png
    

9. Now to generate the thiessen polygon, open the processing toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector Geometry --> Voronoi polygon`. 

  .. image:: /static/3/areal_mean_rainfall/images/09.png
    

10. Select ``precipitation_filtered`` as the :guilabel:`Input layer`. Since we do not have data for any rain-gauge stations outside the basin boundary, we can add some buffer extent. Enter ``15`` as the :guilabel:`Buffer region (% of extent)`. Click on the ``…`` in :guilabel:`Voronoi polygons` and select :guilabel:`Save to File…`, then enter the name as ``thiessen_polygons.gpkg``. Click :guilabel:`Run`.

  .. image:: /static/3/areal_mean_rainfall/images/10.png
    

11.   Now a new layer is added to canvas, lets clip this layer with the state boundary, Search for ``cb_2018_us_state_500k.shp`` file in :guilabel:`Browser` then click and drag it to canvas. 

  .. image:: /static/3/areal_mean_rainfall/images/11.png
    

12. In :guilabel:`Select Transformation` Dialog box, leave the setting to default and click :guilabel:`OK`. 

  .. image:: /static/3/areal_mean_rainfall/images/12.png
    

13. We will now clip the ``thiessen polygons`` layer to the Florida state boundary. Click on the  :guilabel:`Select Feature by area or Single Click icon` and click over Florida state. 

  .. image:: /static/3/areal_mean_rainfall/images/13.png
    

14. Open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector overlay --> Clip`. 

  .. image:: /static/3/areal_mean_rainfall/images/14.png
    


15. In the :guilabel:`Clip` dialog box, select the :guilabel:`Input layer` as ``thiessen_polygon``, in the :guilabel:`Overlay layer` select the ``cb_2018_us_state_500K layer`` and check the :guilabel:`Selected features only` checkbox, then click on the ``…`` in :guilabel:`Clipped` and select :guilabel:`Save to File...` , then enter the name as ``thiessen_polygon_clipped.gpkg``. Click :guilabel:`Run`.

  .. image:: /static/3/areal_mean_rainfall/images/15.png
    


16. Now a new layer will be added to canvas, these polygons are also called as *area weighted polygon*. Now turnoff all other layer and load the ``hybas_na_lev06_v1c.shp`` by click and drag from the :guilabel:`Browser` to canvas. 

  .. image:: /static/3/areal_mean_rainfall/images/16.png
    


17. Our task is to calculate the average rainfall in each basin. Each basin is covered by many thiessen polygons. We will now intersect both the layers to cut the thiessen polygons to the boundary of each basin. To visualise this :guilabel:`Open layer styling panel` icon and change the :guilabel:`Opacity` to ``75%``.

  .. image:: /static/3/areal_mean_rainfall/images/17.png
    


18. Open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector overlay -->  Intersection`.

  .. image:: /static/3/areal_mean_rainfall/images/18.png
    


19. In the :guilabel:`Intersection` dialog box, select the :guilabel:`Input layer` as ``thessen_polygon_clipped`` and :guilabel:`Overlay layer` as ``hybas_na_lev06_v1c``, then click on the ``…`` in :guilabel:`Clipped` and select :guilabel:`Save to File...` , then enter the name as ``thiessen_polygon_basin.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/areal_mean_rainfall/images/19.png
    


20. The execution will fail with an error message *has invalid geometry. Please fix the geometry or change the Processing setting to the “Ignore invalid input features” option.*. 

  .. image:: /static/3/areal_mean_rainfall/images/20.png
    


.. note:: 

  Learn more about `invalid geometries <https://www.qgistutorials.com/en/docs/3/handling_invalid_geometries.html>`_ in this tutorial. 

21. To fix the geometries, open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector geometry --> Fix geometries`.

  .. image:: /static/3/areal_mean_rainfall/images/21.png
    

22. In the :guilabel:`Fix Geometries` dialog box select the :guilabel:`Input layer` as ``hybas_na_lev06_v1c`` and click on ``…`` on :guilabel:`Fixed geometries` and select the :guilabel:`Save to File`, enter the file name as ``hybas_na_lev06_v1c_fixed.gpkg`` and click :guilabel:`Run`.

  .. image:: /static/3/areal_mean_rainfall/images/22.png
    

23. Now a new layer will be added to canvas, lets retrieve the intersection dialog box from the history and change the Overlay layer alone. Click :menuselection:`Processing --> History`.

  .. image:: /static/3/areal_mean_rainfall/images/23.png
    

24. Double-click on the latest interaction Algorithm.

  .. image:: /static/3/areal_mean_rainfall/images/24.png
    

25. Change the :guilabel:`Overlay layer` to ``hybas_na_lev06_v1c_fixed`` and click :guilabel:`Run`.

  .. image:: /static/3/areal_mean_rainfall/images/25.png
    

26. Now a new layer will be loaded, and you can see the ``thiessen_polygon_basin`` is clipped based on the basin boundary.   

  .. image:: /static/3/areal_mean_rainfall/images/26.png
    

27. Now, let’s calculate the average rainfall value from the thiessen polygons for each basin. This is done using the ``Aggregate`` tool which allows us to dissolve individual polygons while calculating statistics on the attribute values. Now, open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector geometry --> Aggregate`. 

  .. image:: /static/3/areal_mean_rainfall/images/27.png
    

28. In the :guilabel:`Aggregate` dialog box choose :guilabel:`Input layer` as ``thiessen_polygon_basin``, select all fields except ``PRCP`` and ``HYBAS_ID`` and click :guilabel:`Delete selected field`.

  .. image:: /static/3/areal_mean_rainfall/images/28.png
    

29. In :guilabel:`Group by expression` select ``HYBAS_ID``, under :guilabel:`Aggregates`, in :guilabel:`PRCP` click on the :guilabel:`expression` button to enter the below expression and change the :guilabel:`Aggregate Function` to ``sum``. The result of the expression and aggregation will be the area-weighted mean of precipitation from all thiessen polygons within each basin. Now in :guilabel:`HYBAS_ID`, change the :guilabel:`Aggregate Function` to ``first_value``. Click on ``…`` on :guilabel:`Aggregated` and select the :guilabel:`Save to File`, enter the file name as ``areal_mean_rainfall.gpkg`` and click :guilabel:`Run`.

  .. code-block:: none
  
    (PRCP * $area) / sum($area)

  .. image:: /static/3/areal_mean_rainfall/images/29.png
    


30. A new layer will be added to canvas, lets open the Attribute table to explore. Click on the :guilabel:`Open Attribute Tabel` icon. 

  .. image:: /static/3/areal_mean_rainfall/images/30.png
    

31. The field :guilabel:`PRCP` contains the areal mean rainfall for each basin in inches. 

  .. image:: /static/3/areal_mean_rainfall/images/31.png
    