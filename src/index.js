import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Geocoder extends Component {
  state = {
    results: [],
    inputValue: '',
    selectedResult: '',
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
        this.onClear();
      }
    }, this.props.timeout);
  };

  onSelect = (place) => {
    const placeName = place.toponymName.concat(place.countryName ? `, ${place.countryName}` : '');
    this.setState((prevState) => ({
      ...prevState,
      inputValue: placeName,
      selectedResult: placeName,
    }));
    this.props.onSelect(place, placeName);
  };

  onClear = () => {
    this.setState((prevState) => ({
      ...prevState,
      inputValue: '',
      selectedResult: '',
    }));
    this.props.onClear();
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
        <span>{place.toponymName}</span>
        <span style={{ color: 'gray' }}>{place.countryName ? ` ${place.countryName}` : ''}</span>
      </li>
    ));
    return (
      <div className="react-geonames">
        <div className="react-geonames-input-area">
          <input
            className="react-geonames-input"
            value={this.state.inputValue}
            type="text"
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            onFocus={this.showResults}
            onBlur={this.hideResults}
          />
          {this.state.selectedResult ? (
            <button className="react-geonames-clear-button" onClick={this.onClear} type="button">
              &#10005;
            </button>
          ) : null}
        </div>
        <ul className={this.state.resultStyleClasses}>{results}</ul>
      </div>
    );
  }
}

Geocoder.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  username: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  https: PropTypes.bool,
  placeholder: PropTypes.string,
  queryParams: PropTypes.object,
};

Geocoder.defaultProps = {
  onClear: () => {},
  timeout: 300,
  https: false,
  placeholder: 'Search',
  queryParams: {
    type: 'json',
    maxRows: 10,
  },
};
