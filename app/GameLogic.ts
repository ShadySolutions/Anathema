export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        this._Game = new Engineer.Engine.Game();
        this._Game.Name = "Anathema";
        this._Runner = new Engineer.Runner.Runner(this._Game, Engineer.Draw.DrawEngineType.ThreeJS);
        let _Menu:any = new MainMenu();
        _Menu.Data["Game"] = this._Game;
        this._Game.AddScene(_Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
        Engineer.Util.Log.Print("test");
    }
}