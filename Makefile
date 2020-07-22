# Setup environment variables
sinclude .env
export $(shell [ -f .env ] && sed 's/=.*//' .env)

# ./node_modules/.bin on the PATH
SHELL := /bin/bash
export PATH := ./node_modules/.bin:$(PATH)

deploy:
	serverless deploy --verbose --region ap-southeast-1 --stage prod