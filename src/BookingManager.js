import dom from './dom.js';

class BookingManager {
  constructor(allRooms, allBookings, allClients, date) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
    this.allClients = allClients;
    this.searchedClient;
    this.todaysBookings = this.allBookings.filter(booking => booking.date === date);
  }

  bookRoom(roomNum, day) {
    console.log(typeof day, day);
    console.log(typeof Number(roomNum), Number(roomNum));
    console.log(typeof Number(this.searchedClient.id), Number(this.searchedClient.id));
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": Number(this.searchedClient.id),
        "date": day,
        "roomNumber": Number(roomNum)
    }),
    })
      .then(response => response.json())
      .then(json => console.log('Request success: ', json))
      .catch(err => console.log('Request failure: ', error));
  }

  findClient(client) {
    this.allClients.forEach(user => {
      if (user.name.includes(client)) {
        this.searchedClient = user;
      }
    })
    return this.searchedClient;
  }

  findClientBookings() {
    return this.allBookings.filter(booking => booking.userID === this.searchedClient.id)
  }

  findClientSpendings() {
    return this.findClientBookings().reduce((total, booking) => {
      this.allRooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight;
        }
      })
      return Number(total.toFixed(2));
    }, 0)
  }

  deleteFutureBooking(id) {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => console.log(response.json()))
    .catch(err => console.log(err));
    }


  findTodaysOpenRooms() {
    let bookedNumbers = this.todaysBookings.map(({ roomNumber }) => roomNumber);
    let availRooms = this.allRooms.filter(room => {
      return !bookedNumbers.includes(room.number)
    })
    return availRooms
  }

  findTodaysRevenue() {
    let bookedNumbers = this.todaysBookings.map(({ roomNumber }) => roomNumber);
    let bookedRooms = this.allRooms.filter(room => {
      return bookedNumbers.includes(room.number)
    })
    let totalRev = bookedRooms.reduce((total, room) => {
      return total += room.costPerNight
    }, 0)
    return Number(totalRev.toFixed(2))
  }

  findPercentOccupied() {
    let totalBooked = this.todaysBookings.map(({ roomNumber }) => roomNumber).length;
    return ((totalBooked / this.allRooms.length) * 100).toFixed(0)
  }

  findRoomsByDate(selectedDate) {
    let bookingsOnDate = this.allBookings.filter(booking => booking.date ===
      selectedDate)
    let bookedNumbers = bookingsOnDate.map(({ roomNumber }) => roomNumber)
    let availRooms = this.allRooms.filter(room => {
      return !bookedNumbers.includes(room.number)
    })
    if (availRooms.length === 0) {
      dom.showAlert();
      return
    }
    dom.showRooms(availRooms);
    return availRooms
  }

}

export default BookingManager;
