import React, { Component } from 'react';

import Geocoder from 'react-geonames';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-geonames/dist/index.css';

require('dotenv').config();

class App extends Component {
  state = {
    viewport: {
      width: 700,
      height: 500,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 10,
    },
    placename: '',
  };

  onSelect = (place, placename) => {
    this.setState((prevState) => ({
      viewport: {
        ...prevState.viewport,
        latitude: +place.lat,
        longitude: +place.lng,
        zoom: 10,
      },
      placename: placename,
    }));
  };

  render() {
    const queryParams = {
      type: 'json',
      maxRows: 10,
      inclBbox: true,
    };
    return (
      <div>
        <Geocoder
          username={process.env.REACT_APP_GEONAMES_USERNAME}
          https
          queryParams={queryParams}
          placeholder="Search"
          onSelect={this.onSelect}
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
