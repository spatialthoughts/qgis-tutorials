Writing Python Scripts for Processing Framework
===============================================
One can write standalone pyqgis scripts that can be run via the Python Console
in QGIS. With a few tweaks, you can make your standalone scripts run via the
Processing Framework. This has several advantages. First, taking user input and
writing output files is far easier because Processing Framework offers standardized
user interface for these. Second, having your script in the Processing Toolbox also
allows it to be part of any Processing Model or be run as a Batch job with
multiple inputs. This tutorial will show how to write a custom python script
that can be part of the Processing Framework in QGIS.

Overview of the task
--------------------

Our script will perform a dissolve operation based on a field chosen by the
user. It will also sum up values of another field for the dissolved features.
In the example, we will dissolve a world shapefile based on a ``SUBREGION``
attribute and sum up ``POP_EST`` field to calculate total population in the
dissolved region.

.. note::

   If you are looking to do a Dissolve operation along with Statistics, you can
   use the excellent ``DissolveWithStats`` plugin. This script is a
   demonstration how to implement similar functionality via a Processing
   script.

Get the data
------------
We will use the `Admin 0 - Countries
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/>`_
dataset from Natural Earth.

Download the `Admin 0 - countries shapefile.
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_.

Data Source [NATURALEARTH]_

For convenience, you may directly download a copy of the dataset from the links
below:

`ne_10_admin_0_countries.zip <http://www.qgistutorials.com/downloads/ne_10m_admin_0_countries.zip>`_

Procedure
---------

1. Open QGIS and go to :menuselection:`Layers --> Add Vector --> Add Vector
   Layer`. Browse to the downloaded ``ne_10_admin_0_countries.zip`` file and
   load the ``ne_10_admin_0_countries`` layer. Go to :menuselection:`Processing
   --> Toolbox`.

.. image:: /static/processing_python_scripts/images/1.png
   :align: center

2. Expand the :guilabel:`Scripts` group in the :guilabel:`Processing Toolbox`
   and select :guilabel:`Create a new script`.

.. image:: /static/processing_python_scripts/images/2.png
   :align: center

3. For a python script to be recognized as a Processing script, the beginning
   of the script must be the specifications of the input and outputs. This will
   be used to construct the user interface to run the script. You can learn
   more about the format of these lines from `QGIS Processing Documentation
   <https://docs.qgis.org/2.8/en/docs/user_manual/processing/scripts.html>`_.
   Enter the following lines in the :guilabel:`Script editor`. Here we are
   specifying 3 user inputs: ``dissolve_layer``, ``dissolve_field`` and
   ``sum_field``. Note that we are adding ``dissolve_layer`` after both the
   field input definitions. This means that input will be pre-populated with
   choice of fields from the ``dissolve_layer``. We also specify the
   ``output_layer`` as the output vector layer. Click :guilabel:`Save` button.

.. code-block:: none

   ##dissolve_layer=vector
   ##dissolve_field=field dissolve_layer
   ##sum_field=field dissolve_layer
   ##output_layer=output vector

.. image:: /static/processing_python_scripts/images/3.png
   :align: center

4. Name the script ``dissolve_with_sum`` and save it at the default location
   under :menuselection:`.qgis2 --> processing --> scripts` folder.

.. image:: /static/processing_python_scripts/images/4.png
   :align: center

5. Back in the :guilabel:`Script editor`, click :guilabel:`Run algorithm`
   button to preview the user interface.

.. image:: /static/processing_python_scripts/images/5.png
   :align: center

6. You can see that just by adding a few lines, we have a nice user interface
   for the user to specify the inputs. It is also consistent with all other
   Processing algorithms, so there is no learning curve involved in using your
   custom algorithm.

.. image:: /static/processing_python_scripts/images/6.png
   :align: center

7. In the :guilabel:`Script editor`, enter the following code. You will notice
   that we are using some special methods such as ``processing.getObject()``
   and ``processing.features()``. These are convenience wrappers that make it
   easy to work with data. You can learn more about these from `Additional
   functions for handling data
   <https://docs.qgis.org/2.8/en/docs/user_manual/processing/console.html#additional-functions-for-handling-data>`_
   section of QGIS Processing Documentation. Click :guilabel:`Save` to save the
   newly entered code and then the :guilabel:`X` button to close the editor.
   
.. note::

   This script uses python list comprehensions extensively. Take a look at this 
   `list comprehension tutorial <https://docs.python.org/2/tutorial/datastructures.html#list-comprehensions>`_
   to get familiar with the syntax.

.. code-block:: python

   from qgis.core import *
   from PyQt4.QtCore import *

   inlayer = processing.getObject(dissolve_layer)
   dissolve_field_index = inlayer.fieldNameIndex(dissolve_field)
   sum_field_index = inlayer.fieldNameIndex(sum_field)

   # Find unique values present in the dissolve field
   unique_values = set([f[dissolve_field] for f in
   processing.features(inlayer)])

   print unique_values

.. image:: /static/processing_python_scripts/images/7.png
   :align: center

8. While writing code, it is important to be able to see errors and debug your
   code. Your processing scripts can be debugged easily via the built-in Python
   Console. In the main QGIS window, go to :menuselection:`Plugins --> Python
   Console`. Once the console is open, find your script in the
   :guilabel:`Processing Toolbox` and double-click it to launch it.

.. image:: /static/processing_python_scripts/images/8.png
   :align: center

9. Select ``SUBREGION`` as the :guilabel:`dissolve field`. You may choose any
   field as the :guilabel:`sum field` as the script doesn't have any code yet
   to deal with it. Click :guilabel:`Run`.

.. image:: /static/processing_python_scripts/images/9.png
   :align: center

10. You will see an error dialog. This is expected since the script is
    incomplete and doesn't generate any output yet.

.. image:: /static/processing_python_scripts/images/10.png
   :align: center

11. In the main QGIS windows, you will see the debug output from the script
    printed in the console. This is useful way to add print statements and see
    intermediate variable values.

.. image:: /static/processing_python_scripts/images/11.png
   :align: center

12. Let's go back to editing the script by right-clicking the script and select
    :guilabel:`Edit script`.

.. image:: /static/processing_python_scripts/images/12.png
   :align: center

13. Enter the following code to complete the script. Note that we are using the
    existing dissolve algorithm in QGIS via processing using
    ``processing.runalg()`` method.

.. code-block:: python

   # Create a dictionary to hold values from the sum field
   sum_unique_values = {}
   attrs = [f.attributes() for f in processing.features(inlayer)]

   for unique_value in unique_values:
       val_list = [ f_attr[sum_field_index] for f_attr in attrs if f_attr[dissolve_field_index] == unique_value]
       sum_unique_values[unique_value] = sum(val_list)

   # Run the regular Dissolve algorithm
   processing.runalg("qgis:dissolve", dissolve_layer, "false",
       dissolve_field, output_layer)

   # Add a new attribute called 'SUM' in the output layer
   outlayer = processing.getObject(output_layer)
   provider = outlayer.dataProvider()
   provider.addAttributes([QgsField('SUM', QVariant.Double)])
   outlayer.updateFields()

   # Set the value of the 'SUM' field for each feature
   outlayer.startEditing()
   new_field_index = outlayer.fieldNameIndex('SUM')
   for f in processing.features(outlayer):
     outlayer.changeAttributeValue(f.id(), new_field_index, sum_unique_values[f[dissolve_field]])
   outlayer.commitChanges()

.. image:: /static/processing_python_scripts/images/13.png
   :align: center

14. Run the algorithm by selecting ``SUBREGION`` as the :guilabel:`dissolve
    field` and ``POP_EST`` as the :guilabel:`sum field`. Click :guilabel:`Run`.

.. note::

   The processing algorithm may take upto 10 minutes to finish depending on
   your system.

.. image:: /static/processing_python_scripts/images/14.png
   :align: center

15. Once the processing finishes, you can use the :guilabel:`Identify` tool and
    click on any polygon. You will see the newly added ``SUM`` field with the
    ``POP_EST`` values from all original polygons added up.

.. image:: /static/processing_python_scripts/images/15.png
   :align: center

16. You will note that all other fields in the output are still present. When
    you dissolve many features to create a single feature, it doesn't make
    sense to keep the original fields in the output. Go back to the
    :guilabel:`Script editor` and add the following code to delete all fields
    except the ``SUM`` field and the field that was used to dissolve the
    original layer. Click :guilabel:`Save` button and close the window.

.. code-block:: python

   # Delete all fields except dissolve field and the newly created 'SUM' field. 
   outlayer.startEditing()

   fields_to_delete = [fid for fid in range(len(provider.fields())) if fid != new_field_index and fid != dissolve_field_index]
   provider.deleteAttributes(fields_to_delete)
   outlayer.updateFields()

   outlayer.commitChanges()

.. image:: /static/processing_python_scripts/images/16.png
   :align: center

17. One of the hidden features of the Processing Framework is that all
    algorithms can work on selected features of a layer. This is very helpful
    when you want to run an algorithm on the subset of a layer. As our script
    uses ``processing.features()`` method to read features, it will respect the
    current selection. To demonstrate that, let's make a selection first. Click
    on the :guilabel:`Select features using an expression` button.

.. image:: /static/processing_python_scripts/images/17.png
   :align: center

18. Enter the following expression to select features from North and South
    America and click :guilabel:`Select`.

.. code-block:: none

   "CONTINENT" = 'North America' OR "CONTINENT" = 'South America'

.. image:: /static/processing_python_scripts/images/18.png
   :align: center

19. You will see the selected features highlighted in yellow. Right-click the
    ``dissolve_with_sum`` script and select :guilabel:`Execute`.

.. image:: /static/processing_python_scripts/images/19.png
   :align: center

20. Select the inputs as before and click :guilabel:`Run`.

.. image:: /static/processing_python_scripts/images/20.png
   :align: center

22. A new ``output layer`` will be added to QGIS. This will contain dissolved
    geometries only from the selected features in the input layer. You will
    also note that the ``output layer`` will contain only 2 fields as expected.

.. image:: /static/processing_python_scripts/images/21.png
   :align: center

23. One last but important remmaining work is to document our algorithm. The
    Processing Framework has nice tools to write and access help. Go to the
    :guilabel:`Script editor` and click the :guilabel:`Edit script help`
    button.

.. image:: /static/processing_python_scripts/images/22.png
   :align: center

24. Fill in the details for different elements and click :guilabel:`OK`. Now a
    detailed help will be available to all users of your script in the
    :guilabel:`Help` tab when they launch the algorithm.

.. image:: /static/processing_python_scripts/images/23.png
   :align: center

Below is the complete script for reference. You may modify it to suit your
needs.

.. literalinclude:: /static/processing_python_scripts/scripts/dissolve_with_sum.py
