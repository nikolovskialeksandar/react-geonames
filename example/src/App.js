import React, { Component } from 'react';

import Geocoder from 'react-geonames';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// Importing additional styles
import 'react-geonames/dist/geonames.css';

require('dotenv').config();

const queryParams = {
  type: 'json',
  maxRows: 10,
};

class App extends Component {
  state = {
    viewport: {
      width: 600,
      height: 500,
    },
    place: {},
  };

  onSelect = (place, placename) => {
    this.setState((prevState) => ({
      viewport: {
        ...prevState.viewport,
        latitude: +place.lat,
        longitude: +place.lng,
        zoom: 10,
      },
      place: {
        latitude: +place.lat,
        longitude: +place.lng,
        placename: placename,
      },
    }));
  };

  onClear = () => {
    this.setState({ place: {} });
  };

  render() {
    return (
      <div style={{ margin: '50px', width: '80%' }}>
        <Geocoder
          username={process.env.REACT_APP_GEONAMES_USERNAME}
          https
          queryParams={queryParams}
          placeholder="Search"
          onSelect={this.onSelect}
          onClear={this.onClear}
        />
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(nextViewport) => this.setState({ viewport: nextViewport })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        />
      </div>
    );
  }
}

export default App;
