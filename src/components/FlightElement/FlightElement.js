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
        <ChooseButton/>
      </div>
    </>
  )
}

export default FlightElement



// const flight = {
//   'carrier':
//     {'uid': 'KL', 'caption': 'KLM', 'airlineCode': 'KL'},
//   'price':
//     {
//       'total': {'amount': '36491', 'currency': 'руб.', 'currencyCode': 'RUB'},
//       'totalFeeAndTaxes': {'amount': '10326.00', 'currency': 'руб.', 'currencyCode': 'RUB'},
//       'rates': {
//         'totalUsd': {'amount': '453.30', 'currencyCode': 'EUR'},
//         'totalEur': {'amount': '513.96', 'currencyCode': 'USD'}
//       },
//       'passengerPrices': [{
//         'total': {'amount': '36491.00', 'currency': 'руб.', 'currencyCode': 'RUB'},
//         'passengerType': {'uid': 'ADULT', 'caption': 'Взрослый'},
//         'singlePassengerTotal': {'amount': '36491.00', 'currency': 'руб.', 'currencyCode': 'RUB'},
//         'passengerCount': 1,
//         'tariff': {'amount': '26165.00', 'currency': 'руб.', 'currencyCode': 'RUB'},
//         'feeAndTaxes': {'amount': '10326.00', 'currency': 'руб.', 'currencyCode': 'RUB'}
//       }]
//     },
//   'servicesStatuses': {
//     'baggage': {'uid': 'OFF', 'caption': 'Недоступно'},
//     'exchange': {'uid': 'FREE', 'caption': 'Бесплатно'},
//     'refund': {'uid': 'OFF', 'caption': 'Недоступно'}
//   },
//   legs: {
//     'duration': 355,
//     'segments':
//       [{
//         'classOfServiceCode': 'T',
//         'classOfService': {'uid': 'ECONOMY', 'caption': 'Эконом'},
//         'departureAirport': {'uid': 'SVO', 'caption': 'ШЕРЕМЕТЬЕВО'},
//         'departureCity': {'uid': 'MOW', 'caption': 'Москва'},
//         'aircraft': {'uid': '73В', 'caption': 'Боинг 737-700 (винглетс) Пассажирский/BBJ1'},
//         'travelDuration': 210,
//         'arrivalCity': {'uid': 'AMS', 'caption': 'АМСТЕРДАМ'},
//         'arrivalDate': '2020-08-18T19:30:00',
//         'flightNumber': '904',
//         'techStopInfos': [],
//         'departureDate': '2020-08-18T17:00:00',
//         'stops': 0,
//         'servicesDetails': {
//           'freeCabinLuggage': {},
//           'paidCabinLuggage': {},
//           'tariffName': 'ECONOMY LIGHT2',
//           'fareBasis': {'ADULT': 'TS55ABLG'},
//           'freeLuggage': {'ADULT': {'nil': true}},
//           'paidLuggage': {}
//         },
//         'airline': {'uid': 'KL', 'caption': 'KLM', 'airlineCode': 'KL'},
//         'starting': true,
//         'arrivalAirport': {'uid': 'AMS', 'caption': 'Схипхол'}
//       },
//         {
//           'classOfServiceCode': 'T',
//           'classOfService': {'uid': 'ECONOMY', 'caption': 'Эконом'},
//           'departureAirport': {'uid': 'PLK', 'caption': 'Пулково'},
//           'departureCity': {'uid': 'SPB', 'caption': 'Питер'},
//           'aircraft': {'uid': '73В', 'caption': 'Боинг 737-700 (винглетс) Пассажирский/BBJ1'},
//           'travelDuration': 145,
//           'arrivalCity': {'uid': 'AMS', 'caption': 'АМСТЕРДАМ'},
//           'arrivalDate': '2020-08-18T19:30:00',
//           'flightNumber': '904',
//           'techStopInfos': [],
//           'departureDate': '2020-08-18T17:00:00',
//           'stops': 0,
//           'servicesDetails': {
//             'freeCabinLuggage': {},
//             'paidCabinLuggage': {},
//             'tariffName': 'ECONOMY LIGHT2',
//             'fareBasis': {'ADULT': 'TS55ABLG'},
//             'freeLuggage': {'ADULT': {'nil': true}},
//             'paidLuggage': {}
//           },
//           'airline': {'uid': 'KL', 'caption': 'KLM', 'airlineCode': 'KL'},
//           'starting': true,
//           'arrivalAirport': {'uid': 'AMS', 'caption': 'Схипхол'}
//         }
//       ]
//   }
// }

