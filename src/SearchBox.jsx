import { useState, useEffect, useRef } from 'react';

function SearchBox({ onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const sessionTokenRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSuggestions = async () => {
      if (!inputValue) {
        setSuggestions([]);
        return;
      }
      const { AutocompleteSuggestion, AutocompleteSessionToken } =
        await google.maps.importLibrary('places');

      if (!sessionTokenRef.current) {
        sessionTokenRef.current = new AutocompleteSessionToken();
      }

      const { suggestions: results } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: inputValue,
          sessionToken: sessionTokenRef.current,
        });

      if (!cancelled) {
        setSuggestions(results);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inputValue]);

  const handleSelect = async (suggestion) => {
    const place = suggestion.placePrediction.toPlace();
    await place.fetchFields({ fields: ['location', 'formattedAddress'] });

    setInputValue(suggestion.placePrediction.text.toString());
    setSuggestions([]);
    sessionTokenRef.current = null;

    onSelect({
      lat: place.location.lat(),
      lng: place.location.lng(),
      address: place.formattedAddress,
    });
  };

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="場所を検索"
        style={{ width: 250, padding: 8 }}
      />
      {suggestions.length > 0 && (
        <ul style={{ background: 'white', margin: 0, padding: 0, listStyle: 'none', width: 250 }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.placePrediction.placeId}
              onClick={() => handleSelect(suggestion)}
              style={{ padding: 8, cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {suggestion.placePrediction.text.toString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
