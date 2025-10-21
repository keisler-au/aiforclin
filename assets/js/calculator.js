document.addEventListener("DOMContentLoaded", function () {
  // initial state
  if (window.location.href.includes("calculator")) {
    toggleResultsVisibility(false);
    setupCalculator();
  };

  function toggleResultsVisibility(isVisible) {
    const placeholder = document.getElementById("placeholder-content");
    const results = document.getElementById("results-content");

    placeholder.style.display = isVisible ? "none" : "block";
    results.style.display = isVisible ? "block" : "none";
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatTime(hours) {
    if (hours < 1) {
      return Math.round(hours * 60) + " min";
    }
    return Math.round(hours * 10) / 10 + " hrs";
  }

  function animateNumber(element, finalValue, formatter, duration = 1000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (finalValue - start) * easeOut;

      element.textContent = formatter(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function updateResults(data) {
    // Animate time savings
    animateNumber(
      document.getElementById("daily-time"),
      data.dailyTimeSaved,
      formatTime,
      800
    );
    animateNumber(
      document.getElementById("weekly-time"),
      data.weeklyTimeSaved,
      formatTime,
      900
    );
    animateNumber(
      document.getElementById("annual-time"),
      data.annualTimeSaved,
      formatTime,
      1000
    );

    // Animate monetary savings
    animateNumber(
      document.getElementById("daily-money"),
      data.dailyMoneySaved,
      formatCurrency,
      800
    );
    animateNumber(
      document.getElementById("weekly-money"),
      data.weeklyMoneySaved,
      formatCurrency,
      900
    );
    animateNumber(
      document.getElementById("annual-money"),
      data.annualMoneySaved,
      formatCurrency,
      1000
    );

    // Update descriptions
    setTimeout(() => {
      document.getElementById(
        "time-description"
      ).innerHTML = `You could save <span class="highlight">${formatTime(
        data.dailyTimeSaved
      )}</span> per day, <span class="highlight">${formatTime(
        data.weeklyTimeSaved
      )}</span> per week, and <span class="highlight">${formatTime(
        data.annualTimeSaved
      )}</span> annually with AI scribe technology.`;

      document.getElementById(
        "money-description"
      ).innerHTML = `At <span class="highlight">${formatCurrency(
        data.hourlyRate
      )}/hour</span>, your time savings translate to <span class="highlight">${formatCurrency(
        data.annualMoneySaved
      )}</span> in additional annual productivity value.`;
    }, 500);
  }

  function updateVisuals(data) {
    const totalAnnualWorkHours = data.documentationHoursPerWeek * data.annualWorkWeeks;
    const timeRecoveryPercentage = Math.round(
      (data.annualTimeSaved / totalAnnualWorkHours) * 100
    );
    const timeSavedPercentage = Math.round((data.timeSavedPerHour / 60) * 100);
    const effectiveWorkHours = totalAnnualWorkHours - data.annualTimeSaved;

    // Update bar chart values
    document.getElementById("without-value").textContent =
      Math.round(totalAnnualWorkHours) + " hrs";
    document.getElementById("with-value").textContent =
      Math.round(effectiveWorkHours) + " hrs";

    // Animate bar chart
    setTimeout(() => {
      const withBarHeight = Math.max(
        15,
        (effectiveWorkHours / totalAnnualWorkHours) * 100
      );
      document.getElementById("with-bar").style.height = withBarHeight + "%";
    }, 600);

    // Update and animate progress bars
    // setTimeout(() => {
    //   document.getElementById("time-percentage").textContent =
    //     timeSavedPercentage + "%";
    //   document.getElementById("time-progress").style.width =
    //     timeSavedPercentage + "%";

    //   document.getElementById("recovery-percentage-text").textContent =
    //     timeRecoveryPercentage + "%";
    //   document.getElementById("recovery-progress").style.width =
    //     timeRecoveryPercentage + "%";
    // }, 800);

    // Update and animate donut chart
    // setTimeout(() => {
    //   const circumference = 2 * Math.PI * 15.915;
    //   const strokeDasharray = `${
    //     (timeRecoveryPercentage / 100) * circumference
    //   } ${circumference}`;
    //   document
    //     .getElementById("donut-progress")
    //     .setAttribute("stroke-dasharray", strokeDasharray);

    //   animateNumber(
    //     document.getElementById("recovery-percentage"),
    //     timeRecoveryPercentage,
    //     (val) => Math.round(val) + "%",
    //     1200
    //   );
    // }, 1000);
  }

  function setupCalculator() {
    const calculatorForm = document.getElementById("calculator-form");
    calculatorForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const hourlyRate = parseFloat(document.getElementById("hourly-rate").value);
      const timeSavedPerHour = parseFloat(
        document.getElementById("time-saved").value
      );
      const documentationHoursPerWeek = parseFloat(
        document.getElementById("daily-hours").value
      );
      const annualWorkWeeks = parseFloat(
        document.getElementById("annual-weeks").value
      );

      // Calculate savings
      const timeSavedPerHourDecimal = timeSavedPerHour / 60;
      const dailyTimeSaved = timeSavedPerHourDecimal * (documentationHoursPerWeek / 5);
      const weeklyTimeSaved = dailyTimeSaved * 5;
      const annualTimeSaved = weeklyTimeSaved * annualWorkWeeks;

      const dailyMoneySaved = dailyTimeSaved * hourlyRate;
      const weeklyMoneySaved = weeklyTimeSaved * hourlyRate;
      const annualMoneySaved = annualTimeSaved * hourlyRate;

      const calculationData = {
        hourlyRate,
        timeSavedPerHour,
        documentationHoursPerWeek,
        annualWorkWeeks,
        dailyTimeSaved,
        weeklyTimeSaved,
        annualTimeSaved,
        dailyMoneySaved,
        weeklyMoneySaved,
        annualMoneySaved,
      };

      setTimeout(() => {
        toggleResultsVisibility(true);
      }, 300);

      setTimeout(() => {
        updateResults(calculationData);
        updateVisuals(calculationData);
      }, 400);

      window.scrollTo({
        top: window.innerWidth < 700 ? 190 : 270,
        behavior: "smooth",
      });
    });

    // Pre-fill with example values
    window.addEventListener("load", function () {
      document.getElementById("hourly-rate").value = "100";
      document.getElementById("time-saved").value = "40";
      document.getElementById("daily-hours").value = "8";
      document.getElementById("annual-weeks").value = "48";
    });
  } 
});
