Service Area Analysis using Openrouteservice (QGIS3)
====================================================

Service area analysis is useful in evaluating accessibility of locations. Given locations of fire stations, hospitals, public transit stations etc. you can use such analysis to identify what areas can be served from these locations by either amount of distance traveled or by time taken. Till recently, such analysis was difficult using open-source tools and data. But now we have access to a global street network using OpenStreetMap (OSM) and free web-services such as Openrouteservice (ORS) that can perform complex routing tasks using OpenStreetMap (OSM) data. In this tutorial, we will use the **ORS Tools Plugin** to perform service area analysis in QGIS.

Overview of the task
--------------------

We will use metro rail station data for Kochi, India to determine areas that are within 15-minutes of walking distance.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to load General Transit Feed Specification (GTFS) transit feed data in QGIS.
- How to convert sequential point data to line tracks using the *Points to Path* tool.

Get the data
------------

`Kochi Metro Rail Limited (KMRL) <https://kochimetro.org>`_ provides open data for the Kochi Metro Rail Project in `Global Transit Feed Specification (GTFS-static) <https://developers.google.com/transit/gtfs/reference/>`_ format. Request for data download by visiting the `Open Data <https://kochimetro.org/open-data/>`_ page.

For convenience, you may directly download a copy of the datasets from the
links below:

`KMRL-Open-Data.zip <https://www.qgistutorials.com/downloads/KMRL-Open-Data.zip>`_

Data Source [KMRL]_

Setup
-----
`Openrouteservice API <https://openrouteservice.org/>`_ provides routing algorithms that work on free geographic data from OpenStreetMap. It is a free web-based service that can be accessed via a QGIS plugin. While the service is free, it requires you to sign-up and get an API key. The API key is used to prevent abuse and enforce limits on usage. 

1. Visit `Openrouteservice Sign Up <https://openrouteservice.org/dev/#/signup>`_ page and create an account. Once your account is activated, visit your `Dashboard <https://openrouteservice.org/dev/#/home>`_ and request a token. Select ``Free`` as the :guilabel:`Token type` and enter ``ORS Tools QGIS`` as the :guilabel:`Token name`. Click :guilabel:`CREATE TOKEN`. 

  .. image:: /static/3/service_area_analysis/images/setup1.png
    :align: center

2. Once created, copy the long string displayed under ``Key``. This is a unique identifier linked with your account that will be used to authorize use of this service.

  .. image:: /static/3/service_area_analysis/images/setup2.png
    :align: center

3. Open QGIS. Visit :menuselection:`Plugins --> Manage and Install plugins`. Search for **ORS Tools** plugin and install it. Click :guilabel:`Close`.

  .. image:: /static/3/service_area_analysis/images/setup3.png
    :align: center

4. In the main QGIS Window, go to :menuselection:`Web --> ORS Tools --> Provider Settings`. 

  .. image:: /static/3/service_area_analysis/images/setup4.png
    :align: center

5. Expand the :guilabel:`openrouteservice` section and paste the ``key`` (copied in step 2) in the :guilabel:`API Key` text-box. Click :guilabel:`OK`.

  .. image:: /static/3/service_area_analysis/images/setup5.png
    :align: center

Procedure
---------

1. Unzip the downloaded ``KMRL-Open-Data.zip`` file to a folder on your computer. You will notice that the unzipped directory contains many text files. Each file contains data for a different aspect of the transit system. The format of the files and their uses are described in `GTFS Reference <https://developers.google.com/transit/gtfs/reference/>`_. Out of all the files, 2 files contains geospatial data and is of interest to us. The file ``shapes.txt`` contains points that describe a physical path that the vehicle takes, and the file ``stops.txt`` contains the location of each transit stop. Both of these are CSV files that can be imported into QGIS. Click the :guilabel:`Open Data Source Manager` button.

  .. image:: /static/3/service_area_analysis/images/1.png
    :align: center

2. In the :guilabel:`Data Source Manager` dialog, switch to the :guilabel:`Delimited Text` tab. Click the :guilabel:`...` button next to :guilabel:`File name` and browse to the ``shapes.txt`` file. Select ``CSV (comma separated values)`` as the :guilabel:`File Format`. The :guilabel:`X field` and :guilabel:`Y field` should be auto populated. Click :guilabel:`Add`.

  .. image:: /static/3/service_area_analysis/images/2.png
    :align: center

3. Similarly, click the :guilabel:`...` button again and select ``stops.txt`` file. Click :guilabel:`Add`. Click :guilabel:`Close`.

  .. image:: /static/3/service_area_analysis/images/3.png
    :align: center

4. You will see 2 new layers ``stops`` and ``shapes`` added to the :guilabel:`Layers` panel. Let's convert the ``shapes`` point layer into a line layer representing the path of the metro line. Go to :menuselection:`Processing --> Toolbox`.

  .. image:: /static/3/service_area_analysis/images/4.png
    :align: center

5. Search and locate the :menuselection:`Vector creation --> Points to path` tool. Double-click to launch it.

  .. image:: /static/3/service_area_analysis/images/5.png
    :align: center

6. In the :guilabel:`Points to Path` dialog, select ``shapes`` as the :guilabel:`Input point layer`. As per GTFS specifications, each individual route has a unique ``shape_id`` so select that from the drop-down menu as the :guilabel:`Path group expression`. We can also specify the order of points that will form the line by selecting ``shape_pt_sequence`` as the :guilabel:`Order expression`. Click :guilabel:`Run`.

  .. image:: /static/3/service_area_analysis/images/6.png
    :align: center

7. A new layer ``Paths`` will be added to the :guilabel:`Layers` panel. You can turn off the visibility of the ``shapes`` layer to see the newly added line layer.

  .. image:: /static/3/service_area_analysis/images/7.png
    :align: center

8. Now that we have the metro stations and line data added, we are ready to start the network analysis. In the :guilabel:`Processing Toolbox`, search for and locate the :menuselection:`ORS Tools --> Isochrones --> Isochrones From Layer` tool. Double-click to launch it.

  .. image:: /static/3/service_area_analysis/images/8.png
    :align: center

9. Select ``openrouteservice`` as the :guilabel:`Provider`. We will be computing a 15-min walking distance polygon from each metro station. Select ``stops`` as :guilabel:`Input Point Layer`. Select ``stop_id`` as the :guilabel:`Input Layer ID Field`. From the :guilabel:`Travel mode` drop-down, select ``foot-walking``. As we are interested in time-based area, select ``time`` as the :guilabel:`Dimension`. Finally enter ``15`` minutes as the :guilabel:`ranges`. Click :guilabel:`Run`.

  .. image:: /static/3/service_area_analysis/images/9.png
    :align: center

.. note::

  Note that the Openrouteservice API has a limit of 20 requests per minute for Isochrones. So if your layer has more than 20 points, you may see errors indicating that the rate limit exceeded. You can keep the tool running and it will continue processing 20 points / min.
  
10. Once the tool finishes, you will see a new layer ``Isochrones`` loaded in the :guilabel:`Layers` panel. Each point has an associated polygon representing the area that is accessible within 15 minutes by walk. To see this in the context the data that was used to generate them, we can add the OpenStreetMap basemap. Scroll down the :guilabel:`Browser` panel and locate :menuselection:`XYZ Tiles --> OpenStreetMap`. Drag it to the canvas.

  .. image:: /static/3/service_area_analysis/images/10.png
    :align: center

11. A new layer ``OpenStreetMap`` will be added to the :guilabel:`Layers` panel. Drag it down to change the layer order and keep it at the bottom of the layer stack. Zoom and pan to see if the results match the road network. You will see that the polygons are not circular, because the travel time is computed along roads, so the regions that have no roads will have lesser area covered.

  .. image:: /static/3/service_area_analysis/images/11.png
    :align: center

12. To compute the service area, we need to complete one last task. We can merge individual isochrone polygons to form a single polygon representing the areas that are accessible. Search for and locate :menuselection:`Vector geometry --> Dissolve`.

  .. image:: /static/3/service_area_analysis/images/12.png
    :align: center

13. Select ``Isochrones`` as the :guilabel:`Input layer` and click :guilabel:`Run`.

  .. image:: /static/3/service_area_analysis/images/13.png
    :align: center

14. Once the processing finishes, a new layer ``Dissolved`` will be added to the :guilabel:`Layers` panel. This polygons represents the full region that is accessible from the metro system within 15-minutes of walk.

  .. image:: /static/3/service_area_analysis/images/14.png
    :align: center

.. note::

  This is a simple example of how a service area analysis for a public transportation project can be done in QGIS. A more comprehensive service-area analysis for the metro system would include other modes of transport. We could include feeder buses, nearby bus stops and routes serving those bus stops to expand the analysis. We may also include travel by other modes such as car and taxi.
