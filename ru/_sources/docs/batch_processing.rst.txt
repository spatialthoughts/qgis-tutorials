Batch Processing using Processing Framework (QGIS2)
===================================================
.. warning:: 

   A new version of this tutorial is available at :doc:`3/batch_processing`

QGIS 2.0 introduced a new concept called **Processing Framework**. Previously
known as **Sextante**, the Processing Framework provides an environment within
QGIS to run native and third-party algorithms for processing data. It contains
a nice batch processing interface that allows one to execute an algorithm on
several layers easily. Batch processing is a useful tool that can save manual
effort and help you automate repetitive tasks.

Overview of the task
--------------------

We will take several global vector layers and clip them to the extent of Africa
in a single batch command.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Dissolve (merge) polygons from a layer that have the same attribute.

Get the data
------------

`Natural Earth <http://naturalearthdata.com>`_ has several global vector
layers. Download the following layers

- `Admin 0 - Countries
  <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_
- `Railroads
  <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_railroads.zip>`_
- `Ports
  <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_ports.zip>`_
- `Airports
  <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_airports.zip>`_

Once downloaded, unzip and extract all the shapefiles in a single folder.

Data Source: [NATURALEARTH]_

Procedure
---------

1. Go to :menuselection:`Layer --> Add Vector Layer`.

.. image:: /static/batch_processing/images/1.png
   :align: center

2. Browse to the downloaded Admin 0 Countries shapefile
   ``ne_10m_admin_0_countries.shp`` and click :guilabel:`Open`.

.. image:: /static/batch_processing/images/2.png
   :align: center

3. As our task is to clip the global layers to the boundary of Africa, we need
   to first prepare a layer containg a polygon for the entire continent. The
   countries layer has an attribute called **CONTINENT**. We can use a
   geoprocessing concept called *Dissolve* to merge all countries that have the
   same continent value and merge them to a single polygon.

.. image:: /static/batch_processing/images/3.png
   :align: center

4. Open the :guilabel:`Dissolve` tool from :menuselection:`Vector -->
   Geoprocessing Tools --> Dissolve`.

.. image:: /static/batch_processing/images/4.png
   :align: center

5. Select ``ne_10m_admin_0_countries`` as the :guilabel:`Input vector layer`.
   The :guilabel:`Dissolve field` would be ``CONTINENT``. Name the output file
   as ``continents.shp`` and  check the box next to :guilabel:`Add result to
   convas`.

.. note::

   If you want to merge **ALL** polygons regardless of their attributes, you
   can select :guilabel:`-- Dissolve All --` as the :guilabel:`Dissolve field`.
   This will combine all polygons in the layer and give you a single aggregate
   polygon.

.. image:: /static/batch_processing/images/5.png
   :align: center

6. The dissolve processing may take a while. Once the process finishes, you
   will see the new ``continent`` layer added to QGIS. Use the
   :guilabel:`Select Single Feature` tool from the toolbar and click on Africa
   to select the polygon representing the continent.

.. image:: /static/batch_processing/images/6.png
   :align: center

7. Right-click the ``continents`` layer and select :guilabel:`Save Selection
   As...`.

.. image:: /static/batch_processing/images/7.png
   :align: center

8. Name the output file as ``africa.shp``. Since we are only interested in the
   shape of the continent and not any attributes, you may check the
   :guilabel:`Skip attribute creation`. Make sure the :guilabel:`Add saved file
   to map` box is checked and click :guilabel:`OK`.

.. image:: /static/batch_processing/images/8.png
   :align: center

9. Now you will have the ``africa`` layer loaded in QGIS containing a single
   polygon for the entire continent. Now, it's time to start our batch clip
   process. Open :menuselection:`Processing --> Toolbox`.

.. image:: /static/batch_processing/images/9.png
   :align: center

10. Browse all available algorithms and find the :guilabel:`Clip` tool from
    :menuselection:`QGIS geoalgorithms --> Vector overlay tools --> Clip`. You
    may also use the :guilabel:`Search` box to easily find the algorithm as
    well.

.. image:: /static/batch_processing/images/10.png
   :align: center

11. Right-click the :guilabel:`Clip` algorithm and select :guilabel:`Execure as
    batch process`.

.. image:: /static/batch_processing/images/11.png
   :align: center

12. In the :guilabel:`Batch Processing` dialog, the first tab is
    :guilabel:`Parameters` where we define out inputs. Click the
    :guilabel:`...` next to the first row in the :guilabel:`Input layer` column.

.. image:: /static/batch_processing/images/12.png
   :align: center

13. Browse to the directory containing the global transportation layers that
    you had downloaded. Hold the :kbd:`Ctrl` key and select all the layers that
    you want to clip. You may also use :kbd:`Shift` or :kbd:`Ctrl-A` to make
    multiple selection. Click :guilabel:`Open`.

.. image:: /static/batch_processing/images/13.png
   :align: center

14. You will notice that the :guilabel:`Input layer` columns will be
    auto-populated with all layers you had selected. You may use :guilabel:`Add
    row` button to add more rows and define more inputs. Next, we need to
    select the layer containing the boundary to clip our input layers. Click the
    :guilabel:`...` button for the first row and add the ``africa.shp``
    :guilabel:`Clip layer`. Since the clip layer is the same for all our inputs,
    you can double-click the column header :guilabel:`Clip layer` and the same
    layer will be auto-filled for all the rows. Next, we need to define our
    outputs.  Click the :guilabel:`...` buton next to the first row in the
    :guilabel:`Clipped` column.

.. image:: /static/batch_processing/images/14.png
   :align: center

15. Browse the the directory where you want your output layers. Type the
    filename as ``clipped_`` and click :guilabel:`Save`.

.. image:: /static/batch_processing/images/15.png
   :align: center

16. You will see a new :guilabel:`Autofill settings` dialog pop up. Select
    :guilabel:`Fill with parameter values` as the :guilabel:`Autofill mode`.
    Select :guilabel:`Parameter to use` as :guilabel:`Input layer`. This
    setting will add the input file name to the output along with the specified
    ``output_`` filename. This is important to ensure all the output files have
    unique names and they do not overwrite each other.

.. image:: /static/batch_processing/images/16.png
   :align: center

17. Now we are ready to start the batch procesing. Click :guilabel:`Run`.

.. image:: /static/batch_processing/images/17.png
   :align: center

18. The clip algorithm will run for each of the inputs and create output files
    are we have specified. Once the batch process finishes, you will see the
    layers added to QGIS canvas. As you will notice, all the global layers are
    properly clipped to the continent boundary that we had specified.

.. image:: /static/batch_processing/images/18.png
   :align: center
