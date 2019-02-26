Visualisation tool to help dealing with the logistics of multiple timezones. 

See demo here: https://offset.surge.sh/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development plans

Soon:
- [ ] Publish to Github repo and link from main app
- [x] Make work with fractions of hours as offsets
- [x] Add button to flip me/them
- [x] Add interval to keep time updated
- [x] Make tooltips/modals look nicer
- [x] Make styling mobile-friendly
- [ ] Allow other hour configurations: day-light, awake, after-work
- [ ] Allow editing of office hours
- [ ] Add Typescript

Later:
- [ ] Explore a vertical, mobile-friendly version
- [ ] Set meeting time (utc) and duration (and display dates)
- [ ] Use code splitting to import moment (or moment-timezones) to set/display offset by name
- [ ] Allow choosing a different time of year with locations
- [ ] Use local storage to remember recent states (maybe only on exit, or on timer, ...)
- [ ] Allow comparing more than two different timezones/locations at once

Bugs:
- [x] Fix drag timeline on mobile
- [x] Fix performance issue (CPU usage) - turned out to be an issue with `useEffect` hook
- [ ] Fix input boxes being too wide on mobile (Pixel 2)
