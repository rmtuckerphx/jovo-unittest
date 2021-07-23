#!/bin/bash

printf "\n\n\n\n**** RUNNING unit-tests.sh ********************\n\n"

NODE_ENV="UNIT_TEST_ENV"

rm -rf db/tests

# node_modules/nyc/bin/nyc.js node_modules/mocha/bin/mocha 'test/**/*.test.*' --timeout 10000
node_modules/mocha/bin/mocha 'test/**/*.test.*' --timeout 10000


printf "\n\n\n\n**** COMPLETED unit-tests.sh ********************\n\n"
