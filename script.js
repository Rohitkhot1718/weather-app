const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="
const weatherApi = "38d29484f560cc993f0f4a24f6de8e1f"
let curWea = document.querySelector(".current-weather h1")
let curCity = document.querySelector(".current-weather h2")
let humidity = document.querySelector(".humidity :first-child")
let windSpd = document.querySelector(".wind :first-child")
let wethImg = document.querySelector(".weather-icon")


let getInput = document.querySelector(".search input")
let btn = document.querySelector(".search button")

const getWeather = async (city) => {
    try {
        let url = weatherUrl + city + `&appid=${weatherApi}`
        let response = await fetch(url)
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block"
            document.querySelector(".current-weather").style.display = "none"
        }
        else {
            let data = await response.json()
            curWea.innerText = Math.round(data.main.temp) + '℃'
            curCity.innerText = data.name
            humidity.innerText = data.main.humidity + "%"
            windSpd.innerText = data.wind.speed + "KM/H"

            if (data.weather[0].main === "Clear") {
                wethImg.src = "./Assets/clear.png"
            }
            else if (data.weather[0].main === "Rain") {
                wethImg.src = "./Assets/rain.png"
            }
            else if (data.weather[0].main === "Cloud") {
                wethImg.src = "./Assets/cloud.png"
            }
            else if (data.weather[0].main === "Mist") {
                wethImg.src = "./Assets/mist.png"
            }
            else if (data.weather[0].main === "Snow") {
                wethImg.src = "./Assets/snow.png"
            }
            document.querySelector(".current-weather").style.display = "block"
            document.querySelector(".error").style.display = "none"
        }
    } catch (error) {
        document.querySelector(".error p").innerText = "Looks like you're not connected to the internet"
        document.querySelector(".error").style.display = "block"
        document.querySelector(".current-weather").style.display = "none"
    }
}


btn.addEventListener("click", () => {
    getWeather(getInput.value)
})

getInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather(getInput.value);
    }
});
