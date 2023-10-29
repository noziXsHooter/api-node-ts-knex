import { knex } from 'knex';

export const sqliteConnect = knex({
    
        client: 'sqlite3',
        connection: {
          filename: './database.sqlite'
        },
        useNullAsDefault: true  
})