# WhatsAudio

## How Does It Work?

Every audio or voice clip sent or received will be stored. Whenever you quote one of those messages and type `!ler`, that message will be forwarded to OpenAI to be transcribed. The transcribed text will then be sent as a message in the same chat screen.

## Build the Image

To build the Docker image, run the following command:

```sh
podman build . -t whats
```

## Run it (change the variables as needed)

```sh
podman run --name=whats -d --restart always \
--volume=/data/whats/session:/session \
--volume=/data/whats/mp3:/mp3 \
-e OPENAI_API_KEY=sk-proj-yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy \
-e USER_PHONE=5511999998888 \
-e PATH_MP3=/mp3 \
-e PATH_SESSION=/session \
localhost/whats:latest
```

After the container are up and running, view the logs with:

```sh
docker logs -f --tail 100 whatsaudio_lerAudio_1
```
Replace whats with the name you chose for your container if it is different (and localhost/whats as well).

Finally, scan the QR code using your phone to complete the setup.
