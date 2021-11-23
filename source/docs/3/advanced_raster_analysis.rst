Advanced Raster Analysis (QGIS3)
===============================

In the previous tutorial :doc:`raster_styling_and_analysis`, you learnt about performing raster algebra with *Raster Calculator*. This tutorial builds on these techniques and shows you how to use other raster analysis tools from the Processing Toolbox. You will learn how to process with Land Use Land Cover (LULC) rasters in QGIS to extract certain types of landcover classes and map changes.

Overview of the task
--------------------

We will use the South African National Land Cover dataset to identify and extract informal settlements in the City of Johannesburg, South Africa. We will also use a change assessment dataset to identify urban growth patterns in the city from 2014 to 2018.


Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to reproject raster data to another projection.
- How to load an excel file in QGIS.  
- How to adjust the transperancy of a raster layer in QGIS.

Get the data
------------

We will download the following datasets for this tutorial

1. *The South African National Land Cover 2018 dataset*: The new South African National Land-Cover 2018 dataset has been generated from 20 meter multi-seasonal Sentinel 2 satellite imagery and contains 73 landcover classes.
2. *The South African National Land Cover 2018 Change Assessments*: This dataset compares the change in 20 landcover classes from 2014 to 2018.
3. *COJ Boundary*: A boundary shapefile for the City of Johannesburg, South Africa.


The `Environmental Geographical Information Systems (E-GIS) <https://egis.environment.gov.za/>`_ provides access to environmental geospatial data for South Africa. We will download the South African National Land-Cover (SANLC) rasters from this portal.

1. Visit the `GIS Data Download <https://egis.environment.gov.za/gis_data_downloads>`_  page. Click :guilabel:`I agree` to accept the *Conditions of Use* and proceed. 

  .. image:: /static/3/advanced_raster_analysis/images/data1.png
    :align: center

2. You will need to create a free account to download the dataset. Click :guilabel:`I want to create an account` and follow the instructions to create an account.

  .. image:: /static/3/advanced_raster_analysis/images/data2.png
    :align: center

3. Once logged in, search for *South African National Land Cover (SANLC) 2018 Computer Automated Land Cover (CALC)*. This dataset is provided in 2 different projections. For this tutorial, we will downnload the `ALBERS` dataset. Click to it to download the `SA_NLC_2018_Albers_CALC_data.zip` file.

  .. image:: /static/3/advanced_raster_analysis/images/data3.png
    :align: center

4. Next, search for *New South African National Land Cover (SANLC) 2014 and 2018 Change Assessment Datasets Computer Automated Land Cover (CALC)* and click on the `SA_NLC_2014_2018_CLASS_CHANGE_CALC (DATASET AND REPORT)` to download the `SA_NLC_2014_2018_CLASS_CHANGE_ALBERS_CALC.tif.vat.zip` file.

  .. image:: /static/3/advanced_raster_analysis/images/data4.png
    :align: center

The `City of Johannesburg <https://www.joburg.org.za/>`_ publishes spatial datasets as part of the  `Spatial Development Framework 2040 (SDF) for Johannesburg  <https://www.joburg.org.za/documents_/Pages/Key%20Documents/policies/Development%20Planning%20%EF%BC%86%20Urban%20Management/Citywide%20Spatial%20Policies/Spatial-Development-Framework-2040.aspx>`_ data. We will download the boundary shapefile from this site.

1. Click the download link `http://bit.ly/joburg-sdf-16 <http://bit.ly/joburg-sdf-16>`_.

  .. image:: /static/3/advanced_raster_analysis/images/data5.png
    :align: center

2. Click on the ``SDF Shapefiles`` directory. 

  .. image:: /static/3/advanced_raster_analysis/images/data6.png
    :align: center

3. Download the ``SDF Shapefiles.zip`` file, and unzip it to a folder. 

  .. image:: /static/3/advanced_raster_analysis/images/data7.png
    :align: center
 
 
For your convenience, a clipped version of the required layers is available from the link below:

`SA_NLC_2018_ALBERS_CALC.tif  <https://www.qgistutorials.com/downloads/SA_NLC_2018_ALBERS_CALC.tif>`_

`SA_NLC_2014_2018_CLASS_CHANGE_ALBERS_CALC.tif <https://www.qgistutorials.com/downloads/SA_NLC_2014_2018_CLASS_CHANGE_ALBERS_CALC.tif>`_

`COJ_Boundary.zip  <https://www.qgistutorials.com/downloads/COJ_Boundary.zip>`_

Data Source: [SANLC]_ [COJ]_

Procedure
--------------

1. Browse to the downloaded and unzipped  folder in the browser. Expand it and drag and drop the ``SA_NLC_2018_ALBERS_CALC.tif`` in canvas.

  .. image:: /static/3/advanced_raster_analysis/images/01.png
    :align: center

2.  Once the layer is loaded, you can notice the CRS will be set as :guilabel:`Unknown CRS` on the bottom right. Double-click on it to open the :guilabel:`Project Properties - CRS` dialog box. 

  .. image:: /static/3/advanced_raster_analysis/images/02.png
    :align: center

3. We can see the viewport is focused on South Africa. This projection is a *lambert equal-area projection* defined for the country of South Africa. All dataset downloaded from `EGIS GIS Data Download <https://egis.environment.gov.za/gis_data_downloads>`_  comes in this projection. Click :guilabel:`OK`. 

  .. image:: /static/3/advanced_raster_analysis/images/03.png
    :align: center

4. Load other two layer ``SA_NLC_2014_2018_CLASS_CHANGE_ALBERS_CALC.tif`` and ``COJ_Boundary``, then go to :menuselection:`Processing --> Toolbox --> GDAL --> Raster extraction --> Clip raster by mask layer` tool. Double-click to open it.

  .. image:: /static/3/advanced_raster_analysis/images/04.png
    :align: center

5. In the :guilabel:`Clip Raster by Mask Layer`, select ``SA_NLC_2018_ALBERS_CALC``  as the :guilabel:`Input layer`, then ``COJ_Boundary`` as :guilabel:`Mask layer`, ``EPSG:4326 - WGS 84`` in :guilabel:`Target CRS`. The target CRS is selected as the mask layer is in *EPSG:4326* projection, and also the resultant layer will be re-projected to *EPSG:4326*. 

  .. image:: /static/3/advanced_raster_analysis/images/05.png
    :align: center

6. The default output data format is GeoTiff. GeoTiff files can get very large if not compressed. Expand :guilabel:`Advanced Parameters` and choose ``High Compression`` as the :guilabel:`Profile`, then click ``...`` in :guilabel:`Clipped (mask)` and select :guilabel:`Save to file... ` to enter layer name as ``SA_NLC_2018_Clipped``. Click :guilabel:`Run`.

  .. image:: /static/3/advanced_raster_analysis/images/06.png
    :align: center

7. Once the algorithm finishes, switch to  :guilabel:`Parameters` and change the :guilabel:`Input layer` to ``SA_NLC_2014_2018_CLASS_CHANGE_ALBERS_CALC``, without changing any other parameters, save the layer as ``SA_NLC_2014_2018_CLASS_CHANGE_Clipped``. Click :guilabel:`Run`.

  .. image:: /static/3/advanced_raster_analysis/images/07.png
    :align: center

8. Now two new clipped layers will be loaded in canvas. Select the original layer and click :guilabel:`Remove Layer` to remove them. 

  .. image:: /static/3/advanced_raster_analysis/images/08.png
    :align: center

9.  Right click on any clipped layer and choose :menuselection:`Layer CRS --> Set Project CRS from Layer`. 

  .. image:: /static/3/advanced_raster_analysis/images/09.png
    :align: center

10. Now the project CRS will be set to ``EPSG:4326``. 

  .. image:: /static/3/advanced_raster_analysis/images/10.png
    :align: center

11. Click on `SA_NLC_2018_Clipped` and use the :guilabel:`identify` tool in the :guilabel:`Attributes Toolbar` to click on the image and inspect the pixel values. You will see that the pixel values range from 1 to 73. These values represent a distinct land use/land cover class.

  .. image:: /static/3/advanced_raster_analysis/images/11.png
    :align: center

12. The dataset classes are described in the ``SANLC 2018 Presentation``, which can be downloaded from the same `EGIS Portal <https://egis.environment.gov.za/sa_national_land_cover_datasets>`_. For this exercise, we are interested in the *informal settlements* represented by class numbers 51 through 54.

  .. image:: /static/3/advanced_raster_analysis/images/12.png
    :align: center

13. Let's extract pixels belonging to these classes. Go to :menuselection:`Processing --> Toolbox --> Raster analysis --> Raster calculator` tool. Double-click to open it.

  .. image:: /static/3/advanced_raster_analysis/images/13.png
    :align: center

14. The source image has only 1 band. The ``@1`` suffix indicates the band number. Enter the following expression to select pixels from class 51-54. 

  .. code-block:: none

     "SA_NLC_2018_Clipped@1" >= 51 AND "SA_NLC_2018_Clipped@1" <= 54


  .. image:: /static/3/advanced_raster_analysis/images/14.png
    :align: center

15. Scroll down and click the ``...`` button next to :guilabel:`Reference layer(s)`. Select the ``SA_NLC_2018_Clipped`` layer and click :guilabel:`OK`.

  .. image:: /static/3/advanced_raster_analysis/images/15.png
    :align: center

16. Next, click the ``...`` button next to :guilabel:`Output` and select :guilabel:`Save to File...`.

  .. image:: /static/3/advanced_raster_analysis/images/16.png
    :align: center

17. Name the output file ``residential_informal.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/advanced_raster_analysis/images/17.png
    :align: center

18. Once the process finishes, a new layer, ``residential_informal`` will be added to QGIS. This raster layer has only two-pixel values - ``1`` where our expression evaluated *true* and ``0`` where it was *false*. The pixels that appear white are the ones belonging to the informal settlement classes. We will style this layer better so we can see the informal settlements clearly. Click the :guilabel:`Open the layer styling panel` button.

  .. image:: /static/3/advanced_raster_analysis/images/18.png
    :align: center

19.  Select the ``residential_informal`` layer and  Change the renderer to be :guilabel:`Paletted/Unique values`. Click the :guilabel:`Add values manually` (+) button.

  .. image:: /static/3/advanced_raster_analysis/images/19.png
    :align: center

20. Change the :guilabel:`Value` to ``1`` and enter ``Residential Informal`` as :guilabel:`Label`. Select a color of your choice.

  .. image:: /static/3/advanced_raster_analysis/images/20.png
    :align: center

21. We can now see all the informal settlements in the Gauteng region. It would be helpful to see them in context with a base map. We have access to a variety of base maps from the :guilabel:`QuickMapServices` plugin. Once you install the plugin, go to :menuselection:`Web --> QuickMapServices --> OSM --> OSM Standard` to add the OpenStreetMap layer.

  .. image:: /static/3/advanced_raster_analysis/images/21.png
    :align: center

22. Now you can easily identify and verify whether our analysis correctly identified the informal settlements. You can select the ``residential_informal`` layer and switch to the :guilabel:`Transparency` tab in the :guilabel:`Layer styling panel`. You can reduce the :guilabel:`Global Opacity` to see both the extracted pixels and the base-map together.

  .. image:: /static/3/advanced_raster_analysis/images/22.png
    :align: center

Now that we have learned how to select particular pixel values in a raster layer let's learn to reclassify a categorized raster and style it.

1. Turn off all layers except ``SA_NLC_2014_2018_CHANGE_Clipped``, then click the :guilabel:`Open the layer styling panel` button. Switch to the :guilabel:`Transparency` tab and enter ``0`` in :guilabel:`Additional no data value`. By this, we have defined all the pixel values with 0 as *No Data*. This value will not be accounted for re-classifying. 

  .. image:: /static/3/advanced_raster_analysis/images/23.png
    :align: center

2.  Use the :guilabel:`identify` tool in the :guilabel:`Attributes Toolbar` to click on the image and inspect the pixel values. You will see that the pixel values range from 21-420. Each value indicates a transition from one of the 73 source classes to another class.

  .. image:: /static/3/advanced_raster_analysis/images/24.png
    :align: center

3. The *SANLC 2018 Change Assessment Report* comes with a spreadsheet named ``20_class_change_matrix_codes_final_1990-2014-2018_vs1.xlsx``. This sheet has the matrix that gives more details about each pixel value. We are interested in all pixel values where any source class changed into a destination built-up class. In the image below, these are highlighted in blue.

  .. image:: /static/3/advanced_raster_analysis/images/25.png
    :align: center

4. Drag and drop the ``reclass.xlsx`` file in the browser

  .. image:: /static/3/advanced_raster_analysis/images/26.png
    :align: center

.. note::

  reclass *Output* contains values 0, 1, 2.
  
  - 1 is built-up class which remained built-up.
  
  - 2 is Non built-up class changed to built-up.
  
  - 0 is All remaining values. 

5. A new layer ``reclass Sheet1`` will be added to the :guilabel:`Layers` panel. Select it and open the :guilabel:`Attribute Table`. The expected format for this file is 3 columns. ``MIN`` and ``MAX`` columns with range of input values and ``OUTPUT`` column with target values. Open the :menuselection:`Processing Toolbox --> Reclassify by layer` tool.

  .. image:: /static/3/advanced_raster_analysis/images/27.png
    :align: center

6. In the :guilabel:`Reclassify by layer` dialog, select ``SA_NLC_2014_2018_CHANGE_Clipped`` as the :guilabel:`Raster layer`. Select ``reclass Sheet1`` as the :guilabel:`Layer containing class breaks`. Select ``MIN``, ``MAX`` and ``OUTPUT`` fields for their respective fields.

  .. image:: /static/3/advanced_raster_analysis/images/28.png
    :align: center

7. Expand the :guilabel:`Advanced Parameters` section. Change the :guilabel:`Range boundaries` to ``min <= value <= max``. Click the :guilabel:`...` button for :guilabel:`Reclassified raster` and enter the output file name as ``builtup_change.tif``. Click :guilabel:`Run`.

  .. image:: /static/3/advanced_raster_analysis/images/29.png
    :align: center

8. Once the processing finishes, a new layer ``builtup_change`` with pixel values ``0-2`` will be added to the canvas. In the :guilabel:`Layer styling panel`, choose ``Paletted/Unique values``, then click ``Classify``. 

  .. image:: /static/3/advanced_raster_analysis/images/30.png
    :align: center

9. Choose the color of your choice for each category and label the ``0``, ``1`` , and ``2`` pixel values as ``Non Built-up``, ``Existing Built-up`` and ``New Built-up``.

  .. image:: /static/3/advanced_raster_analysis/images/31.png
    :align: center

10. Now in the :guilabel:`Transparency` tab, reduce the :guilabel:`Global Opacity`, and turn on the ``OSM Standard`` layer to see both the builtup_change pixels and the base-map together.

  .. image:: /static/3/advanced_raster_analysis/images/32.png
    :align: center

