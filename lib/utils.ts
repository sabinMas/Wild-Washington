import { clsx } from "clsx";

export function cn(...values: Array<string | false | null | undefined>) {
  return clsx(values);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    value,
  );
}

export function moveFocusInCardGrid(current: HTMLElement, key: string) {
  const grid = current.closest("[data-card-grid]");

  if (!grid) {
    return false;
  }

  const cards = Array.from(
    grid.querySelectorAll<HTMLElement>("[data-species-card='true']"),
  );
  const currentIndex = cards.indexOf(current);

  if (currentIndex === -1) {
    return false;
  }

  if (key === "ArrowLeft" && currentIndex > 0) {
    cards[currentIndex - 1]?.focus();
    return true;
  }

  if (key === "ArrowRight" && currentIndex < cards.length - 1) {
    cards[currentIndex + 1]?.focus();
    return true;
  }

  if (key !== "ArrowUp" && key !== "ArrowDown") {
    return false;
  }

  const currentRect = current.getBoundingClientRect();
  const currentCenterX = currentRect.left + currentRect.width / 2;
  const candidates = cards
    .filter((card) => card !== current)
    .map((card) => ({
      card,
      rect: card.getBoundingClientRect(),
    }))
    .filter(({ rect }) =>
      key === "ArrowUp" ? rect.top < currentRect.top : rect.top > currentRect.top,
    )
    .sort((a, b) => {
      const rowDistanceA = Math.abs(a.rect.top - currentRect.top);
      const rowDistanceB = Math.abs(b.rect.top - currentRect.top);

      if (rowDistanceA !== rowDistanceB) {
        return rowDistanceA - rowDistanceB;
      }

      const centerXA = a.rect.left + a.rect.width / 2;
      const centerXB = b.rect.left + b.rect.width / 2;

      return Math.abs(centerXA - currentCenterX) - Math.abs(centerXB - currentCenterX);
    });

  const target = candidates[0]?.card;

  if (!target) {
    return false;
  }

  target.focus();
  return true;
}
