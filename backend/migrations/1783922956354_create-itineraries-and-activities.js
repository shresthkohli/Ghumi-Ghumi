/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export function up(pgm) {

    pgm.createTable(
        "itineraries",
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

            destination_id: {
                type: "uuid",
                notNull: true,
                references: "destinations",
                onDelete: "CASCADE"
            },

            title: {
                type: "text",
                notNull: true
            },

            description: {
                type: "text"
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

    pgm.createTable(
        "activities",
        {
            id: {
                type: "uuid",
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },

            itinerary_id: {
                type: "uuid",
                notNull: true,
                references: "itineraries",
                onDelete: "CASCADE"
            },

            day_number: {
                type: "integer",
                notNull: true,
                check: "day_number > 0"
            },

            position: {
                type: "integer",
                notNull: true,
                check: "position > 0"
            },

            title: {
                type: "text",
                notNull: true
            },

            description: {
                type: "text"
            },

            start_time: {
                type: "time",
                notNull: true
            },

            end_time: {
                type: "time",
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

    pgm.addConstraint(
        "activities",
        "activities_time_check",
        {
            check: "end_time > start_time"
        }
    );

}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export function down(pgm) {

    pgm.dropTable("activities");

    pgm.dropTable("itineraries");

}
