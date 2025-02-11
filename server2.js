import axios from 'axios';

async function sendRequest(url, method = "GET", headers = {}, body = null) {
    const options = {
        method, // setMethod(?)
        url,
        headers, // setHeader(?, ?)
        data: body
    };

    const response = await axios(options); // send(?, ?)
    return response.data;
}

// Example usage:
sendRequest("https://jsonplaceholder.typicode.com/posts", "POST", 
    { "Content-Type": "application/json" }, 
    { title: "Hello", body: "World", userId: 1 }
).then(data => console.log(data))   
 .catch(error => console.error("Error:", error));
