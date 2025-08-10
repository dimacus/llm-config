import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch('/generic.md')
        if (!response.ok) {
          throw new Error('Failed to fetch markdown file')
        }
        const text = await response.text()
        setMarkdownContent(text)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchMarkdown()
  }, [])

  const renderMarkdown = (markdown: string) => {
    return { __html: marked(markdown) }
  }

  return (
    <>
      <div className="container">
      <header className="header">
        <h1>LLM Configuration Examples</h1>
        <p className="subtitle">
          Example configurations for Large Language Models and AI tools
        </p>
        <div className="header-buttons">
          <a href="#contribute" className="header-button contribute-link">
            Contribute
          </a>
          <a href="#donate" className="header-button donate-link">
            Donate
          </a>
        </div>
      </header>
        <section className="instructions">
          <h2>How to Use These Configurations</h2>
          <p>
            Copy the configuration content below and place it in the appropriate location for your LLM or AI tool:
          </p>
          
          <div className="config-locations">
            <div className="config-item">
              <h3>OpenAI ChatGPT</h3>
              <p>Custom Instructions → System Instructions</p>
            </div>
            
            <div className="config-item">
              <h3>Claude (Anthropic)</h3>
              <p>Project Settings → Project Instructions</p>
            </div>
            
            <div className="config-item">
              <h3>Cursor IDE</h3>
              <p>Settings → Rules for AI → .cursorrules file</p>
            </div>
            
            <div className="config-item">
              <h3>Continue.dev</h3>
              <p>~/.continue/config.json → systemMessage</p>
            </div>
            
            <div className="config-item">
              <h3>Aider</h3>
              <p>--message flag or .aider.conf.yml</p>
            </div>
            
          <div className="config-item">
            <h3>GitHub Copilot</h3>
            <p>VS Code Settings → GitHub Copilot → Instructions</p>
          </div>
          
          <div className="config-item">
            <h3>Claude Code</h3>
            <p>Claude.md file in project root</p>
          </div>
          
          <div className="config-item">
            <h3>OpenCode</h3>
            <p>AGENTS.md file in project root</p>
          </div>          </div>
        </section>

        <main className="content">
          {loading && <div className="loading">Loading configuration...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={renderMarkdown(markdownContent)}
            />
          )}
        </main>

        <section id="contribute" className="contribute">
          <h2>Contribute</h2>
          <p>Help improve this project by contributing configurations, fixes, or new features</p>
          <a 
            href="https://github.com/dimacus/llm-config" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contribute-button"
          >
            View on GitHub
          </a>
        </section>

        <section id="donate" className="donation">
          <h2>Support This Project</h2>
          <p>Help us host and improve this page</p>
          <a 
            href="https://www.paypal.com/paypalme/nsweb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="donation-button"
          >
            Donate via PayPal
          </a>
        </section>
      </div>
      <Analytics />
    </>
  )
}

export default App
