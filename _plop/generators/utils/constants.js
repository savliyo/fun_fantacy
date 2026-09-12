 const GENERATOR_CONSTANTS = {
    INTEGER: 'integer',
    STRING: 'text',
    BOOLEAN: 'boolean',
    ENUM: 'ENUM',
    UNIQ: 'unique',
    PRIMARY: 'primary',
    DEFAULT_VALUE: 'defaultValue',
    WEB_FORM: {
        TYPES: {
            TEXT_AREA: 'textarea',
            SELECT: 'select',
        },
        SKIP: 'skip'
    }
}

module.exports = GENERATOR_CONSTANTS
