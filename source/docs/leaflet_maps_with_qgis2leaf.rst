Leaflet Web Maps with qgis2leaf
===============================
.. warning::

   qgis2leaf plugin is no longer in active development. The functionality of
   this plugin is folded into a new plugin called **qgis2web**.

   See :docs:`web_mapping_with_qgis2web` tutorial for an updated version of
   this tutorial.

Leaflet is a popular open-source Javascript library for building web mapping
applications. **qgis2leaf** plugin provides a simple way to export your QGIS
map to a functioning leaflet-based web map. This plugin is a useful way to get
started with web mapping and create an interactive web map from your static GIS
data layers.

Overview of the task
--------------------

We will create a leaflet web map of world's airports.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Using ``CASE`` SQL statement in Field Calculator to create new field values
  based on different conditions.
- Locating and using SVG custom icons in QGIS.

Get the data
------------

We will use the `Airports
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/airports/>`_
dataset from Natural Earth.

Download the `Airports shapefile
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_airports.zip>`_.

Data Source [NATURALEARTH]_

Procedure
---------

1. Install the ``qgis2leaf`` plugin by going to :menuselection:`Plugins -->
   Manage and Install Plugin`. Note that the plugin is currently marked
   **experimental**, so you will need to check :guilabel:`Show also
   experimental plugins` in Plugin Settings. (See :doc:`using_plugins` for more details on
   installing plugins in QGIS)

.. image:: /static/leaflet_maps_with_qgis2leaf/images/1.png
   :align: center

2. Unzip the downloaded ``ne_10m_airports.zip`` file. Open QGIS and go to
   :menuselection:`Layer --> Add Vector Layer`. Browse to the location when the
   files were extracted and select ``ne_10m_airports.shp``. Click
   :guilabel:`OK`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/2.png
   :align: center

3. Once the ``ne_10m_airports`` layer is loaded, use the :guilabel:`Identify`
   tool to click on any feature and look at the attributes. We will create an
   airport map where we classify the airports into 3 categories. The attribute
   ``type`` will be useful when classifying the features.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/3.png
   :align: center

4. Right-click the ``ne_10m_airports`` layer and select :guilabel:`Open
   Attribute Table`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/4.png
   :align: center

5. In the attribute table dialog, click the :guilabel:`Toggle Editing` button.
   Once the layer is in editing mode, click the :guilabel:`Open Field
   Calculator` button.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/5.png
   :align: center

6. We want to create a new attribute called ``type_code`` where we give major
   airports a value of 3, mid-sized airports a value of 2 and all others a
   value of 1. We can use the *CASE* statement and write an expression that
   will look at the value of ``type`` attribute and create a ``type_code``
   attribute based on the condition. Check the :guilabel:`Create a new field`
   box and enter ``type_code`` as the :guilabel:`Output field name`. Select
   :guilabel:`Whole number (integer)` as the :guilabel:`Output field type`. In
   the :guilabel:`Expression` window, enter the following text.

.. code-block:: none

   CASE  WHEN "type" LIKE '%major%'  THEN 3
    WHEN "type" LIKE '%mid%' THEN 2
    ELSE 1
   END

.. image:: /static/leaflet_maps_with_qgis2leaf/images/6.png
   :align: center

7. Back in the :guilabel:`Attribute Table` window, you will see a new column at
   the end. Verify that your expression worked correctly and click the
   :guilabel:`Toggle Editing` button to save the changes.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/7.png
   :align: center

8. Now we will style the airports layer using the newly created ``type_code``
   attribute. Right-click the ``ne_10m_airports`` layer and select
   :guilabel:`Properties`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/8.png
   :align: center

9. Select the :guilabel:`Style` tab in the :guilabel:`Layer Properties` dialog.
   Select :guilabel:`Categorized` style from the drop-down menu and choose
   ``type_code`` as the :guilabel:`Column`. Choose a color ramp of your choice
   and click :guilabel:`Classify`. Click :guilabel:`OK` to go back to the main
   QGIS window.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/9.png
   :align: center

10. Here you will see a nicely styled airport map. Let's export this to create
    an interactive web map. Go to :menuselection:`Web --> qgis2leaf --> Exports
    a QGIS Project to a working leaflet webmap`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/10.png
   :align: center

11. In the :guilabel:`QGIS 2 Leaflet` dialog, click :guilabel:`Get Layers` to
    get the refreshed layer list. Select the :guilabel:`Full screen` option to
    have a full screen web map. Choose :guilabel:`layer extent` as the
    :guilabel:`Extent` of the exported map. Choose a :guilabel:`Output project
    folder` on your system where the plugin will write the output files. Click
    :guilabel:`OK`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/11.png
   :align: center

12. Once the export process finishes, locate the output folder on your disk.
    Open the ``index.html`` file in a browser. You will see an interactive web
    map that is a replica of the QGIS map. You can zoom and pan around the map
    and also click on any feature to get an popup window with attribute
    information. You can copy the contents of this folder to a web server to
    have a full featured web map.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/12.png
   :align: center

13. Now we will explore some advanced features of this plugin that will allow
    you to customize the map further. If you noticed, the popup contained all
    the attributes of the feature. Some attributes are not very useful and
    overall the pop up looks ugly. We can replace the default popup with our
    own custom HTML to make it much better. This is achieved by added the
    custom HTML in a column named ``html_exp``. Right-click the
    ``ne_10m_airports`` layer and select :guilabel:`Open Attribute Table`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/13.png
   :align: center

14. In the attribute table dialog, click the :guilabel:`Toggle Editing` button.
    Once the layer is in editing mode, click the :guilabel:`Open Field
    Calculator` button.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/14.png
   :align: center

15. Check the :guilabel:`Create a new field` box and enter ``html_exp`` as the
    :guilabel:`Output field name`. Choose :guilabel:`Text (string)` as the
    :guilabel:`Output field type`. Since we will be creating a long HTML
    string, choose ``200`` as the :guilabel:`Output field width`. Enter the
    following expression in the :guilabel:`Expression` area. The
    complex-looking expression simply defines a HTML table and substitutes cell
    values from attributes ``iata_code``, ``name`` and ``type``. Check the
    :guilabel:`Output preview` to ensure the expression is correct.

.. code-block:: none

   concat('<h3>', "iata_code", '</h3><table>', '<tr><td>Airport Name: <b> ',
   "name", '</b></td></tr><tr><td>Category: <b> ', "type",
   '</b></td></tr></table>')

.. note::

   The shapefile format can contain a maximum of 254 characters in a field. If
   you want to store longer text in the field, choose another format.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/15.png
   :align: center

16. Back in the :guilabel:`Attribute Table` window, you will see a new column at
    the end. Verify that your expression worked correctly and click the
    :guilabel:`Toggle Editing` button to save the changes.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/16.png
   :align: center

17. Now export the map again using :menuselection:`Web --> qgis2leaf -->
    Exports a QGIS Project to a working leaflet webmap`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/17.png
   :align: center

18. Choose the options as before.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/18.png
   :align: center

19. Go to the output folder once the export process finishes. You will have a
    subfolder with the present timestamp. Locate the ``index.html`` file inside
    it and open it in a browser. Click on any feature and look at the popup.
    You will notice that it looks a lot cleaner and informative.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/19.png
   :align: center

20. Another useful feature of the ``qgis2leaf`` plugin is the ability to
    specify a custom icon to use with the web map. This is accomplished by
    specifying the path to the custom icon in a field called ``icon_exp``. We
    will create a new layer containing only the major airports and style using
    a custom SVG icon.  Locate the :guilabel:`Select features using an
    expression` tool from the toolbar.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/20.png
   :align: center

21. Enter the expression below and press :guilabel:`Select` to select all major
    airports.

.. code-block:: none

   "type_code" = 3

.. image:: /static/leaflet_maps_with_qgis2leaf/images/21.png
   :align: center

22. Right-click the ``ne_10m_airports`` airports and select :guilabel:`Save
    Selection As...`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/22.png
   :align: center

23. In the :guilabel:`Save vector layer as...` dialog, name the output file as
    ``major_airports.shp``. Check the :guilabel:`Add saved file to map` and
    click :guilabel:`OK`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/23.png
   :align: center

24. Once the ``major_airports`` layer is loaded in QGIS, right-click it and
    select :guilabel:`Open Attribute Table`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/24.png
   :align: center

25. In the attribute table dialog, click the :guilabel:`Toggle Editing` button.
    Once the layer is in editing mode, click the :guilabel:`Open Field
    Calculator` button.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/25.png
   :align: center

26. In :guilabel:`Field Calculator` dialog, enter ``icon_exp`` as the
    :guilabel:`Output field name`. Make it a :guilabel:`Text (string)` type. In
    the :guilabel:`Expression` area, enter the following expression.

.. code-block:: none

   'airport.svg'

.. image:: /static/leaflet_maps_with_qgis2leaf/images/26.png
   :align: center

27. Save your edits by clicking the :guilabel:`Toggle Editing` button in the
    :guilabel:`Attribute Table`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/27.png
   :align: center

28. Open the ``qgis2leaf`` plugin from :menuselection:`Web --> qgis2leaf --> Exports
    a QGIS Project to a working leaflet webmap`. Click :guilabel:`Get Layers`
    button to fetch both the layers from QGIS. There are many different pre-made tile layers
    availalbe for basemaps. In this map, we can try something different and load the :guilabel:`Stamen Watercolor` as the
    :guilabel:`Basemap`. Click :guilabel:`OK`.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/28.png
   :align: center

29. If you remember we specified ``airport.svg`` as the icon for the airports.
    We need to add that icon manually to the output directory. QGIS comes with
    a large collection of icons. On Windows, these icons are located at
    :menuselection:`C: --> OSGEO4W64 --> apps --> qgis --> svg`. The path may
    differ depending on your platform and install type. Locate that directory
    and choose an icon you like. For our map, we can try the
    ``amenity=airport.svg`` icon located under ``transport`` category.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/29.png
   :align: center

30. Copy and paste this icon in the output directory you had specified when exporting
    the map. Rename it as ``airport.svg``.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/30.png
   :align: center

31. Now open the ``index.html`` file located in the folder. You will see a
    beautiful basemap with our custom icons for the major airports. Also notice
    the layer panel at top-right corner which has layer display control for
    both the layers.

.. image:: /static/leaflet_maps_with_qgis2leaf/images/31.png
   :align: center

.. only:: html

   Hope this tutorial gives you a head start in creating web maps. Below is the
   live interactive map created for this tutorial.

.. raw:: html

   <div>
   <iframe
   src="http://spatialthoughts.github.io/qgis2leaf-maps/airports_with_custom_popup/"
   width="100%" height="600px"></iframe>
   </div>
