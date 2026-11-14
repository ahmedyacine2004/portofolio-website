export const gitignoreContent = `# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
build/
out/
.next/
.turbo/
coverage/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment variables
.env
.env.*
.env.local
.env.development.local
.env.production.local
!.env.example

# IDE and OS files
.vscode/
.idea/
.DS_Store
Thumbs.db

# Cache and temporary files
.cache/
.eslintcache
.parcel-cache/
.npm/
tmp/
temp/

# TypeScript and testing
*.tsbuildinfo
.nyc_output/

# Local services
data/db/
docker-data/

# Miscellaneous
*.pem
*.pid
*.seed
*.pid.lock`;
