import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    return (
        <div className='prd-lst-cnf'>
            <Link to='/5m-trading' className='cnf-itm'>
                <img className='cnf-icn' alt='' src={require('../../static/1.png')} />
                <p>1, 2 ka 9</p>
            </Link>
            <Link to='/color-trading' className='cnf-itm'>
                <img className='cnf-icn' alt='' src={require('../../static/5.png')} />
                <p>Rang-baazi</p>
            </Link>
            <Link to='/flight-trading' className='cnf-itm'>
                <img className='cnf-icn' alt='' src={require('../../static/2.png')} />
                <p>Pattang-baz</p>
            </Link>
        </div>
    )
}

export default ProductList