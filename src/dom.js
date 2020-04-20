import './css/base.scss';
// import './index.js';
import $ from "jquery"

const dom = {

  load(allData) {
    this.loadWelcomePage();
  },

  loadWelcomePage() {
    $('nav').addClass('hide')
    $('.manager-home').addClass('hide')
    $('.manager-bookings').addClass('hide')
    $('.client-home').addClass('hide')
    $('.client-bookings').addClass('hide')
  },

  loadManagerHome(allData) {
    $('.sign-in-page').addClass('hide')
    $('nav').removeClass('hide')
    $('.manager-home').removeClass('hide')
    $('.client-home').addClass('hide')
    $('.client-name').text('Welome, Ally!')
    this.showStats(allData);
    // allData.bookingManager.findTodaysOpenRooms();
    this.showOpenRooms(allData.bookingManager.findTodaysOpenRooms())
    this.populateManagerNav();
  },
  // <div class="profile-tab">

  populateManagerNav() {
    $('.profile-tab').html(`
      <img class="profile-icon" alt="profile icon" src="../images/user-solid.png">
      <p class="client-name">Welcome, Ally!</p>
      <ul class="dropdown">
        <li id="manager-dashboard">Dashboard</li>
        <li id ="book-for-client">Client Booking</li>
      </ul>
    `)
  },

  // </div>

  showStats(allData) {
    $('.open-beds').text(`${allData.bookingManager.findTodaysOpenRooms().length}`);
    $('.total-revenue').text(`$${allData.bookingManager.findTodaysRevenue()}`)
    $('.percent-full').text(`${allData.bookingManager.findPercentOccupied()}%`)
  },

  showOpenRooms(todaysOpenRooms) {
    $('.rooms-container').html(``)
    todaysOpenRooms.forEach(room => {
      $('.rooms-container').append(`<div class="room-container">
      <img src="./images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg" class="hotel-pic">
      <p>${room.roomType}</p><p>bed size: ${room.bedSize}</p>
      <p>number of beds: ${room.numBeds}</p><p>cost: $${room.costPerNight}</p>
      </div>`)
    })
  },

  ///client ----------------

  loadClientHome(allData) {
    $('.sign-in-page').addClass('hide')
    $('nav').removeClass('hide')
    $('.client-home').removeClass('hide')
    $('.total-spent').text(`Total Spent: $${allData.currentClient.totalSpent}`)
    this.showBookedRooms(allData);
    this.populateClientNav(allData);
  },

  showBookedRooms(allData) {
    $('.rooms-container').html(``)
    console.log(allData.currentClient.allBookings);
    allData.currentClient.getDetailedBooking().forEach(room => {
      $('.rooms-container').append(`<div class="room-container">
      <img src="./images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg" class="hotel-pic">
      <p>${room.roomType}</p><p>bed size: ${room.bedSize}</p>
      <p>number of beds: ${room.numBeds}</p><p>cost: $${room.costPerNight}</p>
      <div class="date">${room.date}</div>
      </div>`)
    })
  },

  populateClientNav(allData) {
    $('.profile-tab').html(`
      <img class="profile-icon" alt="profile icon" src="../images/user-solid.png">
      <p class="client-name">${allData.currentClient.name}</p>
      <ul class="dropdown">
        <li id="book-room">Book a Room</li>
        <li id ="go-home">My Bookings</li>
      </ul>`)
  },

  populateClientBooking(allData) {
    $('.client-home').addClass('hide');
    $('.client-bookings').removeClass('hide');
    console.log($('#client-datepicker').val());
  }

}


export default dom;
