import { expect } from 'chai';

import AllClients from '../src/AllClients';

describe('AllClients', function() {
  let allClients;
  let clients = [{id: 1, name: "Leatha Ullrich"},
    {id: 2, name: "Rocio Schuster"}, {id: 3, name: "Kelvin Schiller"},
    {id: 4, name: "Kennedi Emard"}, {id: 5, name: "Rhiannon Little"},
    {id: 6, name: "Fleta Schuppe"}]

  beforeEach(() => {
    allClients = new AllClients(clients, 'username3')
  })

  it('should be a function', function() {
    expect(AllClients).to.be.a('function');
  });

  it('should be an instance of AllClients', function() {
    expect(allClients).to.be.an.instanceof(AllClients);
  });

  it('should hold all clients', function() {
    expect(allClients.allClients).to.have.lengthOf(6);
  });

  // it('should hold current client id', function() {
  //   expect(allClients.currentClientID).to.equal(3);
  // });

  it('should find current client id', function() {
    expect(allClients.findClientID('username3')).to.equal(3);
  });

  it('should find current client', function() {
    expect(allClients.findCurrentClient('username3')).to.deep.equal(
      {id: 3, name: "Kelvin Schiller"});
  });

});
