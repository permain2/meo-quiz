const SITE_ID = process.env.NEXT_PUBLIC_KLAVIYO_SITE_ID;
const KLAVIYO_API = "https://a.klaviyo.com/client";

interface KlaviyoProfile {
  email: string;
  properties?: Record<string, string | boolean>;
}

export async function identifyProfile(profile: KlaviyoProfile): Promise<void> {
  if (!SITE_ID) return;
  await fetch(`${KLAVIYO_API}/profiles/?company_id=${SITE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", revision: "2024-10-15" },
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email: profile.email,
          properties: profile.properties ?? {},
        },
      },
    }),
  });
}

export async function trackEvent(
  email: string,
  eventName: string,
  properties: Record<string, string | boolean> = {}
): Promise<void> {
  if (!SITE_ID) return;
  await fetch(`${KLAVIYO_API}/events/?company_id=${SITE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", revision: "2024-10-15" },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          metric: { data: { type: "metric", attributes: { name: eventName } } },
          profile: { data: { type: "profile", attributes: { email } } },
          properties,
        },
      },
    }),
  });
}
