const APIKey = '80812a6a48873a08c30a92a877a85cd0'
const requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}`

 const input =document.getElementById("cityInput")
 const city = cityInput.value  


fetch(requestUrl)
  .then(function (response) {
    return response.json();{
      console.log(response);
      if (response.status===200){
        response.text.textcontent =response.status;
        return response.json();
      } else {
        alert ('bad Request');
      }
    } 
    
  })
  .then(function (data) {
    console.log(data);
  });




