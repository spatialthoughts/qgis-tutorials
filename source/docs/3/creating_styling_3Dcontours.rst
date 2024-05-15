Creating and Styling 3D Contours (QGIS3)
==========================================
*Contributed by:* `Steven Kim <https://geographyclub.github.io/>`_

In the previous tutorial, `Styling a River Network with Expressions (QGIS3) <https://www.qgistutorials.com/en/docs/3/river_styling_expressions.html>`_ we used expressions to filter and style river network. In this tutorial, we will create and style the 3D contours.

Overview of the task
--------------------

First we will create contour lines from a 1/3 arc-second (approximately 10 m) resolution DEM, then apply translate and conditional color expressions to give the appearance of a 3d map.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Downloading 3DEP DEM from USGS.
- Using the Contour raster extraction tool.
- Adding a new color ramp to QGIS.

Get the data
------------

In cartography, contour lines representing equal elevation can be derived from a digital elevation model, like the USGS 3D Elevation Program (3DEP). The 3DEP data holdings serve as the elevation layer of The National Map, and provide foundational elevation information for earth science studies and mapping applications in the United States.

1. We will download the data from `TNM Download v2 <https://apps.nationalmap.gov/downloader/>`_.

  .. image:: /static/3/creating_styling_3Dcountours/images/data1.png
    :align: center

2. On the downloader, look for the ``Elevation Products(3DEP)`` dataset and check the box to see all subcategories.

  .. image:: /static/3/creating_styling_3Dcountours/images/data2.png
    :align: center

3. Click the blue button :guilabel:`Search Products` to see the list of tiles.

  .. image:: /static/3/creating_styling_3Dcountours/images/data3.png
    :align: center

4. On the second page, look for the tile ``USGS 1/3 Arc Second n32w097 20211103`` and click on :guidable:`Download Link(TIF)`

  .. image:: /static/3/creating_styling_3Dcountours/images/data4.png
    :align: center

You can directly download the tile at `USGS_13_n32w097_20211103.tif <https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/13/TIFF/historical/n32w097/USGS_13_n32w097_20211103.tif>`_ 

Data Source [USGS]_

Procedure
---------

If you have not already added the color 'wiki-1.02' to your project, as shown in the expressions tutorial "Creating a Block World Map", do so now by following these instructions. If you do have the color 'wiki-1.02', then jump to step #6.

1. Before continuing, we must first add a color ramp suitable for coloring elevation. Click on :guilabel:`Settings` in the menubar and select :guilabel:`Style Manager`.

  .. image:: /static/3/creating_styling_3Dcountours/images/1.png
    :align: center

2. Click on the plus sign :guilabel:`Add item` at the bottom and select :menuselection:`Catalog: cpt-city...`.

  .. image:: /static/3/creating_styling_3Dcountours/images/2.png
    :align: center

3. Scroll down the color ramps until you find :guilabel:`wiki-1.02`. There may be several with the same name, just click on one and click :guilabel:`OK`.

  .. image:: /static/3/creating_styling_3Dcountours/images/3.png
    :align: center

4. At the 'Save New Color Ramp' window, enter the value ``wiki-1.02`` as the :guilabel:`Name`.

  .. image:: /static/3/creating_styling_3Dcountours/images/4.png
    :align: center

5. Click :guilabel:`Save` to exit the window, then click :guilabel:`Close` to exit Style Manager. Now the wiki-1.02 color ramp is available to use in your projects going forward.

  .. image:: /static/3/creating_styling_3Dcountours/images/5.png
    :align: center
	
6. Now that we have our color ramp, we can make our contours. Locate the ``USGS_13_n32w097_20211103.tif`` file in the QGIS Browser and drag it to the canvas. A new raster layer ``USGS_13_n32w097_20211103`` will now be loaded in QGIS and you should see a greyscale DEM in your map window.

  .. image:: /static/3/creating_styling_3Dcountours/images/6.png
    :align: center
    
7. Select :menuselection:`Raster --> Extraction --> Contour` to access the contour tool.

  .. image:: /static/3/creating_styling_3Dcountours/images/7.png
    :align: center

8. The `Input layer`, `Band number`, `Interval between contour lines` and `Attribute name` should all be auto-filled. Change the `Interval between contour lines` from the default 10 to 1, then scroll down to the `Contours` form and click :guilabel:`...` to name your file and press :guilabel:`Run`.

  .. image:: /static/3/creating_styling_3Dcountours/images/8.png
    :align: center

9. After the contour tool finishes processing (this should take about a minute), click :guilabel:`Close` to return to the map window, where you should see the contour lines we have just made.

  .. image:: /static/3/creating_styling_3Dcountours/images/9.png
    :align: center

10. Click on :guilabel:`Open Layer Styling Panel` of the newly created contour layer and select :guilabel:`Simple Line` to access its properties.

  .. image:: /static/3/creating_styling_3Dcountours/images/10.png
    :align: center

11. Switch `Symbol layer type` from :guilabel:`Simple Line` to :guilabel:`Geometry Generator`.

  .. image:: /static/3/creating_styling_3Dcountours/images/11.png
    :align: center

12. In the input box, enter this expression to translate each contour line in the y-axis by "ELEV" value:

  .. code-block:: none
 
  translate($geometry,0,scale_linear("ELEV",65,209,0,0.2))
  
  .. image:: /static/3/creating_styling_3Dcountours/images/12.png
    :align: center

13. Below `Geometry Generator` in the symbol window, select the :guilabel:`Simple Line` layer to access it's properties.

  .. image:: /static/3/creating_styling_3Dcountours/images/13.png
    :align: center

14. Click on :guilabel:`Data define override` button for :guilabel:`Color` and select the :guilabel:`Edit` menu.

  .. image:: /static/3/creating_styling_3Dcountours/images/14.png
    :align: center

15. This brings up the :guilabel:`Expression Builder` dialog for `Color`. Enter this expression to color contour lines by "ELEV" value.

  .. code-block:: none

  CASE WHEN "ELEV" <= 120 THEN ramp_color('wiki-1.02',scale_linear("ELEV",65,120,0,0.5))
    ELSE ramp_color('wiki-1.02',scale_linear("ELEV",120,209,0.5,1))
  END
  
  .. image:: /static/3/creating_styling_3Dcountours/images/15.png
    :align: center

16. You should see a 3D representation of the contours colored by elevation. Experiment with the coloring and scaling expressions to reveal different artistic representations of the landscape.

  .. image:: /static/3/creating_styling_3Dcountours/images/16.png
    :align: center
