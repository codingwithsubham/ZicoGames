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
                <p>Patang-baz</p>
            </Link>
            <div className='cnf-itm'>
                <div className='cmg-soon'>Coming Soon</div>
                <img className='cnf-icn' alt='' src={require('../../static/3.png')} />
                <p>Satte-pe-stta</p>
            </div>
            <div className='cnf-itm'>
                <div className='cmg-soon'>Coming Soon</div>
                <img className='cnf-icn' alt='' src={require('../../static/4.png')} />
                <p>Dil-khush</p>
            </div>
            <div className='cnf-itm'>
                <div className='cmg-soon'>Coming Soon</div>
                <img className='cnf-icn' alt='' src={require('../../static/6.png')} />
                <p>Maza ma</p>
            </div>
        </div>
    )
}

export default ProductList