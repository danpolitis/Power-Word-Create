import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, ToggleButtonGroup, Button, Container } from 'react-bootstrap'

import Class from './Class.jsx';

const ClassPage = (props) => {
  const [classes, setClasses] = useState([]);
  const [classObject, setClassObject] = useState({});
  const [radioValue, setRadioValue] = useState(1);

  const getClasses = () => {
    axios.get('http://localhost:3000/classes')
      .then((results) => {
        setClasses(results.data);
      })
  }

  useEffect(() => {
    getClasses();
  }, [])

  const handleClassChange = (e, index) => {
    setClassObject(e.target.value)
    setRadioValue(index)
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

  const setRadio = (index) => {
    setRadioValue(index)
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
        <ToggleButtonGroup  type='radio' name='radio' name='races' vertical='true' style={{width: '100%'}}>
          <h2 style={{textAlign: 'center', marginTop: '20px', marginLeft: '20px'}}>Choose your class</h2>
          {classes.map((classObject, i) => {
            return <Class
            style={{paddingBottom: '20px'}}
            setRadio={setRadio}
            handleClassChange={handleClassChange}
            key={i}
            index={classObject.index}
            classObject={classObject}
            radioValue={radioValue}/>
          })}
        </ToggleButtonGroup>
        <Button variant='secondary' style={{marginLeft: '89%'}} type='submit' value='Choose your abilities'>Abilities/Equipment =></Button>
      </Form>
    </Container>
  )
}

export default ClassPage;