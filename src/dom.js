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
    this.showStats(allData);
    allData.bookingManager.findTodaysOpenRooms();
    this.showOpenRooms(allData.bookingManager.findTodaysOpenRooms())
  },

  showStats(allData) {
    $('.open-beds').text(`${allData.bookingManager.findTodaysOpenRooms().length}`);
    $('.total-revenue').text(`$${allData.bookingManager.findTodaysRevenue()}`)
    $('.percent-full').text(`${allData.bookingManager.findPercentOccupied()}%`)
  },

  showOpenRooms(todaysOpenRooms) {
    // add to dom
    $('.rooms-container').html(``)
    todaysOpenRooms.forEach(room => {
      console.log(`src="../images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg"`);
      $('.rooms-container').append(`<div class="room-container">
      <img src="./images/${room.roomType.split(' ')[0]}${room.bedSize}.jpg" class="hotel-pic">
      <p>${room.roomType}</p><p>bed size: ${room.bedSize}</p>
      <p>number of beds: ${room.numBeds}</p><p>cost: $${room.costPerNight}</p>
      </div>`)
    })
  },

  loadClientHome() {
    $('.sign-in-page').addClass('hide')
    $('nav').removeClass('hide')
    $('.client-home').removeClass('hide')
  }

}


export default dom;
