Animating Time Series Data (QGIS3)
==================================

Time is an important component of many spatial datasets. Along with location information, time providers another dimension for analysis and visualization of data. If you are working with dataset that contains timestamps or have observations recorded at multiple time-steps, you can easily visualize it using the **TimeManager** plugin in QGIS. TimeManager allows you to view and export 
'slices' of data between certain time intervals that can be combined into animations. 


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

`ASAM_shp.zip <http://www.qgistutorials.com/downloads/ASAM_shp.zip>`_

`ne_10m_land.zip <http://www.qgistutorials.com/downloads/ne_10m_land.zip>`_

Data Source: [NGA_MSI]_ [NATURALEARTH]_

Setup
-----

Go to :menuselection:`Plugins --> Manage and Install Plugins...`. Search for and install the **TimeManager** plugin.

.. image:: /static/3/animating_time_series/images/setup1.png
   :align: center
   
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

5. Now let's animate this data to show the yearly map of piracy incidents. Go to :menuselection:`Plugins --> TimeManager --> Toggle visibility`.

  .. image:: /static/3/animating_time_series/images/5.png
      :align: center

6. In the :guilabel:`TimeManager` panel, click :guilabel:`Settings`.

  .. image:: /static/3/animating_time_series/images/6.png
      :align: center

7. In the :guilabel:`Time manager settings` window, click :guilabel:`Add layer` button.

  .. image:: /static/3/animating_time_series/images/7.png
      :align: center

8. The source data contains an attribute ``dateofocc`` - representing the date on which the incident took place. This is the field that will be used by the plugin to determine the points that are rendered for each time period. Select ``ASAM_events`` as the :guilabel:`Layer` and ``dateofocc`` as the :guilabel:`Start time`. The :guilabel:`End time` should be set to ``Same as start``. Click :guilabel:`OK`.

  .. image:: /static/3/animating_time_series/images/8.png
      :align: center

9. Back in the :guilabel:`Time manager settings` window, click :guilabel:`OK`.

  .. image:: /static/3/animating_time_series/images/9.png
      :align: center

10. Click the :guilabel:`Power` icon in the :guilabel:`TimeManager` panel to enable the plugin. Set the :guilabel:`Time frame size` to be ``1 years``. Once enabled, you will see a filter icon next to the ``ASAM_events`` layer. TimeManager works by applying a filter to the layer based on the selected field and specified time period. 

  .. image:: /static/3/animating_time_series/images/10.png
      :align: center

.. note::

  As TimeManager works by applying a filter on the layer, it only works with layer types that support this feature. Most data source types do support it - with a notable exception being temporary memory layers. If you had done some processing earlier and have a temporary layer, right-click and select :guilabel:`Make Permanent` before using TimeManager on that layer.
  
11. Now you are ready to see the animation. Click the :guilabel:`Play` button to see the yearly piracy hotspot animation.

  .. image:: /static/3/animating_time_series/images/11.gif
      :align: center

12. You will notice that for each frame of the animation, a date is displayed at the bottom-right. Instead of the full date and time, let's change it to display the year that the map represents. Click :guilabel:`Settings` in the :guilabel:`Time Manager` panel. Click :guilabel:`Time display options` in the :guilabel:`Time manager settings` dialog.

  .. image:: /static/3/animating_time_series/images/12.png
      :align: center

13. Adjust the :guilabel:`Font Size` to ``25``. Change the :guilabel:`DateTime` format to ``%Y``. The time format should be specified in the `Python strftime <https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior>`_ format. ``%Y`` is the short-code for a 4 digit year. Also you can change the :guilabel:`Placement direction` to ``NW``. Click :guilabel:`OK`.

  .. image:: /static/3/animating_time_series/images/13.png
      :align: center

14. Back in :guilabel:`Time manager settings` dialog, check the :guilabel:`Looping animation` checkbox. This helps when you are making changes to styling and adjusting styling to make the animation continue playing back from start. Click :guilabel:`OK`.

  .. image:: /static/3/animating_time_series/images/14.png
      :align: center

15. Now if you replay the animation, you will see the label will show the year of the animation in the top-left corner. At this point, we can export the animation, but there is one more change that we can apply to make our map better. The default map projection is ``EPSG:4326`` which is ok for storing the source data, but not ideal for global visualization like this. I really like the `Equal Earth Projection <http://equal-earth.com/equal-earth-projection.html>`_ for a visually pleasing and more accurate representation of the world. It is a fairly new projection and not yet available as a predefined option in QGIS. But there is an easy way to use it in QGIS by defining a custom projection. Go to :menuselection:`Settings --> Custom Projections...`.

  .. image:: /static/3/animating_time_series/images/15.png
      :align: center

16. In the :guilabel:`Custom Coordinate Reference System Definition` dialog, click the :guilabel:`+` button. Enter ``Equal Earth`` as the :guilabel:`name`. Enter the following definition in the :guilabel:`Parameters` box. The parameters need to be specified in the `PROJ format <https://proj.org/operations/projections/eqearth.html>`_. After entering the parameters, click :guilabel:`OK`.

  .. code-block:: none

    +proj=eqearth +datum=WGS84 +wktext

  .. image:: /static/3/animating_time_series/images/16.png
      :align: center
  
17. In the main QGIS window, click the :guilabel:`Current CRS` display on the bottom-right corner.

  .. image:: /static/3/animating_time_series/images/17.png
      :align: center

18. Search for ``Equal Earth`` to find and select the newly defined projection. Click :guilabel:`OK`.

  .. image:: /static/3/animating_time_series/images/18.png
      :align: center

19. You will see the map transform to the Equal Earth projection. Now we are ready to export the animation. Before exporting, make sure to set the time-slider in the :guilabel:`Time Manager` panel to the start position. Export of the animation will start from the current position of the time slider. Click :guilabel:`Export Video` button in the :guilabel:`Time Manager` panel.

  .. image:: /static/3/animating_time_series/images/19.png
      :align: center

20. In the :guilabel:`Export Video dialog`, click :guilabel:`Select output folder` and select a directory on your computer. Select the :guilabel:`Frames only` option and click :guilabel:`OK` to start the export process.

  .. image:: /static/3/animating_time_series/images/20.png
      :align: center

21. Once the export finishes, you will see PNG images for each year in the output directory. Now let's create an animated GIF from these images. There are many options for creating animations from individual image frames. I like `ezgif.com <https://ezgif.com/maker>`_ for an easy and online tool. Visit the site and click :guilabel:`Choose Files` and select all the ``.png`` files. Note that the export folder will also have a ``.pgw`` file for each frame which contains the georeference information. You may want to sort the images by ``Type`` to allow easy bulk selection of only ``.png`` files. Once selected, click the :guilabel:`Upload and  make a GIF!` button.

  .. image:: /static/3/animating_time_series/images/21.png
      :align: center

22. Once the process finishes, click the :guilabel:`Save` button to download the GIF to your computer.

  .. image:: /static/3/animating_time_series/images/animation.gif
      :align: center

