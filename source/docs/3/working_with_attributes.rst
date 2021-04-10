Working with Attributes (QGIS3)
===============================
GIS data has two parts - features and attributes. Attributes are structured data about each feature. This tutorial shows how to view the attributes of a GIS vector layer and do basic queries on them in QGIS.

Overview of the task
--------------------

The dataset for this tutorial contains information about populated places of the world. The task is to query and find all the capital cities in the World that have a population greater than 1 million and save the resulting subset as a GeoJSON file.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Select features from a layer using expressions.
- Using the :guilabel:`Attributes` toolbar.
- Exporting selected features in a layer.

Get the data
------------
Natural Earth provides a `Populated Places <http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_ dataset. Download the `simple (less columns) dataset <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_.

For convenience, you may directly download a copy of datasets from the link below:

`ne_10m_populated_places_simple.zip <https://www.qgistutorials.com/downloads/ne_10m_populated_places_simple.zip>`_

Data Source [NATURALEARTH]_

Procedure
---------

1. Locate the ``ne_10m_populated_places_simple.zip`` file in the QGIS Browser and expand it. Select the ``ne_10m_populated_places_simple.shp`` file and drag it to the canvas. 

  .. image:: /static/3/working_with_attributes/images/1.png
     :align: center

2. A new layer ``ne_10m_populated_places_simple`` will now be loaded in QGIS and you will see many points representing the populated places of the world. The default view in the QGIS canvas shows the geometry of the GIS layer. Each point also has associated attributes. Let’s view them. Locate the :guilabel:`Attributes Toolbar`. This toolbar contains many useful tools to inspect, view, select, and modify attributes of a layer.

  .. image:: /static/3/working_with_attributes/images/2.png
     :align: center

.. note::

  If you do not see the toolbar, you can enable it from :menuselection:`View --> Toolbars --> Attributes Toolbar`.

3. Click the :guilabel:`Identify` button on the :guilabel:`Attributes Toolbar`. Once the tool is selected, click on any point on the canvas. The associated attributes of that point will be displayed in a new :guilabel:`Identify Results` panel. Once you are done exploring attributes of different points, you can click the :guilabel:`Close` button. 

  .. image:: /static/3/working_with_attributes/images/3.png
     :align: center

4. Rather than viewing the attribute one feature at a time, we can view them all together as a table. Click the :guilabel:`Open Attribute Table` button on the :guilabel:`Attributes Toolbar`. You can also right-click the ``ne_10m_populated_places_simple`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/working_with_attributes/images/4.png
     :align: center

5. You can scroll horizontally and locate the **pop_max** column. This field contains the population of the associated place. You can click twice on the field header to sort the column in descending order.

  .. image:: /static/3/working_with_attributes/images/5.png
     :align: center

6. Now we are ready to perform our query on these attributes. QGIS uses SQL-like expressions to perform queries. Click :guilabel:`Select features using an expression` button. 

  .. image:: /static/3/working_with_attributes/images/6.png
     :align: center

7. In the :guilabel:`Select By Expression` window, expand the :guilabel:`Fields and Values` section and double-click the ``pop_max`` label. You will notice that it is added to the expression section at the bottom. If you aren't sure about the field values, you can click the :guilabel:`All Unique` button to see what the attribute values are present in the dataset. For this exercise, we are looking to find all features that have a population greater than 1 million. So complete the expression as below and click :guilabel:`Select Features` and then :guilabel:`Close`.

  .. code-block:: none

     "pop_max" > 1000000

  .. image:: /static/3/working_with_attributes/images/7.png
     :align: center

.. note::

  In the QGIS Expression engine, text with double-quotes refers to a field and text with single-quotes refer to a string value.

8. You will notice that some rows in the attribute table are now selected. The label window also changes and shows the count of selected features.

  .. image:: /static/3/working_with_attributes/images/8.png
     :align: center

9. Close the attribute table window and return to the main QGIS window. You will notice that a subset of points is now rendered in yellow. This is the result of our query and the selected points are the ones having ``pop_max`` attribute value greater than ``1000000``.

  .. image:: /static/3/working_with_attributes/images/9.png
     :align: center

10. Let's update our query to include a condition that the place should also be a capital in addition to having a population greater than 1 million. To quickly get  to the expression editor, you can use the :guilabel:`Select Features by Expression` button in the :guilabel:`Attributes Toolbar`.

  .. image:: /static/3/working_with_attributes/images/10.png
     :align: center

11. The field containing data about capitals is **adm0cap**. The value ``1`` indicates that the place is a capital. We can add this criteria to our previous expression using the *and* operator. Enter the expression as below and click :guilabel:`Select Features` and then :guilabel:`Close`.

  .. code-block:: none

     "pop_max" > 1000000 and "adm0cap" = 1

  .. image:: /static/3/working_with_attributes/images/11.png
     :align: center

12. Return to the main QGIS window. Now you will see a smaller subset of the points selected. This is the result of the second query and shows all places from the dataset that are country capitals as well as have population greater than 1 million. 

  .. image:: /static/3/working_with_attributes/images/12.png
     :align: center

13. Now we will export the selected features as a new layer. Right-click the ``ne_10m_populated_places_simple`` layer and go to :menuselection:`Export --> Save Selected Features As...`

  .. image:: /static/3/working_with_attributes/images/13.png
     :align: center

14. You may choose any format of your liking as the :guilabel:`Format`. For this exercise, we will choose ``GeoJSON``. GeoJSON is a text-based format that is used widely in web mapping. Click the :guilabel:`...` button next to :guilabel:`File name` and enter ``populated_capitals.geojson`` as the output file.

  .. image:: /static/3/working_with_attributes/images/14.png
     :align: center

15. The input data has many columns. You are able to choose only a subset of the original columns for export. Expand the :guilabel:`Select fields to export and their export options` section. Click :guilabel:`Deselect All` and check the ``name`` and ``pop_max`` columns. Click :guilabel:`OK`.

  .. image:: /static/3/working_with_attributes/images/15.png
     :align: center

16. A new layer ``populated_capitals`` will be loaded in QGIS. You can un-check the ``ne_10m_populated_places_simple`` layer to hide it and view the points from the newly exported layer. 

  .. image:: /static/3/working_with_attributes/images/16.png
     :align: center
