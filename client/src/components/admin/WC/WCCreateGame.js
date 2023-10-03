import React, { useState } from 'react';
import { createGame } from '../../../actions/wcGames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WCCreateGame = ({ createGame }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const handleCreate = (e) => {
    e.preventDefault();
    if(name.trim() && desc.trim()){
        createGame({name, desc});
        setName('');
        setDesc('');
    }
  };
  return (
    <form className="login-form withdrw" onSubmit={(e) => handleCreate(e)}>
      <h3>Create Game</h3>
      <div className="inpt-group">
        <label>Enter Game Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="inpt-group">
        <label>Enter Game Desc</label>
        <input
          id="desc"
          type="text"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button className="btn big">Create</button>
    </form>
  );
};

WCCreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
  wcGames: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  wcGames: state.wcGames,
});

export default connect(mapStateToProps, {
  createGame,
})(WCCreateGame);
