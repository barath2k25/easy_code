export const templates = [
  {
    id: 'glass-card',
    name: 'Glassmorphic Profile Card',
    description: 'A glowing glassmorphism profile card with modern layout, backdrop blur, hover effects, and interactive tags.',
    html: `<div class="card-container">
  <div class="card">
    <div class="card-glow"></div>
    <div class="avatar-container">
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80" alt="Avatar" class="avatar" />
      <span class="status-badge"></span>
    </div>
    
    <div class="info">
      <h1>Marcus Dev</h1>
      <p class="title">Senior Systems Architect</p>
      <p class="bio">Building scalable distributed systems and high-performance cloud infrastructure.</p>
    </div>

    <div class="skills">
      <span class="skill-tag">React</span>
      <span class="skill-tag">CSS Grid</span>
      <span class="skill-tag">WebGL</span>
      <span class="skill-tag">UX Motion</span>
    </div>

    <div class="actions">
      <button class="btn btn-primary" id="connectBtn">Connect</button>
      <button class="btn btn-secondary" id="msgBtn">Message</button>
    </div>

    <div class="stats">
      <div class="stat-box">
        <span class="stat-val">12.4K</span>
        <span class="stat-lbl">Reach</span>
      </div>
      <div class="stat-box">
        <span class="stat-val">142</span>
        <span class="stat-lbl">Projects</span>
      </div>
      <div class="stat-box">
        <span class="stat-val">4.9</span>
        <span class="stat-lbl">Rating</span>
      </div>
    </div>
  </div>
</div>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Outfit', sans-serif;
  background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f0c1b 100%);
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

.card-container {
  position: relative;
  perspective: 1000px;
}

.card {
  position: relative;
  width: 380px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  text-align: center;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-8px) rotateX(2deg) rotateY(-2deg);
  border-color: rgba(168, 85, 247, 0.4);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 60%);
  pointer-events: none;
  transition: opacity 0.5s;
}

.avatar-container {
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(168, 85, 247, 0.6);
  padding: 4px;
  background: rgba(15, 12, 27, 0.5);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover .avatar {
  transform: scale(1.08) rotate(5deg);
}

.status-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  background-color: #22c55e;
  border: 3px solid #0f0c1b;
  border-radius: 50%;
  box-shadow: 0 0 10px #22c55e;
}

.info h1 {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info .title {
  font-size: 14px;
  color: #a855f7;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.info .bio {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.skills {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.skill-tag {
  font-size: 12px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  color: #cbd5e1;
  transition: all 0.3s;
}

.skill-tag:hover {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.3);
  color: #ffffff;
  transform: scale(1.05);
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 26px;
}

.btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.stats {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
}

.stat-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-val {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
}

.stat-lbl {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
  text-transform: uppercase;
}
`,
    js: `// Interaction Logic for Glassmorphic Profile Card
const connectBtn = document.getElementById('connectBtn');
const msgBtn = document.getElementById('msgBtn');
const card = document.querySelector('.card');

// Connect button animation and console logging
connectBtn.addEventListener('click', () => {
  console.log('🔗 Connection initiated with Marcus Dev!');
  connectBtn.innerText = 'Connecting...';
  connectBtn.style.opacity = '0.7';
  
  setTimeout(() => {
    connectBtn.innerText = 'Connected!';
    connectBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    connectBtn.style.opacity = '1';
    console.log('✅ Connection established successfully!');
  }, 1000);
});

// Message trigger
msgBtn.addEventListener('click', () => {
  console.log('💬 Message window requested.');
  const msg = prompt('Enter your message to Marcus Dev:', 'Love your architecture!');
  if (msg) {
    console.log(\`📨 Sent message: "\${msg}"\`);
    alert('Message sent successfully!');
  } else {
    console.warn('⚠️ Message cancelled by user.');
  }
});

// Dynamic Card Parallax tilt on mousemove
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  // Dynamic rotate values based on cursor relative to card center
  const rotateX = -y / 15;
  const rotateY = x / 15;
  
  card.style.transform = \`translateY(-8px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
  
  // Move card glow background dynamically
  const glow = card.querySelector('.card-glow');
  const glowX = (e.clientX - rect.left) / rect.width * 100;
  const glowY = (e.clientY - rect.top) / rect.height * 100;
  glow.style.background = \`radial-gradient(circle at \${glowX}% \${glowY}%, rgba(168, 85, 247, 0.25) 0%, transparent 60%)\`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)';
  const glow = card.querySelector('.card-glow');
  glow.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 60%)';
});

console.log('🌟 Glassmorphism Card successfully loaded!');
`
  },
  {
    id: 'neon-particles',
    name: 'Neon Particle Button',
    description: 'A futuristic electric button with micro-interactions that spawns floating particles on canvas hover and clicks.',
    html: `<div class="container">
  <div class="interactive-panel">
    <h1>Supercharged Neon Canvas</h1>
    <p>Hover over the button or click it to see custom dynamic particle physics rendered in real-time inside the preview canvas.</p>
    
    <div class="canvas-wrapper">
      <canvas id="particleCanvas"></canvas>
      <button class="neon-btn" id="triggerBtn">
        <span class="btn-text">INJECT PARTICLES</span>
        <span class="btn-glow"></span>
      </button>
    </div>
  </div>
</div>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Outfit', sans-serif;
  background-color: #030712;
  color: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.interactive-panel {
  text-align: center;
  max-width: 500px;
  background: rgba(17, 24, 39, 0.7);
  padding: 40px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
}

.interactive-panel h1 {
  font-size: 26px;
  margin-bottom: 12px;
  font-weight: 700;
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.interactive-panel p {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 30px;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 16px;
  background-color: #0b0f19;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#particleCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.neon-btn {
  position: relative;
  padding: 18px 36px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #38bdf8;
  background: transparent;
  border: 2px solid #38bdf8;
  border-radius: 50px;
  cursor: pointer;
  z-index: 10;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.1), inset 0 0 20px rgba(56, 189, 248, 0.1);
}

.neon-btn:hover {
  color: #030712;
  border-color: #38bdf8;
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.6), inset 0 0 10px rgba(56, 189, 248, 0.4);
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent);
  transition: all 0.5s;
}

.neon-btn:hover .btn-glow {
  left: 100%;
  transition: all 0.6s ease-in-out;
}

.neon-btn:hover {
  background-color: #38bdf8;
}

.neon-btn:active {
  transform: scale(0.96);
}
`,
    js: `// Neon Particle System code
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('triggerBtn');

// Handle sizing
let width = canvas.width = canvas.offsetWidth;
let height = canvas.height = canvas.offsetHeight;

window.addEventListener('resize', () => {
  width = canvas.width = canvas.offsetWidth;
  height = canvas.height = canvas.offsetHeight;
});

const particles = [];

class Particle {
  constructor(x, y, speedMult = 1) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 4 * speedMult;
    this.speedY = (Math.random() - 0.5) * 4 * speedMult - (Math.random() * 2); // Float upwards
    this.color = \`hsl(\${180 + Math.random() * 40}, 90%, 65%)\`;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Spark system
function createSparks(count, x, y, velocity = 1) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, velocity));
  }
}

// Event hooks
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasRect.left;
  const y = e.clientY - canvasRect.top;
  
  createSparks(2, x, y, 0.5);
});

btn.addEventListener('click', (e) => {
  const rect = btn.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasRect.left;
  const y = e.clientY - canvasRect.top;
  
  console.log('⚡ Spark burst injected!');
  createSparks(25, x, y, 2.5);
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  
  // Update & Draw Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    } else {
      particles[i].draw();
    }
  }
  
  requestAnimationFrame(animate);
}

animate();
console.log('💡 Particle loop initialized successfully');
`
  },
  {
    id: 'smart-dashboard',
    name: 'Smart Task Manager',
    description: 'A beautiful task UI featuring a reactive task list, progress bar tracking, adding new items, and status updates.',
    html: `<div class="dash-container">
  <div class="widget">
    <div class="header">
      <div>
        <h2>Project Horizon</h2>
        <p class="subtitle">Sprint Alpha Board</p>
      </div>
      <span class="badge" id="progressBadge">67% Done</span>
    </div>

    <!-- Progress slider -->
    <div class="progress-bar-container">
      <div class="progress-bar" id="progressBar" style="width: 67%;"></div>
    </div>

    <!-- Interactive Task Items -->
    <div class="task-list" id="taskList">
      <div class="task-item done">
        <input type="checkbox" checked class="task-checkbox" data-id="1">
        <span class="task-text">Design interactive wireframes</span>
      </div>
      <div class="task-item done">
        <input type="checkbox" checked class="task-checkbox" data-id="2">
        <span class="task-text">Build live preview compiler module</span>
      </div>
      <div class="task-item">
        <input type="checkbox" class="task-checkbox" data-id="3">
        <span class="task-text">Refactor CSS styling engine</span>
      </div>
    </div>

    <!-- Add New Task form -->
    <form class="add-form" id="addTaskForm">
      <input type="text" id="taskInput" placeholder="Add a new sprint task..." required autocomplete="off" />
      <button type="submit" class="add-btn">+</button>
    </form>
  </div>
</div>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Outfit', sans-serif;
  background-color: #090d16;
  color: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.dash-container {
  width: 100%;
  max-width: 440px;
  padding: 20px;
}

.widget {
  background: linear-gradient(145deg, #131b2e 0%, #0d1222 100%);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(99, 102, 241, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 12px;
  color: #6366f1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818cf8;
  border-radius: 50px;
  transition: all 0.3s;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #ec4899 100%);
  border-radius: 10px;
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  transition: all 0.3s;
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(99, 102, 241, 0.2);
  transform: translateX(4px);
}

.task-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  position: relative;
}

.task-checkbox:checked {
  background: #6366f1;
  border-color: #6366f1;
}

.task-checkbox:checked::after {
  content: '✓';
  color: white;
  font-size: 11px;
  font-weight: 900;
  position: absolute;
}

.task-text {
  font-size: 14px;
  color: #cbd5e1;
  transition: all 0.3s;
}

.task-item.done .task-text {
  text-decoration: line-through;
  color: #64748b;
}

.add-form {
  display: flex;
  gap: 10px;
}

.add-form input {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.add-form input:focus {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.1);
}

.add-btn {
  width: 44px;
  height: 44px;
  background: #6366f1;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  background: #4f46e5;
  transform: scale(1.05);
}

.add-btn:active {
  transform: scale(0.95);
}
`,
    js: `// Task Manager board controller
const taskList = document.getElementById('taskList');
const addForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const progressBar = document.getElementById('progressBar');
const progressBadge = document.getElementById('progressBadge');

// Calculate and update sprint progress percentage
function updateProgress() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const checked = document.querySelectorAll('.task-checkbox:checked');
  
  const percent = checkboxes.length > 0 ? Math.round((checked.length / checkboxes.length) * 100) : 0;
  
  progressBar.style.width = \`\${percent}%\`;
  progressBadge.innerText = \`\${percent}% Done\`;
  
  console.log(\`📈 Dash progress updated: \${percent}%\`);
}

// Checkbox interactions
taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const item = e.target.closest('.task-item');
    if (e.target.checked) {
      item.classList.add('done');
      console.log(\`✅ Checked: "\${item.innerText.trim()}"\`);
    } else {
      item.classList.remove('done');
      console.log(\`⏹️ Unchecked: "\${item.innerText.trim()}"\`);
    }
    updateProgress();
  }
});

// Form submission handler to add dynamic list elements
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskVal = taskInput.value.trim();
  
  if (!taskVal) return;
  
  // Create task elements
  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';
  
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'task-checkbox';
  
  const text = document.createElement('span');
  text.className = 'task-text';
  text.innerText = taskVal;
  
  taskItem.appendChild(check);
  taskItem.appendChild(text);
  
  taskList.appendChild(taskItem);
  
  console.log(\`➕ Task added: "\${taskVal}"\`);
  
  taskInput.value = '';
  updateProgress();
});

console.log('📋 Task manager controller initialized.');
`
  },
  {
    id: 'empty',
    name: 'Blank Canvas',
    description: 'A blank HTML5 workspace template for custom prototyping from scratch.',
    html: `<!-- Start coding here! -->
<div class="hello-world">
  <h1>Hello Dynamic Code World!</h1>
  <p>Modify HTML on the right side. Add styles in style.css or logic in script.js.</p>
</div>`,
    css: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.hello-world {
  text-align: center;
  padding: 40px;
  background: #1e293b;
  border-radius: 16px;
  border: 1px solid #334155;
}

h1 {
  color: #38bdf8;
  margin-bottom: 12px;
}

p {
  color: #94a3b8;
}
`,
    js: `// Blank JS code
console.log('🚀 Ready to build! Log comments will appear in this console.');
`
  }
];
