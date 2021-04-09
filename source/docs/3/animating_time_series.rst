Animating Time Series Data (QGIS3)
==================================

Time is an important component of many spatial datasets. Along with location information, time providers another dimension for analysis and visualization of data. If you are working with dataset that contains timestamps or have observations recorded at multiple time-steps, you can easily visualize it using the **Temporal controler**. Temporal controler allows you to view and export 'slices' of data between certain time intervals that can be combined into animations. 

.. note::

  Temporal Controller is available from QGIS 3.14 onwards. For older versions of QGIS, the **Time Manager plugin** provides a similar functionality.


Overview of the task
--------------------

We will take a point layer of maritime piracy incidents, create a heatmap visualization and create an animation of how the piracy hot-spots have changed over past 2 decades.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Using the Heatmap renderer for quick visualization of dense point data
- Creating and using custom map projections

Get the data
------------
National Geospatial-Intelligence Agency's `Maritime Safety Information portal <https://msi.nga.mil/NGAPortal/MSI.portal>`_ provides a shapefile of all incidencts of maritine piracy in the form on `Anti-shipping Activity Messages <https://msi.nga.mil/Piracy>`_. Download the `Arc Shape file <https://msi.nga.mil/api/publications/download?key=16920958/SFH00000/ASAM_shp.zip&type=download>`_ version of the database.

`Natural Earth <http://naturalearthdata.com>`_ has several global vector
layers. Download the `10m Physical Vectors - Land <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_land.zip>`_ containing Land polygons.

For convenience, you may directly download a copy of the above layers from below:

`ASAM_shp.zip <https://www.qgistutorials.com/downloads/ASAM_shp.zip>`_

`ne_10m_land.zip <https://www.qgistutorials.com/downloads/ne_10m_land.zip>`_

Data Source: [NGA_MSI]_ [NATURALEARTH]_


Procedure
---------

1. In the QGIS Browser Panel, locate the directory where you saved your downloaded data. Expand the ``ne_10m_land.zip`` and select the ``ne_10m_land.shp`` layer. Drag the layer to the canvas. Next, locate the ``ASAM_shp.zip`` file. Expand it and select the ``asam_data_download/ASAM_events.shp`` layer and drag it on to the canvas.
  
  .. image:: /static/3/animating_time_series/images/1.png
    :align: center
   
2. Once the layer is loaded, you can see the individual points representing incidents of piracy locations. There are thousands of incidents and it is difficult to determine with more piracy. Rather than individual points, a better way to visualize this data is through a heatmap. Select the ``ASAM_events`` layers and click the :guilabel:`Open the layer Styling Panel` button in the :guilabel:`Layers` panel. Click the ``Single symbol`` drop-down.

  .. image:: /static/3/animating_time_series/images/2.png
      :align: center
   
3. In the renderer selection drop-down, select ``Heatmap`` renderer. Next, select the ``Viridis`` color ramp from the :guilabel:`Color ramp` selector.

  .. image:: /static/3/animating_time_series/images/3.png
      :align: center
   
4. Adjust the :guilabel:`Radius` value to ``5.0``. At the bottom, expand the :guilabel:`Layer Rendering` section and adjust the :guilabel:`Opacity` to ``75.0%``. This gives a nice visual effect of the hotspots with the land layer below.

  .. image:: /static/3/animating_time_series/images/4.png
      :align: center

5. Now let’s animate this data to show the yearly map of piracy incidents. Right click on ``ASAM_event`` layer, and choose ``Properties``.

  .. image:: /static/3/animating_time_series/images/5.png
      :align: center

6. In the :guilabel:`Layer properties` dialog box, select the :guilabel:`Temporal` tab and enable it by clicking the checkbox..

  .. image:: /static/3/animating_time_series/images/6.png
      :align: center

7. The source data contains an attribute ``dateofocc`` - representing the date on which the incident took place. This is the field that will be used to determine the points that are rendered for each time period. Select ``Single Field with Data/Time`` in :guilabel:`Configuration` Drop down menu, ``dateofocc`` as :guilabel:`Field`.

  .. image:: /static/3/animating_time_series/images/7.png
      :align: center

8. Now a clock symbol will appear next to the layer name. Click on the ``Temporal Control Panel`` (Clock icon) from Map Navigation Toolbar.

  .. image:: /static/3/animating_time_series/images/8.png
      :align: center

9. Click on the ``Animated Temporal Navigation`` (play icon) to activate the animation controls. Click the :guilabel:`Set to Full Range` (refresh icon) next to :guilabel:`Range` to automatically set the time range to the match the dataset. 

  .. image:: /static/3/animating_time_series/images/9.png
      :align: center

10. Now you are ready to preview the animation. Set the :guilabel:`Step` as ``1 Year`` then click the :guilabel:`Play` button to start the animation. 

  .. image:: /static/3/animating_time_series/images/10.png
      :align: center

.. note:: 
  If the animation is too fast, you can adjust the frame rate by clicking ``Temporal Settings`` (yellow gear icon) at top-right corner of Temporal Controller panel. Decreasing the the frame rate (frames per second) will slow down the animation.

11. It would be helpful to also display a label showing the current time frame on the map. We can do that using the built in Title decoration. Go to :menuselection:`View --> Decorations --> Title Label`.

  .. image:: /static/3/animating_time_series/images/11.png
      :align: center
  
12. Click the checkbox to enable it and click ``Insert an Expression`` button and enter the following expression to display the year. Here the variable ``@map_start_time`` contains the timestamp of the current time slice being displayed. So we can use that timestamp and format it to display year of occurrence. See the `QGIS Documentation <https://docs.qgis.org/testing/en/docs/user_manual/working_with_vector/functions_list.html#format-date>`_ for details on various supported formatting options for the timestamp.

  .. code-block:: none

     format_date(@map_start_time, 'yyyy')

  .. image:: /static/3/animating_time_series/images/12.png
     :align: center 

13. Select :guilabel:`font size` as ``25``, set :guilabel:`background bar colour` as ``White`` and set the transparency to ``50%``. In :guilabel:`Placement` choose ``Bottom Right``. Now click Ok.

  .. image:: /static/3/animating_time_series/images/13.png
      :align: center

14. Once the parameters are set accordingly, the year will display as shown. To export these as images and convert them as GIF select the ``Export Animation`` (save icon) in the Temporal control window.

  .. image:: /static/3/animating_time_series/images/14.png
      :align: center

15. Click on the ``...`` :guilabel:`Output directory` to choose the directory at which the images will be saved. 

  .. image:: /static/3/animating_time_series/images/15.png
      :align: center

16. Under the :guilabel:`Extent` select the :menuselection:`Calculate from Layer --> ne_10_land` layer. Click Save.

  .. image:: /static/3/animating_time_series/images/16.png
      :align: center

17. Once the export finishes, you will see PNG images for each year (total 18 images) in the output directory. 

  .. image:: /static/3/animating_time_series/images/17.png
      :align: center

18. Now let’s create an animated GIF from these images. There are many options for creating animations from individual image frames. I like `ezgif <https://ezgif.com/maker>`_ for an easy and online tool. Visit the site and click :guilabel:`Choose Files` and select all the .png files. Once selected, click the :guilabel:`Upload and make a GIF!` button. Once created, you can download the GIF using the :guilabel:`Save` button.

  .. image:: /static/3/animating_time_series/images/18.gif
      :align: center


