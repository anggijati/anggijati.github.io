/**
 * INTERACTIVE EDGE-TO-CLOUD PIPELINE SIMULATOR
 * Real-time interactive architecture visualization demonstrating how data flows
 * from physical microcontrollers through message brokers and backend services
 * to real-time client web applications.
 */

class ArchitectureSimulator {
  constructor() {
    this.nodes = document.querySelectorAll('.pipeline-node');
    this.packetRunner = document.getElementById('pipeline-runner');
    this.logBox = document.getElementById('sim-log-box');
    this.triggerBtn = document.getElementById('sim-btn-trigger');
    this.streamBtn = document.getElementById('sim-btn-stream');
    this.glitchBtn = document.getElementById('sim-btn-glitch');

    // Metrics elements
    this.metricPackets = document.getElementById('metric-packets');
    this.metricLatency = document.getElementById('metric-latency');
    this.metricThroughput = document.getElementById('metric-throughput');
    this.metricHealth = document.getElementById('metric-health');

    this.packetCount = 1420;
    this.isStreaming = false;
    this.streamInterval = null;
    this.isProcessingPacket = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.log('INIT', 'Architecture pipeline online. Standby for sensor telemetry.');
  }

  bindEvents() {
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => {
        this.triggerPacketPulse();
        if (typeof sysSound !== 'undefined') sysSound.playClick();
      });
    }

    if (this.streamBtn) {
      this.streamBtn.addEventListener('click', () => {
        this.toggleStream();
      });
    }

    if (this.glitchBtn) {
      this.glitchBtn.addEventListener('click', () => {
        this.simulateGlitch();
      });
    }

    // Clicking individual nodes
    this.nodes.forEach((node, idx) => {
      node.addEventListener('click', () => {
        const nodeName = node.querySelector('.node-name')?.textContent || `Node #${idx + 1}`;
        this.log('INSPECT', `Node inspection: ${nodeName} operating nominal. CPU load: ${(Math.random() * 15 + 5).toFixed(1)}%`);
        if (typeof sysSound !== 'undefined') sysSound.playClick();
      });
    });
  }

  triggerPacketPulse(isContinuous = false) {
    if (this.isProcessingPacket && !isContinuous) return;
    this.isProcessingPacket = true;

    this.packetCount++;
    if (this.metricPackets) this.metricPackets.textContent = this.packetCount.toLocaleString();

    const latency = Math.floor(Math.random() * 12 + 10);
    if (this.metricLatency) this.metricLatency.textContent = `${latency} ms`;

    const packetId = 'PKT-' + Math.floor(1000 + Math.random() * 9000);
    const sensorTemp = (24.0 + Math.random() * 2.5).toFixed(1);

    const stages = [
      { nodeIdx: 0, tag: 'EDGE_ADC', msg: `[ESP32] Sampled DHT22: ${sensorTemp}°C | Packing Protobuf payload (128B)`, progress: '0%' },
      { nodeIdx: 1, tag: 'MQTT_BROKER', msg: `[EMQX] TLS Handshake verified. Topic: sensors/telemetry/aegis-1`, progress: '25%' },
      { nodeIdx: 2, tag: 'BACKEND_GO', msg: `[Go-Worker] Decompressed ${packetId}. Validated HMAC signature [OK]`, progress: '50%' },
      { nodeIdx: 3, tag: 'TIMESCALEDB', msg: `[TimescaleDB] Inserted into hypertable 'sensor_metrics' (${latency}ms total)`, progress: '75%' },
      { nodeIdx: 4, tag: 'WS_FRONTEND', msg: `[Client UI] WebSocket event dispatched: Telemetry gauge updated to ${sensorTemp}°C`, progress: '100%' }
    ];

    const stageDuration = 320; // ms per node

    if (this.packetRunner) {
      this.packetRunner.style.opacity = '1';
    }

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        // Clear all active node glows
        this.nodes.forEach(n => n.classList.remove('active-packet'));

        // Highlight current node
        if (this.nodes[stage.nodeIdx]) {
          this.nodes[stage.nodeIdx].classList.add('active-packet');
          
          // Animate metric text inside node
          const metricEl = this.nodes[stage.nodeIdx].querySelector('.node-live-metric');
          if (metricEl) {
            if (stage.nodeIdx === 0) metricEl.textContent = `${sensorTemp}°C / Nominal`;
            if (stage.nodeIdx === 1) metricEl.textContent = `QoS 1 Ack`;
            if (stage.nodeIdx === 2) metricEl.textContent = `PID: ${Math.floor(Math.random() * 9000 + 1000)}`;
            if (stage.nodeIdx === 3) metricEl.textContent = `WAL synced`;
            if (stage.nodeIdx === 4) metricEl.textContent = `60 FPS Render`;
          }
        }

        // Move the packet runner visually
        if (this.packetRunner) {
          this.packetRunner.style.left = stage.progress;
        }

        // Sound effect
        if (typeof sysSound !== 'undefined' && (idx === 0 || idx === 4)) {
          sysSound.playPacket();
        }

        // Log entry
        this.log(stage.tag, stage.msg);

        // Final cleanup
        if (idx === stages.length - 1) {
          setTimeout(() => {
            this.nodes.forEach(n => n.classList.remove('active-packet'));
            if (this.packetRunner) this.packetRunner.style.opacity = '0';
            this.isProcessingPacket = false;
          }, 300);
        }
      }, idx * stageDuration);
    });
  }

  toggleStream() {
    this.isStreaming = !this.isStreaming;

    if (this.isStreaming) {
      this.streamBtn.innerHTML = `<span>⏹ Stop Stream</span>`;
      this.streamBtn.classList.add('btn-green');
      if (this.metricThroughput) this.metricThroughput.textContent = '120 pkts/min';
      this.log('STREAM', 'Continuous telemetry broadcast started (1.2s cadence).');

      this.triggerPacketPulse(true);
      this.streamInterval = setInterval(() => {
        this.triggerPacketPulse(true);
      }, 1400);
    } else {
      clearInterval(this.streamInterval);
      this.streamBtn.innerHTML = `<span>▶ Continuous Stream</span>`;
      this.streamBtn.classList.remove('btn-green');
      if (this.metricThroughput) this.metricThroughput.textContent = 'Idle';
      this.log('STREAM', 'Continuous stream paused.');
    }
  }

  simulateGlitch() {
    this.log('WARN', 'SIMULATION: Introducing artificial network drop on Primary MQTT Gateway...');
    if (this.metricHealth) this.metricHealth.textContent = 'DEGRADED (92%)';
    if (typeof sysSound !== 'undefined') sysSound.playError();

    const brokerNode = this.nodes[1];
    if (brokerNode) {
      brokerNode.style.borderColor = '#ff3366';
      brokerNode.style.boxShadow = '0 0 25px rgba(255, 51, 102, 0.5)';
      const metricEl = brokerNode.querySelector('.node-live-metric');
      if (metricEl) metricEl.textContent = 'CONNECTION TIMEOUT';
    }

    // Auto-recovery failover sequence
    setTimeout(() => {
      this.log('RECOVERY', 'Automatic failover triggered: Activating secondary broker cluster (us-east-failover)...');
      if (typeof sysSound !== 'undefined') sysSound.playClick();
    }, 1200);

    setTimeout(() => {
      this.log('SUCCESS', 'Secondary broker connected. Zero packet loss. Systems 100% restored.');
      if (this.metricHealth) this.metricHealth.textContent = '100% HEALTHY';
      if (brokerNode) {
        brokerNode.style.borderColor = '';
        brokerNode.style.boxShadow = '';
        const metricEl = brokerNode.querySelector('.node-live-metric');
        if (metricEl) metricEl.textContent = 'Standby Ready';
      }
      if (typeof sysSound !== 'undefined') sysSound.playSuccess();
    }, 2800);
  }

  log(tag, message) {
    if (!this.logBox) return;

    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const line = document.createElement('div');
    line.className = 'log-entry';
    line.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="log-tag">[${tag}]</span>
      <span class="log-msg">${message}</span>
    `;

    this.logBox.appendChild(line);
    this.logBox.scrollTop = this.logBox.scrollHeight;

    // Keep log reasonable in size
    while (this.logBox.children.length > 40) {
      this.logBox.removeChild(this.logBox.firstChild);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.archSimulator = new ArchitectureSimulator();
});
