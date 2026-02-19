'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

console.log('Health Buddy script loaded');

// Set dark theme by default
document.documentElement.setAttribute('data-theme', 'dark');



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Get the "Doctors Near Me" link element
const doctorsLink = document.getElementById('doctors-link');

// Add a click event listener to the link
if (doctorsLink) {
  doctorsLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior

    // Add a class to the link to show the tooltip
    doctorsLink.classList.add('show-tooltip');

    // Create a new tooltip element
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.innerText = 'Coming Soon';

    // Append the tooltip element to the link element
    doctorsLink.appendChild(tooltip);

    // Remove the tooltip after 3 seconds
    setTimeout(() => {
      doctorsLink.removeChild(tooltip);
      doctorsLink.classList.remove('show-tooltip');
    }, 500);
  });
}

/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

if (slider && sliderContainer) {
  let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  if (sliderNextBtn) {
    sliderNextBtn.addEventListener("click", slideNext);
  }

  /**
   * PREVIOUS SLIDE
   */

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  if (sliderPrevBtn) {
    sliderPrevBtn.addEventListener("click", slidePrev);
  }

  /**
   * RESPONSIVE
   */
  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });
}



/**
 * MULTI-LANGUAGE SUPPORT
 */
let currentLanguage = 'en';

// Language translations
const translations = {
  en: {
    greeting: "Hello! I'm HealthBuddy Assistant. How can I help you today?",
    thanks: "You're welcome! Is there anything else I can help you with?",
    tumor: "We offer Brain Tumor Detection service. You can upload your CT scan and get analysis. Visit our tumor detection page for more information!",
    eye: "We provide Eye Disease Detection services. Our AI can analyze retina images to detect conditions like diabetic retinopathy. Check our Eye Disease Detection page!",
    lung: "Our Lung Disease Detector service is coming soon! Stay tuned for updates on lung disease detection.",
    appointment: "You can book an appointment through our Appointment page. Click on 'Appointment' in the navigation menu to schedule a visit.",
    contact: "You can find our contact information on the Contact page. Click on 'Contact' in the navigation menu to get in touch with us.",
    report: "Our Patient Report Analyzer service is coming soon! This feature will help analyze your medical reports.",
    about: "HealthBuddy is your personal healthcare companion. We offer various health services including tumor detection, eye disease detection, and more. How can I help you today?",
    help: "I can help you with information about our services like tumor detection, eye disease detection, appointment booking, and more. What would you like to know?",
    goodbye: "Goodbye! Thank you for using HealthBuddy. Stay healthy!",
    default: "I'm here to help! You can ask me about our services like tumor detection, eye disease detection, appointment booking, or contact information. What would you like to know?",
    // Medical symptoms - English
    fever: "It sounds like you may have a fever. Here's some advice:\n\n📋 **Suggestions:**\n• Check your temperature - if above 100.4°F (38°C), it's a fever\n• Stay hydrated and drink plenty of water\n• Rest as much as possible\n• Take fever-reducing medication if needed\n\n💊 **Common medications:**\n• Paracetamol (Acetaminophen) - 500mg every 4-6 hours\n• Ibuprofen - 200-400mg every 6-8 hours\n\n⚠️ **Warning:** If fever persists more than 3 days or exceeds 103°F (39.5°C), please consult a doctor immediately!",
    temperature: "For temperature-related concerns:\n\n🌡️ **Temperature Guide:**\n• Normal: 97°F - 99°F (36.1°C - 37.2°C)\n• Low grade fever: 99.5°F - 100.4°F (37.5°C - 38°C)\n• Fever: 100.4°F (38°C) and above\n• High fever: 103°F (39.5°C) and above\n\n📋 **What to do:**\n• If temperature is above 100.4°F, take fever-reducing medication\n• Stay hydrated\n• Use cold compress on forehead\n• Monitor temperature every 4 hours\n\n⚠️ **Seek medical help if:**\n• Temperature exceeds 103°F (39.5°C)\n• Fever lasts more than 3 days\n• Accompanied by severe headache, rash, or difficulty breathing",
    cold: "You may have a common cold. Here are some suggestions:\n\n📋 **Suggestions:**\n• Stay warm and get plenty of rest\n• Drink warm fluids like tea or soup\n• Use a humidifier\n• Gargle with warm salt water\n\n💊 **Common medications:**\n• Cetirizine (Zyrtec) - 10mg once daily for runny nose\n• Paracetamol - for headache/fever\n• Cough syrup - as needed\n\n⚠️ **Warning:** If symptoms last more than 10 days or worsen, see a doctor!",
    cough: "For cough relief, try these:\n\n📋 **Suggestions:**\n• Stay hydrated\n• Use honey (not for children under 1 year)\n• Avoid smoking or smoke areas\n• Use humidifier\n\n💊 **Common medications:**\n• Dextromethorphan syrup - for dry cough\n• Ambroxol/Bromhexine - for chest congestion\n• Honey and ginger tea\n\n⚠️ **Warning:** If cough persists more than 2 weeks or contains blood, consult a doctor!",
    headache: "For headache relief:\n\n📋 **Suggestions:**\n• Rest in a quiet, dark room\n• Apply cold compress to forehead\n• Stay hydrated\n• Avoid screen time\n\n💊 **Common medications:**\n• Paracetamol - 500mg as needed\n• Ibuprofen - 200-400mg as needed\n• Aspirin - 325mg (not for children)\n\n⚠️ **Warning:** If headache is severe, sudden, or with fever/stiff neck, seek immediate medical attention!",
    stomach: "For stomach issues:\n\n📋 **Suggestions:**\n• BRAT diet (Bananas, Rice, Applesauce, Toast)\n• Stay hydrated with small sips\n• Avoid dairy, fatty foods, and caffeine\n• Get plenty of rest\n\n💊 **Common medications:**\n• Antacid - for acidity\n• Omeprazole - 20mg before meals for acid\n• Loperamide (Imodium) - for diarrhea\n• Antiemetic - for nausea\n\n⚠️ **Warning:** If severe pain, blood in stool, or dehydration, consult a doctor immediately!",
    stomachPain: "For stomach pain:\n\n📋 **Suggestions:**\n• Rest and avoid strenuous activity\n• Apply warm compress to stomach\n• Drink clear fluids\n• Avoid solid food until pain subsides\n• Don't take aspirin or NSAIDs\n\n💊 **Common medications:**\n• Antacid - for acid/indigestion\n• Buscopan - for stomach cramps\n• Omeprazole - for acid reflux\n\n⚠️ **Warning:** Seek immediate medical attention if:\n• Severe or sharp pain\n• Blood in vomit or stool\n• High fever with stomach pain\n• Unable to pass gas or stool",
    bodyPain: "For body pain/myalgia:\n\n📋 **Suggestions:**\n• Rest and get adequate sleep\n• Apply warm compress\n• Light stretching exercises\n\n💊 **Common medications:**\n• Ibuprofen - 400mg as needed\n• Paracetamol - 500mg as needed\n• Muscle relaxants if prescribed\n\n⚠️ **Warning:** If pain is severe or accompanied by swelling, consult a doctor!",
    throat: "For sore throat:\n\n📋 **Suggestions:**\n• Gargle with warm salt water\n• Drink warm liquids\n• Avoid smoking\n• Use humidifier\n\n💊 **Common medications:**\n• Paracetamol - for pain\n• Strepsils/lozenges\n• Betadine gargle\n\n⚠️ **Warning:** If severe pain, difficulty swallowing, or white patches, see a doctor!",
    allergy: "For allergies:\n\n📋 **Suggestions:**\n• Avoid known allergens\n• Keep windows closed\n• Use air purifier\n• Wash hands frequently\n\n💊 **Common medications:**\n• Cetirizine - 10mg once daily\n• Fexofenadine - 180mg once daily\n• Montelukast - for asthma-like symptoms\n\n⚠️ **Warning:** If breathing difficulty or severe reaction, seek emergency care!",
    // New symptoms - Diabetes
    diabetes: "For diabetes-related concerns:\n\n📋 **Common Symptoms:**\n• Frequent urination\n• Excessive thirst\n• Unexplained weight loss\n• Fatigue\n• Blurred vision\n• Slow-healing wounds\n\n📋 **Management Tips:**\n• Monitor blood sugar regularly\n• Follow a healthy diet (low sugar, high fiber)\n• Exercise regularly\n• Take medications as prescribed\n\n⚠️ **Warning:** If you experience severe hypoglycemia (shaking, sweating, confusion) or hyperglycemia (extreme thirst, frequent urination), seek medical attention immediately!",
    sugar: "For blood sugar concerns:\n\n🍬 **Normal Blood Sugar Levels:**\n• Fasting: 70-100 mg/dL\n• After meals: Less than 140 mg/dL\n• HbA1c: Below 5.7%\n\n📋 **Tips to Maintain Healthy Blood Sugar:**\n• Eat regular, balanced meals\n• Include fiber in your diet\n• Exercise regularly\n• Monitor carbohydrate intake\n• Stay hydrated\n\n⚠️ **Warning:** If you have symptoms of hypoglycemia (dizziness, sweating, confusion) or hyperglycemia, consult a doctor immediately!",
    // New symptoms - Blood Pressure
    bloodPressure: "For blood pressure concerns:\n\n❤️ **Blood Pressure Categories:**\n• Normal: Less than 120/80 mmHg\n• Elevated: 120-129/less than 80 mmHg\n• High BP Stage 1: 130-139/80-89 mmHg\n• High BP Stage 2: 140+/90+ mmHg\n\n📋 **Tips to Manage Blood Pressure:**\n• Reduce sodium intake\n• Exercise regularly\n• Maintain healthy weight\n• Limit alcohol\n• Manage stress\n\n⚠️ **Warning:** If BP is extremely high (180/120+) with symptoms like chest pain, shortness of breath, or vision changes, seek emergency care!",
    bp: "For blood pressure concerns:\n\n❤️ **Blood Pressure Categories:**\n• Normal: Less than 120/80 mmHg\n• Elevated: 120-129/less than 80 mmHg\n• High BP: 140/90 mmHg or higher\n\n📋 **Tips to Manage Blood Pressure:**\n• Reduce sodium intake\n• Exercise regularly\n• Maintain healthy weight\n• Limit alcohol\n• Manage stress\n\n⚠️ **Warning:** Seek immediate medical attention if you have severe headache, chest pain, or difficulty breathing!",
    // New symptoms - Heart
    heart: "For heart-related concerns:\n\n❤️ **Warning Signs of Heart Problems:**\n• Chest pain or discomfort\n• Shortness of breath\n• Pain in neck, jaw, or arm\n• Fatigue during activity\n• Irregular heartbeat\n\n📋 **Heart Health Tips:**\n• Eat a heart-healthy diet\n• Exercise regularly\n• Maintain healthy weight\n• Don't smoke\n• Limit alcohol\n\n⚠️ **EMERGENCY:** If you experience chest pain radiating to arm/jaw, severe shortness of breath, or sudden numbness, call emergency services immediately!",
    chestPain: "For chest pain:\n\n⚠️ **IMPORTANT:** Chest pain can be a sign of serious conditions!\n\n📋 **Possible Causes:**\n• Heart attack\n• Acid reflux\n• Muscle strain\n• Anxiety\n\n📋 **What to Do:**\n• Stop activity and rest\n• Take nitroglycerin if prescribed\n• If severe, call emergency\n\n🚨 **Seek Emergency Care If:**\n• Pain radiates to arm, jaw, or neck\n• Shortness of breath\n• Cold sweat, nausea\n• Pain lasts more than 5 minutes",
    // New symptoms - Breathing
    breathing: "For breathing difficulties:\n\n😮 **Possible Causes:**\n• Asthma\n• Anxiety/panic attack\n• Allergic reaction\n• Heart problems\n• Lung infection\n\n📋 **What to Do:**\n• Sit upright and stay calm\n• Use rescue inhaler if you have one\n• Loosen tight clothing\n• Drink warm water\n\n⚠️ **EMERGENCY:** If severe difficulty breathing, blue lips/fingernails, or chest pain, call emergency services immediately!",
    asthma: "For asthma concerns:\n\n😮 **Asthma Management:**\n• Use controller inhaler daily\n• Keep rescue inhaler handy\n• Avoid triggers (dust, smoke, pollen)\n• Monitor breathing with peak flow meter\n\n💊 **Common Medications:**\n• Rescue inhaler (Albuterol) - for acute symptoms\n• Controller inhaler (Fluticasone) - for prevention\n• Montelukast - for maintenance\n\n⚠️ **Emergency:** If inhaler doesn't help, or lips turn blue, seek emergency care!",
    // New symptoms - Nausea/Vomiting
    nausea: "For nausea and vomiting:\n\n🤢 **Suggestions:**\n• Sip clear fluids slowly\n• Eat bland foods (crackers, toast)\n• Avoid strong smells\n• Rest with head elevated\n• Ginger tea can help\n\n💊 **Common medications:**\n• Ondansetron (Zofran) - 4mg as needed\n• Domperidone - 10mg before meals\n• Antacid - for acid-related nausea\n\n⚠️ **Warning:** If vomiting persists more than 24 hours, contains blood, or accompanied by severe abdominal pain, see a doctor!",
    vomiting: "For vomiting:\n\n🤢 **What to Do:**\n• Stop eating solid food\n• Sip water or ORS solution slowly\n• Gradually introduce bland foods\n• Rest\n\n💊 **Medications:**\n• Ondansetron - 4mg as needed\n• Domperidone - 10mg before meals\n\n⚠️ **Warning:** Seek medical attention if:\n• Blood in vomit\n• Severe dehydration\n• Unable to keep fluids down\n• High fever",
    // New symptoms - Dizziness
    dizziness: "For dizziness/vertigo:\n\n😵 **Suggestions:**\n• Sit or lie down immediately\n• Avoid sudden movements\n• Stay hydrated\n• Get up slowly from sitting/lying\n• Avoid bright lights\n\n💊 **Common medications:**\n• Betahistine - for vertigo\n• Dimenhydrinate - for motion sickness\n• Vitamin B12 if deficient\n\n⚠️ **Warning:** If dizziness is severe, accompanied by chest pain, numbness, or difficulty speaking, seek immediate medical attention!",
    // New symptoms - Fatigue
    fatigue: "For fatigue/tiredness:\n\n😴 **Suggestions:**\n• Get 7-9 hours of sleep\n• Maintain regular sleep schedule\n• Exercise regularly\n• Eat a balanced diet\n• Stay hydrated\n• Manage stress\n\n📋 **Possible Causes:**\n• Anemia\n• Thyroid problems\n• Depression\n• Sleep disorders\n• Poor diet\n\n⚠️ **Warning:** If fatigue is persistent and unexplained, see a doctor for blood tests!",
    // New symptoms - Skin
    skin: "For skin concerns:\n\n🧴 **General Skin Care:**\n• Keep skin clean and moisturized\n• Use sunscreen daily\n• Avoid scratching\n• Wear loose cotton clothing\n\n📋 **Common Issues:**\n• Rashes: Apply calamine lotion, avoid irritants\n• Acne: Use gentle cleansers, don't squeeze\n• Dry skin: Use moisturizer, drink water\n\n⚠️ **Warning:** If rash spreads rapidly, accompanied by fever, or shows signs of infection (redness, pus), see a doctor!",
    rash: "For skin rash:\n\n🧴 **Suggestions:**\n• Apply cool compress\n• Use calamine lotion\n• Take antihistamine for itching\n• Avoid scratching\n• Wear loose clothing\n\n⚠️ **Warning:** Seek immediate medical if:\n• Rash spreads rapidly\n• Accompanied by breathing difficulty\n• Fever or joint pain\n• Blistering or peeling",
    // New symptoms - Dental
    dental: "For dental issues:\n\n🦷 **Suggestions:**\n• Rinse with warm salt water\n• Use pain relievers\n• Avoid very hot/cold foods\n• Maintain oral hygiene\n• Use clove oil for toothache\n\n💊 **Common medications:**\n• Ibuprofen - for pain\n• Antibiotics if infection (prescribed by dentist)\n• Oral gel (Orajel) for toothache\n\n⚠️ **Warning:** See a dentist if pain persists more than 2 days, swelling, or fever!",
    toothache: "For toothache:\n\n🦷 **Relief Tips:**\n• Rinse with warm salt water\n• Apply cold compress on cheek\n• Take pain relievers\n• Avoid chewing on affected side\n• Use clove oil\n\n⚠️ **Warning:** If swelling extends to face/neck, or fever, see a dentist immediately!",
    // New symptoms - Mental Health
    mental: "For mental health support:\n\n🧠 **General Tips:**\n• Practice deep breathing exercises\n• Maintain regular routine\n• Connect with loved ones\n• Limit screen time\n• Exercise regularly\n• Get adequate sleep\n\n📋 **Resources:**\n• Talk to someone you trust\n• Consider counseling/therapy\n• Contact mental health helpline\n\n⚠️ **Crisis Support:** If you're having thoughts of self-harm, please contact emergency services or a crisis hotline immediately!",
    anxiety: "For anxiety concerns:\n\n😰 **Coping Strategies:**\n• Practice deep breathing (4-7-8 technique)\n• Exercise regularly\n• Limit caffeine\n• Get adequate sleep\n• Try meditation/mindfulness\n• Talk to someone\n\n💊 **Medications (if prescribed):**\n• SSRIs (Escitalopram, Sertraline)\n• Benzodiazepines for acute anxiety (short-term)\n\n⚠️ **Warning:** If anxiety is severe or affecting daily life, consult a mental health professional!",
    depression: "For depression support:\n\n😔 **What to Know:**\n• Depression is treatable\n• You're not alone\n• Professional help is available\n\n📋 **Self-Care Tips:**\n• Maintain routine\n• Set small goals\n• Stay connected\n• Exercise regularly\n• Eat healthy\n• Seek professional help\n\n⚠️ **Crisis:** If having thoughts of self-harm, please reach out to:\n• Emergency: 112\n• Helpline: 988 (US)\n• Talk to someone now!",
    // New symptoms - Eye
    eye: "For eye problems:\n\n👁️ **Suggestions:**\n• Rest your eyes (20-20-20 rule)\n• Use artificial tears\n• Avoid rubbing eyes\n• Wear sunglasses outdoors\n• Keep screens at arm's length\n\n⚠️ **Warning:** Seek immediate medical attention if:\n• Sudden vision loss\n• Severe eye pain\n• Flashes or floaters\n• Eye injury",
    // New symptoms - Ear
    ear: "For ear problems:\n\n👂 **Suggestions:**\n• Keep ears dry\n• Avoid inserting objects in ear\n• Use warm compress\n• Don't use ear drops without doctor's advice\n\n💊 **Common medications:**\n• Pain relievers\n• Antibiotic ear drops (if bacterial infection)\n\n⚠️ **Warning:** If severe pain, hearing loss, dizziness, or discharge, see a doctor!",
    // New symptoms - Emergency
    emergency: "🚨 **EMERGENCY INFORMATION** 🚨\n\n**Call Emergency Services Immediately If:**\n• Chest pain radiating to arm/jaw\n• Difficulty breathing\n• Severe bleeding\n• Signs of stroke (face drooping, arm weakness, speech difficulty)\n• Severe allergic reaction\n• Loss of consciousness\n\n📞 **Emergency Numbers:**\n• Ambulance: 102 or 112\n• Police: 100\n• Fire: 101\n\n🏥 **Nearest Hospital:** Please check your local directory or ask me about hospital locations!",
    firstAid: "For first aid guidance:\n\n🩹 **Basic First Aid:**\n• **Cuts:** Clean with water, apply pressure, bandage\n• **Burns:** Run cool water, don't apply ice, cover loosely\n• **Sprains:** RICE - Rest, Ice, Compression, Elevation\n• **Choking:** Heimlich maneuver\n• **Nosebleed:** Pinch soft part of nose, lean forward\n\n⚠️ **For serious injuries, always seek professional medical help!**",
    // New symptoms - Period/Menstrual
    period: "For menstrual concerns:\n\n🩸 **Normal Period:**\n• Cycle: 21-35 days\n• Flow: 2-7 days\n• Regular bleeding is normal\n\n📋 **Tips:**\n• Use pain relievers for cramps\n• Apply heat to lower abdomen\n• Stay hydrated\n• Eat iron-rich foods\n\n💊 **Medications:**\n• Ibuprofen - for cramps\n• Mefenamic acid - for heavy bleeding\n\n⚠️ **See doctor if:** Extremely heavy bleeding, severe pain, or irregular cycles!",
    // New symptoms - Sleep
    sleep: "For sleep issues:\n\n😴 **Tips for Better Sleep:**\n• Maintain consistent sleep schedule\n• Create dark, cool environment\n• Avoid screens before bed\n• Limit caffeine after noon\n• Exercise regularly (not near bedtime)\n• Avoid large meals at night\n\n⚠️ **Warning:** If persistent insomnia, consult a doctor!",
    // New symptoms - Weight
    weight: "For weight concerns:\n\n⚖️ **Healthy Weight Tips:**\n• Balanced diet with portion control\n• Regular exercise (150 min/week)\n• Stay hydrated\n• Get adequate sleep\n• Manage stress\n\n⚠️ **Warning:** Sudden weight loss or gain without trying could indicate health issues. Consult a doctor!",
    // New symptoms - Thyroid
    thyroid: "For thyroid concerns:\n\n🧬 **Thyroid Basics:**\n• Controls metabolism\n• Common issues: Hypothyroidism (underactive) & Hyperthyroidism (overactive)\n\n📋 **Symptoms of Hypothyroidism:**\n• Fatigue, weight gain, cold intolerance\n\n📋 **Symptoms of Hyperthyroidism:**\n• Weight loss, rapid heartbeat, heat intolerance\n\n⚠️ **Note:** Thyroid issues require blood tests for diagnosis. Consult a doctor!",
    // Voice related
    listening: "Listening...",
    voiceNotSupported: "Voice input is not supported in your browser. Please type your message.",
    voiceError: "Sorry, I didn't catch that. Please try again or type your message."
  },
  hi: {
    greeting: "नमस्ते! मैं HealthBuddy Assistant हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    thanks: "आपका स्वागत है! क्या मैं आपकी और किसी तरह मदद कर सकता हूं?",
    tumor: "हम मस्तिष्क ट्यूमर सेवा प्रदान करते हैं। आप अपना CT स्कैन अपलोड कर विश्लेषण प्राप्त कर सकते हैं। अधिक जानकारी के लिए हमारे ट्यूमर पेज पर जाएं!",
    eye: "हम आंख की बीमारी का पता लगाने की सेवा प्रदान करते हैं। हमारी AI रेटिना छवियों का विश्लेषण कर मधुमेह रेटिनोपैथी जैसी स्थितियों का पता लगा सकती है।",
    lung: "हमारी फेफड़े की बीमारी डिटेक्टर सेवा जल्द आ रही है!",
    appointment: "आप अपॉइंटमेंट पेज पर जाकर अपॉइंटमेंट बुक करा सकते हैं।",
    contact: "आप संपर्क पेज पर हमारी जानकारी प्राप्त कर सकते हैं।",
    report: "हमारी रिपोर्ट विश्लेषक सेवा जल्द आ रही है!",
    about: "HealthBuddy आपका व्यक्तिगत स्वास्थ्य साथी है। हम ट्यूमर, आंख की बीमारी आदि सेवाएं प्रदान करते हैं।",
    help: "मैं ट्यूमर डिटेक्शन, आंख की बीमारी, अपॉइंटमेंट बुकिंग में मदद कर सकता हूं।",
    goodbye: "अलविदा! HealthBuddy का उपयोग करने के लिए धन्यवाद! स्वस्थ रहें!",
    default: "मैं मदद के लिए यहां हूं! आप ट्यूमर डिटेक्शन, आंख की बीमारी, अपॉइंटमेंट के बारे में पूछ सकते हैं।",
    // Medical symptoms - Hindi
    fever: "ऐसा लगता है कि आपको बुखार है। यह सुझाव हैं:\n\n📋 **सुझाव:**\n• तापमान जांचें - 100.4°F (38°C) से ऊपर हो तो बुखार है\n• पर्याप्त पानी पिएं\n• आराम करें\n• दवा लें\n\n💊 **दवाइयां:**\n• पैरासिटामोल - हर 4-6 घंटे में 500mg\n• इबुप्रोफेन - हर 6-8 घंटे में 200-400mg\n\n⚠️ **चेतावनी:** अगर बुखार 3 दिन से ज्यादा रहे तो डॉक्टर से मिलें!",
    cold: "आपको सर्दी हो सकती है। सुझाव:\n\n📋 **सुझाव:**\n• गर्म रहें और आराम करें\n• गर्म तरल पदार्थ पिएं\n• नमक पानी से गरारा करें\n\n💊 **दवाइयां:**\n• सिटिरिज़ीन - 10mg दिन में एक बार\n• पैरासिटामोल - बुखार के लिए\n\n⚠️ **चेतावनी:** अगर 10 दिन से ज्यादा रहे तो डॉक्टर दिखाएं!",
    cough: "खांसी के लिए:\n\n📋 **सुझाव:**\n• पर्याप्त पानी पिएं\n• शहद का प्रयोग करें\n• धूम्रपान से बचें\n\n💊 **दवाइयां:**\n• डेक्सट्रोमेथोर्फन सिरप\n• एम्ब्रॉक्सोल\n\n⚠️ **चेतावनी:** अगर 2 हफ्ते से ज्यादा रहे तो डॉक्टर दिखाएं!",
    headache: "सिरदर्द के लिए:\n\n📋 **सुझाव:**\n• शांत कमरे में आराम करें\n• ठंडा सेंक लगाएं\n• पर्याप्त पानी पिएं\n\n💊 **दवाइयां:**\n• पैरासिटामोल - 500mg\n• इबुप्रोफेन - 200-400mg\n\n⚠️ **चेतावनी:** अगर तेज सिरदर्द हो तुरंत डॉक्टर को दिखाएं!",
    stomach: "पेट की समस्या के लिए:\n\n📋 **सुझाव:**\n• हल्का भोजन करें\n• छोटे घूंट में पानी पिएं\nexclusive\n• डेयरी और वसायुक्त भोजन से बचें\n\n💊 **दवाइयां:**\n• एंटासिड\n• ओमेप्राज़ोल\n\n⚠️ **चेतावनी:** अगर तेज दर्द हो तुरंत डॉक्टर को दिखाएं!",
    bodyPain: "शरीर दर्द के लिए:\n\n📋 **सुझाव:**\n• आराम करें\n• गर्म सेंक लगाएं\n\n💊 **दवाइयां:**\n• इबुप्रोफेन - 400mg\n• पैरासिटामोल - 500mg\n\n⚠️ **चेतावनी:** अगर दर्द तेज हो तो डॉक्टर दिखाएं!",
    throat: "गले की खराश के लिए:\n\n📋 **सुझाव:**\n• नमक पानी से गरारा करें\n• गर्म तरल पिएं\n\n💊 **दवाइयां:**\n• पैरासिटामोल\n• स्ट्रेप्सिल्स\n\n⚠️ **चेतावनी:** अगर निगलने में दर्द हो तो डॉक्टर दिखाएं!",
    allergy: "एलर्जी के लिए:\n\n📋 **सुझाव:**\n• एलर्जी से बचें\n• खिड़कियां बंद रखें\n\n💊 **दवाइयां:**\n• सिटिरिज़ीन - 10mg\n• फेक्सोफेनाडीन - 180mg\n\n⚠️ **चेतावनी:** अगर सांस लेने में दिक्कत हो तुरंत अस्पताल जाएं!",
    // New Hindi translations
    diabetes: "मधुमेह (डायबिटीज) के लिए:\n\n📋 **सामान्य लक्षण:**\n• बार-बार पेशाब आना\n• अत्यधिक प्यास\n• अचानक वजन घटना\n• थकान\n\n📋 **प्रबंधन सुझाव:**\n• ब्लड शुगर नियमित जांच करें\n• स्वस्थ आहार लें\n\n💊 **दवाइयां:**\n• मेटफॉर्मिन - 500mg\n• ग्लिपिजाइड - 5-10mg\n\n⚠️ **चेतावनी:** हाइपोग्लाइसीमिया या हाइपरग्लाइसीमिया के लक्षण हों तुरंत डॉक्टर से मिलें!",
    sugar: "ब्लड शुगर के लिए:\n\n📋 **सामान्य स्तर:**\n• खाली पेट: 70-100 mg/dL\n• भोजन के बाद: 140 mg/dL से कम\n\n📋 **सुझाव:**\n• संतुलित आहार लें\n• फाइबर युक्त भोजन करें\n\n⚠️ **चेतावनी:** हाइपोग्लाइसीमिया के लक्षण हों तो डॉक्टर से मिलें!",
    bloodPressure: "रक्तचाप (ब्लड प्रेशर) के लिए:\n\n❤️ **श्रेणियां:**\n• सामान्य: 120/80 mmHg से कम\n• उच्च: 140/90 mmHg या उससे ऊपर\n\n📋 **सुझाव:**\n• नमक कम करें\n• नियमित व्यायाम करें\n\n⚠️ **चेतावनी:** अगर बहुत ज्यादा BP हो तुरंत अस्पताल जाएं!",
    heart: "हृदय संबंधी जानकारी:\n\n❤️ **चेतावनी के संकेत:**\n• सीने में दर्द\n• सांस में तकलीफ\n\n📋 **सुझाव:**\n• हृदय-स्वस्थ आहार लें\n• व्यायाम करें\n\n⚠️ **आपातकालीन:** अगर सीने में दर्द हो तुरंत एम्बुलेंस को कॉल करें!",
    breathing: "सांस लेने में तकलीफ:\n\n📋 **कारण:**\n• अस्थमा\n• चिंता\n• एलर्जी\n\n📋 **क्या करें:**\n• सीधे बैठें\n• इनहेलर use करें\n\n⚠️ **आपातकालीन:** अगर सांस बहुत मुश्किल हो तुरंत एम्बुलेंस!",
    emergency: "🚨 **आपातकालीन जानकारी** 🚨\n\n**तुरंत एम्बुलेंस कॉल करें अगर:**\n• सीने में दर्द जो बांह/जबड़े में फैले\n• सांस लेने में तकलीफ\n• गंभीर रक्तस्राव\n• बेहोशी\n\n📞 **आपातकालीन नंबर:**\n• एम्बुलेंस: 102 या 112\n• पुलिस: 100\n• दमकल: 101",
    firstAid: "प्राथमिक चिकित्सा मार्गदर्शन:\n\n🩹 **बुनियादी प्राथमिक चिकित्सा:**\n• **कट:** पानी से साफ करें, दबाव डालें, पट्टी बांधें\n• **जलना:** ठंडा पानी चलाएं, बर्फ न लगाएं\n• **मोच:** आराम, बर्फ, दबाव, ऊंचाई\n• **गला घुटने:** हेमलिक मैन्यूवर\n• **नाक से खून:** नाक के नरम हिस्से को दबाएं\n\n⚠️ **गंभीर चोटों के लिए हमेशा पेशेवर चिकित्सा सहायता लें!",
    period: "मासिक धर्म के लिए:\n\n🩸 **सामान्य मासिक धर्म:**\n• चक्र: 21-35 दिन\n• प्रवाह: 2-7 दिन\n\n📋 **सुझाव:**\n• ऐंठन के लिए दर्द निवारक लें\n• निचले पेट पर गर्म सेंक लगाएं\n\n💊 **दवाइयां:**\n• इबुप्रोफेन - ऐंठन के लिए\n\n⚠️ **चेतावनी:** अगर बहुत भारी रक्तस्राव हो तो डॉक्टर को दिखाएं!",
    sleep: "नींद की समस्याओं के लिए:\n\n📋 **बेहतर नींद के सुझाव:**\n• नियमित नींद का समय रखें\n• अंधेरा, ठंडा वातावरण बनाएं\n• सोने से पहले स्क्रीन से बचें\n\n⚠️ **चेतावनी:** अगर लगातार अनिद्रा हो तो डॉक्टर से मिलें!",
    weight: "वजन संबंधी चिंताओं के लिए:\n\n📋 **स्वस्थ वजन के सुझाव:**\n• संतुलित आहार और नियंत्रित मात्रा\n• नियमित व्यायाम (150 मिनट/सप्ताह)\n• पर्याप्त पानी पिएं\n\n⚠️ **चेतावनी:** बिना प्रयास के अचानक वजन घटना या बढ़ना स्वास्थ्य समस्याओं का संकेत हो सकता है। डॉक्टर से मिलें!",
    thyroid: "थायरॉयड के लिए:\n\n📋 **हाइपोथायरॉयड के लक्षण:**\n• थकान, वजन बढ़ना, ठंडा सहन न होना\n\n📋 **हाइपरथायरॉयड के लक्षण:**\n• वजन घटना, तेज दिल की धड़कन\n\n⚠️ **नोट:** थायरॉयड समस्याओं के लिए रक्त जांच आवश्यक है। डॉक्टर से मिलें!",
    listening: "सुन रहा हूं...",
    voiceNotSupported: "आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया टाइप करें।",
    voiceError: "क्षमा करें, समझ नहीं आया। कृपया पुनः प्रयास करें।"
  },
  te: {
    greeting: "నమస్కారం! నేను HealthBuddy Assistant. ఈరోజు మీకు ఎలా సహాయం చేయగలను?",
    thanks: "సంతోషం! మరేదైనా సహాయం చేయగలనా?",
    tumor: "మేము మెదడు కణితి కనుగుణుకరణ సేవను అందిస్తున్నాము. మీ సిటి స్కాన్ ని అప్‌లోడ్ చేసి విశ్లేషణ పొందవచ్చు! మా కణితి కనుగుణుకరణ పేజీకి సందర్శించండి!",
    eye: "మేము కంటి వ్యాధి కనుగుణుకరణ సేవలను అందిస్తున్నాము. మా AI రెటీనా చిత్రాలను విశ్లేషించి మధుమేహ రెటీనోపతి వంటి పరిస్థితులను గుర్తించగలదు. మా కంటి వ్యాధి కనుగుణుకరణ పేజీని చెక్ చేయండి!",
    lung: "మా ఊపిరితిత్తుల వ్యాధి కనుగుణుకరణ సేవ త్వరలో వస్తోంది! కొనసాగింపు కోసం అప్‌డేట్లు చూడండి.",
    appointment: "మీరు అపాయింట్మెంట్ పేజీలో సందర్శించి అపాయింట్మెంట్ ని బుక్ చేసుకోవచ్చు. నావిగేషన్ మెనులో 'అపాయింట్మెంట్' పై క్లిక్ చేసి సందర్శించండి.",
    contact: "మీరు సంప్రదింపు పేజీలో మా సంప్రదింపు సమాచారాన్ని కనుగొనవచ్చు. నావిగేషన్ మెనులో 'సంప్రదింపు' పై క్లిక్ చేసి మాతో సంప్రదించండి.",
    report: "మా రోగి రిపోర్ట్ విశ్లేషకుడు సేవ త్వరలో వస్తోంది! ఈ సౌకర్యం మీ వైద్య నివేదికలను విశ్లేషించడంలో సహాయపడుతుంది.",
    about: "HealthBuddy మీ వ్యక్తిగత ఆరోగ్య సహచరుడు. మేము కణితి కనుగుణుకరణ, కంటి వ్యాధి కనుగుణుకరణ, మరియు ఇతర సేవలను అందిస్తున్నాము. నేను మీకు ఎలా సహాయం చేయగలను?",
    help: "నేను కణితి కనుగుణుకరణ, కంటి వ్యాధి కనుగుణుకరణ, అపాయింట్మెంట్ బుకింగ్, లేదా సంప్రదింపు సమాచారం గురించి సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    goodbye: "వీడ్కోలు! HealthBuddy ఉపయోగించినందుకు ధన్యవాదాలు! ఆరోగ్యంగా ఉండండి!",
    default: "నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను! మీరు కణితి కనుగుణుకరణ, కంటి వ్యాధి కనుగుణుకరణ, అపాయింట్మెంట్ బుకింగ్, లేదా సంప్రదింపు సమాచారం గురించి అడగవచ్చు. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    // Medical symptoms - Telugu
    fever: "మీకు జ్వరం ఉండవచ్చు. ఇక్కడ కొన్ని సలహాలు:\n\n📋 **సూచనలు:**\n• మీ ఉష్ణోగ్రతను తనిఖీ చేయండి - 100.4°F (38°C) కంటే ఎక్కువైతే జ్వరం\n• నీరు తాగడం ద్వారా నీటిని నిలుపుకోండి\n• సాధ్యమైనంత విశ్రాంతి తీసుకోండి\n• అవసరమైతే జ్వరం తగ్గించే మందులు తీసుకోండి\n\n💊 **సాధారణ మందులు:**\n• పారాసిటమాల్ - 4-6 గంటలకు 500mg\n• ఇబుప్రూఫెన్ - 6-8 గంటలకు 200-400mg\n\n⚠️ **హెచ్చరిక:** జ్వరం 3 రోజులు పైగా ఉంటే లేదా 103°F (39.5°C) కంటే ఎక్కువైతే వెంటనే వైద్యుడిని సంప్రదించండి!",
    cold: "మీకు సాధారణ జలుబు ఉండవచ్చు. ఇక్కడ కొన్ని సలహాలు:\n\n📋 **సూచనలు:**\n• వెచ్చగా ఉండండి మరియు సరిపడా విశ్రాంతి తీసుకోండి\n• టీ లేదా సూప్ వంటి వెచ్చని ద్రవాలు తాగండి\n• గాలి ప్రసరణ కోసం హ్యుమిడిఫైయర్ ఉపయోగించండి\n• వెచ్చని ఉప్పు నీటితో గొంతు పొడిగా చేయండి\n\n💊 **సాధారణ మందులు:**\n• సిటిరిజిన్ (జిరెటెక్) - ప్రతిరోజు 10mg\n• పారాసిటమాల్ - తలనొప్పి/జ్వరానికి\n• దగ్గు సిరప్ - అవసరమైనప్పుడు\n\n⚠️ **హెచ్చరిక:** లక్షణాలు 10 రోజులు పైగా ఉంటే లేదా మరింత చెడితే వైద్యుడిని చూడండి!",
    cough: "దగ్గు నుండి ఉపశమనానికి ప్రయత్నించండి:\n\n📋 **సూచనలు:**\n• నీరు తాగడం కొనసాగించండి\n• పిల్లలకు కాకుండా ప్రయత్నించండి\n• పొగ లేదా పొగ ప్రాంతాల నుండి దూరంగా ఉండండి\n• హ్యుమిడిఫైయర్ ఉపయోగించండి\n\n💊 **సాధారణ మందులు:**\n• డెక్స్ట్రోమెథార్ఫాన్ సిరప్ - పొడి దగ్గుకు\n• అంబ్రోక్సోల్/బ్రోమ్హెక్సిన్ - ఛాతీ గుండురుపుకు\n• తేనె మరియు అల్లం టీ\n\n⚠️ **హెచ్చరిక:** దగ్గు 2 వారాలు పైగా ఉంటే లేదా రక్తం కలిసి ఉంటే వైద్యుడిని సంప్రదించండి!",
    headache: "తలనొప్పి నుండి ఉపశమనానికి:\n\n📋 **సూచనలు:**\n• ప్రశాంతమైన, చీకటి గదిలో విశ్రాంతి తీసుకోండి\n• నుదిటిపై చల్లని కంప్రెస్ వేయండి\n• నీరు తాగడం కొనసాగించండి\n• స్క్రీన్ సమయాన్ని నివారించండి\n\n💊 **సాధారణ మందులు:**\n• పారాసిటమాల్ - 500mg అవసరమైనప్పుడు\n• ఇబుప్రూఫెన్ - 200-400mg అవసరమైనప్పుడు\n• అస్పిరిన్ - 325mg (పిల్లలకు కాదు)\n\n⚠️ **హెచ్చరిక:** తలనొప్పి తీవ్రంగా ఉంటే, అకస్మాత్తుగా ఉంటే లేదా జ్వరం/గట్టి వెన్నుతో ఉంటే వెంటనే వైద్య సహాయం పొందండి!",
    stomach: "పొట్ట సమస్యలకు:\n\n📋 **సూచనలు:**\n• BRAT ఆహారం (వాణిల్ల, బియ్యం, ఆపిల్ సాస్, టోస్ట్)\n• చిన్న గుటకల్లో నీరు తాగండి\n• పాల ఉత్పత్తులు, కొవ్వు ఆహారాలు మరియు కాఫీన్ నుండి దూరంగా ఉండండి\n• సరిపడా విశ్రాంతి తీసుకోండి\n\n💊 **సాధారణ మందులు:**\n• యాంటాసిడ్ - ఆమ్లం కోసం\n• ఒమెప్రాజోల్ - ఆహారం ముందు 20mg ఆమ్లం కోసం\n• లోపెరమైడ్ (ఇమోడియం) - డయేరియా కోసం\n• యాంటీఎమెటిక్ - వాంతుల కోసం\n\n⚠️ **హెచ్చరిక:** తీవ్రమైన నొప్పి, మలంలో రక్తం లేదా నీరసం ఉంటే వెంటనే వైద్యుడిని సంప్రదించండి!",
    bodyPain: "శరీర నొప్పి/మైయాల్జియా కోసం:\n\n📋 **సూచనలు:**\n• విశ్రాంతి తీసుకోండి మరియు సరిపడా నిద్ర పొందండి\n• శరీరానికి వెచ్చని కంప్రెస్ వేయండి\n• సులభమైన స్ట్రెచింగ్ వ్యాయామాలు చేయండి\n\n💊 **సాధారణ మందులు:**\n• ఇబుప్రూఫెన్ - 400mg అవసరమైనప్పుడు\n• పారాసిటమాల్ - 500mg అవసరమైనప్పుడు\n• అవసరమైతే కండరాల సడలింపు మందులు\n\n⚠️ **హెచ్చరిక:** నొప్పి తీవ్రంగా ఉంటే లేదా వాపుతో కూడి ఉంటే వైద్యుడిని సంప్రదించండి!",
    throat: "గొంతు నొప్పి కోసం:\n\n📋 **సూచనలు:**\n• వెచ్చని ఉప్పు నీటితో గొంతు పొడిగా చేయండి\n• వెచ్చని ద్రవాలు తాగండి\n• పొగ పీల్చడం నుండి దూరంగా ఉండండి\n• హ్యుమిడిఫైయర్ ఉపయోగించండి\n\n💊 **సాధారణ మందులు:**\n• పారాసిటమాల్ - నొప్పి కోసం\n• స్ట్రెప్సిల్స్/లోజెంజ్\n• బెటాడైన్ గొంతు పొడిగా చేయడానికి\n\n⚠️ **హెచ్చరిక:** తీవ్రమైన నొప్పి, మింగడంలో ఇబ్బంది లేదా వెల్లని మచ్చలు ఉంటే వైద్యుడిని చూడండి!",
    allergy: "ఎలర్జీల కోసం:\n\n📋 **సూచనలు:**\n• తెలిసిన ఎలర్జీని నివారించండి\n• కిటికీలు మూసి ఉంచండి\n• గాలి శుద్ధి పరికరాలు ఉపయోగించండి\n• చేతులు తరచుగా కడగండి\n\n💊 **సాధారణ మందులు:**\n• సిటిరిజిన్ - రోజుకు ఒకసారి 10mg\n• ఫెక్సోఫెనాడీన్ - రోజుకు ఒకసారి 180mg\n• మోంటెలుకాస్ట్ - ఆస్త్మా వంటి లక్షణాలకు\n\n⚠️ **హెచ్చరిక:** శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా తీవ్రమైన ప్రతిచర్య ఉంటే అత్యవసర సంరక్షణ పొందండి!",
    // New Telugu translations
    temperature: "Temperature information:\n\n🌡️ **Temperature Guide:**\n• Normal: 97°F - 99°F\n• Fever: 100.4°F and above\n\n📋 **What to do:**\n• Medicine tadpi\n• Panipani vaddu\n• Cold compress use cheyunu\n\n⚠️ **Warning:** 3 days vache doctor ki velthunna!",
    stomachPain: "Stomach pain ki:\n\n📋 **Suggestions:**\n• Rest theeskoni\n• Warm compress use cheyunu\n• Clear liquids vaduthunna\n\n💊 **Medicines:**\n• Antacid\n• Buscopan\n\n⚠️ **Warning:** Severe pain vache doctor ki velthunna!",
    diabetes: "Diabetes (sugar) ki:\n\n📋 **Common Symptoms:**\n• Frequent urination\n• Excessive thirst\n• Weight loss\n\n📋 **Management Tips:**\n• Blood sugar check cheyali\n• Healthy food vaduthunna\n• Exercise cheyali\n\n💊 **Medicines:**\n• Metformin - 500mg\n• Glipizide - 5-10mg\n\n⚠️ **Warning:** Hypoglycemia vache doctor ki velthunna!",
    sugar: "Blood sugar ki:\n\n📋 **Normal Levels:**\n• Fasting: 70-100 mg/dL\n• After meals: Less than 140 mg/dL\n\n📋 **Tips:**\n• Balanced diet vaduthunna\n• Fiber food vaduthunna\n\n⚠️ **Warning:** Hypoglycemia vache doctor ki velthunna!",
    bloodPressure: "Blood pressure ki:\n\n❤️ **Categories:**\n• Normal: Less than 120/80 mmHg\n• High: 140/90 mmHg or above\n\n📋 **Tips:**\n• Salt reduce cheyali\n• Exercise cheyali\n\n⚠️ **Warning:** High BP vache hospital ki velthunna!",
    heart: "Heart information:\n\n❤️ **Warning Signs:**\n• Chest pain\n• Shortness of breath\n\n📋 **Tips:**\n• Heart-healthy food vaduthunna\n• Exercise cheyali\n\n⚠️ **Emergency:** Chest pain vache ambulance ki call cheyali!",
    breathing: "Breathing problem ki:\n\n📋 **Causes:**\n• Asthma\n• Anxiety\n• Allergy\n\n📋 **What to do:**\n• Sit upright\n• Inhaler use cheyali\n\n⚠️ **Emergency:** Severe breathing vache ambulance ki call!",
    asthma: "Asthma ki:\n\n📋 **Management:**\n• Controller inhaler daily\n• Rescue inhaler ready\n• Triggers avoid cheyunu\n\n💊 **Medicines:**\n• Rescue inhaler (Albuterol)\n\n⚠️ **Emergency:** Inhaler not working vache hospital ki velthunna!",
    nausea: "Nausea ki:\n\n📋 **Suggestions:**\n• Slow ga liquids vaduthunna\n• Light food vaduthunna\n\n💊 **Medicines:**\n• Ondansetron - 4mg\n\n⚠️ **Warning:** 24 hours vache vomiting vache doctor ki velthunna!",
    vomiting: "Vomiting ki:\n\n📋 **What to do:**\n• Solid food stop cheyali\n• Water or ORS slow ga vaduthunna\n\n💊 **Medicines:**\n• Ondansetron - 4mg\n\n⚠️ **Warning:** Blood in vomit vache doctor ki velthunna!",
    dizziness: "Dizziness ki:\n\n📋 **Suggestions:**\n• Immediate ga sit or lie down\n• Sudden movements avoid cheyunu\n• Panipani vaddu\n\n💊 **Medicines:**\n• Betahistine\n\n⚠️ **Warning:** Severe dizziness vache doctor ki velthunna!",
    fatigue: "Fatigue/Tiredness ki:\n\n📋 **Suggestions:**\n• 7-9 hours sleep\n• Regular exercise\n• Balanced diet\n\n📋 **Possible Causes:**\n• Anemia\n• Thyroid problems\n\n⚠️ **Warning:** Persistent fatigue vache doctor ki velthunna!",
    skin: "Skin problems ki:\n\n📋 **Suggestions:**\n• Skin clean ga unduthunna\n• Sunscreen use cheyali\n• Scratching avoid cheyunu\n\n⚠️ **Warning:** Rash spreads vache fever vache doctor ki velthunna!",
    rash: "Skin rash ki:\n\n📋 **Suggestions:**\n• Cool compress use cheyunu\n• Calamine lotion apply cheyali\n• Antihistamine tablets\n\n⚠️ **Warning:** Rapid spread vache breathing problem vache immediate doctor!",
    dental: "దంత సమస్యల కోసం:\n\n🦷 **సూచనలు:**\n• వెచ్చని ఉప్పు నీటితో నోటిని కడగండి\n• నొప్పి నివారిణి ఉపయోగించండి\n• చాలా వేడి/చల్లని ఆహారాలు తినకండి\n• నోటి పరిశుభ్రతను పాటించండి\n• పంటి నొప్పికి లవంగం ఉపయోగించండి\n\n💊 **సాధారణ మందులు:**\n• ఇబుప్రూఫెన్ - నొప్పి కోసం\n• డాక్టర్ సూచించిన యాంటీబయాటిక్స్ - ఇన్ఫెక్షన్ కోసం\n• నోటి జెల్ (ఓరాజెల్) - పంటి నొప్పి కోసం\n\n⚠️ **హెచ్చరిక:** నొప్పి 2 రోజులు పైగా ఉంటే, వాపు ఉంటే లేదా జ్వరం ఉంటే డెంటిస్ట్ ని చూడండి!",
    toothache: "పంటి నొప్పి కోసం:\n\n🦷 **ఉపశమన చిట్కాలు:**\n• వెచ్చని ఉప్పు నీటితో నోటిని కడగండి\n• రొమ్ముపై చల్లని కంప్రెస్ వేయండి\n• నొప్పి నివారిణి తీసుకోండి\n• నొప్పి ఉన్న వైపు నుండి నమలకండి\n• లవంగం ఉపయోగించండి\n\n⚠️ **హెచ్చరిక:** వాపు ముఖం/మెడకు వ్యాపిస్తే లేదా జ్వరం ఉంటే వెంటనే డెంటిస్ట్ ని చూడండి!",
    mental: "మానసిక ఆరోగ్యానికి మద్దతు:\n\n🧠 **సాధారణ సూచనలు:**\n• లోతైన శ్వాస వ్యాయామాలు చేయండి\n• నియమిత షెడ్యూల్ పాటించండి\n• ప్రియమైన వారితో మాట్లాడండి\n• స్క్రీన్ సమయాన్ని పరిమితం చేయండి\n• నియమితంగా వ్యాయామం చేయండి\n• సరిపడా నిద్ర పొందండి\n\n📋 **వనరులు:**\n• మీరు నమ్మకమైన వ్యక్తితో మాట్లాడండి\n• సలహాదారుడి/థెరపిస్ట్ ని సంప్రదించండి\n• మానసిక ఆరోగ్య హెల్ప్లైన్ ని సంప్రదించండి\n\n⚠️ **సంక్షోభ మద్దతు:** మీరు ఆత్మహత్య ఆలోచనలు కలిగి ఉంటే, దయచేసి వెంటనే అత్యవసర సేవలను సంప్రదించండి లేదా క్రింది వాటిలో ఒకదాన్ని సంప్రదించండి:\n• అత్యవసరం: 112\n• హెల్ప్లైన్: 988 (US)\n• ఇప్పుడే ఎవరితోనైనా మాట్లాడండి!",
    anxiety: "ఆందోళన కోసం:\n\n😰 **ఎదుర్కోవడానికి వ్యూహాలు:**\n• లోతైన శ్వాస (4-7-8 పద్ధతి)\n• నియమితంగా వ్యాయామం చేయండి\n• కాఫీన్ సేవనను పరిమితం చేయండి\n• సరిపడా నిద్ర పొందండి\n• ధ్యానం/మైండ్ఫుల్నెస్ ప్రయత్నించండి\n• ఎవరితోనైనా మాట్లాడండి\n\n💊 **మందులు (సూచించినట్లయితే):**\n• SSRIs (ఎస్సిటాలోప్రామ్, సెర్ట్రాలైన్)\n• తీవ్రమైన ఆందోళన కోసం బెంజోడియాజెపైన్లు (స్వల్పకాలికం)\n\n⚠️ **హెచ్చరిక:** ఆందోళన తీవ్రంగా ఉంటే లేదా దైనందిన జీవితాన్ని ప్రభావితం చేస్తుంటే మానసిక ఆరోగ్య నిపుణుడిని సంప్రదించండి!",
    depression: "డిప్రెషన్ కోసం:\n\n😔 **తెలుసుకోవాల్సినవి:**\n• డిప్రెషన్ నయం కాగలదు\n• మీరు ఒంటరిగా లేరు\n• ప్రొఫెషనల్ సహాయం అందుబాటులో ఉంది\n\n📋 **స్వీయ సంరక్షణ సూచనలు:**\n• షెడ్యూల్ ని పాటించండి\n• చిన్న లక్ష్యాలు నిర్దేశించుకోండి\n• కనెక్ట్ అయి ఉండండి\n• నియమితంగా వ్యాయామం చేయండి\n• ఆరోగ్యకరమైన ఆహారం తినండి\n• ప్రొఫెషనల్ సహాయం పొందండి\n\n⚠️ **సంక్షోభం:** ఆత్మహత్య ఆలోచనలు ఉంటే దయచేసి క్రింది వాటిలో ఒకదాన్ని సంప్రదించండి:\n• అత్యవసరం: 112\n• హెల్ప్లైన్: 988 (US)\n• ఇప్పుడే ఎవరితోనైనా మాట్లాడండి!",
    eye: "కంటి సమస్యల కోసం:\n\n👁️ **సూచనలు:**\n• కళ్ళకు విశ్రాంతి ఇవ్వండి (20-20-20 నియమం)\n• కృత్రిమ కన్నీళ్లు ఉపయోగించండి\n• కళ్ళు రుబ్ చేయడం నివారించండి\n• బయట సన్ గ్లాసెస్ ధరించండి\n• స్క్రీన్లను చేతి పొడవు దూరంలో ఉంచండి\n\n⚠️ **హెచ్చరిక:** అకస్మాత్తుగా దృష్టి కోల్పోవడం, తీవ్రమైన కంటి నొప్పి, మెరుపులు లేదా ఈతగాళ్ళు కనిపిస్తే వెంటనే వైద్య సహాయం పొందండి!",
    ear: "చెవి సమస్యల కోసం:\n\n👂 **సూచనలు:**\n• చెవులు పొడిగా ఉంచండి\n• చెవిలోకి వస్తువులు పెట్టకండి\n• వెచ్చని కంప్రెస్ వేయండి\n• డాక్టర్ సలహా లేకుండా చెవి డ్రాప్స్ ఉపయోగించకండి\n\n💊 **సాధారణ మందులు:**\n• నొప్పి నివారిణి\n• యాంటీబయాటిక్ చెవి డ్రాప్స్ (బాక్టీరియా ఇన్ఫెక్షన్ కోసం)\n\n⚠️ **హెచ్చరిక:** తీవ్రమైన నొప్పి, వినికిడి కోల్పోవడం, తల తిరగడం లేదా క్షారం ఉంటే వైద్యుడిని చూడండి!",
    emergency: "🚨 **అత్యవసర సమాచారం** 🚨\n\n**వెంటనే అంబులెన్స్ కు కాల్ చేయండి అగర:**\n• చేతి/జత్రుకకు వ్యాపించే ఛాతీ నొప్పి\n• శ్వాస తీసుకోవడంలో ఇబ్బంది\n• తీవ్రమైన రక్తస్రావం\n• స్ట్రోక్ లక్షణాలు (ముఖం వాలిపోవడం, చేయి బలహీనత, మాట్లాడటంలో ఇబ్బంది)\n• తీవ్రమైన అలర్జీ ప్రతిచర్య\n• ప్రజ్ఞ కోల్పోవడం\n\n📞 **అత్యవసర నంబర్లు:**\n• అంబులెన్స్: 102 లేదా 112\n• పోలీస్: 100\n• అగ్నిమాపక దళం: 101\n\n🏥 **సమీపంలోని ఆసుపత్రి:** దయచేసి మీ స్థానిక డైరెక్టరీని తనిఖీ చేయండి లేదా ఆసుపత్రుల గురించి నాకు అడగండి!",
    firstAid: "ప్రథమ చికిత్స మార్గదర్శి:\n\n🩹 **ప్రాథమిక ప్రథమ చికిత్స:**\n• **కత్తిరింపులు:** నీటితో శుభ్రపరచండి, పీడనం వేయండి, పట్టిక వేయండి\n• **కాలిన:** చల్లని నీటిని పెట్టండి, మంచు వేయకండి, సులభంగా కప్పండి\n• **మోచేతికి:** RICE పద్ధతి - విశ్రాంతి, మంచు, పీడనం, ఎత్తడం\n• **గొట్టం పట్టేటప్పుడు:** హెమ్లిక్ మాన్యువర్\n• **ముక్కు నుండి రక్తస్రావం:** ముక్కు మృదు భాగాన్ని పిండి, ముందుకు వాలండి\n\n⚠️ **తీవ్రమైన గాయాలకు ఎల్లప్పుడూ ప్రొఫెషనల్ వైద్య సహాయం పొందండి!**",
    period: "పార్శ్వర్య ఆరోగ్యం కోసం:\n\n🩸 **సాధారణ పీరియడ్:**\n• సైకిల్: 21-35 రోజులు\n• ప్రవాహం: 2-7 రోజులు\n• సాధారణమైన రక్తస్రావం సాధారణం\n\n📋 **సూచనలు:**\n• ఐఐఎస్ కోసం నొప్పి నివారిణి ఉపయోగించండి\n• కింది పొట్టకు వెచ్చని కంప్రెస్ వేయండి\n• నీరు తాగడం కొనసాగించండి\n• ఇనుము సమృద్ధిగా ఉన్న ఆహారాలు తినండి\n\n💊 **మందులు:**\n• ఇబుప్రూఫెన్ - ఐఐఎస్ కోసం\n• మెఫెనామిక్ యాసిడ్ - భారీ రక్తస్రావం కోసం\n\n⚠️ **వైద్యుడిని చూడండి అగర:** చాలా భారీ రక్తస్రావం, తీవ్రమైన నొప్పి లేదా అనియమిత సైకిల్స్!",
    sleep: "నిద్ర సమస్యల కోసం:\n\n😴 **మెరుగైన నిద్ర కోసం సూచనలు:**\n• నియమిత నిద్ర షెడ్యూల్ పాటించండి\n• చీకటి, చల్లని వాతావరణం సృష్టించండి\n• పడుకునే ముందు స్క్రీన్లు నివారించండి\n• మధ్యాహ్నం తర్వాత కాఫీన్ సేవనను పరిమితం చేయండి\n• నియమితంగా వ్యాయామం చేయండి (పడుకునే సమయానికి దగ్గరగా కాదు)\n• రాత్రి పెద్ద భోజనాలు తినకండి\n\n⚠️ **హెచ్చరిక:** కొనసాగుతున్న నిద్రలేమి ఉంటే వైద్యుడిని సంప్రదించండి!",
    weight: "బరువు ఆందోళనల కోసం:\n\n⚖️ **ఆరోగ్యకరమైన బరువు సూచనలు:**\n• పోర్షన్ కంట్రోల్తో సమతుల్య ఆహారం\n• నియమితంగా వ్యాయామం (వారానికి 150 నిమిషాలు)\n• నీరు తాగడం కొనసాగించండి\n• సరిపడా నిద్ర పొందండి\n• ఒత్తిడిని నిర్వహించండి\n\n⚠️ **హెచ్చరిక:** ప్రయత్నించకుండానే అకస్మాత్తుగా బరువు తగ్గడం లేదా పెరగడం ఆరోగ్య సమస్యల సూచికగా ఉండవచ్చు. వైద్యుడిని సంప్రదించండి!",
    thyroid: "థైరాయిడ్ కోసం:\n\n🧬 **థైరాయిడ్ ప్రాథమికాలు:**\n• జీవక్రియను నియంత్రిస్తుంది\n• సాధారణ సమస్యలు: హైపోథైరాయిడిజం (తక్కువ క్రియాశీలత) & హైపర్థైరాయిడిజం (అధిక క్రియాశీలత)\n\n📋 **హైపోథైరాయిడిజం లక్షణాలు:**\n• అలసిపోవడం, బరువు పెరగడం, చలి సహించలేకపోవడం\n\n📋 **హైపర్థైరాయిడిజం లక్షణాలు:**\n• బరువు తగ్గడం, గుండె వేగంగా కొట్టుకోవడం, వేడి సహించలేకపోవడం\n\n⚠️ **గమనిక:** థైరాయిడ్ సమస్యలకు రక్త పరీక్షలు అవసరం. వైద్యుడిని సంప్రదించండి!",
    listening: "Listening...",
    voiceNotSupported: "Voice input not supported. Type your message.",
    voiceError: "Sorry, try again."
  }
};

// Language selector event
const languageSelector = document.getElementById('languageSelector');
if (languageSelector) {
  languageSelector.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    // Show greeting in new language
    addMessage(translations[currentLanguage].greeting, 'bot');
  });
}


/**
 * CHAT WIDGET FUNCTIONALITY
 */

// Add error handling and ensure elements exist
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWindow = document.getElementById('chatWindow');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatMessages = document.getElementById('chatMessages');
const chatVoiceBtn = document.getElementById('chatVoiceBtn');

// Debug: Check if elements exist
console.log('Chat elements:', {
  chatToggleBtn: chatToggleBtn,
  chatWindow: chatWindow,
  chatCloseBtn: chatCloseBtn,
  chatInput: chatInput,
  chatSendBtn: chatSendBtn,
  chatMessages: chatMessages,
  chatVoiceBtn: chatVoiceBtn
});

// Toggle chat window
if (chatToggleBtn && chatWindow) {
  chatToggleBtn.addEventListener('click', () => {
    console.log('Chat button clicked!');
    chatWindow.classList.add('active');
    chatToggleBtn.style.display = 'none';
    if (chatInput) {
      chatInput.focus();
    }
  });
} else {
  console.error('Chat toggle button or window not found!');
}

// Close chat window
if (chatCloseBtn && chatWindow && chatToggleBtn) {
  chatCloseBtn.addEventListener('click', () => {
    console.log('Close button clicked!');
    // Stop any ongoing speech synthesis when closing chat
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // Remove speaking indicator
    chatVoiceBtn.classList.remove('speaking');
    chatWindow.classList.remove('active');
    chatToggleBtn.style.display = 'flex';
  });
} else {
  console.error('Chat close button, window, or toggle button not found!');
}

// Send message function
function sendMessage() {
  const message = chatInput.value.trim();
  if (message === '') return;
  
  // Add user message
  addMessage(message, 'user');
  chatInput.value = '';
  
  // Get bot response and add it
  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage(response, 'bot');
  }, 500);
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Speak bot's response using TTS
  if (sender === 'bot' && ttsEnabled) {
    // Extract plain text from HTML for speech
    const plainText = text.replace(/<br>/g, ' ').replace(/<[^>]*>/g, '');
    speakText(plainText, currentLanguage);
  }
}

// Bot response function with healthcare-related responses
function getBotResponse(input) {
  const message = input.toLowerCase().trim();
  const t = translations[currentLanguage];
  
  // Greetings
  if (message.match(/^(hello|hi|hey|namaste|नमस्ते|hello!|hi!|hey!)$/) || message.startsWith('hello') || message.startsWith('hi ') || message.startsWith('hey ') || message.includes('namaste') || message.includes('नमस्ते')) {
    return t.greeting;
  }
  
  // Thanks
  if (message.includes('thank') || message.includes('thanks') || message.includes('dhanyavaadalu') || message.includes('धन्यवाद')) {
    return t.thanks;
  }
  
  // Medical symptoms - Fever
  if (message.includes('fever') || message.includes('bukhar') || message.includes('temperature') || message.includes('tap') || message.includes('taapam') || message.includes('तेज बुखार') || message.includes('high temperature') || message.includes('feeling hot')) {
    return t.fever;
  }
  
  // Medical symptoms - Cold
  if (message.includes('cold') || message.includes('sardi') || message.includes('thagun') || message.includes('shital') || message.includes('सर्दी') || message.includes('runny nose') || message.includes('nasal congestion')) {
    return t.cold;
  }
  
  // Medical symptoms - Cough
  if (message.includes('cough') || message.includes('khansi') || message.includes('kosam') || message.includes('खांसी') || message.includes('coughing')) {
    return t.cough;
  }
  
  // Medical symptoms - Headache
  if (message.includes('headache') || message.includes('sir head') || message.includes('sir ache') || message.includes('talupirigina') || message.includes('sir tadipi') || message.includes('सिरदर्द') || message.includes('head pain') || message.includes('migraine')) {
    return t.headache;
  }
  
  // Medical symptoms - Stomach
  if (message.includes('stomach') || message.includes('pet') || message.includes('pain') || message.includes('vulnerable') || message.includes('koduku') || message.includes('peeta unnadi') || message.includes('पेट दर्द') || message.includes('stomach pain') || message.includes('abdominal pain') || message.includes('belly')) {
    return t.stomach;
  }
  
  // Medical symptoms - Body pain
  if (message.includes('body pain') || message.includes('muscle') || message.includes('back pain') || message.includes('kaalam') || message.includes('shariram') || message.includes('शरीर दर्द') || message.includes('body ache') || message.includes('pain all over')) {
    return t.bodyPain;
  }
  
  // Medical symptoms - Throat
  if (message.includes('throat') || message.includes('gale') || message.includes('k Goll') || message.includes('gala') || message.includes('गले में खराश') || message.includes('sore throat') || message.includes('throat pain')) {
    return t.throat;
  }
  
  // Medical symptoms - Allergy
  if (message.includes('allergy') || message.includes('allergic') || message.includes('alergi') || message.includes('एलर्जी') || message.includes('allergic reaction')) {
    return t.allergy;
  }
  
  // Medical symptoms - Temperature
  if (message.includes('temperature') || message.includes('body heat')) {
    return t.temperature;
  }
  
  // Medical symptoms - Diabetes & Blood Sugar
  if (message.includes('diabetes') || message.includes('sugar') || message.includes('blood sugar') || message.includes('glucose') || message.includes('hypoglycemia') || message.includes('hyperglycemia') || message.includes('diabetic')) {
    return t.diabetes;
  }
  
  // Medical symptoms - Blood Pressure
  if (message.includes('blood pressure') || message.includes('hypertension') || message.includes('high blood') || message.includes('low blood')) {
    return t.bloodPressure;
  }
  
  // Medical symptoms - Heart
  if (message.includes('heart') || message.includes('cardiac') || message.includes('heartbeat') || message.includes('palpitation')) {
    return t.heart;
  }
  
  // Medical symptoms - Chest Pain
  if (message.includes('chest pain') || message.includes('chest discomfort') || message.includes('pain in chest')) {
    return t.chestPain;
  }
  
  // Medical symptoms - Breathing
  if (message.includes('breathing') || message.includes('shortness of breath') || message.includes('dyspnea')) {
    return t.breathing;
  }
  
  // Medical symptoms - Asthma
  if (message.includes('asthma') || message.includes('wheezing') || message.includes('inhaler')) {
    return t.asthma;
  }
  
  // Medical symptoms - Nausea/Vomiting
  if (message.includes('nausea') || message.includes('vomiting') || message.includes('vomit') || message.includes('feeling sick') || message.includes('queasy')) {
    return t.nausea;
  }
  
  // Medical symptoms - Dizziness
  if (message.includes('dizz') || message.includes('vertigo') || message.includes('lightheaded') || message.includes('spinning') || message.includes('balance')) {
    return t.dizziness;
  }
  
  // Medical symptoms - Fatigue
  if (message.includes('fatigue') || message.includes('tired') || message.includes('exhausted') || message.includes('tiredness') || message.includes('weakness') || message.includes('lethargy')) {
    return t.fatigue;
  }
  
  // Medical symptoms - Skin
  if (message.includes('skin') || message.includes('itch') || message.includes('dermatitis') || message.includes('eczema')) {
    return t.skin;
  }
  
  // Medical symptoms - Rash
  if (message.includes('rash') || message.includes('skin rash')) {
    return t.rash;
  }
  
  // Medical symptoms - Dental
  if (message.includes('tooth') || message.includes('dental') || message.includes('toothache') || message.includes('gum') || message.includes('mouth pain')) {
    return t.dental;
  }
  
  // Medical symptoms - Mental Health
  if (message.includes('mental') || message.includes('anxiety') || message.includes('anxious') || message.includes('depression') || message.includes('depressed') || message.includes('stress') || message.includes('panic')) {
    return t.mental;
  }
  
  // Medical symptoms - Ear
  if (message.includes('ear') || message.includes('earache') || message.includes('hearing') || message.includes('ear pain')) {
    return t.ear;
  }
  
  // Medical symptoms - Emergency
  if (message.includes('emergency') || message.includes('urgent') || message.includes('critical') || message.includes('first aid') || message.includes('ambulance')) {
    return t.emergency;
  }
  
  // Medical symptoms - Period/Menstrual
  if (message.includes('period') || message.includes('menstrual') || message.includes('period pain') || message.includes('cramps') || message.includes('menstruation')) {
    return t.period;
  }
  
  // Medical symptoms - Sleep
  if (message.includes('sleep') || message.includes('insomnia') || message.includes('sleepless') || message.includes('cannot sleep')) {
    return t.sleep;
  }
  
  // Medical symptoms - Weight
  if (message.includes('weight') || message.includes('weight loss') || message.includes('weight gain') || message.includes('obesity')) {
    return t.weight;
  }
  
  // Medical symptoms - Thyroid
  if (message.includes('thyroid') || message.includes('metabolism') || message.includes('hypothyroid') || message.includes('hyperthyroid')) {
    return t.thyroid;
  }
  
  // Services - Brain Tumor
  if (message.includes('tumor') || message.includes('brain') || message.includes('mastishka') || message.includes('mri') || message.includes('ct scan') || message.includes('brain tumor')) {
    return t.tumor;
  }
  
  // Services - Eye
  if (message.includes('eye') || message.includes('vision') || message.includes('retina') || message.includes('diabetic retinopathy') || message.includes('akk') || message.includes('kan') || message.includes('आंख') || message.includes('eye disease') || message.includes('eye problem')) {
    return t.eye;
  }
  
  // Services - Lung
  if (message.includes('lung') || message.includes('breathing') || message.includes('respiratory') || message.includes('lungs') || message.includes('fph') || message.includes('श्वसन') || message.includes('lung disease') || message.includes('breath')) {
    return t.lung;
  }
  
  // Services - Appointment
  if (message.includes('appointment') || message.includes('book') || message.includes('schedule') || message.includes('appoint') || message.includes('अपॉइंटमेंट') || message.includes('booking')) {
    return t.appointment;
  }
  
  // Services - Contact
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('address') || message.includes('sambandh') || message.includes('संपर्क') || message.includes('reach')) {
    return t.contact;
  }
  
  // Services - Report
  if (message.includes('report') || message.includes('analysis') || message.includes('patient report') || message.includes('patient') || message.includes('रिपोर्ट') || message.includes('medical report')) {
    return t.report;
  }
  
  // About
  if (message.includes('about') || message.includes('who are you') || message.includes('what is') || message.includes('emaina') || message.includes('what is healthbuddy')) {
    return t.about;
  }
  
  // Help - add comprehensive help response
  if (message.includes('help') || message.includes('assist') || message.includes('saar') || message.includes('how to use') || message.includes('what can you do')) {
    return t.help + "\n\n💡 You can also ask me about:\n• Symptoms like fever, cold, cough, headache, stomach pain\n• Our services: tumor detection, eye disease, lung disease\n• How to book appointments\n• Contact information";
  }
  
  // Goodbye
  if (message.includes('bye') || message.includes('goodbye') || message.includes('see you') || message.includes('night') || message.includes('rod') || message.includes('अलविदा') || message.includes('take care')) {
    return t.goodbye;
  }
  
  // Default response - make it more helpful
  return t.default + "\n\n💡 Try asking me about:\n• Health symptoms (fever, cold, cough, headache)\n• Our services (tumor, eye, lung detection)\n• How to book an appointment\n• Contact information\n\n🎤 Or click the microphone icon to speak!";
}

// Event listeners for sending messages
chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});


/**
 * TEXT-TO-SPEECH (TTS) FUNCTIONALITY
 */

// Check if browser supports speech synthesis
const SpeechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis;
let ttsEnabled = true;

// Language voice mapping for TTS
const ttsLanguages = {
  'en': 'en-US',
  'hi': 'hi-IN',
  'te': 'te-IN'
};

// Function to speak text using TTS
function speakText(text, language = 'en') {
  if (!SpeechSynthesis || !ttsEnabled) return;
  
  // Cancel any ongoing speech
  SpeechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = ttsLanguages[language] || 'en-US';
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1;
  utterance.volume = 1;
  
  // Try to find a voice for the specific language
  const voices = SpeechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(language)) || voices[0];
  if (voice) {
    utterance.voice = voice;
  }
  
  // Add speaking indicator
  chatVoiceBtn.classList.add('speaking');
  
  utterance.onend = () => {
    chatVoiceBtn.classList.remove('speaking');
  };
  
  utterance.onerror = () => {
    chatVoiceBtn.classList.remove('speaking');
  };
  
  SpeechSynthesis.speak(utterance);
}

// Toggle TTS function
function toggleTTS() {
  ttsEnabled = !ttsEnabled;
  if (!ttsEnabled) {
    SpeechSynthesis.cancel();
    chatVoiceBtn.classList.remove('speaking');
  }
}


/**
 * VOICE RECOGNITION FUNCTIONALITY
 */

// Check if browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

// Function to check microphone permission status
async function checkMicrophonePermission() {
  try {
    // Try to use the Permissions API
    if (navigator.permissions && navigator.permissions.query) {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      return permissionStatus.state; // 'granted', 'denied', or 'prompt'
    }
  } catch (error) {
    console.log('Permissions API not supported, will try to start recognition');
  }
  return 'unknown'; // If we can't check, we'll try to start anyway
}

// Function to detect language from text
function detectLanguage(text) {
  const lowerText = text.toLowerCase();
  
  // Check for Hindi characters (Devanagari script)
  const hindiPattern = /[\u0900-\u097F]/;
  if (hindiPattern.test(lowerText)) {
    return 'hi';
  }
  
  // Check for Telugu characters
  const teluguPattern = /[\u0C00-\u0C7F]/;
  if (teluguPattern.test(lowerText)) {
    return 'te';
  }
  
  // Check for common Hindi words
  const hindiWords = ['बुखार', 'सर्दी', 'खांसी', 'सिरदर्द', 'पेट', 'गला', 'नमस्ते', 'धन्यवाद', 'अलविदा', 'हां', 'नहीं', 'क्या', 'कैसे', 'कहाँ', 'कब', 'क्यों', 'कौन', 'कितना', 'बहुत', 'थोड़ा', 'दर्द', 'बीमारी', 'दवा', 'डॉक्टर', 'अस्पताल', 'स्वास्थ्य', 'बच्चा', 'बड़ा', 'छोटा', 'पुराना', 'नया', 'अच्छा', 'बुरा', 'तापमान', 'रक्तचाप', 'मधुमेह', 'हृदय', 'फेफड़े', 'आंख', 'कान', 'नाक', 'मुंह', 'दांत', 'जीभ', 'हाथ', 'पैर', 'सीने', 'पीठ', 'पेट', 'कोष्ट', 'मूत्र', 'मल'];
  for (const word of hindiWords) {
    if (lowerText.includes(word)) {
      return 'hi';
    }
  }
  
  // Check for common Telugu words
  const teluguWords = ['జ్వరం', 'సర్ది', 'కాసు', 'తలనొప్పి', 'పొట్ట', 'గొంతు', 'నమస్తే', 'ధన్యవాదాలు', 'వీడ్కోలు', 'అవును', 'కాదు', 'ఏమి', 'ఎలా', 'ఎక్కడ', 'ఎప్పుడు', 'ఎందుకు', 'ఎవరు', 'ఎంత', 'చాలా', 'కొంచెం', 'నొప్పి', 'వ్యాధి', 'మందు', 'డాక్టర్', 'ఆసుపత్రి', 'ఆరోగ్యం', 'పిల్ల', 'పెద్ద', 'చిన్న', 'పాత', 'కొత్త', 'మంచి', 'చెడు', 'ఉష్ణోగ్రత', 'రక్తపీడనం', 'షుగర్', 'హృదయం', 'ఊపిరితిత్తులు', 'కన్ను', 'చెవి', 'ముక్కు', 'నోరు', 'పంటి', 'నాలుక', 'చేయి', 'కాలు', 'ఛాతి', 'వీపు', 'పొట్ట', 'కొష్టం', 'మూత్రం', 'మలం'];
  for (const word of teluguWords) {
    if (lowerText.includes(word)) {
      return 'te';
    }
  }
  
  // Default to English
  return 'en';
}

// Store the detected input language
let detectedInputLanguage = 'en';

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Start with English for broader recognition
  recognition.maxAlternatives = 3;
  recognition.restart = false;
  
  // Voice button click handler - Toggle between listening and TTS
  chatVoiceBtn.addEventListener('click', async () => {
    // If speaking, stop speech
    if (chatVoiceBtn.classList.contains('speaking')) {
      SpeechSynthesis.cancel();
      chatVoiceBtn.classList.remove('speaking');
      return;
    }
    
    // If already listening, stop recognition
    if (chatVoiceBtn.classList.contains('listening')) {
      recognition.stop();
      return;
    }
    
    // Check microphone permission before starting
    const permissionState = await checkMicrophonePermission();
    
    if (permissionState === 'denied') {
      addMessage("🔴 Microphone access is denied. Please allow microphone access in your browser settings and refresh the page.", 'bot');
      return;
    }
    
    // If permission is 'prompt' (not granted yet), the browser will ask when we start
    // We proceed anyway - the browser will handle the permission prompt
    
    // Set recognition to try multiple languages for better recognition
    // We'll use en-US as default but it can recognize other languages too
    recognition.lang = 'en-US';
    
    // Add listening indicator
    chatVoiceBtn.classList.add('listening');
    chatInput.placeholder = translations[currentLanguage].listening;
    
    try {
      recognition.start();
    } catch (e) {
      console.log('Recognition already started or error:', e);
    }
  });
  
  // Recognition started
  recognition.onstart = () => {
    console.log('Voice recognition started');
  };
  
  // Recognition result - improved to handle interim results
  recognition.onresult = (event) => {
    let transcript = '';
    let isFinal = false;
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript = event.results[i][0].transcript;
      isFinal = event.results[i].isFinal;
      
      if (isFinal) {
        const alternatives = event.results[i];
        if (alternatives.length > 1) {
          // Get the most confident result
          transcript = alternatives[0].transcript;
        }
        
        chatInput.value = transcript;
        
        // Detect the language of the spoken input
        detectedInputLanguage = detectLanguage(transcript);
        console.log('Detected input language:', detectedInputLanguage);
        
        // Stop recognition after getting final result
        try {
          recognition.stop();
        } catch (e) {
          console.log('Recognition already stopped');
        }
        
        break;
      } else {
        // Show interim results while speaking
        chatInput.value = transcript;
      }
    }
  };
  
  // Recognition error
  recognition.onerror = (event) => {
    console.log('Voice recognition error:', event.error);
    chatVoiceBtn.classList.remove('listening');
    chatInput.placeholder = "Type your message...";
    
    let errorMessage = translations[currentLanguage].voiceError;
    
    if (event.error === 'not-allowed') {
      errorMessage = "🔴 Microphone access denied. Please allow microphone access in your browser settings. Look for a microphone icon in the address bar and click it to grant permission.";
    } else if (event.error === 'no-speech') {
      errorMessage = "🎤 No speech detected. Please try again and speak clearly.";
    } else if (event.error === 'network') {
      errorMessage = "🌐 Network error. Voice recognition requires internet connection.";
    } else if (event.error === 'aborted') {
      errorMessage = "⏹ Voice input was cancelled. Click the microphone to try again.";
    } else if (event.error === 'audio-capture') {
      errorMessage = "🎤 No microphone found. Please connect a microphone.";
    } else if (event.error === 'service-not-allowed') {
      errorMessage = "🔴 Voice service not allowed. This usually happens when the page is not served over HTTPS or in certain browser configurations.";
    } else if (event.error === 'speech-timeout') {
      errorMessage = "⏱️ No speech detected. Please speak now or try again.";
    }
    
    addMessage(errorMessage, 'bot');
  };
  
  // Recognition ended - important: stop listening and reset UI
  recognition.onend = () => {
    // Always remove listening indicator when recognition ends
    chatVoiceBtn.classList.remove('listening');
    chatInput.placeholder = "Type your message...";
    console.log('Voice recognition ended');
    
    // Only send message if there's text in the input and it wasn't just interim results
    if (chatInput.value.trim() !== '') {
      // Small delay to ensure we have the final result
      setTimeout(() => {
        sendMessage();
      }, 100);
    }
  };
} else {
  chatVoiceBtn.addEventListener('click', () => {
    alert(translations[currentLanguage].voiceNotSupported);
  });
}

// Pre-load voices for TTS
if (SpeechSynthesis) {
  SpeechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', SpeechSynthesis.getVoices().length);
  };
}
});
