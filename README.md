# Test Automation Framework - UI & API Testing

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Framework Architecture](#framework-architecture)
- [Directory Structure](#directory-structure)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Command-Line Parameters](#command-line-parameters)
- [Test Reports & Artifacts](#test-reports--artifacts)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

A comprehensive dual-mode test automation framework built with **Playwright** and **Cucumber BDD**, supporting both **UI** and **API** testing capabilities. This framework provides end-to-end testing for web applications and RESTful APIs with rich reporting and cross-browser support.

### UI Testing Capabilities
- **Target Application**: DemoQA BookStore Application
- **Features**: User authentication, book search, profile management
- **Browser Support**: Chrome, Firefox, WebKit/Safari
- **Device Emulation**: 100+ mobile and desktop configurations via Playwright devices
- **Visual Documentation**: Screenshots and video recordings for all test executions

### API Testing Capabilities  
- **Target API**: ReqRes.in REST API (https://reqres.in)
- **Features**: User registration, user retrieval, user updates, CRUD operations
- **Validation**: Response status codes, JSON response validation, error handling
- **Documentation**: Comprehensive logging of requests and responses

### Framework Highlights

- ✅ **Unified BDD Approach** - Single framework for UI and API testing with Cucumber
- ✅ **Cross-Browser Testing** - Chrome (with stealth mode), Firefox, Safari/WebKit support
- ✅ **Mobile Emulation** - Test on 100+ device configurations using Playwright devices
- ✅ **Rich Reporting** - HTML reports with cucumber-html-reporter, screenshots, videos, and Playwright traces
- ✅ **Page Object Model** - Maintainable and scalable UI test architecture
- ✅ **Base API Classes** - Reusable API testing components with request/response logging
- ✅ **Comprehensive Logging** - Winston-based structured logging for debugging
- ✅ **TypeScript** - Type-safe code with full IDE support

---

## 🛠 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | 1.51.1 | Browser automation and API testing |
| **Cucumber** | 11.2.0 | BDD framework for test scenarios |
| **TypeScript** | Latest | Type-safe programming language |
| **Node.js** | 18+ | Runtime environment |
| **Winston** | 3.8.2 | Structured logging for debugging |
| **multiple-cucumber-html-reporter** | 3.3.0 | Enhanced HTML test reports |
| **playwright-extra** | 4.3.6 | Stealth plugin for realistic browser behavior |
| **puppeteer-extra-plugin-stealth** | 2.11.2 | Stealth mode for Chrome browser |
| **fs-extra** | 11.1.1 | Enhanced file system operations |
| **@faker-js/faker** | 9.6.0 | Test data generation |
| **axios** | 1.9.0 | HTTP client for API operations |

---

## 🏗 Framework Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Scenarios (BDD)                     │
│             Cucumber Feature Files (.feature)               │
│              UI Features | API Features                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   Step Definitions                          │
│         UI Steps (Page Actions) | API Steps (HTTP)          │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│        Page Object Model (UI) | API Classes (API)           │
│   HomePage | BookStorePage | LoginPage | UserAPI           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Base Classes & Utilities                       │
│      BasePage (UI) | BaseAPI (API) | Logger | Utils        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│          Playwright Driver & API Context                    │
│      Browser Automation | HTTP Request Context             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
test-automation-framework/
├── config/
│   ├── cucumber-ui.js          # UI test runner configuration
│   └── cucumber-api.js         # API test runner configuration
│
├── tests/
│   ├── ui/                     # UI Testing Suite
│   │   ├── features/           # BDD Gherkin feature files
│   │   │   └── bookStore.feature
│   │   │
│   │   ├── pages/              # Page Object Model (POM)
│   │   │   ├── BasePage.ts
│   │   │   ├── HomePage.ts
│   │   │   ├── LoginPage.ts
│   │   │   └── BookStorePage.ts
│   │   │
│   │   ├── steps/              # Cucumber step definitions
│   │   │   ├── HomePage.steps.ts
│   │   │   ├── LoginPage.steps.ts
│   │   │   └── BookStorePage.steps.ts
│   │   │
│   │   ├── helper/
│   │   │   ├── browsers/
│   │   │   │   └── browserManager.ts    # Browser launch configurations
│   │   │   ├── config/
│   │   │   │   └── urls.json            # Environment URLs
│   │   │   ├── report/
│   │   │   │   └── report.ts            # HTML report generator
│   │   │   └── utils/
│   │   │       ├── logger.ts            # Winston logger config
│   │   │       └── utils.ts             # Utility functions & timeouts
│   │   │
│   │   ├── fixtures/           # Test data files
│   │   │   ├── books.json      # Book details configuration
│   │   │   └── login.json      # Login credentials
│   │   │
│   │   ├── hooks/
│   │   │   └── hooks.ts        # Before/After hooks for UI tests
│   │   │
│   │   └── customWorld.ts      # Custom World for UI context
│   │
│   └── api/                    # API Testing Suite
│       ├── features/           # API BDD feature files
│       │   └── user.feature
│       │
│       ├── api/                # API classes and methods
│       │   ├── BaseAPI.ts      # Base API class with logging
│       │   └── UserAPI.ts      # User-specific API methods
│       │
│       ├── steps/              # API step definitions
│       │   └── User.steps.ts
│       │
│       ├── helper/
│       │   ├── report/
│       │   │   └── report.ts   # HTML report generator
│       │   └── utils/
│       │       └── logger.ts   # Winston logger config
│       │
│       ├── hooks/
│       │   └── hooks.ts        # Before/After hooks for API tests
│       │
│       └── customWorld.ts      # Custom World for API context
│
├── test-results/               # Auto-generated test artifacts
│   ├── cucumber-ui-report.html
│   ├── cucumber-ui-report.json
│   ├── cucumber-api-report.html
│   ├── cucumber-api-report.json
│   ├── screenshots/
│   ├── videos/
│   ├── logs/
│   ├── trace/
│   └── book-details.json
│
├── .gitignore
├── .vscode/
│   └── settings.json           # VSCode Cucumber settings
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📋 Setup Instructions

### Prerequisites

Before setting up the framework, ensure you have:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher)
- **Git** - [Download](https://git-scm.com/)
- **Supported OS**: Windows 10+, macOS 10.15+, or Linux

### Verify Installation

```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show v9.0.0 or higher
git --version     # Should show git version 2.x.x
```

### Installation Steps

1. **Clone the repository:**

```bash
git clone <repository-url>
cd test-automation-framework
```

2. **Install dependencies:**

```bash
npm install
```

This command will:
- Install all required npm packages from package.json
- Automatically download Playwright browsers (Chromium, Firefox, WebKit) via postinstall script
- Set up TypeScript and other dev dependencies

3. **Verify Installation:**

```bash
# Check Playwright installation
npx playwright --version

# Verify browsers are installed
npx playwright install --dry-run
```

### Manual Browser Installation (If Needed)

```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## ▶️ Running Tests

### Quick Start Commands

#### UI Tests

```bash
# Run all UI tests (default: Chrome, Desktop)
npm run ui-test

# Run UI tests with specific tags
npm run ui-test --TAGS="@smoke"

# Run UI tests on specific browser
npm run ui-test --BROWSER=chrome
npm run ui-test --BROWSER=firefox
npm run ui-test --BROWSER=webkit
```

#### API Tests

```bash
# Run all API tests
npm run api-test

# Run API tests with specific tags
npm run api-test --TAGS="@positive"
npm run api-test --TAGS="@create"
```

#### Sequential Execution (UI then API)

```bash
# Run UI tests first, then API tests (stops on failure)
npm test
```

### What Happens During Test Execution?

#### UI Test Execution
✅ Browser launches in **headed mode** (headless: false) with 50ms slow motion  
✅ Video recording starts automatically for each scenario  
✅ Screenshots captured on **pass/fail** states  
✅ Playwright traces captured with sources, screenshots, and snapshots  
✅ Detailed logs written to `test-results/logs/{scenario-name}/log.log`  
✅ Videos renamed to `{ScenarioName}_PASS.webm` or `{ScenarioName}_FAIL.webm`

#### API Test Execution
✅ API request context initialized with base URL (https://reqres.in)  
✅ Custom headers added: `Content-Type: application/json`, `x-api-key: reqres-free-v1`  
✅ HTTP requests logged with full request/response details  
✅ Response validation and status code checking  
✅ Structured logging for API interactions  
✅ JSON reports generated for CI/CD integration

---

## 🎮 Command-Line Parameters

### UI Test Parameters

| Parameter | Description | Example | Values |
|-----------|-------------|---------|--------|
| `--TAGS` | Run specific tagged scenarios | `npm run ui-test --TAGS="@smoke"` | Any Cucumber tag |
| `--BROWSER` | Select browser profile | `npm run ui-test --BROWSER=firefox` | `chrome`, `firefox`, `webkit` |
| `--DEVICES` | Emulate device from Playwright's device list | `npm run ui-test --DEVICES="iPhone 12"` | Any Playwright device name |
| `--ENV` | Select environment | `npm run ui-test --ENV=dev` | `local`, `dev` (from urls.json) |

### API Test Parameters

| Parameter | Description | Example | Values |
|-----------|-------------|---------|--------|
| `--TAGS` | Run specific tagged API scenarios | `npm run api-test --TAGS="@create"` | `@create`, `@get`, `@update`, `@positive`, `@negative` |

### Combined Execution Examples

```bash
# UI tests with specific tag
npm run ui-test --TAGS="@bookstore"

# API positive test cases
npm run api-test --TAGS="@positive"

# API negative test cases
npm run api-test --TAGS="@negative"

# Run both suites sequentially
npm test
```

### Cross-Browser Testing (UI Only)

```bash
# Run on Chrome with stealth mode (default)
npm run ui-test --BROWSER=chrome

# Run on Firefox
npm run ui-test --BROWSER=firefox

# Run on Safari/WebKit
npm run ui-test --BROWSER=webkit
```

### Device Emulation (UI Only)

The framework uses Playwright's built-in device descriptors. Default is "Desktop Chrome".

#### Mobile Devices

```bash
# iPhone devices
npm run ui-test --DEVICES="iPhone 12"
npm run ui-test --DEVICES="iPhone 14 Pro Max"

# Android devices
npm run ui-test --DEVICES="Pixel 5"
npm run ui-test --DEVICES="Galaxy S9+"
```

#### Desktop Configurations

```bash
# High DPI displays
npm run ui-test --DEVICES="Desktop Chrome HiDPI"

# Standard displays
npm run ui-test --DEVICES="Desktop Chrome"
```

---

## 📊 Test Reports & Artifacts

### Generated Artifacts

After every test run, the following artifacts are automatically generated in the `test-results/` directory:

#### 1. HTML Test Reports

**UI Report**: `test-results/cucumber-ui-report.html`
- Generated via cucumber-js built-in HTML formatter
- Contains scenario execution status, timing, and steps

**API Report**: `test-results/cucumber-api-report.html`
- Generated via cucumber-js built-in HTML formatter
- Contains API test execution details

**Enhanced Reports** (Optional):
- Location: `test-results/reports/`
- Generated using `multiple-cucumber-html-reporter`
- Contains metadata: browser, device, platform info
- Run report generators manually:
  ```bash
  # UI Report
  node tests/ui/helper/report/report.ts
  
  # API Report
  node tests/api/helper/report/report.ts
  ```

#### 2. JSON Reports (for CI/CD)

- **UI**: `test-results/cucumber-ui-report.json`
- **API**: `test-results/cucumber-api-report.json`
- **Format**: Standard Cucumber JSON format
- **Usage**: CI/CD integration, custom reporting

#### 3. Screenshots (UI Only)

- **Location**: `test-results/screenshots/`
- **Naming Convention**: 
  - `{ScenarioName}_PASS.png` (on test pass)
  - `{ScenarioName}_FAIL.png` (on test fail)
- **Format**: PNG
- **Captured**: Automatically on both pass and fail states

#### 4. Video Recordings (UI Only)

- **Location**: `test-results/videos/`
- **Format**: WebM (web-optimized)
- **Naming Convention**: 
  - `{ScenarioName}_PASS.webm`
  - `{ScenarioName}_FAIL.webm`
- **Contains**: Full test execution from browser launch to close
- **Configuration**: Set in `hooks.ts` via `recordVideo` option

#### 5. Playwright Traces (UI Only)

- **Location**: `test-results/trace/{scenario-id}.zip`
- **Format**: ZIP files (one per scenario)
- **Contents**: Sources, screenshots, snapshots, network logs
- **View traces**:

```bash
npx playwright show-trace test-results/trace/{scenario-id}.zip
```

#### 6. Execution Logs (Both UI & API)

- **Location**: `test-results/logs/{scenario-name}/log.log`
- **Format**: Timestamped Winston logs with format: `MMM-DD-YYYY HH:mm:ss`

**UI Example:**
```
info: [Jan-19-2026 22:30:15]: Navigated to DemoQA homepage
info: [Jan-19-2026 22:30:17]: Opened Book Store Application
info: [Jan-19-2026 22:30:18]: Clicked Login button
info: [Jan-19-2026 22:30:20]: Entered username
info: [Jan-19-2026 22:30:21]: Searched book: Learning JavaScript Design Patterns
```

**API Example:**
```
info: [Jan-19-2026 22:30:15]: API Test Context Initialized
info: [Jan-19-2026 22:30:16]: API POST Request: /api/register
info: [Jan-19-2026 22:30:16]: Request Body: {"email":"eve.holt@reqres.in","password":"pistol"}
info: [Jan-19-2026 22:30:17]: API Response Status: 200
info: [Jan-19-2026 22:30:17]: API Response Body: {"id":"4","token":"QpwL5tke4Pnpja7X4"}
```

#### 7. Test Data Files (UI Only)

- **Location**: `test-results/book-details.json`
- **Purpose**: Stores book search results for validation
- **Format**: JSON
- **Example Content**:
```json
{
  "title": "Learning JavaScript Design Patterns",
  "author": "Addy Osmani",
  "publisher": "O'Reilly Media"
}
```

### Viewing Reports

```bash
# Open UI test report (Windows)
start test-results/cucumber-ui-report.html

# Open UI test report (macOS)
open test-results/cucumber-ui-report.html

# Open UI test report (Linux)
xdg-open test-results/cucumber-ui-report.html

# Open API test report  
start test-results/cucumber-api-report.html    # Windows
open test-results/cucumber-api-report.html     # macOS

# View Playwright trace for debugging (UI)
npx playwright show-trace test-results/trace/{trace-id}.zip

# View logs for specific scenario (Windows)
type test-results/logs/{scenario-name}/log.log

# View logs for specific scenario (macOS/Linux)
cat test-results/logs/{scenario-name}/log.log
```

---

## 🎯 Test Scenarios

### UI Test Scenarios

**Feature**: DemoQA Bookstore Operations

| Scenario | ID | Description | Tags |
|----------|-----|-------------|------|
| Login and search for a book in bookstore | TC_1 | Complete workflow: login → search → validate → logout | None |

**Steps covered**:
1. Navigate to DemoQA homepage
2. Open Book Store Application
3. Click Login button
4. Login with valid credentials
5. Validate username display
6. Validate Logout button visibility
7. Search for a specific book
8. Validate search results
9. Export book details to JSON file
10. Logout successfully

### API Test Scenarios

**Feature**: ReqRes User Management API

| Scenario | ID | Description | Tags |
|----------|-----|-------------|------|
| Successfully create a new user and validate response | TC_1 | Create user, validate status and fields | `@create`, `@positive` |
| Successfully retrieve user details by ID | TC_2 | Create user, store ID, retrieve details | `@get`, `@positive` |
| Successfully update user name and validate | TC_3 | Create user, update details, validate | `@update`, `@positive` |
| Cannot retrieve user with invalid ID | TC_4 | Negative test for invalid user ID | `@get`, `@negative` |

**API Endpoints tested**:
- `POST /api/register` - User registration
- `GET /api/user/{id}` - Get user details
- `PUT /api/user/{id}` - Update user details

---

## 🔧 Configuration Details

### Browser Configuration (browserManager.ts)

- **Headed Mode**: Tests run with visible browser (`headless: false`)
- **Slow Motion**: 50ms delay between actions for better visibility
- **Window**: Starts maximized (`--start-maximized`)
- **Stealth Mode**: Chrome uses stealth plugin to avoid bot detection
- **Supported Browsers**: Chrome, Firefox, WebKit

### Timeouts (hooks.ts & utils.ts)

- **Global Timeout**: 360 seconds (6 minutes) - set via `setDefaultTimeout(60 * 1000 * 6)`
- **Page Timeout**: 120 seconds (2 minutes) - set via `page.setDefaultTimeout(120000)`
- **Expect Timeout**: 15 seconds - defined in `utils.ts` as `TIMEOUTS.EXPECT`

### URLs Configuration (urls.json)

```json
{
    "local": "http://localhost:8081/",
    "dev": "https://demoqa.com/"
}
```

Default environment: `dev`  
Can be changed via: `--ENV=local` or `--ENV=dev`

### Credentials (login.json)

```json
{
    "username": "testuser123",
    "password": "Test@1234"
}
```

Can be overridden via environment variables:
- `USER` - for username
- `PWD` - for password

### API Configuration (customWorld.ts & cucumber-api.js)

- **Base URL**: `https://reqres.in`
- **API Key**: `reqres-free-v1`
- **Headers**: 
  - `Content-Type: application/json`
  - `x-api-key: reqres-free-v1`

---

## 🔧 Troubleshooting

### Common Issues

#### UI Test Issues

**Browser Launch Failures**

```bash
# Reinstall browsers
npx playwright install

# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

**Element Not Found Errors**
- Check timeout settings in `utils.ts` (`TIMEOUTS.EXPECT = 15000`)
- Verify selectors in page object files (HomePage.ts, LoginPage.ts, BookStorePage.ts)
- Review screenshots in `test-results/screenshots/` for actual page state
- Check page timeout: `page.setDefaultTimeout(120000)` in hooks.ts

**Video Recording Issues**
- Ensure sufficient disk space for video files
- Video files are finalized after context closes
- Check video permissions in `hooks.ts`
- Verify `fs-extra` installation: `npm install fs-extra`
- Videos use 2-second delay before renaming to avoid file lock issues

**Login Failures**
- Verify credentials in `tests/ui/fixtures/login.json`
- Check if environment variables `USER` and `PWD` are set (they override fixture)
- Ensure DemoQA site is accessible

#### API Test Issues

**Connection Errors**
- Verify API base URL in `config/cucumber-api.js` worldParameters: `'https://reqres.in'`
- Check network connectivity to https://reqres.in
- Review API context initialization in `tests/api/hooks/hooks.ts`
- Verify API key header is set correctly

**Response Validation Failures**
- Check expected response structure in step definitions
- Verify response logging in `tests/api/api/BaseAPI.ts`
- Review API logs in `test-results/logs/{api-scenario}/log.log`
- Ensure ReqRes API is functioning (check https://reqres.in)

**User ID Storage Issues**
- User IDs are stored in scenario-scoped variable `storedUserId`
- Ensure `getUserId()` is called after user creation
- Check that `getCreatedUserData()` returns valid response

#### General Issues

**TypeScript Compilation Errors**

```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --noEmit

# Verify TypeScript installation
npx tsc --version
```

**Report Generation Issues**
- Ensure `test-results` directory exists (created automatically)
- Check that tests actually ran and generated JSON files
- Verify HTML report dependencies: `npm list multiple-cucumber-html-reporter`
- Reports are auto-generated by cucumber-js (HTML and JSON)

**Cucumber Step Definition Not Found**
- Verify step definitions are in correct locations
- Check `require` paths in cucumber config files
- Ensure TypeScript files are being compiled: `ts-node/register` in requireModule
- VSCode users: check `.vscode/settings.json` for Cucumber extension configuration

**Module Import Errors**
- Ensure `tsconfig.json` has correct configuration
- Check `resolveJsonModule: true` for JSON imports
- Verify `esModuleInterop: true` for CommonJS modules

### Debug Commands

```bash
# Run with Cucumber dry run (validate steps without execution)
npm run ui-test --dry-run

# Run single scenario for debugging (add @debug tag to scenario)
npm run ui-test --TAGS="@debug"

# Generate and view Playwright trace
npx playwright show-trace test-results/trace/{scenario-id}.zip

# Check API response details in logs
cat test-results/logs/{api-scenario}/log.log

# View all log files
ls test-results/logs/

# Check Node/npm versions
node --version && npm --version

# Verify Playwright installation
npx playwright --version
```

### Log Analysis

**UI Logs Location**: `test-results/logs/{ScenarioName}{ScenarioId}/log.log`

Example log entries to look for:
- Page navigation: "Navigated to DemoQA homepage"
- Element interactions: "Clicked Login button", "Entered username"
- Validations: "Validated username: testuser123"

**API Logs Location**: `test-results/logs/{ScenarioName}{ScenarioId}/log.log`

Example log entries to look for:
- Context setup: "API Test Context Initialized"
- Requests: "API POST Request: /api/register"
- Request body: "Request Body: {...}"
- Responses: "API Response Status: 200", "API Response Body: {...}"
- Validations: "✓ User creation validated successfully"

### Support

For additional support:
- Check execution logs in `test-results/logs/` for detailed error messages
- Review screenshots in `test-results/screenshots/` for UI failures
- Examine videos in `test-results/videos/` for full execution flow
- Use Playwright traces (`npx playwright show-trace`) for deep debugging
- Verify configuration files (cucumber-ui.js, cucumber-api.js, tsconfig.json)
- Check network connectivity for API tests
- Ensure browsers are properly installed

---

## 📄 License

This project is licensed under the ISC License