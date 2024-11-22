document.getElementById("checkWeather").addEventListener("click", function () { 
    const city = document.getElementById("city").value.trim(); // Get city input 
    const apiKey = "38d87315adec466b929145028241611"; // WeatherAPI key 
    
    if (!city) { 
        document.getElementById("weatherOutput").innerHTML = ` 
            <p style="color: red;">Please enter a city name!</p>`; 
        return; // Don't proceed if no city is entered 
    } 
    
    // Construct the correct URL for the API request
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`; 
    
    // Show loading spinner while fetching data 
    document.getElementById("weatherOutput").innerHTML = ` 
        <div class="loading-spinner"></div> 
        <p>Loading weather data...</p>`; 
    
    // Fetch weather data from WeatherAPI 
    fetch(weatherUrl) 
        .then((response) => { 
            if (!response.ok) { 
                // If the response is not OK, throw an error 
                throw new Error("City not found! Please check the city name."); 
            } 
            return response.json(); // Parse JSON response 
        }) 
        .then((data) => { 
            // Remove loading spinner after fetching data 
            document.getElementById("weatherOutput").innerHTML = ''; 
    
            // Display the weather data in the HTML with animation 
            const weatherData = ` 
                <div class="weather-data"> 
                    <h2 class="fade-in">Weather in ${data.location.name}, ${data.location.country}</h2> 
                    <p class="fade-in"><strong>Temperature:</strong> ${data.current.temp_c}°C</p> 
                    <p class="fade-in"><strong>Condition:</strong> ${data.current.condition.text}</p> 
                    <p class="fade-in"><strong>Humidity:</strong> ${data.current.humidity}%</p> 
                    <p class="fade-in"><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p> 
                    <p class="fade-in"><strong>Last Updated:</strong> ${data.current.last_updated}</p> 
                    <img class="fade-in" src="https:${data.current.condition.icon}" alt="Weather icon"> 
                </div> 
            `; 
            document.getElementById("weatherOutput").innerHTML = weatherData; 
        }) 
        .catch((error) => { 
            // Catch and display any errors 
            console.error("Error:", error); 
            document.getElementById("weatherOutput").innerHTML = ` 
                <p style="color: red;" class="fade-in">${error.message}</p>`; 
        }); 
});




