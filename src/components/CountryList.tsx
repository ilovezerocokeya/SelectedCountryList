import React from "react";
import { Country } from "../types/country";
import { getCountries } from "../api/countries";
import CountryCard from "./CountryCard";
import './CountryList.css'; // CSS 파일 임포트

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

  const handleSelectCountry = (selectedCountry: Country): void => {
    if (selectedCountries.find(c => c.name.common === selectedCountry.name.common)) {
      setSelectedCountries(prevSelected =>
        prevSelected.filter(c => c.name.common !== selectedCountry.name.common)
      );
      setCountries(prevCountries => [...prevCountries, selectedCountry]);
    } else {
      setSelectedCountries(prevSelected => [...prevSelected, selectedCountry]);
      setCountries(prevCountries =>
        prevCountries.filter(c => c.name.common !== selectedCountry.name.common)
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
      <div className="separator"></div>
      <div className="selected-country-list">
        <h1>선택된 목록</h1>
        <div>{renderCountryCards(selectedCountries)}</div>
      </div>
    </div>
  );
};

export default CountryList;