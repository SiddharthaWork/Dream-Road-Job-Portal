'use client'
import { useState, useCallback } from 'react';

interface LocationSuggestion {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}

const GEOAPIFY_API_KEY = 'ab6b20f89ecc45c5a24f4b1d0cd05522'; // <-- Replace with your real key

export const useLocationAutocomplete = () => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&limit=5&apiKey=ab6b20f89ecc45c5a24f4b1d0cd05522`
      );
      const data = await response.json();
      const mapped = (data.features || []).map((feature: any) => ({
        display_name: feature.properties.formatted,
        place_id: feature.properties.place_id || feature.properties.datasource.raw.place_id || feature.properties.formatted,
        lat: feature.geometry.coordinates[1].toString(),
        lon: feature.geometry.coordinates[0].toString(),
      }));
      setSuggestions(mapped);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSuggestions = () => setSuggestions([]);

  return {
    suggestions,
    isLoading,
    searchLocations,
    clearSuggestions,
  };
};
