async function getWeather() {
    const temperatureElement = document.getElementById("temperature");
    try{
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=7.38&longitude=3.93&current_weather=true&temperature_unit=celsius');
    const data = await response.json();
    console.log(data);

    const temperature = data.current_weather.temperature;
    temperatureElement.textContent = ` Current temperature: ${temperature}°C`;
    } 
    catch (error) {
        temperatureElement.textContent = "Failed to load weather data.";
        console.error("Error fetching weather data:", error);
    }

}
getWeather();
