.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL := bash

# All of these make commands must be called in root directory

# run docker
docker:
	docker run -p 5000:5000  

# run docker-compose
docker-compose:
	docker-compose up

all:

# auto format the code
format: 
	black ./backend/main.py

install:
	pip install -r ./backend/requirements.txt

# check files, check their existence with make check
CFILES :=
	.gitignore
	.gitlab-ci.yml

# uncomment the following line once you've pushed your test files
# you must replace GitLabID with your GitLabID

# check the existence of check files
check: $(CFILES)

# remove temporary files
clean:
	rm -f *.tmp
	rm -rf __pycache__
	