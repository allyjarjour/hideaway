import $ from "jquery"

const dom = {

/// set up for one the fetch data invokes after changing api
  loadManagerHome(allData) {
    $('.manager-bookings').addClass('hide')
    $('.sign-in-page').addClass('hide')
    $('nav').removeClass('hide')
    $('.manager-home').removeClass('hide')
    $('.client-home').addClass('hide')
    $('.client-name').text('Welome, Ally!')
    this.showStats(allData);
    this.showRooms(allData.bookingManager.findTodaysOpenRooms())
    this.populateManagerNav();
  },

  populateManagerNav() {
    $('.profile-tab').html(`
      <img src="./images/user-solid.png" class="profile-icon" alt="profile icon">
      <p class="client-name">Welcome, Ally!</p>
      <ul class="dropdown">
        <li id="manager-dashboard">Dashboard</li>
        <li id ="book-for-client">Manage Bookings</li>
      </ul>
    `)
  },

  showStats(allData) {
    $('.open-beds').text(`${allData.bookingManager.findTodaysOpenRooms().length}`);
    $('.total-revenue').text(`$${allData.bookingManager.findTodaysRevenue()}`)
    $('.percent-full').text(`${allData.bookingManager.findPercentOccupied()}%`)
  },

  showRooms(todaysOpenRooms) {
    $('.rooms-container').html(``)
    todaysOpenRooms.forEach(room => {
      $('.rooms-container').append(`<div class="room-container">
      <img src="./images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg" class="hotel-pic">
      <p>Room #<span class="roomNum">${room.number}</span> - ${room.roomType}</p><p>bed size: ${room.bedSize}</p>
      <p>number of beds: ${room.numBeds}</p><p>cost: $${room.costPerNight}</p>
      <div class="booking-warning"><p>Click Once to Book</p></div></div>`)
    })
    this.showFilter();
  },

  loadManagerSearchPage() {
    $('.rooms-container').html(``)
    $('#client-search').val(``)
    $('.table-body').html(``)
    $('.searched-client-name').text(``)
    $('.total-spent').text(``)
    $('.client-info').addClass('hide')
    $('.manager-bookings').removeClass('hide')
    $('.manager-home').addClass('hide')
  },

  populateClientInfo(client, bookings, spendings, allData) {
    $('.table-body').html(``)
    $('.client-info').removeClass('hide')
    $('.add-booking-section').removeClass('hide')
    $('.searched-client-name').text(`${client.name}`)
    $('.total-spent').text(`$${spendings} total spent`)
    bookings.forEach(booking => {
      if (booking.date < allData.todayDate) {
        $('.table-body').append(`
            <tr>
              <td>${booking.date}</td>
              <td>${booking.roomNumber}</td>
              <td id="booking-id">${booking.id}</td>
            </tr>`)
          } else {
            $('.table-body').append(`
                <tr>
                  <td>${booking.date}</td>
                  <td>${booking.roomNumber}</td>
                  <td id="booking-id">${booking.id}</td>
                  <td class="delete">Delete</td>
                </tr>`)
          }
      })
  },

  ///client ----------------

  loadClientHome(allData) {
    $('.rooms-container').html(``)
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
      <img src="./images/user-solid.png" class="profile-icon" alt="profile icon">
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

}


export default dom;
