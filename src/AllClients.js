class AllClients {
  constructor(allClients, clientUserName) {
    this.allClients = allClients
    this.currentClientID = this.findClientID(clientUserName);
    this.currentClient = this.findCurrentClient(this.currentClientID);
  }

  findClientID(clientUserName) {
    let username = clientUserName
    return Number(username.slice(8))
  }

  findCurrentClient() {
    return this.allClients.find(client => client.id == this.currentClientID)
  }

}


export default AllClients;
