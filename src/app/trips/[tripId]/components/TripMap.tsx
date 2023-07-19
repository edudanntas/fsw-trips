'use client'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { useMemo } from 'react';


const TripMap = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! })

    const center = useMemo(() => ({ lat: 40.633354, lng: 14.602745 }), []);

    if (!isLoaded) return <div>Loading...</div>

    const customIcon = {
        url: '/map-marker.svg',
        scaledSize: new window.google.maps.Size(50, 50),
    }

    const customMapStyles = {
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#878787"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f9f5ed"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#aee0f4"
                    }
                ]
            }
        ]
    }

    const mapContainerStyle = {
        width: '100%',
        height: '100%', // Ajuste a altura do mapa conforme necessário
    };

    return <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center} options={customMapStyles}>
        <Marker position={center} icon={customIcon} />
    </GoogleMap >;
}

export default TripMap;