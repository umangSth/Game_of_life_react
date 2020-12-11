import React from 'react'
import RenderCeil from './RenderCeil' 
import "../App.css"

function RenderCeils(props){
    return (
        <div className="CeilsArea">
            {
                props.ceils.map((ceilRow, index) => <RenderCeil key={`columns-${index}`} ceilRow={ceilRow} index={index} handleClick={props.handleClick} />)
            }
        </div>
    )
}

export default RenderCeils