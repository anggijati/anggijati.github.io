/**
 * PORTFOLIO DATA CONFIGURATION
 * Centralized data store for projects, skills, timeline, and profile.
 * Easily modify this file to customize your portfolio content.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Anggi Jati N",
    callsign: "Anggi.s",
    title: "Multi-Disciplinary Systems & Full-Stack Engineer",
    tagline:
      "Bridging the gap between embedded silicon, distributed cloud backends, and sleek web interfaces.",
    status: "SYSTEMS_OPERATIONAL",
    location: "Global / Remote",
    email: "anggijati224@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    discord: "sysengineer#0001",
    stats: {
      uptime: "99.98%",
      experienceYears: "5+",
      projectsCompleted: "35+",
      subsystemsOrchestrated: "120+",
    },
  },

  pillars: [
    {
      id: "frontend",
      theme: "cyan",
      icon: "🌐",
      title: "Frontend & Creative Tech",
      description:
        "Crafting fluid, high-performance web experiences using WebGL, reactive state architectures, and responsive 60fps micro-interactions.",
      skills: [
        "React",
        "Vue",
        "TypeScript",
        "Canvas/WebGL",
        "Tailwind CSS",
        "Next.js",
        "Vite",
      ],
    },
    {
      id: "backend",
      theme: "green",
      icon: "⚡",
      title: "Backend & Distributed Systems",
      description:
        "Architecting resilient, low-latency microservices, gRPC & REST APIs, event-driven streaming with Kafka, and caching topologies.",
      skills: [
        "Go (Golang)",
        "Node.js",
        "Python",
        "Rust",
        "PostgreSQL",
        "Redis",
        "gRPC & Kafka",
      ],
    },
    {
      id: "iot",
      theme: "amber",
      icon: "🛰️",
      title: "IoT, Embedded & Edge Computing",
      description:
        "Developing firmware on bare-metal and RTOS, sensor telemetry pipelines over MQTT/BLE/LoRaWAN, hardware circuit prototyping, and robotics.",
      skills: [
        "C / C++",
        "ESP32 / ESP-IDF",
        "FreeRTOS",
        "MQTT",
        "STM32",
        "I2C/SPI",
        "LoRaWAN",
      ],
    },
    {
      id: "cloud",
      theme: "purple",
      icon: "☁️",
      title: "Servers, Cloud & DevOps",
      description:
        "Managing bare-metal and cloud infrastructure, container orchestration with Kubernetes, automated CI/CD pipelines, and Linux kernel tuning.",
      skills: [
        "Docker",
        "Kubernetes",
        "Linux / Bash",
        "Terraform",
        "CI/CD",
        "Nginx",
        "Cloudflare",
      ],
    },
  ],

  projects: [
    {
      id: "iot-sentinel",
      title: "Aegis Sentinel - Industrial IoT Mesh",
      category: "iot",
      categoryLabel: "IoT & Hardware",
      icon: "🛰️",
      summary:
        "Autonomous environmental & vibration telemetry grid powered by ESP32 microcontrollers with low-power LoRa mesh fallback and sub-millisecond edge alerting.",
      tags: ["ESP32", "FreeRTOS", "C++", "MQTT", "TimescaleDB", "Grafana"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      architecture: {
        diagram: `[Edge Sensors (ESP32)] --(MQTT / TLS)--> [EMQX Cluster]
        |                                        |
    (LoRa Mesh)                           (Kafka Ingestion)
        v                                        v
[Local Gateway Node]                    [Go Telemetry Worker]
                                                 |
                                         +-------+-------+
                                         |               |
                                   (TimescaleDB)    (WebSocket Hub)
                                         |               |
                                  [Data Archive]   [Real-time HUD]`,
        highlights: [
          "Ultra-low sleep cycle optimization: 18 months battery lifespan on 2400mAh LiPo.",
          "Automatic fallback to 433MHz LoRa mesh when WiFi gateway drops.",
          "End-to-end encrypted packet payload using hardware-accelerated AES-256.",
        ],
        techStack:
          "C/C++, ESP-IDF, FreeRTOS, MQTT over TLS, Go, TimescaleDB, WebSockets",
      },
    },
    {
      id: "distributed-cache",
      title: "VortexKV - In-Memory Distributed Store",
      category: "backend",
      categoryLabel: "Backend & Systems",
      icon: "⚡",
      summary:
        "Distributed, raft-consensus key-value storage engine engineered in Go with persistent write-ahead logging (WAL) and Raft leader election.",
      tags: ["Go", "Raft", "gRPC", "Distributed Systems", "RocksDB"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      architecture: {
        diagram: `[Client Request] --> [gRPC Load Balancer]
                          |
             +------------+------------+
             |            |            |
          [Node 1]     [Node 2]     [Node 3]
         (Raft Leader) (Follower)   (Follower)
             |
       [Write Ahead Log] --> [In-Memory MemTable] --> [SSTable Compaction]`,
        highlights: [
          "Linearizable reads & writes achieved through Raft consensus algorithm.",
          "Sub-millisecond P99 read latencies under 50,000 requests per second.",
          "Zero data loss recovery using snapshot compaction and WAL replay.",
        ],
        techStack:
          "Go, gRPC, Protobuf, Raft consensus algorithm, BadgerDB engine",
      },
    },
    {
      id: "quantum-hud",
      title: "CyberPulse - Realtime Telemetry Dashboard",
      category: "frontend",
      categoryLabel: "Frontend & UI",
      icon: "🌐",
      summary:
        "High-density 60 FPS observability cockpit featuring custom WebGL canvas charts, audio feedback, and WebSocket stream orchestration.",
      tags: ["TypeScript", "WebGL", "TailwindCSS", "WebSockets", "AudioAPI"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      architecture: {
        diagram: `[Server Event Stream] --> [WebSocket Demuxer]
                                   |
                  +----------------+----------------+
                  |                                 |
           [WebWorker Parser]               [Audio Synthesizer]
                  |                                 |
        [WebGL Render Pipeline]             [Frequency Blips]
                  |
         (60fps Canvas Buffers)`,
        highlights: [
          "Renders 500,000 real-time data points smoothly without dropping frames using WebGL vertex buffers.",
          "Offloaded JSON deserialization and aggregation to Web Workers to keep main thread unblocked.",
          "Responsive reactive layouts adapting seamlessly from mobile phones to 4K widescreen arrays.",
        ],
        techStack:
          "TypeScript, Three.js / WebGL, Web Audio API, Web Workers, Tailwind CSS",
      },
    },
    {
      id: "homelab-orchestration",
      title: "Titan - Self-Healing Bare Metal Cloud",
      category: "cloud",
      categoryLabel: "Cloud & Servers",
      icon: "☁️",
      summary:
        "Automated hyper-converged homelab cluster with K3s Kubernetes, Ceph distributed storage, Wireguard mesh VPN, and automated GitOps CI/CD.",
      tags: ["Kubernetes", "Linux", "Terraform", "Ansible", "Ceph", "GitOps"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      architecture: {
        diagram: `[GitHub Repo (GitOps)] --> [ArgoCD Controller]
                                    |
                    +---------------+---------------+
                    |               |               |
              [K3s Master]    [Worker Node A] [Worker Node B]
                    |
              [Ceph CSI Storage Layer (NVMe Distributed Mesh)]
                    |
              [Cloudflare Tunnel / Wireguard Zero-Trust Mesh]`,
        highlights: [
          "Declarative zero-touch provisioning via Terraform and Ansible playbooks.",
          "Automated failover and self-healing pods with 99.98% measured uptime.",
          "Hardware-isolated VLAN routing separating IoT devices from secure production servers.",
        ],
        techStack:
          "Linux Kernel, Debian, K3s, ArgoCD, Ansible, Terraform, Ceph, Wireguard",
      },
    },
    {
      id: "smart-greenhouse",
      title: "PhytoSense - Hydroponic Automation",
      category: "iot",
      categoryLabel: "IoT & Full-Stack",
      icon: "🌱",
      summary:
        "Automated closed-loop nutrient dosing, pH balancing, and climate control system with live web camera streaming and edge PID controllers.",
      tags: [
        "STM32",
        "Python",
        "FastAPI",
        "React",
        "Raspberry Pi",
        "PID Control",
      ],
      githubUrl: "https://github.com",
      liveUrl: "#",
      architecture: {
        diagram: `[Sensors: pH / EC / Temp] --> [STM32 Hardware Controller]
                                           |
                                  (PID Dosing Pumps)
                                           |
                               (UART/Serial to RPi Gateway)
                                           |
                             [FastAPI Daemon & WebRTC Cam]
                                           |
                             [React Dashboard & Alerts]`,
        highlights: [
          "Discrete PID feedback loop keeping nutrient pH strictly between 5.8 - 6.2.",
          "Automatic Telegram push notifications if reservoir levels drop below threshold.",
          "Energy-saving circadian lighting scheduler synchronized with sunrise/sunset API.",
        ],
        techStack:
          "STM32 Nucleo, C, FreeRTOS, Raspberry Pi, Python FastAPI, React, SQLite",
      },
    },
    {
      id: "api-gateway",
      title: "Aether - Low-Latency Edge API Gateway",
      category: "backend",
      categoryLabel: "Backend & Cloud",
      icon: "⚡",
      summary:
        "High-performance reverse proxy and dynamic rate-limiting gateway written in Rust with JWT verification and token bucket traffic shaping.",
      tags: ["Rust", "Tokio", "Hyper", "Redis", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      architecture: {
        diagram: `[Incoming Traffic] --> [Aether Gateway (Rust/Tokio)]
                                |
                   (Token Bucket Rate Limiter)
                                |
                +---------------+---------------+
                |               |               |
            [Auth Cache]   [Route Match]   [Metrics Exporter]
             (Redis KV)         |            (Prometheus)
                                v
                       [Upstream Services]`,
        highlights: [
          "Handles 120,000 concurrent req/sec with under 1.2ms added proxy overhead.",
          "Zero garbage collection pauses thanks to Rust's memory safety model.",
          "Hot configuration reload without dropping in-flight TCP connections.",
        ],
        techStack:
          "Rust, Tokio async runtime, Hyper HTTP, Redis, Prometheus, Docker",
      },
    },
  ],

  skillsMatrix: [
    {
      category: "Core Languages & Systems",
      icon: "💻",
      items: [
        {
          name: "C / C++",
          level: 90,
          desc: "Embedded, pointers, FreeRTOS, microcontrollers",
        },
        {
          name: "Go (Golang)",
          level: 92,
          desc: "Goroutines, channels, microservices, gRPC",
        },
        {
          name: "TypeScript / JavaScript",
          level: 95,
          desc: "Modern ESNext, React, Node, Web APIs",
        },
        {
          name: "Python",
          level: 88,
          desc: "FastAPI, automation, scripting, data pipelines",
        },
        {
          name: "Rust",
          level: 75,
          desc: "Memory safety, async concurrency, CLI tools",
        },
        {
          name: "SQL & Shell Scripting",
          level: 90,
          desc: "PostgreSQL, Bash, query tuning, indexing",
        },
      ],
    },
    {
      category: "IoT & Hardware Engineering",
      icon: "🛰️",
      items: [
        {
          name: "ESP32 / ESP8266",
          level: 95,
          desc: "ESP-IDF, FreeRTOS, WiFi/BLE coexistence",
        },
        {
          name: "STM32 & Microcontrollers",
          level: 85,
          desc: "HAL, timers, interrupts, registers",
        },
        {
          name: "Protocols: MQTT, I2C, SPI, UART",
          level: 92,
          desc: "Sensor bus communication, telemetry",
        },
        {
          name: "Circuit Design & Soldering",
          level: 80,
          desc: "Schematics, PCB layout, prototyping",
        },
        {
          name: "LoRa & Long-Range Wireless",
          level: 78,
          desc: "Mesh networks, low-power telemetry",
        },
      ],
    },
    {
      category: "Backend & Data Systems",
      icon: "⚡",
      items: [
        {
          name: "High-Throughput APIs & Microservices",
          level: 92,
          desc: "REST, gRPC, Protobuf, WebSockets",
        },
        {
          name: "Databases (PostgreSQL, TimescaleDB)",
          level: 88,
          desc: "Relational modeling, time-series data",
        },
        {
          name: "Redis & In-Memory Caches",
          level: 90,
          desc: "Pub/sub, token rate limiters, caching",
        },
        {
          name: "Message Streaming (Kafka, RabbitMQ)",
          level: 82,
          desc: "Event-driven architecture, queues",
        },
      ],
    },
    {
      category: "Servers, Cloud & DevOps",
      icon: "☁️",
      items: [
        {
          name: "Linux Administration & Kernel",
          level: 94,
          desc: "Ubuntu, Debian, systemd, iptables, SSH",
        },
        {
          name: "Docker & Containerization",
          level: 95,
          desc: "Multi-stage builds, compose, hardening",
        },
        {
          name: "Kubernetes (K8s / K3s)",
          level: 84,
          desc: "Deployments, Helm charts, ingress, storage",
        },
        {
          name: "CI/CD & GitOps",
          level: 88,
          desc: "GitHub Actions, automated testing, ArgoCD",
        },
        {
          name: "Nginx & Reverse Proxies",
          level: 92,
          desc: "Load balancing, SSL/TLS, caching, Lua",
        },
      ],
    },
  ],

  timeline: [
    {
      year: "2024 - Present",
      role: "Lead Systems & Infrastructure Architect",
      company: "Apex Telemetry Labs",
      description:
        "Overseeing end-to-end edge-to-cloud telemetry infrastructure. Scaled distributed sensor processing cluster from 5,000 to 80,000 active nodes with sub-second dashboard rendering.",
    },
    {
      year: "2022 - 2024",
      role: "Senior Full-Stack & IoT Engineer",
      company: "Nexus Automation Corp",
      description:
        "Engineered firmware for ESP32 and STM32 industrial controllers. Built internal web monitoring cockpit in React/TypeScript with real-time WebSocket feeds and alerting.",
    },
    {
      year: "2020 - 2022",
      role: "Backend & Systems Developer",
      company: "CloudVanguard Technologies",
      description:
        "Designed REST and gRPC microservices in Go and Python. Implemented Redis caching layers reducing database load by 65% and automated server deployments via Docker & GitHub Actions.",
    },
    {
      year: "2018 - 2020",
      role: "Embedded Systems & Web Developer",
      company: "Silicon Crafts Lab",
      description:
        "Developed microcontroller prototypes, sensory circuits, and client-facing web dashboards for agricultural IoT and smart home devices.",
    },
  ],
};
