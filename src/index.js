import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Geocoder extends Component {
  state = {
    results: [],
    inputValue: '',
  }

  onChange = (event) => {
    this.setState({ inputValue: event.target.value });
    setTimeout(() => {
      if (this.state.inputValue !== '') {
        const url = `http://api.geonames.org/search?q=${this.state.inputValue}&type=json&username=${this.props.username}&maxRows=10`;
        fetch(url)
          .then((response) => {
            response.json().then((data) => {
              this.setState({ results: data.geonames });
            });
          });
      } else {
        this.setState({ results: [] });
      }
    }, this.props.timeout);
  }

  onSelect = (place) => {
    const placeName = place.toponymName.concat(
      place.countryName ? `, ${place.countryName}` : null,
    );
    this.setState({ inputValue: placeName });
  }

  render() {
    const results = this.state.results.map((place) => (
      <li
        onClick={() => this.onSelect(place)}
      >
        {place.toponymName.concat(place.countryName ? `, ${place.countryName}` : null)}
      </li>
    ));
    return (
      <div>
        <input
          value={this.state.inputValue}
          onChange={this.onChange}
        />
        <ul>
          {results}
        </ul>
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
