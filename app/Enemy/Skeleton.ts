export { Skeleton };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";

class Skeleton extends Engineer.Engine.Sprite {
    private _Scene: GameScene;
    private pos_x: number;
    private pos_y: number;
    private counter: number;
    private rng_counter: number;
    private s_direction: number;
    private moving: boolean;
    private following: boolean;
    private _Player: any;
    private moveSpeed: number;

    public constructor(Scene: GameScene) {
        super();
        this.moveSpeed = 10;
        this.Name = "Skeleton";
        this._Scene = Scene;
        this._Player = this._Scene.Data["Character"];
        this.counter = 0;
        this.rng_counter = 0;
        this.s_direction = Math.round(3 * Math.random());
        this.moving = true;
        this.following = false;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(400, 400, 0);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "S_WalkN"), new Engineer.Engine.SpriteSet(null, "S_WalkE"), new Engineer.Engine.SpriteSet(null, "S_WalkS"), new Engineer.Engine.SpriteSet(null, "S_WalkW")];
        Engineer.Util.Log.Print(this.SpriteSets);
        this.SpriteSets[0].Sprites = ["/build/resources/skeleton/E_up00.png", "/build/resources/skeleton/E_up01.png", "/build/resources/skeleton/E_up02.png", "/build/resources/skeleton/E_up03.png", "/build/resources/skeleton/E_up04.png", "/build/resources/skeleton/E_up05.png", "/build/resources/skeleton/E_up06.png", "/build/resources/skeleton/E_up07.png", "/build/resources/skeleton/E_up08.png"];
        this.SpriteSets[1].Sprites = ["/build/resources/skeleton/E_rgt00.png", "/build/resources/skeleton/E_rgt01.png", "/build/resources/skeleton/E_rgt02.png", "/build/resources/skeleton/E_rgt03.png", "/build/resources/skeleton/E_rgt04.png", "/build/resources/skeleton/E_rgt05.png", "/build/resources/skeleton/E_rgt06.png", "/build/resources/skeleton/E_rgt07.png", "/build/resources/skeleton/E_rgt08.png"];
        this.SpriteSets[2].Sprites = ["/build/resources/skeleton/E_dwn00.png", "/build/resources/skeleton/E_dwn01.png", "/build/resources/skeleton/E_dwn02.png", "/build/resources/skeleton/E_dwn03.png", "/build/resources/skeleton/E_dwn04.png", "/build/resources/skeleton/E_dwn05.png", "/build/resources/skeleton/E_dwn06.png", "/build/resources/skeleton/E_dwn07.png", "/build/resources/skeleton/E_dwn08.png"];
        this.SpriteSets[3].Sprites = ["/build/resources/skeleton/E_lft00.png", "/build/resources/skeleton/E_lft01.png", "/build/resources/skeleton/E_lft02.png", "/build/resources/skeleton/E_lft03.png", "/build/resources/skeleton/E_lft04.png", "/build/resources/skeleton/E_lft05.png", "/build/resources/skeleton/E_lft06.png", "/build/resources/skeleton/E_lft07.png", "/build/resources/skeleton/E_lft08.png"];
        this.SpriteSets[0].Seed = 25;
        this.SpriteSets[1].Seed = 25;
        this.SpriteSets[2].Seed = 25;
        this.SpriteSets[3].Seed = 25;
        this.pos_x = this.Trans.Translation.X;
        this.pos_y = this.Trans.Translation.Y;
        this.Data["Skeleton"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.Events.TimeTick.push(this.movement.bind(this));
        this._Scene.Events.TimeTick.push(this.attack.bind(this));
        this._Scene.Events.TimeTick.push(this.follow.bind(this));
        this._Scene.AddSceneObject(this);
    }
    public movement(): void {
        if (this.moving && !this.following) {
            if (this.counter >= 15) {

                this.counter = 0;

                if (this.rng_counter >= 5) {
                    this.s_direction = Math.round(3 * Math.random());
                    this.rng_counter = 0;
                }
                switch (this.s_direction) {
                    case 0:
                        if (this.Trans.Translation.Y > this.pos_y - 100) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y - this.moveSpeed, 0);
                            this.UpdateSpriteSet(0);
                            this.rng_counter++;
                        }
                        else {
                            this.rng_counter = 5;
                        }

                        break;
                    case 1:
                        if (this.Trans.Translation.X < this.pos_x + 100) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X + this.moveSpeed, this.Trans.Translation.Y, 0);
                            this.UpdateSpriteSet(1);
                            this.rng_counter++;
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                    case 2:
                        if (this.Trans.Translation.Y < this.pos_y + 100) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y + this.moveSpeed, 0);
                            this.UpdateSpriteSet(2);
                            this.rng_counter++;
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                    case 3:
                        if (this.Trans.Translation.X > this.pos_x - 100) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X - this.moveSpeed, this.Trans.Translation.Y, 0);
                            this.UpdateSpriteSet(3);
                            this.rng_counter++;
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                }
            }
            else this.counter++;
        }
    }

    public attack(): void {

        if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player.Trans.Translation) < 75) {

            this.moving = false;
            this.following = false;
        }
        else {
            this.following = true;
            this.moving = false;
        }
    }
    public follow(): void {
        if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player.Trans.Translation) < 300) {
            this.following = true;
            this.moving = false;

            if (this.counter >= 15) {

                this.counter = 0;

                if (this._Player.Trans.Translation.X - this.Trans.Translation.X > 0 && this._Player.Trans.Translation.Y - this.Trans.Translation.Y < 0) {
                    this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X + this.moveSpeed, this.Trans.Translation.Y - this.moveSpeed, 0);
                    this.UpdateSpriteSet(0);
                }
                if (this._Player.Trans.Translation.X - this.Trans.Translation.X >= 0 && this._Player.Trans.Translation.Y - this.Trans.Translation.Y >= 0) {
                    this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X + this.moveSpeed, this.Trans.Translation.Y + this.moveSpeed, 0);
                    this.UpdateSpriteSet(1);
                }
                if (this._Player.Trans.Translation.X - this.Trans.Translation.X < 0 && this._Player.Trans.Translation.Y - this.Trans.Translation.Y > 0) {
                    this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X - this.moveSpeed, this.Trans.Translation.Y + this.moveSpeed, 0);
                    this.UpdateSpriteSet(2);
                }
                if (this._Player.Trans.Translation.X - this.Trans.Translation.X <= 0 && this._Player.Trans.Translation.Y - this.Trans.Translation.Y <= 0) {
                    this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X - this.moveSpeed, this.Trans.Translation.Y - this.moveSpeed, 0);
                    this.UpdateSpriteSet(3);
                }
                
            }
            else this.counter++;
        }
        else {
            this.moving = true;
            this.following = false;
        }
    }
}