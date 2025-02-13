import './style.css';
import Konva from "konva";

class main {
    private readonly _stage: Konva.Stage;
    private readonly _roles: Konva.Layer;
    private readonly _assets: Konva.Layer;
    private readonly _components: Konva.Layer;

    private readonly _size: number = 100;

    constructor() {
        this._stage = new Konva.Stage({
            container: 'app',
            height: window.innerHeight,
            width: window.innerWidth,
        });

        this._roles = new Konva.Layer();
        this._assets = new Konva.Layer();
        this._components = new Konva.Layer();
        this._stage.add(this._roles, this._assets, this._components);
    }

    public displayRoles(): void {
        const roles = [
            { id: 'player-1', roleName: 'Watch Captain', roleAbility: 'During Cataclysm Phase, learn a player who is a Looter or Guardian. If that player dies, learn a new one during Disencamp [+1 Looter]', roleIcon: 'watchcaptain.svg' },
            { id: 'player-2', roleName: 'Quartermaster', roleAbility: 'During Disencamp Phase, learn how many Cadres have more than 1 member not on your team', roleIcon: 'quartermaster.svg' },
            { id: 'player-3', roleName: 'Banisher', roleAbility: 'During Disencamp Phase, pick a player. If they\'re the Guardian, they become hobbled. If no other Servitors are active or are Guardian vessels, you become the Guardian', roleIcon: 'banisher.svg' },
            { id: 'player-4', roleName: 'Pioneer', roleAbility: 'During Disencamp, learn which team is winning', roleIcon: 'pioneer.svg' },
            { id: 'player-5', roleName: 'Homesteader', roleAbility: 'During Disencamp, learn how many of your active neighbors are on your team', roleIcon: 'homesteader.svg' },
            { id: 'player-6', roleName: 'Doctor', roleAbility: 'During Disencamp, learn how many inactive players are on your team', roleIcon: 'doctor.svg' },
            { id: 'player-7', roleName: 'Errand Boy', roleAbility: 'During Disencamp, learn the answer the Captain gave to the Gamemaster on your last mission', roleIcon: 'errandboy.svg' },
            { id: 'player-8', roleName: 'Survivalist', roleAbility: 'If you are the Captain on a mission, you provide two answers. If either is accurate, the mission succeeds. You do not know which one if any', roleIcon: 'survivalist.svg' },
            { id: 'player-9', roleName: 'Revered Leader', roleAbility: 'If you are hobbled while the Captain, at the end beginning of the next phase your role is revealed. You may be elected a Captain when inactive.', roleIcon: 'reveredleader.svg' },
            { id: 'player-10', roleName: 'Mentor', roleAbility: 'Once per game, when you are the Captain, you may choose an Explorer ability. You may use that ability immediately or during the Disencamp phase.', roleIcon: 'mentor.svg' },
            { id: 'player-11', roleName: 'Porter', roleAbility: 'You are safe from abilities of other Looters and Guardians. In Calamity phase, learn an out of play Explorer role.', roleIcon: 'porter.svg' },
            { id: 'player-12', roleName: 'Pickpocket', roleAbility: 'When a player is brought to justice, gain their ability the next Disencamp phase', roleIcon: 'pickpocket.svg' },
            { id: 'player-13', roleName: 'Saboteur', roleAbility: 'During Disencamp phase, choose a player. If they are a Servitor or Guardian, their ability doesn\'t function while you are active or fed', roleIcon: 'saboteur.svg' },
            { id: 'player-14', roleName: 'Cutthroat', roleAbility: 'During Disencamp, choose a player: if they are an Explorer or Looter they are hobbled. They are the only player that can be hobbled that phase', roleIcon: 'cutthroat.svg' },
            //{ id: 'player-15', roleName: 'Lost', roleAbility: 'You believe you are an Explorer or Looter. Your ability does not function', roleIcon: 'lost.svg' },
            { id: 'player-16', roleName: 'Innocent', roleAbility: 'If you are brought to justice, you and the Explorers lose', roleIcon: 'innocent.svg' },
            //{ id: 'player-17', roleName: 'Shadowed', roleAbility: 'You have another Explorer role. Your ability functions, but you Register as a Looter, Guardian, and Servitor', roleIcon: 'shadowed.svg' },
            { id: 'player-18', roleName: 'Covetous Villain', roleAbility: 'When you learn you\'ve been imprisoned or hobbled, publicly choosed a player. If they are an Explorer they are hobbled. You are not capable of redemption.', roleIcon: 'covetousvillain.svg' },
            { id: 'player-19', roleName: 'Hex Chanter', roleAbility: '[+1 Cursed] If a Cursed is brought to justice, you become a Guardian vessel', roleIcon: 'hexchanter.svg' },
            { id: 'player-20', roleName: 'Trapper', roleAbility: 'Once per game, during Disencamp phase choose a player. They are hobbled even if they wouldn\'t otherwise be. If you have used this ability, become a Guardian vessel', roleIcon: 'trapper.svg' },
            { id: 'player-21', roleName: 'Financier', roleAbility: 'In Disencamp phase, choose a player and an Explorer or Looter role. If that role is not in play, that player becomes that role. If you choose yourself with this role, you become a Guardian Vessel', roleIcon: 'financier.svg' },
            { id: 'player-22', roleName: 'Illusionist', roleAbility: 'In Disencamp phase, choose a Cadre mission you have not previously chosen. Even if the mission would succeed, it does not. If you have chosen all three missions, you become a Guardian Vessel', roleIcon: 'illusionist.svg' },
            { id: 'player-23', roleName: 'Lamia', roleAbility: '[+1 Cursed, -1 Servitor] Each Disencamp phase, choose a player; they are hobbled. If you would become imprisoned or hobbled, a Cursed player becomes takes your role and alignment.', roleIcon: 'lamia.svg' },
            { id: 'player-24', roleName: 'Hive', roleAbility: 'Each Disencamp phase, choose a player; they are hobbled. All of your Servitors are Guardian Vessels.', roleIcon: 'hive.svg' },
            { id: 'player-25', roleName: 'Vengeance', roleAbility: '[-1 Cursed] Each Disencamp phase, choose a player; they are hobbled. If you hobble a Looter or Servitor, their closest active non-Servitor neighbor becomes an out of play Cursed role', roleIcon: 'vengeance.svg' },
        ];
    
        roles.forEach((role) => {
            this.createRoleCard(role.id, `./assets/roles/${role.roleIcon}`, role.roleName);
        });
    }

    public createRoleCard(id: string, roleIconUrl: string, roleName: string): void {
        let playerRoleCard: Konva.Group = new Konva.Group({
            x: 10,
            y: 10,
            id: id,
            draggable: true,
        });

        Konva.Image.fromURL(roleIconUrl, (roleArt: Konva.Image): void => {
            roleArt.setAttrs({
                x: (this._size - 50)/2,
                y: 10,
                height: 50,
                width: 50,
            });

            let bg: Konva.Rect = new Konva.Rect({
                x: 0,
                y: 0,
                width: this._size,
                height: this._size,
                fill: 'orange',
                stroke: 'black',
                strokeWidth: 2,
                cornerRadius: 10,
            });

            let roleNameText: Konva.Text = new Konva.Text({
                x: 0,
                y: 65,
                text: roleName,
                fontSize: 15,
                fontFamily: 'Calibri',
                fill: 'black',
            });
            roleNameText.x(bg.width()/2 - roleNameText.getWidth()/2);

            let marker_width: number = 20;
            let marker_height: number = 30;

            let marker_1: Konva.Rect = new Konva.Rect({
                x: 8,
                y: (this._size-marker_height/4),
                width: marker_width,
                height: marker_height,
                fill: 'grey',
                stroke: 'black',
                strokeWidth: 2,
                click: false,
            });

            let marker_2: Konva.Rect = new Konva.Rect({
                x: this._size/2 - marker_width/2,
                y: (this._size-marker_height/4),
                width: marker_width,
                height: marker_height,
                fill: 'grey',
                stroke: 'black',
                strokeWidth: 2,
                click: false,
            });

            let marker_3: Konva.Rect = new Konva.Rect({
                x: this._size - (marker_width+8),
                y: (this._size-marker_height/4),
                width: marker_width,
                height: marker_height,
                fill: 'grey',
                stroke: 'black',
                strokeWidth: 2,
                click: false,
            });

            marker_1.on('dblclick', () => {
                let fill: string = marker_1.fill() == 'grey' ? 'red' : 'grey';
                marker_1.fill(fill);
            });

            marker_2.on('dblclick', () => {
                let fill: string = marker_2.fill() == 'grey' ? 'yellow' : 'grey';
                marker_2.fill(fill);
            });

            marker_3.on('dblclick', () => {
                let fill: string = marker_3.fill() == 'grey' ? 'green' : 'grey';
                marker_3.fill(fill);
            });


            playerRoleCard.add(bg, roleArt, roleNameText, marker_1, marker_2, marker_3);
        });

        this._roles.add(playerRoleCard);
    }

    public displayDraftBox(): void {
        let draftBox: Konva.Group = new Konva.Group({
            x: 25,
            y: window.innerHeight - 200,
            width: 300,
        });

        let bg: Konva.Rect = new Konva.Rect({
            x: 10,
            y: 10,
            width: 300,
            height: 150,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            cornerRadius: 20,
        });

        let title: Konva.Text = new Konva.Text({
            y: 25,
            text: 'Draft Box',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        title.x(300/2 - title.width() / 2);
        draftBox.add(bg, title);
        this._assets.add(draftBox);

        for (let i = 0; i < 25; i++) {
            this.displayDraftBoxItem('./assets/draftbox/dagger.svg', 50);
            this.displayDraftBoxItem('./assets/draftbox/amulet.svg', 125);
            this.displayDraftBoxItem('./assets/draftbox/statuette.svg', 200);
            this.displayDraftBoxItem('./assets/draftbox/crown.svg', 265);
        }
    }

    public displayDraftBoxItem(type: string, posX: number): void {
        const draftBoxItem: Konva.Group = new Konva.Group({
            x: posX,
            y: window.innerHeight - 125,
            draggable: true,
        });

        Konva.Image.fromURL(type, (roleArt: Konva.Image): void => {
            roleArt.setAttrs({
                x: 0,
                y: 0,
                height: 50,
                width: 50,
            });
            draftBoxItem.add(roleArt);
        });

        this._assets.add(draftBoxItem);
    }

    public displayCadreMarkersBox(): void {
        let cadreMarkersBox: Konva.Group = new Konva.Group({
            x: 350,
            y: window.innerHeight - 200,
            width: 300,
        });

        let bg: Konva.Rect = new Konva.Rect({
            x: 10,
            y: 10,
            width: 300,
            height: 150,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            cornerRadius: 20,
        });

        let title: Konva.Text = new Konva.Text({
            y: 25,
            text: 'Cadre Markers Box',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        title.x(300/2 - title.width() / 2);
        cadreMarkersBox.add(bg, title);
        this._assets.add(cadreMarkersBox);

        for (let i = 0; i < 255; i++) {
            this.addCadreMarker('red', 425);
            this.addCadreMarker('yellow', 500);
            this.addCadreMarker('green', 575);
        }
    }

    public addCadreMarker(color: string, posX: number): void {
        var circle = new Konva.Circle({
            x: posX,
            y: window.innerHeight - 100,
            radius: 25,
            fill: color,
            stroke: 'black',
            strokeWidth: 2,
            draggable: true,
        });
        this._assets.add(circle);
    }

    public displayCursedBox(): void {
        let cursedBox: Konva.Group = new Konva.Group({
            x: 375,
            y: window.innerHeight - 200,
            width: 300,
        });

        let bg: Konva.Rect = new Konva.Rect({
            x: 10,
            y: 10,
            width: 300,
            height: 150,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            cornerRadius: 20,
        });

        let title: Konva.Text = new Konva.Text({
            y: 25,
            text: 'Cursed Box',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        title.x(300/2 - title.width() / 2);
        cursedBox.add(bg, title);
        this._assets.add(cursedBox);

        for (let i = 0; i < 25; i++) {
            this.addCursedItem('./assets/roles/lost.svg', 450);
            this.addCursedItem('./assets/roles/shadowed.svg', 550);
        }
    }

    public addCursedItem(type: string, posX: number): void {
        const cursedBoxItem: Konva.Group = new Konva.Group({
            x: posX,
            y: window.innerHeight - 125,
            draggable: true,
        });

        Konva.Image.fromURL(type, (roleArt: Konva.Image): void => {
            roleArt.setAttrs({
                x: 0,
                y: 0,
                height: 50,
                width: 50,
            });
            cursedBoxItem.add(roleArt);
        });

        this._assets.add(cursedBoxItem);
    }

    public displayRoleInformation(): void {
        let width: number = 600;
        let sheetGroup: Konva.Group = new Konva.Group({
            x: window.innerWidth - width,
            y: 0,
            draggable: true,
            peek: false,
            dragBoundFunc: function (pos) {
                return {
                    x: this.x(), // Lock x position
                    y: pos.y     // Allow only vertical movement
                };
            }
        });

        sheetGroup.on('dblclick', () => {
            let peek: boolean = sheetGroup.getAttr('peek');
            if (!peek) {
                sheetGroup.x(window.innerWidth - 40);
            } else {
                sheetGroup.x(window.innerWidth - 600);
            }

            sheetGroup.setAttr('peek', !peek);
        });

        const sheet: Konva.Rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: window.innerHeight,
            fill: 'grey',
            cornerRadius: 20,
        });

        sheetGroup.add(sheet);

        const roles = [
            { id: 'player-1', roleName: 'Watch Captain', roleAbility: 'During Cataclysm Phase, learn a player who is a Looter or Guardian. If that player dies, learn a new one during Disencamp [+1 Looter]', roleIcon: 'watchcaptain.svg' },
            { id: 'player-2', roleName: 'Quartermaster', roleAbility: 'During Disencamp Phase, learn how many Cadres have more than 1 member not on your team', roleIcon: 'quartermaster.svg' },
            { id: 'player-3', roleName: 'Banisher', roleAbility: 'During Disencamp Phase, pick a player. If they\'re the Guardian, they become hobbled. If no other Servitors are active or are Guardian vessels, you become the Guardian', roleIcon: 'banisher.svg' },
            { id: 'player-4', roleName: 'Pioneer', roleAbility: 'During Disencamp, learn which team is winning', roleIcon: 'pioneer.svg' },
            { id: 'player-5', roleName: 'Homesteader', roleAbility: 'During Disencamp, learn how many of your active neighbors are on your team', roleIcon: 'homesteader.svg' },
            { id: 'player-6', roleName: 'Doctor', roleAbility: 'During Disencamp, learn how many inactive players are on your team', roleIcon: 'doctor.svg' },
            { id: 'player-7', roleName: 'Errand Boy', roleAbility: 'During Disencamp, learn the answer the Captain gave to the Gamemaster on your last mission', roleIcon: 'errandboy.svg' },
            { id: 'player-8', roleName: 'Survivalist', roleAbility: 'If you are the Captain on a mission, you provide two answers. If either is accurate, the mission succeeds. You do not know which one if any', roleIcon: 'survivalist.svg' },
            { id: 'player-9', roleName: 'Revered Leader', roleAbility: 'If you are hobbled while the Captain, at the end beginning of the next phase your role is revealed. You may be elected a Captain when inactive.', roleIcon: 'reveredleader.svg' },
            { id: 'player-10', roleName: 'Mentor', roleAbility: 'Once per game, when you are the Captain, you may choose an Explorer ability. You may use that ability immediately or during the Disencamp phase.', roleIcon: 'mentor.svg' },
            { id: 'player-11', roleName: 'Porter', roleAbility: 'You are safe from abilities of other Looters and Guardians. In Calamity phase, learn an out of play Explorer role.', roleIcon: 'porter.svg' },
            { id: 'player-12', roleName: 'Pickpocket', roleAbility: 'When a player is brought to justice, gain their ability the next Disencamp phase', roleIcon: 'pickpocket.svg' },
            { id: 'player-13', roleName: 'Saboteur', roleAbility: 'During Disencamp phase, choose a player. If they are a Servitor or Guardian, their ability doesn\'t function while you are active or fed', roleIcon: 'saboteur.svg' },
            { id: 'player-14', roleName: 'Cutthroat', roleAbility: 'During Disencamp, choose a player: if they are an Explorer or Looter they are hobbled. They are the only player that can be hobbled that phase', roleIcon: 'cutthroat.svg' },
            //{ id: 'player-15', roleName: 'Lost', roleAbility: 'You believe you are an Explorer or Looter. Your ability does not function', roleIcon: 'lost.svg' },
            { id: 'player-16', roleName: 'Innocent', roleAbility: 'If you are brought to justice, you and the Explorers lose', roleIcon: 'innocent.svg' },
            //{ id: 'player-17', roleName: 'Shadowed', roleAbility: 'You have another Explorer role. Your ability functions, but you Register as a Looter, Guardian, and Servitor', roleIcon: 'shadowed.svg' },
            { id: 'player-18', roleName: 'Covetous Villain', roleAbility: 'When you learn you\'ve been imprisoned or hobbled, publicly choosed a player. If they are an Explorer they are hobbled. You are not capable of redemption.', roleIcon: 'covetousvillain.svg' },
            { id: 'player-19', roleName: 'Hex Chanter', roleAbility: '[+1 Cursed] If a Cursed is brought to justice, you become a Guardian vessel', roleIcon: 'hexchanter.svg' },
            { id: 'player-20', roleName: 'Trapper', roleAbility: 'Once per game, during Disencamp phase choose a player. They are hobbled even if they wouldn\'t otherwise be. If you have used this ability, become a Guardian vessel', roleIcon: 'trapper.svg' },
            { id: 'player-21', roleName: 'Financier', roleAbility: 'In Disencamp phase, choose a player and an Explorer or Looter role. If that role is not in play, that player becomes that role. If you choose yourself with this role, you become a Guardian Vessel', roleIcon: 'financier.svg' },
            { id: 'player-22', roleName: 'Illusionist', roleAbility: 'In Disencamp phase, choose a Cadre mission you have not previously chosen. Even if the mission would succeed, it does not. If you have chosen all three missions, you become a Guardian Vessel', roleIcon: 'illusionist.svg' },
            { id: 'player-23', roleName: 'Lamia', roleAbility: '[+1 Cursed, -1 Servitor] Each Disencamp phase, choose a player; they are hobbled. If you would become imprisoned or hobbled, a Cursed player becomes takes your role and alignment.', roleIcon: 'lamia.svg' },
            { id: 'player-24', roleName: 'Hive', roleAbility: 'Each Disencamp phase, choose a player; they are hobbled. All of your Servitors are Guardian Vessels.', roleIcon: 'hive.svg' },
            { id: 'player-25', roleName: 'Vengeance', roleAbility: '[-1 Cursed] Each Disencamp phase, choose a player; they are hobbled. If you hobble a Looter or Servitor, their closest active non-Servitor neighbor becomes an out of play Cursed role', roleIcon: 'vengeance.svg' },
        ];

        let height: number = 10;
        for (let i: number = 0; i < roles.length; i++) {
            let role = roles[i];

            let roleName: Konva.Text = new Konva.Text({
                x: 10,
                y: height,
                width: 580,
                text: `${role.roleName} - ${role.roleAbility}`,
                fontSize: 16,
                fontFamily: 'Calibri',
                fill: 'black',
                wrap: 'word',
            });
            height += roleName.height() + 10;

            sheetGroup.add(roleName);
        }

        sheetGroup.height(height);
        sheet.height(height);

        this._components.add(sheetGroup);
    }
}

const app: main = new main();
app.displayRoles();
app.displayDraftBox();
app.displayCursedBox();
app.displayRoleInformation();