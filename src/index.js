import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Geocoder extends Component {
  state = {
    results: [],
    inputValue: '',
    resultStyleClasses: ['react-geonames-results', ' react-geonames-hidden'],
  };

  onChange = (event) => {
    this.setState({ inputValue: event.target.value });
    // Set debounce time between requests
    setTimeout(() => {
      if (this.state.inputValue !== '') {
        // Convert props and parametars to URL
        let apiUrl = 'http://api.geonames.org/';
        if (this.props.https) {
          apiUrl = 'https://secure.geonames.org/';
        }
        let url = `${apiUrl}/search?q=${this.state.inputValue}&username=${this.props.username}`;
        Object.keys(this.props.queryParams).forEach((key) => {
          url = url.concat(`&${key}=${this.props.queryParams[key]}`);
        });
        // Send request
        fetch(url).then((response) => {
          response.json().then((data) => {
            this.setState({ results: data.geonames });
          });
        });
      } else {
        this.setState({ results: [] });
      }
    }, this.props.timeout);
  };

  onSelect = (place) => {
    const placeName = place.toponymName.concat(place.countryName ? `, ${place.countryName}` : null);
    this.setState({ inputValue: placeName });
    this.props.onSelect(place, placeName);
  };

  hideResults = () => {
    setTimeout(() => {
      this.setState({
        resultStyleClasses: ['react-geonames-results', ' react-geonames-hidden'],
      });
    }, 300);
  };

  showResults = () => {
    this.setState({ resultStyleClasses: ['react-geonames-results'] });
  };

  render() {
    const results = this.state.results.map((place, index) => (
      <li key={index} className="react-geonames-item" onClick={() => this.onSelect(place)}>
        {place.toponymName.concat(place.countryName ? `, ${place.countryName}` : null)}
      </li>
    ));
    return (
      <div className="react-geonames">
        <input
          value={this.state.inputValue}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          onFocus={this.showResults}
          onBlur={this.hideResults}
        />
        <ul className={this.state.resultStyleClasses}>{results}</ul>
      </div>
    );
  }
}

Geocoder.propTypes = {
  onSelect: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  https: PropTypes.bool,
  placeholder: PropTypes.string,
  queryParams: PropTypes.object,
};

Geocoder.defaultProps = {
  timeout: 300,
  https: false,
  placeholder: 'Search',
  queryParams: {
    type: 'json',
    maxRows: 10,
  },
};
