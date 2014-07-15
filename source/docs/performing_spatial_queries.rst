Performing Spatial Queries
==========================
.. only:: html

   [ Download PDF `A4 <../pdf/performing_spatial_queries_a4.pdf>`_ `Letter
   <../pdf/performing_spatial_queries_letter.pdf>`_ ]

Spatial queries are core to many types of GIS analysis. In QGIS, this
functionality is available via the **Spatial Query** plugin.

Overview of the task
--------------------

We will be working with 2 datasets - a lines layer representing rivers and a
point layer representing cities. The task is to run a spatial query to find all
cities that are within 10 kms of a river.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Opening .zip files directly in QGIS.
- Choosing an appropriate projection and re-projecting vector data.
- Creating buffers.
- Selecting features using SQL-like expressions.
- Coverting a shpefile to a KML file.
- Validating your results using Google Earth.

Get the data
------------

We will use ``ne_10m_rivers_lake_centerlines`` and
``10m_populated_places_simple`` datasets from Natural Earth.


Download `Rivers and Lake Centerlines
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/
10m/physical/ne_10m_rivers_lake_centerlines.zip>`_

Download `Populated Places
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/
10m/cultural/ne_10m_populated_places_simple.zip>`_.

Data Source: [NATURALEARTH]_

Procedure
---------

1. Once you have downloaded the data, open QGIS. Go to
   :menuselection:`Layer --> Add Vector Layer`.

.. image:: /static/performing_spatial_queries/images/1.png
   :align: center

2. Click :guilabel:`Browse` and navigate to the folder where you downloaded the
   zip files.

.. image:: /static/performing_spatial_queries/images/2.png
   :align: center

3. Hold the :kbd:`Shift` key and click on both the zip files to select them.
   Click :guilabel:`Open`.

.. image:: /static/performing_spatial_queries/images/3.png
   :align: center

4. You will be asked to choose a layer from the zip archive.
   Select ``ne_10m_rivers_lake_centerlines.shp`` and click :guilabel:`OK`.

.. image:: /static/performing_spatial_queries/images/4.png
   :align: center

5. Since you have selected multiple files, repeat the process for the next file.
   Select 10m_populated_places_simple.shp and click :guilabel:`OK`.

.. image:: /static/performing_spatial_queries/images/5.png
   :align: center

6. You will see both the shapefiles now loaded in QGIS.

.. image:: /static/performing_spatial_queries/images/6.png
   :align: center

7. We will be created buffers around the point and line layers. The `Buffer`
   geoprocessing tool in QGIS uses `layer units` to calculate buffer distances.
   The layers we have are in `Geographic Coordinate Reference System (CRS)` with
   the unit of `degrees`. This is not appropriate as we want our analysis to use
   `metres` or `kilometres`. To achive this, we must re-project our layers to a
   `Projected Coordinate Reference System (CRS)`. Right-click on the
   ``10m_populated_places_simple layer`` and choose :guilabel:`Save As`.

.. image:: /static/performing_spatial_queries/images/7.png
   :align: center

8. In the :guilabel:`Save vector layer as...` dialog, click :guilabel:`Browse`
   next to :guilabel:`Save as` and select the output file location. Name the
   output file as ``populated_places_reprojected.shp``. Next, click the
   :guilabel:`Browse` button next to :guilabel:`CRS`.

.. image:: /static/performing_spatial_queries/images/8.png
   :align: center

9. Now we must choose an appropriate CRS for our purpose. For creating buffers,
   a Azimuthal Equidistant projection would be best suited as radial distances
   around the center of the projection are accurate. In our case, since the
   dataset is global, we will choose a world projection. In the
   :guilabel:`Coordinate Reference System Selector` dialog, start searching for
   `world az..` and you will see the results show up. Select the
   `World_Azimuthal_Equidistant` and click :guilabel:`OK`.

.. note::

   The `World_Azimuthal_Equidistant` projection spans 90 degrees from the
   origin. Here the origin being 0 degrees longitude, the only data contained
   within +/- 90 degrees longitude will be converted.

.. image:: /static/performing_spatial_queries/images/9.png
   :align: center


10. Back in :guilabel:`Save vector layer as ...` dialog, check the box next to
    :guilabel:`Add saved file to map` and click `OK`.

.. image:: /static/performing_spatial_queries/images/10.png
   :align: center

11. Repeat the re-projection process for the ``ne_10m_rivers_lake_centerlines``
    layer and save the new layer as ``rivers_lake_reprojected.shp``.

.. image:: /static/performing_spatial_queries/images/11.png
   :align: center

12. Now you will have 4 layers in your :guilabel:`Layers Panel`. Un-check the
    boxes next to the original layers to display only the re-projected layers.
    The re-projected layers are still being shown in the `Geographic CRS`
    because of a setting. Let's turn that off. Click on the
    :guilabel:`Project Properties` button. This setting can also be accessed
    from :menuselection:`Project --> Project Properties`.

.. image:: /static/performing_spatial_queries/images/12.png
   :align: center

13. In the :guilabel:`CRS` tab of the :guilabel:`Project Properties` dialog,
    un-check the box next to :guilabel:`Enable on-the-fly CRS transformation`.
    Click :guilabel:`OK`.

.. image:: /static/performing_spatial_queries/images/13.png
   :align: center

14. Back in the main QGIS window, right-click on any one of the re-projected
    layers and select :guilabel:`Zoom to Layer Extent`.

.. image:: /static/performing_spatial_queries/images/14.png
   :align: center

15. Now you will see the data in the layer's CRS. We will now create buffers for
    both the datasets. Click :menuselection:`Vector --> Geoprocessing Tools -->
    Buffer`.

.. image:: /static/performing_spatial_queries/images/15.png
   :align: center

16. In the :guilabel:`Buffer` tool, select ``populated_places_reprojected``
    layer as Input. Enter the buffer distance as `10000`. Note that we want a
    buffer of 10kms and since the CRS units are metres, we need to enter 10,000.
    Enter the output file name as ``populated_places_buffer.shp``. Click
    :guilabel:`OK`.

.. image:: /static/performing_spatial_queries/images/16.png
   :align: center

17. Once the buffer processing is over, click the :guilabel:`Yes` to add the
    newly created layer to the TOC.

.. image:: /static/performing_spatial_queries/images/17.png
   :align: center

18. Repeat the same buffer process for the ``rivers_lake_reprojected`` layer and
    create an output file named ``rivers_lake_buffer.shp``.

.. image:: /static/performing_spatial_queries/images/18.png
   :align: center

19. The ``rivers_lake_buffer`` contains features that are both rivers as well as
    lakes. Our analysis calls for using only river features, so we will run a
    query to select only river features. Right-click on the
    ``rivers_lake_buffer`` layer and select :guilabel:`Open Attribute Table`.

.. image:: /static/performing_spatial_queries/images/19.png
   :align: center

20. You will see that the `featurecla` attribute contains the information we can
    use to select the river features. Click on `Select features using an
    expression` button.

.. image:: /static/performing_spatial_queries/images/20.png
   :align: center

21. Enter the expression `"featurecla" = "River"` and click :guilabel:`Select`
    and then click :guilabel:`Close` to back to the main QGIS window.

.. image:: /static/performing_spatial_queries/images/21.png
   :align: center

22. Now we are ready to perform the spatial query. You need to enable the
    `Spatial Query plugin` to use this functionality. See :doc:`using_plugins`
    for more details. Once enabled, go to :menuselection:`Vector --> Spatial
    Query --> Spatial Query`.

.. image:: /static/performing_spatial_queries/images/22.png
   :align: center

23. For our query, we want to select features from the buffered places that
    intersect with the buffered river lines. Make sure the checkbox next to
    `selected geometries` is checked. This is to ensure the query uses only
    river features that we selected previously. Click :guilabel:`Apply`.

.. image:: /static/performing_spatial_queries/images/23.png
   :align: center

24. Once the query is complete, you will see a new section named
    :guilabel:`Selected features`. Click on the :guilabel:`Create layer with
    selected` button. A new layer will be added to the `Layers Panel`. Click
    :guilabel:`Close`.

.. image:: /static/performing_spatial_queries/images/24.png
   :align: center

25. Zoom-in to any area and compare the results. You will notice that the new
    layer contains only the features that intersect with river buffers.

.. image:: /static/performing_spatial_queries/images/25.png
   :align: center

26. We should always verify my results to ensure the analysis is not flawed. One
    way to verify the results is to export this layer as a KML file and load it
    up in Google Earth. You can check if the areas you found really are within
    10kms of a river. Right-click the layer and :guilabel:`Save As...`.

.. image:: /static/performing_spatial_queries/images/26.png
   :align: center

27. In the :guilabel:`Save vector layer as...`, choose `WGS84` as the CRS. This
    because KML format needs the coordinates to be in this CRS. Name your KML as
    ``cities_near_river.kml``.

.. image:: /static/performing_spatial_queries/images/27.png
   :align: center

28. Open Google Earth and verify that the cities represented by these buffers
    are indeed close to rivers.

.. image:: /static/performing_spatial_queries/images/28.png
   :align: center
