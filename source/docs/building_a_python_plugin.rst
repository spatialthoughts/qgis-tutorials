Building a Python Plugin
========================
.. only:: html

   [ Download PDF `A4 <../pdf/building_a_python_plugin_a4.pdf>`_ `Letter
   <../pdf/building_a_python_plugin_letter.pdf>`_ ]

Plugins are a great way to extend the functionality of QGIS. You can wrote
plugins using Python that can range from adding a simple button to a toolbar to
sohpisticated toolkits. This tutorial will outline the process involved in
setting up your development environment, designing the user interface for a
plugin and writing code to interact with QGIS. Please review the
:doc:`getting_started_with_pyqgis` tutorial to get familiar with the basics.

Overview of the Task
--------------------

We will develop a simple plugin called ``Save Attributes`` that will allow
users to pick a vector layer and write its attributes to a CSV file.

Get the Tools
-------------

Qt Creator
^^^^^^^^^^

`Qt <http://www.qt.io/>`_ is a software development framework that is used to
develop applications that run on Windows, Mac, Linux as well as various mobile
operating systems. QGIS itself is written using the Qt framework. For plugin
development, we will use an application called `Qt Creator
<http://doc.qt.io/qtcreator/index.html>`_ to design the interface for our
plugin.

Download and install the Qt Creator software from `SourgeForge
<http://sourceforge.net/projects/qtcreator.mirror/files/latest/download>`_

Python Bindings for Qt
^^^^^^^^^^^^^^^^^^^^^^

Since we are developing the plugin in Python, we need to install the python
bindings for Qt. The method for installing these will depend on the platform
you are using. For building plugins we need the ``pyrcc4`` command-line tool.

**Windows**

Download the `OSGeo4W network installer
<http://trac.osgeo.org/osgeo4w/>`_ and choose :guilabel:`Express Desktop
Install`. Install the package ``QGIS``. After installation, you will be able to access the
``pyrcc4`` tool via the :guilabel:`OSGeo4W Shell`.

**Mac**

Install the `Homebrew <http://brew.sh>`_ package manager. Install ``PyQt``
package by running the following command:

.. code-block:: none

   brew install pyqt

**Linux**

Depending on your distribution, find and install the ``python-qt4`` package. On
Ubuntu and Debian-based distributions, you can run the following command:

.. code-block:: none

   sudo apt-get install python-qt4

A Text Editor or a Python IDE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Any kind of software development requires a good text editor. If you already
have a favorite text editor or an IDE (Integrated Development Environment), you
may use it for this tutorial. Otherwise, each platform offers a wide variety of
free or paid options for text editros. Choose the one that fits your needs.

This tutorial uses Notepad++ editor on Windows.

**Windows**

`Notepad++ <http://notepad-plus-plus.org/>`_ is a good free editor for windows.
Download and install the `Notepad++ editor
<http://notepad-plus-plus.org/repository/6.x/6.7.5/npp.6.7.5.Installer.exe>`_.

.. note::

   If you are using Notepad++, makes sure to check :guilabel:`Replace by space`
   at  :menuselection:`Settings --> Preferences --> Tab Settings`. Python is
   very sensitive about whitespace and this setting will ensure tabs and spaces
   are treated properly.


Plugin Builder plugin
^^^^^^^^^^^^^^^^^^^^^

There is a helpful QGIS plugin named ``Plugin Builder`` which creates all the
neccesary files and the boilerplate code for a plugin. Find and install the
``Plugin Builder`` plugin. See :doc:`using_plugins` for more details on how to
install plugins.

Plugins Reloader plugin
^^^^^^^^^^^^^^^^^^^^^^^

This is another helper plugin which allows iterative development of plugins.
Using this plugin, you can change your plugin code and have it reflected in
QGIS without having to restart QGIS every time. Find and install the ``Plugin
Reloader`` plugin. See :doc:`using_plugins` for more details on how to install
plugins.

.. note::

   Plugin Reloader is an experimental plugin. Make sure you have checked
   :guilabel:`Show also experimental plugins` in :guilabel:`Plugin Manager`
   settings if you cannot find it.

Procedure
---------

1. Open QGIS. Go to :menuselection:`Plugins --> Plugin Builder --> Plugin
   Builder`.

.. image:: /static/building_a_python_plugin/images/1.png
   :align: center

2. You will see the :guilabel:`QGIS Plugin Builder` dialog with a form. You can
   fill the form with details relating to our plugin. The :guilabel:`Class
   name` will be the name of the Python Class containing the logic of the
   plugin. This will also be the name of the folder containing all the plugin
   files. Enter ``SaveAttributes`` as the class name. The :guilabel:`Plugin
   name` is the name under which your plugin will appear in the
   :guilabel:`Plugin Manager`. Enter the name as ``Save Attributes``. Add a
   description in the :guilabel:`Description` field. The :guilabel:`Module
   name` will be the name of the main python file for the plugin. Enter it as
   ``save_attributes``. Leave the version numbers as they are. The
   :guilabel:`Text for menu item` value will be how the users will find your
   plugin in QGIS menu. Enter it as ``Save Attributes as CSV``. Enter your name
   and email address in the appropriate fields. The :guilabel:`Menu`  field
   will decide where your plugin item is added in QGIS. Since our plugin is for
   vector data, select ``Vector``. Check the :guilabel:`Flag the plugin as
   experimental` box at the bottom. Click :guilabel:`OK`.

.. image:: /static/building_a_python_plugin/images/2.png
   :align: center

3. Next, you will be prompted to choose a directory for your plugin. You need
   to browse to the QGIS python plugin directory on your computer and select
   :guilabel:`Select Folder`. Typically, a ``.qgis2/`` directory is located in
   your home directory. The ``plugin`` folder location will depend on your
   platform as follows: (Replace ``username`` with your login name)

**Windows**

.. code-block:: none

   c:\Users\username\.qgis2\python\plugins

**Mac**

.. code-block:: none

   /Users/username/.qgis2/python/plugins

**Linux**

.. code-block:: none

   /home/username/.qgis2/python/plugins

.. image:: /static/building_a_python_plugin/images/3.png
   :align: center

4. You will see a confirmation dialog once your plugin template is created.
   Note the path to the plugin folder.

.. image:: /static/building_a_python_plugin/images/4.png
   :align: center

5. Before we can use the newly created plugin, we need to compile the
   ``resources.qrc`` file that was created by Plugin Builder. Launch the
   :guilabel:`OSGeo4W Shell` on windows or a terminal on Mac or Linux.

.. image:: /static/building_a_python_plugin/images/5.png
   :align: center

6. Browse to the plugin directory where the output of ``Plugin Builder`` was
   created. You can use the ``cd`` command followed by the path to the
   directory.

.. code-block:: none

   cd c:\Users\username\.qgis2\python\plugins\SaveAttributes

.. image:: /static/building_a_python_plugin/images/6.png
   :align: center

7. Once you are in the directory, type ``make``. This will run the ``pyrcc4``
   command that we had installed as part of Qt bindings for Python.

.. code-block:: none

   make

.. image:: /static/building_a_python_plugin/images/7.png
   :align: center

8. Now we are ready to have a first look at the brand new plugin we created.
   Close QGIS and launch it again. You will notice that there is a new icon in
   the toolbar and a new menu entry under :menuselection:`Vector --> Save
   Attributes --> Save Attributes as CSV``. Select it to launch the plugin
   dialog.

.. image:: /static/building_a_python_plugin/images/8.png
   :align: center

9. You will notice a new blank dialog named :guilabel:`Save Attributes`. Close
   this dialog.

.. image:: /static/building_a_python_plugin/images/9.png
   :align: center

10. We will not design our dialog box and add some user interface elements to
    it. Open the ``Qt Creator`` program and to to :guilabel:`File --> Open File
    or Project...`.

.. image:: /static/building_a_python_plugin/images/10.png
   :align: center

11. Browse to the plugin directory and select the
    ``save_attributes_dialog_base.ui`` file. Click :guilabel:`Open`.

.. image:: /static/building_a_python_plugin/images/11.png
   :align: center

12. You will see the blank dialog from the plugin. You can drag-and-drop
    elements from the left-hand panel on the dialog. We will add a
    :guilabel:`Combo Box` type of :guilabel:`Input Widget`. Drag it to the
    plugin dialog.

.. image:: /static/building_a_python_plugin/images/12.png
   :align: center

13. Resize the combo box and adjust its size. Now drag a :guilabel:`Label` type
    :guilabel:`Display Widget` on the dialog.

.. image:: /static/building_a_python_plugin/images/13.png
   :align: center

14. Click on the label text and enter ``Select a layer``.

.. image:: /static/building_a_python_plugin/images/14.png
   :align: center

15. Save this file by going to :menuselection:`File --> Save
    save_attributes_dialog_base.ui`. Note the name of the combo box object is
    ``comboBox``. To interact with this object using python code, we will have
    to refer to it by this name.

.. image:: /static/building_a_python_plugin/images/15.png
   :align: center

16. Let's reload our plugin so we can see the changes in the dialog
    window. Go to :menuselection:`Plugin --> Plugin Reloader --> Choose a
    plugin to be reloaded`.

.. image:: /static/building_a_python_plugin/images/16.png
   :align: center

17. Select ``SaveAttributes`` in the :guilabel:`Configure Plugin reloader`
    dialog.

.. image:: /static/building_a_python_plugin/images/17.png
   :align: center

18. Now click the :guilabel:`Save Attributes as CSV` button. You will see the
    newly designed dialog box.

.. image:: /static/building_a_python_plugin/images/18.png
   :align: center

19. Let's add some logic to the plugin that will populate the combo box with
    the layers loaded in QGIS. Go to the plugin directory and load the file
    ``save_attributes.py`` in a text editor. Scroll down and find the
    ``run(self)`` method. This method will be called when you click the toolbar
    button or select the plugin menu item. Add the following code at the
    beginning of the method. This code gets the layers loaded in QGIS and adds
    it to the ``comboBox`` object from the plugin dialog.

.. code-block:: python

   layers = self.iface.legendInterface().layers()
   layer_list = []
   for layer in layers:
        layer_list.append(layer.name())
        self.dlg.comboBox.addItems(layer_list)


.. image:: /static/building_a_python_plugin/images/19.png
   :align: center

20. Back in the main QGIS window, reload the plugin by going to
    :menuselection:`Plugins --> Plugin Reloader -->  Reload plugin:
    SaveAttributes`. Alternatively, you can just press :kbd:`F5`. To test this
    new functionality, we must load some layers in QGIS. After you load some
    data, launch the plugin by going to :menuselection:`Vector --> Save
    Attributes --> Save Attributes as CSV`.

.. image:: /static/building_a_python_plugin/images/20.png
   :align: center

21. You will see that our combo box is now populated with the layer names that
    are loaded in QGIS.

.. image:: /static/building_a_python_plugin/images/21.png
   :align: center

22. Let's add remaining user interface elements. Switch back to ``Qt Creator``
    and load the ``save_attributes_dialog_base.ui`` file. Add a ``Label``
    :guilabel:`Display Widget` and change the text to ``Select output file``.
    Add a ``LineEdit`` type :guilabel:`Input Widget` that will show the output
    file path that the user has chosen. Next, add a ``Push Button`` type
    :guilabel:`Button` and chage the button label to ``...``. Note the object
    names of the widgets that we will have to use to interact with them. Save
    the file.

.. image:: /static/building_a_python_plugin/images/22.png
   :align: center

23. We will now add python code to open a file browser when the user clicks the
    ``...`` push button and show the select path in the line edit widget. Open
    the ``save_attributes.py`` file in a text editor. Add ``QFileDialog`` to
    our list of imports at the top of the file.

.. image:: /static/building_a_python_plugin/images/23.png
   :align: center

24. Add a new method called ``select_output_file`` with the following code.
    This code will open a file browser and populate the line edit widget with
    the path of the file that the user chose.

.. code-block:: python

   def select_output_file(self):
       filename = QFileDialog.getSaveFileName(self.dlg, "Select output file ","", '*.txt')
       self.dlg.lineEdit.setText(filename)

.. image:: /static/building_a_python_plugin/images/24.png
   :align: center

25. Now we need to add code so that when the `...` button is clicked,
    ``select_output_file`` method is called. Scroll up to the ``__init__``
    method and add the following lines at the botton. This code will clear the
    previously loaded text (if any) in the line edit widget and also connect
    the ``select_output_file`` method to the ``clicked`` signal of the push
    button widget.

.. code-block:: python

   self.dlg.lineEdit.clear()
   self.dlg.pushButton.clicked.connect(self.select_output_file)

.. image:: /static/building_a_python_plugin/images/25.png
   :align: center

26. Back in QGIS, reload the plugin and open the :guilabel:`Save Attributes``
    dialog. If all went fine, you will be able to click the ``...`` button and
    select an output text file from your disk.

.. image:: /static/building_a_python_plugin/images/26.png
   :align: center

27. When you click :guilabel:`OK` on the plugin dialog, nothing happens. That
    is because we have not added the logic to pull attribute information from
    the layer and write it to the text file. We now have all the pieces in
    place to do just that. Find the place in the ``run`` method where it says
    ``pass``.  Replace it with the code below. The explanation for this code
    can be found in :doc:`getting_started_with_pyqgis`.

.. code-block:: python

   filename = self.dlg.lineEdit.text()
   output_file = open(filename, 'w')

   selectedLayerIndex = self.dlg.comboBox.currentIndex()
   selectedLayer = layers[selectedLayerIndex]
   fields = selectedLayer.pendingFields()
   fieldnames = [field.name() for field in fields]

   for f in selectedLayer.getFeatures():
       line = ','.join(unicode(f[x]) for x in fieldnames) + '\n'
       unicode_line = line.encode('utf-8')
       output_file.write(unicode_line)
   output_file.close()

.. image:: /static/building_a_python_plugin/images/27.png
   :align: center

28. Now our plugin is ready. Reload the plugin and try it out. You will find
    that the output text file you chose will have the attributes from the
    vector layer. You can zip the plugin directory and share it with your
    users. They can unzip the contents to their plugin directory and try out
    your plugin. If this was a real plugin, you would upload it to the `QGIS
    Plugin Repository <https://plugins.qgis.org/>`_ so that all QGIS users will
    be able to find and download your plugin.

.. note::

   This plugin is for demonstration purpose only. Do not publish this plugin or
   upload it to the QGIS plugin repository.

Below is the full ``save_attributes.py`` file as a reference.

.. literalinclude:: /static/building_a_python_plugin/script/save_attributes.py
