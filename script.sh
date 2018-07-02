#!/usr/bin/env bash
branch="$GIT_BRANCH"
user=uvdexdev
ip=35.154.252.225
if [ "$branch" = "origin/dev" ]; then
ssh $user@$ip "cd uvdexdev.ithands.net&& git status && git pull ssh_origin staging && php artisan migrate"
fi
172-31-31-34