---
layout: post
title: CURL cheatsheet
---

---
layout: post
title: Curl & HTTP cheatsheet
---

- *-H*: Shorthand for Header, this option lets us add or replace HTTP Header Fields. 
Example: -H "Content-Type: application/json", "Content-Type: text/html; charset=utf-8"

- *-d*: Shorthand for data, this is the option we will use when we need to send data to the server. 
Example with a JSON payload: -d '{"name":"John Smith"}'

- *-i*, –include: When using this option, curl will not only display the body of the response sent back, but also the headers.

- *-I*, –head: This option tells curl to make a HEAD request which will only get the header of a document and not its body.

- *-X*, –request: This option specifies what kind of HTTP method we want to use in our request. The default is *GET* but we can use this option to send *POST*, *PUT*, *PATCH* or *DELETE* requests, for example.

- *-v* to make curl more verbose

8 header fields:

- Content-Type: defines how the representation is serialized. It contains the media type of the representation.

- Content-Length: indicates the size of the body sent in the response, in octets.

- X-XSS-Protection
- X-Content-Type-Options
- X-Frame-Options
- Connection
- Server.
