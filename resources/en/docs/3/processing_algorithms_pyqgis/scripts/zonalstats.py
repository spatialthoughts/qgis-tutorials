root = QgsProject.instance().layerTreeRoot()

input_layer = 'Zip_Codes'
result_layer = input_layer
unique_field = 'OBJECTID'

# Iterate through all raster layers
for layer in root.children():
  if layer.name().startswith('PRISM'):
    # Run Zonal Stats algorithm
  
    prefix = layer.name()[-6:-4]
    params = {'INPUT_RASTER': layer.name(),
        'RASTER_BAND': 1, 'INPUT': input_layer,
        'COLUMN_PREFIX': prefix+'_', 'STATISTICS': [2],
        'OUTPUT': 'memory:'
        }
    result = processing.run("native:zonalstatisticsfb", params)
    zonalstats = result['OUTPUT']
    
    # Run Join Attributes by Table to join the newly created
    # column with original layer
    params = { 'INPUT': result_layer, 'FIELD':unique_field,
        'INPUT_2': zonalstats, 'FIELD_2': unique_field, 
        'FIELDS_TO_COPY': prefix + '_' + 'mean',
        'OUTPUT': 'memory:'}
        
    result = processing.run("native:joinattributestable", params)
    
    # At the end of each iteration, update the result layer to the
    # newly processed layer, so we keep adding new fields to the same layer
    result_layer = result['OUTPUT']
    
QgsProject.instance().addMapLayer(result_layer)