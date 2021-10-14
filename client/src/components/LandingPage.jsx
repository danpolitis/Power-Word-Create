import React, { useState, useContext, useEffect } from 'react';
import { PageContext } from './PageContext.jsx';
import { Container, Row, Button, Col } from 'react-bootstrap';

const LandingPage = (props) => {
  const { page, setPage } = useContext(PageContext);
  const [currentPage, setCurrentPage] = useState(page);

  const changePage = () => {
    setCurrentPage(1)
  }

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  return (
    <>
      <Container style={{
        marginTop: '350px',
        color: '#0D1B2A',
        backgroundColor: '#EBEFBF',
        border: '2px solid #0D1B2A',
        borderRadius: '1px'
      }}>
        <Row className='card' style={{textAlign: 'center', height: '400px', paddingTop:'16%'}}>
          <h1 className='card-title'>
            Welcome to Power Word Create!
          </h1>
          <div className='cart-text' style={{paddingBottom: '10px'}}>
            Click the create character button to begin.
          </div>
        <Button variant="secondary" style={{width: '20%', margin: '0 auto', backgroundColor: '#1B263B', color: '#E0E1DD'}} onClick={changePage}>Create Character</Button>
        </Row>
      </Container>
    </>
  )
}

export default LandingPage