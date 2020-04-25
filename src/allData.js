// import BookingManager from './BookingManager.js'
// import AllClients from './AllClients.js'

function fetchData() {
  let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json())
    .then(response => {
      return response
    })

  let allRooms = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json())
    .then(response => {
      return response
    })

  let allBookings = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(data => data.json())
    .then(response => {
      return response
    })



  return Promise.all([userData, allRooms, allBookings]).then(data => {
    // data = array of objects
    let allData = {}

    allData.userData = data[0].users
    allData.allRooms = data[1].rooms
    allData.allBookings = data[2].bookings
    return allData
  })
}


export default fetchData
