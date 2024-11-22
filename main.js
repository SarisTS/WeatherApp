document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form")
    form.addEventListener("submit", async (event)=>{
        event.preventDefault();
        const city = document.querySelector("input").value.trim()
        if(!city){
            alert("Please enter your city")
            return;
        }
        console.log(city);
        
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=463a74b2b31153d290924e9e65fab19e&units=metric`)
            if(!response.ok){
                throw new Error("Not Fetching API")
            }
            const data = await response.json()
            const section = document.querySelector("section")
            const div = document.createElement("div")
            div.id="Temp"
            div.innerHTML = 
            `<h3>${data.name} - 🌡️ ${data.main.temp}\u00B0C - ${data.weather[0]['main']}<i class="bi bi-x" id="icon" onclick="remove(event)"></i></h3>
            <div id="info">
                <ul id="left_info">
                <li>Feels like : ${data.main.feels_like}°C</li>
                <li>Max : ${data.main.temp_max}°C</li>
                <li>Min: ${data.main.temp_min}°C</li>
                </ul>
                <ul id="right_info">
                <li>Wind : ${data.wind.speed}m/s</li>
                <li>Humidity: ${data.main.humidity}%</li>
                <li>Pressure: ${data.main.pressure} hPa</li>
                </ul>
            </div> `
            section.prepend(div)
            document.querySelector("input").value = "";
        }
        catch(error){
            console.log(error);
        }
    });
});

