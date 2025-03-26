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
          rise: false,
          id: nextId(),
        },
        {
          name: 'Alex M.',
          salary: 3000,
          increase: true,
          rise: false,
          id: nextId(),
        },
        {
          name: 'Carl W.',
          salary: 5000,
          increase: false,
          rise: true,
          id: nextId(),
        },
      ],
      term: '',
      filter: 'all',
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
      rise: false,
      id: nextId(),
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmploees(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  }

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  onToggleFilter = (filter) => {
    this.setState({ filter });
  };

  filterEmploees(items, filter) {
    switch (filter) {
      case 'rise':
        return items.filter((item) => item.rise);
      case 'moreThan1000':
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  }

  render() {
    const { term, data, filter } = this.state;
    const increased = this.state.data.filter((item) => item.increase).length;
    const employees = this.state.data.length;
    const visibleData = this.filterEmploees(
      this.searchEmploees(data, term),
      this.state.filter,
    );

    return (
      <div className="app">
        <AppInfo increased={increased} allEmploees={employees} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onToggleFilter={this.onToggleFilter} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onCreate={this.createEmploee} />
      </div>
    );
  }
}

export default App;
