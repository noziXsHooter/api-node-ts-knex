
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';
import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';
import weatherRoute from './routes/weather.route';
import filesRoute from './routes/files.route';
import { TimeService } from './services/TimeService';
import { ClimaTempoService } from "./services/Weather/ClimaTempoService";
import documentsRoute from './routes/documents.route';
import { NetworkUtils } from './utils/NetworkUtils';
import './services/MQTT/MQTTService';
import { MqttSubscriber } from './services/MQTT/MQTTService';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const apiKey = process.env.CLIMATEMPO_API_KEY;

//VIEWS
app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);//Usar html no node
app.set('view engine', 'html');

app.get('/chat', (req, res) => {
    res.render('index.html');
})

app.get('/teste', (req, res) => {
    res.render('teste.html');
})

let messages: any = []

let infoClimate: any = {}

let climaTempoService = new ClimaTempoService();

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });

    /*    async function getFirstRenderInfo() {
           infoClimate = await climaTempoService.getLeopoldinaCurrentWeatherData(ClimaTempoService.leopoldina);
           socket.broadcast.emit('infoClimate', {infoClimate})
       }
   
       getFirstRenderInfo(); */

    /*     setInterval(async function () {
            infoClimate = await climaTempoService.getLeopoldinaCurrentWeatherData(ClimaTempoService.leopoldina);
    
            socket.broadcast.emit('infoClimate', {infoClimate})
            console.log("again");
        }, 60000); */
});

// Exemplo de uso da classe
const networkUtils = new NetworkUtils();
const localIP = networkUtils.getLocalIPAddress();
console.log('Endereço IP local:', localIP);

setInterval(async function () {
    infoClimate = await climaTempoService.getLeopoldinaCurrentWeatherData(ClimaTempoService.leopoldina);

    io.emit('infoClimate', { infoClimate });
    console.log("interval");
}, 1000 * 60 * 30); //30min /climatempo/leopoldina/now

// MQTT CONECTION
const MQTTSubscriber = new MqttSubscriber();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute);
app.use(statusRoute);
app.use(weatherRoute);
app.use(filesRoute);
app.use(documentsRoute);

//const timeService = new TimeService()
//timeService.executeGets(2)// Será executado dentro das horas passadas

app.listen(3000, () => {
    console.log('Executando na porta 3000, http://localhost:3000');
});

server.listen(5000, () => {
    console.log('Executando na porta 5000, http://localhost:5000');
});
