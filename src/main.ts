import Konva from "konva";

class main {
    private readonly _stage: Konva.Stage;

    constructor() {
        this._stage = new Konva.Stage({
            container: 'app',
            height: window.innerHeight,
            width: window.innerWidth,
        });
    }

    public display(): void {
        let layer: Konva.Layer = new Konva.Layer();

        let playerRoleCard: Konva.Group = new Konva.Group({
            x: 25,
            y: 25,
            width: 300,
            id: 'player-1-role-card',
            draggable: true,
        });

        Konva.Image.fromURL('https://i.redd.it/mr2uic5g16a81.jpg', (roleArt: Konva.Image): void => {
            roleArt.setAttrs({
                y: 50,
                height: 100,
                width: 100,
                cornerRadius: 25,
            });
            roleArt.x(300/2 - roleArt.width()/2);
            playerRoleCard.add(roleArt);
        })

        let bg: Konva.Rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            fill: 'orange',
            stroke: 'black',
            strokeWidth: 2,
            cornerRadius: 20,
        });

        let roleName: Konva.Text = new Konva.Text({
            y: 10,
            text: 'Quartermaster',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        roleName.x(300/2 - roleName.width() / 2);

        let roleAbility: Konva.Text = new Konva.Text({
            x: 10,
            y: 165,
            width: 300,
            text: 'During Disencamp Phase, learn how many Cadres have more than 1 member not on your team',
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: 'black',
        });

        let roleCadre: Konva.Text = new Konva.Text({
            y: 215,
            text: 'Cadre Marker',
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        roleCadre.x(300/2 - roleCadre.width() / 2);

        playerRoleCard.add(bg, roleName, roleAbility, roleCadre);

        let redCircle: Konva.Circle = new Konva.Circle({
            x: this._stage.width() / 2 - 100,
            y: this._stage.height() / 2,
            radius: 25,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 1,
            draggable: true,
        });

        let greenCircle: Konva.Circle = new Konva.Circle({
            x: this._stage.width() / 2,
            y: this._stage.height() / 2,
            radius: 25,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 1,
            draggable: true,
        });

        let yellowCircle: Konva.Circle = new Konva.Circle({
            x: this._stage.width() / 2 + 100,
            y: this._stage.height() / 2,
            radius: 25,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 1,
            draggable: true,
        });

        layer.add(playerRoleCard, redCircle, greenCircle, yellowCircle);
        this._stage.add(layer);
    }
}

const app: main = new main();
app.display();