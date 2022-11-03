

import React,{useState,useEffect} from "react";

function Timer(){

    const [minute,setMinute] = useState(24)

    const [secound,setSecound] = useState(60)

    const [isCount,setIsCount] = useState(true)

    const [isBreak,setBreak] = useState(false)

    var timeout;

    useEffect(()=>{
        

    
    
        timeout=setTimeout(()=>{

            if(secound===0&&minute===0){

                if(isBreak){
                    setBreak(false)
                    setMinute(24)
                    setSecound(60)
                }else{
                    setBreak(true)
                    setMinute(4)
                    setSecound(60)
                }

            }else{

                if(isCount){
                    if(secound===0){
                        setSecound(60)
                        setMinute(minute-1)
                    }else{
                        setSecound(secound-1)
                    }
                }
        }
        },1000)
        

    },[secound,isCount])

    const countDownHander = (iscount)=>setIsCount(iscount)

    const reset=()=>{

        clearTimeout(timeout)

        if(isBreak){

               
        setMinute(4)
        setSecound(60)
        setIsCount(true)

        }else{

        setMinute(24)
        setSecound(60)
        setIsCount(true)
        }

    }

    return(
        <>
          <h5>{isBreak?'break':'count down'}</h5>
          <h1>{minute}:{secound}</h1>
          <div>
            <button onClick={()=>countDownHander(false)}> stop</button>
            <button onClick={()=>countDownHander(true)}> Pause</button>
            <button onClick={reset}> Reset</button>
          </div>
        </>
    )

}

export default Timer