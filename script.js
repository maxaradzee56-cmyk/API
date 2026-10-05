const adviceId = document.querySelector("#advice-id");
const adviceText = document.querySelector("#advice-text");
const newAdviceButton = document.querySelector(".new-advice");
const errorMessage = document.querySelector("#error-message");

newAdviceButton.addEventListener("click", async () => {
  newAdviceButton.disabled = true;
  errorMessage.hidden = true;

  try {
    const response = await fetch(
      `https://api.adviceslip.com/advice?timestamp=${Date.now()}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`Advice API returned ${response.status}`);
    }

    const result = await response.json();
    const slip = result.slip;

    if (
      !slip ||
      !Number.isInteger(slip.id) ||
      typeof slip.advice !== "string" ||
      slip.advice.length === 0
    ) {
      throw new Error("Advice API returned an invalid response");
    }

    adviceId.textContent = `#${slip.id}`;
    adviceText.textContent = `“${slip.advice}”`;
  } catch (error) {
    console.error("Unable to load new advice:", error);
    errorMessage.hidden = false;
  } finally {
    newAdviceButton.disabled = false;
  }
});
