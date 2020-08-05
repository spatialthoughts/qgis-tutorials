Running Processing Algorithms via Python (QGIS3)
================================================

The Processing Toolbox in QGIS contain an ever-growing collection of geoprocessing tools. The toolbox provides an easy batch processing interface to run any algorithm on a large number of inputs. See :doc:`batch_processing`. But there are cases where you need to incorporate a little bit of custom logic in your batch processing. As all the processing algorithms can be run programmatically via the Python API, you can run them via the Python Console. This tutorial shows how to run a processing algorithm via the Python Console to perform a custom geoprocessing task in just a few lines of code. Please review the :doc:`getting_started_with_pyqgis` tutorial to get familiar with the basics of the Python Scripting environment in QGIS.

Overview of the Task
--------------------

We will use 12 gridded raster layers representing precipitation for each month of year and calculate average monthly rainfall for all zip codes in the Seattle area.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- How to delete a column (i.e. field) from a vector layer.

Get the data
------------

`The PRISM Climate Group <http://www.prism.oregonstate.edu/>`_ gathers climate observation and provides historic and current climate data for the conterminous US. Head over to the `Recent Years <http://www.prism.oregonstate.edu/recent/>`_ data page and download the monthly precipitation data for the year 2017 in BIL format.

.. image:: /static/3/processing_algorithms_pyqgis/images/data1.png
   :align: center


`City of Seattle Open Data portal <https://data.seattle.gov/>`_ provides free and open data for the city. Search for and download the `Zip Codes <https://data.seattle.gov/Land-Base/Zip-Codes/n58k-cykw>`_ data in the shapefile format.

For convenience, you may directly download a copy of both the datasets from the links below:

`PRISM_ppt_stable_4kmM3_2017_all_bil.zip <http://www.qgistutorials.com/downloads/PRISM_ppt_stable_4kmM3_2017_all_bil.zip>`_

`Zip_Codes.zip <http://www.qgistutorials.com/downloads/Zip_Codes.zip>`_

Data Source [PRISM]_ [CITYOFSEATTLE]_

Procedure
---------

1. Unzip the ``PRISM_ppt_stable_4kmM3_2017_all_bil.zip`` file. Locate the ``PRISM_ppt_stable_4kmM3_2017_all_bil`` folder in the QGIS Browser and expand it. The folder contains 12 individual layers for each month. Hold the :kbd:`Ctrl` key and select the ``.bil`` files for all 12 months. Once selected, drag them to the canvas.

  .. image:: /static/3/processing_algorithms_pyqgis/images/1.png
     :align: center

.. note::

  The data is provided in the `BIL format <http://desktop.arcgis.com/en/arcmap/10.3/manage-data/raster-and-images/bil-bip-and-bsq-raster-files.htm>`_. Each layer is presented with a set of files ``.bil`` file containing the actual data, a ``.hdr`` file describing the data structure and a ``.prj`` file containing the projection information. QGIS can load the ``.bil`` file and provided the other files exist in the same directory.
  
2. Next, unzip the ``Zip_Codes.zip`` file and extract the shapefile to a folder. Locate the ``Zip_Codes`` folder and expand it. Drag the ``Zip_Codes.shp`` file to the canvas.

  .. image:: /static/3/processing_algorithms_pyqgis/images/2.png
     :align: center

.. note::

  The unzip step is important because the Zonal Statistics algorithm works by adding a new field to the layer. If the layer is zipped, QGIS cannot update the layer.
     
3. Right-click the ``Zip_Codes`` layer and select :guilabel:`Zoom to Layer`. You will see the zip code polygons for the city of seattle and neighboring areas. 

  .. image:: /static/3/processing_algorithms_pyqgis/images/3.png
     :align: center
     
4. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/processing_algorithms_pyqgis/images/4.png
     :align: center
     
5. The algorithm to sample a raster layer using vector polygons is known as ``Zonal statistics``. Search for the algorithm in the :guilabel:`Processing Toolbox`. Select the algorithm and hover your mouse over it. You will see a tooltip with the text *Algorithm ID: 'qgis:zonalstatistics'*. Note this id which will be needed  to call this algorithm via the Python API. Double-click the ``Zonal Statistics`` algorithm to launch it.

  .. image:: /static/3/processing_algorithms_pyqgis/images/5.png
     :align: center
     
6. We will do a manual test run of the algorithm for a single layer. This is a useful way to check if the algorithm behaves as expected and also an easy way to find out how to pass on relevant parameters to the algorithm when using it via Python. In the :guilabel:`Zonal Statistics` dialog, select ``PRISM_ppt_stable_4kmM3_201701_bil`` as the :guilabel:`Raster Layer` and ``Zip_Codes`` as the :guilabel:`Vector layer containing zones`. Leave other paramters to default. Click the :guilabel:`...` button next to :guilabel:`Statistics to calculate` and select only ``Mean``. Click :guilabel:`Run`.

  .. image:: /static/3/processing_algorithms_pyqgis/images/6.png
     :align: center
     
7. Once the algorithm finishes, switch to the :guilabel:`Log` tab. Make a note of the :guilabel:`Input Parameters` that were passed to the algorithm. Click :guilabel:`Close`.

  .. image:: /static/3/processing_algorithms_pyqgis/images/7.png
     :align: center
     
8. Let's check the results of the test run. In the main QGIS window, right-click the ``Zip_Codes`` layer and select :guilabel:`Open Attribute Table`. This particular algorithm modifies the input zone layer in-place and adds a new column for every statistic that was selected. As we had selected only ``Mean`` value, a new column named ``_mean`` is added to the table. The ``_`` was the default prefix. When we run the algorithm for layers of each month, it will be useful to specify a custom prefix with the month number so we can easily identify the mean values for each month (i.e. 01_mean, 02_mean etc.). Specifying this custom prefix is not possible in the Batch Processing interface of QGIS and if we ran this command using that interface, we would have to manually enter the custom prefix for each layer. If you are working with a large number of layers, this can be very cumbersome. Hence, we can add this custom logic using the Python API and run the algorithm in a for-loop for each layer.

  .. image:: /static/3/processing_algorithms_pyqgis/images/8.png
     :align: center
     
9. Before we proceed, let's delete the ``_mean`` column that was created during our test run. Click the :guilabel:`Toggle Editing mode` button, followed by :guilabel:`Delete field` button. Select the ``_mean`` field and click :guilabel:`OK`.

  .. image:: /static/3/processing_algorithms_pyqgis/images/9.png
     :align: center
     
10. Click the :guilabel:`Toggle Editing mode` button again and :guilabel:`Save` the changes.

  .. image:: /static/3/processing_algorithms_pyqgis/images/10.png
     :align: center
     
11. Back in the main QGIS window, go to :menuselection:`Plugins --> Python Console`.

  .. image:: /static/3/processing_algorithms_pyqgis/images/11.png
     :align: center
     
12. To run the processing algorithm via Python, we need to access names of all the layers. Enter the following code in the :guilabel:`Python Console` and hit :kbd:`Enter`. You will see the names of all layers printed in the console.

  .. code-block:: python

    root = QgsProject.instance().layerTreeRoot()
    for layer in root.children():
      print(layer.name())

  .. image:: /static/3/processing_algorithms_pyqgis/images/12.gif
     :align: center
             
13. For adding a custom prefix, we need to look at the layer name and extract a substring representing the month number. Enter the following code to iterate over all raster layers, extract the custom prefix and run the ``qgis:zonalstatistics`` algorithm using it.

  .. code-block:: python

    root = QgsProject.instance().layerTreeRoot()
    for layer in root.children():
      if layer.name().startswith('PRISM'):
        prefix = layer.name()[-6:-4]
        params = {'INPUT_RASTER': layer.name(), 'RASTER_BAND': 1, 'INPUT_VECTOR': 'Zip_Codes', 'COLUMN_PREFIX': prefix+'_', 'STATS': 2}
        processing.run("qgis:zonalstatistics", params)

  .. image:: /static/3/processing_algorithms_pyqgis/images/13.gif
     :align: center
     
14. Once the processing finishes, right-click on the ``Zip_Codes`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/processing_algorithms_pyqgis/images/14.png
     :align: center
     
15. You will see 12 new columns added to the table with custom prefixes and mean precipitation values extracted from the raster layers.

  .. image:: /static/3/processing_algorithms_pyqgis/images/15.png
     :align: center
     
