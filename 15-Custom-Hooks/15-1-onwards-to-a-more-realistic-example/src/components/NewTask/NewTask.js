
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
   const { isLoading, error, sendRequest: sendTaskRequest } = useHttp()


   const enterTaskHandler = async (taskText) => {

      const createTask = (taskData) => {
         const generatedId = taskData.name; // firebase-specific => "name" contains generated id
         const createdTask = { id: generatedId, text: taskText };
   
         props.onAddTask(createdTask);
      }

      sendTaskRequest({
         url: 'https://react-http-956a9-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
         method: 'POST',
         body: { text: taskText },
         headers: {
            'Content-Type': 'application/json',
         },
      }, createTask)

   //    setIsLoading(true);
   //    setError(null);
   //    try {
   //       const response = await fetch(
   //          'https://react-http-956a9-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
   //          {
   //             method: 'POST',
   //             body: JSON.stringify({ text: taskText }),
   //             headers: {
   //                'Content-Type': 'application/json',
   //             },
   //          }
   //       );

   //       if (!response.ok) {
   //          throw new Error('Request failed!');
   //       }

   //       const data = await response.json();

   //       const generatedId = data.name; // firebase-specific => "name" contains generated id
   //       const createdTask = { id: generatedId, text: taskText };

   //       props.onAddTask(createdTask);
   //    } catch (err) {
   //       setError(err.message || 'Something went wrong!');
   //    }
   //    setIsLoading(false);
   };-

   return (
      <Section>
         <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
         {error && <p>{error}</p>}
      </Section>
   );
};

export default NewTask;
