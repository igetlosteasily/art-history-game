# Field Notes

A running log of what changed in the app and why, written for Chase. Newest entries at the top. Claude Code adds an entry after every meaningful change, using the template at the bottom of this file.

---

## October 24, 2026: Fast images for phones

**What changed:** a new command, `npm run images`, makes small web copies of every painting. Your originals total about 17 MB, and The Harvester alone is 4 MB, which means seconds of waiting per painting on a phone. The web copies are WebP files in two sizes. Phones usually download a copy around 100 to 200 KB.

**Where it lives:**
- `scripts/optimize-images.mjs`: the script. It reads `paintings.js`, so it knows every painting and its id.
- `public/images/web/`: the copies it writes, named by id (`olympia-800.webp`, `olympia-1600.webp`). Your originals in `public/images/` are never changed.
- `src/data/imageSizes.json`: the real width and height of each copy, written by the script. Never edit it by hand.
- `src/lib/images.js`: one helper that turns a painting into everything an image tag needs.
- `src/lib/images.test.js`: fails if a painting has no web copies, and says to run `npm run images`.

**Why the code is shaped this way:** web pages use a feature called `srcset`, a list of the same image at different sizes. The browser looks at the screen and downloads only the copy it needs. The page also has to know each image's shape *before* it arrives, or the text below would jump down when the picture loads. That is why the script records every size in a file the app reads.

We chose WebP over the newer AVIF format after testing both. AVIF files were about 40% smaller, but at that size they smoothed away visible brushstrokes. For a tool about looking closely at paintings, the brushwork matters more than the bytes.

**The design rhetoric:** speed is part of respect for the work. A painting that arrives in pieces, or pushes the page around as it loads, interrupts the moment of looking before it starts.

**Words to know:**
- **Compression:** storing an image in fewer bytes by discarding detail the eye won't miss. "Quality 80" is how much to keep.
- **Layout shift:** content jumping on the page while it loads. Reserving the image's shape in advance prevents it.

**Try it yourself:** run `npm run images` and read what it prints: how many paintings, the total size, and any warnings. Then look in `public/images/web/` to see the files it made.

**To verify (Chase):** three originals are small enough to look soft on a laptop: The Swing (500 pixels wide), The Secret Meeting (597), and Stack of Wheat (843). If you can find larger versions (museum websites often offer free high-resolution downloads), replace the files in `public/images/` with the same names and run `npm run images`.

---

## October 24, 2026: The collection gets a proper catalogue

**What changed:** your painting list moved to `src/data/paintings.js` and each entry grew from four facts to a full catalogue record: the artist's full and last name, year, medium, other titles students might fairly use, and a description of the image for blind and low-vision students. The five movements got a file of their own. A handful of typos in the descriptions were fixed (listed below).

**Where it lives:**
- `src/data/paintings.js`: the 32 works. The comment at the top explains every field and how to add a painting.
- `src/data/movements.js`: the five movements, the spellings that count as correct ("romanticism" counts for Romantic), and each movement's colors and era light.
- `src/data/paintings.test.js`: 168 automatic checks on the two files.

**Why the code is shaped this way:** in the original, each painting said `movement: "Romantic"` in plain words. One stray letter ("Romantc") would quietly create a movement no student could ever pick. Now each painting points to a movement by its `id`, the movement's name is written once in `movements.js`, and a test fails loudly if a painting points at a movement that doesn't exist. This is a common pattern: write each fact in one place, and have everything else refer to it.

The accepted-answer lists only hold *alternatives* (a French title, a shorter form). The title and artist name themselves always count, so they are never written twice and can never disagree.

**Words to know:**
- **id (identifier):** a short, unique, never-changing name for a record, like a museum accession number. `the-raft-of-the-medusa` stays the same even if the display title is corrected.
- **Alt text:** a written description of an image that screen readers speak aloud. A test makes sure no alt text names a movement, because it is read before the student answers.

**Try it yourself:** in `paintings.js`, change one painting's `movement: 'realist'` to `movement: 'realism'` and run `npm run test`. The test names the painting and says it isn't filed under a real movement. Change it back.

**To verify (Chase):**

Typos fixed in your descriptions: "anticpating" and "patriotisim" (Boilly), "artistocratic" (The Secret Meeting), "Bourgeoisie" used as an adjective (now "bourgeois"), "Katz & Dars book" (now "Katz and Dars' book"), a double space (Morisot), and "Dupre" (now "Dupré"). The Daumier quotation had an opening mark but no closing one; it is now closed, and its "---" became a comma. If the source uses a dash there, tell us and we'll restore it.

Questions:
- **The Harvester:** we couldn't find a date, so the label leaves the year out for now. The image is also a photograph of the painting in its gold frame, taken at a slight angle; a straight-on image without the frame would match the rest of the collection.
- **Monet Painting:** your description says Monet is "at work in his garden". The Tate's title is *Claude Monet Painting by the Edge of a Wood*. Should the description say "at the edge of a wood"?
- **Kauffmann:** you spell her name Kauffmann; many museums use Kauffman. Both are accepted. Which should the label show?
- **Titles:** your titles are kept exactly. Museum titles and French originals were added only as alternatives students may type.

Drafted facts to check (artist full names, years, and media are all marked `// VERIFY` in the file; every medium is drafted as "Oil on canvas"):

| Painting | Artist | Year |
| --- | --- | --- |
| The Swing | Jean-Honoré Fragonard | 1767 |
| Oath of the Horatii | Jacques-Louis David | 1784 |
| Liberty Leading the People | Eugène Delacroix | 1830 |
| The Stonebreakers | Gustave Courbet | 1849 |
| A Burial at Ornans | Gustave Courbet | 1849 to 1850 |
| The Third of May 1808 | Francisco Goya | 1814 |
| The Death of Marat | Jacques-Louis David | 1793 |
| Impression, Sunrise | Claude Monet | 1872 |
| The Secret Meeting | Jean-Honoré Fragonard | 1771 to 1773 |
| The Death of Socrates | Jacques-Louis David | 1787 |
| The Raft of the Medusa | Théodore Géricault | 1818 to 1819 |
| Dance at Le Moulin de la Galette | Pierre-Auguste Renoir | 1876 |
| Summertime | Mary Cassatt | 1894 |
| Boulevard des Capucines | Claude Monet | 1873 to 1874 |
| The Gleaners | Jean-François Millet | 1857 |
| Wanderer above the Sea of Fog | Caspar David Friedrich | c. 1818 |
| Olympia | Édouard Manet | 1863 |
| The Luncheon on the Grass | Édouard Manet | 1863 |
| The Third Class Carriage | Honoré Daumier | c. 1862 to 1864 |
| The Barricade (Memory of Civil War) | Ernest Meissonier | 1849 |
| What is Called Vagrancy | Alfred Stevens | c. 1854 |
| The Harvester | Julien Dupré | not yet found |
| Simon Chenard as a Sans-culotte | Louis-Léopold Boilly | 1792 |
| Cornelia Pointing to her Children as Treasures | Angelica Kauffmann | c. 1785 |
| Monet Painting | John Singer Sargent | c. 1885 |
| The Child's Bath | Mary Cassatt | 1893 |
| Regatta at Argenteuil | Claude Monet | 1872 |
| Stack of Wheat (Snow Effect, Overcast Day) | Claude Monet | 1890 to 1891 |
| The Boating Party | Mary Cassatt | 1893 to 1894 |
| Summer's Day | Berthe Morisot | 1879 |
| A Bar at the Folies-Bergère | Édouard Manet | 1882 |
| The Nightmare | Henry Fuseli | 1781 |

---

## October 24, 2026: A branch for the rebuild, and the first automatic tests

**What changed:** the rebuild now has its own line of work, the `study-redesign` branch, so the original game on `main` stays exactly as you left it. We also installed Vitest, a tool that runs small checking programs called tests, and wrote the first set: they check your painting data every time anyone runs `npm run test`.

**Where it lives:**
- `package.json`: two new commands. `npm run test` runs every test once and reports; `npm run test:watch` keeps running and re-checks every time a file is saved.
- `src/paintings.test.js`: the checks themselves. For every painting, it confirms the title, movement, image, and explanation are filled in, that the movement is one of the five exam movements spelled exactly right, and that the image file really exists in `public/images/`. It also checks no painting is listed twice and every movement has at least one painting.

**Why the code is shaped this way:** a test sits next to the file it checks and has the same name plus `.test.js`, so "where are the checks for this?" always has one obvious answer. We started with the data, not the game rules, because the data is the part you edit most and a mistake there fails silently: a painting filed under "Impressionism" instead of "Impressionist" would not crash anything, it would just form a sixth bin that no student could ever answer correctly. The next tests (fair round dealing, grading typed answers) arrive with the code they check in M1 and M3.

**Words to know:**
- **Branch:** a separate copy of the project's history where work can happen without disturbing the main version. When the work is ready, it is merged back.
- **Test:** a small program that checks another program's behavior and says pass or fail. 99 passing tests here means 99 separate facts about your data were confirmed.

**Try it yourself:** in `src/paintings.js`, change one painting's movement from `"Realist"` to `"Realism"`, then run `npm run test`. One test fails and names the painting. Change it back and run the tests again to see them all pass.

---

## October 24, 2026: Why we are rebuilding, and how the design was decided

**What happened:** before writing any code, we played the original game, read its code, and tested it on a phone. Then we designed four visual directions as clickable mockups (Museum Wall, Salon, Exhibition Catalogue, and a modern Museum Wall), chose the modern Museum Wall, and designed a Challenge version for the arcade proposal.

**Why rebuild instead of patch:** the original is a single file mixing data, rules, layout, and styling. Its main problems (scores that can be replayed, no phone support, uneven rounds) come from its structure, not from typos. A rebuild keeps everything valuable (the 32 paintings and your descriptions) and changes the structure underneath. See `ARCHITECTURE.md`.

**The design rhetoric, in one paragraph:** the interface borrows the language of a gallery. Warm walls so paintings read truthfully. Light from above, so the eye goes to the work first. Wall labels in a consistent typographic hierarchy (italic title, artist, date). A single gold accent that always marks the next place to look, the way a painter places the brightest highlight at the focal point. And after each answer, a quiet second lesson: the light and an accent color shift toward the movement's own palette. Full reasoning is in `DESIGN.md`.

**Words to know:**
- **Mockup:** a realistic model of a screen used to make design decisions before building the real thing.
- **Prototype:** a mockup you can interact with.
- **Design token:** a named value (like `--gold`) used everywhere instead of repeating the raw color. Change it once, it changes everywhere.

**Try it yourself:** open the mockups (see `docs/mockups/README.md`) and click through Sort. Notice the order things appear in. Which did your eye go to first, second, third?

---

## Entry template

```
## [Date]: [Short title of the change]

**What changed:** one or two sentences a non-programmer can follow.

**Where it lives:** the files touched, each with a few words on its role.

**Why the code is shaped this way:** the architectural reasoning. Why here and not somewhere else? What would break or get harder if we did it differently?

**The design rhetoric:** (for visual changes) what the choice communicates and how it guides attention.

**Words to know:** one or two terms, each with a one-line definition.

**Try it yourself:** a small, safe experiment: change a token, a timing, a line of copy, or add a painting, and what to look for.

**To verify (Chase):** any facts or content decisions that need your eyes. Optional.
```
