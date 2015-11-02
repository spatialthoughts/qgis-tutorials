Getting Started With Python Programming
=======================================
.. raw:: html

   <p>[ Download PDF
   <a class="reference external" href="../pdf/getting_started_with_pyqgis_a4.pdf"
   onClick="ga('send', 'event', 'PDF Download', 'getting_started_with_pyqgis_a4');"
   target="_blank">A4</a>

   <a class="reference external"
   href="../pdf/getting_started_with_pyqgis_letter.pdf" onClick="ga('send',
   'event', 'PDF Download', 'getting_started_with_pyqgis_letter');"
   target="_blank">Letter</a> ]</p>

QGIS has a powerful programming interface that allows you to extend the core
functionality of the software as well as write scripts to automate your tasks.
QGIS supports the popular Python scripting language. Even if you are a
beginner, learning a little bit of Python and QGIS programming interface will
allow you to be much more productive in your work. This tutorial assumes no
prior programming knowledge and is intended to give an introduction to
python scripting in QGIS (PyQGIS).


Overview of the task
--------------------

We will load a vector point layer representing all major airports and use
python scripting to create a text file with the airport name, airport code,
latitude and longitude for each of the airport in the layer.

Get the data
------------

We will use the `Airports
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/airports/>`_
dataset from Natural Earth.

Download the `Airports shapefile
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_airports.zip>`_.

Data Source [NATURALEARTH]_

Procedure
---------

1. In QGIS, go to :menuselection:`Layers --> Add Vector Layer`. Browse to the
   downloaded ``ne_10m_airports.zip`` file and click :guilabel:`Open`. Select
   the ``ne_10m_airports.shp`` layer and click :guilabel:`OK`.

.. image:: /static/getting_started_with_pyqgis/images/1.png
   :align: center

2. You will see the ``ne_10m_airports`` layer loaded in QGIS.

.. image:: /static/getting_started_with_pyqgis/images/2.png
   :align: center

3. Select the :guilabel:`Identify` tool and click on any of the points to
   examine the available attributes. You will see that the name of the airport
   and it's 3 digit code are contained in the attributes ``name`` and
   ``iata_code`` respectively.

.. image:: /static/getting_started_with_pyqgis/images/3.png
   :align: center

4. QGIS provides a built-in console where you can type python commands and get
   the result. This console is a great way to learn scripting and also to do
   quick data processing. Open the :guilabel:`Python Console` by going to
   :menuselection:`Plugins --> Python Console`.

.. image:: /static/getting_started_with_pyqgis/images/4.png
   :align: center

5. You will see a new panel open at the bottom of QGIS canvas. You will see a
   prompt like ``>>>`` at the bottom where you can type commands. For
   interacting with the QGIS environment, we must use the ``iface`` variable.
   To access the currently active layer in QGIS, you can type the following and
   press :kbd:`Enter`. This command fetches the reference to the currently
   loaded layer and stores it in the ``layer`` variable.

.. code-block:: python

   layer = iface.activeLayer()

.. image:: /static/getting_started_with_pyqgis/images/5.png
   :align: center

6. There is a handy function called ``dir()`` in python that shows you all
   available methods for any object. This is useful when you are not sure
   what functions are available for the object. Run the following command to
   see what operations we can do on the ``layer`` variable.

.. code-block:: python

   dir(layer)

.. image:: /static/getting_started_with_pyqgis/images/6.png
   :align: center

7. You will see a long list of available functions. For now, we will use a
   function called ``getFeatures()`` which will gets you the reference to all
   features of a layer. In our case, each feature will be a point representing
   an airport. You can type the following command to iterate through each of the
   features in the current layer. Make sure to add 2 spaces before typing the
   second line.

.. code-block:: python

   for f in layer.getFeatures():
     print f

.. image:: /static/getting_started_with_pyqgis/images/7.png
   :align: center

8. As you will see in the output, each line contains a reference to a feature
   within the layer. The reference to the feature is stored in the ``f``
   variable. We can use the ``f`` variable to access the attributes of each
   feature. Type the following to print the ``name`` and ``iata_code`` for each
   airport feature.

.. code-block:: python

   for f in layer.getFeatures():
     print f['name'], f['iata_code']

.. image:: /static/getting_started_with_pyqgis/images/8.png
   :align: center

9. So now you know how to programatically access the attribute of each feature
   in a layer. Now, let's see how we can access the coordinates of the feature.
   The coordinates of a vector feature can be accessed by calling the
   ``geometry()`` function. This function returns a geometry object that we can
   store in the variable ``geom``. You can run ``asPoint()`` function on the
   geometry object to get the x and y coordinates of the point. If your feature
   is a line or a polygon, you can use ``asPolyline()`` or ``asPolygon()``
   functions. Type the following code at the prompt and press :kbd:`Enter` to see
   the x and y coordinates of each feature.

.. code-block:: python

   for f in layer.getFeatures():
     geom = f.geometry()
     print geom.asPoint()

.. image:: /static/getting_started_with_pyqgis/images/9.png
   :align: center

10. What if we wanted to get only the ``x`` cordinate of the feature? You can
    call the ``x()`` function on the point object and get its x coordinate.

.. code-block:: python

   for f in layer.getFeatures():
     geom = f.geometry()
     print geom.asPoint().x()

.. image:: /static/getting_started_with_pyqgis/images/10.png
   :align: center

11. Now we have all the pieces that we can stitch together to generate our
    desired output. Type the following code to print the name, iata_code,
    latitude and longitude of each of the airport features. The ``%s`` and
    ``%f`` notations are ways to format a string and number variables.

.. code-block:: python

   for f in layer.getFeatures():
     geom = f.geometry()
     print '%s, %s, %f, %f' % (f['name'], f['iata_code'],
            geom.asPoint().y(), geom.asPoint().x())

.. image:: /static/getting_started_with_pyqgis/images/11.png
   :align: center

12. You can see the output printed on the console. A more useful way to store
    the output would be in a file. You can type the following code to create a
    file and write the output there. Replace the file path with a path on your
    own system. Note that we add ``\n`` at the end of our line formatting. This
    is to add a newline after we add the data for each feature. You should also
    note the ``unicode_line = line.encode('utf-8')`` line. Since our layer
    contains some features with unicode characters, we can't simply write it to
    a text file. We encode the text using the UTF-8 encoding and then write to
    the text file.

.. code-block:: python

   output_file = open('c:/Users/Ujaval/Desktop/airports.txt', 'w')
   for f in layer.getFeatures():
     geom = f.geometry()
     line = '%s, %s, %f, %f\n' % (f['name'], f['iata_code'],
             geom.asPoint().y(), geom.asPoint().x())
     unicode_line = line.encode('utf-8')
     output_file.write(unicode_line)
   output_file.close()

.. image:: /static/getting_started_with_pyqgis/images/12.png
   :align: center

13. You can go to the output file location you specified and open the text file.
    You will see the data from the airports shapefile that we extracted using
    python scripting.

.. image:: /static/getting_started_with_pyqgis/images/13.png
   :align: center

