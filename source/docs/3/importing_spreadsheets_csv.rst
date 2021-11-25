Importing Spreadsheets or CSV files (QGIS3)
===========================================
Many times the GIS data comes in a table or an Excel spreadsheet. Also, if you have a list lat/long coordinates, you can easily import this data in your GIS project.

Overview of the task
--------------------

We will be importing a text file (tab seperated) of earthquake data to QGIS. 

Get the data
------------

1. NOAA’s National Geophysical Data Center produces a great dataset of all significant earthquakes since 2150 BC. `Visit the NOAA NCEI portal <https://www.ngdc.noaa.gov/hazel/view/hazards/earthquake/search>`_ and enter :guilabel:`Min` as ``1900`` and :guilabel:`Max` as ``2000``.  This will return all earthquake incidents that occurred and were recorded by NOAA between those years. For other specific results, you can filter with different parameters. Click :guilabel:`Search`.

  .. image:: /static/3/importing_spreadsheets_csv/images/data01.png
     :align: center

2. As a result, we got *2585* earthquake incidence. Click on the :guilabel:`Download TSV` icon. 

  .. image:: /static/3/importing_spreadsheets_csv/images/data02.png
     :align: center

For convenience, you may directly download a copy of the above datasets from the link below:

`earthquakes_2021_11_25_14_31_59_0530 <https://www.qgistutorials.com/downloads/earthquakes-2021-11-25_14-31-59_+0530.tsv>`_ 

Data Source [NGDC]_

Procedure
---------

1. Examine your tabular data source. The downloaded earthquake database contains the ``Latitude`` and ``Longitude`` of the earthquake centers and other related attributes. To import this data to QGIS, you need at least two columns that contain the X and Y coordinates. Open the data in a text editor such as Notepad/TextMate to view the contents. You will see that a TAB separates each field.

  .. image:: /static/3/importing_spreadsheets_csv/images/01.png
     :align: center

2. QGIS comes with a unified data manager that allows you to load all the various supported data formats. Click the :guilabel:`Open Data Source Manager` button on the :guilabel:`Data Source Toolbar`. You may also use :kbd:`Ctrl + L` keyboard shortcut.

  .. image:: /static/3/importing_spreadsheets_csv/images/02.png
     :align: center

3. In the :guilabel:`Data Source Manager` dialog box, switch to the :guilabel:`Delimited Text` tab. Click the :guilabel:`...` button next to the :guilabel:`File name`.

  .. image:: /static/3/importing_spreadsheets_csv/images/03.png
     :align: center

4. Depending upon the operating system, you may or may not view the file at the downloaded location. In File formats, switch to ``All files (* *.*)`` to view the *tsv* file. 

  .. image:: /static/3/importing_spreadsheets_csv/images/04.png
     :align: center

5. Now you will see the downloaded file. Select that and click :guilabel:`Open`. 

  .. image:: /static/3/importing_spreadsheets_csv/images/05.png
     :align: center

6. In the :guilabel:`Data Source Manager` dialog box, the path to file will be available in :guilabel:`File Name`. Change the :guilabel:`Layer name` to ``1900_2000_earthquake``. In the :guilabel:`File format` section, select :guilabel:`Custom delimiters` and check :guilabel:`Tab`. In the :guilabel:`Geometry definition` section, choose :guilabel:`Point coordinates` by default import will auto-populate if it finds a suitable :guilabel:`X field` and :guilabel:`Y field`. In our case, they are ``Longitude`` and ``Latitude``. You may change it if the import selects the wrong fields. You can leave the :guilabel:`Geometry CRS` to the default ``EPSG:4326 - WGS 84`` CRS. If your file contained coordinates in a different CRS, you could select the appropriate CRS here. Click :guilabel:`Add`.
 
   .. image:: /static/3/importing_spreadsheets_csv/images/06.png
     :align: center

.. note::

   It is easy to confuse X and Y coordinates. Latitude specifies the north-south position of a point and hence it is a **Y** coordinate. Similarly Longitude specifies the east-west position of a point and it is a **X** coordinate.
   
07. You will now see that the data will be imported and displayed in the QGIS canvas as a new layer called ``1900_2000_earthquake`` with CRS ``EPSG:4326``.  

  .. image:: /static/3/importing_spreadsheets_csv/images/07.png
     :align: center