import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('appointments', table => {
        table.increments('id_appointment').primary();
        table.integer('id_customer').notNullable().references('id_customer').inTable('customers');
        table.dateTime('date_time').notNullable();
        table.string('note', 100).nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('appointments');
}

