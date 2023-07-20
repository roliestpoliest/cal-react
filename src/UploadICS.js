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
//   alert(text)
// BEGIN:VEVENT
    const lines = text.split("\n");
    let start = "null"
    let end = "null"
    let summary = "null"
    let location = "null"
    let description = "null"
    
    for(let i = 0; i < lines.length; i++){
        //DTSTART, DTEND, SUMMARY, LOCATION
        if(i < lines.length && lines[i].indexOf("END:VEVENT") == 0){
            let calendarInstance = new calendarInfo(start, end, summary, location, description);
            this.state.calendarEvents.push(calendarInstance);
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
    // let calendarInstance = new calendarInfo(start, end, summary, location);
    // this.state.calendarEvents.push(calendarInstance);
    // console.log(calendarInstance);

    console.log(this.state.calendarEvents);

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