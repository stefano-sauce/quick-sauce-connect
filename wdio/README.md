# Sauce Connect Localhost Testing (iOS Real Device)

This repository demonstrates how to successfully test a local development server (running on your workstation) on **Sauce Labs Real iOS Devices**.

## The Challenge

Testing `http://localhost` on a real iOS device in a remote cloud is notoriously difficult because:

1. **Loopback Ambiguity:** iOS interprets `localhost` as the phone itself, not your computer.
2. **App Transport Security (ATS):** Apple strictly blocks non-HTTPS traffic to `localhost` or `127.0.0.1` unless specific app permissions are granted.
3. **Network Isolation:** Real devices sit in a remote data center and cannot "see" your machine without a secure bridge.

## The Solution: Mapped Domains

Instead of using `localhost`, we use a **Mapped Domain** (e.g., `stefano.local`). By mapping this domain in your local `hosts` file and telling Sauce Connect to intercept it, we create a transparent bridge between the remote phone and your local server.

## Prerequisites

* **Sauce Connect Proxy 5.x**: Ensure you have the latest binary.
* **Node.js & NPM**: To run the WebdriverIO tests.
* **Python**: (Optional) To run a quick local web server.

## 1. Local Machine Setup

### Map your Domain

You must tell your computer that your chosen domain points to itself.

1. Open your terminal.
2. Edit your hosts file: `sudo nano /etc/hosts`.
3. Add the following line:
```text
127.0.0.1  stefano.local

```


*(You can replace `stefano.local` with any domain you prefer, just update the test config accordingly.)*

### Start a Local Server

Start the service you want to test. For a quick demo, use Python:

```bash
# In a new terminal window
python3 -m http.server 8080

```

## 2. Start Sauce Connect

Run Sauce Connect with the following flags. The `--proxy-localhost allow` flag is critical—it permits the tunnel to route traffic back to your machine's loopback address.

```bash
sc run --tunnel-name "poc-tunnel" \
       --region eu-central-1 \
       --proxy-localhost allow \
       --tunnel-domains "stefano.local"

```

## 3. Configuration & Running Tests

### WebdriverIO Config (`wdio.conf.js`)

Ensure your `baseUrl` matches your mapped domain:

```javascript
export const config = {
    // ...
    baseUrl: 'http://stefano.local:8080',
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone.*',
        'appium:automationName': 'XCUITest',
        'browserName': 'Safari',
        'sauce:options': {
            tunnelName: 'poc-tunnel',
        }
    }],
    // ...
}

```

### Run the Test

```bash
npm install
export SAUCE_USERNAME="your-user"
export SAUCE_ACCESS_KEY="your-key"
npx wdio run wdio.conf.js

```

## How to Verify Success

1. **Terminal Logs**: Look for `module=proxy` in your Sauce Connect terminal. This confirms the tunnel is intercepting the request.
2. **Sauce Labs Video**: You will see Safari on the real iPhone loading the directory listing of your local computer.
3. **Sauce Labs Commands**: The `/url` command will show `http://stefano.local:8080` instead of a generic `localhost`.
