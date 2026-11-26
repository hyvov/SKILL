# 在另一台电脑上开工

将 assets/remotion-template 整个复制到项目目录。下面命令在副本中运行，适用于终端或 PowerShell。使用符合 package.json engines 的 Node.js，例如 Node 24，并确保 npm 可运行。第一次安装依赖和下载渲染浏览器需要网络。示例已带中文、英文配音和音效，可直接预览。字体由本机提供；Windows 可用微软雅黑、宋体，macOS 可用苹方、宋体，Linux 可装 Noto CJK。换系统要抽看中文是否缺字、溢出。

```sh
npm ci
npm run dev
```

Studio 中选择 ThreeDays 或 NonfiniteIllustrated。导出对应样片：

```sh
npm run render:days
npm run render:kite
```

结果分别在 out/three-days.mp4 和 out/nonfinite.mp4。渲染器优先使用 Remotion 管理的浏览器。如果下载失败且本机已有兼容 Chrome，可以将该机的浏览器可执行文件路径通过 --browser-executable 传给 CLI。

## 改哪一处

| 内容 | 工程中的位置 |
| --- | --- |
| 构图、颜色、时间轴、文件和包裹动画 | src/ThreeDays.tsx |
| 句子拆解、关键词与字幕 | src/Nonfinite.tsx |
| 人物、风筝、动作 | src/KiteScene.tsx |
| 阶段台词和原动画时间 | src/days-timing.json、src/nonfinite-timing.json |
| 每段新旧时长对照与配音调度 | src/*-playback.json、src/Playback.tsx |
| 逐句自然配音、整片动作音效 | public/three-days、public/nonfinite |
| 合成入口 | src/Root.tsx |

两套模板的画面和台词彼此关联。换新课题时同步改写画面上的英文、口播、字幕及动画分支，按新动作制作音效。playback 中的 sourceFrames 是原动画帧数，frames 是实际配音占用的帧数。切换节奏后，按新的动作帧对齐 foley.wav。新增例句时同步维护段数、字幕切分与整片时长。

## 新课题的双语声音

已有配音可直接复用。生成新台词可使用 Python 虚拟环境中的 edge-tts；这是联网的合成服务，将发送待合成的文本。声音也可以换成本地神经配音或真人录音。以下为可分别运行的示例命令：

```sh
python -m pip install edge-tts
edge-tts --voice zh-CN-XiaoxiaoNeural --rate=+3% --text "写完这份报告，要花多久？" --write-media zh.mp3
edge-tts --voice en-US-AvaMultilingualNeural --rate=-4% --text "I can finish the report in three days." --write-media en.mp3
```

示例参数仅作起点。普通话段落里若有重要英文词，试听其发音；需要时拆开录制，再在自然停顿处接回去。音色不可用时可用 edge-tts --list-voices 查询。工程默认读取 WAV，使用 FFmpeg 可执行 ffmpeg -i zh.mp3 -ar 44100 -ac 1 zh.wav。也可以调整工程的音频文件名直接读取 MP3。逐句测量长度，给提问和答案之间留白，避免为压进旧镜头而过度加速。
