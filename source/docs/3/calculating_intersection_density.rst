Calculating Street Intersection Density (QGIS3)
================================================

Street intersection density is a useful measure of network connectivity. One can extract and aggregate street intersections over a regular grid to calculate the density. This analysis is commonly used in transportation design as well as urban planning in the design of more walkable neighborhoods. With the availability of an easily accessible and global street network dataset from OpenStreetMap and QGIS, we can easily calculate and visualize intersection density for any region of the world.

Overview of the task
--------------------

In this tutorial, we will take OpenStreetMap road network data and calculate the street intersection density, and generate a map for the city of Chennai in India. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- How to download OpenStreetMap data as shapefiles and clip it to your area of interest. 
- How to create grids in QGISIS 

Get the data
------------

We will use the data from `opencities <https://opencity.in/data/chennai-gcc-greater-chennai-corporation-wards-map>`_ to get city boundary, then the road network data from `OpenStreetMap Data Extracts <https://download.geofabrik.de/asia/india.html>`_. 

Download the city boundary
^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Visit the `opencity <https://opencity.in/>`_ website, then search for “Chennai wards map”. 

  .. image:: /static/3/calculating_intersection_density/images/data1.png
     :align: center

2. Click on the first link and download the data in KML format. A layer ``Chennai-wards-2011.kml`` will be downloaded. 

  .. image:: /static/3/calculating_intersection_density/images/data2.png
     :align: center


Download the road network data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Visit the `OpenStreetMap Data Extracts download <https://download.geofabrik.de/>`_ server by GEOFABRIK website. For this tutorial, we need the data for the city of Chennai in India. Click :guilabel:`Asia`.  

  .. image:: /static/3/calculating_intersection_density/images/data3.png
     :align: center

2. Now in :guilabel:`sub-regions`, select :guilabel:`India`. 

  .. image:: /static/3/calculating_intersection_density/images/data4.png
     :align: center

3. The ``india-latest-free.shp.zip`` is the file we are looking for click it to download, this data can be downloaded in other formats also as per requirement.  

  .. image:: /static/3/calculating_intersection_density/images/data5.png
     :align: center

4. This is a large download containing an extract of data for the entire country. Unzip the ``india-latest-free.shp.zip``. You will get many shapefile layers. 

  .. image:: /static/3/calculating_intersection_density/images/data6.png
     :align: center

Clip road network to city boundary
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. We will now clip the country-level roads layer to our area of interest. Open QGIS, and drag and drop the ``Chennai-wards-2011.kml``. 

  .. image:: /static/3/calculating_intersection_density/images/data7.png
     :align: center

2. Instead of opening a large layer in QGIS, we can directly read it from the disk and clip it. Open the Processing Toolbox and locate the :menuselection:`Vector overlay --> Clip`. Double-click to open it.

  .. image:: /static/3/calculating_intersection_density/images/data8.png
     :align: center

3.  In the :guilabel:`Input layer` select the ``…`` and click on :guilabel:`Browse for Layer...`

  .. image:: /static/3/calculating_intersection_density/images/data9.png
     :align: center

4. Navigate and select ``gis_osm_roads_free_1.shp``, in the :guilabel:`Overlay layer` choose  ``New Wards from Oct 2011``. Then click  ``…`` in :guilabel:`Clipped` and select :guilabel:`Save to File…`, enter the name as ``chennai_roads.gpkg``, and click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/data10.png
     :align: center

5. Now a layer ``chennai_road`` will be loaded in the canvas. 

  .. image:: /static/3/calculating_intersection_density/images/data11.png
     :align: center


For convenience, you may directly download a copy of the dataset from the link below:

- `chennai_wards_2011.kml <https://www.qgistutorials.com/downloads/Chennai_Wards_2011.kml>`_
- `chennai_roads.gpkg <https://www.qgistutorials.com/downloads/chennai_roads.gpkg>`_

Data source [OPENCITIES]_ [GEOFABRIK]_


Procedure
---------

1. Now both layers used for the calculation will be available, if you have downloaded the data, then locate the ``Chennai-Wards-2011.kml`` and ``chennai_roads.gpkg`` in :guilabel:`Browser`, then drag and drop them on canvas. 

  .. image:: /static/3/calculating_intersection_density/images/image1.png
     :align: center

2. The first task is to extract the road intersections. This can be done using the built-in Line intersections tool. Let’s test this on a small subset first to see if the results are satisfactory. Select the roads layer, use the :guilabel:`Select features by Area` tool and select a few roads.

  .. image:: /static/3/calculating_intersection_density/images/image2.png
     :align: center

3. Open the Processing Toolbox and locate the :menuselection:`Vector overlay --> Line intersections tool`. Double-click to open it.

  .. image:: /static/3/calculating_intersection_density/images/image3.png
     :align: center


4. Select ``chennai_roads`` as both :guilabel:`Input layer` and :guilabel:`Intersect layer`. Make sure to check the :guilabel:`Selected features only`. Click :guilabel:`Run`.

  .. image:: /static/3/calculating_intersection_density/images/image4.png
     :align: center

5.  A new layer ``Intersections`` will be added. You will notice that while most intersection points are correct, there are some false positives. This is because the algorithm considers intersections of each line segment as a valid intersection. But for our analysis, we need to extract only the intersections when 2 or more streets intersect.

  .. image:: /static/3/calculating_intersection_density/images/image5.png
     :align: center

6. Remove the Intersections layer and click :guilabel:`Deselect features from all layers` button to remove the selection. We will now merge all adjacent road segments, so the segments between intersections are merged into a single feature. Open the Processing Toolbox and locate the :guilabel:`Vector geometry --> Dissolve` tool. Double-click to open it.

  .. image:: /static/3/calculating_intersection_density/images/image6.png
     :align: center


7. Select ``chennai_roads`` as the :guilabel:`Input layer`. Enter the Dissolved output layer name as ``roads_dissolved.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/image7.png
     :align: center

8. The resulting layer ``roads_dissolved`` has all the road segments merged into a single feature.

  .. image:: /static/3/calculating_intersection_density/images/image8.png
     :align: center

9. Next, open the Processing Toolbox and locate :menuselection:`Vector geometry --> Multipart to single parts` tool. Double-click to open it. Select ``roads_dissolved`` layer as the :guilabel:`Input layer`. Enter ``roads_singleparts.gpkg`` as the Single parts output. Click :guilabel:`Run`.

  .. image:: /static/3/calculating_intersection_density/images/image9.png
     :align: center


10. The resulting layer ``roads_singleparts`` will have all adjacent segments merged, remove the ``roads_dissolved`` and ``chennai_roads`` layers. Now, open the Processing Toolbox and locate :menuselection:`Vector overlay --> Line intersections` algorithm. Double-click to launch it.

  .. image:: /static/3/calculating_intersection_density/images/image10.png
     :align: center


11. Select ``roads_singleparts`` as both the :guilabel:`Input layer` and the :guilabel:`Intersect layer`. Name the :guilabel:`Intersections` output layer as ``roads_line_intersections.gpkg``. Click Run.

  .. image:: /static/3/calculating_intersection_density/images/image11.png
     :align: center

.. note::

   This is a computationally intensive operation and may take longer depending on your computer processing capacity. 

12. The resulting layer ``roads_line_intersections`` now have all intersections correctly identified. But it is still not perfect. Use the :guilabel:`Select features by Area tool` and select any intersection. You will see that at each intersection there are few duplicate points from adjacent segments. If we use this layer for further analysis, it will result in an inflated number of intersections. Let’s remove duplicates, open the Processing Toolbox and locate the :menuselection:`Vector general --> Delete duplicate geometries` tool. Select ``roads_line_intersections`` as the :guilabel:`Input layer` and enter ``road_intersections.gpkg`` as the :guilabel:`Cleaned` output layer. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/image12.png
     :align: center

13. Now remove the ``road_line_intersections`` layer. The new layer ``road_intersections`` layer has the correct number of road intersections extracted from the source layer.

  .. image:: /static/3/calculating_intersection_density/images/image13.png
     :align: center


14. We will now compute the density of points by overlaying a regular grid and counting points in each grid polygon. We must reproject the data to a projected CRS so we can use linear units of measurements. We can use an appropriate CRS based on the UTM zone where the city is located. Open the Processing Toolbox and locate the :menuselection:`Vector general --> Reproject` layer. Double click to open it. 

  .. image:: /static/3/calculating_intersection_density/images/image14.png
     :align: center

15. Select ``road_intersections`` as the :guilabel:`Input layer`. Search by clicking the :guilabel:`globe` icon next to :guilabel:`Target CRS` and select ``EPSG:32664 - WGS 84 / UTM zone 44N``. Enter the :guilabel:`Reprojected` output layer as ``road_intersections_reprojected.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/image15.png
     :align: center

16. Once the processing finishes and the ``road_intersections_reprojected`` layer is added, right-click and select Layer :menuselection:`CRS --> Set Project CRS from Layer`. And remove the ``road_intersections`` layer. 

  .. image:: /static/3/calculating_intersection_density/images/image16.png
     :align: center


17. Now we can create the grid. Open the Processing Toolbox and locate the :menuselection:`Vector creation --> Create grid`. Double click to open. 

  .. image:: /static/3/calculating_intersection_density/images/image17.png
     :align: center

18. Select :guilabel:`Grid` type as :guilabel:`Rectangle (Polygon)`. Click the  ``...``  button in :guilabel:`Grid extent` and select :menuselection:`Calculate from Layer --> road_intersections_reprojected`.

  .. image:: /static/3/calculating_intersection_density/images/image18.png
     :align: center

19. Select the Project CRS as the Grid CRS. Set both :guilabel:`Horizontal spacing` and :guilabel:`Vertical spacing` as ``1000`` meters. Save the :guilabel:`Grid` output layer as ``grid.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/image19.png
     :align: center


20. The ``grid`` layer containing rectangular grid polygons will be created. We can now count the number of points in each polygon, but since our layers are large, this process can take a long time. One way to speed up spatial operations is to use a *Spatial Index*. Open the Processing Toolbox and locate the :guilabel:`Vector general --> Create spatial index` tool. Double click to open it. 

  .. image:: /static/3/calculating_intersection_density/images/image20.png
     :align: center

21. Select ``grid`` layer and click :guilabel:`Run`, now the layer will have spatial index which can boost the performance of computation with this layer.

  .. image:: /static/3/calculating_intersection_density/images/image21.png
     :align: center

22. Open the Processing Toolbox and locate the :menuselection:`Vector analysis --> Count points in polygon` algorithm.

  .. image:: /static/3/calculating_intersection_density/images/image22.png
     :align: center

23. Select ``grid`` as the :guilabel:`Polygon layer` and ``road_intersections_reprojected`` as the :guilabel:`Points layer`. Save the :guilabel:`Count` output layer as ``grid_count.gpkg``. Click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/image23.png
     :align: center

24. The resulting layer ``grid_count`` will have an attribute :guilabel:`NUMPOINTS` which contains the number of intersection points within each grid. There are many grids with 0 points. It will help our analysis and visualization to remove grid polygons that have no intersections. Open the Processing Toolbox and locate the :guilabel:`Vector selection --> Extract by attribute` algorithm.  

  .. image:: /static/3/calculating_intersection_density/images/image24.png
     :align: center

25. Select ``grid_count`` as the :guilabel:`Input layer`, then select ``NUMPOINTS`` in :guilabel:`Selection attribute`, ``>`` in :guilabel:`Operator` and enter ``0`` as the :guilabel:`Value`. Save the :guilabel:`Extracted (attribute)` output layer as ``grid_counts_chennai.gpkg``. Click :guilabel:`Run`.

  .. image:: /static/3/calculating_intersection_density/images/image25.png
     :align: center

26. The resulting layer ``grid_counts_chennai`` will have grid polygons over the chennai city and contains the number of road intersections as an attribute for each polygon. Remove all layers except ``grid_counts_chennai``.   

  .. image:: /static/3/calculating_intersection_density/images/image26.png
     :align: center


27. Let’s clean up the attribute table of our data layer. The preferred method to make any changes to the attribute table is to use a processing algorithm called Refactor Fields, open the Processing Toolbox and locate the :menuselection:`Vector table --> Refactor Fields`. Double-click to open it. Click on any row in the :guilabel:`Field Mapping` section to select it. You can hold the :kbd:`Shift` key to select multiple rows, select all fields except :guilabel:`fid` and :guilabel:`NUMPOINTS`. Click the :guilabel:`Delete selected fields` button. 

  .. image:: /static/3/calculating_intersection_density/images/image27.png
     :align: center

28. Rename the :guilabel:`NUMPOINTS` as ``intersection_density`` and save the layer as ``road_intersectionDensity.gpkg``, click :guilabel:`Run`. 

  .. image:: /static/3/calculating_intersection_density/images/image28.png
     :align: center

29. Let's style this layer to view the density of each grid, select the ``road_intersectionsDensity`` and click :guilabel:`Open the Layer Styling Panel`. Select :guilabel:`Graduated` renderer, and in :guilabel:`Values` select :guilabel:`Intersection Density`, a :guilabel:`Color ramp` of your choice, set the :guilabel:`classes` to ``7`` and click :guilabel:`Classify`.

  .. image:: /static/3/calculating_intersection_density/images/image29.png
     :align: center


30. In the values enter ``0-50``, ``50-100``, ``100-150`` and so on upto ``300 - 350``. 

  .. image:: /static/3/calculating_intersection_density/images/image30.png
     :align: center