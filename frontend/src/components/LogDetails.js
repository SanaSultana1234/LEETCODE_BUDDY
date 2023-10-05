import React, { useState } from 'react';
import { useLogsContext } from '../hooks/useLogsContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditLogForm from './EditLogForm'; // Import the EditLogForm component
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function LogDetails({ _id, student, questions, date }) {
  const { dispatch } = useLogsContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const response = await fetch('/logs/' + _id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_LOG', payload: json });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  return (
    <div className='workout-details'>
      {isEditing ? (
        <EditLogForm
          _id={_id}
          student={student}
          questions={questions}
          onEditComplete={handleEditComplete}
        />
      ) : (
        <>
          <h4>{student}</h4>
          <p>
            <strong>questions: </strong>
            {questions.map((q) => (
              <div key={q._id}>
                <p>
                  <strong>{q.num}.</strong>
                </p>
                <p>
                  <strong>Name: </strong> {q.name}
                </p>
                <p>
                  <strong>Notes: </strong> {q.level}
                </p>
              </div>
            ))}
          </p>
          <p>
            <strong>Date: </strong> {formatDistanceToNow(new Date(date),  {addSuffix: true})}
          </p>
          <span className='delete' onClick={handleDelete}>
            <DeleteIcon />
          </span>
          <span className='edit' onClick={handleEdit}>
            <EditIcon />
          </span>
        </>
      )}
    </div>
  );
}

export default LogDetails;
