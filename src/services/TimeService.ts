import { ClimaTempoService } from "./Weather/ClimaTempoService";

export class TimeService {

    executeGets = async(time:number) => {

        let intervalTime =  10000 * time;
        setInterval(this.executionProcess.bind(this), intervalTime);
    }

    executionProcess = () => {
        const date = new Date()
        
        const climatempo = new ClimaTempoService()

       // const response = climatempo.getLeopoldinaCurrentWeatherData(ClimaTempoService.leopoldina)
        console.log('Dados Pegos com sucesso - ' + date);
    }
}
