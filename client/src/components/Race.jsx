import React from 'react';

const Race = (props) => {

  return (
    <div>
      <input onChange={props.handleRaceChange} type='radio' value ={JSON.stringify(props.race)} name='race'></input>
      <label>{props.race.name}</label>
    </div>
  )
}

export default Race;