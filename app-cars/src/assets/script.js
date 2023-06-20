console.log("funcionaaaaaaa")
let dataApi ;
let dataApiByip;
let container = document.querySelector('.container')
let inputSearcher = document.querySelector('.searcherip')
let imgEu = '../findYourip_project/images/yes.png'
let imgNoEu = '../findYourip_project/images/no.png'
let containerWeather = document.querySelector('.weather');
let body = document.querySelector('body')



const getApi = async () => { 
      let secondApi = await fetch(`https://ipapi.co/json`);
      let data = await secondApi.json();
    
       dataApi = {...data};}
    

    const getApiperIp = async (ip) => { 
      let secondApi = await fetch(`https://ipapi.co/${ip}/json/`);
      let data = await secondApi.json();
     
      dataApiByip = {...data};
      
      
      if (data.error) {
            container.innerHTML = `${data.reason} , you have been looking for IP "${data.ip}", format of IPv4 is x.x.x.x`
      } else {
            
       renderhtml(dataApiByip);
               
      } }
     

    let timeout = null;
    inputSearcher.addEventListener('keyup', function (e){
    
      let input = e.target.value;
      let weatherTxt = document.querySelector('.weather-txt')
      dataApi.ip = input;
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            
                getApiperIp(input);
                containerWeather.innerHTML = ' ';

         containerWeather.innerHTML =` <img src="../findYourip_project/images/weather.png" alt=""> <br>
         <p id="weather-info"></p>You can get weather based on IP search by clicking on the image, enjoy :) `
               
 
          }, 2000);
      });
       

      

function renderhtml (objectt) {

    let humans = new Intl.NumberFormat().format(objectt.country_population) 
      if (objectt.in_eu === true)
{
            objectt.in_eu = imgEu;
            
      container.innerHTML =
      
      ` 
      
       <h1><img src="../findYourip_project/images/ip-address.png"  id='ipadress'alt="ip"></h2>
      <p> you can't hide from me :) </p>
<table>
                        <thead>
                          <tr>
                              <th></th>
                              <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <td>IP adress</td>
                              <td>${objectt.ip}</td>
                          </tr>
                          <tr>
                              <td>Internet Provider</td>
                              <td>${objectt.org}</td>
                          </tr>
                          <tr>
                              <td>City</td>
                              <td>${objectt.city}</td>
                          </tr>
                          <tr>
                              <td>Region</td>
                              <td>${objectt.region}</td>
                          </tr>
                          <tr>
                              <td>Capital</td>
                              <td>${objectt.country_capital}</td>
                          </tr>
                          <tr>
                              <td>Country</td>
                              <td>${objectt.country_name}</td>
                          </tr>
                          <tr>
                              <td>Country Population</td>
                              <td>${humans} humans</td>
                          </tr>
                          <tr>
                          <td>Currency</td>
                          <td>${objectt.currency}/${objectt.currency_name}</td>
                      </tr>
                      
                          <tr>
                              <td>EU</td>
                              <td><img class='imgYes' src="${objectt.in_eu}" alt=""></td>
                          </tr>
                          <tr>
                              <td>Languages</td>
                              <td>${objectt.languages}</td>
                          </tr>
                          <tr>
                              <td>CP</td>
                              <td>${objectt.postal}</td>
                          </tr>
                          <tr>
                              <td>Time</td>
                              <td>${objectt.timezone}</td>
                          </tr>
                          
                       
                         
                        </tbody>
                        </table>`
}    else {
      objectt.in_eu = imgNoEu;
       container.innerHTML =
      
      ` 
      
       <h1><img src="../findYourip_project/images/ip-address.png"  id='ipadress'alt="ip"></h1>
      <p> you can't hide from me :)</p>
<table>
                        <thead>
                          <tr>
                              <th></th>
                              <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <td>IP adress</td>
                              <td>${objectt.ip}</td>
                          </tr>
                          <tr>
                              <td>Internet Provider</td>
                              <td>${objectt.org}</td>
                          </tr>
                          <tr>
                              <td>City</td>
                              <td>${objectt.city}</td>
                          </tr>
                          <tr>
                              <td>Region</td>
                              <td>${objectt.region}</td>
                          </tr>
                          <tr>
                              <td>Capital</td>
                              <td>${objectt.country_capital}</td>
                          </tr>
                          <tr>
                              <td>Country</td>
                              <td>${objectt.country_name}</td>
                          </tr>
                          <tr>
                              <td>Country Population</td>
                              <td>${humans} humans</td>
                          </tr>
                          <tr>
                          <td>Currency</td>
                          <td>${objectt.currency}/${objectt.currency_name}</td>
                      </tr>
                          <tr>
                              <td>EU</td>
                              <td><img class='imgYes' src="${objectt.in_eu}" alt=""></td>
                          </tr>
                          <tr>
                              <td>Languages</td>
                              <td>${objectt.languages}</td>
                          </tr>
                          <tr>
                              <td>CP</td>
                              <td>${objectt.postal}</td>
                          </tr>
                          <tr>
                              <td>Time</td>
                              <td>${objectt.timezone}</td>
                          </tr>
 
                        </tbody>
                        </table>`
}}


function getWeather (ipAdress , clearData ) { 
var ip = ipAdress;
clearData.innerHTML = '';
$.get('https://ipapi.co/'+ip+'/latlong/', function(response){
    var latlong = response.split(',');
    //console.log(latlong);  
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latlong[0] + '&lon=' + latlong[1] + '&appid=60537cc278b42a0ae9cfc0c79896990b' + '&units=metric', function(wResponse){
        let divWeather = document.createElement('div');
       containerWeather.appendChild(divWeather);
    
       let celsius = Math.round(wResponse.main.temp);
       let celsiusF = Math.round(wResponse.main.feels_like);
      
    
       divWeather.innerHTML = `  <div class="container-fluid px-1 px-md-4 py-5 mx-auto">
       <div class="row d-flex justify-content-center px-3">
           <div class="card">
               <h2 class="card-name">${wResponse.name}</h2>
               <h1 class="card-celsius">${celsius} °C </h1>
               <div class="card-celsius-feels-like">Feels like it's ${celsiusF} °C </div>
               <div class="card-humedity"> <img src="../findYourip_project/images/water.png" alt="water">  Humedity ${wResponse.main.humidity} %</div>
               <div class="card-wind"> <img src="../findYourip_project/images/wind.png" alt="water">${wResponse.wind.speed} km/h</div>

           </div>
       </div>
   </div>`
  
 

    })
  })}


async function engine () {
      await getApi();
      
      renderhtml (dataApi);
      //*getWeather(dataApi.ip, containerWeather)

  }

  engine();

  containerWeather.addEventListener('click' , searchButtonHandler)
  
  
  function searchButtonHandler () {
    getWeather(dataApi.ip, containerWeather)

  }
    
