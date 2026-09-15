.PHONY: setup serve build pdf update clean

setup: ## Install dependencies and git hooks
	pnpm install

serve: ## Local preview (Honkit serve)
	pnpm start

build: ## Static build into ./dist
	pnpm build

pdf: ## Build PDFs for all locales
	pnpm pdf:ru
	pnpm pdf:en
	pnpm pdf:es

update: ## Bump all dependencies to latest (npm-check-updates)
	pnpm deps:update

clean: ## Remove build output and installed deps
	rm -rf dist node_modules
