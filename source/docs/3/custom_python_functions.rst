Using Custom Python Expression Functions (QGIS3)
================================================

Expressions in QGIS have a lot of power and are used in many core features: selection, calculating field values, styling, labelling etc. QGIS also has support for user-defined expressions. With a little bit of python programming, you can define your own functions that can be used within the expression engine.

Overview of the task
--------------------

We will define a custom function that finds the `UTM zone number <https://www.dmap.co.uk/utmworld.htm>`_ of a map feature and use this function to write an expression that displays the UTM zone as a map tip when hovered over the point. 
 
Other skills you will learn
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  How to use the ``Map Tips`` tool to display custom text when hovering over a feature.

Get the data
------------

We will use Natural Earth's `Populated Places <https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`__ dataset. Download the `simple (less columns) dataset <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`__

Procedure
---------

1. Locate the ``ne_10m_populated_places_simple.zip`` file in the QGIS Browser and expand it. Select the ``ne_10m_populated_places_simple.shp`` file and drag it to the canvas. 

  .. image:: /static/3/custom_python_functions/images/1.png
     :align: center


2.  Go to :menuselection:`Edit --> Select --> Select Features By Expression...` or click the :guilabel:`Select features using an expression` button on the :guilabel:`Attributes Toolbar`.

  .. image:: /static/3/custom_python_functions/images/2.png
     :align: center


3. In the :guilabel:`Select by Expression` dialog, switch to the :guilabel:`Function Editor` tab. Here you can write any PyQGIS code that will be executed by the expression engine.

  .. image:: /static/3/custom_python_functions/images/3.png
     :align: center

4. We will define a custom function named ``GetUtmZone`` that will calculate the UTM zone number for each feature. Since custom functions in QGIS work at the feature level. We will use the centroid of the feature's geometry and compute the UTM Zone from the latitude and longitude of the centroid geometry. We will also add a 'N' or 'S' designation to the zone to indicate whether the zone is in the northern or southern hemisphere. Press the :guilabel:`+` button in the lower left of the screen and type ``utm_zones.py`` as the file name. You can click the :guilabel:`Help` label in the bottom panel to close it and expand the code panel.

  .. image:: /static/3/custom_python_functions/images/4.gif
     :align: center

5. UTM Zones are longitudinal projection zones numbered from 1 to 60. Each UTM zone is 6 degree wide. Here we use a simple mathematical formula to find the appropriate zone for a given longitude value. This formula works for all except a few `special UTM zones <https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system#Exceptions>`_. Type the following code into the editor window. When you are finished click :guilabel:`Save and Load Functions`.

    .. code-block:: python

        import math
        from qgis.core import *
        from qgis.gui import *

        @qgsfunction(args=0, group='Custom', usesgeometry=True)
        def GetUtmZone(value1, feature, parent):
            """Return the UTM Zone of the feature's geometry as a String"""
            centroid = feature.geometry()
            longitude = centroid.asPoint().x()
            latitude = centroid.asPoint().y()
            zone_number = math.floor(((longitude + 180) / 6) % 60) + 1

            if latitude >= 0:
                zone_letter = 'N'
            else:
                zone_letter = 'S'

            return '%d%s' % (int(zone_number), zone_letter)

    .. image:: /static/3/custom_python_functions/images/5.png
       :align: center

.. note::

  Currently there is no way to delete an expression file from the GUI. If you wish to delete the ``utm_zone.py`` file, you can go to :menuselection:`Settings --> User Profiles --> Open Active Profile Folder` and delete the file from :menuselection:`python --> expressions`.
  
    
6. Switch to the Expression tab in the Select by expression dialog. Find and expand the :guilabel:`Custom` group in the Functions section. You will notice a new custom function ``GetUtmZone`` in the list. We can now use this function in the expressions just like any other function. Type the following expression in the editor. This expression will     select all points that fall in the UTM Zone ``33N``. Click :guilabel:`Zoom to Features` and the map will change, if you click :guilabel:`Select Features` you should see the points in UTM zone 33N change colour to yellow. 
    
    .. code-block:: none

      GetUtmZone() = '33N'

    .. image:: /static/3/custom_python_functions/images/6.png
       :align: center

.. note::

  Due to a bug, this feature did not work in earlier versions of QGIS 3. It has been fixed from version 3.4.5 onwards.
      
7. Back in the main QGIS window, you should see some points highlighted in yellow. These are the points falling in the UTM Zone we specified in the expression.

    .. image:: /static/3/custom_python_functions/images/7.png
       :align: center

8.  You saw how we defined and used a custom function to select features by expression. We will now use the same function in another context. One of the hidden gems in QGIS is the **Map Tip** tool. This tool shows user-defined text when you hover over a feature. Right-click the ``ne_10m_populated_places_simple`` layer and select Properties.

    .. image:: /static/3/custom_python_functions/images/8.png
       :align: center

9.  Switch to the Display tab. Here you can enter any text that will be displayed when you hover over the features of the layer. Even better, you can use layer field values and expressions to define a much more useful message. Click on the :guilabel:`Ɛ` button.

    .. image:: /static/3/custom_python_functions/images/9.png
       :align: center

10. You will see the familiar expression editor again. We will use the ``concat`` function to join the value of the field ``name`` and the result of our custom function ``GetUtmZone``. Enter the following expression and click :guilabel:`OK`.

    .. code-block:: python
    
      concat("name",' | UTM Zone: ', GetUtmZone())

    .. image:: /static/3/custom_python_functions/images/10.png
       :align: center

11. You will see the expression entered as the value of the Display text. Click :guilabel:`Insert` to add it to the HTML box and then press :guilabel:`OK`.

    .. image:: /static/3/custom_python_functions/images/11.png
       :align: center

12. Before we proceed, let us de-select the features that were selected in the previous step. Go to :menuselection:`Edit --> Select --> Deselect Features From All Layers` or click the :guilabel:`Deselect Features From All Layers` button on the :guilabel:`Attribute Toolbar`.

    .. image:: /static/3/custom_python_functions/images/12.png
       :align: center

13. Activate the ``Map Tips`` tool by going to :menuselection:`View --> Map Tips` or clicking the :guilabel:`Show Map Tips` button on the :guilabel:`Attributes Toolbar`.

    .. image:: /static/3/custom_python_functions/images/13.png
       :align: center

14. Zoom into any area of the map and put your mouse cursor over any feature. You will see the name of the city and corresponding UTM zone displayed as the map tip.

    .. image:: /static/3/custom_python_functions/images/14.gif
       :align: center