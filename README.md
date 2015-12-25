# invc
## A free invoicing command-line based software.

- Fast and easy to use
- Connects to your own Parse database

[![asciicast](https://asciinema.org/a/8pjhlts97a9n75c4j406zhdp9.png)](https://asciinema.org/a/8pjhlts97a9n75c4j406zhdp9?speed=2&theme=solarized-dark)

## Install

```
$ npm install --save invc
```
#### Add your Parse settings:
Create a new app on [Parse](http://parse.com). Then place your application ID and javascript key in `settings.default.js`. Save this as a new file called `settings.js`.


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

## License

MIT © [Shahzeb Khan](http://shahzeb.co)
