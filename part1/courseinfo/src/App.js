import React from 'react';

const Header = (props) => (
  <h1>{props.name}</h1>
);

const Content = (props) => (
  props.parts.map((part, i) => {
    return (
      <p key={i}>{part.name} {part.exercises}</p>
    );
  })
);

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => {
    return sum += part.exercises;
  }, 0);

  return (
    <p>Number of exercises {total}</p>
  );
};



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
