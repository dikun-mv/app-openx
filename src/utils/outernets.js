export function extractSettings() {
  const normalizeURL = (url) => url.replace(/\/$/, '');

  const settings = JSON.parse(decodeURIComponent(window.location.search.slice(1)));

  return { ...settings, baseUrl: normalizeURL(settings.baseUrl) };
}

export async function startScheduler() {
  const { baseUrl, areaId } = extractSettings();

  const { status, statusText } = await fetch(`${baseUrl}/schedulers/${areaId}/start`, { credentials: 'include' });

  if (status !== 200) {
    throw new Error(statusText);
  }
}

export async function stopScheduler() {
  const { baseUrl, areaId } = extractSettings();

  const { status, statusText } = await fetch(`${baseUrl}/schedulers/${areaId}/stop`, { credentials: 'include' });

  if (status !== 200) {
    throw new Error(statusText);
  }
}
