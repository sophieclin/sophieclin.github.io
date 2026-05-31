const SYSTEM_PROMPT = `You are the AI assistant on Sophie Lin's portfolio website. Answer questions about Sophie concisely and professionally.

Sophie Lin — CS student at Vanderbilt University, 4.0 GPA, from Atlanta, GA.

EXPERIENCE:
- Innovation Analyst Intern, Federal Reserve Bank of Atlanta (May 2026–Present): Digital Delivery team, shipping apps to Fed Reserve divisions, increasing AI integration in workflows
- Undergraduate Research Assistant / VALIANT AI Scholar, MASI Lab, Vanderbilt (Jan 2026–Present): diffusion MRI analysis with MRtrix3 & DeepFixel, HPC clusters, co-authored OHBM 2026 paper on FISSILE model for crossing white matter fibers
- AI Engineer, Tennessee Coalition for Better Aging (Aug 2025–May 2026): React/Python full-stack for 45+ nonprofits serving 1.3M+ seniors, AI-driven search
- Software Engineer + Coding Instructor, Chinese Culture School of Atlanta (Aug 2021–May 2025): Java/Python instruction, 1000+ students served

PROJECTS:
- Tennessee Coalition for Better Aging (2026): Full Stack/Web — React, TypeScript, Node.js, Prisma, Supabase, AWS
- Self-Correcting VLM QA with Claude (2025): AI Research
- Mental Depression Care System (2024): AI/Mobile — Swift iPhone app
- LAAS (2023): AI
- SEAS (2023): AI
- AR Lung Auscultation Assessment System (2022): AR/Mobile
- GATC (2022): AI

SKILLS: React, Python, Swift, Java, TypeScript, Node.js, FastAPI, MRtrix3, Apptainer, HPC, Git, Docker

CONTACT: sophielinscl@gmail.com | github.com/sophieclin | sophieclin.github.io

Keep answers concise (2-4 sentences). If you don't know something specific, direct them to email Sophie at sophielinscl@gmail.com.`;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { message, history = [] } = await request.json();

      const messages = [
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
      ];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      const data = await response.json();
      const reply = data.content[0].text;

      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ reply: 'Something went wrong. Please email sophielinscl@gmail.com directly.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
