# Introduction / Introducción

This project consists of two files -- client.ts + server.ts

client.ts is a fishtail client that shows a single webhook/document creation
server.ts is an example development server to show how to ingest webhooks

---

Este proyecto consiste de dos archivos -- client.ts + server.ts

client.ts es un cliente de la API de fishtail que demuestra como crear un webhook y un documento
server.ts es un ejemplo de un servidor de desarrollo que demuestra como consumir webhooks

# Getting started / Configuración inicial

1. First, you'd need to create a tunnelto.dev, localtunnel, or ngrok account. The rest of this tutorial will use ngrok (https://ngrok.com/).
1. After creating the account, you'll need to download the binary file they give you and move it to your `/usr/local/bin` if you're using MacOS. If you're on Windows, you'll need to add it to your `PATH` variable so you can invoke it in the command line.
1. Clone this repo by running `git clone https://github.com/fishtailai/ft-doc-api-typescript-example.git`
1. Install dependencies by running `npm install`
1. Open a terminal window and start the development server (the one that will be receiving the webhook call) by running `npm run server`.
1. Open another terminal window without closing the first one and initialize a tunnel that exposes that server to the internet by running `ngrok http 5000` (you can change the port to whatever you're using if you decided to change it)
1. Export the environment variable that has your fishtail API key by running `export FISHTAIL_API_KEY=<<<your_key>>>` or if you're on Windows, you can just edit line `5` of the `client.ts` file hardcoding your key directly.
1. Export the environment variable that sets the webhook url by running `export WEBHOOK_URL=<<<ngrok_forwarding_url>>>` (the url should look like ` https://ef1d-186-55-250-225.ngrok-free.ap` and you'll find it in the terminal window where you ran `ngrok http 5000`). You can also hardcode it in line `6` of the `client.ts` file.
1. Open another console without closing the other two you have open and start the client that will create a webhook and a document by running `npm run client`

After that you should see output in the three terminal windows, showing that a document was created and the webhook endpoint was called.

---

1. Primero, deberás crear una cuenta en tunnelto.dev, localtunnel o ngrok. El resto de este tutorial usará ngrok (https://ngrok.com/).
1. Luego de crear tu cuenta, deberás descargar el archivo binario que te dan y moverlo a la carpeta `/usr/lcoal/bin` si estás usando MacOS. Si estás usando Windows, deberás agregarlo a tu variable `PATH` para poder invocarlo desde la consola de comandos.
1. Clona este repositorio corriendo `git clone https://github.com/fishtailai/ft-doc-api-typescript-example.git`
1. Instala las dependencias del proyecto corriendo `npm install`
1. Abre una nueva ventana de consola de comandos y arranca el servidor de desarrollo (el que esterá recibiendo la llamada del webhook) con el comando `npm run server`.
1. Abre otra ventana de consola de comandos sin cerrar la primera e inicializa el túnel que expone tu servidor a internet. Puedes hacer eso corriendo `ngrok http 5000` (recuerda que puedes utilizar cualquier puerto si lo has cambiado en `server.ts`)
1. Exporta la variable de ambiente que tiene tu clave de API de fishtail corriendo `export FISHTAIL_API_KEY=<<<your_key>>>` o, si estas en Windows, puedes editar la linea `5` del archivo `client.ts` escribiendo tu clave directamente ahí.
1. Exporta la variable de entorno que setea la url del webhook `export WEBHOOK_URL=<<<ngrok_forwarding_url>>>` (debe lucir de esta manera: ` https://ef1d-186-55-250-225.ngrok-free.ap` y la encontrarás en la consola donde corriste el comando `ngrok http 5000`). Puedes también escribirla a mano en la linea `6` de `client.ts`.
1. Abre otra ventana de consola de comandos sin cerrar ninguna de las dos que ya tienes abiertas y levanta el cliente corriendo `npm run client`.

Luego de esto, deberías ver en todas las ventanas de consola de comandos, información de los documentos creados, indicando que tu servidor fue llamado por la API de fishtail.
