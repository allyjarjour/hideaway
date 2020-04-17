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

window.onload = dom.loadWelcomePage();

const allData = {
  userData: null,
  allRooms: null,
  allBookings: null,
  allClients: null,
  bookingManager: null,
  currentClient: null
}

fetchData().then(response => {
  allData.userData = response.userData;
  allData.allRooms = response.allRooms;
  allData.allBookings = response.allBookings;
})
  .then( () => {
    allData.bookingManager = new BookingManager(allData.allRooms,
      allData.allBookings)
    allData.allClients = new AllClients(allData.userData, 'customer1') // this will be the input value
    allData.currentClient = new Client(allData.userData[0], allData.allBookings,
      allData.allRooms)
    console.log(allData.bookingManager);
    console.log(allData.allRooms);
    console.log(allData.allClients);
    console.log(allData.currentClient);
    //instantiate BookingManager
    //add all things you want to load after data populates
  })
  .catch(err => console.log(err))



$('#sign-in-btn').on('click', function() {
  event.preventDefault();
  $('.sign-in-page').addClass('hide');
  dom.loadManagerHome(allData);
})
