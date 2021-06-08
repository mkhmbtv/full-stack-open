import React from 'react';

const Header = ({ name }) => (
  <h1>{name}</h1>
);

const Content = (props) => (
  <p>{props.name} {props.exercises}</p>
);

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => {
    return sum += part.exercises;
  }, 0);

  return (
    <p><b>total of {total} exercises </b></p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      {course.parts.map(part =>
        <Content key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
];


  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  );
};

export default App;

