Creating a Colorized River Basin Map (QGIS3)
===========================================

In this tutorial, we will learn the QGIS workflow to create artistic river maps for your own country or region using openly available hydrological data. 

This tutorial is inspired by the beautiful maps produced by `Grasshopper Geography <https://www.grasshoppergeography.com/>`_. I own one of their prints and you too can support their work by purchasing one of their maps from their `online store <https://www.etsy.com/shop/GrasshopperGeography>`_.

Overview of the task
--------------------

In this tutorial, we will take data layers of basins and rivers from HydroSHEDS and create a basin map for rivers of India.

  .. image:: /static/3/colorized_river_basin_map/images/rivers_of_india.png
    :align: center

Other skills you will learn
----------------------------

- How to fix invalid geometries in a layer.
- How to add multiple layers in a single GeoPackage.

Get the data
------------

`HydroSHEDS <https://www.hydrosheds.org/>`_ provides global hydrological datasets suitable for regional and global applications. The data layers are derived from hydrologically conditioned DEM form SRTM.

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

