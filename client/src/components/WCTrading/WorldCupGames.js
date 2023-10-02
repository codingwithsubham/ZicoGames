import React, { useEffect, useState } from 'react';

const WorldCupGames = ({ socket }) => {
  const [data, setData] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (data.trim()) {
      socket.emit('message', {
        text: data,
        socketID: socket.id,
      });
    }
    setData('');
  };

  return (
    <div className="wc-gm">
      <h1>World Cup Games</h1>
      <p>Let's Find Out the Data is coming or not</p>
      <form
        className="login-form withdrw"
        onSubmit={(e) => handleSendMessage(e)}
      >
        <div className="inpt-group">
          <label>Enter Messege</label>
          <input
            id="data"
            type="text"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button className="btn big">Send</button>
      </form>
      <div className="msgs-wrap">
        {messages.map((itm, idx) => (
          <div className="msgs" key={idx}>
            <p>{itm?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldCupGames;
