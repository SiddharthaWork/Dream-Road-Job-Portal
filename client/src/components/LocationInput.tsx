'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { useLocationAutocomplete } from '@/hooks/uselocationAutocomplete';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  maxLength?: number;
  minLength?: number;
}

const LocationInput = ({ value, onChange, placeholder, id, maxLength, minLength }: LocationInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const { suggestions, isLoading, searchLocations, clearSuggestions } = useLocationAutocomplete();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query !== value) {
        searchLocations(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchLocations, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const selectedLocation = suggestion.display_name;
    setQuery(selectedLocation);
    onChange(selectedLocation);
    setIsOpen(false);
    clearSuggestions();
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="pl-10"
          maxLength={maxLength}
          minLength={minLength}
          required
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.place_id}
              variant="ghost"
              className="w-full justify-start text-left h-auto p-3 whitespace-normal"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
              <span className="text-sm">{suggestion.display_name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
