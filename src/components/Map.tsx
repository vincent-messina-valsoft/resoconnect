import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Venue } from '../types';

interface MapProps {
  venues: Venue[];
  center: { lat: number; lng: number };
  onVenueSelect: (venue: Venue) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map: React.FC<MapProps> = ({ venues, center, onVenueSelect }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCD8gODLFCKkFiY16BS3A4OQ_Ypn8F9Row"
  });

  const onMarkerClick = useCallback((venue: Venue) => {
    setSelectedVenue(venue);
    onVenueSelect(venue);
  }, [onVenueSelect]);

  const onInfoWindowClose = useCallback(() => {
    setSelectedVenue(null);
  }, []);

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const nightlifeMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        styles: nightlifeMapStyle
      }}
    >
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={{ lat: venue.location.lat, lng: venue.location.lng }}
          onClick={() => onMarkerClick(venue)}
          icon={{
            path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
            fillColor: venue.available ? '#ff3e6c' : '#555555',
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: '#ffffff',
            scale: 2,
            anchor: new google.maps.Point(12, 22),
          }}
        />
      ))}

      {selectedVenue && (
        <InfoWindow
          position={{ lat: selectedVenue.location.lat, lng: selectedVenue.location.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="bg-black p-2 rounded shadow-md max-w-xs text-white">
            <h3 className="font-bold text-sm">{selectedVenue.name}</h3>
            <div className="flex items-center text-xs mt-1">
              <span className="text-red-500">★</span>
              <span className="ml-1">{selectedVenue.rating}</span>
              <span className="mx-1">•</span>
              <span>{selectedVenue.priceRange}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{selectedVenue.location.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">Loading map...</div>;
};

export default React.memo(Map);