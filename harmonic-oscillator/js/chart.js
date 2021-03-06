"use strict";

var utils = require("utils"),
    Chart = require("Chart"),
    waveFunction = require("./wave-function.js");

var m = utils.AMU, // hydrogen
    w = 9.140778e+13; // Hz

var config = {
    type: "line",
    data: {
        datasets: [
            {borderColor: "#4d4d4d"},
            {borderColor: "#5da5da"},
            {borderColor: "#faa43a"},
            {borderColor: "#60bd68"},
            {borderColor: "#f17cb0"},
            {borderColor: "#b2912f"},
            {borderColor: "#b276b2"},
            {borderColor: "#decf3f"},
            {borderColor: "#f15854"},
            {borderColor: "#aaaaaa"},
            {borderColor: "#95b4ff"}
        ]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: "linear",
                position: "bottom",
                gridLines: {
                    tickMarkLength: 5
                },
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    tickMarkLength: 5
                },
                ticks: {
                    display: false
                }
            }]
        },
        tooltips: {
            enabled: false
        },
        elements: {
            line: {
                fill: false
            },
            point: {
                radius: 0,
                hoverRadius: 0
            }
        }
    }
};

config.data.datasets.forEach(function (dataset, n) {
    var data = dataset.data = [],
        i;
    for (i = -3; i <= 3; i += 0.1) {
        data.push({x: i, y: waveFunction(i * utils.BOHR_RADIUS, n, m, w)});
    }
    dataset.showLine = (n < 4);
});

var chart = {
    create: function (ctx) {
        if (this.chart) {
            return this.chart;
        }
        Object.defineProperty(this, "chart", {
            enumerable: true,
            value: new Chart(ctx, config)
        });
        return this.chart;
    },

    toggleSeries: function (n) {
        var dataset = this.chart.data.datasets[n];
        if (!dataset) {
            throw new Error("Series #" + n + " doesn't exist");
        }
        dataset.showLine = !dataset.showLine;
        this.chart.update();
    }
};

module.exports = chart;