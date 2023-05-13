setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes= date.getMinutes();
    let seconds= date.getSeconds(); 
    let day_night = "AM";
    if (hours > 12){
        day_night = "PM"
        hours=hours-12;
    }
    if (hours < 10){
        hours="0" + hours;
    } 
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds <10){
        seconds ="0" + seconds;
    } 

    time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night

});

const todaysDate = new Date();
const formattedDate = todaysDate.toLocaleDateString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric'
}).replace(/ /g, '-');
console.log(formattedDate);

date.textContent = formattedDate

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const d = new Date();
const dayName = days[d.getDay()];
day.textContent = dayName + ",  "

const weatherAppContainer=document.querySelector(".weather-app-container");
const inputSection=document.querySelector(".input-section");
const messageCont=document.querySelector(".message-cont");
const inputField=document.querySelector("input");
const locationBtn=document.querySelector("button");
const weatherIcon=document.querySelector(".weather-part img")
const backButton=document.querySelector("header i");
let apiUrl;

inputField.addEventListener("keyup",e=>{
    if(e.key=="Enter" && inputField.value!="")
    {
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(Success,Error);
    }
    else{
        alert("Your browser not support geolocation api");
    }
});

const Error = (error) => {
    messageCont.textContent="Please allow the location";
    messageCont.classList.add("error");
}

const Success = (position) => {
    const {latitude,longitude}=position.coords;
    apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"a2e86f2fe7b70e28afebb96422757d0e"}&lang={en}`;
    fetchData(apiUrl);
}

const requestApi = (city) => {
    apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"a2e86f2fe7b70e28afebb96422757d0e"}`;
    fetchData(apiUrl);
}

const fetchData = () => {
    messageCont.textContent="loading...";
    messageCont.classList.add("pending");
    fetch(apiUrl).then(response=>response.json()).then(result=>weatherDetails(result))
}

backButton.addEventListener("click",()=>{
    weatherAppContainer.classList.remove("active");
})

const weatherDetails = (data) => {
    console.log(data)
    if(data.cod=="404")
    {
        messageCont.textContent=`${inputField.value} is not a valid city name`;
        messageCont.classList.replace("pending","error");
    }
    else{
        const city=data.name;
        const country=data.sys.country;
        const {main,id}=data.weather[0];
        const {feels_like,humidity,temp,pressure}=data.main;
        const {speed} = data.wind
       
        if(id==800){
            weatherIcon.src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1683987856/1_kt7ptz.svg";
        }
        else if(id>=200 && id<=232){
            weatherIcon.src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1683987898/2_lyowgq.svg";
        }
        else if(id>=600 && id<=622){
            weatherIcon.src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1683987906/3_rgxqyx.svg";
        }
        else if(id>=701 && id<=781){
            weatherIcon.src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1683987918/4_mrhgp3.svg";
        }
        else if(id>=801 && id<=804){
            weatherIcon.src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1683987928/5_l2tgus.svg";
        }
        else if((id>=300 && id<=321) || (id>=500 && id<=531)){
            weatherIcon.src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1683987936/6_uuqsg9.svg";
        }

        weatherAppContainer.querySelector(".temperature-cont .number-text").innerText=Math.floor(temp);
        weatherAppContainer.querySelector(".weather").innerText=main;
        weatherAppContainer.querySelector(".location span").innerText=`${city}, ${country}`;
        weatherAppContainer.querySelector(".temperature-cont .number-text-2").innerText=feels_like;
        weatherAppContainer.querySelector(".humidity span").innerText=`${humidity}%`;
        weatherAppContainer.querySelector(".pressure span").innerText=`${pressure} hPa`;
        weatherAppContainer.querySelector(".speed span").innerText=`${speed} m/s`;
       
        messageCont.classList.remove("pending")
        weatherAppContainer.classList.add("active")
    }
}
