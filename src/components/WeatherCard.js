import React, { useState,useEffect} from 'react'
import Weatherimage from "./Weatherimage.jpg"
function WeatherCard() {
  // let {cityname,region,country,localtime,temparature,windKMHour,humidity}=props
  const [city, setcity] = useState("")
  const [weatherData, setWeatherData] = useState(null);
  const [image, setimage] = useState({}) 
  const fetchimage=async(condition)=>{
    try {
      const url=`https://api.unsplash.com/photos/random?query=${condition}&count=1&client_id=${process.env.REACT_APP_IMAGE_API}`
      const imageData= await fetch(url)
      const parsedImageData=await imageData.json()
      if (parsedImageData[0]?.urls?.regular) {
        setimage(parsedImageData[0]);
      } else {
        console.error('Invalid image data structure:', parsedImageData);
      } 
    } catch (error) {
      console.error('error fetching image:',error)
    }
  } 
  useEffect(() => {
    console.log(image)
  }, [image]);
  const ifClicked=async()=>{
    try {
      const url=`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&aqi=no,`
      const data=await fetch(url)
      const parsedData=await data.json()
      if (data.ok) {
        setWeatherData(parsedData)
        fetchimage(parsedData.current.condition.text);
}else{
  console.error('Error fetching weather data:', parsedData.error.message);
}
} catch (error) {
  console.error('Error fetching weather data:', error);
}
    }
   
  return (
    <div className="card mx-auto my-6 bg-black bg-gradient mb-3" style={{width:"100%",height:"100%" }}>
  <div className="row g-0">
    <div className="col-md-6">
      <img src={image.urls && image.urls.regular?image.urls.regular:Weatherimage} className="img-fluid rounded-start "style={{height:"auto"}} alt="..."/>
    </div>
    <div className="col-md-5">
        <div className="card-body text-center">
      <input className="search-bar bg-black h4 pb-2 mb-4 text-white border-bottom-light-subtle " type="text" value={city} placeholder="Search City"  onChange={e=>setcity(e.target.value)} />
        <button className="btn" onClick={ifClicked}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-search-heart" viewBox="0 0 16 16">
  <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
  <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
</svg></button>
       
          <div className='container my-2 text-white opacity-75 text-start'>
     <div className='container fs-4 fw-bold my-2'>{weatherData && weatherData.location && weatherData.location.name?weatherData.location.name:"Location"},{weatherData && weatherData.location && weatherData.location.region},{weatherData && weatherData.location && weatherData.location.country}</div>
     <div className='container fs-4 fw-bold my-2'>Condition- {weatherData && weatherData.location && weatherData.current.condition.text}</div>
     <div className='container fs-4 fw-bold my-2'>Temparature- {weatherData && weatherData.location && weatherData.current.temp_c}<span>&#8451;</span></div>
     <div className='container fs-4 fw-bold my-2'>Wind Speed- {weatherData && weatherData.location && weatherData.current.wind_kph} Km/hr</div>
     <div className='container fs-4 fw-bold my-2'>Humidity- {weatherData && weatherData.location && weatherData.current.humidity}%</div>
     <div className='container fs-4 fw-bold my-2'>Time- {weatherData && weatherData.location && weatherData.location.localtime}</div>
    </div>

     </div>
  </div>
</div>
  </div>
  )
}

export default WeatherCard