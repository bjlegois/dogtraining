# OpenLeash

Free, reward-based dog training in your pocket. Step-by-step programs, a clicker, a whistle and a training log — no account, no paywall, no ads, no tracking.

**Live app:** https://bjlegois.github.io/dogtraining/ (once GitHub Pages is turned on — see below)

## What's in it

- **19 training programs** (98 steps) — recall, digging, loose-leash walking, impulse control, settle, stay, drop it, jumping, barking, leash reactivity, home alone, chewing, mouthing, house training, crate, handling & vet care, noise fear, daily needs, and foundations.
- **7 guides** — how training works, rewards, reading your dog, using the tools, when to get help, troubleshooting, and the reward-based promise.
- **Clicker** — fires on touch-down (no release delay), screen stays awake during sessions.
- **Whistle** — audible 3–6 kHz tone, pip-pip-pip / long blast / hold. Phones can't play ultrasonic "silent" whistles, so it doesn't pretend to.
- **Session log** — streak, last-7-days, 5-week calendar, history with notes.
- **Daily reminder** — added to your own calendar (Apple, Outlook or Google). Websites can't send notifications without a server, and this app has none.
- **Works offline** after the first visit. Add it to your Home Screen.
- **Backup / restore** as a JSON file.

Three taps to train: open the app → **Start training** → you're in the session.

## Editing training content

Everything a trainer would want to change lives in two files — no layout code involved:

- `content/programs.js` — programs and steps (schema documented at the top of the file)
- `content/guides.js` — the guide pages

Rules for content: reward-based only, and keep each `do` bullet short (it's read mid-session, one-handed). Add a `demo: "https://…"` link to a step only when text isn't enough.

Don't rename a program's `id` after people have used it — saved progress is keyed to it.

## How updates reach phones

The service worker (`sw.js`) serves the cached app instantly and fetches updates in the background, so after you push a change it appears the **next** time the app is opened. If you rename or delete files, bump `CACHE` in `sw.js`.

## Turning on GitHub Pages

1. Repo **Settings → General → Danger Zone → Change visibility → Public** (Pages on a private repo needs a paid GitHub plan).
2. **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.**
3. Wait a minute, then open https://bjlegois.github.io/dogtraining/

## Local testing

```
python3 -m http.server 8000
```

Then open http://localhost:8000. No build step, no dependencies.

## Data & privacy

All data stays in the browser's `localStorage` (key `openleash.v1`) on the device. Nothing is sent anywhere. On iPhone, install to the Home Screen — Safari can clear website data after 7 days without a visit, but Home Screen apps are exempt.
