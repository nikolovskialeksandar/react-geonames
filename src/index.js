import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Geocoder extends Component {
  state = {
    results: [],
    inputValue: '',
    selectedResult: '',
    showResults: false,
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
      results: [],
      inputValue: '',
      selectedResult: '',
    }));
    this.props.onClear();
  };


  hideResults = () => {
    setTimeout(() => {
      this.setState({ showResults: false });
    }, 300);
  };

  showResults = () => {
    this.setState({ showResults: true });
  };

  render() {
    const results = this.state.results.map((place, index) => (
      <li key={index} className="react-geonames-item" onClick={() => this.onSelect(place)}>
        {this.props.formatResult(place)}
      </li>
    ));
    return (
      <div className="react-geonames">
        {this.props.label ? <label htmlFor="search">{this.props.label}</label> : null}
        <div className="react-geonames-input-area">
          <input
            className="react-geonames-input"
            name="search"
            value={this.state.inputValue}
            type="text"
            autoComplete="off"
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
        <ul
          className="react-geonames-results"
          style={this.state.showResults ? null : { display: 'none' }}
        >
          {results}
        </ul>
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
  label: PropTypes.string,
  queryParams: PropTypes.object,
  formatResult: PropTypes.func,
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
  formatResult: (place) => (
    <div>
      <span>{place.toponymName}</span>
      <div style={{ color: 'gray' }}>
        {place.adminName1 ? ` ${place.adminName1}, ` : ''}
        {place.countryName ? ` ${place.countryName}` : ''}
      </div>
    </div>
  ),
};
