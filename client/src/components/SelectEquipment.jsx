import React from 'react'

const SelectEquipment = (props) => {

  const onSelect = (e) => {
    props.saveEquipment(props.name, e.currentTarget.value)
  }

  if (props.equipment === undefined) {
    return null
  }

  return (
    <select onChange={(e) => {onSelect(e)}}>
      <option >Select an item</option>
      {props.equipment.map((item, i) => {
        if (item.equipment === undefined) {
          return null
        }
        return <option key={i} value={item.equipment.url}>{item.equipment.name}</option>
      })}
    </select>
  )
}

export default SelectEquipment;
