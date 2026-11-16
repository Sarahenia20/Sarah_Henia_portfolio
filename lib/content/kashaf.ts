// Extra sections that only the Kashaf case study has (the poster, the three ideas, the eval loop,
// how it was built, the honest status), in English, French and Arabic. Sarah reviews FR and AR.
// Facts: the Kashaf repository docs (overview, architecture-and-operations, eval-loop), dated 16 Nov 2026.
// House rules: no em dashes, no client name, no repository name, no test counts.
import type { Locale } from "@/lib/i18n/config"

export const kashafPoster = "/work/kashaf-architecture.html"

const en = {
  posterTitle: "The AI agent stack",
  posterHint: "Hover or tap a tile to see what it is and why it is there. \"Play the life of a lead\" walks one lead through the whole system.",
  posterOpen: "Open full screen",
  ideasTitle: "Three ideas hold it together",
  ideas: [
    ["One memory", "Everything the agents know lives in one SurrealDB knowledge graph: articles, leads, companies, people's decisions, model calls. One company is one node, every lead points to its article and every article to its source. Agents retrieve connected, proven facts from the graph (GraphRAG), never text that only sounds similar."],
    ["One door", "No agent calls a model directly or holds a provider key. Every call goes through Kong, with the agent's own key, rate limit and request id, then LiteLLM, which picks the real model, falls back when a provider fails and reports the exact cost."],
    ["One person", "The agent proposes, a person decides, the system records. Nothing reaches the CRM or leaves the system without a person's approval and reason. A decision made in bulk, or by an AI on someone's behalf, is held back by code. The AI judge can recommend; it never decides."],
  ] as [string, string][],
  evalTitle: "How it gets better, and how I know",
  evalIntro:
    "No change ships on a hunch: every change is measured against the last, article by article, and a stronger model and a person check the agent's work. The agent never grades itself: code checks the exact rules, a stronger model judges the fuzzy quality, and a person audits the judge.",
  evalSteps: [
    ["Measure", "The finder is measured against a stronger AI judge on the same real articles. It missed nothing, but it raised too many false alarms."],
    ["Read the failures", "The false alarms had a pattern: regulator announcements and vendor news read as a buyer's need."],
    ["Change one thing", "One rule in the finder's prompt: a regulator's or a vendor's announcement is a lead only if a named buyer has a need."],
    ["Compare, article by article", "The rule removed some false alarms, but it also dropped real leads, one of them already approved by a person. On average it looked like a cleanup; article by article, it would have cost real deals. Not promoted: the loop stopped it before it shipped."],
  ] as [string, string][],
  evalNote:
    "Promoting a change is a builder's decision, recorded in a decision file, not a click in the sales console. There are two levels of advice, and people decide both: \"Help me decide\" gives a stronger model's view on one lead, and the experiment log says whether to change how the agent thinks. Next to the loop: a quality page with precision, recall and a confusion matrix, and a small in-house classifier (TF-IDF and logistic regression) retrained each morning, measured before it is trusted.",
  roleTitle: "How it was built",
  role: [
    "I owned the product and the architecture. I defined the problem, chose every major design (one knowledge graph, one governed gateway, a person deciding every action, quality driven by evaluation), wrote each technical decision down as a decision record, reviewed the work at every step and ran it on real data.",
    "The code was written in close collaboration with AI coding agents (Claude Code), which I directed and reviewed, and the commits are co-authored. Building this way is part of the point: the same rules apply to my own tools. Claude Code is never allowed to record a lead decision on a person's behalf.",
  ],
  statusTitle: "Where it stands",
  numbersCaption: "As of 16 Nov 2026",
  numbers: [] as [string, string][],
  done: [
    "Runs every morning on one machine, end to end, and writes approved leads to an Odoo CRM with their proof and score.",
    "English and Arabic (right to left) console, with translation on demand.",
    "A server kit is ready: Docker, Caddy, backups and restore.",
  ],
  notYet: [
    "Not deployed to a server yet.",
    "Not yet measured against the client's own salespeople: the labels so far come from the AI judge.",
    "No custom model yet: the in-house classifier is small. Fine-tuning an open model is a direction, not a result.",
    "No alerting yet: a person reads the morning report.",
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
