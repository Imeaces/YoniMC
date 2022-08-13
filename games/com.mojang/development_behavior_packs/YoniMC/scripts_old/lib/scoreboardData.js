/*
  this file is from https://github.com/SuperFluffyGame/scoreboardData/blob/master/src/scoreboardData.js
  with NO LICENSE
 */
import { world } from "mojang-minecraft";
let overworld = world.getDimension('overworld')


/**
 * 
 * @param {String} objective The objective name you want to set the score to.
 * @param {String} player The player name you want to set the score to.
 * @param {int} value The value you want to se
 * @returns {void}
 */
export function setScore(objective,player,value){
    overworld.runCommand(`scoreboard players set "${player}" "${objective}" ${value}`)
}

/**
 * 
 * @param {String} objective The objective name you want to get the score from.
 * @param {String} player The player name you want to get the score from.
 * @returns {String} The score as a string.
 */
export function getScore(objective,player){
    let result = overworld.runCommand(`scoreboard players test "${player}" "${objective}" * *`).statusMessage
    return result.match(/-?\d+/)
}

/**
 * @param {String} name The name of the objective you want to create.
 * @returns {void}
 */
export function createObjective(name){
    try{
        overworld.runCommand(`scoreboard objectives remove ${name}`)
        overworld.runCommand(`scoreboard objectives add ${name} dummy ${name}`)
    }catch(err){

    }
}

/**
 * 
 * @param {String} key The key of the variable being stored.
 * @param {int} val The value that gets stored.
 * @returns {void}
 */
export function setInt(key,val){
    if(val.constructor.name != "Number"){
        return new Error("Value must be a Number")
    }
    if(val % 1 != 0){
        return new Error("Value must be an integer")
    }
    if(key.constructor.name != "String"){
        return new Error("Key must be a string")
    }
    pushListing(key,"INT")
    let objective = "SDL.INT." + key
    createObjective(objective)
    setScore(objective,"0",val)
}

/**
 * 
 * @param {String} key The key of the variable that is being loaded.
 * @returns {int} The value of the variable
 */
export function getInt(key){
    if(key.constructor.name != "String"){
        return new Error("Key must be a string")
    }
    let objective = "SDL.INT." + key
    let response = getScore(objective,"0")
    return +response
}

/**Sets a scoreData variable to a float.
 * 
 * @param {String} key The key of the variable being stored.
 * @param {number} val The value that gets stored.
 * @returns {void}
 */
export function setFloat(key,val){
    if(val.constructor.name != "Number"){
        return new Error("Value must be a Number")
    }
    if(key.constructor.name != "String"){
        return new Error("Key must be a string")
    }
    pushListing(key,"FLOAT")
    let objective = "SDL.FLOAT." + key
    createObjective(objective)

    let floatAsInt = new Int32Array(new Float32Array([val]).buffer)
    setScore(objective,"0",floatAsInt[0])
}

/**Gets the float assigned to a scoreData variable.
 * 
 * @param {String} key The key of the variable that is being loaded.
 * @returns {Number} The value of the variable
 */
export function getFloat(key){
    if(key.constructor.name != "String"){
        return new Error("Key must be a string")
    }
    let objective = "SDL.FLOAT." + key
    let response = getScore(objective,"0")
    let floatFromInt = new Float32Array(new Int32Array([+response]).buffer)
    return floatFromInt[0]
}

/**Sets a scoreData variable to a string.
 * 
 * @param {String} key The key of the variable being stored.
 * @param {String} val The value that gets stored.
 * @returns {void}
 */
 export function setString(key,val){
    if(val.constructor.name != "String"){
        return new Error("Value must be a String")
    }
    if(key.constructor.name != "String"){
        return new Error("Key must be a string")
    }
    pushListing(key,"STRING")
    let objective = "SDL.STRING." + key
    createObjective(objective)

    let theStringArray = [...val].map(e=>e.charCodeAt(0))
    let prevStringArrayLength = theStringArray.length
    while(theStringArray.length < Math.ceil(prevStringArrayLength/8)*8){
        theStringArray.push(0)
    }

    let stringAsInt = new Int32Array(new Uint8Array(theStringArray).buffer)

    for(let i = 0; i < [...stringAsInt].length; i++){
        setScore(objective,i + "",stringAsInt[i])
    }
}

/**Gets the string assigned to a scoreData variable.
 * 
 * @param {String} key The key of the variable that is being loaded.
 * @returns {String} The value of the variable.
 */
export function getString(key){
    if(key.constructor.name != "String"){
        return new Error("Key must be a string")
    }
    let objective = "SDL.STRING." + key
    let foundMax = false
    let max = 0
    let index = 0
    while(foundMax == false){
        try{
            getScore(objective,index + "")
        }catch(err){
            if(JSON.parse(err).statusMessage.startsWith("Player " + index)){
                max = index - 1
                foundMax = true
            }
        }
        index ++
    }

    let outArray = []
    for(let i = 0; i < max; i++)
    outArray.push(getScore(objective,i + ""))
    
    return [...new Uint8Array(new Int32Array(outArray).buffer)].map(e=>String.fromCharCode(e)).join("")
}