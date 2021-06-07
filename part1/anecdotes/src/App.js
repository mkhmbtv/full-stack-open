import React, { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Content = ({ anecdote, numVotes}) => {
  return (
    <div>
      {anecdote}
      <p>has {numVotes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const handleSelectedClick = () => setSelected(getRandomInt(0, anecdotes.length));
  
  const handleVotesClick = () => {
    votes[selected] += 1;
    setVotes([...votes]);
  };

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Content anecdote={anecdotes[selected]} numVotes={votes[selected]} />
      <Button handleClick={handleVotesClick} text='vote' />
      <Button handleClick={handleSelectedClick} text='new anecdote' />
      <Header text='Anecdote with most votes' />
      <Content anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} numVotes={Math.max(...votes)} />
    </div>
  );
};

export default App;