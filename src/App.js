import logo from './logo.svg';
import React,{useEffect, useState} from 'react'
import './App.css';
import axios from 'axios';
import Home from './Components/Home';
import Nav from './Components/Nav';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Graph from './Components/Graph';
import { TimeScale } from 'chart.js';

function App() {
  const [statistics,setStatistics] =React.useState([]);
  const [history,setHistory]= React.useState([]);
  const[loading,setLoading] = React.useState(false);

useEffect(()=>{

  getStatistics()
  getHistory();
  getCasesArr(history)
  getTestsArr(history)       
  getDeathsArr(history)
  getTime(history)
  alert('on moving to graphical statistics page kindly reclick it to populate the graph.Sorry for the bug')

},[])    

//get statistics from the api...
async function getStatistics(){
  const options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/statistics',
      headers: {
        'X-RapidAPI-Key': '84643cdb07msh65e2fb64ae26e4bp1578aajsnd39f17190429',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };
    
   const response = await axios.request(options)
   console.log(response.data.response)
   setStatistics(response.data.response)
  await setData(response.data.response)

}

//get history from the api...
async function getHistory(){
  const options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/history',
      params: {country: 'usa', day: '2020-06-02'},
      headers: {
        'X-RapidAPI-Key': '84643cdb07msh65e2fb64ae26e4bp1578aajsnd39f17190429',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };
    
    
   const response = await axios.request(options)
   await setHistory(response.data.response)
   console.log((response.data.response))
   console.log(history)

}

// Search Logic 
const [searchValue,setSearchValue] =useState('');
const [data,setData] = useState([]);
const [country,setCountry] = React.useState('usa');

const onSubmitHandler =(e)=>{
  e.preventDefault();
}


const onHandleChange = async(e)=>{
setSearchValue(e.target.value)
if(searchValue == ''){
return data
}else{
const filteredResult = await  statistics.filter(item=> item.country.toLowerCase().includes(e.target.value.toLowerCase()))
await setData(filteredResult)
}
}
///////////////////////////////////
const [cases,setCases]= useState([]);
const [deaths,setDeaths]= useState([]);
const [tests,setTests]= useState([]);
const [time,setTime]= useState([]);

const getBothAll =()=>{
  getAll();
  getAll()
}

const getAll =()=>{
  getCasesArr(history)
  getTestsArr(history)       
  getDeathsArr(history)
  getTime(history)
  getAllHourly()
  
}
const getAllHourly = async()=>{
  await hourlyCase()
  await hourlyTest()
  await hourlyDeath()
}

//All
// get Cases Array
async function getCasesArr(arr){
const casesArr=[]
await arr.forEach((item)=>{
  console.log(item.cases.total)
casesArr.unshift(item.cases.total)
})
await setCases(casesArr)
console.log(cases)
return casesArr;
}   

//Get Tests
async function getTestsArr(arr){
const casesArr=[]
 await arr.forEach((item)=>{
casesArr.unshift(item.tests.total)
})

await setTests(casesArr)
console.log(tests)
return casesArr;
    }
//Get Deaths
async function getDeathsArr(arr){
    const casesArr=[]
     await arr.forEach((item)=>{
    casesArr.unshift(item.deaths.total)
    })
    
    await setDeaths(casesArr)
    console.log(deaths)
    return casesArr;
        }
//Get Labels Array(Time)
async function getTime(arr){
const casesArr=[]
 await arr.forEach((item)=>{          
casesArr.unshift((item.time).slice(11,16))
})

await setTime(casesArr)
console.log(time)
return casesArr;
    }     
    const [hourlyTime,setHourlyTime]= useState([]);
  const [hourlyCases,setHourlyCases]= useState([]);
  const [hourlyTests,setHourlyTests]= useState([]);
  const [hourlyDeaths,setHourlyDeaths]= useState([]);

 //Get Results Hourly Of Cases
function hourlyCase(){
  let x = time;

  let y = cases;
  let start = x[0];
  
  let hours = Array.from(Array(24).keys()).map(i => {
    let [hour, minute] = start.split(":");
    hour = (parseInt(hour) + i).toString().padStart(2, "0");
    return `${hour}:${minute}`;
  });
  
  let xy = hours.map(hour => {
      let i = x.indexOf(hour);
      return i === -1 ? null : [hour, y[i]];
    }).filter(i => i);
  
  x = xy.map((i) => i[0]);
  y = xy.map((i) => i[1]); 
  setHourlyTime(x)  
  setHourlyCases(y)
  console.log(hourlyCases,hourlyTime)
}
 //Get Results Hourly Of Deaths
 function hourlyDeath(){
  let x = time;

  let d = deaths;
  let start = x[0];
  
  let hours = Array.from(Array(24).keys()).map(i => {
    let [hour, minute] = start.split(":");
    hour = (parseInt(hour) + i).toString().padStart(2, "0");
    return `${hour}:${minute}`;
  });
  
  let xd = hours.map(hour => {
      let i = x.indexOf(hour);
      return i === -1 ? null : [hour, d[i]];
    }).filter(i => i);
  
  x = xd.map((i) => i[0]);
  d = xd.map((i) => i[1]);   
  setHourlyDeaths(d)
  console.log(hourlyDeaths)
}
 //Get Results Hourly Of Testss
 function hourlyTest(){
  let x = time;

  let t = tests;
  let start = x[0];
  
  let hours = Array.from(Array(24).keys()).map(i => {
    let [hour, minute] = start.split(":");
    hour = (parseInt(hour) + i).toString().padStart(2, "0");
    return `${hour}:${minute}`;
  });
  
  let xt = hours.map(hour => {
      let i = x.indexOf(hour);
      return i === -1 ? null : [hour, t[i]];
    }).filter(i => i);
  
  x = xt.map((i) => i[0]);
  t = xt.map((i) => i[1]);   
  setHourlyTests(t)
  console.log(hourlyTests)
}

  return (
     <>
<Router>
<div className='App'>
<Nav getAll={getBothAll} />
  <Routes>
    <Route exact path='/' element={<Home data={data} history={history} onHandleChange={onHandleChange} searchValue={searchValue} onSubmitHandler={onSubmitHandler} />}/>


    <Route exact path='/graph'  element={ <Graph  history={history} time={hourlyTime} tests={hourlyTests} cases={hourlyCases} deaths={hourlyDeaths} getAll={getAll} country={country}/>} />


    </Routes>
    </div>
</ Router>
  
     
     </>
  
  );
}

export default App;
