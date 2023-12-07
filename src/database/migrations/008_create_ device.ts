import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('devices', table => {
  
        table.increments('cod').primary();
        table.string('device_id', 50).nullable();
        table.string('description', 50).nullable();
        table.text('token').nullable();
        table.text('locale').nullable();
        table.string('state', 5).nullable();
        table.integer('num_sensors').nullable();
        table.text('sensors').nullable();
        table.timestamp('visible').nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        //table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').defaultTo(knex.fn.now()); //SQLITE
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("devices");
}

