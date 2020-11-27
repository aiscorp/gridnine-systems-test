import {AIRLINE_FILTER, FILTERED_DATA, SORT_ORDER} from './actionTypes'

export function updateFilters(filters) {
  return async dispatch => {
    dispatch(updateFilteredData())
  }
}



export function updateFilteredData() {
  return {
    type: FILTERED_DATA,
    data: null
  }
}

export function updateAirlineFilter(filter) {
  return {
    type: AIRLINE_FILTER,
    data: filter
  }
}

export function updateSortOrder(sortOrder) {
  return {
    type: SORT_ORDER,
    data: sortOrder
  }
}
