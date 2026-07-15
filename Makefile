install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

build:
	npm run build

check: lint build