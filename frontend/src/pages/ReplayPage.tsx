import PlaceholderPage from "./PlaceholderPage";

export default function ReplayPage() {
  return (
    <PlaceholderPage
      index="SS-REPLAY"
      heading="Replay the sequence."
      title="Replay is not part of Phase 1."
      description="Replay rebuilds a fraud attempt as an ordered timeline: each message, call, or hand-off in the sequence a victim received, so the pressure pattern becomes visible. The timeline engine and the case storage behind it are built in the next phase."
      planned={[
        "Ordered timeline of messages, calls, and links in one incident",
        "Pressure markers showing where urgency or threats were introduced",
        "Attribution of each step to a sender identity or handle",
        "Export of the timeline as a printable case record",
      ]}
    />
  );
}
