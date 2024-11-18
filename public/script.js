document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission--

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log('Data being sent:', JSON.stringify(data)); // Log the data being sent

    fetch('submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify that we're sending JSON
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
    .then(response => {
        console.log('Response status:', response.status); // Log the response status
        return response.json().then(json => {
            if (!response.ok) {
                throw new Error(json.message || 'Network response was not ok'); // Use the server message if available
            }
            return json; // Return the parsed JSON if response is ok
        });
    })
    .then(data => {
        alert(data.message); // Show success message
        document.getElementById('myForm').reset(); // Reset the form after submission
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was an error submitting the form. Please try again.');
    });
});