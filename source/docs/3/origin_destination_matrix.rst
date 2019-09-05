Nearest Facility Analysis with Origin-Destination Matrix (QGIS3)
================================================================

In the previous tutorial, :doc:`basic_network_analysis`, we learnt how to build a network and calculate the shortest path between 2 points. We can apply that technique for many different types of network-based analysis. One such application is to compute **Origin-Destination Matrix** or **OD Matrix**. Given a set of origin points and another set of destination points, we can calculate shortest path between each origin-destination pairs and find out the travel distance/time between them. Such analysis is useful to locate the closest facility to any given point. For example, a logistics company may use this analysis to find the closest warehouse to their customers to optimize delivery routes. Here we use Distance Matrix algorithm from **QGIS Network Analysis Toolbox (QNEAT3)** plugin to find the nearest health facility to each address in the city.

.. note::

  This tutorial shows how to use your own network data to compute an origin-destination matrix. If you do not have your own network data, you can use **ORS Tools Plugin** and algorithm :menuselection:`ORS Tools --> Matrix -->  Matrix from Layers` to do the similar analysis using OpenStreetMap data. See :doc:`service_area_analysis` to learn how to use ORS Tools plugin.

Overview of the task
--------------------

We will take 2 layers for Washington DC - one with points representing addresses and another with points representing mental health facilities - and find out the facility with the least travel distance from each address.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Extract a stratified random sample from a point layer.
- Use Virtual Layers to run SQL query on a QGIS layer.
- Use Python Console Editor to run a pyqgis script.

Get the data
------------
District of Columbia government freely shares hundreds of datasets on the `Open Data Catalog <https://opendata.dc.gov/>`_. 

Download the following data layers as shapefiles.

- `Street Centerlines <https://opendata.dc.gov/datasets/street-centerlines>`_ 
- `Address Points <https://opendata.dc.gov/datasets/address-points>`_
- `Adult Mental Health Providers <https://opendata.dc.gov/datasets/adult-mental-health-providers>`_

    
For convenience, you may directly download a copy of the datasets from the
links below:

`Street_Centerlines.zip <http://www.qgistutorials.com/downloads/Street_Centerlines.zip>`_

`Address_Points.zip <http://www.qgistutorials.com/downloads/Address_Points.zip>`_

`Adult_Mental_Health_Providers.zip <http://www.qgistutorials.com/downloads/Adult_Mental_Health_Providers.zip>`_

Data Source: [DCOPENDATA]_

Setup
-----
Visit :menuselection:`Plugins --> Manage and Install plugins`. Search for **QNEAT3** plugin and install it. Click :guilabel:`Close`.

.. image:: /static/3/origin_destination_matrix/images/setup1.png
  :align: center
    
Procedure
---------

1. Locate the downloaded ``Street_Centerlines.zip`` file in the :guilabel:`Browser` panel. Expand it and drag the ``Street_Centerlines.shp`` file to the canvas. Similarly, locate the ``Adult_Mental_Health_Providers.zip`` file, expand it and add ``Adult_Mental_Health_Providers.shp`` to the canvas.

  .. image:: /static/3/origin_destination_matrix/images/1.png
    :align: center
  
2. Next, locate the ``Address_Points.zip`` file, expand it and add the ``Address_Points.shp``. You will see a lot of points around the city. Each point represents a valid address. We will not randomly select 1 point in each ward to use as the origin points. This technique is called stratified sampling. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/origin_destination_matrix/images/2.png
    :align: center
  
3. Search for and locate the :menuselection:`Vector Selection --> Random extract within subsets` algorithm.

  .. image:: /static/3/origin_destination_matrix/images/3.png
    :align: center
  
4. Select ``Address_Points`` as the :guilabel:`Input layer`. Each address point contains an attribute called ``WARD_2012`` which has the ward number associated with the address. As we want only 1 point per ward, we use that attribute as the :guilabel:`ID field`. Set :guilabel:`Number/percentage of selected features` as ``1``.

  .. image:: /static/3/origin_destination_matrix/images/4.png
    :align: center
  
5. A new layer ``Extracted (random stratified)`` will be added to the :guilabel:`Layers` panel.

  .. image:: /static/3/origin_destination_matrix/images/5.png
    :align: center
  
6. Turn-off the visibility for the ``Address_Points`` layer. Right-click on the ``Extracted (random stratified)`` layer and select :guilabel:`Rename layer`.

  .. image:: /static/3/origin_destination_matrix/images/6.png
    :align: center
  
7. Let's rename this layer as ``origin_points``. Similarly rename the ``Adult_Mental_Health_Providers`` layers representing the health facilities as ``destination_points``. Naming the layers this way makes it easy to identify them in subsequent processing. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/origin_destination_matrix/images/7.png
    :align: center
  
8. Locate the :menuselection:`QNEAT3 --> Distance matrices --> OD Matrix from Layers as Table (m:n)` algorithm. If you do not see this algorithm in the toolbox, make sure you have installed the **QNEAT3** plugin.

  .. image:: /static/3/origin_destination_matrix/images/8.png
    :align: center
  
9. This algorithm helps find the distances along the network between selected origin and destination layers. Select ``Street_Centerlines`` as the :guilabel:`Network layer`. Select ``origin_points`` as the :guilabel:`From-Points layer` and ``OBJECTID`` as the :guilabel:`Unique Point ID field`. Similarly, set ``destination_points`` as the :guilabel:`To-Points Layer` and ``OBJECTID`` as  the :guilabel:`Unique Point ID field`. Set the :guilabel:`Optimization Criterion` as ``Shortest Path``.

  .. image:: /static/3/origin_destination_matrix/images/9.png
    :align: center
  
10. As many streets in the network are one-way, we need to set the :guilabel:`Advanced parameters` to specify the direction. See :doc:`basic_network_analysis` for more details on how these attributes are structured. Choose ``DIRECTIONA`` as the :guilabel:`Direction field`. Enter ``One Way (Digitizing direction)`` as the :guilabel:`Value for forward direction` and ``One way (Against digitizing direction)`` as the :guilabel:`Value for backward direction`. Keep other options to their default values and click :guilabel:`Run`.

  .. image:: /static/3/origin_destination_matrix/images/10.png
    :align: center
  
11. A new table layer called ``Output OD Matrix`` will be added to the :guilabel:`Layers` panel. Right-click and select :guilabel:`Open Attributes Table`. You will see that the table contains *117* rows. We had 9 origin points and 13 destination points - so the output contains *9x13 = 117* pairs of origins and destination. The ``total_cost`` column contains distance in meters between each origin point to every destination point. 

  .. image:: /static/3/origin_destination_matrix/images/11.png
    :align: center
  
12. For this tutorial, we are interested in only the destination point with the shortest distance. We can create a SQL query to pick the destination with the least ``total_cost`` among all destinations. Go to :menuselection:`Database --> DB Manager..`

  .. image:: /static/3/origin_destination_matrix/images/12.png
    :align: center
  
13. In the :guilabel:`DB Manager` dialog, select the :menuselection:`Virtual Layers --> Project layers --> Output OD Matrix` from the left-hand panel. See `Virtual layers <https://docs.qgis.org/testing/en/docs/user_manual/working_with_vector/virtual_layers.html>`_ documentation to learn more. Click the :guilabel:`SQL Window` button.

  .. image:: /static/3/origin_destination_matrix/images/13.png
    :align: center
  
14. Enter the following query and click :guilabel:`Execute`. The results will be displayed in the panel below. As expected, we have 9 rows in the result - the shortest path destination for each origin point. Check and select :guilabel:`Column with unique values` as ``origin_id``. Enter ``nearest_destinations`` as the :guilabel:`Layer name (prefix)`. Click :guilabel:`Load`.

  .. code-block:: none

    select origin_id, destination_id, min(total_cost) as shortest_distance 
    from 'Output OD Matrix' group by origin_id

  .. image:: /static/3/origin_destination_matrix/images/14.png
    :align: center
  
15. A new virtual layer ``nearest_destinations`` will be added to the :guilabel:`Layers` panel. This table has the result of our analysis. Nearest mental health center for each of the 9 origin points. Let's try a few different ways to visualize and validate these results. Go to :menuselection:`Processing --> Toolbox`. Search for and locate the :menuselection:`Join attributes by field value` algorithm. Double-click to launch it.

  .. image:: /static/3/origin_destination_matrix/images/15.png
    :align: center
  
16. Select ``origin_points`` as the :guilabel:`Input layer` and ``OBJECTID`` as the :guilabel:`Table field`. Set ``nearest_destinations`` as the :guilabel:`Input layer 2` and ``origin_id`` as the :guilabel:`Table field 2`. Click the :guilabel:`...` button next to :guilabel:`Layer 2 fields to copy` and select ``destination_id`` and ``shortest_distance``. Click :guilabel:`Run`.

  .. image:: /static/3/origin_destination_matrix/images/16.png
    :align: center
  
17. A new ``Joined layer`` will be added to the :guilabel:`Layers` panel. This layer has the nearest destination id attribute for each origin point. We can now create a hub-spoke visualization using this layer. Search for :menuselection:`Vector analysis --> Join by lines (hub lines)` algorithm. Right-click to launch it.

  .. image:: /static/3/origin_destination_matrix/images/17.png
    :align: center
  
18. Select ``destination_points`` as the :guilabel:`Hub layer` and ``OBJECTID`` as the :guilabel:`Hub ID field`. Select ``Joined layer` as the :guilabel:`Spoke layer` and ``destination_id`` as the :guilabel:`Spoke ID field`. Click :guilabel:`Run`.

  .. image:: /static/3/origin_destination_matrix/images/18.png
    :align: center
  
19. Once the processing finishes, a new layer ``Hub lines`` will be added to the :guilabel:`Layers` panel. This layer shows the lines connecting each origin with the nearest destination.

  .. image:: /static/3/origin_destination_matrix/images/19.png
    :align: center
  
20. Note that even though the lines connecting the origin and destination is a straight-line, the destination was found using the distance along the network. It will be much useful visualization to show the actual shortest-path between each origin-destination. As of now, there is no easy way to generate the shortest-path between multiple origin-destination pairs the way we generated the distance matrix. But I will demonstrate a way to use some python scripting to generate this visualization. Firs, let's run the shortest path algorithm on 1 pair. Locate the :menuselection:`QNEAT3 --> Routing --> Shortest path (point to point)` algorithm and launch it.

  .. image:: /static/3/origin_destination_matrix/images/20.png
    :align: center
  
21. In the :guilabel:`Shortest Path (Point to Point)` dialog, select ``Street_Centerlines`` as the :guilabel:`Vector layer representing network`.  Keep the :guilabel:`Path type to calculate` as ``Shortest``. Next we need to pick a start and end point. You can click the :guilabel:`...` button next to :guilabel:`Start point` and click on the origin point in the canvas. Similarly select the destination point as the :guilabel:`End point`. Expand the :guilabel:`Advanced parameter` section. Choose ``DIRECTIONA`` as the :guilabel:`Direction field`. Enter ``One Way (Digitizing direction)`` as the :guilabel:`Value for forward direction` and ``One way (Against digitizing direction)`` as the :guilabel:`Value for backward direction`. Keep other options to their default values and click :guilabel:`Run`.

  .. image:: /static/3/origin_destination_matrix/images/21.png
    :align: center
  
22. A new layer ``Shortest Path Layer`` wll be added to the :guilabel:`Layers` panel. You will see that this path follows the network rather than connecting the origin and destination with a straight line. The reason we ran the algorithm on 1 pair is to easily identify the parameter values that we can use in our script. Select both ``Hub lines`` and ``Shortest Path layer``, right-click and select :guilabel:`Remove Layer`. Click the :guilabel:`History` button in the :guilabel:`Processing Toolbox`. 

  .. image:: /static/3/origin_destination_matrix/images/22.png
    :align: center
  
23. Pick the top-most algorithm and you will see the full command displayed in the panel below. Copy the command and click :guilabel:`Close`.

  .. image:: /static/3/origin_destination_matrix/images/23.png
    :align: center
  
24. Go to :menuselection:`Plugins --> Python Console`.

  .. image:: /static/3/origin_destination_matrix/images/24.png
    :align: center
  
25. Click the :guilabel:`Show Editor` button in the :guilabel:`Python Console`.

  .. image:: /static/3/origin_destination_matrix/images/25.png
    :align: center
  
26. In the editor window, copy/paste the following script. This script uses the parameter values from the processing history that we saw earlier. Click :guilabel:`Run Script` button to start execution.

  .. image:: /static/3/origin_destination_matrix/images/26.png
    :align: center
  
  .. literalinclude:: /static/3/origin_destination_matrix/scripts/network.py

27. The script will take a few minutes to run. Once finished, you will see 9 new layers named ``Shortest Path layer``. Let's merge these paths to a single layer. Find the :menuselection:`Vector general --> Merge vector layers` algorithm and launch it.

  .. image:: /static/3/origin_destination_matrix/images/27.png
    :align: center
  
28. Select all 9 ``Shortest Path layer`` as the :guilabel:`Input layers`. Click :guilabel:`Run`.

  .. image:: /static/3/origin_destination_matrix/images/28.png
    :align: center
  
29. A new ``Merged`` layer will be created which will contain shortest path between our origins and destinations.

  .. image:: /static/3/origin_destination_matrix/images/29.png
    :align: center
  