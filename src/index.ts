import * as echarts from 'echarts';
import { createCanvas, loadImage } from 'canvas';
import * as fs from 'fs';

interface Options {
  width: number;
  height: number;
  path?: string;
  options: any;
  enableAutoDispose?: boolean;
}

export default (config: Options) => {
  const ctx: any = createCanvas(200, 200);
  echarts.setCanvasCreator((): HTMLCanvasElement => {
    return ctx;
  });
  let chart = echarts.init(ctx);
  chart.setOption(config.options);
  const canvas: any = chart.getDom();
  const imgBuffer: Buffer = canvas.toBuffer();
  if (config.path) {
    try {
      fs.writeFileSync(config.path, imgBuffer);
      if (config.enableAutoDispose) {
        chart.dispose();
      }
      console.log("Create Img:" + config.path)
    } catch (err) {
      console.error("Error: Write File failed" + err.message)
    }

  } else {
    var buffer = imgBuffer;
    try {
      if (config.enableAutoDispose) {
        chart.dispose();
      }
    } catch (e) { }
    return buffer;
  }
  if (config.enableAutoDispose) {
    chart.dispose();
  }
}