import classes from './FlightElement.module.scss'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {faClock} from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

export const Header = ({carrier, price}) => (
  <div className={classes.header}>
    <div className={classes.carrier}>
      <img
        src={`https://www.skyscanner.net/images/airlines/small/${carrier.airlineCode}.png`}
        alt={carrier.airlineCode}/>
    </div>
    <div className={classes.cost}>
      <span>
        {Math.round(price.passengerPrices[0].singlePassengerTotal.amount)}
        &nbsp;
        {price.passengerPrices[0].singlePassengerTotal.currency}</span>
      <small>Стоимость расчитана на одного взрослого пассажира</small>
    </div>
  </div>
)

export const Leg = ({legs}) => {
  const firstSegment = legs.segments[0]
  const lastSegment = legs.segments.length > 0 ?
    legs.segments[legs.segments.length - 1] : firstSegment
  const segments = legs.segments.length > 1 ?
    <span>{legs.segments.length - 1} пересадка</span> : ''

  return (
    <div className={classes.leg}>
      <div className={classes.line}>
        <span>{firstSegment.departureCity ? firstSegment.departureCity.caption : 'err'},&nbsp;</span>
        <span>{firstSegment.departureAirport.caption}&nbsp;</span>
        <span className={classes.info}>({firstSegment.departureAirport.uid})&nbsp;</span>
        <FontAwesomeIcon className={classes.arrow} size="1x" icon={faLongArrowAltRight}/>&nbsp;
        <span>{lastSegment.arrivalCity ? lastSegment.arrivalCity.caption : 'err'},&nbsp;</span>
        <span>{lastSegment.arrivalAirport.caption}&nbsp;</span>
        <span className={classes.info}>({lastSegment.arrivalAirport.uid})</span>
      </div>
      <div className={classes.underline}/>
      <div className={classes.scheduleLine}>
        <div>
          <span>
            {moment(firstSegment.departureDate).format('LT')}&nbsp;
          </span>
          <span className={classes.info}>
            {moment(firstSegment.departureDate).format('D MMM dd')}
          </span>
        </div>
        <div>
          <FontAwesomeIcon size="1x" icon={faClock}/>&nbsp;
          <span>
            {Math.floor(legs.duration / 60)}&nbsp;ч&nbsp;
            {legs.duration % 60}&nbsp;мин
          </span>
        </div>
        <div>
          <span className={classes.info}>
            {moment(lastSegment.arrivalDate).format('D MMM dd')}
            &nbsp;</span>
          <span>
            {moment(lastSegment.arrivalDate).format('LT')}
            </span>
        </div>
      </div>
      <div className={classes.segmentsLine}>
        {segments}
      </div>
      <div className={classes.line}>
        <span>Рейс выполняет:
          {firstSegment.airline.airlineCode}&nbsp;{firstSegment.airline.caption}</span>
      </div>
    </div>
  )
}

export const ChooseButton = ({label, onClick}) => {
  return (
    <div className={classes.chooseButton} onClick={onClick}>
      {label}
    </div>
  )
}
