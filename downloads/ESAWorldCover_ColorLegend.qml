<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis minScale="1e+08" maxScale="0" hasScaleBasedVisibilityFlag="0" version="3.18.2-Zürich" styleCategories="AllStyleCategories">
  <flags>
    <Identifiable>1</Identifiable>
    <Removable>1</Removable>
    <Searchable>1</Searchable>
    <Private>0</Private>
  </flags>
  <temporal fetchMode="0" enabled="0" mode="0">
    <fixedRange>
      <start></start>
      <end></end>
    </fixedRange>
  </temporal>
  <customproperties>
    <property value="false" key="WMSBackgroundLayer"/>
    <property value="false" key="WMSPublishDataSourceUrl"/>
    <property value="0" key="embeddedWidgets/count"/>
    <property value="Value" key="identify/format"/>
  </customproperties>
  <pipe>
    <provider>
      <resampling maxOversampling="2" enabled="false" zoomedOutResamplingMethod="nearestNeighbour" zoomedInResamplingMethod="nearestNeighbour"/>
    </provider>
    <rasterrenderer nodataColor="" type="singlebandpseudocolor" opacity="1" alphaBand="-1" classificationMax="100" band="1" classificationMin="10">
      <rasterTransparency/>
      <minMaxOrigin>
        <limits>None</limits>
        <extent>WholeRaster</extent>
        <statAccuracy>Estimated</statAccuracy>
        <cumulativeCutLower>0.02</cumulativeCutLower>
        <cumulativeCutUpper>0.98</cumulativeCutUpper>
        <stdDevFactor>2</stdDevFactor>
      </minMaxOrigin>
      <rastershader>
        <colorrampshader minimumValue="10" labelPrecision="0" clip="0" classificationMode="1" colorRampType="EXACT" maximumValue="100">
          <colorramp type="gradient" name="[source]">
            <Option type="Map">
              <Option type="QString" value="0,100,0,255" name="color1"/>
              <Option type="QString" value="250,230,160,255" name="color2"/>
              <Option type="QString" value="0" name="discrete"/>
              <Option type="QString" value="gradient" name="rampType"/>
              <Option type="QString" value="0.111111;255,187,34,255:0.222222;255,255,76,255:0.333333;240,150,255,255:0.444444;250,0,0,255:0.555556;180,180,180,255:0.666667;240,240,240,255:0.777778;0,100,200,255:0.888889;0,150,160,255:0.944444;0,207,117,255" name="stops"/>
            </Option>
            <prop v="0,100,0,255" k="color1"/>
            <prop v="250,230,160,255" k="color2"/>
            <prop v="0" k="discrete"/>
            <prop v="gradient" k="rampType"/>
            <prop v="0.111111;255,187,34,255:0.222222;255,255,76,255:0.333333;240,150,255,255:0.444444;250,0,0,255:0.555556;180,180,180,255:0.666667;240,240,240,255:0.777778;0,100,200,255:0.888889;0,150,160,255:0.944444;0,207,117,255" k="stops"/>
          </colorramp>
          <item color="#006400" alpha="255" value="10" label="Tree cover"/>
          <item color="#ffbb22" alpha="255" value="20" label="Shrubland"/>
          <item color="#ffff4c" alpha="255" value="30" label="Grassland"/>
          <item color="#f096ff" alpha="255" value="40" label="Cropland"/>
          <item color="#fa0000" alpha="255" value="50" label="Built-up"/>
          <item color="#b4b4b4" alpha="255" value="60" label="Bare / sparse vegetation"/>
          <item color="#f0f0f0" alpha="255" value="70" label="Snow and ice"/>
          <item color="#0064c8" alpha="255" value="80" label="Permanent water bodies"/>
          <item color="#0096a0" alpha="255" value="90" label="Herbaceous wetland"/>
          <item color="#00cf75" alpha="255" value="95" label="Mangroves"/>
          <item color="#fae6a0" alpha="255" value="100" label="Moss and lichen"/>
          <rampLegendSettings orientation="2" direction="0" minimumLabel="" maximumLabel="" useContinuousLegend="1" prefix="" suffix="">
            <numericFormat id="basic">
              <Option type="Map">
                <Option type="QChar" value="" name="decimal_separator"/>
                <Option type="int" value="6" name="decimals"/>
                <Option type="int" value="0" name="rounding_type"/>
                <Option type="bool" value="false" name="show_plus"/>
                <Option type="bool" value="true" name="show_thousand_separator"/>
                <Option type="bool" value="false" name="show_trailing_zeros"/>
                <Option type="QChar" value="" name="thousand_separator"/>
              </Option>
            </numericFormat>
          </rampLegendSettings>
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
    <brightnesscontrast contrast="0" gamma="1" brightness="0"/>
    <huesaturation colorizeBlue="128" saturation="0" colorizeOn="0" colorizeGreen="128" colorizeStrength="100" grayscaleMode="0" colorizeRed="255"/>
    <rasterresampler maxOversampling="2"/>
    <resamplingStage>resamplingFilter</resamplingStage>
  </pipe>
  <blendMode>0</blendMode>
</qgis>
