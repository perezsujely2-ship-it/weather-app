import { useState } from 'react';
import './App.css';
//http://api.weatherapi.com/v1/search.json?key=5d922dfbd87245dabd105251262302&q=
//http://api.weatherapi.com/v1/current.json?key=5d922dfbd87245dabd105251262302&q=houston&aqi=no
// const tooltip = "Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name."
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getToday(){
  let date = new Date();
  let formattedDate = `${days[date.getDay()]}, ${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')} ${String(date.getFullYear()).slice(-2)}`;
  return formattedDate
}

function getWeather(search){
  return search
}

function App() {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [temp_f,setTemp] =  useState(32)
  const [conditionText,setconditionText] = useState('Clear')
  const [icon,setIcon] = useState(null)
  const [locationName,setLocationName] = useState(null) 
  const [locationRegion,setLocationRegion]= useState(null)
  const [locationCountry,setLocationCountry]= useState(null)

  const fetchData = async () => {
      setError(null); // Clear previous errors
      let link = `http://api.weatherapi.com/v1/current.json?key=5d922dfbd87245dabd105251262302&q=${q}&aqi=no`
      console.log(link)
      try {
        // Fetch data from a public API, e.g., JSONPlaceholder
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newData = await response.json();
        setTemp(newData.current.temp_f)
        setconditionText(newData.current.condition.text)
        setIcon(newData.current.condition.icon)
        setLocationName(newData.location.name)
        setLocationRegion(newData.location.region)
        setLocationCountry(newData.location.country)
        setData(newData);
        console.log(data)
      } catch (err) {
        setError(err.message);
        console.log(error)
      } finally {
        console.log('completed.')
      }
    };

  // const [count, setCount] = useState(0);
  const [q, loadInfo] = useState('Houston')

  
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h1>Path 2 Tech</h1>
        <h2>Weather App</h2>
        <h2>By Sujely Perez</h2>
        <h3>{getToday()}</h3>
        {/* <button type='button' onClick={() => setCount((prev) => prev + 1)}>Increment Count</button> */}
        </div>
        <div className="Search-Box">
          <input type="text" id='search' value={q} onChange={() => loadInfo((q) => getWeather(document.querySelector('#search').value))}></input>
          <button onClick={fetchData}><img src="./public/search.png" alt='Search Icon'/></button>
        </div>
        <div className="CityWeather">
          
          <h2>{locationName} {locationRegion},{locationCountry}</h2>
          <h2>{temp_f} F&deg; Condition: {conditionText}</h2>
          <img src={icon} alt='Current weather condition.'  />
          
          </div>
      </header>
    </div>
  );
}

export default App;
