import { expect } from 'chai';
import BookingManager from '../src/BookingManager';

// import dom from './dom.js';


describe('BookingManager', function() {
  let todayDate = "2020/02/22";
  let allClients = [{id: 1, name: "Leatha Ullrich"},
    {id: 2, name: "Rocio Schuster"}, {id: 3, name: "Kelvin Schiller"},
    {id: 4, name: "Kennedi Emard"}, {id: 5, name: "Rhiannon Little"},
    {id: 6, name: "Fleta Schuppe"}]
  let allBookings = [{id: "5fwrgu4i7k55hl6t8", userID: 7, date: "2020/02/05", roomNumber: 12},
    {id: "5fwrgu4i7k55hl6x8", userID: 6, date: "2020/01/11", roomNumber: 20},
    {id: "5fwrgu4i7k55hl727", userID: 2, date: "2020/01/20", roomNumber: 22},
    {id: "5fwrgu4i7k55hl72h", userID: 3, date: "2020/02/22", roomNumber: 22},
    {id: "5fwrgu4i7k55hl72q", userID: 2, date: "2020/01/19", roomNumber: 19},
    {id: "5fwrgu4i7k55hl732", userID: 1, date: "2020/02/22", roomNumber: 19}]
  let roomSelection = [{number: 22, roomType: "residential suite", bidet: true,
    bedSize: "queen", numBeds: 1, costPerNight: 358.4},
    {number: 19, roomType: "residential suite", bidet: true,
    bedSize: "queen", numBeds: 1, costPerNight: 600},
    {number: 20, roomType: "residential suite", bidet: true, bedSize: "queen",
    numBeds: 1, costPerNight: 150.4}, {number: 30, roomType: "residential suite",
    bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 150.4}]
    let bookingManager;

  beforeEach(() => {
    bookingManager = new BookingManager(roomSelection, allBookings, allClients, todayDate)
    });

    it('should be a function', function() {
      expect(BookingManager).to.be.a('function');
    });

    it('should be an instance of BookingManager', function() {
      expect(bookingManager).to.be.an.instanceof(BookingManager);
    });

    it('should hold allRooms', function() {
      expect(bookingManager.allRooms).to.equal(roomSelection);
      expect(bookingManager.allRooms).to.have.lengthOf(4);
    });

    it('should hold allBookings', function() {
      expect(bookingManager.allBookings).to.equal(allBookings);
      expect(bookingManager.allBookings).to.have.lengthOf(6);
    });

    it('should hold allClients', function() {
      expect(bookingManager.allClients).to.equal(allClients);
      expect(bookingManager.allClients).to.have.lengthOf(6);
    });

    // it('should be able to book a room', function() {
    //
    // });

    it('should be able to find a particular client', function() {
      expect(bookingManager.findClient('Rocio')).to.deep.equal({id: 2, name: "Rocio Schuster"});
    });

    it('should be able to search multiple clients by first name or last name', function() {
      bookingManager.findClient('Rocio');
      expect(bookingManager.findClient('Schuppe')).to.deep.equal({id: 6, name: "Fleta Schuppe"});
      expect(bookingManager.searchedClient).to.deep.equal({id: 6, name: "Fleta Schuppe"});
    });

    it('should be able to find all bookings for a particular client', function() {
      bookingManager.findClient('Rocio');
      expect(bookingManager.findClientBookings()).to.deep.equal([
        {id: "5fwrgu4i7k55hl727", userID: 2, date: "2020/01/20", roomNumber: 22},
        {id: "5fwrgu4i7k55hl72q", userID: 2, date: "2020/01/19", roomNumber: 19}]);
    });

    it('should be able to find all spendings for a particular client', function() {
      bookingManager.findClient('Rocio');
      bookingManager.findClientBookings();
      expect(bookingManager.findClientSpendings()).to.equal(958.4);
    });

    // it('should be able to delete a booking', function() {
    //
    // });

    it("should be able to display open rooms for today's date", function() {
      expect(bookingManager.findTodaysOpenRooms()).to.deep.equal(
        [{number: 20, roomType: "residential suite", bidet: true, bedSize: "queen",
          numBeds: 1, costPerNight: 150.4}, {number: 30, roomType: "residential suite",
          bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 150.4}]
      );
      expect(bookingManager.findTodaysOpenRooms()).to.have.lengthOf(2)
    });

    it("should be able to calculate total revenue for a given date", function() {
      expect(bookingManager.findTodaysRevenue()).to.equal(958.4);
    });

    it("should be able to calculate percentage occupied", function() {
      expect(bookingManager.findPercentOccupied()).to.equal(50);
    });


})
