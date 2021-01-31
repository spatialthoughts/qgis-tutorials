import requests
import processing
from PyQt5.QtCore import QCoreApplication
from qgis.core import (QgsProcessing, QgsProcessingAlgorithm, 
    QgsProcessingParameterFeatureSource, QgsProcessingParameterFeatureSink,
    QgsFeatureSink)


class MatrixToRoutes(QgsProcessingAlgorithm):
    """Creats Routes from Distance Matrix"""
    NETWORK = 'NETWORK'
    MATRIX = 'MATRIX'
    OUTPUT = 'OUTPUT'

    
    def initAlgorithm(self, config=None):
        self.addParameter(
            QgsProcessingParameterFeatureSource(
                'NETWORK',
                self.tr('Network Layer'),
                types=[QgsProcessing.TypeVectorLine]
            )
        )
        
        self.addParameter(
            QgsProcessingParameterFeatureSource(
                'MATRIX',
                self.tr('Distance Matrix Layer'),
                types=[QgsProcessing.TypeVectorLine]
            )
        )
        
        
        self.addParameter(
            QgsProcessingParameterFeatureSink(
                self.OUTPUT,
                'Network Routes',
                QgsProcessing.TypeVectorLine
            )
        )

    def processAlgorithm(self, parameters, context, feedback):
        network = self.parameterAsString(parameters, self.NETWORK, context)
        matrix = self.parameterAsSource(parameters, self.MATRIX, context)
        
        sink, dest_id = self.parameterAsSink(
            parameters,
            self.OUTPUT,
            context,
            matrix.fields(),
            matrix.wkbType(),
            matrix.sourceCrs()
            )
        
        # Compute the number of steps to display within the progress bar and
        # get features from source
        total = 100.0 / matrix.featureCount() if matrix.featureCount() else 0
        features = matrix.getFeatures()
        
        coordinate_list = []
        for current, f in enumerate(features):
            # Stop the algorithm if cancel button has been clicked
            if feedback.isCanceled():
                break
            line = f.geometry().asPolyline()
            origin_coords = line[0].x(), line[0].y()
            destination_coords = line[1].x(), line[1].y()

            feedback.setProgress(int(current * total))

            params = {
            'INPUT':network,
            'START_POINT':'{},{}'.format(origin_coords[0], origin_coords[1]),
            'END_POINT':'{},{}'.format(destination_coords[0], destination_coords[1]),
            'STRATEGY':0,
            'ENTRY_COST_CALCULATION_METHOD':0,
            'DIRECTION_FIELD':'SUMMARYDIR',
            'VALUE_FORWARD':'OB',
            'VALUE_BACKWARD':'IB',
            'VALUE_BOTH':'',
            'DEFAULT_DIRECTION':2,
            'SPEED_FIELD':None,
            'DEFAULT_SPEED':5,
            'TOLERANCE':0,
            'OUTPUT':'memory:'}
            
            route_layer = processing.run("qneat3:shortestpathpointtopoint", params)['OUTPUT']
            
            if route_layer:
                # We expect only 1 feature in the output, so use next() to get the first item
                route_f = next(route_layer.getFeatures())
                output_geom = route_f.geometry()
                f.setGeometry(output_geom)
                sink.addFeature(f, QgsFeatureSink.FastInsert)
            feedback.setProgressText('Processed feature {}'.format(current))

  
        return {self.OUTPUT: sink} 

    def name(self):
        return 'routes_from_matrix'

    def displayName(self):
        return self.tr('Get Routes from Matrix')
        
    def shortHelpString(self):
        return self.tr('Creates Route Layer from the result of Distance Matrix algorithm')

    def group(self):
        return self.tr(self.groupId())

    def groupId(self):
        return ''

    def tr(self, string):
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return MatrixToRoutes()
