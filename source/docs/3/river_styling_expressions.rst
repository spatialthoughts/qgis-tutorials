Styling a River Network with Expressions (QGIS3)
================================================
*Contributed by:* `Steven Kim <https://geographyclub.github.io/>`_

In the previous tutorial `Creating a Block World Map (QGIS3) <https://www.qgistutorials.com/en/docs/3/block_world_styling.html>`_ We created a block world out of a hex grid with elevation values. In this tutorial, we will us eexpression to create visualization for South American rivers.

Overview of the task
--------------------

We will use expressions to visualize South American rivers in a popular style, with line widths representing upland area and colors representing basin id from HydroRIVERS.

Get the data
------------

The HydroRIVERS dataset provides seamless global coverage of consistently sized river reaches, supported by geometric information that allows for basic analysis of river network topology such as stream connectivity and distances. The data is a subset of the comprehensive HydroATLAS package from WWF.

1. `HydroRIVERS <https://www.hydrosheds.org/products/hydrorivers>`_ has links for global and regional extracts of HydroRIVERS in shapefile and geodatabase formats. Look for the links at the bottom of the page. 

  .. image:: /static/3/river_styling_expressions/images/data1.png
    :align: center
	
2. Click on the download link for the ``South America`` shapefile. You will see the ``HydroRIVERS_v10_sa_shp.zip`` file downloaded which is used for this tutorial.

  .. image:: /static/3/river_styling_expressions/images/data1.png
    :align: center

For convenience, you may directly download a copy of the above layer from below:
`ne_50m_admin_0_countries.zip <https://www.qgistutorials.com/downloads/HydroRIVERS_v10_sa_shp.zip>`_

Procedure
---------

1. Locate the ``HydroRIVERS_v10_sa_shp.zip`` file in the QGIS Browser and expand it. Select the ``HydroRIVERS_v10_sa_shp/HydroRIVERS_v10_sa.shp`` file and drag it to the canvas.

  .. image:: /static/3/river_styling_expressions/images/1.png
    :align: center

2. A new layer ``HydroRIVERS_v10_sa`` will now be loaded in QGIS and you should see a map of rivers in South America. Click on :guilabel:`Open Layer Styling Panel`.

  .. image:: /static/3/river_styling_expressions/images/2.png
    :align: center

3. Switch from :guilabel:`Single Symbol` to :guilabel:`Rule-based`.

  .. image:: /static/3/river_styling_expressions/images/3.png
    :align: center
	
4. Double-click on the default rule to enter the :guilabel:`Edit Rule` dialog.

  .. image:: /static/3/river_styling_expressions/images/4.png
    :align: center

5. To filter using an expression, click the Filter :guilabel:`ε`. 

  .. image:: /static/3/river_styling_expressions/images/5.png
    :align: center

.. note:: 

You have entered the :guilabel:`Expression Builder`. If this is your first time working with expressions, see the official docs at `QGIS User Guide <https://docs.qgis.org/testing/en/docs/user_manual/expressions/expression.html>`_ 

6. Select the :guilabel:`Expression` box on the left to input the expression as follows and click :guilabel:`OK`.

  .. code-block:: none

     "upland_skm" >= 100
	 
  .. image:: /static/3/river_styling_expressions/images/6.png
    :align: center
  
7. You have filtered for rivers with an upland area equal to or greater than 100 square km. You can adjust this threshold based on the scale of your study.

  .. image:: /static/3/river_styling_expressions/images/7.png
    :align: center

8. Now that we have used an expression to filter features, let us use an expression to color each river segment based on a field ``MAIN_RIV``. Scroll-down to the :guilabel:`Symbol` options in the  styling panel and select :guilabel:`Simple Line` to bring up styling options such as color, stroke width and more. Click on :guilabel:`Data define override` button for the :guilabel:`Color` and select :guilabel:`Edit...` on the menu.

  .. image:: /static/3/river_styling_expressions/images/8.png
    :align: center
	
9. This brings up the :guilabel:`Expression Builder` dialog for color. Enter the following expression:

  .. code-block:: none

     ramp_color('Spectral',scale_linear("MAIN_RIV",60000001,61620963,0,1))

  .. image:: /static/3/river_styling_expressions/images/9.png
    :align: center
 
This expression combines the functions ``ramp_color()`` and ``scale_linear()`` to select colors from the spectral color ramp using the range of MAIN_RIV id values.

10. Click :guilabel:`OK` to exit the dialog. At the :guilabel:`Edit Rule` dialog, click on :guilabel:`Data define override` button for :guilabel:`Stroke width` and select :guilabel:`Edit...` on the menu. Enter the following expression. The expression scales line width based on the upland area of each river segment, with a minimum of 0.01 mm to a maximum of 0.1 mm for rivers with an upland area equal to or larger than 10,000 sqkm.

  .. code-block:: none

     scale_linear("UPLAND_SKM",100,10000,0.01,0.1)
	 
  .. image:: /static/3/river_styling_expressions/images/10.png
    :align: center

11. Click :guilabel:`OK` to exit the dialog and click :guilabel:`Apply`.

  .. image:: /static/3/river_styling_expressions/images/11.png
    :align: center

12. Let's change the background color to black to contrast with our color choices. Navigate to :menuselection:`Project > Properties > General`. Click on the down arrow and select black. Click :guilabel:`OK` and you should see the completed river network of South America.

  .. image:: /static/3/river_styling_expressions/images/12.png
    :align: center
