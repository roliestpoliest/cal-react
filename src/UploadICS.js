import React, { Component } from 'react';
import calendarInfo from './calendarInfo.js';
// import text from 'src\calendars\geo-cal.ics'

class UploadICS extends Component {

  constructor(props) {
    super(props);
    this.state = {
        calendarEvents: []
      };
  }

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
    const text = (e.target.result)
    console.log(text)
    // alert(text)
    // BEGIN:VEVENT

    const lines = text.split("\n");
    let start = "null"
    let end = "null"
    let summary = "null"
    let location = "null"
    let description = "null"

    let holdLocalStorage = []
    holdLocalStorage = JSON.parse(localStorage.getItem('events')) || [];
      
    for(let i = 0; i < lines.length; i++){
        //DTSTART, DTEND, SUMMARY, LOCATION
        if(i < lines.length && lines[i].indexOf("END:VEVENT") == 0){
          console.log("start: " + start);
          let year = parseInt(start.slice(0, 4));
          let month = parseInt(start.slice(4, 6));
          let day = parseInt(start.slice(6, 8));
          let hour = parseInt(start.slice(9, 11));
          let minute = parseInt(start.slice(11, 13));
          let second = parseInt(start.slice(13, 15));
          let startDate = new Date(year, month, day, hour, minute, second);
          console.log("start: " + startDate);

          console.log("end: " + end);
          year = parseInt(end.slice(0, 4));
          month = parseInt(end.slice(4, 6));
          day = parseInt(end.slice(6, 8));
          hour = parseInt(end.slice(9, 11));
          minute = parseInt(end.slice(11, 13));
          second = parseInt(end.slice(13, 15));
          let endDate = new Date(year, month, day, hour, minute, second);
          console.log("end: " + endDate);

          var diff =(startDate.getTime() - endDate.getTime()) / 1000;
          diff /= 60;
          let duration = Math.abs(Math.round(diff));
          console.log("duration: " + duration)

          let calendarInstance = new calendarInfo(start, end, summary, location, description, duration);
          this.state.calendarEvents.push(calendarInstance);
          holdLocalStorage.push(calendarInstance)
          console.log(calendarInstance);
        }

        if(lines[i].indexOf("DTSTART") == 0){
            start = lines[i].replace("DTSTART:", "");
        }
        else if(lines[i].indexOf("DTEND") == 0){
            end = lines[i].replace("DTEND:", "");
        }
        else if(lines[i].indexOf("SUMMARY") == 0){
            summary = lines[i].replace("SUMMARY:", "");
        }
        else if(lines[i].indexOf("LOCATION") == 0){
            location = lines[i].replace("LOCATION:", "");
        }
        else if(lines[i].indexOf("DESCRIPTION") == 0){
            description = lines[i].replace("DESCRIPTION:", "");
        }
    }
    console.log(this.state.calendarEvents);
    localStorage.setItem("events", JSON.stringify(holdLocalStorage));
    // calendarEvents
    
    // a.push = a.concat(this.state.calendarEvents);
    // alert(a);
    // localStorage.setItem('events', JSON .stringify(a));
    };
    reader.readAsText(e.target.files[0])
  }

  render = () => {

    return (<div>
      <input type="file" onChange={(e) => this.showFile(e)} />
      <div> hellooos</div>
    </div>
    )
  }
}

export default UploadICS;