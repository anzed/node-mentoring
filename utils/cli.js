import meow from 'meow';

const cli = meow(`
    Usage
      $ node -r babel-register utils/streams.js <input>
 
    Options
      --action, -a  Choose action
      --file, -f  Choose file to read from
      --path, -p  Choose path to directory with css files
      --help, -h  Type to see this message again

    Example
      $ node -r babel-register utils/streams.js --action=cssBundler --path=styles
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
