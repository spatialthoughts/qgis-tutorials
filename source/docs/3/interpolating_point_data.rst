Interpolating Point Data (QGIS3)
================================

Interpolation is a commonly used GIS technique to create a continuous surface from discrete points. A lot of real-world phenomena are continuous - elevations, soils, temperatures, etc. If we wanted to model these surfaces for analysis, it is impossible to take measurements throughout the surface. Hence, the field measurements are taken at various points along the surface and the intermediate values are inferred by a process called ‘interpolation’. In QGIS, interpolation is achieved using the built-in Interpolation tools from the Processing toolbox.

Overview of the task
--------------------

We will take field depth measurements for Lake Arlington in Texas and create
an elevation relief map and contours from these measurements.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Creating contours from point data.
- Masking no-data values from a raster layer. 
- Adding labels to a vector layer.

Get the data
------------

Texas Water Development Board provides the `shapefiles for completed lake
surveys
<http://www.twdb.texas.gov/surfacewater/surveys/completed/list/index.asp>`_.

Download the `2007-12 survey shapefiles for Lake Arlington
<http://www.twdb.texas.gov/hydro_survey/Arlington/2007-12/Shapefiles.zip>`_.

For convenience, you can directly download the sample data used in this
tutorial from link below.

`Shapefiles.zip <http://www.qgistutorials.com/downloads/Shapefiles.zip>`_

Data Sources: [TWDB]_

Procedure
---------

1. Open QGIS, in :guilabel:`Browser` locate and drag the ``Arlington_Soundings_2007_stpl83.shp`` the layer to canvas. 

  .. image:: /static/3/interpolating_point_data/images/1.png
     :align: center


2. A :guilabel:`Select Transformation of Arlington_Soundings_2007_stpl83` dialog box will appear, leave the select to default and click :guilabel:`OK`. 

  .. image:: /static/3/interpolating_point_data/images/2.png
     :align: center

3. The layer will be added, now locate and drag the ``Boundary2004_550_stpl83.shp`` the layer to canvas.

  .. image:: /static/3/interpolating_point_data/images/3.png
     :align: center


4. The layer will be added to the canvas, now turn off the layer to visualize the ``Arlington_Soundings_2007_stpl83`` .

  .. image:: /static/3/interpolating_point_data/images/4.png
     :align: center  


5. Click the :guilabel:`Zoom In` icon and select a small area on the screen. As
   you zoom closer, you will see the points. Each point represents a reading
   taken by a *Depth Sounder* at the location recorded by a *DGPS* equipment.

  .. image:: /static/3/interpolating_point_data/images/5.png
     :align: center


6. Select the :guilabel:`Identify` tool and click on a point. You will see the
   :guilabel:`Identify Results` panel show up on the left with the attribute
   value of the point. In this case, the ``ELEVATION`` attribute contains the
   depth of the lake at the location. As our task is to create a depth profile
   and elevation contours, we will use these values as input for the
   interpolation.

  .. image:: /static/3/interpolating_point_data/images/6.png
     :align: center

7. From :guilabel:`Browser` locate and drag the ``Islands_2004_550_stpl83.shp`` the layer to canvas.

  .. image:: /static/3/interpolating_point_data/images/7.png
     :align: center


8. The layer will be added to the canvas, this layer has the information about the islands in the region which should have a constant elevation (should not be interpolated).

  .. image:: /static/3/interpolating_point_data/images/8.png
     :align: center

9. From the :guilabel:`Processing Toolbox`, search and locate the :menuselection:`Interpolation --> TIN Interpolation` tool. Double-click to launch it.

.. note::

   Interpolation results can vary significantly based on the method and
   parameters you choose. QGIS interpolation supports *Triangulated Irregular
   Network (TIN)* and *Inverse Distance Weighting (IDW)* methods for interpolation.
   The TIN method is commonly used for elevation data whereas the IDW method is used
   for interpolating other types of data such as mineral concentrations,
   populations etc. See the `Spatial Analysis
   <https://docs.qgis.org/testing/en/docs/gentle_gis_introduction/spatial_analysis_interpolation.html>`_
   module of the QGIS documentation for more details.

.. image:: /static/3/interpolating_point_data/images/9.png
  :align: center


10. In the :guilabel:`TIN Interpolation` dialog box, select ``Arlington_Soundings_2007_stpl83`` as the :guilabel:`Vector layer`, ``Elevation`` as the :guilabel:`Interpolation attribute`. Then click on the :guilabel:`Add` icon. 

  .. image:: /static/3/interpolating_point_data/images/10.png
     :align: center

11. Now, select ``Islands_2004_550_stpl83`` as the :guilabel:`Vector layer`, ``Elevation`` as the :guilabel:`Interpolation attribute`. Then click on the :guilabel:`Add` icon. Now change the :guilabel:`Type` of the layer as ``Break lines``. 

  .. image:: /static/3/interpolating_point_data/images/11.png
     :align: center

.. note:: 

  A Break line allows us to model sudden interruptions in the elevation while modeling surface layers. Specifying the layer type to be *Break lines* will tell the interpolation algorithm to use a constant elevation for the islands instead of interpolated values from the points.

12. In :guilabel:`Extent` click on the ``...`` and select the ``Boundary2004_550_stpl83``. 

  .. image:: /static/3/interpolating_point_data/images/12.png
     :align: center

13. In :guilabel:`Output raster size`, set the :guilabel:`Pixel size X` and :guilabel:`Pixel size Y` to ``5``. Then click on the ``...`` under :guilabel:`Interpolated` to save the layer as ``elevation_tin.tif``. Click :guilabel:`Run`. 

  .. image:: /static/3/interpolating_point_data/images/13.png
     :align: center


14. Now a new layer ``elevation_tin`` will be added to the canvas. 

  .. image:: /static/3/interpolating_point_data/images/14.png
     :align: center  


15. From the :guilabel:`Processing Toolbox`, search and locate the :menuselection:`GDAL --> Raster extraction --> Clip raster by mask layer` tool. Double-click to launch it.

  .. image:: /static/3/interpolating_point_data/images/15.png
     :align: center


16. In :guilabel:`Clip raster by mask layer` dialog box, select ``elevation_tin`` as the :guilabel:`Input layer`, ``Boundary2004_550_stpl83`` as the :guilabel:`Mask layer`. Then click on the ``...`` under :guilabel:`Clipped (mask)` to save the layer as ``elevation_tin_clipped.tif``. Click :guilabel:`Run`. 

  .. image:: /static/3/interpolating_point_data/images/16.png
     :align: center

17. Now a new layer ``elevation_tin_clipped`` will be added to the canvas. Click on the :guilabel:`Open the Layer styling panel` icon. 

  .. image:: /static/3/interpolating_point_data/images/17.png
     :align: center


18. Set the :guilabel:`Symbology` to ``Singleband pseudocolor``, click on the arrow in :guilabel:`Color ramp` and select ``Invert color ramp``, enter ``0`` in :guilabel:`Label precision`. Click :guilabel:`Classify`.  

  .. image:: /static/3/interpolating_point_data/images/18.png
     :align: center

19. From the :guilabel:`Processing Toolbox`, search and locate the :menuselection:`GDAL --> Raster extraction --> Contour` tool. Double-click to launch it.

  .. image:: /static/3/interpolating_point_data/images/19.png
     :align: center


20. In the :guilabel:`Contour` dialog box, select ``elevation_tin_clipped`` as the :guilabel:`Input layer`, enter ``5.000`` in the :guilabel:`Interval between contour line`. Then click on the ``...`` under :guilabel:`Contours` to save the layer as ``contour.gpkg``. Click :guilabel:`Run`.

  .. image:: /static/3/interpolating_point_data/images/20.png
     :align: center

.. note::
 
 	The interval is specified in the unit of the CRS of the layer. Our source data is in the *EPSG:2276 NAD83 / Texas North Central (ftUS)* - so the interval for coutours will be interpreted as ``5 feet``.
	
 
21.  Now a new layer ``contour`` will be added to the canvas. Click on the :guilabel:`Open the Layer styling panel` icon. Switch to :guilabel:`Labels`. 

  .. image:: /static/3/interpolating_point_data/images/21.png
     :align: center


22. Select ``Single label``, in :guilabel:`Value` choose ``ELEV``. 

  .. image:: /static/3/interpolating_point_data/images/22.png
     :align: center

23. Now switch to :guilabel:`Placement` and change it the :guilabel:`Mode` as ``Curved``. 

  .. image:: /static/3/interpolating_point_data/images/23.png
     :align: center


  


