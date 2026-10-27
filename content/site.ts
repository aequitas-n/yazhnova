export const site = {
  name: "YAZHNOVA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yazhnova.in",
  email: "hello@yazhnova.in",
  title: "Yazhnova — Software, engineered to think.",
  description:
    "An independent software engineering studio. Websites, web apps, SaaS products and agentic AI, thoughtfully engineered end to end.",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Engage", href: "/#engage" },
  ],
  actions: {
    start: "Start a project",
    work: "Explore our work",
    talk: "Let's talk",
    contact: "Contact",
    menu: "Open navigation",
    close: "Close",
    back: "Back to home",
    skip: "Skip to content",
    next: "Next project",
    previous: "Previous project",
    details: "Project details",
    top: "Back to top",
  },
  intro: {
    title: "Yazhnova introduction",
    skip: "Skip intro",
    note: "INDEPENDENT THINKING. TAKING SHAPE.",
  },
  hero: {
    label: "INDEPENDENT MINDS. CONSIDERED SOFTWARE.",
    lines: ["Software,", "engineered"],
    serif: "to think.",
    description:
      "Web, SaaS and agentic AI. We turn ambitious ideas into software that moves your business forward.",
    index: "01—∞",
    side: "HUMAN INGENUITY / ENGINEERING PRECISION",
    note: "Good work starts with a conversation.",
    baseline: ["STRATEGY → DESIGN → ENGINEERING", "BUILT WITH INTENT. BUILT FOR WHAT'S NEXT."],
    imageAlt: "Hands reaching toward each other, rendered with the original dither-reveal shader",
  },
  manifesto: {
    number: "01",
    label: "THE WAY WE THINK",
    title: "THE YAZHNOVA DISPATCH",
    brush: "We build\nwhat's next.",
    heading: "Thought before code.",
    description:
      "Every worthwhile product begins with a better question. We bring design, engineering and practical intelligence into the same conversation — and stay curious until the right answer takes shape.",
    caption: "A POINT OF VIEW, PUT INTO PRACTICE.",
    accessible:
      "The Yazhnova Dispatch. We build what's next. Thoughtful design and purposeful engineering, from idea to impact.",
  },
  services: {
    number: "02",
    label: "OUR PRACTICE",
    title: "Good ideas deserve",
    serif: "great engineering.",
    description:
      "One studio. The full picture. We connect the interface people use with the systems that make it possible.",
    cards: [
      {
        number: "01",
        title: "Web development",
        tag: "THE DIGITAL FRONT DOOR",
        description:
          "Websites and web applications built to feel intuitive, load quickly and work beautifully at every size.",
        tags: ["Websites & web apps", "Commerce", "Custom platforms"],
        visual: "pixels" as const,
        service: "Website or web application",
      },
      {
        number: "02",
        title: "SaaS products",
        tag: "FROM FIRST USER TO WHAT'S NEXT",
        description:
          "From a focused MVP to a platform ready to grow. We build the product, the foundations and the room for your next chapter.",
        tags: ["MVP to scale", "Product engineering", "Multi-tenant systems"],
        visual: "liquid" as const,
        service: "SaaS product",
      },
      {
        number: "03",
        title: "Agentic AI",
        tag: "INTELLIGENCE WITH FOLLOW-THROUGH",
        description:
          "Systems that understand context, connect your tools and take useful action. Purpose-built around the work you actually do.",
        tags: ["AI agents & RAG", "Workflow automation", "Tool integrations"],
        visual: "glossy" as const,
        service: "Agentic AI system",
      },
    ],
    secondary: ["Mobile applications", "Cloud & DevOps", "UI/UX design", "Integrations & APIs"],
    more: "AND THE PIECES THAT CONNECT IT ALL",
  },
  agents: {
    number: "03",
    label: "PRACTICAL INTELLIGENCE",
    title: "Less busywork.",
    serif: "More possibility.",
    description:
      "An agent should do more than give you another answer to act on. We build systems that reason, use your tools and carry the work forward — with people in control.",
    features: [
      "Grounded in your business context",
      "Connected to the tools you use",
      "Human approval where it matters",
    ],
    visualAlt: "The original glassbound half-glass sphere moving across a tiled surface",
    visualLabel: "Y / AGENT CORE",
    visualAction: "REASON · ACT · LEARN",
    demo: {
      label: "WORKFLOW 001 / ILLUSTRATIVE DEMO",
      request: "Qualify this new lead and find a time to meet.",
      messages: [
        { text: "Qualify this new lead and find a time to meet.", sender: "them" as const },
        {
          text: "The brief fits a SaaS build. I have prepared the requirements and budget summary.",
          sender: "me" as const,
        },
        {
          text: "A discovery meeting is drafted. Review the summary before I send the invitation.",
          sender: "me" as const,
        },
      ],
      steps: [
        { label: "Understand", detail: "Read the enquiry and retrieve CRM context." },
        { label: "Qualify", detail: "Check the project, requirements and budget." },
        { label: "Act", detail: "Prepare a discovery meeting for approval." },
      ],
      status: "READY FOR HUMAN REVIEW",
      footnote: "A demonstration of an agent workflow. No CRM or calendar is connected.",
      replay: "Replay workflow",
    },
  },
  process: {
    number: "04",
    label: "HOW WE WORK",
    title: "A clear process.",
    serif: "A shared direction.",
    description: "Close collaboration, visible progress and the right questions at the right time.",
    steps: [
      {
        number: "01",
        title: "Discover",
        detail: "Understand the problem before choosing the solution.",
        output: "GOALS / SCOPE / ROADMAP",
      },
      {
        number: "02",
        title: "Design",
        detail: "Make the idea tangible. Test the experience. Refine the details.",
        output: "STRUCTURE / PROTOTYPES / SYSTEM",
      },
      {
        number: "03",
        title: "Build",
        detail: "Engineer in focused iterations, with room for your feedback.",
        output: "CODE / COLLABORATION / QUALITY",
      },
      {
        number: "04",
        title: "Ship & Scale",
        detail: "Launch with care, learn from real use and keep improving.",
        output: "RELEASE / MEASURE / EVOLVE",
      },
    ],
  },
  stack: {
    label: "THE RIGHT TOOL FOR THE JOB.",
    note: "Modern foundations. Thoughtful choices.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Google Cloud",
      "OpenAI",
      "LangChain",
      "Docker",
      "Kubernetes",
    ],
  },
  work: {
    number: "05",
    label: "IDEAS, MADE TANGIBLE",
    title: "A glimpse of",
    serif: "what's possible.",
    description: "Concept explorations of the kinds of challenges we love to solve.",
    notice: "CONCEPT WORK / TODO: replace with approved client case studies.",
    concept: "CONCEPT EXPLORATION",
    overview: "THE OPPORTUNITY",
    approach: "OUR APPROACH",
    projects: [
      {
        name: "Clarity",
        preview: "/work/clarity.png",
        previewAlt:
          "Clarity concept interface: a project workspace with focus, progress and next steps",
        category: "SAAS / PRODUCT ENGINEERING",
        headline: "Less noise.\nMore momentum.",
        description:
          "A focused workspace that connects projects, priorities and the people behind them.",
        opportunity:
          "Growing teams lose context between scattered tools. Clarity explores a calmer place to see the work that matters.",
        approach:
          "A shared project view, clear ownership and purposeful reporting bring the daily workflow into focus.",
        tags: ["Product strategy", "UI/UX", "Full-stack engineering"],
        mock: {
          name: "clarity",
          title: "A clearer picture.",
          label: "WORKSPACE / OVERVIEW",
          columns: ["In focus", "In progress", "Up next"],
          tasks: [
            "Define the next release",
            "Review the onboarding flow",
            "Connect the customer platform",
          ],
          footer: "Your team. Moving together.",
        },
      },
      {
        name: "Relay",
        preview: "/work/relay.png",
        previewAlt:
          "Relay concept interface: a transparent agent workflow from understanding to action",
        category: "AGENTIC AI / AUTOMATION",
        headline: "The handoff,\nhandled.",
        description:
          "An agent operations console that makes every decision, action and approval visible.",
        opportunity:
          "Repetitive handoffs consume the attention a team needs for more valuable work. Relay explores a transparent way to delegate them.",
        approach:
          "Connected tools, clear execution history and deliberate human checkpoints give people control over automated work.",
        tags: ["Agent orchestration", "Integrations", "Human oversight"],
        mock: {
          name: "relay",
          title: "From trigger to done.",
          label: "WORKFLOW / LEAD QUALIFICATION",
          columns: ["Understand", "Reason", "Act"],
          tasks: ["Read the new enquiry", "Retrieve company context", "Prepare the next action"],
          footer: "Visible decisions. Human control.",
        },
      },
      {
        name: "Forma",
        preview: "/work/forma.png",
        previewAlt:
          "Forma concept interface: an editorial storefront organized by form, material and meaning",
        category: "WEB EXPERIENCE / COMMERCE",
        headline: "A considered\nfirst impression.",
        description:
          "An editorial digital storefront that gives exceptional products room to speak.",
        opportunity:
          "Thoughtful products deserve an equally considered online experience. Forma explores the connection between brand, content and commerce.",
        approach:
          "A strong visual hierarchy, intuitive discovery and an uncomplicated path to purchase make the experience feel natural.",
        tags: ["Brand experience", "Commerce", "Performance"],
        mock: {
          name: "FORMA",
          title: "Space for a different perspective.",
          label: "COLLECTION / VOLUME 01",
          columns: ["Form", "Material", "Meaning"],
          tasks: ["The everyday collection", "Objects with intention", "A quieter kind of design"],
          footer: "Good design makes room.",
        },
      },
    ],
  },
  engage: {
    number: "06",
    label: "WAYS TO WORK TOGETHER",
    title: "The right partnership",
    serif: "makes a difference.",
    description: "A clear destination or an evolving ambition. We'll shape the team around it.",
    models: [
      {
        number: "01",
        name: "Fixed-scope project",
        fit: "A CLEAR BRIEF. A FOCUSED DELIVERY.",
        description: "A defined project, thoughtfully taken from first conversation to launch.",
        features: [
          "Agreed scope and milestones",
          "End-to-end design and engineering",
          "A dedicated point of contact",
          "A transparent delivery plan",
        ],
        featured: false,
      },
      {
        number: "02",
        name: "Dedicated team",
        fit: "YOUR TEAM, EXTENDED.",
        description: "An embedded engineering partner that shares your context and keeps momentum.",
        features: [
          "Engineers integrated with your team",
          "Flexible capacity as you grow",
          "Direct, everyday collaboration",
          "Long-term product understanding",
        ],
        featured: true,
      },
      {
        number: "03",
        name: "Monthly retainer",
        fit: "CONTINUOUS FORWARD MOTION.",
        description: "The right expertise close at hand for everything that comes after launch.",
        features: [
          "Ongoing product improvements",
          "Maintenance and support",
          "A prioritized monthly roadmap",
          "A predictable working rhythm",
        ],
        featured: false,
      },
    ],
    assurance: "Clear communication. Thoughtful engineering. Ownership that stays with you.",
  },
  testimonials: {
    number: "07",
    label: "PARTNERSHIP NOTES",
    title: "Built together.",
    serif: "Built on trust.",
    notice: "SAMPLE QUOTES / TODO: approved client stories and attribution to follow.",
    items: [
      {
        quote:
          "They understood the problem before jumping to the solution. That made all the difference.",
        attribution: "Sample client quote — pending approval",
      },
      {
        quote:
          "A thoughtful partner from the first conversation to the details of the final release.",
        attribution: "Sample client quote — pending approval",
      },
    ],
  },
  faq: {
    number: "08",
    label: "A LITTLE MORE CLARITY",
    title: "Good questions.",
    link: "Something else on your mind?",
    items: [
      {
        question: "How long does a typical project take?",
        answer:
          "A focused website may take a few weeks; a SaaS product or AI system usually needs a phased roadmap. We define a realistic timeline and milestones after understanding the scope, before the work begins.",
      },
      {
        question: "How do you price a project?",
        answer:
          "We consider the scope, team and engagement model, then prepare a clear proposal. If you have a budget in mind, we can discuss a phased approach that prioritizes what matters most.",
      },
      {
        question: "Who owns the code and intellectual property?",
        answer:
          "Ownership is defined in your project agreement. Our standard approach transfers custom code and deliverables after agreed payments are complete. Third-party tools and open-source packages retain their own licenses.",
      },
      {
        question: "How do you choose the technology?",
        answer:
          "We start with your goals, existing systems, team and growth plans. We explain the practical tradeoffs and recommend tools that fit, so every important technical choice is a shared decision.",
      },
      {
        question: "Do you provide support after launch?",
        answer:
          "Yes. We can agree an ongoing support plan or monthly retainer for maintenance and improvements. Coverage and response expectations are defined in the proposal.",
      },
      {
        question: "Can we sign an NDA before discussing our idea?",
        answer:
          "Absolutely. We're happy to review a mutual NDA before you share sensitive project details. Mention it when you get in touch and we'll take it from there.",
      },
    ],
  },
  cta: {
    label: "THE NEXT CHAPTER STARTS WITH A CONVERSATION.",
    title: "Launch",
    serif: "what's next.",
    description: "Bring the idea. We'll bring the thinking, the craft and the code.",
    action: "Let's build something",
    alt: "The original EmberHusk fractured 3D object, recolored to matte ink with warm amber seams",
  },
  footer: {
    label: "GOOD THINGS HAPPEN WHEN WE CONNECT.",
    title: "Have something",
    serif: "in mind?",
    explore: "EXPLORE",
    expertise: "OUR PRACTICE",
    connect: "SAY HELLO",
    note: "Independent thinking. End-to-end engineering.",
    copyright: "© 2026 Yazhnova. All rights reserved.",
    baseline: "SOFTWARE. WITH INTENT.",
    capabilities: ["Web development", "SaaS products", "Agentic AI", "Design & engineering"],
  },
  contact: {
    title: "Let's make",
    serif: "it happen.",
    label: "A NEW CHAPTER",
    description:
      "A bold idea, a complex challenge, or a question about what's possible. We'd love to hear it.",
    emailLabel: "PREFER A DIRECT CONVERSATION?",
    nda: "Your idea stays yours. Happy to start with an NDA.",
    formTitle: "Tell us what you're thinking.",
    formNote: "A little context helps us ask better questions.",
    submit: "Send your enquiry",
    submitting: "Sending…",
    privacy: "We'll use these details only to respond to your enquiry.",
    successTitle: "A good beginning.",
    successMessage:
      "Your message has reached our team. We'll be in touch to explore what comes next.",
    another: "Send another enquiry",
    errorTitle: "Your enquiry hasn't been sent.",
    error: "Please try again, or email hello@yazhnova.in directly.",
    unconfigured:
      "The form is being connected. Please email hello@yazhnova.in so our team can help.",
    invalid: "Please check the fields and try again.",
    malformed: "We couldn't read the request. Please try again.",
    tooLarge: "Please shorten your message and try again.",
    origin: "Please refresh the page and try again.",
    rateLimit: "Please wait before sending another enquiry.",
    fields: {
      name: "Your name",
      email: "Work email",
      company: "Company",
      budget: "Budget range",
      service: "How can we help?",
      message: "About your project",
      optional: "optional",
      website: "Leave this field empty",
    },
    placeholders: {
      name: "Alex Morgan",
      email: "alex@company.com",
      company: "Your company",
      budget: "Select a range",
      service: "Select a service",
      message:
        "What would you like to build? Tell us about the goals, timing and anything we should know.",
    },
    budgets: [
      "Under ₹2 lakh",
      "₹2–5 lakh",
      "₹5–15 lakh",
      "₹15–30 lakh",
      "₹30 lakh+",
      "Let's discuss",
    ],
    services: [
      "Website or web application",
      "SaaS product",
      "Agentic AI system",
      "Mobile application",
      "Design & engineering",
      "Something else",
    ],
    validation: {
      name: "Please enter your name (2–80 characters).",
      email: "Please enter a valid email address.",
      company: "Please keep this under 120 characters.",
      budget: "Please select a budget range.",
      service: "Please select a service.",
      message: "Please tell us a little more (20–5,000 characters).",
    },
  },
  error: {
    title: "A brief interruption.",
    description: "Something went wrong loading the page. Please try again.",
    action: "Try again",
  },
  notFound: {
    label: "404 / OFF THE MAP",
    title: "A different direction.",
    description: "That page isn't here. Let's find your way back.",
  },
};
