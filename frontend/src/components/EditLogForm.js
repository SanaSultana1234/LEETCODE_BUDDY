import React, { useState } from 'react';
import { useLogsContext } from '../hooks/useLogsContext';

function EditLogForm({ _id, student, questions, onEditComplete }) {
  const { dispatch } = useLogsContext();
  const [editedStudent, setEditedStudent] = useState(student);
  const [editedQuestions, setEditedQuestions] = useState(questions);

  // Function to handle changes in the questions array
  const handleQuestionChange = (index, updatedValue) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index].name = updatedValue;
    setEditedQuestions(updatedQuestions);
  };

  const handleEditSave = async () => {
    const updatedLog = {
      id: _id,
      student: editedStudent,
      questions: editedQuestions,
    };

    const response = await fetch('/logs/' + _id, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLog),
    });

    if (response.ok) {
      // Update the state and exit edit mode
      
      dispatch({ type: 'UPDATE_LOG', payload: updatedLog });
      onEditComplete();
      window.location.href='/';
    }
  };

  return (
    <div>
      <h3>Edit Log</h3>
      <label>Student Name:</label>
      <input
        type='text'
        value={editedStudent}
        onChange={(e) => setEditedStudent(e.target.value)}
      />
      <label>Questions:</label>
      {editedQuestions.map((question, index) => (
        <input
          key={index}
          type='text'
          value={question.name}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
        />
      ))}
      
      <button onClick={handleEditSave}>Save</button>
    </div>
  );
}

export default EditLogForm;
