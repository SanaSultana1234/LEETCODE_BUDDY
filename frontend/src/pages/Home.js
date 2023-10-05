import React, { useEffect} from 'react'
import LogDetails from '../components/LogDetails';
import { useLogsContext } from '../hooks/useLogsContext';

function Home() {
  //INstead of local state by useState hook we use a global context by useContext hook
  const {logs, dispatch} = useLogsContext()
  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch('/logs');
      // const response = await fetch('http://localhost:5000/logs');
      const json = await response.json();

      if(response.ok) {
        dispatch({type: 'SET_LOGS', payload: json})
      }
    }
    fetchLogs();
  } , [dispatch]);
  return (
    <div className='home'>
      <div className='workouts'>
          {logs && logs.map((data) => (
            <LogDetails
            key={data._id}
            _id={data._id}
            student={data.student}
            questions={data.questions}
            date={data.createdAt}
          />
          ))}
      </div>
    </div>
  )
}

export default Home;