import './App.css'
import React, {useEffect} from 'react'
import FlightElement from './components/FlightElement/FlightElement'
import FilterPanel from './components/FilterPanel/FilterPanel'
import {updateFilteredData} from './store/actions/search'
import {connect} from 'react-redux'

function App(props) {
  const flights = props.data
  const {airlines, filtered, filters}  = props

  useEffect(() => {
    // fetchReadings().then(() => {
    //   setLoading(false)
    // })
  }, [filtered, filters])


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
  filters: state.search.filters,
  filtered: state.search.filtered,
  data: state.search.data,
  airlines: state.search.airlines
})

const mapDispatchToProps = {
  updateFilteredData
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
