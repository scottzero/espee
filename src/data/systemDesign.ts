export type SystemDesignTopic = {
  id: string
  number: number
  title: string
  subtitle: string
  coreIdea: string
  svg: string
  keyPoints: string[]
  whenAsked: string[]
}

export const systemDesignTopics: SystemDesignTopic[] = [
  {
    id: 'caching',
    number: 1,
    title: 'Caching',
    subtitle: 'Store frequently accessed data for fast retrieval',
    coreIdea: "Instead of hitting your database every time, you store the result of expensive operations in a fast in-memory store like Redis. Cache hits return instantly. Cache misses go to the DB and then store the result for next time. The tradeoff is stale data — you need a strategy for when to invalidate.",
    svg: `<svg width="100%" viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Incoming request -->
  <rect x="200" y="20" width="200" height="44" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="300" y="47" text-anchor="middle" font-family="system-ui" font-size="13" fill="#e8e7e2">Incoming request</text>

  <!-- Arrow down -->
  <line x1="300" y1="64" x2="300" y2="94" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- Check cache -->
  <rect x="150" y="94" width="300" height="52" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="300" y="116" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#ffffff">Check cache by key</text>
  <text x="300" y="134" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">Redis or in-memory store</text>

  <!-- cache hit label -->
  <text x="155" y="175" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">cache hit</text>
  <!-- Arrow left down -->
  <path d="M220 146 L155 146 L155 194" fill="none" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- cache miss label -->
  <text x="445" y="175" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">cache miss</text>
  <!-- Arrow right down -->
  <path d="M380 146 L445 146 L445 194" fill="none" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- Return cached -->
  <rect x="60" y="194" width="190" height="52" rx="8" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="155" y="216" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#6fcba0">Return cached data</text>
  <text x="155" y="234" text-anchor="middle" font-family="system-ui" font-size="11" fill="#4a9a75">Fast — no DB call</text>

  <!-- Query DB -->
  <rect x="350" y="194" width="190" height="52" rx="8" fill="#4a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="445" y="216" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#f09595">Query database</text>
  <text x="445" y="234" text-anchor="middle" font-family="system-ui" font-size="11" fill="#c06060">Slower — store result</text>

  <!-- Arrow down from query DB -->
  <line x1="445" y1="246" x2="445" y2="276" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- Store in cache -->
  <rect x="350" y="276" width="190" height="44" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="445" y="303" text-anchor="middle" font-family="system-ui" font-size="13" fill="#e8e7e2">Store in cache</text>

  <!-- Strategies section -->
  <line x1="40" y1="345" x2="560" y2="345" stroke="#333" stroke-width="0.5" stroke-dasharray="4 4"/>
  <text x="300" y="362" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="500" fill="#888">cache strategies</text>
</svg>`,
    keyPoints: [
      'Cache hit — data found, returned instantly without touching DB',
      'Cache miss — data not found, query DB and store result in cache',
      'TTL (Time to Live) — cache entries expire after a set time',
      'LRU eviction — when cache is full, remove least recently used entries',
      'Cache invalidation — actively delete cache when underlying data changes',
      'Write-through — write to cache and DB simultaneously',
      'Write-behind — write to cache first, DB asynchronously',
    ],
    whenAsked: [
      '"how would you scale this system?"',
      '"your API is slow, how do you fix it?"',
      '"design a news feed / social media timeline"',
      '"design a rate limiter"',
      'any system with repeated reads of the same data',
    ]
  },
  {
    id: 'load-balancing',
    number: 2,
    title: 'Load Balancing',
    subtitle: 'Distribute traffic across multiple servers',
    coreIdea: "A load balancer sits in front of your servers and routes incoming requests so no single server gets overwhelmed. It also handles failover — if one server goes down, traffic automatically routes to healthy ones. The key question is always: which algorithm do you use to distribute traffic?",
    svg: `<svg width="100%" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Clients -->
  <rect x="20" y="80" width="100" height="36" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="70" y="103" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e8e7e2">Client 1</text>

  <rect x="20" y="140" width="100" height="36" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="70" y="163" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e8e7e2">Client 2</text>

  <rect x="20" y="200" width="100" height="36" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="70" y="223" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e8e7e2">Client 3</text>

  <!-- Arrows to LB -->
  <line x1="120" y1="98" x2="200" y2="148" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="120" y1="158" x2="200" y2="158" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="120" y1="218" x2="200" y2="168" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- Load balancer -->
  <rect x="200" y="120" width="140" height="76" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="270" y="152" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#ffffff">Load Balancer</text>
  <text x="270" y="170" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">round robin / least conn</text>

  <!-- Arrows to servers -->
  <line x1="340" y1="138" x2="420" y2="98" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="340" y1="158" x2="420" y2="158" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="340" y1="178" x2="420" y2="218" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- Servers -->
  <rect x="420" y="60" width="120" height="56" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="480" y="84" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#85B7EB">Server 1</text>
  <text x="480" y="102" text-anchor="middle" font-family="system-ui" font-size="11" fill="#5a8aaa">healthy</text>

  <rect x="420" y="130" width="120" height="56" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="480" y="154" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#85B7EB">Server 2</text>
  <text x="480" y="172" text-anchor="middle" font-family="system-ui" font-size="11" fill="#5a8aaa">healthy</text>

  <rect x="420" y="200" width="120" height="56" rx="8" fill="#3a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="480" y="224" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#f09595">Server 3</text>
  <text x="480" y="242" text-anchor="middle" font-family="system-ui" font-size="11" fill="#c06060">down</text>

  <!-- Algorithms -->
  <text x="300" y="290" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">algorithms: round robin · least connections · IP hash · weighted</text>
</svg>`,
    keyPoints: [
      'Round robin — requests distributed evenly in rotation',
      'Least connections — send to server with fewest active connections',
      'IP hash — same client always routes to same server (sticky sessions)',
      'Weighted — more powerful servers get more traffic',
      'Health checks — LB automatically removes unhealthy servers',
      'Layer 4 (transport) vs Layer 7 (application) load balancing',
      'Horizontal scaling — add more servers behind the LB',
    ],
    whenAsked: [
      '"how do you handle 10x traffic growth?"',
      '"design a system that needs high availability"',
      '"what happens if one of your servers crashes?"',
      'any large scale system design question',
      '"how would you avoid a single point of failure?"',
    ]
  },
  {
    id: 'databases',
    number: 3,
    title: 'SQL vs NoSQL',
    subtitle: 'Choosing the right database for your use case',
    coreIdea: "SQL databases store data in tables with fixed schemas and support complex joins and transactions. NoSQL databases trade some of that structure for flexibility and horizontal scalability. Neither is universally better — the choice depends on your data shape, query patterns, and scale requirements.",
    svg: `<svg width="100%" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <!-- SQL side -->
  <rect x="20" y="20" width="260" height="260" rx="12" fill="#1a1a2e" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="500" fill="#b0afff">SQL</text>
  <text x="150" y="68" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">PostgreSQL, MySQL</text>

  <rect x="40" y="82" width="220" height="28" rx="4" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="101" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">structured, fixed schema</text>

  <rect x="40" y="118" width="220" height="28" rx="4" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="137" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">ACID transactions</text>

  <rect x="40" y="154" width="220" height="28" rx="4" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="173" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">complex joins and queries</text>

  <rect x="40" y="190" width="220" height="28" rx="4" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="209" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">vertical scaling</text>

  <rect x="40" y="226" width="220" height="28" rx="4" fill="#1a3a1a" stroke="#2d7a2d" stroke-width="0.5"/>
  <text x="150" y="245" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcb6f">use for: banking, orders, users</text>

  <!-- NoSQL side -->
  <rect x="320" y="20" width="260" height="260" rx="12" fill="#1a1a1a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="500" fill="#6fcba0">NoSQL</text>
  <text x="450" y="68" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">MongoDB, DynamoDB, Redis</text>

  <rect x="340" y="82" width="220" height="28" rx="4" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="101" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">flexible, dynamic schema</text>

  <rect x="340" y="118" width="220" height="28" rx="4" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="137" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">eventual consistency</text>

  <rect x="340" y="154" width="220" height="28" rx="4" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="173" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">simple lookups by key</text>

  <rect x="340" y="190" width="220" height="28" rx="4" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="209" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">horizontal scaling</text>

  <rect x="340" y="226" width="220" height="28" rx="4" fill="#3a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="450" y="245" text-anchor="middle" font-family="system-ui" font-size="11" fill="#f09595">use for: feeds, logs, catalog</text>
</svg>`,
    keyPoints: [
      'SQL — structured data with relationships between tables',
      'ACID — Atomicity, Consistency, Isolation, Durability',
      'NoSQL document stores (MongoDB) — flexible JSON-like documents',
      'NoSQL key-value stores (Redis) — ultra-fast simple lookups',
      'NoSQL wide-column (Cassandra) — massive scale, time-series data',
      'Horizontal scaling is easier with NoSQL — just add more nodes',
      'Default to SQL unless you have a specific reason for NoSQL',
    ],
    whenAsked: [
      '"what database would you use and why?"',
      '"how would you store user profiles / posts / messages?"',
      '"design Twitter / Instagram / Uber"',
      '"how do you handle a schema change at scale?"',
      'any question where data modeling comes up',
    ]
  },
  {
    id: 'message-queues',
    number: 4,
    title: 'Message Queues',
    subtitle: 'Async communication between services',
    coreIdea: "Instead of Service A calling Service B directly and waiting for a response, A drops a message in a queue and moves on. B picks it up when it's ready. This decouples services, smooths out traffic spikes, and makes systems more resilient — if B goes down, messages just pile up in the queue until it recovers.",
    svg: `<svg width="100%" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Producer -->
  <rect x="20" y="100" width="120" height="60" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="80" y="126" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#ffffff">Producer</text>
  <text x="80" y="144" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">Order Service</text>

  <!-- Arrow to queue -->
  <line x1="140" y1="130" x2="185" y2="130" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="162" y="122" text-anchor="middle" font-family="system-ui" font-size="10" fill="#666">publish</text>

  <!-- Queue -->
  <rect x="185" y="80" width="200" height="100" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="285" y="106" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#e8e7e2">Message Queue</text>
  <text x="285" y="122" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">Kafka / RabbitMQ / SQS</text>

  <!-- Messages in queue -->
  <rect x="200" y="132" width="32" height="20" rx="3" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="216" y="146" text-anchor="middle" font-family="system-ui" font-size="9" fill="#fff">msg</text>
  <rect x="238" y="132" width="32" height="20" rx="3" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="254" y="146" text-anchor="middle" font-family="system-ui" font-size="9" fill="#fff">msg</text>
  <rect x="276" y="132" width="32" height="20" rx="3" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="292" y="146" text-anchor="middle" font-family="system-ui" font-size="9" fill="#fff">msg</text>

  <!-- Arrow to consumers -->
  <line x1="385" y1="110" x2="430" y2="90" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="385" y1="130" x2="430" y2="130" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="385" y1="150" x2="430" y2="170" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="407" y="122" text-anchor="middle" font-family="system-ui" font-size="10" fill="#666">consume</text>

  <!-- Consumers -->
  <rect x="430" y="60" width="140" height="50" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="500" y="82" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#85B7EB">Consumer 1</text>
  <text x="500" y="98" text-anchor="middle" font-family="system-ui" font-size="11" fill="#5a8aaa">Email Service</text>

  <rect x="430" y="105" width="140" height="50" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="500" y="127" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#85B7EB">Consumer 2</text>
  <text x="500" y="143" text-anchor="middle" font-family="system-ui" font-size="11" fill="#5a8aaa">Analytics</text>

  <rect x="430" y="150" width="140" height="50" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="500" y="172" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#85B7EB">Consumer 3</text>
  <text x="500" y="188" text-anchor="middle" font-family="system-ui" font-size="11" fill="#5a8aaa">Inventory</text>

  <text x="300" y="230" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">decoupled · async · resilient · fan-out</text>
</svg>`,
    keyPoints: [
      'Decoupling — producer and consumer don\'t need to know about each other',
      'Async processing — producer moves on immediately after publishing',
      'Fan-out — one message can be consumed by multiple services',
      'Buffer traffic spikes — queue absorbs bursts, consumers process at their own pace',
      'At-least-once delivery — messages are retried if consumer crashes',
      'Dead letter queue — failed messages go here for inspection',
      'Kafka for high throughput streams, SQS/RabbitMQ for task queues',
    ],
    whenAsked: [
      '"how do you handle a spike in orders?"',
      '"design a notification system"',
      '"how do you process payments reliably?"',
      '"design an event-driven system"',
      '"how do you decouple microservices?"',
    ]
  },
  {
    id: 'rate-limiting',
    number: 5,
    title: 'Rate Limiting',
    subtitle: 'Control how many requests a client can make',
    coreIdea: "Rate limiting prevents any single client from overwhelming your system. You track how many requests a client makes in a time window and reject excess requests with a 429 status. The tricky part is doing this at scale — you need a fast shared store (Redis) so limits work across multiple servers.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Client -->
  <rect x="20" y="110" width="100" height="50" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="70" y="131" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#e8e7e2">Client</text>
  <text x="70" y="149" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">many requests</text>

  <!-- Arrows -->
  <line x1="120" y1="135" x2="175" y2="135" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>

  <!-- Rate limiter -->
  <rect x="175" y="90" width="160" height="90" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="255" y="118" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#ffffff">Rate Limiter</text>
  <text x="255" y="136" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">100 req / minute</text>
  <text x="255" y="154" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">checked via Redis</text>
  <text x="255" y="170" text-anchor="middle" font-family="system-ui" font-size="10" fill="#8888cc">token bucket / sliding window</text>

  <!-- allowed arrow -->
  <line x1="335" y1="118" x2="400" y2="90" stroke="#2d7a5a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="368" y="96" text-anchor="middle" font-family="system-ui" font-size="10" fill="#6fcba0">allowed</text>

  <!-- rejected arrow -->
  <line x1="335" y1="152" x2="400" y2="175" stroke="#8b3a3a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="368" y="172" text-anchor="middle" font-family="system-ui" font-size="10" fill="#f09595">rejected</text>

  <!-- Server -->
  <rect x="400" y="60" width="140" height="50" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="470" y="82" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#85B7EB">API Server</text>
  <text x="470" y="98" text-anchor="middle" font-family="system-ui" font-size="11" fill="#5a8aaa">200 OK</text>

  <!-- 429 box -->
  <rect x="400" y="155" width="140" height="50" rx="8" fill="#4a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="470" y="177" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#f09595">429 Too Many</text>
  <text x="470" y="193" text-anchor="middle" font-family="system-ui" font-size="11" fill="#c06060">Requests</text>

  <!-- Algorithms -->
  <text x="300" y="240" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">algorithms: token bucket · leaky bucket · fixed window · sliding window</text>
</svg>`,
    keyPoints: [
      'Token bucket — refill tokens at a fixed rate, each request costs one token',
      'Sliding window — track request count over a rolling time window',
      'Fixed window — simpler but can allow 2x traffic at window boundaries',
      'Store counters in Redis — fast and shared across all servers',
      'Key by IP, user ID, or API key depending on use case',
      '429 Too Many Requests — standard HTTP response for rate limited clients',
      'Include Retry-After header so clients know when to try again',
    ],
    whenAsked: [
      '"design a rate limiter"',
      '"how do you prevent API abuse?"',
      '"how do you protect your system from DDoS?"',
      '"design an API gateway"',
      '"how do you enforce fair usage across customers?"',
    ]
  },
  {
    id: 'url-request-flow',
    number: 6,
    title: 'URL Request Flow',
    subtitle: 'What happens when you type a URL and hit enter',
    coreIdea: "Understanding the full lifecycle of a web request is foundational to system design. From DNS resolution to TCP handshake to HTTP response — every step is a potential optimization or failure point. Interviewers love this question because it touches every layer of the stack.",
    svg: `<svg width="100%" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <rect x="20" y="20" width="100" height="44" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="70" y="47" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e8e7e2">Browser</text>
  <line x1="120" y1="42" x2="160" y2="42" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="160" y="20" width="100" height="44" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="210" y="40" text-anchor="middle" font-family="system-ui" font-size="12" fill="#fff">DNS</text>
  <text x="210" y="56" text-anchor="middle" font-family="system-ui" font-size="10" fill="#b0afff">resolve IP</text>
  <line x1="260" y1="42" x2="300" y2="42" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="300" y="20" width="100" height="44" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="350" y="40" text-anchor="middle" font-family="system-ui" font-size="12" fill="#85B7EB">TCP</text>
  <text x="350" y="56" text-anchor="middle" font-family="system-ui" font-size="10" fill="#5a8aaa">handshake</text>
  <line x1="400" y1="42" x2="440" y2="42" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="440" y="20" width="120" height="44" rx="8" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="500" y="40" text-anchor="middle" font-family="system-ui" font-size="12" fill="#85B7EB">TLS/HTTPS</text>
  <text x="500" y="56" text-anchor="middle" font-family="system-ui" font-size="10" fill="#5a8aaa">encrypt</text>
  <line x1="300" y1="64" x2="300" y2="94" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="160" y="94" width="140" height="44" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="230" y="114" text-anchor="middle" font-family="system-ui" font-size="12" fill="#fff">Load Balancer</text>
  <text x="230" y="130" text-anchor="middle" font-family="system-ui" font-size="10" fill="#b0afff">route request</text>
  <line x1="300" y1="138" x2="300" y2="168" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="160" y="168" width="140" height="44" rx="8" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="230" y="188" text-anchor="middle" font-family="system-ui" font-size="12" fill="#6fcba0">Web Server</text>
  <text x="230" y="204" text-anchor="middle" font-family="system-ui" font-size="10" fill="#4a9a75">process request</text>
  <line x1="300" y1="212" x2="300" y2="242" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="100" y="242" width="120" height="44" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="160" y="262" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e8e7e2">Cache</text>
  <text x="160" y="278" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">Redis hit?</text>
  <rect x="340" y="242" width="120" height="44" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="400" y="262" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e8e7e2">Database</text>
  <text x="400" y="278" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">if cache miss</text>
  <line x1="240" y1="264" x2="300" y2="264" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="340" y1="264" x2="300" y2="264" stroke="#555" stroke-width="1"/>
</svg>`,
    keyPoints: [
      'DNS resolution — domain name converted to IP address',
      'TCP handshake — 3-way SYN/SYN-ACK/ACK to establish connection',
      'TLS handshake — negotiate encryption for HTTPS',
      'Load balancer routes to available server',
      'Web server processes request, checks cache first',
      'Cache miss — query database, store result in cache',
      'Response travels back through the same layers',
    ],
    whenAsked: [
      '"walk me through what happens when you type google.com"',
      '"explain the full request lifecycle"',
      '"where would you add a cache in this flow?"',
      '"how does HTTPS work?"',
      'any system design warm-up question',
    ]
  },
  {
    id: 'scaling',
    number: 7,
    title: 'Horizontal vs Vertical Scaling',
    subtitle: 'Two ways to handle more traffic',
    coreIdea: "Vertical scaling means making your existing server bigger — more CPU, more RAM. Horizontal scaling means adding more servers. Vertical has a hard limit (biggest machine available) and a single point of failure. Horizontal scales infinitely in theory but requires your app to be stateless.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="260" height="240" rx="12" fill="#1a1a2e" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="500" fill="#b0afff">Vertical Scaling</text>
  <text x="150" y="68" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">scale up</text>
  <rect x="80" y="90" width="140" height="60" rx="8" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="116" text-anchor="middle" font-family="system-ui" font-size="12" fill="#b0afff">Small Server</text>
  <text x="150" y="132" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">4 CPU / 16GB</text>
  <text x="150" y="172" text-anchor="middle" font-family="system-ui" font-size="20" fill="#3b3aab">↓</text>
  <rect x="60" y="188" width="180" height="50" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="150" y="210" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#fff">Bigger Server</text>
  <text x="150" y="226" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">32 CPU / 256GB</text>
  <rect x="320" y="20" width="260" height="240" rx="12" fill="#1a1a1a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="500" fill="#6fcba0">Horizontal Scaling</text>
  <text x="450" y="68" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">scale out</text>
  <rect x="340" y="86" width="100" height="44" rx="8" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="390" y="113" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Server 1</text>
  <rect x="460" y="86" width="100" height="44" rx="8" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="510" y="113" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Server 2</text>
  <rect x="340" y="148" width="100" height="44" rx="8" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="390" y="175" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Server 3</text>
  <rect x="460" y="148" width="100" height="44" rx="8" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="510" y="175" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Server 4</text>
  <text x="450" y="222" text-anchor="middle" font-family="system-ui" font-size="11" fill="#4a9a75">add more servers as needed</text>
</svg>`,
    keyPoints: [
      'Vertical — bigger machine, simpler but has a ceiling and single point of failure',
      'Horizontal — more machines, requires stateless app and a load balancer',
      'Stateless apps store session in DB/Redis, not in server memory',
      'Auto-scaling — cloud providers spin up/down servers based on traffic',
      'Database scaling is harder — read replicas for reads, sharding for writes',
      'Horizontal is almost always the right answer in interviews',
    ],
    whenAsked: [
      '"how would you handle 10x traffic growth?"',
      '"your server is running out of memory, what do you do?"',
      '"design a system that needs to scale to millions of users"',
      '"what does it mean for a service to be stateless?"',
    ]
  },
  {
    id: 'sync-async',
    number: 8,
    title: 'Sync vs Async',
    subtitle: 'When to wait, when to fire and forget',
    coreIdea: "Synchronous — the caller waits for a response before continuing. Asynchronous — the caller fires a request and moves on, the result comes back later via callback, queue, or webhook. Sync is simpler but ties up resources while waiting. Async is more complex but lets you handle more load with fewer resources.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <text x="150" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#b0afff">Synchronous</text>
  <rect x="20" y="50" width="80" height="36" rx="6" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="60" y="73" text-anchor="middle" font-family="system-ui" font-size="11" fill="#fff">Client</text>
  <line x1="100" y1="68" x2="180" y2="68" stroke="#5958cc" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="140" y="60" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">request</text>
  <rect x="180" y="50" width="80" height="36" rx="6" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="220" y="73" text-anchor="middle" font-family="system-ui" font-size="11" fill="#85B7EB">Server</text>
  <line x1="180" y1="88" x2="100" y2="88" stroke="#2a6a8a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="140" y="102" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">response (wait...)</text>
  <rect x="20" y="110" width="240" height="28" rx="4" fill="#2a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="140" y="129" text-anchor="middle" font-family="system-ui" font-size="11" fill="#f09595">client blocked while waiting</text>
  <text x="450" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#6fcba0">Asynchronous</text>
  <rect x="320" y="50" width="80" height="36" rx="6" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="360" y="73" text-anchor="middle" font-family="system-ui" font-size="11" fill="#fff">Client</text>
  <line x1="400" y1="68" x2="480" y2="68" stroke="#5958cc" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="440" y="60" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">publish</text>
  <rect x="480" y="50" width="80" height="36" rx="6" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="520" y="73" text-anchor="middle" font-family="system-ui" font-size="11" fill="#e8e7e2">Queue</text>
  <rect x="320" y="110" width="240" height="28" rx="4" fill="#1a2a1a" stroke="#2d7a2d" stroke-width="0.5"/>
  <text x="440" y="129" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcb6f">client continues immediately</text>
  <line x1="520" y1="86" x2="520" y2="160" stroke="#444" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="460" y="160" width="120" height="36" rx="6" fill="#1a3a4a" stroke="#2a6a8a" stroke-width="0.5"/>
  <text x="520" y="183" text-anchor="middle" font-family="system-ui" font-size="11" fill="#85B7EB">Worker picks up</text>
  <text x="440" y="230" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">webhook / polling / SSE to notify client when done</text>
</svg>`,
    keyPoints: [
      'Sync — simple, immediate response, but ties up a thread while waiting',
      'Async — complex, eventual response, but frees up resources immediately',
      'Use sync for: user-facing reads, simple CRUD, low latency requirements',
      'Use async for: emails, notifications, image processing, payments',
      'Callbacks, promises, async/await are language-level async patterns',
      'Message queues are infrastructure-level async patterns',
      'Webhook — server calls you back when async work is done',
    ],
    whenAsked: [
      '"should this operation be sync or async?"',
      '"how do you send 1 million emails without blocking?"',
      '"design a video processing pipeline"',
      '"how do you handle long-running tasks?"',
    ]
  },
  {
    id: 'auth',
    number: 9,
    title: 'Authentication vs Authorization',
    subtitle: 'Who are you vs what can you do',
    coreIdea: "Authentication (AuthN) — proving who you are. Authorization (AuthZ) — proving what you're allowed to do. These are always separate concerns. You authenticate once at login, then carry a token that proves your identity. Every subsequent request checks that token and then checks what that identity is allowed to do.",
    svg: `<svg width="100%" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <rect x="20" y="110" width="100" height="60" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="70" y="136" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#e8e7e2">User</text>
  <text x="70" y="152" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">credentials</text>
  <line x1="120" y1="140" x2="160" y2="140" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="160" y="100" width="140" height="80" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="230" y="128" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#fff">Authentication</text>
  <text x="230" y="146" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">verify identity</text>
  <text x="230" y="162" text-anchor="middle" font-family="system-ui" font-size="10" fill="#8888cc">JWT / session / OAuth</text>
  <line x1="300" y1="140" x2="340" y2="140" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="320" y="132" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">token</text>
  <rect x="340" y="100" width="140" height="80" rx="8" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="410" y="128" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#6fcba0">Authorization</text>
  <text x="410" y="146" text-anchor="middle" font-family="system-ui" font-size="11" fill="#4a9a75">check permissions</text>
  <text x="410" y="162" text-anchor="middle" font-family="system-ui" font-size="10" fill="#2d7a5a">RBAC / ABAC / ACL</text>
  <line x1="480" y1="120" x2="540" y2="100" stroke="#2d7a5a" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="480" y1="160" x2="540" y2="180" stroke="#8b3a3a" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="540" y="80" width="50" height="36" rx="6" fill="#1a2a1a" stroke="#2d7a2d" stroke-width="0.5"/>
  <text x="565" y="103" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcb6f">allow</text>
  <rect x="540" y="162" width="50" height="36" rx="6" fill="#2a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="565" y="185" text-anchor="middle" font-family="system-ui" font-size="11" fill="#f09595">deny</text>
  <text x="300" y="240" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#888">AuthN: are you who you say you are?</text>
  <text x="300" y="260" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#888">AuthZ: are you allowed to do this?</text>
</svg>`,
    keyPoints: [
      'Authentication — login with password, OAuth, biometrics',
      'JWT — self-contained token with user info, signed but not encrypted',
      'Session — server stores state, client holds a session ID cookie',
      'OAuth — delegate authentication to a third party (Google, GitHub)',
      'Authorization — RBAC (roles), ABAC (attributes), ACL (explicit permissions)',
      'Always check authorization server-side — never trust the client',
      'Principle of least privilege — give users only what they need',
    ],
    whenAsked: [
      '"how do you implement login?"',
      '"how do you handle user permissions?"',
      '"design an API that supports multiple user roles"',
      '"how do you secure your API endpoints?"',
      '"what is the difference between auth and authz?"',
    ]
  },
  {
    id: 'monolith-microservices',
    number: 10,
    title: 'Monolith vs Microservices',
    subtitle: 'One big app vs many small services',
    coreIdea: "A monolith is one deployable unit — all features in one codebase. Simple to develop and deploy early on. Microservices split each feature into its own independently deployable service. More operational complexity but lets teams work independently and scale individual services. Start with a monolith, break it up when you have a real reason.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="240" height="240" rx="12" fill="#1a1a2e" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="140" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="500" fill="#b0afff">Monolith</text>
  <rect x="40" y="66" width="200" height="36" rx="6" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="140" y="89" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">User Service</text>
  <rect x="40" y="110" width="200" height="36" rx="6" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="140" y="133" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">Order Service</text>
  <rect x="40" y="154" width="200" height="36" rx="6" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="140" y="177" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">Payment Service</text>
  <rect x="40" y="198" width="200" height="36" rx="6" fill="#2a2a4a" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="140" y="221" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">Notification Service</text>
  <rect x="340" y="20" width="240" height="240" rx="12" fill="#1a1a1a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="460" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="500" fill="#6fcba0">Microservices</text>
  <rect x="356" y="66" width="96" height="36" rx="6" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="404" y="89" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Users</text>
  <rect x="464" y="66" width="96" height="36" rx="6" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="512" y="89" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Orders</text>
  <rect x="356" y="118" width="96" height="36" rx="6" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="404" y="141" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Payments</text>
  <rect x="464" y="118" width="96" height="36" rx="6" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="512" y="141" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Notifs</text>
  <rect x="356" y="170" width="204" height="36" rx="6" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="458" y="193" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">API Gateway</text>
  <text x="460" y="230" text-anchor="middle" font-family="system-ui" font-size="10" fill="#4a9a75">each deploys independently</text>
</svg>`,
    keyPoints: [
      'Monolith — simple to start, one deployment, harder to scale individual parts',
      'Microservices — independent deployments, team autonomy, operational complexity',
      'API gateway — single entry point that routes to appropriate microservice',
      'Service mesh — handles service-to-service communication, auth, retries',
      'Start monolith, extract services when you have scale or team reasons',
      'Microservices are not always better — they add distributed systems complexity',
      'Each service should own its own database — no shared DB between services',
    ],
    whenAsked: [
      '"how would you architect this system?"',
      '"how do you scale a specific feature independently?"',
      '"what are the tradeoffs between monolith and microservices?"',
      '"how do you handle a team of 50 engineers on one codebase?"',
    ]
  },
  {
    id: 'cap-theorem',
    number: 11,
    title: 'CAP Theorem',
    subtitle: 'Consistency, availability, partition tolerance — pick two',
    coreIdea: "In a distributed system, when a network partition occurs (servers can't talk to each other), you must choose between consistency (all nodes return the same data) and availability (every request gets a response). Partition tolerance is not optional in real networks — so you're really choosing between CP and AP.",
    svg: `<svg width="100%" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <polygon points="300,30 100,240 500,240" fill="none" stroke="#444" stroke-width="0.5"/>
  <circle cx="300" cy="30" r="50" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="300" y="24" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#fff">Consistency</text>
  <text x="300" y="42" text-anchor="middle" font-family="system-ui" font-size="10" fill="#b0afff">all nodes same data</text>
  <circle cx="120" cy="240" r="50" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="120" y="234" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#6fcba0">Availability</text>
  <text x="120" y="252" text-anchor="middle" font-family="system-ui" font-size="10" fill="#4a9a75">always responds</text>
  <circle cx="480" cy="240" r="50" fill="#4a3a1a" stroke="#8b6a2a" stroke-width="0.5"/>
  <text x="480" y="234" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#f0c070">Partition</text>
  <text x="480" y="252" text-anchor="middle" font-family="system-ui" font-size="10" fill="#c09040">Tolerance</text>
  <text x="200" y="148" text-anchor="middle" font-family="system-ui" font-size="11" fill="#b0afff">CP</text>
  <text x="196" y="164" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">MongoDB</text>
  <text x="196" y="178" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">HBase</text>
  <text x="400" y="148" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">AP</text>
  <text x="400" y="164" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">Cassandra</text>
  <text x="400" y="178" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">DynamoDB</text>
  <text x="300" y="260" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">CA — only possible without partitions (single node)</text>
</svg>`,
    keyPoints: [
      'Consistency — every read gets the most recent write or an error',
      'Availability — every request gets a response (may not be latest data)',
      'Partition tolerance — system works even if nodes can\'t communicate',
      'Network partitions always happen in real systems — P is mandatory',
      'CP systems — return error rather than stale data (banks, inventory)',
      'AP systems — return stale data rather than error (social feeds, DNS)',
      'PACELC extends CAP: even without partitions, tradeoff between latency and consistency',
    ],
    whenAsked: [
      '"what is CAP theorem?"',
      '"how do you choose between consistency and availability?"',
      '"design a distributed database"',
      '"what happens if two nodes in your system disagree on data?"',
    ]
  },
  {
    id: 'db-indexes',
    number: 12,
    title: 'Database Indexes',
    subtitle: 'Speed up reads at the cost of write performance',
    coreIdea: "Without an index, a query scans every row (full table scan) — O(n). An index is a separate data structure (usually a B-tree) that lets the database find rows in O(log n). The tradeoff: indexes speed up reads but slow down writes (the index must be updated too) and use extra storage.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <text x="150" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#f09595">No Index — full scan O(n)</text>
  <rect x="20" y="46" width="260" height="24" rx="4" fill="#2a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="150" y="63" text-anchor="middle" font-family="system-ui" font-size="11" fill="#f09595">row 1 — scan...</text>
  <rect x="20" y="76" width="260" height="24" rx="4" fill="#2a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="150" y="93" text-anchor="middle" font-family="system-ui" font-size="11" fill="#f09595">row 2 — scan...</text>
  <rect x="20" y="106" width="260" height="24" rx="4" fill="#2a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="150" y="123" text-anchor="middle" font-family="system-ui" font-size="11" fill="#f09595">row 3 — scan...</text>
  <rect x="20" y="136" width="260" height="24" rx="4" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="150" y="153" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">row 4 — FOUND (after scanning all)</text>
  <text x="450" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#6fcba0">With Index — B-tree O(log n)</text>
  <rect x="360" y="46" width="180" height="60" rx="8" fill="#1a2a2a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="68" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">Index (B-tree)</text>
  <text x="450" y="86" text-anchor="middle" font-family="system-ui" font-size="10" fill="#4a9a75">sorted key -> row pointer</text>
  <line x1="450" y1="106" x2="450" y2="136" stroke="#2d7a5a" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="360" y="136" width="180" height="36" rx="8" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="159" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6fcba0">jump directly to row 4</text>
  <text x="300" y="220" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">types: B-tree (default) · hash · composite · partial · full-text</text>
  <text x="300" y="242" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">tradeoff: faster reads, slower writes, more storage</text>
</svg>`,
    keyPoints: [
      'B-tree index — default, good for range queries and equality checks',
      'Hash index — O(1) exact match, useless for ranges',
      'Composite index — index on multiple columns, order matters',
      'Covering index — index contains all columns needed by the query',
      'Partial index — index only rows matching a condition',
      'Full-text index — for searching text content',
      'Too many indexes slow down writes — only index what you query',
    ],
    whenAsked: [
      '"your database query is slow, how do you fix it?"',
      '"how do you optimize database performance?"',
      '"what is an index and when would you use one?"',
      '"design a system with complex search requirements"',
    ]
  },
  {
    id: 'websockets',
    number: 13,
    title: 'WebSockets vs Polling',
    subtitle: 'Real-time communication strategies',
    coreIdea: "Polling — client repeatedly asks the server 'any updates?' on a timer. Simple but wasteful. Long polling — client asks, server holds the connection open until it has something to say. WebSockets — persistent bidirectional connection, server can push data anytime without the client asking. Best for real-time features.",
    svg: `<svg width="100%" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <text x="150" y="24" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#f09595">Polling</text>
  <text x="60" y="50" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">Client</text>
  <text x="240" y="50" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">Server</text>
  <line x1="60" y1="55" x2="60" y2="220" stroke="#333" stroke-width="0.5"/>
  <line x1="240" y1="55" x2="240" y2="220" stroke="#333" stroke-width="0.5"/>
  <line x1="60" y1="70" x2="230" y2="70" stroke="#8b3a3a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="145" y="65" text-anchor="middle" font-family="system-ui" font-size="9" fill="#f09595">any updates?</text>
  <line x1="230" y1="85" x2="60" y2="85" stroke="#444" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="145" y="98" text-anchor="middle" font-family="system-ui" font-size="9" fill="#888">no</text>
  <line x1="60" y1="110" x2="230" y2="110" stroke="#8b3a3a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="145" y="105" text-anchor="middle" font-family="system-ui" font-size="9" fill="#f09595">any updates?</text>
  <line x1="230" y1="125" x2="60" y2="125" stroke="#444" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="145" y="138" text-anchor="middle" font-family="system-ui" font-size="9" fill="#888">no</text>
  <line x1="60" y1="150" x2="230" y2="150" stroke="#8b3a3a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="145" y="145" text-anchor="middle" font-family="system-ui" font-size="9" fill="#f09595">any updates?</text>
  <line x1="230" y1="165" x2="60" y2="165" stroke="#2d7a5a" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="145" y="178" text-anchor="middle" font-family="system-ui" font-size="9" fill="#6fcba0">yes! here it is</text>
  <text x="450" y="24" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#6fcba0">WebSockets</text>
  <text x="360" y="50" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">Client</text>
  <text x="540" y="50" text-anchor="middle" font-family="system-ui" font-size="10" fill="#888">Server</text>
  <line x1="360" y1="55" x2="360" y2="220" stroke="#333" stroke-width="0.5"/>
  <line x1="540" y1="55" x2="540" y2="220" stroke="#333" stroke-width="0.5"/>
  <line x1="360" y1="70" x2="530" y2="70" stroke="#2d7a5a" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="445" y="65" text-anchor="middle" font-family="system-ui" font-size="9" fill="#6fcba0">open connection</text>
  <rect x="350" y="80" width="200" height="120" rx="4" fill="#1a2a1a" stroke="#2d7a5a" stroke-width="0.5" fill-opacity="0.3"/>
  <line x1="530" y1="100" x2="360" y2="100" stroke="#6fcba0" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="445" y="95" text-anchor="middle" font-family="system-ui" font-size="9" fill="#6fcba0">push update</text>
  <line x1="360" y1="130" x2="530" y2="130" stroke="#6fcba0" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="445" y="125" text-anchor="middle" font-family="system-ui" font-size="9" fill="#6fcba0">send message</text>
  <line x1="530" y1="160" x2="360" y2="160" stroke="#6fcba0" stroke-width="1" marker-end="url(#arrow)"/>
  <text x="445" y="155" text-anchor="middle" font-family="system-ui" font-size="9" fill="#6fcba0">push update</text>
  <text x="445" y="195" text-anchor="middle" font-family="system-ui" font-size="9" fill="#4a9a75">persistent bidirectional</text>
  <text x="300" y="250" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">SSE — server-sent events, one direction only, simpler than WebSockets</text>
</svg>`,
    keyPoints: [
      'Polling — simple, works everywhere, wasteful for low-update scenarios',
      'Long polling — holds connection open, less wasteful, more complex',
      'WebSockets — persistent connection, bidirectional, best for real-time',
      'SSE (Server-Sent Events) — server push only, simpler than WebSockets',
      'Use WebSockets for: chat, live collaboration, gaming, live dashboards',
      'Use polling for: status checks, infrequent updates where simplicity matters',
      'WebSocket connections are stateful — harder to scale than HTTP',
    ],
    whenAsked: [
      '"design a chat application"',
      '"design a live sports score feed"',
      '"how do you implement real-time notifications?"',
      '"design a collaborative document editor"',
      '"how do you push updates to the client?"',
    ]
  },
  {
    id: 'sharding',
    number: 14,
    title: 'Database Sharding',
    subtitle: 'Split your database across multiple machines',
    coreIdea: "When one database can't handle your data volume or write load, you split it into shards — each shard holds a subset of the data. A shard key determines which shard a record lives on. Done right, each query hits only one shard. Done wrong, you get hotspots (one shard gets all the traffic) or cross-shard queries that are expensive.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <rect x="20" y="110" width="120" height="60" rx="8" fill="#3b3aab" stroke="#5958cc" stroke-width="0.5"/>
  <text x="80" y="136" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#fff">App Server</text>
  <text x="80" y="154" text-anchor="middle" font-family="system-ui" font-size="10" fill="#b0afff">user_id = 12345</text>
  <line x1="140" y1="140" x2="180" y2="140" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="180" y="100" width="140" height="80" rx="8" fill="#2a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="250" y="128" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="#e8e7e2">Shard Router</text>
  <text x="250" y="146" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">hash(user_id) % 3</text>
  <text x="250" y="164" text-anchor="middle" font-family="system-ui" font-size="10" fill="#666">= shard 1</text>
  <line x1="320" y1="118" x2="380" y2="80" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <line x1="320" y1="140" x2="380" y2="140" stroke="#2d7a5a" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="320" y1="162" x2="380" y2="200" stroke="#555" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="380" y="50" width="160" height="50" rx="8" fill="#1a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="460" y="72" text-anchor="middle" font-family="system-ui" font-size="12" fill="#888">Shard 0</text>
  <text x="460" y="88" text-anchor="middle" font-family="system-ui" font-size="10" fill="#555">user_ids 0-33k</text>
  <rect x="380" y="115" width="160" height="50" rx="8" fill="#1a4a3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="460" y="137" text-anchor="middle" font-family="system-ui" font-size="12" fill="#6fcba0">Shard 1</text>
  <text x="460" y="153" text-anchor="middle" font-family="system-ui" font-size="10" fill="#4a9a75">user_ids 33k-66k</text>
  <rect x="380" y="180" width="160" height="50" rx="8" fill="#1a2a2a" stroke="#444" stroke-width="0.5"/>
  <text x="460" y="202" text-anchor="middle" font-family="system-ui" font-size="12" fill="#888">Shard 2</text>
  <text x="460" y="218" text-anchor="middle" font-family="system-ui" font-size="10" fill="#555">user_ids 66k+</text>
  <text x="300" y="258" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">shard keys: user_id · geo · range · hash</text>
</svg>`,
    keyPoints: [
      'Shard key — determines which shard a record lives on, choose carefully',
      'Hash sharding — even distribution but no range queries across shards',
      'Range sharding — supports range queries but can create hotspots',
      'Hotspot — one shard gets disproportionate traffic (e.g. celebrity user)',
      'Cross-shard queries — expensive, require scatter-gather across all shards',
      'Resharding — adding shards later is painful, plan ahead',
      'Consistent hashing — minimizes data movement when adding/removing shards',
    ],
    whenAsked: [
      '"your database is too big for one machine, what do you do?"',
      '"design a system for 1 billion users"',
      '"how do you scale writes?"',
      '"what is a shard key and how do you choose one?"',
    ]
  },
  {
    id: 'acid',
    number: 15,
    title: 'ACID Transactions',
    subtitle: 'Guarantees that keep your data consistent',
    coreIdea: "ACID is a set of properties that guarantee database transactions are processed reliably. When you transfer money from one account to another, you need all four: the operation either fully happens or doesn't, the database stays valid, concurrent transactions don't interfere, and committed data survives crashes.",
    svg: `<svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="260" height="110" rx="8" fill="#1a1a2e" stroke="#3b3aab" stroke-width="0.5"/>
  <text x="150" y="46" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#b0afff">A — Atomicity</text>
  <text x="150" y="66" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">all or nothing</text>
  <text x="150" y="86" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">transfer $100: debit AND credit</text>
  <text x="150" y="104" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">both succeed or both rollback</text>
  <rect x="320" y="20" width="260" height="110" rx="8" fill="#1a2a1a" stroke="#2d7a5a" stroke-width="0.5"/>
  <text x="450" y="46" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#6fcba0">C — Consistency</text>
  <text x="450" y="66" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">valid state before and after</text>
  <text x="450" y="86" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">constraints, rules, cascades</text>
  <text x="450" y="104" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">always enforced</text>
  <rect x="20" y="150" width="260" height="110" rx="8" fill="#2a1a1a" stroke="#8b3a3a" stroke-width="0.5"/>
  <text x="150" y="176" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#f09595">I — Isolation</text>
  <text x="150" y="196" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">concurrent transactions</text>
  <text x="150" y="214" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">don't interfere with each other</text>
  <text x="150" y="232" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">as if they ran sequentially</text>
  <rect x="320" y="150" width="260" height="110" rx="8" fill="#2a1a2a" stroke="#8b3a8b" stroke-width="0.5"/>
  <text x="450" y="176" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="500" fill="#d09ad0">D — Durability</text>
  <text x="450" y="196" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888">committed = permanent</text>
  <text x="450" y="214" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">survives crashes, power loss</text>
  <text x="450" y="232" text-anchor="middle" font-family="system-ui" font-size="11" fill="#666">written to disk (WAL)</text>
</svg>`,
    keyPoints: [
      'Atomicity — transaction fully completes or fully rolls back, no partial state',
      'Consistency — database moves from one valid state to another valid state',
      'Isolation — concurrent transactions produce the same result as sequential',
      'Durability — committed transactions survive crashes (write-ahead log)',
      'SQL databases provide ACID by default',
      'NoSQL often trades ACID for performance/scale (eventual consistency)',
      'Distributed transactions across services are very hard — avoid if possible',
    ],
    whenAsked: [
      '"how do you handle a payment that partially fails?"',
      '"what is ACID and why does it matter?"',
      '"how do you prevent double-charging a customer?"',
      '"design a banking system"',
      '"how do you handle concurrent updates to the same record?"',
    ]
  }
]