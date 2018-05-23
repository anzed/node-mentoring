import meow from 'meow';

const cli = meow(`
    Usage
      $ npm run streams -- <input>
 
    Options
      --action, -a  Choose action
      --file, -f  Choose file to read from
      --path, -p  Choose path to directory with css files
      --help, -h  Type to see this message again

    Example
      $ npm run streams -- --action=cssBundler --path=styles
    `, {
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
