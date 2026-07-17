const labBase = "https://kareem-swidan-dev.kareemswidan050.chatgpt.site";
const pair = (en, ar) => ({ en, ar });

const studies = {
  smartstay: {
    title: "SmartStay AI Palestine",
    kicker: pair("Graduation project · Full-stack marketplace", "مشروع تخرج · منصة Full-Stack"),
    summary: pair(
      "A bilingual accommodation marketplace built around Palestinian stays, with separate customer, property-owner, and administrator journeys and a database-level answer to double booking.",
      "منصة ثنائية اللغة لحجز أماكن الإقامة الفلسطينية، بمسارات مستقلة للعميل ومالك العقار والإدارة، وحل على مستوى قاعدة البيانات لمنع الحجز المزدوج."
    ),
    role: pair("Full-stack developer within the graduation-project team", "مطوّر Full-Stack ضمن فريق مشروع التخرج"),
    team: pair("Team graduation project", "مشروع تخرج جماعي"),
    status: pair("Public full-stack deployment", "نسخة Full-Stack عامة"),
    image: "https://raw.githubusercontent.com/kareemswidan/smartstay-ai-palestine/main/docs/screenshots/01-home-english.png",
    gallery: [
      ["https://raw.githubusercontent.com/kareemswidan/smartstay-ai-palestine/main/docs/screenshots/12-owner-dashboard.png", pair("Property-owner dashboard", "لوحة مالك العقار")],
      ["https://raw.githubusercontent.com/kareemswidan/smartstay-ai-palestine/main/docs/screenshots/16-admin-dashboard.png", pair("Administration dashboard", "لوحة الإدارة")]
    ],
    live: "https://smartstay-palestine.kareemswidan11.workers.dev/",
    repo: "https://github.com/kareemswidan/smartstay-ai-palestine",
    problem: pair(
      "Local accommodation discovery is fragmented across social pages and messages. Guests cannot reliably verify availability, while hosts need professional listings, inventory control, and a clear approval workflow.",
      "البحث عن أماكن الإقامة المحلية موزّع بين صفحات ورسائل متفرقة؛ لا يستطيع الضيف التأكد من التوفر بسهولة، ويحتاج المالك إلى إعلانات احترافية وتحكم بالمواعيد ومسار اعتماد واضح."
    ),
    roleText: pair(
      "I contributed across the product stack: bilingual responsive interfaces, customer and owner flows, server routes, relational data, secure sessions, and booking-conflict protection. The portfolio describes the work as a team project and does not claim sole authorship.",
      "ساهمت عبر طبقات المنتج: واجهات متجاوبة ثنائية اللغة، ومسارات العميل والمالك، وواجهات الخادم، والبيانات العلائقية، والجلسات الآمنة، ومنع تعارض الحجوزات. وتوضح صفحة العرض أنه مشروع جماعي ولا تنسب العمل كاملًا لشخص واحد."
    ),
    stack: [
      ["Next.js + TypeScript", pair("One typed codebase for public pages, dashboards, and route handlers.", "قاعدة كود واحدة ومكتوبة الأنواع للصفحات واللوحات وواجهات الخادم.")],
      ["Cloudflare D1 + Drizzle", pair("Relational ownership and booking data with explicit schema and migrations.", "بيانات علائقية للملكية والحجوزات مع مخطط وترحيلات واضحة.")],
      ["Cloudflare Workers", pair("The complete Next.js application runs publicly at the edge with its server routes and role-aware workflows.", "يعمل تطبيق Next.js الكامل علنًا على الحافة مع مسارات الخادم وتدفقات الصلاحيات حسب الدور.")],
      ["Local AI", pair("Useful trip-planning assistance without making the core booking flow depend on a paid API.", "مساعدة مفيدة في تخطيط الرحلة دون ربط الحجز الأساسي بواجهة مدفوعة.")]
    ],
    architecture: [
      [pair("Interface", "الواجهة"), pair("Bilingual pages and role dashboards", "صفحات ثنائية اللغة ولوحات حسب الدور")],
      [pair("API", "الخادم"), pair("Auth, properties, uploads, bookings", "الحسابات والعقارات والرفع والحجوزات")],
      [pair("Data", "البيانات"), pair("D1 relational model and unique slots", "نموذج D1 وقيود المواعيد الفريدة")],
      [pair("Storage", "التخزين"), pair("D1-backed property media", "صور العقارات محفوظة عبر D1")]
    ],
    challenges: [
      [pair("Double booking", "الحجز المزدوج"), pair("Availability checks alone can race. Each booked time becomes a unique database slot; a collision returns HTTP 409 and the incomplete booking is removed.", "فحص التوفر وحده قد يتعارض مع طلب متزامن. لذلك يصبح كل وقت محجوز سجلًا فريدًا في قاعدة البيانات؛ وعند التصادم يعاد 409 ويحذف الحجز غير المكتمل.")],
      [pair("Three user roles", "ثلاثة أدوار"), pair("Customer, owner, and admin queries are scoped on the server, including ownership checks before property changes.", "يتم تقييد استعلامات العميل والمالك والإدارة على الخادم، مع فحص ملكية العقار قبل أي تعديل.")],
      [pair("Arabic and English", "العربية والإنجليزية"), pair("Language and direction switch together, including navigation, forms, dashboards, and mobile layouts.", "تتغير اللغة واتجاه الصفحة معًا في التنقل والنماذج واللوحات وتصميم الهاتف.")]
    ],
    evidence: [["4", pair("automated suites", "مجموعات اختبار")], ["66", pair("product screenshots", "صورة للمنتج")], ["3", pair("role portals", "بوابات أدوار")], ["CI", pair("build verified", "بناء متحقق")]],
    quality: [
      pair("GitHub Actions runs lint, production build, and automated tests.", "يقوم GitHub Actions بتشغيل الفحص والبناء واختبارات المشروع."),
      pair("Docker provides a reproducible local environment; deployment bindings stay outside source control.", "يوفر Docker بيئة محلية قابلة للتكرار وتبقى إعدادات النشر السرية خارج الكود."),
      pair("Architecture and authorization documents explain the schema, sessions, roles, uploads, and booking constraints.", "يوضح توثيق المعمارية والصلاحيات المخطط والجلسات والأدوار والرفع وقيود الحجز.")
    ],
    demos: [
      ["Guest", "guest@smartstay.ps", "Guest123!"],
      ["Owner", "owner@smartstay.ps", "Owner123!"],
      ["Admin", "admin@smartstay.ps", "Admin123!"]
    ]
  },
  velora: {
    title: "Velora Mobility",
    kicker: pair("Individual project · Multi-role mobility marketplace", "مشروع فردي · منصة خدمات مركبات متعددة الأدوار"),
    summary: pair(
      "A full-stack marketplace connecting drivers with stations, car washes, service businesses, and an inventory-aware E-Mart through customer, owner, and administrator portals.",
      "منصة Full-Stack تربط السائقين بالمحطات ومغاسل السيارات ومراكز الخدمة ومتجر يعتمد على المخزون، من خلال بوابات للعميل والمالك والإدارة."
    ),
    role: pair("Product design and full-stack development", "تصميم المنتج وتطوير Full-Stack"),
    team: pair("Individual project", "مشروع فردي"),
    status: pair("Original UI + public backend lab", "التصميم الأصلي + Backend عام"),
    image: "../../velora-home.png",
    gallery: [
      ["https://raw.githubusercontent.com/kareemswidan/velora-mobility-marketplace/main/docs/screenshots/07-customer-portal.png", pair("Customer portal", "بوابة العميل")],
      ["https://raw.githubusercontent.com/kareemswidan/velora-mobility-marketplace/main/docs/screenshots/09-admin-dashboard.png", pair("Platform administration", "إدارة المنصة")]
    ],
    live: labBase + "/original/velora/index.html",
    backend: labBase + "/velora",
    repo: "https://github.com/kareemswidan/velora-mobility-marketplace",
    problem: pair(
      "Mobility services are usually split across maps, calls, store visits, and disconnected booking tools. The product needed one discovery and operations layer without losing ownership boundaries.",
      "غالبًا ما تكون خدمات المركبات موزعة بين الخرائط والاتصالات وزيارات المتجر وأنظمة حجز منفصلة. احتاج المنتج إلى طبقة موحدة للاكتشاف والتشغيل مع الحفاظ على حدود ملكية كل نشاط."
    ),
    roleText: pair(
      "I designed and implemented the customer experience, business onboarding, owner operations, administration, reservations, store checkout, data model, security controls, and automated verification.",
      "صممت ونفذت تجربة العميل، وانضمام الأنشطة، وعمليات المالك، والإدارة، والحجوزات، وطلبات المتجر، ونموذج البيانات، وضوابط الأمان، والتحقق الآلي."
    ),
    stack: [
      ["Next.js + React", pair("Server rendering and interactive portals in one product.", "عرض من الخادم وبوابات تفاعلية في منتج واحد.")],
      ["TypeScript", pair("Shared types reduce mistakes across forms, APIs, and dashboards.", "أنواع مشتركة تقلل الأخطاء بين النماذج وواجهات الخادم واللوحات.")],
      ["MySQL + Prisma", pair("Relational ownership, reservations, inventory, audit logs, and transactions.", "ملكية علائقية وحجوزات ومخزون وسجل تدقيق ومعاملات.")],
      ["JWT session cookie", pair("Short-lived role-bearing session stored in an HttpOnly cookie.", "جلسة محددة المدة تحمل الدور داخل Cookie غير متاح لـJavaScript.")]
    ],
    architecture: [
      [pair("Experience", "التجربة"), pair("Discovery, booking, store, portals", "اكتشاف وحجز ومتجر وبوابات")],
      [pair("API", "الخادم"), pair("Validated and rate-limited mutations", "عمليات متحققة ومحدودة المعدل")],
      [pair("Domain", "النطاق"), pair("Role and ownership rules", "قواعد الدور والملكية")],
      [pair("Database", "قاعدة البيانات"), pair("Prisma transactions on MySQL", "معاملات Prisma على MySQL")]
    ],
    challenges: [
      [pair("Timezone-aware booking", "حجز يراعي المنطقة الزمنية"), pair("The API evaluates branch hours in the station timezone and blocks active reservations inside the conflict window.", "تقيّم الواجهة ساعات الفرع حسب منطقته الزمنية وتمنع الحجوزات النشطة داخل نافذة التعارض.")],
      [pair("Safe inventory", "مخزون آمن"), pair("Checkout decrements stock conditionally inside one transaction, so concurrent orders cannot silently oversell.", "يتم خصم المخزون بشرط داخل معاملة واحدة حتى لا تتجاوز الطلبات المتزامنة الكمية المتاحة.")],
      [pair("Ownership", "الملكية"), pair("Owner mutations query by both resource ID and authenticated owner ID; admin and customer routes require exact roles.", "تبحث عمليات المالك برقم المورد ورقم المالك المسجل معًا، وتتطلب مسارات الإدارة والعميل الدور الصحيح.")]
    ],
    evidence: [["6", pair("automated tests", "اختبارات آلية")], ["10", pair("documented screens", "شاشات موثقة")], ["3", pair("role portals", "بوابات أدوار")], ["Docker", pair("one-command stack", "تشغيل كامل")]],
    quality: [
      pair("CI runs the security tests and a production Next.js build.", "يشغّل CI اختبارات الأمان وبناء Next.js للإنتاج."),
      pair("Docker Compose starts MySQL, applies the Prisma schema, seeds demo users, and launches the app.", "يشغّل Docker Compose قاعدة MySQL ويطبق المخطط ويضيف حسابات التجربة ثم يبدأ التطبيق."),
      pair("Security tests inspect password hashing, cookie flags, ownership scopes, booking conflicts, and inventory transactions.", "تفحص اختبارات الأمان تشفير كلمات المرور وخصائص Cookie والملكية وتعارض الحجز ومعاملات المخزون.")
    ],
    demos: [
      ["Customer", "customer@velora.demo", "CustomerDemo2026!"],
      ["Business owner", "owner@velora.demo", "OwnerDemo2026!"],
      ["Admin", "admin@velora.energy", "VeloraAdmin2026!"]
    ]
  },
  nexora: {
    title: "Nexora",
    kicker: pair("Individual project · Laravel digital marketplace", "مشروع فردي · متجر رقمي بـLaravel"),
    summary: pair(
      "A complete bilingual digital-products storefront with catalogue, product pages, cart, transactional guest checkout, signed confirmation links, order tracking, and a privacy-first local matcher.",
      "متجر كامل ثنائي اللغة للمنتجات الرقمية، يضم الكتالوج وصفحات المنتجات والسلة ودفعًا تجريبيًا بمعاملة واحدة وروابط تأكيد موقعة وتتبع الطلب ومساعدًا محليًا يحترم الخصوصية."
    ),
    role: pair("Product design and full-stack development", "تصميم المنتج وتطوير Full-Stack"),
    team: pair("Individual project", "مشروع فردي"),
    status: pair("Original UI + persistent order lab", "التصميم الأصلي + طلبات محفوظة"),
    image: "https://raw.githubusercontent.com/kareemswidan/nexora-laravel/main/docs/screenshots/01-home-en.png",
    gallery: [
      ["https://raw.githubusercontent.com/kareemswidan/nexora-laravel/main/docs/screenshots/03-product-en.png", pair("Product details", "تفاصيل المنتج")],
      ["https://raw.githubusercontent.com/kareemswidan/nexora-laravel/main/docs/screenshots/10-checkout-en.png", pair("Guest checkout", "الدفع كزائر")]
    ],
    live: labBase + "/original/nexora/index.html",
    backend: labBase + "/nexora",
    repo: "https://github.com/kareemswidan/nexora-laravel",
    problem: pair(
      "The goal was to prove an end-to-end marketplace flow, not a landing-page mockup: visitors must discover a product, keep a cart, complete checkout, receive an order number, and retrieve the same order safely.",
      "كان الهدف إثبات مسار متجر كامل وليس Landing Page فقط: يكتشف الزائر المنتج ويحفظ السلة ويتم الطلب ويحصل على رقم ثم يستطيع استرجاع نفس الطلب بأمان."
    ),
    roleText: pair(
      "I built the bilingual information architecture, multi-page Blade interface, product and order models, session cart, checkout transaction, tracking flow, signed order access, local recommendation logic, tests, and deployment packaging.",
      "بنيت هيكل المحتوى ثنائي اللغة، وواجهات Blade متعددة الصفحات، ونماذج المنتجات والطلبات، وسلة الجلسة، ومعاملة الطلب، والتتبع، والوصول الموقع للطلب، ومنطق التوصية المحلي، والاختبارات، وحزمة التشغيل."
    ),
    stack: [
      ["Laravel + PHP", pair("Mature routing, validation, CSRF protection, signed URLs, and test tools.", "توجيه وتحقق وحماية CSRF وروابط موقعة وأدوات اختبار ناضجة.")],
      ["Blade + JavaScript", pair("Fast server-rendered pages with focused browser interactions.", "صفحات سريعة من الخادم مع تفاعلات مركزة في المتصفح.")],
      ["MySQL + Eloquent", pair("Products, orders, and order items with transactional persistence.", "منتجات وطلبات وعناصر طلب محفوظة داخل معاملات.")],
      ["Local matcher", pair("Deterministic recommendations without sending preferences to a third party.", "توصيات محلية دون إرسال تفضيلات المستخدم لطرف خارجي.")]
    ],
    architecture: [
      [pair("Storefront", "المتجر"), pair("Catalogue, product, cart, RTL", "كتالوج ومنتج وسلة وRTL")],
      [pair("Controllers", "المتحكمات"), pair("Validation and checkout workflow", "التحقق ومسار الطلب")],
      [pair("Transaction", "المعاملة"), pair("Order plus order items", "الطلب وعناصره معًا")],
      [pair("Tracking", "التتبع"), pair("Order number + matching email", "رقم الطلب + البريد المطابق")]
    ],
    challenges: [
      [pair("Order privacy", "خصوصية الطلب"), pair("Confirmation now requires a 20-minute signed URL; long-term tracking requires both the public order number and the matching normalized email.", "يتطلب التأكيد رابطًا موقعًا لمدة 20 دقيقة؛ ويتطلب التتبع رقم الطلب العام والبريد المطابق بعد توحيده.")],
      [pair("Atomic checkout", "طلب كامل أو لا شيء"), pair("Order and item records are created inside one database transaction.", "يتم إنشاء الطلب وعناصره داخل معاملة قاعدة بيانات واحدة.")],
      [pair("Bilingual product", "منتج ثنائي اللغة"), pair("Content, typography, direction, themes, and motion work in both Arabic and English.", "يعمل المحتوى والخط والاتجاه والوضعان والحركة بالعربية والإنجليزية.")]
    ],
    evidence: [["4", pair("feature tests", "اختبارات Feature")], ["10", pair("documented screens", "شاشات موثقة")], ["7", pair("public pages", "صفحات عامة")], ["CI", pair("assets + PHP tests", "بناء + اختبارات")]],
    quality: [
      pair("Feature tests prove signed confirmation access and email-scoped tracking.", "تثبت اختبارات Feature الوصول الموقع للتأكيد والتتبع المقيد بالبريد."),
      pair("CI compiles Laravel Mix assets and runs the PHP suite with in-memory SQLite.", "يبني CI ملفات Laravel Mix ويشغل اختبارات PHP باستخدام SQLite في الذاكرة."),
      pair("Docker Compose supplies MySQL, migrations, seed products, and the complete multi-page app.", "يوفر Docker Compose قاعدة MySQL والترحيلات والمنتجات التجريبية والتطبيق متعدد الصفحات.")
    ],
    demos: []
  },
  lexiguard: {
    title: "LexiGuard AI",
    kicker: pair("Individual project · Secure document analysis", "مشروع فردي · تحليل آمن للمستندات"),
    summary: pair(
      "An authenticated Laravel workspace for document upload, text extraction, risk analysis, reports, and bilingual questions grounded in the user's own document.",
      "مساحة Laravel محمية لرفع المستندات واستخراج النص وتحليل المخاطر وإصدار التقارير وطرح أسئلة بالعربية والإنجليزية اعتمادًا على مستند المستخدم نفسه."
    ),
    role: pair("Product design and full-stack development", "تصميم المنتج وتطوير Full-Stack"),
    team: pair("Individual project", "مشروع فردي"),
    status: pair("Original UI + public secure backend", "التصميم الأصلي + Backend آمن"),
    image: "../../lexiguard-home.jpg",
    gallery: [
      [labBase + "/original/lexiguard/index.html", pair("Original multi-page interface", "الواجهة الأصلية متعددة الصفحات")],
      ["../../lexiguard-home.jpg", pair("LexiGuard product identity", "هوية منتج LexiGuard")]
    ],
    live: labBase + "/original/lexiguard/index.html",
    backend: labBase + "/lexiguard",
    repo: "https://github.com/kareemswidan/lexiguard-ai-laravel",
    problem: pair(
      "Document analysis products handle sensitive files, so a convincing demo must do more than display a score. It needs real accounts, private ownership, validated uploads, extractable text, explainable findings, and safe deletion.",
      "تتعامل منتجات تحليل المستندات مع ملفات حساسة، لذلك لا يكفي عرض نسبة. يلزم حساب حقيقي وملكية خاصة ورفع متحقق واستخراج نص ونتائج قابلة للشرح وحذف آمن."
    ),
    roleText: pair(
      "I designed the workflow and implemented registration, verification, sessions, document ownership, extraction fallbacks, local analysis, document-grounded chat, reports, admin review, tests, and deployment packaging.",
      "صممت المسار ونفذت التسجيل والتحقق والجلسات وملكية المستندات وبدائل استخراج النص والتحليل المحلي والمحادثة المرتبطة بالمستند والتقارير ومراجعة الإدارة والاختبارات وحزمة التشغيل."
    ),
    stack: [
      ["Laravel + Blade", pair("Secure server workflows and a polished multi-page bilingual interface.", "مسارات خادم آمنة وواجهة احترافية متعددة الصفحات واللغات.")],
      ["MySQL + Eloquent", pair("Explicit ownership between users, documents, analyses, and chats.", "ملكية واضحة بين المستخدمين والمستندات والتحليلات والمحادثات.")],
      ["PDF / Word extractors", pair("Layered parsers keep extraction useful across environments.", "طبقات متعددة للاستخراج تحافظ على الفائدة عبر البيئات.")],
      ["Local analysis + optional AI", pair("Core risk analysis works without a paid key; enrichment is optional.", "تحليل المخاطر الأساسي يعمل دون مفتاح مدفوع والإثراء اختياري.")]
    ],
    architecture: [
      [pair("Secure UI", "واجهة آمنة"), pair("Accounts, uploads, reports, chat", "حسابات ورفع وتقارير ومحادثة")],
      [pair("Authorization", "الصلاحيات"), pair("Session, role, ownership", "جلسة ودور وملكية")],
      [pair("Analysis", "التحليل"), pair("Extraction and risk engine", "استخراج ومحرك مخاطر")],
      [pair("Storage", "التخزين"), pair("Private files + relational records", "ملفات خاصة + سجلات علائقية")]
    ],
    challenges: [
      [pair("Cross-user isolation", "عزل المستخدمين"), pair("Every read, report, question, download, and delete checks document ownership on the server; admins are the only explicit exception.", "كل قراءة أو تقرير أو سؤال أو تنزيل أو حذف يفحص ملكية المستند على الخادم؛ والاستثناء الصريح الوحيد هو الإدارة.")],
      [pair("Extraction reliability", "موثوقية الاستخراج"), pair("PDF and Word processing use primary tools and fallbacks instead of assuming one parser works everywhere.", "تستخدم معالجة PDF وWord أدوات أساسية وبدائل بدل افتراض نجاح محلل واحد في كل بيئة.")],
      [pair("Explainable results", "نتائج قابلة للفهم"), pair("The local engine returns score, clauses, dates, recommendations, and a summary instead of an unexplained label.", "يعيد المحرك المحلي درجة وبنودًا وتواريخ وتوصيات وملخصًا بدل تصنيف بلا تفسير.")]
    ],
    evidence: [["15", pair("feature tests", "اختبار Feature")], ["4", pair("document formats", "صيغ مستندات")], ["2", pair("languages", "لغتان")], ["R2", pair("private demo files", "ملفات تجربة خاصة")]],
    quality: [
      pair("The feature suite covers authentication, upload validation, document questions, reports, deletion, admin access, and ownership rejection.", "تغطي الاختبارات الحسابات والتحقق من الرفع والأسئلة والتقارير والحذف ووصول الإدارة ورفض الملكية الخاطئة."),
      pair("CI builds Vite assets and runs Laravel tests; Docker includes PHP extensions and Poppler.", "يبني CI ملفات Vite ويشغل Laravel، ويتضمن Docker إضافات PHP وPoppler."),
      pair("The public backend stores each demo document under the authenticated user and scopes D1/R2 operations by that user.", "يحفظ الـBackend العام كل مستند تجريبي للمستخدم المسجل ويقيد عمليات D1/R2 به.")
    ],
    demos: [["Legal analyst", "demo@lexiguard.ai", "LexiGuard2026!"]]
  },
  dozo: {
    title: "DOZO Intelligence",
    kicker: pair("Individual project · Arabic-first AI product studio", "مشروع فردي · استوديو منتجات وذكاء اصطناعي"),
    summary: pair(
      "A multi-page Arabic-first product-studio experience with real accounts, secure sessions, persisted project briefs, lead capture, and an AI Product Strategist workspace.",
      "تجربة متعددة الصفحات لاستوديو منتجات عربي أولًا، مع حسابات حقيقية وجلسات آمنة وموجزات مشاريع محفوظة ونماذج تواصل ومساحة مستشار منتجات ذكي."
    ),
    role: pair("Product design and full-stack development", "تصميم المنتج وتطوير Full-Stack"),
    team: pair("Individual project", "مشروع فردي"),
    status: pair("Public multi-page full-stack demo", "تجربة Full-Stack عامة متعددة الصفحات"),
    image: "../../dozo-home.jpg",
    gallery: [
      [labBase + "/original/dozo/html/index.html", pair("DOZO public website", "موقع DOZO العام")],
      [labBase + "/original/dozo/html/sign-up.html", pair("Account creation journey", "مسار إنشاء الحساب")]
    ],
    live: labBase + "/original/dozo/html/index.html",
    repo: "https://github.com/kareemswidan/dozoo",
    problem: pair(
      "A product studio needs to turn a vague idea into a structured brief while also proving that its public website, account journey, and client workspace are one connected product.",
      "يحتاج استوديو المنتجات إلى تحويل الفكرة غير الواضحة إلى موجز منظم، مع إثبات أن الموقع العام ومسار الحساب ومساحة العميل منتج واحد مترابط."
    ),
    roleText: pair(
      "I designed the Arabic-first brand and multi-page interface, then connected signup, login, hashed sessions, saved briefs, leads, and the strategist workflow to cloud persistence.",
      "صممت الهوية العربية أولًا والواجهة متعددة الصفحات، ثم ربطت إنشاء الحساب والدخول والجلسات المشفرة وحفظ الموجزات والعملاء المحتملين ومسار المستشار بالتخزين السحابي."
    ),
    stack: [
      ["HTML + CSS + JavaScript", pair("Preserves the original custom multi-page design without a framework rewrite.", "يحافظ على التصميم الأصلي المخصص متعدد الصفحات دون إعادة كتابته بإطار.")],
      ["Cloudflare D1", pair("Persists users, sessions, briefs, and leads for the public demo.", "يحفظ المستخدمين والجلسات والموجزات ونماذج التواصل في التجربة العامة.")],
      ["Web Crypto", pair("PBKDF2 passwords and server-stored session-token hashes.", "كلمات مرور PBKDF2 وحفظ تجزئة رمز الجلسة على الخادم.")],
      ["AI strategist", pair("Transforms product answers into a structured, revisitable brief.", "يحول إجابات المنتج إلى موجز منظم يمكن الرجوع إليه.")]
    ],
    architecture: [
      [pair("Multi-page UI", "واجهة متعددة الصفحات"), pair("Marketing, auth, workspace", "تسويق وحساب ومساحة عمل")],
      [pair("API", "الخادم"), pair("Signup, login, briefs, leads", "تسجيل ودخول وموجزات وتواصل")],
      [pair("Security", "الأمان"), pair("PBKDF2 and hashed sessions", "PBKDF2 وجلسات مجزأة")],
      [pair("Database", "قاعدة البيانات"), pair("D1 persistent records", "سجلات D1 محفوظة")]
    ],
    challenges: [
      [pair("Preserving the original design", "الحفاظ على التصميم الأصلي"), pair("Backend routes were added around the existing page system so the public demo keeps the intended visual identity and navigation.", "أضيفت مسارات الـBackend حول نظام الصفحات الموجود حتى تحافظ التجربة العامة على الهوية والتنقل الأصليين.")],
      [pair("Session security", "أمان الجلسة"), pair("The browser receives a random cookie while the database stores only its hash and expiry.", "يحصل المتصفح على Cookie عشوائي بينما تحفظ قاعدة البيانات تجزئته ووقت انتهاءه فقط.")],
      [pair("Useful AI output", "مخرج ذكاء مفيد"), pair("The workspace organizes inputs into a product brief instead of exposing an empty generic chat box.", "تنظم مساحة العمل المدخلات في موجز منتج بدل صندوق محادثة عام وفارغ.")]
    ],
    evidence: [["D1", pair("persistent backend", "Backend محفوظ")], ["PBKDF2", pair("password derivation", "اشتقاق كلمات المرور")], ["Multi-page", pair("original journey", "المسار الأصلي")], ["RTL", pair("Arabic-first UI", "واجهة عربية أولًا")]],
    quality: [
      pair("Same-origin checks protect state-changing API requests.", "تحمي فحوصات المصدر نفسه طلبات تغيير البيانات."),
      pair("Session records expire and store token hashes rather than raw browser tokens.", "تنتهي سجلات الجلسات وتحفظ التجزئة بدل الرمز الخام في المتصفح."),
      pair("The public project lab verifies that DOZO pages and backend routes are included in every production build.", "يتحقق مختبر المشاريع العام من وجود صفحات DOZO ومسارات الخادم في كل بناء إنتاجي.")
    ],
    demos: []
  },
  electrical: {
    title: "Electrical Solutions",
    kicker: pair("Individual project · Responsive business catalogue", "مشروع فردي · كتالوج أعمال متجاوب"),
    summary: pair(
      "A fast multi-page electrical-products website with searchable categories, product details, company information, legal pages, and direct phone and WhatsApp conversion paths.",
      "موقع سريع متعدد الصفحات للمنتجات الكهربائية، مع بحث وتصنيفات وتفاصيل المنتجات ومعلومات الشركة وصفحات قانونية ومسارات مباشرة للاتصال وواتساب."
    ),
    role: pair("Design and front-end development", "التصميم وتطوير الواجهة"),
    team: pair("Individual project", "مشروع فردي"),
    status: pair("Public static deployment", "نسخة Static عامة"),
    image: "https://raw.githubusercontent.com/kareemswidan/kareem-swidan-electrical/main/screenshots/desktop-home.png",
    gallery: [
      ["https://raw.githubusercontent.com/kareemswidan/kareem-swidan-electrical/main/screenshots/mobile-home.png", pair("Responsive mobile experience", "تجربة الهاتف المتجاوبة")],
      ["https://raw.githubusercontent.com/kareemswidan/kareem-swidan-electrical/main/images/hero-electrical-control.png", pair("Original product photography", "صورة المنتج الأصلية")]
    ],
    live: labBase + "/demos/electrical/index.html",
    repo: "https://github.com/kareemswidan/kareem-swidan-electrical",
    problem: pair(
      "A local electrical supplier needs customers to find the right category and contact the business quickly. A heavy account system would add cost without helping that job.",
      "يحتاج مورد كهربائيات محلي إلى وصول العميل بسرعة للتصنيف الصحيح ثم التواصل. إضافة نظام حسابات ثقيل سترفع التكلفة دون خدمة هذا الهدف."
    ),
    roleText: pair(
      "I created the visual system, responsive layouts, multi-page navigation, searchable catalogue behavior, product-detail state, accessibility touches, SEO metadata, and direct contact hand-off.",
      "أنشأت النظام البصري والتصميم المتجاوب والتنقل متعدد الصفحات وسلوك البحث في الكتالوج وحالة تفاصيل المنتج وتحسينات الوصول وبيانات SEO ومسار التواصل المباشر."
    ),
    stack: [
      ["Semantic HTML", pair("Accessible, indexable pages with no runtime dependency.", "صفحات قابلة للوصول والفهرسة دون اعتماد وقت التشغيل.")],
      ["Responsive CSS", pair("One design system scales from desktop to mobile.", "نظام تصميم واحد يتكيف من الحاسوب إلى الهاتف.")],
      ["Vanilla JavaScript", pair("Focused search, filter, navigation, and product-detail behavior.", "بحث وفلترة وتنقل وتفاصيل منتج مركزة.")],
      ["Nginx / CDN", pair("Static delivery is the simplest reliable production architecture for this scope.", "النشر الثابت هو أبسط معمارية إنتاج موثوقة لهذا النطاق.")]
    ],
    architecture: [
      [pair("Pages", "الصفحات"), pair("Home, catalogue, details, company", "الرئيسية والكتالوج والتفاصيل والشركة")],
      [pair("Design", "التصميم"), pair("Shared responsive CSS", "CSS متجاوب مشترك")],
      [pair("Behavior", "السلوك"), pair("Search, filters, URL state", "بحث وفلاتر وحالة الرابط")],
      [pair("Conversion", "التواصل"), pair("Phone and WhatsApp", "الهاتف وواتساب")]
    ],
    challenges: [
      [pair("Complete without a backend", "اكتمال دون Backend"), pair("The architecture stays honest: the site hands off inquiries directly instead of pretending to persist data it does not need.", "تبقى المعمارية واضحة وصادقة: يحول الموقع الاستفسار مباشرة بدل الادعاء بحفظ بيانات لا يحتاجها.")],
      [pair("Multi-page consistency", "اتساق الصفحات"), pair("Shared CSS and JavaScript keep navigation, catalogue behavior, and responsive breakpoints consistent.", "يحافظ CSS وJavaScript المشتركان على اتساق التنقل والكتالوج ونقاط الاستجابة.")],
      [pair("Mobile catalogue", "كتالوج الهاتف"), pair("Product cards, controls, and contact actions remain usable on narrow screens.", "تبقى بطاقات المنتجات وعناصر التحكم والتواصل قابلة للاستخدام على الشاشات الضيقة.")]
    ],
    evidence: [["3", pair("automated tests", "اختبارات آلية")], ["7", pair("complete pages", "صفحات كاملة")], ["0", pair("runtime dependencies", "اعتماد وقت تشغيل")], ["CI", pair("navigation verified", "تنقل متحقق")]],
    quality: [
      pair("Automated tests verify every page, main navigation, search/filter hooks, responsive metadata, and contact links.", "تتحقق الاختبارات من كل صفحة والتنقل والبحث والفلترة وبيانات الاستجابة وروابط التواصل."),
      pair("GitHub Actions runs the same checks on every change.", "يشغّل GitHub Actions الفحوصات نفسها مع كل تغيير."),
      pair("The Nginx Docker image reproduces conventional production static hosting.", "تعيد صورة Nginx في Docker إنشاء استضافة Static إنتاجية تقليدية.")
    ],
    demos: []
  }
};

const labels = {
  en: {
    back: "← Back to portfolio", language: "العربية", themeDark: "Dark", themeLight: "Light",
    live: "Open live product ↗", backend: "Open full-stack lab ↗", source: "View source",
    type: "Project type", role: "My role", team: "Ownership", status: "Deployment",
    overview: "01 / Overview", problem: "The problem and my contribution.",
    architecture: "02 / Architecture", architectureTitle: "How the product is put together.",
    stack: "Technology choices", challenges: "03 / Engineering", challengesTitle: "Challenges and decisions.",
    gallery: "04 / Product", galleryTitle: "Real screens, not mockups.",
    evidence: "05 / Evidence", evidenceTitle: "Quality you can verify.",
    demo: "Demo access", demoTitle: "Try the protected workflows.",
    demoRole: "Role", demoEmail: "Email", demoPassword: "Password",
    demoNote: "Demo credentials are public. Do not upload private data or reuse these passwords.",
    cta: "Want to inspect the implementation?", portfolio: "Portfolio", built: "Designed and built by Kareem Swidan"
  },
  ar: {
    back: "العودة إلى Portfolio →", language: "English", themeDark: "داكن", themeLight: "فاتح",
    live: "فتح المشروع الكامل ↗", backend: "فتح تجربة الـFull-Stack ↗", source: "عرض الكود",
    type: "نوع المشروع", role: "دوري", team: "الملكية", status: "حالة النشر",
    overview: "01 / نظرة عامة", problem: "المشكلة ومساهمتي في الحل.",
    architecture: "02 / المعمارية", architectureTitle: "كيف تم بناء المنتج.",
    stack: "أسباب اختيار التقنيات", challenges: "03 / الهندسة", challengesTitle: "التحديات والقرارات.",
    gallery: "04 / المنتج", galleryTitle: "شاشات حقيقية وليست Mockups.",
    evidence: "05 / الأدلة", evidenceTitle: "جودة تستطيع التحقق منها.",
    demo: "حسابات التجربة", demoTitle: "جرّب المسارات المحمية.",
    demoRole: "الدور", demoEmail: "البريد", demoPassword: "كلمة المرور",
    demoNote: "هذه حسابات تجربة عامة. لا ترفع بيانات خاصة ولا تستخدم كلمات المرور نفسها في خدماتك.",
    cta: "هل تريد فحص التنفيذ؟", portfolio: "Portfolio", built: "صُمم وطُوّر بواسطة كريم سويدان"
  }
};

let language = localStorage.getItem("portfolioLanguage") === "ar" ? "ar" : "en";
let theme = localStorage.getItem("portfolioTheme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const slug = document.body.dataset.project;
const study = studies[slug];

function pick(value) {
  return typeof value === "string" ? value : value[language];
}

function render() {
  const t = labels[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.theme = theme;
  document.title = study.title + (language === "ar" ? " — دراسة حالة" : " — Case Study");
  const stack = study.stack.map(function (item) {
    return '<article><span>TECH</span><h3>' + item[0] + '</h3><p>' + pick(item[1]) + '</p></article>';
  }).join("");
  const architecture = study.architecture.map(function (item, index) {
    return '<article><span>0' + (index + 1) + '</span><h3>' + pick(item[0]) + '</h3><p>' + pick(item[1]) + '</p></article>';
  }).join("");
  const challenges = study.challenges.map(function (item) {
    return '<article><strong>' + pick(item[0]) + '</strong><p>' + pick(item[1]) + '</p></article>';
  }).join("");
  const gallery = study.gallery.map(function (item) {
    const isPage = item[0].includes("/original/");
    return '<figure>' + (isPage ? '<a href="' + item[0] + '" target="_blank" rel="noreferrer"><div class="galleryPage">↗ ' + pick(item[1]) + '</div></a>' : '<img src="' + item[0] + '" alt="' + pick(item[1]) + '" loading="lazy"><figcaption>' + pick(item[1]) + '</figcaption>') + '</figure>';
  }).join("");
  const evidence = study.evidence.map(function (item) {
    return '<div><strong>' + item[0] + '</strong><span>' + pick(item[1]) + '</span></div>';
  }).join("");
  const quality = study.quality.map(function (item) { return '<li>' + pick(item) + '</li>'; }).join("");
  const demos = study.demos.length ? '<section class="caseSection"><div class="shell sectionGrid"><p class="sectionLabel">' + t.demo + '</p><div class="sectionContent"><h2>' + t.demoTitle + '</h2><table class="demoTable"><thead><tr><th>' + t.demoRole + '</th><th>' + t.demoEmail + '</th><th>' + t.demoPassword + '</th></tr></thead><tbody>' + study.demos.map(function (item) { return '<tr><td>' + item[0] + '</td><td><code>' + item[1] + '</code></td><td><code>' + item[2] + '</code></td></tr>'; }).join("") + '</tbody></table><p class="demoNote">' + t.demoNote + '</p></div></div></section>' : "";

  document.body.innerHTML =
    '<header class="caseHeader"><nav class="shell caseNav"><a class="backLink" href="../../index.html#projects">' + t.back + '</a><div class="navTools"><button id="languageToggle">' + t.language + '</button><button id="themeToggle">' + (theme === "dark" ? t.themeLight : t.themeDark) + '</button></div></nav></header>' +
    '<main><section class="shell caseHero"><p class="eyebrow">' + pick(study.kicker) + '</p><h1>' + study.title + '</h1><p class="heroSummary">' + pick(study.summary) + '</p><div class="heroActions"><a class="primary" href="' + study.live + '" target="_blank" rel="noreferrer">' + t.live + '</a>' + (study.backend ? '<a href="' + study.backend + '" target="_blank" rel="noreferrer">' + t.backend + '</a>' : '') + '<a href="' + study.repo + '" target="_blank" rel="noreferrer">' + t.source + '</a></div><div class="factStrip"><div><span>' + t.type + '</span><strong>' + pick(study.kicker).split("·")[0] + '</strong></div><div><span>' + t.role + '</span><strong>' + pick(study.role) + '</strong></div><div><span>' + t.team + '</span><strong>' + pick(study.team) + '</strong></div><div><span>' + t.status + '</span><strong>' + pick(study.status) + '</strong></div></div></section>' +
    '<div class="heroMedia"><img src="' + study.image + '" alt="' + study.title + ' interface"></div>' +
    '<section class="caseSection"><div class="shell sectionGrid"><p class="sectionLabel">' + t.overview + '</p><div class="sectionContent"><h2>' + t.problem + '</h2><p>' + pick(study.problem) + '</p><div class="roleCard"><div><span>' + t.role + '</span><strong>' + pick(study.role) + '</strong></div><div><span>' + t.team + '</span><strong>' + pick(study.team) + '</strong></div></div><p>' + pick(study.roleText) + '</p></div></div></section>' +
    '<section class="caseSection"><div class="shell sectionGrid"><p class="sectionLabel">' + t.architecture + '</p><div class="sectionContent"><h2>' + t.architectureTitle + '</h2><div class="architecture">' + architecture + '</div><h3>' + t.stack + '</h3><div class="stackGrid">' + stack + '</div></div></div></section>' +
    '<section class="caseSection"><div class="shell sectionGrid"><p class="sectionLabel">' + t.challenges + '</p><div class="sectionContent"><h2>' + t.challengesTitle + '</h2><div class="challengeList">' + challenges + '</div></div></div></section>' +
    '<section class="caseSection"><div class="shell sectionGrid"><p class="sectionLabel">' + t.gallery + '</p><div class="sectionContent"><h2>' + t.galleryTitle + '</h2><div class="gallery">' + gallery + '</div></div></div></section>' +
    '<section class="caseSection"><div class="shell sectionGrid"><p class="sectionLabel">' + t.evidence + '</p><div class="sectionContent"><h2>' + t.evidenceTitle + '</h2><div class="evidenceGrid">' + evidence + '</div><div class="qualityCard"><ul>' + quality + '</ul></div></div></div></section>' +
    demos +
    '<section class="caseCta shell"><p class="eyebrow">' + study.title + '</p><h2>' + t.cta + '</h2><div class="heroActions" style="justify-content:center"><a class="primary" href="' + study.live + '" target="_blank" rel="noreferrer">' + t.live + '</a><a href="' + study.repo + '" target="_blank" rel="noreferrer">' + t.source + '</a></div></section></main>' +
    '<footer class="shell caseFooter"><span>' + t.built + '</span><a href="../../index.html">' + t.portfolio + '</a></footer>';

  const style = document.createElement("style");
  style.textContent = ".galleryPage{aspect-ratio:16/10;display:grid;place-items:center;padding:25px;background:var(--green);color:var(--lime);font-size:18px;font-weight:800;text-align:center}";
  document.head.appendChild(style);
  document.getElementById("languageToggle").addEventListener("click", function () {
    language = language === "en" ? "ar" : "en";
    localStorage.setItem("portfolioLanguage", language);
    render();
  });
  document.getElementById("themeToggle").addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolioTheme", theme);
    render();
  });
}

if (study) render();
