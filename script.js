const app = document.querySelector('.container');
const temp = document.querySelector('.temp');
const dateout = document.querySelector('.date');
const timeout = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameout = document.querySelector('.name');
const icon = document.querySelector('.icon');
const humidityout = document.querySelector('.humidity');
const windout = document.querySelector('.wind');
const pressureout = document.querySelector('.pressure');
const form = document.getElementById('locinput');
const search = document.querySelector('.search');
const btn =  document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

/*default city name on page while page loaded*/
let cityInput = "New Delhi";
/*getting city from panel with add click event */
cities.forEach((city) => {
    city.addEventListener('click',(e)=> {
        /*change from default city while clicked */
        cityInput = e.target.innerHTML;
        /* the function fetching weather data  to display the feather and display 4days forecast weather report*/
        fetchWeatherdata();
        weatherReport();
        /* fade out the app using animatio*/ 
        app.style.opacity = "0";
    });
    
})

//adding the event to the form using some vaildation
// if the input field of search bar has been empty means it's shows the alert

form.addEventListener('submit',(e)=>
{
    if(search.value.length == 0) {
        alert("please type city name");
    }
    else{
        /*change the default city to the getting from user througj the search bar*/
        cityInput = search.value;
        /* the function was fetching and display all the data from weather api */
        fetchWeatherdata();
        // removing the all text from the input field
        search.value ="";
        app.style.opacity = "0";
    }
    e.preventDefault();
});
// function for the weekdays of the month
function dayoftheweek(day,month,year) {
    
//fetching the date,month and year from newdate 
    const d = new Date(`${day}/${month}/${year}`);
    //fetching the weekday under new date only
    const weekday = [ "Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    const date1= new Date();
    // fetched under the dayname with date ,month, year and weekdays
    const dayname = weekday[date1.getDay()];
    return dayname;
};
   //fetching time
   const date = new Date();
   console.log(date);
   const dateTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true
    })
    console.log(dateTime);
 //month generate
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const ds = new Date();
     const names = month[ds.getMonth()];
    console.log(names);


    
/* this function is fetching and display all the weather forecast from weather API*/


function fetchWeatherdata(){
    /* fetching the data and add with city input with own key */
    fetch(`http://api.weatherapi.com/v1/current.json?key=bd2ab69a20e94974a7560540230102&q=${cityInput}` )                                                            
.then(Response => Response.json())
/* Getting data which has been in JSON format and convert to js object*/ 

.then(data =>{
   
    console.log(data);
   // Adding the temp and weather condition to the web page
    temp.innerHTML=data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;
    /* getting the date and time for the city and extract the  day, month, year and time into the variables */
    const date = data.location.localtime;
    const date1 = new Date();
    //extracting the date from the substr 
    const y =parseInt(date.substr(0,4));
    const m =parseInt(date.substr(5,3));
    const d =parseInt(date.substr(8,2));
    const dT = new Date();
   
    const time = date.substr(11);
    /* formatting the  date  to the page  */
    dateout.innerHTML= `${dayoftheweek(d, m, y)}  ${d} ${names} ${y}`;
    timeout.innerHTML= dateTime;
    /* adding the name of the city into the page */
    nameout.innerHTML = data.location.name;
    
/* getting the icon from the weatherapi while corresponding current condition*/
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
   //getting the icon from local folder path and add it to the page
    icon.src="./icons/"+iconId;
   // Add the weather details to th web page
    humidityout.innerHTML=data.current.humidity+"%";
    windout.innerHTML=data.current.wind_kph+"km/h";
    pressureout.innerHTML=data.current.pressure_mb+"mb";

    
    

 app.style.opacity ="1";
});
}
/* function of  the fetching the weather api and getting the next four days forecast  */
function weatherReport(){

    var urlcast= `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=45b4fced1e51eecad72ba08ab996630e&units=metric`;

    fetch(urlcast).then((res)=>{
        return res.json();
    }).then(forecast=>{
        console.log(forecast);
        console.log(cityInput);
        //function for getting the forecast
        dayForecast(forecast)
    })

}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    //getting the list of forecast how many days we want using foor loop
    for (let i = 8; i < forecast.list.length; i+=8) {
        console.log(forecast.list[i])
        // creating the div attribute for setting the attribute to class and dayf under the html 
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        // creating the paragaraph attribute to class and date 
        let day= document.createElement('p');
        day.setAttribute('class','date')
        // it was forecasting from the newdate to get the asia /kolkata 
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
         /*  allows you to add the newly created element after the last child 
        of the element inside the parent element */
        div.appendChild(day);
        /* getting  the temparature using the list of days forecasting of maximum temparature
         and minimum temparature */
        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max ))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min ))+ ' °C';
        /*  allows you to add the newly created element after the last child 
        of the element inside the parent element */
        div.appendChild(temp)
        //description of the desc and class under using the list 
        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
         /*  allows you to add the newly created element after the last child 
        of the element inside the parent element */
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
} 
fetchWeatherdata();
weatherReport();
app.style.opacity ="1";


    