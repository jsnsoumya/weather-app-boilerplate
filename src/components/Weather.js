import React, { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, BrowserRouter } from "react-router-dom";
import details from "./Details.js";


function Weather() {
// 
var headers = new Headers();
headers.append("X-CSCAPI-KEY", "WlhXYXM1OGRvUUtHNGNiWEJqQ3NuU2pPVWp4eTRidHRCWWdBak1idQ==");

var requestOptions = {
 method: 'GET',
 headers: headers,
 redirect: 'follow'
};

const [country, setCountry]= useState([]);
  const [countryid, setCountryid]=useState('');
  const [st, setSt]= useState([]);
  const [stateid, setStateid]= useState('');
  const [city, setCity]= useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Printing Country", country);
  console.log("Printing St", st);
  console.log("Printing city", city);
  console.log("Printing stateid", st);

  // console.log("Printing Country", country);
  // const [cityid, setCityid]= useState([]);

   useEffect( ()=>{
       const getcountry= async()=>{
           setLoading(true);
           const rescountry= await fetch("https://api.countrystatecity.in/v1/countries", requestOptions);
           console.log("rescountry", rescountry);
           const rescon= await rescountry.json();
           console.log("rescon", rescon);
           setCountry(rescon);
           setLoading(false);
       }
       getcountry();
   },[]);

   const handlecountry=(event)=>{
       const getcountryid= event.target.value;
       console.log("Get Country ID", getcountryid);
       setCountryid(getcountryid);
   }

   useEffect( ()=>{
   const getstate= async()=>{
       const resstate= await fetch(`https://api.countrystatecity.in/v1/countries/${countryid}/states`, requestOptions);
       console.log("resstate", resstate);
       const resst= await resstate.json();
       console.log("resst", resst);
       setSt(resst);
   }
  getstate();
   },[countryid]);

   const handlestate=(event)=>{
      const getstateid= event.target.value;
      setStateid(getstateid);
  }
useEffect( ()=>{
  const getcity= async()=>{   
      const rescity= await fetch(`https://api.countrystatecity.in/v1/countries/${countryid}/states/${stateid}/cities`, requestOptions);
      console.log("rescity", rescity);
      const rcity= await rescity.json();
      console.log("rcity", rcity);
      setCity(await rcity);
  }
getcity();
},[stateid]);
// const handlecity=(event)=>{
//   const getcityid= event.target.value;
//   setCityid(getCityid);
// }


// 
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: ""
  });
  const APIKEY = "51be411bf8b84ea32f39fcefd5ecf6a1";
  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      return;
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }
  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   if (name == "city") {
  //     setForm({ ...form, city: value });
  //   }
  // };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <div className="row">
          <div className="col-sm-12">
          

            <form className="row g-3">

               <div className="col-md-3">
                <label  className="form-label">Country </label>
                <select name="country" className="form-control p-2"  onChange={(e)=>handlecountry(e)} >
                  <option value="">--Select Country--</option>
                 {
                 country.map( (getcon, index)=>(
                  <option key={index} value={getcon.iso2}>{getcon.name} </option>
                 ))
                  }
                </select>
              </div>

              <div className="col-md-3">
                <label  className="form-label">State</label>
                <select className="form-select" name="state"  onChange={(e)=>handlestate(e)}>
                  <option value="">--Select State--</option>
                  {
                    st.map((getst, index)=>(
                     <option key={index} value={getst.iso2}>{getst.name} </option>
                    )) 
                  }                  
                </select>
              </div>

              {/* <div className="col-md-3">
                <label  className="form-label">City</label>
                <select className="form-select" name="city">
                  <option value="">--Select City--</option>
                  {
                      city.map( (gcity, index)=>(
                      <option key={index} value={gcity.id}> {gcity.name} </option>
                      ))
                  }                 
                </select>
              </div> */}
              <div className="col-md-3">                
                <button type="button" className="btn btn-primary mt-4">Submit</button>
              </div>
              <React.Fragment>
                <ul className="list-group">
                  {
                    city.map( (gcity, index)=>(
                      <li key={gcity.name} className="list-group-item list-group-item-primary">
                        <BrowserRouter>

                        <Link to="/details">{gcity.name}</Link>
                        </BrowserRouter>

                        {/* <a href="#">{gcity.name}</a> */}
                      </li>
                    ))
                  }
                </ul>
              </React.Fragment>
            </form>
          </div>
        </div>
      

{weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
// if (loading == false){
//   {
//     countries.map(c => (<div>
//       {c.name}
//     </div>))
//   }
// }
}

export default Weather;
