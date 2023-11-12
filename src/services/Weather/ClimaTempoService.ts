import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from "express";
//import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'; 
import axios from 'axios';
import { stringify } from 'querystring';
import { ClimaTempo } from "./ClimaTempo";
import { sqliteConnect } from "../../database/index";
import { IWeatherLocaleCityData } from "./ClimaTempoServiceInterfaces";

interface IHeaders {
  Authorization?: string,
  'User-Agent': string,
  'Content-Type': string
}

export class ClimaTempoService extends ClimaTempo {

  private apiKey = process.env.CLIMATEMPO_API_KEY; // Sua chave de API
  private cityId = '8814'; // ID da cidade de Leopoldina no ClimaTempo

  public headers = {
    'Authorization': process.env.CLIMATEMPO_API_KEY, // Se necessário
    'User-Agent': 'leopoldina', 
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  public baseUrl = process.env.CLIMATEMPO_BASE_URL; // apiClimaTempo
  public urlLocales = `/api-manager/user-token/${this.apiKey}/locales`;
  public apiUrl72Hours: string = `/api/v1/forecast/locale/${this.cityId}/hours/72?token=${this.apiKey}`;
  public apiUrlCurrentWeather: string = `/api/v1/weather/locale/${this.cityId}/current?token=${this.apiKey}`;
  private apiUrlText: string = `/api/v1/anl/synoptic/locale/BR?token=${this.apiKey}`;

  public climateMock: object = {
    id: "3477",
    name: "São Paulo",
    state: "SP",
    country: "BR",
    data: [
      {
        date: "2021-02-19 00:00:00",
        date_br: "19/02/2021 00:00:00",
        humidity: {
          humidity: 69.4
        },
        pressure: {
          pressure: 916.1
        },
        rain: {
          precipitation: 0
        },
        wind: {
          velocity: 4.4,
          direction: "ESE",
          directiondegrees: 125,
          gust: 4.8
        },
        temperature: {
          temperature: 20
        }
      }
    ]
  }

  public climateNowMock: object = {
    "id": 8814,
    "name": "Leopoldina",
    "state": "MG",
    "country": "BR  ",
    "data": {
      "temperature": 15,
      "wind_direction": "ENE",
      "wind_velocity": 6.7,
      "humidity": 93.6,
      "condition": "Chuva",
      "pressure": 971.5,
      "icon": "5",
      "sensation": 15,
      "date": "2023-08-27 17:48:15"
    }
  }

  
testConnection = async () => {
  try {
    const url = this.baseUrl + `/api/v1/anl/synoptic/locale/BR?token=${this.apiKey}`;
    const response = await axios.get(url, { headers: this.headers });

    if (response.status === 200) {
      const data = response.data;
      console.log(data);
    } else {
      console.log(`Erro na solicitação: Código de Status ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}

  getLeopoldinaWeatherData = async () => {
    try {
      const url = this.baseUrl + this.apiUrl72Hours;
      const response = await axios.get(url, { headers: this.headers })
      // await this.insertData(this.climateMock)

      console.log('Dados climáticos de Leopoldina.');
      return response.data
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados climáticos:', error);
    }
  }

  getLeopoldinaCurrentWeatherData = async (cityId: any | null) => {
    try {
      const url = this.baseUrl + `/api/v1/weather/locale/${cityId}/current?token=${this.apiKey}`;;
      const response = await axios.get(url, { headers: this.headers })
     // console.log(process.env.CLIMATEMPO_API_KEY)
     // console.log('after')
      await this.insertData(response.data)
      console.log('Dados climáticos de Leopoldina agora.');
      return response.data
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados climáticos:', error);
    }
  }

  getRegisteredLocales = async () => {
    try {
      const url = this.baseUrl + this.urlLocales;
      const response = await axios.get(url, { headers: this.headers })
      // await this.insertData(this.climateMock)

      console.log('Dados climáticos inseridos no banco de dados.');
      return response.data
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados climáticos:', error);
    }
  }

  public inputArray//: IWeatherLocaleCityData[] 
    = [
      {
        id: 8814,
        name: "Leopoldina",
        state: "MG",
        country: "BR",
        data: {
          temperature: 15,
          wind_direction: "ENE",
          wind_velocity: 6.7,
          humidity: 93.6,
          condition: "Chuva",
          pressure: 971.5,
          icon: "5",
          sensation: 15,
          date: "2023-08-27 17:48:15"
        }
      },

    ];
  /* 
     getThisWeekLocaleAverage(cityId: any|null)//: IWeatherLocaleCityData 
    {
      try{
  
      const averageData: Partial<IWeatherLocaleCityData['data']> = {};
  
      const propertiesToAverage = [
          'temperature',
          'wind_velocity',
          'humidity',
          'pressure',
          'sensation'
      ];
  
      for (const prop of propertiesToAverage) {
          const values = dataArray.map(item => item.data[prop]);
          const sum = values.reduce((acc, value) => acc + value, 0);
          averageData[prop] = sum / dataArray.length;
      }
  
      return {
          id: dataArray[0].id,
          name: dataArray[0].name,
          state: dataArray[0].state,
          country: dataArray[0].country,
          data: averageData as IWeatherLocaleCityData['data']
      };async
    } catch (error) {
      console.error('Ocorreu um erro calcular os dados climáticos:', error);
    }
  }
   */



  insertLocale = async (req: Request, res: Response) => {
    try {
      const body = req.body.localeId;
      const cityId = ClimaTempo.leopoldina;
      const data = stringify({
        'localeId[]': cityId
      });

      const url = this.baseUrl + this.urlLocales;
      const response = await axios.put(url, data, { headers: this.headers })

      if (response.data.status == "success") {
        const localeInfo = await this.getLeopoldinaCurrentWeatherData(cityId)
        console.log(localeInfo);
        await sqliteConnect("weather_data").insert({
          id: localeInfo.id,
          name: localeInfo.name,
          state: localeInfo.state,
          country: localeInfo.country
        })
      }

      console.log('Localidade inserida com sucesso.');
    } catch (error) {
      console.error('Ocorreu um erro ao inserir localidade:', error);
    }
  }

  insertData = async (climateMock: any) => {
    try {

      const dataItem = climateMock.data;
      await sqliteConnect("weather_data_details").insert({
        cod_weather_data: climateMock.id,
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


      /* 
            await sqliteConnect.transaction(async (trx) => {
              const [firstTableId] = await trx("weather_data").insert({
                id: climateMock.id,
                name: climateMock.name,
                state: climateMock.state,
                country: climateMock.country,
              });
      
              const dataItem = climateMock.data[0];
      
              await trx('weather_data_details').insert({
                cod_weather_data: climateMock.id,
                date: dataItem.date,
                date_br: dataItem.date_br,
                humidity: dataItem.humidity.humidity,
                pressure: dataItem.pressure.pressure,
                rain_preciptation: dataItem.rain.precipitation,
                wind_velocity: dataItem.wind.velocity,
                wind_direction: dataItem.wind.direction,
                wind_directiondegrees: dataItem.wind.directiondegrees,
                wind_gust: dataItem.wind.gust,
                temperature: dataItem.temperature.temperature,
              });
            })
       */
      /* const dataId = await knex('weather_data').select('cod').where('cod', climateMock.cod).first(); */
      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

}





/* 
insertData = async (climateMock: any) => {
  try {
    await sqliteConnect.transaction(async (trx) => {
      const [firstTableId] = await trx("weather_data").insert({
        id: climateMock.id,
        name: climateMock.name,
        state: climateMock.state,
        country: climateMock.country,
      });

      const dataItem = climateMock.data[0];

      await trx('weather_data_details').insert({
        cod_weather_data: firstTableId,
        date: dataItem.date,
        date_br: dataItem.date_br,
        humidity: dataItem.humidity.humidity,
        pressure: dataItem.pressure.pressure,
        rain_preciptation: dataItem.rain.precipitation,
        wind_velocity: dataItem.wind.velocity,
        wind_direction: dataItem.wind.direction,
        wind_directiondegrees: dataItem.wind.directiondegrees,
        wind_gust: dataItem.wind.gust,
        temperature: dataItem.temperature.temperature,
      });
    })

   // const dataId = await knex('weather_data').select('cod').where('cod', climateMock.cod).first();
    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
} */



/*     private users: Data[] = [];
    private nextId: number = 1;
 
  createUser(name: string, email: string): User {
    const newUser: User = {
      id: this.nextId,
      name,
      email,
    };
 
    this.users.push(newUser);
    this.nextId++;
 
    return newUser;
  }
 
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
 
  getUsers(): User[] {
    return this.users;
  }
}
 
export default UserService; */