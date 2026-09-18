# Assignment 2: Flexbox Learning Game - Requirements Checklist
*(תרגיל מספר 2 - משחק ללימוד Flexbox)*

This checklist contains every requirement, technical constraint, submission guideline, and bonus criteria specified in the assignment PDF. We will use this to track and verify our progress before submission.

---

## 1. Core Gameplay Requirements (דרישות מינימום)
- [x] **At least 6 distinct levels** (לפחות 6 שלבים שונים) — *Implemented: 7 levels*
- [x] **Flex Container in each level** (בכל שלב יוצגו מספר פריטים בתוך Flex Container)
- [x] **Clear instructions per level** (בכל שלב תופיע הוראה ברורה המתארת את הסידור הנדרש)
- [x] **HTML Flexbox controls** (שליטה במאפייני Flexbox באמצעות רכיבי HTML מתאימים: Drag & Drop code blocks / selects / buttons)
- [x] **Dynamic JS updates** (השינויים שבוחר המשתמש יחולו על הלוח באמצעות JavaScript)
- [x] **Solution validation** (המשחק יאפשר למשתמש לבדוק האם הפתרון שלו נכון - כפתור בדיקה/הגשה)
- [x] **Success message & advance** (הודעת הצלחה ואפשרות להתקדם לשלב הבא במקרה של פתרון נכון)
- [x] **Error feedback & retry** (הודעה מתאימה בעת פתרון שגוי ואפשרות להמשיך לנסות)
- [x] **Current level indicator** (הצגת השלב הנוכחי, לדוגמה: "שלב 3 מתוך 7")
- [x] **Reset level option** (אפשרות לאיפוס השלב הנוכחי לערכי ברירת המחדל)

---

## 2. Flexbox Properties Coverage (שימוש במאפייני Flexbox)
- [x] **`display: flex`** (בשימוש בכל שלבי המשחק)
- [x] **`flex-direction`** (לפחות שלב אחד או יותר המתרגל כיוון ציר: `row`, `row-reverse`, `column`, `column-reverse` — Levels 3, 5, 7)
- [x] **`justify-content`** (תרגול יישור לאורך הציר הראשי: `flex-start`, `center`, `flex-end`, `space-between`, `space-around` — Levels 1, 4, 6, 7)
- [x] **`align-items`** (תרגול יישור לאורך הציר המשני: `flex-start`, `center`, `flex-end` — Levels 2, 4, 5, 7)
- [x] **`flex-wrap`** (לפחות שלב אחד עושה שימוש ב-`flex-wrap: wrap` — Level 6 Taco Fiesta)
- [x] **Variety of combinations** (שלבים מגוונים ולא רק מעבר בין `center` ל-`flex-start`)
- [x] **At least 3 multi-property combo levels** (לפחות 3 שלבים הדורשים שימוש משולב ביותר ממאפיין אחד — Levels 4, 5, 6, 7)
- [x] **Instruction matches solution** (הפתרון המוגדר לכל שלב תואם במדויק להוראה המוצגת)

---

## 3. Architecture & Technical Constraints (מבנה ומגבלות)
- [x] **Semantic HTML structure** (שימוש נכון בתגיות ובמבנה HTML5 תקין)
- [x] **CSS styling & Flexbox layout** (שימוש ב-CSS לצורך עיצוב האתר ומימוש ה-Flexbox)
- [x] **Vanilla JavaScript logic** (שימוש ב-JavaScript לאינטראקטיביות ולוגיקת המשחק)
- [x] **Single Page Application (SPA)** (מעבר בין שלבים ללא טעינת עמוד HTML חדש)
- [x] **Responsive Design** (האתר עובד בצורה תקינה במסכי מובייל ודסקטופ)
- [x] **Fixed Board Dimensions** (לוח המשחק בעל רוחב וגובה קבועים 500x500px בכל גדלי המסך - אין תלות ברזולוציה)
- [x] **NO external JS libraries** (אין להשתמש בספריות חיצוניות כמו jQuery, React, Lodash וכו' — Pure Vanilla JS בלבד!)
- [x] **NO CSS Grid for game solution** (אין להשתמש ב-CSS Grid לפתרון המשימות — מטרת התרגיל היא Flexbox)
- [x] **Unique Theme & Design** (נושא מקורי ייחודי: "World Bistro: Feed the Hungry Guests!")

---

## 4. High Grade / Bonus Criteria (דרישות לציון גבוה מעבר למינימום)
- [x] **Extra levels beyond minimum** (7 שלבים מעבר ל-6 המינימליים)
- [x] **Polished & consistent theme** (נושא מקורי מוקפד ועקבי עם אימוג'ים תלת-ממדיים של סועדים ומאכלים)
- [x] **Animations & visual feedback** (אנימציית החלקה של המאכלים, shake בטעות, זוהר וקונפטי בניצחון)
- [x] **Level progress tracking** (סטטוס שלבים שהושלמו נשמר ומוצג בסרגל התקדמות ובכרטיסיות)
- [x] **`localStorage` persistence** (שמירת ההתקדמות, המצב החשוך/מואר והעדפות הסאונד בדפדפן)
- [x] **Revisit completed levels** (מסך בית / תפריט שלבים המאפשר כניסה ומעבר חופשי לכל שלב)
- [x] **Sound effects with mute toggle** (אפקטים קוליים באמצעות Web Audio API וכפתור השתקה)
- [x] **Dark Mode / Light Mode** (מתג מעבר בין מצב יום ומצב לילה למסעדה)
- [x] **Grand Victory Trophy 🏆** (גביע שף מוזהב בסיום כל השלבים)

---

## 5. Submission & Deployment (הנחיות הגשה)
- [ ] **Submission in pairs** (הגשה בזוגות בלבד)
- [ ] **Public GitHub Repository** (הפרויקט מועלה ל-Repository ציבורי ב-GitHub)
- [ ] **GitHub Pages Deployment** (האתר מפורסם ועובד דרך GitHub Pages)
- [ ] **Working Links in Moodle**:
  - [ ] קישור תקין ל-Repository
  - [ ] קישור תקין לאתר החי ב-GitHub Pages
- [ ] **Project ZIP file** (קובץ ZIP תקין המכיל את כל קבצי הפרויקט לתיבת ההגשה במודל)
- [ ] **Submitted before deadline** (הגשה בזמן לפני תאריך היעד)
