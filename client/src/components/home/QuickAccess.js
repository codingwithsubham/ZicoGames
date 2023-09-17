import React from 'react';
import { Link } from "react-router-dom";

const QuickAccess = () => {
    return (
        <div className='qk-acc'>
            <div className='card-rd'>
                <h1>Quick Access</h1>
                <div className='icn-lst'>
                    <Link to="/profile" className='icn-itm'>
                        <i class="fa fa-bank" />
                        <p>Update Bank</p>
                    </Link>
                    <Link to="/wallet" className='icn-itm'>
                        <i class="fa fa-money" />
                        <p>Top-up Money</p>
                    </Link>
                    <Link to="/withdrawl" className='icn-itm'>
                        <i class="fa fa-exchange" />
                        <p>Withdraw</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default QuickAccess