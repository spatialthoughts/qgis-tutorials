Basic Filtering and Styling with Expressions (QGIS3)
====================================================
*Contributed by:* `Steven Kim <https://geographyclub.github.io/>`_

Expressions offer a powerful way to manipulate attribute values, geometries and variables to dynamically modify map features on the fly. This tutorial is an introduction to some common expressions and how they are used in map making. 
    
Overview of the task
--------------------

We will use expressions to filter features by attribute from a Natural Earth country layer, and then style them to create a map of South East Asia with each country styled in a shade of green.

  .. image:: /static/3/vector_styling_expressions/images/output.png
    :align: center
	

Get the data
------------

1. `Natural Earth <https://www.naturalearthdata.com/downloads/>`_ has the admin shapefiles for countries. On the downloads page look for :guilabel:`Cultural` option under the ``Medium scale data``. 

  .. image:: /static/3/vector_styling_expressions/images/data1.png
    :align: center
	
2. Download the ``Admin 0 - Countries`` shapefile. You will see the ``ne_50m_admin_0_countries.zip`` file downloaded which is used for this tutorial.

  .. image:: /static/3/vector_styling_expressions/images/data2.png
    :align: center


For convenience, you may directly download a copy of the above layer from below:

`ne_50m_admin_0_countries.zip <http://www.qgistutorials.com/downloads/ne_50m_admin_0_countries.zip>`_

Data Source [NATURALEARTH]_

Procedure
---------

1. Locate the ``Natural_Earth_quick_start.zip`` file in the QGIS Browser and expand it. Select the ``ne_50m_admin_0_countries.shp`` file and drag it to the canvas.

  .. image:: /static/3/vector_styling_expressions/images/1.png
    :align: center

2. A new layer ``ne_50m_admin_0_countries`` will now be loaded in QGIS and you should see a map of the world. Click on :guilabel:`Open Layer Styling Panel`.

  .. image:: /static/3/vector_styling_expressions/images/2.png
    :align: center
    
3. Switch from :guilabel:`Single Symbol` to :guilabel:`Rule-based`.

  .. image:: /static/3/vector_styling_expressions/images/3.png
    :align: center
    
4. Double-click on the default rule to enter the :guilabel:`Edit Rule` dialog.

  .. image:: /static/3/vector_styling_expressions/images/4.png
    :align: center

5. To filter using an expression, click the Filter :guilabel:`ε`. 

  .. image:: /static/3/vector_styling_expressions/images/5.png
    :align: center

6. You have entered the :guilabel:`Expression Builder`. This dialog provides the main interface to write expressions and can be accessed in many ways. It contains an input box on the left, a list of functions in the middle and a help box on the right.

  .. image:: /static/3/vector_styling_expressions/images/6.png
    :align: center

7. From the list in the middle, expand :menuselection:`Fields and Values` to explore the fields found in the ``ne_50m_admin_0_countries`` layer. 

  .. image:: /static/3/vector_styling_expressions/images/7.png
    :align: center

8. Click to select ``SUBREGION`` field and click :guilabel:`All Unique` on the right panel to view all unique subregion values. 

  .. image:: /static/3/vector_styling_expressions/images/8.png
    :align: center

9. After exploring, select the :guilabel:`Expression` box on the left to input the expression as follows and click :guilabel:`OK`.

  .. code-block:: none

     "SUBREGION" = 'South-Eastern Asia'

  .. image:: /static/3/vector_styling_expressions/images/9.png
    :align: center
  
10. You should see SE Asia. Pan and zoom to the center to the region in your map window.

  .. image:: /static/3/vector_styling_expressions/images/10.png
    :align: center

11. Now that we have used an expression to filter features, let us use an expression to color each country based on a field ``MAPCOLOR7``. Scroll-down to the :guilabel:`Symbol` options in the  styling panel and select :guilabel:`Simple Fill` to bring up styling options such as fill color, line color and more. Click on :guilabel:`Data define override` button for the :guilabel:`Fill color` and select :guilabel:`Edit...` on the menu.

  .. image:: /static/3/vector_styling_expressions/images/11.png
    :align: center
	
12. This brings up the :guilabel:`Expression Builder` dialog for Fill color. Enter the following expression:

  .. code-block:: none

     set_color_part(ramp_color('Greens',scale_linear("MAPCOLOR7",1,7,0.2,1)),'alpha',100)
 
This expression contains multiple functions: ``set_color_part()`` to set alpha or transparency, ``ramp_color()`` to apply a color ramp and ``scale_linear()`` to use the field MAPCOLOR7 in setting the color for each country. In this example, we are using greens, setting the alpha at 100 out of 255 and scaling MAPCOLOR7 from it's original range of 1-7 to 0.2-1, which will look nice with ramp_color.

  .. image:: /static/3/vector_styling_expressions/images/12.png
    :align: center
	
.. note:: 

	The Natural Earth data layer has several fields named MAPCOLOR7, MAPCOLOR8 etc. These fields contain numeric values that are used to color the map so that adjacent polygons aren’t the same color. There are versions with 7,8,9 or 13 colors.

13. Click :guilabel:`OK` to exit the dialog. At the :guilabel:`Edit Rule` dialog, change :guilabel:`Stroke Style` to :menuselection:`No Line`. You should see the countries in green now. Click :guilabel:`Apply`.

  .. image:: /static/3/vector_styling_expressions/images/13.png
    :align: center

14. We have created a beautifully styled map by filtering and applying a color ramp to the data layer by just using expressions.

  .. image:: /static/3/vector_styling_expressions/images/14.png
    :align: center
