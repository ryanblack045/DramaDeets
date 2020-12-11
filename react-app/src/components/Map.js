// /* global google */
import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps';
import {  useSelector } from 'react-redux';
//  use withScriptjs and withGoogleMap to wrap the map in order to get the map to load correctly

const InitMap = () => {
  const currentBusinessLat = useSelector((state) => (state.session.currentBusiness.lat))
  const currentBusinessLng = useSelector((state) => (state.session.currentBusiness.lng))
  const currentBusiness = useSelector((state) => (state.session.currentBusiness))

  // const reduxStartTime = useSelector(state => state.directionsRedux.startTime);
  const [currentLat, setCurrentLat] = useState(currentBusinessLat);
  const [currentLng, setCurrentLng] = useState(currentBusinessLng);



  useEffect(() => {
     setCurrentLat(currentBusinessLat)
    setCurrentLng(currentBusinessLng)
    console.log(currentLat)
    console.log(currentLng)
    console.log(Number((currentLat)))
    // currentBusinessLng
    // currentBusinessLat

  }, [currentBusiness]);

  return (
    <>
      <GoogleMap
        defaultZoom={15}
        center={{ lat: Number(currentLat) , lng: Number(currentLng) }}>
      </GoogleMap>
        <Marker
      position={{ lat: Number(currentLat), lng: Number(currentLng) }}
        />
    </>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(InitMap));

//make sure to create .env.local file with REACT_APP_GOOGLE_KEY ="apikey"
export default function Map() {
  return (
    <div>
      <WrappedMap
        id='map'
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100% ' }} />}
        containerElement={
          <div style={{
            marginLeft: "4em",
            marginBottom: "1em",
            marginTop: "1em",
            width: `60vw`,
            height: '40vh',
            maxHeight: 'auto'
          }} />
        }
        mapElement={<div style={{ height: '100% ' }} />}
      />
    </div>
  );
}
