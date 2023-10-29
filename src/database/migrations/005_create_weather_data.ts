import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('weather_data', table => {

        table.increments('cod').primary();
        table.string('id', 8).primary();
        table.string('name', 50).notNullable();
        table.string('state', 2).notNullable();
        table.string('country', 5).notNullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("weather_Data");
}

