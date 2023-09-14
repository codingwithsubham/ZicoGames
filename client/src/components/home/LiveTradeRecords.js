import React from 'react'
import { shuffle } from "../../common/functions";
import namesData from "../../common/randomData.json";

const LiveTradeRecords = ({ data }) => {
    const names = shuffle(namesData?.names);
  return (
    <div className='win-lst'>
            <h1>Leaderboard</h1>
            <marquee className="win-marq" direction="up">
                {/* {
                    data?.map((itm, idx) => (
                        <div className='win-itm' key={idx}>
                            <h3>{itm?.user?.name}</h3>
                            <p>{itm?.trdType}</p>
                            <p style={{
                                color: parseInt(itm?.tradingData?.amnt) % 3 !== 0 ? "green" : "red"
                            }}>{itm?.tradingData?.amnt}</p>
                        </div>
                    ))
                } */}
                {
                    names?.map((itm, idx) => (
                        <div className='win-itm' key={idx}>
                            <h3>{itm}</h3>
                            <p style={{
                                color: (Math.floor(100 + Math.random() * 900)) % 3 !== 0 ? "green" : "red"
                            }}>{Math.floor(100 + Math.random() * 900)}</p>
                        </div>
                    ))
                }
            </marquee>
        </div>
  )
}

export default LiveTradeRecords