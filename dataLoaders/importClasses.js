const axios = require('axios');
const path = require('path');
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pool = require('../db')

const getClassData = (index) => (axios.get(`https://www.dnd5eapi.co/api/classes/${index}`)
  .then(({ data }) => (data)))
  .catch((err) => (console.log(err)));

const getClasses = () => {
  let classIndexes;

  axios.get('https://www.dnd5eapi.co/api/classes')
    .then((results) => {
      classIndexes = results.data.results;
    })
    .then(() => {
      const indexSet = new Set(classIndexes)
      const indexArray = Array.from(indexSet);
      const classPromises = indexArray.map((item) => (getClassData(item.index)));
      (Promise.all(classPromises))
        .then((results) => {
          const queryString = 'INSERT INTO classes (index, name, hit_die, proficiency_choices, proficiencies, saving_throws, starting_equipment, starting_equipment_options, class_levels, subclasses, url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
          results.forEach((item) => {
            const params = [item.index, item.name, item.hit_die, item.proficiency_choices, item.proficiencies, item.saving_throws, item.starting_equipment, item.starting_equipment_options, item.class_levels, item.subclasses, item.url]
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

getClasses()