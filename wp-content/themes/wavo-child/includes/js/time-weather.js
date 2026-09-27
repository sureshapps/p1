
function updateTimeWeather() {
    // Obtén la hora actual en Madrid
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Madrid"}));
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeZone = "GMT+1";

    // Selecciona el primer <p> dentro del <div> con la clase "time-weather"
    const timeWeatherParagraph = document.querySelector('.time-weather p');
    
    // Si la temperatura ya está presente en el párrafo, la mantenemos
    if (timeWeatherParagraph && timeWeatherParagraph.dataset.temperature) {
        timeWeatherParagraph.textContent = `${hours}:${minutes} ${timeZone} · ${timeWeatherParagraph.dataset.temperature}ºC`;
    }
}

async function fetchTemperature() {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current_weather=true`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const temperature = Math.round(data.current_weather.temperature);

        // Selecciona el primer <p> dentro del <div> con la clase "time-weather"
        const timeWeatherParagraph = document.querySelector('.time-weather p');

        if (timeWeatherParagraph) {
            // Actualiza el texto con la temperatura y almacena la temperatura en data attribute
            timeWeatherParagraph.dataset.temperature = temperature;
            timeWeatherParagraph.textContent = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} GMT+1 · ${temperature}ºC`;
        }
    } catch (error) {
        console.error('Error fetching temperature:', error);
    }
}

// Llama a la función fetchTemperature una vez al cargar la página
fetchTemperature();

// Actualiza la temperatura cada 10 minutos
setInterval(fetchTemperature, 600000); // 600000 ms = 10 minutos

// Actualiza la hora cada minuto
setInterval(updateTimeWeather, 60000);
updateTimeWeather();


