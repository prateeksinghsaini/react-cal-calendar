import React, { useEffect } from "react";
import CalHeatmap from "cal-heatmap";
import Legend from "cal-heatmap/plugins/Legend";
import Tooltip from "cal-heatmap/plugins/Tooltip";

// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";

export default function LeaveCalendar() {
  const leaveData = [
    { date: "2024-01-01T00:00:00+02:00", type: "Present" },
    { date: "2024-01-15T00:00:00+02:00", type: "Govt. Holiday" },
    { date: "2024-02-20T00:00:00+02:00", type: "Present" },
    { date: "2024-03-10T00:00:00+02:00", type: "Govt. Holiday" },
    { date: "2024-04-25T00:00:00+02:00", type: "Present" },
    { date: "2024-05-05T00:00:00+02:00", type: "Present" },
    { date: "2024-06-18T00:00:00+02:00", type: "Leave" },
    { date: "2024-07-09T00:00:00+02:00", type: "Present" },
    { date: "2024-08-30T00:00:00+02:00", type: "Present" },
    { date: "2024-09-12T00:00:00+02:00", type: "Leave" },
    { date: "2024-10-24T00:00:00+02:00", type: "Present" },
    { date: "2024-11-16T00:00:00+02:00", type: "P.M. Working Day" },
    { date: "2024-12-31T00:00:00+02:00", type: "P.M. Working Day" },
  ];

  useEffect(() => {
    const cal = new CalHeatmap();

    cal.paint(
      {
        data: { source: leaveData, x: "date", y: "type", groupY: (d) => d[0] },
        date: { start: new Date("2024-01-01") },
        range: 12,
        scale: {
          color: {
            type: "ordinal",
            domain: [
              "Present",
              "Leave",
              "Sunday",
              "Govt. Holiday",
              "P.M. Working Day",
            ],
          },
        },
        domain: {
          type: "month",
          padding: [10, 10, 10, 10],
        },

        subDomain: {
          type: "xDay",
          radius: 2,
          width: 22,
          height: 22,
          label: "D",
        },
        itemSelector: "#day",
      },
      [
        [
          Tooltip,
          {
            text: function (date, value, dayjsDate) {
              return (value ? value + " on " : "") + dayjsDate.format("LL");
            },
          },
        ],
        [
          Legend,
          {
            tickSize: 0,
            width: 500,
            itemSelector: "#legend",
            label: "",
          },
        ],
      ]
    );

    // Cleanup function to destroy the calendar when the component unmounts
    return () => {
      cal.destroy();
    };
  }, []);

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <div id="day"></div>
        <div id="legend" style={{ float: "left" }}></div>
      </div>
    </>
  );
}
