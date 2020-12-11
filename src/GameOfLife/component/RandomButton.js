import React from 'react'
export default function RandomButton(props) {
    return(
        <button onClick={()=>props.handleRandom()}> Random</button>
    )
}
