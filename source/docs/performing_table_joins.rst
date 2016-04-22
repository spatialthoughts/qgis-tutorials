Performing Table Joins
======================
Not every dataset you want to use comes as a shapefile, or in a spatial format. Often the data would come as a table or a spreadsheet and you would need to link it with your existing spatial data for use in your analysis. This operation is known as a `Table Join` and this tutorial will cover how to carry out table joins in QGIS.

Overview of the task
--------------------

We will use a shapefile of census tracts for California and population data table from US Census Bureau to create a population map for california.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Creating `.csvt` files to indicate column data types in a CSV file.
- Loading CSV files that do not contain any geometry in QGIS.

Get the data
------------

`US Census Bureau <http://www.census.gov/geo/maps-data/data/tiger.html>`_ has
various spatial extracts from the MAF/TIGER database. You can query and
download census tracts shapefile for California. Download `Census Tracts for
California
<http://www2.census.gov/geo/tiger/TIGER2013/TRACT/tl_2013_06_tract.zip>`_ file.

`Americal FactFinder
<http://factfinder2.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t>`_
is a repository of all census data for the US. You can use `Advanced Search` and
query for the `Topic - Total Population` and
`Geographies - All Census Tracts in California` to create a custom CSV and
download it. This tutorial uses `Total Population 2010 Census Summary File 1`
data.

For convenience, you may directly download a copy of both the datasets from the
links below:

`tl_2013_06_tract.zip <http://www.qgistutorials.com/downloads/tl_2013_06_tract.zip>`_

`ca_tracts_pop.csv <http://www.qgistutorials.com/downloads/ca_tracts_pop.csv>`_

Data Source [TIGER]_ [USCENSUS]_

Procedure
---------

1. We will first load the census tracts shapefile. Go to :menuselection:`Layer
   --> Add Vector Layer`.

.. image:: /static/performing_table_joins/images/1.png
   :align: center

2. Browse to the downloaded zip file ``tl_2013_06_tract.zip`` and select it. QGIS
   can open zip files directly so no need to uncompress it first.

.. image:: /static/performing_table_joins/images/2.png
   :align: center

3. Select the ``tl_2013_06_tract.shp`` layer and click :guilabel:`OK`.

.. image:: /static/performing_table_joins/images/3.png
   :align: center

4. You will see the census tracts loaded into QGIS.

.. image:: /static/performing_table_joins/images/4.png
   :align: center

5. Right-click on the layer and select :guilabel:`Open Attribute Table`.

.. image:: /static/performing_table_joins/images/5.png
   :align: center

6. Examine the attributes of the tracts shapefile. To join a table with this shapefile, we need a unique and common attribute for each feature. In this case, the **GEOID** field is a unique identifier for each tract and can be used to `link` this shapefile with any other table containing the same ID.

.. image:: /static/performing_table_joins/images/6.png
   :align: center

7. Open the CSV file ``ca_tracts_pop.csv`` in a text editor. You will notice that each row of the file contains information about a tract along with the unique identifier we saw in the previous step. Note that this field is called **GEO.id2** in the CSV. You will also note that the **D001** column has population value for each of the census tract.

.. image:: /static/performing_table_joins/images/7.png
   :align: center

8. We could import this csv file without any further action and it would be
   imported. But, the default type of each column would be a *String* (text).
   That is ok except for the `D001` field which contains numbers for the
   population. Having those imported as text would not allow us to run any
   mathematical operations on this column. To tell QGIS to import the field as
   a number, we need to create a `sidecar` file with a `.csvt` extension. This
   file will have only 1 row specifying data types for each column. Save this
   file as ``ca_tracts_pop.csvt`` in the same directory as the original `.csv`
   file. You can also `download the csvt file from here.
   <../../downloads/ca_tracts_pop.csvt>`_

.. image:: /static/performing_table_joins/images/8.png
   :align: center

9. Now we are ready to import the CSV file to QGIS. Go to :menuselection:`Layer
   --> Add Delimited Text Layer`.

.. image:: /static/performing_table_joins/images/9.png
   :align: center

10. Browse to the folder containing the CSV file and select it. Make sure you
    have selected :guilabel:`File format` as :guilabel:`CSV (comma separated
    values)`. Since we are importing this as a table, we must specify that our
    file contains no geometry. Select the :guilabel:`No geometry (attribute
    only table)` option. Click :guilabel:`OK`.

.. image:: /static/performing_table_joins/images/10.png
   :align: center

11. The CSV will now be imported as a table to QGIS.

.. image:: /static/performing_table_joins/images/11.png
   :align: center

12. Select the ``tl_2013_06_tract`` layer. Right-click on it and select
    :guilabel:`Properties`.

.. image:: /static/performing_table_joins/images/12.png
   :align: center

13. In the :guilabel:`Layer Properties` dialog, select the :guilabel:`Joins`
    tab. Click on the `+` button at the bottom to create a new table join.

.. image:: /static/performing_table_joins/images/13.png
   :align: center

14. In the :guilabel:`Add vector join` dialog, select ``ca_tracts_pop`` as the
    :guilabel:`Join layer`. Next we have to select the field with unique ids in
    both the shapefile and the CSV. Select `GEO.id2` and `GEOID` as the
    :guilabel:`Join field` and :guilabel:`Target field` respectively. Click
    :guilabel:`OK`.

.. image:: /static/performing_table_joins/images/14.png
   :align: center

15. Close the :guilabel:`Layer Properties` dialog and return to the main QGIS
    window. At this point, the fields from the CSV file are joined with the
    shapefile. Right-click on the ``tl_2013_06_tract`` layer and select
    :guilabel:`Open Attribute Table`.

.. image:: /static/performing_table_joins/images/15.png
   :align: center

16. You can now see a new set of fields, including
    :guilabel:`ca_tracts_pop_D001` field added to each feature. Now you have
    access to the population value of each tract from the CSV file. Close the
    attribute table and return to the main QGIS window.

.. image:: /static/performing_table_joins/images/16.png
   :align: center

17. Right-click the ``tl_2013_06_tract`` layer and select :guilabel:`Properties`.

.. image:: /static/performing_table_joins/images/17.png
   :align: center

18. Select the :guilabel:`Style` tab. Select the :guilabel:`Graduated` from the
    drop-down menu. As we are looking to create a population map, we want to
    assign different color to each census tract feature based on the population
    count. Select :guilabel:`ca_tracts_pop_D001` as the :guilabel:`Column`.
    Select a color ramp of your liking from the :guilabel:`Color ramp`
    drop-down. In the :guilabel:`Mode`, select :guilabel:`Quantile (Equal
    Count)`. Next click :guilabel:`Classify`. You will see a different color
    assigned to certain population ranges. Click :guilabel:`OK`.

.. image:: /static/performing_table_joins/images/18.png
   :align: center

19. You will now see a nice visualization of the census tracts as styled using
    population values. Use the :guilabel:`Zoom in` tool to select a smaller
    area from the layer.

.. image:: /static/performing_table_joins/images/19.png
   :align: center

20. You have a detailed and accurate population map of California. You can use
    the same technique to create maps based on variety of census data.

.. image:: /static/performing_table_joins/images/20.png
   :align: center
