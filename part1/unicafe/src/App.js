import React, { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => <p>{text} {value}</p>;

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
        <Statistic text='good' value={props.good} />
        <Statistic text='neutral' value={props.neutral} />
        <Statistic text='bad' value={props.bad} />
        <Statistic text='all' value={props.all} />
        <Statistic text='average' value={((props.good * 1) + (props.bad * -1)) / props.all} />
        <Statistic text='positive' value={(props.good / props.all * 100) + " %"} />
      </div>
    );
  };

  return (
    <p>No feedback given</p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text='give feedback' />
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;