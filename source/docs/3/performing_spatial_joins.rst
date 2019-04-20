Performing Spatial Joins (QGIS3)
================================
Spatial Join is a classic GIS problem - transferring attributes from one layer to another based on their spatial relationship. In QGIS, this functionality is available through the ``Join attributes by location`` Processing algorithm. 


Overview of the task
--------------------
We will use 2 layers - A shapefile of Borough boundaries of New York city and another shapefile of Street Pavement Rating for all streets in New York city. The first task will be to find the average rating of streets in each of the borough using a spatial join with summary algorithm. The second task will be to add the name of the borough to the street features through a one-to-many spatial join.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Creating filters to temporarily exclude certain features from computation.

Get the data
------------
`NYC Open Data Portal <https://data.cityofnewyork.us/>`_ is an excellent source of free data for New York city.

Download the `Borough Boundaries  <https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm>`_ zip file using the Export option on the portal.

.. image:: /static/3/performing_spatial_joins/images/data1.png
   :align: center

Download the `Street Pavement Rating <https://data.cityofnewyork.us/Transportation/Street-Pavement-Rating/2cav-chmn>`_ zip file using the Export option on the portal.

.. image:: /static/3/performing_spatial_joins/images/data2.png
   :align: center

For convenience, you may directly download a copy of the datasets from the links below:

`nybb_19a.zip <http://www.qgistutorials.com/downloads/nybb_19a.zip>`_

`V_SSS_SEGMENTRATING_1.zip <http://www.qgistutorials.com/downloads/V_SSS_SEGMENTRATING_1.zip>`_

Data Source [CITYOFNY]_

Procedure
---------

1. Locate the ``nybb_19a.zip`` file in the QGIS Browser and expand it. Select the ``nybb_19a/nybb.shp`` layer and drag it to the canvas. This is a polygon layer representing the borough boundaries in New York city.

  .. image:: /static/3/performing_spatial_joins/images/1.png
     :align: center

2. Next, locate the ``V_SSS_SEGMENTRATING_1.zip`` file and expand it. Select the ``dot_V_SSS_SEGMENTRATING_1_20190129.shp`` layer and add it to the canvas. This is a line layer of all streets in the city.

  .. image:: /static/3/performing_spatial_joins/images/2.png
     :align: center

3. Let's examine the attributes available for each feature of the ``dot_V_SSS_SEGMENTRATING_1_20190129`` layer. Right-click and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/performing_spatial_joins/images/3.png
     :align: center

4. You will notice the attribute called ``Rating_B`` which has values in the range 0-10 representing the street segment's rating. The attribute ``RatingWord`` has descriptive rating. We can use the ``Rating_B`` field to calculate the average rating. 

  .. image:: /static/3/performing_spatial_joins/images/4.png
     :align: center

5. You may have notice some features have a rating of ``NR``. These are the segments that were not rated. Including them in our analysis will not be correct. Before we do the spatial join, let's set up a **Filter** to exclude these records. Right-click the ``dot_V_SSS_SEGMENTRATING_1_20190129`` layer and select :guilabel:`Filter`.

  .. image:: /static/3/performing_spatial_joins/images/5.png
     :align: center

6. In the :guilabel:`Query Builder`, type the following expression to select all records that are not rated ``NR``. You can also build the expression interactively by clicking on :guilabel:`Field`, :guilabel:`Operator` and selecting the appropriate :guilabel:`Value`. Click :guilabel:`OK`.

  .. code-block:: none
  
    "RatingWord" != 'NR'

  .. image:: /static/3/performing_spatial_joins/images/6.png
     :align: center

7. You will notice the ``dot_V_SSS_SEGMENTRATING_1_20190129`` layer now has a filter icon indicating that there is an active filter applied to this layer. Now we can do a spatial join using this layer. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/performing_spatial_joins/images/7.png
     :align: center

8. Search and locate the :menuselection:`Vector general --> Join attribute by location (summary)` algorithm. Double-click to launch it.

  .. image:: /static/3/performing_spatial_joins/images/8.png
     :align: center

9. In the :guilabel:`Join attribute by location (summary)` dialog, select ``nybb`` as the :guilabel:`Input layer`. The street layer ``dot_V_SSS_SEGMENTRATING_1_20190129`` will be the :guilabel:`Join layer`. You can leave the :guilabel:`Geometry predicate` to the default ``Intersects``. Click the :guilabel:`...` button next to :guilabel:`Fields to sumarize`.

  .. image:: /static/3/performing_spatial_joins/images/9.png
     :align: center

.. note::

  A tip to help you select the correct input and join layers: The input layer is the one that will be modified will new attributes in the spatial join. As we want the average rating field to be added to the borough layer, it will be the input layer.
  
10. Select ``Rating_B`` and click :guilabel:`OK`.

  .. image:: /static/3/performing_spatial_joins/images/10.png
     :align: center

11. Similarly, click the :guilabel:`...` button next to :guilabel:`Summaries to calculate`.

  .. image:: /static/3/performing_spatial_joins/images/11.png
     :align: center

12. Select ``mean`` as the summary operator and click :guilabel:`OK`. Now we are ready to start the processing. Click :guilabel:`Run`.

  .. image:: /static/3/performing_spatial_joins/images/12.png
     :align: center

13. The processing algorithm will work through the features and apply the spatial join. Verify that the processing job was successful and click :guilabel:`Close`.

  .. image:: /static/3/performing_spatial_joins/images/13.png
     :align: center

14. Back in the main QGIS window, you will see a new ``Joined layer`` layer added to canvas. Open the attribute table for this layer. You will see a new column ``Rating_B_mean`` is added to the input borough layer with the average rating of all streets that are interesecting with that feature.

  .. image:: /static/3/performing_spatial_joins/images/14.png
     :align: center

15. Now we can perform a reverse operation. Sometimes your analysis requires getting attributes from another layer based on the spatial relationship but not compute any summary. We can use the ``Join attribute by location`` algorithm for such analysis. The task is to add the name of the borough to each feature in the streets layer based on which borough polygon it intersects with. Before we run this algorithm, let's remove the filter from the ``dot_V_SSS_SEGMENTRATING_1_20190129`` layer. Click the filter icon and press the :guilabel:`Clear` in the :guilabel:`Query Builder`. Click :guilabel:`OK`.

  .. image:: /static/3/performing_spatial_joins/images/15.png
     :align: center

16. Turn of the ``Joined layer`` in the :guilabel:`Layers` panel. Find the :menuselection:`Vector general --> Join attribute by location` algorithm in the Processing Toolbox and double-click it to launch.

  .. image:: /static/3/performing_spatial_joins/images/16.png
     :align: center

17. Select ``dot_V_SSS_SEGMENTRATING_1_20190129`` as the :guilabel:`Input layer` and ``nybb`` as the :guilabel:`Join layer`. You can leave the :guilabel:`Geometry predicate` to the default ``Intersects``. Click the :guilabel:`...` button next to :guilabel:`Fields to add`  and select ``BoroName``. Click :guilabel:`OK`.

  .. image:: /static/3/performing_spatial_joins/images/17.png
     :align: center

18. The line segment may cross a borough boundary, so we choose the :guilabel:`Join type` as ``Crate separate feature for each located feature (one-to-many)``. Click :guilabel:`Run`.

  .. image:: /static/3/performing_spatial_joins/images/18.png
     :align: center

19. Once the processing finishes, open the attribute table of the newly added ``Joined layer``. You will see that there is a new ``BoroName`` attribute added to each street feature.

  .. image:: /static/3/performing_spatial_joins/images/19.png
     :align: center