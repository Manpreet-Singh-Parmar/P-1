import PlaceholderPage from "./PlaceholderPage";

export default function ConnectedReportsPage() {
  return (
    <PlaceholderPage
      index="SS-REPORTS"
      heading="Connected reports."
      title="No report dataset is loaded yet."
      description="Connected Reports links separate complaints that share an identifier — a UPI handle, a phone number, a domain — so investigators can see a campaign rather than a single incident. No reports have been ingested in this phase, and none are shown here as placeholders."
      planned={[
        "Cross-incident matching on shared identifiers",
        "State and city distribution of linked reports",
        "Repeat-sender ranking built from confirmed cases",
        "Guided hand-off to the national cybercrime portal",
      ]}
    />
  );
}
