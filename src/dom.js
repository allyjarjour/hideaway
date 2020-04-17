import './css/base.scss';
import $ from "jquery"

const dom = {

  load(data) {
    loadWelcomePage();
  },

  loadWelcomePage() {
    $('nav').addClass('hide')
    $('.manager-home').addClass('hide')
    $('.manager-bookings').addClass('hide')
    $('.client-home').addClass('hide')
    $('.client-bookings').addClass('hide')
  },

  loadManagerHome(data) {
    $('nav').removeClass('hide')
    $('.manager-home').removeClass('hide')
    console.log(data.userData);
  }

}


export default dom;
