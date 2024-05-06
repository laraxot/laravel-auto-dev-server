# Node.js Server for Laravel Auto-Dev Client

This is a Node.js server designed specifically to interface with the `laravel-auto-dev` client. The server handles requests to automatically generate code using the OpenAI API.

## Features

The server provides an endpoint:

- **POST** `/generate` - This endpoint accepts POST requests to generate code. It listens to requests at the URL `http://localhost:3000/generate`. Upon receiving a request, the server processes the data and utilizes OpenAI to generate the requested code.

## Usage with Artisan

The default Artisan command is configured to call this endpoint. Once the server response is received, Artisan will retrieve the generated code contents and copy them into the appropriate files in the Laravel project.

## Server Setup

To get the server running, follow these steps:

1. Clone the repository.
2. Install dependencies and start the server with `npm install && npm run dev`.

## Contributing

If you wish to contribute to the project, you can fork the repository and create a pull request with your changes.

---

This server is crucial for automating code generation in a Laravel development setting using the capabilities of OpenAI.
