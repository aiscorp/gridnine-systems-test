import './App.css'
import React from 'react'
import FlightElement from './components/FlightElement/FlightElement'
import FilterPanel from './components/FilterPanel/FilterPanel'
import {connect} from 'react-redux'
import {ChooseButton} from './components/FlightElement/FlightElement.functions'
import {paginatorAddElements} from './store/actions/search'

function App(props) {
  const {filtered, paginator, paginatorAddElements} = props

  const filteredWithPaginator = filtered.slice(0, paginator)

  return (
    <div className="App">
      <FilterPanel/>
      <div className="container">
        {filteredWithPaginator.map((el, id) => (
          <FlightElement flight={el.flight} key={id}/>
        ))}
        <div style={{width: '50%', margin: '0 auto'}}>
          <ChooseButton label='Показать еще' onClick={() => paginatorAddElements(1)}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filtered: state.search.filtered,
  paginator: state.search.paginator
})

const mapDispatchToProps = {
  paginatorAddElements
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
