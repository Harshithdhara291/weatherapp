// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=a2e86f2fe7b70e28afebb96422757d0e
let favouritePlaces = []

let weather = {
    apiKey: "API KEY GOES HERE",
    fetchWeather: function (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2e86f2fe7b70e28afebb96422757d0e`
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function (data) {
      let weatherData = JSON.stringify(data)
      localStorage.setItem("weatherData",weatherData)
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.round((temp-272.15), 2)+ "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    //   document.body.style.backgroundImage =
    //     "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

  document.querySelector(".add-to-favourites").addEventListener("click", function () {
    console.log("add clicked")
    let data = localStorage.getItem("weatherData")
    let weatherData = JSON.parse(data)
    console.log(weatherData)
    favouritePlaces.push(weatherData)
    createFavourites()
});

function createFavourites(){
    let array = document.querySelector('.favourites')
    let list = "";
    for(let i=0;i<favouritePlaces.length;i++){
        const {name} = favouritePlaces[i]
        list += `${name}  
                        `
    }
    array.innerText= list
}
  
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });



weather.fetchWeather("Hyderabad");
