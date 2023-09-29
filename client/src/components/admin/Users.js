import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersLookup } from '../../actions/admin';

const Users = ({ usersLookup, auth: { users } }) => {
  useEffect(() => {
    usersLookup();
  }, [usersLookup]);

  console.log(users);
  return (
    <div className="admn-wrpr">
      <h1>Approve Payment Request</h1>
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Mobile</th>
            <th>Wallet</th>
            <th>status</th>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm.mobile}</td>
              <td>
                {itm?.wallet?.length > 0
                  ? itm?.wallet?.map((itm) => {
                      return itm?.blnc;
                    })
                  : 'No-Balance'}
              </td>
              <td style={itm.status ? { color: 'green' } : { color: 'red' }}>
                {itm.status ? 'Active' : 'Inactive'}
              </td>
              <td>{itm.name}</td>
              <td>{itm.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Users.propTypes = {
  usersLookup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  usersLookup,
})(Users);
