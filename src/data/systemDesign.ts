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
  }
]