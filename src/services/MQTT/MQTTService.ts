
import * as MQTT from 'mqtt';
import * as CRYPTO from 'crypto';
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from "express";
//import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'; 
import axios from 'axios';
import { stringify } from 'querystring';
import { sqliteConnect } from "../../database/index";

interface IMQTTMessage {
    messageLevel: string,
    message: string,
    device: string,
    deviceDateTime: string
}

export class MqttSubscriber {
    private client: MQTT.MqttClient;
    private myDevices = ['PSS-01'];
    private myTopics = ['my/test/topic', 'home/sensor/passing']

    constructor() {
        const options: MQTT.IClientOptions = {
            host: process.env.HIVEMQTT_HOST,
            port: 8883,
            protocol: 'mqtts',
            username: process.env.HIVEMQTT_USERNAME,
            password: process.env.HIVEMQTT_PASSWORD
        };

        this.client = MQTT.connect(options);

        this.client.on('connect', () => {
            console.log('Conectado ao Broker Mqtt');
            // Assine o tópico quando a conexão é estabelecida
            this.myTopics.forEach((topic) => {
                this.client.subscribe(topic, { qos: 2 }, (err, granted) => {
                    if (!err) {
                        console.log('Inscrito com sucesso: ' + topic);
                    }
                });
                console.log(topic);
            });
        });

        this.client.on('error', (error) => {
            console.log(error);
        });

        this.client.on('message', (topic, message) => {
            // Chamado sempre que uma mensagem é recebida
            const messageFromBuffer = message.toString();

            const dateTime = new Date();
            const hashString = dateTime.getDate().toString(); //A hashString é o dia atual
            const algorithm = 'sha256';
            const token = CRYPTO.createHash(algorithm).update(hashString).digest('hex');

            try {
                const objectMessage = JSON.parse(messageFromBuffer);
                let newPayload = {
                    dateTime: dateTime,
                    token: token,
                    payload: objectMessage
                };
                console.log('Mensagem Recebida:', topic, JSON.stringify(newPayload));

                this.handleMessage(topic, objectMessage);

            } catch (error: any) {
                console.log('Mensagem com formato incorreto!!!');
                console.log('Mensagem Recebida:', topic, message.toString());
            }
        });

        this.client.on('close', () => {
            console.log('Desconectado. Tentando reconectar...');
            setTimeout(() => {
                this.connectMqttClient();
            }, 5000); // Espere 5 segundos antes de tentar reconectar
        });
    }

    private connectMqttClient() {
        this.client = MQTT.connect(this.client.options);
    }

    private handleMessage(topic: string, message: IMQTTMessage) {
        //Pega nivel da mensagem
        if (message.messageLevel) {
            const levelMessage = this.handleMessageLevel(message.messageLevel);
            console.log('Mostrando a mensagem em HANDLE:' + levelMessage + ' TOPIC: ' + topic);
            //console.log('Mostrando a mensagem em HANDLE:' + message.messageLevel.toString() + ' TOPIC: ' + topic);
        }
        //Verifica dispositivo
        if (message.device) {
            this.handleDevice(message.device, topic);
        }
        //Verifica Data-Hora
        if (message.deviceDateTime) {
            this.handleDeviceDateTime(message.deviceDateTime);
        }
    }

    private handleMessageLevel(level: string) {
        const mapLevelMessage:any = {
            'level1': 'LEVEL 1: Mensagem comum  ',
            'level2': 'LEVEL 2: Mensagem de alerta!',
            'level3': 'LEVEL 3: Mensagem de perigo!!!'
        }
        const messageResult = mapLevelMessage[level] ?? 'Nível da mensagem inexistente!'


        switch (level) {
            case 'level1':
                //SALVAR NO BANCO DE DADOS
                console.log('LEVEL 1: Mensagem comum');
                break;
            case 'level2':
                //SALVAR NO BANCO DE DADOS
                console.log('LEVEL 2: Mensagem de alerta!');
                break;
            case 'level3':
                //SALVAR NO BANCO DE DADOS
                console.log('LEVEL 3: Mensagem de perigo!!!');
                break;
            default:
                console.log('Message level does not exist!');
                break;
        }
    }

    private handleDevice(device: string, topic: string) {
        //É um dipositivo válido???
        if (!this.myDevices.includes(device)) {
            console.log('Dispositvo desconhecido enviou uma mensagem no topico: ' + topic);
            return;
        }
    }

    private handleDeviceDateTime(deviceDateTime: any) {
        const deviceDateTimeDateType: any = new Date(deviceDateTime);
        //Data-Horas incompatíveis/desalinhados
        const currentServerDateTime: any = new Date();
        // Calcula a diferença em milissegundos
        const timeDifference = currentServerDateTime - deviceDateTimeDateType;
        // Define o limite de 10 minutos em milissegundos
        const tenMinutesInMilliseconds = 10 * 60 * 1000;
        // Verifica se a diferença é maior que 10 minutos para mais ou para menos
        if (Math.abs(timeDifference) > tenMinutesInMilliseconds) {
            console.log('A diferença é maior do que 10 minutos para mais ou para menos.' + deviceDateTimeDateType + ' - ' + currentServerDateTime);
        }
    }

    private insertMessageDBLog = async (message: any) => {
        try {
            const dataItem = message.data;
            await sqliteConnect("weather_data_details").insert({
                cod_weather_data: message.id,
                date: dataItem.date ?? null,
                date_br: dataItem.date_br ?? null,
                humidity: dataItem.humidity ?? null,
                pressure: dataItem.pressure ?? null,
                rain_preciptation: dataItem.precipitation ?? null,
                wind_velocity: dataItem.wind_velocity ?? null,
                wind_direction: dataItem.wind_direction ?? null,
                wind_directiondegrees: dataItem.directiondegrees ?? null,
                sensation: dataItem.sensation ?? null,
                condition: dataItem.condition ?? null,
                icon: dataItem.icon ?? null,
                wind_gust: dataItem.gust ?? null,
                temperature: dataItem.temperature ?? null,
            })

            console.log('Dados do registro salvos com sucesso!');
            console.log('Data inserted successfully.');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}
// Para usar a classe exportada:
// const subscriber = new MqttSubscriber();


/* 
{
    "messageLevel": "level2",
    "message": "Hello from passing device",
    "device": "PSS-01",
    "deviceDateTime": "dsds"
}
 */