install: # разворачивание и запуск
	npm ci $(PKG)

lint: # запуск линтера
	npx eslint .

publish:
	npm publish --dry-run