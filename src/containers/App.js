import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundry";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

import "../styles/App.css";

export default function App() {
  const [robots, setRobots] = useState([]);
 
  const state = useSelector((state) => state.searchField);
  const dispatch = useDispatch();

  const { setSearchField } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetch("https://jsonplaceholder.cypress.io/users")
      .then((response) => response.json())
      .then((user) => setRobots(user));
  }, []);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(state.searchField.toLowerCase());
  });

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  // we were checking robots length === 0. 0 = false, so check if not false
  // then convert the if to a turnery
  return !robots.length ? (
    <h1>Loading...</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

// import React, { Component } from "react";
// import CardList from "../components/CardList";
// import SearchBox from "../components/SearchBox";
// import Scroll from "../components/Scroll";
// import ErrorBoundary from "../components/ErrorBoundry";

// import "../styles/App.css";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       robots: [],
//       searchfield: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.cypress.io/users")
//       .then((response) => response.json())
//       .then((users) => this.setState({ robots: users }));
//   }

  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value });
  // };

//   render() {
//     const { robots, searchfield } = this.state;
//     const filteredRobots = robots.filter((robot) => {
//       return robot.name.toLowerCase().includes(searchfield.toLowerCase());
//     });
//     // we were checking robots length === 0. 0 = false, so check if not false
//     // then convert the if to a turnery
//     return !robots.length ? (
//       <h1>Loading...</h1>
//     ) : (
//       <div className="tc">
//         <h1 className="f1">RoboFriends</h1>
//         <SearchBox searchChange={this.onSearchChange} />
//         <Scroll>
//           <ErrorBoundary>
//             <CardList robots={filteredRobots} />
//           </ErrorBoundary>
//         </Scroll>
//       </div>
//     );
//   }
// }

// export default App;
