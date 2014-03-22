Searching and Downloading OpenStreetMap Data
============================================
.. only:: html

   [ Download PDF `A4 <../pdf/downloading_osm_data.pdf>`_ `Letter
   <../pdf/downloading_osm_data.pdf>`_ ]

Getting high quality data is essential for any GIS task. One great resource for
free and openly licensed data is `OpenStreetMap(OSM)
<http://www.openstreetmap.org/>`_ . The OSM database consits of streets, local
data as well as building polygons. Getting access to OSM data in a GIS format
is integrated in QGIS. This tutorial explains the process for searching,
downloading and using OSM data in QGIS.

Overview of the task
--------------------

Search for *London* in OSM database, browse and select a part of the city, and
extract all pub locations as a shapefile.


Procedure
---------

1. We will use 2 plugins to accomplish the task. Make sure you have installed
   **OSM Place Search** and **OpenLayers** plugins. See :doc:`using_plugins` for
   instructions on downloading plugins.

.. image:: /static/downloading_osm_data/images/1.png
   :align: center

2. The **OSM Place Search** plugin will install itself as a *Panel* in QGIS.
   You will see a new panel titled :guilabel:`OSM place search...` in QGIS.

.. image:: /static/downloading_osm_data/images/2.png
   :align: center

3. The **OpenLayers** plugin is installed under the *Plugin* menu. This plugin
   allows you to access basemaps from various providers in QGIS. Let's load the
   OpenStreetMap basemap in QGIS by going to :menuselection:`Plugins -->
   OpenLayers plugin --> Add OpenStreetMap layer`.

.. image:: /static/downloading_osm_data/images/3.png
   :align: center

4. You will see a world map loaded in QGIS.

.. note::

   If you do not see any data - make sure you are online - as the basemap tiles
   are fetched from the internet. You can also use the *Pan* tool to move the
   map canvas slightly, which will trigger a refresh of the basemap.

.. image:: /static/downloading_osm_data/images/4.png
   :align: center

5. Now, let's search for *London*. Type the query in the :guilabel:`Name
   contains...` box in the **OSM Place Search** panel. You can hover over the
   results and the appropriate place will be highlighted on the map. Select the
   first result - which the city of London in UK - and click the
   :guilabel:`Zoom` button.

.. image:: /static/downloading_osm_data/images/5.png
   :align: center

6. You will see the base layer move and center around the city of London. You
   can use the :guilabel:`Zoom` tool to zoom and select the exact area of your
   interest. For this tutorial, you can zoom in the center of the city as
   shown.

.. image:: /static/downloading_osm_data/images/6.png
   :align: center

7. Now we can download the data displayed on the map canvas. Go to
   :menuselection:`Vector --> OpenStreetMap --> Downlod data`.

.. image:: /static/downloading_osm_data/images/7.png
   :align: center

8. In the :guilabel:`Download OpenStreetMap data` dialog, choose
   :guilabel:`From map canvas` as the :guilabel:`Extent`. Choose the path and
   name the output file as ``london.osm``.

.. image:: /static/downloading_osm_data/images/8.png
   :align: center

9. The downloaded file with the ``.osm`` extension is an text file in the `OSM
   XML <http://wiki.openstreetmap.org/wiki/OSM_XML>`_ format. We first need to
   convert it into a suitable format that is easy to consume in QGIS. Go to
   :menuselection:`Vector --> OpenStreetMap --> Import topology from XML`.

.. note::

   Now that we do not need the **OSM Place Search** functionality, you can
   click the close button to remove it from the main window. If you need to use
   it again, you can enable it from  :menuselection:`View --> Panels --> OSM
   place search..`.

.. image:: /static/downloading_osm_data/images/9.png
   :align: center

10. Choose the downloaded ``london.osm`` as the :guilabel:`Input XML file`.
    Name the :guilabel:`Output SpatiaLite DB file` as ``london.osm.db``. Make
    sure the :guilabel:`Create connection (SpatiaLite) after import` button is
    checked.

.. image:: /static/downloading_osm_data/images/10.png
   :align: center

11. Now the last step. We need to create SpatialLite geometry layers that can
    be viewed and analyzed in QGIS. This is done using :menuselection:`Vector
    --> OpenStreetMap --> Export topology to SpatialLite`.

.. image:: /static/downloading_osm_data/images/11.png
   :align: center

12. The ``london.osm.db`` file contains all feature types in the OSM database -
    Points, Lines and Polygons. GIS layers typically contain only one type of
    feature, so you need to choose one. Since we are interested in point
    locations of pubs, here you need to choose :guilabel:`Point (nodes)` as the
    :guilabel:`Export type`. You would choose :guilabel:`Polylines (open ways)`
    if you wanted to get the road network. Name the :guilabel:`Output layer
    name` as ``london_points``. GIS data has 2 parts to it - location and
    attributes. We are also interested in the **name** of the pub - not just
    its location, so we need to export that information as well. Click on
    :guilabel:`Load from DB` under :guilabel:`Exported tags` section. This will
    fetch all attributes from the ``london.osm.db`` file. Check
    :guilabel:`name` and :guilabel:`amenities` tags. See `OSM Tags
    <http://wiki.openstreetmap.org/wiki/Tags>`_ to learn more about what
    each attribute means. Make sure the :guilabel:`Load into canvas when
    finished` is checked, and click :guilabel:`OK`.

.. image:: /static/downloading_osm_data/images/12.png
   :align: center

13. You will see a new point layer named ``london_points`` loaded in QGIS. Note
    that this contains **ALL** points in the OSM database for the viewport.
    Since we are interested only in pubs, we need to write a query to select
    only those. Right click on ``london_points`` layer and select
    :guilabel:`Open Attribute Table`.

.. image:: /static/downloading_osm_data/images/13.png
   :align: center

14. You will note that some features have the attribute value of **pubs**
    listed under the :guilabel:`amenity` column. Click on :guilabel:`Select
    features using an expression` button.

.. image:: /static/downloading_osm_data/images/14.png
   :align: center

15. Enter the expression `"amenity" = 'pub'` and click :guilabel:`Select`.

.. image:: /static/downloading_osm_data/images/15.png
   :align: center

16. Back in the QGIS Canvas, you will see some points highlighted in yellow.
    These are the result of our query. Right-click the ``london_points`` layer
    and choose :guilabel:`Save Selection As...`.

.. image:: /static/downloading_osm_data/images/16.png
   :align: center

17. In te :guilabel:`Save vector layer as...` dialog, enter the name of the
    output file as ``london_pubs.shp``. Leave all other options as they are and
    make sure the :guilabel:`Add saved file to map` option is checked. Click
    :guilabel:`OK`.

.. image:: /static/downloading_osm_data/images/17.png
   :align: center

18. You will see a new layer named ``london_pubs`` in the QGIS canvas. uncheck
    the ``london_points`` layer as we don't need that anymore.

.. image:: /static/downloading_osm_data/images/18.png
   :align: center

19. The extraction of the pubs shapefile layer is now complete. You can use the
    :guilabel:`Identify` tool to click on any of the point as see its
    attributes.

.. image:: /static/downloading_osm_data/images/19.png
   :align: center
