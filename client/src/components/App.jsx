import React, { useState, useEffect, useContext } from 'react';
import { PageContext } from './PageContext.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime';

import LandingPage from './LandingPage.jsx';
import RacePage from './RacePage.jsx';
import ClassPage from './ClassPage.jsx';
import ChooseAbilitiesPage from './ChooseAbilitiesPage.jsx';

const App = () => {
  const {page, setPage} = useContext(PageContext);
  const [currentChar, setCurrentChar] = useState(-1);
  const [characterInfo, setCharacterInfo] = useState({});
  const [levelData, setLevelData] = useState([]);

  const getCharacterInfo = () => {
    axios.get('http://localhost:3000/characters', {
      params: {
        id: currentChar
      }
    })
      .then((results) => {
        setCharacterInfo(results.data.rows)
      })
  }

  // useEffect(() => {
  //   getCharacterInfo()
  // }, [page])

  const renderPage = () => {
    if (page === 0) {
      return (
        <LandingPage/>
      )
    } else if (page === 1) {
      return (
        <RacePage setCurrentChar={setCurrentChar} setPage={setPage}/>
      )
    } else if (page === 2) {
      return (
        <ClassPage currentChar={currentChar} setPage={setPage} getCharacterInfo={getCharacterInfo} />
      )
    } else if (page === 3) {
      return (
        <ChooseAbilitiesPage characterInfo={characterInfo} getCharacterInfo={getCharacterInfo} />
      )
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  )
}

export default App;