import React from 'react'

export default function StartButton(props) {
    return(
        <button onClick={()=>{                       
                        props.handleStatus();}}>
                {props.status?'stop':'start'}</button>
    )
}