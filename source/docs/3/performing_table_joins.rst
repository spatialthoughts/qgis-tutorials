Performing Table Joins (QGIS3)
==============================

Not every dataset you want to use comes in a spatial format, and often the data would come as tabular data like CSV, TSV, or spreadsheet. You need to link it with the existing spatial data for use in your analysis. This operation is known as the **Table Join** and is done using the ``Join attributes by field value`` from the Processing algorithm Toolbox. 

Overview of the task
--------------------

We will use a shapefile of census tracts for California and a population data table from US Census Bureau to create a population density map for California.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Loading a CSV files that do not contain any geometry in QGIS.
- Eliminate additional headers in CSV. 
- Add an additional column to a layer. 
- Style an layer with transparent stroke. 

Get the data
------------

We want to prepare a population density map for the state of California, USA. We will first get a table with population counts for each census tract in the state. 

Download Census Table
^^^^^^^^^^^^^^^^^^^^^

1.  Visit `US Census Bureau <https://data.census.gov/cedsci/>`_  and click :guilabel:`VIEW TABLES`. 

  .. image:: /static/3/performing_table_joins/images/data01.png
     :align: center

2.  Click on the :guilabel:`Filter` icon in top-left. 

  .. image:: /static/3/performing_table_joins/images/data02.png
     :align: center

3.  Let's first filter to California. Click on :guilabel:`Geography`.  

  .. image:: /static/3/performing_table_joins/images/data03.png
     :align: center

4.  Click on :guilabel:`Tract`, which can provide the census tract information.

  .. image:: /static/3/performing_table_joins/images/data04.png
     :align: center

5.  Choose :guilabel:`California`. 

  .. image:: /static/3/performing_table_joins/images/data05.png
     :align: center

6.  Check :guilabel:`All Census Tracts within California`. This all us to download all information as a single file instead of downloading it separately for each tract. Now that we have set the geography, click on :guilabel:`Topics`. 

  .. image:: /static/3/performing_table_joins/images/data06.png
     :align: center

7.  Under :guilabel:`Select Topics`, choose :guilabel:`Population and People`. 

  .. image:: /static/3/performing_table_joins/images/data07.png
     :align: center

8.  Check the :guilabel:`Population and People`.  Now we have selected all the necessary filters. Close the filter window. 

  .. image:: /static/3/performing_table_joins/images/data08.png
     :align: center

9.  In the :guilabel:`Download tables` pane scroll down to find :guilabel:`S0101 | AGE AND SEX`

  .. image:: /static/3/performing_table_joins/images/data09.png
     :align: center

10.  This will open a detailed view of the data. We are concerned with only the population hence un-select the :guilabel:`Margin of Error` so we can get the necessary information only and save on file storage space. 

  .. image:: /static/3/performing_table_joins/images/data10.png
     :align: center

11.  Click on the :guilabel:`Download` button.  

  .. image:: /static/3/performing_table_joins/images/data11.png
     :align: center

12. The selected data is available for multiple years and using different estimation techniques. The :guilabel:`ACS 5-Year Estimate Subject Tables` is recommended as multi-year estimates increases the reliability of the data. It also has no data gaps and contains information for all tracts. Select the year ``2019``. and click :guilabel:`Download`. This will download a zip file. Once it finishes, unzip it on your local disk.

  .. image:: /static/3/performing_table_joins/images/data12.png
     :align: center

Download Census Tract Boundaries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To create a map from the census table, we also need the boundaries representing each census tract in the state of California.

01. Visit `TIGER Line Shapefiles <https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2019.html>`_  and click :guilabel:`Web Interface`. 

  .. image:: /static/3/performing_table_joins/images/data13.png
     :align: center

02.  Under :guilabel:`Select year` choose ``2019``, in :guilabel:`Select a layer type` ``Census Tracts`` and click :guilabel:`Submit`. 

  .. image:: /static/3/performing_table_joins/images/data14.png
     :align: center

03.  Select ``California`` in :guilabel:`Select a State` and click :guilabel:`Download`. This will download a zip file containing the vector files. 

  .. image:: /static/3/performing_table_joins/images/data15.png
     :align: center


For convenience, you may directly download a copy of both the datasets from the links below:

`tl_2019_06_tract.zip <https://www.qgistutorials.com/downloads/tl_2019_06_tract.zip>`_

`ACST5Y2019_S0101.zip <https://www.qgistutorials.com/downloads/ACST5Y2019_S0101.zip>`_

Data Source [TIGER]_ [USCENSUS]_

Procedure
---------

1. Locate the ``tl_2019_06_tract.zip`` file in the QGIS Browser and expand it. Select the ``tl_2019_06_tract.shp`` file and drag it to the canvas. 

  .. image:: /static/3/performing_table_joins/images/01.png
     :align: center

2. The :guilabel:`Select Transformation` dialog will prompt to convert from *EPSG:4269* to *EPSG:4326*.  This dialog presents several transformations to convert between the coordinates between these projections. Leave the selection to the default choice and click :guilabel:`OK`.  

  .. image:: /static/3/performing_table_joins/images/02.png
     :align: center

3. You will see the layer ``tl_2019_06_tract`` loaded in the :guilabel:`Layers` panel. This layer contains the boundaries of census tracts in California. Right-click on the ``tl_2019_06_tract`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/performing_table_joins/images/03.png
     :align: center

4. Examine the attributes of the layer. To join a table with this layer, we need each feature's unique and common attribute. In this case, there are 8057 individual tract records with the ``GEOID`` field. This column can link this layer with any other layer or table containing the same ID.

  .. image:: /static/3/performing_table_joins/images/04.png
     :align: center

5. To load the tabular data, click on :guilabel:`Open Data Source Manager`. 

  .. image:: /static/3/performing_table_joins/images/05.png
     :align: center


6. In the :guilabel:`Data Source Manager` dialog, choose :guilabel:`Delimited Text`. Then in the right, click on the ``...`` next to :guilabel:`File name` and browse to the unzipped folder with the California population CSV.

  .. image:: /static/3/performing_table_joins/images/06.png
     :align: center

7. Now under :guilabel:`Sample Data`, we can inspect the data even before loading it as a layer. The representation shows that the data table contains  2 header rows.

  .. image:: /static/3/performing_table_joins/images/07.png
     :align: center

8. To eliminate the additional header row, under :guilabel:`Record and Fields Options` set the :guilabel:`Number of header line to discard` to ``1``. Now the table will contain proper column headers. Click :guilabel:`Add` to add it as a layer and then click :guilabel:`Close` this dialog box. 

  .. image:: /static/3/performing_table_joins/images/08.png
     :align: center

9. The CSV will now be imported as a table to QGIS and appear as ``ACST5Y2019.S0101`` in the :guilabel:`Layers` panel. Now right-click on the layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/performing_table_joins/images/09.png
     :align: center

10. The ``ID`` column contains the unique id for each record, which can be used to join this table with the ``tl_2019_06_tract`` layer. If you compare the values of the ``ID`` with the ``GEOID`` column from the  ``tl_2019_06_tract``. you will notice that it is prefixed with *1400000US*. To merge these two tables successfully, the values must match exactly. Let's remove this prefix and add a new column with the last 11 characters which contain the value that is an exact match.

  .. image:: /static/3/performing_table_joins/images/10.png
     :align: center

11. To create a new column with the last 11 digits, open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector table --> Field calculator` algorithm. 

  .. image:: /static/3/performing_table_joins/images/11.png
     :align: center
     
12. In the :guilabel:`Field calculator` dialog, select ``ACST5Y2019.S0101`` as the :guilabel:`Input layer`, enter ``geoid`` in :guilabel:`Field name`, and select ``string`` in :guilabel:`Result Field type`. Now search for ``substr`` in expressions. We can use this function to extract the required part from the id field.  

  .. image:: /static/3/performing_table_joins/images/12.png
     :align: center

13. Enter the below expression. We use the `substr` function and extract the value from position *-11* (negative value is counted from the end). The final result can be viewed in the :guilabel:`Preview` section. Click :guilabel:`Run`. 

  .. code-block::

    substr("id", -11)

  .. image:: /static/3/performing_table_joins/images/13.png
     :align: center

14. Now a new layer ``Calculated`` will be loaded in the canvas, lets inspect the attribute table. A new column ``geoid`` with the value that can be matched with the cencus tract will be present. 

  .. image:: /static/3/performing_table_joins/images/14.png
     :align: center

15. To create a table join, open the Processing Toolbox by going to :menuselection:`Processing --> Toolbox`, and search and locate the :menuselection:`Vector table --> Join attributes by field value` algorithm. 

  .. image:: /static/3/performing_table_joins/images/15.png
     :align: center

16. In the :guilabel:`Join attributes by field value` dialog, select ``tl_2019_06_tract`` as the :guilabel:`Input layer` and ``GEOID`` as the :guilabel:`Table field`. Select ``Calculated`` as the :guilabel:`Input layer 2` and ``geoid`` as the :guilabel:`Table field 2`. Under :guilabel:`Layer2 fields to copy`, click on the ``...``.  

  .. image:: /static/3/performing_table_joins/images/16.png
     :align: center

17. Check ``Geographic Area Name``, ``Estimate!!Total!!Total population`` and ``geoid``. Click :guilabel:`OK`. 

  .. image:: /static/3/performing_table_joins/images/17.png
     :align: center

18. Check the :guilabel:`Discard records which could not be joined`. This will eliminate any extra records in the population table. Click the :guilabel:`...` button under :guilabel:`joined layer` to select the output file location and select ``Save to File...``.

  .. image:: /static/3/performing_table_joins/images/18.png
     :align: center

19. Name the output geopackage as ``california_total_population.gpkg`` . Click :guilabel:`Run`.

  .. image:: /static/3/performing_table_joins/images/19.png
     :align: center

20. Once the processing finishes, verify that the algorithm was successful if all 8057 feature(s) are joined. Click :guilabel:`Close`.

  .. image:: /static/3/performing_table_joins/images/20.png
     :align: center

21. You will see a new layer ``california_total_population`` loaded in the :guilabel:`Layers` panel. At this point, the fields from the CSV file are joined with the census tracts layer. Now that we have the population data in the census tracts layer, we can style it to create a visualization of population density distribution. Click the :guilabel:`Open the Layer Styling Panel` button.

  .. image:: /static/3/performing_table_joins/images/21.png
     :align: center

22. In the :guilabel:`Layer Styling` panel, select ``Graduated`` from the drop-down menu. As we are looking to create a population density map, we want to assign different color to each census tract feature based on the population density. We have the population in the **Estimate!!Total!!Total population** field, and the area field in **ALAND**. Click :guilabel:`Expression` button, to compute the percentage of total population in each cencus tract. 

  .. note::

    When creating a thematic (choropleth) map such as this, it is important to normalize the values you are mapping. Mapping total counts per polygon is not correct. It is important to normalize the values dividing by the area. If you are displaying totals such as crime, you can normalize them by dividing by total population, thus mapping crime rate and not crime. `Learn more <https://en.wikipedia.org/wiki/Choropleth_map#Normalization>`_

  .. image:: /static/3/performing_table_joins/images/22.png
     :align: center

23. Enter the following expression to calculate the population density. The area of the feature is given in square kilometers. We then convert it to square meters by multiplying with ``1000000`` and calculating the population density with the formula *Population/Area*. Preview the result and click :guilabel:`OK`.

  .. code-block::

    1000000 * ("Estimate!!Total!!Total population"/"ALAND")

  .. image:: /static/3/performing_table_joins/images/23.png
     :align: center


24. In the :guilabel:`Layer Styling Panel`, click :guilabel:`classify` and enter the classes as ``10``. 

  .. image:: /static/3/performing_table_joins/images/24.png
     :align: center

25. Click on the color ramp to choose the color ramp ``RdYlGn``. 

  .. image:: /static/3/performing_table_joins/images/25.png
     :align: center
     
26. The higher density concerns more so, let's assign green to lower density and reg to high-density areas. Click on the color ramp and choose :guilabel:`Invert Color Ramp`. 

  .. image:: /static/3/performing_table_joins/images/26.png
     :align: center
     
27. Now we have an excellent looking information visualization of population density in California. To make it better, let's make the border of each census tract transparent. Click on the Symbol tab. 

  .. image:: /static/3/performing_table_joins/images/27.png
     :align: center

28. Click on :guilabel:`Stroke color` and click ``Transparent stroke``. 

  .. image:: /static/3/performing_table_joins/images/28.png
     :align: center

29.  The bins can be adjusted, click on the :guilabel:`Values` this will popup a dialog to enter the upper and lower bound value. 

  .. image:: /static/3/performing_table_joins/images/29.png
     :align: center

30.  Once your satisfied close the Layer styling panel. We now have a nice looking information visualization of population density in California.

  .. image:: /static/3/performing_table_joins/images/30.png
     :align: center