##dissolve_layer=vector
##dissolve_field=field dissolve_layer
##sum_field=field dissolve_layer
##output_layer=output vector

from qgis.core import *
from PyQt4.QtCore import *

inlayer = processing.getObject(dissolve_layer)
dissolve_field_index = inlayer.fieldNameIndex(dissolve_field)
sum_field_index = inlayer.fieldNameIndex(sum_field)

# Find unique values present in the dissolve field
unique_values = set([f[dissolve_field] for f in processing.features(inlayer)])

# Create a dictionary to hold values from the sum field
sum_unique_values = {}
attrs = [f.attributes() for f in processing.features(inlayer)]
 
for unique_value in unique_values:
    val_list = [ f_attr[sum_field_index] for f_attr in attrs if f_attr[dissolve_field_index] == unique_value]
    sum_unique_values[unique_value] = sum(val_list)

# Run the regular Dissolve algorithm
processing.runalg("qgis:dissolve", dissolve_layer, "false",
    dissolve_field, output_layer)

# Add a new attribute called 'SUM' in the output layer
outlayer = processing.getObject(output_layer)
provider = outlayer.dataProvider()
provider.addAttributes([QgsField('SUM', QVariant.Double)])
outlayer.updateFields()

# Set the value of the 'SUM' field for each feature
outlayer.startEditing()
new_field_index = outlayer.fieldNameIndex('SUM')
for f in processing.features(outlayer):
  outlayer.changeAttributeValue(f.id(), new_field_index, sum_unique_values[f[dissolve_field]])
outlayer.commitChanges()

# Delete all fields except dissolve field and the newly created 'SUM' field
outlayer.startEditing()
fields_to_delete = [fid for fid in range(len(provider.fields())) if fid != new_field_index and fid != dissolve_field_index]
provider.deleteAttributes(fields_to_delete)
outlayer.updateFields()
outlayer.commitChanges()