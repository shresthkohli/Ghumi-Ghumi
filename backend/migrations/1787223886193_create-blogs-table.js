export async function up(pgm) {

    pgm.createTable(
        "blogs",
        {
            id: {
                type: "uuid",
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },

            user_id: {
                type: "uuid",
                notNull: true,
                references: "users",
                onDelete: "CASCADE"
            },

            title: {
                type: "text",
                notNull: true
            },

            content: {
                type: "text",
                notNull: true
            },

            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("CURRENT_TIMESTAMP")
            }
        }
    );

}

export async function down(pgm) {

    pgm.dropTable("blogs");

}