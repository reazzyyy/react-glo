import { Component } from 'react';
import './app-filter.css';

class AppFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
    };
  }

  handleClick = (filter) => {
    this.setState({ filter });
    this.props.onToggleFilter(filter);
  };

  render() {
    const buttonsData = [
      { name: 'all', label: 'Все сотрудники' },
      { name: 'rise', label: 'На повышение' },
      { name: 'moreThan1000', label: 'З/П больше 1000$' },
    ];

    const buttons = buttonsData.map(({ name, label }) => {
      const isActive = this.state.filter === name;
      const clazz = isActive ? 'btn btn-light' : 'btn btn-outline-light';
      return (
        <button
          type="button"
          className={clazz}
          key={name}
          onClick={() => this.handleClick(name)}
        >
          {label}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
  }
}

export default AppFilter;
