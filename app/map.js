import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { markers } from "../components/markers";

const INITIAL_REGION = {
  latitude: 13.804023,
  longitude: 109.219143,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

export default function MapPage() {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [currentRegion, setCurrentRegion] = useState(INITIAL_REGION);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const focusMap = () => {
    const newRegion = {
      latitude: 13.804023,
      longitude: 109.219143,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };

    mapRef.current?.animateToRegion(newRegion);
  };

  const onMarkerSelected = (marker) => {
    Alert.alert(marker.name);
  };

  const handleZoomIn = () => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta / 2,
      longitudeDelta: currentRegion.longitudeDelta / 2,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);
    setCurrentRegion(newRegion);
  };

  const handleZoomOut = () => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta * 2,
      longitudeDelta: currentRegion.longitudeDelta * 2,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);
    setCurrentRegion(newRegion);
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // If we can't go back, try to navigate to the initial route
      navigation.navigate('index');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
      >
        <Marker
          coordinate={{ latitude: 13.804023, longitude: 109.219143 }}
          title="FPT University Quy Nhon"
          pinColor="red"
          onPress={() => Alert.alert("FPT University Quy Nhon")}
        >
          <Callout>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 16 }}>FPT University Quy Nhon</Text>
            </View>
          </Callout>
        </Marker>

        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>Hello</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Trở về</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  zoomControls: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  zoomButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  zoomText: {
    color: 'white',
    fontSize: 24,
  },
  backButton: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});