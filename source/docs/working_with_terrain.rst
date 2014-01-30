Working with Terrain Data
=========================
.. only:: html

   [ Download PDF `A4 <../pdf/working_with_terrain_a4.pdf>`_ `Letter
   <../pdf/working_with_terrain_letter.pdf>`_ ]

Terrain or elevation data is useful for many GIS Analysis and it is often used
in maps. QGIS has good terrain processing capabilities built-in. In this
tutorial, we will work through the steps to generate various products from
elevation data such as contours, hillshade etc.

Overview of the task
--------------------

The task is to create contours and hillshade map for area around Mt. Everest.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Searching and downloading freely available terrain data.
- Exporting a vector layer as KML and viewing it in Google Earth.

Get the data
------------

We will be working with GMTED2010 dataset from USGS. This data can be
downloaded from the `USGS Earthexplorer <http://earthexplorer.usgs.gov/>`_ site. `GMTED (Global Multi-resolution
Terrain Elevation Data)
<http://eros.usgs.gov/#/Find_Data/Products_and_Data_Available/GMTED2010>`_ is a global terrain dataset that is the newer version
of GTOPO30 dataset.

Here is how to search and download the revelant data from USGS Earthexplorer.

1. Go to the `USGS Earthexplorer <http://earthexplorer.usgs.gov/>`_ . In the
   :guilabel:`Search Criteria` tab, search for the place name `Mt. Everest`.
   Click on the result to select the location.

.. image:: /static/working_with_terrain/images/1.png
   :width: 700px
   :align: center

2. In the :guilabel:`Data Sets` tab, expand the :guilabel:`Digital Elevation`
   group, and check :guilabel:`GMTED2010`.

.. image:: /static/working_with_terrain/images/2.png
   :width: 700px
   :align: center

3. You can now skip to the :guilabel:`Results` tab and see the part of the
   dataset intersecting your search criteria. Click the :guilabel:`Download
   Options` button. You will have to log in to the site at this point. You can
   create a free account if you do not have one.

.. image:: /static/working_with_terrain/images/3.png
   :width: 700px
   :align: center

4. Select the :guilabel:`30 ARC SEC` option and click :guilabel:`Select
   Download Option`.

.. image:: /static/working_with_terrain/images/4.png
   :width: 700px
   :align: center

You will now have a file named `GMTED2010N10E060_300.zip`. Elevation data is
distributed in various raster formats such as ASC, BIL, GeoTiff etc.
QGIS supports a wide `variety of raster formats
<http://www.gdal.org/formats_list.html>`_ via the GDAL library. The GMTED
data comes as GeoTiff files which are contained in this zip archive.

.. only:: html

   For convenience, you can :download:`download a copy of the data from here.
   <../static/working_with_terrain/data/GMTED2010N10E060_300.zip>`.

Procedure
---------

5. Open :menuselection:`Layer --> Add Raster Layer` and browse to the
   downloaded zip file.

.. image:: /static/working_with_terrain/images/5.png
   :width: 700px
   :align: center

6. There are many different files generated from different algorithms.
   For this tutorial, we will use the file named `10n060e_20101117_gmted_mea300.tif`.

.. image:: /static/working_with_terrain/images/6.png
   :width: 600px
   :align: center

7. You will see the terrain data rendered in the QGIS Canvas. Each pixel in the
   terrain raster represents the average elevation in meters at that location.
   The dark pixels represent areas with low altitude and lighter pixels
   represent areas with high altitude.

.. image:: /static/working_with_terrain/images/7.png
   :width: 700px
   :align: center

8. Let's find our area of interest. From `Wikipedia <http://en.wikipedia.org/wiki/Mount_Everest>`_,
   we find that the coordinates for our area of interest - Mt. Everest - is located
   at the coordinates 27.9881° N, 86.9253° E. Note that QGIS
   uses the coordinates in (X,Y) format , so you must use the coordinates as
   (Longitude, Latitude). Paste `86.9253,27.9881` these at the bottom of QGIS
   window where it says :guilabel:`Coordinate` and press Enter. The viewport will be
   centered at this coordinate. To zoom in, Enter `1:1000000` in the :guilabel:`Scale` field
   and press Enter. You will see the viewport zoom to the area around the
   Himalayas.

.. image:: /static/working_with_terrain/images/8.png
   :width: 700px
   :align: center


9. We will now crop the raster to this area of interest. Select the Clipper
   tool from :menuselection:`Raster --> Extraction --> Clipper`.

.. note::

   The :guilabel:`Raster` menu in QGIS comes from a core plugin called
   :guilabel:`GdalTools`. If you do not see the :guilabel:`Raster` menu, enable
   the :guilabel:`GdalTools` plugin from :menuselection:`Plugins -->
   Manage and install plugins --> Installed`. See :doc:`using_plugins` for more details.

.. image:: /static/working_with_terrain/images/9.png
   :width: 700px
   :align: center

10. In the :guilabel:`Clipper` window, name your output file as
    `everest_gmted30.tif`. Select the :guilabel:`Clipping mode` as
    :guilabel:`Extent`.

.. image:: /static/working_with_terrain/images/10.png
   :width: 400px
   :align: center

11. Keep the :guilabel:`Clipper` window open and switch to the main QGIS
    window. Hold your left mouse button and draw a rectangle covering the full
    canvas.

.. image:: /static/working_with_terrain/images/11.png
   :width: 700px
   :align: center

12. Now back in the :guilabel:`Clipper` window, you will see the coordinates
    auto-populated from your selection. Make sure the :guilabel:`Load into
    canvas when finished` option is checked, and click :guilabel:`OK.`

.. image:: /static/working_with_terrain/images/12.png
   :width: 400px
   :align: center

13. Once the process finishes, you will see a new layer loaded in QGIS. This
    layer covers only the area around Mt. Everest.Now we are ready to generate
    contours. Select the contour tool from :menuselection:`Raster --> Extraction
    --> Contour`.

.. image:: /static/working_with_terrain/images/13.png
   :width: 700px
   :align: center

14. In the :guilabel:`Contour` dialog, select `everest_gmted30` as the
    :guilabel:`Input file`. Name the :guilabel:`Output file for contour lines`
    as `everest_countours.shp`. We will generate contour lines for 100m
    intervals, so put 100 as the :guilabel:`Interval between contour lines.`
    Also check the :guilabel:`Attribute name` option so elevation value will be
    recorded as attribute of each contour line. Click :guilabel:`OK`.

.. image:: /static/working_with_terrain/images/14.png
   :width: 600px
   :align: center

15. Once the processing is complete, you will see contour lines loaded into the
    canvas. Each line in this layer represents a particular elevation. All
    points along a countour line in the underlying raster would be at the same
    elevation. The closer the lines, the steeper the slope. Let’s inspect the
    contours a bit more. Right click on the contours layer and choose
    :guilabel:`Open Attribute Table`.

.. image:: /static/working_with_terrain/images/15.png
   :width: 700px
   :align: center

16. You will see that each line feature as an attribute named :guilabel:`ELEV`.
    This is the height in metres that each line represents. Click on the column header
    a couple of times to sort the values in descending order. Here you will
    find the line representing the highest elevation in our data, i.e. Mt.
    Everest.

.. image:: /static/working_with_terrain/images/16.png
   :width: 700px
   :align: center

17. Select the top row, and click on the :guilabel:`Zoom to selection`
    button.

.. image:: /static/working_with_terrain/images/17.png
   :width: 700px
   :align: center

18. Switch to the main QGIS window. You will see the selected contour line
    highlighted in yellow. This is the area of the highest elevation in our dataset.

.. image:: /static/working_with_terrain/images/18.png
   :width: 700px
   :align: center

19. Now let us create a hillshade map from the raster. Select
    :menuselection:`Raster --> Analysis --> DEM (Terrain Models)`.

.. image:: /static/working_with_terrain/images/19.png
   :width: 700px
   :align: center

20. In the :guilabel:`DEM (Terrain Models)` dialog, choose `everest_gmted30` as
    the :guilabel:`Input file`. Name the :guilabel:`Output file` as
    `everest_hillshade.tif`. Choose :guilabel:`Hillshade` as the
    :guilabel:`Mode`. Leave all other options as is. Make sure the :guilabel:`Load into
    canvas when finished` option is checked, and click :guilabel:`OK.`

.. image:: /static/working_with_terrain/images/20.png
   :width: 400px
   :align: center

21. Once the process finishes, you will see yet another raster loaded into QGIS
    canvas. Since you maybe zoomed-in near the Mt.Everest region, right click
    on the `everest_hillshade` layer and choose :guilabel:`Zoom to Layer
    Extent`.

.. image:: /static/working_with_terrain/images/21.png
   :width: 700px
   :align: center

22. Now you will see the full extent of the hillshade raster.

.. image:: /static/working_with_terrain/images/22.png
   :width: 700px
   :align: center

23. You can visualize also visualize your contour layer and verify your analysis
    by exporting the contours layer as KML and viewing it in Google Earth.
    Right click on the contours layer, select :guilabel:`Save as..`.

.. image:: /static/working_with_terrain/images/23.png
   :width: 700px
   :align: center

24. Select :guilabel:`Keyhole Markup Language [KML]` as the
    :guilabel:`Format`. Name your output as `contours.kml` and click
    :guilabel:`OK`.

.. image:: /static/working_with_terrain/images/24.png
   :width: 400px
   :align: center

25. Browse to the output file on your diesk and double-click on it to open Google Earth.

.. image:: /static/working_with_terrain/images/25.png
   :width: 700px
   :align: center
