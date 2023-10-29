import { IClimaTempoData } from "./ClimaTempoServiceInterfaces";

export class ClimaTempo {
    static leopoldina:number = 8814;
    static cataguases:number = 8814;
    static muriae:number = 8814;
    static uba:number = 8814;
    static alem_paraiba:number = 8814;
}

/* 
export class ClimaTempo {
    id: number;
    name: string;
    state: string;
    country: string;
    data: {
      date: string;
      date_br: string;
      humidity: { humidity: number };
      pressure: { pressure: number };
      rain: { precipitation: number };
      wind: {
        velocity: number;
        direction: string;
        directiondegrees: number;
        gust: number;
      };
      temperature: { temperature: number };
    }[];
  
    constructor(
      id: number,
      name: string,
      state: string,
      country: string,
      data: IClimaTempoData[]
    ) {
      this.id = id;
      this.name = name;
      this.state = state;
      this.country = country;
      this.data = data;
    }
  } 
*/
  
  