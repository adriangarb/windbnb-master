import stays from './stays.json'
import logo from './images/logo.png'
import './styles/index.scss'
import Card from './components/Card'
import { useReducer, useState } from 'react'
import Filter from './components/Filter'
function App() {
  const initialState = {
    filterLocation: 'helsinki ',
    adults: 0,
    childrens: 0
  }
  function reducer (state,action) {
    if(action.type === 'decrease_adults'){
      return {...state, adults: Math.max(state.adults -1,0)}
    }
    if(action.type === 'increase_adults'){
      return {...state, adults: state.adults +1}
    }
    if(action.type === 'decrease_childrens'){
      return {...state, childrens: Math.max(state.childrens -1,0)}
    }
    if(action.type === 'increase_childrens'){
      return {...state, childrens: state.childrens +1}
    }
    if(action.type === 'change_location'){
      return {...state, filterLocation: action.newCity}
    }
  }
  const handleIsVisible = () =>{
    setIsVissible(prevState=>!prevState)
  }
  const objectToPassToFilter = {
    filterLocation: 'Helsinki',
    adults: 0,
    childrens: 0
  }
  const [filter,dispatch] = useReducer(reducer,initialState)
  const [isVissible,setIsVissible] = useState(false)
  const [data, setData] = useState(stays);
  const [dataToFilter,setDataToFilter] = useState(objectToPassToFilter)
  return (
    <div className="App">
      <Filter setDataToFilter={setDataToFilter} setData={setData} isVissible={isVissible} filter={filter} dispatch={dispatch} handleIsVisible={handleIsVisible}/>
      <nav>
          <img src={logo} alt="asdas"/>
          <div className="App__search">
            <p onClick={handleIsVisible}>{filter.filterLocation.charAt(0).toUpperCase() + filter.filterLocation.slice(1)}, Finland</p>
            <p onClick={handleIsVisible}>{filter.adults === 0 && filter.childrens=== 0 ? 'Add Guests' : `${filter.adults+filter.childrens} guests`}</p>
            <i onClick={handleIsVisible} className="fas fa-search"></i>
          </div>
      </nav>
      <div className="App__content">
        <header>
          <h1 onClick={reducer}>Stays in Finland</h1>
          <p>{data.filter(data=>data.city.toLowerCase()===dataToFilter.filterLocation.toLowerCase()).filter(data=>data.maxGuests>=dataToFilter.adults+dataToFilter.childrens).length} stays</p>
        </header>
        <div className='App__content__cards'>
            {data.filter(data=>data.city.toLowerCase()===dataToFilter.filterLocation.toLowerCase()).filter(data=>data.maxGuests>=dataToFilter.adults+dataToFilter.childrens).map(p=><Card data={p}/>)}
        </div>
      </div>
      
    </div>
  );
}

export default App;
