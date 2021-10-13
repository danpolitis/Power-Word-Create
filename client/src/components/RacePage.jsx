import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { PageContext } from './PageContext.jsx';
import Race from './Race.jsx';

const RacePage = (props) => {

  const [races, setRaces] = useState([]);
  const [name, setName] = useState('');
  const [race, setRace] = useState({});

  const getRaces = () => {
    axios.get('http://localhost:3000/races')
      .then((results) => {
        setRaces(results.data);
      })
  }

  useEffect(() => {
    getRaces();
  }, [])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleRaceChange = (e) => {
    setRace(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/characters/race', {
      name: name,
      race: race
    })
    .then((results) => {
      props.setCurrentChar(results.data.rows[0].id)
    })
    .then(() => {
      props.setPage(2)
    })
  }

  return (
    <div>
      <div>
        <form onSubmit={(event) => {handleSubmit(event)}}>
          <label>Choose your name:</label>
          <input onChange={(e) => {handleNameChange(e)}} type='text'></input>
          {races.map((race) => {
            return <Race handleRaceChange={handleRaceChange} key={race.index} race={race}/>
          })}
          <input type='submit' value='Choose a Class'></input>
        </form>
      </div>
    </div>
  )

}

export default RacePage;