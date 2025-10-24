document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById("faq-container");

  fetch("faq.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((section, index) => {
        const sectionElement = document.createElement("section");
        sectionElement.id = section.id;
        sectionElement.className = `section bg${index}`;

        const container = document.createElement("div");
        container.className = "container";

        const sectionTitle = document.createElement("h2");
        sectionTitle.className = "section-title";
        sectionTitle.textContent = section.title;
        container.appendChild(sectionTitle);

        const contentContainer = document.createElement("div");
        contentContainer.className = "flex-col gap-2";

        section.faqs.forEach((faq) => {
          const article = document.createElement("article");
          article.className = "card no-hover card--transparent";

          const summary = document.createElement("summary");
          summary.textContent = faq.question;
          summary.className = "card-title";
          article.appendChild(summary);

          const answer = document.createElement("div");
          answer.innerHTML = faq.answer;
          answer.className = "card-text--bulk";
          article.appendChild(answer);

          contentContainer.appendChild(article);
        });

        container.appendChild(contentContainer);
        sectionElement.appendChild(container);
        faqContainer.appendChild(sectionElement);
      });
    })
    .catch((error) => console.error("Error fetching FAQ data:", error));
});
