import React from 'react';
import { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
  handleSelectCountry: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, handleSelectCountry }) => {
  const { flags, name } = country;
  return (
    <div onClick={() => handleSelectCountry(country)} className="country-card">
      <img src={flags.svg} alt={`${name.common} flag`} className="country-flag" />
      <h3>{name.common}</h3>
    </div>
  );
};

export default CountryCard;