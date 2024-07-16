# WhatsAudio

## How Does It Work?

Every audio or voice clip sent or received will be stored. Whenever you quote one of those messages and type `!ler`, that message will be forwarded to OpenAI to be transcribed. The transcribed text will then be sent as a message in the same chat screen.

## Build the Image

To build the Docker image, run the following command:

```sh
docker build . -t whats3
```

## Configure Your docker-compose.yml File
1. Fill in the OPENAI_API_KEY variable with your OpenAI API key.
2. Add your phone number to the USER_PHONE variable, including the country code. Brazilian users might need to avoid the leading 9 if the account is old enough.
3. Make sure you have a paid account registered with the OpenAI API. You can sign up [here](https://platform.openai.com/settings/organization/billing/overview).
4. Edit the paths in the device: lines as necessary.
5. Ensure the required directories are created.

## Run it

```sh
docker-compose up -d
```

After the container are up and running, view the logs with:

```sh
docker logs -f --tail 100 whatsaudio_lerAudio_1
```
Replace whatsaudio_lerAudio_1 with the name you chose for your container if it is different.

Finally, scan the QR code using your phone to complete the setup.
