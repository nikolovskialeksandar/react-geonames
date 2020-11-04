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
    setTimeout(() => {
      if (this.state.inputValue !== '') {
        const url = `http://api.geonames.org/search?q=${this.state.inputValue}&type=json&username=${this.props.username}&maxRows=10`;
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
    const results = this.state.results.map((place) => (
      <li className="react-geonames-item" onClick={() => this.onSelect(place)}>
        {place.toponymName.concat(place.countryName ? `, ${place.countryName}` : null)}
      </li>
    ));
    return (
      <div className="react-geonames">
        <input
          value={this.state.inputValue}
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
  timeout: PropTypes.number,
  username: PropTypes.string.isRequired,
};

Geocoder.defaultProps = {
  timeout: 300,
};
