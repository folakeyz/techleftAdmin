import React from "react";
import ReactECharts from "echarts-for-react";

const AdminChart = ({ users }) => {
  const adminUser = users.filter((x) => x.is_superuser === true);
  const nUser = users.filter(
    (x) =>
      x.is_superuser === false && x.is_trial === false && x.is_staff === true
  );
  const trial = users.filter((x) => x.is_trial === true);
  const option = {
    title: {
      text: "User Accounts",
      subtext: "Accounts",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Number"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: ["Super Admin", "Admin", "Trial Account"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Total",
        type: "bar",
        data: [adminUser?.length, nUser?.length, trial?.length],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
    ],
    color: ["#206cb7", "#4184c6"],
  };
  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default AdminChart;
