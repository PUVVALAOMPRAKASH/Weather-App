APIKYE = 'c4b469446da64a62a7455412241903';


// API = `https://api.weatherapi.com/v1/current.json?key=c4b469446da64a62a7455412241903&q=London&aqi=yes`

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');


// referencing output fields
const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName')
const localTime= document.getElementById('loc-time');
const temp = document.getElementById('temp')
const sup = document.getElementById('sup')



async function getData(KYE, cityName) {
    try {
        const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=${KYE}&q=${cityName}&aqi=yes`);
        if (!promise.ok) {
            throw new Error('City not found or API error');
        }
        return await promise.json();
    } catch (error) {
        console.error(error);
        alert("Failed to fetch weather data. Please check the city name and try again.");
        return null;  // Return null to indicate an error occurred
    }
}


searchBtn.addEventListener('click', async () => {
    const input = cityInput.value;
    
    // Show loading indicator and hide the output card initially
    document.getElementById('loading').style.display = 'block';  // Show loading
    document.getElementById('outputCard').style.visibility = 'hidden';  // Hide the output card initially

    // Make sure the user input is not empty
    if (!input) {
        alert("Please enter a city name.");
        document.getElementById('loading').style.display = 'none';  // Hide loading if no input
        return;
    }

    // Fetch the data from the API
    const result = await getData(APIKYE, input);

    if (result) {
        // Hide loading indicator after fetching the data
        document.getElementById('loading').style.display = 'none';  // Hide loading
        
        // Show the output card with weather data
        document.getElementById('outputCard').style.visibility = 'visible';
        
        // Populate the weather details
        cityName.innerText = `${result.location.name}, ${result.location.region}`;
        countryName.innerText = `${result.location.country}`;
        temp.innerText = `${result.current.temp_c}`;
        sup.innerText = '°C';
        localTime.innerText = `${result.location.localtime}`;
    }
});



