import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('devices_data', table => {
  
        table.increments('cod').primary();
        table.integer('level_cod').nullable();
        table.string('level_message', 50).nullable();
        table.text('token').nullable();
        table.timestamp('device_id').nullable();
        table.float('message').nullable();
        table.text('payload').nullable();
        table.timestamp('date_time_server').nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("devices_data");
}

