Working with Projections
========================
Map projections - or Coordinate Reference System (CRS) - often cause a lot of
frustration when working with GIS data.  But proper understanding of the
concepts and access to the right tools will make it much easier to deal with
projections. In this tutorial, we will explore how projections work in QGIS and
learn about tools available for vector and rasters - particularly re-projecting
vector and raster data, enabling on-the-fly re-projection and assigning
projection to data without projection.

Overview of the task
--------------------

The task is to re-project and overlay data layers of difference projections
together in QGIS.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Use ``.tfw`` files to georeference to rasters.
- How to save selected features from a layer to a new layer.
- How to view metadata information for layers in QGIS.

Get the data
------------

Natural Earth has `Admin 0 - Countries
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/>`_
dataset. Download the `countries
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_

`UK's Ordnance Survey <https://www.ordnancesurvey.co.uk/>`_ provides open data
for download. Download the `MiniScale raster product
<https://www.ordnancesurvey.co.uk/opendatadownload/products.html>`_ for Great
Britain and extract it to a folder on your computer.

.. note::

   You will need to enter your personal details to be able to download the
   Ordnance Survey dataset.

For convenience, you may directly download a copy of the dataset from the link
below:

`ne_10m_admin_0_countries.zip <http://www.qgistutorials.com/downloads/ne_10m_admin_0_countries.zip>`_

`minisc_gb.zip <http://www.qgistutorials.com/downloads/minisc_gb.zip>`_ (Contains only the files
required for this tutorial)

Data Sources: [NATURALEARTH]_ [OSOPENDATA]_

Procedure
---------
1. Open QGIS. Go to :menuselection:`Layer --> Add Layer --> Add Vector
   Layer...`.

.. image:: /static/working_with_projections/images/1.png
   :align: center

2. Browse to the downloaded ``ne_10m_admin_0_countries.zip`` file and click
   :guilabel:`Open`.

.. image:: /static/working_with_projections/images/2.png
   :align: center

3. At the bottom of QGIS window, you will notice the label
   :guilabel:`Coordinate`. As you move your cursor over the map, it will show
   you the X and Y coordinates at that location. At the bottom-right corner you
   will see :guilabel:`EPSG:4326`. This is the code for the current CRS
   (Projection) for the project.

.. image:: /static/working_with_projections/images/3.png
   :align: center

4. As you will later see, the project's CRS may not match the layer's CRS. To
   determine a layer’s projection, we can look into the metadata. Right click
   on ``ne_10m_admin_0_countries`` layer and select :guilabel:`Properties`.

.. image:: /static/working_with_projections/images/4.png
   :align: center

5. Switch to the :guilabel:`Metadata` tab in the :guilabel:`Layer Properties`
   dialog. Expand the :guilabel:`Properties` section. At the bottom, you will
   see the definition for the projection under :guilabel:`Layer Spatial
   Reference System`. This definition is in the `PROJ.4 format
   <https://en.wikipedia.org/wiki/PROJ.4>`_.

.. image:: /static/working_with_projections/images/5.png
   :align: center

6. Now let's see how we can change the layer's projection. This operation is
   called **Re-Projection**. Rather than re-projecting the entire layer, we can
   also re-project some features from the layer. Use the :guilabel:`Select
   features by area or single click` tool and click on United States feature to
   select it.

.. image:: /static/working_with_projections/images/6.png
   :align: center

7. Right-click the ``ne_10m_admin_0_countries`` layer and select
   :guilabel:`Save As`.

.. image:: /static/working_with_projections/images/7.png
   :align: center

8. In the :guilabel:`Save vector layer as...` dialog, name the output layer as
   ``united_states.shp``. Also check the :guilabel:`Save only selected
   features` box. This will ensure that only the selected feature gets
   re-projected and exported. Next, we choose the new projection for the layer.
   Click on the :guilabel:`Select CRS` button.

.. image:: /static/working_with_projections/images/8.png
   :align: center

9. In the :guilabel:`Coordinate Reference System Selector` dialog, enter
   ``north america`` in the :guilabel:`Filter` search box. Scroll through the
   results and select ``North_America_Albers_Equal_Area_Conic (EPSG:102008)``
   projection and click :guilabel:`OK`.

.. note::
   We choose Albers Equal Area Conic projection for this tutorial as it is a
   popular projection choice for thematic maps of the US. The choice of
   projection for your particular use-case will depend on a lot of factors. See
   `this guide
   <http://docs.qgis.org/2.8/en/docs/gentle_gis_introduction/coordinate_reference_systems.html>`_
   for a good overview of Projections.

.. image:: /static/working_with_projections/images/9.png
   :align: center

10. You will see the new CRS selected in the :guilabel:`Save vector layer
    as...` dialog. Click :guilabel:`OK`.

.. image:: /static/working_with_projections/images/10.png
   :align: center

11. Once the re-projected layer gets loaded, you will notice that the new
    ``united_states`` layer overlays perfectly on top of
    ``ne_10m_admin_0_countries`` layer - even though they are in different
    projections. This is because QGIS has a feature called **On-the-fly CRS
    transformation**. The projection text at the bottom-right of QGIS now has
    the words ``OTF`` next the :guilabel:`EPSG:4326``. To learn more, let's
    explore the CRS option in QGIS.

.. image:: /static/working_with_projections/images/11.png
   :align: center

12. Go to :menuselection:`Settings --> Options...`.

.. image:: /static/working_with_projections/images/12.png
   :align: center

13. Switch to the :guilabel:`CRS` tab in the :guilabel:`Options` dialog. You
    will see that the default is :guilabel:`Automatically enable 'on the fly'
    reprojection if the layers have different CRS`. This means that when QGIS
    detects that you have loaded layers with different CRS, it will
    automatically re-project them back to a common CRS so they line up with
    each other. Click :guilabel:`OK`.

.. image:: /static/working_with_projections/images/13.png
   :align: center

14. Let's turn-off the **On-the-fly CRS transformation** and see what happens.
    Click on the :guilabel:`Current CRS` text at the bottom-right corner.

.. image:: /static/working_with_projections/images/14.png
   :align: center

15. In the :guilabel:`Project Properties` dialog, un-check the
    :guilabel:`Enable 'on the fly' CRS transformation` box and click
    :guilabel:`OK`.

.. image:: /static/working_with_projections/images/15.png
   :align: center

16. Back in the main QGIS window, you will see the nice world map disappear.
    This is because the Project CRS changed to
    ``North_America_Albers_Equal_Area_Conic`` and the coordinates and scale are
    different now. Right-click the ``united_states`` layer and select
    :guilabel:`Zoom to Layer`.

.. image:: /static/working_with_projections/images/16.png
   :align: center

17. Now you will see the United States in the selected projection. Notice that
    the features from ``ne_10m_admin_0_countries`` do not appear on the canvas
    as they are in a different coordinate space than the ``united_states``
    layer. Go back to the :guilabel:`Project Properties` dialog and turn-on the
    :guilabel:`Enable 'on the fly' CRS transformation` option for the remainder
    of the tutorial.

.. image:: /static/working_with_projections/images/17.png
   :align: center

18. Now let’s switch gears and add a raster layer to our project. Browse to the
    directory where you had extracted the ``minisc_gb.zip`` file. Locate the
    ``RGB_TIF_COMPRESSED`` folder containing tif files. You will notice that
    the .tif image files are plain TIF files, not GeoTIFF files. That means
    they do not have any projection information. To use these images
    in a GIS, you need to georeference them. A georeference contains 2 types of
    information - image extents and projection. Typically, the extents are
    stored in a file known as `World file
    <https://en.wikipedia.org/wiki/World_file>`_ and they have extensions like
    ``.tfw`` or ``.jgw``. Most GIS software, including QGIS would be able to
    use information stored in the world files as long as they are stored in the
    same directory as the original image and has the same name. The ``.tfw``
    files for the MiniScale raster files are in a separate folder named
    ``georeferencing_files``.

.. image:: /static/working_with_projections/images/18.png
   :align: center

19. Go to the ``ESRI_TFW_FILES`` folder within ``georeferencing_files``. The
    ``.tfw`` files are plain text files. Open one of the ``.tfw`` files in a
    text editor.

.. image:: /static/working_with_projections/images/19.png
   :align: center

20. The world files contain 6 lines with some numbers. As explained below, each
    line signifies some information about the raster file. Knowing this format
    is useful because some data do not come with the world files and you may
    have to create these by hand using the supplied information.

.. code-block:: none

   Line 1: A: pixel size in the x-direction in map units/pixel
   Line 2: D: rotation about y-axis
   Line 3: B: rotation about x-axis
   Line 4: E: pixel size in the y-direction in map units
   Line 5: C: x-coordinate of the center of the upper left pixel
   Line 6: F: y-coordinate of the center of the upper left pixel

.. image:: /static/working_with_projections/images/20.png
   :align: center

21. Copy the ``MiniScale_(standard)_R17.tfw`` file from the
    ``georeferencing_files`` folder to the ``RGB_TIF_COMPRESSED`` folder. This
    way the ``.tfw`` and the ``.tif`` files are in the same directory and QGIS
    can use the information.

.. image:: /static/working_with_projections/images/21.png
   :align: center

22. In the QGIS main windows, go to :menuselection:`Layer --> Add Layer --> Add
    Raster Layer...`. Browse to the ``MiniScale_(standard)_R17.tif`` file and
    click :guilabel:`Open`.

.. image:: /static/working_with_projections/images/22.png
   :align: center

23. The Ordnance Survey files are in the British National Grid projection. In
    the :guilabel:`Coordinate Reference System Selector` dialog, search for
    ``british national`` and pick the ``OSGB 1936 / British National Grid
    (EPSG:27700)`` CRS. Click :guilabel:`OK`.

.. image:: /static/working_with_projections/images/23.png
   :align: center

24. Once the ``MiniScale_(standard)_R17`` layer is loaded, right-click on it
    and select :guilabel:`Zoom to layer`.

.. image:: /static/working_with_projections/images/24.png
   :align: center

25. You will see the raster layer overlaid on top of the
    ``ne_10m_admin_0_countries`` vector layer. Since we have the ``OTF``
    enabled with EPSG:4326, the ``MiniScale_(standard)_R17`` layer gets
    dynamically reprojected to EPSG:4326 and shown in the same coordinate space
    as the other layer.

.. image:: /static/working_with_projections/images/25.png
   :align: center
