import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('services', table => {
        table.increments('id_service').primary();
        table.integer('id_appointment').notNullable().references('id_appointment').inTable('appointments');
        table.integer('id_employee').notNullable().references('id_employee').inTable('employees');
        table.string('service_name', 40).nullable();
       // table.string('', 40).nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('services');
}

