# -*- coding: utf-8 -*-

"""
***************************************************************************
*                                                                         *
*   This program is free software; you can redistribute it and/or modify  *
*   it under the terms of the GNU General Public License as published by  *
*   the Free Software Foundation; either version 2 of the License, or     *
*   (at your option) any later version.                                   *
*                                                                         *
***************************************************************************
"""

from PyQt5.QtCore import QCoreApplication, QVariant
from qgis.core import (QgsProcessing,
                       QgsFeatureSink,
                       QgsFeature,
                       QgsField,
                       QgsFields,
                       QgsProcessingException,
                       QgsProcessingAlgorithm,
                       QgsProcessingParameterFeatureSource,
                       QgsProcessingParameterFeatureSink,
                       QgsProcessingParameterField,
                       )
import processing


class DissolveProcessingAlgorithm(QgsProcessingAlgorithm):
    """
    Dissolve algorithm that dissolves features based on selected
    attribute and summarizes the selected field by cumputing the
    sum of dissolved features.
    """
    INPUT = 'INPUT'
    OUTPUT = 'OUTPUT'
    DISSOLVE_FIELD = 'dissolve_field'
    SUM_FIELD = 'sum_field'

    def tr(self, string):
        """
        Returns a translatable string with the self.tr() function.
        """
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return DissolveProcessingAlgorithm()

    def name(self):
        """
        Returns the algorithm name, used for identifying the algorithm. This
        string should be fixed for the algorithm, and must not be localised.
        The name should be unique within each provider. Names should contain
        lowercase alphanumeric characters only and no spaces or other
        formatting characters.
        """
        return 'dissolve_with_sum'

    def displayName(self):
        """
        Returns the translated algorithm name, which should be used for any
        user-visible display of the algorithm name.
        """
        return self.tr('Dissolve with Sum')

    def group(self):
        """
        Returns the name of the group this algorithm belongs to. This string
        should be localised.
        """
        return self.tr('scripts')

    def groupId(self):
        """
        Returns the unique ID of the group this algorithm belongs to. This
        string should be fixed for the algorithm, and must not be localised.
        The group id should be unique within each provider. Group id should
        contain lowercase alphanumeric characters only and no spaces or other
        formatting characters.
        """
        return 'scripts'

    def shortHelpString(self):
        """
        Returns a localised short helper string for the algorithm. This string
        should provide a basic description about what the algorithm does and the
        parameters and outputs associated with it..
        """
        return self.tr("Dissolves selected features and creates and sums values of features that were dissolved")

    def initAlgorithm(self, config=None):
        """
        Here we define the inputs and output of the algorithm, along
        with some other properties.
        """
        # We add the input vector features source. It can have any kind of
        # geometry.
        self.addParameter(
            QgsProcessingParameterFeatureSource(
                self.INPUT,
                self.tr('Input layer'),
                [QgsProcessing.TypeVectorAnyGeometry]
            )
        )
        self.addParameter(
            QgsProcessingParameterField(
                self.DISSOLVE_FIELD,
                'Choose Dissolve Field',
                '',
                self.INPUT))
        self.addParameter(
            QgsProcessingParameterField(
                self.SUM_FIELD,
                'Choose Sum Field',
                '',
                self.INPUT))
        # We add a feature sink in which to store our processed features (this
        # usually takes the form of a newly created vector layer when the
        # algorithm is run in QGIS).
        self.addParameter(
            QgsProcessingParameterFeatureSink(
                self.OUTPUT,
                self.tr('Output layer')
            )
        )

    def processAlgorithm(self, parameters, context, feedback):
        """
        Here is where the processing itself takes place.
        """
        source = self.parameterAsSource(
            parameters,
            self.INPUT,
            context
        )
        dissolve_field = self.parameterAsString(
            parameters,
            self.DISSOLVE_FIELD,
            context)
        sum_field = self.parameterAsString(
            parameters,
            self.SUM_FIELD,
            context)
        
        fields = QgsFields()
        fields.append(QgsField(dissolve_field, QVariant.String))
        fields.append(QgsField('SUM_' + sum_field, QVariant.Double))
        
        (sink, dest_id) = self.parameterAsSink(
            parameters,
            self.OUTPUT,
            context, fields, source.wkbType(), source.sourceCrs())
        
        # Create a dictionary to hold the unique values from the 
        # dissolve_field and the sum of the values from the sum_field
        feedback.pushInfo('Extracting unique values from dissolve_field and computing sum')
        features = source.getFeatures()
        unique_values = set(f[dissolve_field] for f in features)
        # Get Indices of dissolve field and sum field
        dissolveIdx = source.fields().indexFromName(dissolve_field)
        sumIdx = source.fields().indexFromName(sum_field)
        
        # Find all unique values for the given dissolve_field and
        # sum the corresponding values from the sum_field
        sum_unique_values = {}
        attrs = [{dissolve_field: f[dissolveIdx], sum_field: f[sumIdx]}
                for f in source.getFeatures()]
        for unique_value in unique_values:
            val_list = [ f_attr[sum_field] 
                for f_attr in attrs if f_attr[dissolve_field] == unique_value]
            sum_unique_values[unique_value] = sum(val_list)
        
        # Running the processing dissolve algorithm
        feedback.pushInfo('Dissolving features')
        dissolved_layer = processing.run("native:dissolve", {
            'INPUT': parameters[self.INPUT],
            'FIELD': dissolve_field,
            'OUTPUT': 'memory:'
        }, context=context, feedback=feedback)['OUTPUT']
        
        # Read the dissolved layer and create output features
        for f in dissolved_layer.getFeatures():
            new_feature =  QgsFeature()
            # Set geometry to dissolved geometry
            new_feature.setGeometry(f.geometry())
            # Set attributes from sum_unique_values dictionary that we had computed
            new_feature.setAttributes([f[dissolve_field], sum_unique_values[f[dissolve_field]]])
            sink.addFeature(new_feature, QgsFeatureSink.FastInsert)
        
        return {self.OUTPUT: dest_id}
