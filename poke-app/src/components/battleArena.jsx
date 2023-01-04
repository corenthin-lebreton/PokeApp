import React from 'react';
import "../styles/pokebattle.scss"

const BattleArena = () => {
    return (
        <div>
           <div className='terrain'>
                <div className='ligne-terrain-top'></div>
                <div className='ligne-terrain-bottom'></div>
                <div className='ligne-terrain-left'></div>
                <div className='ligne-terrain-right'></div>
                <div className='ligne-terrain-middle-top'></div>
                <div className='ligne-terrain-middle-bottom'></div>
                <div className='middle-circle'></div>
                <div className='middle-circle-ligne-top'></div>
                <div className='middle-circle-ligne-bottom'></div>
                <div className='little-middle-circle'></div>
                <div className='white-part'></div>
                <div className='red-part'></div>
                <div className='pokemon-post-1'></div>
                <div className='pokemon-post-2'></div>
           </div>
        </div>
    );
};

export default BattleArena;