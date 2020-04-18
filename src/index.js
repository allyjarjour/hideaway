// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import $ from 'jquery';
import dom from './dom.js';
import fetchData from './allData.js'
import './css/base.scss';
import './images/cactus.jpg'
import BookingManager from './BookingManager.js'
import AllClients from './AllClients.js'
import Client from './Client.js'
const moment = require('moment');
// const todayDate = moment().format('MMMM Do YYYY');
// const todayDate = "2020/01/12";


const allData = {
  userData: null,
  allRooms: null,
  allBookings: null,
  allClients: null,
  bookingManager: null,
  currentClient: null,
  clientLogin: null,
  todayDate: "2020/04/18"
}

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

/// event listeners

$('#sign-in-btn').on('click', function() {
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
    dom.loadClientHome();
    createAllClients();
    createBookingManager();
    createUser();
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
