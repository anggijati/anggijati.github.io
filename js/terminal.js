/**
 * INTERACTIVE CLI TERMINAL ENGINE
 * Allows visitors to query the engineer's systems, inspect hardware specs,
 * view projects, and trigger easter eggs.
 */

class InteractiveTerminal {
  constructor(terminalId) {
    this.container = document.getElementById(terminalId);
    if (!this.container) return;

    this.body = this.container.querySelector('.terminal-body');
    this.input = this.container.querySelector('.terminal-input');
    this.chipButtons = this.container.querySelectorAll('.chip-btn');
    this.clearBtn = this.container.querySelector('.terminal-btn-clear');

    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.cmdHelp(),
      about: () => this.cmdAbout(),
      bio: () => this.cmdAbout(),
      skills: () => this.cmdSkills(),
      projects: () => this.cmdProjects(),
      iot: () => this.cmdIoT(),
      server: () => this.cmdServer(),
      simulator: () => this.cmdSimulator(),
      contact: () => this.cmdContact(),
      clear: () => this.cmdClear(),
      matrix: () => this.cmdMatrix(),
      ping: () => this.cmdPing(),
      sudo: () => this.cmdSudo(),
      whoami: () => `<span class="terminal-output highlight">guest@engineer-os [Access Level: Explorer]</span>`
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.runBootSequence();
  }

  bindEvents() {
    if (this.input) {
      this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    if (this.chipButtons) {
      this.chipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const cmd = btn.getAttribute('data-cmd');
          if (cmd) {
            this.executeCommand(cmd);
            if (typeof sysSound !== 'undefined') sysSound.playClick();
          }
        });
      });
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.cmdClear());
    }

    // Keep focus when clicking inside terminal
    this.container.addEventListener('click', () => {
      if (this.input) this.input.focus();
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const rawCmd = this.input.value.trim();
      if (rawCmd) {
        this.history.push(rawCmd);
        this.historyIndex = this.history.length;
        this.executeCommand(rawCmd);
        this.input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    }
  }

  executeCommand(commandText) {
    const cleanCmd = commandText.trim().toLowerCase();
    
    // Echo command in terminal
    this.appendLine(`<span class="terminal-prompt">guest@engineer-os:~$</span> <span class="terminal-cmd">${this.escapeHTML(commandText)}</span>`);

    if (this.commands[cleanCmd]) {
      const output = this.commands[cleanCmd]();
      if (output) {
        this.appendLine(output);
      }
      if (typeof sysSound !== 'undefined') sysSound.playBeep();
    } else {
      this.appendLine(`<div class="terminal-output warning">Command '${this.escapeHTML(cleanCmd)}' not recognized. Type '<span class="highlight">help</span>' for available operations.</div>`);
      if (typeof sysSound !== 'undefined') sysSound.playError();
    }

    this.scrollToBottom();
  }

  appendLine(htmlContent) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = htmlContent;
    this.body.appendChild(line);
  }

  scrollToBottom() {
    this.body.scrollTop = this.body.scrollHeight;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  runBootSequence() {
    const messages = [
      "SYSTEM BOOT: Initializing multi-discipline kernel v3.8.4 ...",
      "CHECKING SUBSYSTEMS: [IoT: OK] [Backend: OK] [Servers: OK] [Frontend: OK]",
      "TYPE '<span class='highlight' style='color:#00f0ff'>help</span>' or click a command chip below to query systems."
    ];

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        this.appendLine(`<div class="terminal-output success">${msg}</div>`);
        this.scrollToBottom();
      }, idx * 250);
    });
  }

  /* Command Implementations */
  cmdHelp() {
    return `
      <div class="terminal-output">
        <table style="max-width:460px;">
          <tr><td style="color:#00f0ff">help</td><td>Display available manual commands</td></tr>
          <tr><td style="color:#00f0ff">about</td><td>Executive summary & engineering philosophy</td></tr>
          <tr><td style="color:#00f0ff">skills</td><td>Inspect categorized capability matrix</td></tr>
          <tr><td style="color:#00f0ff">projects</td><td>List featured engineering artifacts</td></tr>
          <tr><td style="color:#00f0ff">iot</td><td>Display embedded hardware specifications</td></tr>
          <tr><td style="color:#00f0ff">simulator</td><td>Jump directly to interactive pipeline lab</td></tr>
          <tr><td style="color:#00f0ff">ping</td><td>Ping cloud gateway latency test</td></tr>
          <tr><td style="color:#00f0ff">contact</td><td>Show communication endpoints</td></tr>
          <tr><td style="color:#00f0ff">clear</td><td>Purge terminal screen buffer</td></tr>
          <tr><td style="color:#00f0ff">matrix</td><td>Initiate matrix stream simulation</td></tr>
        </table>
      </div>
    `;
  }

  cmdAbout() {
    const p = PORTFOLIO_DATA.profile;
    return `
      <div class="terminal-output">
        <p><strong style="color:#fff">${p.name}</strong> [${p.title}]</p>
        <p style="margin-top:4px;">${p.tagline}</p>
        <p style="color:#00ff9d; margin-top:6px;">Status: ${p.status} | Location: ${p.location}</p>
      </div>
    `;
  }

  cmdSkills() {
    let output = `<div class="terminal-output">`;
    PORTFOLIO_DATA.skillsMatrix.forEach(cat => {
      output += `<p style="color:#00f0ff; margin-top:6px;">${cat.icon} <strong>${cat.category}</strong>:</p>`;
      const list = cat.items.map(i => `${i.name} (${i.level}%)`).join(', ');
      output += `<p style="color:#94a3b8; font-size:0.8rem; margin-left:10px;">${list}</p>`;
    });
    output += `</div>`;
    return output;
  }

  cmdProjects() {
    let output = `<div class="terminal-output"><p style="color:#00f0ff">ARCHIVED & ACTIVE PROJECTS:</p><ul>`;
    PORTFOLIO_DATA.projects.forEach(proj => {
      output += `<li style="margin-top:4px;"><strong>${proj.icon} ${proj.title}</strong> [${proj.categoryLabel}] - <span style="color:#94a3b8">${proj.tags.join(', ')}</span></li>`;
    });
    output += `</ul></div>`;
    return output;
  }

  cmdIoT() {
    return `
      <div class="terminal-output">
        <p style="color:#ffb800">🛰️ HARDWARE & EMBEDDED TELEMETRY LAB:</p>
        <p>• Microcontrollers: ESP32 (Xtensa dual-core), STM32 (ARM Cortex-M4), RP2040, Arduino</p>
        <p>• Protocols & Bus: MQTT/TLS, FreeRTOS queues, I2C, SPI, UART, CAN bus</p>
        <p>• Wireless Mesh: LoRaWAN 433/915MHz, BLE 5.0 mesh, Zigbee</p>
        <p>• Power profiling: Deep-sleep standby current down to 10uA</p>
      </div>
    `;
  }

  cmdServer() {
    return `
      <div class="terminal-output">
        <p style="color:#9d4edd">☁️ INFRASTRUCTURE & BACKEND CLUSTER:</p>
        <p>• Microservices: Go (Golang), Rust, Node.js, Python FastAPI</p>
        <p>• Orchestration: K3s Kubernetes, Docker, Helm, ArgoCD GitOps</p>
        <p>• Data: PostgreSQL, TimescaleDB (time-series), Redis (cache & pub/sub)</p>
        <p>• High Availability: Wireguard zero-trust VPN mesh, Nginx reverse proxy</p>
      </div>
    `;
  }

  cmdSimulator() {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return `<div class="terminal-output success">Routing viewport to Edge-to-Cloud Simulator...</div>`;
    }
    return `<div class="terminal-output">Simulator element ready.</div>`;
  }

  cmdContact() {
    const p = PORTFOLIO_DATA.profile;
    return `
      <div class="terminal-output">
        <p style="color:#00ff9d">TRANSMISSION UPLINK CHANNELS:</p>
        <p>• Email: <span style="color:#00f0ff">${p.email}</span></p>
        <p>• GitHub: <a href="${p.github}" target="_blank" style="color:#00f0ff">${p.github}</a></p>
        <p>• LinkedIn: <a href="${p.linkedin}" target="_blank" style="color:#00f0ff">${p.linkedin}</a></p>
        <p>• Discord: <span style="color:#00f0ff">${p.discord}</span></p>
      </div>
    `;
  }

  cmdClear() {
    this.body.innerHTML = '';
    return null;
  }

  cmdPing() {
    const latency = Math.floor(Math.random() * 18 + 12);
    return `
      <div class="terminal-output success">
        PING gateway.sys-engineer.cloud (172.217.16.206): 56 data bytes<br>
        64 bytes from 172.217.16.206: icmp_seq=0 ttl=118 time=${latency}.${Math.floor(Math.random()*9)}ms<br>
        64 bytes from 172.217.16.206: icmp_seq=1 ttl=118 time=${latency - 2}.${Math.floor(Math.random()*9)}ms<br>
        --- round-trip min/avg/max = ${latency - 2}.1/${latency}.4/${latency + 4}.2 ms ---
      </div>
    `;
  }

  cmdSudo() {
    return `<div class="terminal-output warning">Permission denied: User 'guest' is not in the sudoers file. Incident reported to sys_engineer. 😉</div>`;
  }

  cmdMatrix() {
    this.appendLine(`<div class="terminal-output success">Waking up Neo... Initiating matrix packet flow...</div>`);
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        let chars = '';
        for (let j = 0; j < 38; j++) {
          chars += String.fromCharCode(33 + Math.floor(Math.random() * 90)) + ' ';
        }
        this.appendLine(`<div class="terminal-output" style="color:#00ff9d; font-size:0.75rem;">${chars}</div>`);
        this.scrollToBottom();
      }, i * 150);
    }
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.sysTerminal = new InteractiveTerminal('hero-terminal');
});
