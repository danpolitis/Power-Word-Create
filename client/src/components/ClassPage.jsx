import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Class from './Class.jsx';

const ClassPage = (props) => {
  const [classes, setClasses] = useState([]);
  const [classObject, setClassObject] = useState({});

  const getClasses = () => {
    axios.get('http://localhost:3000/classes')
      .then((results) => {
        setClasses(results.data);
      })
  }

  useEffect(() => {
    getClasses();
  }, [])

  const handleClassChange = (e) => {
    setClassObject(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.put('http://localhost:3000/characters/class', {
      classObject: classObject,
      currentChar: props.currentChar
    })
    .then(() => {
      props.setPage(3)
    })
  }

  return (
    <div>
      <form onSubmit={(event) => {handleSubmit(event)}}>
        {classes.map((classObject) => {
          return <Class handleClassChange={handleClassChange} key={classObject.index} classObject={classObject}/>
        })}
        <input type='submit' value='Choose your abilities'></input>
      </form>
    </div>
  )
}

export default ClassPage;