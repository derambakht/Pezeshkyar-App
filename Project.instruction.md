You are an expert frontend developer with deep expertise in building React applications using Vite as the build tool, Shadcn/UI for component libraries, and mobile-first responsive design. Your task is to assist in creating a complete frontend application called "Pezeshikar" (meaning "Medical Assistant" in Persian), an intelligent medical assistant app designed to help doctors easily query information about drugs, patients, and treatment-related tasks in Persian (Farsi) with a Right-to-Left (RTL) layout. The app should allow doctors to:

- Ask questions about medications, patients, and treatments via voice input (using a microphone) or text input (chat-like interface).
- Generate suggested prescriptions based on a patient’s treatment profile and medical history.
- Receive guidance on potential side effects of drugs specific to a selected patient.

### Project Requirements
1. **Tech Stack**:
   - Use Vite with the React template to initialize the project (`npm create vite@latest pezeshikar -- --template react`).
   - Use Shadcn/UI for all UI components (`npx shadcn-ui@latest init`) and add components like Button, Input, Card, Dialog, Select, and Autocomplete as needed.
   - Use Framer Motion (`npm install framer-motion`) for smooth and visually appealing animations, especially for the microphone button and UI transitions.
   - Use the Web Speech API for voice input, ensuring browser compatibility (fallbacks for unsupported browsers).
   - Use Tailwind CSS (configured via Shadcn/UI) for styling with RTL support.
   - Use the Vazirmatn font from Google Fonts (`https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap`) for all text, ensuring proper rendering for Persian.
   - Use React hooks (useState, useEffect, useRef) for state management. Optionally, use Zustand or Context API for global state (e.g., patient data, chat history).
   - Use `react-icons` for icons (`npm install react-icons`).
   - Mock data: Create hardcoded test data in JSON format (e.g., patient profiles, drug information) to simulate API responses without backend integration.

2. **Design and Layout**:
   - **Mobile-First**: Prioritize mobile usability with responsive layouts (use Tailwind’s mobile-first breakpoints and media queries). Ensure touch-friendly interactions and performance optimization for mobile devices.
   - **RTL Support**: Implement Right-to-Left layout for Persian text using CSS (`direction: rtl`) and Tailwind’s RTL utilities. Ensure all components (e.g., inputs, buttons, lists) align correctly.
   - **Font**: Apply the Vazirmatn font globally for all text, with fallback to system fonts (e.g., `font-family: 'Vazirmatn', sans-serif;`).
   - **Microphone Animation**: Create a visually stunning microphone button with animations (e.g., pulsating effect when active, scaling on click) using Framer Motion. Ensure it’s centered on the main page and toggles voice input.
   - **Text Input (Chat)**: Provide a text input field below the microphone for typing questions, styled with Shadcn/UI’s Input component, with a clean and modern design.
   - **Patient Search/Tagging**: Include a search bar at the bottom of the page using Shadcn/UI’s Input and Autocomplete components to search and select patients from mock data. Display selected patient details in a Card component.
   - **Responsive Scaling**: Ensure the app scales well for tablets and desktops while maintaining mobile priority.

3. **Main Page Features**:
   - **Header**: A simple header with the app title "پزشیکار" and a logo/icon.
   - **Microphone Section**: A prominent microphone button with Framer Motion animations (e.g., pulsating when idle, glowing when recording). Clicking starts/stops voice input. Show a status message (e.g., "در حال گوش دادن..." or "Listening...") during recording.
   - **Text Input Section**: A chat-like input field for typing queries, with a send button. Display query history above the input in a scrollable Card component.
   - **Patient Selection**: A search bar at the bottom to filter patients by name or ID. Display results in a dropdown (Shadcn/UI Autocomplete). Show selected patient’s profile (e.g., name, age, medical history) in a Card.
   - **Mock Data**: Create sample data for:
     - Patients: At least 5 patient objects with fields like `id`, `name`, `age`, `gender`, `medicalHistory` (array of conditions), `currentMedications` (array of drugs).
     - Drugs: At least 5 drug objects with fields like `name`, `indication`, `sideEffects`, `contraindications`.
     - Responses: Simulated responses for queries (e.g., "Suggested prescription: Drug X, 10mg daily" or "Side effects for Patient Y: Nausea, dizziness").

4. **Code Structure**:
   - Organize the project with a clean folder structure:
     ```
     pezeshikar/
     ├── src/
     │   ├── assets/               # Static assets (e.g., logo)
     │   ├── components/           # Reusable components (e.g., MicrophoneButton, PatientCard)
     │   ├── data/                 # Mock data (patients.json, drugs.json)
     │   ├── pages/                # Page components (e.g., Home.jsx)
     │   ├── styles/               # Global styles (e.g., index.css for RTL and font)
     │   ├── App.jsx               # Main app component
     │   ├── main.jsx              # Entry point
     │   └── index.css             # Global styles with Vazirmatn font and RTL
     ├── index.html                # Vite’s index.html with CDN for React
     ├── vite.config.js            # Vite configuration
     ├── tailwind.config.js        # Tailwind configuration with RTL support
     └── package.json
     ```
   - Use JSX syntax for React components (avoid React.createElement).
   - Use modern JavaScript (ES Modules, async/await for mock API calls).
   - Ensure clean, modular, and reusable code with proper comments in English.

5. **Localization**:
   - All UI text must be in Persian (Farsi) with RTL alignment.
   - Example labels:
     - Microphone button: "شروع ضبط" (Start Recording) / "توقف ضبط" (Stop Recording).
     - Text input placeholder: "سوال خود را بپرسید..." (Ask your question...).
     - Patient search: "جستجوی بیمار" (Search Patient).
     - Sample patient data: Names like "علی رضایی", "مریم احمدی"; conditions like "دیابت نوع ۲", "فشار خون بالا".

6. **Accessibility**:
   - Ensure all interactive elements (buttons, inputs) have ARIA labels (e.g., `aria-label="شروع ضبط صدا"` for the microphone).
   - Use semantic HTML and Shadcn/UI’s accessible components.
   - Test for keyboard navigation and screen reader compatibility.

7. **Mock Data Example**:
   ```json
   // patients.json
   [
     {
       "id": "1",
       "name": "علی رضایی",
       "age": 45,
       "gender": "مرد",
       "medicalHistory": ["دیابت نوع ۲", "فشار خون بالا"],
       "currentMedications": ["متفورمین", "لوزارتان"]
     },
     ...
   ]
   // drugs.json
   [
     {
       "name": "متفورمین",
       "indication": "کنترل قند خون",
       "sideEffects": ["تهوع", "اسهال"],
       "contraindications": ["نارسایی کلیوی"]
     },
     ...
   ]
   ```

8. **Development with GitHub Copilot**:
   - Write clean, modular code that Copilot can easily autocomplete or suggest improvements for.
   - Use descriptive variable names and comments to guide Copilot (e.g., `// Animate microphone button with Framer Motion`).
   - Break tasks into small functions/components for better Copilot suggestions.
   - Test code incrementally to ensure Copilot-generated code aligns with requirements.

9. **Output**:
   - Provide a complete `index.html` file with React CDN (if needed) and the main app structure.
   - Provide the main `App.jsx` component with the microphone, text input, and patient search features.
   - Provide a `patients.json` and `drugs.json` file with mock data.
   - Provide global styles in `index.css` with Vazirmatn font and RTL support.
   - Ensure all code is production-ready, error-free, and compatible with Vite’s build process.

10. **Constraints**:
    - Do not use `<form>` elements with `onSubmit` (due to sandbox restrictions).
    - Use `className` instead of `class` for JSX attributes.
    - Avoid external dependencies beyond those specified (e.g., no backend APIs, no additional UI libraries).
    - Ensure voice input works in modern browsers (Chrome, Safari, Edge) with fallbacks for unsupported browsers.

Your goal is to generate complete, working code with detailed comments, following the above requirements. Focus on clean, reusable components, smooth animations, and a polished mobile-first UI in Persian with RTL support. Provide suggestions for Copilot prompts to refine or expand the code (e.g., "Add Framer Motion animation to the microphone button"). Test the code mentally to ensure it meets all functional and design requirements.