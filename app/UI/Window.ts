export { Window };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Unit/Player";
import { Item } from "../Items/Item";

class Window extends Engineer.Engine.Tile
{
    public Visible = true;
    private _Scene:GameScene;
    protected _DecorationT:any;
    protected _ElementT:any;
    protected _Elements:any[];
    protected _Decorations:any[];
    protected _Item:Item[][];    
        
    public constructor(Scene:GameScene)
    {
        super();
        this._Scene=Scene;
        this.Fixed = true;
        this.Paint = Engineer.Math.Color.FromRGBA(30,30,30,230);
        this._Elements = [];
        this._Decorations = [];
        this._Item = [];
        for(let i=0;i<5;i++){
            this._Item[i]=[];
            for(let j=0;j<9;j++){
                this._Item[i][j]=null;
            }
        }
        this._DecorationT = new Engineer.Engine.TileCollection(null, ["/build/resources/border_c.png","/build/resources/border_h.png","/build/resources/border_v.png"]);
        this._ElementT = new Engineer.Engine.TileCollection(null, ["/build/resources/elements/grid.png","/build/resources/elements/vorlok.png","/build/resources/elements/helm.png","/build/resources/elements/armor.png","/build/resources/elements/wand.png","/build/resources/elements/tome.png"]);
        
    }
    public Init() : void
    {
        this._Scene.AddSceneObject(this);
        for(let i = 0; i < this._Elements.length; i++)
        {
            this._Elements[i].Fixed = true;
            this._Scene.AddSceneObject(this._Elements[i]);
        }
        for(let i = 0; i < this._Decorations.length; i++)
        {
            this._Decorations[i].Fixed = true;
            this._Scene.AddSceneObject(this._Decorations[i]);
        }        
        for(let i = 0; i < this._Item.length; i++)
        {
            for(let j=0;j<this._Item[i].length && this._Item[i][j]!=null;j++){
            this._Item[i][j].Fixed = true;
            this._Scene.AddSceneObject(this._Item[i][j]);                 
            }
        }        
    }
    public Show() : void
    {
        this.Visible = true;
        this.Active = true;
        for(let i = 0; i < this._Elements.length; i++) this._Elements[i].Active = true;
        for(let i = 0; i < this._Decorations.length; i++) this._Decorations[i].Active = true;
        for(let i = 0; i < this._Item.length; i++){
            for(let j=0;j<this._Item[i].length && this._Item[i][j]!=null;j++){
                this._Item[i][j].Active = true;
            }
        }
    }
    public Hide() : void
    {
        this.Visible = false;
        this.Active = false;
        for(let i = 0; i < this._Elements.length; i++) this._Elements[i].Active = false;
        for(let i = 0; i < this._Decorations.length; i++) this._Decorations[i].Active = false;
        for(let i = 0; i < this._Item.length; i++){
            for(let j=0;j<this._Item[i].length && this._Item[i][j]!=null;j++){
                this._Item[i][j].Active = false;
            }
        }
    }
    protected CreateBorder()
    {
        let WidthFactor = Math.floor(this.Trans.Scale.X / 100);
        let WidthFake = this.Trans.Scale.X / WidthFactor;
        for(let i = 0; i < WidthFactor; i++)
        {
            this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X - this.Trans.Scale.X/2 + (i + 0.5)*(WidthFake), this.Trans.Translation.Y - this.Trans.Scale.Y / 2, 2.1), new Engineer.Math.Vertex(WidthFake, 30, 1), 1);
            this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X - this.Trans.Scale.X/2 + (i + 0.5)*(WidthFake), this.Trans.Translation.Y + this.Trans.Scale.Y / 2, 2.1), new Engineer.Math.Vertex(WidthFake, 30, 1), 1);
        }
        let HeightFactor = Math.floor(this.Trans.Scale.Y / 100);
        let HeightFake = this.Trans.Scale.Y / HeightFactor;
        for(let i = 0; i < HeightFactor; i++)
        {
            this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X - this.Trans.Scale.X / 2, this.Trans.Translation.Y - this.Trans.Scale.Y/2 + (i + 0.5)*(HeightFake), 2.1), new Engineer.Math.Vertex(30, HeightFake, 1), 2);
            this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X + this.Trans.Scale.X / 2, this.Trans.Translation.Y - this.Trans.Scale.Y/2 + (i + 0.5)*(HeightFake), 2.1), new Engineer.Math.Vertex(30, HeightFake, 1), 2);
        }

        this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X - this.Trans.Scale.X / 2, this.Trans.Translation.Y - this.Trans.Scale.Y / 2, 2.2), new Engineer.Math.Vertex(40, 40, 1), 0);
        this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X - this.Trans.Scale.X / 2, this.Trans.Translation.Y + this.Trans.Scale.Y / 2, 2.2), new Engineer.Math.Vertex(40, 40, 1), 0);
        this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X + this.Trans.Scale.X / 2, this.Trans.Translation.Y - this.Trans.Scale.Y / 2, 2.2), new Engineer.Math.Vertex(40, 40, 1), 0);
        this.AddDecoration(new Engineer.Math.Vertex(this.Trans.Translation.X + this.Trans.Scale.X / 2, this.Trans.Translation.Y + this.Trans.Scale.Y / 2, 2.2), new Engineer.Math.Vertex(40, 40, 1), 0);
    }
    protected AddDecoration(Location:any, Size:any, Index:number)
    {
        let Border1:any = new Engineer.Engine.Tile();
        Border1.Collection = this._DecorationT;
        Border1.Index = Index;
        Border1.Fixed = true;
        Border1.Trans.Scale = Size;
        Border1.Trans.Translation = Location;
        this._Decorations.push(Border1);
    }
    protected AddElement(Location:any, Size:any, Index:number, Color?:any, Rotation?:any) : any
    {
        Location = new Engineer.Math.Vertex(this.Trans.Translation.X - (this.Trans.Scale.X / 2) + Location.X + 50, this.Trans.Translation.Y - (this.Trans.Scale.Y / 2) + Location.Y + 50, Location.Z);
        let Border1:any = new Engineer.Engine.Tile();
        Border1.Collection = this._ElementT;
        if(Color) Border1.Paint = Color;
        if(Rotation) Border1.Trans.Rotation = Rotation;
        Border1.Index = Index;
        Border1.Fixed = true;
        Border1.Trans.Scale = Size;
        Border1.Trans.Translation = Location;
        this._Elements.push(Border1);
        return Border1;
    }
    protected AddItem(Itm:Item, Location:any, Indexes:any, Size:any, Index:number, Color?:any, Rotation?:any) : any
    {                
        Location = new Engineer.Math.Vertex(this.Trans.Translation.X - (this.Trans.Scale.X / 2) + Location.X + 50, this.Trans.Translation.Y - (this.Trans.Scale.Y / 2) + Location.Y + 50, Location.Z);
        if(Color) Itm.Paint = Color;
        if(Rotation) Itm.Trans.Rotation = Rotation;
        Itm.Index = Index;
        Itm.Fixed = true;
        Itm.Trans.Scale = Size;
        Itm.Trans.Translation = Location;
        this._Item[Indexes.X][Indexes.Y]=Itm;
        this._Item[Indexes.X][Indexes.Y].Active = false;
        this._Item[Indexes.X][Indexes.Y].Fixed = true;
        this._Scene.AddSceneObject(this._Item[Indexes.X][Indexes.Y]);
        return Itm;                
    }
    protected firstFit(){
        for(let i=0;i<5;i++)
        {
            for(let j=0;j<9;j++)
            {
                if(this._Item[i][j]==null )  
                {
                    return new Engineer.Math.Vertex(i,j,2.5);
                }
            }
        }
        return null;
    } 
}
