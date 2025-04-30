
const app = new PIXI.Application({ view: document.getElementById("game-canvas"), resizeTo: window });
window.app = app;

window.onload = () => {
    engine.sayHello();

    PIXI.Assets.addBundle("main", {
        "tileset": "https://raw.githubusercontent.com/madhead/pixi-assets/main/match3/tileset.json",
        "setup": "interface.json"
    });

    PIXI.Assets.loadBundle("main").then((res) => {
        engine.scene.setups["main"] = res["setup"];
        engine.scene.loadBundle("main", () => {
            const objs = engine.scene.setup("main");
            const gameScene = objs["test_anim"];
            app.stage.addChild(gameScene);
        });
    });
};
