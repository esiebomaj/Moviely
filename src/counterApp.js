import Counters from "./components/counters";
import NavBar from "./components/navBar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 2 },
      { id: 3, value: 1 },
      { id: 4, value: 6 },
    ],
  };

  handleReset = () => {
    const newCounters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });

    this.setState({ counters: newCounters });
  };

  handleDelete = (id) => {
    this.setState((currentState) => {
      return {
        counters: currentState.counters.filter((counter) => counter.id !== id),
      };
    });
  };

  handleIncrement = (id) => {
    const counterToIncrement = this.state.counters.find(
      (counter) => counter.id === id
    );
    counterToIncrement.value++;
    const newCounters = this.state.counters.map((counter) =>
      counter.id === id ? counterToIncrement : counter
    );

    this.setState({ counters: newCounters });
  };

  handleDecrement = (id) => {
    const counterToDecrement = this.state.counters.find(
      (counter) => counter.id === id
    );
    counterToDecrement.value = counterToDecrement.value - 1;
    const newCounters = this.state.counters.map((counter) =>
      counter.id === id ? counterToDecrement : counter
    );
    this.setState({ counters: newCounters });
  };

  render() {
    return (
      <div className="App">
        <NavBar counters={this.state.counters} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onDecrement={this.handleDecrement}
          />
        </main>
      </div>
    );
  }
}

export default App;
