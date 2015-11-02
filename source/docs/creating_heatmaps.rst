Creating Heatmaps
=================
.. raw:: html

   <p>[ Download PDF
   <a class="reference external" href="../pdf/creating_heatmaps_a4.pdf"
   onClick="ga('send', 'event', 'PDF Download', 'creating_heatmaps_a4');"
   target="_blank">A4</a>

   <a class="reference external"
   href="../pdf/creating_heatmaps_letter.pdf" onClick="ga('send',
   'event', 'PDF Download', 'creating_heatmaps_letter');"
   target="_blank">Letter</a> ]</p>

Heatmaps are one of the best visualization tools for dense point data. Heatmaps
are used to easily identify find clusters where there is a high concentration
of activity. They are also useful for doing `cluster analysis` or `hotspot
analysis`.

Overview of the task
--------------------

We will work with a dataset of crime locations in Surrey, UK for the year 2011
and find crime hotspots in the county.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to perform *HotSpot* or *Cluster* analysis on dense point data.

Get the data
------------

`data.police.uk <https://data.police.uk>`_ provides street-level crime,
outcome, and stop and search data in simple CSV format.

Download the data for `Surrey Police <https://data.police.uk/data/>`_ and unzip
the downloaded archive to extract the CSV file.

For convenience, you may directly download a copy of the dataset from the link
below:

`2015-08-surrey-street.csv <../../downloads/2015-08-surrey-street.csv>`_


Data Source [POLICEUK]_

Procedure
---------

1. To start, we will import the CSV file into QGIS. (see
   :doc:`importing_spreadsheets_csv`. for more details). Click
   :menuselection:`Layer --> Add Delimited Text Layer`.

.. image:: /static/creating_heatmaps/images/1.png
   :align: center

2. Browse to the ``2015-08-surrey-street.csv`` file on your computer and open
   it. (Your filename maybe different if you downloaded a fresh copy of the
   dataset). Select :guilabel:`CSV (comma separated values)` as the file
   format. You will see the ``Longitude`` and ``Latitude`` columns automatically
   selected as X and Y fields. Make sure you check the :guilabel:`Use spatial
   index` option as that will speed up your operations on this layer. Click
   :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/2.png
   :align: center

3. You may see some errors. You can ignore those for the purpose of this
   tutorials. Click :guilabel:`Close`.

.. image:: /static/creating_heatmaps/images/3.png
   :align: center

4. As the data layer is loaded in QGIS, you will see a warning dialog
   :guilabel:`CRS was undefined: defaulting to CRS EPSG:4326 - WGS84`. The CSV
   importer assumes the CRS EPSG:4326 if your coordinates are in
   Latitude/Longitude. If your X and Y coordinates were in a projected CRS, you
   will get a dialog prompting you to choose the CRS. As our data is in
   EPSG:4326, you can ignore the warning.

.. note::

   If you need to change the automatically assigned CRS, you can use
   :menuselection:`Vector --> Data Management Tols --> Define Current
   Projection...`.

.. image:: /static/creating_heatmaps/images/4.png
   :align: center

5. Zoom-in a bit closer to get a better look at the data. You will notice that
   the data is quite dense and it is hard to get an idea of where there is a
   high concentration of points. This is where a heatmap will come in handy.

.. image:: /static/creating_heatmaps/images/5.png
   :align: center

6. If you need to create a heatmap for purely visual purpose or for printing -
   QGIS has a built-in symbology renderer called :guilabel:`Heatmap`. Let's try
   that first. Right-click on the layer ``2015-08-surrey-street`` and select
   :guilabel:`Properties`.

.. image:: /static/creating_heatmaps/images/6.png
   :align: center

7. In the :guilabel:`Properties` dialog, switch to the :guilabel:`Style` tab.
   Select :guilabel:`Heatmap` as the renderer. You have a lot of choice of
   color-ramps for the heatmap. Choose the ``Oranges`` color-ramp. Leave the
   other parameters to default and click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/7.png
   :align: center

8. You will see a nice heatmap of your data and pockets of *heat* where there
   is a high concentration of crime. There are quite a few options available in
   the heatmap renderer to create the most appropriate visualization for your
   dataset. If you just wanted to create a heatmap for print or visual
   inspection - you are done! But we will explore another more powerful heatmap
   creation option where you can use the results in your analysis also.

.. image:: /static/creating_heatmaps/images/8.png
   :align: center

9. Enable a core plugin named ``Heatmap``. See :doc:`using_plugins` to know how
   to enable built-in plugins. Once you have enabled the plugin, go to
   :menuselection:`Raster --> Heatmap --> Heatmap`.

.. image:: /static/creating_heatmaps/images/9.png
   :align: center

10. In the :guilabel:`Heatmap Plugin` dialog, choose ``crime_heatmap`` as the
    name out the :guilabel:`Output raster`. Enter `1000` meters as the
    :guilabel:`Radius`. Radius is the area around each point that will be used
    to calculate the i`heat` a pixel received. Check the :guilabel:`Advanced` so
    we can specify the output size of our heatmap. Enter ``2000`` as
    :guilabel:`Rows` value. The :guilabel:`Columns` value will update
    automatically. Click :guilabel:`OK` to start the heatmap creation process.

.. image:: /static/creating_heatmaps/images/10.png
   :align: center

11. Once the processing is finished, you will see a grayscale layer called
    ``crime_heatmap`` loaded into the canvas. Uncheck the
    ``2015-08-surrey-street`` layer.

.. image:: /static/creating_heatmaps/images/11.png
   :align: center

12. Let's make our heatmap look more like the traditional heatmap similar to
    the earlier visualization. Right-click on the heatmap layer and click
    :guilabel:`Properties`.

.. image:: /static/creating_heatmaps/images/12.png
   :align: center

13. In the :guilabel:`Style` tab, select :guilabel:`Singleband pseudocolor` as
    the :guilabel:`Render type`. Next, under the section :guilabel:`Load
    min/max values`, select the :guilabel:`Estimate (faster)` as the
    :guilabel:`Accuracy` and click :guilabel:`Load`. This will scan the heatmap
    and find the minimum and maximum pixel values. These values will be used to
    generate an appropriate color ramp. In the section :guilabel:`Generate new
    color map`, select :guilabel:`YlOrRd` (Yellow-Orange-Red) as the color
    ramp, and click :guilabel:`Classify`. Click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/13.png
   :align: center

14. Now you will see a more appealing heatmap-like rendering of the layer. You
    can select the :guilabel:`Identify` tool and click on any pixel of the
    heatmap. You will see the pixel value in the resulting pop-up. This
    pixel-value is a measure of how many points from the source layer are
    contained within the specified radius ( in our case - 1000m) around the
    pixel.

.. image:: /static/creating_heatmaps/images/14.png
   :align: center

15. Now you have your heatmap layer that can be saved for future use. Many
    times, you want to identify the hotspots where there is
    high-concentration of points. We will now try to identify such hotspots
    using this heatmap. Go to :menuselection:`Raster --> Raster Calculator`.

.. image:: /static/creating_heatmaps/images/15.png
   :align: center

16. You will have to decide on a threshold value first. All pixel values above
    that threshold will be considered to be in a cluster. Let's use a value of
    ``10`` for this data. In :guilabel:`Raster calculator` dialog, name the
    output layer as ``crime_hotspots_vector``. Double-click on
    ``crime_heatmap@1`` under the :guilabel:`Raster bands` section and
    it will be added to the :guilabel:`Raster calculator expression` textarea.
    Complete the expression as shown below.  Check the box next to
    :guilabel:`Add result to project` and :guilabel:`OK`.

.. code-block:: none

   "crime_heatmap@1" > 10

.. image:: /static/creating_heatmaps/images/16.png
   :align: center

17. A new layer called ``crime_hotspots`` will be added to QGIS. This layer has
    pixels with values of either 0 or 1. All pixels in the input layer where
    the pixel value was larger than ``10`` now have a value of 1 and all
    remianing pixels are 0. Click on :menuselection:`Raster --> Conversion -->
    Polygonize (Raster to Vector)`.

.. image:: /static/creating_heatmaps/images/17.png
   :align: center

18. Name the output file as ``crime_hotspots_vector``. Check the box
    next to :guilabel:`Field name` as well as :guilabel:`Load into canvas when
    finished`. Click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/18.png
   :align: center

19. Once the conversion finishes, you will have yet another layer named
    ``crime_hotspots_vector`` added to QGIS. This is the vector representation
    of the clusters that were created in the previous step. The layers contain
    clusters with both 0 and 1 values.  Let's filter out the 0 values, so we
    get the clusters of hotspots.  Right-click on the layer and select
    :guilabel:`Open Attribute Table`.

.. image:: /static/creating_heatmaps/images/19.png
   :align: center

20. In the :guilabel:`Attribute table`, click on :guilabel:`Select feature
    using an expression`.

.. image:: /static/creating_heatmaps/images/20.png
   :align: center

21. Enter the expression as shown below and click :guilabel:`Select`. Next,
    click on :guilabel:`Close`.

.. code-block:: none

   "DN" = 0

.. image:: /static/creating_heatmaps/images/21.png
   :align: center

22. In the main attribute table window, you will see some features highlighted.
    These are the features that matched our query. Click the :guilabel:`Toggle
    editing mode` button in the toolbar and then click the :guilabel:`Delete
    selected features (DEL)` button.

.. image:: /static/creating_heatmaps/images/22.png
   :align: center

23. Once the selected features are deleted, click the :guilabel:`Save Edits`
    button and then :guilabel:`Toggle editing mode` again to put the layer in
    read-only mode. Close the attribute table window.

.. image:: /static/creating_heatmaps/images/23.png
   :align: center

24. In the main QGIS window, un-check the ``crime_hotspots`` layer. The final
    layer ``crime_hotspots_vector`` contains the cluster extracted from the
    heatmap. These clusters are the *intelligence* gathered from the raw data
    and  can provide useful insights as well as serve as an input for further
    action.

.. image:: /static/creating_heatmaps/images/24.png
   :align: center
