# Network Analysis

## Website

The website was analyzed using Google Chrome DevTools.

## Browser Setup

* Browser: Google Chrome
* DevTools panel: Network
* Disable cache: Enabled
* Cache was disabled before reloading the page.
* The page was reloaded while the Network panel was open.

## Network Results

### Request Count

The page generated **15 network requests** during the page load.

### Total Page Size

The Network panel reported:

* **805 kB transferred**
* **1.7 MB resources**

The transferred size represents the data transferred over the network, while the resources value represents the total size of the loaded resources.

### Slowest Resource

The slowest resource visible in the Network panel was:

* **Resource:** `49ff7b84f672b50.png?q=60`
* **Type:** `webp`
* **Size:** 46.1 kB
* **Time:** 1.58 s
* **Status:** 200

This was the single slowest resource in the captured Network request list.

### 3xx / 4xx Responses

No **3xx** or **4xx** responses were observed in the captured Network requests.

All 15 visible requests had a **200** status code.

A `200 OK` status means that the server successfully processed the request and returned the requested resource.

## Observation

The Network panel shows that loading a webpage requires multiple HTTP requests for different types of resources, including JavaScript files, images, fetch requests, and XHR requests. The waterfall provides information about when each request was made and how long it took to complete.

In this page load, 15 requests were recorded. The total transferred data was 805 kB, while the total resource size was 1.7 MB. The slowest resource took 1.58 seconds to load.
