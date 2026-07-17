/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    pgm.addConstraint(
        "activities",
        "unique_activity_position_per_day",
        {
            unique: [
                "itinerary_id",
                "day_number",
                "position"
            ]
        }
    );

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {

    pgm.dropConstraint(
        "activities",
        "unique_activity_position_per_day"
    );

};
