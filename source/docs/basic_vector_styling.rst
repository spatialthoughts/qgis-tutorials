Basic Vector Styling
====================
.. only:: html

   [ Download PDF `A4 <../pdf/basic_vector_styling_a4.pdf>`_ `Letter
   <../pdf/basic_vector_styling_letter.pdf>`_ ]

To create a map, one has to style the GIS data and present it in a form that is
visually informative. There are a large number of options available in QGIS to
apply different types of symbology to the underlying data. In this tutorial, we
will explore some basics of styling.

Overview of the task
--------------------

We will style a vector layer to show life expectancy in different countries of the world.

Other skills you will learn
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- View the attribute table of a vector layer.

Get the data
------------

The data we will use is from `Center for Sustainability and the Global
Environment (SAGE) <http://www.sage.wisc.edu/atlas/maps.php>`_ at the
University of Wisconsin-Madison.

You can download the `Life Expectancy GIS Grid data <http://www.sage.wisc.edu/atlas/data.php?incdataset=Life%20Expectancy>`_
from the human impact dataset. For convenience, you can also download a copy of this data by clicking on following
link:

:download:`lifeexpectancy.zip
<../static/basic_vector_styling/data/lifeexpectancy.zip>`

Data Source [SAGE]_

Procedure
---------

1. Open QGIS and go to :menuselection:`Layer --> Add Vector Layer..`.

.. image:: /static/basic_vector_styling/images/1.png
   :align: center

2. Browse to the downloaded ``lifeexpectancy.zip`` file and click
   :guilabel:`Open`. Select ``newsweek_data.shp`` and click :guilabel:`Open`.
   Next you will be prompted for choosing the CRS. Select `WGS84 EPSG:4326`
   as the Coordinate Reference System (CRS).

.. image:: /static/basic_vector_styling/images/2.png
   :align: center

3. The shapefile contained within the zip file is now loaded and you can see
   the default style applied to it.

.. image:: /static/basic_vector_styling/images/3.png
   :align: center

4. Right click on the layer name and select :guilabel:`Open Attribute Table`.

.. image:: /static/basic_vector_styling/images/4.png
   :align: center

5. Explore the different attributes. To style a layer, we must pick an
   `attribute` or a `column` that would represent the map we are trying to
   create. Since we want to create a layer represting life expectancy, i.e. the
   average age till a person lives in a country, the field :guilabel:`LIFEXPCT`
   is the attribute we want to use in styling.

.. image:: /static/basic_vector_styling/images/5.png
   :align: center

6. Close the attribute table. Right click on the layer again and choose
   :guilabel:`Properties`.

.. image:: /static/basic_vector_styling/images/6.png
   :align: center

7. The various styling options are located in the :guilabel:`Style` tab of the Properties
   dialog. Clicking on the drop-down button inthe Style dialiog, you will see
   there are five options available - :guilabel:`Single Symbol`, :guilabel:`Categorized`,
   :guilabel:`Graduated`, :guilabel:`Rule Based` and :guilabel:`Point
   displacement`. We will explore the first three in this tutorial.

.. image:: /static/basic_vector_styling/images/7.png
   :align: center

8. Select :guilabel:`Single Symbol`. This option allows you to choose a single
   style that will be applied to all the features in the layer. Since this is a
   polygon dataset, you have two basic choices. You can `fill` the polygon, or
   you can style with only `outline`. You can choose the :guilabel:`dotted`
   pattern fill and click :guilabel:`OK`.

.. image:: /static/basic_vector_styling/images/8.png
   :align: center

9. You will see a new style applied to the layer with the fill pattern you
   chose.

.. image:: /static/basic_vector_styling/images/9.png
   :align: center

10. You will see that this Single Symbol style isn’t useful in communicating
    the life expectancy data we are trying to map. Let us explore another
    styling option. Right-click the layer again and choose
    :guilabel:`Properties`. This time choose :guilabel:`Categorized` from the
    :guilabel:`Style` tab. Categorized means the features in the layer will be
    shown in different shades of a color based on unique values in an attribute
    field. Choose :guilabel:`LIFEXPCT` value as the :guilabel:`Column`. Choose
    a :guilabel:`color ramp` of your chice and click :guilabel:`Classify`
    at the bottom. Click :guilabel:`OK`.

.. image:: /static/basic_vector_styling/images/10.png
   :align: center

11. You will see different countries appearing in shades of blue. Lighter
    shades meaning lower life expectancy and darker shades meaning higher life
    expectancy. This representation of the data is more useful and clearly show
    how life expectancy in developed countries vs. developing countries. This
    would be the type of style we set out to create.

.. image:: /static/basic_vector_styling/images/11.png
   :align: center

12. Let us explore the :guilabel:`Graduated` symbology type in the :guilabel:`Style`
    dialog now. Graduated symbology type allows you to break down the data in a column in
    unique `classes` and choose a different style for each of the classes. We
    can think of classifying our life expectancy data into 3 classes, `LOW`,
    `MEDIUM` and `HIGH`. Choose :guilabel:`LIFEXPCT` as the :guilabel:`Column` and
    choose :guilabel:`3` as the classes. you will see there are many :guilabel:`Mode`
    optionsavailable. Let us see the logic behind each of these modes.
    There are 5 modes available. :guilabel:`Equal Interval`,
    :guilabel:`Quantile`, :guilabel:`Natural Breaks (Jenks)`,
    :guilabel:`Standard Deviation` and :guilabel:`Pretty Breaks`.
    These modes use different statistical algorithms to break down the data
    into separate classes.

    - Equal Interval: As the name suggests, this method will will create classes
      which are at the same size. If our data ranges from 0-100 and we want 10
      classes, this method would create a class from 0-10, 10-20, 20-30 and so on
      , keeping each class the same size of 10 units.
    - Quantile - This method will decide the classes such that number of values
      in each class are the same. If there are 100 values and we want 4
      classes, quantile method will decide the classes such that each class
      will have 25 values.
    - Natural Breaks (Jenks) - This algorithm tries to find natural groupings
      of data to create classes. The resulting classes will be such that there
      will be maximum variance between individual classes and least variance
      within each class.
    - Standard Deviation - This method will calculate the mean of the data, and
      create classes based on standard eviation from the mean.
    - Pretty Breaks - This is based on the statistical package R’s pretty
      algorithm. It is a bit complex, but the `pretty` in the name means it
      creates class boundaries that are round numbers.

    To keep things simple, let’s use the Quantile method. Click :guilabel:`Classify` at the
    bottom and you will see 3 classes show up with their corresponding values.
    Click :guilabel:`OK`.

.. note::

   For an attribute to be used in :guilabel:`Graduated` style, it must be a numeric field. Integer and Real
   values are fine, but if the attribute field type is String, it cannot be
   used with this styling option.

.. image:: /static/basic_vector_styling/images/12.png
   :align: center

13. You will see a map showing countries in either of 3 colors representing
    average life expectancy in the country.

.. image:: /static/basic_vector_styling/images/13.png
   :align: center

14. Now go back to the :guilabel:`Style` dialog by right clicking the layer and choosing
    :guilabel:`Properties`. There are some more styling options available.
    You can click on the Symbol for each of the classes and choose a different style.
    We will choose Red, Yellow and Green fill colors to indicate low, medium and high life expectancy.

.. image:: /static/basic_vector_styling/images/14.png
   :align: center

15. In the :guilabel:`Symbol Selector` dialog, click on :guilabel:`Color`
    selector.

.. image:: /static/basic_vector_styling/images/15.png
   :align: center

16. Click on a color fom the :guilabel:`Select Color` dialog.

.. image:: /static/basic_vector_styling/images/16.png
   :align: center

17. Back in the :guilabel:`Layer Properties` dialog, you can double-click on the
    :guilabel:`Label` column next to each value and enter the text that you
    want to display. Similarly, you may double-click on the :guilabel:`Range`
    column to edit the selected ranges. Click :guilabel:`OK` once you are
    satisfied with the classes.

.. image:: /static/basic_vector_styling/images/17.png
   :align: center

18. This style definitely conveys a lot more useful map than the previous two
    attempts. There are clearly marked class names and colors to represent our
    interpretation of the life expectancy values.

.. image:: /static/basic_vector_styling/images/18.png
   :align: center
