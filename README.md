# Whisperzap

## How Does It Work?

Every audio or voice clip sent or received will be stored. 
Whenever you quote one of those messages and type `!w`, that message will be forwarded to OpenAI to be transcribed. 
The transcribed text will then be sent as a message in the same chat screen.

## Requirements
1. Docker
2. OpenAI API. You can sign up [here](https://platform.openai.com/settings/organization/billing/overview)

## Build the Image

```sh
docker build . -t whisperzap
```

## Edit docker-compose.yml and run:

```sh
docker compose up -d
```

After the container is up and running, view the logs:

```sh
docker logs -f --tail 100 whisperzap
```

Finally, scan the QR code using your phone to complete the setup.
