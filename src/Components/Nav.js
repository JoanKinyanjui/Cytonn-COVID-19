import { Height } from '@mui/icons-material';
import { AppBar } from '@mui/material'
import React from 'react';
import { Link } from 'react-router-dom';
import '../global.css';
import {navItems} from './navItems'

function Nav({getAll}) {
  return (
    <div className='pb-12 text-white py-4 w-screen'>
        
         <AppBar style={{backgroundColor:"black",color:"white", height:"max-content"}}>
         <p className='grid justify-center text-bold text-xl md:text-3xl py-4 '>CORONA VIRUS STATISTICS</p>
         <div className='text-white flex justify-between'>
           <Link to='/' ><button >Tabular Statistics</button>  </Link>
            <Link to='/graph' ><button onClick={getAll}>Graphical Statistics</button>  </Link>
        
         </div>
         </AppBar>
    </div>
  )
}

export default Nav