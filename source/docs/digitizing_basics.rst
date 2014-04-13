Digitizing Map Data
===================

.. only:: html

   [ Download PDF `A4 <../pdf/digitizing_basics_a4.pdf>`_ `Letter
   <../pdf/digitizing_basics_letter.pdf>`_ ]

Digitizing is one of the most common tasks that a GIS Specialist has to do.
Often a large amount of *GIS time* is spent in digitizing raster data to create
vector layers that you use in your analysis. QGIS has powerful on-screen
digitizing and editing capabilities that we will explore in this tutorial.

Overview of the task
--------------------
We will use a raster topographic map and create several vector layers
representing features around a park.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Building pyramids for large raster datasets to speed up zoom and pan
  operations.
- Working with a Spatialite database.


Get the data
------------

`Land Information New Zealand (LINZ) <http://www.linz.govt.nz/>`_ provides
raster topographic maps at 1:50,000 scale for the New Zealand mainland and
Chatham Islands. [LINZ]_

Download the `GeoTIFF Image file
<http://topo.linz.govt.nz/Topo50_raster_images/GeoTIFFTopo50/BX24_GeoTifv1-02.tif>`_
from the `Christchurch Topo50 map download page
<http://www.linz.govt.nz/topography/topo-maps/map-chooser/christchurch/christchurch#digitalfile>`_.


.. only:: html

   If you are on a slow connection, you may download a clipped version of the
   original GeoTIFF which is a much smaller file size.

   :download:`BX24_GeoTifv1-02-clip.tif
   </static/digitizing_basics/data/BX24_GeoTifv1-02-clip.tif>`


Procedure
---------

1. Go to :menuselection:`Layer --> Add Raster Layer`. Locate the downloaded
   ``BX24_GeoTifv1-02.tif`` and click :guilabel:`Open`.

.. image:: /static/digitizing_basics/images/1.png
   :align: center

2. This is a large raster file and you may notice that when you zoom or pan
   around the map, the map takes a little time to render the image. QGIS offers
   a simple solution to make rasters load much faster by using **Image
   Pyramids**. QGIS creates pre-rendered tiles at different resolutions and
   these are presented to you instead of the full raster. This makes map
   navigation snappy and responsive. Right-click the ``BX24_GeoTifv1-02`` layer
   and choose :guilabel:`Properties`.

.. image:: /static/digitizing_basics/images/2.png
   :align: center

3. Choose the :guilabel:`Pyramids` tab. Hold the :kbd:`Ctrl` key and select all
   the resolutios offered in the :guilabel:`Resolutions` panel. Leave other
   options to defaults and click :guilabel:`Build pyramids`. Once the process
   finishes, click :guilabel:`OK`.

.. image:: /static/digitizing_basics/images/3.png
   :align: center

4. Back in the main QGIS window, use the :guilabel:`Zoom` tool to locate
   *Hagley Park* area in Christchurch. This is the park that we will be
   digitizing.

.. image:: /static/digitizing_basics/images/4.png
   :align: center

5. Before we start, we need to set default **Digitizing Options**. Go to
   :menuselection:`Settings --> Options...`.

.. image:: /static/digitizing_basics/images/5.png
   :align: center

6. Select the :guilabel:`Digitizing` tab in the :guilabel:`Options` dialog.

.. image:: /static/digitizing_basics/images/6.png
   :align: center
