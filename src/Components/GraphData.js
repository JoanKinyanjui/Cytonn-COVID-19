import React from 'react'

function GraphData({history}) {
    console.log(history)
        async function getDeathsArr(arr){
        const casesArr=[]
         await arr.forEach((item)=>{
        casesArr.unshift(item.deaths.total)
        console.log(casesArr)
        })}
        getDeathsArr(history)
  return (
    <div>
hae
    </div>
  )
}

export default GraphData;