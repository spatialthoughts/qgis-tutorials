Using Custom Python Expression Functions
========================================

.. warning:: 

   A new version of this tutorial is available at :doc:`3/custom_python_functions`

Expressions in QGIS have a lot of power and are used in many core features -
selection, calculating field values, styling, labelling etc. QGIS also has
support for user-defined expressions. With a little bit of python programming,
you can define your own functions that can be used within the expression
engine.

Overview of the task
--------------------

We will define a custom function that finds the UTM Zone of a map feature and
use this function to write an expression that displays the UTM zone as a map
tip when hovered over the point.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- How to use the ``Map Tips`` tool to display custom text when hovering over a
  feature.

Get the data
------------

We will use Natural Earth's `Populated Places
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_
dataset. Download the `simple (less columns) dataset
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_

For convenience, you may directly download a copy of the dataset from the links
below:

`ne_10m_populated_places_simple.zip <http://www.qgistutorials.com/downloads/ne_10m_populated_places_simple.zip>`_

Procedure
---------

1. Open QGIS and go to :menuselection:`Layers --> Add Vector --> Add Vector
   Layer`.

.. image:: /static/custom_python_functions/images/1.png
   :align: center

2. Browse to the downloaded ``ne_10m_populated_places_simple.zip`` file and
   click :guilabel:`Open`.

.. image:: /static/custom_python_functions/images/2.png
   :align: center

3. Go to :menuselection:`View --> Select --> Select By Expressions...`.

.. image:: /static/custom_python_functions/images/3.png
   :align: center

4. Switch to the :guilabel:`Function Editor` tab. Here you can write any
   PyQGIS code that will be executed by the expression engine.

.. image:: /static/custom_python_functions/images/4.png
   :align: center

5. We will define a custom function named ``GetUtmZone`` that will calculate
   the UTM zone number for each feature. Since custom functions in QGIS work at
   the feature level. We will use the centroid of the feature's geometry and
   compute the UTM Zone from the latitude and longitude of the centroid
   geometry. We will also add a 'N' or 'S' designation to the zone to indicate
   whether the zone is in the northern or southern hemisphere. Type the
   following code in the editor, enter the name of the file as ``utm_zones.py``
   and click :guilabel:`Save file`.

.. note::

   UTM Zones are longitudinal projection zones numbered from 1 to 60. Each UTM
   zone is 6 degree wide. Here we use a simple mathematical formula to find the
   appropriate zone for a given longitude value. Note that this formula doesn't
   cover some special UTM zones.

.. code-block:: python

   import math
   from qgis.core import *
   from qgis.gui import *

   @qgsfunction(args=0, group='Custom', usesgeometry=True)
   def GetUtmZone(value1, feature, parent):
       centroid = feature.geometry()
       longitude = centroid.asPoint().x()
       latitude = centroid.asPoint().y()
       zone_number = math.floor(((longitude + 180) / 6) % 60) + 1

       if latitude >= 0:
           zone_letter = 'N'
       else:
           zone_letter = 'S'

       return '%d%s' % (int(zone_number), zone_letter)

.. image:: /static/custom_python_functions/images/5.png
   :align: center

6. Click :guilabel:`Run Script`. This will execute the python code and register
   the function ``GetUtmZone`` with the expression engine. Note that this is
   needed to be done only once. Once the function is registered, it will always
   be available to the expression engine.

.. image:: /static/custom_python_functions/images/6.png
   :align: center

7. Switch to the :guilabel:`Expression` tab in the :guilabel:`Select by
   expression` dialog. Find and expand the :guilabel:`Custom` group in the
   :guilabel:`Functions` section. You will notice a new custom function
   ``$GetUtmZone`` in the list. We can now use this function in the expressions
   just like any other function. Type the following expression in the editor.
   This expression will select all points that fall in the UTM Zone ``40N``.
   Click :guilabel:`Select`.


.. code-block:: none

   $GetUtmZone = '40N'

.. image:: /static/custom_python_functions/images/7.png
   :align: center

8. Back in the main QGIS window, you will see many points highlighted in
   yellow. These are the points falling in the UTM Zone we specified in the
   expression.

.. image:: /static/custom_python_functions/images/8.png
   :align: center

9. You saw how we defined and used a custom function to select features by
   expression. We will now use the same function in another context. One of the
   hidden gems in QGIS is the ``Map Tip`` tool. This tool shows user-defined
   text when you hover over a feature. Right-click the
   ``ne_10m_populated_places_simple`` layer and select :guilabel:`Properties`.

.. image:: /static/custom_python_functions/images/9.png
   :align: center

10. Switch to the :guilabel:`Display` tab and select :guilabel:`HTML`. Here you
    can enter any text that will be displayed when you hover over the features
    of the layer. Even better, you can use layer field values and expressions
    to define a much more useful message. Click on the :guilabel:`Insert
    expression...` button.

.. image:: /static/custom_python_functions/images/10.png
   :align: center

11. You will see the familiar expression editor again. We will use the
    ``concat`` function to join the value of the field ``name`` and the result
    of our custom function $GetUtmZone. Enter the following expression and
    click :guilabel:`OK`.

.. code-block:: none

   concat("name", ' | UTM Zone: ', $GetUtmZone)

.. image:: /static/custom_python_functions/images/11.png
   :align: center

12. You will see the expression entered as the value of the :guilabel:`Display`
    text. Click :guilabel:`OK`.

.. image:: /static/custom_python_functions/images/12.png
   :align: center

13. Before we proceed, let us de-select the features that were selected in the
    previous step. Go to :menuselection:`View --> Select --> Deselect Features
    from All Layers`.

.. image:: /static/custom_python_functions/images/13.png
   :align: center

14. Activate the ``Map Tips`` tool by going to :menuselection:`View --> Map
    Tips`.

.. image:: /static/custom_python_functions/images/14.png
   :align: center

15. Zoom into any area of the map and put your mouse cursor over any feature.
    You will see the name of the city and corresponding UTM zone displayed as
    the map tip.

.. image:: /static/custom_python_functions/images/15.png
   :align: center
