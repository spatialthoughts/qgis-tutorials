Running and Scheduling QGIS Processing Jobs
===========================================
.. only:: html

   [ Download PDF `A4 <../pdf/running_qgis_jobs.pdf>`_ `Letter
   <../pdf/running_qgis_jobs_letter.pdf>`_ ]

You can automate a lot of tasks in QGIS using Python scripting (PyQGIS) and the
Processing Framework. Most of the time, you would run these scripts manually
while QGIS is open. While that is helpful, many times you need a way to run
this jobs via the command-line and without needing to open QGIS. Fortunately,
you can write standalone python scripts that use QGIS libraries and can be run
via the command-line. In this tutorial, we will learn how to write and
schedule a job that uses the QGIS Processing framework.

Overview of the task
--------------------

Let's say we are working on some analysis using shapefiles of a region. The
shapefiles are updated on a daily basis and we always need the latest file. But
before we can use these files, we need to cleanup the data. We can setup a QGIS
job that automates this process and runs it daily so you have the latest
cleaned up shapefiles for your work. We will write a standalone Python script
that downloads a shapefile and run topological cleaning operations on a daily
basis.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Downloading and unzipping files using Python.
- Running any Processing algorithm via PyQGIS.
- Fixing topological errors in a vector layer.

Get the data
------------

`Geofabrik <http://www.geofabrik.de/>`_ provides daily updated shapefiles of
`OpenStreetMap <http://www.openstreetmap.org/>`_ datasets.

We will use `shapefiles for Fiji
<http://download.geofabrik.de/australia-oceania.html>`_ for this exercise.
Download the `fiji-latest.shp.zip
<http://download.geofabrik.de/australia-oceania/fiji-latest.shp.zip>`_ and
unzip it to a folder on your disk.

Data Source [GEOFABRIK]_

Procedure
---------

1. We will first run through the process of cleaning the shapefile manually to
   note the commands that we will use in the python script. Launch QGIS and go
   to :menuselection:`Layer --> Add Layer --> Add Vector Layer`.

.. image:: /static/running_qgis_jobs/images/1.png
   :align: center

2. Browse to the folder containing the unzipped shapefiles and select the
   ``roads.shp`` file and click :guilabel:`Open`.

.. image:: /static/running_qgis_jobs/images/2.png
   :align: center

3. First we must re-project the roads layer to a Projected CRS. This will allow
   us to use *meters* as units when performing analysis instead of degrees.
   Open :menuselection:`Processing --> Toolbox`.

.. image:: /static/running_qgis_jobs/images/3.png
   :align: center

4. Search for the :guilabel:`Reproject layer` tool. Double-click it to launch
   the dialog.

.. image:: /static/running_qgis_jobs/images/4.png
   :align: center

5. In the :guilabel:`Reproject layer` dialog, select the ``roads`` layer as
   :guilabel:`Input layer`. We will use ``EPSG:3460 Fiji 1986 / Fiji Map Grid``
   CRS as the :guilabel:`Target CRS`. Click :guilabel:`Run`.

.. image:: /static/running_qgis_jobs/images/5.png
   :align: center

6. Once the process finishes, you will see the reprojected layer loaded in
   QGIS. Go to :menuselection:`Processing --> History and Log..`.

.. image:: /static/running_qgis_jobs/images/6.png
   :align: center

7. In the :guilabel:`History and Log` dialog, expand the :guilabel:`Algorithm`
   folder and select the latest entry. You will see the full processing command
   shown in the bottom panel. Note this command for use in our script.

.. image:: /static/running_qgis_jobs/images/7.png
   :align: center

8. Back in the main QGIS Window, click at the :guilabel:`CRS` button in the
   bottom-right corner.

.. image:: /static/running_qgis_jobs/images/8.png
   :align: center

9. In the :guilabel:`Project Properties | CRS` dialog, check the
   :guilabel:`Enable on-the-fly CRS transformation` and select ``EPSG:3460 Fiji
   1986 / Fiji Map Grid`` as the CRS. This will ensure that our original and
   reprojected layers will line up correctly.

.. image:: /static/running_qgis_jobs/images/9.png
   :align: center

10. Now we will run the cleaning operation. GRASS has a very powerful set of
    topological cleaning tools. These are available in QGIS via the ``v.clean``
    algorithm. Search for this algorithm in the :guilabel:`Processing Toolbox`
    and double-click it to launch the dialog.

.. image:: /static/running_qgis_jobs/images/10.png
   :align: center

11. You can read more about various tools and options in the :guilabel:`Help`
    tab. For this tutorial, we will be using the ``snap`` tool to remove
    duplicate vertices that are within 1 meter of each other. Select
    ``Reprojected layer`` as the :guilabel:`Layer to clean`. Choose ``snap`` as
    the :guilabel:`Cleaning tool`.  Enter ``1.00`` as the
    :guilabel:`Threshold`. Leave the other fields blank and click
    :guilabel:`Run`.

.. image:: /static/running_qgis_jobs/images/11.png
   :align: center

12. Once the processing finishes, you will see 2 new layers added to QGIS. The
    ``Cleaned vector layer`` is the layer with topological errors corrected.
    You will also have a ``Errors layer`` which will highlight the features
    which were repaired. You can use the errors layer as a guide and zoom in to
    see vertices that were removed.

.. image:: /static/running_qgis_jobs/images/12.png
   :align: center

13. Go to :menuselection:`Processing --> History and Log` dialog and note the
    full processing command for later use.

.. image:: /static/running_qgis_jobs/images/13.png
   :align: center

14. We are ready to start coding now. See the **A Text Editor or a Python IDE**
    section in the :doc:`building_a_python_plugin` tutorial for instructions to
    setup your text editor or IDE. For running standalone python scripts that
    use QGIS, we must set various configuration options. A good way to run
    standalone scripts is to launch them via a ``.bat`` file. This file will
    first set the correct configuration options and then call the python
    script. Create a new file named ``launch.bat`` and enter the following
    text. Change the values according to your QGIS configuration. Don't forget
    to replace the username with your own username in the path to the python
    script.  The paths in this file will be the same on your system if you
    installed QGIS via the ``OSGeo4W Installer``. Save the file on your
    Desktop.

.. note::

   Linux and Mac users need not create a separate launcher file like this. You
   can set the PATH and other Environment variables in the terminal and run
   your script directly.

.. code-block:: none

   REM Change OSGEO4W_ROOT to point to the base install folder
   SET OSGEO4W_ROOT=C:\OSGeo4W64
   SET QGISNAME=qgis
   SET QGIS=%OSGEO4W_ROOT%\apps\%QGISNAME%
   set QGIS_PREFIX_PATH=%QGIS%
   REM Gdal Setup
   set GDAL_DATA=%OSGEO4W_ROOT%\share\gdal\
   REM Python Setup
   set PATH=%OSGEO4W_ROOT%\bin;%QGIS%\bin;%PATH%
   SET PYTHONHOME=%OSGEO4W_ROOT%\apps\Python27
   set PYTHONPATH=%QGIS%\python;%PYTHONPATH%

   REM Launch python job
   python c:\Users\Ujaval\Desktop\download_and_clean.py
   pause

.. image:: /static/running_qgis_jobs/images/14.png
   :align: center

15. Create a new python file and enter the following code. Name the file as
    ``download_and_clean.py`` and save it on your Desktop.

.. code-block:: python

   from qgis.core import *
   print 'Hello QGIS!'

.. image:: /static/running_qgis_jobs/images/15.png
   :align: center

16. Switch to your Desktop and locate the ``launch.bat`` icon. Double-click it
    to launch a new command window and run the script. If you see ``Hello
    QGIS!`` printed in the command window, your configuration and setup worked
    fine. If you see errors or do not see the text, check your ``launch.bat``
    file and make sure all the paths match the locations on your system.

.. image:: /static/running_qgis_jobs/images/16.png
   :align: center

17. Back in your text editor, modify the ``download_and_clean.py`` script to
    add the following code. This is the bootstrap code to initialize QGIS.
    These are unnecessary if you are running the script within QGIS. But since
    we are running it outside QGIS, we need to add these at the beginning. Make
    sure you replace the username with your username. After making these
    changes, save the file and run ``launch.bat`` again. If you see ``Hello
    QGIS!`` printed, you are all set to do add the processing logic to the
    script.

.. code-block:: python

   import sys
   from qgis.core import *

   # Initialize QGIS Application
   QgsApplication.setPrefixPath("C:\\OSGeo4W64\\apps\\qgis", True)
   app = QgsApplication([], True)
   QgsApplication.initQgis()

   # Add the path to Processing framework
   sys.path.append('c:\\Users\\Ujaval\\.qgis2\\python\\plugins')

   # Import and initialize Processing framework
   from processing.core.Processing import Processing
   Processing.initialize()
   import processing

   print 'Hello QGIS!'

.. image:: /static/running_qgis_jobs/images/17.png
   :align: center

18. Recall the first processing command that we had saved from the log. This
    was the command to re-project a layer. Paste the command to your script and
    add the surrounding code as follows. Note that processing commands return
    the path to the output layers as a dictionary. We are storing this as the
    ``ret`` value and printing the path to the reprojected layer.

.. code-block:: python

   roads_shp_path = "C:\\Users\\Ujaval\\Downloads\\fiji-latest.shp\\roads.shp"
   ret = processing.runalg('qgis:reprojectlayer', roads_shp_path, 'EPSG:3460',
   None)
   output = ret['OUTPUT']
   print output

.. image:: /static/running_qgis_jobs/images/18.png
   :align: center

19. Run the script via ``launch.bat`` and you will see the path to the newly
    created reprojected layer.

.. image:: /static/running_qgis_jobs/images/19.png
   :align: center

20. Now add the code for cleaning the topology. Since this is our final output,
    we will add the output file paths as the last 2 arguments for the
    ``grass.v.clean`` algorithm. If you left these blank, the output will be
    created in a temporary directory.

.. code-block:: python

   processing.runalg("grass:v.clean",
                     output,
                     1,
                     1,
                     None,
                     -1,
                     0.0001,
                     'C:\\Users\\Ujaval\\Desktop\\clean.shp',
                     'C:\Users\\Ujaval\\Desktop\\errors.shp')

.. image:: /static/running_qgis_jobs/images/20.png
   :align: center

21. Run the script and you will see 2 new shapefiles created on your Desktop.
    This completes the processing part of the script. Let's add the code to
    download the data from the original website and unzip it automatically. We
    will also store the path to the unzipped file in a variable that we can
    pass to the processing algorithm later. We will need to import some
    additional modules for doing this. (See the end of the tutorial for the
    full script with all the changes)

.. code-block:: python

   import os
   import urllib
   import zipfile
   import tempfile

   temp_dir = tempfile.mkdtemp()
   download_url = 'http://download.geofabrik.de/australia-oceania/fiji-latest.shp.zip'
   print 'Downloading file'
   zip, headers = urllib.urlretrieve(download_url)
   with zipfile.ZipFile(zip) as zf:
       files = zf.namelist()
       for filename in files:
           if 'roads' in filename:
               file_path = os.path.join(temp_dir, filename)
               f = open(file_path, 'wb')
               f.write(zf.read(filename))
               f.close()
               if filename == 'roads.shp':
                   roads_shp_path = file_path


.. image:: /static/running_qgis_jobs/images/21.png
   :align: center

22. Run the completed script. Everytime you run the script, a fresh copy of the
    data will be downloaded and processed.

.. image:: /static/running_qgis_jobs/images/22.png
   :align: center

23. To automate running on this script on a daily basis, we can use the ``Task
    Scheduler`` in Windows. Launch the Task Scheduler and click
    :guilabel:`Create Basic Task`.

.. note:: Linux and Mac users can use cron jobs to schedule  tasks.

.. image:: /static/running_qgis_jobs/images/23.png
   :align: center

24. Name the task as ``Daily Download and Cleanup`` and click :guilabel:`Next`.

.. image:: /static/running_qgis_jobs/images/24.png
   :align: center

25. Select ``Daily`` as the :guilabel:`Trigger` and click :guilabel:`Next`

.. image:: /static/running_qgis_jobs/images/25.png
   :align: center

26. Select a time as per your liking and click :guilabel:`Next`.

.. image:: /static/running_qgis_jobs/images/26.png
   :align: center

27. Choose ``Start a program`` as the :guilabel:`Action` and click
    :guilabel:`Next`.

.. image:: /static/running_qgis_jobs/images/27.png
   :align: center

28. Click :guilabel:`Browse` and locate the ``launch.bat`` script. Click
    :guilabel:`Next`.

.. image:: /static/running_qgis_jobs/images/28.png
   :align: center

29. Click :guilabel:`Finish` at the last screen to schedule the task. Now the
    script will automatically launch at the specified time to give you a fresh
    copy of cleaned data everyday.

.. image:: /static/running_qgis_jobs/images/29.png
   :align: center

Below is the full ``download_and_clean.py`` script for your reference.

.. literalinclude:: /static/running_qgis_jobs/scripts/download_and_clean.py
