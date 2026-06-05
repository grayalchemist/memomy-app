import type { WeekContent, PostpartumWeekContent } from "./types";

// ----------------------------------------------------------------
// TTC content (stage = "ttc")
// ----------------------------------------------------------------
export const ttcContent: WeekContent = {
  babySize: "",
  headline: "Your journey starts here.",
  body: "Tracking your cycle and taking care of your body are the most meaningful things you can do right now. You're not alone in this.",
  normalSymptoms: ["Cycle tracking", "Prenatal vitamins with folic acid", "Reducing stress where possible"],
  tip: "Start taking 0.4 mg of folic acid daily if you haven't already — it's the single most impactful step before conception.",
};

// ----------------------------------------------------------------
// Pregnancy weeks 1–40
// Structure: pregnancyWeeks[weekNumber] = WeekContent
// Content team: fill in body / normalSymptoms / tip per week.
// babySize comparisons should be culturally familiar, not clinical.
// ----------------------------------------------------------------
export const pregnancyWeeks: Record<number, WeekContent> = {
  1: {
    babySize: "a poppy seed",
    headline: "Week 1: It all begins.",
    body: "Your body is preparing for implantation. Hormonal changes are already underway even before a pregnancy test would show positive.",
    normalSymptoms: ["Mild pelvic cramping", "Breast tenderness", "Fatigue"],
    tip: "Start taking prenatal vitamins with folic acid if you haven't already.",
  },
  2: {
    babySize: "a sesame seed",
    headline: "Week 2: Ovulation week.",
    body: "This is typically when conception occurs. The fertilised egg is making its way to the uterus.",
    normalSymptoms: ["Mild spotting (implantation)", "Light cramping", "Increased vaginal discharge"],
    tip: "Rest well — your body is doing a lot even if you can't feel it yet.",
  },
  3: {
    babySize: "a sesame seed",
    headline: "Week 3: Implantation.",
    body: "The fertilised egg has implanted in the uterine wall. hCG hormone production begins — this is what a pregnancy test detects.",
    normalSymptoms: ["Bloating", "Mild nausea", "Heightened sense of smell"],
    tip: "Avoid alcohol completely from this point forward.",
  },
  4: {
    babySize: "a poppy seed",
    headline: "Week 4: A positive test.",
    body: "Most home pregnancy tests will now show positive. The embryo is forming its neural tube — the beginning of the brain and spinal cord.",
    normalSymptoms: ["Nausea (morning sickness begins)", "Fatigue", "Frequent urination"],
    tip: "Schedule your first prenatal appointment — ideally between weeks 8 and 10.",
  },
  5: {
    babySize: "an apple seed",
    headline: "Week 5: Heart begins to form.",
    body: "Your baby's heart is starting to take shape and will begin beating this week. The embryo is developing rapidly.",
    normalSymptoms: ["Nausea, especially in the morning", "Sore breasts", "Extreme tiredness"],
    tip: "Eat small, frequent meals to manage nausea — an empty stomach makes it worse.",
  },
  6: {
    babySize: "a lentil",
    headline: "Week 6: Tiny heartbeat.",
    body: "A heartbeat may be visible on ultrasound this week. Facial features are beginning to form.",
    normalSymptoms: ["Morning sickness (can occur any time)", "Mood swings", "Light cramping"],
    tip: "Ginger tea or ginger chews can help with nausea without any medication.",
  },
  7: {
    babySize: "a blueberry",
    headline: "Week 7: Brain developing fast.",
    body: "Your baby's brain is growing at a remarkable pace — generating around 100 new brain cells every minute.",
    normalSymptoms: ["Food aversions", "Increased saliva", "Dizziness"],
    tip: "Stay hydrated. Dehydration makes nausea and dizziness significantly worse.",
  },
  8: {
    babySize: "a raspberry",
    headline: "Week 8: First prenatal visit.",
    body: "This week is often when the first prenatal appointment happens. You may have your first ultrasound and hear the heartbeat.",
    normalSymptoms: ["Bloating and constipation", "Nausea", "Fatigue"],
    tip: "Write down any questions before your appointment — the first visit covers a lot of ground.",
  },
  9: {
    babySize: "a grape",
    headline: "Week 9: Tiny movements.",
    body: "Your baby is moving, though you won't feel it yet. All major organs are forming.",
    normalSymptoms: ["Round ligament pressure", "Increased discharge", "Mood changes"],
    tip: "It's safe to continue most exercise — walking and prenatal yoga are excellent.",
  },
  10: {
    babySize: "a strawberry",
    headline: "Week 10: Embryo becomes a fetus.",
    body: "From this week, your baby is officially a fetus. Critical organ development is largely complete; growth is the main focus now.",
    normalSymptoms: ["Visible veins on breasts", "Mild headaches", "Nausea starting to ease for some"],
    tip: "Ask your doctor about first-trimester screening tests if you haven't already.",
  },
  11: {
    babySize: "a fig",
    headline: "Week 11: Reflexes emerging.",
    body: "Your baby is beginning to develop reflexes and their fingers and toes are fully separated.",
    normalSymptoms: ["Nausea may be easing", "Increased energy for some", "Skin changes"],
    tip: "This is a good time to start thinking about prenatal exercise classes.",
  },
  12: {
    babySize: "a lime",
    headline: "Week 12: End of the first trimester.",
    body: "You've reached the end of the first trimester. Miscarriage risk drops significantly from here. Many women share their news this week.",
    normalSymptoms: ["Reduced nausea for most", "Visible bump starting", "Dizziness"],
    tip: "Celebrate this milestone. The hard work of the first trimester deserves acknowledgement.",
  },
  13: {
    babySize: "a peach",
    headline: "Week 13: Welcome to the second trimester.",
    body: "Many women feel a welcome surge in energy this trimester. Your baby's fingerprints are forming.",
    normalSymptoms: ["More energy", "Reduced nausea", "Growing appetite"],
    tip: "Start thinking about maternity wear — comfort matters now.",
  },
  14: {
    babySize: "a lemon",
    headline: "Week 14: Growing fast.",
    body: "Your baby is practising facial expressions and can squint, frown, and grimace.",
    normalSymptoms: ["Round ligament pain", "Increased appetite", "Skin changes (linea nigra)"],
    tip: "Moisturise your abdomen daily — skin is stretching and can become itchy.",
  },
  15: {
    babySize: "an apple",
    headline: "Week 15: Anatomy scan coming.",
    body: "Your baby is forming taste buds and can sense light through the uterine wall.",
    normalSymptoms: ["Nasal congestion", "Gum sensitivity", "Heartburn beginning"],
    tip: "Book your anatomy scan for around week 18–20 if you haven't already.",
  },
  16: {
    babySize: "an avocado",
    headline: "Week 16: First movements soon.",
    body: "You may feel the first flutters of movement (quickening) any time from now — especially if this isn't your first pregnancy.",
    normalSymptoms: ["Heartburn", "Backache", "Increased energy"],
    tip: "Side sleeping is becoming more comfortable. A pillow between your knees helps your back.",
  },
  17: {
    babySize: "a pear",
    headline: "Week 17: Fat layers forming.",
    body: "Your baby is laying down fat to help regulate body temperature after birth. The skeleton is hardening from cartilage to bone.",
    normalSymptoms: ["Swollen feet and ankles", "Nasal congestion", "Vivid dreams"],
    tip: "Elevate your feet when sitting to reduce swelling.",
  },
  18: {
    babySize: "a bell pepper",
    headline: "Week 18: Anatomy scan week.",
    body: "This week or soon, the anatomy scan checks that everything is developing as expected and may reveal the sex if you'd like to know.",
    normalSymptoms: ["Increased energy", "Mild heartburn", "Round ligament pain"],
    tip: "Write down questions for your anatomy scan — it's a long appointment with a lot of information.",
  },
  19: {
    babySize: "a mango",
    headline: "Week 19: Feeling the kicks.",
    body: "If you haven't felt movement yet, you likely will soon. Your baby's senses — taste, smell, hearing, sight — are all developing.",
    normalSymptoms: ["Kicks and flutters", "Lower back pain", "Leg cramps at night"],
    tip: "Leg cramps at night are common. Stretching your calf before bed can help.",
  },
  20: {
    babySize: "a banana",
    headline: "Week 20: Halfway there.",
    body: "You're at the halfway point. Your baby now weighs around 300g and can hear your voice.",
    normalSymptoms: ["Braxton Hicks beginning", "Increased appetite", "Shortness of breath"],
    tip: "Talk and sing to your baby — they can hear you now and recognise your voice after birth.",
  },
  21: {
    babySize: "a carrot",
    headline: "Week 21: Rapid weight gain begins.",
    body: "Your baby will double in weight over the next few weeks. Their eyebrows and eyelids are now fully formed.",
    normalSymptoms: ["Braxton Hicks", "Stretch marks appearing", "Increased discharge"],
    tip: "Keep up gentle exercise — it improves sleep and reduces back pain.",
  },
  22: {
    babySize: "a papaya",
    headline: "Week 22: Looking like a baby.",
    body: "Your baby's features are becoming distinctly human. They're sleeping and waking on a schedule.",
    normalSymptoms: ["Backache", "Swollen ankles", "Heartburn"],
    tip: "Invest in good shoes with arch support — your centre of gravity is shifting.",
  },
  23: {
    babySize: "a grapefruit",
    headline: "Week 23: Viability milestone.",
    body: "From around now, a baby born early has a chance of survival with specialist neonatal care — though the goal is always full term.",
    normalSymptoms: ["Increased fetal movement", "Skin itching", "Heartburn"],
    tip: "If your skin feels itchy on your abdomen, that's normal stretching — if itching spreads to hands and feet, tell your doctor.",
  },
  24: {
    babySize: "an ear of corn",
    headline: "Week 24: Glucose screening.",
    body: "This week you'll likely have a glucose tolerance test to screen for gestational diabetes.",
    normalSymptoms: ["Backache", "Swollen hands/feet", "Shortness of breath"],
    tip: "Eat a balanced meal the night before the glucose test — don't fast unless specifically told to.",
  },
  25: {
    babySize: "a head of cauliflower",
    headline: "Week 25: Gaining strength.",
    body: "Your baby is filling out and gaining the fat layers that will keep them warm after birth.",
    normalSymptoms: ["Symphysis pubis pain (SPD)", "Heartburn", "Leg cramps"],
    tip: "If you feel pelvic pain when walking or turning over in bed, mention it at your next appointment — SPD is treatable.",
  },
  26: {
    babySize: "a zucchini",
    headline: "Week 26: Eyes begin to open.",
    body: "Your baby's eyelids are opening for the first time. They can respond to light filtering through the uterus.",
    normalSymptoms: ["Braxton Hicks increasing", "Trouble sleeping", "Heartburn"],
    tip: "Start thinking about your birth plan — not to be rigid, but to know your preferences.",
  },
  27: {
    babySize: "a head of lettuce",
    headline: "Week 27: Third trimester soon.",
    body: "Your baby's lungs are maturing and they're practising breathing motions with amniotic fluid.",
    normalSymptoms: ["Restless legs at night", "Heartburn", "Increased urination"],
    tip: "Ask about antenatal classes if you haven't enrolled — they book up quickly.",
  },
  28: {
    babySize: "an eggplant",
    headline: "Week 28: Third trimester begins.",
    body: "You've entered the final stretch. Your baby's brain is developing rapidly and they can dream during REM sleep.",
    normalSymptoms: ["Backache", "Shortness of breath", "Braxton Hicks"],
    tip: "Start doing kick counts — 10 movements within 2 hours after a meal is a reassuring baseline.",
  },
  29: {
    babySize: "a butternut squash",
    headline: "Week 29: Getting into position.",
    body: "Your baby may start turning head-down in preparation for birth. There's less room to move but you should still feel regular kicks.",
    normalSymptoms: ["Rib pain (baby kicking up)", "Heartburn", "Haemorrhoids"],
    tip: "Sleep on your left side to improve blood flow to the placenta.",
  },
  30: {
    babySize: "a cabbage",
    headline: "Week 30: Ten weeks to go.",
    body: "Your baby's bone marrow is now producing red blood cells. Their eyes are open when awake and closed when sleeping.",
    normalSymptoms: ["Fatigue returning", "Shortness of breath", "Pelvic pressure"],
    tip: "Prepare your hospital bag — aim to have it ready by week 36.",
  },
  31: {
    babySize: "a coconut",
    headline: "Week 31: Rapid brain growth.",
    body: "Your baby's brain is forming billions of connections. They can process information from all five senses.",
    normalSymptoms: ["Frequent urination", "Heartburn", "Swelling"],
    tip: "Reduce heartburn by eating smaller meals more frequently and avoiding lying down right after eating.",
  },
  32: {
    babySize: "a jicama",
    headline: "Week 32: Practicing breathing.",
    body: "Your baby is practising rhythmic breathing movements and swallowing amniotic fluid to prepare their digestive system.",
    normalSymptoms: ["Braxton Hicks increasing", "Pelvic pressure", "Fatigue"],
    tip: "Start learning about the stages of labour so nothing feels completely unfamiliar.",
  },
  33: {
    babySize: "a pineapple",
    headline: "Week 33: Keeping warm.",
    body: "Your baby is rapidly accumulating fat, softening their skin and helping them regulate temperature after birth.",
    normalSymptoms: ["Shortness of breath", "Backache", "Difficulty sleeping"],
    tip: "A pregnancy pillow can significantly improve sleep comfort in the third trimester.",
  },
  34: {
    babySize: "a cantaloupe",
    headline: "Week 34: Lungs almost ready.",
    body: "If your baby were born now, their lungs would be nearly mature. They're also developing their sleep-wake cycles.",
    normalSymptoms: ["Pelvic pressure", "Swelling", "Braxton Hicks"],
    tip: "Discuss your Group B Strep screening test with your provider — it's typically done around weeks 35–37.",
  },
  35: {
    babySize: "a honeydew melon",
    headline: "Week 35: Almost full term.",
    body: "Your baby's kidneys and liver are fully developed. They're in a head-down position in most pregnancies by now.",
    normalSymptoms: ["Pelvic pain / lightning crotch", "Nesting urge", "Swelling"],
    tip: "If you feel a sudden, sharp electric sensation in your pelvis, that's normal — it's called lightning crotch.",
  },
  36: {
    babySize: "a head of romaine",
    headline: "Week 36: Hospital bag ready.",
    body: "Your baby is considered late preterm. Many essential developments are complete, though the final weeks add important finishing touches.",
    normalSymptoms: ["Easier breathing (baby dropping)", "Increased pelvic pressure", "Frequent urination"],
    tip: "Your hospital bag should be packed and by the door this week.",
  },
  37: {
    babySize: "a swiss chard bunch",
    headline: "Week 37: Early term.",
    body: "Your baby is now considered early term. The final weeks add brain and lung maturity that matter for long-term health.",
    normalSymptoms: ["Increased discharge (mucus plug)", "Strong Braxton Hicks", "Nesting"],
    tip: "Know the signs of labour: regular contractions, water breaking, bloody show.",
  },
  38: {
    babySize: "a leek",
    headline: "Week 38: Any day now.",
    body: "Your baby's organ systems are all ready for life outside the womb. They're shedding the waxy vernix coating.",
    normalSymptoms: ["Cervical pressure", "Increased discharge", "Loose stools (labour prep)"],
    tip: "Rest as much as possible — you're preparing for a marathon.",
  },
  39: {
    babySize: "a watermelon",
    headline: "Week 39: Full term.",
    body: "Your baby is full term. Their brain and lungs continue maturing right up to birth. Babies born now do as well as those born at 40 weeks.",
    normalSymptoms: ["Strong Braxton Hicks", "Cervical dilation beginning", "Nesting urge"],
    tip: "Eat dates — research shows they may help shorten labour duration.",
  },
  40: {
    babySize: "a small pumpkin",
    headline: "Week 40: Due date.",
    body: "Your due date has arrived. Only 5% of babies arrive exactly on their due date — try to stay relaxed and trust your body.",
    normalSymptoms: ["Strong contractions or none yet", "Cervical changes", "Anxiety is normal"],
    tip: "If you go past 40 weeks, your provider will discuss induction options with you — this is routine.",
  },
};

// ----------------------------------------------------------------
// Postpartum weeks 1–52
// Structure: postpartumWeeks[weekNumber] = PostpartumWeekContent
// ----------------------------------------------------------------
export const postpartumWeeks: Record<number, PostpartumWeekContent> = {
  1: {
    headline: "Week 1: The fourth trimester begins.",
    body: "Your body has just done something extraordinary. Rest is not laziness — it is medicine. Let people help you.",
    normalSymptoms: ["Heavy bleeding (lochia)", "Perineal soreness", "Afterpains during nursing"],
    tip: "Accept every offer of help. You cannot recover and care for a newborn alone.",
  },
  2: {
    headline: "Week 2: Baby blues are common.",
    body: "Many women feel weepy or overwhelmed in week 2 as hormones shift dramatically. This is different from postpartum depression.",
    normalSymptoms: ["Emotional swings", "Night sweats", "Breast engorgement"],
    tip: "Baby blues typically resolve by week 3. If sadness persists beyond 2 weeks or feels unmanageable, reach out to your provider.",
  },
  3: {
    headline: "Week 3: Finding a rhythm.",
    body: "You and your baby are slowly establishing patterns. Sleep deprivation is hardest now — any sleep you can get counts.",
    normalSymptoms: ["Cluster feeding phases", "Hair shedding beginning", "Emotional sensitivity"],
    tip: "Sleep when the baby sleeps is genuinely the best advice. Dishes can wait.",
  },
  4: {
    headline: "Week 4: Your 6-week check is coming.",
    body: "Your uterus has returned to close to its pre-pregnancy size. Your 6-week postpartum check-up is approaching.",
    normalSymptoms: ["Lighter lochia", "Continued breast tenderness", "Mood fluctuations"],
    tip: "Write down questions for your 6-week appointment — contraception, return to exercise, and mental health are all worth raising.",
  },
  5: {
    headline: "Week 5: Physical healing continues.",
    body: "Most physical wounds are healing. Your pelvic floor needs gentle, consistent attention.",
    normalSymptoms: ["Perineal discomfort reducing", "Fatigue", "Joint looseness from relaxin"],
    tip: "Start gentle pelvic floor exercises (Kegels) if you haven't — even 5 minutes a day makes a difference.",
  },
  6: {
    headline: "Week 6: 6-week check-up.",
    body: "Your postpartum appointment typically happens this week. Be honest with your provider about your mental health, not just your physical recovery.",
    normalSymptoms: ["Physical healing largely complete", "Fatigue", "Emotional adjustment"],
    tip: "Bring your birth partner or a trusted person to this appointment if you can — they can add context your provider may find useful.",
  },
  7: {
    headline: "Week 7: Returning to movement.",
    body: "If your provider gave you clearance at your 6-week check, you can begin returning to exercise gradually.",
    normalSymptoms: ["Core weakness", "Hair loss peaking", "Fatigue"],
    tip: "Start with walking before anything high-impact. Your pelvic floor needs to be reconditioned first.",
  },
  8: {
    headline: "Week 8: Two months in.",
    body: "You've been a parent for two months. Your baby is becoming more alert and social — and starting to recognise your face.",
    normalSymptoms: ["Hair shedding continuing", "Mood shifts", "Fatigue persisting"],
    tip: "If you are breastfeeding and experiencing pain, a lactation consultant can help — pain is not inevitable.",
  },
  9: {
    headline: "Week 9: Social smiles.",
    body: "Your baby is likely giving you their first real social smiles. These are a meaningful developmental milestone.",
    normalSymptoms: ["Growth spurt feeding", "Sleep regression possible", "Emotional sensitivity"],
    tip: "Growth spurts cause intense cluster feeding for 2–3 days, then it settles. It doesn't mean your supply is low.",
  },
  10: {
    headline: "Week 10: You're doing well.",
    body: "Ten weeks of newborn life is a significant achievement. Your nervous system has been under sustained stress — rest and connection matter.",
    normalSymptoms: ["Sleep deprivation effects", "Mood variability", "Physical fatigue"],
    tip: "Postpartum depression can emerge any time in the first year — not only at birth. If you feel persistently low, please reach out.",
  },
  11: {
    headline: "Week 11: Finding yourself again.",
    body: "Many mothers begin noticing their sense of self returning this week. Your identity is expanding, not disappearing.",
    normalSymptoms: ["Return of menstruation possible (if not breastfeeding)", "Fatigue", "Body image adjustments"],
    tip: "Do one thing each week that is for you alone — even 30 minutes of reading or a walk without the baby.",
  },
  12: {
    headline: "Week 12: Three months postpartum.",
    body: "The fourth trimester is officially complete. Your baby is becoming a social, interactive person. You've navigated the hardest stretch.",
    normalSymptoms: ["Increasing energy for many", "Emotional stabilising", "Return of period possible"],
    tip: "Connect with other mothers in your community — the isolation of new parenthood is real and connection is protective.",
  },
};

// Fill remaining postpartum weeks 13–52 with placeholder content
// Content team: replace each placeholder with reviewed copy
for (let w = 13; w <= 52; w++) {
  if (!postpartumWeeks[w]) {
    const month = Math.ceil(w / 4.33);
    postpartumWeeks[w] = {
      headline: `Week ${w}: Month ${month} of your postpartum journey.`,
      body: "Your detailed week guide is being written by our team and will be available soon.",
      normalSymptoms: ["Content coming soon", "Check back next week", "Reach out to your provider for specific concerns"],
      tip: "You are doing better than you think.",
    };
  }
}
