## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
```

Important! Start a redis container using docker

```bash
docker run --name my-redis -p 6379:6379 -d redis
```

or config your own redis server found at

```bash
redis.ts
```

if you do not have docker, ask google.

After succesfully initialized redis, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This application uses cypress for end-to-end testing. The tests are really basic (there should be more of them).

To run the tests:

```bash
npm run test
```

## Other information

Because the amount of data coming from the bad-api, I could not find a free service to host the redis instance. This also means, that currently the application is only possible to host locally if you initialize redis using the command above.

## Images of project
