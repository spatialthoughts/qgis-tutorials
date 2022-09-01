Working with Terrain Data (QGIS3)
=================================

Terrain or elevation data is useful for many GIS analyses, and it is often used
in maps. QGIS3 has good terrain processing capabilities built-in. In this
tutorial, we will work through the steps to generate various products from
elevation data such as hillshade and contour.

Overview of the task
--------------------

The task is to create contours and a hillshade map for area around Mt. Everest.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Searching and downloading freely available terrain data.
- Exporting a vector layer as KML and viewing it in Google Earth.
- Smoothing of contour lines. 

Get the data
------------

We will be working with GMTED2010 dataset from USGS. `GMTED (Global Multi-resolution
Terrain Elevation Data)
<https://eros.usgs.gov/#/Find_Data/Products_and_Data_Available/GMTED2010>`_ is a global terrain dataset that is the newer version
of GTOPO30 dataset.

Here is how to search and download the revelant data from USGS Earthexplorer.

1. Go to the `USGS Earthexplorer <http://earthexplorer.usgs.gov/>`_ . In the
   :guilabel:`Search Criteria` tab, click on :guilabel:`World Features`. In :guilabel:`Feature Name` enter ``Everest``, in :guilabel:`Country` enter ``NEPAL``, click on :guilabel:`Show`. This will display a table with the location information. Select `Everest` under :guilabel:`Placename`.

.. image:: /static/3/working_with_terrain/images/1.png
   :align: center

2. Now the canvas will move to `Mt. Everest` location. Click on :guilabel:`Data Sets`. 

.. image:: /static/3/working_with_terrain/images/2.png
   :align: center

3. Expand the :guilabel:`Digital Elevation` group, and check :guilabel:`GMTED2010`. Click on :guilabel:`Results`.

.. image:: /static/3/working_with_terrain/images/3.png
   :align: center

4. Click the :guilabel:`Download Options` button. 

.. warning::
    You will have to log in to the site at this point. You can create a free account if you do not have one.

.. image:: /static/3/working_with_terrain/images/4.png
   :align: center


5. Select the :guilabel:`30 ARC SEC` option and click :guilabel:`Download`.

.. image:: /static/3/working_with_terrain/images/5.png
   :align: center

You will now have a file named `GMTED2010N10E060_300.zip`. Elevation data is
distributed in various raster formats such as ASC, BIL, GeoTiff, etc.
QGIS supports a wide `variety of raster formats
<https://www.gdal.org/formats_list.html>`_ via the GDAL library. The GMTED
data comes as GeoTiff files which are contained in this zip archive.

For convenience, you can download a copy of the data directly from below.

`GMTED2010N10E060_300.zip <https://www.qgistutorials.com/downloads/GMTED2010N10E060_300.zip>`_


Data Source: [GMTED2010]_

Procedure
---------

6. Open :menuselection:`Layer --> Add Layer --> Add Raster Layer`.

.. image:: /static/3/working_with_terrain/images/6.png
   :align: center

7. Click on the `...` under :guilabel:`Source`, search and select the file named `10n060e_20101117_gmted_mea300.tif`.

.. image:: /static/3/working_with_terrain/images/7.png
   :align: center

8. You will see the terrain data rendered in the QGIS Canvas. Each pixel in the
   terrain raster represents the average elevation in meters at that location.
   The dark pixels represent areas with low altitude and lighter pixels
   represent areas with high altitude.

.. image:: /static/3/working_with_terrain/images/8.png
   :align: center

9. Let's find our area of interest. From `Wikipedia <https://en.wikipedia.org/wiki/Mount_Everest>`_,
   we find that the coordinates for our area of interest - Mt. Everest - is located
   at the coordinates 27.9881° N, 86.9253° E. Note that QGIS
   uses the coordinates in (X, Y) format, so you must use the coordinates as
   (Longitude, Latitude). Paste `86.9253,27.9881` these at the bottom of the QGIS
   window where it says :guilabel:`Coordinate` and press Enter. The viewport will be
   centered at this coordinate. To zoom in, Enter `1:1000000` in the :guilabel:`Scale` field
   and press Enter. You will see the viewport zoom to the area around the
   Himalayas.

.. image:: /static/3/working_with_terrain/images/9.png
   :align: center


10. We will now crop the raster to this area of interest. Search for Clip in :guilabel:`Processing Toolbox`. Select the ``Clip Raster by extent`` under GDAL algorithms. 

.. image:: /static/3/working_with_terrain/images/10.png
   :align: center

11. In the :guilabel:`Clip Raster by Extent` window, select ``10n060e_20101117_gmted_mea300`` as :guilabel:`Input Layer`, click ``...`` in :guilabel:`Clipping extent` and select ``Use Map canvas extent``, click ``...`` in :guilabel:`Clipped (extent)` and enter the name as ``mt_everest.tif``. Click :guilabel:`Run`.  

.. image:: /static/3/working_with_terrain/images/11.png
   :align: center

12. A new layer ``mt_everest`` will appear in the canvas. Search for Hill in :guilabel:`Processing Toolbox`. Select the ``Hillshade`` algorithm under GDAL algorithms. 

.. image:: /static/3/working_with_terrain/images/12.png
   :align: center

13. In the :guilabel:`Hillshade` window, select ``mt_everest`` as :guilabel:`Elevation Layer`, enter ``315.000`` in :guilabel:`Azimuth (horizontal angle)`, enter ``45.000`` in :guilabel:`Vertical angle`. Click ``...`` in :guilabel:`Hillshade` and enter the name as ``mt_everest_hillshade.tif``. Click :guilabel:`Run`.  

.. image:: /static/3/working_with_terrain/images/13.png
   :align: center

14. A new layer ``mt_everest_hillshade`` will appear in the canvas.

.. image:: /static/3/working_with_terrain/images/14.png
   :align: center

15. Search for Contour in :guilabel:`Processing Toolbox`. Select the ``Contour`` algorithm under GDAL algorithms. 

.. image:: /static/3/working_with_terrain/images/15.png
   :align: center

16.  In the :guilabel:`Contour` window, select ``mt_everest`` as :guilabel:`Input Layer`,  enter ``250`` in :guilabel:`Interval between contour lines`. Click ``...`` in :guilabel:`Contours` and enter the name as ``mt_everest_contour.gkpg``. Click :guilabel:`Run`.  

.. image:: /static/3/working_with_terrain/images/16.png
   :align: center

17. A new layer ``mt_everest_contour`` will appear in the canvas. Right-click on the layer and click :guilabel:`Open Attribute Table`.

.. image:: /static/3/working_with_terrain/images/17.png
   :align: center

18. You will see that each line feature has an attribute named :guilabel:`ELEV`.
    This is the height in meters that each line represents. Click on the column header
    a couple of times to sort the values in descending order. Here you will
    find the line representing the highest elevation in our data, i.e. Mt.
    Everest.

.. image:: /static/3/working_with_terrain/images/18.png
   :align: center

19. Select the top row, and click on the :guilabel:`Zoom to selection`
    button.

.. image:: /static/3/working_with_terrain/images/19.png
   :align: center

20. Switch to the main QGIS window. You will see the selected contour line
    highlighted in yellow. This is the area of the highest elevation in our dataset.

.. image:: /static/3/working_with_terrain/images/20.png
   :align: center

21. Search for Smooth in :guilabel:`Processing Toolbox`. Select the ``Smooth`` under Vector geometry. 

.. image:: /static/3/working_with_terrain/images/21.png
   :align: center

22. In the :guilabel:`Smooth` window, select ``mt_everest_contour`` as :guilabel:`Input Layer`,  enter ``5`` in :guilabel:`Iterations`. Click :guilabel:`Run`. 

.. warning:: 
    The smoothing algorithm works by adding extra vertices along the lines. As you increase the number of iterations, the number of vertices in the contour lines increase by a large amount. So be careful in using higher number of iterations. You can reduce the file size of the output by exporting it as a shapefile and simplifying the results using `Mapshaper <https://mapshaper.org/>`_.
      

.. image:: /static/3/working_with_terrain/images/22.png
   :align: center

23. A new layer ``Smoothed`` will appear in the canvas. This layer will have more smooth edges compared to the ``mt_everest_contour`` layer.

.. image:: /static/3/working_with_terrain/images/23.png
   :align: center

24. You can also visualize your contour layer and verify your analysis
    by exporting the contours layer as KML and viewing it in Google Earth.
    Right click on the smoothed layer, select :menuselection:`Export --> Save Feature As...`.

.. image:: /static/3/working_with_terrain/images/24.png
   :align: center

25. Select :guilabel:`Keyhole Markup Language [KML]` as the
    :guilabel:`Format`. Click ``...`` in :guilabel:`File name` and enter the name as ``contour_smoothed.kml``. Click :guilabel:`OK`.  

.. image:: /static/3/working_with_terrain/images/25.png
   :align: center

26. Browse to the output file on your disk and double-click on it to open Google Earth Pro.

.. image:: /static/3/working_with_terrain/images/26.png
   :align: center
