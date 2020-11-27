import classes from './FilterPanel.module.scss'
import React, {useState} from 'react'

export const Tab = (props) => (
  <div className={classes.tab}>
    <p>{props.caption}</p>
    {props.children}
  </div>
)

export const Checker = ({checked, label, onClick, disabled}) => {
  const cls = disabled ?
    [classes.checker, classes.disabled].join(' ') : classes.checker

  const checkerClick = (e) => {
    onClick(checked)
  }

  return (
    <div className={cls} onClick={checkerClick}>
      <input type="checkbox" checked={checked} onChange={() => {}}/>
      <span>&nbsp;&nbsp;{label}</span>
    </div>
  )
}

export const Radio = ({checked, label, onClick, disabled}) => {
  const cls = disabled ?
    [classes.radio, classes.disabled].join(' ') : classes.radio

  const radioClick = () => {
    const _checked = !checked
    onClick(_checked)
  }

  return (
    <div className={cls} onClick={radioClick}>
      <input type="radio" checked={checked} onChange={radioClick}/>
      <span>&nbsp;&nbsp;{label}</span>
    </div>
  )
}

export const Input = ({value, label, onChange, disabled}) => {
  const cls = disabled ?
    [classes.input, classes.disabled].join(' ') : classes.input

  const [input, setInput] = useState(value)

  let timeout = null

  const debounce = (value) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      onChange(value)
    }, 1000)
  }

  const onChangeHandler = (e) => {
    const value = e.target.value
    setInput(value)
    debounce(value)
  }

  return (
    <div className={cls}>
      <span>{label}&nbsp;</span>
      <input type="text" value={input} onChange={onChangeHandler}/>
    </div>
  )
}

export const panels = {
  byTarget: {
    caption: 'Сортировать',
    items: [
      {type: 'radio', checked: true, disabled: false, label: 'по возростанию цены'},
      {type: 'radio', checked: false, disabled: false, label: 'по убыванию цены'},
      {type: 'radio', checked: false, disabled: false, label: 'по времени в пути'}
    ]
  },
  bySegments: {
    caption: 'Фильтровать',
    items: [
      {type: 'checker', checked: true, disabled: false, label: 'без пересадок'},
      {type: 'checker', checked: true, disabled: false, label: '1 пересадка'},
      {type: 'checker', checked: false, disabled: true, label: '2 пересадки'}
    ]
  },
  byPrice: {
    caption: 'Цена',
    items: [
      {type: 'input', value: null, disabled: false, label: 'Цена от'},
      {type: 'input', value: null, disabled: false, label: 'Цена до'}
    ]
  },
  byAirline: {
    caption: 'Авиакомпании',
    items: [
      {type: 'checker', checked: true, disabled: false, label: 'Best airlines 1'},
      {type: 'checker', checked: true, disabled: false, label: 'Best airlines 2'},
      {type: 'checker', checked: false, disabled: true, label: 'Best airlines 3'}
    ]
  }
}
