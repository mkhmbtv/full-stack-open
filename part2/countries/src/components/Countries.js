import React from 'react';

const Countries = ({ countries }) => {
    if (countries.length === 1) {
        const country = countries[0];
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
            </div>
        );
    } else if (countries.length <= 10) {
        return (
            <div>
                {countries.map(country =>
                    <p key={country.name}>{country.name}</p>
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