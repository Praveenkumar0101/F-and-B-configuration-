// import axios from 'axios';
import './App.css';
// import React, { useState,useEffect } from 'react';
// import { response } from 'express';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import SignupForm from './SignupForm';
import UserDetails from './UserDetails';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/UserDetails" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;





// // function App(){
// //   const[state,setState]=useState([])

// //   const useEffect(()=>{
// //     axios.get("https://fakestoreapi.com/products")
// //     .then((response)=>{setState(response.data)})

// //     .catch((error){console.log("error".error)})
// //   },[])

// //    return(
// //     <>
// //     {state.map(value)=>(
// //       <p>{getValue.title}</p>
// //     )}
   

// //     </>
// //    )

// // }
// // export default App;




// import React, { useState, useMemo } from 'react';

// function App() {
//   const [count, setCount] = useState(0);
//   // const [text, setText] = useState('');

//   const expensiveCalculation = useMemo(() => {
//     console.log('Performing expensive calculation...');
//     let result = 0;
//     for (let i = 0; i < 10; i++) {
//       result += i;
//     }
//     return result;
//   }, [count]);

//   return (
//     <div>
//       <h1>Expensive Calculation Result: {expensiveCalculation}</h1>
//       <button onClick={() => setCount(count + 1)}>Increment Count</button>
//       {/* <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type something..."
//       /> */}
//     </div>
//   );
// }

// export default App;

