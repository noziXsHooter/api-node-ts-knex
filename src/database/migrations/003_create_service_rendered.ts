import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('service-rendered', table => {
        table.increments('id_employee').primary();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.string('whatsapp').notNullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("service_rendered");
}

