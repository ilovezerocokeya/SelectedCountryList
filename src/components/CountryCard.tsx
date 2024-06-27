import React from 'react'
import { Country } from '../types/country';

interface CountryCardProps {
    country: Country;
    handleSelectCountry: (country : Country) => void;
}

const CountryCard : React.FC<CountryCardProps> = ({ country, handleSelectCountry }) => {
  return (
    <div onClick={() => handleSelectCountry(country)}>
      <img src={country.flags.svg} style={{width: "100px", height: "100px"}}/>
      <h3>{country.name.common}</h3>
    </div>
  )
}

export default  CountryCard;