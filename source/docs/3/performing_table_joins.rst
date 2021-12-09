Performing Table Joins (QGIS3)
==============================

Not every dataset you want to use comes in spatial format. Often the data would come as a table or a spreadsheet and you would need to link it with your existing spatial data for use in your analysis. This operation is known as a **Table Join** and is done using the ``Join attributes by field value`` Processing algorithm. 

Overview of the task
--------------------

We will use a shapefile of census tracts for California and population data table from US Census Bureau to create a population density map for california.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Loading CSV files that do not contain any geometry in QGIS.

Get the data
------------
`US Census Bureau <https://www.census.gov/en.html>`_ provides `TIGER/Line Shapefiles <https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html>`_. You can visit the `FTP site <https://www2.census.gov/geo/tiger/TIGER2018/>`_ and download census tracts shapefile for California. Download `Census Tracts for California <https://www2.census.gov/geo/tiger/TIGER2018/TRACT/tl_2018_06_tract.zip>`_ file. 

`Americal FactFinder <http://factfinder2.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t>`_ is a repository of all census data for the US. You can use `Advanced Search` and query for the `Topic - Basic Count/Estimate` and `Geographies - All Census Tracts in California` to create a custom CSV and download it. This tutorial uses ``TOTAL POPULATION | 2017 ACS 5-year estimates`` data.

.. image:: /static/3/performing_table_joins/images/data1.png
   :align: center

For convenience, you may directly download a copy of both the datasets from the links below:

`tl_2018_06_tract.zip <https://www.qgistutorials.com/downloads/tl_2018_06_tract.zip>`_

`ACS_17_5YR_B01003.zip <https://www.qgistutorials.com/downloads/ACS_17_5YR_B01003.zip>`_

Data Source [TIGER]_ [USCENSUS]_

Procedure
---------

1. Locate the ``tl_2018_06_tract.zip`` file in the QGIS Browser and expand it. Select the ``tl_2018_06_tract.shp`` file and drag it to the canvas. 

  .. image:: /static/3/performing_table_joins/images/1.png
     :align: center

2. You will see the layer ``tl_2018_06_tract`` loaded in the :guilabel:`Layers` panel. This layer contains the boundaries of census tracts in California. Right-click on the ``tl_2018_06_tract`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/performing_table_joins/images/2.png
     :align: center

3. Examine the attributes of the layer. To join a table with this layer, we need a unique and common attribute for each feature. In this case, the ``GEOID`` field is a unique identifier for each tract and can be used to link this layer with any other layer or table containing the same ID.

  .. image:: /static/3/performing_table_joins/images/3.png
     :align: center

4. Unzip the ``ACS_17_5YR_B01003.zip`` file and open the ``ACS_17_5YR_B01003_with_ann.csv`` file in a text editor. You will notice that each row of the file contains information about a tract along with the unique identifier we saw in the previous step. Note that this field is called ``GEO.id2`` in the CSV. You will also note that the ``HD01_VD01`` column has population value for each of the census tract. 

  .. image:: /static/3/performing_table_joins/images/4.png
     :align: center


5. Before importing this CSV file, we need to make a minor edit. QGIS CSV importer expects the first row of the file to contain the column headers and all remaining rows to contain the data for these columns. This file contains an extra row 2 with column labels. Delete that row and save the file.

  .. image:: /static/3/performing_table_joins/images/5.png
     :align: center

6. Now we are ready to import the CSV file to QGIS. Go to :menuselection:`Layer --> Add Layer --> Add Delimited Text Layer`. 

  .. image:: /static/3/performing_table_joins/images/6.png
     :align: center

7. In the :guilabel:`Data Source Manager` window, click the :guilabel:`...` button and browse to the CSV file and select it. Make sure you have selected :guilabel:`File format` as :guilabel:`CSV (comma separated values)`. Since we are importing this as a table, we must specify that our file contains no geometry using  the :guilabel:`No geometry (attribute table only)` option. Verify that :guilabel:`Sample Data` preview at the bottom looks fine and click :guilabel:`Add` followed by :guilabel:`Close`.

  .. image:: /static/3/performing_table_joins/images/7.png
     :align: center

8. The CSV will now be imported as a table to QGIS and will appear as ``ACS_17_5YR_B01003_with_ann`` in the :guilabel:`Layers` panel. Now we are ready to create the table join. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/performing_table_joins/images/8.png
     :align: center

9. First we need to change a default setting in the :guilabel:`Processing Toolbox`. Click the :guilabel:`Options` button.

  .. image:: /static/3/performing_table_joins/images/9.png
     :align: center

10. In the :guilabel:`Processing Options` tab, check the :guilabel:`Use filename as layer name` option. When using algorithms from Processing Toolbox, this option makes the output layer names much more intuitive and useful. Click :guilabel:`OK`.

  .. image:: /static/3/performing_table_joins/images/10.png
     :align: center
     
11. Back in the :guilabel:`Processing Toolbox`, search and locate the :menuselection:`Vector General --> Join attributes by field value` algorithm and double-click it to open it.

  .. image:: /static/3/performing_table_joins/images/11.png
     :align: center

12. In the :guilabel:`Join Attributes by Field Values` dialog, select ``tl_2018_06_tract`` as :guilabel:`Input layer` and ``GEOID`` as the :guilabel:`Table field`. Select ``ACS_17_5YR_B01003_with_ann`` as the :guilabel:`Input layer 2` and ``GEO.id2`` as the :guilabel:`Table field 2`. Leave other options to their default values and click the :guilabel:`...` button to select the output file location and select ``Save to GeoPackage...``.

  .. image:: /static/3/performing_table_joins/images/12.png
     :align: center

13. Name the output geopackage as ``joined.gpkg`` and the output layer as ``joined``. Click :guilabel:`Run`.

  .. image:: /static/3/performing_table_joins/images/13.png
     :align: center

14. Once the processing finishes, verify that the algorithm was successful and click :guilabel:`Close`.

  .. image:: /static/3/performing_table_joins/images/14.png
     :align: center

15. You will see a new layer ``joined`` loaded in the :guilabel:`Layers` panel. At this point, the fields from the CSV file are joined with the census tracts layer. You can close the :guilabel:`Processing Toolbox` for now. Right-click on the ``joined`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/performing_table_joins/images/15.png
     :align: center

16. You will see a new set of fields, including the ``HD01_VD01`` field containing population estimates.

  .. image:: /static/3/performing_table_joins/images/16.png
     :align: center

17. Now that we have the population data in the census tracts layer, we can style it to create a visualization of population density distribution. Select the ``joined`` layer and click the :guilabel:`Open the Layer Styling Panel` button.

  .. image:: /static/3/performing_table_joins/images/17.png
     :align: center

18. In the :guilabel:`Layer Styling` panel, select ``Graduated`` from the drop-down menu. As we are looking to create a population density map, we want to assign different color to each census tract feature based on the population density. We have the population in the **HD01_VD01** field, but we don't have population density in any fields to select as the :guilabel:`Value`. Fortunately, QGIS allows us to input an expression here. Click :guilabel:`Expression` button.

  .. image:: /static/3/performing_table_joins/images/18.png
     :align: center

.. note::

  When creating a thematic (choropleth) map such as this, it is important to normalize the values you are mapping. Mapping total counts per polygon is not correct. It is important to normalize the values dividing by the area. If you are displaying totals such as crime, you can normalize them by dividing by total population, thus mapping crime rate and not crime. `Learn more <https://en.wikipedia.org/wiki/Choropleth_map#Normalization>`_
  
19. Enter the following expression to calculate the population density. ``$area`` calculates the area of the feature in square meters. We then convert it to square miles and calculate the population density with the formula *Population/Area*. Click :guilabel:`OK`.

  .. code-block::

    "HD01_VD01"/ (0.386*$area/1e6)

  .. image:: /static/3/performing_table_joins/images/19.png
     :align: center

20. Back in the :guilabel:`Layer Styling Panel`, choose a color ramp of your choice and click :guilabel:`Classify`. You can adjust the class ranges to be more appropriate to the region.

  .. image:: /static/3/performing_table_joins/images/20.png
     :align: center
     
21. The visualization feels a bit cluttered because of the polygon borders. Click on the dropdown next to :guilabel:`Symbol`. Select :guilabel:`Simple fill` and check :guilabel:`Transparent stroke`.

  .. image:: /static/3/performing_table_joins/images/21.png
     :align: center
     
22. Now we have a nice looking information visualization of population density in California.

  .. image:: /static/3/performing_table_joins/images/22.png
     :align: center
