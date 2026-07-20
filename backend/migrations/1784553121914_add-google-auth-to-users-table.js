export async function up(pgm) {

    pgm.alterColumn(
        "users",
        "password_hash",
        {
            notNull: false
        }
    );

    pgm.addColumns(
        "users",
        {
            google_id: {
                type: "text",
                unique: true
            },

            avatar_url: {
                type: "text"
            }
        }
    );
}

export async function down(pgm) {

    pgm.dropColumns(
        "users",
        [
            "google_id",
            "avatar_url"
        ]
    );

    pgm.alterColumn(
        "users",
        "password_hash",
        {
            notNull: true
        }
    );
}