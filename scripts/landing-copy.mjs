/**
 * Copy for /[locale]/tibet-without-permit — the standalone landing page for the
 * "Tibet without a permit" argument.
 *
 * Why a separate page at all: the homepage makes the argument, but nobody
 * searching "can you visit Tibet without a permit" lands on a homepage. That
 * query is the single highest-intent phrase this business owns, and it is
 * unanswerable by the TAR operators — so it is worth its own URL, its own
 * title, and its own FAQ markup.
 *
 * Why the copy lives in a script rather than being typed into the JSX: it is
 * four locales × ~45 strings. Editing one locale in the component guarantees
 * the four drift within a month.
 *
 * The structure is an argument, not a list of sections:
 *   hero → the three-line answer → the map → the barriers → what you lose →
 *   what you get → side by side → practical → FAQ
 *
 * The "what you lose" block is the one that makes the rest credible. Every
 * competitor's version of this page pretends nothing is given up; naming
 * Lhasa, Everest and Kailash plainly is what earns the right to say the
 * plateau is bigger than that border.
 */
export default {
  en: {
    seo: {
      title: 'Tibet Without a Permit: What You Can and Cannot Do',
      desc: 'The Tibet Autonomous Region needs a permit, a licensed guide and a fixed itinerary. Two of Tibet’s three regions do not. What that means in practice.',
    },
    hero: {
      kicker: 'The short answer',
      title: 'Can you visit Tibet without a permit?',
      lede: 'Not the Tibet Autonomous Region. That needs a permit, a licensed guide and an itinerary approved before you fly. But Tibet is three regions, and only one of them is the Autonomous Region. The other two begin four hours west of Chengdu.',
    },
    answer: {
      label: 'In three lines',
      items: [
        'The Autonomous Region — Lhasa, Shigatse, Ngari — requires a Tibet Travel Permit. Only a registered agency in Lhasa can apply, 15 to 30 days ahead, and the paper original has to be in your hand before you board.',
        'Tibetans live in three regions: Ü-Tsang, Kham and Amdo. Only Ü-Tsang lies inside the Autonomous Region. Kham runs through Sichuan, Yunnan, Qinghai and the Autonomous Region’s own Chamdo.',
        'The Kham and Amdo parts of Sichuan need no permit at all. A passport and a valid Chinese visa are enough. That is where we travel.',
      ],
    },
    regions: {
      label: 'The map, first',
      title: 'Three regions. One of them has a gate.',
      lede: 'Most confusion about “visiting Tibet” is a geography problem. The permit line follows a provincial border, not a cultural one.',
      cards: [
        {
          cn: '卫藏',
          rom: 'Ü-Tsang',
          where: 'Lhasa · Shigatse · Shannan · Ngari',
          status: 'Permit required',
          state: 'closed',
          text: 'The Tibet of the postcards, and the only region that lies entirely inside the Tibet Autonomous Region.',
        },
        {
          cn: '康巴',
          rom: 'Kham',
          where: 'Garzê · Chamdo · Diqing · Yushu',
          status: 'Cut by the border',
          state: 'split',
          text: 'One people, cut in two by a provincial line. Chamdo is inside the Autonomous Region and needs the permit. Garzê is in Sichuan and does not.',
        },
        {
          cn: '安多',
          rom: 'Amdo',
          where: 'Qinghai · Gansu · northern Ngawa',
          status: 'Open',
          state: 'open',
          text: 'The northeast of the plateau: horse country, and home to Labrang and Kumbum.',
        },
      ],
    },
    barriers: {
      label: 'What the permit involves',
      title: 'Four things, none of them negotiable.',
      items: [
        {
          n: '01',
          title: 'The permit itself',
          text: 'Applied for by a registered travel agency in Lhasa, on your behalf. Not by you, not by your hotel, and not on arrival. Fifteen to thirty days is normal; ten is possible and is a gamble.',
        },
        {
          n: '02',
          title: 'The paper original',
          text: 'It is a physical document. It has to be in your hand before you check in for the flight or the train into the region — which usually means couriering it to your hotel in Chengdu or Xining first.',
        },
        {
          n: '03',
          title: 'The guide and the itinerary',
          text: 'A licensed guide accompanies you for the whole stay, and the route is submitted in advance. Changing it mid-trip is not a matter of asking nicely.',
        },
        {
          n: '04',
          title: 'The altitude',
          text: 'Most routes land at Lhasa, 3,650 m, on the first day. There is no gradual approach by road unless you have three spare weeks.',
        },
      ],
    },
    limits: {
      label: 'What you give up',
      title: 'The honest list.',
      lede: 'If you take the Kham route, this is what you will not see. We would rather name it now than let you find out afterwards.',
      items: [
        'Lhasa: the Potala, the Jokhang, the Barkhor at dusk.',
        'Tashilhunpo in Shigatse, and the road west towards Everest.',
        'Everest north base camp at 5,200 m — the Tibetan side.',
        'Mount Kailash and the three-day kora around it.',
        'Samye, Yamdrok, and the train across the plateau.',
      ],
      note: 'If those are the point of the trip, apply for the permit and go. It is a remarkable journey and worth the paperwork. This page is not an argument that you should skip it — only that the plateau neither begins nor ends at that border.',
    },
    instead: {
      label: 'The other side of the line',
      title: 'The same civilisation, at the same altitude.',
      lede: 'Not replicas, and not a theme park. Working monasteries, working printing houses, herders who still move with the grass.',
      items: [
        {
          name: 'Tagong Monastery',
          meta: '3,730 m · Garzê',
          text: 'Sakya, over a thousand years old, on the grassland where the Khampa come to circle.',
        },
        {
          name: 'Dege Parkhang',
          meta: '3,240 m · Dêgê',
          text: 'The scripture printing house of 1729. Three hundred thousand woodblocks still in use, two men to a sheet: one inks, one presses.',
        },
        {
          name: 'Litang',
          meta: '4,010 m · Garzê',
          text: 'A town at four thousand metres where the grassland reaches the main street. The monastery above it dates from 1580; in August the horse fair draws Khampa riders from every pasture.',
        },
        {
          name: 'Gongga Shan',
          meta: '7,556 m · Kangding',
          text: 'The highest peak in Sichuan, and the easternmost of the great ranges.',
        },
        {
          name: 'The nomad year',
          meta: '4,000 m · northwest plateau',
          text: 'Two nights with a family that still moves with the grass. Yak, butter, and a winter ground the tents return to.',
        },
        {
          name: 'Thangka, two days',
          meta: 'Tagong · studio',
          text: 'Grind the mineral, bind it, draw the line, fill the flat colour. Two days will not finish a piece, but it will explain why it takes months.',
        },
      ],
    },
    table: {
      label: 'Side by side',
      title: 'Two routes, the same plateau.',
      head: ['', 'Tibet Autonomous Region', 'Sichuan · Kham and Amdo'],
      rows: [
        { k: 'Permit', tar: 'Tibet Travel Permit, agency only, 15–30 days', kham: 'None. Passport and a Chinese visa.' },
        { k: 'Guide', tar: 'Licensed guide, mandatory', kham: 'Optional — ours, or nobody' },
        { k: 'Itinerary', tar: 'Fixed, approved in advance', kham: 'Changes with the weather' },
        { k: 'Driving', tar: 'No self-drive for foreign visitors', kham: 'Possible with a Chinese licence; a driver is the norm' },
        { k: 'Altitude on arrival', tar: '3,650 m the day you land', kham: '500 m in Chengdu, then climbed over days' },
        { k: 'From Chengdu', tar: 'A flight to a hub, then to Lhasa', kham: '4–5 hours by road' },
      ],
    },
    practical: {
      label: 'How it works',
      title: 'Four things that matter on the ground.',
      items: [
        {
          n: '1',
          title: 'Fly into Chengdu',
          text: 'Chengdu is 500 m. Sleep there, eat there, and let the first night be an easy one.',
        },
        {
          n: '2',
          title: 'Drive west',
          text: 'Four to five hours on the expressway to Kangding at 2,560 m, then up onto the grassland. Tagong is 3,730 m and six to seven hours from the city.',
        },
        {
          n: '3',
          title: 'Climb over two days, not one',
          text: 'We put a night at 2,000–2,500 m between the two climbs. It is the single most useful thing anyone can do about altitude.',
        },
        {
          n: '4',
          title: 'Carry your passport',
          text: 'Hotels register foreign guests with the police, and not every guesthouse in a remote town is licensed to do it. We book the ones that are.',
        },
      ],
    },
    faq: {
      label: 'Questions people actually ask',
      title: 'Before you book.',
      items: [
        {
          q: 'Do I need a permit for western Sichuan?',
          a: 'No. The Tibetan areas of Sichuan are visited on a valid Chinese visa. A few remote border counties have their own rules; we check each one before confirming a route.',
        },
        {
          q: 'Can I go to Lhasa without a permit?',
          a: 'No. Every foreign passport holder needs a Tibet Travel Permit to enter the Autonomous Region, and there is no exception for independent travel.',
        },
        {
          q: 'Is Sichuan really Tibetan?',
          a: 'In part. Garzê and Ngawa are Tibetan autonomous prefectures — the heart of Kham and a share of Amdo. People speak Tibetan, circle the monastery, herd yak; it is the same culture as in Lhasa.',
        },
        {
          q: 'Can I drive myself in western Sichuan?',
          a: 'China does not recognise an international driving permit, so a foreign licence is not valid here. In practice you travel with a driver and set the route yourself. In the Autonomous Region even that is not allowed.',
        },
        {
          q: 'Can I enter overland on the G318?',
          a: 'The Sichuan section, yes, as far as the Jinsha river. Cross it and the permit and guide regime begins. That is why most people run the G318 as a loop inside Sichuan instead.',
        },
        {
          q: 'Is the altitude hard?',
          a: 'Going from 500 m to 3,730 m in two days, you will feel something. That is why the itinerary puts a night at 2,000 m in between and checks oxygen saturation daily. If it goes wrong, descending works better than enduring.',
        },
      ],
    },
    cta: {
      title: 'If you want to go, start with dates.',
      text: 'Private groups of two to eight, your dates, and a route that bends to how you are coping with the altitude.',
      primary: 'See the routes',
      secondary: 'Ask us directly',
    },
    breadcrumb: 'Tibet without the permit',
    home: 'Home',
    link: 'The full answer, with altitudes and drive times',
  },

  zh: {
    seo: {
      title: '不用入藏函进藏区：能做什么，不能做什么',
      desc: '西藏自治区要入藏函、持证导游和提前报批的行程；藏区三块里另外两块都不要。这篇讲实际差别，含海拔与车程。',
    },
    hero: {
      kicker: '直接回答',
      title: '不用入藏函，能进藏区吗？',
      lede: '不能进西藏自治区。那里要入藏函、持证导游，行程还得在出发前报批。但藏区分三块，只有一块是自治区。另外两块，从成都往西四小时就到。',
    },
    answer: {
      label: '三句话',
      items: [
        '西藏自治区——拉萨、日喀则、阿里——需要入藏函。只能由拉萨的注册旅行社代办，提前 15–30 天，纸质原件要在你登机前送到手上。',
        '藏区分三块：卫藏、康巴、安多。只有卫藏整个在自治区内；康巴横跨四川、云南、青海，以及自治区内的昌都。',
        '四川的康区和安多，什么许可都不要。护照加有效中国签证就够了。我们走的是这里。',
      ],
    },
    regions: {
      label: '先把地图说清楚',
      title: '三块藏区，只有一块有门。',
      lede: '关于「去西藏」的大部分困惑，其实是地理问题。许可线是沿省界划的，不是沿文化划的。',
      cards: [
        {
          cn: '卫藏',
          rom: 'Ü-Tsang',
          where: '拉萨 · 日喀则 · 山南 · 阿里',
          status: '需要入藏函',
          state: 'closed',
          text: '明信片上的那个西藏，也是唯一整个位于自治区内的那一块。',
        },
        {
          cn: '康巴',
          rom: 'Kham',
          where: '甘孜 · 昌都 · 迪庆 · 玉树',
          status: '昌都要，甘孜不要',
          state: 'split',
          text: '同一个民族，被一条省界分到两边。昌都在自治区内，要函；甘孜在四川，不要。',
        },
        {
          cn: '安多',
          rom: 'Amdo',
          where: '青海 · 甘肃 · 阿坝北部',
          status: '开放',
          state: 'open',
          text: '高原的东北角：产马的地方，拉卜楞寺和塔尔寺都在这儿。',
        },
      ],
    },
    barriers: {
      label: '入藏函卡在哪',
      title: '四件事，没有一件能商量。',
      items: [
        {
          n: '01',
          title: '函本身',
          text: '由拉萨的注册旅行社代为申请。不是你申请，不是你酒店申请，也不是落地再补。15–30 天是常态，压到 10 天是在赌。',
        },
        {
          n: '02',
          title: '纸质原件',
          text: '它是一张纸。飞进去或坐火车进去之前，必须拿在手上——通常意味着先快递到你在成都或西宁的酒店。',
        },
        {
          n: '03',
          title: '导游与行程',
          text: '全程持证导游陪同，路线提前报批。中途想改，不是好好说一声就能改的。',
        },
        {
          n: '04',
          title: '落地海拔',
          text: '多数线路第一天就落在拉萨，3,650 米。除非你多出三个星期走公路，否则没有过渡。',
        },
      ],
    },
    limits: {
      label: '你放弃的是什么',
      title: '一份诚实的清单。',
      lede: '走康区这条路，下面这些你不会看到。与其让你回来才发现，不如现在写清楚。',
      items: [
        '拉萨：布达拉宫、大昭寺、黄昏的八廓街。',
        '日喀则的扎什伦布寺，以及往西去珠峰的那条路。',
        '珠峰北坡大本营，5,200 米——西藏那一侧。',
        '冈仁波齐，和围着它转三天的路。',
        '桑耶寺、羊卓雍措，和横穿高原的那趟火车。',
      ],
      note: '如果这些就是你此行的目的，那就去办函、去买票——那是很值得的一段路，手续拦不住它。这一页不是劝你别去，只是想说：高原并不是从那条界线才开始，到那条界线就结束。',
    },
    instead: {
      label: '界线的这一边',
      title: '同一种文明，同样的海拔。',
      lede: '不是仿建，也不是主题公园。是还在用的寺院、还在印经的书院、还跟着草走的牧民。',
      items: [
        {
          name: '塔公寺',
          meta: '3,730 米 · 甘孜',
          text: '萨迦派，一千多年，就在康巴人转经的那片草原上。',
        },
        {
          name: '德格印经院',
          meta: '3,240 米 · 德格',
          text: '1729 年的印经院。三十万块经版还在用，两个人一组，一刷一压。',
        },
        {
          name: '理塘',
          meta: '4,010 米 · 甘孜',
          text: '四千米的县城，草原一直铺到主街。山上的长青春科尔寺建于 1580 年；八月赛马会，康巴骑手从各处牧场赶来。',
        },
        {
          name: '贡嘎',
          meta: '7,556 米 · 康定',
          text: '四川最高峰，也是横断山脉最东边的那一座。',
        },
        {
          name: '牧民的一年',
          meta: '4,000 米 · 西北高原',
          text: '和一家还在跟着草走的牧民住两晚。牦牛、酥油，还有一个冬天要回去的营地。',
        },
        {
          name: '唐卡，两天',
          meta: '塔公 · 工作室',
          text: '磨矿物、调胶、起线、平涂。两天画不完一幅，但够你知道它为什么慢。',
        },
      ],
    },
    table: {
      label: '摆在一起看',
      title: '两条路，同一片高原。',
      head: ['', '西藏自治区', '川西 · 康区与安多'],
      rows: [
        { k: '入藏函', tar: '只能旅行社代办，15–30 天', kham: '不需要。护照加中国签证' },
        { k: '导游', tar: '强制持证导游', kham: '可选——要我们的，或者不要' },
        { k: '行程', tar: '固定，提前报批', kham: '跟着天气改' },
        { k: '自驾', tar: '外宾一律不许', kham: '持中国驾照可以自驾；通常配司机' },
        { k: '落地海拔', tar: '下飞机就是 3,650 米', kham: '成都 500 米，之后几天慢慢爬' },
        { k: '从成都出发', tar: '先飞到枢纽，再转拉萨', kham: '公路 4–5 小时' },
      ],
    },
    practical: {
      label: '实际操作',
      title: '地上有四件事最要紧。',
      items: [
        {
          n: '1',
          title: '飞成都',
          text: '成都 500 米。先在这儿睡一晚、吃一顿，把第一夜留在低处。',
        },
        {
          n: '2',
          title: '往西开',
          text: '高速四到五小时到康定（2,560 米），再上草原。塔公 3,730 米，从成都算六到七小时。',
        },
        {
          n: '3',
          title: '分两天爬，不要一天',
          text: '两次上升之间插一晚 2,000–2,500 米。这是对付海拔最有用的一件事，没有别的。',
        },
        {
          n: '4',
          title: '护照随身带',
          text: '酒店要给外宾做住宿登记，偏远乡镇不是每家民宿都有这个资质。我们只订能登记的那几家。',
        },
      ],
    },
    faq: {
      label: '客人真会问的',
      title: '订之前，先看这几条。',
      items: [
        {
          q: '去川西需要入藏函吗？',
          a: '不需要。四川的藏区凭有效中国签证即可。个别偏远边境县有自己的规定，我们会在确认路线前逐个核对。',
        },
        {
          q: '不办函能去拉萨吗？',
          a: '不能。外国护照持有人进入西藏自治区一律需要入藏函，个人旅行没有例外。',
        },
        {
          q: '川西真的算藏区吗？',
          a: '算。甘孜州和阿坝州是藏族自治州，是康区的核心，也含一块安多。当地人说藏语、转经、放牧，和拉萨那边是同一套文化。',
        },
        {
          q: '外国人能在川西自己开车吗？',
          a: '中国不承认国际驾照，持外国驾照在这里不能合法驾驶。实际操作是配司机、路线你定。这一点和自治区不同——那边连这样都不行。',
        },
        {
          q: '走 318 国道能进藏吗？',
          a: '四川段可以，到金沙江边为止。过了江就进入许可和导游制度。所以多数人把 318 走成川西环线，不跨那条江。',
        },
        {
          q: '海拔会不会很难受？',
          a: '两天从 500 米升到 3,730 米，一定会有反应。所以行程里刻意留了一晚 2,000 米的缓冲，并且每天测血氧。真不舒服，下撤比硬扛有用。',
        },
      ],
    },
    cta: {
      title: '想去，先把日期定下来。',
      text: '2–8 人私家团，日期你定，路线按你的体力调。',
      primary: '看线路',
      secondary: '直接问我们',
    },
    breadcrumb: '不用入藏函的藏区',
    home: '首页',
    link: '完整答案：海拔、车程，以及放弃了什么',
  },

  es: {
    seo: {
      title: 'Tíbet sin permiso: qué se puede y qué no',
      desc: 'La Región Autónoma del Tíbet exige permiso, guía oficial e itinerario cerrado. Dos de las tres regiones no. Qué significa en la práctica.',
    },
    hero: {
      kicker: 'La respuesta corta',
      title: '¿Se puede visitar el Tíbet sin permiso?',
      lede: 'No la Región Autónoma. Esa exige un permiso, un guía oficial y un itinerario aprobado antes de volar. Pero el Tíbet son tres regiones y solo una es la Región Autónoma. Las otras dos empiezan a cuatro horas al oeste de Chengdu.',
    },
    answer: {
      label: 'En tres líneas',
      items: [
        'La Región Autónoma —Lhasa, Shigatse, Ngari— exige el Permiso de Viaje al Tíbet. Solo lo tramita una agencia registrada en Lhasa, con 15 a 30 días de antelación, y el original en papel tiene que estar en tu mano antes de embarcar.',
        'Los tibetanos viven en tres regiones: Ü-Tsang, Kham y Amdo. Solo Ü-Tsang está dentro de la Región Autónoma; Kham se extiende por Sichuan, Yunnan, Qinghai y el propio Chamdo.',
        'El Kham y el Amdo de Sichuan no necesitan ningún permiso: pasaporte y visado chino vigente. Ahí es donde viajamos.',
      ],
    },
    regions: {
      label: 'Primero el mapa',
      title: 'Tres regiones. Solo una tiene puerta.',
      lede: 'Casi toda la confusión sobre «viajar al Tíbet» es un problema de geografía. La línea del permiso sigue una frontera provincial, no una cultural.',
      cards: [
        {
          cn: '卫藏',
          rom: 'Ü-Tsang',
          where: 'Lhasa · Shigatse · Shannan · Ngari',
          status: 'Requiere permiso',
          state: 'closed',
          text: 'El Tíbet de las postales, y la única región que queda entera dentro de la Región Autónoma.',
        },
        {
          cn: '康巴',
          rom: 'Kham',
          where: 'Garzê · Chamdo · Diqing · Yushu',
          status: 'Partido por la frontera',
          state: 'split',
          text: 'Un mismo pueblo, cortado en dos por una línea provincial. Chamdo está dentro de la Región Autónoma y necesita permiso; Garzê está en Sichuan y no.',
        },
        {
          cn: '安多',
          rom: 'Amdo',
          where: 'Qinghai · Gansu · norte de Ngawa',
          status: 'Abierto',
          state: 'open',
          text: 'El noreste de la meseta: tierra de caballos, con Labrang y Kumbum.',
        },
      ],
    },
    barriers: {
      label: 'Qué implica el permiso',
      title: 'Cuatro cosas, ninguna negociable.',
      items: [
        {
          n: '01',
          title: 'El permiso',
          text: 'Lo tramita una agencia registrada en Lhasa, en tu nombre. No lo pides tú, ni tu hotel, ni al llegar. Quince a treinta días es lo normal; diez es posible y es una apuesta.',
        },
        {
          n: '02',
          title: 'El original en papel',
          text: 'Es un documento físico. Tiene que estar en tu mano antes de facturar el vuelo o el tren: normalmente significa enviarlo por mensajería a tu hotel en Chengdu o Xining.',
        },
        {
          n: '03',
          title: 'El guía y el itinerario',
          text: 'Un guía oficial te acompaña toda la estancia y la ruta se presenta por adelantado. Cambiarla a mitad de viaje no es cuestión de pedirlo con buenos modales.',
        },
        {
          n: '04',
          title: 'La altitud',
          text: 'La mayoría de rutas aterrizan en Lhasa, 3.650 m, el primer día. No hay aproximación gradual por carretera salvo que te sobren tres semanas.',
        },
      ],
    },
    limits: {
      label: 'A qué renuncias',
      title: 'La lista honesta.',
      lede: 'Si tomas la ruta de Kham, esto es lo que no vas a ver. Preferimos nombrarlo ahora que dejar que lo descubras después.',
      items: [
        'Lhasa: el Potala, el Jokhang, el Barkhor al atardecer.',
        'Tashilhunpo en Shigatse, y la carretera al oeste hacia el Everest.',
        'El campo base norte del Everest, 5.200 m: el lado tibetano.',
        'El monte Kailash y la kora de tres días a su alrededor.',
        'Samye, Yamdrok y el tren que cruza la meseta.',
      ],
      note: 'Si eso es el objetivo del viaje, tramita el permiso y ve: es un viaje extraordinario y merece el papeleo. Esta página no sostiene que debas renunciar a él, solo que la meseta no empieza ni termina en esa frontera.',
    },
    instead: {
      label: 'Al otro lado de la línea',
      title: 'La misma civilización, a la misma altitud.',
      lede: 'No son réplicas ni un parque temático. Son monasterios en uso, imprentas en uso, pastores que siguen al pasto.',
      items: [
        {
          name: 'Monasterio de Tagong',
          meta: '3.730 m · Garzê',
          text: 'Sakya, con más de mil años, en la pradera por la que gira la gente de Kham.',
        },
        {
          name: 'Imprenta de Dege',
          meta: '3.240 m · Dêgê',
          text: 'La imprenta de escrituras de 1729. Trescientas mil planchas de madera todavía en uso, dos hombres por hoja: uno entinta, otro presiona.',
        },
        {
          name: 'Litang',
          meta: '4.010 m · Garzê',
          text: 'Una villa a cuatro mil metros donde la pradera llega a la calle principal. El monasterio de arriba es de 1580; en agosto la feria del caballo trae jinetes khampa de todos los pastos.',
        },
        {
          name: 'Gongga Shan',
          meta: '7.556 m · Kangding',
          text: 'El pico más alto de Sichuan y el más oriental de las grandes cordilleras.',
        },
        {
          name: 'El año nómada',
          meta: '4.000 m · meseta del noroeste',
          text: 'Dos noches con una familia que todavía se mueve con el pasto. Yak, manteca, y un campamento de invierno al que vuelven las tiendas.',
        },
        {
          name: 'Thangka, dos días',
          meta: 'Tagong · taller',
          text: 'Moler el mineral, ligar el aglutinante, trazar la línea, rellenar el plano. En dos días no acabas una pieza, pero entiendes por qué tarda meses.',
        },
      ],
    },
    table: {
      label: 'Lado a lado',
      title: 'Dos rutas, la misma meseta.',
      head: ['', 'Región Autónoma del Tíbet', 'Sichuan · Kham y Amdo'],
      rows: [
        { k: 'Permiso', tar: 'Permiso de Viaje, solo por agencia, 15–30 días', kham: 'Ninguno. Pasaporte y visado chino.' },
        { k: 'Guía', tar: 'Guía oficial obligatorio', kham: 'Opcional: el nuestro, o ninguno' },
        { k: 'Itinerario', tar: 'Cerrado y aprobado de antemano', kham: 'Cambia con el tiempo' },
        { k: 'Conducir', tar: 'Prohibido para visitantes extranjeros', kham: 'Posible con carné chino; lo normal es chófer' },
        { k: 'Altitud al llegar', tar: '3.650 m el día que aterrizas', kham: '500 m en Chengdu, y se sube en días' },
        { k: 'Desde Chengdu', tar: 'Vuelo a un hub y luego a Lhasa', kham: '4–5 horas por carretera' },
      ],
    },
    practical: {
      label: 'Cómo funciona',
      title: 'Cuatro cosas que importan sobre el terreno.',
      items: [
        {
          n: '1',
          title: 'Volar a Chengdu',
          text: 'Chengdu está a 500 m. Duerme ahí, cena ahí, deja que la primera noche sea fácil.',
        },
        {
          n: '2',
          title: 'Conducir al oeste',
          text: 'Cuatro o cinco horas de autopista hasta Kangding, 2.560 m, y luego la pradera. Tagong está a 3.730 m, seis o siete horas desde la ciudad.',
        },
        {
          n: '3',
          title: 'Subir en dos días, no en uno',
          text: 'Ponemos una noche a 2.000–2.500 m entre las dos subidas. Es lo más útil que se puede hacer con la altitud.',
        },
        {
          n: '4',
          title: 'Lleva el pasaporte encima',
          text: 'Los hoteles registran a los huéspedes extranjeros ante la policía, y no todas las casas de huéspedes de un pueblo remoto tienen licencia para hacerlo. Reservamos las que sí.',
        },
      ],
    },
    faq: {
      label: 'Lo que de verdad preguntan',
      title: 'Antes de reservar.',
      items: [
        {
          q: '¿Hace falta permiso para el oeste de Sichuan?',
          a: 'No. Las zonas tibetanas de Sichuan se visitan con el visado chino vigente. Algunos condados remotos de frontera tienen sus propias normas; las comprobamos una por una antes de confirmar.',
        },
        {
          q: '¿Se puede ir a Lhasa sin permiso?',
          a: 'No. Todo titular de pasaporte extranjero necesita el permiso para entrar en la Región Autónoma, y no hay excepción para viajar por libre.',
        },
        {
          q: '¿Sichuan es de verdad tibetano?',
          a: 'En parte. Garzê y Ngawa son prefecturas autónomas tibetanas: el corazón de Kham y una parte de Amdo. Se habla tibetano, se gira alrededor del monasterio, se pastorea yak; es la misma cultura que en Lhasa.',
        },
        {
          q: '¿Puedo conducir yo en el oeste de Sichuan?',
          a: 'China no reconoce el permiso internacional de conducir, así que un carné extranjero no vale aquí. En la práctica se viaja con chófer y la ruta la decides tú. En la Región Autónoma ni eso está permitido.',
        },
        {
          q: '¿Se puede entrar por la G318?',
          a: 'El tramo de Sichuan sí, hasta el río Jinsha. Al cruzarlo empieza el régimen de permiso y guía. Por eso la mayoría hace la G318 como circuito dentro de Sichuan, sin cruzar.',
        },
        {
          q: '¿La altitud se lleva mal?',
          a: 'De 500 m a 3.730 m en dos días, algo se nota. Por eso el itinerario incluye una noche a 2.000 m y medimos la saturación cada día. Si aparece malestar, bajar sirve más que aguantar.',
        },
      ],
    },
    cta: {
      title: 'Si quieres ir, empecemos por las fechas.',
      text: 'Grupos privados de dos a ocho, tus fechas y una ruta que se ajusta a cómo llevas la altitud.',
      primary: 'Ver las rutas',
      secondary: 'Escríbenos',
    },
    breadcrumb: 'Tíbet sin permiso',
    home: 'Inicio',
    link: 'La respuesta completa, con altitudes y tiempos de viaje',
  },

  th: {
    seo: {
      title: 'ทิเบตโดยไม่ต้องขอใบอนุญาต: ทำได้และทำไม่ได้',
      desc: 'เขตปกครองตนเองทิเบตต้องมีใบอนุญาต ไกด์ที่มีใบรับรอง และแผนเดินทางที่อนุมัติล่วงหน้า แต่สองในสามภูมิภาคของทิเบตไม่ต้อง',
    },
    hero: {
      kicker: 'คำตอบสั้น ๆ',
      title: 'เที่ยวทิเบตโดยไม่ขอใบอนุญาต ได้ไหม',
      lede: 'เขตปกครองตนเองทิเบตไม่ได้ ตรงนั้นต้องมีใบอนุญาต ไกด์ที่มีใบรับรอง และแผนเดินทางที่อนุมัติก่อนขึ้นเครื่อง แต่ทิเบตมีสามภูมิภาค และมีเพียงภูมิภาคเดียวที่เป็นเขตปกครองตนเอง อีกสองภูมิภาคเริ่มต้นห่างจากเฉิงตูสี่ชั่วโมง',
    },
    answer: {
      label: 'สามบรรทัด',
      items: [
        'เขตปกครองตนเองทิเบต — ลาซา ซีกาเจ งารี — ต้องมีใบอนุญาตเดินทางทิเบต (TTP) บริษัททัวร์ที่ขึ้นทะเบียนในลาซาเท่านั้นเป็นผู้ยื่นให้ ล่วงหน้า 15–30 วัน และต้องมีต้นฉบับกระดาษอยู่ในมือก่อนขึ้นเครื่อง',
        'ชาวทิเบตอาศัยในสามภูมิภาค: อวีจั้ง คัม และอามโด มีเพียงอวีจั้งที่อยู่ในเขตปกครองตนเอง ส่วนคัมทอดผ่านเสฉวน ยูนนาน ชิงไห่ และชัมโด',
        'คัมและอามโดในเสฉวนไม่ต้องขอใบอนุญาตใด ๆ ใช้พาสปอร์ตกับวีซ่าจีนที่ยังไม่หมดอายุก็พอ เราพาไปตรงนั้น',
      ],
    },
    regions: {
      label: 'เริ่มจากแผนที่',
      title: 'สามภูมิภาค มีเพียงหนึ่งที่มีประตู',
      lede: 'ความสับสนเรื่อง "ไปทิเบต" ส่วนใหญ่เป็นปัญหาเรื่องภูมิศาสตร์ เส้นใบอนุญาตลากตามพรมแดนจังหวัด ไม่ใช่ตามวัฒนธรรม',
      cards: [
        {
          cn: '卫藏',
          rom: 'Ü-Tsang',
          where: 'ลาซา · ซีกาเจ · ชานหนาน · งารี',
          status: 'ต้องขอใบอนุญาต',
          state: 'closed',
          text: 'ทิเบตในโปสการ์ด และเป็นภูมิภาคเดียวที่อยู่ในเขตปกครองตนเองทั้งหมด',
        },
        {
          cn: '康巴',
          rom: 'Kham',
          where: 'กานจื · ชัมโด · ตี๋ชิง · ยู่ซู่',
          status: 'ถูกแบ่งด้วยพรมแดน',
          state: 'split',
          text: 'ชนชาติเดียวกัน ถูกเส้นจังหวัดแบ่งเป็นสอง ชัมโดอยู่ในเขตปกครองตนเองต้องขอใบอนุญาต กานจือยู่ในเสฉวนไม่ต้อง',
        },
        {
          cn: '安多',
          rom: 'Amdo',
          where: 'ชิงไห่ · กานซู่ · งาวะตอนเหนือ',
          status: 'เปิด',
          state: 'open',
          text: 'มุมตะวันออกเฉียงเหนือของที่ราบสูง แดนม้า และที่ตั้งของลาบรังกับคุมบุม',
        },
      ],
    },
    barriers: {
      label: 'ใบอนุญาตติดตรงไหน',
      title: 'สี่ข้อ ไม่มีข้อไหนต่อรองได้',
      items: [
        {
          n: '01',
          title: 'ตัวใบอนุญาต',
          text: 'บริษัททัวร์ที่ขึ้นทะเบียนในลาซาเป็นผู้ยื่นแทนคุณ ไม่ใช่คุณ ไม่ใช่โรงแรม และไม่ใช่ตอนไปถึง ปกติ 15–30 วัน จะเร่งเหลือ 10 วันก็คือการเสี่ยง',
        },
        {
          n: '02',
          title: 'ต้นฉบับกระดาษ',
          text: 'เป็นเอกสารจริง ต้องอยู่ในมือก่อนเช็กอินขึ้นเครื่องหรือขึ้นรถไฟ ซึ่งมักหมายถึงการส่งด่วนไปที่โรงแรมของคุณในเฉิงตูหรือซีหนิงก่อน',
        },
        {
          n: '03',
          title: 'ไกด์และแผนเดินทาง',
          text: 'ไกด์ที่มีใบรับรองต้องอยู่ด้วยตลอด และเส้นทางต้องยื่นล่วงหน้า จะเปลี่ยนกลางทางไม่ใช่แค่ขอดี ๆ',
        },
        {
          n: '04',
          title: 'ความสูง',
          text: 'เส้นทางส่วนใหญ่ลงจอดที่ลาซา 3,650 เมตร ตั้งแต่วันแรก ไม่มีการค่อย ๆ ขึ้นทางรถ เว้นแต่คุณมีเวลาสามสัปดาห์',
        },
      ],
    },
    limits: {
      label: 'สิ่งที่ต้องแลก',
      title: 'รายการที่ซื่อสัตย์',
      lede: 'ถ้าเลือกเส้นทางคัม นี่คือสิ่งที่คุณจะไม่ได้เห็น เราอยากบอกตรง ๆ ตอนนี้ ดีกว่าให้คุณไปรู้ทีหลัง',
      items: [
        'ลาซา: พระราชวังโปตาลา วัดโจคัง และบาร์คอร์ยามเย็น',
        'วัดทาชิลฮุนโปที่ซีกาเจ และถนนตะวันตกสู่เอเวอเรสต์',
        'แคมป์ฐานเหนือของเอเวอเรสต์ 5,200 เมตร ฝั่งทิเบต',
        'เขาคัยลาศ และการเดินรอบเขาสามวัน',
        'ซัมเย ยัมดร็อก และรถไฟข้ามที่ราบสูง',
      ],
      note: 'ถ้าสิ่งเหล่านี้คือจุดหมายของการเดินทาง ก็ไปขอใบอนุญาตแล้วไปเถอะ มันคุ้มกับเอกสาร หน้านี้ไม่ได้บอกให้คุณข้ามมัน แต่บอกว่าที่ราบสูงไม่ได้เริ่มและจบที่เส้นนั้น',
    },
    instead: {
      label: 'อีกฝั่งของเส้น',
      title: 'อารยธรรมเดียวกัน ที่ความสูงเดียวกัน',
      lede: 'ไม่ใช่ของจำลอง และไม่ใช่สวนสนุก แต่เป็นอารามที่ยังใช้งาน โรงพิมพ์ที่ยังใช้งาน และคนเลี้ยงสัตว์ที่ยังย้ายตามหญ้า',
      items: [
        {
          name: 'วัดทากง',
          meta: '3,730 ม. · กานจื',
          text: 'นิกายสักยะ อายุกว่าพันปี อยู่บนทุ่งหญ้าที่ชาวคัมเดินเวียน',
        },
        {
          name: 'โรงพิมพ์เต๋อเก๋อ',
          meta: '3,240 ม. · เต๋อเก๋อ',
          text: 'โรงพิมพ์พระคัมภีร์ปี 1729 แม่พิมพ์ไม้สามแสนแผ่นยังใช้อยู่ สองคนต่อหนึ่งแผ่น คนหนึ่งทาหมึก คนหนึ่งกด',
        },
        {
          name: 'หลี่ถัง',
          meta: '4,010 ม. · กานจื',
          text: 'เมืองที่ความสูงสี่พันเมตร ทุ่งหญ้าไหลมาถึงถนนสายหลัก อารามบนเนินสร้างปี 1580 และงานแข่งม้าเดือนสิงหาคมดึงนักขี่คัมมาจากทุกทุ่ง',
        },
        {
          name: 'กงกา',
          meta: '7,556 ม. · คังติง',
          text: 'ยอดสูงสุดของเสฉวน และอยู่ตะวันออกสุดของเทือกเขาใหญ่',
        },
        {
          name: 'ปีของคนเลี้ยงสัตว์',
          meta: '4,000 ม. · ที่ราบสูงตะวันตกเฉียงเหนือ',
          text: 'สองคืนกับครอบครัวที่ยังย้ายตามหญ้า จามรี เนย และค่ายฤดูหนาวที่เต็นท์กลับไปทุกปี',
        },
        {
          name: 'ธังกา สองวัน',
          meta: 'ทากง · สตูดิโอ',
          text: 'บดแร่ ผสมกาว ลากเส้น ลงสีแบน สองวันวาดไม่เสร็จ แต่พอเข้าใจว่าทำไมต้องใช้เวลาหลายเดือน',
        },
      ],
    },
    table: {
      label: 'วางคู่กัน',
      title: 'สองเส้นทาง ที่ราบสูงเดียวกัน',
      head: ['', 'เขตปกครองตนเองทิเบต', 'เสฉวน · คัมและอามโด'],
      rows: [
        { k: 'ใบอนุญาต', tar: 'TTP ผ่านเอเจนซีเท่านั้น 15–30 วัน', kham: 'ไม่ต้อง พาสปอร์ตและวีซ่าจีน' },
        { k: 'ไกด์', tar: 'ต้องมีไกด์ที่มีใบรับรอง', kham: 'แล้วแต่ — ไกด์ของเรา หรือไม่มีเลย' },
        { k: 'แผนเดินทาง', tar: 'คงที่ อนุมัติล่วงหน้า', kham: 'เปลี่ยนตามอากาศ' },
        { k: 'ขับรถเอง', tar: 'ห้ามผู้เยี่ยมชาวต่างชาติ', kham: 'ขับเองได้ถ้ามีใบขับขี่จีน ปกติมีคนขับ' },
        { k: 'ความสูงเมื่อถึง', tar: '3,650 เมตร วันที่ลงเครื่อง', kham: 'เฉิงตู 500 เมตร แล้วค่อย ๆ ขึ้นหลายวัน' },
        { k: 'จากเฉิงตู', tar: 'บินไปฮับแล้วต่อไปลาซา', kham: 'ทางรถ 4–5 ชั่วโมง' },
      ],
    },
    practical: {
      label: 'ในทางปฏิบัติ',
      title: 'สี่เรื่องที่สำคัญบนพื้นที่จริง',
      items: [
        {
          n: '1',
          title: 'บินเข้าเฉิงตู',
          text: 'เฉิงตูสูง 500 เมตร นอนที่นี่ กินที่นี่ ให้คืนแรกง่ายเข้าไว้',
        },
        {
          n: '2',
          title: 'ขับไปทางตะวันตก',
          text: 'ทางด่วนสี่ถึงห้าชั่วโมงถึงคังติง 2,560 เมตร แล้วขึ้นทุ่งหญ้า ทากงอยู่ที่ 3,730 เมตร ห่างจากเมืองราวหกถึงเจ็ดชั่วโมง',
        },
        {
          n: '3',
          title: 'ขึ้นสองวัน ไม่ใช่วันเดียว',
          text: 'เราแทรกคืนที่ 2,000–2,500 เมตรระหว่างการขึ้นสองครั้ง นี่คือสิ่งที่มีประโยชน์ที่สุดเรื่องความสูง',
        },
        {
          n: '4',
          title: 'พกพาสปอร์ตติดตัว',
          text: 'โรงแรมต้องแจ้งที่พักของชาวต่างชาติต่อตำรวจ และเกสต์เฮาส์ในเมืองห่างไกลไม่ใช่ทุกที่มีสิทธิ์ เราจองเฉพาะที่มี',
        },
      ],
    },
    faq: {
      label: 'คำถามที่คนถามจริง',
      title: 'ก่อนจอง',
      items: [
        {
          q: 'ไปเสฉวนตะวันตกต้องขอใบอนุญาตไหม',
          a: 'ไม่ต้อง พื้นที่ทิเบตในเสฉวนใช้วีซ่าจีนที่ยังไม่หมดอายุ บางอำเภอชายแดนห่างไกลมีกฎของตัวเอง เราตรวจทีละแห่งก่อนยืนยันเส้นทาง',
        },
        {
          q: 'ไปลาซาโดยไม่ขอใบอนุญาตได้ไหม',
          a: 'ไม่ได้ ผู้ถือพาสปอร์ตต่างชาติทุกคนต้องมีใบอนุญาตเพื่อเข้าเขตปกครองตนเอง และไม่มีข้อยกเว้นสำหรับการเดินทางด้วยตัวเอง',
        },
        {
          q: 'เสฉวนเป็นทิเบตจริงหรือ',
          a: 'บางส่วน กานจืและงาวะเป็นเขตปกครองตนเองของชาวทิเบต คือหัวใจของคัมและอามโดบางส่วน ผู้คนพูดทิเบต เวียนอาราม เลี้ยงจามรี เป็นวัฒนธรรมเดียวกับลาซา',
        },
        {
          q: 'ขับรถเองในเสฉวนตะวันตกได้ไหม',
          a: 'จีนไม่รับใบขับขี่สากล ใบขับขี่ต่างประเทศจึงขับไม่ได้ตามกฎหมาย ในทางปฏิบัติจึงมีคนขับและคุณกำหนดเส้นทาง ต่างจากเขตปกครองตนเองที่แม้แต่แบบนั้นก็ไม่อนุญาต',
        },
        {
          q: 'เข้าทางหลวง G318 ได้ไหม',
          a: 'ฝั่งเสฉวนได้ จนถึงแม่น้ำจินซา พอข้ามไปก็เข้าระบบใบอนุญาตและไกด์ คนส่วนใหญ่จึงวิ่ง G318 เป็นวงรอบในเสฉวนโดยไม่ข้าม',
        },
        {
          q: 'ความสูงจะทรมานไหม',
          a: 'จาก 500 เมตรเป็น 3,730 เมตรในสองวัน ย่อมมีอาการ เราจึงใส่คืนที่ 2,000 เมตรไว้ และวัดออกซิเจนทุกวัน ถ้าไม่ไหว การลงต่ำได้ผลกว่าการฝืน',
        },
      ],
    },
    cta: {
      title: 'อยากไป เริ่มจากกำหนดวันก่อน',
      text: 'กลุ่มส่วนตัว 2–8 คน เลือกวันเอง และปรับเส้นทางตามกำลังของคุณ',
      primary: 'ดูเส้นทาง',
      secondary: 'คุยกับเรา',
    },
    breadcrumb: 'ทิเบตที่ไม่ต้องขอใบอนุญาต',
    home: 'หน้าแรก',
    link: 'คำตอบเต็ม พร้อมความสูงและเวลาเดินทาง',
  },
};
