/**
 * Created by jsroads on 2019-08-21.13:49
 * Note:
 */
import Particle2D = Laya.Particle2D;
import ParticleSetting = Laya.ParticleSetting;
import Point = Laya.Point;

export default class GoldParticle {
    private animation: Particle2D;
    private callback: Function;

    private static _i: GoldParticle;

    static get i(): GoldParticle {
        if (!this._i) this._i = new GoldParticle();
        return this._i;
    }

    public showAnimation(point: Point, callback) {
        this.callback = callback;
        if (!this.animation) {
            let settings: ParticleSetting = Laya.loader.getRes("res/particles/gold.part");
            this.animation = new Particle2D(settings);
            this.animation.autoPlay = false;
            this.animation.emitter.start();
            Laya.stage.addChild(this.animation);
        }
        this.animation.zOrder = 3000;
        this.animation.x = point.x;
        this.animation.y = point.y;
        this.animation.play();
        this.animation.timerOnce(3500, this, this.completeParticle2D)
    }

    private completeParticle2D() {
        this.animation.stop();
        if (this.callback) this.callback();
    }
}