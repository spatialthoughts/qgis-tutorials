Handling Invalid Geometries (QGIS3)
===================================

When working with vector data layers, you may encounter geometry errors. These errors often become part of your data after running geoprocessing, digitizing, editing or data conversion. QGIS3 comes with build-in tools and algorithms to detect and fix invalid geometries. This tutorial will show you a typical workflow for handling invalid geometries in your data.

.. note::

  Different software systems implement different notions of geometry validity. But the leading standard for the geometry model for use in a GIS is the OGC `Simple Features Specifications (SFS) <https://www.opengeospatial.org/standards/sfs>`_. In this tutorial, we will use GEOS library to check for geometry validity which uses this standard. `This post <https://support.safe.com/s/article/invalid-ogc-geometry-examples>`_ gives a good overview of common geometry errors as defined by the OGC standard.
  
Overview of the task
--------------------

We will work with an admin boundary layer for India and fix a geometry error for a state polygon.

Other skills you will learn
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Using the *Topological Coloring* algorithm to apply a coloring scheme to a polygon layer.


Get the data
------------

`Datameet <http://projects.datameet.org/maps/>`_ provides community-created administrative boundary shapefiles for India. 

Download the `Datameet Spatial Data Repository [~150 MB] <https://codeload.github.com/datameet/maps/zip/0fa9fd850eda3d2062e66f2caabc65872639c85a>`_ zipfile. The downloaded archive contains multiple folders. Extract the archive and use the files in the ``States/`` folder.

Data Source: [DATAMEET]_

Procedure
---------


1. Browse to the downloaded ``India-States.zip`` file in QGIS Browser. Expand it and drag the ``India-States.shp`` file to the map canvas. 

  .. image:: /static/3/handling_invalid_geometries/images/1.png
    :align: center

2. You will see a new ``India-States`` layer loaded in the :guilabel:`Layers` panel. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/handling_invalid_geometries/images/2.png
    :align: center

3. We will attemp to run a processing algorithm on the input layer to demonstrate how invalid geometries can cause problems during geoprocessing operations. Search for and locate the :menuselection:`Cartography --> Topological coloring` algorithm. Double-click to launch it.

  .. image:: /static/3/handling_invalid_geometries/images/3.png
    :align: center

4. In the :guilabel:`Topological coloring` dialog, select ``India-States`` as the :guilabel:`Input layer`. Keep all other parameters to default and click :guilabel:`Run`.

  .. image:: /static/3/handling_invalid_geometries/images/4.png
    :align: center

.. note::

  The *Topological coloring* algorithm implements an algorithm to color a map so that no adjacent polygons have the same color. This is a useful cartography technique and the `Four Color Theorem <https://en.wikipedia.org/wiki/Four_color_theorem>`_ states that 4 colors are enough to achieve this result. There is a graph-theory version of this thorem called `Five color theorem <https://en.wikipedia.org/wiki/Five_color_theorem>`_. The QGIS algorithm implementation is based on  graphs so in practive you will see that complex polygon layers such as this will require upto 5 colors. 
  
5. As the algorithm runs, you will see a warning displayed in the :guilabel:`Log` tab. 1 feature in the input layer had invalid geometry and was skipped during the processing. The default setting to handle invalid geometry in the Processing Toolbox is located at :menuselection:`Settings --> Options --> Processing --> General --> Invalid features filtering` and is set to ``Skip (ignore) features with invalid geometries``. This is a good default setting, but if your input is large, you may miss this warning and may not know that an input feature was skipped. You may want to change the value to ``Stop algorithm execution when a geometry is invalid``.

  .. image:: /static/3/handling_invalid_geometries/images/5.png
    :align: center

6. Back in the main QGIS window, you will see a new layer ``Colored`` added to the :guilabel:`Layers` panel. Notice that the new layer is missing a state which had invalid geometry. We now know that this particular state polygon had invalid geometry but we don't know what was the cause. We can easily find that out. Search for and locate the :menuselection:`Vector geometry --> Check validity` algorithm.

  .. image:: /static/3/handling_invalid_geometries/images/6.png
    :align: center

7. In the :guilabel:`Check Validity` dialog, select ``India-States`` as the :guilabel:`Input layer`. Select ``GEOS`` as the :guilabel:`Method`. Click :guilabel:`Run`.

  .. image:: /static/3/handling_invalid_geometries/images/7.png
    :align: center

8. As the algorithm finishes processing, you will see 3 new layers in the :guilabel:`Layers` panel - ``Valid output``, ``Invalid output`` and ``Error output``. The layer ``Error output`` contains the locations and description of the geometry errors. Right-click it and select :guilabel:`Open Attribute Table`.

  .. image:: /static/3/handling_invalid_geometries/images/8.png
    :align: center
    
.. note::

  The QGIS documentation has a detailed article on `Types of error messages and their meanings <https://docs.qgis.org/testing/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#types-of-error-messages-and-their-meanings>`_ that explains the causes of all the errors.
  
9. You will see that the error message is *Ring self-intersection*. Select the row and click :guilabel:`Zoom map to selected features` button. As you zoom in, you will see the root cause of the geometry error.

  .. image:: /static/3/handling_invalid_geometries/images/9.png
    :align: center

10. QGIS comes with a built-in algorithm to fix geometry errors automatically. Search for and locate the :menuselection:`Vector geometry --> Fix geometries` algorithm. Double-click to run it.

  .. image:: /static/3/handling_invalid_geometries/images/10.png
    :align: center

11. In the :guilabel:`Fix Geometries` dialog, select ``India-States`` as the :guilabel:`Input layer` and click :guilabel:`Run`.

  .. image:: /static/3/handling_invalid_geometries/images/11.png
    :align: center

12. A new layer ``Fixed Geometries`` will be added to the :guilabel:`Layers` panel. At this point, the geometry error is fixed and you can run any processing algorithm on this layer without problems. But we can see that there is still a gap between the adjacent polygons that is unexpected and can cause topological errors down the line. We can fix this too by editing the polygon. Click the :guilabel:`Toggle Editing` button in the :guilabel:`Digitizing Toolbar`. Select the :guilabel:`Vertex Tool` and from the drop-down select ``Vertex Tool (Current Layer)``.

  .. image:: /static/3/handling_invalid_geometries/images/12.png
    :align: center

13. When the vertex tool is active, click on a vertex to select it. You can press :kbd:`Delete` key to delete a vertex or drag it to move it. You can move the vertex so that the polygon edge now touches the adjacent polygon.

  .. image:: /static/3/handling_invalid_geometries/images/13.gif
    :align: center

14. Once done, click the :guilabel:`Toggle Editing` button again and click :guilabel:`Save`.

  .. image:: /static/3/handling_invalid_geometries/images/14.png
    :align: center

15. Let's run the :menuselection:`Cartography --> Topological coloring` algorithm again.

  .. image:: /static/3/handling_invalid_geometries/images/15.png
    :align: center

16. In the :guilabel:`Topological Coloring` dialog, make sure you select ``Fixed Geometries`` as the :guilabel:`Input layer`. Click :guilabel:`Run`.

  .. image:: /static/3/handling_invalid_geometries/images/16.png
    :align: center

17. You will see the algorithm run without any errors and a new layer ``Colored`` will be added to the :guilabel:`Layers` panel. Note that the algorithm doesn't color the layer by itself, but works by adding a new column called ``color_id`` to each polygon that can be used to assign a unique color that is different than adjacent polygons. Select the ``Colored`` layer and click the :guilabel:`Open the Layer Styling Panel` button.

  .. image:: /static/3/handling_invalid_geometries/images/17.png
    :align: center

18. Select ``Categorized`` renderer and the column ``color_id`` as the :guilabel:`Value`. Click :guilabel:`Classify`. You will now see the map colored so that adjacent polygons have different colors.

  .. image:: /static/3/handling_invalid_geometries/images/18.png
    :align: center
