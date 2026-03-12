Creating Heatmaps (QGIS3)
=========================
Heatmaps are one of the best visualization tools for dense point data. Heatmap is an interpolation technique that useful in determining density of input features. Heatmaps are most commonly used to visualize crime data, traffic incidents, housing density etc. QGIS has a heatmap renderer that can be used to style a point layer and a Processing algorithm **Heatmap (Kernel Density Estimation)** that can be used to create an raster from a point layer.

Overview of the task
--------------------

We will work with a dataset of crime locations in Surrey, UK and create a heatmap to visualize regions with high density of crime.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Using virtual fields and conditional expressions

Get the data
------------
`data.police.uk <https://data.police.uk>`_ provides street-level crime, outcome, and stop and search data in simple CSV format. Download the data for `Surrey Police <https://data.police.uk/data/>`_ and unzip the downloaded archive to extract the CSV file. 

For convenience, you may directly download a copy of the dataset from the link below:
 
`2019-02-surrey-street.csv <https://www.qgistutorials.com/downloads/2019-02-surrey-street.csv>`_

Data Source [POLICEUK]_

Procedure
---------

1. We will first load a basemap layer from *OpenStreetMap* and then import the CSV data. In the :guilabel:`Browser` tab, scroll down and locate the :guilabel:`XYZ Tiles` section. 

  .. image:: /static/3/creating_heatmaps/images/1.png
     :align: center

2. Expand it to see the :guilabel:`OpenStreetMap` tile layer. Drag and drop it to the main canvas. Next we will load the CSV file. Click the :guilabel:`Open Data Source Manager` button. 

  .. image:: /static/3/creating_heatmaps/images/2.png
     :align: center

3. Switch to the :guilabel:`Delimited Text` tab. Here we will import the crime data which comes in a CSV format text file. Click the :guilabel:`...` button next to :guilabel:`File name` and browse to the downloaded ``2019-02-surrey-street.csv`` file. The :guilabel:`X field` and :guilabel:`Y field` in the :guilabel:`Geometry Definition` section to be auto-populated with the ``Longitude`` and ``Latitude`` columns. The :guilabel:`Geometry CRS` should be left to default ``EPSG:4326 - WGS 84`` definition. Make sure the data looks correct in the :guilabel:`Sample data` panel and click :guilabel:`Add`, followed by :guilabel:`Close`.

  .. image:: /static/3/creating_heatmaps/images/3.png
     :align: center

4. You will see 2 layers - ``OpenStreetMap`` and ``2019-02-surrey-street`` loaded in the QGIS :guilabel:`Layers` panel. Right-click the ``2019-02-surrey-street`` layer and select :guilabel:`Zoom to Layer`.

  .. image:: /static/3/creating_heatmaps/images/4.png
     :align: center

5. You will see the crime incident points layer overlaid on the OpenStreetMap basemap. Zoom and Pan to explore the data. The data is quite dense and it is hard to get an idea of where there is a high concentration of crime. This is where a heatmap visualization will come in handy. Select the ``2019-02-surrey-street`` layer and  click the :guilabel:`Open the Layer Styling panel` button.

  .. image:: /static/3/creating_heatmaps/images/5.png
     :align: center

6. Select ``Heatmap`` as the renderer in the dropbox menu. The :guilabel:`Layer Styling panel` is interactive and you can see the effect of your changes reflected in the canvas immediately. The layer will now be displayed in the default grayscale color-ramp. 

  .. image:: /static/3/creating_heatmaps/images/6.png
     :align: center

7. A heatmap is typically renderer using a yellow--to-red or white--to-red color ramp where higher concentration of points result in more **heat**. Click the :guilabel:`Color ramp` dropdown menu and select ``Reds`` color-ramp. 

  .. image:: /static/3/creating_heatmaps/images/7.png
     :align: center

8. Next you need to choose a :guilabel:`Radius`. This parameter determines the circular neighborhood around each point where that point will have an influence. This value will largely depend on the type of your input data. For our data, let's assume a crime incident will have an influence upto 5 Kilometers from the location. Notice that the current project CRS is set to ``EPSG: 3857`` in the bottom-right corner. This CRS has a unit of meter, so we should specify ``5000`` meters as the radius. Another parameter that is hidden from this menu is the :guilabel:`Kernel shape`. This is a function that determines how the influence of a point should be spread out over the given radius. The Heatmap renderer uses the ``Quartic`` function for this calculation. There are other types of kernels such as ``Triangular``, ``Uniform``, ``Triweight`` and ``Epanechnikov`` that can be specified in when using a different heatmap creation method described later in this tutorial. See `this post <https://www.geodose.com/2017/11/qgis-heatmap-using-kernel-density.html>`_ for a good explanation and guidance for select the right radius and kernel shape. 

  .. image:: /static/3/creating_heatmaps/images/8.png
     :align: center

9. The heatmap visualization is ready. We can adjust the :guilabel:`Opacity` of the heatmap in the :guilabel:`Layer Rendering` section at the bottom. Set the opacity to ``60 %`` so you can see the basemap along with the heatmap.

  .. image:: /static/3/creating_heatmaps/images/9.png
     :align: center

10. For many types of analysis, just considering density of points is good enough. But sometimes, you may want to give different importance to each point. A more violent crime should have more influence on the output heatmap than a robbery. Similarly, sometimes a point may represent multiple observations at a single location which needs to be accounted for in the analysis. To do this, you are able to supply an optional numeric **weight** field which specifies a value for each point. Let's add a weight field and use it to improve the heatmap. Right-click the ``2019-02-surrey-street`` layer and select :guilabel:`Open Attribute Table`. 

  .. image:: /static/3/creating_heatmaps/images/10.png
     :align: center

11. You will see a text field called ``Crime type`` in the input data that describes the type of crime. We can use these to categorize the different types of crimes and assign a higher weight to more violent crimes.

  .. image:: /static/3/creating_heatmaps/images/11.png
     :align: center

12. Click the :guilabel:`Open field calculator`.

  .. image:: /static/3/creating_heatmaps/images/12.png
     :align: center

13. We will now input a formula that uses the ``Crime type`` and determines the weight value. QGIS has a handy way to add such computed fields using *Virtual Fields*. The virtual field is saved in the QGIS project and doesn't modify the source data. It is also dynamically computed and can be used anywhere in QGIS just like any other attribute value. Enter ``weight`` as the :guilabel:`Output field name` and set the :guilabel:`Output field type` to ``Whole number (integer)``. Enter the following expression in the :guilabel:`Expression editor`. Here we are using **CASE** statement to assign different values based on different conditions. Click :guilabel:`OK`.

  .. code-block:: none

    CASE
    WHEN "Crime type" LIKE 'Violence%' THEN 10
    WHEN "Crime type" LIKE 'Criminal%' THEN 5
    ELSE 1
    END

  .. image:: /static/3/creating_heatmaps/images/13.png
     :align: center
  
14. A new attribute will be added for each feature with the appropriate weight value.

  .. image:: /static/3/creating_heatmaps/images/14.png
     :align: center

15. Back in the :guilabel:`Layer Styling` panel, click the drop-down menu for :guilabel:`Weight points by` and select the newly added ``weight`` field. 

  .. image:: /static/3/creating_heatmaps/images/15.png
     :align: center

16. You will see the heatmap rendering change to account for the weight parameter. Close the :guilabel:`Layer Styling` panel.

  .. image:: /static/3/creating_heatmaps/images/16.png
     :align: center

17. If you need the heatmap visualization to be saved as a permanent raster layer or want to customize the heatmap with advanced options such as different kernels or dynamic radius, you can use the **Heatmap (Kernel Density Estimation)** from the Processing Toolbox. We will now use this algorithm. Go to :menuselection:`Processing --> Toolbox`. 

  .. image:: /static/3/creating_heatmaps/images/17.png
     :align: center

18. Before we can create the heatmap, we need to re-project the source data to a projected CRS. As distance plays an important role in computation of heatmap, it is not correct to use a geographic CRS. Search and find the :menuselection:`Vector general --> Reproject layer` algorithm.

  .. image:: /static/3/creating_heatmaps/images/18.png
     :align: center

19. In the :guilabel:`Reproject layer` dialog, click the :guilabel:`Select CRS` button for :guilabel:`Target CRS`. Search for and select the ``EPSG:27700 OSGB 1936 / British National Grid`` CRS. This projected CRS is a good choice for data in the UK. Click :guilabel:`Run`.

  .. image:: /static/3/creating_heatmaps/images/19.png
     :align: center

20. A new layer named ``Reprojected`` will be added to the :guilabel:`Layers` panel. Un-check the box next to the old ``2019-02-surrey-street`` layer to hide it.

  .. image:: /static/3/creating_heatmaps/images/20.png
     :align: center

21. Search and find the :menuselection:`Interpolation --> Heatmap (Kernel Density Estimation)` algorithm.

  .. image:: /static/3/creating_heatmaps/images/21.png
     :align: center

22. In the :guilabel:`Heatmap (Kernel Density Estimation)` dialog, we will use the same paramters as earlier. Select :guilabel:`Radius` as ``5000`` meters and :guilabel:`Weight from field` as ``weight``. Set the :guilabel:`Pixel size X` and :guilabel:`Pixel size Y` to ``50`` meters. Let the :guilabel:`Kernel shape` to the default value of ``Quartic``. Click :guilabel:`Run`.

  .. image:: /static/3/creating_heatmaps/images/22.png
     :align: center

.. note::

  The :guilabel:`Radius from field` parameter allows you to specify a dynamic search radius for each point. This can be used along with :guilabel:`Weight from field` to have fine grainer control on how each point's influence is spread.
  
23. Once the processing finishes, a new raster layer named ``OUTPUT`` will be loaded. The default visualization is ugly since it uses the ``Singleband gray`` renderer. Click the :guilabel:`Open the Layer Styling panel` button.

  .. image:: /static/3/creating_heatmaps/images/23.png
     :align: center

24. Change the render to ``Singleband Pseudocolor`` and select the ``Reds`` color ramp. The layer now looks like the heatmap visualization that we had created earlier. 

  .. image:: /static/3/creating_heatmaps/images/24.png
     :align: center

.. note::

   Notice that ``OUTPUT`` layer in the :guilabel:`Layers` panel has a legend but the ``2019-02-surrey-street`` layer does not. A common problem with using a heatmap layer created with the Heatmap renderer is the lack of a legend. Say you want use the heatmap in the :guilabel:`Print Layout` and add a legend. A raster heatmap created with the Heatmap processing algorithm method makes this possible.