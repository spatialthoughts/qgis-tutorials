Georeferencing Aerial Imagery (QGIS3)
=====================================

In the tutorial :doc:`georeferencing_basics`, we covered the basic georeferencing process in QGIS. That method involved reading the coordinates from your scanned map and entering them manually as control points. Many times though, you may not have the coordinates printed on your map, or you are trying to georeference an image. In that case, you can use another georeferenced data source as your input. This tutorial will teach you how to use existing open data sources in your georeferencing process. 

Overview of the task
--------------------

We will georeference a high resolution balloon-imagery using reference coordinates from OpenStreetMap. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Using XYZ Tile Layers as a Basemap in QGIS.
- Using Built-in Nominatim Geocoder.
- Setting a user-defined No-Data value for a layer.

Get the data
------------

In this tutorial, we will be using kite and balloon imagery collected by `The Public Laboratory <https://publiclab.org/archive>`_. They make the georeferenced versions of the images also available, but we will download a non-georeferenced JPG image and go through the process of georeferencing it in QGIS.
 
Download the JPG image of `Washington Square Park, New York <https://publiclab.org/map/washington-square-park-new-york-new-york/2012-10-01>`_. You can right-click the JPG button and choose :guilabel:`Save link as...`.
 
For convenience, you may directly download a copy of the dataset from the link below:
 
`newyorkcity-washingtonsquarepark.jpg <https://www.qgistutorials.com/downloads/newyorkcity-washingtonsquarepark.jpg>`_

Procedure
---------

1. We will use a basemap from OpenStreetMap to capture the coordinates for georeferencing. QGIS3 comes with  built-in support for tile layers. These are commonly known as 'XYZ' layers since they are made using individual map tiles for each zoom level (z) on a x,y coordinate grid. You can find the ``OpenStreetMap`` layer under :guilabel:`XYZ Tiles` in the :guilabel:`Browser Panel`. Drag the layer to the main canvas. Once loaded, note the Coordinate Reference System (CRS) for this layer in the bottom-right corder. It is set as ``EPSG 3857 Pseudo Mercator``. This is important because the coordinates we infer from this layer during georeferencing will be in this CRS.

  .. image:: /static/3/advanced_georeferencing/images/01.png
     :align: center

.. note::

  See `this page <https://www.spatialbias.com/2018/02/qgis-3.0-xyz-tile-layers/>`_ for more details on XYZ layers and how to add other basemaps in QGIS.
  
2. The image we are georeferencing is for ``Washington Square Park, New York``. You can zoom/pan to locate this park on the map. But that is cumbersome and not practical. From QGIS version 3.20 onwards, there is built-in support for the OpenStreetMap based Nominatim Geocoder. Click the search bar in the bottom left of the QGIS window. To use this as a geocoder prefix, the search place with ``>``. Searching for ``> Washington Square Park`` will pop up a list of addresses to choose from. Click the first address.

  .. image:: /static/3/advanced_georeferencing/images/02.png
     :align: center

3. The map canvas will be centered to the Square Park. Now let's start georeferencing. Launch the **Georeferencer** from :menuselection:`Raster --> Georeferencer`.
  
  .. note::
  
	From QGIS versions 3.26 onwards, the **Georeferencer** can be launched from :menuselection:`Layer --> Georeferencer`.
	
  .. image:: /static/3/advanced_georeferencing/images/03.png
     :align: center

4. For georeferencing an aerial image, we have to choose coordinate points from the OpenStreetMap, so let's first dock the Georeferencer tool into to main QGIS window. Select Configure Georeference from :menuselection:`Settings --> Configure Georeferencer`.

  .. image:: /static/3/advanced_georeferencing/images/04.png
     :align: center

5. Check :guilabel:`Show georeferencer window docked` and click :guilabel:`OK`. 

  .. image:: /static/3/advanced_georeferencing/images/05.png
     :align: center

6. The :guilabel:`Georeferencer` window will be docked at the bottom of the main QGIS window. Let us load the image file by clicking the :guilabel:`Open Raster` icon in the :guilabel:`Georeferencer` window and navigating to the downloaded JPG file. Click :guilabel:`Open.`

  .. image:: /static/3/advanced_georeferencing/images/06.png
     :align: center

7. Before adding Ground Control Points (GCP), we need to define the Transformation Settings. Click on the :guilabel:`Transformation Settings` icon to open the Transformation Settings dialog. Choose the :guilabel:`Transformation type` as ``Polynomial 2``. See `QGIS Documentation <https://docs.qgis.org/testing/en/docs/user_manual/working_with_raster/georeferencer.html?highlight=georeferencer#available-transformation-algorithms>`_ to learn about different transformation types and their uses. As noted earlier, our base map is in ``EPSG 3857 Pseudo Mercator`` CRS, so set that as the :guilabel:`Target CRS`. You can leave the :guilabel:`Output raster` name to the default and choose ``LZW`` as the :guilabel:`Compression`. Check the :guilabel:`Use 0 for transparency when needed`. Check the :guilabel:`Save GCP points` to store the points as a separate file for future purposes. Make sure the :guilabel:`Load in QGIS when done` option is checked. Click :guilabel:`OK`.

  .. image:: /static/3/advanced_georeferencing/images/07.png
     :align: center


8. Now click on the :guilabel:`Add Point` button on the toolbar and select an easily identifiable location on the image. Corners, intersections, poles etc., make good control points. Once you click on the image at a control point location, you will see a pop-up asking you to enter map coordinates. Click the button :guilabel:`From map canvas`. 

  .. image:: /static/3/advanced_georeferencing/images/08.png
     :align: center

9. In the ``OpenStreetMap`` layer, click on the exact location in the reference layer. The coordinates will be auto-populated from your click on the map canvas. Click :guilabel:`Ok`.

  .. image:: /static/3/advanced_georeferencing/images/09.png
     :align: center

.. note::

  Tip: When selecting a GCP on a building, always choose the bottom of the building. Most aerial and satellite imagery have leaning buildings, so picking a point on the rooftop will introduce errors.

10.  Similarly, choose at least 6 points on the image and add their coordinates from the reference layer. Once you have added the minimum number of points required for the transform, you will notice that the GCPs now have non-zero ``dX``, ``dY``, and ``Residual`` error values. If a particular GCP has unusually high error values, that usually means a human error in entering the coordinate values. So you can delete that GCP and capture it again.

  .. image:: /static/3/advanced_georeferencing/images/10.png
     :align: center

11. Once you are satisfied with the GCPs, click :guilabel:`Start georeferencing`. This will start the process of warping the image using the GCPs and creating the target raster. Once the process is finished, you will see the layer loaded in QGIS. Close the :guilabel:`Georeferencer` window. 

  .. image:: /static/3/advanced_georeferencing/images/11.png
     :align: center

12. Now click on the :guilabel:`Open layer styling panel` icon and Switch to the :guilabel:`Transparency` tab. Add ``255`` as the :guilabel:`Additional no data value`. This will remove the white border around the image. Now you will see your georeferenced image nicely overlaid on the base layer. 

  .. image:: /static/3/advanced_georeferencing/images/12.png
     :align: center

.. note::

  8-bit images have pixel values in the range 0-255. 0 is black and 255 is white.
  
