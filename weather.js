document.addEventListener('DOMContentLoaded', function () {
    const fetchButton = document.getElementById('fetch-button');
    const cityInput = document.getElementById('city');
    const weatherInfo = document.getElementById('weather-info');

    fetchButton.addEventListener('click', function () {
        const city = cityInput.value;
        const temperature= 31
        const condition= 'rain'
        const humidity=71
        // const temperature= 31

        // Replace with a valid weather API endpoint
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?city=${city}`;
        
        // Fetch weather data from the API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Display weather data on the webpage
                weatherInfo.innerHTML = `
                    <h2>Weather in ${city}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Condition: ${condition}</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
            });
    });
});
