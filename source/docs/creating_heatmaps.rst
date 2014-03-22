Creating Heatmaps
=================
.. only:: html

   [ Download PDF `A4 <../pdf/creating_heatmaps_a4.pdf>`_ `Letter
   <../pdf/creating_heatmaps_letter.pdf>`_ ]

Heatmaps are one of the best visualization tools for dense point data. Heatmaps are used to easily identify find clusters where there is a high concentration of activity. They are also useful for doing `cluster analysis` or `hotspot analysis`.

Overview of the task
--------------------

We will work with a dataset of crime locations in Surrey, UK for the year 2011 and find crime hotspots in the county.

Get the data
------------

London datastore provides the `raw data from the Police.uk crime mapping website  <http://data.london.gov.uk/datastore/package/policeuk-crime-data>`_. 

Download the `Surrey data <http://data.london.gov.uk/datafiles/crime-community-safety/police-uk-crime-data-surrey.zip>`_.


Procedure
---------

1. To start, unzip the data to a folder. The data is in a CSV format. We will import this data into QGIS. (see :doc:`importing_spreadsheets_csv`. for more details). Click :menuselection:`Layer --> Add Delimited Text Layer`.

.. image:: /static/creating_heatmaps/images/1.png
   :align: center

2. Browse to the `police-uk-crime-data-surrey.txt` file on your computer and open it. Select :guilabel:`CSV (comma separated values)` as the file format. You will see the *Easting* and *Northing* columns automatically selected as X and Y fields. Make sure you check the :guilabel:`Use spatial index` option as that will speed up your operations on this layer. Click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/2.png
   :align: center

3. You may see some errors. You can ignore those for the purpose of this tutorials. Click :guilabel:`Close`.

.. image:: /static/creating_heatmaps/images/3.png
   :align: center

4. Next, you need to choose a `Coordinate Reference System (CRS)`. If you read the data description, you will notice that the spatial reference for the data is *British National Grid*. Choose :guilabel:`OSGB 1936 / British National Grid` as the CRS. Click :guilabel:`OK`.
 
.. image:: /static/creating_heatmaps/images/4.png
   :align: center

5. Now you will see the data loaded into QGIS.

.. image:: /static/creating_heatmaps/images/5.png
   :align: center

6. Zoom-in a bit closer to get a better look at the data. You will notice that the data is quite dense and it is hard to get an idea of where there is a high concentration of points. This is where a heatmap will come in handy. 

.. image:: /static/creating_heatmaps/images/6.png
   :align: center

7. To create the heatmap, you need to enable a core plugin named `Heatmap`. See :doc:`using_plugins` to know how to enable built-in plugins. Once you have enabled the plugin, go to :menuselection:`Raster --> Heatmap --> Heatmap`.

.. image:: /static/creating_heatmaps/images/7.png
   :align: center

8. In the :guilabel:`Heatmap Plugin` dialog, choose `crime_heatmap` as the name out the :guilabel:`Output raster`. Enter `1000` map units as the :guilabel:`Radius`. Radius is the area around each point that will be used to calculate the `heat` a pixel received. Check the :guilabel:`Advanced` so we can specify the output size of our heatmap. Enter `100` as :guilabel:`Cell Size X` and :guilabel:`Cell Size Y`. Click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/8.png
   :align: center

9. Once the processing is finished, you will see a grayscale heatmap loaded into the canvas. 

.. image:: /static/creating_heatmaps/images/9.png
   :align: center

10. Let's make our heatmap look more like the traditional heatmap you often see. Right-click on the heatmap layer and click :guilabel:`Properties`.

.. image:: /static/creating_heatmaps/images/10.png
   :align: center

11. In the :guilabel:`Style` tab, select :guilabel:`Singleband pseudocolor` as the :guilabel:`Render type`. Next, under the section :guilabel:`Load min/max values`, select the :guilabel:`Actual (slower)` as the :guilabel:`Accuracy` and click :guilabel:`Load`. This will scan the heatmap and find the minimum and maximum pixel values. These values will be used to generate an appropriate color ramp. In the section :guilabel:`Generate new color map`, select :guilabel:`YlOrRd` (Yellow-Orange-Red) as the color ramp, and click :guilabel:`Classify`. Click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/11.png
   :align: center

12. Now you will see a more appealing heatmap-like rendering of the layer. You can select the :guilabel:`Identify` tool and click on any pixel of the heatmap. You will see the pixel value in the resulting pop-up. This pixel-value is a measure of how many points from the source layer are contained within the specified radius ( in our case - 1000m) around the pixel.  

.. image:: /static/creating_heatmaps/images/12.png
   :align: center

13. Now you have your heatmap. It is useful for visual interpretation, but not very useful if you want to use these results in analysis. Many times, you want to identify the `hotspots` whese there is high-concentration of points. We will now try to identify such `hotspots` using this heatmap. Go to :menuselection:`Raster --> Raster Calculator`.

.. image:: /static/creating_heatmaps/images/13.png
   :align: center

14. You will have to decide on a threshold value first. All pixel values above that threshold will be considered to be in a cluster. Let's use a value of 5 for this data. In :guilabel:`Raster calculator` dialog, name the output layer as `crime_hotspots`. Double-click on :guilabel:`crime_heatmap@1` under the :guilabel:`Raster bands` section and it will be added to the :guilabel:`Raster calculator expression` textarea. Complete the expression as `"crime_heatmap@1" > 5`. Check the box next to :guilabel:`Add result to project` and :guilabel:`OK`. 
 
.. image:: /static/creating_heatmaps/images/14.png
   :align: center

15. A new layer will be added to QGIS. This layer has pixels with values of either 0 or 1. All pixels in the input layer where the pixel value was larger than 5 now have a value of 1 and all remianing pixels are 0. Click on :menuselection:`Raster --> Conversion --> Polygonize (Raster to Vector)`. 

.. image:: /static/creating_heatmaps/images/15.png
   :align: center

16. Name the output file as :guilabel:`crime_hotspots_vector`. Check the box next to :guilabel:`Field name` as well as :guilabel:`Load into canvas when finished`. Click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/16.png
   :align: center

17. Once the conversion finishes, you will have yet another layer added to QGIS. This is the vector representation of the clusters that were created in the previous step. The layers contain clusters with both 0 and 1 values. Let's filter out the 0 values, so we get the clusters of hotspots. Right-click on the layer and select :guilabel:`Open Attribute Table`.

.. image:: /static/creating_heatmaps/images/17.png
   :align: center

18. In the :guilabel:`Attribute table`, click on :guilabel:`Select feature using an expression`.  

.. image:: /static/creating_heatmaps/images/18.png
   :align: center

19. Enter the expression as `"DN" = 1` and click :guilabel:`Select`. Next, click on :guilabel:`Close`.

.. image:: /static/creating_heatmaps/images/19.png
   :align: center

20. In the mian QGIS window, you will see some features highlighted in yellow. These are the features that matched our query. Right-click on the layer and select :guilabel:`Save Selection As...`. 
 
.. image:: /static/creating_heatmaps/images/20.png
   :align: center

21. Name the output layer as `crime_clusters`. Check the box next to :guilabel:`Add saved file to map` and click :guilabel:`OK`.

.. image:: /static/creating_heatmaps/images/21.png
   :align: center

22. There you have it. The final layer contains the `hotspots` extracted from the heatmap. These clusters are the *intelligence* gathered from the raw data and  can provide useful insights as well as serve as an input for further action.

.. image:: /static/creating_heatmaps/images/22.png
   :align: center
