import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';

const ChooseAbilitiesPage = (props) => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [levelData, setLevelData] = useState([])
  const levels = []

  const createLevelOptions = () => {
    for (var i = 1; i < 21; i++) {
      levels.push(i)
    }
  }
  createLevelOptions();

  const handleLevelChange = (e) => {
    setCurrentLevel(e.target.value)
  }

  useEffect(() => {
    async function getInfo() {
      await props.getCharacterInfo()
    }
    getInfo();
  }, [])

  useEffect(() => {
    if (props.characterInfo[0] !== undefined) {
      getLevelData()
    }
  }, [props.characterInfo])

  const getLevelData = () => {
    axios.get(`https://www.dnd5eapi.co${props.characterInfo[0].class.class_levels}`)
      .then((results) => {
        setLevelData(results.data);
      })
  }

  return (
    <div>
      <label> Select your Level:
        <select onChange={(e) => {handleLevelChange(e)}}>
          {levels.map((level) => {
            return <option key={level} value={level}>{level}</option>
          })}
        </select>
      </label>
    </div>
  )
}

export default ChooseAbilitiesPage;