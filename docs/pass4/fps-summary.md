# Pass 4 render-call samples

Chrome DevTools touch emulation, 4× CPU throttling, 4 Mbps download and 40 ms latency. These are distinct animation-frame timestamps with actual canvas drawing calls on this host, not physical phone presentation FPS. The host cadence can reach 144Hz.

Active sample minimum: **52.4 fps**. Peak live WebGL contexts: **2**. Application console/uncaught errors: **0**.

| Viewport    | Scene                        | Source      | Average fps | p95 frame interval | Buffer    | Effective DPR |
| ----------- | ---------------------------- | ----------- | ----------: | -----------------: | --------- | ------------: |
| iphone-390  | /                            | hero-dither |       138.7 |             7.4 ms | 390 × 844 |             1 |
| iphone-390  | /                            | horizon     |       138.7 |             7.4 ms | 390 × 120 |             1 |
| iphone-390  | /services                    | iris        |       144.2 |             7.1 ms | 390 × 633 |             1 |
| iphone-390  | /ai-agents                   | glassbound  |       143.8 |             7.4 ms | 137 × 222 |          0.35 |
| iphone-390  | /work                        | shadow      |       143.8 |             7.4 ms | 390 × 844 |             1 |
| iphone-390  | /process                     | cables      |       144.1 |             7.3 ms | 390 × 844 |             1 |
| iphone-390  | /engage                      | gate        |       143.8 |             7.4 ms | 390 × 844 |             1 |
| iphone-390  | /about                       | horizon     |       126.5 |            13.9 ms | 390 × 844 |             1 |
| iphone-390  | /contact                     | ocean       |       144.2 |             7.2 ms | 390 × 844 |             1 |
| iphone-390  | /services#web                | pixels      |          82 |            20.8 ms | 390 × 471 |             1 |
| iphone-390  | /services#saas               | liquid      |       144.2 |             7.3 ms | 390 × 471 |             1 |
| iphone-390  | /services#ai                 | glossy      |       141.5 |             7.3 ms | 156 × 188 |           0.4 |
| iphone-390  | /services#mobile             | pixels      |         101 |              14 ms | 265 × 389 |             1 |
| iphone-390  | /services#cloud              | network     |       144.2 |             7.2 ms | 390 × 471 |             1 |
| iphone-390  | /services#design             | pixels      |        89.3 |            14.3 ms | 390 × 471 |             1 |
| iphone-390  | /process .tech-section       | strings     |        91.1 |            14.1 ms | 390 × 420 |             1 |
| iphone-390  | /process .architecture-stage | network     |       103.9 |             7.5 ms | 390 × 513 |             1 |
| android-412 | /                            | hero-dither |       137.8 |             7.4 ms | 412 × 915 |             1 |
| android-412 | /                            | horizon     |       137.8 |             7.4 ms | 412 × 120 |             1 |
| android-412 | /services                    | iris        |       143.9 |             7.2 ms | 412 × 686 |             1 |
| android-412 | /ai-agents                   | glassbound  |         144 |             7.3 ms | 144 × 240 |          0.35 |
| android-412 | /work                        | shadow      |       144.3 |             7.3 ms | 412 × 915 |             1 |
| android-412 | /process                     | cables      |       143.8 |             7.4 ms | 412 × 915 |             1 |
| android-412 | /engage                      | gate        |       143.9 |             7.2 ms | 412 × 915 |             1 |
| android-412 | /about                       | horizon     |       112.2 |              14 ms | 412 × 915 |             1 |
| android-412 | /contact                     | ocean       |       144.2 |             7.3 ms | 412 × 915 |             1 |
| android-412 | /services#web                | pixels      |        87.8 |            20.8 ms | 412 × 517 |             1 |
| android-412 | /services#saas               | liquid      |       144.2 |             7.3 ms | 412 × 517 |             1 |
| android-412 | /services#ai                 | glossy      |       142.2 |             7.1 ms | 165 × 207 |           0.4 |
| android-412 | /services#mobile             | pixels      |       103.2 |            14.2 ms | 281 × 428 |             1 |
| android-412 | /services#cloud              | network     |         144 |             7.2 ms | 412 × 517 |             1 |
| android-412 | /services#design             | pixels      |        88.7 |            14.6 ms | 412 × 517 |             1 |
| android-412 | /process .tech-section       | strings     |        92.4 |            14.3 ms | 412 × 456 |             1 |
| android-412 | /process .architecture-stage | network     |         134 |             7.4 ms | 412 × 563 |             1 |
| iphone-390  | /about .where-globe          | rain        |        53.3 |            20.9 ms | 390 × 881 |             1 |
| iphone-390  | /about .where-globe          | globe       |        53.3 |            20.9 ms | 390 × 532 |             1 |
| iphone-390  | /about .footer-wordmark      | rain        |         144 |             7.2 ms | 390 × 881 |             1 |
| iphone-390  | /about .footer-wordmark      | wordmark    |         144 |             7.2 ms | 390 × 220 |             1 |
| android-412 | /about .where-globe          | rain        |        52.4 |              21 ms | 412 × 881 |             1 |
| android-412 | /about .where-globe          | globe       |        52.4 |              21 ms | 412 × 576 |             1 |
| android-412 | /about .footer-wordmark      | rain        |       143.7 |             7.4 ms | 412 × 881 |             1 |
| android-412 | /about .footer-wordmark      | wordmark    |       143.7 |             7.4 ms | 412 × 220 |             1 |

## Mobile intro

The animation duration starts after the source is ready. Loading is separately measurable, and Skip is available during loading.

| Viewport    | Renderer setup after loading phase | Choreography | Stone frames |
| ----------- | ---------------------------------: | -----------: | -----------: |
| iphone-390  |                            3142 ms |      2085 ms |          238 |
| android-412 |                             767 ms |      2076 ms |          235 |

The first cold renderer setup in this throttled run is substantially slower than the warm run. The approximately 2.1-second request describes the choreography, not download/shader/geometry initialization. Physical-phone validation and further cold-start optimization remain launch checks. Source readiness, short playback, Skip and the actual hero handoff are covered by browser tests.
