import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, DropdownButton, Dropdown, Form } from 'react-bootstrap';

import SelectAbility from './SelectAbility.jsx';

const AbilityScores = () => {
  const [randomRolls, setRandomRolls] = useState([]);
  const [usingStandard, setUsingStandard] = useState(true);
  const [selected, setSelected] = useState({});
  const [filteredAttributes, setFilteredAttributes] = useState([]);

  const standardArray = [15, 14, 13, 12, 10, 8];
  const attributes = [
    {
      id: 'strength',
      value: 'Strength'
    },
    {
      id: 'dexterity',
      value: 'Dexterity'
    },
    {
      id: 'constitution',
      value: 'Constitution'
    },
    {
      id: 'wisdom',
      value: 'Wisdom'
    },
    {
      id: 'inteligence',
      value: 'Inteligence'
    },
    {
      id: 'charisma',
      value: 'Charisma'
    },
  ]

  const fourD6 = () => {
    const fourD6 = Math.floor(Math.random() * (6 - 1) + 1) + Math.floor(Math.random() * (6 - 1) + 1) + Math.floor(Math.random() * (6 - 1) + 1) + Math.floor(Math.random() * (6 - 1) + 1);
    return fourD6;
  }

  const roll = () => {
    let roll_1 = fourD6();
    let roll_2 = fourD6();
    let roll_3 = fourD6();
    let roll_4 = fourD6();
    let roll_5 = fourD6();
    let roll_6 = fourD6();
    setRandomRolls([roll_1, roll_2, roll_3, roll_4, roll_6, roll_6])
  }

  const selectStandard = () => {
    setUsingStandard(true);
  }

  const selectRandom = () => {
    setUsingStandard(false);
  }

  const addSelected = (name, value) => {
    setSelected({...selected, [name]: value})
  }

  const getFilteredAttributes = (name) => {
    const removedAttributes = { ...selected };
    delete removedAttributes[name];
    const removedAttributesList = Object.values(removedAttributes);
    return attributes.filter(item => {
      return !removedAttributesList.includes(item.id)
    });
  }

  const getValue = (name) => {
    return selected[name]
  }

  useEffect(() => {
    getFilteredAttributes()
  }, [selected])

  return(
    <Container >
      <h1 styles={{marginBottom: '26px'}}>Roll for your ability scores!</h1>
      <p styles={{marginBottom: '16px'}}>The standard array for abilitiy scores is: 15, 14, 13, 12, 10, 8. {'\n'} You can use these or roll for random scores. {'\n'} Fill in the values based on what you'll need to be an effective adventurer.</p>
      <Button styles={{marginBottom: '16px'}} variant='secondary' onClick={roll}>Roll!</Button>
      <h2>Your random abilitiy scores are {randomRolls[0]}, {randomRolls[1]}, {randomRolls[2]}, {randomRolls[3]}, {randomRolls[4]}, {randomRolls[5]}</h2>
      <DropdownButton variant='secondary' id="dropdown-basic-button" title="Choose your array">
        <Dropdown.Item onSelect={selectStandard}>Standard Array</Dropdown.Item>
        <Dropdown.Item onSelect={selectRandom}>Random Array</Dropdown.Item>
      </DropdownButton>
      <Container>
        <Row>
          {
            (usingStandard === true)
              ? standardArray.map((number, i) => {
                  return (
                  <Col key={i}>
                    <Row>{number}</Row>
                    <Row>
                      <SelectAbility
                        name={i}
                        addSelected={addSelected}
                        attributes={getFilteredAttributes(i)}
                        value={getValue(i)}
                      />
                    </Row>
                  </Col>
                )
              })
              : randomRolls.map((number, i) => {
                  return (
                  <Col key={i}>
                    <Row>{number}</Row>
                    <Row id='ability_dropdowns'>
                      <SelectAbility
                        name={i}
                        addSelected={addSelected}
                        attributes={getFilteredAttributes(i)}
                        value={getValue(i)}
                      />
                    </Row>
                  </Col>
                  )
              })
          }
        </Row>
        <Row>

        </Row>
      </Container>
    </Container>
  )
}

export default AbilityScores;