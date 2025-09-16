const EMAIL_API_URL_PROD = "https://api.aiforclin.com/contact";
const EMAIL_API_URL_DEV = "http://localhost:10000/contact";
const EMAIL_API_URL = [
  "localhost",
  "127.0.0.1",
  "127.0.0.0",
  "0.0.0.0",
].includes(window.location.hostname)
  ? EMAIL_API_URL_DEV
  : EMAIL_API_URL_PROD;

function configureBookingForm(serviceType) {
  if (serviceType === "consulting") {
    document.getElementById("booking-modal-cliniko-1hr").style.display =
      "block";
    document.getElementById("form").style.display = "none";
  } else {
    document.getElementById("form").style.display = "block";
    document.getElementById("booking-modal-cliniko-1hr").style.display = "none";
  }

  if (serviceType && serviceType.includes("company")) {
    document.getElementById("group-size-group").style.display = "none";
    document.getElementById("budget-group").style.display = "none";
    document.getElementById("location-group").style.display = "none";
    document.getElementById("venue-group").style.display = "none";
  }
}

let serviceTypeSelector = null;
function openBookingForm(serviceType) {
  document.getElementById("booking-modal-container").style.display = "flex";
  serviceTypeSelector = document.getElementById("selected-service");
  serviceTypeSelector.value = serviceType;
  if (serviceType) {
    serviceTypeSelector.disabled = true;
    serviceTypeSelector.classList.add("hide-select-arrow");
  }
  serviceTypeSelector.addEventListener("change", () => { configureBookingForm(serviceTypeSelector.value); });

  configureBookingForm(serviceType);
  document.body.style.overflow = "hidden";
  // Remove any previous status message
  const prevStatus = document.getElementById("email-status");
  if (prevStatus) prevStatus.textContent = "";
  // Reset form
  currentStep = 1;
  showStep(1);
}

function closeBookingForm() {
  document.getElementById("booking-modal-container").style.display = "none";
  serviceTypeSelector.value = "";
  serviceTypeSelector.removeEventListener("change", () => { configureBookingForm(serviceTypeSelector.value); });
  serviceTypeSelector = null;
  document.body.style.overflow = "auto";
}

function showStep(step) {
  document
    .querySelectorAll(".form-step")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("step-" + step).classList.add("active");
  currentStep = step;
}

function nextStep() {
  if (currentStep < 4) {
    // Basic validation
    if (currentStep === 1) {
      const selectedService = document.getElementById("selected-service").value; 
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value; 
      const phone = document.getElementById("phone").value;
      if (!selectedService) {
        alert("Please select a service.");
        return;
      } else if (!name) {
        alert("Please fill in Name field.");
        return;
      } else if (!email) {
        alert("Please fill in Email field.");
        return;
      } else if (email.indexOf("@") === -1) {
        alert("Please enter a valid Email address.");
        return;
      } else if (!phone) {
        alert("Please fill in Phone field.");
        return;
      }
    }

    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

function showSendStatus(type, message) {
  const status = document.getElementById("email-status");
  if (!status) return;
  status.textContent = message;
  status.style.color = type === "success" ? "#48bb78" : "#f56565";
}

async function submitForm(token, formData, originalBtnText) {
  formData.append("cf-turnstile-response", token);
  formData.append("email_address", document.getElementById("email").value);
  formData.append("name", document.getElementById("name").value);

  try {
    const res = await fetch(EMAIL_API_URL, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(errorText || `Request failed (${res.status})`);
    }

    showSendStatus(
      "success",
      "Thank you! Your booking request was submitted successfully. We'll be in touch shortly.",
    );
    document.getElementById("form").reset();
  } catch (err) {
    console.error("Error: ", err);
    showSendStatus(
      "error",
      "Sorry, there was a problem submitting your request. Please try again later or email david@psychologysquared.com.au",
    );
  } finally {
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText || "Submit Request";
    }
  }
}

function renderTurnstile(formData, originalBtnText) {
  turnstile.remove("#cf-turnstile");
  turnstile.render("#cf-turnstile", {
    sitekey: "0x4AAAAAABx7osAcNS_e9_7w",
    size: "normal",
    theme: "auto",
    callback: async function (token) {
      await submitForm(token, formData, originalBtnText);
    },
  });
}

function setupFormSubmission() {
  const honeypotField = document.getElementById("website");
  if (honeypotField.value) {
    showSendStatus(
      "success",
      "Thank you! Your message was submitted successfully. We'll be in touch shortly.",
    );
    return;
  }
  const submitBtn = document.getElementById("submit-btn");
  let originalBtnText;
  if (submitBtn) {
    submitBtn.disabled = true;
    originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
  }
  return originalBtnText;
}

async function submitFormContact() {
  const originalBtnText = setupFormSubmission();
  const formData = new FormData();
  formData.append(
    "message",
    JSON.stringify({
      message: document.getElementById("message").value,
      organization: document.getElementById("organization").value,
    }),
  );
  renderTurnstile(formData, originalBtnText);
}

async function submitFormBooking() {
  const originalBtnText = setupFormSubmission();
  const formData = new FormData();

  // Build message payload
  formData.append(
    "message",
    JSON.stringify({
      // Core
      service: document.getElementById("selected-service").value,
      name: document.getElementById("name")?.value || "",
      email: document.getElementById("email")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      contactMethod: document.getElementById("contact-method")?.value || "",

      // Organisation
      organization: document.getElementById("organization")?.value || "",
      role: document.getElementById("role")?.value || "",
      orgWebsite: document.getElementById("org-website")?.value || "",
      industry: document.getElementById("industry")?.value || "",
      groupSize: document.getElementById("group-size")?.value || "",

      // Event details
      preferredDate: document.getElementById("preferred-date")?.value || "",
      preferredTime: document.getElementById("preferred-time")?.value || "",
      duration: document.getElementById("duration")?.value || "",
      budget: document.getElementById("budget")?.value || "",
      location: document.getElementById("location")?.value || "",
      venueName: document.getElementById("venue-name")?.value || "",

      // Additional info
      specificTopics: document.getElementById("specific-topics")?.value || "",
      objectives: document.getElementById("objectives")?.value || "",
      additionalInfo: document.getElementById("additional-info")?.value || "",
      howHeard: document.getElementById("how-heard")?.value || "",
    }),
  );

  renderTurnstile(formData, originalBtnText);
}

// Close modal when clicking outside (guard if element not present)
const bookingModalEl = document.getElementById("booking-modal-container");
if (bookingModalEl) {
  bookingModalEl.addEventListener("click", function (e) {
    if (e.target === this) {
      closeBookingForm();
    }
  });
}

// Setup mobile hamburger menu
const setupMobileMenu = () => {
  const menuButton = document.getElementById("mobile-menu-button");
  const primaryNav = document.getElementById("primary-nav");
  if (!menuButton || !primaryNav) return;
  // Toggle on button click
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    primaryNav.hidden = expanded;
  });

  // Close menu on link click (mobile only)
  primaryNav.querySelectorAll("a.nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        primaryNav.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });
};

let currentStep = 1;
let selectedService = "";
let selectedType = "";

function toggleSection(sectionId) {
  const content = document.getElementById(sectionId + "-content");
  const icon = document.getElementById(sectionId + "-icon");

  if (content.classList.contains("expanded")) {
    content.classList.remove("expanded");
    icon.textContent = "▼";
  } else {
    // Close all other sections
    document.querySelectorAll(".service-content").forEach((section) => {
      section.classList.remove("expanded");
    });
    document.querySelectorAll(".expand-icon").forEach((icon) => {
      icon.textContent = "▼";
    });

    // Open selected section
    content.classList.add("expanded");
    icon.textContent = "▲";
  }
}

function scrollToSection(target) {
  const headerOffset = 100;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition =
    elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      let hash = this.hash;
      const target = document.querySelector(hash);
      if (target) {
        scrollToSection(target);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupSmoothScrolling();
  if (window.location.href.includes("index.html/#services-section")) {
    const servicesSection = document.getElementById("services");
    scrollToSection(servicesSection);
  }  
});

const downloadPDF = () => {
  const printWindow = window.open("", "_blank");
  const content = `<!DOCTYPE html><html><head><title>AI Ethical Standards - Psychology Squared</title><style>body{font-family:Arial,sans-serif;margin:40px;line-height:1.6;}h1{color:#1e40af;border-bottom:2px solid #1e40af;padding-bottom:10px;}h2{color:#1e40af;margin-top:30px;}h3{color:#374151;margin-top:20px;}.header{text-align:center;margin-bottom:40px;}.content{margin-bottom:20px;}.standard{margin-bottom:30px;page-break-inside:avoid;}.contact{margin-top:40px;padding-top:20px;border-top:1px solid #ccc;}ul{margin:10px 0;}li{margin:5px 0;}</style></head><body><div class='header'><h1>AI Ethical Standards</h1><p><strong>Last updated on 30 November 2023</strong></p><p>Psychology Squared Pty Ltd<br/>ABN 16 638 041 719</p></div><h2>AI Ethical Standards for the Facebook page \"AI and Australian Psychology Internship and Early Career\" or AI related products and services by Psychology Squared</h2><p><strong>Here's a list of ethical standards for psychologists and psychologists in training regarding the use of AI:</strong></p>${aiStandards.map((standard) => `<div class='standard'><h3>${standard.title}</h3>${standard.subtitle ? `<p><em>${standard.subtitle}</em></p>` : ""}${standard.content.length > 0 ? `<ul>${standard.content.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}</div>`).join("")}<div class='contact'><p><strong>Attribution:</strong> Psychology Squared Pty Ltd</p><p><strong>Contact:</strong> hello@psychologysquared.com.au</p></div></body></html>`;
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};

const aiStandards = [
  {
    id: "accountability",
    title: "1. Accountability",
    content: [
      "Responsibility is taken by the user for any decisions made based on, or as a result of an AI-generated product.",
      "The user ensures proper oversight of AI-generated products to avoid any potential harm or liabilities.",
      "AI is not a suitable substitute for a trained professional service that psychologists provide. All intervention models/strategies should all be based on accepted industry standards to ensure quality of the services provided as per the relevant APS/AHPRA ethical guidelines and standards as appropriate your relevant profession.",
      "Due to the risk of plagiarism, it is encouraged that user seek the sources of information and use plagiarism checkers where appropriate. It may also be required to recognise and reference your sources of information when using AI for research or information gathering.",
    ],
  },
  {
    id: "inaccuracy",
    title: "2. Potential inaccuracy of AI Job Produced",
    content: [
      "Recognise that AI may produce work which is low quality or whereby the quality is unclear.",
      "AI-generated content requires repeated human review and validation.",
      "Ensure that you update and educate yourself about the capabilities and limitations of AI tools.",
      "Recognise that AI tools are still being developed and evaluated, and as such their use in professional settings is still considered highly experimental. It may make mistakes, at times convincingly.",
      "Use AI tools only when they can be justified and the risks are understood. Ensure that ethical guidelines for AI usage are followed at all times.",
    ],
  },
  {
    id: "prohibited",
    title: "3. Prohibited Uses",
    content: [
      "Avoid using AI for academic tasks that would misrepresent one's own capabilities or be considered 'excessive' (e.g. having the AI complete mandated psychology internship tasks fully for you when the intention is that you do these yourself).",
      "Do not use AI tools to complete assignments, tests, or other evaluative measures in a way that would violate standards of academic integrity. If you are studying, you should ensure that you have checked your institution's policy around the use of AI prior to use",
      "Recognise and analyse when there is significance in AI's role in achieving the overall objectives in particular tasks which may benefit from human involvement.",
    ],
  },
  {
    id: "bias",
    title: "4. Data Bias",
    content: [
      "Be aware of the potential biases in AI algorithms and datasets. Recognise the potential for AI to make biased and stereotyped responses based on flawed, limited or incomplete data.",
      "Regularly review, fact check and update AI tools where possible to minimise biases",
    ],
  },
  {
    id: "confidentiality",
    title: "5. Confidentiality",
    content: [
      "Ensure that any personal or sensitive data (e.g. names, date of birth, addresses, names of family members) used in conjunction with AI tools is deidentified and if necessary kept confidential and secure.",
      "Do not share confidential information without proper consent (ideally written where possible)",
      "You acknowledge that there may be legal, ethical and moral risks with AI if you choose to use any confidential client information even with client consent.",
      "It is encouraged that data be deleted from AI systems at the earliest reasonable opportunity.",
    ],
  },
  {
    id: "transparency",
    title: "6. Transparency",
    content: [
      "Ideally before any service begins and with consent, seek to be transparent to the reader, client, peer or stakeholder about the use of AI in research, practice, and professional decision-making.",
    ],
  },
  {
    id: "education",
    title: "7. Continued Education",
    content: [
      "As AI technology continues to evolve, it is important for psychologists, provisional psychologists and psychology students to stay informed about new developments and best practices in the field.",
      "Engage in continued education and training to learn about AI.",
    ],
  },
  {
    id: "communication",
    title: "8. Organisational communication",
    content: [
      "Ensure that you receive permission to use AI by your management and that its use is consistent with your organsational policy.",
    ],
  },
  {
    id: "copyright",
    title: "9. Copyright",
    content: [
      "The user should not enter resources that are copyrighted into AI",
    ],
  },
  {
    id: "welfare",
    title:
      "10. Use of AI in ways that prioritise client welfare, consent and privacy",
    content: [],
  },
  {
    id: "consistency",
    title:
      "11. Consistent AI use in line with the AI program's existing policies",
    content: [],
  },
  {
    id: "australian-principles",
    title:
      "12. Your use of AI will be consistent with the 8 voluntary Australian AI Ethics principles",
    subtitle:
      "(as of 30 November 2023) by the Department of Industry, Science and Resources:",
    content: [
      "a) Human, societal and environmental wellbeing; AI systems should benefit individuals, society and the environment.",
      "b) Human-centred values; AI systems should respect human rights, diversity, and the autonomy of individuals.",
      "c) Fairness; In that AI systems should be inclusive and accessible, and should not involve or result in unfair discrimination against individuals, communities or groups.",
      "d) Privacy protection and security; AI systems should respect and uphold privacy rights and data protection, and ensure the security of data.",
      "e) Reliability and safety; In that AI systems should reliably operate in accordance with their intended purpose.",
      "f) Transparency and explainability; There should be transparency and responsible disclosure so people can understand when they are being significantly impacted by AI, and can find out when an AI system is engaging with them.",
      "g) Contestability; When an AI system significantly impacts a person, community, group or environment, there should be a timely process to allow people to challenge the use or outcomes of the AI system.",
      "h) Accountability; People responsible for the different phases of the AI system lifecycle should be identifiable and accountable for the outcomes of the AI systems, and human oversight of AI systems should be enabled.",
    ],
  },
  {
    id: "competencies",
    title:
      "13. Your AI use as a psychologist should be compliant with the professional competencies",
    subtitle: "(i.e. you agree to use AI ethically in these contexts)",
    content: [
      "Competency 1: Applying scientific knowledge of psychology to inform safe and effective practice;",
      "Competency 2: Practicing ethically and professionally;",
      "Competency 3: Exercising professional reflexivity, deliberate practice and self-care;",
      "Competency 4: Conducting psychological assessments",
      "Competency 5: Conducting psychological interventions;",
      "Competency 6: Communicating and relating to others effectively and appropriately;",
      "Competency 7: Demonstrating a health equity and human rights approach when working with Aboriginal and Torres Strait Islander Peoples, families and communities; and",
      "Competency 8: Demonstrating a health equity and human rights approach when working with people from diverse groups;",
    ],
  },
  {
    id: "product-disclaimer",
    title: "14. Product Disclaimer",
    content: [
      "If you purchase any Psychology Squared Product which utilises AI, you recognise that the product results may vary, be unpredictable and largely out of the control of Psychology Squared. Psychology Squared AI products may be considered at present to be experimental in nature and at all times you should check the quality for yourself. The quality of AI responses may not be assured, however the user may be encouraged to vary AI prompts strategically to get the desired result.",
    ],
  },
  {
    id: "staff-disclaimer",
    title: "15. Staff Recommendations Disclaimer",
    content: [
      "You understand that posts and recommendations by Psychology Squared staff reviewing AI products do not represent any endorsement of the legality or ethics of the use of this AI.",
    ],
  },
  {
    id: "ai-usage",
    title: "16. AI Usage in Psychology Squared Resources",
    content: [
      "AI including ChatGPT, Jasper and others may be used in the production of Psychology Squared Resources",
    ],
  },
];
