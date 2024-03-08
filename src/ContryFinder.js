import React, { useState } from 'react';

const ContryFinder = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchClick, setSearchClick] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/currency/${currencyCode.toUpperCase()}`);
            const data = await response.json();
            setSearchResults(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResults([]);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchClick(true);
        if (currencyCode !== '') {
            await fetchData();
        }
    };

    return (
        <>
            <section className='container'>


                <div className='box-container'>
                    <h1>Country Search</h1>
                    <form className='form'>
                        <input
                            type="text"
                            value={currencyCode}
                            onChange={e => setCurrencyCode(e.target.value)}
                            placeholder="Enter currency codes like: INR, USD etc."
                        />
                        <button onClick={handleSearch}>Search</button>
                    </form>


                </div>
            </section>
            <section className='container'>

                {
                    searchClick === true ? (
                        <div id="">
                            {searchResults.length === 0 ? (
                                <p>No countries found for the provided currency code.</p>
                            ) : (
                                <div id='search-results'>
                                    {searchResults.map(country => (
                                        <div key={country.cca2} className='grid'>
                                            <div className='img-container'>
                                                <img
                                                    src={`https://flagsapi.com/${country.cca2.toUpperCase()}/shiny/64.png`}
                                                    alt={country.cca2 ? (country.cca2) : ('Flag Not Available')}
                                                />
                                            </div>
                                            <div className='country-name-container'>
                                                <p>Country Name:  <i>{country.name.common}</i></p>
                                                <p>Capital Name:  <i>{country.capital}</i></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div id="search-predefined-msg">
                            <p>Enter Currency...</p>
                        </div>
                    )
                }
            </section>

        </>
    );
}

export default ContryFinder;
