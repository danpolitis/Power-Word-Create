import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Button, ToggleButtonGroup, Form } from 'react-bootstrap'

import { PageContext } from './PageContext.jsx';
import Race from './Race.jsx';

const RacePage = (props) => {

  const [races, setRaces] = useState([]);
  const [name, setName] = useState('');
  const [race, setRace] = useState({});
  const [radioValue, setRadioValue] = useState(1)

  const getRaces = () => {
    axios.get('http://localhost:3000/races')
      .then((results) => {
        setRaces(results.data);
      })
  }
  const setRadio = (index) => {
    setRadioValue(index)
  }

  useEffect(() => {
    getRaces();
  }, [])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleRaceChange = (e, index) => {
    setRace(e.target.value)
    setRadioValue(index)
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
    <Container style={{
      marginTop: '50px',
      color: '#E0E1DD',
      backgroundColor: '#415A77',
      border: '2px solid #0D1B2A',
      borderRadius: '1px',
      padding: '3px',
      width: '100%',
      height: '100%'
    }}>
      <Form onSubmit={(event) => {handleSubmit(event)}}>
        <Form.Group>
          <h2 style={{textAlign: 'center'}}>Choose your name</h2>
          <input style={{marginLeft: '43%'}} onChange={(e) => {handleNameChange(e)}} type='text'></input>
        </Form.Group>
        <ToggleButtonGroup type='radio' name='radio' name='races' vertical='true' style={{width: '100%'}}>
          <h2 style={{textAlign: 'center', marginTop: '20px', marginLeft: '20px'}}>Choose your race</h2>
          {races.map((race, i) => {
            return <Race
              style={{paddingBottom: '20px'}}
              setRadio={setRadio}
              handleRaceChange={handleRaceChange}
              key={i}
              index={race.index}
              race={race}
              radioValue={radioValue}
              />
          })}
        </ToggleButtonGroup>
        <Button variant='secondary' style={{marginLeft: '89%'}} type='submit' value='Choose a Class'>Choose a Class =></Button>
      </Form>
    </Container>
  )

}

export default RacePage;