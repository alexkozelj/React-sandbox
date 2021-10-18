import './App.css';
import Card from './components/Card'
import AddUserForm from './components/AddUserForm'

function App() {

   const submitFormValuesHandler = (val) => {
      
   }

   return (
      <div className="App">
         <Card>
           <AddUserForm onSubmitForm={submitFormValuesHandler}/>
         </Card>
      </div>
   );
}

export default App;
