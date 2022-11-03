import logo from './logo.svg';
import './App.css';
import services from './services';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import Timer from './timer';

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const [isLoading,setIsLoading] = useState(true)


  useEffect(()=>{

    services.auth().then((res)=>{
      setIsLoggedIn(true)
      setIsLoading(false)
    }).catch((err)=>{
      setIsLoggedIn(false)
      setIsLoading(false)
    })

  },[])

  const createAccount = ()=>{

    services.signinWithGoogle().then((res)=>{

      setIsLoggedIn(true)

      setIsLoading(false)

    }).catch((err)=>{
      setIsLoggedIn(false)

      setIsLoading(false)
    })
    

  }

  return (
    <div className="App">
      {
        isLoading?
          <h1>Loading</h1>
        :
        isLoggedIn?
        <Timer/>
        :
        <Button style={{color:'black',marginTop:'50px'}} onClick={createAccount}>
        Login with {' '} <GoogleIcon/>
      </Button>
      }
    </div>
  );
}

export default App;
