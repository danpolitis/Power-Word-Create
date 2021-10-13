const axios = require('axios');
const path = require('path');
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pool = require('../db')

const getSpells = () => {
  axios.get('https://www.dnd5eapi.co/api/spells')
    .then((results) => {
      const queryString = 'INSERT INTO spells (index, name, url) VALUES ($1, $2, $3)'
      results.data.results.forEach((spell) => {
        const params = [spell.index, spell.name, spell.url]
        pool.query(queryString, params)
          .then((results) => {
            console.log(results)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
}

getSpells()