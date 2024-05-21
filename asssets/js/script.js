const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById('cityInput');
const card = document.getElementById("current-weather-info");
const apiKey= "80812a6a48873a08c30a92a877a85cd0";

weatherForm.addEventListener("submit", async event =>{
  event.preventDefault();
  const city = cityInput.value;
  if (city){
    try{
      const weatherdata = await getWeatherData(city);
      //displayweatherinfo(weatherdata);

    }
    catch (error){
      console.error(error);
      displayError(error)
    }

  }
  else{
    displayError("Please enter a City");
  }

})

async function getWeatherData(city){

  const apiUrl =`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

 fetch (apiUrl)
 .then(response => response.json())
 .then(data => {
  console.log(data[0].lat, data[0].lon)
  displayweatherinfo(data[0].lat, data[0].lon)
  displayforecastinfo(data[0].lat, data[0].lon)
 });


}

function displayweatherinfo(lat, lon){
  const apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial `;

  fetch (apiUrl)
  .then(response => response.json())
  .then(data => {
   console.log(data)

   const divCard = document.createElement("div")
    divCard.setAttribute("class", "currentCard")
    //make elements and assign values from api then attach to current weather div
    const cityName = document.createElement("h2")
    cityName.textContent = data.name

    const temperature = document.createElement("h3")
    temperature.textContent = "Temp: " + data.main.temp + " F"


    divCard.append(cityName, temperature)
   document.getElementById("current-weather-info").append(divCard)
  });
}

function displayforecastinfo(lat, lon){
  const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial `;

  fetch (apiUrl)
  .then(response => response.json())
  .then(data => {
   console.log(data)
// loop over data to get the current the next day 
 for (let i = 4; i < data.list.length; i+=8) {

  console.log(data.list[i])
  const divCard = document.createElement("div")
  divCard.setAttribute("class", "forecastCard")
  //make elements and assign values from api then attach to current weather div
 

  const temperature = document.createElement("p")
  temperature.textContent = "Temp: " + data.list[i].main.temp + " F"


  divCard.append(temperature)
 document.getElementById("forecast-info").append(divCard)
 }

  });
}


function displayError(message){

  const errordisplay =document. createElement("p");
  errordisplay.textContent= message;
  errordisplay.classList.add( "errorDisplay");

  card.textContent = "";
  card.style.display= "flex";
  card.appendChild(errordisplay);
}



