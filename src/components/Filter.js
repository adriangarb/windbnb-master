import React,{useState} from 'react';
import stays from '../stays.json'
function Filter({filter,dispatch,handleIsVisible,isVissible,setData,setDataToFilter}) {
  const [isLocationVissible, setIsLocationVissible] = useState(false);
  const [isGuestsVissible, setIsGuestsVissible] = useState(false);
  const handleLocation = () =>{
    setIsLocationVissible(prevState=>!prevState)
    setIsGuestsVissible(false)
  }
  const handleGuests = () =>{
    setIsGuestsVissible(prevState=>!prevState)
    setIsLocationVissible(false)
  }
  const handleSearch = () =>{
    setIsGuestsVissible(false)
    setIsLocationVissible(false)
    handleIsVisible()
    setDataToFilter(filter)
  }
  const handleChangeLocation = (city) =>{
    dispatch({type: 'change_location', newCity: city})
  }
  return <div className={isVissible===true ? 'App__filter__vissible' : 'App__filter'}>
      <div className='App__filter__vissible__menu'>
        <i onClick={handleIsVisible} className="fas fa-times"></i>
        <div className="App__filter__vissible__menu__buttons">
          <div onClick={handleLocation} className="App__filter__vissible__menu__buttons__button">
            <button>
              <span>Location</span>
              <span>{filter.filterLocation.charAt(0).toUpperCase() + filter.filterLocation.slice(1)}, Finland</span>
            </button>
            {isLocationVissible &&
            <div className='App__filter__vissible__menu__buttons__button__locations'>
              {[...new Set(stays.map(p=>p.city))].sort().map(city=>
                (<p onClick={()=>handleChangeLocation(city)}><i className="fas fa-map-marker-alt"></i>{city}, Finland</p>))}
            </div>}
          </div>
          <div className="App__filter__vissible__menu__buttons__button">
            <button onClick={handleGuests}>
              <span>Guests</span>
              <span>{filter.adults + filter.childrens}</span>
            </button>
              {isGuestsVissible &&
              <div className='App__filter__vissible__menu__buttons__button__guests'>
                <div>
                  <p>Adults</p>
                  <p>Ages for above 13</p>
                  <div> 
                    <button onClick={()=>dispatch({type: 'decrease_adults'})}>-</button>
                    <span>{filter.adults}</span>
                    <button onClick={()=>dispatch({type: 'increase_adults'})}>+</button>
                  </div>
                </div>
                <div>
                  <p>Children</p>
                  <p>Ages 2-12</p>
                  <div>
                    <button onClick={()=>dispatch({type: 'decrease_childrens'})}>-</button>
                    <span>{filter.childrens}</span>
                    <button onClick={()=>dispatch({type: 'increase_childrens'})}>+</button>
                  </div>
                </div>
              </div> }
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
  </div>;
}

export default Filter;
