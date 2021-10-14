import React from 'react';
import { Container, Row, Card, ButtonGroup, ToggleButton, Col } from 'react-bootstrap'

const Race = (props) => {

  return (
    <Container className='border border-top' style={{border: '4px, solid, #E0E1DD'}}>
      <Row style={{padding:'4px', marginBottom: '4px'}}>
        <Col sm={2}>
          <ToggleButton
            variant='outline-secondary'
            style={{width: '100%', height: '100%', textAlign: 'left', color: '#E0E1DD' }}
            onChange={(e) => {props.handleRaceChange(e, props.index)}}
            value={JSON.stringify(props.race)}
            checked={props.index === props.radioValue}
            name='radio'
            type='radio'
          >{props.race.name}
          </ToggleButton>
        </Col>
        <Col sm={10} style={{float: 'right'}} >
            <Row style={{fontSize: '20px'}}>{props.race.alignment} {props.race.age} {props.race.size_description}</Row>
            <Row>Size: {props.race.size}</Row>
            <Row>Speed: {props.race.speed}</Row>
            <Row>Languages: {props.race.languages.map((language) => {return language.name})}</Row>
            <Row>Traits: {props.race.traits.map((trait) => {return trait.name})}</Row>
            <Row>Proficiencies: {props.race.starting_proficiencies.map((proficiency) => {return proficiency.name})}</Row>
            <Row>Ability Bonuses: {props.race.ability_bonuses.map((ab) => {return ab.name})}</Row>
            <Row>Subraces: {props.race.subraces.map((subraces) => {return subraces.name})}</Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Race;