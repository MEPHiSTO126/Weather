async function getweather() {
    const temperatureElement = document.getElementById("temperature");
    const weatherIconElement = document.getElementById("weather-icon");
    const weatherDescriptionElement = document.getElementById("weather-description");
    const timeElement = document.getElementById("time");
    const latElement = document.getElementById("latitude");
    const longElement = document.getElementById("longitude");
    const elevationElement = document.getElementById("elevation");
    const directionElement = document.getElementById("direction");
    const windSpeedElement = document.getElementById("wind-speed");
    const genElement = document.getElementById("generation-time");
    const timezoneElement = document.getElementById("timezone");
    const unitsElement = document.getElementById("units");

    try{
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=7.38&longitude=3.93&current_weather=true&temperature_unit=celsius');
    const data = await response.json();
    console.log(data);

    const current = data.current_weather;
    const units = data.current_weather_units;
    
    temperatureElement.textContent = `${current.temperature}°C`;

    weatherDescriptionElement.textContent = getWeatherIcon(current.weathercode); 

    const weatherType = getWeatherIcon(current.weathercode);
    weatherDescriptionElement.textContent = weatherType;

    timeElement.textContent = `Updated at: ${current.time},${data.timezone}`;

    latElement.textContent = `Lat: ${data.latitude}°N`;

    longElement.textContent = `Long: ${data.longitude}°E`;

    elevationElement.textContent = `Elevation: ${data.elevation}m`;
    directionElement.textContent = `${current.winddirection}°`;
    windSpeedElement.textContent = `${current.windspeed} km/h`;

    genElement.textContent = `Generation Time: ${data.generationtime_ms.toFixed(2)} ms`;
    timezoneElement.textContent = `Timezone: ${data.timezone} (UTC + ${data.utc_offset_seconds / 3600})`;
    unitsElement.textContent = `Units: ${units.temperature}, ${units.windspeed}`;

    let iconFile = "cloudy.png"; 

        if (weatherType === "Clear") {
            iconFile = current.is_day === 1 ? "clear-day.png" : "clear-night.png";
        } else if (weatherType === "Cloudy") {
            iconFile = current.is_day === 1 ? "cloudy-day.png" : "cloudy-night.png";
        } else if (weatherType === "Fog") {
            iconFile = "fog.png";
        } else if (weatherType === "Drizzle") {
            iconFile = "drizzle.png";
        } else if (weatherType === "Rain") {
            iconFile = "rain.png";
        } else if (weatherType === "Snow") {
            iconFile = "snow.png";
        } else if (weatherType === "Thunder") {
            iconFile = "thunder.png";
        }

        weatherIconElement.src = `images/${iconFile}`; 
        weatherIconElement.alt = weatherType;
    } 

    catch (error) {
        temperatureElement.textContent = "Failed to load weather data.";
        console.error("Error fetching weather data:", error);
    }

}
getweather();

function getWeatherIcon(code) {

const codeMap = {
        0: "Clear",
        1: "Cloudy", 2: "Cloudy", 3: "Cloudy",
        45: "Fog", 48: "Fog",
        51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
        56: "Snow", 57: "Snow", 
        61: "Rain", 63: "Rain", 65: "Rain",
        66: "Snow", 67: "Snow", 
        71: "Snow", 73: "Snow", 75: "Snow", 77: "Snow",
        80: "Rain", 81: "Rain", 82: "Rain",
        85: "Snow", 86: "Snow",
        95: "Thunder", 96: "Thunder", 99: "Thunder"
    };

    return codeMap[code] || "Cloudy";
}
