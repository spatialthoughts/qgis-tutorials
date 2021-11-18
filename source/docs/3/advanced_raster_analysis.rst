Advanced Raster Analysis (QGIS3)
=================================

For city planning, the most useful raster data is Land-Cover. This data informs a wide variety of strategic planning activities. To do this, QGIS has advanced raster capabilities built-in via the ``Raster Calculator``. In this tutorial, we will explore the options available for styling categorical raster and the functionality provided by the raster calculator.

Overview of the task
--------------------

We will identify the suitable areas for development by monitoring change/class transition in the city of Johannesburg, South Africa. 

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- How to load an excel file in QGIS.  
- How to view a particular class in the raster layer.

Get the data
------------

- We will use `The South African National Land Cover 2018 (SANLC) <https://www.environment.gov.za/projectsprogrammes/egis_landcover_datasets>`_ data, and the  *Land Cover Change 2014-18* data. 

  .. image:: /static/3/advanced_raster_analysis/images/data1.png
    :align: center

- City of Johannesburg Boundary, can be downloaded from `COJ Spatial Development Framework 2040 <https://www.joburg.org.za/documents_/Pages/Key%20Documents/policies/Development%20Planning%20%EF%BC%86%20Urban%20Management/Citywide%20Spatial%20Policies/Spatial-Development-Framework-2040.aspx>`_

For your convenience, you can download the clipped version of the data from the link below:

`landuse_change.zip <https://www.qgistutorials.com/downloads/advanced_raster_analysis.zip>`_

Data Source: [SANLC]_ [COJ]_


Procedure
---------

1. Browse to the unzipped ``landuse_change`` folder in QGIS Browser. Expand it and drag and drop the ``SA_NLC_2018_Gauteng.tif`` in canvas.

  .. image:: /static/3/advanced_raster_analysis/images/01.png
    :align: center

2. A new layer `SA_NLC_2018_Gauteng` will be added to QGIS. This is a raster image of land cover. Use the :guilabel:`identify`  tool in the :guilabel:`Attributes Toolbar` to click on the image and inspect the pixel values. You will see that the pixel values range from 1 to 73. These values represent a distinct land use/land cover class.

  .. image:: /static/3/advanced_raster_analysis/images/02.png
    :align: center

3. The dataset is accompanied by the ``SANLC 2018 Launch Presentation`` which describes these classes in detail. For this exercise, we are interested in the *informal settlements* which are represented by class numbers 51 through 54.

  .. image:: /static/3/advanced_raster_analysis/images/03.png
    :align: center

4. Let's extract pixels belonging to these classes. Go to :menuselection:`Processing --> Toolbox --> Raster calculator` tool. Double-click to open it.

  .. image:: /static/3/advanced_raster_analysis/images/04.png
    :align: center

5. The source image has only 1 band. The ``@1`` suffix indicates the band number. Enter the following expression to select pixels from class 51-54. 

  .. code-block:: none

     "SA_NLC_2018_Gauteng@1" >= 51 AND "SA_NLC_2018_Gauteng@1" <= 54


  .. image:: /static/3/advanced_raster_analysis/images/05.png
    :align: center

6. Scroll down and click the ``...`` button next to :guilabel:`Reference layer(s)`. Select the ``SA_NLC_2018_Gauteng`` layer and click :guilabel:`OK`.

  .. image:: /static/3/advanced_raster_analysis/images/06.png
    :align: center

7. Next, click the ``...`` button next to :guilabel:`Output` and select :guilabel:`Save to File...`.

  .. image:: /static/3/advanced_raster_analysis/images/07.png
    :align: center

8. Name the output file ``residential_informal.tif`` and click :guilabel:`Run`.

  .. image:: /static/3/advanced_raster_analysis/images/08.png
    :align: center

9. Once the processing finishes, a new layer ``residential_informal`` will be added to QGIS. This raster layer has only 2 pixel values - ``1`` where our expression evaluated to *true* and ``0`` where it was *false*. The pixels that appear white are the ones belonging to the informal settlement classes.

  .. image:: /static/3/advanced_raster_analysis/images/09.png
    :align: center

10. We will now style this layer better so we can see the informal settlements clearly. Turn off the ``SA_NLC_2018_Gauteng`` layer from the :guilabel:`Layers` panel. Select the ``residential_informal`` layer and click the :guilabel:`Open the layer styling panel` button. Change the renderer to be :guilabel:`Paletted/Unique values`.

  .. image:: /static/3/advanced_raster_analysis/images/10.png
    :align: center

11. Click the :guilabel:`Add values manually` (+) button. Change the :guilabel:`Value` to ``1`` and enter ``Residential Informal`` as :guilabel:`Label`. Select a color of your choice.

  .. image:: /static/3/advanced_raster_analysis/images/11.png
    :align: center

12. We can now see all the informal settlement in the Gauteng region. It would be helpful to see them in context with a basemap. We have access to a variety of base-maps from the :guilabel:`QuickMapServices` plugin. Once you install the plugin, go to :menuselection:`Web --> QuickMapServices --> OSM --> OSM Standard` to add the OpenStreetMap layer.

  .. image:: /static/3/advanced_raster_analysis/images/12.png
    :align: center

13. Now you can easily identify and verify whether our analysis correctly identified the informal settlements. You can select the ``residential_informal`` layer and switch to the :guilabel:`Transparency` tab in the :guilabel:`Layer styling panel`. You can reduce the :guilabel:`Global Opacity` to see both the extracted pixels and the basemap together.

  .. image:: /static/3/advanced_raster_analysis/images/13.png
    :align: center

14. To identify the urban growth pattern in all the areas where the land cover changed to the built-up area from 2014 to 2018. Drag and drop the ``SA_NLC_2014_2018_CHANGE_Gauteng.tif`` file from the *Browser* to the canvas. 

  .. image:: /static/3/advanced_raster_analysis/images/14.png
    :align: center

15.  Use the :guilabel:`identify` tool in the :guilabel:`Attributes Toolbar` to click on the image and inspect the pixel values. You will see that the pixel values range from 21-420. Each value indicates transition from one of the 73 source classes to another class.

  .. image:: /static/3/advanced_raster_analysis/images/15.png
    :align: center

16. The *SANLC 2018 Change Assessment Report* comes with a spreadsheet named ``20_class_change_matrix_codes_final_1990-2014-2018_vs1.xlsx``. This sheet has the matrix that gives more details about each pixel value. We are interested in all pixel values where any source class changed into a destination built-up class. In the image below, these are highlighted in blue.

  .. image:: /static/3/advanced_raster_analysis/images/16.png
    :align: center

17. Drag and drop the ``reclass.xlsx`` file in the browser

  .. image:: /static/3/advanced_raster_analysis/images/17.png
    :align: center

.. note::

  reclass *Output* contains values 0, 1, 2.
  
  - 1 is built-up class which remained built-up.
  
  - 2 is Non built-up class changed to built-up.
  
  - 0 is All remaining values. 

18. A new layer ``reclass Sheet1`` will be added to the :guilabel:`Layers` panel. Select it and open the :guilabel:`Attribute Table`. The expected format for this file is 3 columns. ``MIN`` and ``MAX`` columns with range of input values and ``OUTPUT`` column with target values. Open the :menuselection:`Processing Toolbox --> Reclassify by layer` tool.

  .. image:: /static/3/advanced_raster_analysis/images/18.png
    :align: center

19. In the :guilabel:`Reclassify by layer` dialog, select ``SA_NLC_2014_2018_CHANGE_Gauteng`` as the :guilabel:`Raster layer`. Select ``reclass Sheet1`` as the :guilabel:`Layer containing class breaks`. Select ``MIN``, ``MAX`` and ``OUTPUT`` fields for their respective fields.

  .. image:: /static/3/advanced_raster_analysis/images/19.png
    :align: center

20. Expand the :guilabel:`Advanced Parameters` section. Change the :guilabel:`Range boundaries` to ``min <= value <= max``. Click the :guilabel:`...` button for :guilabel:`Reclassified raster` and enter the output file name as ``builtup_change.tif``. Click :guilabel:`Run`.

  .. image:: /static/3/advanced_raster_analysis/images/20.png
    :align: center

21. Once the processing finishes, a new layer ``builtup_change`` with pixel values ``0-2`` will be added to the canvas. 

  .. image:: /static/3/advanced_raster_analysis/images/21.png
    :align: center

22. Open the :guilabel:`Layer styling panel` and click the :guilabel:`Add values manually` (+) button to add 3 categories: ``Non Built-up``, ``Existing Built-up`` and ``New Built-up`` for pixel values ``0``, ``1`` and ``2`` respectively.

  .. image:: /static/3/advanced_raster_analysis/images/22.png
    :align: center

23. Drag and drop the ``COJ_Boundary.shp`` file in the browser, to see the growth in context of the city boundary.

  .. image:: /static/3/advanced_raster_analysis/images/23.png
    :align: center

24. Change the sub-renderer from :guilabel:`Simple Fill` to :guilabel:`Simple Line` and increase the line width. You can now see the city boundary overlaid on the raster layer.

  .. image:: /static/3/advanced_raster_analysis/images/24.png
    :align: center

25. Explore the pattern of built-up area growth indicated by the red pixels.
 
  .. image:: /static/3/advanced_raster_analysis/images/25.png
    :align: center

