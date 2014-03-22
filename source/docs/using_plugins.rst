Using Plugins
=============
.. only:: html

   [ Download PDF `A4 <../pdf/using_plugins_a4.pdf>`_ `Letter
   <../pdf/using_plugins_letter.pdf>`_ ]

Plugins in QGIS add useful features to the software. Plugins are written by QGIS developers and other independent users who want to extend the core functionality of the software. These plugins are made available in QGIS for all the users. 

Overview of the task
--------------------

In this tutorial, you will learn how to enable *Core Plugins* as well as download and install *External Plugins*. You will also learn how to locate the plugin from the QGIS menu once they are installed. 

Procedure
---------

Core Plugins
~~~~~~~~~~~~

Core plugins are already part of the standard QGIS installation. To use these, you just need to enable them.

1. Open QGIS. Click on :menuselection:`Plugins --> Manage and Install Plugins...`. to open the :guilabel:`Plugin Manager` dialog.

.. image:: /static/using_plugins/images/1.png
   :align: center

2. Even if this is your first time using QGIS, you will see a lot of plugins listed under the :guilabel:`Installed` tab. This is because they are *Core Plugins* and were installed during QGIS installation. 

.. image:: /static/using_plugins/images/2.png
   :align: center

3. Let's enable one of the plugins. Check on the checkbox next to :guilabel:`Spatial Query Plugin`. This will enable the plugin and you will be able to use it. One thing to note is that plugins have the ability to insert menu items at various locations and create new panels and toolbars. Sometimes it is difficult to know how to find the newly enabled tools. Once clue is to look in the plugin discription. Here the description says *Category: Vector*. That indicates that the plugin would be found under the :guilabel:`Vector` menu once enabled. Click :guilabel:`Close`.

.. image:: /static/using_plugins/images/3.png
   :align: center

4. Now that the :guilabel:`Spatial Query Plugin` is enabled, you can go to the :menuselection:`Vector --> Spatial Query` to use the functionality added by the plugin.

.. image:: /static/using_plugins/images/4.png
   :align: center


External Plugins
~~~~~~~~~~~~~~~~

External plugins are available in the `QGIS Plugins Repository <http://plugins.qgis.org/>`_ and need to be installed by the users before using them. An easy way to browse and install these plugins is by using the :guilabel:`Plugin Manager` tool.  

1. Open QGIS. Click on :menuselection:`Plugins --> Manage and Install Plugins...`. to open the :guilabel:`Plugin Manager` dialog.

.. image:: /static/using_plugins/images/5.png
   :align: center

2. Click on :guilabel:`Get more` tab. Here you will see a list of plugins listed.  

.. image:: /static/using_plugins/images/6.png
   :align: center

3. For this tutorial, let's find and install a plugin called 'QuickQKT'. As you start typing *qui* in the :guilabel:`search` box, you will see the search results below. Click on the :guilabel:`QuickWKT`. Next, click on :guilabel:`Install plugin` button to install it. 

.. image:: /static/using_plugins/images/7.png
   :align: center

4. Once the plugin is downloaded and installed, you will see a confirmation dialog. 

.. image:: /static/using_plugins/images/8.png
   :align: center

5. If you noticed, there was no mention of the plugin category in the description. That makes it hard to determine how to access the newly installed plugin. Most external plugins are installed under the :guilabel:`Plugins` menu itself in QGIS. Click on :menuselection:`Plugins --> QuickWKT` and you will see the newly installed plugin. Usually, external plugins also install a  button in the :guilabel:`Plugins` toolbar also. You may also use that button to access the plugin.

.. image:: /static/using_plugins/images/9.png
   :align: center

Experimental Plugins
~~~~~~~~~~~~~~~~~~~~

Now you know how to install and find an *External Plugin* in QGIS. Let's explore some advanced options. Sometimes you are looking for a specific plugin, but cannot find it in the :guilabel:`Get more` tab. It maybe because the plugin is marked *Experimental*. Here is how to install *experimental* plugins.

1. Open :guilabel:`Plugin Manager` by :menuselection:`Plugins --> Manage and Install Plugins...`. Click on the :guilabel:`Settings` tab. You will see an option called :guilabel:`Show also experimental plugins`. Click the checkbox next to it, to enable it. 

.. image:: /static/using_plugins/images/10.png
   :align: center

2. You will see a new tab called :guilabel:`New`. The newly enabled experimental plugins will show up here.

.. note::

   The :guilabel:`New` tab will appear only temporarily once you enable the experimental plugins. The next time you open :guilabel:`Plugin Manager`, the experimental plugins will show alongside regular plugins in the :guilabel:`Get more` tab.

.. image:: /static/using_plugins/images/11.png
   :align: center

3. Let's install a plugin called :guilabel:`TimeManager`. Click on the plugin name and then Click :guilabel:`Install`.

.. image:: /static/using_plugins/images/12.png
   :align: center

4. Now when you come back to the main QGIS window, you will see a new *Panel* at the bottom of the canvas. This panel is created by the TimeManager plugin. This yet another way of plugins to add useful functionality to the user interfac .

.. image:: /static/using_plugins/images/13.png
   :align: center

5. You can enable/disable this panel from :menuselection:`View --> Panels --> Time Manager`.  

.. image:: /static/using_plugins/images/14.png
   :align: center
