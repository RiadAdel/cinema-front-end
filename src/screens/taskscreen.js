import React from 'react';
import './../assets/color.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import colors from './../assets/color';
import AddMovie from '../components/addMovie';
import AddScreening from '../components/addScreening';

export default class TaskScreen extends React.Component {
  adminTasks = [
    {
      name: "Add movie",
      to: "/"
    },
    {
      name: "Add screening",
      to: "/"
    },
  ]
  state = {
    active: 0
  }
  handleMenuClick(index) {
    this.setState({ active: index });
  }
  renderContent() {
    let form = null;
    switch (this.state.active) {
      case 0:
        form = (
          <AddMovie />
        )
        break;
      case 1:
        form = (
          <AddScreening />
        )
        break;
      default:
        form = (<h1>You have no access for this page</h1>)
        break;
    }
    return form;
  }
  render() {
    return (
      <div className="row m-0 p-0">
        <Menu tasks={this.adminTasks} active={this.state.active} onClick={(index) => this.handleMenuClick(index)} />
        <div className="col my-auto " style={{ backgroundColor: colors.primary , minHeight:'90vh'}}>
          {
            this.renderContent()
          }
        </div>
      </div>
    );
  }
}
