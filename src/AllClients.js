class AllClients {
  constructor(allClients) {
    this.allClients = allClients
    // this.currentClientID = this.findClientID(clientUserName);
    // this.currentClient = this.findCurrentClient(this.currentClientID);
  }

  findClientID(clientUserName) {
    let username = clientUserName
    return Number(username.slice(8))
  }

  findCurrentClient(clientUserName) {
    return this.allClients.find(client => client.id === this.findClientID(clientUserName))
  }

}


export default AllClients;
