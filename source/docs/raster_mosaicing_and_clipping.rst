Raster Mosaicing and Clipping
=============================
This tutorial explores some basic raster operations in QGIS such as viewing, mosaicing
and subsetting.

Overview of the task
--------------------

We will download some public domain raster data for Brazil and view it in QGIS. Next, we
will merge these into a single mosaic and clip it using a country boundary to
get a single seamless dataset for the country.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Searcing and downloading near real-time public domain satellite imagery.
- Selecting a single feature from a vector layer and saving it to a new
  shapefile.

Get the data
------------

We need Brazil country boundary to clip our raster. You can get the `Admin 0 - Countries <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_ shapefile
from Natural Earth.

`NASA/GSFC, Rapid Response site <https://earthdata.nasa.gov/data/near-real-time-data/rapid-response/modis-subsets>`_ 
has a good collection of near real-time satellite imagery. A good regional product is `USDA Foreign Agricultural Service (FAS) subsets.
<http://lance-modis.eosdis.nasa.gov/imagery/subsets/?project=fas>`_. We will
use 2km resolution FAS subsets for Brazil for this tutorial.

Here is how to search and download the revelant data.

1. Open the `South America region subsets
   <http://lance-modis.eosdis.nasa.gov/imagery/subsets/?area=sa>`_. Find the
   Brazil subsets shown in the :guilabel:`FAS Subsets` section. Click on any
   one of them.

.. image:: /static/raster_mosaicing_and_clipping/images/1.png
   :align: center

2. In the details page, click the :guilabel:`2km` link under the product of
   your choice. Here we will download the :guilabel:`NDVI` product. `Learn more
   about NDVI <http://en.wikipedia.org/wiki/Normalized_Difference_Vegetation_Index>`_.

.. image:: /static/raster_mosaicing_and_clipping/images/2.png
   :align: center

3. Click the :guilabel:`Download GeoTIFF file` link to download the raster
   image.

.. image:: /static/raster_mosaicing_and_clipping/images/3.png
   :align: center

Repeat the process for all 7 FAS subsets for Brazil.


For convenience, you can directly download sample data used in this tutorial from links below.

`ne_10m_admin_0_countries.zip <../../downloads/ne_10m_admin_0_countries.zip>`_

`FAS_Brazil1.2013363.aqua.ndvi.2km.tif <../../downloads/FAS_Brazil1.2013363.aqua.ndvi.2km.tif>`_

`FAS_Brazil2.2013363.terra.ndvi.2km.tif <../../downloads/FAS_Brazil2.2013363.terra.ndvi.2km.tif>`_

`FAS_Brazil3.2013363.aqua.ndvi.2km.tif <../../downloads/FAS_Brazil3.2013363.aqua.ndvi.2km.tif>`_

`FAS_Brazil4.2013363.aqua.ndvi.2km.tif <../../downloads/FAS_Brazil4.2013363.aqua.ndvi.2km.tif>`_

`FAS_Brazil5.2013363.aqua.ndvi.2km.tif <../../downloads/FAS_Brazil5.2013363.aqua.ndvi.2km.tif>`_

`FAS_Brazil6.2013363.terra.ndvi.2km.tif <../../downloads/FAS_Brazil6.2013363.terra.ndvi.2km.tif>`_

`FAS_Brazil7.2013363.aqua.ndvi.2km.tif <../../downloads/FAS_Brazil7.2013363.aqua.ndvi.2km.tif>`_

Data Sources: [LANCE]_ [NATURALEARTH]_

Procedure
---------

4. Open QGIS and go to :menuselection:`Layer --> Add Raster Layer..`.

.. image:: /static/raster_mosaicing_and_clipping/images/4.png
   :align: center

5. Browse to the directory with the individual images. Hold down the :kbd:`Ctrl` 
   key and click on the image files to make a multiple selection. Click
   :guilabel:`Open`.

.. image:: /static/raster_mosaicing_and_clipping/images/5.png
   :align: center

6. You will see the images load up in the Table of Content on the left panel.
   Now let us create a single `Mosaic` image from all these individual images.
   Click on :menuselection:`Raster --> Miscellaneous --> Merge`.

.. note::

   The :guilabel:`Raster` menu in QGIS comes from a core plugin called
   :guilabel:`GdalTools`. If you do not see the :guilabel:`Raster` menu,
   enable the :guilabel:`GdalTools` plugin from :menuselection:`Plugins -->
   Manage and install plugins --> Installed`. See :doc:`using_plugins` for more details. 

.. image:: /static/raster_mosaicing_and_clipping/images/6.png
   :align: center

7. In the :guilabel:`Merge` dialog, click :guilabel:`Select...` next to
   :guilabel:`Input files` and browse to the directory containing all
   the individual geotiffs. Keep holding :kbd:`Ctrl` key and select all the.
   subsets. Now click :guilabel:`Select...` next to :guilabel:`Output file`
   and name the output as ``Brazil_mosaic.tif``. At the bottom, check the box next to
   :guilabel:`Load into canvas when finished`. Click :guilabel:`OK`.
  
.. image:: /static/raster_mosaicing_and_clipping/images/7.png
   :align: center

8. You will get a pop-up message saying `Processing complete`, once the mosaic is
   created and loaded to the QGIS Canvas. You will see that the individual
   images and now combined and mosaiced into a single layer. You can now turn
   off individual layers by un-checking the box next to them.

.. image:: /static/raster_mosaicing_and_clipping/images/8.png
   :align: center

9. Another Raster operation you can do is to subset or `crop` an image. We can
   use a polygon from a vector layer to crop the raster to the exact shape.
   Let's load the country polygons shapefile we downloaded from Natural Earth.
   Go to :menuselection:`Layer --> Add Vector Layer`.

.. image:: /static/raster_mosaicing_and_clipping/images/9.png
   :align: center

10. Select the ``ne_10m_admin_0_countries.zip`` file and click
    :guilabel:`Open`. When prompted to select the layer within the zip file,
    select ``ne_10m_admin_0_countries.shp``.

.. image:: /static/raster_mosaicing_and_clipping/images/10.png
   :align: center

11. Once the vector layer is loaded, we want to select and extract the polygon
    for Brazil. Select the :guilabel:`Select Single Feature` tool from the
    toolbar.

.. image:: /static/raster_mosaicing_and_clipping/images/11.png
   :align: center

12. Click anywhere on the Brazil polygon and it will be selected.

.. image:: /static/raster_mosaicing_and_clipping/images/12.png
   :align: center

13. Right-click the ``ne_10m_admin_0_countries`` layer and select
    :guilabel:`Save Selection As...`.

.. image:: /static/raster_mosaicing_and_clipping/images/13.png
   :align: center

14. Name your output as ``brazil_boundary.shp`` and make sure :guilabel:`Add
    saved file to map` box is checked. click :guilabel:`OK`.

.. image:: /static/raster_mosaicing_and_clipping/images/14.png
   :align: center

15. You will see the Brazil boundary polygon now loaded in QGIS.

.. image:: /static/raster_mosaicing_and_clipping/images/15.png
   :align: center

16. Now go to :menuselection:`Raster --> Extraction --> Clipper`. 

.. image:: /static/raster_mosaicing_and_clipping/images/16.png
   :align: center

17. Select the :guilabel:`input file (raster)` as ``Brazil_mosaic``. Name the
    :guilabel:`Output file` as ``Brazil_mosaic_clipped``. In the
    :guilabel:`Clipping mode` section, choose :guilabel:`Mask layer`. Select
    the newly created ``brazil_boundary`` as the mask layer. Check the box next
    to :guilabel:`Load into canvas when finished`. Click :guilabel:`OK`.

.. image:: /static/raster_mosaicing_and_clipping/images/17.png
   :align: center

18. The new cropped layer will be loaded into QGIS. You will notice the black
    pixels surrounding the actual mosaic. Let's remove that. Right-click on the
    ``Brazil_mosaic_clipped`` layer and select :guilabel:`Properties`.

.. image:: /static/raster_mosaicing_and_clipping/images/18.png
   :align: center

19. Go to the :guilabel:`Transparency` tab, and add `0` as an
    :guilabel:`Additional no data value`.

.. image:: /static/raster_mosaicing_and_clipping/images/19.png
   :align: center

20. Now you have a nice mosaic cropped to a country boundary that you can use
    in your project as a background layer or do further analysis on.

.. image:: /static/raster_mosaicing_and_clipping/images/20.png
   :align: center
