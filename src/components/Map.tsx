import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Venue } from '../types';
import { pointsOfInterest, PointOfInterest } from '../data/pointsOfInterest';

interface MapProps {
  venues: Venue[];
  center: { lat: number; lng: number };
  onVenueSelect: (venue: Venue) => void;
  showPOIs?: boolean;
  onTableReservation?: (venue: Venue) => void;
  onGuestList?: (venue: Venue) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map: React.FC<MapProps> = ({ 
  venues, 
  center, 
  onVenueSelect, 
  showPOIs = true,
  onTableReservation,
  onGuestList
}) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCD8gODLFCKkFiY16BS3A4OQ_Ypn8F9Row"
  });

  const onMarkerClick = useCallback((venue: Venue) => {
    setSelectedVenue(venue);
    setSelectedPOI(null);
  }, []);

  const onPOIMarkerClick = useCallback((poi: PointOfInterest) => {
    setSelectedPOI(poi);
    setSelectedVenue(null);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedVenue(null);
    setSelectedPOI(null);
  }, []);

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Get POI icon based on type
  const getPOIIcon = (type: PointOfInterest['type']) => {
    let path = "";
    
    switch (type) {
      case 'landmark':
        // Building icon
        path = "M15,19L9,19L9,12.5C9,10.5 10.5,9 12.5,9C14.5,9 16,10.5 16,12.5L16,19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,5L12,2L5,5V11H7V18H17V11H19V5Z";
        break;
      case 'park':
        // Tree icon
        path = "M12,3.77L11.25,4.61C11.25,4.61 9.97,6.06 8.68,7.94C7.39,9.82 6,12.07 6,14.23A6,6 0 0,0 12,20.23A6,6 0 0,0 18,14.23C18,12.07 16.61,9.82 15.32,7.94C14.03,6.06 12.75,4.61 12.75,4.61L12,3.77M12,6.9C12.44,7.42 12.84,7.85 13.68,9.07C14.89,10.83 16,13.07 16,14.23C16,16.45 14.22,18.23 12,18.23C9.78,18.23 8,16.45 8,14.23C8,13.07 9.11,10.83 10.32,9.07C11.16,7.85 11.56,7.42 12,6.9Z";
        break;
      case 'shopping':
        // Shopping icon
        path = "M19 6H17C17 3.2 14.8 1 12 1S7 3.2 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6M12 3C13.7 3 15 4.3 15 6H9C9 4.3 10.3 3 12 3M19 20H5V8H19V20M12 12C10.3 12 9 10.7 9 9H7C7 11.8 9.2 14 12 14S17 11.8 17 9H15C15 10.7 13.7 12 12 12Z";
        break;
      default:
        // Default location pin
        path = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
    }
    
    return {
      path,
      fillColor: '#ffffff',
      fillOpacity: 0.9,
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 1.5,
      anchor: new google.maps.Point(12, 22),
    };
  };

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
      {/* Render venues */}
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={{ lat: venue.location.lat, lng: venue.location.lng }}
          onClick={() => onMarkerClick(venue)}
          icon={{
            path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
            fillColor: '#ffffff',
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: '#ffffff',
            scale: 2,
            anchor: new google.maps.Point(12, 22),
          }}
        />
      ))}

      {/* Render points of interest */}
      {showPOIs && pointsOfInterest.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.location.lat, lng: poi.location.lng }}
          onClick={() => onPOIMarkerClick(poi)}
          icon={getPOIIcon(poi.type)}
        />
      ))}

      {/* Venue info window */}
      {selectedVenue && (
        <InfoWindow
          position={{ lat: selectedVenue.location.lat, lng: selectedVenue.location.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="bg-black p-3 rounded shadow-md max-w-xs text-white">
            <h3 className="font-bold text-lg">{selectedVenue.name}</h3>
            <div className="flex items-center text-xs mt-1">
              <span className="text-red-500">★</span>
              <span className="ml-1">{selectedVenue.rating}</span>
              <span className="mx-1">•</span>
              <span>{selectedVenue.priceRange}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{selectedVenue.location.address}</p>
            
            {/* Single action button */}
            <div className="mt-4">
              <button 
                onClick={() => {
                  onVenueSelect(selectedVenue);
                  onInfoWindowClose();
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded text-base font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        </InfoWindow>
      )}

      {/* POI info window */}
      {selectedPOI && (
        <InfoWindow
          position={{ lat: selectedPOI.location.lat, lng: selectedPOI.location.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="bg-black p-2 rounded shadow-md max-w-xs text-white">
            <h3 className="font-bold text-sm">{selectedPOI.name}</h3>
            <div className="flex items-center text-xs mt-1">
              <span className="capitalize">{selectedPOI.type}</span>
            </div>
            {selectedPOI.description && (
              <p className="text-xs text-gray-400 mt-1">{selectedPOI.description}</p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">Loading map...</div>;
};

export default React.memo(Map);