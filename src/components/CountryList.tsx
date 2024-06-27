import React from "react";
import { Country } from "../types/country";
import { getCountries } from "../api/countries";
import CountryCard from "./CountryCard";
import './CountryList.css';

const CountryList: React.FC = () => {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = React.useState<Country[]>([]);

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data: Country[] = await getCountries();
        setCountries(data);
      } catch (err) {
        alert(err);
      }
    };
    fetchCountries();
  }, []);

  const handleSelectCountry = (country: Country): void => {
    if (selectedCountries.find(country => country.name.common === country.name.common)) {
      setSelectedCountries(prevSelected =>
        prevSelected.filter(country => country.name.common !== country.name.common)
      );
      setCountries(prevCountries => [...prevCountries, country]);
    } else {
      setSelectedCountries(prevSelected => [...prevSelected, country]);
      setCountries(prevCountries =>
        prevCountries.filter(country => country.name.common !== country.name.common)
      );
    }
  };

  const renderCountryCards = (countryList: Country[]) => (
    countryList
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .map(country => (
        <CountryCard
          key={country.name.common}
          country={country}
          handleSelectCountry={handleSelectCountry}
        />
      ))
  );

  return (
    <div className="country-list-container">
      <div className="country-list">
        <h1>나라 목록</h1>
        <div>{renderCountryCards(countries)}</div>
      </div>
      <div className="selected-country-list">
        <h1>선택된 목록</h1>
        <div>{renderCountryCards(selectedCountries)}</div>
      </div>
    </div>
  );
};

export default CountryList;