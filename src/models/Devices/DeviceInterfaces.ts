
interface Devices {
  cod: number;
  device_id: string;
}

interface DeviceCreationData {
  name: string;
  serialNumber: string;
  description: string;
  // Outros campos do dispositivo, se necessário
}

interface DeviceDataRecord {
  cod_level: number,
  device_id: string,
  message_level: string,
  message: string,
  payload: string
  token: string,
  date_time_server: string
}