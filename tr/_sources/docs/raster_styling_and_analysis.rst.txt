Basic Raster Styling and Analysis
=================================

.. warning:: 

   This tutorial is now obsolete. A new and updated version is available at :doc:`3/raster_styling_and_analysis`
   
A lot of scientific observations and research produces raster datasets. Rasters
are essentially grids of pixels that have a specific value assigned to them. By
doing mathematical operations on these values, one can do some interesting
analysis. QGIS has some basic analysis capabilities built-in via `Raster
Calculator`. In this tutorial, we will explore basics on using `Raster Calculator`
and options available for styling rasters.

Overview of the task
--------------------

We will use population density grid data to find and visualize areas of the world
that have seen dramatic population density change between year 1990 and 2000.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Selecting and loading multiple datasets in a single step in QGIS.

Get the data
------------

We will use the `Gridded Population of the World (GPW) v3
<http://sedac.ciesin.columbia.edu/data/collection/gpw-v3>`_ dataset from
Columbia University. Specifically, we need the Population Density Grid for the
entire globe in ASCII format and for the year 1990 and 2000.

Here is how to search and download the revelant data.

1. Go to the `Population Density Grid, v3 download page.
   <http://sedac.ciesin.columbia.edu/data/set/gpw-v3-population-density/data-download>`_
   Select the :guilabel:`Data Attributes` as :guilabel:`.ascii format`,
   :guilabel:`1° resolution` and :guilabel:`1990 year`. Click
   :guilabel:`Download`. At this point, you may create a free account and
   login, or use the :guilabel:`Guest Download` button at the bottom to
   immediately download the data. Repeat the process for :guilabel:`2000 year`
   data.

.. image:: /static/raster_styling_and_analysis/images/1.png
   :align: center

You will now have 2 zip files downloaded.

For convenience, you may directly download a copy of the datasets from the
links below:

`gl_gpwv3_pdens_90_ascii_one.zip <http://www.qgistutorials.com/downloads/gl_gpwv3_pdens_90_ascii_one.zip>`_

`gl_gpwv3_pdens_00_ascii_one.zip <http://www.qgistutorials.com/downloads/gl_gpwv3_pdens_00_ascii_one.zip>`_

Data Source [GPW3]_

Procedure
---------

2. Open QGIS and go to :menuselection:`Layer --> Add Raster Layer..`.

.. image:: /static/raster_styling_and_analysis/images/2.png
   :align: center

3. Locate the downloaded zip files. Hold down the :kbd:`Ctrl` key and click on
   both the zip files to select them. This way you are able to load both the
   files in a single step.

.. image:: /static/raster_styling_and_analysis/images/3.png
   :align: center

4. Each zip file contain 2 grid files. The ``a`` in the filename
   suggests that the population counts were adjusted to match the UN totals. We
   will use the adjusted grids for this tutorial. Select ``glds00ag60.asc`` as
   the layer to add. Click :guilabel:`OK`.

.. image:: /static/raster_styling_and_analysis/images/4.png
   :align: center

5. The layer doesn’t have a CRS defined, and since the grids are in lat/long,
   choose `EPSG:4326` as the coordinate reference system.

.. image:: /static/raster_styling_and_analysis/images/5.png
   :align: center

6. Since we selected both the zip files, you will see similar dialogs once
   again. Repeat the process and select ``glds90ag60.asc`` grid as the layer to
   add.

.. image:: /static/raster_styling_and_analysis/images/6.png
   :align: center

7. Once again, choose `EPSG:4326` as the CRS.

.. image:: /static/raster_styling_and_analysis/images/7.png
   :align: center

8. Now you will see both the rasters loaded in QGIS. The raster is rendered as
   in grayscale, where darker pixels indicate lower values and lighter pixels
   indicate higher values.

.. image:: /static/raster_styling_and_analysis/images/8.png
   :align: center

9. Each pixel in the raster has a value assigned. This value is the population
   density for that grid. Click on :guilabel:`Identify Features` button to
   select the tool and click anywhere on the raster to see the value of that
   pixel.

.. image:: /static/raster_styling_and_analysis/images/9.png
   :align: center

10. To better visualize the pattern of population density, we would need to
    style it. Right-click on the layer name and select :guilabel:`Properties`.
    You can also double-click on the layer name in the TOC to bring up the
    Layer Properties dialog.

.. image:: /static/raster_styling_and_analysis/images/10.png
   :align: center

11. Under the :guilabel:`Style` tab, change the :guilabel:`Render type`
    to :guilabel:`Singleband pseudocolor`. Next, click :guilabel:`Classify`
    under :guilabel:`Generate a new color map`. You will see 5 new color
    values created. Click :guilabel:`OK`.

.. image:: /static/raster_styling_and_analysis/images/11.png
   :align: center

12. Back in the QGIS Canvas, you will see a heatmap-like rendering of the
    raster. Repeat the same process for the other raster as well.

.. image:: /static/raster_styling_and_analysis/images/12.png
   :align: center

13. For our analysis, we would like to find areas with largest population
    change between 1990 and 2000. The way to accomplish this is by finding the
    difference between each grid’s pixel value in both the layers. Select
    :menuselection:`Raster --> Raster calculator`.

.. image:: /static/raster_styling_and_analysis/images/13.png
   :align: center

14. In the :guilabel:`Raster bands` section, you can select the layer by
    double-clicking on them. The bands are named after the raster name followed
    by @ and band number. Since each of our rasters have only 1 band, you will
    see only 1 entry per raster. The raster calculator can apply mathematical
    operations on the raster pixels. In this case we want to enter a simple
    formula to subtract the 1990 population density from 2000. Enter
    ``glds00ag60@1 - glds90ag60@1`` as the formula. Name your output layer as
    ``pop_density_change_2000_1990.tif`` and check the box next to
    :guilabel:`Add result to project`. Click :guilabel:`OK`.

.. image:: /static/raster_styling_and_analysis/images/14.png
   :align: center

15. Once the operation is complete, you will see the new layer load in QGIS.

.. image:: /static/raster_styling_and_analysis/images/15.png
   :align: center

16. This grayscale visualization is useful, but we can create a much more
    informative output. Right-click on the ``pop_density_change_2000_1990``
    layer and select :guilabel:`Properties`.

.. image:: /static/raster_styling_and_analysis/images/16.png
   :align: center

17. We want to style the layer so pixel values in certain ranges get the same
    color. Before we dive in to that, go to the :guilabel:`Metadata` tab and
    look at the properties of the raster. Note the minimum and maximum values
    of this layer.

.. image:: /static/raster_styling_and_analysis/images/17.png
   :align: center

18. Now go to the :guilabel:`Style` tab. Select :guilabel:`Singleband
    pseudocolor` as the :guilabel:`Render type` under :guilabel:`Band
    Rendering`. Set the :guilabel:`Color interpolation` to
    :guilabel:`Discrete`.  Click the :guilabel:`Add entry` button 4 times to
    create 4 unique classes. Click on an entry to change the values. The way
    color map works is that all values lower than the value entered will be
    given the color of that entry. Since the minmum value in our raster is just
    above -2000, we choose -2000 as the first entry. This will be for the No
    Data values. Enter the values and Labels for other entries as below and
    click :guilabel:`OK`.

.. image:: /static/raster_styling_and_analysis/images/18.png
   :align: center

19. Now you will see a much more powerful visualization where you can see areas
    which has seen positive and negative population density changes. Click on
    :guilabel:`Zoom In` button and draw a rectangle around Europe to
    explore the region in more detail.

.. image:: /static/raster_styling_and_analysis/images/19.png
   :align: center

20. Select the :guilabel:`Identify` tool and click on the Red and Blue regions
    to verify that your styling rules worked as intended.

.. image:: /static/raster_styling_and_analysis/images/20.png
   :align: center

21. Now let’s take this analysis one-step further and find areas with only
    `negative` population density change. Open :menuselection:`Raster -->
    Raster calculator`.

.. image:: /static/raster_styling_and_analysis/images/21.png
   :align: center

22. Enter the expression as shown below What this expression will do is set the
    value of the pixel to 1 is if matches the expression and 0 if it doesn't.
    So we will get a raster with pixel value of 1 where there was negative
    change and 0 where there wasn't. Name the output layer as
    ``negative_pop_change_2000_1990`` and check the box next to :guilabel:`Add
    result to project`. Click OK.

.. code-block:: none

   pop_density_change_2000_1990@1 < -10

.. image:: /static/raster_styling_and_analysis/images/22.png
   :align: center

23. Once the new layer is loaded, right-click on it and select
    :guilabel:`Properties`. In the :guilabel:`Transparency` tab, add 0 as the
    :guilabel:`Additional no data value`. This setting will make the pixels
    with 0 values also transparent. Click :guilabel:`OK`.

.. image:: /static/raster_styling_and_analysis/images/23.png
   :align: center

24. Now you will see the areas of negative population density change as gray
    pixels.

.. image:: /static/raster_styling_and_analysis/images/24.png
   :align: center
