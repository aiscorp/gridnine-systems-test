import searchResult from '../../flights.json'
import {
  AIRLINE_FILTER,
  AIRLINES,
  PRICE_FILTER,
  SEGMENT_FILTER,
  SORT_ORDER
} from '../actions/actionTypes'

const initialState = {
  data: searchResult.result.flights,
  filtered: [],
  filters: {
    sortOrder: 'по возростанию цены',
    segment: [],
    price: {from: 0, to: 50000},
    airline: []
  },
  airlines: {},
  availableAirlines: {}
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case AIRLINE_FILTER:
      return airlineFilterReducer(state, action)

    case SEGMENT_FILTER:
      return segmentReducer(state, action)

    case PRICE_FILTER:
      return priceReducer(state, action)

    case SORT_ORDER:
      return sortByOrderReducer(state, action)

    case AIRLINES:
      return {
        ...state, airlines: action.data
      }

    default:
      return {
        data: state.data,
        filtered: applyFilters(state).filtered,
        airlines: getAirlines(state.data),
        availableAirlines: getAirlines(state.data),
        availableSegments: getSegments(state.data),
        availablePrices: getPrices(state.data),
        filters: {...state.filters, price: getPrices(state.data)}
      }
  }
}

const airlineFilterReducer = (state, action) => {
  const {airline} = state.filters

  let _airline
  if (airline.indexOf(action.data) !== -1) {
    _airline = airline.filter(el => el !== action.data)
  } else {
    _airline = [...airline, action.data]
  }

  return applyFilters({
    ...state,
    filters: {...state.filters, airline: _airline}
  })
}

const segmentReducer = (state, action) => {
  const {segment} = state.filters
  let _segment

  if (segment.indexOf(action.data) !== -1) {
    _segment = segment.filter(el => el !== action.data)
  } else {
    _segment = [...segment, action.data]
  }

  return applyFilters({
    ...state,
    filters: {...state.filters, segment: _segment}
  })
}

const priceReducer = (state, action) => (applyFilters({
  ...state,
  filters: {...state.filters, price: {...state.filters.price, ...action.data}}
}))


const sortByOrderReducer = (state, action) => {
  return applyFilters({
    ...state,
    filters: {...state.filters, sortOrder: action.data}
  })
}

const applyFilters = (state) => {
  let filteredData = state.data

  if (state.filters.airline.length)
    filteredData = airlineFilter(filteredData, state.filters)

  filteredData = priceFilter(filteredData, state.filters)

  if (state.filters.segment.length)
    filteredData = segmentsFilter(filteredData, state.filters)

  sortByOrder(filteredData, state.filters)

  return {
    ...state,
    filtered: filteredData,
    availableAirlines: getAirlines(filteredData),
    availableSegments: getSegments(filteredData),
    availablePrices: getPrices(filteredData)
  }
}

const getAirlines = (data) => [...new Set(data.map(el => el.flight.carrier.caption))]

const getSegments = (data) =>  [...new Set(data.map(el => {
    const segTo = el.flight.legs[0].segments.length
    const segOut = el.flight.legs[1].segments.length
    return segTo > segOut ? segTo : segOut
  }))]


const getPrices = (data) => {
  const res = data.map(el => el.flight.price.passengerPrices[0].singlePassengerTotal.amount)

  const minmax = {from: Math.min(...res), to: Math.max(...res)}

  console.log(minmax)
  return minmax
}

const airlineFilter = (data, filters) => {
  return data.filter(el => filters.airline.indexOf(el.flight.carrier.caption) !== -1)
}

const priceFilter = (data, filters) => {
  return data.filter(el => {
    const ticketPrice = el.flight.price.passengerPrices[0].singlePassengerTotal.amount
    const filterPrice = filters.price

    return ticketPrice > filterPrice.from && ticketPrice < filterPrice.to
  })
}

const segmentsFilter = (data, filters) => {
  return data.filter(el => {
    const segTo = el.flight.legs[0].segments.length
    const segOut = el.flight.legs[1].segments.length
    const seg = segTo > segOut ? segTo : segOut  // наибольшее кол-во сегментов полета (1 или 2)

    return filters.segment.indexOf(seg) !== -1
  })
}

const sortByOrder = (data, filters) => {
  switch (filters.sortOrder) {
    case 'по убыванию цены':
      return data.sort((a, b) => {
        return b.flight.price.passengerPrices[0].singlePassengerTotal.amount
          - a.flight.price.passengerPrices[0].singlePassengerTotal.amount
      })
    case 'по возростанию цены':
      return data.sort((a, b) => {
        return a.flight.price.passengerPrices[0].singlePassengerTotal.amount
          - b.flight.price.passengerPrices[0].singlePassengerTotal.amount
      })
    case 'по времени в пути':
      return data.sort((a, b) => {
        const durA = a.flight.legs.reduce((prev, el) => prev + el.duration, 0)
        const durB = b.flight.legs.reduce((prev, el) => prev + el.duration, 0)
        return durA - durB
      })
    default:
      return data
  }
}
