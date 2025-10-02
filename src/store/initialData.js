export const initialDashboardData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          text: "Connected (2) | Not Connected (2)",
          type: "donut",
        },
        {
          id: "cloud-risk",
          name: "Cloud Account Risk Assessment",
          text: "Failed (1689) | Warning (681) | Not available (36) | Passed (7253)",
          type: "donut",
        },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          text: "No Graph data available!",
          type: "empty",
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          text: "No Graph data available!",
          type: "empty",
        },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          text: "1470 Total Vulnerabilities",
          details: { critical: 9, high: 150 },
          type: "bar",
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          text: "2 Total Images",
          details: { critical: 2, high: 2 },
          type: "bar",
        },
      ],
    },
  ],
};
