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
      <div>
        <Geocoder
          username=[YOUR_GEONAMES_USERNAME]
          https
          queryParams={queryParams}
          placeholder="Search"
          onSelect={this.onSelect}
          onClear={this.onClear}
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
| onClear|function| Function triggered when clear button is clicked or input field is cleared|-|
| timeout | number | Debounce time between requests<br/> while typing | 300 |
| https | boolean | Use HTTPS Geonames endpoint</br>(HTTP is used in their documentation </br>examples)|false |
| placeholder | string | Input field placeholder | 'Search' |
| label | string | Input field label | - |
| queryParams | object | Geonames search parametars, <br/>you can see documentation [here](https://www.geonames.org/export/geonames-search.html) | {<br/>&nbsp;&nbsp;type: 'json', <br/>&nbsp;&nbsp;maxRows:&nbsp;10<br/>} |
| formatResult | function | Function for formating single result | [See below](#formating-results) |
| formatSelectedResult | function | Function for formating selected result shown in input field | [See below](#formating-results) |


## Styling

Component has no style out of box, </br>you can style it yourself using classes from the list or import styling
```jsx
import 'react-geonames/dist/geonames.css';
```
 as shown in example [above](#usage).

 #### Class list
| Element | Class |
|---------|-----------|
| Geocoder container| .react-geonames |
| Input area| .react-geonames-input-area|
| Input element | .react-geonames-input |
| Clear button| .react-geonames-clear-button |
| Results list | .react-geonames-results |
| Single result | .react-geonames-item |

#### Element hierarchy 

```bash
Geocoder container
  └── Input area
  │    ├── Input element
  │    └── Clear button
  └── Results list
       └── Single result

```
## Formating results

#### Formating single result
Single result can be customized by passing function to **formatResult** prop. For additional administrative regions add ```style: 'full'``` to **queryParams** prop.

Default:
```jsx
  formatResult = (place) => (
    <div>
      <span>{place.toponymName}</span>
      <div style={{ color: 'gray' }}>
        {place.adminName1 ? ` ${place.adminName1}, ` : ''}
        {place.countryName ? ` ${place.countryName}` : ''}
      </div>
    </div>
  );
```
#### Formating selected result
By passing function to **formatSelectedResult** you can customize selected result displayed in input field, which is also returned as argument to **onSelect** prop.

Default:
```jsx
  formatSelectedResult = (place) => (
    place.toponymName
      .concat(place.adminName1 ? `, ${place.adminName1}` : '')
      .concat(place.countryName ? `, ${place.countryName}` : '')
  );
```

## License

MIT © [nikolovskialeksandar](https://github.com/nikolovskialeksandar)
