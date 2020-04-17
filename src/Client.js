class Client{
  constructor(userData, allBookings, roomSelection) {
    this.name = userData.name;
    this.id = userData.id;
    this.userName = `customer${this.id}`;
    this.password = 'overlook2020'
    this.allBookings = this.findAllBookings(allBookings);
    this.totalSpent = this.findTotalSpent(roomSelection);
  }

  findAllBookings(allBookings) {
    return allBookings.filter(booking => booking.userID === this.id)
  }

  findTotalSpent(roomSelection) {
    return this.allBookings.reduce((total, booking) => {
      roomSelection.forEach(room => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight;
        }
      })
      return total;
    }, 0)
  }

}


export default Client;
