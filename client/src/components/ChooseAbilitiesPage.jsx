import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import { Modal, Container, Row, Button, Col, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import SelectEquipment from './SelectEquipment.jsx'
import SelectProficiencies from './SelectProficiencies.jsx';

const ChooseAbilitiesPage = (props) => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [levelData, setLevelData] = useState([])
  const [currentLevelData, setCurrentLevelData] = useState([])
  const [characterData, setCharacterData] = useState ([])
  const [description, setDescription] = useState({})
  const [show, setShow] = useState(false);
  const [profNumber, setProfNumber] = useState(0)
  const [equipment, setEquipment] = useState({})
  const [proficiencies, setProficiencies] = useState({})

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const changePage = () => {
    props.setPage(4)
  }
  let levels = [];
  const createLevelOptions = () => {
    for (var i = 1; i < 21; i++) {
      levels.push(i)
    }
  }
  createLevelOptions();

  const handleLevelChange = (e) => {
    setCurrentLevel(e.target.value)
  }

  const getCharacterInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/characters', {
        params: {
          id: props.currentChar
        }
      })
      setCharacterData(response.data.rows)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCharacterInfo()
  }, [])

  useEffect(() => {
    if (characterData[0] !== undefined) {
      getLevelData()
      setProfNumber(characterData[0].class.proficiency_choices[0].choose)
    }
  }, [characterData])

  const getLevelData = async () => {
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${characterData[0].class.class_levels}`)
      setLevelData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const filterByLevel = () => {
    const data = levelData.filter(level => level.level <= currentLevel)
    const featureArray = []
    data.forEach((level) => {
      level.features.forEach((feature) => {
        featureArray.push(feature)
      })
    })
    setCurrentLevelData(featureArray);
  }

  useEffect(() => {
    filterByLevel()
  }, [currentLevel, levelData])

  const handleFeatureClick = (e) => {
    axios.get(`https://www.dnd5eapi.co${e.target.value}`)
      .then((results) => {
        setDescription(results.data)
        handleShow()
      })
  }

  const saveEquipment = (name, value) => {
    setEquipment({...equipment, [name]: value})
  }

  const saveProficiencies = (name, value) => {
    setProficiencies({...proficiencies, [name]: value})
  }

  if (characterData[0] === undefined) {
    return null
  }
  if (characterData[0].class.proficiency_choices === undefined) {
    return null
  }
  if (description === undefined) {
    return null
  }
  return (
    <div >
      <Container styles={{backgroundColor: '#415A77'}}>
        <Row>
          <h3> Select your Level: </h3>
            <select onChange={(e) => {handleLevelChange(e)}}>
              {levels.map((level) => {
                return <option key={level} value={level}>{level}</option>
              })}
            </select>
          <h2>Choose your proficiencies:</h2>
          {characterData[0].class.proficiency_choices.map((choice, i) => {
            return (
              <Col key={i}>
                <Row>{`Profiency`} </Row>
                <Row>
                <SelectProficiencies
                  name={i}
                  proficiencies={choice.from}
                  saveProficiencies={saveProficiencies}/>
                </Row>
              </Col>
            )
          })}
        </Row>
      </Container>
      <Container>
        <h2> Class Features: </h2>
          <Row>
            {currentLevelData.map((feature, i) => {
              return (
              <Card style={{textAlign: 'center'}} key={i}>
                <Row>{feature.name}</Row>
                <Button variant='secondary' onClick={handleFeatureClick} value={feature.url}>Learn More</Button>
              </Card>
              )
            })}
          </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{description.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              Level: {description.level}
            </Row>
            <Row>
              {description.desc}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Container>
        <Row>
          <h2>Choose Your Equipment:</h2>
          {characterData[0].class.starting_equipment_options.map((choice, i) => {
            return (
              <Col key={i}>
                <Row>{`Item ${i+1}`}</Row>
                <Row id='equipment_dropdowns'>
                  <SelectEquipment
                    name={i}
                    equipment={choice.from}
                    saveEquipment={saveEquipment}
                  />
                </Row>
              </Col>
            )
          })}
        </Row>
      </Container>
      <Button variant="secondary" style={{marginLeft: '75%'}} onClick={changePage}>Set your ability scores =></Button>{' '}
    </div>
  )
}

export default ChooseAbilitiesPage;