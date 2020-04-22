// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import $ from 'jquery';
import dom from './dom.js';
import fetchData from './allData.js'
import './css/base.scss';
import './images/cactus.jpg'
import './images/user-solid.png'
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
  todayDate: moment().format('YYYY/MM/D'),
  selectedDate: null
}

const picker = datepicker('#client-datepicker', {
  onSelect: (instance, date) => {
    let todayDate = allData.todayDate.split('/');
    if (date < instance.startDate) {
      $('.date-alert').removeClass('hide')
    } else {
      $('.date-alert').addClass('hide')
      formatDate(date.toLocaleDateString());
      allData.bookingManager.findRoomsByDate(allData.selectedDate);
      console.log(allData.currentClient);
      console.log(allData.selectedDate);
      // dom.populateRoomsByDate(allData);
    }
  }
})

function formatDate(dateToFormat) {
  let splitDateInfo = dateToFormat.split('/')
  let month = splitDateInfo[0];
  let day = splitDateInfo[1];
  if (splitDateInfo[0] < 10) {
    month = `0${splitDateInfo[0]}`
  }
  if (splitDateInfo[1] < 10) {
    day = `0${splitDateInfo[1]}`
  }
  allData.selectedDate = `${splitDateInfo[2]}/${month}/${day}`
}

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
    console.log(allData.bookingManager);
}

function createAllClients() {
  allData.allClients = new AllClients(allData.userData);
  console.log(allData.allClients);
}

$('main').click(function(event) {
  if (event.target.id === 'book-room') {
    dom.populateClientBookingPage(allData)
  }
  if (event.target.id === 'go-home') {
    dom.loadClientHome(allData);
  }
  if (event.target.id === 'manager-dashboard') {
    dom.loadManagerHome(allData);
  }
  if (event.target.id === 'book-for-client') {
    dom.loadManagerSearchPage(allData);
  }
})

$('.dropdown-menu').click(function(event) {
  $(event.target).addClass('active').siblings().removeClass('active');
  dom.filterRooms(event, allData);
});

// book room as client

$('main').click(function(event) {
  if ($(event.target).hasClass('room-container')) {
    let roomNum = $(event.target).find('span').text()
    allData.currentClient.bookRoom(roomNum, allData.selectedDate)
  }
});

// show client
$('.client-search').click(function(event) {
  let searchName = $('#client-search').val()
  let client = allData.bookingManager.findClient(searchName)
  let clientBookings = allData.bookingManager.findClientBookings()
  let clientSpendings = allData.bookingManager.findClientSpendings()
  dom.populateClientInfo(client, clientBookings, clientSpendings)
  console.log(clientBookings);
  console.log(clientSpendings);
})
