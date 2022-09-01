Nearest Neighbor Analysis
=========================

.. warning:: 

   This tutorial is now obsolete. A new and updated version is available at :doc:`3/nearest_neighbor_analysis`
   
GIS is very useful in analyzing spatial relationship between features. One such
analysis is finding out which features are closest to a given feature. QGIS has
a tool called **Distance Matrix** which helps with such analysis. In this
tutorial, we will use 2 datasets and find out which points from one layer are
closest to which point from the second layer.

Overview of the task
--------------------

Given the locations of all known significant earthquakes, find out the nearest
populated place for each location where the earthquake happened.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to do table joins in QGIS. (See :doc:`performing_table_joins` for
  detailed instructions.)
- Using :guilabel:`Query Builder` to show a subset of features from a layer.
- Using MMQGIS plugin to create hub lines to visualize the nearest neighbors.

Get the data
------------

We will use NOAA’s National Geophysical Data Center’s `Significant Earthquake
Database <http://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1>`_ as our
layer representing all major earthquakes. Download the `tab-delimited
earthquake data
<http://www.ngdc.noaa.gov/nndc/struts/results?type_0=Exact&query_0=$ID&t=101650&s=13&d=189&dfn=signif.txt>`_.

Natural Earth has a nice `Populated Places
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_
dataset. Download the `simple (less columns) dataset
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_


For convenience, you may directly download a copy of both the datasets from the links
below:

`signif.txt <http://www.qgistutorials.com/downloads/signif.txt>`_

`ne_10m_populated_places_simple.zip <http://www.qgistutorials.com/downloads/ne_10m_populated_places_simple.zip>`_

Data Sources: [NCEI]_ [NATURALEARTH]_

Procedure
---------

1. Open :menuselection:`Layer --> Add Layer --> Add Delimited Text Layer` and
   browse to the downloaded ``signif.txt`` file.

.. image:: /static/nearest_neighbor_analysis/images/1.png
   :align: center

2. Since this is a *tab-delimited file*, choose :guilabel:`Tab` as the
   :guilabel:`File format`. The :guilabel:`X field` and :guilabel:`Y field`
   would be auto-populated. Click :guilabel:`OK`.

.. note::
   You may see some error messages as QGIS tries to import the file. These are
   valid errors and some rows from the file will not be imported. You can ignore
   the errors for the purpose of this tutorial.

.. image:: /static/nearest_neighbor_analysis/images/2.png
   :align: center

3. As the earthquake dataset has Latitude/Longitude coordinates, it will be
   imported with the default CRS of ``EPSG: 4326``. Verify that is the case in
   the bottom-right corner. Let's also open the Populated Places layer. Go to
   :menuselection:`Layer --> Add Layer --> Add Vector Layer`.

.. image:: /static/nearest_neighbor_analysis/images/3.png
   :align: center

4. Browse to the downloaded ``ne_10m_populated_places_simple.zip`` file and
   click :guilabel:`Open`.

.. image:: /static/nearest_neighbor_analysis/images/4.png
   :align: center

5. Zoom around and explore both the datasets. Each purple point represents the
   location of a significant earthquake and each blue point represents the
   location of a populated place. We need a way to find out the nearest point
   from the populated places layer for each of the points in the earthquake
   layer.

.. image:: /static/nearest_neighbor_analysis/images/5.png
   :align: center

6. Go to :menuselection:`Vector --> Analysis Tools --> Distance Matrix`.

.. image:: /static/nearest_neighbor_analysis/images/6.png
   :align: center

7. Here select the earthquake layer ``signif`` as the Input point layer and the
   populated places ``ne_10m_populated_places_simple`` as the target layer. You
   also need to select a unique field from each of these layers which is how
   your results will be displayed. In this analysis, we are looking to get only
   ``1`` nearest point, so check the :guilabel:`Use only the nearest(k) target
   points`, and enter :guilabel:`1`. Name your output file ``matrix.csv``, and
   click OK.  Once the processing finishes, click :guilabel:`Close`.

.. note::

   A useful thing to note is that you can even perform the analysis with only 1
   layer. Select the same layer as both Input and Target. The result would be a
   nearest neighbor from the same layer instead of a different layer as we have
   used here.

.. image:: /static/nearest_neighbor_analysis/images/7.png
   :align: center

8. Once the processing finishes, click the :guilabel:`Close` button in the
   :guilabel:`Distance Matrix` dialog. You can now view the ``matrix.csv`` file
   in Notepad or any text editor.  QGIS can import CSV files as well, so we
   will add it to QGIS and view it there. Go to :menuselection:`Layer --> Add
   Layer --> Add Delimited Text Layer...`.

.. image:: /static/nearest_neighbor_analysis/images/8.png
   :align: center

9. Browse to the newly created ``matrix.csv`` file. Since this file is just
   text columns, select :guilabel:`No geometry (attribute only table)` as the
   :guilabel:`Geometry definition`. Click :guilabel:`OK`.

.. image:: /static/nearest_neighbor_analysis/images/9.png
   :align: center

10. You will see the CSV file loaded as a table. Right-click on the table layer
    and select :guilabel:`Open Attribute Table`.

.. image:: /static/nearest_neighbor_analysis/images/10.png
   :align: center

11. Now you will be able to see the content of our results. The
    :guilabel:`InputID` field contains the field name from the Earthquake
    layer. The :guilabel:`TargetID` field contains the name of the feature from
    the Populated Places layer that was the closest to the earthquake point.
    The :guilabel:`Distance` field is the distance between the 2 points.

.. note::

    Remember that the *distance* calculation will be done using the layers'
    Coordinate Reference System. Here the distance will be in *decimal degrees*
    units because our source layer coordinates are in degrees. If you want
    distance in meters, reproject the layers before running the tool.

.. image:: /static/nearest_neighbor_analysis/images/11.png
   :align: center

12. This is very close to the result we were looking for. For some users, this
    table would be sufficient. However, we can also integrate this results in
    our original Earthquake layer using a **Table Join**. Right-click on the
    Earthquake layer, and select :guilabel:`Properties`.

.. image:: /static/nearest_neighbor_analysis/images/12.png
   :align: center

13. Go to the :guilabel:`Joins` tab and click on the :guilabel:`+` button.

.. image:: /static/nearest_neighbor_analysis/images/14.png
   :align: center

14. We want to join the data from our analysis result to this layer. We need to
    select a field from each of the layers that has the same values. Select
    ``matrix`` as the :guilabel:`Join layer`` and ``InputID`` as the
    :guilabel:`Join field`. The :guilabel:`Target field` would be ``I_D``.
    Leave other options to their default values and click :guilabel:`OK`.

.. image:: /static/nearest_neighbor_analysis/images/14.png
   :align: center

15. You will see the join appear in the :guilabel:`Joins` tab. Click
    :guilabel:`OK`.

.. image:: /static/nearest_neighbor_analysis/images/15.png
   :align: center

16. Now open the attribute table of the ``signif`` layer by right-clicking and
    selecting :guilabel:`Open Attribute Table`.

.. image:: /static/nearest_neighbor_analysis/images/16.png
   :align: center

17. You will see that for every Earthquake feature, we now have an attribute
    which is the nearest neighbor (closest populated place) and the distance to
    the nearest neighbor.

.. image:: /static/nearest_neighbor_analysis/images/17.png
   :align: center

18. We will now explore a way to visualize these results. First, we need to
    make the table join permanent by saving it to a new layer. Right-click the
    ``signif`` layer and select :guilabel:`Save As...`.

.. image:: /static/nearest_neighbor_analysis/images/18.png
   :align: center

19. Click the :guilabel:`Browse` button next to :guilabel:`Save as` label and
    name the output layer as ``earthquake_with_places.shp``. Make sure the
    :guilabel:`Add saved file to map` box is checked and click :guilabel:`OK`.

.. image:: /static/nearest_neighbor_analysis/images/19.png
   :align: center

20. Once the new layer is loaded, you can turn off the visibility of the
    ``signif`` layer. As our dataset is quite large, we can run our
    visualization analysis on a subset of the data. QGIS has a neat feature
    where you can load a subset of features from a layer without having to
    export it to a new layer. Right-click the ``earthquake_with_places`` layer
    and select :guilabel:`Properties`.

.. image:: /static/nearest_neighbor_analysis/images/20.png
   :align: center

21. In the :guilabel:`General` tab, scroll down to the :guilabel:`Feature
    subset` section. Click :guilabel:`Query Builder`.

.. image:: /static/nearest_neighbor_analysis/images/21.png
   :align: center

22. For this tutorial, we will visualize the earthquakes and their nearest
    populated places for Mexico. Enter the following expression in the
    :guilabel:`Query Builder` dialog.

.. code-block:: none

   "COUNTRY" = 'MEXICO'

.. image:: /static/nearest_neighbor_analysis/images/22.png
   :align: center

23. You will see that only the points falling within Mexico will be visible in
    the canvas. Let's do the same for the populated places layer. Right-click
    on the ``ne_10m_populated_places_simple`` layer and select
    :guilabel:`Properties`.

.. image:: /static/nearest_neighbor_analysis/images/23.png
   :align: center

24. Open the :guilabel:`Query Builder` dialog from the :guilabel:`General` tab.
    Enter the following expression.

.. code-block:: none

   "adm0name" = 'Mexico'

.. image:: /static/nearest_neighbor_analysis/images/24.png
   :align: center

25. Now we are ready to create our visualization. We will use a plugin named
    ``MMQGIS``. Find and install the plugin. See :doc:`using_plugins` for more
    details on how to work with plugins. Once you have the plugin installed, go
    to :menuselection:`MMQGIS --> Create --> Hub Lines`.

.. image:: /static/nearest_neighbor_analysis/images/25.png
   :align: center

26. Select ``ne_10m_populated_places_simple`` as the :guilabel:`Hub Point
    Layer` and ``name`` as the :guilabel:`Hub ID Attribute`. Similarly, select
    ``earthquake_with_places`` as the :guilabel:`Spoke Point Layer` and
    ``matrix_Tar`` as the :guilabel:`Spoke Hub ID Attribute`. The hub lines
    algorithm will go through each of earthquake points and create a line that
    will join it to the populated place which matches the attribute we
    specified. Click :guilabel:`Browse` and name the :guilabel:`Output
    Shapefile` as ``earthquake_hub_lines.shp``. Click :guilabel:`OK` to start
    the processing.

.. image:: /static/nearest_neighbor_analysis/images/26.png
   :align: center

27. The processing may take a few minutes. You can see the progress on the
    bottom-left corner of the QGIS window.

.. image:: /static/nearest_neighbor_analysis/images/27.png
   :align: center

28. Once the processing is done, you will see the ``earthquake_hub_lines``
    layer loaded in QGIS. You can see that each earthquake point now has a line
    that connects it to the nearest populated place.

.. image:: /static/nearest_neighbor_analysis/images/28.png
   :align: center
