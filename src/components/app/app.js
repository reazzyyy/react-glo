import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import nextId from 'react-id-generator';
import './app.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'John C.',
          salary: 800,
          increase: false,
          like: false,
          id: nextId(),
        },
        {
          name: 'Alex M.',
          salary: 3000,
          increase: true,
          like: false,
          id: nextId(),
        },
        {
          name: 'Carl W.',
          salary: 5000,
          increase: false,
          like: true,
          id: nextId(),
        },
      ],
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  createEmploee = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      like: false,
      id: nextId(),
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  render() {
    return (
      <div className="app">
        <AppInfo />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList data={this.state.data} onDelete={this.deleteItem} />
        <EmployeesAddForm onCreate={this.createEmploee} />
      </div>
    );
  }
}

export default App;
