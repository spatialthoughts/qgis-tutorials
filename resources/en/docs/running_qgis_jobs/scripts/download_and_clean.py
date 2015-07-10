import sys
from qgis.core import *

import os
import urllib
import zipfile
import tempfile

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

# Download and unzip the latest shapefile
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

print 'Downloaded file to %s' % roads_shp_path

# Reproject the Roads layer
print 'Reprojecting the roads layer'

ret = processing.runalg('qgis:reprojectlayer', roads_shp_path, 'EPSG:3460', None)
output = ret['OUTPUT']

# Clean the Roads layer
print 'Cleaning the roads layer'

processing.runalg("grass:v.clean",
                  output,
                  1,
                  1,
                  None,
                  -1,
                  0.0001,
                  'C:\\Users\\Ujaval\\Desktop\\clean.shp',
                  'C:\Users\\Ujaval\\Desktop\\errors.shp')
print 'Success'
