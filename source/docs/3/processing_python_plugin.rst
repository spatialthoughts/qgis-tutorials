Building a Processing Plugin (QGIS3)
====================================

In the previous tutorial :doc:`building_a_python_plugin`, you learnt how to create a python plugin - including the user interface and custom logic for processing the data. While these type of plugins are useful, it puts the burden of designing the user interface on the plugin author. This results in each plugin having different ways to interact with it - which is confusing to the users. Also, regular plugins do not interact with another parts of QGIS. For example, you cannot use the plugin functionality from another algorithm. If the plugin that you want to write is primarily for analysis, and the user interaction that you want is limited to letting the user pick inputs and outputs, there is a much easier and preferred way to write plugins using the Processing Framework. It removes the need for you to design the user interface - simplifying the process. The built-in processing library creates a standard processing interface depending on your inputs that looks and behaves just like any other processing algorithm in QGIS. It also seamlessly integrates with rest of the Processing framework - so your plugin algorithms can be used in batch processing, graphical modeler, called from python console etc.

Overview of the Task
--------------------

We will re-implement a simple plugin from the tutorial  :doc:`building_a_python_plugin` as a processing plugin. It will result in a new processing provider called ``Save Attributes`` and an algorithm ``Save Attributes as CSV`` that will allow users to pick a vector layer and write its attributes to a CSV file. 

Get the Tools
-------------

A Text Editor or a Python IDE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Any kind of software development requires a good text editor. If you already have a favorite text editor or an IDE (Integrated Development Environment), you may use it for this tutorial. Otherwise, each platform offers a wide variety of free or paid options for text editors. Choose the one that fits your needs.

This tutorial uses Notepad++ editor on Windows.

**Windows**

`Notepad++ <http://notepad-plus-plus.org/>`_ is a good free editor for windows.
Download and install the `Notepad++ editor
<https://notepad-plus-plus.org/download/>`_.

.. note::

  If you are using Notepad++, makes sure to go to :menuselection:`Settings --> Preferences --> Tab Settings` and enable :guilabel:`Replace by space`. Python is very sensitive about whitespace and this setting will ensure tabs and spaces are treated properly.
  
Plugin Builder plugin
^^^^^^^^^^^^^^^^^^^^^

There is a helpful QGIS plugin named ``Plugin Builder`` which creates all the necessary files and the boilerplate code for a plugin. Find and install the ``Plugin Builder`` plugin. See :doc:`../using_plugins` for more details on how to install plugins.

Plugins Reloader plugin
^^^^^^^^^^^^^^^^^^^^^^^

This is another helper plugin which allows iterative development of plugins. Using this plugin, you can change your plugin code and have it reflected in QGIS without having to restart QGIS every time. Find and install the ``Plugin Reloader`` plugin. See :doc:`../using_plugins` for more details on how to install plugins.

.. note::

   Plugin Reloader is an experimental plugin. Make sure you have checked :guilabel:`Show also experimental plugins` in :guilabel:`Plugin Manager` settings if you cannot find it.

Procedure
---------

1. Open QGIS. Go to :menuselection:`Plugins --> Plugin Builder --> Plugin Builder`.

  .. image:: /static/3/processing_python_plugin/images/1.png
     :align: center

2. You will see the :guilabel:`QGIS Plugin Builder` dialog with a form. You can fill the form with details relating to our plugin. The :guilabel:`Class name` will be the name of the Python Class containing the logic of the plugin. This will also be the name of the folder containing all the plugin files. Enter ``SaveAttributes`` as the class name. The :guilabel:`Plugin name` is the name under which your plugin will appear in the    :guilabel:`Plugin Manager`. Enter the name as ``Save Attributes (Processing)``. Add a description in the :guilabel:`Description` field. The :guilabel:`Module name` will be the name of the main python file for the plugin. Enter it as ``save_attributes_processing``. Leave the version numbers as they are and enter your name and email address in the appropriate fields. Click :guilabel:`Next`.

  .. image:: /static/3/processing_python_plugin/images/2.png
     :align: center
     
3. Enter a brief description of the plugin for the :guilabel:`About` dialog and click :guilabel:`Next`.

  .. image:: /static/3/processing_python_plugin/images/3.png
     :align: center
     
4. Select the ``Processing Provider`` from the :guilabel:`Template` selector. The :guilabel:`Algorithm name` value will be how the users will find the processing algorithm in the Processing Toolox. Enter it as ``Save Attributes as CSV``. Leave the :guilabel:`Algorithm group` blank. Enter the :guilabel:`Provider name` as ``Save Attributes``. Enter a description in the :guilabel:`Provider description` field. Click :guilabel:`Next`.

  .. image:: /static/3/processing_python_plugin/images/4.png
     :align: center
     
5. Plugin builder will prompt you for the type of files to generate. Keep the default selection and click :guilabel:`Next`.

  .. image:: /static/3/processing_python_plugin/images/5.png
     :align: center
     
6. As we do not intend to publish the plugin, you may leave the :guilabel:`Bug tracker`, :guilabel:`Repository` and :guilabel:`Home page` values to default. Check the :guilabel:`Flag the plugin as experimental` box at the bottom and click :guilabel:`Next`.

  .. image:: /static/3/processing_python_plugin/images/6.png
     :align: center
     
7. You will be prompted to choose a directory for your plugin. For now, save it to a directory you can locate easily on your computer and click :guilabel:`Generate`.

  .. image:: /static/3/processing_python_plugin/images/7.png
     :align: center
     
8. Next, press the :guilabel:`generate` button. You will see a confirmation dialog once your plugin template is created.

  .. image:: /static/3/processing_python_plugin/images/8.png
     :align: center
     
.. note::

  You may get a prompt saying that pyrcc5 is not found in the path. You can ignore this message.
  
9. Plugins in QGIS are stored in a special folder. We must copy our plugin directory to that folder before it can be used. In QGIS, locate your current profile folder by going to :menuselection:`Settings --> User Profiles --> Open Active Profile Folder`.

  .. image:: /static/3/processing_python_plugin/images/9.png
     :align: center
     
10. In the profile folder, copy the plugin folder to :menuselection:`python --> plugins` subfolder.

  .. image:: /static/3/processing_python_plugin/images/10.png
     :align: center
     
11. Now we are ready to have a first look at the brand new plugin we created. Close QGIS and launch it again. Go to :menuselection:`Plugins --> Manage and Install plugins` and enable the ``Save Attributes (Processing)`` plugin in the :guilabel:`Installed` tab. 

  .. image:: /static/3/processing_python_plugin/images/11.png
     :align: center
     
12. Go to :menuselection:`Processing --> Toolbox`. You will notice that there is a new provider at the bottom called ``Save Attributes``. Expand it to find an algorithm named ``Save Attributes as CSV``. Double-click to launch it.

  .. image:: /static/3/processing_python_plugin/images/12.png
     :align: center
     
13. You will notice a familiar processing algorithm dialog with a dropdown for an input layer and a selector for an output layer. We will now customize this dialog to suit our needs. Close this dialog. 

  .. image:: /static/3/processing_python_plugin/images/13.png
     :align: center
     
14. Go to the plugin directory and load the file ``save_attributes_processing_algorithm.py`` in a text editor. For our plugin, we take a vector layer as an input and write out a CSV file as output. So instead of importing ``QgsProcessingParameterFeatureSink`` as output - which is for vector layer - add ``QgsProcessingParameterFileDestination`` which is for a file. 

    .. code-block:: python
    
      from qgis.core import (QgsProcessing,
                       QgsFeatureSink,
                       QgsProcessingAlgorithm,
                       QgsProcessingParameterFeatureSource,
                       QgsProcessingParameterFileDestination)
                       
    Next, scroll down and define the output parameter under ``initAlgorithm()`` method with the following code.
    
    .. code-block:: python
    
      self.addParameter(
            QgsProcessingParameterFileDestination(
                self.OUTPUT,
                self.tr('Output File'),
                'CSV files (*.csv)',
            )
      )


  .. image:: /static/3/processing_python_plugin/images/14a.png
     :align: center
     
  .. image:: /static/3/processing_python_plugin/images/14b.png
     :align: center
     
15. Let's reload our plugin so we can see the changes in the dialog window. Go to :menuselection:`Plugin --> Plugin Reloader --> Choose a plugin to be reloaded`. Select ``save_attributes_processing`` in the :guilabel:`Configure Plugin reloader` dialog.

  .. image:: /static/3/processing_python_plugin/images/15.png
     :align: center
     
16. Click the :guilabel:`Reload plugin` button to load the latest version of the plugin. To test this new functionality, we must load some layers in QGIS. After you have loaded some layers, launch the :menuselection:`Save Attributes --> Save Attributes as CSV` algorithm. You will see the output is changed to a file instead of a layer.

  .. image:: /static/3/processing_python_plugin/images/16.png
     :align: center
     

17. Let's add some logic to the algorithm that takes the selected vector layer and writes the attributes to a CSV file.  The explanation for this code can be found in :doc:`getting_started_with_pyqgis`. Notable difference here is the counter that helps show the progress of the processing. Add the following code to the ``processAlgorithm`` method and save the file.

    .. code-block:: python

      def processAlgorithm(self, parameters, context, feedback):
        """
        Here is where the processing itself takes place.
        """
        source = self.parameterAsSource(parameters, self.INPUT, context)
        csv = self.parameterAsFileOutput(parameters, self.OUTPUT, context)

        fieldnames = [field.name() for field in source.fields()]

        # Compute the number of steps to display within the progress bar and
        # get features from source
        total = 100.0 / source.featureCount() if source.featureCount() else 0
        features = source.getFeatures()

        with open(csv, 'w') as output_file:
          # write header
          line = ','.join(name for name in fieldnames) + '\n'
          output_file.write(line)
          for current, f in enumerate(features):
              # Stop the algorithm if cancel button has been clicked
              if feedback.isCanceled():
                  break

              # Add a feature in the sink
              line = ','.join(str(f[name]) for name in fieldnames) + '\n'
              output_file.write(line)

              # Update the progress bar
              feedback.setProgress(int(current * total))

        return {self.OUTPUT: csv}

  .. image:: /static/3/processing_python_plugin/images/17.png
     :align: center
     
   
18. Back in the main QGIS window, reload the plugin by clicking on the :guilabel:`Reload plugin` button. Launch the :menuselection:`Save Attributes --> Save Attributes as CSV` algorithm. Select a layer for the :guilabel:`Input layer`. Next, click the :guilabel:`...` button next to :guilabel:`Output file`.

  .. image:: /static/3/processing_python_plugin/images/18.png
     :align: center
     
19. Name the output file ``test.csv`` and click :guilabel:`Run`. The algorithm will run and produce a CSV file at the chosen location. 

  .. image:: /static/3/processing_python_plugin/images/19.png
     :align: center
     
20. As mentioned earlier, even though this algorithm comes from a plugin, it integrates very well with the built-in processing tools. To demonstrate this, let's run this algorithm using the built-in batch processing interface. Right-click the algorithm and select :guilabel:`Execute as Batch Process..`.

  .. image:: /static/3/processing_python_plugin/images/20.png
     :align: center
     
21. You can select multiple inputs and run this algorithm in a batch to produce multiple CSV files in a single run. If you are not familiar with the batch processing interface, see :doc:`batch_processing` for step-by-step instructions.

  .. image:: /static/3/processing_python_plugin/images/21.png
     :align: center
     
22. The plugin is ready and you can ship it in the current form. But we can improve the user experience by making the processing plugin behave like a regular plugin. Using the hybrid approach outlined below, you can add a menu item and a toolbar button. This way, you give the users an easier way to discover and launch the tools that are installed as part of the plugin. We will need an icon for the plugin. Download `logo.png <http://www.qgistutorials.com/downloads/logo.png>`_ and copy it to the plugin directory.

  .. image:: /static/3/processing_python_plugin/images/22.png
     :align: center
     
23. Open the file ``save_attributes_processing.py``. Add the following imports at top of the file.

    .. code-block:: python
      
      from qgis.PyQt.QtWidgets import QAction
      from qgis.PyQt.QtGui import QIcon

      from qgis.core import QgsProcessingAlgorithm, QgsApplication
      import processing

    Scroll down and locate the ``initGui`` method. It only contains the code to initialize the processing provider. We will add the code to add a toolbar button and a menu item. We will also need to add code to the ``unload`` method, to remove these elements when plugin is removed.
  
    .. code-block:: python
  
      def initGui(self):
        self.initProcessing()

        icon = os.path.join(os.path.join(cmd_folder, 'logo.png'))
        self.action = QAction(
            QIcon(icon),
            u"Save Attributes as CSV", self.iface.mainWindow())
        self.action.triggered.connect(self.run)
        self.iface.addPluginToMenu(u"&SaveAttributes", self.action)
        self.iface.addToolBarIcon(self.action)

      def unload(self):
        QgsApplication.processingRegistry().removeProvider(self.provider)
        self.iface.removePluginMenu(u"&SaveAttributes", self.action)
        self.iface.removeToolBarIcon(self.action)
        
    We have connected the button and the menu item to trigger the ``run`` method when clicked. Add a new method at the bottom that uses the helper method ``execAlgorithmDialog`` to launch the processing algorithm.
  
    .. code-block:: python
  
      def run(self):
        processing.execAlgorithmDialog("Save Attributes:Save Attributes as CSV")

  .. image:: /static/3/processing_python_plugin/images/23a.png
     :align: center
     
  .. image:: /static/3/processing_python_plugin/images/23b.png
     :align: center
     
  .. image:: /static/3/processing_python_plugin/images/23c.png
     :align: center
     
  
24. Next, we need a minor fix to the ``__init__.py`` file in the plugin directory. Open the file and add ``iface`` to the return statement, so the reference to the QGIS interface is passed on to the plugin.

  .. image:: /static/3/processing_python_plugin/images/24.png
     :align: center
     
25. Back in the main QGIS window, reload the plugin by clicking on the :guilabel:`Reload plugin` button. You will see a new toolbar icon and a menu item under :menuselection:`Plugins --> SaveAttributes --> Save Attributes as CSV`. You can click these to launch the ``Save Attributes as CSV`` algorithm. You will notice that the processing provider and the algorithm in the toolbar still have the default icons. Let's fix that.

  .. image:: /static/3/processing_python_plugin/images/25.png
     :align: center
     
26. Open the ``save_attributes_processing_provider.py`` file from the plugin directory. Add the imports at the top as follows. 

    .. code-block:: python
              
      import os
      import inspect
      from qgis.PyQt.QtGui import QIcon

    Modify the ``icon`` method as follows to add the custom icon.
  
    .. code-block:: python

      def icon(self):        
        cmd_folder = os.path.split(inspect.getfile(inspect.currentframe()))[0]
        icon = QIcon(os.path.join(os.path.join(cmd_folder, 'logo.png')))
        return icon

  .. image:: /static/3/processing_python_plugin/images/26a.png
     :align: center
     
  .. image:: /static/3/processing_python_plugin/images/26b.png
     :align: center
     
27. Next, open the ``save_attributes_processing_algorithm.py`` file. Add the imports at the top as follows.

    .. code-block:: python
              
      import os
      import inspect
      from qgis.PyQt.QtGui import QIcon

    Add a new ``icon`` method with the following code.
  
    .. code-block:: python

      def icon(self):        
        cmd_folder = os.path.split(inspect.getfile(inspect.currentframe()))[0]
        icon = QIcon(os.path.join(os.path.join(cmd_folder, 'logo.png')))
        return icon

  .. image:: /static/3/processing_python_plugin/images/27a.png
     :align: center
     
  .. image:: /static/3/processing_python_plugin/images/27b.png
     :align: center
        
28. Reload the plugin and you will see the provider and algorithm both have our custom icon.

  .. image:: /static/3/processing_python_plugin/images/28.png
     :align: center
     
29. You can zip the plugin directory and share it with your users. They can unzip the contents to their plugin directory and try out your plugin. If this was a real plugin, you would upload it to the `QGIS Plugin Repository <https://plugins.qgis.org/>`_ so that all QGIS users will be able to find and download your plugin.

.. note::

   This plugin is for demonstration purpose only. Do not publish this plugin or
   upload it to the QGIS plugin repository.

Below are the full source file as a reference.

``__init__.py``

.. literalinclude:: /static/3/processing_python_plugin/scripts/__init__.py

``save_attributes_processing.py``

.. literalinclude:: /static/3/processing_python_plugin/scripts/save_attributes_processing.py

``save_attributes_processing_algorithm.py``

.. literalinclude:: /static/3/processing_python_plugin/scripts/save_attributes_processing_algorithm.py

``save_attributes_processing_provider.py``

.. literalinclude:: /static/3/processing_python_plugin/scripts/save_attributes_processing_provider.py

