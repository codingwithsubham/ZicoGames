import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    return (
        <div className='prd-lst-cnf'>
            <Link to='/5m-trading' className='cnf-itm'>
                <img className='cnf-icn' alt='' src={require('../../static/1.png')} />
                <p>Number Game</p>
            </Link>
            <Link to='/color-trading' className='cnf-itm'>
                <img className='cnf-icn' alt='' src={require('../../static/5.png')} />
                <p>Color Game</p>
            </Link>
            <div className='cnf-itm'>
                <div className='cmg-soon'>Releasing Next Week</div>
                <img className='cnf-icn' alt='' src={require('../../static/2.png')} />
                <p>Daily Game</p>
            </div>
            <div className='cnf-itm'>
                <div className='cmg-soon'>Releasing Next Week</div>
                <img className='cnf-icn' alt='' src={require('../../static/3.png')} />
                <p>5 Hours Game</p>
            </div>
        </div>
    )
}

export default ProductList