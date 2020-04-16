import './css/base.scss';
import $ from "jquery"

const dom = {

  load() {
    loadWelcomePage();
  },

  loadWelcomePage() {
    $('nav').addClass('hide')
    $('.manager-home').addClass('hide')
    $('.manager-bookings').addClass('hide')
    $('.client-home').addClass('hide')
    $('.client-bookings').addClass('hide')
  }


}


export default dom;
