import React from 'react';
function Card(props) {
  return <div className='App__content__cards__card'>
        <img src={props.data.photo} alt="" />
        <div className='App__content__cards__card__top'>
            <div>
                {props.data.superHost && <span className='superhost'>SUPER HOST</span>}
                <span className='rooms'>
                    {props.data.type}
                    {props.data.beds!==null && <span> . {props.data.beds} beds</span>}
                </span>
            </div>
            <p><i class="fas fa-star"></i>{props.data.rating}</p>
        </div>
        <p>{props.data.title}</p>
  </div>;
}

export default Card;
