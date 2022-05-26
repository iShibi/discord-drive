# discord-drive

A CLI tool to use Discord as a cloud storage

## Installation

```bash
npm i discord-drive -g
```

## Configuration

The cli needs a discord bot token to access the Discord API and a channel id to send messages in. Run the following commands to add them:

```bash
 ddrive config -t <token> -c <channel_id>
```

The `token` and `channel_id` will be stored as plaintext in a `ddrive_config.json` file inside the home directory i.e. `os.homedir()` for later use.

## Preview

```bash
PS D:\> ddrive
A CLI tool to use Discord as a cloud storage

VERSION
  discord-drive/0.0.1 win32-x64 node-v16.15.0

USAGE
  $ ddrive [COMMAND]

TOPICS
  plugins  List installed plugins.

COMMANDS
  config   Set information required by ddrive
  help     Display help for ddrive.
  plugins  List installed plugins.
  say      Send a text in chat
```

## TODO

Add support for file uploads
