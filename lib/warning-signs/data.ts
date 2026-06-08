import type { JourneyStage } from "@/lib/timeline/types";

export type Severity = "emergency" | "booking" | "monitor";

export interface WarnSign {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  advice: string;
}

export interface WarnCategory {
  category: string;
  items: WarnSign[];
}

// ─── PREGNANT ───────────────────────────────────────────────────
const pregnantSigns: WarnCategory[] = [
  {
    category: "Bleeding & Fluid",
    items: [
      {
        id: "ws_p_heavy_bleeding",
        title: "Heavy vaginal bleeding",
        description: "Bleeding that soaks through a pad in an hour or is accompanied by severe pain.",
        severity: "emergency",
        advice: "Heavy bleeding in pregnancy is always an emergency. Go to your nearest emergency room or call 911 immediately. Do not drive yourself.",
      },
      {
        id: "ws_p_spotting",
        title: "Light spotting",
        description: "A few drops of blood or pink/brown discharge, especially after sex or an internal exam.",
        severity: "monitor",
        advice: "Light spotting can be normal, especially in early pregnancy or after intercourse. Monitor it closely. If it increases, becomes bright red, or is accompanied by cramping, contact your provider.",
      },
      {
        id: "ws_p_waters_breaking",
        title: "Water breaking / fluid gush",
        description: "A sudden gush or constant trickle of clear or pale yellow fluid from the vagina.",
        severity: "emergency",
        advice: "If your waters break before 37 weeks, go to hospital immediately — this is preterm premature rupture of membranes (PPROM). After 37 weeks, call your provider right away and go to hospital within the hour.",
      },
      {
        id: "ws_p_watery_discharge",
        title: "Unusual watery discharge",
        description: "A continuous trickle of fluid that is different from normal discharge — may be hard to distinguish from urine.",
        severity: "booking",
        advice: "Use a pad and note the colour and smell. Clear, odourless fluid that keeps coming may be amniotic fluid leaking. Contact your provider or go to labour and delivery to have it checked.",
      },
    ],
  },
  {
    category: "Pain & Pressure",
    items: [
      {
        id: "ws_p_severe_abdo",
        title: "Severe abdominal pain",
        description: "Sharp, constant pain that does not ease with rest or position change.",
        severity: "emergency",
        advice: "Severe, unrelenting abdominal pain can indicate placental abruption or another serious condition. This is an emergency — call 911 or go to hospital immediately.",
      },
      {
        id: "ws_p_round_ligament",
        title: "Sharp side pain when moving",
        description: "Brief, sharp pain in the lower abdomen or groin when you stand, roll over, or sneeze.",
        severity: "monitor",
        advice: "This is most likely round ligament pain — a normal part of your uterus growing. It typically lasts only a few seconds. Rest and slow your movements. Mention it to your provider at the next visit.",
      },
      {
        id: "ws_p_pelvic_pressure",
        title: "Intense pelvic pressure",
        description: "A heavy, bearing-down feeling in your pelvis, as if the baby is pushing down hard.",
        severity: "booking",
        advice: "Before 37 weeks, intense pelvic pressure combined with back pain or regular tightening can be a sign of preterm labour. Contact your provider promptly. After 37 weeks, this is often normal as the baby descends.",
      },
      {
        id: "ws_p_back_pain",
        title: "Severe lower back pain",
        description: "Intense, rhythmic back pain that does not ease, especially combined with pelvic cramping.",
        severity: "booking",
        advice: "Rhythmic back pain can be a sign of back labour or preterm labour. If it is regular (every 5–10 minutes), contact your provider or go to labour and delivery.",
      },
    ],
  },
  {
    category: "Head, Vision & Blood Pressure",
    items: [
      {
        id: "ws_p_severe_headache",
        title: "Severe, sudden headache",
        description: "A headache that comes on suddenly and feels different from any headache you have had before — often described as 'the worst headache of my life'.",
        severity: "emergency",
        advice: "A sudden, severe headache in pregnancy can be a sign of pre-eclampsia or, rarely, a stroke. Go to hospital immediately. Do not wait to see if it passes.",
      },
      {
        id: "ws_p_vision_changes",
        title: "Visual disturbances",
        description: "Seeing flashing lights, spots, blurred vision, or temporary loss of vision.",
        severity: "emergency",
        advice: "Vision changes are a red flag for pre-eclampsia. This is an emergency — go to hospital now. Pre-eclampsia can progress rapidly.",
      },
      {
        id: "ws_p_sudden_swelling",
        title: "Sudden face or hand swelling",
        description: "Rapid, significant swelling in your face, hands, or feet that appears suddenly — especially in the third trimester.",
        severity: "booking",
        advice: "Sudden or severe swelling, especially with headache or vision changes, can indicate pre-eclampsia. Contact your provider today. Some swelling in feet is normal; face and hand swelling is not.",
      },
      {
        id: "ws_p_ringing_ears",
        title: "Ringing in ears with headache",
        description: "Ringing or buzzing in your ears, especially combined with a headache or visual disturbance.",
        severity: "emergency",
        advice: "Ringing in the ears alongside headache or visual changes is a warning sign of severe pre-eclampsia. Go to hospital immediately.",
      },
    ],
  },
  {
    category: "Baby's Movement",
    items: [
      {
        id: "ws_p_decreased_movement",
        title: "Decreased fetal movement",
        description: "Noticeably fewer kicks or movements than is usual for your baby — after week 20.",
        severity: "booking",
        advice: "Trust your instincts. If your baby is moving less than usual, drink something cold and sweet, lie on your left side, and count movements for two hours. Fewer than 10 movements in two hours — contact your provider or go to labour and delivery. Never wait until the next day.",
      },
      {
        id: "ws_p_no_movement",
        title: "No movement felt for several hours",
        description: "You have felt no fetal movement at all for more than 12 hours, after a time when movement was established.",
        severity: "emergency",
        advice: "Go to labour and delivery now. Absence of fetal movement is always taken seriously and requires a non-stress test. Do not wait for a scheduled appointment.",
      },
    ],
  },
  {
    category: "Signs of Labour (Before 37 Weeks)",
    items: [
      {
        id: "ws_p_preterm_contractions",
        title: "Regular contractions before 37 weeks",
        description: "Contractions or tightenings coming every 10 minutes or more frequently, before you reach 37 weeks.",
        severity: "emergency",
        advice: "Regular contractions before 37 weeks may indicate preterm labour. Go to hospital immediately. Time the contractions and note any other symptoms (bleeding, fluid, back pain).",
      },
      {
        id: "ws_p_mucus_plug",
        title: "Passing the mucus plug",
        description: "A thick, jelly-like discharge — sometimes tinged pink or brown — that comes out in one or several pieces.",
        severity: "monitor",
        advice: "Losing your mucus plug is a normal sign that your cervix is beginning to prepare for labour. It can happen days or weeks before labour starts. No action needed unless you are before 37 weeks or have other symptoms — then contact your provider.",
      },
    ],
  },
  {
    category: "General Symptoms",
    items: [
      {
        id: "ws_p_fever",
        title: "Fever above 38°C (100.4°F)",
        description: "A temperature above 38°C that does not respond to paracetamol within a few hours.",
        severity: "booking",
        advice: "Fever in pregnancy requires evaluation to rule out infection. Take paracetamol (acetaminophen) and contact your provider or urgent care today. Do not take ibuprofen in pregnancy.",
      },
      {
        id: "ws_p_itching",
        title: "Intense itching — hands and feet",
        description: "Severe itching on the palms of hands and soles of feet, especially at night, without a rash.",
        severity: "booking",
        advice: "Intense itching on hands and feet — particularly without a rash — can be a sign of obstetric cholestasis (intrahepatic cholestasis of pregnancy), a liver condition that requires monitoring. Contact your provider within 24 hours.",
      },
      {
        id: "ws_p_burning_urination",
        title: "Burning or pain when urinating",
        description: "Pain, burning, or urgency when passing urine, with or without cloudy or smelly urine.",
        severity: "booking",
        advice: "This is likely a urinary tract infection (UTI), which are common in pregnancy and must be treated promptly — untreated UTIs can cause preterm labour. Contact your provider for a urine test and antibiotics.",
      },
      {
        id: "ws_p_vomiting",
        title: "Severe vomiting or inability to keep fluids down",
        description: "Vomiting so frequently that you cannot keep any fluid down for more than 12–24 hours.",
        severity: "booking",
        advice: "Severe dehydration in pregnancy is dangerous. If you cannot keep any fluids down for 12 hours or more, contact your provider or go to urgent care. You may need IV fluids.",
      },
    ],
  },
  {
    category: "Mental Health",
    items: [
      {
        id: "ws_p_intrusive_thoughts",
        title: "Intrusive or frightening thoughts",
        description: "Thoughts about harming yourself or your baby that feel distressing and out of your control.",
        severity: "booking",
        advice: "Intrusive thoughts are more common in pregnancy than many women know. They are not a sign you will act on them — but they deserve care. Please tell your midwife, doctor, or a trusted person. You do not need to manage this alone.",
      },
      {
        id: "ws_p_persistent_low_mood",
        title: "Persistent low mood or inability to function",
        description: "Feeling unable to get through daily tasks, persistent crying, feeling nothing, or feeling that things would be better without you.",
        severity: "booking",
        advice: "Antenatal depression affects 1 in 10 pregnant women. Please reach out to your provider — effective support is available. If you are having thoughts of suicide, call Talk Suicide Canada: 1-833-456-4566 (24/7, free).",
      },
    ],
  },
];

// ─── POSTPARTUM ──────────────────────────────────────────────────
const postpartumSigns: WarnCategory[] = [
  {
    category: "Bleeding & Physical Recovery",
    items: [
      {
        id: "ws_pp_heavy_bleeding",
        title: "Soaking more than one pad per hour",
        description: "Postpartum bleeding (lochia) that is soaking through a pad faster than once per hour, or passing large clots.",
        severity: "emergency",
        advice: "Heavy postpartum bleeding is a medical emergency. Call 911 or go to hospital immediately. While waiting, lie down, massage your uterus firmly just below your navel, and have someone stay with you.",
      },
      {
        id: "ws_pp_foul_lochia",
        title: "Foul-smelling lochia",
        description: "Vaginal discharge after birth that has a strong, unpleasant odour.",
        severity: "booking",
        advice: "Foul-smelling lochia can indicate a uterine infection (endometritis). Contact your provider today. Signs of infection include fever, lower abdominal pain, and discharge that smells bad.",
      },
      {
        id: "ws_pp_wound_signs",
        title: "C-section or perineal wound concerns",
        description: "Redness, swelling, warmth, pus, or separation of stitches at your wound site.",
        severity: "booking",
        advice: "These are signs of wound infection. Contact your provider today. Keep the area clean and dry. Do not apply anything to the wound without medical advice.",
      },
    ],
  },
  {
    category: "Signs of Infection",
    items: [
      {
        id: "ws_pp_fever",
        title: "Fever above 38°C (100.4°F)",
        description: "A temperature above 38°C in the first weeks after birth.",
        severity: "booking",
        advice: "Postpartum fever can indicate infection — uterine, wound, or mastitis. Contact your provider today. Take paracetamol and rest. If you have a fever above 39°C with chills or feel very unwell, go to hospital.",
      },
      {
        id: "ws_pp_mastitis",
        title: "Painful, hot, red area on breast",
        description: "A wedge-shaped area of redness and heat on one breast, with pain and possibly flu-like symptoms.",
        severity: "booking",
        advice: "This is likely mastitis — a breast infection common in breastfeeding women. Continue nursing if possible (it won't harm your baby). Contact your provider for antibiotics. Rest, fluids, and warm compresses help.",
      },
      {
        id: "ws_pp_uti",
        title: "Burning or pain when urinating",
        description: "Pain or burning when urinating, or feeling you need to urinate constantly.",
        severity: "booking",
        advice: "UTIs are common after birth, especially after catheter use. Contact your provider for a urine test. Drink plenty of water.",
      },
    ],
  },
  {
    category: "Head & Blood Pressure",
    items: [
      {
        id: "ws_pp_headache",
        title: "Severe headache in the first weeks",
        description: "A severe headache that starts suddenly in the first 6 weeks after birth.",
        severity: "emergency",
        advice: "Pre-eclampsia can develop in the postpartum period, particularly in the first 2 weeks. A sudden, severe headache — especially with visual changes or swelling — is an emergency. Go to hospital now.",
      },
      {
        id: "ws_pp_vision",
        title: "Visual disturbances",
        description: "Seeing spots, flashing lights, or blurred vision after birth.",
        severity: "emergency",
        advice: "Visual disturbances in the postpartum period are a sign of postpartum pre-eclampsia. This is an emergency — go to hospital immediately.",
      },
    ],
  },
  {
    category: "Blood Clots (DVT / PE)",
    items: [
      {
        id: "ws_pp_leg_pain",
        title: "Calf pain, swelling, or redness",
        description: "One leg — especially the calf — feels painful, swollen, warm, or red.",
        severity: "emergency",
        advice: "This could be a deep vein thrombosis (DVT). Blood clots are a leading cause of postpartum death. Go to hospital immediately — do not massage the leg or try to walk it off.",
      },
      {
        id: "ws_pp_chest_pain",
        title: "Chest pain or difficulty breathing",
        description: "Sudden chest pain, shortness of breath, or feeling faint.",
        severity: "emergency",
        advice: "This may be a pulmonary embolism (blood clot in the lungs). Call 911 immediately. This is life-threatening and requires emergency care.",
      },
    ],
  },
  {
    category: "Mental Health",
    items: [
      {
        id: "ws_pp_ppd",
        title: "Persistent sadness beyond two weeks",
        description: "Feeling persistently sad, empty, or hopeless for more than two weeks after birth.",
        severity: "booking",
        advice: "Postpartum depression affects 1 in 5 new mothers and is treatable. Please tell your provider or a trusted person. You are not a bad mother for feeling this way — your brain chemistry is adjusting after a major hormonal shift.",
      },
      {
        id: "ws_pp_anxiety",
        title: "Overwhelming anxiety or panic attacks",
        description: "Racing thoughts, feeling unable to breathe or that something terrible is about to happen, constant worry about the baby.",
        severity: "booking",
        advice: "Postpartum anxiety is as common as postpartum depression and equally deserving of care. Please speak to your provider. Talk Suicide Canada: 1-833-456-4566 (24/7, free) and PSI Helpline: 1-800-944-4773.",
      },
      {
        id: "ws_pp_psychosis",
        title: "Confusion, hallucinations, or bizarre thoughts",
        description: "Hearing or seeing things that aren't there, feeling like you are someone else, or having thoughts that feel very strange or frightening.",
        severity: "emergency",
        advice: "Postpartum psychosis is a psychiatric emergency affecting 1 in 1,000 mothers. It comes on rapidly — usually in the first two weeks. Call 911 or take the person to hospital immediately. With treatment, full recovery is the norm.",
      },
      {
        id: "ws_pp_self_harm",
        title: "Thoughts of harming yourself or your baby",
        description: "Thoughts about not wanting to be alive, or fears of hurting your baby.",
        severity: "emergency",
        advice: "Please reach out now. Call Talk Suicide Canada: 1-833-456-4566 (24/7, free, confidential). If you or your baby is in immediate danger, call 911. You deserve care and support — this is a medical situation, not a moral failure.",
      },
    ],
  },
  {
    category: "General Postpartum",
    items: [
      {
        id: "ws_pp_difficulty_urinating",
        title: "Unable to urinate in the first 24 hours",
        description: "Inability to pass urine within 6–8 hours after birth.",
        severity: "booking",
        advice: "Urinary retention is common after childbirth, especially after epidural. If you have not urinated within 6–8 hours of delivery, tell your nurse or midwife immediately.",
      },
      {
        id: "ws_pp_perineal_pain",
        title: "Severe perineal pain worsening over time",
        description: "Pain at your stitches or perineum that is getting worse, not better, after the first few days.",
        severity: "booking",
        advice: "Some perineal discomfort is normal but it should gradually improve. Worsening pain may indicate infection or a haematoma. Contact your provider or midwife.",
      },
    ],
  },
];

// ─── TTC ─────────────────────────────────────────────────────────
const ttcSigns: WarnCategory[] = [
  {
    category: "Cycle Irregularities",
    items: [
      {
        id: "ws_ttc_no_period",
        title: "No period for 3 or more months",
        description: "Your period has stopped coming, and you are not pregnant.",
        severity: "booking",
        advice: "Amenorrhoea (absent periods) has many causes — stress, thyroid issues, PCOS, low body weight, or perimenopause. It always warrants a medical evaluation if it has been 3+ months. See your doctor for bloodwork.",
      },
      {
        id: "ws_ttc_very_irregular",
        title: "Cycles shorter than 21 or longer than 35 days",
        description: "Your periods are consistently very short or very long, or highly unpredictable.",
        severity: "booking",
        advice: "Irregular cycles can make conception harder and may indicate a hormonal imbalance such as PCOS or thyroid dysfunction. Track your cycles and share the data with your doctor.",
      },
      {
        id: "ws_ttc_heavy_periods",
        title: "Extremely heavy periods",
        description: "Soaking through a pad or tampon every 1–2 hours, or passing clots larger than a 50-cent piece.",
        severity: "booking",
        advice: "Very heavy periods can indicate fibroids, polyps, or a clotting condition — all of which can affect fertility. See your doctor for an evaluation including ultrasound and bloodwork.",
      },
      {
        id: "ws_ttc_severe_cramps",
        title: "Severe period pain that affects daily life",
        description: "Menstrual cramps severe enough to prevent you from working, exercising, or functioning normally.",
        severity: "booking",
        advice: "Severe dysmenorrhoea can be a sign of endometriosis, which affects 1 in 10 women and is a common cause of fertility challenges. Please see a gynaecologist — earlier diagnosis leads to better outcomes.",
      },
    ],
  },
  {
    category: "Pain & Pelvic Symptoms",
    items: [
      {
        id: "ws_ttc_pelvic_pain",
        title: "Chronic pelvic pain outside of your period",
        description: "Ongoing pain in the lower abdomen or pelvis that is present between periods.",
        severity: "booking",
        advice: "Chronic pelvic pain can indicate endometriosis, ovarian cysts, or pelvic inflammatory disease (PID). It should always be investigated. See your doctor.",
      },
      {
        id: "ws_ttc_pain_sex",
        title: "Pain during or after sex",
        description: "Consistent pain deep inside the pelvis during or after sexual intercourse.",
        severity: "booking",
        advice: "Painful sex (dyspareunia) is not normal and should not be accepted. It can indicate endometriosis, ovarian cysts, or pelvic floor dysfunction. Please speak to your doctor — this is treatable.",
      },
      {
        id: "ws_ttc_ovulation_pain",
        title: "Sharp one-sided pain mid-cycle",
        description: "A brief, sharp pain on one side of your lower abdomen, usually around day 14 of your cycle.",
        severity: "monitor",
        advice: "Mid-cycle one-sided pain is often Mittelschmerz — normal ovulation pain. It typically lasts minutes to a few hours. If it is very intense, lasts more than a day, or is accompanied by fever or vomiting, see a doctor.",
      },
    ],
  },
  {
    category: "Signs to Discuss with a Doctor",
    items: [
      {
        id: "ws_ttc_12_months",
        title: "Trying for 12 months without success (under 35)",
        description: "You have been having regular unprotected sex for a year without conceiving.",
        severity: "booking",
        advice: "After 12 months without conception (6 months if you are over 35), fertility evaluation is recommended for both partners. This is not a failure — it is a medical threshold that unlocks investigation and support.",
      },
      {
        id: "ws_ttc_6_months_35",
        title: "Trying for 6 months without success (over 35)",
        description: "You are 35 or older and have been trying for 6 months without conceiving.",
        severity: "booking",
        advice: "The recommended threshold for seeking fertility evaluation is 6 months at age 35 or older — not 12 months. See your doctor now to start the conversation.",
      },
      {
        id: "ws_ttc_thyroid",
        title: "Fatigue, hair loss, weight changes, or feeling cold",
        description: "A cluster of symptoms suggesting possible thyroid dysfunction.",
        severity: "booking",
        advice: "Thyroid disorders are common in women and can significantly affect fertility and pregnancy. A simple blood test (TSH) can check your thyroid function. Ask your doctor to include this in any pre-conception bloodwork.",
      },
    ],
  },
];

// ─── Lookup by stage ─────────────────────────────────────────────
export function getWarningSigns(stage: JourneyStage): WarnCategory[] {
  if (stage === "pregnant") return pregnantSigns;
  if (stage === "postpartum") return postpartumSigns;
  return ttcSigns;
}
