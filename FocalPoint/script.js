// FocalPoint — navigation & rendering

(function () {
  const screens = document.querySelectorAll(".screen");
  const trailDots = document.querySelectorAll(".trail-dot");
  const peopleGrid = document.getElementById("peopleGrid");
  const resultTitle = document.getElementById("resultTitle");
  const resultBack = document.getElementById("resultBack");

  let lastTeamScreen = "employment-type"; // where "back" from results should go

  function showScreen(name) {
    screens.forEach((s) => {
      s.classList.toggle("is-active", s.dataset.screen === name);
    });

    const active = document.querySelector(`.screen[data-screen="${name}"]`);
    const step = active ? Number(active.dataset.step) : 1;
    trailDots.forEach((dot) => {
      const dStep = Number(dot.dataset.step);
      dot.classList.toggle("is-done", dStep < step);
      dot.classList.toggle("is-current", dStep === step);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPeople(teamKey) {
    const team = FOCAL_DATA[teamKey];
    if (!team) return;

    resultTitle.textContent = team.title;
    peopleGrid.innerHTML = "";

    team.people.forEach((person) => {
      const card = document.createElement("article");
      card.className = "person-card";
      card.innerHTML = `
        <h3 class="person-card__name">${person.name}</h3>
        <p class="person-card__label">Contact details</p>
        <p class="person-card__row">${person.phone}</p>
        <p class="person-card__row">${person.email}</p>
        <p class="person-card__handles"><strong>Handles:</strong> ${person.handles}</p>
      `;
      peopleGrid.appendChild(card);
    });
  }

  // Generic nav buttons (data-nav, optional data-team)
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.nav;
      const team = el.dataset.team;

      if (target === "result" && team) {
        // remember which team-select screen we came from, for the back button
        const parentScreen = el.closest(".screen");
        if (parentScreen) lastTeamScreen = parentScreen.dataset.screen;
        renderPeople(team);
      }

      showScreen(target);
    });
  });

  resultBack.addEventListener("click", () => {
    showScreen(lastTeamScreen);
  });

  showScreen("home");
})();
