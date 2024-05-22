# Sequelize Migrations Guide

This guide will walk you through setting up Sequelize in VS Code, creating migrations files, adding columns, undoing migrations, changing column types, and undoing those changes.

## Prerequisites

- Node.js installed
- VS Code installed
- A database (e.g., MySQL, PostgreSQL, SQLite, etc.)
- Sequelize CLI installed.

### Step 1: Install Sequelize CLI

1. Open your terminal.
2. Navigate to your project directory.
3. Install Sequelize CLI

   `npm install sequelize-cli --save`

### Step 2: Create Migration File

1. Open your terminal.
2. Navigate to your project directory.

   `npx sequelize-cli migrations:generate --name name-your-migrations-file`

3. This will create a migrations file in migrations folder in the root directory.

``` Example
   'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

```

### Step 3: Add Schema in Migration File

1. Suppose, if you already have models defined in your project. In that case, you don't need to manually add schema definitions in your migration files, as the ORM framework will generate and manage these migrations for you.
2. If you change the schema in your existing defined models, you must use queryInterface.addColumn("table_name", "field_name", { fieldAttributes }) in your newly created migration file.

``` Example

'use strict';

/\*_ @type {import('sequelize-cli').Migration} _/
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("table_name", "filedName", {
            field attribute
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("table_name", "filedName")
    }
};

```

1. If you add a new column, you must remove that column in the **down** section.
2. If you want to undo the changes, the **down** section will need the information for the column that needs to be removed.
3. If you add one **addColumn**, then you must add one **removeColumn** in the **down** section.
4. If you add **two columns**, you must add **removeColumn twice** with their respective column names in the **down** section.


### Step 4: Run The Migration

1. If you want to run the migrations for only specific file then you need to run the migrations command:

   ```npx sequelize-cli db:migrate --name your-specific-migrations-file-name```

2. If you want to run the migration for all migrations, then you need to run the migration command:

   ```npx sequelize-cli db:migrate```

3. After running the migration, if you require to add new columns, then you must follow step 2 again. Do not undo the migration if you want to create new columns.

4. You can undo the migration globally or for a single migration only by using the following commands:

   ```npx sequelize-cli db:migrate:undo:all ``` // this will undo all the modifications

   ```npx sequelize-cli db:migrate:undo --name file-name-you-want-to-undo ``` // this will undo only the selcted file

### Step 5(Optional): Column Attributes Changes

1. If you add new column attributes, and run the migration, and then want to update the column attributes, you have to follow step 2 again and use:

```
queryInterface.changeColumn("table_name" , "column_name" , {
updated attributes
})

Example

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Change the column type in the existing table
        await queryInterface.changeColumn('YourTableName', 'newField', {
            type: Sequelize.INTEGER, // new type
            allowNull: false, // update any other constraints as needed
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Revert the column type back to the original type
        await queryInterface.changeColumn('YourTableName', 'newField', {
            type: Sequelize.STRING, // original type
            allowNull: true, // revert any other constraints as needed
        });
    },
};
```

The original Type remain the same in the down section in case you want to revert the updated attributes.

2. You can track the status for every mogration you created by run this command

   ```npx sequelize-cli db:migrate:status```

    - **up:** This function defines the changes that should be applied to the database schema when the migration is applied.

   - **down:** This function defines the opposite of the up function. It specifies the changes that should be applied to revert the migration when it is rolled back.

   
   ``` 
   Example
   npx sequelize-cli db:migrate:status

   Sequelize CLI [Node: 18.16.0, CLI: 6.6.2, ORM: 6.37.3]

   Loaded configuration file "src/api/config/config.json".
   Using environment "development".
   up 20240520101847-create-users-table.js
   up 20240520103617-create-asset-table.js
   up 20240520104549-create-assetHistory-table.js
   up 20240520131521-create-test-table.js
   up 20240520141115-create-fraz.js
   up 20240520141445-create-asset-table.js
   up 20240521055641-create-test-table.js
   up 20240521055937-create-test-table.js
   up 20240521062709-create-test-table.js
   up 20240521063652-create-test-table.js
   up 20240521070914-create-test-table.js
   down 20240521064106-create-emailTemplate-table.js
   ```

For changing the column attributes, always run the migration on the file where you change the attributes. If you run the migration globally, it can crash the schema.

If you have 3 pending migration files and you run the migration globally, you might encounter errors such as:

```
ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'true) ENGINE=InnoDB'
```

Or if some files have been modified for adding new columns, you might encounter:

```
ERROR: Duplicate column name 'column_name'
```

Therefore, it is better to run the migrations separately to avoid errors and conflicts.

**Precautions**

1. When adding a column in the up section, don't forget to remove the column in the down section.
2. Do the same for changing the column attributes.
3. Always create a new migration file if you want to modify the schema.
