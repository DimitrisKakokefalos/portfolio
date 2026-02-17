document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const historyContainer = document.getElementById('chatHistory');
    const startScreen = document.getElementById('startScreen');
    
    // =========================================
    // CONFIGURATION - Easy to switch to n8n later
    // =========================================
    const CONFIG = {
        useRealAI: false,  // Set to true when n8n webhook is ready
        webhookURL: 'https://your-n8n-instance.com/webhook/chat',  // Your n8n webhook
        typingDelay: { min: 600, max: 1200 }
    };

    // =========================================
    // KNOWLEDGE BASE - Predefined responses
    // =========================================
    const knowledge = {
        name: "Dimitris Kakokefalos",
        age: 21,
        location: "Athens, Greece",
        role: "Full-stack Developer & AI Engineer",
        company: "DynaWorks",
        email: "dimitriskakokefalos@gmail.com",
        
        responses: {
            // Greetings
            'hello|hi|hey|greetings|γεια|καλημερα|καλησπερα': 
                "Hey! I'm here to tell you about Dimitris. Ask me anything about his work, skills, or projects!",
            
            // About
            'who is|about dimitris|tell me about|about him|ποιος ειναι': 
                "Dimitris is a 21-year-old **Full-stack Developer & AI Engineer** based in Athens, Greece. He's the founder of **DynaWorks**, an automation agency helping businesses save time through intelligent workflows.\n\nHe combines technical expertise in web development and AI with a strong understanding of business needs.",
            
            // Projects
            'projects|work|portfolio|built|what have|εργα|δουλειες':
                "Here are some of Dimitris's notable projects:\n\n**DynaWorks Agency** - Automation agency website built with Next.js\n\n**Document Ingestion Pipeline** - AI-powered document processing with n8n & GroqAI\n\n**AI Email Agent** - Personal email assistant using Google Cloud & AI\n\n**Secure Invoice System** - Next.js app for invoice management with MyDATA integration",
            
            // Skills
            'skills|technologies|tech stack|what can|stack|τεχνολογιες':
                "Dimitris's expertise includes:\n\n**Automation:** n8n, Make, Zapier, AI Agents\n\n**Frontend:** React, Next.js, JavaScript, TypeScript\n\n**Backend:** Python, Node.js, REST APIs\n\n**Cloud:** Google Cloud Platform, OAuth 2.0\n\n**Databases:** PostgreSQL, Supabase, SQL\n\nHe specializes in connecting systems and building intelligent workflows.",
            
            // Education
            'education|study|degree|university|σπουδες|πτυχιο':
                "Dimitris holds a **BSc in Software Engineering** from College de Paris (Athens Campus, 2025).\n\nHe also has an Associate's degree in Web Development from I.V.T ALFA.\n\nHis education combines solid technical foundations with practical business applications.",
            
            // Contact
            'contact|email|reach|hire|available|επικοινωνια|προσλαβω':
                "You can reach Dimitris at:\n\n**Email:** dimitriskakokefalos@gmail.com\n\n**LinkedIn:** linkedin.com/in/dimitris-kakokefalos-0626a729a\n\n**GitHub:** github.com/DimitrisKakokefalos\n\nHe's currently **available** for automation and web development projects!",
            
            // DynaWorks
            'dynaworks|agency|company|business|εταιρεια':
                "**DynaWorks** is Dimitris's automation agency based in Athens.\n\nThey specialize in:\n- Workflow automation (n8n, Make, Zapier)\n- AI-powered chatbots and agents\n- Greek tax system integrations (MyDATA, ERGANI)\n- Custom web applications\n\nVisit **dynaworks.gr** to learn more!",
            
            // Automation
            'automation|workflows|n8n|automate|αυτοματοποιηση':
                "Automation is Dimitris's specialty! He builds intelligent workflows that handle repetitive tasks automatically.\n\n**Examples:**\n- Invoice generation & MyDATA submission\n- AI-powered email management\n- Document processing pipelines\n- Social media automation\n\nHis tools of choice are **n8n**, Make, and custom integrations.",
            
            // Location
            'location|where|based|athens|που|αθηνα':
                "Dimitris is based in **Athens, Greece**.\n\nHe works both locally and remotely with clients worldwide. His expertise in Greek business systems (MyDATA, ERGANI) makes him particularly valuable for businesses operating in Greece.",
            
            // Experience
            'experience|background|years|εμπειρια':
                "Dimitris started coding with mobile development, then moved to web and automation.\n\n**Key achievements:**\n- Founded DynaWorks automation agency\n- Built multiple client automation systems\n- Developed AI-powered applications\n- Created full-stack web applications\n\nHe combines his software engineering degree with hands-on business experience.",
            
            // Availability
            'available|freelance|hire|cost|price|διαθεσιμος|τιμη':
                "Yes, Dimitris is **available for projects**!\n\nHe works on:\n- Automation projects (n8n, workflows)\n- Full-stack web development\n- AI integrations\n- Consulting\n\nReach out at **dimitriskakokefalos@gmail.com** to discuss your project!",
            
            // Thanks
            'thanks|thank you|awesome|great|cool|ευχαριστω':
                "You're welcome! Let me know if you have any other questions about Dimitris. Happy to help!",
            
            // Greek specific
            'ελληνικα|greek|μιλας ελληνικα':
                "I understand both English and Greek! Feel free to ask in either language.",
            
            // Interests
            'hobbies|interests|personal|free time':
                "Outside of coding, Dimitris is into:\n\n**Motorcycles** - Rides a Zontes 350G\n**Tech & AI** - Always exploring new technologies\n**Problem solving** - Enjoys tackling complex challenges\n\nHe's passionate about building things that make life easier."
        }
    };

    // =========================================
    // GLOBAL FUNCTION FOR SUGGESTION CHIPS
    // =========================================
    window.sendSuggestion = (text) => {
        handleSend(text);
    };

    // =========================================
    // MAIN SEND HANDLER
    // =========================================
    async function handleSend(text = null) {
        const message = text || chatInput.value.trim();
        if (!message) return;

        // Hide start screen, show history
        if (!startScreen.classList.contains('hidden')) {
            startScreen.classList.add('hidden');
            historyContainer.classList.add('active');
        }

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        showTyping();

        // Get response (real AI or predefined)
        let response;
        
        if (CONFIG.useRealAI) {
            // PHASE 2: Real AI via n8n webhook
            response = await fetchAIResponse(message);
        } else {
            // PHASE 1: Predefined responses with fake delay
            await delay(CONFIG.typingDelay.min + Math.random() * (CONFIG.typingDelay.max - CONFIG.typingDelay.min));
            response = getResponse(message);
        }

        hideTyping();
        addMessage(response, 'ai');
    }

    // =========================================
    // AI RESPONSE (for Phase 2 - n8n integration)
    // =========================================
    async function fetchAIResponse(message) {
        try {
            const response = await fetch(CONFIG.webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: message,
                    timestamp: new Date().toISOString()
                })
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            return data.response || data.message || "Sorry, I couldn't process that request.";
        } catch (error) {
            console.error('AI fetch error:', error);
            // Fallback to predefined responses
            return getResponse(message);
        }
    }

    // =========================================
    // PREDEFINED RESPONSE MATCHER
    // =========================================
    function getResponse(input) {
        const lower = input.toLowerCase();
        
        // Check each pattern
        for (const [pattern, response] of Object.entries(knowledge.responses)) {
            const keywords = pattern.split('|');
            if (keywords.some(keyword => lower.includes(keyword))) {
                return response;
            }
        }
        
        // Default response
        return "I can tell you about Dimitris's **work**, **skills**, **projects**, **education**, or how to **contact** him.\n\nWhat would you like to know?";
    }

    // =========================================
    // UI HELPERS
    // =========================================
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        // Convert markdown-style bold to HTML and newlines to breaks
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        div.innerHTML = formattedText;
        historyContainer.appendChild(div);
        historyContainer.scrollTop = historyContainer.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        historyContainer.appendChild(typing);
        historyContainer.scrollTop = historyContainer.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // =========================================
    // EVENT LISTENERS
    // =========================================
    sendBtn.addEventListener('click', () => handleSend());
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Focus input on load (desktop only)
    if (window.innerWidth > 768) {
        chatInput.focus();
    }
});