Styling Contours in 3D (QGIS3)
==============================
*Contributed by:* `Steven Kim <https://geographyclub.github.io/>`_

In the previous tutorial, :doc:`river_styling_expressions` we used expressions to filter and style a river network. In this tutorial, we will work with a contour dataset and style it using expressions to give it a 3D effect.

Overview of the task
--------------------

We will use a geometry generator symbol layer to dynamically apply an offset to the contours and then apply a color ramp to create an appearance of a 3d map.

  .. image:: /static/3/contour_3d_styling/images/output.png
    :align: center
    
Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to obtain minimum and maximum values for an attribute of a vector layer.


Get the data
------------

`The National Map <https://www.usgs.gov/programs/national-geospatial-program/national-map>`_ is a collaborative effort among the U.S. Geological Survey (USGS) and other partners to improve and deliver topographic information for the Nation. We will download a contour dataset from The National Map downloader.


1. Visit the `TNM Download v2 <https://apps.nationalmap.gov/downloader/>`_. Browse to your region of interest. For this tutorial, we will be downloading the contours for a region around Austin, Texas.

  .. image:: /static/3/contour_3d_styling/images/data1.png
    :align: center

2. On the downloader, look for the ``Elevation Products(3DEP)`` dataset and check the box to see all subcategories. Select only the ``Contojurs (1:24,000-scale)`` category. Under :guilabel:`File Formats`, select ``GeoPackage``. 

  .. image:: /static/3/contour_3d_styling/images/data2.png
    :align: center

3. Click the blue button :guilabel:`Search Products` to see the list of matching files.

  .. image:: /static/3/contour_3d_styling/images/data3.png
    :align: center

4. In the results, you will find the ``USGS NED 1/3 arc-second Contours for Austin E, Texas`` file. Click on :guilable:`Download Link(ZIP)` to download the zipped GeoPackage file ```ELEV_Austin_E_TX_1X1_GPKG.zip```.

  .. image:: /static/3/contour_3d_styling/images/data4.png
    :align: center

You can directly download the zip file at `ELEV_Austin_E_TX_1X1_GPKG.zip <https://prd-tnm.s3.amazonaws.com/StagedProducts/Contours/GPKG/ELEV_Austin_E_TX_1X1_GPKG.zip>`_ 

Data Source [USGS]_

.. note::

    You can also generate contours from any DEM layer and use it instead of the contours used here. Refer to our tutorial :doc:`working_with_terrain` for step-by-step instructions.
    
Procedure
---------

1. Unzip the `ELEV_Austin_E_TX_1X1_GPKG.zip` file on your computer. Locate the resulting `ELEV_Austin_E_TX_1X1_GPKG.gpkg` file in the :guilabel:`QGIS Browser` and expand it. Select the `Elev_Contour` layer and drag it to the canvas.

  .. image:: /static/3/contour_3d_styling/images/1.png
    :align: center

2. A new layer `Elev_Contour` will now be loaded and you should see the contour lines.

  .. image:: /static/3/contour_3d_styling/images/2.png
    :align: center

3. Right-click the `Elev_Contour` layer and choose :guilabel:`Open Attribute Table`. You will notice that the field ``contourinterval`` contains the elevation value for each contour line. This field name is important and is used in the expressions in subsequent steps. Before we apply the style, we need to find the minimum and maximum value of the elevation in the layer. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/contour_3d_styling/images/3.png
    :align: center

4. Search and locate the :menuselection:`Vector analysis --> Basic statistics for fields` algorithm. Double-click to open it.

  .. image:: /static/3/contour_3d_styling/images/4.png
    :align: center

5. Select `Elev_Contour` as the :guilabel:`Input layer` and `contourelevation` as the :guilabel:`Field to calculate statistics on`. Click :guilabel:`Run`.

  .. image:: /static/3/contour_3d_styling/images/5.png
    :align: center

6. Once the processing finishes, the :guilabel:`Log` panel will display the results. Note the values for **MIN** and **MAX** elevation. Close the window.

  .. image:: /static/3/contour_3d_styling/images/6.png
    :align: center

7. We are now ready to style the contours. Before continuing, we must first add a color ramp suitable for coloring elevation. If you already have added the `wiki-1.02` color ramp for our previous tutorial :doc:`block_world_styling`, you can skip to Step 12. Click on :guilabel:`Settings` in the menubar and select :guilabel:`Style Manager`. 

  .. image:: /static/3/contour_3d_styling/images/7.png
    :align: center

8. Click on the plus sign :guilabel:`Add item` at the bottom and select :menuselection:`Catalog: cpt-city...`.

  .. image:: /static/3/contour_3d_styling/images/8.png
    :align: center

9. Scroll down the color ramps until you find :guilabel:`wiki-1.02`. There may be several with the same name, just click on one and click :guilabel:`OK`.

  .. image:: /static/3/contour_3d_styling/images/9.png
    :align: center

10. At the 'Save New Color Ramp' window, enter the value ``wiki-1.02`` as the :guilabel:`Name`.

  .. image:: /static/3/contour_3d_styling/images/10.png
    :align: center

11. Click :guilabel:`Save` to exit the window, then click :guilabel:`Close` to exit Style Manager. Now the wiki-1.02 color ramp is available to use in your projects going forward.

  .. image:: /static/3/contour_3d_styling/images/11.png
    :align: center

12. Now we can style the contours. Select the `Elev_Contour` layer and click on the  :guilabel:`Open Layer Styling Panel`. Select :guilabel:`Simple Line` to access its properties.

  .. image:: /static/3/contour_3d_styling/images/12.png
    :align: center

13. Switch `Symbol layer type` from :guilabel:`Simple Line` to :guilabel:`Geometry Generator`. This symbol layer allows us to dynamically change the geometry of features in the layer using an expression.

  .. image:: /static/3/contour_3d_styling/images/13.png
    :align: center

14. In the input box, enter this expression to translate each contour line in the y-axis by its elevation value. The expression takes the elevation value in the `contourelevation` column and applies an offset from 0 to 0.2 degrees depending on its elevation. The values **120** and **650** are the minimum and maximum values of elevation obtained in step 6.

  .. code-block:: none
 
     translate($geometry,0,scale_linear("contourelevation",120,650,0,0.2))
  
  .. image:: /static/3/contour_3d_styling/images/14.png
    :align: center

15. Below `Geometry Generator` in the symbol window, select the :guilabel:`Simple Line` layer to access it's properties. Click on :guilabel:`Data define override` button for :guilabel:`Color` and select the :guilabel:`Edit` menu.

  .. image:: /static/3/contour_3d_styling/images/15.png
    :align: center

15. This brings up the :guilabel:`Expression Builder` dialog for the color of the line. Enter this expression to color contour lines by `contourelevation` value from the *wiki-1.02* color ramp. Click :guilabel:`OK`. We need to map the elevation values to the range expected by the color ramp (0 to 1). Instead of `scale_linear` function used earlier, we use the `scale_polynomial` function to scale the values in a non-linear way.

  .. code-block:: none

    ramp_color('wiki-1.02',scale_polynomial("contourelevation",120,650,0,1,0.5))
  
  .. image:: /static/3/contour_3d_styling/images/16.png
    :align: center

17. You should see a 3D representation of the contours colored by elevation. Experiment with the coloring and scaling expressions to reveal different artistic representations of the landscape.

  .. image:: /static/3/contour_3d_styling/images/17.png
    :align: center
