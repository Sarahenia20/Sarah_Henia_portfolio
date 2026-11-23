// Extra sections that only the campaign case study (slug market-intelligence) has: the poster, the three ideas,
// the finder's eval loop, how it was built, the honest status. English, French and Arabic; Sarah reviews FR and AR.
// Facts: the project's campaign design, decisions and changelog, Nov 2026. FR and AR translate the English.
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
  posterHint: "Le corps qui est resté quand le flux est devenu des campagnes : les agents, un graphe, une porte, une personne. Survolez ou touchez une tuile pour voir ce que c'est et pourquoi elle est là. « Play the life of a campaign » fait suivre à une campagne tout son parcours, de l'actualité au CRM.",
  posterOpen: "Ouvrir en plein écran",
  ideasTitle: "Trois idées tiennent le tout",
  ideas: [
    ["Une seule décision, là où l'argent et le contact entrent en jeu", "La première version demandait à une personne de valider chaque piste. Désormais, tout ce qui précède le lancement est préparé automatiquement et ne dépense rien, et une personne prend une seule décision par campagne : la lancer ou l'abandonner, avec un motif. Qui peut lancer dépend du coût et du rôle, dans le code, et c'est revérifié à chaque appui. Un marché soumis à des règles de confidentialité supplémentaires revient toujours au validateur senior, et au-delà d'un plafond le système refuse de construire la campagne."],
    ["Les règles dans la base de données, pas dans les prompts", "Une règle qui ne vit que dans un prompt ou dans le code applicatif peut être contournée par le prochain appelant. « Rien n'est envoyé avant le lancement » et l'interdiction de contact définitive sont des événements de schéma SurrealDB : la base refuse l'écriture et nomme la règle. Autour d'elles, le moindre privilège : le CRM est atteint via des listes blanches par tâche, et les outils de contacts et de prospection sont derrière la même passerelle que les modèles, chacun avec ses propres identifiants et sa limite de débit."],
    ["L'économie, et une boucle qui la mesure", "Chaque campagne est chiffrée avant toute dépense : les contacts à acheter (les personnes déjà détenues et encore récentes sont réutilisées), le temps des personnes, et les appels de modèle lus dans les propres registres de la passerelle. Mizan en tire un coût par réponse attendue. Les taux de réponse commencent comme des estimations signalées ; le taux mesuré de chaque campagne terminée, par produit et par canal, remplace l'hypothèse dans l'estimation suivante."],
  ],
  evalTitle: "Comment le chercheur s'est amélioré, et comment je le sais",
  evalIntro:
    "Avant la refonte, Kashaf trouvait des pistes, et sa qualité reposait sur l'évaluation. Cette boucle vaut toujours pour le chercheur : chaque changement est mesuré face au précédent, article par article. L'agent ne s'évalue jamais lui-même : le code vérifie les règles exactes, un modèle plus puissant juge la qualité floue, et une personne audite le juge.",
  evalSteps: [
    ["Mesurer", "Le chercheur a été mesuré face à un juge IA plus puissant, sur les mêmes vrais articles, avec les étiquettes à l'aveugle des personnes comme mesure finale. Il ne ratait rien, mais levait trop de fausses alertes."],
    ["Lire les échecs", "Les fausses alertes suivaient un motif : des annonces de régulateurs et des actualités de fournisseurs lues comme un besoin d'acheteur."],
    ["Changer une seule chose", "Une règle dans le prompt du chercheur : l'annonce d'un régulateur ou d'un fournisseur n'est une piste que si un acheteur nommé a un besoin."],
    ["Comparer, article par article", "La règle a supprimé des fausses alertes, mais elle a aussi fait perdre de vraies pistes, dont une déjà validée par une personne. En moyenne, elle ressemblait à un nettoyage ; article par article, elle aurait coûté de vraies affaires. Non retenue : la boucle l'a arrêtée avant sa mise en service."],
  ],
  evalNote:
    "Retenir un changement est une décision de celle qui construit, consignée dans un registre de décision, pas un clic dans la console. Les campagnes ajoutent une deuxième boucle, côté métier : quand de vraies campagnes se terminent, leurs taux de réponse mesurés remplacent les estimations de départ. L'idée suivante, l'A/B testing des messages, demande assez de personnes par version pour distinguer une vraie différence du bruit, elle attend donc de vraies campagnes. Construit pour apprendre, en attente de vraies campagnes dont apprendre.",
  roleTitle: "Comment il a été construit",
  role: [
    "J'étais l'architecte et la responsable. J'ai défini le problème, et quand la première démo aux parties prenantes a montré que le système répondait à la mauvaise question, je l'ai repensé autour des campagnes : le flux, le modèle de données, les règles et l'ordre des étapes de construction. J'ai consigné chaque décision avec sa raison, comblé les manques laissés par le client avec des valeurs par défaut signalées comme telles, et relu chaque étape avant sa fusion.",
    "Le code a été écrit par des agents de code IA (Claude Code) que j'ai dirigés, et je le dis clairement parce que cela fait partie du savoir-faire. Les étapes de construction ont tourné comme des agents distincts dans des worktrees git isolés, en parallèle, puis ont été fusionnées et testées ensemble. Ce qui a rendu cela possible, c'est l'architecture : un modèle de données partagé d'abord, un registre de décision et ses tests par étape, et des règles que les agents ne pouvaient pas contourner. Mes outils suivent la même règle que le produit : une IA propose, une personne décide.",
  ],
  statusTitle: "Où il en est",
  numbersCaption: "En novembre 2026",
  numbers: [],
  done: [
    "Chaque étape du flux de campagne est construite, fusionnée et testée : événements associés à un produit, contacts, messages, coût et score, lot classé deux fois par semaine, prospection, réponses et résultats.",
    "Un écran de lancement en anglais et en arabe (de droite à gauche), avec une validation par coût et par rôle vérifiée côté serveur, et des pages pour les appels et les réponses.",
    "Les deux règles les plus strictes imposées par la base de données : rien n'est envoyé avant le lancement, et l'interdiction de contact est définitive.",
    "Le CRM ne reçoit que les campagnes lancées et les personnes qui ont répondu, via une liste blanche limitée à la création.",
    "Le document sur les données et la confidentialité mis à jour avant le stockage du moindre contact.",
  ],
  notYet: [
    "Pas encore exécuté en conditions réelles : il lui faut les clés des outils du client et un premier lancement par une personne.",
    "Pas de vrais chiffres de réponse : les taux de réponse sont des estimations de départ signalées, jusqu'à ce que de vraies campagnes les remplacent.",
    "L'A/B testing des messages est l'idée suivante, pas encore construite : il faut de vraies campagnes avec assez de personnes par version.",
    "Pas encore déployé sur un serveur.",
  ],
  doneLabel: "Construit",
  notYetLabel: "Pas encore",
  shotsTitle: "Captures d'écran",
}

const ar: KashafExtras = {
  posterTitle: "حزمة وكلاء الذكاء الاصطناعي",
  posterHint: "الجسم الذي بقي حين صار المسار حملات: الوكلاء، ورسم واحد، وباب واحد، وإنسان واحد. مرّر المؤشر أو المس أي مربع لترى ما هو ولماذا هو هناك. زر \"Play the life of a campaign\" يأخذ حملة واحدة في رحلتها من الأخبار إلى CRM.",
  posterOpen: "فتح بملء الشاشة",
  ideasTitle: "ثلاث أفكار تجمع النظام",
  ideas: [
    ["قرار واحد، حيث يحدث الإنفاق والتواصل", "كانت النسخة الأولى تطلب من إنسان الموافقة على كل فرصة. الآن يُعَدّ كل ما قبل الإطلاق آلياً دون إنفاق أي شيء، ويتخذ إنسان واحد قراراً واحداً لكل حملة: إطلاقها أو إلغاؤها، مع سبب. من يحق له الإطلاق يُحدَّد حسب التكلفة والدور، في الكود، ويُفحص من جديد عند كل ضغطة. السوق ذو قواعد الخصوصية الإضافية يذهب دائماً إلى الموافِق الأعلى، وفوق سقف معيّن يرفض النظام بناء الحملة."],
    ["القواعد في قاعدة البيانات، لا في الأوامر", "القاعدة التي تعيش في أمر للنموذج أو في كود التطبيق وحده يمكن أن يتجاوزها المستدعي التالي. \"لا يُرسَل شيء قبل الإطلاق\" و\"منع التواصل الدائم\" أحداث مخطط في SurrealDB: ترفض قاعدة البيانات الكتابة وتسمّي القاعدة. وحولهما أقل الصلاحيات: يُوصَل إلى CRM عبر قوائم مسموح بها لكل مهمة، وأدوات جهات الاتصال والتواصل تقف خلف البوابة نفسها التي تقف أمام النماذج، لكل منها معرّف اعتماد خاص وحد طلبات خاص."],
    ["الجانب الاقتصادي، وحلقة تقيسه", "تُحسب تكلفة كل حملة قبل إنفاق أي شيء: جهات الاتصال التي ستُشترى (يُعاد استخدام الأشخاص الموجودين أصلاً وما زالت بياناتهم حديثة)، ووقت الناس، واستدعاءات النماذج المقروءة من سجلات البوابة نفسها. يحوّل Mizan ذلك إلى تكلفة لكل رد متوقع. تبدأ معدلات الرد كتقديرات موسومة، ومعدل الرد المقاس لكل حملة منتهية، لكل منتج وقناة، يحل محل التخمين في التقدير التالي."],
  ],
  evalTitle: "كيف تحسّن الباحث، وكيف أعرف ذلك",
  evalIntro:
    "قبل إعادة التصميم، كان Kashaf يجد الفرص، وكانت جودته مبنية على التقييم. وما زالت هذه الحلقة قائمة بالنسبة للباحث: كل تغيير يُقاس مقابل سابقه، مقالاً بمقال. الوكيل لا يقيّم نفسه أبداً: الكود يفحص القواعد الدقيقة، ونموذج أقوى يحكم على الجودة غير المحددة، وإنسان يراجع الحكم.",
  evalSteps: [
    ["القياس", "قيس الباحث مقابل حكم ذكاء اصطناعي أقوى على المقالات الحقيقية نفسها، مع تصنيفات البشر العمياء كمقياس نهائي. لم يفوّته شيء، لكنه أطلق إنذارات كاذبة كثيرة."],
    ["قراءة الأخطاء", "الإنذارات الكاذبة كان لها نمط: إعلانات جهات تنظيمية وأخبار موردين قُرئت كحاجة لدى مشترٍ."],
    ["تغيير شيء واحد", "قاعدة واحدة في أمر الباحث: إعلان جهة تنظيمية أو مورد لا يكون فرصة إلا إذا كانت لدى مشترٍ مسمّى حاجة."],
    ["المقارنة مقالاً بمقال", "أزالت القاعدة بعض الإنذارات الكاذبة، لكنها أسقطت أيضاً فرصاً حقيقية، إحداها وافق عليها إنسان بالفعل. في المتوسط بدت كتنظيف؛ ومقالاً بمقال كانت ستكلّف صفقات حقيقية. لم تُعتمد: أوقفتها الحلقة قبل إطلاقها."],
  ],
  evalNote:
    "اعتماد تغيير قرار يتخذه من يبني النظام، ويُسجَّل في ملف قرار، وليس نقرة في الواجهة. وتضيف الحملات حلقة ثانية في الجانب التجاري: حين تنتهي حملات حقيقية، تحل معدلات الرد المقاسة محل التقديرات الأولية. الفكرة التالية، اختبار A/B للرسائل، تحتاج إلى عدد كافٍ من الأشخاص لكل نسخة للتمييز بين فرق حقيقي وضجيج، لذا تنتظر حملات حقيقية. مبني ليتعلّم، وينتظر حملات حقيقية يتعلّم منها.",
  roleTitle: "كيف بُني",
  role: [
    "كنت مهندسة المعمارية والمالكة. حددت المشكلة، وحين أظهر أول عرض لأصحاب المصلحة أن النظام يجيب عن السؤال الخطأ، أعدت تصميمه حول الحملات: المسار، ونموذج البيانات، والقواعد، وترتيب خطوات البناء. دوّنت كل قرار مع سببه، وسددت الفجوات التي تركها العميل بقيم افتراضية معلنة بوصفها كذلك، وراجعت كل خطوة قبل دمجها.",
    "كتب الكود وكلاء برمجة بالذكاء الاصطناعي (Claude Code) وجّهتهم، وأقول ذلك بوضوح لأنه جزء من المهارة. عملت خطوات البناء كوكلاء منفصلين في git worktrees معزولة، بالتوازي، ثم دُمجت واختُبرت معاً. وما جعل ذلك ممكناً هو المعمارية: نموذج بيانات مشترك أولاً، وسجل قرار واختباراته لكل خطوة، وقواعد لا يستطيع الوكلاء ليّها. وتخضع أدواتي للقاعدة نفسها التي يخضع لها المنتج: الذكاء الاصطناعي يقترح، والإنسان يقرر.",
  ],
  statusTitle: "أين وصل",
  numbersCaption: "حتى نوفمبر 2026",
  numbers: [],
  done: [
    "كل خطوة في مسار الحملة مبنية ومدموجة ومُختبَرة: ربط الأحداث بمنتج، وجهات الاتصال، والرسائل، والتكلفة والدرجة، والدفعة المرتبة مرتين أسبوعياً، والتواصل، والردود والنتائج.",
    "شاشة إطلاق بالإنجليزية والعربية (من اليمين إلى اليسار)، مع موافقة حسب التكلفة والدور تُفحص على الخادم، وصفحات للمكالمات والردود.",
    "أصعب قاعدتين تفرضهما قاعدة البيانات: لا يُرسَل شيء قبل الإطلاق، ومنع التواصل دائم.",
    "لا يتلقى CRM إلا الحملات المُطلَقة والأشخاص الذين ردّوا، عبر قائمة مسموح بها للإنشاء فقط.",
    "حُدّثت وثيقة البيانات والخصوصية قبل تخزين أي جهة اتصال.",
  ],
  notYet: [
    "لم يُشغَّل فعلياً بعد: يحتاج إلى مفاتيح أدوات العميل وأول ضغطة إطلاق من إنسان.",
    "لا أرقام ردود حقيقية: معدلات الرد تقديرات أولية موسومة حتى تحل محلها حملات حقيقية.",
    "اختبار A/B للرسائل هو الفكرة التالية، ولم يُبنَ: يحتاج إلى حملات حقيقية بعدد كافٍ من الأشخاص لكل نسخة.",
    "لم يُنشر على خادم بعد.",
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
