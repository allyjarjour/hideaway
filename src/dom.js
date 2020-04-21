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
    this.showRooms(allData.bookingManager.findTodaysOpenRooms())
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

  showRooms(todaysOpenRooms) { //chanhe to show Rooms
    $('.rooms-container').html(``)
    todaysOpenRooms.forEach(room => {
      $('.rooms-container').append(`<div class="room-container">
      <img src="./images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg" class="hotel-pic">
      <p>${room.roomType}</p><p>bed size: ${room.bedSize}</p>
      <p>number of beds: ${room.numBeds}</p><p>cost: $${room.costPerNight}</p>
      </div>`)
    })
    this.showFilter();
  },

  ///client ----------------

  loadClientHome(allData) {
    $('.sign-in-page').addClass('hide')
    $('nav').removeClass('hide')
    $('.client-home').removeClass('hide')
    $('.client-bookings').addClass('hide')
    $('.total-spent').text(`Total Spent: $${allData.currentClient.totalSpent}`)
    this.showBookedRooms(allData);
    this.populateClientNav(allData);
  },

  showBookedRooms(allData) {
    $('.rooms-container').html(``)
    allData.currentClient.getDetailedBooking().forEach(room => {
      $('.rooms-container').append(`<div class="room-container">
      <img src="./images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg" class="hotel-pic">
      <p>${room.roomType}</p><p>bed size: ${room.bedSize}</p>
      <p>number of beds: ${room.numBeds}</p><p>cost: $${room.costPerNight}</p>
      <div class="date"><p>${room.date}</p></div>
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

  populateClientBookingPage(allData) {
    $('.rooms-container').html(``)
    $('.client-home').addClass('hide');
    $('.client-bookings').removeClass('hide');
  },

  showAlert() {
    $('.no-rooms').removeClass('hide')
  },

  showFilter() {
    $('.filter-area').removeClass('hide')
  },

  filterRooms(event, allData) {
    let rooms = allData.bookingManager.findRoomsByDate(allData.selectedDate);
    let filtered = rooms.filter(room => {
      if ($(event.target).text() === 'Residential') {
      return room.roomType === "residential suite"
      }
      if ($(event.target).text() === 'Suite') {
        return room.roomType === "suite"
      }
      if ($(event.target).text() === 'Single Room') {
        return room.roomType === "single room"
      }
      if ($(event.target).text() === 'Junior Suite') {
        return room.roomType === "junior suite"
      }
    })
    this.showRooms(filtered);
  }

  // populateRoomsByDate(availRooms) {
  //   console.log(availRooms);
  //   showOpenRooms(availRooms);
  // }

}


export default dom;
