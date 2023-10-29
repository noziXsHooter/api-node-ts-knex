import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('weather_data_details', table => {
  
        table.increments('cod').primary();
        table.integer('cod_weather_data').notNullable();
        table.timestamp('date').nullable();
        table.timestamp('date_br').nullable();
        table.float('humidity').nullable();
        table.float('pressure').nullable();
        table.float('rain_preciptation').nullable();
        table.float('wind_velocity').nullable();
        table.string('wind_direction', 5).nullable();
        table.float('wind_directiondegrees').nullable();
        table.float('wind_gust', 50).nullable();
        table.float('temperature', 50).nullable();
        table.string('icon', 4).nullable();
        table.string('sensation', 3).nullable();
        table.string('condition', 10).nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("weather_data_details");
}

