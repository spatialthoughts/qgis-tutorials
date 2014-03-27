Counting Number of Vertices in a Layer
======================================
.. only:: html

   [ Download PDF `A4 <../pdf/counting_vertices_a4.pdf>`_ `Letter
   <../pdf/counting_vertices_letter.pdf>`_ ]

QGIS doesn’t have a built-in function to calculate number of vertices for each
feature in a layer. But a very handy plugin called **Vertices Counter** fills
this gap and adds a few handy features as well.

Procedure
---------

1. Find and install the **Vertices Counter** plugin. See :doc:`using_plugins`
   for details on installing plugins in QGIS.

.. image:: /static/counting_vertices/images/1.png
   :align: center

2. Load any polygon or line layer in QGIS. Go to :menuselection:`Vector -->
   Vertices Counter --> Vertices Counter`.

.. image:: /static/counting_vertices/images/2.png
   :align: center

3. By default, the active layer will be selected under the :guilabel:`Layer
   Selection`. You may select any other loaded layers or open layer directly
   from disk as well. The plugin has an option called :guilabel:`Create new
   column` which can add an number of vertices as an attribute for each
   feature. This is handy for a lot of use cases, so we can select that option.
   Now click on the :guilabel:`Count Vertices` button and the
   :guilabel:`Results` section will be populated with vertex count for each
   feature. You can even see the :guilabel:`Total Vertices` displayed on the
   side.

.. image:: /static/counting_vertices/images/3.png
   :align: center

4. Back in the main QGIS window, let's verify if a new column was added to our
   layer. Right-click the layer and select :guilabel:`Open Attribute Table`.

.. image:: /static/counting_vertices/images/4.png
   :align: center

5. As you will notice, a column named *Vertices* will be added at the end with
   values representing the vertex count for each feature. This column can come
   in handy if you want to do a query such as *Select all features with Vertices
   > X*.

.. image:: /static/counting_vertices/images/5.png
   :align: center
