# 🗳️ VerifyVote AI

**Don't Just Share. Verify.**

VerifyVote AI is an AI-assisted election information verification platform. It allows users to submit election-related claims, cross-references them with existing fact-check databases, analyzes them using Google's Gemini AI, and presents a transparent report for human review.

> 🔗 **Live Demo:** [Add your Vercel link here once deployed]
> 
> ⚠️ **Disclaimer:** This is a demonstration project. AI assessments are preliminary and must be reviewed by a human before being treated as verified. Not affiliated with any election authority.

---

## ✨ Features

- **Multi-format Claim Submission:** Submit text claims or news URLs.
- **AI-Powered Analysis:** Utilizes **Google Gemini AI** (`gemini-3.8-flash`) to extract core claims, analyze context, and generate a preliminary assessment (Supported, Contradicted, Misleading, Insufficient, or Conflicting).
- **Fact-Check Integration:** Queries the **Google Fact Check Tools API** to find existing ratings and articles from trusted publishers (e.g., Alt News, PolitiFact).
- **Smart Fallback Mechanism:** If the AI API fails (e.g., high demand or rate limits) or times out, the system gracefully falls back to fact-check database results or smart contextual mock data, ensuring the app never crashes.
- **Human Review Workflow:** A dedicated `/admin` dashboard allows authorized reviewers to inspect AI evidence, add notes, and record a final human decision (Verified, False, Misleading, Inconclusive, Needs more evidence).
- **User Dashboard:** Users can track the status of their submitted claims.
- **Modern UI/UX:** Fully responsive, editorial-style design with deep navy, white, slate, and teal accents. Includes Dark/Light mode.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Lucide React (Icons)
- **Backend:** Next.js Route Handlers (Node.js)
- **Database:** MongoDB (via Mongoose)
- **AI Integration:** Google Gemini API (`@google/genai` SDK)
- **Fact-Checking:** Google Fact Check Tools API
- **Form Validation:** React Hook Form + Zod

---

## 🏗️ Architecture & Workflow

1. **Submit:** User submits a claim via the `/submit` page.
2. **Fact-Check Search:** The backend queries the Google Fact Check API for existing claims matching the text.
3. **AI Analysis:** The backend sends the claim + fact-check context to Google Gemini AI, requesting a strict JSON response.
4. **Database Save:** The claim, AI assessment, reasoning, and fact-check sources are saved to MongoDB.
5. **Human Review:** A reviewer accesses `/admin`, reviews the AI's work, and sets the final `humanStatus`.
6. **Public Report:** The final transparent report is available at `/results/[id]`.

---
## 👨‍💻 Author

**Naresh Jena**
- GitHub: [@Nareshjena2005](https://github.com/Nareshjena2005)

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Nareshjena2005/verifyvote-ai.git
cd verifyvote-ai