import React from 'react';
import axios from 'axios';
import Statistics from './Statistics';

function Home() {
    const [countries,setCountries] = React.useState([]);
    const [statistics,setStatistics] =React.useState([]);
    const [history,setHistory]= React.useState([]);
//getCountries from the api
async function getCountries(){
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/countries',
        headers: {
          'X-RapidAPI-Key': '84643cdb07msh65e2fb64ae26e4bp1578aajsnd39f17190429',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      
     const response = await axios.request(options)
     console.log(response.data.response)
     setCountries(response.data.response)

 }

//  getCountries();

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
     console.log(response.data.response)
     setHistory(response.data.response)

 }

//  getHistory();


  return (
    <div>
        <p>Let's get the api for covid 19</p>
        <Statistics />
    </div>
  )
}

export default Home