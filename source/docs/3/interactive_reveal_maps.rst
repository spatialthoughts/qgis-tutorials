Making Interactive Reveal Maps (QGIS3)
======================================

This tutorial shows how to use a dynamic mask layer in a layer group along with expressions to make an interactive map that reveal the layers beneath the current layer as you move your cursor around. This is done using the new `mask blending modes <https://changelog.qgis.org/en/entry/2154>`_ in QGIS along with the `@canvas_cursor_point` variable that we learnt in the previous tutorial on :doc:`interactive_canvas_maps`.

This tutorial is inspired from `Hamish Campbell <https://www.linkedin.com/in/hncampbell/>`_ interactive visualization shared on LinkedIn.

Overview of the task
--------------------

We will load 2 raster tile layers and use a mask layer with geometry generator symbology to reveal the below layer as the cursor moves around on the canvas.

.. image:: /static/3/interactive_reveal_maps/images/output.gif
  :align: center
	

Procedure
---------

1. We will start by loading 2 raster layers. One layer at the top and another one at the bottom that will be revealed by the mask layer. We will get these from the QuickMapServices plugin. Search and install the **QuickMapServices** plugin from the QGIS Official Plugin Repository. See :doc:`../using_plugins` for instructions on installing plugins. Once installed, we will need to add some additional service to this plugin. Go to :menuselection:`Web --> QuickMapServices --> Settings`.

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

6. In the :guilabel:`New GeoPackage Layer` dialog, click the :guilabel:`...` button for :guilabel:`Database` and browse to a directory on your computer. Save the layer as ``point.gpkg``. Change the CRS to be **Project CRS: EPSG:3857 - WGS84 / Pseudo-Mercator**. Having this layer in a Projected CRS is helpful as it allows us to specify the radius of the mask in meters as opposed to degrees. Click :guilabel:`OK`.

  .. image:: /static/3/interactive_reveal_maps/images/6.png
    :align: center

7. A new layer ``point`` will be added to the :guilabel:`Layers` panel. Locate the :guilabel:`Digitizing Toolbar` and click the :guilabel:`Toggle Editing` button. Next, click the :guilabel:`Add Point Feature` button.

  .. image:: /static/3/interactive_reveal_maps/images/7.png
    :align: center

8. Click on the canvas to add a point. Once the :guilabel:`Attribute Form` pops-up, click :guilabel:`OK`.

  .. image:: /static/3/interactive_reveal_maps/images/8.png
    :align: center

9. On the :guilabel:`Digitizing Toolbar`, click the :guilabel:`Save Layer Edits` button followed by the :guilabel:`Toggle Editing` button.

  .. image:: /static/3/interactive_reveal_maps/images/9.png
    :align: center

10. We now have a point on the map that we will render as a circular buffer using Geometry Generator renderer. Click the :guilabel:`Open the Layer Styling Panel` button. Click on :guilabel:`Simple Marker` to see additional options. Click the dropdown next to :guilabel:`Symbol layer type` to see all available sub-renderers.

  .. image:: /static/3/interactive_reveal_maps/images/10.png
    :align: center

11. Select ``Geometry Generator`` as the :guilabel:`Symbol layer type`. Since we want to render this point as a circular polygon, change the :guilabel:`Geometry type` to ``Polygon / MultiPolygon``. We will now enter an expressions to change the geometry of the features in this layer. Click the :guilabel:`Expression` button.

  .. image:: /static/3/interactive_reveal_maps/images/11.png
    :align: center

12. Enter the following expression in the :guilabel:`Expression Builder` dialog. This expression will create a buffer polygon with a radius of 5000 meters. Click :guilabel:`OK`.

  .. code-block:: none

     buffer(@geometry, 5000)

  .. image:: /static/3/interactive_reveal_maps/images/12.png
    :align: center

13. Adjust the size of the buffer if required for your region and close the :guilabel:`Layer Styling Panel`. To use the mask blending modes, we must create a layer group. Hold the :kbd:`Ctrl` key and select the ``point`` and the ``OSM Standard`` layers. Right-click on the selected layers and choose :guilabel:`Group Selected`.

  .. image:: /static/3/interactive_reveal_maps/images/13.png
    :align: center

14. A new layer group will be created. Enter the name as ``mask``. Click the :guilabel:`Open the Layer Styling Panel` button. 

  .. image:: /static/3/interactive_reveal_maps/images/14.png
    :align: center

15. Check the :guilabel:`Render Layers as a Group` button. This step enables the mask blending modes for the layers in this group.

  .. image:: /static/3/interactive_reveal_maps/images/15.png
    :align: center

16. Select the ``point`` layer from the ``mask`` group. In the :guilabel:`Layer Styling` panel, scropp down and expand the :guilabel:`Layer Rendering` section.

  .. image:: /static/3/interactive_reveal_maps/images/16.png
    :align: center

17. Click the dropdown selector for the :guilabel:`Layer` :guilabel:`Blending Mode`. 

  .. image:: /static/3/interactive_reveal_maps/images/17.png
    :align: center

18. Select the ``Inverse Mask Below`` blending mode. The layer below the layer group will now be revealed in the portion covered by the buffer polygon.

  .. image:: /static/3/interactive_reveal_maps/images/18.png
    :align: center

19. This itself is useful in creating maps where you want to draw the attention of the reader to a specifc portion. We will now make this map interactive. Instead of revelaing the buffer region around the point we added, we will now update the expression to reveal the portion around the current position of the cursor. Scroll up and select the :guilabel:`Geometry Generator` symbol. Click the :guilabel:`Expression` button.

  .. image:: /static/3/interactive_reveal_maps/images/19.png
    :align: center

20. Enter the following expression which replaces ``@geometry`` with ``@canvas_cursor_point`` variable.

  .. code-block:: none

     buffer(@canvas_cursor_point, 5000)

  .. image:: /static/3/interactive_reveal_maps/images/20.png
    :align: center

21. The map canvas doesn't yet respond to the cursor movement because it doesn't refresh unless you move the map. Let's make it auto-refresh. Right-click the ``point`` layer and select :guilabel:`Properties`.

  .. image:: /static/3/interactive_reveal_maps/images/21.png
    :align: center

22. Switch to the :guilabel:`Rendering` tab. Scroll down and check the :guilabel:`Refresh layer at interval`. Set the interval to a small number such as ``0.1`` (i.e. 100ms) and click :guilabel:`OK`.

  .. image:: /static/3/interactive_reveal_maps/images/22.png
    :align: center

23. Now as you move your cursor, the region below your cursor position will be interactively revealed.

  .. image:: /static/3/interactive_reveal_maps/images/output.gif
    :align: center

.. note::

   This setup works as long as the original point feature that we added is visible in the map extent. If the point is no longer visible, the layer doesn't render the mask. If you want this to work anywhere in the world, use a global layer (such as country boundaries) instead of the point layer.