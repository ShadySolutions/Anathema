export { PlayerActions };

import { GameScene } from "./../GameScene";
import { Player } from "./Player";
import { Stats } from "./Stats";
import { Action } from "./Actions/Action";
import { Move } from "./Actions/Move";
import { Teleport } from "./Actions/Utility/Teleport";
import { Attack } from "./Actions/Attacks/Attack";
import { Cleave } from "./Actions/Attacks/Cleave";
import { Bleed } from "./Actions/TraitEffects/Bleed";
import { Bloodlust } from "./Actions/TraitEffects/Bloodlust";
import { Berserk } from "./Actions/TraitEffects/Berserk";
import { Lunacy } from "./Actions/TraitEffects/Lunacy";

class PlayerActions
{
    private _LeftMouse:Action;
    private _RightMouse:Action;
    private _ActionQ:Action;
    private _ActionW:Action;
    private _ActionE:Action;
    private _ActionR:Action;
    private _Player:Player;
    private _Scene:GameScene;
    private _Actions:Action[];
    private _ActionMove:Move;
    private _ActionAttack:Attack;
    public get LeftMouse():Action { return this._LeftMouse; }
    public set LeftMouse(value:Action) { this._LeftMouse = value; }
    public get RightMouse():Action { return this._RightMouse; }
    public set RightMouse(value:Action) { this._RightMouse = value; }
    public get ActionQ():Action { return this._ActionQ; }
    public set ActionQ(value:Action) { this._ActionQ = value; }
    public get ActionW():Action { return this._ActionW; }
    public set ActionW(value:Action) { this._ActionW = value; }
    public get ActionE():Action { return this._ActionE; }
    public set ActionE(value:Action) { this._ActionE = value; }
    public get ActionR():Action { return this._ActionR; }
    public set ActionR(value:Action) { this._ActionR = value; }
    public get Actions():Action[] { return this._Actions; }
    public get ActionMove():Move { return this._ActionMove; }
    public set ActionMove(value:Move) { this._ActionMove = value; }
    public get ActionAttack():Attack { return this._ActionAttack; }
    public set ActionAttack(value:Attack) { this._ActionAttack = value; }
    public constructor(Player:Player, Scene:GameScene)
    {
        this._Player = Player;
        this._Scene = Scene;
        this.Init();
    }
    private Init()
    {
        this._Actions = [];
        this._ActionMove = new Move(this._Player.Stats.MovementSpeed, null, "PlayerMove", this._Player);
        this._ActionMove.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider"];
        this._Actions.push(this._ActionMove);
        
        this._ActionAttack = new Attack(null, "PlayerAttack", this._Player);
        this._ActionAttack.Prefs["TargetType"] = "Enemy";
        this._Actions.push(this._ActionAttack);

        let ActionCleave:Cleave = new Cleave(null, "PlayerCleave", this._Player);
        ActionCleave.Prefs["TargetType"] = "Enemy";
        this._Actions.push(ActionCleave);

        let ActionBleed = new Bleed(null, "PlayerBleed", this._Player);
        this._Actions.push(ActionBleed);

        let ActionTeleport = new Teleport(null, "PlayerTeleport", this._Player);
        ActionTeleport.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider"];
        this._Actions.push(ActionTeleport);

        let ActionBloodlust = new Bloodlust(null, "PlayerBloodlust", this._Player);
        this._Actions.push(ActionBloodlust);

        let ActionBerserk = new Berserk(null, "PlayerBerserk", this._Player);
        this._Actions.push(ActionBerserk);      

        let ActionLunacy = new Lunacy(null, "PlayerLunacy", this._Player);
        this._Actions.push(ActionLunacy);

        this._LeftMouse = this._ActionAttack;
        this._RightMouse = this._ActionAttack;
        this._ActionQ = ActionCleave;
        this._ActionW = null;
        this._ActionE = null;
        this._ActionR = null;
    }
    public FindByArtIndex(Index:number)
    {
        if(Index == 0) return null;
        for(let i = 0; i < this._Actions.length; i++)
        {
            if(this._Actions[i].Art == Index) return this._Actions[i];
        }
    }
    public Apply(Code:string, Target:any)
    {
        if(Code == "LM" && this._LeftMouse)
        {
            this._LeftMouse.Target = Target;
            if(this._LeftMouse.Apply(this._Scene))
            {
                this._Player.UpdateCurrentAction(this._LeftMouse);
            }
            else
            {
                this._ActionMove.Target = Target;
                this._Player.UpdateCurrentAction(this._ActionMove);
            }
        }
        else if(Code == "RM" && this._RightMouse)
        {
            this._RightMouse.Target = Target;
            this._Player.UpdateCurrentAction(this._RightMouse);
        }
        else if(Code == "Q" && this._ActionQ)
        {
            this._ActionQ.Target = Target;
            this._Player.UpdateCurrentAction(this._ActionQ);
        }
        else if(Code == "W" && this._ActionW)
        {
            this._ActionW.Target = Target;
            this._Player.UpdateCurrentAction(this._ActionW);
        }
        else if(Code == "E" && this._ActionQ)
        {
            this._ActionE.Target = Target;
            this._Player.UpdateCurrentAction(this._ActionE);
        }
        else if(Code == "R" && this._ActionR)
        {
            this._ActionR.Target = Target;
            this._Player.UpdateCurrentAction(this._ActionR);
        }
    }
}