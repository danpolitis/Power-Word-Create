import React from 'react'

const SelectAbility = (props) => {

  const onSelect = (e) => {
    props.addSelected(props.name, e.target.value)
  }

  return (
    <select onChange={(e) => {onSelect(e)}}>
      <option >Select an attribute</option>
      {props.attributes.map((attribute) => {
        return <option key={attribute.id} value={attribute.id}>{attribute.value}</option>
      })}
    </select>
  )
}

export default SelectAbility;
