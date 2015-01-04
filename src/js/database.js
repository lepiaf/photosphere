var database = {
    photos: [
        {
            name: "0001",
            camera: {alpha: 0,beta: Math.PI/2},
            neighbors: [
                {name:"0002",cursor:{x:-6,y:-5,z:0}}
            ]
        },
        {
            name: "0002",
            camera: {alpha: 0,beta: Math.PI/2},
            neighbors: [
                {name:"0001",cursor:{x:6,y:5,z:0}},
                {name:"0003",cursor:{x:0,y:-5,z:5}}
            ]
        },
        {
            name: "0003",
            camera: {alpha: 0,beta: Math.PI/2},
            neighbors: [
                {name:"0002",cursor:{x:0,y:0,z:5}},
                {name:"0004",cursor:{x:0,y:0,z:5}}
            ]
        },
        {
            name: "0004",
            camera: {alpha: 0,beta: Math.PI/2},
            neighbors: [
                {name:"0003",cursor:{x:0,y:0,z:5}},
                {name:"0005",cursor:{x:0,y:0,z:5}}
            ]
        },
        {
            name: "0005",
            camera: {alpha: 0,beta: Math.PI/2},
            neighbors: [
                {name:"0004",cursor:{x:0,y:0,z:5}},
                {name:"0006",cursor:{x:0,y:0,z:5}}
            ]
        },
        {
            name: "0006",
            camera: {alpha: 0,beta: Math.PI/2},
            neighbors: [
                {name:"0005",cursor:{x:0,y:0,z:5}}
            ]
        }
    ]
};

var findPhoto = function(name){
    var photo = "";
    $.each(database.photos, function(i, e){
        if (e.name === name) {
            photo = e;
            return false;
        }
    });

    return photo;
};
