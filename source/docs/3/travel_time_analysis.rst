Travel Time Analysis with Uber Movement (QGIS3)
=================================

Travel Time is dependent not only on the speed limit of the road but also on the traffic. Analyzing this travel time taken in a city will help in better planning the infrastructure of the city. Using the tools from ``Vector table``, ``Vector geometry``, and ``Vector general`` in QGIS *Processing Toolbox*, we can do almost all vector-based analysis.

Overview of the task
--------------------

We will take the `Travel Times data <https://movement.uber.com/explore/bangalore/travel-times/query?lang=hi-IN>`_ for the city of Bangalore to analyze the traffic patterns and find out the areas that are accessible within 30 minutes of driving. This type of map is an `Isochrone Map <https://en.wikipedia.org/wiki/Isochrone_map>`_ and is useful in urban planning.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Load GeoJSON file in QGIS
- Create Isochrone in QGIS

Get the data
------------

1. Go to the `Uber Movement <https://movement.uber.com/>`_ site and click on the :guilabel:`Cities`. 

  .. image:: /static/3/travel_time_analysis/images/data01.png
    :align: center

2. Search for ``Banglore``. It is one of the IT hubs of India. This city has a nickname as `Silicon Valley of Asia <https://thescalers.com/how-bangalore-became-asias-silicon-valley/>`_ . 

  .. image:: /static/3/travel_time_analysis/images/data02.png
    :align: center

3. Click on :guilabel:`Download data`. 

  .. image:: /static/3/travel_time_analysis/images/data03.png
    :align: center

4. In the ``Download data`` popup, switch to :guilabel:`GEO BOUNDARIES`. It will contain the Banglore wards GeoJSON file. Accept the license information and click on ``BANGLORE_WARDS.JSON`` to download.

  .. image:: /static/3/travel_time_analysis/images/data04.png
    :align: center

5. Then switch to ``ALL DATA``. This data is available from 2016 to 2020, and each year is divided inTO 4 quarterS, select ``2019 Quarter 3``. Then click the ``Travel Times by Hour of Day (Weekdays Only)``. This file will contain all anonymous information about the weekday uber travel in Banglore from July to September 2019.

  .. image:: /static/3/travel_time_analysis/images/data05.png
    :align: center

For your convenience, you can download the data from the links below.

`bangalore_wards.json <https://www.qgistutorials.com/downloads/bangalore_wards.json>`_

`bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate.csv <https://www.qgistutorials.com/downloads/bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate.csv>`_

Data Source: [UM]_

Procedure
--------------

1. Locate the ``bangalore_wards.json`` file in the :guilabel:`Browser` panel and drag it to the canvas. Next, we will load a basemap layer from OpenStreetMap. Go to :menuselection:`Web --> QuickMapServices --> OSM --> OSM Standard`. Once loaded, click :guilabel:`Open Data Source Manager` button.

  .. image:: /static/3/travel_time_analysis/images/01.png
    :align: center

2. Switch to the :guilabel:`Delimited Text` tab. Browse to the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate.csv`` file and select it. Since this CSV file is just tabular data, select :guilabel:`No geometry (attribute only table)` option and click :guilabel:`Add`.

  .. image:: /static/3/travel_time_analysis/images/02.png
    :align: center

3. Once the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` layer is added to the :guilabel:`Layers` panel, right-click on it and select :guilabel:`Show Feature Count`. The total rows from the table will be displayed next to it.

  .. image:: /static/3/travel_time_analysis/images/03.png
    :align: center

4. For the purpose of this exercise, we will calculate all areas that are accessible within 30 minutes from [Spatial Thoughts office](https://g.page/spatialthoughts?share). When you find the area on the basemap, you can select the :guilabel:`Identify` button and select ``bangalore_wards`` layer and click on it. The results will confirm that the office is located in the *JP Nagar* ward with the *MOVEMENT_ID* **193**.

  .. image:: /static/3/travel_time_analysis/images/04.png
    :align: center

5. We can filter the travel time records to just those which have this ward as the destination. We can also restrict our analysis to the peak morning commute hours of 9am-10am. Right-click the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` layer and select :guilabel:`Filter`.

  .. image:: /static/3/travel_time_analysis/images/05.png
    :align: center

6. Enter the following filter expression and click :guilabel:`OK`.

  .. code-block:: none

       "dstid" = 193 AND "hod" = 9


  .. image:: /static/3/travel_time_analysis/images/06.png
    :align: center

7. Back in the main QGIS window, you will see that the number of records in the filtered table are now down to just *197*. Since there are a total of 198 wards in the city, we have records of travel times between the 1 destination ward and 197 source wards. Open the attribute table of both the layers using the  :guilabel:`Open Attribute Table` button in the :guilabel:`Attributes` toolbar.

  .. image:: /static/3/travel_time_analysis/images/07.png
    :align: center

8. Now we have the shapes of the ward in the layer ``bangalore_wards`` and tabular information in the layer ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate``. We can join the attribute information to the shapes using a common attribute. Here the ``MOVEMENT_ID`` column from the ``bangalore_wards`` layer and ``sourceid`` column from the ``bangalore-wards-2019-3-OnlyWeekdays-HourlyAggregate`` are unique ward identifiers that can be joined. This operation is called a *Table Join*. 

  .. image:: /static/3/travel_time_analysis/images/08.png
    :align: center

9. Before we can join these two layers, we must ensure that the values in both columns match exactly. Thought they appear the same, they are of different type. Since GeoJSON format has no way of specifying property types, all values are assumed to be of the type *String* - i.e. Text. But when we import a CSV to QGIS, QGIS intelligently determines the types of the columns based on the values and hence has assigned the type *Integer* to the column ``sourceid``. So we need to convert the column from the GeoJSON to an integer type as well.  Go to :menuselection:`Processing --> Toolbox --> Vector Table --> Field Calculator algorithm`. Double-click to launch it.

  .. image:: /static/3/travel_time_analysis/images/09.png
    :align: center

10. Choose ``bangalore_wards`` as the :guilabel:`Input Layer`.  Name the Field Name as ``joinfield`` and select the :guilabel:`Result field type` as ``Integer``. Enter ``MOVEMENT_ID`` as the Expression. Click the :guilabel:`...` button next to the :guilabel:`Calculated` and select :guilabel:`Save to File...` then enter the name of the output file as ``bangalore_wards_fixed.gpkg``. Click :guilabel:`Run`. Close the field calculator.

  .. image:: /static/3/travel_time_analysis/images/10.png
    :align: center

11.  A new layer ``bangalore_wards_fixed`` will be added to the :guilabel:`Layers` panel. Now we are ready to perform the join. Go to :menuselection:`Processing --> Toolbox --> Vector General --> Join attributes by field value`. Double-click to launch it.

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

15. Enter the following expression to select all wards within 1800 seconds (30 minutes) of mean travel time. We also need to include our destination ward which will have 0 travel time.

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


