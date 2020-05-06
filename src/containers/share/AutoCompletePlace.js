import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from 'antd';

class AutoCompletePlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      map: {},
    };
  }

  handleChange = (address) => {
    const { handleAddressChange } = this.props;
    if (handleAddressChange) {
      handleAddressChange(address);
    }
    this.setState({ address });
  };

  handleSelect = (address) => {
    const { handleAddressChange, handleMapChange } = this.props;
    this.setState({
      address,
    });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        if (handleMapChange) handleMapChange(latLng);
      })
      .catch((error) => console.error('Error', error));

    if (handleAddressChange) {
      handleAddressChange(address);
    }
  };

  render() {
    const { address } = this.state;
    return (
      <PlacesAutocomplete
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default AutoCompletePlace;
