<script lang="ts">
  let courseId = 'course-101';
  let resourceId = 'resource-501';
  let ltiMessageHint = '';
</script>

<div class="container">
  <h1>LMS Simulator</h1>
  <p class="subtitle">Simulate launching an LTI 1.3 Tool from your LMS</p>

  <div class="info-box">
    <h3>📚 Current Context</h3>
    <div class="context-grid">
      <div class="context-item">
        <span class="label">Issuer:</span>
        <span class="value">http://localhost:5173</span>
      </div>
      <div class="context-item">
        <span class="label">Client ID:</span>
        <span class="value">test-client-123</span>
      </div>
      <div class="context-item">
        <span class="label">Tool URL:</span>
        <span class="value">http://localhost:3000/lti</span>
      </div>
      <div class="context-item">
        <span class="label">User:</span>
        <span class="value">Auto-generated (from session)</span>
      </div>
    </div>
    <small class="config-note">Configuration loaded from server environment variables</small>
  </div>

  <div class="card">
    <h2>Launch LTI Tool</h2>
    <p class="description">
      Click the button below to launch the Tool. The LMS will send an OIDC login request with your session information.
    </p>

    <form method="POST" action="/lms-simulator/launch" class="form">
      <div class="form-group">
        <label for="courseId">Course ID (Optional)</label>
        <input
          id="courseId"
          name="courseId"
          type="text"
          bind:value={courseId}
          placeholder="course-101"
        />
        <small>Course context for the tool launch</small>
      </div>

      <div class="form-group">
        <label for="resourceId">Resource ID (Optional)</label>
        <input
          id="resourceId"
          name="resourceId"
          type="text"
          bind:value={resourceId}
          placeholder="resource-501"
        />
        <small>Specific resource within the course</small>
      </div>

      <div class="form-group">
        <label for="ltiMessageHint">Message Hint (Optional)</label>
        <input
          id="ltiMessageHint"
          name="ltiMessageHint"
          type="text"
          bind:value={ltiMessageHint}
          placeholder=""
        />
        <small>Additional context about the launch</small>
      </div>

      <button type="submit" class="launch-btn">
        🚀 Launch Tool
      </button>
    </form>
  </div>

  <div class="info-card">
    <h3>LTI 1.3 OIDC Flow</h3>
    <ol>
      <li>
        <strong>OIDC Login Initiation</strong> (This page)
        <br />
        LMS Server → Tool: Server-side redirect to /lti/login
      </li>
      <li>
        <strong>Authentication Request</strong>
        <br />
        Tool → LMS: Redirect to /platform/auth with state, nonce
      </li>
      <li>
        <strong>Authentication Response</strong>
        <br />
        LMS → Tool: Redirect with id_token (JWT)
      </li>
      <li>
        <strong>Launch Success</strong>
        <br />
        Tool validates token and displays content
      </li>
    </ol>
  </div>

  <div class="debug-card">
    <h3>What Happens When You Click Launch</h3>
    <pre><code>1. Browser submits form → /lms-simulator/launch (POST)
2. Server reads config from environment variables
3. Server generates login request with user session
4. Server redirects (302) to Tool's login endpoint
5. Tool starts OIDC authentication flow</code></pre>
  </div>
</div>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #222;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .info-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .info-box h3 {
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
  }

  .context-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .context-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem;
    border-radius: 4px;
    backdrop-filter: blur(10px);
  }

  .context-item .label {
    display: block;
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 0.25rem;
  }

  .context-item .value {
    display: block;
    font-weight: 600;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
  }

  .config-note {
    opacity: 0.8;
    font-size: 0.85rem;
    font-style: italic;
  }

  .card {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .description {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    color: #444;
    font-size: 0.9rem;
  }

  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: 'Consolas', 'Monaco', monospace;
  }

  input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  small {
    color: #888;
    font-size: 0.85rem;
  }

  .launch-btn {
    background-color: #28a745;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1rem;
  }

  .launch-btn:hover {
    background-color: #218838;
  }

  .info-card, .debug-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .info-card h3, .debug-card h3 {
    margin-bottom: 1rem;
    color: #333;
  }

  .info-card ol {
    margin-left: 1.5rem;
    line-height: 1.8;
  }

  .info-card li {
    margin-bottom: 1rem;
    color: #555;
  }

  .info-card strong {
    color: #222;
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  code {
    font-family: 'Consolas', 'Monaco', monospace;
  }
</style>
