import React, { Component } from 'react';

import Geocoder from 'react-geonames';
import 'react-geonames/dist/index.css';

require('dotenv').config();

class App extends Component {
  render() {
    console.log(process.env.REACT_APP_GEONAMES_USERNAME)
    return (
      <Geocoder
        username={process.env.REACT_APP_GEONAMES_USERNAME}
      />
    );
  }
}

export default App
