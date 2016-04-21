Find Neighbor Polygons in a Layer
=================================
There are some use cases where you want to find all neighboring polygons of
each of the polygons in a layer. With a little python script, we can accomplish
this and much more in QGIS. Here is an example script you can use to find all
polygons that share boundary with each of the polygons in a layer and also add
their names to the attribute table. As an added bonus, the script also sums up
an attribute of your choice from all the neighboring polygons.

Overview of the task
--------------------

To demonstrate how the script works, we will use a layer of country polygons
and find countries that share the border. We also want to compute the total
population of the country’s neighbors.

Get the data
------------

We will use the `Admin 0 - Countries
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/>`_
dataset from Natural Earth.

Download the `Admin 0 - countries shapefile.
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_.

Data Source [NATURALEARTH]_

Get the script
--------------

Download the :download:`neighbors.py script </static/find_neighbor_polygons/script/neighbors.py>`
and save it to your disk.

Procedure
---------

1. Load the ``ne_10m_admin_0_countries`` layer by going to
   :menuselection:`Layer --> Add Vector Layer`.

.. image:: /static/find_neighbor_polygons/images/1.png
   :align: center

2. The script uses 2 fields to perform the action. A name field and a field
   that you want to sum up. Use the :guilabel:`Identify` tool to click on any
   feature and examine the attributes. In this case the name field is **NAME** and we want
   to sum up the population estimates from **POP_EST** field.

.. image:: /static/find_neighbor_polygons/images/2.png
   :align: center

3. Go to :menuselection:`Plugins --> Python Console`.

.. image:: /static/find_neighbor_polygons/images/3.png
   :align: center

4. In the :guilabel:`Python Console` window, click the :guilabel:`Show Editor`
   button.

.. image:: /static/find_neighbor_polygons/images/4.png
   :align: center

5. In the :guilabel:`Editor` panel, click the :guilabel:`Open file` button and
   browse to downloaded ``neighbors.py`` script and click :guilabel:`Open`.

.. image:: /static/find_neighbor_polygons/images/5.png
   :align: center

6. Once the script is loaded, you may want to change the ``_NAME_FIELD`` and
   ``_SUM_FIELD`` values to match the attributes from your own layer. If you
   are working with the ``ne_10m_admin_0_countries`` layer, you can leave those
   as they are. Click the :guilabel:`Save` button in the :guilabel:`Editor`
   panel if you made any changes. Now click the :guilabel:`Run script` button
   to execute the script.

.. image:: /static/find_neighbor_polygons/images/6.png
   :align: center

7. Once the script finishes, right-click the ``ne_10m_admin_0_countries`` layer
   and select :guilabel:`Open Attribute Table`.

.. image:: /static/find_neighbor_polygons/images/7.png
   :align: center

8. You will notice 2 new attributes called ``NEIGHBORS`` and ``SUM``. These
   were added by the script.

.. image:: /static/find_neighbor_polygons/images/8.png
   :align: center

Below is the complete script for reference. You may modify it to suit your
needs.

.. literalinclude:: /static/find_neighbor_polygons/script/neighbors.py

