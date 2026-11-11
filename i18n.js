/* Language switch: English by default, Portuguese at #pt. Translates text nodes from a dictionary. */
(function () {
  var D = {
    'Start': 'Início',
    'Open country': 'Campo aberto',
    'The outfit': 'O bando',
    'The city': 'A cidade',
    'Work a shift': 'Faça um turno',
    'Ask me': 'Pergunte',
    'Next job': 'Próximo trabalho',
    'Application file, reopened November 2026': 'Ficha de candidatura, reaberta em novembro de 2026',
    'Software engineer from São Paulo. I build the tools, agents and automations that let other people ship.': 'Engenheiro de software de São Paulo. Eu construo as ferramentas, os agentes e as automações que permitem que outras pessoas entreguem.',
    'This is my career so far, told through the two worlds I keep going back to: the open frontier and the loud city.': 'Esta é a minha carreira até aqui, contada pelos dois mundos aos quais eu sempre volto: a fronteira aberta e a cidade barulhenta.',
    'Scroll to ride into town. Move the pointer to look around. Click the sky for a shooting star.': 'Role a página para seguir até a cidade. Mova o ponteiro para olhar em volta. Clique no céu para ver uma estrela cadente.',
    'Chapter I · Open country': 'Capítulo I · Campo aberto',
    'Learn to ride before you pick a fight': 'Aprenda a andar a cavalo antes de comprar briga',
    'Every long game starts the same way. You have a horse, a few tools, and a lot of map you have not seen yet.': 'Todo jogo longo começa do mesmo jeito. Você tem um cavalo, algumas ferramentas e muito mapa que ainda não viu.',
    'Mine started in São Paulo, with a degree in IT Engineering at Universidade Paulista. Then I rode a long way from home and spent a year at The Hong Kong University of Science and Technology, studying software engineering and IT. Later I added a postgraduate degree in Software Engineering at Universidade Metodista de São Paulo.': 'O meu começou em São Paulo, com a graduação em Engenharia de TI na Universidade Paulista. Depois fui para bem longe de casa e passei um ano na The Hong Kong University of Science and Technology, estudando engenharia de software e TI. Mais tarde fiz a pós-graduação em Engenharia de Software na Universidade Metodista de São Paulo.',
    "The habit I kept from those years is simple. When I don't know the territory, I go and walk it.": 'O hábito que ficou daqueles anos é simples. Quando não conheço o território, eu vou lá e caminho por ele.',
    'Degree': 'Graduação',
    'IT Engineering, Universidade Paulista': 'Engenharia de TI, Universidade Paulista',
    'Abroad': 'Exterior',
    'HKUST, Hong Kong, Dec 2018 to Dec 2019': 'HKUST, Hong Kong, dez 2018 a dez 2019',
    'Postgraduate': 'Pós-graduação',
    'Software Engineering, Universidade Metodista de São Paulo': 'Engenharia de Software, Universidade Metodista de São Paulo',
    'Languages': 'Idiomas',
    'Portuguese, English, Spanish': 'Português, inglês, espanhol',
    'Chapter II · The outfit': 'Capítulo II · O bando',
    'Find a crew worth riding with': 'Encontre um bando que valha a pena seguir',
    'In March 2024 I joined Fiserv, on the Developer Relations team for Clover, the payment devices you see on shop counters.': 'Em março de 2024 entrei na Fiserv, no time de Developer Relations da Clover, as maquininhas de pagamento que você vê nos balcões das lojas.',
    'My job there is certification. Outside developers build apps for those devices, and nothing reaches a merchant until it has been tested and approved. I ride with each team through that process. I read their builds, test their payment flows and tell them plainly what has to change.': 'Meu trabalho lá é certificação. Desenvolvedores externos criam apps para esses dispositivos, e nada chega a um lojista sem ser testado e aprovado. Eu acompanho cada time nesse processo. Leio os builds, testo os fluxos de pagamento e digo com clareza o que precisa mudar.',
    'It taught me what I value most in a crew. Someone has to keep the camp running so everyone else can do the job they are good at. I like being that person.': 'Isso me ensinou o que eu mais valorizo em um bando. Alguém precisa manter o acampamento funcionando para que todos os outros façam o trabalho em que são bons. Eu gosto de ser essa pessoa.',
    'Joined': 'Entrada',
    'March 2024': 'Março de 2024',
    'Team': 'Time',
    'Work': 'Trabalho',
    'Certifying third-party integrations': 'Certificação de integrações de terceiros',
    'Chapter III · The city': 'Capítulo III · A cidade',
    'Bigger town, bigger jobs': 'Cidade maior, trabalhos maiores',
    'In August 2025 my title changed to AI Implementation Specialist. Same crew, different city.': 'Em agosto de 2025 meu cargo passou a ser AI Implementation Specialist. Mesmo bando, outra cidade.',
    'A big operation runs on hundreds of small jobs nobody sees. I started handing those jobs to software. These are the five I am proudest of. Open any case file.': 'Uma grande operação depende de centenas de pequenos trabalhos que ninguém vê. Comecei a entregar esses trabalhos ao software. Estes são os cinco de que mais me orgulho. Abra qualquer arquivo.',
    'The Inside Crew': 'A Equipe Interna',
    'The Wire': 'O Fio',
    'The Checkpoint': 'O Posto de Controle',
    'The Dispatcher': 'O Despachante',
    'The Storefront': 'A Vitrine',
    'Open file': 'Abrir arquivo',
    'Close': 'Fechar',
    'Before': 'Antes',
    'The job': 'O trabalho',
    'The rule': 'A regra',
    'After': 'Depois',
    'AI agents that pre-review every app arriving through a support ticket.': 'Agentes de IA que fazem a pré-análise de cada app que chega por um ticket de suporte.',
    'Every new app landed as a ticket, and a person read it from scratch.': 'Cada app novo chegava como um ticket, e uma pessoa lia tudo do zero.',
    'A manager agent hands each ticket to specialist agents and collects their pre-analysis into one brief.': 'Um agente gerente entrega cada ticket a agentes especialistas e reúne a pré-análise deles em um único resumo.',
    'The agents recommend. A human always makes the final call.': 'Os agentes recomendam. A decisão final é sempre de uma pessoa.',
    'An MCP server that lets an AI assistant work inside our support platform.': 'Um servidor MCP que permite a um assistente de IA trabalhar dentro da nossa plataforma de suporte.',
    'The assistant could not see a single ticket, so every answer started with copy and paste.': 'O assistente não enxergava nenhum ticket, então toda resposta começava com copiar e colar.',
    'A Model Context Protocol server with eight tools, covering two separate workspaces.': 'Um servidor Model Context Protocol com oito ferramentas, cobrindo dois workspaces separados.',
    'The assistant reads the real ticket history and answers from it.': 'O assistente lê o histórico real do ticket e responde a partir dele.',
    'One click that checks an Android build before a person spends a minute on it.': 'Um clique que verifica um build Android antes de uma pessoa gastar um minuto com ele.',
    'Each submitted build was downloaded and inspected by hand.': 'Cada build enviado era baixado e inspecionado à mão.',
    'A script that pulls the build, checks its manifest and its language, and sends it to a malware scan.': 'Um script que baixa o build, confere o manifest e o idioma e o envia para uma varredura de malware.',
    'The reviewer starts with the results already on screen.': 'O revisor já começa com os resultados na tela.',
    'Webhooks that route support events to the right team, tagged and on time.': 'Webhooks que encaminham eventos de suporte para o time certo, com tags e na hora.',
    'Someone had to notice an event and forward it.': 'Alguém precisava perceber um evento e encaminhá-lo.',
    'Support events trigger tagged messages to partner and internal inboxes on their own.': 'Os eventos de suporte disparam sozinhos mensagens com tags para as caixas de parceiros e as internas.',
    'The right people hear about it without anyone copying and pasting.': 'As pessoas certas ficam sabendo sem ninguém copiar e colar.',
    'Native Android sample apps that show partners how it should be wired.': 'Apps Android nativos de exemplo que mostram aos parceiros como a integração deve ser feita.',
    'Partner developers asked how order and payment calls should look, and got a description.': 'Desenvolvedores parceiros perguntavam como deveriam ser as chamadas de pedido e pagamento, e recebiam uma descrição.',
    'Working apps in Kotlin and Jetpack Compose, including a bakery point of sale with orders and native payment.': 'Apps funcionando em Kotlin e Jetpack Compose, incluindo um ponto de venda de padaria com pedidos e pagamento nativo.',
    'I point at running code.': 'Eu aponto para código rodando.',
    'Side job · Work a shift': 'Bico · Faça um turno',
    'Do my job for one minute': 'Faça o meu trabalho por um minuto',
    'Six apps want to go live on payment terminals. This is a simplified version of the review I do. Approve an app only if all four checks pass. Otherwise send it back. Then hand the same queue to the agents.': 'Seis apps querem entrar em produção nos terminais de pagamento. Esta é uma versão simplificada da análise que eu faço. Aprove um app somente se as quatro verificações passarem. Caso contrário, devolva. Depois entregue a mesma fila aos agentes.',
    'Bakery point of sale': 'Ponto de venda de padaria',
    'Bar tabs and split bills': 'Comandas de bar e divisão de conta',
    'Grocery checkout': 'Caixa de mercado',
    'Appointments and payments': 'Agendamentos e pagamentos',
    'Pet shop sales': 'Vendas de pet shop',
    'Counter orders': 'Pedidos no balcão',
    'Malware scan': 'Varredura de malware',
    'Payments': 'Pagamentos',
    'Language': 'Idioma',
    'Clean': 'Limpo',
    'Sale and refund tested': 'Venda e estorno testados',
    'Portuguese (Brazil)': 'Português (Brasil)',
    '2 engines flagged it': '2 antivírus acusaram',
    'Sale tested, refund missing': 'Venda testada, estorno faltando',
    'English only': 'Somente inglês',
    'Approve': 'Aprovar',
    'Send back': 'Devolver',
    'Read the four lines, then decide.': 'Leia as quatro linhas e decida.',
    'Right. All four checks pass, so it goes live.': 'Certo. As quatro verificações passam, então ele entra em produção.',
    'That one was fine. All four checks pass, and now a shop waits another week.': 'Esse estava certo. As quatro verificações passam, e agora uma loja espera mais uma semana.',
    'Shift over': 'Fim do turno',
    'A clean shift. Now do it again tomorrow, and the day after, without getting tired.': 'Um turno limpo. Agora repita amanhã, e depois de amanhã, sem se cansar.',
    'One slip is all it takes for a bad build to reach a shop counter, or for a good one to wait another week.': 'Basta um deslize para um build ruim chegar ao balcão de uma loja, ou para um bom esperar mais uma semana.',
    'Real tickets carry far more than four lines, and they arrive every day. My agents read all of them first and hand a person a short brief. The button stays human.': 'Tickets de verdade têm muito mais do que quatro linhas, e chegam todos os dias. Meus agentes leem todos primeiro e entregam a uma pessoa um resumo curto. O botão continua humano.',
    'Work another shift': 'Fazer outro turno',
    'Let the agents do it': 'Deixar com os agentes',
    'Now call in the agents': 'Agora chame os agentes',
    'Agents on the queue': 'Agentes na fila',
    'ticket opened': 'ticket aberto',
    'brief attached to the ticket': 'resumo anexado ao ticket',
    'All four checks pass.': 'As quatro verificações passam.',
    'the manifest has extractNativeLibs set to false': 'o manifest está com extractNativeLibs em false',
    'the malware scan flagged it': 'a varredura de malware acusou o app',
    'the refund flow was never tested': 'o fluxo de estorno nunca foi testado',
    'the app is not in Brazilian Portuguese': 'o app não está em português do Brasil',
    'Sign all six': 'Assinar os seis',
    'Back to doing it by hand': 'Voltar a fazer à mão',
    'Queue signed': 'Fila assinada',
    'Signed. Two apps go live, four go back with the reason attached. The agents did the reading. You made the call.': 'Assinado. Dois apps entram em produção, quatro voltam com o motivo anexado. Os agentes fizeram a leitura. A decisão foi sua.',
    'Simulated run with invented apps. It shows how the pieces fit: the MCP server reads the ticket, the agents check it, a person signs.': 'Execução simulada com apps inventados. Mostra como as peças se encaixam: o servidor MCP lê o ticket, os agentes verificam, uma pessoa assina.',
    'AGENT': 'AGENTE',
    'BRIEF': 'RESUMO',
    'FAIL': 'FALHA',
    'Side job · Straight answers': 'Bico · Respostas diretas',
    'Ask me what you would ask anyway': 'Pergunte o que você perguntaria de qualquer jeito',
    'What do you do all day?': 'O que você faz o dia todo?',
    'Why keep a human in the loop?': 'Por que manter uma pessoa no processo?',
    'What would you build first?': 'O que você construiria primeiro?',
    'Would you relocate?': 'Você se mudaria?',
    "I get outside developers through certification on payment devices, and I build the software that takes the repetitive parts of that work off people's plates.": 'Eu levo desenvolvedores externos pela certificação em dispositivos de pagamento, e construo o software que tira das pessoas as partes repetitivas desse trabalho.',
    'An agent reads a manifest faster than I can. It does not carry the consequences when a bad build reaches a shop counter. So my agents prepare the case, and a person signs it.': 'Um agente lê um manifest mais rápido do que eu. Mas não é ele quem arca com as consequências quando um build ruim chega ao balcão de uma loja. Por isso meus agentes preparam o caso, e uma pessoa assina.',
    'I would not decide that from the outside. I would spend the first weeks sitting with the people who use the tools, find the job they repeat most, and automate that one well.': 'Eu não decidiria isso de fora. Passaria as primeiras semanas ao lado das pessoas que usam as ferramentas, encontraria a tarefa que elas mais repetem e automatizaria essa, bem feita.',
    'Yes. I am based in São Paulo and open to relocating. I work in English, Spanish and Portuguese.': 'Sim. Moro em São Paulo e estou aberto a me mudar. Trabalho em inglês, espanhol e português.',
    'Chapter IV · The next job': 'Capítulo IV · O próximo trabalho',
    'The one I actually want': 'Aquele que eu realmente quero',
    'Your recruiting system wrote to tell me my old application was about to be deleted. Fair enough. Files get old. I would rather replace it with a better one.': 'O sistema de recrutamento de vocês me escreveu avisando que minha candidatura antiga estava prestes a ser apagada. É justo. Arquivos envelhecem. Eu prefiro trocá-la por uma melhor.',
    "What makes your worlds feel alive is the part players never see: the pipelines, the build tools, the thousand checks that run before someone's work reaches the game. That is the work I do every day, on a smaller map. I would like to do it on yours.": 'O que faz os mundos de vocês parecerem vivos é a parte que o jogador nunca vê: os pipelines, as ferramentas de build, as mil verificações que rodam antes de o trabalho de alguém chegar ao jogo. Esse é o trabalho que eu faço todos os dias, em um mapa menor. Eu gostaria de fazê-lo no de vocês.',
    'AI on a short rein.': 'IA de rédea curta.',
    'I build agents that do the legwork and leave the judgment to people.': 'Construo agentes que fazem o trabalho braçal e deixam o julgamento para as pessoas.',
    'Tools that get used.': 'Ferramentas que são usadas.',
    'Everything on this page was built for colleagues with real deadlines, then kept running.': 'Tudo nesta página foi construído para colegas com prazos reais, e depois mantido em funcionamento.',
    'Range.': 'Repertório.',
    'Loyal.': 'Leal.',
    'More loyal than Chop.': 'Mais fiel que o Chop.',
    'Python, TypeScript, Node.js, Kotlin, LLM tooling and APIs, in three languages.': 'Python, TypeScript, Node.js, Kotlin, ferramentas de LLM e APIs, em três idiomas.',
    'Keep the file open.': 'Mantenham a ficha aberta.',
    'Or call me in.': 'Ou me chamem.',
    'Reply to the email that brought you here. I answer fast.': 'Responda ao e-mail que trouxe você até aqui. Eu respondo rápido.',
    'A personal page made by Jorge Andrade Rodrigues. It is not affiliated with or endorsed by Rockstar Games. Red Dead Redemption and Grand Theft Auto are trademarks of their respective owners and are mentioned here only as a fan. The apps in the review game are invented examples.': 'Página pessoal feita por Jorge Andrade Rodrigues. Não é afiliada à Rockstar Games nem endossada por ela. Red Dead Redemption e Grand Theft Auto são marcas de seus respectivos donos e são citadas aqui apenas por um fã. Os apps do jogo de análise são exemplos inventados.',
    'Sundown · open country': 'Pôr do sol · campo aberto',
    'Dusk · the trail to town': 'Crepúsculo · a trilha para a cidade',
    'Nightfall · city limits': 'Anoitecer · limite da cidade',
    'Midnight · downtown': 'Meia-noite · centro'
  };
  var WHY = {
    'the manifest has extractNativeLibs set to false': 'o manifest está com extractNativeLibs em false',
    'the malware scan flagged it': 'a varredura de malware acusou o app',
    'the refund flow was never tested': 'o fluxo de estorno nunca foi testado',
    'the app is not in Brazilian Portuguese': 'o app não está em português do Brasil'
  };
  var RULES = [
    [/^Submission (\d+) of (\d+)$/, function (m) { return 'Envio ' + m[1] + ' de ' + m[2]; }],
    [/^(\d+) of (\d+) right$/, function (m) { return m[1] + ' de ' + m[2] + ' certos'; }],
    [/^Right\. It goes back because (.+)\.$/, function (m) { return WHY[m[1]] ? 'Certo. Ele volta porque ' + WHY[m[1]] + '.' : null; }],
    [/^Missed it\. It should go back because (.+)\.$/, function (m) { return WHY[m[1]] ? 'Passou batido. Ele deveria voltar porque ' + WHY[m[1]] + '.' : null; }],
    [/^Six briefs ready\.( By hand, the same queue took you ([\d.]+) seconds\.)? Nothing is live until a person signs\.$/, function (m) { return 'Seis resumos prontos.' + (m[2] ? ' À mão, a mesma fila levou ' + m[2].replace('.', ',') + ' segundos.' : '') + ' Nada entra em produção até uma pessoa assinar.'; }]
  ];
  var REV = {};
  Object.keys(D).forEach(function (k) { REV[D[k]] = k; });
  var lang = 'en';

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function toPt(s) {
    var k = norm(s);
    if (Object.prototype.hasOwnProperty.call(D, k)) return D[k];
    for (var i = 0; i < RULES.length; i++) {
      var m = k.match(RULES[i][0]);
      if (m) return RULES[i][1](m);
    }
    return null;
  }
  window.__tr = function (s) { return lang === 'pt' ? (toPt(s) || s) : s; };

  function apply(node) {
    var p = node.parentNode;
    if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return;
    if (p.closest && p.closest('.langsw')) return;
    var v = node.nodeValue;
    if (!v || !v.trim()) return;
    var lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
    if (lang === 'pt') {
      var t = toPt(v);
      if (t) { node.__en = v; node.nodeValue = lead + t + trail; }
    } else if (node.__en != null) {
      var en = node.__en; node.__en = null; node.nodeValue = en;
    } else {
      var k = norm(v);
      if (Object.prototype.hasOwnProperty.call(REV, k)) node.nodeValue = lead + REV[k] + trail;
    }
  }
  function walk(root) {
    if (root.nodeType === 3) { apply(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(apply);
  }

  var css = document.createElement('style');
  css.textContent = '.langsw{position:fixed;z-index:3;top:calc(12px + env(safe-area-inset-top,0px));right:max(16px,env(safe-area-inset-right,0px));display:flex;gap:2px;padding:3px;background:var(--scrim);border:1px solid var(--rule);border-radius:3px}' +
    '.langsw button{font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;color:var(--paper-dim);background:none;border:0;border-radius:2px;padding:.3rem .55rem;cursor:pointer}' +
    '.langsw button:hover{color:var(--paper)}' +
    '.langsw button[aria-pressed="true"]{background:var(--paper);color:var(--night)}';
  document.head.appendChild(css);

  var box = document.createElement('div');
  box.className = 'langsw';
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', 'Language / Idioma');
  var bEn = document.createElement('button'); bEn.type = 'button'; bEn.textContent = 'EN'; bEn.setAttribute('aria-label', 'English');
  var bPt = document.createElement('button'); bPt.type = 'button'; bPt.textContent = 'PT'; bPt.setAttribute('aria-label', 'Português');
  box.appendChild(bEn); box.appendChild(bPt);
  document.body.appendChild(box);

  function setLang(next, keepHash) {
    lang = next === 'pt' ? 'pt' : 'en';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    bEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    bPt.setAttribute('aria-pressed', lang === 'pt' ? 'true' : 'false');
    walk(document.body);
    if (!keepHash) {
      try { history.replaceState(null, '', lang === 'pt' ? '#pt' : location.pathname + location.search); } catch (e) {}
    }
  }
  bEn.addEventListener('click', function () { setLang('en'); });
  bPt.addEventListener('click', function () { setLang('pt'); });
  window.addEventListener('hashchange', function () { setLang(location.hash === '#pt' ? 'pt' : 'en', true); });

  new MutationObserver(function (list) {
    if (lang !== 'pt') return;
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === 'characterData') apply(m.target);
      else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  setLang(location.hash === '#pt' ? 'pt' : 'en', true);
})();
