document.addEventListener("DOMContentLoaded", () => {
    // --- DATA SOURCE ---
    const allItems = [
        {
            id: 1,
            name: "Ecko Health",
            link: { label: "See more", url: "https://www.eckohealth.ai/" },
            appCompliance: true,
            dataStorage: "Australia",
            freeMembership: true,
            freeTrial: "Ongoing for now",
            pmsIntegration:
                "Can use it as a standalone AI-powered, all-inclusive PMS OR use it alongside your existing PMS",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Inclusive Operating System",
                        items: [
                            "The Only Fully Inclusive AI-Driven Operating System – Combines AI therapy, practice management, and patient engagement in one seamless ecosystem.",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "AI-Powered",
                        items: [
                            "Scheduling, billing, workflow automation",
                            "Clinical notes, session summaries, treatment plans, reports, diagnoses",
                            "Patient risk alerts & insights",
                            "Therapy support to patients between sessions to reduce dropout rates and maintain engagement",
                        ],
                    },
                ],
            },
            pricing:
                "Free. Future pricing packages to be determined end 2025/start 2026",
            telehealth: true,
            headphonesCompatible: true,
            mobileCompatible: true,
            multipleNotes:
                "Can use as a standalone AI-powered, all-inclusive PMS OR use it alongside your existing PMS",
            aiTrainableOverTime: true,
            languagesSupported: "Not currently. It will in future development.",
        },
        {
            id: 2,
            name: "PractaLuma",
            link: { label: "See more", url: "https://www.practaluma.com/" },
            appCompliance: true, // Australian Privacy Principles
            dataStorage: "Secure Australian-based servers (with option for enterprise hosting)",
            freeMembership: true,
            freeTrial: "30 days",
            pmsIntegration: "No external PMS integration (Internal PMS available)",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Clinician-Centric Design",
                        items: [
                            "Built by Psychologists for mental health practitioners",
                            "AI-First EHR (coming soon)",
                            "Private Slack channel with engineers & founders",
                            "Reliability promise (98% uptime or your money back)",
                            "Custom healthcare model built in, ensuring notes are clinically aligned and for documentation accuracy",
                        ],
                    },
                    {
                        category: "Advanced Tools & Integrations",
                        items: [
                            "5P case formulation template builder",
                            "Customised treatment plan generator (based on selected approaches, clinician authored)",
                            "Integration with Zoom/Teams/Google Meet via meeting bot for enhanced audio transcription and accuracy",
                            "AI-powered client search",
                            "Ability to create custom forms to send to clients (e.g. intake forms, parent/teacher info forms, coming soon)",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "Session & Documentation",
                        items: [
                            "Session transcription",
                            "Clinical note generation (Therapy initial, progress notes, SOAP, DAP, EMDR, TF-CBT etc.)",
                            "Automated psychometric scoring & classification",
                            "Secure document storage",
                            "Multiple session selection for letter / document generation",
                        ],
                    },
                    {
                        category: "Security & Compliance",
                        items: [
                            "Zero data retention",
                            "Practitioner sets storage settings",
                            "Triple-layered compliance - APP, GDPR, HIPAA (ISO27001 in progress)",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [
                    "$99 AUD / month",
                    "Integrated practice management software included free for users (email support@practaluma.com to switch on)",
                ],
            },
            telehealth: true, // integrates with Zoom, Teams, Google Meet via bot recording
            headphonesCompatible: true, // works with any standard audio input
            mobileCompatible: false, // not specified, assuming no mention
            multipleNotes: true,
            aiTrainableOverTime: true,
            languagesSupported: [
                "No, but this is on our roadmap",
            ],
        },

        {
            id: 3,
            name: "ANTSA",
            link: { label: "See more", url: "https://www.antsa.com.au/" },
            appCompliance: true, // Australian Privacy Principles
            dataStorage: "Australia",
            freeMembership: false,
            freeTrial: "30 days",
            pmsIntegration: false,
            uniqueFeatures: {
                sections: [
                    {
                        category: "AI Scribe Integration",
                        items: [
                            "AI scribe (converts voice to text) and will be exportable to PMS (coming January 2025)",
                        ],
                    },
                    {
                        category: "24/7 AI Therapy",
                        items: [
                            "jAlmee (AI therapy chatbot - extremely popular with clients) is available 24/7.",
                            "Clinicians can observe jAlmee live or during the client's next session.",
                            "ANTSA's AI interventions are supervised by clinicians.",
                            "Practitioner oversight & customisability.",
                            'Continuous client engagement - "therapy takes place between the sessions.',
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "AI Transcription",
                        items: [
                            "AI scribe (no recordings made - converts straight to notes) - Available January 2025",
                            "Can use external audio to transcribe",
                        ],
                    },
                    {
                        category: "Therapy Tools",
                        items: [
                            "World's first overseen AI therapy chatbot (jAlmee)",
                            "Automated homework tasks (fully customisable)",
                            "On-demand evidence-based psychoeducation library",
                            "Journalling activities",
                        ],
                    },
                    {
                        category: "Monitoring & Analytics",
                        items: [
                            "AI algorithms detect client distress levels in real-time",
                            "Mood Tracking (graphed feedback for both clinician & client)",
                            "Real-time data collection & monitoring",
                            "Gamified engagement",
                        ],
                    },
                    {
                        category: "Security & Communication",
                        items: [
                            "Secure client-practitioner communication",
                            "Designed for clinician oversight",
                            "Privacy & data security is our number one priority!",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [
                    "$59 per month for UNLIMITED clients, prompts, transcriptions",
                    "Includes use of FULL platform - AI transcriptions, homework tasks, customisable activities, and continuous engagement support with AI therapist chatbot, jAlmee",
                    "Discounts for clinic owners requiring multiple licences for practitioners",
                    "Details on our website - www.antsa.com.au/pricing-plans",
                ],
            },
            telehealth: true,
            headphonesCompatible: true,
            mobileCompatible: true,
            multipleNotes: true,
            aiTrainableOverTime: true,
            languagesSupported: [
                "Not at this time, but will be adding languages as we go.",
                "Message us at help@ANTSA.com.au for requests at this stage.",
            ],
        },

        {
            id: 4,
            name: "Zanda Health",
            link: {
                label: "See more",
                url: "https://zandahealth.com/?fpr=david67",
            },
            appCompliance: true,
            dataStorage:
                "Australia (For Aus users). Stored according to the practice's location",
            freeMembership: false,
            freeTrial: "14 days",
            pmsIntegration:
                "The tool is built natively within the Zanda practice management system",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Purpose-built",
                        items: [
                            "Purpose-built for psychologists and allied health professionals",
                            "Ability to set custom note output preferences per user",
                            "Seamlessly integrated with the client profile in Zanda - no copying and pasting required",
                            "Free usage of the refine tool to make changes to the note using AI",
                            "Custom retention period for transcript storage",
                            "Usage report to see recording time per user in a specific date range",
                            "Compliant with Australian privacy and security regulation, and ISO 27001 certified",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "Transcription & Notes",
                        items: [
                            "Real-time transcription",
                            "Ability to add typed context notes while transcribing",
                            "Fully customisable note templates",
                            "Per user custom note preferences to control the note formatting, style and more",
                            "Option to refine the note using AI",
                        ],
                    },
                ],
            },
            pricing:
                "Our AI Refine tool is free for all users. Transcription is invoiced based on actual use at $1 +gst per hour (prorata).",
            telehealth: {
                available: true,
                note: "Yes, if you use speaker mode on your device for the audio. We are working with Zoom to provide an option where headphones can be used.",
            },
            headphonesCompatible: true,
            mobileCompatible: true,
            multipleNotes: "Under development",
            aiTrainableOverTime: "This is on our roadmap.",
            languagesSupported: "Currently only available in English.",
        },

        {
            id: 5,
            name: "NovoNote by NovoPsych",
            link: { label: "See more", url: "https://novopsych.com/novonote/" },
            appCompliance: true,
            dataStorage: "Australia",
            freeMembership: true,
            freeTrial: "15 day trial",
            pmsIntegration:
                "Copy and paste into practice management software. Integration with NovoPsych",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Designed for Mental Health",
                        items: [
                            "Specifically designed for mental health practitioners by the team at NovoPsych",
                            "Multi session reports (combine multiple sessions)",
                            "Psychometric integration (reports blend therapy content + psychometrics)",
                            "Large library of report templates",
                            "Customisable templates",
                            "Context editing after the fact (add context later and regenerate)",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "Documentation & Templates",
                        items: [
                            "In Session Transcription",
                            "Document and note generation",
                            "Dictation of notes",
                            "Mental health specific template library",
                            "Custom templates",
                        ],
                    },
                    {
                        category: "Integrations & Platform",
                        items: [
                            "Integration with NovoPsych Psychometrics",
                            "Practice Plans for teams",
                            "Telehealth Support",
                            "Works on computers, phones and tablets",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [

                    "$30, $60, $99, Depending on client load.",
                    "All NovoNote plans include access to NovoPsych Psychometrics",
                ],
            },
            telehealth: true,
            headphonesCompatible: "Not sure",
            mobileCompatible: "Accessible on any device via your web browser (desktop, tablet, mobile)",
            multipleNotes: true,
            aiTrainableOverTime: true,
            languagesSupported: "Primarily English",
        },

        {
            id: 6,
            name: "Bastion GPT",
            link: {
                label: "30 day free trial",
                url: "https://buy.stripe.com/eVa8yH6Akcs35I48wQ",
            },
            appCompliance: true,
            dataStorage: "Australia",
            freeMembership: false,
            freeTrial: "30 days",
            pmsIntegration: "Works with ANY practice management system through copy-paste or document upload-download.",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Advanced Transcription",
                        items: [
                            "Multi-speaker recognition for higher quality documentation",
                            "Generate documentation via voice, written notes, or a combination of both.",
                            "Can match your voice, tone, and style when examples are used",
                            "Reduced content filters for sensitive clinical topics such as violence, abuse or suicidality",
                            "Powered by the latest AI models from OpenAI, Google and Anthropic",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "AI Scribe",
                        items: [
                            "Unlimited sessions, up to 4 hours long",
                            "Record sessions live or upload prerecorded audio",
                            "Record in-person or virtual sessions",
                            "99.9% Uptime Guarantee",
                            "AI assistant with the ease of use of ChatGPT",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [
                    "AUD $30 per user per month for unlimited use of all AI scribe features.",
                    "No per-session costs.",
                    "Australian pricing page:  " + "<a style='text-decoration: underline;' href='https://bastiongpt.com/australia'>https://bastiongpt.com/australia</a>",
                ],
            },
            telehealth: true,
            headphonesCompatible: true,
            mobileCompatible: true,
            multipleNotes: true,
            aiTrainableOverTime: true,
            languagesSupported: [
                "16 languages supported, including specific models for US English and Australian English",
            ],
        },

        {
            id: 7,
            name: "Patient Notes",
            link: {
                label: "10% Discount",
                url: "https://www.patientnotes.app/",
                code: "AIPSYCH2024",
            },
            appCompliance: true,
            dataStorage: "Australia",
            freeMembership: false,
            freeTrial: "14 days",
            pmsIntegration: "Cliniko, Nookal, Halaxy",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Advanced Tools",
                        items: [
                            "Smart dictate",
                            "Multi session reports",
                            "Speech-to-text editing",
                            "Prompt creation tool",
                            "Extensive prompt library",
                            "We now support offline recording with audio upload, as well as an Android offline recording function.",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "Session Management",
                        items: [
                            "Creation of session data from session audio for clinical notes for in rooms or telehealth sessions",
                            "Creation of medical reports and letters using either the captured session data or a manual option to insert one or several sets of clinical notes",
                        ],
                    },
                    {
                        category: "Smart Features",
                        items: [
                            "Smart dictate feature to allow flexible clinical admin tasks such as clinical notes, letter writing, recording phone sessions",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [
                    "Essential Plan: $29 AUD / $19 USD",
                    "Professional Plan: $79 AUD / $49 USD",
                    "Code: AIPSYCH2024 (for affiliate: 10% off)",
                ],
            },
            telehealth: true,
            headphonesCompatible: true,
            mobileCompatible: "Yes, Android and iOS versions.",
            multipleNotes: true,
            aiTrainableOverTime:
                "We have a prompt review tool which we have found better than training.",
            languagesSupported: {
                languages: [
                    "Arabic",
                    "Azerbaijani",
                    "Bosnian",
                    "Bulgarian",
                    "Cantonese",
                    "Catalan",
                    "Chinese (Mandarin, Simplified)",
                    "Croatian",
                    "Czech",
                    "Danish",
                    "Dutch",
                    "English",
                    "English (US)",
                    "English (Australia)",
                    "English (UK)",
                    "Estonian",
                    "Filipino",
                    "Finnish",
                    "French",
                    "Galician",
                    "German",
                    "Greek",
                    "Hindi",
                    "Hungarian",
                    "Indonesian",
                    "Italian",
                    "Japanese",
                    "Korean",
                    "Macedonian",
                    "Malay",
                    "Māori",
                    "Norwegian Bokmål",
                    "Polish",
                    "Portuguese",
                    "Romanian",
                    "Russian",
                    "Slovak",
                    "Spanish",
                    "Swedish",
                    "Thai",
                    "Turkish",
                    "Ukrainian",
                    "Urdu",
                    "Vietnamese",
                ],
            },
        },
        {
            id: 8,
            name: "Heidi Health",
            link: {
                label: "30 day free trial",
                url: "https://scribe.heidihealth.com/?via=psychologysquared",
            },
            appCompliance: true,
            dataStorage: "Australian AWS servers",
            freeMembership: {
                available: true,
                note: "Heidi offer unlimited usage without being limited by the number of actions",
            },
            freeTrial: "30 days",
            pmsIntegration:
                "Yes, Cliniko, Best Practice, Medirecords and many to come. If you would like to know if we are currently building an integration for your PMS please contact Support@heidihealth.com",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Security & Compliance",
                        items: [
                            "Highest level of security (SOC2 and ISO27001)",
                            "Fully regulated in multiple countries",
                        ],
                    },
                    {
                        category: "Medical Specialization",
                        items: [
                            "AI is trained on medical language and built by clinicians, making transcription unmatched",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "Documentation",
                        items: [
                            "Transcription",
                            "Document and note generation",
                            "Custom templates",
                        ],
                    },
                    {
                        category: "Integration & Support",
                        items: [
                            "Ask AI feature",
                            "Practice Management System (PMS) integrations",
                            "Team and enterprise infrastructure",
                            "Full Telehealth Support",
                            "Heidi Health App",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [
                    "Free Tier (Free): Cost - Free. Benefits - Access to world class AI scribe with no cost. Limitations: 10 pro actions a month which can be used on custom templates, document generation or Ask Heidi",
                    "Pro Tier ($99/mo or $799/yr): Cost - $99 per month or $799 upfront for the year. Benefits - Unlimited usage of the Heidi platform! No limits on number of sessions or documents generated (Pro Actions). Limits: Self-Serve system where you must create your own templates or utilise community templates",
                    "Together Tier ($1299/yr per user): Cost - $1299 for the year per user. Benefits: Team features that allow you to share templates across the team, Integration with your PMS, Full Heidi Support where the Medical Knowledge team will create templates for you! Limitations: None at all!",
                ],
            },
            telehealth: true,
            headphonesCompatible: true,
            mobileCompatible: true,
            multipleNotes: false,
            aiTrainableOverTime: false,
            languagesSupported: {
                languages: [
                    "Cantonese",
                    "Czech",
                    "Danish",
                    "Dutch",
                    "Flemish",
                    "French",
                    "German",
                    "Greek",
                    "Hindi",
                    "Indonesian",
                    "Italian",
                    "Mandarin",
                    "Norwegian",
                    "Japanese",
                    "Korean",
                    "Malay",
                    "Polish",
                    "Portuguese",
                    "Russian",
                    "Spanish",
                    "Swedish",
                    "Thai",
                    "Turkish",
                    "Ukrainian",
                    "Vietnamese",
                ],
            },
        },
        {
            id: 9,
            name: "Everbility",
            link: {
                label: "10% Discount",
                url: "https://www.everbility.com/?via=david-lopis",
            },
            appCompliance: true,
            dataStorage: "Australia",
            freeMembership: false,
            freeTrial: "7 days",
            pmsIntegration:
                "Everbility is building integrations with many Australian practice management softwares, reach out to us if you want an integration with yours.",
            uniqueFeatures: {
                sections: [
                    {
                        category: "Long-form capability",
                        items: [
                            "Everbility's ability to write very long reports from as much context as needed",
                            "Find peer reviewed research",
                            "Additional NDIS knowledge",
                            "Upload PDFs (including handwriting)",
                        ],
                    },
                    {
                        category: "Support",
                        items: [
                            "Everbility provides unlimited customer support with no additional fees for template creation and as much help as you need",
                        ],
                    },
                ],
            },
            coreFeatures: {
                sections: [
                    {
                        category: "Clinical documentation",
                        items: [
                            "Everbility supports clinicians to use any amount of context to write any length documentation",
                            "If you're writing a case note, you can transcribe and generate a note from that transcription",
                            "If you're writing a long detailed report, you can use historical information about your client and provide as much additional context as required to generate a very detailed report",
                        ],
                    },
                ],
            },
            pricing: {
                prices: [
                    "Everbility has one subscription level: $50 AUD per month per clinician or $420 AUD per year per clinician (≈30% discount on monthly cost)",
                    "There are no additional costs for template support, training calls, etc.",
                ],
            },
            telehealth: true,
            headphonesCompatible: true,
            mobileCompatible: true,
            multipleNotes: true,
            aiTrainableOverTime: true,
            languagesSupported:
                "Everbility can be used in many other languages, reach out to us if you have any issues and we're happy to help.",
        },
    ];

    const MAX_COMPARE_ITEMS = 3;
    // --- FILTERS (options, normalizers, predicates) ---

    // What the UI can select (ensure your checkboxes use these values)
    const FILTER_OPTIONS = {
        appCompliance: ["yes", "no"],
        mobileCompatible: ["yes", "no"],
        freeMembership: ["yes", "no"],
        telehealth: ["yes", "no"],
        headphonesCompatible: ["yes", "no"],
    };

    const CHIP_TEXT = {
        appCompliance: {
            yes: "APP Compliance",
            no: "Without APP Compliance",
        },
        mobileCompatible: {
            yes: "Mobile Compatible",
            no: "Not Mobile Compatible",
        },
        freeMembership: {
            yes: "Free Level of Membership Available",
            no: "No Free Level of Membership Available",
        },
        telehealth: {
            yes: "Telehealth",
            no: "No Telehealth",
        },
        headphonesCompatible: {
            yes: "Headphones Compatible",
            no: "Not Headphones Compatible",
        },
    };

    // normalizers turn raw item fields into comparable buckets
    const normalizer = {
        yesNoUnknown(v) {
            if (
                v === true ||
                (typeof v === "string" && v.toLowerCase() === "true")
            )
                return "yes";
            else {
                return "no";
            }
        },
        yesNo(v) {
            return v ? "yes" : "no";
        },
    };

    // per-group predicates (AND across groups, OR within each group)
    const FILTER_PREDICATES = {
        appCompliance: (item, selected) =>
            selected.includes(normalizer.yesNo(item.appCompliance)),
        freeMembership: (item, selected) =>
            selected.includes(normalizer.yesNo(item.freeMembership)),
        telehealth: (item, selected) =>
            selected.includes(normalizer.yesNo(item.telehealth)),
        headphonesCompatible: (item, selected) =>
            selected.includes(
                normalizer.yesNoUnknown(item.headphonesCompatible)
            ),
        mobileCompatible: (item, selected) =>
            selected.includes(normalizer.yesNo(item.mobileCompatible)),
    };

    const FILTER_GROUPS = Object.keys(FILTER_PREDICATES);

    // --- STATE ---
    // --- STATE ---
    let activeFilters = Object.fromEntries(
        FILTER_GROUPS.map((g) => [g, []])
    );
    let comparedItemIds = [1, 2, 3];

    // --- DOM ---
    const filterBtn = document.getElementById("filter-btn");
    const filterDialog = document.getElementById("filter-dialog");
    const clearFiltersBtn = document.getElementById("clear-filters");
    const closeFiltersBtn = document.getElementById("close-filters");
    const activeCount = document.getElementById("active-count");
    const chipsWrap = document.getElementById("active-chips");

    const selectableItemsContainer = document.getElementById(
        "selectable-items-container"
    );
    const comparisonTableContainer = document.getElementById(
        "comparison-table-container"
    );
    const matchCountEl = document.getElementById("match-count");
    const matchPill = document.getElementById("match-pill");
    const eligiblePill = document.getElementById("eligible-pill");
    const eligibleExtra = document.getElementById("eligible-extra");

    // --- MODAL helpers (native dialog) ---
    const openModal = () => {
        filterDialog.showModal();
        filterBtn.setAttribute("aria-expanded", "true");
    };
    const closeModal = () => {
        filterDialog.close();
        filterBtn.setAttribute("aria-expanded", "false");
    };
    filterBtn.addEventListener("click", openModal);
    closeFiltersBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });

    // Close on backdrop click
    filterDialog.addEventListener("click", (event) => {
        const rect = filterDialog.getBoundingClientRect();
        const inDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
        if (!inDialog) closeModal();
    });

    // --- RENDERERS ---
    const renderActiveChips = () => {
        chipsWrap.innerHTML = "";
        const entries = Object.entries(activeFilters).flatMap(
            ([group, values]) => values.map((v) => ({ group, value: v }))
        );

        activeCount.textContent = entries.length;
        activeCount.classList.toggle("hidden", entries.length === 0);

        entries.forEach(({ group, value }) => {
            const li = document.createElement("li");
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className =
                "inline-flex items-center gap-1 rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-sm text-[var(--navy-deepest)] hover:bg-gray-200";

            const adaptedChipText = CHIP_TEXT[group][value];

            chip.innerHTML = `${adaptedChipText}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 1 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L10 8.94 6.28 5.22Z"/></svg>`;
            chip.setAttribute("aria-label", `Remove filter ${adaptedChipText}`);

            chip.addEventListener("click", () => {
                activeFilters[group] = activeFilters[group].filter(
                    (x) => x !== value
                );
                const selector = `input[data-filter-group="${group}"][value="${value}"]`;
                const input = filterDialog.querySelector(selector);
                if (input) input.checked = false;
                update();
            });

            li.appendChild(chip);
            chipsWrap.appendChild(li);
        });
    };

    const renderSelectableItems = () => {
        const { filteredOnly, union } = getFilterResults();

        selectableItemsContainer.innerHTML = "";

        matchCountEl.textContent = filteredOnly.length;
        matchPill.classList.remove("hidden");

        const overflow = Math.max(
            0,
            filteredOnly.length - comparedItemIds.length
        );
        eligiblePill.classList.toggle(
            "hidden",
            overflow <= MAX_COMPARE_ITEMS
        );

        if (union.length === 0) {
            const li = document.createElement("li");
            li.className = "text-gray-500 w-full text-center py-8";
            li.textContent =
                "No plans match your criteria. Try adjusting the filters.";
            selectableItemsContainer.appendChild(li);
            return;
        }

        union.forEach((item) => {
            const isCompared = comparedItemIds.includes(item.id);
            const atLimit = comparedItemIds.length >= MAX_COMPARE_ITEMS;

            const li = document.createElement("li");
            li.className = "flex";

            const btn = document.createElement("button");
            btn.type = "button";
            btn.dataset.id = item.id;
            btn.setAttribute("aria-pressed", String(isCompared));
            btn.setAttribute(
                "aria-label",
                `${isCompared ? "Remove" : "Add"} ${item.name} ${isCompared ? "from" : "to"
                } comparison`
            );

            let cls =
                "add-to-compare-btn flex items-center gap-2 rounded-lg font-semibold text-sm transition-all-smooth px-4 py-2 border ";
            let label = item.name;

            if (isCompared) {
                cls +=
                    "bg-[var(--primary-gold)] text-white border-[var(--primary-gold)]";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>${label}`;
            } else if (atLimit) {
                cls +=
                    "bg-[var(--gold-lighter)] text-[var(--navy-deepest)] border-[var(--primary-gold)] cursor-not-allowed opacity-70";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>${label}`;
                btn.disabled = true;
            } else {
                cls +=
                    "bg-[var(--gold-lighter)] text-[var(--navy-deepest)] border-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-white";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>${label}`;
            }

            btn.className = cls;
            li.appendChild(btn);
            selectableItemsContainer.appendChild(li);
        });
    };

    const createTooltipElement = (symbol, note) => {
        return `
            <span class="tooltip">
              <span class="tooltip-trigger">${symbol}</span>
              <span class="tooltip-text">${note}</span>
            </span>
          `;
    };

    const renderComparisonTable = () => {
        const EXCLUDED_LABEL_KEYS = ["id", "name"];
        const labelValues = {
            id: { title: "ID" },
            name: { title: "Name" },
            link: { title: "Link" },
            appCompliance: {
                title: "APP Compliance",
                note: "Australian Privacy Principles",
            },
            dataStorage: { title: "Data Storage" },
            freeMembership: { title: "Free Level of Membership Available" },
            freeTrial: { title: "Free Trial" },
            pmsIntegration: {
                title: "PMS Integration",
                note: "Practice Management System",
            },
            uniqueFeatures: { title: "Unique Features" },
            coreFeatures: { title: "Core Features" },
            pricing: { title: "Pricing" },
            telehealth: { title: "Telehealth" },
            headphonesCompatible: { title: "Headphones Compatible" },
            mobileCompatible: { title: "Mobile Phone Compatible" },
            multipleNotes: {
                title: "Multiple notes for a single report?",
                note: "",
            },
            aiTrainableOverTime: {
                title: "Is the AI trainable over time?",
                note: "",
            },
            languagesSupported: {
                title: "Languages Supported",
                expandable: true,
            },
        };

        if (comparedItemIds.length === 0) {
            comparisonTableContainer.innerHTML = `
            <div class="comparison-placeholder flex items-center justify-center rounded-xl p-8" role="status" aria-live="polite">
              <p class="text-center">Add up to 3 plans from the list above to compare them.</p>
            </div>`;
            return;
        }

        const items = allItems.filter((i) => comparedItemIds.includes(i.id));
        const fields = Object.keys(allItems[0]);
        const headers = items.map((i) => i.name);
        const rows = fields
            .map((f) => {
                const labelKey = f.replace("_", " ");

                if (EXCLUDED_LABEL_KEYS.includes(labelKey)) return;

                const label = labelValues[labelKey] || { title: labelKey };
                const isExpandable = !!label.expandable;
                const isExpanded = !!rowExpanded[labelKey];

                const rowCells = items
                    .map((it) => {
                        let v = it[f];

                        if (v.sections) {
                            v = v.sections
                                .map(
                                    (s) => `
                          <div class="flex flex-col gap-2 text-left">
                            <p class="badge font-bold">${s.category}</p>
                            <ul class="flex flex-col gap-2 text-sm">
                              ${s.items
                                            .map(
                                                (i) =>
                                                    `<li class="relative pl-5 before:content-['→'] before:absolute before:left-0 before:text-[var(--text-primary)] before:font-bold before:text-sm">${i}</li>`
                                            )
                                            .join("")}
                            </ul>
                          </div>`
                                )
                                .join("");
                        } else if (v === true) {
                            v = `<p><span class="text-xl text-green-500 font-bold">✓</span></p>`;
                        } else if (v === false) {
                            v = `<p><span class="text-xl text-red-500 font-bold">✗</span></p>`;
                        } else if (v?.url) {
                            v = `<a href="${v.url}" target="_blank" class="underline">${v.label}</a>`;
                        } else if (v?.bullets) {
                            v = v.bullets.map((i) => `<p>${i}</p>`).join("");
                        } else if (v?.prices) {
                            v = `
                      <ul class="flex flex-col gap-2 text-left">
                        ${v.prices
                                    .map(
                                        (text) =>
                                            `<li class="relative pl-5 before:content-['→'] before:absolute before:left-0 before:text-[var(--text-primary)] before:font-bold before:text-sm">${text}</li>`
                                    )
                                    .join("")}
                      </ul>`;
                        } else if (v?.languages) {
                            v = `
                      <ul class="flex flex-col gap-0.5 text-sm leading-snug">
                        ${v.languages.map((lng) => `<li>${lng}</li>`).join("")}
                      </ul>`;
                        } else if (v.available) {
                            v = `
                      <p class="flex items-center justify-center">
                        <span class="text-xl text-green-500 font-bold">✓</span>
                        ${createTooltipElement("!", v.note)}
                      </p>
                    `;
                        } else if (Array.isArray(v)) {
                            v = v.map((i) => `<p>${i}</p>`).join("");
                        }

                        const limiterClass =
                            isExpandable && !isExpanded
                                ? "max-h-[160px] overflow-hidden"
                                : "";

                        return `
                    <td class="text-center px-6 py-4 border-t border-r border-[var(--primary-gold)]">
                      <div class="flex flex-col gap-4 ${limiterClass}" data-row-content="${labelKey}">
                        ${v ?? ""}
                      </div>
                    </td>`;
                    })
                    .join("");

                const toggleBtn = isExpandable
                    ? `<button
                    type="button"
                    class="mt-025 text-xs underline hover:no-underline focus:outline-none"
                    data-row-toggle="${labelKey}"
                    aria-expanded="${isExpanded}">
                    ${isExpanded ? "Show less ↑" : "Show more ↓"}
                  </button>`
                    : "";

                return `
                <tr class="hover:bg-[var(--hover-background)] duration-200 ease-in-out" role="row">
                  <th scope="row" class="text-left font-semibold px-6 py-4 border-t border-r border-[var(--primary-gold)]">
                    <p>
                      <span class="capitalize">${label.title}</span>
                      ${label.note ? createTooltipElement("?", label.note) : ""}
                    </p>
                    ${toggleBtn}  
                  </th>
                  ${rowCells}
                </tr>`;
            })
            .filter(Boolean);

        // Build semantic table
        comparisonTableContainer.innerHTML = `
          <table class="table-fixed w-auto sm:w-full min-w-[400px] text-sm text-[var(--navy-deepest)]" role="table">
            <caption class="sr-only">Feature comparison of selected plans</caption>
            <thead class="sticky-header">
              <tr role="row">
                <th scope="col" class="text-left font-bold text-lg px-6 py-4">Feature</th>
                ${headers
                .map(
                    (h) =>
                        `<th scope="col" class="text-center font-bold text-lg px-6 py-4">${h}</th>`
                )
                .join("")}
              </tr>
            </thead>
            <tbody>
              ${rows.join("")}
            </tbody>
          </table>`;
    };

    // --- FILTER LOGIC ---
    const getFilterResults = () => {
        const byId = (a, b) => a.id - b.id;
        const entries = Object.entries(activeFilters).filter(
            ([, vals]) => vals.length
        );

        const filteredOnly = entries.length
            ? allItems.filter((item) =>
                entries.every(([group, values]) => {
                    const pred = FILTER_PREDICATES[group];
                    if (!pred) return true;
                    return pred(item, values);
                })
            )
            : allItems;

        // sticky: always include currently selected, even if filtered out
        const forcedSelected = allItems.filter((i) =>
            comparedItemIds.includes(i.id)
        );

        // de-dupe by id, then sort by id
        const union = [...forcedSelected, ...filteredOnly].reduce(
            (acc, item) => {
                acc.set(item.id, item);
                return acc;
            },
            new Map()
        );

        return {
            filteredOnly: [...filteredOnly].sort(byId),
            union: [...union.values()].sort(byId),
        };
    };

    const update = () => {
        renderActiveChips();
        renderSelectableItems();
        renderComparisonTable();
    };

    let rowExpanded = {};

    // --- EVENTS ---
    comparisonTableContainer.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-row-toggle]");
        if (!btn) return;
        const key = btn.dataset.rowToggle;
        rowExpanded[key] = !rowExpanded[key];
        renderComparisonTable();
    });

    filterDialog.addEventListener("change", (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            const g = e.target.dataset.filterGroup; // must match one of FILTER_GROUPS
            const val = e.target.value; // must match one of FILTER_OPTIONS[g]
            if (e.target.checked) {
                if (!activeFilters[g].includes(val)) activeFilters[g].push(val);
            } else {
                activeFilters[g] = activeFilters[g].filter((v) => v !== val);
            }
            update();
        }
    });

    clearFiltersBtn.addEventListener("click", (e) => {
        e.preventDefault();
        filterDialog
            .querySelectorAll('input[type="checkbox"]')
            .forEach((cb) => (cb.checked = false));
        activeFilters = Object.fromEntries(FILTER_GROUPS.map((g) => [g, []]));
        update();
    });

    selectableItemsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-to-compare-btn");
        if (!btn) return;
        const id = parseInt(btn.dataset.id, 10);
        const isSelected = comparedItemIds.includes(id);
        const atLimit = comparedItemIds.length >= MAX_COMPARE_ITEMS;

        if (isSelected) {
            comparedItemIds = comparedItemIds.filter((x) => x !== id);
        } else if (!atLimit) {
            comparedItemIds.push(id);
        }
        // reflect pressed state for a11y
        btn.setAttribute("aria-pressed", String(!isSelected));
        update();
    });

    // INIT
    update();
});