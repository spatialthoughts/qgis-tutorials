Creating Isometric Buildings (QGIS3)
====================================
*Contributed by:* `Steven Kim <https://geographyclub.github.io/>`_

OpenStreetMap (OSM) is a crowd-sourced global dataset of roads, boundaries, buildings and more. It has a growing collection of building footprints across the world with many of them also having height information. While the accuracy of building height data is notoriously difficult to validate for analysis, we can use QGIS expressions to create a fun artistic isometric rendering from this data.


Overview of the task
--------------------

We will download building footprints data from OSM for downtown Toronto and create an isometric map of building heights.

.. image:: /static/3/isometric_buildings/images/output.png
  :align: center
	
Get the data
------------

We will be downloading data from OpenStreetMap(OSM) using the **QuickOSM** plugin. See :doc:`downloading_osm_data` for an introduction to the QuickOSM plugin. Once you have installed the plugin, you can proceed with the instructions below to obtain data for your region.

.. note::

  This tutorial is specifically designed to work with the OSM data extracted from the QuickOSM plugin. The height expression does not work with OSM planet files or data extracts with other_tags. In those cases you first need to extract building levels and heights before using them.

1. Open QGIS. We’ll first load a basemap. From the :guilabel:`Browser` panel, scroll down and locate :menuselection:`XYZ Tiles --> OpenStreetMap` tile layer. Drag and drop it to the main canvas. Zoom to your region of interest. Make sure the region is fully covered by the map extent. 

.. image:: /static/3/isometric_buildings/images/data1.png
  :align: center
	
2. Launch the QuickOSM plugin from :menuselection:`Vector --> QuickOSM --> QuickOSM...`.

.. image:: /static/3/isometric_buildings/images/data2.png
  :align: center
	
3. In the :guilabel:`Quick query` tab, enter ``building`` as the :guilabel:`Key`. Change the :guilabel:`In` to :guilabel:`Canvas Extent`. This will download all buildings in the current canvas extent. Expand the :guilabel:`Advanced` section, then unclick :guilabel:`Points`, :guilabel:`Lines` and :guilabel:`Multilinestrings`. This should leave :guilabel:`Nodes`, :guilabel:`Ways`, :guilabel:`Relations` and :guilabel:`Multipolygons` selected. Select `Run query`. Close the window once the map is loaded.

.. image:: /static/3/isometric_buildings/images/data3.png
  :align: center
	
4. All the available building footprints in the canvas extent will be loaded in a new layer ``building``. You can continue with the data, or select a subset of the buildings. For this tutorial, we will select all buildings in your region of interest. Click the :guilabel:`Select Features by Area or Single Click` button on the :guilabel:`Selection Toolbar`. You can hold the left mouse button and draw a rectangle to select the required buildings. You can also hold the :kbd:`Shift` key and click on the polygons to select them.

.. image:: /static/3/isometric_buildings/images/data4.png
  :align: center
	
5. Once all the required buildings are selected, right click the ``building`` layer and select :menuselection:`Export --> Save Selected Features As...`.

.. image:: /static/3/isometric_buildings/images/data5.png
  :align: center
	
6. In the :guilabel:`Save Vector Layer As...` dialog, click the :guilabel:`...` button next to :guilabel:`File name` and browse to a folder on your computer. Enter the :guilabel:`File name` as ``osm_buildings.gpkg`` and :guilabel:`Layer name` as ``buildings``. The downloaded buildings are in the CRS *EPSG:4326 WGS84*. This is a Geographic CRS with units in degrees. We can choose a Projected CRS which will allow us to use linear units of measurement such as meters. Click the dropdown menu for  :guilabel:`Select CRS` and choose ``Project CRS: EPSG:3857 - WGS84 / Pseudo-Mercator``. Click :guilabel:`OK`.

.. image:: /static/3/isometric_buildings/images/data6.png
  :align: center
	
7. The selected buildings will be reprojected and saved to a new geopackage file.

.. image:: /static/3/isometric_buildings/images/data7.png
  :align: center
	
For convenience, you may directly download a copy of the downtown toronto buildings from below:

`osm_buildings.gpkg <https://www.qgistutorials.com/downloads/osm_buildings.gpkg>`_

Data Source [OPENSTREETMAP]_


Procedure
---------

1. Locate the ``osm_buildings.gpkg`` file in the QGIS Browser and expand it. Select the ``buildings`` layer and drag it to the canvas. 

    .. image:: /static/3/isometric_buildings/images/1.png
      :align: center
	
2. Click on :guilabel:`Open Layer Styling Panel` and switch from :guilabel:`Single Symbol` to :guilabel:`2.5 D`. 

    .. image:: /static/3/isometric_buildings/images/2.png
      :align: center
	
3. Click the :guilabel:`ε` button next to :guilabel:`Height`.

    .. image:: /static/3/isometric_buildings/images/3.png
      :align: center
	
4. In the :guilabel:`Expression Builder`, enter the following expression. This expression applies a multiplier to the first non-null field from ``building:levels`` and ``height``. If both are null, then a default height of **20** meters is used. Keep in mind these are exaggerated heights for visualizing at larger scales.

  .. code-block:: none

    coalesce("building:levels"*10, "height"*2, 20)

  .. image:: /static/3/isometric_buildings/images/4.png
      :align: center
            
5. Change the :guilabel:`Angle` to ``135`` degrees.

    .. image:: /static/3/isometric_buildings/images/5.png
      :align: center
	
6. Un-check the :guilabel:`Shade walls based on aspect` and :guilabel:`Shadow`. We will be appling our own colors. Click on the dropdown for selecting the renderer.

    .. image:: /static/3/isometric_buildings/images/6.png
      :align: center
        
7. Change from :guilabel:`2.5 D` back to :guilabel:`Single Symbol`.

    .. image:: /static/3/isometric_buildings/images/7.png
      :align: center
	
8. In the :guilabel:`Symbol` window, notice there are two Geometry Generators, each with a :guilabel:`Simple Fill` layer type. The first :guilabel:`Simple Fill` is the top face of each block, whereas the second :guilabel:`Simple Fill` is the side face. Click on the first :guilabel:`Simple Fill` to change the color of the top face. Click on :guilabel:`Data define override` button for the :guilabel:`Fill color` and select :guilabel:`Edit...` on the menu.

    .. image:: /static/3/isometric_buildings/images/8.png
      :align: center
        
9. This brings up the :guilabel:`Expression Builder` dialog for Fill color. Enter the following expression. This expression applies the **Spectral** color ramp to the data based on its distance from the map center.

  .. code-block:: none

    ramp_color('Spectral',
        scale_linear(
            distance(@geometry,@map_extent_center),
            0,@map_extent_width/6,
            0,1
        )
    )


  .. image:: /static/3/isometric_buildings/images/9.png
      :align: center
	    
10. Click on :guilabel:`Data define override` button for the :guilabel:`Fill color` and select :guilabel:`Copy...` on the menu.

    .. image:: /static/3/isometric_buildings/images/10.png
      :align: center
        
11. Click on :guilabel:`Data define override` button for the :guilabel:`Stroke color` and select :guilabel:`Paste...` on the menu to apply the same expression.

    .. image:: /static/3/isometric_buildings/images/11.png
      :align: center
	
12. Now click on the second :guilabel:`Simple Fill` to change the sides. You may have to scroll down to do this. Click on the dropdown menu for the :guilabel:`Symbol Layer Type`.

    .. image:: /static/3/isometric_buildings/images/12.png
      :align: center
        
13. Change the :guilabel:`Symbol Layer Type` from :guilabel:`Simple Fill` to :guilabel:`Gradient Fill`. The two color selectors beside the :guilabel:`Two color` represent the top and bottom colors of the gradient. Click on :guilabel:`Data define override` button for the top color.

    .. image:: /static/3/isometric_buildings/images/13.png
      :align: center
	
14. Select :guilabel:`Edit` and enter the following expression. This is the same expression that we used for the roof color but adjusts the transparency of the color using the ``set_color_part()`` function.


    .. code-block:: none

    set_color_part(
        ramp_color('Spectral',
            scale_linear(
                distance(@geometry,@map_extent_center),
                0,@map_extent_width/6,
                0,1
            )
        ), 'alpha',100)
    
    .. image:: /static/3/isometric_buildings/images/14.png
      :align: center
	
    
15. Click on the small black triangle of the bottom color selector and check :guilabel:`Transparent` box. 

    .. image:: /static/3/isometric_buildings/images/15.png
      :align: center
	
16. Before exiting the `Layer Styling Panel`, let's transform the layer to complete the isometric look. Expand the :guilabel:`Layer Rendering` section and check :guilabel:`Draw Effects`. Click on the :guilabel:`Customize Effects` star on the right.

    .. image:: /static/3/isometric_buildings/images/16.png
      :align: center
	
17. Click on the dropdown menu next to :guilabel:`Effect Type`.

    .. image:: /static/3/isometric_buildings/images/17.png
      :align: center
	
18. Change the `Effect Type` from `Source` to `Transform`. For :guilabel:`Shear X,Y`, enter `-0.2` and `-0.2` respectively.

    .. image:: /static/3/isometric_buildings/images/18.png
      :align: center
	
19. Enter ``45`` for :guilabel:`Rotation`. Exit and close the :guilabel:`Layer Styling Panel`.

    .. image:: /static/3/isometric_buildings/images/19.png
      :align: center
	
20. You should see a colorful representation of building polygons in isometric view. Feel free to experiment with the expressions for height, angle, fill colors and so on.

    .. image:: /static/3/isometric_buildings/images/20.png
      :align: center
	
