import meow from 'meow';

const cli = meow({
    flags: {
        action: {
            type: 'string',
            alias: 'a',
        },
        file: {
            type: 'string',
            alias: 'f',
        },
        path: {
            type: 'string',
            alias: 'p',
        },
        help: {
            type: 'boolean',
            alias: 'h',
        },
    },
    autoHelp: false,
});

export default cli;
