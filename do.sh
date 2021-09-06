#!/bin/bash

#set -o xtrace errexit
set -x -e

cd "$(dirname "$0")"
cd "$(git rev-parse --show-toplevel)"

