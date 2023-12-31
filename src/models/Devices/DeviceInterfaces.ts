
interface IDevice {
  cod: number|string
  device_id?: string;
  description?: string;
  status?: string; //Is running?
  state?: string; //Is operacional?
  token?: string;
  locale?: string|object;
  num_sensors?: number;
  sensors?: object;
  visible?: string;
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