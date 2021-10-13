import React from 'react';

const Class = (props) => {

  return (
    <div>
      <input onChange={props.handleClassChange} type='radio' value ={JSON.stringify(props.classObject)} name='class'></input>
      <label>{props.classObject.name}</label>
    </div>
  )
}

export default Class;