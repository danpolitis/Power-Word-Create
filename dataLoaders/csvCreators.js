const axios = require('axios');
const path = require('path');
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pool = require('../db')

let raceIndexes;
let races = [];

const getRaceData = (index) => (axios.get(`https://www.dnd5eapi.co/api/races/${index}`)
  .then(({ data }) => (data)))
  .catch((err) => (console.log(err)));

const getRaces = () => {
  let raceIndexes;

  axios.get('https://www.dnd5eapi.co/api/races')
    .then((results) => {
      raceIndexes = results.data.results;
    })
    .then(() => {
      const indexSet = new Set(raceIndexes)
      const indexArray = Array.from(indexSet);
      const racePromises = indexArray.map((item) => (getRaceData(item.index)));
      (Promise.all(racePromises))
        .then((results) => {
          const header = Object.keys(results[0])
          const queryString = 'INSERT INTO races (index, name, speed, ability_bonuses, alignment, age, size, size_description, starting_proficiencies, languages, language_desc, traits, subraces, url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'
          results.forEach((race) => {
            const params = [race.index, race.name, race.speed, race.ability_bonuses, race.alignment, race.age, race.size, race.size_description, race.starting_proficiencies, race.languages, race.language_desc, race.traits, race.subraces, race.url]
            pool.query(queryString, params)
              .then((results) => {
                console.log(results)
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
      })
    }

    getRaces();

    // const csvWriter = createCsvWriter({
    //   path: path.resolve(__dirname, '..', 'DNDdata', 'races.csv'),
    //   header: header
    // })

    // csvWriter.writeRecords(results)
    //   .then(() => {
    //     console.log('...Done');
    //   });

    // const replacer = (key, value) => value === null ? '' : value

    // const csv = [
    //   ... results.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join('|'))
    // ].join('\r\n')
    // const writeData = fs.createWriteStream(path.resolve(__dirname, '..', 'DNDdata', 'races.csv'));
    // const fixedCSV = csv.replace(/\[/g, '{').replace(/\]/g, '}')
    // writeData.write(fixedCSV);