Automating Complex Workflows using Processing Modeler (QGIS3)
=============================================================

GIS Workflows typically involve many steps - with each step generating intermediate output that is used by the next step. If you change the input data or want to tweak a parameter, you will need to run through the entire process again manually.  Fortunately, QGIS has a graphical modeler built-in that can help you define your workflow and run it with a single invocation. You can also run these workflows as a batch over a large number of inputs.


Overview of the task
--------------------

We will take a point layer of maritime piracy incidents and create a processing model to create a density map by aggregating them over a global hexagonal grid.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Using a global equal area projection and setting the Project CRS.
- Applying a Graduated symbology to a polygon layer.

Get the data
------------
National Geospatial-Intelligence Agency's `Maritime Safety Information portal <https://msi.nga.mil/NGAPortal/MSI.portal>`_ provides a shapefile of all incidencts of maritine piracy in the form on `Anti-shipping Activity Messages <https://msi.nga.mil/NGAPortal/MSI.portal?_nfpb=true&_pageLabel=msi_portal_page_65>`_. Download the `Arc Shape file <https://msi.nga.mil/MSISiteContent/StaticFiles/Files/ASAM_shp.zip>`_ version of the database.

`Natural Earth <http://naturalearthdata.com>`_ has several global vector
layers. Download the `10m Physical Vectors - Land <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_land.zip>`_ containing Land polygons.

For convenience, you may directly download a copy of the above layers from below:

`ASAM_shp.zip <http://www.qgistutorials.com/downloads/ASAM_shp.zip>`_

`ne_10m_land.zip <http://www.qgistutorials.com/downloads/ne_10m_land.zip>`_

Data Source: [NGA_MSI]_ [NATURALEARTH]_

Procedure
---------

1. In the QGIS Browser Panel, locate the directory where you saved your downloaded data. Expand the ``ne_10m_land.zip`` and select the ``ne_10m_land.shp`` layer. Drag the layer to the canvas. Next, locate the ``ASAM_shp.zip`` file. Expand it and select the ``ASAM 11 OCT 18.shp`` layer and drag it on to the canvas.
	
.. image:: /static/3/processing_graphical_modeler/images/1.png
   :align: center
	 
2. The ``ASAM 11 OCT 18.shp`` layer does not have projection information associated with it, so you will be prompted to select a CRS in the :guilabel:`Coordinate Reference System Selector`. Here, the points are in the Latitude and Longitude coordinates, so select the ``WGS 84`` CRS and click :guilabel:`OK`.

.. image:: /static/3/processing_graphical_modeler/images/2.png
   :align: center

3. Once the layer is loaded, you can see the individual points representing incidents of piracy locations. Let's start building our Processing model to process these layers. Go to :menuselection:`Processing --> Graphical Modeler...`.
	 
.. image:: /static/3/processing_graphical_modeler/images/3.png
   :align: center

4. In the :guilabel:`Processing Modeler` dialog, locate the :guilabel:`Model Properties` panel. Enter ``piracy hexbin`` as the :guilabel:`Name` of the model and ``projects`` as the :guilabel:`Groups`. Click the :guilabel:`Save` button.

.. image:: /static/3/processing_graphical_modeler/images/4.png
   :align: center
	 
5. Save the model as ``piracy_hexbin``.

.. image:: /static/3/processing_graphical_modeler/images/5.png
   :align: center
	 
6. Now we can start building a graphical model of our processing pipeline.  The :guilabel:`Processing modeler` dialog contains a left-hand panel and a main canvas. On he left-hand panel, locate the :guilabel:`Inputs` panel listing various types of input data types. Scroll down and select the :guilabel:`+ Vector Layer` input. Drag it to the canvas.

.. image:: /static/3/processing_graphical_modeler/images/6.png
   :align: center

7. Enter ``Input Points`` as the :guilabel:`Parameter name` and ``Point`` as the :guilabel:`Geometry type`. This input represents the piracy incidents point layer.

.. image:: /static/3/processing_graphical_modeler/images/7.png
   :align: center

8. Next, drag another :guilabel:`+ Vector Layer` input to the canvas. Enter ``Base Layer`` as the :guilabel:`Parameter name` and ``Polygon`` as the :guilabel:`Geometry type`. This input represents the natural earth global land layer.

.. image:: /static/3/processing_graphical_modeler/images/8.png
   :align: center

9. As we are generating a global hexagonal grid, we can ask the user to supply us the grid size as an input instead of hard-coding it as part of our model. This way, the user can quickly experiment with different grid sizes without changing the model at all. select a :guilabel:`+ Number` input and drag it to the canvas. Enter ``Grid Size`` as the :guilabel:`Parameter name` and click :guilabel:`OK`. 

.. image:: /static/3/processing_graphical_modeler/images/9.png
   :align: center

10. Now that we have our user inputs defined, we are ready to add processing steps. All of the processing algorithms are available to you under the :guilabel:`Algorithms` tab. The first step in our pipeline will be to reproject the base layer to the Project CRS.  Search for ``Reproject layer`` algorithm and drag it to the canvas.

.. note:: This  necessity of this reprojection step will become clear shortly. The grid generation algorithm requires us to specify the extent of the grid in the unit of the Project CRS. We can supply this reprojected layer to compute this extent.

.. image:: /static/3/processing_graphical_modeler/images/10.png
   :align: center

11. In the :guilabel:`Reproject layer` dialog, select ``Base Layer`` as the :guilabel:`Input layer`. Check the :guilabel:`Use project CRS` as the :guilabel:`Target CRS`. Click :guilabel:`OK`.

.. image:: /static/3/processing_graphical_modeler/images/11.png
   :align: center

12. In the :guilabel:`Processing Modeler` canvas, you will notice a connection appear between the :guilabel:`+ Base Layer` input and the :guilabel:`Reproject layer` algorithm. This connection indicates the flow of our processing pipeline. Next step is to create a hexagonal grid. Search for the ``Create grid`` algorithm and drag it to the canvas.

.. image:: /static/3/processing_graphical_modeler/images/12.png
   :align: center

13. In the :guilabel:`Generate grid` dialog, choose ``Hexagon (polygon)`` as the :guilabel:`Grid type`. Select ``Extent of 'Reprojected' from algorithm 'Reproject Layer'`` as the :guilabel:`Grid extent`. Click the :guilabel:`123` button under the :guilabel:`Horizonal spacing` label and choose :guilabel:`Model input`.

.. image:: /static/3/processing_graphical_modeler/images/13.png
   :align: center

14. Select ``Grid Size`` input for :guilabel:`Using model input`. Repeat the same process for :guilabel:`Vertical Spacing`. Click :guilabel:`OK`.

.. image:: /static/3/processing_graphical_modeler/images/14.png
   :align: center

15. At this point, we have a global hexagonal grid. The grid spans the full extent of the base layer, including land areas and places where there are no points. Let's filter out those grid polygons where there are no input points. Search for ``Extract by location`` algorithm and drag it to the canvas.

.. image:: /static/3/processing_graphical_modeler/images/15.png
   :align: center

16. For :guilabel:`Extract features from`, select ``'Grid' from algorithm 'Generate Grid'``, :guilabel:`Where the features (geometric predicate)` as ``Intersect`` and :guilabel:`By compating to the features from` as ``Input points``. Click :guilabel:`OK`.

.. image:: /static/3/processing_graphical_modeler/images/16.png
   :align: center

17. Now we have only those grid polygons that contain some input points. To aggregate these points, we will use ``Count points in polygon`` algorithm. Search and drag it to the canvas.
	
.. image:: /static/3/processing_graphical_modeler/images/17.png
   :align: center

18. Select ``'Extracted (location)' from algorithm 'Extract by location'`` as the value for :guilabel:`Polygons`. The :guilabel:`Points` layer would be ``Input Points``. At the bottom, name the :guilabel:`Count` output layer as ``Aggregated``. Click :guilabel:`OK`.

.. image:: /static/3/processing_graphical_modeler/images/18.png
   :align: center

19. The model is now complete. Click the :guilabel:`Save` button.

.. image:: /static/3/processing_graphical_modeler/images/19.png
   :align: center

20. Switch to the main QGIS window. You can find your newly created model in the :guilabel:`Processing Toolbox` under :menuselection:`Models --> projects --> piracy_hexbin`. Now it is time to run and test the model. As our goal is to aggregate the input points over hexagonal grids, it is important that the grids are generated using a equal-area projection. This will ensure that regardless of the location of the grid, it will cover exactly the same area. Our model doesn't explicitely ask for a CRS, but uses whatever CRS is set as the **Project CRS**. Let's choose a global equal area projection as the Project CRS. Go to :menuselection:`Project --> Properties`. 

.. image:: /static/3/processing_graphical_modeler/images/20.png
   :align: center

21. In the :guilabel:`Project Properties` dialog, switch to the :guilabel:`CRS` tab. We will use a global **Mollweide** projection for this exercise which is a equal area projection. Search for ``Mollweide`` in the :guilabel:`Filter` box and select ``World_Mollweide EPSG:54009`` as the CRS. Click :guilabel:`OK`.

.. image:: /static/3/processing_graphical_modeler/images/21.png
   :align: center

22. You will see the layers getting reprojected on-the-fly to the selected CRS. Locate the ``piracy_hexbin`` model in the :guilabel:`Processing Toolbox` and double-click it.

.. image:: /static/3/processing_graphical_modeler/images/22.png
   :align: center

23. Our :guilabel:`Base Layer`` in the ``ne_10m_land`` and the :guilabel:`Input Points`` layer is ``ASAM 11 OCT 18``. The :guilabel:`Grid Size`` needs to be specified in the units of the selected CRS. The World_Mollweide CRS unit is meters, so we specify ``100000`` m (100 Kms) as the :guilabel:`Grid Size``. Click :guilabel:`Run` to start the processing pipeline. Once the process finishes, click :guilabel:`Close`.

.. image:: /static/3/processing_graphical_modeler/images/23.png
   :align: center

24. You will see a new layer ``Aggregated`` loaded as the result of the model. As you explore, you will notice the layer contains an attribute called *NUMPOINTS* containing the number of piracy incidents points contained within that grid feature. Let's style this layer to display this information better. Right-click the ``Aggregated`` layer and select :guilabel:`Properties`.

.. image:: /static/3/processing_graphical_modeler/images/24.png
   :align: center

25. Switch to the :guilabel:`Symbology` tab. Select ``Graduated`` symbology and ``NUMPOINTS`` as the :guilabel:`Column`. Click ``Change..`` next to :guilabel:`Symbol` label.

.. image:: /static/3/processing_graphical_modeler/images/25.png
   :align: center

26. Select :guilabel:`Simple fill` symbol and check the :guilabel:`Transparent Stroke` button under :guilabel:`Stroke color`. This is to make the hexagon edges transparent.

.. image:: /static/3/processing_graphical_modeler/images/26.png
   :align: center

27. Click the dropdown next to :guilabel:`Color ramp` and select the ``Viridis`` ramp. Click the dropdown again and select :guilabel:`Invert Color Ramp` to reverse the order of color.

.. image:: /static/3/processing_graphical_modeler/images/27.png
   :align: center

28. The Graduated symbology will divide the values in the selected column into distinct classes and assign a different color to each of the classes. Select ``Natural Breaks (Jenks)`` as the :guilabel:`Mode` and click :guilabel:`Classify` and click :guilabel:`OK`.

.. note:: see :doc:`../basic_vector_styling` for a detailed explanation of different modes.

.. image:: /static/3/processing_graphical_modeler/images/28.png
   :align: center

29. Back in the main QGIS window, turn off the ``ASAM 11 OCT 18`` layer. You will see a nice visualization of piracy hotspots across the globe.

.. image:: /static/3/processing_graphical_modeler/images/29.png
   :align: center


Now that you have encoded the full data pipeline in the model, it is easy to reproduce your results. A model also allows you to experiment quickly without manually repeating each intermediate step every time. If your inputs change over time, say an updated database of piracy is released after a few months, you can run your model on that input to generate a similar visualization without having to remember each step. 