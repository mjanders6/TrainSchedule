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

document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()
  let id = db.collection('train-data').doc().id

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

})