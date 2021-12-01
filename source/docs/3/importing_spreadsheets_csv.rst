Importing Spreadsheets or CSV files (QGIS3)
===========================================
Many times the GIS data comes in a table or in a spreadsheet. QGIS allows you to import structured text files with coordinates as a vector layer. This tutorial shows how you can use the **Data Source Manager** to import **Delimited Text** files.

Overview of the task
--------------------

We will be importing a text file with earthquake locations in the tab-separated values (TSV) format to QGIS and create a points layer.

Get the data
------------

1. For this tutorial we will download a dataset of earthquakes between 1900-2000 from NOAA’s National Geophysical Data Center produces a great dataset of all significant earthquakes since 2150 BC. `Visit the NOAA NCEI portal <https://www.ngdc.noaa.gov/hazel/view/hazards/earthquake/search>`_ and enter :guilabel:`Min` as ``1900`` and :guilabel:`Max` as ``2000``.  This will return all earthquake incidents that occurred and were recorded by NOAA between those years. For other specific results, you can filter with different parameters. Click :guilabel:`Search`.

  .. image:: /static/3/importing_spreadsheets_csv/images/data01.png
     :align: center

2. As a result, we got *2585* earthquake incidents. Click on the :guilabel:`Download TSV` icon. 

  .. image:: /static/3/importing_spreadsheets_csv/images/data02.png
     :align: center

For convenience, you may directly download a copy of the above datasets from the link below:

`earthquakes_2021_11_25_14_31_59_+0530.tsv <https://www.qgistutorials.com/downloads/earthquakes-2021-11-25_14-31-59_+0530.tsv>`_ 

Data Source [NCEI]_

Procedure
---------

1. Examine your tabular data source. The downloaded earthquake database contains the ``Latitude`` and ``Longitude`` fields indicating the location of the earthquake epicenter and other related attributes. We will use these fields to import the file as a point layer. Open the data in a text editor such as Notepad/TextMate to view the contents. You will see that a TAB separates each field.

  .. image:: /static/3/importing_spreadsheets_csv/images/01.png
     :align: center

.. note::
   If you have a spreadsheet, use `Save As` function in your program to save it as a `Tab Delimited File` or a `Comma Separated Values (CSV)` file.

2. QGIS comes with a unified data manager that allows you to load all the various supported data formats. Click the :guilabel:`Open Data Source Manager` button on the :guilabel:`Data Source Toolbar`. You may also use :kbd:`Ctrl + L` keyboard shortcut.

  .. image:: /static/3/importing_spreadsheets_csv/images/02.png
     :align: center

3. In the :guilabel:`Data Source Manager` dialog box, switch to the :guilabel:`Delimited Text` tab. Click the :guilabel:`...` button next to the :guilabel:`File name`.

  .. image:: /static/3/importing_spreadsheets_csv/images/03.png
     :align: center

4. Depending upon the operating system, you may or may not view the file at the downloaded location. In File formats, switch to ``All files (*; *.*)`` to view the *tsv* file. 

  .. image:: /static/3/importing_spreadsheets_csv/images/04.png
     :align: center

5. Now you will see the downloaded file. Select that and click :guilabel:`Open`. 

  .. image:: /static/3/importing_spreadsheets_csv/images/05.png
     :align: center

6. In the :guilabel:`Data Source Manager` dialog box, the path to file will be available in :guilabel:`File Name`. Change the :guilabel:`Layer name` to ``1900_2000_earthquakes``. In the :guilabel:`File format` section, select :guilabel:`Custom delimiters` and check :guilabel:`Tab`. In the :guilabel:`Geometry definition` section, choose :guilabel:`Point coordinates`. By default :guilabel:`X field` and :guilabel:`Y field`  values will be auto-populated if it finds a suitable name field in the input. In our case, they are ``Longitude`` and ``Latitude``. You may change it if the import selects the wrong fields. You can leave the :guilabel:`Geometry CRS` to the default ``EPSG:4326 - WGS 84`` CRS. If your file contains coordinates in a different CRS, you could select the appropriate CRS here. Click :guilabel:`Add`.
 
   .. image:: /static/3/importing_spreadsheets_csv/images/06.png
     :align: center

.. note::

   It is easy to get confused between X and Y coordinates. Latitude specifies the north-south position of a point and hence it is a **Y** coordinate. Similarly Longitude specifies the east-west position of a point and it is a **X** coordinate.
   
07. You will now see that the data will be imported and displayed in the QGIS canvas as a new layer called ``1900_2000_earthquakes`` with CRS ``EPSG:4326``.  

  .. image:: /static/3/importing_spreadsheets_csv/images/07.png
     :align: center
