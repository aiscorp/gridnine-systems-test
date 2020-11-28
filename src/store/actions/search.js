import {AIRLINE_FILTER, PAGINATOR, PRICE_FILTER, SEGMENT_FILTER, SORT_ORDER} from './actionTypes'

export function updateAirlineFilter(filter) {
  return {
    type: AIRLINE_FILTER,
    data: filter
  }
}

export function updateSegmentFilter(filter) {
  return {
    type: SEGMENT_FILTER,
    data: filter
  }
}

export function updatePriceFilter(filter) {
  return {
    type: PRICE_FILTER,
    data: filter
  }
}

export function updateSortOrder(sortOrder) {
  return {
    type: SORT_ORDER,
    data: sortOrder
  }
}

export function paginatorAddElements(number) {
  return {
    type: PAGINATOR,
    data: number
  }
}
