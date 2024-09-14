import { PlaceAutocompleteProps } from '@components/PlaceAutoComplete/types';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Input, InputRef } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  onPlaceSelect,
}) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<InputRef>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current?.input) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(
      new places.Autocomplete(inputRef.current.input, options),
    );
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <Input
        size="large"
        ref={inputRef}
        className="input"
        placeholder="Enter address"
      />
    </div>
  );
};

export default PlaceAutocomplete;
