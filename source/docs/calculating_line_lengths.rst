Calculating Line Lengths and Statistics
=======================================
QGIS has built-in functions to calculate various properties based on the
geometry of the feature - such as length, area, perimeter etc. This tutorial
will show how to use **Field Calculator** to add a column with a value
representing length of each feature.

Overview of the task
--------------------

We will use a polyline shapefile of railroads in North America and try to
determine the total length of railroads in the United States.


Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Using expressions to select features.
- Re-projecting a layer from Geographic to Projected Coordinate Reference
  System(CRS).
- Viewing statistics for values of an attribute in a layer.

Get the data
------------

`Natural Earth
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/railroads/>`_
has a public domain railroads dataset. Download the `North America supplement
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_railroads_north_america.zip>`_
zip file from the portal.

For convenience, you may directly download a copy of the dataset from the link
below:

`ne_10m_railroads_north_america..zip
<../../downloads/ne_10m_railroads_north_america.zip>`_

Data Source [NATURALEARTH]_

Procedure
---------

1. Go to :menuselection:`Layer --> Add Vector Layer`.

.. image:: /static/calculating_line_lengths/images/1.png
   :align: center

2. Browse to the ``ne_10m_railroads_north_america.zip`` file and click
   :guilabel:`OK`.

.. image:: /static/calculating_line_lengths/images/2.png
   :align: center

3. In the :guilabel:`Select layers to add...` dialog, choose
   ``ne_10m_railroads_north_america.shp`` layer.

.. image:: /static/calculating_line_lengths/images/3.png
   :align: center

4. Once the layer is loaded, you will notice that the layer has lines
   representing railroads for all of North America. Since we want to calculate
   line lengths only for United States railroads, we need to select the lines
   that fall in the United States. Right-click on the layer and select
   :guilabel:`Open Attribute Table`.

.. image:: /static/calculating_line_lengths/images/4.png
   :align: center

5. The layer has an attribute called :guilabel:`sov_a3`. This is the 3 letter
   code for the country that a particular feature falls in. We can use the
   value of this attribute to select features that are in USA.

.. image:: /static/calculating_line_lengths/images/5.png
   :align: center

6. In the :guilabel:`Attribute Table` window, click the :guilabel:`Select
   features using an expression` button.

.. image:: /static/calculating_line_lengths/images/6.png
   :align: center

7. A new dialog :guilabel:`Select By Expression` will open. Find the attribute
   :guilabel:`sov_a3` under :guilabel:`Fields and Values` in the
   :guilabel:`Functions list` section. Double-click on it to add it to the
   :guilabel:`Expression` text area. Complete the expression by typing in
   ``"sov_a3" = 'USA'``. Click :guilabel:`Select` followed by
   :guilabel:`Close`.

.. image:: /static/calculating_line_lengths/images/7.png
   :align: center

8. Back in the main QGIS window, you will see that all lines that fall in USA
   are selected and appear in yellow.

.. image:: /static/calculating_line_lengths/images/8.png
   :align: center

9. Now let's save our selection to a new shapefile. Right-click on the
   ``ne_10m_railroads_north_america`` layer and select :guilabel:`Save
   Selection As...`.

.. image:: /static/calculating_line_lengths/images/9.png
   :align: center

10. Click :guilabel:`Browse` and name the output file as ``usa_railroads.shp``.
    We also want to change the CRS of the layer. Click on :guilabel:`Browse`
    next to :guilabel:`CRS`.

.. note::

   The built-in functions that use a feature's geometry for calculation use the
   units of the layer's CRS. Geographic Coordinate Reference System(CRS) such
   as *EPSG:4326* have **degrees** as units - so the length of the feature
   would be in **degrees** and area in **square degrees** - which is
   meaningless. You need to use a Projected Coordinate Reference System with
   units of **meters** or **feet** to perform such calculations.

.. image:: /static/calculating_line_lengths/images/10.png
   :align: center

11. Since we are interested in calculating length, let’s select an equidistance
    projection. Type :guilabel:`north america equ` in the :guilabel:`Filter`
    search box. In the results pane below, select
    :guilabel:`North_America_Equidistant_Conic EPSG:102010` as the CRS. Click
    :guilabel:`OK`.

.. image:: /static/calculating_line_lengths/images/11.png
   :align: center

12. In the :guilabel:`Save vector layer as...` dialog, check the :guilabel:`Add
    saved file to map` and click :guilabel:`OK`.

.. image:: /static/calculating_line_lengths/images/12.png
   :align: center

13. Once the export process finishes, you will see a new layer ``usa_railroads``
    loaded in QGIS. You can uncheck the box next to
    ``ne_10m_railroads_north_america`` layer to turn it off as we don't need it
    anymore.

.. image:: /static/calculating_line_lengths/images/13.png
   :align: center

14. Right-click on the ``usa_railroads`` layer and select
    :guilabel:`Open Attribute Table`.

.. image:: /static/calculating_line_lengths/images/14.png
   :align: center

15. Now it is time to add a column with length of each feature. Put the layer
    in editing mode by clicking on the :guilabel:`Toggle editing` button. Once
    in editing mode, click the :guilabel:`Open field calculator` button.

.. image:: /static/calculating_line_lengths/images/15.png
   :align: center

16. In the :guilabel:`Field Calculator`, check :guilabel:`Create a new
    field`. Enter **length_km** as the :guilabel:`Output field name`. Choose
    **Decimal number (real)** as the :guilabel:`Output field type`. Change the
    output :guilabel:`Precision` to **2**. In the :guilabel:`Function list`
    panel, find the :guilabel:`$length` under :guilabel:`Geometry`.
    Double-click it to add it to the :guilabel:`Expression`. Complete the
    expression as ``$length / 1000`` because our layer CRS is in **meters**
    unit and we want the output in **km**. Click :guilabel:`OK`.

.. image:: /static/calculating_line_lengths/images/16.png
   :align: center

17. Back in :guilabel:`Attribute Table`, you will see a new column
    :guilabel:`length_km` appear. Click the :guilabel:`Toggle editing` button
    to save the changes to the attribute table.

.. image:: /static/calculating_line_lengths/images/17.png
   :align: center

18. Now that we have length of each individual line in our layer, we can easily
    add it all up and find the **Total** length. Go to :menuselection:`Vector
    --> Analysis Tools --> Basic Statistics`.

.. image:: /static/calculating_line_lengths/images/18.png
   :align: center

19. Select the :guilabel:`Input Vector layer` as ``usa_railroads``. Choose the
    :guilabel:`Target field` as ``length_km`` and click :guilabel:`OK`. You
    will see various statistics appear. The :guilabel:`Sum` value is the total
    length of the railroads that we are looking to find.

.. note::

   This answer will vary slightly if a different projection is chosen.In
   practice, line lengths for roads and other linear features are measured on
   the ground and provided as attributes to the dataset. This method works in
   absence of such attribute and as an approximation of actual line lengths.

.. image:: /static/calculating_line_lengths/images/19.png
   :align: center
