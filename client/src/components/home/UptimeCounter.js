import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { getWebsiteUp } from '../../common/functions';

const UptimeCounter = () => {
    const [time, setTime] = useState(getWebsiteUp());
    useEffect(() => {
        setTimeout(() => (setTime(getWebsiteUp())), 1000);
    }, [time]);
    return (
        <div className='up-tme-cuntr'>
            <h1 className='hdr'>Game Running...</h1>
            <div className='cunt-itm'>
                <h1>{moment.duration(time).months()}</h1>
                <p>Months</p>
            </div>
            <div className='cunt-itm'>
                <h1>{moment.duration(time).days()}</h1>
                <p>Days</p>
            </div>
            <div className='cunt-itm'>
                <h1>{moment.duration(time).hours()}</h1>
                <p>Hours</p>
            </div>
            <div className='cunt-itm'>
                <h1>{moment.duration(time).minutes()}</h1>
                <p>Minutes</p>
            </div>
            <div className='cunt-itm'>
                <h1>{moment.duration(time).seconds()}</h1>
                <p>Seconds</p>
            </div>
        </div>
    )
}

export default UptimeCounter