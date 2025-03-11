1 class:
hajusrakendused - distributed systems - that works together - we can connect different languages in one programm
Assembly
Operating Systems
Tensor
Hardware: CPU, GPU, TPM, RAM, DSP
TPM - improve security of PC
DSP - processor which works by signals
Operating system detect and control hardware - it's their main goal


2 class:
when we want to distribute computers all around the world, we need to use some tool to transfer data from one computer to another one
IP (internet protocol) - is one way to connect computers - popular method
TCP IP - transmission protocol
in IP someone need to start conversation to send data (client, server)
HTTP - next level (in the top of IP)
Windows SDK - write your own windows drivers or modify them
Network card (physical microchip on motherboard) that sends electric impulses
importing from libraries (network)

3 class:
how to read code
it's very important to read the code, as a beginner it's very cool to comment your code (why exactly this code is written here)
even estonians try to write code on english
english - main programming language

when you want to send objects you need to do serializing and deserializing
data structures: stack, list, array, matrix, hash
different objects has different data structures
game develop - matrix 

how to send object:
first step: do it into string

to do serializing or deserializing more flexible we use http
http - extra layer on tcp/ip
mostly we use http
on google console on network we can network requests and it all uses http
when you click on line we get more information about this request (only http has this thing)

HTTP contains:
client and server
request    response
example: I want to buy item, I do request ---> webserver do another request "do we have this item" ----> webserver get response for this question ----> webserver response to me
first line: request line
multiple lines: request headers
when we write string using tpc/ip, which contains http info - we can create our own server

HTTP client library
HTTP server library
methods: get, post, put, delete, options, ...

status codes:
2xx - success
3xx - redirect
4xx - client errors
5xx - server errors

programmers don't explain many of things, cause they already know it
status code is coming from the server
there can't be empty space on headers
when you want to send multiple messages you need to do connection open
when you want to send only one message you need to do connection closed and restart it after every message (create new connection)

web browser can open 20 connection on different ports to response to this 77 requests
we make hundred of connections on every page
they don't use port on ipv6, cause we can have billions of connection

Header - contains extra data about connection and staff
Accept-header: data that we want to receive back (what kind of formats web browser can read)
Content-length: how much content (bytes) we send in the body, when we want to send binary data and we don't know how long is the message


4 class:
REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other.

URL contains: protocol, domain, subdirectory, port, path, url fragment

query parameters