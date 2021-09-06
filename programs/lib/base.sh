#!/bin/bash

#set -o xtrace errexit
set -x -e

cd "$(dirname "$0")"
__git_toplevel="$(git rev-parse --show-toplevel)"
cd "${__git_toplevel}"
