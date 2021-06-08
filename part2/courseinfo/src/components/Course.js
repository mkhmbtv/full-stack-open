import React from 'react';

const Header = ({ course }) => (
    <h2>{course.name}</h2>
);

const Content = ({ course }) => (
    course.parts.map(part => {
        return (
            <p key={part.id}>{part.name} {part.exercises}</p>
        );
    })
);

const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => {
        return sum += part.exercises;
    }, 0);

    return (
        <p><b>total of {total} exercises </b></p>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default Course;