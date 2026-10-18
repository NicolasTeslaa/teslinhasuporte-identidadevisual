#!/bin/zsh
set -euo pipefail

VIDEO="/Users/tesla/Documents/teslinhasuporte-identidadevisual/assets/marketing/2026-10-18_12-26-31_assistencia-tecnica-motion_v01.mov"

test -f "$VIDEO"
swiftc tests/assert_motion.swift -o /tmp/assert_motion
/tmp/assert_motion "$VIDEO"
