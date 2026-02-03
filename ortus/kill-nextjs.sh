#!/bin/bash
# kill-nextjs.sh - Safely kill Next.js dev server processes
#
# Usage: ./ortus/kill-nextjs.sh [--port PORT]
#
# This script kills Next.js processes without affecting the Ralph loop.
# The problem: `pkill -f "next"` matches the claude process because the
# Ralph prompt contains "npx next lint", causing the loop to halt.
#
# Safe approach: Target specific process patterns or use port-based killing.

set -e

PORT=3000

while [[ $# -gt 0 ]]; do
  case $1 in
    --port) PORT="$2"; shift 2 ;;
    -h|--help) head -n 15 "$0" | tail -n +2 | sed 's/^# //' | sed 's/^#//'; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

# Method 1: Kill by port (most reliable)
# Find PIDs listening on the port and kill them
kill_by_port() {
  local pids
  pids=$(lsof -ti :"$PORT" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "Killing processes on port $PORT: $pids"
    echo "$pids" | xargs kill 2>/dev/null || true
    sleep 1
    # Force kill any remaining
    pids=$(lsof -ti :"$PORT" 2>/dev/null || true)
    if [ -n "$pids" ]; then
      echo "Force killing remaining: $pids"
      echo "$pids" | xargs kill -9 2>/dev/null || true
    fi
    return 0
  fi
  return 1
}

# Method 2: Kill by specific process name pattern
# Only matches actual Next.js server processes, not claude
kill_by_pattern() {
  # Target "next-server" which is the actual Next.js process
  # This pattern won't match "npx next lint" in prompt text
  local pids
  pids=$(pgrep -f "next-server" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "Killing next-server processes: $pids"
    echo "$pids" | xargs kill 2>/dev/null || true
    sleep 1
    return 0
  fi

  # Also kill "next dev" command processes (the parent shell)
  pids=$(pgrep -f "sh -c next dev" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "Killing 'next dev' processes: $pids"
    echo "$pids" | xargs kill 2>/dev/null || true
    return 0
  fi

  return 1
}

# Try port-based killing first, then pattern-based
if kill_by_port; then
  echo "Successfully killed Next.js on port $PORT"
elif kill_by_pattern; then
  echo "Successfully killed Next.js processes"
else
  echo "No Next.js processes found to kill"
fi
