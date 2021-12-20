Travel Time Analysis with Uber Movement (QGIS3)
===============================================

`Uber Movement <https://movement.uber.com/>`_ shares anonymized and aggregated travel time data for many cities across the world. Uber Movement's *Travel Times* product is a public dataset measuring zone-to-zone travel across a city. These times are based on actual Uber rides and is an accurate representation of congestion and traffic patterns in the city. This is a large openly accessible dataset aggregated from millions of actual cab rides. This tutorial shows the techniques to work use such aggregated traffic datasets for doing travel time analysis in QGIS.

Overview of the task
--------------------

We will use an aggregated traffic dataset for the city of Bangalore, India to find travel times to a chosen location in the city. We will also create an `Isochrone Map <https://en.wikipedia.org/wiki/Isochrone_map>`_ for a 30-min travel time threshold.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Load a GeoJSON file in QGIS

Get the data
------------

We will download the Travel Times dataset for the city of Bangalore, India.

1. Go to the `Uber Movement <https://movement.uber.com/>`_ site and click on the :guilabel:`Cities`. 

  .. image:: /static/3/travel_time_analysis/images/data01.png
    :align: center

2. Search for ``Banglore``.

  .. image:: /static/3/travel_time_analysis/images/data02.png
    :align: center

3. Click on :guilabel:`Download data`. 

  .. image:: /static/3/travel_time_analysis/images/data03.png
    :align: center

4. In the ``Download data`` popup, switch to :guilabel:`GEO BOUNDARIES`. It will contain the Banglore wards GeoJSON file. Accept the license information and click on ``BANGLORE_WARDS.JSON`` to download.

  .. image:: /static/3/travel_time_analysis/images/data04.png
    :align: center

5. Then switch to ``ALL DATA``. This data is available from 2016 to 2020, and each year is divided into 4 quarters. We will download the data for ``2019 Quarter 3``. Select it and click the ``Travel Times by Hour of Day (Weekdays Only)``. This file will contain all anonymous information about the weekday uber travel in Bangalore from July to September 2019. 

  .. image:: /static/3/travel_time_analysis/images/data05.png
    :align: center

For your convenience, you can download the data from the links below.

`bangalore_wards.json <https://www.qgistutorials.com/downloads/bangalore_wards.json>`_

`bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate.csv <https://www.qgistutorials.com/downloads/bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate.csv>`_

Data Source: [UBER]_

Procedure
---------

1. Locate the ``bangalore_wards.json`` file in the :guilabel:`Browser` panel and drag it to the canvas. Next, we will load a basemap layer from OpenStreetMap. We will use the `QuickMapServices` plugin to access the basemap. Once installed, go to :menuselection:`Web --> QuickMapServices --> OSM --> OSM Standard`. A basemap tile layer from OpenStreetMap will be added to the project. Next, click the :guilabel:`Open Data Source Manager` button.

  .. image:: /static/3/travel_time_analysis/images/01.png
    :align: center

2. Switch to the :guilabel:`Delimited Text` tab. Browse to the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate.csv`` file and select it. Since this CSV file is just tabular data, select :guilabel:`No geometry (attribute only table)` option and click :guilabel:`Add`.

  .. image:: /static/3/travel_time_analysis/images/02.png
    :align: center

3. The ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` layer will be added to the :guilabel:`Layers` panel. This layer contains anonymized and aggregated trip location data between different zones of the city. Each row of the table contains columns for source zone (`sourceid`), destination zone (`dstid`), hour of the day (`hod`) and average travel time aggregated from all trips between these zone at that hour (`mean_travel_time`). You can learn more about this dataset in the `Movement: Travel Times Calculation Methodology (pdf) <https://d3i4yxtzktqr9n.cloudfront.net/web-movement/76002ded222a46a02ae89f207e91e335.pdf>`_. Before moving forward, let's check how many data records are present in the layer. Right-click the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` layer and select :guilabel:`Show Feature Count`. The total rows from the table will be displayed next to it. This is a fairly large table but we don't need all the data rows for our analysis. We will now identify our target location and filter this table to data records for it.

  .. image:: /static/3/travel_time_analysis/images/03.png
    :align: center

4. We want to calculate all areas that are accessible within 30 minutes from a specific location. Using the `OSM Standard` basemap, you can find the location of interest. Then select the ``bangalore_wards`` layer, use the :guilabel:`Identify` tool and click on it. The results will show the attributes of the zone containing the location. For the purpose of this tutorial, let's assume our target location is within the *JP Nagar* zone with the *MOVEMENT_ID* **193**.

  .. image:: /static/3/travel_time_analysis/images/04.png
    :align: center

5. We can filter the travel time records to just those which have this zone as the destination. We can also restrict our analysis to the peak morning commute hour of 9am - 10am. Right-click the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` layer and select :guilabel:`Filter`.

  .. image:: /static/3/travel_time_analysis/images/05.png
    :align: center

6. Enter the following filter expression and click :guilabel:`OK`.

  .. code-block:: none

       "dstid" = 193 AND "hod" = 9


  .. image:: /static/3/travel_time_analysis/images/06.png
    :align: center

7. Back in the main QGIS window, you will see that the number of records in the filtered table are now down to just *197*. Since there are a total of 198 zones in the city, we have records of travel times between the 1 destination ward and 197 source zones. Open the attribute table of both the layers using the :guilabel:`Open Attribute Table` button in the :guilabel:`Attributes` toolbar.

  .. image:: /static/3/travel_time_analysis/images/07.png
    :align: center

8. Now we have the shapes of the ward in the layer ``bangalore_wards`` and tabular information in the layer ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate``. We can join the attribute information to the shapes using a common attribute. Here the ``MOVEMENT_ID`` column from the ``bangalore_wards`` layer and ``sourceid`` column from the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` are unique ward identifiers that can be joined. This operation is called a *Table Join*. 

  .. image:: /static/3/travel_time_analysis/images/08.png
    :align: center

9. Before we can join these two layers, we must ensure that the values in both columns match exactly. Thought they appear the same, they are of different type. Since GeoJSON format has no way of specifying property types, all values are assumed to be of the type *String* - i.e. Text. But when we import a CSV to QGIS, by default, QGIS tries to determines the types of the columns based on the values and assign appropriate field type. For the CSV file, the data type for the column ``sourceid`` was assigned as *Integer*. So we need to convert the column from the GeoJSON to an *Integer* type as well. Go to :menuselection:`Processing --> Toolbox --> Vector Table --> Field Calculator algorithm`. Double-click to launch it.

  .. image:: /static/3/travel_time_analysis/images/09.png
    :align: center

10. Choose ``bangalore_wards`` as the :guilabel:`Input Layer`. Name the Field Name as ``joinfield`` and select the :guilabel:`Result field type` as ``Integer``. Enter ``MOVEMENT_ID`` as the Expression. Click the :guilabel:`...` button next to the :guilabel:`Calculated` and select :guilabel:`Save to File...` then enter the name of the output file as ``bangalore_wards_fixed.gpkg``. Click :guilabel:`Run`. Close the field calculator.

  .. image:: /static/3/travel_time_analysis/images/10.png
    :align: center

11. A new layer ``bangalore_wards_fixed`` will be added to the :guilabel:`Layers` panel. Now we are ready to perform the join. Go to :menuselection:`Processing --> Toolbox --> Vector General --> Join attributes by field value`. Double-click to launch it.

  .. image:: /static/3/travel_time_analysis/images/11.png
    :align: center

12. Select ``bangalore_wards_fixed`` as the :guilabel:`Input layer` and ``joinfield`` as the :guilabel:`Table field`. Select ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` as the :guilabel:`Input layer 2` and ``sourceid`` as the :guilabel:`Table field 2`. Name the :guilabel:`Joined layer` as ``uber_travel_times.gpkg`` and click :guilabel:`Run`.

  .. image:: /static/3/travel_time_analysis/images/12.png
    :align: center

13. A new layer ``uber_travel_times`` will be added to the :guilabel:`Layers` panel. Let's style it to visualize the result of the join. Click :guilabel:`Open the Layer Styling Panel`. Select the ``Graduated`` renderer and ``mean_travel_time`` as the :guilabel:`Value`. Select a color ramp and click :guilabel:`Classify`. You will see the map showing increasing travel times further you go from the destination.

  .. image:: /static/3/travel_time_analysis/images/13.png
    :align: center

14. But we are looking to analyze and extract areas that are within 30 minutes of travel time, so we need to do some more processing. Switch the styling back to the :guilabel:`Single symbol` renderer. Right-click the ``uber_travel_times`` layer and select :guilabel:`Filter`.

  .. image:: /static/3/travel_time_analysis/images/14.png
    :align: center

15. Enter the following expression to select all zones within 1800 seconds (30 minutes) of mean travel time. We also need to include our destination zone which will have 0 travel time.

  .. code-block:: none

          "mean_travel_time" <= 1800 OR "MOVEMENT_ID" = 193


  .. image:: /static/3/travel_time_analysis/images/15.png
    :align: center

16. The layer will now show the cluster of polygons that constitute the area of interest. We will merge all of them to a single polygon now. Go to :menuselection:`Processing --> Toolbox --> Vector Geometry --> Dissolve`. Double-click to launch it.

  .. image:: /static/3/travel_time_analysis/images/16.png
    :align: center

17. Select ``uber_travel_times`` as the :guilabel:`Input layer`. Name the :guilabel:`Dissolved` layer as ``30min_isochrone.gpkg``. Click :guilabel:`Run`.

  .. image:: /static/3/travel_time_analysis/images/17.png
    :align: center

18. A new layer ``30min_isochrone`` will be added to the :guilabel:`Layers` panel showing the result of our analysis.

  .. image:: /static/3/travel_time_analysis/images/18.png
    :align: center


