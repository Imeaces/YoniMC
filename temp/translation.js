import {Block, BlockType, Commands, ItemStack, ItemType, World } from "mojang-minecraft";

export class Translation
{
  /**
   * @returns return the language's code
   */
    getLanguage()
    {
        let language = Commands.run(
            `tellraw @a[type=!player] {"rawtext": [{"translate": "language.name"}]}`, 
            World.getDimension('the end')
        );
        return language;
    }
    /**
     * @param {Block | BlockType} block 
     * @returns return the block's name in current language
     */
    translateBlock(block)
    {
        return block.id;
    }
    /**
     * @param {ItemStack} item 
     * @returns 
     */
    translateItem(itemStack)
    {
        if(!itemStack.id.includes(':'))
            var item = 'minecraft:' + itemStack.id;
        else
            var item = itemStack.id;
        let result = Commands.run(
            `tellraw @a[type!=player] {"rawtext": [{"translate": "${item}"}]}`,
            World.getDimension('the end')
        );
        return result;
    }
    /**
     * @param {ItemType} item 
     * @returns return the item's name in current language
     */
    translateItem(item)
    {
        return item.getName();
    }
    translateKey(key)
    {
        let result = Commands.run(
            `tellraw @a[type!=player] {"rawtext": [{"translate": "${key}"}]}`,
            World.getDimension("the end")
        );
        return result;
    }
}