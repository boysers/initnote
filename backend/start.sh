#!/usr/bin/env bash

# install new dependencies if any
npm install

# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt

echo "Starting API server"

npm run serve

# npm install && npm uninstall bcrypt && npm install bcrypt && npm run serve
