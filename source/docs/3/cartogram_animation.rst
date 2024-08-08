Creating an Animated Cartogram (QGIS3)
======================================

Cartogram is a type of map visualization where the shape of each feature is distorted in proportion to a variable. Cartograms makes it easy to see large variations in the data easily. The simplest method to create a cartogram is by scaling the size of each region according to a variable. This method retains the original shape of the polygon and only changes the size. These are known as `Non-contiguous isomorphic cartograms <https://en.wikipedia.org/wiki/Cartogram#Non-contiguous_isomorphic_cartograms>`_. In this tutorial, we will learn how to use QGIS expressions to create a cartogram and use the Temporal Controller to create an animation that gradually transforms the features to the target size.

Overview of the task
--------------------
We will take a layer of states in the US and create an animated cartogram by scaling each state by population. The resulting map will have each state sized according to its population.

  .. image:: /static/3/cartogram_animation/images/output.gif
    :align: center
	
    

Get the data
------------

`United States Census Bureau <https://www.census.gov/>`_ provides cartographic boundary files along with demographic datasets. We will download the data and process them to create a data layer suitable for our task.

1. Visit the `Cartographic Boundary Files - Shapefile <https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html>`_ data page on the US Census Bureau website. Scroll down and download the States shapefile ``cb_2018_us_state_20m.zip``. This has the state polygons we need for the visualization.

  .. image:: /static/3/cartogram_animation/images/data1.png
    :align: center
    
2. The state polygons do not have any demographic data. This data needs to be downloaded separately and joined with the shapefile for use in a GIS. Visit the `State Population Totals and Components of Change: 2020-2023 <https://www.census.gov/data/tables/time-series/demo/popest/2020s-state-total.html>`_ page and download the *Annual Population Estimates, Estimated Components of Resident Population Change, and Rates of the Components of Resident Population Change for the United States, States, District of Columbia, and Puerto Rico: April 1, 2020 to July 1, 2023* dataset which will be downloaded as ``NST-EST2023-ALLDATA.csv``.

  .. image:: /static/3/cartogram_animation/images/data2.png
    :align: center

3. Open QGIS. Locate the ``cb_2018_us_state_20m.zip`` file in the QGIS :guilabel:`Browser` and expand it. Drag and drop the ``cb_2018_us_state_20m.shp`` layer to the canvas.

  .. image:: /static/3/cartogram_animation/images/data3.png
    :align: center
    
4. A new layer ``cb_2018_us_state_20m`` will be added to the :guilabel:`Layers` panel. Next, we will load the CSV file. Click the :guilabel:`Open Data Source Manager` button.

  .. image:: /static/3/cartogram_animation/images/data4.png
    :align: center

5. Switch to the :guilabel:`Delimited Text` tab. Click :guilabel:`...` next to :guilabel:`File name` and browse to the downloaded ``NST-EST2023-ALLDATA.csv`` file. Expand the :guilabel:`Geometry Definition` section and select ``No geometry (attribute only table)``. Click :guilabel:`Add`.

  .. image:: /static/3/cartogram_animation/images/data5.png
    :align: center

6. A new layer ``NST-EST2023-ALLDATA`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. This table as the population counts in the ``POPESTIMATE2023`` column. Each state has a unique id in the ``STATE`` column that we will use to join this table with the polygon layer.

  .. image:: /static/3/cartogram_animation/images/data6.png
    :align: center

7. Right-click the ``cb_2018_us_state_20m`` layer and select :guilabel:`Open Attribute Table`. The state ids are contained in the ``GEOID`` column. White the numbers are the same, they are formatted as a 2-digit 0-padded number. To match these with the ``STATE`` column from our population table, we need a similarly formatted numbers. Select the ``NST-EST2023-ALLDATA``. Go to :menuselection:`Processing --> Toolbox`. Search and locate the :menuselection:`Vector table --> Field calculator` algorithm. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/data7.png
    :align: center

8. In the :guilabel:`Field calculator` dialog, select ``NST-EST2023-ALLDATA`` as the :guilabel:`Input layer`. Enter ``GEOID`` as the :guilabel:`Field name` and set the :guilabel:`Result field type` to ``Text (string)``. We will now take the numbers from the ``STATE`` field and use the ``lpad()`` function to create a 2-digit 0-padded string. Enter the following expression and click :guilabel:`Run`.

  .. code-block:: none

     lpad("STATE", 2, '0')

  .. image:: /static/3/cartogram_animation/images/data8.png
    :align: center

9. A new layer ``Calculated`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attribute Table`. Note that the newly created ``GEOID`` column has correctly formatted identifiers. We can now use this field to join this table with the states layer. Search and locate the :menuselection:`Vector general --> Join attributes by field value` algorithm. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/data9.png
    :align: center

10. In the :guilabel:`Join attributes by field value` dialog, select ``cb_2018_us_state_20m`` as the :guilabel:`Input layer`. Select ``GEOID`` as the :guilabel:`Table field`. For :guilabel:`Input layer 2`, select our table ``Calculated`` and :guilabel:`Table field 2` select ``GEOID``. The table has many columns but we only need the population for the latest year. Click the :guilabel:`...` button for :guilabel:`Layer 2 fields to copy` and select only the ``POPESTIMATE2023`` field. Leave other options to their default value and click :guilabel:`Run`.

  .. image:: /static/3/cartogram_animation/images/data10.png
    :align: center

11. A new layer ``Joined layer`` will be added to the :guilabel:`Layers` panel. Before using this layer for our cartogram, let's reproject it to a projected CRS. Search and locate the :menuselection:`Vector general --> Reproject layer` algorithm. Double-click to open it.

  .. image:: /static/3/cartogram_animation/images/data11.png
    :align: center

12. In the :guilabel:`Reproject layer` dialog, select ``Joined layer`` as the :guilabel:`Input layer`. For the :guilabel:`Target CRS`, click the :guilabel:`Select CRS` button. Search for the ``North_America_Albers_Equal_Area_Conic`` CRS and select it. This is our final layer so we will save it to disk. Click the :guilabel:`...` button next to :guilabel:`Reprojected` and select :guilabel:`Save to File..`.

  .. image:: /static/3/cartogram_animation/images/data12.png
    :align: center

13. Enter the name of the layer as ``us_states_with_population.gpkg`` and select :guilabel:`Save`. Click :guilabel:`Run` to create the GeoPackage file with the reprojected data.

  .. image:: /static/3/cartogram_animation/images/data13.png
    :align: center

We will use this layer in the next section. For convenience, you may directly download a copy of the above layer from below:

`us_states_with_population.gpkg <https://www.qgistutorials.com/downloads/us_states_with_population.gpkg>`_

Data Source [USCENSUS]_


Procedure
---------

