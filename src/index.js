// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import $ from 'jquery';
import dom from './dom.js';
import fetchData from './allData.js'
import './css/base.scss';
import './images/cactus.jpg'
import './images/suitefull.jpg'
import './images/residentialqueen.jpg'
import './images/singletwin.jpg'
import './images/suitetwin.jpg'
import './images/singlefull.jpg'
import './images/singleking.jpg'
import './images/singlequeen.jpg'
import './images/juniorking.jpg'
import './images/juniortwin.jpg'
import './images/residentialtwin.jpg'
import './images/residentialfull.jpg'
import './images/suitequeen.jpg'
import './images/juniorqueen.jpg'
import BookingManager from './BookingManager.js'
import AllClients from './AllClients.js'
import Client from './Client.js'
const moment = require('moment');
import datepicker from 'js-datepicker'

// const todayDate = moment().format('YYYY/D/MM');

const allData = {
  userData: null,
  allRooms: null,
  allBookings: null,
  allClients: null,
  bookingManager: null,
  currentClient: null,
  clientLogin: null,
  todayDate: moment().format('YYYY/D/MM'),
  selectedDate: null
}

const picker = datepicker('#client-datepicker', {
  onSelect: (instance, date) => {
    let todayDate = allData.todayDate.split('/');
    if (date <= instance.startDate) {
      $('.date-alert').removeClass('hide')
    } else {
      $('.date-alert').addClass('hide')
    }
    allData.selectedDate = date.toLocaleDateString();
    return date.toLocaleDateString();
  }
})

picker.calendarContainer.style.setProperty('font-family', 'Raleway')

fetchData().then(response => {
  allData.userData = response.userData;
  allData.allRooms = response.allRooms;
  allData.allBookings = response.allBookings;
})
  .then( () => {
    dom.load(allData);
    // dom.loadManagerHome(allData)
    console.log(allData.allRooms);
  })
  .catch(err => console.log(err))

$('#sign-in-btn').click(function() {
  event.preventDefault();
  validateUser();
})

function validateUser() {
  const id = $('.username-input').val().slice(8)
  const username = $('.username-input').val().slice(0,8)
  if ($('.username-input').val() === 'manager' && $('.password').val() === 'overlook2020') {
    createAllClients();
    createBookingManager();
    dom.loadManagerHome(allData);
  } else if (username === 'username' && id > 0 && id <= 50 && $('.password').val() === 'overlook2020') {
    createAllClients();
    createBookingManager();
    createUser();
    dom.loadClientHome(allData);
  } else {
    $('.error-msg').removeClass('hide')
  }
}

function createUser() {
  let currentClientData = allData.allClients.findCurrentClient($('.username-input').val());
  allData.currentClient = new Client(currentClientData, allData.allBookings,
    allData.allRooms)
}

function createBookingManager() {
  allData.bookingManager = new BookingManager(allData.allRooms,
    allData.allBookings, allData.allClients.allClients, allData.todayDate)
    // console.log(allData.currentClient);
    console.log(allData.bookingManager);
}

function createAllClients() {
  allData.allClients = new AllClients(allData.userData);
  console.log(allData.allClients);
}

$('main').click(function(event) {
  if (event.target.id === 'book-room') {
    dom.populateClientBooking(allData)
  }
  if (event.target.id === 'go-home') {
    dom.loadClientHome(allData);
  }
  if (event.target.id === 'manager-dashboard') {
    dom.loadManagerHome(allData);
  }
  if (event.target.id === 'book-for-client') {
    // load client booking page
  }
})

// $('#client-datepicker').click(function() {
//   console.log(picker);
// })
