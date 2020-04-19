import dom from './dom.js';


class BookingManager {
  constructor(allRooms, allBookings, allClients, date) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
    this.allClients = allClients;
    this.searchedClient;
    this.todaysBookings = this.allBookings.filter(booking => booking.date === date);
  }

  bookRoom() {
    //
    //update dom to show recent changes if necessary
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
      return total;
    }, 0)
  }

  deleteFutureBooking(date) {

    //update dom to show recent changes if necessary
  }

  findTodaysOpenRooms() {
    let bookedNumbers = this.todaysBookings.map(({ roomNumber }) => roomNumber);
    let availRooms = this.allRooms.filter(room => {
      return !bookedNumbers.includes(room.number)
    })
    return availRooms
    //update dom to show recent changes if necessary
  }

  findTodaysRevenue() {
    let bookedNumbers = this.todaysBookings.map(({ roomNumber }) => roomNumber);
    let bookedRooms = this.allRooms.filter(room => {
      return bookedNumbers.includes(room.number)
    })
    return bookedRooms.reduce((total, room) => {
      return total += room.costPerNight
    }, 0)
    //update dom to show recent changes if necessary
  }

  findPercentOccupied() {
    let totalBooked = this.todaysBookings.map(({ roomNumber }) => roomNumber).length;
    return (totalBooked / this.allRooms.length) * 100
    //update dom to show recent changes if necessary
  }

}

export default BookingManager;
