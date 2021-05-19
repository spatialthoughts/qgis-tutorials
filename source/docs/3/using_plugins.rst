Using Plugins (QGIS3)
=====================

Plugins in QGIS add useful features to the software. Plugins are written by QGIS developers and other independent developers who want to extend the core functionality of the software. These plugins are then uploaded to the QGIS Plugin Repository , reviewed by the community members, and then made available to all QGIS users.  

Overview of the task
--------------------

In this tutorial, you will learn how to enable *Core Plugins* as well as download and install *3rd party external plugins*. You will also learn how to locate the plugin from the QGIS menu once they are installed. 

Procedure
---------

Core Plugins
~~~~~~~~~~~~

Core plugins are already part of the standard QGIS installation. To use these, you just need to enable them.

1. Open QGIS. Click on :menuselection:`Plugins --> Manage and Install Plugins...`. to open the :guilabel:`Plugins` dialog.

      .. image:: /static/3/using_plugins/images/1.png
         :align: center

2. Even if this is your first time using QGIS, you will see a lot of plugins listed under the :guilabel:`Installed` tab. This is because they are *Core Plugins* and were installed during QGIS installation. 

      .. image:: /static/3/using_plugins/images/2.png
         :align: center

3. Let's enable one of the plugins. Check on the checkbox next to :guilabel:`Topology Checker Plugin`. This will enable the plugin and you will be able to use it. One thing to note is that plugins have the ability to insert menu items at various locations and create new panels and toolbars. Sometimes it is difficult to know how to find the newly enabled tools. Once clue is to look in the plugin discription. Here the description says *Category: Vector*. That indicates that the plugin would be found under the :guilabel:`Vector` menu once enabled. Also, these plugins cannot be uninstalled. Click :guilabel:`Close`.

      .. image:: /static/3/using_plugins/images/3.png
         :align: center

   .. note::

      Now you may think if these plugins cannot be uninstalled why it is not enabled by default. It is because the way QGIS is programmed, on starting the QGIS the external plugins also get loaded before you start a project, so enabling all plugins can make the software heavy and increase the boot time.

4. Now that the :guilabel:`Topology Checker Plugin` is enabled, you can go to the :menuselection:`Vector --> Topology Checker` to use the functionality added by the plugin.

      .. image:: /static/3/using_plugins/images/4.png
         :align: center
   

Third-party Plugins
~~~~~~~~~~~~~~~~~~~

Third-party plugins  are available in the `QGIS Plugins Repository <https://plugins.qgis.org/>`_ and need to be installed by the users before using them. An easy way to browse and install these plugins is by using the :guilabel:`Plugins` tool. Also, external plugin can be broadly categorized into 3 groups. 

* GUI Plugins 
* Processing Toolbox Plugins. 
* Experimental Plugins

Before learning about the plugins lets explore the Plugins repository, 

QGIS Plugins Repository
^^^^^^^^^^^^^^^^^^^^^^^

1. Go the `QGIS Plugins Repository <https://plugins.qgis.org/>`_, and click :guilabel:`PLUGINS`. 

      .. image:: /static/3/using_plugins/images/p1.png
         :align: center

2. This portal is where all plugins for QGIS can be searched, here plugins available experimental and depricated with their version information can be found.

      .. image:: /static/3/using_plugins/images/p2.png
         :align: center

3. Click on the :guilabel:`New Plugins`, this will fetch all the latest plugin. click on :guilabel:`RasterAttributeTabel`. 

      .. image:: /static/3/using_plugins/images/p3.png
         :align: center

4. Switch to :guilabel:`Version`, here the version, experimental status and minimum QGIS version details can be found. 

      .. image:: /static/3/using_plugins/images/p4.png
         :align: center

> You can explore this site on your own to know the availabe features asit will well mainted and self explanatory, now lets continue learning about installing diffrent 3rd party plugin. 

GUI Plugins
^^^^^^^^^^^

These plugins will be added to the user interface of QGIS, (i.e) to *Menu Bar* or *Toolbar*.

1. Open QGIS. Click on :menuselection:`Plugins --> Manage and Install Plugins...`. to open the :guilabel:`Plugins` dialog.

      .. image:: /static/3/using_plugins/images/5.png
         :align: center

2. Click on :guilabel:`All` tab. Here you will see a list of plugins listed.  

      .. image:: /static/3/using_plugins/images/6.png
         :align: center

3. For this tutorial, let's find and install a plugin called 'QuickWKT'. As you start typing *qui* in the :guilabel:`search` box, you will see the search results below. Click on the :guilabel:`QuickWKT`.

      .. image:: /static/3/using_plugins/images/7.png
         :align: center

4. Now information about the plugin will be displayed, this plugin is a WKT file viewer. Click the ``wkt`` in :guilabel:`Tags`, this will fetch all the plugins under this tag. 

      .. image:: /static/3/using_plugins/images/8.png
         :align: center

5. Now, click :guilabel:`Install Plugin` in QGIS :guilabel:`Plugins` dialog box. Now a QGIS info message bar will display a message ``Plugin installed successfully``.  

      .. image:: /static/3/using_plugins/images/9.png
         :align: center

6. If you noticed, there was no mention of the plugin category in the description. That makes it hard to determine how to access the newly installed plugin. Most external plugins are installed under the :guilabel:`Plugins` menu itself in QGIS. Click on :menuselection:`Plugins --> QuickWKT` and you will see the newly installed plugin. Usually, external plugins also install a  button in the :guilabel:`Plugins` toolbar also. You may also use that button to access the plugin.

      .. image:: /static/3/using_plugins/images/10.png
         :align: center

Processing Toolbox Plugins
^^^^^^^^^^^^^^^^^^^^^^^^^^

These plugins will add new algorithms (i.e. tools) to the :guilabel:`Processing toolbox: of QGIS. Rather than a standalone tool, a processing toolbox algorithm can be used as a part of the model builder for automating your work. We will now install a processing plugin. 

1. Open QGIS. Click on :menuselection:`Plugins --> Manage and Install Plugins...`. to open the :guilabel:`Plugins` dialog.

      .. image:: /static/3/using_plugins/images/11.png
         :align: center 

2. Click on :guilabel:`All` tab, and search for *ORS tools*. 

      .. image:: /static/3/using_plugins/images/12.png
         :align: center

3. Click on the plugin and click :guilabel:`Install Plugin` in QGIS :guilabel:`Plugins` dialog box. On successfull installation a QGIS info message bar will display a message ``Plugin installed successfully``.  

      .. image:: /static/3/using_plugins/images/13.png
         :align: center

4. The plugin will add a folder with tools in the :guilabel:`Process toolbox`, to enable processing toolbox, go to :menuselection:`Processing --> Toolbox`. 

      .. image:: /static/3/using_plugins/images/14.png
         :align: center

5. Here you can see the :guilabel:`QRS Tools` plugin installed. There are many groups of tools, and the ones that have the QGIS logo next to them are called Native algorithms. 

      .. image:: /static/3/using_plugins/images/15.png
         :align: center

6. Expand the ORS tool to explore all available tools under it. 

      .. image:: /static/3/using_plugins/images/16.png
         :align: center

Experimental Plugins
^^^^^^^^^^^^^^^^^^^^

Now you know how to install and find an *External Plugin* in QGIS. Let's explore some advanced options. Sometimes you are looking for a specific plugin, but cannot find it in the :guilabel:`All` tab. It maybe because the plugin is marked *Experimental*. Here is how to install *experimental* plugins.

1. Open :guilabel:`Plugins` by :menuselection:`Plugins --> Manage and Install Plugins...`. Click on the :guilabel:`Settings` tab. You will see an option called :guilabel:`Show also experimental plugins`. Click the checkbox next to it, to enable it. 

      .. image:: /static/3/using_plugins/images/17.png
         :align: center

2. Now switch back to :guilabel:`All` tab and search for 'RasterAttributeTable' plugin. 

      .. image:: /static/3/using_plugins/images/18.png
         :align: center

3. Click on the plugin, you can see it is marked as experimental. Click :guilabel:`Install Experimental Plugin` and close the :guilabel:`Plugins` dialog box. 

      .. image:: /static/3/using_plugins/images/19.png
         :align: center

.. note::

      Experimental plugin may not be well tested or under rapid development.

4. You can enable/disable this panel from :menuselection:`Plugins --> RasterAttributeTable`.  

      .. image:: /static/3/using_plugins/images/20.png
         :align: center

Search for Plugins
~~~~~~~~~~~~~~~~~~

1. Plugins that are available in the :guilable:`Plugins` manager can be found in the 