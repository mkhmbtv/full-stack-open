import React from 'react';
import Weather from './Weather';

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
            </div>
            <h3>languages</h3>
            <div>
                <ul>
                    {country.languages.map(lang =>
                        <li key={lang.name}>{lang.name}</li>
                    )}
                </ul>
            </div>
            <img src={country.flag} alt='flag' width='100' height='100' />
            <Weather capital={country.capital} />
        </div>
    );
};

const Countries = ({ countries, handleClick }) => {
    if (countries.length === 1) {
        return <Country country={countries[0]} />
    } else if (countries.length <= 10) {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name}>
                        {country.name}
                       <button onClick={handleClick(country.name)}>show</button>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <p>Too many matches, specify another filter</p>
        );
    }
};

export default Countries;