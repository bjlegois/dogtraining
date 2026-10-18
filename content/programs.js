/*
  OpenLeash — training programs
  ==============================
  Edit this file to change or add programs. No build step: save, commit, done.

  Each program:
    id        unique, lowercase, no spaces (used in links and saved progress — don't rename once people use it)
    title     shown everywhere
    icon      one emoji
    category  "start" | "skills" | "problems" | "care"
    summary   one line on the program card
    why       why dogs do this / what the program does (2–4 sentences)
    gear      optional list of things you need
    steps     ordered list; each step:
                title    short name
                goal     one line: what this step teaches
                do       3–5 SHORT bullets shown during a session (keep each under ~15 words)
                advance  when to move to the next step
                tip      optional one extra line
                demo     optional video URL — only add one when text isn't enough
    mistakes  common mistakes
    help      optional: when to bring in a professional

  Rule for all content: reward-based only. No pain, fear, startle or intimidation.
*/

window.OL_PROGRAMS = [

  /* ───────────── START HERE ───────────── */

  {
    id: "foundations",
    title: "Training foundations",
    icon: "🧱",
    category: "start",
    summary: "Marker, name, touch, release word, sit and down. Every other program builds on these.",
    why: "Training is a conversation. A marker (click or “yes!”) tells your dog the exact moment they got it right. The reward makes it worth repeating. A release word tells them when they're done. Get these right and everything else goes faster.",
    gear: ["Tiny soft treats, pea-sized", "Treat pouch or a pocket", "The app's clicker, a real clicker, or a short “yes!”"],
    steps: [
      {
        title: "Charge the marker",
        goal: "Your dog learns that the click means a treat is coming.",
        do: [
          "Click, then hand over a treat. Repeat 15–20 times.",
          "No behavior needed yet — just click, then treat.",
          "Keep treats out of sight until after the click.",
          "Vary the timing so your hand moving isn't the signal."
        ],
        advance: "Your dog's head snaps toward you at the click, even when looking away.",
        tip: "Pick one marker. If you use both a clicker and a word, charge each one separately."
      },
      {
        title: "Name game",
        goal: "Their name means “look at me — something good is coming.”",
        do: [
          "Say their name once, in a happy voice.",
          "The moment they look at you: mark, treat.",
          "No look? Make a small noise. Don't repeat the name.",
          "10 reps, then try it from another room."
        ],
        advance: "8 of 10 quick head-turns to their name indoors.",
        tip: "Never use their name to scold. It should only ever predict good things."
      },
      {
        title: "Hand target (touch)",
        goal: "Nose to your palm on cue — a way to move your dog anywhere without pulling.",
        do: [
          "Hold a flat palm a few inches from their nose.",
          "Nose bumps palm: mark, then treat from your other hand.",
          "Move your hand to a new spot each rep.",
          "Say “touch” just before offering your hand once they bump it every time."
        ],
        advance: "8 of 10 touches with your hand a foot away, cue first.",
        tip: "Touch is the backbone of recall, loose-leash walking and calm greetings."
      },
      {
        title: "Release word",
        goal: "One word that means “you're free — this cue is over.”",
        do: [
          "Pick one word: “free,” “break,” or “okay.”",
          "Ask for a sit, wait 1 second, say the release word.",
          "Toss a treat a few feet away so they get up and move.",
          "End every sit, down, stay and wait with it."
        ],
        advance: "Your dog holds position until released, then moves happily.",
        tip: "Without a release word, your dog decides when a cue is over."
      },
      {
        title: "Find it",
        goal: "A game that resets a distracted, worried or wound-up dog.",
        do: [
          "Say “find it,” then drop a treat at your feet.",
          "Repeat, then toss treats a little farther.",
          "Use it whenever your dog is stressed or distracted."
        ],
        advance: "Your dog's nose drops to the ground the moment you say “find it.”",
        tip: "Sniffing lowers arousal. This is your go-to calm-down button."
      },
      {
        title: "Sit and down",
        goal: "Two simple positions you can reward all day long.",
        do: [
          "Sit: move a treat from nose up and slightly back. Mark when the bottom lands.",
          "Down: move a treat from nose straight to the floor. Mark when elbows touch.",
          "After 5 reps, make the same hand motion with no treat in it.",
          "Then say the word just before the hand signal."
        ],
        advance: "Sit and down on the word alone, 8 of 10, in two different rooms.",
        tip: "Fade the food lure fast. A lure that stays in the picture turns into a bribe."
      }
    ],
    mistakes: [
      "Repeating cues (“sit, sit, SIT”). Say it once, then help your dog succeed.",
      "Sessions that run too long. 3 to 5 minutes is plenty — a few times a day.",
      "Marking but forgetting to reward. Every click gets paid.",
      "Training only in the kitchen. Practice in new places as soon as it's solid."
    ]
  },

  {
    id: "enrichment",
    title: "Daily needs & enrichment",
    icon: "🌿",
    category: "start",
    summary: "Many “problem” behaviors are unmet needs. Cover these and training gets easier.",
    why: "Dogs need to sniff, chew, chase, think and rest. When those needs aren't met, they find their own outlets — digging, barking, chewing your stuff, zoomies at midnight. This is the cheapest fix in the whole app.",
    gear: ["Long line or leash", "Puzzle feeder, snuffle mat, or just grass for scatter feeding", "Safe chews"],
    steps: [
      {
        title: "Sniff walks",
        goal: "A daily walk where your dog's nose sets the pace.",
        do: [
          "Once a day, go somewhere quiet on a long line or loose leash.",
          "Walk slowly. Let them sniff as long as they want.",
          "No training, no schedule — just exploring.",
          "Sniffing is mentally tiring in a good way."
        ],
        advance: "A sniff walk on most days of the week.",
        tip: "A slow sniffy walk often settles a dog better than a fast march around the block."
      },
      {
        title: "Work for food",
        goal: "Mealtime becomes a puzzle instead of a 30-second gulp.",
        do: [
          "Feed one meal from a puzzle toy, snuffle mat, or scattered in the grass.",
          "Start easy so your dog doesn't give up.",
          "Frozen stuffed toys last longer on busy days."
        ],
        advance: "At least one meal a day is a puzzle.",
        tip: "Measure it out of their daily food so you don't overfeed."
      },
      {
        title: "Chew time",
        goal: "A legal, calming chew every day.",
        do: [
          "Offer a safe chew daily, sized for your dog.",
          "Chewing and licking help dogs settle.",
          "Supervise new chews until you know how your dog handles them."
        ],
        advance: "Your dog has a chew session most days.",
        tip: "Ask your vet which chews are safe for your dog's teeth."
      },
      {
        title: "Brain games",
        goal: "Mental work that tires your dog out.",
        do: [
          "Hide treats around a room and say “find it.”",
          "Teach a new trick each week (spin, shake, bow).",
          "Rotate toys so they stay interesting."
        ],
        advance: "A 5-minute brain game most days."
      },
      {
        title: "Play with rules",
        goal: "Play that builds focus instead of chaos.",
        do: [
          "Tug is fine: teach “drop” (see Drop it), then restart the game.",
          "Short chase games with a toy, not with you or kids.",
          "End play before your dog gets over-excited."
        ],
        advance: "Play stops and starts on cue.",
        tip: "Endless ball-throwing can wind some dogs up. Mix in calm sniffing."
      },
      {
        title: "Rest",
        goal: "Enough sleep to stay calm.",
        do: [
          "Adult dogs sleep a lot — often 12–14 hours a day.",
          "Protect nap time. Overtired dogs act out.",
          "Plan quiet time after big outings."
        ],
        advance: "Your dog has quiet downtime every day.",
        tip: "A dog that won't settle may need less excitement, not more exercise."
      }
    ],
    mistakes: [
      "Only physical exercise, no brain work or sniffing.",
      "No downtime — over-tired dogs get mouthy and reactive.",
      "Expecting training to fix a need that isn't being met."
    ]
  },

  /* ───────────── EVERYDAY SKILLS ───────────── */

  {
    id: "recall",
    title: "Come when called",
    icon: "📣",
    category: "skills",
    featured: true,
    summary: "A recall that works outdoors — built for dogs where luring and “being boring” already failed.",
    why: "Most dogs ignore “come” because something else pays better — a smell, a squirrel, freedom — or because “come” has started to mean the fun is over. Showing a treat to lure them back teaches them to check whether you have food first. This program fixes the real causes: a fresh cue, rewards that beat the competition, a long line so ignoring you never works, and using the distraction itself as the reward.",
    gear: [
      "Back-clip harness — never attach a long line to a collar",
      "15–30 ft long line (flat or biothane, not a retractable leash)",
      "Very high-value food: chicken, cheese, hot dog — not kibble",
      "The app's whistle (Tools) — set the pitch once and never change it",
      "Gloves for handling the long line"
    ],
    steps: [
      {
        title: "Choose a fresh cue",
        goal: "A cue with no bad history, used only when you can make it pay.",
        do: [
          "Pick a new word (“here!”) or the app whistle's pip-pip-pip.",
          "Retire your old word if it's been ignored a lot.",
          "Rule: if you can't reward it, don't say it.",
          "For baths, nail trims or leaving: go get your dog. Don't call."
        ],
        advance: "Everyone in the home knows the new cue and the rule.",
        tip: "A cue said and ignored hundreds of times is “poisoned.” Starting fresh is faster than repairing it."
      },
      {
        title: "Charge the cue",
        goal: "The cue becomes the best sound in your dog's world.",
        do: [
          "Indoors, dog right next to you. Give the cue once.",
          "Immediately feed 3–5 treats in a row, one at a time.",
          "No movement needed — they're already there.",
          "10 reps, 2–3 short sessions a day, for 2–3 days."
        ],
        advance: "At the cue, your dog's head whips around — even mid-sniff indoors.",
        tip: "Don't show food before the cue. The cue predicts the food, not the other way around."
      },
      {
        title: "Recall games at home",
        goal: "Coming to you becomes a game your dog always wins.",
        do: [
          "Cue once, then run backward or away — chasing you is fun.",
          "Pay at your feet: treats plus a gentle collar touch.",
          "Ping-pong: two people take turns calling across the house.",
          "Hide-and-seek: hide, cue once, party when they find you."
        ],
        advance: "9 of 10 fast recalls from another room.",
        tip: "Moving away from your dog is a stronger magnet than any lure."
      },
      {
        title: "Collar grab = good things",
        goal: "Being caught no longer means the fun ends.",
        do: [
          "Touch the collar or harness, then treat.",
          "Build to a gentle 1–2 second hold, then treat.",
          "Clip the leash on, treat, unclip, release.",
          "10 random reps a day."
        ],
        advance: "Your dog leans into your hand when you reach for the collar.",
        tip: "Dogs that dodge at the last second have learned the grab predicts leaving."
      },
      {
        title: "Long line, quiet place",
        goal: "Practice outside where ignoring you can't pay off.",
        do: [
          "Long line on a back-clip harness, quiet yard or empty field.",
          "Call when they're mildly busy — not mid-chase.",
          "Cue once, then back away happily. Pay big.",
          "No response? Don't repeat the cue.",
          "Make a silly noise, run away, or calmly walk over. Make the next rep easier."
        ],
        advance: "8 of 10 recalls on the line in a quiet outdoor spot.",
        tip: "Hold the line loosely. It's for safety and stopping escapes — never reel or drag your dog in."
      },
      {
        title: "Come back, then go play",
        goal: "Use the distraction itself as the reward.",
        do: [
          "Let your dog sniff something interesting on the line.",
          "Cue once. When they come: mark and treat.",
          "Then release — “go sniff!” — and send them right back to it.",
          "Coming to you now gets them more freedom, not less."
        ],
        advance: "Your dog leaves a mild distraction quickly, expecting to be sent back.",
        tip: "This is the fix for dogs who ignore treats outside. The smell, the ball, the other dog — those become your rewards."
      },
      {
        title: "Proof it, one notch at a time",
        goal: "A recall that works anywhere.",
        do: [
          "Change one thing at a time: distance, distraction, or place.",
          "When you raise one, make the others easier.",
          "Ladder: leaves → toy on ground → person walking → dog far away → wildlife.",
          "Stay on the long line the whole time."
        ],
        advance: "8 of 10 at each rung before moving up.",
        tip: "If it falls apart, you jumped too far. Drop back a rung — that's normal, not failure."
      },
      {
        title: "Emergency recall",
        goal: "A separate, rarely used cue for real danger.",
        do: [
          "Pick a second cue only for emergencies — a unique word like “pizza!”",
          "Every time: a jackpot. A whole handful of the best food, 30 seconds of praise.",
          "Practice once or twice a week, no more, so it stays special.",
          "Build it up the same way: indoors first, then the long line."
        ],
        advance: "Instant, full-speed returns from a moderate distraction on the long line.",
        tip: "This cue is your seatbelt. Never spend it on everyday stuff."
      },
      {
        title: "Off-leash, carefully",
        goal: "Freedom earned in safe, enclosed spaces.",
        do: [
          "Only where it's legal and fenced or very safe.",
          "First let the line drag on the ground before removing it.",
          "Call often for a treat, then send them back to play.",
          "If a recall fails, go back to the line for a week."
        ],
        advance: "9 of 10 recalls with the line dragging, in that place.",
        tip: "Every failed off-leash recall teaches your dog that coming is optional. Protect your success rate."
      }
    ],
    mistakes: [
      "Calling only to end the fun. Call often for a treat, then let them go back.",
      "Repeating the cue. Each ignored cue teaches that it's optional.",
      "Scolding a slow return. Whatever happened before, coming back must always pay.",
      "Chasing your dog — it's a game they win. Run the other way.",
      "Low-value rewards outdoors. Kibble can't compete with a squirrel.",
      "Showing food to get your dog to come. Rewards appear after they arrive.",
      "Going off-leash before the long-line work is solid."
    ],
    help: "If your dog bolts in fear, or recall trouble comes with aggression toward people or dogs, work with a certified reward-based trainer."
  },

  {
    id: "leash",
    title: "Loose-leash walking",
    icon: "🦮",
    category: "skills",
    summary: "Walks without the tug-of-war.",
    why: "Dogs pull because pulling works — it gets them to the good smells faster, and they naturally walk faster than we do. To fix it, a loose leash has to become the way to get where they want to go.",
    gear: ["Flat 6 ft leash — retractable leashes reward pulling", "Well-fitted harness (front-clip can help strong pullers)", "Treat pouch with plenty of small treats"],
    steps: [
      {
        title: "The magic spot",
        goal: "Standing by your leg is the best place to be.",
        do: [
          "Pick a side. Hold treats at your pant seam.",
          "Stand still and feed your dog for being at your side.",
          "Take one step. Treat at your seam if they stayed.",
          "Build to 5 steps between treats."
        ],
        advance: "5 steps at your side indoors, 8 of 10.",
        tip: "Always deliver treats at the same spot by your leg. Where the reward lands is where your dog wants to be."
      },
      {
        title: "Follow me",
        goal: "Your dog keeps track of where you're going.",
        do: [
          "In the yard, walk off in a random direction.",
          "When your dog catches up to your side: mark and treat.",
          "Change direction often.",
          "Talk to them. Be more interesting than the grass."
        ],
        advance: "Your dog stays near you as you zig-zag around the yard."
      },
      {
        title: "Be a tree",
        goal: "Pulling never moves you forward.",
        do: [
          "Leash goes tight: stop. Stand still and quiet.",
          "Don't pull back — just wait.",
          "The moment the leash goes slack: mark, treat at your side, walk on.",
          "Every time. Consistency is everything."
        ],
        advance: "Your dog checks back with you within a few seconds of the leash tightening."
      },
      {
        title: "Cheerful U-turn",
        goal: "A happy way to change direction before the leash gets tight.",
        do: [
          "Dog starting to forge ahead? Say “this way!” and turn around.",
          "Mark and treat when they catch up.",
          "Use it before the leash goes tight, not after.",
          "Quiet places first."
        ],
        advance: "Smooth U-turns with no leash tension."
      },
      {
        title: "Sniffing is the reward",
        goal: "Loose leash earns sniff breaks.",
        do: [
          "After a stretch of loose leash, release: “go sniff!”",
          "Let them sniff for 10–20 seconds.",
          "Then “let's go” and continue.",
          "Outdoors, sniffs pay as well as treats."
        ],
        advance: "Your dog walks loosely, expecting sniff breaks."
      },
      {
        title: "Real walks",
        goal: "Take it on the road.",
        do: [
          "Start on quiet streets at quiet times.",
          "Treat every few steps at first.",
          "Then every 10 steps, then every 20.",
          "Busy area? Go back to more treats and shorter goals."
        ],
        advance: "A full block on a loose leash with occasional rewards."
      }
    ],
    mistakes: [
      "Letting pulling work “just this once.” Inconsistency is the #1 reason this fails.",
      "Retractable leashes — they teach that tension gets more leash.",
      "Expecting a perfect heel. A loose leash is the goal, not precision.",
      "Starting in busy places with an under-exercised dog."
    ]
  },

  {
    id: "impulse",
    title: "Impulse control",
    icon: "🧘",
    category: "skills",
    summary: "Leave it, wait at doors, wait at the bowl. Calm gets you things.",
    why: "Impulse control is learned. Your dog figures out that holding back is what gets them the good stuff. These short games teach it with lots of easy wins.",
    gear: ["Treats of two values — a so-so one to resist, a better one to reward"],
    steps: [
      {
        title: "Closed-hand game",
        goal: "Backing off a treat is what earns a treat.",
        do: [
          "Treat in a closed fist at your dog's nose level.",
          "Let them sniff, lick, paw. Say nothing.",
          "The instant they back off: mark, give a treat from your other hand.",
          "Repeat until they back off right away."
        ],
        advance: "Your dog looks away from your fist within 2 seconds.",
        tip: "Never give the treat they were mugging for. The reward comes from somewhere else."
      },
      {
        title: "Open-hand game",
        goal: "Waiting even when the treat is right there.",
        do: [
          "Same game with treats on an open palm.",
          "If they dive in, close your hand. No words.",
          "Backing off or eye contact: mark, reward from your other hand.",
          "Slowly lower your hand toward the floor."
        ],
        advance: "Treats sit on an open palm near the floor and your dog waits."
      },
      {
        title: "Leave it",
        goal: "A cue that means “turn away from that.”",
        do: [
          "Say “leave it” just before presenting your hand.",
          "Move to a treat on the floor — cover it with your foot if needed.",
          "Reward from your hand, never with the item they left.",
          "Work up to toys, then dropped food."
        ],
        advance: "8 of 10 leave-its with an uncovered treat on the floor."
      },
      {
        title: "Wait at the bowl",
        goal: "Calm meals.",
        do: [
          "Lower the bowl slowly. If they dive, lift it back up.",
          "When they hold still, keep lowering.",
          "Bowl on the floor and dog still: release word, let them eat.",
          "Start with a 1-second wait. Build to 5."
        ],
        advance: "Your dog waits for the release with the bowl on the floor."
      },
      {
        title: "Wait at doors",
        goal: "No bolting out the front door or car.",
        do: [
          "Hand on the handle. If they push forward, keep it closed.",
          "Open a crack only when they're still. Close slowly if they surge.",
          "Wide open and still: release word, go through together.",
          "Practice at the front door, car door and crate."
        ],
        advance: "Door wide open, dog waits for the release, 8 of 10.",
        tip: "Door waits are a safety skill. Close the door slowly — never let it bump your dog."
      },
      {
        title: "Leave it in the real world",
        goal: "Ignore litter and dropped food on walks.",
        do: [
          "Start with low-value things: a leaf, a wrapper.",
          "Cue “leave it.” Reward the moment they turn away.",
          "Pass at a distance first, then closer.",
          "Pay well — real-world leave-its are hard."
        ],
        advance: "Reliable leave-it for common litter on walks."
      }
    ],
    mistakes: [
      "Saying “leave it” over and over.",
      "Rewarding with the item they just left.",
      "Practicing when your dog is starving or wound up.",
      "Raising the difficulty too fast."
    ]
  },

  {
    id: "settle",
    title: "Settle on a mat",
    icon: "🛏️",
    category: "skills",
    summary: "A portable off-switch for dinner time, guests, cafés and the vet.",
    why: "Calm is a skill. A mat gives your dog a clear, easy job — lie here and relax — that you can take anywhere.",
    gear: ["A mat, towel or bed you can carry", "Small, low-excitement treats", "A long-lasting chew for later steps"],
    steps: [
      {
        title: "Mat = good place",
        goal: "Your dog wants to be on the mat.",
        do: [
          "Put the mat down. Mark and treat any look or step toward it.",
          "Mark all four paws on it, then toss the next treat off the mat to reset.",
          "No luring — let them figure it out.",
          "5-minute sessions."
        ],
        advance: "Your dog runs onto the mat when you set it down."
      },
      {
        title: "Down on the mat",
        goal: "Mat means lie down.",
        do: [
          "Wait for a down on the mat (or ask once).",
          "Treat between their front paws, calmly.",
          "Release word, toss a treat away to reset.",
          "Add the cue “mat” or “settle.”"
        ],
        advance: "On cue, your dog goes to the mat and lies down."
      },
      {
        title: "Reward relaxing",
        goal: "From lying down to truly relaxed.",
        do: [
          "Drip slow treats every few seconds while they stay down.",
          "Bonus treats for a hip rolled to one side, chin down, or a sigh.",
          "Speak softly. Slow strokes if your dog likes them.",
          "Gradually space the treats out."
        ],
        advance: "Relaxed for 2 minutes with occasional treats."
      },
      {
        title: "Add distance",
        goal: "Settled even when you walk away.",
        do: [
          "Take one step away, come back, treat.",
          "Then two steps. Sit down nearby. Stand up.",
          "Go back to your dog to reward — don't call them off the mat.",
          "Release when you're done."
        ],
        advance: "You walk across the room and back while they stay settled."
      },
      {
        title: "Real life",
        goal: "Settle anywhere.",
        do: [
          "Use the mat at dinner, during TV, when guests arrive.",
          "Bring it to a quiet patio or the vet waiting room.",
          "Add a long-lasting chew for longer settles.",
          "New place? Start back at “Reward relaxing.”"
        ],
        advance: "10 minutes settled in a new place with a chew."
      }
    ],
    mistakes: [
      "Asking for long settles before short ones are solid.",
      "Using the mat as a time-out spot.",
      "Rewards that are too exciting and wind your dog up.",
      "Forgetting the release word."
    ]
  },

  {
    id: "stay",
    title: "Stay",
    icon: "✋",
    category: "skills",
    summary: "Build duration, distance and distraction — one at a time.",
    why: "Stay is three skills: duration, distance and distraction. Train them separately and stay becomes easy. Train them all at once and it falls apart.",
    steps: [
      {
        title: "Duration",
        goal: "Holding a sit or down for longer.",
        do: [
          "Ask for a sit. Count 1 second, mark, treat, release.",
          "Then 2 seconds, then 3. Mix in easy ones.",
          "Deliver the treat while they're still sitting.",
          "Build to 30 seconds."
        ],
        advance: "A 30-second stay, 8 of 10."
      },
      {
        title: "Distance",
        goal: "Holding the stay while you move away.",
        do: [
          "Go back to short durations.",
          "One step away, step back, treat, release.",
          "Add steps slowly. Always walk back to reward.",
          "Build to 15 feet."
        ],
        advance: "15 feet away for 10 seconds."
      },
      {
        title: "Distraction",
        goal: "Holding the stay when life happens.",
        do: [
          "Back to close and short.",
          "Add small distractions: clap, bounce, drop a toy.",
          "Then someone walking by, a door opening.",
          "Build up slowly."
        ],
        advance: "Stay holds through everyday household distractions."
      },
      {
        title: "Put it together",
        goal: "A real-world stay.",
        do: [
          "Combine two of the three, but make each one easier.",
          "Practice in the yard, then on walks.",
          "Always end with the release word.",
          "If they break, make the next rep easier."
        ],
        advance: "A 1-minute stay at 10 feet with mild distractions, outdoors."
      }
    ],
    mistakes: [
      "Raising duration, distance and distraction at the same time.",
      "Calling your dog out of a stay. It blurs stay and come — walk back and release instead.",
      "Repeating “stay, stay, stay.”",
      "Forgetting the release word."
    ]
  },

  {
    id: "dropit",
    title: "Drop it & trading",
    icon: "🔄",
    category: "skills",
    summary: "Your dog gives things up happily — and you prevent guarding.",
    why: "Grabbing things out of a dog's mouth teaches them to run off or guard. Trading teaches that giving something up gets them something better — and often the item back.",
    gear: ["Toys your dog likes", "Treats better than the toy"],
    steps: [
      {
        title: "Trade game with toys",
        goal: "Dropping a toy pays.",
        do: [
          "Play with a toy. Hold a great treat at their nose.",
          "When they drop the toy: mark, give the treat.",
          "Give the toy back. Repeat.",
          "Add the cue “drop” just before showing the treat."
        ],
        advance: "Your dog drops the toy on cue before seeing food, 8 of 10."
      },
      {
        title: "Trade up",
        goal: "Giving things up never feels like losing.",
        do: [
          "Practice with chews they like more.",
          "Always trade for something better.",
          "Give the item back often.",
          "Never chase them for it."
        ],
        advance: "Your dog brings things to you to trade."
      },
      {
        title: "Approach and add",
        goal: "People near food bowls mean more food, not less.",
        do: [
          "While your dog eats or chews, walk past and drop a treat near them.",
          "Keep walking. Repeat on different days.",
          "Never take the bowl away to “prove” anything."
        ],
        advance: "Your dog relaxes or looks up happily as you approach."
      },
      {
        title: "Emergency trade",
        goal: "A plan for when they grab something dangerous.",
        do: [
          "Don't chase.",
          "Scatter a handful of treats on the floor: “find it!”",
          "Calmly pick up the item while they eat.",
          "Then practice the trade game more."
        ],
        advance: "You can use this instantly, without thinking."
      }
    ],
    mistakes: [
      "Prying things out of their mouth.",
      "Punishing a growl — it removes the warning, not the feeling behind it.",
      "Taking the bowl away to show who's boss.",
      "Only trading for things they never get back."
    ],
    help: "Stiffening, freezing, growling or biting over food, toys or spaces is resource guarding. Manage it (don't approach while they have the item) and get help from a certified behavior consultant."
  },

  {
    id: "handling",
    title: "Handling & vet care",
    icon: "🩺",
    category: "care",
    summary: "Nail trims, brushing and vet visits without a wrestling match.",
    why: "Handling is easier when your dog has learned that touch predicts treats — and that they have a say. That makes vet visits safer for everyone.",
    gear: ["Tasty treats or a lick mat with spreadable food", "Nail clippers or grinder, brush"],
    steps: [
      {
        title: "Touch, then treat",
        goal: "Hands on means good things.",
        do: [
          "Touch one paw for 1 second, then treat.",
          "Same for ears, mouth, tail, collar.",
          "5–10 touches per session.",
          "If they pull away, go lighter and shorter."
        ],
        advance: "A relaxed body for 2-second touches everywhere."
      },
      {
        title: "Chin rest",
        goal: "A way for your dog to say “ready” or “not yet.”",
        do: [
          "Teach your dog to rest their chin on your palm or a folded towel.",
          "Reward holding it there for a few seconds.",
          "Chin down = okay to handle. Chin up = pause.",
          "Respect the pause every time."
        ],
        advance: "A 5-second chin rest while you touch a paw."
      },
      {
        title: "Tools appear",
        goal: "Clippers and brushes predict treats.",
        do: [
          "Show the clippers → treat. Put them away.",
          "Touch them to a paw → treat.",
          "Make it boring and predictable."
        ],
        advance: "Your dog looks happy when the clippers come out."
      },
      {
        title: "One nail at a time",
        goal: "Nail trims without fear.",
        do: [
          "Trim one nail, then a big treat. That can be the whole session.",
          "A scratch board can handle front nails for some dogs.",
          "Stop before your dog gets worried."
        ],
        advance: "All nails done calmly over a few sessions."
      },
      {
        title: "Vet practice",
        goal: "Calm at the clinic.",
        do: [
          "Ask if you can stop by the vet's office just for treats.",
          "Practice a gentle hug-style hold at home → treat.",
          "Ask your vet about low-stress handling or medication for big procedures."
        ],
        advance: "Calm walking into the vet's office."
      }
    ],
    mistakes: [
      "Holding your dog down and pushing through fear.",
      "Doing all the nails at once when your dog is scared.",
      "Only touching paws on trim day — handle them often for nothing but treats."
    ]
  },

  /* ───────────── PROBLEM BEHAVIORS ───────────── */

  {
    id: "digging",
    title: "Digging",
    icon: "🕳️",
    category: "problems",
    featured: true,
    summary: "Redirect digging to a spot you choose — no punishment.",
    why: "Digging is normal dog behavior, not spite. Dogs dig to cool off, to chase rodent or grub smells, to bury treasure, to escape, or because they're bored. You won't stop the urge. You'll give it a home and make the wrong spots unavailable.",
    gear: [
      "A dig pit: sandbox, kiddie pool, or a marked-off corner of loose soil",
      "Toys, chews and treats to bury",
      "Pavers or garden fencing to block favorite spots for now"
    ],
    steps: [
      {
        title: "Find the why",
        goal: "Match the fix to the reason.",
        do: [
          "Note where and when your dog digs for a few days.",
          "Shady spots on hot days → cooling off.",
          "Along the fence → escape, or something outside.",
          "One spot, nose down → critters or a smell.",
          "Everywhere, when left alone → boredom or stress."
        ],
        advance: "You can name the main reason.",
        tip: "Most yard diggers are bored or under-exercised. Start there unless the clues say otherwise."
      },
      {
        title: "Meet the need",
        goal: "Take away the reason to dig.",
        do: [
          "Bored: a daily sniff walk and a food puzzle (see Daily needs).",
          "Hot: shade, water, a cooling mat or kiddie pool.",
          "Critters: deal with grubs or moles, or block that area.",
          "Escape: check the fence and see Home alone."
        ],
        advance: "The underlying need is covered most days.",
        tip: "A tired, fulfilled dog digs less before any training starts."
      },
      {
        title: "Build a dig pit",
        goal: "A place where digging is welcome.",
        do: [
          "Fill a sandbox or corner with loose sand or soil — easy digging.",
          "Bury a toy or chew just under the surface while your dog watches.",
          "Encourage them — “dig!” — and celebrate when they find it.",
          "Re-bury a few treasures every day."
        ],
        advance: "Your dog heads to the pit on their own.",
        tip: "Hard, packed soil loses to a soft flowerbed. Make the pit the easiest dig in the yard."
      },
      {
        title: "Manage the yard",
        goal: "No chances to practice digging in the wrong spots.",
        do: [
          "Supervise yard time while you're training.",
          "Cover favorite holes with pavers, or fence those areas off.",
          "Don't leave your dog alone in the yard for long stretches yet.",
          "Bring them in before boredom kicks in."
        ],
        advance: "Unsupervised digging chances are rare.",
        tip: "Every dig in the wrong spot rewards itself. Management stops the practice."
      },
      {
        title: "Interrupt and redirect",
        goal: "Turn digging toward the pit, kindly.",
        do: [
          "Catch them starting to dig the wrong spot.",
          "Cheerful interrupter: kissy noise or “this way!” No scolding.",
          "Jog with them to the pit and dig together.",
          "Mark and reward digging there."
        ],
        advance: "One interrupter turns them toward you, 8 of 10 times.",
        tip: "Teach the interrupter indoors first: kissy noise → treat, until they spin toward the sound."
      },
      {
        title: "Fade the help",
        goal: "Your dog chooses the pit on their own.",
        do: [
          "Bury treasures deeper and less often.",
          "Reward when they pick the pit with no reminder.",
          "Slowly give more unsupervised yard time.",
          "Old spots getting hit again? Go back a step for a week."
        ],
        advance: "A week with no digging outside the pit."
      }
    ],
    mistakes: [
      "Punishing a hole you found later — your dog can't connect it to the digging.",
      "Filling holes with poop, balloons or anything meant to startle or disgust. It's unpleasant for your dog and doesn't teach where digging is okay.",
      "A pit that's boring or hard to dig.",
      "Expecting training to replace exercise and enrichment."
    ],
    help: "Frantic digging at fences or doors while you're away can be anxiety. See Home alone and talk to your vet."
  },

  {
    id: "jumping",
    title: "Jumping on people",
    icon: "🙋",
    category: "problems",
    summary: "Four paws on the floor gets the attention.",
    why: "Dogs jump to get close to faces and get attention — and it usually works, because we look, talk, touch or push. The fix: four paws on the floor gets all the attention, jumping gets none.",
    steps: [
      {
        title: "Manage greetings",
        goal: "Jumping can't happen while you train.",
        do: [
          "Leash, baby gate or crate when guests arrive, for now.",
          "Keep greetings short and calm.",
          "Ask visitors not to greet a jumping dog.",
          "Every successful jump makes the habit stronger."
        ],
        advance: "No jumping practice happens at the door."
      },
      {
        title: "Treats on the floor",
        goal: "Keep heads — and paws — down.",
        do: [
          "As you walk in, drop treats on the floor before they can jump.",
          "Greet calmly while they're eating.",
          "Do this every time you come home."
        ],
        advance: "Your dog stays on the floor when you walk in."
      },
      {
        title: "Sit to say hi",
        goal: "Sitting is how your dog asks for attention.",
        do: [
          "Approach. If your dog sits, greet and treat.",
          "If they jump, calmly turn away or step back. No words.",
          "Four paws on the floor: turn back and greet.",
          "Short reps: approach, retreat, approach."
        ],
        advance: "Your dog sits as people approach, 8 of 10."
      },
      {
        title: "Practice with a helper",
        goal: "Calm greetings with visitors.",
        do: [
          "Ask a friend to practice “Sit to say hi.”",
          "Doorbell, come in, go out, come in again — many short reps.",
          "Treat on the floor or for sitting.",
          "Use the mat or a hand target if needed."
        ],
        advance: "Calm greetings with a familiar visitor."
      },
      {
        title: "Out in the world",
        goal: "Polite greetings with strangers.",
        do: [
          "Ask people to wait until your dog sits.",
          "Too excited? Pass at a distance instead.",
          "A hand target (“touch”) makes a jump-free greeting.",
          "It's fine to tell people “not today, thanks.”"
        ],
        advance: "Calm greetings with new people on walks."
      }
    ],
    mistakes: [
      "Kneeing, pushing or yelling “off.” It's still attention, and kneeing can hurt.",
      "One family member who loves the jumping undoes everyone else's work.",
      "Expecting calm from a dog who's been alone all day — let them out and burn energy first."
    ]
  },

  {
    id: "barking",
    title: "Barking",
    icon: "🔊",
    category: "problems",
    summary: "Figure out which bark you're hearing, then fix that one.",
    why: "Barking is communication. Dogs bark to alert, to ask for things, out of boredom, fear or excitement. The fix depends on which one you're hearing.",
    steps: [
      {
        title: "Name the bark",
        goal: "Know what you're dealing with.",
        do: [
          "For a few days, note what happens right before barking.",
          "At the window or doorbell → alert barking.",
          "Staring at you → demand barking.",
          "Alone, nothing to do → boredom or anxiety.",
          "At dogs or people on walks → see Reactivity."
        ],
        advance: "You know the main type."
      },
      {
        title: "Manage the triggers",
        goal: "Fewer reasons to bark.",
        do: [
          "Window film or closed blinds on busy views.",
          "White noise or music to cover outdoor sounds.",
          "Don't leave your dog in the yard to bark at passersby.",
          "More sniffing and play for bored barkers."
        ],
        advance: "Noticeably fewer triggers each day."
      },
      {
        title: "Thanks, I've got it",
        goal: "Alert barking becomes a quick heads-up.",
        do: [
          "After 1–2 barks, say “thanks!” calmly and walk toward the window.",
          "Call them away, or say “find it” and scatter treats.",
          "Reward them for coming away and staying quiet.",
          "Practice with a doorbell sound at low volume."
        ],
        advance: "Your dog barks once or twice, then comes to you."
      },
      {
        title: "Catch the quiet",
        goal: "Silence pays.",
        do: [
          "The moment barking stops: mark, treat.",
          "Then wait for 2 seconds of quiet, then 5.",
          "Add the cue “quiet” once they stop reliably.",
          "Reward calm silence randomly through the day."
        ],
        advance: "On “quiet,” barking stops within a few seconds."
      },
      {
        title: "Demand barking",
        goal: "Teach a polite way to ask.",
        do: [
          "Don't give in to barking — wait for a pause.",
          "Teach a polite ask: sit or touch.",
          "Meet needs before they ask: play, walks, potty and meals on a schedule.",
          "Expect barking to get louder briefly before it fades. Stay consistent."
        ],
        advance: "Your dog sits to ask instead of barking."
      }
    ],
    mistakes: [
      "Yelling. To your dog, it sounds like you're barking too.",
      "Bark collars of any kind — shock, spray or sound. They punish communication and can make fear worse.",
      "Giving in after a long burst. That teaches longer bursts.",
      "Treating fear barking like rudeness. That needs the Reactivity or Noise programs."
    ]
  },

  {
    id: "reactivity",
    title: "Leash reactivity",
    icon: "🐕",
    category: "problems",
    summary: "Lunging and barking at dogs, people or bikes on walks.",
    why: "Lunging and barking on leash usually comes from fear, frustration or over-excitement. Punishing it hides the warning without changing the feeling. This program changes how your dog feels about the trigger, starting from a safe distance.",
    gear: ["Harness and 6 ft leash", "Your dog's favorite treats", "Quiet places with long sight lines: empty parking lots, wide parks"],
    steps: [
      {
        title: "Find the threshold",
        goal: "Know the distance where learning is possible.",
        do: [
          "Notice where your dog sees a trigger but can still eat and respond.",
          "Closer than that = over threshold. No learning happens there.",
          "Note it separately for dogs, people, bikes, etc.",
          "Train at or beyond that distance."
        ],
        advance: "You know your dog's working distance."
      },
      {
        title: "Emergency U-turn",
        goal: "A fast, happy exit.",
        do: [
          "At home: say “let's go!”, turn and jog away, treat when they follow.",
          "Practice until it's automatic.",
          "On walks, use it the moment a trigger is too close.",
          "Cross the street, step behind a car — distance is your friend."
        ],
        advance: "Instant, happy U-turns on cue."
      },
      {
        title: "See it, get treats",
        goal: "Triggers start to predict good things.",
        do: [
          "At working distance: your dog looks at the trigger → mark → treat.",
          "Every look = treat. Trigger appears = treats start.",
          "Trigger leaves = treats stop.",
          "Short sessions. Leave before your dog gets stressed."
        ],
        advance: "Your dog looks at a trigger, then turns to you for the treat."
      },
      {
        title: "Look away on their own",
        goal: "Calm choice instead of fixation.",
        do: [
          "Now wait a second after they look at the trigger.",
          "When they look away on their own: mark, treat.",
          "If they can't look away, you're too close — back up.",
          "Calm and choice are the goal."
        ],
        advance: "Your dog glances at triggers and turns back to you without prompting."
      },
      {
        title: "Close the distance slowly",
        goal: "Calm at shorter distances over time.",
        do: [
          "Move a little closer only after a few good sessions.",
          "Bad day? Back up. Progress isn't a straight line.",
          "After a big reaction, give a few quiet days — stress takes time to fade.",
          "Quiet sniff walks count as training too."
        ],
        advance: "Calm at a shorter distance than when you started."
      }
    ],
    mistakes: [
      "Getting too close too fast.",
      "Leash pops, prong or shock collars. They suppress warning signals and can make reactivity worse.",
      "Forcing greetings with other dogs.",
      "Expecting a reactive dog to enjoy busy places. Many never will — and that's okay."
    ],
    help: "Any bite or snap, or reactivity that's getting worse: see your vet first (pain is a common cause), then a certified behavior consultant or veterinary behaviorist."
  },

  {
    id: "alone",
    title: "Home alone",
    icon: "🏠",
    category: "problems",
    summary: "Separation basics: tell boredom from panic, and build calm alone time slowly.",
    why: "Some dogs are bored when left alone; others panic. Real separation anxiety is fear — punishment makes it worse, and it improves with very gradual practice. This covers the basics. Moderate to severe cases need a professional.",
    gear: ["A camera to watch your dog (an old phone on a video call works)"],
    steps: [
      {
        title: "Film it",
        goal: "Find out what's actually happening.",
        do: [
          "Record your dog the next time you leave for 10–20 minutes.",
          "Panic: pacing, howling, drooling, scratching at doors, accidents.",
          "Boredom: chewing toys, napping between bursts.",
          "Note how quickly any distress starts."
        ],
        advance: "You know if it's boredom or distress, and how long your dog stays calm."
      },
      {
        title: "Avoid panic absences",
        goal: "Stop the fear from being practiced.",
        do: [
          "While training, avoid leaving your dog longer than they can handle.",
          "Use sitters, daycare, friends, or take them along.",
          "Every panic episode undoes progress.",
          "This is the hardest step — and the most important."
        ],
        advance: "Absences past your dog's limit are rare."
      },
      {
        title: "Defuse departure cues",
        goal: "Keys and shoes stop meaning “I'm leaving.”",
        do: [
          "Pick up keys, put on shoes, grab your bag — then sit back down.",
          "Repeat randomly through the day.",
          "Keep it boring. No big goodbyes.",
          "Watch for your dog caring less each time."
        ],
        advance: "Your dog barely reacts when you pick up your keys."
      },
      {
        title: "Tiny absences",
        goal: "Short absences your dog can handle easily.",
        do: [
          "Step out and back in before any stress — even 2 seconds.",
          "Build slowly and mix it up: 3s, 5s, 2s, 8s, 10s.",
          "Watch the camera. Any distress = too long. Drop back.",
          "One session a day is enough."
        ],
        advance: "Relaxed for 5 minutes alone."
      },
      {
        title: "Build duration",
        goal: "Longer calm alone time.",
        do: [
          "Add time gradually and vary it: 5, 7, 4, 10 minutes.",
          "Calm returns. Say hi quietly — no big reunion.",
          "A long-lasting chew can help, if your dog eats it while you're gone.",
          "Check the camera every time."
        ],
        advance: "30 calm minutes alone. Keep building from there."
      }
    ],
    mistakes: [
      "Crating a panicking dog — they can injure themselves trying to escape.",
      "Punishing accidents or damage. It's fear, not spite.",
      "Adding time too fast.",
      "Getting a second dog as a cure. It rarely fixes true separation anxiety."
    ],
    help: "Moderate or severe distress: talk to your vet (medication can help a lot), and look for a Certified Separation Anxiety Trainer (CSAT) or a veterinary behaviorist."
  },

  {
    id: "chewing",
    title: "Chewing & stealing",
    icon: "🧦",
    category: "problems",
    summary: "Shoes, socks, counters. Give chewing a legal outlet and make stealing pointless.",
    why: "Chewing is a need, and stealing pays — food on a counter is a jackpot. Give chewing a legal outlet, prevent the jackpots, and teach a better place to be.",
    steps: [
      {
        title: "Manage",
        goal: "Nothing worth stealing.",
        do: [
          "Keep counters and floors clear for now.",
          "Shoes, socks, remotes: put away or behind gates.",
          "Supervise or confine when you can't watch.",
          "Every successful steal makes the habit stronger."
        ],
        advance: "Your home offers little to steal."
      },
      {
        title: "Legal chews",
        goal: "Your dog's own stuff is the best stuff.",
        do: [
          "Offer 2–3 kinds of chews: hard, soft, edible.",
          "Rotate them so they stay new.",
          "Praise and reward when they pick a chew.",
          "One quiet chew session every day."
        ],
        advance: "Your dog reaches for their own things when bored."
      },
      {
        title: "Trade, don't chase",
        goal: "Stolen items get handed over.",
        do: [
          "Caught them with a sock? Offer a trade (see Drop it).",
          "Stay calm — no chase game.",
          "Hand them a legal chew afterward.",
          "Put the item away and tighten management."
        ],
        advance: "Your dog brings stolen items to you for a trade."
      },
      {
        title: "Four paws in the kitchen",
        goal: "Counters stop being interesting.",
        do: [
          "While cooking, reward four paws on the floor.",
          "Or send them to their mat and drip treats.",
          "Never feed from the counter or table.",
          "Paws up? Calmly say their name and reward floor time."
        ],
        advance: "Your dog hangs out on the floor or mat while you cook."
      }
    ],
    mistakes: [
      "Chasing — it turns stealing into a great game.",
      "Punishing after the fact.",
      "Leaving food on counters “to test them.”",
      "Too few chew options for a young or energetic dog."
    ]
  },

  {
    id: "mouthing",
    title: "Mouthing & nipping",
    icon: "🦷",
    category: "problems",
    summary: "Teeth on toys, not on people.",
    why: "Mouthy dogs are usually over-excited, overtired, or playing the only way they know. Teach that teeth on skin pauses the fun, and give them better things to bite.",
    steps: [
      {
        title: "Toys, not hands",
        goal: "Play happens with toys.",
        do: [
          "Keep a tug toy handy. Play with toys, never hands.",
          "Mouth on the toy = game continues.",
          "Offer the toy before they get mouthy."
        ],
        advance: "Your dog grabs the toy instead of your hand."
      },
      {
        title: "Teeth on skin = pause",
        goal: "Mouthing ends the fun, calmly.",
        do: [
          "Teeth touch skin: say “oops,” go still for a few seconds.",
          "Then restart play with a toy.",
          "Keeps happening? Calmly step behind a gate for 30 seconds."
        ],
        advance: "Mouthing drops off within a few play sessions."
      },
      {
        title: "Calm alternatives",
        goal: "Better ways to wind down.",
        do: [
          "Reward a hand target instead of mouthing.",
          "Settle on a mat after play.",
          "A chew or lick mat to wind down."
        ],
        advance: "Your dog settles after play instead of nipping."
      },
      {
        title: "Check the basics",
        goal: "Fix what's driving it.",
        do: [
          "Overtired? Many mouthy dogs need a nap.",
          "Under-exercised? More sniffing and play.",
          "Mouthing during handling? See Handling & vet care."
        ],
        advance: "The usual triggers for mouthing are covered."
      }
    ],
    mistakes: [
      "Rough play with hands.",
      "Holding the mouth shut, swatting, or yelling.",
      "Long, wild play sessions with no breaks."
    ],
    help: "Hard bites, or mouthing that comes with stiffening or growling, isn't play. Get help from a certified behavior consultant."
  },

  /* ───────────── HOME & CARE ───────────── */

  {
    id: "housetraining",
    title: "House training",
    icon: "🚪",
    category: "care",
    summary: "For new adult dogs, rescues and dogs who've started having accidents.",
    why: "Adult dogs can lose — or never fully learn — house training, especially after a move, an adoption or a schedule change. Rule out medical causes first, then go back to basics: schedule, supervision and great rewards outside.",
    gear: ["Enzyme cleaner (not ammonia-based)", "Treats by the back door"],
    steps: [
      {
        title: "Vet check",
        goal: "Rule out a medical cause.",
        do: [
          "Sudden accidents in a trained dog? See your vet first.",
          "Infections, kidney problems and aging can all cause accidents."
        ],
        advance: "Medical causes ruled out."
      },
      {
        title: "Schedule",
        goal: "Predictable potty trips.",
        do: [
          "Go out after waking, eating, playing — and every 2–3 hours.",
          "Same door, same spot, a cue like “go potty.”",
          "Feed meals on a schedule."
        ],
        advance: "Most potty trips happen on schedule."
      },
      {
        title: "Reward outside, right away",
        goal: "Going outside is the best deal around.",
        do: [
          "Go out with them — don't just open the door.",
          "The second they finish: mark, treat, praise.",
          "Then a short sniff or play as a bonus.",
          "Reward outside, not back at the door."
        ],
        advance: "Your dog goes quickly on cue outside."
      },
      {
        title: "Supervise or confine",
        goal: "No chances for accidents.",
        do: [
          "Indoors, keep them in sight — or on a leash attached to you.",
          "Can't watch? Crate, pen or a small room.",
          "Sniffing, circling or wandering off = go out now.",
          "An accident means supervision slipped, not that your dog is bad."
        ],
        advance: "Two weeks with no accidents indoors."
      },
      {
        title: "Clean up and add freedom slowly",
        goal: "Full house access, earned.",
        do: [
          "Clean accidents with enzyme cleaner. Regular cleaners leave odor behind.",
          "Never scold or rub their nose in it.",
          "Add one room of freedom at a time.",
          "Accident? Go back a step."
        ],
        advance: "A month accident-free with full house access."
      }
    ],
    mistakes: [
      "Punishing accidents — dogs learn to hide when they go.",
      "Ammonia cleaners, which smell like urine to dogs.",
      "Too much freedom too soon."
    ]
  },

  {
    id: "crate",
    title: "Crate & rest space",
    icon: "📦",
    category: "care",
    summary: "A safe den for naps, travel and recovery — never a punishment.",
    why: "A crate can be a safe den, a travel spot and a recovery space after surgery. It should never be a punishment, and it's not the answer for a dog who panics when alone.",
    steps: [
      {
        title: "Crate = great",
        goal: "Your dog chooses to go in.",
        do: [
          "Door open. Toss treats inside; let them wander in and out.",
          "Feed meals near the crate, then inside it.",
          "Add a comfy bed."
        ],
        advance: "Your dog walks in on their own."
      },
      {
        title: "Door closed, briefly",
        goal: "A closed door is no big deal.",
        do: [
          "While they eat inside, close the door for a few seconds.",
          "Open it before they finish.",
          "Build to a few minutes with a chew."
        ],
        advance: "Calm for 5 minutes with the door closed."
      },
      {
        title: "Move around",
        goal: "Calm while you come and go.",
        do: [
          "Close the door, walk around the room, come back.",
          "Leave the room for a few seconds, then return.",
          "Return calmly. Let them out with your release word."
        ],
        advance: "Calm for 20 minutes with you out of sight."
      },
      {
        title: "Daily life",
        goal: "The crate is part of a good routine.",
        do: [
          "Use it for naps, quiet time and car rides.",
          "Exercise and a potty break before crate time.",
          "Keep crate time reasonable for your dog's age and needs."
        ],
        advance: "Your dog naps in the crate by choice."
      }
    ],
    mistakes: [
      "Using the crate as punishment.",
      "Long crate days without exercise.",
      "Crating a dog who panics — see Home alone.",
      "Opening the door mid-bark. Wait for a quiet moment, and make the next session shorter."
    ]
  },

  {
    id: "noise",
    title: "Noise & fear",
    icon: "🎆",
    category: "care",
    summary: "Fireworks, thunder, trucks. Comfort is okay — and fear can improve.",
    why: "Fear of fireworks, thunder or loud trucks is common and real. You can't reinforce fear by comforting your dog, so comfort them. Then build tolerance on calm days, long before the next scary event.",
    gear: ["A quiet, covered den spot", "White noise or music", "Recordings of the scary sound"],
    steps: [
      {
        title: "Safe den",
        goal: "A place your dog goes to feel safe.",
        do: [
          "Set up a quiet, covered spot in an inner room.",
          "Bedding, water, a chew, white noise.",
          "Let your dog choose it. Never force them in."
        ],
        advance: "Your dog uses the spot on their own."
      },
      {
        title: "Plan for scary nights",
        goal: "Get through the event with less fear.",
        do: [
          "Close windows and curtains. Turn on music or white noise.",
          "Stay with them. Comfort is okay.",
          "Offer great food or a lick mat if they'll take it.",
          "Potty on leash before fireworks start — scared dogs bolt."
        ],
        advance: "You have a plan ready before the next storm or holiday."
      },
      {
        title: "Sound practice on calm days",
        goal: "Slowly change how the sound feels.",
        do: [
          "Play a recording so quietly they barely notice.",
          "Sound plays → treats flow. Sound stops → treats stop.",
          "Raise the volume very slowly over many sessions.",
          "Any worry? Turn it down and go slower."
        ],
        advance: "Your dog stays relaxed — or looks for treats — at moderate volume."
      },
      {
        title: "Talk to your vet",
        goal: "Don't let a dog suffer through severe fear.",
        do: [
          "Shaking, hiding or escape attempts are serious.",
          "Vets have safe, effective medication for noise fear.",
          "Plan ahead of known fireworks dates."
        ],
        advance: "You have a vet plan if your dog needs one."
      }
    ],
    mistakes: [
      "Punishing fear responses.",
      "Taking a scared dog to fireworks to “get used to it.”",
      "Playing recordings too loud, too fast.",
      "Leaving a noise-scared dog in the yard on fireworks nights."
    ]
  }

];
