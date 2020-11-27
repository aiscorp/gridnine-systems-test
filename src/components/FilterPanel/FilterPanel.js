import classes from './FilterPanel.module.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Checker, Input, Tab, Radio} from './FilterPanel.functions'
import {updateAirlineFilter, updateSortOrder} from '../../store/actions/search'

const FilterPanel = (props) => {
  const {airlines, availableAirlines, updateAirlineFilter, updateSortOrder, filters} = props
  const [checked, setChecked] = useState(false)
  const [input, setInput] = useState('')

  const sortLabels = ['по убыванию цены', 'по возростанию цены', 'по времени в пути']

  return (
    <>
      <div className={classes.panel}>

        <Tab caption='Сортировать'>
          {sortLabels.map((el, key) => (
            <Radio checked={filters.sortOrder === el}
                   disabled={false}
                   label={el} key={key}
                   onClick={() => updateSortOrder(el)}/>
          ))}
        </Tab>

        <Tab caption='Пересадки'>
          <Checker checked={checked} disabled={false}
                   label={'нет'}
                   onClick={(s) => setChecked(s)}/>
          <Checker checked={checked} disabled={false}
                   label={'1 пересадка'}
                   onClick={(s) => setChecked(s)}/>
        </Tab>

        <Tab caption='Цена'>
          <Input value={100} disabled={false}
                 label={'от'}
                 onChange={(s) => setInput(s)}/>

          <Input value={200} disabled={false}
                 label={'до'}
                 onChange={(s) => setInput(s)}/>
        </Tab>

        <Tab caption='Авиакомпании'>
          {airlines.map((el, key) => (
            <Checker checked={filters.airline.indexOf(el) !== -1}
                     disabled={availableAirlines.indexOf(el) === -1}
                     label={el} key={key}
                     onClick={() => updateAirlineFilter(el)}/>
          ))}
        </Tab>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  airlines: state.search.airlines,
  availableAirlines: state.search.availableAirlines,
  filters: state.search.filters
})

const mapDispatchToProps = {
  updateAirlineFilter,
  updateSortOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)
