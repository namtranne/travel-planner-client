import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';
import MapView, { Marker } from 'react-native-maps';

import DaySelectorSheet from '@/src/components/TripMapScreen/DaySelectorSheet';
import { useTripDetails } from '@/src/hooks/use-trip';

export default function TripMap() {
    const mapRef = useRef<MapView>(null);
    const { tripId } = useLocalSearchParams<{ tripId: string }>();
    const { isLoading: isLoadingTripDetails, trip } = useTripDetails(Number(tripId));
    const [selectedDay, setSelectedDay] = useState(trip.tripItinerary.days[0]);

    const centerMapOnPlace = (place: any) => {
        mapRef.current?.animateToRegion({
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        });
    };

    const handleOptimize = () => {
        // call backend or local route optimization here
    };

    console.log(selectedDay);
    // return null;
    return (
        <View style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-5 top-14 z-10 rounded-full bg-black/60 p-2"
                >
                    <Iconify icon="mdi:arrow-left" size={24} color="white" />
                </TouchableOpacity>

                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: selectedDay.placeToVisits[0]?.place.latitude,
                        longitude: selectedDay.placeToVisits[0]?.place.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                >
                    {selectedDay.placeToVisits.map((place, index) => (
                        <Marker
                            key={place.id}
                            coordinate={{ latitude: place.place.latitude, longitude: place.place.longitude }}
                            title={`${index + 1}. ${place.place.placeName}`}
                        >
                            <View style={{ alignItems: 'center' }}>
                                {/* Pin Icon */}
                                <View style={{ position: 'relative' }}>
                                    <Iconify icon="mdi:map-marker" size={40} color="#60ABEF" />

                                    {/* Number in center */}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 8,
                                            left: 10,
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            backgroundColor: '#60ABEF',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Marker>
                    ))}
                </MapView>

                <DaySelectorSheet
                    days={trip.tripItinerary.days}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                    onPlacePress={centerMapOnPlace}
                    onOptimize={handleOptimize}
                />
            </GestureHandlerRootView>
        </View>
    );
}
