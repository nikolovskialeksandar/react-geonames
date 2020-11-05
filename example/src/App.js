import React, { Component } from 'react';

import Geocoder from 'react-geonames';
import 'react-geonames/dist/index.css';

require('dotenv').config();

class App extends Component {
  render() {
    const queryParams = {
      type: 'json',
      maxRows: 10,
    };
    return (
      <Geocoder
        username={process.env.REACT_APP_GEONAMES_USERNAME}
        https={true}
        queryParams={queryParams}
        placeholder="Search"
      />
    );
  }
}

export default App;
