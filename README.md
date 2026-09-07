# GenAI Chatbot Exploration 🤖✨

A full-stack, responsive conversational AI system that bridges modern frontend interfaces with state-of-the-art machine learning Large Language Models (LLMs). Built to demonstrate end-to-end AI integration, custom prompt engineering, dynamic multi-turn session management, and fluid UI design.

🔗 **[Live Demo](https://heyysizzii.github.io/GenAI-Chatbot-Exploration/)**
---

## 🎨 Overview & Features

This project showcases a unified approach to consuming generative AI model endpoints. It abstracts away vendor-specific implementations and presents a polished, production-ready chatting client experience.

* **🧠 Core AI Engine Wrapper:** Unified Python abstraction layer enabling dynamic, runtime model switching between **OpenAI GPT**, **Google Gemini**, and **Anthropic Claude**.
* **⚡ Async Real-Time Streaming:** Built using WebSockets to pipe responses down token-by-token for a premium, low-latency client experience (<1s response latency).
* **💬 Smart Context Window Memory:** Tracks multi-turn conversation histories with a built-in sliding context window and intelligent history truncation to reliably avoid context-window or token overflow.
* **🎨 Polished UI & Fluid UX:** Custom fluid design featuring sleek glassmorphism panels, interactive 3D card tilt gestures, responsive design structures, animated streaming indicators, and full code markdown syntax highlighting powered by Prism.js.
* **🔧 Advanced UI Controls:** User-facing sliding panels to fiddle directly with hyper-parameters like system prompts, generation temperature, and maximum token outputs.
* **🔒 Secure Deployment Secrets:** Environment-variable based API key handling ensures absolute safety against API key exposure in production.

---

## 📐 System Architecture

The application implements a decoupled, event-driven architecture to keep interaction speeds lightning fast:

---

## 🛠️ Tech Stack

### Frontend Architecture
* **UI Core:** Semantically native HTML5 & Adaptive CSS3 (utilizing modern CSS Grid, Flexbox layouts, and global variables).
* **Typography:** Syne, DM Mono, and DM Sans via Google Fonts.
* **Interactivity & Logic:** Clean JavaScript (ES6+) implementing modular `IntersectionObserver` scroll behaviors, custom structural mutation listeners, procedural mouse position 3D-tilt matrices, and client-side clipboard writing.
