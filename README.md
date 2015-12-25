# invc
## A free invoicing command-line based program which uses [Parse](http://parse.com).

- Fast and easy to use
- Connects to your own Parse database

[![asciicast](https://asciinema.org/a/8pjhlts97a9n75c4j406zhdp9.png)](https://asciinema.org/a/8pjhlts97a9n75c4j406zhdp9?speed=2&theme=solarized-dark&size=medium&autoplay=1)

## Install

1. `$ npm install --save invc`
2. Create a new app for yourself on [Parse](http://parse.com). Then place your application ID and javascript key in `settings.default.js`. Save `settings.default.js` as a new file called `settings.js`.


## Usage

```
$ invc --help

Usage: invc [options]

Options:

-h, --help                     output usage information
-V, --version                  output the version number
-t, --task [task description]  Add the message for the completed task.
-c, --client [client]          The client for which the task has just been completed.
-h, --hours <n>                Number of hours spent on task.
-m, --minutes <n>              Number of minutes spent on task.
--fetch [id]                   Fetch information for particular invoiced item
--get [client]                 Get all the invoiced items for a client
```

## Todo

- Add ability to generate PDF for the client using the `$ invc --generate -c Nasa`
- Mark items are invoiced
- Push this to NPM
- Maybe clean up `invc.js` into cleaner modules

PR welcome! :smile:

## License

MIT © [Shahzeb Khan](http://shahzeb.co)
