Performing Spatial Joins
========================

.. only:: html

   [ Download PDF `A4 <../pdf/performing_spatial_joins_a4.pdf>`_ `Letter
   <../pdf/performing_spatial_joins_letter.pdf>`_ ]

Spatial Join is a classic GIS problem - transferring attributes from one layer
to another based on their spatial relationship. In QGIS, this functionality is
available through the **Join Attributes by Location** tool.

Overview of the task
--------------------

We will use 2 layers - A shapefile of burough boundaries of New York city and
another shapefile of nursing home locations in New York city. We will use
spatial join technique to find the total nursing home capacity for each of the
buroughs.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Deleting columns from the attribute table of a layer.

Get the data
------------

`NYC Open Data Portal <https://data.cityofnewyork.us/>`_ is an excellent source
of free data for New York city.

1. Download the `Borough Boundaries
   <https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm>`_
   zip file using the Export option on the portal.

.. image:: /static/performing_spatial_joins/images/1.png
   :align: center

2. Download the `Nursing Homes
   <https://data.cityofnewyork.us/Health/Nursing-Homes/9tqc-rnkr>`_  zip file
   using the Export option on the portal.

.. image:: /static/performing_spatial_joins/images/2.png
   :align: center


For convenience, you may directly download a copy of the datasets from the
links below:

`nybb_12c.zip <../../downloads/nybb_12c.zip>`_

`OEM_NursingHomes_001.zip <../../downloads/OEM_NursingHomes_001.zip>`_


Procedure
---------

3. Go to :menuselection:`Layer --> Add Vector Layer`. Browse to the downloaded
   zip file ``nybb_12c.zip`` and select :guilabel:`Open`.

.. image:: /static/performing_spatial_joins/images/3.png
   :align: center

4. Select the layer ``nybb.shp`` and click :guilabel:`OK`.

.. image:: /static/performing_spatial_joins/images/4.png
   :align: center

5. Repeat the steps 3 and 4 for the another file ``OEM_NursingHomes_001.zip``
   and load the ``OEM_NursingHomes_001.shp`` layer. Once both the layers are
   loaded, right-click on the ``OEM_NursingHomes_001`` layer and select
   :guilabel:`Open Attribute Table`.

.. image:: /static/performing_spatial_joins/images/5.png
   :align: center

6. Examine the attributes available for each feature. Since our task is to
   calculate the total nursing home capacity for each borough, we can use the
   attribute **Capacity** which can join to the boundaries layer.

.. image:: /static/performing_spatial_joins/images/6.png
   :align: center

7. Go to :menuselection:`Vector --> Data Mangement Tools --> Join attributes by
   location`.

.. image:: /static/performing_spatial_joins/images/7.png
   :align: center

8. The :guilabel:`Target vector layer` is the one we want to add the attributes
   to. In our case, this will be the boroughs boundary ``nybb`` layer. The
   :guilabel:`Join vector layer` will be the nursing homes
   ``OEM_NursingHomes_001`` layer. As we want to sum the capacity of nursing
   homes, select :guilabel:`Take summary of intersecting features` and choose
   :guilabel:`Sum`. Name the output file as ``nyc_borough_join.shp``. In the
   :guilabel:`Output table` select :guilabel:`Keep all records``.

.. image:: /static/performing_spatial_joins/images/8.png
   :align: center

9. Once the process finishes, select :guilabel:`Yes` when asked if you want to
   add the layer to TOC. The new layer ``nyc_borough_join`` would have the
   features from ``nybb`` layer along with spatially joined attributes from
   ``OEM_NursingHomes_001`` layer. Right-click on the layer and select
   :guilabel:`Open Attribute Table`.

.. image:: /static/performing_spatial_joins/images/9.png
   :align: center

10. You will see a column **SUMCapacit** in the attribute table. This is the
    sum of the **Capacity** attribute for the nursing homes that fall within
    each borough feature.

.. image:: /static/performing_spatial_joins/images/10.png
   :align: center

11. This is the answer we are looking for. But there are extra columns that we
    do not need in our output. Let's clean up our output. Click on the
    :guilabel:`Toggle editing` button and then the :guilabel:`Delete column`
    button.

.. image:: /static/performing_spatial_joins/images/11.png
   :align: center

12. Press :kbd:`Control-A` to select all columns in the :guilabel:`Delete
    Attributes` dialog. Next hold the :kbd:`Control` key and de-select the
    columns you want to keep. Click :guilabel:`OK`.

.. image:: /static/performing_spatial_joins/images/12.png
   :align: center

13. In the attribute table, click :guilabel:`Toggle editing` button again to
    save the changes.

.. image:: /static/performing_spatial_joins/images/13.png
   :align: center

14. Back in the QGIS Canvas, use the :guilabel:`Identify` tool to verify that
    the output file has the desired attributes for each burough feature.

.. image:: /static/performing_spatial_joins/images/14.png
   :align: center
