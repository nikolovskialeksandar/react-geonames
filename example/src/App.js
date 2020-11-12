import React, { Component } from 'react';

import Geocoder from 'react-geonames';
import ReactMapGL from 'react-map-gl';
import 'react-geonames/dist/geonames.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-geonames/dist/index.css';

require('dotenv').config();

const queryParams = {
  type: 'json',
  maxRows: 10,
};

class App extends Component {
  state = {
    viewport: {
      width: 700,
      height: 500,
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
    return (
      <div style={{ margin: '50px'}}>
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
