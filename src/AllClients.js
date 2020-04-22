class AllClients {
  constructor(allClients) {
    this.allClients = allClients
  }

  findClientID(clientUserName) {
    let username = clientUserName
    return Number(username.slice(8))
  }

  findCurrentClient(clientUserName) {
    return this.allClients.find(client => client.id ===
      this.findClientID(clientUserName))
  }

}


export default AllClients;
