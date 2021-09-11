var commandInfo = {
    cancelMessage: true,
    description: 'Use this command to set home and later teleport to that position-',
    usage: [
        'home list',
        'home set <home name>',
        'home remove <home name>',
        'home warp <home name>'
    ]
};
/**
 * @param {Object} chatmsg
 * @param {Array} args 
 * @param {Module} Minecraft
 */
function execute(chatmsg, args, Minecraft) {
    const data = Minecraft.Commands.run(`tag "${chatmsg.sender.name}" list`);
    const coordFormat = /(?<=[x-zX-Z]: )(-\d+|\d+)/g;
    const homeName = args.slice(1).join(' ').toLowerCase();
    const homeRegex = new RegExp(`\\$\\(Home{Home-Name: \\b${homeName}\\b, X: (-\\d+|\\d+), Y: (-\\d+|\\d+), Z: (-\\d+|\\d+)(.*)}\\)`, 'g');

    const findHomeNames = /(?<=\(Home{Home-Name: ).+?(?=, X: (-\d+|\d+), Y: (-\d+|\d+), Z: (-\d+|\d+)}\))/g;
    const findXYZ = `${data.statusMessage.match(homeRegex)}`.match(coordFormat);

    let listOptions = ['list', 'all'];let setOptions = ['set', 'add'];let removeOptions = ['remove'];let warpOptions = ['warp'];
    if(!args.length || listOptions.includes(args[0])) {
        const allHomes = data.statusMessage.match(findHomeNames);
        return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"${allHomes ? `§bYou have total of §e${allHomes.length} §bhomes.\nHere are the list of homes: §a${allHomes.join('§r, §a')}` : '§cIt seems like you haven\'t set any home, yet-'}"}]}`);
    } else if(setOptions.includes(args[0])) {
        if(!args[1]) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cPlease type a UNIQUE home name to set!"}]}`);
        if(homeName.match(coordFormat)) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cYou may not indentify your home name in a coordinate format!"}]}`);

        if(data.statusMessage.match(homeRegex)) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cYou already have a home set with that name!"}]}`);

        Minecraft.Commands.run(`tag "${chatmsg.sender.name}" add "$(Home{Home-Name: ${homeName}, X: ${Math.trunc(chatmsg.sender.location.x)}, Y: ${Math.trunc(chatmsg.sender.location.y)}, Z: ${Math.trunc(chatmsg.sender.location.z)}})"`);
        return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§bYou have set a home with the name §a${homeName} §bat§r: §a${Math.trunc(chatmsg.sender.location.x)}§r, §a${Math.trunc(chatmsg.sender.location.y)}§r, §a${Math.trunc(chatmsg.sender.location.z)}"}]}`);
    } else if(removeOptions.includes(args[0])) {
        if(!args[1]) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cPlease type a home name to remove!"}]}`);
        if(!data.statusMessage.match(homeRegex)) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cYou don't have a home with that name!"}]}`);
        else {
            const tag = data.statusMessage.match(homeRegex);
            Minecraft.Commands.run(`say "${tag[0]}"`);
            Minecraft.Commands.run(`tag "${chatmsg.sender.name}" remove "${tag[0]}"`);
            return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§bSuccessfully removed home with the name §a${homeName} §bat §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}"}]}`);
        };
    } else if(warpOptions.includes(args[0])) {
        if(!args[1]) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cPlease type a home name to remove!"}]}`);
        if(!data.statusMessage.match(homeRegex)) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cYou don't have a home with that name!"}]}`);

        Minecraft.Commands.run(`execute "${chatmsg.sender.name}" ~~~ tp @s ${findXYZ[0]} ${findXYZ[1]} ${findXYZ[2]}`);
        return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§bYou have been teleported to §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}"}]}`);
    };
};

export { commandInfo, execute };
