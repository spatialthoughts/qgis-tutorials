Getting Started With Python Programming (QGIS3)
===============================================

QGIS has a powerful programming interface that allows you to extend the core functionality of the software as well as write scripts to automate your tasks. QGIS supports the popular Python scripting language. Even if you are a beginner, learning a little bit of Python and QGIS programming interface will allow you to be much more productive in your work. This tutorial assumes no prior programming knowledge and is intended to give an introduction to python scripting in QGIS (PyQGIS).

Overview of the task
--------------------

We will load a vector point layer representing all major airports and use python scripting to create a text file with the airport name, airport code, latitude and longitude for each of the airport in the layer.

Get the data
------------

We will use the `Airports <https://www.naturalearthdata.com/downloads/10m-cultural-vectors/airports/>`_ dataset from Natural Earth.

Download the `Airports shapefile <https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_airports.zip>`_.

Procedure
---------

1. Locate the ``ne_10m_airports.zip`` file in the QGIS Browser and expand it. Select the ``ne_10m_airports.shp`` file and drag it to the canvas. 

.. image:: /static/3/getting_started_with_pyqgis/images/1.png
	 :align: center

2. You will see the ``ne_10m_airports`` layer loaded in QGIS.

.. image:: /static/3/getting_started_with_pyqgis/images/2.png
	 :align: center


3. Select the  :guilabel:`Identify` tool and click on any of the points to examine the available attributes. You will see that the name of the airport and it's 3 digit code are contained in the attributes ``name`` and ``iata_code`` respectively. You can close the :guilabel:`Identify` window.

.. image:: /static/3/getting_started_with_pyqgis/images/3.png
	 :align: center
	 
4. QGIS provides a built-in console where you can type python commands and get the result. This console is a great way to learn scripting and also to do quick data processing. Open the Python Console by going to :menuselection:`Plugins --> Python Console`.

.. image:: /static/3/getting_started_with_pyqgis/images/4.png
	 :align: center

5.  You will see a new panel open at the bottom of QGIS canvas. You will see a prompt like ``>>>`` at the bottom where you can type commands. For interacting with the QGIS environment, we must use the ``iface`` variable. To access the currently active layer in QGIS, you can type the following and press :kbd:`Enter`. This command fetches the reference to the currently loaded layer and stores it in the ``layer`` variable.

.. code-block:: python

   layer = iface.activeLayer()
	 
.. image:: /static/3/getting_started_with_pyqgis/images/5.png
	 :align: center
	 
6. There is a handy function called ``dir()`` in python that shows you all available methods for any object. This is useful when you are not sure what functions are available for the object. Run the following command to see what operations we can do on the ``layer`` variable.

.. code-block:: python

   dir(layer)

.. image:: /static/3/getting_started_with_pyqgis/images/6.png
   :align: center


7. You will see a long list of available functions. For now, we will use a function called ``getFeatures()`` which will gets you the reference to all features of a layer. In our case, each feature will be a point representing an airport. You can type the following command to iterate through each of the features in the current layer.

.. note::

  Indentation (or number of spaces before each statement) is very important in Python. If you get error in this step, make sure you have added 2 spaces before typing the second line.
  
  As the print(f) statement is inside a for-loop, you will need to press :kbd:`Enter` twice after that statement - once to exit the loop - and another to execute the command.
  
.. code-block:: python

   for f in layer.getFeatures():
     print(f)

.. image:: /static/3/getting_started_with_pyqgis/images/7.gif
   :align: center

8. As you will see in the output, each line contains a reference to a feature within the layer. The reference to the feature is stored in the ``f`` variable. We can use the ``f`` variable to access the attributes of each feature. Type the following to print the ``name`` and ``iata_code`` for each airport feature.

.. code-block:: python

   for f in layer.getFeatures():
     print(f['name'], f['iata_code'])

.. image:: /static/3/getting_started_with_pyqgis/images/8.gif
   :align: center
	 

9. So now you know how to programatically access the attribute of each feature in a layer. Let's see how we can access the coordinates of the feature. The coordinates of a vector feature can be accessed by calling the ``geometry()`` function. This function returns a geometry object that we can store in the variable ``geom``. You can run ``asPoint()`` function on the geometry object to get the x and y coordinates of the point. If your feature is a line or a polygon, you can use ``asPolyline()`` or ``asPolygon()`` functions. Type the following code at the prompt and press :kbd:`Enter` to see the x and y coordinates of each feature.

.. code-block:: python

   for f in layer.getFeatures():
     geom = f.geometry()
     print(geom.asPoint())

.. image:: /static/3/getting_started_with_pyqgis/images/9.gif
   :align: center

10. What if we wanted to get only the ``x`` cordinate of the feature? You can call the ``x()`` function on the point object and get its x coordinate.

.. code-block:: python

   for f in layer.getFeatures():
     geom = f.geometry()
     print(geom.asPoint().x())

.. image:: /static/3/getting_started_with_pyqgis/images/10.gif
   :align: center
	 
11. Now we have all the pieces that we can stitch together to generate our desired output. Type the following code to print the name, iata_code, latitude and longitude of each of the airport features. Here we are using the ``.format()`` method which gives more control on printing multiple variables. The ``.2f`` notation is to limit the coordinates to 2 decimals. 

.. code-block:: python

   for f in layer.getFeatures():
     geom = f.geometry()
     print('{},{},{:.2f},{:.2f}'.format(f['name'], f['iata_code'], geom.asPoint().y(), geom.asPoint().x()))
		 
.. image:: /static/3/getting_started_with_pyqgis/images/11.gif
   :align: center

12. You can see the output printed on the console. A more useful way to store the output would be in a file. You can type the following code to create a file and write the output there. Replace the file path with a path on your own system. Note that we add ``\n`` at the end of our line formatting. This is to add a newline after we add the data for each feature.

.. note::

  There are 2 levels of code blocks below. Do make sure to add 4 spaces to the code starting line 3.
	
.. code-block:: python

   with open('/Users/ujaval/Desktop/airports.txt', 'w') as file:
     for f in layer.getFeatures():
       geom = f.geometry()
       line = '{},{},{:.2f},{:.2f}\n'.format(f['name'], f['iata_code'], geom.asPoint().y(), geom.asPoint().x())
       file.write(line)
		 
.. image:: /static/3/getting_started_with_pyqgis/images/12.gif
   :align: center

13. You can go to the output file location you specified and open the text file. You will see the data from the airports shapefile that we extracted using python scripting.

.. image:: /static/3/getting_started_with_pyqgis/images/13.png
   :align: center
