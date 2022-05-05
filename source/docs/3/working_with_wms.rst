Working with WMS Data (QGIS3)
==============================

Often you need reference data layers for your basemap or to display your
results in the context of other datasets. Many organizations publish datasets
online that can be readily used in GIS. A popular standard for publishing maps
online is called **WMS (Web Map Service)**. This is a better choice for using
reference layers as you get access to rich datasets in your GIS without the
hassle of downloading or styling the data.


Overview of the task
--------------------

In this tutorial, we will load a WMS layer of `Urban Expansion to 2030 <https://sedac.ciesin.columbia.edu/data/set/lulc-global-grid-prob-urban-expansion-2030>`_ published by the Socioeconomic Data and Applications Center (SEDAC).

Other skills you will learn 
----------------------------
- How to adjust transparency of a layer and add opacity control slider widget in QGIS. 

Get the Data
-------------
1. Visit the `Global Grid of Probabilities of Urban Expansion by SEDAC <https://sedac.ciesin.columbia.edu/data/set/lulc-global-grid-prob-urban-expansion-2030>`_, this data contains probabilistic forecasts of global urban land cover change from 2000 to 2030 at a 2.5 arc-minute resolution. Click on :guilabel:`Map Services`.  

.. image:: /static/3/working_with_wms/images/data1.png
   :align: center

2. Copy the WMS service URL. This is the URL to the WMS service which hosts the data layer.

.. image:: /static/3/working_with_wms/images/data2.png
   :align: center

Procedure
---------

1. Open QGIS and click :guilabel:`Open Data Source Manager`.

	.. image:: /static/3/working_with_wms/images/1.png
	   :align: center

2. In the :guilabel:`Data Source Manager` dialog box switch to :guilabel:`WMS/WMTS`, click :guilabel:`New`. 

	.. image:: /static/3/working_with_wms/images/2.png
	   :align: center

3. In the :guilabel:`Create a New WMS/WMTS Connection` dialog box under :guilabel:`Connection Details` enter the :guilabel:`Name` as ``SEDAC``, and paste the copied URL in :guilabel:`URL` textbox. Click :guilabel:`OK`. If you get an error with the copied URL, try with the alternate URL ``https://sedac.ciesin.columbia.edu/geoserver/ows``.


	.. image:: /static/3/working_with_wms/images/3.png
	   :align: center

.. note::

	You are creating a new connection to a WMS service - not a specific layer. A single service usually offers multiple layers that can be added to your project. 

4. Now in the :guilabel:`Data Source Manager` dialog box, click :guilabel:`Connect`. All available layers will be loaded. You will notice different IDs listed next to the layers. ID ``0`` means you get a map of all the layers. If you do not want all the layers, you can expand the  list by clicking on :guilabel:`▸` icon and selecting the layer of interest. 

	.. image:: /static/3/working_with_wms/images/4.png
	   :align: center    

5. For this tutorial, we are interested in a specific layer. Search for ``Probabilities of Urban Expansion to 2030``. Select the *default* version of urban expansion 2030 layer.

	.. image:: /static/3/working_with_wms/images/5.png
	   :align: center

6.  In the :guilabel:`Image Encoding` section, you need to choose an image
    format.  The image format is important, and it is dependent on use case. Based on user perspective here are some pointers,

    - **Quality**: File compression for a PNG is lossless, for JPEG it is a lossy compression and TIFF can be either. That means the quality of PNGs will be better compared to JPEG. If your main purpose is to print a map, use PNG.

    - **Speed**: Since PNGs images are uncompressed and thus larger in size, they will take longer to load. If you are using the layer in your project as a reference layer and need to zoom/pan a lot, use JPEG.

    - **Client Support**: QGIS supports most of the formats, but if you are developing web applications, browsers usually do not support TIFF, so you should choose another format.

    - **Type of data**: If your layers are primarily vector, PNG will give  better results. For imagery layers, JPEG is usually a better choice.

	For this tutorial, choose :guilabel:`PNG` as the format. Change the :guilabel:`Layer name` if you wish and click :guilabel:`Add`.

	.. image:: /static/3/working_with_wms/images/6.png
	   :align: center

7. Now a :guilabel:`Probabilities of Urban Expansion to 2030` layer will be loaded in the canvas. Use the Zoom/Pan tools to explore the layer.  The way the WMS service works is that every time you zoom/pan, it sends your viewport coordinates to the server and the server creates an image for that viewport and returns it to the client. So, there will be some delay before you see the image for the area after you have zoomed in. Hence, an internet connection is always required to access this layer. 

	.. image:: /static/3/working_with_wms/images/7.png
	   :align: center 

8. Now, zoom to any known place and click on the :guilabel:`Identify Features` icon in toolbar. 

	.. image:: /static/3/working_with_wms/images/8.png
	   :align: center

9. Click on any pixel in canvas, it will pop up a dialog box with the cell value. This the value of the pixel in the layer - which represents the probability that the pixel will be urbanized by 2030. Since the layer is not stored locally these values are retrieved from the service provider. You can see the results better by selecting the :guilabel:`Format` as ``HTML`` and :guilabel:`View` as ``Tree``. 

	.. image:: /static/3/working_with_wms/images/9.png
		:align: center

.. note::

   The information is retrieved by *GetFeatureInfo*, it is WMS standard call that allows us to retrieve information about features and coverages displayed in a map. If the map is composed of various layers, and GetFeatureInfo can be instructed to return multiple feature descriptions, *HTML/GeoJSON* is the usual file format in which the information is retrieved. 


10. To view, the additional information about the layer right-click on the layer and select :guilabel:`Properties...`.

	.. image:: /static/3/working_with_wms/images/10.png
	   :align: center

11. In the :guilabel:`Layer Properties` dialog box, switch to the :guilabel:`Information` tab here all the information such as *data provider*, *projections*, *extent* can be found. Click :guilabel:`OK` to close the dialog-box after exploring.  

	.. image:: /static/3/working_with_wms/images/11.png
	   :align: center

12. In QGIS :guilabel:`Browser`, search for :guilabel:`XYZ Tiles` and click and drag the ``OpenStreetMap`` to canvas.

	.. image:: /static/3/working_with_wms/images/12.png
	   :align: center

13. Click on the :guilabel:`Open the Layer Styling panel` icon and switch to :guilabel:`Transparency`. 

	.. image:: /static/3/working_with_wms/images/13.png
	   :align: center

14. Set the :guilabel:`Global opacity` to ``50 %``

	.. image:: /static/3/working_with_wms/images/14.png
	   :align: center

15. Now in canvas, the Urban layer can be explored with geographical reference. 

	.. image:: /static/3/working_with_wms/images/15.png
	   :align: center

16. To gain more access to the transparency of the layer right-click on the layer and select :guilabel:`Properties...`. 

	.. image:: /static/3/working_with_wms/images/16.png
	   :align: center

17. In the :guilabel:`Layer Properties` dialog box, switch to the :guilabel:`Legend` tab, under :guilabel:`Available widgets` select ``Opacity slider`` and click :guilabel:`Add selected widgets` icon. Click :guilabel:`OK`.

	.. image:: /static/3/working_with_wms/images/17.png
	   :align: center

18. Now a slider widget will be available to control the opacity of the layer. 

	.. image:: /static/3/working_with_wms/images/18.png
	   :align: center