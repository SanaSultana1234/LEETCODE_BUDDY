import React, { useState } from 'react';
import { useLogsContext } from '../hooks/useLogsContext';


function WorkoutForm() {
  const {dispatch} = useLogsContext();
  const [student, setStudent] = useState('');
  const [number, setNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Function to handle changes in the questions array
  //Levels --> Notes
  const handleQuestions = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  // Function to handle changes in the levels array
  const handleLevels = (e, index) => {
    const newLevels = [...levels];
    newLevels[index] = e.target.value;
    setLevels(newLevels);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionObjects = questions.map((q, i) => ({
      num: i + 1,
      name: q,
      level: levels[i] || 'Default', // Set a default level if not provided
    }));

    const log = {
      student,
      questions: questionObjects,
      date,
    };

    const response = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setStudent('');
      setDate('');
      setNumber(1);
      setError(null);
      setEmptyFields([]);
      setQuestions([]);
      setLevels([]);
      console.log('New workout added', json);
      dispatch({type: 'CREATE_WORKOUT', payload: json});
      window.location.href='/';
    }
  };

  const generateQuestionInputs = () => {
    const inputArray = [];
    for (let i = 0; i < number; i++) {
      inputArray.push(
        <div key={i}>
          <input
            type='text'
            onChange={(e) => handleQuestions(e, i)}
            value={questions[i] || ''}
            placeholder={`Question ${i + 1}`}
          />
          <input
            type='text'
            onChange={(e) => handleLevels(e, i)}
            value={levels[i] || ''}
            placeholder={`Notes (OPTIONAL) ${i + 1}`}
          />
        </div>
      );
    }
    return inputArray;
  };

  return (
    <div>
      <form className='create' onSubmit={handleSubmit}>
        <h3>Add Today's Questions</h3>
        <label>Student Name: </label>
        <input
          type='text'
          onChange={(e) => setStudent(e.target.value)}
          value={student}
          className={emptyFields.includes('student') && 'error'}
        />
        <label>Number of Questions: </label>
        <input
          type='number'
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
        <label>Questions and Notes: </label>
        {generateQuestionInputs()}
        <button type='submit'>Add</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;
