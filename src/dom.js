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
    allData.bookingManager.findTodaysOpenRooms();
    this.showStats(allData);
  },

  showStats(allData) {
    $('#open-beds').text(`${allData.bookingManager.findTodaysOpenRooms().length}`);
    // console.log(allData.bookingManager.findTodaysOpenRooms(allData.todayDate).length);
  },

  showOpenRooms(todaysOpenRooms) {
    // add to dom
    console.log('kitties');
  },

  loadClientHome() {
    $('.sign-in-page').addClass('hide')
    $('nav').removeClass('hide')
    $('.client-home').removeClass('hide')
  }

}


export default dom;
