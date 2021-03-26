"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const echarts = require("echarts");
const canvas_1 = require("canvas");
const fs = require("fs");
exports.default = (config) => {
    const ctx = canvas_1.createCanvas(200, 200);
    echarts.setCanvasCreator(() => {
        return ctx;
    });
    let chart = echarts.init(ctx);
    chart.setOption(config.options);
    const canvas = chart.getDom();
    const imgBuffer = canvas.toBuffer();
    if (config.path) {
        try {
            fs.writeFileSync(config.path, imgBuffer);
            if (config.enableAutoDispose) {
                chart.dispose();
            }
            console.log("Create Img:" + config.path);
        }
        catch (err) {
            console.error("Error: Write File failed" + err.message);
        }
    }
    else {
        var buffer = imgBuffer;
        try {
            if (config.enableAutoDispose) {
                chart.dispose();
            }
        }
        catch (e) { }
        return buffer;
    }
    if (config.enableAutoDispose) {
        chart.dispose();
    }
};
