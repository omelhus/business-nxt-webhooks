export function getVismaConnectHeaders(
  req: Record<string, string | undefined>
) {
  return {
    applicationId: req["x-vwd-application-id"],
    applicationVersion: req["x-vwd-application-version"],
    eventId: req["x-vwd-event-id"],
    groupId: req["x-vwd-group-id"],
    notificationId: req["x-vwd-notification-id"],
    notificationTimestamp: Number(req["x-vwd-notification-timestamp"]),
    subscriptionId: req["x-vwd-subscription-id"],
    tenantId: req["x-vwd-tenant-id"],
    webhookTimestamp: Number(req["x-vwd-webhook-timestamp"]),
  };
}
