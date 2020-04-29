---
layout: post
title: CURL cheatsheet
---

---
layout: post
title: Curl & HTTP cheatsheet
---

-H: Shorthand for Header, this option lets us add or replace HTTP Header Fields. 
Example: -H "Content-Type: application/json"

-d: Shorthand for data, this is the option we will use when we need to send data to the server. 
Example with a JSON payload: -d '{"name":"John Smith"}'

-i, –include: When using this option, curl will not only display the body of the response sent back, but also the headers.

-I, –head: This option tells curl to make a HEAD request which will only get the header of a document and not its body.

-X, –request: This option specifies what kind of HTTP method we want to use in our request. 
The default is GET but we can use this option to send POST, PUT, PATCH or DELETE requests, for example.

-v to make curl more verbose

8 header fields:

- Content-Type
is a very important header since it defines how the representation is serialized. 
It contains the media type of the representation. In our case, you can see how incorrect it is. 
It defines the media type as being `text/html` when we actually received a JSON document (media type `application/json`).
There is obviously a bug in our server and we will need to fix it.

- Content-Length
indicates the size of the body sent in the response, in octets.

- X-XSS-Protection
- X-Content-Type-Options
- X-Frame-Options
- Connection
- Server.

Content-Type 
