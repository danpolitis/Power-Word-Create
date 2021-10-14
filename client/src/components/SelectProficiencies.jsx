import React from 'react'

const SelectProficiencies = (props) => {

  const onSelect = (e) => {
    props.saveProficiencies(props.name, e.currentTarget.value)
  }

  if (props.proficiencies === undefined) {
    return null
  }

  return (
    <select onChange={(e) => {onSelect(e)}}>
      <option >Select an item</option>
      {props.proficiencies.map((item, i) => {
        return <option key={i} value={item.url}>{item.name}</option>
      })}
    </select>
  )
}

export default SelectProficiencies;
