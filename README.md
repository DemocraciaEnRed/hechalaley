# Hecha la Ley

An open-source bill tracking utility for Congresses.

## Usage

Before starting, make sure you have [Node 8.x](https://nodejs.org/) installed and [MongoDB >=3.x](mongodb.org) running.

1. Only the first time, run the bash command: `bin/ensure-indexes`. To make sure to create the indexes on your MongoDB.

2. Run the server: `npm start`

## Development

During development you can use `npm run dev` to run the server and auto-reload on any file-change.

## Docker Compose on Development

If you have [Docker](https://www.docker.com/) installed, this repo contains the file `docker-compose.yml` prepared and configured to run a complete development server with one simple command:

On the root of the project, just run `docker-compose up` and it will start a
complete server development with MongoDB and email services. It will also listen
for changes on your local files and update them accordingly:

```bash
docker-compose up
```

If you want to close the server simply press `CTRL+C`, and run the following
command to make sure that everything is stopped:

```bash
docker-compose down
```

If you change any dependency on the `package.json` you have to stop docker-compose
with the previous command, and then start it again but instructing it to rebuild
the containers:

```bash
docker-compose up --build
```

If for any chance, the previous command didn't work, you can also send the currently
running container custom commands, in this case an `npm install` to make sure all
the dependencies are updated:

```bash
docker-compose exec app npm install
```

## License

[GPL v3]: http://www.gnu.org/licenses/gpl-3.0.html
