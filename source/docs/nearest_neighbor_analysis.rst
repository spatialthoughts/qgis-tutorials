Nearest Neighbor Analysis
=========================
.. only:: html

   [ Download PDF `A4 <../pdf/nearest_neighbor_analysis_a4.pdf>`_ `Letter
   <../pdf/nearest_neighbor_analysis_letter.pdf>`_ ]

GIS is very useful is analyzing spatial relationship between features. One such
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

Get the data
------------

We will use NOAA’s National Geophysical Data Center’s `Significant Earthquake
Database <http://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1>`_ as our
layer represenging all major earthquakes. Download the `tab-delimited
earthquake data
<http://www.ngdc.noaa.gov/nndc/struts/results?type_0=Exact&query_0=$ID&t=101650&s=13&d=189&dfn=signif.txt>`_.

Natural Earth has a nice `Populated Places
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_
dataset. Download the `simple (less columns) dataset
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_

.. only:: html

   For convenience, you may directly download a copy of both the datasets from the links
   below:

   :download:`signif.txt </static/nearest_neighbor_analysis/data/signif.txt>`

   :download:`ne_10m_populated_places_simple.zip </static/nearest_neighbor_analysis/data/ne_10m_populated_places_simple.zip>`

Procedure
---------

1. Open :menuselection:`Layer --> Add Delimited Text Layer` and browse to the
   downloaded ``signif.txt`` file.

.. image:: /static/nearest_neighbor_analysis/images/1.png
   :width: 700px
   :align: center

2. Since this is a *tab-delimited file*, choose :guilabel:`Tab` as the
   :guilabel:`File format`. The :guilabel:`X field` and :guilabel:`Y field`
   would be auto-populated. Click :guilabel:`OK`.

.. note::
   You may see some error messages as QGIS tries to import the file. These are
   valid errors and some rows from the file will not be imported. You can ignore
   the errors for the purpose of this tutorial.

.. image:: /static/nearest_neighbor_analysis/images/2.png
   :width: 675px
   :align: center

3. As the earthquake dataset has Latitude/Longitude coordinates, choose
   :guilabel:`WGS 84 EPSG:436` as the CRS in the :guilabel:`Coordinate Reference System Selector`
   dialog.

.. image:: /static/nearest_neighbor_analysis/images/3.png
   :width: 500px
   :align: center

4. The earthquake point layer would now be loaded and displayed in QGIS. Let's
   also open the Populated Places layer. Go to :menuselection:`Layer --> Add
   Vector Layer`.

.. image:: /static/nearest_neighbor_analysis/images/4.png
   :width: 700px
   :align: center

5. Browse to the downloaded ``ne_10m_populated_places_simple.zip`` file and
   click :guilabel:`Open`. Select the ``ne_10m_populated_places_simple.shp`` as
   the layer in the :guilabel:`Select layers to add...` dialog.

.. image:: /static/nearest_neighbor_analysis/images/5.png
   :width: 600px
   :align: center

6. Zoom around and explore both the datasets. Each purple point represents the
   location of a significant earthquake and each blue point represents the
   location of a populated place. We need a way to find out the nearest point
   from the populated places layer for each of the points in the earthquake
   layer.

.. image:: /static/nearest_neighbor_analysis/images/6.png
   :width: 700px
   :align: center

7. Go to :menuselection:`Vector --> Analysis Tools --> Distance Matrix`.

.. image:: /static/nearest_neighbor_analysis/images/7.png
   :width: 700px
   :align: center

8. Here select the earthquake layer ``signif`` as the Input point layer and the populated
   places ``ne_10m_populated_places_simple`` as the target layer. You also need
   to select a unique field from each of these layers which is how your results
   will be displayed. In this analysis, we are looking to get only **1** nearest
   point, so check the :guilabel:`Use only the nearest(k) target points`, and
   enter :guilabel:`1`. Name your output file ``matrix.csv``, and click OK.

.. note::

   A useful thing to note is that you can even perform the analysis with only 1
   layer. Select the same layer as both Input and Target. The result would be a
   nearest neighbor from the same layer instead of a different layer as we have
   used here.

.. image:: /static/nearest_neighbor_analysis/images/8.png
   :width: 400px
   :align: center

9. Once your file is generated, you can view it in Notepad or any text editor.
   QGIS can import CSV files as well, so we will add it to QGIS and view it
   there. Go to :menuselection:`Layer --> Add Delimited Text Layer...`.

.. image:: /static/nearest_neighbor_analysis/images/9.png
   :width: 700px
   :align: center

10. Browse to the newly created ``matrix.csv`` file. Since this file is just
    text columns, select :guilabel:`No geometry (attribute only table)` as the
    :guilabel:`Geometry definition`. Click :guilabel:`OK`.

.. image:: /static/nearest_neighbor_analysis/images/10.png
   :width: 675px
   :align: center

11. You will the the CSV file loaded as a table. Right-click on the table layer
    and select :guilabel:`Open Attribute Table`.

.. image:: /static/nearest_neighbor_analysis/images/11.png
   :width: 700px
   :align: center

12. Now you will be able to see the content of our results. The :guilabel:`InputID`
    field contains the field name from the Earthquake layer. The :guilabel:`TargetID`
    field contains the name of the feature from the Populated Places layer that was
    the closest to the earthquake point. The :guilabel:`Distance` field is the distance
    between the 2 points.

.. note::

    Remember that the *distance* calculation will be done using the layers'
    Coordinate Reference System. Here the distance will be in *decimal degrees*
    units because our source layer coordinates are in degrees. If you want
    distance in meters, reproject the layers before running the tool.

.. image:: /static/nearest_neighbor_analysis/images/12.png
   :width: 700px
   :align: center

13. This is very close to the result we were looking for. For some users, this
    table would be sufficient. However, we can also integrate this results in
    our original Earthquake layer using a **Table Join**. Right-click on the Earthquake
    layer, and select :guilabel:`Properties`.

.. image:: /static/nearest_neighbor_analysis/images/13.png
   :width: 700px
   :align: center

14. Go to the :guilabel:`Joins` tab and click on the :guilabel:`+` button.

.. image:: /static/nearest_neighbor_analysis/images/14.png
   :width: 700px
   :align: center

15. We want to join the data from our analysis result (``matrix.csv``) to this
    layer. We need to select a field from each of the layers that has the same
    values. Select the fields as shown below.

.. image:: /static/nearest_neighbor_analysis/images/15.png
   :width: 325px
   :align: center

16. You will see the join appear in the :guilabel:`Joins` tab. Click
    :guilabel:`OK`.

.. image:: /static/nearest_neighbor_analysis/images/16.png
   :width: 700px
   :align: center

17. Now open the attribute table of the Earthquakes layer by right-clicking and
    selecting :guilabel:`Open Attribute Table`.

.. image:: /static/nearest_neighbor_analysis/images/17.png
   :width: 700px
   :align: center

18. You will see that for every Earthquake feature, we now have an attribute
    which is the nearest neighbor (closest populated place) and the distance to
    the nearest neighbor.

.. image:: /static/nearest_neighbor_analysis/images/18.png
   :width: 700px
   :align: center
