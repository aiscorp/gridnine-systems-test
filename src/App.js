import './App.css'
import React from 'react'
import FlightElement from './components/FlightElement/FlightElement'
import FilterPanel from './components/FilterPanel/FilterPanel'
import {connect} from 'react-redux'

function App(props) {
  const {filtered} = props

  return (
    <div className="App">
      <FilterPanel/>
      <div className="container">
        {filtered.map((el, id) => (
          <FlightElement flight={el.flight} key={id}/>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filtered: state.search.filtered
})

export default connect(mapStateToProps, null)(App)
