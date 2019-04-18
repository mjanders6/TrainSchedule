// Initialize Firebase
const config = {
  apiKey: "AIzaSyB4flMlxop-939aaVQM9KlR1CEc-2HfYmw",
  authDomain: "test-project-75b9b.firebaseapp.com",
  databaseURL: "https://test-project-75b9b.firebaseio.com",
  projectId: "test-project-75b9b",
  storageBucket: "test-project-75b9b.appspot.com",
  messagingSenderId: "222879223851"
};

firebase.initializeApp(config);

let db = firebase.firestore()

let trainName, destination, firstTrainTime, frequency


// add data to firestore. 
document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()
  let id = db.collection('train-data').doc().id

  if (document.querySelector('#firstTrainTime').value === '') {
    document.querySelector('#err').innerHTML = 'Please Enter the Trains Start Time'
    document.querySelector('#trainName').value = ''
    document.querySelector('#destination').value = ''
    document.querySelector('#firstTrainTime').value = ''
    document.querySelector('#frequency').value = ''
  } else {
    db.collection('train-data').doc(id).set({
      trainName: document.querySelector('#trainName').value,
      destination: document.querySelector('#destination').value,
      firstTrainTime: document.querySelector('#firstTrainTime').value,
      frequency: document.querySelector('#frequency').value
    })

    document.querySelector('#trainName').value = ''
    document.querySelector('#destination').value = ''
    document.querySelector('#firstTrainTime').value = ''
    document.querySelector('#frequency').value = ''
  }

})

// update the page when the DB is updated. 
db.collection('train-data').onSnapshot(({ docs }) => {

  document.querySelector('tbody').innerHTML = ''

  // loop through the DB
  docs.forEach(doc => {

    let { trainName, destination, firstTrainTime, frequency } = doc.data()

    // console.log(doc.data());
    // calculate the time to the next stop and how many minutes to arrival
    let curTime = moment()
    let iniStop = moment(firstTrainTime, "HH:mm")
    let minutes = curTime.diff(iniStop, 'minutes')
    let numStops = Math.ceil(minutes / frequency)
    let nextStop = iniStop.add(numStops * frequency, 'minutes')
    let minAway = nextStop.diff(curTime, 'minutes')

    // create an element for the table. a button is added to remove a train. 
    let docElem = document.createElement('tr')
    docElem.innerHTML = `
          <td>${trainName}</td>
          <td>${destination}</td>
          <td>${frequency}</td>
          <td>${nextStop.format("HH:mm")}</td>
          <td>${minAway}</td>
          <td><button id="delBtn" data-btnid="${doc.id}">Delete</button></td>
      `
    document.querySelector('tbody').append(docElem)

  })

})

// event listener to remove a train. 
document.addEventListener('click', ({ target }) => {
  // console.log(target.dataset.btnid);
  if (target.id === 'delBtn') {
    db.collection('train-data').doc(target.dataset.btnid).delete()
  }

})