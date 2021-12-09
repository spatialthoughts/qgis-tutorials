Searching and Downloading OpenStreetMap Data (QGIS3)
====================================================

Getting high quality data is essential for any GIS task. One great resource for free and openly licensed data is `OpenStreetMap(OSM) <http://www.openstreetmap.org/>`_ . The OSM database consists of all types of mapping data - streets, local data, building polygons, administrative boundaries etc. Getting access to OSM data in a GIS format in QGIS is possible via the *QuickOSM* plugin. This tutorial explains the process for searching, downloading and using this plugin.

Overview of the task
--------------------

We will extract locations of all bars and pubs in London from the OpenStreetMap database and save it as a vector layer.


Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to chain multiple queries in QuickOSM plugin.

Procedure
---------

1. Search and install the **QuickOSM** plugin from the QGIS Official Plugin Repository. See :doc:`../using_plugins` for instructions on downloading plugins. Make sure you have the checkbox selected. Click :guilabel:`Close`. 

  .. image:: /static/3/downloading_osm_data/images/1.png
     :align: center

2. Once installed, launch the plugin from :menuselection:`Vector --> QuickOSM --> QuickOSM...`.

  .. image:: /static/3/downloading_osm_data/images/2.png
     :align: center
     
3. In the :guilabel:`Quick query` tab, you can set a filter to select a subset. The attributes of the map features in the OSM database are stored as `Tags <https://wiki.openstreetmap.org/wiki/Tags>`_. Tags are represented with a key and a value. The key is a topic and a value is a specific form. See the OSM `Map Features <https://wiki.openstreetmap.org/wiki/Map_Features>`_ wiki page for a comprehensive list of tags for various types of features. Bars are represented using the tag ``amenity:bar`` and pubs with the tag ``amenity:pub``. We will first extract the bars. Select ``amenity`` as the :guilabel:`Key` from the drop-down menu.

  .. image:: /static/3/downloading_osm_data/images/3.png
     :align: center
     
4. Select ``bar`` from the :guilabel:`Value` drop-down menu.

  .. image:: /static/3/downloading_osm_data/images/4.png
     :align: center

5. We can chain multiple queries in the latest version (v2.0.0 +) of the QuickOSM plugin. Click on the plus button next query selection bar will appear. Click on the first selection box where we can get option ``And`` and ``Or``. :guilabel:`And` will select only feature which is true for all queries. :guilabel:`Or` will select all features which are true for any of the queries. Click ``Or`` to select both bar and pub features. 

  .. image:: /static/3/downloading_osm_data/images/5.png
     :align: center

6. Select ``amenity`` as the :guilabel:`Key` from the drop-down menu. Then select ``pub`` from the :guilabel:`Value` drop-down menu.

  .. image:: /static/3/downloading_osm_data/images/6.png
     :align: center
     
7. Enter ``London`` as the :guilabel:`In` to restrict the search within the city boundary.

  .. image:: /static/3/downloading_osm_data/images/7.png
     :align: center
     
8. Expand the :guilabel:`Advanced` section. In the OSM data model, features are represented using `nodes, ways and relations <https://wiki.openstreetmap.org/wiki/Elements>`_. As we are interested in the point features, you can select only ``Node`` and ``Points`` . Click :guilabel:`Run query`.

  .. image:: /static/3/downloading_osm_data/images/8.png
     :align: center
     
9. Once the query finishes, switch to the main QGIS window. You will see a new layer called ``amenity_bar_amenity_pub_London`` added to the :guilabel:`Layers` panel. The canvas will show the locations of the bars and pubs that were extracted.

  .. image:: /static/3/downloading_osm_data/images/9.png
     :align: center
     
10. Open the Attribute table of the layer. There are ``2091`` features. The column :guilabel:`amenity` contains the category whether the feature is ``pub`` or ``bar``. Using this categorical column, lets style our layer. 

  .. image:: /static/3/downloading_osm_data/images/10.png
     :align: center
     
11. Click on the :guilabel:`Open the Layer Styling panel` icon, select ``Categorized`` then in :guilabel:`Value` select ``amenity`` then click :guilabel:`Classify`. Now the layer will be styled with 2 color featuring both ``bars`` and ``pubs``. 

  .. image:: /static/3/downloading_osm_data/images/11.png
     :align: center
     
12. Now right-click on the layer, :menuselection:`Export --> Save Feature As...` to export the layer as GeoPackage.

  .. image:: /static/3/downloading_osm_data/images/12.png
     :align: center
     
13. In the :guilabel:`Save Vector Layer as...` dialog box, in :guilabel:`Format` Choose ``GeoPackage``,  in :guilabel:`File name` click ``...`` and browse to the directory where you want to save the data and name the output ``longon.gpkg``. In :guilabel:`Layer name` enter ``bar_and_pubs``. Click :guilabel:`OK`.

  .. image:: /static/3/downloading_osm_data/images/13.png
     :align: center
     
14. Now a GeoPackage layer ``london_bar_and_pubs`` will be added to the canvas. 

  .. image:: /static/3/downloading_osm_data/images/14.png
     :align: center
    
     