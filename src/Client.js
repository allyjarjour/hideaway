// const moment = require('moment');
import allData from './index.js';
import fetchData from './allData.js'
import dom from './dom.js';


class Client {
  constructor(userData, allBookings, roomSelection) {
    this.name = userData.name;
    this.id = userData.id;
    this.userName = `customer${this.id}`;
    this.password = 'overlook2020'
    this.roomSelection = roomSelection;
    this.allBookings = this.findAllBookings(allBookings);
    this.totalSpent = this.findTotalSpent(roomSelection);
  }

  findAllBookings(allBookings) {
    return allBookings.filter(booking => booking.userID === this.id)
  }

  getDetailedBooking() {
    return this.allBookings.map(booking => {
      let matchedRoom = this.roomSelection.find(room => room.number ===
        booking.roomNumber)
      let newObject = Object.assign({}, booking);
      newObject.roomType = matchedRoom.roomType;
      newObject.bedSize = matchedRoom.bedSize;
      newObject.bidet = matchedRoom.bidet;
      newObject.numBeds = matchedRoom.numBeds;
      newObject.costPerNight = matchedRoom.costPerNight;
      return newObject;
    })
  }

  findTotalSpent(roomSelection) {
    return this.allBookings.reduce((total, booking) => {
      roomSelection.forEach(room => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight;
        }
      })
      return Number(total.toFixed(2));
    }, 0)
  }

  bookRoom(roomNum, day) {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": Number(this.id),
        "date": day,
        "roomNumber": Number(roomNum)
      }),
    })
      .then(response => response.json())
      .then( () => {
        fetchData().then(response => {
          allData.allBookings = response.allBookings;
          this.allBookings = this.findAllBookings(allData.allBookings);
        })
        .then( () => {
          dom.loadClientHome(allData);
          dom.showBookedRooms(allData)
        })
      })
      .catch(err => console.log('Request failure: ', error))
      window.alert('The room has been booked');
    }


}


export default Client;
