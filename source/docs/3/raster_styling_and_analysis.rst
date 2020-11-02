Basic Raster Styling and Analysis (QGIS3)
=========================================

A lot of scientific observations and research produces raster datasets. Rasters are grids of pixels that have a specific value assigned to them. By doing mathematical operations on these values, one can do some interesting analysis. QGIS has some basic analysis capabilities built-in via **Raster Calculator**. In this tutorial, we will explore the options available for styling rasters and functionality provided by the raster calculator. 

Overview of the task
--------------------

We will use population grid data to create a thematic map of the global population change between year 2000 and 2010.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to copy/paste styles between layers

Get the data
------------

We will use the `Gridded Population of the World (GPW) v4 <https://sedac.ciesin.columbia.edu/data/collection/gpw-v4>`_ dataset from Columbia University. Specifically, we need the `Population Count <https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11/data-download>`_ for the entire globe at 2.5 Degree Minute resolution in GeoTiFF format and for the year 2000 and 2010. You will need a free `Earth Data account <https://urs.earthdata.nasa.gov/home>`_ to download the data.

.. image:: /static/3/raster_styling_and_analysis/images/data1.png
   :align: center


For convenience, you may directly download a copy of the datasets from the
links below:

`gpw-v4-population-count-rev11_2000_2pt5_min_tif.zip <http://www.qgistutorials.com/downloads/gpw-v4-population-count-rev11_2000_2pt5_min_tif.zip>`_

`gpw-v4-population-count-rev11_2010_2pt5_min_tif.zip <http://www.qgistutorials.com/downloads/gpw-v4-population-count-rev11_2010_2pt5_min_tif.zip>`_

Data Source [GPW4]_

Procedure
---------

1. Open QGIS and locate the downloaded files in the :guilabel:`Browser` panel. Expand the ``gpw-v4-population-count-rev11_2000_2pt5_min_tif.zip`` file and drag the ``gpw-v4-population-count-rev11_2000_2pt5_min.tif`` file to the canvas.

  .. image:: /static/3/raster_styling_and_analysis/images/1.png
    :align: center
    
2. A new layer ``gpw-v4-population-count-rev11_2000_2pt5_min`` will be added to the :guilabel:`Layers` panel. Similarly, locate the ``gpw-v4-population-count-rev11_2010_2pt5_min_tif.zip`` file and drag the ``gpw-v4-population-count-rev11_2010_2pt5_min.tif`` file to the canvas.

  .. image:: /static/3/raster_styling_and_analysis/images/2.png
    :align: center
    
3. Let's explore these layers. Click the :guilabel:`Identify` button on the :guilabel:`Attributes Toolbar`. Once the tool is selected, click on any point on the canvas. 

  .. image:: /static/3/raster_styling_and_analysis/images/3.png
    :align: center
    
4. The value associated with that pixel will be displayed in a new :guilabel:`Identify Results` panel. In the :guilabel:`Identify Results` panel, change the :guilabel:`Mode` to ``Top down``. This will display pixel values of all rasters instead of just the topmost layer. Compare the values from both the layers. As the resolution of the rasters is approximately 5km x 5km, the pixel values represent the total population in the area (25 sq. km) represented by the pixel.

  .. image:: /static/3/raster_styling_and_analysis/images/4.png
    :align: center
    
5. Close the :guilabel:`Identify Results` panel. Let's create a better visualization of the layers. Click the :guilabel:`Open the layer Styling panel` button in the :guilabel:`Layers` panel.

  .. image:: /static/3/raster_styling_and_analysis/images/5.png
    :align: center
    
6. In the :guilabel:`Layer Styling` panel, click the :guilabel:`Render type` dropdown and select ``Singleband pseudocolor`` renderer.

  .. image:: /static/3/raster_styling_and_analysis/images/6.png
    :align: center
    
7. This renderer will style the layer using a color ramp. The default color ramp is white-red where the minimum value will be assigned the white color and the maximum value in the layer will be assigned the red color. The intermediate values will be assigned a shade of red linear interpolation. Expand the :guilabel:`Min / Max Value Settings` and choose ``Cumulative count cut`` option. You will see that the map visualization is much better now. The  The standard data range is set from 2% to 98% of the data values, meaning that the outliers will not be used to set the minimum and maximum values, resulting in a much more representative visualization.

  .. image:: /static/3/raster_styling_and_analysis/images/7.png
    :align: center
    
8. Close the :guilabel:`Layer Styling` panel. We can apply the similar styling to the other layer as well. But there is an easier way to transfer the styles from one layer to the other. Right-click the ``gpw-v4-population-count-rev11_2010_2pt5_min`` layer and select :menuselection:`Styles --> Copy Style`.

  .. image:: /static/3/raster_styling_and_analysis/images/8.png
    :align: center
    
9. Now right-click the un-styled ``gpw-v4-population-count-rev11_2000_2pt5_min`` layer and select :menuselection:`Styles --> Paste Style`.

  .. image:: /static/3/raster_styling_and_analysis/images/9.png
    :align: center
    
10. The same styling parameters will be applied to the other layer. This feature is particularly useful when you want to compare different layers using the same categorization. As you toggle the visibility of the top layer, you can see the changes in population visually.

  .. image:: /static/3/raster_styling_and_analysis/images/10.gif
    :align: center
    
11. Our task is to create a thematic map of the changes in population. Let's compute the difference between the 2 layers and create another raster where each pixel represents the change in the population. Go to :menuselection:`Raster --> Raster calculator`.

  .. image:: /static/3/raster_styling_and_analysis/images/10.gif
    :align: center
    
12. In the :guilabel:`Raster bands` section, you can select the layer by double-clicking on them. The bands are named after the raster name followed by ``@`` and band number. Since each of our rasters have only 1 band, you will the names with ``@1`` appended to the layer name. The raster calculator can apply mathematical     operations on the raster pixels. In this case we want to enter a simple formula to subtract the 2010 population from 2000. Enter the following expression. Next, click the :guilabel:`...` button next to :guilabel:`Output layer`.

  .. code-block:: none

    "gpw-v4-population-count-rev11_2010_2pt5_min@1" - "gpw-v4-population-count-rev11_2000_2pt5_min@1"

  .. image:: /static/3/raster_styling_and_analysis/images/12.png
    :align: center
    
13. Enter ``population_change_2010_2000.tif`` as the :guilabel:`Output file`. Click :guilabel:`OK` to start the computation.

  .. image:: /static/3/raster_styling_and_analysis/images/13.png
    :align: center
    
14. Once completed a new layer ``population_change_2010_2000`` will be added to the :guilabel:`Layers` panel. Let's change the styling so that the negative and positive population changes are better visualized.  Click the :guilabel:`Open the layer Styling panel` button in the :guilabel:`Layers` panel.

  .. image:: /static/3/raster_styling_and_analysis/images/14.png
    :align: center
    
15. One option is to use the similar styling technique as earlier and choose a diverging color ramp. Click the :guilabel:`Color ramp` drop-down and select ``Spectral`` ramp. Click the drop-down again and choose ``Invert Color Ramp`` to assign blues to low values and reds to high values.

  .. image:: /static/3/raster_styling_and_analysis/images/15.png
    :align: center
    
16. This is a good visualization, but not easy to interpret. Let's create a better map with 4 discrete categories, ``Decline``, ``Neutral``, ``Growth`` and ``High Growth``. Scroll down to the tables with classes. Hold the :kbd:`Shift` key and select all the rows. Click the :guilabel:`Remove selected row(s)` button.

  .. image:: /static/3/raster_styling_and_analysis/images/16.png
    :align: center
    
17. Change the :guilabel:`Interpolation` mode to ``Discrete``. We will now create a color map manually. Click the :guilabel:`Add values manually` button. Enter ``-100`` as the :guilabel:`Value` and ``Decline`` as the :guilabel:`Label`. Assign blue color to this category. The way color map works is that all values lower than the value entered will be given the color of that entry. You will notice the canvas will show only those areas with negative population change.

  .. image:: /static/3/raster_styling_and_analysis/images/17.png
    :align: center
    
18. Complete the color-map with suitable values. I chose ``100``, ``1000`` and ``100000`` as the upper-bounds for the ``Neutral``, ``Growth`` and ``High Growth`` categories respectively. Assign colors to each of created categories, for example beige, orange and red.

  .. image:: /static/3/raster_styling_and_analysis/images/18.png
    :align: center
    
19. Once you are satisfied with the visualization, close the :guilabel:`Layer Styling` panel. You now have a global thematic map of population change.

  .. image:: /static/3/raster_styling_and_analysis/images/19.png
    :align: center
    