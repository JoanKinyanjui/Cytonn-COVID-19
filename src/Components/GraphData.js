import React,{useEffect, useState} from 'react'
import axios from 'axios';

function GraphData() {
    const [history,setHistory]= React.useState([]);
useEffect(()=>{
    getHistory()
},[])

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
     setHistory(response.data.response)
     console.log(history)

 }

    const [cases,setCases]= useState([]);
    const [deaths,setDeaths]= useState([]);
    const [tests,setTests]= useState([]);
    const [time,setTime]= useState([]);

     //All
// get Cases Array
async function getCasesArr(arr){
    const casesArr=[]
    await arr.forEach((item)=>{
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
    console.log(tests)
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
        console.log(deaths)
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
    <div>
        GraphData
    </div>
  )
}

export default GraphData