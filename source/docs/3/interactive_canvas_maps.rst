Making Interactive Canvas Maps (QGIS3)
=====================================

This tutorial shows how to make features dynamically update as you move your cursor in the QGIS Canvas. We will implement canvas brushing using expressions to make features respond to the cursor movement.

Overview of the task
--------------------

We will create a grid of QGIS icons and apply a data defined override for icon rotation to make the icons follow the cursor movement.

.. image:: /static/3/interactive_canvas_maps/images/output.gif
  :align: center
	
    
Procedure
---------

1. We will start by creating a grid. To make our grid with global extents, we can load the world map on the canvas. You can type ``world`` in the coordinates box at the bottom of the QGIS window and press :guilabel:`Enter`. 
This is one of the several hidden *easter eggs* in QGIS. You can discover other easter eggs on our `YouTube Channel <https://www.youtube.com/watch?v=3zLb8ar7jvg&list=PLppGmFLhQ1HIqNiNWxVqs5wBLiA_UrKTQ&index=13>`_.

  .. image:: /static/3/interactive_canvas_maps/images/1.png
    :align: center

2. A new layer ``World Map`` will be added to the QGIS :guilabel:`Layers` panel. Go to :menuselection:`Processing --> Toolbox`. 

  .. image:: /static/3/interactive_canvas_maps/images/2.png
    :align: center
    
3. Search and locate the :menuselection:`Vector creation --> Create grid` algorithm. Double-click to open it.

  .. image:: /static/3/interactive_canvas_maps/images/3.png
    :align: center
    
4. In the :guilabel:`Create grid` dialog, click on the dropdown menu :menuselection:`Calculate from layer --> World Map`.

  .. image:: /static/3/interactive_canvas_maps/images/4.png
    :align: center
    
5.  Next, set the :guilabel:`Horizonal spacing` and :guilabel:`Vertical spacing` to ``20`` degrees. Click the ``...`` button next to :guilabel:`Grid` and select :guilabel:`Save to File`. Browse to a folder on your computer and enter the name ``grid.gpkg``. Click :guilabel:`Run`.

  .. image:: /static/3/interactive_canvas_maps/images/5.png
    :align: center
   
6. A new layer ``grid`` will be added. Click the :guilabel:`Open the layer styling panel` button in the :guilabel:`Layers` panel. Click on the :guilabel:`Simple Marker`.

  .. image:: /static/3/interactive_canvas_maps/images/6.png
    :align: center
   
7. In the dropdown menu, select ``SVG Marker`` as the symbol type.

  .. image:: /static/3/interactive_canvas_maps/images/7.png
    :align: center
   
8. Scroll down to the :guilabel:`SVG browser` section and select the :guilabel:`logos` folder. Select the QGIS icon.

  .. image:: /static/3/interactive_canvas_maps/images/8.png
    :align: center
   
9. Scroll to the :guilabel:`Size` option and set the size to ``5``.

  .. image:: /static/3/interactive_canvas_maps/images/9.png
    :align: center
   
10. Next, locate the :guilabel:`Rotation` option and click on the :guilabel:`data defined override` button. Select :guilabel:`Edit...`.

  .. image:: /static/3/interactive_canvas_maps/images/10.png
    :align: center
   
11. We will add an expression that will dynamically compute the rotation of the icon based on the current cursor position. As our icon is pointing to 135° azimuth, this will be the 0 rotation. As the cursor moves, the expression will compute the azimuth angle between the icon and the cursor location and calculate the angle by which it needs to be rotated to point to the cursor. Enter the following expression and click :guilabel:`OK`.

  .. code-block:: none

     degrees(azimuth(@geometry,  @canvas_cursor_point)) - 135

  .. image:: /static/3/interactive_canvas_maps/images/11.png
    :align: center
        
12. The map canvas doesn't yet respond to the cursor movement because it doesn't refresh unless you move the map. Let's make it auto-refresh. Right-click the ``grid`` layer and select :guilabel:`Properties`.

  .. image:: /static/3/interactive_canvas_maps/images/12.png
    :align: center
   
13. Switch to the :guilabel:`Rendering` tab. Scroll down and check the :guilabel:`Refresh layer at interval`. Set the interval to a small number such as ``0.1`` (i.e. 100ms) and click :guilabel:`OK`.

  .. image:: /static/3/interactive_canvas_maps/images/13.png
    :align: center
   
14. Back in the main window, turn off the ``World Map`` layer. Now as you move your cursor, all the icons will rotate to point towards your current position.

  .. image:: /static/3/interactive_canvas_maps/images/14.png
    :align: center
   
15. This fun exercise was designed to help you understand how to use the `@canvas_cursor_point` variable to make dynamic layers that respond to the mouse movement. 

  .. image:: /static/3/interactive_canvas_maps/images/output.gif
    :align: center
   

