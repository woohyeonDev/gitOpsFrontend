<script lang="ts">
  import { onMount } from 'svelte';

  let platforms: any[] = [];
  let loading = false;
  let error = '';
  let success = '';

  // Form fields
  let url = '';
  let name = '';
  let clientId = '';
  let authenticationEndpoint = '';
  let accesstokenEndpoint = '';
  let jwksUri = '';

  onMount(() => {
    loadPlatforms();
  });

  async function loadPlatforms() {
    try {
      const response = await fetch('http://localhost:3001/api/lti/platforms');
      if (response.ok) {
        platforms = await response.json();
      } else {
        error = 'Failed to load platforms';
      }
    } catch (err) {
      error = 'Network error: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
  }

  async function handleSubmit() {
    if (!url || !clientId || !authenticationEndpoint || !accesstokenEndpoint || !jwksUri) {
      error = 'Please fill in all required fields';
      return;
    }

    loading = true;
    error = '';
    success = '';

    try {
      const response = await fetch('http://localhost:3001/api/lti/platforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          name: name || url,
          clientId,
          authenticationEndpoint,
          accesstokenEndpoint,
          jwksUri,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        success = 'Platform registered successfully!';
        // Clear form
        url = '';
        name = '';
        clientId = '';
        authenticationEndpoint = '';
        accesstokenEndpoint = '';
        jwksUri = '';
        // Reload platforms
        await loadPlatforms();
      } else {
        error = data.message || 'Registration failed';
      }
    } catch (err) {
      error = 'Network error: ' + (err instanceof Error ? err.message : 'Unknown error');
    } finally {
      loading = false;
    }
  }

  async function handleDelete(platform: any) {
    if (!confirm(`Delete platform "${platform.platformName || platform.platformUrl}"?`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/lti/platforms', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: platform.platformUrl,
          clientId: platform.platformClientId,
        }),
      });

      if (response.ok) {
        success = 'Platform deleted successfully!';
        await loadPlatforms();
      } else {
        const data = await response.json();
        error = data.message || 'Delete failed';
      }
    } catch (err) {
      error = 'Network error: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
  }
</script>

<div class="container">
  <h1>Platform Management</h1>
  <p class="subtitle">Register and manage LTI platforms (LMS systems)</p>

  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}

  {#if success}
    <div class="success-message">
      {success}
    </div>
  {/if}

  <div class="card">
    <h2>Register New Platform</h2>
    <p class="description">
      Enter the platform information from your LMS (Moodle, Canvas, etc.)
    </p>

    <form on:submit|preventDefault={handleSubmit} class="form">
      <div class="form-row">
        <div class="form-group">
          <label for="url">Platform URL (Issuer) *</label>
          <input
            id="url"
            type="url"
            bind:value={url}
            placeholder="https://moodle.example.com"
            required
            disabled={loading}
          />
          <small>The base URL of your LMS</small>
        </div>

        <div class="form-group">
          <label for="name">Platform Name</label>
          <input
            id="name"
            type="text"
            bind:value={name}
            placeholder="My Moodle Site"
            disabled={loading}
          />
          <small>Friendly name (optional)</small>
        </div>
      </div>

      <div class="form-group">
        <label for="clientId">Client ID *</label>
        <input
          id="clientId"
          type="text"
          bind:value={clientId}
          placeholder="ABC123..."
          required
          disabled={loading}
        />
        <small>Client ID provided by the LMS</small>
      </div>

      <div class="form-group">
        <label for="authenticationEndpoint">Authentication Endpoint *</label>
        <input
          id="authenticationEndpoint"
          type="url"
          bind:value={authenticationEndpoint}
          placeholder="https://moodle.example.com/mod/lti/auth.php"
          required
          disabled={loading}
        />
        <small>OIDC authentication URL</small>
      </div>

      <div class="form-group">
        <label for="accesstokenEndpoint">Access Token Endpoint *</label>
        <input
          id="accesstokenEndpoint"
          type="url"
          bind:value={accesstokenEndpoint}
          placeholder="https://moodle.example.com/mod/lti/token.php"
          required
          disabled={loading}
        />
        <small>OAuth 2.0 token URL</small>
      </div>

      <div class="form-group">
        <label for="jwksUri">Public Keyset URL (JWKS URI) *</label>
        <input
          id="jwksUri"
          type="url"
          bind:value={jwksUri}
          placeholder="https://moodle.example.com/mod/lti/certs.php"
          required
          disabled={loading}
        />
        <small>Platform's public key endpoint</small>
      </div>

      <button type="submit" disabled={loading} class="submit-btn">
        {loading ? 'Registering...' : 'Register Platform'}
      </button>
    </form>
  </div>

  <div class="card">
    <h2>Registered Platforms</h2>

    {#if platforms.length === 0}
      <p class="no-platforms">No platforms registered yet.</p>
    {:else}
      <div class="platforms-list">
        {#each platforms as platform}
          <div class="platform-item">
            <div class="platform-info">
              <h3>{platform.platformName || platform.platformUrl}</h3>
              <div class="platform-details">
                <div class="detail-row">
                  <span class="detail-label">URL:</span>
                  <span class="detail-value">{platform.platformUrl}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Client ID:</span>
                  <span class="detail-value">{platform.platformClientId}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Auth Endpoint:</span>
                  <span class="detail-value">{platform.authEndpoint}</span>
                </div>
              </div>
            </div>
            <button
              class="delete-btn"
              on:click={() => handleDelete(platform)}
            >
              Delete
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="info-card">
    <h3>How to Register a Moodle Platform</h3>
    <ol>
      <li>In Moodle, go to <strong>Site administration → Plugins → Activity modules → External tool → Manage tools</strong></li>
      <li>Click <strong>"Configure a tool manually"</strong></li>
      <li>Enter your tool details:
        <ul>
          <li>Tool name: Tube Standard</li>
          <li>Tool URL: http://localhost:3000/lti</li>
          <li>LTI version: LTI 1.3</li>
          <li>Public key type: Keyset URL</li>
          <li>Public keyset: http://localhost:3000/keys</li>
          <li>Initiate login URL: http://localhost:3000/login</li>
          <li>Redirection URI(s): http://localhost:3000/lti</li>
        </ul>
      </li>
      <li>Save and copy the <strong>Client ID</strong> and other endpoints</li>
      <li>Enter those values in the form above</li>
    </ol>
  </div>
</div>

<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
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
    color: #444;
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
  }

  input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  small {
    color: #888;
    font-size: 0.85rem;
  }

  .submit-btn {
    background-color: #4a90e2;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: #357abd;
  }

  .submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error-message {
    padding: 1rem;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    color: #721c24;
    margin-bottom: 1rem;
  }

  .success-message {
    padding: 1rem;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    color: #155724;
    margin-bottom: 1rem;
  }

  .no-platforms {
    color: #999;
    text-align: center;
    padding: 2rem;
  }

  .platforms-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .platform-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
  }

  .platform-info {
    flex: 1;
  }

  .platform-info h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: #333;
  }

  .platform-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .detail-row {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .detail-label {
    font-weight: 600;
    color: #666;
    min-width: 120px;
  }

  .detail-value {
    color: #333;
    font-family: 'Consolas', 'Monaco', monospace;
    word-break: break-all;
  }

  .delete-btn {
    background-color: #dc3545;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .delete-btn:hover {
    background-color: #c82333;
  }

  .info-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .info-card h3 {
    margin-bottom: 1rem;
    color: #333;
  }

  .info-card ol {
    margin-left: 1.5rem;
    line-height: 1.8;
  }

  .info-card ul {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
  }

  .info-card li {
    margin-bottom: 0.5rem;
    color: #555;
  }

  .info-card strong {
    color: #222;
  }
</style>
