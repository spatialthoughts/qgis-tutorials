Working with Attributes
=======================

.. warning:: 

  This tutorial is now obsolete. A new and updated version is available at :doc:`3/working_with_attributes`
   
   
GIS data has two parts - features and attributes. Attributes are structured
data about each feature. This tutorial shows how to view the attributes and do
basic queries on them in QGIS.

Overview of the task
--------------------

The dataset for this tutorial contains information about populated places of
the world. The task is to query and find all the capital cities in the world
that have a population greater than 1,000,000.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Select features from a layer using expressions.
- Deselect features from a layer using the :guilabel:`Attributes` toolbar.
- Using :guilabel:`Query Builder` to show a subset of features from a layer.

Get the data
------------
Natural Earth has a nice `Populated Places
<http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/>`_
dataset. Download the `simple (less columns) dataset
<http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places_simple.zip>`_

For convenience, you may directly download a copy of datasets from the link
below:

`ne_10m_populated_places_simple.zip
<http://www.qgistutorials.com/downloads/ne_10m_populated_places_simple.zip>`_

Data Source [NATURALEARTH]_

Procedure
---------

1. Once you have downloaded the data, open QGIS. Go to :menuselection:`Layer
   --> Add Layer --> Add Vector Layer`.

.. image:: /static/working_with_attributes/images/1.png
   :align: center

2. Click on :guilabel:`Browse` and navigate to the folder where you downloaded
   the data.

.. image:: /static/working_with_attributes/images/2.png
   :align: center

3. Locate the downloaded zip file `ne_10m_populated_places_simple.zip`. You do
   not need to unzip the file. QGIS has the ability to read zip files directly.
   Select the file and click :guilabel:`Open`.

.. image:: /static/working_with_attributes/images/3.png
   :align: center

4. The selected layer will now be loaded in QGIS and you will see many points
   representing the populated places of the world.

.. image:: /static/working_with_attributes/images/4.png
   :align: center

5. Right-click the layer and select :guilabel:`Open Attribute Table`.

.. image:: /static/working_with_attributes/images/5.png
   :align: center

6. Explore the various attributes and their values.

.. image:: /static/working_with_attributes/images/6.png
   :align: center

7. We are interested in the population of each feature, so `pop_max` is the
   field we are looking for. You can click twice on the field header to sort
   the column in descending order.

.. image:: /static/working_with_attributes/images/7.png
   :align: center

8. Now we are ready to perform our query on these attributes. QGIS uses
   SQL-like expressions to perform queries. Click :guilabel:`Select features
   using an expression`.

.. image:: /static/working_with_attributes/images/8.png
   :align: center

9. In the :guilabel:`Select By Expression` window, expand the :guilabel:`Fields
   and Values` section and double-click the ``pop_max`` label.  You will notice
   that it is added to the expression section at the bottom.  If you aren't
   sure about the field values, you can click the :guilabel:`Load all unique
   values` to see what the attribute values are present in the dataset. For
   this exercise, we are looking to find all features that have a population
   greater than ``1,000,000``. So complete the expression as below and click
   :guilabel:`Select`.

.. code-block:: none

   "pop_max" > 1000000

.. image:: /static/working_with_attributes/images/9.png
   :align: center

10. Click on :guilabel:`Close` and return to the main QGIS window. You will
    notice that a subset of points is now rendered in yellow. This is the
    result of our query and you are seeing all places from the dataset that
    have the ``pop_max`` attribute value greater than ``1,000,000``.

.. image:: /static/working_with_attributes/images/10.png
   :align: center

11. The goal for this exercise is to find the places that are country capitals.
    The field containing this data is `adm0cap`. The value ``1`` indicates that
    the place is a capital. We can add this criteria to our previous expression
    using the ``and`` operator. Let’s refine our query to select only those
    places which are capitals.  Click on the :guilabel:`Select feature using an
    expression` button in the attribute table and enter the expression as below
    and click :guilabel:`Select` and then :guilabel:`Close`.

.. code-block:: none

   "pop_max" > 1000000 and "adm0cap" = 1

.. image:: /static/working_with_attributes/images/11.png
   :align: center

12. Return to the main QGIS window. Now you will see a smaller subset of the
    points selected. This is the result of the second query and shows all
    places from the dataset that are country capitals as well as have
    population greater than 1,000,000. If we wanted to do some further analysis
    on this subset of data, we can make this selection persistent. Right-click
    the ``ne_10m_populated_places_simple`` layer and select
    :guilabel:`Properties`.

.. image:: /static/working_with_attributes/images/12.png
   :align: center

13. In the :guilabel:`General` tab, scroll down to the :guilabel:`Feature
    subset` section. Click :guilabel:`Query Builder`.

.. image:: /static/working_with_attributes/images/13.png
   :align: center

14. Enter the same expression you had entered earlier and click :guilabel:`OK`. 

.. code-block:: none

   "pop_max" > 1000000 and "adm0cap" = 1

.. image:: /static/working_with_attributes/images/14.png
   :align: center

15. Back in the main QGIS window, you will see rest of the points disappear.
    You may now perform any other analysis on this layer and only the features
    that match our expression will be used. You will notice that the points
    still appear in yellow. This is because they are still selected. Find the
    :guilabel:`Deselect Features from All Layers` button under the
    :guilabel:`Attributes` toolbar and click on it.

.. image:: /static/working_with_attributes/images/15.png
   :align: center

16. You will see that the points are now de-selected and rendered in their
    original color.

.. image:: /static/working_with_attributes/images/16.png
   :align: center
