Creating a Colorized River Basin Map (QGIS3)
===========================================

In this tutorial, we will learn the QGIS workflow to create artistic river maps for your own country or region using openly available hydrological data. 


.. note:: 
   
    This tutorial is inspired by the beautiful maps produced by `Grasshopper Geography <https://www.grasshoppergeography.com/>`_. I own one of their prints and you too can support their work by purchasing one of their maps from their `online store <https://www.etsy.com/shop/GrasshopperGeography>`_.

Overview of the task
--------------------

In this tutorial, we will take data layers of basins and rivers from HydroSHEDS and create a basin map for rivers of India.

  .. image:: /static/3/colorized_river_basin_map/images/rivers_of_india.png
    :align: center

Other skills you will learn
----------------------------

- How to assign projection to a vector layer with incorrect or missing projection.
- How to add multiple layers in a single GeoPackage.
- How to add a 'Made with QGIS' badge to your map.

Get the data
------------

`HydroSHEDS <https://www.hydrosheds.org/>`_ provides global hydrological datasets suitable for regional and global applications. The data layers are derived from hydrologically conditioned DEM from SRTM.

Basin Boundaries
^^^^^^^^^^^^^^^^

HydroBasins provides polygon boundaries of basins for different continents. The boundaries are hierarchical – each basin at Level N is further subdivided into smaller basins at Level N+1. For this tutorial, we will use the Level 6 basin boundaries. You can use different level depending on your region and type of map you want to create. Visit the `HydroBASINS <https://www.hydrosheds.org/products/hydrobasins>`_  page and download the zip file for your region. 

  .. image:: /static/3/colorized_river_basin_map/images/download1.png
    :align: center
    
River Network
^^^^^^^^^^^^^

HydroRIVERS provides a line shapefile representing the river network. Visit the `HydroRIVERS <https://www.hydrosheds.org/products/hydrorivers>`_ page and download the zip file for your region of interest.

  .. image:: /static/3/colorized_river_basin_map/images/download2.png
    :align: center
    
Administrative Boundary
^^^^^^^^^^^^^^^^^^^^^^^
We will clip the HydroSHEDS data to the boundary of your chosen region. In this tutorial, we want to create a river basin map of India, so we will get the boundary shapefile from Survey of India. Visit the `Outline Maps of India <https://surveyofindia.gov.in/pages/outline-maps-of-india>`_ page and download the India International Boundary Vector Format. If you need admin boundaries for other countries or states, you can get them from `GADM <https://gadm.org/>`_ or `geoBoundaries <https://www.geoboundaries.org/>`_.    

  .. image:: /static/3/colorized_river_basin_map/images/download3.png
    :align: center
    
Once all the files are downloaded, unzip them and copy them to a folder. You should now have 3 shapefiles: ``hybas_as_lev06_v1c.shp``, ``HydroRIVERS_v10_as.shp`` and admin boundaries ```polymap15m_area.shp```.

  .. image:: /static/3/colorized_river_basin_map/images/download4.png
    :align: center
    
Data Sources: [HYDROSHEDS]_, [SOI]_


Procedure
---------

1. Open QGIS and locate the downloaded files in the QGIS :guilabel:`Browser`. Drag and drop ``hybas_as_lev06_v1c.shp`` and ``HydroRIVERS_v10_as.shp`` to the canvas.

  .. image:: /static/3/colorized_river_basin_map/images/1.png
    :align: center

2. Locate the administrative boundaries shapefile ``polymap15m_area.shp`` and drag-and-drop it to the canvas.

  .. image:: /static/3/colorized_river_basin_map/images/2.png
    :align: center
    
3. The HydroSHEDS data layers have some features with invalid geometries Let's fix them proceeding further. Open the Processing Toolbox from :menuselection:`Processing --> Toolbox`. Search and locate the :menuselection:`Vector geometry --> Fix geometries` tool. Double-click to launch it.

  .. image:: /static/3/colorized_river_basin_map/images/3.png
    :align: center
    
.. note::

    You can review the tutorial :doc:`handling_invalid_geometries` to learn more about the causes and fixes for invalid geometries.

4.  Select ``hybas_as_lev06_v1c`` as the :guilabel:`Input layer`. Click the :guilabel:`...` button next to :guilabel:`Fixed geometries` and select :guilabel:`Save to GeoPackage...`.

  .. image:: /static/3/colorized_river_basin_map/images/4.png
    :align: center

5. Browse to the location where you want to save the output data and enter the name ``data.gpkg``. Click :guilabel:`Save`. You will be prompted to enter a :guilabel:`Layer name`. Enter ``basins_fixed``. Click :guilabel:`OK`. Next click :guilabel:`Run` to run the algorithm and generate the output layer.

  .. image:: /static/3/colorized_river_basin_map/images/5.png
    :align: center

6. Repeat the step for the ``HydroRIVERS_v10_as`` layer. Select the same GeoPackage ``data.gpkg`` that was created in the previous step. Do not worry if you get a message indicating that the file will be overwritten. QGIS will not overwrite the file, but append a new layer to the same GeoPackage. This time use ``rivers_fixed`` as the :guilabel:`Layer name`.

  .. image:: /static/3/colorized_river_basin_map/images/6.png
    :align: center

7. The ``polymap15m_area`` layer comes with a projection that is not recognized by QGIS. We will assign a known projection to this layer. Search and locate the :menuselection:`Vector general --> Assign projection` tool and double-click to open it. 

  .. image:: /static/3/colorized_river_basin_map/images/7.png
    :align: center

.. note:: 

    Remember that *Assign projection* tool does not reproject the layer but simply adds the correct projection information to an existing georeferenced layer with missing or incorrect projection. Use the *Reproject layer* tool if you want to change the CRS of a layer.
    
8. Select ``polymap15m_area`` as the :guilabel:`Input layer`. Click the :guilabel:`Select CRS` button and search for the ``EPSG:7755 - WGS 84 / India NSF LCC`` projection and select it. Click the :guilabel:`...` button next to :guilabel:`Assigned CRS` and select :guilabel:`Save to GeoPackage...`. 

  .. image:: /static/3/colorized_river_basin_map/images/8.png
    :align: center

9. Select the same GeoPackage ``data.gpkg`` and enter the layer name ``admin_boundary_fixed``. Click :guilabel:`Run`.

  .. image:: /static/3/colorized_river_basin_map/images/9.png
    :align: center

10. You will now have 3 new layers ``basins_fixed``, ``rivers_fixed`` and ``admin_boundary_fixed`` loaded to the :guilabel:`Layers` panel in QGIS. Hold the :kbd:`Shift` key and select all remaining layers. Right-click and choose :guilabel:`Remove Layer...`.

  .. image:: /static/3/colorized_river_basin_map/images/10.png
    :align: center

11. We will now clip the basins and rivers layers to the administrative boundary. Search and locate the :menuselection:`Vector overlay --> Clip` tool from the Processing Toolbox. Double-click to open it.

  .. image:: /static/3/colorized_river_basin_map/images/11.png
    :align: center

12. Select ``basins_fixed`` as the :guilabel:`Input layer` and ``admin_boundary_fixed`` as the :guilabel:`Overlay layer`. Save the output to the same GeoPackage ``data.gpkg`` as the layer ``basins_clipped``. Click :guilabel:`Run`.

  .. image:: /static/3/colorized_river_basin_map/images/12.png
    :align: center

13. Once the processing finishes, repeat the process with the ``rivers_fixed`` layer as the :guilabel:`Input layer`.  Save the output to the same geopackage ``data.gpkg`` as the layer ``rivers_clipped``. Click :guilabel:`Run`.

  .. image:: /static/3/colorized_river_basin_map/images/13.png
    :align: center

14. You will now have 2 new layers ``basins_clipped`` and ``rivers_clipped``, as well as ``admin_boundary_fixed`` layer loaded to the :guilabel:`Layers` panel in QGIS. Hold the :kbd:`Shift` key and select all remaining layers. Right-click and choose :guilabel:`Remove Layer...`.

  .. image:: /static/3/colorized_river_basin_map/images/14.png
    :align: center

15. Before we proceed further, let's save the project. QGIS allows you to save a project inside of a GeoPackage - making it very convenient to avoid managing additional files. Go to :menuselection:`Project --> Save To --> GeoPackage...`.

  .. image:: /static/3/colorized_river_basin_map/images/15.png
    :align: center

16. In the :guilabel:`Save project to GeoPackage` dialog, click the :guilabel:`...` button next to :guilabel:`Connection` and browse to the existing ``data.gpkg`` file. Enter the name ``rivers_basin_map`` as the :guilabel:`Project` name. Click :guilabel:`OK`.

  .. image:: /static/3/colorized_river_basin_map/images/16.png
    :align: center

17. Once saved, you can expand the ``data.gpkg`` in the :guilabel:`Browser` panel and see that the QGIS project is now saved inside the GeoPackage. Users of this GeoPackage can now open the project directly from the GeoPackage.

  .. image:: /static/3/colorized_river_basin_map/images/17.png
    :align: center

18. To create our colorized map, we need to color all the basins such that no adjacent basins have the same color. QGIS has a tool to do just that. Open the :menuselection:`Cartography --> Topological coloring` tool from the Processing Toolbox.

  .. image:: /static/3/colorized_river_basin_map/images/18.png
    :align: center

19. Select ``basins_clipped`` as the :guilabel:`Input layer`. Leave other options to their default values. Save the output to the same GeoPackage ``data.gpkg`` as the layer ``basins_with_color``. Click :guilabel:`Run`.

  .. image:: /static/3/colorized_river_basin_map/images/19.png
    :align: center

20. Once the processing finishes, a new layer ``basins_with_color`` will be loaded to the :guilabel:`Layers` panel. Right-click the layer and select :guilabel:`Open Attribute Table`. You will notice that the layer has a new attribute named ``color_id`` with an integer value. Assigning a unique color to each integer value will result in topolocal coloring of the layer.

  .. image:: /static/3/colorized_river_basin_map/images/20.png
    :align: center

21. We want to transfer the color id for the basin to all the rivers contained within it. Open the :menuselection:`Vector general --> Join attributes by location` tool from the Processing Toolbox.

  .. image:: /static/3/colorized_river_basin_map/images/21.png
    :align: center
    
22. Here we want to select ``rivers_clipped`` as the layer to :guilabel:`Join to features in` and ``basins_with_color`` as the layer for :guilabel:`By comparing to`. In the :guilabel:`Fields to add` section, click the :guilabel:`...` button and select the ``color_id`` field. Save the output to the ``data.gpkg`` geopackage as the layer ``rivers_with_color``. Click :guilabel:`Run`.

  .. image:: /static/3/colorized_river_basin_map/images/22.png
    :align: center
    
23. Once the processing finishes, a new layer ``rivers_with_color`` will be loaded to the :guilabel:`Layers` panel. Now it is time to apply the symbology. Select the ``admin_boundary_fixed`` layer and click the :guilabel:`Open Layer Styling Panel` button in the :guilabel:`Layers` panel. Change the color to black.

  .. image:: /static/3/colorized_river_basin_map/images/23.png
    :align: center
    
24. Next, select the ``rivers_with_color`` layer and select the ``Categorized`` renderer. 

  .. image:: /static/3/colorized_river_basin_map/images/24.png
    :align: center
    
25. Select ``color_id`` as the :guilabel:`Value` and click :guilabel:`Classify`. You will see the rivers in different basins will be assigned a different color.

  .. image:: /static/3/colorized_river_basin_map/images/25.png
    :align: center

.. note::

    If you are not happy with the randomly chosen colors, you can click the :guilabel:`Symbol` for individual values in the list below and choose your own color.
    
26. The default lines are too thick for our map. Let's change it. Hold the :kbd:`Shift` key and select all the symbols in the list. Click the :guilabel:`Symbol` to open the :guilabel:`Symbol Settings`.

  .. image:: /static/3/colorized_river_basin_map/images/26.png
    :align: center
    
27. Click on :guilabel:`Simple Line` and change the stroke width to ``0.1``. The map will look much better now.

  .. image:: /static/3/colorized_river_basin_map/images/27.png
    :align: center
    
28. We can improve the map by assigning different widths to the rivers based on their size. The ``rivers_with_color`` layer has a field ``ORD_STRA`` containing the value of the `Strahler Order <https://en.wikipedia.org/wiki/Strahler_number>`_ of the river. The larger the number, the bigger the river. We will use the Assistant to help us use the value of the strahler order to an appropriate stroke width. Click the :guilabel:`Data defined override` button next to :guilabel:`Stroke width` and select :guilabel:`Assistant...`.

  .. image:: /static/3/colorized_river_basin_map/images/28.png
    :align: center
    
29. In the :guilabel:`Input` section, select the ``ORD_STRA`` field as the :guilabel:`Source` with :guilabel:`Values from` ``1`` to :guilabel:`to` ``6``. In the :guilabel:`Output` section, choose :guilabel:`Size from` as ``0.05`` and :guilabel:`to` as ``0.2``. The map will update dynamically as you enter the values. You may have to adjust these values depending on your region. Once you are happy with the map, click the :guilabel:`Back` button.

  .. image:: /static/3/colorized_river_basin_map/images/29.png
    :align: center
    
30. You will notice that the :guilabel:`Data defined override` button for :guilabel:`Stroke width` is now yellow, indicating an active override has been applied to this setting.

  .. image:: /static/3/colorized_river_basin_map/images/30.png
    :align: center
    
31. Our colorized river basin map is now ready. Let's put this map in a layout so we can export a high-resolution version with other map elements. Go to :menuselection:`Project --> New Print Layout...`. When prompted to enter a name, leave it blank and click :guilabel:`OK`.

  .. image:: /static/3/colorized_river_basin_map/images/31.png
    :align: center
 
32. In the :guilabel:`Layout 1` window, right-click on the blank canvas and choose :guilabel:`Page Properties...`.

  .. image:: /static/3/colorized_river_basin_map/images/32.png
    :align: center
 
33. Choose ``A4`` as the :guilabel:`Size`. Change the :guilabel:`Background` color to black.

  .. image:: /static/3/colorized_river_basin_map/images/33.png
    :align: center
 
34. Go to :menuselection:`Add Item --> Add Map`.

  .. image:: /static/3/colorized_river_basin_map/images/34.png
    :align: center
 
35. Hold the left mouse button and select a region on the canvas where you want the map to be placed.

  .. image:: /static/3/colorized_river_basin_map/images/35.png
    :align: center
 
36. Once the map appears, scroll down in the :guilabel:`Item Properties` tab and turn off the :guilabel:`Background`. 

  .. image:: /static/3/colorized_river_basin_map/images/36.png
    :align: center
 
.. note::

    If you do not see the :guilabel:`Item Properties` tab or close it by accident, you can get it back by going to :menuselection:`View --> Panels --> Item Properties` in the Layout menu. 
    
37. Let's adjust the map extents. Click on the :guilabel:`Interactively Edit Map Extent` button and then use the mouse to pan the map. You can also use your scroll wheel to adjust the zoom. If you want more finer control on the Zoom, adjust the :guilabel:`Scale` value manually. Repeat till you are happy with the map placement.

  .. image:: /static/3/colorized_river_basin_map/images/37.png
    :align: center
 
38. Next we will add a QGIS logo to the map. Go to :menuselection:`Add Item --> Add Picture`.

  .. image:: /static/3/colorized_river_basin_map/images/38.png
    :align: center
 
39. Draw a rectangle where you want to place the logo. In the :guilabel:`Item Properties` dialog, locate the :guilabel:`logos` icon group. Select the ``Made with QGIS`` logo.

  .. image:: /static/3/colorized_river_basin_map/images/39.png
    :align: center
 
40. Next, we will add a label with data credits. Go to :menuselection:`Add Item --> Add Label`. Enter the text for data credits and adjust the font and label alignment.

  .. image:: /static/3/colorized_river_basin_map/images/40.png
    :align: center
 
41. Once you are ready to export the results, go to :menuselection:`Layout --> Export as Image...`. Browse to a folder on your computer where you want to save the PNG image and enter the name ``river_basins.png``.

  .. image:: /static/3/colorized_river_basin_map/images/41.png
    :align: center
 
42. Choose ``300 dpi`` as the :guilabel:`Export resolution` and click :guilabel:`Save`.

  .. image:: /static/3/colorized_river_basin_map/images/42.png
    :align: center
 
43. Once the export finishes, you will have your final map image at the chosen location.

  .. image:: /static/3/colorized_river_basin_map/images/43.png
    :align: center
 
44. Here's the final PNG image that we created using QGIS and open datasets.

  .. image:: /static/3/colorized_river_basin_map/images/44.png
    :align: center
