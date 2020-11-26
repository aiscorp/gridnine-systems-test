import classes from './FilterPanel.module.scss'
import React, {useState} from 'react'
import data from '../../flights.json'
import {Checker, Input, Tab, Radio} from './FilterPanel.functions'

const FilterPanel = (props) => {
  const [checked, setChecked] = useState(false)
  const [input, setInput] = useState('')

  console.log(input)

  return (
    <>
      <div className={classes.panel}>

        <Tab caption='Сортировать'>
          <Radio checked={checked} disabled={false}
                 label={'по убыванию цены'}
                 onClick={(s) => setChecked(s)}/>
          <Radio checked={checked} disabled={false}
                 label={'по возростанию цены'}
                 onClick={(s) => setChecked(s)}/>
          <Radio checked={checked} disabled={false}
                 label={'по времени в пути'}
                 onClick={(s) => setChecked(s)}/>
        </Tab>

        <Tab caption='Фильтровать'>
          <Checker checked={checked} disabled={false}
                   label={'без пересадок'}
                   onClick={(s) => setChecked(s)}/>
          <Checker checked={checked} disabled={false}
                   label={'1 пересадка'}
                   onClick={(s) => setChecked(s)}/>
        </Tab>

        <Tab caption='Цена'>
          <Input value={100} disabled={false}
                 label={'Цена от'}
                 onChange={(s) => setInput(s)}/>

          <Input value={200} disabled={false}
                 label={'Цена до'}
                 onChange={(s) => setInput(s)}/>
        </Tab>

        <Tab caption='Авиакомпании'>
          <Checker checked={checked} disabled={false}
                   label={'Компания 1'}
                   onClick={(s) => setChecked(s)}/>
          <Checker checked={checked} disabled={true}
                   label={'Компания 2'}
                   onClick={(s) => setChecked(s)}/>
          <Checker checked={checked} disabled={false}
                   label={'Компания 3'}
                   onClick={(s) => setChecked(s)}/>
        </Tab>
      </div>
    </>
  )
}

export default FilterPanel
