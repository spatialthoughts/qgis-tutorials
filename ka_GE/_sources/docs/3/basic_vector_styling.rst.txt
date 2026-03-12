Basic Vector Styling (QGIS3)
============================

To create a map, one has to style the GIS data and present it in a form that is visually informative. There are a large number of options available in QGIS to apply different types of symbology to the underlying data. In this tutorial, we will take a text file and apply different data visualization techniques to highlight spatial patterns in the data.

Overview of the task
--------------------

We will take a CSV file containing the location of all power plants in the World and create a visualization showing distribution of renewable and non-renewable fuels used in these power plants.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Use expressions to group multiple attribute values into a single category

Get the data
------------

`World Resources Institute <https://www.wri.org>`_ has compiled a comprehensive, open source database of power plants around the World covering over 30000 plants. Download the `The Global Power Plant Database <http://datasets.wri.org/dataset/globalpowerplantdatabase>`_ from the WRI Open Data Portal.

`Natural Earth <http://naturalearthdata.com>`_ has several global vector
layers. Download the `10m Physical Vectors - Land <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_land.zip>`_ containing Land polygons.

For convenience, you may directly download a copy of the above layers from below:

`globalpowerplantdatabasev120.zip <https://www.qgistutorials.com/downloads/globalpowerplantdatabasev120.zip>`_

`ne_10m_land.zip <https://www.qgistutorials.com/downloads/ne_10m_land.zip>`_

Data Source [WRI]_ [NATURALEARTH]_

Procedure
---------

1. Unzip both the datasets to a folder on your computer. In the QGIS Browser Panel, locate the directory where you extracted the data. Expand the ``ne_10m_land`` folder and select the ``ne_10m_land.shp`` layer. Drag the layer to the canvas. 

  .. image:: /static/3/basic_vector_styling/images/1.png
     :align: center
     
2. You will get a new layer ``ne_10m_land`` added to the :guilabel:`Layers` panel. The global power plant database comes as a CSV file, so we will need to import it. Click the :guilabel:`Open Data Source Manager` button on the :guilabel:`Data Source Toolbar`. You can also use :kbd:`Ctrl + L` keyboard shortcut.

  .. image:: /static/3/basic_vector_styling/images/2.png
     :align: center
     
3. In the :guilabel:`Data Source Manager` window, switch to the :guilabel:`Delimited Text` tab. Click the :guilabel:`...` button next to :guilabel:`File name` and browse to the directory where you extracted the ``globalpowerplantdatabasev120.zip`` file. Select the ``global_power_plant_database.csv``. QGIS will auto detect the delimiter and geometry fields. Leave the :guilabel:`Geometry CRS` to the default value of ``EPSG:4326 - WGS84``. Click :guilabel:`Add` followed by :guilabel:`Close`.

  .. image:: /static/3/basic_vector_styling/images/3.png
     :align: center
     
4. A new layer ``global_power_plant_database`` will be added to the :guilabel:`Layers` panel and you will see the points representing the power plants in the canvas. Now we are ready to style both these layers. Click the :guilabel:`Open the Layer Styling panel` button at the top of the :guilabel:`Layers` panel.

  .. image:: /static/3/basic_vector_styling/images/4.png
     :align: center
     
5. The :guilabel:`Layer Styling` panel will open on the right. Select the ``ne_10m_land`` layer first. This will be our base layer so we can keep the styling minimalistic so it is not distracting. Click ``Simple fill`` and scroll down. Select a :guilabel:`Fill color` as per your liking. Click the drop-down next to :guilabel:`Stroke color` and select ``Transparent Stroke``. This will set the outlines of the land polygons to be transparent. You will see the result of your selection applied immediately to the layer.

  .. image:: /static/3/basic_vector_styling/images/5.png
     :align: center
     
6. Next select the ``global_power_plant_database`` layer. Click on ``Simple marker`` and scroll down. Pick a triangle marker.

  .. image:: /static/3/basic_vector_styling/images/6.png
     :align: center
     
7. Scroll up and select a :guilabel:`Fill color` of your liking. A useful cartographic technique is to choose a slightly darker version of the fill-color as the :guilabel:`Stroke color`. Rather than trying to pick that manually, QGIS provides an expression to control this more precisely. Click the :guilabel:`Data defined override` button and choose :guilabel:`Edit`.

  .. image:: /static/3/basic_vector_styling/images/7.png
     :align: center
     
8. Enter the following expression to set the color to be 30% darker shade than the fill color and click :guilabel:`OK`.

  .. code-block:: none

    darker(@symbol_color, 130)

  .. image:: /static/3/basic_vector_styling/images/8.png
     :align: center
     
.. note:: 
  
  Note that this expression is independent of the fill color you have chosen. You will see that this is immensely useful in the following steps where it automatically sets the border color based on the fill color provided.
 
9. You will notice that the :guilabel:`Data defined override` button next to :guilabel:`Stroke color` has turned yellow - indicating than this property is controlled by an override. A single symbol rendering of the power plants layer is not very useful. It doesn't convey much information except the locations of the power plants. Let's use a different renderer to make it more useful. Click the :guilabel:`Symbology` drop-down and select ``Categorized`` renderer. 

  .. image:: /static/3/basic_vector_styling/images/9.png
     :align: center
     
10. The ``global_power_plant_database`` layer contains an attribute indicating the primary fuel used in each power plant. We can create a style where each unique fuel type is shown in a different color. Select ``primary_fuel`` as the :guilabel:`Column`. Click :guilabel:`Classify`. You will multiple categories appear and the map rendering change accordingly. 

  .. image:: /static/3/basic_vector_styling/images/10.png
     :align: center
     
11. While a Categorized view is useful, this layer contains too-many categories for one to meaningfully interpret the map. A better approach would be to group certain type of fuel categories and reduce the number of classes. Let's try to create 3 categories - **Renewable fuel**, **Non-renewable fuel** and **Other**. Select ``Rule-based`` renderer. We want to delete all the categories except the top one. Select the second category from the top, hold the :kbd:`Shift` key and click the bottom category. This will select all the categories except the top one. Once selected, click the :guilabel:`Remove selected rules` button to delete them.

  .. image:: /static/3/basic_vector_styling/images/11.png
     :align: center
     
12. Select the remaining rule and click :guilabel:`Edit current rule`.

  .. image:: /static/3/basic_vector_styling/images/12.png
     :align: center
     
13. Enter ``Renewable fuel`` as the :guilabel:`Label`. Click the :guilabel:`Expression` button next to :guilabel:`Filter`.

  .. image:: /static/3/basic_vector_styling/images/13.png
     :align: center
     
14. In the :guilabel:`Expression String Builder` dialog, enter the following expression and click :guilabel:`OK`. Here we are grouping multiple renewable energy categories into a single category.

  .. code-block:: none

    "primary_fuel" IN ('Biomass', 'Geothermal', 'Hydro', 'Solar', 'Wind', 'Storage', 'Wave and Tidal')

  .. image:: /static/3/basic_vector_styling/images/14.png
     :align: center
     
.. note::

  The types of fuel chosen for renewable vs. non-renewable categories is based on `Wikipedia <https://en.wikipedia.org/wiki/Renewable_energy>`_. There are alternate definitions and classifications that may not match what is chosen here.
  
15. Scroll down and click :guilabel:`Simple marker`. Choose an appropriate :guilabel:`Fill color`. Once done, click the :guilabel:`Back` button.

  .. image:: /static/3/basic_vector_styling/images/15.png
     :align: center
     
16. You will see a single rule being applied to the layer for the :guilabel:`Renewable fuel` category. Right-click the row and choose :guilabel:`Copy`. Right-click again and choose :guilabel:`Paste`.

  .. image:: /static/3/basic_vector_styling/images/16.png
     :align: center
     
17. A copy of the existing rule will be added. Select the newly added row and click :guilabel:`Edit current rule`.

  .. image:: /static/3/basic_vector_styling/images/17.png
     :align: center
     
18. Enter ``Non-renewable fuel`` as the :guilabel:`Label`. Click the :guilabel:`Expression` button next to :guilabel:`Filter`.

  .. image:: /static/3/basic_vector_styling/images/18.png
     :align: center
     
19. In the :guilabel:`Expression String Builder` dialog, enter the following expression and click :guilabel:`OK`.

   .. code-block:: none
   
    "primary_fuel" IN ('Coal', 'Gas', 'Nuclear', 'Oil', 'Petcoke')

  .. image:: /static/3/basic_vector_styling/images/19.png
     :align: center
       
20. Scroll down and click :guilabel:`Simple marker`. Choose an appropriate :guilabel:`Fill color`. Once done, click the :guilabel:`Back` button.

  .. image:: /static/3/basic_vector_styling/images/20.png
     :align: center
     
21. Repeat the Copy/Paste process to add a third rule. Select it and click :guilabel:`Edit current rule`.

  .. image:: /static/3/basic_vector_styling/images/21.png
     :align: center
     
22. Enter ``Other`` as the :guilabel:`Label`. Choose :guilabel:`Else - Catch all for other features` instead of a :guilabel:`Filter`. This will ensure that any category missed in the previous 2 rules, will be styled by this rule.  Scroll down and click :guilabel:`Simple marker`. Choose an appropriate :guilabel:`Fill color`. Once done, click the :guilabel:`Back` button.

  .. image:: /static/3/basic_vector_styling/images/22.png
     :align: center
     
23. The re-categorization is complete now. You will see a much cleaner view that shows the distribution of renewable vs. non-renewable fuel sources used by power plants and their distribution across countries. This however doesn't give a complete picture. We can add another variable to the styling. Rather than displaying all markers with uniform size, we can show the sizes proportional to the power generation capacity of each plant. This cartography technique is called *Multivariate mapping*. Right-click the ``Renewable fuel`` rule and select :guilabel:`Change Size`.

  .. image:: /static/3/basic_vector_styling/images/23.png
     :align: center
     
24. Click the :guilabel:`Data defined override` button next to :guilabel:`Size`. Select :guilabel:`Edit`.

  .. image:: /static/3/basic_vector_styling/images/24.png
     :align: center
     
25. As the power generation capacity varies a lot among our dataset, an effective way to get a a small range for size is using the ``log10`` function. You can experiment with different expressions to arrive at what works best for your preferred visualization. Enter the following expression and click :guilabel:`OK`.

  .. code-block:: none
 
    log10("capacity_mw") + 1

  .. image:: /static/3/basic_vector_styling/images/25.png
     :align: center
     
26. Repeat the same process for other rules.

  .. image:: /static/3/basic_vector_styling/images/26.png
     :align: center
     
27. Once satisfied, you can close the :guilabel:`Layer Styling panel`.

  .. image:: /static/3/basic_vector_styling/images/27.png
     :align: center
     
28. Looking at our final visualization, you can immediately see the patterns in the dataset. For example, over Europe there are more power plants that use renewable energy source, but they are lower capacity than the plants that use non-renewable energy source.

  .. image:: /static/3/basic_vector_styling/images/28.png
     :align: center
     
