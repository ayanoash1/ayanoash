# ayanoash
website for myself
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LATVERIA PRIME // DOOM SOVEREIGNTY</title>
  <link rel="stylesheet" href="latveria_os.css">
</head>
<body>

  <!-- BACKGROUND CANVAS -->
  <canvas id="bg-canvas"></canvas>

  <!-- STARTUP BOOT OVERLAY -->
  <div id="boot-overlay">
    <div class="boot-status-pill">System Authorization Required</div>
    <div class="boot-title" data-text="LATVERIA PRIME OS">LATVERIA PRIME OS</div>
    <div class="boot-subtitle">ESTABLISHING QUANTUM LINK TO DOOM'S SOVEREIGN GRID</div>
    <div class="boot-progress-track">
      <div class="boot-progress-bar" id="boot-progress"></div>
    </div>
    <button class="boot-btn" id="enter-btn" onclick="initializeSystem()">ENTER DOMAIN</button>
  </div>

  <!-- MAIN APP CONTAINER -->
  <div id="app-container">
    
    <!-- HEADER -->
    <header>
      <div class="header-brand">
        <span class="brand-title">LATVERIA PRIME</span>
        <span class="brand-subtitle">DOOM SOVEREIGN NETWORK</span>
      </div>
      <div class="header-actions">
        <div class="status-pill">
          <div class="status-dot"></div>
          <span>DEFCON 1 // DOOM ONLINE</span>
        </div>
      </div>
    </header>

    <!-- HERO TITLE -->
    <section class="hero-section">
      <span class="hero-tag reveal-text">Sovereign Authority</span>
      <h1 class="hero-title reveal-text">ABSOLUTE PRECISION</h1>
      <p class="hero-desc reveal-text">Strategic decrees and cosmic realignment. Rendered under the supreme command of Victor Von Doom.</p>
    </section>

    <!-- MAIN CENTERED CONTENT -->
    <main class="main-content">
      <section class="sovereign-card">
        <div class="card-header">
          <div>
            <div class="card-subtitle reveal-text">Synthesize Supreme Directives</div>
          </div>
        </div>

        <!-- HACKERRANK-STYLE PRODUCT SHOWCASE -->
        <section class="hr-hero" id="features">
          <div class="tagline reveal-text">Developer Platform</div>
          <h1 class="reveal-text">Assess. Upskill. Deploy.</h1>
          <p class="reveal-text">Trusted by engineering teams worldwide. Streamline your deployment process with role-based assessments, plagiarism detection, and AI-powered interviews.</p>
          <div class="product-showcase">
            <div class="product-card reveal-card">
              <span class="product-badge">Screen</span>
              <div class="product-name">Certified Assessments</div>
              <div class="product-desc">Standardized, role-based tests in minutes with AI plagiarism detection and real-world coding questions.</div>
            </div>
            <div class="product-card reveal-card">
              <span class="product-badge">Interview</span>
              <div class="product-name">Live Interviews</div>
              <div class="product-desc">Conduct stellar technical interviews with AI add-on, pair-programming sessions, and scorecard-based evaluation.</div>
            </div>
            <div class="product-card reveal-card">
              <span class="product-badge">Engage</span>
              <div class="product-name">Community & Deployments</div>
              <div class="product-desc">Build developer communities, host hackathons, and monitor team activity across production systems with 26M+ participants.</div>
            </div>
            <div class="product-card reveal-card">
              <span class="product-badge">SkillUp</span>
              <div class="product-name">Developer Upskilling</div>
              <div class="product-desc">Internal developer upskilling with AI-powered learning paths, skill gap analysis, and role-based training.</div>
            </div>
            <div class="product-card reveal-card">
              <span class="product-badge">Chakra</span>
              <div class="product-name">AI Pre-screening</div>
              <div class="product-desc">AI Add-on for automated candidate screening, competency scoring, and unbiased shortlisting.</div>
            </div>
          </div>
        </section>

        <!-- HACKERRANK CTA BAR -->
        <section class="hr-cta reveal-text">
          <h2>Ready to deploy the best?</h2>
          <p>Start a free trial or request a demo to see how Latveria OS can transform your deployment process.</p>
          <button class="primary-btn">Get Started Free</button>
        </section>

        <div class="decree-box">
          <p class="decree-text reveal-text" id="decree-display">"None shall rival the mind of Doom. All world affairs bend to my design."</p>
          <button class="generate-btn" onclick="generateDecree()">Synthesize Decree</button>
        </div>
      </section>
    </main>

    <footer class="reveal-text">
      LATVERIA PRIME OS // DESIGNED FOR VICTOR VON DOOM // ALL RIGHTS RESERVED
    </footer>

  </div>

  <script src="latveria_os.js"></script>
</body>
</html>
