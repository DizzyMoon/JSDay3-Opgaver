function fetchAndDisplayUser() {
    const userIdInput = document.getElementById('user-id-input')
    const userId = userIdInput.value.trim();

    if(!userId){
        alert('Please enter a User ID')
        return;
    }

    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    console.log(apiUrl)
    // Send a GET request to the API
    fetch(apiUrl)
        .then(response => {
            // Check if the response status is OK (200>)
            if(response.status === 404){
                alert('User does not exist')
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
        })
        .then(userData => {
            //Name and phone
            const nameElement = document.getElementById('name')
            const phoneElement = document.getElementById('phone')

            nameElement.textContent = userData.name;
            phoneElement.textContent = userData.phone;

            //Address
            const streetElement = document.getElementById('street')
            const cityElement = document.getElementById('city')
            const zipElement = document.getElementById('zip')
            const geoElement = document.getElementById('geo')

            //user-data div
            const userDataContainer = document.getElementById('user-data')
            const userTableContainer = document.getElementById('user-table-container')

            streetElement.textContent = userData.address.street
            cityElement.textContent = userData.address.city
            zipElement.textContent = userData.address.zipcode
            geoElement.textContent = userData.address.geo.lat + ", " + userData.address.geo.lng

            //Change display type
            userTableContainer.style.display = 'none';
            userDataContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function fetchAndDisplayAllUsers(){
    const userTableBody = document.querySelector('#user-table tbody')
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            return res.json()
        })
        .then(users => {
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr')
                const nameCell = document.createElement('td')
                const phoneCell = document.createElement('td')

                const userTableContainer = document.getElementById('user-table-container')
                const userDataContainer = document.getElementById('user-data')

                nameCell.textContent = user.name;
                phoneCell.textContent = user.phone;

                row.appendChild(nameCell)
                row.appendChild(phoneCell)

                userTableBody.appendChild(row)

                userDataContainer.style.display = 'none'
                userTableContainer.style.display = 'block'
            })
                .catch(error => {
                    console.error('Fetch error', error)
                })
        })
}

// Add a click event listener to the fetch buttons
const fetchUserByIdButton = document.getElementById('fetch-button');
fetchUserByIdButton.addEventListener('click', fetchAndDisplayUser)

const fetchAllUsersButton = document.getElementById('fetch-all-button')
fetchAllUsersButton.addEventListener('click', fetchAndDisplayAllUsers)
