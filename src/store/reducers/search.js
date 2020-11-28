import searchResult from '../../flights.json'
import {
  AIRLINE_FILTER, PRICE_FILTER,
  SEGMENT_FILTER, SORT_ORDER, PAGINATOR
} from '../actions/actionTypes'

const initialState = {
  data: searchResult.result.flights,
  filtered: [],
  filters: {
    sortOrder: 'по возростанию цены',
    segment: [],
    price: {},
    airline: []
  },
  airlines: {},
  availableAirlines: {},
  paginator: 3
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

    case PAGINATOR:
      return {
        ...state, paginator: state.paginator + action.data
      }

    default:
      const defaultState = {
        data: state.data,
        airlines: getAirlines(state.data),
        availableAirlines: getAirlines(state.data),
        availableSegments: getSegments(state.data),
        availablePrices: getPrices(state.data),
        filters: {...state.filters, price: getPrices(state.data)},
        paginator: state.paginator
      }
      return applyFilters(defaultState)
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

  const newState = applyFilters({
    ...state,
    filters: {...state.filters, airline: _airline}
  })

  return {
    ...newState,
    availableSegments: getSegments(newState.filtered),
    availablePrices: getPrices(newState.filtered)
  }
}

const segmentReducer = (state, action) => {
  const {segment} = state.filters
  let _segment

  if (segment.indexOf(action.data) !== -1) {
    _segment = segment.filter(el => el !== action.data)
  } else {
    _segment = [...segment, action.data]
  }

  const newState = applyFilters({
    ...state,
    filters: {...state.filters, segment: _segment}
  })

  return {
    ...newState,
    availableAirlines: getAirlines(newState.filtered),
    availablePrices: getPrices(newState.filtered)
  }
}

const priceReducer = (state, action) => {
  const newState = applyFilters({
    ...state,
    filters: {...state.filters, price: {...state.filters.price, ...action.data}}
  })

  return {
    ...newState,
    availableAirlines: getAirlines(newState.filtered),
    availableSegments: getSegments(newState.filtered)
  }
}


const sortByOrderReducer = (state, action) => {
  return applyFilters({
    ...state,
    filters: {...state.filters, sortOrder: action.data}
  })
}

const applyFilters = (state) => {
  let newFilteredData = state.data

  newFilteredData = priceFilter(newFilteredData, state.filters)

  if (state.filters.segment.length)
    newFilteredData = segmentsFilter(newFilteredData, state.filters)

  if (state.filters.airline.length)
    newFilteredData = airlineFilter(newFilteredData, state.filters)

  sortByOrder(newFilteredData, state.filters)

  return {
    ...state,
    filtered: newFilteredData,
    paginator: resetPaginator()
  }
}

const getAirlines = (data) => [...new Set(data.map(el => el.flight.carrier.caption))]

const getSegments = (data) => [...new Set(data.map(el => {
  const segTo = el.flight.legs[0].segments.length
  const segOut = el.flight.legs[1].segments.length
  return segTo > segOut ? segTo : segOut
}))]


const getPrices = (data) => {
  const res = data.map(el => el.flight.price.passengerPrices[0].singlePassengerTotal.amount)

  return {from: Math.min(...res), to: Math.max(...res)}
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

const resetPaginator = () => initialState.paginator
