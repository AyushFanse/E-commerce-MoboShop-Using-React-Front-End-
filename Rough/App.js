// import {Component} from 'react';
// import Home from './Home';
// import Brand from './Brand';
// import Cart  from './Cart';
// import Strucure  from './Strucure';
// import ViewDetails from './Details';
// import {Route,BrowserRouter, Switch} from "react-router-dom";
import RouteComponent from "../src/RouteComponent";


function App() {
    return (
      <div className="App">
        <RouteComponent/>
      </div>
    );
  }
  
  export default App;

// class App extends Component {

//     render() {
//         return (
//             <BrowserRouter>
//                 <Route path="/" exact component={Strucure}/>
//                 <Route path="/Brand" component={Strucure}/>
//                 <Route path="/Details" component={Strucure}/>
//                 <Switch>
//                 <Route path="/" exact render={(props)=> (
//                     <Home 
//                     {...props} 
//                     />
//                 )}
//                 />
//                 <Route path="/Details" component={ViewDetails}/>
//                 <Route path="/Brand" component={Brand}/>
//                 <Route path="/Cart" exact component={Cart}/>

//                 </Switch>
                
//             </BrowserRouter>
//         )
//     }
// }



// export default App;