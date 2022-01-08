Georeferencing Topo Sheets and Scanned Maps (QGIS3)
===================================================
Most GIS projects require georeferencing some raster data. *Georeferencing* is the process of assigning real-world coordinates to each pixel of the raster. Many times these coordinates are obtained by doing field surveys - collecting coordinates with a GPS device for few easily identifiable features in the image or map. In some cases, where you are looking to digitize scanned maps, you can obtain the coordinates from the markings on the map image itself. Using these sample coordinates or GCPs ( Ground Control Points ), the image is warped and made to fit within the chosen coordinate system. In this tutorial I will discuss the concepts, strategies and tools within QGIS to achieve a high accuracy georeferencing.

This tutorial is to geo-reference an image which has coordinates information available on the map image itself (i.e. grids with labels). If your source image does not have such information, you can use the method outlined in :doc:`advanced_georeferencing` 

Overview of the task
--------------------

We will use a scanned map of southern India from 1870 and geo-reference it using QGIS.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- How to determine datum and coordinate system for old maps.
- Save the GCP created.
- Edit the created GCP for fine tuning. 

Get the data
------------
`Hipkiss’s Scanned Old Maps <http://www.hipkiss.org/data/maps.html>`_ website has an excellent collection out-of-copyright scanned maps that one can use for research.

Download the `1870 map of southern India <http://www.hipkiss.org/data/maps/william-mackenzie_gallery-of-geography_1870_southern-india_3975_3071_600.jpg>`_ and save it as a JPG image on your hard drive. 

For convenience, you may directly download a copy of the dataset from the link below:

`1870_southern_india.jpg <https://www.qgistutorials.com/downloads/1870_southern-india.jpg>`_ 

Procedure
---------

1. Open QGIS and click on :menuselection:`Raster --> Georeferencer` to open the tool.

  .. image:: /static/3/georeferencing_basics/images/01.png
     :align: center

2. The Georeferencer is divided into 2 sections. The top section where the image will be displayed and the bottom section where a table showing your GCPs will appear.

  .. image:: /static/3/georeferencing_basics/images/02.png
     :align: center

3. Now we will open our JPG image. Go to :menuselection:`File --> Open Raster`. Browse to the downloaded image of the scanned map and click :guilabel:`Open`. 

  .. image:: /static/3/georeferencing_basics/images/03.png
     :align: center

4. You will see the image will be loaded on the top section. You can use the zoom/pan controls in the toolbar to learn more about the map.

  .. image:: /static/3/georeferencing_basics/images/04.png
    :align: center

5. Now we need to assign coordinates to some points on this map. If you look closely, you will see coordinate grid with markings. These are Latitude and Longitude  grid lines.

  .. image:: /static/3/georeferencing_basics/images/05.png
     :align: center

6. Before adding Ground Control Points (GCP), we need to define the Transformation Settings. Click on the gear icon in georeferencing window to open the Transformation settings dialog.

  .. image:: /static/3/georeferencing_basics/images/06.png
     :align: center

7. In the :guilabel:`Transformation settings` dialog, choose the :guilabel:`Transformation type` as ``Polynomial 2``. See `QGIS Documentation <https://docs.qgis.org/testing/en/docs/user_manual/working_with_raster/georeferencer.html?highlight=georeferencer#available-transformation-algorithms>`_ to learn about different transformation types and their uses. Then select the :guilabel:`Resampling method` as the ``Nearest neighbor``. Click the :guilabel:`Select CRS` button next to :guilabel:`Target SRS`.

  .. image:: /static/3/georeferencing_basics/images/07.png
     :align: center

8. If you are geo-referencing a scanned map like this, you can obtain the CRS information from the map itself. Looking at our map image, the coordinates are in Latitude/Longitude. There is no datum information given, so we have to assume an appropriate one. Since it is India and the map is quite old, we can bet the Everest 1830 datum would give us good results. Search for ``everest`` and select the CRS with oldest definition of the Everest datum (EPSG:4042). Click :guilabel:`OK`.

  .. image:: /static/3/georeferencing_basics/images/08.png
     :align: center

   
.. note::

  Survey of India Topo Sheets created between the year 1960 and 2000 use the Everest 1956 spheroid and India_nepal datum. If you are georeferencing SOI Topo Sheets, , you can define a Custom CRS in QGIS with the following paramters and use it in this step. This definition includes a delta_x, delta_y and delta_z parameters for transforming this datum to WGS84. See this page for more information on the `Indian Grid System <https://deeppradhan.heliohost.org/gis/indian-grid/>`_.
  
  .. code-block:: none
    
    +proj=longlat +a=6377301.243 +b=6356100.2284 +towgs84=295,736,257,0,0,0,0 +no_defs

.. note:: 

  Most maps are created using a Projected CRS. If the map you are trying to georeference uses a projected CRS that you know of, but the graticules labels are in a Geographic CRS (latitude/longitude), you may use an alternate workflow to minimize distortion. Instead of using a Geographic CRS like we are using here, you can create a vector grid in QGIS and transform it to the projected CRS to be used as a reference for accurate coordinate capture. See `this page <https://raisedbeaches.net/2018/02/01/georeferencing-in-qgis/>`_ for more details.

9. Name your output raster as  ``1870_southern_india_modified.tif``. Choose ``LZW`` as the :guilabel:`Compression`. Check the :guilabel:`Save GCP points` to store the points as seperate file for future purpose. Make sure the :guilabel:`Load in QGIS when done` option is checked. Click :guilabel:`OK`.

  .. image:: /static/3/georeferencing_basics/images/09.png
     :align: center

.. note::

  Uncompressed GeoTIFF files can be very large in size. So compressing them is always a good idea. You can learn more about different TIFF compression options (LZW, PACKBITS or DEFLATE) in `this article <https://kokoalberti.com/articles/geotiff-compression-optimization-guide>`_.

10. Now we can start adding the Ground Control Points (GCP).  Click on the :guilabel:`Add Point` button. 

  .. image:: /static/3/georeferencing_basics/images/10.png
     :align: center
  
  
11. Now place the cross-hair at the intersections of the grid lines and left-click, this will serve as the *ground-truth* in our case. As the grid lines are labeled, we can determine the X and Y coordinates of the points using them. In the pop-up window, enter the coordinates. Remember that X=longitude and Y=latitude. Click :guilabel:`OK`. 

  .. image:: /static/3/georeferencing_basics/images/11.png
     :align: center

12. You will notice the GCP table now has a row with details of your first GCP.

  .. image:: /static/3/georeferencing_basics/images/12.png
     :align: center

13 . Similarly, add more GCPs covering the entire image. The more points you have, the more accurate your image is registered to the target coordinates. The ``Polynomial 2`` transform requires at least 6 GCPs. Once you have added the minimum number of points required for the transform, you will notice that the GCPs now have a non-zero ``dX``, ``dY`` and ``Residual`` error values. If a particular GCP has unusually high error values, that usually means a human-error in entering the coordinate values. So you can delete that GCP and capture it again. You can also edit the coordinate values in the :guilabel:`GCP Table` by clicking the cell in either :guilabel:`Dest. X` or :guilabel:`Dest. Y` columns. 

  .. image:: /static/3/georeferencing_basics/images/13.png
     :align: center

14. Once you are satisfied with the GCPs, click the :guilabel:`Start Georeferencing` button. This will start the process of warping the image using the GCPs and creating the target raster.

  .. image:: /static/3/georeferencing_basics/images/14.png
     :align: center

15. Once the process finishes, you will see the georeferenced layer loaded in QGIS. The georeferencing is now complete. Also, you will notice the Project CRS in the bottom right is set to *EPSG:4042* as described in Transformation Settings. 

  .. image:: /static/3/georeferencing_basics/images/15.png
     :align: center
16. Drag and drop the ``OpenStreetMap`` as Base Map from the :guilabel:`XYZ Tiles` dropdown at the bottom of the Browser panel to verify the georeferenced layer. To set the transparency, click on the :guilabel:`Open layer styling panel` icon  and select :guilabel:`Transparency` tab. Set the transparency to ``40 %``. Now the georeferenced image must overlay with the basemap outline. 

  .. image:: /static/3/georeferencing_basics/images/16.png
     :align: center

17. If the georeference needs more fine-tuning, we can start from the collected GCP points. Browse the ``1870_southern_india_modified.tif`` file location. You can find an additional file, ``1870_southern_india_modified.tif.points``. This file will contain the GCP points information.

  .. image:: /static/3/georeferencing_basics/images/17.png
     :align: center

18. Open the georeferencing tool in QGIS, click :menuselection:`File --> Load GCP Points`, and select the ``1870_southern_india_modified.tif.points``. This will load the GCP created previously. Then load the ``1870_southern_india_modified.tif`` to fine-tune your work.


  .. image:: /static/3/georeferencing_basics/images/18.png
     :align: center
