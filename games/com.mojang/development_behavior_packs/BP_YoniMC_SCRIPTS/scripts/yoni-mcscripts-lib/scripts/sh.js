schedules=[]
schedules.push(()=>a("1"))
schedules.push(()=>a("2"))
schedules.push(()=>a("3"))


function a(c){
    console.log(c);
}

while (schedules.length > 0){
schedules.shift()();
}