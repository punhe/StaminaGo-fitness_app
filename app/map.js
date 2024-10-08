import React, { useEffect, useRef } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { markers } from "../assets/markers"; // Giả sử markers nằm trong 'assets/markers'

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

export default function MapPage() {
  const mapRef = useRef(null);
  const navigation = useNavigation();

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
    const GreenBayStadium = {
      latitude: 44.5013,
      longitude: -88.0622,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    mapRef.current?.animateToRegion(GreenBayStadium);
  };

  const onMarkerSelected = (marker) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev) => {
    console.log(ev);
  };

  const onRegionChange = (region) => {
    console.log(region);
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
        onRegionChangeComplete={onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout onPress={calloutPressed}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>Hello</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
