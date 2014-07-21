Using Google Maps Engine Connector for QGIS
===========================================

.. only:: html

   [ Download PDF `A4 <../pdf/using_gme_connector_a4.pdf>`_ `Letter
   <../pdf/using_gme_connector_letter.pdf>`_ ]

Google Maps Engine is a cloud based mapping platform for creating and sharing
custom maps. `Google Maps Engine Connector
<https://github.com/googlemaps/mapsengine-qgis-connector>`_ is a plugin
that allows you to view and upload Google Maps Engine data from within QGIS.
This tutorial will go through the process of creating a Google Maps Engine
account, obtaining necessary credentials for using the connector, creating a map
using Google Maps Engine and consuming the resulting map in QGIS.

.. note::

   Disclaimer: I am the author of the Google Maps Engine Connector and
   currently part of the Google Maps team.

Overview of the task
--------------------

We will take a line layer representing bike routes in San Francisco and upload
it to Google Maps Engine using the plugin. Once the layer is styled and a map
is created, we will add that map to QGIS as a WMS layer.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Using the Google Developer Console to set up a new project for using Google
  APIs.

Get the data
------------

`San Francisco Data <https://data.sfgov.org/>`_ is an excellent source
of open data for San Francisco.

1. Download the `SFMTA Bikeway Network
   <https://data.sfgov.org/Transportation/SFMTA-Bikeway-Network/sshc-gutj>`_
   shapefile using the Export option on the portal.

.. image:: /static/using_gme_connector/images/1.png
   :align: center

Data Source: [SFMTA]_

Create a Google Maps Engine account
-----------------------------------

2. You can sign up for a free Google Maps Engine trial account. The trial
   account is a full featured Maps Engine instance with limited storage quota.
   Visit `Google Maps Engine homepage
   <http://www.google.com/enterprise/mapsearth/products/mapsengine.html>`_ and
   click the :guilabel:`Get started with a free account` link.

.. image:: /static/using_gme_connector/images/2.png
   :align: center

3. You will need to sign-in to your Google account. If you wish to use your
   work email, you can create a new Google account with your work email address
   as well. Once signed in, you will see the :guilabel:`Create a Maps Engine
   Project` screen. Enter a :guilabel:`Project Name` which will identify your
   account when using Google Maps Engine. Accept the terms and click
   :guilabel:`Accept and create` button.

.. image:: /static/using_gme_connector/images/3.png
   :align: center

Create a Google Developer Console project
-----------------------------------------

4. The Google Maps Engine Connector uses the ``Google Maps Engine
   API`` to access the data stored in your account. You will need to obtain
   special credentials which the plugin will use to programatically access your
   data. Visit `Google Developer Console <https://console.developers.google.com/>`_
   and click :guilabel:`Create Project`. Enter ``GME Connector for
   QGIS API`` as the :guilabel:`PROJECT NAME` and ``gme-qgis-api`` as the
   :guilabel:`PROJECT ID`. These names are just a suggestion - you may use any
   name and id you like.

.. image:: /static/using_gme_connector/images/4.png
   :align: center

5. Once the project is created, click the :guilabel:`APIs & auth` link. Scroll
   down and find the :guilabel:`Google Maps Engine API`. Click the
   :guilabel:`OFF` button to toggle it to :guilabel:`ON`.

.. image:: /static/using_gme_connector/images/5.png
   :align: center

6. Next, click on the :guilabel:`Credentials` link. Click :guilabel:`CREATE NEW
   CLIEND ID` under the :guilabel:`OAuth` section.

.. image:: /static/using_gme_connector/images/6.png
   :align: center

7. In the :guilabel:`Create Client ID` dialog, select :guilabel:`Installed
   Application` as the :guilabel:`APPLICATION TYPE` and :guilabel:`Other` as
   the :guilabel:`INSTALLED APPLICATION TYPE`. Click :guilabel:`Create Client
   ID.`

.. image:: /static/using_gme_connector/images/7.png
   :align: center

8. Once the client id is created, you will see a new section called
   :guilabel:`Client ID for native application`. Note the :guilabel:`Client ID`
   and :guilabel:`Client secret`. These are the credentials you will need to use
   in QGIS.

.. image:: /static/using_gme_connector/images/8.png
   :align: center

9. Back in QGIS, visit :menuselection:`Plugins --> Manage and Install
   Plugins...`. Find the ``Google Maps Engine Connector`` plugin and
   click :guilabel:`Install plugin`.

.. image:: /static/using_gme_connector/images/9.png
   :align: center

10. Once the plugin is installed, you will see a new toolbar in QGIS. This
    toolbar contains various tools to work with Google Maps Engine. Click the
    :guilabel:`More` button.

.. image:: /static/using_gme_connector/images/10.png
   :align: center

11. In the :guilabel:`Advanced Settings` dialog, enter the :guilabel:`Client
    ID` and :guilabel:`Client Secret` you obtained from Google Developer
    Console. Click :guilabel:`OK`.

.. image:: /static/using_gme_connector/images/11.png
   :align: center

12. As you entered new API credentials, you will be prompted to log-in and
    authorize the plugin to use these. Sign-in to your Google account.

.. image:: /static/using_gme_connector/images/12.png
   :align: center

13. Click :guilabel:`Accept` in the next screen.

.. image:: /static/using_gme_connector/images/13.png
   :align: center

14. If all went well, you will see a message indicating you have successfully
    logged in.

.. image:: /static/using_gme_connector/images/14.png
   :align: center

15. Now lets add the SFMTA Bikeway Network layer that was downloaded earlier.
    Go to :menuselection:`Layer --> Add Vector Layer`. Browse to the downloaded
    ``SFMTA_Bikeway_Network.zip`` file and click :guilabel:`Open`. Select the
    ``SFMTA_Bikeway_Network.shp`` layer and click :guilabel:`OK`.

.. image:: /static/using_gme_connector/images/15.png
   :align: center

16. One of the features of the ``Google Maps Engine Connector`` plugin
    is the ability to upload datasets directly from QGIS. Select the
    ``SFMTA_Bikeway_Network`` layer and click :guilabel:`Upload` icon in the
    toolbar.

.. image:: /static/using_gme_connector/images/16.png
   :align: center

17. In the :guilabel:`Upload a dataset to Google Maps Engine` dialog, enter a
    :guilabel:`Description` of the dataset. You may leave all other settings to
    default values. Click :guilabel:`OK`.

.. image:: /static/using_gme_connector/images/17.png
   :align: center

18. The plugin will use the Google Maps Engine API to upload the layer and
    create a Google Maps Engine *Data Source*. Once the upload is finished, a
    new browser tab will open and take you to the newly created data source.

.. image:: /static/using_gme_connector/images/18.png
   :align: center

19. The next few steps will demonstrate the process of creating a map using
    Google Maps Engine. Once the map is created, we will access that map using
    the plugin in QGIS. Once your vector table has finished processing, click
    :guilabel:`Create styled layer`.

.. image:: /static/using_gme_connector/images/19.png
   :align: center

20. Name the layer as ``SFMTA_Bikeway_Network`` and click :guilabel:`Create`.

.. image:: /static/using_gme_connector/images/20.png
   :align: center

21. Click :guilabel:`Add rule` to add a custom style for the layer.

.. image:: /static/using_gme_connector/images/21.png
   :align: center

22. Choose the color and label options under the :guilabel:`Line style`
    section. Click :guilabel:`Apply` to view the style settings applied to your
    layer. You may also select :guilabel:`No Basemap` option from top-right
    corner to allow you to see your layer without the underlying basemap. Once
    you are satisfied with the styling, switch to the :guilabel:`Info windows`
    tab.

.. image:: /static/using_gme_connector/images/22.png
   :align: center

23. Here you can specify what content is shown when a feature is clicked on the
    map. You can access the feature attributes using the markup
    ``{attribute_name}``. In this case, we just want to display the street name
    for the line feature. Enter the following in the text area. Click
    :guilabel:`Apply` and click on any line feature on the map to test the info
    window code. When done, check the :guilabel:`Publish on exit` button and
    click :guilabel:`Exit`.

.. code-block:: none

   <div class='googeb-info-window' style='font-family: sans-serif'>
    {STREETNAME}  {TYPE}
   </div>

.. image:: /static/using_gme_connector/images/23.png
   :align: center

24. Click :guilabel:`Add to map` to create a map with this layer.

.. image:: /static/using_gme_connector/images/24.png
   :align: center

25. Select :guilabel:`Create new` and enter ``SFMTA Bikeway Network`` as the
    :guilabel:`Map title`.

.. image:: /static/using_gme_connector/images/25.png
   :align: center

26. You will see a new map containing the styled layer. You have an option of
    choosing different basemaps for the map. Since this is a bike path map, you
    can select the :guilabel:`Terrain` style basemap.

.. image:: /static/using_gme_connector/images/26.png
   :align: center

27. Click :guilabel:`Publish map`.

.. image:: /static/using_gme_connector/images/27.png
   :align: center

28. Once the map is published, click on the :guilabel:`Access links` icon.

.. image:: /static/using_gme_connector/images/28.png
   :align: center

29. You will see various options to view, embed and access the newly created
    map. Since we will be accessing the map using the QGIS plugin, you do not
    need any links from here.

.. image:: /static/using_gme_connector/images/29.png
   :align: center

30. Back in QGIS, click the :guilabel:`Search` icon in the toolbar.

.. image:: /static/using_gme_connector/images/30.png
   :align: center

31. In the :guilabel:`Maps Engine Maps` dialog, you will see your map listed.
    Click on the row to select it. Click :guilabel:`Add Selected to Map`.

.. image:: /static/using_gme_connector/images/31.png
   :align: center

32. The plugin will query Google Maps Engine and load a vector layer containing
    the bounding box of the map. If you do not see any data on the canvas,
    right-click on the ``SFMTA_Bikeway_Network`` layer and select
    :guilabel:`Zoom to Layer Extent`.

.. image:: /static/using_gme_connector/images/32.png
   :align: center

33. Click on the bounding box layer to select it. You will notice that the
    :guilabel:`View` tools are now enabled. Click on the :guilabel:`WMS
    Overlay` icon in the toolbar.

.. image:: /static/using_gme_connector/images/33.png
   :align: center

34. In the :guilabel:`Select A Layer to Add` dialog, choose the
    ``SFMTA_Bikeway_Network`` layer and click :guilabel:`Add Selected to Map`.

.. image:: /static/using_gme_connector/images/34.png
   :align: center

35. A new WMS layer will be added to QGIS and you will see your styled layer
    from Google Maps Engine displayed in QGIS.

.. image:: /static/using_gme_connector/images/35.png
   :align: center

Hope this tutorial gives an overview of the capabilities of the plugin. You can
visit the `plugin homepage <https://github.com/googlemaps/mapsengine-qgis-connector>`_
to view the source code and learn more about the plugin.

.. only:: html

   Below is the Google Maps Engine map that was created for this tutorial.

.. raw:: html

   <div style="margin-top:10px;">
   <iframe
   src="https://mapsengine.google.com/13476080153727555143-08887688179650036554-4/widget/in_iframe"
   width="100%" height="600px"></iframe>
   </div>
