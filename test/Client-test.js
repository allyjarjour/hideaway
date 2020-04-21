import { expect } from 'chai';

import Client from '../src/Client';

describe('Client', function() {
  let client;
  let allBookings = [{id: "5fwrgu4i7k55hl6t8", userID: 7, date: "2020/02/05", roomNumber: 12},
    {id: "5fwrgu4i7k55hl6x8", userID: 6, date: "2020/01/11", roomNumber: 20},
    {id: "5fwrgu4i7k55hl727", userID: 1, date: "2020/01/20", roomNumber: 22},
    {id: "5fwrgu4i7k55hl72h", userID: 3, date: "2020/02/22", roomNumber: 15},
    {id: "5fwrgu4i7k55hl72q", userID: 1, date: "2020/01/19", roomNumber: 19},
    {id: "5fwrgu4i7k55hl732", userID: 1, date: "2020/01/18", roomNumber: 15}]
  let roomSelection = [{number: 22, roomType: "residential suite", bidet: true,
    bedSize: "queen", numBeds: 1, costPerNight: 358.4},
    {number: 19, roomType: "residential suite", bidet: true,
    bedSize: "queen", numBeds: 1, costPerNight: 600},
    {number: 15, roomType: "residential suite", bidet: true, bedSize: "queen",
    numBeds: 1, costPerNight: 150.4}]
  beforeEach(() => {
    client = new Client({'name': "Leatha Ullrich", 'id': 1}, allBookings,
      roomSelection)
    });

    it('should be a function', function() {
      expect(Client).to.be.a('function');
    });

    it('should be an instance of Client', function() {
      expect(client).to.be.an.instanceof(Client);
    });

    it('should hold a name', function() {
      expect(client.name).to.equal('Leatha Ullrich');
    });

    it('should hold an id', function() {
      expect(client.id).to.equal(1);
    });

    it('should hold a userName', function() {
      expect(client.userName).to.equal('customer1');
    });

    it('should hold a password', function() {
      expect(client.password).to.equal('overlook2020');
    });

    it('should find all bookings for a given client', function() {
      expect(client.allBookings).to.deep.equal(client.findAllBookings(allBookings));
      expect(client.findAllBookings(allBookings)).to.deep.equal([
      {id: "5fwrgu4i7k55hl727", userID: 1, date: "2020/01/20", roomNumber: 22},
      {id: "5fwrgu4i7k55hl72q", userID: 1, date: "2020/01/19", roomNumber: 19},
      {id: "5fwrgu4i7k55hl732", userID: 1, date: "2020/01/18", roomNumber: 15}
      ]);
    });

    it('should hold all bookings for a given client', function() {
      client.findAllBookings(allBookings);
      expect(client.allBookings).to.deep.equal([
      {id: "5fwrgu4i7k55hl727", userID: 1, date: "2020/01/20", roomNumber: 22},
      {id: "5fwrgu4i7k55hl72q", userID: 1, date: "2020/01/19", roomNumber: 19},
      {id: "5fwrgu4i7k55hl732", userID: 1, date: "2020/01/18", roomNumber: 15}
      ]);
    });

    it('should provide room details for each booking', function() {
      expect(client.getDetailedBooking()).to.deep.equal([
        {
          id: '5fwrgu4i7k55hl727',
          userID: 1,
          date: '2020/01/20',
          roomNumber: 22,
          roomType: 'residential suite',
          bedSize: 'queen',
          bidet: true,
          numBeds: 1,
          costPerNight: 358.4
        },
        {
          id: '5fwrgu4i7k55hl72q',
          userID: 1,
          date: '2020/01/19',
          roomNumber: 19,
          roomType: 'residential suite',
          bedSize: 'queen',
          bidet: true,
          numBeds: 1,
          costPerNight: 600
        },
        {
          id: '5fwrgu4i7k55hl732',
          userID: 1,
          date: '2020/01/18',
          roomNumber: 15,
          roomType: 'residential suite',
          bedSize: 'queen',
          bidet: true,
          numBeds: 1,
          costPerNight: 150.4
        }
      ]);
    });

    it('should find total spent for each client', function() {
      client.findTotalSpent(roomSelection);
      expect(client.findTotalSpent(roomSelection)).to.equal(1108.8);
    });

    it('should hold total spent for a given client', function() {
      client.findTotalSpent(roomSelection);
      expect(client.totalSpent).to.equal(1108.8);
    });

    it('should be able to book a room', function() {

    });

});
