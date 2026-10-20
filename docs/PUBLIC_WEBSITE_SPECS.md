# Greptech Media Academy — Public Website Specifications

## 1. Route Map & Architecture

The public web application contains 15 dedicated routes designed to provide comprehensive, cinematic coverage of the academy's offerings, admissions, learning outcomes, and verification services.

```text
ROUTE                              PURPOSE / DESCRIPTION
----------------------------------------------------------------------------------------------------
/                                  Homepage: 13 cinematic sections, hero, featured courses, showcase
/about                             About Greptech: Mission, training philosophy, leadership, values
/courses                           Courses Directory: Filterable catalogue of all 7 programs
/courses/:slug                     Course Details: Overview, curriculum, projects, gear, tuition, CTA
/admissions                        Admissions Guide: Step-by-step entry guide, requirements, timeline
/apply                             Admissions Application: Multi-step validated application form
/online-training                   Online & Hybrid Programs: Virtual studio training, remote mentorship
/student-projects                  Student Creative Portfolio: Video showcase, photo essays, design reels
/facilities                        Facilities & Equipment: Camera bays, studios, edit suites, sound labs
/success-stories                   Alumni Outcomes: Graduate profiles, career milestones, achievements
/media                             Media Hub & Blog: Industry insights, masterclasses, tutorials, news
/media/:slug                       Article View: Rich editorial post, reading time, author, share
/contact                           Contact Page: Interactive inquiry form, phone, email, WhatsApp
/login                             Access Gateway: Student, instructor, and staff portal login
/certificate/verify/:certificateId Verification Portal: Public cryptographic certificate check
----------------------------------------------------------------------------------------------------
```

---

## 2. Homepage Specifications (13 Sections)

The homepage is the primary ambassador for the academy, designed with high visual impact, editorial storytelling, and clear conversion pathways.

### Section 1: Hero Section
- **Background**: Deep Charcoal Black (`#111820`) with cinematic overlay showing real production in progress.
- **Eyebrow / Overline**: `GREPTECH MEDIA ACADEMY` (Signal Orange `#F56B0A`, tracking 0.15em).
- **Headline**: `BUILDING INDUSTRY-READY MEDIA EXPERTS` (Bold 56px, high contrast white `#FFFFFF`).
- **Supporting Copy**: `Practical media education for the next generation of photographers, filmmakers, designers, content creators and media professionals.`
- **Primary CTA**: `Apply Now` (Solid `#F56B0A`, links to `/apply`).
- **Secondary CTA**: `Explore Courses` (Outlined white button, links to `/courses`).
- **Key Indicators**: 100% Practical Studios · Industry Mentorship · Professional Portfolio.

### Section 2: Academy Introduction
- **Headline**: Practical Education Engineered for Real Industry Demands.
- **Copy**: Highlights Greptech's focus on tactile, real-world creative craftsmanship rather than abstract theory. Emphasizes hands-on time with real gear and live commercial-grade briefs.

### Section 3: Featured Courses
- **Layout**: 3-column responsive card grid displaying featured programs:
  - Cinematography & Filmmaking
  - Professional Photography
  - Foley & Sound Production
- **Card Elements**: Course badge, duration, skill level, key disciplines, and "View Course Details" button.

### Section 4: Why Choose Greptech
- **Key Value Pillars**:
  1. **Industry-Standard Equipment**: Train with genuine cinema cameras, professional studio lighting, audio consoles, and industry-standard software.
  2. **Practicing Mentors**: Learn directly from working filmmakers, seasoned directors, audio engineers, and creative leads.
  3. **Portfolio-First Output**: Graduate with a polished, commercial-ready reel and portfolio rather than just a paper credential.
  4. **Rigorous Work Ethics**: Master client management, production discipline, onset protocols, and creative deadlines.

### Section 5: Practical, Industry-Focused Training
- **Content**: Deep-dive into our modular workshop pedagogy: 20% conceptual framework, 80% studio production and active shooting.

### Section 6: Student Projects & Creative Portfolio
- **Visuals**: Curated gallery displaying student short films, documentary stills, commercial photography, brand identities, and sound design reels.
- **CTA**: Link to `/student-projects`.

### Section 7: Facilities & Production Equipment
- **Showcase**: Highlighting the Sound Stage, Multi-Camera Streaming Suite, Color Grading Bay, Vocal & Foley Recording Studio, and Digital Lab.
- **CTA**: Link to `/facilities`.

### Section 8: Student Testimonials
- **Format**: High-impact testimonial cards quoting students and graduates detailing their journey from beginner to active industry professionals.

### Section 9: Admissions Process
- **Step-by-Step Flow**:
  1. *Submit Application* (Online form with passport photo and course selection).
  2. *Portfolio / Creative Review* (Admissions board review of your application).
  3. *Admissions Decision & Offer* (Receive official admission offer with onboarding guide).
  4. *Enrolment & Induction* (Orientation, kit allocation, and cohort commencement).

### Section 10: Latest Articles & Media Resources
- **Preview**: 3 recent editorial articles from `/media` discussing creative cinematography tips, color science, and sound recording techniques.

### Section 11: Frequently Asked Questions (FAQ)
- **Interactive Accordion**:
  - Who can apply for courses at Greptech Media Academy?
  - Do I need prior experience or my own camera gear to join?
  - What is the training schedule (full-time vs weekend)?
  - Are digital certificates provided upon graduation?
  - How do I verify my admission status?

### Section 12: Final Admissions Call-to-Action (CTA)
- **Visual**: High-contrast dark container with vibrant orange accents.
- **Headline**: Ready to Launch Your Creative Media Career?
- **Copy**: Cohorts have strictly limited seats to guarantee dedicated hands-on equipment time. Apply today to secure your place.
- **CTA Button**: `Apply for Next Cohort` (`#F56B0A`, links to `/apply`).

### Section 13: Footer
- **Branding**: Greptech Media Academy logo and mission snippet.
- **Quick Links**: Programs, Admissions, Facilities, Blog, Verification.
- **Direct Contact Touchpoints**:
  - Phone / WhatsApp: `+234 807 756 6926`
  - Email: `Greptechmediaacademy@gmail.com`
- **Copyright & Legal**: © 2026 Greptech Media Academy. All rights reserved.

---

## 3. Course Catalog Specifications (7 Core Disciplines)

Every course page under `/courses/:slug` contains consistent, comprehensive fields:

```text
1. Professional Photography (/courses/professional-photography)
   - Scope: Studio lighting, portraiture, documentary photography, commercial product shooting, Lightroom & Photoshop retouching.

2. Cinematography & Filmmaking (/courses/cinematography-filmmaking)
   - Scope: Visual storytelling, camera operating, directing, multi-point lighting, DaVinci Resolve color grading, post-production editing.

3. Graphic Design (/courses/graphic-design)
   - Scope: Visual branding, typography, print & packaging, digital layout, Adobe Creative Cloud (Illustrator, Photoshop, InDesign), design systems.

4. Content Creation (/courses/content-creation)
   - Scope: Mobile cinematography, YouTube & social production, scriptwriting, lighting on a budget, viral editing, content monetization.

5. Foley & Sound Production (/courses/foley-sound-production)
   - Scope: Sound effect generation, ADR, field audio recording, boom operation, DAW mixing (Pro Tools / Logic Pro), soundscapes.

6. Live Streaming & Production (/courses/live-streaming-production)
   - Scope: Multi-camera broadcast switching, ATEM workflow, OBS Studio, live audio routing, graphics overlays, church & event streaming.

7. Voiceover & Audio Production (/courses/voiceover-audio-production)
   - Scope: Microphone techniques, vocal delivery, commercial reads, audiobook narration, vocal booth acoustics, mastering.
```

### Course Page Section Layout:
1. **Hero Header**: Course title, category, format (In-Person / Hybrid), duration, and tuition placeholder.
2. **Overview & Philosophy**: What makes this course distinct.
3. **Core Learning Outcomes**: Bulleted competencies acquired upon completion.
4. **Curriculum Modules**: Accordion or tabbed week-by-week syllabus.
5. **Required Equipment & Software**: Gear provided in-studio vs recommended personal kit.
6. **Instructor / Lead Mentor Profile**: Bio of the practicing lead practitioner.
7. **Tuition & Key Dates**: Start date placeholder and payment terms.
8. **Direct CTA**: `Apply for This Course` (Pre-selects course on `/apply`).

---

## 4. Admissions Application Specifications

Route: `/apply`  
Form schema with strict client-side validation:

| Field Name | Type | Validation Rule | UI Control |
| :--- | :--- | :--- | :--- |
| `fullName` | String | Required, min 3 characters | Text Input |
| `phone` | String | Required, valid international phone format | Tel Input |
| `email` | String | Required, valid email pattern | Email Input |
| `dateOfBirth` | Date | Required, minimum age 16 | Date Picker |
| `residentialAddress` | String | Required, min 10 characters | Textarea |
| `selectedCourse` | Enum | Required, must match 1 of 7 courses | Select Dropdown |
| `previousExperience` | Enum | Required: Beginner / Intermediate / Advanced | Radio Group |
| `educationalBackground`| String | Required: High School / Diploma / Degree / Other | Select Dropdown |
| `passportPhoto` | File | Required, max 2MB, image/jpeg or image/png | Drag & Drop File Upload with Preview |
| `emergencyContact` | Object | Name, phone, and relationship required | Nested Fieldset |
| `privacyConsent` | Boolean| Required, must be true | Checkbox |

---

## 5. Certificate Verification Specifications

Route: `/certificate/verify/:certificateId`

### Verification Flow:
1. User enters certificate ID (or arrives via QR code URL).
2. The page queries the certificate verification record.
3. If valid:
   - Displays student name (e.g. *John D.*).
   - Displays course completed (*Cinematography & Filmmaking*).
   - Displays cohort & completion date.
   - Displays digital verification seal and unique cryptographic hash.
4. If invalid:
   - Displays prominent security notice: *The certificate ID entered could not be verified in the Greptech Media Academy records database.*

