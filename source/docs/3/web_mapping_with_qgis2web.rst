Web Mapping with QGIS2Web (QGIS3)
=================================

Web mapping is a great medium to publish your GIS data to the web and make it accessible to other users. Creating a web map is a very different process than creating one in a GIS. GIS users are typically aren’t web programmers and it presents a challenge when one needs to create a web map that is of the same quality as a map creating in a GIS. Fortunately, there are tools available to easily translate your work in QGIS to web maps. In this tutorial, you will learn how to use the **QGIS2Web** plugin to create a web map using OpenLayers or Leaflet libraries from your QGIS project.


Overview of the task
--------------------

We will create a leaflet web map of the world's airports.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to use Edit Widgets in QGIS to hide certain fields and set custom types.
- How to create a virtual field using Field Calculator.


Get the data
------------

We will use the `Airports <http://www.naturalearthdata.com/downloads/10m-cultural-vectors/airports/>`_
dataset from Natural Earth.

Download the `Airports shapefile
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_airports.zip>`_.

For convenience, you may directly download a copy of the datasets from the links
below:

`ne_10m_airports.zip <https://www.qgistutorials.com/downloads/ne_10m_airports.zip>`_

Data Source [NATURALEARTH]_

Procedure
---------

1. Open QGIS In the :guilabel:`Browser` navigate to the *qgis2web* (downloaded) folder, click and drag the ``ne_10m_airports.shp`` into the canvas.
 .. image:: /static/3/web_mapping_with_qgis2web/images/1.png
   :align: center

2. Now a new layer will be loaded in the canvas, we will now create a map in QGIS that looks and behaves just like we would
   like in the web map. The plugin ``qgis2web`` will use replicate the QGIS settings and automatically create the web map without us knowing about web
   mapping libraries. When a user clicks on an airport marker, we want an info-window to display useful information about the airport. This information
   is already present in the attribute table of the ``ne_10m_airports`` layers. Right-click on the ``ne_10m_airports`` layer and select
   :guilabel:`Properties`.

 .. image:: /static/3/web_mapping_with_qgis2web/images/2.png
   :align: center

3. In the :guilabel:`Layer Properties` dialog box, switch to :guilabel:`Attribute Forms`. You will notice all the fields name of the layer. 

 .. image:: /static/3/web_mapping_with_qgis2web/images/3.png
   :align: center

4. All fields aren't relevant to the user, so fields **except** *name*, *iata_code*, *type*, and *Wikipedia* are turned off by clicking on the field and change the :guilabel:`Widget Type` to ``Hidden``.  

 .. image:: /static/3/web_mapping_with_qgis2web/images/4.png
   :align: center

5. In the *Wikipedia* field check the ``Multiline`` and ``HTML`` so that the link present in this field will be rendered as a hyperlink for the user. After setting the respective widget type for each field, click :guilabel:`OK`. 

.. image:: /static/3/web_mapping_with_qgis2web/images/5.png
   :align: center

6. Click on the :guilabel:`Identify Feature` button in the toolbar. 

 .. image:: /static/3/web_mapping_with_qgis2web/images/6.png
   :align: center

7. Click on a point, this will fetch the details of the airport in that location, only the *type*, *name*, *iata_code* and *wikipedia* fields are displayed as other fields are hidden. Also, Wikipedia field is highlighted as hyperlink. 

 .. image:: /static/3/web_mapping_with_qgis2web/images/7.png
   :align: center

8. Let's create a new field called *class* and add the word Airport after each entry in type field. (i.e) an entry as major will become a *Major Airport*.

 .. image:: /static/3/web_mapping_with_qgis2web/images/8.png
   :align: center

9. Enter the :guilabel:`Output field name` as ``class``, choose ``Text (String)`` in :guilabel:`Output field type`. The field ``type`` contains values such as ``small``, ``mid``, ``large`` etc. We can add an expression to change the case of the words to sentence case and append the word *airport* for better readability. Enter the following expression in the :guilabel:`Expression` box and click :guilabel:`OK`.

 .. code-block:: none

      concat( title("type"), ' Airport')

 .. image:: /static/3/web_mapping_with_qgis2web/images/9.png
   :align: center

.. note::

	You can also use concatenation ``||`` operator to join strings. The expression can be re-written as ``(title("type") || ' Airport')``
	

10. Now we have a much better looking field for airpor type, we no longer need the *type* field. Right-click on the layer and select :guilabel:`Properties`, switch to  :guilabel:`Attribute Forms` and turn off the *type* field by switching it to ``Hidden``. Click :guilabel:`OK`.

   .. image:: /static/3/web_mapping_with_qgis2web/images/10.png
      :align: center

11. Now use :guilabel:`Identify Feature` tool and select an airport, you will see a new field *class* with the category of airport nicely formatted and the *type* field is removed.

   .. image:: /static/3/web_mapping_with_qgis2web/images/11.png
      :align: center

12. Now let’s style the layer, click on :guilabel:`Open the Layer styling Panel` icon and change the :guilabel:`Type` to ``Categorized``, in :guilabel:`Value` select ``class`` and click :guilabel:`Classify`.

   .. image:: /static/3/web_mapping_with_qgis2web/images/12.png
      :align: center

13. You will see a different colored circle gets assigned to a different type of airport. For this tutorial, we will restrict the map to civilian airports. Hold the :kbd:`Ctrl` key and select all categories for military airports. Once selected, click :guilabel:`Delete`.

   .. image:: /static/3/web_mapping_with_qgis2web/images/13.png
      :align: center

14. Apart from assigning a different color to the category, we can change the size of the symbol to visually help our users distinguish different types of airports. Double-click on the symbol icon in ``Major Airport`` to change the size. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/14.png
      :align: center

15. Now, set the :guilabel:`Size` value to ``4`` , now follow the above step to set the size as ``3`` for ``Mid Airport`` and ``2``
    for ``Small Airport``.

   .. image:: /static/3/web_mapping_with_qgis2web/images/15.png
      :align: center

16. Let's add a base layer for Geo-referencing, ``Stamen Watercolor`` would be a nice background map for this project, to add the layer select :menuselection:`Web QuickMapServises --> Stamen --> Stamen Watercolor`. To know more about this plugin visit :doc:`using_plugins` tutorials.  

   .. image:: /static/3/web_mapping_with_qgis2web/images/16.png
      :align: center

17. Our map is now ready. This is a good time to save our work. Go to
    :menuselection:`Project --> Save`. Enter ``Airports`` as the name of the
    project.

   .. image:: /static/3/web_mapping_with_qgis2web/images/17.png
      :align: center

18. Now we are ready to export our project to a web map. Install the
    ``qgis2web`` plugin by going to :menuselection:`Plugins --> Manage and
    Install Plugin` (See :doc:`using_plugins` for more details on installing
    plugins in QGIS). Once the plugin is installed, go to :menuselection:`Web --> qgis2web -->
    Create a web map`.

   .. image:: /static/3/web_mapping_with_qgis2web/images/18.png
      :align: center

19. Now :guilabel:`Export to web map` dialog box will appear, this is the primary console for customizing the web layout of your web map, on the left part all the controls are present after making changes we can preview the updates on the right side by clicking the :guilabel:`Update preview`. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/19.png
      :align: center

20. Now lets change the :guilabel:`Popup fields` of :guilabel:`ne_10m_airport` layer, change all the fields to ``inline label``, this will give a better view while inspecting the feature in map. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/20.png
      :align: center


21. Now switch to the :guilabel:`Appearance` tab, make sure you're using ``Leaflet`` to gain access to all options in the appearance window, then check the following - ``Add address search``, ``Geolocate user``, ``Highlight on hover``. In :guilabel:`Add layer list:` choose ``Collapsed``, (``Expanded`` is chosen if there are many layer and all layer name have to be shown in web map) and in :guilabel:`Layer search` choose ``ne_10m_airport: iata_code``, by doing this we can enable a search bar from which the user and easily identify any airport with its code. Once made all the changes, click :guilabel:`Update preview`. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/21.png
      :align: center

22. Now, let’s check the features added to the map, click on the :guilabel:`Find` (binocular) icon and type ``DXB`` and press enter, this will center the map to *Dubai international airport*. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/22.png
      :align: center

23. Click on the airport icon to explore the information about the airport. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/23.png
      :align: center

24. Click the :guilabel:`Search` (Magnifying glass) icon, and search for ``New York`` and press enter. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/24.png
      :align: center


25. Now the map will be centered to new your city, you can try for any place/address to get the location, this location is retrieved using by  **geocoding** the address.  We will also add a measure too to get the linear distance between any given points in the web map. In :guilabel:`Measure tool` choose ``Metric``. Click :guilabel:`Update preview`.  

   .. image:: /static/3/web_mapping_with_qgis2web/images/25.png
      :align: center

 
26. Now lets measure the linear distance in SI units, between *EWR* and *JFK* airports. Click on the :guilabel:`Measure` (ruler) icon, this measure uses the QGIS native measure algorithm which is based on the *haversine formula*,  and select ``Create a new measurement``. Then, click over the airports once the point is chosen, the latitude and longitude of the point are captured and used to compute the distance, now the distance is displayed in *meters*. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/26.png
      :align: center

27. Switch to the :guilabel:`Export` tab and check the ``Minify GeoJSON files``, by doing this we can reduce the size of the resulting file. Click on the ``…`` next to :guilabel:`Exporter`.

   .. image:: /static/3/web_mapping_with_qgis2web/images/27.png
      :align: center

28. Choose the desired location (folder) of export and click :guilabel:`Select Folder`, then click :guilabel:`Export` button. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/28.png
      :align: center

29. Now all *properties*, *styling*, and *customized options* are exported in a self-contained folder. Upon successful completion, a link will appear in the Progress popup dialog box, click on the link to open the file location. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/29.png
      :align: center

30. This folder will contain all the required file to create a web map. To view the web map click on ``index.html`` file. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/30.png
      :align: center

.. note::

	The ``qgis2web`` plugin has many limitations and it cannot do everything that the powerful web mapping libraries ``OpenLayers`` and ``Leaflet`` can do. This process can act as the starting point in your web mapping process and save you valuable time by creating a basic template from which you can further customize the web map. You can edit these files in a code editor to customize as you wish. 

31. Now the map will be render in your default web browser. Now let’s test the last option added to map, (i.e) *Geolocate user*, click on the :guilabel:`Marker` icon. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/31.png
      :align: center


32. Browser will ask for *Know your location* permission, click ``Allow``, now the map will center to your current location. 

   .. image:: /static/3/web_mapping_with_qgis2web/images/32.png
      :align: center

The exported map resides on your computer. While you can see it in action, it is not very useful since you cannot share it with anyone. For others to be able to see the map, you need to upload it to a web server. While the upload process will vary on the type of server you have access to - a cheap and easy way to publish your map on the web would be to use any of the public cloud storage services. Amazon S3 is a popular storage service. You will need to sign up for an account and follow the instructions to create a bucket. Once a bucket is created, you can upload the contents of your exported folder to the bucket and set it to public. Similarly, Google also offers a cloud storage service called Google Cloud Storage. Once you have created an account and enable billing, you can create a bucket and upload objects to the bucket. 


