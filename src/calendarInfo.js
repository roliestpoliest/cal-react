class calendarInfo {
    constructor(_start, _end, _summary, _location, _description, _duration = 0){
        this.start = _start;
        this.end = _end;
        this.summary = _summary;
        this.location = _location;
        this.description = _description;
        this.duration = _duration;
    }
};
export default calendarInfo;