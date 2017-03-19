# Billtracker

An open-source bill tracking utility for Congresses.

## Usage

Before starting, make sure you have [Node 4.x](https://nodejs.org/) installed and [MongoDB >=3.x](mongodb.org) running.

1. Clone the repo

2. Initialize local git repository used to save bill's history with:  `npm run init`

3. Install dependencies: `npm install`

4. Run the server: `npm run build && npm start`

## Development

During development you can use `npm run dev` to run the server and auto-reload on any file-change; and `npm run watch` to watch changes on the frontend bundle.

## Docker Usage

1. Make sure to have [Docker](https://docker.com) installed.

2. Copy `docker/development.docker-compose.yml.example` to `docker/development.docker-compose.yml`

3. Run `docker-compose -f docker/development.docker-compose.yml up --build`
  * If you want to install a dependency o restart, use: `docker exec -it billtracker-dev bash` to connect to the runnning container.

4. Profit 🙌

## License

[GPL v3]: http://www.gnu.org/licenses/gpl-3.0.html
