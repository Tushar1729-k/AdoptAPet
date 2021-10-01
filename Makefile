.DEFAULT_GOAL := all
SHELL         := bash

# run docker
# -it -v $(PWD):/usr/python -w /usr/python gpdowning/python
docker:
	docker run \
		-it \
		-p 127.0.0.1:5000:5000 \
		aap-react

# get git status
status:
	make clean
	@echo
	git branch
	git remote -v
	git status

# files to check for existence
CFILES := \
	.gitignore \
	.gitlab-ci.yml

# check if CFILES exists
check: $(CFILES)

# delete temporary files
clean:
	rm -f *.tmp
	rm -rf __pycache__
