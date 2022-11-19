import logo from './logo.svg';
import React,{useEffect, useState} from 'react'
import './App.css';
import axios from 'axios';
import Home from './Components/Home';
import Nav from './Components/Nav';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Graph from './Components/Graph';

function App() {
  const [countries,setCountries] = React.useState([]);
  const [statistics,setStatistics] =React.useState([]);
  const [history,setHistory]= React.useState([]);

useEffect(()=>{

  getStatistics()


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
   setStatistics(response.data.response)
  await setData(response.data.response)

}

//  getStatistics();

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

getHistory();
},[])    

// Search Logic 
const [searchValue,setSearchValue] =useState('');
const [data,setData] = useState([]);
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

const getAll =()=>{
  getCasesArr(history)
  getTestsArr(history)       
  getDeathsArr(history)
  getTime(history)
}


//All
// get Cases Array
async function getCasesArr(arr){
const casesArr=[]
await arr.forEach((item)=>{
  console.log(item.cases.total)
casesArr.unshift(item.cases.total)
})
setCases(casesArr)
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
// console.log(tests)
return casesArr;
    }
//Get Deaths
async function getDeathsArr(arr){
    const casesArr=[]
     await arr.forEach((item)=>{
    casesArr.unshift(item.deaths.total)
    })
    
    await setDeaths(casesArr)
    // console.log(deaths)
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

  return (
     <>
<Router>
<div className='App'>
<Nav getAll={getAll} />
  <Routes>
    <Route exact path='/'  element={<Home data={data} history={history} onHandleChange={onHandleChange} searchValue={searchValue}/>}/>


    <Route exact path='/graph'  element={ <Graph  history={history} time={time} tests={tests} cases={cases} deaths={deaths} getAll={getAll}/>} />


    </Routes>
    </div>
</ Router>
  
     
     </>
  
  );
}

export default App;
