Georeferencing Aerial Imagery (QGIS3)
=====================================
In the tutorial :doc:`georeferencing_basics` we covered the basic process of georeferencing in QGIS. That method involved reading the coordinates from your scanned map and entering them manually as control points. Many times though you may not have the coordinates printed on your map, or you are trying to georeference an image. In that case, you can use another georeferenced data-source as your input. In this tutorial, you will learn how to use existing open data sources in your georeferencing process.

Overview of the task
--------------------

We will georeference high resolution balloon-imagery using reference coordinates from OpenStreetMap. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Downloading super high-resolution public domain imagery.
- Using XYZ Tile Layers as basemap.
- Using the OSM Place Search plugin in QGIS.
- Setting a custom no-data value for a layer.

Get the data
------------

In this tutorial, we will be using kite and balloon imagery collected by `The Public Laboratory <http://publiclaboratory.org/archive>`_. They make the georeferenced versions of the images also available, but we will download a non-georeferenced JPG image and go through the process of georeferencing it in QGIS.
 
Download the JPG image of `Washington Square Park, New York <http:// publiclaboratory.org/map/washington-square-park-new-york-new-york/2012-10-01>`_. You can right-click the JPG button and choose :guilabel:`Save link as...`.
 
For convenience, you may directly download a copy of the dataset from the link below:
 
`newyorkcity-washingtonsquarepark.jpg <https://www.qgistutorials.com/downloads/newyorkcity-washingtonsquarepark.jpg>`_

Procedure
---------

1. We will use a basemap from OpenStreetMap to capture the coordinates for georeferencing. QGIS3 comes with  built-in support for tile layers. These are commonly known as 'XYZ' layers since they are made using individual map tiles for each zoom level (z) on a x,y coordinate grid. You can find the ``OpenStreetMap`` layer under :guilabel:`XYZ Tiles` in the :guilabel:`Browser Panel`. Drag the layer to the main canvas. Once loaded, note the Coordinate Reference System (CRS) for this layer in the bottom-right corder. It is set as ``EPSG 3857 Pseudo Mercator``. This is important because the coordinates we infer from this layer during georeferencing will be in this CRS.

  .. image:: /static/3/advanced_georeferencing/images/1.png
     :align: center

.. note::

  See `this page <https://www.spatialbias.com/2018/02/qgis-3.0-xyz-tile-layers/>`_ for more details on XYZ layers and how to add other basemaps in QGIS.
  
2. The image we are georeferencing is for ``Washington Square Park, New York``. You can zoom/pan try to locate this park in the map. But that is cumbersome and may not be practical. An easier way is to use the OpenStreetMap (OSM) Place Search plugin to search for the exact location. Install the ``OSM Place Search`` plugin from :menuselection:`Plugins --> Manage and install plugins --> All`. If you do not see this plugin in the search results, make sure you have checked :guilabel:`Also show experimental plugins` under :guilabel:`Settings`. See :doc:`../using_plugins` for more information on using plugins in QGIS.

  .. image:: /static/3/advanced_georeferencing/images/2.png
     :align: center

3. Once the plugin is installed, you will see a new panel called :guilabel:`OSM Place Search...`. Search for ``Washington Square Park`` in the :guilabel:`Name contains..` box and click :guilabel:`->`. You will see the matching place names appear in the results panel. Select the correct result and click the :guilabel:`Zoom` button.

  .. image:: /static/3/advanced_georeferencing/images/3.png
     :align: center

4. You will see the map that is familiar and contains the landmarks that we can identify from the image. You may close the :guilabel:`OSM Place Search` panel now. If you need it again, you can open it from :menuselection:`View --> Panels --> OSM Place Search`.

  .. image:: /static/3/advanced_georeferencing/images/4.png
     :align: center

5. Now it is time to start georeferencing. Launch the **Georeferencer** from :menuselection:`Raster --> Georeferencer`.

  .. image:: /static/3/advanced_georeferencing/images/5.png
     :align: center

6. In the :guilabel:`Georeferencer` window, go to :menuselection:`File --> Open Raster`. Navigate to the downloaded JPG file and click :guilabel:`Open`.

  .. image:: /static/3/advanced_georeferencing/images/6.png
     :align: center

7. In the next screen, you will asked to choose the raster’s coordinate reference system (CRS). Our source image is a plain JPEG file and doesn't have any coordinate reference system atached to it, so you can click :guilabel:`Cancel`.

  .. image:: /static/3/advanced_georeferencing/images/7.png
     :align: center


8. Before we start adding Ground Control Points (GCP), we need to define the Transformation Settings. Go to :menuselection:`Settings --> Transformation settings`.

  .. image:: /static/3/advanced_georeferencing/images/8.png
     :align: center

9. In the :guilabel:`Transformation settings` dialog, choose the :guilabel:`Transformation type` as ``Polynomial 2``. See `QGIS Documentation <https://docs.qgis.org/testing/en/docs/user_manual/plugins/plugins_georeferencer.html#available-transformation-algorithms>`_ to learn about different transofrmation types and their uses. As noted earlier, our basemap is in ``EPSG 3857 Pseudo Mercator`` CRS, so set that as the :guilabel:`Target CRS`. You can leave the :guilabel:`Output raster` name to the default and choose ``LZW`` as the :guilabel:`Compression`. Check the :guilabel:`Use 0 for transparency when needed`. Make sure the :guilabel:`Load in QGIS when done` option is checked. CLick :guilabel:`OK`.

  .. image:: /static/3/advanced_georeferencing/images/9.png
     :align: center

10. Now click on the :guilabel:`Add Point` button on the toolbar and select an easily identifiable location on the image. Corners, intersections, poles etc. make good control points.

  .. image:: /static/3/advanced_georeferencing/images/10.png
     :align: center

11. Once you click on the image at a control point location, you will see a pop-up asking you to enter map coordinates. Click the button :guilabel:`From map canvas`.

  .. image:: /static/3/advanced_georeferencing/images/11.png
     :align: center

12. Find the same location in the reference layer and click at the precise point. The coordinates are auto-populated from your click on the map canvas. Click Ok. Similarly, choose at least 6 points on the image and add their coordinates from the reference layer.

  .. image:: /static/3/advanced_georeferencing/images/12.png
     :align: center

.. note::

  Tip: When selecting a GCP on a building, always choose the bottom of the building. Many aerial and satellite imagery have leaning buildings, so choosing a point on the rooftop will introduce errors.
  
13. Once you have added the minimum number of points required for the transform, you will notice that the GCPs now have a non-zero ``dX``, ``dY`` and ``Residual`` error values. If a particular GCP has unusually high error values, that usually means a human-error in entering the coordinate values. So you can delete that GCP and capture it again.

  .. image:: /static/3/advanced_georeferencing/images/13.png
     :align: center

14. Once you are satisfied with the GCPs, go to :menuselection:`File --> Start georeferencing`. This will start the process of warping the image using the GCPs and creating the target raster.

  .. image:: /static/3/advanced_georeferencing/images/14.png
     :align: center


15. Once the process finishes, you will see the georeferenced layer loaded in QGIS. If all went well, you will see it nicely overlay the basemap.

  .. image:: /static/3/advanced_georeferencing/images/15.png
     :align: center

16. To make the output look nicer, let’s remove the white border. Right-click on the image layer and choose :guilabel:`Properties`.

  .. image:: /static/3/advanced_georeferencing/images/16.png
     :align: center

17. Switch to the :guilabel:`Transparency` tab. Add ``255`` as the :guilabel:`Additional no data value` and click :guilabel:`OK`. 

  .. image:: /static/3/advanced_georeferencing/images/17.png
     :align: center

.. note::

  8-bit images have pixel values in the range 0-255. 0 is black and 255 is white.
  
18. Now you will see your georeferenced image nicely overlaid on the base layer.

  .. image:: /static/3/advanced_georeferencing/images/18.png
     :align: center