Interpolating Point Data
========================
.. only:: html

   [ Download PDF `A4 <../pdf/interpolating_point_data_a4.pdf>`_ `Letter
   <../pdf/interpolating_point_data_letter.pdf>`_ ]

Interpolation is a commonly used GIS technique to create continuous surface
from discrete points. A lot of real world phenomena are continuous -
elevations, soils, temperatures etc. If we wanted to model these surfaces for
analysis, it is impossible to take measurements throughout the surface. Hence,
the field measurements are taken at various points along the surface and the
intermediate values are inferred by a process called 'interpolation'. In QGIS,
interpolation is achieved using the built-in ``Interpolation plugin``.

Overview of the task
--------------------

We will take field depth measurements for a Lake Arlington in Texas and create
an elevation relief map and contours from these measurements.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Creating contours from point data.
- Masking no-data values from a raster layer.
- Adding labels to a vector layer.

Get the data
------------

Texas Water Development Board provides the `shapefiles for completed lake
surveys
<http://www.twdb.state.tx.us/surfacewater/surveys/completed/list/index.asp>`_.

Download the `2007-12 survey shapefiles for Lake Arlington
<http://www.twdb.texas.gov/hydro_survey/Arlington/2007-12/Shapefiles.zip>`_.

.. only:: html

   For convenience, you can directly download the sample data used in this
   tutorial from link below.

   :download:`Shapefiles.zip <../static/interpolating_point_data/data/Shapefiles.zip>`

Data Sources: [TWDB]_

Procedure
---------

1. Open QGIS. Go to :menuselection:`Layer --> Add Layer  --> Add Vector Layer..`

.. image:: /static/interpolating_point_data/images/1.png
   :align: center

2. Browse to the downloaded ``Shapefiles.zip`` file and select it. Click
   :guilabel:`Open`.

.. image:: /static/interpolating_point_data/images/2.png
   :align: center

3. In the :guilabel:`Select layers to add...` dialog, hold the :kbd:`Shift` key
   and select ``Arlington_Soundings_2007_stpl83.shp`` and
   ``Boundary2004_550_stpl83.shp`` layers. Click :guilabel:`OK`.

.. image:: /static/interpolating_point_data/images/3.png
   :align: center

4. You will see the 2 layers loaded in QGIS. The ``Boundary2004_550_stpl83``
   layer represents the boundary of the lake. Un-check the box next to it in
   the Table of Contents.

.. image:: /static/interpolating_point_data/images/4.png
   :align: center

5. This will reveal the data from the second layer
   ``Arlington_Soundings_2007_stpl83``. Though the data looks like lines, it is
   a series of points that are very close.

.. image:: /static/interpolating_point_data/images/5.png
   :align: center

6. Click the :guilabel:`Zoom` icon and select a small area on the screen. As
   you zoom closer, you will see the points. Each point represents a reading
   taken by a *Depth Sounder* at the location recorded by a *DGPS* equipment.

.. image:: /static/interpolating_point_data/images/6.png
   :align: center

7. Select the :guilabel:`Identify` tool and click on a point. You will see the
   :guilabel:`Identify Results` panel show up on the left with the attribute
   value of the point. In this case, the ``ELEVATION`` attribute contains the
   depth of the lake at the location. As our task is to create a depth profile
   and elevation contours, we will use this values as input for the
   interpolation.

.. image:: /static/interpolating_point_data/images/7.png
   :align: center

8. Make sure you have the ``Interpolation plugin`` enabled. See
   :doc:`using_plugins` for how to enable plugins. Once enabled, go to
   :menuselection:`Raster --> Interpolation --> Interpolation`.

.. image:: /static/interpolating_point_data/images/8.png
   :align: center

9. In the :guilabel:`Interpolation` dialog, select
   ``Arlington_Soundings_2007_stpl83`` as the :guilabel:`Vector layers` in the
   :guilabel:`Input` panel. Select ``ELEVATION`` as the
   :guilabel:`Interpolation attribute`. Click :guilabel:`Add`. Change the
   :guilabel:`Cellsize X` and :guilabel:`Cellsize Y` values to ``5``. This
   value is the size of each pixel in the output grid. Since our source data is
   in a projected CRS with **Feet-US** as units, based on our selection, the
   grid size will be **5 feet**. Click on the :guilabel:`...` button next to
   :guilabel:`Output file` and name the output file as ``elevation_tin.tif``.
   CLick :guilabel:`OK`.

.. note::

   Interpolation results can vary significantly based on the method and
   parameters you choose. QGIS interpolation supports *Triagulated Irregular
   Network (TIN)* and *Inverse Distance Weighting (IDW)* methods for interpolation.
   TIN method is commonly used for elevation data whereas IDW method is used
   for interpolating other types of data such as mineral concentrations,
   populations etc. See the `Spatial Analysis
   <http://docs.qgis.org/2.2/en/docs/gentle_gis_introduction/spatial_analysis_interpolation.html>`_
   module of the QGIS documentation for more details.

.. image:: /static/interpolating_point_data/images/9.png
   :align: center

10. You will see the new later ``elevation_tin`` loaded in QGIS. Right-click
    the layer and select :guilabel:`Zoom to layer`.

.. image:: /static/interpolating_point_data/images/10.png
   :align: center

11. Now you will see the full extent of the created surface. Interpolation does
    not give accurate results outside the collection area. Let's clip the
    resulting surface with the lake boundary. Go to :menuselection:`Raster -->
    Extraction --> Clipper`.

.. image:: /static/interpolating_point_data/images/11.png
   :align: center

12. Name the :guilabel:`Output file` as ``elevation_tin_clipped.tif``. Select the
    :guilabel:`Cliiped mode` as :guilabel:`Mask layer`. Select
    ``Boundary2004_550_stpl83`` as the :guilabel:`Mask layer``. Click
    :guilabel:`OK`.

.. image:: /static/interpolating_point_data/images/12.png
   :align: center

13. A new raster ``elevation_tin_clipped`` will be loaded in QGIS. We will now
    style this layer to show the difference in elevations. Note the min and max
    elevation values from the ``elevation_tin`` layer. Right-click the
    ``elevation_tin_clipped`` layer and select :guilabel:`Properties`.

.. image:: /static/interpolating_point_data/images/13.png
   :align: center

14. Go to the :guilabel:`Style` tab. Select :guilabel:`Render type` as
    ``Singleband pseudocolor``. In the :guilabel:`Generate new color map`
    panel, select ``Spectral`` color ramp. As we want to create a depth-map as
    opposed to a height-map, check the :guilabel:`Invert` box. This will assign
    blues to deep areas and reds to shallow areas. Click :guilabel:`Classify`.

.. image:: /static/interpolating_point_data/images/14.png
   :align: center

15. Switch to the :guilabel:`Tranparency` tab. We want to remove the
    black-pixels from our output. Enter ``0`` as the :guilabel:`Additional no
    data value`. Click :guilabel:`OK`.

.. image:: /static/interpolating_point_data/images/15.png
   :align: center

16. Now you have a elevation relief map for the lake generated from the
    individual depth readings. Let's generate contours now. Go to
    :menuselection:`Raster --> Extraction --> Contours`.

.. image:: /static/interpolating_point_data/images/16.png
   :align: center

17. In the :guilabel:`Contour` dialog, enter ``contours`` as the
    :guilabel:`Output  file for contour lines`. We will generate contour lines
    at 5ft intervals, so enter ``5.00`` as the :guilabel:`Interval between
    contour lines`. Check the :guilabel:`Attribute name` box. Click
    :guilabel:`OK`.

.. image:: /static/interpolating_point_data/images/17.png
   :align: center

18. The contour lines will be loaded as ``contours`` layer once the processing
    is finished. Right-click the layer and select :guilabel:`Properties`.

.. image:: /static/interpolating_point_data/images/18.png
   :align: center

19. Go to the :guilabel:`Labels` tab. Check the :guilabel:`Label this layer
    with` box and select ``ELEV`` as the field. Select ``Curved`` as the
    :guilabel:`Placement` type and click :guilabel:`OK`.

.. image:: /static/interpolating_point_data/images/19.png
   :align: center

20. You will see that each contour line will be appropriately labeled with the
    elevation along the line.

.. image:: /static/interpolating_point_data/images/20.png
   :align: center
