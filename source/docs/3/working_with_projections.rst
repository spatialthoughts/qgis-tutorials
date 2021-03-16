Working with Projections (QGIS3)
================================

Map projections - or Coordinate Reference System (CRS) - often cause a lot of
frustration when working with GIS data.  But a proper understanding of the
concepts and access to the right tools will make it much easier to deal with
projections. In this tutorial, we will explore how projections work in QGIS and learn about tools available for vector and rasters data layers.

Overview of the task
--------------------

The task is to re-project selected features of a layer and overlay data layers of different projections together in QGIS.

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

.. image:: /static/3/working_with_projections/images/1.png
   :align: center 

2. Click on :guilabel:`...` next to :guilabel:`Source`, Browse to the downloaded ``ne_10m_admin_0_countries.shp`` file and click
   :guilabel:`Add`.

.. image:: /static/3/working_with_projections/images/2.png
   :align: center

3. At the bottom of QGIS window, you will notice the label :guilabel:`Coordinate`. As you move your cursor over the map, it will show you the X and Y coordinates at that location. At the bottom-right corner you will see :guilabel:`EPSG:4326`. This is the code for the current CRS (Projection) for the project - also known as the **Project CRS**.

.. image:: /static/3/working_with_projections/images/3.png
   :align: center

4.  To determine a layer’s projection, we can look into the metadata. Right click on ``ne_10m_admin_0_countries`` layer and select :guilabel:`Properties`.

.. image:: /static/3/working_with_projections/images/4.png
   :align: center

5. Switch to the :guilabel:`Information` tab in the :guilabel:`Layer Properties` dialog. Expand the :guilabel:`Information from provider` section. At the bottom, you will see the name of the projection under :guilabel:`CRS`.

.. image:: /static/3/working_with_projections/images/5.png
   :align: center

6. Now let's see how we can change the layer's projection. This operation is called **Re-Projection**. Rather than re-projecting the entire layer, we can also select a subset of features and re-project them to a new layer. Use the :guilabel:`Select features by area or single click` tool and click on United Kingdom feature to select it.

.. image:: /static/3/working_with_projections/images/6.png
   :align: center

7. Search for and locate the :menuselection:`Vector General --> Reproject layer` algorithm in Processing toolbox. 

.. image:: /static/3/working_with_projections/images/7.png
   :align: center

8. Select ``ne_10m_admin_0_countries`` as the :guilabel:`Input layer`, check :guilabel:`Selected features only` then click on the globe icon next to :guilabel:`Target CRS`, search and select ``EPSG:27700 - OSGB 1936 / British National Grid``. In :guilabel:`Reprojected`, choose the ``...``  and click :guilabel:`Save to a file`. Now choose the directory and enter the name as ``united_kingdom.gkpg`` and click :guilabel:`Run`. 

.. image:: /static/3/working_with_projections/images/8.png
   :align: center

9. A new layer ``united_kingdom`` will appear on the :guilabel:`Layer Panel`. As you see, both the layers still line up exactly with each other - even though they are in different CRSs. This is because QGIS supports `On-The-Fly (OTF) CRS transformation <https://docs.qgis.org/testing/en/docs/user_manual/working_with_projections/working_with_projections.html?highlight=otf#project-coordinate-reference-systems>`_. Which means that whenever a layer's CRS doesn't match the Project CRS, it will automatically be transformed to the Project CRS so it can be displayed correctly. Now let's set the Project CRS to match the newly created ``united_kingdom`` Layer's CRS. Remove the ``ne_10m_admin_0_countries`` layer and, right click on the ``united_kingdom`` layer :menuselection:`Layer CRS --> Set Project CRS from Layer`.


.. image:: /static/3/working_with_projections/images/9.png
   :align: center

10. You will see the Project CRS is updated to ``EPSG:27700``. 

.. image:: /static/3/working_with_projections/images/10.png
   :align: center

11. Now let's add a Raster layer. Go to :menuselection:`Layer --> Add Layer --> Add Raster Layer...`.

.. image:: /static/3/working_with_projections/images/11.png
   :align: center

12. Click on the ``...`` next to :guilabel:`Source`, select the layer ``MiniScale_(standard)_R23.tif``. Click :guilabel:`Add`. 

.. image:: /static/3/working_with_projections/images/12.png
   :align: center

13. Now a new layer ``MiniScale_(standard)_R23`` is added to the canvas.

.. image:: /static/3/working_with_projections/images/13.png
   :align: center

14. To make both layers visible, switch the order of the layer by dragging the ``MiniScale_(standard)_R23`` to the bottom in the :guilabel:`Layers` panel.

.. image:: /static/3/working_with_projections/images/14.png
   :align: center

15. Right-click on the ``MiniScale_(standard)_R23`` layer and click on :guilabel:`Properties`. 

.. image:: /static/3/working_with_projections/images/15.png
   :align: center

16. In the :guilabel:`Layer Properties`, switch to :guilabel:`Information`, the :guilabel:`CRS` is ``EPSG:27700 - OSBG 1935 / British National Grid - Projected``. This confirms that the raster layer's CRS is the same as the Project CRS.

.. note:: 

	If you want to re-project a raster layer, you can use  :menuselection:`GDAL --> Raster projections --> Warp (reproject)` algorithm in Processing toolbox.

.. image:: /static/3/working_with_projections/images/16.png
   :align: center
