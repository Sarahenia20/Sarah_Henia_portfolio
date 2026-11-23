// Extra sections that only the campaign case study (slug market-intelligence) has: the poster, the three ideas,
// the finder's eval loop, how it was built, the honest status. English, French and Arabic; Sarah reviews FR and AR.
// Facts (EN): the project's campaign design, decisions and changelog, Nov 2026. FR and AR still describe the lead-by-lead version until translated.
// House rules: no em dashes, no client name, no repository name, no test counts.
import type { Locale } from "@/lib/i18n/config"

export const kashafPoster = "/work/kashaf-architecture.html"

const en = {
  posterTitle: "The AI agent stack",
  posterHint: "The body that stayed when the flow became campaigns: the agents, one graph, one door, one person. Hover or tap a tile to see what it is and why it is there. \"Play the life of a campaign\" walks one campaign from the news to the CRM.",
  posterOpen: "Open full screen",
  ideasTitle: "Three ideas hold it together",
  ideas: [
    ["One decision, where money and contact happen", "The first version asked a person to approve every lead. Now everything before Launch is prepared automatically and spends nothing, and one person makes one decision per campaign: launch it or drop it, with a reason. Who may launch is routed by cost and role, in code, checked again on every press. A market with extra privacy rules always goes to the senior approver, and above a ceiling the system refuses to build the campaign."],
    ["Rules in the database, not in prompts", "A rule that lives only in a prompt or in application code can be skipped by the next caller. Nothing sent before Launch and permanent do-not-contact are SurrealDB schema events: the database refuses the write and names the rule. Around them, least privilege: the CRM is reached through per-job allow-lists, and the contact and outreach tools sit behind the same gateway as the models, each with its own credential and rate limit."],
    ["Economics, and a loop that measures them", "Every campaign is costed before anything is spent: contacts to buy (people already held and still fresh are reused), people's time, and model calls read from the gateway's own records. Mizan turns that into a cost per expected reply. Reply rates start as labelled estimates; each finished campaign's measured rate, per product and channel, replaces the guess in the next estimate."],
  ] as [string, string][],
  evalTitle: "How the finder got better, and how I know",
  evalIntro:
    "Before the rewiring, Kashaf found leads, and its quality was built on evaluation. That loop still holds for the finder: every change is measured against the last, article by article. The agent never grades itself: code checks the exact rules, a stronger model judges the fuzzy quality, and a person audits the judge.",
  evalSteps: [
    ["Measure", "The finder was measured against a stronger AI judge on the same real articles, with people's blind labels as the final measure. It missed nothing, but it raised too many false alarms."],
    ["Read the failures", "The false alarms had a pattern: regulator announcements and vendor news read as a buyer's need."],
    ["Change one thing", "One rule in the finder's prompt: a regulator's or a vendor's announcement is a lead only if a named buyer has a need."],
    ["Compare, article by article", "The rule removed some false alarms, but it also dropped real leads, one of them already approved by a person. On average it looked like a cleanup; article by article, it would have cost real deals. Not promoted: the loop stopped it before it shipped."],
  ] as [string, string][],
  evalNote:
    "Promoting a change is a builder's decision, recorded in a decision file, not a click in the console. The campaigns add a second loop on the business side: once real campaigns finish, their measured reply rates replace the starting estimates. The next idea, A/B testing messages, needs enough people per version to tell a real difference from noise, so it waits for real campaigns. Built to learn, waiting for real campaigns to learn from.",
  roleTitle: "How it was built",
  role: [
    "I was the architect and owner. I defined the problem, and when the first stakeholder demo showed the system answered the wrong question, I redesigned it around campaigns: the flow, the data model, the rules, and the order of the build steps. I wrote every decision down with its reason, filled the gaps the client left with defaults marked as such, and reviewed every step before it was merged.",
    "The code was written by AI coding agents (Claude Code) that I directed, and I say that plainly because it is part of the skill. The build steps ran as separate agents in isolated git worktrees, in parallel, and were then merged and tested together. What made that work was the architecture: a shared data model first, one decision record and its tests per step, and rules the agents could not bend. The same rule applies to my tools as to the product: an AI proposes, a person decides.",
  ],
  statusTitle: "Where it stands",
  numbersCaption: "As of November 2026",
  numbers: [] as [string, string][],
  done: [
    "Every step of the campaign flow is built, merged and tested: events matched to a product, contacts, messages, cost and score, the twice-weekly ranked batch, outreach, replies and results.",
    "A launch screen in English and Arabic (right to left), with approval by cost and role checked on the server, and pages for calls and replies.",
    "The two hardest rules enforced by the database: nothing sent before Launch, and do-not-contact is permanent.",
    "The CRM receives only launched campaigns and the people who answered, through a create-only allow-list.",
    "The data and privacy document updated before any contact is stored.",
  ],
  notYet: [
    "Not run live yet: it needs the client's tool keys and a person's first Launch.",
    "No real reply numbers: reply rates are labelled starting estimates until real campaigns replace them.",
    "A/B testing messages is the next idea, not built: it needs real campaigns with enough people per version.",
    "Not deployed to a server yet.",
  ],
  doneLabel: "Built",
  notYetLabel: "Not yet",
  shotsTitle: "Screenshots",
}

export type KashafExtras = typeof en

const fr: KashafExtras = {
  posterTitle: "La pile d'agents IA",
  posterHint: "Survolez ou touchez une tuile pour voir ce que c'est et pourquoi elle est là. « Play the life of a lead » fait traverser tout le système à une piste.",
  posterOpen: "Ouvrir en plein écran",
  ideasTitle: "Trois idées tiennent le tout",
  ideas: [
    ["Une mémoire", "Tout ce que savent les agents vit dans un seul graphe de connaissances SurrealDB : articles, pistes, entreprises, décisions des personnes, appels de modèle. Une entreprise est un nœud, chaque piste pointe vers son article et chaque article vers sa source. Les agents récupèrent des faits reliés et prouvés (GraphRAG), jamais un texte qui ne fait que se ressembler."],
    ["Une porte", "Aucun agent n'appelle un modèle directement ni ne détient de clé. Chaque appel passe par Kong, avec la clé, la limite de débit et l'identifiant de requête de l'agent, puis par LiteLLM, qui choisit le vrai modèle, bascule si un fournisseur échoue et donne le coût exact."],
    ["Une personne", "L'agent propose, une personne décide, le système enregistre. Rien n'atteint le CRM ni ne quitte le système sans la validation et le motif d'une personne. Une décision en masse, ou prise par une IA au nom de quelqu'un, est retenue par le code. Le juge IA peut recommander ; il ne décide jamais."],
  ],
  evalTitle: "Comment il s'améliore, et comment je le sais",
  evalIntro:
    "Aucun changement n'est livré sur une intuition : chaque changement est mesuré face au précédent, article par article, et un modèle plus puissant et une personne vérifient le travail de l'agent. L'agent ne s'évalue jamais lui-même : le code vérifie les règles exactes, un modèle plus puissant juge la qualité floue, et une personne audite le juge.",
  evalSteps: [
    ["Mesurer", "Le chercheur est mesuré face à un juge IA plus puissant, sur les mêmes vrais articles. Il ne ratait rien, mais levait trop de fausses alertes."],
    ["Lire les échecs", "Les fausses alertes suivaient un motif : des annonces de régulateurs et des actualités de fournisseurs lues comme un besoin d'acheteur."],
    ["Changer une seule chose", "Une règle dans le prompt du chercheur : l'annonce d'un régulateur ou d'un fournisseur n'est une piste que si un acheteur nommé a un besoin."],
    ["Comparer, article par article", "La règle a supprimé des fausses alertes, mais elle a aussi fait perdre de vraies pistes, dont une déjà validée par une personne. En moyenne, elle ressemblait à un nettoyage ; article par article, elle aurait coûté de vraies affaires. Non retenue : la boucle l'a arrêtée avant sa mise en service."],
  ],
  evalNote:
    "Retenir un changement est une décision de l'architecte, consignée dans un registre de décision, pas un clic dans la console commerciale. Il y a deux niveaux de conseil, et les personnes décident des deux : « Help me decide » donne l'avis d'un modèle plus puissant sur une piste, et le journal d'expériences dit s'il faut changer la façon dont l'agent raisonne. À côté de la boucle : une page qualité avec précision, rappel et matrice de confusion, et un petit classifieur interne (TF-IDF et régression logistique) réentraîné chaque matin, mesuré avant d'être utilisé.",
  roleTitle: "Comment il a été construit",
  role: [
    "J'étais responsable du produit et de l'architecture. J'ai défini le problème, choisi chaque grande orientation (un graphe de connaissances, une passerelle gouvernée, une personne qui décide de chaque action, une qualité pilotée par l'évaluation), consigné chaque décision technique dans un registre de décisions, revu le travail à chaque étape et fait tourner le système sur des données réelles.",
    "Le code a été écrit en étroite collaboration avec des agents de code IA (Claude Code), que j'ai dirigés et relus, et les commits sont co-signés. Construire ainsi fait partie du propos : mes propres outils suivent les mêmes règles. Claude Code n'a jamais le droit d'enregistrer une décision sur une piste au nom d'une personne.",
  ],
  statusTitle: "Où il en est",
  numbersCaption: "Au 16 nov. 2026",
  numbers: [],
  done: [
    "Tourne chaque matin sur une machine, de bout en bout, et écrit les pistes validées dans un CRM Odoo avec leur preuve et leur score.",
    "Console en anglais et en arabe (de droite à gauche), avec traduction à la demande.",
    "Un kit serveur est prêt : Docker, Caddy, sauvegardes et restauration.",
  ],
  notYet: [
    "Pas encore déployé sur un serveur.",
    "Pas encore mesuré face aux commerciaux du client : les étiquettes viennent pour l'instant du juge IA.",
    "Pas encore de modèle sur mesure : le classifieur interne est petit. Affiner un modèle ouvert est une direction, pas un résultat.",
    "Pas encore d'alertes : une personne lit le rapport du matin.",
  ],
  doneLabel: "Construit",
  notYetLabel: "Pas encore",
  shotsTitle: "Captures d'écran",
}

const ar: KashafExtras = {
  posterTitle: "حزمة وكلاء الذكاء الاصطناعي",
  posterHint: "مرّر المؤشر أو المس أي مربع لترى ما هو ولماذا هو هناك. زر \"Play the life of a lead\" يمرّ بفرصة واحدة عبر النظام كله.",
  posterOpen: "فتح بملء الشاشة",
  ideasTitle: "ثلاث أفكار تجمع النظام",
  ideas: [
    ["ذاكرة واحدة", "كل ما يعرفه الوكلاء يعيش في رسم معرفي واحد في SurrealDB: المقالات والفرص والشركات وقرارات البشر واستدعاءات النماذج. الشركة الواحدة عقدة واحدة، وكل فرصة تشير إلى مقالها وكل مقال إلى مصدره. يسترجع الوكلاء حقائق مترابطة ومثبتة (GraphRAG)، لا نصاً يشبهها فقط."],
    ["باب واحد", "لا يستدعي أي وكيل نموذجاً مباشرة ولا يحمل مفتاح مزوّد. كل استدعاء يمر عبر Kong بمفتاح الوكيل وحد طلباته ومعرّف طلبه، ثم عبر LiteLLM الذي يختار النموذج الحقيقي ويبدّل عند فشل مزوّد ويعطي التكلفة الدقيقة."],
    ["إنسان واحد", "الوكيل يقترح، والإنسان يقرر، والنظام يسجّل. لا يصل شيء إلى CRM ولا يخرج من النظام دون موافقة إنسان وسببه. القرار الجماعي، أو الذي يتخذه ذكاء اصطناعي نيابة عن أحد، يحجزه الكود. حكم الذكاء الاصطناعي يوصي ولا يقرر أبداً."],
  ],
  evalTitle: "كيف يتحسن، وكيف أعرف ذلك",
  evalIntro:
    "لا يُعتمد أي تغيير بناءً على حدس: كل تغيير يُقاس مقابل سابقه، مقالاً بمقال، ونموذج أقوى وإنسان يدققان عمل الوكيل. الوكيل لا يقيّم نفسه أبداً: الكود يفحص القواعد الدقيقة، ونموذج أقوى يحكم على الجودة غير المحددة، وإنسان يراجع الحكم.",
  evalSteps: [
    ["القياس", "يُقاس الباحث مقابل حكم ذكاء اصطناعي أقوى على المقالات الحقيقية نفسها. لم يفوّته شيء، لكنه أطلق إنذارات كاذبة كثيرة."],
    ["قراءة الأخطاء", "الإنذارات الكاذبة كان لها نمط: إعلانات جهات تنظيمية وأخبار موردين قُرئت كحاجة لدى مشترٍ."],
    ["تغيير شيء واحد", "قاعدة واحدة في أمر الباحث: إعلان جهة تنظيمية أو مورد لا يكون فرصة إلا إذا كانت لدى مشترٍ مسمّى حاجة."],
    ["المقارنة مقالاً بمقال", "أزالت القاعدة بعض الإنذارات الكاذبة، لكنها أسقطت أيضاً فرصاً حقيقية، إحداها وافق عليها إنسان بالفعل. في المتوسط بدت كتنظيف؛ ومقالاً بمقال كانت ستكلّف صفقات حقيقية. لم تُعتمد: أوقفتها الحلقة قبل إطلاقها."],
  ],
  evalNote:
    "اعتماد تغيير قرار يتخذه من يبني النظام، ويُسجَّل في ملف قرار، وليس نقرة في واجهة المبيعات. هناك مستويان من النصح، والبشر يقررون في كليهما: \"Help me decide\" يعطي رأي نموذج أقوى في فرصة واحدة، وسجل التجارب يقول هل يجب تغيير طريقة تفكير الوكيل. إلى جانب الحلقة: صفحة جودة فيها الدقة والاسترجاع ومصفوفة الالتباس، ومصنِّف داخلي صغير (TF-IDF وانحدار لوجستي) يُعاد تدريبه كل صباح، ويُقاس قبل الاعتماد عليه.",
  roleTitle: "كيف بُني",
  role: [
    "امتلكت المنتج والمعمارية. حددت المشكلة، واخترت كل تصميم رئيسي (رسم معرفي واحد، بوابة محكومة واحدة، إنسان يقرر كل إجراء، جودة يقودها التقييم)، ودوّنت كل قرار تقني في سجل قرار، وراجعت العمل في كل خطوة، وشغّلته على بيانات حقيقية.",
    "كُتب الكود بتعاون وثيق مع وكلاء برمجة بالذكاء الاصطناعي (Claude Code) وجّهتهم وراجعت عملهم، والـ commits مشتركة التأليف. البناء بهذه الطريقة جزء من الفكرة: أدواتي تخضع للقواعد نفسها. لا يُسمح لـ Claude Code أبداً بتسجيل قرار على فرصة نيابة عن إنسان.",
  ],
  statusTitle: "أين وصل",
  numbersCaption: "حتى 16 نوفمبر 2026",
  numbers: [],
  done: [
    "يعمل كل صباح على جهاز واحد من البداية إلى النهاية، ويكتب الفرص الموافَق عليها في Odoo CRM مع دليلها ودرجتها.",
    "واجهة بالإنجليزية والعربية (من اليمين إلى اليسار) مع ترجمة عند الطلب.",
    "حزمة خادم جاهزة: Docker وCaddy ونسخ احتياطي واستعادة.",
  ],
  notYet: [
    "لم يُنشر على خادم بعد.",
    "لم يُقس بعد مقابل مندوبي مبيعات العميل: التصنيفات حتى الآن من حكم الذكاء الاصطناعي.",
    "لا نموذج مخصص بعد: المصنِّف الداخلي صغير. ضبط نموذج مفتوح اتجاه مستقبلي، لا نتيجة.",
    "لا تنبيهات بعد: إنسان يقرأ تقرير الصباح.",
  ],
  doneLabel: "تم بناؤه",
  notYetLabel: "ليس بعد",
  shotsTitle: "لقطات الشاشة",
}

const byLocale: Partial<Record<Locale, KashafExtras>> = { en, fr, ar }

export function kashafExtras(locale: Locale): KashafExtras {
  return byLocale[locale] ?? en
}

// Screenshots go in public/images/kashaf/. Add an entry here when Sarah sends one.
// Check every image for client names, company names from the leads, emails and keys before adding it.
export const kashafShots: { src: string; caption: string; width: number; height: number }[] = []
