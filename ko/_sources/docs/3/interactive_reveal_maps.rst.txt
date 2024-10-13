Making Interactive Reveal Maps (QGIS3)
======================================

This tutorial shows how to use a dynamic mask layer in a layer group along with expressions to make an interactive map that reveal the layers beneath the current layer as you move your cursor around. This is done using the new `mask blending modes <https://changelog.qgis.org/en/entry/2154>`_ in QGIS along with technique for adding interactivity shown in the previous tutorial on :doc:`interactive_canvas_maps`.

This tutorial is inspired from `Hamish Campbell <https://www.linkedin.com/in/hncampbell/>`_ who shared his interactive visualization on LinkedIn.

Overview of the task
--------------------

We will load 2 raster tile layers and use a mask layer with geometry generator symbology to reveal the below layer as the cursor moves around on the canvas.

.. image:: /static/3/interactive_reveal_maps/images/output.gif
  :align: center
	

Procedure
---------

1. We will start by loading 2 raster layers. One layer at the top and another one at the bottom that will be revealed by the mask layer. We will get these from the QuickMapServices plugin. Search and install the **QuickMapServices** plugin from the QGIS Official Plugin Repository. See :doc:`using_plugins` for instructions on installing plugins. Once installed, we will need to add some additional service to this plugin. Go to :menuselection:`Web --> QuickMapServices --> Settings`.

  .. image:: /static/3/interactive_reveal_maps/images/1.png
    :align: center
    
2. In the :guilabel:`QuickMapServices Settings` dialog, switch to the :guilabel:`More Services` tab and click the :guilabel:`Get contributed pack` button. This step is required to get access to the Google Satellite basemap.

  .. image:: /static/3/interactive_reveal_maps/images/2.png
    :align: center

3. Now we are ready to add the layers. The top layer in our map will be the OpenStreetMap layer. Go to :menuselection:`Web --> QuickMapServices --> OSM --> OSM Standard` to add it. Zoom and center the map to any location of your choice.

  .. image:: /static/3/interactive_reveal_maps/images/3.png
    :align: center

4. Next add the Google Satellite layer from :menuselection:`Web --> QuickMapServices --> Google --> Google Satellite`. This will be the bottom layer that will be revealed using the mask.

  .. image:: /static/3/interactive_reveal_maps/images/4.png
    :align: center

5. We will create a new layer that will act as the mask. Go to :menuselection:`Layer --> Create Layer --> New GeoPackage Layer...`.

  .. image:: /static/3/interactive_reveal_maps/images/5.png
    :align: center

6. In the :guilabel:`New GeoPackage Layer` dialog, click the :guilabel:`...` button for :guilabel:`Database` and browse to a directory on your computer. Save the layer as ``mask.gpkg``. Change the :guilabel:`Geometry type` to ``Polygon`` and the CRS to be ``Project CRS: EPSG:3857 - WGS84 / Pseudo-Mercator``. Having this layer in a Projected CRS is helpful as it allows us to specify the radius of the mask in meters as opposed to degrees. Click :guilabel:`OK`.

  .. image:: /static/3/interactive_reveal_maps/images/6.png
    :align: center

7. A new layer ``mask`` will be added to the :guilabel:`Layers` panel. Click the :guilabel:`Open the Layer Styling Panel` button. Click on :guilabel:`Single Symbol` to see additional options for renderers.

  .. image:: /static/3/interactive_reveal_maps/images/7.png
    :align: center

8. Select ``Inverted Polygons`` as the renderer. Scroll down and click on the :guilabel:`Simple Fill` to see additional symbol layer types.

  .. image:: /static/3/interactive_reveal_maps/images/8.png
    :align: center

.. note::

  The inverted polygon renderer is used to show regions outside the feature. In our case, the ``mask`` layer is empty so the *inverted* region is the whole canvas. That is why you see the whole canvas rendered using the chosen symbology. We use this renderer for the tutorial since it can render the map without needing any features being present in the layer and will work anywhere in the world.
  
9. Select ``Geometry Generator`` as the :guilabel:`Symbol layer type`. We will now enter an expression to change how the layer is rendered. Click the :guilabel:`Expression` button.

  .. image:: /static/3/interactive_reveal_maps/images/9.png
    :align: center

10. Enter the following expression in the :guilabel:`Expression Builder` dialog. This expression will create a buffer polygon with a radius of 5000 meters around the current position of the cursor. Click :guilabel:`OK`.

  .. code-block:: none

     buffer(@canvas_cursor_point, 5000)

  .. image:: /static/3/interactive_reveal_maps/images/10.png
    :align: center

11. You will see a circular polygon rendered wherever you click on the canvas. Adjust the size of the buffer if required for your region and close the :guilabel:`Layer Styling Panel`. To use the mask blending modes, we must create a layer group. Hold the :kbd:`Ctrl` key and select the ``mask`` and the ``OSM Standard`` layers. Right-click on the selected layers and choose :guilabel:`Group Selected`.

  .. image:: /static/3/interactive_reveal_maps/images/11.png
    :align: center

 
12. A new layer group will be created. Enter the name as ``mask_group``. Click the :guilabel:`Open the Layer Styling Panel` button. 

  .. image:: /static/3/interactive_reveal_maps/images/12.png
    :align: center

13. Check the :guilabel:`Render Layers as a Group` button. This step enables the mask blending modes for the layers in this group.

  .. image:: /static/3/interactive_reveal_maps/images/13.png
    :align: center

14. Select the ``mask`` layer from ``mask_group``. In the :guilabel:`Layer Styling` panel, scroll down and expand the :guilabel:`Layer Rendering` section.

  .. image:: /static/3/interactive_reveal_maps/images/14.png
    :align: center

15. Click the dropdown selector for the :guilabel:`Layer` :guilabel:`Blending Mode`. Select the ``Inverse Mask Below`` blending mode. The layer below the layer group will now be revealed in the portion covered by the buffer polygon.

  .. image:: /static/3/interactive_reveal_maps/images/15.png
    :align: center

16. The map canvas doesn't yet respond to the cursor movement because it doesn't refresh unless you move the map. Let's make it auto-refresh. Right-click the ``mask`` layer and select :guilabel:`Properties`.

  .. image:: /static/3/interactive_reveal_maps/images/16.png
    :align: center

17. Switch to the :guilabel:`Rendering` tab. Scroll down and check the :guilabel:`Refresh layer at interval`. Set the interval to a small number such as ``0.1`` (i.e. 100ms) and click :guilabel:`OK`.

  .. image:: /static/3/interactive_reveal_maps/images/17.png
    :align: center

18. Now as you move your cursor, the region below your cursor position will be interactively revealed.

  .. image:: /static/3/interactive_reveal_maps/images/output.gif
    :align: center
