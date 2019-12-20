# layademo-puremvc
Layabox2.x 集成 PureMVC框架 以及常用类库

效果如下

![001](README/001.gif)



### 项目结构图

```json
.
├── README
│   └── 001.gif
├── README.md
├── bin
│   ├── bitmapfont
│   │   ├── test.fnt
│   │   └── test.png
│   ├── fileconfig.json
│   ├── game.js
│   ├── game.json
│   ├── img_empty.png
│   ├── index.html
│   ├── index.js
│   ├── js
│   │   ├── bundle.js
│   │   └── bundle.js.map
│   ├── libs
│   │   ├── bytebuffer.js
│   │   ├── domparserinone.js
│   │   ├── laya.ani.js
│   │   ├── laya.bdmini.js
│   │   ├── laya.core.js
│   │   ├── laya.d3.js
│   │   ├── laya.debugtool.js
│   │   ├── laya.device.js
│   │   ├── laya.html.js
│   │   ├── laya.log4ts.js
│   │   ├── laya.particle.js
│   │   ├── laya.pathfinding.js
│   │   ├── laya.physics.js
│   │   ├── laya.physics3D.js
│   │   ├── laya.physics3D.runtime.js
│   │   ├── laya.physics3D.wasm.js
│   │   ├── laya.puremvc.js
│   │   ├── laya.qqmini.js
│   │   ├── laya.quickgamemini.js
│   │   ├── laya.tiledmap.js
│   │   ├── laya.tweenmax.min.js
│   │   ├── laya.ui.js
│   │   ├── laya.vvmini.js
│   │   ├── laya.wxmini.js
│   │   ├── laya.xmmini.js
│   │   ├── worker.js
│   │   └── workerloader.js
│   ├── light
│   │   └── base_bg.jpg
│   ├── project.config.json
│   ├── project.swan.json
│   ├── res
│   │   ├── atlas
│   │   │   ├── comp.atlas
│   │   │   ├── comp.png
│   │   │   ├── light.atlas
│   │   │   └── light.png
│   │   ├── jsons
│   │   │   ├── appconfig.json
│   │   │   ├── cloud
│   │   │   │   ├── free.json
│   │   │   │   └── sharemsg.json
│   │   │   └── resconfig.json
│   │   └── particles
│   │       └── gold.part
│   ├── smile
│   │   ├── Load.json
│   │   └── Main.json
│   ├── subpackages
│   │   ├── res
│   │   │   ├── game.js
│   │   │   ├── init.js
│   │   │   ├── music
│   │   │   │   └── bgm.mp3
│   │   │   ├── sound
│   │   │   │   ├── destroy.wav
│   │   │   │   └── hit.wav
│   │   │   └── spine
│   │   │       ├── click.png
│   │   │       └── click.sk
│   │   └── src
│   │       ├── game.js
│   │       └── init.js
│   ├── swan-game-adapter.js
│   ├── unpack.json
│   ├── version.json
│   └── weapp-adapter.js
├── laya
│   ├── assets
│   │   ├── bitmapfont
│   │   │   ├── test.fnt
│   │   │   └── test.png
│   │   ├── comp
│   │   │   ├── btn_close.png
│   │   │   ├── button.png
│   │   │   ├── check_circle.png
│   │   │   ├── checkbox.png
│   │   │   ├── clip_num.png
│   │   │   ├── clip_tree_arrow.png
│   │   │   ├── clip_tree_folder.png
│   │   │   ├── combobox.png
│   │   │   ├── fontClip.png
│   │   │   ├── fontClip_num.png
│   │   │   ├── hscroll$bar.png
│   │   │   ├── hscroll$down.png
│   │   │   ├── hscroll$up.png
│   │   │   ├── hscroll.png
│   │   │   ├── hslider$bar.png
│   │   │   ├── hslider.png
│   │   │   ├── html.png
│   │   │   ├── image.png
│   │   │   ├── img_bg.png
│   │   │   ├── img_bg2.png
│   │   │   ├── img_bg3.png
│   │   │   ├── img_bg4.png
│   │   │   ├── img_bg5.png
│   │   │   ├── img_blank.png
│   │   │   ├── label.png
│   │   │   ├── progress$bar.png
│   │   │   ├── progress.png
│   │   │   ├── radio.png
│   │   │   ├── radiogroup.png
│   │   │   ├── tab.png
│   │   │   ├── textarea.png
│   │   │   ├── textinput.png
│   │   │   ├── vscroll$bar.png
│   │   │   ├── vscroll$down.png
│   │   │   ├── vscroll$up.png
│   │   │   ├── vscroll.png
│   │   │   ├── vslider$bar.png
│   │   │   └── vslider.png
│   │   └── light
│   │       ├── base_bg.jpg
│   │       ├── heitiao.png
│   │       ├── logo.png
│   │       ├── progress$bar.png
│   │       └── progress.png
│   ├── ignore.cfg
│   ├── pageStyles.xml
│   ├── pages
│   │   └── smile
│   │       ├── Load.scene
│   │       └── Main.scene
│   └── styles.xml
├── layademo-puremvc.laya
├── libs
│   ├── LayaAir.d.ts
│   ├── laya.log4ts.d.ts
│   ├── laya.puremvc.d.ts
│   ├── laya.tweenmax.min.d.ts
│   ├── layaAir.minigame.d.ts
│   ├── union.d.ts
│   └── wx.d.ts
├── src
│   ├── AppConstants.ts
│   ├── AppMediator.ts
│   ├── ApplicationFacade.ts
│   ├── GameConfig.ts
│   ├── Main.ts
│   ├── controller
│   │   ├── command
│   │   │   └── LoginCommand.ts
│   │   └── core
│   │       ├── ControllerCommands.ts
│   │       ├── ModelPrepCommand.ts
│   │       ├── StartupCommand.ts
│   │       └── ViewPrepCommand.ts
│   ├── events
│   │   ├── CustomEventConstants.ts
│   │   └── CustomEventDispatcher.ts
│   ├── model
│   │   ├── data
│   │   │   ├── GameConstans.ts
│   │   │   ├── GameData.ts
│   │   │   ├── JsonPool.ts
│   │   │   ├── MyLocalStorage.ts
│   │   │   ├── NetConstants.ts
│   │   │   ├── PayOnOff.ts
│   │   │   └── WarnCode.ts
│   │   ├── interface
│   │   │   └── MyInter.ts
│   │   ├── proxy
│   │   │   ├── BaseProxy.ts
│   │   │   ├── LoginProxy.ts
│   │   │   └── net
│   │   │       └── Https.ts
│   │   └── vo
│   │       ├── RedPoint.ts
│   │       ├── SystemInfo.ts
│   │       └── UserVO.ts
│   ├── platform
│   │   ├── BaseSDK.ts
│   │   ├── Platform.ts
│   │   └── WxSDK.ts
│   ├── ui
│   │   └── layaMaxUI.ts
│   ├── utils
│   │   ├── AppScreen.ts
│   │   ├── ContentAdapter.ts
│   │   ├── GameManager.ts
│   │   ├── Helper.ts
│   │   ├── ResConfig.ts
│   │   └── TimeTrans.ts
│   └── view
│       ├── loading
│       │   ├── LoadHelper.ts
│       │   ├── LoadingMadiator.ts
│       │   └── LoadingView.ts
│       ├── maiui
│       │   └── MainScene.ts
│       ├── rank
│       │   ├── RankDalog.ts
│       │   └── RankDialogMediator.ts
│       └── system
│           ├── GoldParticle.ts
│           ├── SystemInstance.ts
│           ├── SystemMediator.ts
│           └── WarnTips.ts
└── tsconfig.json
```

### 更新日志：

- 2019年12月20日  
  - 更新引擎到 Layabox 2.4.0bata