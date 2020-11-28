import React from 'react'
import {ChooseButton, Header, Leg} from './FlightElement.functions'
import classes from './FlightElement.module.scss'

const FlightElement = (props) => {
  const {flight} = props
  const {carrier, price, legs} = flight

  return (
    <>
      <div className={classes.flight}>
        <Header carrier={carrier} price={price}/>
        <Leg legs={legs[0]}/>
        <Leg legs={legs[1]}/>
        <ChooseButton label='ВЫБРАТЬ' onClick={() => {alert(carrier.caption)}}/>
      </div>
    </>
  )
}

export default FlightElement
