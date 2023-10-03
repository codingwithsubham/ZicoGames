import React from 'react';
import { Link } from 'react-router-dom';

const WCRecords = ({ games }) => {
  return (
    <div className="wc-rerd">
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th style={{minWidth: '300px'}}>Description</th>
            <th>Date</th>
            <th>Started</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {games.map((itm, idx) => (
            <tr key={idx}>
              <td>
                <Link className="btn" to={`/wc-game/${itm._id}`}>
                  <i className="fa fa-external-link" />
                </Link>
              </td>
              <td>{itm.gameName}</td>
              <td>{itm.gameDesc}</td>
              <td>{new Date(itm.date).toLocaleString()}</td>
              <td>{itm.started ? 'yes' : 'no'}</td>
              <td>{itm.completed ? 'yes' : 'no'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WCRecords;
