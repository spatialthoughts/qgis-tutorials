Searching and Downloading OpenStreetMap Data (QGIS3)
====================================================

Getting high quality data is essential for any GIS task. One great resource for free and openly licensed data is `OpenStreetMap(OSM) <http://www.openstreetmap.org/>`_ . The OSM database consists of all types of mapping data - streets, local data, building polygons, administrative boundaries etc. Getting access to OSM data in a GIS format in QGIS is possible via the *QuickOSM** plugin. This tutorial explains the process for searching, downloading and using this plugin.

Overview of the task
--------------------

We will extract locations of all bars and pubs in London from the OpenStreetMap database and save it as a vector layer.


Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to Merge multiple vector layers.

Procedure
---------

1. Search and install the **QuickOSM** plugin from the QGIS Official Plugin Repository. See :doc:`../using_plugins` for instructions on downloading plugins. Note that at the time of writing this tutorial, this plugin is marked as *Experimental*, so make sure you check ``Show also experimental plugins`` in the :guilabel:`Settings` tab in the :guilabel:`Plugins` dialog to be able to install it.

  .. image:: /static/3/downloading_osm_data/images/1.png
     :align: center

2. Once installed, launch the plugin from :menuselection:`Vector --> QuickOSM -> QuickOSM...`.

  .. image:: /static/3/downloading_osm_data/images/2.png
     :align: center
     
3. In the :guilabel:`Quick query` tab, you can set a filter to select a subset. The attributes of the map features in the OSM database are stored as `Tags <https://wiki.openstreetmap.org/wiki/Tags>`_. Tags are represented with a key and a value. The key is a topic and a value is a specific form. See `this page <https://wiki.openstreetmap.org/wiki/Map_Features>`_ for a comprehensive list of tags for various types of features. Bars are represented using the tag ``amenity:bar`` and pubs with the tag ``amenity:pub``. We will first extract the bars. Select ``amenity`` as the :guilabel:`Key` from the drop-down menu.

  .. image:: /static/3/downloading_osm_data/images/3.png
     :align: center
     
4. Select ``bar`` from the :guilabel:`Value` drop-down menu.

  .. image:: /static/3/downloading_osm_data/images/4.png
     :align: center
     
5. Enter ``London`` as the :guilabel:`In` to restrict the search within the city boundary.

  .. image:: /static/3/downloading_osm_data/images/5.png
     :align: center
     
6. Expand the :guilabel:`Advanced` section. In the OSM data model, features are represented using `nodes, ways and relations <https://wiki.openstreetmap.org/wiki/Elements>`_. As we are interested in the point features, you can select only ``Node`` and ``Points`` . Click :guilabel:`Run query`.

  .. image:: /static/3/downloading_osm_data/images/6.png
     :align: center
     
7. The plugin with query the OpenStreetMap database using the `Overpass API <https://wiki.openstreetmap.org/wiki/Overpass_API>`_ and convert the data into a QGIS vector layer.

  .. image:: /static/3/downloading_osm_data/images/7.png
     :align: center
     
8. Once the query finishes, switch to the main QGIS window. You will see a new layer called ``amenity_bar_london`` added to the :guilabel:`Layers` panel. The canvas will show the locations of the bars that were extracted.

  .. image:: /static/3/downloading_osm_data/images/8.png
     :align: center
     
9. Switch back to the :guilabel:`QuickOSM` window, and edit the query to select ``pub`` as the :guilabel:`Value`. Click :guilabel:`Run query`.

  .. image:: /static/3/downloading_osm_data/images/9.png
     :align: center
     
10. This time the plugin will fetch all the points tagged with ``amenity:pub`` from the OSM database.

  .. image:: /static/3/downloading_osm_data/images/10.png
     :align: center
     
11. Once the query is complete, a new layer ``amenity_pub_london`` will be added to the :guilabel:`Layers` panel. We now have 2 vector layers. These are temporary memory layers that will get lost after we exit QGIS. Let's merge these to a single vector layer and save it to the disk. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/downloading_osm_data/images/11.png
     :align: center
     
12. Search and locate the :menuselection:`Vector general --> Merge vector layers` tool. Double-click to launch it.

  .. image:: /static/3/downloading_osm_data/images/12.png
     :align: center
     
13. In the :guilabel:`Merge Vector Layers` dialog, click the :guilabel:`...` button next to :guilabel:`Input layers`. Select both the ``amenity_bar_london`` and ``amenity_pub_london`` layers. Click :guilabel:`OK`.

  .. image:: /static/3/downloading_osm_data/images/13.png
     :align: center
     
14. Click :guilabel:`...` button next to :guilabel:`Merged` and select :guilabel:`Save to GeoPackage`.

  .. image:: /static/3/downloading_osm_data/images/14.png
     :align: center
     
15. Browse to the directory where you want to save the data and name the output ``longon.gpkg``.

  .. image:: /static/3/downloading_osm_data/images/15.png
     :align: center
     
16. Enter ``bars_and_pubs`` as the :guilabel:`Layer name`.

  .. image:: /static/3/downloading_osm_data/images/16.png
     :align: center
     
17. Click :guilabel:`Run` to execute the merge process.

  .. image:: /static/3/downloading_osm_data/images/17.png
     :align: center
     
18. Once the processing finishes, you will see a new layer ``bars_and_pubs`` added in the :guilabel:`Layers` panel. You will see that this layer is the union of all features from both the previous layers. Right-click the ``bars_and_pubs`` layer and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/downloading_osm_data/images/18.png
     :align: center
     
19. In the :guilabel:`Attribute Table`, you will see that the layer contains both pub and bar amenity types along with the names of these establishments and other attributes.

  .. image:: /static/3/downloading_osm_data/images/19.png
     :align: center
     
20. We have achieved the objective of extracting the bars and pub locations in London. We had to perform 2 separate queries to get the relevant data and merge it. This is fine for our task, but you maybe in a situation where you need to perform a complex query to get the right set of data for your project. Fortunately, the QuickOSM plugin provides a way to write  and execute custom queries. Let's see how we can write a singel query for the task at hand. Switch to the :guilabel:`QuickOSM` window and click :guilabel:`Show query`.

  .. image:: /static/3/downloading_osm_data/images/20.png
     :align: center
     
21. The plugin will switch to the :guilabel:`Query` tab. The :guilabel:`Overpass query` section will show the query that was constructed based on the user input. This field is editable and one can enter any query. The format of the query is in the `Overpass Query Language (QL) <https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide>`_. For our purpose, select the section between the <query> ... </query> XML tags and copy it.

  .. image:: /static/3/downloading_osm_data/images/21.png
     :align: center
     
22. Paste it after the existing query section and change the value from ``pub`` to ``bar``. Below is the full query that will fetch values from both the tags in a single query. Click :guilabel:`Run query`.

  .. code-block:: none

      <osm-script output="xml" timeout="25">
      <id-query {{geocodeArea:London}} into="area_0"/>
      <union>
          <query type="node">
              <has-kv k="amenity" v="pub"/>
              <area-query from="area_0"/>
          </query>
          <query type="node">
              <has-kv k="amenity" v="bar"/>
              <area-query from="area_0"/>
          </query>
      </union>
      <union>
          <item/>
          <recurse type="down"/>
      </union>
      <print mode="body"/>
      </osm-script>


  .. image:: /static/3/downloading_osm_data/images/22.png
     :align: center
     
23. Once the query finishes, you will see a new layer ``OsmQuery`` added to the :guilabel:`Layers` panel. This layer contains points representing both bars and pubs in London.

  .. image:: /static/3/downloading_osm_data/images/23.png
     :align: center
     