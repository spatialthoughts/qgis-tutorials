Writing Python Scripts for Processing Framework (QGIS3)
=======================================================
One can write standalone pyqgis scripts that can be run via the Python Console in QGIS. With a few tweaks, you can make your standalone scripts run via the Processing Framework. This has several advantages. First, taking user input and writing output files is far easier because Processing Framework offers standardized user interface for these. Second, having your script in the Processing Toolbox also allows it to be part of any Processing Model or be run as a Batch job with multiple inputs. This tutorial will show how to write a custom python script that can be part of the Processing Framework in QGIS.

.. note:: 

	The Processing API was completely overhauled in QGIS3. Please refer to `this guide <https://raw.githubusercontent.com/qgis/QGIS/master/doc/porting_processing.dox>`_ for best practices and tips.

Overview of the task
--------------------

Our script will perform a dissolve operation based on a field chosen by the user. It will also sum up values of another field for the dissolved features. In the example, we will dissolve a world shapefile based on a ``CONTINENT`` attribute and sum up ``POP_EST`` field to calculate total population in the dissolved region.

Get the data
------------
We will use the `Admin 0 - Countries
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/>`_
dataset from Natural Earth.

Download the `Admin 0 - countries shapefile.
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip>`_.

Data Source [NATURALEARTH]_

For convenience, you may directly download a geopackage containing the above layer from below:

`ne_global.gpkg <https://www.qgistutorials.com/downloads/ne_global.gpkg>`_

Procedure
---------

1.  In the QGIS Browser Panel, locate the directory where you saved your downloaded data. Expand the ``zip`` or the ``gpkg``  entry and select the ``ne_10m_admin_0_countries`` layer. Drag the layer to the canvas.

.. image:: /static/3/processing_python_scripts/images/1.png
   :align: center

2.  Go to :menuselection:`Processing --> Toolbox`. Click the :guilabel:`Scripts` button in the toolbar and select :guilabel:`Create New Script from Template`.

.. image:: /static/3/processing_python_scripts/images/2.png
   :align: center

3. The template contains all the boilerplate code that is required for the Processing Framework to recognize it as a Processing script, and manage inputs/outputs. Let's start customizing the example template to our needs. First change the class name from ``ExampleProcessingAlgorithm`` to ``DissolveProcessingAlgorithm``. This name also needs to be updated in the ``createInstance`` method. Add a docstring to the class that explains what the algorithm does.

.. image:: /static/3/processing_python_scripts/images/3.png
   :align: center

4. As you scroll down, you will see methods that assign name, group, description etc. to the script. Change the return values for *name* method to be ``dissolve_with_sum``, *displayName* method to ``Dissolve with Sum``, *group* method and *groupId* method to  ``scripts``. Change the return value of *shortHelpString* method to a description that will appear to the user. Click the :guilabel:`Save` button.

.. image:: /static/3/processing_python_scripts/images/4.png
   :align: center

5. Name the script ``dissolve_with_sum`` and save it at the default location
   under :menuselection:`profiles --> default --> processing --> scripts` folder.

.. image:: /static/3/processing_python_scripts/images/5.png
   :align: center

6. Now we will define the inputs for the script. The template already contains a definition of an ``INPUT`` Vector Layer and a ``OUTPUT`` layer. We will add 2 new inputs which allows the user to select a ``DISSOLVE_FIELD`` and a ``SUM_FIELD``. Add a new import at the top and the following code in the ``initAlgorithm`` method. Click the :guilabel:`Run` button to preview the changes.

.. code-block:: python

	from qgis.core import QgsProcessingParameterField

	self.addParameter(
		QgsProcessingParameterField(
			self.DISSOLVE_FIELD,
			'Choose Dissolve Field',
			'',
			self.INPUT))

	self.addParameter(
		QgsProcessingParameterField(
			self.SUM_FIELD,
			'Choose Sum Field',
			'',
			self.INPUT))
		
.. image:: /static/3/processing_python_scripts/images/6a.png
   :align: center

.. image:: /static/3/processing_python_scripts/images/6b.png
   :align: center

7. You will see a :guilabel:`Dissolve with Sum` dialog with our newly defined inputs. Select the ``ne_10m_admin_0_countries`` layer as :guilabel:`Input layer``. As both :guilabel:`Dissolve Field` and :guilabel:`Sum Fields` are filtered based on the input layer, they will be pre-populated with existing fields from the input layer. Click the :guilabel:`Close` button.

.. image:: /static/3/processing_python_scripts/images/7.png
   :align: center

8. Now we define our custom logic for processing data in the ``processAlgorithm`` method. This method gets passed a dictionary called ``parameters``. It contains the inputs that the user has selected. There are helper methods that allow you to take these inputs and create appropriate objects. We first get our inputs using ``parameterAsSource`` and ``parameterAsString`` methods. Next we want to create a feature sink where we will write the output. QGIS3 has a new class called ``QgsFeatureSink`` which is the preferred way to create objects that can accept new features. The output needs only 2 fields - one for the value of dissolved field and another for the sum of the selected field. 

.. code-block:: python

	from PyQt5.QtCore import QVariant
	from qgis.core import QgsField, QgsFields

	source = self.parameterAsSource(
		parameters,
		self.INPUT,
		context)
	dissolve_field = self.parameterAsString(
		parameters,
		self.DISSOLVE_FIELD,
		context)
	sum_field = self.parameterAsString(
		parameters,
		self.SUM_FIELD,
		context)
						
	fields = QgsFields()
	fields.append(QgsField(dissolve_field, QVariant.String))
	fields.append(QgsField('SUM_' + sum_field, QVariant.Double))

	(sink, dest_id) = self.parameterAsSink(
		parameters,
		self.OUTPUT,
		context, fields, source.wkbType(), source.sourceCrs())

.. image:: /static/3/processing_python_scripts/images/8a.png
   :align: center

.. image:: /static/3/processing_python_scripts/images/8b.png
   :align: center

9. Now we will ready the input features and create a dictionary to hold the unique values from the dissolve_field and the sum of the values from the sum_field. Note the use of ``feedback.pushInfo()`` method to communicate the status with the user.

.. code-block:: python

	feedback.pushInfo('Extracting unique values from dissolve_field and computing sum')

	features = source.getFeatures()
	unique_values = set(f[dissolve_field] for f in features)

	# Get Indices of dissolve field and sum field
	dissolveIdx = source.fields().indexFromName(dissolve_field)
	sumIdx = source.fields().indexFromName(sum_field)

	# Find all unique values for the given dissolve_field and
	# sum the corresponding values from the sum_field
	sum_unique_values = {}
	attrs = [{dissolve_field: f[dissolveIdx], sum_field: f[sumIdx]} for f in source.getFeatures()]
	for unique_value in unique_values:
		val_list = [ f_attr[sum_field] for f_attr in attrs if f_attr[dissolve_field] == unique_value]
		sum_unique_values[unique_value] = sum(val_list)      

.. image:: /static/3/processing_python_scripts/images/9.png
   :align: center

10. Next, we will call the built-in processing algorithm ``native:dissolve`` on the input layer to generate the dissolved geometries. Once we have the dissolved geometries, we iterate through the output of the dissolve algorithm and create new features to be added to the output. At the end we return the ``dest_id`` FeatureSink as the output. Now the script is ready. Click the :guilabel:`Run` button. 

.. note::

  Notice the use of ``parameters[self.INPUT]`` to fetch the input layer from the parameters dictionary directly without defining it as a source. As we are passing the input object to the algorithm without doing anything with it, it's not necessary to define it as a source.

.. code-block:: python

	from qgis.core import QgsFeature

	# Running the processing dissolve algorithm
	feedback.pushInfo('Dissolving features')
	dissolved_layer = processing.run("native:dissolve", {
		'INPUT': parameters[self.INPUT],
		'FIELD': dissolve_field,
		'OUTPUT': 'memory:'
		}, context=context, feedback=feedback)['OUTPUT']

	# Read the dissolved layer and create output features
	for f in dissolved_layer.getFeatures():
		new_feature =  QgsFeature()
		# Set geometry to dissolved geometry
		new_feature.setGeometry(f.geometry())
		# Set attributes from sum_unique_values dictionary that we had computed
		new_feature.setAttributes([f[dissolve_field], sum_unique_values[f[dissolve_field]]])
		sink.addFeature(new_feature, QgsFeatureSink.FastInsert)
	
	return {self.OUTPUT: dest_id}
	
.. image:: /static/3/processing_python_scripts/images/10a.png
   :align: center

.. image:: /static/3/processing_python_scripts/images/10b.png
   :align: center

11. In the :guilabel:`Dissolve with Sum`, dialog, select ``ne_10m_admin_0_countries`` as the :guilabel:`Input layer`, ``CONTINENT`` as the :guilabel:`Dissolve field` and ``POP_EST`` as the :guilabel:`Sum field`. Click :guilabel:`Run`.

.. image:: /static/3/processing_python_scripts/images/11.png
   :align: center

12. Once the processing is finished, click the :guilabel:`Close` button and switch to the main QGIS window.

.. image:: /static/3/processing_python_scripts/images/12.png
   :align: center


13. You will see the dissolved output layer with one feature for every continent and the total population summed from the individual countries belonging to that continent.

.. image:: /static/3/processing_python_scripts/images/13.png
   :align: center

14. One another advantage of writing processing script is that the methods within the Processing Framework are aware of layer selection and automatically filter your inputs to use only the selected features. This happens because we are defining our input as a ``QgsProcessingParameterFeatureSource``. A feature source allows use of ANY object which contains vector features, not just a vector layer, so when there are selected features in your layer and ask Processing to use selected features, the input is passed on to your script as a ``QgsProcessingFeatureSource`` object containing selected features and not the full vector layer. Here's a quick demonstration of this functionality. Let's say we want to dissolve only certain continents. Let's create a selection using :guilabel:`Select feature by Expression` tool.

.. image:: /static/3/processing_python_scripts/images/14.png
   :align: center

15. Enter the following expression to select features from North and South America and click :guilabel:`Select`.

.. code-block:: none

   "CONTINENT" = 'North America' OR "CONTINENT" = 'South America'

.. image:: /static/3/processing_python_scripts/images/15.png
   :align: center

16. You will see the selected features highlighted in yellow. Locate the ``dissolve_with_sum`` script and double-click it to run it.

.. image:: /static/3/processing_python_scripts/images/16.png
   :align: center

17. In the :guilabel:`Dissolve with Sum` dialog, select the ``ne_10m_admin_0_countries`` as the :guilabel:`Input layer`. This time, make sure you check the :guilabel:`Selected features only` box. Choose ``SUBREGION`` as the :guilabel:`Dissolve field` and ``POP_EST`` as the :guilabel:`Sum field`.

.. image:: /static/3/processing_python_scripts/images/17.png
   :align: center

18. Once the processing finishes, click :guilabel:`Close` and switch back to the main QGIS window. You will notice a new layer with only the selected features dissolved. Click :guilabel:`Identify` button and click on a feature to inspect and verify that the script worked correctly.

.. image:: /static/3/processing_python_scripts/images/18.png
   :align: center

Below is the complete script for reference. You may modify it to suit your needs.

.. literalinclude:: /static/3/processing_python_scripts/scripts/dissolve_with_sum.py
