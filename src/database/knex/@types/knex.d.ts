

declare module 'knex/types/tables' {
    interface Tables {
        id: IID, //3477
    name: IName,//"São Paulo"
    state: IState,//"SP"
    country: ICountry, //"BR"
    data: IData[
    {
         date: "2019-09",
         climate_temperature: {
             last_year: {
                 min: 15,
                 max: 26
              },
              normal: {
                 min: 14,
                 max: 24
              },
              forecast: {
                 min: 17,
                 max: 27
              }
         },
   }]
    }
}