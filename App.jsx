import React from 'react'
import Die from './die'
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



export default function App() {

  const[dice,setDice]= React.useState(allNewDice)
  const [tenzie, setTenzie]= React.useState(false)

  

  React.useEffect(()=>{
    const allHeldDice= dice.every(die=> die.isHeld)
    const firstVAlue= dice[0].value;
    const allSameValue= dice.every(die=>die.value===firstVAlue)
    if(allHeldDice && allSameValue){
      setTenzie(true)
     
    }
  },[dice])

  function generateDice(){
    return {
      value:Math.ceil(Math.random()*6),
      isHeld: false,
      id:nanoid()
    }
  }

  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push(generateDice())
    }
    return newDice
  }

  function holdDice(id){
       setDice(oldDice=> oldDice.map(die=>{
        return die.id === id ? {...die, isHeld : !die.isHeld} : die
       }))
  }



  function rollDice(){
    if(!tenzie){
      setDice(oldDice=> oldDice.map(die=>{
        return die.isHeld ? 
        die : generateDice()
      }))
    }else
     {
      setTenzie(false)
      setDice(allNewDice())
     }
   
  }

  const diceElements= dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />)

  return (
    <main className="forground" >
      {tenzie && <Confetti/>}
         <h1 className="title">Tenzies</h1>
         <p className="instructions">Roll until all dice are the same. Click each die 
         to freeze it at its current value between rolls.</p>
        <div className="dice-container">
           {diceElements}
        </div>
      <button onClick={rollDice} className="roll-dice">{ tenzie ? "New Game" : "Roll"}</button>
    </main>
  )
}

