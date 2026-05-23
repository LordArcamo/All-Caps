export type Story = {
  slug: string;
  tag: "MAKING" | "CULTURE" | "DROP" | "INTERVIEW";
  title: string;
  excerpt: string;
  date: string;
  read: string;
  tone: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  body: string[];
  pullQuote?: string;
  related?: string[];
};

export const STORIES: Story[] = [
  {
    slug: "brooklyn-workshop",
    tag: "MAKING",
    title: "Inside the Brooklyn workshop: every stitch, named.",
    excerpt:
      "We spent a day on Bedford Ave with the team that hand-finishes every cap. Yes, every cap. Yes, by hand.",
    date: "MAY 12, 2026",
    read: "6 MIN",
    tone: "#FFCC00",
    author: {
      name: "Aaliyah Jean",
      role: "Brand + Community",
      initials: "AJ",
    },
    body: [
      "The workshop on Bedford Avenue used to be a bicycle repair shop. Same bones — exposed brick, twenty-foot ceilings, a freight elevator that wheezes — but now it's where every snapback in Drop 02 gets its final treatment. The space hums with three industrial machines, four humans, and a lot of opinions about how a brim should sit.",
      "I went there on a Tuesday in May to watch Marcus and the team finish 47 caps in eight hours. They work in batches of twelve. One person on the stitch machine, one on the brim press, one on quality control, one on packing. They rotate every two hours. Nobody wears headphones — they argue.",
      "\"The argument is the quality control,\" Marcus tells me. He's been doing this for fourteen years, the last two with ALL CAPS. Before that, three brands you've heard of and one you haven't. \"If nobody's pushing back on the stitch tension or the foam density, you're either all geniuses or all idiots. Probably idiots.\"",
      "Each cap takes about twenty-eight minutes of human time. The Void Runner has 134 stitches in the visor alone, all visible from the underside. The Halo Snap's reflective trim gets pressed twice — once for grip, once for finish. The Iron Fitted's metal side badge is hand-stamped with a die Marcus's predecessor cut in 2003.",
      "When a cap fails QC, it gets a yellow tag and goes in a bin labeled BACKLASH. About 4% of finished caps fail. Most are subtle — a thread too long, a foam crown that crowns weird, a logo offset by 2mm. Marcus's rule: \"If you'd notice it on the street, it's out.\"",
      "The backlash bin gets emptied once a quarter. The team votes on what to do — donate to skate shops as test units, deconstruct and reuse the parts, or in one memorable case, mount one above the QC station with the failure circled in red marker. \"That's the wall of shame,\" Aaliyah laughs. \"Marcus made it after a particularly bad batch of brims.\"",
      "Every finished cap gets a small label sewn into the inside lining. It has three things: the drop number, the cap's position in the run (172 / 200, say), and the initials of whoever stitched it. That's not theatre. Marcus pulled one out of the box for me — initials MS — and said, \"That's mine. If the brim's crooked, that's me. If the stitch puckers, that's me. People deserve to know who made the thing they're putting on their head.\"",
      "Drop 02 ships from this workshop next week. Two hundred Void Runners, two hundred Halo Snaps, two hundred Neon Truckers. After that, the team takes a week off. They earned it.",
    ],
    pullQuote:
      "People deserve to know who made the thing they're putting on their head.",
    related: ["heavy-twill-deep-dive", "mia-takeuchi", "drop-02-diary"],
  },
  {
    slug: "cap-is-the-new-tee",
    tag: "CULTURE",
    title: "The cap is the new t-shirt. Here's why.",
    excerpt:
      "Headwear became the canvas for self-expression in 2024. We talked to four stylists about what's next.",
    date: "APR 28, 2026",
    read: "4 MIN",
    tone: "#FF2D2D",
    author: {
      name: "Jesse Okonkwo",
      role: "Founder",
      initials: "JO",
    },
    body: [
      "For twenty years, the t-shirt was the canvas. Logo on the chest, slogan across the back, sometimes a giant graphic if you were feeling bold. T-shirts were how you signaled — your team, your taste, your tribe.",
      "Then in 2024, something flipped. Caps started carrying the message. Walk down Lafayette in SoHo on a Saturday and count: more people are reading the cap than the shirt.",
      "Why? A few reasons, depending on which stylist you ask.",
      "Janelle, who styles for editorial: \"The cap is the only thing people see when you're at a counter, on a Zoom, in a crowd. The t-shirt disappears under the jacket. The cap stays.\"",
      "Marcus, who styles for music videos: \"It's the cheapest piece of luxury. Eighty bucks gets you a heavy cap that lasts ten years. Eighty bucks gets you a t-shirt that pills in six months.\"",
      "Riya, who styles for hip-hop press: \"It's a face frame. It changes how you look, immediately. The right cap turns a regular outfit into a look.\"",
      "Diego, who styles for athletes: \"Caps don't care about your body. You don't need to be in shape, the right size, anything. They fit everyone. Equality of style.\"",
      "ALL CAPS bet on this when we started. We don't make t-shirts. We don't make hoodies. We don't make pants. We make caps, hard, and we make them well. The pivot point of an outfit. The cheapest premium signal you can buy.",
      "Drop 03 lands in late June. More on that soon.",
    ],
    pullQuote: "The cap is the cheapest piece of luxury.",
    related: ["brooklyn-workshop", "death-of-influencer-cap"],
  },
  {
    slug: "drop-02-diary",
    tag: "DROP",
    title: "Drop 02 — the photo diary.",
    excerpt:
      "Backstage shots, mood boards, and the cut conversations that didn't make the final lineup.",
    date: "APR 18, 2026",
    read: "3 MIN",
    tone: "#3A3F45",
    author: {
      name: "Mia Takeuchi",
      role: "Head of Design",
      initials: "MT",
    },
    body: [
      "Drop 02 started as a mood board with three references: a Brooklyn fire escape at golden hour, a Tokyo Sega arcade at midnight, and the matte gunmetal of a 1970s Pentax.",
      "From those three references, we cut a list of forty-six concepts. We make-not-make decisions at the workshop, in person. No Slack threads, no Figma comments. You hold the cap, you wear it for ten minutes, you decide.",
      "Forty-six concepts became fourteen. Fourteen became eight. Eight is the drop.",
      "The cuts hurt. There was a beanie with a yellow embroidered lightning bolt that I loved and Marcus said \"no kid is going to wear that\" and we cut it. There was a fitted in a deep purple that we couldn't get the dye right on after three attempts. There was a trucker with a holographic patch that looked great in photos and terrible in person.",
      "We kept what worked: a snapback with a heavier crown than anyone else makes, a fitted in two colors that match nothing and everything, a dad cap that gets better the more you beat it up, a beanie in merino because we're tired of itchy beanies, a trucker that screams without trying, a snapback with 3M trim for the night people, a fitted with a stamped metal badge for the heavyweight crowd, and a trucker in hi-vis yellow for people who want everyone to know they exist.",
      "Two hundred of each. When they're gone, we don't restock. Drop 03 has nothing in common with Drop 02. That's the deal.",
    ],
    related: ["brooklyn-workshop", "mia-takeuchi"],
  },
  {
    slug: "mia-takeuchi",
    tag: "INTERVIEW",
    title: "Mia Takeuchi on Tokyo workshop culture.",
    excerpt:
      "Our head of design unpacks why slow, small-batch construction is the only way to make a cap that lasts.",
    date: "APR 02, 2026",
    read: "8 MIN",
    tone: "#D9C9A8",
    author: {
      name: "Jesse Okonkwo",
      role: "Founder",
      initials: "JO",
    },
    body: [
      "I called Mia at 9pm her time, which is 8am mine. She was in the Shibuya workshop, drinking matcha, sitting next to a stack of finished Static Fitteds that were about to ship to Brooklyn.",
      "Jesse: How did you end up making caps?",
      "Mia: My grandfather was a hatter in Osaka. Not caps — formal hats, fedoras, that kind of thing. I grew up watching him work and decided as a teenager I never wanted to do it. Then I went to design school in Tokyo, did three years at a streetwear brand here, and realized headwear was the only thing I actually thought about.",
      "Jesse: Why caps specifically? Why not hats or beanies or the whole category?",
      "Mia: Caps are the hardest. You think they're simple — six panels, a brim, a label — but every silhouette has to fit a thousand different head shapes, look good from five angles, survive ten years of sweat and rain, and still feel like an object you care about. There's nowhere to hide. A bad fedora is just an ugly fedora. A bad cap is a thing you stop wearing in a month.",
      "Jesse: Why slow construction? Why not just scale up?",
      "Mia: We could. We've had offers. The math is brutal — same drop, six factories, ten thousand units, half the unit cost. But you lose the thing that makes a cap worth eighty dollars. The thing isn't the materials. Materials cost the same whether you make ten thousand or two hundred. The thing is the attention. Who's looking at the brim before it gets pressed. Who's pulling the threads tight by hand. Who's noticing that the foam in this batch is 2% denser and adjusting.",
      "Jesse: People can't tell the difference, right?",
      "Mia: People can absolutely tell the difference. They might not be able to name it. They'll just say \"this cap is better\" and move on. That's how it's supposed to work. The work is invisible. The result isn't.",
      "Jesse: Last question. Why the cap-on-cap-on-cap design philosophy? Why does every ALL CAPS piece reference other caps?",
      "Mia: Because we're making caps for people who already love caps. We don't need to convince anyone the cap is cool. We're talking to the people who already know. So the design can be in-jokes, references, little nods. The Void Runner's brim has the same curve as a 1996 New Era. The Halo Snap's mesh back is geometry-pure like a 2003 Mitchell & Ness. The Iron Fitted's badge is a love letter to old hardware. People who know, know. People who don't, they buy it because it just looks right.",
    ],
    pullQuote:
      "The work is invisible. The result isn't.",
    related: ["brooklyn-workshop", "heavy-twill-deep-dive"],
  },
  {
    slug: "death-of-influencer-cap",
    tag: "CULTURE",
    title: "The death of the influencer cap.",
    excerpt:
      "Why we don't gift to influencers, why we don't run paid partnerships, and why our growth is still going up.",
    date: "MAR 19, 2026",
    read: "5 MIN",
    tone: "#5A6048",
    author: {
      name: "Jesse Okonkwo",
      role: "Founder",
      initials: "JO",
    },
    body: [
      "Around January, we got an email from an agency representing four influencers with a combined 12 million followers. The deal: send each one a free Drop 01 cap, they'd post once. The agency estimated 600k organic impressions, maybe 8k click-throughs, conservatively 200 sales.",
      "We said no.",
      "It was a hard no. Not a counter-offer, not a let-us-think-about-it. Just no.",
      "Three reasons.",
      "First: the math doesn't work, even if it works. Two hundred sales at $65 is $13,000 in revenue. Cost of goods is about $4,400. The four caps to influencers cost us $260. Maybe ten more orders converted from a friend-of-influencer effect. Net is about $8,500. Nice. But that's a one-time spike. The followers who bought because their favorite influencer wore the cap are not our customers. They're the influencer's customers. They'll buy whatever the influencer wears next. We just rented their attention.",
      "Second: it breaks the brand. ALL CAPS exists because mainstream cap brands lost the plot doing exactly this kind of thing. Drops that aren't really limited. \"Exclusive\" collabs that are just paid placement. Caps you bought because a famous person wore one once. That whole game is exhausting and we don't want to be in it.",
      "Third: it's disrespectful to our customers. The people who bought Drop 01 paid full retail because they wanted the cap, not because an algorithm pushed it. If we then turn around and pay an influencer to wear it for free, we're saying \"your money was nice, but his attention is nicer.\" No.",
      "Our growth is still going up. Drop 01 sold out in 17 hours. Drop 02 is on pace for 8 hours. We have ~7,400 newsletter subscribers who actually open the emails. Word of mouth, mostly. Some press. Zero influencer collabs.",
      "Will this scale forever? Probably not. There's a ceiling on word-of-mouth growth and we'll hit it eventually. When we do, we'll figure something else out. But we're not in a hurry to get there.",
    ],
    pullQuote:
      "The followers who bought because their favorite influencer wore the cap are not our customers. They're the influencer's customers.",
    related: ["cap-is-the-new-tee", "brooklyn-workshop"],
  },
  {
    slug: "heavy-twill-deep-dive",
    tag: "MAKING",
    title: "What's in a heavy-twill cap that lasts ten years?",
    excerpt:
      "Materials science meets workshop craft. We break down every layer of a Void Runner snapback.",
    date: "MAR 05, 2026",
    read: "7 MIN",
    tone: "#FFCC00",
    author: {
      name: "Lars Weber",
      role: "Production Lead",
      initials: "LW",
    },
    body: [
      "A cap is six panels and a brim. That's the lie. A cap is actually nineteen distinct material decisions, each of which affects how the cap holds up over a decade. I'm going to walk through all of them, because the question I get most often is \"why is this cap eighty dollars when I can get one for twenty.\"",
      "Layer 1: the twill itself. Most caps use 9oz twill, sometimes 7oz to save money. We use 11oz on the Void Runner. Heavier twill means heavier crown, which means the cap holds shape over time. A 9oz twill cap goes floppy in 18 months. An 11oz holds for 5+ years.",
      "Layer 2: the weave. Twill weave has a diagonal pattern that's stronger than plain weave but harder to make. We use a 2/1 twill (two over, one under). It's about 12% more thread per square inch than the cheap stuff.",
      "Layer 3: the dye. Reactive dyes bond to the fiber. Direct dyes coat the fiber. Direct is cheaper and washes out in three years. Reactive is what we use. It costs ~3x more.",
      "Layer 4: the buckram. That's the stiff lining inside the front panels that gives the crown its shape. Most caps use a plastic buckram that cracks after enough flexing. We use a cotton-impregnated buckram that flexes without cracking.",
      "Layer 5: the sweatband. Cheap caps use polyester. Polyester doesn't breathe. After two months of summer wear, a polyester sweatband stinks permanently. We use cotton with a moisture-wicking blend layer.",
      "Layer 6: the brim. Plastic brim inserts come in three grades. We use the second-grade — slightly heavier, slightly less flexible, but it holds the curve through rain and heat.",
      "Layer 7: the visor undercoating. The cheap caps use a printed pattern under the brim. We use a real fabric layer (poly-cotton blend in olive green or undyed black). Lasts forever, looks better the more sun hits it.",
      "Layer 8: the stitching. Industrial caps run at 8-10 stitches per inch. We run at 12. The needle is thinner, the thread is slightly thicker. The seams hold under more stress.",
      "Layers 9 through 19 are smaller — eyelet construction, panel seam allowance, snap-back tape grade, embroidery thread choice, logo construction, tag attachment method, etc. Each one is a coin-flip decision the factory makes. Each one is the difference between a cap that costs $20 to make and a cap that costs $32 to make. We pay the $32 every time.",
      "The result: a Void Runner that goes through a decade and looks better at year ten than it did at year one. The honest truth about premium goods is that they look like the cheap version on day one. The difference shows up in year three.",
    ],
    pullQuote:
      "The honest truth about premium goods is that they look like the cheap version on day one. The difference shows up in year three.",
    related: ["brooklyn-workshop", "mia-takeuchi"],
  },
];

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug);
}
