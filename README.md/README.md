```md
# Playwright CI/CD Template

## 📦 Setup
```bash
npm install
```

## 🧪 Run tests
```bash
npm test
```

## 👀 Run in headed mode
```bash
npm run test:headed
```

## 📊 View HTML report
```bash
npx playwright show-report
```

## ⚙️ CI/CD
- Runs automatically on every push and pull request
- Generates HTML report
- Uploads screenshots, videos, and traces as artifacts

## 📁 Structure
- tests/ → test files
- pages/ → page objects
- utils/ → test data

## 🐳 Optional Docker
```bash
docker build -t playwright-tests .
docker run playwright-tests
```
```md
# Playwright CI/CD Template

## Setup
npm install

## Run tests
npm test

## View report
npx playwright show-report

## CI
Runs automatically on push & PR via GitHub Actions
```

---
