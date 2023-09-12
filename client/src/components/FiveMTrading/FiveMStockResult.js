import React, { useEffect, useState } from 'react';
import FlipNumbers from "react-flip-numbers";
import { getTradeRecords } from "../../actions/fiveMTrade";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const FiveMStockResult = ({ tradingClose, timerVal, fiveMTrade: { allTrdData }, getTradeRecords }) => {
    const [ranNum, setranNum] = useState(9);
    useEffect(() => {
        getTradeRecords();
        setInterval(() => setranNum(Math.floor((Math.random() * 9) + 1)), 222);
    }, [getTradeRecords]);

    if (timerVal === 1) {
        getTradeRecords();
    }

    if(tradingClose){
        getTradeRecords();
    }

    return (
        <div className='rslt-dsply'>
            {
                tradingClose ? <div className='nmbr-flpr'>
                    <h1>Stock Rolling Onn</h1>
                    <div className='flpr'>
                        <FlipNumbers
                            play
                            color="#fff"
                            background="#333333"
                            width={50}
                            height={50}
                            numbers={`${ranNum}`}
                        />
                    </div>
                    <p>Stockes are rolled to win.</p>
                </div> : <div className='rslt-show'>
                    <h1>Last Winning Stock</h1>
                    <div className='nmbr'>
                        {allTrdData[1]?.result}
                    </div>
                    <p>It's the last winning stock number.</p>
                </div>
            }
        </div>
    )
}

FiveMStockResult.propTypes = {
    getTradeRecords: PropTypes.func.isRequired,
    fiveMTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    fiveMTrade: state.fiveMTrade,
});

export default connect(mapStateToProps, {
    getTradeRecords,
})(FiveMStockResult);