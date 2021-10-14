import React from 'react';
import { Container, Row, Card, ButtonGroup, ToggleButton, Col } from 'react-bootstrap'

const Class = (props) => {

  return (
    <Container className='border border-top' style={{border: '4px, solid, #E0E1DD'}}>
      <Row style={{padding:'4px', marginBottom: '4px'}}>
        <Col sm={2}>
          <ToggleButton
            variant='outline-secondary'
            style={{width: '100%', height: '100%', textAlign: 'left', color: '#E0E1DD' }}
            onChange={(e) => {props.handleClassChange(e, props.index)}}
            value={JSON.stringify(props.classObject)}
            checked={props.index === props.radioValue}
            name='radio'
            type='radio'
          >
            {props.classObject.name}
          </ToggleButton>
        </Col>
        <Col sm={10} style={{float: 'right'}} >
          <Row>Hit Die: {props.classObject.hit_die}</Row>
          <Row>Proficiencies: {props.classObject.proficiencies.map((proficiency) => {return proficiency.name})}</Row>
          <Row>Saving Throws: {props.classObject.saving_throws.map((throws) => {return throws.name})}</Row>
          <Row>Starting Equipment: {props.classObject.starting_equipment.map((item) => {return item.name})}</Row>
          <Row>Subclasses: {props.classObject.subclasses.map((subclass) => {return subclass.name})}</Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Class;