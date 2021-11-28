Points in Polygon Analysis
==========================

.. note::

  In QGIS3, you can perform this analysis using the ``Join attributes by location (summary)`` tool in the Processing Toolbox. Use the polygon layer as the :guilabel:`Input Layer`, the point layer as the :guilabel:`Join layer` and ``count``  as the :guilabel:`Summaries to calculate`. See :doc:`3/performing_spatial_joins` tutorial for step-by-step instructions. 
  
The power of GIS lies in analysing multiple data sources together. Often the
answer you are seeking lies in many different layers and you need to do some
analysis to extract and compile this information. One such type of analysis is
**Points-in-Polygon**. When you have a polygon layer and a point layer - and
want to know how many or which of the points fall within the bounds of each
polygon, you can use this method of analysis.

Overview of the task
--------------------

Given the locations of all known significant earthquakes, we will try to find
out which country has had the highest number of earthquakes.

Get the data
------------

We will use NOAA’s National Geophysical Data Center’s `Significant Earthquake
Database <http://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1>`_ as our
layer represenging all major earthquakes. Download the `tab-delimited
earthquake data
<http://www.ngdc.noaa.gov/nndc/struts/results?type_0=Exact&query_0=$ID&t=101650&s=13&d=189&dfn=signif.txt>`_.

Natural Earth has `Admin 0 - Countries
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/>`_
dataset. Download the `countries
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_

For convenience, you may directly download a copy of the dataset from the link
below:

`signif.txt <http://www.qgistutorials.com/downloads/signif.txt>`_

`ne_10m_admin_0_countries.zip <http://www.qgistutorials.com/downloads/ne_10m_admin_0_countries.zip>`_

Data Sources: [NCEI]_  [NATURALEARTH]_

Procedure
---------

1. Open :menuselection:`Layer --> Add Delimited Text Layer` and browse to the
   downloaded ``signif.txt`` file.

.. image:: /static/points_in_polygon/images/1.png
   :align: center

2. Since this is a *tab-delimited file*, choose :guilabel:`Tab` as the
   :guilabel:`File format`. The :guilabel:`X field` and :guilabel:`Y field`
   would be auto-populated. Click :guilabel:`OK`.

.. note::
   You may see some error messages as QGIS tries to import the file. These are
   valid errors and some rows from the file will not be imported. You can ignore
   the errors for the purpose of this tutorial.

.. image:: /static/points_in_polygon/images/2.png
   :align: center

3. As the earthquake dataset has Latitude/Longitude coordinates, choose
   :guilabel:`WGS 84 EPSG:436` as the CRS in the :guilabel:`Coordinate
   Reference System Selector` dialog.

.. image:: /static/points_in_polygon/images/3.png
   :align: center

4. The earthquake point layer would now be loaded and displayed in QGIS. Let's
   also open the Countries layer. Go to :menuselection:`Layer --> Add Vector
   Layer`.  Browse to the downloaded ``ne_10m_admin_0_countries.zip`` file and
   click :guilabel:`Open`. Select the ``ne_10m_admin_0_countries.shp`` as the
   layer in the :guilabel:`Select layers to add...` dialog.

.. image:: /static/points_in_polygon/images/4.png
   :align: center

5. Click on :menuselection:`Vector --> Analysis Tools --> Point in Polygon`

.. image:: /static/points_in_polygon/images/5.png
   :align: center

6. In the pop-up window, select the polygon layer and point layer respectively.
   Name the output layer as ``earthquake_per_coutry.shp`` and Click
   :guilabel:`OK`.

.. note::

   Be patient after clicking OK, QGIS may take upto 10 minutes to calculate the
   results.

7. When asked whether you want to add the layer to TOC, click :guilabel:`Yes`.

.. image:: /static/points_in_polygon/images/7.png
   :align: center

8. You will see a new layer is added to the table of content. Open the
   attribute table by right-clicking on the layer and selecting :guilabel:`Open
   Attribute Table`.

.. image:: /static/points_in_polygon/images/8.png
   :align: center

9. In the attribute table, you will notice a new field named ``PNTCNT``. This is
   the count of number of points from the earthquakes layer that fall within
   each polygon.

.. image:: /static/points_in_polygon/images/9.png
   :align: center

10. To get our answer, we can simply sort the table by ``PNTCNT`` field and the
    country with highest count will be our answer. Click 2-times on the
    ``PNTCNT`` column to get it sorted in descending order. Click on the first
    row to select it and close the Attribute Table.

.. image:: /static/points_in_polygon/images/10.png
   :align: center

11. Back in  the main QGIS window, you will see one feature highlighted in
    yellow. This is the feature linked to the selected row in the attribute
    table which had the highest number of points. Select the
    :guilabel:`Identify` tool and click on that polygon. You can see that the
    country with the highest number of Significant earthquakes is **China**.

.. image:: /static/points_in_polygon/images/11.png
   :align: center

We determined from the simple analysis of 2 datasets that China has had
the highest number of major earthquakes. You may refine this analysis further
by taking into consideration the population as well as the size of the country
and determine which is the most adversely affected country by major
earthquakes.
