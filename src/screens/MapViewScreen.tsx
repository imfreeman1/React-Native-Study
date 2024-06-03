import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  Circle,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import getDistanceFromLatLonInKm from '../utils/getDistance';

interface MapViewScreenProps {}

const centerLocation = {
  latitude: 37.143047666143815,
  longitude: 127.08961709416334,
};

const moveToFar: LatLng[] = [
  {
    latitude: 37.54567361038856,
    longitude: 126.95262797176838,
  },
  {
    latitude: 37.54597638974369,
    longitude: 126.95269737392664,
  },
  {
    latitude: 37.546320371118505,
    longitude: 126.95297531783581,
  },
  {
    latitude: 37.54670581976856,
    longitude: 126.95318352431057,
  },
  {
    latitude: 37.5470638864874,
    longitude: 126.95339173078538,
  },
];

const MapViewScreen = ({}: MapViewScreenProps) => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: centerLocation.latitude,
    longitude: centerLocation.longitude,
  });
  const [selectedLocation, setSelectedLocation] = useState<LatLng>({
    latitude: 37.54535666666666,
    longitude: 126.952545,
  });
  const [count, setCount] = useState(0);
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);
  const mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        const a = getDistanceFromLatLonInKm(
          {latitude, longitude},
          centerLocation,
        );
        setIsUserLocationError(false);
      },
      () => setIsUserLocationError(true),
      {enableHighAccuracy: true},
    );
  }, []);
  // useEffect(() => {
  //   if (count < moveToFar.length) {
  //     setTimeout(() => {
  //       setSelectedLocation(moveToFar[count]);
  //       setCount(count + 1);
  //     }, 2000);
  //   }
  // }, [selectedLocation, count]);

  // useEffect(() => {
  //   if (selectedLocation) {
  //     const distance = getDistanceFromLatLonInKm(
  //       userLocation,
  //       selectedLocation,
  //     );
  //     if (distance > 200) {
  //       handleModal(distance);
  //     }
  //   }
  // }, [userLocation, selectedLocation]);

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    // await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: '위치 이탈',
      body: '이탈하였습니다.',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const handleModal = (distance?: number) => {
    if (distance && distance > 200) {
      Alert.alert(
        '거리 정보',
        `약 ${Math.round(distance)}m 만큼 이탈하였습니다.`,
      );
    }
    if (!distance) {
      const a = getDistanceFromLatLonInKm(userLocation, centerLocation);
      Alert.alert('거리 정보', `현재 거리는 약 ${Math.round(a)}m 입니다.`);
    }
  };

  const handleUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.06,
    });
  };

  const handleMaker = ({nativeEvent}: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  return (
    <>
      <MapView
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        minZoomLevel={6}
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        zoomControlEnabled
        onLongPress={e => handleMaker(e)}>
        {/* {selectedLocation && (
          <Callout>
            <Marker coordinate={selectedLocation} />
          </Callout>
          <Callout>
            <Marker coordinate={selectedLocation} />
          </Callout>
        )} */}
        <Callout>
          <Marker
            title="다시서기센터"
            coordinate={{
              latitude: 37.545676532431756,
              longitude: 126.97255904312624,
            }}
            pinColor="#00b226"
          />
        </Callout>
        <Callout>
          <Marker
            pinColor="#FFBA0A"
            title="비전트레이닝센터"
            coordinate={{
              latitude: 37.558325459346065,
              longitude: 127.05601164725807,
            }}
          />
        </Callout>
        <Callout>
          <Marker
            title="24시간게스트하우스"
            coordinate={{
              latitude: 37.554080934504434,
              longitude: 127.05772867381606,
            }}
          />
        </Callout>
        <Circle
          center={{
            latitude: 37.545676532431756,
            longitude: 126.97255904312624,
          }}
          radius={4000}
          strokeColor="#00b226"
          fillColor="rgba(0, 178, 38,0.2)"
        />
        <Circle
          center={{
            latitude: 37.558325459346065,
            longitude: 127.05601164725807,
          }}
          radius={4000}
          strokeColor="#FFBA0A"
          fillColor="rgba(255, 186, 10,0.2)"
          zIndex={1}
        />
        <Circle
          center={{
            latitude: 37.554080934504434,
            longitude: 127.05772867381606,
          }}
          radius={4000}
          strokeColor="#ea0000"
          fillColor="rgba(234, 0, 0, 0.2)"
        />
      </MapView>
      {/* <View style={styles.locationButtonList}>
        <Pressable style={styles.locationButton} onPress={handleUserLocation}>
          <Text>위치</Text>
        </Pressable>
        <Pressable
          style={styles.locationButton}
          onPress={onDisplayNotification}>
          <Text>푸쉬</Text>
        </Pressable>
        <Pressable style={styles.locationButton} onPress={() => handleModal()}>
          <Text>Alert</Text>
        </Pressable>
        <Pressable>
          <Text
            style={styles.locationButton}
            onPress={() => {
              setSelectedLocation(userLocation);
              setCount(0);
            }}>
            text
          </Text>
        </Pressable>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationButtonList: {
    position: 'absolute',
    bottom: 70,
    right: 20,
  },
  locationButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 48,
    height: 48,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapViewScreen;
