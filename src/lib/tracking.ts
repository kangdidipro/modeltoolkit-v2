import { trackUserEvent, type UserEventInput } from "@/ai/flows/user-tracking-flow";

export const trackEvent = (input: UserEventInput) => {
  // Fire-and-forget the tracking event. We don't want to block user
  // interaction or show errors if tracking fails.
  trackUserEvent(input).catch(error => {
    console.warn("User tracking event failed to send:", error);
  });
};
