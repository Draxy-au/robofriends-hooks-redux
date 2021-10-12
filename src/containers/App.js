import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundry";

import "../styles/App.css";

export default function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.cypress.io/users")
      .then((response) => response.json())
      .then((user) => setRobots(user));
      console.log(robots);
  }, []);

  useEffect(() => {
    console.log(count);
  }, [count]);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
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
      <button onClick={() => setCount(count+1)}>Click Me!</button>
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
