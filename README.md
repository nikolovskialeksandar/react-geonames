# react-geonames

Geocoder react component that is using [Geonames](http://www.geonames.org/) API. Geonames is geographical </br> database with various free webservices, this component is using webservice for location </br> search. You can use it with Mapbox map service or another map service. [React mapbox library](https://github.com/visgl/react-map-gl)</br>is used in example. See demo [here](https://nikolovskialeksandar.github.io/react-geonames/).

[![NPM](https://img.shields.io/npm/v/react-geonames.svg)](https://www.npmjs.com/package/react-geonames) 
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f)](https://github.com/airbnb/javascript)
## Install
```bash
npm install --save react-geonames
```

## Usage

```jsx
import React, { Component } from 'react';

import Geocoder from 'react-geonames';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// Importing additional styles
import 'react-geonames/dist/geonames.css';

import 'react-geonames/dist/index.css';

const queryParams = {
  type: 'json',
  maxRows: 10,
};

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
    return (
      <div>
        <Geocoder
          username=[YOUR_GEONAMES_USERNAME]
          https
          queryParams={queryParams}
          placeholder="Search"
          onSelect={this.onSelect}
        />
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(nextViewport) => this.setState({ viewport: nextViewport })}
          mapboxApiAccessToken=[YOUR_MAPBOX_TOKEN]
          mapStyle="mapbox://styles/mapbox/streets-v11"
        />
      </div>
    );
  }
}

export default App;
```
## Props

|Property | Type | Description | Default|
|---------|------|---------|-------------|
| onSelect | function (*required*) | Function that sets viewport or marker, receives</br>two arguments: selected location object</br>and formated location name| - |
| username | string (*required*) | Geonames [username](http://www.geonames.org/login) | - |
| timeout | number | Debounce time between requests<br/> while typing | 300 |
| https | boolean | Use HTTPS Geonames endpoint</br>(HTTP is used in their documentation </br>examples)|false |
| placeholder | string | Input field placeholder | Search |
| queryParams | object | Geonames search parametars, <br/>you can see documentation [here](https://www.geonames.org/export/geonames-search.html) | {<br/>&nbsp;&nbsp;type: 'json', <br/>&nbsp;&nbsp;maxRows: 10<br/>} |

## Styling

Component has only basic style related to behavior of results, </br>you can style it yourself using these classes or import styling as shown </br>in example above.
| Element | Class |
|---------|-----------|
|Geocoder container| .react-geonames |
| Input element | .react-geonames-input |
| Results list | .react-geonames-results |
| Single result | .react-geonames-item |
## License

MIT © [nikolovskialeksandar](https://github.com/nikolovskialeksandar)
