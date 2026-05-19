const skills = [
  {
    name: "Maya Chen",
    initials: "MC",
    color: "#49a078",
    title: "Conversational Spanish",
    description: "30-minute conversation practice for beginners who want practical travel and work phrases.",
    price: 38,
    proof: "AI video verified",
    category: "life",
    tags: ["Spanish", "Weeknights", "30 min"],
  },
  {
    name: "Eli Brooks",
    initials: "EB",
    color: "#406c9b",
    title: "Guitar fundamentals",
    description: "A compact guitar lesson with chords, rhythm, and a practice plan for starting from zero.",
    price: 44,
    proof: "Portfolio verified",
    category: "creative",
    tags: ["Music", "Weekend", "45 min"],
  },
  {
    name: "Nia Patel",
    initials: "NP",
    color: "#d99a31",
    title: "Portfolio review",
    description: "Design critique, case study structure, and sharper project storytelling.",
    price: 52,
    proof: "AI rubric verified",
    category: "creative",
    tags: ["Design", "Remote", "Critique"],
  },
  {
    name: "Owen Reed",
    initials: "OR",
    color: "#e46f5f",
    title: "Intro to Python",
    description: "Friendly coding help for automations, scripts, and first programming projects.",
    price: 60,
    proof: "Code sample verified",
    category: "tech",
    tags: ["Coding", "Python", "Remote"],
  },
  {
    name: "Sam Rivera",
    initials: "SR",
    color: "#7d5ba6",
    title: "Yoga mobility session",
    description: "Low-pressure stretching and posture work for desk-heavy weeks.",
    price: 35,
    proof: "Video verified",
    category: "wellness",
    tags: ["Wellness", "Morning", "45 min"],
  },
  {
    name: "Ari Lewis",
    initials: "AL",
    color: "#2f7f8f",
    title: "Home coffee basics",
    description: "Dial in your beans, grinder, and brewing routine without fancy equipment.",
    price: 28,
    proof: "Community endorsed",
    category: "life",
    tags: ["Coffee", "Hands-on", "Local"],
  },
  {
    name: "June Park",
    initials: "JP",
    color: "#b45f4d",
    title: "Logo tweak sprint",
    description: "A fast polish pass on spacing, color, and export formats for an existing logo.",
    price: 48,
    proof: "Portfolio verified",
    category: "creative",
    tags: ["Logo", "Branding", "30 min"],
  },
];

const grid = document.querySelector("#skillGrid");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const filters = document.querySelectorAll(".filter");
const requestDialog = document.querySelector("#requestDialog");
const createDialog = document.querySelector("#createDialog");
const dialogText = document.querySelector("#dialogText");
const providerAmount = document.querySelector("#providerAmount");
const feeAmount = document.querySelector("#feeAmount");
const totalAmount = document.querySelector("#totalAmount");
let activeFilter = "all";
const transactionFeeRate = 0.1;

function renderSkills() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = skills
    .map((skill, originalIndex) => ({ ...skill, originalIndex }))
    .filter((skill) => {
      const text = `${skill.name} ${skill.title} ${skill.description} ${skill.wants} ${skill.tags.join(" ")}`.toLowerCase();
      const matchesSearch = !query || text.includes(query);
      const matchesFilter = activeFilter === "all" || skill.category === activeFilter;
      return matchesSearch && matchesFilter;
    });

  resultCount.textContent = `${visible.length} available`;
  grid.innerHTML = visible
    .map(
      (skill) => `
        <article class="skill-card">
          <div class="skill-top">
            <div class="skill-avatar" style="background:${skill.color}">${skill.initials}</div>
            <div>
              <h3>${skill.title}</h3>
              <p>${skill.name} charges ${skill.price} Skillcoins.</p>
            </div>
          </div>
          <p>${skill.description}</p>
          <div class="card-meta">
            <span class="coin-pill">◈ ${skill.price}</span>
            <span class="proof-pill">${skill.proof}</span>
          </div>
          <div class="tags">
            ${skill.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="card-actions">
            <button class="secondary-action" type="button" data-request="${skill.originalIndex}">Book skill</button>
            <button class="secondary-action" type="button">Save</button>
          </div>
        </article>
      `
    )
    .join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderSkills();
  });
});

searchInput.addEventListener("input", renderSkills);

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-request]");
  if (!button) return;
  const skill = skills[Number(button.dataset.request)];
  const fee = Math.ceil(skill.price * transactionFeeRate);
  const total = skill.price + fee;
  dialogText.textContent = `Book ${skill.name}'s ${skill.title.toLowerCase()} for ${total} Skillcoins total. AI verification: ${skill.proof}.`;
  providerAmount.textContent = `${skill.price} Skillcoins`;
  feeAmount.textContent = `${fee} Skillcoins`;
  totalAmount.textContent = `${total} Skillcoins`;
  requestDialog.showModal();
});

document.querySelector("#openCreate").addEventListener("click", () => {
  createDialog.showModal();
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

renderSkills();
