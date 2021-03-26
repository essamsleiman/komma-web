import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styles from "../css/date_picker.css"; 

export default class  extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
    };
  }

  handleDayClick(day, { selected }) {
    const selectedDays = this.state.selectedDays.concat();
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  render() {
    return (
      <div>
        <DayPicker
          classNames={styles.rdp}
          numberOfMonths={2}
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
          disabledDays={[
            {
              before: new Date(),
            },
          ]}
        />
      </div>
    );
  }
}