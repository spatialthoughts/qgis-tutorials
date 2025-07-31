Creating a Block World Map (QGIS3)
==================================
*Contributed by:* `Steven Kim <https://geographyclub.github.io/>`_

In the previous tutorial :doc:`vector_styling_expressions` we looked at how simple expressions can be used to filter and style data in QGIS. We expand on this by creating a block world out of a hex grid with elevation values.

Overview of the task
--------------------
We will take a hex grid containing elevation values and use a mathematical function to set a height variable for the 2.5d renderer and a conditional statement to apply a color ramp.

  .. image:: /static/3/block_world_styling/images/output.png
    :align: center
	
    
Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Discovering and downloading elevation datasets.
- Creating a hexagonal grid and extracting raster statistics for each grid cell.
- Adding a new color ramp to QGIS.

Get the data
------------

`OpenTopography <https://opentopography.org/start>`_ provides access to many openly licensed elevation datasets. We will extract and download a DEM for your region of interest from a global DEM and Ocean Bathymetry dataset hosted on OpenTopography.

1. Visit the `Global Bathymetry and Topography at 15 Arc Sec: SRTM15+ V2.5.5 <https://portal.opentopography.org/raster?opentopoID=OTSRTM.122019.4326.1>`_ data page on OpenTopography website. This is a 500m resolution global dataset derived from SRTM DEM and various ocean bathymetry dataset.

  .. image:: /static/3/block_world_styling/images/data1.png
    :align: center

2. Scroll down to the :guilabel:`1. Select area of data to process` section. Click on the :guilabel:`SELECT A REGION` button and draw a rectangle covering your region of interest.

  .. image:: /static/3/block_world_styling/images/data2.png
    :align: center

3. Once the region is set, scroll down to the :guilabel:`2. Data Outputs Formats` section and select ``GeoTiff``. Leave all other options to default and scroll down to the :guilabel:`Job Description` section. Enter your email address to be notified when the download is ready. Click :guilabel:`SUBMIT` button.

  .. image:: /static/3/block_world_styling/images/data3.png
    :align: center

4. The download may take a few minutes to get processed. Once ready, you will receive a link to download the selected subset. Download the file to your computer. The downloaded file is a tar compressed file that needs to be uncompressed to be opened in QGIS. On Windows, you may use an external program like `7-Zip <https://www.7-zip.org/>`_ to uncompress and extract the ``output_SRTM15Plus.tif`` file.

  .. image:: /static/3/block_world_styling/images/data4.png
    :align: center

5. In QGIS, locate the ``output_SRTM15Plus.tif`` file in the :guilabel:`Browser`. Drag and drop it to the QGIS Canvas. A new layer ``output_SRTM15Plus`` will be added to the :guilabel:`Layers` panel.

  .. image:: /static/3/block_world_styling/images/data5.png
    :align: center

6. Open the Processing Toolbox from :menuselection:`Processing --> Toolbox`. Search and locate the :menuselection:`Vector creation --> Create grid` algorithm. Double-click to open it.

  .. image:: /static/3/block_world_styling/images/data6.png
    :align: center

7. In the :guilabel:`Create Grid` dialog, choose ``Hexagon`` as the :guilabel:`Grid type`. We will create a grid spanning the entire DEM. So for the :guilabel:`Grid extent`, click the down arrow and select :menuselection:`Calculate form Layer --> output_SRTM15Plus`.

  .. image:: /static/3/block_world_styling/images/data7.png
    :align: center

8. Our selected region is pretty big, so we can create a 1 degree grid. Select ``1`` for both :guilabel:`Horizontal spacing` and :guilabel:`Vertical spacing`. If you are working in a smaller region, you may choose a smaller grid spacing. Leave other options to their default values and click the :guilabel:`Run` button to create the grid.

  .. image:: /static/3/block_world_styling/images/data8.png
    :align: center

9. A new layer ``Grid`` will be added to the :guilabel:`Layers` panel. We will now extract the minimum, maximum and average elevation values in each grid polygon. Select the ``Grid`` layer and locate the :menuselection:`Raster analysis --> Zonal statistics` algorithm from the Processing Toolbox. Double-click to open it.

  .. image:: /static/3/block_world_styling/images/data9.png
    :align: center

10. Select ``Grid`` as the :guilabel:`Input layer` and ``output_SRTM15Plus`` as the :guilabel:`Raster layer`. Enter ``dem_`` as the :guilabel:`Output column prefix`. Next we want to configure what statistics we want to extract from the raster. Click the :guilabel:`...` button next to :guilabel:`Statistics to calculate`.

  .. image:: /static/3/block_world_styling/images/data10.png
    :align: center

11. Check the options for ``Mean``, ``Maximum`` and ``Minimum`` values and click :guilabel:`OK`. We will save the results to a file. Click the :guilabel:`...` button next to :guilabel:`Zonal Statistics` and select :guilabel:`Save to File...`.

  .. image:: /static/3/block_world_styling/images/data11.png
    :align: center

12. Browse to a folder on your computer and enter the file name as ``hex_grid_with_elevation``. Make sure the file type is selected as :guilabel:`GeoPackage files (*.gpkg)`. Click :guilabel:`Save`. Once the :guilabel:`Zonal Statistics` dialog is configured, click :guilabel:`Run`.

  .. image:: /static/3/block_world_styling/images/data12.png
    :align: center

13. The processing may take a few minutes depending on the size of your grid. Once the calculations are complete, a new layer ``hex_grid_with_elevation`` will be added to the :guilabel:`Layers` panel. This is a vector layer having attributes ``dem_mean``, ``dem_min`` and ``dem_max`` containing elevation statistics extracted from the DEM.

  .. image:: /static/3/block_world_styling/images/data13.png
    :align: center

For convenience, you may directly download a copy of the prepared grid from below:

`hex_grid_with_elevation.gpkg <https://www.qgistutorials.com/downloads/hex_grid_with_elevation.gpkg>`_


Data Source [OPENTOPOGRAPHY]_

Procedure
---------

1. Locate the ``hex_grid_with_elevation.gpkg`` file in the QGIS Browser and expand it. Select the ``hex_grid_with_elevation`` layer and drag it to the canvas. 

  .. image:: /static/3/block_world_styling/images/1.png
    :align: center

2. A new layer ``hex_grid_with_elevation`` will now be loaded in QGIS and you should see a hex grid.

  .. image:: /static/3/block_world_styling/images/2.png
    :align: center

3. Before continuing, we must first add a color ramp suitable for coloring DEMs. Click on :guilabel:`Settings` in the menubar and select :guilabel:`Style Manager`.

  .. image:: /static/3/block_world_styling/images/3.png
    :align: center

4. Click on the plus sign :guilabel:`Add item` at the bottom and select :menuselection:`Catalog: cpt-city...`.

  .. image:: /static/3/block_world_styling/images/4.png
    :align: center

5. Scroll down the color ramps until you find :guilabel:`wiki-1.02`. There may be several with the same name, just click on one and click :guilabel:`OK`.

  .. image:: /static/3/block_world_styling/images/5.png
    :align: center

6. At the :guilabel:`Save New Color Ramp` window, enter the value ``wiki-1.02`` as the :guilabel:`Name`.
	 
  .. image:: /static/3/block_world_styling/images/6.png
    :align: center

7. Click :guilabel:`Save` to exit the window, then click :guilabel:`Close` to exit Style Manager. Now the wiki-1.02 color ramp is available to use in your projects going forward.

  .. image:: /static/3/block_world_styling/images/7.png
    :align: center

8. Click on :guilabel:`Open Layer Styling Panel` and switch from :guilabel:`Single Symbol` to :guilabel:`2.5 D`. Click the :guilabel:`ε` button next to :guilabel:`Height`.

  .. image:: /static/3/block_world_styling/images/8.png
    :align: center

9. In the :guilabel:`Expression Builder`, enter the following expression. This expression uses ``scale_exp()`` function to change the range of the attribute values ``dem_mean`` from 0-10000 to 0-4 and to use an exponent of 2. The exponential scaling looks pretty in block world. The ``+8000`` is to make the bottom of the ocean equal zero.

  .. code-block:: none

     scale_exp(("dem_mean"+8000),0,10000,0,4,2)
	 
  .. image:: /static/3/block_world_styling/images/9.png
    :align: center

10. Change the :guilabel:`Angle` to ``135``.

  .. image:: /static/3/block_world_styling/images/10.png
    :align: center

11. We will be applying our own colors to the grids. Click off :guilabel:`Shade walls based on aspect` and :guilabel:`Shadow`. 
	 
  .. image:: /static/3/block_world_styling/images/11.png
    :align: center

12. You should see the topography of region begin to take shape. Click on :guilabel:`Open Layer Styling Panel` and switch from :guilabel:`2.5D` back to :guilabel:`Single Symbol`.

  .. image:: /static/3/block_world_styling/images/12.png
    :align: center

13. In the :guilabel:`Symbol` window, notice there are two Geometry Generators, each with a :guilabel:`Simple Fill` layer type. The first :guilabel:`Simple Fill` is the top face of each block, whereas the second :guilabel:`Simple Fill` is the side face.

  .. image:: /static/3/block_world_styling/images/13.png
    :align: center

14. Click on the first :guilabel:`Simple Fill` to change the color of the top face. Click on :guilabel:`Data define override` button for the :guilabel:`Fill color` and select :guilabel:`Edit...` on the menu.

  .. image:: /static/3/block_world_styling/images/14.png
    :align: center

15. This brings up the :guilabel:`Expression Builder` dialog for Fill color. Enter the following expression. This expression has a ``CASE`` conditional statement to use wiki-1.02 colors when value of the attribute ``dem_mean`` is greater than or equal to zero and green-blue colors when ``dem_mean`` is less than zero.  

  .. code-block:: none

     CASE 
     WHEN "dem_mean" >= 0 THEN ramp_color('wiki-1.02',scale_linear("dem_min",0,1500,0.4,1))
     ELSE ramp_color('GnBu',scale_linear("dem_mean",-6000,0,1,0))
     END
	 
  .. image:: /static/3/block_world_styling/images/15.png
    :align: center

16. The hex grid is now rendered in colors determined by our expression. Click on :guilabel:`Data define override` button for the :guilabel:`Fill color` and select :guilabel:`Copy` on the menu.

  .. image:: /static/3/block_world_styling/images/16.png
    :align: center

17. Click on :guilabel:`Data define override` button for the :guilabel:`Stroke color` and select :guilabel:`Paste` on the menu.

  .. image:: /static/3/block_world_styling/images/17.png
    :align: center

18. You should see the colors take effect and our map is finished. Feel free to experiment with the expressions in this tutorial, like changing parameters in the height function or adding and trying new color ramps.

  .. image:: /static/3/block_world_styling/images/18.png
    :align: center
