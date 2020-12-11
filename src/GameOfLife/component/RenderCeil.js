import React from 'react'


function RenderCeil(props) {
    const {ceilRow, index, handleClick} = props
    return ( < div style = {
                {
                    display: 'flex',
                    flexDirection: 'column',
                }
            }
            key = {
                `row-${index}`
            } >
                        {ceilRow.map((ceil,j)=> {
                                return(
                                    <div style = {{
                                                display: 'flex',
                                                flexDirection:'row',
                                                // gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                                height: '15px',
                                                width:'15px',                                                
                                                cursor: "pointer",                                                                
                                                backgroundColor: ceil?"black":'white',
                                            }}
                                        onClick={()=>handleClick(index,j)}
                                        key = {`${index}-${j}`}></div>
                                )
                        })}
            </div>)
}

export default RenderCeil