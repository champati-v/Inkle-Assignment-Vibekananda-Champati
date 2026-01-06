export default function capitalizeFirstLetter(
  str?: string | null
): string {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
