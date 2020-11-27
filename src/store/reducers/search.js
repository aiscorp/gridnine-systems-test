import searchResult from '../../flights.json'
import {AIRLINE_FILTER, AIRLINES, FILTERED_DATA, SORT_ORDER} from '../actions/actionTypes'

const initialState = {
  data: searchResult.result.flights.slice(0, 50),
  filtered: [],
  filters: {
    sortOrder: 'по убыванию цены',
    segment: [1, 2],
    price: {from: 0, to: 200000},
    airline: []
  },
  airlines: {}
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FILTERED_DATA:
      return {
        ...state, filtered: getFilteredData(state)
      }
    case AIRLINE_FILTER:
      return airlineFilterReducer(state, action)

    case SORT_ORDER:
      const _filters = {...state.filters, sortOrder: action.data}
      return {
        ...state,
        filters: _filters,
        filtered: sortByOrder(state.filtered, _filters)
      }

    case AIRLINES:
      return {
        ...state, airlines: action.data
      }
    default:
      return {
        data: state.data,
        filtered: getFilteredData(state),
        airlines: getAirlines(state.data),
        availableAirlines: getAirlines(getFilteredData(state)),
        filters: state.filters
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

const applyFilters = (state) => {
  let filteredData = state.data
  if (state.filters.airline.length)
    filteredData = airlineFilter(state.data, state.filters)

  priceFilter(state.filtered, state.filters)

  sortByOrder(state.filtered, state.filters)

  return {
    ...state,
    filtered: filteredData
  }
}

const getAirlines = (data) => {
  return [...new Set(data.map(el => el.flight.carrier.caption))]
}

const getFilteredData = (state) => {
  let filteredData = state.data
  if (state.filters.airline.length)
    filteredData = airlineFilter(state.data, state.filters)

  return filteredData
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
  return data.filter(el => filters.segment.indexOf(el.flight.carrier.caption) !== -1)
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
