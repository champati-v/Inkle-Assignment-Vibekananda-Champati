export function formatDate(value: string) {
  
  const parsed = new Date(value);

  if (isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).replace(",", "");
}
