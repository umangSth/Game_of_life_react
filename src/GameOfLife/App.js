import React, {
    useState,
    useCallback,
     useEffect
} from 'react'
import './App.css'

//this is rows and columns
const columns= 81 , rows = 40
//const columns = 10,    rows = 10


export default function App() {
    const [ceils, setCeils] = useState(generateCeils);
    

    const handleClick = (x,y) => {
        let arr = []
        arr = ceils.map((ceilRows, i) => i === x ? ceilRows.map((ceil, j) => j === y ? ceil ? 0 : 1 : ceil): ceilRows)       
        setCeils(()=>arr)
    }

    
   
    //handel gamestatus
    const [running, setRunning] = useState(false)
    const toggleStatus = useCallback(
       () => setRunning(run => !run), []);

       //handles the Render
    useEffect(() => {
        if (!running) {
                return;
            }               
            const interval = setInterval(() => {
                let tempArr = ceils.map((arr, x) =>
                    arr.map((ceil, y) => gameLogic(ceil, countNeighours(x, y)))
                )                
                setCeils(tempArr)
            }, 100)
            return () => clearInterval(interval);
    }, [running, ceils])

  
   //game logic
   const gameLogic = (ceil, neighoursCount) => {
       let life = 0

       if ((neighoursCount === 3 || neighoursCount === 2) && ceil === 1) {
           life = 1
       } else if (ceil === 0 && neighoursCount === 3) {
           life = ceil + 1 //it showed yellow underline so 
       }
       return life
   }
       //Counts the neigbhours
       const countNeighours = (x, y) => {
           const neighourArr = [
               [-1, -1],
               [0, -1],
               [1, -1],
               [1, 0],
               [1, 1],
               [0, 1],
               [-1, 1],
               [-1, 0],
           ]
           let count = 0
           neighourArr.forEach(([j, k]) => {
               const newX = x + j
               const newY = y + k
               if (newX < columns && newY < rows && newX >= 0 && newY >= 0) {
                   count = (ceils[newX][newY] ? 1 : 0) + count
               }
               return null
           })

           return count
       }
  


    //Genrate random ceils
    const handleRandom = () => {setCeils(generateCeils(0.80))}


    
    return(
        <div className='wholeBody'>
            {/* GameArea */}
            <div className="buttonArea">
                <StartButton  status={running} handleStatus={toggleStatus}/>
                <RandomButton handleRandom={handleRandom} />
            </div>
            <div className="GameArea">               
               {
                    <RenderCeils ceils={ceils} handleClick={handleClick}/>
               }
            </div>
        </div>
    )
}
//this will gentrate ceils array with value, here default is 0 for all [50][50] ceils 
function generateCeils(input) {
    if(input===undefined){
        input = 1
    }
    let resultArr = []
    //this will give rows array
    for (let i = 0; i < columns; i++) {
        //this will give indivisual ceil a and give default 0 value
        resultArr.push(Array.from(Array(rows), () => Math.random()<input? 0 : 1 ))
    }
    return resultArr
}

function StartButton(props) {
    return(
        <button onClick={()=>{
                        
                        props.handleStatus();}}>
                {props.status?'stop':'start'}</button>
    )
}

function RandomButton(props) {
    return(
        <button onClick={()=>props.handleRandom()}> Random</button>
    )
}

function RenderCeils(props){
    return (
        <div className="CeilsArea">
            {
                props.ceils.map((ceilRow, index) => <RenderCeil key={`columns-${index}`} ceilRow={ceilRow} index={index} handleClick={props.handleClick} />)
            }
        </div>
    )
}

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



