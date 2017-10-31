export { Arrow };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Projectile } from "./Projectile";
import { Unit } from "./../Unit";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class Arrow extends Projectile
{
    public constructor(Old:Arrow, Scene:GameScene, ColliderTypes:string[])
    {
        super(Old, Scene, ColliderTypes);
        if(Old != null)
        {

        }
        else
        {
            SpriteSetLoader.LoadSets(this, "Skeleton");
        }
    }
}
