import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import mapTemplate from './map-template';

export default function App() {
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState('-121.913, 37.361');
  const onButtonPress = () => {
    const [lng, lat] = mapCenter.split(',');
    webRef.injectJavaScript(
      `map.setCenter([ ${parseFloat(lng)} , ${parseFloat(lat)} ])`
    );
  };

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMapCenter}
          value={mapCenter}
        />
        <Button
          title='Set Center'
          onPress={onButtonPress}
        />
      </View>
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapTemplate }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});
