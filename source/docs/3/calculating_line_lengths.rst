Calculating Line Lengths and Statistics (QGIS3)
===============================================

QGIS has built-in functions and algorithms to calculate various properties based on the geometry of the feature - such as length, area, perimeter etc. This tutorial will show how to use the **Add geometry attributess** tool to add a column with a value representing length of each feature.

Overview of the task
--------------------

Given a polyline layer of railroads in North America, we will determine the total length of railroads in the United States.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Using expressions to filter features.
- Using the :guilabel:`Statistics` panel to compute and view statistics on columns.

Get the data
------------
`Natural Earth <http://www.naturalearthdata.com/downloads/10m-cultural-vectors/railroads/>`_ has a public domain railroads dataset. 

Download the `North America supplement <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_railroads_north_america.zip>`_ zip file from the portal. 

For convenience, you may directly download a copy of the dataset from the link below:

`ne_10m_railroads_north_america..zip <http://www.qgistutorials.com/downloads/ne_10m_railroads_north_america.zip>`_  

Data Source [NATURALEARTH]_

Procedure
---------

1. Locate the downloaded ``ne_10m_railroads_north_america.zip`` file in the :guilabel:`Browser` panel and expand it. Drag the ``ne_10m_railroads_north_america.shp`` file to the canvas.

  .. image:: /static/3/calculating_line_lengths/images/1.png
     :align: center
     
2. You will see a new layer ``ne_10m_railroads_north_america`` loaded in the :guilabel:`Layers` panel. You will see that the layer has lines representing railroads for all of North America. Now, let's calculate the lengths of each line feature. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/calculating_line_lengths/images/2.png
     :align: center
     
3. Search for and locate the :menuselection:`Vector geometry --> Add geometry attributes` algorithm. Double-click to launch it.

  .. image:: /static/3/calculating_line_lengths/images/3.png
     :align: center
     
4. In the :guilabel:`Add Geometry Attributes` dialog, select ``ne_10m_railroads_north_america`` as the :guilabel:`Input layer`. The input layer's Coordinate Reference System (CRS) is *EPSG:4326 WGS84*. This is a *Geographic* CRS with Latitude and Longitude as coordinates, WGS84 as ellipsoid and degrees as units.  Because latitude and longitude don't have a standard length, you can’t measure distances or areas accurately using planar geometry functions. Fortunately, QGIS provides a better way to compute distances using ellipsoidal geometry, which is the most accurate method for layers spanning large areas such as this. Pick ``Ellipsoidal`` as the :guilabel:`Calculate using` option. Click :guilabel:`Run`. Once the process finishes, click :guilabel:`Close`.

  .. image:: /static/3/calculating_line_lengths/images/4.png
     :align: center

.. note::

  If your input layer is in a *Projected CRS*, you may choose ``Layer CRS`` option for calculation. Local or Regional projected coordinate systems are designed to minimize distortions over their region of interest, so are more accurate for such computation.

5. You will see a new layer ``Added geom info`` loaded in the :guilabel:`Layers` panel. This is a copy of the input layer with a new column added for distance. Right-click the ``Added geom info`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/calculating_line_lengths/images/5.png
     :align: center

.. note::

  The *Add Geometry Attribute* tool adds different set of attributes depending on whether the input layer is points, lines or polygons. See `QGIS documentation <https://docs.qgis.org/testing/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#add-geometry-attributes>`_ for more details.

6. In the :guilabel:`Attribute Table`, you will see a new column called **distance**. This contains the length of each line feature in *meters*. Also note that the **sov_a3** attribute which contains the contry code for each feature. Close the :guilabel:`Attribute Table` window.

  .. image:: /static/3/calculating_line_lengths/images/6.png
     :align: center

7. Now that we have lengths of individual railroad line segments, we can add them up to find the total length of railroads. But as the problem statement demands we need total railroad length in the United States, we must use only the segments contained within USA. We can use the country code value in the **sov_a3** column to filter the layer. Right-click the ``Added geom info`` layer and select :guilabel:`Filter`.

  .. image:: /static/3/calculating_line_lengths/images/7.png
     :align: center

8. In the :guilabel:`Query Builder` dialog, enter the following expression and click :guilabel:`OK`.

  .. code-block:: none

    "sov_a3" = 'USA'

  .. image:: /static/3/calculating_line_lengths/images/8.png
     :align: center
  
9. You will see a :guilabel:`Filter` icon appear next to the ``Added geom info`` layer in the :guilabel:`Layers` panel indicating that a filter is applied to the layer. You can also visually confirm that the layer now contains line segments only for United States. Now we are ready to calculate the sum. Click the :guilabel:`Show statistical summary` button on the :guilabel:`Attributes Toolbar`.

  .. image:: /static/3/calculating_line_lengths/images/9.png
     :align: center

10. A new :guilabel:`Statistics` panel will open. Select ``Added geom info`` layer and ``length`` column. 

  .. image:: /static/3/calculating_line_lengths/images/10.png
     :align: center

11. You will see various statistics displayed in the panel. The unit of the statistics is the same as the units of ``length`` column -  **meters**. Let's change the computation to use **kilometers** instead. Click the :guilabel:`Expression` icon next to the fields drop-down menu in the :guilabel:`Statistics` panel.

  .. image:: /static/3/calculating_line_lengths/images/11.png
     :align: center

12. Enter the following expression in the :guilabel:`Expression Dialog` that converts the length to kilometers.

  .. code-block:: none

    length / 1000

  .. image:: /static/3/calculating_line_lengths/images/12.png
     :align: center

13. The :guilabel:`Sum` value displayed is the total length of railroads in USA.

  .. image:: /static/3/calculating_line_lengths/images/13.png
     :align: center
