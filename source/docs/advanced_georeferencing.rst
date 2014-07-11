Georeferencing Aerial Imagery
=============================
.. only:: html

   [ Download PDF `A4 <../pdf/advanced_georeferencing_a4.pdf>`_
   `Letter <../pdf/advanced_georeferencing_letter.pdf>`_ ]

In the tutorial :doc:`georeferencing_basics` we covered the basic process of
georeferencing in QGIS. That method involved reading the coordinates from your
scanned map and inputting it manually. Many times though you may not have the
coordinates printed on your map, or you are trying to georeference an image.
In that case, you can use another georeferenced data source as your input. In
this tutorial, you will learn how to use existing open data sources in your
georeferencing process.


Overview of the task
--------------------

We will georeference high resolution balloon-imagery using reference
coordinates from OpenStreetMap.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Downloading super high-resolution public domain imagery.
- Using the OpenLayers plugin in QGIS.
- Converting coordinates between different projection using **cs2cs**
  command-line tool.
- Using an existing georeferenced layer to input GCP points in the Georeferencer
  tool.
- Setting a custom no-data value for a layer.

Get the data
------------

In this tutorial, we will be using some gorgeous kite and balloon imagery
collected by `The Public Laboratory <http://publiclaboratory.org/archive>`_.
They make the georeferenced versions of the images also available, but we will
download a non-georeferenced JPG image and go through the process of
georeferencing it in QGIS.  If you like the imagery they provide, you can
`explore it <http://google-latlong.blogspot.in/2012/04/
balloon-and-kite-imagery-in-google.html>`_ in Google Earth as well.

Download the JPG image of `Washington Square Park, New York <http://
publiclaboratory.org/map/washington-square-park-new-york-new-york/2012-10-01>`_.
You can right-click the JPG button and choose :guilabel:`Save link as...`.

Procedure
---------

1. For this tutorial, we will be using the OpenStreetMap layer as our reference
   layer. Install the OpenLayers plugin from :menuselection:`Plugins --> Manage
   and install plugins --> Get more`. See :doc:`using_plugins` for more
   information on using plugins in QGIS.

.. image:: /static/advanced_georeferencing/images/1.png
   :align: center

2. Once installed, go to :menuselection:`Plugins --> OpenLayers plugin --> Add
   OpenStreetMap layer`. This will add a layer of pre-rendered tiles created
   from `OpenStreetMap data <http://www.openstreetmap.org/>`_.

.. image:: /static/advanced_georeferencing/images/2.png
   :align: center

3. Now you have the OpenStreetMap layer loaded in QGIS. Note the Coordinate
   Reference System (CRS) for this layer. It is set as EPSG 3857 Pseudo
   Mercator. This is important to note, since the coordinates we infer from
   this layer will be in this CRS.

.. image:: /static/advanced_georeferencing/images/3.png
   :align: center

4. Now the task is to locate the general vicinity of the area that we are
   trying to georeference. You can just use Pan and Zoom tools to locate that
   area on the OpenStreetMap layer. But we can take this opportunity to
   demonstrate another tool that may help you in future. We know that the image
   we downloaded is for Washington Square Park in New York. If you search for
   that place, you will be able to locate the wikipedia page for it. The
   coordinates for the park are listed there.

.. image:: /static/advanced_georeferencing/images/4.png
   :align: center

5. You will notice that the coordinates are in Degrees/Minute/Seconds and are
   Latitude and Longitude. But since our layer is in Mercator projection, we
   will need Mercator coordinates to locate the park. Here’s where a
   command-line tool called **cs2cs** comes handy. If you have installed QGIS
   from OSGeo4W installer, you will already have it installed on your system.
   On Linux and Mac too, it comes pre-installed with QGIS. Launch a terminal
   window and type ``cs2cs`` to check if it is available. Windows users can find
   a terminal at :menuselection:`Start --> OSGeo4W --> MSYS`.

.. image:: /static/advanced_georeferencing/images/5.png
   :align: center

6. Once you have verified that the cs2cs tool exists on your system, it is time
   to convert out Latitude and Longitude to Mercator coordinates. The way this
   tool works is that you need to specify a :guilabel:`source` and
   :guilabel:`destination` CRS. The CRS definition could be a `PROJ4 string
   <http://trac.osgeo.org/proj/wiki/GenParms>`_ or an `EPSG code
   <http://www.epsg-registry.org/>`_. Since we already know the EPSG code for
   out input and output CRS, we will use this. The simplest way to use the tool
   is to supply the input coordinates on the command line itself. Note that the
   tool accepts coordinates in the order `X Y`, so we need to enter `Longitude
   Latitude`. Enter the following command in the terminal and press Enter. Note
   that we need to escape the quotes (") with a backslash (\\). Once you press
   enter, you will see the tool process the coordinates and print out output X Y
   coordinates in EPSG 3857 CRS.

.. code-block:: none

   echo "-73d59'51\" 40d43'51\"" | cs2cs +init=EPSG:4326 +to +init=EPSG:3857

   -8237364.02 4972720.34 0.00

.. image:: /static/advanced_georeferencing/images/6.png
   :align: center

7. Copy these coordinates and switch to QGIS. At the bottom of the QGIS window,
   you will see a textbox labeled Coordinates. Enter the coordinates there in
   X,Y form. Press Enter.  You will see the map shift a bit, but not zoom. To
   zoom to the area, select 1:2500 scale from the Scale drop-down next to the
   Coordinate box and press Enter.

.. image:: /static/advanced_georeferencing/images/7.png
   :align: center

8. Voila! you now see Washington Square Park area on your canvas. Now it is
   time to start georeferencing. Launch the **Georeferencer** from
   :menuselection:`Raster --> Georeferencer --> Georeferencer`. If you do not
   see that menu item, you will need to enable the :guilabel:`Georeferencer
   GDAL` plugin from :menuselection:`Plugins --> Manage and install Plugins -->
   Installed`.

.. image:: /static/advanced_georeferencing/images/8.png
   :align: center

9. In the :guilabel:`Georeferencer` window, go to :menuselection:`File --> Open
   raster`. Navigate to the downloaded JPG file and click :guilabel:`Open`.

.. image:: /static/advanced_georeferencing/images/9.png
   :align: center

10. In the :guilabel:`Coordinate Reference System Selector`,
    choose :guilabel:`EPSG:3857 Pseudo Mercator`

.. image:: /static/advanced_georeferencing/images/10.png
   :align: center

11. Now click on the :guilabel:`Add Point` button on the toolbar and select an easily
    identifiable location on the image. Corners, intersections, poles etc. make
    good control points.

.. image:: /static/advanced_georeferencing/images/11.png
   :align: center

12. Once you click on the image at a control point location, you will see a
    pop-up asking you to enter map coordinates. Click the button
    :guilabel:`From map canvas`.

.. image:: /static/advanced_georeferencing/images/12.png
   :align: center

13. Find the same location in your reference layer, i.e. the OpenStreetMap
    layer and click there. The coordinates are auto-populated from your click
    on the map canvas. Click Ok. Similarly, choose at least 4 points on the
    image and add their coordinates from the reference layer.

.. image:: /static/advanced_georeferencing/images/13.png
   :align: center

14. Now go to :menuselection:`Settings --> Transformation settings.`

.. image:: /static/advanced_georeferencing/images/14.png
   :align: center

15. Choose the settings as shown below. Make sure you the :guilabel:`Load in
    QGIS when done` button is checked. Click OK. Back in the
    :guilabel:`Georeferencer` window, go to :menuselection:`File -->
    Start georeferencing`. This will start the process of warping the image
    using the GCPs and creating the target raster.

.. image:: /static/advanced_georeferencing/images/15.png
   :align: center

16. Once the process finishes, you will see the georeferenced layer loaded in
    QGIS. If all went well, you will see it nicely overlay the OpenStreetMap
    layer.

.. image:: /static/advanced_georeferencing/images/16.png
   :align: center

17. To make our output look nicer, let’s remove the black and white no-data
    values. Right click on the image layer and choose :guilabel:`Properties`.

.. image:: /static/advanced_georeferencing/images/17.png
   :align: center

18. Switch to the :guilabel:`Transparency` tab. We want to indicate that any
    black or white pixels in the image are `no-data` values and should be made
    transparent. Input 0 as the :guilabel:`No data value`. Also, in the
    :guilabel:`Custom transparency options`, click the :guilabel:`+` button and
    add 255 as the transparent pixels for each band and enter 100 as the
    ::guilabel:`Percent transparent`. Click :guilabel:`OK`.

.. image:: /static/advanced_georeferencing/images/18.png
   :align: center

19. Now you will see your georeferenced image nicely overlaid on the base layer.

.. image:: /static/advanced_georeferencing/images/19.png
   :align: center
